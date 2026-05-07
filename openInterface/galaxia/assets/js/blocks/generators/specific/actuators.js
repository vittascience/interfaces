/**
 * @fileoverview Actuators generators for Esp32.
 */

// Motors

Blockly.Python.actuators_setServoAngle = function (block) {
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Servo', 50, 205);
    Blockly.Python.addFunction('writePWM', FUNCTIONS_GALAXIA.DEF_WRITE_WPM);
    Blockly.Python.addFunction('setServoAngle', FUNCTIONS_GALAXIA.DEF_SERVO_SET_ANGLE);
    return "setServoAngle(" + pinName + ", " + angle + ")" + NEWLINE;
};

Blockly.Python.actuators_continuousServo_setSpeed = function (block) {
    const dir = block.getFieldValue("DIR");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Continuous Servo', 50, 76);
    Blockly.Python.addFunction('writePWM', FUNCTIONS_GALAXIA.DEF_WRITE_WPM);
    Blockly.Python.addFunction('setServoSpeed', FUNCTIONS_GALAXIA.DEF_SERVO_SET_SPEED);
    return "setServoSpeed(" + pinName + ", " + dir + ", " + speed + ")" + NEWLINE;
};

Blockly.Python.actuators_setMotorPower = function (block) {
    const value = Blockly.Python.valueToCode(block, "POWER", Blockly.Python.ORDER_NONE) || "0";  
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Motor', 1000);
    Blockly.Python.addFunction('writePWM', FUNCTIONS_GALAXIA.DEF_WRITE_WPM);
    return "writePWM(" + pinName + ", " + value + ")" + NEWLINE;
};

Blockly.Python.actuators_setVibrationMotorState = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Vibration Motor');
    Blockly.Python.addFunction('writeDigital', FUNCTIONS_GALAXIA.DEF_WRITE_DIGITAL);
    return "writeDigital(" + pinName + ", " + state + ")" + NEWLINE;
};

Blockly.Python.actuators_setGroveRelayState = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Grove Relay');
    Blockly.Python.addFunction('writeDigital', FUNCTIONS_GALAXIA.DEF_WRITE_DIGITAL);
    return "writeDigital(" + pinName + ", " + state + ")" + NEWLINE;
};

// Kitronik

Blockly.Python.actuators_kitronik_controlMotor = function (block) {
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    const motor = block.getFieldValue("MOTOR");
    const direction = block.getFieldValue('DIR');
    Blockly.Python.Generators.pwm('p21');
    Blockly.Python.Generators.pwm('p38');
    Blockly.Python.Generators.pwm('p3');
    Blockly.Python.Generators.pwm('p15');
    Blockly.Python.addFunction('writeDigital', FUNCTIONS_GALAXIA.DEF_WRITE_DIGITAL);
    Blockly.Python.addFunction('writePWM', FUNCTIONS_GALAXIA.DEF_WRITE_WPM);
    Blockly.Python.addFunction('kitronik_controlMotor', FUNCTIONS_GALAXIA.DEF_KITRONIK_CONTROL_MOTOR);
    if (motor === "BOTH") {
        return "kitronik_controlMotor(1, " + direction + ", " + speed + ")" + NEWLINE +
            "kitronik_controlMotor(2, " + direction + ", " + speed + ")" + NEWLINE;
    } else {
        return "kitronik_controlMotor(" + motor + ", " + direction + ", " + speed + ")" + NEWLINE
    }
};

Blockly.Python.actuators_kitronik_stopMotor = function (block) {
    const motor = block.getFieldValue("MOTOR");
    Blockly.Python.Generators.pwm('p21');
    Blockly.Python.Generators.pwm('p38');
    Blockly.Python.Generators.pwm('p3');
    Blockly.Python.Generators.pwm('p15');
    Blockly.Python.addFunction('writeDigital', FUNCTIONS_GALAXIA.DEF_WRITE_DIGITAL);
    Blockly.Python.addFunction('writePWM', FUNCTIONS_GALAXIA.DEF_WRITE_WPM);
    Blockly.Python.addFunction('kitronik_stopMotor', FUNCTIONS_GALAXIA.DEF_KITRONIK_STOP_MOTORS);
    if (motor === "BOTH") {
        return "kitronik_stopMotor(1)" + NEWLINE + "kitronik_stopMotor(2)" + NEWLINE;
    } else {
        return "kitronik_stopMotor(" + motor + ")" + NEWLINE;
    }
};

