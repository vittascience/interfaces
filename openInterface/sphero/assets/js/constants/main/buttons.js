const cardCommunicationButtons = {
    'uploadBLE': {
        id: "upload-python-ble-opt",
        classes: 'ide-btn-check ide-btn-left',
        fontAwesome: 'fa-brands fa-bluetooth',
        tooltipPlacement: "left",
        onclick: "uploadPythonBLE()",
        show: true,
        label: {
            hidden: true,
            value: "code.topbar.label.sendByBluetoothToRobot"
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
    'python': {
        id: "download-python-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        fontAwesome: 'fab fa-python',
        title: 'code.topbar.tooltips.downloadPython',
        tooltipPlacement: "left",
        onclick: 'downloadScript(true)',
        show: true,
        label: {
            value: "code.topbar.label.downloadPython"
        }
    },
    'disconnectBLE': {
        id: "disconnect-opt-ble",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        fontAwesome: 'fa-brands fa-bluetooth',
        title: 'code.topbar.tooltips.disconnect',
        tooltipPlacement: "left",
        onclick: "doDisconnectBLE()",
        show: false,
        label: {
            hidden: true,
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
    }
};