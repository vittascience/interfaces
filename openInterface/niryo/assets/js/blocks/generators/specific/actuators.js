Blockly.Python.niryo_actuator_set_conveyor = function(block) {
    Blockly.Python.niryo_initialization();
    const conveyorId = block.getFieldValue('CONVEYOR');
    Blockly.Python.addInit("set_conveyor", "niryo_robot.set_conveyor()");
    Blockly.Python.addInit(`set_conveyorId_${conveyorId}`, `conveyor_id_${conveyorId} = ConveyorID.ID_${conveyorId}`)
    console.log(`Conveyor ID set to: ${conveyorId}`);
    return [`conveyor_id_${conveyorId}`, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.niryo_actuator_set_conveyor_speed = function(block){
    Blockly.Python.niryo_initialization();
    Blockly.Python.addInit("set_conveyor", "niryo_robot.set_conveyor()");
    const conveyorVar = Blockly.Python.valueToCode(block, 'CONVEYORID', Blockly.Python.ORDER_NONE) || "conveyor_id_1"; // Default to conveyor 1 if not specified
    
    const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_NONE) || "0";
    const direction = block.getFieldValue('DIRECTION');
    return `niryo_robot.control_conveyor(${conveyorVar}, True, ${speed}, ${direction})${NEWLINE}`;
};

Blockly.Python.niryo_actuator_stop_conveyor = function(block) {
    Blockly.Python.niryo_initialization();
    const conveyorVar = Blockly.Python.valueToCode(block, 'CONVEYORID', Blockly.Python.ORDER_NONE) || "conveyor_id_1"; // Default to conveyor 1 if not specified
    return `niryo_robot.control_conveyor(${conveyorVar}, False, 0, ConveyorDirection.FORWARD)${NEWLINE}niryo_robot.unset_conveyor(${conveyorVar})${NEWLINE}`;
}

// Sensor IR conveyor
Blockly.Python.niryo_actuator_convoyer_IR_sensor = function(block) {
    Blockly.Python.niryo_initialization();
    Blockly.Python.addInit("sensor_ir_conveyor", "sensor_pin_id = PinID.DI5")
    const stateSensorIr = block.getFieldValue('IRSENSOR');
    return [`niryo_robot.digital_read(sensor_pin_id) == ${stateSensorIr}`, Blockly.Python.ORDER_ATOMIC];
}