"use client";
import { useEffect, useState } from "react";
import _JSXStyle from 'styled-jsx/style';
import { useConfig } from "./ConfigProvider";

export default function FootCload() {
    const config = useConfig();
    const [footerjs, setFooterjs] = useState(false);

    useEffect(() => {
        if (config?.footer?.footer_i_js) {
            if (typeof window !== "undefined") {
                if (!footerjs) {
                    const footer = document.querySelector("body");
                    let s: any = document.createElement('script');
                    let _ex: any = document.getElementById('extra_fi_js');
                    if (!_ex) {
                        s.type = 'text/javascript';
                        s.async = true;
                        s.innerHTML = config?.footer?.footer_i_js;
                        s.rel = "preload";
                        s.id = "extra_fi_js";
                        footer?.appendChild(s);
                    }
                    setFooterjs(true);
                }
            }
        }
    }, [config]);
    return (
        <>
            {config?.footer?.footer_i_css ?
                <_JSXStyle id="extra_fi_css">{`${config?.footer?.footer_i_css}`}</_JSXStyle>
                : null}
        </>
    )
}
