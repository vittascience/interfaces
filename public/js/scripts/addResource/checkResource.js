const RESOURCE_NAME_MIN_SIZE = 1;
const RESOURCE_NAME_MAX_SIZE = 100;
const RESOURCE_DESCRIPTION_MIN_SIZE = 1;
const RESOURCE_DESCRIPTION_MAX_SIZE = 300;

const RESOURCE_FILE_MAX_SIZE = 10000000;

var modify = parseInt(document.getElementById("modify").value);

var resourceNameInput = document.getElementById("resource-name-input");
var resourceDescriptionInput = document.getElementById("resource-description-input");
var resourceFileInput = document.getElementById("resource-file-input");

var fileInfoBox = document.getElementById("resource-file-info-box");

var sendResourceBtn = document.getElementById("send-resource-button");
sendResourceBtn.onclick = function (ev){
    ev.preventDefault();
    sendResource();
};

resourceNameInput.onkeyup = function (){
    checkText(this,RESOURCE_NAME_MIN_SIZE, RESOURCE_NAME_MAX_SIZE);
    checkResourceForm();
};

resourceDescriptionInput.onkeyup = function (){
    checkText(this,RESOURCE_DESCRIPTION_MIN_SIZE, RESOURCE_DESCRIPTION_MAX_SIZE);
    checkResourceForm();
};

resourceFileInput.onchange = function () {
    if (this.files[0].size > RESOURCE_FILE_MAX_SIZE) {
        fileInfoBox.className = "mt-2 alert alert-danger";
        fileInfoBox.innerHTML = "<span class='fa fa-times'></span> " + i18next.t('addResource.errors.fileInvalid', {'maxi':RESOURCE_FILE_MAX_SIZE / 1000000});
    }
    else if (this.files[0].type !== "application/pdf") {
        fileInfoBox.className = "mt-2 alert alert-danger";
        fileInfoBox.innerHTML = "<span class='fa fa-times'></span> " + i18next.t('addResource.errors.fileInvalid', {'maxi':RESOURCE_FILE_MAX_SIZE / 1000000});
    }
    else {
        fileInfoBox.className = "mt-2 alert alert-success";
        fileInfoBox.innerHTML = "<span class='fa fa-check'></span> " + i18next.t('addResource.success.fileValid');
    }
    checkResourceForm();
};


function checkResourceForm(){

    if (    !$(resourceNameInput).hasClass("is-valid")
        ||  !$(resourceDescriptionInput).hasClass("is-valid")
        ||  !(!modify && $(resourceFileInput).hasClass("is-valid"))
    ){
        enableButton(sendResourceBtn);
    }

    else
        disableButton(sendResourceBtn);
}

window.onload = function (){
  if (modify){
      $(resourceNameInput).trigger("keyup");
      !$(resourceDescriptionInput).trigger("keyup");
  }
};