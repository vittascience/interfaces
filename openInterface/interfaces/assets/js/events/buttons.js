/* Init */
let firstHelpTi = true;
window.addEventListener('storage', (e) => {
    if (e.key == "theme" || e.key == "font") {
        setAccessibility();
    }
});
let showNewBtn = false;
let showOpenBtn = true;
let showSaveBtn = true;
let showEditBtn = true;
let showProjData = true;

// Events for empty trash button (blockly)
const emptyTrashButtonObserver = new MutationObserver(
    function (emptyTrashMutations) {
        emptyTrashMutations.forEach(() => {
            const emptyTrashBtn = $("#empty-trash-btn").css("display"),
                trash = $("#content_blocks .blocklyFlyout")[0].style.display,
                trashBlocks = $("#content_blocks .blocklyFlyout .blocklyWorkspace .blocklyBlockCanvas")[0];
            trashBlocks.setAttribute("transform", "translate(0,50) scale(0.9)");
            if (emptyTrashBtn == "none" && trash == "block") {
                $("#empty-trash-btn").css("display", "block")
            } else if (emptyTrashBtn == "block" && trash == "none") {
                $("#empty-trash-btn").css("display", "none");
            }
        });
    }
);
const emptyBackpackButtonObserver = new MutationObserver(
    function (emptyBackpackMutations) {
        emptyBackpackMutations.forEach(() => {
            const backpackWidth = $("#content_blocks .injectionDiv .blocklyFlyout")[2].width['baseVal'].value,
                emptyBackpackBtn = $("#empty-backpack-btn").css("display"),
                backpack = $("#content_blocks .blocklyFlyout")[2].style.display,
                backpackBlocks = $("#content_blocks .blocklyFlyout .blocklyWorkspace .blocklyBlockCanvas")[2];
            backpackBlocks.setAttribute("transform", "translate(0,50) scale(0.9)");
            if (backpackWidth > 33) {  // backpack not empty
                if (emptyBackpackBtn == "none" && backpack == "block") {
                    $("#empty-backpack-btn").css("display", "block")
                } else if (emptyBackpackBtn == "block" && backpack == "none") {
                    $("#empty-backpack-btn").css("display", "none");
                }
            } else {
                $("#empty-backpack-btn").css("display", "none");
            }
        });
    }
);

const setupObserver = function () {
    if (document.querySelector("#content_blocks .blocklyFlyout")) {
        const trashLocation = $("#content_blocks .blocklyFlyout")[0], //trash
            backpackLocation = $("#content_blocks .blocklyFlyout")[2]; // backpack
        emptyTrashButtonObserver.observe(trashLocation, { attributes: true, attributeFilter: ['style'] });
        emptyBackpackButtonObserver.observe(backpackLocation, { attributes: true, attributeFilter: ['style'] });
    } else {
        setTimeout(setupObserver, 100);
    }
};

const runSimulatorObserver = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
        if (mutation.addedNodes.length) {
            for (let node of mutation.addedNodes) {
                if (node.id === 'run_simulator' || INTERFACE_NAME === 'python') {
                    setupInterfaceWithUrlParams();
                    return runSimulatorObserver.disconnect();
                }
            }
        }
    }
});
runSimulatorObserver.observe(document.body, { childList: true, subtree: true });

// Modals creation after stdModals have been populated
(async function setBeautifulModals() {
    await awaitJsonPath();
    if (typeof backModals === 'undefined' || typeof stdModals === 'undefined' || typeof Modal === 'undefined') {
        setTimeout(() => {
            setBeautifulModals;
        }, 50);
        return false;
    }
    window.pseudoModal = new Modal("a");
    if (Object.keys(stdModals).length === 0) {
        return setTimeout(setBeautifulModals, 50);
    }
    $.each(stdModals, (element, modal) => {
        document.querySelector('body').appendChild(new Modal(element, modal));
    });
    if (INTERFACE_NAME !== "adacraft" && INTERFACE_NAME !== 'web') {
        $('.sync-code-span').after('<div id="hint-sync">' + jsonPath('code.topbar.tooltips.alreadySynchronize') + ' <i class="fa fa-times" onclick="$(\'#hint-sync\').hide()"></i></div>');
        updateToolboxSwitcherValue();
    }
    return true;
})();

$.each(uiButtons, (value, button) => {
    $('#code-buttons-panel').append(Button(button))
});
$.each(cardCommunicationButtons, (value, button) => {
    $('#execution-buttons-panel').append(Button(button))
});
if (INTERFACE_NAME === 'adacraft') {
    $.each(adacraftModeButtons, (value, button) => {
        $('.ide-btn-group-mode').append(Button(button))
    });
} else {
    $.each(codeModeButtons, (value, button) => {
        $('.ide-btn-group-mode').append(Button(button))
    });
}

const dropdownHeader = `
    <div class="ide-dropdown dropdown-header d-flex justify-content-between align-items-center p-2" style="background-color: var(--bg-1);">
        <h5 data-i18n="code.topbar.menuTitles.settingsMenu" class="m-0 text-center user-text green-vitta"></h5>
        <button
            type="button"
            class="btn-close ms-2"
            data-i18n="[aria-label]navbar.items.community.dropdown.close"
            onclick="((e) => e.target.closest('.ide-dropdown-always').click() )(event)">
        </button>
    </div>
`;


$('.ide-btn-group-settings').append(dropdownHeader);
$.each(settingsOptions, (value, button) => {
    $('.ide-btn-group-settings').append(Button(button))
});

// check if we have fullscreen permissions before adding the buttons
if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
    $.each(fullscreenButtons, (value, button) => {
        $('.fullscreen-btn-panel').append(Button(button))
    });
}

function appendLangSwitcherForInterfaces() {
    if (document.querySelector('#interface-i18n-list-group') === null) {
        setTimeout(appendLangSwitcherForInterfaces, 100);
        return;
    }
    $('#interface-i18n-list-group').append(
        // append all children of the lang switcher but with updated classes
        $('#switch-lang-list').children().map(function () {
            let onclick = $(this).attr('onclick');
            let href = $(this).attr('href');
            let innerHTML = $(this).html();
            let active = $(this).hasClass('active');

            let newLink = document.createElement('a');
            if (onclick) {
                newLink.setAttribute('onclick', onclick);
            } else {
                newLink.setAttribute('href', href);
            }
            newLink.setAttribute('class', 'list-group-item list-group-item-action');
            if (active) {
                newLink.classList.add('active');
            }
            newLink.innerHTML = innerHTML;
            return newLink;
        })
    );
}

if (INTERFACE_NAME !== "adacraft") {
    $.each(emptyButtons, (value, button) => {
        $('#content_blocks').prepend(Button(button))
    });

    if (Main.hasSimulator()) {
        $.each(simulatorButtons, (value, button) => {
            $('#simulator-btn-panel').append(Button(button));
        });
    }

    if ($('#switch-lang-list').length > 0) {
        appendLangSwitcherForInterfaces();
    } else { // if there is no lang switcher, add the default one using the whitelist
        // check if we are on prod or not by checking if the domain starts with one of the languages in the whitelist
        let isOnProd = false;
        languageWhitelist.forEach((lang) => {
            if (window.location.hostname.startsWith(lang)) {
                isOnProd = true;
            }
        });

        $('#interface-i18n-list-group').append(
            languageWhitelist.map((lang) => {
                if (lang == 'cimode') {
                    // cimode is a special language that is used for testing, we don't want to show it to the user
                    return;
                }

                let langChanger;

                // if the domain starts with one of the languages in the whitelist, we want to make a link to the url with the new language
                // else, we call the switchLang function by a button
                if (isOnProd && typeof ltiVariables13 === 'undefined') {
                    langChanger = document.createElement('a');
                    langChanger.setAttribute('href', window.location.href.replace(window.location.hostname.split('.')[0], lang));
                    langChanger.setAttribute('class', 'list-group-item list-group-item-action');
                } else {
                    langChanger = document.createElement('button');
                    langChanger.setAttribute('onclick', `switchLang('${lang}')`);
                }

                langChanger.setAttribute('class', 'list-group-item list-group-item-action');

                if (lang == i18next.language) {
                    langChanger.classList.add('active');
                }

                switch (lang) {
                    case 'en':
                        langChanger.innerHTML = 'English';
                        break;
                    case 'fr':
                        langChanger.innerHTML = 'Français';
                        break;
                    case 'es':
                        langChanger.innerHTML = 'Español';
                        break;
                    case 'it':
                        langChanger.innerHTML = 'Italiano';
                        break;
                    case 'ar':
                        langChanger.innerHTML = 'العربية';
                        break;
                    default:
                        langChanger.innerHTML = lang;
                        break;
                }
                return langChanger;
            })
        );
    }

    const dropdownHeaderDownload = `
        <div class="ide-dropdown dropdown-header d-flex justify-content-between align-items-center p-2" style="background-color: var(--bg-1);">
            <h5 data-i18n="code.topbar.menuTitles.downloadMenu" class="m-0 text-center user-text green-vitta"></h5>
            <button
              type="button"
              class="btn-close ms-2"
              data-i18n="[aria-label]navbar.items.community.dropdown.close"
              onclick="(() => { document.querySelector('#download-options').click()})()"
            ></button>
        </div>
    `;
    const downloadOptionInterfaces = ["arduino", "microbit", "esp32", "wb55", "l476", "galaxia", "GalaxiaCircuitPython", "mBot", "m5stack", "buddy", "cyberpi", "letsstartcoding", "pico", "eliobot", "thymio", "raspberrypi", "winky", "niryo", "nao", "sphero", "lotibot", "bluebot", "spike", "photon"];
    if (downloadOptionInterfaces.includes(INTERFACE_NAME)) {
        $('.ide-btn-group-download').append(dropdownHeaderDownload);

        $.each(downloadOptions, (value, button) => {
            $('.ide-btn-group-download').append(Button(button));
        });
        // displays the correct download button depending on the OS
        if (INTERFACE_NAME === 'thymio' || INTERFACE_NAME === 'niryo' || INTERFACE_NAME === 'nao') {
            if (navigator.userAgent.toLowerCase().indexOf('win') !== -1) {
                document.querySelector('#download-firmware-opt-windows').style.display = 'block';
            } else if (navigator.userAgent.toLowerCase().indexOf('mac') !== -1) {
                document.querySelector('#download-firmware-opt-mac').style.display = 'block';
            } else if (navigator.userAgent.toLowerCase().indexOf('linux') !== -1 && INTERFACE_NAME === 'nao') {
                document.querySelector('#download-firmware-opt-linux').style.display = 'block';
            }
        } else if (INTERFACE_NAME === 'l476') {
            if (navigator.userAgent.toLowerCase().indexOf('win') === -1) {
                document.querySelector('#download-firmware-opt').style.display = 'block';
            } else {
                document.querySelector('#download-firmware-opt-windows').style.display = 'block';
            }
        }
        $(".ide-btn-alone-dropdown").click(function () {
            const elem = $(this).parent().children('div.ide-btn-group');
            $(".ide-btn-group").each(function () {
                if (!$(this).hasClass('hidden') && $(this).attr('class') != elem.attr('class')) {
                    $(this).toggleClass('hidden');
                }
            });
            elem.toggleClass('hidden');
        });
    }

    setupObserver();

    // enabling Python Code translation info on Python interface
    if (INTERFACE_NAME == "python") {
        if (localStorage.getItem('pythonCodeTranslationInfo') == null) {
            $('#mixed-popup-working').css('opacity', '1');
            $('#mixed-popup-working').click(function () {
                $('#mixed-popup-working').remove();
                localStorage.setItem('pythonCodeTranslationInfo', true);
            });
        }
    }
}

