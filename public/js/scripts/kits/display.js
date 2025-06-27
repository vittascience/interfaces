function displayKit (id){
    var displays = document.getElementsByClassName("kit-details");
    var display = document.getElementById("kit-details-" + id);
    for (var i = 0; i < displays.length; i ++){
        if ($(displays[i]).is(":visible")){
            displays[i].style.display = "none";
            break;
        }
    }
    $(display).fadeIn("slow",function (){
        /*var new_position = $(display).offset();
        $('html, body').stop().animate({ scrollTop: new_position.top }, 500);*/
    });
}

var orderButtons = document.getElementsByClassName ("order-button");
for (var i = 0; i < orderButtons.length; i ++){
    orderButtons[i].onclick = function (){
        window.location = "/about?contact=1";
    }
}

window.onload = function (){
    var kitBoxes = document.getElementsByClassName("kit-box");
    $(kitBoxes).trigger("click");
};