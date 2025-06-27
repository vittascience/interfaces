/**
 * @fileoverview Colour generators for mBot.
 */

Blockly.Arduino.colour_picker = function (block) {
    let colourCode = block.getFieldValue("COLOUR"),
        R = hexToR(colourCode),
        G = hexToG(colourCode),
        B = hexToB(colourCode);
    return [R + ', ' + G + ', ' + B, Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.colour_random = Blockly.Arduino.noGeneratorCodeInline;
Blockly.Arduino.colour_rgb = Blockly.Arduino.noGeneratorCodeInline;
Blockly.Arduino.colour_blend = Blockly.Arduino.noGeneratorCodeInline;
