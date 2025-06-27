// deactivate rtc for local environment
const rtcInterfaces = location.origin.split('.').length === 1 ? [] : ['wb55', 'l476', 'buddy', 'letsstartcoding'];

// share project modal
const modeInterfaceOption =
`<input type="radio" name="shareOptionsMode" value="simuOnly" id="shareOptionsModeSimuOnly" class="switcher__input switcher__input--right">
<label for="shareOptionsModeSimuOnly" class="switcher__label" data-i18n="modals.standard.share.content.options.mode.simuonly">Simu only</label>`;
const consoleInterfaceOption =
`<div id="modal-share-options-console" class="d-flex flex-column">
    <span class="text-center" data-i18n="modals.standard.share.content.options.console.title">Console</span>
    <!-- Switcher console -->
    <div class="switcher">
        <input type="radio" name="shareOptionsConsole" value="bottom" id="shareOptionsConsoleBottom" class="switcher__input switcher__input--yin" checked>
        <label for="shareOptionsConsoleBottom" class="switcher__label" data-i18n="[html]modals.standard.settings.content.console.buttons.bottom">En bas</label>
    
        <input type="radio" name="shareOptionsConsole" value="right" id="shareOptionsConsoleRight" class="switcher__input switcher__input--right">
        <label for="shareOptionsConsoleRight" class="switcher__label" data-i18n="[html]modals.standard.settings.content.console.buttons.right">A droite</label>

        <span class="switcher__toggle"></span>
    </div>
</div>`;
const simulatorInterfaceOption =
`<div id="modal-share-options-simulator" class="d-flex flex-column ms-1">
    <span class="text-center" data-i18n="modals.standard.share.content.options.simulator.title">Simulateur</span>
    <div class="switcher">
        <input type="radio" name="shareOptionsSimulator" value="1" id="shareOptionsSimulatorEnable" class="switcher__input switcher__input--left">
        <label for="shareOptionsSimulatorEnable" class="switcher__label" data-i18n="modals.standard.share.content.options.simulator.enable">Activé</label>
        
        <input type="radio" name="shareOptionsSimulator" value="" id="shareOptionsSimulatorDisable" class="switcher__input switcher__input--right" checked>
        <label for="shareOptionsSimulatorDisable" class="switcher__label" data-i18n="modals.standard.share.content.options.simulator.disable">Désactivé</label>
        
        <span class="switcher__toggle"></span>
    </div>
</div>`;
const toolboxInterfaceOption =
`<div class="d-flex flex-column mw-100">
    <span class="text-center">Toolbox</span>
    <div class="switcher">
        <input type="radio" name="toolboxModeShare" value="vittascience" id="toolboxModeVittascienceShare" class="switcher__input switcher__input--yin" checked="">
        <label for="toolboxModeVittascienceShare" class="switcher__label">Vittascience</label>

        <input type="radio" name="toolboxModeShare" value="scratch" id="toolboxModeScratchShare" class="switcher__input switcher__input--middle1">
        <label for="toolboxModeScratchShare" class="switcher__label">Scratch</label>

        <span class="switcher__toggle"></span>
    </div>
</div>`;
// settings modal
const toolboxToggler = function () {
    return `<div class="ide-modal-section mt-3">
        <h5>${jsonPath('modals.standard.settings.content.toolbox.title')}</h5>
        <p class="mb-1">${jsonPath('modals.standard.settings.content.toolbox.notice')}</p>
        <div class="d-flex">
            <div class="switcher">
    
                <input type="radio" name="toolboxMode" value="vittascience" id="toolboxModeVittascience" class="switcher__input switcher__input--yin" checked="">
                <label for="toolboxModeVittascience" class="switcher__label" >Vittascience</label>
                                    
                <input type="radio" name="toolboxMode" value="scratch" id="toolboxModeScratch" class="switcher__input switcher__input--middle1">
                <label for="toolboxModeScratch" class="switcher__label" >Scratch</label>
                
                <span class="switcher__toggle"></span>
            </div>
        </div>
    </div>`;
};

