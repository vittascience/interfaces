function openNotice() {
    if ($(window).width() <= 500) {
        $('#weather_informations').slideDown('fast');
        $('#weather-pull').slideUp('fast');
        isHidding = false;
    }
}

function closeNotice() {
    if ($(window).width() <= 500) {
        $('#weather_informations').slideUp('fast');
        $('#weather-pull').slideDown('fast');
        isHidding = true;
    }
}