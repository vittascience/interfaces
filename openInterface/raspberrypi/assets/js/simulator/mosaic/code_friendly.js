Simulator.CodeFriendly.getAdaptedCode = function (code) {
	code = Simulator.CodeFriendly.replace_pinModules(code);
	code = Simulator.CodeFriendly.senseHat(code);
	return code;
};

Simulator.CodeFriendly.replace_pinModules = function (code) {
	//ultrasonic
	code = code.replace(/def grove_getUltrasonicData( |)\(/, 'def grove_getUltrasonicData_UNUSED(');
	code = code.replace(/def hcsr04_getUltrasonicData( |)\(/, 'def hcsr04_getUltrasonicData_UNUSED(');
	//pitch
	code = code.replace(/def pitch( |)\(/g, 'def pitch_UNUSED(');
	return code;
};

Simulator.CodeFriendly.senseHat = function (code) {
	code = code.replace(/sense.stick.wait_for_event\(/g, 'sense.stick_wait_for_event(');
	code = code.replace(/event.(action|direction)/g, 'sense.stick_event("$1")');
	code = code.replace(/sense.stick.get_events\(\)/g, 'sense.stick_get_events()');
	return code
};