Blockly.Python.actuators_kitronikShield_setServoAngle = function (block) {
    Blockly.Python.addImport('kitronik_servo_driver', IMPORT_KITRONIK_SERVO_DRIVER);
    Blockly.Python.addInit("kitronik-servoBoard", "servoBoard = KitronikServoBoard(I2C(scl=Pin(13), sda=Pin(14)))");
    const servo = Blockly.Python.valueToCode(block, "SERVO", Blockly.Python.ORDER_NONE) || "1";
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    return `servoBoard.servo_write(${servo}, ${angle})` + NEWLINE;
};

// Music

Blockly.Python.actuators_playMusicGroveBuzzer = function (block) {
    const music = block.getFieldValue("MUSIC"); 
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Buzzer');
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('writeDigital', FUNCTIONS_GALAXIA.DEF_WRITE_DIGITAL);
    Blockly.Python.addFunction('pitch', FUNCTIONS_GALAXIA.DEF_BUZZER_PITCH);
    switch (music) {
        case "CARRIBEAN_PIRATES":
            Blockly.Python.addFunction('BuzzerCarribeanPirates', FUNCTIONS_GALAXIA.DEF_BUZZER_CARRIBEAN_PIRATES);
            return "BuzzerCarribeanPirates(" + pinName + ")" + NEWLINE;
        case "GAMME":
            Blockly.Python.addFunction('BuzzerGamme', FUNCTIONS_GALAXIA.DEF_BUZZER_GAMME);
            return "BuzzerGamme(" + pinName + ")" + NEWLINE;
        case "SW":
            Blockly.Python.addFunction('BuzzerStarWars', FUNCTIONS_GALAXIA.DEF_BUZZER_STAR_WARS);
            return "BuzzerStarWars(" + pinName + ")" + NEWLINE;
        case "R2D2":
            Blockly.Python.addFunction('BuzzerR2D2', FUNCTIONS_GALAXIA.DEF_BUZZER_R2D2);
            return "BuzzerR2D2(" + pinName + ")" + NEWLINE;
        default:
            throw Error("Unhandled music option: " + music);
    }
};

Blockly.Python.actuators_music_playNotes = function (block) {
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Buzzer');
    var notes = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        notes[i] = Blockly.Python.valueToCode(block, "ADD" + i, Blockly.Python.ORDER_NONE) || "None";
    }
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('writeDigital', FUNCTIONS_GALAXIA.DEF_WRITE_DIGITAL);
    Blockly.Python.addFunction('pitch', FUNCTIONS_GALAXIA.DEF_BUZZER_PITCH);
    Blockly.Python.addFunction('buzzer_playNotes', FUNCTIONS_GALAXIA.DEF_BUZZER_PLAY_NOTES);
    return "buzzer_playNotes(" + pinName + ", [" + notes.join(", ") + "])" + NEWLINE;
};

Blockly.Python.actuators_music_note = function (block) {
    var note = block.getFieldValue("NOTE");
    var octave = block.getFieldValue("OCTAVE");
    if (octave == "4") octave = "";
    var duration = ":" + block.getFieldValue("DURATION");
    if (duration == ":1") duration = "";
    return ["'" + note + octave + duration + "'", Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.actuators_music_playFrequency = function (block) {
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Buzzer');
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('writeDigital', FUNCTIONS_GALAXIA.DEF_WRITE_DIGITAL);
    Blockly.Python.addFunction('pitch', FUNCTIONS_GALAXIA.DEF_BUZZER_PITCH);
    return "pitch(" + pinName + ", " + freq + ", " + duration + ")" + NEWLINE;
};

Blockly.Python.actuators_music_stop = function (block) {
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Buzzer');
    Blockly.Python.addFunction('writeDigital', FUNCTIONS_GALAXIA.DEF_WRITE_DIGITAL);
    return "writeDigital(" + pinName + ", False)" + NEWLINE;
};
