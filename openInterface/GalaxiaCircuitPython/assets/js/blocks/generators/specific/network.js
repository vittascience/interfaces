/**
 * @format
 * @fileoverview Network generators for Galaxia.
 */

// Galaxia WiFi

Blockly.Python.network_galaxia_simpleWifi_connect_basic = function (block) {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    var SSID = Blockly.Python.valueToCode(block, "SSID", Blockly.Python.ORDER_NONE) || "''";
    var PWD = Blockly.Python.valueToCode(block, "PWD", Blockly.Python.ORDER_NONE) || "''";
    return "simpleWifi.connect(" + SSID + ", " + PWD + ")" + NEWLINE;
};

Blockly.Python.network_galaxia_simpleWifi_connect = function (block) {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    var SSID = Blockly.Python.valueToCode(block, "SSID", Blockly.Python.ORDER_NONE) || "''";
    var PWD = Blockly.Python.valueToCode(block, "PWD", Blockly.Python.ORDER_NONE) || "''";
    var IP = Blockly.Python.valueToCode(block, "IP", Blockly.Python.ORDER_NONE) || "''";
    var args = {};
    var code = "simpleWifi.connect(" + SSID + ", " + PWD;
    args["IP"] = IP.length > 2;
    for (var arg in args) {
        if (arg == "IP" && args[arg] == true) {
            code += ", static_ip=" + IP;
        }
    }
    return code + ")" + NEWLINE;
};

Blockly.Python.network_galaxia_simpleWifi_connect_complete = function (block) {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    var SSID = Blockly.Python.valueToCode(block, "SSID", Blockly.Python.ORDER_NONE) || "''";
    var PWD = Blockly.Python.valueToCode(block, "PWD", Blockly.Python.ORDER_NONE) || "''";
    var IP = Blockly.Python.valueToCode(block, "IP", Blockly.Python.ORDER_NONE) || "''";
    var PORT = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_NONE) || "0";
    var args = {};
    var code = "simpleWifi.connect(" + SSID + ", " + PWD;
    args["IP"] = IP.length > 2;
    args["PORT"] = PORT > 0;
    for (var arg in args) {
        if (arg == "IP" && args[arg] == true) {
            code += ", static_ip=" + IP;
        } else if (arg == "PORT" && args[arg] == true) {
            code += ", server_port=" + PORT;
        }
    }
    return code + ")" + NEWLINE;
};

Blockly.Python.network_galaxia_simpleWifi_create_ap = function (block) {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    var SSID = Blockly.Python.valueToCode(block, "SSID", Blockly.Python.ORDER_NONE) || "''";
    var PWD = Blockly.Python.valueToCode(block, "PWD", Blockly.Python.ORDER_NONE) || "''";
    return "simpleWifi.start_access_point(" + SSID + ", " + PWD + ")" + NEWLINE;
};

Blockly.Python.network_galaxia_simpleWifi_getMyIp = function () {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    return ["simpleWifi.get_my_ip()", Blockly.Python.ORDER_ATOMIC];
};

// WiFi - Server

Blockly.Python.network_galaxia_simpleWifi_receive_basic = function (block) {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    var branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    var dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VALUE"), Blockly.VARIABLE_CATEGORY_NAME);
    // retrait de l'indentation induite par la méthode statementToCode
    branchCode = branchCode.substring(Blockly.Python.INDENT.length);
    var regex = new RegExp("\n" + Blockly.Python.INDENT, "g");
    branchCode = branchCode.replace(regex, "\n");
    return dataVar + " = simpleWifi.receive(stopSequence=\"\\r\")" + NEWLINE + branchCode;
};

Blockly.Python.network_galaxia_simpleWifi_receive_delimiter = function (block) {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    var branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    var dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VALUE"), Blockly.VARIABLE_CATEGORY_NAME);
    var delimiter = block.getFieldValue("DELIMITER");
    // retrait de l'indentation induite par la méthode statementToCode
    branchCode = branchCode.substring(Blockly.Python.INDENT.length);
    var regex = new RegExp("\n" + Blockly.Python.INDENT, "g");
    branchCode = branchCode.replace(regex, "\n");
    return dataVar + " = simpleWifi.receive(stopSequence=\"" + delimiter + "\")" + NEWLINE + branchCode;
};

