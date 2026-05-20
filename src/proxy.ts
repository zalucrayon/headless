import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};

const AUTO_DETECT_COOKIE = "NEXT_LOCALE_DETECT";
const AUTO_DETECT_INTERVAL = 60 * 60;

function getBrowserLocale(
    request: NextRequest,
    languages: any[],
    defaultLocale: string
) {


    const acceptLanguage = request.headers.get("accept-language");
    if (!acceptLanguage) return defaultLocale;

    const preferred = acceptLanguage
        .split(",")
        .map((l) => l.split(";")[0].trim().slice(0, 2));

    const match = preferred.find((lang) =>
        languages.some((l) => l.twoLetterIsoCode === lang)
    );

    return match || defaultLocale;
}

async function getConfig() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER}${process.env.NEXT_PUBLIC_API_BASE}config`,
            { next: { revalidate: 3600 } }
        );

        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}


function applySecurityHeaders(response: NextResponse) {
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.hcaptcha.com https://*.hcaptcha.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.hcaptcha.com;
        img-src 'self' blob: data: ${process.env.NEXT_PUBLIC_SERVER || ''};
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self' ${process.env.NEXT_PUBLIC_SERVER || ''} https://headless.t3api.com https://*.hcaptcha.com;
        object-src 'none';
        base-uri 'self';
        form-action 'self' ${process.env.NEXT_PUBLIC_SERVER || ''} https://headless.t3api.com;
        frame-ancestors 'none';
        frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube.com https://*.hcaptcha.com;
        upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();

    response.headers.set('Content-Security-Policy', cspHeader);
    return response;
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.includes(".") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/assets") ||
        pathname.startsWith("/.well-known")
    ) {
        return applySecurityHeaders(NextResponse.next());
    }

    // For detail pages: inject the post slug as a search param so it flows to the API
    // This detects URLs like /detail/my-post-slug where the last segment is the slug
    const configData = await getConfig();
    if (configData?.pages?.length) {
        const normalizedPath = pathname.replace(/\/+$/, "") || "/";
        const isKnownPage = configData.pages.some((pg: any) => {
            const pgUrl = (pg?.slugurl || "").replace(/\/+$/, "") || "/";
            return pgUrl === normalizedPath;
        });

        if (!isKnownPage) {
            const segments = pathname.split('/').filter(Boolean);
            if (segments.length > 1) {
                const postSlug = segments[segments.length - 1];
                // Only inject if postslug is not already in search params
                if (!request.nextUrl.searchParams.has('postslug')) {
                    const url = request.nextUrl.clone();
                    url.searchParams.set('postslug', postSlug);
                    return applySecurityHeaders(NextResponse.rewrite(url));
                }
            }
        }
    }

    if (!configData?.langmenu?.show_menu || !configData?.pages?.length || !configData?.langmenu?.auto_lang_detect) {
        return applySecurityHeaders(NextResponse.next());
    }

    const languages = configData.langmenu.langm;
    if (!Array.isArray(languages) || languages.length === 0) {
        return applySecurityHeaders(NextResponse.next());
    }
    const defaultLocale = languages[0].twoLetterIsoCode;

    if (request.cookies.get(AUTO_DETECT_COOKIE)) {
        return applySecurityHeaders(NextResponse.next());
    }

    const locale = getBrowserLocale(request, languages, defaultLocale);

    const language = (languages as any[]).find(
        (l: { twoLetterIsoCode: string }) => l.twoLetterIsoCode === locale
    );

    if (!language) return applySecurityHeaders(NextResponse.next());

    const languageId = language.languageId;

    const currentPage = configData.pages.find(
        (p: any) => p.slugurl === pathname
    );

    if (!currentPage) {
        return applySecurityHeaders(NextResponse.next());
    }

    const translatedPage = configData.pages.find(
        (p: any) =>
            p.l10n_parent === currentPage.uid &&
            p.sys_language_uid === languageId
    );

    if (!translatedPage) {
        return applySecurityHeaders(NextResponse.next());
    }

    if (translatedPage.slugurl === pathname) {
        return applySecurityHeaders(NextResponse.next());
    }

    const response = applySecurityHeaders(NextResponse.redirect(
        new URL(translatedPage.slugurl, request.url)
    ));

    response.cookies.set(AUTO_DETECT_COOKIE, "1", {
        path: "/",
        maxAge: AUTO_DETECT_INTERVAL,
        httpOnly: false,
    });

    return response;
}
