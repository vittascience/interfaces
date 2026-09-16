/**
 * @fileoverview Start cpp generators for Arduino Q.
 */

Blockly.Arduino.cpp_on_start = function (block) {
    Blockly.Arduino.addInclude('license', "// SPDX-FileCopyrightText: Copyright (C) ARDUINO SRL (http://www.arduino.cc)\n// SPDX-License-Identifier: MPL-2.0\n");
    const stack = Blockly.Arduino.statementToCode(block, "DO");
    Blockly.Arduino.activateBlocks(block, stack);
    return ""; // DO NOT CHANGE
};

Blockly.Arduino.cpp_forever = function (block) {
    const stack = Blockly.Arduino.statementToCode(block, "DO");
    Blockly.Arduino.activateBlocks(block, stack);
    return ""; // DO NOT CHANGE
};

Blockly.Arduino.cpp_scratch_on_start = function (block) {
    Blockly.Arduino.addInclude('license', "// SPDX-FileCopyrightText: Copyright (C) ARDUINO SRL (http://www.arduino.cc)\n// SPDX-License-Identifier: MPL-2.0\n");
    let stack = "";
    let nextBlock = block.nextConnection.targetBlock()
    while (nextBlock !== null) {
        if (nextBlock.type !== 'cpp_scratch_forever') {
            if (Blockly.Arduino[nextBlock.type] && !nextBlock.disabled) {
                let blockCode = Blockly.Arduino[nextBlock.type](nextBlock);
                if (blockCode !== undefined) {
                    stack += Blockly.Arduino.indent(blockCode, 1)
                }
            }
            nextBlock = nextBlock.nextConnection.targetBlock();
        } else {
            break;
        }
    }
    Blockly.Arduino.activateBlocks(block, stack);
    return ""; // DO NOT CHANGE
};

Blockly.Arduino.cpp_scratch_forever = function (block) {
    var stack = Blockly.Arduino.statementToCode(block, "DO");
    Blockly.Arduino.activateBlocks(block, stack);
    return ""; // DO NOT CHANGE
};

Blockly.Arduino.activateBlocks = function (block, stack) {
    stack = Blockly.Arduino.addLoopTrap(stack, block.id);
    const splitted = stack.match(/[^\r\n]+/g);
    if (splitted != null) {
        splitted.forEach(element => {
            if (block.type === "cpp_on_start" || block.type === "cpp_scratch_on_start") {
                Blockly.Arduino.addUserSetup(Blockly.utils.genUid(), element);
            } else if (block.type === "cpp_forever" || block.type === "cpp_scratch_forever") {
                Blockly.Arduino.addUserLoop(Blockly.utils.genUid(), element);
            } else {
                throw Error('Statement "' + statement + '" is not defined. Unable to generate code in ' + block.type);
            }
        });
        if ((block.type === "cpp_forever" || block.type === "cpp_scratch_forever") && Blockly.Constants.getSelectedBoard() == BOARD_ARDUINO_UNO_R4_WIFI) {
            const progMode = Blockly.Arduino.unor4wifi.getProgrammingMode();
            if (progMode.mode == Blockly.Arduino.unor4wifi.MODE_SERVER && progMode.loop) {
                Blockly.Arduino.addUserLoop(Blockly.utils.genUid(), '  vittaServer.closeClient();');
            } else if (progMode.mode == Blockly.Arduino.unor4wifi.MODE_CLIENT && progMode.loop) {
                Blockly.Arduino.addUserLoop(Blockly.utils.genUid(), '  vittaClient.clearBufferData();');
            }
        }
    }
};