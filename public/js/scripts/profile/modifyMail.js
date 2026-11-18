function modifyMail(){
    var mail = emailInput.value.trim();
    checkMailExists(mail,sendNewMail);
}

function sendNewMail (exists){
    var infoBox = document.getElementById("email-info-box");
    if (exists){
        infoBox.className = "alert alert-danger";
        infoBox.innerHTML = "<span class='fa fa-times-circle'></span> ";
        infoBox.appendChild(document.createTextNode(i18next.t("profile.user.form.changeMail.exists", { defaultValue: "Ce mail existe déjà ! Veuillez en choisir un autre." })));
        changeMailBtn.removeAttribute("disabled");
        changeMailBtn.style.cursor = "pointer";
        return;
    }
    var formData = new FormData();
    var mail = emailInput.value.trim();
    formData.append("mail",mail);
    var request = getAjaxRequest();
    request.onreadystatechange = function (){
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
                var response = JSON.parse(request.responseText);
                if (response.success){
                    infoBox.className = "alert alert-success";
                    infoBox.innerHTML = "<span class='fa fa-check-circle'></span> ";
                    infoBox.appendChild(document.createTextNode(i18next.t("profile.user.form.changeMail.success", { mail: mail, defaultValue: "Votre demande a été enregistrée ! Cliquez sur le lien de confirmation dans le mail que nous venons de vous envoyer pour confirmer votre nouvelle adresse mail ({{mail}})." })));
                    emailInput.value = "";
                    $(emailInput).trigger("keyup");
                } else {
                    infoBox.className = "alert alert-danger";
                    infoBox.innerHTML = "<span class='fa fa-times-circle'></span> ";
                    infoBox.appendChild(document.createTextNode(i18next.t("profile.user.form.changeMail.error", { defaultValue: "Erreur. Veuillez réessayer." })));
                    emailInput.value = "";
                    $(emailInput).trigger("keyup");
                }
            } else {
                console.log("Request failed: " + request.status);
            }
        }
    };
    request.open("POST","/services/post/postNewMail.php");
    request.send(formData);
}