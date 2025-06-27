/**
 * @fileoverview Actuators generators for Arduino.
 */

// SERVOMOTOR _ CONTROL ANGLE BLOCK
Blockly.Arduino.actuators_setServoAngle = function (block) {
    const pin = block.getFieldValue("PIN");
    const angle = Blockly.Arduino.valueToCode(block, "ANGLE", Blockly.Arduino.ORDER_ATOMIC);
    const objName = 'servomotor_' + pin;
    Blockly.Arduino.addInclude('servo', INCLUDE_SERVO);
    Blockly.Arduino.addDefine(objName, "#define PIN_SERVO_" + pin + TAB + pin);
    Blockly.Arduino.addDeclaration(objName, "Servo " + objName + ";");
    Blockly.Arduino.addSetup(objName, objName + ".attach(PIN_SERVO_" + pin + ");");
    return objName + ".write(" + angle + ");" + NEWLINE;
};

// CONTINUOUS SERVOMOTOR _ SET SPEED BLOCK
Blockly.Arduino.actuators_continuousServo_setSpeed = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Arduino.valueToCode(block, "SPEED", Blockly.Arduino.ORDER_ATOMIC) || "0";
    const dir = block.getFieldValue("DIR");
    const objName = 'servomotor_' + pin;
    Blockly.Arduino.addInclude('servo', INCLUDE_SERVO);
    Blockly.Arduino.addDefine(objName, "#define PIN_CONTINUOUS_SERVO_" + pin + TAB + pin);
    Blockly.Arduino.addDeclaration(objName, "Servo " + objName + ";");
    Blockly.Arduino.addSetup(objName, objName + ".attach(PIN_CONTINUOUS_SERVO_" + pin + ");");
    console.log(typeof value)
    switch (dir) {
        case "1":
            return objName + ".write(90*(1+" + value + "/100));" + NEWLINE;
        case '-1':
            return objName + ".write(90*(1-" + value + "/100));" + NEWLINE;
        default:
            throw Error("Unhandled servo direction option: " + dir);
    }
};

// SERVOMOTOR _ DETACH BLOCK
Blockly.Arduino.actuators_servo_detach = function (block) {
    const pin = block.getFieldValue("PIN");
    const objName = 'servomotor_' + pin;
    Blockly.Arduino.addInclude('servo', INCLUDE_SERVO);
    Blockly.Arduino.addDeclaration(objName, "Servo " + objName + ";");
    Blockly.Arduino.addSetup(objName, objName + ".attach(" + pin + ");");
    return objName + ".detach();" + NEWLINE;
};

// I2C MOTOR DRIVER _ SET SPEED BLOCK
Blockly.Arduino.actuators_DCMotor_setSpeed = function (block) {
    const speed = Blockly.Arduino.valueToCode(block, "SPEED", Blockly.Arduino.ORDER_ATOMIC);
    const dir = block.getFieldValue("DIR");
    Blockly.Arduino.addInclude('i2c_motor_driver', INCLUDE_GROVE_I2C_MOTOR_DRIVER);
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addDefine('i2c_motor', "#define MOTOR_I2C_ADDR 0x0f");
    Blockly.Arduino.addSetup("i2c_motor", "Motor.begin(MOTOR_I2C_ADDR);");
    return "Motor.speed(" + block.getFieldValue("MOTOR") + ", " + dir + "*" + speed + ");" + NEWLINE;
};

// I2C MOTOR DRIVER _ STOP MOTOR BLOCK
Blockly.Arduino.actuators_DCMotor_stop = function (block) {
    Blockly.Arduino.addInclude('i2c_motor_driver', INCLUDE_GROVE_I2C_MOTOR_DRIVER);
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addDefine('i2c_motor', "#define MOTOR_I2C_ADDR 0x0f");
    Blockly.Arduino.addSetup("i2c_motor", "Motor.begin(MOTOR_I2C_ADDR);");
    return "Motor.stop(" + block.getFieldValue("MOTOR") + ");" + NEWLINE;
};

