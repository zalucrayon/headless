import { getBaseInfo } from '@/lib/service/config';
import { MetadataRoute } from 'next';

/**
 * TYPO3 Optimized Sitemap Generator using Official Next.js API.
 * This approach guarantees valid XML declaration, headers, and SEO compliance.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const config = await getBaseInfo();
    
    // Return empty if API is unavailable
    if (!config || config.error || !config.pages) {
        return [];
    }

    const rawPages = config.pages || [];
    const languages = config?.langmenu?.langm || [];
    
    // Site URL fallback
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Map language IDs
    const langMap: Record<number, string> = {};
    languages.forEach((l: any) => {
        if (l.languageId !== undefined && l.twoLetterIsoCode) {
            langMap[l.languageId] = l.twoLetterIsoCode;
        }
    });

    // Grouping for alternates
    const pagesByBaseId: Record<number, any[]> = {};
    const uniquePagesMap = new Map();

    rawPages.forEach((page: any) => {
        // 1. Filter: no_index
        if (page.no_index === 1 || page.no_index === true || String(page.no_index) === "1") {
            return;
        }

        // 2. Filter: doktype (1=Standard, 4=Shortcut)
        const allowedDoktypes = [1, 4];
        if (page.doktype && !allowedDoktypes.includes(Number(page.doktype))) {
            return;
        }

        const slug = page.slugurl || '/';
        
        // Deduplicate: Keep latest tstamp
        if (!uniquePagesMap.has(slug) || (page.tstamp > uniquePagesMap.get(slug).tstamp)) {
            uniquePagesMap.set(slug, page);
        }

        // Aggregate for alternates logic
        const baseId = page.l10n_parent === 0 ? page.uid : page.l10n_parent;
        if (!pagesByBaseId[baseId]) {
            pagesByBaseId[baseId] = [];
        }
        pagesByBaseId[baseId].push(page);
    });

    const getAbsoluteUrl = (url: string) => {
        if (!url) return siteUrl;
        if (url.startsWith('http')) return url;
        const path = url.startsWith('/') ? url : `/${url}`;
        return `${siteUrl.replace(/\/+$/, '')}${path}`;
    };

    const finalPages = Array.from(uniquePagesMap.values());

    return finalPages.map((page: any) => {
        const baseId = page.l10n_parent === 0 ? page.uid : page.l10n_parent;
        const translations = pagesByBaseId[baseId] || [];

        // Build Alternate Links (en, de, fr, etc.)
        const languagesAlternates: Record<string, string> = {};
        translations.forEach((t: any) => {
            const langCode = langMap[t.sys_language_uid];
            if (langCode) {
                languagesAlternates[langCode] = getAbsoluteUrl(t.slugurl);
            }
        });

        // Add x-default
        const defaultPage = translations.find((t: any) => t.l10n_parent === 0);
        if (defaultPage) {
            languagesAlternates['x-default'] = getAbsoluteUrl(defaultPage.slugurl);
        }

        // Map TYPO3 fields to MetadataRoute.Sitemap object
        return {
            url: getAbsoluteUrl(page.canonical_link || page.slugurl),
            lastModified: page.tstamp 
                ? new Date(page.tstamp * 1000).toISOString().split('.')[0] + 'Z' 
                : new Date().toISOString().split('.')[0] + 'Z',
            changeFrequency: (page.sitemap_changefreq || 'monthly') as any,
            priority: page.sitemap_priority ? parseFloat(page.sitemap_priority) : 0.5,
            alternates: {
                languages: languagesAlternates,
            }
        };
    });
}
