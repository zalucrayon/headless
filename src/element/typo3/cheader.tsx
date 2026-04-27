import Link from "next/link";
import styles from "./styles/cheader.module.css";

export default function Cheader({ data, config }: any) {

    const hlink = data?.header_link;

    let HTag: any = "h2";
    let STag: any = "h3";

    const layoutMap: any = {
        0: ["h2","h3"],
        1: ["h1","h2"],
        2: ["h2","h3"],
        3: ["h3","h4"],
        4: ["h4","h5"],
        5: ["h5","h6"],
    };

    if (layoutMap[data?.header_layout]) {
        HTag = layoutMap[data.header_layout][0];
        STag = layoutMap[data.header_layout][1];
    }
 
    const alignMap: any = {
        left: styles.left,
        center: styles.center,
        right: styles.right
    };

    const positionClass = alignMap[data?.header_position] || "";
 
    let wrapperClass = styles.full;

    if (data?.imageorient == 17) wrapperClass = styles.intextRight;
    if (data?.imageorient == 18) wrapperClass = styles.intextLeft;
    if (data?.imageorient == 25) wrapperClass = styles.besideRight;
    if (data?.imageorient == 26) wrapperClass = styles.besideLeft;

    return (
        <header className={`${styles.wrapper} ${wrapperClass}`}>

            {data?.header_layout !== '100' && (
                <>
                    {data?.header &&
                        <HTag className={`${styles.title} ${positionClass}`}>
                            {hlink
                                ? (
                                    <Link
                                        href={hlink}
                                        aria-label={data?.header}
                                        target={data?.header_link_linkdata?.target !== '-' ? data?.header_link_linkdata?.target : undefined}
                                        className={data?.header_link_linkdata?.cssclass || ''}
                                        title={data?.header_link_linkdata?.title?.replace(/"/g,'') || undefined}
                                    >
                                        {data?.header}
                                    </Link>
                                )
                                : data?.header}
                        </HTag>
                    }

                    {data?.subheader &&
                        <STag className={`${styles.subtitle} ${positionClass}`}>
                            {data?.subheader}
                        </STag>
                    }
                </>
            )}

        </header>
    );
}
