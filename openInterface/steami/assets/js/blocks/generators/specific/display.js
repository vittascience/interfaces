/**
 * @fileoverview Display generators for STeaMi.
 */

// OLED display

Blockly.Python.display_steami_addOledText = function (block) {
    const str = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addImport('ssd1327', IMPORT_SSD1327);
    Blockly.Python.addInit('steami_display', "display = ssd1327.WS_OLED_128X128_SPI(machine.SPI(1), pyb.Pin('DATA_COMMAND_DISPLAY'), pyb.Pin('RST_DISPLAY'), pyb.Pin('CS_DISPLAY'))");
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
        return "display.framebuf.text(" + str + ", " + x + ", " + y + ", 255)" + NEWLINE + "display.show()" + NEWLINE;
    } else {
        return "display.framebuf.text(str(" + str + "), " + x + ", " + y + ", 255)" + NEWLINE + "display.show()" + NEWLINE;
    }
};

Blockly.Python.display_steami_setOledPixel = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addImport('ssd1327', IMPORT_SSD1327);
    Blockly.Python.addInit('steami_display', "display = ssd1327.WS_OLED_128X128_SPI(machine.SPI(1), pyb.Pin('DATA_COMMAND_DISPLAY'), pyb.Pin('RST_DISPLAY'), pyb.Pin('CS_DISPLAY'))");
    return "display.pixel(" + x + ", " + y + ", 255*" + state + ")" + NEWLINE + "display.show()" + NEWLINE;
};

Blockly.Python.display_steami_drawOledLine = function (block) {
    const xa = Blockly.Python.valueToCode(block, "XA", Blockly.Python.ORDER_NONE) || "0";
    const ya = Blockly.Python.valueToCode(block, "YA", Blockly.Python.ORDER_NONE) || "0";
    const xb = Blockly.Python.valueToCode(block, "XB", Blockly.Python.ORDER_NONE) || "0";
    const yb = Blockly.Python.valueToCode(block, "YB", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addImport('ssd1327', IMPORT_SSD1327);
    Blockly.Python.addInit('steami_display', "display = ssd1327.WS_OLED_128X128_SPI(machine.SPI(1), pyb.Pin('DATA_COMMAND_DISPLAY'), pyb.Pin('RST_DISPLAY'), pyb.Pin('CS_DISPLAY'))");
    return "display.line(" + xa + ", " + ya + ", " + xb + ", " + yb + ", 1)" + NEWLINE + "display.show()" + NEWLINE;
};

Blockly.Python.display_steami_clearOledScreen = function () {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addImport('ssd1327', IMPORT_SSD1327);
    Blockly.Python.addInit('steami_display', "display = ssd1327.WS_OLED_128X128_SPI(machine.SPI(1), pyb.Pin('DATA_COMMAND_DISPLAY'), pyb.Pin('RST_DISPLAY'), pyb.Pin('CS_DISPLAY'))");
    return "display.fill(0)" + NEWLINE + "display.show()" + NEWLINE;
};

Blockly.Python.display_steami_setOledBackground = function (block) {
    const color = block.getFieldValue("BACKGROUND");
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addImport('ssd1327', IMPORT_SSD1327);
    Blockly.Python.addInit('steami_display', "display = ssd1327.WS_OLED_128X128_SPI(machine.SPI(1), pyb.Pin('DATA_COMMAND_DISPLAY'), pyb.Pin('RST_DISPLAY'), pyb.Pin('CS_DISPLAY'))");
    return "display.invert(" + color + ")" + NEWLINE;
};