// deactivate rtc for local environment and Capytale context
const rtcInterfaces = (typeof IS_CAPYTALE_CONTEXT !== 'undefined' || location.origin.split('.').length === 1) ? [] : ['wb55', 'l476', 'buddy', 'letsstartcoding'];

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
const TOOLBOXES_SVGS_DEFINITION = {
    "icon_idea_on": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.9 24"><defs><clipPath id="a"><path data-name="Rectangle 3976" style="fill:none" d="M0 0h30v24H0z"/></clipPath></defs><g data-name="icon_idea_on" fill="currentColor" style="clip-path:url(#a)"><path data-name="Tracé 6712" d="M7 3a1 1 0 0 1-2 1L2 2a1 1 0 0 1 0-1 1 1 0 0 1 1-1 2 2 0 0 1 1 0l2 2a1 1 0 0 1 1 1"/><path data-name="Tracé 6713" d="M3 16a1 1 0 0 1-1-1 1 1 0 0 1 0-1l2-1h1a1 1 0 1 1 1 1l-3 2"/><path data-name="Tracé 6714" d="M28 15a1 1 0 0 1-1 1 1 1 0 0 1-1 0l-2-2a1 1 0 0 1-1-1 1 1 0 0 1 1-1 2 2 0 0 1 1 1l2 1a1 1 0 0 1 1 1"/><path data-name="Tracé 6715" d="M28 1a1 1 0 0 1-1 1l-2 2a1 1 0 0 1-2-1 1 1 0 0 1 1-1l2-2a1 1 0 0 1 2 1"/><path data-name="Tracé 6716" d="M3 9H1a1 1 0 0 1-1-1 1 1 0 0 1 0-1 1 1 0 0 1 1 0h3a1 1 0 0 1 1 2 1 1 0 0 1-1 0H3"/><path data-name="Tracé 6717" d="M27 7h2a1 1 0 0 1 1 2 1 1 0 0 1-1 0h-3a1 1 0 0 1 0-2h1Z"/><path data-name="Tracé 6718" d="M16 24h-2a1 1 0 0 1 0-1h2a1 1 0 0 1 0 1Zm1-2h-4a1 1 0 0 1 0-1h4a1 1 0 0 1 0 1Zm-2-3h-3l-1-4c-1-1-4-2-4-8 0-4 4-7 8-7s8 3 8 7c0 6-3 7-4 8l-2 4h-2ZM13 2a5 5 0 0 0-4 5 1 1 0 0 0 1 0 4 4 0 0 1 3-3 1 1 0 0 0 0-2Z"/></g></svg>`,
    "icon_drone": `<?xml xmlns="http://www.w3.org/2000/svg" version="1.0" encoding="UTF-8"?><svg id="Calque_2" viewBox="0 0 25 25"><defs><style>.cls-1{fill:currentColor;}</style></defs><g id="Calque_1-2"><path id="icon_tello" class="cls-1" d="M24.96,15.05l-.22-.26c-.07-.08-.18-.09-.26-.02-.29,.26-.95,.84-1.06,.93-.15,.12-2.27,1.53-2.59,1.85-.31,.31-.43,.57-.56,1.2-.03,0-.06,0-.09,0-.06,0-.11,0-.17,.01l-4.49-4.71,.03-3.17,4.41-4.63c.05,0,.11,.01,.16,.01,.03,0,.06,0,.09,0,.13,.63,.26,.89,.56,1.2,.32,.32,2.44,1.73,2.59,1.85,.11,.1,.77,.67,1.06,.93,.08,.07,.19,.06,.26-.02l.22-.26c.06-.07,.06-.18,0-.25-.27-.31-.98-1.12-1.17-1.32-.23-.24-1.4-1.82-2.04-2.4-.2-.18-.39-.34-.56-.48,.03-.11,.05-.22,.05-.34,0-.6-.47-1.09-1.05-1.09-.03,0-.06,0-.09,0-.02-.1-.04-.2-.05-.3-.07-.42-.38-.78-.71-1.08s-1.48-1.04-1.78-1.22c-.3-.18-.82-.63-.98-.76-.11-.1-.48-.46-.68-.66-.07-.07-.18-.07-.25,0l-.27,.25c-.08,.07-.08,.19-.02,.27l.04,.05s1.25,1.39,1.37,1.55,1.55,1.86,1.74,2.07c.13,.14,.44,.37,.68,.56-.01,.04-.03,.09-.04,.13l-3.58,1.93v-.24l-.42-.41-.33-.37v.04c-.18-.12-.71-.31-1.42-.39h0l-.1-.1c-.09-.09-.2-.14-.32-.14h-.88c-.12,0-.23,.06-.32,.14l-.1,.1-.08,.02c-.79,.08-1.31,.23-1.4,.39h0l-.26,.3-.41,.41v.23l-3.62-1.95s-.02-.09-.04-.13c.25-.18,.55-.42,.68-.56,.19-.2,1.62-1.9,1.74-2.07,.12-.16,1.37-1.55,1.37-1.55l.04-.05c.07-.08,.06-.2-.02-.27l-.27-.25c-.07-.07-.18-.06-.25,0-.2,.19-.57,.56-.68,.66-.16,.13-.68,.59-.98,.76s-1.45,.92-1.78,1.22c-.33,.3-.63,.65-.71,1.08-.02,.1-.04,.2-.05,.3-.03,0-.06,0-.09,0-.58,0-1.05,.49-1.05,1.09,0,.12,.02,.23,.05,.34-.17,.14-.36,.3-.56,.48-.64,.57-1.81,2.15-2.04,2.4-.19,.19-.9,1-1.17,1.32-.06,.07-.06,.18,0,.25l.22,.26c.07,.08,.18,.09,.26,.02,.29-.26,.95-.84,1.06-.93,.15-.12,2.27-1.53,2.59-1.85,.31-.31,.43-.57,.56-1.2,.03,0,.06,0,.09,0,.06,0,.11,0,.16-.01l4.44,4.67,.03,3.24-4.42,4.64c-.05,0-.11-.01-.16-.01-.03,0-.06,0-.09,0-.13-.63-.26-.89-.56-1.2-.32-.32-2.44-1.73-2.59-1.85-.11-.1-.77-.67-1.06-.93-.08-.07-.19-.06-.26,.02l-.22,.26c-.06,.07-.06,.18,0,.25,.27,.31,.98,1.12,1.17,1.32,.23,.24,1.4,1.82,2.04,2.4,.2,.18,.39,.34,.56,.48-.03,.11-.05,.22-.05,.34,0,.6,.47,1.09,1.05,1.09,.03,0,.06,0,.09,0,.02,.1,.04,.2,.05,.3,.07,.42,.38,.78,.71,1.08,.33,.3,1.48,1.04,1.78,1.22,.3,.18,.82,.63,.98,.76,.11,.1,.48,.46,.68,.66,.07,.07,.18,.07,.25,0l.27-.25c.08-.07,.08-.19,.02-.27l-.04-.05s-1.25-1.39-1.37-1.55c-.12-.16-1.55-1.86-1.74-2.07-.13-.14-.44-.37-.68-.56,.01-.04,.03-.09,.04-.13l4-2.16c.26,.01,.6,.05,.6,.05h3.98s.44-.05,.7-.05l3.97,2.14s.02,.09,.04,.13c-.25,.18-.55,.42-.68,.56-.19,.2-1.62,1.9-1.74,2.07-.12,.16-1.37,1.55-1.37,1.55l-.04,.05c-.07,.08-.06,.2,.02,.27l.27,.25c.07,.07,.18,.06,.25,0,.2-.19,.57-.56,.68-.66,.16-.13,.68-.59,.98-.76,.3-.18,1.45-.92,1.78-1.22s.63-.65,.71-1.08c.02-.1,.04-.2,.05-.3,.03,0,.06,0,.09,0,.58,0,1.05-.49,1.05-1.09,0-.12-.02-.23-.05-.34,.17-.14,.36-.3,.56-.48,.64-.57,1.81-2.15,2.04-2.4,.19-.19,.9-1,1.17-1.32,.06-.07,.06-.18,0-.25Zm-5.81,4.55l-3.79-2.04s0-.03,0-.04c0-.1,.12-.46,.13-.54s-.03-1.99,.14-2.02c.08,0,.15,0,.22,0l3.76,3.95c-.23,.16-.4,.4-.46,.69Zm-3.36-9.56l.06-.17-.07-2.38-.18-.22,3.49-1.88c.06,.29,.23,.54,.46,.69l-3.77,3.96ZM5.85,5.38l3.53,1.9-.18,.22-.07,2.38,.07,.2-3.81-4c.23-.16,.4-.4,.46-.69Zm3.38,9.58s.08,0,.12,0c.18,.02,.14,1.94,.14,2.02,0,.08,.12,.44,.13,.54,0,.02,0,.06-.01,.11l-3.7,2c-.06-.29-.23-.54-.46-.69l3.79-3.98Z"/></g></svg>`,
    "icon_function": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.42 5.29c-1.1-.1-2.07.71-2.17 1.82L10 10h2.82v2h-3l-.44 5.07A4.001 4.001 0 0 1 2 18.83l1.5-1.5c.33 1.05 1.46 1.64 2.5 1.3.78-.24 1.33-.93 1.4-1.74L7.82 12h-3v-2H8l.27-3.07a4.01 4.01 0 0 1 4.33-3.65c1.26.11 2.4.81 3.06 1.89l-1.5 1.5c-.25-.77-.93-1.31-1.74-1.38M22 13.65l-1.41-1.41-2.83 2.83-2.83-2.83-1.43 1.41 2.85 2.85-2.85 2.81 1.43 1.41 2.83-2.83 2.83 2.83L22 19.31l-2.83-2.81L22 13.65Z" fill="currentColor"/></svg>`,
    "icon_bracket": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-name="Layer 1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6,6A2,2,0,0,1,8,4,1,1,0,0,0,8,2,4,4,0,0,0,4,6V9a2,2,0,0,1-2,2,1,1,0,0,0,0,2,2,2,0,0,1,2,2v3a4,4,0,0,0,4,4,1,1,0,0,0,0-2,2,2,0,0,1-2-2V15a4,4,0,0,0-1.38-3A4,4,0,0,0,6,9Zm16,5a2,2,0,0,1-2-2V6a4,4,0,0,0-4-4,1,1,0,0,0,0,2,2,2,0,0,1,2,2V9a4,4,0,0,0,1.38,3A4,4,0,0,0,18,15v3a2,2,0,0,1-2,2,1,1,0,0,0,0,2,4,4,0,0,0,4-4V15a2,2,0,0,1,2-2,1,1,0,0,0,0-2Z"></path></g></svg>`,
    "icon_raspberry": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 407 512" fill="currentColor"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M372 232.5l-3.7-6.5c.1-46.4-21.4-65.3-46.5-79.7 7.6-2 15.4-3.6 17.6-13.2 13.1-3.3 15.8-9.4 17.1-15.8 3.4-2.3 14.8-8.7 13.6-19.7 6.4-4.4 10-10.1 8.1-18.1 6.9-7.5 8.7-13.7 5.8-19.4 8.3-10.3 4.6-15.6 1.1-20.9 6.2-11.2.7-23.2-16.6-21.2-6.9-10.1-21.9-7.8-24.2-7.8-2.6-3.2-6-6-16.5-4.7-6.8-6.1-14.4-5-22.3-2.1-9.3-7.3-15.5-1.4-22.6.8C271.6.6 269 5.5 263.5 7.6c-12.3-2.6-16.1 3-22 8.9l-6.9-.1c-18.6 10.8-27.8 32.8-31.1 44.1-3.3-11.3-12.5-33.3-31.1-44.1l-6.9.1c-5.9-5.9-9.7-11.5-22-8.9-5.6-2-8.1-7-19.4-3.4-4.6-1.4-8.9-4.4-13.9-4.3-2.6.1-5.5 1-8.7 3.5-7.9-3-15.5-4-22.3 2.1-10.5-1.3-14 1.4-16.5 4.7-2.3 0-17.3-2.3-24.2 7.8C21.2 16 15.8 28 22 39.2c-3.5 5.4-7.2 10.7 1.1 20.9-2.9 5.7-1.1 11.9 5.8 19.4-1.8 8 1.8 13.7 8.1 18.1-1.2 11 10.2 17.4 13.6 19.7 1.3 6.4 4 12.4 17.1 15.8 2.2 9.5 10 11.2 17.6 13.2-25.1 14.4-46.6 33.3-46.5 79.7l-3.7 6.5c-28.8 17.2-54.7 72.7-14.2 117.7 2.6 14.1 7.1 24.2 11 35.4 5.9 45.2 44.5 66.3 54.6 68.8 14.9 11.2 30.8 21.8 52.2 29.2C159 504.2 181 512 203 512h1c22.1 0 44-7.8 64.2-28.4 21.5-7.4 37.3-18 52.2-29.2 10.2-2.5 48.7-23.6 54.6-68.8 3.9-11.2 8.4-21.3 11-35.4 40.6-45.1 14.7-100.5-14-117.7zm-22.2-8c-1.5 18.7-98.9-65.1-82.1-67.9 45.7-7.5 83.6 19.2 82.1 67.9zm-43 93.1c-24.5 15.8-59.8 5.6-78.8-22.8s-14.6-64.2 9.9-80c24.5-15.8 59.8-5.6 78.8 22.8s14.6 64.2-9.9 80zM238.9 29.3c.8 4.2 1.8 6.8 2.9 7.6 5.4-5.8 9.8-11.7 16.8-17.3 0 3.3-1.7 6.8 2.5 9.4 3.7-5 8.8-9.5 15.5-13.3-3.2 5.6-.6 7.3 1.2 9.6 5.1-4.4 10-8.8 19.4-12.3-2.6 3.1-6.2 6.2-2.4 9.8 5.3-3.3 10.6-6.6 23.1-8.9-2.8 3.1-8.7 6.3-5.1 9.4 6.6-2.5 14-4.4 22.1-5.4-3.9 3.2-7.1 6.3-3.9 8.8 7.1-2.2 16.9-5.1 26.4-2.6l-6 6.1c-.7.8 14.1.6 23.9.8-3.6 5-7.2 9.7-9.3 18.2 1 1 5.8.4 10.4 0-4.7 9.9-12.8 12.3-14.7 16.6 2.9 2.2 6.8 1.6 11.2.1-3.4 6.9-10.4 11.7-16 17.3 1.4 1 3.9 1.6 9.7.9-5.2 5.5-11.4 10.5-18.8 15 1.3 1.5 5.8 1.5 10 1.6-6.7 6.5-15.3 9.9-23.4 14.2 4 2.7 6.9 2.1 10 2.1-5.7 4.7-15.4 7.1-24.4 10 1.7 2.7 3.4 3.4 7.1 4.1-9.5 5.3-23.2 2.9-27 5.6.9 2.7 3.6 4.4 6.7 5.8-15.4.9-57.3-.6-65.4-32.3 15.7-17.3 44.4-37.5 93.7-62.6-38.4 12.8-73 30-102 53.5-34.3-15.9-10.8-55.9 5.8-71.8zm-34.4 114.6c24.2-.3 54.1 17.8 54 34.7-.1 15-21 27.1-53.8 26.9-32.1-.4-53.7-15.2-53.6-29.8 0-11.9 26.2-32.5 53.4-31.8zm-123-12.8c3.7-.7 5.4-1.5 7.1-4.1-9-2.8-18.7-5.3-24.4-10 3.1 0 6 .7 10-2.1-8.1-4.3-16.7-7.7-23.4-14.2 4.2-.1 8.7 0 10-1.6-7.4-4.5-13.6-9.5-18.8-15 5.8.7 8.3.1 9.7-.9-5.6-5.6-12.7-10.4-16-17.3 4.3 1.5 8.3 2 11.2-.1-1.9-4.2-10-6.7-14.7-16.6 4.6.4 9.4 1 10.4 0-2.1-8.5-5.8-13.3-9.3-18.2 9.8-.1 24.6 0 23.9-.8l-6-6.1c9.5-2.5 19.3.4 26.4 2.6 3.2-2.5-.1-5.6-3.9-8.8 8.1 1.1 15.4 2.9 22.1 5.4 3.5-3.1-2.3-6.3-5.1-9.4 12.5 2.3 17.8 5.6 23.1 8.9 3.8-3.6.2-6.7-2.4-9.8 9.4 3.4 14.3 7.9 19.4 12.3 1.7-2.3 4.4-4 1.2-9.6 6.7 3.8 11.8 8.3 15.5 13.3 4.1-2.6 2.5-6.2 2.5-9.4 7 5.6 11.4 11.5 16.8 17.3 1.1-.8 2-3.4 2.9-7.6 16.6 15.9 40.1 55.9 6 71.8-29-23.5-63.6-40.7-102-53.5 49.3 25 78 45.3 93.7 62.6-8 31.8-50 33.2-65.4 32.3 3.1-1.4 5.8-3.2 6.7-5.8-4-2.8-17.6-.4-27.2-5.6zm60.1 24.1c16.8 2.8-80.6 86.5-82.1 67.9-1.5-48.7 36.5-75.5 82.1-67.9zM38.2 342c-23.7-18.8-31.3-73.7 12.6-98.3 26.5-7 9 107.8-12.6 98.3zm91 98.2c-13.3 7.9-45.8 4.7-68.8-27.9-15.5-27.4-13.5-55.2-2.6-63.4 16.3-9.8 41.5 3.4 60.9 25.6 16.9 20 24.6 55.3 10.5 65.7zm-26.4-119.7c-24.5-15.8-28.9-51.6-9.9-80s54.3-38.6 78.8-22.8 28.9 51.6 9.9 80c-19.1 28.4-54.4 38.6-78.8 22.8zM205 496c-29.4 1.2-58.2-23.7-57.8-32.3-.4-12.7 35.8-22.6 59.3-22 23.7-1 55.6 7.5 55.7 18.9.5 11-28.8 35.9-57.2 35.4zm58.9-124.9c.2 29.7-26.2 53.8-58.8 54-32.6.2-59.2-23.8-59.4-53.4v-.6c-.2-29.7 26.2-53.8 58.8-54 32.6-.2 59.2 23.8 59.4 53.4v.6zm82.2 42.7c-25.3 34.6-59.6 35.9-72.3 26.3-13.3-12.4-3.2-50.9 15.1-72 20.9-23.3 43.3-38.5 58.9-26.6 10.5 10.3 16.7 49.1-1.7 72.3zm22.9-73.2c-21.5 9.4-39-105.3-12.6-98.3 43.9 24.7 36.3 79.6 12.6 98.3z"/></svg>`,
    "icon_ia_sensors": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.07 32.76" fill="currentColor" id="Calque_2" data-name="Calque 2"><g id="Calque_1-2" data-name="Calque 1-2"><path id="IA_microcontroleur_green_picto" data-name="IA microcontroleur green picto" d="M33.97,13.12l-2.23-5.43c-.59-1.45-2-2.35-3.55-2.32-1.56,.04-2.91,1.02-3.44,2.49l-4.7,13.23c-.25,.7-.89,.73-1.06,.74-.19,0-.81-.06-1.05-.76l-4.28-12.92c-.5-1.5-1.84-2.51-3.43-2.56-1.6-.05-2.99,.86-3.59,2.33l-2.71,6.64V4.54h1.31L2.62,0,0,4.54H1.31V30.13c0,.73,.59,1.31,1.31,1.31H28.21v1.31l4.54-2.62-4.54-2.62v1.31H3.94v-7.31l5.15-12.6c.27-.67,.89-.69,1.07-.69s.79,.08,1.02,.76l4.28,12.92c.51,1.54,1.89,2.55,3.51,2.57h.04c1.61,0,2.99-.97,3.52-2.49l4.7-13.23c.24-.67,.84-.74,1.02-.74s.79,.03,1.06,.69l2.23,5.43c.28,.67,1.04,.99,1.71,.72,.67-.28,.99-1.04,.72-1.71v-.02Z"/></g></svg>`,
    "icon_grove": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63 115" fill="currentColor"><path fill-rule="evenodd" d="M 36 7 L 31 8 L 28 12 L 28 19 L 32 24 L 30 33 L 26 38 L 21 38 L 19 36 L 19 26 L 14 22 L 8 22 L 3 29 L 8 37 L 16 37 L 20 41 L 20 47 L 15 51 L 11 51 L 7 48 L 1 48 L 0 49 L 0 53 L 2 51 L 5 51 L 8 54 L 8 58 L 5 61 L 2 61 L 0 59 L 1 64 L 7 64 L 11 60 L 12 55 L 17 51 L 20 51 L 24 54 L 25 72 L 17 80 L 14 87 L 14 91 L 17 98 L 26 103 L 33 103 L 37 101 L 41 97 L 43 91 L 43 87 L 41 82 L 31 71 L 31 66 L 30 65 L 31 64 L 30 61 L 31 53 L 34 51 L 40 52 L 42 56 L 42 59 L 46 62 L 53 62 L 57 58 L 56 52 L 50 47 L 45 48 L 43 50 L 40 50 L 36 48 L 35 43 L 30 36 L 34 24 L 39 22 L 43 17 L 42 10 Z M 23 83 L 27 81 L 31 81 L 36 85 L 37 90 L 33 96 L 27 97 L 22 94 L 20 88 Z M 47 51 L 52 51 L 55 54 L 55 56 L 51 60 L 48 60 L 45 58 L 45 53 Z M 25 41 L 29 41 L 32 44 L 32 48 L 28 51 L 26 51 L 22 47 L 22 45 Z M 11 24 L 16 27 L 16 31 L 13 34 L 8 33 L 6 29 Z M 34 9 L 36 9 L 40 13 L 40 17 L 37 20 L 33 20 L 30 16 L 31 12 Z"/></svg>`,
    "icon_arduino": `<svg xmlns="http://www.w3.org/2000/svg" width="2499" height="2500" viewBox="0 0 1372.201 1372.684"><path fill="#00979D" stroke="#81C9CB" stroke-width=".932" stroke-miterlimit="10" d="M1371.701 686.024c0 378.658-306.972 685.605-685.549 685.605C307.451 1371.629.5 1064.682.5 686.024.5 307.455 307.451.483 686.152.483c378.594.001 685.549 306.972 685.549 685.541z"/><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="-16.3" y1="16.071" x2="1354.901" y2="16.071" gradientTransform="matrix(1 0 0 -1 16.8 702.696)"><stop offset=".117" stop-color="#fff" stop-opacity="0"/><stop offset=".252" stop-color="#c0d1d3" stop-opacity=".153"/><stop offset=".387" stop-color="#91b3b7" stop-opacity=".306"/><stop offset=".52" stop-color="#6d9fa3" stop-opacity=".457"/><stop offset=".65" stop-color="#4d9195" stop-opacity=".604"/><stop offset=".776" stop-color="#30888b" stop-opacity=".746"/><stop offset=".895" stop-color="#148386" stop-opacity=".881"/><stop offset="1" stop-color="#008184"/></linearGradient><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="-16.8" y1="16.071" x2="1355.401" y2="16.071" gradientTransform="matrix(1 0 0 -1 16.8 702.696)"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".153" stop-color="#c0d1d3" stop-opacity=".153"/><stop offset=".306" stop-color="#91b3b7" stop-opacity=".306"/><stop offset=".457" stop-color="#6d9fa3" stop-opacity=".457"/><stop offset=".604" stop-color="#4d9195" stop-opacity=".604"/><stop offset=".746" stop-color="#30888b" stop-opacity=".746"/><stop offset=".881" stop-color="#148386" stop-opacity=".881"/><stop offset="1" stop-color="#008184"/></linearGradient><path opacity=".5" fill="url(#a)" stroke="url(#b)" stroke-miterlimit="10" d="M1371.701 686.595c0 378.65-306.972 685.606-685.549 685.606C307.451 1372.201.5 1065.23.5 686.595.5 308.019 307.451 1.048 686.152 1.048c378.594.016 685.549 306.97 685.549 685.547z"/><g fill="#FFF"><path d="M947.959 931.196c-12.909 0-26.127-.929-39.127-2.864-108.978-15.554-181.848-93.822-222.665-153.989-40.946 60.166-113.811 138.512-222.74 154.045a275.864 275.864 0 0 1-39.133 2.785c-67.753 0-131.358-25.217-179.201-71.003-48.299-46.165-74.951-108.114-74.951-174.171 0-66.14 26.651-128.004 75.021-174.253 47.797-45.793 111.449-70.936 179.231-70.936 12.918 0 26.067.928 39.023 2.783 108.932 15.535 181.794 93.813 222.743 153.99 40.825-60.177 113.689-138.432 222.658-153.99 13-1.863 26.148-2.783 39.066-2.783 67.753 0 131.401 25.208 179.197 70.936 48.345 46.249 74.937 108.113 74.937 174.253 0 66.057-26.524 128.006-74.868 174.171-47.881 45.785-111.434 71.026-179.191 71.026M734.42 686.024c21.283 40.534 84.067 141.676 186.692 156.375 8.984 1.236 18.028 1.923 26.839 1.923 92.185 0 167.225-71.002 167.225-158.322s-75.023-158.321-167.291-158.321c-8.812 0-17.853.629-26.753 1.921-102.644 14.664-165.428 115.806-186.712 156.424M424.393 527.702c-92.308 0-167.36 70.998-167.36 158.321 0 87.305 75.021 158.322 167.245 158.322 8.852 0 17.897-.688 26.879-1.922 102.629-14.697 165.394-115.783 186.689-156.375-21.237-40.535-84.061-141.761-186.689-156.376-8.877-1.341-17.945-1.97-26.764-1.97"/><path d="M354.37 662.051h152.625v49.181H354.37zM1016.484 662.051h-51.671v-51.747h-49.348v51.747h-51.648v49.181h51.648v51.737h49.348v-51.737h51.671z"/></g></svg>`,
    "icon_robot_bitbot": `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 228 229"><path fill-rule="evenodd" d="m51 21-2 3-1 22v22h132V24l-2-3-3-2H54zm-5 55c-1 1-2 63 0 66 0 2 3 2 23 2h22v23H71l-19 1-2 2q-2 5 2 9c1 2 4 2 20 2h19v5c0 8 0 8 24 8 23 0 23 0 23-9v-4h19c21 0 22 0 22-7s0-7-22-7h-20v-23h46v-34l-1-34c-2-2-134-1-136 0m27 14c-11 5-15 17-11 28 7 21 36 20 43 0 5-19-14-36-32-28m63 0c-20 9-16 38 5 43 14 3 27-8 27-22 0-17-18-28-32-21M7 110c-7 4-7 2-7 49v42l3 4c6 5 18 5 24-1l2-2v-43l-1-44c-3-5-14-7-21-5m198 1c-7 4-7 3-7 48s0 44 7 48c7 3 17 2 21-4 3-3 3-83 1-87-4-6-14-9-22-5M34 169c-5 4-1 12 5 12q10-2 7-11c-2-3-10-4-12-1m149 0q-4 10 6 12 10-1 7-11c-2-3-11-4-13-1"/></svg>`,
    "icon_robot_bitcar": `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 228 229"><path fill-rule="evenodd" d="M32 16c-5 2-5-3-5 83l1 81 1 3h63v7l1 9q3 3 8 3 7-2 6-12v-7h15v7l1 9q3 3 8 3 7-2 6-12v-7h31c30 0 31 0 32-2l1-82V19l-3-2q-4-4-9 0c-3 1-3 1-3 8v7H42v-7l-1-8q-4-2-9-1m10 92v61h54v-7H47v-34l1-36c2-2 131-2 133 0l1 36v34h-50v7h54V47H42zm13-53q-5 2-5 18v11h128V58l-3-2-3-3h-57c-48 0-58 0-60 2M3 77l-3 4v62c0 59 0 62 2 65 4 6 13 6 18 0l3-2v-60l-1-64c-2-9-12-11-19-5m208-2c-5 3-5 2-5 69 0 60 0 62 2 64 4 6 14 6 18 0 3-3 3-126 0-130q-6-6-15-3M75 105c-14 4-21 20-14 33 9 17 34 17 42 1 9-19-8-40-28-34m65 0c-21 6-23 35-3 44 11 5 26 0 31-9 9-19-8-41-28-35"/></svg>`,
    "icon_robot_buggy": `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 228 229"><path fill-rule="evenodd" d="M78 9q-2 1-2 7v5h11v-5q-1-13-9-7m64 0q-2 1-2 7v5h11v-6l-1-7q-5-2-8 1M62 29q-5 2-5 15v10h114v-9q0-13-6-16zm-29 9-2 1v79c0 87 0 83 6 83 5 0 5 4 5-83V39l-2-1-3-2zm156-1q-2 0-3 3c-2 4-1 156 1 159q4 4 8 0c3-3 3-158 1-160q-3-3-7-2M54 62c-5 3-5 4-5 54v48h129V66l-3-2-3-3h-58zM7 67c-7 3-7 1-7 68 0 65 0 64 6 68q12 5 18-6c2-7 1-123-1-126q-6-9-16-4m206-1-8 5c-2 4-2 124 1 128 3 7 13 8 19 2l3-4v-61l-1-64q-5-8-14-6M49 179c0 8 1 9 3 12l3 3h56l59-1q9-1 8-13v-9H49z"/></svg>`,
    "icon_robot_codo": `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 228 229"><path fill-rule="evenodd" d="M49 26c-3 3-3 3-3 20v16h137V28l-3-3-3-2H51zm-5 44-1 6v6l-4-1c-7-1-7-2-7 40v39l-3 1-3 1-1 11 1 14c2 2 74 2 76 0l1-9 1-7 10-1c12 0 12 0 12 9l1 8c2 2 73 2 75 0l1-13c0-12-1-14-4-14-2 0-2-2-2-38 0-39 0-39-2-40l-6-1-3 1v-6l-1-6c-2-1-140-2-141 0M3 76l-3 4v116l3 4c6 5 16 4 19-4 2-5 2-111 0-116-4-8-13-10-19-4m208-2c-5 3-5 2-5 64l1 60c3 6 14 7 19 1 2-2 2-7 2-61V79l-3-3q-7-5-14-2M77 78q-17 4-18 24c0 23 33 32 44 11 9-18-6-39-26-35m65 0c-23 4-26 35-4 45 11 5 25 0 30-11 8-18-6-37-26-34m-98 74v8h141v-17H44z"/></svg>`,
    "icon_robot_cutebot": `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 228 229"><path fill-rule="evenodd" d="M53 20c-5 3-5 4-5 36l1 30 4-4 12-9 7-3 39-1c49 0 53 1 64 13l5 4V25l-2-3-3-2-60-1zM7 61c-7 5-7 5-7 51v42h12l12-1-2-4q-6-13 6-24l4-4V96c0-28 0-30-6-34-5-4-14-4-19-1m197 0c-8 5-7 5-8 34v27l4 2c7 5 10 17 6 25l-2 4 12 1h12v-42c0-41 0-43-2-46-4-7-15-9-22-5M69 78c-15 5-25 20-24 36 1 20 16 33 37 34h9l3 6 4 5H51c-56 0-51-1-51 11s-5 11 50 11h47v8c0 11 0 11 17 11 18 0 18 0 18-11v-8h94l1-2c3-4 3-17 0-19l-48-1-47-1 4-5q3-6 9-5c22 0 37-14 38-34 0-13-2-19-10-28-11-10-11-10-59-10-34 0-41 0-45 2m4 13c-19 10-17 36 4 43 16 4 32-11 28-27-3-14-19-22-32-16m64 0c-16 7-19 28-5 39 15 11 36 1 36-18 0-16-17-28-31-21M32 132c-6 4-7 13-1 18 6 7 18 3 20-6 2-10-9-18-19-12m151 0c-11 9-3 25 10 21 8-2 11-13 5-19q-8-6-15-2M0 170l1 4v-8zm0 25q2 18 17 17t15-18v-7H0zm196-2q0 19 17 19 14 0 15-18v-7h-32z"/></svg>`,
    "icon_robot_gamepad": `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 228 229"><path fill-rule="evenodd" d="m83 73-1 22v21h63V72l-31-1c-27 0-31 0-31 2M38 85c-5 3-8 8-23 38-14 30-14 31-13 35 3 11 7 12 31 12h20l5-4 13-9c1 0 2-12 2-44V84H57zm117 36 1 36 6 4c12 10 10 9 32 9s25-1 29-8c3-6 3-8-12-40-19-39-17-38-41-38h-15zm23-12c-7 3-6 15 2 16 3 1 9-2 10-5 1-7-5-14-12-11m-141 1c-7 3-7 13 1 16s15-7 9-13q-5-5-10-3m45 31v15h63v-30H82zm-65-12c-5 6-1 15 6 15q8-2 9-8c0-7-10-11-15-7m35 1q-6 6 0 11c6 6 14 2 14-5 0-8-8-12-14-6m137 8c-5 2-5 11 0 14 9 5 17-7 9-14q-3-4-9 0m-155 9c-4 5 0 14 7 14q6-1 8-9c0-7-10-11-15-5"/></svg>`,
    "icon_robot_kitrobot": `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 228 229"><path fill-rule="evenodd" d="M52 3c-3 1-4 5-4 33v27h132V35c0-27 0-28-2-30l-2-3h-61zm-5 67c-2 1-2 4-2 31l1 29h137v-29c0-27 0-30-2-31-2-2-132-2-134 0m27 10q-13 4-14 19c0 6 0 7 3 12 9 18 36 16 41-3 2-7 2-7 1-14-4-13-18-19-31-14m65-1q-17 5-16 24c2 22 33 29 43 9 8-19-8-39-27-33M30 139c-3 2-2 8 0 10 1 2 5 2 32 2h31v25H62c-34 0-34 0-34 7s0 7 34 7h31v6l1 5 6 3q14 4 29 0l6-3v-11h31c35 0 34 0 34-7s1-7-34-7h-31v-25h31c35 0 34 0 34-7 0-8 6-7-86-7-79 0-83 0-84 2m-22 2c-5 3-5 3-5 42 0 42 0 41 7 43q6 2 13-1l2-2v-39c0-39 0-40-2-42s-12-3-15-1m199 0c-5 3-5 3-5 42 0 42 0 41 7 43q7 2 13-1l2-2v-39c0-39 0-40-2-42s-12-3-15-1"/></svg>`,
    "icon_robot_maqueen": `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 228 229"><path fill-rule="evenodd" d="m51 17-3 3v44h132V20l-3-3-3-3H54zM7 65c-7 5-7 5-7 51v41h24l-2-4c-4-9-1-20 7-25l3-2v-26c0-29 0-30-7-35q-9-4-18 0m196 0c-6 4-7 8-7 36v25l4 2c8 5 10 17 6 25l-2 4h24v-42c0-46 0-46-7-50q-9-4-18 0M46 72l-1 30c0 27 0 28 2 28 2 1 8 8 8 10l21 1h21v22H50c-55 0-50-1-50 9s-5 9 50 9h47v8c0 11 0 11 17 11 18 0 18 0 18-11v-8h94l1-2c3-3 3-13 0-15l-49-1h-47v-22h42l1-3 5-6 4-2v-29c0-25 0-29-2-29-3-2-134-1-135 0m27 14c-20 9-16 38 5 43q15 2 24-9c12-20-8-44-29-34m61 1c-17 9-14 36 6 42 22 6 38-22 21-39q-12-10-27-3M32 136c-8 5-6 18 4 21q11 2 15-9c2-10-9-18-19-12m151 0c-11 6-4 24 8 21q10-1 10-12c0-9-11-14-18-9M0 172l1 3v-6zm0 22q0 19 17 18 15-2 15-18v-7H0zm196 1q1 17 16 17t16-18v-7h-32z"/></svg>`,
    "icon_robot_maqueen-plus": `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 228 229"><path fill-rule="evenodd" d="M46 11q-10 3-16 14c-3 6-3 7-3 18v11H15C4 54 3 54 2 56q-3 5 0 10c1 2 1 2 24 2h22v17h132V68h22c23 0 24 0 26-4q7-10-15-10h-12V43q1-18-9-25c-8-9-4-8-76-9-60 0-65 0-70 2m8 11q-16 5-16 27v5h10v-8c0-8 0-9 2-12l3-2 60-1h61l3 3c3 3 3 3 3 11v9h10v-9q-1-16-11-21l-5-2-58-1zM0 61q0 3 1 2v-4q-1-1-1 2m8 16q-4 2-6 6c-2 3-2 4-2 45v42h12l12-1-2-4q-6-13 6-24l4-4v-25c0-25 0-26-2-29q-5-8-14-8zm196 0c-8 5-7 5-8 34v27l4 2c7 5 10 17 6 25l-2 4 12 1h12v-42c0-41 0-43-2-46-4-7-15-9-22-5M46 93l-1 24v25l4 2 5 6 1 3h42v22H50c-54 0-50-1-50 9s-5 9 50 9h47v8c0 11 0 11 17 11 18 0 18 0 18-11v-8h94l1-2c3-3 3-13 0-15l-49-1h-47v-22h42l2-4 5-6 3-1V93l-69-1zm30 8q-19 9-15 28c5 20 33 23 42 5s-8-39-27-33m62 0c-16 6-21 28-7 39 15 13 37 3 37-17 0-15-15-26-30-22M33 148c-8 4-8 17 1 21 10 4 20-6 15-16-2-7-10-9-16-5m152-1c-11 4-9 20 2 23 10 2 19-12 11-20q-6-5-13-3M0 184l1 3v-6zm0 23q1 17 16 17 15 1 16-17v-8H0zm196-1q2 18 16 18t16-18v-7h-32z"/></svg>`,
    "icon_robot_oobybot": `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 228 229"><path fill-rule="evenodd" d="M44 58c-7 1-20 6-27 11C0 80-5 95 5 106c6 6 9 7 31 7h20l1 7c3 19 19 37 38 44 34 12 72-11 78-47v-4h41l5-4q10-6 10-17l-1-5-2-3c-4-10-23-22-41-26zm29 20c-8 4-8 16 0 21 11 5 21-8 13-18q-6-6-13-3m72 1q-11 8-2 18c9 8 23-2 18-13q-6-9-16-5M0 93q0 5 1 3v-6q-1-1-1 3m32 26-3 3v52l3 3q6 6 11 0l3-3v-25c0-27 0-30-5-32q-5-3-9 2m155-2c-4 2-4 5-4 32v25l3 3q6 6 11 0l3-3v-25l-1-28q-4-6-12-4m-80 14c-8 7-3 19 7 19q9-1 11-8c3-11-10-18-18-11m-55 18 1 18h33l-6-4q-16-10-24-25l-4-6zm122-13q-9 18-26 27l-5 3c0 2 33 1 34 0v-34z"/></svg>`,
    "icon_robot_cutebotpro": `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 228 229"><path fill-rule="evenodd" d="M60 18h108a8 8 0 0 1 8 8v34a8 8 0 0 1-8 8H60a8 8 0 0 1-8-8V26a8 8 0 0 1 8-8m-8 58h124a14 14 0 0 1 14 14v56a14 14 0 0 1-14 14H52a14 14 0 0 1-14-14V90a14 14 0 0 1 14-14m9 42a25 25 0 1 0 50 0 25 25 0 1 0-50 0m56 0a25 25 0 1 0 50 0 25 25 0 1 0-50 0m-17 42h28v12h-28zm-73 10h174a9 9 0 0 1 9 9 9 9 0 0 1-9 9H27a9 9 0 0 1-9-9 9 9 0 0 1 9-9"/><path fill-rule="evenodd" d="M15 92a15 15 0 0 1 15 15v88a15 15 0 0 1-15 15 15 15 0 0 1-15-15v-88a15 15 0 0 1 15-15m198 0a15 15 0 0 1 15 15v88a15 15 0 0 1-15 15 15 15 0 0 1-15-15v-88a15 15 0 0 1 15-15M47 196a9 9 0 1 0 18 0 9 9 0 1 0-18 0m116 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0"/></svg>`,
    "icon_robot_uhandbit": `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 228 229"><path fill-rule="evenodd" d="M71 46a11 11 0 0 1 11 11v54a11 11 0 0 1-11 11 11 11 0 0 1-11-11V57a11 11 0 0 1 11-11m27-22a11 11 0 0 1 11 11v76a11 11 0 0 1-11 11 11 11 0 0 1-11-11V35a11 11 0 0 1 11-11m27 6a11 11 0 0 1 11 11v70a11 11 0 0 1-11 11 11 11 0 0 1-11-11V41a11 11 0 0 1 11-11m27 22a11 11 0 0 1 11 11v48a11 11 0 0 1-11 11 11 11 0 0 1-11-11V63a11 11 0 0 1 11-11"/><path fill-rule="evenodd" d="M76 104h70a18 18 0 0 1 18 18v40a18 18 0 0 1-18 18H76a18 18 0 0 1-18-18v-40a18 18 0 0 1 18-18"/><path fill-rule="evenodd" d="m22 108 18-12 40 52-18 14zm56 76h64v16H78zm-24 20h112a8 8 0 0 1 8 8v4a8 8 0 0 1-8 8H54a8 8 0 0 1-8-8v-4a8 8 0 0 1 8-8"/></svg>`,
    "icon_robot_wukong": `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 228 229"><path fill-rule="evenodd" d="M14 118a100 100 0 1 0 200 0 100 100 0 1 0-200 0m44-74h112a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H58a4 4 0 0 1-4-4V48a4 4 0 0 1 4-4m30 90a26 26 0 1 0 52 0 26 26 0 1 0-52 0m-44 32a10 10 0 1 0 20 0 10 10 0 1 0-20 0m120 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0M30 112a10 10 0 1 0 20 0 10 10 0 1 0-20 0m148 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0"/></svg>`,
    "icon_robot_superbit": `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 228 229"><path fill-rule="evenodd" d="M52 22h26a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H52a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4m49 0h26a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-26a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4m49 0h26a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-26a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4"/><path fill-rule="evenodd" d="M42 40h144a8 8 0 0 1 8 8v58a8 8 0 0 1-8 8H42a8 8 0 0 1-8-8V48a8 8 0 0 1 8-8m14 82h116a8 8 0 0 1 8 8v36a8 8 0 0 1-8 8H56a8 8 0 0 1-8-8v-36a8 8 0 0 1 8-8m14 26a14 14 0 1 0 28 0 14 14 0 1 0-28 0m60 0a14 14 0 1 0 28 0 14 14 0 1 0-28 0m-92 32h152a8 8 0 0 1 8 8 8 8 0 0 1-8 8H38a8 8 0 0 1-8-8 8 8 0 0 1 8-8m-23-72a15 15 0 0 1 15 15v80a15 15 0 0 1-15 15 15 15 0 0 1-15-15v-80a15 15 0 0 1 15-15m198 0a15 15 0 0 1 15 15v80a15 15 0 0 1-15 15 15 15 0 0 1-15-15v-80a15 15 0 0 1 15-15"/></svg>`
};

const TOOLBOXES_SVGS = {
    "display_category": TOOLBOXES_SVGS_DEFINITION['icon_idea_on'],
    "looks_category": TOOLBOXES_SVGS_DEFINITION['icon_idea_on'],
    "backpack_display_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_idea_on'],
    "tello_category": TOOLBOXES_SVGS_DEFINITION['icon_drone'],
    "tello_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_drone'],
    "procedure_category": TOOLBOXES_SVGS_DEFINITION['icon_function'],
    "rpi_category": TOOLBOXES_SVGS_DEFINITION['icon_raspberry'],
    "vittaia_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_ia_sensors'],
    "grove_category": TOOLBOXES_SVGS_DEFINITION['icon_grove'],
    "cpp_procedures_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_function'],
    "py_procedures_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_function'],
    "cpp_display_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_idea_on'],
    "cpp_category": TOOLBOXES_SVGS_DEFINITION['icon_arduino'],
    "dictionaries_category": TOOLBOXES_SVGS_DEFINITION['icon_bracket'],
    "bitbot_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_robot_bitbot'],
    "bitcar_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_robot_bitcar'],
    "buggy_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_robot_buggy'],
    "codo_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_robot_codo'],
    "cutebot_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_robot_cutebot'],
    "gamepad_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_robot_gamepad'],
    "kitrobot_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_robot_kitrobot'],
    "maqueen_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_robot_maqueen'],
    "maqueen-plus_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_robot_maqueen-plus'],
    "oobybot_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_robot_oobybot'],
    "cutebotpro_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_robot_cutebotpro'],
    "uhandbit_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_robot_uhandbit'],
    "wukong_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_robot_wukong'],
    "superbit_subcategory": TOOLBOXES_SVGS_DEFINITION['icon_robot_superbit']
};

const LIBRARIES_PATH_ESP32 = [
    {
        "path": "bluetooth",
        "content": ['ble_advertising', 'ble_simple_peripheral', 'ble_uart_peripheral', 'esp32_ble_uart', 'esp32_ble', 'vitta_ble_flash']
    },
    {
        "path": "grove",
        "content": [
            'esp32_bmp280', 'esp32_bme280', 'esp32_chainableLED', 'esp32_colorSensor', 'esp32_ds1307', 'esp32_gas_gmxxx', 'esp32_gas',
            'esp32_hm330x', 'esp32_lcd_i2c', 'esp32_lcd_i2c8574', 'esp32_my9221', 'esp32_paj7620', 'esp32_pcf85063tp', 'esp32_scd30', 'esp32_sgp30',
            'esp32_sht31', 'esp32_si1145', 'esp32_si1151', 'esp32_ssd1306', 'esp32_th02', 'esp32_tm1637', 'esp32_mpu6050', 'esp32_mlx90621', 'esp32_bn880'
        ]
    },
    {
        "path": "HT16K33",
        "content": [
            'ht16k33', 'ht16k33matrix', 'ht16k33matrixcolour', 'ht16k33matrixfeatherwing',
            'ht16k33segment', 'ht16k33segment14', 'ht16k33segmentbig'
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
    'esp32_dissolved_oxygen_probe',
    'esp32_mfrc522',
    'esp32_pca9685'
];

const LIBRARIES_PATH_STM32 = [
    {
        "path": "bluetooth",
        "content": ['stm32_ble_sensor', 'stm32_ble_uart', 'stm32_ble', 'stm32_bleAdvertising']
    },
    {
        "path": "grove",
        "content": [
            'stm32_bmp280', 'stm32_chainableLED', 'stm32_colorSensor', 'stm32_dht', 'stm32_ds18x20', 'stm32_gas',
            'stm32_hm330x', 'stm32_lcd_i2c', 'stm32_LoRa', 'stm32_my9221', 'stm32_pcf85063tp', 'stm32_rgb_led_matrix',
            'stm32_scd30', 'stm32_sgp30', 'stm32_sht31', 'stm32_si1145', 'stm32_ssd1306', 'stm32_th02', 'stm32_tm1637',
            'stm32_vl53l0x'
        ]
    },
    {
        "path": "HT16K33",
        "content": [
            'stm32_ht16k33', 'stm32_ht16k33matrix', 'stm32_ht16k33matrixcolour', 'stm32_ht16k33matrixfeatherwing',
            'stm32_ht16k33segment', 'stm32_ht16k33segment14', 'stm32_ht16k33segmentbig'
        ]
    },
    {
        "path": "infrared",
        "content": ['stm32_ir_receiver', 'stm32_nec']
    },
    {
        "path": "ISK01A3",
        "content": ['HTS221', 'LIS2DW12', 'LIS2MDL', 'LPS22', 'LSM6DSO', 'STTS751']
    },
    "neopixel",
    "onewire",
    "stm32_m24sr64",
    "stm32_pcf8574"
];