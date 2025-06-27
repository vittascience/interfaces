/**
 * @fileoverview Sensors generators for CyberPi.
 */

// CyberPi board sensors

Blockly.Python.sensors_esp32_hall_sensor = function () {
    Blockly.Python.addImport('esp32', IMPORT_ESP32);
    return ["esp32.hall_sensor()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_esp32_raw_temperature = function (block) {
    Blockly.Python.addImport('esp32', IMPORT_ESP32);
    let code = "";
    switch (block.getFieldValue("UNIT")) {
        case "CELSIUS":
            code += "(esp32.raw_temperature()-32)*5/9";
            break;
        case "KELVIN":
            code += "(esp32.raw_temperature()-32)*5/9 + 273.15";
            break;
        case "FAHRENHEIT":
            code += "esp32.raw_temperature()";
            break;
        default: 
            code += "esp32.raw_temperature()";
            break;
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_cyberpi_get_bri = function () {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    return ["cyberpi.get_bri()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_cyberpi_get_loudness = function () {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    return ["cyberpi.get_loudness('maximum')", Blockly.Python.ORDER_ATOMIC];
};