import Nimage from "../common/image";
import Cheader from "./cheader";
import styles from "./styles/textpic.module.css";

function resolveLayout(orient: number) {
    switch (orient) {
        case 17: return "right";
        case 18: return "left";
        case 25: return "beside-right";
        case 26: return "beside-left";
        case 8:
        case 9:
        case 10: return "below";
        default: return "above";
    }
}


export default async function TextPic({ data, element, config }: any) {

    const images = data?.image || [];
    const layout = resolveLayout(data?.imageorient);
    const cols = data?.imagecols || 1;

    const renderImages = () => (
        <div className={`${styles.gallery} ${styles["col-" + cols]}`}>
            {images.map((img: any, i: number) => (
                <div className={styles.image} key={data?.uid + "-" + i}>
                    <Nimage immg={img} data={data} />
                </div>
            ))}
        </div>
    );

    const renderText = () => (
        <div className={styles.text}>
            <Cheader data={data} config={config} />
            {data?.bodytext &&
                <div dangerouslySetInnerHTML={{ __html: data.bodytext }} />}
        </div>
    );

    return (
        <div className={`${styles.wrapper} ${styles[layout]}`}>
            {(layout === "above" || layout === "right" || layout === "beside-right") && renderText()}
            {renderImages()}
            {(layout === "below" || layout === "left" || layout === "beside-left") && renderText()}
        </div>
    );
}
