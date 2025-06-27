/**
 * @fileoverview Network generators for Esp32.
 */

// WiFi

// Wifi - Connect station
Blockly.Python.network_connectStation = function (block) {
    const ssid = Blockly.Python.valueToCode(block, "SSID", Blockly.Python.ORDER_NONE) || "''";
    const pwd = Blockly.Python.valueToCode(block, "PASSWORD", Blockly.Python.ORDER_NONE) || "''";
    let ip = Blockly.Python.valueToCode(block, "IP", Blockly.Python.ORDER_NONE) || "''";
    let mask = Blockly.Python.valueToCode(block, "MASK", Blockly.Python.ORDER_NONE) || "";
    let gateway = Blockly.Python.valueToCode(block, "GATEWAY", Blockly.Python.ORDER_NONE) || "";
    let dhcp_hostname = Blockly.Python.valueToCode(block, "DHCP_HOSTNAME", Blockly.Python.ORDER_NONE) || "";
    Blockly.Python.addImport('network', IMPORT_NETWORK);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('ESP32_IP', "ESP32_IP = " + ip);
    Blockly.Python.addInit('station', 'station = None');
    Blockly.Python.addInit('accessPoint', 'accessPoint = None');
    Blockly.Python.addFunction('connect_station', FUNCTIONS_ESP32_MICROCHIP.DEF_WIFI_CONNECT_STATION);
    Blockly.Python.addFunction('disconnect_station', FUNCTIONS_ESP32_MICROCHIP.DEF_WIFI_DISCONNECT_STATION);
    if (ip) {
        ip = ", ip=ESP32_IP";
    }
    if (mask) {
        mask = ", mask=" + mask;
    }
    if (gateway) {
        gateway = ", gateway=" + gateway;
    }
    if (dhcp_hostname) {
        dhcp_hostname = ", dhcp_hostname=" + dhcp_hostname;
    }
    let code = "connect_station(ssid=" + ssid + ", password=" + pwd + ip + mask + gateway + dhcp_hostname + ")" + NEWLINE;
    if (Blockly.Python.esp32.getProgrammingMode().mode == Blockly.Python.esp32.MODE_SERVER) {
        Blockly.Python.addImport('vitta_server', IMPORT_VITTA_SERVER);
        Blockly.Python.addImport('gc', IMPORT_GC);
        Blockly.Python.addImport('esp', IMPORT_ESP);
        Blockly.Python.addConstant('SERVER_PORT', 'SERVER_PORT = 80');
        Blockly.Python.addConstant('', 'esp.osdebug(None)\ngc.collect()');
        Blockly.Python.addInit('server', 'server = SERVER()');
        code += "server.start(sta=station, ip=ESP32_IP, port=SERVER_PORT)" + NEWLINE;
    } else if (Blockly.Python.esp32.getProgrammingMode().mode == Blockly.Python.esp32.MODE_CLIENT) {
        Blockly.Python.addImport('vitta_client', IMPORT_VITTA_CLIENT);
        Blockly.Python.addConstant('SERVER_PORT', 'SERVER_PORT = 80');
        Blockly.Python.addInit('client', 'client = CLIENT(port=SERVER_PORT)')
        code += "client.init(sta=station, ap=accessPoint)" + NEWLINE;
    }
    return code;
};

// Wifi - Configure access point
Blockly.Python.network_configureAccessPoint = function (block) {
    const essid = Blockly.Python.valueToCode(block, "ESSID", Blockly.Python.ORDER_NONE) || "''";
    const ip = Blockly.Python.valueToCode(block, "IP", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addImport('network', IMPORT_NETWORK);
    Blockly.Python.addConstant('ESP32_IP', "ESP32_IP = " + ip);
    Blockly.Python.addInit('station', 'station = None');
    Blockly.Python.addInit('accessPoint', 'accessPoint = None');
    Blockly.Python.addFunction('configure_access_point', FUNCTIONS_ESP32_MICROCHIP.DEF_WIFI_CONFIGURE_ACCESS_POINT);
    let code = "accessPoint = configure_access_point(ssid=" + essid + ", ip=ESP32_IP, max_clients=50)" + NEWLINE;
    if (Blockly.Python.esp32.getProgrammingMode().mode == Blockly.Python.esp32.MODE_SERVER) {
        Blockly.Python.addImport('vitta_server', IMPORT_VITTA_SERVER);
        Blockly.Python.addConstant('SERVER_PORT', 'SERVER_PORT = 80');
        Blockly.Python.addInit('server', 'server = SERVER()');
        code += "server.start(sta=None, ap=accessPoint, ip=ESP32_IP, port=SERVER_PORT)" + NEWLINE;
    } else if (Blockly.Python.esp32.getProgrammingMode().mode == Blockly.Python.esp32.MODE_CLIENT) {
        Blockly.Python.addImport('vitta_client', IMPORT_VITTA_CLIENT);
        Blockly.Python.addInit('client', 'client = CLIENT(port=SERVER_PORT)')
        code += "client.init(sta=station, ap=accessPoint)" + NEWLINE;
    }
    return code;
};

// Wifi - Disconnect station
Blockly.Python.network_disconnectStation = function () {
    Blockly.Python.addImport('network', IMPORT_NETWORK);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('station', 'station = None');
    Blockly.Python.addFunction('disconnect_station', FUNCTIONS_ESP32_MICROCHIP.DEF_WIFI_DISCONNECT_STATION);
    return "disconnect_station()" + NEWLINE;
};

// Wifi - Is station connected ?
Blockly.Python.network_isStationConnected = function () {
    return ["station.isconnected()", Blockly.Python.ORDER_ATOMIC];
};

// Wifi - Set wifi state
Blockly.Python.network_setWifi = function (block) {
    const state = block.getFieldValue('STATE');
    return `station.active(${state})` + NEWLINE;
};

// Wifi - Scan network profiles
Blockly.Python.network_scanNetworkProfiles = function () {
    return ["station.scan()", Blockly.Python.ORDER_ATOMIC];
};

// Wifi - Get station informations
Blockly.Python.network_getStationInfos = function () {
    return ["station.ifconfig()", Blockly.Python.ORDER_ATOMIC];
};

// Server

// Server - send data to client
Blockly.Python.network_server_sendData = function (block) {
    const data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_NONE) || "";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) {
        return "server.sendDataToClient(" + data + ")" + NEWLINE;
    } else {
        return "server.sendDataToClient(str(" + data + "))" + NEWLINE;
    }
};

