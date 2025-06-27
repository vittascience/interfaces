/**
 * @fileoverview Display generators for STM32.
 */

// STM32

Blockly.Python.display_rgb_led_matrix_DrawBitmap = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_rgb_led_matrix', IMPORT_STM32_RGB_LED_MATRIX);
    Blockly.Python.addInit('RGBmatrix', "RGBmatrix = GroveTwoRGBLedMatrix(i2c=machine.I2C(1))");
    const rgb_matrix = block.getField("RGB_LEDS_MATRIX").getText().split(',');
    const duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_NONE) || "";
    for (var i = 0; i < rgb_matrix.length; i++)
        rgb_matrix[i] = Blockly.Constants.COLOURS[rgb_matrix[i]];
    let temp_matrix = [], row = [];
    for (var i = 0; i < 8; i++) {
        for (var j = i; j < rgb_matrix.length; j += 8) {
            row.push(rgb_matrix[j]);
        }
        temp_matrix.push(row);
        row = [];
    }
    temp_matrix = temp_matrix.reverse();
    let reverse_matrix = [];
    for (var i = 0; i < temp_matrix.length; i++) {
        for (var j = 0; j < temp_matrix[i].length; j++) {
            row.push(temp_matrix[j][i]);
        }
        reverse_matrix.push(row);
        row = [];
    }
    if (duration != "")
        return "RGBmatrix.displayFrames([" + reverse_matrix.join(',') + "]," + duration + ", False, 1)" + NEWLINE;
    else
        return "RGBmatrix.displayFrames([" + reverse_matrix.join(',') + "], 1000, True, 1)" + NEWLINE;
};

Blockly.Python.display_rgb_led_matrix_stopDisplay = function () {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_rgb_led_matrix', IMPORT_STM32_RGB_LED_MATRIX);
    Blockly.Python.addInit('RGBmatrix', "RGBmatrix = GroveTwoRGBLedMatrix(i2c=machine.I2C(1))");
    return "RGBmatrix.stopDisplay()" + NEWLINE;
};

// Need to be completed
Blockly.Python.display_rgb_led_matrix_setColor = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_rgb_led_matrix', IMPORT_STM32_RGB_LED_MATRIX);
    Blockly.Python.addInit('RGBmatrix', "RGBmatrix = GroveTwoRGBLedMatrix(i2c=machine.I2C(1))");
    return "" + NEWLINE;
};

Blockly.Python.display_led_matrix_DrawBitmap = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_ht16k33matrix', IMPORT_STM32_HT16K33_MATRIX);
    Blockly.Python.addInit('HT16K33Matrix', "ht16k33matrix = HT16K33Matrix(i2c=machine.I2C(1))");
    const matrix_color = block.getField("LEDS_MATRIX").getText().split(',');
    let code = "b\"";
    if (matrix_color.length != 0) {
        for (var i = 0; i < matrix_color.length; i++) {
            code += "\\x";
            let hex = parseInt(matrix_color[i], 2).toString(16).toUpperCase();
            code += ((hex.length > 1) ? hex : "0" + hex);
        }
    }
    return "ht16k33matrix.set_icon(" + code + "\").draw()" + NEWLINE;
};

Blockly.Python.display_led_matrix_clear = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_ht16k33matrix', IMPORT_STM32_HT16K33_MATRIX);
    Blockly.Python.addInit('HT16K33Matrix', "ht16k33matrix = HT16K33Matrix(i2c=machine.I2C(1))");
    return "ht16k33matrix.clear()" + NEWLINE;
};

Blockly.Python.display_stm32_controlColorLed = function (block) {
    const led = block.getFieldValue("LED");
    let color;
    switch (led) {
        case "3":
            color = "blue";
            break
        case "2":
            color = "green";
            break;
        case "1":
            color = "red";
            break;
    }
    const LED = ["3", "2", "1"]; // Temp inversion - waiting firmware
    const ledName = "led" + LED[parseInt(led) - 1] + "_" + color;
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addInit('led_' + led, ledName + " = pyb.LED(" + led + ")");
    const inputBlock = block.getInput("STATE").connection.targetBlock();
    if (inputBlock && (inputBlock.type == "io_digital_signal")) {
        return (state == '1' ? ledName + ".on()" : ledName + ".off()") + NEWLINE;
    } else {
        return ledName + ".on() if " + state + " else " + ledName + ".off()" + NEWLINE;
    }
};

