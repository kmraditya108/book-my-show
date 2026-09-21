export const getCookies = (name) => {
    const cookies = document.cookie.split(';');
    for(let cookie of cookies){
        cookie = cookie.trim();
        if(cookie.startsWith(name+'=')){
            const cookieData= cookie.substring(name.length+1);
            // // console.log("cookies Data >> ", cookieData);
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

export const resetCookies = () => {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        // Extract the name of the cookie (and trim whitespace)
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        
        // Expire the cookie across the common path configurations
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}