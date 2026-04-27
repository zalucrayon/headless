export default function html({ data, element }: any) {
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
