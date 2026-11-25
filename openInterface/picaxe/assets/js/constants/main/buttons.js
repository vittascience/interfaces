const cardCommunicationButtons = {
    'upload': {
        id: "upload-picaxe",
        classes: 'ide-btn-check ide-btn-left e2e-upload-btn',
        fontAwesome: 'fas fa-bolt',
        title: 'code.topbar.tooltips.uploadPicaxe',
        tooltipPlacement: "left",
        onclick: "picaxeUpload()",
        show: true,
        label: {
            hidden: true,
            value: "code.topbar.label.upload"
        }
    },
    'download': {
        isDropdown: true,
        id: "download",
        classes: 'ide-btn-group-download',
        style: 'ide-btn-right'
    }
};

const downloadOptions = {
    'bas': {
        id: "download-picaxe-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        fontAwesome: 'fas fa-download',
        title: 'code.topbar.tooltips.downloadPicaxe',
        tooltipPlacement: "left",
        onclick: 'downloadScript(true)',
        show: true,
        label: {
            value: "code.topbar.label.downloadPicaxe"
        }
    }
};

const settingsOptions = {
    'accessibility': {
        id: "blockly-setting",
        classes: 'ide-btn-blockly-themes ide-btn-left-dropdown',
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
    'create-exercise-auto-corrector': {
        id: 'create-exercise-auto-corrector',
        classes: ' ide-btn-exercise',
        fontAwesome: 'fas fa-tasks',
        title: 'code.topbar.tooltips.exerciseSettings',
        tooltipPlacement: "left",
        onclick: "createExercise()",
        label: {
            value: "code.topbar.label.exercise"
        }
    },
    'monitor': {
        id: "monitor-setting",
        classes: 'ide-btn-blockly-themes',
        fontAwesome: 'fas fa-cog',
        title: 'code.topbar.tooltips.consoleSettings',
        tooltipPlacement: "left",
        onclick: "pseudoModal.openModal('modal-settings')",
        label: {
            value: "code.topbar.label.console"
        }
    },
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

if (typeof IS_CAPYTALE_CONTEXT !== 'undefined') {
    settingsOptions['capytale-toolbox-restriction'] = {
        id: 'capytale-toolbox-restriction',
        classes: ' ide-btn-restriction',
        fontAwesome: 'fas fa-tasks',
        title: 'code.topbar.tooltips.toolboxRestriction',
        tooltipPlacement: "left",
        onclick: "pseudoModal.openModal('modal-toolbox-restriction')",
        label: {
        value: "code.topbar.label.toolboxRestriction"
        }
    }
}

const uiButtons = {
    'undo': {
        classes: 'ide-btn-undo ide-btn-left hide-vsm ',
        fontAwesome: 'fa fa-undo',
        title: 'code.topbar.tooltips.undo',
        onclick: 'undoAction()'
    },
    'redo': {
        classes: 'ide-btn-undo ide-btn-right hide-vsm',
        fontAwesome: 'fas fa-redo',
        title: 'code.topbar.tooltips.redo',
        onclick: 'redoAction()'
    },
};