if ($_GET('use') == 'classroom') {
    $('.ide-btn-pythtest').remove()
}

function darkenColor(hex, percent) {
    // Convert hex to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Adjust RGB values
    r = Math.floor(r * (100 - percent) / 100);
    g = Math.floor(g * (100 - percent) / 100);
    b = Math.floor(b * (100 - percent) / 100);

    // Convert RGB to hex
    const darkerHex = ((r << 16) + (g << 8) + b).toString(16);
    return darkerHex.padStart(6, "0");
}

function hexToRgb(hex) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
}

// set themes 
setTimeout(() => {
    let hasPrimaryColorBeenSet = false;
    let hasSecondaryColorBeenSet = false;

    if ($_GET("primaryColor")) {
        while (!hasPrimaryColorBeenSet) {
            let primaryColor = $_GET("primaryColor");
            if (/^[0-9A-F]{6}$/i.test(primaryColor)) {
                document.documentElement.style.setProperty('--vitta-green', '#' + primaryColor);
                document.documentElement.style.setProperty('--vitta-green-rgb', hexToRgb(primaryColor));
                document.documentElement.style.setProperty('--vitta-green-focus-shadow', '#' + primaryColor + '80');
                document.documentElement.style.setProperty('--vitta-green-dark', '#' + darkenColor(primaryColor, 20));
                hasPrimaryColorBeenSet = true;
            }
        }
    }

    if ($_GET("secondaryColor")) {
        while (!hasSecondaryColorBeenSet) {
            let secondaryColor = $_GET("secondaryColor");
            if (/^[0-9A-F]{6}$/i.test(secondaryColor)) {
                document.documentElement.style.setProperty('--vitta-orange-light', '#' + secondaryColor);
                document.documentElement.style.setProperty('--vitta-orange-light-rgb', hexToRgb(secondaryColor));
                document.documentElement.style.setProperty('--vitta-orange-light-focus-shadow', '#' + secondaryColor + '80');
                document.documentElement.style.setProperty('--vitta-orange-dark', '#' + darkenColor(secondaryColor, 20));
                document.documentElement.style.setProperty('--vitta-orange', '#' + darkenColor(secondaryColor, 40));
                document.documentElement.style.setProperty('--vitta-orange-rgb', hexToRgb(darkenColor(secondaryColor, 40)));
                hasSecondaryColorBeenSet = true;
            }
        }
    }
}, 100);

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 **/
(function (a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);

if (Main.inIframe() == true) {
    $('#main-navbar, #navbar-padding').height(0);
    $('#main-navbar, #navbar-padding').hide();
    showNewBtn = false;
    typeof InterfaceMonitor !== 'undefined' && InterfaceMonitor.toggle();;
}

Main.resizeWorkSpace();
Main.resizeAceEditor();

$('input[type=radio][name=shareOptionsMode]').change(function () {
    if (this.value == "simuOnly") {
        $('#modal-share-options-simulator').hide();
        $('#shareOptionsSimulatorDisable').prop('checked', true);
        $('#modal-share-options-console').hide();
        $('#shareOptionsConsoleBottom').prop('checked', true);
        updateValueLinkShare('simu', $('#shareOptionsSimulatorDisable').val());
    } else {
        $('#modal-share-options-simulator').css('display', 'flex');
        $('#modal-share-options-console').css('display', 'flex');
    }
});

if ($_GET("nocloud") == "1") {
    $('#modal-saveproject .vitta-modal-content, #modal-openproject, #modal-openproject #my-projects-list').hide();
    $('#help-setting').hide();
    $('#addblock-setting').hide();
}

// BUTTON DISPLAY MANAGEMENT
function setButtonDisplay() {
    if ($_GET('nonew') == "1") {
        showNewBtn = false;
    } else {
        showNewBtn = true;
    }

    if ($_GET('noopen') == "1") {
        showOpenBtn = false;
    } else {
        showOpenBtn = true;
    }

    if ($_GET('nosave') == "1") {
        showSaveBtn = false;
    } else {
        showSaveBtn = true;
    }

    if ($_GET('noedit') == "1") {
        showEditBtn = false;
    } else {
        showEditBtn = true;
    }

    if ($_GET('nodata') == "1") {
        showDataBtn = false;
    } else {
        showDataBtn = true;
    }

    // AFTER THE MAIN PARAMETER CHECKS, CHECK THE URL PARAMETERS FOR SPECIAL CASES
    if (Main.inIframe()) {
        showNewBtn = false;
    }

    if (Main.inIframe() == true && ($_GET('use') == null || !$_GET('use') == 'classroom')) {
        // if we're using nocloud and nonew is set to 0, we show the new project button
        if ($_GET('nocloud') == 1 && $_GET('nonew') == 0) {
            showNewBtn = true;
        }
    }

    if ($_GET('projectmanagement') == 0) {
        showNewBtn = false;
        showOpenBtn = false;
        showSaveBtn = false;
        showEditBtn = false;
    }

    // SETTING THE CORRECT DISPLAY FOR THE BUTTONS
    if (showEditBtn) {
        $('#edit-project-name').show();
    } else {
        $('#edit-project-name').hide();
    }

    if (showDataBtn) {
        $('.project-data').show();
    } else {
        $('.project-data').hide();
    }

    if (showNewBtn && showOpenBtn && showSaveBtn) {
        $('#newproject-btn').addClass('ide-btn-left');
        $('#saveproject-btn').addClass('ide-btn-right');
        $('#newproject-btn, #openproject-btn, #saveproject-btn').show();
    } else if (showNewBtn && showOpenBtn) {
        $('#newproject-btn').addClass('ide-btn-left');
        $('#openproject-btn').addClass('ide-btn-right');
        $('#newproject-btn, #openproject-btn').show();
        $('#saveproject-btn').hide();
    } else if (showNewBtn && showSaveBtn) {
        $('#newproject-btn').addClass('ide-btn-left');
        $('#saveproject-btn').addClass('ide-btn-right');
        $('#newproject-btn, #saveproject-btn').show();
        $('#openproject-btn').hide();
    } else if (showOpenBtn && showSaveBtn) {
        $('#openproject-btn').addClass('ide-btn-left');
        $('#saveproject-btn').addClass('ide-btn-right');
        $('#openproject-btn, #saveproject-btn').show();
        $('#newproject-btn').hide();
    } else if (showNewBtn) {
        $('#newproject-btn').addClass('ide-btn-alone');
        $('#newproject-btn').show();
        $('#openproject-btn, #saveproject-btn').hide();
    } else if (showOpenBtn) {
        $('#openproject-btn').addClass('ide-btn-alone');
        $('#openproject-btn').show();
        $('#newproject-btn, #saveproject-btn').hide();
    } else if (showSaveBtn) {
        $('#saveproject-btn').addClass('ide-btn-alone');
        $('#saveproject-btn').show();
        $('#newproject-btn, #openproject-btn').hide();
    } else {
        $('#newproject-btn, #openproject-btn, #saveproject-btn').hide();
    }
};
// END BUTTON DISPLAY MANAGEMENT

/* Block monitor controls dropup interaction on click */
$('#monitor-controls-dropdown').click(function (e) {
    e.stopPropagation();
});

$("#monitor-btn-console").click(function () {
    InterfaceMonitor.managePanel('console');
});

$("#monitor-btn-graph").click(function () {
    InterfaceMonitor.managePanel('graph');
});

$("#monitor-btn-music").click(function () {
    InterfaceMonitor.managePanel('music');
});

$("#monitor-clear").click(function () {
    if ($("#monitor-btn-console").hasClass('activated')) {
        InterfaceMonitor.clear();
    }
});

// Refresh the bootstrap tooltip list with the lastly added buttons
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-bs-toggle="tooltip"]').tooltip()
})

