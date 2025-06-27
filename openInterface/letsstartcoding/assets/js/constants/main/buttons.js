const cardCommunicationButtons = {
    'upload': {
        id: "upload-arduino",
        classes: 'ide-btn-alone',
        fontAwesome: 'fas fa-bolt',
        title: 'code.topbar.tooltips.uploadArduino',
        onclick:'InterfaceConnection.uploadArduino()',
        label: {
            value: "code.topbar.label.upload"
        }
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

const settingsOptions = {}
const uiButtons = {}