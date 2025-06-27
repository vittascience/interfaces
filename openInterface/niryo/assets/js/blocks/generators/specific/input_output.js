/**
 * @fileoverview Input/Output generators for Niryo Ned2
 */



Blockly.Python.io_pause = function (block) {
    const duration = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('time', IMPORT_TIME);
    switch (block.getFieldValue("UNIT")) {
        case "SEC":
            return "time.sleep(" + duration + ")" + NEWLINE;
        case "MILLI":
            return "time.sleep(" + duration/1000 + ")" + NEWLINE;
        case "MICRO":
            return "time.sleep(" + duration/1000000 + ")" + NEWLINE;
        default:
            return "sleep(" + duration + ")" + NEWLINE;
    }
};

Blockly.Python.io_waitUntil = function (block) {
    const condition = Blockly.Python.valueToCode(block, "UNTIL", Blockly.Python.ORDER_ATOMIC) || "True";;
    return "while not " + condition + ":" + NEWLINE + "  pass" + NEWLINE;
};

Blockly.Python.io_initChronometer = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addConstant('chronometer', "t0 = int(time.time())");
    block.workspace.createVariable('t0');
    return "t0 = int(time.time())" + NEWLINE;
};

Blockly.Python.io_getChronometer = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('chronometer', "t0 = int(time.time())");
    block.workspace.createVariable('t0');
    switch (block.getFieldValue("UNIT")) {
        case "SEC":
            return ["int(time.time()) - t0", Blockly.Python.ORDER_ATOMIC];
        case "MILLI":
            return ["int(time.time()) - t0 / 1e-3", Blockly.Python.ORDER_ATOMIC];
        case "MICRO":
            return ["int(time.time()) - t0 / 1e-6", Blockly.Python.ORDER_ATOMIC];
    }
};