/**
 * @fileoverview Input/Output generators for Codey.
 */

Blockly.Python.io_digital_signal = function (block) {
    return ["HIGH" == block.getFieldValue("BOOL") ? '1' : '0', Blockly.Python.ORDER_ATOMIC]
};

// Time

Blockly.Python.io_pause = function (block) {
    const duration = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    switch (block.getFieldValue("UNIT")) {
        case "SEC":
            return "utime.sleep(" + duration + ")" + NEWLINE;
        case "MILLI":
            return "utime.sleep_ms(" + duration + ")" + NEWLINE;
        case "MICRO":
            return "utime.sleep_us(" + duration + ")" + NEWLINE;
        default:
            return "sleep(" + duration + ")" + NEWLINE;
    }
};

Blockly.Python.io_waitUntil = function (block) {
    const condition = Blockly.Python.valueToCode(block, "UNTIL", Blockly.Python.ORDER_ATOMIC) || "True";;
    return "while not " + condition + ":" + NEWLINE + "  pass" + NEWLINE;
};

Blockly.Python.io_initChronometer = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('chronometer', "t0 = utime.ticks_ms()");
    block.workspace.createVariable('t0');
    return "" + NEWLINE;
};

Blockly.Python.io_initChronometer_simple = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    return ["time.ticks_ms()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getChronometer = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
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

Blockly.Python.io_onButtonPressed = function (block) {
    const button = block.getFieldValue("BUTTON");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    return "if button_" + button + ".is_pressed():" + NEWLINE + branchCode;
};

Blockly.Python.io_button_state = function (block) {
    const button = block.getFieldValue("BUTTON");
    return "button_" + button + ".is_pressed()" + NEWLINE;
};

Blockly.Python.io_potentiometer_get_value = function () {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    return ["potentiometer.get_value()", Blockly.Python.ORDER_NONE];
};