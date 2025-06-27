//initiate modals
function initPrivateModal() {
    // list of modal IDs that shouldn't be draggable
    const nonDraggable = ['modal-gps'];

    $.each(backModals, (element, modal) => {
        document.querySelector('body').appendChild(new Modal(element, modal));
        if (nonDraggable.includes(element)) {
            return;
        } else {
            $(`#${element}`).draggable();
        }
    });

    if (INTERFACE_NAME !== 'web') $('#importproject-fileinput').fileinput(); // This library is really problematic with js content for web interface

    if (isMobileDevice()) {
        const fileInput = document.querySelector('#modal-openproject div.file-preview');
        if (fileInput !== null) {
            fileInput.style.display = 'none';
        }
    }

    $.each(navbarButtons.projectManagement, (value, button) => {
        $('#manage-button-panel').append(Button(button))
    });

    if (Main.getInterface() == "python") {
        $.each(navbarButtons.exerciceCreation, (value, button) => {
            $('#blockly-setting').after(Button(button))
        });
        $.each(navbarButtons.exerciceRun, (value, button) => {
            $('#execution-buttons-panel').append(Button(button))
        });
    }

    const isLtiContext = typeof ltiVariables13 !== 'undefined';

    if (Main.inIframe() == true && ($_GET('use') == null || !$_GET('use') == 'classroom') && !isLtiContext) {
        $('.ide-btn-exercise').hide();
    }

    if ($_GET('nocloud') == 1) {
        $("#modal-saveproject .modal-content-div").hide();
        // switch the onclick call to directly save the project instead of opening the modal
        $("#saveproject-btn").attr("onclick", "downloadScript(true)");
        $('#modal-openproject, #modal-openproject #my-projects-list').hide();
    }

    // create a setInterval function to check if the referer is maclasseti.fr
    // if it is, hide the shared projects list and the footer
    // if the referer is undefined, launch it after after 1 second
    let refererCheckCount = 0;
    const refererCheckLimit = 10;
    const refererInterval = setInterval(() => {
        if (typeof window.maClasseTiIntegration !== 'undefined' && window.maClasseTiIntegration) {
            $('#shared-projects-list').hide();
            $('#my-projects-list').hide();
            $('#modal-shareproject-footer').hide();
            $('#search-project').hide();
            $('#i18n-setting').hide();
            $('#share-project-qrcode #qrcode').css('filter', 'grayscale(100%)');
            clearInterval(refererInterval);
        }
        if (refererCheckCount >= refererCheckLimit) {
            clearInterval(refererInterval);
        }
        refererCheckCount++;
    }, 1000);

    // Buddy app case
    if (typeof AndroidInterface !== 'undefined' && AndroidInterface !== null) {
        $('#my-projects-list').hide();
        $('.modal-openproject-separator').hide();
        $('.openproject-collapse-title').hide();
        $('#openproject-local-section').hide();
    }
    setButtonDisplay();
    $(".ide-btn-pythtest").hide();
    $("#share-link-control").attr("value", location.href);
    $(".blocklyBackpack").tooltip({ title: i18next.t('code.tooltip.blocklyBackpack') });
};

function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const windows_phone = /windows phone/i.test(userAgent);
    const android = /android/i.test(userAgent);
    const iOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    return windows_phone || android || iOS;
};

// Synchronize project
function synchronizeProject() {
    pseudoModal.openModal('modal-warningsync');
    $("#modal-sync-btn-yes").click(function () {
        Main.synchronizeCode();
        pseudoModal.closeLatestModal();
    });

    $("#modal-sync-btn-no").click(function () {
        pseudoModal.closeLatestModal();
    });
};

$(document).on('keydown', function (e) {
    if (e.keyCode === 27)
        pseudoModal.closeLatestModal();
});

//check if navigator is more recent than v.49
if (/Chrome\/([0-9]{2,3})\./.test(navigator.appVersion)) {
    navigator.appVersion.replace(/Chrome\/([0-9]{2,3})\./)
    if (parseInt(RegExp.$1) < 49) {
        $('#console').append('<p style="color:var(--vitta-red)">Veuillez mettre votre navigateur à jour pour pouvoir profiter de notre interface</p>')
    }
}

/**
 * Import Project from computer 
 */
function adacraftLoadProject() {
    adacraft.loadProjectFromComputer();
    pseudoModal.closeLatestModal();
}

function acceptImportProject() {
    return new Promise((resolve, reject) => {
        const btnYes = document.querySelector('#modal-import-btn-yes');
        const btnNo = document.querySelector('#modal-import-btn-no');
        const btnExit = document.querySelector('#modal-warningimport .vitta-modal-exit-btn');
        const clearListeners = () => {
            btnYes.removeEventListener('click', acceptCallback);
            btnNo.removeEventListener('click', refuseCallback);
            btnExit.removeEventListener('click', refuseCallback);
        };
        const acceptCallback = () => {
            clearListeners();
            resolve(true);
        };
        const refuseCallback = () => {
            clearListeners();
            resolve(false);
        };
        btnYes.addEventListener('click', acceptCallback);
        btnNo.addEventListener('click', refuseCallback);
        btnExit.addEventListener('click', refuseCallback);
    });
};

function readFileFromInput(file) {
    return new Promise(function (resolve) {
        const reader = new FileReader();
        reader.onload = function () {
            resolve(reader.result);
        }
        reader.readAsText(file);
    });
};

function extractProjectInformations(projectFile, headerRegExp) {
    const Myproject = {
        'name': 'no name',
        'dateUpdated': new Date(),
        'description': 'no description',
        'code': null,
        'codeText': '',
        'codeManuallyModified': true,
        'public': false,
        'link': null,
        'user': null,
        'mode': getParamValue('mode'),
    };
    let header = projectFile.match(headerRegExp);
    if (header && header[1]) {
        header = header[1].trim();
    } else {
        header = '';
        console.error("Header not found");
    }
    const headerSplitted = header.split('\n');
    let toolboxMode = (typeof localStorage.toolbox !== 'undefined' ? JSON.parse(localStorage.toolbox)[INTERFACE_NAME] : 'vittascience');
    let interfaceName = null;
    for (let j = 0; j < headerSplitted.length; j++) {
        if (headerSplitted[j].includes('Interface:')) {
            interfaceName = headerSplitted[j].split('Interface:');
            interfaceName = interfaceName && interfaceName[1] ? interfaceName[1].trim() : null;
        } else if (headerSplitted[j].includes('Nom du projet:')) {
            const projectName = headerSplitted[j].split('Nom du projet:');
            Myproject.name = projectName && projectName[1] ? projectName[1].trim() : "no name";
        } else if (headerSplitted[j].includes('Description:')) {
            const projectDescription = headerSplitted[j].split('Description:');
            Myproject.description = projectDescription && projectDescription[1] ? projectDescription[1].trim() : "";
        } else if (headerSplitted[j].includes('Toolbox:')) {
            toolboxMode = headerSplitted[j].split('Toolbox:')[1].trim();
        } else if (headerSplitted[j].includes('Mode:')) {
            const projectMode = headerSplitted[j].split('Mode:');
            Myproject.mode = projectMode && projectMode[1] ? projectMode[1].trim() : Myproject.mode;
        } else if (headerSplitted[j].includes('Blocks:')) {
            const projectBlocks = headerSplitted[j].split('Blocks:');
            Myproject.code = projectBlocks && projectBlocks[1] ? projectBlocks[1].trim() : null;
        }
    }
    Myproject.codeText = projectFile.replace(headerRegExp, '').trim() + '\n';
    Myproject.options = {
        'toolbox': toolboxMode
    };

    if (interfaceName == null || interfaceName !== Main.getInterface()) {
        setTimeout(() => {
            pseudoModal.openModal('modal-warningWrongProjectFile');
        }, 100);
        Myproject.code = DEFAULT_XML_START[Myproject.options.toolbox];
        Myproject.mode = "code";
    }
    return Myproject;
};

/**
 * Update the workspaces/localStorage with a provided project (used for project load from file)
 * @public
 * @param {Object} project - The project to be loaded
 */
function updateLocalProject(project) {
    let state = {};
    let title = '';
    history.pushState(state, title, removeParam("link", window.location.href));
    projectManager.newProject(project);
    CodeManager.getSharedInstance().codeWasManuallyModified = project.codeManuallyModified;
    CodeManager.getSharedInstance().setTextCode(project.codeText);
    CodeManager.getSharedInstance().setCodeMode(project.mode);
    CodeManager.getSharedInstance().setXml(project.code);
    CodeManager.getSharedInstance().loadBlocks();
    projectManager.localStorageManager.setLocalProject(project);
    $("#project-name").html(decodeURI(project.name));
    $("#project-name").attr('data-bs-title', '<span class="tooltip-title">' + project.name + '</span><span class="tooltip-author">' + (project.user ? project.user.firstname + ' ' + project.user.surname : i18next.t('code.tooltip.anonymousAuthor')) + '</span><span class="tooltip-description">' + decodeURI(project.description) + '</span>');
    projectManager.updateUrl();
    projectManager.projectsFinder_updateProject();
    updateToolbox(project.options.toolbox);
    switch (project.mode) {
        case 'blocks':
            switchBlockMode();
            break;
        case 'mixed':
            switchMixedMode();
            break;
        default:
            switchCodeMode();
            break;
    }
};

