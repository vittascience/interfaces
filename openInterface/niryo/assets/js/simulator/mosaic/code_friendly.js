Simulator.CodeFriendly.getAdaptedCode = function (code) {
	code = Simulator.CodeFriendly.niryo(code)
	code = Simulator.CodeFriendly.end_of_program(code);
	return code;
};


Simulator.CodeFriendly.niryo = function (code) {
	code = code.replace(/led_ring\.(solid|flashing|chase|set_led_color|wipe|rainbow|rainbow_cyle|go_up|go_up_down)/g, 'led_ring_$1');
	code = code.replace(/ConveyorID\.(ID_1|ID_2)/g, 'niryo_robot.get_conveyor_id("$1")');
	code = code.replace(/PinID\.(DI5)/g, 'niryo_robot.get_sensor_pin_id("$1")');
	code = code.replace(/ConveyorDirection\.(FORWARD|BACKWARD)/g, '"$1"');
	code = code.replace(/PinState\.(HIGH|LOW)/g, 'niryo_robot.get_pin_state("$1")');
	return code;

};

Simulator.CodeFriendly.end_of_program = function (code) {
	// add end_of_program() at the end of the program if NiryoRosWrapper class is defined
	if (code.match(/niryo_robot = NiryoRosWrapper()/g)){
		code += '\n\nniryo_robot.end_of_program()\n';
	}
	return code;
};




