/**
 * @fileoverview Robots generators for Micro:bit.
 */

// Remote Control

Blockly.Python.robots_onRemoteCommandReceived_generator = function (block, pin = 'pin16') {
    const IRvariableName = "ir_current_remote_button";
    block.workspace.createVariable(IRvariableName);
    var n = 0;
    var code = "ir_remote.decode()" + NEWLINE;
    var branchCode, conditionCode;
    Blockly.Python.addImport('nec_remote', IMPORT_NEC_REMOTE);
    Blockly.Python.addInit(IRvariableName, IRvariableName + " = None");
    Blockly.Python.addFunction('remoteNEC_callback', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_CALLBACK);
    Blockly.Python.addPowerOn('ir_remote', "ir_remote = NEC_8(" + pin + ", remoteNEC_callback)");
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
        code += "else:" + NEWLINE + branchCode + IRvariableName + " = None" + NEWLINE;
    }
    return code;
};

Blockly.Python.robots_decodeIRreceiver_generator = function () {
    Blockly.Python.addImport('nec_remote', IMPORT_NEC_REMOTE);
    Blockly.Python.addInit('ir_current_remote_button', "ir_current_remote_button = None");
    Blockly.Python.addFunction('IRreceiver_callback', FUNCTIONS_MICROBIT.DEF_IR_RECEIVER_CALLBACK);
    Blockly.Python.addPowerOn('ir_receiver', "ir_receiver = NEC_8(pin16, IRreceiver_callback)");
    return "ir_receiver.decode()" + NEWLINE;
};

Blockly.Python.robots_getIRcode_generator = function () {
    Blockly.Python.addImport('nec_remote', IMPORT_NEC_REMOTE);
    Blockly.Python.addInit('ir_current_remote_button', "ir_current_remote_button = None");
    Blockly.Python.addFunction('IRreceiver_callback', FUNCTIONS_MICROBIT.DEF_IR_RECEIVER_CALLBACK);
    Blockly.Python.addPowerOn('ir_receiver', "ir_receiver = NEC_8(pin16, IRreceiver_callback)");
    return ["ir_current_remote_button", Blockly.Python.ORDER_ATOMIC];
};

// Maqueen Lite - Detection

