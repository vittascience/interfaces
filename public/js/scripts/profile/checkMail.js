var emailInput = document.getElementById("change-email-input");
var changeMailBtn = document.getElementById("change-email-button");

emailInput.onkeyup = function (ev){
    checkMail(this);
    checkMailForm();
};

changeMailBtn.onclick = function (ev){
  ev.preventDefault();
  changeMailBtn.setAttribute("disabled","disabled");
  changeMailBtn.style.cursor = "not-allowed";
  modifyMail();
};

function checkMailForm(){
    if (emailInput.className === "form-control is-valid"){
        changeMailBtn.removeAttribute("disabled");
        changeMailBtn.style.cursor = "pointer";
    } else {
        changeMailBtn.setAttribute("disabled","disabled");
        changeMailBtn.style.cursor = "not-allowed";
    }
}