// I2C MOTOR DRIVER _ SET SPEED BLOCK
Blockly.Arduino.actuators_stepperMotor_run = function (block) {
    const step = Blockly.Arduino.valueToCode(block, "STEP", Blockly.Arduino.ORDER_ATOMIC);
    const dir = block.getFieldValue("DIR");
    Blockly.Arduino.addInclude('i2c_motor_driver', INCLUDE_GROVE_I2C_MOTOR_DRIVER);
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addDefine('i2c_motor', "#define MOTOR_I2C_ADDR 0x0f");
    Blockly.Arduino.addSetup("i2c_motor", "Motor.begin(MOTOR_I2C_ADDR);");
    return "Motor.StepperRun(" + dir + "*" + step + ");" + NEWLINE;
};

// I2C MOTOR DRIVER _ SET SPEED BLOCK
Blockly.Arduino.actuators_MiniDriver_DCMotor_drive = function (block) {
    const speed = Blockly.Arduino.valueToCode(block, "SPEED", Blockly.Arduino.ORDER_ATOMIC);
    const duration = Blockly.Arduino.valueToCode(block, "DURATION", Blockly.Arduino.ORDER_ATOMIC);
    const motor = block.getFieldValue("MOTOR");
    const dir = block.getFieldValue("DIR");
    Blockly.Arduino.addInclude('SparkFunMiniMoto', INCLUDE_SPARK_FUN_MINI_MOTO);
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addDefine('mini_i2c_motor', "#define FAULTn  16");
    Blockly.Arduino.addDeclaration('motor1', "MiniMoto motor1(0xC4);");
    Blockly.Arduino.addDeclaration('motor2', "MiniMoto motor2(0xC0);");
    Blockly.Arduino.addFunction('delayUntil', FUNCTIONS_ARDUINO.DEF_DELAY_UNTIL);
    Blockly.Arduino.addSetup("mini_i2c_motor", "pinMode(FAULTn, INPUT);");
    switch (motor) {
        case "MOTOR1":
            return "motor1.drive(" + dir + "*" + speed + ");" + NEWLINE + "delayUntil(" + duration + "*1000);" + NEWLINE;
        case "MOTOR2":
            return "motor2.drive(" + dir + "*" + speed + ");" + NEWLINE + "delayUntil(" + duration + "*1000);" + NEWLINE;
    }
};

// I2C MOTOR DRIVER _ STOP MOTOR BLOCK
Blockly.Arduino.actuators_MiniDriver_DCMotor_stop = function (block) {
    const motor = block.getFieldValue("MOTOR");
    Blockly.Arduino.addInclude('SparkFunMiniMoto', INCLUDE_SPARK_FUN_MINI_MOTO);
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    switch (motor) {
        case "MOTOR1":
            Blockly.Arduino.addDeclaration('motor1', "MiniMoto motor1(0xC4);");
            return "motor1.stop();" + NEWLINE;
        case "MOTOR2":
            Blockly.Arduino.addDeclaration('motor2', "MiniMoto motor2(0xC0);");
            return "motor2.stop();" + NEWLINE;
    }
};

// MC33926 MOTOR SHIELD _ SET SPEED BLOCK
Blockly.Arduino.actuators_MC33926MotorShield_setSpeed = function (block) {
    const speed = Blockly.Arduino.valueToCode(block, "SPEED", Blockly.Arduino.ORDER_ATOMIC);
    const dir = block.getFieldValue("DIR");
    Blockly.Arduino.addInclude('include_dual_mc33926_motor', INCLUDE_DUAL_MC33926_MOTOR_SHIELD);
    Blockly.Arduino.addFunction('mc33926_stopIfFault', FUNCTIONS_ARDUINO.MC33926_STOP_IF_FAULT);
    Blockly.Arduino.addDeclaration('mc33926', "DualMC33926MotorShield motorShield;");
    Blockly.Arduino.addSetup('mc33926', "motorShield.init();");
    switch (block.getFieldValue("MOTOR")) {
        case "MOTOR1":
            return "motorShield.setM1Speed(" + dir + "*" + speed + ");" + NEWLINE + "mc33926_stopIfFault();" + NEWLINE;
        case "MOTOR2":
            return "motorShield.setM2Speed(" + dir + "*" + speed + ");" + NEWLINE + "mc33926_stopIfFault();" + NEWLINE;
    }
};

