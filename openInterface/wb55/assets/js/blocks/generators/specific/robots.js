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
    Blockly.Python.addFunction('getSensorAboveLine', FUNCTIONS_WB55.DEF_ALPHABOT_GET_SENSOR_ABOVE_LINE);
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
    Blockly.Python.addFunction('isSensorAboveLine', FUNCTIONS_WB55.DEF_ALPHABOT_IS_SENSOR_ABOVE_LINE);
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
    Blockly.Python.addFunction('getSensorAboveLine', FUNCTIONS_WB55.DEF_ALPHABOT_GET_SENSOR_ABOVE_LINE);
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
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    let dir = "";
    if (block.getFieldValue("DIR") == "ANTICLOCKWISE") {
        dir = "-";
    }
    const motor = block.getFieldValue("MOTOR")
    switch (motor) {
        case "RIGHT":
            return "alphabot.setMotorRight(" + dir + speed + ")" + NEWLINE;
        case "LEFT":
            return "alphabot.setMotorLeft(" + dir + speed + ")" + NEWLINE;
    }
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
    const motor = block.getFieldValue("MOTOR");
    switch (motor) {
        case "LEFT":
            return "alphabot.setMotorLeft(0)" + NEWLINE;
        case "RIGHT":
            return "alphabot.setMotorRight(0)" + NEWLINE;
        case "BOTH":
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
    Blockly.Python.addFunction('remoteNEC_callback', FUNCTIONS_WB55.DEF_REMOTE_NEC_CALLBACK);
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
    Blockly.Python.addFunction('remoteNEC_basicBlack_getButton', FUNCTIONS_WB55.DEF_REMOTE_NEC_BASIC_BLACK_GET_BUTTON);
    return code;
};

Blockly.Python.robots_alphabot_onRemoteCommandReceived_car_mp3_gray = function (block) {
    var code = Blockly.Python.robots_alphabot_onRemoteCommandReceived_generator(block);
    Blockly.Python.addConstant('NEC_REMOTE_TYPE', "NEC_REMOTE_TYPE = 'Car_mp3'");
    Blockly.Python.addFunction('remoteNEC_Carmp3_gray_getButton', FUNCTIONS_WB55.DEF_REMOTE_NEC_AR_MP3_GRAY_GET_BUTTON);
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
        Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_WB55.DEF_NEOPIXEL_SHOW_ALL_LED);
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
        Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_WB55.DEF_NEOPIXEL_SHOW_ALL_LED);
        return "neopixel_showAllLed(npAlphabot, 4, " + colour.replace('(', '').replace(')', '') + ")" + NEWLINE;
    } else {
        return "npAlphabot[" + led + "] = " + colour + NEWLINE + "npAlphabot.write()" + NEWLINE;
    }
};

Blockly.Python.robots_alphabot_neopixel_setRainbow = function () {
    const pinName = Blockly.Python.Generators.digital_write("'D7'", 'Neopixel');
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addImport('stm32_alphabot_v2', IMPORT_STM32_ALPHABOT_V2);
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    Blockly.Python.addInit('alphabot_neopixel', "npAlphabot = neopixel.NeoPixel(" + pinName + ", 4)");
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_WB55.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_WB55.DEF_NEOPIXEL_RAINBOW);
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
