/**
 * @fileoverview Actuators generators for Loti-bot.
 */

Blockly.Python.actuators_set_motors = function (block) {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    const direction = block.getFieldValue('DIRECTION');
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE);
    const speed = block.getFieldValue('SPEED');
    return `lotibot.move${direction}(${distance * 10}, '${speed}')` + NEWLINE;
};

Blockly.Python.actuators_rotate_with_angle = function (block) {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    const speed = block.getFieldValue('SPEED');
    const direction = block.getFieldValue('DIRECTION');
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE);
    return `lotibot.turn${direction}(${angle}, '${speed}')` + NEWLINE;
};

Blockly.Python.actuators_draw_square = function (block) {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE);
    return `lotibot.drawSquare(${distance * 10})` + NEWLINE;
};

Blockly.Python.actuators_stop = function (block) {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    return `lotibot.stop()` + NEWLINE;
};

Blockly.Python.actuators_play_sound = function (block) {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    const sound = block.getFieldValue('SOUND');
    return `lotibot.playSound(${sound})` + NEWLINE;
};