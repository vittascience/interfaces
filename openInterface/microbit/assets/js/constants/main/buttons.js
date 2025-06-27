const cardCommunicationButtons = {
    'firmware': {
        id: "download-firmware",
        show: false,
        classes: 'ide-btn-check ide-btn-left',
        fontAwesome: 'fas fa-download',
        title: 'code.topbar.tooltips.downloadHex',
        onclick: "InterfaceConnection.downloadHexButton()",
        label: {
            hidden: true,
            value: "code.topbar.label.downloadHex",
        }
    },
    'upload': {
        id: "upload-python",
        classes: 'ide-btn-check ide-btn-left',
        fontAwesome: 'fas fa-bolt',
        onclick: "InterfaceConnection.webusb.flashProgram()",
        title: 'code.topbar.tooltips.uploadPython',
        label: {
            hidden: true,
            value: "code.topbar.label.upload"
        }
    },
    'download': {
        isDropdown: true,
        id: "download-options",
        classes: 'ide-btn-group-download',
        style: 'ide-btn-right'
    },
    'texas': {
        id: "download-texas",
        show: false,
        onclick: 'downloadScript(true)',
        classes: 'ide-btn ide-btn-valid ide-btn-alone',
        fontAwesome: 'fas fa-download',
        title: 'code.topbar.tooltips.downloadPython',
        label: {
            hidden: true,
            value: "code.topbar.label.downloadTexas",
            class: 'hide_601_668_941_1030'
        }
    }
};

const downloadOptions = {
    'uploadBLE': {
        id: "upload-python-ble-opt",
        title:"code.topbar.label.uploadBluetooth",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        fontAwesome: 'fa-brands fa-bluetooth',
        tooltipPlacement: "left",
        onclick: "pseudoModal.openModal('modal-microbit-bluetooth-pairing')",
        show: true,
        label: {
            value: "code.topbar.label.uploadBluetooth"
        }
    },
    'upload': {
        id: "upload-python-opt",
        show: false,
        classes: 'ide-btn-check ide-btn-left-dropdown',
        fontAwesome: 'fas fa-bolt',
        onclick: "InterfaceConnection.webusb.flashProgram()",
        title: 'code.topbar.tooltips.uploadPython',
        tooltipPlacement: "left",
        label: {
            value: "code.topbar.label.upload"
        }
    },
    'firmware': {
        id: "download-firmware-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/interfaces/assets/media/micropython_logo.svg",
        title: 'code.topbar.tooltips.downloadHex',
        tooltipPlacement: "left",
        //infoModalId: 'modal-download-hex-info',
        onclick: "InterfaceConnection.downloadHexButton()",
        label: {
            value: "code.topbar.label.downloadHex",
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
    'disconnectBLE': {
        id: "disconnect-opt-ble",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        fontAwesome: 'fa-brands fa-bluetooth',
        title: 'code.topbar.tooltips.disconnect',
        tooltipPlacement: "left",
        onclick: "doDisconnectBLE()",
        show: false,
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