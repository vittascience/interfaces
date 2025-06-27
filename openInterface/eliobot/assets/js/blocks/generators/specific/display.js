/**
 * @fileoverview Display generators for Esp32.
 */

// Esp32

// Définition du code du bloc LED RGB
Blockly.Python.display_controlBuiltInLED = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addInit('LED','# Built in Neopixel declaration \npixels = neopixel.NeoPixel(NEOPIXEL, 1, brightness=0.2, auto_write=False, pixel_order=neopixel.GRB)');
    const rgb = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
        code = 'pixels.fill((' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + '))\npixels.show()';
    return code + NEWLINE;
};

Blockly.Python.display_controlBuiltInLEDOff = function () {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addInit('LED','# Built in Neopixel declaration \npixels = neopixel.NeoPixel(NEOPIXEL, 1, brightness=0.2, auto_write=False, pixel_order=neopixel.GRB)');
    const code = 'pixels.fill((0, 0, 0))\npixels.show()\n';
    return code + NEWLINE;
};