/**
 * @fileoverview Display generators for Micro:bit.
 */

// Micro:bit screen

Blockly.Python.show_leds = function (block) {
    const BRIGHTNESS = 9;
    let image = "";
    for (var row = 0; row < 5; row++) {
        for (var column = 0; column < 5; column++) {
            var label = "LED" + row + "" + column;
            image += (block.getFieldValue(label, Blockly.Python.ORDER_MEMBER) === "TRUE") ? BRIGHTNESS : "0";
        }
        image += (row < 4) ? ":" : "";
    }
    return "led_image = Image('" + image + "')" + NEWLINE + "display.show(led_image)" + NEWLINE;
};

Blockly.Python.show_number = function (block) {
    const number = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "''";
    return "display.show(" + number + ")" + NEWLINE;
};

Blockly.Python.show_string = function (block) {
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    let delay = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_NONE) || null;
    if (delay === undefined || delay === null) {
        delay = "150";
    }
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT") || Blockly.Constants.Utils.isInputMathBlock(block, "TEXT")) {
        return "display.scroll(" + text + ", delay=" + delay + ", wait=True)" + NEWLINE;
    } else {
        return "display.scroll(str(" + text + "), delay=" + delay + ", wait=True)" + NEWLINE;
    }
};

Blockly.Python.show_icon = function (block) {
    const icon = block.getFieldValue("ICON") || "NO";
    return "display.show(Image." + icon + ")" + NEWLINE;
};

Blockly.Python.show_icon_simple = function (block) {
    const icon = block.getFieldValue("ICON") || "NO";
    return "display.show(Image." + icon + ")" + NEWLINE;
};

