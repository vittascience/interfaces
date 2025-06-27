/**
 * @fileoverview Robots generators for Galaxia.
 */

// Maqueen

Blockly.Python.robots_getMaqueenUltrasonicRanger = function (block) {
    Blockly.Python.addImport('machine_pulse', IMPORT_MACHINE_PULSE_MS);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addFunction('getUltrasonicData', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_GROVE_ULTRASONIC);
    return ["getUltrasonicData(pin1, pin2, '" + block.getFieldValue("DATA") + "')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_controlMaqueenLed = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    if (block.getFieldValue("LED") == 1) {
        return "pin8.write_digital(" + state + ")" + NEWLINE;
    } else {
        return "pin12.write_digital(" + state + ")" + NEWLINE;
    }
};

Blockly.Python.robots_setMaqueenGo = function (block) {
    const dir = block.getFieldValue("DIR");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 255) speed = 255;
    if (speed < 0) speed = 0;
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    return "i2c.write(0x10, bytearray([0x00, " + dir + ", " + speed + "]))" + NEWLINE + "i2c.write(0x10, bytearray([0x02, " + dir + ", " + speed + "]))" + NEWLINE;
};

Blockly.Python.robots_controlMaqueenMotor = function (block) {
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 255) speed = 255;
    if (speed < 0) speed = 0;
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    return "i2c.write(0x10, bytearray([" + block.getFieldValue("MOTOR") + ", " + block.getFieldValue("DIR") + ", " + speed + "]))" + NEWLINE;
};

Blockly.Python.robots_stopMaqueenMotors = function (block) {
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    if (block.getFieldValue("MOTOR") == "both") {
        return "i2c.write(0x10, bytearray([0x00, 0, 0]))" + NEWLINE + "i2c.write(0x10, bytearray([0x02, 0, 0]))" + NEWLINE;
    } else {
        return "i2c.write(0x10, bytearray([" + block.getFieldValue("MOTOR") + ", 0, 0]))" + NEWLINE;
    }
};

Blockly.Python.robots_setMaqueenServoAngle = function (block) {
    const servo = block.getFieldValue("SERVO");
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    let angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    if (angle > 180) angle = 180;
    if (angle < 0) angle = 0;
    if (servo == "both") {
        return "i2c.write(0x10, bytearray([0x14, " + angle + "]))" + NEWLINE + "i2c.write(0x10, bytearray([0x15, " + angle + "]))" + NEWLINE;
    } else {
        return "i2c.write(0x10, bytearray([" + servo + ", " + angle + "]))" + NEWLINE;
    }
};

Blockly.Python.robots_readMaqueenPatrol = function (block) {
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    return [block.getFieldValue("PIN") + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_setMaqueenNeopixel = function (block) {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addInit('maqueen_neopixel', "npMaq = neopixel.NeoPixel(pin15, 4)");
    let r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    let g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    let b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (r > 255) r = 255;
    if (r < 0) r = 0;
    if (g > 255) g = 255;
    if (g < 0) g = 0;
    if (b > 255) b = 255;
    if (b < 0) b = 0;
    if (block.getFieldValue("LED") == "all") {
        return "for i in range(4):" + NEWLINE + "  npMaq[i] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npMaq.show()" + NEWLINE;
    } else {
        return "npMaq[" + block.getFieldValue("LED") + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npMaq.show()" + NEWLINE;
    }
};

Blockly.Python.robots_setMaqueenNeopixelPalette = function (block) {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addInit('maqueen_neopixel', "npMaq = neopixel.NeoPixel(pin15, 4)");
    const led = block.getFieldValue("LED");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    if (led == "all") {
        return "for i in range(4):" + NEWLINE + "  npMaq[i] = " + colour + NEWLINE + "npMaq.show()" + NEWLINE;
    } else {
        return "npMaq[" + led + "] = " + colour + NEWLINE + "npMaq.show()" + NEWLINE;
    }
};

Blockly.Python.robots_setMaqueenRainbow = function () {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addInit('maqueen_neopixel', "npMaq = neopixel.NeoPixel(pin15, 4)");
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(npMaq, 4)" + NEWLINE;
};

Blockly.Python.robots_setMaqueenBuzzer = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addFunction('pitch', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BUZZER_PITCH);
    Blockly.Python.addInit('buzzer_module_pin0', "# Maqueen Buzzer on pin0");
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    return "pitch(pin0, " + freq + ", " + time + ")" + NEWLINE;
};

Blockly.Python.robots_playMaqueenMusic = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addFunction('pitch', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BUZZER_PITCH);
    Blockly.Python.addInit('buzzer_module_pin0', "# Maqueen Buzzer on pin0");
    switch (block.getFieldValue("MUSIC")) {
        case "GAMME":
            Blockly.Python.addFunction('BuzzerGamme', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BUZZER_GAMME);
            return "BuzzerGamme(pin0)" + NEWLINE;
        case "SW":
            Blockly.Python.addFunction('BuzzerStarWars', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BUZZER_STAR_WARS);
            return "BuzzerStarWars(pin0)" + NEWLINE;
        case "R2D2":
            Blockly.Python.addFunction('BuzzerR2D2', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BUZZER_R2D2);
            return "BuzzerR2D2(pin0)" + NEWLINE;
        default:
            throw Error("Unhandled option (lists_getSublist)");
    }
};

