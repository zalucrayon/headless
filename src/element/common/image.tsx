'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles/nimage.module.css";
import Modal from "./modal";

const renderImage = (
  _path: any,
  immg: any,
  data: any,
  setImgZoom: any,
  _width: any,
  _height: any,
  className: any,
  props: any
) => {
  return (
    <Image
      src={_path}
      alt={immg?.alternative ?? ''}
      title={immg?.title ?? ''}
      onClick={() => data?.image_zoom && setImgZoom(true)}
      width={data?.imagewidth || _width}
      height={data?.imageheight || _height}
      className={`
        ${data?.imageborder ? styles.imageBorder : ""}
        ${data?.image_zoom ? styles.zoomable : ""}
        ${className ?? ""}
      `}
      placeholder="blur"
      blurDataURL={`${process.env.NEXT_PUBLIC_DATA_BLUR_URL}`}
      {...props}
    />
  );
};

export default function Nimage({ immg, data, className, ...props }: any) {

  const [_imgzoom, setImgZoom] = useState(false);

  const image = renderImage(
    immg.url,
    immg,
    data,
    setImgZoom,
    immg.width,
    immg.height,
    className,
    props
  );

  return (
    <> 
      {immg?.link ? (
        <Link href={immg.link}>{image}</Link>
      ) : (
        image
      )}
 
      {immg?.description && (
        <p className={styles.caption}>{immg.description}</p>
      )}
 
      <Modal
        show={_imgzoom}
        title={immg?.title}
        onClose={() => setImgZoom(false)}
        size="lg"
      >
        <div className={styles.modalBody}>
          {renderImage(
            immg.url,
            immg,
            { ...data, image_zoom: false },  
            () => {},
            immg.width,
            immg.height,
            "",
            props
          )}
        </div>
      </Modal>
    </>
  );
}
