Simulator.CodeFriendly.getAdaptedCode = function (code) {
	code = Simulator.CodeFriendly.replace_pinModules(code);
	code = Simulator.CodeFriendly.remove_unusedCode(code);
	code = Simulator.CodeFriendly.requests(code);
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

Simulator.CodeFriendly.remove_unusedCode = function (code) {
	// removing object inits
	code = code.replace('multichannel_v2 = GAS_GMXXX(0x08, i2c=I2C(scl=Pin(22), sda=Pin(21)))', '');
	// code = code.replace(/(.*)UART\((.*)/g, '#$1UART($2');
	// code = code.replace(/(.*)uart_(.*)/gi, '#$1uart_$2');
	code = code.replace(/(.*)uart\.read\(\)\.(.*)/gi, '$1uart.read()');

	code = code.replace(/(.*)openlog_[0-9]{1,}(.*)/gi, '$1uart$2');
	return code;
};

Simulator.CodeFriendly.requests = function (code) {
	code = code.replace(/((u|)requests\.|)request\((method=|)\'(POST|GET)\',( |)(url=|)(.*)(,( |)data=|)\).text/gi, "$1request($3'$4', $6$7$8).text()");
	code = code.replace(/request.text/gi, "request.text()");
	return code;
};