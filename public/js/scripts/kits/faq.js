var headers = document.getElementsByClassName("faq-box-header");
$(headers).rotate({
    bind: {
        click: function () {
            var drop = $(this).find(".faq-box-dropdown");
            var content = $(this).parent().find(".faq-box-content");
            if (drop.hasClass("dropped")) {
                drop.rotate({
                    angle: drop.getRotateAngle(),
                    animateTo: 0
                });
                content.fadeOut("slow", function () {
                    drop.removeClass("dropped");
                });
            } else {
                drop.rotate({
                    angle: drop.getRotateAngle(),
                    animateTo: 90
                });
                content.fadeIn("slow", function () {
                    drop.addClass("dropped");
                });
            }
        }
    }
});