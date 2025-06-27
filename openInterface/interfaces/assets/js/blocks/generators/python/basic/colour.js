/**
 * @fileoverview Colour generators for Python interfaces.
 */

Blockly.Python.colour_picker = function (block) {
    let colourCode = block.getFieldValue("COLOUR"),
        R = hexToR(colourCode),
        G = hexToG(colourCode),
        B = hexToB(colourCode);
    return ['(' + R + ', ' + G + ', ' + B + ')', Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.colour_random = function () {
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    return ["'#%06x' % random.randint(0, 2**24 - 1)", Blockly.Python.ORDER_FUNCTION_CALL]
};

Blockly.Python.colour_rgb = function (block) {
    Blockly.Python.addFunction('colour_rgb', FUNCTIONS.DEF_COLOUR_RGB);
    let R = Blockly.Python.valueToCode(block, "RED", Blockly.Python.ORDER_NONE) || "0",
        G = Blockly.Python.valueToCode(block, "GREEN", Blockly.Python.ORDER_NONE) || "0",
        B = Blockly.Python.valueToCode(block, "BLUE", Blockly.Python.ORDER_NONE) || "0";
    return ["colour_rgb(" + R + ", " + G + ", " + B + ")", Blockly.Python.ORDER_FUNCTION_CALL]
};

Blockly.Python.colour_blend = function (block) {
    Blockly.Python.addFunction('colour_blend', FUNCTIONS.DEF_COLOUR_BLEND);
    let color1 = Blockly.Python.valueToCode(block, "COLOUR1", Blockly.Python.ORDER_NONE) || "'#000000'",
        color2 = Blockly.Python.valueToCode(block, "COLOUR2", Blockly.Python.ORDER_NONE) || "'#000000'",
        ratio = Blockly.Python.valueToCode(block, "RATIO", Blockly.Python.ORDER_NONE) || "0";
    return ["colour_blend(" + color1 + ", " + color2 + ", " + ratio + ")", Blockly.Python.ORDER_FUNCTION_CALL]
};