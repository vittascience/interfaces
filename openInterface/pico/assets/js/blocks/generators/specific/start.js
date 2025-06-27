/**
 * @fileoverview Start generators for Raspberry Pi Pico.
 */

Blockly.Python.on_start = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE_ALL);
    let statementStack = Blockly.Python.statementToCode(block, "DO");
    statementStack = statementStack.substr(2).replace(/\n  /g, '\n');
    Blockly.Python.userOnStart_.setup = statementStack;
    return ""; // DO NOT CHANGE
};

Blockly.Python.forever = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE_ALL);
    let statements = Blockly.Python.statementToCode(block, "DO");
    statements = Blockly.Python.addLoopTrap(statements, block.id) || Blockly.Python.PASS;
    const progMode = Blockly.Python.esp32.getProgrammingMode();
    if (progMode.mode == Blockly.Python.esp32.MODE_SERVER && progMode.loop) {
        return 'while True:' + NEWLINE + statements + '  server.closeClient(True)';
    } else if (progMode.mode == Blockly.Python.esp32.MODE_CLIENT && progMode.loop) {
        return 'while True:' + NEWLINE + statements + '  client.clearBufferData()';
    } else {
        return 'while True:' + NEWLINE + statements;
    }
};

Blockly.Python.scratch_on_start = function () {
    Blockly.Python.addImport('machine', IMPORT_MACHINE_ALL);
    return ""; // DO NOT CHANGE
};

Blockly.Python.scratch_forever = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE_ALL);
    let statements = Blockly.Python.statementToCode(block, "DO");
    statements = Blockly.Python.addLoopTrap(statements, block.id) || Blockly.Python.PASS;
    let n = NEWLINE;
    if (block.previousConnection.targetBlock() !== null && block.previousConnection.targetBlock().type === 'scratch_on_start') {
        n = "";
    }
    const progMode = Blockly.Python.esp32.getProgrammingMode();
    if (progMode.mode == Blockly.Python.esp32.MODE_SERVER && progMode.loop) {
        return n + 'while True:' + NEWLINE + statements + '  server.closeClient(True)';
    } else if (progMode.mode == Blockly.Python.esp32.MODE_CLIENT && progMode.loop) {
        return n + 'while True:' + NEWLINE + statements + '  client.clearBufferData()';
    } else {
        return n + 'while True:' + NEWLINE + statements;
    }
};