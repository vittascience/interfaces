/**
 * @fileoverview Robots generators for Codey.
 */

// MOTION

Blockly.Python.robots_stop = function () {
    Blockly.Python.addImport('rocky', IMPORT_ROCKY);
    return "stop()" + NEWLINE;
};

Blockly.Python.robots_move = function (block) {
    Blockly.Python.addImport('rocky', IMPORT_ROCKY);
    const direction = block.getFieldValue("DIRECTION");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC) || "0";
    return `${direction}(${speed})` + NEWLINE;
};

Blockly.Python.robots_drive = function (block) {
    Blockly.Python.addImport('rocky', IMPORT_ROCKY);
    const leftSpeed = Blockly.Python.valueToCode(block, "LEFT_SPEED", Blockly.Python.ORDER_ATOMIC) || "0";
    const rightSpeed = Blockly.Python.valueToCode(block, "RIGHT_SPEED", Blockly.Python.ORDER_ATOMIC) || "0";
    return `drive(${leftSpeed}, ${rightSpeed})` + NEWLINE;
};

Blockly.Python.robots_turnByDegree = function (block) {
    Blockly.Python.addImport('rocky', IMPORT_ROCKY);
    const direction = block.getFieldValue("DIRECTION");
    const degrees = Blockly.Python.valueToCode(block, "DEGREES", Blockly.Python.ORDER_ATOMIC) || "0";
    return `turn_${direction}_by_degree(${degrees})` + NEWLINE;
};

// SENSORS

Blockly.Python.robots_sensors_get_rgb = function (block) {
    Blockly.Python.addImport('rocky', IMPORT_ROCKY);
    const color = block.getFieldValue("COLOR");
    return [`color_ir_sensor.get_${color}()`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.robots_sensors_is_color = function (block) {
    Blockly.Python.addImport('rocky', IMPORT_ROCKY);
    const color = block.getFieldValue("COLOR");
    return [`color_ir_sensor.is_color('${color}')`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.robots_sensors_get_light = function (block) {
    Blockly.Python.addImport('rocky', IMPORT_ROCKY);
    const light_type = block.getFieldValue("LIGHT_TYPE");
    return [`color_ir_sensor.get_${light_type}()`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.robots_sensors_is_obstacle_ahead = function () {
    Blockly.Python.addImport('rocky', IMPORT_ROCKY);
    return [`color_ir_sensor.is_obstacle_ahead`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.robots_sensors_set_led_color = function (block) {
    Blockly.Python.addImport('rocky', IMPORT_ROCKY);
    const color = block.getFieldValue("COLOR");
    return `color_ir_sensor.set_led_color('${color}')` + NEWLINE;
};