let projectHandler = new ProjectHandler();
let firstTurn = false;

// Here we start the endpoints discovery.
function init_plugin() {
    /* document.getElementById("port-select").innerHTML = ""; */
    VittaInterface.port = VittaInterface.MIN_PORT;
    let select = document.getElementById("board-select");
    if (select) {
        select.innerHTML = "";
        for (let i = 0; i < ARDUINO_BOARDS.length; i++) {
            let board = document.createElement("option");
            board.innerHTML = ARDUINO_BOARDS[i].name;
            board.value = i.toString();
            select.appendChild(board);
        }
        return true;
    } else {
        return false;
    }
}

// switch to the next port in case of failure.
function switchPort() {
    VittaInterface.port++;
    if (VittaInterface.port > VittaInterface.MAX_PORT) {
        if (!firstTurn) {
            writeConsole("<p style='color:var(--vitta-red);' data-i18n='code.chromeApp.appError'>Nous n'arrivons pas à trouver votre plugin. Vous pouvez le télécharger <a href='/plugin'>ici</a>.</p>")
            firstTurn = true;
        }
        VittaInterface.port = VittaInterface.MIN_PORT;
    }
    checkPort();
}

// send an HTTP GET request to the current port
// to check if the /info url gives us the endpoints' JSON.
function checkPort() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            let found = false;
            if (this.status === 200) {
                let response = parseJson(this.responseText);
                // endpoints were found.
                if (response) {
                    found = true;
                    connectSocket(response);
                }
            }
            // wrong port.
            if (!found) {
                setTimeout(function () {
                    switchPort();
                }, VittaInterface.DISCOVERY_DELAY);
            }

        }
    };
    let infoEndpoint = "https://localhost";
    if (md.ua.match("Firefox\\/...?."))
        infoEndpoint = "http://127.0.0.1";

    request.open("GET",
        infoEndpoint +
        ":" + VittaInterface.port +
        VittaInterface.INFO_PATH);
    request.send();
}

// collecting endpoints data and connecting the main socket.
function connectSocket(response) {

    VittaInterface.HTTP_ENDPOINT = response.http;
    VittaInterface.HTTPS_ENDPOINT = response.https;
    VittaInterface.WS_ENDPOINT = response.ws;
    VittaInterface.WSS_ENDPOINT = response.wss;

    let socketEndpoint = VittaInterface.HTTPS_ENDPOINT;
    if (md.ua.match("Firefox\\/...?."))
        socketEndpoint = VittaInterface.HTTP_ENDPOINT;

    VittaInterface.socket = io(socketEndpoint, {
        reconnection: false,
        multiplex: false,
        transports: ["polling"]
    });

    setTimeout(function () {
        if (md.ua.match("Firefox\\/...?.")) {
            if (VittaInterface.socket === null || !VittaInterface.socket.connected) {
                let certificateInstall = document.getElementById("certificate-install-link");
                certificateInstall.href =
                    VittaInterface.HTTP_ENDPOINT + "/certificate.crt";
                $("#certificate-install").fadeIn("slow");
            }
        }
    }, 3000);

    if ($_GET("embed")) {
        VittaInterface.NO_PLUGIN = true;
        $('#programmer-div').hide();
    }

    // when socket has successfully connected to the agent,
    // open the editor and start listing devices.
    VittaInterface.socket.on("connect", function () {
        VittaInterface.NO_PLUGIN = false;
        enableCommands();
        $("#no-plugin-message").fadeOut("slow");
        /*
        $(document.getElementById("programmer-loading")).fadeOut("slow",function(){
            $("#ide").fadeIn("slow");
            $("#no-plugin-message").fadeOut("slow");
            Blockly.svgResize(projectHandler.blocklyWorkspace);
            loadStorage();
        });
        */
        updateTools();
        listDevices();
        $('.programmer-bar-plugin').fadeOut('slow');
    });

    // if the socket ever disconnects (on agent closure for e.g),
    // close the editor and restart the port discovery.
    VittaInterface.socket.on("disconnect", function () {
        UIManager.closeModal();
        if (!VittaInterface.NO_PLUGIN) {
            $('.programmer-bar-plugin').html("Recherche du plugin Arduino Create Agent en cours...");
            $('.programmer-bar-plugin').fadeIn('slow');
            $("#no-plugin-message").fadeIn("slow");
            /*            $("#ide").fadeOut("slow", function () {
                            $("#programmer-loading").fadeIn("slow");
                            $("#no-plugin-message").fadeIn("slow");
                            Blockly.svgResize(projectHandler.blocklyWorkspace);
                        });
                        */
            checkPort();
        }
    });

    // when we receive any message from the agent,
    // try to parse it as JSON and send it to
    // the messageCallback function for processing on success.
    VittaInterface.socket.on("message", function (data) {
        let json = parseJson(data);
        if (json)
            messageCallback(json);
    });
}
/*
document.getElementById("no-plugin-btn").onclick = function (){
    VittaInterface.NO_PLUGIN = true;
    disableCommands();
    $(document.getElementById("programmer-loading")).fadeOut("slow",function(){
        $("#ide").fadeIn();
        Blockly.svgResize(projectHandler.blocklyWorkspace);
        loadStorage();
    });
};

document.getElementById("download-plugin-button").onclick = function (){
    $("#ide").fadeOut("slow",function(){
        $(document.getElementById("programmer-loading")).fadeIn("slow");
        Blockly.svgResize(projectHandler.blocklyWorkspace);
    });
};*/

$('.code-newproject').on('click', function () {
    $(document.getElementById("programmer-div")).fadeOut("slow", function () {
        $("#ide").fadeIn("slow");
        disableCommands();
        //$("#no-plugin-message").fadeOut("slow");
        Blockly.svgResize(Blockly.getMainWorkspace());
        loadStorage();
    });
    //updateTools();
    //listDevices();
});