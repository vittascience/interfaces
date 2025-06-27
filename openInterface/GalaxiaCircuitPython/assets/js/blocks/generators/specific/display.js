/**
 * @fileoverview Display generators for Galaxia.
 */

// Galaxia - RGB LED

Blockly.Python.display_galaxia_led_set_colors = function (block) {
    const red = Blockly.Python.valueToCode(block, "RED", Blockly.Python.ORDER_NONE) || 0;
    const green = Blockly.Python.valueToCode(block, "GREEN", Blockly.Python.ORDER_NONE) || 0;
    const blue = Blockly.Python.valueToCode(block, "BLUE", Blockly.Python.ORDER_NONE) || 0;
    return "led.set_colors(" + red + ", " + green + ", " + blue + ")" + NEWLINE;
};

Blockly.Python.display_galaxia_led_set_red = function (block) {
    const red = Blockly.Python.valueToCode(block, "RED", Blockly.Python.ORDER_NONE) || 0;
    return "led.set_red(" + red + ")" + NEWLINE;
};

Blockly.Python.display_galaxia_led_set_green = function (block) {
    const green = Blockly.Python.valueToCode(block, "GREEN", Blockly.Python.ORDER_NONE) || 0;
    return "led.set_green(" + green + ")" + NEWLINE;
};

Blockly.Python.display_galaxia_led_set_blue = function (block) {
    const blue = Blockly.Python.valueToCode(block, "BLUE", Blockly.Python.ORDER_NONE) || 0;
    return "led.set_blue(" + blue + ")" + NEWLINE;
};

Blockly.Python.display_galaxia_led_get_red = function () {
    return ["led.get_red()", Blockly.Python.ORDER_NONE];
};

Blockly.Python.display_galaxia_led_get_green = function () {
    return ["led.get_green()", Blockly.Python.ORDER_NONE];
};

Blockly.Python.display_galaxia_led_get_blue = function () {
    return ["led.get_blue()", Blockly.Python.ORDER_NONE];
};

// Galaxia - Graphics

Blockly.Python.display_galaxia_set_mode = function (block) {
    const mode = block.getFieldValue("MODE");
    return "display." + mode + "()" + NEWLINE;
};

Blockly.Python.display_galaxia_plot_add_point = function (block) {
    const point = Blockly.Python.valueToCode(block, "POINT", Blockly.Python.ORDER_NONE) || 0;
    return "display.plot.add_point(" + point + ")" + NEWLINE;
};

Blockly.Python.display_galaxia_plot_set_y_scale = function (block) {
    const min = Blockly.Python.valueToCode(block, "MIN", Blockly.Python.ORDER_NONE) || 0;
    const max = Blockly.Python.valueToCode(block, "MAX", Blockly.Python.ORDER_NONE) || 100;
    return "display.plot.set_y_scale(" + min + "," + max + ")" + NEWLINE;
};

Blockly.Python.display_galaxia_animate_function = function (block) {
    const callbackName = "on_display_animate_cb";
    const branchCode = Blockly.Python.statementToCode(block, "DO");
    const result = Blockly.Python.valueToCode(block, "POINT", Blockly.Python.ORDER_NONE) || 50;
    const interval = Blockly.Python.valueToCode(block, "INTERVAL", Blockly.Python.ORDER_NONE) || 1;
    const globalVar = Blockly.Python.getUsedGlobalVarInBlock(block, branchCode);
    const defEvent = "def " + callbackName + "():" + NEWLINE + globalVar + branchCode + Blockly.Python.INDENT + "return " + result + NEWLINE;
    const callEvent = "display.plot.set_animate_function(" + callbackName + ", " + interval * 1000 + ")";
    Blockly.Python.codeFunctions_["%" + callbackName] = defEvent;
    Blockly.Python.userOnStart_["%" + callbackName] = callEvent;
    return "";
};

// Screens

