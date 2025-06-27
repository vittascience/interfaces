
Blockly.Python.niryo_initialization = function (block) {
    Blockly.Python.addImport('import_niryo', ROS_WRAPER);
    Blockly.Python.addImport('import_rospy', ROSPY);
    Blockly.Python.addInit('rospy_init', "rospy.init_node('niryo_interpreted_python_ros_wrapper')");
    Blockly.Python.addInit('niryo_init', "niryo_robot = NiryoRosWrapper()");
    Blockly.Python.addInit('calibrate_niryo', `niryo_robot.calibrate_auto()${NEWLINE}`);
};

Blockly.Python.niryo_joints = function(block) {
    Blockly.Python.niryo_initialization();
    const joint_1 = Blockly.Python.valueToCode(block, 'JOINT_1', Blockly.Python.ORDER_ATOMIC);
    const joint_2 = Blockly.Python.valueToCode(block, 'JOINT_2', Blockly.Python.ORDER_ATOMIC);
    const joint_3 = Blockly.Python.valueToCode(block, 'JOINT_3', Blockly.Python.ORDER_ATOMIC);
    const joint_4 = Blockly.Python.valueToCode(block, 'JOINT_4', Blockly.Python.ORDER_ATOMIC);
    const joint_5 = Blockly.Python.valueToCode(block, 'JOINT_5', Blockly.Python.ORDER_ATOMIC);
    const joint_6 = Blockly.Python.valueToCode(block, 'JOINT_6', Blockly.Python.ORDER_ATOMIC);
    return [`*[ ${joint_1}, ${joint_2}, ${joint_3}, ${joint_4}, ${joint_5}, ${joint_6} ]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.niryo_move_joints = function(block) {
    const joints = Blockly.Python.valueToCode(block, 'JOINTS', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.niryo_initialization(block);
    return `niryo_robot.move_joints(${joints})\n`;
};

// pose 

Blockly.Python.niryo_sleep_pose = function(block) {
    Blockly.Python.niryo_initialization();
    return `niryo_robot.move_to_sleep_pose()\n`;
};

Blockly.Python.niryo_pose = function(block) {
    const X = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC);
    const Y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC);
    const Z = Blockly.Python.valueToCode(block, 'Z', Blockly.Python.ORDER_ATOMIC);
    const roll = Blockly.Python.valueToCode(block, 'ROLL', Blockly.Python.ORDER_ATOMIC);
    const pitch = Blockly.Python.valueToCode(block, 'PITCH', Blockly.Python.ORDER_ATOMIC);
    const yaw = Blockly.Python.valueToCode(block, 'YAW', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.niryo_initialization();
    return [`*[ ${X}, ${Y}, ${Z}, ${roll}, ${pitch}, ${yaw} ]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.niryo_move_pose = function(block) {
    Blockly.Python.niryo_initialization();
    const type = block.getFieldValue('TYPE');
    const pose = Blockly.Python.valueToCode(block, 'POSE', Blockly.Python.ORDER_ATOMIC);
    return `niryo_robot.move${type}(${pose})\n`;
};

// Blockly.Python.niryo_move_pose_values = function(block) {
//     Blockly.Python.niryo_initialization();
//     const type = block.getFieldValue('TYPE');
//     const pose = Blockly.Python.valueToCode(block, 'POSE', Blockly.Python.ORDER_ATOMIC);
//     return `niryo_robot.move${type}(${pose})\n`;
// };

// shift pose 

Blockly.Python.niryo_shift_pose = function(block) {
    Blockly.Python.niryo_initialization();
    const axis = block.getFieldValue('AXIS');
    const type = block.getFieldValue('TYPE');
    const shift = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || 0;

    return `niryo_robot.shift${type}(ShiftPose.${axis}, ${shift})\n`;
};