Blockly.Python.robots_getMaqueenUltrasonicRanger = function (block) {
    Blockly.Python.addImport('machine_pulse', IMPORT_MACHINE_PULSE_MS);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addInit('pin1', "# Ultrasonic TRIG on pin1");
    Blockly.Python.addInit('pin2', "# Ultrasonic ECHO on pin2");
    Blockly.Python.addFunction('getUltrasonicData', FUNCTIONS_MICROBIT.DEF_GROVE_ULTRASONIC);
    return ["getUltrasonicData(pin1, pin2, '" + block.getFieldValue("DATA") + "')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_readMaqueenPatrol = function (block) {
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    return [block.getFieldValue("PIN") + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_maqueenV5_readPatrol = function (block) {
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    const sensor = block.getFieldValue("SENSOR");
    Blockly.Python.addFunction('maqueenV5_readPatrol', FUNCTIONS_MICROBIT.DEF_MAQUEEN_V5_READ_PATROL);
    return [`maqueenV5_readPatrol(${sensor})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_maqueenV5_batteryLevel = function (block) {
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    const type = block.getFieldValue("TYPE");
    Blockly.Python.addFunction('maqueenV5_getBatteryLevel', FUNCTIONS_MICROBIT.DEF_MAQUEEN_V5_GET_BATTERY_LEVEL);
    return [`maqueenV5_getBatteryLevel(${type})`, Blockly.Python.ORDER_ATOMIC];
};

// Maqueen Lite - Moving

Blockly.Python.robots_setMaqueenGo = function (block) {
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    const dir = block.getFieldValue("DIR");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 255) speed = 255;
    if (speed < 0) speed = 0;
    const motor_left = "i2c.write(0x10, bytearray([0x00, " + dir + ", int(" + speed + ")]))";
    const motor_right = "i2c.write(0x10, bytearray([0x02, " + dir + ", int(" + speed + ")]))";
    return motor_left + NEWLINE + motor_right + NEWLINE;
};

Blockly.Python.robots_rotateMaqueen = function (block) {
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    const dir = block.getFieldValue("DIR");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 255) speed = 255;
    if (speed < 0) speed = 0;
    let motor_left = '',
        motor_right = '';
    if (dir === 'right') {
        motor_left = "i2c.write(0x10, bytearray([0x00, 0x0, int(" + speed + ")]))";
        motor_right = "i2c.write(0x10, bytearray([0x02, 0x1, int(" + speed + ")]))";
    } else {
        motor_left = "i2c.write(0x10, bytearray([0x02, 0x0, int(" + speed + ")]))";
        motor_right = "i2c.write(0x10, bytearray([0x00, 0x1, int(" + speed + ")]))";
    }
    return motor_left + NEWLINE + motor_right + NEWLINE;
};

Blockly.Python.robots_controlMaqueenMotor = function (block) {
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    const dir = block.getFieldValue("DIR");
    const motor = block.getFieldValue("MOTOR");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 255) speed = 255;
    if (speed < 0) speed = 0;
    return "i2c.write(0x10, bytearray([" + motor + ", " + dir + ", int(" + speed + ")]))" + NEWLINE;
};

Blockly.Python.robots_moveOneSquareForward = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addFunction('convertSpeed_mps', FUNCTIONS_MICROBIT.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('maqueen_moveWithSquare', FUNCTIONS_MICROBIT.DEF_MAQUEEN_MOVE_WITH_SQUARE);
    return "maqueen_moveWithSquare(1, 0x0, 100)" + NEWLINE;
};

Blockly.Python.robots_moveOneSquareBackward = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addFunction('convertSpeed_mps', FUNCTIONS_MICROBIT.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('maqueen_moveWithSquare', FUNCTIONS_MICROBIT.DEF_MAQUEEN_MOVE_WITH_SQUARE);
    return "maqueen_moveWithSquare(1, 0x1, 100)" + NEWLINE;
};

Blockly.Python.robots_turnLeft = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addFunction('convertSpeed_mps', FUNCTIONS_MICROBIT.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('maqueen_turnAngle', FUNCTIONS_MICROBIT.DEF_MAQUEEN_TURN_ANGLE);
    return "maqueen_turnAngle(90, 50)" + NEWLINE;
};

Blockly.Python.robots_turnRight = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addFunction('convertSpeed_mps', FUNCTIONS_MICROBIT.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('maqueen_turnAngle', FUNCTIONS_MICROBIT.DEF_MAQUEEN_TURN_ANGLE);
    return "maqueen_turnAngle(-90, 50)" + NEWLINE;
};

Blockly.Python.robots_stopRobot = function () {
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    return "i2c.write(0x10, bytearray([0x00, 0, 0]))" + NEWLINE + "i2c.write(0x10, bytearray([0x02, 0, 0]))" + NEWLINE;
};

Blockly.Python.robots_stopMaqueenMotors = function (block) {
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    const motor = block.getFieldValue("MOTOR");
    if (motor == "both") {
        return "i2c.write(0x10, bytearray([0x00, 0, 0]))" + NEWLINE + "i2c.write(0x10, bytearray([0x02, 0, 0]))" + NEWLINE;
    } else {
        return "i2c.write(0x10, bytearray([" + motor + ", 0, 0]))" + NEWLINE;
    }
};

// Maqueen Lite - Control

Blockly.Python.robots_controlMaqueenLed = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    if (block.getFieldValue("LED") == 0) {
        return "pin8.write_digital(" + state + ")" + NEWLINE;
    } else {
        return "pin12.write_digital(" + state + ")" + NEWLINE;
    }
};

Blockly.Python.robots_setMaqueenBuzzer = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addFunction('pitch', FUNCTIONS_MICROBIT.DEF_BUZZER_PITCH);
    Blockly.Python.addInit('buzzer_module_pin0', "# Maqueen Buzzer on pin0");
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    return "pitch(pin0, " + freq + ", " + time + ")" + NEWLINE;
};

Blockly.Python.robots_playMaqueenMusic = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addFunction('pitch', FUNCTIONS_MICROBIT.DEF_BUZZER_PITCH);
    Blockly.Python.addInit('buzzer_module_pin0', "# Maqueen Buzzer on pin0");
    switch (block.getFieldValue("MUSIC")) {
        case "GAMME":
            Blockly.Python.addFunction('BuzzerGamme', FUNCTIONS_MICROBIT.DEF_BUZZER_GAMME);
            return "BuzzerGamme(pin0)" + NEWLINE;
        case "SW":
            Blockly.Python.addFunction('BuzzerStarWars', FUNCTIONS_MICROBIT.DEF_BUZZER_STAR_WARS);
            return "BuzzerStarWars(pin0)" + NEWLINE;
        case "R2D2":
            Blockly.Python.addFunction('BuzzerR2D2', FUNCTIONS_MICROBIT.DEF_BUZZER_R2D2);
            return "BuzzerR2D2(pin0)" + NEWLINE;
        default:
            throw Error("Unhandled option (lists_getSublist)");
    }
};

Blockly.Python.robots_setMaqueenServoAngle = function (block) {
    const servo = block.getFieldValue("SERVO");
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    if (servo == "both") {
        return "i2c.write(0x10, bytearray([0x14, int(" + angle + ")]))" + NEWLINE + "i2c.write(0x10, bytearray([0x15, int(" + angle + ")]))" + NEWLINE;
    } else {
        return "i2c.write(0x10, bytearray([" + servo + ", int(" + angle + ")]))" + NEWLINE;
    }
};

Blockly.Python.robots_maqueenV5_patrolling = function (block) {
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return "i2c.write(0x10, bytearray([0x47, 0x01 if " + state + " else 0x02]))" + NEWLINE;
};

// Maqueen Lite - LED RGB

Blockly.Python.robots_blinkRobot = function () {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addInit('maqueen_neopixel', "npMaq = neopixel.NeoPixel(pin15, 4)");
    Blockly.Python.addFunction('maqueenPlusV2_blink', FUNCTIONS_MICROBIT.DEF_MAQUEEN_PLUS_V2_BLINK);
    return "maqueenPlusV2_blink()" + NEWLINE;
};

Blockly.Python.robots_setMaqueenNeopixel = function (block) {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addInit('neopixel_pin15', "# Neopixel on pin15");
    Blockly.Python.addInit('maqueen_neopixel', "npMaq = neopixel.NeoPixel(pin15, 4)");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (block.getFieldValue("LED") == "all") {
        return "for i in range(4):" + NEWLINE + "  npMaq[i] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npMaq.show()" + NEWLINE;
    } else {
        return "npMaq[" + block.getFieldValue("LED") + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npMaq.show()" + NEWLINE;
    }
};

Blockly.Python.robots_setMaqueenNeopixelPalette = function (block) {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addInit('neopixel_pin15', "# Neopixel on pin15");
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
    Blockly.Python.addConstant('maqueen-robot', "\"\"\" Maqueen robot \"\"\"");
    Blockly.Python.addInit('neopixel_pin15', "# Neopixel on pin15");
    Blockly.Python.addInit('maqueen_neopixel', "npMaq = neopixel.NeoPixel(pin15, 4)");
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(npMaq, 4)" + NEWLINE;
};

// Maqueen Lite - Remote Control

Blockly.Python.robots_maqueen_onRemoteCommandReceived = function (block) {
    Blockly.Python.addConstant('maqueen-robot', '""" Maqueen robot """');
    const code = Blockly.Python.robots_onRemoteCommandReceived_generator(block);
    Blockly.Python.addConstant('NEC_REMOTE_TYPE', "NEC_REMOTE_TYPE = 'basic_black'");
    Blockly.Python.addConstant('basic_black_NEC_buttons', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_BASIC_BLACK_BUTTONS);
    Blockly.Python.addFunction('remoteNEC_basicBlack_getButton', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_BASIC_BLACK_GET_BUTTON);
    return code;
};

Blockly.Python.robots_maqueen_onRemoteCommandReceived_car_mp3_gray = function (block) {
    Blockly.Python.addConstant('maqueen-robot', '""" Maqueen robot """');
    const code = Blockly.Python.robots_onRemoteCommandReceived_generator(block);
    Blockly.Python.addConstant('NEC_REMOTE_TYPE', "NEC_REMOTE_TYPE = 'Car_mp3'");
    Blockly.Python.addConstant('car_mp3_gray_NEC_buttons', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_AR_MP3_GRAY_BUTTONS);
    Blockly.Python.addFunction('remoteNEC_Carmp3_gray_getButton', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_AR_MP3_GRAY_GET_BUTTON);
    return code;
};

Blockly.Python.robots_decodeMaqueenIRreceiver = function () {
    Blockly.Python.addConstant('maqueen-robot', '""" Maqueen robot """');
    return Blockly.Python.robots_decodeIRreceiver_generator();
};

Blockly.Python.robots_getMaqueenIRcode = function () {
    Blockly.Python.addConstant('maqueen-robot', '""" Maqueen robot """');
    return Blockly.Python.robots_getIRcode_generator();
};

// Maqueen Plus - Sensors

Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT = function (block, v) {
    const version = block.getFieldValue("VERSION") || v;
    const LIBRARIES = {
        "1": IMPORT_MAQUEEN_PLUS_V1,
        "2": IMPORT_MAQUEEN_PLUS_V2,
        "3": IMPORT_MAQUEEN_PLUS_V3
    };
    Blockly.Python.addImport(`maqueenplusv${version}`, LIBRARIES[version]);
    Blockly.Python.addConstant(`maqueen-plus-V${version}`, `""" MaqueenPlusV${version} robot """`);
    if (version !== "1") {
        Blockly.Python.addInit(`maqueen-plus-V${version}`, `maqueenplusv${version}.initRobot()`);
    }
    return version;
};

Blockly.Python.robots_getMaqueenPlusV2UltrasonicRanger = function (block) {
    Blockly.Python.addImport('machine_pulse', IMPORT_MACHINE_PULSE_MS);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant(`maqueen-plus-V2`, `""" MaqueenPlusV2 robot """`);
    const trig = 'pin13', echo = 'pin14';
    Blockly.Python.addInit(trig, `# Ultrasonic TRIG on ${trig}`);
    Blockly.Python.addInit(echo, `# Ultrasonic ECHO on ${echo}`);
    Blockly.Python.addFunction('getUltrasonicData', FUNCTIONS_MICROBIT.DEF_GROVE_ULTRASONIC);
    return [`getUltrasonicData(${trig}, ${echo}, "${block.getFieldValue("DATA")}")`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_getMaqueenPlusUltrasonicRangerTrigEcho = function (block) {
    Blockly.Python.addImport('machine_pulse', IMPORT_MACHINE_PULSE_MS);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    const version = block.getFieldValue("VERSION");
    const trig = block.getFieldValue("TRIG");
    const echo = block.getFieldValue("ECHO");
    Blockly.Python.addConstant(`maqueen-plus-V${version}`, `""" MaqueenPlusV${version} robot """`);
    Blockly.Python.addInit(trig, `# Ultrasonic TRIG on ${trig}`);
    Blockly.Python.addInit(echo, `# Ultrasonic ECHO on ${echo}`);
    Blockly.Python.addFunction('getUltrasonicData', FUNCTIONS_MICROBIT.DEF_GROVE_ULTRASONIC);
    return [`getUltrasonicData(${trig}, ${echo}, "${block.getFieldValue("DATA")}")`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_readMaqueenPlusPatrol = function (block) {
    let side = block.getFieldValue("SIDE");
    const version = Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block);
    if (version == "1") side = `"${side}"`;
    return [`maqueenplusv${version}.sensor_on_line(${side})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_maqueenPlusV3_readLightIntensity = function (block) {
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block, "3");
    const sensor = block.getFieldValue("SENSOR");
    return [`maqueenplusv3.readLightIntensity('${sensor}')`, Blockly.Python.ORDER_ATOMIC];
};

// Maqueen Plus - Moving

Blockly.Python.robots_setMaqueenPlusGo = function (block) {
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    const version = Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block);
    if (version === "1") {
        const dir = block.getFieldValue("DIR") === 'FORWARD' ? '"F"' : '"B"';
        return `maqueenplusv1.move(${dir}, ${speed})` + NEWLINE;
    } else {
        const dir = block.getFieldValue("DIR") === 'FORWARD' ? 'drive' : 'backup';
        return `maqueenplusv${version}.${dir}(${speed})` + NEWLINE;
    }
};

Blockly.Python.robots_rotateMaqueenPlus = function (block) {
    const version = Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block);
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (version === "1") {
        const dir = block.getFieldValue("DIR") === 'right' ? '"RR"' : '"RL"';
        return `maqueenplusv1.move(${dir}, ${speed})` + NEWLINE;
    } else {
        return `maqueenplusv${version}.spin_${block.getFieldValue("DIR")}(${speed})` + NEWLINE;
    }
};

Blockly.Python.robots_controlMaqueenPlusMotor = function (block) {
    const version = Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block);
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    const motor = block.getFieldValue("MOTOR");
    const dir = block.getFieldValue("DIR");
    if (version === "1") {
        return `maqueenplusv1.motorControl(maqueenplusv1.${motor === 'Right' ? 'MT_R' : 'MT_L'}, maqueenplusv1.${dir}, ${speed})` + NEWLINE;
    } else {
        return `maqueenplusv${version}.motorControl${motor}(maqueenplusv${version}.${dir}, ${speed})` + NEWLINE;
    }
};

Blockly.Python.robots_stopMaqueenPlusMotors = function (block) {
    const version = Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block);
    const motor = block.getFieldValue("MOTOR");
    if (motor === 'both') {
        return `maqueenplusv${version}.stop()` + NEWLINE;
    }
    if (version == "1") {
        return `maqueenplusv1.motorControl(maqueenplusv1.${motor === 'Right' ? "MT_R" : "MT_L"}, 1, 0)` + NEWLINE;
    } else {
        return `maqueenplusv${version}.motorControl${motor}(0, 0)` + NEWLINE;
    }
};

// Maqueen Plus - Control

Blockly.Python.robots_controlMaqueenPlusLed = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const version = Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block);
    return `maqueenplusv${version}.headlights(${block.getFieldValue("LED")}, ${state})` + NEWLINE;
};

Blockly.Python.robots_maqueenPlusV3_setRGBLed = function (block) {
    const led = block.getFieldValue("LED");
    const color = block.getFieldValue("COLOR");
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block, "3");
    return `maqueenplusv3.setRGBLed('${led}', maqueenplusv3.COLOR['${color}'])` + NEWLINE;
};

Blockly.Python.robots_setMaqueenPlusBuzzer = function (block) {
    const version = Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('pitch', FUNCTIONS_MICROBIT.DEF_BUZZER_PITCH);
    Blockly.Python.addInit('buzzer_module_pin0', "# MaqueenPlus Buzzer on pin0");
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    return "pitch(pin0, " + freq + ", " + time + ")" + NEWLINE;
};

Blockly.Python.robots_setMaqueenPlusServoAngle = function (block) {
    const version = Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block);
    let servo = block.getFieldValue("SERVO");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    if (version == "1") servo = `maqueenplusv1.${servo}`;
    else {
        if (servo == 'ALL') servo = `'${servo}'`;
    }
    return `maqueenplusv${version}.set_servo_angle(${servo}, ${angle})` + NEWLINE;
};

// Maqueen Plus V2 & V3 - Neopixel

Blockly.Python.ROBOTS_MAQUEEN_PLUS_NEOPIXEL_INIT = function (version) {
    const PINS = {
        "2": "pin15",
        "3": "pin1"
    };
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addInit(`neopixel_${PINS[version]}`, `# Neopixel on ${PINS[version]}`);
    Blockly.Python.addInit('maqueen_neopixel', "npMaq = neopixel.NeoPixel(" + PINS[version] + ", 4)");
};

Blockly.Python.robots_maqueenPlusBlinkRobot = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    const FUNCTIONS = {
        "2": FUNCTIONS_MICROBIT.DEF_MAQUEEN_PLUS_V2_BLINK,
        "3": FUNCTIONS_MICROBIT.DEF_MAQUEEN_PLUS_V3_BLINK
    };
    const version = Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block);
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_NEOPIXEL_INIT(version);
    Blockly.Python.addFunction(`maqueenPlusV${version}_blink`, FUNCTIONS[version]);
    return `maqueenPlusV${version}_blink()` + NEWLINE;
};

Blockly.Python.robots_setMaqueenPlusNeopixel = function (block) {
    const version = Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block);
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_NEOPIXEL_INIT(version);
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (block.getFieldValue("LED") == "all") {
        return "for i in range(4):" + NEWLINE + "  npMaq[i] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npMaq.show()" + NEWLINE;
    } else {
        return "npMaq[" + block.getFieldValue("LED") + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npMaq.show()" + NEWLINE;
    }
};

Blockly.Python.robots_setMaqueenPlusNeopixelPalette = function (block) {
    const version = Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block);
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_NEOPIXEL_INIT(version);
    const led = block.getFieldValue("LED");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    if (led == "all") {
        return "for i in range(4):" + NEWLINE + "  npMaq[i] = " + colour + NEWLINE + "npMaq.show()" + NEWLINE;
    } else {
        return "npMaq[" + led + "] = " + colour + NEWLINE + "npMaq.show()" + NEWLINE;
    }
};

Blockly.Python.robots_setMaqueenPlusRainbow = function (block) {
    const version = Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block);
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_NEOPIXEL_INIT(version);
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(npMaq, 4)" + NEWLINE;
};

// Maqueen Plus - Remote control

Blockly.Python.robots_maqueenPlus_onRemoteCommandReceived = function (block) {
    Blockly.Python.addConstant(`maqueen-plus-V2`, `""" MaqueenPlusV2 robot """`);
    const code = Blockly.Python.robots_onRemoteCommandReceived_generator(block);
    Blockly.Python.addConstant('NEC_REMOTE_TYPE', "NEC_REMOTE_TYPE = 'basic_black'");
    Blockly.Python.addConstant('basic_black_NEC_buttons', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_BASIC_BLACK_BUTTONS);
    Blockly.Python.addFunction('remoteNEC_basicBlack_getButton', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_BASIC_BLACK_GET_BUTTON);
    return code;
};

Blockly.Python.robots_maqueenPlus_onRemoteCommandReceived_car_mp3_gray = function (block) {
    Blockly.Python.addConstant(`maqueen-plus-V2`, `""" MaqueenPlusV2 robot """`);
    const code = Blockly.Python.robots_onRemoteCommandReceived_generator(block);
    Blockly.Python.addConstant('NEC_REMOTE_TYPE', "NEC_REMOTE_TYPE = 'Car_mp3'");
    Blockly.Python.addConstant('car_mp3_gray_NEC_buttons', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_AR_MP3_GRAY_BUTTONS);
    Blockly.Python.addFunction('remoteNEC_Carmp3_gray_getButton', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_AR_MP3_GRAY_GET_BUTTON);
    return code;
};

Blockly.Python.robots_decodeMaqueenPlusIRreceiver = function () {
    return Blockly.Python.robots_decodeIRreceiver_generator();
};

Blockly.Python.robots_getMaqueenPlusIRcode = function () {
    return Blockly.Python.robots_getIRcode_generator();
};

// Maqueen Plus V3 - Line Finder

Blockly.Python.robots_maqueenPlusV3_setPatrolSpeed = function (block) {
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block, "3");
    return `maqueenplusv3.setPatrolSpeed(${speed})` + NEWLINE;
};

Blockly.Python.robots_maqueenPlusV3_setIntersectionRunMode = function (block) {
    const intersection = block.getFieldValue("INTERSECTION");
    const action = block.getFieldValue("RUN_MODE");
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block, "3");
    if (intersection == 'CROSSROADS') {
        return `maqueenplusv3.setIntersectionRunMode(maqueenplusv3.RUN['${action}'])` + NEWLINE;
    } else if (intersection == 'T_JUNCTION') {
        return `maqueenplusv3.setTjunctionRunMode(maqueenplusv3.RUN['${action}'])` + NEWLINE;
    }
};

Blockly.Python.robots_maqueenPlusV3_setLeftOrRightIntersectionRunMode = function (block) {
    const intersection = block.getFieldValue("INTERSECTION");
    const action = block.getFieldValue("RUN_MODE");
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block, "3");
    if (intersection == 'LEFT') {
        return `maqueenplusv3.setLeftOrStraightRunMode(maqueenplusv3.RUN['${action}'])` + NEWLINE;
    } else if (intersection == 'RIGHT') {
        return `maqueenplusv3.setRightOrStraightRunMode(maqueenplusv3.RUN['${action}'])` + NEWLINE;
    }
};

Blockly.Python.robots_maqueenPlusV3_setPatrollingState = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block, "3");
    return `maqueenplusv3.setPatrollingState(${state})` + NEWLINE;
};

Blockly.Python.robots_maqueenPlusV3_intersectionDetected = function (block) {
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block, "3");
    return ['maqueenplusv3.intersectionDetecting()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_maqueenPlusV3_intersectionDetectedIs = function (block) {
    const intersection = block.getFieldValue("INTERSECTION");
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block, "3");
    return [`maqueenplusv3.intersectionDetecting() is maqueenplusv3.INTERSECTION['${intersection}']`, Blockly.Python.ORDER_ATOMIC];
};

