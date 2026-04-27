import Frame from "@/element/typo3/frame";
import { t3element } from "@/lib/hooks/t3element";
import React from "react";

export const renderElement = (data: any, config: any, _key: any = "") => {

    return (
        t3element.includes(data?.CType) ?
            <section key={data.crdate + 'containertypodefault' + data?.CType + _key} >
                {loadComponent(data.CType, data, null, config)}
            </section>
            : data?.CType?.includes(process.env.NEXT_PUBLIC_THEME_KEY) ?
                <section key={data.crdate + 'container' + data.uid + data.pid + 'customelement'} >
                    {loadComponent(data.CType.replace(process.env.NEXT_PUBLIC_THEME_KEY + "_", "").replace(process.env.NEXT_PUBLIC_THEME_KEY + "-", ""), data, null, config)}
                </section>
                : null
    );
}

export const loadComponent = (type: any, data: any, element: any = null, config: any) => {
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
        <Frame data={data} element={element} config={config}>
            <LazyComponent data={data} element={element} config={config} />
        </Frame>
    );
}