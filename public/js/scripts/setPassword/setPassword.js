"use strict";
var pwd = document.getElementById("new-password-input");
var pwdConf = document.getElementById("new-password-conf-input");

function checkForm (){
    var pwdValue = pwd.value;
    var pwdConfValue = pwdConf.value;
    if (pwdValue.length === 0)
        pwd.className = "form-control";
    if (pwdConfValue.length === 0)
        pwdConf.className = "form-control";
    var error = true;
    if (pwdValue.match("[a-z]+")){
        if (pwdValue.match("[A-Z]+")){
            if (pwdValue.match("[0-9]+")){
                if (pwdValue.length >= 8){
                    pwd.className = "form-control is-valid";
                    error = false;
                }
            }
        }
    }
    if (error)
        pwd.className = "form-control is-invalid";
    if (pwdConfValue.length > 0){
        if (error === false && pwdConfValue === pwdValue)
            pwdConf.className = "form-control is-valid";
        else
            pwdConf.className = "form-control is-invalid";
    }
    if (pwdConf.className === "form-control is-valid" && pwd.className === "form-control is-valid")
    {
        $("#submit-button").removeAttr("disabled");
        $("#submit-button").css("cursor","pointer");
    }
    else
    {
        $("#submit-button").attr("disabled","disabled");
        $("#submit-button").css("cursor","not-allowed");
    }
}

$("#submit-button").click(function (e){
    e.preventDefault();
    $(this).attr("disabled","disabled");
    $(this).css("cursor","not-allowed");
    var password = $("#new-password-input").val();
    sendNewPassword(password);
});

function toggleSetPassword() {
    const pwdInput = document.getElementById("new-password-input");
    const toggler = document.getElementById("set-pwd-toggler-icon");

    if (pwdInput.getAttribute("type") == "password") {
        toggler.classList.remove("fa-eye");
        toggler.classList.add("fa-eye-slash");
        pwdInput.setAttribute("type", "text");
    } else {
        toggler.classList.remove("fa-eye-slash");
        toggler.classList.add("fa-eye");
        pwdInput.setAttribute("type", "password");
    }
}

function sendNewPassword(password){
    var request = getAjaxRequest();
    var formData = new FormData();
    var box = $("#info-box");
    box.css("display","none");
    formData.append("password",password);
    formData.append("token",$_GET("token"));
    formData.append("mail",$_GET("mail"));
    request.onreadystatechange = function (){
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
                var response = JSON.parse (request.responseText);
                if (response.success){
                    box.attr("class","alert alert-success");
                    box.html(i18next.t('setPassword.success'));
                    box.fadeIn("slow");
                    $("#reset-password-form").fadeOut("slow");
                }
                else {
                    box.attr("class","alert alert-danger");
                    box.html("Erreur.");
                    box.fadeIn("slow");
                    $("#submit-button").removeAttr("disabled");
                    $("#submit-button").css("cursor","pointer");
                }
            }
            else {
                console.log("Request failed: " + request.status);
            }
        }
    };
    request.open("POST","/services/post/postNewPassword.php");
    request.send(formData);
}