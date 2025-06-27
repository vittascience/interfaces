'use strict';

var submit = $("#submit-button");
submit.click(function (e){
    e.preventDefault();
    console.log(e);
    submit.attr("disabled","disabled");
    submit.css("cursor","not-allowed");
    sendPasswordRecoveryRequest();
});

function sendPasswordRecoveryRequest(){
    var request = getAjaxRequest();
    var formData = new FormData(document.getElementById("recovery-form"));
    var info = $("#info-div");
    info.css("display","none");
    request.onreadystatechange = function (){
      if (request.readyState === XMLHttpRequest.DONE){
          if (request.status === 200){
              var response = JSON.parse(request.responseText);
              if (response.success){
                  $("#recovery-form").fadeOut("slow");
                  info.attr("class","alert alert-success");
                  info.text(i18next.t('passwordRecovery.success'));
              }
              else {
                  submit.removeAttr("disabled");
                  submit.css("cursor","pointer");
                  info.attr("class","alert alert-danger");
                  info.text(i18next.t('passwordRecovery.error'));
              }
              info.fadeIn("slow");
          } else {
              console.log("Request failed" + request.status);
          }
      }
    };
    request.open("POST","/services/post/postPasswordRecovery.php");
    request.send(formData);
}