/**
 * @fileoverview Display generators for Lego Spike Prime.
 */

Blockly.Python.display_show_leds = function (block) {
    Blockly.Python.addImport('light_matrix', IMPORT_LIGHT_MATRIX);
    const pixels = [];
    for (let row = 0; row < 5; row++) {
        for (let column = 0; column < 5; column++) {
            pixels.push(block.getFieldValue("LED" + row + "" + column) === "TRUE" ? 100 : 0);
        }
    }
    return `light_matrix.show([${pixels.join(", ")}])` + NEWLINE;
};

Blockly.Python.display_show_image = function (block) {
    Blockly.Python.addImport('light_matrix', IMPORT_LIGHT_MATRIX);
    return `light_matrix.show_image(light_matrix.IMAGE_${block.getFieldValue("IMAGE")})` + NEWLINE;
};

Blockly.Python.display_write = function (block) {
    Blockly.Python.addImport('light_matrix', IMPORT_LIGHT_MATRIX);
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    return `await light_matrix.write(${Blockly.Constants.Utils.isInputTextBlock(block, "TEXT") ? text : `str(${text})`})` + NEWLINE;
};

Blockly.Python.display_set_pixel = function (block) {
    Blockly.Python.addImport('light_matrix', IMPORT_LIGHT_MATRIX);
    const x = legoPrimeInt(block, "X");
    const y = legoPrimeInt(block, "Y");
    const intensity = legoPrimeInt(block, "INTENSITY", "100");
    return `light_matrix.set_pixel(${x}, ${y}, ${intensity})` + NEWLINE;
};

Blockly.Python.display_clear = function () {
    Blockly.Python.addImport('light_matrix', IMPORT_LIGHT_MATRIX);
    return "light_matrix.clear()" + NEWLINE;
};

Blockly.Python.display_set_light = function (block) {
    Blockly.Python.addImport('light', IMPORT_LIGHT);
    Blockly.Python.addImport('color', IMPORT_COLOR);
    return `light.color(light.POWER, color.${block.getFieldValue("COLOR")})` + NEWLINE;
};