Blockly.Python.display_stm32_toggleColorLed = function (block) {
    const led = block.getFieldValue("LED");
    let color;
    switch (led) {
        case "3":
            color = "blue";
            break
        case "2":
            color = "green";
            break;
        case "1":
            color = "red";
            break;
    }
    const LED = ["3", "2", "1"]; // Temp inversion - waiting firmware
    const ledName = "led" + LED[parseInt(led) - 1] + "_" + color;
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addInit('led_' + led, ledName + " = pyb.LED(" + led + ")");
    return ledName + ".toggle()" + NEWLINE;
};

// Screens

Blockly.Python.display_lcdSetText = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('lcd1602', IMPORT_STM32_LCD1602);
    Blockly.Python.addInit('lcd1602', "lcd = LCD1602(i2c=machine.I2C(1))");
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
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('lcd1602', IMPORT_STM32_LCD1602);
    Blockly.Python.addInit('lcd1602', "lcd = LCD1602(i2c=machine.I2C(1))");
    return "lcd.clear()" + NEWLINE;
};

Blockly.Python.display_lcdSetColor = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('lcd1602', IMPORT_STM32_LCD1602);
    Blockly.Python.addInit('lcd1602', "lcd = LCD1602(i2c=machine.I2C(1), addr=0x3e)");
    let r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_ATOMIC) || "0";
    if (r < 0) r = 0;
    if (r > 255) r = 255;
    let g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_ATOMIC) || "0";
    if (g < 0) g = 0;
    if (g > 255) g = 255;
    let b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_ATOMIC) || "0";
    if (b < 0) b = 0;
    if (b > 255) b = 255;
    return "lcd.color((" + r + ", " + g + ", " + b + "))" + NEWLINE;
};

Blockly.Python.display_lcdSetColorPalette = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('lcd1602', IMPORT_STM32_LCD1602);
    Blockly.Python.addInit('lcd1602', "lcd = LCD1602(i2c=machine.I2C(1), addr=0x3e)");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0, 0, 0)";
    return "lcd.color(" + colour + ")" + NEWLINE;
};

Blockly.Python.display_addOledText = function (block) {
    const str = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('ssd1306', IMPORT_STM32_SSD1306_I2C);
    Blockly.Python.addInit('oled', "oled = SSD1306_I2C(128, 64, machine.I2C(1))");
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
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('ssd1306', IMPORT_STM32_SSD1306_I2C);
    Blockly.Python.addInit('oled', "oled = SSD1306_I2C(128, 64, machine.I2C(1))");
    return "oled.pixel(" + x + ", " + y + ", " + state + ")" + NEWLINE + "oled.show()" + NEWLINE;
};

Blockly.Python.display_drawOledLine = function (block) {
    const xa = Blockly.Python.valueToCode(block, "XA", Blockly.Python.ORDER_NONE) || "0";
    const ya = Blockly.Python.valueToCode(block, "YA", Blockly.Python.ORDER_NONE) || "0";
    const xb = Blockly.Python.valueToCode(block, "XB", Blockly.Python.ORDER_NONE) || "0";
    const yb = Blockly.Python.valueToCode(block, "YB", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('ssd1306', IMPORT_STM32_SSD1306_I2C);
    Blockly.Python.addInit('oled', "oled = SSD1306_I2C(128, 64, machine.I2C(1))");
    return "oled.line(" + xa + ", " + ya + ", " + xb + ", " + yb + ", 1)" + NEWLINE + "oled.show()" + NEWLINE;
};

Blockly.Python.display_clearOledScreen = function () {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('ssd1306', IMPORT_STM32_SSD1306_I2C);
    Blockly.Python.addInit('oled', "oled = SSD1306_I2C(128, 64, machine.I2C(1))");
    return "oled.fill(0)" + NEWLINE + "oled.show()" + NEWLINE;
};

Blockly.Python.display_setOledBackground = function (block) {
    const color = block.getFieldValue("BACKGROUND");
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('ssd1306', IMPORT_STM32_SSD1306_I2C);
    Blockly.Python.addInit('oled', "oled = SSD1306_I2C(128, 64, machine.I2C(1))");
    return "oled.invert(" + color + ")" + NEWLINE;
};

// LED modules

Blockly.Python.display_setGroveSocketLed = function (block) {
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'LED Module');
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const inputBlock = block.getInput("STATE").connection.targetBlock();
    if (inputBlock && (inputBlock.type == "io_digital_signal")) {
        return (state == '1' ? pinName + ".on()" : pinName + ".off()") + NEWLINE;
    } else {
        return pinName + '.value(' + state + ')' + NEWLINE;
    }
};

