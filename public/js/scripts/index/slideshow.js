$(document).ready(function () {
    $('#testimony-slideshow').slick({
        dots: true,
        infinite: true,
        arrows: false,
        centerMode: true,
        variableWidth: true,
        slidesToScroll: 1,
        drag: true, 
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 10000
    });
    
    $('#testimony-slideshow').attr("tabindex","-1");
    $('#testimony-slideshow .slick-track').attr("tabindex","-1");
    $('#testimony-slideshow .slick-slide').attr("tabindex","-1");
});