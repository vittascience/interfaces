/**
 * Modal creation
 */
{
    $(document).on('keydown', function (e) {
        if (e.keyCode === 27)
            pseudoModal.closeLatestModal();
    });
}

function openShare(frame, projectLink) {
    $("#copy-link").bind("click", function () {
        copyToClipboard($('#link-value'), $("#copy-link-msg"));
    });
    $("#link-tab-microbit").bind("click", function () {
        openShare('#link', projectLink);
    });
    $("#frame-tab-microbit").bind("click", function () {
        openShare("#iframe", projectLink);
        $("#copy-frame").bind("click", function () {
            copyToClipboard($('#iframe-value'), $("#copy-frame-msg"));
        });
    });
    if (frame == '#link') {
        $('#frame-tab-microbit,#iframe-microbit').removeClass('active show');
        $('#link-tab-microbit,#link-microbit').addClass('active show');
        const link = `<label for='link-value' data-i18n="code.popups.shareProject.link.contentTitle" class='mt-3'><b>Lien direct vers le projet</b></label>
                <p class='hint mb-0' data-i18n="code.popups.shareProject.link.expiration">Ce lien n'a pas de date d'expiration.</p>
                <input id='link-value' value='` + projectLink + `'class='form-control mt-1' readonly='readonly'>
                <div class='alert alert-success mt-2 mb-0' style='display:none;' id='copy-link-msg' data-i18n="code.popups.shareProject.link.successCopy"><span class='fa fa-valid'>Le lien a été copié avec succès !</span> </div>
                <button class='btn vitta-button mt-2' id='copy-link' data-i18n="code.popups.shareProject.link.buttonCopy">Copier le lien</button> `;
        $("#link-microbit").html(link);
    }
    if (frame == '#iframe') {
        $('#frame-tab-microbit,#iframe-microbit').addClass('active show');
        $('#link-tab-microbit,#link-microbit').removeClass('active show');
        const iframe = `<label for='iframe-value' data-i18n="code.popups.shareProject.iframe.contentTitle" class='mt-3'><b>Balise HTML d'intégration</b></label>
                <p class='hint mb-0' data-i18n="code.popups.shareProject.iframe.notice">Intégrer l'interface de programmation dans votre blog ou site internet</p>
                <div style='font-size:12px;' class='mt-1 mb-1 alert alert-info'><i class='fa fa-info-circle' data-i18n="code.popups.shareProject.iframe.hint"></i>Vous pouvez modifier les attributs <i>width</i> et <i>height</i> pour adapter la balise à votre site. Vous pouvez aussi la personnaliser via l'attribut <i>style</i>.</div>
                <textarea style='font-size: 15px;' class='form-control mt-1' readonly='readonly' id='iframe-value'><iframe width='100%' height='500' allowfullscreen frameborder='0' style='border:1px #d6d6d6 solid;' src=\"` + projectLink + `" embed=1"></iframe></textarea>
                <div class='alert alert-success mt-2 mb-0' style='display:none;' id='copy-frame-msg'data-i18n="code.popups.shareProject.iframe.successCopy"><span class='fa fa-valid' >La balise a été copiée avec succès !</span></div>
                <button class='btn vitta-button mt-2' id='copy-frame' data-i18n="code.popups.shareProject.iframe.buttonCopy">Copier la balise </button>`;
        $('#iframe-microbit').html(iframe);
    }
    $('#modal-shareproject').show();
};

function copyToClipboard(input, message) {
    input.select();
    document.execCommand("copy");
    if ($(message).is(":visible"))
        $(message).css("display", "none");
    $(message).fadeIn("slow");
};

function showLink(link) {
    UIManager.showModal("link-div");
    UIManager.resetMessage("link-form-message");
    UIManager.showSuccessMessage("link-form-message", "<div><span class='fa fa-info-circle'></span> " + link + "</div>");
    setTimeout(function () {
        UIManager.closeModal("link-div");
    }, 5000);
};

function generateRandomString(length = 10) {
    let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(getRandomInt(characters.length - 1));
    }
    return randomString;
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

function openShareTuto(link) {
    $('#modal-sharetuto-links').remove()
    $("html, body").animate({
        scrollTop: 0
    }, "slow")

    const html = `<label for='link-value' class='mt-3' data-i18n="code.popups.shareProject.link.contentTitle">
            <b>Lien direct vers le projet</b>
        </label>
        <p class='hint mb-0' data-i18n="[html]userDetails.shareTuto"></p>
        <input id='link-value-tuto' value='${link}' class='form-control mt-1' readonly='readonly'>
        <div id='copy-link-msg-tuto' class='alert alert-success mt-2 mb-0' style='display:none;' data-i18n="[html]code.popups.shareProject.link.successCopy"></div>
        <button id='copy-link-tuto' class='btn vitta-button mt-2' data-i18n="[html]code.popups.shareProject.link.buttonCopy"></button> `;
    $("#modal-sharetuto-tab-content").html(html);
    $("#modal-sharetuto-tab-content").localize();

    $("#copy-link-tuto").click(function () {
        copyToClipboard($('#link-value-tuto'), $("#copy-link-msg-tuto"));
    });

    $('#modal-sharetuto').show();
};

$('body').on("click", ".vitta-modal-exit-btn", function () {
    $('#modal-sharetuto').hide();
    $('#modal-shareproject').hide();
});