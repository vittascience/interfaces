/**
 * @fileoverview Network generators for CyberPi.
 */

// Wifi - connect
Blockly.Python.cyberpi_wifi_connect = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const ssid = Blockly.Python.valueToCode(block, "SSID", Blockly.Python.ORDER_NONE) || "''";
    const password = Blockly.Python.valueToCode(block, "PASSWORD", Blockly.Python.ORDER_NONE) || "''";
    return "cyberpi.wifi.connect(" + ssid + ", " + password + ")" + NEWLINE;
};

// Wifi - is connected
Blockly.Python.cyberpi_wifi_is_connect = function () {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    return ["cyberpi.wifi.is_connect()", Blockly.Python.ORDER_ATOMIC];
};

// Wifi - is connected
Blockly.Python.cyberpi_wifi_disconnect = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const action = block.getFieldValue('ACTION');
    return "cyberpi.wifi." + action + "()" + NEWLINE;
};

// LAN Broadcast - set message
Blockly.Python.cyberpi_wifi_broadcast_set = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const message_name = Blockly.Python.valueToCode(block, "MESSAGE_NAME", Blockly.Python.ORDER_NONE) || "''";
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "None";
    return "cyberpi.wifi_broadcast.set(" + message_name + ", " + value + ")" + NEWLINE;
};

// LAN Broadcast - get message
Blockly.Python.cyberpi_wifi_broadcast_get = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const message_name = Blockly.Python.valueToCode(block, "MESSAGE_NAME", Blockly.Python.ORDER_NONE) || "''";
    return ["cyberpi.wifi_broadcast.get(" + message_name + ")", Blockly.Python.ORDER_ATOMIC];
};
