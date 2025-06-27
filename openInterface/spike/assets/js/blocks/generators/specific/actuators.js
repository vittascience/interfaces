/**
 * @fileoverview Actuators generators for Lego Spike.
 */

Blockly.Python.actuators_startMotorContinuous = function (block) {
    Blockly.Python.addImport('port', IMPORT_PORT);
    Blockly.Python.addImport('motor', IMPORT_MOTOR);
    const port = block.getFieldValue("PORT");
    const dir = block.getFieldValue("DIR");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 100) speed = 100;
    if (speed < 0) speed = 0;
    return `motor.run(port.${port}, ${dir === "forward" ? speed : -speed})` + NEWLINE;
};

Blockly.Python.actuators_startMotorForTime = function (block) {
    Blockly.Python.addImport('port', IMPORT_PORT);
    Blockly.Python.addImport('motor', IMPORT_MOTOR);
    const port = block.getFieldValue("PORT");
    const dir = block.getFieldValue("DIR");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 100) speed = 100;
    if (speed < 0) speed = 0;
    const time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    return `motor.run_for_time(port.${port}, ${dir === "forward" ? speed : -speed}, ${time * 1000})` + NEWLINE;
};

Blockly.Python.actuators_moveMotorToPosition = function (block) {
    Blockly.Python.addImport('port', IMPORT_PORT);
    Blockly.Python.addImport('motor', IMPORT_MOTOR);
    const port = block.getFieldValue("PORT");
    let angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    if (angle > 360) angle = 360;
    if (angle < 0) angle = 0;
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 100) speed = 100;
    if (speed < 0) speed = 0;
    return `motor.run_to_relative_position(port.${port}, ${angle}, ${speed})` + NEWLINE;
};

Blockly.Python.actuators_moveMotorByDegrees = function (block) {
    Blockly.Python.addImport('port', IMPORT_PORT);
    Blockly.Python.addImport('motor', IMPORT_MOTOR);
    const port = block.getFieldValue("PORT");
    const dir = block.getFieldValue("DIR");
    let angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    if (angle > 360) angle = 360;
    if (angle < 0) angle = 0;
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 100) speed = 100;
    if (speed < 0) speed = 0;
    return `motor.run_to_absolute_position(port.${port}, ${angle}, ${dir === "forward" ? speed : -speed})` + NEWLINE;
};

Blockly.Python.actuators_stopMotor = function (block) {
    Blockly.Python.addImport('port', IMPORT_PORT);
    Blockly.Python.addImport('motor', IMPORT_MOTOR);
    const port = block.getFieldValue("PORT");
    return `motor.stop(port.${port})` + NEWLINE;
};