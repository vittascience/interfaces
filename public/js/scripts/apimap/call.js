function callData(key) {
    let request = getAjaxRequest();

    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let resp = JSON.parse(request.responseText);
                console.log(resp);
                if (resp.success === false)
                    displayAPIError();
                else
                    displayData(resp);
            } else {

            }
        }
    };
    request.open("GET", "/api/?apiKey=" + key);
    request.send();
}