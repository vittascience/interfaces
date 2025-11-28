/**
 * @fileoverview Network generators for UNO R4 WiFi.
 */

// Wifi - Connect station
Blockly.Arduino.network_connectStation = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    const ssid = Blockly.Arduino.valueToCode(block, "SSID", Blockly.Arduino.ORDER_NONE) || '""';
    const pwd = Blockly.Arduino.valueToCode(block, "PASSWORD", Blockly.Arduino.ORDER_NONE) || '""';
    const ip = Blockly.Arduino.valueToCode(block, "IP", Blockly.Arduino.ORDER_NONE) || '';
    let mask = Blockly.Arduino.valueToCode(block, "MASK", Blockly.Arduino.ORDER_NONE) || "";
    let gateway = Blockly.Arduino.valueToCode(block, "GATEWAY", Blockly.Arduino.ORDER_NONE) || "";
    let dhcp_hostname = Blockly.Arduino.valueToCode(block, "DHCP_HOSTNAME", Blockly.Arduino.ORDER_NONE) || "";
    Blockly.Arduino.addInclude('WiFiS3', INCLUDE_WIFIS3);
    Blockly.Arduino.addDeclaration('R4_WIFI_IP', "IPAddress R4_WIFI_IP;");
    Blockly.Arduino.addDeclaration('status', 'int status = WL_IDLE_STATUS;');
    Blockly.Arduino.addFunction('connectStation', FUNCTIONS_ARDUINO.DEF_WIFI_CONNECT_STATION);
    Blockly.Arduino.addFunction('printWifiStatus', FUNCTIONS_ARDUINO.DEF_WIFI_PRINT_STATUS);
    Blockly.Arduino.addFunction('IP_from', FUNCTIONS_ARDUINO.DEF_WIFI_IP_FROM);
    if (ip) {
        Blockly.Arduino.addSetup('R4_WIFI_IP', "R4_WIFI_IP.fromString(" + ip + ");");
    }
    if (mask) {
        mask = "IP_from(" + mask + ")";
    } else {
        mask = "IPAddress(0,0,0,0)";
    }
    if (gateway) {
        gateway = "IP_from(" + gateway + ")";
    } else {
        gateway = "IPAddress(0,0,0,0)";
    }
    let code = "";
    if (dhcp_hostname) {
        code += "WiFi.setHostname(" + dhcp_hostname + ");" + NEWLINE;
    }
    code += "connectStation(" + ssid + ", " + pwd + ", R4_WIFI_IP, " + mask + ", " + gateway + ");" + NEWLINE;
    if (Blockly.Arduino.unor4wifi.getProgrammingMode().mode == Blockly.Arduino.unor4wifi.MODE_SERVER) {
        Blockly.Arduino.addInclude('Vittascience_Server', INCLUDE_VITTASCIENCE_SERVER);
        Blockly.Arduino.addDefine('SERVER_PORT', '#define SERVER_PORT 80');
        Blockly.Arduino.addDeclaration('vittaServer', 'Vittascience_Server vittaServer(SERVER_PORT);');
        code += "vittaServer.start();" + NEWLINE;
    } else if (Blockly.Arduino.unor4wifi.getProgrammingMode().mode == Blockly.Arduino.unor4wifi.MODE_CLIENT) {
        Blockly.Arduino.addInclude('Vittascience_Client', INCLUDE_VITTASCIENCE_CLIENT);
        Blockly.Arduino.addDefine('SERVER_PORT', '#define SERVER_PORT 2000');
        Blockly.Arduino.addDeclaration('vittaClient', 'Vittascience_Client vittaClient(SERVER_PORT);');
    }
    return code;
};

// Wifi - Configure access point
Blockly.Arduino.network_configureAccessPoint = function (block) {
    const essid = Blockly.Arduino.valueToCode(block, "ESSID", Blockly.Arduino.ORDER_NONE) || '""';
    const ip = Blockly.Arduino.valueToCode(block, "IP", Blockly.Arduino.ORDER_NONE) || '';
    Blockly.Arduino.addInclude('WiFiS3', INCLUDE_WIFIS3);
    Blockly.Arduino.addDeclaration('R4_WIFI_IP', "IPAddress R4_WIFI_IP;");
    Blockly.Arduino.addDeclaration('status', 'int status = WL_IDLE_STATUS;');
    Blockly.Arduino.addFunction('configureAccessPoint', FUNCTIONS_ARDUINO.DEF_WIFI_CONFIGURE_ACCESS_POINT);
    Blockly.Arduino.addFunction('IP_from', FUNCTIONS_ARDUINO.DEF_WIFI_IP_FROM);
    if (ip) {
        Blockly.Arduino.addSetup('R4_WIFI_IP', "R4_WIFI_IP.fromString(" + ip + ");");
    }
    let code = "configureAccessPoint(" + essid + ", \"\", R4_WIFI_IP);" + NEWLINE;
    if (Blockly.Arduino.unor4wifi.getProgrammingMode().mode == Blockly.Arduino.unor4wifi.MODE_SERVER) {
        Blockly.Arduino.addInclude('Vittascience_Server', INCLUDE_VITTASCIENCE_SERVER);
        Blockly.Arduino.addDefine('SERVER_PORT', '#define SERVER_PORT 80');
        Blockly.Arduino.addDeclaration('vittaServer', 'Vittascience_Server vittaServer(SERVER_PORT);');
        code += "vittaServer.start();" + NEWLINE;
    } else if (Blockly.Arduino.unor4wifi.getProgrammingMode().mode == Blockly.Arduino.unor4wifi.MODE_CLIENT) {
        Blockly.Arduino.addInclude('Vittascience_Client', INCLUDE_VITTASCIENCE_CLIENT);
        Blockly.Arduino.addDefine('SERVER_PORT', '#define SERVER_PORT 2000');
        Blockly.Arduino.addDeclaration('vittaClient', 'Vittascience_Client vittaClient(SERVER_PORT);');
        code += "vittaClient.init(server);" + NEWLINE;
    }
    return code;
};

