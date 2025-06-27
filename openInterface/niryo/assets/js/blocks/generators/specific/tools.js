
Blockly.Python.tool_open_gripper = function(block) {
    const speed = block.getFieldValue('SPEED');
    Blockly.Python.niryo_initialization();
    return `niryo_robot.open_gripper(${speed})\n`;
};

Blockly.Python.tool_close_gripper = function(block) {
    const speed = block.getFieldValue('SPEED');
    Blockly.Python.niryo_initialization();
    return `niryo_robot.close_gripper(${speed})\n`;
};