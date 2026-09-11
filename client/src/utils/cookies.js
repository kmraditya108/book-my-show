export const getCookies = (name) => {
    const cookies = document.cookie.split(';');
    for(let cookie of cookies){
        cookie = cookie.trim();
        if(cookie.startsWith(name+'=')){
            const cookieData= cookie.substring(name.length+1);
            console.log("cookies Data >> ", cookieData);
            return cookieData;
            
        }
    }
    return null;
}

export const setCookies = (data) => {
    const cookies = document.cookie.split(';');
    if(cookies.length>0){
        document.cookie += `${data};`
    }else{
        document.cookie = `${data};`;
    }
}