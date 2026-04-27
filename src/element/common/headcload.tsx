"use client";
import { useEffect, useState } from "react";
import _JSXStyle from 'styled-jsx/style';
import { useConfig } from "./ConfigProvider";
import Head from "next/head";

export default function HeadCload() {
    const config = useConfig();
    const [loadjs, setLoadjs] = useState(false);

    useEffect(() => {
        const head = document.querySelector("head");
        let s: any = document.createElement('link');
        let _ex: any = document.getElementById('_cs');
        if (!_ex) {
            s.type = 'text/css';
            s.async = true;
            s.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Work+Sans:wght@400;500;600&amp;display=swap";
            s.rel = "stylesheet";
            s.id = "_cs";
            s.crossorigin = "anonymous";
            head?.appendChild(s);
        }
        if (config.activelang) {
            if (typeof window !== "undefined") {
                document.documentElement.lang = config?.activelang?.twoLetterIsoCode
            }
        }
        if (config?.header?.headjs) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(config?.header?.headjs, "text/html");

            if (typeof window !== "undefined") {
                if (!loadjs) {
                    const head = document.querySelector("head");

                    doc.querySelectorAll("script").forEach((oldScript, index) => {
                        const scriptId = `ext_script_${index}`;
                        if (!document.getElementById(scriptId)) {
                            const newScript = document.createElement("script");
                            Array.from(oldScript.attributes).forEach(attr => {
                                newScript.setAttribute(attr.name, attr.value);
                            });
                            newScript.textContent = oldScript.textContent;
                            newScript.id = scriptId;
                            head?.appendChild(newScript);
                        }
                    });


                    const otherNodes = Array.from(doc.head.childNodes).concat(Array.from(doc.body.childNodes));

                    otherNodes.forEach((node, index) => {
                        if (node.nodeName !== "SCRIPT" && node.nodeName !== "#text") {
                            const nodeId = `extra_head_node_${index}`;
                            if (!document.getElementById(nodeId) && node instanceof HTMLElement) {
                                const newNode = node.cloneNode(true) as HTMLElement;
                                newNode.id = nodeId;
                                head?.appendChild(newNode);
                            }
                        } else if (node.nodeName === "#text" && node.textContent?.trim()) {

                        }
                    });

                    setLoadjs(true);
                }
            }
        }

    }, [config]);
    return (
        <>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_SERVER} />
            <Head>
                {config?.header?.head_css ?
                    config?.header?.head_css?.map((_cs: any) => {
                        const cssPath = "/css/" + _cs.public.split("/css/").pop();
                        return (
                            <link
                                key={cssPath}
                                rel="stylesheet"
                                href={cssPath}
                            />
                        );
                    })
                    : null}
            </Head>
            {config?.header?.head_i_css ?
                <_JSXStyle id="customstye">{`${config?.header?.head_i_css}`}</_JSXStyle>
                : null}
        </>
    )
}
