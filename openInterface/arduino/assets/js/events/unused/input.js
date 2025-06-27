//on click handler for serial-input button.
// will use sendData() in order to send a message to the current opened port.
$("#serial-form").submit(function (e) {
    e.preventDefault();
});

$('#serial-input').on('keyup', function () {
    if ($(this).val() === '') {
        $('#serial-send').prop('disabled', true).addClass('disabled-btn');
    } else {
        $('#serial-send').prop('disabled', false).removeClass('disabled-btn');
    }
});

document.getElementById("serial-send").onclick = function (e) {
    if (VittaInterface.IS_FIREFOX && VittaInterface.currentPort != null) {
        let message = document.getElementById("serial-input").value;
        sendData(VittaInterface.currentPort, message);
    } else if ($('#simulator').css('display') == 'none') {
        writeConsole(jsonPath('code.errorMsg.sendMessage'));
    }
};

String.prototype.replaceAt = function (index, charcount) {
    return this.substr(0, index) + this.substr(index + charcount);
};

//send data to one of the ports.
function sendData(port, message) {
    for (let i = message.length; i >= 0; i--) {
        if (message.charCodeAt(i) > 127) {
            message = message.replaceAt(i, 1);
        }
    }
    let size = new Blob([message]).size;
    writeConsole("<span style='color:var(--text-2)'>--> Sending '" + message + "' (" + size + " bytes) to " + port + "...\n</span>");
    document.getElementById("serial-input").value = "";
    VittaInterface.socket.emit("command", "send " + port + " " + message);
}