// Wifi - Disconnect station
Blockly.Arduino.network_disconnectStation = function () {
    Blockly.Arduino.addInclude('WiFiS3', INCLUDE_WIFIS3);
    Blockly.Arduino.addDeclaration('status', 'int status = WL_IDLE_STATUS;');
    Blockly.Arduino.addFunction('disconnectStation', FUNCTIONS_ARDUINO.DEF_WIFI_DISCONNECT_STATION);
    return "disconnectStation();" + NEWLINE;
};

// Wifi - Is station connected ?
Blockly.Arduino.network_isStationConnected = function () {
    Blockly.Arduino.addInclude('WiFiS3', INCLUDE_WIFIS3);
    return ["WiFi.status() == WL_CONNECTED", Blockly.Arduino.ORDER_ATOMIC];
};

// Wifi - Scan network profiles
Blockly.Arduino.network_scanNetworkProfiles = function () {
    Blockly.Arduino.addInclude('WiFiS3', INCLUDE_WIFIS3);
    Blockly.Arduino.addFunction('scanWifiNetworks', FUNCTIONS_ARDUINO.DEF_WIFI_SCAN_NETWORKS);
    return ["scanWifiNetworks()", Blockly.Arduino.ORDER_ATOMIC];
};

// Wifi - Get station informations
Blockly.Arduino.network_getStationInfos = function () {
    return ["printWifiStatus()", Blockly.Arduino.ORDER_ATOMIC];
};

// Server

// Server - send data to client
Blockly.Arduino.network_server_sendData = function (block) {
    const data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_NONE) || "";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) {
        return "vittaServer.sendDataToClient(" + data + ");" + NEWLINE;
    } else {
        return "vittaServer.sendDataToClient(String(" + data + "));" + NEWLINE;
    }
};

// Server - get client data
Blockly.Arduino.network_server_getClientData = function () {
    return ["vittaServer.getClientData()", Blockly.Arduino.ORDER_ATOMIC];
};

// Server - get client data parameter
Blockly.Arduino.network_server_getClientDataParam = function () {
    return ["vittaServer.getClientData(true)", Blockly.Arduino.ORDER_ATOMIC];
};

// Server - get client IP
Blockly.Arduino.network_server_getClientIp = function () {
    return ["vittaServer.getClientIp()", Blockly.Arduino.ORDER_ATOMIC];
};

// Server - change port
Blockly.Arduino.network_changeServerPort = function (block) {
    const port = Blockly.Arduino.valueToCode(block, 'PORT', Blockly.Arduino.ORDER_NONE) || "";
    Blockly.Arduino.addDefine('SERVER_PORT', '#define SERVER_PORT ' + port);
    return "";
};

// Server - send web page
Blockly.Arduino.network_server_sendWebPage = function (block) {
    Blockly.Arduino.addInclude('WebPageScripts', INCLUDE_WEB_PAGE_SCRIPTS);
    Blockly.Arduino.addSetup('setJSFile', "vittaServer.setJSFile(web_page_js);");
    Blockly.Arduino.addSetup('setCSSFile', "vittaServer.setCSSFile(web_page_css);");
    const branchCode = Blockly.Arduino.statementToCode(block, "BODY") || "";
    const htmlPageVar = 'vittaServer.html_page = ' + NEWLINE
        + '  "<!DOCTYPE HTML>"' + NEWLINE
        + '  "<html>"' + NEWLINE
        + '  "<head>"' + NEWLINE
        + '  "<meta charset=\'UTF-8\' name=\'viewport\' content=\'width=device-width, initial-scale=1\'>"' + NEWLINE
        + '  "</head>"' + NEWLINE
        + '  "<body>"' + NEWLINE
        + branchCode
        + '  "</body>"' + NEWLINE
        + '  "</html>";' + NEWLINE;
    let html_vars = Blockly.Arduino.unor4wifi.getVariablesIncludedInHtml(block);
    let code = htmlPageVar + NEWLINE;
    if (html_vars.length > 0) {
        code += 'vittaServer.sendHtmlPage(true);' + NEWLINE;
        let htmlVarCode = 'StaticJsonDocument<2048> html_variables;' + NEWLINE;
        if (Object.keys(Blockly.Arduino.htmlSpans_).length > 0) {
            htmlVarCode += 'JsonObject html_spans = html_variables["spans"].to<JsonObject>();' + NEWLINE;
            for (var i in Blockly.Arduino.htmlSpans_) {
                htmlVarCode += 'html_spans["' + i + '"] = ' + Blockly.Arduino.htmlSpans_[i] + ';' + NEWLINE;
            }
        }
        if (Object.keys(Blockly.Arduino.htmlGauges_).length > 0) {
            htmlVarCode += 'JsonObject html_gauges = html_variables["gauges"].to<JsonObject>();' + NEWLINE;
            for (var i in Blockly.Arduino.htmlGauges_) {
                htmlVarCode += 'html_gauges["' + i + '"] = ' + Blockly.Arduino.htmlGauges_[i] + ';' + NEWLINE;
            }
        }
        if (Object.keys(Blockly.Arduino.htmlImages_).length > 0) {
            htmlVarCode += 'JsonObject html_images = html_variables["images"].to<JsonObject>();' + NEWLINE;
            for (var i in Blockly.Arduino.htmlImages_) {
                htmlVarCode += 'html_images["' + i + '"] = ' + Blockly.Arduino.htmlImages_[i] + ';' + NEWLINE;
            }
        }
        code += htmlVarCode + 'vittaServer.sendVariables(html_variables);' + NEWLINE;
        Blockly.Arduino.addInclude('ArduinoJson', INCLUDE_ARDUINO_JSON);
        Blockly.Arduino.unor4wifi.addJavascriptCode('js_requestVariablesFromServer', FUNCTIONS_ARDUINO.JAVASCRIPT_REQUEST_VARIABLES_FROM_SERVER);
    } else {
        code += 'vittaServer.sendHtmlPage(false);' + NEWLINE;
    }
    return code;
};

