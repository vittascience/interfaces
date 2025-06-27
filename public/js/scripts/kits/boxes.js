var kitBoxes = document.getElementsByClassName("kit-box");
for (var i = 0; i < kitBoxes.length; i ++){
    $(kitBoxes[i]).hover(
        function (){
            enlightBox(this);
        },
        function (){
            turnOffBoxes();
        });

    kitBoxes[i].onclick = function (){
        for (var i = 0; i < kitBoxes.length; i ++) {
            if ($(kitBoxes[i]).hasClass("selected"))
                $(kitBoxes[i]).removeClass("selected");
        }
        $(this).addClass("selected");
        $(this).unbind("mouseenter mouseleave");
        turnOffBoxes();
        enlightBox(this);
        displayKit(parseInt(this.getAttribute("data-kit-id")));
    };
}

function enlightBox(box){
    $(box).css("border","#f89310 5px solid");
    $(box).find(".kit-box-title").css(  "color", "#f89310");
    $(box).find(".kit-box-img").css(    "filter",  "grayscale(0%)");
}

function turnOffBoxes(){
    for (var i = 0; i < kitBoxes.length; i ++) {
        if (!$(kitBoxes[i]).hasClass("selected")){
            $(kitBoxes[i]).hover(
                function () {
                    enlightBox(this);
                },
                function (){
                    turnOffBoxes();
                }
            );
            $(kitBoxes[i]).css("border", "transparent 5px solid");
            $(kitBoxes[i]).find(".kit-box-title").css("color", "transparent");
            $(kitBoxes[i]).find(".kit-box-img").css("filter", "grayscale(100%)");
        }
    }
}