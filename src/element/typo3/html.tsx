export default function html({ data, element }: any) {
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
