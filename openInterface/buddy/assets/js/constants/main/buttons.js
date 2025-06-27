const cardCommunicationButtons = {
    'refresh': {
        id: "refresh",
        classes: 'ide-btn-left',
        fontAwesome: 'fas fa-sync',
        title: 'code.topbar.tooltips.refresh',
        tooltipPlacement: "left",
        onclick: "location.reload()"
    },
    'show-face': {
        id: "show-face",
        classes: 'ide-btn-right',
        fontAwesome: 'fas fa-robot',
        title: 'code.topbar.tooltips.showFace',
        tooltipPlacement: "left",
        onclick: "AndroidInterface.webviewDisplay(false)"
    },
    'volume-down': {
        id: "volume-down",
        classes: 'ms-2 ide-btn-left',
        fontAwesome: 'fas fa-volume-down',
        title: 'code.topbar.tooltips.volumeDown',
        tooltipPlacement: "left",
        onclick: "AndroidInterface.volumeDown()"
    },
    'volume-up': {
        id: "volume-up",
        classes: 'ide-btn-right',
        fontAwesome: 'fas fa-volume-up',
        title: 'code.topbar.tooltips.volumeUp', 
        tooltipPlacement: "left",
        onclick: "AndroidInterface.volumeUp()"
    }
};

const downloadOptions = {
    'python': {
        id: "download-python-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        fontAwesome: 'fab fa-python',
        onclick: 'downloadScript(true)',
        show: false,
        label: {
            value: "code.topbar.label.downloadPython"
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
        classes: 'ide-btn-exercise',
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