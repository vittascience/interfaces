const cardCommunicationButtons = {
    'upload': {
        id: "upload-python",
        show: true,
        classes: 'ide-btn-check ide-btn-left',
        fontAwesome: 'fas fa-bolt',
        onclick: "asebaTranspiler.searchNodes()",
        title: 'code.topbar.tooltips.uploadPythonThymio',
        label: {
            hidden: true,
            value: "code.topbar.label.uploadThymio"
        }
    },
    'resetThymio': {
        id: "reset-thymio",
        classes: 'ide-btn-reset ide-btn-middle',
        fontAwesome: 'fa-solid fa-stop',
        onclick: "asebaTranspiler.resetThymio()",
        title: 'code.topbar.tooltips.resetThymio',
        label: {
            hidden: true,
            value: "code.topbar.label.resetThymio"
        }
    },
    'download': {
        isDropdown: true,
        id: "download",
        classes: 'ide-btn-group-download',
        style: 'ide-btn-right',
    },
};

const downloadOptions = {
    'windows-TDM': {
        id: "download-firmware-opt-windows",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/thymio/assets/media/icon/tdm.png",
        title: 'code.topbar.tooltips.downloadThymio',
        tooltipPlacement: "left",
        show: false,
        onclick: "asebaTranspiler.downloadTDM()",
        label: {
            value: "code.topbar.label.downloadThymioWindows"
        }
    },
    'MacOS-TDM': {
        id: "download-firmware-opt-mac",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/thymio/assets/media/icon/tdm.png",
        title: 'code.topbar.tooltips.downloadThymio',
        tooltipPlacement: "left",
        show: false,
        onclick: "asebaTranspiler.downloadTDM('macOS')",
        label: {
            value: "code.topbar.label.downloadThymioMacOS"
        }
    },
    'disconnect': {
        id: "disconnect-opt",
        classes: 'ide-btn-check ide-btn-left-dropdown',
        icon: "/openInterface/interfaces/assets/js/external/font-awesome/svgs/brands/usb.svg",
        title: 'code.topbar.tooltips.disconnect',
        tooltipPlacement: "left",
        onclick: "asebaTranspiler.disconnect()",
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