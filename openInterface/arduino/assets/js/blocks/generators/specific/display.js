/**
 * @fileoverview Display generators for Arduino.
 */

// BUILTIN LED _ CONTROL STATE
Blockly.Arduino.io_control_arduino_led = function (block) {
    Blockly.Arduino.addSetup('pin13', "pinMode(13, OUTPUT);", !1);
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    return "digitalWrite(13, " + state + ");" + NEWLINE;
};

// UNO R4 WIFI - LED MATRIX DRAW BITMAP
Blockly.Arduino.display_builtinMatrix_drawBitmap = function (block) {
    const x = Blockly.Arduino.valueToCode(block, "X", Blockly.Arduino.ORDER_ATOMIC);
    const y = Blockly.Arduino.valueToCode(block, "Y", Blockly.Arduino.ORDER_ATOMIC);
    const clear = block.getFieldValue("CLEARING");
    const objName = "builtinMatrix";
    Blockly.Arduino.addInclude("ArduinoGraphics", INCLUDE_ARDUINO_GRAPHICS);
    Blockly.Arduino.addInclude("Arduino_LED_Matrix", INCLUDE_ARDUINO_LED_MATRIX);
    Blockly.Arduino.addDeclaration(objName + '-simu', "// LED Matrix");
    Blockly.Arduino.addDeclaration(objName, "ArduinoLEDMatrix " + objName + ";");
    Blockly.Arduino.addDeclaration('declare_matrix_frame_32bit', "uint32_t frame_32bits[3] = {0};");
    Blockly.Arduino.addFunction('matrix_drawFrameAt', FUNCTIONS_ARDUINO.DEF_LED_MATRIX_DRAW_AT);
    Blockly.Arduino.addSetup(objName + "-begin", objName + ".begin();");
    let code = "";
    const binary_img = block.getField("LEDS_MATRIX_BUTTON")['altText_'].split(',');
    function columns8ToUint32(binCols, msbTop = true) {
        const cols = binCols.map(b => typeof b === "string" ? parseInt(b, 2) : (b >>> 0) & 0xFF);
        const words = [0, 0, 0];
        let i = 0;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 12; col++) {
                const bit = msbTop ? (cols[col] >> (7 - row)) & 1 : (cols[col] >> row) & 1;
                const pos = 31 - (i % 32);
                const w = (i / 32) | 0;
                if (bit) words[w] |= (1 << pos);
                i++;
            }
        }
        return words.map(w => w >>> 0);
    }
    const binary = columns8ToUint32(binary_img);
    for (let i = 0; i < 3; i++) {
        const hexValues = binary.map(x => "0x" + x.toString(16).padStart(8, "0"));
        code += "frame_32bits[" + i + "] = " + hexValues[i] + ";" + NEWLINE;
    }
    switch (clear) {
        case "WITHOUT":
            return code += "matrix_drawFrameAt(frame_32bits, " + x + ", " + y + ", false);" + NEWLINE;
        default:
        case "WITH":
            return code += "matrix_drawFrameAt(frame_32bits, " + x + ", " + y + ");" + NEWLINE;
    }
};

// UNO R4 WIFI - LED MATRIX DISPLAY TEXT
Blockly.Arduino.display_builtinMatrix_drawString = function (block) {
    const text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_ATOMIC);
    const speed = Blockly.Arduino.valueToCode(block, "SPEED", Blockly.Arduino.ORDER_ATOMIC);
    const objName = "builtinMatrix";
    Blockly.Arduino.addInclude("ArduinoGraphics", INCLUDE_ARDUINO_GRAPHICS);
    Blockly.Arduino.addInclude("Arduino_LED_Matrix", INCLUDE_ARDUINO_LED_MATRIX);
    Blockly.Arduino.addDeclaration(objName + '-simu', "// LED Matrix");
    Blockly.Arduino.addDeclaration(objName, "ArduinoLEDMatrix " + objName + ";");
    Blockly.Arduino.addFunction('matrix_scrollText', FUNCTIONS_ARDUINO.DEF_LED_MATRIX_SCROLL_TEXT);
    Blockly.Arduino.addSetup(objName + "-begin", objName + ".begin();");
    const c = block.inputList[0].connection.targetBlock();
    if (c && (c.type !== 'text') && (c.type !== 'text_join')) {
        return "matrix_scrollText(String(" + text + "), " + speed + ", Font_5x7);" + NEWLINE;
    }
    return "matrix_scrollText(" + text + ", " + speed + ", Font_5x7);" + NEWLINE;
};