// Add the hiding of dropdowns when clicking on their child button
$('.ide-dropdown .ide-btn-group .ide-btn').on('click', function () {
    var parent = $(this).parent();
    if (!parent.hasClass('hidden')) {
        parent.toggleClass('hidden');
    }
});

document.addEventListener('click', (e) => {
    if (e.target.closest('#autocorrector-modal-button')) {
        if (projectManager.getInterface() == 'python') {
            pseudoModal.openModal('modal-formunittests');
        } else {
            openExerciseModal();
        }
    }
}, false);

// Opens the save mode when the CRTL+S keys are pressed
document.addEventListener('keydown', function (event) {
    // Check that the "Control" key (or "Command" for Mac) and the "S" key are pressed.
    if ((event.ctrlKey || event.metaKey) && event.keyCode == 83) {
        // Prevents the browser from saving by default
        event.preventDefault();
        saveProjectbtn();
    }
});

/**
 * Listen to all the document submit events and execute the saveExerciseStatement if the event target is the exercise statement form
 */
document.addEventListener('submit', (e) => {
    if (e.target.id == 'exercise-statement-form') {
        saveExerciseStatement(e);
    }
});

function setupInterfaceWithUrlParams() {
    const mode = $_GET("mode") || '';
    if (Main.hasSimulator()) {
        if (mode === 'simuOnly') {
            toggleSimuOnly();
            Main.forcedCodeMode = mode;
        } else if ($_GET("simu") == "1" || $_GET("simulateur") == "1" || $_GET("simulator") == "1") {
            if (!Simulator.isOpen) {
                toggleSimulator();
            }
        } else if (Simulator.isOpen) {
            toggleSimulator();
        }
    }
    if (mode === "consoleOnly") {
        setConsoleOnlyMode();
        Main.forcedCodeMode = mode;
    }
}

/* ** Useful functions of the interface buttons ** */

/**
 * Save the project to the current user device -> default behavior
 */
function saveDefaultProjectToComputer(downloadingProject) {
    const inoInterfaces = ["arduino", "letsstartcoding", "mBot"];
    let name = "";
    let description = "";
    const user = UserManager.getUser();
    if (user !== null && downloadingProject) {
        name = document.getElementById('save-name').value.replaceAll('.', '_');
        description = document.getElementById('save-description').value;
    } else {
        name = $('#project-name').text().replaceAll('.', '_');
        description = projectManager.getCurrentProject().description;
    }
    if (name == "no name" || name == null) {
        name = 'main';
    }

    let script = CodeManager.getSharedInstance().getCode();
    if (downloadingProject) {
        const userName = user == null ? 'anonyme' : (user.firstname + ' ' + user.surname);
        const commentsOpen = (inoInterfaces.includes(INTERFACE_NAME)) ? '/*' : '"""';
        const commentsClose = (inoInterfaces.includes(INTERFACE_NAME)) ? '*/' : '"""';
        let header = '';
        if (typeof window.maClasseTiIntegration !== 'undefined' && window.maClasseTiIntegration) {
            header += `${commentsOpen}\n\n`;

            if (user !== null) {
                header += `Auteur: ${userName}\n`;
            }

            header += `
Nom du projet: ${name}\n
Description: ${description}\n
Toolbox: ${(getParamValue('toolbox') || TOOLBOX_STYLE_DEFAULT)}\n
Mode: ${Main.getCodingMode()}\n
Blocks: ${CodeManager.getSharedInstance()._workspaceToXml()}\n
Projet généré par MaClasseTI.fr\n
Ce fichier contient le code textuel ainsi que le code blocs. Il peut être importé de nouveau\n
sur l'interface https://maclasseti.fr/python\n\n
${commentsClose}\n\n`;
        } else {
            header += `
${commentsOpen}\n\n
Auteur: ${userName}\n
Interface: ${INTERFACE_NAME}\n
Nom du projet: ${name}\n
Description: ${description}\n
Toolbox: ${(getParamValue('toolbox') || TOOLBOX_STYLE_DEFAULT)}\n
Mode: ${Main.getCodingMode()}\n
Blocks: ${CodeManager.getSharedInstance()._workspaceToXml()}\n
Projet généré par Vittascience.\n
Ce fichier contient le code textuel ainsi que le code blocs. Il peut être importé de nouveau\n
sur l'interface http://vittascience.com/${INTERFACE_NAME}\n\n
${commentsClose}\n\n`;
        }
        script = header + script;
    }
    if (typeof INTERFACE_NAME !== 'undefined' && INTERFACE_NAME === 'galaxia' && !downloadingProject) {
        name = 'main';
    } else {
        const d = new Date();
        const date = ["_", d.getFullYear(), d.getMonth(), d.getDate(), "_", d.getHours(), d.getMinutes(), d.getSeconds()];
        for (i in date) {
            name += date[i].toString();
        }
    }
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(script));
    if (inoInterfaces.includes(INTERFACE_NAME)) {
        element.setAttribute('download', name + '.ino');
    } else {
        element.setAttribute('download', name + '.py');
    }
    element.click();
    document.body.appendChild(element);
    document.body.removeChild(element);
}

/**
 * 
 * @param {String} code - The project code
 * @returns {String} the CSS code
 */
function splitCodeStyle(code) {
    if (code.match(/<style>([\s\S]*)<\/style>/) != null) {
        let css = code.match(/<style>([\s\S]*)<\/style>/)[1];
        css = css.replace(/<style>/g, '');
        css = css.replace(/<\/style>/g, '');
        return css;
    }
}

/**
 * Generate the project header for web interface local project export
 * @returns {String} The generated header
 */
function generateWebFileHeader(name, description) {
    const userName = UserManager.getUser() == null ? 'anonyme' : (UserManager.getUser().firstname + ' ' + UserManager.getUser().surname);
    const header =
        '<!-- Auteur: ' + userName + '\n'
        + 'Interface: web \n'
        + 'Nom du projet: ' + name + '\n'
        + 'Description: ' + description + '\n'
        + "Code: " + JSON.stringify(projectManager.localStorageManager.getLocalProjectContent().code) + '\n'
        + '\n\n'
        + 'Projet généré par Vittascience.\n\n'
        + 'Ce fichier contient le code textuel ainsi que le code blocs. Il peut être importé de nouveau\n'
        + 'sur l\'interface http://vittascience.com/web/ \n'
        + '--> \n\n';
    return header;
}

/**
 * Save the project to the current user device -> web interface behavior
 * @returns {Promise}
 */
function saveWebProjectToComputer(downloadingProject = false, saveForLTI = false) {
    return new Promise(async (resolve, reject) => {
        let separateFiles;
        if (saveForLTI) {
            separateFiles = true;
        } else {
            separateFiles = document.getElementById('save-Project-separate-files').checked;
        }

        var element = document.createElement('a');

        let name = "";
        let description = "";
        if (UserManager.getUser() !== null && downloadingProject) {
            name = document.getElementById('save-name').value;
            description = document.getElementById('save-description').value;
        } else {
            name = $('#project-name').text();
            description = projectManager.getCurrentProject().description;
        }
        if (name == "no name" || name == null) {
            name = 'main';
        }

        // prepare code for download
        let aceCode = projectManager.getCodeFromWebInterface();
        const cssCode = splitCodeStyle(aceCode.html);
        let htmlCode = aceCode.html.replace(/(<style>[\s\S]*<\/style>)/, '').replace(/(<script>[\s\S]*<\/script>)/, '');
        const webSiteTitle = aceCode.html.match(/<title>([\s\S]*)<\/title>/) ? aceCode.html.match(/<title>([\s\S]*)<\/title>/)[1] : undefined;

        htmlCode = htmlCode.replace(/<!DOCTYPE html>/, '');

        if (separateFiles) {
            const htmlStart = htmlCode.match(/([\s\S]*?<\/head>)/)[1].replace('</head>', '');
            const htmlEnd = htmlCode.match(/(<\/head>[\s\S]*)/)[1];
            htmlCode = `${htmlStart}
            <link rel="stylesheet" href="style.css">
            <script src="script.js"></script>
            ${htmlEnd}`;

            if (downloadingProject) {
                const header = generateWebFileHeader(name, description);
                htmlCode = header + html_beautify(htmlCode);
            }

            var zip = new JSZip();
            zip.file("index.html", htmlCode);
            zip.file("style.css", html_beautify(cssCode));
            zip.file("script.js", aceCode.js);

            try {
                const zippedData = await zip.generateAsync({ type: "blob" });
                if (saveForLTI) {
                    const reader = new FileReader();
                    reader.readAsDataURL(zippedData);
                    reader.onloadend = function () {
                        resolve(reader.result);
                    }
                    return;
                }
                element.href = URL.createObjectURL(zippedData);
                element.download = "web_project" + ".zip";
                element.click();
                resolve(URL.createObjectURL(zippedData));
            } catch (error) {
                reject(error);
            }
        } else {

            if (downloadingProject) {
                const header = generateWebFileHeader(name, description);
                htmlCode = header + html_beautify(htmlCode);
            }

            var d = new Date();
            const date = ["_", d.getFullYear(), d.getMonth(), d.getDate(), "_", d.getHours(), d.getMinutes(), d.getSeconds()];
            for (i in date) {
                name += date[i].toString();
            }
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(htmlCode));
            element.setAttribute('download', name + '.html');
            element.click();

            document.body.appendChild(element);
            document.body.removeChild(element);
            resolve();
        }
    });
};

