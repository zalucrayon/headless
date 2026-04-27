'use client';
import { useState } from "react";
import ReactPlayer from "react-player";
import styles from "./styles/videomodal.module.css";

export default function VideoModal({ url }: any) {
    const [show, setModal] = useState(false);

    return (
        <> 
            {!show &&
                <div className={styles.videoBtnWrap} onClick={() => setModal(true)}>
                    <div className={styles.videoBtn}>▶</div>
                </div>
            }
 
            {show &&
                <div className={styles.modal}>
                    <div className={styles.overlay} onClick={() => setModal(false)} />

                    <div className={styles.content}>
                        <button
                            className={styles.close}
                            onClick={() => setModal(false)}
                            aria-label="close"
                        >
                            ✕
                        </button>

                        <div className={styles.player}>
                            <ReactPlayer
                                src={url}
                                controls
                                playing
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
