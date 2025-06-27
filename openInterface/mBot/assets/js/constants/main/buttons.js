const cardCommunicationButtons = {
    'upload': {
        id: "upload-arduino",
        classes: 'ide-btn-left',
        fontAwesome: 'fas fa-bolt',
        title: 'code.topbar.tooltips.uploadArduino',
        onclick:'InterfaceConnection.uploadArduino()',
        label: {
            hidden: true,
            value: "code.topbar.label.upload"
        }
    },
    'downloadArduino': {
        id: "download-arduino",
        classes: '',
        fontAwesome: 'fas fa-download',
        title: 'code.topbar.tooltips.downloadArduino',
        onclick: 'downloadScript(true)',
        show: false,
        label: {
            value: "code.topbar.label.download"
        }
    },
    'download': {
        isDropdown: true,
        id: "download-options",
        classes: 'ide-btn-group-download',
        style: 'ide-btn-right'
    }
};

const downloadOptions = {
    'upload': {
        id: "upload-arduino-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        fontAwesome: 'fas fa-bolt',
        title: 'code.topbar.tooltips.uploadArduino',
        onclick: "InterfaceConnection.uploadArduino()",
        show: false,
        tooltipPlacement: "left",
        label: {
            value: "code.topbar.label.upload"
        }
    },
    'download': {
        id: "download-arduino-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        fontAwesome: 'fas fa-download',
        title: 'code.topbar.tooltips.downloadArduino',
        onclick: 'downloadScript(true)',
        tooltipPlacement: "left",
        label: {
            value: "code.topbar.label.download"
        }
    },
    'compile': {
        id: "compile-arduino-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        fontAwesome: 'fas fa-bolt',
        title: 'code.topbar.tooltips.compileArduino',
        onclick: 'InterfaceConnection.compile()',
        tooltipPlacement: "left",
        label: {
            value: "code.topbar.label.compile"
        }
    },
    'disconnect': {
        id: "disconnect-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/interfaces/assets/js/external/font-awesome/svgs/brands/usb.svg",
        title: 'code.topbar.tooltips.disconnect',
        onclick: "InterfaceConnection.doDisconnect()",
        show: false,
        tooltipPlacement: "left",
        label: {
            value: "code.topbar.label.disconnect"
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
}