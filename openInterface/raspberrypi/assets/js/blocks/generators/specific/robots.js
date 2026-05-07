/**
 * @fileoverview Robots generators for Raspberry Pi.
 */

// Yahboom G1 Tank - Control

Blockly.Python.robots_yahboom_g1tank_setLedColor = function (block) {
    Blockly.Python.addConstant('G1Tank-robot', '""" Yahboom G1 Tank robot """');
    const color = block.getFieldValue("COLOR");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_ATOMIC) || '0';
    switch (color) {
        case 'RED':
            Blockly.Python.Generators.pwm('22', 'G1 Tank LED', 2000);
            Blockly.Python.addFunction('g1tank_led_setRed', FUNCTIONS_RASPBERRY.DEF_G1TANK_SET_LED_RED);
            return `g1tank_led_setRed(${state}*100)` + NEWLINE;
        case 'GREEN':
            Blockly.Python.Generators.pwm('27', 'G1 Tank LED', 2000);
            Blockly.Python.addFunction('g1tank_led_setGreen', FUNCTIONS_RASPBERRY.DEF_G1TANK_SET_LED_GREEN);
            return `g1tank_led_setGreen(${state}*100)` + NEWLINE;
        case 'BLUE':
            Blockly.Python.Generators.pwm('24', 'G1 Tank LED', 2000);
            Blockly.Python.addFunction('g1tank_led_setBlue', FUNCTIONS_RASPBERRY.DEF_G1TANK_SET_LED_BLUE);
            return `g1tank_led_setBlue(${state}*100)` + NEWLINE;
    }
};

Blockly.Python.robots_yahboom_g1tank_setLedColor_RGB = function (block) {
    Blockly.Python.Generators.pwm('22', 'G1 Tank LED', 2000);
    Blockly.Python.Generators.pwm('27', 'G1 Tank LED', 2000);
    Blockly.Python.Generators.pwm('24', 'G1 Tank LED', 2000);
    const R = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const G = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const B = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addFunction('g1tank_led_setRed', FUNCTIONS_RASPBERRY.DEF_G1TANK_SET_LED_RED);
    Blockly.Python.addFunction('g1tank_led_setGreen', FUNCTIONS_RASPBERRY.DEF_G1TANK_SET_LED_GREEN);
    Blockly.Python.addFunction('g1tank_led_setBlue', FUNCTIONS_RASPBERRY.DEF_G1TANK_SET_LED_BLUE);
    Blockly.Python.addFunction('g1tank_setLEDRGB', FUNCTIONS_RASPBERRY.DEF_G1TANK_SET_LED_RGB);
    return "g1tank_setLEDRGB(" + R, ", " + G + ", " + B + ")" + NEWLINE;
};

Blockly.Python.robots_yahboom_g1tank_setLedColor_Palette = function (block) {
    Blockly.Python.Generators.pwm('22', 'G1 Tank LED', 2000);
    Blockly.Python.Generators.pwm('27', 'G1 Tank LED', 2000);
    Blockly.Python.Generators.pwm('24', 'G1 Tank LED', 2000);
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    Blockly.Python.addFunction('g1tank_led_setRed', FUNCTIONS_RASPBERRY.DEF_G1TANK_SET_LED_RED);
    Blockly.Python.addFunction('g1tank_led_setGreen', FUNCTIONS_RASPBERRY.DEF_G1TANK_SET_LED_GREEN);
    Blockly.Python.addFunction('g1tank_led_setBlue', FUNCTIONS_RASPBERRY.DEF_G1TANK_SET_LED_BLUE);
    Blockly.Python.addFunction('g1tank_setLEDRGB', FUNCTIONS_RASPBERRY.DEF_G1TANK_SET_LED_RGB);
    return "g1tank_setLEDRGB" + colour + NEWLINE;
};

Blockly.Python.robots_yahboom_g1tank_setLEDServoAngle = function (block) {
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const pwmName = Blockly.Python.Generators.pwm("23", 'Servo', 50, 7.5);
    Blockly.Python.addFunction('setServoAngle', FUNCTIONS_RASPBERRY.DEF_SERVO_SET_ANGLE);
    return "setServoAngle(" + pwmName + ", " + angle + ")" + NEWLINE;
};

// Yahboom G1 Tank - Detection

