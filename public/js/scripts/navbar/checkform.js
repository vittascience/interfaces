'use strict';

function checkText (input,min,max){
    var value = input.value.trim();
    if (value.length === 0){
        input.className = "form-control";
    }
    else {
        if (value.length >= min && value.length <= max){
            input.className = "form-control is-valid";
        }
        else {
            input.className = "form-control is-invalid";
        }
    }
}

function checkPasswords (pwd,pwdConf){
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
    if (error && pwdValue.length > 0)
        pwd.className = "form-control is-invalid";
    if (pwdConfValue.length > 0){
        if (error === false && pwdConfValue === pwdValue)
            pwdConf.className = "form-control is-valid";
        else
            pwdConf.className = "form-control is-invalid";
    }
}

function checkName(input, min, max) {
    var value = input.value.trim();
    if (value.length === 0){
        input.className = "form-control";
    }
    else {
        if (value.length >= min && value.length <= max
            && value.match("^[a-zA-ZÀ-ÖØ-öø-ÿ\\-\\'\\s]+$")){
            input.className = "form-control is-valid";
        }
        else {
            input.className = "form-control is-invalid";
        }
    }
}

function checkMail(element){
    var value = element.value.trim();
    if (value.length === 0)
        element.className = 'form-control';
    else if (value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        element.className = 'form-control is-valid';
    else
        element.className = 'form-control is-invalid';
}

