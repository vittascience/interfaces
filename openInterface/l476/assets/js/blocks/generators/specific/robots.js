/**
 * @fileoverview Robots generators for STM32.
 */

// Alphabot

Blockly.Python.robots_alphabot_getUltrasonicRange = function () {
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    return ["alphabot.readUltrasonicDistance()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_alphabot_lineFinder_calibrate = function () {
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    return "alphabot.calibrateLineFinder()" + NEWLINE;
};

Blockly.Python.robots_alphabot_lineFinder_readSensors = function (block) {
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    const sensor = block.getFieldValue("SENSOR");
    if (sensor == "ALL") {
        return ["alphabot.TRSensors_readLine(0)", Blockly.Python.ORDER_ATOMIC];
    } else {
        return ["alphabot.TRSensors_readLine(" + sensor + ")", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.robots_alphabot_lineFinder_getSensorAboveLine = function (block) {
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    Blockly.Python.addFunction('getSensorAboveLine', FUNCTIONS_L476.DEF_ALPHABOT_GET_SENSOR_ABOVE_LINE);
    if (block.getInput("LIMIT")) {
        const limit = Blockly.Python.valueToCode(block, "LIMIT", Blockly.Python.ORDER_NONE) || "300";
        return ["getSensorAboveLine(alphabot, blackLimit=" + limit + ")", Blockly.Python.ORDER_ATOMIC];
    } else {
        return ["getSensorAboveLine(alphabot)", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.robots_alphabot_lineFinder_isSensorAboveLine = function (block) {
    const sensor = block.getFieldValue("SENSOR");
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    Blockly.Python.addFunction('isSensorAboveLine', FUNCTIONS_L476.DEF_ALPHABOT_IS_SENSOR_ABOVE_LINE);
    if (block.getInput("LIMIT")) {
        const limit = Blockly.Python.valueToCode(block, "LIMIT", Blockly.Python.ORDER_NONE) || "300";
        return ["isSensorAboveLine(alphabot, " + sensor + ", blackLimit=" + limit + ")", Blockly.Python.ORDER_ATOMIC];
    } else {
        return ["isSensorAboveLine(alphabot, " + sensor + ")", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.robots_alphabot_lineFinder_onAboveAnySensor = function (block) {
    var n = 0;
    var code = "ir_sensor = getSensorAboveLine(alphabot)[0]" + NEWLINE;
    var branchCode, conditionCode;
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('getSensorAboveLine', FUNCTIONS_L476.DEF_ALPHABOT_GET_SENSOR_ABOVE_LINE);
    if (Blockly.Python.STATEMENT_PREFIX) {
        // Automatic prefix insertion is switched off for this block.  Add manually.
        code += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, block);
    }
    do {
        conditionCode = "ir_sensor == \"" + block.getFieldValue("SENSOR" + n) + "\"";
        branchCode = Blockly.Python.statementToCode(block, "DO" + n) || Blockly.Python.PASS;
        if (Blockly.Python.STATEMENT_SUFFIX) {
            branchCode = Blockly.Python.prefixLines(
                Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
                Blockly.Python.INDENT) + branchCode;
        }
        code += (n == 0 ? "if " : "elif ") + conditionCode + ":" + NEWLINE + branchCode;
        ++n;
    } while (block.getInput("ELSEIF" + n));

    if (block.getInput("ELSE") || Blockly.Python.STATEMENT_SUFFIX) {
        branchCode = Blockly.Python.statementToCode(block, "ELSE") || Blockly.Python.PASS;
        if (Blockly.Python.STATEMENT_SUFFIX) {
            branchCode = Blockly.Python.prefixLines(
                Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
                Blockly.Python.INDENT) + branchCode;
        }
        code += "else:" + NEWLINE + branchCode;
    }
    return code;
};

Blockly.Python.robots_alphabot_readObstacleDetector = function () {
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    return ["alphabot.readInfrared()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_alphabot_onObstacleDetected = function (block) {
    var n = 0;
    var code = "detection = alphabot.readInfrared()" + NEWLINE;
    var branchCode, conditionCode;
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    if (Blockly.Python.STATEMENT_PREFIX) {
        // Automatic prefix insertion is switched off for this block.  Add manually.
        code += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, block);
    }
    do {
        conditionCode = "detection == alphabot." + block.getFieldValue("DETECTION" + n) + "_OBSTACLE";
        branchCode = Blockly.Python.statementToCode(block, "DO" + n) || Blockly.Python.PASS;
        if (Blockly.Python.STATEMENT_SUFFIX) {
            branchCode = Blockly.Python.prefixLines(
                Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
                Blockly.Python.INDENT) + branchCode;
        }
        code += (n == 0 ? "if " : "elif ") + conditionCode + ":" + NEWLINE + branchCode;
        ++n;
    } while (block.getInput("ELSEIF" + n));

    if (block.getInput("ELSE") || Blockly.Python.STATEMENT_SUFFIX) {
        branchCode = Blockly.Python.statementToCode(block, "ELSE") || Blockly.Python.PASS;
        if (Blockly.Python.STATEMENT_SUFFIX) {
            branchCode = Blockly.Python.prefixLines(
                Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
                Blockly.Python.INDENT) + branchCode;
        }
        code += "else:" + NEWLINE + branchCode;
    }
    return code;
};

Blockly.Python.robots_alphabot_setGo = function (block) {
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 100) speed = 100;
    if (speed < 0) speed = 0;
    switch (block.getFieldValue("DIR")) {
        case "FORWARD":
            return "alphabot.moveForward(" + speed + ")" + NEWLINE;
        case "REVERSE":
            return "alphabot.moveBackward(" + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_alphabot_controlMotor = function (block) {
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 100) speed = 100;
    if (speed < 0) speed = 0;
    let dir = "";
    if (block.getFieldValue("DIR") == "ANTICLOCKWISE") {
        dir = "-";
    }
    let motor = "";
    switch (block.getFieldValue("MOTOR")) {
        case "RIGHT":
            motor = "right";
            break;
        case "LEFT":
            motor = "left";
            break;
    }
    return "alphabot.setMotors(" + motor + "=" + dir + speed + ")" + NEWLINE;
};

Blockly.Python.robots_alphabot_turnTo = function (block) {
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 100) speed = 100;
    if (speed < 0) speed = 0;
    switch (block.getFieldValue("MOTOR")) {
        case "RIGHT":
            return "alphabot.turnRight(" + speed + ")" + NEWLINE;
        case "LEFT":
            return "alphabot.turnLeft(" + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_alphabot_stopMotors = function (block) {
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    switch (block.getFieldValue("MOTOR")) {
        case "BOTH":
            return "alphabot.stop()" + NEWLINE;
        case "LEFT":
            return "alphabot.setMotors(left=0)" + NEWLINE;
        case "RIGHT":
            return "alphabot.setMotors(right=0)" + NEWLINE;
        default:
            return "alphabot.stop()" + NEWLINE;
    }
};

// Common NEC remote generator
Blockly.Python.robots_alphabot_onRemoteCommandReceived_generator = function (block) {
    const IRvariableName = "ir_current_remote_button";
    block.workspace.createVariable(IRvariableName);
    var n = 0;
    var code = "utime.sleep_ms(150)" + NEWLINE + "gc.collect()" + NEWLINE;
    var branchCode, conditionCode;
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('stm32_nec', IMPORT_STM32_NEC);
    Blockly.Python.addImport('gc', IMPORT_GC);
    Blockly.Python.addFunction('remoteNEC_callback', FUNCTIONS_L476.DEF_REMOTE_NEC_CALLBACK);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    Blockly.Python.addInit(IRvariableName, IRvariableName + " = None");
    Blockly.Python.addPowerOn('ir_remote_init', "classes = (NEC_8, NEC_16)" + NEWLINE + "ir_remote = classes[0](alphabot.pin_IR, remoteNEC_callback)");
    if (Blockly.Python.STATEMENT_PREFIX) {
        // Automatic prefix insertion is switched off for this block.  Add manually.
        code += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, block);
    }
    do {
        conditionCode = IRvariableName + " == \"" + block.getFieldValue("COMMAND" + n) + "\"";
        branchCode = Blockly.Python.statementToCode(block, "DO" + n) || Blockly.Python.PASS;
        if (Blockly.Python.STATEMENT_SUFFIX) {
            branchCode = Blockly.Python.prefixLines(
                Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
                Blockly.Python.INDENT) + branchCode;
        }
        if ((branchCode.match(/\n/g) || []).length === 1 && branchCode.includes("pass\n")) {
            code += (n == 0 ? "if " : "elif ") + conditionCode + ":" + NEWLINE + branchCode;
        } else {
            code += (n == 0 ? "if " : "elif ") + conditionCode + ":" + NEWLINE + branchCode;
        }
        ++n;
    } while (block.getInput("ELSEIF" + n));

    if (block.getInput("ELSE") || Blockly.Python.STATEMENT_SUFFIX) {
        branchCode = Blockly.Python.statementToCode(block, "ELSE") || Blockly.Python.PASS;
        if (Blockly.Python.STATEMENT_SUFFIX) {
            branchCode = Blockly.Python.prefixLines(
                Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
                Blockly.Python.INDENT) + branchCode;
        }
        code += "else:" + NEWLINE + branchCode;
    }
    code += IRvariableName + " = None" + NEWLINE;
    return code;
};

Blockly.Python.robots_alphabot_onRemoteCommandReceived = function (block) {
    var code = Blockly.Python.robots_alphabot_onRemoteCommandReceived_generator(block);
    Blockly.Python.addConstant('NEC_REMOTE_TYPE', "NEC_REMOTE_TYPE = 'basic_black'");
    Blockly.Python.addFunction('remoteNEC_basicBlack_getButton', FUNCTIONS_L476.DEF_REMOTE_NEC_BASIC_BLACK_GET_BUTTON);
    return code;
};

Blockly.Python.robots_alphabot_onRemoteCommandReceived_car_mp3_gray = function (block) {
    var code = Blockly.Python.robots_alphabot_onRemoteCommandReceived_generator(block);
    Blockly.Python.addConstant('NEC_REMOTE_TYPE', "NEC_REMOTE_TYPE = 'Car_mp3'");
    Blockly.Python.addFunction('remoteNEC_Carmp3_gray_getButton', FUNCTIONS_L476.DEF_REMOTE_NEC_AR_MP3_GRAY_GET_BUTTON);
    return code;
};

Blockly.Python.robots_alphabot_oled_addText = function (block) {
    const str = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addImport('ssd1306', IMPORT_STM32_SSD1306_I2C);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    Blockly.Python.addInit('oled', "oled = SSD1306_I2C(128, 64, alphabot.i2c, addr=alphabot.getOLEDaddr())");
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
        return "oled.text(" + str + ", " + x + ", " + y + ")" + NEWLINE + "oled.show()" + NEWLINE;
    } else {
        return "oled.text(str(" + str + "), " + x + ", " + y + ")" + NEWLINE + "oled.show()" + NEWLINE;
    }
};

Blockly.Python.robots_alphabot_oled_clearScreen = function () {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addImport('ssd1306', IMPORT_STM32_SSD1306_I2C);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    Blockly.Python.addInit('oled', "oled = SSD1306_I2C(128, 64, alphabot.i2c, addr=alphabot.getOLEDaddr())");
    return "oled.fill(0)" + NEWLINE + "oled.show()" + NEWLINE;
};

Blockly.Python.robots_alphabot_oled_setBackground = function (block) {
    const color = block.getFieldValue("BACKGROUND");
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addImport('ssd1306', IMPORT_STM32_SSD1306_I2C);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    Blockly.Python.addInit('oled', "oled = SSD1306_I2C(128, 64, alphabot.i2c, addr=alphabot.getOLEDaddr())");
    return "oled.invert(" + color + ")" + NEWLINE;
};

Blockly.Python.robots_alphabot_neopixel_setColor = function (block) {
    const pinName = Blockly.Python.Generators.digital_write("'D7'", 'Neopixel');
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    Blockly.Python.addInit('alphabot_neopixel', "npAlphabot = neopixel.NeoPixel(" + pinName + ", 4)");
    var r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    var g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    var b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (r > 255) r = 255;
    if (r < 0) r = 0;
    if (g > 255) g = 255;
    if (g < 0) g = 0;
    if (b > 255) b = 255;
    if (b < 0) b = 0;
    if (block.getFieldValue("LED") == "all") {
        Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_L476.DEF_NEOPIXEL_SHOW_ALL_LED);
        return "neopixel_showAllLed(npAlphabot, 4, " + r + ", " + g + ", " + b + ")" + NEWLINE;
    } else {
        return "npAlphabot[" + block.getFieldValue("LED") + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npAlphabot.write()" + NEWLINE;
    }
};

Blockly.Python.robots_alphabot_neopixel_setPaletteColor = function (block) {
    const pinName = Blockly.Python.Generators.digital_write("'D7'", 'Neopixel');
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    Blockly.Python.addInit('alphabot_neopixel', "npAlphabot = neopixel.NeoPixel(" + pinName + ", 4)");
    const led = block.getFieldValue("LED");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    if (led == "all") {
        Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_L476.DEF_NEOPIXEL_SHOW_ALL_LED);
        return "neopixel_showAllLed(npAlphabot, 4, " + colour.replace('(', '').replace(')', '') + ")" + NEWLINE;
    } else {
        return "npAlphabot[" + led + "] = " + colour + NEWLINE + "npAlphabot.write()" + NEWLINE;
    }
};

Blockly.Python.robots_alphabot_neopixel_setRainbow = function () {
    const pinName = Blockly.Python.Generators.digital_write("'D7'", 'Neopixel');
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    Blockly.Python.addInit('alphabot_neopixel', "npAlphabot = neopixel.NeoPixel(" + pinName + ", 4)");
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_L476.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_L476.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(npAlphabot, 4)" + NEWLINE;
};

Blockly.Python.robots_alphabot_buzzer_controlState = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    return "alphabot.controlBuzzer(not(" + state + "))" + NEWLINE;
};

Blockly.Python.robots_alphabot_joystick_onCommandReceived = function (block) {
    var n = 0;
    var code = "joystickButton = alphabot.getJoystickValue()" + NEWLINE;
    var branchCode, conditionCode;
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    if (Blockly.Python.STATEMENT_PREFIX) {
        // Automatic prefix insertion is switched off for this block.  Add manually.
        code += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, block);
    }
    do {
        conditionCode = "joystickButton == \"" + block.getFieldValue("COMMAND" + n) + "\"";
        branchCode = Blockly.Python.statementToCode(block, "DO" + n) || Blockly.Python.PASS;
        if (Blockly.Python.STATEMENT_SUFFIX) {
            branchCode = Blockly.Python.prefixLines(
                Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
                Blockly.Python.INDENT) + branchCode;
        }
        code += (n == 0 ? "if " : "elif ") + conditionCode + ":" + NEWLINE + branchCode;
        ++n;
    } while (block.getInput("ELSEIF" + n));

    if (block.getInput("ELSE") || Blockly.Python.STATEMENT_SUFFIX) {
        branchCode = Blockly.Python.statementToCode(block, "ELSE") || Blockly.Python.PASS;
        if (Blockly.Python.STATEMENT_SUFFIX) {
            branchCode = Blockly.Python.prefixLines(
                Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
                Blockly.Python.INDENT) + branchCode;
        }
        code += "else:" + NEWLINE + branchCode;
    }
    return code;
};

// DONUTBOT
Blockly.Python.robots_donutbot_getUltrasonicRange = function () {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return ["donutbot_get_distance('ultrasonic')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_donutbot_readDistance = function () {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return ["donutbot_get_distance('tof')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_donutbot_lineDetector = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addInit('donutbot-sensor-lights', 'donutbot_set_led_captor(True)');
    const side = block.getFieldValue('SIDE');
    return [`donutbot_get_line('${side}')`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_donutbot_lineDetectorFunction = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addInit('donutbot-sensor-lights', 'donutbot_set_led_captor(True)');
    Blockly.Python.addFunction('donutbot_line_following', FUNCTIONS_L476.DEF_DONUTBOT_LINE_FOLLOWING);
    return `donutbot_line_following()` + NEWLINE;
};

Blockly.Python.robots_donutbot_lineDetectorThreshold = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addInit('donutbot-sensor-lights', 'donutbot_set_led_captor(True)');
    const threshold = Blockly.Python.valueToCode(block, 'THRESHOLD', Blockly.Python.ORDER_NONE) || "0";
    return `donutbot_set_treshold_value(${threshold})` + NEWLINE;
};

Blockly.Python.robots_donutbot_colorDetector = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addInit('donutbot-sensor-lights', 'donutbot_set_led_captor(True)');
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const side = block.getFieldValue('SIDE');
    return [`donutbot_get_color_${side}()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_donutbot_colorDetector_average = function () {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addInit('donutbot-sensor-lights', 'donutbot_set_led_captor(True)');
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return [`donutbot_get_color()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_donutbot_colorDetector_name = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addInit('donutbot-sensor-lights', 'donutbot_set_led_captor(True)');
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const side = block.getFieldValue('SIDE');
    return [`donutbot_get_color_name_${side}()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_donutbot_setGo = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const speed = Math.max(0, Math.min(100, Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || 0));
    switch (block.getFieldValue("DIR")) {
        case "FORWARD":
            return "donutbot_move_forward(" + Math.round((speed / 100) * 7000) + ")" + NEWLINE;
        case "REVERSE":
            return "donutbot_move_backward(" + Math.round((speed / 100) * 7000) + ")" + NEWLINE;
    }
};

Blockly.Python.robots_donutbot_turnTo = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const speed = Math.max(0, Math.min(100, Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || 0));
    switch (block.getFieldValue("MOTOR")) {
        case "RIGHT":
            return "donutbot_rot_clock(" + Math.round((speed / 100) * 7000) + ")" + NEWLINE;
        case "LEFT":
            return "donutbot_rot_trigo(" + Math.round((speed / 100) * 7000) + ")" + NEWLINE;
    }
};

Blockly.Python.robots_donutbot_controlMotor = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const motor = block.getFieldValue("MOTOR");
    const direction = block.getFieldValue("DIR");
    const speed = Math.max(0, Math.min(100, Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || 0));
    if (motor == "2") { // RIGHT
        if (direction == "-1") {
            return `donutbot_controlMotor(${motor}, ${Math.round((speed / 100) * 7000)})` + NEWLINE;
        }
        return `donutbot_controlMotor(${motor}, ${-1 * Math.round((speed / 100) * 7000)})` + NEWLINE;
    }
    return `donutbot_controlMotor(${motor}, ${direction * Math.round((speed / 100) * 7000)})` + NEWLINE;
};

Blockly.Python.robots_donutbot_turnToAngle = function (block) {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const direction = block.getFieldValue("DIR");
    const angle = Math.max(0, Math.min(360, Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || 0));
    const speed = Math.max(0, Math.min(100, Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || 0));
    return `donutbot_turnAngle(${angle * direction}, ${Math.round((speed / 100) * 7000)})` + NEWLINE;
};

Blockly.Python.robots_donutbot_moveOneSquareForward = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return "donutbot_moveWithSquare(1, 'forward', 1400)" + NEWLINE;
};

Blockly.Python.robots_donutbot_moveOneSquareBackward = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return "donutbot_moveWithSquare(1, 'backward', 1400)" + NEWLINE;
};

Blockly.Python.robots_donutbot_turnLeft = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return "donutbot_turnAngle(-90, 1400)" + NEWLINE;
};

Blockly.Python.robots_donutbot_turnRight = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return "donutbot_turnAngle(90, 1400)" + NEWLINE;
};

Blockly.Python.robots_donutbot_stopMotors = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return `donutbot_pause(${block.getFieldValue("MOTOR")})` + NEWLINE;
};

Blockly.Python.robots_donutbot_releaseMotors = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return `donutbot_stop(${block.getFieldValue("MOTOR")})` + NEWLINE;
};

Blockly.Python.robots_donutbot_neopixel_setColor = function (block) {
    const pinName = Blockly.Python.Generators.digital_write("'D12'", 'Neopixel');
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addInit('donutbot_neopixel', `npDonutbot = neopixel.NeoPixel(${pinName}, 8)`);

    const r = Math.max(0, Math.min(255, Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || 0));
    const g = Math.max(0, Math.min(255, Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || 0));
    const b = Math.max(0, Math.min(255, Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || 0));

    if (block.getFieldValue("LED") === "all") {
        Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_L476.DEF_NEOPIXEL_SHOW_ALL_LED);
        return `neopixel_showAllLed(npDonutbot, 8, ${r}, ${g}, ${b})` + NEWLINE;
    } else {
        const ledIndex = block.getFieldValue("LED");
        return `npDonutbot[${ledIndex}] = (${r}, ${g}, ${b})` + NEWLINE + `npDonutbot.write()` + NEWLINE;
    }
};

Blockly.Python.robots_donutbot_neopixel_setPaletteColor = function (block) {
    const pinName = Blockly.Python.Generators.digital_write("'D12'", 'Neopixel');
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addInit('donutbot_neopixel', `npDonutbot = neopixel.NeoPixel(${pinName}, 8)`);

    const led = block.getFieldValue("LED");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";

    if (led === "all") {
        Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_L476.DEF_NEOPIXEL_SHOW_ALL_LED);
        return `neopixel_showAllLed(npDonutbot, 8, ${colour.slice(1, -1)})` + NEWLINE;
    } else {
        return `npDonutbot[${led}] = ${colour}` + NEWLINE + `npDonutbot.write()` + NEWLINE;
    }
};

Blockly.Python.robots_donutbot_blinkRobot = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const pinName = Blockly.Python.Generators.digital_write("'D12'", 'Neopixel');
    Blockly.Python.addInit('donutbot_neopixel', `npDonutbot = neopixel.NeoPixel(${pinName}, 8)`);
    Blockly.Python.addFunction('donutbot_blinkRobot', FUNCTIONS_L476.DEF_DONUTBOT_BLINK_ROBOT);
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    return `donutbot_blinkRobot(${colour.replace('(', '').replace(')', '')})` + NEWLINE;
};

Blockly.Python.robots_donutbot_neopixel_setRainbow = function () {
    const pinName = Blockly.Python.Generators.digital_write("'D12'", 'Neopixel');
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('donutbot_neopixel', `npDonutbot = neopixel.NeoPixel(${pinName}, 8)`);
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_L476.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_L476.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(npDonutbot, 8)" + NEWLINE;
};

Blockly.Python.robots_donutbot_buttons_onPressed = function (block) {
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Simple Button');
    return [`${pinName}.value() == ${block.getFieldValue("STATE")}`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_donutbot_BLE_SendData = function (block) {
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addInit('ble_uart', 'uart = UART(1, baudrate=9600)');
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "";
    return "if uart:" + NEWLINE + "  " + `uart.write(${data} + '\\n')` + NEWLINE;
};

Blockly.Python.robots_donutbot_BLE_ReadData = function (block) {
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addInit('ble_uart', 'uart = UART(1, baudrate=9600)');
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return "if uart.any():" + NEWLINE + "  " + dataVar + " = uart.read().decode().strip()" + NEWLINE + branchCode;
};