// UNO R4 WIFI - LED MATRIX DISPLAY NUMBER
Blockly.Arduino.display_builtinMatrix_showNumber = function (block) {
    const number = Blockly.Arduino.valueToCode(block, "N", Blockly.Arduino.ORDER_ATOMIC);
    const objName = "builtinMatrix";
    Blockly.Arduino.addInclude("ArduinoGraphics", INCLUDE_ARDUINO_GRAPHICS);
    Blockly.Arduino.addInclude("Arduino_LED_Matrix", INCLUDE_ARDUINO_LED_MATRIX);
    Blockly.Arduino.addDefine('DIGITS_3x5', FUNCTIONS_ARDUINO.DEF_LED_MATRIX_DIGITS_5X7);
    Blockly.Arduino.addDeclaration(objName + '-simu', "// LED Matrix");
    Blockly.Arduino.addDeclaration(objName, "ArduinoLEDMatrix " + objName + ";");
    Blockly.Arduino.addFunction('matrix_drawDigit3x5', FUNCTIONS_ARDUINO.DEF_LED_MATRIX_DRAW_DIGIT);
    Blockly.Arduino.addFunction('matrix_scrollText', FUNCTIONS_ARDUINO.DEF_LED_MATRIX_SCROLL_TEXT);
    Blockly.Arduino.addFunction('matrix_displayNumber', FUNCTIONS_ARDUINO.DEF_LED_MATRIX_DISPLAY_NUMERIC);
    Blockly.Arduino.addSetup(objName + "-begin", objName + ".begin();");
    return "matrix_displayNumber(" + number + ");" + NEWLINE;
};

// UNO R4 WIFI - LED MATRIX SET PIXEL
Blockly.Arduino.display_builtinMatrix_setPixel = function (block) {
    const x = Blockly.Arduino.valueToCode(block, "N", Blockly.Arduino.ORDER_ATOMIC) || "0";
    const y = Blockly.Arduino.valueToCode(block, "N", Blockly.Arduino.ORDER_ATOMIC) || "0";
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || "LOW";
    const objName = "builtinMatrix";
    Blockly.Arduino.addInclude("ArduinoGraphics", INCLUDE_ARDUINO_GRAPHICS);
    Blockly.Arduino.addInclude("Arduino_LED_Matrix", INCLUDE_ARDUINO_LED_MATRIX);
    Blockly.Arduino.addDeclaration(objName + '-simu', "// LED Matrix");
    Blockly.Arduino.addDeclaration(objName, "ArduinoLEDMatrix " + objName + ";");
    Blockly.Arduino.addSetup(objName + "-begin", objName + ".begin();");
    Blockly.Arduino.addFunction('matrix_setPixel', FUNCTIONS_ARDUINO.DEF_LED_MATRIX_SET_PIXEL);
    return "matrix_setPixel(" + x + ", " + y + ", " + state + ");" + NEWLINE;
};

// UNO R4 WIFI - LED MATRIX CLEAR
Blockly.Arduino.display_builtinMatrix_clearScreen = function () {
    const objName = "builtinMatrix";
    Blockly.Arduino.addInclude("Arduino_LED_Matrix", INCLUDE_ARDUINO_LED_MATRIX);
    Blockly.Arduino.addDeclaration(objName + '-simu', "// LED Matrix");
    Blockly.Arduino.addDeclaration(objName, "ArduinoLEDMatrix " + objName + ";");
    Blockly.Arduino.addSetup(objName + "-begin", objName + ".begin();");
    return "const uint32_t blankFrame[3] = {0, 0, 0};" + NEWLINE + objName + ".loadFrame(blankFrame);" + NEWLINE;
};

// LCD RGB _ SET TEXT BLOCK 
Blockly.Arduino.display_lcdRGBSetText = function (block) {
    const txt = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_ATOMIC) || "''";
    const line = block.getFieldValue("LINE");
    const position = block.getFieldValue("POS");
    const addr = block.getFieldValue("ADDR") || "0x3e";
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    if (addr == "0x3f" || addr == "0x27") {
        Blockly.Arduino.addInclude('LiquidCrystal_I2C', INCLUDE_LIQUID_CRYSTAL_I2C);
        Blockly.Arduino.addDeclaration('LiquidCrystal_I2C', "LiquidCrystal_I2C lcd(" + addr + ", 16, 2);");
        Blockly.Arduino.addSetup('LiquidCrystal_I2C', "lcd.init();" + NEWLINE + "lcd.backlight();");
        return "lcd.setCursor(" + position + ", " + line + ");" + NEWLINE + "lcd.print(String(" + txt + "));" + NEWLINE;
    } else {
        Blockly.Arduino.addInclude('rgb_lcd', INCLUDE_RGB_LCD);
        Blockly.Arduino.addDeclaration('rgb_lcd', "rgb_lcd lcdRgb;");
        Blockly.Arduino.addSetup('rgb_lcd', "lcdRgb.begin(16, 2);");
        return "lcdRgb.setCursor(" + position + ", " + line + ");" + NEWLINE + "lcdRgb.print(String(" + txt + "));" + NEWLINE;
    }
};

// LCD RGB _ CLEAR SCREEN BLOCK
Blockly.Arduino.display_lcdRGBClear = function (block) {
    const addr = block.getFieldValue("ADDR") || "0x3e";
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    if (addr == "0x3f" || addr == "0x27") {
        Blockly.Arduino.addInclude('LiquidCrystal_I2C', INCLUDE_LIQUID_CRYSTAL_I2C);
        Blockly.Arduino.addDeclaration('LiquidCrystal_I2C', "LiquidCrystal_I2C lcd(" + addr + ", 16, 2);");
        Blockly.Arduino.addSetup('LiquidCrystal_I2C', "lcd.init();" + NEWLINE + "lcd.backlight();");
        return "lcd.clear();" + NEWLINE;
    } else {
        Blockly.Arduino.addInclude('rgb_lcd', INCLUDE_RGB_LCD);
        Blockly.Arduino.addDeclaration('rgb_lcd', "rgb_lcd lcdRgb;");
        Blockly.Arduino.addSetup('rgb_lcd', "lcdRgb.begin(16, 2);");
        return "lcdRgb.clear();" + NEWLINE;
    }
};

