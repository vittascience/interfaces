/**
 * @fileoverview Actuators generators for Matatalab.
 */

Blockly.Python.actuators_move = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const dir = block.getFieldValue("DIR");
    const steps = Blockly.Python.valueToCode(block, "STEPS", Blockly.Python.ORDER_NONE) || "1";
    return `matatalab.${dir}(${steps})` + NEWLINE;
};

Blockly.Python.actuators_move_cm = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE) || "10";
    return `matatalab.move(${distance})` + NEWLINE;
};

Blockly.Python.actuators_turn = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const dir = block.getFieldValue("DIR");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "90";
    return `matatalab.turn_${dir}(${angle})` + NEWLINE;
};

Blockly.Python.actuators_setGear = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const wheel = block.getFieldValue("WHEEL");
    const gear = Blockly.Python.valueToCode(block, "GEAR", Blockly.Python.ORDER_NONE) || "0";
    return `matatalab.set_gear("${wheel}", ${gear})` + NEWLINE;
};

Blockly.Python.actuators_setSpeed = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const left = Blockly.Python.valueToCode(block, "LEFT", Blockly.Python.ORDER_NONE) || "0";
    const right = Blockly.Python.valueToCode(block, "RIGHT", Blockly.Python.ORDER_NONE) || "0";
    return `matatalab.set_speed(${left}, ${right})` + NEWLINE;
};

Blockly.Python.actuators_stop = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const wheel = block.getFieldValue("WHEEL");
    return `matatalab.stop("${wheel}")` + NEWLINE;
};

Blockly.Python.actuators_dance = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "1";
    return `matatalab.dance(${id})` + NEWLINE;
};

Blockly.Python.actuators_action = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "1";
    return `matatalab.action(${id})` + NEWLINE;
};
