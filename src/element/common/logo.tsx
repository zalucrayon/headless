import Image from "next/image";
import Link from "next/link";
import styles from "./styles/logo.module.css";

export default function Logo({ header }: any) {

  if (!header?.logo) return null;

  const width = header?.logo_width || 200;
  const height = header?.logo_height || 80;

  return (
    <div className={styles.wrapper}>
      <Link href="/" aria-label="Logo" className={styles.link}>
        <Image
          src={process.env.NEXT_PUBLIC_SERVER + header?.logo?.public}
          alt="Logo"
          width={width}
          height={height}
          priority
          placeholder="blur"
          blurDataURL={`${process.env.NEXT_PUBLIC_DATA_BLUR_URL}`}
          className={styles.image}
        />
      </Link>
    </div>
  );
}