// LCD RGB _ SET DISPLAY BLOCK
Blockly.Arduino.display_setDisplay = function (block) {
    const addr = block.getFieldValue("ADDR");
    const state = block.getFieldValue("STATE");
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    if (addr == "0x3f" || addr == "0x27") {
        Blockly.Arduino.addInclude('LiquidCrystal_I2C', INCLUDE_LIQUID_CRYSTAL_I2C);
        Blockly.Arduino.addDeclaration('LiquidCrystal_I2C', "LiquidCrystal_I2C lcd(" + addr + ", 16, 2);");
        Blockly.Arduino.addSetup('LiquidCrystal_I2C', "lcd.init();" + NEWLINE + "lcd.backlight();");
        switch (state) {
            case "ON":
                return "lcd.display();" + NEWLINE + "lcd.setBacklight(1);" + NEWLINE;
            case "OFF":
                return "lcd.setBacklight(0);" + NEWLINE + "lcd.noDisplay();" + NEWLINE;
        }
    } else {
        Blockly.Arduino.addInclude('rgb_lcd', INCLUDE_RGB_LCD);
        Blockly.Arduino.addDeclaration('rgb_lcd', "rgb_lcd lcdRgb;");
        Blockly.Arduino.addSetup('rgb_lcd', "lcdRgb.begin(16, 2);");
        switch (state) {
            case "ON":
                return "lcdRgb.display();" + NEWLINE;
            case "OFF":
                return "lcdRgb.noDisplay();" + NEWLINE;
        }
    }
};

// LCD RGB _ SET COLOR BLOCK
Blockly.Arduino.display_lcdRGBSetColor = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('rgb_lcd', INCLUDE_RGB_LCD);
    Blockly.Arduino.addDeclaration('rgb_lcd', "rgb_lcd lcdRgb;");
    Blockly.Arduino.addSetup('rgb_lcd', "lcdRgb.begin(16, 2);");
    let r = Blockly.Arduino.valueToCode(block, "R", Blockly.Arduino.ORDER_ATOMIC);
    if (r < 0) r = 0;
    if (r > 255) r = 255;
    let g = Blockly.Arduino.valueToCode(block, "G", Blockly.Arduino.ORDER_ATOMIC);
    if (g < 0) g = 0;
    if (g > 255) g = 255;
    let b = Blockly.Arduino.valueToCode(block, "B", Blockly.Arduino.ORDER_ATOMIC);
    if (b < 0) b = 0;
    if (b > 255) b = 255;
    return "lcdRgb.setRGB(" + r + ", " + g + ", " + b + ");" + NEWLINE;
};

// LCD RGB _ SET PALETTE COLOR BLOCK
Blockly.Arduino.display_lcdRGBSetPaletteColor = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('rgb_lcd', INCLUDE_RGB_LCD);
    Blockly.Arduino.addDeclaration('rgb_lcd', "rgb_lcd lcdRgb;");
    Blockly.Arduino.addSetup('rgb_lcd', "lcdRgb.begin(16, 2);");
    var colour = Blockly.Arduino.valueToCode(block, "COLOR", Blockly.Arduino.ORDER_NONE) || "0, 0, 0";
    return "lcdRgb.setRGB(" + colour + ");" + NEWLINE;
};

/**
 * This is not a block generator, it's util function used in all oled blocks.
 */
Blockly.Arduino.DISPLAY_OLED_INIT = function (type) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('U8g2lib', INCLUDE_U8G2LIB);
    let declaration;
    const objName = type.toLowerCase();
    const board = Blockly.Constants.getSelectedBoard();
    const fullBuf = [BOARD_ARDUINO_UNO_R4_WIFI, BOARD_ARDUINO_UNO_R4_MINIMA, BOARD_ARDUINO_MEGA].includes(board);
    switch (type) {
        case "SSD1315":
            if (fullBuf) {
                declaration = "U8G2_SSD1315_128X64_NONAME_F_HW_I2C";
            } else {
                declaration = "U8G2_SSD1315_128X64_NONAME_2_HW_I2C";
            }
            break;
        case "SSD1306":
        default:
            if (fullBuf) {
                declaration = "U8G2_SSD1306_128X64_NONAME_F_HW_I2C";
            } else {
                declaration = "U8G2_SSD1306_128X64_NONAME_2_HW_I2C";
            }
            break;
    }
    Blockly.Arduino.addDeclaration('ug8_' + objName, declaration + " " + objName + "(U8G2_R0, /* reset=*/ U8X8_PIN_NONE);");
    Blockly.Arduino.addSetup('ug8_' + objName, objName + ".begin();" + NEWLINE + objName + ".setBusClock(400000);");
    return fullBuf;
};