// Server - get client data
Blockly.Python.network_server_getClientData = function () {
    return ["server.getClientData()", Blockly.Python.ORDER_ATOMIC];
};

// Server - get client data parameter
Blockly.Python.network_server_getClientDataParam = function () {
    return ["server.getClientData(parameter = True)", Blockly.Python.ORDER_ATOMIC];
};

// Server - get client IP
Blockly.Python.network_server_getClientIp = function () {
    return ["server.getClientIp()", Blockly.Python.ORDER_ATOMIC];
};

// Server - change port
Blockly.Python.network_changeServerPort = function (block) {
    const port = Blockly.Python.valueToCode(block, 'PORT', Blockly.Python.ORDER_NONE) || "";
    Blockly.Python.addConstant('SERVER_PORT', 'SERVER_PORT = ' + port);
    return "";
};

// Server - send web page
Blockly.Python.network_server_sendWebPage = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "BODY") || "";
    const htmlPageVar = 'server.html_page = """' + NEWLINE
        + '  <!DOCTYPE HTML>' + NEWLINE
        + "  <html>" + NEWLINE
        + "  <head>" + NEWLINE
        + '  <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1">' + NEWLINE
        + "  </head>" + NEWLINE
        + "  <body>" + NEWLINE
        + branchCode
        + "  </body>" + NEWLINE
        + '  </html>"""' + NEWLINE;
    let html_vars = Blockly.Python.esp32.getVariablesIncludedInHtml(block);
    let code = htmlPageVar + NEWLINE;
    if (html_vars.length > 0) {
        code += 'server.sendHtmlPage(True)' + NEWLINE;
        let htmlVarCode = 'html_variables = {' + NEWLINE;
        if (Object.keys(Blockly.Python.htmlSpans_).length > 0) {
            htmlVarCode += '  \'spans\': {' + NEWLINE;
            for (var i in Blockly.Python.htmlSpans_) {
                htmlVarCode += '    \'' + i + '\': ' + Blockly.Python.htmlSpans_[i] + ',' + NEWLINE;
            }
            htmlVarCode += '  },' + NEWLINE;
        }
        if (Object.keys(Blockly.Python.htmlGauges_).length > 0) {
            htmlVarCode += '  \'gauges\': {' + NEWLINE;
            for (var i in Blockly.Python.htmlGauges_) {
                htmlVarCode += '    \'' + i + '\': ' + Blockly.Python.htmlGauges_[i] + ',' + NEWLINE;
            }
            htmlVarCode += '  },' + NEWLINE;
        }
        if (Object.keys(Blockly.Python.htmlImages_).length > 0) {
            htmlVarCode += '  \'images\': {' + NEWLINE;
            for (var i in Blockly.Python.htmlImages_) {
                htmlVarCode += '    \'' + i + '\': ' + Blockly.Python.htmlImages_[i] + ',' + NEWLINE;
            }
            htmlVarCode += '  },' + NEWLINE;
        }
        htmlVarCode += "}" + NEWLINE;
        code += htmlVarCode + 'server.sendVariables(html_variables)' + NEWLINE;
        Blockly.Python.addImport('ujson', IMPORT_UJSON);
        Blockly.Python.esp32.addJavascriptCode('js_requestVariablesFromServer', FUNCTIONS_ESP32_MICROCHIP.JAVASCRIPT_REQUEST_VARIABLES_FROM_SERVER);
    } else {
        code += 'server.sendHtmlPage(False)' + NEWLINE;
    }
    return code;
};

// Client

// Client - send data to server
Blockly.Python.network_client_sendData = function (block) {
    let data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_NONE) || "";
    const ip = Blockly.Python.valueToCode(block, 'IP', Blockly.Python.ORDER_NONE) || "''";
    let port = Blockly.Python.valueToCode(block, 'PORT', Blockly.Python.ORDER_NONE) || "";
    if (port) port = ", port=" + port;
    if (!Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) data = "str(" + data + ")";
    return "client.sendDataToServer(" + data + ", ip=" + ip + port + ")" + NEWLINE;
};

// Client - get server data
Blockly.Python.network_client_getServerData = function (block) {
    const ip = Blockly.Python.valueToCode(block, 'IP', Blockly.Python.ORDER_NONE) || "''";
    return ["client.getServerData(" + ip + ")", Blockly.Python.ORDER_ATOMIC];
};

// Web Page

// Add title to web page
Blockly.Python.network_html_addTitle = function (block) {
    let title = Blockly.Python.valueToCode(block, 'TITLE', Blockly.Python.ORDER_NONE) || "";
    const level = block.getFieldValue("LEVEL");
    const inputBlock = block.getInput("COLOR").connection.targetBlock();
    let colour = "#000";
    if (inputBlock) {
        colour = inputBlock.getFieldValue('COLOUR');
    }
    Blockly.Python.esp32.addCssStyle('default_init', FUNCTIONS_ESP32_MICROCHIP.CSS_DEFAULT_INIT);
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TITLE")) {
        title = Blockly.Python.esp32.getStringFormat(title);
    } else {
        title = Blockly.Python.esp32.getStringFormat('str(' + title + ')');
    }
    return '  <h' + level + ' class="police" style="color:' + colour + ';">' + title + '</h' + level + '>' + NEWLINE;
};

