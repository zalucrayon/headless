'use client';
import { useState } from "react";
import Modal from "./modal";
import Image from "next/image";

export default function ImageModal({ immg }: any) {
    const [show, setModal] = useState(false);

    return (
        <>
            <div className="image-icon" onClick={() => setModal(true)}>
                <div className="image-vemo-icon venobox vbox-item"></div>
            </div>

            <Modal
                show={show}
                title={immg?.title}
                onClose={() => setModal(false)}
                size="lg"
            >
                <Image
                    src={immg?.url}
                    alt={immg?.title || ""}
                    width={immg?.width || 900}
                    height={immg?.height || 700}
                />
            </Modal>
        </>
    );
}
