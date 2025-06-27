var WifiSimulator = {

    static_IP: '0.0.0.0',
    mac: null,
    DHCP_hostname: '',
    COMPATIBLE_INTERFACES: ["esp32", "m5stack", "galaxia", "pico"],
    _interface: null,

    /**
     * Initialize WifiSimulator.
     */
    init: function () {
        if (document.querySelector("#web-page-module") === null) {
            this.addWifiSimulatorToDom();
        }
        this.mac = [randHex(2), randHex(2), randHex(2), randHex(2)].map(value => parseInt(value, 16));
        this.web_client.init();
        this.server.init();
        this.resize();
        var _this = this;
        $(window).on('resize', () => {
            _this.resize();
        });
    },

    addWifiSimulatorToDom() {
        const wifiSimulatorHtml =
            `<div id="web-page-module" class="stylized-scrollbar" style="display:none">
            <div class="web-page-header">
                <button id="resfresh-preview-btn" class="module-modal-button">
                    <i class="fas fa-redo-alt module-modal-button-icon"></i>
                </button>
                <span style="padding-right:5px">url:</span>
                <input type="text" id="server-url-field">
                <button id="url-network-info" class="module-modal-button"
                    onclick="pseudoModal.openModal('modal-simulator-wifi-help')">
                    <i class="fas fa-question module-modal-button-icon"></i>
                </button>
            </div>
            <div id=webWindow>
                <iframe id="hcjPreview"></iframe>
            </div>
        </div>`;
        document.querySelector("#simulator #variables-panel").insertAdjacentHTML('afterend', wifiSimulatorHtml);
    },

    resize: function () {
        $("#web-page-module").height($("#web-page-module").width() * 9 / 16);
    },

    /**
     * Stop WifiSimulator.
     */
    stop: function () {
        this.server.stop();
        this.web_client.stop();
        this.esp32_client.stop();
    },

    /**
     * Reset WifiSimulator.
     */
    reset: function () {
        $("#server-url-field").val("");
        this.web_client.executePage("");
    },

    /**
     * Get current valid server by checking ip address & dateUpdated.
     * @param {object} mutiEditorInterface 
     * @param {Array <string,int>} addr 
     * @returns {object} server
     */
    _getCurrentServerOpened: function (mutiEditorInterface, addr) {
        let validServers = [];
        for (var id in mutiEditorInterface) {
            if (mutiEditorInterface[id].network) {
                const server = mutiEditorInterface[id].network.server;
                if (server && server.dateUpdated && (server.addr[1] == addr.port) && ((server.hostname == addr.hostname) || (server.addr[0] == addr.ip))) {
                    validServers.push(server);
                    server.editorId = id;
                }
            }
        }
        return validServers.sort(function (a, b) {
            return b.dateUpdated - a.dateUpdated;
        })[0];
    },

    /**
     * Get multiEditor data from localStorage.
     * @returns {object} multiEditorLS
     */
    _getMultiEditor: function () {
        const multiEditorLS = localStorage.getItem('multiEditor');
        if (multiEditorLS) {
            return JSON.parse(multiEditorLS);
        } else {
            throw Error("[ESP32 boards] multiEditor is not defined")
        }
    },

    /**
     * Get server editor with interface ID. It searchs in ESP32 compatible interfaces.
     * @param {object} multiEditor
     * @returns {object} serverEditor
     */
    _getServerEditor: function (multiEditor, serverId) {
        for (var _interface of this.COMPATIBLE_INTERFACES) {
            const editors = multiEditor[_interface];
            if (editors) {
                const serverEditor = editors[serverId];
                if (serverEditor) {
                    const server = serverEditor.network.server;
                    if (server) {
                        this._interface = _interface;
                        return server;
                    }
                }
            }
        }
    },

    web_client: {

        currentServerId: null,
        currentWebPageId: null,
        responseInterval: null,

        /**
         * Update file storage of interface by retrieving jsCodes and cssStyles generated from blocks.
         */
        updateCssJs: function () {
            // console.log("[WifiSIMULATOR] updateCssJs()")
            const remapToJs = function (codes) {
                const data = Blockly.Python.convertObjectInLists(Blockly.Python[codes]).join("\n");
                return "\`" + data.replace(/"""/gi, '\`').replace(/str\(/gi, "parseFloat(") + '\`';
            }
            const remapToCss = function (codes) {
                const data = Blockly.Python.convertObjectInLists(Blockly.Python[codes]).join("\n");
                return "\`" + data.replace(/"""/gi, '\`').replace(/str\(/gi, "parseFloat(") + '\`';
            }
            if (Blockly && Blockly.Python && Blockly.Python.jsCodes_) {
                Simulator.fileStorage['vitta_script.js'] = eval(remapToJs('jsCodes_'));
                Simulator.fileStorage['vitta_script.js'] = eval('\`' + Simulator.fileStorage['vitta_script.js'] + '\ `');
            }
            if (Blockly && Blockly.Python && Blockly.Python.cssStyles_) {
                Simulator.fileStorage['vitta_style.css'] = eval(remapToCss('cssStyles_'));
            }
        },

        ERROR_PAGE: (url) => `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    * { transition: all 0.6s; }
                    body { font-family: 'Montserrat', 'serif'; color: #888; margin: 0;
                    #main { display: table; width: 100%; height: 100vh; text-align: center; }
                    .fof { display: table-cell; vertical-align: middle; }
                    .fof h1{ font-size: 50px; display: inline-block; padding-right: 12px; animation: type .5s alternate infinite; }
                </style>
            </head>
            <body>
                <div id="main">
                    <div class="fof">
                        <h1>Impossible d'accéder à la page</h1>
                        <h3>Le serveur à l'addresse ${url} a mis trop de temps pour répondre</h3>
                        <h3>Vérifiez si un des simulateurs esp32 a bien lancé un serveur à cette adresse.</h3>
                    </div>
                </div>
            </body>
            </html>`,

        PACKET: (host, data = "") => `GET /${data ? data : ""} HTTP/1.1\r\nHost: ${host}\r\nConnection: keep-alive\r\nUser-Agent: Mozilla/5.0 (system; XXXXXXX) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*\r\nReferer: http://${host}/\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7\r\n\r\n`,

        emptyIframe: function () {
            this.executePage("");
        },

        /**
         * Initialize web page module in simulator.
         */
        init: function () {
            this.currentWebPageId = VittaInterface.id;
            const delay = function (callback, ms) {
                var timer = 0;
                return function () {
                    var context = this, args = arguments;
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        callback.apply(context, args);
                    }, ms || 0);
                };
            };
            var _this = this;
            $("#server-url-field").keyup(delay(_this.refreshWithUrl, 500));
            $("#resfresh-preview-btn").on('click', _this.refreshWithUrl);
        },

        /**
         * Refresh the web page client simulation with the new url.
         */
        refreshWithUrl: function () {
            const url = $("#server-url-field").val();
            if (url.length > 0) {
                const _this = WifiSimulator.web_client;
                clearInterval(_this.responseInterval);
                const addr = { port: 80 };
                addr.pages = url.replace(/http(s|):\/\//g, '').split('/');
                try {
                    const connect = function (bind, host) {
                        const rightLink = "http://" + host + (addr.pages.length > 0 ? '/': '') + addr.pages.join('/');
                        if (rightLink === url || rightLink === "http://" + url) {
                            $("#server-url-field").val(rightLink);
                            _this.connect(bind);
                        } else {
                            _this.executePage(_this.ERROR_PAGE(url));
                        }
                    }
                    const host = addr.pages.shift();
                    const ipMatch = host.match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/gi);
                    if (ipMatch !== null) {
                        addr.ip = ipMatch[0];
                        connect(addr, addr.ip);
                    } else {
                        addr.hostname = host;
                        connect(addr, addr.hostname);
                    }
                } catch (e) {
                    console.error(e)
                }
            }
        },

        /**
         * Connect web page client to current server. 
         * @param {Array <string,int>} addr 
         */
        connect: function (addr) {
            // console.log("[WEB_CLIENT] connect()")
            const multiEditor = WifiSimulator._getMultiEditor();
            const server = WifiSimulator._getCurrentServerOpened(multiEditor[INTERFACE_NAME], addr);
            const _this = WifiSimulator.web_client;
            if (server && server.is_active) {
                const connect = function (client) {
                    _this.ip = client.addr[0];
                    _this.hostname = client.hostname;
                    _this.currentServerId = server.editorId;
                    WifiSimulator.web_client.responseInterval = setInterval(_this.waitingServerResponse, 40);
                    multiEditor[WifiSimulator._interface][_this.currentServerId].network.server.clients.push(client);
                    localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                };
                const client = {
                    addr: [null, 80],
                    is_connected: true,
                    sent: []
                }
                let data = null;
                if (addr.pages && addr.pages.length > 0) {
                    data = addr.pages.join('/');
                }
                if (addr.ip) {
                    const ips = addr.ip.split('.');
                    const client_ip = ips[0] + '.' + ips[1] + '.' + ips[2] + '.' + _this.currentWebPageId;
                    client.addr[0] = client_ip;
                    client.data = [_this.PACKET(client_ip, data)];
                    connect(client);
                } else if (addr.hostname) {
                    client.hostname = addr.hostname + '.' + _this.currentWebPageId;
                    client.data = [_this.PACKET(client.hostname, data)];
                    connect(client);
                } else {
                    _this.executePage(_this.ERROR_PAGE(addr.ip ? addr.ip : addr.hostname));
                }
            } else {
                _this.executePage(_this.ERROR_PAGE(addr.ip ? addr.ip : addr.hostname));
            }
        },

        /**
         * Attempting a connection.
         */
        waitingServerResponse: function () {
            // console.log("[WEB_CLIENT] waitingServerResponse()")
            const _this = WifiSimulator.web_client;
            const multiEditor = WifiSimulator._getMultiEditor();
            const server = WifiSimulator._getServerEditor(multiEditor, _this.currentServerId);
            if (server && server.is_active && server.currentClient && (server.currentClient.addr[0] == _this.ip || server.currentClient.hostname == _this.hostname) && server.currentClient.sent) {
                const sent = server.currentClient.sent;
                if (sent && sent.length > 0) {
                    if (!(sent[0] == 'HTTP/1.1 200 OK\n')) {
                        const data = sent.shift();
                        _this.executePage(data);
                        multiEditor[WifiSimulator._interface][_this.currentServerId].network.server.currentClient.sent = sent;
                        clearInterval(WifiSimulator.web_client.responseInterval);
                        localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                    } else if (sent.length > 2) {
                        const html = server.currentClient.sentAll.shift();
                        for (var i = 0; i < 3; i++) {
                            sent.shift();
                        }
                        _this.executePage(html);
                        multiEditor[WifiSimulator._interface][_this.currentServerId].network.server.currentClient.sentAll = server.currentClient.sentAll;
                        multiEditor[WifiSimulator._interface][_this.currentServerId].network.server.currentClient.sent = sent;
                        clearInterval(WifiSimulator.web_client.responseInterval);
                        localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                    }
                }
            }
        },

        /**
         * Execute page in web page iframe.
         * @param {string} html 
         */
        executePage: function (html) {
            // console.log("[WEB_CLIENT] executePage()")
            const iframe = $('#hcjPreview');
            const idoc = iframe[0].contentDocument;
            idoc.open();
            idoc.write(html);
            idoc.close();
        },

        /**
         * Stop web page simulation.
         */
        stop: function () {
            clearInterval(this.responseInterval);
            this.responseInterval = null;
            this.currentServerId = null;
        }

    },

    esp32_client: {

        currentServerId: null,
        connectInterval: null,
        serverDataInterval: null,

        /**
         * Request connection to server by adding client address to clients array.
         * @param {Array <string,int>} addr 
         */
        requestConnection: function (addr) {
            // console.log("[ESP32_CLIENT] requestConnection()")
            const multiEditor = WifiSimulator._getMultiEditor();
            let server = null;
            for (var _interface of WifiSimulator.COMPATIBLE_INTERFACES) {
                server = WifiSimulator._getCurrentServerOpened(multiEditor[_interface], addr);
                if (server && server.is_active) {
                    break;
                }
            }
            if (server) {
                this.currentServerId = server.editorId;
                const client = {
                    addr: [WifiSimulator.static_IP, 80],
                    hostname: '',
                    data: [],
                    is_connected: true,
                    sent: []
                };
                multiEditor[_interface][this.currentServerId].network.server.clients.push(client);
                localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
            }
        },

        /**
         * Check if requested server is active and ready for current esp32 client.
         * @returns {boolean}
         */
        isServerReady: function () {
            // console.log("[ESP32_CLIENT] isServerReady()")
            const multiEditor = WifiSimulator._getMultiEditor();
            const server = WifiSimulator._getServerEditor(multiEditor, this.currentServerId);
            return this._socketReady(server) && ((server.currentClient.addr[0] == WifiSimulator.static_IP) || (server.currentClient.hostname == WifiSimulator.DHCP_hostname)) && server.currentClient.is_connected;
        },

        /**
         * Send data to current server in data array in localStorage.
         * @param {string} data 
         */
        sendDataToCurrentServer: function (data) {
            // console.log("[ESP32_CLIENT] sendDataToCurrentServer()")
            const multiEditor = WifiSimulator._getMultiEditor();
            const server = WifiSimulator._getServerEditor(multiEditor, this.currentServerId);
            if (this._socketReady(server) && server.currentClient.data) {
                multiEditor[WifiSimulator._interface][this.currentServerId].network.server.currentClient.data = [...server.currentClient.data].concat([data]);
                localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
            }
        },

        /**
         * Get data received from server from 'sent' array.
         * @returns {string} data
         */
        getCurrentServerData: function () {
            // console.log("[ESP32_CLIENT] getCurrentServerData()")
            const multiEditor = WifiSimulator._getMultiEditor();
            const server = WifiSimulator._getServerEditor(multiEditor, this.currentServerId);
            if (this._socketReady(server)) {
                const sent = server.currentClient.sent;
                if (sent && sent.length > 0) {
                    multiEditor[WifiSimulator._interface][this.currentServerId].network.server.currentClient.sent = sent.slice(1);
                    localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                    return sent[0];
                }
            }
        },

        /**
         * Check if server and current socket client are ready.
         * @param {object} server 
         * @returns {boolean}
         */
        _socketReady: function (server) {
            if (server && server.is_active && server.currentClient) {
                return true;
            }
        },

        closeSocket: function () {
            // console.log("[ESP32_CLIENT] closeSocket()")
            const multiEditor = WifiSimulator._getMultiEditor();
            const server = WifiSimulator._getServerEditor(multiEditor, this.currentServerId);
            if (server) {
                //console.log("Fermeture du socket serveur courant ...")
            }
        },

        /**
         * Reset current esp32 client.
         */
        stop: function () {
            clearInterval(this.connectInterval);
            this.connectInterval = null;
            clearInterval(this.serverDataInterval);
            this.serverDataInterval = null;
            this.currentServerId = null;
        }

    },

    server: {

        currentServerId: null,
        is_active: false,
        acceptInterval: null,
        clientDataInterval: null,
        receiveRequestInterval: null,
        receiveTimeout: null,

        /**
         * Set current server id as interface id.
         */
        init: function () {
            this.currentServerId = VittaInterface.id;
        },

        /**
         * Bind new server in localStorage to start sockets communication.
         * @param {Array <string,int>} addr 
         */
        bind: function (addr) {
            this.currentServerId = VittaInterface.id;
            const multiEditor = WifiSimulator._getMultiEditor();
            let currentEditor = null;
            for (var _interface of WifiSimulator.COMPATIBLE_INTERFACES) {
                if (multiEditor[_interface]) {
                    currentEditor = multiEditor[_interface][this.currentServerId];
                    if (currentEditor) {
                        break;
                    }
                }
            }
            this.is_active = true;
            var _this = this;
            const server = {
                'dateUpdated': Math.floor(new Date() / 1000),
                'addr': [addr.ip, addr.port],
                'is_active': _this.is_active,
                'clients': [],
                'currentClient': null,
                'hostname': addr.hostname
            };
            if (currentEditor && currentEditor.network) {
                multiEditor[_interface][this.currentServerId].network['server'] = server;
            } else {
                multiEditor[_interface][this.currentServerId].network = {
                    'server': server
                };
            }
            localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
        },

        /**
         * Get next requested connection from clients array of current server.
         * @returns {object} client
         */
        getNextClient: function () {
            // console.log("[SERVER] getNextClient()")
            const multiEditor = WifiSimulator._getMultiEditor();
            const server = WifiSimulator._getServerEditor(multiEditor, this.currentServerId);
            if (server && (!server.currentClient || !server.currentClient.is_connected)) {
                if (server.clients && server.clients.length > 0) {
                    const cl = server.clients[0];
                    multiEditor[WifiSimulator._interface][this.currentServerId].network.server.clients = server.clients.slice(1);
                    localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                    return cl;
                }
            }
        },

        /**
         * Set accepted current client connection.
         * @param {object} clientSocket 
         */
        setCurrentClientSocket: function (clientSocket) {
            // console.log("[SERVER] setCurrentClientSocket()")
            const multiEditor = WifiSimulator._getMultiEditor();
            const server = WifiSimulator._getServerEditor(multiEditor, this.currentServerId)
            if (server) {
                multiEditor[WifiSimulator._interface][this.currentServerId].network.server.currentClient = clientSocket;
                localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
            }
        },

        /**
         * Get next data from current client array data.
         * @returns {string} data
         */
        waitingCurrentClientData: function () {
            // console.log("[SERVER] waitingCurrentClientData()")
            const multiEditor = WifiSimulator._getMultiEditor();
            const server = WifiSimulator._getServerEditor(multiEditor, this.currentServerId);
            if (server && server.currentClient && server.currentClient.is_connected) {
                const data = server.currentClient.data.join("");
                multiEditor[WifiSimulator._interface][this.currentServerId].network.server.currentClient.data = [];
                localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                return data;
            }
        },

        _getCurrentClientId: function () {
            // console.log("[SERVER] _getCurrentClientId()")
            const multiEditor = WifiSimulator._getMultiEditor();
            const server = WifiSimulator._getServerEditor(multiEditor, this.currentServerId)
            if (server && server.currentClient && server.currentClient.is_connected) {
                if (server.currentClient.addr[0]) {
                    return server.currentClient.addr[0].split(".")[3];
                } else if (server.currentClient.hostname) {
                    return server.currentClient.hostname.split('.')[1];
                }
            }
        },

        /**
         * Send data from server to current client connected. Data will be in sent array or sentAll depending on typed data.
         * @param {string} data 
         * @param {string} type 
         */
        sendDataToCurrentClient: function (data, type) {
            // console.log("[SERVER] sendDataToCurrentClient()")
            const multiEditor = WifiSimulator._getMultiEditor();
            const server = WifiSimulator._getServerEditor(multiEditor, this.currentServerId)
            if (server && server.currentClient && server.currentClient.is_connected) {
                if (type == "sentAll") {
                    const start = data.split("<script>")[0];
                    const end = data.split("</script>")[1];
                    let js = data.split("<script>")[1].split("</script>")[0];
                    js = js.replace("const http_sendSliderValue", "var http_sendSliderValue_NOT_USED");
                    js = js.replace("const http_onButtonClick", "var http_onButtonClick_NOT_USED");
                    js = js.replace("const http_onSwitchToggle", "var http_onSwitchToggle_NOT_USED");
                    js += JS_SCRIPT_IFRAME;
                    js += "\niFrameSimulator.currentWebPageId = \"" + this._getCurrentClientId() + "\";";
                    if (server.currentClient.hostname) {
                        js += "\niFrameSimulator.ADDR = {ip: \'\', port: 80, hostname: \'" + WifiSimulator.DHCP_hostname + "\'};"
                    } else {
                        js += "\niFrameSimulator.ADDR = {ip: \'" + WifiSimulator.static_IP + "\', port: 80, hostname: \'\'};"
                    }
                    switch (INTERFACE_NAME) {
                        case 'pico':
                            js = js.replace(FUNCTIONS_PICO.JAVASCRIPT_REQUEST_VARIABLES_FROM_SERVER, JS_SIMU_REQUEST_VARIABLES);
                            break;
                        default:
                            js = js.replace(FUNCTIONS_ESP32_MICROCHIP.JAVASCRIPT_REQUEST_VARIABLES_FROM_SERVER, JS_SIMU_REQUEST_VARIABLES);
                    }
                    data = start + "<script>" + js + "</script>" + end;
                }
                if (server.currentClient[type]) {
                    multiEditor[WifiSimulator._interface][this.currentServerId].network.server.currentClient[type].push(data);
                } else {
                    multiEditor[WifiSimulator._interface][this.currentServerId].network.server.currentClient[type] = [data];
                }
                localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
            }
        },

        closeSocket: function () {
            // console.log("[SERVER] closeSocket()")
            const multiEditor = WifiSimulator._getMultiEditor();
            const server = WifiSimulator._getServerEditor(multiEditor, this.currentServerId)
            if (server && server.currentClient && server.currentClient.is_connected) {
                multiEditor[WifiSimulator._interface][this.currentServerId].network.server.currentClient.is_connected = false;
                localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
            }
        },

        active: function (state) {
            if (this.is_active != state) {
                const multiEditor = WifiSimulator._getMultiEditor();
                const server = WifiSimulator._getServerEditor(multiEditor, this.currentServerId)
                if (server) {
                    this.is_active = state;
                    multiEditor[WifiSimulator._interface][this.currentServerId].network.server.is_active = state;
                    localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                }
            }
        },

        /**
         * Stop current server setting is_active to false.
         */
        stop: function () {
            this.active(false);
            this.currentServerId = null;
            clearInterval(this.acceptInterval);
            this.acceptInterval = null;
            clearInterval(this.clientDataInterval);
            this.clientDataInterval = null;
            clearInterval(this.receiveRequestInterval);
            this.receiveRequestInterval = null;
            clearTimeout(this.receiveTimeout);
            this.receiveTimeout = null;
        }
    }

}
/** 
 */
