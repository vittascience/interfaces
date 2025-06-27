document.getElementById("newsletter-about-button").onclick = function (ev) {
    ev.preventDefault();
    sendNewsletter();
};

function sendNewsletter() {

    let honeyNumber = $('#za78e-number-newsletter').val();
    let honeyUsername = $('#za78e-username-newsletter').val();

    if (honeyNumber.length > 0 || honeyUsername.length > 0) {
        Modal.closeLatestModal();
        throw "L";
    }

    var formData = new FormData(document.getElementById("newsletter-about-form"));
    formData.append("za78e-username-newsletter", honeyUsername)
    var request = getAjaxRequest();
    request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                var response = JSON.parse(this.responseText);
                var info = $("#newsletter-about-form-info");
                if (info.is(":visible")) {
                    info.css("display", "none");
                }
                if (response.success) {
                    info.attr("class", "alert alert-success");
                    info.html(i18next.t('about.vittascience.success'));
                    $("#newsletter-about-form").fadeOut("slow", function () {
                        info.fadeIn("slow");
                    });
                } else {
                    info.attr("class", "alert alert-danger");
                    info.html(i18next.t('about.vittascience.error'));
                    info.fadeIn("slow");
                }
            } else {
                console.log("Request failed: " + this.status);
            }
        }
    };
    request.open("POST", "/services/post/postNewsletterMail.php");
    request.send(formData);
}