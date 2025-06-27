/**
 * @fileoverview Actuators generators for Esp32.
 */

Blockly.Python.robot_move = function (block) {
    const value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    let direction = block.getFieldValue('DIRECTION') || + 1;
    if (direction === 'BACKWARD') {
        direction = "-";
    } else {
        direction = "";
    }
    return "motor_left_target = " + direction + value + NEWLINE + "motor_right_target = " + direction + value + NEWLINE;
};

Blockly.Python.robot_rotate_clock = function (block) {
    const direction = block.getFieldValue('DIRECTION');
    const value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    if (direction === 'CLOCKWISE') {
        return "motor_left_target = "+value + NEWLINE + "motor_right_target = -"+ value + NEWLINE;
    } else {
        return "motor_left_target = -"+value + NEWLINE + "motor_right_target = "+ value + NEWLINE;
    }

};

Blockly.Python.robot_rotate_forever = function (block) {
    const direction = block.getFieldValue('DIRECTION');
    const value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    if (direction === 'FRONT_LEFT') {
        return "motor_left_target = 0" + NEWLINE + "motor_right_target = "+ value + NEWLINE;
    } else if (direction === 'FRONT_RIGHT') {
        return "motor_left_target = "+ value + NEWLINE + "motor_right_target = 0" + NEWLINE;
    } else if (direction === 'BACK_LEFT') {
        return "motor_left_target = 0" + NEWLINE + "motor_right_target = -"+ value + NEWLINE;
    } else if (direction === 'BACK_RIGHT') {
        return "motor_left_target = -"+ value + NEWLINE + "motor_right_target = 0" + NEWLINE;
    }
};
// stop single motor (left or right)
Blockly.Python.robot_stop_single_motor = function (block) {
    const motor = block.getFieldValue('MOTOR');
    if (motor === 'LEFT') {
        return "motor_left_target = 0" + NEWLINE;
    } else {
        return "motor_right_target = 0" + NEWLINE;
    }
};

// change speed of single motor (left or right)
Blockly.Python.robot_change_single_motor_speed = function (block) {
    const motor = block.getFieldValue('MOTOR');
    const speed = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    const dir = block.getFieldValue('DIR');
    if (motor === 'LEFT') {
        return "motor_left_target = "+ (dir === "clockwise" ? speed : `-${speed}`) + NEWLINE;
    } else {
        return "motor_right_target = "+ (dir === "clockwise" ? speed : `-${speed}`) + NEWLINE;
    }
};

Blockly.Python.robot_stop = function () {
    return "motor_left_target = 0" + NEWLINE + "motor_right_target = 0" + NEWLINE;
};

Blockly.Python.sound_stop_sound_system = function () {
    return "nf_sound_system(-1)" + NEWLINE;
};

Blockly.Python.sound_play_sound = function (block) {
    const sound = block.getFieldValue('SOUND');
    return "nf_sound_system(" + sound + ")" + NEWLINE;
};

Blockly.Python.sound_play_sound_freq = function (block) {
    const freq = Blockly.Python.valueToCode(block, 'FREQ', Blockly.Python.ORDER_ATOMIC);
    const duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_ATOMIC);
    return "nf_sound_freq(" + freq +','+ duration +")" + NEWLINE;
};