"use client";
import { useEffect, useState } from "react";
import styles from "./styles/scrolltotop.module.css";

export default function ScrollToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setShow(window.scrollY > 120);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            className={`${styles.btn} ${show ? styles.show : ""}`}
            onClick={goToTop}
            aria-label="Go to top"
        >
            ↑
        </button>
    );
}
