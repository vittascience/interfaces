/**
 * @fileoverview Start generators for TI-83 Premium CE.
 */

Blockly.Python.on_start = function (block) {
    var statementStack = Blockly.Python.statementToCode(block, "DO");
    statementStack = statementStack.substr(2).replace(/\n  /g, '\n');
    Blockly.Python.userOnStart_.setup = statementStack;
    return ""; // DO NOT CHANGE
};

Blockly.Python.forever = function (block) {
    const statements = Blockly.Python.addLoopTrap(Blockly.Python.statementToCode(block, "DO"), block.id) || Blockly.Python.PASS;
    return "while True:" + NEWLINE + statements;
};

Blockly.Python.scratch_on_start = function () {
    return ""; // DO NOT CHANGE
};

Blockly.Python.scratch_forever = function (block) {
    const statements = Blockly.Python.addLoopTrap(Blockly.Python.statementToCode(block, "DO"), block.id) || Blockly.Python.PASS;
    let n = NEWLINE;
    if (block.previousConnection.targetBlock() !== null && block.previousConnection.targetBlock().type === 'scratch_on_start') {
        n = "";
    }
    return n + "while True:" + NEWLINE + statements;
};