/**
 * @fileoverview Graph generators for Texas Instruments mode.
 */

Blockly.Python.ti_plotlib_cls = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return "plt.cls()" + NEWLINE;
};

Blockly.Python.ti_plotlib_grid = function (block) {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    const xscl = Blockly.Python.valueToCode(block, "XSCL", Blockly.Python.ORDER_NONE) || "0";
    const yscl = Blockly.Python.valueToCode(block, "YSCL", Blockly.Python.ORDER_NONE) || "0";
    const type = block.getFieldValue("TYPE");
    return "plt.grid(" + xscl + ", " + yscl + ", \"" + type + "\")" + NEWLINE;
};

Blockly.Python.ti_plotlib_window = function (block) {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    const xmin = Blockly.Python.valueToCode(block, "XMIN", Blockly.Python.ORDER_NONE) || "0";
    const xmax = Blockly.Python.valueToCode(block, "XMAX", Blockly.Python.ORDER_NONE) || "0";
    const ymin = Blockly.Python.valueToCode(block, "YMIN", Blockly.Python.ORDER_NONE) || "0";
    const ymax = Blockly.Python.valueToCode(block, "YMAX", Blockly.Python.ORDER_NONE) || "0";
    return "plt.window(" + xmin + ", " + xmax + ", " + ymin + ", " + ymax + ")" + NEWLINE;
};

Blockly.Python.ti_plotlib_auto_window = function (block) {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    const xlist = Blockly.Python.valueToCode(block, "XLIST", Blockly.Python.ORDER_NONE) || "[]";
    const ylist = Blockly.Python.valueToCode(block, "YLIST", Blockly.Python.ORDER_NONE) || "[]";
    return "plt.auto_window(" + xlist + ", " + ylist + ")" + NEWLINE;
};

Blockly.Python.ti_plotlib_axes = function (block) {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    const type = block.getFieldValue("TYPE");
    return "plt.axes(\"" + type + "\")" + NEWLINE;
};

Blockly.Python.ti_plotlib_labels = function (block) {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    const xlabel = Blockly.Python.valueToCode(block, "XLABEL", Blockly.Python.ORDER_NONE) || "''";
    const ylabel = Blockly.Python.valueToCode(block, "YLABEL", Blockly.Python.ORDER_NONE) || "''";
    const xlabelpos = Blockly.Python.valueToCode(block, "XPOS", Blockly.Python.ORDER_NONE) || "0";
    const ylabelpos = Blockly.Python.valueToCode(block, "YPOS", Blockly.Python.ORDER_NONE) || "0";
    return "plt.labels(" + xlabel + ", " + ylabel + ", " + xlabelpos + ", " + ylabelpos + ")" + NEWLINE;
};

Blockly.Python.ti_plotlib_title = function (block) {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    const title = Blockly.Python.valueToCode(block, "TITLE", Blockly.Python.ORDER_NONE) || "''";
    return "plt.title(" + title + ")" + NEWLINE;
};

Blockly.Python.ti_plotlib_show_plot = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return "plt.show_plot()" + NEWLINE;
};

Blockly.Python.ti_plotlib_define_color = function (block) {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    return "plt.color(" + r + ", " + g + ", " + b + ")" + NEWLINE;
};

Blockly.Python.ti_plotlib_define_palette_color = function (block) {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    return "plt.color" + colour + NEWLINE;
};

Blockly.Python.ti_plotlib_scatter = function (block) {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    Blockly.Python.addPowerOn('plt_cls', 'plt.cls()');
    const type = block.getFieldValue("MARKER");
    const xaxis = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "[]";
    const yaxis = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "[]";
    return "plt.scatter(" + xaxis + ", " + yaxis + ", \"" + type + "\")" + NEWLINE;
};

Blockly.Python.ti_plotlib_lin_reg = function (block) {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addPowerOn('plt_cls', 'plt.cls()');
    const xlist = Blockly.Python.valueToCode(block, "LISTX", Blockly.Python.ORDER_NONE) || "[]";
    const ylist = Blockly.Python.valueToCode(block, "LISTY", Blockly.Python.ORDER_NONE) || "[]";
    const position = `"${block.getFieldValue("POSITION")}"`;
    const line = `"${block.getFieldValue("LINE")}"`;
    return "plt.lin_reg(" + xlist + ", " + ylist + ", " + position + ", " + line + ")" + NEWLINE;
};

Blockly.Python.ti_plotlib_plot = function (block) {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    Blockly.Python.addPowerOn('plt_cls', 'plt.cls()');
    const type = block.getFieldValue("MARKER");
    const xaxis = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "[]";
    const yaxis = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "[]";
    return "plt.plot(" + xaxis + ", " + yaxis + ", \"" + type + "\")" + NEWLINE;
};

Blockly.Python.ti_plotlib_line = function (block) {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    Blockly.Python.addPowerOn('plt_cls', 'plt.cls()');
    const type = block.getFieldValue("TYPE");
    const xa = Blockly.Python.valueToCode(block, "XA", Blockly.Python.ORDER_NONE) || "0";
    const ya = Blockly.Python.valueToCode(block, "YA", Blockly.Python.ORDER_NONE) || "0";
    const xb = Blockly.Python.valueToCode(block, "XB", Blockly.Python.ORDER_NONE) || "0";
    const yb = Blockly.Python.valueToCode(block, "YB", Blockly.Python.ORDER_NONE) || "0";
    return "plt.line(" + xa + ", " + ya + ", " + xb + ", " + yb + ", " + "\"" + type + "\")" + NEWLINE;
};

Blockly.Python.ti_plotlib_pen = function (block) {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    const size = block.getFieldValue("SIZE");
    const type = block.getFieldValue("TYPE");
    return "plt.pen(\"" + size + "\", \"" + type + "\")" + NEWLINE;
};

Blockly.Python.ti_plotlib_text_at = function (block) {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    Blockly.Python.addPowerOn('plt_cls', 'plt.cls()');
    const txt = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "0";
    const line = Blockly.Python.valueToCode(block, "LINE", Blockly.Python.ORDER_NONE) || "0";
    const pos = block.getFieldValue("POSITION");
    return "plt.text_at(" + line + ", " + txt + ", \"" + pos + "\")" + NEWLINE;
};