// GROVE OLED DISPLAY _ SET TEXT BLOCK
Blockly.Arduino.display_addOledText = function (block) {
    const type = block.getFieldValue('TYPE');
    const x = Blockly.Arduino.valueToCode(block, "X", Blockly.Arduino.ORDER_ATOMIC);
    const y = Blockly.Arduino.valueToCode(block, "Y", Blockly.Arduino.ORDER_ATOMIC);
    let text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_ATOMIC);
    const fullBuf = Blockly.Arduino.DISPLAY_OLED_INIT(type);
    const objName = type.toLowerCase();
    Blockly.Arduino.addSetup(`ug8_${objName}_font`, objName + ".setFont(u8g2_font_6x10_tf);");
    if (fullBuf) {
        const c = block.inputList[0].connection.targetBlock();
        if (c && c.type !== 'text') {
            text += ".c_str()";
        }
        return `${objName}.drawStr(${x}, ${y}, ${text});${NEWLINE}${objName}.sendBuffer();${NEWLINE}`;
    } else {
        switch (type) {
            case "SSD1315":
                Blockly.Arduino.addFunction(objName + '_writeStr', FUNCTIONS_ARDUINO.DEF_WRITE_STR_SSD1315_UG8_2HW);
                break;
            case "SSD1306":
            default:
                Blockly.Arduino.addFunction(objName + '_writeStr', FUNCTIONS_ARDUINO.DEF_WRITE_STR_SSD1306_UG8_2HW);
                break;
        }
        return `${objName}_writeStr(&${objName}, ${x}, ${y}, ${text});` + NEWLINE;
    }
};

// GROVE OLED DISPLAY _ DRAW BITMAP LOGO
Blockly.Arduino.display_oledScreen_drawBitmapLogo = function (block) {
    const type = block.getFieldValue('TYPE');
    const fullBuf = Blockly.Arduino.DISPLAY_OLED_INIT(type);
    const logo = block.getFieldValue("LOGO");
    const bitmaps = {
        "vittascienceLogo": BITMAP_VITTASCIENCE_LOGO_XBM,
        "arduinoLogo": BITMAP_ARDUINO_LOGO_XBM,
        "seeedLogo": BITMAP_SEEED_LOGO_XBM,
        "microbitLogo": BITMAP_MICROBIT_LOGO_XBM,
    };
    const objName = type.toLowerCase();
    Blockly.Arduino.addDeclaration(logo + '_xbm', bitmaps[logo]);
    if (fullBuf) {
        return `${objName}.drawXBMP(0, 0, 128, 64, ${logo + '_xbm'});${NEWLINE}${objName}.sendBuffer();${NEWLINE}`;
    } else {
        switch (type) {
            case "SSD1315":
                Blockly.Arduino.addFunction(objName + '_drawXBM', FUNCTIONS_ARDUINO.DEF_DRAW_XBM_SSD1315_UG8_2HW);
                break;
            case "SSD1306":
            default:
                Blockly.Arduino.addFunction(objName + '_drawXBM', FUNCTIONS_ARDUINO.DEF_DRAW_XBM_SSD1306_UG8_2HW);
                break;
        }
        return `${objName}_drawXBM(&${objName}, 0, 0, 128, 64, ${logo + '_xbm'});` + NEWLINE;
    }
};

// GROVE OLED DISPLAY _ DRAW BITMAP LOGO
Blockly.Arduino.display_oledScreen_drawIcon = function (block) {
    const type = block.getFieldValue('TYPE');
    const fullBuf = Blockly.Arduino.DISPLAY_OLED_INIT(type);
    const x = Blockly.Arduino.valueToCode(block, "X", Blockly.Arduino.ORDER_ATOMIC);
    const y = Blockly.Arduino.valueToCode(block, "Y", Blockly.Arduino.ORDER_ATOMIC);
    const icon = block.getFieldValue("ICON");
    const objName = type.toLowerCase();
    Blockly.Arduino.addDeclaration(icon + '_xbm', BITMAP_ICONS[icon].xbm);
    if (fullBuf) {
        return `${objName}.drawXBMP(${x}, ${y}, 8, 8, ${icon + '_XBM'});${NEWLINE}${objName}.sendBuffer();${NEWLINE}`;
    } else {
        switch (type) {
            case "SSD1315":
                Blockly.Arduino.addFunction(objName + '_drawXBM', FUNCTIONS_ARDUINO.DEF_DRAW_XBM_SSD1315_UG8_2HW);
                break;
            case "SSD1306":
            default:
                Blockly.Arduino.addFunction(objName + '_drawXBM', FUNCTIONS_ARDUINO.DEF_DRAW_XBM_SSD1306_UG8_2HW);
                break;
        }
        return `${objName}_drawXBM(&${objName}, ${x}, ${y}, 8, 8, ${icon + '_XBM'});` + NEWLINE;
    }
};

// GROVE OLED DISPLAY _ DRAW BITMAP
Blockly.Arduino.display_clearOledScreen = function (block) {
    const type = block.getFieldValue('TYPE');
    Blockly.Arduino.DISPLAY_OLED_INIT(type);
    const objName = type.toLowerCase();
    switch (type) {
        case "SSD1315":
            return objName + ".clearDisplay();" + NEWLINE;
        case "SSD1306":
        default:
            return objName + ".clearDisplay();" + NEWLINE;
    }
};

