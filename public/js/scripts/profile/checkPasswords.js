var passwordInput = document.getElementById("new-password-input");
passwordInput.onkeyup = function (){
    checkPasswords(this,document.getElementById("new-password-conf-input"));
    checkPasswordForm();
};

var passwordConfInput = document.getElementById("new-password-conf-input");
passwordConfInput.onkeyup = function (){
    checkPasswords(document.getElementById("new-password-input"),this);
    checkPasswordForm();
};

var oldPasswordInput = document.getElementById("old-password-input");
oldPasswordInput.onkeyup = function (){
    checkPasswordForm();
};

var changePwdButton = document.getElementById("change-pwd-button");
changePwdButton.onclick = function (ev){
    ev.preventDefault();
    changePwdButton.style.cursor = "not-allowed";
    changePwdButton.setAttribute("disabled","disabled");
    modifyPassword();
};

function checkPasswordForm(){
    var error = true;
    var oldPassword = oldPasswordInput.value;
    if (oldPassword.match("[a-z]+")){
        if (oldPassword.match("[A-Z]+")){
            if (oldPassword.match("[0-9]+")){
                if (oldPassword.length >= 8){
                    oldPasswordInput.className = "form-control is-valid";
                    error = false;
                }
            }
        }
    }
    if (oldPassword.length > 0){
        if (error)
            oldPasswordInput.className = "form-control is-invalid";
    } else {
        oldPasswordInput.className = "form-control";
    }
    if (passwordInput.className !== "form-control is-valid"
        || passwordConfInput.className !== "form-control is-valid"
        || oldPasswordInput.className !== "form-control is-valid"){
        error = true;
    }
    if (!error){
        changePwdButton.removeAttribute("disabled");
        changePwdButton.style.cursor = "pointer";
    } else {
        changePwdButton.setAttribute("disabled","disabled");
        changePwdButton.style.cursor = "not-allowed";
    }
}