Blockly.Python.display_lcdSetText = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
    Blockly.Python.addImport('galaxia_lcd_i2c', IMPORT_GALAXIA_LCD_I2C);
    Blockly.Python.addInit('lcd1602', "lcd = LCD1602(i2c=i2c, addr=0x3e)");
    const txt = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    const line = block.getFieldValue("LINE");
    const position = block.getFieldValue("POS");
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
        return "lcd.setCursor(" + position + ", " + line + ")" + NEWLINE + "lcd.writeTxt(" + txt + ")" + NEWLINE;
    } else {
        return "lcd.setCursor(" + position + ", " + line + ")" + NEWLINE + "lcd.writeTxt(str(" + txt + "))" + NEWLINE;
    }
};

Blockly.Python.display_lcdClear = function () {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
    Blockly.Python.addImport('galaxia_lcd_i2c', IMPORT_GALAXIA_LCD_I2C);
    Blockly.Python.addInit('lcd1602', "lcd = LCD1602(i2c=i2c, addr=0x3e)");
    return "lcd.clear()" + NEWLINE;
};

Blockly.Python.display_addOledText = function (block) {
    Blockly.Python.addImport('oled', IMPORT_OLED);
    Blockly.Python.addInit('oled', "oled = OLED()");
    const str = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    let x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
    if (x > 11) x = 11;
    if (x < 0) x = 0;
    let y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
    if (y > 3) y = 3;
    if (y < 0) y = 0;
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
        return "oled.addTxt(" + x + ", " + y + ", " + str + ")" + NEWLINE;
    } else {
        return "oled.addTxt(" + x + ", " + y + ", str(" + str + "))" + NEWLINE;
    }
};

Blockly.Python.display_setOledPixel = function (block) {
    Blockly.Python.addImport('oled', IMPORT_OLED);
    Blockly.Python.addInit('oled', "oled = OLED()");
    let x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
    if (x > 63) x = 63;
    if (x < 0) x = 0;
    let y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
    if (y > 31) y = 31;
    if (y < 0) y = 0;
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || 0;
    return "oled.set_px(" + x + ", " + y + ", " + state + ")" + NEWLINE;
};

Blockly.Python.display_showOledIcon = function (block) {
    Blockly.Python.addImport('oled', IMPORT_OLED);
    Blockly.Python.addInit('oled', "oled = OLED()");
    const img = block.getFieldValue("ICON") || "NO";
    let x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
    if (x > 59) x = 59;
    if (x < 0) x = 0;
    let y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
    if (y > 31) y = 31;
    if (y < 0) y = 0;
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || 0;
    Blockly.Python.addPowerOn('stamp_' + img, "STAMP_" + img + " = oled.create_stamp(Image." + img + ")")
    return "oled.draw_stamp(" + x + ', ' + y + ', ' + "STAMP_" + img + ", s=" + state + ")" + NEWLINE;
};

Blockly.Python.display_clearOledScreen = function () {
    Blockly.Python.addImport('oled', IMPORT_OLED);
    Blockly.Python.addInit('oled', "oled = OLED()");
    return "oled.clear()" + NEWLINE;
};

Blockly.Python.display_setGroveSocketLed = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || 0;
    Blockly.Python.addInit('ledModule_' + pin, "# LED Module on " + pin);
    return pin + ".write_digital(" + state + ")" + NEWLINE;
};

Blockly.Python.display_setLEDintensity = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || 0;
    Blockly.Python.addInit('ledModule_' + pin, "# LED Module on " + pin);
    return pin + ".write_analog(" + value + ")" + NEWLINE;
};

/**
 * This is not a block generator, it's util function used in all neopixel blocks.
 * Add neopixel init code.
 * @param {int} numPin
 * @param {int} ledCount
 */
Blockly.Python.neopixel_codeInitialization = function (block, pin, ledCount) {
    const numPin = pin.substr(3);
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addInit('neopixel_' + pin, "# Neopixel on " + pin);
    Blockly.Python.addConstant('led_count_' + numPin, NEOPIXEL_LED_COUNT + numPin + " = " + ledCount);
    Blockly.Python.addInit('neopixel_' + numPin, "np_" + numPin + " = neopixel.NeoPixel(" + pin + ", " + NEOPIXEL_LED_COUNT + numPin + "*3)");
    block.workspace.createVariable(NEOPIXEL_LED_COUNT + numPin);
};

