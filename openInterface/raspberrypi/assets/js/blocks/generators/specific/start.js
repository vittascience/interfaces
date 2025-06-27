/**
 * @fileoverview Start generators for Raspberry Pi.
 */

Blockly.Python.on_start = function (block) {
    // Blockly.Python.addImport('gpio', IMPORT_GPIO);
    var statementStack = Blockly.Python.statementToCode(block, "DO");
    statementStack = statementStack.substr(2).replace(/\n  /g, '\n');
    Blockly.Python.userOnStart_.setup = statementStack;
    return ""; // DO NOT CHANGE
};

Blockly.Python.forever = function (block) {
    // Blockly.Python.addImport('gpio', IMPORT_GPIO);
    var statements = Blockly.Python.statementToCode(block, "DO");
    statements = Blockly.Python.addLoopTrap(statements, block.id) || Blockly.Python.PASS;
    return 'while True:' + NEWLINE + statements;
};

Blockly.Python.scratch_on_start = function () {
    return ""; // DO NOT CHANGE
};

Blockly.Python.scratch_forever = function (block) {
    // Blockly.Python.addImport('gpio', IMPORT_GPIO);
    var statements = Blockly.Python.statementToCode(block, "DO");
    statements = Blockly.Python.addLoopTrap(statements, block.id) || Blockly.Python.PASS;
    let n = NEWLINE;
    const prevBlock = block.previousConnection.targetBlock();
    if (prevBlock !== null && prevBlock.type === 'scratch_on_start') {
        n = "";
    }
    return n + 'while True:' + NEWLINE + statements;
};