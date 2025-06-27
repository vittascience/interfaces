//verify button event listener.
function checkSyntax() {
    this.innerHTML = "<img src=\"/public/content/img/compile.svg\" id=\"compile-loader\" alt='chargement'>";
    if ($('#monitor').height() == '0') {
        $('#monitor-toggler').click();
    }
    disableCommands();
    prepareCompile(false);
};

function disableCommands() {
    disableButton(document.getElementById("verify"));
    disableButton(document.getElementById("upload"));
    if (VittaInterface.IS_FIREFOX) {
        disableButton(document.getElementById("board-select"));
        disableButton(document.getElementById("port-select"));
    }
    disableButton(document.getElementById("serial-input"));
    disableButton(document.getElementById("serial-send"));
}

function enableCommands() {
    enableButton(document.getElementById("verify"));
    enableButton(document.getElementById("upload"));
    if (VittaInterface.IS_FIREFOX) {
        enableButton(document.getElementById("board-select"));
        enableButton(document.getElementById("port-select"));
    }
    enableButton(document.getElementById("serial-input"));
    enableButton(document.getElementById("serial-send"));
    document.getElementById("verify").innerHTML = '<i class="fa fa-check"></i> <span class="hide" data-i18n="code.topbar.label.check">' + jsonPath('code.topbar.label.check') + '</span>';
}

// Prepare the compilation process.
// This function takes an "upload" flag set to true or false.
// If "upload" is set to true, then the compilation process will
// be followed by the upload process on success.
function prepareCompile(upload) {
    //Get the code.
    let code = CodeManager.getSharedInstance().getCode().replace(/\n/gi, '');
    if (code.length <= 0) {
        enableCommands();
        return compileMessage(jsonPath('code.errorMsg.emptyCode'), false);
    }

    // Get the corresponding board object from boards.js 
    let boardSelect = document.getElementById("board-select");

    let board = ARDUINO_BOARDS[0];
    if (boardSelect != null) {
        for (let j = 0; j < ARDUINO_BOARDS.length; j++) {
            if (boardSelect.value == ARDUINO_BOARDS[j].name) {
                board = ARDUINO_BOARDS[j]
            }
        }
    }
    // need to add multiple files/library support.
    // THIS PART REMAINS UNDONE.
    let files = [];
    files.push({
        "filename": "test.ino",
        "content": code
    });

    let libraries = [];
    let logging = true;

    //Hex format for uploading.
    let format = "hex";

    //Syntax format means only verifying.
    if (!upload)
        format = "syntax";

    //Setting up build options from the board object.
    let build = {
        "mcu": board.mcu,
        "f_cpu": board.f_cpu,
        "core": board.core,
        "variant": board.variant
    };

    if (board.vid && board.pid) {
        build.vid = board.vid;
        build.pid = board.pid;
    }

    //Grouping content into JSON.
    let json = {
        "files": files,
        "libraries": libraries,
        "logging": logging,
        "format": format,
        "version": VittaInterface.SDK_VERSION,
        "build": build
    };

    compile(json);
}

//Start the compilation process. Basically, we're sending a request to the service URL which will
//handle the final compilation request to the compilation server.
function compile(json) {

    // JSON has to be raw content.
    let payload = new FormData();
    payload.append("json", JSON.stringify(json));

    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            let responseJson = parseJson(this.responseText);

            //if response can't be parsed. something wrong happened.
            if (!responseJson) {
                compileMessage(jsonPath('code.errorMsg.compilation'), false);
                enableCommands();
            }

            //In "success" is false, that means compilation worked out.
            else if (responseJson.success) {

                //If the output (Intel Hex Code) is here. Then that means an upload was request.
                if (responseJson.output) {
                    compileMessage(jsonPath('code.successMsg.compilation'), true);

                    //Get it on with the upload process.

                    if ($('#monitor').height() == '0') {
                        $('#monitor').css("height", "200px");
                        Blockly.svgResize(Blockly.getMainWorkspace());
                        prepareUpload(json, responseJson.output);
                    } else {
                        prepareUpload(json, responseJson.output);
                    }
                }

                //Else, it's just a syntax verification, and no error occurred.
                else {
                    compileMessage(jsonPath('code.successMsg.syntax'), true);
                    enableCommands();
                }
            } else {
                //If "success" is false, that means compilation didn't work as excepted.
                if ($('#monitor').height() == '0') {
                    $('#monitor-toggler').click();
                }
                compileMessage(jsonPath('code.errorMsg.syntax'), false);
                writeConsole(responseJson.message, false);
                enableCommands();
            }
        }
    };

    request.open("POST", VittaInterface.COMPILE_SERVICE_URL, true);
    request.send(payload);
}

// Give feedback for compile/upload requests.
function compileMessage(message, state) {
    if (!state)
        writeConsole("<p style='color:var(--vitta-red)'>" + message + "</p>");
    else
        writeConsole("<p style='color:var(--vita-green)'>" + message + "</p>");
    return state;
}