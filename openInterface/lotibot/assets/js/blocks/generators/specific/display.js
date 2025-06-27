/**
 * @fileoverview Display generators for Loti-bot.
 */

Blockly.Python.display_set_LEDs_RGB = function (block) {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    const red = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE);
    const green = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE);
    const blue = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE);
    return `lotibot.setLedColor(${red}, ${green}, ${blue}, ${red}, ${green}, ${blue})` + NEWLINE;
};

Blockly.Python.display_set_LEDs_palette = function (block) {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    const colour = Blockly.Python.valueToCode(block, "COLOUR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    return `lotibot.setLedColor(${colour[0]},${colour[1]},${colour[2]},${colour[0]},${colour[1]},${colour[2]})` + NEWLINE;
};

Blockly.Python.display_set_LED_RGB = function (block) {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    const red_left = Blockly.Python.valueToCode(block, "L_R", Blockly.Python.ORDER_NONE);
    const green_left = Blockly.Python.valueToCode(block, "L_G", Blockly.Python.ORDER_NONE);
    const blue_left = Blockly.Python.valueToCode(block, "L_B", Blockly.Python.ORDER_NONE);
    const red_right = Blockly.Python.valueToCode(block, "R_R", Blockly.Python.ORDER_NONE);
    const green_right = Blockly.Python.valueToCode(block, "R_G", Blockly.Python.ORDER_NONE);
    const blue_right = Blockly.Python.valueToCode(block, "R_B", Blockly.Python.ORDER_NONE);
    return `lotibot.setLedColor(${red_left},${green_left},${blue_left},${red_right},${green_right},${blue_right})` + NEWLINE;
};

Blockly.Python.display_set_LED_palette = function (block) {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    const colour_left = Blockly.Python.valueToCode(block, "COLOUR_LEFT", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    const colour_right = Blockly.Python.valueToCode(block, "COLOUR_RIGHT", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    return `lotibot.setLedColor(${colour_left[0]},${colour_left[1]},${colour_left[2]},${colour_right[0]},${colour_right[1]},${colour_right[2]})` + NEWLINE;
};

Blockly.Python.display_set_headlights = function (block) {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    const pwm = Blockly.Python.valueToCode(block, "PWM", Blockly.Python.ORDER_NONE);
    return `lotibot.setHeadlightValue(${pwm}, ${pwm})` + NEWLINE;
};

Blockly.Python.display_set_headlight = function (block) {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    const pwm_left = Blockly.Python.valueToCode(block, "PWM_LEFT", Blockly.Python.ORDER_NONE);
    const pwm_right = Blockly.Python.valueToCode(block, "PWM_RIGHT", Blockly.Python.ORDER_NONE);
    return `lotibot.setHeadlightValue(${pwm_left}, ${pwm_right})` + NEWLINE;
};