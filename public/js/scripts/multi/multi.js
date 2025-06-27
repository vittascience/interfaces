$(document).ready(function () {
    const VALID_INTERFACES = ["arduino", "microbit", "python", "esp32", "wb55", "TI-83", "GalaxiaCircuitPython","raspberrypi" ,"galaxia", "mBot", "m5stack"];
    const DEFAULT_EDITOR = { 'link': null, 'interface': 'microbit' };
    let multiPage = {
        'first': {
            'link': $_GET('link1'),
            'interface': VALID_INTERFACES.includes($_GET('iframe1')) ? $_GET('iframe1') : null
        },
        'second': {
            'link': $_GET('link2'),
            'interface': VALID_INTERFACES.includes($_GET('iframe2')) ? $_GET('iframe2') : null
        }
    };
    const simu = $_GET('simu') == '1' ? true : false;
    const multiEditorLS = localStorage.getItem('multiEditor');
    if (multiEditorLS) {
        const multiEditor = JSON.parse(multiEditorLS);
        if (multiEditor.multi) {
            updateMultiPage(multiPage, multiEditor.multi['first'], 'first');
            updateMultiPage(multiPage, multiEditor.multi['second'], 'second');
        } else {
            updateMultiPage(multiPage, DEFAULT_EDITOR, 'first');
            updateMultiPage(multiPage, DEFAULT_EDITOR, 'second');
        }
        multiEditor.multi = multiPage;
        localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
    } else {
        updateMultiPage(multiPage, DEFAULT_EDITOR, 'first');
        updateMultiPage(multiPage, DEFAULT_EDITOR, 'second');
        localStorage.setItem('multiEditor', JSON.stringify({
            'multi': multiPage
        }));
    }
    showEditor(multiPage.first, 'first', simu);
    showEditor(multiPage.second, 'second', simu);
    updateMultiUrl(multiPage);
    if (!(window.navigator.userAgent.indexOf('MSIE ') > 0)) {
        if (window.addEventListener) {
            window.addEventListener("message", parent_on_message, false);
        } else {
            window.attachEvent("onmessage", parent_on_message);
        }
    }
});

$(window).resize(function () {
    $('.tab-editor').width('100%');
});

{
    $(window).mousedown(function (e) {
        startSeparator(e);
    });
    $(window).on("touchstart", startSeparator);
    $(window).mouseup(function (e) {
        endSeparator(e);
    });
    $(window).on("touchend", endSeparator);
}

$('#first-interface-selector').change(function () {
    updateEditor('first');
});

$('#second-interface-selector').change(function () {
    updateEditor('second');
});

$('#modal-agree-clone').click(function () {
    const interface = $('#first-interface-selector option:selected')[0].value;
    $('#second-interface-selector').val(interface);
    $('#second-iframe').prop('src', $('#first-iframe').prop('src'));
    const multiEditorLS = localStorage.getItem('multiEditor');
    const multiEditor = JSON.parse(multiEditorLS);
    multiEditor.multi['second'] = multiEditor.multi['first'];
    localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
    updateMultiUrl(multiEditor.multi);
});

$("body").on("click", "#interface-action", function () {
    $("#copy-link-msg").hide();
    if (window.parent.location.href.indexOf('link1') > -1 && window.parent.location.href.indexOf('link2') > -1) {
        $("#link-value").show();
        $("#copy-link").show();
        $("#link-expiration-msg").show();
        $("#link-notice-msg").hide();
        $("#link-value").val(window.parent.location.href);
    } else {
        $("#link-value").hide();
        $("#copy-link").hide();
        $("#link-expiration-msg").hide();
        $("#link-notice-msg").show();
    }
});

$("body").on('click', "#copy-link", function () {
    copyToClipboard($('#link-value'), $("#copy-link-msg"))
});

/**
 * Show editor in selected iframe.
 * @param {object} editor
 * @param {string} iframe
 * @param {boolean} simu
 */
