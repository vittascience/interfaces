/**
 * @fileoverview Start generators for the UNIHIKER M10.
 */

// Encoding line and time import first, whatever the order of the blocks (an event block above the start block
// adds its imports before)
Blockly.Python.unihikerHeader = function () {
    const imports = Blockly.Python.imports_;
    delete imports['coding-utf-8'];
    delete imports['time'];
    Blockly.Python.imports_ = Object.assign({ 'coding-utf-8': "# -*- coding: utf-8 -*-\n\n", 'time': IMPORT_TIME }, imports);
};

Blockly.Python.on_start = function (block) {
    Blockly.Python.unihikerHeader();
    let statementStack = Blockly.Python.statementToCode(block, "DO");
    statementStack = statementStack.substr(2).replace(/\n  /g, '\n');
    Blockly.Python.userOnStart_.setup = statementStack;
    return ""; // DO NOT CHANGE
};

// An empty loop pauses: it keeps the program running (events, screen) without using all the processor
const UNIHIKER_EMPTY_LOOP = '  time.sleep(0.1)' + NEWLINE;

Blockly.Python.forever = function (block) {
    let statements = Blockly.Python.statementToCode(block, "DO");
    statements = Blockly.Python.addLoopTrap(statements, block) || UNIHIKER_EMPTY_LOOP;
    return 'while True:' + NEWLINE + statements;
};

Blockly.Python.scratch_on_start = function () {
    Blockly.Python.unihikerHeader();
    return ""; // DO NOT CHANGE
};

Blockly.Python.scratch_forever = function (block) {
    let statements = Blockly.Python.statementToCode(block, "DO");
    statements = Blockly.Python.addLoopTrap(statements, block) || UNIHIKER_EMPTY_LOOP;
    let n = NEWLINE;
    const prevBlock = block.previousConnection.targetBlock();
    if (prevBlock !== null && prevBlock.type === 'scratch_on_start') {
        n = "";
    }
    return n + 'while True:' + NEWLINE + statements;
};