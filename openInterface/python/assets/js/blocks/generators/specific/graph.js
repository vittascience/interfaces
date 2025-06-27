/**
 * @fileoverview Graph generators for Python.
 */

Blockly.Python.graph_matplotlib_setLabel = function (block) {
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    let titleLabel = Blockly.Python.valueToCode(block, "TITLE_LABEL", Blockly.Python.ORDER_NONE) || "''";
    let xLabel = Blockly.Python.valueToCode(block, "X_LABEL", Blockly.Python.ORDER_NONE) || "''";
    let yLabel = Blockly.Python.valueToCode(block, "Y_LABEL", Blockly.Python.ORDER_NONE) || "''";
    let inputBlockTitle = block.getInput("TITLE_LABEL").connection.targetBlock();
    let inputBlockX = block.getInput("X_LABEL").connection.targetBlock();
    let inputBlockY = block.getInput("Y_LABEL").connection.targetBlock();
    let titleCode, xLabelCode, yLabelCode;
    if (inputBlockTitle && (inputBlockTitle.type == "text" || inputBlockTitle.type == "text_join")) {
        titleCode = "plt.title(" + titleLabel + ")" + NEWLINE;
    } else {
        titleCode = "plt.title(str(" + titleLabel + "))" + NEWLINE;
    }
    if (inputBlockX && (inputBlockX.type == "text" || inputBlockX.type == "text_join")) {
        xLabelCode = "plt.xlabel(" + xLabel + ")" + NEWLINE;
    } else {
        xLabelCode = "plt.xlabel(str(" + xLabel + "))" + NEWLINE;
    }
    if (inputBlockY && (inputBlockY.type == "text" || inputBlockY.type == "text_join")) {
        yLabelCode = "plt.ylabel(" + yLabel + ")" + NEWLINE;
    } else {
        yLabelCode = "plt.ylabel(str(" + yLabel + "))" + NEWLINE;
    }
    return titleCode + xLabelCode + yLabelCode;
};

Blockly.Python.graph_matplotlib_grid = function () {
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    return "plt.grid()" + NEWLINE;
};

Blockly.Python.graph_matplotlib_text = function (block) {
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    let text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    let xPos = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    let yPos = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
        return "plt.text(" + xPos + ", " + yPos + ", " + text + ")" + NEWLINE;
    } else {
        return "plt.text(" + xPos + ", " + yPos + ", str(" + text + "))" + NEWLINE;
    }
};

Blockly.Python.graph_matplotlib_plot = function (block) {
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    let xTab = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "[]";
    let yTab = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "[]";
    return "plt.plot(" + xTab + "," + yTab + ")" + NEWLINE + "plt.show()" + NEWLINE;
};

Blockly.Python.graph_matplotlib_bar = function (block) {
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    let left = Blockly.Python.valueToCode(block, "LEFT", Blockly.Python.ORDER_NONE) || "[]";
    let height = Blockly.Python.valueToCode(block, "HEIGHT", Blockly.Python.ORDER_NONE) || "[]";
    return "plt.bar(" + left + "," + height + ")" + NEWLINE + "plt.show()" + NEWLINE;
};

Blockly.Python.graph_matplotlib_scatter = function (block) {
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    let xTab = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "[]";
    let yTab = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "[]";
    return "plt.scatter(" + xTab + "," + yTab + ")" + NEWLINE + "plt.show()" + NEWLINE;
};