Blockly.Python.show_clock = function (block) {
    const hour = Blockly.Python.valueToCode(block, "CLOCK", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addFunction('showClock', FUNCTIONS_MICROBIT.DEF_MICROBIT_SHOW_CLOCK);
    return "showClock(" + hour + ")" + NEWLINE;
};

Blockly.Python.show_arrow = function (block) {
    const dir = block.getFieldValue("ARROW") || "NO";
    return "display.show(Image.ARROW_" + dir + ")" + NEWLINE;
};

Blockly.Python.display_show_gauge = function (block) {
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const max = Blockly.Python.valueToCode(block, "MAX", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addFunction('plotBarGraph', FUNCTIONS_MICROBIT.DEF_MICROBIT_LED_GAUGE);
    return "plotBarGraph(" + value + ", " + max + ")" + NEWLINE;
};

Blockly.Python.display_plot_bar_graph = function (block) {
    Blockly.Python.addImport('bar_graph', IMPORT_BAR_GRAPH);
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    let to = Blockly.Python.valueToCode(block, 'TO', Blockly.Python.ORDER_NONE) || null;
    if (to === undefined || to === null) {
        return `bar_graph.plot_bar_graph(${value})` + NEWLINE;
    }
    return `bar_graph.plot_bar_graph(${value}, ${to})` + NEWLINE;
};

Blockly.Python.set_pixel = function (block) {
    let x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    let y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    if (x < 0) x = 0;
    if (x > 5) x = 5;
    if (y < 0) y = 0;
    if (y > 5) y = 5;
    return "display.set_pixel(" + x + ", " + y + ", 9 if " + state + " else 0)" + NEWLINE;
};

Blockly.Python.get_pixelState = function (block) {
    let x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    let y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    if (x < 0) x = 0;
    if (x > 5) x = 5;
    if (y < 0) y = 0;
    if (y > 5) y = 5;
    return ["display.get_pixel(" + x + ", " + y + ") > 0", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.toggle_pixelState = function (block) {
    Blockly.Python.addFunction('microbit_toggle_pixel', FUNCTIONS_MICROBIT.DEF_MICROBIT_TOGGLE_PIXEL_STATE);
    let x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    let y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    if (x < 0) x = 0;
    if (x > 5) x = 5;
    if (y < 0) y = 0;
    if (y > 5) y = 5;
    return "togglePixelState(" + x + ", " + y + ")" + NEWLINE;
};

Blockly.Python.set_light_pixel = function (block) {
    let x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    let y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    const light = Blockly.Python.valueToCode(block, "LIGHT", Blockly.Python.ORDER_NONE) || "0";
    if (x < 0) x = 0;
    if (x > 5) x = 5;
    if (y < 0) y = 0;
    if (y > 5) y = 5;
    if (light < 0) light = 0;
    if (light > 9) light = 9;
    return "display.set_pixel(" + x + ', ' + y + ', ' + light + ')' + NEWLINE;
};

Blockly.Python.set_brightness = function (block) {
    Blockly.Python.addFunction('microbit_set_brightness', FUNCTIONS_MICROBIT.DEF_MICROBIT_SET_BRIGHTNESS);
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    return `set_brightness(${value})` + NEWLINE;
};

Blockly.Python.clear = function () {
    return "display.clear()" + NEWLINE;
};

// Screens

Blockly.Python.display_lcdSetText = function (block) {
    Blockly.Python.addImport('lcd1602', IMPORT_LCD1602);
    Blockly.Python.addInit('lcd1602', "lcd = LCD1602()");
    const txt = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    const line = block.getFieldValue("LINE");
    const position = block.getFieldValue("POS");
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
        return "lcd.setCursor(" + position + ", " + line + ")" + NEWLINE + "lcd.writeTxt(" + txt + ")" + NEWLINE;
    } else {
        return "lcd.setCursor(" + position + ", " + line + ")" + NEWLINE + "lcd.writeTxt(str(" + txt + "))" + NEWLINE;
    }
};

Blockly.Python.display_lcdClear = function (block) {
    Blockly.Python.addImport('lcd1602', IMPORT_LCD1602);
    Blockly.Python.addInit('lcd1602', "lcd = LCD1602()");
    return "lcd.clear()" + NEWLINE;
};

Blockly.Python.display_addOledText = function (block) {
    Blockly.Python.addImport('oled', IMPORT_OLED);
    Blockly.Python.addInit('oled', "oled = OLED()");
    const str = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    let x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    if (x > 11) x = 11;
    if (x < 0) x = 0;
    let y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
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
    let x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    if (x > 63) x = 63;
    if (x < 0) x = 0;
    let y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    if (y > 31) y = 31;
    if (y < 0) y = 0;
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return "oled.set_px(" + x + ", " + y + ", " + state + ")" + NEWLINE;
};

Blockly.Python.display_showOledIcon = function (block) {
    Blockly.Python.addImport('oled', IMPORT_OLED);
    Blockly.Python.addInit('oled', "oled = OLED()");
    const img = block.getFieldValue("ICON") || "NO";
    let x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    if (x > 59) x = 59;
    if (x < 0) x = 0;
    let y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    if (y > 31) y = 31;
    if (y < 0) y = 0;
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
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
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('ledModule_' + pin, "# LED Module on " + pin);
    return pin + ".write_digital(" + state + ")" + NEWLINE;
};

Blockly.Python.display_setLEDintensity = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('ledModule_' + pin, "# LED Module on " + pin);
    return pin + ".write_analog(" + value + ")" + NEWLINE;
};

Blockly.Python.display_setVariableColorLED = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('ledModule_' + pin, "# Variable Color LED on " + pin);
    return `${pin}.write_analog(int(${PWM_MAX_DUTY} * (1 -${value} / 100)))` + NEWLINE;
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
    Blockly.Python.addInit('neopixel_' + numPin, "np_" + numPin + " = neopixel.NeoPixel(" + pin + ", " + NEOPIXEL_LED_COUNT + numPin + ")");
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
    const led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    }
    return "np_" + pin.substr(3) + "[" + led + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "np_" + pin.substr(3) + ".show()" + NEWLINE;
};

