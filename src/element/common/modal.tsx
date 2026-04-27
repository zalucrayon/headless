'use client';
import { ReactNode, useEffect } from "react";
import styles from "./styles/modal.module.css";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  show: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;

  /* design control */
  size?: ModalSize;
  className?: string;        // custom width / styling
  closeOnOutside?: boolean;
}

export default function Modal({
  show,
  title,
  children,
  onClose,
  size = "md",
  className = "",
  closeOnOutside = true
}: ModalProps) {

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (show) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={styles.overlay}
      onClick={closeOnOutside ? onClose : undefined}
    >
      <div
        className={`${styles.modal} ${styles[size]} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >

        {title && (
          <div className={styles.header}>
            <h3>{title}</h3>
            <button className={styles.close} onClick={onClose}>×</button>
          </div>
        )}

        <div className={styles.body}>
          {children}
        </div>

      </div>
    </div>
  );
}
