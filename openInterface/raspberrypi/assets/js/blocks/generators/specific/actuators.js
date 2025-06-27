/**
 * @fileoverview Actuators generators for Raspberrypi.
 */



Blockly.Python.actuators_music_playFrequency = function (block) {
    const pinName = block.getFieldValue("PIN");
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('grove_buzzer', IMPORT_GROVE_BUZZER);
    Blockly.Python.addInit('buzzer', 'buzzer = GroveBuzzer(' + pinName + ')' + NEWLINE);
    return `buzzer.pitch(${freq}, ${duration/1000})` + NEWLINE;
};

// Blockly.Python.actuators_music_stop = function (block) {
//     const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Buzzer');
//     return pinName + ".off()" + NEWLINE;
// };