function showEditor(editor, iframe, simu = false) {
    $(`#${iframe}-interface-selector`).val(editor.interface);
    const link = editor.link ? `link=${editor.link}&}` : '';
    simu = simu ? '1' : null;
    document.getElementById(iframe + '-iframe').src = `${window.location.origin}/${editor.interface}/?${link}&mode=blocks&multi=${iframe}&simu=${simu}`;
};

/**
 * Update selected editor in default mode.
 * @param {string} iframe
 */
function updateEditor(iframe) {
    const interface = $('#' + iframe + '-interface-selector option:selected')[0].value;
    const editor = { 'link': null, 'interface': interface };
    const multiEditorLS = localStorage.getItem('multiEditor');
    if (multiEditorLS) {
        const multiEditor = JSON.parse(multiEditorLS);
        if (!multiEditor.multi) {
            multiEditor.multi = {};
        }
        multiEditor.multi[iframe] = editor;
        localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
        updateMultiUrl(multiEditor.multi);
    }
    showEditor(editor, iframe);
};

function updateMultiPage (multiPage, editor, iframe) {
    if (multiPage[iframe].interface === null) {
        multiPage[iframe] = editor;
    }
};

/**
 * Update multi page url from multiPage definition.
 * @param {object} multiPage
 */
function updateMultiUrl(multiPage) {
    const link1 = multiPage.first.link;
    const link2 = multiPage.second.link;
    let linkStruct = {
        base: window.location.origin + window.location.pathname,
        args: {
            iframe1: multiPage.first.interface,
            link1: link1 ? link1 : '',
            iframe2: multiPage.second.interface,
            link2: link2 ? link2 : '',
            simu: $_GET("simu") ? '1' : ''
        }
    };
    history.pushState({}, '', stringifyLinkShare(linkStruct));
};

/**
 * Stringify shared link from object.
 * @param {object} linkObject 
 * @returns {string} link
 */
function stringifyLinkShare(linkObject) {
    let link = linkObject.base + '?';
    $.each(linkObject.args, (k, v) => {
        if (v != '') {
            link += `${k}=${v}&`;
        }
    });
    /* Substr to remove last character either ? or & */
    return link.substr(0, link.length - 1);
};

/**
 * Copy link to clipboard.
 * @param {object} input 
 * @param {object} message 
 */
function copyToClipboard(input, message) {
    input.select();
    document.execCommand("copy");
    if ($(message).is(":visible"))
        $(message).css("display", "none");
    $(message).fadeIn("slow");
};

/** EVENT functions */

function startSeparator(event) {
    let currentTarget = event.target;
    while (currentTarget) {
        if (currentTarget.id == "interface-resizer") {
            $('.tab-editor').css({
                'visibility': 'hidden'
            });
            $(window).mousemove(function (event) {
                moveSeparator(event)
            });
            $(window).on('touchmove', event, moveSeparator)
            break;
        }
        currentTarget = currentTarget.parentNode;
    }
};

function moveSeparator(event) {
    windowWidth = $(window).width();
    if (event.type === "touchmove") {
        mouse_x = event.changedTouches[0].pageX;
    } else {
        mouse_x = event.pageX;
    }
    if (mouse_x > (windowWidth - 20) || mouse_x < 20) {
        return;
    }
    $('#first-editor').width(mouse_x);
    $('#second-editor').width(windowWidth - mouse_x);
};

function endSeparator(event) {
    $('.tab-editor').css({
        'visibility': 'visible'
    });
    $(window).off('mousemove');
    $(window).off('touchmove');
};

// parent_on_message(e) will handle the reception of postMessages (a.k.a. cross-document messaging or XDM).
function parent_on_message(event) {
    const message = event.data.split('=');
    if (message[0] === 'url-for-multi') {
        window.history.pushState({}, '', event.data.split('url-for-multi=')[1]);
    } else {
        console.log("Parent received invalid message");
    }
};

// if it's in a iframe, set the height of the navbar to 0 and then hide it
$(document).ready(function () {
    if (window.self !== window.top || true) {
        $('.navbar, #navbar-padding').hide();
        $('body').css('--navbar-height', '0px');
        $('body').css('overflow', 'hidden');
    }
});    
