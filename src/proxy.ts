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

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.includes(".") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/assets") ||
        pathname.startsWith("/.well-known")
    ) {
        return NextResponse.next();
    }

    const configData = await getConfig();
    if (!configData?.langmenu?.show_menu || !configData?.pages?.length || !configData?.langmenu?.auto_lang_detect) {
        return NextResponse.next();
    }

    const languages = configData.langmenu.langm;
    if (!Array.isArray(languages) || languages.length === 0) {
        return NextResponse.next();
    }
    const defaultLocale = languages[0].twoLetterIsoCode;

    if (request.cookies.get(AUTO_DETECT_COOKIE)) {
        return NextResponse.next();
    }

    const locale = getBrowserLocale(request, languages, defaultLocale);

    const language = (languages as any[]).find(
        (l: { twoLetterIsoCode: string }) => l.twoLetterIsoCode === locale
    );

    if (!language) return NextResponse.next();

    const languageId = language.languageId;

    const currentPage = configData.pages.find(
        (p: any) => p.slugurl === pathname
    );

    if (!currentPage) {
        return NextResponse.next();
    }

    const translatedPage = configData.pages.find(
        (p: any) =>
            p.l10n_parent === currentPage.uid &&
            p.sys_language_uid === languageId
    );

    if (!translatedPage) {
        return NextResponse.next();
    }

    if (translatedPage.slugurl === pathname) {
        return NextResponse.next();
    }

    const response = NextResponse.redirect(
        new URL(translatedPage.slugurl, request.url)
    );

    response.cookies.set(AUTO_DETECT_COOKIE, "1", {
        path: "/",
        maxAge: AUTO_DETECT_INTERVAL,
        httpOnly: false,
    });

    return response;
}