// LED DIGITAL CONTROL BLOCK
Blockly.Arduino.display_setGroveSocketLed = function (block) {
    const pinConstant = Blockly.Arduino.Generators.digital_write(block.getFieldValue("PIN"), 'LED Module')
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || "LOW";
    return "digitalWrite(" + pinConstant + ", " + state + ");" + NEWLINE;
};

// LED PWM CONTROL BLOCK
Blockly.Arduino.display_setLEDintensity = function (block) {
    const pinConstant = Blockly.Arduino.Generators.pwm(block.getFieldValue("PIN"), 'LED Module')
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || "0";
    return "analogWrite(" + pinConstant + ", " + value + ");" + NEWLINE;
};

// CONTROL VARIABLE COLOR LED
Blockly.Arduino.display_setVariableColorLED = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || "0";
    Blockly.Arduino.addDefine('variable_color_led' + pin, "#define PIN_VARIABLE_COLOR_LED_" + pin + TAB + pin);
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(PIN_VARIABLE_COLOR_LED_' + pin + ', OUTPUT);');
    return "analogWrite(PIN_VARIABLE_COLOR_LED_" + pin + ", 255*(1-" + value + "/100.));" + NEWLINE;
};

/**
 * This is not a block generator, it's util function used in all chainable LED blocks.
 * Add chainableLED init code.
 * @param {Blockly.Block} block
 * @param {int} ledCount
 */
Blockly.Arduino.chainableLED_codeInitialization = function (block, ledCount = 3) {
    const pinDIN = block.getFieldValue("DIN");
    const pinCIN = block.getFieldValue("CIN");
    const pinConstantCIN = Blockly.Arduino.Generators.digital_write(pinDIN, 'Chainable LED DIN');
    const pinConstantDIN = Blockly.Arduino.Generators.digital_write(pinCIN, 'Chainable LED CIN');
    const objName = 'RGBLed_' + pinCIN;
    const ledCountVar = CHAINABLE_LED_COUNT + '_' + pinCIN;
    block.workspace.createVariable(CHAINABLE_LED_COUNT);
    Blockly.Arduino.addInclude('include_chainable_led', INCLUDE_CHAINABLE_LED);
    Blockly.Arduino.addDefine(objName, "#define " + ledCountVar + ' ' + ledCount);
    Blockly.Arduino.addDeclaration(objName, "ChainableLED " + objName + "(" + pinConstantDIN + ", " + pinConstantCIN + ", " + ledCountVar + ");");
    Blockly.Arduino.addSetup(objName, objName + ".init();");
    return objName;
};

// GROVE CHAINABLE RGB LED - DEFINE
Blockly.Arduino.display_defineChainableRGBLed = function (block) {
    Blockly.Arduino.chainableLED_codeInitialization(block, block.getFieldValue('N'));
    return "";
};

// GROVE CHAINABLE RGB LED - SET RGB
Blockly.Arduino.display_setColorChainableRGBLed = function (block) {
    const objName = Blockly.Arduino.chainableLED_codeInitialization(block);
    const LED = Blockly.Arduino.valueToCode(block, "LED", Blockly.Arduino.ORDER_ATOMIC) || "0";
    const r = Blockly.Arduino.valueToCode(block, "R", Blockly.Arduino.ORDER_ATOMIC);
    const g = Blockly.Arduino.valueToCode(block, "G", Blockly.Arduino.ORDER_ATOMIC);
    const b = Blockly.Arduino.valueToCode(block, "B", Blockly.Arduino.ORDER_ATOMIC);
    return objName + ".setColorRGB(" + LED + ", " + r + ", " + g + ", " + b + ");" + NEWLINE;
};

// GROVE CHAINABLE RGB LED - SET PALETTE
Blockly.Arduino.display_setPaletteColorChainableRGBLed = function (block) {
    const objName = Blockly.Arduino.chainableLED_codeInitialization(block);
    const LED = Blockly.Arduino.valueToCode(block, "LED", Blockly.Arduino.ORDER_ATOMIC) || "0";
    const colour = Blockly.Arduino.valueToCode(block, "COLOR", Blockly.Arduino.ORDER_NONE) || "0, 0, 0";
    return objName + ".setColorRGB(" + LED + ", " + colour + ");" + NEWLINE;
};

// GROVE CHAINABLE RGB LED - SET ALL RGB
Blockly.Arduino.display_setColorAllChainableRGBLed = function (block) {
    const objName = Blockly.Arduino.chainableLED_codeInitialization(block);
    const r = Blockly.Arduino.valueToCode(block, "R", Blockly.Arduino.ORDER_ATOMIC);
    const g = Blockly.Arduino.valueToCode(block, "G", Blockly.Arduino.ORDER_ATOMIC);
    const b = Blockly.Arduino.valueToCode(block, "B", Blockly.Arduino.ORDER_ATOMIC);
    return "for (uint8_t l_index = 0; l_index < " + CHAINABLE_LED_COUNT + '_' + block.getFieldValue('CIN') + "; l_index++) {" + NEWLINE
        + "  " + objName + ".setColorRGB(l_index, " + r + ", " + g + ", " + b + ");" + NEWLINE + "}" + NEWLINE
};