// Web Page

// Add title to web page
Blockly.Arduino.network_html_addTitle = function (block) {
    let title = Blockly.Arduino.valueToCode(block, 'TITLE', Blockly.Arduino.ORDER_NONE) || "";
    const level = block.getFieldValue("LEVEL");
    const inputBlock = block.getInput("COLOR").connection.targetBlock();
    let colour = "#000";
    if (inputBlock) {
        colour = inputBlock.getFieldValue('COLOUR');
    }
    Blockly.Arduino.unor4wifi.addCssStyle('default_init', FUNCTIONS_ARDUINO.CSS_DEFAULT_INIT);
    title = Blockly.Arduino.unor4wifi.getHtmlFormat(block, "TITLE", title);
    return "  \"<h" + level + " class='police' style='color:" + colour + ";'>" + title + "</h" + level + ">\"" + NEWLINE;
};

// Add text to page
Blockly.Arduino.network_html_addText = function (block) {
    const text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_NONE) || "";
    let fontSize = Blockly.Arduino.valueToCode(block, 'SIZE', Blockly.Arduino.ORDER_NONE) || "";
    let colour = "#666666";
    let colorBlock = block.getInput("COLOR");
    if (colorBlock) {
        colorBlock = colorBlock.connection.targetBlock();
        if (colorBlock) {
            colour = colorBlock.getFieldValue('COLOUR');
        }
    }
    if (fontSize) {
        fontSize = 'font-size:' + Blockly.Arduino.unor4wifi.getStringFormat('String(' + fontSize + ')') + 'px;';
    }
    Blockly.Arduino.unor4wifi.addCssStyle('default_init', FUNCTIONS_ARDUINO.CSS_DEFAULT_INIT);
    const formattedText = Blockly.Arduino.unor4wifi.getStringFormat('String(' + text + ')');
    const html_vars = Blockly.Arduino.unor4wifi.getVariablesIncludedInHtml(block);
    if (html_vars.length > 0) {
        const id = randHex();
        for (var i in html_vars) {
            if (text.includes(html_vars[i])) {
                Blockly.Arduino.unor4wifi.addHtmlSpanValue(id, text, 'span');
                return "  \"<span id='" + id + "' class='police' style='color:" + colour + ";" + fontSize + "'>" + formattedText + "</span><br>\"" + NEWLINE;
            }
        }
    }
    return "  \"<span class='police' style='color:" + colour + ";" + fontSize + "'>" + formattedText + "</span><br>\"" + NEWLINE;
};

// Add button on page
Blockly.Arduino.network_html_addButton = function (block) {
    let id = Blockly.Arduino.valueToCode(block, 'ID', Blockly.Arduino.ORDER_NONE) || "''";
    let text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_NONE) || "''";
    let height = Blockly.Arduino.valueToCode(block, 'HEIGHT', Blockly.Arduino.ORDER_NONE) || "";
    let width = Blockly.Arduino.valueToCode(block, 'WIDTH', Blockly.Arduino.ORDER_NONE) || "";
    let colour = "#e3e3e3";
    let colorBlock = block.getInput("COLOR")
    if (colorBlock) {
        colorBlock = colorBlock.connection.targetBlock();
        if (colorBlock) {
            colour = colorBlock.getFieldValue('COLOUR');
        }
    }
    id = Blockly.Arduino.unor4wifi.getHtmlFormat(block, "ID", id);
    text = Blockly.Arduino.unor4wifi.getHtmlFormat(block, "TEXT", text);
    height = 'height:' + Blockly.Arduino.unor4wifi.getStringFormat('String(' + height + ')') + 'px;';
    width = 'width:' + Blockly.Arduino.unor4wifi.getStringFormat('String(' + width + ')') + 'px;';
    Blockly.Arduino.unor4wifi.addJavascriptCode('http_onButtonClick', FUNCTIONS_ARDUINO.JAVSCRIPT_ON_BUTTON_CLICK);
    Blockly.Arduino.unor4wifi.addCssStyle('default_init', FUNCTIONS_ARDUINO.CSS_DEFAULT_INIT);
    return "  \"<button class='police' name=\'" + id + "\' style='background-color:" + colour + ";" + height + width + "' onclick='http_onButtonClick(\\\"" + id + "\\\")'>" + text + "</button>\"" + NEWLINE;
};

