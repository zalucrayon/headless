import Nvideo from "../common/nvideo";
import Nimage from "../common/image";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles/uploads.module.css";

function sortFiles(files: any[], sortBy: string, direction: string) {
    if (!files?.length) return files;

    const dir = direction === 'desc' ? -1 : 1;

    const getValue = (f: any) => {
        switch (sortBy) {
            case 'creation_date': return new Date(f?.creation);
            case 'modification_date': return new Date(f?.modification);
            case 'name': return f?.name ?? '';
            case 'extension': return f?.extension ?? '';
            case 'type': return f?.type ?? f?.mimetype ?? '';
            case 'size': return f?.size ?? 0;
            case 'title': return f?.title ?? '';
            default: return 0;
        }
    };

    return [...files].sort((a, b) => {
        const A = getValue(a);
        const B = getValue(b);

        if (A < B) return -1 * dir;
        if (A > B) return 1 * dir;
        return 0;
    });
}


export default async function Uploads({ data, element, config }: any) {

    let files: any[] = [...(data?.media || [])];

    data?.file_collections?.forEach((c: any) => files.push(c));

    files = sortFiles(files, data?.filelink_sorting, data?.filelink_sorting_direction);

    const flatFiles = files.flatMap((f: any) =>
        f?.images ? f.images.map(() => f) : [f]
    );

    const formatSize = (bytes?: number) => {
        if (!bytes || bytes <= 0) return "0 B";

        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));

        return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
    };
    return (
        <>
            {flatFiles.map((file: any, i: number) => (
                <div className={styles.item} key={data?.uid + "-" + i}>

                    {data?.uploads_type == 2 ? (
                        <div className={styles.preview}>
                            {file?.mimetype?.includes('video/') || file?.mimetype?.includes('audio/')
                                ? <Nvideo immg={file} data={data} config={config} />
                                : <Nimage immg={file} data={data} />}
                        </div>
                    ) : data?.uploads_type == 1 ? (
                        <div className={styles.preview}>
                            <Image
                                src={'/FileIcons/' + file?.extension + '.gif'}
                                alt={config?.ativelang?.navigationTitle}
                                width={25}
                                height={10}
                                className={styles.icon}
                            />
                        </div>
                    ) : null}
 
                    <div className={styles.content}>
                        <Link href={file?.url} target={data?.target} className={styles.title}>
                            {file?.title || file?.name}
                        </Link>

                        {file?.description != "" &&
                            <p className={styles.description}>{file?.description}</p>}

                        <p className={styles.size}>{formatSize(file?.size)}</p>
                    </div>

                </div>
            ))}
        </>
    );
}
