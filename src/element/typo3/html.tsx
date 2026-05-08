import DOMPurify from "dompurify";

export default function html({ data, element }: any) {
    console.log("file call");
    return (
        <>
            {
                data?.bodytext ?
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.bodytext) }}></div>
                    : null
            }
        </>
    )
}
