/**
 * @fileoverview Display generators for Codey.
 */

Blockly.Python.display_showRGB = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "255";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "255";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "255";
    return `led.show(${r}, ${g}, ${b})` + NEWLINE;
};

Blockly.Python.display_setRed = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "255";
    return `led.set_red(${r})` + NEWLINE;
};

Blockly.Python.display_setGreen = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "255";
    return `led.set_green(${g})` + NEWLINE;
};

Blockly.Python.display_setBlue = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "255";
    return `led.set_blue(${b})` + NEWLINE;
};

Blockly.Python.display_off = function () {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    return "led.off()" + NEWLINE;
};

// Face panel

Blockly.Python.display_show = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "'Hello'";
    return `display.show(${text})` + NEWLINE;
};

Blockly.Python.display_setPixel = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "'white'";
    return `display.set_pixel(${x}, ${y}, ${state})` + NEWLINE;
};

Blockly.Python.display_getPixel = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    return [`display.get_pixel(${x}, ${y})`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.display_togglePixel = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    return `display.toggle_pixel(${x}, ${y})` + NEWLINE;
};

Blockly.Python.display_clear = function () {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    return "display.clear()" + NEWLINE;
};