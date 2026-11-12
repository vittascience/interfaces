/**
 * @fileoverview Input/Output generators for Lego Spike Prime.
 */

// Time

Blockly.Python.io_pause = function (block) {
    Blockly.Python.addImport('runloop', IMPORT_RUNLOOP);
    const duration = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_MULTIPLICATIVE) || "0";
    const factor = block.getFieldValue("UNIT") === "MILLI" ? "" : " * 1000";
    return `await runloop.sleep_ms(int(${duration}${factor}))` + NEWLINE;
};

Blockly.Python.io_waitUntil = function (block) {
    Blockly.Python.addImport('runloop', IMPORT_RUNLOOP);
    const condition = Blockly.Python.valueToCode(block, "UNTIL", Blockly.Python.ORDER_UNARY_SIGN) || "True";
    return "while not " + condition + ":" + NEWLINE + "  await runloop.sleep_ms(10)" + NEWLINE;
};