// Add a slider on web page
Blockly.Arduino.network_html_addSlider = function (block) {
    const id = Blockly.Arduino.valueToCode(block, 'ID', Blockly.Arduino.ORDER_NONE) || "''";
    let min = Blockly.Arduino.valueToCode(block, 'MIN', Blockly.Arduino.ORDER_NONE) || "0";
    let max = Blockly.Arduino.valueToCode(block, 'MAX', Blockly.Arduino.ORDER_NONE) || "100";
    const orientation = block.getFieldValue('ORIENT');
    let default_w = "100";
    let default_h = "15";
    if (orientation == 'VERTICAL') {
        default_w = "15";
        default_h = "100";
    }
    const width = Blockly.Arduino.valueToCode(block, 'WIDTH', Blockly.Arduino.ORDER_NONE) || default_w;
    const height = Blockly.Arduino.valueToCode(block, 'HEIGHT', Blockly.Arduino.ORDER_NONE) || default_h;
    let value = "vittaServer.getValueById(" + id + ", (" + max + "-" + min + ")/2)";
    const formattedId = Blockly.Arduino.unor4wifi.getHtmlFormat(block, "ID", id);
    const slider_width = parseInt(width);//Blockly.Arduino.unor4wifi.getStringFormat('String(' + width + ')');
    const slider_height = parseInt(height);//Blockly.Arduino.unor4wifi.getStringFormat('String(' + height + ')');
    const slider_selector = 1.6 * parseInt(height);//Blockly.Arduino.unor4wifi.getStringFormat('String(1.6*' + height + ')');
    const jsCode = 'var slider_' + formattedId + ' = document.getElementById(\'' + formattedId + '\');' + NEWLINE
        + 'slider_' + formattedId + '.onchange = function () {' + NEWLINE
        + '  http_sendSliderValue(slider_' + formattedId + ', \'' + formattedId + '\');' + NEWLINE
        + "};";
    const cssCode = '.slider_' + formattedId + ' {width:' + slider_width + 'px;height:' + slider_height + 'px;border-radius:' + slider_height + 'px;}' + NEWLINE
        + '.slider_' + formattedId + '::-webkit-slider-thumb {width:' + slider_selector + 'px;height:' + slider_selector + 'px;border-radius:' + slider_selector + 'px;}';
    min = Blockly.Arduino.unor4wifi.getStringFormat('String(' + min + ')');
    max = Blockly.Arduino.unor4wifi.getStringFormat('String(' + max + ')');
    value = Blockly.Arduino.unor4wifi.getStringFormat(value);
    Blockly.Arduino.unor4wifi.addJavascriptCode('http_sendSliderValue', FUNCTIONS_ARDUINO.JAVSCRIPT_SEND_SLIDER_VALUE);
    Blockly.Arduino.unor4wifi.addJavascriptCode('js_slider_' + id, jsCode);
    Blockly.Arduino.unor4wifi.addCssStyle('default_init', FUNCTIONS_ARDUINO.CSS_DEFAULT_INIT);
    Blockly.Arduino.unor4wifi.addCssStyle('default_slider', FUNCTIONS_ARDUINO.CSS_DEFAULT_SLIDER);
    Blockly.Arduino.unor4wifi.addCssStyle('css_slider_' + id, cssCode);
    const fontSize = Blockly.Arduino.unor4wifi.getStringFormat('String(0.8*' + height + ')');
    const textMargin = Blockly.Arduino.unor4wifi.getStringFormat('String(0.15*' + height + ')');
    const code = "  \"<span class='police' style='color:#c3c3c3;font-size:" + fontSize + "px;margin-bottom:" + textMargin + "px;'>" + min + "</span>\"" + NEWLINE
        + "  \"<input type='range' min=\'" + min + "\' max=\'" + max + "\' value=\'" + value + "\' class='slider slider_" + formattedId + "' id=\'" + formattedId + "\'>\"" + NEWLINE
        + "  \"<span class='police' style='color:#c3c3c3;font-size:" + fontSize + "px;margin-bottom:" + textMargin + "px;'>" + max + "</span>\"" + NEWLINE
    return code;
};

