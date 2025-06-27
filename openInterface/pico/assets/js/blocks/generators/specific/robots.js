/**
 * @fileoverview Robots generators for Raspberry Pi Pico.
 */

// Kitronik

// Kitronik motors
Blockly.Python.robots_moveKitro = function (block) {
    Blockly.Python.addImport('PicoAutonomousRobotics', IMPORT_KITRONIK_PICO);
    Blockly.Python.addConstant('kitronik', '""" Kitronik """');
    Blockly.Python.addInit('kitro-init', 'robot = KitronikPicoRobotBuggy()');
    Blockly.Python.addFunction('kitro_move', FUNCTIONS_PICO.DEF_KITRO_MOVE);
    const dir = block.getFieldValue('DIR');
    const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_NONE) || "0";
    return `kitro_move("${dir}", ${speed})${NEWLINE}`;
};

Blockly.Python.robots_rotateKitro = function (block) {
    Blockly.Python.addImport('PicoAutonomousRobotics', IMPORT_KITRONIK_PICO);
    Blockly.Python.addConstant('kitronik', '""" Kitronik """');
    Blockly.Python.addInit('kitro-init', 'robot = KitronikPicoRobotBuggy()');
    const dir = block.getFieldValue('DIR');
    const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_NONE) || "0";
    if (dir == 'RIGHT') {
        return `robot.motorOn("r", "r", ${speed})${NEWLINE}robot.motorOn("l", "f", ${speed})${NEWLINE}`;
    } else if (dir == 'LEFT') {
        return `robot.motorOn("l", "r", ${speed})${NEWLINE}robot.motorOn("r", "f", ${speed})${NEWLINE}`;
    } else {
        console.error("Field value 'DIR' don't have a right value ('RIGHT' or 'LEFT').");
    }
};

Blockly.Python.robots_stopKitro = function () {
    Blockly.Python.addImport('PicoAutonomousRobotics', IMPORT_KITRONIK_PICO);
    Blockly.Python.addConstant('kitronik', '""" Kitronik """');
    Blockly.Python.addInit('kitro-init', 'robot = KitronikPicoRobotBuggy()');
    Blockly.Python.addFunction('kitro_stop_motors', FUNCTIONS_PICO.DEF_KITRO_STOP_MOTORS);
    return `kitro_stopMotors()${NEWLINE}`;
};

Blockly.Python.robots_controlKitroMotors = function (block) {
    Blockly.Python.addImport('PicoAutonomousRobotics', IMPORT_KITRONIK_PICO);
    Blockly.Python.addConstant('kitronik', '""" Kitronik """');
    Blockly.Python.addInit('kitro-init', 'robot = KitronikPicoRobotBuggy()');
    const motor = block.getFieldValue('MOTOR');
    const dir = block.getFieldValue('DIR');
    const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_NONE) || "0";
    return `robot.motorOn("${motor}", "${dir}", ${speed})${NEWLINE}`;
};

Blockly.Python.robots_setKitroRotationAngle = function (block) {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('PicoAutonomousRobotics', IMPORT_KITRONIK_PICO);
    Blockly.Python.addConstant('kitronik', '""" Kitronik """');
    Blockly.Python.addInit('kitro-init', 'robot = KitronikPicoRobotBuggy()');
    Blockly.Python.addFunction('convert_speed_mps', FUNCTIONS_PICO.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('kitro_stop_motors', FUNCTIONS_PICO.DEF_KITRO_STOP_MOTORS);
    Blockly.Python.addFunction('kitro_turn_angle', FUNCTIONS_PICO.DEF_KITRO_TURN_ANGLE);
    const angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_NONE) || "0";
    return `kitro_turnAngle(${angle})${NEWLINE}`;
};

Blockly.Python.robots_moveKitroOneSquareForward = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('PicoAutonomousRobotics', IMPORT_KITRONIK_PICO);
    Blockly.Python.addConstant('kitronik', '""" Kitronik """');
    Blockly.Python.addInit('kitro-init', 'robot = KitronikPicoRobotBuggy()');
    Blockly.Python.addFunction('convert_speed_mps', FUNCTIONS_PICO.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('kitro_stop_motors', FUNCTIONS_PICO.DEF_KITRO_STOP_MOTORS);
    Blockly.Python.addFunction('kitro_move', FUNCTIONS_PICO.DEF_KITRO_MOVE);
    Blockly.Python.addFunction('kitro_move_one_square', FUNCTIONS_PICO.DEF_KITRO_MOVE_ONE_SQUARE);
    return `kitro_moveWithSquare(1, 'f', 70)${NEWLINE}`;
};

