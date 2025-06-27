var members = document.getElementsByClassName("vitta-member");
if (mobileDetect){
    $(members).css("border","transparent 6px solid");
    $(".info").css("color","transparent");
}
for (var i = 0; i < members.length; i ++){
    $(members[i]).hover(
        function(){
            let color = $(this).data('color');
            $(this).css("border", color + " 6px solid");
            $(this).css("background-color", "#dedede");
        },
        function(){
            $(this).css("border","transparent 6px solid");
            $(this).css("background-color", "#f1f4f5");
        }
    );
}