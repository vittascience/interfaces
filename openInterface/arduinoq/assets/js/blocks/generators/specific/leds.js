/**
 * @fileoverview LED generators of the Arduino UNO Q sketch.
 * The LEDs of the board are active low: LOW turns them on.
 */

// The built-in LED of the UNO Q is the red of the RGB LED 3 (LED_BUILTIN), not an LED on D13
Blockly.Arduino.io_control_arduino_led = function (block) {
    Blockly.Arduino.addSetup('led_builtin', "pinMode(LED_BUILTIN, OUTPUT);", !1);
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_EQUALITY) || 'LOW';
    return "digitalWrite(LED_BUILTIN, " + state + " == HIGH ? LOW : HIGH);" + NEWLINE;
};

Blockly.Arduino.display_unoq_rgbLed = function (block) {
    const led = block.getFieldValue("LED");
    const color = block.getFieldValue("COLOR");
    let code = "";
    ['R', 'G', 'B'].forEach((channel, i) => {
        const pin = "LED" + led + "_" + channel;
        Blockly.Arduino.addSetup('pin_' + pin, "pinMode(" + pin + ", OUTPUT);", !1);
        code += "digitalWrite(" + pin + ", " + (color[i] === '1' ? "LOW" : "HIGH") + ");" + NEWLINE;
    });
    return code;
};
