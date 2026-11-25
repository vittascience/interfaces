/**
 * @fileoverview Display generators for Matatalab.
 */

Blockly.Python.display_setEyesColor = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const eye = block.getFieldValue("EYE");
    const color = block.getFieldValue("COLOR");
    const level = Blockly.Python.valueToCode(block, "LEVEL", Blockly.Python.ORDER_NONE) || "6";
    return `matatalab.set_eyes_color("${eye}", "${color}", ${level})` + NEWLINE;
};

Blockly.Python.display_setEyes = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const eye = block.getFieldValue("EYE");
    const color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0, 0, 0)";
    return `matatalab.set_eyes("${eye}", ${color})` + NEWLINE;
};

Blockly.Python.display_clearEyes = function () {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    return `matatalab.eyes_off()` + NEWLINE;
};
