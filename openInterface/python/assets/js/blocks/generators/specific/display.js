/**
 * @fileoverview Display generators for Python.
 */

Blockly.Python.display_print = function (block) {
    var txt = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_MEMBER) || "''";
    return "print(" + txt + ")" + NEWLINE;
};

Blockly.Python.display_input = function (block) {
    var txt = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_MEMBER) || "''";
    return ["input(" + txt + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.display_input_number = function (block) {
    var txt = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_MEMBER) || "''";
    return ["float(input(" + txt + "))", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.time_sleep = function (block) {
    const duration = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('time', IMPORT_TIME);
    switch (block.getFieldValue("UNIT")) {
        case "SEC":
            return "time.sleep(" + duration + ")" + NEWLINE;
        case "MILLI":
            return "time.sleep(" + duration + "*1e-3)" + NEWLINE;
        case "MICRO":
            return "time.sleep(" + duration + "*1e-6)" + NEWLINE;
        default:
            return "time.sleep(" + duration + ")" + NEWLINE;
    }
};

Blockly.Python.time_time = function (block) {
    return "time.time()" + NEWLINE;
};

Blockly.Python.time_waitUntil = function (block) {
    const condition = Blockly.Python.valueToCode(block, "UNTIL", Blockly.Python.ORDER_ATOMIC) || "True";;
    return "while not " + condition + ":" + NEWLINE + "  pass" + NEWLINE;
};

Blockly.Python.time_initChronometer = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    block.workspace.createVariable('t0');
    return "t0 = time.clock()" + NEWLINE;
};

Blockly.Python.time_getChronometer = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    block.workspace.createVariable('t0');
    switch (block.getFieldValue("UNIT")) {
        case "SEC":
            return ["(time.clock() - t0)", Blockly.Python.ORDER_ATOMIC];
        case "MILLI":
            return ["(time.clock() - t0)*1e3", Blockly.Python.ORDER_ATOMIC];
        case "MICRO":
            return ["(time.clock() - t0)*1e6", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.time_getDate = function () {
    Blockly.Python.addImport('time', IMPORT_TIME);
    return ["time.ctime()", Blockly.Python.ORDER_ATOMIC];
};