/**
 * Download script of code ide.
 */
function downloadScript(downloadingProject = true) {
    switch (INTERFACE_NAME) {
        case 'adacraft':
            adacraft.saveProjectToComputer(downloadingProject);
            break;

        case 'web':
            saveWebProjectToComputer(downloadingProject);
            break;

        default:
            saveDefaultProjectToComputer(downloadingProject);
            break;
    }
};

function monitorWindowTransition(id, dir, duration_s = 0.2) {
    const panelDiv = document.querySelector(id);
    $(id).css('transition', dir + ' ' + duration_s + 's ease');
    const transitionEndCallback = () => {
        $(id).css('transition', '');
        panelDiv.removeEventListener('transitionEnd', transitionEndCallback, false);
    }
    panelDiv.addEventListener('transitionend', transitionEndCallback, false);
};

function toggleToolbox() {
    if ($("#simulator").is(":visible") || $("#simulator-wires").is(":visible")) {
        if (document.getElementById("toolbox-toggler").children[0].classList.contains('fa-chevron-left')) {
            //close the toolbox
            $('#generator').animate({
                width: $(window).width() - 500,
            }, '500', function () {
                document.querySelectorAll('.fa-chevron-left').forEach(function (chevron) {
                    chevron.classList.replace('fa-chevron-left', 'fa-chevron-right');
                });
                document.getElementById("toolbox-toggler").children[0].classList.replace('chevron-gauche', 'chevron-droit');
                document.getElementById("toolbox-toggler").children[1].classList.replace('chevron-droit', 'chevron-gauche');
                $('.injectionDiv').css('overflow', 'hidden');
            });
        } else {
            //open the toolbox
            $('#generator').animate({
                width: $(window).width() - $('.blocklyToolboxDiv').width() - 500,
            }, '500', function () {
                document.querySelectorAll('.fa-chevron-right').forEach(function (chevron) {
                    chevron.classList.replace('fa-chevron-right', 'fa-chevron-left');
                });
                document.getElementById("toolbox-toggler").children[0].classList.replace('chevron-droit', 'chevron-gauche');
                document.getElementById("toolbox-toggler").children[1].classList.replace('chevron-gauche', 'chevron-droit');
                $('.injectionDiv').css('overflow', 'visible');
            });
        }
    } else {
        if (document.getElementById("toolbox-toggler").children[0].classList.contains('fa-chevron-left')) {
            $('#generator').animate({
                width: '100%',
            }, '500', function () {
                document.querySelectorAll('.fa-chevron-left').forEach(function (chevron) {
                    chevron.classList.replace('fa-chevron-left', 'fa-chevron-right');
                });
                document.getElementById("toolbox-toggler").children[0].classList.replace('chevron-gauche', 'chevron-droit');
                document.getElementById("toolbox-toggler").children[1].classList.replace('chevron-droit', 'chevron-gauche');
                $('.injectionDiv').css('overflow', 'hidden');
            });
        } else {
            $('#generator').animate({
                width: $(window).width() - $('.blocklyToolboxDiv').width(),
            }, '500', function () {
                document.querySelectorAll('.fa-chevron-right').forEach(function (chevron) {
                    chevron.classList.replace('fa-chevron-right', 'fa-chevron-left');
                });
                document.getElementById("toolbox-toggler").children[0].classList.replace('chevron-droit', 'chevron-gauche');
                document.getElementById("toolbox-toggler").children[1].classList.replace('chevron-gauche', 'chevron-droit');
                $('.injectionDiv').css('overflow', 'visible');
            });
        }
    }
}

/* Function action on ide */

function undoAction() {
    //still having a huge bug here
    //this is mainly problem with chained blocks and actions
    if (Main.getCodingMode() == "mixed" || Main.getCodingMode() == "block") {
        Main.undo(false);
        if (INTERFACE_NAME != 'python')
            if (Main.getAllBlocks().length < 2)
                Main.undo(true);
    } else {
        Main.undoCodeMode(true);
    }
}

function redoAction() {
    if (Main.getCodingMode() == "mixed" || Main.getCodingMode() == "block") {
        Main.undo(true);
        if (INTERFACE_NAME != 'python')
            if (Main.getAllBlocks().length < 2)
                Main.undo(false);
    } else {
        Main.undoCodeMode(false);
    }
}

/* Functions for switching mode */

function switchBlockMode(animation = true) {
    if (typeof projectManager !== 'undefined' && projectManager) projectManager.multiSwitchBlockMode();
    const previousToolbox = Blockly.Constants.getToolboxStyle();
    const previousCodeMode = Main.getCodeMode();

    UIManager.disableSwitchingButtons();
    Main.switchCodingMode(MODE_BLOCKS);
    if (Main.getInterface() == 'TI-83' && previousToolbox === TOOLBOX_STYLE_TI_CODE && previousCodeMode === MODE_CODE) {
        Main.setToolboxManager(TOOLBOX_STYLE_TI);
    }
    if (Main.hasDragAndDrop()) {
        dragAndDrop.disable();
    }
    $('.ace_content').css("background-color", 'var(--bg-1)')
    $('#toolbox-tool').css("display", 'none')
    $('.blocklyScrollbarVertical.blocklyMainWorkspaceScrollbar').css("display", 'block');
    $('.blocklyScrollbarHorizontal.blocklyMainWorkspaceScrollbar').css("display", 'block');

    if (!animation) {
        $('#generator').width('1px');
        $(".ide-block").width('100%');
        $("#codeModeButtons, .python_button_sm").hide();
        $("#blocks_button_panel, .blocks_button_sm").show();

        UIManager.enableSwitchingButtons(Main.getCodingMode());
        UIManager.updateCssSwitchingButtons(Main.getCodingMode());
        Main.setOptionForEditor("readOnly", true);
        Main.resizeWorkSpace();
        Main.resizeAceEditor();
    } else {
        $('.ide-block').animate({
            width: '100%',
        });
        $('#generator').animate({
            width: '0%',
        }, {
            step: function () {
                Main.resizeWorkSpace();
                Main.resizeAceEditor();
            },
            complete: function () {
                $(".ide-block").width("100%");
                $(".ide-block").show();

                $("#codeModeButtons, .python_button_sm").hide();
                $("#blocks_button_panel, .blocks_button_sm").show();

                UIManager.enableSwitchingButtons(Main.getCodingMode());
                UIManager.updateCssSwitchingButtons(Main.getCodingMode());
                Main.setOptionForEditor("readOnly", true);
                Main.resizeWorkSpace();
                Main.resizeAceEditor();
            }
        }, 'slow');
    }
    Main.resizeAceEditor();
}

function switchMixedMode(animation = true) {
    if (typeof projectManager !== 'undefined' && projectManager) projectManager.multiSwitchMixedMode();
    const previousToolbox = Blockly.Constants.getToolboxStyle();
    const previousCodeMode = Main.getCodeMode();

    if (Main.getCodingMode() === MODE_CODE_ONLY) switchCodeOnlyStyle(false);

    $('.ace_content').css("background-color", 'var(--bg-1)');
    $('#toolbox-tool').css("display", 'none');
    $('.blocklyScrollbarVertical.blocklyMainWorkspaceScrollbar').css("display", 'block');
    $('.blocklyScrollbarHorizontal.blocklyMainWorkspaceScrollbar').css("display", 'block');

    UIManager.disableSwitchingButtons();
    Main.switchCodingMode(MODE_MIXED);
    if (INTERFACE_NAME == 'TI-83' && previousToolbox === TOOLBOX_STYLE_TI_CODE && previousCodeMode === MODE_CODE) {
        Main.setToolboxManager(TOOLBOX_STYLE_TI);
    }
    if (Main.hasDragAndDrop()) {
        dragAndDrop.disable();
    }
    if (!animation) {
        $(".ide-block").width('100%');
        $("#generator").width('40%');
        $("#generator").show();
        $(".ide-block").show();
        $(".ide-block").width('100%');
        if (INTERFACE_NAME == 'python' || Main.hasCpp2Blocks() || Main.hasPython2Blocks()) {
            Main.setOptionForEditor("readOnly", false);
        } else {
            Main.setOptionForEditor("readOnly", true);
        }
        UIManager.enableSwitchingButtons(Main.getCodingMode());
        UIManager.updateCssSwitchingButtons(Main.getCodingMode());
        Main.resizeWorkSpace();
        Main.resizeAceEditor();
    } else {
        //Animation blocks div
        $("#generator").animate({
            width: '40%',
        }, {
            step: function () {
                Main.resizeWorkSpace();
                Main.resizeAceEditor();
            },
            complete: function () {
                Main.resizeWorkSpace();
                Main.resizeAceEditor();
            }
        }, 'slow');
        //Animation code div
        $('.ide-block').animate({
            width: '100%',
        }, {
            step: function () {
                Main.resizeWorkSpace();
                Main.resizeAceEditor();
            },
            complete: function () {
                $("#generator").show();
                $(".ide-block").show();
                if (INTERFACE_NAME == 'python' || Main.hasCpp2Blocks() || Main.hasPython2Blocks() || !Main.getIsXmlBasedInterface()) {
                    Main.setOptionForEditor("readOnly", false);
                } else {
                    Main.setOptionForEditor("readOnly", true);
                }
                UIManager.enableSwitchingButtons(Main.getCodingMode());
                UIManager.updateCssSwitchingButtons(Main.getCodingMode());
                Main.resizeWorkSpace();
                Main.resizeAceEditor();
            }
        }, 'slow');
    }
    $("#codeModeButtons, .python_button_sm").hide();
    Main.resizeAceEditor();
}

