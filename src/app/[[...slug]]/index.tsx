import React from "react";
import { checkNotFound } from "@/element/constant";
import { renderElement } from "@/element/common/renderer";

import Error404 from "@/element/common/404";
import { getPageComponents } from "@/lib/service";

export default async function MainPageData({ pdata, blog = null, searchParams, postslug = null }: any) {
    const resolvedSearchParams = await searchParams;
    const pageData = await getPageComponents(pdata?.uid, pdata?.sys_language_uid, blog?.uid, resolvedSearchParams, postslug);

    if (pageData?.errors) {
        return <Error404 />;
    }

    const _elementsData = pageData?.data;

    // Check if any plugin reported a 404 condition (generic validation)
    const isNotFound = checkNotFound(_elementsData);
    if (isNotFound) {
        return <Error404 />;
    }

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