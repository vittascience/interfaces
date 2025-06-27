var mainInfoBox = document.getElementById("add-resource-info-box");
function sendResource(){
    if ($("#add-resource-progress-bar").is(":visible")){
        $("#add-resource-progress-bar").css("display","none");
        $("#add-resource-progress-bar-status").val("");
        $("#add-resource-progress-bar-completed").css("width","0");
    }
    disableButton(sendResourceBtn);
    var formData = new FormData(document.getElementById("add-resource-form"));
    if (!resourceFileInput.files[0]) {
        formData.delete("document");
    }
    var request = getAjaxRequest();
    mainInfoBox.style.display = "none";
    mainInfoBox.innerHTML = "";

    request.upload.onprogress = function (ev){
        if (ev.lengthComputable) {
            var percentComplete = Math.floor((ev.loaded / ev.total)*100);
            var bar = document.getElementById("add-resource-progress-bar-completed");
            bar.style.width = percentComplete + "%";
            document.getElementById("add-resource-progress-bar-status").innerHTML =
                percentComplete.toString() + "%";
        }
    };

    request.onreadystatechange = function (){
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
                var json = JSON.parse(request.responseText);
                if (json.answer === true){
                    mainInfoBox.className = "mb- 2 alert alert-success";
                    var msg = "";
                    if (!modify) {
                        msg += "<span class='fa fa-check'></span> " + i18next.t('addResource.success.uploadAdd');
                    } else {
                        msg += "<span class='fa fa-check'></span> " + i18next.t('addResource.success.uploadModify');
                    }
                    msg += " " + i18next.t('addResource.success.resume');
                    mainInfoBox.innerHTML = msg;
                    $("#add-resource-form").fadeOut("slow");
                    $("html, body").animate({scrollTop: 0}, "slow");
                } else {
                    mainInfoBox.className = "mb- 2 alert alert-danger";
                    var list = document.createElement("ul");
                    var title = document.createElement("p");
                    title.innerHTML = "<span class='fa fa-exclamation-triangle'></span> "+i18next.t('addResource.errors.multipleErrors')+" ";
                    for (var i = 0; i < json.messages.length; i ++){
                        var error = document.createElement("li");
                        error.innerHTML = json.messages[i];
                        list.appendChild(error);
                    }
                    mainInfoBox.appendChild(title);
                    mainInfoBox.appendChild(list);
                }
            } else {
                console.log("Request failed" + request.status);
                enableButton(sendResourceBtn);
            }
            $(mainInfoBox).fadeIn("slow");
        }
    };
    $("#add-resource-progress-bar").fadeIn("slow",function() {
        if (!modify) {
            request.open("POST", "/services/post/postResource.php");
        } else
            request.open("POST", "/services/post/postModifyResource.php");
        request.send(formData);
    });
}