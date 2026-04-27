import Link from "next/link";
import Cheader from "./cheader";
import styles from "./styles/frame.module.css";

export default function Frame({ data, config, children }: any) {

    const hasFrame = data?.frame_class !== 'none';
    const spaceBefore = data?.space_before_class
        ? styles['spaceBefore' + formatClass(data.space_before_class)]
        : '';

    const spaceAfter = data?.space_after_class
        ? styles['spaceAfter' + formatClass(data.space_after_class)]
        : '';

    if (data?.CType == "image") {

        console.log(spaceBefore)
        console.log(data?.space_after_class)
        console.log("spaceAfter", spaceAfter)
    }
    function formatClass(str: string) {
        if (!str) return '';

        return str
            .split('-')              // ["extra","large"]
            .map(s => s.charAt(0).toUpperCase() + s.slice(1))
            .join('');               // ExtraLarge
    }

    return (
        <>
            {hasFrame ? (
                <div className={` ${styles.frame} ${styles.withFrame} ${spaceBefore} ${spaceAfter} `}>
                    <Cheader data={data} config={config} />
                    {children}
                </div>
            ) : (
                <>
                    <Cheader data={data} config={config} />
                    {children}
                </>
            )}

            {data?.linkToTop == 1 && (
                <Link href="#" className={styles.toTop}>
                    To Top
                </Link>
            )}
        </>
    );
}
