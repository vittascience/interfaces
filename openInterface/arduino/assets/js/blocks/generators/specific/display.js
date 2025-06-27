/**
 * @fileoverview Display generators for Arduino.
 */

// BUILTIN LED _ CONTROL STATE
Blockly.Arduino.io_control_arduino_led = function (block) {
    Blockly.Arduino.addSetup('pin13', "pinMode(13, OUTPUT);", !1);
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    return "digitalWrite(13, " + state + ");" + NEWLINE;
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

// GROVE OLED DISPLAY _ SET TEXT BLOCK
Blockly.Arduino.display_addOledText = function (block) {
    const x = Blockly.Arduino.valueToCode(block, "X", Blockly.Arduino.ORDER_ATOMIC);
    const y = Blockly.Arduino.valueToCode(block, "Y", Blockly.Arduino.ORDER_ATOMIC);
    const text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('include_seeed_oled', INCLUDE_SEEED_OLED);
    Blockly.Arduino.addFunction('func_setup_seeed_oled', FUNCTIONS_ARDUINO.DEF_SETUP_SEEED_OLED);
    Blockly.Arduino.addSetup('setup_wire', "Wire.begin();");
    Blockly.Arduino.addSetup('setup_seeed_oled', "SeeedOled_setup();");
    const c = block.inputList[0].connection.targetBlock();
    if (c && (c.type != 'text')) {
        return "SeeedOled.setTextXY(" + y + ", " + x + ");" + NEWLINE + "SeeedOled.putString(String(" + text + ").c_str());" + NEWLINE;
    }
    return "SeeedOled.setTextXY(" + y + ", " + x + ");" + NEWLINE + "SeeedOled.putString(" + text + ");" + NEWLINE;
};

// GROVE OLED DISPLAY _ DRAW BITMAP LOGO
Blockly.Arduino.display_oledScreen_drawBitmapLogo = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('include_seeed_oled', INCLUDE_SEEED_OLED);
    Blockly.Arduino.addInclude('include_avr_pgmspace', INCLUDE_AVR_PGMSPACE);
    Blockly.Arduino.addFunction('func_setup_seeed_oled', FUNCTIONS_ARDUINO.DEF_SETUP_SEEED_OLED);
    const logo = block.getFieldValue("LOGO");
    switch (logo) {
        case "vittascienceLogo":
            Blockly.Arduino.addDeclaration('bitmap_vittascience', BITMAP_VITTASCIENCE_LOGO);
            break;
        case "arduinoLogo":
            Blockly.Arduino.addDeclaration('bitmap_arduino', BITMAP_ARDUINO_LOGO);
            break;
        case "seeedLogo":
            Blockly.Arduino.addDeclaration('bitmap_seeed', BITMAP_SEEED_LOGO);
            break;
        case "microbitLogo":
            Blockly.Arduino.addDeclaration('bitmap_microbit', BITMAP_MICROBIT_LOGO);
            break;
        default:
            throw Error("Unhandled logo option: " + logo);
    }
    Blockly.Arduino.addSetup('setup_wire', "Wire.begin();");
    Blockly.Arduino.addSetup('init_seeed_oled', "SeeedOled_setup();");
    return "SeeedOled.clearDisplay();" + NEWLINE + "SeeedOled.drawBitmap((uint8_t*)" + logo + ", 1024);" + NEWLINE;
};

