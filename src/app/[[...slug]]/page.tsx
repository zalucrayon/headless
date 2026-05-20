import FootCload from "@/element/common/footcload";
import Footer from "@/element/common/footer";
import HeadCload from "@/element/common/headcload";
import Header from "@/element/common/header";
import { getBaseInfo } from "@/lib/service/config";
import { getPageComponents } from "@/lib/service";
import { Metadata } from "next";
import MainPageData from ".";
import Error404 from "@/element/common/404";
import { resolveDynamicMetadata } from "@/element/constant";

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
    const config = await getBaseInfo();
    const { slug } = await params;
    const slugParam = slug;
    const slugdata = Array.isArray(slugParam)
        ? slugParam
        : slugParam
            ? [slugParam]
            : [];
    const currentUrl = '/' + slugdata.join('/');
    const __bid = slugdata.length > 0 ? slugdata[slugdata.length - 1] : null;

    const langCodes = config?.langmenu?.langm?.map((l: any) => l.twoLetterIsoCode?.toLowerCase()) || [];
    const isLangPrefix = slugdata.length === 1 && langCodes.includes(slugdata[0].toLowerCase());

    let _blog = null;
    let pdata = config?.pages?.find((pg: any) => {
        const slugurl = pg?.slugurl?.replace(/\/+$/, "") || "/";
        const normalizedUrl = currentUrl.replace(/\/+$/, "") || "/";
        return slugurl === normalizedUrl;
    });

    if (!pdata && __bid && !isLangPrefix) {
        _blog = config?.news?.find((ns: any) => {
            return ns?.path_segment == __bid;
        });

        if (__bid) {
            const _withoutblog = currentUrl.substring(0, currentUrl.lastIndexOf(__bid)).replace(/\/+$/, "") || "/";
            pdata = config?.pages?.find((pg: any) => {
                const slugurl = pg?.slugurl?.replace(/\/+$/, "") || "/";
                return slugurl === _withoutblog;
            });
        }
    }

    if (pdata) {
        const pageData = await getPageComponents(pdata?.uid, pdata?.sys_language_uid, _blog?.uid, null, __bid);
        const _elementsData = pageData?.data;

        const baseMetadata = {
            title: pdata?.seo_title ? pdata?.seo_title : pdata?.title,
            description: pdata?.description ? pdata?.description : "",
            keywords: pdata?.keywords ? pdata?.keywords : "",
            ogTitle: pdata?.og_title ? pdata?.og_title : pdata?.title,
            ogDescription: pdata?.og_description ? pdata?.og_description : pdata?.description,
        };

        const { title, description, keywords, ogTitle, ogDescription } = resolveDynamicMetadata(_elementsData, baseMetadata);

        let _robots = pdata?.no_index ? "noindex" : "index";
        _robots += pdata?.no_follow ? ",nofollow" : ",follow";

        return {
            title: title,
            description: description,
            keywords: keywords,
            robots: _robots,
            openGraph: {
                title: ogTitle,
                description: ogDescription,
            },
            twitter: {
                card: "summary_large_image",
                title: ogTitle,
                description: ogDescription,
            },
            alternates: {
                canonical: currentUrl,
            }
        }
    }

    return {
        title: process.env.NEXT_PUBLIC_DEFAULTTITLE,
    }
};

export default async function MainPage({ params, searchParams }: {
    params: Promise<{ slug?: string[] }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const config = await getBaseInfo();
    const p404 = null;
    const { slug } = await params;
    const slugParam = slug;
    const slugdata = Array.isArray(slugParam)
        ? slugParam
        : slugParam
            ? [slugParam]
            : [];
    const currentUrl = '/' + slugdata.join('/');
    const __bid = slugdata.length > 0 ? slugdata[slugdata.length - 1] : null;

    // Get available language codes to avoid treating them as post slugs
    const langCodes = config?.langmenu?.langm?.map((l: any) => l.twoLetterIsoCode?.toLowerCase()) || [];
    const isLangPrefix = slugdata.length === 1 && langCodes.includes(slugdata[0].toLowerCase());

    let _blog = null;
    let pdata = config?.pages?.find((pg: any) => {
        const slugurl = pg?.slugurl?.replace(/\/+$/, "") || "/";
        const normalizedUrl = currentUrl.replace(/\/+$/, "") || "/";
        return slugurl === normalizedUrl;
    });

    if (!pdata && __bid && !isLangPrefix) {
        _blog = config?.news?.find((ns: any) => {
            return ns?.path_segment == __bid;
        });

        if (__bid) {
            const _withoutblog = currentUrl.substring(0, currentUrl.lastIndexOf(__bid)).replace(/\/+$/, "") || "/";
            pdata = config?.pages?.find((pg: any) => {
                const slugurl = pg?.slugurl?.replace(/\/+$/, "") || "/";
                return slugurl === _withoutblog;
            });
        }
    }

    if (!currentUrl.includes('.') && pdata == undefined) {
        if (config?.general?.p404) {
            pdata = config?.pages?.find((pg: any) => {
                return pg?.uid == config?.general?.p404;
            });
        }
    }
    return (
        <>
            {pdata ?
                <>
                    <HeadCload />
                    <div >
                        <Header />
                        <MainPageData pdata={pdata} blog={_blog} searchParams={searchParams} postslug={__bid} />
                        <Footer />
                    </div>
                    <FootCload />
                </>
                : p404 ? <></>
                    : <Error404 />}
        </>
    );
}