Blockly.Arduino.network_html_addSwitch = function (block) {
    const id = Blockly.Arduino.valueToCode(block, 'ID', Blockly.Arduino.ORDER_NONE) || "''";
    let size = "1";
    if (block.getInput("SIZE_FIELD")) {
        size = block.getFieldValue("SIZE");
    }
    //let value = 'vittaServer.updateSwitchState(' + id + ')';
    let colour = "#22b573";
    let colorBlock = block.getInput("COLOR")
    if (colorBlock) {
        colorBlock = colorBlock.connection.targetBlock();
        if (colorBlock) {
            colour = colorBlock.getFieldValue('COLOUR');
        }
    }
    const baseSize = 1 + 0.4 * parseInt(size);
    const switch_width = parseInt(60 * baseSize);
    const switch_height = parseInt(34 * baseSize);
    const slider_size = parseInt(26 * baseSize);
    const slider_margin = parseInt(4 * baseSize);
    const formattedId = Blockly.Arduino.unor4wifi.getHtmlFormat(block, "ID", id);
    const cssCode = '.switch_' + formattedId + ' {width:' + switch_width + 'px;height:' + switch_height + 'px;}' + NEWLINE
        + '.sw_slider_' + formattedId + ':before {width:' + slider_size + 'px;height:' + slider_size + 'px;left:' + slider_margin + 'px;bottom:' + slider_margin + 'px;}' + NEWLINE
        + 'input:checked + .sw_slider_' + formattedId + ' {background-color:' + colour + ';}' + NEWLINE
        + 'input:checked + .sw_slider_' + formattedId + ':before {transform: translateX(' + slider_size + 'px);}';
    //value = Blockly.Arduino.unor4wifi.getStringFormat(value);
    Blockly.Arduino.unor4wifi.addJavascriptCode('http_onSwitchToggle', FUNCTIONS_ARDUINO.JAVSCRIPT_ON_SWITCH_TOGGLE);
    Blockly.Arduino.unor4wifi.addCssStyle('default_switcher', FUNCTIONS_ARDUINO.CSS_DEFAULT_SWITCHER);
    Blockly.Arduino.unor4wifi.addCssStyle('css_' + id, cssCode);
    const html = "  \"<label class='switch switch_" + formattedId + "'><input id=\'" + formattedId + "\' onclick='http_onSwitchToggle(\\\"" + formattedId + "\\\")' type='checkbox'>\"" + NEWLINE
        + "  \"<span class='sw_slider round sw_slider_" + formattedId + "'></span>\"" + NEWLINE
        + "  \"</label>\"" + NEWLINE;
    return html;
};

// Add a gauge in web page
Blockly.Arduino.network_html_addGauge = function (block) {
    let title = Blockly.Arduino.valueToCode(block, 'TITLE', Blockly.Arduino.ORDER_NONE) || "''";
    const value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE) || "";
    let min = Blockly.Arduino.valueToCode(block, 'MIN', Blockly.Arduino.ORDER_NONE) || "0";
    let max = Blockly.Arduino.valueToCode(block, 'MAX', Blockly.Arduino.ORDER_NONE) || "100";
    title = Blockly.Arduino.unor4wifi.getHtmlFormat(block, "TITLE", title);
    //min = Blockly.Arduino.unor4wifi.getStringFormat('String(' + min + ')');
    //max = Blockly.Arduino.unor4wifi.getStringFormat('String(' + max + ')');
    const id = randHex();
    const gaugeCss = '.gauge_' + id + ' .semi-circle {background:#3498db;}' + NEWLINE
        + '.gauge_' + id + ' .semi-circle--mask {transform:rotate(20deg) translate3d(0,0,0);}' + NEWLINE;
    Blockly.Arduino.unor4wifi.addHtmlGaugeValue(id, value);
    Blockly.Arduino.unor4wifi.addJavascriptCode('var_myGauges', 'var myGauges = Object.create(null);');
    Blockly.Arduino.unor4wifi.addJavascriptCode('js_setGaugeValue', FUNCTIONS_ARDUINO.JAVASCRIPT_SET_GAUGE_VALUE);
    Blockly.Arduino.unor4wifi.addJavascriptCode('myGauges_' + id, 'myGauges[\'' + id + '\'] = {min:' + min + ',max:' + max + '}');
    Blockly.Arduino.unor4wifi.addCssStyle('default_init', FUNCTIONS_ARDUINO.CSS_DEFAULT_INIT);
    Blockly.Arduino.unor4wifi.addCssStyle('default_gauge', FUNCTIONS_ARDUINO.CSS_GAUGE_STYLE);
    Blockly.Arduino.unor4wifi.addCssStyle('css_gauge_' + id, gaugeCss);
    const html = "  \"<div id='" + id + "' class='box gauge_" + id + "'>\"" + NEWLINE
        + "  \"<h3>" + title + "</h3>\"" + NEWLINE
        + "  \"<div class='mask'><div class='semi-circle'></div><div class='semi-circle--mask'></div></div>\"" + NEWLINE
        + "  \"<p id='gauge_value'>--</p>\"" + NEWLINE
        + "  \"</div>\"" + NEWLINE;
    return html;
};

// Add link on text in web page
Blockly.Arduino.network_html_addLink = function (block) {
    const text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_NONE) || "";
    const url = block.getFieldValue('URL');
    let fontSize = Blockly.Arduino.valueToCode(block, 'SIZE', Blockly.Arduino.ORDER_NONE) || "";
    let colour = "#666666";
    let colorBlock = block.getInput("COLOR");
    if (colorBlock) {
        colorBlock = colorBlock.connection.targetBlock();
        if (colorBlock) {
            colour = colorBlock.getFieldValue('COLOUR');
        }
    }
    if (fontSize) {
        //fontSize = 'font-size:' + Blockly.Arduino.unor4wifi.getStringFormat('String(' + fontSize + ')') + 'px;'; // TO DO: variables
        fontSize = 'font-size:' + fontSize + 'px;';
    }
    Blockly.Arduino.unor4wifi.addCssStyle('default_init', FUNCTIONS_ARDUINO.CSS_DEFAULT_INIT);
    const formattedText = Blockly.Arduino.unor4wifi.getHtmlFormat(block, "TEXT", text);
    return "  \"<a href='" + url + "' style='color:" + colour + ";" + fontSize + "' target='_blank' rel='noopener noreferrer'>" + formattedText + "</a>\"" + NEWLINE;
};