const THEMES = {
    "light": {
        "basic": "ClassicBase",
        "dys": "ClassicBaseA11y",
        "luciole": "ClassicBaseLuciole",
        "arial": "ClassicBase",
        "verdana": "ClassicBase"
    },
    "dark": {
        "basic": "VittascienceDark",
        "dys": "VittascienceDarkA11y",
        "luciole": "VittascienceDarkLuciole",
        "arial": "VittascienceDark",
        "verdana": "VittascienceDark"
    },
    'light-hc': {
        "basic": "VittascienceLightHc",
        "dys": "VittascienceLightHcA11y",
        "luciole": "VittascienceLightHcLuciole",
        "arial": "VittascienceLightHc",
        "verdana": "VittascienceLightHc"
    },
    'dark-hc': {
        "basic": "VittascienceDarkHc",
        "dys": "VittascienceDarkHcA11y",
        "luciole": "VittascienceDarkHcLuciole",
        "arial": "VittascienceDarkHc",
        "verdana": "VittascienceDarkHc"
    },
    "high_contrast": {
        "basic": "VittascienceHighContrast",
        "dys": "VittascienceHighContrast",
        "luciole": "VittascienceHighContrast",
        "arial": "VittascienceHighContrast",
        "verdana": "VittascienceHighContrast"
    }
};

