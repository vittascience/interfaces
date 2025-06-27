/**
 * @fileoverview Inputs/Outputs generators for Arduino.
 */

Blockly.Arduino.text_comment = function () {
    return "//" + this.getFieldValue("TEXT") + NEWLINE || "" + NEWLINE;
};

Blockly.Arduino.io_wait = function (block) {
    const wait = Blockly.Arduino.valueToCode(block, "TIME", Blockly.Arduino.ORDER_ATOMIC);
    return "delay(" + wait + ");" + NEWLINE;
};

// Pins
Blockly.Arduino.io_digitalPin = function (block) {
    return [block.getFieldValue("PIN"), Blockly.Arduino.ORDER_ATOMIC]
}

Blockly.Arduino.io_analogPin = function (block) {
    return [block.getFieldValue("PIN"), Blockly.Arduino.ORDER_ATOMIC]
}

Blockly.Arduino.io_pinMode = function (block) {
    const pin = block.getFieldValue("PIN");
    const mode = block.getFieldValue("MODE");
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ',' + mode + ');');
    return "";
};

Blockly.Arduino.io_digital_signal = function (block) {
    return [block.getFieldValue("STATE"), Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.io_readDigitalPin = function (block) {
    const pin = block.getFieldValue("PIN");
    return ["digitalRead(" + pin + ")", Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.io_writeDigitalPin = function (block) {
    const pin = Blockly.Arduino.valueToCode(block, "PIN", Blockly.Arduino.ORDER_ATOMIC) || '0';
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    return "digitalWrite(" + pin + ", " + state + ");" + NEWLINE;
};

Blockly.Arduino.io_readAnalogPin = function (block) {
    const pin = block.getFieldValue("PIN");
    return ["analogRead(" + pin + ")", Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.io_writeAnalogPin = function (block) {
    const pin = Blockly.Arduino.valueToCode(block, "PIN", Blockly.Arduino.ORDER_ATOMIC) || '0';
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || '0';
    return "analogWrite(" + pin + ", " + value + ");" + NEWLINE;
};