// Add a image in web page
Blockly.Arduino.network_html_addImage = function (block) {
    let data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_NONE) || "";
    let w = Blockly.Arduino.valueToCode(block, 'WIDTH', Blockly.Arduino.ORDER_NONE) || "59";
    let h = Blockly.Arduino.valueToCode(block, 'HEIGHT', Blockly.Arduino.ORDER_NONE) || "66";
    const inputBlock = block.getInput('DATA').connection.targetBlock();
    if (Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) {
        data = Blockly.Arduino.unor4wifi.getHtmlFormat(block, "DATA", data);
        data = "    \"<img src='data:image/png;base64, " + data + "'>\"";
    } else {
        const inputCheck = inputBlock.outputConnection.check_;
        if (inputCheck) {
            if (inputCheck[0] == "Array") {
                data = Blockly.Arduino.unor4wifi.getStringFormat('String(' + data + ')[2:-3]');
            } else {
                data = Blockly.Arduino.unor4wifi.getStringFormat('String(' + data + ')');
            }
            data = "    \"<img src='data:image/png;base64, " + data + "'>\"";
        } else if (inputBlock.type == 'variables_get') {
            const id = randHex();
            Blockly.Arduino.unor4wifi.addHtmlImageData(id, data);
            data = "    \"<img id='" + id + "'>\"";
        }
    }
    if (block.getInput("WIDTH")) {
        w = Blockly.Arduino.unor4wifi.getHtmlFormat(block, "WIDTH", w);
    }
    // else if (inputBlock.type == 'esp32Cam_getCaptureData') {
    //     w = "DISPLAY_RESOLUTIONS[CAM_FRAMESIZE][1][0]";
    //     w = Blockly.Arduino.unor4wifi.getStringFormat('String(' + w + ')');
    // }
    if (block.getInput("HEIGHT")) {
        h = Blockly.Arduino.unor4wifi.getHtmlFormat(block, "HEIGHT", h);
    }
    // else if (inputBlock.type == 'esp32Cam_getCaptureData') {
    //     h = "DISPLAY_RESOLUTIONS[CAM_FRAMESIZE][1][1]";
    //     h = Blockly.Arduino.unor4wifi.getStringFormat('String(' + h + ')');
    // }
    Blockly.Arduino.unor4wifi.addCssStyle('default_init', FUNCTIONS_ARDUINO.CSS_DEFAULT_INIT);
    Blockly.Arduino.unor4wifi.addCssStyle('default_image', FUNCTIONS_ARDUINO.CSS_IMAGE_STYLE);
    const html = "  \"<div class='frame' style='width:" + w + "px ; height:" + h + "px;'>\"" + NEWLINE
        + data + NEWLINE
        + "  \"</div>\"" + NEWLINE;
    return html;
};

// Add a stream in web page
Blockly.Arduino.network_html_addStream = function (block) {
    const data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_NONE) || "";
    let w = Blockly.Arduino.valueToCode(block, 'WIDTH', Blockly.Arduino.ORDER_NONE) || "640";
    let h = Blockly.Arduino.valueToCode(block, 'HEIGHT', Blockly.Arduino.ORDER_NONE) || "480";
    if (block.getInput("WIDTH")) {
        w = Blockly.Arduino.unor4wifi.getHtmlFormat(block, "WIDTH", w);
    }
    // else {
    //     w = "DISPLAY_RESOLUTIONS[CAM_FRAMESIZE][1][0]";
    //     w = Blockly.Arduino.unor4wifi.getStringFormat('String(' + w + ')');
    // }
    if (block.getInput("HEIGHT")) {
        h = Blockly.Arduino.unor4wifi.getHtmlFormat(block, "HEIGHT", h);
    }
    // else {
    //     h = "DISPLAY_RESOLUTIONS[CAM_FRAMESIZE][1][1]";
    //     h = Blockly.Arduino.unor4wifi.getStringFormat('String(' + h + ')');
    // }
    const id = randHex();
    Blockly.Arduino.unor4wifi.addHtmlImageData(id, data);
    Blockly.Arduino.unor4wifi.addCssStyle('default_init', FUNCTIONS_ARDUINO.CSS_DEFAULT_INIT);
    Blockly.Arduino.unor4wifi.addCssStyle('default_image', FUNCTIONS_ARDUINO.CSS_IMAGE_STYLE);
    const html = "  \"<div class='frame' style='width:" + w + "px ; height:" + h + "px;'>\"" + NEWLINE
        + "    \"<img id='" + id + "'>\"" + NEWLINE
        + "  \"</div>\"" + NEWLINE;
    return html;
};

// Add tag DIV|FORM|CENTER
Blockly.Arduino.network_HTML_Tags = function (block) {
    const tag = block.getFieldValue("TAG");
    const branchCode = Blockly.Arduino.statementToCode(block, "IN") || "";
    return '  \"<' + tag + '>\"' + NEWLINE + branchCode + '  \"</' + tag + '>\"' + NEWLINE;
};

// Add tags B|I|INS|MARK|DEL|SMALL
Blockly.Arduino.network_HTML_formatText = function (block) {
    const text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_NONE) || "";
    const tag = block.getFieldValue("TAG");
    const formattedText = Blockly.Arduino.unor4wifi.getStringFormat('String(' + text + ')')
    const taggedText = '"<' + tag + '>' + formattedText + '</' + tag + '>"';
    return [taggedText, Blockly.Arduino.ORDER_ATOMIC];
};

