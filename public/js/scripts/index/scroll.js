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
    let elementOffset;
    if ($('#platform-container').length > 0) {
        elementOffset = $($('#platform-container > h2')).offset().top;
    } else if ($('#section-2').length > 0) {
        elementOffset = $($('#section-2 h2')).offset().top;
    }
    $('html, body').animate({
        scrollTop: elementOffset - parseInt($("#main-navbar").css(
            "height")
            .replace("px", "")) - 20
    })
    setTimeout(function () {
        $('#index-scroll-arrow').css({
            'animation': 'none'
        });
    }, 700);

})