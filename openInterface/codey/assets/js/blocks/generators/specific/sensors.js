/**
 * @fileoverview Sensors generators for Codey.
 */

// MOTION SENSOR

Blockly.Python.sensors_getRotationEulerAngles = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const axis = block.getFieldValue("AXIS");
    return [`motion_sensor.get_${axis}()`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.sensors_getRotation = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const axis = block.getFieldValue("AXIS");
    return [`motion_sensor.get_rotation('${axis}')`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.sensors_resetRotation = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const axis = block.getFieldValue("AXIS");
    return `motion_sensor.reset_rotation(${axis})` + NEWLINE;
};

Blockly.Python.sensors_isShaked = function () {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    return ["motion_sensor.is_shaked()", Blockly.Python.ORDER_NONE];
};

Blockly.Python.sensors_getShakeStrength = function () {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    return ["motion_sensor.get_shake_strength()", Blockly.Python.ORDER_NONE];
};

Blockly.Python.sensors_getPosition = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const position = block.getFieldValue("POSITION");
    return [`motion_sensor.is_${position}()`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.sensors_getAcceleration = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const axis = block.getFieldValue("AXIS");
    return [`motion_sensor.get_acceleration('${axis}')`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.sensors_getGyroscope = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const axis = block.getFieldValue("AXIS");
    return [`motion_sensor.get_gyroscope('${axis}')`, Blockly.Python.ORDER_NONE];
};

// SOUND SENSOR

Blockly.Python.sensors_get_loudness = function () {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    return ["sound_sensor.sound_sensor.get_loudness()", Blockly.Python.ORDER_NONE];
};

// LIGHT SENSOR

Blockly.Python.sensors_get_light = function () {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    return ["light_sensor.light_sensor.get_value()", Blockly.Python.ORDER_NONE];
};

// BATTERY SENSOR

Blockly.Python.sensors_get_battery_percentage = function () {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    return ["codey.battery_sensor.get_percentage()", Blockly.Python.ORDER_NONE];
};