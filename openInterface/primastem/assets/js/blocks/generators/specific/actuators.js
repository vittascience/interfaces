/**
 * @fileoverview Actuators generators for primaSTEM.
 */

Blockly.Python.actuators_move_forward = function () {
    Blockly.Python.addImport('primastem', IMPORT_PRIMASTEM);
    return `primastem.moveForward()` + NEWLINE;
};

Blockly.Python.actuators_move_backward = function () {
    Blockly.Python.addImport('primastem', IMPORT_PRIMASTEM);
    return `primastem.moveBackward()` + NEWLINE;
};

Blockly.Python.actuators_move_forward_distance = function (block) {
    Blockly.Python.addImport('primastem', IMPORT_PRIMASTEM);
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE);
    return `primastem.moveForward(${distance})` + NEWLINE;
};

Blockly.Python.actuators_move_backward_distance = function (block) {
    Blockly.Python.addImport('primastem', IMPORT_PRIMASTEM);
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE);
    return `primastem.moveBackward(${distance})` + NEWLINE;
};

Blockly.Python.actuators_turnLeft = function (block) {
    Blockly.Python.addImport('primastem', IMPORT_PRIMASTEM);
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE);
    return `primastem.turnLeft(${angle})` + NEWLINE;
};

Blockly.Python.actuators_turnRight = function (block) {
    Blockly.Python.addImport('primastem', IMPORT_PRIMASTEM);
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE);
    return `primastem.turnRight(${angle})` + NEWLINE;
};

Blockly.Python.actuators_play_sound = function (block) {
    Blockly.Python.addImport('primastem', IMPORT_PRIMASTEM);
    const sound = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "0";
    return `primastem.playSound(${sound})` + NEWLINE;
};