const TOOLBOXES_SVGS = {
    "display_category": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.9 24"><defs><clipPath id="a"><path data-name="Rectangle 3976" style="fill:none" d="M0 0h30v24H0z"/></clipPath></defs><g data-name="icon_idea_on" fill="currentColor" style="clip-path:url(#a)"><path data-name="Tracé 6712" d="M7 3a1 1 0 0 1-2 1L2 2a1 1 0 0 1 0-1 1 1 0 0 1 1-1 2 2 0 0 1 1 0l2 2a1 1 0 0 1 1 1"/><path data-name="Tracé 6713" d="M3 16a1 1 0 0 1-1-1 1 1 0 0 1 0-1l2-1h1a1 1 0 1 1 1 1l-3 2"/><path data-name="Tracé 6714" d="M28 15a1 1 0 0 1-1 1 1 1 0 0 1-1 0l-2-2a1 1 0 0 1-1-1 1 1 0 0 1 1-1 2 2 0 0 1 1 1l2 1a1 1 0 0 1 1 1"/><path data-name="Tracé 6715" d="M28 1a1 1 0 0 1-1 1l-2 2a1 1 0 0 1-2-1 1 1 0 0 1 1-1l2-2a1 1 0 0 1 2 1"/><path data-name="Tracé 6716" d="M3 9H1a1 1 0 0 1-1-1 1 1 0 0 1 0-1 1 1 0 0 1 1 0h3a1 1 0 0 1 1 2 1 1 0 0 1-1 0H3"/><path data-name="Tracé 6717" d="M27 7h2a1 1 0 0 1 1 2 1 1 0 0 1-1 0h-3a1 1 0 0 1 0-2h1Z"/><path data-name="Tracé 6718" d="M16 24h-2a1 1 0 0 1 0-1h2a1 1 0 0 1 0 1Zm1-2h-4a1 1 0 0 1 0-1h4a1 1 0 0 1 0 1Zm-2-3h-3l-1-4c-1-1-4-2-4-8 0-4 4-7 8-7s8 3 8 7c0 6-3 7-4 8l-2 4h-2ZM13 2a5 5 0 0 0-4 5 1 1 0 0 0 1 0 4 4 0 0 1 3-3 1 1 0 0 0 0-2Z"/></g></svg>`,
    "looks_category": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.9 24"><defs><clipPath id="a"><path data-name="Rectangle 3976" style="fill:none" d="M0 0h30v24H0z"/></clipPath></defs><g data-name="icon_idea_on" fill="currentColor" style="clip-path:url(#a)"><path data-name="Tracé 6712" d="M7 3a1 1 0 0 1-2 1L2 2a1 1 0 0 1 0-1 1 1 0 0 1 1-1 2 2 0 0 1 1 0l2 2a1 1 0 0 1 1 1"/><path data-name="Tracé 6713" d="M3 16a1 1 0 0 1-1-1 1 1 0 0 1 0-1l2-1h1a1 1 0 1 1 1 1l-3 2"/><path data-name="Tracé 6714" d="M28 15a1 1 0 0 1-1 1 1 1 0 0 1-1 0l-2-2a1 1 0 0 1-1-1 1 1 0 0 1 1-1 2 2 0 0 1 1 1l2 1a1 1 0 0 1 1 1"/><path data-name="Tracé 6715" d="M28 1a1 1 0 0 1-1 1l-2 2a1 1 0 0 1-2-1 1 1 0 0 1 1-1l2-2a1 1 0 0 1 2 1"/><path data-name="Tracé 6716" d="M3 9H1a1 1 0 0 1-1-1 1 1 0 0 1 0-1 1 1 0 0 1 1 0h3a1 1 0 0 1 1 2 1 1 0 0 1-1 0H3"/><path data-name="Tracé 6717" d="M27 7h2a1 1 0 0 1 1 2 1 1 0 0 1-1 0h-3a1 1 0 0 1 0-2h1Z"/><path data-name="Tracé 6718" d="M16 24h-2a1 1 0 0 1 0-1h2a1 1 0 0 1 0 1Zm1-2h-4a1 1 0 0 1 0-1h4a1 1 0 0 1 0 1Zm-2-3h-3l-1-4c-1-1-4-2-4-8 0-4 4-7 8-7s8 3 8 7c0 6-3 7-4 8l-2 4h-2ZM13 2a5 5 0 0 0-4 5 1 1 0 0 0 1 0 4 4 0 0 1 3-3 1 1 0 0 0 0-2Z"/></g></svg>`,
    "tello_category": `<?xml version="1.0" encoding="UTF-8"?><svg id="Calque_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><defs><style>.cls-1{fill:currentColor;}</style></defs><g id="Calque_1-2"><path id="icon_tello" class="cls-1" d="M24.96,15.05l-.22-.26c-.07-.08-.18-.09-.26-.02-.29,.26-.95,.84-1.06,.93-.15,.12-2.27,1.53-2.59,1.85-.31,.31-.43,.57-.56,1.2-.03,0-.06,0-.09,0-.06,0-.11,0-.17,.01l-4.49-4.71,.03-3.17,4.41-4.63c.05,0,.11,.01,.16,.01,.03,0,.06,0,.09,0,.13,.63,.26,.89,.56,1.2,.32,.32,2.44,1.73,2.59,1.85,.11,.1,.77,.67,1.06,.93,.08,.07,.19,.06,.26-.02l.22-.26c.06-.07,.06-.18,0-.25-.27-.31-.98-1.12-1.17-1.32-.23-.24-1.4-1.82-2.04-2.4-.2-.18-.39-.34-.56-.48,.03-.11,.05-.22,.05-.34,0-.6-.47-1.09-1.05-1.09-.03,0-.06,0-.09,0-.02-.1-.04-.2-.05-.3-.07-.42-.38-.78-.71-1.08s-1.48-1.04-1.78-1.22c-.3-.18-.82-.63-.98-.76-.11-.1-.48-.46-.68-.66-.07-.07-.18-.07-.25,0l-.27,.25c-.08,.07-.08,.19-.02,.27l.04,.05s1.25,1.39,1.37,1.55,1.55,1.86,1.74,2.07c.13,.14,.44,.37,.68,.56-.01,.04-.03,.09-.04,.13l-3.58,1.93v-.24l-.42-.41-.33-.37v.04c-.18-.12-.71-.31-1.42-.39h0l-.1-.1c-.09-.09-.2-.14-.32-.14h-.88c-.12,0-.23,.06-.32,.14l-.1,.1-.08,.02c-.79,.08-1.31,.23-1.4,.39h0l-.26,.3-.41,.41v.23l-3.62-1.95s-.02-.09-.04-.13c.25-.18,.55-.42,.68-.56,.19-.2,1.62-1.9,1.74-2.07,.12-.16,1.37-1.55,1.37-1.55l.04-.05c.07-.08,.06-.2-.02-.27l-.27-.25c-.07-.07-.18-.06-.25,0-.2,.19-.57,.56-.68,.66-.16,.13-.68,.59-.98,.76s-1.45,.92-1.78,1.22c-.33,.3-.63,.65-.71,1.08-.02,.1-.04,.2-.05,.3-.03,0-.06,0-.09,0-.58,0-1.05,.49-1.05,1.09,0,.12,.02,.23,.05,.34-.17,.14-.36,.3-.56,.48-.64,.57-1.81,2.15-2.04,2.4-.19,.19-.9,1-1.17,1.32-.06,.07-.06,.18,0,.25l.22,.26c.07,.08,.18,.09,.26,.02,.29-.26,.95-.84,1.06-.93,.15-.12,2.27-1.53,2.59-1.85,.31-.31,.43-.57,.56-1.2,.03,0,.06,0,.09,0,.06,0,.11,0,.16-.01l4.44,4.67,.03,3.24-4.42,4.64c-.05,0-.11-.01-.16-.01-.03,0-.06,0-.09,0-.13-.63-.26-.89-.56-1.2-.32-.32-2.44-1.73-2.59-1.85-.11-.1-.77-.67-1.06-.93-.08-.07-.19-.06-.26,.02l-.22,.26c-.06,.07-.06,.18,0,.25,.27,.31,.98,1.12,1.17,1.32,.23,.24,1.4,1.82,2.04,2.4,.2,.18,.39,.34,.56,.48-.03,.11-.05,.22-.05,.34,0,.6,.47,1.09,1.05,1.09,.03,0,.06,0,.09,0,.02,.1,.04,.2,.05,.3,.07,.42,.38,.78,.71,1.08,.33,.3,1.48,1.04,1.78,1.22,.3,.18,.82,.63,.98,.76,.11,.1,.48,.46,.68,.66,.07,.07,.18,.07,.25,0l.27-.25c.08-.07,.08-.19,.02-.27l-.04-.05s-1.25-1.39-1.37-1.55c-.12-.16-1.55-1.86-1.74-2.07-.13-.14-.44-.37-.68-.56,.01-.04,.03-.09,.04-.13l4-2.16c.26,.01,.6,.05,.6,.05h3.98s.44-.05,.7-.05l3.97,2.14s.02,.09,.04,.13c-.25,.18-.55,.42-.68,.56-.19,.2-1.62,1.9-1.74,2.07-.12,.16-1.37,1.55-1.37,1.55l-.04,.05c-.07,.08-.06,.2,.02,.27l.27,.25c.07,.07,.18,.06,.25,0,.2-.19,.57-.56,.68-.66,.16-.13,.68-.59,.98-.76,.3-.18,1.45-.92,1.78-1.22s.63-.65,.71-1.08c.02-.1,.04-.2,.05-.3,.03,0,.06,0,.09,0,.58,0,1.05-.49,1.05-1.09,0-.12-.02-.23-.05-.34,.17-.14,.36-.3,.56-.48,.64-.57,1.81-2.15,2.04-2.4,.19-.19,.9-1,1.17-1.32,.06-.07,.06-.18,0-.25Zm-5.81,4.55l-3.79-2.04s0-.03,0-.04c0-.1,.12-.46,.13-.54s-.03-1.99,.14-2.02c.08,0,.15,0,.22,0l3.76,3.95c-.23,.16-.4,.4-.46,.69Zm-3.36-9.56l.06-.17-.07-2.38-.18-.22,3.49-1.88c.06,.29,.23,.54,.46,.69l-3.77,3.96ZM5.85,5.38l3.53,1.9-.18,.22-.07,2.38,.07,.2-3.81-4c.23-.16,.4-.4,.46-.69Zm3.38,9.58s.08,0,.12,0c.18,.02,.14,1.94,.14,2.02,0,.08,.12,.44,.13,.54,0,.02,0,.06-.01,.11l-3.7,2c-.06-.29-.23-.54-.46-.69l3.79-3.98Z"/></g></svg>`,
    "procedure_category": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.42 5.29c-1.1-.1-2.07.71-2.17 1.82L10 10h2.82v2h-3l-.44 5.07A4.001 4.001 0 0 1 2 18.83l1.5-1.5c.33 1.05 1.46 1.64 2.5 1.3.78-.24 1.33-.93 1.4-1.74L7.82 12h-3v-2H8l.27-3.07a4.01 4.01 0 0 1 4.33-3.65c1.26.11 2.4.81 3.06 1.89l-1.5 1.5c-.25-.77-.93-1.31-1.74-1.38M22 13.65l-1.41-1.41-2.83 2.83-2.83-2.83-1.43 1.41 2.85 2.85-2.85 2.81 1.43 1.41 2.83-2.83 2.83 2.83L22 19.31l-2.83-2.81L22 13.65Z" fill="currentColor"/></svg>`,
    "dictionaries_category": `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6,6A2,2,0,0,1,8,4,1,1,0,0,0,8,2,4,4,0,0,0,4,6V9a2,2,0,0,1-2,2,1,1,0,0,0,0,2,2,2,0,0,1,2,2v3a4,4,0,0,0,4,4,1,1,0,0,0,0-2,2,2,0,0,1-2-2V15a4,4,0,0,0-1.38-3A4,4,0,0,0,6,9Zm16,5a2,2,0,0,1-2-2V6a4,4,0,0,0-4-4,1,1,0,0,0,0,2,2,2,0,0,1,2,2V9a4,4,0,0,0,1.38,3A4,4,0,0,0,18,15v3a2,2,0,0,1-2,2,1,1,0,0,0,0,2,4,4,0,0,0,4-4V15a2,2,0,0,1,2-2,1,1,0,0,0,0-2Z"></path></g></svg>`,
    "senseHat_category": `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 407 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M372 232.5l-3.7-6.5c.1-46.4-21.4-65.3-46.5-79.7 7.6-2 15.4-3.6 17.6-13.2 13.1-3.3 15.8-9.4 17.1-15.8 3.4-2.3 14.8-8.7 13.6-19.7 6.4-4.4 10-10.1 8.1-18.1 6.9-7.5 8.7-13.7 5.8-19.4 8.3-10.3 4.6-15.6 1.1-20.9 6.2-11.2.7-23.2-16.6-21.2-6.9-10.1-21.9-7.8-24.2-7.8-2.6-3.2-6-6-16.5-4.7-6.8-6.1-14.4-5-22.3-2.1-9.3-7.3-15.5-1.4-22.6.8C271.6.6 269 5.5 263.5 7.6c-12.3-2.6-16.1 3-22 8.9l-6.9-.1c-18.6 10.8-27.8 32.8-31.1 44.1-3.3-11.3-12.5-33.3-31.1-44.1l-6.9.1c-5.9-5.9-9.7-11.5-22-8.9-5.6-2-8.1-7-19.4-3.4-4.6-1.4-8.9-4.4-13.9-4.3-2.6.1-5.5 1-8.7 3.5-7.9-3-15.5-4-22.3 2.1-10.5-1.3-14 1.4-16.5 4.7-2.3 0-17.3-2.3-24.2 7.8C21.2 16 15.8 28 22 39.2c-3.5 5.4-7.2 10.7 1.1 20.9-2.9 5.7-1.1 11.9 5.8 19.4-1.8 8 1.8 13.7 8.1 18.1-1.2 11 10.2 17.4 13.6 19.7 1.3 6.4 4 12.4 17.1 15.8 2.2 9.5 10 11.2 17.6 13.2-25.1 14.4-46.6 33.3-46.5 79.7l-3.7 6.5c-28.8 17.2-54.7 72.7-14.2 117.7 2.6 14.1 7.1 24.2 11 35.4 5.9 45.2 44.5 66.3 54.6 68.8 14.9 11.2 30.8 21.8 52.2 29.2C159 504.2 181 512 203 512h1c22.1 0 44-7.8 64.2-28.4 21.5-7.4 37.3-18 52.2-29.2 10.2-2.5 48.7-23.6 54.6-68.8 3.9-11.2 8.4-21.3 11-35.4 40.6-45.1 14.7-100.5-14-117.7zm-22.2-8c-1.5 18.7-98.9-65.1-82.1-67.9 45.7-7.5 83.6 19.2 82.1 67.9zm-43 93.1c-24.5 15.8-59.8 5.6-78.8-22.8s-14.6-64.2 9.9-80c24.5-15.8 59.8-5.6 78.8 22.8s14.6 64.2-9.9 80zM238.9 29.3c.8 4.2 1.8 6.8 2.9 7.6 5.4-5.8 9.8-11.7 16.8-17.3 0 3.3-1.7 6.8 2.5 9.4 3.7-5 8.8-9.5 15.5-13.3-3.2 5.6-.6 7.3 1.2 9.6 5.1-4.4 10-8.8 19.4-12.3-2.6 3.1-6.2 6.2-2.4 9.8 5.3-3.3 10.6-6.6 23.1-8.9-2.8 3.1-8.7 6.3-5.1 9.4 6.6-2.5 14-4.4 22.1-5.4-3.9 3.2-7.1 6.3-3.9 8.8 7.1-2.2 16.9-5.1 26.4-2.6l-6 6.1c-.7.8 14.1.6 23.9.8-3.6 5-7.2 9.7-9.3 18.2 1 1 5.8.4 10.4 0-4.7 9.9-12.8 12.3-14.7 16.6 2.9 2.2 6.8 1.6 11.2.1-3.4 6.9-10.4 11.7-16 17.3 1.4 1 3.9 1.6 9.7.9-5.2 5.5-11.4 10.5-18.8 15 1.3 1.5 5.8 1.5 10 1.6-6.7 6.5-15.3 9.9-23.4 14.2 4 2.7 6.9 2.1 10 2.1-5.7 4.7-15.4 7.1-24.4 10 1.7 2.7 3.4 3.4 7.1 4.1-9.5 5.3-23.2 2.9-27 5.6.9 2.7 3.6 4.4 6.7 5.8-15.4.9-57.3-.6-65.4-32.3 15.7-17.3 44.4-37.5 93.7-62.6-38.4 12.8-73 30-102 53.5-34.3-15.9-10.8-55.9 5.8-71.8zm-34.4 114.6c24.2-.3 54.1 17.8 54 34.7-.1 15-21 27.1-53.8 26.9-32.1-.4-53.7-15.2-53.6-29.8 0-11.9 26.2-32.5 53.4-31.8zm-123-12.8c3.7-.7 5.4-1.5 7.1-4.1-9-2.8-18.7-5.3-24.4-10 3.1 0 6 .7 10-2.1-8.1-4.3-16.7-7.7-23.4-14.2 4.2-.1 8.7 0 10-1.6-7.4-4.5-13.6-9.5-18.8-15 5.8.7 8.3.1 9.7-.9-5.6-5.6-12.7-10.4-16-17.3 4.3 1.5 8.3 2 11.2-.1-1.9-4.2-10-6.7-14.7-16.6 4.6.4 9.4 1 10.4 0-2.1-8.5-5.8-13.3-9.3-18.2 9.8-.1 24.6 0 23.9-.8l-6-6.1c9.5-2.5 19.3.4 26.4 2.6 3.2-2.5-.1-5.6-3.9-8.8 8.1 1.1 15.4 2.9 22.1 5.4 3.5-3.1-2.3-6.3-5.1-9.4 12.5 2.3 17.8 5.6 23.1 8.9 3.8-3.6.2-6.7-2.4-9.8 9.4 3.4 14.3 7.9 19.4 12.3 1.7-2.3 4.4-4 1.2-9.6 6.7 3.8 11.8 8.3 15.5 13.3 4.1-2.6 2.5-6.2 2.5-9.4 7 5.6 11.4 11.5 16.8 17.3 1.1-.8 2-3.4 2.9-7.6 16.6 15.9 40.1 55.9 6 71.8-29-23.5-63.6-40.7-102-53.5 49.3 25 78 45.3 93.7 62.6-8 31.8-50 33.2-65.4 32.3 3.1-1.4 5.8-3.2 6.7-5.8-4-2.8-17.6-.4-27.2-5.6zm60.1 24.1c16.8 2.8-80.6 86.5-82.1 67.9-1.5-48.7 36.5-75.5 82.1-67.9zM38.2 342c-23.7-18.8-31.3-73.7 12.6-98.3 26.5-7 9 107.8-12.6 98.3zm91 98.2c-13.3 7.9-45.8 4.7-68.8-27.9-15.5-27.4-13.5-55.2-2.6-63.4 16.3-9.8 41.5 3.4 60.9 25.6 16.9 20 24.6 55.3 10.5 65.7zm-26.4-119.7c-24.5-15.8-28.9-51.6-9.9-80s54.3-38.6 78.8-22.8 28.9 51.6 9.9 80c-19.1 28.4-54.4 38.6-78.8 22.8zM205 496c-29.4 1.2-58.2-23.7-57.8-32.3-.4-12.7 35.8-22.6 59.3-22 23.7-1 55.6 7.5 55.7 18.9.5 11-28.8 35.9-57.2 35.4zm58.9-124.9c.2 29.7-26.2 53.8-58.8 54-32.6.2-59.2-23.8-59.4-53.4v-.6c-.2-29.7 26.2-53.8 58.8-54 32.6-.2 59.2 23.8 59.4 53.4v.6zm82.2 42.7c-25.3 34.6-59.6 35.9-72.3 26.3-13.3-12.4-3.2-50.9 15.1-72 20.9-23.3 43.3-38.5 58.9-26.6 10.5 10.3 16.7 49.1-1.7 72.3zm22.9-73.2c-21.5 9.4-39-105.3-12.6-98.3 43.9 24.7 36.3 79.6 12.6 98.3z"/></svg>`
};

const LIBRARIES_PATH_ESP32 = [
    {
        "path": "bluetooth",
        "content": ['ble_advertising', 'ble_simple_peripheral', 'ble_uart_peripheral', 'esp32_ble_uart', 'esp32_ble', 'vitta_ble_flash']
    },
    {
        "path": "grove",
        "content": [
            'esp32_bmp280', 'esp32_chainableLED', 'esp32_colorSensor', 'esp32_ds1307', 'esp32_gas_gmxxx', 'esp32_gas',
            'esp32_hm330x', 'esp32_lcd_i2c', 'esp32_my9221', 'esp32_paj7620', 'esp32_pcf85063tp', 'esp32_scd30', 'esp32_sgp30',
            'esp32_sht31', 'esp32_si1145', 'esp32_ssd1306', 'esp32_th02', 'esp32_tm1637', 'esp32_mpu6050'
        ]
    },
    {
        "path": "infrared",
        "content": ['nec_remote', 'ir_rx']
    },
    {
        "path": "onewire",
        "content": ['esp32_ds18b20']
    },
    {
        "path": "sdcard",
        "content": ['sdcard']
    },
    {
        "path": "wifi",
        "content": ['vitta_server', 'vitta_client', 'esp32_umail', 'vitta_mqtt']
    },
    'esp32_dissolved_oxygen_probe'
];