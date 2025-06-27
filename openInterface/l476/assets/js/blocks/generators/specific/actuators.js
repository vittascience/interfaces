/**
 * @fileoverview Actuators generators for L476.
 */

Blockly.Python.actuators_setServoAngle = function (block) {
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Servo', 50);
    const pwmName = "pwm_" + pinName;
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addFunction('setServoAngle', FUNCTIONS_L476.DEF_SERVO_SET_ANGLE);
    return "setServoAngle(" + pwmName + ", " + angle + ")" + NEWLINE;
};

Blockly.Python.actuators_continuousServo_setSpeed = function (block) {
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    const direction = block.getFieldValue("DIR");
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Continuous Servo', 50);
    const pwmName = "pwm_" + pinName;
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addFunction('setServoSpeed', FUNCTIONS_L476.DEF_SERVO_SET_SPEED);
    return "setServoSpeed(" + pwmName + ", " + direction + ", " + speed + ")" + NEWLINE;
};

Blockly.Python.actuators_setMotorPower = function (block) {
    const value = Blockly.Python.valueToCode(block, "POWER", Blockly.Python.ORDER_NONE) || "0";
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Motor');
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    return "pwm_" + pinName + ".pulse_width_percent(" + value + ")" + NEWLINE;
};

Blockly.Python.actuators_setVibrationMotorState = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Vibration Motor');
    return 'try:' + NEWLINE + '  ' + (state == '1' ? pinName + ".high()" : pinName + ".low()") + NEWLINE + 'except:' + NEWLINE + '  ' + (state == '1' ? pinName + ".value(1)" : pinName + ".value(0)") + NEWLINE;
};

Blockly.Python.actuators_setGroveRelayState = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Grove Relay');
    return 'try:' + NEWLINE + '  ' + (state == '1' ? pinName + ".high()" : pinName + ".low()") + NEWLINE + 'except:' + NEWLINE + '  ' + (state == '1' ? pinName + ".value(1)" : pinName + ".value(0)") + NEWLINE;
};

// MOSFET

Blockly.Python.actuators_mosfet_setState = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pull = block.getFieldValue("PULL") || "OUT_PP";
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Mosfet', 100, pull);
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    return "pwm_" + pinName + ".pulse_width_percent(" + ((state == "1" || state == "True") ? "100" : "0")  + ")" + NEWLINE;
};

Blockly.Python.actuators_mosfet_setPercentValue = function (block) {
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const pull = block.getFieldValue("PULL") || "OUT_PP";
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Mosfet', 100, pull);
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    return "pwm_" + pinName + ".pulse_width_percent(" + value + ")" + NEWLINE;
};

Blockly.Python.actuators_mosfet_setFrequency = function (block) {
    const frequency = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const pull = block.getFieldValue("PULL") || "OUT_PP";
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Mosfet', 100, pull);
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addPowerOn('pwm_freq_init_' + pinName, "pwm_" + pinName + ".pulse_width_percent(50)" + NEWLINE);
    return "tim_" + pinName + ".freq(int(" + frequency + "))" + NEWLINE;
};

// Music

Blockly.Python.actuators_playMusicGroveBuzzer = function (block) {
    const music = block.getFieldValue("MUSIC");
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Buzzer');
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('pitch', FUNCTIONS_L476.DEF_BUZZER_PITCH);
    switch (music) {
        case "CARRIBEAN_PIRATES":
            Blockly.Python.addFunction('BuzzerCarribeanPirates', FUNCTIONS_L476.DEF_BUZZER_CARRIBEAN_PIRATES);
            return "BuzzerCarribeanPirates(" + pinName + ")" + NEWLINE;
        case "GAMME":
            Blockly.Python.addFunction('BuzzerGamme', FUNCTIONS_L476.DEF_BUZZER_GAMME);
            return "BuzzerGamme(" + pinName + ")" + NEWLINE;
        case "SW":
            Blockly.Python.addFunction('BuzzerStarWars', FUNCTIONS_L476.DEF_BUZZER_STAR_WARS);
            return "BuzzerStarWars(" + pinName + ")" + NEWLINE;
        case "R2D2":
            Blockly.Python.addFunction('BuzzerR2D2', FUNCTIONS_L476.DEF_BUZZER_R2D2);
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
    Blockly.Python.addFunction('pitch', FUNCTIONS_L476.DEF_BUZZER_PITCH);
    Blockly.Python.addFunction('buzzer_playNotes', FUNCTIONS_L476.DEF_BUZZER_PLAY_NOTES);
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
    Blockly.Python.addFunction('pitch', FUNCTIONS_L476.DEF_BUZZER_PITCH);
    return "pitch(" + pinName + ", " + freq + ", " + duration + ")" + NEWLINE;
};

Blockly.Python.actuators_music_stop = function (block) {
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Buzzer');
    return pinName + ".off()" + NEWLINE;
};