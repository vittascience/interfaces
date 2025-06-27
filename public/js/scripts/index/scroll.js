anime({
    targets: '#index-scroll-arrow i',
    translateY: 30, // -> '250px'
    direction: 'alternate',
    easing: 'easeInOutQuad',
    duration: 500,
    delay: 1000,
    loop: true
});

$('#index-scroll-arrow').on('click', function (e) {

    $('#index-scroll-arrow').css({
        'animation': 'pulse 0.7s'
    });
    $('html, body').animate({
        scrollTop: $($('#platform-container > h2')).offset().top - parseInt($("#main-navbar").css(
                "height")
            .replace("px", "")) - 20
    })
    setTimeout(function () {
        $('#index-scroll-arrow').css({
            'animation': 'none'
        });
    }, 700);

})