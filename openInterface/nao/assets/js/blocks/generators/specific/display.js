/**
 * @fileoverview Display generators for Nao.
 */

Blockly.Python.display_fade = function (block) {
    Blockly.Python.addImport('leds_service', IMPORT_LEDS_SERVICE);
    const name = block.getFieldValue("NAME");
    const intensity = Blockly.Python.valueToCode(block, "INTENSITY", Blockly.Python.ORDER_NONE) || "0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    return `leds_service.fade('${name}', ${intensity}, ${duration})` + NEWLINE;
};

Blockly.Python.display_fadeRGB = function (block) {
    Blockly.Python.addImport('leds_service', IMPORT_LEDS_SERVICE);
    const name = block.getFieldValue("NAME");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    return `leds_service.fadeRGB('${name}', ${r}, ${g}, ${b}, ${duration})` + NEWLINE;
};

Blockly.Python.display_fadeRGB_palette = function (block) {
    Blockly.Python.addImport('leds_service', IMPORT_LEDS_SERVICE);
    const name = block.getFieldValue("NAME");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).replace('(', '').replace(')', '').split(',') || ["0", "0", "0"];
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    let colorIntensity = [];
    colour.forEach((elem) => {
        colorIntensity.push(parseInt(elem) / 255 * 100);
    });
    return `leds_service.fadeRGB('${name}', ${colorIntensity.join(', ')}, ${duration})` + NEWLINE;
};

Blockly.Python.display_fadeRGB_colorName = function (block) {
    Blockly.Python.addImport('leds_service', IMPORT_LEDS_SERVICE);
    const name = block.getFieldValue("NAME");
    const colour = block.getFieldValue("COLOR");
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    return `leds_service.fadeRGB('${name}', '${colour}', ${duration})` + NEWLINE;
};

Blockly.Python.display_fadeFaceRGB = function (block) {
    Blockly.Python.addImport('leds_service', IMPORT_LEDS_SERVICE);
    const side = block.getFieldValue("SIDE");
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "0";
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    return `leds_service.fadeRGB('FaceLed${side}', ${r}, ${g}, ${b}, ${duration}, ${id})` + NEWLINE;
};

Blockly.Python.display_fadeFaceRGB_palette = function (block) {
    Blockly.Python.addImport('leds_service', IMPORT_LEDS_SERVICE);
    const side = block.getFieldValue("SIDE");
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "0";
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).replace('(', '').replace(')', '') || "0,0,0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    return `leds_service.fadeRGB('FaceLed${side}', ${colour}, ${duration}, ${id})` + NEWLINE;
};

Blockly.Python.display_rotateEyes = function (block) {
    Blockly.Python.addImport('leds_service', IMPORT_LEDS_SERVICE);
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "0,0,0";
    const rgbValues = colour.replace(/[()]/g, '').split(',');
    const toHex = (value) => {
        let hex = parseInt(value).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    const r = toHex(rgbValues[0]);
    const g = toHex(rgbValues[1]);
    const b = toHex(rgbValues[2]);
    const timeForRotation = Blockly.Python.valueToCode(block, "TIME_FOR_ROTATION", Blockly.Python.ORDER_NONE) || "0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    return `leds_service.rotateEyes('#${r}${g}${b}', ${timeForRotation}, ${duration})` + NEWLINE;
};

Blockly.Python.display_setIntensity = function (block) {
    Blockly.Python.addImport('leds_service', IMPORT_LEDS_SERVICE);
    const name = block.getFieldValue("NAME");
    const intensity = Blockly.Python.valueToCode(block, "INTENSITY", Blockly.Python.ORDER_NONE) || "0";
    return `leds_service.setIntensity('${name}', ${intensity / 100})` + NEWLINE;
};

Blockly.Python.display_off = function (block) {
    Blockly.Python.addImport('leds_service', IMPORT_LEDS_SERVICE);
    const name = block.getFieldValue("NAME");
    return `leds_service.off('${name}')` + NEWLINE;
};

Blockly.Python.display_on = function (block) {
    Blockly.Python.addImport('leds_service', IMPORT_LEDS_SERVICE);
    const name = block.getFieldValue("NAME");
    return `leds_service.on('${name}')` + NEWLINE;
};

Blockly.Python.display_randomEyes = function (block) {
    Blockly.Python.addImport('leds_service', IMPORT_LEDS_SERVICE);
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    return `leds_service.randomEyes(${duration})` + NEWLINE;
};

Blockly.Python.display_rasta = function (block) {
    Blockly.Python.addImport('leds_service', IMPORT_LEDS_SERVICE);
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    return `leds_service.rasta(${duration})` + NEWLINE;
};

Blockly.Python.display_reset = function (block) {
    Blockly.Python.addImport('leds_service', IMPORT_LEDS_SERVICE);
    const name = block.getFieldValue("NAME");
    return `leds_service.reset('${name}')` + NEWLINE;
};