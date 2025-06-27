/**
 * @fileoverview Sensors generators for Photon.
 */

Blockly.Python.sensors_get_distance_from_obstacle = function () {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    return [`photon.get_distance_from_obstacle()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_get_light = function () {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    return [`photon.get_light()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_get_battery = function () {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    return [`photon.get_battery()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_get_line_sensors = function (block) {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    return [`photon.get_line_sensors()[${block.getFieldValue('SENSOR')}]`, Blockly.Python.ORDER_ATOMIC];
};