import Frame from "@/element/typo3/frame";
import { t3element } from "@/lib/hooks/t3element";
import { getPageComponents } from "@/lib/service";
import React from "react";


export const loadComponent = (type: any, data: any, element: any = null) => {
    if (t3element.includes(type)) {
        type = "typo3/" + type;
    }
    const LazyComponent = React.lazy(() => import("../../element/" + type).catch((e) => ({
        default: () =>
            <div className="enf-wrapper">
                <p>
                    <strong>{type}</strong>&nbsp;
                    component is missing!! <br/>please run command "yarn themebuild" on your root directory
                </p>
            </div>
    })));
    return (
        <Frame data={data} element={element} >
            <LazyComponent data={data} element={element} />
        </Frame>
    );
}

export const renderElement = (elements: any, col: any) => {
    return (
        elements?.map((ttcn: any, k: any) => (
            ttcn?.colPos == col ?
                t3element.includes(ttcn?.CType) ?
                    <section key={ttcn.crdate + 'containertypodefault' + ttcn?.CType} >
                        {loadComponent(ttcn.CType, ttcn, null)}
                    </section>
                    :
                    ttcn?.CType?.includes(process.env.NEXT_PUBLIC_THEME_KEY) ?
                        <section key={ttcn.crdate + 'container' + ttcn.uid + ttcn.pid + 'customelement'} >
                            {loadComponent(ttcn.CType.replace(process.env.NEXT_PUBLIC_THEME_KEY + "_", "").replace(process.env.NEXT_PUBLIC_THEME_KEY + "-", ""), ttcn)}
                        </section>
                        : null
                : null
        ))
    );
}

export default async function MainPageData({ pdata, blog = null, searchParams }: any) {
    const resolvedSearchParams = await searchParams;
    let pageData = await getPageComponents(pdata?.uid, pdata?.sys_language_uid, blog?.uid, resolvedSearchParams);
    let _elementsData = pageData?.data;
    
    // console.log(pageData);
    
    return (
        <div className="page-data">
            {pdata.backend_layout == "" || pdata.backend_layout == '-1' || pdata.backend_layout == 'pagets__default' ?
                <div key="sidebar-defaultt" className="default-layout   mx-auto">
                    <div className="main-content ">
                        {renderElement(_elementsData, 0)}
                    </div>
                </div>
                : pdata.backend_layout == "pagets__leftsidebar" ?
                    <div key="sidebar-left" className="leftsidebar-layout   mx-auto">
                        <div className="flex flex row gap-1">
                            <div className="flex flex-col  w-[30%] left-sidebar">
                                {renderElement(_elementsData, 1)}
                            </div>
                            <div className="flex flex-col w-[70%] main-content">
                                {renderElement(_elementsData, 0)}
                            </div>
                        </div>
                    </div>
                    : pdata.backend_layout == "pagets__rightsidebar" ?
                        <div key="sidebar-right" className="rightsidebar-layout mx-auto">
                            <div className="flex flex row gap-1">
                                <div className="flex flex-col w-[70%] main-content">
                                    {renderElement(_elementsData, 0)}
                                </div>
                                <div className="flex flex-col  w-[30%] right-sidebar">
                                    {renderElement(_elementsData, 1)}
                                </div>
                            </div>
                        </div>
                        : null}
        </div>
    );
}