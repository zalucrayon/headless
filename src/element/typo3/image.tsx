import Nimage from "../common/image";

export default async function image({ data, element, config }: any) {
    let classname = '';
    let col = 0;
    let _rowclass = '';
    if (data?.imageorient == 0) {
        classname = classname + 'ce-center text-center';
        _rowclass = 'justify-center';
    } else if (data?.imageorient == 1) {
        classname = classname + ' ce-end text-end';
        _rowclass = 'justify-end';
    } else if (data?.imageorient == 2) {
        _rowclass = 'justify-start';
        classname = classname + 'ce-start text-start';
    }
    if (data?.imagecols === 1) {
        classname = classname + " col-12";
        col = 1;
    } else if (data?.imagecols === 2) {
        classname = classname + " col-6";
        col = 2;
    } else if (data?.imagecols === 3) {
        classname = classname + " col-4";
        col = 3;
    } else if (data?.imagecols === 4) {
        classname = classname + " col-3";
        col = 4;
    } else if (data?.imagecols === 5) {
        classname = classname + " col-12-5";
        col = 5;
    } else if (data?.imagecols === 6) {
        classname = classname + " col-2";
        col = 6;
    } else if (data?.imagecols === 7) {
        classname = classname + " col-12-7";
        col = 7;
    } else if (data?.imagecols === 8) {
        classname = classname + " col-12-8";
        col = 8;
    }
    let _data: any = new Object();
    _data['eid'] = data.uid;
    _data['field'] = 'image';
    _data['table'] = 'tt_content';
    let __data: any = [];
    __data.push(_data);
    let _image: any = data?.image;
    return (
        <>
            <div className={`flex flex-wrap ${_rowclass} image_gallery`}>
                <div className="min-width-768">
                    {
                        _image?.length > 0 ?
                            Array.from({ length: Math.ceil(_image.length / col) }, (_, i) => (
                                <div className={`ce-row row custom-col-${_image?.length < col ? _image?.length + " " + _rowclass : col} `} key={"image_gallery_image_only" + i}>
                                    {
                                        _image.slice(i * col, (i + 1) * col).map((immg: any) => (
                                            <div className={`ce-column ${data?.imagewidth == 0 ? "w-auto" : ""} ${data?.imageheight == 0 ? 'h-auto' : ""}`} key={process.env.NEXT_PUBLIC_SERVER + data?.uid + immg?.uid} >
                                                <Nimage immg={immg} data={data} />
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                            : null
                    }
                </div>
            </div>
        </>
    )
}
