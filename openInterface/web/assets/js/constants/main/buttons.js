const cardCommunicationButtons = {
    'execute': {
        id: "executeCode",
        classes: 'ide-btn ide-btn-alone',
        fontAwesome: 'fas fa-eye',
        title: 'code.topbar.tooltips.viewPageTitle',
        label: {
            hidden: true,
            value: "code.topbar.label.view"
        }
    }
};

const settingsOptions = {
    'accessibility': {
        id: "blockly-setting",
        classes: 'ide-btn-blockly-themes',
        fontAwesome: 'fas fa-low-vision',
        title: 'code.topbar.tooltips.accessibility',
        tooltipPlacement: "left",
        onclick: "openSettings()",
        label: {
            value: "code.topbar.label.themes"
        }
    },
    'i18n': {
        id: "i18n-setting",
        classes: '',
        fontAwesome: 'fas fa-globe',
        title: 'code.topbar.tooltips.i18n',
        tooltipPlacement: "left",
        onclick: "pseudoModal.openModal('modal-i18n')",
        label: {
            value: "code.topbar.label.i18n"
        }
    },
    // 'monitor': {
    //     id: "monitor-setting",
    //     classes: 'ide-btn-blockly-themes',
    //     fontAwesome: 'fas fa-cog',
    //     title: 'code.topbar.tooltips.consoleSettings',
    //     tooltipPlacement: "left",
    //     onclick: "pseudoModal.openModal('modal-settings')",
    //     label: {
    //         value: "code.topbar.label.console"
    //     }
    // },
    // 'create-exercise-auto-corrector': {
    //     id: 'create-exercise-auto-corrector',
    //     classes: ' ide-btn-exercise',
    //     fontAwesome: 'fas fa-tasks',
    //     title: 'code.topbar.tooltips.exerciseSettings',
    //     tooltipPlacement: "left",
    //     onclick: "createExercise()",
    //     label: {
    //         value: "code.topbar.label.exercise"
    //     }
    // },
    'addblock': {
        id: "addblock-setting",
        classes: 'ide-btn-add-block',
        fontAwesome: 'fas fa-link',
        title: 'code.topbar.tooltips.addBlockSettings',
        tooltipPlacement: "left",
        onclick: "pseudoModal.openModal('modal-addblock')",
        label: {
            value: "code.topbar.label.add"
        }
    },
    'help': {
        id: "help-setting",
        classes: 'ide-btn-right-dropdown ide-btn-help',
        fontAwesome: 'fas fa-question-circle',
        title: 'code.topbar.tooltips.help',
        tooltipPlacement: "left",
        label: {
            value: "code.topbar.label.help"
        }
    }
};

const uiButtons = {
    'undo': {
        classes: 'ide-btn-undo ide-btn-left hide-vsm ',
        fontAwesome: 'fa fa-undo',
        title: 'code.topbar.tooltips.undo',
        onclick: 'undoAction()'
    },
    'sync': {
        classes: 'sync-code-span hide-sm hide-vsm',
        fontAwesome: 'fa fa-sync',
        title: 'code.topbar.tooltips.synchronizePython',
        onclick: 'syncCode()'
    },
    'redo': {
        classes: 'ide-btn-undo ide-btn-right hide-vsm',
        fontAwesome: 'fas fa-redo',
        title: 'code.topbar.tooltips.redo',
        onclick: 'redoAction()'
    }
};

$(document).ready(async function () {
    if ($('#switch-lang-list').length > 0) {
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
    $('#addblock-send').on('click', function () {
        sendAddBlock();
    });
    $('body').on('click', '#help-setting', function () {
        if (typeof IS_CAPYTALE_CONTEXT === 'undefined') {
            openHelpModal();
            return;
        }
        capytaleManager.openInterfaceHelp();
    });
    await awaitJsonPath();
    $('#help-setting').attr('title', jsonPath('code.topbar.tooltips.help'));
    $('#blockly-setting').attr('title', jsonPath('code.topbar.tooltips.accessibility'));
    $('#i18n-setting').attr('title', jsonPath('code.topbar.tooltips.i18n'));
    $('#ide-btn-exercise').attr('title', jsonPath('code.topbar.tooltips.exerciseSettings'));
    $('#addblock-setting').attr('title', jsonPath('code.topbar.tooltips.addBlockSettings'));
});

function openSettings() {
    setAccessibility();
    pseudoModal.openModal('modal-blocklysettings');

    var accessForm = document.querySelector('#access-form-ide');
    accessForm.addEventListener("change", function (e) {
        updateWebsiteAcessibility($(this));
    });

    if (getParamValue('mode') === 'codeOnly') {
        $('#blocks-settings-style').hide();
    }

    if (INTERFACE_NAME !== 'web' && Main.inIframe()) {
        $('#modal-blockly-knowmore').hide();
    }
};

function sendAddBlock() {
    let name = $('#addblock-name');
    let mail = $('#addblock-mail');
    let idea = $('#addblock-idea');

    let errors = [];

    if ($(name).val().length === 0 || $(name).val().length > 100) {
        errors.push("Votre nom doit faire entre 1 et 100 caractères.");
    }
    if ($(mail).val().length === 0)
        errors.push("Votre adresse mail est invalide.");
    if ($(idea).val().length < 10 || $(idea).val().length > 3000) {
        errors.push("Votre idée doit faire entre 10 et 3000 caractères");
    }
    if (errors.length !== 0) {
        if ($('#addblock-error').is(':visible'))
            $('#addblock-error').hide();
        let errors_html = "";
        errors.forEach(element => {
            errors_html += "<li>" + element + "</li>"
        });
        $('.addblock-errors-list').html(errors_html);
        $('#addblock-error').fadeIn('fast');
    } else {
        let formData = new FormData();
        formData.append('name', $(name).val());
        formData.append('mail', $(mail).val());
        formData.append('idea', $(idea).val());

        let request = getAjaxRequest();
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    let resp = JSON.parse(request.responseText);
                    if (resp.success === true) {
                        $('.add-block-form').html(
                            '<div id="addblock-success" class="alert alert-success" role="alert">' +
                            '<b>Succès !</b> Votre message a bien été envoyé. On revient vers vous rapidement ! :)' +
                            '</div>');
                    } else {
                        if ($('#addblock-error').is(':visible'))
                            $('#addblock-error').hide();
                        $('.addblock-errors-list').html("<li>Veuillez vérifier votre formulaire.</li>");
                        $('#addblock-error').fadeIn('fast');
                    }
                } else {
                    console.error("Request error : " + request.status);
                    if ($('#addblock-error').is(':visible'))
                        $('#addblock-error').hide();
                    $('.addblock-errors-list').html("<li>Erreur serveur. Merci de réessayer dans un instant</li>");
                    $('#addblock-error').fadeIn('fast');
                }
            }
        }
        request.open("POST", "/services/post/postAddBlock.php");
        request.send(formData);
    }
}

function openHelpModal(){
    pseudoModal.openModal('modal-help');
    $("#modal-help-btn-tuto").click(function () {
        if (embed == false)
            window.location.href = "/learn/";
        else
            window.open(
                'https://vittascience.com/learn/',
                '_blank'
            );
    });
    $("#modal-help-btn-contact").click(function () {
        if (embed == false)
            window.location.href = "/about?contact=1";
        else
            window.open(
                'https://vittascience.com/about?contact=1',
                '_blank'
            );
    });
}