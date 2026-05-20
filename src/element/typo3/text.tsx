import DOMPurify from "isomorphic-dompurify";

export default function text({ data, element }: any) {
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