// MC33926 MOTOR SHIELD _ GET CURRENT BLOCK
Blockly.Arduino.actuators_MC33926MotorShield_getCurrent = function (block) {
    Blockly.Arduino.addInclude('include_dual_mc33926_motor', INCLUDE_DUAL_MC33926_MOTOR_SHIELD);
    Blockly.Arduino.addDeclaration('mc33926', "DualMC33926MotorShield motorShield;");
    switch (block.getFieldValue("MOTOR")) {
        case "MOTOR1":
            return ["motorShield.getM1CurrentMilliamps()", Blockly.Arduino.ORDER_ATOMIC]
        case "MOTOR2":
            return ["motorShield.getM2CurrentMilliamps()", Blockly.Arduino.ORDER_ATOMIC]
    }
};

// GROVE VIBRATION MOTOR _ CONTROL STATE BLOCK
Blockly.Arduino.actuators_setVibrationMotorState = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    Blockly.Arduino.addDefine('vibration_motor_' + pin, "#define PIN_VIBRATION_MOTOR_" + pin + TAB + pin);
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(PIN_VIBRATION_MOTOR_' + pin + ', OUTPUT);');
    return "digitalWrite(PIN_VIBRATION_MOTOR_" + pin + ", " + state + ");" + NEWLINE;
};

// GROVE RELAY _ CONTROL STATE BLOCK
Blockly.Arduino.actuators_setGroveRelayState = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    Blockly.Arduino.addDefine('relay_module_' + pin, "#define PIN_GROVE_RELAY_" + pin + TAB + pin);
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(PIN_GROVE_RELAY_' + pin + ', OUTPUT);');
    return "digitalWrite(PIN_GROVE_RELAY_" + pin + ", " + state + ");" + NEWLINE;
};

// GROVE BUZZER _ CONTROL STATE BLOCK
Blockly.Arduino.actuators_controlGroveBuzzerState = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    Blockly.Arduino.addDefine('buzzer_module_' + pin, "#define PIN_BUZZER_" + pin + TAB + pin);
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(PIN_BUZZER_' + pin + ', OUTPUT);');
    return "digitalWrite(PIN_BUZZER_" + pin + ", " + state + ");" + NEWLINE;
};

// GROVE BUZZER _ PLAY NOTE BLOCK
Blockly.Arduino.actuators_playNoteGroveBuzzer = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Arduino.addDefine('buzzer_module_' + pin, "#define PIN_BUZZER_" + pin + TAB + pin);
    Blockly.Arduino.addSetup('pin_' + pin, "pinMode(PIN_BUZZER_" + pin + ", OUTPUT);");
    return "tone(PIN_BUZZER_" + pin + ", " + block.getFieldValue("NOTE") + ");" + NEWLINE;
};