// Add text to page
Blockly.Python.network_html_addText = function (block) {
    const text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || "";
    let fontSize = Blockly.Python.valueToCode(block, 'SIZE', Blockly.Python.ORDER_NONE) || "";
    let colour = "#666666";
    let colorBlock = block.getInput("COLOR");
    if (colorBlock) {
        colorBlock = colorBlock.connection.targetBlock();
        if (colorBlock) {
            colour = colorBlock.getFieldValue('COLOUR');
        }
    }
    if (fontSize) {
        fontSize = 'font-size:' + Blockly.Python.esp32.getStringFormat('str(' + fontSize + ')') + 'px;';
    }
    Blockly.Python.esp32.addCssStyle('default_init', FUNCTIONS_ESP32_MICROCHIP.CSS_DEFAULT_INIT);
    const formattedText = Blockly.Python.esp32.getStringFormat('str(' + text + ')');
    const html_vars = Blockly.Python.esp32.getVariablesIncludedInHtml(block);
    if (html_vars.length > 0) {
        const id = randHex();
        for (var i in html_vars) {
            if (text.includes(html_vars[i])) {
                Blockly.Python.esp32.addHtmlSpanValue(id, text, 'span');
                return '  <span id="' + id + '" class="police" style="color:' + colour + ';' + fontSize + '">' + formattedText + '</span><br>' + NEWLINE;
            }
        }
    }
    return '  <span class="police" style="color:' + colour + ';' + fontSize + '">' + formattedText + '</span><br>' + NEWLINE;
};

// Add button on page
Blockly.Python.network_html_addButton = function (block) {
    let id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_NONE) || "''";
    let text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || "''";
    let height = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_NONE) || "";
    let width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_NONE) || "";
    let colour = "#e3e3e3";
    let colorBlock = block.getInput("COLOR")
    if (colorBlock) {
        colorBlock = colorBlock.connection.targetBlock();
        if (colorBlock) {
            colour = colorBlock.getFieldValue('COLOUR');
        }
    }
    id = Blockly.Python.esp32.getStringFormat(id);
    height = 'height:' + Blockly.Python.esp32.getStringFormat('str(' + height + ')') + 'px;';
    width = 'width:' + Blockly.Python.esp32.getStringFormat('str(' + width + ')') + 'px;';
    text = Blockly.Python.esp32.getStringFormat(text);
    Blockly.Python.esp32.addJavascriptCode('http_onButtonClick', FUNCTIONS_ESP32_MICROCHIP.JAVSCRIPT_ON_BUTTON_CLICK);
    Blockly.Python.esp32.addCssStyle('default_init', FUNCTIONS_ESP32_MICROCHIP.CSS_DEFAULT_INIT);
    return '  <button class="police" name=\'' + id + '\' style="background-color:' + colour + ';' + height + width + '" onclick="http_onButtonClick(\'' + id + '\')">' + text + '</button>' + NEWLINE;
};

// Add a slider on web page
Blockly.Python.network_html_addSlider = function (block) {
    const id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_NONE) || "''";
    let min = Blockly.Python.valueToCode(block, 'MIN', Blockly.Python.ORDER_NONE) || "0";
    let max = Blockly.Python.valueToCode(block, 'MAX', Blockly.Python.ORDER_NONE) || "100";
    const orientation = block.getFieldValue('ORIENT');
    let default_w = "100";
    let default_h = "15";
    if (orientation == 'VERTICAL') {
        default_w = "15";
        default_h = "100";
    }
    const width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_NONE) || default_w;
    const height = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_NONE) || default_h;
    let value = "server.getValueById(" + id + ", default=(" + max + "-" + min + ")/2)";
    const formattedId = Blockly.Python.esp32.getStringFormat(id);
    const slider_width = Blockly.Python.esp32.getStringFormat('str(' + width + ')');
    const slider_height = Blockly.Python.esp32.getStringFormat('str(' + height + ')');
    const slider_selector = Blockly.Python.esp32.getStringFormat('str(1.6*' + height + ')');
    const jsCode = 'var slider_' + formattedId + ' = document.getElementById(\'' + formattedId + '\');' + NEWLINE
        + 'slider_' + formattedId + '.onchange = function () {' + NEWLINE
        + '  http_sendSliderValue(slider_' + formattedId + ', \'' + formattedId + '\');' + NEWLINE
        + "};";
    const cssCode = '.slider_' + formattedId + ' {width:' + slider_width + 'px;height:' + slider_height + 'px;border-radius:' + slider_height + 'px;}' + NEWLINE
        + '.slider_' + formattedId + '::-webkit-slider-thumb {width:' + slider_selector + 'px;height:' + slider_selector + 'px;border-radius:' + slider_selector + 'px;}';
    min = Blockly.Python.esp32.getStringFormat('str(' + min + ')');
    max = Blockly.Python.esp32.getStringFormat('str(' + max + ')');
    value = Blockly.Python.esp32.getStringFormat(value);
    Blockly.Python.esp32.addJavascriptCode('http_sendSliderValue', FUNCTIONS_ESP32_MICROCHIP.JAVSCRIPT_SEND_SLIDER_VALUE);
    Blockly.Python.esp32.addJavascriptCode(id, jsCode);
    Blockly.Python.esp32.addCssStyle('default_init', FUNCTIONS_ESP32_MICROCHIP.CSS_DEFAULT_INIT);
    Blockly.Python.esp32.addCssStyle('default_slider', FUNCTIONS_ESP32_MICROCHIP.CSS_DEFAULT_SLIDER);
    Blockly.Python.esp32.addCssStyle('css_slider_' + id, cssCode);
    const fontSize = Blockly.Python.esp32.getStringFormat('str(0.8*' + height + ')');
    const textMargin = Blockly.Python.esp32.getStringFormat('str(0.15*' + height + ')');
    const code = '  <span class="police" style="color:#c3c3c3;font-size:' + fontSize + 'px;margin-bottom:' + textMargin + 'px;">' + min + '</span>' + NEWLINE
        + '  <input type="range" min=\'' + min + '\' max=\'' + max + '\' value=\'' + value + '\' class="slider slider_' + formattedId + '" id=\'' + formattedId + '\'>' + NEWLINE
        + '  <span class="police" style="color:#c3c3c3;font-size:' + fontSize + 'px;margin-bottom:' + textMargin + 'px;">' + max + '</span>' + NEWLINE
    return code;
};

