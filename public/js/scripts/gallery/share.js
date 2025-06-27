function shareTwitter(text) {
    var url = window.location.href;
    window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
}

function shareFacebook() {
    var url = window.location.href;
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
}

function shareMail(body, subject) {
    window.location.href = "mailto:?body="+encodeURIComponent(body)+"&subject=" + encodeURIComponent(subject);
}

function openShare() {
    if ($('#gallery-wrapper').is(':visible')) {
        $('#gallery-share-wrapper').fadeIn('fast');
    }
}

function closeShare() {
    if ($('#gallery-share-wrapper').is(':visible'))
        $('#gallery-share-wrapper').fadeOut('fast');
}

$('.social-btn').on('click', function(){
    openShare();
});