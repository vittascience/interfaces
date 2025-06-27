const MIN_NAME_SIZE = 3;
const MAX_NAME_SIZE = 100;
const MIN_MESSAGE_SIZE = 1;
const MAX_MESSAGE_SIZE = 800;
const MIN_SUBJECT_SIZE = 1;
const MAX_SUBJECT_SIZE = 80;

var mailInput = document.getElementById("contact-mail-input");
var nameInput = document.getElementById("contact-name-input");
var messageInput = document.getElementById("contact-message-input");
var subjectInput = document.getElementById("contact-subject-input");

var btn = document.getElementById("contact-submit-btn");

mailInput.onkeyup = function () {
    checkMail(this);
    checkContactForm();
};

nameInput.onkeyup = function () {
    checkText(this, MIN_NAME_SIZE, MAX_NAME_SIZE);
    checkContactForm();
};

messageInput.onkeyup = function () {
    checkText(this, MIN_MESSAGE_SIZE, MAX_MESSAGE_SIZE);
    checkContactForm();
};

subjectInput.onkeyup = function () {
    checkText(this, MIN_SUBJECT_SIZE, MAX_SUBJECT_SIZE);
    checkContactForm();
};

function checkContactForm() {
    if ($(mailInput).hasClass("is-valid") &&
        $(nameInput).hasClass("is-valid") &&
        $(messageInput).hasClass("is-valid") &&
        $(subjectInput).hasClass("is-valid")) {
        enableButton(btn);
    } else {
        disableButton(btn);
    }
}