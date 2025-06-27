/**
 * @fileoverview Time generators for Nao.
 */


// Time

Blockly.Python.time_pause = function (block) {
    const duration = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    const unit = block.getFieldValue("UNIT");
    Blockly.Python.addImport("time", IMPORT_TIME);
    switch (unit) {
        case "SECOND":
            return "time.sleep(" + duration + ")" + NEWLINE;
        case "MILLI":
            return "time.sleep(" + (duration / 1000) + ")" + NEWLINE;
        case "MICRO":
            return "time.sleep(" + (duration  / 1000000) + ")" + NEWLINE;
        default:
            return "time.sleep(" + duration + ")" + NEWLINE;
    }
};


Blockly.Python.time_waitUntil = function (block) {
    let condition = Blockly.Python.valueToCode(block, "UNTIL", Blockly.Python.ORDER_ATOMIC);
    return "while not " + condition + ":" + NEWLINE + "  pass" + NEWLINE;
};

Blockly.Python.time_initChronometer = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addConstant('chronometer', "t0 = utime.ticks_ms()");
    block.workspace.createVariable('t0');
    return "" + NEWLINE;
};

Blockly.Python.time_initChronometer_simple = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    return ["time.ticks_ms()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.time_getChronometer = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    // Remove the following line to avoid duplicated constant definition with python traduction
    // Blockly.Python.addConstant('chronometer', "t0 = utime.ticks_ms()");
    block.workspace.createVariable('t0');
    switch (block.getFieldValue("UNIT")) {
        case "SEC":
            return ["utime.ticks_diff(utime.ticks_ms(), t0)/1e3", Blockly.Python.ORDER_ATOMIC];
        case "MILLI":
            return ["utime.ticks_diff(utime.ticks_ms(), t0)", Blockly.Python.ORDER_ATOMIC];
        case "MICRO":
            return ["utime.ticks_diff(utime.ticks_ms(), t0)/1e-3", Blockly.Python.ORDER_ATOMIC];
    }
};