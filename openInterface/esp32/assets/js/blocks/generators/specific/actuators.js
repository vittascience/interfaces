/**
 * @fileoverview Actuators generators for Esp32.
 */

// Motors

Blockly.Python.actuators_setServoAngle = function (block) {
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Servo', 50, 26);
    Blockly.Python.addFunction('setServoAngle', FUNCTIONS_ESP32.DEF_SERVO_SET_ANGLE);
    return "setServoAngle(" + pinName + ", " + angle + ")" + NEWLINE;
};

Blockly.Python.actuators_continuousServo_setSpeed = function (block) {
    const dir = block.getFieldValue("DIR");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Continuous Servo', 50, 76);
    Blockly.Python.addFunction('setServoSpeed', FUNCTIONS_ESP32.DEF_SERVO_SET_SPEED);
    return "setServoSpeed(" + pinName + ", " + dir + ", " + speed + ")" + NEWLINE;
};

Blockly.Python.actuators_setMotorPower = function (block) {
    const value = Blockly.Python.valueToCode(block, "POWER", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Motor');
    return pinName + ".duty(int(" + value + "))" + NEWLINE;
};

Blockly.Python.actuators_setVibrationMotorState = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Vibration Motor');
    return 'try:' + NEWLINE + '  ' + (state == '1' ? pinName + ".on()" : pinName + ".off()") + NEWLINE + 'except:' + NEWLINE + '  ' + (state == '1' ? pinName + ".duty(" + PWM_MAX_DUTY + ")" : pinName + ".duty(0)") + NEWLINE;
};

Blockly.Python.actuators_setGroveRelayState = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Grove Relay');
    return 'try:' + NEWLINE + '  ' + (state == '1' ? pinName + ".on()" : pinName + ".off()") + NEWLINE + 'except:' + NEWLINE + '  ' + (state == '1' ? pinName + ".duty(" + PWM_MAX_DUTY + ")" : pinName + ".duty(0)") + NEWLINE;
};

// PCA9685

Blockly.Python.actuators_pca9685_setPwmFrequency = function (block) {
    const frequency = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('esp32_pca9685', IMPORT_ESP32_PCA9685);
    Blockly.Python.addInit('pca9685', "pca9685 = PCA9685Driver(scl_pin=22, sda_pin=21)");
    return "pca9685.set_pwm_frequency(" + frequency + ")" + NEWLINE;
};

