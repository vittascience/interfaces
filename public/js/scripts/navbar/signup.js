'use strict';

const SURNAME_MIN_LENGTH = 1;
const SURNAME_MAX_LENGTH = 50;
const FIRSTNAME_MIN_LENGTH = 1;
const FIRSTNAME_MAX_LENGTH = 50;
const BIO_MIN_LENGTH = 1;
const BIO_MAX_LENGTH = 800;
const TEACHER_SCHOOL_MIN_LENGTH = 1;
const TEACHER_SCHOOL_MAX_LENGTH = 150;
const MIN_PHONE_LENGTH = 10;
const MAX_PHONE_LENGTH = 30;
const SIGNUP_PICTURE_MAX_SIZE = 250000

var autoCompleteSchoolOptions = {
    url: function (phrase) {
        return "/services/get/getSchools.php";
    },
    getValue: function (element) {
        return element.name;
    },
    ajaxSettings: {
        dataType: "json",
        method: "GET",
        data: {
            dataType: "json"
        }
    },
    preparePostData: function (data) {
        data.phrase = $("#teacher-school-input").val();
        data.grade = $("#teacher-grade-input").val();
        return data;
    },
    requestDelay: 400
};

function displaySignup() {
    let signupDiv = document.getElementById("signup-div");
    let signupForm = document.getElementById("signup-form");
    let signupBody = document.getElementById("signup-form-body");
    let successDiv = document.getElementById("signup-success-body");

    var surnameInput = document.getElementById("surname-input");
    surnameInput.onkeyup = function () {
        checkName(this, SURNAME_MIN_LENGTH, SURNAME_MAX_LENGTH);
        checkSignupForm()
    };

    var firstnameInput = document.getElementById("firstname-input");
    firstnameInput.onkeyup = function () {
        checkName(this, FIRSTNAME_MIN_LENGTH, FIRSTNAME_MAX_LENGTH);
        checkSignupForm()
    };

    var emailInput = document.getElementById("email-input");
    emailInput.onkeyup = function () {
        checkMail(this);

        // if the email is valid, fade in #email-input-info
        if (this.classList.contains('is-valid')) {
            $("#email-input-info").fadeIn("slow");
        } else {    
        // else, fade out #email-input-info
            $("#email-input-info").fadeOut("slow");
        }

        checkSignupForm()
    };

    var eighteenConfirmInputElt = document.getElementById('eighteen-confirm-input');
    eighteenConfirmInputElt.addEventListener('change', () => {
        if (eighteenConfirmInputElt.checked) {
            eighteenConfirmInputElt.classList.add('is-valid');
        } else {
            eighteenConfirmInputElt.classList.remove('is-valid');
        }
        checkSignupForm()
    });

    var passwordInput = document.getElementById("pwd-input");
    passwordInput.onkeyup = function () {
        checkPasswords(this, document.getElementById("pwd-conf-input"));
        checkSignupForm()
    };

    // on focus, show the password requirements
    passwordInput.addEventListener('focus', () => {
        $("#password-input-info").fadeIn("slow");
    });


    var passwordConfInput = document.getElementById("pwd-conf-input");
    passwordConfInput.onkeyup = function () {
        checkPasswords(document.getElementById("pwd-input"), this);
        checkSignupForm()
    };

    // TODO - cleanup this
    /*
    var confButton = document.getElementById("conf-btn");
    confButton.style.cursor = "not-allowed";
    confButton.setAttribute("disabled", "disabled");
    confButton.onclick = function (e) {
        var mail = document.getElementById("email-input").value.trim();
        e.preventDefault();
        checkMailExists(mail, mailSignupCallback);
    };
    */

    // Define the first submit event listener as a named function
    let submitListener = function (e) {
        e.preventDefault(); // Prevent the form from being submitted

        // check if the form is valid
        if (!signupForm.checkValidity()) {
            // If the form is not valid, submit it. The form won't actually submit;
            // this will just cause the browser to display the native HTML5 error messages.
            signupForm.reportValidity();
            return;
        }

        // Disable the submit button to prevent repeated clicks
        signupForm.querySelector('button[type="submit"]').disabled = true;

        var surnameInput = document.getElementById("surname-input");
        var firstnameInput = document.getElementById("firstname-input");
        var emailInput = document.getElementById("email-input");
        var telephoneInput = document.getElementById("phone-input");
        var passwordInput = document.getElementById("pwd-input");
        var passwordConfInput = document.getElementById("pwd-conf-input");
        var eighteenConfirmInputElt = document.getElementById('eighteen-confirm-input');
        var nlConfirmInputElt = document.getElementById('nl-confirm-input');
        var errorBox = document.getElementById("signup-error-alert");

        var error = true;

        checkMailExists(emailInput.value.trim(), function (exists) {
            if (exists === false) {
                error = false;
            } else {
                let errorBox = document.getElementById("signup-error-alert");
                emailInput.className = "form-control is-invalid";
                errorBox.className = "alert alert-danger";
                errorBox.innerHTML = i18next.t('signup-popup.errors.mailUsed', {
                    'mail': emailInput.value.trim()
                });
                $(errorBox).fadeIn("slow");
            }
        });


        // Check if all the fields are valid
        if (surnameInput.classList.contains('is-valid') &&
            firstnameInput.classList.contains('is-valid') &&
            emailInput.classList.contains('is-valid') &&
            passwordInput.classList.contains('is-valid') &&
            passwordConfInput.classList.contains('is-valid') &&
            eighteenConfirmInputElt.classList.contains('is-valid')
        ) {
            error = false;
        }

        if (error) {

            // TODO - change this
            errorBox.className = "alert alert-danger";
            errorBox.innerHTML = i18next.t('signup-popup.errors.formError');
            $(errorBox).fadeIn("slow");

            // enable submit button
            signupForm.querySelector('button[type="submit"]').disabled = false;
            return;
        } else {

            var surname = document.getElementById("surname-input").value.trim();
            var firstname = document.getElementById("firstname-input").value.trim();
            var email = document.getElementById("email-input").value.trim();
            var password = document.getElementById("pwd-input").value;
            var nlConfirm = nlConfirmInputElt.checked;

            var formData = new FormData();

            formData.append("surname", surname);
            formData.append("firstname", firstname);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("nlConfirm", nlConfirm);

            var request = getAjaxRequest();
            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200) {
                        // enable submit button
                        signupForm.querySelector('button[type="submit"]').disabled = false;
                        var response = JSON.parse(request.responseText);

                        if (response.success === true) {
                            // hide the signupBody and the footer, make confetti pop and show the successDiv
                            signupBody.style.display = "none";
                            signupDiv.querySelector('.modal-footer').style.display = "none";

                            // show the user's email in the feedback message
                            successDiv.querySelector('#signup-success-main-text').innerHTML = i18next.t('signup-popup.success.main', {
                                'mail': email
                            });

                            // add an event to the button to resend the confirmation mail
                            successDiv.querySelector('#signup-success-send-confirmation-btn').addEventListener('click', function () {
                                // disable the button
                                this.disabled = true;

                                // send the request
                                const vittaNotif = new VittaNotif()
                                $.ajax({
                                    type: "POST",
                                    url: "/services/post/postNewValidationMail.php",
                                    data: {
                                        email: email,
                                    },
                                    success: function () {
                                        vittaNotif.displayNotification('#signup-success-body', i18next.t('login_popup.mailSuccess'), 'bg-success');

                                    },
                                    error: function () {
                                        vittaNotif.displayNotification('#signup-success-body', i18next.t('login_popup.mailError'), 'bg-danger');
                                    }
                                });

                                // enable the button after 45s
                                setTimeout(() => {
                                    this.disabled = false;
                                }, 45000);
                            });

                            // display the successDiv and make confetti pop
                            successDiv.style.display = "block";
                            confetti({
                                particleCount: 100,
                                spread: 70,
                                origin: {
                                    y: 0.6
                                },
                                // put the variables --vitta-green, --vitta-blue, --vitta-orange, --vitta-red, --vitta-yellow in the confetti colors
                                colors: [
                                    getComputedStyle(document.documentElement).getPropertyValue('--vitta-green'),
                                    getComputedStyle(document.documentElement).getPropertyValue('--vitta-blue'),
                                    getComputedStyle(document.documentElement).getPropertyValue('--vitta-orange'),
                                    getComputedStyle(document.documentElement).getPropertyValue('--vitta-red'),
                                    getComputedStyle(document.documentElement).getPropertyValue('--vitta-yellow')
                                ],

                                // get var(--bs-modal-zindex) and add 1 to make the confetti appear above the modal
                                zIndex: parseInt(getComputedStyle(document.querySelector('#signup-div')).getPropertyValue('--bs-modal-zindex')
                                ) + 1
                            });

                        } else {
                            // display the errors in the errorBox 
                            errorBox.className = "alert alert-danger";
                            errorBox.innerHTML = "";
                            var errorList = document.createElement("ul");
                            errorList.className = "mb-0";
                            errorBox.appendChild(errorList);

                            for (var i = 0; i < response.errors.length; i++) {
                                var error = document.createElement("li");
                                error.innerHTML = response.errors[i];
                                errorList.appendChild(error);
                            }
                        }
                    } else {
                        let errorBox = document.getElementById("signup-error-alert");
                        errorBox.className = "alert alert-danger";
                        errorBox.innerHTML = i18next.t('signup-popup.errors.requestError');
                        $(errorBox).fadeIn("slow");

                        // enable submit button
                        signupForm.querySelector('button[type="submit"]').disabled = false;

                        console.error("Request failed: " + status);
                    }
                }
            };
            request.open("POST", "/services/post/postSignup.php");
            request.send(formData);
        }
    };

    // Add the first submit event listener to the form
    signupForm.addEventListener('submit', submitListener);

    let signupModal = new bootstrap.Modal(signupDiv, {});
    signupModal.show();
    return;
}