Blockly.Python.network_html_addSwitch = function (block) {
    const id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_NONE) || "''";
    let size = "1";
    if (block.getInput("SIZE_FIELD")) {
        size = block.getFieldValue("SIZE");
    }
    let value = 'server.updateSwitchState(' + id + ')';
    let colour = "#22b573";
    let colorBlock = block.getInput("COLOR")
    if (colorBlock) {
        colorBlock = colorBlock.connection.targetBlock();
        if (colorBlock) {
            colour = colorBlock.getFieldValue('COLOUR');
        }
    }
    const switch_width = Blockly.Python.esp32.getStringFormat('str(60*(1+0.4*' + size + '))');
    const switch_height = Blockly.Python.esp32.getStringFormat('str(34*(1+0.4*' + size + '))');
    const slider_size = Blockly.Python.esp32.getStringFormat('str(26*(1+0.4*' + size + '))');
    const slider_margin = Blockly.Python.esp32.getStringFormat('str(4*(1+0.4*' + size + '))');
    const formattedId = Blockly.Python.esp32.getStringFormat(id);
    const cssCode = '.switch_' + formattedId + ' {width:' + switch_width + 'px;height:' + switch_height + 'px;}' + NEWLINE
        + '.sw_slider_' + formattedId + ':before {width:' + slider_size + 'px;height:' + slider_size + 'px;left:' + slider_margin + 'px;bottom:' + slider_margin + 'px;}' + NEWLINE
        + 'input:checked + .sw_slider_' + formattedId + ' {background-color:' + colour + ';}' + NEWLINE
        + 'input:checked + .sw_slider_' + formattedId + ':before {transform: translateX(' + slider_size + 'px);}';
    value = Blockly.Python.esp32.getStringFormat(value);
    Blockly.Python.esp32.addJavascriptCode('http_onSwitchToggle', FUNCTIONS_ESP32_MICROCHIP.JAVSCRIPT_ON_SWITCH_TOGGLE);
    Blockly.Python.esp32.addCssStyle('default_switcher', FUNCTIONS_ESP32_MICROCHIP.CSS_DEFAULT_SWITCHER);
    Blockly.Python.esp32.addCssStyle('css_' + id, cssCode);
    const html = '  <label class="switch switch_' + formattedId + '"><input id=\'' + formattedId + '\' onclick="http_onSwitchToggle(' + id + ')" type="checkbox" ' + value + '>' + NEWLINE
        + '  <span class="sw_slider round sw_slider_' + formattedId + '"></span>' + NEWLINE
        + '  </label>' + NEWLINE;
    return html;
};

// Add a gauge in web page
Blockly.Python.network_html_addGauge = function (block) {
    let title = Blockly.Python.valueToCode(block, 'TITLE', Blockly.Python.ORDER_NONE) || "''";
    const value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || "";
    let min = Blockly.Python.valueToCode(block, 'MIN', Blockly.Python.ORDER_NONE) || "0";
    let max = Blockly.Python.valueToCode(block, 'MAX', Blockly.Python.ORDER_NONE) || "100";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TITLE")) {
        title = Blockly.Python.esp32.getStringFormat(title);
    } else {
        title = Blockly.Python.esp32.getStringFormat('str(' + title + ')');
    }
    min = Blockly.Python.esp32.getStringFormat('str(' + min + ')');
    max = Blockly.Python.esp32.getStringFormat('str(' + max + ')');
    const id = randHex();
    const gaugeCss = '.gauge_' + id + ' .semi-circle {background:#3498db;}' + NEWLINE
        + '.gauge_' + id + ' .semi-circle--mask {transform:rotate(20deg) translate3d(0,0,0);}' + NEWLINE;
    Blockly.Python.esp32.addHtmlGaugeValue(id, value);
    Blockly.Python.esp32.addJavascriptCode('var_myGauges', 'var myGauges = Object.create(null);');
    Blockly.Python.esp32.addJavascriptCode('js_setGaugeValue', FUNCTIONS_ESP32_MICROCHIP.JAVASCRIPT_SET_GAUGE_VALUE);
    Blockly.Python.esp32.addJavascriptCode('myGauges_' + id, 'myGauges[\'' + id + '\'] = {min:' + min + ',max:' + max + '}');
    Blockly.Python.esp32.addCssStyle('default_init', FUNCTIONS_ESP32_MICROCHIP.CSS_DEFAULT_INIT);
    Blockly.Python.esp32.addCssStyle('default_gauge', FUNCTIONS_ESP32_MICROCHIP.CSS_GAUGE_STYLE);
    Blockly.Python.esp32.addCssStyle('css_gauge_' + id, gaugeCss);
    const html = '  <div id="' + id + '" class="box gauge_' + id + '">' + NEWLINE
        + '  <h3>' + title + '</h3>' + NEWLINE
        + '  <div class="mask"><div class="semi-circle"></div><div class="semi-circle--mask"></div></div>' + NEWLINE
        + '  <p id="gauge_value">--</p>' + NEWLINE
        + '  </div>' + NEWLINE;
    return html;
};

// Add link on text in web page
Blockly.Python.network_html_addLink = function (block) {
    const text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || "";
    const url = block.getFieldValue('URL');
    let fontSize = Blockly.Python.valueToCode(block, 'SIZE', Blockly.Python.ORDER_NONE) || "";
    let colour = "#666666";
    let colorBlock = block.getInput("COLOR");
    if (colorBlock) {
        colorBlock = colorBlock.connection.targetBlock();
        if (colorBlock) {
            colour = colorBlock.getFieldValue('COLOUR');
        }
    }
    if (fontSize) {
        fontSize = 'font-size:' + Blockly.Python.esp32.getStringFormat('str(' + fontSize + ')') + 'px;';
    }
    Blockly.Python.esp32.addCssStyle('default_init', FUNCTIONS_ESP32_MICROCHIP.CSS_DEFAULT_INIT);
    const formattedText = Blockly.Python.esp32.getStringFormat('str(' + text + ')');
    return '  <a href="' + url + '" style="color:' + colour + ';' + fontSize + '" target="_blank" rel="noopener noreferrer">' + formattedText + '</a>' + NEWLINE;
};