Blockly.Python.actuators_pca9685_setPwmDutyCyclePercent = function (block) {
    const channel = block.getFieldValue("CHANNEL");
    const duty = Blockly.Python.valueToCode(block, "DUTY", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('esp32_pca9685', IMPORT_ESP32_PCA9685);
    Blockly.Python.addInit('pca9685', "pca9685 = PCA9685Driver(scl_pin=22, sda_pin=21)");
    return "pca9685.set_pwm_dc_percent(" + channel + ", " + duty + ")" + NEWLINE;
};

Blockly.Python.actuators_pca9685_setPwmDutyCycleOnTime = function (block) {
    const channel = block.getFieldValue("CHANNEL");
    const onTime = Blockly.Python.valueToCode(block, "ON_TIME", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('esp32_pca9685', IMPORT_ESP32_PCA9685);
    Blockly.Python.addInit('pca9685', "pca9685 = PCA9685Driver(scl_pin=22, sda_pin=21)");
    return "pca9685.set_pwm_dc_ontime(" + channel + ", " + onTime + ")" + NEWLINE;
};

Blockly.Python.actuators_pca9685_setPwmDutyCycle = function (block) {
    const channel = block.getFieldValue("CHANNEL");
    const falling_edge_cnt = Blockly.Python.valueToCode(block, "FALLING_EDGE_CNT", Blockly.Python.ORDER_NONE) || "0";
    const rising_edge_cnt = Blockly.Python.valueToCode(block, "RISING_EDGE_CNT", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('esp32_pca9685', IMPORT_ESP32_PCA9685);
    Blockly.Python.addInit('pca9685', "pca9685 = PCA9685Driver(scl_pin=22, sda_pin=21)");
    return "pca9685.set_pwm_dc(" + channel + ", " + falling_edge_cnt + ", " + rising_edge_cnt + ")" + NEWLINE;
};

Blockly.Python.actuators_pca9685_setServoAngle = function (block) {
    const channel = block.getFieldValue("CHANNEL");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('esp32_pca9685', IMPORT_ESP32_PCA9685);
    Blockly.Python.addInit('pca9685', "pca9685 = PCA9685Driver(scl_pin=22, sda_pin=21)");
    return "pca9685.servo_set_angle(" + channel + ", " + angle + ")" + NEWLINE;
};

Blockly.Python.actuators_pca9685_setServoAngleCustom = function (block) {
    const channel = block.getFieldValue("CHANNEL");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const min_pulse = Blockly.Python.valueToCode(block, "MIN_PULSE", Blockly.Python.ORDER_NONE) || "0";
    const max_pulse = Blockly.Python.valueToCode(block, "MAX_PULSE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('esp32_pca9685', IMPORT_ESP32_PCA9685);
    Blockly.Python.addInit('pca9685', "pca9685 = PCA9685Driver(scl_pin=22, sda_pin=21)");
    return "pca9685.servo_set_angle_custom(" + channel + ", " + angle + ", " + min_pulse + ",  " + max_pulse + ")" + NEWLINE;
};

// MOSFET

Blockly.Python.actuators_mosfet_setState = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Mosfet', 1000);
    return "try:" + NEWLINE 
        + "  " + pinName + ".duty(int(" + state + "*" + PWM_MAX_DUTY + "))" + NEWLINE 
        + 'except:' + NEWLINE 
        + '  ' + pinName + " = PWM(Pin(" + pin.replace('p', '') + "), freq=5000, duty=int(" + state + "*" + PWM_MAX_DUTY + "))" + NEWLINE;
};

Blockly.Python.actuators_mosfet_setPercentValue = function (block) {
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Mosfet', 1000);
    return "try:" + NEWLINE 
        + "  " + pinName + ".duty(int(" + value + "/100.0*" + PWM_MAX_DUTY + "))" + NEWLINE 
        + 'except:' + NEWLINE 
        + '  ' + pinName + " = PWM(Pin(" + pinName.replace('p', '') + "), freq=5000, duty=int(" + value + "/100.0*" + PWM_MAX_DUTY + "))" + NEWLINE;
};

Blockly.Python.actuators_mosfet_setFrequency = function (block) {
    const frequency = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Mosfet', 1000);
    return "try:" + NEWLINE 
        + "  " + pinName + ".freq(" + frequency + ")" + NEWLINE 
        + "  " + pinName + ".duty(512)" + NEWLINE 
        + "  " + pinName + ".init()" + NEWLINE 
        + "except:" + NEWLINE 
        + "  " + pinName + " = PWM(Pin(" + pinName.replace('p', '') + "), freq=" + frequency + ", duty=512)" + NEWLINE;
};

// Buzzer / Speaker

Blockly.Python.actuators_playMusicGroveBuzzer = function (block) {
    const music = block.getFieldValue("MUSIC");
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Buzzer');
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('pitch', FUNCTIONS_ESP32.DEF_BUZZER_PITCH);
    switch (music) {
        case "CARRIBEAN_PIRATES":
            Blockly.Python.addFunction('BuzzerCarribeanPirates', FUNCTIONS_ESP32.DEF_BUZZER_CARRIBEAN_PIRATES);
            return "BuzzerCarribeanPirates(" + pinName + ")" + NEWLINE;
        case "GAMME":
            Blockly.Python.addFunction('BuzzerGamme', FUNCTIONS_ESP32.DEF_BUZZER_GAMME);
            return "BuzzerGamme(" + pinName + ")" + NEWLINE;
        case "SW":
            Blockly.Python.addFunction('BuzzerStarWars', FUNCTIONS_ESP32.DEF_BUZZER_STAR_WARS);
            return "BuzzerStarWars(" + pinName + ")" + NEWLINE;
        case "R2D2":
            Blockly.Python.addFunction('BuzzerR2D2', FUNCTIONS_ESP32.DEF_BUZZER_R2D2);
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
    Blockly.Python.addFunction('pitch', FUNCTIONS_ESP32.DEF_BUZZER_PITCH);
    Blockly.Python.addFunction('buzzer_playNotes', FUNCTIONS_ESP32.DEF_BUZZER_PLAY_NOTES);
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
    Blockly.Python.addFunction('pitch', FUNCTIONS_ESP32.DEF_BUZZER_PITCH);
    return "pitch(" + pinName + ", " + freq + ", " + duration + ")" + NEWLINE;
};

Blockly.Python.actuators_music_stop = function (block) {
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Buzzer');
    return pinName + ".off()" + NEWLINE;
};

Blockly.Python.actuators_setElectromagnetState = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Electromagnet');
    return 'try:' + NEWLINE + '  ' + (state == '1' ? pinName + ".on()" : pinName + ".off()") + NEWLINE + 'except:' + NEWLINE + '  ' + (state == '1' ? pinName + ".duty(" + PWM_MAX_DUTY + ")" : pinName + ".duty(0)") + NEWLINE;
};

Blockly.Python.actuators_setWaterAtomizerState = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Water Atomization');
    return 'try:' + NEWLINE + '  ' + (state == '1' ? pinName + ".on()" : pinName + ".off()") + NEWLINE + 'except:' + NEWLINE + '  ' + (state == '1' ? pinName + ".duty(" + PWM_MAX_DUTY + ")" : pinName + ".duty(0)") + NEWLINE;
};