Blockly.Python.robots_moveKitroOneSquareBackward = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('PicoAutonomousRobotics', IMPORT_KITRONIK_PICO);
    Blockly.Python.addConstant('kitronik', '""" Kitronik """');
    Blockly.Python.addInit('kitro-init', 'robot = KitronikPicoRobotBuggy()');
    Blockly.Python.addFunction('convert_speed_mps', FUNCTIONS_PICO.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('kitro_stop_motors', FUNCTIONS_PICO.DEF_KITRO_STOP_MOTORS);
    Blockly.Python.addFunction('kitro_move', FUNCTIONS_PICO.DEF_KITRO_MOVE);
    Blockly.Python.addFunction('kitro_move_one_square', FUNCTIONS_PICO.DEF_KITRO_MOVE_ONE_SQUARE);
    return `kitro_moveWithSquare(1, 'r', 70)${NEWLINE}`;
};

Blockly.Python.robots_rotateKitroLeft = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('PicoAutonomousRobotics', IMPORT_KITRONIK_PICO);
    Blockly.Python.addConstant('kitronik', '""" Kitronik """');
    Blockly.Python.addInit('kitro-init', 'robot = KitronikPicoRobotBuggy()');
    Blockly.Python.addFunction('convert_speed_mps', FUNCTIONS_PICO.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('kitro_stop_motors', FUNCTIONS_PICO.DEF_KITRO_STOP_MOTORS);
    Blockly.Python.addFunction('kitro_turn_angle', FUNCTIONS_PICO.DEF_KITRO_TURN_ANGLE);
    return `kitro_turnAngle(-90)${NEWLINE}`;
};

Blockly.Python.robots_rotateKitroRight = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('PicoAutonomousRobotics', IMPORT_KITRONIK_PICO);
    Blockly.Python.addConstant('kitronik', '""" Kitronik """');
    Blockly.Python.addInit('kitro-init', 'robot = KitronikPicoRobotBuggy()');
    Blockly.Python.addFunction('convert_speed_mps', FUNCTIONS_PICO.DEF_CONVERT_SPEED_MPS);
    Blockly.Python.addFunction('kitro_stop_motors', FUNCTIONS_PICO.DEF_KITRO_STOP_MOTORS);
    Blockly.Python.addFunction('kitro_turn_angle', FUNCTIONS_PICO.DEF_KITRO_TURN_ANGLE);
    return `kitro_turnAngle(90)${NEWLINE}`;
};

// Kitronik LEDs
Blockly.Python.robots_controlKitroRGBLed = function (block) {
    Blockly.Python.addImport('PicoAutonomousRobotics', IMPORT_KITRONIK_PICO);
    Blockly.Python.addConstant('kitronik', '""" Kitronik """');
    Blockly.Python.addInit('kitro-init', 'robot = KitronikPicoRobotBuggy()');
    const led = block.getFieldValue('LED');
    const r = Blockly.Python.valueToCode(block, 'R', Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, 'G', Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_NONE) || "0";
    return `robot.setLED(${led}, (${r}, ${g}, ${b}))${NEWLINE}robot.show()${NEWLINE}`;
};

Blockly.Python.robots_controlKitroColorLed = function (block) {
    Blockly.Python.addImport('PicoAutonomousRobotics', IMPORT_KITRONIK_PICO);
    Blockly.Python.addConstant('kitronik', '""" Kitronik """');
    Blockly.Python.addInit('kitro-init', 'robot = KitronikPicoRobotBuggy()');
    const led = block.getFieldValue('LED');
    const color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    return `robot.setLED(${led}, ${color})${NEWLINE}robot.show()${NEWLINE}`;
};

// Kitronik sensors
Blockly.Python.robots_KitroUltrasonicRanger = function (block) {
    Blockly.Python.addImport('PicoAutonomousRobotics', IMPORT_KITRONIK_PICO);
    Blockly.Python.addConstant('kitronik', '""" Kitronik """');
    Blockly.Python.addInit('kitro-init', 'robot = KitronikPicoRobotBuggy()');
    const sensor = block.getFieldValue('SENSOR');
    if (block.getFieldValue('DATA') === "DIST") {
        Blockly.Python.addPowerOn("kitro-set-measurements", 'robot.setMeasurementsTo("cm")');
        return [`robot.getDistance("${sensor}")`, Blockly.Python.ORDER_ATOMIC];
    }
    return [`robot.getDuration("${sensor}")`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_readKitroLineFinder = function (block) {
    Blockly.Python.addImport('PicoAutonomousRobotics', IMPORT_KITRONIK_PICO);
    Blockly.Python.addConstant('kitronik', '""" Kitronik """');
    Blockly.Python.addInit('kitro-init', 'robot = KitronikPicoRobotBuggy()');
    Blockly.Python.addFunction('kitro_line_finder', FUNCTIONS_PICO.DEF_KITRO_LINE_FINDER);
    const sensor = block.getFieldValue('SENSOR');
    return [`kitro_lineFinder("${sensor}")`, Blockly.Python.ORDER_ATOMIC];
};