/**
 * @fileoverview Dictionaries generators for Python.
 */

Blockly.Python.dictionaries_create_empty = function () {
    return ["{}", Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.dictionaries_create_with = function (block) {
    let res = ""
    for (let i = 0; i < block.itemCount_; i++) {
        if (i != 0)
            res += ","
        res += Blockly.Python.valueToCode(block, "KEY" + i, Blockly.Python.ORDER_NONE) || "None";
        res += " : "
        res += Blockly.Python.valueToCode(block, "VAL" + i, Blockly.Python.ORDER_NONE) || "None";
    }
    return ["{" + res + "}", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.dictionaries_from_list = function (block) {
    const list = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_NONE) || "[]";
    return ["set(" + list + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.dictionaries_length = function (block) {
    const dict = Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_NONE) || "{}";
    return ["len(" + dict + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.dictionaries_get_item = function (block) {
    const dict = Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_NONE) || "{}",
        key = Blockly.Python.valueToCode(block, "KEY", Blockly.Python.ORDER_NONE) || '';
    return [dict + "[" + key + "]", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.dictionaries_update_item = function (block) {
    const dict = Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_NONE) || "{}",
        key = Blockly.Python.valueToCode(block, "KEY", Blockly.Python.ORDER_NONE) || '',
        value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || '';
    return dict + "[" + key + "] = " + value + NEWLINE;
};

Blockly.Python.dictionaries_include = function (block) {
    const dict = Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_NONE) || "{}",
        value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || '',
        item = block.getFieldValue("ITEM") || '',
        op = block.getFieldValue("OP") || '';
    if (op === "IN") {
        if (item === "KEY") {
            return [value + " in " + dict + ".keys()", Blockly.Python.ORDER_ATOMIC];
        } else {
            return [value + " in " + dict + ".values()", Blockly.Python.ORDER_ATOMIC];
        }
    } else {
        if (item === "KEY") {
            return [value + " not in " + dict + ".keys()", Blockly.Python.ORDER_ATOMIC];
        } else {
            return [value + " not in " + dict + ".values()", Blockly.Python.ORDER_ATOMIC];
        }
    }
};

Blockly.Python.dictionaries_add_tuple = function (block) {
    const dict = Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_NONE) || "{}",
        key = Blockly.Python.valueToCode(block, "KEY", Blockly.Python.ORDER_NONE) || "",
        value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "";
    return dict + "[" + key + "] = " + value + NEWLINE;
};

Blockly.Python.dictionaries_delete_tuple = function (block) {
    const dict = Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_NONE) || "{}",
        key = Blockly.Python.valueToCode(block, "KEY", Blockly.Python.ORDER_NONE) || "";
    return "del " + dict + "[" + key + "]" + NEWLINE;
};

Blockly.Python.dictionaries_clear = function (block) {
    const dict = Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_NONE) || "{}";
    return dict + ".clear()" + NEWLINE;
};

Blockly.Python.dictionaries_loop = function (block) {
    const variable = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME),
        dict = Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_RELATIONAL) || "{}",
        op = block.getFieldValue("OP");
    var branch = Blockly.Python.statementToCode(block, "DO");
    branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;
    switch (op) {
        case 'VALUE':
            return "for " + variable + " in " + dict + ".values():" + NEWLINE + branch;
        case 'TUPLE':
            return "for " + variable + " in " + dict + ".items():" + NEWLINE + branch;
        case 'KEY':
        default:
            return "for " + variable + " in " + dict + ".keys():" + NEWLINE + branch;
    }
};