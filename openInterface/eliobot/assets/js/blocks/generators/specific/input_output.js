/**
 * @fileoverview Input/Output generators for Esp32.
 */

// ESP32

Blockly.Python.io_pause = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    const duration = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    switch (block.getFieldValue("UNIT")) {
        case "SEC":
            return "time.sleep(" + duration + ")" + NEWLINE;
        case "MILLI":
            return "time.sleep_ms(" + duration + ")" + NEWLINE;
        case "MICRO":
            return "time.sleep_us(" + duration + ")" + NEWLINE;
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
    Blockly.Python.addConstant('chronometer', "t0 = time.ticks_ms()");
    block.workspace.createVariable('t0');
    return "";
};

Blockly.Python.io_initChronometer_simple = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    return ["time.ticks_ms()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getChronometer = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    // Remove the following line to avoid duplicated constant definition with python traduction
    // Blockly.Python.addConstant('chronometer', "t0 = time.ticks_ms()");
    block.workspace.createVariable('t0');
    switch (block.getFieldValue("UNIT")) {
        case "SEC":
            return ["time.ticks_diff(time.ticks_ms(), t0)/1e3", Blockly.Python.ORDER_ATOMIC];
        case "MILLI":
            return ["time.ticks_diff(time.ticks_ms(), t0)", Blockly.Python.ORDER_ATOMIC];
        case "MICRO":
            return ["time.ticks_diff(time.ticks_ms(), t0)/1e-3", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.io_button = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('digitalio', IMPORT_DIGITALIO);
    Blockly.Python.addInit('button', '# Button declaration \nbuttonPin = DigitalInOut(IO0)' + NEWLINE + 'buttonPin.direction = Direction.INPUT');
    const state = block.getFieldValue('STATE') || '';
    return ['buttonPin.value == ' + state, Blockly.Python.ORDER_ATOMIC];
};