$('body').on('fileloaded', '#importproject-fileinput', async function () {
    pseudoModal.openModal('modal-warningimport');

    const fileList = $("#importproject-fileinput").fileinput("getFileStack"); /* now you can work with the file list */
    const file = fileList[0];
    const extension = file.name.split('.')[1];
    const interface = Main.getInterface();

    const inoInterfaces = ["arduino", "mBot", "letsstartcoding"];
    const pyInterfaces = ["python", "microbit", "esp32", "wb55", "l476", "TI-83", "galaxia", "raspberrypi", "niryo", "nao", "GalaxiaCircuitPython", "buddy", "cyberpi", "pico", "eliobot", "thymio", "winky", "sphero", "lotibot", "bluebot", "spike", "photon"];

    if ((inoInterfaces.includes(interface) && extension !== "ino") || (pyInterfaces.includes(interface) && extension !== "py")) {
        const infoBox = document.getElementById("import-extension-warning-box");
        infoBox.style.display = "none";
        infoBox.className = "alert alert-danger";
        infoBox.innerHTML = jsonPath('modals.warning.import.content.extension');
        $("#import-extension-warning-box").fadeIn("slow");
        return setTimeout(() => {
            $("#importproject-fileinput").fileinput('reset');
            pseudoModal.closeLatestModal();
        }, SAVE_TIMEOUT);
    }
    $("#import-extension-warning-box").hide();
    const acceptImport = await acceptImportProject();
    if (!acceptImport) {
        pseudoModal.closeLatestModal();
        return;
    }

    if ($("#importproject-fileinput").fileinput("getFileStack").length > 0) {
        const projectFile = await readFileFromInput(file);
        const headerRegExp = inoInterfaces.includes(interface) ? /\/\*\r?\n\r?\n([\s\S]*?)\r?\n\r?\n\*\// : /"""([\s\S]*?)"""/;
        if (projectFile.toLowerCase().includes('vittascience')) {
            updateLocalProject(extractProjectInformations(projectFile, headerRegExp));
            /**
             * TO BE REMOVED
             * there's certainly a better way of dealing with the problem
             */
            const children = $('.input-group-btn.input-group-append').children();
            for (let i = 0; i < children.length; i++) {
                let child = $(children[i]);
                if (child.hasClass('fileinput-remove') || child.hasClass('fileinput-cancel') || child.hasClass('fileinput-upload')) {
                    child.remove();
                }
            }
        } else {
            Main.importCode(projectFile);
            switchCodeMode();
            pseudoModal.closeLatestModal();
        }
        $("#importproject-fileinput").fileinput('reset');
    }
    pseudoModal.closeLatestModal();
});

/**
 * Help Modal 
 */
$("body").on('click', '#modal-help-btn-tuto-texas', function () {
    pseudoModal.closeLatestModal();
});

$("body").on('click', '#readOnlyAlertButton', function () {
    $('#readOnlyAlert').hide();
});

$('body').on('click', '#help-setting', function () {
    if (typeof IS_CAPYTALE_CONTEXT !== 'undefined') {
        capytaleManager.openInterfaceHelp();
        return;
    }
    $("#modal-help-btn-tuto").click(function () {
        if (Main.inIframe() == false)
            window.location.href = "/learn/";
        else
            window.open(
                'https://vittascience.com/learn/',
                '_blank'
            );
    });
    $("#modal-help-btn-contact").click(function () {
        if (Main.inIframe() == false)
            window.location.href = "/about?contact=1";
        else
            window.open(
                'https://vittascience.com/about?contact=1',
                '_blank'
            );
    });
});

$('body').on('click', '#users', function () {
    if (UserManager.getUser() && UserManager.getUser().id == projectManager._currentProject.user.id) {
        pseudoModal.openModal('modal-users-rtc-owner');
    } else {
        pseudoModal.openModal('modal-users-rtc-user');
    }
});

$('body').on('change', 'input[name="shareLinkRights"]', function () {
    //mise à jour des droits du lien du projet
    const right = $(this).val();
    for (let i = 0; i < $("input[name='right-select-control']").length; i++) {
        $("input[name='right-select-control']")[i].setAttribute('checked', false)
    }
    $("input[name='right-select-control'][value=" + right + "]").attr('checked', 'checked');
    const id = projectManager.getCurrentProject().id;
    if (id != null) {
        projectManager.ajax_updateSharedStatusForProject(id, right);
    }
    rtcManager.socket.emit('modalRightsChange', { rights: right, room: projectManager.getCurrentProject().link });
});

$('body').on('change', 'input[name="right-select-control"]', function () {
    //mise à jour des droits du lien du projet
    const right = $(this).val();
    for (let i = 0; i < $("input[name='shareLinkRights']").length; i++) {
        $("input[name='shareLinkRights']")[i].setAttribute('checked', false)
    }
    $("input[name='shareLinkRights'][value=" + right + "]").attr('checked', 'checked');
    const id = projectManager.getCurrentProject().id;
    if (id != null) {
        projectManager.ajax_updateSharedStatusForProject(id, right);
    }
    rtcManager.socket.emit('modalRightsChange', { rights: right, room: projectManager.getCurrentProject().link });
});

$('body').on('change', '.card-mail-right-select', function () {
    //mise à jour des droits du shared user
    const right = $(this).val();
    const userId = $(this).attr("data-i");
    const projectId = projectManager.getCurrentProject().id;
    if (right == "read" || right == "write") {
        projectManager.ajax_updateSharedUserRight(projectId, userId, right);
        rtcManager.socket.emit('userRightsChange', { idUser: userId, rights: right, room: projectManager.getCurrentProject().link });
    } else {
        let response = confirm('Voulez vous vraiment supprimer cet utilisateur ?');
        if (response) {
            projectManager.ajax_deleteSharedUser(projectId, userId);
            document.querySelector('[data-i="' + userId + '"]').closest('.card-item').remove();
        }
    }
});
$('body').on('click', '#modal-report-send-button', async function () {
    const email = "support@vittascience.com"
    const messageUser = document.getElementById('format-aitext-error').value;
    const emailUser = document.getElementById('format-aitext-error-mail').value
    const navigateur = navigator.userAgentData
    const message = {
        userMail: emailUser,
        userMessage: messageUser,
        date: new Date(Date.now())
    };
    if (email != "") {
        sendReportAiTextByMail(email, JSON.stringify(message));
    }
});

$('body').on('click', '#btn-send-invite-mail', async function () {
    let right = 1
    let message = document.getElementById('formControlInputMessage').value;
    let email = document.getElementById('formControlInputMail').value;
    for (let i = 0; i < $("input[name='right-select-mail']").length; i++) {
        if ($("input[name='right-select-mail']")[i].checked) {
            right = $("input[name='right-select-mail']")[i].value == "read" ? 1 : 2;
        }
    }
    if (email != "") {
        sendInviteByMail(email, message, right);
    }
    let verboseRight = "";
    switch (right) {
        case 1:
        case '1':
            verboseRight = "read";
            break;
        case 2:
        case '2':
            verboseRight = "write";
            break;
    }
    let divToAdd = `<div class="card-item">
        <div class='card-item-user-infos'>
            <div class='card-item-letter'><span>`+ email.charAt(0).toUpperCase() + `</span><span class='round-online' data-idRound='round-online-undefined'>.</span></div>
            <span class='card-item-name'>`+ email + `</span>
        </div>
        <select name="card-mail-right-select" class="card-mail-right-select" data-i="`+ email + `">
            <option value="read">Lecture seule</option>
            <option value="write">Ecriture</option>
            <option value="delete">Supprimer l'accès</option>
        </select>
        </div>
        `;
    document.querySelector('#share-tab-invited-users').innerHTML += divToAdd;
    $('#share-tab-invited-users .card-mail-right-select:last').val(verboseRight)
    document.querySelector('#panelsStayOpen-collapseTwo .accordion-body').innerHTML += divToAdd;
    $('#panelsStayOpen-collapseTwo .accordion-body .card-mail-right-select:last').val(verboseRight)
});

function footerVisibility(bool) {
    if (bool) {
        $('#modal-shareproject-footer').show();
    } else {
        $('#modal-shareproject-footer').hide();
    }
}

$('body').on('click', '.modal-shareproject-tab-title', function () {
    if ($(this)[0].children[0].id == 'modal-shareproject-tab-save') {
        footerVisibility(false)
    } else {
        footerVisibility(true)
    }
});

$('body').on('click', '#edit-project-name', function () {
    pseudoModal.openModal('modal-edit-project-name');
    $('#edit_name').val($("#project-name").text());

    // get the contents of the .tooltip-description element inside the data-bs-title attribute of the #project-name element
    let desc = $("#project-name").attr("data-bs-title").split('<span class="tooltip-description">')[1].split('</span>')[0];

    $("#edit_description").val(desc);
    if (typeof vittaFormValidator !== 'undefined') {
        const currentValidator = vittaFormValidator.getFormValidatorByName('editProjectForm');
        if (currentValidator) currentValidator.checkInitialState();
    }
});

$('body').on('click', '#modal-edit-project-btn-edit', function () {
    const newName = $("#edit_name").val();
    const newDesc = $("#edit_description").val();
    const currentProject = projectManager.getCurrentProject();
    const currentProjectAuthor = currentProject.user ? currentProject.user.firstname + ' ' + currentProject.user.surname : i18next.t('code.tooltip.anonymousAuthor');

    projectManager.editCurrentProject(newName, newDesc);
    $("#project-name").html(newName);
    $("#project-name").attr("data-bs-title", `<span class="tooltip-title">${newName}</span><span class="tooltip-author">${currentProjectAuthor}</span><span class="tooltip-description">${newDesc}</span>`);
    $("#save-name").val(newName);
    let inputEvent = new Event('input');
    document.querySelector('#save-name').dispatchEvent(inputEvent); // Dispatching input event to trigger the VittaformValidator
    $("#save-description").val(newDesc);
    saveConfirm();
    pseudoModal.closeModal('modal-edit-project-name');
});

$('body').on('click', '#modal-edit-project-btn-cancel', function () {
    pseudoModal.closeModal('modal-edit-project-name');
});

function openRefusedModal() {
    pseudoModal.openModal('modal-private-project');
}
function userRightsChange(rights) {
    switch (rights) {
        case "read":
            document.getElementById("modal-user-right-change-type").innerHTML = 'Lecture seule';
            break;
        case "write":
            document.getElementById("modal-user-right-change-type").innerHTML = 'Lecture et écriture';
            break;
    }
    pseudoModal.openModal('rtc-user-rights-change');
    setTimeout(function () {
        location.reload()
    }, 5000);
}
function rightsChange(right) {
    switch (right) {
        case "read":
            document.getElementById("modal-right-change-type").innerHTML = 'Lecture seule';
            break;
        case "write":
            document.getElementById("modal-right-change-type").innerHTML = 'Lecture et écriture';
            break;
        case "private":
            document.getElementById("modal-right-change-type").innerHTML = 'Privé';
            break;
    }
    pseudoModal.openModal('rtc-rights-change');
    setTimeout(function () {
        location.reload()
    }, 5000);
}
/**
 * Open a project by link and load it in the workspace. 
 * @param {string} projectLink
 * @param {boolean} skip
 */
