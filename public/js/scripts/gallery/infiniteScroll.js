let pageNbr = 0;
let isLoading = false;
const nbrElementsPerPage = 20;
let allPictures = [];
let userImgLiked;

$(document).ready(function () {
    getUserLikes();
    var win = $(window);
    win.scroll(function () {
        if ($(document).height() - win.height() <= win.scrollTop() + 200) {
            if (!isLoading) {
                showLoading();
                loadNewItems(pageNbr + 1);
            }
        }
    });
});

function getUserLikes() {
    let request = getAjaxRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                userImgLiked = JSON.parse(request.response).likes;
                console.log(userImgLiked);
                loadNewItems(1);
            } else {
                alert(i18next.t('gallery.error'));
            }
        }
    }
    request.open("GET", "/services/get/getIPLike.php");
    request.send();
}

function removeLikeOverlay(id) {
    let request = getAjaxRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let res = JSON.parse(request.responseText);
                if (!res.success) {
                    alert(i18next.t('gallery.error'));
                    return;
                } else {
                    showEmptyHearthOverlay(id);
                    $('.diapo-likes').html(res.result[0]['exp_img_like']);
                    $('[data-conid="' + id + '"]').find('.overlay-nbr-likes').html(res.result[0]['exp_img_like']);
                }
            } else {
                alert(i18next.t('gallery.error'));
                return;
            }
        }
    }
    request.open("POST", "/services/post/updateGalleryLike.php?id=" + id + "&remove=1");
    request.send();
}

function addLikeOverlay(id) {
    let request = getAjaxRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let res = JSON.parse(request.responseText);
                if (!res.success) {
                    alert(i18next.t('gallery.error'));
                    return;
                } else {
                    showFullHearthOverlay(id);
                    $('.diapo-likes').html(res.result[0]['exp_img_like']);
                    $('[data-conid="' + id + '"]').find('.overlay-nbr-likes').html(res.result[0]['exp_img_like']);
                }
            } else {
                alert(i18next.t('gallery.error'));
                return;
            }
        }
    }
    request.open("POST", "/services/post/updateGalleryLike.php?id=" + id + "&remove=0");
    request.send();
}

function showFullHearthOverlay(id) {
    $('.overlay-like[data-id="' + id + '"]').removeClass('far');
    $('.overlay-like[data-id="' + id + '"]').addClass('diapo-heart');
    $('.overlay-like[data-id="' + id + '"]').addClass('fas');
}

function showEmptyHearthOverlay(id) {
    $('.overlay-like[data-id="' + id + '"]').addClass('far');
    $('.overlay-like[data-id="' + id + '"]').removeClass('diapo-heart');
    $('.overlay-like[data-id="' + id + '"]').removeClass('fas');
}

function checkIfUserHasLikeOverlay(idContent) {
    let request = getAjaxRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {

                let res = JSON.parse(request.responseText);
                if (res.liked) {
                    removeLikeOverlay(idContent);
                } else {
                    addLikeOverlay(idContent);
                }
            } else {
                alert(i18next.t('gallery.error'));
                return;
            }
        }
    }
    request.open("GET", "/services/get/getIPLike.php?img=" + idContent);
    request.send();
}

function isAlreadyLike(id) {
    for (let i = 0; i < userImgLiked.length; i++) {
        if (userImgLiked[i].exp_pic_id === id)
            return true;
    }
    return false;
}

function showLoading() {
    $('.gallery-load').show();
}

function endLoading() {
    $('.gallery-load').html(i18next.t('gallery.loaded'));
}

function errorLoading() {
    $('.gallery-load').html(i18next.t('gallery.error'));
}

function getThumbnail(src, type) {
    let filenameWoExt = src.substring(0, src.length - (type.length + 1));
    let thumbnail = filenameWoExt + '_thumbnail.' + type;
    return (thumbnail);
}

function getMedium(src, type) {
    let filenameWoExt = src.substring(0, src.length - (type.length + 1));
    let medium = filenameWoExt + '_medium.' + type;
    return (medium);
}

function getType(src) {
    let regex = /(?:\.([^.]+))?$/;
    let type = regex.exec(src);

    if (type[1] !== 'jpeg' && type[1] !== 'mp4')
        return (false);
    return (type[1]);
}

function appendItems(res) {
    console.log(res);
    let fullHtml = "";
    res.forEach(element => {
        allPictures.push(element);
        let srcType = getType(element[1]);
        if (srcType !== false && srcType !== 'mp4') {
            let srcThumbnail = getThumbnail(element[1], srcType);
            let srcMedium = getMedium(element[1], srcType);
            let html = '<div class="grid-item" style="display:none; opacity:0;" data-expid="' + element[0] + '" data-conid="' + element[2] + '">' +
                '<div class="grid-item-content hovereffect">';
            if (srcType == 'jpeg') {
                html += '<img class="lazyload" data-fullsrc="/public/content/user_data/exp_img/' + element[1] + '" data-src="/public/content/user_data/exp_img/' + srcMedium + '" src="/public/content/user_data/exp_img/' + srcThumbnail + '" alt="photo"/>'
            }
            html += '<div class="overlay">' +
                '<div class="overlay-content"><div style="position:absolute;bottom:0;margin-left:10px;">';
            if (isAlreadyLike(element[2])) {
                html += '<i class="fas fa-heart overlay-like diapo-heart" data-id="' + element[2] + '"></i>';
            } else {
                html += '<i class="far fa-heart overlay-like" data-id="' + element[2] + '"></i>';
            }
            html += '<span class="overlay-nbr-likes" style="margin-left:5px;">' + element[3] + '</span>' +
                '</div></div></div>' +
                '</div>' +
                '</div>';
            fullHtml += html;
        }
    });
    var $content = $(fullHtml);
    $grid.append($content).masonry('appended', $content);
    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
        isLoading = false;
    });
    $('.grid-item').on('click', function () {
        let picFull = $(this).find('img').data('fullsrc');
        let expId = $(this).data('expid');
        let conId = $(this).data('conid');
        let likes = $(this).find('.overlay-nbr-likes').html();
        openDiapo(expId, picFull, conId, likes);
    });
    $('.overlay-like').on('click', function (e) {
        e.stopPropagation();
        let id = $(this).data('id');
        checkIfUserHasLikeOverlay(id);
    });
}

function loadNewItems(pageNeeded) {
    let request = getAjaxRequest();
    request.onreadystatechange = function () {
        isLoading = true;
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let res = JSON.parse(request.responseText);
                appendItems(res);
                $('.gallery-load').slideUp('fast');
                pageNbr = pageNeeded;
            } else if (request.status === 204) {
                endLoading();
            } else {
                errorLoading();
            }
        }
    };
    request.open("GET", "/services/get/getGalleryPage.php?id=" + pageNeeded + '&elements=' + nbrElementsPerPage);
    request.send();
}