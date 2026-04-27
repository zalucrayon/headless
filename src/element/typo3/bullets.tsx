import styles from "./styles/bullets.module.css";

export default function Text({ data, element }: any) {

    const list = data?.bodytext?.split('\r\n');

    let Tag: any = null;
    let Item: any = null;
    let className = "";

    if (data?.bullets_type == 0) {
        Tag = "ul";
        Item = "li";
        className = `${styles.list} ${styles.ul}`;
    }

    if (data?.bullets_type == 1) {
        Tag = "ol";
        Item = "li";
        className = `${styles.list} ${styles.ol}`;
    }

    if (data?.bullets_type == 2) {
        Tag = "dl";
        Item = "dt";
        className = `${styles.dl}`;
    }

    if (!Tag || !list?.length) return null;

    return (
        <Tag className={className}>
            {list.map((line: any, k: any) => (
                <Item
                    key={k}
                    className={Item === "dt" ? styles.dt : styles.li}
                >
                    {line}
                </Item>
            ))}
        </Tag>
    );
}
