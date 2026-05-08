import styles from "./styles/divider.module.css";

export default function Divider({ data, element }: any) {
    console.log("file call");
    return (
        <hr className={styles.divider} />
    )
}