// GROVE OLED DISPLAY _ DRAW BITMAP LOGO
Blockly.Arduino.display_oledScreen_drawIcon = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('include_seeed_oled', INCLUDE_SEEED_OLED);
    Blockly.Arduino.addInclude('include_avr_pgmspace', INCLUDE_AVR_PGMSPACE);
    Blockly.Arduino.addFunction('func_setup_seeed_oled', FUNCTIONS_ARDUINO.DEF_SETUP_SEEED_OLED);
    Blockly.Arduino.addFunction('func_draw_icon', FUNCTIONS_ARDUINO.DEF_OLED_DRAW_ICON);
    const x = Blockly.Arduino.valueToCode(block, "X", Blockly.Arduino.ORDER_ATOMIC);
    const y = Blockly.Arduino.valueToCode(block, "Y", Blockly.Arduino.ORDER_ATOMIC);
    const logo = block.getFieldValue("ICON");
    switch (logo) {
        case "HEART":
            Blockly.Arduino.addDeclaration('bitmap_icon_heart', BITMAP_ICON_HEART);
            break;
        case "HAPPY":
            Blockly.Arduino.addDeclaration('bitmap_icon_happy', BITMAP_ICON_HAPPY);
            break;
        case "SAD":
            Blockly.Arduino.addDeclaration('bitmap_icone_sad', BITMAP_ICON_SAD);
            break;
        case "YES":
            Blockly.Arduino.addDeclaration('bitmap_icon_yes', BITMAP_ICON_YES);
            break;
        case "NO":
            Blockly.Arduino.addDeclaration('bitmap_icon_no', BITMAP_ICON_NO);
            break;
        case "MAN":
            Blockly.Arduino.addDeclaration('bitmap_icon_man', BITMAP_ICON_MAN);
            break;
        case "FORK":
            Blockly.Arduino.addDeclaration('bitmap_icon_fork', BITMAP_ICON_FORK);
            break;
        case "UMBRELLA":
            Blockly.Arduino.addDeclaration('bitmap_icon_umbrella', BITMAP_ICON_UMBRELLA);
            break;
        case "SKULL":
            Blockly.Arduino.addDeclaration('bitmap_icon_skull', BITMAP_ICON_SKULL);
            break;
        case "GRID":
            Blockly.Arduino.addDeclaration('bitmap_icon_grid', BITMAP_ICON_GRID);
            break;
        case "BUTTERFLY":
            Blockly.Arduino.addDeclaration('bitmap_icon_butterfly', BITMAP_ICON_BUTTERFLY);
            break;
        case "SWORD":
            Blockly.Arduino.addDeclaration('bitmap_icon_sword', BITMAP_ICON_SWORD);
            break;
        case "WINE":
            Blockly.Arduino.addDeclaration('bitmap_icon_wine', BITMAP_ICON_WINE);
            break;
        case "LOCK":
            Blockly.Arduino.addDeclaration('bitmap_icon_lock', BITMAP_ICON_LOCK);
            break;
        case "NET":
            Blockly.Arduino.addDeclaration('bitmap_icon_net', BITMAP_ICON_NET);
            break;
        case "BATTERY1":
            Blockly.Arduino.addDeclaration('bitmap_icon_battery1', BITMAP_ICON_BATTERY1);
            break;
        case "BATTERY2":
            Blockly.Arduino.addDeclaration('bitmap_icon_battery2', BITMAP_ICON_BATTERY2);
            break;
        case "BATTERY3":
            Blockly.Arduino.addDeclaration('bitmap_icon_battery3', BITMAP_ICON_BATTERY3);
            break;
        default:
            throw "Unknown logo : " + logo;
    }
    Blockly.Arduino.addSetup('setup_wire', "Wire.begin();");
    Blockly.Arduino.addSetup('setup_seeed_oled', "SeeedOled_setup();");
    return "SeeedOled_drawIcon(" + block.getFieldValue("ICON") + ", " + x + ", " + y + ");" + NEWLINE;
};

// GROVE OLED DISPLAY _ DRAW BITMAP
Blockly.Arduino.display_clearOledScreen = function () {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('include_seeed_oled', INCLUDE_SEEED_OLED);
    Blockly.Arduino.addFunction('func_setup_seeed_oled', FUNCTIONS_ARDUINO.DEF_SETUP_SEEED_OLED);
    Blockly.Arduino.addSetup('setup_wire', "Wire.begin();");
    Blockly.Arduino.addSetup('setup_seeed_oled', "SeeedOled_setup();");
    return "SeeedOled.clearDisplay();" + NEWLINE;
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
Blockly.Arduino.neopixel_codeInitialization = function (block, pin, ledCount) {
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
    Blockly.Arduino.neopixel_codeInitialization(block, pin, ledCount);
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
        Blockly.Arduino.neopixel_codeInitialization(block, pin, "30");
    }
    return "Neopixel_" + pin + ".setPixelColor(" + led + ", Neopixel_" + pin + ".Color(" + r + ", " + g + ", " + b + "));" + NEWLINE + "Neopixel_" + pin + ".show();" + NEWLINE;
};