// Add a image in web page
Blockly.Python.network_html_addImage = function (block) {
    let data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_NONE) || "";
    let w = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_NONE) || "59";
    let h = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_NONE) || "66";
    const inputBlock = block.getInput('DATA').connection.targetBlock();
    if (Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) {
        data = Blockly.Python.esp32.getStringFormat(data);
        data = '    <img src="data:image/png;base64, ' + data + '">';
    } else {
        const inputCheck = inputBlock.outputConnection.check_;
        if (inputCheck) {
            if (inputCheck[0] == "Array") {
                data = Blockly.Python.esp32.getStringFormat('str(' + data + ')[2:-3]');
            } else {
                data = Blockly.Python.esp32.getStringFormat('str(' + data + ')');
            }
            data = '    <img src="data:image/png;base64, ' + data + '">';
        } else if (inputBlock.type == 'variables_get') {
            const id = randHex();
            Blockly.Python.esp32.addHtmlImageData(id, data);
            data = '    <img id="' + id + '">';
        }
    }
    if (block.getInput("WIDTH")) {
        if (Blockly.Constants.Utils.isInputTextBlock(block, "WIDTH")) {
            w = Blockly.Python.esp32.getStringFormat(w);
        } else {
            w = Blockly.Python.esp32.getStringFormat('str(' + w + ')');
        }
    } else if (inputBlock.type == 'esp32Cam_getCaptureData') {
        w = "DISPLAY_RESOLUTIONS[CAM_FRAMESIZE][1][0]";
        w = Blockly.Python.esp32.getStringFormat('str(' + w + ')');
    }
    if (block.getInput("HEIGHT")) {
        if (Blockly.Constants.Utils.isInputTextBlock(block, "HEIGHT")) {
            h = Blockly.Python.esp32.getStringFormat(h);
        } else {
            h = Blockly.Python.esp32.getStringFormat('str(' + h + ')');
        }
    } else if (inputBlock.type == 'esp32Cam_getCaptureData') {
        h = "DISPLAY_RESOLUTIONS[CAM_FRAMESIZE][1][1]";
        h = Blockly.Python.esp32.getStringFormat('str(' + h + ')');
    }
    Blockly.Python.esp32.addCssStyle('default_init', FUNCTIONS_ESP32_MICROCHIP.CSS_DEFAULT_INIT);
    Blockly.Python.esp32.addCssStyle('default_image', FUNCTIONS_ESP32_MICROCHIP.CSS_IMAGE_STYLE);
    const html = '  <div class="frame" style="width:' + w + 'px ; height:' + h + 'px;">' + NEWLINE
        + data + NEWLINE
        + '  </div>' + NEWLINE;
    return html;
};

// Add a stream in web page
Blockly.Python.network_html_addStream = function (block) {
    const data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_NONE) || "";
    let w = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_NONE) || "640";
    let h = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_NONE) || "480";
    if (block.getInput("WIDTH")) {
        if (Blockly.Constants.Utils.isInputTextBlock(block, "WIDTH")) {
            w = Blockly.Python.esp32.getStringFormat(w);
        } else {
            w = Blockly.Python.esp32.getStringFormat('str(' + w + ')');
        }
    } else {
        w = "DISPLAY_RESOLUTIONS[CAM_FRAMESIZE][1][0]";
        w = Blockly.Python.esp32.getStringFormat('str(' + w + ')');
    }
    if (block.getInput("HEIGHT")) {
        if (Blockly.Constants.Utils.isInputTextBlock(block, "HEIGHT")) {
            h = Blockly.Python.esp32.getStringFormat(h);
        } else {
            h = Blockly.Python.esp32.getStringFormat('str(' + h + ')');
        }
    } else {
        h = "DISPLAY_RESOLUTIONS[CAM_FRAMESIZE][1][1]";
        h = Blockly.Python.esp32.getStringFormat('str(' + h + ')');
    }
    const id = randHex();
    Blockly.Python.esp32.addHtmlImageData(id, data);
    Blockly.Python.esp32.addCssStyle('default_init', FUNCTIONS_ESP32_MICROCHIP.CSS_DEFAULT_INIT);
    Blockly.Python.esp32.addCssStyle('default_image', FUNCTIONS_ESP32_MICROCHIP.CSS_IMAGE_STYLE);
    const html = '  <div class="frame" style="width:' + w + 'px ; height:' + h + 'px;">' + NEWLINE
        + '    <img id="' + id + '">' + NEWLINE
        + '  </div>' + NEWLINE;
    return html;
};

// Add tag DIV|FORM|CENTER
Blockly.Python.network_HTML_Tags = function (block) {
    const tag = block.getFieldValue("TAG");
    const branchCode = Blockly.Python.statementToCode(block, "IN") || "";
    return '  <' + tag + '>' + NEWLINE + branchCode + '</' + tag + '>' + NEWLINE;
};

// Add tags B|I|INS|MARK|DEL|SMALL
Blockly.Python.network_HTML_formatText = function (block) {
    const text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || "";
    const tag = block.getFieldValue("TAG");
    const formattedText = Blockly.Python.esp32.getStringFormat('str(' + text + ')')
    const taggedText = '"""<' + tag + '>' + formattedText + '</' + tag + '>"""';
    return [taggedText, Blockly.Python.ORDER_ATOMIC];
};

// Add tag newline
Blockly.Python.network_HTML_newline = function () {
    return '  <br>' + NEWLINE;
};

// Add html code
Blockly.Python.network_HTML_add = function (block) {
    const html = Blockly.Python.valueToCode(block, 'HTML', Blockly.Python.ORDER_NONE) || "";
    return '  ' + html.substr(1, html.length - 2) + NEWLINE;
};

