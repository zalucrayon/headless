'use strict';
const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
const { API_LICENSE_KEY, API_KEY } = require("./config");

const ELEMENT_DIR = path.join(process.cwd(), 'src', 'element');

const API_HEADERS = {
    'Content-Type': 'application/json',
    'lcapikey': API_KEY,
    'licensekey': API_LICENSE_KEY,
    'productkey': 't3headless'
};

async function updatesMe() {
    try {
        const currentFiles = await getCurrentFiles(ELEMENT_DIR); 
        const response = await axios.get(
            'https://api.t3api.com/h-elmnts',
            { headers: API_HEADERS, timeout: 60000 }
        );

        if (response?.data) {
            await handleData(response.data, currentFiles);
        }
    } catch (err) {
        console.error('Update failed:', err.response?.data?.message || err.message);
    }
}

async function getCurrentFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries.filter(e => e.isFile()).map(e => e.name);
}

async function handleData(data, currentFiles) {
    if (data?.error) {
        console.error(data.error);
        return;
    }

    const updates = data?.data?.updates || [];
    const files = data?.data?.files || [];

    await applyUpdates(updates, currentFiles);
    await writeNewFiles(files);

    if (data?.data?.domain) {
        await addAssets(data);
    } else {
        console.log(data?.message);
    }
}

async function applyUpdates(updates, currentFiles) {
    const updateNames = [];

    await Promise.all(
        updates.map(async item => {
            updateNames.push(item.filename);
            if (!item?.filedata) return;

            let content;
            try {
                content = JSON.parse(item.filedata);
            } catch {
                console.error(`Invalid JSON: ${item.filename}`);
                return;
            }

            await fs.writeFile(path.join(ELEMENT_DIR, item.filename), content);
        })
    );

    const toDelete = currentFiles.filter(f => !updateNames.includes(f));
    await Promise.all(toDelete.map(async file => {
        await fs.unlink(path.join(ELEMENT_DIR, file)).catch(() => { });
    }));
}

async function writeNewFiles(files) {
    await Promise.all(files.map(async item => {
        if (!item?.filedata) return;

        let content;
        try {
            content = JSON.parse(item.filedata);
        } catch {
            console.error(`Invalid JSON: ${item.filename}`);
            return;
        }

        await fs.writeFile(item.filename, content);
    }));
}

async function addAssets(rdata) {
    const payload = JSON.stringify({
        table: `tx_${rdata.data.themekey}_domain_model_themeconfig`,
        where: { and: [], or: [] },
        orderby: { by: 'uid', dirc: 'desc' }
    });

    try {
        const response = await axios.post(
            `${rdata.data.domain}/api/getdata`,
            payload,
            { timeout: 60000 }
        );
        if (response?.data?.data) {
            await assetOperations(rdata, response.data.data);
        }
    } catch (err) {
        console.log(err)
        console.error('Asset fetch failed:', err.message);
    }
}

async function assetOperations(wtdata, tdata) {
    if (!tdata?.length) return console.log(wtdata?.message);

    const theme = tdata[0];

    const headerItems = handleCssAndFonts(theme.header);
    const footerItems = handleCssAndFonts(theme.footer);

    const mergedItems = [...new Set([...headerItems, ...footerItems])];

    const filedetails = await getFileDatas(mergedItems, wtdata.data.domain);
    if (!filedetails) return console.error('No file data returned');

    await writeFetchedFiles(filedetails);
    console.log(wtdata?.message);
}

async function getFileDatas(files, domain) {
    const cleanFiles = files.map(f => f.startsWith('/') ? f.slice(1) : f);

    const response = await axios.post(
        `${domain}/api/filesdata`,
        { files: cleanFiles },
        { headers: { 'Content-Type': 'application/json' }, timeout: 60000 }
    );

    if (response?.data?.data) return response.data.data;
    return null;
}

function handleCssAndFonts(rawConfig) {
    const items = [];
    if (!rawConfig) return items;

    let config;
    try {
        config = JSON.parse(rawConfig);
    } catch {
        return items;
    }

    ['head_css', 'footer_css', 'head_font'].forEach(key => {
        if (Array.isArray(config[key])) {
            for (const item of config[key]) {
                if (item?.public) items.push(item.public);
            }
        }
    });

    return items;
}

async function writeFetchedFiles(filedetails) {
    for (const [filePath, base64Data] of Object.entries(filedetails)) {
        if (!base64Data) continue;

        const buffer = Buffer.from(base64Data, 'base64');

        const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;

        let baseDir;
        let relativePath;

        if (cleanPath.includes('/css/')) {
            baseDir = 'public/css';
            relativePath = cleanPath.split('/css/').slice(1).join('/');
        } else if (cleanPath.includes('/fonts/')) {
            baseDir = 'public/fonts';
            relativePath = cleanPath.split('/fonts/').slice(1).join('/');
        } else {
            baseDir = 'public/others';
            relativePath = cleanPath;
        }

        const targetPath = path.join(baseDir, relativePath);
        const targetDir = path.dirname(targetPath);

        await fs.mkdir(targetDir, { recursive: true });
        await fs.writeFile(targetPath, buffer);
    }
}


updatesMe();