Blockly.Python.robots_alphabot_onRemoteCommandReceived_generator = function(block) {
    const IRvariableName = "ir_current_remote_button";
    block.workspace.createVariable(IRvariableName);
    var n = 0;
    var code = "ir_remote.decode()" + NEWLINE;
    var branchCode, conditionCode;
    Blockly.Python.addImport('nec_remote', IMPORT_NEC_REMOTE);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addInit('ir_current_remote_button', "ir_current_remote_button = None");
    Blockly.Python.addFunction('remoteNEC_callback', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_REMOTE_NEC_CALLBACK);
    Blockly.Python.addPowerOn('ir_remote', "ir_remote = NEC_8(pin16, remoteNEC_callback)");
    if (Blockly.Python.STATEMENT_PREFIX) {
      // Automatic prefix insertion is switched off for this block.  Add manually.
      code += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, block);
    }
    do {
      conditionCode = "ir_current_remote_button == \"" + block.getFieldValue("COMMAND" + n) + "\"";
      branchCode = Blockly.Python.statementToCode(block, "DO" + n) || Blockly.Python.PASS;
      if (Blockly.Python.STATEMENT_SUFFIX) {
        branchCode = Blockly.Python.prefixLines(
            Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
            Blockly.Python.INDENT) + branchCode;
      }
      code += (n == 0 ? "if " : "elif " ) + conditionCode + ":" + NEWLINE + branchCode;
      ++n;
    } while (block.getInput("ELSEIF" + n));
  
    if (block.getInput("ELSE") || Blockly.Python.STATEMENT_SUFFIX) {
      branchCode = Blockly.Python.statementToCode(block, "ELSE") || Blockly.Python.PASS;
      if (Blockly.Python.STATEMENT_SUFFIX) {
        branchCode = Blockly.Python.prefixLines(
            Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
            Blockly.Python.INDENT) + branchCode;
      }
      code += "else:" + NEWLINE + branchCode + IRvariableName + " = None" + NEWLINE;
    }
    return code;
};

Blockly.Python.robots_maqueen_onRemoteCommandReceived = function(block) {
    var code =  Blockly.Python.robots_alphabot_onRemoteCommandReceived_generator(block);
    Blockly.Python.addConstant('NEC_REMOTE_TYPE', "NEC_REMOTE_TYPE = 'basic_black'");
    Blockly.Python.addFunction('remoteNEC_basicBlack_getButton', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_REMOTE_NEC_BASIC_BLACK_GET_BUTTON);
    return code;
};

