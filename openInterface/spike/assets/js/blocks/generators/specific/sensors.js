/**
 * @fileoverview Sensors generators for Lego Spike.
 */

Blockly.Python.sensors_color = function (block) {
    Blockly.Python.addImport('port', IMPORT_PORT);
    Blockly.Python.addImport('color-sensor', IMPORT_COLOR_SENSOR);
    const port = block.getFieldValue("PORT");
    return [`color_sensor.color(port.${port})`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.sensors_colorDetection = function (block) {
    Blockly.Python.addImport('port', IMPORT_PORT);
    Blockly.Python.addImport('color-sensor', IMPORT_COLOR_SENSOR);
    const port = block.getFieldValue("PORT");
    const color = block.getFieldValue("COLOR");
    return [`color_sensor.color(port.${port}) == '${color}'`, Blockly.Python.ORDER_NONE];
};