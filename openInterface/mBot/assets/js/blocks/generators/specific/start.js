/**
 * @fileoverview Start generators for mBot.
 */

Blockly.Arduino.on_start = function (block) {
    const stack = Blockly.Arduino.statementToCode(block, "DO");
    Blockly.Arduino.addInclude('MeMCore', INCLUDE_MEMCORE);
    Blockly.Arduino.addInclude('Arduino', INCLUDE_ARDUINO);
    Blockly.Arduino.addInclude('Wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('SoftwareSerial', INCLUDE_SOFTWARE_SERIAL);
    Blockly.Arduino.activateBlocks(block, stack);
    return ""; // DO NOT CHANGE
};

Blockly.Arduino.forever = function (block) {
    var stack = Blockly.Arduino.statementToCode(block, "DO");
    Blockly.Arduino.activateBlocks(block, stack);
    return ""; // DO NOT CHANGE
};

Blockly.Arduino.scratch_on_start = function (block) {
    let stack = "";
    let nextBlock = block.nextConnection.targetBlock()
    while (nextBlock !== null) {
        if (nextBlock.type !== 'scratch_forever') {
            let blockCode = Blockly.Arduino[nextBlock.type](nextBlock);
            if (blockCode !== undefined) {
                stack += Blockly.Arduino.indent(blockCode, 1)
            }
            nextBlock = nextBlock.nextConnection.targetBlock();
        } else {
            break;
        }
    }
    Blockly.Arduino.addInclude('MeMCore', INCLUDE_MEMCORE);
    Blockly.Arduino.addInclude('Arduino', INCLUDE_ARDUINO);
    Blockly.Arduino.addInclude('Wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('SoftwareSerial', INCLUDE_SOFTWARE_SERIAL);
    Blockly.Arduino.activateBlocks(block, stack);
    return ""; // DO NOT CHANGE
};

Blockly.Arduino.scratch_forever = function (block) {
    var stack = Blockly.Arduino.statementToCode(block, "DO");
    Blockly.Arduino.activateBlocks(block, stack);
    return ""; // DO NOT CHANGE
};

Blockly.Arduino.activateBlocks = function (block, stack) {
    stack = Blockly.Arduino.addLoopTrap(stack, block.id);
    var splitted = stack.match(/[^\r\n]+/g);
    if (splitted != null) {
        splitted.forEach(element => {
            if (block.type === "on_start" || block.type === "scratch_on_start") {
                Blockly.Arduino.addUserSetup(Blockly.utils.genUid(), element);
            } else if (block.type === "forever" || block.type === "scratch_forever") {
                Blockly.Arduino.addUserLoop(Blockly.utils.genUid(), element);
            } else {
                throw Error('Statement "' + statement + '" is not defined. Unable to generate code in ' + block.type);
            }
        });
    }
};