// GROVE NEOPIXEL - SET LED COLOR (with 'palette')
Blockly.Arduino.display_controlColorNeopixelLed = function (block) {
    let pin = block.getFieldValue("PIN");
    let ledIndex = Blockly.Arduino.valueToCode(block, "LED", Blockly.Arduino.ORDER_NONE) || "0";
    let colour = Blockly.Arduino.valueToCode(block, "COLOR", Blockly.Arduino.ORDER_NONE) || "0, 0, 0";
    if (!Blockly.Arduino.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Arduino.neopixel_codeInitialization(block, pin, "30");
    }
    return "Neopixel_" + pin + ".setPixelColor(" + ledIndex + ", Neopixel_" + pin + ".Color(" + colour + "));" + NEWLINE + "Neopixel_" + pin + ".show();" + NEWLINE;
};

Blockly.Arduino.display_neopixel_controlAllLedRGB = function (block) {
    let pin = block.getFieldValue("PIN");
    var r = Blockly.Arduino.valueToCode(block, "R", Blockly.Arduino.ORDER_NONE) || "0";
    var g = Blockly.Arduino.valueToCode(block, "G", Blockly.Arduino.ORDER_NONE) || "0";
    var b = Blockly.Arduino.valueToCode(block, "B", Blockly.Arduino.ORDER_NONE) || "0";
    if (!Blockly.Arduino.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Arduino.neopixel_codeInitialization(block, pin, "30");
    }
    Blockly.Arduino.addFunction('neopixel_showAllLed', FUNCTIONS_ARDUINO.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(&Neopixel_" + pin + ", " + NEOPIXEL_LED_COUNT + pin + ", " + r + "," + g + ", " + b + ");" + NEWLINE;
};

Blockly.Arduino.display_neopixel_controlAllLedPalette = function (block) {
    const pin = block.getFieldValue("PIN");
    const colour = Blockly.Arduino.valueToCode(block, "COLOR", Blockly.Arduino.ORDER_NONE) || "(0,0,0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    if (!Blockly.Arduino.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Arduino.neopixel_codeInitialization(block, pin, "30");
    }
    Blockly.Arduino.addFunction('neopixel_showAllLed', FUNCTIONS_ARDUINO.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(&Neopixel_" + pin + ", " + NEOPIXEL_LED_COUNT + pin + ", " + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ");" + NEWLINE;
};

// GROVE NEOPIXEL - SET RAINBOW
Blockly.Arduino.display_rainbowNeopixel = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Arduino.neopixel_codeInitialization(block, pin, "30");
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
    const pinConstantDI = Blockly.Arduino.Generators.digital_write(block.getFieldValue("DI"), 'LED Bar DI');
    const pinConstantDCKI = Blockly.Arduino.Generators.digital_write(block.getFieldValue("DCKI"), 'LED Bar DCKI');
    const objName = 'bar_' + pinConstantDI.replace('PIN_LED_BAR_DI_', '');
    Blockly.Arduino.addInclude('Grove_LED_Bar', INCLUDE_GROVE_LED_BAR);
    Blockly.Arduino.addDeclaration(objName, "Grove_LED_Bar " + objName + "(" + pinConstantDI + ", " + pinConstantDCKI + ", 0);");
    Blockly.Arduino.addSetup(objName, objName + ".begin();");
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC);
    return objName + ".setLevel(" + value + ");" + NEWLINE;
};

Blockly.Arduino.display_setGreenToRedLedBar = function (block) {
    const pinConstantDI = Blockly.Arduino.Generators.digital_write(block.getFieldValue("DI"), 'LED Bar DI');
    const pinConstantDCKI = Blockly.Arduino.Generators.digital_write(block.getFieldValue("DCKI"), 'LED Bar DCKI');
    const objName = 'bar_' + pinConstantDI.replace('PIN_LED_BAR_DI_', '');
    Blockly.Arduino.addInclude('Grove_LED_Bar', INCLUDE_GROVE_LED_BAR);
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