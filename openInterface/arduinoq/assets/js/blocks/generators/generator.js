Blockly.Python.unoq = Object.create(null);

Blockly.Python.unoq.addImage = function (id, value) {
    if (Blockly.Python.uploadedImages_[id] === undefined) {
        Blockly.Python.uploadedImages_[id] = value;
    }
};

// On the UNO Q the sketch console is the bridge Monitor (read with `arduino-app-cli monitor`), not Serial:
// serial_setupConnection() waits forever on `while (!Serial)` and blocks setup(). The Serial calls of the
// shared Arduino blocks are renamed to Monitor in MultiCodeManager.
Blockly.Arduino.Generators.setupSerialConnection = function () {
    Blockly.Arduino.addInclude('Arduino_RouterBridge', INCLUDE_ARDUINO_ROUTER_BRIDGE);
    Blockly.Arduino.addSetup('bridge_begin', "Bridge.begin();");
    Blockly.Arduino.addSetup('setup_serial', "Monitor.begin();");
};

// Common "repeat forever" loop (block definitions: start-cpp.js)
Blockly.Arduino.controls_forever = function (block) {
    const branch = Blockly.Arduino.addLoopTrap(Blockly.Arduino.statementToCode(block, 'DO'), block);
    return 'while (true) {' + NEWLINE + branch + '}' + NEWLINE;
};

Blockly.Python.controls_forever = function (block) {
    const branch = Blockly.Python.addLoopTrap(Blockly.Python.statementToCode(block, 'DO'), block) || Blockly.Python.PASS;
    return 'while True:' + NEWLINE + branch;
};

Blockly.JavaScript.controls_forever = function (block) {
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'while (true) {' + NEWLINE + branch + '}' + NEWLINE;
};

// Common time blocks (Base > Time): the Arduino ones also generate Python on the Python thread
Blockly.Python.io_wait = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    const duration = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_MULTIPLICATIVE) || "0";
    const factor = { SEC: "", MILLI: " / 1000", MICRO: " / 1000000" }[block.getFieldValue("UNIT")] || "";
    return "time.sleep(" + duration + factor + ")" + NEWLINE;
};

Blockly.Python.io_waitUntil = function (block) {
    const condition = Blockly.Python.valueToCode(block, "UNTIL", Blockly.Python.ORDER_LOGICAL_NOT) || "True";
    return "while not " + condition + ":" + NEWLINE + Blockly.Python.INDENT + "pass" + NEWLINE;
};

// time.time(): time.clock() no longer exists since Python 3.8
Blockly.Python.io_initChronometer = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    block.workspace.getVariableMap().createVariable('t0');
    return "t0 = time.time()" + NEWLINE;
};

Blockly.Python.io_getChronometer = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    block.workspace.getVariableMap().createVariable('t0');
    // UNIT: number of milliseconds of the unit ("1000.0" = s, "1.0" = ms)
    const factor = block.getFieldValue("UNIT") === "1.0" ? " * 1000" : "";
    return ["(time.time() - t0)" + factor, Blockly.Python.ORDER_MULTIPLICATIVE];
};