Blockly.Python.robots_maqueen_onRemoteCommandReceived_car_mp3_gray = function(block) {
    var code =  Blockly.Python.robots_alphabot_onRemoteCommandReceived_generator(block);
    Blockly.Python.addConstant('NEC_REMOTE_TYPE', "NEC_REMOTE_TYPE = 'Car_mp3'");
    Blockly.Python.addFunction('remoteNEC_Carmp3_gray_getButton', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_REMOTE_NEC_AR_MP3_GRAY_GET_BUTTON);
    return code;
};

Blockly.Python.robots_decodeMaqueenIRreceiver = function() {
    Blockly.Python.addImport('nec_remote', IMPORT_NEC_REMOTE);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addInit('ir_current_remote_button', "ir_current_remote_button = None");
    Blockly.Python.addFunction('IRreceiver_callback', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_IR_RECEIVER_CALLBACK);
    Blockly.Python.addPowerOn('ir_receiver', "ir_receiver = NEC_8(pin16, IRreceiver_callback)");
    return "ir_receiver.decode()" + NEWLINE;
};

Blockly.Python.robots_getMaqueenIRcode = function() {
    Blockly.Python.addImport('nec_remote', IMPORT_NEC_REMOTE);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addInit('ir_current_remote_button', "ir_current_remote_button = None");
    Blockly.Python.addFunction('IRreceiver_callback', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_IR_RECEIVER_CALLBACK);
    Blockly.Python.addPowerOn('ir_receiver', "ir_receiver = NEC_8(pin16, IRreceiver_callback)");
    return ["ir_current_remote_button", Blockly.Python.ORDER_ATOMIC];
};

// Codo