// Add span with HTML symbol
Blockly.Python.network_HTML_addSymbol = function (block) {
    let symbol = Blockly.Python.valueToCode(block, 'SYMBOL', Blockly.Python.ORDER_NONE) || "";
    symbol = symbol.substr(1, symbol.length - 2);
    let size = Blockly.Python.valueToCode(block, 'SIZE', Blockly.Python.ORDER_NONE) || "0";
    size = size.substr(1, size.length - 2);
    const encoding = block.getFieldValue("ENCODING");
    if (symbol.charAt(symbol.length - 1) !== ';') {
        symbol = symbol + ';';
    }
    return TAB + '<span style="font-size:' + size + '">' + encoding +  symbol + '</span>' + NEWLINE;
};

// Web page data

// Server - get button state
Blockly.Python.network_server_getButtonState = function (block) {
    const id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_NONE) || "";
    return ["int(server.getValueById(" + id + ", isBoolean=True))", Blockly.Python.ORDER_ATOMIC];
};

// Server - get button state
Blockly.Python.network_server_getSliderValue = function (block) {
    const id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_NONE);
    const formattedId = Blockly.Python.esp32.getStringFormat(id);
    const jsCode = 'var slider_' + formattedId + ' = document.getElementById(\'' + formattedId + '\');' + NEWLINE
        + 'http_sendSliderValue(slider_' + formattedId + ', \'' + formattedId + '\');' + NEWLINE
        + 'slider_' + formattedId + '.onchange = function () {' + NEWLINE
        + '  http_sendSliderValue(slider_' + formattedId + ', \'' + formattedId + '\');' + NEWLINE
        + "};";
    Blockly.Python.esp32.addJavascriptCode('http_sendSliderValue', FUNCTIONS_ESP32_MICROCHIP.JAVSCRIPT_SEND_SLIDER_VALUE);
    Blockly.Python.esp32.addJavascriptCode(id, jsCode);
    return ["int(float(server.getValueById(" + id + ")))", Blockly.Python.ORDER_ATOMIC];
};

// Server - get button state
Blockly.Python.network_server_getSwitchValue = function (block) {
    const id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_NONE);
    return ["int(server.getValueById(" + id + "))", Blockly.Python.ORDER_ATOMIC];
};

// HTTP

Blockly.Python.network_connectStation_simple = Blockly.Python.network_connectStation;