function mailSignupCallback(exists) {
    var emailInput = document.getElementById("email-input");
    var errorBox = document.getElementById("mail-error");
    if (exists === false) {
        errorBox.innerHTML = "";
        errorBox.className = "";
        //showSecondSignupForm();
    } else {
        emailInput.className = "form-control is-invalid";
        errorBox.className = "alert alert-danger";
        errorBox.innerHTML = i18next.t('signup-popup.errors.mailUsed', {
            'mail': emailInput.value.trim()
        });
        $("#mail-error").fadeIn("slow");
        //checkSignupFirst();
    }
}

function toggleSignupPassword() {
    const loginInput = document.getElementById("pwd-input");
    const toggler = document.getElementById("signup-pwd-toggler-icon");
    
    if (loginInput.getAttribute("type") == "password") {
        toggler.classList.remove("fa-eye");
        toggler.classList.add("fa-eye-slash");
        loginInput.setAttribute("type", "text");
    } else {
        toggler.classList.remove("fa-eye-slash");
        toggler.classList.add("fa-eye");
        loginInput.setAttribute("type", "password");
    }
}

function checkSignupForm() {
    let signupForm = document.getElementById("signup-form");

    var surnameInput = document.getElementById("surname-input");
    var firstnameInput = document.getElementById("firstname-input");
    var emailInput = document.getElementById("email-input");
    var passwordInput = document.getElementById("pwd-input");
    var passwordConfInput = document.getElementById("pwd-conf-input");
    var eighteenConfirmInputElt = document.getElementById('eighteen-confirm-input');

    var error = true;

    if (surnameInput.classList.contains('is-valid') &&
        firstnameInput.classList.contains('is-valid') &&
        emailInput.classList.contains('is-valid') &&
        passwordInput.classList.contains('is-valid') &&
        passwordConfInput.classList.contains('is-valid') &&
        eighteenConfirmInputElt.classList.contains('is-valid')
    ) {
        error = false;
    }

    // enable or disable submit button depending on the state of the signup form
    signupForm.querySelector('button[type="submit"]').disabled = error;
}

// USED IN checkProfile.js
function checkPhone(element) {
    var value = element.value.trim();
    if (value.length === 0)
        element.className = 'form-control';
    else if (value.length >= MIN_PHONE_LENGTH && value.length < MAX_PHONE_LENGTH)
        element.className = 'form-control is-valid';
    else
        element.className = 'form-control is-invalid';
}

function fillSubjects(grade) {
    document.getElementById("teacher-subject-input").innerHTML = "";
    grade--;
    for (var i = 0; i < resource_GradeSubjects[grade].length; i++) {
        var subject = document.createElement("option");
        subject.value = (i + 1).toString();
        subject.innerHTML = resource_GradeSubjects[grade][i];
        document.getElementById("teacher-subject-input").appendChild(subject);
    }

}