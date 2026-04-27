import Nimage from "../common/image";
import Nvideo from "../common/nvideo";
import Cheader from "./cheader";
import styles from "./styles/textmedia.module.css";

function resolveLayout(orient: number) {
    switch (orient) {
        case 17: return "right";        // text right
        case 18: return "left";         // text left
        case 25: return "beside-right";
        case 26: return "beside-left";
        case 0: return "above";
        case 1: return "above";
        case 2: return "above";
        case 8: return "below";
        case 9: return "below";
        case 10: return "below";
        default: return "above";
    }
}


export default async function Textmedia({ data, element, config }: any) {

    const images = data?.assets || [];
    const layout = resolveLayout(data?.imageorient);
    const cols = data?.imagecols || 1;

    const renderMedia = () => (
        <div className={`${styles.gallery} ${styles["col-" + cols]}`}>
            {images.map((file: any, i: number) => (
                <div className={styles.media} key={data?.uid + "-" + i}>
                    {file?.mimetype?.includes("video") || file?.mimetype?.includes("audio")
                        ? <Nvideo immg={file} data={data} />
                        : <Nimage immg={file} data={data} />}
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
            {renderMedia()}
            {(layout === "below" || layout === "left" || layout === "beside-left") && renderText()}
        </div>
    );
}