// Add tag newline
Blockly.Arduino.network_HTML_newline = function () {
    return '  \"<br>\"' + NEWLINE;
};

// Add html code
Blockly.Arduino.network_HTML_add = function (block) {
    const html = Blockly.Arduino.valueToCode(block, 'HTML', Blockly.Arduino.ORDER_NONE) || "";
    return '  \"' + html.substr(1, html.length - 2) + "\"" + NEWLINE;
};

// Add span with HTML symbol
Blockly.Arduino.network_HTML_addSymbol = function (block) {
    let symbol = Blockly.Arduino.valueToCode(block, 'SYMBOL', Blockly.Arduino.ORDER_NONE) || "";
    symbol = symbol.substr(1, symbol.length - 2);
    let size = Blockly.Arduino.valueToCode(block, 'SIZE', Blockly.Arduino.ORDER_NONE) || "0";
    size = size.substr(1, size.length - 2);
    const encoding = block.getFieldValue("ENCODING");
    if (symbol.charAt(symbol.length - 1) !== ';') {
        symbol = symbol + ';';
    }
    return TAB + "\"<span style='font-size:" + size + "'>" + encoding + symbol + "</span>\"" + NEWLINE;
};

// Client

// Client - send data to server
Blockly.Arduino.network_client_sendData = function (block) {
    Blockly.Arduino.addFunction('IP_from', FUNCTIONS_ARDUINO.DEF_WIFI_IP_FROM);
    let data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_NONE) || "";
    let ip = Blockly.Arduino.valueToCode(block, 'IP', Blockly.Arduino.ORDER_NONE) || "''";
    let port = Blockly.Arduino.valueToCode(block, 'PORT', Blockly.Arduino.ORDER_NONE) || "";
    if (!Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) data = "String(" + data + ")";
    if (ip) {
        ip = `IP_from(${ip})`;
    } else {
        ip = 'IPAddress(0,0,0,0)';
    }
    if (port) port = ", " + port;
    return "vittaClient.sendDataToServer(" + data + ", " + ip + port + ");" + NEWLINE;
};

// Client - get server data
Blockly.Arduino.network_client_getServerData = function (block) {
    Blockly.Arduino.addFunction('IP_from', FUNCTIONS_ARDUINO.DEF_WIFI_IP_FROM);
    const ip = Blockly.Arduino.valueToCode(block, 'IP', Blockly.Arduino.ORDER_NONE) || "''";
    return ["vittaClient.getServerData(IP_from(" + ip + "))", Blockly.Arduino.ORDER_ATOMIC];
};

// Web page data

// Server - get button state
Blockly.Arduino.network_server_getButtonState = function (block) {
    const id = Blockly.Arduino.valueToCode(block, 'ID', Blockly.Arduino.ORDER_NONE) || "";
    return ["vittaServer.getValueById(" + id + ", 0).toInt()", Blockly.Arduino.ORDER_ATOMIC];
};

// Server - get button state
Blockly.Arduino.network_server_getSliderValue = function (block) {
    const id = Blockly.Arduino.valueToCode(block, 'ID', Blockly.Arduino.ORDER_NONE);
    const formattedId = Blockly.Arduino.unor4wifi.getHtmlFormat(block, "ID", id);
    const jsCode = 'var slider_' + formattedId + ' = document.getElementById(\'' + formattedId + '\');' + NEWLINE
        + 'http_sendSliderValue(slider_' + formattedId + ', \'' + formattedId + '\');' + NEWLINE
        + 'slider_' + formattedId + '.onchange = function () {' + NEWLINE
        + '  http_sendSliderValue(slider_' + formattedId + ', \'' + formattedId + '\');' + NEWLINE
        + "};";
    Blockly.Arduino.unor4wifi.addJavascriptCode('http_sendSliderValue', FUNCTIONS_ARDUINO.JAVSCRIPT_SEND_SLIDER_VALUE);
    Blockly.Arduino.unor4wifi.addJavascriptCode('js_slider_' + id, jsCode);
    return ["(int)vittaServer.getValueById(" + id + ").toFloat()", Blockly.Arduino.ORDER_ATOMIC];
};

// Server - get button state
Blockly.Arduino.network_server_getSwitchValue = function (block) {
    const id = Blockly.Arduino.valueToCode(block, 'ID', Blockly.Arduino.ORDER_NONE);
    return ["vittaServer.getValueById(" + id + ").toInt()", Blockly.Arduino.ORDER_ATOMIC];
};

// HTTP

Blockly.Arduino.network_connectStation_simple = Blockly.Arduino.network_connectStation;