/*

TODO:
    Theses blocks aren't use right now. Need to think a bit about implementation for users.

Blockly.Python.graph_matplotlib_hist = function (block) {
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    let xTab = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "[]";
    let bins = Blockly.Python.valueToCode(block, "BINS", Blockly.Python.ORDER_NONE) || "[]";

    return "plt.hist(" + xTab + "," + bins + ")" + NEWLINE + "plt.show()" + NEWLINE;
};

Blockly.Python.graph_matplotlib_legend = function (block) {
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    let location = Blockly.Python.valueToCode(block, "location", Blockly.Python.ORDER_NONE) || null;
    if (location !== null)
        return "plt.legend(location=" + location + ")" + NEWLINE;
    return "plt.legend()" + NEWLINE;
};


Blockly.Python.graph_matplotlib_show = function (block) {
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    return "plt.show()" + NEWLINE;
};

Blockly.Python.graph_matplotlib_subplot = function(block) {
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    let row = Blockly.Python.valueToCode(block, "row", Blockly.Python.ORDER_NONE) || 1;
    let col = Blockly.Python.valueToCode(block, "col", Blockly.Python.ORDER_NONE) || 1;
    let index = Blockly.Python.valueToCode(block, "index", Blockly.Python.ORDER_NONE) || 1;

    return "plt.subplot("+row+", "+col+", "+index+")" + NEWLINE;
}
*/

// Not displayed block

Blockly.Python.graph_matplotlib_settitle = function (block) {
    let titleLabel, inputBlockTitle, titleCode;
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);

    titleLabel = Blockly.Python.valueToCode(block, "TITLE_LABEL", Blockly.Python.ORDER_NONE) || "''";
    inputBlockTitle = block.getInput("TITLE_LABEL").connection.targetBlock() || null;
    if (inputBlockTitle && (inputBlockTitle.type == "text" || inputBlockTitle.type == "text_join")) {
        titleCode = "plt.title(" + titleLabel + ")" + NEWLINE;
    } else {
        titleCode = "plt.title(str(" + titleLabel + "))" + NEWLINE;
    }
    return titleCode;
};

Blockly.Python.graph_matplotlib_xlabel = function (block) {
    let xLabel, inputBlockX, xLabelCode;
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    
    xLabel = Blockly.Python.valueToCode(block, "X_LABEL", Blockly.Python.ORDER_NONE) || "''";
    inputBlockX = block.getInput("X_LABEL").connection.targetBlock();
    if (inputBlockX && (inputBlockX.type == "text" || inputBlockX.type == "text_join")) {
        xLabelCode = "plt.xlabel(" + xLabel + ")" + NEWLINE;
    } else {
        xLabelCode = "plt.xlabel(str(" + xLabel + "))" + NEWLINE;
    }
    return  xLabelCode;
};

Blockly.Python.graph_matplotlib_ylabel = function (block) {
    let yLabel, yLabelCode, inputBlockY;
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    
    yLabel = Blockly.Python.valueToCode(block, "Y_LABEL", Blockly.Python.ORDER_NONE) || "''";
    inputBlockY = block.getInput("Y_LABEL").connection.targetBlock();
    if (inputBlockY && (inputBlockY.type == "text" || inputBlockY.type == "text_join")) {
        yLabelCode = "plt.ylabel(" + yLabel + ")" + NEWLINE;
    } else {
        yLabelCode = "plt.ylabel(str(" + yLabel + "))" + NEWLINE;
    }
    return yLabelCode;
};

Blockly.Python.graph_matplotlib_plot_create = function (block) {
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    let xTab = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "[]";
    let yTab = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "[]";
    return "plt.plot(" + xTab + "," + yTab + ")" + NEWLINE;
};

Blockly.Python.graph_matplotlib_scatter_create = function (block) {
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    let xTab = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "[]";
    let yTab = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "[]";
    return "plt.scatter(" + xTab + "," + yTab + ")" + NEWLINE;
};

Blockly.Python.graph_matplotlib_bar_create = function (block) {
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    let left = Blockly.Python.valueToCode(block, "LEFT", Blockly.Python.ORDER_NONE) || "[]";
    let height = Blockly.Python.valueToCode(block, "HEIGHT", Blockly.Python.ORDER_NONE) || "[]";
    return "plt.bar(" + left + "," + height + ")" + NEWLINE;
};

Blockly.Python.graph_matplotlib_show = function (block) {
    Blockly.Python.addImport('graph', IMPORT_MATPLOTLIB);
    return "plt.show()" + NEWLINE;
};
