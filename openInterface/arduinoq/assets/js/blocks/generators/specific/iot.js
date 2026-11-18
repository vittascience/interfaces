/**
 * @fileoverview Python generators of the connected objects (Linux part of the Arduino UNO Q): Shelly plug over Wi-Fi or Bluetooth.
 * The functions are in FUNCTIONS_ARDUINO_Q.py (constants/generators/functions.js).
 */

// SHELLY PLUG: Wi-Fi (HTTP API of the plug on the local network)

Blockly.Python.iot_shelly_wifi_switch = function (block) {
    const ip = Blockly.Python.valueToCode(block, "IP", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addFunction('shelly_wifi', FUNCTIONS_ARDUINO_Q.py.DEF_SHELLY_WIFI);
    return "shelly_wifi_switch(" + ip + ", '" + block.getFieldValue("ACTION") + "')" + NEWLINE;
};

Blockly.Python.iot_shelly_wifi_is_on = function (block) {
    const ip = Blockly.Python.valueToCode(block, "IP", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addFunction('shelly_wifi', FUNCTIONS_ARDUINO_Q.py.DEF_SHELLY_WIFI);
    return ["shelly_wifi_is_on(" + ip + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.iot_shelly_wifi_measure = function (block) {
    const ip = Blockly.Python.valueToCode(block, "IP", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addFunction('shelly_wifi', FUNCTIONS_ARDUINO_Q.py.DEF_SHELLY_WIFI);
    return ["shelly_wifi_measure(" + ip + ", '" + block.getFieldValue("MEASURE") + "')", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.iot_shelly_wifi_start_pairing = function (block) {
    const ip = Blockly.Python.valueToCode(block, "IP", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addFunction('shelly_wifi', FUNCTIONS_ARDUINO_Q.py.DEF_SHELLY_WIFI);
    return "shelly_wifi_start_pairing(" + ip + ")" + NEWLINE;
};

// SHELLY PLUG: Bluetooth (RPC over Bluetooth of the Shelly Gen2+ devices, BLE client of the Bluetooth brick)

Blockly.Python.IOT_SHELLY_BLE = function () {
    Blockly.Python.BRICKS_BLE();
    Blockly.Python.addImport('json', IMPORT_JSON);
    Blockly.Python.addFunction('shelly_ble', FUNCTIONS_ARDUINO_Q.py.DEF_SHELLY_BLE);
};

Blockly.Python.iot_shelly_ble_pair = function (block) {
    const name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_NONE) || "'Shelly'";
    Blockly.Python.IOT_SHELLY_BLE();
    return "shelly_pair(" + name + ")" + NEWLINE;
};

Blockly.Python.iot_shelly_ble_switch = function (block) {
    const name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_NONE) || "'Shelly'";
    Blockly.Python.IOT_SHELLY_BLE();
    return "shelly_switch(" + name + ", '" + block.getFieldValue("ACTION") + "')" + NEWLINE;
};

Blockly.Python.iot_shelly_ble_is_on = function (block) {
    const name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_NONE) || "'Shelly'";
    Blockly.Python.IOT_SHELLY_BLE();
    return ["shelly_is_on(" + name + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.iot_shelly_ble_measure = function (block) {
    const name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_NONE) || "'Shelly'";
    Blockly.Python.IOT_SHELLY_BLE();
    return ["shelly_measure(" + name + ", '" + block.getFieldValue("MEASURE") + "')", Blockly.Python.ORDER_FUNCTION_CALL];
};
