/**
 * @fileoverview Actuators generators for Photon.
 */

Blockly.Python.actuators_go = function (block) {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    const direction = block.getFieldValue("DIRECTION");
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE);
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    return `photon.go_${direction}(${distance}, ${speed})` + NEWLINE;
};

Blockly.Python.actuators_go_infinity = function (block) {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    const direction = block.getFieldValue("DIRECTION");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    return `photon.go_${direction}_infinity(${speed})` + NEWLINE;
};

Blockly.Python.actuators_rotate = function (block) {
    Blockly.Python.addImport('photon', IMPORT_PHOTON); 
    const direction = block.getFieldValue("DIRECTION");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE);
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    return `photon.rotate_${direction}(${angle}, ${speed})` + NEWLINE;
};

Blockly.Python.actuators_rotate_infinity = function (block) {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    const direction = block.getFieldValue("DIRECTION");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    return `photon.rotate_${direction}_infinity(${speed})` + NEWLINE;
};

Blockly.Python.actuators_stop = function () {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    return `photon.stop()` + NEWLINE;
};

Blockly.Python.actuators_follow_line = function () {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    return `photon.follow_line()` + NEWLINE;
};