/**
 * This is not a block generator, it's util function used in all neopixel blocks.
 * Check if neopixel is already defined on given pin.
 * @return {bool} alreadyDefined
 */
Blockly.Python.neopixel_checkDefinedBlock = function (block, pin) {
    const defineBlocks = block.workspace.getBlocksByType('display_defineNeopixel');
    let alreadyDefined = false;
    for (var block in defineBlocks) {
        const fieldDropdownPin = defineBlocks[block].getField('PIN');
        const selectedOption = fieldDropdownPin.selectedOption_[1];
        if (selectedOption == pin && !defineBlocks[block].disabled) {
            alreadyDefined = true;
        }
    }
    return alreadyDefined;
};

Blockly.Python.display_defineNeopixel = function (block) {
    const ledCount = block.getFieldValue("N");
    const pin = block.getFieldValue("PIN");
    Blockly.Python.neopixel_codeInitialization(block, pin, ledCount);
    return "";
};

Blockly.Python.display_controlNeopixelLed = function (block) {
    const pin = block.getFieldValue("PIN");
    const led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || 0;
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || 0;
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || 0;
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || 0;
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    }
    return "np_" + pin.substr(3) + "[" + led + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "np_" + pin.substr(3) + ".show()" + NEWLINE;
};

Blockly.Python.display_controlColorNeopixelLed = function (block) {
    const pin = block.getFieldValue("PIN");
    const ledIndex = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || 0;
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    return "np_" + pin.substr(3) + "[" + ledIndex + "] = " + colour + NEWLINE + "np_" + pin.substr(3) + ".show()" + NEWLINE;
};

Blockly.Python.display_neopixel_controlAllLedRGB = function (block) {
    const pin = block.getFieldValue("PIN");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || 0;
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || 0;
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || 0;
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    }
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(np_" + pin.substr(3) + ", " + NEOPIXEL_LED_COUNT + pin.substr(3) + ", " + r + ", " + g + ", " + b + ")" + NEWLINE;
};

Blockly.Python.display_neopixel_controlAllLedPalette = function (block) {
    const pin = block.getFieldValue("PIN");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    }
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(np_" + pin.substr(3) + ", " + NEOPIXEL_LED_COUNT + pin.substr(3) + ", " + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ")" + NEWLINE;
};

Blockly.Python.display_rainbowNeopixel = function (block) {
    const pin = block.getFieldValue("PIN");
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    }
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(np_" + pin.substr(3) + ", " + NEOPIXEL_LED_COUNT + pin.substr(3) + ")" + NEWLINE;
};

Blockly.Python.display_setNumberGrove4Digit = function (block) {
    const pinCLK = block.getFieldValue("CLK");
    const pinDIO = block.getFieldValue("DIO");
    const n = Blockly.Python.valueToCode(block, "N", Blockly.Python.ORDER_NONE) || 0;
    const displayOption = block.getFieldValue("SHOW");
    Blockly.Python.addImport('tm1637', IMPORT_TM1637);
    Blockly.Python.addInit('tm1637_' + pinCLK.substr(3), "tm1637_" + pinCLK.substr(3) + " = TM1637(clk=" + pinCLK + ", dio=" + pinDIO + ")");
    switch (displayOption) {
        case "NUM":
            return "tm1637_" + pinCLK.substr(3) + ".number(int(" + n + "))" + NEWLINE;
        case "TEMP":
            return "tm1637_" + pinCLK.substr(3) + ".temperature(int(" + n + "))" + NEWLINE;
        default:
            throw Error("Unhandled display option: " + displayOption);
    }
};