Blockly.Python.robots_setCodoGo = function (block) {
    Blockly.Python.addFunction('codo_controlLeftMotor', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_CODO_CONTROL_LEFT_MOTOR);
    Blockly.Python.addFunction('codo_controlRightMotor', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_CODO_CONTROL_RIGHT_MOTOR);
    Blockly.Python.addFunction('codo_move', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_CODO_MOVE);
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 1023) speed = 1023;
    if (speed < 0) speed = 0;
    switch (block.getFieldValue("DIR")) {
        case "FORWARD":
            return "codo_move('forward', " + speed + ")" + NEWLINE;
        case "BACKWARD":
            return "codo_move('backward', " + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_setCodoTurn = function (block) {
    Blockly.Python.addFunction('codo_controlLeftMotor', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_CODO_CONTROL_LEFT_MOTOR);
    Blockly.Python.addFunction('codo_controlRightMotor', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_CODO_CONTROL_RIGHT_MOTOR);
    Blockly.Python.addFunction('codo_move', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_CODO_MOVE);
    var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    switch (block.getFieldValue("DIR")) {
        case "RIGHT":
            return "codo_move('right', " + speed + ")" + NEWLINE;
        case "LEFT":
            return "codo_move('left', " + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_setCodoStop = function () {
    Blockly.Python.addFunction('codo_controlLeftMotor', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_CODO_CONTROL_LEFT_MOTOR);
    Blockly.Python.addFunction('codo_controlRightMotor', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_CODO_CONTROL_RIGHT_MOTOR);
    Blockly.Python.addFunction('codo_move', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_CODO_MOVE);
    return "codo_move('stop')" + NEWLINE;
};

Blockly.Python.robots_controlCodoMotors = function (block) {
    var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    var dir = block.getFieldValue("DIR");
    switch (block.getFieldValue("MOTOR")) {
        case "RIGHT":
            Blockly.Python.addFunction('codo_controlRightMotor', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_CODO_CONTROL_RIGHT_MOTOR);
            switch (dir) {
                case "CLOCKWISE":
                    return "codo_controlRightMotor([0, 1], " + speed + ")" + NEWLINE;
                case "ANTICLOCKWISE":
                    return "codo_controlRightMotor([1, 0], " + speed + ")" + NEWLINE;
            }
        case "LEFT":
            Blockly.Python.addFunction('codo_controlLeftMotor', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_CODO_CONTROL_LEFT_MOTOR);
            switch (dir) {
                case "CLOCKWISE":
                    return "codo_controlLeftMotor([1, 0], " + speed + ")" + NEWLINE;
                case "ANTICLOCKWISE":
                    return "codo_controlLeftMotor([0, 1], " + speed + ")" + NEWLINE;
            }
    }
};

// Buggy
Blockly.Python.robots_initializeBuggy = function (block) {
    Blockly.Python.addImport('buggy', IMPORT_BUGGY_MOVE);
    Blockly.Python.addInit('buggy', 'buggy=MOVEmotor()');
};

Blockly.Python.robots_setBuggyGo = function (block) {
    Blockly.Python.robots_initializeBuggy();
    var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 1023) speed = 1023;
    if (speed < 0) speed = 0;
    switch (block.getFieldValue("DIR")) {
        case "FORWARD":
            return "buggy.setLeftMotorSpeed(" + speed + ")" + NEWLINE + "buggy.setRightMotorSpeed(" + speed + ")" + NEWLINE;
        case "BACKWARD":
            return "buggy.setLeftMotorSpeed(-" + speed + ")" + NEWLINE + "buggy.setRightMotorSpeed(-" + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_setBuggyTurn = function (block) {
    Blockly.Python.robots_initializeBuggy();
    var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    switch (block.getFieldValue("DIR")) {
        case "RIGHT":
            return "buggy.setLeftMotorSpeed(" + speed + ")" + NEWLINE + "buggy.setRightMotorSpeed(-" + speed + ")" + NEWLINE;
        case "LEFT":
            return "buggy.setLeftMotorSpeed(-" + speed + ")" + NEWLINE + "buggy.setRightMotorSpeed(" + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_setBuggyStop = function () {
    Blockly.Python.robots_initializeBuggy();
    return "buggy.stopMotors()" + NEWLINE;
};

Blockly.Python.robots_controlBuggyMotors = function (block) {
    Blockly.Python.robots_initializeBuggy();
    var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    var dir = block.getFieldValue("DIR");
    switch (block.getFieldValue("MOTOR")) {
        case "RIGHT":
            switch (dir) {
                case "CLOCKWISE":
                    return "buggy.setRightMotorSpeed(" + speed + ")" + NEWLINE;
                case "ANTICLOCKWISE":
                    return "buggy.setRightMotorSpeed(-" + speed + ")" + NEWLINE;
            }
        case "LEFT":
            switch (dir) {
                case "CLOCKWISE":
                    return "buggy.setLeftMotorSpeed(" + speed + ")" + NEWLINE;
                case "ANTICLOCKWISE":
                    return "buggy.setLeftMotorSpeed(-" + speed + ")" + NEWLINE;
            }
    }
};

// Bit:bot

Blockly.Python.robots_readBitBotLightSensor = function (block) {
    Blockly.Python.addFunction('bitbot_readLightSensor', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BITBOT_LIGHT_SENSOR);
    return ["bitbot_readLightSensor(" + block.getFieldValue("RL") + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_readBitBotPatrol = function (block) {
    return [block.getFieldValue("PIN") + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_setBitbotGo = function (block) {
    var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 1023) speed = 1023;
    if (speed < 0) speed = 0;
    Blockly.Python.addInit('bitbot', '# Bitbot');
    Blockly.Python.addFunction('bitbot_controlMotors', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BITBOT_GO);
    return "bitbot_controlMotors(" + block.getFieldValue("DIR") + ", " + speed + ")" + NEWLINE;
};

Blockly.Python.robots_controlBitBotMotor = function (block) {
    let pins = block.getFieldValue("MOTOR").split("/");
    var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 1023) speed = 1023;
    if (speed < 0) speed = 0;
    Blockly.Python.addInit('bitbot', '# Bitbot');
    return pins[0] + ".write_analog(" + speed + ")" + NEWLINE + pins[1] + ".write_digital(" + block.getFieldValue("DIR") + ")" + NEWLINE;
};

Blockly.Python.robots_stopBitBotMotors = function (block) {
    Blockly.Python.addInit('bitbot', '# Bitbot');
    if (block.getFieldValue("MOTOR") == "all") {
        Blockly.Python.addFunction('bitbot_controlMotors', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BITBOT_GO);
        return "bitbot_controlMotors(0, 0)" + NEWLINE;
    } else {
        let pins = block.getFieldValue("MOTOR").split("/");
        return pins[0] + ".write_analog(0)" + NEWLINE + pins[1] + ".write_digital(0)" + NEWLINE;
    }
};

Blockly.Python.robots_setBitBotNeopixel = function (block) {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addInit('bitbot_neopixel', "npBot = neopixel.NeoPixel(pin13, 12)");
    var r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    var g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    var b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    var l = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    if (r > 255) r = 255;
    if (r < 0) r = 0;
    if (g > 255) g = 255;
    if (g < 0) g = 0;
    if (b > 255) b = 255;
    if (b < 0) b = 0;
    if (l < 0 || l > 11) {
        return "npBot[0]=(0,0,0)" + NEWLINE + "npBot.show()" + NEWLINE;
    }
    return "npBot[" + l + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npBot.show()" + NEWLINE;
};

Blockly.Python.robots_setBitBotNeopixelPalette = function (block) {
    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    var colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addInit('bitbot_neopixel', "npBot = neopixel.NeoPixel(pin13, 12)");
    return "npBot[" + led + "] = " + colour + NEWLINE + "npBot.show()" + NEWLINE;
};

Blockly.Python.robots_setBitBotRainbow = function () {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('bitbot_neopixel', "npBot = neopixel.NeoPixel(pin13, 12)");
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(npBot, 12)" + NEWLINE;
};

// Gamepad

Blockly.Python.robots_setGamepadLED = function (block) {
    var state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('gamepad', '# Gamepad');
    return "pin16.write_digital(" + state + ")" + NEWLINE;
};

Blockly.Python.robots_setGamepadMotorVibration = function (block) {
    var state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('gamepad', '# Gamepad');
    return "pin12.write_digital(" + state + ")" + NEWLINE;
};

Blockly.Python.robots_setGamepadBuzzerFreq = function (block) {
    var freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    var time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('gamepad', '# Gamepad');
    Blockly.Python.addFunction('pitch', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BUZZER_PITCH);
    return "pitch(pin0, " + freq + ", " + time + ")" + NEWLINE;
};

Blockly.Python.robots_playGamepadMusic = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('gamepad', '# Gamepad');
    Blockly.Python.addFunction('pitch', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BUZZER_PITCH);
    switch (block.getFieldValue("MUSIC")) {
        case "GAMME":
            Blockly.Python.addFunction('BuzzerGamme', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BUZZER_GAMME);
            return "BuzzerGamme(pin0)" + NEWLINE;
        case "SW":
            Blockly.Python.addFunction('BuzzerStarWars', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BUZZER_STAR_WARS);
            return "BuzzerStarWars(pin0)" + NEWLINE;
        case "R2D2":
            Blockly.Python.addFunction('BuzzerR2D2', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BUZZER_R2D2);
            return "BuzzerR2D2(pin0)" + NEWLINE;
        default:
            throw Error("Invalid music option: '" + block.getFieldValue("STATE") + "'");
    }
};

Blockly.Python.robots_onGamepadButtonEvent = function (block) {
    var button = block.getFieldValue("BUTTON");
    var branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    Blockly.Python.addInit('gamepad', '# Gamepad');
    Blockly.Python.addPowerOn('set_pull_' + button, button + ".set_pull(" + button + ".PULL_UP)")
    switch (block.getFieldValue("STATE")) {
        case "PRESSED":
            return "if not " + button + ".read_digital():" + NEWLINE + branchCode;
        case "RELEASED":
            return "if " + button + ".read_digital():" + NEWLINE + branchCode;
        default:
            throw Error('Invalid state for gamepad button: ' + block.getFieldValue("STATE"));
    }
};