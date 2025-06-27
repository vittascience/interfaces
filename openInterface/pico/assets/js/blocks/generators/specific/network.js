Blockly.Python.network_connectStation = function (block) {
    const ssid = Blockly.Python.valueToCode(block, "SSID", Blockly.Python.ORDER_NONE) || "''";
    const pwd =  Blockly.Python.valueToCode(block, "PASSWORD", Blockly.Python.ORDER_NONE) || "''";
    let ip = Blockly.Python.valueToCode(block, "IP", Blockly.Python.ORDER_NONE) || "''";
    let mask = Blockly.Python.valueToCode(block, "MASK", Blockly.Python.ORDER_NONE) || "";
    let gateway = Blockly.Python.valueToCode(block, "GATEWAY", Blockly.Python.ORDER_NONE) || "";
    // const dns = Blockly.Python.valueToCode(block, "DNS", Blockly.Python.ORDER_NONE) || "";
    Blockly.Python.addImport('network', IMPORT_NETWORK);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('pico_ip_address', "PICO_IP = " + ip);
    Blockly.Python.addInit('station', 'station = None');
    Blockly.Python.addInit('accessPoint', 'accessPoint = None');
    Blockly.Python.addFunction('connect_station', FUNCTIONS_PICO.DEF_WIFI_CONNECT_STATION);
    Blockly.Python.addFunction('disconnect_station', FUNCTIONS_PICO.DEF_WIFI_DISCONNECT_STATION);
    if (ip) {
        ip = ", ip=PICO_IP";
    }
    if (mask) {
        mask = ", mask=" + mask;
    }
    if (gateway) {
        gateway = ", gateway=" + gateway;
    }
    let code = "connect_station(ssid=" + ssid + ", password=" + pwd + ip + mask + gateway + ")" + NEWLINE;
    if (Blockly.Python.esp32.getProgrammingMode().mode == Blockly.Python.esp32.MODE_SERVER) {
        Blockly.Python.addImport('vitta_server', IMPORT_VITTA_SERVER);
        Blockly.Python.addImport('gc', IMPORT_GC);
        // Blockly.Python.addImport('esp', IMPORT_ESP);
        Blockly.Python.addConstant('server_port', 'SERVER_PORT = 80');
        // Blockly.Python.addConstant('', 'esp.osdebug(None)\ngc.collect()');
        Blockly.Python.addInit('server', 'server = SERVER()');
        code += "server.start(sta=station, ip=PICO_IP, port=SERVER_PORT)" + NEWLINE;
    } else if (Blockly.Python.esp32.getProgrammingMode().mode == Blockly.Python.esp32.MODE_CLIENT) {
        Blockly.Python.addImport('vitta_client', IMPORT_VITTA_CLIENT);
        Blockly.Python.addConstant('server_port', 'SERVER_PORT = 80');
        Blockly.Python.addInit('client', 'client = CLIENT(port=SERVER_PORT)')
        code += "client.init(sta=station, ap=accessPoint)" + NEWLINE;
    }
    return code;
    // return 'null'
};

