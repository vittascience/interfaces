async function updateTools() {
    if (VittaInterface.tools.length > 0) {
        writeConsole("Updating " + VittaInterface.tools[VittaInterface.tools.length - 1] + "...\n");
        VittaInterface.socket.emit('command', 'downloadtool ' + VittaInterface.tools[VittaInterface.tools.length - 1] + ' latest arduino keep');
    } else {
        writeConsole("All tools are updated.\n");
    }
}