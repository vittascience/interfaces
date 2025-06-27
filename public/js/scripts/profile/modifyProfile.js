function modifyProfile(){
    
    var request = getAjaxRequest();
    var formData = new FormData();

    var btn = document.getElementById("modify-profile-button");
    disableButton(btn);

    formData.append("firstname",document.querySelector('#profile-form #firstname-input').value.trim());
    formData.append("surname",document.querySelector("#profile-form #surname-input").value.trim());
    formData.append("bio", document.querySelector("#profile-form #bio-input").value.trim());

    var phone = document.querySelector("#profile-form #phone-input").value.trim();
    if (phone.length > 0) {
        formData.append("phone",phone);
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

    request.onreadystatechange = function (){
      if (this.readyState === XMLHttpRequest.DONE){
          if (this.status === 200){
              var answer = JSON.parse(this.responseText);
              var infoBox = document.getElementById("profile-info-box");
              if (answer.success === true){
                  infoBox.className = "alert alert-success";
                  infoBox.innerHTML = "Votre profil a été modifié avec succès !";
                
                  setTimeout(function(){
                      window.location.reload()
                  }, 1000);
              } else {
                  infoBox.className = "alert alert-danger";
                  infoBox.innerHTML = "Erreur. Le formulaire comporte des erreurs.";
              }
          } else {
              console.log("Request failed: " + this.status);
          }
          enableButton(btn);
      }
    };

    request.open("POST","/services/post/postProfile.php");
    request.send(formData);
}