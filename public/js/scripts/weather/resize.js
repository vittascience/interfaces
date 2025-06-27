let isHidding = false;

$(window).resize(function(){
    if ($(this).width() <= 500) {
        console.log("mobile");
        console.log("Hidden : " + isHidding + " / visible : " + $("#weather_informations").is('visible'));
        if (isHidding && $('#weather_informations').is(':visible')) {
            $("#weather_informations").slideUp('fast');
            if (!$('#weather-pull').is(':visible'))
                $('#weather-pull').slideDown('fast');
        }
        if (!isHidding && $('#weather-pull').is(':visible')) {
            $('#weather-pull').slideUp('fast');
        }
    } else {
        if (!$("#weather_informations").is(':visible'))
            $("#weather_informations").slideDown('fast');
        if ($('#weather-pull').is(':visible'))
            $('#weather-pull').slideUp('fast');
    }
});

$('#weather-pull').hide();