async function openProject(projectLink = null, skip = false) {
    projectManager.isOpeningProject = true;
    if (typeof rtcInterfaces !== 'undefined' && rtcInterfaces.includes(INTERFACE_NAME)) {
        if (rtcManager !== null) {
            if (rtcManager.socket.connected === true) {
                rtcManager.socket.disconnect();
            }
        }
        rtcManager = null;
        $('#users').html('');
    }
    if (Main.hasAutoCorrector()) {
        AutoCorrector.reset();
        if (Simulator.isOpen) {
            $("#training-mode").click();
        }
    }
    if (Main.getInterface() == 'python') {
        await PythonRun.reset();
    }
    if ($("#toolboxRestriction").is(':checked')) {
        $("input[name='toolboxRestrictionName']#toolboxRestriction").removeAttr("checked");
        Main.restrictToolbox();
    }
    if (INTERFACE_NAME != 'adacraft' && projectManager.needSaving() === true && skip == false && UserManager.getUser() !== null) {
        pseudoModal.resetMessage("modal-warningsave");
        pseudoModal.openModal("modal-warningsave");
        $("#modal-warning-save-btn-yes, #modal-warning-save-btn-no").unbind();
        $("#modal-warning-save-btn-yes").click(async function () {
            const currentProject = projectManager.getCurrentProject();
            if (typeof currentProject.name === 'undefined' || currentProject.description === 'undefined' || currentProject.public === 'undefined') {
                pseudoModal.closeModal("modal-warningsave");
                saveProjectbtn();
            }
            const projectName = currentProject.name;
            const projectDescription = currentProject.description;
            const isPublic = currentProject.public;
            try {
                await projectManager.saveProject(projectName, projectDescription, isPublic);
                openProject(projectLink, true);
            } catch (error) {
                displayFrontError(error, 'modal-warningsave');
            }
            setTimeout(function () {
                pseudoModal.closeModal("modal-warningsave");
            }, SAVE_TIMEOUT);
        });

        $("#modal-warning-save-btn-no").click(function () {
            openProject(projectLink, true);
            pseudoModal.closeModal("modal-warningsave");
            pseudoModal.closeLatestModal();
        });
    } else {
        await projectManager.projectLoader_loadFromFinder(projectLink);
        projectManager.isOpeningProject = false;
        pseudoModal.closeLatestModal();
    }
    if ($_GET('duo')) {
        projectManager._multiManager.refreshIframeContent();
    }
    if (typeof rtcInterfaces != 'undefined' && rtcInterfaces.includes(INTERFACE_NAME)) {
        setTimeout(function () {
            rtcManager = new RtcManager();
            rtcManager.init();
        }, 10);
    }
};

/**
 * Get a link for a project mapped by its name
 * @param {string} projectName 
 */
function shareProject(link) {
    shareProjectChoice('#link', link);
    UIManager.bindClick("copy-link", function () {
        copyToClipboard($('#link-value'), $("#copy-link-msg"));
    })
};

function integerProject(link) {
    shareProjectChoice('#iframe', link);
    UIManager.bindClick("copy-frame", function () {
        copyToClipboard($('#iframe-value'), $("#copy-frame-msg"));
    });

};

