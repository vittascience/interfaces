function generateApiKey() {
    let button = $(".gen-api");
    //disableButton(button);
    let request = getAjaxRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                //all good
                let response = JSON.parse(request.responseText);
                if (response.success)
                    $('.form-api-key').val(response.msg.apiKey);
                else {
                    //error
                }
            } else {
                //error
                console.log(request.responseText);
            }
            //enableButton(button);
        }
    }
    if ($('.form-api-key').val() !== '')
        request.open("POST", "/services/post/postAPIKey.php?renew=1");
    else
        request.open("POST", "/services/post/postAPIKey.php?renew=0");
    request.send();
}