// Get HTTP request
Blockly.Python.network_getHTTPRequest = function (block) {
    const method = block.getFieldValue("METHOD");
    const url = Blockly.Python.valueToCode(block, 'URL', Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addImport('urequests', IMPORT_UREQUESTS);
    return ["urequests.request(method='" + method + "', url=" + url.replace(/'/gi, '"') + ").text", Blockly.Python.ORDER_ATOMIC];
};

// ThingSpeak - Send Data
Blockly.Python.network_thingspeak_sendData = function (block) {
    Blockly.Python.addImport('urequests', IMPORT_UREQUESTS);
    Blockly.Python.addFunction('request_thingspeak_write', FUNCTIONS_ESP32_MICROCHIP.REQUEST_THINGSPEAK_WRITE);
    const api_key = block.getFieldValue("API_KEY");
    const elements = new Array();
    for (var i = 0; i < block.itemCount_; i++) {
        const fieldData = Blockly.Python.valueToCode(block, "ADD" + i, Blockly.Python.ORDER_NONE);
        if (fieldData) elements.push(JSON.parse(fieldData));
    }
    let dict = "thingspeak_data = {" + NEWLINE;
    for (var i = 0; i < elements.length; i++) {
        if (i > 0) dict += "," + NEWLINE;
        dict += "  '" + elements[i][0] + "': " + elements[i][1];
    }
    dict += NEWLINE + "}";
    return dict + NEWLINE + "request_thingspeak_write('" + api_key.trim() + "', thingspeak_data)" + NEWLINE;
};

// ThingSpeak - Send data _ field
Blockly.Python.network_thingspeak_sendData_field = function (block) {
    const field = block.getFieldValue("FIELD");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    return ["[\"field" + field + "\", \"" + value + "\"]", Blockly.Python.ORDER_ATOMIC];
};

// ThingSpeak - Read data
Blockly.Python.request_thingspeak_readFeeds = function (block) {
    Blockly.Python.addImport('urequests', IMPORT_UREQUESTS);
    Blockly.Python.addFunction('request_thingspeak_write', FUNCTIONS_ESP32_MICROCHIP.REQUEST_THINGSPEAK_READ_FIELD);
    const channelID = Blockly.Python.valueToCode(block, "CHANNEL_ID", Blockly.Python.ORDER_NONE) || "''";
    const api_key = Blockly.Python.valueToCode(block, "API_KEY", Blockly.Python.ORDER_NONE) || "''";
    const fieldNumber = Blockly.Python.valueToCode(block, "FIELD", Blockly.Python.ORDER_NONE) || "None";
    return ["request_thingspeak_readFeeds(" + channelID + ", " + api_key + ", " + fieldNumber + ")", Blockly.Python.ORDER_ATOMIC]
};

// UMAIL

// uMail - SMTP
Blockly.Python.network_umail_smtp = function (block) {
    Blockly.Python.addImport('umail', IMPORT_ESP32_UMAIL);
    Blockly.Python.addInit('smtp_config', 'smtp_config = {}');
    const SMTP = {
        'gmail': {
            server: 'smtp.gmail.com',
            tls_port: 587,
            port: 465 // ssl
        },
        'outlook': {
            server: 'smtp.office365.com',
            port: 587
        },
        'hotmail-live': {
            server: 'smtp.live.com',
            port: 587
        }
    };
    const smtp_server = block.getFieldValue("SMTP");
    return `smtp_config['type'] = ['${SMTP[smtp_server].server}', ${SMTP[smtp_server].port}]` + NEWLINE;
};

// uMail - setup
Blockly.Python.network_umail_setup = function (block) {
    Blockly.Python.addImport('umail', IMPORT_ESP32_UMAIL);
    Blockly.Python.addInit('smtp_config', 'smtp_config = {}');
    const login = Blockly.Python.valueToCode(block, 'MAIL', Blockly.Python.ORDER_NONE) || "''";
    const password = Blockly.Python.valueToCode(block, 'PASSWORD', Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addConstant('umail-user-mail', `USER_MAIL = ${login}`);
    return `smtp_config['user_mail'] = USER_MAIL${NEWLINE}smtp_config['password'] = ${password}` + NEWLINE;
};

// uMail - to
Blockly.Python.network_umail_to = function (block) {
    Blockly.Python.addImport('umail', IMPORT_ESP32_UMAIL);
    Blockly.Python.addInit('smtp_config', 'smtp_config = {}');
    const mail = Blockly.Python.valueToCode(block, 'MAIL', Blockly.Python.ORDER_NONE) || "''";
    const subject = Blockly.Python.valueToCode(block, 'SUBJECT', Blockly.Python.ORDER_NONE) || "''";
    return `smtp_config['recipient'] = ${mail}${NEWLINE}smtp_config['subject'] = ${subject}` + NEWLINE;
};

// uMail - write sender
Blockly.Python.network_umail_write_sender = function (block) {
    Blockly.Python.addImport('umail', IMPORT_ESP32_UMAIL);
    Blockly.Python.addInit('smtp_config', 'smtp_config = {}');
    const name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE) || "''";
    return `smtp_config['sender'] = ${name} + '<' + USER_MAIL + '>'` + NEWLINE;
};

// uMail - write
Blockly.Python.network_umail_write = function (block) {
    Blockly.Python.addImport('umail', IMPORT_ESP32_UMAIL);
    Blockly.Python.addFunction('umail_sendMail', FUNCTIONS_ESP32_MICROCHIP.UMAIL_SEND_MAIL);
    const msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_NONE) || "''";
    return "umail_sendMail(smtp_config, " + msg + ")" + NEWLINE;
};

// uMail - send image
Blockly.Python.network_umail_send_image = function (block) {
    Blockly.Python.addImport('umail', IMPORT_ESP32_UMAIL);
    Blockly.Python.addFunction('umail_sendMail', FUNCTIONS_ESP32_MICROCHIP.UMAIL_SEND_MAIL);
    const img = Blockly.Python.valueToCode(block, 'IMG', Blockly.Python.ORDER_NONE) || "''";
    return "umail_sendMail(smtp_config, " + img + ", True)" + NEWLINE;
};

// uMail - quit
Blockly.Python.network_umail_quit = function () {
    Blockly.Python.addImport('umail', IMPORT_ESP32_UMAIL);
    return `smtp.quit()` + NEWLINE;
};

// MQTT

Blockly.Python.network_mqtt_connectWithAuth = function (block) {
    Blockly.Python.addImport('vitta_mqtt', IMPORT_VITTA_MQTT);
    const callbackExist = function (func, args) {
        args = (args ? args.join(',') : '');
        const eventFunction = "def " + func + "(" + args + "):" + NEWLINE + Blockly.Python.INDENT + "pass" + NEWLINE;
        Blockly.Python.addFunction(func, eventFunction);
    };
    callbackExist('mqtt_on_disconnected_cb');
    callbackExist('mqtt_on_connected_cb');
    callbackExist('mqtt_onMessageReceived_cb', ['topic', 'message']);
    const broker = Blockly.Python.valueToCode(block, "BROKER", Blockly.Python.ORDER_NONE) || "''";
    const username = Blockly.Python.valueToCode(block, "USERNAME", Blockly.Python.ORDER_NONE) || "''";
    const password = Blockly.Python.valueToCode(block, "PASSWORD", Blockly.Python.ORDER_NONE) || "''";
    let port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_NONE) || "";
    Blockly.Python.addConstant('BROKER_IP', 'BROKER_IP = ' + broker);
    if (port) {
        Blockly.Python.addConstant('BROKER_PORT', 'BROKER_PORT = ' + port);
        port = ", port = BROKER_PORT";
    }
    Blockly.Python.addPowerOn('mqttclient', "mqttclient = SimpleMQTTClient(BROKER_IP, " + username + ", " + password + port + ", on_message=mqtt_onMessageReceived_cb, on_connect=mqtt_on_connected_cb, on_disconnect=mqtt_on_disconnected_cb)");
    return "mqttclient.connectToBroker()" + NEWLINE;
};

Blockly.Python.network_mqtt_subscribeTopic = function (block) {
    const topic = Blockly.Python.valueToCode(block, "TOPIC", Blockly.Python.ORDER_NONE) || "''";
    return "mqttclient.subscribeTopic(" + topic + ")" + NEWLINE;
};

Blockly.Python.network_mqtt_publishValue = function (block) {
    const topic = Blockly.Python.valueToCode(block, "TOPIC", Blockly.Python.ORDER_NONE) || "''";
    let message = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "''";
    if (!Blockly.Constants.Utils.isInputTextBlock(block, 'VALUE')) {
        message = "str(" + message + ")";
    }
    return "mqttclient.publishValue(" + topic + ", " + message + ")" + NEWLINE;
};

Blockly.Python.network_mqtt_onMessageReceived = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || "";
    if (branchCode) {
        const variable = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
        const eventFunction = "def mqtt_onMessageReceived_cb(topic, " + variable + "):" + NEWLINE + branchCode;
        Blockly.Python.addFunction('mqtt_onMessageReceived_cb', eventFunction, true);
        block.workspace.createVariable('topic');
    }
    return "";
};

Blockly.Python.network_mqtt_ifTopicIs = function (block) {
    let n = 0;
    let code = "";
    if (Blockly.Python.STATEMENT_PREFIX) {
        // Automatic prefix insertion is switched off for this block.  Add manually.
        code += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, block);
    }
    do {
        const topic = Blockly.Python.valueToCode(block, "TOPIC" + n, Blockly.Python.ORDER_NONE) || "''";
        const conditionCode = "topic is " + topic;
        let branchCode = Blockly.Python.statementToCode(block, "DO" + n) || Blockly.Python.PASS;
        if (Blockly.Python.STATEMENT_SUFFIX) {
            branchCode = Blockly.Python.prefixLines(
                Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
                Blockly.Python.INDENT) + branchCode;
        }
        code += (n == 0 ? "if " : "elif ") + conditionCode + ":" + NEWLINE + branchCode;
        ++n;
    } while (block.getInput("TOPIC" + n));
    return code;
};