// GROVE BUZZER _ PLAY NOTE WITH DURATION BLOCK
Blockly.Arduino.actuators_playNoteDurationGroveBuzzer = function (block) {
    const pin = block.getFieldValue("PIN");
    const note = block.getFieldValue("NOTE");
    const duration = Blockly.Arduino.valueToCode(block, "DURATION", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.addDefine('buzzer_module_' + pin, "#define PIN_BUZZER_" + pin + TAB + pin);
    Blockly.Arduino.addSetup('pin_' + pin, "pinMode(PIN_BUZZER_" + pin + ", OUTPUT);");
    return "tone(PIN_BUZZER_" + pin + ", " + note + ", " + duration + "*1000);" + NEWLINE;
};

// GROVE BUZZER _ PLAY FREQUENCY (TONE) BLOCK
Blockly.Arduino.actuators_tone = function (block) {
    const pin = block.getFieldValue("PIN");
    const frequency = Blockly.Arduino.valueToCode(block, "FREQUENCY", Blockly.Arduino.ORDER_ATOMIC) || "0";
    Blockly.Arduino.addDefine('buzzer_module_' + pin, "#define PIN_BUZZER_" + pin + TAB + pin);
    Blockly.Arduino.addSetup("pin_" + pin, "pinMode(PIN_BUZZER_" + pin + ", OUTPUT);");
    return "tone(PIN_BUZZER_" + pin + ", " + frequency + ");" + NEWLINE;
};

// GROVE BUZZER _ PLAY FREQUENCY (TONE) WITH DURATION BLOCK
Blockly.Arduino.actuators_toneDuration = function (block) {
    const pin = block.getFieldValue("PIN");
    const frequency = Blockly.Arduino.valueToCode(block, "FREQUENCY", Blockly.Arduino.ORDER_ATOMIC) || "0";
    const duration = Blockly.Arduino.valueToCode(block, "DURATION", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.addDefine('buzzer_module_' + pin, "#define PIN_BUZZER_" + pin + TAB + pin);
    Blockly.Arduino.addSetup("pin_" + pin, "pinMode(PIN_BUZZER_" + pin + ", OUTPUT);");
    return "tone(PIN_BUZZER_" + pin + ", " + frequency + ", " + duration + "*1000);" + NEWLINE;
};

// GROVE BUZZER _ STOP FREQUENCY (NOTONE) BLOCK
Blockly.Arduino.actuators_noTone = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Arduino.addDefine('buzzer_module_' + pin, "#define PIN_BUZZER_" + pin + TAB + pin);
    Blockly.Arduino.addSetup("pin_" + pin, "pinMode(PIN_BUZZER_" + pin + ", OUTPUT);");
    return "noTone(PIN_BUZZER_" + pin + ");" + NEWLINE;
};

// GROVE BUZZER _ PLAY MUSIC BLOCK
Blockly.Arduino.actuators_playMusicGroveBuzzer = function (block) {
    const pin = block.getFieldValue("PIN");
    const music = block.getFieldValue("MUSIC");
    Blockly.Arduino.addDefine('buzzer_module_' + pin, "#define PIN_BUZZER_" + pin + TAB + pin);
    Blockly.Arduino.addSetup("pin_" + pin, "pinMode(PIN_BUZZER_" + pin + ", OUTPUT);");
    switch (music) {
        case "0":
            Blockly.Arduino.addFunction('func_music_G', FUNCTIONS_ARDUINO.DEF_BUZZER_GAMME);
            return "BuzzerGamme(PIN_BUZZER_" + pin + ");" + NEWLINE;
        case "1":
            Blockly.Arduino.addFunction('func_music_SW', FUNCTIONS_ARDUINO.DEF_BUZZER_STAR_WARS);
            return "BuzzerStarWars(PIN_BUZZER_" + pin + ");" + NEWLINE;
        case "2":
            Blockly.Arduino.addFunction('func_music_R2D2', FUNCTIONS_ARDUINO.DEF_BUZZER_R2D2);
            return "BuzzerR2D2(PIN_BUZZER_" + pin + ");" + NEWLINE;
        default:
            throw Error("Unhandled music option: " + music);
    }
};

// GROVE VIBRATION MOTOR _ CONTROL STATE BLOCK
Blockly.Arduino.actuators_setWaterAtomizerState = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    Blockly.Arduino.addDefine('water_atomizer_' + pin, "#define PIN_WATER_ATOMIZER_" + pin + TAB + pin);
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(PIN_WATER_ATOMIZER_' + pin + ', OUTPUT);');
    return "digitalWrite(PIN_WATER_ATOMIZER_" + pin + ", " + state + ");" + NEWLINE;
};

// GROVE ELECTROMAGNET _ CONTROL STATE BLOCK
Blockly.Arduino.actuators_setElectromagnetState = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    Blockly.Arduino.addDefine('electromagnet_module_' + pin, "#define PIN_ELECTROMAGNET_" + pin + TAB + pin);
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(PIN_ELECTROMAGNET_' + pin + ', OUTPUT);');
    return "digitalWrite(PIN_ELECTROMAGNET_" + pin + ", " + state + ");" + NEWLINE;
};

// MOSFET

Blockly.Arduino.actuators_mosfet_setState = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_NONE) || 'LOW';
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', OUTPUT);');
    return "analogWrite(" + pin + ", (" + state + " == 0) ? 0 : 255);" + NEWLINE;
};

Blockly.Arduino.actuators_mosfet_setPercentValue = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_NONE) || '0';
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', OUTPUT);');
    return "analogWrite(" + pin + ", 255*" + value + "/100);" + NEWLINE;
};