// access point
Blockly.Python.network_configureAccessPoint = function (block) {
    let essid = Blockly.Python.valueToCode(block, "ESSID", Blockly.Python.ORDER_NONE) || "''";
    let ip = Blockly.Python.valueToCode(block, "IP", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addImport('network', IMPORT_NETWORK);
    Blockly.Python.addConstant('pico_ip_address', "PICO_IP = " + ip);
    Blockly.Python.addInit('station', 'station = None');
    Blockly.Python.addInit('accessPoint', 'accessPoint = None');
    Blockly.Python.addFunction('configure_access_point', FUNCTIONS_PICO.DEF_WIFI_CONFIGURE_ACCESS_POINT);
    let code = "accessPoint = configure_access_point(ssid=" + essid + ", ip=PICO_IP)" + NEWLINE;
    if (Blockly.Python.esp32.getProgrammingMode().mode == Blockly.Python.esp32.MODE_SERVER) {
        Blockly.Python.addImport('vitta_server', IMPORT_VITTA_SERVER);
        Blockly.Python.addConstant('server_port', 'SERVER_PORT = 80');
        Blockly.Python.addInit('server', 'server = SERVER()');
        code += "server.start(sta=None, ap=accessPoint, ip=PICO_IP, port=SERVER_PORT)" + NEWLINE;
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
    Blockly.Python.addFunction('disconnect_station', FUNCTIONS_PICO.DEF_WIFI_DISCONNECT_STATION);
    return "disconnect_station()" + NEWLINE;
};

// Wifi - Is station connected ?

Blockly.Python.network_isStationConnected = function () {
    Blockly.Python.addImport('network', IMPORT_NETWORK);
    Blockly.Python.addInit('station', 'station = network.WLAN(network.STA_IF)');
    return ["station.isconnected()", Blockly.Python.ORDER_ATOMIC];
};


// Wifi - Scan network profiles
Blockly.Python.network_scanNetworkProfiles = function () {
    Blockly.Python.addImport('network', IMPORT_NETWORK);
    Blockly.Python.addInit('station', 'station = network.WLAN(network.STA_IF)');
    return ["station.scan()", Blockly.Python.ORDER_ATOMIC];
};

// Server

// Server - send data to client
Blockly.Python.network_server_sendData = function (block) {
    let data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_NONE) || "";
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

// Server - get client IP
Blockly.Python.network_server_getClientIp = function () {
    return ["server.getClientIp()", Blockly.Python.ORDER_ATOMIC];
};

// Server - change port
Blockly.Python.network_changeServerPort = function (block) {
    const port = Blockly.Python.valueToCode(block, 'PORT', Blockly.Python.ORDER_NONE) || "";
    Blockly.Python.addConstant('server_port', 'SERVER_PORT = ' + port);
    return "";
};

// Server - send web page
// replace special chars by html chars (avoid suppression in microPythonRepl)
const replaceSpecialChars = function (text) {
    return text
      .replace(/à/g, '&agrave;').replace(/á/g, '&aacute;').replace(/â/g, '&acirc;').replace(/ã/g, '&atilde;').replace(/ä/g, '&auml;')
      .replace(/è/g, '&egrave;').replace(/é/g, '&eacute;').replace(/ê/g, '&ecirc;').replace(/ë/g, '&euml;')
      .replace(/ì/g, '&igrave;').replace(/í/g, '&iacute;').replace(/î/g, '&icirc;').replace(/ï/g, '&iuml;')
      .replace(/ò/g, '&ograve;').replace(/ó/g, '&oacute;').replace(/ô/g, '&ocirc;').replace(/õ/g, '&otilde;').replace(/ö/g, '&ouml;')
      .replace(/ù/g, '&ugrave;').replace(/ú/g, '&uacute;').replace(/û/g, '&ucirc;').replace(/ü/g, '&uuml;')
      .replace(/À/g, '&Agrave;').replace(/Á/g, '&Aacute;').replace(/Â/g, '&Acirc;').replace(/Ã/g, '&Atilde;').replace(/Ä/g, '&Auml;')
      .replace(/È/g, '&Egrave;').replace(/É/g, '&Eacute;').replace(/Ê/g, '&Ecirc;').replace(/Ë/g, '&Euml;')
      .replace(/Ì/g, '&Igrave;').replace(/Í/g, '&Iacute;').replace(/Î/g, '&Icirc;').replace(/Ï/g, '&Iuml;')
      .replace(/Ò/g, '&Ograve;').replace(/Ó/g, '&Oacute;').replace(/Ô/g, '&Ocirc;').replace(/Õ/g, '&Otilde;').replace(/Ö/g, '&Ouml;')
      .replace(/Ù/g, '&Ugrave;').replace(/Ú/g, '&Uacute;').replace(/Û/g, '&Ucirc;').replace(/Ü/g, '&Uuml;');
  }
  

Blockly.Python.network_server_sendWebPage = function (block) {
    let branchCode = Blockly.Python.statementToCode(block, "BODY") || "";
    branchCode = replaceSpecialChars(branchCode);
    let htmlPageVar = 'server.html_page = """' + NEWLINE
        + '  <!DOCTYPE HTML>' + NEWLINE
        + "  <html>" + NEWLINE
        + "  <head>" + NEWLINE
        + ' <meta charset="UTF-8" />' + NEWLINE
        + '  <meta name="viewport" content="width=device-width, initial-scale=1">' + NEWLINE
        + "  </head>" + NEWLINE
        + "  <body>" + NEWLINE
        + branchCode
        + "  </body>" + NEWLINE
        + '  </html>"""' + NEWLINE;
    let html_vars = Blockly.Python.esp32.getVariablesIncludedInHtml(block);
    let code = htmlPageVar + NEWLINE;
    if (html_vars.length > 0) {
        code += 'server.sendHtmlPage(True)' + NEWLINE;
        let htmlVarCode =  'html_variables = {' + NEWLINE;
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
        Blockly.Python.esp32.addJavascriptCode('js_requestVariablesFromServer', FUNCTIONS_PICO.JAVASCRIPT_REQUEST_VARIABLES_FROM_SERVER);
    } else {
        code += 'server.sendHtmlPage(False)' + NEWLINE;
    }
    return code;
};



// Client

// Client - send data to server
Blockly.Python.network_client_sendData = function (block) {
    let data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_NONE) || "";
    let ip = Blockly.Python.valueToCode(block, 'IP', Blockly.Python.ORDER_NONE) || "''";
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
    Blockly.Python.esp32.addCssStyle('default_init', FUNCTIONS_PICO.CSS_DEFAULT_INIT);
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
    Blockly.Python.esp32.addCssStyle('default_init', FUNCTIONS_PICO.CSS_DEFAULT_INIT);
    const formattedText = Blockly.Python.esp32.getStringFormat('str(' + text + ')');
    const html_vars = Blockly.Python.esp32.getVariablesIncludedInHtml(block);
    if (html_vars.length > 0) {
        const id = Blockly.utils.genUid().replace(/[\[\]/{}:;#%=\(\)*+?\\^$|<>&"'~,!.]/g, "l");
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
    Blockly.Python.esp32.addJavascriptCode('http_onButtonClick', FUNCTIONS_PICO.JAVSCRIPT_ON_BUTTON_CLICK);
    Blockly.Python.esp32.addCssStyle('default_init', FUNCTIONS_PICO.CSS_DEFAULT_INIT);
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
    Blockly.Python.esp32.addJavascriptCode('http_sendSliderValue', FUNCTIONS_PICO.JAVSCRIPT_SEND_SLIDER_VALUE);
    Blockly.Python.esp32.addJavascriptCode(id, jsCode);
    Blockly.Python.esp32.addCssStyle('default_init', FUNCTIONS_PICO.CSS_DEFAULT_INIT);
    Blockly.Python.esp32.addCssStyle('default_slider', FUNCTIONS_PICO.CSS_DEFAULT_SLIDER);
    Blockly.Python.esp32.addCssStyle('css_slider_' + id, cssCode);
    const fontSize = Blockly.Python.esp32.getStringFormat('str(0.8*' + height + ')');
    const textMargin = Blockly.Python.esp32.getStringFormat('str(0.15*' + height + ')');
    const code = '  <span class="police" style="color:#c3c3c3;font-size:' + fontSize + 'px;margin-bottom:' + textMargin + 'px;">' + min + '</span>' + NEWLINE
        + '  <input type="range" min=\'' + min + '\' max=\'' + max + '\' value=\'' + value + '\' class="slider slider_' + formattedId + '" id=\'' + formattedId + '\'>' + NEWLINE
        + '  <span class="police" style="color:#c3c3c3;font-size:' + fontSize + 'px;margin-bottom:' + textMargin + 'px;">' + max + '</span>' + NEWLINE
    return code;
};

Blockly.Python.network_html_addSwitch = function (block) {
    let id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_NONE) || "''";
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
    let switch_width = Blockly.Python.esp32.getStringFormat('str(60*(1+0.4*' + size + '))');
    let switch_height = Blockly.Python.esp32.getStringFormat('str(34*(1+0.4*' + size + '))');
    let slider_size = Blockly.Python.esp32.getStringFormat('str(26*(1+0.4*' + size + '))');
    let slider_margin = Blockly.Python.esp32.getStringFormat('str(4*(1+0.4*' + size + '))');
    let formattedId = Blockly.Python.esp32.getStringFormat(id);
    let cssCode = '.switch_' + formattedId + ' {width:' + switch_width + 'px;height:' + switch_height + 'px;}' + NEWLINE
        + '.sw_slider_' + formattedId + ':before {width:' + slider_size + 'px;height:' + slider_size + 'px;left:' + slider_margin + 'px;bottom:' + slider_margin + 'px;}' + NEWLINE
        + 'input:checked + .sw_slider_' + formattedId + ' {background-color:' + colour + ';}' + NEWLINE
        + 'input:checked + .sw_slider_' + formattedId + ':before {transform: translateX(' + slider_size + 'px);}';
    value = Blockly.Python.esp32.getStringFormat(value);
    Blockly.Python.esp32.addJavascriptCode('http_onSwitchToggle', FUNCTIONS_PICO.JAVSCRIPT_ON_SWITCH_TOGGLE);
    Blockly.Python.esp32.addCssStyle('default_switcher', FUNCTIONS_PICO.CSS_DEFAULT_SWITCHER);
    Blockly.Python.esp32.addCssStyle('css_' + id, cssCode);
    let html = '  <label class="switch switch_' + formattedId + '"><input id=\'' + formattedId + '\' onclick="http_onSwitchToggle(' + id + ')" type="checkbox" ' + value + '>' + NEWLINE
        + '  <span class="sw_slider round sw_slider_' + formattedId + '"></span>' + NEWLINE
        + '  </label>' + NEWLINE; 
    return html;
};

// Add a gauge in web page
Blockly.Python.network_html_addGauge = function (block) {
    let title = Blockly.Python.valueToCode(block, 'TITLE', Blockly.Python.ORDER_NONE) || "''";
    let value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || "";
    let min = Blockly.Python.valueToCode(block, 'MIN', Blockly.Python.ORDER_NONE) || "0";
    let max = Blockly.Python.valueToCode(block, 'MAX', Blockly.Python.ORDER_NONE) || "100";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TITLE")) {
        title = Blockly.Python.esp32.getStringFormat(title);
    } else {
        title = Blockly.Python.esp32.getStringFormat('str(' + title + ')');
    }
    min = Blockly.Python.esp32.getStringFormat('str(' + min + ')');
    max = Blockly.Python.esp32.getStringFormat('str(' + max + ')');
    const id = Blockly.utils.genUid().replace(/[\[\]/{}:;#%=\(\)*+?\\^$|<>&"'~,!.]/g, "l");
    const gaugeCss = '.gauge_' + id + ' .semi-circle {background:#3498db;}' + NEWLINE
        + '.gauge_' + id + ' .semi-circle--mask {transform:rotate(20deg) translate3d(0,0,0);}' + NEWLINE;
    Blockly.Python.esp32.addHtmlGaugeValue(id, value);
    Blockly.Python.esp32.addJavascriptCode('var_myGauges', 'var myGauges = Object.create(null);');
    Blockly.Python.esp32.addJavascriptCode('js_setGaugeValue', FUNCTIONS_PICO.JAVASCRIPT_SET_GAUGE_VALUE);
    Blockly.Python.esp32.addJavascriptCode('myGauges_' + id, 'myGauges[\'' + id + '\'] = {min:' + min + ',max:' + max + '}');
    Blockly.Python.esp32.addCssStyle('default_init', FUNCTIONS_PICO.CSS_DEFAULT_INIT);
    Blockly.Python.esp32.addCssStyle('default_gauge', FUNCTIONS_PICO.CSS_GAUGE_STYLE);
    Blockly.Python.esp32.addCssStyle('css_gauge_' + id, gaugeCss);
    const html = '  <div id="' + id + '" class="box gauge_' + id + '">' + NEWLINE
        + '  <h3>' + title + '</h3>' + NEWLINE
        + '  <div class="mask"><div class="semi-circle"></div><div class="semi-circle--mask"></div></div>' + NEWLINE
        + '  <p id="gauge_value">--</p>' + NEWLINE
        + '  </div>' + NEWLINE;
    return html;
};

// Add tag DIV|FORM|CENTER
Blockly.Python.network_HTML_Tags = function (block) {
    let balise = block.getFieldValue("TAG");
    var branchCode = Blockly.Python.statementToCode(block, "IN") || "";
    return '  <' + balise + '>' + NEWLINE + branchCode + '</' + balise + '>' + NEWLINE;
};

// Web page data

// Server - get button state
Blockly.Python.network_server_getButtonState = function (block) {
    let id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_NONE);
    return ["int(server.getValueById(" + id + ", isBoolean=True))", Blockly.Python.ORDER_ATOMIC];
};

// Server - get button state
Blockly.Python.network_server_getSliderValue = function (block) {
    let id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_NONE);
    formattedId = Blockly.Python.esp32.getStringFormat(id);
    let jsCode = 'var slider_' + formattedId + ' = document.getElementById(\'' + formattedId + '\');' + NEWLINE
        + 'http_sendSliderValue(slider_' + formattedId + ', \'' + formattedId + '\');' + NEWLINE
        + 'slider_' + formattedId + '.onchange = function () {' + NEWLINE
        + '  http_sendSliderValue(slider_' + formattedId + ', \'' + formattedId + '\');' + NEWLINE
        + "};";
    Blockly.Python.esp32.addJavascriptCode('http_sendSliderValue', FUNCTIONS_PICO.JAVSCRIPT_SEND_SLIDER_VALUE);
    Blockly.Python.esp32.addJavascriptCode(id, jsCode);
    return ["int(float(server.getValueById(" + id + ")))", Blockly.Python.ORDER_ATOMIC];
};

// Server - get button state
Blockly.Python.network_server_getSwitchValue = function (block) {
    let id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_NONE);
    return ["int(server.getValueById(" + id + "))", Blockly.Python.ORDER_ATOMIC];
};

// HTTP

// Get HTTP request
Blockly.Python.network_getHTTPRequest = function (block) {
    const method = block.getFieldValue("METHOD");
    const url = Blockly.Python.valueToCode(block, 'URL', Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addImport('urequests', IMPORT_UREQUESTS);
    return ["urequests.request(method='" + method + "', url=" + url.replace(/'/gi, '"') + ").text", Blockly.Python.ORDER_ATOMIC];
};
