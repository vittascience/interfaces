var output = '';
var music = '';
var isFound = '';
var isSearching = false;
var isCompiling = false;
var tab = [];
const DELAY = 1000

// Below is the translation for the message with the link to the Chrome browser download page
let messageNoThingz = {
    'fr': "<p style='color:var(--text-0);'>Veuillez télécharger un de nos plugins sur la <a href='/plugin' style='color:var(--vitta-blue-dark);' target='blank'>page plugins</a> </p>",
    'en': "Please download one of our plugins on the <a href='/plugin' style='color:var(--vitta-blue-dark);'>plugins page</a>"
}
let currentLanguage = document.location.href.substr(8, 2);

function checkVersion() {
    port.postMessage({
        cmd: "version"
    })
}

function checkCard() {
    if (isSearching == false) {
        writeConsole("<p style='color:var(--text-2);'  id='search-card' > <span data-i18n='code.chromeApp.searchCard'>Recherche d'une carte Arduino Uno </span><span id='card-wait'></span></p>")
        isSearching = true
    } else {
        if ($('#card-wait').html() == '...') {
            $('#card-wait').html('')
        } else {
            $('#card-wait').html($('#card-wait').html() + '.')
        }
    }
    port.postMessage({
        cmd: "search"
    })
}

function checkArduinoCreateAgent() {
    VittaInterface.IS_FIREFOX = true;
    writeConsole("<p style='color:var(--text-2);' data-i18n='code.loadingPage.pluginSearch'>Recherche du plugin Arduino Create Agent en cours...</p>")
    var isCreateAgentConnected = init_plugin();
    checkPort();
    return isCreateAgentConnected;
}

function uploadArduinoProgram() {
    //const innerappend = "<img src=\"/public/content/img/compile.svg\" id=\"compile-loader\" alt='chargement'>";
    disableCommands();
    reset_traceur(); //Reset traceur to have a clean graph datas with new keys and values.
    if (document.getElementById("port-select").value)
        prepareCompile(true);
    else {
        compileMessage(jsonPath('code.errorMsg.noPortAvailable'), false);
        enableCommands();
    }
};

function displayPluginLink() {
    if ($('#is-thingz').val() == 'disconnect' || $('#is-thingz').val() == 'init') {
        writeConsole("<p style='color:var(--vitta-red);' data-i18n='code.chromeApp.appError'>Chrome App Thingz non détectée</p>")
        // writeConsole("<p style='color:var(--text-2);' data-i18n='code.chromeApp.plugins'>Veuillez télécharger un de nos plugins sur la <a href='/plugin' style='color:var(--vitta-blue-dark);'>page plugins</a> </p>")
        if (typeof messageNoThingz[currentLanguage] != 'undefined') {
            document.getElementById("console").innerHTML += messageNoThingz[currentLanguage];
        } else {
            document.getElementById("console").innerHTML += messageNoThingz.fr;
        }
        $('#is-thingz').val('plugin')
        writeConsole("<p style='color:var(--text-2);' data-i18n='code.chromeApp.createConnect'>Tentative de connexion au plugin Arduino Create Agent... </p>")
        checkArduinoCreateAgent()
        setTimeout(displayPluginLinkCreate, 5000)

    }
}

function displayPluginLinkCreate() {
    if ($('#port-select').val() == '') {
        writeConsole("<p style='color:var(--vitta-red);' data-i18n='code.chromeApp.createError'>Plugin Arduino Create Agent non détecté</p>")
        // writeConsole("<p style='color:var(--text-2);' data-i18n='code.chromeApp.plugins'>Veuillez télécharger un de nos plugins sur la <a href='/plugin' style='color:var(--vitta-blue-dark);'>page plugins</a> </p>")
        if (typeof messageNoThingz[currentLanguage] != 'undefined') {
            document.getElementById("console").innerHTML += messageNoThingz[currentLanguage];
        } else {
            document.getElementById("console").innerHTML += messageNoThingz.fr;
        }
        $('#is-thingz').val('plugin')
    }
}

