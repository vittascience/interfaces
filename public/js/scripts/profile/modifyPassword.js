function modifyPassword (){
    var request = getAjaxRequest();
    var formData = new FormData();
    var infoBox = document.getElementById("pwd-info-box");
    formData.append("old",$("#old-password-input").val());
    formData.append("new",$("#new-password-input").val());
    request.onreadystatechange = function (){
      if (this.readyState === XMLHttpRequest.DONE){
          if (this.status === 200){
              var answer = JSON.parse(this.responseText);
              if (answer.success === true){
                  infoBox.className = "alert alert-success";
                  infoBox.innerHTML = "Votre mot de passe a été changé avec succès !";
              } else {
                  infoBox.className = "alert alert-danger";
                  infoBox.innerHTML = "Erreur ! Veuillez vérifier les champs.";
              }
              $(infoBox).fadeIn("slow");
          }
          else {
              console.log("Request failed:"  + this.status);
          }
          changePwdButton.style.cursor = "pointer";
          changePwdButton.removeAttribute("disabled");
          $("#old-password-input").val("").trigger("keyup");
          $("#new-password-input").val("").trigger("keyup");
          $("#new-password-conf-input").val("").trigger("keyup");
      }
    };
    request.open("POST","/services/post/postModifyPassword.php");
    request.send(formData);
}