export default function tablet3({ data, element }: any) {
    const delimter = data?.table_delimiter;
    const enclosure = data?.table_enclosure;
    const table_class = data?.table_class ? " table-" + data?.table_class : null;
    const cols = data?.cols;
    const table_header_position = data?.table_header_position;
    const table_tfoot = data?.bodytext.split('\r\n')?.length - 1 > 1 ? data?.table_tfoot : 0;
    const last_index = table_tfoot == 1 ? data?.bodytext.split('\r\n').length - 2 : data?.bodytext.split('\r\n')?.length;
    const tfoot_last_index = table_tfoot == 1 ? data?.bodytext.split('\r\n').length - 1 : data?.bodytext.split('\r\n')?.length;
    let _sign = '';
    if (delimter == 124) {
        _sign = '|';
    }
    if (delimter == 59) {
        _sign = ';';
    }
    if (delimter == 44) {
        _sign = ',';
    }
    if (delimter == 58) {
        _sign = ':';
    }
    if (delimter == 9) {
        _sign = '⇥';
    }
    return (
        <>
            {
                data?.bodytext.split('\r\n')?.length > 0 ?
                    <table className={`table ${table_class} w-100`}>
                        {data?.table_caption !== '' ?
                            <caption>{data?.table_caption}</caption>
                            : null}
                        <tbody>

                            {
                                data?.bodytext.split('\r\n').map((_row: any, i: any) => (
                                    _row !== "" ?
                                        last_index > i ?
                                            table_header_position == 1 && i == 0 ?
                                                <tr key={i + 'tr/td'}>
                                                    {
                                                        cols !== 0 ?
                                                            Array.from({ length: cols }, (_, i) => (
                                                                <th key={_row?.split(_sign) + i + 'th/th' + "_" + i} >
                                                                    {(() => {
                                                                        let val = _row?.split(_sign)?.[i] ?? ' ';
                                                                        if (enclosure === 39) {
                                                                            val = val.replace(/'/g, '');
                                                                        } else if (enclosure === 34 || enclosure === 0) {
                                                                            val = val.replace(/"/g, "");
                                                                        }
                                                                        return val;
                                                                    })()}  &nbsp;
                                                                </th>
                                                            ))
                                                            :
                                                            _row?.split(_sign).map((th: any, j: any) => (
                                                                <th key={i + 'th/th' + j} >
                                                                    {(() => {
                                                                        let val = th ?? ' ';
                                                                        if (enclosure === 39) {
                                                                            val = val.replace(/'/g, '');
                                                                        } else if (enclosure === 34 || enclosure === 0) {
                                                                            val = val.replace(/"/g, "");
                                                                        }
                                                                        return val;
                                                                    })()}   &nbsp;
                                                                </th>
                                                            ))
                                                    }
                                                </tr>
                                                :
                                                <tr key={i + 'tr/td'}>
                                                    {
                                                        cols !== 0 ?
                                                            Array.from({ length: cols }, (_, i) => (
                                                                table_header_position == 2 && i == 0 ?
                                                                    <th key={_row + '_' + i}>
                                                                        {(() => {
                                                                            let val = _row?.split(_sign)?.[i] ?? ' ';
                                                                            if (enclosure === 39) {
                                                                                val = val.replace(/'/g, '');
                                                                            } else if (enclosure === 34 || enclosure === 0) {
                                                                                val = val.replace(/"/g, "");
                                                                            }
                                                                            return val;
                                                                        })()}
                                                                        &nbsp;
                                                                    </th>
                                                                    :
                                                                    <td key={_row?.split(_sign) + i + 'td/td' + "_" + i} >
                                                                        {(() => {
                                                                            let val = _row?.split(_sign)?.[i] ?? ' ';

                                                                            if (enclosure === 39) {
                                                                                val = val.replace(/'/g, '');
                                                                            } else if (enclosure === 34 || enclosure === 0) {
                                                                                val = val.replace(/"/g, "");
                                                                            }

                                                                            return val;
                                                                        })()}
                                                                        &nbsp;
                                                                    </td>
                                                            ))
                                                            :
                                                            _row?.split(_sign).map((td: any, j: any) => (
                                                                table_header_position == 2 && j == 0 ?
                                                                    <th key={i + 'th/th' + j} >
                                                                        {(() => {
                                                                            let val = td ?? ' ';
                                                                            if (enclosure === 39) {
                                                                                val = val.replace(/'/g, '');
                                                                            } else if (enclosure === 34 || enclosure === 0) {
                                                                                val = val.replace(/"/g, "");
                                                                            }
                                                                            return val;
                                                                        })()}   &nbsp;
                                                                    </th>
                                                                    :
                                                                    <td key={i + 'td/td' + j} >
                                                                        {(() => {
                                                                            let val = td ?? ' ';
                                                                            if (enclosure === 39) {
                                                                                val = val.replace(/'/g, '');
                                                                            } else if (enclosure === 34 || enclosure === 0) {
                                                                                const regex = /^"?([^";|]*?)"?([;|].*)?$/;
                                                                                val = val.replace(regex, '$1$2');
                                                                            }
                                                                            return val;
                                                                        })()}   &nbsp;
                                                                    </td>
                                                            ))
                                                    }
                                                </tr>
                                            : null
                                        : null
                                ))
                            }
                        </tbody>
                        {
                            table_tfoot == 1 ?
                                <tfoot>
                                    {
                                        data?.bodytext.split('\r\n')[last_index] !== "" ?
                                            <tr key={last_index + 'tr/td'}>
                                                {
                                                    cols !== 0 ?
                                                        Array.from({ length: cols }, (_, i) => (
                                                            table_header_position == 2 && i == 0 ?
                                                                <th key={data?.bodytext.split('\r\n')[last_index]?.split(_sign) + i + 'td/td' + "_" + i}>
                                                                    {(() => {
                                                                        let val = data?.bodytext.split('\r\n')[last_index]?.split(_sign)[i] ? data?.bodytext.split('\r\n')[last_index]?.split(_sign)[i] : " ";
                                                                        if (enclosure === 39) {
                                                                            val = val.replace(/'/g, '');
                                                                        } else if (enclosure === 34 || enclosure === 0) {
                                                                            val = val.replace(/"/g, "");
                                                                        }
                                                                        return val;
                                                                    })()}  &nbsp;
                                                                </th>
                                                                :
                                                                <td key={data?.bodytext.split('\r\n')[last_index]?.split(_sign) + i + 'td/td' + "_" + i}>
                                                                    {(() => {
                                                                        let val = data?.bodytext.split('\r\n')[last_index]?.split(_sign)[i] ? data?.bodytext.split('\r\n')[last_index]?.split(_sign)[i] : " ";
                                                                        if (enclosure === 39) {
                                                                            val = val.replace(/'/g, '');;
                                                                        } else if (enclosure === 34 || enclosure === 0) {
                                                                            val = val.replace(/"/g, "");
                                                                        }
                                                                        return val;
                                                                    })()}  &nbsp;
                                                                </td>
                                                        ))
                                                        :
                                                        data?.bodytext.split('\r\n')[last_index]?.split(_sign).map((td: any, j: any) => (
                                                            table_header_position == 2 && j == 0 ?
                                                                <th key={last_index + 'th/th' + j}>
                                                                    {(() => {
                                                                        let val = td ?? " ";
                                                                        if (enclosure === 39) {
                                                                            val = val.replace(/'/g, '');;
                                                                        } else if (enclosure === 34 || enclosure === 0) {
                                                                            val = val.replace(/"/g, "");
                                                                        }
                                                                        return val;
                                                                    })()}  &nbsp;
                                                                </th>
                                                                :
                                                                <td key={last_index + 'td/td' + j}>
                                                                    {(() => {
                                                                        let val = td ?? " ";
                                                                        if (enclosure === 39) {
                                                                            val = val.replace(/'/g, '');;
                                                                        } else if (enclosure === 34 || enclosure === 0) {
                                                                            val = val.replace(/"/g, "");
                                                                        }
                                                                        return val;
                                                                    })()}   &nbsp;
                                                                </td>
                                                        ))
                                                }
                                            </tr>
                                            : null
                                    }
                                </tfoot>
                                : null
                        }
                    </table>
                    : null
            }
        </>
    )
}
