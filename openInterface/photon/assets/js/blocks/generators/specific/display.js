/**
 * @fileoverview Display generators for Photon.
 */

Blockly.Python.display_change_color = function (block) {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    Blockly.Python.addImport('Color', IMPORT_COLOR);
    Blockly.Python.addImport('ColorMode', IMPORT_COLOR_MODE);
    const color = block.getFieldValue("COLOR");
    const mode = block.getFieldValue("MODE");
    return `photon.change_color(Color.${color.toLowerCase()}, ColorMode.${mode})` + NEWLINE;
};

Blockly.Python.display_change_color_rgb = function (block) {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    Blockly.Python.addImport('ColorMode', IMPORT_COLOR_MODE);
    const red = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE);
    const green = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE);
    const blue = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE);
    const mode = block.getFieldValue("MODE");
    return `photon.change_color_rgb(${red}, ${green}, ${blue}, ColorMode.${mode})` + NEWLINE;
};

Blockly.Python.display_change_color_rgb_palette = function (block) {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    Blockly.Python.addImport('ColorMode', IMPORT_COLOR_MODE);
    const colour = Blockly.Python.valueToCode(block, "COLOUR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    const mode = block.getFieldValue("MODE");
    return `photon.change_color_rgb(${colour[0]},${colour[1]},${colour[2]}, ColorMode.${mode})` + NEWLINE;
};