/**
 * @fileoverview Devices generators for TI-83 Premium CE.
 */

// ce_box blocks

Blockly.Python.ce_box_defineBox = function (block) {
    const list = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_NONE) || "[]";
    Blockly.Python.addImport('ce_box', IMPORT_CE_BOX);
    return "box = box(" + list + ")" + NEWLINE;
};

Blockly.Python.ce_box_title = function (block) {
    const title = Blockly.Python.valueToCode(block, "TITLE", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addImport('ce_box', IMPORT_CE_BOX);
    return "box.title(" + title + ")" + NEWLINE;
};

Blockly.Python.ce_box_show = function () {
    Blockly.Python.addImport('ce_box', IMPORT_CE_BOX);
    return "box.show()" + NEWLINE;
};

// ce_chart blocks

Blockly.Python.ce_chart_defineChart = function (block) {
    const list = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_NONE) || "[]";
    Blockly.Python.addImport('ce_chart', IMPORT_CE_CHART);
    return "cht = chart()" + NEWLINE + "cht.data(" + list + ")" + NEWLINE;
};

Blockly.Python.ce_chart_dataChart = function (block) {
    const label = Blockly.Python.valueToCode(block, "LABEL", Blockly.Python.ORDER_NONE) || "''";
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    return ["(" + label + ", " + value + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.ce_chart_title = function (block) {
    const title = Blockly.Python.valueToCode(block, "TITLE", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addImport('ce_chart', IMPORT_CE_CHART);
    return "cht.title(" + title + ")" + NEWLINE;
};

Blockly.Python.ce_chart_frequencies = function (block) {
    const freq = Blockly.Python.valueToCode(block, "FREQ", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addImport('ce_chart', IMPORT_CE_CHART);
    return "cht.frequencies(" + freq + ")" + NEWLINE;
};

Blockly.Python.ce_chart_show = function () {
    Blockly.Python.addImport('ce_chart', IMPORT_CE_CHART);
    return "cht.show()" + NEWLINE;
};

// ce_quivr blocks

Blockly.Python.ce_quivr_drawLinePortion = function (block) {
    const xa = Blockly.Python.valueToCode(block, 'XA', Blockly.Python.ORDER_NONE) || "0";
    const ya = Blockly.Python.valueToCode(block, 'YA', Blockly.Python.ORDER_NONE) || "0";
    const xb = Blockly.Python.valueToCode(block, 'XB', Blockly.Python.ORDER_NONE) || "0";
    const yb = Blockly.Python.valueToCode(block, 'YB', Blockly.Python.ORDER_NONE) || "0";
    const color = block.getFieldValue("COLOR");
    Blockly.Python.addImport('ce_quivr', IMPORT_CE_QUIVR);
    return "quiver(" + xa + ", " + ya + ", " + xb + ", " + yb + ", 1, '" + color + "', 'line')" + NEWLINE;
};

Blockly.Python.ce_quivr_drawVector = function (block) {
    const x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_NONE) || "0";
    const dx = Blockly.Python.valueToCode(block, 'DX', Blockly.Python.ORDER_NONE) || "0";
    const dy = Blockly.Python.valueToCode(block, 'DY', Blockly.Python.ORDER_NONE) || "0";
    const color = block.getFieldValue("COLOR");
    const size = Blockly.Python.valueToCode(block, 'SIZE', Blockly.Python.ORDER_NONE) || "1";
    Blockly.Python.addImport('ce_quivr', IMPORT_CE_QUIVR);
    return "quiver(" + x + ", " + y + ", " + dx + ", " + dy + ", " + size + ", '" + color + "', 'vector')" + NEWLINE;
};
