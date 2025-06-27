/**
 * @fileoverview Start generators for Micro:bit.
 */

Blockly.Python.on_start = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    var statementStack = Blockly.Python.statementToCode(block, "DO");
    statementStack = statementStack.substr(2).replace(/\n  /g, '\n');
    Blockly.Python.userOnStart_.setup = statementStack;
    return ""; // DO NOT CHANGE
};

Blockly.Python.forever = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    var statements = Blockly.Python.statementToCode(block, "DO");
    statements = Blockly.Python.addLoopTrap(statements, block.id) || Blockly.Python.PASS;
    return "while True:" + NEWLINE + statements;
};

Blockly.Python.scratch_on_start = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return ""; // DO NOT CHANGE
};

Blockly.Python.scratch_forever = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    var statements = Blockly.Python.statementToCode(block, "DO");
    statements = Blockly.Python.addLoopTrap(statements, block.id) || Blockly.Python.PASS;
    let n = NEWLINE;
    if (block.previousConnection.targetBlock() !== null && block.previousConnection.targetBlock().type === 'scratch_on_start') {
        n = "";
    }
    return n + "while True:" + NEWLINE + statements;
};