// Maqueen Plus V3 - PID

Blockly.Python.robots_maqueenPlusV3_runDistance = function (block) {
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block, "3");
    const dir = "maqueenplusv3.PID_DIR['" + block.getFieldValue("DIRECTION") + "']";
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE) || "0";
    let unit = "";
    if (block.getFieldValue("UNIT") == 'INCH') {
        unit = ", unit = 'inch'";
    }
    let wait = "";
    if (block.getFieldValue("WAIT") == 'NO') {
        wait = ", wait = False";
    }
    return "maqueenplusv3.runDistance(" + dir + ", " + distance + unit + wait + ")" + NEWLINE;
};

Blockly.Python.robots_maqueenPlusV3_turnWithAngle = function (block) {
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block, "3");
    const direction = "maqueenplusv3.PID_DIR['" + block.getFieldValue("DIRECTION") + "']";
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    let wait = "";
    if (block.getFieldValue("WAIT") == 'NO') {
        wait = ", wait = False";
    }
    return "maqueenplusv3.turnWithAngle(" + direction + ", " + angle + wait + ")" + NEWLINE;
};

Blockly.Python.robots_maqueenPlusV3_readRealTimeSpeed = function (block) {
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block, "3");
    const motor = block.getFieldValue("MOTOR");
    switch (block.getFieldValue("UNIT")) {
        case 'INCH_S':
            return [`maqueenplusv3.readRealTimeSpeed('${motor}', unit = maqueenplusv3.INCH_PER_SEC)`, Blockly.Python.ORDER_ATOMIC];
        case 'CM_S':
        default:
            return [`maqueenplusv3.readRealTimeSpeed('${motor}')`, Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.robots_maqueenPlusV3_stopPID = function (block) {
    Blockly.Python.ROBOTS_MAQUEEN_PLUS_INIT(block, "3");
    return "maqueenplusv3.pidControlStop()" + NEWLINE;
};

// Maqueen Plus V3 - LiDAR

Blockly.Python.ROBOTS_LIDAR_INIT = function (block) {
    const addr = block.getFieldValue("ADDR");
    Blockly.Python.addImport('matrixLidarDistanceSensor', IMPORT_DFROBOT_LIDAR_SENSOR);
    Blockly.Python.addInit('LiDAR', `LiDAR = matrixLidarDistanceSensor.DFRobot_matrixLidarDistanceSensor(${addr})`);
    Blockly.Python.addPowerOn('LiDAR', 'LiDAR.begin()');
};

Blockly.Python.robots_maqueenPlusV3_lidar_configMatrix = function (block) {
    Blockly.Python.ROBOTS_LIDAR_INIT(block);
    const type = block.getFieldValue("TYPE");
    Blockly.Python.addFunction('lidar_configMatrixData', FUNCTIONS_MICROBIT.DEF_LIDAR_CONFIG_MATRIX);
    return 'lidar_configMatrixData(LiDAR.' + type + ')' + NEWLINE;
};

Blockly.Python.robots_maqueenPlusV3_lidar_getData = function (block) {
    Blockly.Python.ROBOTS_LIDAR_INIT(block);
    const data = block.getFieldValue("DATA");
    if (data == "DISTANCES_MATRIX") {
        return ["LiDAR.get_all_distances()", Blockly.Python.ORDER_ATOMIC];
    } else if (data = "RAW_LIST") {
        return ["LiDAR.get_all_data()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.robots_maqueenPlusV3_lidar_getFixedPoint = function (block) {
    Blockly.Python.ROBOTS_LIDAR_INIT(block);
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || '0';
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || '0';
    return [`LiDAR.get_fixed_point_data(${x}, ${y})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_maqueenPlusV3_lidar_configAvoidance = function (block) {
    const wall_cm = Blockly.Python.valueToCode(block, "WALL", Blockly.Python.ORDER_NONE) || '0';
    return `LiDAR.config_avoidance(${wall_cm})` + NEWLINE;
};

Blockly.Python.robots_maqueenPlusV3_lidar_isSignalActivated = function (block) {
    Blockly.Python.ROBOTS_LIDAR_INIT(block);
    return [`LiDAR.get_emergency_flag()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_maqueenPlusV3_lidar_dirToFollow = function (block) {
    Blockly.Python.ROBOTS_LIDAR_INIT(block);
    return [`LiDAR.get_dir_to_avoid_obstacle()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_maqueenPlusV3_lidar_isDirToFollow = function (block) {
    Blockly.Python.ROBOTS_LIDAR_INIT(block);
    const dir = block.getFieldValue("DIR");
    return [`LiDAR.get_dir_to_avoid_obstacle() is LiDAR.${dir}`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_maqueenPlusV3_lidar_getObstacleDistance = function (block) {
    Blockly.Python.ROBOTS_LIDAR_INIT(block);
    const dir = block.getFieldValue("DIR");
    return [`LiDAR.get_obstacle_distance(LiDAR.${dir})`, Blockly.Python.ORDER_ATOMIC];
};

// Cutebot

Blockly.Python.robots_getCutebotUltrasonicRanger = function (block) {
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addImport('machine_pulse', IMPORT_MACHINE_PULSE_MS);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    Blockly.Python.addInit('pin8', "# Ultrasonic TRIG on pin8");
    Blockly.Python.addInit('pin12', "# Ultrasonic ECHO on pin12");
    Blockly.Python.addFunction('getUltrasonicData', FUNCTIONS_MICROBIT.DEF_GROVE_ULTRASONIC);
    return ["getUltrasonicData(pin8, pin12, '" + block.getFieldValue("DATA") + "')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_readCutebotPatrol = function (block) {
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    return ["cutebot.has_" + block.getFieldValue("DIR") + "_track()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_blinkCutebotRobot = function () {
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    Blockly.Python.addInit('neopixel_pin15', "# Neopixel on pin15");
    Blockly.Python.addInit('cutebot_neopixel', "npCutebot = neopixel.NeoPixel(pin15, 2)");
    Blockly.Python.addFunction('cutebot_blinkRobot', FUNCTIONS_MICROBIT.DEF_CUTEBOT_BLINK_ROBOT);
    return "cutebot_blinkRobot()" + NEWLINE;
};

Blockly.Python.robots_controlCutebotRGBLedPalette = function (block) {
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    return "cutebot.set_" + block.getFieldValue("LED") + "_rgb_led" + colour + NEWLINE;
};

Blockly.Python.robots_controlCutebotRGBLed = function (block) {
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    return "cutebot.set_" + block.getFieldValue("LED") + "_rgb_led(" + r + "," + g + "," + b + ")" + NEWLINE;
};

Blockly.Python.robots_setCutebotNeopixel = function (block) {
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addInit('neopixel_pin15', "# Neopixel on pin15");
    Blockly.Python.addInit('cutebot_neopixel', "npCutebot = neopixel.NeoPixel(pin15, 2)");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (block.getFieldValue("LED") == "all") {
        return "for i in range(2):" + NEWLINE + "  npCutebot[i] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npCutebot.show()" + NEWLINE;
    } else {
        return "npCutebot[" + block.getFieldValue("LED") + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npCutebot.show()" + NEWLINE;
    }
};

Blockly.Python.robots_setCutebotNeopixelPalette = function (block) {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    Blockly.Python.addInit('neopixel_pin15', "# Neopixel on pin15");
    Blockly.Python.addInit('cutebot_neopixel', "npCutebot = neopixel.NeoPixel(pin15, 2)");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    if (block.getFieldValue("LED") == "all") {
        return "for i in range(2):" + NEWLINE + "  npCutebot[i] = " + colour + NEWLINE + "npCutebot.show()" + NEWLINE;
    } else {
        return "npCutebot[" + block.getFieldValue("LED") + "] = " + colour + NEWLINE + "npCutebot.show()" + NEWLINE;
    }
};

Blockly.Python.robots_setCutebotGo = function (block) {
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 100) speed = 100;
    if (speed < 0) speed = 0;
    switch (block.getFieldValue("DIR")) {
        case "FORWARD":
            return "cutebot.set_motors_speed(" + speed + "," + speed + ")" + NEWLINE;
        case "BACKWARD":
            return "cutebot.set_motors_speed(-" + speed + ", -" + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_setCutebotTurn = function (block) {
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 100) speed = 100;
    if (speed < 0) speed = 0;
    switch (block.getFieldValue("DIR")) {
        case "RIGHT":
            return "cutebot.set_motors_speed(" + speed + ", -" + speed + ")" + NEWLINE;
        case "LEFT":
            return "cutebot.set_motors_speed(-" + speed + "," + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_setCutebotStop = function () {
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    return "cutebot.stop()" + NEWLINE;
};

Blockly.Python.robots_controlCutebotMotors = function (block) {
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    const dir = block.getFieldValue("DIR");
    const motor = (block.getFieldValue("MOTOR") === 'RIGHT' ? "cutebot.MOTOR_RIGHT" : "cutebot.MOTOR_LEFT");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    switch (dir) {
        case "CLOCKWISE":
            return "cutebot._set_motor_speed(" + motor + "," + speed + ")" + NEWLINE;
        case "ANTICLOCKWISE":
            return "cutebot._set_motor_speed(" + motor + ", -" + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_setCutebotServoAngle = function (block) {
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    const servo = block.getFieldValue("SERVO");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    switch (servo) {
        case "both":
            return "cutebot.set_servo_1_angle(" + angle + ")" + NEWLINE + "cutebot.set_servo_2_angle(" + angle + ")" + NEWLINE;
        default:
            return "cutebot.set_servo_" + servo + "_angle(" + angle + ")" + NEWLINE;
    }
};

Blockly.Python.robots_moveCutebotOneSquareForward = function () {
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    Blockly.Python.addFunction('convertSpeed_mps', FUNCTIONS_MICROBIT.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('cutebot_moveWithSquare', FUNCTIONS_MICROBIT.DEF_CUTEBOT_MOVE_WITH_SQUARE);
    return "cutebot_moveWithSquare(1, 'forward', 30)" + NEWLINE;
};

Blockly.Python.robots_moveCutebotOneSquareBackward = function () {
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    Blockly.Python.addFunction('convertSpeed_mps', FUNCTIONS_MICROBIT.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('cutebot_moveWithSquare', FUNCTIONS_MICROBIT.DEF_CUTEBOT_MOVE_WITH_SQUARE);
    return "cutebot_moveWithSquare(1, 'backward', 30)" + NEWLINE;
};

Blockly.Python.robots_turnCutebotLeft = function () {
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    Blockly.Python.addFunction('convertSpeed_mps', FUNCTIONS_MICROBIT.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('cutebot_turnAngle', FUNCTIONS_MICROBIT.DEF_CUTEBOT_TURN_ANGLE);
    return "cutebot_turnAngle(90, 20)" + NEWLINE;
};

Blockly.Python.robots_turnCutebotRight = function () {
    Blockly.Python.addImport('cutebot', IMPORT_CUTEBOT);
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    Blockly.Python.addFunction('convertSpeed_mps', FUNCTIONS_MICROBIT.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('cutebot_turnAngle', FUNCTIONS_MICROBIT.DEF_CUTEBOT_TURN_ANGLE);
    return "cutebot_turnAngle(-90, 20)" + NEWLINE;
};

Blockly.Python.robots_setCutebotBuzzer = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    Blockly.Python.addFunction('pitch', FUNCTIONS_MICROBIT.DEF_BUZZER_PITCH);
    Blockly.Python.addInit('buzzer_module_pin0', "# Cutebot Buzzer on pin0");
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    return "pitch(pin0, " + freq + ", " + time + ")" + NEWLINE;
};

Blockly.Python.robots_playCutebotMusic = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    Blockly.Python.addFunction('pitch', FUNCTIONS_MICROBIT.DEF_BUZZER_PITCH);
    Blockly.Python.addInit('buzzer_module_pin0', "# Cutebot Buzzer on pin0");
    switch (block.getFieldValue("MUSIC")) {
        case "GAMME":
            Blockly.Python.addFunction('BuzzerGamme', FUNCTIONS_MICROBIT.DEF_BUZZER_GAMME);
            return "BuzzerGamme(pin0)" + NEWLINE;
        case "SW":
            Blockly.Python.addFunction('BuzzerStarWars', FUNCTIONS_MICROBIT.DEF_BUZZER_STAR_WARS);
            return "BuzzerStarWars(pin0)" + NEWLINE;
        case "R2D2":
            Blockly.Python.addFunction('BuzzerR2D2', FUNCTIONS_MICROBIT.DEF_BUZZER_R2D2);
            return "BuzzerR2D2(pin0)" + NEWLINE;
        default:
            throw Error("Unhandled option (lists_getSublist)");
    }
};

Blockly.Python.robots_cutebot_onRemoteCommandReceived = function (block) {
    Blockly.Python.addConstant('cutebot-robot', '""" Cutebot robot """');
    const code = Blockly.Python.robots_onRemoteCommandReceived_generator(block);
    Blockly.Python.addConstant('NEC_REMOTE_TYPE', "NEC_REMOTE_TYPE = 'basic_black'");
    Blockly.Python.addConstant('basic_black_NEC_buttons', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_BASIC_BLACK_BUTTONS);
    Blockly.Python.addFunction('remoteNEC_basicBlack_getButton', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_BASIC_BLACK_GET_BUTTON);
    return code;
};

Blockly.Python.robots_cutebot_onRemoteCommandReceived_car_mp3_gray = function (block) {
    Blockly.Python.addConstant('cutebot-robot', '""" Cutebot robot """');
    const code = Blockly.Python.robots_onRemoteCommandReceived_generator(block);
    Blockly.Python.addConstant('NEC_REMOTE_TYPE', "NEC_REMOTE_TYPE = 'Car_mp3'");
    Blockly.Python.addConstant('car_mp3_gray_NEC_buttons', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_AR_MP3_GRAY_BUTTONS);
    Blockly.Python.addFunction('remoteNEC_Carmp3_gray_getButton', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_AR_MP3_GRAY_GET_BUTTON);
    return code;
};

Blockly.Python.robots_decodeCutebotIRreceiver = function () {
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    return Blockly.Python.robots_decodeIRreceiver_generator();
};

Blockly.Python.robots_getCutebotIRcode = function () {
    Blockly.Python.addConstant('cutebot-robot', "\"\"\" Cutebot robot \"\"\"");
    return Blockly.Python.robots_getIRcode_generator();
};

// Cutebot Pro

/**
 * This is not a block generator, it's util function used in all Cutebot Pro blocks.
 * Add CutebotPro init code.
 */
Blockly.Python.ROBOTS_CUTEBOTPRO_INIT = function () {
    Blockly.Python.addImport('cutebotpro', IMPORT_CUTEBOTPRO);
    Blockly.Python.addConstant('cutebotpro-robot', "\"\"\" Cutebot Pro robot \"\"\"");
    Blockly.Python.addInit('cutebotpro', "CutebotPro = CBP()");
};

// Cutebot Pro - Detection

Blockly.Python.robots_CutebotPro_getUltrasonicDistance = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const unit = block.getFieldValue("DATA");
    switch (unit) {
        case 'INCH':
            return ["CutebotPro.readUltrasonic(unit = 'inch')", Blockly.Python.ORDER_ATOMIC];
        case 'CM':
        default:
            return ["CutebotPro.readUltrasonic()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.robots_CutebotPro_getLineState = function () {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    return ["CutebotPro.getLineTrackerStates()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_CutebotPro_isSpecificState = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const state = block.getFieldValue("STATE");
    return ["CutebotPro.isLineTrackerState(" + state + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_CutebotPro_getLineOffset = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    switch (block.getFieldValue("UNIT")) {
        case 'INCH':
            return ["CutebotPro.getLineOffset(unit = 'inch')", Blockly.Python.ORDER_ATOMIC];
        case 'CM':
        default:
            return ["CutebotPro.getLineOffset()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.robots_CutebotPro_isSensorAboveLine = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    return ["CutebotPro.isSensorTrackingLine(" + block.getFieldValue("SENSOR") + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_getGrayscaleTrackingValue = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    return ["CutebotPro.getGrayscaleTrackingValue(" + block.getFieldValue("SENSOR") + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_CutebotPro_readVersion = function () {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    return ["CutebotPro.readVersion()", Blockly.Python.ORDER_ATOMIC];
};

// Cutebot Pro - Motors

Blockly.Python.robots_CutebotPro_setGo = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    switch (block.getFieldValue("DIR")) {
        case "FORWARD":
            return "CutebotPro.pwmCruiseControlMotor(CutebotPro.MOTOR_BOTH, " + speed + ")" + NEWLINE;
        case "BACKWARD":
            return "CutebotPro.pwmCruiseControlMotor(CutebotPro.MOTOR_BOTH, -" + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_CutebotPro_turn = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    switch (block.getFieldValue("DIR")) {
        case "RIGHT":
            return "CutebotPro.pwmCruiseControlMotor(CutebotPro.MOTOR_LEFT, " + speed + ")" + NEWLINE
                + "CutebotPro.pwmCruiseControlMotor(CutebotPro.MOTOR_RIGHT, -" + speed + ")" + NEWLINE;
        case "LEFT":
            return "CutebotPro.pwmCruiseControlMotor(CutebotPro.MOTOR_LEFT, -" + speed + ")" + NEWLINE
                + "CutebotPro.pwmCruiseControlMotor(CutebotPro.MOTOR_RIGHT, " + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_CutebotPro_stop = function () {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    return "CutebotPro.stopImmediately()" + NEWLINE;
};

Blockly.Python.robots_CutebotPro_controlMotors = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const dir = block.getFieldValue("DIR");
    const motor = "CutebotPro.MOTOR_" + block.getFieldValue("MOTOR");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    switch (dir) {
        case "CLOCKWISE":
            return "CutebotPro.pwmCruiseControlMotor(" + motor + ", " + speed + ")" + NEWLINE;
        case "ANTICLOCKWISE":
            return "CutebotPro.pwmCruiseControlMotor(" + motor + ", -" + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_CutebotPro_getMotorSpeed = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const motor = "CutebotPro.MOTOR_" + block.getFieldValue("MOTOR");
    switch (block.getFieldValue("UNIT")) {
        case 'INCH_S':
            return ["CutebotPro.readSpeed(" + motor + ", unit = CutebotPro.INCH_PER_SEC)", Blockly.Python.ORDER_ATOMIC];
        case 'CM_S':
        default:
            return ["CutebotPro.readSpeed(" + motor + ")", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.robots_CutebotPro_getAngularDistance = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const motor = "CutebotPro.MOTOR_" + block.getFieldValue("MOTOR");
    switch (block.getFieldValue("DATA")) {
        case 'PULSES':
            return ["CutebotPro.readWheelPulses(" + motor + ")", Blockly.Python.ORDER_ATOMIC];
        case 'ROTATIONS':
            Blockly.Python.addImport('math', IMPORT_MATH);
            return ["math.floor(CutebotPro.readAngularDistance(" + motor + ") / 360 * 100) / 100 ", Blockly.Python.ORDER_ATOMIC];
        case 'DEGREES':
        default:
            return ["CutebotPro.readAngularDistance(" + motor + ")", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.robots_CutebotPro_initializeAngularDistance = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const motor = "CutebotPro.MOTOR_" + block.getFieldValue("MOTOR");
    return "CutebotPro.clearWheelTurn(" + motor + ")" + NEWLINE;
};

// Cutebot Pro - RGB LED

Blockly.Python.robots_CutebotPro_controlHeadlightsPalette = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const led = "CutebotPro.LED_" + block.getFieldValue("LED");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    return "CutebotPro.controlHeadlights(" + led + ", " + colour + ")" + NEWLINE;
};

Blockly.Python.robots_CutebotPro_controlHeadlights = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const led = "CutebotPro.LED_" + block.getFieldValue("LED");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    return "CutebotPro.controlHeadlights(" + led + ", (" + r + ", " + g + ", " + b + "))" + NEWLINE;
};

Blockly.Python.robots_CutebotPro_switchOffHeadlights = function () {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    return "CutebotPro.turnOffHeadlights()" + NEWLINE;
};

Blockly.Python.robots_CutebotPro_setNeopixelPalette = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const led = "CutebotPro.LED_" + block.getFieldValue("LED");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    return "CutebotPro.setNeopixelColor(" + led + ", " + colour + ")" + NEWLINE;
};

Blockly.Python.robots_CutebotPro_setNeopixel = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const led = "CutebotPro.LED_" + block.getFieldValue("LED");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    return "CutebotPro.setNeopixelColor(" + led + ", (" + r + ", " + g + ", " + b + "))" + NEWLINE;
};

Blockly.Python.robots_CutebotPro_switchOffNeopixel = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const led = "CutebotPro.LED_" + block.getFieldValue("LED");
    return "CutebotPro.setNeopixelColor(" + led + ", (0, 0, 0))" + NEWLINE;
};

// Cutebot Pro - PID

Blockly.Python.robots_CutebotPro_runWithSpeed = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    switch (block.getFieldValue("UNIT")) {
        case 'INCH_S':
            switch (block.getFieldValue("DIR")) {
                case 'FORWARD':
                    return "CutebotPro.cruiseControl(" + speed + ", " + speed + ", unit = CutebotPro.INCH_PER_S)" + NEWLINE;
                case 'BACKWARD':
                    return "CutebotPro.cruiseControl(-" + speed + ", -" + speed + ", unit = CutebotPro.INCH_PER_S)" + NEWLINE;
            }
        case 'CM_S':
        default:
            switch (block.getFieldValue("DIR")) {
                case 'FORWARD':
                    return "CutebotPro.cruiseControl(" + speed + ", " + speed + ")" + NEWLINE;
                case 'BACKWARD':
                    return "CutebotPro.cruiseControl(-" + speed + ", -" + speed + ")" + NEWLINE;
            }
    }
};

Blockly.Python.robots_CutebotPro_setMotorsSpeed = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const speedL = Blockly.Python.valueToCode(block, "SPEED_L", Blockly.Python.ORDER_NONE) || "0";
    const speedR = Blockly.Python.valueToCode(block, "SPEED_R", Blockly.Python.ORDER_NONE) || "0";
    switch (block.getFieldValue("UNIT")) {
        case 'INCH_S':
            return "CutebotPro.cruiseControl(" + speedL + ", " + speedR + ", unit = CutebotPro.INCH_PER_S)" + NEWLINE;
        case 'CM_S':
        default:
            return "CutebotPro.cruiseControl(" + speedL + ", " + speedR + ")" + NEWLINE;
    }
};

Blockly.Python.robots_CutebotPro_runWithRadius = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const radius = Blockly.Python.valueToCode(block, "RADIUS", Blockly.Python.ORDER_NONE) || "0";
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    let unit = "";
    if (block.getFieldValue("UNIT") == 'INCH') {
        unit = ", unit = 'inch'";
    }
    switch (block.getFieldValue("DIR")) {
        case 'TO_LEFT':
            return "CutebotPro.turnWithRadius('to_left', " + radius + ", " + speed + unit + ")" + NEWLINE;
        case 'TO_RIGHT':
            return "CutebotPro.turnWithRadius('to_right', " + radius + ", " + speed + unit + ")" + NEWLINE;
    }
};

Blockly.Python.robots_CutebotPro_runDistance = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const dir = "CutebotPro.DIRECTION_" + block.getFieldValue("DIR");
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE) || "0";
    let unit = "";
    if (block.getFieldValue("UNIT") == 'INCH') {
        unit = ", unit = 'inch'";
    }
    let wait = "";
    if (block.getFieldValue("WAIT") == 'NO') {
        wait = ", wait = False";
    }
    return "CutebotPro.runDistance(" + dir + ", " + distance + unit + wait + ")" + NEWLINE;
};

Blockly.Python.robots_CutebotPro_defineSquare = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const size = Blockly.Python.valueToCode(block, "SIZE", Blockly.Python.ORDER_NONE) || "0";
    if (block.getFieldValue("UNIT") == 'INCH') {
        return "CutebotPro.setSquare(" + size + ", unit = 'inch')" + NEWLINE;
    }
    return "CutebotPro.setSquare(" + size + ")" + NEWLINE;
};

Blockly.Python.robots_CutebotPro_runSquare = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const n = Blockly.Python.valueToCode(block, "N", Blockly.Python.ORDER_NONE) || "0";
    const dir = "CutebotPro.DIRECTION_" + block.getFieldValue("DIR");
    let wait = "";
    if (block.getFieldValue("WAIT") == 'NO') {
        wait = ", wait = False";
    }
    return "CutebotPro.runSquare(" + n + ", " + dir + wait + ")" + NEWLINE;
};

Blockly.Python.robots_CutebotPro_turnWithAngle = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const direction = "CutebotPro.TURN_" + block.getFieldValue("DIRECTION");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    let wait = "";
    if (block.getFieldValue("WAIT") == 'NO') {
        wait = ", wait = False";
    }
    return "CutebotPro.turnWithAngle(" + direction + ", " + angle + wait + ")" + NEWLINE;
};

Blockly.Python.robots_CutebotPro_placeWithAngle = function (block) {
    return Blockly.Python.robots_CutebotPro_turnWithAngle(block);
};

Blockly.Python.robots_CutebotPro_turnWheel = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const wheel = "CutebotPro.MOTOR_" + block.getFieldValue("DIRECTION");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    let unit = "";
    if (block.getFieldValue("UNIT") == 'TR') {
        unit = ", unit = 'tr'";
    }
    let wait = "";
    if (block.getFieldValue("WAIT") == 'NO') {
        wait = ", wait = False";
    }
    return "CutebotPro.turnWheel(" + wheel + ", " + angle + unit + wait + ")" + NEWLINE;
};

// Cutebot Pro - Servomotors

Blockly.Python.robots_CutebotPro_setServoAngle = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const index = block.getFieldValue("SERVO");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    if (index == 'ALL') {
        return "for servo in range(4):" + NEWLINE
            + "  CutebotPro.controlServo(servo + 1, " + angle + ")" + NEWLINE;
    }
    return "CutebotPro.controlServo(" + index + ", " + angle + ")" + NEWLINE;
};

Blockly.Python.robots_CutebotPro_setServoSpeed = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    const index = block.getFieldValue("SERVO");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (block.getFieldValue("DIR") == 'ANTICLOCKWISE') {
        speed = "-" + speed
    }
    if (index == 'ALL') {
        return "for servo in range(4):" + NEWLINE
            + "  CutebotPro.controlContinuousServo(servo + 1, " + speed + ")" + NEWLINE;
    }
    return "CutebotPro.controlContinuousServo(" + index + ", " + speed + ")" + NEWLINE;
};

// Cutebot Pro - Extended motor (M port)

Blockly.Python.robots_CutebotPro_setExtendedMotorSpeed = function (block) {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (block.getFieldValue("DIR") == 'ANTICLOCKWISE') {
        speed = "-" + speed
    }
    return "CutebotPro.controlExtendedMotor(" + speed + ")" + NEWLINE;
};

Blockly.Python.robots_CutebotPro_stopExtendedMotor = function () {
    Blockly.Python.ROBOTS_CUTEBOTPRO_INIT();
    return "CutebotPro.stopExtendedMotor()" + NEWLINE;
};

// Cutebot Pro - Remote control

Blockly.Python.robots_CutebotPro_onRemoteCommandReceived = function (block) {
    Blockly.Python.addConstant('cutebotpro-robot', '""" Cutebot Pro robot """');
    const code = Blockly.Python.robots_onRemoteCommandReceived_generator(block);
    Blockly.Python.addConstant('NEC_REMOTE_TYPE', "NEC_REMOTE_TYPE = 'basic_black'");
    Blockly.Python.addConstant('basic_black_NEC_buttons', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_BASIC_BLACK_BUTTONS);
    Blockly.Python.addFunction('remoteNEC_basicBlack_getButton', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_BASIC_BLACK_GET_BUTTON);
    return code;
};

Blockly.Python.robots_CutebotPro_onRemoteCommandReceived_car_mp3_gray = function (block) {
    Blockly.Python.addConstant('cutebotpro-robot', '""" Cutebot Pro robot """');
    const code = Blockly.Python.robots_onRemoteCommandReceived_generator(block);
    Blockly.Python.addConstant('NEC_REMOTE_TYPE', "NEC_REMOTE_TYPE = 'Car_mp3'");
    Blockly.Python.addConstant('car_mp3_gray_NEC_buttons', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_AR_MP3_GRAY_BUTTONS);
    Blockly.Python.addFunction('remoteNEC_Carmp3_gray_getButton', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_AR_MP3_GRAY_GET_BUTTON);
    return code;
};

Blockly.Python.robots_CutebotPro_decodeIRreceiver = function () {
    Blockly.Python.addConstant('cutebotpro-robot', "\"\"\" Cutebot Pro robot \"\"\"");
    return Blockly.Python.robots_decodeIRreceiver_generator();
};

Blockly.Python.robots_CutebotPro_getIRcode = function () {
    Blockly.Python.addConstant('cutebotpro-robot', "\"\"\" Cutebot Pro robot \"\"\"");
    return Blockly.Python.robots_getIRcode_generator();
};

// Kitrobot

Blockly.Python.robots_getKitrobotUltrasonicRanger = function (block) {
    Blockly.Python.addImport('machine_pulse', IMPORT_MACHINE_PULSE_MS);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    Blockly.Python.addInit('pin8', "# Ultrasonic on pin8");
    Blockly.Python.addFunction('getUltrasonicData', FUNCTIONS_MICROBIT.DEF_GROVE_ULTRASONIC);
    return ["getUltrasonicData(pin8, pin8, '" + block.getFieldValue("DATA") + "')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_setKitrobotGo = function (block) {
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    Blockly.Python.addFunction('setKitrobotServoSpeed', FUNCTIONS_MICROBIT.DEF_KITROBOT_SERVO_SET_SPEED);
    Blockly.Python.addFunction('kitrobotMove', FUNCTIONS_MICROBIT.DEF_KITROBOT_MOVE);
    const dir = block.getFieldValue("DIR");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 100) speed = 100;
    if (speed < 0) speed = 0;
    return `kitrobotMove(${dir}, ${speed})` + NEWLINE;
};

Blockly.Python.robots_rotateKitrobot = function (block) {
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    Blockly.Python.addFunction('setKitrobotServoSpeed', FUNCTIONS_MICROBIT.DEF_KITROBOT_SERVO_SET_SPEED);
    Blockly.Python.addFunction('kitrobotRotate', FUNCTIONS_MICROBIT.DEF_KITROBOT_ROTATE);
    const dir = block.getFieldValue("DIR");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    return `kitrobotRotate("${dir}", ${speed})` + NEWLINE;
};

Blockly.Python.robots_controlKitrobotMotor = function (block) {
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    Blockly.Python.addFunction('setKitrobotServoSpeed', FUNCTIONS_MICROBIT.DEF_KITROBOT_SERVO_SET_SPEED);
    const dir = block.getFieldValue("DIR");
    const motor = block.getFieldValue("MOTOR");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 100) speed = 100;
    if (speed < 0) speed = 0;
    if (motor === 'pin0') return `setKitrobotServoSpeed(${motor}, ${-(dir)}, ${speed})` + NEWLINE;
    return `setKitrobotServoSpeed(${motor}, ${dir}, ${speed})` + NEWLINE;
};

Blockly.Python.robots_stopKitrobotMotors = function (block) {
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    Blockly.Python.addFunction('setKitrobotServoSpeed', FUNCTIONS_MICROBIT.DEF_KITROBOT_SERVO_SET_SPEED);
    const motor = block.getFieldValue("MOTOR");
    if (motor == "both") {
        Blockly.Python.addFunction('kitrobotMove', FUNCTIONS_MICROBIT.DEF_KITROBOT_MOVE);
        return `kitrobotMove(1, 0)` + NEWLINE;
    } else {
        return `setKitrobotServoSpeed(${motor}, 1, 0)` + NEWLINE;
    }
};

Blockly.Python.robots_kitrobotMoveOneSquareForward = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    Blockly.Python.addFunction('setKitrobotServoSpeed', FUNCTIONS_MICROBIT.DEF_KITROBOT_SERVO_SET_SPEED);
    Blockly.Python.addFunction('kitrobotMove', FUNCTIONS_MICROBIT.DEF_KITROBOT_MOVE);
    Blockly.Python.addFunction('convertSpeed_mps', FUNCTIONS_MICROBIT.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('kitrobot_moveWithSquare', FUNCTIONS_MICROBIT.DEF_KITROBOT_MOVE_WITH_SQUARE);
    return "kitrobot_moveWithSquare(1, 1, 30)" + NEWLINE;
};

Blockly.Python.robots_kitrobotMoveOneSquareBackward = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    Blockly.Python.addFunction('setKitrobotServoSpeed', FUNCTIONS_MICROBIT.DEF_KITROBOT_SERVO_SET_SPEED);
    Blockly.Python.addFunction('kitrobotMove', FUNCTIONS_MICROBIT.DEF_KITROBOT_MOVE);
    Blockly.Python.addFunction('convertSpeed_mps', FUNCTIONS_MICROBIT.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('kitrobot_moveWithSquare', FUNCTIONS_MICROBIT.DEF_KITROBOT_MOVE_WITH_SQUARE);
    return "kitrobot_moveWithSquare(1, -1, 30)" + NEWLINE;
};

Blockly.Python.robots_kitrobotTurnLeft = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    Blockly.Python.addFunction('setKitrobotServoSpeed', FUNCTIONS_MICROBIT.DEF_KITROBOT_SERVO_SET_SPEED);
    Blockly.Python.addFunction('kitrobotMove', FUNCTIONS_MICROBIT.DEF_KITROBOT_MOVE);
    Blockly.Python.addFunction('kitrobotRotate', FUNCTIONS_MICROBIT.DEF_KITROBOT_ROTATE);
    Blockly.Python.addFunction('convertSpeed_mps', FUNCTIONS_MICROBIT.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('kitrobot_turnAngle', FUNCTIONS_MICROBIT.DEF_KITROBOT_TURN_ANGLE);
    return "kitrobot_turnAngle(90, 30)" + NEWLINE;
};

Blockly.Python.robots_kitrobotTurnRight = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    Blockly.Python.addFunction('setKitrobotServoSpeed', FUNCTIONS_MICROBIT.DEF_KITROBOT_SERVO_SET_SPEED);
    Blockly.Python.addFunction('kitrobotMove', FUNCTIONS_MICROBIT.DEF_KITROBOT_MOVE);
    Blockly.Python.addFunction('kitrobotRotate', FUNCTIONS_MICROBIT.DEF_KITROBOT_ROTATE);
    Blockly.Python.addFunction('convertSpeed_mps', FUNCTIONS_MICROBIT.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('kitrobot_turnAngle', FUNCTIONS_MICROBIT.DEF_KITROBOT_TURN_ANGLE);
    return "kitrobot_turnAngle(-90, 30)" + NEWLINE;
};

Blockly.Python.robots_kitrobotStopRobot = function () {
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    Blockly.Python.addFunction('setKitrobotServoSpeed', FUNCTIONS_MICROBIT.DEF_KITROBOT_SERVO_SET_SPEED);
    Blockly.Python.addFunction('kitrobotMove', FUNCTIONS_MICROBIT.DEF_KITROBOT_MOVE);
    return `kitrobotMove(1, 0)` + NEWLINE;
};

Blockly.Python.robots_kitrobotBlinkRobot = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addInit('neopixel_pin13', "# Neopixel on pin13");
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    Blockly.Python.addInit('kitrobot_neopixel', "npKitrobot = neopixel.NeoPixel(pin13, 4)");
    Blockly.Python.addFunction('kitrobot_blinkRobot', FUNCTIONS_MICROBIT.DEF_KITROBOT_BLINK_ROBOT);
    return "kitrobot_blinkRobot()" + NEWLINE;
}

Blockly.Python.robots_readKitrobotPatrol = function (block) {
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    return [block.getFieldValue("PIN") + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_setKitrobotNeopixel = function (block) {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    Blockly.Python.addInit('neopixel_pin13', "# Neopixel on pin13");
    Blockly.Python.addInit('kitrobot_neopixel', "npKitrobot = neopixel.NeoPixel(pin15, 4)");
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
        return "for i in range(4):" + NEWLINE + "  npKitrobot [i] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npKitrobot .show()" + NEWLINE;
    } else {
        return "npKitrobot [" + block.getFieldValue("LED") + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npKitrobot .show()" + NEWLINE;
    }
};

Blockly.Python.robots_setKitrobotNeopixelPalette = function (block) {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    Blockly.Python.addInit('neopixel_pin13', "# Neopixel on pin13");
    Blockly.Python.addInit('kitrobot_neopixel', "npKitrobot  = neopixel.NeoPixel(pin13, 4)");
    const led = block.getFieldValue("LED");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    if (led == "all") {
        return "for i in range(4):" + NEWLINE + "  npKitrobot [i] = " + colour + NEWLINE + "npKitrobot.show()" + NEWLINE;
    } else {
        return "npKitrobot [" + led + "] = " + colour + NEWLINE + "npKitrobot.show()" + NEWLINE;
    }
};

Blockly.Python.robots_setKitrobotRainbow = function () {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    Blockly.Python.addInit('neopixel_pin13', "# Neopixel on pin13");
    Blockly.Python.addInit('kitrobot_neopixel', "npKitrobot  = neopixel.NeoPixel(pin13, 4)");
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(npKitrobot, 4)" + NEWLINE;
};

Blockly.Python.robots_setKitrobotBuzzer = function (block) {
    Blockly.Python.addConstant('kitrobot-robot', "\"\"\" Kitrobot robot \"\"\"");
    let freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    let duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('music', IMPORT_MUSIC);
    return "music.pitch(" + freq + ", duration=" + duration + ")" + NEWLINE;
};

// Codo

Blockly.Python.robots_setCodoGo = function (block) {
    Blockly.Python.addFunction('codo_controlLeftMotor', FUNCTIONS_MICROBIT.DEF_CODO_CONTROL_LEFT_MOTOR);
    Blockly.Python.addFunction('codo_controlRightMotor', FUNCTIONS_MICROBIT.DEF_CODO_CONTROL_RIGHT_MOTOR);
    Blockly.Python.addFunction('codo_move', FUNCTIONS_MICROBIT.DEF_CODO_MOVE);
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
    Blockly.Python.addFunction('codo_controlLeftMotor', FUNCTIONS_MICROBIT.DEF_CODO_CONTROL_LEFT_MOTOR);
    Blockly.Python.addFunction('codo_controlRightMotor', FUNCTIONS_MICROBIT.DEF_CODO_CONTROL_RIGHT_MOTOR);
    Blockly.Python.addFunction('codo_move', FUNCTIONS_MICROBIT.DEF_CODO_MOVE);
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    switch (block.getFieldValue("DIR")) {
        case "RIGHT":
            return "codo_move('right', " + speed + ")" + NEWLINE;
        case "LEFT":
            return "codo_move('left', " + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_setCodoStop = function () {
    Blockly.Python.addFunction('codo_controlLeftMotor', FUNCTIONS_MICROBIT.DEF_CODO_CONTROL_LEFT_MOTOR);
    Blockly.Python.addFunction('codo_controlRightMotor', FUNCTIONS_MICROBIT.DEF_CODO_CONTROL_RIGHT_MOTOR);
    Blockly.Python.addFunction('codo_move', FUNCTIONS_MICROBIT.DEF_CODO_MOVE);
    return "codo_move('stop')" + NEWLINE;
};

Blockly.Python.robots_controlCodoMotors = function (block) {
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    const dir = block.getFieldValue("DIR");
    switch (block.getFieldValue("MOTOR")) {
        case "RIGHT":
            Blockly.Python.addFunction('codo_controlRightMotor', FUNCTIONS_MICROBIT.DEF_CODO_CONTROL_RIGHT_MOTOR);
            switch (dir) {
                case "CLOCKWISE":
                    return "codo_controlRightMotor([0, 1], " + speed + ")" + NEWLINE;
                case "ANTICLOCKWISE":
                    return "codo_controlRightMotor([1, 0], " + speed + ")" + NEWLINE;
            }
        case "LEFT":
            Blockly.Python.addFunction('codo_controlLeftMotor', FUNCTIONS_MICROBIT.DEF_CODO_CONTROL_LEFT_MOTOR);
            switch (dir) {
                case "CLOCKWISE":
                    return "codo_controlLeftMotor([1, 0], " + speed + ")" + NEWLINE;
                case "ANTICLOCKWISE":
                    return "codo_controlLeftMotor([0, 1], " + speed + ")" + NEWLINE;
            }
    }
};

// Oobybot

Blockly.Python.robots_controlOobybotLed = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pin = block.getFieldValue("PIN");
    return pin + ".write_digital(" + state + ")" + NEWLINE;
};

Blockly.Python.robots_setOobybotGo = function (block) {
    Blockly.Python.addConstant('oobybot-robot', "\"\"\" Oobybot robot \"\"\"");
    Blockly.Python.addFunction('oobybot_controlMotors', FUNCTIONS_MICROBIT.DEF_OOBYBOT_CONTROL_MOTORS);
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 100) speed = 100;
    if (speed < 0) speed = 0;
    switch (block.getFieldValue("DIR")) {
        case "forward":
            return "oobybot_controlMotors(" + 'pin1' + "," + '1' + "," + speed + ")" + NEWLINE + "oobybot_controlMotors(" + 'pin2' + "," + '1' + "," + speed + ")" + NEWLINE;
        case "backward":
            return "oobybot_controlMotors(" + 'pin1' + "," + '-1' + "," + speed + ")" + NEWLINE + "oobybot_controlMotors(" + 'pin2' + "," + '-1' + "," + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_setOobybotTurn = function (block) {
    Blockly.Python.addConstant('oobybot-robot', "\"\"\" Oobybot robot \"\"\"");
    Blockly.Python.addFunction('oobybot_controlMotors', FUNCTIONS_MICROBIT.DEF_OOBYBOT_CONTROL_MOTORS);
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    switch (block.getFieldValue("DIR")) {
        case "RIGHT":
            return "oobybot_controlMotors(" + 'pin2' + "," + '1' + "," + speed + ")" + NEWLINE + "oobybot_controlMotors(" + 'pin1' + "," + '-1' + "," + speed + ")" + NEWLINE
        case "LEFT":
            return "oobybot_controlMotors(" + 'pin1' + "," + '1' + "," + speed + ")" + NEWLINE + "oobybot_controlMotors(" + 'pin2' + "," + '-1' + "," + speed + ")" + NEWLINE
    }
};

Blockly.Python.robots_setOobybotStop = function () {
    Blockly.Python.addConstant('oobybot-robot', "\"\"\" Oobybot robot \"\"\"");
    Blockly.Python.addFunction('oobybot_controlMotors', FUNCTIONS_MICROBIT.DEF_OOBYBOT_CONTROL_MOTORS);
    return "oobybot_controlMotors(" + 'pin1' + "," + '1' + "," + '0' + ")" + NEWLINE + "oobybot_controlMotors(" + 'pin2' + "," + '1' + "," + '0' + ")" + NEWLINE;
};

Blockly.Python.robots_controlOobybotMotors = function (block) {
    Blockly.Python.addConstant('oobybot-robot', "\"\"\" Oobybot robot \"\"\"");
    Blockly.Python.addFunction('oobybot_controlMotors', FUNCTIONS_MICROBIT.DEF_OOBYBOT_CONTROL_MOTORS);
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    const dir = block.getFieldValue("DIR");
    switch (block.getFieldValue("MOTOR")) {
        case "RIGHT":
            switch (dir) {
                case "CLOCKWISE":
                    return "oobybot_controlMotors(" + 'pin1' + "," + '1' + "," + speed + ")" + NEWLINE;
                case "ANTICLOCKWISE":
                    return "oobybot_controlMotors(" + 'pin1' + "," + '-1' + "," + speed + ")" + NEWLINE;
            }
        case "LEFT":
            switch (dir) {
                case "CLOCKWISE":
                    return "oobybot_controlMotors(" + 'pin2' + "," + '1' + "," + speed + ")" + NEWLINE;
                case "ANTICLOCKWISE":
                    return "oobybot_controlMotors(" + 'pin2' + "," + '-1' + "," + speed + ")" + NEWLINE;
            }
    }
};

// Buggy
Blockly.Python.robots_initializeBuggy = function () {
    Blockly.Python.addImport('buggy', IMPORT_BUGGY_MOVE);
    Blockly.Python.addInit('buggy', 'buggy=MOVEmotor()');
};

Blockly.Python.robots_setBuggyGo = function (block) {
    Blockly.Python.robots_initializeBuggy();
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
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
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
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
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    const dir = block.getFieldValue("DIR");
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
    Blockly.Python.addFunction('bitbot_readLightSensor', FUNCTIONS_MICROBIT.DEF_BITBOT_LIGHT_SENSOR);
    return ["bitbot_readLightSensor(" + block.getFieldValue("RL") + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_readBitBotPatrol = function (block) {
    return [block.getFieldValue("PIN") + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_setBitbotGo = function (block) {
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 1023) speed = 1023;
    if (speed < 0) speed = 0;
    Blockly.Python.addInit('bitbot', '# Bitbot');
    Blockly.Python.addFunction('bitbot_controlMotors', FUNCTIONS_MICROBIT.DEF_BITBOT_GO);
    return "bitbot_controlMotors(" + block.getFieldValue("DIR") + ", " + speed + ")" + NEWLINE;
};

Blockly.Python.robots_controlBitBotMotor = function (block) {
    const pins = block.getFieldValue("MOTOR").split("/");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 1023) speed = 1023;
    if (speed < 0) speed = 0;
    Blockly.Python.addInit('bitbot', '# Bitbot');
    return pins[0] + ".write_analog(" + speed + ")" + NEWLINE + pins[1] + ".write_digital(" + block.getFieldValue("DIR") + ")" + NEWLINE;
};

Blockly.Python.robots_stopBitBotMotors = function (block) {
    Blockly.Python.addInit('bitbot', '# Bitbot');
    if (block.getFieldValue("MOTOR") == "all") {
        Blockly.Python.addFunction('bitbot_controlMotors', FUNCTIONS_MICROBIT.DEF_BITBOT_GO);
        return "bitbot_controlMotors(0, 0)" + NEWLINE;
    } else {
        const pins = block.getFieldValue("MOTOR").split("/");
        return pins[0] + ".write_analog(0)" + NEWLINE + pins[1] + ".write_digital(0)" + NEWLINE;
    }
};

Blockly.Python.robots_setBitBotNeopixel = function (block) {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addInit('neopixel_pin13', "# Neopixel on pin13");
    Blockly.Python.addInit('bitbot_neopixel', "npBot = neopixel.NeoPixel(pin13, 12)");
    let r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    let g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    let b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    let l = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
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
    const led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addInit('neopixel_pin13', "# Neopixel on pin13");
    Blockly.Python.addInit('bitbot_neopixel', "npBot = neopixel.NeoPixel(pin13, 12)");
    return "npBot[" + led + "] = " + colour + NEWLINE + "npBot.show()" + NEWLINE;
};

Blockly.Python.robots_setBitBotRainbow = function () {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addInit('neopixel_pin13', "# Neopixel on pin13");
    Blockly.Python.addInit('bitbot_neopixel', "npBot = neopixel.NeoPixel(pin13, 12)");
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(npBot, 12)" + NEWLINE;
};

// BitPlayer
Blockly.Python.robots_onBitPlayerButtonEvent = function (block) {
    Blockly.Python.addInit('bitplayer', '# BitPlayer');
    const button = block.getFieldValue("BUTTON");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    switch (block.getFieldValue("STATE")) {
        case "PRESSED":
            if (button === "button_a" || button === "button_b") {
                return "if " + button + ".is_pressed():" + NEWLINE + branchCode;
            } else {
                Blockly.Python.addPowerOn('set_pull_' + button, button + ".set_pull(" + button + ".PULL_UP)")
                return "if not " + button + ".read_digital():" + NEWLINE + branchCode;
            }
        case "RELEASED":
            if (button === "button_a" || button === "button_b") {
                return "if " + button + ".was_pressed():" + NEWLINE + branchCode;
            } else {
                Blockly.Python.addPowerOn('set_pull_' + button, button + ".set_pull(" + button + ".PULL_UP)")
                return "if " + button + ".read_digital():" + NEWLINE + branchCode;
            }
        default:
            throw Error('Invalid state for bitplayer button: ' + block.getFieldValue("STATE"));
    }
};

Blockly.Python.robots_getBitPlayerJoystick = function (block) {
    Blockly.Python.addInit('bitplayer', '# BitPlayer');
    const axis = block.getFieldValue("AXIS");
    return [`${axis}.read_analog()`, Blockly.Python.ORDER_ATOMIC];
};

// Gamepad v4

Blockly.Python.robots_onGamepadV4ButtonEvent = function (block) {
    Blockly.Python.addInit('gamepad_v4', '# Gamepad v4');
    const button = block.getFieldValue("BUTTON");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    switch (block.getFieldValue("STATE")) {
        case "PRESSED":
            if (button === "button_a" || button === "button_b") {
                return "if " + button + ".is_pressed():" + NEWLINE + branchCode;
            } else {
                Blockly.Python.addPowerOn('set_pull_' + button, button + ".set_pull(" + button + ".PULL_UP)")
                return "if not " + button + ".read_digital():" + NEWLINE + branchCode;
            }
        case "RELEASED":
            if (button === "button_a" || button === "button_b") {
                return "if " + button + ".was_pressed():" + NEWLINE + branchCode;
            } else {
                Blockly.Python.addPowerOn('set_pull_' + button, button + ".set_pull(" + button + ".PULL_UP)")
                return "if " + button + ".read_digital():" + NEWLINE + branchCode;
            }
        default:
            throw Error('Invalid state for gamepad button: ' + block.getFieldValue("STATE"));
    }
};

Blockly.Python.robots_getGamepadV4Joystick = function (block) {
    const axis = block.getFieldValue("AXIS");
    Blockly.Python.addInit('gamepad_v4', '# Gamepad v4');
    return [`${axis}.read_analog()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_setGamepadV4LEDMotor = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('gamepad_v4', '# Gamepad v4');
    return "pin12.write_digital(" + state + ")" + NEWLINE;
};

// Gamepad 

Blockly.Python.robots_setGamepadLED = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('gamepad', '# Gamepad');
    return "pin16.write_digital(" + state + ")" + NEWLINE;
};

Blockly.Python.robots_setGamepadMotorVibration = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('gamepad', '# Gamepad');
    return "pin12.write_digital(" + state + ")" + NEWLINE;
};

Blockly.Python.robots_setGamepadBuzzerFreq = function (block) {
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('gamepad', '# Gamepad');
    Blockly.Python.addFunction('pitch', FUNCTIONS_MICROBIT.DEF_BUZZER_PITCH);
    return "pitch(pin0, " + freq + ", " + time + ")" + NEWLINE;
};

Blockly.Python.robots_playGamepadMusic = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('gamepad', '# Gamepad');
    Blockly.Python.addFunction('pitch', FUNCTIONS_MICROBIT.DEF_BUZZER_PITCH);
    switch (block.getFieldValue("MUSIC")) {
        case "GAMME":
            Blockly.Python.addFunction('BuzzerGamme', FUNCTIONS_MICROBIT.DEF_BUZZER_GAMME);
            return "BuzzerGamme(pin0)" + NEWLINE;
        case "SW":
            Blockly.Python.addFunction('BuzzerStarWars', FUNCTIONS_MICROBIT.DEF_BUZZER_STAR_WARS);
            return "BuzzerStarWars(pin0)" + NEWLINE;
        case "R2D2":
            Blockly.Python.addFunction('BuzzerR2D2', FUNCTIONS_MICROBIT.DEF_BUZZER_R2D2);
            return "BuzzerR2D2(pin0)" + NEWLINE;
        default:
            throw Error("Invalid music option: '" + block.getFieldValue("STATE") + "'");
    }
};

Blockly.Python.robots_onGamepadButtonEvent = function (block) {
    const button = block.getFieldValue("BUTTON");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
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

// BitCar
Blockly.Python.robots_getBitCarUltrasonicRanger = function (block) {
    Blockly.Python.addImport('machine_pulse', IMPORT_MACHINE_PULSE_MS);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('bitcar-robot', "\"\"\" BitCar robot \"\"\"");
    Blockly.Python.addInit('pin', "# Ultrasonic on pin12");
    Blockly.Python.addFunction('getUltrasonicData', FUNCTIONS_MICROBIT.DEF_GROVE_ULTRASONIC);
    return ["getUltrasonicData(pin12, pin12, '" + block.getFieldValue("DATA") + "')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_readBitCarPatrol = function (block) {
    Blockly.Python.addConstant('bitcar-robot', "\"\"\" BitCar robot \"\"\"");
    return [block.getFieldValue("PIN") + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_setBitCarGo = function (block) {
    Blockly.Python.addFunction('map', FUNCTIONS.DEF_PYTHON_MAP);
    Blockly.Python.addFunction('bitcar-servo-speed', FUNCTIONS_MICROBIT.DEF_BITCAR_SERVO_SPEED);
    Blockly.Python.addFunction('bitcar-move', FUNCTIONS_MICROBIT.DEF_BITCAR_MOVE);
    Blockly.Python.addConstant('bitcar-robot', "\"\"\" BitCar robot \"\"\"");
    const dir = block.getFieldValue("DIR");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    return `bitCarMove(${dir}, ${speed})` + NEWLINE;
};

Blockly.Python.robots_rotateBitCar = function (block) {
    Blockly.Python.addFunction('map', FUNCTIONS.DEF_PYTHON_MAP);
    Blockly.Python.addFunction('bitcar-servo-speed', FUNCTIONS_MICROBIT.DEF_BITCAR_SERVO_SPEED);
    Blockly.Python.addFunction('bitcar-rotate', FUNCTIONS_MICROBIT.DEF_BITCAR_ROTATE);
    Blockly.Python.addConstant('bitcar-robot', "\"\"\" BitCar robot \"\"\"");
    const dir = block.getFieldValue("DIR");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    return `bitCarRotate(${dir}, ${speed})` + NEWLINE;
};

Blockly.Python.robots_controlBitCarMotor = function (block) {
    Blockly.Python.addFunction('map', FUNCTIONS.DEF_PYTHON_MAP);
    Blockly.Python.addFunction('bitcar-servo-speed', FUNCTIONS_MICROBIT.DEF_BITCAR_SERVO_SPEED);
    Blockly.Python.addConstant('bitcar-robot', "\"\"\" BitCar robot \"\"\"");
    const dir = block.getFieldValue("DIR");
    const motor = block.getFieldValue("MOTOR");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    switch (motor) {
        case 'L':
            return `setBitCarServoSpeed(pin13, pin14, ${dir}, ${speed})` + NEWLINE;
        case 'R':
            return `setBitCarServoSpeed(pin15, pin16, ${-dir}, ${speed})` + NEWLINE;
    }
};

Blockly.Python.robots_stopBitCarMotors = function (block) {
    Blockly.Python.addFunction('map', FUNCTIONS.DEF_PYTHON_MAP);
    Blockly.Python.addFunction('bitcar-servo-speed', FUNCTIONS_MICROBIT.DEF_BITCAR_SERVO_SPEED);
    Blockly.Python.addConstant('bitcar-robot', "\"\"\" BitCar robot \"\"\"");
    const motor = block.getFieldValue("MOTOR");
    switch (motor) {
        case 'L':
            return `setBitCarServoSpeed(pin13, pin14, 1, 0)` + NEWLINE;
        case 'R':
            return `setBitCarServoSpeed(pin15, pin16, 1, 0)` + NEWLINE;
        case 'both':
            return `setBitCarServoSpeed(pin13, pin14, 1, 0)` + NEWLINE + `setBitCarServoSpeed(pin15, pin16, 1, 0)` + NEWLINE;
    }
};

Blockly.Python.robots_setBitCarNeopixel = function (block) {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('bitcar-robot', "\"\"\" BitCar robot \"\"\"");
    Blockly.Python.addInit('neopixel_pin8', "# Neopixel on pin8");
    Blockly.Python.addInit('bitcar_neopixel', "npBitCar = neopixel.NeoPixel(pin8, 4)");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (block.getFieldValue("LED") == "all") {
        return "for i in range(4):" + NEWLINE + "  npBitCar[i] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npMaq.show()" + NEWLINE;
    } else {
        return "npBitCar[" + block.getFieldValue("LED") + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npMaq.show()" + NEWLINE;
    }
};

Blockly.Python.robots_setBitCarNeopixelPalette = function (block) {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('bitcar-robot', "\"\"\" BitCar robot \"\"\"");
    Blockly.Python.addInit('neopixel_pin8', "# Neopixel on pin8");
    Blockly.Python.addInit('bitcar_neopixel', "npBitCar = neopixel.NeoPixel(pin8, 4)");
    const led = block.getFieldValue("LED");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    if (led == "all") {
        return "for i in range(4):" + NEWLINE + "  npBitCar[i] = " + colour + NEWLINE + "npMaq.show()" + NEWLINE;
    } else {
        return "npBitCar[" + led + "] = " + colour + NEWLINE + "npBitCar.show()" + NEWLINE;
    }
};

Blockly.Python.robots_setBitCarRainbow = function () {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('bitcar-robot', "\"\"\" BitCar robot \"\"\"");
    Blockly.Python.addInit('neopixel_pin8', "# Neopixel on pin8");
    Blockly.Python.addInit('bitcar_neopixel', "npBitCar = neopixel.NeoPixel(pin8, 4)");
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(npBitCar, 4)" + NEWLINE;
};

Blockly.Python.robots_setBitCarBuzzer = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('bitcar-robot', "\"\"\" BitCar robot \"\"\"");
    Blockly.Python.addFunction('pitch', FUNCTIONS_MICROBIT.DEF_BUZZER_PITCH);
    Blockly.Python.addInit('buzzer_module_pin0', "# BitCar Buzzer on pin0");
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    return "pitch(pin0, " + freq + ", " + time + ")" + NEWLINE;
};

Blockly.Python.robots_bitcar_onRemoteCommandReceived = function (block) {
    Blockly.Python.addConstant('bitcar-robot', '""" BitCar robot """');
    const code = Blockly.Python.robots_onRemoteCommandReceived_generator(block);
    Blockly.Python.addConstant('NEC_REMOTE_TYPE', "NEC_REMOTE_TYPE = 'basic_black'");
    Blockly.Python.addConstant('basic_black_NEC_buttons', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_BASIC_BLACK_BUTTONS);
    Blockly.Python.addFunction('remoteNEC_basicBlack_getButton', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_BASIC_BLACK_GET_BUTTON);
    return code;
};

Blockly.Python.robots_bitcar_onRemoteCommandReceived_car_mp3_gray = function (block) {
    Blockly.Python.addConstant('bitcar-robot', '""" BitCar robot """');
    const code = Blockly.Python.robots_onRemoteCommandReceived_generator(block);
    Blockly.Python.addConstant('NEC_REMOTE_TYPE', "NEC_REMOTE_TYPE = 'Car_mp3'");
    Blockly.Python.addConstant('car_mp3_gray_NEC_buttons', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_AR_MP3_GRAY_BUTTONS);
    Blockly.Python.addFunction('remoteNEC_Carmp3_gray_getButton', FUNCTIONS_MICROBIT.DEF_REMOTE_NEC_AR_MP3_GRAY_GET_BUTTON);
    return code;
};

Blockly.Python.robots_decodeBitCarIRreceiver = function () {
    Blockly.Python.addConstant('bitcar-robot', "\"\"\" BitCar robot \"\"\"");
    return Blockly.Python.robots_decodeIRreceiver_generator();
};

Blockly.Python.robots_getBitCarIRcode = function () {
    Blockly.Python.addConstant('bitcar-robot', "\"\"\" BitCar robot \"\"\"");
    return Blockly.Python.robots_getIRcode_generator();
};

Blockly.Python.robots_uhandbit_controlServo = function (block) {
    const port = block.getFieldValue("PORT");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('uhandbit', IMPORT_UHANDBIT);
    Blockly.Python.addInit('uhandbit_servo', "uhandbit_servo = UhandbitServo()");
    return `uhandbit_servo.set_servo(${port}, ${angle}, ${duration})` + NEWLINE;
};

// uHandbit color sensor - apds9960
Blockly.Python.robots_uhandbit_colorSensor_read_rgb = function (block) {
    Blockly.Python.addImport('uhandbit', IMPORT_UHANDBIT);
    Blockly.Python.addInit('uhandbit_color', "uhandbit_color = UhandbitColorSensor()");
    return ["uhandbit_color.read_rgb()[" + block.getFieldValue("DATA") + "]", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_uhandbit_colorSensor_get_color = function () {
    Blockly.Python.addImport('uhandbit', IMPORT_UHANDBIT);
    Blockly.Python.addInit('uhandbit_color', "uhandbit_color = UhandbitColorSensor()");
    return ["uhandbit_color.get_color()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_uhandbit_ultrasonic_get_distance = function (block) {
    let pinTRIG;
    let pinECHO;
    switch (block.getFieldValue("PORT")) {
        case "1":
            pinTRIG = "pin1"
            pinECHO = "pin2";
            break;
        case "2":
            pinTRIG = "pin13";
            pinECHO = "pin14";
            break;
    }
    Blockly.Python.addInit(pinTRIG, "# Ultrasonic TRIG on " + pinTRIG);
    Blockly.Python.addInit(pinECHO, "# Ultrasonic ECHO on " + pinECHO);
    Blockly.Python.addImport('machine_pulse', IMPORT_MACHINE_PULSE_MS);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('getUltrasonicData', FUNCTIONS_MICROBIT.DEF_GROVE_ULTRASONIC);
    let code = "";
    switch (block.getFieldValue("DATA")) {
        case "DIST":
            code = "distance";
            break;
        case "TIME":
            code = "duration";
            break;
    }
    return ["getUltrasonicData(" + pinTRIG + ", " + pinECHO + ", '" + code + "')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_uhandbit_setNeopixel = function (block) {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addInit('neopixel_pin15', "# Neopixel on pin15");
    Blockly.Python.addInit('uhandbit_neopixel', "npuHandbit = neopixel.NeoPixel(pin15, 2)");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    let l = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    if (l < 0 || l > 11) {
        return "npuHandbit[0]=(0,0,0)" + NEWLINE + "npuHandbit.show()" + NEWLINE;
    }
    return "npuHandbit[" + l + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npuHandbit.show()" + NEWLINE;
};

Blockly.Python.robots_uhandbit_setNeopixelPalette = function (block) {
    const led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addInit('neopixel_pin15', "# Neopixel on pin15");
    Blockly.Python.addInit('uhandbit_neopixel', "npuHandbit = neopixel.NeoPixel(pin15, 2)");
    return "npuHandbit[" + led + "] = " + colour + NEWLINE + "npuHandbit.show()" + NEWLINE;
};

Blockly.Python.robots_uhandbit_setNeopixelRainbow = function () {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addInit('neopixel_pin15', "# Neopixel on pin15");
    Blockly.Python.addInit('uhandbit_neopixel', "npuHandbit = neopixel.NeoPixel(pin15, 2)");
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_MICROBIT.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(npuHandbit, 2)" + NEWLINE;
};

// wukong

Blockly.Python.robots_wukong_setLightMode = function (block) {
    Blockly.Python.addImport('wukong', IMPORT_WUKONG);
    Blockly.Python.addConstant('wukong-robot', "\"\"\" Wukong robot \"\"\"");
    Blockly.Python.addInit('wukong', "wk = WUKONG()");
    const mode = block.getFieldValue("MODE");
    if (mode == "BREATH") {
        return "wk.set_light_breath(True)" + NEWLINE;
    } else {
        return "wk.set_light_breath(False)" + NEWLINE;
    }
};

Blockly.Python.robots_wukong_setLightIntensity = function (block) {
    Blockly.Python.addImport('wukong', IMPORT_WUKONG);
    Blockly.Python.addConstant('wukong-robot', "\"\"\" Wukong robot \"\"\"");
    Blockly.Python.addInit('wukong', "wk = WUKONG()");
    const light = Blockly.Python.valueToCode(block, "LIGHT", Blockly.Python.ORDER_NONE) || "0";
    return "wk.set_light(" + light + ")" + NEWLINE;
};

Blockly.Python.robots_wukong_controlMotors = function (block) {
    Blockly.Python.addImport('wukong', IMPORT_WUKONG);
    Blockly.Python.addConstant('wukong-robot', "\"\"\" Wukong robot \"\"\"");
    Blockly.Python.addInit('wukong', "wk = WUKONG()");
    const dir = block.getFieldValue("DIR");
    const motor = block.getFieldValue("MOTOR");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (dir == "ANTICLOCKWISE") {
        speed = "-" + speed;
    }
    if (motor == "BOTH") {
        return "wk.set_motors(1, " + speed + ")" + NEWLINE + "wk.set_motors(2, " + speed + ")" + NEWLINE;
    } else {
        return "wk.set_motors(" + motor + ", " + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_wukong_stopMotors = function (block) {
    Blockly.Python.addImport('wukong', IMPORT_WUKONG);
    Blockly.Python.addConstant('wukong-robot', "\"\"\" Wukong robot \"\"\"");
    Blockly.Python.addInit('wukong', "wk = WUKONG()");
    const motor = block.getFieldValue("MOTOR");
    if (motor == "BOTH") {
        return "wk.set_motors(1, 0)" + NEWLINE + "wk.set_motors(2, 0)" + NEWLINE;;
    } else {
        return "wk.set_motors(" + motor + ", 0)" + NEWLINE;
    }
};

Blockly.Python.robots_wukong_setServoAngle = function (block) {
    Blockly.Python.addImport('wukong', IMPORT_WUKONG);
    Blockly.Python.addConstant('wukong-robot', "\"\"\" Wukong robot \"\"\"");
    Blockly.Python.addInit('wukong', "wk = WUKONG()");
    const servo = block.getFieldValue("SERVO");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const type = block.getFieldValue("TYPE");
    switch (servo) {
        case "ALL":
            return "for s in range(7):" + NEWLINE + "wk.set_servo(s + 1, " + angle + ", servoType = wk._" + type + ")" + NEWLINE;
        default:
            return "wk.set_servo(" + servo + ", " + angle + ", servoType = wk._" + type + ")" + NEWLINE;
    }
};

Blockly.Python.robots_wukong_setServoSpeed = function (block) {
    Blockly.Python.addImport('wukong', IMPORT_WUKONG);
    Blockly.Python.addConstant('wukong-robot', "\"\"\" Wukong robot \"\"\"");
    Blockly.Python.addInit('wukong', "wk = WUKONG()");
    const servo = block.getFieldValue("SERVO");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    switch (servo) {
        case "ALL":
            return "for s in range(7):" + NEWLINE + "wk.set_servo_speed(s + 1, " + speed + ")" + NEWLINE;
        default:
            return "wk.set_servo_speed(" + servo + ", " + speed + ")" + NEWLINE;
    }
};

// Building:bit Super - Base

Blockly.Python.robots_buildingBit_setNeopixel = function (block) {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('buildingbit-robot', "\"\"\" Building:bit robot \"\"\"");
    Blockly.Python.addInit('neopixel_pin12', "# Neopixel on pin12");
    Blockly.Python.addInit('buildingbit_neopixel', "npSuperBit = neopixel.NeoPixel(pin12, 4)");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (block.getFieldValue("LED") == "all") {
        return "for i in range(4):" + NEWLINE + "  npSuperBit[i] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npSuperBit.show()" + NEWLINE;
    } else {
        return "npSuperBit[" + block.getFieldValue("LED") + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "npSuperBit.show()" + NEWLINE;
    }
};

Blockly.Python.robots_buildingBit_setNeopixelPalette = function (block) {
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('buildingbit-robot', "\"\"\" Building:bit robot \"\"\"");
    Blockly.Python.addInit('neopixel_pin12', "# Neopixel on pin12");
    Blockly.Python.addInit('buildingbit_neopixel', "npSuperBit = neopixel.NeoPixel(pin12, 4)");
    const led = block.getFieldValue("LED");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    if (led == "all") {
        return "for i in range(4):" + NEWLINE + "  npSuperBit[i] = " + colour + NEWLINE + "npSuperBit.show()" + NEWLINE;
    } else {
        return "npSuperBit[" + led + "] = " + colour + NEWLINE + "npSuperBit.show()" + NEWLINE;
    }
};

Blockly.Python.robots_buildingBit_setServoAngle = function (block) {
    Blockly.Python.addImport('superbit', IMPORT_SUPERBIT);
    Blockly.Python.addConstant('buildingbit-robot', "\"\"\" Building:bit robot \"\"\"");
    const servo = block.getFieldValue("SERVO");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const type = block.getFieldValue("TYPE");
    return "superbit.servo" + type + "(superbit." + servo + ", " + angle + ")" + NEWLINE;
};

Blockly.Python.robots_buildingBit_controlMotors = function (block) {
    Blockly.Python.addImport('superbit', IMPORT_SUPERBIT);
    Blockly.Python.addConstant('buildingbit-robot', "\"\"\" Building:bit robot \"\"\"");
    const dir = block.getFieldValue("DIR");
    const motor = block.getFieldValue("MOTOR");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (dir == "ANTICLOCKWISE") {
        speed = "-" + speed;
    }
    return "superbit.motor_control(superbit." + motor + ", " + speed + ", 0)" + NEWLINE;
};

Blockly.Python.robots_buildingBit_stopMotors = function (block) {
    Blockly.Python.addImport('superbit', IMPORT_SUPERBIT);
    Blockly.Python.addConstant('buildingbit-robot', "\"\"\" Building:bit robot \"\"\"");
    const motor = block.getFieldValue("MOTOR");
    return "superbit.motor_control(superbit." + motor + ", 0, 0)" + NEWLINE;
};

Blockly.Python.robots_buildingBit_controlStepperMotors = function (block) {
    Blockly.Python.addImport('superbit', IMPORT_SUPERBIT);
    Blockly.Python.addConstant('buildingbit-robot', "\"\"\" Building:bit robot \"\"\"");
    const motor = block.getFieldValue("MOTOR");
    const position = Blockly.Python.valueToCode(block, "POSITION", Blockly.Python.ORDER_NONE) || "0";
    return "superbit.stepper_control(superbit." + motor + ", " + position + ")" + NEWLINE;
};

// Building:bit Super - Sensor

Blockly.Python.robots_buildingBit_getUltrasonicDistance = function (block) {
    const pinTRIG = block.getFieldValue("TRIG");
    const pinECHO = block.getFieldValue("ECHO");
    Blockly.Python.addImport('WOM_Sensor_Kit', IMPORT_WOM_SENSOR_KIT);
    Blockly.Python.addInit(pinTRIG, "# Ultrasonic TRIG on " + pinTRIG);
    Blockly.Python.addInit(pinECHO, "# Ultrasonic ECHO on " + pinECHO);
    return ["WOM_Sensor_Kit.WOM_ultrasonic(" + pinECHO + ", " + pinTRIG + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_buildingBit_getPotentiometerValue = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('WOM_Sensor_Kit', IMPORT_WOM_SENSOR_KIT);
    Blockly.Python.addInit('potentiometer_module_' + pin, "# Potentiometer on " + pin);
    return ["WOM_Sensor_Kit.WOM_Knob(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_buildingBit_getLightLevel = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('WOM_Sensor_Kit', IMPORT_WOM_SENSOR_KIT);
    Blockly.Python.addInit('light_module_' + pin, "# Light Sensor on " + pin);
    return ["WOM_Sensor_Kit.WOM_light_V2(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_buildingBit_isObstacleDetected = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('WOM_Sensor_Kit', IMPORT_WOM_SENSOR_KIT);
    Blockly.Python.addInit('obstacle_detector' + pin, "# IR Obstacle Detector on " + pin);
    return ["WOM_Sensor_Kit.WOM_ir(" + pin + ") == 0", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_buildingBit_getPIRstate = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('WOM_Sensor_Kit', IMPORT_WOM_SENSOR_KIT);
    Blockly.Python.addInit('motion_module_' + pin, "# PIR Motion Sensor on " + pin);
    return ["WOM_Sensor_Kit.WOM_pir(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_buildingBit_dht11_redData = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('WOM_Sensor_Kit', IMPORT_WOM_SENSOR_KIT);
    Blockly.Python.addInit('dht11_' + pin, "# DHT11 Sensor on " + pin);
    switch (block.getFieldValue("DATA")) {
        case "TEMP":
            let code = "WOM_Sensor_Kit.WOM_dht11(" + pin + ", WOM_Sensor_Kit.WOM_temp_C)";
            if (block.getInput("TEMP_UNIT")) {
                switch (block.getFieldValue("UNIT")) {
                    case "FAHRENHEIT":
                        code += "*9/5 + 32";
                        break;
                    case "KELVIN":
                        code += " + 273.15";
                        break;
                }
            }
            return [code, Blockly.Python.ORDER_ADDITIVE];
        case "HUM":
            return ["WOM_Sensor_Kit.WOM_dht11(" + pin + ", WOM_Sensor_Kit.WOM_humidity)", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.robots_buildingBit_getColor = function (block) {
    Blockly.Python.addImport('WOM_Sensor_Kit', IMPORT_WOM_SENSOR_KIT);
    switch (block.getFieldValue("COLOR")) {
        case "R":
            return ["WOM_Sensor_Kit.WOM_color(WOM_Sensor_Kit.WOM_red)", Blockly.Python.ORDER_ATOMIC];
        case "G":
            return ["WOM_Sensor_Kit.WOM_color(WOM_Sensor_Kit.WOM_green)", Blockly.Python.ORDER_ATOMIC];
        case "B":
            return ["WOM_Sensor_Kit.WOM_color(WOM_Sensor_Kit.WOM_green)", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.robots_buildingBitonJoystickDir = function (block) {
    Blockly.Python.addImport('WOM_Sensor_Kit', IMPORT_WOM_SENSOR_KIT);
    const pinX = block.getFieldValue("PIN_X");
    const pinY = block.getFieldValue("PIN_Y");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    let dir;
    switch (block.getFieldValue("DIR")) {
        case "UP":
            dir = "WOM_Sensor_Kit.WOM_up";
            break;
        case "DOWN":
            dir = "WOM_Sensor_Kit.WOM_down";
            break;
        case "RIGHT":
            dir = "WOM_Sensor_Kit.WOM_right";
            break;
        case "LEFT":
            dir = "WOM_Sensor_Kit.WOM_left";
            break;
    }
    return "if WOM_Sensor_Kit.WOM_rocker(" + pinX + ", " + pinY + ", " + dir + "):" + NEWLINE + branchCode;
};