// Get HTTP request
Blockly.Arduino.network_getHTTPRequest = function (block) {
    const method = block.getFieldValue("METHOD");
    const url = Blockly.Arduino.valueToCode(block, 'URL', Blockly.Arduino.ORDER_NONE) || '""';
    Blockly.Arduino.addInclude('R4HttpClient', INCLUDE_R4_HTTP_CLIENT);
    Blockly.Arduino.addDeclaration('sslClient', "WiFiSSLClient sslClient;")
    Blockly.Arduino.addDeclaration('httpClient', "R4HttpClient httpClient;");
    Blockly.Arduino.addFunction('setupHTTPRequest', FUNCTIONS_ARDUINO.DEF_SETUP_HTTP_REQUEST);
    Blockly.Arduino.addFunction('getHTTPResponse', FUNCTIONS_ARDUINO.DEF_WIFI_GET_HTTP_RESPONSE);
    if (method == 'GET') {
        Blockly.Arduino.addFunction('hTTPRequest_GET', FUNCTIONS_ARDUINO.DEF_WIFI_HTTP_REQUEST_GET);
        return ["hTTPRequest_GET(" + url.replace(/'/gi, '"') + ")", Blockly.Arduino.ORDER_ATOMIC];
    } else {
        Blockly.Arduino.addInclude('ArduinoJson', INCLUDE_ARDUINO_JSON);
        Blockly.Arduino.addFunction('hTTPRequest_POST', FUNCTIONS_ARDUINO.DEF_WIFI_HTTP_REQUEST_POST);
        const content = Blockly.Arduino.valueToCode(block, 'CONTENT', Blockly.Arduino.ORDER_NONE) || '""';
        return ["hTTPRequest_POST(" + url.replace(/'/gi, '"') + ", " + content + ")", Blockly.Arduino.ORDER_ATOMIC];
    }
};

Blockly.Arduino.unor4wifi = Object.create(null);

Blockly.Arduino.unor4wifi.writeJavascriptConstant = function () {
    const data = Blockly.Arduino.convertObjectInLists(Blockly.Arduino.jsCodes_);
    const jsConstant = 'const char web_page_js[] PROGMEM = R\"JS(' + NEWLINE
        + data.join(NEWLINE) + NEWLINE
        + ')JS\";' + NEWLINE;
    return jsConstant;
};

Blockly.Arduino.unor4wifi.writeCssConstant = function () {
    const data = Blockly.Arduino.convertObjectInLists(Blockly.Arduino.cssStyles_);
    const cssConstant = 'const char web_page_css[] PROGMEM = R\"CSS(' + NEWLINE
        + data.join(NEWLINE) + NEWLINE
        + ')CSS\";' + NEWLINE;
    return cssConstant;
};

Blockly.Arduino.unor4wifi.getStringFormat = function (value) {
    return '" + ' + value + ' + "';
};

Blockly.Arduino.unor4wifi.getHtmlFormat = function (block, name, text) {
    const inputBlock = block.getInput(name).connection.targetBlock();
    if (inputBlock) {
        if (inputBlock.type == "text") {
            text = text.replaceAll('"', '');
        } else if (inputBlock.type == "text_join") {
            text = Blockly.Arduino.unor4wifi.getStringFormat(text);
        } else {
            text = Blockly.Arduino.unor4wifi.getStringFormat('String(' + text + ')');
        }
    }
    return text;
};

Blockly.Arduino.unor4wifi.getVariablesIncludedInHtml = function (block) {
    const var_gets = block.workspace.getBlocksByType('variables_get');
    let html_var_names = new Array()
    for (let id in var_gets) {
        let blockGet = var_gets[id];
        if (!blockGet.disabled) {
            while (true) {
                if (blockGet.parentBlock_ !== null) {
                    if (Blockly.Constants.HTML_BLOCKS.includes(blockGet.getParent().type)) {
                        const name = Blockly.Arduino.nameDB_.getName(var_gets[id].getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
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
    }
    return html_var_names;
};

Blockly.Arduino.unor4wifi.addHtmlSpanValue = function (id, value) {
    if (Blockly.Arduino.htmlSpans_[id] === undefined) {
        Blockly.Arduino.htmlSpans_[id] = value;
    }
};

Blockly.Arduino.unor4wifi.addHtmlGaugeValue = function (id, value) {
    if (Blockly.Arduino.htmlGauges_[id] === undefined) {
        Blockly.Arduino.htmlGauges_[id] = value;
    }
};

Blockly.Arduino.unor4wifi.addHtmlImageData = function (id, value) {
    if (Blockly.Arduino.htmlImages_[id] === undefined) {
        Blockly.Arduino.htmlImages_[id] = value;
    }
};

/**
 * Adds a string of "jsCode" code to be added after initializations.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} jsCodeTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Arduino.unor4wifi.addJavascriptCode = function (jsCodeTag, code) {
    if (Blockly.Arduino.jsCodes_[jsCodeTag] === undefined) {
        Blockly.Arduino.jsCodes_[jsCodeTag] = code;
    }
};

/**
 * Adds a string of "cssStyle" code to be added after initializations.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} cssCodeTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Arduino.unor4wifi.addCssStyle = function (cssCodeTag, code) {
    if (Blockly.Arduino.cssStyles_[cssCodeTag] === undefined) {
        Blockly.Arduino.cssStyles_[cssCodeTag] = code;
    }
};

Blockly.Arduino.unor4wifi.MODE_SERVER = 'server';
Blockly.Arduino.unor4wifi.MODE_CLIENT = 'client';
Blockly.Arduino.unor4wifi.MODE_NORMAL = 'normal';

Blockly.Arduino.unor4wifi.getProgrammingMode = function () {
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
    let mode = checkBlocks(server_types, Blockly.Arduino.unor4wifi.MODE_SERVER);
    if (mode === undefined) {
        mode = checkBlocks(client_types, Blockly.Arduino.unor4wifi.MODE_CLIENT);
    }
    if (mode === undefined) {
        mode = { 'mode': Blockly.Arduino.unor4wifi.MODE_NORMAL, 'loop': false };
    }
    return mode;
};