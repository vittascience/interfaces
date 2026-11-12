/**
 * @fileoverview Sensors generators for Lego Spike Prime.
 */

// code of a sensor read: `module.function(port.X)`, the import of the module is done by addImport
const legoPrimeSensorCode = (block, addImport, call) => {
    Blockly.Python.addImport('port', IMPORT_PORT);
    addImport();
    return [`${call}(port.${block.getFieldValue("PORT")})`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.sensors_color = function (block) {
    return legoPrimeSensorCode(block, () => Blockly.Python.addImport('color_sensor', IMPORT_COLOR_SENSOR), "color_sensor.color");
};

Blockly.Python.sensors_colorDetection = function (block) {
    Blockly.Python.addImport('color', IMPORT_COLOR);
    const [code] = legoPrimeSensorCode(block, () => Blockly.Python.addImport('color_sensor', IMPORT_COLOR_SENSOR), "color_sensor.color");
    return [`${code} == color.${block.getFieldValue("COLOR")}`, Blockly.Python.ORDER_RELATIONAL];
};

Blockly.Python.sensors_reflection = function (block) {
    return legoPrimeSensorCode(block, () => Blockly.Python.addImport('color_sensor', IMPORT_COLOR_SENSOR), "color_sensor.reflection");
};

Blockly.Python.sensors_distance = function (block) {
    return legoPrimeSensorCode(block, () => Blockly.Python.addImport('distance_sensor', IMPORT_DISTANCE_SENSOR), "distance_sensor.distance");
};

Blockly.Python.sensors_force = function (block) {
    return legoPrimeSensorCode(block, () => Blockly.Python.addImport('force_sensor', IMPORT_FORCE_SENSOR), "force_sensor.force");
};

Blockly.Python.sensors_forcePressed = function (block) {
    return legoPrimeSensorCode(block, () => Blockly.Python.addImport('force_sensor', IMPORT_FORCE_SENSOR), "force_sensor.pressed");
};

Blockly.Python.sensors_motorPosition = function (block) {
    return legoPrimeSensorCode(block, () => Blockly.Python.addImport('motor', IMPORT_MOTOR), "motor.relative_position");
};

// tilt_angles() gives decidegrees: yaw, pitch, roll
Blockly.Python.sensors_tilt = function (block) {
    Blockly.Python.addImport('motion_sensor', IMPORT_MOTION_SENSOR);
    return [`motion_sensor.tilt_angles()[${block.getFieldValue("AXIS")}] / 10`, Blockly.Python.ORDER_MULTIPLICATIVE];
};

// pressed() returns the press duration in ms
Blockly.Python.sensors_hubButton = function (block) {
    Blockly.Python.addImport('button', IMPORT_BUTTON);
    return [`button.pressed(button.${block.getFieldValue("BUTTON")}) > 0`, Blockly.Python.ORDER_RELATIONAL];
};
