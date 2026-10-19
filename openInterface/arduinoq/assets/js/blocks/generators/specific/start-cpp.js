/**
 * @fileoverview Start cpp generators for Arduino Q.
 */

Blockly.Arduino.cpp_on_start = function (block) {
    Blockly.Arduino.addInclude('license', "// SPDX-FileCopyrightText: Copyright (C) ARDUINO SRL (http://www.arduino.cc)\n// SPDX-License-Identifier: MPL-2.0\n");
    const stack = Blockly.Arduino.statementToCode(block, "DO");
    Blockly.Arduino.activateBlocks(block, stack);
    return ""; // DO NOT CHANGE
};

// Single start block: "DO" goes in setup(), "LOOP" in loop()
Blockly.Arduino.cpp_on_start_forever = function (block) {
    Blockly.Arduino.addInclude('license', "// SPDX-FileCopyrightText: Copyright (C) ARDUINO SRL (http://www.arduino.cc)\n// SPDX-License-Identifier: MPL-2.0\n");
    Blockly.Arduino.activateBlocks(block, Blockly.Arduino.statementToCode(block, "DO"), 'setup');
    Blockly.Arduino.activateBlocks(block, Blockly.Arduino.statementToCode(block, "LOOP"), 'loop');
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
            if (Blockly.Arduino[nextBlock.type] && !nextBlock.hasDisabledReason(Blockly.constants.MANUALLY_DISABLED)) {
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

/**
 * @param {string} [section] 'setup' or 'loop', deduced from the block type when not given
 */
Blockly.Arduino.activateBlocks = function (block, stack, section = null) {
    if (section === null) {
        section = ["cpp_on_start", "cpp_scratch_on_start"].includes(block.type) ? 'setup'
            : ["cpp_forever", "cpp_scratch_forever"].includes(block.type) ? 'loop' : null;
    }
    stack = Blockly.Arduino.addLoopTrap(stack, block);
    const splitted = stack.match(/[^\r\n]+/g);
    if (splitted != null) {
        splitted.forEach(element => {
            if (section === 'setup') {
                Blockly.Arduino.addUserSetup(Blockly.utils.idGenerator.genUid(), element);
            } else if (section === 'loop') {
                Blockly.Arduino.addUserLoop(Blockly.utils.idGenerator.genUid(), element);
            } else {
                throw Error('Statement "' + statement + '" is not defined. Unable to generate code in ' + block.type);
            }
        });
        if (section === 'loop' && Blockly.Constants.getSelectedBoard() == BOARD_ARDUINO_UNO_R4_WIFI) {
            const progMode = Blockly.Arduino.unor4wifi.getProgrammingMode();
            if (progMode.mode == Blockly.Arduino.unor4wifi.MODE_SERVER && progMode.loop) {
                Blockly.Arduino.addUserLoop(Blockly.utils.idGenerator.genUid(), '  vittaServer.closeClient();');
            } else if (progMode.mode == Blockly.Arduino.unor4wifi.MODE_CLIENT && progMode.loop) {
                Blockly.Arduino.addUserLoop(Blockly.utils.idGenerator.genUid(), '  vittaClient.clearBufferData();');
            }
        }
    }
};