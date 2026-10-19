/**
 * @fileoverview Display generators for primaSTEM.
 */

Blockly.Python.display_setLed = function (block) {
    Blockly.Python.addImport('primastem', IMPORT_PRIMASTEM);
    const color = block.getFieldValue("COLOR");
    const led = block.getFieldValue("LED");
    return `primastem.setLed("${led}", "${color}")` + NEWLINE;
};