Blockly.Python.robots_yahboom_g1tank_getUltrasonicRanger = function (block) {
    let data = "";
    switch (block.getFieldValue("DATA")) {
        case "DIST":
            data = "distance";
            break;
        case "TIME":
            data = "duration";
            break;
    }
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('hcsr04_1_codeFlag', '# Ultrasonic TRIG/ECHO on 1/0');
    const pinName_TRIG = Blockly.Python.Generators.digital_write("1");
    const pinName_ECHO = Blockly.Python.Generators.digital_read("0");
    Blockly.Python.addFunction('time_pulse_us', FUNCTIONS_RASPBERRY.DEF_TIME_PULSE_US);
    Blockly.Python.addFunction('hcsr04_getUltrasonicData', FUNCTIONS_RASPBERRY.DEF_HCSR04_ULTRASONIC);
    return ["hcsr04_getUltrasonicData(" + pinName_TRIG + ", " + pinName_ECHO + ", data='" + data + "')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_yahboom_g1tank_getLineFinderState = function (block) {
    switch (block.getFieldValue("SENSOR")) {
        case 'P1':
            const pinName_P1 = Blockly.Python.Generators.digital_read("3", "Line Finder P1");
            return ["GPIO.input(" + pinName_P1 + ")", Blockly.Python.ORDER_NONE];
        case 'P2':
            const pinName_P2 = Blockly.Python.Generators.digital_read("5", "Line Finder P2");
            return ["GPIO.input(" + pinName_P2 + ")", Blockly.Python.ORDER_NONE];
        case 'P3':
            const pinName_P3 = Blockly.Python.Generators.digital_read("4", "Line Finder P3");
            return ["GPIO.input(" + pinName_P3 + ")", Blockly.Python.ORDER_NONE];
        case 'P4':
            const pinName_P4 = Blockly.Python.Generators.digital_read("18", "Line Finder P4");
            return ["GPIO.input(" + pinName_P4 + ")", Blockly.Python.ORDER_NONE];
    }
};

Blockly.Python.robots_yahboom_g1tank_waitKEY = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('g1tank_wait_KEY_press', FUNCTIONS_RASPBERRY.DEF_G1TANK_WAIT_KEY_PRESSING);
    Blockly.Python.Generators.digital_read("8", "G1 Tank KEY");
    return 'g1tank_wait_KEY_press()' + NEWLINE;
};

// Yahboom G1 Tank - Moving

Blockly.Python.ROBOT_YAHBOOM_MOTORS_SETUP_GENERATOR = function () {
    Blockly.Python.addConstant('G1Tank-robot', '""" Yahboom G1 Tank robot """');
    Blockly.Python.Generators.digital_write("20");
    Blockly.Python.Generators.digital_write("21");
    Blockly.Python.Generators.digital_write("19");
    Blockly.Python.Generators.digital_write("26");
    Blockly.Python.Generators.pwm("16", "G1Tank Motor Left", 2000);
    Blockly.Python.Generators.pwm("13", "G1Tank Motor Right", 2000);
};

Blockly.Python.robots_yahboom_g1tank_setGo = function (block) {
    Blockly.Python.ROBOT_YAHBOOM_MOTORS_SETUP_GENERATOR();
    const dir = block.getFieldValue("DIR").toLowerCase();
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC) || '0';
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('g1tank_move', FUNCTIONS_RASPBERRY.DEF_G1TANK_MOVE);
    Blockly.Python.addFunction('g1tank_control_motorLeft', FUNCTIONS_RASPBERRY.DEF_G1TANK_CONTROL_MOTOR_LEFT);
    Blockly.Python.addFunction('g1tank_control_motorRight', FUNCTIONS_RASPBERRY.DEF_G1TANK_CONTROL_MOTOR_RIGHT);
    return "g1tank_move(" + (dir == 'backward' ? '-' : '') + speed + ")" + NEWLINE;
};

Blockly.Python.robots_yahboom_g1tank_stop = function (block) {
    Blockly.Python.ROBOT_YAHBOOM_MOTORS_SETUP_GENERATOR();
    Blockly.Python.addFunction('g1tank_stop', FUNCTIONS_RASPBERRY.DEF_G1TANK_STOP);
    return "g1tank_stop()" + NEWLINE;
};

