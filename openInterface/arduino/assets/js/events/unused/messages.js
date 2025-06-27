//this function is used in order to determine what type of message is received from the Arduino Create Agent.
//According to the JSON keys in the input message, it will trigger an action or another.
let messageToParse = "";
let lines = [];

let parser_message;
let music_parser_message;
const lineBreakRegex = new RegExp("\\n", "g");
const lineRegex = new RegExp("^(.+)$", "gm");

window.addEventListener("load", function () {
    parser_message = "";
    music_parser_message = "";
});

function messageCallback(json) {

    //Agent is answering from the "list" command.
    if (json.Ports) {
        if (VittaInterface.mainInitFlag && (VittaInterface.initFlagNetwork || VittaInterface.initFlagUSB))
            closeAllPorts(json.Ports, json.Network);
        updateDevices(json.Ports, json.Network);
    } else if (json.DownloadStatus === "Success" && json.Msg === "Map Updated") {
        VittaInterface.tools.splice(VittaInterface.tools.length - 1, 1);
        updateTools();
    } else if (json.Msg) {
        writeConsole(json.Msg + "\r\n");
    }

    //Agent is confirming upload into the board. Port will then be opened for send/receiving data.
    else if (json.Flash === "Ok" && json.ProgrammerStatus === "Done") {
        messageToParse = "";
        parser_message = "";
        compileMessage(jsonPath('code.successMsg.programUpload'), true);
        enableCommands();
        let baud = document.getElementById("baud").value;

        VittaInterface.socket.emit("command", "open " + VittaInterface.currentPort + " " + baud + " timed");
    }

    //Agent is giving an upload error.
    else if (json.ProgrammerStatus === "Error") {
        VittaInterface.currentPort = null;
        compileMessage(jsonPath('code.errorMsg.programUpload'), false);
        enableCommands();
    }

    //Agent is transmitting a message from one of the opened ports.
    else if (json.D) {
        if (!VittaInterface.mainInitFlag) {
            writeConsole('<span style="color:var(--vitta-orange)">' + json.D + '</span>');
            messageToParse += json.D;
            if (!VittaInterface.PARSING_MESSAGE) {
                VittaInterface.PARSING_MESSAGE = true;
                readMessageForMusic(messageToParse);
                readMessageForTracer(messageToParse);
                messageToParse = "";
            }
        }
    }

    //Agent is confirming that one of the ports was closed.
    else if (json.Cmd && (json.Cmd === "Close")) {

        writeConsole("\nPort closed on " + json.Port + ".\n");

        synth.triggerRelease();
        if (APISendData !== false) {
            clearInterval(APISendData);
            clearApi();
            APISendData = false;
            writeConsole("\nAPI stopped.\n");
        }

        let portIndex = VittaInterface.openedPorts.indexOf(json.Port);

        if (portIndex > -1)
            VittaInterface.openedPorts.splice(portIndex, 1);

        if (VittaInterface.uploadWaitingState && VittaInterface.openedPorts.length <= 0)
            VittaInterface.uploadWaitingState = false;

        if (VittaInterface.mainInitFlag) {
            if (VittaInterface.openedPorts.length <= 0) {
                VittaInterface.mainInitFlag = false;
                enableCommands();
            }
        }

    }

    //Agent is confirming that one of the ports was opened.
    else if (json.Cmd && (json.Cmd === "Open")) {
        writeConsole("Port opened on " + json.Port + ". Listening to output...\n");
        VittaInterface.openedPorts.push(json.Port);
    }
}

async function readMessageForTracer(data) {
    let TIMEOUT = 0;
    parser_message += data;
    let matches = parser_message.match(lineBreakRegex);
    if (matches != null) {
        if (matches.length >= 2) {
            let toParse = parser_message.match(lineRegex);
            if (toParse && toParse[1]) {
                let parsedArray = parseMessage(toParse[1]);
                if (parsedArray) {
                    TIMEOUT = 50;
                    updateChart(parsedArray);
                    prepareToApi(parsedArray);
                    parser_message = "";
                }
            }
        }
    }
    setTimeout(function () {
        VittaInterface.PARSING_MESSAGE = false;
    }, TIMEOUT);
}

async function readMessageForMusic(message) {
    let toParse = message.replace("@music:", "");
    toParse = toParse.replace("|", "");
    $('#text-console').prepend("Joue la note " + toParse + " \n");
    playMusic(toParse);
}