"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Nvideo({ data, immg, config }: any) {
    const [_path, setPPath] = useState<any>(null);

    const changepath = (immg: any, data: any) => {
        setPPath(immg?.url);
    }
    const youtubeurlset = async (immg: any) => {
        let _youtube = "https://www.youtube.com/embed/" + immg?.youtube;
        setPPath(_youtube);
    }
    useEffect(() => {
        if (!_path) {
            if (immg?.cropped?.length > 0) {
                if (immg?.cropped?.[0].identifier) {
                    setPPath(immg?.mimage?.domain + '/' + immg?.mimage?.storage + immg?.cropped?.[0].identifier);
                } else {
                    setPPath(immg?.url);
                }
            } else {
                setPPath(immg?.url);
            }
        }
        if (immg?.extension === "youtube") {
            youtubeurlset(immg);
        } 
    }, [immg]);

    return (
        <div className={`${data?.imagewidth !== 0 ? "w-[" + data?.imagewidth + "px]" : "w-100"} ${data?.imageheight !== 0 ? "h-[" + data?.imageheight + "px]" : "h-max"}`}>
            {immg?.mimetype.includes('video/') || immg?.mimetype.includes('audio/') ?
                _path ? <>
                    <ReactPlayer
                        src={_path}
                        controls={true}
                        light={false}
                        pip={true}
                        onError={(e) => changepath(immg, data)}
                        width="100%"
                        height="100%"
                    />
                    <source src={_path} type={immg?.mimetype} />
                </> : null
                : null}
        </div>
    );
}; 