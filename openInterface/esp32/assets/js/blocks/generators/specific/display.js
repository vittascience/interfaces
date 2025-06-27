/**
 * @fileoverview Display generators for Esp32.
 */

// Esp32

Blockly.Python.display_controlBuiltInLED = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = "p2";
    Blockly.Python.addInit('write-digital_p2', "# Builtin LED on " + pinName);
    Blockly.Python.addInit(pinName + '_OUT', pinName + " = Pin(2, Pin.OUT)");
    const inputBlock = block.getInput("STATE").connection.targetBlock();
    if (inputBlock && (inputBlock.type == "io_digital_signal")) {
        return 'try:' + NEWLINE 
            + '  ' + (state == '1' ? pinName + ".on()" : pinName + ".off()") + NEWLINE 
            + 'except:' + NEWLINE 
            + '  ' + (state == '1' ? pinName + ".duty(1023)" : pinName + ".duty(0)") + NEWLINE;
    } else {
        return 'try:' + NEWLINE 
        + '  ' + pinName + '.value(' + state + ')' + NEWLINE 
        + 'except:' + NEWLINE 
        + '  ' + pinName + '.duty(int(' + state + ')*1023)' + NEWLINE;
    }
};

// Screens

Blockly.Python.display_lcdSetText = function (block) {
    Blockly.Python.addImport('lcd1602', IMPORT_ESP32_LCD1602);
    Blockly.Python.addInit('lcd1602', "lcd = LCD1602(i2c=I2C(scl=Pin(22), sda=Pin(21)))");
    let txt = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    let line = block.getFieldValue("LINE");
    let position = block.getFieldValue("POS");
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
        return "lcd.setCursor(" + position + ", " + line + ")" + NEWLINE + "lcd.writeTxt(" + txt + ")" + NEWLINE;
    } else {
        return "lcd.setCursor(" + position + ", " + line + ")" + NEWLINE + "lcd.writeTxt(str(" + txt + "))" + NEWLINE;
    }
};

Blockly.Python.display_lcdClear = function () {
    Blockly.Python.addImport('lcd1602', IMPORT_ESP32_LCD1602);
    Blockly.Python.addInit('lcd1602', "lcd = LCD1602(i2c=I2C(scl=Pin(22), sda=Pin(21)))");
    return "lcd.clear()" + NEWLINE;
};

Blockly.Python.display_addOledText = function (block) {
    const str = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ssd1306', IMPORT_ESP32_SSD1306_I2C);
    Blockly.Python.addInit('oled', "oled = SSD1306_I2C(128, 64, I2C(scl=Pin(22), sda=Pin(21)))");
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
        return "oled.text(" + str + ", " + x + ", " + y + ")" + NEWLINE + "oled.show()" + NEWLINE;
    } else {
        return "oled.text(str(" + str + "), " + x + ", " + y + ")" + NEWLINE + "oled.show()" + NEWLINE;
    }
};

Blockly.Python.display_setOledPixel = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ssd1306', IMPORT_ESP32_SSD1306_I2C);
    Blockly.Python.addInit('oled', "oled = SSD1306_I2C(128, 64, I2C(scl=Pin(22), sda=Pin(21)))");
    return "oled.pixel(" + x + ", " + y + ", " + state + ")" + NEWLINE + "oled.show()" + NEWLINE;
};