Blockly.Python.display_controlColorNeopixelLed = function (block) {
    const pin = block.getFieldValue("PIN");
    const ledIndex = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    return "np_" + pin.substr(3) + "[" + ledIndex + "] = " + colour + NEWLINE + "np_" + pin.substr(3) + ".show()" + NEWLINE;
};

Blockly.Python.display_neopixel_controlAllLedRGB = function (block) {
    const pin = block.getFieldValue("PIN");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    }
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(np_" + pin.substr(3) + ", " + NEOPIXEL_LED_COUNT + pin.substr(3) + ", " + r + ", " + g + ", " + b + ")" + NEWLINE;
};

Blockly.Python.display_neopixel_controlAllLedPalette = function (block) {
    const pin = block.getFieldValue("PIN");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    }
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(np_" + pin.substr(3) + ", " + NEOPIXEL_LED_COUNT + pin.substr(3) + ", " + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ")" + NEWLINE;
};

Blockly.Python.display_rainbowNeopixel = function (block) {
    const pin = block.getFieldValue("PIN");
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "30");
    }
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(np_" + pin.substr(3) + ", " + NEOPIXEL_LED_COUNT + pin.substr(3) + ")" + NEWLINE;
};

Blockly.Python.display_controlZipHaloLed = function (block) {
    const pin = 'pin8';
    const led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "60");
    }
    return "np_" + pin.substr(3) + "[" + led + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "np_" + pin.substr(3) + ".show()" + NEWLINE;
};

Blockly.Python.display_controlColorZipHaloLed = function (block) {
    const pin = 'pin8';
    const ledIndex = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "60");
    }
    return "np_" + pin.substr(3) + "[" + ledIndex + "] = " + colour + NEWLINE + "np_" + pin.substr(3) + ".show()" + NEWLINE;
};

Blockly.Python.display_ZipHaloLed_controlAllLedRGB = function (block) {
    const pin = 'pin8';
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "60");
    }
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(np_" + pin.substr(3) + ", " + NEOPIXEL_LED_COUNT + pin.substr(3) + ", " + r + ", " + g + ", " + b + ")" + NEWLINE;
};

Blockly.Python.display_ZipHaloLed_controlAllLedPalette = function (block) {
    const pin = 'pin8';
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "60");
    }
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(np_" + pin.substr(3) + ", " + NEOPIXEL_LED_COUNT + pin.substr(3) + ", " + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ")" + NEWLINE;
};

Blockly.Python.display_ZipHaloLed_rainbow = function (block) {
    const pin = 'pin8';
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(block, pin, "60");
    }
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(np_" + pin.substr(3) + ", " + NEOPIXEL_LED_COUNT + pin.substr(3) + ")" + NEWLINE;
};

Blockly.Python.display_setNumberGrove4Digit = function (block) {
    const pinCLK = block.getFieldValue("CLK");
    const pinDIO = block.getFieldValue("DIO");
    const n = Blockly.Python.valueToCode(block, "N", Blockly.Python.ORDER_NONE) || "0";
    const displayOption = block.getFieldValue("SHOW");
    const objName = 'tm1637_' + pinCLK.substr(3);
    Blockly.Python.addImport('tm1637', IMPORT_TM1637);
    Blockly.Python.addInit(objName + '-clk', '# 4 Digit Display CLK on ' + pinCLK);
    Blockly.Python.addInit(objName + '-dio', '# 4 Digit Display DIO on ' + pinDIO);
    Blockly.Python.addInit(objName, objName + " = TM1637(clk=" + pinCLK + ", dio=" + pinDIO + ")");
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
    const date = new Date();
    const pinCLK = block.getFieldValue("CLK");
    const pinDIO = block.getFieldValue("DIO");
    const objName = 'tm1637_' + pinCLK.substr(3);
    Blockly.Python.addConstant('chronometer', "t0 = 0");
    block.workspace.createVariable('t0');
    Blockly.Python.addConstant('time_read',
        "#Warning, the clock is recovered by browser when micro:bit is flashed." + NEWLINE +
        "#If micro:bit is powered off, time will not flow." + NEWLINE +
        "MIN_START = " + date.getMinutes() + NEWLINE +
        "HOUR_START = " + date.getHours());
    Blockly.Python.addImport('tm1637', IMPORT_TM1637);
    Blockly.Python.addFunction('getCurrentTime', FUNCTIONS_MICROBIT.DEF_GET_CURRENT_TIME);
    Blockly.Python.addInit(objName + '-clk', '# 4 Digit Display CLK on ' + pinCLK);
    Blockly.Python.addInit(objName + '-dio', '# 4 Digit Display DIO on ' + pinDIO);
    Blockly.Python.addInit(objName, objName + " = TM1637(clk=" + pinCLK + ", dio=" + pinDIO + ")");
    return objName + ".clock(getCurrentTime())" + NEWLINE;
};

