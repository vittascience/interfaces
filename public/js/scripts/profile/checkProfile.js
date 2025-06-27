const MAX_USER_FILE_SIZE = 250000;

var submitButtonProfile = document.getElementById("modify-profile-button");

submitButtonProfile.onclick = function (ev) {
    ev.preventDefault();
    modifyProfile();
};

var surnameInputProfile = document.querySelector("#profile-form #surname-input");
surnameInputProfile.onkeyup = function () {
    checkName(this, SURNAME_MIN_LENGTH, SURNAME_MAX_LENGTH);
    checkProfileForm();
};

var firstnameInputProfile = document.querySelector('#profile-form #firstname-input');
firstnameInputProfile.onkeyup = function () {
    checkName(this, FIRSTNAME_MIN_LENGTH, FIRSTNAME_MAX_LENGTH);
    checkProfileForm();
};

var phoneInputProfile = document.querySelector('#profile-form #phone-input');
phoneInputProfile.onkeyup = function () {
    checkPhone(this);
    checkProfileForm();
};

var bioInputProfile = document.querySelector('#profile-form #bio-input');
bioInputProfile.onkeyup = function () {
    checkText(this, BIO_MIN_LENGTH, BIO_MAX_LENGTH);
    checkProfileForm();
};

var fileInputProfile = document.getElementById("profile-picture-file-input");
var fileErrorBox = document.getElementById("file-error-box");
fileInputProfile.onchange = function () {
    fileErrorBox.className = "";
    fileErrorBox.innerHTML = "";
    if (this.files.length > 0) {
        if (this.files[0].size >= MAX_USER_FILE_SIZE) {
            fileErrorBox.className = "alert alert-danger";
            fileErrorBox.innerHTML = "<span class='fa fa-times'></span> Fichier invalide ! Taille maximum autorisée: 250 Ko.";
        } else {
            fileErrorBox.className = "alert alert-success";
            fileErrorBox.innerHTML = "<span class='fa fa-check'></span> La taille du fichier est valide.";
        }
    }
    checkProfileForm();
};

var isTeacherProfile = false;

if (document.getElementById("teacher-form") != null) {
    isTeacherProfile = true;
    var schoolInputProfile = document.getElementById("teacher-school-input");
    schoolInputProfile.onkeyup = function () {
        checkText(this, TEACHER_SCHOOL_MIN_LENGTH, TEACHER_SCHOOL_MAX_LENGTH);
        checkProfileForm();
    };
    schoolInputProfile.onchange = function () {
        checkText(this, TEACHER_SCHOOL_MIN_LENGTH, TEACHER_SCHOOL_MAX_LENGTH);
        checkProfileForm();
    };
    document.getElementById("teacher-grade-input").onchange = function () {
        var grade = parseInt(this.value);
        fillSubjects(grade);
    };
    $("#teacher-school-input").trigger("keyup");
    $("#teacher-school-input").easyAutocomplete(autoCompleteSchoolOptions);
}

$(phoneInputProfile).trigger("keyup");
$(firstnameInputProfile).trigger("keyup");
$(surnameInputProfile).trigger("keyup");
$(bioInputProfile).trigger("keyup");

function checkProfileForm() {
    var error = false;
    if (surnameInputProfile.className !== "form-control is-valid" || firstnameInputProfile.className !== "form-control is-valid") {
        console.log('error with the surname or first name');
        error = true;
    }
    if (phoneInputProfile.className === "form-control is-invalid") {
        console.log('error w phone')
        error = true;
    }

    if (isTeacherProfile) {
        if (schoolInputProfile.className !== "form-control is-valid") {
            console.log("erro with school input")
            error = true;
        }
    }
    if (fileErrorBox.className === "alert alert-danger") {
        console.log('error w file')
        error = true;
    }

    if (error) {
        submitButtonProfile.setAttribute("disabled", "disabled");
        submitButtonProfile.style.cursor = "not-allowed";
    } else {
        submitButtonProfile.removeAttribute("disabled");
        submitButtonProfile.style.cursor = "pointer";
    }
}