/**
 * Synchronize Project
 */
function syncCode() {
    if (CodeManager.getSharedInstance().codeWasManuallyModified == true) {
        pseudoModal.openModal('modal-warningsync');
        $("#modal-sync-btn-yes").click(function () {
            Main.synchronizeCode();
            pseudoModal.closeLatestModal();
        });
        $("#modal-sync-btn-no").click(function () {
            pseudoModal.closeLatestModal();
        });
    } else {
        $("#hint-sync").show();
        setTimeout(function () {
            $("#hint-sync").hide();
        }, 5000);
    }
};

function switchCodeMode(animation = true) {
    projectManager.multiSwitchCodeMode();
    const previousToolbox = Blockly.Constants.getToolboxStyle();

    $('.ace_content').css("background-color", 'var(--bg-1)')
    $('#toolbox-tool').css("display", 'flex')
    $('#mixed-popup-warning').css("visibility", 'hidden')
    $('.blocklyScrollbarVertical.blocklyMainWorkspaceScrollbar').css("display", 'none');
    $('.blocklyScrollbarHorizontal.blocklyMainWorkspaceScrollbar').css("display", 'none');
    $('#monitor').css('z-index', '800');

    UIManager.disableSwitchingButtons();
    Main.switchCodingMode("code");

    if (Main.getInterface() == "TI-83" && previousToolbox === TOOLBOX_STYLE_TI) {
        Main.setToolboxManager(TOOLBOX_STYLE_TI_CODE);
    }

    $('#generator').find('.ace_keyword').each(function (e, item) {
        if ($(item).html() == "___")
            $(item).css('background-color', 'grey');
    });

    if (!animation) {
        if (Main.hasDragAndDrop()) {
            dragAndDrop.enable();
            $('.ace_gutter-layer').css('cursor', 'unset');
            $("body").append('<span id="ruler"></span>');
            //Fix for mobile phone
            $("#generator").width(dragAndDrop.size());
        } else {
            $(".ide-block").width('0%');
            $("#generator").width('100%');
        }
        Main.setOptionForEditor("readOnly", false);
        UIManager.enableSwitchingButtons(Main.getCodingMode());
        UIManager.updateCssSwitchingButtons(Main.getCodingMode());
        Main.resizeWorkSpace();
        Main.resizeAceEditor();
    } else {
        var generatorSize = 0;
        if (Main.hasDragAndDrop()) {
            dragAndDrop.enable();
            $('.ace_gutter-layer').css('cursor', 'unset');
            $("body").append('<span id="ruler"></span>');
            //Fix for mobile phone
            generatorSize = dragAndDrop.size();
        } else {
            $('.ide-block').animate({
                width: '0%'
            }, 'slow', function () {
                $('ide-block').hide();
            });
            generatorSize = '100%';
        }
        $('#generator').animate({
            width: generatorSize
        }, 'slow', function () {
            Main.setOptionForEditor("readOnly", false);
            UIManager.enableSwitchingButtons(Main.getCodingMode());
            UIManager.updateCssSwitchingButtons(Main.getCodingMode());
            Main.resizeWorkSpace();
            Main.resizeAceEditor();
        });
    }
    $("#blocks_button_panel, .blocks_button_sm").hide();
    $("#codeModeButtons, .python_button_sm").show();
    Main.resizeAceEditor();
};

function switchCodeOnlyMode() {
    if (Main.getCodingMode() !== "code") switchCodeMode(false);

    $('.ace_content').css("background-color", 'var(--bg-1)');
    $('#mixed-popup-warning').css("visibility", 'hidden');
    $(".sync-code-span, .sync-code, #addblock-setting, #blocks_button_panel, .blocks_button_sm").hide();
    $("#codeModeButtons, .python_button_sm").show();

    if (INTERFACE_NAME == 'python') {
        if (document.getElementById('mixed-popup-working') != null) {
            document.getElementById('mixed-popup-working').style.visibility = 'hidden';
        }
        if (document.getElementById('mixed-popup-leave-editor') != null) {
            document.getElementById('mixed-popup-leave-editor').style.visibility = 'hidden';
        }
    }

    Main.switchCodingMode(MODE_CODE_ONLY);
    Main.setOptionForEditor("readOnly", false);
    Main.resizeWorkSpace();
    Main.resizeAceEditor();

    switchCodeOnlyStyle();
};

function switchCodeOnlyStyle(flag = true) {
    if (flag) {
        $('#block_mode, #mixed_mode').hide();
        $('#code_mode').removeClass('ide-btn-right');
        $('#code_mode').addClass('ide-btn-alone mode-selected');
        $('#code_mode').css('cursor', 'help');
        $('#code_mode').attr('onclick', 'pseudoModal.openModal("modal-codeOnly-info")');
        $('#codeOnly_mode').css({ 'top': '0', 'cursor': 'not-allowed', 'pointer-events': 'none' });
        $('#codeOnly_mode > i').removeClass('fa-lock-open').addClass('fa-lock');
    } else {
        $('#block_mode, #mixed_mode').show();
        $('#code_mode').removeClass('ide-btn-alone mode-selected').addClass('ide-btn-right');
        $('#code_mode').attr('onclick', 'switchCodeMode()');
        $('#code_mode, #codeOnly_mode').css('cursor', 'pointer');
        $('#codeOnly_mode > i').removeClass('fa-lock').addClass('fa-lock-open');
        $('#codeOnly_mode').css({ 'top': '', 'pointer-events': 'unset' });
    }
};

function fullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    var docElm = document.documentElement;
    if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    $('.ide-base, .ide-editor').height('100%').width('100%');
    if ($('#monitor').height() > 0) {
        $('#monitor').height('100%');
    }

    setTimeout(function () {
        interact('#monitor')
            .resizable({
                modifiers: [
                    interact.modifiers.restrictSize({
                        min: {
                            height: 210,
                            width: $('#ide-content').width() * 0.2
                        },
                        max: {
                            height: $('#ide-content').height() - 25,
                            width: $('#ide-content').width() - 25
                        }
                    })
                ],
            });
    }, 1000);

    Main.resizeAceEditor();
};

/**
 * Rotate console taking account localStorage
 * @param {string} value 
 */