Blockly.Python.display_setLEDintensity = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinName = Blockly.Python.Generators.pwm(pin, 'LED Module');
    const timName = "tim_" + pinName;
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addInit(timName, timName + " = pyb.Timer(1, freq=500)");
    return timName + ".channel(1, pyb.Timer.PWM, pin=" + pinName + ", pulse_width_percent=" + value + ")" + NEWLINE;
};

// CONTROL VARIABLE COLOR LED
Blockly.Python.display_setVariableColorLED = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinName = Blockly.Python.Generators.pwm(pin, 'Variable Color LED');
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_ATOMIC) || "0";
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    return 'pwm_' + pinName + ".pulse_width_percent(100-" + value + ")" + NEWLINE;
};

/**
 * This is not a block generator, it's util function used in all neopixel blocks.
 * Add neopixel init code.
 * @param {int} numPin
 * @param {int} ledCount
 */
Blockly.Python.neopixel_codeInitialization = function (block, pin, ledCount) {
    const numPin = pin.replace("'", "").replace("'", "");
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addInit('neopixel_' + numPin, "# Neopixel on " + numPin);
    Blockly.Python.addInit(numPin, numPin.replace('D', 'd') + " = pyb.Pin(" + pin + ", pyb.Pin.OUT)");
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('led_count_' + numPin, NEOPIXEL_LED_COUNT + numPin + " = " + ledCount);
    Blockly.Python.addPowerOn('neopixel_' + numPin, "np_" + numPin + " = " + "neopixel." + "NeoPixel(" + numPin.replace('D', 'd') + ", " + NEOPIXEL_LED_COUNT + numPin + ")");
    block.workspace.createVariable(NEOPIXEL_LED_COUNT + numPin);
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
    let ledCount = block.getFieldValue("N");
    let pin = block.getFieldValue("PIN");
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
    return "np_" + pin.replace("'", "").replace("'", "") + "[" + led + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "np_" + pin.replace("'", "").replace("'", "") + ".write()" + NEWLINE;
};

Blockly.Python.display_controlColorNeopixelLed = function (block) {
    let pin = block.getFieldValue("PIN");
    let ledIndex = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    let colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    return "np_" + pin.replace("'", "").replace("'", "") + "[" + ledIndex + "] = " + colour + NEWLINE + "np_" + pin.replace("'", "").replace("'", "") + ".write()" + NEWLINE;
};

Blockly.Python.display_neopixel_controlAllLedRGB = function (block) {
    let pin = block.getFieldValue("PIN");
    var r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    var g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    var b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    }
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_WB55.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(np_" + pin.replace("'", "").replace("'", "") + ", " + NEOPIXEL_LED_COUNT + pin.replace("'", "").replace("'", "") + ", " + r + ", " + g + ", " + b + ")" + NEWLINE;
};

Blockly.Python.display_neopixel_controlAllLedPalette = function (block) {
    let pin = block.getFieldValue("PIN");
    let colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    let colourList = colour.match(/([0-9]{1,3})/g);
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    }
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_WB55.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(np_" + pin.replace("'", "").replace("'", "") + ", " + NEOPIXEL_LED_COUNT + pin.replace("'", "").replace("'", "") + ", " + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ")" + NEWLINE;
};

Blockly.Python.display_rainbowNeopixel = function (block) {
    let pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_WB55.DEF_NEOPIXEL_SHOW_ALL_LED);
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    }
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_WB55.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(np_" + pin.replace("'", "").replace("'", "") + ", " + NEOPIXEL_LED_COUNT + pin.replace("'", "").replace("'", "") + ")" + NEWLINE;
};

Blockly.Python.display_setNumberGrove4Digit = function (block) {
    const pinName_CLK = Blockly.Python.Generators.digital_write(block.getFieldValue("CLK"), '4 Digit Display CLK');
    const pinName_DIO = Blockly.Python.Generators.digital_write(block.getFieldValue("DIO"), '4 Digit Display DIO');
    const n = Blockly.Python.valueToCode(block, "N", Blockly.Python.ORDER_NONE) || "0";
    const displayOption = block.getFieldValue("SHOW");
    const objName = "tm1637_" + pinName_CLK;
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addImport('stm32_tm1637', IMPORT_STM32_TM1637);
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
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addImport('stm32_tm1637', IMPORT_STM32_TM1637);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('chronometer', "t0 = utime.ticks_ms()");
    block.workspace.createVariable('t0');
    Blockly.Python.addConstant('time_read',
        "#Warning, the clock is recovered by browser when ESP32 is flashed." + NEWLINE +
        "#If ESP32 is powered off, time will not flow." + NEWLINE +
        "MIN_START = " + date.getMinutes() + NEWLINE +
        "HOUR_START = " + date.getHours());
    Blockly.Python.addFunction('getCurrentTime', FUNCTIONS_WB55.DEF_GET_CURRENT_TIME);
    Blockly.Python.addInit(objName, objName + " = TM1637(clk=" + pinName_CLK + ", dio=" + pinName_DIO + ")");
    return objName + ".clock(getCurrentTime())" + NEWLINE;
};

