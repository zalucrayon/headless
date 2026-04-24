const { API_LICENSE_KEY, API_KEY } = require("./config");
const axios = require("axios");
const path = require("path");
const { execSync } = require("child_process");
const fs = require("fs");


const API_HEADERS = {
  "Content-Type": "application/json",
  lcapikey: API_KEY,
  licensekey: API_LICENSE_KEY,
  productkey: "t3headless",
};

function run(command) {
  execSync(command, { stdio: "inherit" });
}

function fileExists(path) {
  return fs.existsSync(path);
}

function bootstrapsetup(){
  console.log("Installing Bootstrap plugin...");
  run("npm install -D bootstrap react-bootstrap"); 
}

function tailwindsetup() {
  console.log("Installing Tailwind v4 + PostCSS plugin...");
  run("npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer");

  fs.writeFileSync(
    "postcss.config.js",
    `module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
`
  );

  console.log("postcss.config.js created / updated");

  fs.writeFileSync(
    "tailwind.config.js",
    `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`
  );

  console.log("tailwind.config.js created");

  const possiblePaths = [
    "./app/globals.css",
    "./src/app/globals.css",
    "./styles/globals.css",
    "./src/styles/globals.css",
  ];

  let cssPath = possiblePaths.find((p) => fileExists(p));

  if (cssPath) {
    let content = fs.readFileSync(cssPath, "utf8");

    if (
      !content.includes("@tailwind base") &&
      !content.includes('@import "tailwindcss"')
    ) {
      fs.writeFileSync(
        cssPath,
        `@import "tailwindcss";

` + content
      );
      console.log("Tailwind directives added to", cssPath);
    } else {
      console.log("Tailwind already configured in", cssPath);
    }
  } else {
    console.log("globals.css not found in common locations");
  }

  console.log("Tailwind v4 setup completed successfully!");
}


function handleFiles(files) {
  if (!Array.isArray(files)) return;

  files.forEach((file) => {
    const filePath = path.join(process.cwd(), file.filename);

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.parse(file.filedata), "utf8");

    console.log("File created:", file.filename);
  });
}

 
async function main() {
  try {
    const response = await axios.get(
      'https://api.t3api.com/headlesssetup',
      { headers: API_HEADERS, timeout: 60000 }
    );

    if (response?.data) {
      const apiData = response.data.data;
      handleFiles(apiData.files);
      if (apiData.headlesstheme == 1) {
        console.log(response.data);
        bootstrapsetup();
      } else {
        tailwindsetup();
      }
    }

  } catch (error) {
    console.error("API Call Failed ");
    console.error(error.response?.data || error.message);
    process.exit(1);
  }
}

main();
