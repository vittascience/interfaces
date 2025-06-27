let windowsCard = $('#windows-card');
let macosCard = $('#macos-card');
let linuxCard = $('#linux-card');
let chromeCard = $('#chrome-card');

let windowsBigCard = $('.os-card-download[data-os="windows"]');
let macosBigCard = $('.os-card-download[data-os="macos"]');
let linuxBigCard = $('.os-card-download[data-os="linux"]');
let chromeBigCard = $('.os-card-download[data-os="chrome"]');

function openCard(os, button) {
    console.log(os);
    $(button).html("<span class='fa fa-chevron-circle-left'></span> <b>"+i18next.t('code.loadingPage.installBackButton')+"</b>");
    switch (os) {
        case 'macos':
            if ($(macosBigCard).is(':visible')) {
                $(button).html("<b>"+i18next.t('code.loadingPage.installButton')+"</b> <span class='fa fa-chevron-circle-right'></span>");
                $(macosBigCard).fadeOut('slow', function(){
                    $(windowsCard).fadeIn('slow');
                    $(linuxCard).fadeIn('slow');
                    $(chromeCard).fadeIn('slow');
                });
            } else {
                $(windowsCard).fadeOut('slow');
                $(chromeCard).fadeOut('slow');
                $(linuxCard).fadeOut('slow', function(){
                    $(macosBigCard).fadeIn('slow');
                });
            }
            break;
        case 'windows':
            if ($(windowsBigCard).is(':visible')) {
                $(button).html("<b>"+i18next.t('code.loadingPage.installButton')+"</b> <span class='fa fa-chevron-circle-right'></span>");
                $(windowsBigCard).fadeOut('slow', function(){
                    $(macosCard).fadeIn('slow');
                    $(linuxCard).fadeIn('slow');
                    $(chromeCard).fadeIn('slow');
                });
            } else {
                $(macosCard).fadeOut('slow');
                $(chromeCard).fadeOut('slow');
                $(linuxCard).fadeOut('slow', function(){
                    $(windowsBigCard).fadeIn('slow');
                });
            }
            break;
        case 'linux':
            if ($(linuxBigCard).is(':visible')) {
                $(button).html("<b>"+i18next.t('code.loadingPage.installButton')+"</b> <span class='fa fa-chevron-circle-right'></span>");
                $(linuxBigCard).fadeOut('slow', function(){
                    $(macosCard).fadeIn('slow');
                    $(windowsCard).fadeIn('slow');
                    $(chromeCard).fadeIn('slow');
                });
            } else {
                $(windowsCard).fadeOut('slow');
                $(chromeCard).fadeOut('slow');
                $(macosCard).fadeOut('slow', function(){
                    $(linuxBigCard).fadeIn('slow');
                });
            }
            break;
        case 'chrome':
            if ($(chromeBigCard).is(':visible')) {
                $(button).html("<b>"+i18next.t('code.loadingPage.installButton')+"</b> <span class='fa fa-chevron-circle-right'></span>");
                $(chromeBigCard).fadeOut('slow', function(){
                    $(macosCard).fadeIn('slow');
                    $(windowsCard).fadeIn('slow');
                    $(linuxCard).fadeIn('slow');
                });
            } else {
                $(windowsCard).fadeOut('slow');
                $(linuxCard).fadeOut('slow');
                $(macosCard).fadeOut('slow', function(){
                    $(chromeBigCard).fadeIn('slow');
                });
            }
            break;
    }
}

$(document).ready(function(){
    $('.os-button').on('click', function(){
        let os = $(this).data('os');
        openCard(os, $(this));
    });
});
