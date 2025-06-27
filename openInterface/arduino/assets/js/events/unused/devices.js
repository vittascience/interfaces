let deviceConnected = false;

// Sending "list" command for listing devices.
// This function will auto-repeat until agent disconnects.
function listDevices() {
    setTimeout(function () {
        if (VittaInterface.socket != null && VittaInterface.socket.connected) {
            VittaInterface.socket.emit("command", "list");
            listDevices();
        }
    }, VittaInterface.LIST_DELAY);

}

// update the port list. takes a "network" flag because the list comes from
// two separate JSON responses from the agent. One for the network connected devices,
// and the other for the USB connected devices.
function updateDevices(ports, network) {
    let i;
    let y;
    let select = document.getElementById("port-select");
    let options = select.getElementsByTagName("OPTION");

    let currentDevices = [];
    let newDevices = [];

    // Collecting the ports from JSON.
    for (i = 0; i < ports.length; i++) {
        deviceConnected = true;
        newDevices.push(ports[i].Name);
    }

    // Listing the current ports in the list.
    for (i = 0; i < options.length; i++) {
        if (options[i].getAttribute("data-type") === "network" && network)
            currentDevices.push(options[i].value);
        if (options[i].getAttribute("data-type") === "usb" && !network)
            currentDevices.push(options[i].value);
    }

    //adding devices which are not in the current list.
    for (i = 0; i < newDevices.length; i++) {
        if (currentDevices.indexOf(newDevices[i]) < 0) {
            let device = document.createElement("option");
            device.innerHTML = newDevices[i];
            device.value = newDevices[i];
            if (network)
                device.setAttribute("data-type", "network");
            else
                device.setAttribute("data-type", "usb");
            select.appendChild(device);
        }
    }

    //removing devices from the current list which are not in the JSON.
    for (i = 0; i < currentDevices.length; i++) {
        if (newDevices.indexOf(currentDevices[i]) < 0) {
            for (y = options.length - 1; y >= 0; y--) {
                if (options[y].value === currentDevices[i]) {
                    select.removeChild(options[y]);
                }
            }
        }
    }
}