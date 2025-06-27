/**
 * @fileoverview Numpy generators for Python.
 */

Blockly.Python.numpy_create_table_with = function (block) {
    Blockly.Python.addImport('numpy', IMPORT_NUMPY);
    for (var b = Array(block.itemCount_), c = 0; c < block.itemCount_; c++) {
        b[c] = Blockly.Python.valueToCode(block, "ADD" + c, Blockly.Python.ORDER_NONE) || "None";
    }
    return ["np.array([" + b.join(", ") + "])", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.numpy_square_matrix = function (block) {
    Blockly.Python.addImport('numpy', IMPORT_NUMPY);
    var code = "np.array([";
    var mat = new Array();
    for (var j = 0; j < block.dim_; j++) {
        mat[j] = new Array();
        for (var i = 0; i < block.dim_; i++) {
            mat[j][i] = block.getFieldValue('element_' + j + i);
        }
        code += "[" + mat[j].join(", ") + "]";
        if (j == (block.dim_ - 1)) {
            code += "";
        } else {
            code += ", ";
        }
    }
    code += "])";
    return [code, Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.numpy_table_with_shape = function (block) {
    Blockly.Python.addImport('numpy', IMPORT_NUMPY);
    var row = Blockly.Python.valueToCode(block, "COL", Blockly.Python.ORDER_NONE) || "0";
    var col = Blockly.Python.valueToCode(block, "ROW", Blockly.Python.ORDER_NONE) || "0";
    var e = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "None";
    var code = "np.array([";
    var mat = new Array();
    for (var j = 0; j < row; j++) {
        mat[j] = new Array();
        for (var i = 0; i < col; i++) {
            mat[j][i] = e;
        }
        code += "[" + mat[j].join(", ") + "]";
        if (j == (row - 1)) {
            code += "";
        } else {
            code += ", ";
        }
    }
    code += "])";
    return [code, Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.numpy_arange = function (block) {
    Blockly.Python.addImport('numpy', IMPORT_NUMPY);
    var min = Blockly.Python.valueToCode(block, "MIN", Blockly.Python.ORDER_NONE) || "0";
    var max = Blockly.Python.valueToCode(block, "MAX", Blockly.Python.ORDER_NONE) || "0";
    var step = Blockly.Python.valueToCode(block, "STEP", Blockly.Python.ORDER_NONE) || "0";
    return ["np.arange(" + min + ", " + max + ", " + step + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.numpy_linspace = function (block) {
    Blockly.Python.addImport('numpy', IMPORT_NUMPY);
    var min = Blockly.Python.valueToCode(block, "MIN", Blockly.Python.ORDER_NONE) || "0";
    var max = Blockly.Python.valueToCode(block, "MAX", Blockly.Python.ORDER_NONE) || "0";
    var step = Blockly.Python.valueToCode(block, "N", Blockly.Python.ORDER_NONE) || "0";
    return ["np.linspace(" + min + ", " + max + ", " + step + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.numpy_getSizeShape = function (block) {
    Blockly.Python.addImport('numpy', IMPORT_NUMPY);
    let t = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_NONE) || "np.array()";
    return [t + "." + block.getFieldValue("TYPE"), Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.numpy_getElement_matrix = function (block) {
    Blockly.Python.addImport('numpy', IMPORT_NUMPY);
    let i = Blockly.Python.valueToCode(block, "I", Blockly.Python.ORDER_NONE);
    let j = Blockly.Python.valueToCode(block, "J", Blockly.Python.ORDER_NONE);
    let t = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_NONE);
    return [t + "[" + i + "," + j + "]", Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.numpy_getElement_list = function (block) {
    Blockly.Python.addImport('numpy', IMPORT_NUMPY);
    let i = Blockly.Python.valueToCode(block, "I", Blockly.Python.ORDER_NONE);
    let t = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_NONE);
    return [t + "[" + i + "]", Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.numpy_single = function (block) {
    Blockly.Python.addImport('numpy', IMPORT_NUMPY);
    let val = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_MULTIPLICATIVE) || "0";
    let c;
    switch (block.getFieldValue("OP")) {
        case "ABS":
            c = "np.absolute(" + val + ")";
            break;
        case "ROOT":
            c = "np.sqrt(" + val + ")";
            break;
        case "EXP":
            c = "np.exp(" + val + ")";
            break;
    }
    return [c, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.numpy_trig = function (block) {
    Blockly.Python.addImport('numpy', IMPORT_NUMPY);
    let val = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_MULTIPLICATIVE) || "0";
    let c = false;
    let operator = block.getFieldValue("OP");
    switch (operator) {
        case "SIN":
            c = "np.sin(" + val + ")";
            break;
        case "COS":
            c = "np.cos(" + val + ")";
            break;
        case "TAN":
            c = "np.tan(" + val + ")";
            break;
    }
    if (c)
        return [c, Blockly.Python.ORDER_FUNCTION_CALL];
    switch (operator) {
        case "ASIN":
            c = "np.arcsin(" + val + ")";
            break;
        case "ACOS":
            c = "np.arccos(" + val + ")";
            break;
        case "ATAN":
            c = "np.arctan(" + val + ")";
            break;
    }
    return [c, Blockly.Python.ORDER_MULTIPLICATIVE];
};