/**
 * @fileoverview Display generators for Esp32.
 */

// Sense HAT - LED matrix

Blockly.Python.sensehat_display_set_pixels_image = function (block) {
    const image = block.getFieldValue('IMAGE');
    const foreGroudColor = Blockly.Python.valueToCode(block, "FOREGROUND_COLOR", Blockly.Python.ORDER_NONE) || "[0,0,0]";
    const backGroudColor = Blockly.Python.valueToCode(block, 'BACKGROUND_COLOR', Blockly.Python.ORDER_NONE) || "[0,0,0]";
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    Blockly.Python.addInit('foreGroudColor', `X = [${foreGroudColor.replace('(', '').replace(')', '')}]`);
    Blockly.Python.addInit('backGroudColor', `O = [${backGroudColor.replace('(', '').replace(')', '')}]\n`);
    let code = ""
    switch (image) {
        case 'question_mark':
            Blockly.Python.addInit('sense_hat_image', `question_mark = ${SENSEHAT_LED_IMAGE.question_mark}`)
            code = `sense.set_pixels(question_mark)\n`;
            break;
        case 'heart':
            Blockly.Python.addInit('sense_hat_image', `heart = ${SENSEHAT_LED_IMAGE.heart}`)
            code = `sense.set_pixels(heart)\n`;
            break;
        case 'smile':
            Blockly.Python.addInit('sense_hat_image', `smile = ${SENSEHAT_LED_IMAGE.smile}`)
            code = `sense.set_pixels(smile)\n`;
            break;
        case 'house':
            Blockly.Python.addInit('sense_hat_image', `house = ${SENSEHAT_LED_IMAGE.house}`)
            code = `sense.set_pixels(house)\n`;
            break;
        case 'sad':
            Blockly.Python.addInit('sense_hat_image', `sad = ${SENSEHAT_LED_IMAGE.sad}`)
            code = `sense.set_pixels(sad)\n`;
            break;
    };
    return code;
}

Blockly.Python.sensehat_display_set_pixel = function (block) {
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
    const red = Blockly.Python.valueToCode(block, "RED", Blockly.Python.ORDER_NONE) || 0;
    const green = Blockly.Python.valueToCode(block, "GREEN", Blockly.Python.ORDER_NONE) || 0;
    const blue = Blockly.Python.valueToCode(block, "BLUE", Blockly.Python.ORDER_NONE) || 0;
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    // Blockly.Python.addInit('color', `color = ${red, green, blue}`);
    return `sense.set_pixel(${x}, ${y}, ${red}, ${green}, ${blue})\n`;
};

Blockly.Python.sensehat_display_set_pixel_palette = function (block) {
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
    const color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "[0,0,0]";
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    // Blockly.Python.addInit('color', `color = ${color.replace('(','').replace(')','')}`);
    return `sense.set_pixel(${x}, ${y}, ${color.replace('(', '').replace(')', '')})\n`;
};

