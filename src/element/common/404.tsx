import Image from "next/image";
import Link from "next/link";
import styles from "./styles/error404.module.css";

export default function Error404() {
  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>

        <div className={styles.media}>
          <Image
            src="/images/404.png"
            alt="404"
            width={642}
            height={791}
            className={styles.image}
          />
        </div>

        <div>
          <h2 className={styles.title}>
            <strong>Sorry!</strong> Page Not Found
          </h2>

          <p className={styles.text}>
            We can’t find that page! The page you are
            <br /> looking for was never existed.
          </p>
        </div>

        <div className={styles.action}>
          <Link href="/" className={styles.button}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5z"/>
            </svg>
            <span>Back To Home</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
