import React from "react";
import Frame from "../typo3/frame";
import { componentMappings, postDetailTypes } from "../constant";

const MissingComponent = ({ path }: { path: string }) => (
    <div className="enf-wrapper">
        <p>
            <strong>{path}</strong>&nbsp;
            component is missing!! <br />please check src/element/{path}.tsx
        </p>
    </div>
);

export const loadComponent = (type: any, data: any, element: any = null, renderElement: any = null) => {
    const mapping = componentMappings.find(item => item.ctype === type);
    const LazyComponent = mapping?.component || React.lazy(() => {
        return import(`../${type}.tsx`).catch((e) => {
            console.error(`Failed to load component: ${type}`, e);
            return { default: () => <MissingComponent path={type} /> };
        });
    });

    const isPostDetail = postDetailTypes.includes(type);
    return (
        <Frame data={data} element={element} hideHeader={isPostDetail}>
            <LazyComponent data={data} element={element} />
        </Frame>
    );
}

export const renderElement = (elements: any, col: any): any => {
    return (
        elements?.map((ttcn: any, k: any) => {
            const isCoreElement = componentMappings.some(item => item.ctype === ttcn?.CType && item.path.startsWith('typo3/'));
            return (
                ttcn?.colPos == col ?
                    isCoreElement ?
                        <section key={ttcn.uid + 'containertypodefault' + ttcn?.CType} id={`c${ttcn.uid}`}>
                            {loadComponent(ttcn.CType, ttcn, null, renderElement)}
                        </section>
                        :
                        ttcn?.CType?.includes(process.env.NEXT_PUBLIC_THEME_KEY) ?
                            <section key={ttcn.crdate + 'container' + ttcn.uid + ttcn.pid + 'customelement'} id={`c${ttcn.uid}`}>
                                {loadComponent(ttcn.CType.replace(process.env.NEXT_PUBLIC_THEME_KEY + "_", "").replace(process.env.NEXT_PUBLIC_THEME_KEY + "-", ""), ttcn, null, renderElement)}
                            </section>
                            : null
                    : null
            );
        })
    );
}
