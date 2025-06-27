/**
 * @fileoverview Sensors generators for Esp32.
 */

// Esp32 board sensors

Blockly.Python.sensors_read_obstacle = function (block) {
    const position = block.getFieldValue('DIRECTION');
    const operator = block.getFieldValue('OPERATOR');    
    return [`prox_horizontal[${position}] ${operator}`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_get_line = function (block) {
    const direction = block.getFieldValue('DIRECTION');
    const value = block.getFieldValue('VALUE');
    let check
    if (value === 'black' || value === 'nothing'){
        check = '< 400'
    } else {
        check = '> 450'
    }
    let code = `prox_ground_delta[${direction}] ${check}`;

    if (direction === "2"){
        code = `prox_ground_delta[0] ${check} and prox_ground_delta[1] ${check}`;
    }

    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_get_proximity = function (block) {
    const position = block.getFieldValue('DIRECTION');
    if (position <7){
        return [`prox_horizontal[${position}]`, Blockly.Python.ORDER_ATOMIC];
    } else {
        if (position === '7'){
            return [`prox_ground_delta[0]`, Blockly.Python.ORDER_ATOMIC];
        } else if (position === '8'){
            return [`prox_ground_delta[1]`, Blockly.Python.ORDER_ATOMIC];
        }
    }
};

Blockly.Python.sensors_motor_speed = function (block) {
    const motor = block.getFieldValue('MOTOR');
    return [`motor_${motor}`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_get_accelerometer = function (block) {
    const axis = block.getFieldValue('AXIS');
    return [`acc[${axis}]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_get_temperature = function (block) {
    return [`temperature`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_get_microphone = function (block) {
    return [`mic_intensity`, Blockly.Python.ORDER_ATOMIC];
};

//ir communication
Blockly.Python.sensors_get_ir_communication = function (block) {
    return ["prox_com_rx", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_get_ir_remote = function (block) {
    const mode = block.getFieldValue('MODE');
    return [`rc5_${mode}`, Blockly.Python.ORDER_ATOMIC];
}




