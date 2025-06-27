let cardCommunicationButtons;
if (!window.remoteNAORobot) {
    cardCommunicationButtons = {
        'connect': {
            id: "connect-robot",
            classes: 'ide-btn-check ide-btn-left',
            fontAwesome: 'fas fa-plug',
            onclick: "checkIpAdress()",
            title: 'code.topbar.tooltips.connectNao',
            label: {
                hidden: true,
                value: "code.topbar.label.connectNao"
            }
        },
        'upload': {
            id: "upload-python",
            classes: 'ide-btn-check ide-btn-left',
            fontAwesome: 'fas fa-bolt',
            onclick: "sendNAOCommand()",
            title: 'code.topbar.tooltips.uploadPythonNao',
            show: false,
            label: {
                hidden: true,
                value: "code.topbar.label.uploadNao"
            }
        },
        'stop': {
            id: "stop-python",
            classes: 'ide-btn-check ide-btn-center',
            fontAwesome: 'fas fa-stop',
            onclick: "stopNAOCommand()",
            title: 'code.topbar.tooltips.stopNaoProgram',
            show: false,
            label: {
                hidden: true,
                value: "code.topbar.label.stopNiryo"
            }
        },
        'download': {
            isDropdown: true,
            id: "download",
            classes: 'ide-btn-group-download',
            style: 'ide-btn-right'
        }
    };
} else {
    cardCommunicationButtons = {
        'upload': {
            id: "upload-python",
            classes: 'ide-btn-check ide-btn-left',
            fontAwesome: 'fas fa-bolt',
            onclick: "connectRemoteNiryo()",
            title: 'code.topbar.tooltips.uploadPythonNiryo',
            label: {
                hidden: true,
                value: "code.topbar.label.uploadNiryoRemote"
            }
        },
        'download': {
            isDropdown: true,
            id: "download",
            classes: 'ide-btn-group-download',
            style: 'ide-btn-right'
        }
    };
}

const downloadOptions = {
    'windows-vitta-companion': {
        id: "download-firmware-opt-windows",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/niryo/assets/media/icon/vitta-companion.png",
        title: 'code.topbar.tooltips.downloadNiryo',
        tooltipPlacement: "left",
        show: false,
        onclick: "downloadNiryoFirmware('windows')",
        label: {
            value: "code.topbar.label.downloadNiryoWindows"
        }
    },
    'MacOS-vitta-companion': {
        id: "download-firmware-opt-mac",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/niryo/assets/media/icon/vitta-companion.png",
        title: 'code.topbar.tooltips.downloadNiryo',
        tooltipPlacement: "left",
        show: false,
        onclick: "downloadNiryoFirmware('macOS')",
        label: {
            value: "code.topbar.label.downloadNiryoMacOS"
        }
    },
    'Linux-vitta-companion': {
        id: "download-firmware-opt-linux",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/niryo/assets/media/icon/vitta-companion.png",
        title: 'code.topbar.tooltips.downloadNiryo',
        tooltipPlacement: "left",
        show: false,
        onclick: "downloadNiryoFirmware('linux')",
        label: {
            value: "code.topbar.label.downloadNiryoLinux"
        }
    },
    'disconnect': window.remoteNiryoRobot ? {
        id: "disconnect-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/interfaces/assets/js/external/font-awesome/svgs/brands/usb.svg",
        title: 'code.topbar.tooltips.disconnect',
        tooltipPlacement: "left",
        onclick: "disconnectRemoteNiryo()",
        show: false,
        label: {
            value: "code.topbar.label.disconnect"
        }
    }:{
        id: "disconnect-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/interfaces/assets/js/external/font-awesome/svgs/brands/usb.svg",
        title: 'code.topbar.tooltips.disconnect',
        tooltipPlacement: "left",
        onclick: "disconnectNAO()",
        show: false,
        label: {
            value: "code.topbar.label.disconnect"
        }
    },
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
    }
};