Blockly.Python.display_setLevelLedBar = function (block) {
    const pinName_DI = Blockly.Python.Generators.digital_write(block.getFieldValue("DI"), 'LED Bar DI');
    const pinName_DCKI = Blockly.Python.Generators.digital_write(block.getFieldValue("DCKI"), 'LED Bar DCKI');
    const objName = 'ledBar_' + pinName_DI;
    Blockly.Python.addImport('stm32_my9221', IMPORT_STM32_MY9221);
    Blockly.Python.addInit(objName, objName + " = MY9221(" + pinName_DI + ", " + pinName_DCKI + ")");
    const level = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    return objName + ".level(" + level + ")" + NEWLINE;
};

Blockly.Python.display_my9221_reverse = function (block) {
    const pinName_DI = Blockly.Python.Generators.digital_write(block.getFieldValue("DI"), 'LED Bar DI');
    const pinName_DCKI = Blockly.Python.Generators.digital_write(block.getFieldValue("DCKI"), 'LED Bar DCKI');
    const objName = 'ledBar_' + pinName_DI;
    Blockly.Python.addImport('stm32_my9221', IMPORT_STM32_MY9221);
    Blockly.Python.addInit(objName, objName + " = MY9221(" + pinName_DI + ", " + pinName_DCKI + ")");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return objName + ".reverse(" + state + ")" + NEWLINE;
};

Blockly.Python.display_defineChainableRGBLed = function (block) {
    const ledCount = block.getFieldValue("N") || "1";
    const pinCIN = block.getFieldValue("CIN");
    const pinDIN = block.getFieldValue("DIN");
    const numPinCIN = pinCIN.replace("'", "").replace("'", "");
    const pinDIN_NAME = Blockly.Python.Generators.digital_write(pinDIN, 'Chainable LED DIN');
    const pinCIN_NAME = Blockly.Python.Generators.digital_write(pinCIN, 'Chainable LED CIN');
    Blockly.Python.addImport('stm32_chainableLed', IMPORT_STM32_CHAINABLE_LED);
    Blockly.Python.addConstant('led_count_' + numPinCIN, CHAINABLE_LED_COUNT + '_' + numPinCIN + " = " + ledCount);
    Blockly.Python.addInit('chainable_led_' + numPinCIN, "chainable_led_" + numPinCIN + " = " + "P9813(" + pinCIN_NAME + ", " + pinDIN_NAME + ", " + CHAINABLE_LED_COUNT + "_" + numPinCIN + ")");
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
    const objName = "chainable_led_" + block.getFieldValue("CIN").replace("'", "").replace("'", "");
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
    const objName = "chainable_led_" + block.getFieldValue("CIN").replace("'", "").replace("'", "");
    if (!Blockly.Python.chainableLED_checkDefinedBlock(block, block.getFieldValue("CIN"))) {
        Blockly.Python.display_defineChainableRGBLed(block);
    }
    return objName + '[' + led + '] = ' + colour + NEWLINE + objName + '.write()' + NEWLINE;
};

Blockly.Python.display_setColorAllChainableRGBLed = function (block) {
    const objName = "chainable_led_" + block.getFieldValue("CIN").replace("'", "").replace("'", "");
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
    const objName = "chainable_led_" + block.getFieldValue("CIN").replace("'", "").replace("'", "");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0, 0, 0)";
    if (!Blockly.Python.chainableLED_checkDefinedBlock(block, block.getFieldValue("CIN"))) {
        Blockly.Python.display_defineChainableRGBLed(block);
    }
    return objName + '.fill(' + colour + ')' + NEWLINE
        + objName + '.write()' + NEWLINE;
};

Blockly.Python.display_resetAllChainableRGBLed = function (block) {
    const objName = "chainable_led_" + block.getFieldValue("CIN").replace("'", "").replace("'", "");
    if (!Blockly.Python.chainableLED_checkDefinedBlock(block, block.getFieldValue("CIN"))) {
        Blockly.Python.display_defineChainableRGBLed(block);
    }
    return objName + '.reset()' + NEWLINE;
};