Blockly.Python.network_galaxia_simpleWifi_receive = function (block) {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    var branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    var IP = Blockly.Python.valueToCode(block, "IP", Blockly.Python.ORDER_NONE) || "''";
    var dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VALUE"), Blockly.VARIABLE_CATEGORY_NAME);
    // retrait de l'indentation induite par la méthode statementToCode
    branchCode = branchCode.substring(Blockly.Python.INDENT.length);
    var regex = new RegExp("\n" + Blockly.Python.INDENT, "g");
    branchCode = branchCode.replace(regex, "\n");
    // var length egal 2 if the string is empty : "''"
    return dataVar + " = simpleWifi.receive(stopSequence=\"\\r\" " + (IP.length > 2 ? "ip=" + IP : "") + ")" + NEWLINE + branchCode;
};

Blockly.Python.network_galaxia_simpleWifi_receive_complete = function (block) {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    var branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    var IP = Blockly.Python.valueToCode(block, "IP", Blockly.Python.ORDER_NONE) || "''";
    var TIMEOUT = Blockly.Python.valueToCode(block, "TIMEOUT", Blockly.Python.ORDER_NONE) || "0";
    var dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VALUE"), Blockly.VARIABLE_CATEGORY_NAME);
    // var length egal 2 if the string is empty : "''"
    return (
        dataVar +
        " = simpleWifi.receive(stopSequence=\"\\r\" " + (IP.length > 2 ? "ip=" + IP : "") +
        (IP.length > 2 && TIMEOUT > 0 ? ", " : "") + (TIMEOUT > 0 ? "timeout=" + TIMEOUT : "") + ")" + NEWLINE +
        "if " + dataVar + ":" + NEWLINE +
        branchCode
    );
};

Blockly.Python.network_galaxia_simpleWifi_getLastConnectedIp = function () {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    return ["simpleWifi.get_last_connected_ip()", Blockly.Python.ORDER_ATOMIC];
};

// Client

Blockly.Python.network_galaxia_simpleWifi_send_basic = function (block) {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    var VALUE = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "''";
    var IP = Blockly.Python.valueToCode(block, "IP", Blockly.Python.ORDER_NONE) || "''";
    return "simpleWifi.send(" + VALUE + ", " + IP + ")" + NEWLINE;
};

Blockly.Python.network_galaxia_simpleWifi_send_complete = function (block) {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    var VALUE = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "''";
    var IP = Blockly.Python.valueToCode(block, "IP", Blockly.Python.ORDER_NONE) || "''";
    var PORT = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_NONE) || "0";
    return "simpleWifi.send(" + VALUE + ", " + IP + (PORT > 0 ? ", port=" + PORT : "") + ")" + NEWLINE;
};

// Web Server