Blockly.Python.display_drawOledLine = function (block) {
    const xa = Blockly.Python.valueToCode(block, "XA", Blockly.Python.ORDER_NONE) || "0";
    const ya = Blockly.Python.valueToCode(block, "YA", Blockly.Python.ORDER_NONE) || "0";
    const xb = Blockly.Python.valueToCode(block, "XB", Blockly.Python.ORDER_NONE) || "0";
    const yb = Blockly.Python.valueToCode(block, "YB", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ssd1306', IMPORT_ESP32_SSD1306_I2C);
    Blockly.Python.addInit('oled', "oled = SSD1306_I2C(128, 64, I2C(scl=Pin(22), sda=Pin(21)))");
    return "oled.line(" + xa + ", " + ya + ", " + xb + ", " + yb + ", 1)" + NEWLINE + "oled.show()" + NEWLINE;
};

Blockly.Python.display_showOledIcon = function (block) {
    Blockly.Python.addImport('ssd1306', IMPORT_ESP32_SSD1306_I2C);
    Blockly.Python.addInit('oled', "oled = SSD1306_I2C(128, 64, I2C(scl=Pin(22), sda=Pin(21)))");
    const i = block.getFieldValue("ICON");
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    return "oled.blit(oled.STAMP_" + i + ", " + x + ", " + y + ")" + NEWLINE;
};

Blockly.Python.display_setOledBackground = function (block) {
    const color = block.getFieldValue("BACKGROUND");
    Blockly.Python.addImport('ssd1306', IMPORT_ESP32_SSD1306_I2C);
    Blockly.Python.addInit('oled', "oled = SSD1306_I2C(128, 64, I2C(scl=Pin(22), sda=Pin(21)))");
    return "oled.invert(" + color + ")" + NEWLINE;
};

Blockly.Python.display_clearOledScreen = function () {
    Blockly.Python.addImport('ssd1306', IMPORT_ESP32_SSD1306_I2C);
    Blockly.Python.addInit('oled', "oled = SSD1306_I2C(128, 64, I2C(scl=Pin(22), sda=Pin(21)))");
    return "oled.fill(0)" + NEWLINE + "oled.show()" + NEWLINE;
};

// LED modules

Blockly.Python.display_setGroveSocketLed = function (block) {
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'LED Module');
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const inputBlock = block.getInput("STATE").connection.targetBlock();
    if (inputBlock && (inputBlock.type == "io_digital_signal")) {
        return 'try:' + NEWLINE + '  ' + (state == '1' ? pinName + ".on()" : pinName + ".off()") + NEWLINE + 'except:' + NEWLINE + '  ' + (state == '1' ? pinName + ".duty(1023)" : pinName + ".duty(0)") + NEWLINE;
    } else {
        return 'try:' + NEWLINE + '  ' + pinName + '.value(' + state + ')' + NEWLINE + 'except:' + NEWLINE + '  ' + pinName + '.duty(int(' + state + ')*1023)' + NEWLINE;
    }
};

Blockly.Python.display_setLEDintensity = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(pin, 'LED Module');
    return 'try:' + NEWLINE + '  ' + pinName + '.duty(int(' + value + '*' + PWM_MAX_DUTY + '/100))' + NEWLINE + 'except:' + NEWLINE + '  ' + pinName + " = PWM(Pin(" + pin.replace('p', '') + "), freq=5000, duty=int(" + value + "*1023/100))" + NEWLINE;
};

/**
 * This is not a block generator, it's util function used in all neopixel blocks.
 * Add neopixel init code.
 * @param {int} numPin
 * @param {int} ledCount
 */
Blockly.Python.neopixel_codeInitialization = function (block, pin, ledCount) {
    const numPin = pin.substr(1);
    Blockly.Python.addInit('neopixel_' + pin, "# Neopixel on " + pin);
    Blockly.Python.addInit(pin, pin + " = Pin(" + pin.replace('p', '') + ", Pin.OUT)");
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    // Blockly.Python.addConstant('led_count_' + numPin, NEOPIXEL_LED_COUNT + numPin + " = " + ledCount);
    Blockly.Python.addHiddenConstant(`NEOPIXEL_LED_COUNT_${numPin}`, ledCount);
    Blockly.Python.addInit('neopixel_' + numPin, "np_" + numPin + " = " + "neopixel." + "NeoPixel(" + pin + ", " + ledCount + ")");
    // block.workspace.createVariable(NEOPIXEL_LED_COUNT + numPin);
};

/**
 * This is not a block generator, it's util function used in all neopixel blocks.
 * Check if neopixel is already defined on given pin.
 * @return {bool} alreadyDefined
 */
