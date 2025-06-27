/**
 * @fileoverview Display generators for Esp32.
 */

// Screens

Blockly.Python.display_lcdSetText = function (block) {
    Blockly.Python.addImport('lcd1602', IMPORT_LCD1602);
    Blockly.Python.addInit('lcd1602', "lcd = LCD1602()");
    let txt = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    let line = block.getFieldValue("LINE");
    let position = block.getFieldValue("POS");
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
        return "lcd.setCursor(" + line + ", " + position + ")" + NEWLINE + "lcd.writeTxt(" + txt + ")" + NEWLINE;
    } else {
        return "lcd.setCursor(" + line + ", " + position + ")" + NEWLINE + "lcd.writeTxt(str(" + txt + "))" + NEWLINE;
    }
};

Blockly.Python.display_lcdClear = function () {
    Blockly.Python.addImport('lcd1602', IMPORT_LCD1602);
    Blockly.Python.addInit('lcd1602', "lcd = LCD1602()");
    return "lcd.clear()" + NEWLINE;
};

// NEOPIXEL

Blockly.Python.display_defineNeopixel = function (block) {

    let ledCount = block.getFieldValue("N");
    let pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    // Blockly.Python.addInit('neopixel_' + pin, "# Neopixel on " + pin);
    Blockly.Python.addInit("neopixel_", `np_${pin} = neopixel.NeoPixel(${pin}, ${ledCount})`);
    return "";
};

Blockly.Python.display_controlNeopixelLed = function (block) {
    let pin = block.getFieldValue("PIN");
    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    var r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    var g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    var b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    // Blockly.Python.addImport('neopixel_color', IMPORT_NEOPIXEL_COLOR);
    // Blockly.Python.addInit('neopixel_' + pin, "# Neopixel on " + pin);
    Blockly.Python.addInit("neopixel_", `np_${pin} = neopixel.NeoPixel(${pin}, ${led})`);
    // Blockly.Python.addInit("neopixel_color", `color = np_${pin}.set_color(${r}, ${g}, ${b})`);
    return `color = np_${pin}.set_color(${r}, ${g}, ${b})`+NEWLINE +`np_${pin}.setPixelColor(${led}, color)` + NEWLINE + `np_${pin}.show()` + NEWLINE;
};

Blockly.Python.display_controlColorNeopixelLed = function (block) {
    let pin = block.getFieldValue("PIN");
    let led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    let colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    // Blockly.Python.addImport('neopixel_color', IMPORT_NEOPIXEL_COLOR);
    // Blockly.Python.addInit('neopixel_' + pin, "# Neopixel on " + pin);
    Blockly.Python.addInit("neopixel_", `np_${pin} = neopixel.NeoPixel(${pin}, ${led})`);
    return `color = np_${pin}.set_color${colour}`+NEWLINE+`np_${pin}.setPixelColor(${led}, color)` + NEWLINE + `np_${pin}.show()` + NEWLINE;
};

Blockly.Python.display_neopixel_controlAllLedRGB = function (block) {
    let pin = block.getFieldValue("PIN");
    var r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    var g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    var b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    // Blockly.Python.addImport('neopixel_color', IMPORT_NEOPIXEL_COLOR);
    // Blockly.Python.addInit('neopixel_' + pin, "# Neopixel on " + pin);
    Blockly.Python.addInit("neopixel_", `np_${pin} = neopixel.NeoPixel(${pin}, 1)`);
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_RASPBERRY.DEF_NEOPIXEL_SHOW_ALL_LED);
    return `neopixel_showAllLed(np_${pin}, np_${pin}.numPixels() ,${r}, ${g}, ${b})` + NEWLINE;
};

Blockly.Python.display_neopixel_controlAllLedPalette = function (block) {
    let pin = block.getFieldValue("PIN");
    let colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    let colourList = colour.match(/([0-9]{1,3})/g);
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    // Blockly.Python.addImport('neopixel_color', IMPORT_NEOPIXEL_COLOR);
    // Blockly.Python.addInit('neopixel_' + pin, "# Neopixel on " + pin);
    Blockly.Python.addInit("neopixel_", `np_${pin} = neopixel.NeoPixel(${pin}, 1)`);
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_RASPBERRY.DEF_NEOPIXEL_SHOW_ALL_LED);
    return `neopixel_showAllLed(np_${pin}, np_${pin}.numPixels() ,${colourList[0]}, ${colourList[1]}, ${colourList[2]})` + NEWLINE;
};

// Blockly.Python.display_rainbowNeopixel = function (block) {
//     let pin = block.getFieldValue("PIN");
//     Blockly.Python.addImport('utime', IMPORT_UTIME);
//     Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_GALAXIA.DEF_NEOPIXEL_SHOW_ALL_LED);
//     if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
//         Blockly.Python.neopixel_codeInitialization(block, pin, "30");
//     }
//     Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_GALAXIA.DEF_NEOPIXEL_RAINBOW);
//     return "neopixel_rainbow(np_" + pin.substr(1) + ", " + NEOPIXEL_LED_COUNT + pin.substr(1) + ")" + NEWLINE;
// };