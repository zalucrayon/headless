const requestHeaders: HeadersInit = new Headers();
export const dummy = true;

export const submitForm = async (_data: any) => {
    const baseUrl = typeof window !== 'undefined' ? '/api-proxy/' : String(process.env.NEXT_PUBLIC_SERVER) + String(process.env.NEXT_PUBLIC_API_BASE);
    const _url: any = baseUrl + 'formsubmit';
    return await fetch(_url, {
        method: 'POST',
        body: JSON.stringify(_data),
        headers: requestHeaders,
    }).then((response) => {

        if (response.status == 200) {
            return response.json()
        } else {
            return { "errors": "Service unavailable. Please ensure the backend is properly configured or try again later." };
        }
    }).catch((error) => {
        return { "errors": "Service unavailable. Please ensure the backend is properly configured or try again later." }
    })
};


export const fileUpload = async (_data: any) => {
    const baseUrl = typeof window !== 'undefined' ? '/api-proxy/' : String(process.env.NEXT_PUBLIC_SERVER) + String(process.env.NEXT_PUBLIC_API_BASE);
    const _url: any = baseUrl + 'formupload';
    return await fetch(_url, {
        method: 'POST',
        headers: requestHeaders,
        body: _data,
    }).then((response) => {
        if (response.status == 200) {
            return response.json()
        } else {
            return { "errors": "Service unavailable. Please ensure the backend is properly configured or try again later." };
        }
    }).catch((error) => {
        return { "errors": "Service unavailable. Please ensure the backend is properly configured or try again later." }
    })
};

export const getPageComponents = async (_id: any, l: any, newsid: any = null, searchparams: any = null, postslug: any = null) => {
    const baseUrl = typeof window !== 'undefined' ? '/api-proxy/' : String(process.env.NEXT_PUBLIC_SERVER) + String(process.env.NEXT_PUBLIC_API_BASE);
    let _url: any = baseUrl + 'edata';
    const _params = new URLSearchParams(searchparams);
    if (newsid) {
        _params.set("newsid", newsid);
    }
    if (postslug) {
        _params.set("postslug", postslug);
    }
    _params.set("uid", _id);
    _params.set("l", l);
    _url = _url + "?" + _params.toString();

    console.log(_url)

    return await fetch(_url, {
        method: 'GET',
        cache: 'no-store',
    }).then((response) => {
        if (response.status == 200) {
            return response.json()
        } else {
            return { "errors": "Service unavailable. Please ensure the backend is properly configured or try again later." };
        }
    }).catch((error) => {
        return { "errors": "Service unavailable. Please ensure the backend is properly configured or try again later." }
    })
};