Blockly.Python.neopixel_checkDefinedBlock = function (block, pin) {
    const definedBlocks = block.workspace.getBlocksByType('display_defineNeopixel');
    let alreadyDefined = false;
    for (block in definedBlocks) {
        const fieldDropdownPin = definedBlocks[block].getField('PIN');
        const selectedOption = fieldDropdownPin.selectedOption_[1];
        if (selectedOption == pin && !definedBlocks[block].disabled) {
            alreadyDefined = true;
        }
    }
    return alreadyDefined;
};

Blockly.Python.display_defineNeopixel = function (block) {
    const ledCount = Blockly.Python.valueToCode(block, "N", Blockly.Python.ORDER_NONE) || "20";
    let pin = block.getFieldValue("PIN");
    // Blockly.Python.constants_[`NEOPIXEL_LED_COUNT_${pin.substr(1)}`] = ledCount;
    Blockly.Python.neopixel_codeInitialization(block, pin, ledCount);
    return "";
};

Blockly.Python.display_controlNeopixelLed = function (block) {
    let pin = block.getFieldValue("PIN");
    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    var r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    var g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    var b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    }
    return "np_" + pin.substr(1) + "[" + led + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "np_" + pin.substr(1) + ".write()" + NEWLINE;
};

Blockly.Python.display_controlColorNeopixelLed = function (block) {
    let pin = block.getFieldValue("PIN");
    let ledIndex = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    let colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    return "np_" + pin.substr(1) + "[" + ledIndex + "] = " + colour + NEWLINE + "np_" + pin.substr(1) + ".write()" + NEWLINE;
};

Blockly.Python.display_neopixel_controlAllLedRGB = function (block) {
    let pin = block.getFieldValue("PIN");
    var r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    var g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    var b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    }
    const ChekLedConst = Blockly.Python.hiddenConstants_[`NEOPIXEL_LED_COUNT_${pin.substr(1)}`];
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_ESP32.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(np_" + pin.substr(1) + ", " + ChekLedConst + ", " + r + ", " + g + ", " + b + ")" + NEWLINE;
};

Blockly.Python.display_neopixel_controlAllLedPalette = function (block) {
    let pin = block.getFieldValue("PIN");
    let colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    let colourList = colour.match(/([0-9]{1,3})/g);
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    }
    const ChekLedConst = Blockly.Python.hiddenConstants_[`NEOPIXEL_LED_COUNT_${pin.substr(1)}`];
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_ESP32.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(np_" + pin.substr(1) + ", " + ChekLedConst + ", " + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ")" + NEWLINE;
};

Blockly.Python.display_rainbowNeopixel = function (block) {
    let pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_ESP32.DEF_NEOPIXEL_SHOW_ALL_LED);
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    }
    const ChekLedConst = Blockly.Python.hiddenConstants_[`NEOPIXEL_LED_COUNT_${pin.substr(1)}`];
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_ESP32.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(np_" + pin.substr(1) + ", " + ChekLedConst + ")" + NEWLINE;
};

Blockly.Python.display_setNumberGrove4Digit = function (block) {
    const pinName_CLK = Blockly.Python.Generators.digital_write(block.getFieldValue("CLK"), '4 Digit Display CLK');
    const pinName_DIO = Blockly.Python.Generators.digital_write(block.getFieldValue("DIO"), '4 Digit Display DIO');
    const n = Blockly.Python.valueToCode(block, "N", Blockly.Python.ORDER_NONE) || "0";
    const displayOption = block.getFieldValue("SHOW");
    const objName = "tm1637_" + pinName_CLK;
    Blockly.Python.addImport('esp32_tm1637', IMPORT_ESP32_TM1637);
    Blockly.Python.addInit(objName, objName + " = TM1637(clk=" + pinName_CLK + ", dio=" + pinName_DIO + ")");
    switch (displayOption) {
        case "NUM":
            return objName + ".number(int(" + n + "))" + NEWLINE;
        case "TEMP":
            return objName + ".temperature(int(" + n + "))" + NEWLINE;
        default:
            throw Error("Unhandled display option: " + displayOption);
    }
};

