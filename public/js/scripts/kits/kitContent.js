$(".kit-content").hover(
    function (){
        var id = parseInt($(this).find("span").html());
        $(".content-pointer").each(function( index ) {
            if (parseInt($(this).html()) === id){
                $(this).css("color","white");
                if (!$(this).hasClass("content-pointer-legend")) {
                    $(this).css("width", "45px");
                    $(this).css("height", "45px");
                }
                $(this).css("background-color","#22b573");
            }
        });
    },
    function (){
        var id = parseInt($(this).find("span").html());
        $(".content-pointer").each(function( index ) {
            if (parseInt($(this).html()) === id){
                $(this).css("color","#22b573");
                if (!$(this).hasClass("content-pointer-legend")) {
                    $(this).css("width", "35px");
                    $(this).css("height", "35px");
                }
                $(this).css("background-color","white");
            }
        });
    }
);

$(".content-pointer").hover(
    function (){
        var id = parseInt($(this).html());
        $(".content-pointer").each(function( index ) {
            if (parseInt($(this).html()) === id){
                $(this).css("color","white");
                if (!$(this).hasClass("content-pointer-legend")) {
                    $(this).css("width", "45px");
                    $(this).css("height", "45px");
                }
                $(this).css("background-color","#22b573");
            }
        });
    },
    function (){
        var id = parseInt($(this).html());
        $(".content-pointer").each(function( index ) {
            if (parseInt($(this).html()) === id){
                $(this).css("color","#22b573");
                if (!$(this).hasClass("content-pointer-legend")) {
                    $(this).css("width", "35px");
                    $(this).css("height", "35px");
                }
                $(this).css("background-color","white");
            }
        });
    }
);