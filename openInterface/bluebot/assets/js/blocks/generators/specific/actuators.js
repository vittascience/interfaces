/**
 * @fileoverview Actuators generators for Blue-bot.
 */

Blockly.Python.actuators_move_forward = function () {
    Blockly.Python.addImport('bluebot', IMPORT_BLUEBOT);
    Blockly.Python.addInit('bluebot_init', 'bluebot = bluebot()');
    return `bluebot.moveForward()` + NEWLINE;
};

Blockly.Python.actuators_move_backward = function () {
    Blockly.Python.addImport('bluebot', IMPORT_BLUEBOT);
    Blockly.Python.addInit('bluebot_init', 'bluebot = bluebot()');
    return `bluebot.moveBackward()` + NEWLINE;
};

Blockly.Python.actuators_turnLeft = function (block) {
    Blockly.Python.addImport('bluebot', IMPORT_BLUEBOT);
    Blockly.Python.addInit('bluebot_init', 'bluebot = bluebot()');
    const angle = block.getFieldValue("ANGLE");
    return `bluebot.turnLeft('${angle}')` + NEWLINE;
};

Blockly.Python.actuators_turnRight = function (block) {
    Blockly.Python.addImport('bluebot', IMPORT_BLUEBOT);
    Blockly.Python.addInit('bluebot_init', 'bluebot = bluebot()');
    const angle = block.getFieldValue("ANGLE");
    return `bluebot.turnRight('${angle}')` + NEWLINE;
};