Blockly.Python.robots_yahboom_g1tank_turn = function (block) {
    Blockly.Python.ROBOT_YAHBOOM_MOTORS_SETUP_GENERATOR();
    const dir = block.getFieldValue("DIR");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC) || '0';
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('g1tank_control_motorLeft', FUNCTIONS_RASPBERRY.DEF_G1TANK_CONTROL_MOTOR_LEFT);
    Blockly.Python.addFunction('g1tank_control_motorRight', FUNCTIONS_RASPBERRY.DEF_G1TANK_CONTROL_MOTOR_RIGHT);
    switch (dir) {
        case 'RIGHT':
            Blockly.Python.addFunction('g1tank_turn_right', FUNCTIONS_RASPBERRY.DEF_G1TANK_TURN_RIGHT);
            return "g1tank_turn_right(" + speed + ", False)" + NEWLINE;
        case 'LEFT':
            Blockly.Python.addFunction('g1tank_turn_left', FUNCTIONS_RASPBERRY.DEF_G1TANK_TURN_LEFT);
            return "g1tank_turn_left(" + speed + ", False)" + NEWLINE;
    }
};

Blockly.Python.robots_yahboom_g1tank_spin = function (block) {
    Blockly.Python.ROBOT_YAHBOOM_MOTORS_SETUP_GENERATOR();
    const dir = block.getFieldValue("DIR");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC) || '0';
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('g1tank_control_motorLeft', FUNCTIONS_RASPBERRY.DEF_G1TANK_CONTROL_MOTOR_LEFT);
    Blockly.Python.addFunction('g1tank_control_motorRight', FUNCTIONS_RASPBERRY.DEF_G1TANK_CONTROL_MOTOR_RIGHT);
    switch (dir) {
        case 'RIGHT':
            Blockly.Python.addFunction('g1tank_turn_right', FUNCTIONS_RASPBERRY.DEF_G1TANK_TURN_RIGHT);
            return "g1tank_turn_right(" + speed + ", True)" + NEWLINE;
        case 'LEFT':
            Blockly.Python.addFunction('g1tank_turn_left', FUNCTIONS_RASPBERRY.DEF_G1TANK_TURN_LEFT);
            return "g1tank_turn_left(" + speed + ", True)" + NEWLINE;
    }
};

Blockly.Python.robots_yahboom_g1tank_controlMotors = function (block) {
    Blockly.Python.ROBOT_YAHBOOM_MOTORS_SETUP_GENERATOR();
    const motor = block.getFieldValue("MOTOR");
    const dir = block.getFieldValue("DIR");
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC) || '0';
    speed = (dir == 'ANTICLOCKWISE' ? '-' : '') + speed;
    switch (motor) {
        case 'RIGHT':
            Blockly.Python.addFunction('g1tank_control_motorRight', FUNCTIONS_RASPBERRY.DEF_G1TANK_CONTROL_MOTOR_RIGHT);
            return "g1tank_control_motorRight(" + speed + ")" + NEWLINE;
        case 'LEFT':
            Blockly.Python.addFunction('g1tank_control_motorLeft', FUNCTIONS_RASPBERRY.DEF_G1TANK_CONTROL_MOTOR_LEFT);
            return "g1tank_control_motorLeft(" + + speed + ")" + NEWLINE;
        case 'BOTH':
            Blockly.Python.addFunction('g1tank_control_motorRight', FUNCTIONS_RASPBERRY.DEF_G1TANK_CONTROL_MOTOR_RIGHT);
            Blockly.Python.addFunction('g1tank_control_motorLeft', FUNCTIONS_RASPBERRY.DEF_G1TANK_CONTROL_MOTOR_LEFT);
            return "g1tank_control_motorRight(" + speed + ")" + NEWLINE
                + "g1tank_control_motorLeft(" + speed + ")" + NEWLINE
    }
};

// Yahboom G1 Tank - Camera

Blockly.Python.robots_yahboom_g1tank_setCameraPanAngle = function (block) {
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const pwmName = Blockly.Python.Generators.pwm("11", 'Servo', 50, 7.5);
    Blockly.Python.addFunction('setServoAngle', FUNCTIONS_RASPBERRY.DEF_SERVO_SET_ANGLE);
    return "setServoAngle(" + pwmName + ", " + angle + ")" + NEWLINE;
};

Blockly.Python.robots_yahboom_g1tank_setCameraTiltAngle = function (block) {
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const pwmName = Blockly.Python.Generators.pwm("9", 'Servo', 50, 7.5);
    Blockly.Python.addFunction('setServoAngle', FUNCTIONS_RASPBERRY.DEF_SERVO_SET_ANGLE);
    return "setServoAngle(" + pwmName + ", " + angle + ")" + NEWLINE;
};