Blockly.Python.network_mqtt_onConnect = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || "";
    if (branchCode) {
        const eventFunction = "def mqtt_onConnected_cb():" + NEWLINE + branchCode;
        Blockly.Python.addFunction('mqtt_onConnected_cb', eventFunction, true);
    }
    return "";
};

Blockly.Python.network_mqtt_disconnect = function () {
    return "mqttclient.disconnectFromBroker()" + NEWLINE;
};

Blockly.Python.network_mqtt_onDisconnect = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || "";
    if (branchCode) {
        const eventFunction = "def mqtt_onDisconnected_cb():" + NEWLINE + branchCode;
        Blockly.Python.addFunction('mqtt_onDisconnected_cb', eventFunction, true);
    }
    return "";
};

// Additional functions for generators

Blockly.Python.esp32 = Object.create(null);

Blockly.Python.esp32.writeJavascriptFile = function (data) {
    data.pop();
    const jsScriptWriter = "f = open('vitta_script.js', 'w')" + NEWLINE
        + 'javascript_code = """' + NEWLINE
        + data.join("\n")
        + '"""' + NEWLINE
        + 'f.write(javascript_code)' + NEWLINE
        + 'f.close()' + NEWLINE
        + 'javascript_code = None' + NEWLINE
    return jsScriptWriter;
};

Blockly.Python.esp32.writeCssFile = function (data) {
    data.pop();
    const cssStyleWriter = "f = open('vitta_style.css', 'w')" + NEWLINE
        + 'css_style_code = """' + NEWLINE
        + data.join("\n")
        + '"""' + NEWLINE
        + 'f.write(css_style_code)' + NEWLINE
        + 'f.close()' + NEWLINE
        + 'css_style_code = None' + NEWLINE
    return cssStyleWriter;
};

Blockly.Python.esp32.getStringFormat = function (value) {
    return '""" + ' + value + ' + """';
};

Blockly.Python.esp32.getVariablesIncludedInHtml = function (block) {
    const var_gets = block.workspace.getBlocksByType('variables_get');
    let html_var_names = new Array()
    for (let id in var_gets) {
        let blockGet = var_gets[id];
        while (true) {
            if (blockGet.parentBlock_ !== null) {
                if (Blockly.Constants.HTML_BLOCKS.includes(blockGet.getParent().type)) {
                    const name = Blockly.Python.nameDB_.getName(var_gets[id].getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
                    if (!html_var_names.includes(name)) {
                        html_var_names.push(name);
                    }
                    break;
                } else {
                    blockGet = blockGet.getParent();
                }
            } else {
                break;
            }
        }
    }
    return html_var_names;
};

Blockly.Python.esp32.addHtmlSpanValue = function (id, value) {
    if (Blockly.Python.htmlSpans_[id] === undefined) {
        Blockly.Python.htmlSpans_[id] = value;
    }
};

Blockly.Python.esp32.addHtmlGaugeValue = function (id, value) {
    if (Blockly.Python.htmlGauges_[id] === undefined) {
        Blockly.Python.htmlGauges_[id] = value;
    }
};

Blockly.Python.esp32.addHtmlImageData = function (id, value) {
    if (Blockly.Python.htmlImages_[id] === undefined) {
        Blockly.Python.htmlImages_[id] = value;
    }
};

/**
 * Adds a string of "jsCode" code to be added after initializations.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} jsCodeTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Python.esp32.addJavascriptCode = function (jsCodeTag, code) {
    if (Blockly.Python.jsCodes_[jsCodeTag] === undefined) {
        Blockly.Python.jsCodes_[jsCodeTag] = code;
    }
};

/**
 * Adds a string of "cssStyle" code to be added after initializations.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} cssCodeTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Python.esp32.addCssStyle = function (cssCodeTag, code) {
    if (Blockly.Python.cssStyles_[cssCodeTag] === undefined) {
        Blockly.Python.cssStyles_[cssCodeTag] = code;
    }
};

Blockly.Python.esp32.MODE_SERVER = 'server';
Blockly.Python.esp32.MODE_CLIENT = 'client';
Blockly.Python.esp32.MODE_NORMAL = 'normal';

Blockly.Python.esp32.getProgrammingMode = function () {
    const server_types = [
        'network_server_sendData',
        'network_server_getClientData',
        'network_server_getClientDataParam',
        'network_server_getClientIp',
        'network_server_sendWebPage'
    ];
    const client_types = [
        'network_client_sendData',
        'network_client_getServerData'
    ];
    const checkBlocks = function (blockTypes, mode) {
        for (i in blockTypes) {
            const blocks = Blockly.getMainWorkspace().getBlocksByType(blockTypes[i]);
            if (Object.keys(blocks).length > 0) {
                for (j in blocks) {
                    let block = blocks[j]
                    while (true) {
                        if (block.parentBlock_ !== null) {
                            if (block.getParent().type == 'scratch_forever' || block.getParent().type == 'forever') {
                                return { 'mode': mode, 'loop': true };
                            } else if (block.getParent().type == 'scratch_on_start' || block.getParent().type == 'on_start') {
                                return { 'mode': mode, 'loop': false };
                            } else {
                                block = block.getParent();
                            }
                        } else break;
                    }
                }
            }
        }
    };
    let mode = checkBlocks(server_types, Blockly.Python.esp32.MODE_SERVER);
    if (mode === undefined) {
        mode = checkBlocks(client_types, Blockly.Python.esp32.MODE_CLIENT);
    }
    if (mode === undefined) {
        mode = { 'mode': Blockly.Python.esp32.MODE_NORMAL, 'loop': false };
    }
    return mode;
};