Blockly.Python.display_setClockGrove4Digit = function (block) {
    let date = new Date();
    const pinName_CLK = Blockly.Python.Generators.digital_write(block.getFieldValue("CLK"), '4 Digit Display CLK');
    const pinName_DIO = Blockly.Python.Generators.digital_write(block.getFieldValue("DIO"), '4 Digit Display DIO');
    const objName = "tm1637_" + pinName_CLK;
    Blockly.Python.addImport('esp32_tm1637', IMPORT_ESP32_TM1637);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('chronometer', "t0 = utime.ticks_ms()");
    block.workspace.createVariable('t0');
    Blockly.Python.addConstant('time_read',
        "#Warning, the clock is recovered by browser when ESP32 is flashed." + NEWLINE +
        "#If ESP32 is powered off, time will not flow." + NEWLINE +
        "MIN_START = " + date.getMinutes() + NEWLINE +
        "HOUR_START = " + date.getHours());
    Blockly.Python.addFunction('getCurrentTime', FUNCTIONS_ESP32.DEF_GET_CURRENT_TIME);
    Blockly.Python.addInit(objName, objName + " = TM1637(clk=" + pinName_CLK + ", dio=" + pinName_DIO + ")");
    return objName + ".clock(getCurrentTime())" + NEWLINE;
};

Blockly.Python.display_setLevelLedBar = function (block) {
    const pinName_DI = Blockly.Python.Generators.digital_write(block.getFieldValue("DI"), 'LED Bar DI');
    const pinName_DCKI = Blockly.Python.Generators.digital_write(block.getFieldValue("DCKI"), 'LED Bar DCKI');
    const objName = 'ledBar_' + pinName_DI;
    Blockly.Python.addImport('esp32_my9221', IMPORT_ESP32_MY9221);
    Blockly.Python.addInit(objName, objName + " = MY9221(" + pinName_DI + ", " + pinName_DCKI + ")");
    const level = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    return objName + ".level(" + level + ")" + NEWLINE;
};

Blockly.Python.display_my9221_reverse = function (block) {
    const pinName_DI = Blockly.Python.Generators.digital_write(block.getFieldValue("DI"), 'LED Bar DI');
    const pinName_DCKI = Blockly.Python.Generators.digital_write(block.getFieldValue("DCKI"), 'LED Bar DCKI');
    const objName = 'ledBar_' + pinName_DI;
    Blockly.Python.addImport('esp32_my9221', IMPORT_ESP32_MY9221);
    Blockly.Python.addInit(objName, objName + " = MY9221(" + pinName_DI + ", " + pinName_DCKI + ")");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return objName + ".reverse(" + state + ")" + NEWLINE;
};

// CONTROL VARIABLE COLOR LED
Blockly.Python.display_setVariableColorLED = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinNAME = Blockly.Python.Generators.pwm(pin, 'Variable Color LED', 5000);
    let value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_ATOMIC) || "0";
    return "try:" + NEWLINE + "  " + pinNAME + ".duty(int(1023*(1-" + value + "/100)))" + NEWLINE + "except:" + NEWLINE + "  " + pinNAME + " = PWM(Pin(" + pin.replace('p', '') + "), freq=5000, duty=int(1023*(1-" + value + "/100)))" + NEWLINE;
};

Blockly.Python.display_defineChainableRGBLed = function (block) {
    const ledCount = block.getFieldValue("N") || "3";
    const pinDIN = block.getFieldValue("DIN");
    const pinCIN = block.getFieldValue("CIN");
    const pinDIN_NAME = Blockly.Python.Generators.digital_write(pinDIN, 'Chainable LED DIN');
    const pinCIN_NAME = Blockly.Python.Generators.digital_write(pinCIN, 'Chainable LED CIN');
    const objName = 'chainable_led_' + pinCIN.replace('p', '');
    Blockly.Python.addImport('esp32_chainableLED', IMPORT_ESP32_P9813); 
    Blockly.Python.addConstant(objName, CHAINABLE_LED_COUNT + '_' + pinCIN.replace('p', '') + " = " + ledCount);
    Blockly.Python.addInit(objName, "chainable_led_" + pinCIN.replace('p', '') + " = " + "P9813(" + pinCIN_NAME + ", " + pinDIN_NAME + ", " + CHAINABLE_LED_COUNT + "_" + pinCIN.replace('p', '') + ")");
    return "";
};

