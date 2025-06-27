// Prepare the upload process. Basically building the upload payload
// and sending the command line to be executed by the board to the server side
// for having it signed. Then the payload is valid and can be uploaded.
// note: also, the executable filename used for upload in the board is generated on the server side.
function prepareUpload(json, hex) {
    let currentBoard = boards[document.getElementById("board-select").value];
    //Intel Hex Code must be encoded in base64.
    let hex64 = btoa(hex);
    let board = currentBoard.protocol + ":avrdude:" + currentBoard.name;

    let portSelect = document.getElementById("port-select");
    let port = portSelect.value;
    let options = document.getElementsByTagName("OPTION");
    let network = false;

    //check if the port is a network port or USB port.
    for (let i = 0; i < options.length; i++) {
        if (options[i] === port)
            if (options[i].getAttribute("data-type") === "network")
                network = true;
    }

    //building the command line.
    let commandLine =
        "'{runtime.tools.avrdude.path}/bin/avrdude' " + // executing avrdude.
        " '-C{runtime.tools.avrdude.path}/etc/avrdude.conf'" + // linking avrdude.conf.
        " -p" +
        currentBoard.mcu + // the board micro controller unit.
        " -c" +
        currentBoard.core + // core used by the board.
        " '-P{serial.port}' -b" +
        currentBoard.speed + // the board's speed.
        " -D '-Uflash:w:{build.path}/{build.project_name}.hex:i'";

    let formData = new FormData();
    formData.append("commandLine", commandLine); // add the commandLine to the POST data in the request.

    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            let responseJson = parseJson(this.responseText);
            //If JSON can't be parsed. an error happened on the server side.
            if (!responseJson) {
                compileMessage(jsonPath('code.errorMsg.programUpload'), false);
            } else {
                // If success is "true".
                if (responseJson.success) {
                    //we can retrieve the command line's signature and filename.
                    let signature = responseJson.signature;
                    let fileId = responseJson.filename;
                    //building the upload final payload.
                    let uploadJson = "{\n" +
                        "  \"board\":\"" + board + "\",\n" +
                        "  \"port\":\"" + port + "\",\n" +
                        "  \"commandline\":\"" + commandLine + "\",\n" +
                        "  \"signature\":\"" + signature + "\",\n" +
                        "  \"hex\":\"" + hex64 + "\",\n" +
                        "  \"filename\":\"" + fileId + ".hex\",\n" +
                        "  \"extra\":{\n" +
                        "    \"auth\":{\n" +
                        "      \"password\":null\n" +
                        "    },\n" +
                        "    \"wait_for_upload_port\":false,\n" +
                        "    \"use_1200bps_touch\":false,\n" +
                        "    \"network\":" + network + ",\n" +
                        "    \"params_verbose\":\"-v\",\n" +
                        "    \"params_quiet\":\"-q -q\",\n" +
                        "    \"verbose\":true\n" +
                        "  }\n" +
                        "}";

                    //check if the current port is already opened.

                    // If the port is already opened, then we will turn on the uploadWaitingState flag
                    // in the main handler, send a close command to the port, and wait until the flag
                    // turns back to false after a close confirm message is received in messageCallback (see "messages.js").

                    VittaInterface.uploadWaitingState = true;
                    closeOpenedPorts();
                    checkUploadWaitingState();

                    VittaInterface.currentPort = port;

                    // Port should be closed now. Launching upload.
                    uploadToBoard(uploadJson);

                } else {
                    compileMessage(jsonPath('code.errorMsg.programUpload'), false);
                    writeConsole(responseJson.message + "\n");
                    enableCommands();
                }
            }
        }
    };

    request.open("POST", "/services/post/postCommandLine.php");
    request.send(formData);
}

//Upload the final payload to the board. The upload result will then be checked after Agent has responded.
//(see in "messages.js")
function uploadToBoard(json) {
    let request = new XMLHttpRequest();
    let socketEndpoint = VittaInterface.HTTPS_ENDPOINT;
    if (md.ua.match("Firefox\\/...?."))
        socketEndpoint = VittaInterface.HTTP_ENDPOINT;
    request.open("POST", socketEndpoint + VittaInterface.UPLOAD_PATH);
    request.send(json);
}

//Wait until "uploadWaitingState" is back to "false".
function checkUploadWaitingState() {
    setTimeout(function () {
        if (VittaInterface.uploadWaitingState)
            checkUploadWaitingState();
    }, 1000);
}