function shareProjectChoice(frame, projectLink) {

    let linkStruct = {
        base: window.location.origin + window.location.pathname,
        args: {
            link: projectLink,
            mode: '',
            console: '',
            simu: '',
            embed: '',
            nocloud: '',
            toolbox: '',
            board: ''
        }
    };
    const link = stringifyLinkShare(linkStruct);
    $('#modal-shareproject-tab-link, #modal-shareproject-tab-iframe').unbind('click');

    if (frame == '#iframe') {
        if (typeof rtcInterfaces != 'undefined' && !rtcInterfaces.includes(INTERFACE_NAME)) {
            $('#modal-shareproject-tab-link, #modal-shareproject-tab-link-content').removeClass('active show');
            $('#modal-shareproject-tab-iframe, #modal-shareproject-tab-iframe-content').addClass('active show');
        }
        $('#modal-shareproject-tab-iframe-content').html(IFRAME);
        $('#iframe-value').attr('src', link + '&embed=1');
        $('#iframe-value').html(`<iframe width='100%' height='500' allowfullscreen frameborder='0' style='border:1px #d6d6d6 solid;' allow="fullscreen *; microphone *; camera *; serial *; usb *; encrypted-media *" src="` + link + `"></iframe>`);

        $("#modal-shareproject-tab-link-content").html('');

        $('#copy-frame').click(function () {
            $('#copy-frame').unbind('click');
            copyToClipboard($('#iframe-value'), $("#copy-frame-msg"));
        });

    } else {
        if (typeof rtcInterfaces != 'undefined' && !rtcInterfaces.includes(INTERFACE_NAME)) {
            $('#modal-shareproject-tab-iframe, #modal-shareproject-tab-iframe-content').removeClass('active show');
            $('#modal-shareproject-tab-link, #modal-shareproject-tab-link-content').addClass('active show');
        }

        // set tab content
        document.getElementById("modal-shareproject-tab-link-content").innerHTML = linkHtml;

        // set link into the input field
        document.getElementById("link-value").value = link;

        if (typeof rtcInterfaces != 'undefined' && rtcInterfaces.includes(INTERFACE_NAME)) {
            document.getElementById("formControlInputMessage").value = createMailMessage(projectManager._currentProject.user.firstname + ` ` + projectManager._currentProject.user.surname, link);
        }

        // Récupérer l'élément <input> par son ID
        const inputElement = document.getElementById('link-value');

        // Définir la fonction de gestionnaire d'événement pour le changement de valeur
        function handleInputChange(event) {
            // Récupérer la nouvelle valeur du champ
            const nouvelleValeur = event.target.value;

            // Update the QR code color for Texas Instruments
            let qrColor = '#22b573';
            if (getParamValue("primaryColor") && getParamValue("primaryColor") == "cc0000") {
                qrColor = '#cc0000';
            }

            $('#qrcode').html('');
            QrCreator.render({
                text: nouvelleValeur,
                radius: 0, // 0.0 to 0.5
                ecLevel: 'L', // L, M, Q, H
                fill: qrColor, // foreground color
                background: 'white', // color or null for transparent
                size: 150 // in pixels
            }, document.querySelector('#qrcode'));
        }

        // Ajouter l'événement 'input' à l'élément
        inputElement.addEventListener('input', handleInputChange);


        document.querySelector('#link-value').value = link;
        // if we're on maclasseti.fr, make the link go to the right domain
        if (typeof window.maClasseTiIntegration !== 'undefined' && window.maClasseTiIntegration) {
            // make it so that https://XX.vittascience.com/... goes to https://maclasseti.fr/...
            const linkValue = document.querySelector('#link-value');
            const linkValueValue = linkValue.value;

            // split the link at the last slash
            const linkValueValueSplit = linkValueValue.split('/');
            const lastElement = linkValueValueSplit[linkValueValueSplit.length - 1];

            // add the right domain
            document.querySelector('#link-value').value = 'https://maclasseti.fr/python' + lastElement;

        }

        // Créer un nouvel événement 'input' et le déclencher manuellement
        const inputEvent = new Event('input');
        inputElement.dispatchEvent(inputEvent);


        $('#modal-shareproject-tab-iframe-content').html('');

        // set copy link button event
        document.getElementById("copy-link").addEventListener("click", function () {
            copyToClipboard($('#link-value'), $("#copy-link-msg"));
        });
        document.getElementById("copy-link").onclick = function () {
            copyToClipboard($('#link-value'), $("#copy-link-msg"));
        };
    }

    $('#modal-shareproject-footer').html(optionsModal);

    $('#modal-shareproject-tab-link').click(function () {
        shareProjectChoice('#link', projectLink);
    });
    $('#modal-shareproject-tab-iframe').click(function () {
        shareProjectChoice('#iframe', projectLink);
    });

    function createMailMessage(user, link) {
        let message = jsonPath('modals.standard.share.content.shareMessage');
        message = message.replace('%user%', user);
        message = message.replace('%link%', link);
        return message;
    };

    function updateLinkShare(linkStruct) {
        const link = stringifyLinkShare(linkStruct);

        if (document.querySelector('#link-value')) {
            document.querySelector('#link-value').value = link;
            // if we're on maclasseti.fr, make the link go to the right domain
            if (typeof window.maClasseTiIntegration !== 'undefined' && window.maClasseTiIntegration) {
                // make it so that https://XX.vittascience.com/... goes to https://maclasseti.fr/...
                const linkValue = document.querySelector('#link-value');
                const linkValueValue = linkValue.value;

                // split the link at the last slash
                const linkValueValueSplit = linkValueValue.split('/');
                const lastElement = linkValueValueSplit[linkValueValueSplit.length - 1];

                // add the right domain
                document.querySelector('#link-value').value = 'https://maclasseti.fr/python' + lastElement;

            }
        }

        if (typeof rtcInterfaces != 'undefined' && !rtcInterfaces.includes(INTERFACE_NAME)) {
            if (UserManager.getUser().id && UserManager.getUser().id != projectManager._currentProject.user.id) {
                document.getElementById("formControlInputMessage").value = createMailMessage(projectManager._currentProject.user.firstname + ` ` + projectManager._currentProject.user.surname, link);
            }
        }
    };

    function updateLinkIntegrate(linkStruct) {
        const link = stringifyLinkShare(linkStruct);
        const iframe = `<iframe width='100%' height='500' allowfullscreen frameborder='0' style='border:1px #d6d6d6 solid;' allow="fullscreen *; microphone *; camera *; serial *; usb *; encrypted-media *" src="${link}"></iframe>`;

        // if #iframe-value exists, update it
        if (document.querySelector('#iframe-value')) {
            document.querySelector('#iframe-value').value = iframe;
        }

        if (typeof rtcInterfaces != 'undefined' && !rtcInterfaces.includes(INTERFACE_NAME)) {
            if (UserManager.getUser().id && UserManager.getUser().id != projectManager._currentProject.user.id) {
                document.getElementById("formControlInputMessage").value = createMailMessage(projectManager._currentProject.user.firstname + ` ` + projectManager._currentProject.user.surname, link);
            }
        }
    };

    function updateValueLinkShare(key, value) {
        if (linkStruct.args.hasOwnProperty(key)) {
            linkStruct.args[key] = value;
        }
        updateLinkShare(linkStruct);
        updateLinkIntegrate(linkStruct);

        // Créer un nouvel événement 'input' et le déclencher manuellement pour mettre à jour le QR code
        const inputEvent = new Event('input');
        document.getElementById('link-value').dispatchEvent(inputEvent);

        if (typeof document.getElementById('formControlInputMessage') != 'undefined' && document.getElementById('formControlInputMessage') != null) {
            document.getElementById("formControlInputMessage").value = createMailMessage(projectManager._currentProject.user.firstname + ` ` + projectManager._currentProject.user.surname, link);
        }
    };

    $('body').on('change', 'input[type=radio][name=shareOptionsMode]', function () {
        updateValueLinkShare('mode', this.value);
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
    $('input[type=radio][name=shareOptionsEmbed]').change(function () {
        updateValueLinkShare('embed', this.value);
    });
    $('input[type=radio][name=shareOptionsSimulator]').change(function () {
        updateValueLinkShare('simu', this.value);
    });
    $('input[type=radio][name=shareOptionsNoCloud]').change(function () {
        updateValueLinkShare('nocloud', this.value);
    });
    $('input[type=radio][name=toolboxModeShare]').change(function () {
        updateValueLinkShare('toolbox', this.value !== TOOLBOX_STYLE_DEFAULT ? this.value : '');
    });
    $('input[type=radio][name=shareOptionsConsole]').change(function () {
        updateValueLinkShare('console', this.value == 'right' ? this.value : '');
    });
    $('input[type=radio][name=shareOptionsBoard]').change(function () {
        updateValueLinkShare('board', this.value !== BOARD_DEFAULT ? this.value : '');
    });

    if (getParamValue('mode') != null) {
        const paramMode = getParamValue('mode');
        $(`#shareOptionsMode${paramMode}`).click();
    }

    if (getParamValue('console') != null) {
        const paramConsole = getParamValue('console');
        $(`#shareOptionsConsole${paramConsole}`).click();
    }

    if (getParamValue('embed') != null) {
        let paramEmbed = getParamValue('embed');
        if (paramEmbed == 1) {
            paramEmbed = 'No';
        }
        $(`#shareOptionsEmbed${paramEmbed}`).click();
    }

    if (typeof rtcInterfaces != 'undefined' && rtcInterfaces.includes(INTERFACE_NAME)) {
        if (frame == '#iframe') {
            document.getElementById("modal-shareproject-tab-iframe").click()
        } else {
            document.getElementById("modal-shareproject-tab-link").click()
        }
    }

    $('#modal-shareproject').localize();
    pseudoModal.openModal('modal-shareproject');

    let paramValue = getParamValue('console');
    if (paramValue == "bottom") {
        $("input[value='bottom']#shareOptionsConsoleBottom").attr("checked", "checked");
    } else if (paramValue == "right") {
        $("input[value='right']#shareOptionsConsoleRight").attr("checked", "checked");
        updateValueLinkShare('console', paramValue);
    }
    paramValue = getParamValue('mode');
    if (paramValue == MODE_BLOCKS) {
        $("input[value='blocks']#shareOptionsModeBlocks").attr("checked", "checked");
        updateValueLinkShare('mode', paramValue);
    } else if (paramValue == MODE_MIXED) {
        $("input[value='mixed']#shareOptionsModeMixed").attr("checked", "checked");
    } else if (paramValue == MODE_CODE) {
        $("input[value='mixed']#shareOptionsModeCode").attr("checked", "checked");
        updateValueLinkShare('mode', paramValue);
    } else if (paramValue == MODE_CODE_ONLY) {
        $("input[value='mixed']#shareOptionsModeCodeOnly").attr("checked", "checked");
        updateValueLinkShare('mode', paramValue);
    } else if (paramValue == MODE_SIMU_ONLY) {
        $("input[value='mixed']#shareOptionsModeSimuOnly").attr("checked", "checked");
        updateValueLinkShare('mode', paramValue);
    }
    paramValue = getParamValue('simu');
    if (paramValue == "1") {
        $("input[value='1']#shareOptionsSimulatorEnable").attr("checked", "checked");
        updateValueLinkShare('simu', paramValue);
    } else if (paramValue == "") {
        $("input[value='']#shareOptionsSimulatorDisable").attr("checked", "checked");
    }
    paramValue = getParamValue('toolbox');
    if (paramValue == TOOLBOX_STYLE_VITTA) {
        $("input[value='vittascience']#toolboxModeVittascienceShare").attr("checked", "checked");
    } else if (typeof TOOLBOX_STYLE_SCRATCH != 'undefined' && paramValue == TOOLBOX_STYLE_SCRATCH) {
        $("input[value='scratch']#toolboxModeScratchShare").attr("checked", "checked");
        updateValueLinkShare('toolbox', paramValue);
    } else if (typeof TOOLBOX_STYLE_TI != 'undefined' && paramValue == TOOLBOX_STYLE_TI) {
        $("input[value='texas-instruments']#toolboxModeTexasInstrumentsShare").attr("checked", "checked");
        updateValueLinkShare('toolbox', paramValue);
    }

    paramValue = getParamValue('board');
    if (paramValue && (typeof SIMULATOR_BOARDS !== 'undefined') && Object.keys(SIMULATOR_BOARDS).includes(paramValue)) {
        $("input[value='" + paramValue + "']#board_" + paramValue + "_Share").attr("checked", "checked");
        if (paramValue != BOARD_DEFAULT) {
            updateValueLinkShare('board', paramValue);
        }
    }
};

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

function copyToClipboard(input, message) {
    input.select();
    document.execCommand("copy");
    if ($(message).is(":visible")) {
        $(message).css("display", "none");
    }
    $(message).fadeIn("slow");
};

function showLink() {
    let fullLink = window.location.origin + window.location.pathname + "?link=" + this._currentProject.link;
    UIManager.resetMessage("link-form-message");
    UIManager.showSuccessMessage("link-form-message", "<div><span class='fa fa-info-circle'></span> " + fullLink + "</div>");
    setTimeout(function () {
        UIManager.closeModal("link-div");
    }, SAVE_TIMEOUT);
};

/**
 * Delete project mapped by its link
 * @param {string} projectLink 
 */
async function deleteProject(projectLink) {
    pseudoModal.openModal('modal-warningdelete');
    $("#btn_warning_delete_project").prop("disabled", false);
    const validatedDeletion = await deleteProjectValidation();
    if (!validatedDeletion) {
        return;
    }
    $("#btn_warning_delete_project").prop("disabled", true);
    // Delete all the project assets for ai interface cases
    const deletedProject = (await projectManager.getProjectByLink(projectLink)).project

    if (deletedProject.interface === 'ai' && deletedProject.code !== '') {
        const deletedProjectCode = JSON.parse(deletedProject.code),
            assetsToDelete = [];
        if (deletedProjectCode.fileKeys) {
            assetsToDelete.push(deletedProjectCode.fileKeys);
        }
        if (deletedProjectCode.trainingDataKeys) {
            assetsToDelete.push(deletedProjectCode.trainingDataKeys);
        }
        let deleteResponse;
        try {
            deleteResponse = JSON.parse(await deleteAssets(assetsToDelete));
        } catch (error) {
            aiMain._notif.displayNotification('#global-notifications-area', String(error), 'bg-danger');
        }
        if (!deleteResponse.success) {
            const errorMessage = typeof deleteResponse.message !== 'undefined' ? deleteResponse.message : 'Assets removal error!';
            aiMain._notif.displayNotification('#global-notifications-area', errorMessage, 'bg-danger');
            document.querySelector('#btn_warning_delete_project').removeAttribute('disabled');
            return;
        }
    }
    try {
        const deleteProjectResult = await projectManager.deleteProject(projectLink);
        if (typeof deleteProjectResult.link == "string") {
            //remove the deleted project from the js list of my projects
            projectManager._myProjects = projectManager._myProjects.filter(x => x.link !== deleteProjectResult.link)
            pseudoModal.closeModal('modal-openproject');
            pseudoModal.setMessage('modal-warningdelete', i18next.t('modals.warning.delete.content.success'), 'success');
            projectManager.populateAllProjects();
            setTimeout(function () {
                pseudoModal.closeModal('modal-warningdelete');
            }, 3000);
        } else {
            if (deleteProjectResult == DELETE_OPENED_PROJECT_ERROR)
                pseudoModal.setMessage('modal-warningdelete', i18next.t('modals.warning.delete.content.error_opened'), 'error')
            else
                pseudoModal.setMessage('modal-warningdelete', i18next.t('modals.warning.delete.content.error'), 'error')
            setTimeout(function () {
                pseudoModal.closeModal('modal-warningdelete');
            }, SAVE_TIMEOUT);
        }
    } catch (error) {
        console.error(error);
    }

    $('#btn_warning_delete_project_decline').click(function () {
        pseudoModal.closeModal('modal-warningdelete');
    });
};

function deleteProjectValidation() {
    return new Promise((resolve, reject) => {
        const cancelButtonElt = document.querySelector('#btn_warning_delete_project_decline'),
            validateButtonElt = document.querySelector('#btn_warning_delete_project'),
            closeModalButtonElt = document.querySelector('#modal-warningdelete .vitta-modal-exit-btn');

        const removeListeners = () => {
            cancelButtonElt.removeEventListener('click', cancelCallback);
            closeModalButtonElt.removeEventListener('click', cancelCallback);
            validateButtonElt.removeEventListener('click', validationCallback);
        };
        const validationCallback = () => {
            removeListeners();
            resolve(true);
        };
        const cancelCallback = () => {
            pseudoModal.closeModal('modal-warningdelete');
            removeListeners();
            resolve(false);
        };
        cancelButtonElt.addEventListener('click', cancelCallback);
        closeModalButtonElt.addEventListener('click', cancelCallback);
        validateButtonElt.addEventListener('click', validationCallback);
    });
}

/**
 * New Project
 */
function newProject() {
    return new Promise(function (resolve, reject) {
        if (INTERFACE_NAME != 'adacraft' && projectManager.needSaving()) {
            if (typeof rtcManager == 'undefined' || rtcManager == null || rtcManager.socket.connected == false) {
                pseudoModal.openModal('modal-warningsave');
                $("#modal-warning-save-btn-yes, #modal-warning-save-btn-no").unbind();
                $('#modal-warning-save-btn-no').click(function () {
                    pseudoModal.closeLatestModal();
                    resolve("not saved");
                });
                $('#modal-warning-save-btn-yes').click(function () {
                    pseudoModal.closeLatestModal();
                    saveProjectbtn();
                    reject("needs saving");
                });
                pseudoModal.clickOnExit('modal-warningsave', function () {
                    reject("user exit");
                });
            } else {
                resolve("rtc already saved");
            }
        } else
            resolve("no need to save");
    }).then(
        // resolve ()
        () => {
            pseudoModal.openModal('modal-newproject');
        },
        // reject()
        (err) => {
            console.error(err);
        }
    );
};

function setButton(id, state) {
    if (state) {
        $('#' + id).prop('disabled', false);
    } else {
        $('#' + id).prop('disabled', true);
    }
};

function shareProjectButton() {
    pseudoModal.openModal('modal-shareproject');
    if (UserManager.getUser() == null) {
        document.getElementById('modal-shareproject-tab-save').click()
        let msgmModalNotConnected =
            `<div class="modal-message-noUser">
              <span>
                  <p data-i18n="modals.standard.save.content.messages.saveConnect">Pour enregistrer votre projet, veuillez vous connecter.</p>
                    <a href="javascript:void(0)" class="btn btn-green" onClick="pseudoModal.closeLatestModal(); displayLogin();" data-i18n="navbar.items.user_shortcuts.willSignin">
                        Je me connecte
                    </a>
                    <span data-i18n="modals.standard.save.content.form.or">ou</span>
                    <a href="javascript:void(0)" class="btn btn-orange" onClick="pseudoModal.closeLatestModal(); displaySignup();" data-i18n="navbar.items.user_shortcuts.willSignup">
                        Je m'inscris !
                    </a>
              </span>
          </div >`;
        /* $('#share-link').innerHTML = '';
        $('#modal-shareproject-tab-iframe-content').innerHTML = '';
        $('#share-send').innerHTML = ''; */
        document.getElementById('share-link').replaceChildren();
        document.getElementById('modal-shareproject-tab-iframe-content').replaceChildren();
        document.getElementById('share-send').replaceChildren();
        $('#share-link').prepend(msgmModalNotConnected);
        $('#modal-shareproject-tab-iframe-content').prepend(msgmModalNotConnected);
        $('#share-send').prepend(msgmModalNotConnected);
    } else if (getParamValue('link') == null) {
        pseudoModal.closeLatestModal();
        pseudoModal.openModal('modal-newproject-nolink');
        return;
    } else if (UserManager.getUser().id != projectManager._currentProject.user.id) {
        //document.getElementById("right-select").disabled = true;shareLinkRights
        for (let i = 0; i < $("input[name='shareLinkRights']").length; i++) {
            $("input[name='shareLinkRights']")[i].setAttribute('disabled', true)
        }
        //document.getElementById("right-select-mail").disabled = true;
        for (let i = 0; i < $("input[name='right-select-mail']").length; i++) {
            $("input[name='right-select-mail']")[i].setAttribute('disabled', true)
        }
        document.getElementById('rights-select-for-link').remove();
        document.getElementById('share-send').innerHTML = `
        <div>
            <p class='text-center mt-5 '>Seul le propriétaire du projet est authorisé à accéder à cet onglet.</p>
        </div>
        `;
    }
    $('#modal-shareproject-btn-cancel').click(function () {
        pseudoModal.closeLatestModal();
    }.bind(this));
    shareProject(getParamValue('link'));
}

/**
 * Save a project into local storage
 */
async function saveProjectbtn() {
    if (vittaFormValidator) vittaFormValidator.observeExistingForms();
    const openSaveModal = function (project) {
        pseudoModal.openModal('modal-saveproject');
        $('#download-project-info').on('click', function () {
            pseudoModal.openModal('modal-downloadproject-info');
        });
        if (project.name && project.name !== "no name" && project.name !== "no%20name") {
            $("#save-name").val(decodeURI(project.name));
            let inputEvent = new Event('input');
            document.querySelector('#save-name').dispatchEvent(inputEvent); // Dispatching input event to trigger the VittaformValidator
        }
        if (project.description) {
            if (project.description.match(/<span class="tooltip-title">/)) {
                $("#save-description").val(decodeURI(project.description.split('<span class="tooltip-title">')[0]));
            } else {
                $("#save-description").val(decodeURI(project.description));
            }
        };
        $('.modal-message-noUser').remove();
        if (UserManager.getUser() == null) {
            $("#check_box_hint").hide();
            $("#check_box_div").hide();
            $("#content-login").remove();
            let msgmodalNotConnected =
                `
                <div class="modal-message-noUser">
                    <span>
                        <p data-i18n="modals.standard.save.content.messages.saveConnect">
                            Pour enregistrer votre projet, veuillez vous connecter.
                        </p>
                        <a href="javascript:void(0)" class="btn btn-green" onClick="pseudoModal.closeLatestModal(); displayLogin();" data-i18n="navbar.items.user_shortcuts.willSignin">
                            Je me connecte
                        </a>
                        <span data-i18n="modals.standard.save.content.form.or">ou</span>
                        <a href="javascript:void(0)" class="btn btn-orange" onClick="pseudoModal.closeLatestModal(); displaySignup();" data-i18n="navbar.items.user_shortcuts.willSignup">
                            Je m'inscris !
                        </a>
                    </span>
                </div>
                `
            $('#modal-saveproject .modal-content-div').prepend(msgmodalNotConnected);
            $('#modal-saveproject').localize();
            setButton("modal-save-btn-confirm", false);
            setButton("modal-save-btn-copy", false);
            setButton("modal-save-btn-share", false);
        } else {
            $("#check_box_hint").show();
            $("#check_box_div").show();
            $("input[id=shareProjectSave]").on('change', function () {
                if (projectManager.getCurrentProject().link && !projectManager.needSaving()) {
                    if (($(this).is(':checked') && !projectManager.getCurrentProject().public) || (!$(this).is(':checked') && projectManager.getCurrentProject().public)) {
                        setButton("modal-save-btn-confirm", true);
                    } else {
                        setButton("modal-save-btn-confirm", false);
                    }
                }
            });
            $("#shareProjectSave").prop('checked', project.public);
            $('#modal-save-btn-confirm').prop('disabled', false);
            $("#modal-save-btn-share").click(function () {
                shareProject(projectManager.getCurrentProject().link);
            });
            if (project.link && (projectManager !== null ? !projectManager.needSaving() : true)) {
                setButton("modal-save-btn-share", true);
            } else {
                setButton("modal-save-btn-share", false);
            }
            if (project.link) {
                if (!projectManager.needSaving()) {
                    if (typeof vittaFormValidator !== 'undefined') {
                        const currentValidator = vittaFormValidator.getFormValidatorByName('saveProjectForm');
                        if (currentValidator) currentValidator.trigger('lockForm', i18next.t('code.tooltip.noNeedToSave'));
                    }
                    setButton("modal-save-btn-confirm", false);
                } else {
                    if (typeof vittaFormValidator !== 'undefined') {
                        const currentValidator = vittaFormValidator.getFormValidatorByName('saveProjectForm');
                        if (currentValidator) currentValidator.trigger('unlockForm');
                    }
                    setButton("modal-save-btn-confirm", true);
                }
                $("#save-name").val(decodeURI(project.name));
                let inputEvent = new Event('input');
                document.querySelector('#save-name').dispatchEvent(inputEvent); // Dispatching input event to trigger the VittaformValidator
                setButton("modal-save-btn-copy", true);
                $("#save-name").prop("disabled", true);
                $("#save-description").prop("disabled", true);
            } else {
                setButton("modal-save-btn-copy", false);
                $("#save-name").prop("disabled", false);
                $("#save-description").prop("disabled", false);
            }
        }
    };
    const getCurrentProject = function () {
        return projectManager !== null ? projectManager.getCurrentProject() : false;
    };

    // If there is a link (the project is saved in database), we wait for it to be fully loaded
    if ($_GET('link') !== null) {
        await projectManager.awaitForProjectLoad();
    }
    openSaveModal(getCurrentProject());
};

function overrideDialogPromise() {
    return new Promise(async function (resolve, reject) {
        if (await projectManager.projectExists() === true) {
            const projectName = document.querySelector('#edit_name').value;
            const projectDescription = document.querySelector('#edit_description').value;
            if (projectManager.needSaving() || projectName !== projectManager._currentProject.name || projectDescription !== projectManager._currentProject.description) {
                pseudoModal.openModal('modal-warningoverride');
                $('#btn_warning_override_project').click(function () {
                    resolve();
                });
                pseudoModal.clickOnExit('modal-warningoverride', function () {
                    reject();
                });

                $('#btn_warning_override_project_decline').click(function () {
                    var generateTheRightName = function (originalName, name, names, count) {
                        if (names.indexOf(name) != -1) {
                            count++;
                            let newName = originalName + "(" + count + ")";
                            return generateTheRightName(originalName, newName, names, count);
                        } else {
                            return name;
                        }
                    }
                    const projectsNames = projectManager.getMyProjects().map(project => project.name);
                    projectName = decodeURI(generateTheRightName(encodeURI(projectName), encodeURI(projectName), projectsNames, 0));
                    pseudoModal.closeModal("modal-warningoverride");
                    resolve();
                });
            } else {
                resolve();
            }
        } else {
            resolve();
        }
    });
};

function triggerEventsAfterSave() {
    setTimeout(function () {
        pseudoModal.resetMessage('modal-saveproject');
        pseudoModal.closeModal("modal-warningoverride");
        pseudoModal.closeModal("modal-saveproject");

        if (typeof AutoCorrector !== 'undefined' && AutoCorrector.exerciseCreationRequest) {
            pseudoModal.openModal('modal-exercise-statements');
            AutoCorrector.exerciseCreationRequest = false;
        }
    }, SAVE_TIMEOUT);
    $('#modal-save-btn-confirm').unbind('click');
};

async function saveConfirm() {
    const projectName = $("#save-name").val();
    if (projectName === '') {
        $('#save-name').addClass('is-invalid');
        pseudoModal.setMessage('modal-saveproject', i18next.t('modals.standard.save.content.messages.error.default'), 'error');
        setTimeout(function () {
            pseudoModal.resetMessage('modal-saveproject');
        }, SAVE_TIMEOUT);
        return;
    }
    // const isProjectNameAvailable = await projectManager.isProjectNameAvailable(projectName);
    // if (!isProjectNameAvailable) {
    //     $('#save-name').addClass('is-invalid');
    //     new VittaNotif().displayNotification('#modal-saveproject', i18next.t('notifications.projectNameAlreadyUsed'), 'bg-danger');
    //     return;
    // }
    $('#save-name').removeClass('is-invalid');
    const projectDescription = $("#save-description").val();
    const isPublic = (UserManager.getUser() == null) ? false : $("#shareProjectSave").is(':checked');
    $("#modal-save-btn-confirm").prop('disabled', true);
    await overrideDialogPromise();
    try {
        await projectManager.saveProject(projectName, projectDescription, isPublic);
        pseudoModal.setMessage('modal-warningoverride', i18next.t('modals.standard.save.content.messages.success.saved'), 'success');
        pseudoModal.setMessage('modal-saveproject', i18next.t('modals.standard.save.content.messages.success.saved'), 'success');
        $("#project-is-saved").css('color', 'var(--vitta-green)').html('<i class="fas fa-check"></i>');
        $("#save-name").prop("disabled", true);
        $("#save-description").prop("disabled", true);
        $('#btn_warning_override_project').unbind('click');
        const link = projectManager.getCurrentProject().link;
        if (link !== null) {
            let state = {};
            let title = '';
            history.pushState(state, title, replaceParam('link', link));
            projectManager.updateUrl();
            projectManager.updateMultiEditorLS(link, projectManager.getInterface());
            setButton("modal-save-btn-confirm", false);
            setButton("modal-save-btn-share", true);
            setButton("modal-save-btn-copy", true);
        }
    } catch (error) {
        console.error(error);
        displayFrontError();
    }
    triggerEventsAfterSave();
};

async function copyProject() {
    const newProjectName = $("#save-as-name").val();
    const newProjectDescription = $("#save-as-description").val();
    const newIsPublic = (UserManager.getUser() == null) ? false : $("#shareProjectSaveUnder").is(':checked');
    $("#modal-save-as-btn-confirm").prop('disabled', true);
    setTimeout(() => { //refactor later with something more robust
        $("#modal-save-as-btn-confirm").prop('disabled', false);
    }, SAVE_TIMEOUT);
    if (UserManager.getUser() != null) {
        const currentProjectLink = projectManager.getCurrentProject().link;
        const response = await projectManager.duplicateProject(currentProjectLink, newProjectName, newProjectDescription, newIsPublic);
        projectManager.setCurrentProjectParameters({
            link: response.link,
            id: response.id,
            dateUpdated: response.dateUpdated
        });
        projectManager.addToProjects(projectManager.getCurrentProject());
        updateAfterSaving(true);
    }
    $('#modal-save-btn-copy').unbind('click');
};

async function updateAfterSaving(isCopy = false) {
    if (projectManager.hasReachedQuota() == true) {
        pseudoModal.openModal('modal-backenderror');
        pseudoModal.setMessage('modal-backenderror', i18next.t('code.popups.newProject.warningQuota'), 'error');
        setTimeout(() => {
            pseudoModal.closeModal('modal-backenderror');
        }, SAVE_TIMEOUT);
    } else {
        if (UserManager.getUser() != null) {
            if (isCopy && Main.getInterface() !== "adacraft") {
                const link = projectManager._pastedProject.link;
                if (link !== null) {
                    window.open(
                        window.location.href.split('/?')[0] + '/?link=' + link,
                        '_blank'
                    );
                    pseudoModal.closeModal('modal-saveproject-under');
                }
            } else {
                $("#project-is-saved").css('color', 'var(--vitta-green)').html('<i class="fas fa-check"></i>');
                const link = projectManager.getCurrentProject().link;
                if (link !== null) {
                    let state = {};
                    let title = '';
                    history.pushState(state, title, replaceParam('link', link));
                    projectManager.updateUrl();
                    await projectManager.projectsFinder_updateProject();
                    projectManager.updateMultiEditorLS(link, projectManager.getInterface());
                }
                pseudoModal.setMessage('modal-saveproject-under', i18next.t('modals.standard.new.content.messages.success.new'), 'success');
                await new Promise((resolve, reject) => { setTimeout(resolve, SAVE_TIMEOUT) });
                pseudoModal.closeModal('modal-saveproject-under');
            }
            projectManager.populateAllProjects();
        }
    }
    return true;
}

/**
 * Open the list of projects
 */
async function openProjectBtn() {
    pseudoModal.openModal('modal-openproject');
    if (typeof projectManager === 'undefined' || projectManager == null
        || (projectManager !== null && !projectManager.isVisitor && !projectManager.myProjectsLoaded)
        || (projectManager !== null && projectManager.isVisitor && !projectManager.publicProjectsLoaded)
        || (projectManager !== null && projectManager.isVisitor && !projectManager.exampleProjectsLoaded)) {
        pseudoModal.newBlocker("modals.standard.open.warning-message", 'modal-openproject', '2rem');
    }
    $(".openproject-subtitle").rotate({
        bind: {
            click: function () {
                toggleProjectSection(this);
            },
        },
    });

    $(".openproject-list").on('keypress', function (event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            toggleProjectSection(this.firstElementChild);
        }
    });

    if (typeof projectManager !== 'undefined' && projectManager) {
        projectManager.populateAllProjects();
    }

    const searchProjectInput = document.querySelector('#search-project-input');
    if (searchProjectInput.isSearchKeyUpEvent) return; // We avoid to duplicate a previously created event listener
    $("#search-project-input").keyup(function () {
        try { // We are using try/catch blocks as errors are caught within jquery keyup callback
            const keyword = $("#search-project-input").val();
            const emptySearch = (keyword.length === 0 || !keyword.trim());
            if (emptySearch === true) {
                projectManager.populateAllProjects();
            } else {
                const callback = function (projects) {
                    return projectManager.projectsFinder_search(projects, keyword);
                };
                projectManager.populateAllProjects(callback);
            }
        } catch (error) { console.error(error) }
    });

    $("#modal-openproject").localize();
    searchProjectInput.isSearchKeyUpEvent = true;
    return true;
};

function toggleProjectSection(element) {
    let drop = $(element).find(".list-dropdown");
    let content = $(element).parent().find(".open-project-content");

    if (drop.hasClass("dropped")) {
        drop.rotate({
            angle: drop.getRotateAngle(),
            animateTo: 0
        });
        content.slideUp("fast", function () {
            drop.removeClass("dropped");
        });
    } else {
        drop.rotate({
            angle: drop.getRotateAngle(),
            animateTo: 90
        });
        $(".openproject-subtitle").each(function (index, element) {
            let drop = $(element).find(".list-dropdown");
            let content = $(element).parent().find(".open-project-content");
            if (drop.hasClass("dropped")) {
                drop.rotate({
                    angle: drop.getRotateAngle(),
                    animateTo: 0
                });
                content.slideUp("fast", function () {
                    drop.removeClass("dropped");
                });
            }
        });
        content.slideDown("fast", function () {
            drop.addClass("dropped");
        });
    }
}

/**
 * Generate the HTML code for a given project
 * @param {object} project
 * @param {string} parentDivId
 */
function _generateProjectDiv(project, parentDivId) {
    if (typeof parentDivId === 'object') parentDivId = parentDivId[0].id;
    const name = decodeURI(project.name);
    let description = decodeURI(project.description);
    // The purpose of the block below is to convert the html entities to be correctly displayed in the tooltip
    if (description.length > 0) {
        const textarea = document.createElement("textarea");
        let previous = "";
        while (description !== previous) {
            textarea.innerHTML = description;
            previous = description;
            description = textarea.value;
        }
    }
    const dateUpdatedAsText = dateAsText(project.dateUpdated.date);
    let projectDiv = $('<div />');
    projectDiv.attr("class", "project-item");
    projectDiv.attr("data-toggle", "tooltip");
    projectDiv.attr("data-placement", "top");
    projectDiv.attr("data-html", "true");
    projectDiv.attr("title", (description.length > 0) ? description : `${i18next.t('code.popups.openProject.categories.projectsList.description')}`);
    $(document).ready(function () {
        projectDiv.tooltip({
            trigger: 'hover',
            boundary: 'window'
        });
    });
    let htmlString = "";
    let publicHtml = "";
    if (parentDivId == "my-projects") {
        if (project.public !== null) {
            publicHtml += (project.public === true) ?
                "<span data-i18n='[html]code.popups.openProject.categories.public' class= 'ms-1 me-1' style='font-size:11px; font-weight:normal;'>&nbsp;Public</span><span><i class='fa fa-globe' style='font-size: 11px;'></i></span>" :
                "<span data-i18n='[html]code.popups.openProject.categories.private' class= 'ms-1 me-1' style='font-size:11px; font-weight:normal;'>Privée</span><span><i class='fa fa-lock' style='font-size: 11px;'></i></span>";
        }
        htmlString += '<div style="flex:1; justify-content:center; align-items:center; align-content:center;">';
    } else {
        let authorFullname;
        if (project.authorFullname) {
            authorFullname = project.authorFullname;
        } else if (project.user) {
            authorFullname = project.user.firstname + " " + project.user.surname;
        } else {
            authorFullname = i18next.t('code.popups.openProject.categories.anonymous');
        }

        const userLink = typeof project.authorId !== 'undefined'
            ? `/userDetails?id=${project.authorId}`
            : '#'

        publicHtml += `<span data-i18n="[html]code.popups.openProject.categories.sharedBy" data-i18n-options=\'{"authorName": "${authorFullname}", "authorLink": "${userLink}" }\' style='font-size:11px; font-weight:normal;'>&nbsp;Partagé par <a href="${userLink}" target="_blank"> ${authorFullname}</a></span>`;
        htmlString += '<div style="flex:1; justify-content:space-between" display:flex; class="ide-modal-sharedproject-item">';
    }
    htmlString +=
        `<b class="project-info">
        <span class="fa fa-code"></span> 
        <span class="project-name">${name}</span>`;
    htmlString += publicHtml;
    htmlString += `</b><span class="project-date">${dateUpdatedAsText}</span></div>`;
    htmlString += '<div>';
    htmlString += '<button style="font-size:10px;" data-i18n="[html]code.popups.openProject.categories.projectsList.buttons.open" class="btn vitta-button me-1" onclick=openProject(\'' + project.link + '\')>Ouvrir<span class="fa fa-arrow-circle-right"></span></button>';
    htmlString += '<button style="font-size:10px;" data-i18n="[html]code.popups.openProject.categories.projectsList.buttons.shared" class="btn vitta-button me-1" id="btn_share" onclick=shareProject("' + project.link + '")>Partager <span class="fa fa-link"></span></button>';
    htmlString += '<button style="font-size:10px;" data-i18n="[html]code.popups.openProject.categories.projectsList.buttons.embed" class="btn vitta-button me-1" id="btn_integer" onclick=integerProject("' + project.link + '")>Intégrer <span class="fa fa-code"></span></button>';
    if (parentDivId == "my-projects") {
        htmlString += '<button style="font-size:10px;" data-i18n="[html]code.popups.openProject.categories.projectsList.buttons.delete" class="btn btn-danger" onclick=deleteProject("' + project.link + '")>Supprimer <span class="fas fa-trash"></span></button>';
    }
    htmlString += '</div>';

    projectDiv.html(htmlString);

    return projectDiv;
};

function generateSubCategoriesButton(parentDiv) {
    // setup the Toggle All button
    const toggleAllButton = $('<button />');
    toggleAllButton.attr("class", "btn btn-outline-primary btn-sm mx-auto my-2 d-block");
    toggleAllButton.attr("id", "toggle-all-button");
    // add event listener to the button
    toggleAllButton.on("click", function () {
        // remove the .open class from all the categories as well as the aria-expanded attribute set to false
        $(toggleAllButton).parent().find(".category-title").each(function () {
            if ($(this).attr("aria-expanded") == "true") {
                $(this).attr("aria-expanded", "false");
            } else {
                $(this).attr("aria-expanded", "true");
            }
        });

        // find all divs with the class .collapse and remove the .show class
        $(toggleAllButton).parent().find(".collapse").each(function () {
            if ($(this).hasClass("show")) {
                $(this).removeClass("show");
            } else {
                $(this).addClass("show");
            }
        });
    });
    toggleAllButton.html(i18next.t('modals.standard.open.toggle-all'));
    parentDiv.append(toggleAllButton);
};

/**
 * Populate a project division using the projects passed in argument and the parent division ID.
 * @param {array} projects 
 * @param {string} parentDivId
 */
function populateProjects(projects, parentDivId) {
    const parentDiv = $("#" + parentDivId);
    parentDiv.html("");

    if (parentDivId == "my-projects") {
        if (UserManager.getUser() === null) {
            let htmlNotConnected =
                `<div class="d-flex flex-column justify-content-center text-center py-5">
                    <span class="text-center" data-i18n='modals.standard.open.content.messages.openConnect'>Pour ouvrir vos projets, veuillez vous connecter. </span>
                    <span>
                        <a href="javascript:void(0)" class="login-modal" onClick="pseudoModal.closeLatestModal(); displayLogin();" data-i18n="navbar.items.user_shortcuts.willSignin"> Je me connecte </a>
                        <span data-i18n='modals.standard.open.content.form.or'>ou</span>
                        <a href="javascript:void(0)" class="login-modal" onClick="pseudoModal.closeLatestModal(); displaySignup();" data-i18n="navbar.items.user_shortcuts.willSignup"> Je m'inscris !</a>
                    </span>
                </div>`;
            parentDiv.html(htmlNotConnected);
            parentDiv.localize();
            return;
        }
    }

    const populate = (projects, div) => {
        sortByDate(projects);
        projects.forEach(function (i) {
            parentDiv.append(_generateProjectDiv(i, div));
        });
    };

    $("#" + parentDivId + "-count").attr("class", "project-count badge bg-" + (projects.length === 0 ? "secondary" : "success"));
    $("#" + parentDivId + "-count").text(projects.length);
    if (projects.length == 0) {
        parentDiv.html(`<div class='no-project py-5'><b>${i18next.t('modals.standard.open.no-project')}</b></div>`);
        return;
    }

    else if (parentDivId == "example-projects") {

        const categoryKeys = projects.map(project => project.exampleCategory).filter(project => project !== null);

        if (categoryKeys.length !== projects.length) {
            populate(projects, parentDiv);
        } else {
            generateSubCategoriesButton(parentDiv);

            const categories = categoryKeys.filter((item, index) => categoryKeys.indexOf(item) === index);
            categories.forEach(function (cat) {
                // get projects of current category
                const categoryProjects = projects.filter(project => project.exampleCategory === cat);
                // create the category title toggler
                const categoryTitle =
                    `<button class="category-title mb-1" data-bs-toggle="collapse" data-bs-target="#${cat}-content" aria-expanded="false" aria-controls="${cat}-content">
                        <i class='fas fa-chevron-right'></i>${i18next.t('modals.standard.open.content.exampleCategories.' + cat)} <span class='badge bg-primary'>${categoryProjects.length}</span>
                    </button>`;
                // create the category content
                let categoryContent = `<div id="${cat}-content" class="collapse">`;
                categoryProjects.forEach(function (project) {
                    categoryContent += _generateProjectDiv(project, parentDivId).html();
                });
                categoryContent += '</div>';
                // append category to project div
                parentDiv.append(`<div id="${cat}">` + categoryTitle + categoryContent + '</div>');
            });
        }
    } else {
        populate(projects, parentDiv);
    }
};

$('#blockly-setting').click(function () {
    pseudoModal.openModal('modal-blocklysettings');

    var accessForm = document.querySelector('#access-form-ide');
    accessForm.addEventListener("change", function (e) {
        updateWebsiteAcessibility($(this));
    });

    if (INTERFACE_NAME === 'ai') {
        document.querySelector('#blocks-settings-style').style.display = 'none';
        return;
    }

    if (getParamValue('mode') === 'codeOnly') {
        $('#blocks-settings-style').hide();
    }

    if (Main.inIframe()) {
        $('#modal-blockly-knowmore').hide();
    }
});

/**
 * Display error on save modal according to the error status.
 * @param {Array<Object>} projects 
 */
function displayFrontError(status, modalId = 'modal-saveproject') {
    switch (status) {
        case PROJECT_NAME_ERROR:
            pseudoModal.setMessage(modalId, i18next.t('modals.standard.save.content.messages.error.name'), 'error');
            break;
        case VISITOR_PROJECTS_SIZE_ERROR:
            pseudoModal.setMessage(modalId, i18next.t('modals.standard.save.content.messages.error.visitorQuotaSave'), 'error');
            break;
        case USER_PROJECTS_SIZE_ERROR:
            pseudoModal.setMessage(modalId, i18next.t('modals.standard.save.content.messages.error.userQuotaSave'), 'error');
            break;
        default:
            pseudoModal.setMessage(modalId, i18next.t('modals.standard.save.content.messages.error.default'), 'error');
    }
};

/**
 * Sort the project array starting by the recently dateUpdated.date.
 * @param {Array<Object>} projects 
 */
function sortByDate(projects) {
    projects.sort(function (project1, project2) {
        const date_p1 = project1.dateUpdated.date.split(' ')[0].split('-');
        const hour_p1 = project1.dateUpdated.date.split(' ')[1].split(':');
        const date_p2 = project2.dateUpdated.date.split(' ')[0].split('-');
        const hour_p2 = project2.dateUpdated.date.split(' ')[1].split(':');
        const date1 = new Date(date_p1[0], date_p1[1], date_p1[2], hour_p1[0], hour_p1[1], hour_p1[2]);
        const date2 = new Date(date_p2[0], date_p2[1], date_p2[2], hour_p2[0], hour_p2[1], hour_p2[2]);
        return -(date1.getTime() - date2.getTime());
    });
};

$('body').on('click', '#modal-new-btn-create, #readOnlyCopyBtn', async function () {
    projectManager.setIsLoadedProject(false);
    const projectName = $("#new_name").val() ? $("#new_name").val() : "No-name";
    const description = $("#new_description").val() ? $("#new_description").val() : "No-description";
    // const isProjectNameAvailable = await projectManager.isProjectNameAvailable(projectName);
    // if (!isProjectNameAvailable) {
    //     new VittaNotif().displayNotification('#modal-newproject', i18next.t('notifications.projectNameAlreadyUsed'), 'bg-danger');
    //     return;
    // }
    if (document.getElementById("blur-div") != null) {
        document.getElementById("blur-div").remove();
    }
    if (INTERFACE_NAME == 'adacraft') {
        await createProjectProcess({
            'name': projectName,
            'description': description
        });
        setTimeout(function () {
            location.reload();
        }, 200);
    } else {
        if (projectManager._multiManager && projectManager._multiManager.isIframe()) {
            projectManager._multiManager.closeDuo();
            projectManager._multiManager.deleteMultiOptions();
        }
        if (this.id == 'readOnlyCopyBtn' || $('#shareProjectNewCopie').is(':checked')) {
            let projectCode, projectCodeText;
            if (INTERFACE_NAME === 'ai') {
                projectCode = null;
                projectCodeText = null;
                aiMain._controller.setProjectDataRetention(true);
            } else {
                projectCode = CodeManager.getSharedInstance().getXml();
                projectCodeText = CodeManager.getSharedInstance().getTextCode();
            }
            createProjectProcess({
                'name': projectName,
                'description': description,
                'code': projectCode,
                'codeText': projectCodeText,
                'isPublic': false
            });
        } else {
            if (INTERFACE_NAME !== 'ai') {
                // By default, when a program is created, we put the interface in mixed mode
                switchMixedMode();
            }
            createProjectProcess({
                'name': projectName,
                'description': description
            });
        }
        // The following block is responsible for RTC management (reinitialization/initialization)
        if (typeof rtcManager !== 'undefined' && rtcManager != null) {
            clearInterval(rtcManager.divInterval);
            if (rtcManager.socket.connected == true) {
                rtcManager.socket.disconnect();
            }
            rtcManager = null;
            $("#users").html("");
        }
        await projectManager.initializeRtc();
    }

    async function createProjectProcess(project) {
        if ($("#toolboxRestriction").is(':checked')) {
            $("input[name='toolboxRestrictionName']#toolboxRestriction").removeAttr("checked");
            Main.restrictToolbox();
        }
        projectManager.localStorageManager.removeLocalId();
        const status = await projectManager.newProject(project);
        if (status) {
            if (projectManager._exerciseStatement && projectManager._exerciseStatement._statementContentElt) {
                projectManager._exerciseStatement.updateStatementContent('');
                projectManager._exerciseStatement.displayStatement();
            }
            pseudoModal.setMessage('modal-newproject', i18next.t('modals.standard.new.content.messages.success.new'), 'success');
            $("#project-is-saved").css('color', 'var(--vitta-green)').html('<i class="fas fa-check"></i>');
            let state = {};
            let title = '';
            history.pushState(state, title, removeParam("link", window.location.href));
            if (UserManager.getUser() != null) {
                await projectManager.saveProject(project.name, project.description);
                if (INTERFACE_NAME === 'ai') {
                    if (aiMain._controller.getProjectDataRetention()) {
                        aiMain._controller.setProjectDataRetention(false);
                        projectManager.localStorageManager.addLocalId();
                        return;
                    }
                    aiMain._model.clearModel();
                    if (aiMain._model.getAiInterfaceType() != 'text' && aiMain._model.getCategories().length <= 0) aiMain._model.addCategory()
                    aiMain._controller._updateIdeAfterSaving();
                    setTimeout(function () {
                        pseudoModal.closeModal('modal-newproject');
                    }, SAVE_TIMEOUT);
                    projectManager.localStorageManager.addLocalId();
                    return;
                }
                updateAfterSaving();
                await resetInterfaceForNewProject();
                setTimeout(function () {
                    pseudoModal.closeModal('modal-newproject');
                }, SAVE_TIMEOUT);
            } else {
                projectManager.localStorageManager.addLocalId();
                projectManager.localStorageManager.setLocalProject(project);
                pseudoModal.closeModal('modal-newproject');
                if (INTERFACE_NAME === 'ai' && !aiMain._controller.getProjectDataRetention()) {
                    aiMain._model.clearModel();
                    aiMain._controller.setProjectDataRetention(false);
                }
            }
            setTimeout(function () {
                if (document.getElementById('blockly-readonly') != null) {
                    document.getElementById('blockly-readonly').remove();
                }
                if (document.getElementById('readOnlyAlert') != null) {
                    document.getElementById('readOnlyAlert').remove();
                }
                $(".blocklyToolboxDiv").show();
                if (getParamValue('mode') == 'code') {
                    Main.setOptionForEditor("readOnly", false);
                }
            }, 100);
        } else {
            projectManager.localStorageManager.addLocalId();
            pseudoModal.openModal('modal-backenderror');
        }
        return new Promise(function (resolve, reject) {
            resolve();
        });
    }
});

async function resetInterfaceForNewProject() {
    if (Main.hasAutoCorrector()) {
        AutoCorrector.reset();
        if (Simulator.isOpen) {
            $("#training-mode").click();
        }
        $("#simulator-switcher").hide();
    }
    if (Main.getInterface() == 'python') {
        await PythonRun.reset();
    }
    if (typeof rtcInterfaces != undefined && rtcInterfaces.includes(Main.getInterface())) {
        setTimeout(function () {
            rtcManager = new RtcManager();
            rtcManager.init();
        }, 10);
    }
};

$('body').on('click', '#modal-new-btn-cancel', function () {
    pseudoModal.closeModal('modal-newproject');
});

function closeDownloadProjectInfo() {
    pseudoModal.closeModal('modal-downloadproject-info');
    saveProjectbtn();
};

function fileUploaderInit() {
    if (typeof i18next !== 'undefined' && i18next.isInitialized && $("#importproject-fileinput").length > 0) {
        $('#modal-openproject').find(".file-drop-zone-title").html(i18next.t('modals.standard.open.content.file-input.dropZoneTitle'));
        $('#modal-openproject').find(".file-caption-name").attr('placeholder', i18next.t('modals.standard.open.content.file-input.msgPlaceholder'));
        $('#modal-openproject').find(".hidden-xs").html(i18next.t('modals.standard.open.content.file-input.btnBrowse'));
        $('#modal-openproject').find(".btn-file").removeClass('btn-primary');
        $('#modal-openproject').find(".btn-file").addClass('browse-button');
    } else {
        setTimeout(fileUploaderInit, 250);
    }
};
async function sendReportAiTextByMail(email, message) {
    function sendSupportMail(email, message) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: "/openInterface/interfaces/assets/mailReportAiText.php",
                data: {
                    'email': email,
                    'body': message
                },
                success: function (response) {
                    resolve(response);
                },
                error: function () {
                    UIManager.showErrorMessage('error-display', AJAX_SERVER_ERROR[getCookie('lng')]);
                    reject();
                }
            });
        })
    }
    const sendMailInviteResponse = await sendSupportMail(email, message);
    const emailSendNotification = new VittaNotif(),
        responseParsed = JSON.parse(sendMailInviteResponse),
        responseMessage = responseParsed.message;
    const notificationType = responseParsed.success == true ? 'bg-success' : 'bg-danger';
    emailSendNotification.displayNotification('#global-notifications-area', i18next.t(`notifications.${responseMessage}`), notificationType);
}