/**
 * This is not a block generator, it's util function used in all chainable LED blocks.
 * Check if chainable LED is already defined on given pin.
 * @return {bool} alreadyDefined
 */
Blockly.Python.chainableLED_checkDefinedBlock = function (block, pin) {
    const definedBlocks = block.workspace.getBlocksByType('display_defineChainableRGBLed');
    let alreadyDefined = false;
    for (block in definedBlocks) {
        const fieldDropdownPin = definedBlocks[block].getField('CIN');
        const selectedOption = fieldDropdownPin.selectedOption_[1];
        if (selectedOption == pin && !definedBlocks[block].disabled) {
            alreadyDefined = true;
        }
    }
    return alreadyDefined;
};

Blockly.Python.display_setColorChainableRGBLed = function (block) {
    const LED = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_ATOMIC) || "0";
    const objName = "chainable_led_" + block.getFieldValue("CIN").replace('p','');
    const red = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_ATOMIC);
    const green = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_ATOMIC);
    const blue = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_ATOMIC);
    if (!Blockly.Python.chainableLED_checkDefinedBlock(block, block.getFieldValue("CIN"))) {
        Blockly.Python.display_defineChainableRGBLed(block);
    }
    return objName + '[' + LED + '] = (' + red + ', ' + green + ', ' + blue + ')' + NEWLINE 
        + objName + '.write()' + NEWLINE;
};

Blockly.Python.display_setPaletteColorChainableRGBLed = function (block) {
    const led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_ATOMIC) || "0";
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0, 0, 0)";
    const objName = "chainable_led_" + block.getFieldValue("CIN").replace('p','');
    if (!Blockly.Python.chainableLED_checkDefinedBlock(block, block.getFieldValue("CIN"))) {
        Blockly.Python.display_defineChainableRGBLed(block);
    }
    return objName + '[' + led + '] = ' + colour +  NEWLINE + objName + '.write()' + NEWLINE;
};

Blockly.Python.display_setColorAllChainableRGBLed = function (block) {
    const objName = "chainable_led_" + block.getFieldValue("CIN").replace('p','');
    const red = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_ATOMIC);
    const green = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_ATOMIC);
    const blue = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_ATOMIC);
    if (!Blockly.Python.chainableLED_checkDefinedBlock(block, block.getFieldValue("CIN"))) {
        Blockly.Python.display_defineChainableRGBLed(block);
    }
    return objName + '.fill((' + red + ', ' + green + ', ' + blue + '))' + NEWLINE 
        + objName + '.write()' + NEWLINE;
};

Blockly.Python.display_setPaletteAllChainableRGBLed = function (block) {
    const objName = "chainable_led_" + block.getFieldValue("CIN").replace('p','');
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0, 0, 0)";
    if (!Blockly.Python.chainableLED_checkDefinedBlock(block, block.getFieldValue("CIN"))) {
        Blockly.Python.display_defineChainableRGBLed(block);
    }
    return objName + '.fill(' + colour + ')' + NEWLINE 
        + objName + '.write()' + NEWLINE;
};

Blockly.Python.display_resetAllChainableRGBLed = function (block) {
    const objName = "chainable_led_" + block.getFieldValue("CIN").replace('p','');
    if (!Blockly.Python.chainableLED_checkDefinedBlock(block, block.getFieldValue("CIN"))) {
        Blockly.Python.display_defineChainableRGBLed(block);
    }
    return objName + '.reset()' + NEWLINE;
};