function rotateConsole(value = 'bottom') {
    const storageConsole = getOptionStorage('console', 'bottom', ["bottom", "right"]);
    storageConsole[INTERFACE_NAME] = value;

    if (storageConsole[INTERFACE_NAME] === 'right') {
        $("#monitor-content").addClass('monitor-grid-right');
        $("#monitor-content").removeClass('monitor-grid-bottom');

        $('#monitor-tools').removeClass('monitor-tools-collapsed-bottom');
        $('#toggleConsoleRight').prop('checked', true);

        $('.ide-base').css({
            'flexDirection': 'row',
            'width': '100%'
        });

        $('#monitor').css('height', '100%');

        if ($('#monitor').hasClass('monitor-open')) {
            $('#monitor').css('width', '30%');
            $('.ide-editor').css('width', '70%');
        } else if ($('#monitor').hasClass('monitor-closed')) {
            $('#monitor').css('width', '0');
            $('.ide-editor').css('height', '100%');
        }

        $('#monitor-tools').css({
            'transform': 'rotate(-90deg)',
            'margin': 'auto -20px',
            'top': '0',
            'bottom': '0',
            'left': '-22px'
        });

        $('#monitor-resizer').css({
            'cursor': 'ew-resize'
        });

        $('#monitor-view-group-btn').css({
            'right': '15px',
            'top': '15px'
        });

        $('#monitor-controls').addClass('monitor-controls-right');
        $('#monitor-debugger').addClass('monitor-debugger-right');
        $('#monitor-view').addClass('monitor-view-split-right');
        $('#monitor-view').removeClass('monitor-view-split-bottom');

        if ($('#monitor-view').hasClass('monitor-view-split-bottom-debug')) {
            $('#monitor-view').removeClass('monitor-view-split-bottom-debug');
            $('#monitor-view').addClass('monitor-view-split-right-debug');
        }

        interact('#monitor')
            .resizable({
                edges: {
                    top: false,
                    left: true,
                    bottom: false,
                    right: false
                },
                modifiers: [
                    interact.modifiers.restrictSize({
                        min: {
                            width: $('#ide-content').width() * 0.2
                        },
                        max: {
                            width: ($('#ide-content').width() - 25)
                        }
                    })
                ],
            })
            .on('resizemove', event => {
                if ($('#monitor').width() == '0') {
                    InterfaceMonitor.toggle();;
                }
                if ($("#monitor-content").width() < 500) {
                    $('#monitor-div-btn button span.hide').hide();
                } else {
                    $('#monitor-div-btn button span.hide').show();
                }
                $('#monitor, .ide-editor').height('100%');
                $('#monitor').width(event.rect.width);
                $('.ide-editor').width($('.ide-base').width() - event.rect.width);
                if (!Main.hasDragAndDrop()) {
                    resizeBlocklyToolBox();
                }
                Main.resizeWorkSpace();
                Main.resizeAceEditor();
            });

        // Console in Python
        if (INTERFACE_NAME === 'python') {
            $('#timeout-controls').addClass('timeout-controls-right');
            interact('#monitor-debugger')
                .resizable({
                    edges: {
                        top: true,
                        left: false,
                        bottom: false,
                        right: false
                    },
                    listeners: {
                        move(event) {
                            const target = event.target;
                            target.style.height = event.rect.height + 'px';
                            const monitorContentEltStyle = getComputedStyle(document.querySelector('#monitor-content'));
                            const monitorContentInnerSpace = parseInt(monitorContentEltStyle.height) - parseInt(monitorContentEltStyle.paddingLeft) - parseInt(monitorContentEltStyle.paddingRight);
                            document.querySelector('#monitor-view').style.height = `${monitorContentInnerSpace - event.rect.height}px`;
                        }
                    },
                    modifiers: [
                        interact.modifiers.restrictSize({
                            min: {
                                height: 150
                            },
                            max: {
                                height: (parseInt(getComputedStyle(document.querySelector('#monitor-content')).height) - 10) / 2
                            }
                        })
                    ],
                    inertia: false
                });
        }
    } else {
        $("#monitor-content").removeClass('monitor-grid-right');
        $("#monitor-content").addClass('monitor-grid-bottom');

        $('#monitor-tools').removeClass('monitor-tools-collapsed-right');
        $('#timeout-controls').removeClass('timeout-controls-right');

        $('.ide-base').css({
            'flexDirection': 'column',
            'width': '100%'
        });

        $('#monitor-view-group-btn').css({
            'top': '',
            'right': '',
            'bottom': ''
        });

        $('#monitor').removeAttr('style');

        if ($('#monitor').hasClass('monitor-closed')) {
            $('#monitor').css('height', '0');
        }

        $('#monitor-tools').removeAttr('style');
        $('#monitor-resizer').removeAttr('style');
        $('#monitor-view').removeAttr('style');

        $('#monitor-controls').removeClass('monitor-controls-right');
        $('#monitor-debugger').removeClass('monitor-debugger-right');
        $('#monitor-view').removeClass('monitor-view-split-right');

        if ($('#monitor-view').hasClass('monitor-view-split-right-debug')) {
            $('#monitor-view').removeClass('monitor-view-split-right-debug');
            $('#monitor-view').addClass('monitor-view-split-bottom-debug');
        }

        interact('#monitor')
            .resizable({
                edges: {
                    top: true,
                    left: false,
                    bottom: false,
                    right: false
                },
                modifiers: [
                    interact.modifiers.restrictSize({
                        min: {
                            height: 200
                        },
                        max: {
                            height: $('#ide-content').height() - 25
                        }
                    })
                ],
                inertia: false
            })
            .on('resizemove', event => {
                if ($('#monitor').height() == '0') {
                    InterfaceMonitor.toggle();;
                }
                $('#monitor, .ide-editor').width('100%');
                $('#monitor').height(event.rect.height);
                $('.ide-editor').height($('.ide-base').height() - event.rect.height);
                if (!Main.hasDragAndDrop()) {
                    resizeBlocklyToolBox();
                }
                Main.resizeWorkSpace();
                Main.resizeAceEditor();
                InterfaceMonitor.heightMemory = $('#monitor').height();
            });

        if (INTERFACE_NAME === 'python') {
            interact('#monitor-debugger')
                .resizable({
                    edges: {
                        top: false,
                        left: true,
                        bottom: false,
                        right: false
                    },
                    listeners: {
                        move(event) {
                            let target = event.target;
                            target.style.width = event.rect.width + 'px';
                            const monitorContentEltStyle = getComputedStyle(document.querySelector('#monitor-content'));
                            const monitorContentInnerSpace = parseInt(monitorContentEltStyle.width) - parseInt(monitorContentEltStyle.paddingLeft) - parseInt(monitorContentEltStyle.paddingRight);
                            document.querySelector('#monitor-view').style.width = `${monitorContentInnerSpace - event.rect.width}px`;
                        }
                    },
                    modifiers: [
                        interact.modifiers.restrictSize({
                            min: {
                                width: 150
                            },
                            max: {
                                width: (parseInt(getComputedStyle(document.querySelector('#monitor-content')).width) - 10) / 2
                            }
                        })
                    ],
                    inertia: false
                });
        }
    }
    $('.ide-editor').css({
        'width': '100%',
        'height': '100%'
    });
    if ($('#monitor-content').width() > 500) {
        $('#monitor-div-btn button span.hide').show();
    } else {
        $('#monitor-div-btn button span.hide').hide();
    }
    updateUrlAndStorage('console', storageConsole);
    Main.resizeWorkSpace();
    Main.resizeAceEditor();
    resizeBlocklyToolBox();
    if (typeof projectManager !== 'undefined' && projectManager) {
        projectManager._refreshProjectStatus()
    }
};

function getOptionStorage(option, default_value, contexts) {
    let storage = {};
    if (localStorage[option]) {
        storage = JSON.parse(localStorage[option]);
    }
    /* We get the parameters from the url */
    const url_value = $_GET(option);

    if (url_value !== null && url_value !== undefined) {
        if (contexts.includes(url_value)) {
            storage[INTERFACE_NAME] = url_value;
        }
    }
    // Keep default value from localStorage
    if (!storage[INTERFACE_NAME]) {
        /* Set default value in storage */
        storage[INTERFACE_NAME] = default_value;
    }
    return storage;
};

/**
 * Update toolbox and interface account localStorage
 * @param {String} toolboxMode
 */
async function updateToolbox(toolboxMode) {
    if (Main.hasToolboxModes()) {
        let types = [TOOLBOX_STYLE_SCRATCH, TOOLBOX_STYLE_VITTA];
        if (INTERFACE_NAME === "TI-83") {
            types.push(TOOLBOX_STYLE_TI);
        }
        const storageToolbox = getOptionStorage('toolbox', TOOLBOX_STYLE_DEFAULT, types);
        const storageProject = CodeManager.getSharedInstance().localStorageManager.getLocalProjectContent();
        if ((typeof TOOLBOX_STYLE_SCRATCH != 'undefined' && toolboxMode == TOOLBOX_STYLE_SCRATCH)
            || (typeof TOOLBOX_STYLE_TI != 'undefined' && toolboxMode == TOOLBOX_STYLE_TI && INTERFACE_NAME === "TI-83")) {
            storageToolbox[INTERFACE_NAME] = toolboxMode;
            storageProject.code = replaceXmlCode(TOOLBOX_STYLE_SCRATCH);
        } else {
            storageToolbox[INTERFACE_NAME] = TOOLBOX_STYLE_VITTA;
            storageProject.code = replaceXmlCode(TOOLBOX_STYLE_VITTA);
        }
        CodeManager.getSharedInstance().setXml(storageProject.code);
        CodeManager.getSharedInstance().loadBlocks();
        updateUrlAndStorage('toolbox', storageToolbox);
        CodeManager.getSharedInstance().localStorageManager.setLocalProject(storageProject);
        // Custom behavior in LTI context
        if (typeof ltiVariables13 !== 'undefined') {
            const currentToolboxParameter = `&toolbox=${toolboxMode}`;
            let refreshUrl = `${location.origin}${location.pathname}?`;
            if (ltiVariables13.isDeepLink) {
                refreshUrl += `${ltiVariables13.currentQueryString}`;
            } else {
                refreshUrl += `launch_id=${ltiVariables13.launchId}`;
            }
            refreshUrl += `${currentToolboxParameter}${lti13Controller.getSessionParameter()}`;
            await lti13Controller.saveCurrentResource();
            lti13Controller._redirectWithPostMethod(refreshUrl);
        } else {
            if (Main.getInterface() == "TI-83" && toolboxMode == TOOLBOX_STYLE_TI && Main.getCodeMode() == MODE_CODE) {
                toolboxMode = TOOLBOX_STYLE_TI_CODE;
            }
            Main.setToolboxManager(toolboxMode);
        }
        if (typeof projectManager !== 'undefined' && projectManager) {
            projectManager._refreshProjectStatus();
        }
        updateToolboxSwitcherValue();
    }
};

function updateToolboxSwitcherValue() {
    const toolboxMode = Blockly.Constants.getToolboxStyle();
    if (typeof TOOLBOX_STYLE_VITTA !== 'undefined' && toolboxMode == TOOLBOX_STYLE_VITTA) {
        $('#toolboxModeVittascience').prop('checked', true);
    } else if (typeof TOOLBOX_STYLE_SCRATCH != 'undefined' && toolboxMode == TOOLBOX_STYLE_SCRATCH) {
        $('#toolboxModeScratch').prop('checked', true);
    } else if (INTERFACE_NAME === 'TI-83' && [TOOLBOX_STYLE_TI, TOOLBOX_STYLE_TI_CODE].includes(toolboxMode)) {
        $('#toolboxModeTexasInstruments').prop('checked', true);
    }
};

/**
 * @param event Is this function is trigger by an event
 * @param boardSelector
 * Update board and interface account localStorage
 */