function checkThingz() {
    if ($('#is-thingz').val() != 'connect') {
        if ($('#is-thingz').val() == 'init') {
            writeConsole("<p style='color:var(--text-2);' data-i18n='code.chromeApp.appConnect'>Tentative de connexion à la Chrome App Thingz... </p>")
        }
        try {
            port = chrome.runtime.connect("ifpbemhfgibeaednjoidchimcbphpacn")
            port.onMessage.addListener(function (data) {
                if (data.value == "SUCCESS" && data.cmd == "close" || data.value == "COM_NOT_OPENED") {
                    if (data.value !== "COM_NOT_OPENED")
                        writeConsole("<p style='color:var(--text-2);' data-i18n='code.chromeApp.closeSuccess'>Connexion fermée </p>")
                    $('#serial-close i').html('power');
                    $('#serial-close').data('status', "connect");
                    if (isCompiling == true) {
                        port.postMessage({
                            cmd: 'compilation',
                            data: CodeManager.getSharedInstance().getCode()
                        })
                    }
                }
                if (data.value == "ERROR" && data.cmd == "close") {
                    writeConsole("<p style='color:var(--vitta-red);' data-i18n='code.chromeApp.closeError2'>Échec de la fermeture du port série</p>")
                    $('#serial-close i').html('power');
                    $('#serial-close').data('status', "connect");

                }
                if (data.cmd == "open" && data.value == "OPENED") {
                    writeConsole("<p style='color:var(--vitta-green);' data-i18n='code.chromeApp.openSuccess'>Port ouvert avec succès</p>")
                }
                //If the compilation works, open a new serial
                if (data.cmd == "compilation" && data.status == "0") {
                    writeConsole("<p style='color:var(--vitta-green);' data-i18n='code.chromeApp.compileSuccess'>Programme compilé et transféré sur la carte avec succès </p>")
                    isCompiling = false
                    port.postMessage({
                        cmd: 'open',
                        options: {
                            bitrate: parseInt($('#baud').val())
                        },
                        noProtocol: true
                    })
                    writeConsole("<p style='color:var(--text-2);' data-i18n='code.chromeApp.openConnect'>Ouverture du port série... </p>")
                    $('#serial-close i').html('power_off');
                    $('#serial-close').data('status', "disconnect");
                }
                //if the compilation fails, return an error in the console
                if (data.cmd == "compilation" && data.status == "1") {
                    writeConsole("<p style='color:var(--vitta-red);'><span data-i18n='code.chromeApp.compileError'>Erreur lors de la compilation :</span>\n" + data.compileError + "</p>")
                    isCompiling = false
                }
                //format the input data to read the special characters and line break
                if (data.cmd == "read") {
                    var textDecoder = new TextDecoder("utf-8");
                    let t = Object.keys(data.raw).map(k => {
                        return data.raw[k]
                    });
                    tab = tab.concat(t);
                    output = textDecoder.decode(new Uint8Array(tab).buffer).split('\n');
                    if (output.pop() == "") {
                        for (let i = 0; i < output.length; i++) {
                            writeConsole("<p style='color:var(--text-0);'>" + output[i] + "</p>");
                            if (output[i].match(/^@music:/) && $('#audio-switch').append("On")) {
                                let note = output[i].replace("@music:", "");
                                note = note.replace("|", "");
                                playMusic(note)
                            } else if (output[i].match(/^@Graph:/)) {
                                let parsedArray = parseMessage(output[i])
                                if (parsedArray) {
                                    TIMEOUT = 50;
                                    updateChart(parsedArray);
                                    prepareToApi(parsedArray);
                                    parser_message = "";
                                }
                            }
                            tab = []
                        }
                    }
                }
                //reset the input in console
                if (data.cmd == "write" && data.value == "SEND") {
                    writeConsole("<p style='color:var(--text-2);'><span data-i18n='code.chromeApp.writeSuccess'>Message envoyé à la carte : </span>" + $('#serial-input').val() + "</p>")
                    $('#serial-input').val("");
                }
                if (data.value == "BOARD_DISCONNECTED" && data.cmd == "open") {
                    synth.triggerRelease(); /* STOP MUSIC */
                    $('#serial-close i').html('power');
                    $('#serial-close').data('status', "connect");
                    writeConsole("<p style='color:var(--vitta-red);' data-i18n='code.chromeApp.cardDisconnect'>Votre carte a été déconnectée </p>")
                    setTimeout(checkCard, DELAY)
                }
                //detect the app
                if (data.cmd == "version") {
                    $('#is-thingz').val('connect')
                    writeConsole("<p style='color:var(--vitta-green);' data-i18n='code.chromeApp.appSuccess'>Connexion à la Chrome App réussie </p>")
                    checkCard()
                }
                //detect the card
                if (data.cmd == "search") {
                    if (data.value == "FOUND" || data.value == "ALREADY_OPENED") {
                        if (isFound != 'FOUND') {
                            writeConsole("<p style='color:var(--vitta-green);' data-i18n='code.chromeApp.cardSuccess'>Votre carte est connectée</p>")
                            writeConsole("<p style='color:var(--text-2);' data-i18n='code.chromeApp.cardUserOpenSerial'>Vous pouvez ouvrir le port série avec le bouton \"Connexion\" ou téléverser votre programme.</p>")
                            isSearching = false
                            $("#port-select").html("<option>Port Auto</option>");
                            $("#board-select").html("<option>Arduino Uno</option>");
                            $('#search-card').remove()
                            isFound = 'FOUND';
                        }
                    } else if (data.value == "NOT_FOUND" || data.value == "NO_CARD" || data.value == "SEARCH_IN_PROGRESS") {
                        if (isFound != 'NOT_FOUND') {
                            writeConsole("<p style='color:var(--vitta-red);' data-i18n='code.chromeApp.cardError'>Votre carte n'a pas été détectée </p>")
                            $('#serial-close i').html('power');
                            $('#serial-close').data('status', "connect");
                            isFound = 'NOT_FOUND';
                        }
                        setTimeout(checkCard, DELAY)

                    } else if (data.value == "MORE_THAN_ONE_CARD") {
                        if (isFound != 'MORE_THAN_ONE_CARD') {
                            writeConsole("<p style='color:var(--vitta-red);' data-i18n='code.chromeApp.cardError2'>Vous avez plus d'une carte connectée </p>")
                            isFound = 'MORE_THAN_ONE_CARD';
                        }
                        setTimeout(checkCard, DELAY)
                    }
                } else if (data.value == "FLASH_INPROGRESS") {
                    writeConsole("<p style='color:var(--vitta-red);' data-i18n='code.chromeApp.cardError3'>Téléversement en cours, carte indisponible </p>")

                }
            })
            //check if the chrome app disconnect
            port.onDisconnect.addListener(function () {
                if ($('#is-thingz').val() == 'connect') {
                    writeConsole("<p style='color:var(--vitta-red);' data-i18n='code.chromeApp.closeSpecial'>Fermeture du port série </p>")
                    $("#port-select").html("<option>" + jsonPath("code.chromeApp.noPort") + "</option>");
                    $("#board-select").html("<option >" + jsonPath("code.chromeApp.noPort") + "</option>");
                    $('#is-thingz').val('disconnect')
                    $('#serial-close i').html('power');
                    $('#serial-close').data('status', "connect");
                    synth.triggerRelease(); /* Stop music */
                }
                setTimeout(checkThingz, DELAY)
            })
            //when you hit the compile button
            $("body").on('click', '#upload', function (e) {
                if ($('#monitor').height() == '0') {
                    $('#monitor-toggler').click();
                }
                isCompiling = true
                port.postMessage({
                    cmd: 'close'
                })

            })
            //when you hit the disconnect button
            $("#serial-close").click(function (e) {
                if ($("#serial-close").data('status') != "connect") {
                    isCompiling = false
                    synth.triggerRelease(); /* Stop music */
                    port.postMessage({
                        cmd: 'close'
                    });
                    $('#serial-close i').html('power');
                    $('#serial-close span').attr('data-i18n', 'code.monitor.controls.text.disconnect');
                    $('#serial-close').data('status', "connect");
                } else {
                    port.postMessage({
                        cmd: 'open',
                        options: {
                            bitrate: parseInt($('#baud').val())
                        },
                        noProtocol: true
                    })
                    writeConsole("<p style='color:var(--text-2);' data-i18n='code.chromeApp.openConnect'>Ouverture du port série... </p>")
                    $('#serial-close i').html('power_off');
                    $('#serial-close span').attr('data-i18n', 'code.monitor.controls.text.connect');
                    $('#serial-close').data('status', "disconnect");
                }

            })
            //when you send data
            document.getElementById("serial-send").onclick = function (e) {
                let message = document.getElementById("serial-input").value;
                port.postMessage({
                    cmd: 'write',
                    value: message
                })
            };
            checkVersion()
            setTimeout(displayPluginLink, DELAY)
        } catch (error) {
            if ($('#is-thingz').val() != 'plugin') {
                // writeConsole("<p style='color:var(--text-2);' data-i18n='code.chromeApp.plugins'>Veuillez télécharger un de nos plugins sur la page <a href='/plugin' style='color:var(--vitta-blue-dark);'>plugin</a> </p>")
                if (typeof messageNoThingz[currentLanguage] != 'undefined') {
                    writeConsole(messageNoThingz[currentLanguage]);
                } else {
                    writeConsole(messageNoThingz.fr);
                }
                $('#is-thingz').val('plugin')
            }
            setTimeout(checkThingz, DELAY)
        }
    }
}