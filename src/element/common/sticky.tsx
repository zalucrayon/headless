"use client";

import { useEffect } from "react";

export default function Sticky({ children, ...props }: any) {
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 120) {
            // setFixedHeader(true);
            if (typeof window !== "undefined") {
                const _header = document.querySelector("header"); 
                _header?.classList.add('fixed-header');
            }
          } else {
            if (typeof window !== "undefined") {
                const _header = document.querySelector("header"); 
                _header?.classList.remove('fixed-header');
            }
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
 
    return (
        <></>
    );
}