// GROVE CHAINABLE RGB LED - SET ALL RGB
Blockly.Arduino.display_setPaletteAllChainableRGBLed = function (block) {
    const objName = Blockly.Arduino.chainableLED_codeInitialization(block);
    const colour = Blockly.Arduino.valueToCode(block, "COLOR", Blockly.Arduino.ORDER_NONE) || "0, 0, 0";
    return "for (uint8_t l_index = 0; l_index < " + CHAINABLE_LED_COUNT + '_' + block.getFieldValue('CIN') + "; l_index++) {" + NEWLINE
        + "  " + objName + ".setColorRGB(l_index, " + colour + ");" + NEWLINE + "}" + NEWLINE
};

/**
 * This is not a block generator, it's util function used in all neopixel blocks.
 * Add neopixel init code.
 * @param {Blockly.Block} block
 * @param {int} numPin
 * @param {int} ledCount
 */
Blockly.Arduino.DISPLAY_NEOPIXEL_INIT_GENERATOR = function (block, pin, ledCount) {
    Blockly.Arduino.addInclude('include_neopixel', INCLUDE_ADAFRUIT_NEOPIXEL);
    Blockly.Arduino.addDefine('def_led_count_' + pin, "#define " + NEOPIXEL_LED_COUNT + pin + " " + ledCount);
    Blockly.Arduino.addDeclaration('init_neopixel_' + pin, "Adafruit_NeoPixel Neopixel_" + pin + "(" + NEOPIXEL_LED_COUNT + pin + ", " + pin + ", NEO_GRB + NEO_KHZ800);");
    Blockly.Arduino.addSetup('setup_neopixel_' + pin, "Neopixel_" + pin + ".begin();");
    block.workspace.createVariable(NEOPIXEL_LED_COUNT + ledCount)
};

/**
 * This is not a block generator, it's util function used in all neopixel blocks.
 * Check if neopixel is already defined on given pin.
 * @param {string} pin
 * @return {bool} alreadyDefined
 */
Blockly.Arduino.neopixel_checkDefinedBlock = function (block, pin) {
    const defineBlocks = block.workspace.getBlocksByType('display_defineNeopixel');
    let alreadyDefined = false;
    for (block in defineBlocks) {
        const fieldDropdownPin = defineBlocks[block].getField('PIN');
        const selectedOption = fieldDropdownPin.selectedOption_[1];
        if (selectedOption == pin && !defineBlocks[block].disabled) {
            alreadyDefined = true;
        }
    }
    return alreadyDefined;
};

// GROVE NEOPIXEL - DEFINE
Blockly.Arduino.display_defineNeopixel = function (block) {
    let pin = block.getFieldValue("PIN");
    let ledCount = block.getFieldValue("N");
    Blockly.Arduino.DISPLAY_NEOPIXEL_INIT_GENERATOR(block, pin, ledCount);
    return "";
};

// GROVE NEOPIXEL - SET LED COLOR
Blockly.Arduino.display_controlNeopixelLed = function (block) {
    let pin = block.getFieldValue("PIN");
    var led = Blockly.Arduino.valueToCode(block, "LED", Blockly.Arduino.ORDER_NONE) || "0";
    var r = Blockly.Arduino.valueToCode(block, "R", Blockly.Arduino.ORDER_NONE) || "0";
    var g = Blockly.Arduino.valueToCode(block, "G", Blockly.Arduino.ORDER_NONE) || "0";
    var b = Blockly.Arduino.valueToCode(block, "B", Blockly.Arduino.ORDER_NONE) || "0";
    if (!Blockly.Arduino.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Arduino.DISPLAY_NEOPIXEL_INIT_GENERATOR(block, pin, "30");
    }
    return "Neopixel_" + pin + ".setPixelColor(" + led + ", Neopixel_" + pin + ".Color(" + r + ", " + g + ", " + b + "));" + NEWLINE + "Neopixel_" + pin + ".show();" + NEWLINE;
};

// GROVE NEOPIXEL - SET LED COLOR (with 'palette')
Blockly.Arduino.display_controlColorNeopixelLed = function (block) {
    let pin = block.getFieldValue("PIN");
    let ledIndex = Blockly.Arduino.valueToCode(block, "LED", Blockly.Arduino.ORDER_NONE) || "0";
    let colour = Blockly.Arduino.valueToCode(block, "COLOR", Blockly.Arduino.ORDER_NONE) || "0, 0, 0";
    if (!Blockly.Arduino.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Arduino.DISPLAY_NEOPIXEL_INIT_GENERATOR(block, pin, "30");
    }
    return "Neopixel_" + pin + ".setPixelColor(" + ledIndex + ", Neopixel_" + pin + ".Color(" + colour + "));" + NEWLINE + "Neopixel_" + pin + ".show();" + NEWLINE;
};