Blockly.Python.display_setLevelLedBar = function (block) {
    const pinDI = block.getFieldValue("DI");
    const pinDCKI = block.getFieldValue("DCKI");
    const level = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const objName = 'my9221_P' + pinDI.substr(3);
    Blockly.Python.addImport('my9221', IMPORT_MY9221);
    Blockly.Python.addInit(objName + '-di', "# LED Bar DI on " + pinDI);
    Blockly.Python.addInit(objName + '-dcki', "# LED Bar DCKI on " + pinDCKI);
    Blockly.Python.addInit(objName, objName + " = MY9221(di=" + pinDI + ", dcki=" + pinDCKI + ", reverse=False)");
    return objName + ".level(" + level + ")" + NEWLINE;
};

Blockly.Python.display_my9221_reverse = function (block) {
    const pinDI = block.getFieldValue("DI");
    const pinDCKI = block.getFieldValue("DCKI");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const objName = 'my9221_P' + pinDI.substr(3);
    Blockly.Python.addImport('my9221', IMPORT_MY9221);
    Blockly.Python.addInit(objName + '-di', "# LED Bar DI on " + pinDI);
    Blockly.Python.addInit(objName + '-dcki', "# LED Bar DCKI on " + pinDCKI);
    Blockly.Python.addInit(objName, objName + " = MY9221(di=" + pinDI + ", dcki=" + pinDCKI + ", reverse=False)");
    return objName + ".reverse(" + state + ")" + NEWLINE;
};

Blockly.Python.display_setTrafficLight = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('traffic_light_module_', "# Traffic Light");
    return block.getFieldValue("PIN") + ".write_digital(" + state + ")" + NEWLINE;
};

Blockly.Python.display_setLampBitLight = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('street_light_module_', '# Street Light');
    return `pin0.write_digital(${state})` + NEWLINE;
};

/* LED MATRIX */
Blockly.Python.display_rgb_led_matrix_DrawBitmap = function (block) {
    Blockly.Python.addImport('rgb_led_matrix', IMPORT_RGB_LED_MATRIX);
    Blockly.Python.addInit('RGBmatrix', "RGBmatrix = GroveTwoRGBLedMatrix()");
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
    Blockly.Python.addImport('rgb_led_matrix', IMPORT_RGB_LED_MATRIX);
    Blockly.Python.addInit('RGBmatrix', "RGBmatrix = GroveTwoRGBLedMatrix()");
    return "RGBmatrix.stopDisplay()" + NEWLINE;
};

Blockly.Python.display_led_matrix_DrawBitmap = function (block) {
    Blockly.Python.addImport('ht16k33matrix', IMPORT_HT16K33_MATRIX);
    Blockly.Python.addInit('HT16K33Matrix', "ht16k33matrix = HT16K33Matrix()");
    const matrix_color = block.getField("LEDS_MATRIX").getText().split(',');
    let code = "b\"";
    if (matrix_color.length != 0) {
        for (var i = 0; i < matrix_color.length; i++) {
            code += "\\x";
            let hex = parseInt(matrix_color[i], 2).toString(16).toUpperCase();
            code += ((hex.length > 1) ? hex : "0" + hex);
        }
    }
    return "ht16k33matrix.set_icon(" + code + "\")"+ NEWLINE + "ht16k33matrix.draw()" + NEWLINE;
};

