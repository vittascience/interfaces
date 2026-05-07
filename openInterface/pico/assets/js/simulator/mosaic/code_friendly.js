Simulator.CodeFriendly.getAdaptedCode = function (code) {
	code = Simulator.CodeFriendly.replace_pinModules(code);
	code = Simulator.CodeFriendly.requests(code);
	code = code.replace(/.decode\(\)/gi, '');
	code = code.replace(/.decode\(['"]utf-8['"]\)/gi, '');
	code = code.replace(/.decode\(['"]utf-8['"],[ ]['"]ignore['"]\)/gi, '');
	return code;
};

Simulator.CodeFriendly.replace_pinModules = function (code) {
	//pico w integrated LED
	code = code.replace(/p0 = Pin\('LED', Pin\.OUT\)/, 'p0 = Pin(0, Pin.OUT)')
	//ultrasonic
	code = code.replace(/def grove_getUltrasonicData( |)\(/, 'def grove_getUltrasonicData_UNUSED(');
	code = code.replace(/def hcsr04_getUltrasonicData( |)\(/, 'def hcsr04_getUltrasonicData_UNUSED(');
	//pitch
	code = code.replace(/def pitch( |)\(/g, 'def pitch_UNUSED(');
	return code;
};

Simulator.CodeFriendly.requests = function (code) {
	code = code.replace(/((u|)requests\.|)request\((method=|)\'(POST|GET)\',( |)(url=|)(.*)(,( |)data=|)\).text/gi, "$1request($3'$4', $6$7$8).text()");
	code = code.replace(/request.text/gi, "request.text()");
	return code;
};