Blockly.Arduino.display_neopixel_controlAllLedRGB = function (block) {
    let pin = block.getFieldValue("PIN");
    var r = Blockly.Arduino.valueToCode(block, "R", Blockly.Arduino.ORDER_NONE) || "0";
    var g = Blockly.Arduino.valueToCode(block, "G", Blockly.Arduino.ORDER_NONE) || "0";
    var b = Blockly.Arduino.valueToCode(block, "B", Blockly.Arduino.ORDER_NONE) || "0";
    if (!Blockly.Arduino.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Arduino.DISPLAY_NEOPIXEL_INIT_GENERATOR(block, pin, "30");
    }
    Blockly.Arduino.addFunction('neopixel_showAllLed', FUNCTIONS_ARDUINO.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(&Neopixel_" + pin + ", " + NEOPIXEL_LED_COUNT + pin + ", " + r + "," + g + ", " + b + ");" + NEWLINE;
};

Blockly.Arduino.display_neopixel_controlAllLedPalette = function (block) {
    const pin = block.getFieldValue("PIN");
    const colour = Blockly.Arduino.valueToCode(block, "COLOR", Blockly.Arduino.ORDER_NONE) || "(0,0,0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    if (!Blockly.Arduino.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Arduino.DISPLAY_NEOPIXEL_INIT_GENERATOR(block, pin, "30");
    }
    Blockly.Arduino.addFunction('neopixel_showAllLed', FUNCTIONS_ARDUINO.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(&Neopixel_" + pin + ", " + NEOPIXEL_LED_COUNT + pin + ", " + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ");" + NEWLINE;
};

// GROVE NEOPIXEL - SET RAINBOW
Blockly.Arduino.display_rainbowNeopixel = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Arduino.DISPLAY_NEOPIXEL_INIT_GENERATOR(block, pin, "30");
    Blockly.Arduino.addFunction('neopixel_showAllLed', FUNCTIONS_ARDUINO.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Arduino.addFunction('neopixel_rainbow', FUNCTIONS_ARDUINO.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(&Neopixel_" + pin + ", " + NEOPIXEL_LED_COUNT + pin + ");" + NEWLINE;
};

// GROVE 4-DIGIT DISPLAY TM1637 _ WRITE INTEGER
// http://wiki.seeedstudio.com/Grove-4-Digit_Display/
Blockly.Arduino.display_setNumberGrove4Digit = function (block) {
    // init
    const pinCLK = block.getFieldValue("CLK");
    const pinDIO = block.getFieldValue("DIO");
    const pinConstantCLK = Blockly.Arduino.Generators.digital_write(pinCLK, '4 Digit Display CLK');
    const pinConstantDIO = Blockly.Arduino.Generators.digital_write(pinDIO, '4 Digit Display DIO');
    const objName = 'tm1637_' + pinConstantCLK.replace('PIN_4_DIGIT_DISPLAY_CLK_', '');
    Blockly.Arduino.addInclude('tm1637', INCLUDE_TM1637);
    Blockly.Arduino.addDeclaration(objName + '_codeFlag', '// 4 Digit Display CLK/DIO on ' + pinCLK + '/' + pinDIO);
    Blockly.Arduino.addDeclaration(objName, "TM1637 " + objName + "(" + pinConstantCLK + ", " + pinConstantDIO + ");");
    Blockly.Arduino.addSetup(objName, objName + ".init();");
    Blockly.Arduino.addSetup(objName + '_brigth', objName + ".set(7); // Maximum brightness");
    // number
    const valeur = Blockly.Arduino.valueToCode(block, "N", Blockly.Arduino.ORDER_ATOMIC);
    return objName + ".displayNum(" + valeur + ");" + NEWLINE;
};

// GROVE 4-DIGIT DISPLAY TM1637 _ SHOW CLOCK
// http://wiki.seeedstudio.com/Grove-4-Digit_Display/
Blockly.Arduino.display_setClockGrove4Digit = function (block) {
    // init
    const pinCLK = block.getFieldValue("CLK");
    const pinDIO = block.getFieldValue("DIO");
    const pinConstantCLK = Blockly.Arduino.Generators.digital_write(pinCLK, '4 Digit Display CLK');
    const pinConstantDIO = Blockly.Arduino.Generators.digital_write(pinDIO, '4 Digit Display DIO');
    const objName = 'tm1637_' + pinConstantCLK.replace('PIN_4_DIGIT_DISPLAY_CLK_', '');
    Blockly.Arduino.addInclude('tm1637', INCLUDE_TM1637);
    Blockly.Arduino.addDeclaration(objName + '_codeFlag', '// 4 Digit Display CLK/DIO on ' + pinCLK + '/' + pinDIO);
    Blockly.Arduino.addDeclaration(objName, "TM1637 " + objName + "(" + pinConstantCLK + ", " + pinConstantDIO + ");");
    Blockly.Arduino.addSetup(objName, objName + ".init();");
    Blockly.Arduino.addSetup(objName + '_brigth', objName + ".set(7); // Maximum brightness");
    // clock
    const date = new Date();
    Blockly.Arduino.addVariable('tm_clock', "int tm_clock[2];");
    Blockly.Arduino.addDeclaration('const_chronometerClock', "int chrono0Clk = 0;" + NEWLINE
        + "//Warning, the clock is retrieved by browser when arduino code is uploaded." + NEWLINE
        + "//If arduino is powered off, time will not flow." + NEWLINE
        + "const uint8_t MIN_START = " + date.getMinutes() + ";" + NEWLINE
        + "const uint8_t HOUR_START = " + date.getHours() + ";");
    Blockly.Arduino.addFunction('setClock', FUNCTIONS_ARDUINO.DEF_4DIGIT_SET_TIME);
    return "setClock(tm_clock);" + NEWLINE + objName + ".point(true);" + NEWLINE + objName + ".displayNum(tm_clock[0]*100+tm_clock[1]);" + NEWLINE;
};

// GROVE 4-DIGIT DISPLAY TM1637 _ SHOW CLOCK
// http://wiki.seeedstudio.com/Grove-4-Digit_Display/
Blockly.Arduino.display_setTemperatureGrove4Digit = function (block) {
    // init
    const pinCLK = block.getFieldValue("CLK");
    const pinDIO = block.getFieldValue("DIO");
    const pinConstantCLK = Blockly.Arduino.Generators.digital_write(pinCLK, '4 Digit Display CLK');
    const pinConstantDIO = Blockly.Arduino.Generators.digital_write(pinDIO, '4 Digit Display DIO');
    const objName = 'tm1637_' + pinConstantCLK.replace('PIN_4_DIGIT_DISPLAY_CLK_', '');
    Blockly.Arduino.addInclude('tm1637', INCLUDE_TM1637);
    Blockly.Arduino.addDeclaration(objName + '_codeFlag', '// 4 Digit Display CLK/DIO on ' + pinCLK + '/' + pinDIO);
    Blockly.Arduino.addDeclaration(objName, "TM1637 " + objName + "(" + pinConstantCLK + ", " + pinConstantDIO + ");");
    Blockly.Arduino.addSetup(objName, objName + ".init();");
    Blockly.Arduino.addSetup(objName + '_brigth', objName + ".set(7); // Maximum brightness");
    // temp
    const temp = Blockly.Arduino.valueToCode(block, "TEMP", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.addFunction('setTemperature', FUNCTIONS_ARDUINO.DEF_4DIGIT_SET_TEMP);
    Blockly.Arduino.addVariable('tm_digits', "int8_t tm_digits[4];");
    return "setTemperature(tm_digits, " + temp + ");" + NEWLINE + "tm1637_" + pinCLK + ".display(tm_digits);" + NEWLINE;
};

// GROVE LED BAR _ CONTROL BLOCK
// http://wiki.seeedstudio.com/Grove-LED_Bar/
Blockly.Arduino.display_setLevelLedBar = function (block) {
    const pinDI = block.getFieldValue("DI");
    const pinDCKI = block.getFieldValue("DCKI");
    const pinConstantDI = Blockly.Arduino.Generators.digital_write(pinDI, 'LED Bar DI');
    const pinConstantDCKI = Blockly.Arduino.Generators.digital_write(pinDCKI, 'LED Bar DCKI');
    const objName = 'bar_' + pinConstantDI.replace('PIN_LED_BAR_DI_', '');
    Blockly.Arduino.addInclude('Grove_LED_Bar', INCLUDE_GROVE_LED_BAR);
    Blockly.Arduino.addDeclaration(objName + '_codeFlag', '// LED Bar DI/DCKI on ' + pinDI + '/' + pinDCKI);
    Blockly.Arduino.addDeclaration(objName, "Grove_LED_Bar " + objName + "(" + pinConstantDI + ", " + pinConstantDCKI + ", 0);");
    Blockly.Arduino.addSetup(objName, objName + ".begin();");
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC);
    return objName + ".setLevel(" + value + ");" + NEWLINE;
};

Blockly.Arduino.display_setGreenToRedLedBar = function (block) {
    const pinDI = block.getFieldValue("DI");
    const pinDCKI = block.getFieldValue("DCKI");
    const pinConstantDI = Blockly.Arduino.Generators.digital_write(pinDI, 'LED Bar DI');
    const pinConstantDCKI = Blockly.Arduino.Generators.digital_write(pinDCKI, 'LED Bar DCKI');
    const objName = 'bar_' + pinConstantDI.replace('PIN_LED_BAR_DI_', '');
    Blockly.Arduino.addInclude('Grove_LED_Bar', INCLUDE_GROVE_LED_BAR);
    Blockly.Arduino.addDeclaration(objName + '_codeFlag', '// LED Bar DI/DCKI on ' + pinDI + '/' + pinDCKI);
    Blockly.Arduino.addDeclaration(objName, "Grove_LED_Bar " + objName + "(" + pinConstantDI + ", " + pinConstantDCKI + ", 0);");
    Blockly.Arduino.addSetup(objName, objName + ".begin();");
    const value = block.getFieldValue('COLOR');
    return objName + ".setGreenToRed(" + value + ");" + NEWLINE;
};

Blockly.Arduino.display_setLedLedBar = function (block) {
    const pinConstantDI = Blockly.Arduino.Generators.digital_write(block.getFieldValue("DI"), 'LED Bar DI');
    const pinConstantDCKI = Blockly.Arduino.Generators.digital_write(block.getFieldValue("DCKI"), 'LED Bar DCKI');
    const objName = 'bar_' + pinConstantDI.replace('PIN_LED_BAR_DI_', '');
    Blockly.Arduino.addInclude('Grove_LED_Bar', INCLUDE_GROVE_LED_BAR);
    Blockly.Arduino.addDeclaration(objName, "Grove_LED_Bar " + objName + "(" + pinConstantDI + ", " + pinConstantDCKI + ", 0);");
    Blockly.Arduino.addSetup(objName, objName + ".begin();");
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC);
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    return `${objName}.setLed(${value}, ${state});` + NEWLINE;
};