async function updateBoard(event = false, boardSelector = BOARD_DEFAULT) {
    let storageBoard;
    /* We get the parameters from the url */
    const urlBoard = $_GET('board');
    if (urlBoard !== null && urlBoard !== undefined) {
        storageBoard = {
            [INTERFACE_NAME]: urlBoard
        };
    } else {
        /* Set default value localStorage as vittascience mode */
        storageBoard = {
            [INTERFACE_NAME]: BOARD_DEFAULT
        };
        updateUrlAndStorage('board', storageBoard);
    }

    if (typeof projectManager !== 'undefined' && projectManager) {
        SimulatorLS.set('board', storageBoard[INTERFACE_NAME]);
    }

    /* Call with an event (buttons) */
    if (event) {
        if (storageBoard[INTERFACE_NAME] != boardSelector) {
            if (typeof SIMULATOR_BOARDS !== 'undefined' && Object.keys(SIMULATOR_BOARDS).filter((e) => e !== BOARD_DEFAULT).includes(boardSelector)) {
                storageBoard[INTERFACE_NAME] = boardSelector;
            } else {
                storageBoard[INTERFACE_NAME] = BOARD_DEFAULT;
            }
            updateUrlAndStorage('board', storageBoard);
            if (typeof ltiVariables13 !== 'undefined') {
                const currentBoardParameter = `&board=${storageBoard[INTERFACE_NAME]}`;
                let refreshUrl;
                if (ltiVariables13.isDeepLink) {
                    refreshUrl = `${location.origin}${location.pathname}?${ltiVariables13.currentQueryString}${currentBoardParameter}`;
                } else {
                    refreshUrl = `${location.origin}${location.pathname}?launch_id=${ltiVariables13.launchId}${currentBoardParameter}`;
                }
                await lti13Controller.saveCurrentResource();
                window.location = refreshUrl;
            } else if (projectManager && projectManager._capytaleManager) {
                const reloadUrl = `${location.origin}${location.pathname}?board=${storageBoard[INTERFACE_NAME]}`;
                projectManager._capytaleManager.reload(reloadUrl, {board: storageBoard, project: projectManager.getCurrentProjectDataForAppAgent()});
            } else {
                window.location = window.location.href;
            }
        }
    } else {
        if (typeof SIMULATOR_BOARDS !== 'undefined' && !Object.keys(SIMULATOR_BOARDS).filter((e) => e !== BOARD_DEFAULT).includes(urlBoard)) {
            storageBoard[INTERFACE_NAME] = BOARD_DEFAULT;
        }
        updateUrlAndStorage('board', storageBoard);
    }

    if (!Main.hasBoardSelector()) {
        history.pushState({}, '', removeParam("board", window.location.href))
    }
};

function setConsoleOnlyMode() {
    if (Main.hasSimulator() && Simulator.isOpen) {
        Simulator.closingSimulator();
    }

    $('.ide-navbar').hide();
    $('.ide-editor').hide();
    $('#monitor').addClass('monitor-console-only')

    if (INTERFACE_NAME === "python") {
        vittapytherButton.runEvalPython();
    }

    interact('#monitor').unset();
};

function toggleSimuOnly() {
    toggleSimulator();
    $('.ide-navbar').hide();
    $('.ide-base').css({
        'height': '0', 'min-height': '0',
        'width': '0', 'min-width': '0'
    }).hide();
    $('.ide-simulator').css({
        'height': '100%', 'min-height': '100%',
        'width': '100%', 'min-width': '100%'
    });
}