async function sendInviteByMail(email, message, right) {
    function sendMailInvite(email, body) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: "/openInterface/interfaces/assets/mailInvite.php",
                data: {
                    'email': email,
                    'body': body
                },
                success: function (response) {
                    resolve(response);
                },
                error: function () {
                    UIManager.showErrorMessage('error-display', AJAX_SERVER_ERROR[getCookie('lng')]);
                    reject();
                }
            });
        })
    }
    function addNewUserToSharedList(email, right) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=project&action=add_shared_user_to_my_project",
                data: {
                    "project_id": projectManager._currentProject.id,
                    "shared_user_id": email,
                    "shared_right": right
                },
                dataType: "JSON",
                success: function (response) {
                    resolve(response);
                },
                error: function () {
                    UIManager.showErrorMessage('error-display', AJAX_SERVER_ERROR[getCookie('lng')]);
                    reject();
                }
            });
        })
    }
    const sendMailInviteResponse = await sendMailInvite(email, message);
    const emailSendNotification = new VittaNotif(),
        responseParsed = JSON.parse(sendMailInviteResponse),
        responseMessage = responseParsed.message;
    const notificationType = responseParsed.success == true ? 'bg-success' : 'bg-danger';
    emailSendNotification.displayNotification('#email-notification-area', i18next.t(`notifications.${responseMessage}`), notificationType);
    const addNewUserToSharedListResponse = await addNewUserToSharedList(email, right);
    if (addNewUserToSharedListResponse.success == false) {
        const emailSendNotification = new VittaNotif();
        emailSendNotification.displayNotification('#email-notification-area', "Erreur lors de l'ajout de la personne au projet", 'bg-danger');
        return;
    }
    rtcManager.socket.emit('sharedUserAdded', { room: projectManager.getCurrentProject().link, project: projectManager.getCurrentProject() });

    const newSharedUser = {
        name: email,
        right: right,
        userId: email
    };
    let newSharedUsersList = [];
    const currentSharedUsers = JSON.parse(projectManager._currentProject.sharedUsers) == null ? [] : JSON.parse(projectManager._currentProject.sharedUsers);
    newSharedUsersList = [...currentSharedUsers, newSharedUser];
    projectManager._currentProject.sharedUsers = JSON.stringify(newSharedUsersList);
}

function downloadCanvas(e) {
    if (e.target && e.target.id && e.target.id == 'download-qrcode') {
        const link = document.createElement("a");
        link.download = document.querySelector('#project-name').textContent + "-qrcode.png";
        link.href = document.querySelector('#qrcode canvas').toDataURL("image/png");
        link.click();
    }
}
document.addEventListener('click', downloadCanvas);

function copyQrToClipboard(e) {
    if (e.target && e.target.id && e.target.id == 'copy-qrcode') {
        const canvas = document.querySelector('#qrcode canvas');
        canvas.toBlob(addToClipboard, 'image/png')
    }
}

async function addToClipboard(blob) {
    try {
        const data = [new ClipboardItem({ [blob.type]: blob })];
        await navigator.clipboard.write(data);
        const successNotif = new VittaNotif()
        successNotif.displayNotification('#qr-action-notif', 'Le QR code a été copié avec succès', 'bg-success')
    } catch (error) {
        console.error(error);
    }
}
document.addEventListener('click', copyQrToClipboard);

$('body').on('click', '.vitta-modal-exit-btn', function () {
    if (document.querySelector('#blur-div') != null) {
        document.querySelector('#blur-div').remove();
    }
});