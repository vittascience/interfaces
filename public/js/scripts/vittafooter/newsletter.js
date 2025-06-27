document.getElementById("newsletter-button").onclick = function (ev) {
    ev.preventDefault();
    disableButton(this);
    this.innerHTML = "<span class=\" fa fa-times\"></span>";
    sendNewsletter(this);
};

function sendNewsletter (btn){
    var formData = new FormData(document.getElementById("newsletter-form"));
    var request = getAjaxRequest();
    request.onreadystatechange = function (){
        if (this.readyState === XMLHttpRequest.DONE){
            if (this.status === 200){
                var response = JSON.parse(this.responseText);
                var info = $("#newsletter-form-info");
                if (info.is(":visible")){
                    info.css("display","none");
                }
                if (response.success) {
                    info.attr("class", "alert alert-success");
                    info.html(i18next.t('footer.success'));
                    $("#newsletter-form-content").fadeOut("slow", function () {
                        info.fadeIn("slow");
                    });
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
                        zIndex: parseInt(getComputedStyle(document.querySelector('#footer-newsletter-div')).getPropertyValue('--bs-modal-zindex')
                        ) + 1
                    });
                } else {
                    info.attr("class", "alert alert-danger");
                    info.html(i18next.t('footer.invalidMail'));
                    info.fadeIn("slow");
                }
            } else {
                console.log("Request failed: " + this.status);
            }
            btn.innerHTML = "<span class=\" fa fa-chevron-right\"></span>";
            enableButton(btn);
        }
    };
    request.open("POST", "/shop/newsletter/newsletter.php" /* "/services/post/postNewsletterMail.php" */);
    request.send(formData);
}