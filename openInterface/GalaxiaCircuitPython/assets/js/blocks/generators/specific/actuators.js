/**
 * @fileoverview Actuators generators for Galaxia.
 */

 Blockly.Python.actuators_setServoAngle = function (block) {
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Servo');
    Blockly.Python.addFunction('setServoAngle', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_SERVO_SET_ANGLE);
    return "setServoAngle(" + pinName + ", " + angle + ")" + NEWLINE;
};

Blockly.Python.actuators_continuousServo_setSpeed = function (block) {
    const dir = block.getFieldValue("DIR");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Continuous Servo');
    Blockly.Python.addFunction('setServoSpeed', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_SERVO_SET_SPEED);
    return "setServoSpeed(" + pinName + ", " + dir + ", " + speed + ")" + NEWLINE;
};

Blockly.Python.actuators_setMotorPower = function (block) {
    const value = Blockly.Python.valueToCode(block, "POWER", Blockly.Python.ORDER_NONE) || "0";  
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Motor');
    return pinName + ".duty(int(" + value + "))" + NEWLINE;
};

Blockly.Python.actuators_setVibrationMotorState = function (block) {
    const pin = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Vibration Motor');
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return "digital_write(" + pin + ", " + state + ")" + NEWLINE;
};

Blockly.Python.actuators_setGroveRelayState = function (block) {
    const pin = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Relay');
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return "digital_write(" + pin + ", " + state + ")" + NEWLINE;
};

Blockly.Python.actuators_playMusicGroveBuzzer = function (block) {
    const pin = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Buzzer');
    const music = block.getFieldValue("MUSIC");
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('pitch', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BUZZER_PITCH);
    switch (music) {
        case "CARRIBEAN_PIRATES":
            Blockly.Python.addFunction('BuzzerCarribeanPirates', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BUZZER_CARRIBEAN_PIRATES);
            return "BuzzerCarribeanPirates(" + pin + ")" + NEWLINE;
        case "GAMME":
            Blockly.Python.addFunction('BuzzerGamme', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BUZZER_GAMME);
            return "BuzzerGamme(" + pin + ")" + NEWLINE;
        case "SW":
            Blockly.Python.addFunction('BuzzerStarWars', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BUZZER_STAR_WARS);
            return "BuzzerStarWars(" + pin + ")" + NEWLINE;
        case "R2D2":
            Blockly.Python.addFunction('BuzzerR2D2', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BUZZER_R2D2);
            return "BuzzerR2D2(" + pin + ")" + NEWLINE;
        default:
            throw Error("Unhandled music option: " + music);
    }
};