Blockly.Python.network_galaxia_simpleHttp_wait_request = function (block) {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    Blockly.Python.addConstant("galaxia_http_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_HTTP_INIT);
    var branchCode = Blockly.Python.statementToCode(block, "DO") || "";
    var dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VALUE"), Blockly.VARIABLE_CATEGORY_NAME);
    // retrait de l'indentation induite par la méthode statementToCode
    branchCode = branchCode.substring(Blockly.Python.INDENT.length);
    var regex = new RegExp("\n" + Blockly.Python.INDENT, "g");
    branchCode = branchCode.replace(regex, "\n");
    return "response = http.wait_request()" + NEWLINE + dataVar + " = response.get_url()" + NEWLINE + branchCode;
};

Blockly.Python.network_galaxia_simpleHttp_respond_basic = function (block) {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    Blockly.Python.addConstant("galaxia_http_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_HTTP_INIT);
    var VALUE = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "''";
    return "http.respond(" + VALUE + ")" + NEWLINE;
};

Blockly.Python.network_galaxia_simpleHttp_respond_complete = function (block) {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    Blockly.Python.addConstant("galaxia_http_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_HTTP_INIT);
    var VALUE = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "''";
    var CODE = Blockly.Python.valueToCode(block, "CODE", Blockly.Python.ORDER_NONE) || "''";
    return "http.respond(" + VALUE + (CODE > 0 ? ", code=" + CODE : "") + ")" + NEWLINE;
};

Blockly.Python.network_galaxia_simpleHttp_generate_page = function (block) {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addImport("import_supervisor", IMPORT_SUPERVISOR);
    Blockly.Python.addConstant("galaxia_wifi_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_WIFI_INIT);
    Blockly.Python.addConstant("galaxia_http_init", FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_HTTP_INIT);
    var branchCode = Blockly.Python.statementToCode(block, "DO") || "";
    var reload = Blockly.Python.valueToCode(block, "RELOAD", Blockly.Python.ORDER_NONE) || 10;
    // re-indent statemnt
    branchCode = Blockly.Python.INDENT + branchCode;
    var regex = new RegExp("\n", "g");
    branchCode = branchCode.replace(regex, "\n" + Blockly.Python.INDENT);
    branchCode = branchCode.substring(Blockly.Python.INDENT.length);
    var replace = "\n" + Blockly.Python.INDENT;
    var regex = new RegExp(replace, "g");
    branchCode = branchCode.replace(regex, "\n");
    var get_request = Blockly.Python.INDENT + "thgz_response = ''"
    var globalVar = Blockly.Python.getUsedGlobalVarInBlock(block, branchCode)
    var defEvent = "def index_page():" + NEWLINE
        + globalVar + get_request + NEWLINE
        + branchCode
        + Blockly.Python.INDENT + "http.respond_with_html(thgz_response, template=\"autoreload.html\", tags=[(\"reload\", " + reload * 1000 + ")])" + NEWLINE;
    var callEvent = 'http.add_web_page_url("", index_page)' + NEWLINE + "web_pages = lambda: http.handle_web_pages()" + NEWLINE + "supervisor.set_background_user_callback(web_pages)";
    Blockly.Python.codeFunctions_["%user_callback"] = defEvent;
    Blockly.Python.userOnStart_["%user_callback"] = callEvent;
    return "";
};

Blockly.Python.network_galaxia_simpleHttp_add_to_page = function (block) {
    var VALUE = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
    return "thgz_response += " + VALUE + " + '<br>'" + NEWLINE;
};

Blockly.Python.network_galaxia_simpleHttp_add_button_to_page = function (block) {
    var VALUE = Blockly.Python.valueToCode(block, "TITLE", Blockly.Python.ORDER_NONE) || "''";
    var CMD = Blockly.Python.valueToCode(block, "CMD", Blockly.Python.ORDER_NONE) || "''";
    CMD = CMD.replace(/'/g, '"')
    VALUE = VALUE.replace(/'/g, "")
    return "thgz_response += '<button onclick=\\'fetch(\"/\"+" + CMD + ")\\'>" + VALUE + "</button><br>'" + NEWLINE;
};

// Simple MQTT

Blockly.Python.network_galaxia_simple_mqtt_connect_complete = function (block) {
    Blockly.Python.addImport("simple_wifi", IMPORT_SIMPLE_WIFI);
    Blockly.Python.addImport("simple_mqtt", IMPORT_SIMPLE_MQTT);
    Blockly.Python.addImport("import_supervisor", IMPORT_SUPERVISOR);
    if (!Blockly.Python.codeFunctions_["%simple_mqtt_on_disconnect"] || !Blockly.Python.codeFunctions_["%simple_mqtt_on_disconnect"].length) {
        Blockly.Python.codeFunctions_["%simple_mqtt_on_disconnect"] = "def simple_mqtt_on_disconnected():" + NEWLINE + Blockly.Python.INDENT + "pass" + NEWLINE
    }
    if (!Blockly.Python.codeFunctions_["%simple_mqtt_on_connect"] || !Blockly.Python.codeFunctions_["%simple_mqtt_on_connect"].length) {
        Blockly.Python.codeFunctions_["%simple_mqtt_on_connect"] = "def simple_mqtt_on_connected():" + NEWLINE + Blockly.Python.INDENT + "pass" + NEWLINE
    }
    if (!Blockly.Python.codeFunctions_["%simple_mqtt_on_message"] || !Blockly.Python.codeFunctions_["%simple_mqtt_on_message"].length) {
        Blockly.Python.codeFunctions_["%simple_mqtt_on_message"] = "def simple_mqtt_on_message(topic, message):" + NEWLINE + Blockly.Python.INDENT + "pass" + NEWLINE
    }
    var broker = Blockly.Python.valueToCode(block, "BROKER", Blockly.Python.ORDER_NONE) || "''";
    var username = Blockly.Python.valueToCode(block, "USERNAME", Blockly.Python.ORDER_NONE) || "''";
    var password = Blockly.Python.valueToCode(block, "PASSWORD", Blockly.Python.ORDER_NONE) || "''";
    var port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_NONE) || 1883;
    Blockly.Python.userOnStart_["%simple_mqtt_instance"] = 'simpleMqtt = simple_mqtt.SimpleMQTT(' + username + ', ' + password + ', ' + broker + ', ' + port + ', simple_wifi._simple_tcp_socket_pool, simple_mqtt_on_connected, simple_mqtt_on_disconnected, simple_mqtt_on_message)'
    Blockly.Python.userOnStart_["%simple_mqtt_cb"] = 'simpleMqttCb = lambda: simpleMqtt.process()'
    Blockly.Python.userOnStart_["%simple_mqtt_supervisor"] = 'supervisor.add_background_user_callback(simpleMqttCb)'
    return "simpleMqtt.connect()" + NEWLINE;
};

Blockly.Python.network_galaxia_simple_mqtt_subscribe = function (block) {
    var topic = Blockly.Python.valueToCode(block, "TOPIC", Blockly.Python.ORDER_NONE) || "''";
    return "simpleMqtt.subscribe(" + topic + ")" + NEWLINE;
};

Blockly.Python.network_galaxia_simple_mqtt_publish = function (block) {
    var topic = Blockly.Python.valueToCode(block, "TOPIC", Blockly.Python.ORDER_NONE) || "''";
    var message = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "''";
    return "simpleMqtt.publish(" + topic + ", " + message + ")" + NEWLINE;
};

Blockly.Python.network_galaxia_simple_mqtt_receive = function (block) {
    var branchCode = Blockly.Python.statementToCode(block, "DO") || "";
    var topic = Blockly.Python.nameDB_.getName(block.getFieldValue("TOPIC"), Blockly.VARIABLE_CATEGORY_NAME);
    var message = Blockly.Python.nameDB_.getName(block.getFieldValue("VALUE"), Blockly.VARIABLE_CATEGORY_NAME);
    var globalVar = Blockly.Python.getUsedGlobalVarInBlock(block, branchCode, [topic, message]);
    var defEvent = "def simple_mqtt_on_message(" + topic + "," + message + "):" + NEWLINE
        + globalVar + (globalVar.length ? NEWLINE : "")
        + (branchCode.length ? branchCode : Blockly.Python.INDENT + "pass" + NEWLINE);
    Blockly.Python.codeFunctions_["%simple_mqtt_on_message"] = defEvent;
    return "";
};

Blockly.Python.network_galaxia_simple_mqtt_on_connect = function (block) {
    var branchCode = Blockly.Python.statementToCode(block, "DO") || "";
    var globalVar = Blockly.Python.getUsedGlobalVarInBlock(block, branchCode)
    var defEvent = "def simple_mqtt_on_connected():" + NEWLINE
        + globalVar + (globalVar.length ? NEWLINE : "")
        + (branchCode.length ? branchCode : Blockly.Python.INDENT + "pass" + NEWLINE);
    Blockly.Python.codeFunctions_["%simple_mqtt_on_connect"] = defEvent;
    return "";
};

Blockly.Python.network_galaxia_simple_mqtt_on_disconnect = function (block) {
    var branchCode = Blockly.Python.statementToCode(block, "DO") || "";
    var globalVar = Blockly.Python.getUsedGlobalVarInBlock(block, branchCode)
    var defEvent = "def simple_mqtt_on_disconnected():" + NEWLINE
        + globalVar + (globalVar.length ? NEWLINE : "")
        + (branchCode.length ? branchCode : Blockly.Python.INDENT + "pass" + NEWLINE)
    Blockly.Python.codeFunctions_["%simple_mqtt_on_disconnect"] = defEvent;
    return "";
};
