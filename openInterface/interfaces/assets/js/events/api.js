var APISendData = false;
var APIData = "";

/**
 * Generate a new api key for the user
 */
function generateApiKey() {
    let button = $(".gen-api");
    //disableButton(button);
    let request = getAjaxRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                //all good
                let response = JSON.parse(request.responseText);
                if (response.success)
                    $('.form-api-key').val(response.msg.apiKey);
                else {}
            } else {}
        }
    }
    if ($('.form-api-key').val() !== '')
        request.open("POST", "/services/post/postAPIKey.php?renew=1");
    else
        request.open("POST", "/services/post/postAPIKey.php?renew=0");
    request.send();
}
/**
 * Get the api key from database and display it in the DOM element
 * @param DOMElement 
 */
function getAPIKey(div) {
    let switchCheked = '';
    if (APISendData) { switchCheked = 'checked' };
    
    let request = getAjaxRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let response = JSON.parse(request.responseText);
                if (response.success) {
                    let keyHtml = '';
                    if (response.msg !== "noKey") {
                        keyHtml = 'https://vittascience.com/api/?apiKey=' + response.msg.apiKey;
                    } else {
                        keyHtml = 'Pas de clé';
                    }
                    document.getElementById("api-key-input").value = keyHtml;
                }
            } else {
                document.getElementById("api-key-form").style.userSelect = "none";
                document.getElementById("api-key-form").style.pointerEvents = "none";
                document.getElementById("api-key-form").style.opacity = "0.5";
                document.getElementById("api-key-form").style.filter = "alpha(opacity=50)";



                document.getElementById("api-warning").style.display = "block";
            }
        }
    }
    request.open("GET", "/services/get/getAPIKey.php");
    request.send();
}
/**
 * Format the data to the api use
 * @param Array 
 */
function prepareToApi(data) {
    let msgLine = "";

    for (let i = 1; i < data.length; i++) {
        msgLine += data[i][0] + ':' + data[i][1] + ';';
    }
    APIData = msgLine.substr(0, msgLine.length - 1);
}
/**
 * Update the api with data
 * @param Array 
 */
function updateData(datas) {
    if (datas === "") {
        return;
    }
    let request = getAjaxRequest();
    let formData = new FormData();
    formData.append("datas", datas);
    if (projectHandler.id !== null && projectHandler.opened === true) {
        formData.append("projectId", projectHandler.id);
    } else {
        formData.append("projectId", 'false');
    }
    request.onreadystatechange = function () {
        if (request.status === 200 && request.responseText !== "") {
            let resp = JSON.parse(request.responseText);
            if (!resp.success)
                console.error("Error while sending to server.");
        }
    };
    request.open("POST", "/services/post/postAPIData.php");
    request.send(formData);
}
/**
 * Delete the api data
 */
function clearApi() {
    let request = getAjaxRequest();
    request.open("DELETE", "/services/delete/deleteAPIData.php")
    request.send();
}
/**
 * Enable the api 
 */
//todo  : REFACTOR
function enableApi() {
    if (APISendData === false) {
        if (APITIMEOUT >= 2000) {
            APISendData = setInterval(function () {
                updateData(APIData);
            }, APITIMEOUT);
        }
    } else {
        clearInterval(APISendData);
        clearApi();
        APISendData = false;
    }
}

/**
 * Prepare the copy to clipboard for the api key
 */
function copyAPIKey() {
    let form = $('#form-api-key');
    let message = $('#success-copy');
    copyToClipboard(form, message);
}