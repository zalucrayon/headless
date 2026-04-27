import FootCload from "@/element/common/footcload";
import Footer from "@/element/common/footer";
import HeadCload from "@/element/common/headcload";
import Header from "@/element/common/header";
import { getBaseInfo } from "@/lib/service/config";
import { Metadata, ResolvingMetadata } from "next";
import MainPageData from ".";
import Error404 from "@/element/common/404";

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

    let pdata = config?.pages?.find((pg: any) => {
        if (pg?.slugurl != "/") {
            return pg?.slugurl?.replace(/\/+$/, "") === currentUrl;
        } else {
            return pg?.slugurl === currentUrl;
        }
    });
    if (pdata) {
        let _robots = "";
        if (pdata?.no_index) {
            _robots = _robots + "noindex";
        } else {
            _robots = _robots + "index";
        }
        if (pdata?.no_follow) {
            _robots = _robots + ",nofollow";
        } else {
            _robots = _robots + ",follow";
        }
        return {
            title: pdata?.seo_title ? pdata?.seo_title : pdata?.title,
            description: pdata?.description ? pdata?.description : "",
            keywords: pdata?.keywords ? pdata?.keywords : "",
            robots: _robots,
            openGraph: {
                title: pdata?.og_title ? pdata?.og_title : pdata?.title,
                description: pdata?.og_description ? pdata?.og_description : pdata?.description,
            },
        }
    }

    return {
        title: process.env.NEXT_PUBLIC_DEFAULTTITLE,
    }
};

export default async function MainPage({ params, searchParams }: {
    params: { slug?: string[] };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const config = await getBaseInfo();
    let p404 = null;
    const { slug } = await params;
    const slugParam = slug;
    const slugdata = Array.isArray(slugParam)
        ? slugParam
        : slugParam
            ? [slugParam]
            : [];
    const currentUrl = '/' + slugdata.join('/');

    let _blog = null;
    let pdata = config?.pages?.find((pg: any) => {
        if (pg?.slugurl?.replace(/\/+$/, "") != "") {
            return pg?.slugurl?.replace(/\/+$/, "") === currentUrl;
        } else {
            return pg?.slugurl === currentUrl;
        }
    });

    if (!pdata) {
        let __bid = currentUrl.split('/').filter(Boolean).pop();
        _blog = config?.news?.find((ns: any) => {
            return ns?.path_segment == __bid;
        });

        if (__bid) {
            let _withoutblog = currentUrl.replace(__bid, "");
            pdata = config?.pages?.find((pg: any) => {
                if (pg?.slugurl?.replace(/\/+$/, "") != "") {
                    return pg?.slugurl?.replace(/\/+$/, "") === _withoutblog.replace(/\/+$/, "");
                } else {
                    return pg?.slugurl === _withoutblog.replace(/\/+$/, "");
                }
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
                        <MainPageData pdata={pdata} blog={_blog} searchParams={searchParams} />
                        <Footer />
                    </div>
                    <FootCload />
                </>
                : p404 ? <></>
                    : <Error404 />}
        </>
    );
}