const requestHeaders: HeadersInit = new Headers();

  
export const submitForm = async (_data: any) => {
    let _url: any = String(process.env.NEXT_PUBLIC_SERVER) + String(process.env.NEXT_PUBLIC_API_BASE) + 'formsubmit';
    return await fetch(_url, {
        method: 'POST',
        body: JSON.stringify(_data),
        headers: requestHeaders, 
        mode: "no-cors",
    }).then((response) => {

        if (response.status == 200) {
            return response.json()
        } else {
            return { "errors": process.env.NEXT_PUBLIC_SERVER ? process.env.NEXT_PUBLIC_SERVER + " not working Proper!!" : "Please configure theme in typo3 & run command!!" };
        }
    }).catch((error) => {
        return { "errors": process.env.NEXT_PUBLIC_SERVER ? process.env.NEXT_PUBLIC_SERVER + " not working Proper!!" : "Please configure theme in typo3 & run command!!" }
    })
};  

export const fileUpload = async (_data: any) => {
    let _url: any = String(process.env.NEXT_PUBLIC_SERVER) + String(process.env.NEXT_PUBLIC_API_BASE) + 'formupload';
    return await fetch(_url, {
        method: 'POST',
        headers: requestHeaders,
        body: _data,
        mode: "no-cors",
    }).then((response) => {
        if (response.status == 200) {
            return response.json()
        } else {
            return { "errors": process.env.NEXT_PUBLIC_SERVER ? process.env.NEXT_PUBLIC_SERVER + " not working Proper!!" : "Please configure theme in typo3 & run command!!" };
        }
    }).catch((error) => {
        return { "errors": process.env.NEXT_PUBLIC_SERVER ? process.env.NEXT_PUBLIC_SERVER + " not working Proper!!" : "Please configure theme in typo3 & run command!!" }
    })
};
 
export const getPageComponents = async (_id:any,l:any,newsid:any=null,searchparams:any =null) => {
    let _url: any = String(process.env.NEXT_PUBLIC_SERVER) + String(process.env.NEXT_PUBLIC_API_BASE) + 'edata'; 
    const _params = new URLSearchParams(searchparams); 
    if(newsid){
        _params.set("newsid", newsid);
    }
    _params.set("uid", _id);
    _params.set("l", l);
    _url = _url + "?" + _params.toString();

    // console.log(_url);
    return await fetch(_url, {
        method: 'GET',
        cache: 'no-store',
    }).then((response) => {
        if (response.status == 200) {
            return response.json()
        } else {
            return { "errors": process.env.NEXT_PUBLIC_SERVER ? process.env.NEXT_PUBLIC_SERVER + " not working Proper!!" : "Please configure theme in typo3 & run command!!" };
        }
    }).catch((error) => {
        return { "errors": process.env.NEXT_PUBLIC_SERVER ? process.env.NEXT_PUBLIC_SERVER + " not working Proper!!" : "Please configure theme in typo3 & run command!!" }
    })
};