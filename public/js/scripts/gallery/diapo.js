let diapoDiv = $('#gallery-fullscreen');
let diapoContent = $('.gallery-media');
let currentDiapo = false;
let exp = 0;
let expContentId = 0;
let currentLoad = false;
let lastFocusedItem = null;

// $(window).resize(function(){
//     if ($("#diapo").is(':visible')) {
//         $('.diapo-bar').width($('.diapo-media').width());
//     }
// });

$(diapoDiv).css("display", "flex").hide();

function showFullHearth() {
    $('.diapo-heart').removeClass('diapo-heart-empty');
    $('.diapo-heart').removeClass('far');
    $('.diapo-heart').addClass('fas');
    $('.like-btn').attr('aria-pressed', 'true').attr('aria-label', i18next.t('gallery.unlikeImage'));
}

function showEmptyHearth() {
    $('.diapo-heart').addClass('diapo-heart-empty');
    $('.diapo-heart').removeClass('fas');
    $('.diapo-heart').addClass('far');
    $('.like-btn').attr('aria-pressed', 'false').attr('aria-label', i18next.t('gallery.likeImage'));
}

function addLike(idContent) {
    let request = getAjaxRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let res = JSON.parse(request.responseText);
                if (!res.success) {
                    alert('Une erreur s\'est produite.');
                    return;
                } else {
                    showFullHearth();
                    showFullHearthOverlay(idContent);
                    $('.diapo-likes').html(res.result[0]['exp_img_like']);
                    $('[data-conid="'+idContent+'"]').find('.overlay-nbr-likes').html(res.result[0]['exp_img_like']);
                }
            } else {
                alert('Une erreur s\'est produite.');
                return;
            }
        }
    }
    request.open("POST", "/services/post/updateGalleryLike.php?id=" + idContent + "&remove=0");
    request.send();
}

function removeLike(idContent) {
    let request = getAjaxRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let res = JSON.parse(request.responseText);
                if (!res.success) {
                    alert('Une erreur s\'est produite.');
                    return;
                } else {
                    showEmptyHearth();
                    showEmptyHearthOverlay(idContent);
                    $('.diapo-likes').html(res.result[0]['exp_img_like']);
                    $('[data-conid="' + idContent + '"]').find('.overlay-nbr-likes').html(res.result[0]['exp_img_like']);
                }
            } else {
                alert('Une erreur s\'est produite.');
                return;
            }
        }
    }
    request.open("POST", "/services/post/updateGalleryLike.php?id=" + idContent + "&remove=1");
    request.send();
}

function checkIfUserHasLike(change, idContent) {
    let request = getAjaxRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let res = JSON.parse(request.responseText);
                if (res.liked) {
                    if (change)
                        removeLike(idContent);
                    else {
                        showFullHearth();
                        $(diapoDiv).fadeIn("fast", function () {
                            document.querySelector('.gallery-close-btn').focus();
                        });
                        currentLoad = false;
                    }
                } else {
                    if (change) {
                        addLike(idContent);
                    } else {
                        showEmptyHearth();
                        $(diapoDiv).fadeIn("fast", function () {
                            document.querySelector('.gallery-close-btn').focus();
                        });
                        currentLoad = false;
                    }
                }
            } else {
                alert('Une erreur s\'est produite.');
                return;
            }
        }
    }
    request.open("GET", "/services/get/getIPLike.php?img=" + idContent);
    request.send();
}

function likePicture() {
    checkIfUserHasLike(true, expContentId);
}

function openExp() {
    window.open('/experimentDetails?id=' + exp, '_blank').focus();
}

function loadDataFromExperience(id, idContent, likes) {
    let request = getAjaxRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let res = JSON.parse(request.responseText);
                $('.diapo-likes').html(likes)
                exp = res.id;

                checkIfUserHasLike(false, idContent);
            } else {
                alert('Une erreur s\'est produite.');
                return;
            }
        }
    }
    request.open("GET", "/services/get/getExperiment.php?id=" + id);
    request.send();
}

function openDiapo(id, src, idContent, likes) {
    if (currentLoad)
            return ;
    currentLoad = true;
    lastFocusedItem = document.activeElement;
    $("html").css("overflow-y","hidden");
    window.history.replaceState(null, null, "/gallery?id=" + idContent);
    let img = document.createElement('img');
    img.src = src;
    img.className = "gallery-media-content";
    img.alt = "";
    $(diapoContent).prepend(img);
    currentDiapo = src;
    expContentId = idContent;
    $(diapoDiv).attr('aria-hidden', 'false');
    loadDataFromExperience(id, idContent, likes);
}

function closeDiapo() {
    closeShare();
    $("html").css("overflow-y","visible");
    $(diapoDiv).fadeOut("fast");
    $(diapoDiv).attr('aria-hidden', 'true');
    currentDiapo = false;
    currentLoad = false;
    $('.gallery-media-content').remove();
    window.history.replaceState(null, null, "/gallery");
    if (lastFocusedItem) {
        lastFocusedItem.focus();
        lastFocusedItem = null;
    }
}

function openByUrl(id)
{
    let request = getAjaxRequest();
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let res = JSON.parse(request.responseText);
                openDiapo(res.exp_img_experiment, VS_USER_DATA_BASE + "/exp_img/" + res.exp_img_name, id, res.exp_img_like);
            } else if (request.status === 404) {
                alert("Image non trouvée.");
            } else {
                alert("Erreur serveur.");
            }
        }
    }
    request.open("GET", "/services/get/getGalleryPicture.php?id="+id);
    request.send();
}

function openByKeyboard(gridItem) {
    let idGrid = $(gridItem).data('expid');
    let srcGrid = $(gridItem).find('img').data('fullsrc');
    let idCGrid = $(gridItem).data('conid');
    let likesGrid = $(gridItem).find('.overlay-nbr-likes').html();
    $('.gallery-media-content').remove();
    openDiapo(idGrid, srcGrid, idCGrid, likesGrid);
}

function getPictureKeyEvent(left) {
    let contentItem = $('.grid-item[data-conid="'+expContentId+'"]');

    if (contentItem === undefined)
        return ;
    if (left) {
        let prevElement = $(contentItem).prev();
        if ($(prevElement).data('conid') !== undefined)
            openByKeyboard($(prevElement));
    } else {
        let nextElement = $(contentItem).next();
        if ($(nextElement).data('conid') !== undefined)
            openByKeyboard($(nextElement));
    }
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

$('.like-btn').on('click', function () {
    console.log(currentDiapo);
    likePicture();
});

$('.see-exp').on('click', function() {
    window.open('/experimentDetails?id=' + exp, '_blank');
});

$('.prev-button').on('click', function() {
    getPictureKeyEvent(true);
});

$('.next-button').on('click', function() {
    getPictureKeyEvent(false);
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });

$(document).keyup(function(e) {
    if (e.keyCode === 27 && $(diapoDiv).is(':visible'))
        closeDiapo();
    if ($(diapoDiv).is(':visible') && e.keyCode === 39)
        getPictureKeyEvent(false);
    if ($(diapoDiv).is(':visible') && e.keyCode === 37)
        getPictureKeyEvent(true);
});

$(document).keydown(function(e) {
    if (!$(diapoDiv).is(':visible')) return;
    if (e.key !== 'Tab') return;
    var focusable = $(diapoDiv).find('button:visible').toArray();
    if (focusable.length === 0) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey) {
        if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
        }
    } else {
        if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
});

let paramsUrl = getUrlVars("id");
if (paramsUrl.id !== undefined && !isNaN(paramsUrl.id) && paramsUrl.id !== "")
    openByUrl(paramsUrl.id);