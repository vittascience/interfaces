/**
 * @fileoverview Start generators for Lego Spike.
 */

Blockly.Python.on_start = function (block) {
    Blockly.Python.addImport('port', IMPORT_PORT);
    let statementStack = Blockly.Python.statementToCode(block, "DO");
    statementStack = statementStack.substr(2).replace(/\n  /g, '\n');
    Blockly.Python.userOnStart_.setup = statementStack;
    return ""; // DO NOT CHANGE
};

Blockly.Python.forever = function (block) {
    let statements = Blockly.Python.statementToCode(block, "DO");
    statements = Blockly.Python.addLoopTrap(statements, block.id) || Blockly.Python.PASS;
    return 'while True:' + NEWLINE + statements;
};

Blockly.Python.scratch_on_start = function () {
    Blockly.Python.addImport('port', IMPORT_PORT);
    return ""; // DO NOT CHANGE
};

Blockly.Python.scratch_forever = function (block) {
    const prevBlock = block.previousConnection.targetBlock();
    const n = (prevBlock !== null && prevBlock.type === 'scratch_on_start' ? "" : NEWLINE);
    let statements = Blockly.Python.statementToCode(block, "DO");
    statements = Blockly.Python.addLoopTrap(statements, block.id) || Blockly.Python.PASS;
    return n + 'while True:' + NEWLINE + statements;
};