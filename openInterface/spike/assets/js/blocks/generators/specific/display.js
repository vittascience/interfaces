/**
 * @fileoverview Display generators for Lego Spike.
 */

Blockly.Python.display_show_leds = function (block) {
    Blockly.Python.addImport('port', IMPORT_PORT);
    Blockly.Python.addImport('color', IMPORT_COLOR);
    Blockly.Python.addImport('color_matrix', IMPORT_COLOR_MATRIX);
    const port = block.getFieldValue("PORT");
    const colorMapping = {
        "rgb(0, 0, 0)": "BLACK",
        "rgb(238, 130, 238)": "VIOLET",
        "rgb(128, 0, 128)": "PURPLE",
        "rgb(0, 0, 255)": "BLUE",
        "rgb(0, 127, 255)": "AZURE",
        "rgb(64, 224, 208)": "TURQUOISE",
        "rgb(0, 128, 0)": "GREEN",
        "rgb(255, 255, 0)": "YELLOW",
        "rgb(255, 165, 0)": "ORANGE",
        "rgb(255, 0, 0)": "RED",
        "rgb(255, 255, 255)": "WHITE"
    };
    let image = "[";
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            const label = "LED" + row + "" + column;
            if (block.getFieldValue(label, Blockly.Python.ORDER_MEMBER) === "TRUE") {
                const color = block.getField(label).fieldGroup_.innerHTML.match(/rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/)[0];
                image += `color.${colorMapping[color]}`;
            } else {
                image += "color.BLACK";
            }
            image += ",";
        }
    }
    return `color_matrix.show(port.${port}, ${image.replace(/.$/,"]")})` + NEWLINE;
};

Blockly.Python.display_set_pixel = function (block) {
    Blockly.Python.addImport('port', IMPORT_PORT);
    Blockly.Python.addImport('color', IMPORT_COLOR);
    Blockly.Python.addImport('color_matrix', IMPORT_COLOR_MATRIX);
    const port = block.getFieldValue("PORT");
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    const color = block.getFieldValue("COLOR");
    return `color_matrix.set_pixel(port.${port}, ${x}, ${y}, color.${color})` + NEWLINE;
};

Blockly.Python.display_set_intensity = function (block) {
    Blockly.Python.addImport('port', IMPORT_PORT);
    Blockly.Python.addImport('color', IMPORT_COLOR);
    Blockly.Python.addImport('color_matrix', IMPORT_COLOR_MATRIX);
    const port = block.getFieldValue("PORT");
    let intensity = Blockly.Python.valueToCode(block, "INTENSITY", Blockly.Python.ORDER_NONE) || "0";
    if (intensity > 100) intensity = 100;
    if (intensity < 0) intensity = 0;
    return `color_matrix.set_intensity(port.${port}, ${intensity})` + NEWLINE;
};