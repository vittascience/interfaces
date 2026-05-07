/**
 * @fileoverview Actuators generators for Raspberry Pi.
 */

// Motors

Blockly.Python.actuators_setServoAngle = function (block) {
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const pwmName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Servo', 50, 2.5);
    Blockly.Python.addFunction('setServoAngle', FUNCTIONS_RASPBERRY.DEF_SERVO_SET_ANGLE);
    return "setServoAngle(" + pwmName + ", " + angle + ")" + NEWLINE;
};

Blockly.Python.actuators_continuousServo_setSpeed = function (block) {
    const dir = block.getFieldValue("DIR");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    const pwmName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Continuous Servo', 50, 7.5);
    Blockly.Python.addFunction('setServoSpeed', FUNCTIONS_RASPBERRY.DEF_SERVO_SET_SPEED);
    return "setServoSpeed(" + pwmName + ", " + dir + ", " + speed + ")" + NEWLINE;
};

Blockly.Python.actuators_setMotorPower = function (block) {
    const value = Blockly.Python.valueToCode(block, "POWER", Blockly.Python.ORDER_NONE) || "0";
    const pwmName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Motor', 5000);
    return pwmName + ".ChangeDutyCycle(" + value + ")" + NEWLINE;
};

Blockly.Python.actuators_setVibrationMotorState = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Vibration Motor');
    return 'GPIO.output(' + pinName + ", " + state + ")" + NEWLINE;
};

Blockly.Python.actuators_setGroveRelayState = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Grove Relay');
    return 'GPIO.output(' + pinName + ", " + state + ")" + NEWLINE;
};

// MOSFET

Blockly.Python.actuators_mosfet_setState = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pwmName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Mosfet', 1000);
    return pwmName + ".ChangeDutyCycle(" + state + "*100)" + NEWLINE;
};

Blockly.Python.actuators_mosfet_setPercentValue = function (block) {
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const pwmName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Mosfet', 1000);
    return pwmName + ".ChangeDutyCycle(" + value + ")" + NEWLINE;
};

Blockly.Python.actuators_mosfet_setFrequency = function (block) {
    const frequency = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const pwmName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Mosfet', 1000);
    return pwmName + ".ChangeFrequency(" + frequency + ")" + NEWLINE + pwmName + ".ChangeDutyCycle(50)" + NEWLINE;
};

// Buzzer / Speaker

Blockly.Python.actuators_playMusicGroveBuzzer = function (block) {
    const music = block.getFieldValue("MUSIC");
    const pwmName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Buzzer');
    Blockly.Python.addImport('utime', IMPORT_TIME);
    Blockly.Python.addFunction('pitch', FUNCTIONS_RASPBERRY.DEF_BUZZER_PITCH);
    switch (music) {
        case "CARRIBEAN_PIRATES":
            Blockly.Python.addFunction('BuzzerCarribeanPirates', FUNCTIONS_RASPBERRY.DEF_BUZZER_CARRIBEAN_PIRATES);
            return "BuzzerCarribeanPirates(" + pwmName + ")" + NEWLINE;
        case "GAMME":
            Blockly.Python.addFunction('BuzzerGamme', FUNCTIONS_RASPBERRY.DEF_BUZZER_GAMME);
            return "BuzzerGamme(" + pwmName + ")" + NEWLINE;
        case "SW":
            Blockly.Python.addFunction('BuzzerStarWars', FUNCTIONS_RASPBERRY.DEF_BUZZER_STAR_WARS);
            return "BuzzerStarWars(" + pwmName + ")" + NEWLINE;
        case "R2D2":
            Blockly.Python.addFunction('BuzzerR2D2', FUNCTIONS_RASPBERRY.DEF_BUZZER_R2D2);
            return "BuzzerR2D2(" + pwmName + ")" + NEWLINE;
        default:
            throw Error("Unhandled music option: " + music);
    }
};

Blockly.Python.actuators_music_playNotes = function (block) {
    const pwmName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Buzzer');
    const notes = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        notes[i] = Blockly.Python.valueToCode(block, "ADD" + i, Blockly.Python.ORDER_NONE) || "None";
    }
    Blockly.Python.addImport('utime', IMPORT_TIME);
    Blockly.Python.addFunction('pitch', FUNCTIONS_RASPBERRY.DEF_BUZZER_PITCH);
    Blockly.Python.addFunction('buzzer_playNotes', FUNCTIONS_RASPBERRY.DEF_BUZZER_PLAY_NOTES);
    return "buzzer_playNotes(" + pwmName + ", [" + notes.join(", ") + "])" + NEWLINE;
};

Blockly.Python.actuators_music_note = function (block) {
    const note = block.getFieldValue("NOTE");
    let octave = block.getFieldValue("OCTAVE");
    if (octave == "4") octave = "";
    let duration = ":" + block.getFieldValue("DURATION");
    if (duration == ":1") duration = "";
    return ["'" + note + octave + duration + "'", Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.actuators_music_playFrequency = function (block) {
    const pwmName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Buzzer');
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('utime', IMPORT_TIME);
    Blockly.Python.addFunction('pitch', FUNCTIONS_RASPBERRY.DEF_BUZZER_PITCH);
    return "pitch(" + pwmName + ", " + freq + ", " + duration + ")" + NEWLINE;
};

Blockly.Python.actuators_music_stop = function (block) {
    const pwmName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Buzzer');
    return pwmName + ".stop()" + NEWLINE;
};

