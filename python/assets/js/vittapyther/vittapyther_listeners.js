const divScreen = {
    width: 0,
    height: 0
};

const vncDivState = {
    visility: false,
};

$("#monitor-resizer").bind("mouseup toucheend", function () {
    if ($("#screen").length > 0) {
        const height = $("#screen").height(),
            width = $("#screen").width(),
            monitorWidth = $("#monitor-content").width(),
            monitorHeight = $("#monitor-content").height(),
            storageConsole = "";

        if (JSON.parse(localStorage.getItem('console')) !== null && JSON.parse(localStorage.getItem('console')) !== undefined) {
            storageConsole = JSON.parse(localStorage.getItem('console'));
        }
        if (height != divScreen.height || width != divScreen.width) {

            if (storageConsole["python"] == undefined || storageConsole["python"] == 'bottom') {
                document.getElementById('resize-manager').setAttribute("data-height", Math.ceil(height) - 2)
                document.getElementById('resize-manager').setAttribute("data-width", Math.ceil((Math.floor(height) * 16) / 9))
                setDimensionScreen(Math.ceil(height) - 2);
            } else {
                document.getElementById('resize-manager').setAttribute("data-height", Math.ceil((Math.floor(width) * 9) / 16))
                document.getElementById('resize-manager').setAttribute("data-width", Math.ceil(width) - 2)
                setDimensionScreen(Math.ceil((Math.floor(width) * 9) / 16));
            }
            document.getElementById('resize-manager').click();

            divScreen.height = monitorHeight;
            divScreen.width = monitorWidth;

        }
    }
});

$("#monitor-resizer").bind("mousedown touchestart", function () {
    if ($("#screen").length > 0) {
        divScreen.height = $("#monitor-content").height();
        divScreen.width = $("#monitor-content").width();
    }
});

document.addEventListener('click', function (e) {
    if (e.target.id == 'vnc-full-screen') {
        if (vncDivState.visility) {
            vncDivState.visility = false;
            swapContentVnc(false);
            $("#fullscreen-vnc").hide();
        } else {
            vncDivState.visility = true;
            swapContentVnc(true);
            $("#fullscreen-vnc").show();
        }
    }
});

function swapContentVnc(fullscreen = false) {
    if (fullscreen) {
        $('#vnc-full-screen').html("<i class='fas fa-expand'></i> Retirer le mode plein écran");

        $('#fullscreen-vnc').append($('#size'));
        $('#fullscreen-vnc').append($('#screen'));

        const height = $("#fullscreen-vnc").height();
        setDimensionScreen("auto");

        document.getElementById('resize-manager').setAttribute("data-height", Math.ceil(height - 50))
        document.getElementById('resize-manager').setAttribute("data-width", Math.ceil((Math.floor(height - 50) * 16) / 9))
        document.getElementById('resize-manager').click();

        $('#screen').html("");

    } else {

        $('#vnc-full-screen').html("<i class='fas fa-expand'></i> Passer en plein écran");
        $('#monitor-content').append($('#size'));
        $('#monitor-content').append($('#screen'));

        const width = $("#monitor-content").width(),
            height = $("#monitor-content").height();
        let storageConsole = "";

        if (JSON.parse(localStorage.getItem('console')) !== null && JSON.parse(localStorage.getItem('console')) !== undefined) {
            storageConsole = JSON.parse(localStorage.getItem('console'));
        }

        if (storageConsole["python"] == undefined || storageConsole["python"] == 'bottom') {
            document.getElementById('resize-manager').setAttribute("data-height", Math.ceil(height) - 2)
            document.getElementById('resize-manager').setAttribute("data-width", Math.ceil((Math.floor(height) * 16) / 9))
            setDimensionScreen(Math.ceil(height) - 2 + 'px');
        } else {
            document.getElementById('resize-manager').setAttribute("data-height", Math.ceil((Math.floor(width) * 9) / 16))
            document.getElementById('resize-manager').setAttribute("data-width", Math.ceil(width) - 2)
            setDimensionScreen(Math.ceil((Math.floor(width) * 9) / 16) + 'px');
        }
        document.getElementById('resize-manager').click();

        $('#screen').html("");
    }
}

function setDimensionScreen(height) {
    $('#screen').css('height', height);
}