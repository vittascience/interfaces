(function () {
    var gradeInput = document.getElementById("teacher-grade-input");
    var subjectInput = document.getElementById("teacher-subject-input");
    if (!gradeInput || !subjectInput || !window.TEACHER_GRADE_SUBJECTS) {
        return;
    }

    function refillSubjects() {
        var subjects = window.TEACHER_GRADE_SUBJECTS[gradeInput.value] || [];
        subjectInput.innerHTML = "";
        subjects.forEach(function (subject, index) {
            var option = document.createElement("option");
            option.value = index;
            option.textContent = subject;
            subjectInput.appendChild(option);
        });
    }

    gradeInput.addEventListener("change", refillSubjects);

    if (subjectInput.options.length === 0) {
        refillSubjects();
    }
})();

var PROFILE_ERRORS = {
    2: ["name", "Le prénom ou le nom est invalide."],
    5: ["phone", "Le numéro de téléphone est invalide : il doit compter entre 10 et 30 caractères."],
    6: ["picture", "L'image est invalide : vérifiez son format et sa taille."],
    8: ["pictureSave", "L'image n'a pas pu être enregistrée. Veuillez réessayer."],
    9: ["save", "Votre profil n'a pas pu être enregistré. Veuillez réessayer."],
    10: ["teacherMissing", "Renseignez votre établissement, votre niveau et votre matière."],
    11: ["school", "Le nom de l'établissement est invalide."],
    12: ["grade", "Le niveau de formation est invalide."],
    13: ["subject", "La matière enseignée est invalide."],
    14: ["save", "Votre profil n'a pas pu être enregistré. Veuillez réessayer."],
    15: ["session", "Votre session a expiré : rechargez la page."]
};

function showProfileError(infoBox, code){
    var error = PROFILE_ERRORS[code] || ["generic", "Erreur. Le formulaire comporte des erreurs."];
    infoBox.className = "alert alert-danger";
    infoBox.textContent = i18next.t("profile.user.form.errors." + error[0], { defaultValue: error[1] });
}

function modifyProfile(){
    
    var request = getAjaxRequest();
    var formData = new FormData();

    var btn = document.getElementById("modify-profile-button");
    disableButton(btn);

    formData.append("firstname",document.querySelector('#profile-form #firstname-input').value.trim());
    formData.append("surname",document.querySelector("#profile-form #surname-input").value.trim());
    formData.append("bio", document.querySelector("#profile-form #bio-input").value.trim());

    var phoneInput = document.querySelector("#profile-form #phone-input");
    if (phoneInput) {
        formData.append("phone", phoneInput.value.trim());
    }

    var picture = document.querySelector('#profile-picture-file-input').files[0];
    if (picture) {
        formData.append("picture",picture);
    }

    if (document.getElementById("teacher-form") != null) {
        formData.append("school",document.getElementById("teacher-school-input").value.trim());
        formData.append("grade",document.getElementById("teacher-grade-input").value);
        formData.append("subject",document.getElementById("teacher-subject-input").value);
    }

    var newsletter = "0";
    var mailMessages = "0";
    /*
    @maxencelav feb 2024 — setting these to always be the value that we want
    private 0 = the user accepts to be public at all times
    contact 1 = the user accepts to be contacted at all times (via the form on the userDetails page)
    */
    var privateFlag = "0";
    var contactFlag = "1";

    if (document.getElementById("newsletter-input").checked) {
        newsletter = "1";
    }

    formData.append("newsletter",newsletter);
    formData.append("private",privateFlag);
    formData.append("mail-messages",mailMessages);
    formData.append("contact", contactFlag);
    formData.append("csrf_token", window.PROFILE_CSRF_TOKEN || "");

    request.onreadystatechange = function (){
      if (this.readyState === XMLHttpRequest.DONE){
          var infoBox = document.getElementById("profile-info-box");
          if (this.status === 200){
              var answer = {};
              try {
                  answer = JSON.parse(this.responseText);
              } catch (e) {
                  answer = {};
              }
              if (answer.success === true){
                  infoBox.className = "alert alert-success";
                  infoBox.textContent = i18next.t("profile.user.form.updated", { defaultValue: "Votre profil a été modifié avec succès !" });
                
                  setTimeout(function(){
                      window.location.reload()
                  }, 1000);
              } else {
                  showProfileError(infoBox, answer.success);
              }
          } else {
              showProfileError(infoBox, 9);
          }
          enableButton(btn);
      }
    };

    request.open("POST","/services/post/postProfile.php");
    request.send(formData);
}