async function toggleSimulator() {
    await waitFor(_ => VittaInterface !== null && VittaInterface.initialized);
    if (typeof projectManager !== 'undefined' && projectManager) projectManager.multiToggleSimulator();
    UIManager.disableSwitchingButtons();
    if (Simulator.isOpen) {
        InterfaceMonitor.writeConsole(jsonPath('code.simulator.messages.stop'), 'neutral');
        Simulator.closingSimulator();
        if (typeof sendSerialCommand !== 'undefined') {
            $("#serial-send").click(() => { sendSerialCommand(); });
        } else if (typeof InterfaceConnection !== 'undefined') {
            $("#serial-send").click(() => { InterfaceConnection.sendSerialCommand(); });
        }
        $('.ide-base').css('max-width', '100%');
        let ideBaseWidth = '100%';
        const multiIframeElt = document.querySelector('#multi-iframe-wrapper');
        if (multiIframeElt) {
            const multiIframeWidth = parseInt(getComputedStyle(multiIframeElt).width),
                ideContentWidth = parseInt(getComputedStyle(document.querySelector('#ide-content')).width);
            ideBaseWidth = `${ideContentWidth - multiIframeWidth}px`;
        }
        $('.ide-base').animate({
            width: ideBaseWidth
        });
        if (Main.getCodingMode() == 'code' && Main.hasDragAndDrop()) {
            if (document.getElementById("toolbox-toggler").children[0].classList.contains('fa-chevron-left')) {
                $('#generator').animate({
                    width: dragAndDrop.size()
                }, 'fast');
            } else {
                $('#generator').width($(window).width());
            }
        }
        if ($_GET('console') === "right") {
            $('.ide-editor').animate({
                width: $('#ide-content').width() - $('#monitor').width()
            }, {
                step: function () {
                    Main.resizeWorkSpace();
                }
            }, 'fast');
        }
        $("#run_simulator").removeClass("mode-selected");
        $('.ide-simulator').animate({ width: '0px' },
            {
                complete: function () {
                    $('.ide-simulator').hide();
                    Main.resizeWorkSpace();
                    Main.resizeAceEditor();
                    resizeBlocklyToolBox();
                }
            });
        history.pushState({}, '', removeParam("simu", window.location.href))
        history.pushState({}, '', removeParam("simulator", window.location.href))
        history.pushState({}, '', removeParam("simulateur", window.location.href))
        Simulator.isOpen = false;

        document.dispatchEvent(new CustomEvent("simulator-close"));
    } else {
        if (typeof WEB_BLE !== 'undefined' && WEB_BLE.currentDevice !== null) {
            await WEB_BLE.unpair();
        }
        if (typeof Simulator !== 'undefined') {
            Simulator.updateSimulator();
            if (typeof Simulator.getSerialInput !== 'undefined') {
                $("#serial-send").click(() => { Simulator.getSerialInput(); });
            }
        }
        if (typeof SerialAPI !== 'undefined' && SerialAPI !== null && SerialAPI.isConnected) {
            await doDisconnect();
            await new Promise(resolve => setTimeout(resolve, 500));
        } else if (typeof InterfaceConnection !== 'undefined') {
            await InterfaceConnection.doDisconnect();
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        $('.ide-base').animate({
            width: $('#ide-content').width() - 500
        });

        if (Main.getCodingMode() == 'code' && Main.hasDragAndDrop()) {
            if (document.getElementById("toolbox-toggler").children[0].classList.contains('fa-chevron-left')) {
                $('#generator').animate({
                    width: dragAndDrop.size() - 500
                });
            } else {
                $('#generator').animate({
                    width: $(window).width() - 500
                });
            }
        }

        InterfaceMonitor.writeConsole(jsonPath('code.simulator.messages.start'), 'neutral');
        $("#run_simulator").addClass("mode-selected");
        let ideSimulatorWidth = '100%';
        const multiIframeElt = document.querySelector('#multi-iframe-wrapper');
        if (multiIframeElt) {
            const multiIframeWidth = parseInt(getComputedStyle(multiIframeElt).width),
                ideBaseWidth = parseInt(getComputedStyle(document.querySelector('.ide-base')).width),
                ideContentWidth = parseInt(getComputedStyle(document.querySelector('#ide-content')).width);
            const newIdeBaseWidth = parseInt(ideBaseWidth/2);
            ideSimulatorWidth = `${ideContentWidth - newIdeBaseWidth - multiIframeWidth}px`;
            
            $('.ide-base').animate({
                width: newIdeBaseWidth
            }, {}, 'slow');
        }
        $('.ide-simulator').animate({
            width: ideSimulatorWidth
        }, {
            step: function () {
                Main.resizeWorkSpace();
            },
            complete: function () {
                Simulator.openingSimulator();
                $('.ide-simulator').show();
                Main.resizeWorkSpace();
                Main.resizeAceEditor()
                resizeBlocklyToolBox();
            }
        }, 'slow');

        let state = {};
        let title = '';
        history.pushState(state, title, replaceParam('simu', '1'));
        Simulator.isOpen = true;

        document.dispatchEvent(new CustomEvent("simulator-open"));
    }
    UIManager.enableSwitchingButtons(Main.getCodingMode());
    UIManager.updateCssSwitchingButtons(Main.getCodingMode());
};

function switchWiringMode() {
    if (!Simulator.isOpen) {
        toggleSimulator();
    }
    if (!Simulator.isInWiringMode) {
        $("#simulator").hide();
        const mosaic = Simulator.getMosaicModules();
        for (let i = 0; i < mosaic.length; i++) {
            $(mosaic[i]).hide();
        }
        $("#wiring-modules").html(mosaic);
        $("#simulator-wires").show();
        $("#wiring-buttons-control").append($(".control-run-btn")[0].childNodes);
        $("#wiring-buttons-fullscreen").append($("#simulator_fullscreen").prop("outerHTML"));
        $("#wiring-message-container").append($("#message-container")[0].childNodes);
        Simulator.isInWiringMode = true;
    }
    document.querySelector("#mosaic-mode").focus();
};

function switchMosaicMode() {
    if (!Simulator.isOpen) {
        toggleSimulator();
    }
    if (Simulator.isInWiringMode) {
        WiringSimulator.closeModule();
        const mosaic = Simulator.getMosaicModules();
        for (let i = 0; i < mosaic.length; i++) {
            $(mosaic[i]).show();
        }
        $("#simulator-modules").html(mosaic);
        $("#simulator-wires").hide();
        $("#simulator").show();
        $(".control-run-btn").append($("#wiring-buttons-control")[0].childNodes);
        $("#message-container").append($("#wiring-message-container")[0].childNodes);
        $("#wiring-buttons-control").html("");
        $("#wiring-buttons-fullscreen").html("");
        $("#wiring-message-container").html("");
        UIManager.resetMessage("warning-message");
        Simulator.isInWiringMode = false;
    }
    document.querySelector("#wiring-mode").focus();
};

/**
 * Update url parameter and local storage
 * @param parameter url parameter
 * @param storage json storage
 */
function updateUrlAndStorage(parameter, storage) {
    const state = {};
    const title = '';
    history.pushState(state, title, replaceParam(parameter, storage[INTERFACE_NAME]));
    /*
    ! Warning: Options management has changed. Please, regard projectManager._projectLoader_updateSwitchingOptions(finderLoading)
    
    if (typeof projectManager !== 'undefined' && projectManager && projectManager._currentProject.options) {
        projectManager._currentProject.options[parameter] = storage[INTERFACE_NAME];
    }
    */
    localStorage.setItem(parameter, JSON.stringify(storage));
};

async function openExerciseModal() {
    // If we are in LTI 1.3 context, we automatically save the project
    if (typeof ltiVariables13 != 'undefined' && projectManager._currentProject.link == null) {
        await lti13Controller.saveCurrentProjectForExercise();
    } else if (typeof ltiVariables13 != 'undefined' && projectManager.needSaving()) {
        await lti13Controller._updateCurrentProject();
    }
    pseudoModal.openModal('modal-warningexercise');
    pseudoModal.newBlocker('modals.simulator.auto-corrector.check_user_wait_message', 'modal-warningexercise', '1rem');
    if (typeof UserManager == 'undefined' || !UserManager.isLoadedUser()) {
        setTimeout(() => {
            openExerciseModal();
        }, 1000);
        return;
    }
    pseudoModal.endBlocker('modal-warningexercise')
    pseudoModal.closeAllModal();
    if (UserManager.getUser() == null) {
        pseudoModal.openModal('modal-warningexercise');
    } else if (typeof projectManager._currentProject.id == 'undefined') {
        pseudoModal.openModal("modal-auto-corrector-no-project-opened");
    } else if (projectManager.needSaving()) {
        if (typeof AutoCorrector !== 'undefined') {
            AutoCorrector.exerciseCreationRequest = true;
        }
        pseudoModal.openModal('modal-warningexercisesave');
    } else {
        AutoCorrector.openExerciseCreator();
    }
};

/**
 * Check if the user is currently logged in and if the current project is existing in database and up to date and finally open the exercise modal
 */
async function createExercise() {
    // If we are in LTI 1.3 context, we automatically save the project
    if (typeof ltiVariables13 != 'undefined' && projectManager._currentProject.link == null) {
        await lti13Controller.saveCurrentProjectForExercise();
        pseudoModal.openModal('modal-exercise-statements');
        return;
    }
    if (typeof ltiVariables13 != 'undefined' && projectManager.needSaving()) {
        await lti13Controller._updateCurrentProject();
        pseudoModal.openModal('modal-exercise-statements');
        return;
    }

    document.querySelector('.ide-btn-group-settings').classList.add('hidden');
    const isProjectOwner = projectManager.getIsCurrentProjectOwner();
    if (UserManager.getUser() == null) {
        pseudoModal.openModal('modal-warningexercise');
        return;
    }
    if (projectManager._currentProject.link == null) {
        if (typeof AutoCorrector !== 'undefined') {
            AutoCorrector.exerciseCreationRequest = true;
        }
        pseudoModal.openModal('modal-warningexercisesave');
        return;
    }
    if (!isProjectOwner) {
        pseudoModal.openModal('modal-warningexerciseother');
        return;
    }
    pseudoModal.openModal('modal-exercise-statements');
}

/**
 * Get the statement from the submitted form and save it in the database via the projectManager.exercises_setStatement method and finally update the exercise statement
 * @param {event} e - The current event that triggered the function
 */
async function saveExerciseStatement(e) {
    e.preventDefault();
    // Disable the submit button
    if (typeof e.submitter !== 'undefined') {
        e.submitter.setAttribute('disabled', '');
        e.submitter.style.cursor = 'not-allowed';
    }
    const formData = new FormData(e.target);
    let statementInput = formData.get('exercise-statement-input');
    let emitterModalId;
    // Getting the id of the currently opened modal (the one that contain the submitter button)
    for (let modal of document.querySelectorAll('.vitta-modal')) {
        if (getComputedStyle(modal).display == 'flex') {
            emitterModalId = modal.id;
        }
    }
    // Open the exercise statements modal (and close all currently opened modals)
    pseudoModal.openModal('modal-exercise-statements');
    const notification = {
        div: '#modal-exercise-statements',
        message: 'Enoncé modifié !',
        type: 'bg-success'
    };
    // If the emitter modal is the removal confirm modal, prepare for statement removal
    let canBeRemoved = false;
    if (emitterModalId === 'exercise-statement-removal-confirm') {
        canBeRemoved = true;
        statementInput = '';
        notification.message = 'Enoncé supprimé !';
    }
    // Loading the vittaNotif (Singleton)
    Main.vittaNotif = new VittaNotif();
    // Update the statement
    const response = await projectManager.exercises_setStatement(statementInput);
    try {
        if (response.success) {
            // If the request is OK and response contains success, show the relevant notification and update the front statement
            if (canBeRemoved) {
                document.querySelector('#exercise-statement-input').value = '';
            }
            Main.vittaNotif.displayNotification(notification.div, notification.message, notification.type);
            projectManager._exerciseStatement.setStatementContent(statementInput);
            projectManager._exerciseStatement.displayStatement();
        } else if (response.errors) {
            // If the request is OK and response contains errors, show the relevant notification(s)
            for (let error of response.errors) {
                const errorType = typeof error.errorType !== 'undefined' ? error.errorType : error;
                let errorMessage = errorType;
                const errorTranslationPath = `notifications.${errorMessage}`;
                if (errorTranslationPath !== i18next.t(errorTranslationPath)) {
                    errorMessage = i18next.t(errorTranslationPath);
                }
                Main.vittaNotif.displayNotification(notification.div, errorMessage, 'bg-danger');
                console.error(error);
            }
        } else {
            // If the request has failed, display the relevant notification
            Main.vittaNotif.displayNotification(notification.div, 'Something went wrong when saving exercise statement', 'bg-danger');
            console.error('Something went wrong when saving exercise statement');
        }
        // Enable the submit button
        if (typeof e.submitter !== 'undefined') {
            e.submitter.removeAttribute('disabled');
            e.submitter.style.cursor = 'pointer';
        }
    } catch (error) {
        // If there is any error caught in the Promise, display a notification of the error
        Main.vittaNotif.displayNotification(notification.div, String(error), 'bg-danger');
        console.error(error);
        // Enable the submit button
        if (typeof e.submitter !== 'undefined') {
            e.submitter.removeAttribute('disabled');
            e.submitter.style.cursor = 'pointer';
        }
    }
}

function activateCodeOnly() {
    pseudoModal.closeModal('modal-codeOnly');
    switchCodeOnlyMode();
}

// =================== WEB INTERFACE SECTION ================

function togglePreview(open = false) {
    function toggleShowPreview() {
        //We open the simulator
        $("#show_preview").addClass("mode-selected");
        //$("#executeRight").show();
        $("#executeRight").removeClass("d-none");
        $('#executeRight').css("width", '100%');
        $('#ideLeft').css("width", $('#ide-content').width() - 50);
        projectManager.webBlocklyResize();
        if (getParamValue("preview") != null) {
            history.pushState({}, '', removeParam("preview", window.location.href));
        }
        history.pushState({}, '', window.location.href + "&preview=true");
    }
    function toggleHidePreview() {
        //We close the simulator
        $("#show_preview").removeClass("mode-selected");
        $('#executeRight').css('width', '0px');
        //$("#executeRight").hide();
        $("#executeRight").addClass("d-none");
        $('#ideLeft').css("width", '100%');
        projectManager.webBlocklyResize();
        history.pushState({}, '', removeParam("preview", window.location.href));
    }
    if (open == true) {
        toggleShowPreview();
        return;
    }
    const isVisible = $("#executeRight").is(":visible");
    if (isVisible) {
        toggleHidePreview();
    } else {
        toggleShowPreview();
    }
}

$("#executeCode").on("click", function () {
    let code = projectManager.getCodeFromWebInterface();
    projectManager.executeCode(code)
    togglePreview(true);
});

$("#show_preview").on("click", function () {
    togglePreview();
});

$("#resfresh-preview-btn").on("click", function () {
    projectManager.refreshWebPreview();
});

$("#fullscreen-preview-btn").on("click", function () {
    projectManager.showPreviewOnly();
});

// ============== WEB INTERFACE SECTION  END ================