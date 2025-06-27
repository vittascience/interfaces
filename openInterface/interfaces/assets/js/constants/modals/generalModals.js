let stdModals = {};

(async () => {
    await awaitJsonPath();
    return stdModals = {
        'modal-exportproject': {
            selector: '',
            header: {
                icon: 'fas fa-link',
                title: 'modals.standard.export.title'
            },
            content: `
            <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="csv-tab" data-bs-toggle="tab" data-bs-target="#csv" type="button" role="tab" aria-controls="csv" aria-selected="true">CSV</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="csv-tab" data-bs-toggle="tab" data-bs-target="#txt" type="button" role="tab" aria-controls="txt" aria-selected="false">TXT</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="api-tab" data-bs-toggle="tab" data-bs-target="#api" type="button" role="tab" aria-controls="api" aria-selected="false">API</button>
                </li>
            </ul>
    
            <div class="tab-content">
                <div class="tab-pane active" id="csv" role="tabpanel" aria-labelledby="csv-tab" tabindex="0">
                    <div class="hint alert alert-info alert-lite">
                        <i class="fa fa-info-circle"></i>
                        <span data-i18n="modals.standard.export.content.csv.hint">${jsonPath('modals.standard.export.content.csv.notice')}</span>
                    </div>
                    <div class="alert alert-warning" style="display:none;">
                        <i class="fa fa-exclamation-triangle"></i>
                        <span data-i18n="modals.standard.export.content.warning">${jsonPath('modals.standard.export.content.warning')}</span>
                    </div>
                    <button type="button" class="btn btn-primary tracer-export d-block my-3 mx-auto" id="export-traceur" onclick="exportInCSV()" data-i18n="modals.standard.export.content.csv.button">${jsonPath('modals.standard.export.content.csv.button')}</button>
                </div>
                <div class="tab-pane" id="txt" role="tabpanel" aria-labelledby="txt-tab" tabindex="0">
                    <div class="hint alert alert-info alert-lite">
                        <i class="fa fa-info-circle"></i>
                        <span data-i18n="modals.standard.export.content.csv.hint">${jsonPath('modals.standard.export.content.txt.notice')}</span>
                    </div>
                    <div id="data-name"></div>
                    <div class="alert alert-warning" style="display:none;">
                        <i class="fa fa-exclamation-triangle"></i>
                        <span data-i18n="modals.standard.export.content.warning">${jsonPath('modals.standard.export.content.warning')}</span>
                    </div>
                    <button type="button" class="btn btn-primary tracer-export d-block my-3 mx-auto" id="export-traceur" onclick="exportInTXT()" data-i18n="modals.standard.export.content.txt.button">${jsonPath('modals.standard.export.content.csv.button')}</button>
                </div>
                <div class="tab-pane" id="api" role="tabpanel" aria-labelledby="api-tab" tabindex="0">
                    <div class="hint alert alert-info alert-lite">
                        <i class="fa fa-info-circle"></i>
                        <span data-i18n="modals.standard.export.content.api.hint">${jsonPath('modals.standard.export.content.api.notice')}</span>
                    </div>
    
                    <p class="border rounded mb-1 px-4 py-3">
                        <b data-i18n="modals.standard.export.content.api.howTo">${jsonPath('modals.standard.export.content.api.howTo')}</b><br>
                        <span data-i18n="modals.standard.export.content.api.howToContent">${jsonPath('modals.standard.export.content.api.howToContent')}</span>
                    </p>
    
                    <div class="alert alert-warning" id="api-warning" style="display: none;">
                        <i class="fa fa-exclamation-triangle"></i>
                        <span data-i18n="modals.standard.export.content.api.warning">${jsonPath('modals.standard.export.content.api.warning')}</span>
                    </div>
    
                    <div id="api-key-form">
                        <label for="api-key-input" data-i18n="modals.standard.export.content.api.link" class="mt-3">${jsonPath('modals.standard.export.content.api.link')}</label>
                        <div class="d-flex mt-1">
                            <input id="api-key-input" value="" class="form-control" readonly="readonly" style="border-top-right-radius:0; border-bottom-right-radius: 0;">
                            <button class="btn vitta-button" id="copy-link" style="border-top-left-radius: 0; border-bottom-left-radius: 0;">
                            <i class="fas fa-copy"></i>
                            </button>
                        </div>
                        <div class="form-text">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="apiSwitch" onclick="enableApi()">
                                <label class="form-check-label" for="apiSwitch">${jsonPath('modals.standard.export.content.api.activate')}</label>
                            </div>  
                        </div>  
                    </div>
                </div>
            </div>`,
            footer: ``
        },
        'modal-download-texas-info': {
            selector: '',
            header: {
                icon: 'far fa-question-circle',
                title: 'modals.help-modals.download-ti.title'
            },
            content: `<div>
                    <p>${window.maClasseTiIntegration ? jsonPath('modals.help-modals.download-ti.content.to-transfer-MaClasseTI') : jsonPath('modals.help-modals.download-ti.content.to-transfer')}</p>
                        <ol>
                            <li data-i18n="[html]modals.help-modals.download-ti.content.step-1">${jsonPath('modals.help-modals.download-ti.content.step-1')}</li>
                            <li data-i18n="[html]modals.help-modals.download-ti.content.step-2">${jsonPath('modals.help-modals.download-ti.content.step-2')}</li>
                            <li data-i18n="[html]modals.help-modals.download-ti.content.step-3">${jsonPath('modals.help-modals.download-ti.content.step-3')}</li>
                            <li data-i18n="[html]modals.help-modals.download-ti.content.step-4">${jsonPath('modals.help-modals.download-ti.content.step-4')}</li>
                            <li data-i18n="[html]modals.help-modals.download-ti.content.step-5">${jsonPath('modals.help-modals.download-ti.content.step-5')}</li>
                            <li data-i18n="[html]modals.help-modals.download-ti.content.step-6">${jsonPath('modals.help-modals.download-ti.content.step-6')}</li>
                            <li data-i18n="[html]modals.help-modals.download-ti.content.step-7">${jsonPath('modals.help-modals.download-ti.content.step-7')}</li>
                        </ol>
                        <a data-i18n="[html]modals.help-modals.download-ti.content.know-more" ${window.maClasseTiIntegration ? 'href="https://fr.vittascience.com/learn/?search=TI-83" target="_blank"' : 'href="/learn/?search=TI-83"'}>${jsonPath('modals.help-modals.download-ti.content.know-more')}</a>
                    </p>
                </div>`,
            footer: `<button type="button" onclick="pseudoModal.closeModal('modal-download-texas-info')" class="btn vitta-button" data-i18n="modals.help-modals.understood">
            ${jsonPath('modals.help-modals.understood')}
                </button>`
        },
        'modal-download-hex-info': {
            selector: '',
            header: {
                icon: 'far fa-question-circle',
                title: 'modals.help-modals.download-hex.title'
            },
            content: `<div>
                    <p>${jsonPath('modals.help-modals.download-hex.content.to-transfer')}</p>
                        <ol>
                            <li data-i18n="[html]modals.help-modals.download-hex.content.step-1">${jsonPath('modals.help-modals.download-hex.content.step-1')}</li>
                            <li data-i18n="[html]modals.help-modals.download-hex.content.step-2">${jsonPath('modals.help-modals.download-hex.content.step-2')}</li>
                            <li data-i18n="[html]modals.help-modals.download-hex.content.step-3">${jsonPath('modals.help-modals.download-hex.content.step-3')}</li>
                            <li data-i18n="[html]modals.help-modals.download-hex.content.step-4">${jsonPath('modals.help-modals.download-hex.content.step-4')}</li>
                        </ol>
                        ${jsonPath('modals.help-modals.download-hex.content.help')}
                    </p>
                </div>`,
            footer: `<button type="button" onclick="pseudoModal.closeModal('modal-download-hex-info')" class="btn vitta-button" data-i18n="modals.help-modals.understood">
                    ${jsonPath('modals.help-modals.understood')}
                </button>`
        },
        'modal-warning-ti-boards': {
            selector: '',
            header: {
                icon: 'fa fa-exclamation-circle',
                title: 'modals.warning.default.title',
            },
            content: `<span class="fa fa-exclamation-circle"></span><span>
                ${jsonPath('modals.help-modals.ti-warning-boards.content')}
                </span>`,
            footer: `<button type="button" onclick="pseudoModal.closeModal('modal-warning-ti-boards')" class="btn vitta-button" data-i18n="modals.help-modals.understood">
                    ${jsonPath('modals.help-modals.understood')}
                </button>`
        },
        'modal-warning-ti-systems': {
            selector: '',
            header: {
                icon: 'fa fa-exclamation-circle',
                title: 'modals.warning.default.title',
            },
            content: `<span class="fa fa-exclamation-circle"></span><span>
                    ${jsonPath('modals.help-modals.ti-warning-systems.content')}
                </span>`,
            footer: `<button type="button" onclick="pseudoModal.closeModal('modal-warning-ti-systems')" class="btn vitta-button" data-i18n="modals.help-modals.understood">
                    ${jsonPath('modals.help-modals.understood')}
                </button>`
        },
        'modal-warning-microbit-systems': {
            selector: '',
            header: {
                icon: 'fa fa-exclamation-circle',
                title: 'modals.warning.default.title',
            },
            content: `<span class="fa fa-exclamation-circle"></span><span>
                    ${jsonPath('modals.help-modals.microbit-warning-systems.content')}
                </span>`,
            footer: `<button type="button" onclick="pseudoModal.closeModal('modal-warning-microbit-systems')" class="btn vitta-button" data-i18n="modals.help-modals.understood">
                    ${jsonPath('modals.help-modals.understood')}
                </button>`
        },
        'modal-downloadproject-info': {
            selector: '',
            header: {
                icon: 'far fa-question-circle',
                title: 'modals.help-modals.download-project.title'
            },
            content: `<div>
                    <p>${jsonPath('modals.help-modals.download-project.content.to-save')}</p>
                        <ol>
                            <li>${jsonPath('modals.help-modals.download-project.content.step-1')}</li>
                            <li>${jsonPath('modals.help-modals.download-project.content.step-2') + '<i>' + (["arduino", "mbot", "letsstartcoding"].includes(INTERFACE_NAME) ? jsonPath('modals.help-modals.download-project.type.arduino.name') : jsonPath('modals.help-modals.download-project.type.python.name')) + '</i>' + jsonPath('modals.help-modals.download-project.content.step-2-bis')}</li>
                            <li>${jsonPath('modals.help-modals.download-project.content.step-3')} <i class="fas fa-folder-open"></i> ${jsonPath('modals.help-modals.download-project.content.step-3-bis')}</li>
                            <li>${jsonPath('modals.help-modals.download-project.content.step-4') + ' (<i>' + (["arduino", "mbot", "letsstartcoding"].includes(INTERFACE_NAME) ? jsonPath('modals.help-modals.download-project.type.arduino.extension') : jsonPath('modals.help-modals.download-project.type.python.extension')) + '</i>) ' + jsonPath('modals.help-modals.download-project.content.step-4-bis')}</li>
                            <li>${jsonPath('modals.help-modals.download-project.content.step-5')}</li>
                        </ol>
                    </p>
                </div>`,
            footer: `<button type="button" onclick="closeDownloadProjectInfo()" class="btn vitta-button" data-i18n="modals.help-modals.understood">
                        ${jsonPath('modals.help-modals.understood')}
                    </button>`
        },
        'modal-help': {
            selector: '',
            header: {
                icon: 'far fa-question-circle',
                title: 'modals.standard.help.title'
            },
            content: `<div>
                        <p class="hint">
                            ${jsonPath('modals.standard.help.noticeCommon.welcome')}${jsonPath('modals.standard.help.noticeHint.' + INTERFACE_NAME + '.name')}<br><br>
                            ${jsonPath('modals.standard.help.noticeHint.' + INTERFACE_NAME + '.learn')}<a href="${jsonPath('modals.standard.help.noticeHint.' + INTERFACE_NAME + '.learn-link')}" target="_blank" rel="noopener noreferrer">${jsonPath('modals.standard.help.noticeCommon.doc')}</a> ${jsonPath('modals.standard.help.noticeCommon.or')} <a href="https://vittascience.com/wiki?interface=${INTERFACE_NAME}" target="_blank" rel="noopener noreferrer">${jsonPath('modals.standard.help.noticeCommon.glossary')}</a><br><br>
                            ${INTERFACE_NAME != 'python' ? `${jsonPath('modals.standard.help.noticeCommon.libraries')}<a href="${jsonPath('modals.standard.help.noticeHint.' + INTERFACE_NAME + '.libraries-link')}" target="_blank" rel="noopener noreferrer">${jsonPath('modals.standard.help.noticeCommon.repoGithub')}<a/><br><br>` : ''}
                            ${jsonPath('modals.standard.help.noticeCommon.fellowship')}</a><br><br>
                            ${jsonPath('modals.standard.help.noticeCommon.tutorials')}<br><br>
                            ${jsonPath('modals.standard.help.noticeCommon.contact')}&#x1F642
                        </p>
                    </div>`,
            footer: `<button type="button" id="modal-help-btn-back" onclick="pseudoModal.closeLatestModal()"class="btn v-btn-basic" data-i18n="[html]modals.standard.help.buttons.back">
                        ${jsonPath('modals.standard.help.buttons.back')}
                    </button>`
        },
        'modal-blocklysettings': {
            selector: '',
            header: {
                icon: 'fas fa-low-vision',
                title: 'modals.standard.accessibilitySettings.title'
            },
            content: `<form id="options" style="display: flex; flex-direction: column;">
                </form>
                <form action="javascript:void(0);" id="access-form-ide">
                    <div class="container-fluid mt-4">
                        <div class="row">
                            <div class="col-12 col-md">
                                <h5>${jsonPath('switchAccessibility.theme')}</h5>
                                <div class="form-check">
                                    <input type="radio" id="ide-radio-light-theme" class="form-check-input" name="theme" value="light" data-a11y-theme-light>
                                    <label for="ide-radio-light-theme">${jsonPath('switchAccessibility.light_theme')}</label>    
                                </div>
                                <div class="form-check">
                                    <input type="radio" id="ide-radio-dark-theme" name="theme" value="dark" class="form-check-input" data-a11y-theme-dark>
                                    <label for="ide-radio-dark-theme" class="form-check-label">${jsonPath('switchAccessibility.dark_theme')}</label>  
                                </div>
                                <h5>${jsonPath('switchAccessibility.contrast')}</h5>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="ide-radio-normal-contrast" name="contrast" value="normal" data-a11y-contrast-normal>
                                    <label for="ide-radio-normal-contrast" class="form-check-label">${jsonPath('switchAccessibility.normal_contrast')}</label>
                                </div>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="ide-radio-high-contrast" name="contrast" value="high" data-a11y-contrast-high>
                                    <label for="ide-radio-high-contrast" class="form-check-label">${jsonPath('switchAccessibility.high_contrast')}</label>
                                </div>
                            </div>
                            <div id="blocks-settings-font" class="col-12 col-md">
                                <h5>${jsonPath('switchAccessibility.font')}</h5>
                                <div class="form-check">                                
                                    <input type="radio" id="ide-radio-basic-font" name="font" value="basic" class="form-check-input" data-a11y-font-basic>
                                    <label for="ide-radio-basic-font"  class="form-check-label" style="font-family: 'Montserrat'!important" '>${jsonPath('switchAccessibility.basic_font')}</label><br>
        
                                    <input type="radio" id="ide-radio-luciole-font" name="font" value="luciole" class="form-check-input" data-a11y-font-luciole>
                                    <label for="ide-radio-luciole-font" class="form-check-label" style="font-family: 'Luciole'!important">Luciole</label><br>
        
                                    <input type="radio" id="ide-radio-dys-font" name="font" value="dys" class="form-check-input" data-a11y-font-dys>
                                    <label for="ide-radio-dys-font" class="form-check-label style="font-family: 'OpenDyslexic'!important">OpenDyslexic</label><br>
        
                                    <input type="radio" id="ide-radio-arial-font" name="font" value="arial" class="form-check-input" data-a11y-font-arial>
                                    <label for="ide-radio-arial-font" class="form-check-label" style="font-family: 'Arial'!important">Arial</label><br>
        
                                    <input type="radio" id="ide-radio-verdana-font" name="font" value="verdana" class="form-check-input" data-a11y-font-verdana>
                                    <label for="ide-radio-verdana-font" class="form-check-label" style="font-family: 'Verdana'!important">Verdana</label><br>
                                </div>  
                            </div>
                            <div id="blocks-settings-style" class="col-12 col-md">
                                <h5>${jsonPath('modals.standard.accessibilitySettings.content.style.title')}</h5>
                                <div class="form-check">
                                    <input type="radio" id="ide-radio-block-style-modern" name="block-style" value="zelos" onClick="changeRenderer()" class="form-check-input"/>
                                    <label for="ide-radio-block-style-modern" class="form-check-label" >${jsonPath('modals.standard.accessibilitySettings.content.style.options.modern')}</label><br>
        
                                    <input type="radio" id="ide-radio-block-style-classic" name="block-style" value="geras" onClick="changeRenderer()" class="form-check-input">
                                    <label for="ide-radio-block-style-classic" class="form-check-label">${jsonPath('modals.standard.accessibilitySettings.content.style.options.classic')}</label><br>
                                </div>
                            </div>
                        </div>
                        <div id="modal-blockly-knowmore" class="row mt-1">
                            <div style="margin: 0 auto; text-align: center; ">
                                <a href="${typeof IS_CAPYTALE_CONTEXT === 'undefined' ? '/accessibility' : 'https://capytale.forge.apps.education.fr/documentation/Activites/'}" target="_blank"  style="filter:grayscale(1); text-decoration:underline;">${jsonPath('switchAccessibility.know_more')}</a>
                            </div>
                    </div>
                </form>`,
            footer: ``
        },
        'modal-addblock': {
            selector: '',
            header: {
                icon: 'fas fa-link',
                title: 'modals.standard.addblock.title'
            },
            content: `<p>${jsonPath('modals.standard.addblock.content.notice')}</p>
                    <div class="add-block-form">
                        <div class="form-row addblock-form">
                            <label for="addblock-name" class="addblock-label">${jsonPath('modals.standard.addblock.content.labels.fullname')}
                                <span class="mandatory">*</span>
                            </label>
                            <input id="addblock-name" type="text" name="name" class="form-control"  placeholder="${jsonPath('modals.standard.addblock.content.form.fullname')}">
                        </div>
                        <div class="form-row addblock-form">
                            <label for="addblock-mail" class="addblock-label">${jsonPath('modals.standard.addblock.content.labels.email')}
                                <span class="mandatory">*</span>
                            </label>
                            <input id="addblock-mail" type="mail" name="mail" class="form-control"  placeholder="${jsonPath('modals.standard.addblock.content.form.email')}">
                        </div>
                        <div class="form-row addblock-form">
                            <label for="addblock-idea" class="addblock-label">${jsonPath('modals.standard.addblock.content.labels.idea')}
                                <span class="mandatory">*</span>
                            </label>
                            <textarea id="addblock-idea" class="form-control" placeholder="${jsonPath('modals.standard.addblock.content.form.idea')}"></textarea>
                        </div>
                        <div class="form-row addblock-form" style="margin-top:15px">
                            <div id="addblock-error" class="alert alert-danger" role="alert" style="display:none;">Erreurs : 
                                <ul class="addblock-errors-list"></ul>
                            </div>
                        </div>
                        <input type="text" name="za78e-username-block" autocomplete="off" value="" id="za78e-username-block" class="za78e-field" placeholder="za78e username"/>
                        <input type="number" name="za78e-number-block" autocomplete="off" max="10" min="0" id="za78e-number-block" class="za78e-field" placeholder="za78e number"/>
                    </div>
                    <div id="add-block-form-response"></div>
                    <div class="modal-button-center">
                        <button id="addblock-send" class="btn v-btn" onclick="sendAddBlock()">${jsonPath('modals.standard.addblock.content.buttons.send')}</button>
                    </div>`,
            footer: ``
        },
        'modal-i18n': {
            selector: '',
            header: {
                icon: 'fas fa-globe',
                title: 'modals.standard.i18n.title'
            },
            content: `<div id="interface-i18n-list-group" class="list-group"></div>`,
            footer: ``
        },
        'modal-settings': {
            selector: '',
            header: {
                icon: 'fas fa-cog',
                title: 'modals.standard.settings.title'
            },
            content:
                `<div class="ide-modal-section">
                    <h5> 
                    ${jsonPath('modals.standard.settings.content.console.title')}
                    </h5>
                    <p  class="mb-1" >
                    ${jsonPath('modals.standard.settings.content.console.notice')}
                    </p>
                    <div class="d-flex">
                        <div class="switcher">
                            <input type="radio" name="consolePosToggler" value="bottom" id="toggleConsoleBottom" class="switcher__input switcher__input--yin" checked="">
                            <label for="toggleConsoleBottom" class="switcher__label">${jsonPath('modals.standard.settings.content.console.buttons.bottom')}</label>
                            
                            <input type="radio" name="consolePosToggler" value="right" id="toggleConsoleRight" class="switcher__input switcher__input--right">
                            <label for="toggleConsoleRight" class="switcher__label">${jsonPath('modals.standard.settings.content.console.buttons.right')}</label>
                            
                            <span class="switcher__toggle"></span>
                        </div>
                    </div>
                </div>
                <div class="ide-modal-section mt-3">
                    <h5>${jsonPath('modals.standard.settings.content.scroll.title')}</h5>
                    <div class="modal-settings-auto-scroll mb-2">
                        <label class="switch">
                            <input type="checkbox" id="autoscrollCheckBox" checked>
                            <span class="slider round"></span>
                        </label>
                        <span  style="margin-left: 10px; vertical-align: top;">${jsonPath('modals.standard.settings.content.scroll.text')}</span>
                    </div>
                </div>
                ${typeof specific_toolboxToggler !== 'undefined' ? specific_toolboxToggler() : ''}
                ${typeof specific_boardSelector !== 'undefined' ? specific_boardSelector() : ''}
                ${typeof specific_serialBoardSelector !== 'undefined' ? specific_serialBoardSelector() : ''}`,
            footer: ``
        },
        'modal-warningsync': {
            header: {
                icon: 'fa fa-exclamation-circle',
                title: 'modals.warning.default.title',
            },
            optionalClass: {
                "modal": 'vitta-modal-warning',
                "content": "text-center"
            },
            selector: '',
            content: `<i class="fa fa-save"></i> 
                <span >${jsonPath('modals.warning.sync.content.warn.question')}</span><br/>
                <span >${jsonPath('modals.warning.sync.content.warn.hint')}</span>`,
            footer: `<button type="button" id="modal-sync-btn-yes" class="btn v-btn" style="flex:1;" >
            ${jsonPath('modals.warning.import.footer.buttons.yes')}
                </button>
                <button type="button" id="modal-sync-btn-no" class="btn v-btn-basic ms-1" style="flex:1;">
                ${jsonPath('modals.warning.import.footer.buttons.no')}
                </button>`
        },
        'modal-warningimport': {
            header: {
                icon: 'fa fa-exclamation-circle',
                title: 'modals.warning.default.title',
            },
            optionalClass: {
                "modal": 'vitta-modal-warning',
                "content": "text-center"
            },
            selector: '',
            content: `<span class="fa fa-save"></span>
                <span>Est ce que vous êtes sur de vouloir importer ce fichier depuis votre ordinateur ?</span><br/>
                <span>Vous allez perdre votre avancement fait manuellement.</span>
                <div id="import-extension-warning-box"></div>`,
            footer:
                `<button type="button" id="modal-import-btn-yes" style="flex:1;" class="btn vitta-button" >
                    ${jsonPath('modals.warning.import.footer.buttons.yes')}
                </button>
                <button type="button" id="modal-import-btn-no" class="btn btn-secondary" style="flex:1; margin-left:5px;" >
                    ${jsonPath('modals.warning.import.footer.buttons.no')}
                </button>`
        },
        'modal-gpsmap': {
            header: {
                icon: 'fas fa-map',
                title: 'modals.simulator.gpsmap.title',
            },
            optionalClass: {
                "modal": '',
                "content": ''
            },
            selector: '',
            content: `<div class="map-container h-100">
                        <div id="map"></div>
                    </div>`,
            footer: `<div class="row w-100 text-center">
            <div class="col-md-6 text-md-start">
                Latitude : <span id="modal-lat"></span><br>
                Longitude : <span id="modal-lng"></span>
            </div>
            <div class="col-md-6 text-md-end">
                <button class="btn v-btn w-100 h-100" onclick="loadLatLng()">Envoyer</button>
            </div>
        </div>`
        },
        'modal-simulator-background': {
            header: {
                title: 'modals.simulator.robots.background',
            },
            selector: ``,
            content: `
            <div class="modal-background-body">
                <div class="modal-left">
                    <div class="modal-left-header">
                        <p>${jsonPath('modals.simulator.robots.research')}</p>
                    </div>
                    <div class="modal-background-content"></div>
                </div>
                <div class="modal-right">
                    <div class="modal-right-header">
                        <i class="far fa-arrow-to-bottom"></i>
                    <p>${jsonPath('modals.simulator.robots.import')}</p>
                    </div>
                    <div class="drop-zone">
                        <span class="drop-zone-prompt">${jsonPath('modals.simulator.robots.dragFile')}</span>
                        <span class="drop-zone-prompt-small">${jsonPath('modals.simulator.robots.selectFile')}</span>
                        <input class="background-uploader" type="file" accept="image/*" name="background-uploader"/>
                    </div>
                </div>
            </div>`,
            footer: `<button type="button" id="background-cancel" class="btn v-btn-basic" style="width:20%;" onclick="pseudoModal.closeModal('modal-simulator-background')">
                        ${jsonPath('modals.simulator.robots.cancel')}
                    </button>
                    <button type="button" id="background-use" class="btn v-btn ms-1" style="width:20%;" onclick="SimulatorModals.useBackground()">
                        ${jsonPath('modals.simulator.robots.use')}
                    </button>
                    <button id="background-download" class="btn btn-outline-primary ms-1"  style="width:20%;">
                        <i class="fa fa-download me-1"></i>${jsonPath('modals.simulator.robots.download')}
                    </button>`,
        },
        'modal-robot-obstacle': {
            selector: ``,
            header: {
                title: 'modals.simulator.robots.obstacles',
            },
            content: `
            <div class="modal-obstacle-body">
                <div class="modal-content"></div>       
            </div>`,
            footer: `<button type="button" id="obstacle-cancel" class="btn btn-secondary" style="flex:1;" data-i18n="[html]modals.standard.new.footer.buttons.cancel"
                        onclick="pseudoModal.closeModal('modal-robot-obstacle')">
                        ${jsonPath('modals.simulator.robots.cancel')}
                    </button>
                    <button type="button" id="obstacle-use" class="btn vitta-button" style="flex:1; margin-left:5px;" onclick="SimulatorModals.useObstacleRobot()">
                        ${jsonPath('modals.simulator.robots.use')}
                    </button>`
        },
        'modal-simulator-wifi-help': {
            selector: '',
            header: {
                icon: 'far fa-question-circle',
                title: 'modals.standard.wifiSimulator.title'
            },
            content: `<div><p class="hint">
                        ${jsonPath('modals.standard.wifiSimulator.noticeWelcome')}
                    </p></div>`,
            footer: `<button type="button" id="modal-help-btn-back" onclick="pseudoModal.closeLatestModal()"class="btn v-btn-basic" data-i18n="[html]modals.standard.wifiSimulator.buttons.back">
                        ${jsonPath('modals.standard.wifiSimulator.buttons.back')}
                    </button>`
        },
        'modal-auto-corrector-incorrect': {
            selector: ``,
            header: {
                icon: 'fa fa-exclamation-circle',
                title: `modals.simulator.auto-corrector.result`,
            },
            content: `
                <div class="auto-corrector-body text-center">
                    <img src="${CDN_PATH}/openInterface/interfaces/assets/media/simulator/auto-corrector/error.svg" />
                    <p class="auto-corrector-text auto-corrector-incorrect-text">
                        ${jsonPath('modals.simulator.auto-corrector.incorrect')}
                    </p><br>
                    <div id="incorrect-error" class="auto-corrector-error"></div>
                </div>
            `,
            footer: `<button type="button" id="auto-corrector-incorrect-cancel" class="btn btn-secondary" style="flex:1;" data-i18n="">
                        ${jsonPath('modals.simulator.auto-corrector.go-back')}
                    </button>`,
        },
        'modal-auto-corrector-correct': {
            selector: ``,
            header: {
                icon: 'fa fa-exclamation-circle',
                title: `modals.simulator.auto-corrector.result`,
            },
            content: `
                <div class="auto-corrector-body text-center">
                    <img src="${CDN_PATH}/openInterface/interfaces/assets/media/simulator/auto-corrector/validate.svg"/>
                    <p class="auto-corrector-text auto-corrector-correct-text">
                        ${jsonPath('modals.simulator.auto-corrector.correct')}
                    </p>
                    <div class="auto-corrector-exercise-code">
                        <p class="fw-bold">MOOC MinesTelecom : Programmer un objet avec MicroPython</p>
                        <p>Si vous participez au MOOC MicroPython, voici le code permettant de valider l'exercice :</p>
                        <div class="d-flex mt-1" style="max-width: 50%;margin: auto;">
                            <input id="code-value" value="" class="form-control" readonly="readonly" style="filter: none;font-weight: 700!important;color: var(--bs-code-color)!important;border-top-right-radius:0; border-bottom-right-radius: 0;">
                            <button class="btn vitta-button" id="copy-code" style="border-top-left-radius: 0; border-bottom-left-radius: 0;">
                            <i class="fas fa-copy"></i>
                        </button>
                        <i id="check-icon" class="fas fa-check ms-2" style="visibility: hidden; color: green;margin: auto;"></i>
                    </div>
                    </div>
                </div>
            `,
            footer: `<button type="button" id="auto-corrector-correct-cancel" class="btn btn-secondary" style="flex:1;" data-i18n="">
                        ${jsonPath('modals.simulator.auto-corrector.go-back')}
                    </button>`,
        },
        'modal-auto-corrector-creation': {
            selector: `#modal-auto-corrector-creation`,
            header: {
                icon: 'fas fa-tasks',
                title: `modals.simulator.auto-corrector.create`,
            },
            content: `
                <div>
                    <div class="form-group col-md-12 ms-0 ps-0" id="record-container">
                        <label class="tutorial-label">
                            <i class="fas fa-stopwatch"></i>
                            <span data-i18n="">${jsonPath('modals.simulator.auto-corrector.chronogram')}</span>
                        </label>
                        <div class="chronogram-body">
                            <p class="chronogram-paragraph">
                                ${jsonPath('modals.simulator.auto-corrector.explanations')}
                            </p>
                        </div>
                        <div class="record-exercise text-center mt-2">
                            <button id="record-exercise" class="btn v-btn">${jsonPath('modals.simulator.auto-corrector.recording')}</button>
                        </div>
                    </div>
                </div>
            `,
            footer: `<button type="button" id="auto-corrector-creation-cancel" class="btn v-btn-basic" style="flex:1;" data-i18n="[html]modals.standard.new.footer.buttons.cancel">
                    </button>
                    <button type="button" id="save-exercise" class="btn v-btn-outline" style="flex:1; margin-left: 5px;">
                        ${jsonPath('modals.simulator.auto-corrector.save')}
                    </button>`,
        },
        'modal-auto-corrector-no-project-opened': {
            selector: ``,
            header: {
                icon: 'fa fa-exclamation-circle',
                title: `modals.simulator.auto-corrector.no-project-opened.title`,
            },
            content: `
                <div class="auto-corrector-body text-center">
                    <img src="${CDN_PATH}/openInterface/interfaces/assets/media/simulator/auto-corrector/error.svg" />
                    <p class="auto-corrector-text auto-corrector-incorrect-text">
                        ${jsonPath('modals.simulator.auto-corrector.no-project-opened.body')}
                    </p>
                </div>
            `,
            footer: `<div class="d-flex flex-wrap justify-content-center mx-auto" style="gap: 5px;">
            <button class="btn v-btn" data-toggle="tooltip" data-placement="top" data-i18n="[title]code.topbar.tooltips.newProject" onclick="newProject()" title="" data-original-title="Nouveau projet">
                <i class="fas fa-plus"></i>
                <span class="label-button" aria-hidden="true">
                    ${jsonPath('modals.simulator.auto-corrector.no-project-opened.new-project-button-text')}
                </span>
            </button>
            <button class="btn v-btn" data-toggle="tooltip" data-placement="top" data-i18n="[title]code.topbar.tooltips.saveProject" onclick="saveProjectbtn()" title="" data-original-title="Sauvegarder projet">
                <i class="fas fa-save"></i>
                <span class="label-button" aria-hidden="true">
                    ${jsonPath('modals.simulator.auto-corrector.no-project-opened.save-project-button-text')}
                </span>
            </button>
            <button class="btn v-btn" data-toggle="tooltip" data-placement="top" data-i18n="[title]code.topbar.tooltips.openProject" onclick="openProjectBtn()" title="" data-original-title="Ouvrir un projet existant">
                <i class="fas fa-folder-open"></i>
                <span class="label-button" aria-hidden="true">
                    ${jsonPath('modals.simulator.auto-corrector.no-project-opened.open-project-button-text')}
                </span>
            </button>
            </div>`,
        },
        'modal-auto-corrector-no-project-owner': {
            selector: ``,
            header: {
                icon: 'fa fa-exclamation-circle',
                title: `modals.simulator.auto-corrector.no-project-owner.title`,
            },
            content: `
                <div class="auto-corrector-body text-center">
                    <img src="${CDN_PATH}/openInterface/interfaces/assets/media/simulator/auto-corrector/error.svg" />
                    <p class="auto-corrector-text auto-corrector-incorrect-text">
                        ${jsonPath('modals.simulator.auto-corrector.no-project-owner.body')}
                    </p>
                </div>
            `,
            footer: `<button type="button" id="modal-autocorrector-save-btn-copy" class="btn vitta-button" style="flex:1; margin-left:5px;" data-i18n="[html]modals.standard.save.content.buttons.copy" onclick="pseudoModal.openModal('modal-saveproject-under')">
                    Sauvegarder sous ...
                </button>`,
        },
        'modal-varButton': {
            selector: '',
            header: {
                icon: 'far fa-solid fa-code',
                title: 'modals.varButton.title'
            },
            content: `
                <div class="modal-varButton-body text-center" style='margin-bottom: 15px'>
                    ${jsonPath('modals.varButton.bodyP1')} <span style="color:#2b2be9">${jsonPath('modals.varButton.functions')}</span> & <span style="color:#FF9403">${jsonPath('modals.varButton.variables')}</span>. ${jsonPath('modals.varButton.bodyP2')}
                </div>
                <div id="varButton-modal-function-list"></div>`,
        },
        'model-connection-vitta-companion': {
            selector: '',
            header: {
                icon: 'fa fa-exclamation-circle',
                title: 'modals.companionConnectionError.title'
            },
            content: `
                <div class="modal-insecureConnection-body text-center" >
                    <div style='margin-bottom: 25px; margin-top:25px' class="modal-insecureConnection-body-text">${jsonPath('modals.companionConnectionError.body')}</div>
                    <button type="button" id="modal-insecureConnection-btn" class="btn vitta-button" style="flex:1; margin-left:5px;" data-i18n="[html]modals.insecureConnection.cancel" onclick="pseudoModal.closeModal('model-connection-vitta-companion')">${jsonPath('modals.companionConnectionError.cancel')}</button>
                </div>
            `,
        },
        'modal-code-to-blocks-consent': {
            selector: '',
            header: {
                icon: 'fa fa-exclamation-circle',
                title: 'modals.codeToBlocksWarning.title'
            },
            content: `
                <div class="modal-code-to-blocks-warning-body text-center">
                    <div class="modal-code-to-blocks-warning-text" data-i18n="[html]modals.codeToBlocksWarning.body"></div>
                    <div class="modal-code-to-blocks-warning-note mt-2" data-i18n="[html]modals.codeToBlocksWarning.note"></div>
                    <div class="modal-code-to-blocks-warning-buttons d-flex justify-content-center mt-3 gap-2">
                        <button id="modal-code-to-blocks-refuse" type="button" class="btn vitta-button" data-i18n="[html]modals.codeToBlocksWarning.refuse"></button>
                        <button id="modal-code-to-blocks-accept" type="button" class="btn vitta-button btn-primary" data-i18n="[html]modals.codeToBlocksWarning.accept"></button>
                    </div>
                </div>
            `,
        },
        'modal-insecureConnectionRaspberry': {
            selector: '',
            header: {
                icon: 'fa fa-exclamation-circle',
                title: 'modals.insecureConnection.title'
            },
            content: `
                <div class="modal-insecureConnection-body text-center" >
                    <div style='margin-bottom: 25px; margin-top:25px' class="modal-insecureConnection-body-text">${jsonPath('modals.insecureConnection.body')}</div>
                    <button type="button" id="modal-insecureConnection-btn-continue" class="btn vitta-button" style="flex:1; margin-left:5px;" data-i18n="[html]modals.insecureConnection.continue" onclick="proceedToRaspberryConnection()">${jsonPath('modals.insecureConnection.continue')}</button>
                    <button type="button" id="modal-insecureConnection-btn" class="btn vitta-button" style="flex:1; margin-left:5px;" data-i18n="[html]modals.insecureConnection.cancel" onclick="pseudoModal.closeModal('modal-insecureConnectionRaspberry')">${jsonPath('modals.insecureConnection.cancel')}</button>
                </div>
            `,
        },
        'modal-imagePiCamera': {
            selector: '',
            header: {
                icon: 'fas fa-camera',
                title: 'Pi camera'
            },
            content: `
                <div id="modal-imagePiCamera-body" class="modal-imagePiCamera-body text-center"></div>
            `,
        },
        'modal-connection-nao': {
            selector: '',
            header: {
                icon: 'fa-solid fa-wifi',
                title: 'modals.naoConnectionRequest.title'
            },
            content: `
                <div class="modal-naoConnectionRequest-body text-center" >
                            <div class="modal-naoConnectionRequest-body-text" style="margin-bottom: 15px;">
                        ${jsonPath('modals.naoConnectionRequest.body')}
                    </div>
                    <div style="color:gray;margin-bottom:10px">"192 . 168 . 1 . XX"</div>
                    <div id="nao-ip-inputs" class="nao-ip" style="display: flex; justify-content: center; gap: 10px; max-width: 250px; margin: auto; margin-bottom:20px">
                        <input type="text" id="nao-ip-1" class="form-control" maxlength="3" style="width: 50px; text-align: center;">
                        <input type="text" id="nao-ip-2" class="form-control" maxlength="3" style="width: 50px; text-align: center;">
                        <input type="text" id="nao-ip-3" class="form-control" maxlength="3" style="width: 50px; text-align: center;">
                        <input type="text" id="nao-ip-4" class="form-control" maxlength="3" style="width: 50px; text-align: center;">
                    </div>
                    <div id="nao-loading-connection"></div>
                    <div id="nao-connection-error" class="nao-connection-error alert alert-danger text-center" style="display: none;">
                        <div style="display: flex; flex-direction: column; gap: 5px;">
                            <div id="user-ip-adress-nao"></div>
                            ${jsonPath('modals.naoConnectionRequest.error')}
                        </div>
                    </div>
                    <button type="button" id="modal-connection-nao-connect" class="btn vitta-button" style="flex:1; margin-left:5px;" data-i18n="[html]modals.naoConnectionRequest.connect" onclick="storeNAOIPAdress()">${jsonPath('modals.naoConnectionRequest.connect')}</button>
                    <button type="button" id="modal-connection-nao-cancel" class="btn vitta-button" style="flex:1; margin-left:5px;" data-i18n="[html]modals.naoConnectionRequest.cancel" onclick="cancelNaoConnection()">${jsonPath('modals.naoConnectionRequest.cancel')}</button>
                </div>
            `,
        },
        'modal-ch340-driver': {
            selector: '',
            header: {
                icon: 'fa fa-exclamation-circle',
                title: 'modals.ch340driver.title'
            },
            content: `
                <div class="modal-ch340-driver-body text-center">
                    <p class="modal-ch340-driver-error">
                        ${jsonPath('modals.ch340driver.error')}
                    </p>
                    <p class="modal-ch340-driver-link">
                        ${jsonPath('modals.ch340driver.link')}
                        <a href='https://www.wemos.cc/en/latest/ch340_driver.html' target="_blank">https://www.wemos.cc/en/latest/ch340_driver.html</a>
                        <img class="modal-ch340-driver-img" src='${CDN_PATH}/openInterface/interfaces/assets/media/modals/ch340_driver_install.png'>
                    </p>
                    <p class="modal-ch340-driver-tutorial">
                        ${jsonPath('modals.ch340driver.tutorial')}
                    </p>
                </div>
            `,
            footer: `<button type="button" id="modal-ch340-driver-btn" class="btn vitta-button" style="flex:1; margin-left:5px;" data-i18n="[html]modals.popups.ch340driver.gotIt" onclick="pseudoModal.closeModal('modal-ch340-driver')">${jsonPath('modals.ch340driver.gotIt')}</button>`
        },
        'modal-microbit-logdata': {
            selector: '',
            header: {
                icon: 'far fa-solid fa-file-lines',
                title: 'modals.microbitLogdata.title'
            },
            content: `
                <div id="modal-microbit-logdata-buttons" class="log-data-bb"></div>
                <div id="modal-microbit-logdata-body">
                </div>
            `,
        },
        'modal-warning-rtc-autosave': {
            selector: '',
            header: {
                icon: 'fa fa-exclamation-circle',
                title: 'modals.autosave-warning.title',
            },
            content: `<span>
                ${jsonPath('modals.autosave-warning.content')}
                </span>`,
            footer: `<button type="button" onclick="pseudoModal.closeModal('modal-warning-rtc-autosave')" class="btn vitta-button" data-i18n="modals.help-modals.understood">
                    ${jsonPath('modals.help-modals.understood')}
                </button>`
        },
        'modal-warning-browser-compability': {
            selector: '',
            header: {
                icon: 'fa fa-exclamation-circle',
                title: 'modals.browser-compability-warning.title',
            },
            content: `<span>
                ${jsonPath('modals.browser-compability-warning.content')}
                </span>`,
            footer: `<button type="button" onclick="pseudoModal.closeModal('modal-warning-browser-compability')" class="btn vitta-button" data-i18n="modals.help-modals.understood">
                    ${jsonPath('modals.help-modals.understood')}
                </button>`
        },
        'modal-thymio-select': {
            selector: '',
            header: {
                icon: 'fa-solid fa-robot',
                title: `${jsonPath('code.thymioInterface.modalThymioSelect.title')}`,
            },
            content: ``,
            footer: `
                <button type="button" class="btn v-btn-basic mt-3" style="margin:auto;min-width:110px;" onclick="asebaTranspiler.searchNodes(true)">
                    ${jsonPath('code.thymioInterface.modalThymioSelect.refresh')}
                </button>
                <button type="button" class="btn v-btn mt-3" style="margin:auto;min-width:110px;" onclick="asebaTranspiler.transpileToAseba()">
                    ${jsonPath('code.thymioInterface.modalThymioSelect.validate')}
                </button>`
        },
        'modal-microbit-bluetooth-pairing': {
            header: {
                icon: 'fa-solid fa-link',
                title: 'code.popups.microbitBLE.title'
            },
            content: `<div class="container text-center">
                    <p>⚠️ <strong>${jsonPath('code.WebBluetoothAPI.usePhone')}</strong></p>
                    <p>${jsonPath('code.popups.microbitBLE.content')}</p>
                    <div class="d-flex flex-row">
                        <img class="w-50 h-50" src="${CDN_PATH}/openInterface/interfaces/assets/media/modals/microbit_buttons.png">
                        <img class="w-50 h-50" src="${CDN_PATH}/openInterface/interfaces/assets/media/modals/microbit_reset.png">
                    </div>
                </div>`,
            footer: `
            <button type="button" id="modal-microbit-bluetooth-pairing-cancel" class="btn btn-secondary me-4 ms-5" style="flex:1;" data-i18n="modals.standard.codeOnly.cancel" onclick="pseudoModal.closeModal('modal-microbit-bluetooth-pairing')">
                Cancel
            </button>
            <button type="button" id="modal-microbit-bluetooth-pairing-confirm" class="btn btn-green me-5 ms-4" style="flex:1;" data-i18n="modals.standard.codeOnly.confirm" onclick="uploadPythonBLE()">
                Confirm
            </button>`
        },
        'modal-local-compilation': {
            selector: '',
            header: {
                icon: 'fas fa-link',
                title: 'modals.standard.local-compilation.title'
            },
            content: `<div>
                        <p>
                            ${jsonPath('modals.standard.local-compilation.description.one')}
                        </p>
                        <p>
                            ${jsonPath('modals.standard.local-compilation.description.two')}
                        </p>
                    <div id="local-compilation-download-area" class="local-compilation-download-area">
                        <div>${jsonPath('modals.standard.local-compilation.downloadLabel')}</div>
                        <div id="compilation-progress-bar-wrapper" class="compilation-progress-bar-wrapper">
                            <div id="compilation-progress-bar" class="compilation-progress-bar"></div>
                            <div id="compilation-download-label" class="compilation-progress-label">0%</div>
                        </div>
                    </div>
                    <div id="local-compilation-loading-area" class="local-compilation-loading-area"></div>
                    <div class="local-compilation-compilation-area">
                        <div id="local-compilation-info" class="local-compilation-info">
                            <div>${jsonPath('modals.standard.local-compilation.compilationStepsLabel')}</div>
                            <div id="compilation-steps-progress-bar-wrapper" class="compilation-progress-bar-wrapper">
                                <div id="compilation-steps-progress-bar" class="compilation-progress-bar"></div>
                                <div id="compilation-steps-name" class="compilation-progress-label"></div>
                            </div>
                        </div>
                        <div id="local-compilation-compilation-done" class="local-compilation-compilation-done">${jsonPath('modals.standard.local-compilation.compilationDone')}</div>
                    </div>`,
            footer: `<div class="d-flex justify-content-center w-100 gap-3">
                        <button type="button" id="modal-local-compilation-back" onclick="pseudoModal.closeLatestModal() "class="btn v-btn-basic">
                            ${jsonPath('modals.standard.local-compilation.buttons.back')}
                        </button>
                        <button disabled id="local-compilation-upload-btn" class="btn v-btn" onclick="sendAddBlock()">
                            ${jsonPath('modals.standard.local-compilation.buttons.upload')}
                        </button>
                    </div>`
        }
        // Template not modify, not delete
        // '0': {
        //     selector: '',
        //     header: {
        //         icon: '',
        //         title: ''
        //     },
        //     content: ``,
        //     footer: ``
        // }
    };
})();