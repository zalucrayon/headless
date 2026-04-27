export default function text({ data, element }: any) {
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