Blockly.Python.sensehat_display_get_pixel = function (block) {
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return [`sense.get_pixel(${x}, ${y})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensehat_display_get_pixels = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return [`sense.get_pixels()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensehat_show_leds_image = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    let color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || [0, 0, 0];
    color = color.replace(/\(|\)/g, '').split(',').map(Number);
    Blockly.Python.addInit('X', `X = ${[color]}`);
    Blockly.Python.addInit('O', `O = [0,0,0]`);
    // const parsedColor = color.replace('(','').replace(')','');
    let image = [];
    for (var row = 0; row < 8; row++) {
        for (var column = 0; column < 8; column++) {
            var label = "LED" + row + "" + column;
            image.push(block.getFieldValue(label, Blockly.Python.ORDER_MEMBER) === 'TRUE' ? "X" : "O");
        }
        // image += (row < 4) ? ":" : "";
    }
    Blockly.Python.addInit('image', `image = [${image}]`);
    return 'sense.set_pixels(image)' + NEWLINE;
};

Blockly.Python.sensehat_display_get_pixel = function (block) {
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return [`sense.get_pixel(${x}, ${y})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensehat_display_get_pixels = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return ['sense.get_pixels()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensehat_display_clear = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return 'sense.clear()' + NEWLINE;
};

Blockly.Python.sensehat_display_clear_with_color = function (block) {
    const color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "[0,0,0]";
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return `sense.clear(${color.replace('(', '').replace(')', '')})` + NEWLINE;
};

Blockly.Python.sensehat_display_show_message = function (block) {
    const message = Blockly.Python.valueToCode(block, "MESSAGE", Blockly.Python.ORDER_NONE) || "bonjour!";
    const color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "[0,0,0]";
    const backgroundColor = Blockly.Python.valueToCode(block, "BACKGROUND_COLOR", Blockly.Python.ORDER_NONE) || "[0,0,0]";
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || 1;
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return `sense.show_message(${message}, ${speed}, [${color.replace('(', '').replace(')', '')}], [${backgroundColor.replace('(', '').replace(')', '')}])` + NEWLINE;
};

Blockly.Python.sensehat_display_show_letter = function (block) {
    let letter = Blockly.Python.valueToCode(block, "LETTER", Blockly.Python.ORDER_NONE) || "\"\"";
    const color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "[0,0,0]";
    const backgroundColor = Blockly.Python.valueToCode(block, "BACKGROUND_COLOR", Blockly.Python.ORDER_NONE) || "[0,0,0]";
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    console.log(`sense.show_letter(${letter}, [${color.replace('(', '').replace(')', '')}], [${backgroundColor.replace('(', '').replace(')', '')}])\n`)
    return `sense.show_letter(${letter}, [${color.replace('(', '').replace(')', '')}], [${backgroundColor.replace('(', '').replace(')', '')}])` + NEWLINE;
};

// Screens

Blockly.Python.display_lcdSetText = function (block) {
    const txt = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    const line = block.getFieldValue("LINE");
    const position = block.getFieldValue("POS");
    const addr = block.getFieldValue("ADDR") || "0x3e";
    if (addr == "0x3f" || addr == "0x27") {
        Blockly.Python.addImport('CharLCD', IMPORT_RPLCD_I2C_CHARLCD);
        Blockly.Python.addInit('lcd8574', "lcd8574 = CharLCD(i2c_expander='PCF8574', address=" + addr + ", port=1, cols=16, rows=2, dotsize=8, charmap='A00', auto_linebreaks=True)");
        if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
            return "lcd8574.cursor_pos(" + position + ", " + line + ")" + NEWLINE + "lcd8574.write_string(" + txt + ")" + NEWLINE;
        } else {
            return "lcd8574.cursor_pos(" + position + ", " + line + ")" + NEWLINE + "lcd8574.write_string(str(" + txt + "))" + NEWLINE;
        }
    } else {
        Blockly.Python.addImport('JHD1802', IMPORT_GROVE_DISPLAY_JHD1802);
        Blockly.Python.addInit('lcd1602', "lcd = JHD1802()");
        if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
            return "lcd.setCursor(" + position + ", " + line + ")" + NEWLINE + "lcd.write(" + txt + ")" + NEWLINE;
        } else {
            return "lcd.setCursor(" + position + ", " + line + ")" + NEWLINE + "lcd.write(str(" + txt + "))" + NEWLINE;
        }
    }
};

Blockly.Python.display_lcdClear = function () {
    const addr = block.getFieldValue("ADDR") || "0x3e";
    if (addr == "0x3f" || addr == "0x27") {
        Blockly.Python.addImport('CharLCD', IMPORT_RPLCD_I2C_CHARLCD);
        Blockly.Python.addInit('lcd8574', "lcd8574 = CharLCD(i2c_expander='PCF8574', address=" + addr + ", port=1, cols=16, rows=2, dotsize=8, charmap='A00', auto_linebreaks=True)");
        return "lcd8574.clear()" + NEWLINE;
    } else {
        Blockly.Python.addImport('JHD1802', IMPORT_GROVE_DISPLAY_JHD1802);
        Blockly.Python.addInit('lcd1602', "lcd = JHD1802()");
        return "lcd.clear()" + NEWLINE;
    }
};

// Neopixel

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

/**
 * This is not a block generator, it's util function used in all neopixel blocks.
 * Add neopixel init code.
 * @param {int} pin
 * @param {int} ledCount
 */
Blockly.Python.DISPLAY_NEOPIXEL_INIT_GENERATOR = function (pin, ledCount) {
    Blockly.Python.addImport('rpi_ws281x', IMPORT_RPI_WS281X_PIXELSTRIP);
    Blockly.Python.addHiddenConstant(`NEOPIXEL_LED_COUNT_${pin}`, ledCount);
    Blockly.Python.addInit('neopixel_' + pin, "# Neopixel on " + pin);
    Blockly.Python.addInit('np_' + pin, "np_" + pin + " = " + "PixelStrip(" + ledCount + ", " + pin + ")");
    Blockly.Python.addPowerOn('np_' + pin, "np_" + pin + ".begin()");
};

Blockly.Python.display_defineNeopixel = function (block) {
    const ledCount = Blockly.Python.valueToCode(block, "N", Blockly.Python.ORDER_NONE) || "20";
    const pin = block.getFieldValue("PIN");
    Blockly.Python.DISPLAY_NEOPIXEL_INIT_GENERATOR(pin, ledCount);
    return "";
};

Blockly.Python.display_controlNeopixelLed = function (block) {
    const pin = block.getFieldValue("PIN");
    const led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.DISPLAY_NEOPIXEL_INIT_GENERATOR(pin, "30");
    }
    return "np_" + pin + ".setPixelColor(" + led + ", Color(" + r + ", " + g + ", " + b + "))" + NEWLINE + "np_" + pin + ".show()" + NEWLINE;
};

Blockly.Python.display_controlColorNeopixelLed = function (block) {
    const pin = block.getFieldValue("PIN");
    const ledIndex = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    Blockly.Python.DISPLAY_NEOPIXEL_INIT_GENERATOR(pin, "30");
    return "np_" + pin + ".setPixelColor(" + ledIndex + ", Color" + colour + ")" + NEWLINE + "np_" + pin + ".show()" + NEWLINE;
};

Blockly.Python.display_neopixel_controlAllLedRGB = function (block) {
    const pin = block.getFieldValue("PIN");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.DISPLAY_NEOPIXEL_INIT_GENERATOR(pin, "30");
    }
    const ChekLedConst = Blockly.Python.hiddenConstants_[`NEOPIXEL_LED_COUNT_${pin}`] || "None";
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_RASPBERRY.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(np_" + pin + ", " + ChekLedConst + ", " + r + ", " + g + ", " + b + ")" + NEWLINE;
};

Blockly.Python.display_neopixel_controlAllLedPalette = function (block) {
    const pin = block.getFieldValue("PIN");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.DISPLAY_NEOPIXEL_INIT_GENERATOR(pin, "30");
    }
    const ChekLedConst = Blockly.Python.hiddenConstants_[`NEOPIXEL_LED_COUNT_${pin}`] || "None";
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_RASPBERRY.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(np_" + pin + ", " + ChekLedConst + ", " + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ")" + NEWLINE;
};

Blockly.Python.display_rainbowNeopixel = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_RASPBERRY.DEF_NEOPIXEL_SHOW_ALL_LED);
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.DISPLAY_NEOPIXEL_INIT_GENERATOR(pin, "30");
    }
    const ChekLedConst = Blockly.Python.hiddenConstants_[`NEOPIXEL_LED_COUNT_${pin}`] || "None";
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_RASPBERRY.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(np_" + pin + ", " + ChekLedConst + ")" + NEWLINE;
};

// LED modules

Blockly.Python.display_setGroveSocketLed = function (block) {
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'LED Module');
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return "GPIO.output(" + pinName + ", " + state + ")" + NEWLINE;
};

Blockly.Python.display_setLEDintensity = function (block) {
    const pin = block.getFieldValue("PIN");
    const pwmName = Blockly.Python.Generators.pwm(pin, 'LED Module', 5000);
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    return pwmName + ".ChangeDutyCycle(" + value + ")" + NEWLINE;
};

Blockly.Python.display_setVariableColorLED = function (block) {
    const pin = block.getFieldValue("PIN");
    const pwmName = Blockly.Python.Generators.pwm(pin, 'Variable Color LED', 5000);
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_ATOMIC) || "0";
    return pwmName + ".ChangeDutyCycle(100 - " + value + ")" + NEWLINE;
};

Blockly.Python.display_setNumberGrove4Digit = function (block) {
    const pinName_CLK = Blockly.Python.Generators.digital_write(block.getFieldValue("CLK"));
    const pinName_DIO = Blockly.Python.Generators.digital_write(block.getFieldValue("DIO"));
    const n = Blockly.Python.valueToCode(block, "N", Blockly.Python.ORDER_NONE) || "0";
    const displayOption = block.getFieldValue("SHOW");
    const objName = "tm1637_" + pinName_CLK;
    Blockly.Python.addImport('Grove4DigitDisplay', IMPORT_GROVE_4_DIGIT_DISPLAY);
    Blockly.Python.addInit(objName + '_codeFlag', '# 4 Digit Display CLK/DIO on ' + pinName_CLK + '/' + pinName_DIO);
    Blockly.Python.addInit(objName, objName + " = Grove4DigitDisplay(" + pinName_CLK + ", " + pinName_DIO + ")");
    switch (displayOption) {
        case "NUM":
            Blockly.Python.addFunction('DigitDisplay_number', FUNCTIONS_RASPBERRY.DEF_4DIGITDISPLAY_NUMBER);
            return objName + ".show(DigitDisplay_number(" + n + "))" + NEWLINE;
        case "TEMP":
            Blockly.Python.addFunction('DigitDisplay_temperature', FUNCTIONS_RASPBERRY.DEF_4DIGITDISPLAY_TEMP);
            return objName + ".show(DigitDisplay_temperature(" + n + "))" + NEWLINE;
        default:
            throw Error("Unhandled display option: " + displayOption);
    }
};

Blockly.Python.display_setClockGrove4Digit = function (block) {
    const pinName_CLK = Blockly.Python.Generators.digital_write(block.getFieldValue("CLK"));
    const pinName_DIO = Blockly.Python.Generators.digital_write(block.getFieldValue("DIO"));
    const objName = "tm1637_" + pinName_CLK;
    Blockly.Python.addImport('Grove4DigitDisplay', IMPORT_GROVE_4_DIGIT_DISPLAY);
    Blockly.Python.addInit(objName + '_codeFlag', '# 4 Digit Display CLK/DIO on ' + pinName_CLK + '/' + pinName_DIO);
    Blockly.Python.addInit(objName, objName + " = Grove4DigitDisplay(" + pinName_CLK + ", " + pinName_DIO + ")");
    return objName + ".show(time.strftime(\"%H%M\", time.localtime(time.time())))" + NEWLINE;
};

Blockly.Python.display_setLevelLedBar = function (block) {
    const pinName_DI = Blockly.Python.Generators.digital_write(block.getFieldValue("DI"));
    const pinName_DCKI = Blockly.Python.Generators.digital_write(block.getFieldValue("DCKI"));
    const objName = 'ledBar_' + pinName_DI;
    Blockly.Python.addImport('stm32_my9221', IMPORT_STM32_MY9221);
    Blockly.Python.addInit(objName + '_codeFlag', '# LED Bar DI/DCKI on ' + pinName_DI + '/' + pinName_DCKI);
    Blockly.Python.addInit(objName, objName + " = MY9221(" + pinName_DI + ", " + pinName_DCKI + ")");
    const level = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    return objName + ".level(" + level + ")" + NEWLINE;
};

Blockly.Python.display_my9221_reverse = function (block) {
    const pinName_DI = Blockly.Python.Generators.digital_write(block.getFieldValue("DI"));
    const pinName_DCKI = Blockly.Python.Generators.digital_write(block.getFieldValue("DCKI"));
    const objName = 'ledBar_' + pinName_DI;
    Blockly.Python.addImport('stm32_my9221', IMPORT_STM32_MY9221);
    Blockly.Python.addInit(objName + '_codeFlag', '# LED Bar DI/DCKI on ' + pinName_DI + '/' + pinName_DCKI);
    Blockly.Python.addInit(objName, objName + " = MY9221(" + pinName_DI + ", " + pinName_DCKI + ")");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return objName + ".reverse(" + state + ")" + NEWLINE;
};