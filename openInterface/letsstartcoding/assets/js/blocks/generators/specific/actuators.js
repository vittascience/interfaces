/**
 * @fileoverview Actuators generators for Arduino.
 */

// GROVE BUZZER _ PLAY FREQUENCY (TONE) BLOCK
Blockly.Arduino.actuators_tone = function (block) {
    const pin = block.getFieldValue("PIN");
    const frequency = Blockly.Arduino.valueToCode(block, "FREQUENCY", Blockly.Arduino.ORDER_ATOMIC) || "0";
    Blockly.Arduino.addDefine('buzzer_module_' + pin, "#define PIN_BUZZER_" + pin + TAB + pin);
    Blockly.Arduino.addSetup("pin_" + pin, "pinMode(PIN_BUZZER_" + pin + ", OUTPUT);");
    return "tone(PIN_BUZZER_" + pin + ", " + frequency + ");" + NEWLINE;
};

// GROVE BUZZER _ STOP FREQUENCY (NOTONE) BLOCK
Blockly.Arduino.actuators_noTone = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Arduino.addDefine('buzzer_module_' + pin, "#define PIN_BUZZER_" + pin + TAB + pin);
    Blockly.Arduino.addSetup("pin_" + pin, "pinMode(PIN_BUZZER_" + pin + ", OUTPUT);");
    return "noTone(PIN_BUZZER_" + pin + ");" + NEWLINE;
};