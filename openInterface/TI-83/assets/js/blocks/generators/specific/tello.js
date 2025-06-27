/**
 * @fileoverview Tello generators for TI-83 Premium CE.
 */

// Fly

Blockly.Python.tello_takeoff = function () {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    return "tello.takeoff()" + NEWLINE;
};

Blockly.Python.tello_land = function () {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    return "tello.land()" + NEWLINE;
};

Blockly.Python.tello_fly = function (block) {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE) || "0";
    const direction = block.getFieldValue("DIRECTION");
    return "tello." + direction.toLowerCase() + "(" + distance + ")" + NEWLINE;
};

Blockly.Python.tello_turn = function (block) {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const direction = block.getFieldValue("DIRECTION");
    return "tello.turn_" + direction.toLowerCase() + "(" + angle + ")" + NEWLINE;
};

Blockly.Python.tello_flyInHeight = function (block) {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE) || "0";
    const direction = block.getFieldValue("DIRECTION");
    return "tello." + direction.toLowerCase() + "(" + distance + ")" + NEWLINE;
};

Blockly.Python.tello_flyDirection = function (block) {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE) || "0";
    const direction = block.getFieldValue("DIRECTION");
    return "tello.fly_" + direction.toLowerCase() + "(" + distance + ")" + NEWLINE;
};

Blockly.Python.tello_getAltitude = function () {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    return ["tello.altitude()", Blockly.Python.ORDER_ATOMIC];
};
