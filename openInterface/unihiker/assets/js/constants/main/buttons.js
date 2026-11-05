const cardCommunicationButtons = {
    'upload': {
        id: "upload-python",
        classes: 'ide-btn-check ide-btn-left e2e-upload-btn',
        fontAwesome: 'fa fa-bolt',
        onclick: "UnihikerCommunication.uploadPython()",
        title: 'code.topbar.tooltips.uploadUnihiker',
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

// UNIHIKER K10: serial port (MicroPython), M10: Vittascience server of the board
const downloadOptions = IS_UNIHIKER_K10 ? {
    // MicroPython firmware of DFRobot (whole flash image, written at 0x00)
    'firmware': {
        id: "download-firmware-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/interfaces/assets/media/micropython_logo.svg",
        title: 'code.topbar.tooltips.downloadFirmware',
        tooltipPlacement: "left",
        onclick: "VittaInterface.downloadFirmware('micropython_unihiker_k10_EN_20260506_V0.9.8.bin')",
        label: {
            value: "code.topbar.label.downloadFirmware"
        }
    },
    'disconnect': {
        id: "disconnect-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/interfaces/assets/js/external/font-awesome/svgs/brands/usb.svg",
        title: 'code.topbar.tooltips.disconnect',
        tooltipPlacement: "left",
        onclick: "InterfaceConnection.doDisconnect()",
        show: false,
        label: {
            value: "code.topbar.label.disconnect"
        }
    },
    'board-choice': {
        id: "board-choice-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        fontAwesome: 'fas fa-microchip',
        title: 'code.topbar.tooltips.unihikerBoardSelector',
        onclick: "VittaInterface.openBoardSelector()",
        tooltipPlacement: "left",
        label: {
            value: "code.topbar.label.boardSelect"
        }
    }
} : {
    'stop': {
        id: "unihiker-stop-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/interfaces/assets/js/external/font-awesome/svgs/solid/stop.svg",
        title: 'code.topbar.tooltips.stopUnihiker',
        tooltipPlacement: "left",
        onclick: "UnihikerCommunication.stopProgram()",
        label: {
            value: "code.topbar.label.stopUnihiker"
        }
    },
    'install': {
        id: "unihiker-install-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/interfaces/assets/js/external/font-awesome/svgs/solid/download.svg",
        title: 'code.topbar.tooltips.installUnihiker',
        tooltipPlacement: "left",
        onclick: "UnihikerCommunication.installServer()",
        label: {
            value: "code.topbar.label.installUnihiker"
        }
    },
    'host': {
        id: "unihiker-host-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/interfaces/assets/js/external/font-awesome/svgs/solid/network-wired.svg",
        title: 'code.topbar.tooltips.unihikerHost',
        tooltipPlacement: "left",
        onclick: "UnihikerCommunication.changeHost()",
        label: {
            value: "code.topbar.label.unihikerHost"
        }
    },
    'board-choice': {
        id: "board-choice-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        fontAwesome: 'fas fa-microchip',
        title: 'code.topbar.tooltips.unihikerBoardSelector',
        onclick: "VittaInterface.openBoardSelector()",
        tooltipPlacement: "left",
        label: {
            value: "code.topbar.label.boardSelect"
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