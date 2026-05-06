export default function text({ data, element }: any) {
    console.log("file call");
    return (
        <>
            {
                data?.bodytext ?
                    <div dangerouslySetInnerHTML={{ __html: data?.bodytext }}></div>
                    : null
            }
        </>
    )
}