Blockly.Python.display_setClockGrove4Digit = function (block) {
    const date = new Date();
    const pinCLK = block.getFieldValue("CLK");
    const pinDIO = block.getFieldValue("DIO");
    Blockly.Python.addConstant('chronometer', "t0 = 0");
    block.workspace.createVariable('t0');
    Blockly.Python.addConstant('time_read',
        "#Warning, the clock is recovered by browser when galaxia is flashed." + NEWLINE +
        "#If galaxia is powered off, time will not flow." + NEWLINE +
        "MIN_START = " + date.getMinutes() + NEWLINE +
        "HOUR_START = " + date.getHours());
    Blockly.Python.addImport('tm1637', IMPORT_TM1637);
    Blockly.Python.addFunction('getCurrentTime', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_GET_CURRENT_TIME);
    Blockly.Python.addInit('tm1637_' + pinCLK.substr(3), "tm1637_" + pinCLK.substr(3) + " = TM1637(clk=" + pinCLK + ", dio=" + pinDIO + ")");
    return "tm1637_" + pinCLK.substr(3) + ".clock(getCurrentTime())" + NEWLINE;
};

Blockly.Python.display_setLevelLedBar = function (block) {
    const pinName_DI = Blockly.Python.Generators.digital_write(block.getFieldValue("DI"), 'LED Bar DI');
    const pinName_DCKI = Blockly.Python.Generators.digital_write(block.getFieldValue("DCKI"), 'LED Bar DCKI');
    const objName = 'ledBar_' + pinName_DI;
    Blockly.Python.addImport('galaxia_my9221', IMPORT_GALAXIA_MY9221);
    Blockly.Python.addInit(objName, objName + " = MY9221(" + pinName_DI + ", " + pinName_DCKI + ")");
    const level = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    return objName + ".level(" + level + ")" + NEWLINE;
};

Blockly.Python.display_my9221_reverse = function (block) {
    const pinName_DI = Blockly.Python.Generators.digital_write(block.getFieldValue("DI"), 'LED Bar DI');
    const pinName_DCKI = Blockly.Python.Generators.digital_write(block.getFieldValue("DCKI"), 'LED Bar DCKI');
    const objName = 'ledBar_' + pinName_DI;
    Blockly.Python.addImport('galaxia_my9221', IMPORT_GALAXIA_MY9221);
    Blockly.Python.addInit(objName, objName + " = MY9221(" + pinName_DI + ", " + pinName_DCKI + ")");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return objName + ".reverse(" + state + ")" + NEWLINE;
};

Blockly.Python.display_setTrafficLight = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || 0;
    Blockly.Python.addInit('traffic_light_module_', "# Traffic Light");
    return block.getFieldValue("PIN") + ".write_digital(" + state + ")" + NEWLINE;
};

// Morpion

// Functions used in morpion blocks for generators
Blockly.Python.initializeMorpionGenerator = function () {
    Blockly.Python.addImport('oledm', IMPORT_OLEDM);
    Blockly.Python.addImport('morpion', IMPORT_MORPION);
    Blockly.Python.addInit('oledm', "oled = OLEDM()");
    Blockly.Python.addInit('morpion', "morpion = MORPION(oled._s)");
};

Blockly.Python.display_morpionNewGame = function () {
    Blockly.Python.initializeMorpionGenerator();
    return "morpion.newGame()" + NEWLINE;
};

Blockly.Python.display_morpionMoveCursor = function () {
    Blockly.Python.initializeMorpionGenerator();
    return "morpion.mvCursor()" + NEWLINE;
};

Blockly.Python.display_morpionSetPlayerFigure = function (block) {
    Blockly.Python.initializeMorpionGenerator();
    const fig = block.getFieldValue("FIGURE")
    if (fig == "X") {
        return "morpion.addCross()" + NEWLINE;
    }
    if (fig == "O") {
        return "morpion.addCircle()" + NEWLINE;
    }
};

Blockly.Python.display_morpionIsEndGame = function () {
    Blockly.Python.initializeMorpionGenerator();
    return ["morpion.endGame()", Blockly.Python.ORDER_ATOMIC];
};