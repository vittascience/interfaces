const cardCommunicationButtons = {
    'upload': {
        id: "upload-python",
        classes: 'ide-btn-check ide-btn-left e2e-upload-btn',
        fontAwesome: 'fa fa-wifi',
        onclick: "RaspberryCommunication.uploadPython()",
        title: 'code.topbar.tooltips.uploadPython',
        label: {
            hidden: true,
            value: "code.topbar.label.uploadRPi"
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
    'pi_vitta_api': {
        id: "download-vitta-api-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/interfaces/assets/media/raspberry-pi.svg",
        title: 'code.topbar.tooltips.downloadPiAPI',
        tooltipPlacement: "left",
        onclick: "RaspberryCommunication.downloadRaspberryPiAPI()",
        label: {
            value: "code.topbar.label.downloadPiAPI"
        }
    },
    'disconnect': {
        id: "disconnect-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/interfaces/assets/js/external/font-awesome/svgs/brands/usb.svg",
        title: 'code.topbar.tooltips.disconnect',
        tooltipPlacement: "left",
        onclick: "RaspberryCommunication.socketIOdisconnect()",
        show: false,
        label: {
            value: "code.topbar.label.disconnect"
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
    'create-exercise-auto-corrector': {
        id: 'create-exercise-auto-corrector',
        classes: ' ide-btn-exercise ide-btn-left-dropdown',
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
}

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