Blockly.Python.display_led_matrix_clear = function () {
    Blockly.Python.addImport('ht16k33matrix', IMPORT_HT16K33_MATRIX);
    Blockly.Python.addInit('HT16K33Matrix', "ht16k33matrix = HT16K33Matrix()");
    return "ht16k33matrix.clear()" + NEWLINE;
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

// Games

// Functions used in morpion blocks for generators
Blockly.Python.initializeGamesGenerator = function (block) {
    Blockly.Python.addImport('game', IMPORT_GAME);
    Blockly.Python.addInit('myGame', "myGame = GAME()");
    block.workspace.createVariable("sprite");
};

Blockly.Python.display_games_createSprite = function (block) {
    Blockly.Python.initializeGamesGenerator(block);
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    return ["myGame.createSprite(" + x + "," + y + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.display_games_deleteSprite = function (block) {
    Blockly.Python.initializeGamesGenerator(block);
    const spriteVar = Blockly.Python.valueToCode(block, "SPRITE", Blockly.Python.ORDER_MEMBER) || "''";
    return spriteVar + ".delete()" + NEWLINE;
};

Blockly.Python.display_games_isSpriteDeleted = function (block) {
    Blockly.Python.initializeGamesGenerator(block);
    const spriteVar = Blockly.Python.valueToCode(block, "SPRITE", Blockly.Python.ORDER_MEMBER) || "''";
    return [spriteVar + ".deleted", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.display_games_moveSprite = function (block) {
    Blockly.Python.initializeGamesGenerator(block);
    const spriteVar = Blockly.Python.valueToCode(block, "SPRITE", Blockly.Python.ORDER_MEMBER) || "''";
    const step = Blockly.Python.valueToCode(block, "STEP", Blockly.Python.ORDER_MEMBER) || "0";
    const dir = block.getFieldValue("DIR")
    switch (dir) {
        case "LEFT":
            return spriteVar + ".move('left', " + step + ")" + NEWLINE;
        case "RIGHT":
            return spriteVar + ".move('right', " + step + ")" + NEWLINE;
        case "UP":
            return spriteVar + ".move('up', " + step + ")" + NEWLINE;
        case "DOWN":
            return spriteVar + ".move('down', " + step + ")" + NEWLINE;
        default:
            throw Error("Unhandled move option: " + dir);
    }
};

Blockly.Python.display_games_getSpritePosition = function (block) {
    Blockly.Python.initializeGamesGenerator(block);
    const spriteVar = Blockly.Python.valueToCode(block, "SPRITE", Blockly.Python.ORDER_MEMBER) || "''";
    return [spriteVar + "." + block.getFieldValue("POS"), Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.display_games_changeScore = function (block) {
    Blockly.Python.initializeGamesGenerator(block);
    const n = Blockly.Python.valueToCode(block, "N", Blockly.Python.ORDER_MEMBER) || "0";
    return "myGame.changeScore(" + n + ")" + NEWLINE;
};

Blockly.Python.display_games_getScore = function (block) {
    Blockly.Python.initializeGamesGenerator(block);
    return ["myGame.score", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.display_games_stopGame = function (block) {
    Blockly.Python.initializeGamesGenerator(block);
    return "myGame.stopGame()" + NEWLINE;
};

Blockly.Python.display_games_isEndGame = function (block) {
    Blockly.Python.initializeGamesGenerator(block);
    return ["myGame.endGame", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.display_games_restartGame = function (block) {
    Blockly.Python.initializeGamesGenerator(block);
    return "myGame.startGame()" + NEWLINE;
};