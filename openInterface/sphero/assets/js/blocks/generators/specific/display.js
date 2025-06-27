/**
 * @fileoverview Display generators for Sphero
 */

Blockly.Python.display_set_main_LED_RGB = function (block) {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    const red = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE);
    const green = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE);
    const blue = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE);
    return `sm.setLEDColor(${red}, ${green}, ${blue})` + NEWLINE;
};

Blockly.Python.display_set_main_LED_RGB_palette = function (block) {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    const colour = Blockly.Python.valueToCode(block, "COLOUR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    return `sm.setLEDColor(${colour[0]},${colour[1]},${colour[2]})` + NEWLINE;
};

Blockly.Python.display_set_main_LED_RGB_fade = function (block) {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('fade_in', FUNCTIONS_SPHERO['DEF_FADE_IN']);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    const from = Blockly.Python.valueToCode(block, "FROM", Blockly.Python.ORDER_NONE).replace("(", "[").replace(")", "]");
    const to = Blockly.Python.valueToCode(block, "TO", Blockly.Python.ORDER_NONE).replace("(", "[").replace(")", "]");
    const time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE);
    return `fade_in(${from}, ${to}, ${time})` + NEWLINE;
};

Blockly.Python.display_set_main_LED_RGB_blink = function (block) {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('blink_led', FUNCTIONS_SPHERO['DEF_BLINK_LED']);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    const colour = Blockly.Python.valueToCode(block, "COLOUR", Blockly.Python.ORDER_NONE).replace("(", "[").replace(")", "]");
    const time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE);
    const counter = Blockly.Python.valueToCode(block, "COUNTER", Blockly.Python.ORDER_NONE);
    return `blink_led(${colour}, ${time}, ${counter})` + NEWLINE;
};

Blockly.Python.display_set_back_LED_intensity = function (block) {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    const intensity = Blockly.Python.valueToCode(block, "INTENSITY", Blockly.Python.ORDER_NONE);
    return `sm.setBackLEDIntensity(${intensity})` + NEWLINE;
};