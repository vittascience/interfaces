var sendMsgBtn = document.getElementById("contact-submit-btn");
sendMsgBtn.onclick = function (ev) {
    ev.preventDefault();
    sendMailForm();
};

const MAX_HONEYPOT_LENGTH = 13;
async function sendMailForm() {
    try {
        const honeypotUsernameField = document.getElementById("za78e-username-contact");
        const honeypotNumberField = document.getElementById("za78e-number-contact");
        const homepageField = document.getElementById("homepage");
        const contactForm = document.getElementById("about-contact-form");
        const contactInfo = document.getElementById("about-contact-info");
        const sendBtn = sendMsgBtn; // Assumes it's already defined globally

        honeypotUsernameField.value = homepageField.value;

        const honeypotUsername = honeypotUsernameField.value;
        const honeypotNumber = honeypotNumberField.value;

        if (honeypotNumber.length > 0 || honeypotUsername.length !== MAX_HONEYPOT_LENGTH) {
            throw new Error("Bot detected");
        }

        disableButton(sendBtn);

        contactInfo.style.display = "none";
        contactInfo.innerHTML = "";

        const formData = new FormData(contactForm);
        formData.append("za78e-username-contact", honeypotUsername);

        const response = await fetch("/services/post/postContactForm.php", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            console.error(`Request failed: ${response.status}`);
            return;
        }

        const result = await response.json();
        if (result.success === true) {
            showSuccess(contactForm, contactInfo);
        } else {
            showErrors(contactInfo, result.errors);
        }
    } catch (err) {
        console.error("Erreur d'envoi du formulaire :", err);
    } finally {
        enableButton(sendMsgBtn);
    }
}


function showSuccess(form, info) {
    info.className = "alert alert-success";
    info.innerHTML = i18next.t('about.contact.success');
    $(form).fadeOut("slow", () => {
        $(info).fadeIn("slow");
    });
}

function showErrors(info, errors = []) {
    info.className = "alert alert-danger";
    const ul = document.createElement("ul");

    errors.forEach(err => {
        const li = document.createElement("li");
        li.innerHTML = `<span ${err}></span>`;
        ul.appendChild(li);
    });

    info.appendChild(ul);
    $(".alert-danger").localize();
    $(info).fadeIn("slow");
}
