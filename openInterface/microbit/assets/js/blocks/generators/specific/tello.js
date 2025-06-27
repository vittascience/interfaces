/**
 * @fileoverview Tello generators for Micro:bit.
 */

//drone initialisation
Blockly.Python.drone_init = function (block) {
	Blockly.Python.addImport('tello', IMPORT_TELLO);
	Blockly.Python.addConstant('tello-drone', "\"\"\" Tello drone \"\"\"");
	const TX = block.getFieldValue('TX');
	const RX = block.getFieldValue('RX');
	const SSID = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_ATOMIC) || '""';
	Blockly.Python.addInit('tello', 'drone = Tello(' + TX + ',' + RX + ',' + SSID + ' )');
	return 'drone.drone_init()\n';
};

//Tello takeoff
Blockly.Python.tello_takeoff = function () {
	return "drone.send_cmd('takeoff')" + NEWLINE;
};

//Tello land
Blockly.Python.tello_land = function () {
	return "drone.send_cmd('land')" + NEWLINE;
};
//flip
Blockly.Python.tello_flip = function (block) {
	const flip = block.getFieldValue('FLIP');
	return "drone.send_cmd('flip " + flip + "')" + NEWLINE;
};
//Move
Blockly.Python.tello_move = function (block) {
	const direction = block.getFieldValue('DIRECTION');
	const distance = Blockly.Python.valueToCode(block, 'DISTANCE', Blockly.Python.ORDER_ATOMIC);
	return 'drone.send_cmd("' + direction + ' "+ str(' + distance + '))' + NEWLINE;
};

Blockly.Python.tello_move_up_down = function (block) {
	const direction = block.getFieldValue('DIRECTION');
	const altitude = Blockly.Python.valueToCode(block, 'ALTITUDE', Blockly.Python.ORDER_ATOMIC);
	return 'drone.send_cmd("' + direction + ' "+ str(' + altitude + '))\n';
};

//Rotate
Blockly.Python.tello_rotate = function (block) {
	const direction = block.getFieldValue('DIRECTION');
	const angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC) || '0';
	return 'drone.send_cmd("' + direction + ' "+ str(' + angle + '))' + NEWLINE;
};

//tello go x y z speed
Blockly.Python.tello_go = function (block) {
	//speed value
	const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC);
	const step = Blockly.Python.valueToCode(block, 'DISTANCE', Blockly.Python.ORDER_ATOMIC);
	Blockly.Python.addFunction('get_pos', FUNCTIONS_MICROBIT.DEF_TELLO_GO);
	return 'get_pos(' + step + ',' + speed + ')' + NEWLINE;
};

//Emergency
Blockly.Python.tello_emergency = function () {
	return "drone.send_cmd('emergency')" + NEWLINE;
};
//STOP
Blockly.Python.tello_stop = function () {
	return "drone.send_cmd('stop')" + NEWLINE;
};
//Speed
Blockly.Python.tello_speed = function () {
	return ["drone.send_cmd('speed?', False)", Blockly.Python.ORDER_ATOMIC];
};
//time
Blockly.Python.tello_flight_time = function () {
	return ["drone.send_cmd('time?, False')", Blockly.Python.ORDER_ATOMIC];
};
//battery
Blockly.Python.tello_battery = function () {
	return ["drone.send_cmd('battery?', False)", Blockly.Python.ORDER_ATOMIC];
};
//streaming video on
Blockly.Python.tello_stream_on = function () {
	return "drone.send_cmd('streamon')" + NEWLINE;
};
//streaming video off
Blockly.Python.tello_stream_off = function () {
	return "drone.send_cmd('streamoff')" + NEWLINE;
};

Blockly.Python.tello_rectangle_form = function (block) {
	const length = Blockly.Python.valueToCode(block, 'LENGTH', Blockly.Python.ORDER_ATOMIC);
	const width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_ATOMIC);
	Blockly.Python.addFunction('tello_draw_rectangle', FUNCTIONS_MICROBIT.DEF_TELLO_DRAW_RECTANGLE);
	return 'tello_draw_rectangle(' + length + ',' + width + ')' + NEWLINE;
};

Blockly.Python.tello_square_form = function (block) {
	const length = Blockly.Python.valueToCode(block, 'LENGTH', Blockly.Python.ORDER_ATOMIC);
	Blockly.Python.addFunction('tello_draw_square', FUNCTIONS_MICROBIT.DEF_TELLO_DRAW_SQUARE);
	return 'tello_draw_square(' + length + ')' + NEWLINE;
};
