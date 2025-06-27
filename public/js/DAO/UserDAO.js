function getUser (id,callback,argument){
    var request = getAjaxRequest();
    request.onreadystatechange = function (){
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
                var array = JSON.parse(request.responseText);
                var object;
                if (array["teacherData"] === undefined){
                    object = arrayToUser(array);
                } else {
                    object = arrayToTeacher(array);
                }
                if (argument === undefined)
                    callback(object);
                else
                    callback(object,argument);
            }
            else {
                console.log("Request failed: " + request.status);
            }
        }
    };
    request.open("GET","/services/get/getUser.php?id=" + id,true);
    //request.noCache();
    request.send();
}

function checkMailExists(mail,callback){
    var request = getAjaxRequest();
    request.onreadystatechange = function (){
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
                var json = JSON.parse(request.responseText);
                callback(json.exists);
            }
            else {
                console.log("Request failed: " + request.status);
            }
        }
    };
    request.open("GET","/services/get/checkMail.php?email=" + mail);
    //request.noCache();
    request.send();
}
