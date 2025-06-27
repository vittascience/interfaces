function switchLang(code) {
    const isDoubleLangCookies = document.cookie.split('; ').map((cookie) =>{ return cookie.split('=')}).filter((cookie) => {return cookie[0] === 'lng'}).length > 1;
    if (isDoubleLangCookies) {
        document.cookie = `lng=; expires=${new Date(-1)}; path=/; domain=.vittascience.com`;
        document.cookie = `lng=; expires=${new Date(-1)}; path=/; domain=${location.hostname}`;
    }
    // create/bind data
    let d = new Date();
    let queryString = location.search 
    const urlParams = new URLSearchParams(queryString);
    const learnPathRegex = /vittascience(\.com)?\/learn/

    //set cookie for 1 years
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); 
    setCookie("lng", code, d.toUTCString()) 

    // set custom behaviour for "learn" path 
    if( learnPathRegex.test(location) && urlParams.get('lang')){
        // get languages array from url search params
        const searchLanguages = urlParams.get('lang').split(',')

        // the language to switch to is not part of the array
        if(!searchLanguages.includes(code)){
            // add it to the array and generate the related language(s) string
            searchLanguages.push(code)
            const updatedLanguages = searchLanguages.join(',')
            
            // append the language string to the url lang param and redirect the user
            location.search = queryString.replace(urlParams.get('lang'),updatedLanguages )
            location.href(location)
        }
    }
     location.reload();
}