const JS_SCRIPT_IFRAME = `
var iFrameSimulator = {
    COMPATIBLE_INTERFACES: ["esp32", "m5stack", "galaxia", "pico"],
    serverActive: true,
    responseInterval: null,
    requestTimeout: null,
    currentWebPageId: null,
    currentServerId: null,
    inRequest: false,
    _interface: null,
    replay: 1,
    ip: null,
    PACKET: (host, data = "") => \`GET /\${data} HTTP/1.1\\r\\nHost: \${host}\\r\\nConnection: keep-alive\\r\\nUser-Agent: Mozilla/5.0 (system; XXXXXXX) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36\\r\\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*\\r\\nReferer: http://\${host}/\\r\\nAccept-Encoding: gzip, deflate\\r\\nAccept-Language: fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7\\r\\n\\r\\n\`,
    _getMultiEditor: function () {
        const multiEditorLS = localStorage.getItem('multiEditor');
        if (multiEditorLS) {
            return JSON.parse(multiEditorLS);
        } else {
            throw Error("[ESP32] multiEditor is not defined")
        }
    },
    /**
    checkHasToClose: function () {
        const multiEditor = iFrameSimulator._getMultiEditor();
        let multiEditorInterface = null;
        for (var _interface of this.COMPATIBLE_INTERFACES) {
            multiEditorInterface = multiEditor[_interface][iFrameSimulator.currentWebPageId];
            if (multiEditorInterface) {
                break;
            }
        }
        if (multiEditorInterface && multiEditorInterface.network) {
            const client = multiEditorInterface.network.client;
            if (client && client.hasToStop) {
                multiEditor[_interface][iFrameSimulator.currentWebPageId].network.client.hasToStop = false;
                localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                return true;
            }
        }
    },
    */

    _getServerEditor: function (multiEditor, serverId) {
        const _this = iFrameSimulator;
        for (var _interface of _this.COMPATIBLE_INTERFACES) {
            const interfaceEditor = multiEditor[_interface];
            if (interfaceEditor) {
                const serverEditor = interfaceEditor[serverId];
                if (serverEditor) {
                    const server = serverEditor.network.server;
                    _this._interface = _interface;
                    return server;
                }
            }
        }
    },

    waitingServerResponse: function () {
        // console.log("[IFRAME] waitingServerResponse()")
        const STATUS = {
            INACTIF: 0,
            NO_CLIENT: -1,
            NO_JSON: 1,
            OK: 200
        };
        const _this = iFrameSimulator;
        const multiEditor = _this._getMultiEditor();
        const server = _this._getServerEditor(multiEditor, _this.currentServerId);
        if (server && server.is_active) {
            if (server.currentClient) {
                if (((server.currentClient.addr[0] == _this.ip) || (server.currentClient.hostname == _this.hostname)) && server.currentClient.sent) {
                    const sent = server.currentClient.sent;
                    if (sent.length > 3 && sent[1].match(/application\\\/json/)) {
                        multiEditor[_this._interface][_this.currentServerId].network.server.currentClient.sent = [];
                        localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                        const json = sent[3].substr(2,sent[3].length-3);
                        const serverResponse = JSON.parse(sent[3])
                        if (serverResponse.spans) {
                            for (var i in serverResponse.spans) {
                                document.getElementById(i).innerText = serverResponse.spans[i];
                            }
                        }
                        if (serverResponse.gauges) {
                            for (var i in serverResponse.gauges) {
                                if (myGauges[i] && document.getElementById(i)) {
                                    setGaugeValue(serverResponse.gauges[i], myGauges[i].min, myGauges[i].max, i);
                                }
                            }
                        }
                        localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                        return STATUS.OK;
                    } else {
                        return STATUS.NO_JSON;
                    }
                }
            } else {
                return STATUS.NO_CLIENT;
            }
        } else {
            return STATUS.INACTIVE;
        }
    },
    connect: function (addr, data, waiting=false) {
        // console.log("[IFRAME] connect()")
        const STATUS = {
            INACTIF: 0,
            NO_CLIENT: -1,
            NO_JSON: 1,
            OK: 200
        };
        this.inactiveCount = 0;
        clearInterval(iFrameSimulator.responseInterval);
        const multiEditor = this._getMultiEditor();
        let server = null;
        for (var _interface of this.COMPATIBLE_INTERFACES) {
            server = this._getCurrentServerOpened(multiEditor[_interface], addr);
            if (server && server.is_active) {
                break;
            }
        }
        if (server && server.is_active) {
            const client = {
                addr: [null, 80],
                is_connected: true,
                hostname: null
            };
            if (addr.ip) {
                const ips = addr.ip.split('.');
                const client_ip = ips[0] + '.' + ips[1] + '.' + ips[2] + '.' + this.currentWebPageId;
                client.addr[0] = client_ip;
                client.data = [this.PACKET(client_ip, data)];
                if (addr.hostname) {
                    client.hostname = addr.hostname + '.' + this.currentWebPageId;
                    client.data = [this.PACKET(client.hostname, data)];
                }
            }
            else if (addr.hostname) {
                client.hostname = addr.hostname + '.' + this.currentWebPageId;
                client.data = [this.PACKET(client.hostname, data)];
            }
            try {
                this.currentServerId = server.editorId;
                if (data.match(/requestVariables/)) {
                    iFrameSimulator.inactiveCount = 0;
                    iFrameSimulator.responseInterval = setInterval(() => {
                        const status =  iFrameSimulator.waitingServerResponse()
                        switch (status) {
                            case STATUS.OK:
                                // console.log("STATUS.OK")
                                iFrameSimulator.inactiveCount = 0;
                                iFrameSimulator.inRequest = false;
                                clearInterval(iFrameSimulator.responseInterval);
                                iFrameSimulator.responseInterval = null;
                                break;
                            case STATUS.INACTIVE:
                                // console.log("STATUS.INACTIVE")
                                iFrameSimulator.inactiveCount += 1;
                                if (iFrameSimulator.inactiveCount > 20 || !iFrameSimulator.inRequest) {
                                    clearInterval(iFrameSimulator.responseInterval);
                                    iFrameSimulator.responseInterval = null;
                                }
                                break;
                            case STATUS.NO_CLIENT:
                                // console.log("STATUS.NO_CLIENT")
                                iFrameSimulator.inRequest = false;
                                iFrameSimulator.inactiveCount = 0;
                                if (iFrameSimulator.inactiveCount > 20 || !iFrameSimulator.inRequest) {
                                    clearInterval(iFrameSimulator.responseInterval);
                                    iFrameSimulator.responseInterval = null;
                                }
                                break;
                            case STATUS.NO_JSON:
                                // console.log("STATUS.NO_JSON")
                                iFrameSimulator.inactiveCount = 0;
                                break
                        }
                    }, 100);
                }
                multiEditor[_interface][this.currentServerId].network.server.clients.push(client);
                localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
            } catch (e) {
                console.error(e)
            }
        } else {
            iFrameSimulator.inRequest = false;
            iFrameSimulator.serverActive = false;
            clearTimeout(iFrameSimulator.requestTimeout);
        }
    },
    _getCurrentServerOpened: function (mutiEditorInterface, addr) {
        let validServers = [];
        for (var id in mutiEditorInterface) {
            if (mutiEditorInterface[id].network) {
                const server = mutiEditorInterface[id].network.server;
                if (server && server.dateUpdated && (server.addr[1] == addr.port) && ((server.hostname == addr.hostname) || (server.addr[0] == addr.ip))) {
                    validServers.push(server);
                    server.editorId = id;
                }
            }
        }
        return validServers.sort(function (a, b) {
            return b.dateUpdated - a.dateUpdated;
        })[0];
    },
};
var http_sendSliderValue = function (slider, id) {
    iFrameSimulator.connect(iFrameSimulator.ADDR, id + "=" + slider.value);
};
var http_onButtonClick = function (id) {
    iFrameSimulator.connect(iFrameSimulator.ADDR, id + "=1");
};
var http_onSwitchToggle = function (id) {
    const state = document.getElementById(id).checked;
    iFrameSimulator.connect(iFrameSimulator.ADDR, id + "=" + (state ? 1 : 0));
};
function arrayEquals (a, b) {
	return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
};`;

const JS_SIMU_REQUEST_VARIABLES = `
var requestVariablesFromServer = function(ip) {
    // console.log("[IFRAME] requestVariablesFromServer()")
    if (typeof iFrameSimulator !== 'undefined') {
        if (!iFrameSimulator.inRequest) {
            iFrameSimulator.connect(iFrameSimulator.ADDR, "requestVariables&ip=" + ip);
            iFrameSimulator.inRequest = true;
        }
        clearTimeout(iFrameSimulator.requestTimeout);
        iFrameSimulator.requestTimeout = setTimeout(function () {
            if (iFrameSimulator.serverActive && iFrameSimulator.inRequest !== undefined) {
                requestVariablesFromServer(ip);
            }
        }, 1000);
    } else {
        setTimeout(function () {
            requestVariablesFromServer(ip);
        }, 1000);
    }
};`;