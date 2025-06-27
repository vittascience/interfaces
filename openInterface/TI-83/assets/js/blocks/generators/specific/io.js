/**
 * @fileoverview Input/Output generators for TI-83 Premium CE.
 */

// ti_system module

Blockly.Python.ti_system_recall_list = function (block) {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    const index = block.getFieldValue("INDEX");
    return ["recall_list(\"" + index + "\")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.ti_system_store_list = function (block) {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    const list = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_NONE) || "[]";
    const name = block.getFieldValue("INDEX");
    return "store_list(\"" + name + "\", " + list + ")" + NEWLINE;
};

Blockly.Python.ti_system_recall_RegEQ = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return ["recall_RegEQ()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.ti_system_while_condition = function (block) {
    const condition = Blockly.Python.valueToCode(block, "CONDITION", Blockly.Python.ORDER_NONE) || "False";
    const statements = Blockly.Python.addLoopTrap(Blockly.Python.statementToCode(block, "DO"), block.id) || Blockly.Python.PASS;
    return "while " + condition + ":" + NEWLINE + statements;
};

Blockly.Python.ti_system_if_condition = function (block) {
    const condition = Blockly.Python.valueToCode(block, "CONDITION", Blockly.Python.ORDER_NONE) || "False";
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.BREAK;
    return "if " + condition + ":" + NEWLINE + branchCode;
};

Blockly.Python.ti_io_escape = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return ["escape()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.ti_system_disp_at = function (block) {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    const line = Blockly.Python.valueToCode(block, "LINE", Blockly.Python.ORDER_NONE) || "0";
    const txt = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "0";
    const align = block.getFieldValue("ALIGN");
    return "disp_at(" + line + ", " + txt + ", \"" + align + "\")" + NEWLINE;
};

Blockly.Python.ti_system_disp_clr = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return "disp_clr()" + NEWLINE;
};

Blockly.Python.ti_system_disp_wait = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return "disp_wait()" + NEWLINE;
};

Blockly.Python.ti_system_disp_cursor = function (block) {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return "disp_cursor(" + state + ")" + NEWLINE;
};

Blockly.Python.ti_system_sleep = function (block) {
    const duration = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    const unit = block.getFieldValue("UNIT");
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    switch (unit) {
        case "SECOND":
            return "sleep(" + duration + ")" + NEWLINE;
        case "MILLI":
            return "sleep(" + duration + "/1e3)" + NEWLINE;
        case "MICRO":
            return "sleep(" + duration + "/1e6)" + NEWLINE;
        default:
            return "sleep(" + duration + ")" + NEWLINE;
    }
};

Blockly.Python.ti_system_wait_key = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return "wait_key()" + NEWLINE;
};

Blockly.Python.ti_system_wait_key_value = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return ["wait_key()", Blockly.Python.ORDER_ATOMIC];
};

// time module

Blockly.Python.io_wait = function (block) {
    const duration = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    const unit = block.getFieldValue("UNIT");
    Blockly.Python.addImport("time", IMPORT_TIME);
    switch (unit) {
        case "SECOND":
            return "time.sleep(" + duration + ")" + NEWLINE;
        case "MILLI":
            return "time.sleep(" + duration + "/1e3)" + NEWLINE;
        case "MICRO":
            return "time.sleep(" + duration + "/1e6)" + NEWLINE;
        default:
            return "time.sleep(" + duration + ")" + NEWLINE;
    }
};

Blockly.Python.io_initChronometer = function (block) {
    Blockly.Python.addConstant('chronometer', "t0 = 0");
    Blockly.Python.addImport("time", IMPORT_TIME);
    block.workspace.createVariable('t0');
    return "t0 = time.monotonic()" + NEWLINE;
};

Blockly.Python.io_getChronometer = function (block) {
    Blockly.Python.addConstant('chronometer', "t0 = 0");
    Blockly.Python.addImport("time", IMPORT_TIME);
    block.workspace.createVariable('t0');
    switch (block.getFieldValue("UNIT")) {
        case "SEC":
            return ["(time.monotonic()-t0)", Blockly.Python.ORDER_ATOMIC];
        case "MS":
            return ["(time.monotonic()-t0)*1000", Blockly.Python.ORDER_ATOMIC];
        default:
            return ["(time.monotonic()-t0)", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.io_waitUntil = function (block) {
    const condition = Blockly.Python.valueToCode(block, "UNTIL", Blockly.Python.ORDER_ATOMIC) || "True";;
    return "while not " + condition + ":" + NEWLINE + "  pass" + NEWLINE;
};

// Console module

Blockly.Python.ti_io_print = function (block) {
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
        return "print(" + text + ")" + NEWLINE;
    } else {
        return "print(str(" + text + "))" + NEWLINE;
    }
};

Blockly.Python.ti_io_disp_clr = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return "disp_clr()" + NEWLINE;
};

Blockly.Python.ti_io_input_text = function (block) {
    var txt = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_MEMBER) || "''";
    return ["input(" + txt + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.ti_io_input_number = function (block) {
    var txt = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_MEMBER) || "''";
    return ["float(input(" + txt + "))", Blockly.Python.ORDER_ATOMIC];
};
