//used at startup in order to close ports that were opened on previous sessions.
// since we don't have any registered ports yet, we have to execute the command twice for
// each port list (network and usb).
function closeAllPorts(ports, network) {
    let i;
    if (VittaInterface.initFlagUSB || VittaInterface.initFlagNetwork) {
        if (network)
            VittaInterface.initFlagNetwork = false;
        else
            VittaInterface.initFlagUSB = false;

        for (i = 0; i < ports.length; i++) {
            if (ports[i].IsOpen) {
                VittaInterface.openedPorts.push(ports[i].Name);
            }
        }
    }

    if (VittaInterface.mainInitFlag && !VittaInterface.initFlagUSB && !VittaInterface.initFlagNetwork) {
        if (VittaInterface.openedPorts.length === 0) {
            VittaInterface.mainInitFlag = false;
            enableCommands();
        }

        for (i = 0; i < VittaInterface.openedPorts.length; i++) {
            VittaInterface.socket.emit("command", "close " + VittaInterface.openedPorts[i]);
        }
    }

}

//before upload, close all the registered open ports.
function closeOpenedPorts() {
    for (let i = 0; i < VittaInterface.openedPorts.length; i++) {
        VittaInterface.socket.emit("command", "close " + VittaInterface.openedPorts[i]);
    }
}

window.addEventListener("load", function () {
    document.getElementById("serial-close").onclick = function () {
        closeOpenedPorts();
        VittaInterface.currentPort = null;
    }
});

$("#baud").on('change', function () {
    updateBlockMode();
});