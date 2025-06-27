Simulator.CodeFriendly.getAdaptedCode = function (code) {
	code = Simulator.CodeFriendly.replace_pinModules(code);
	code = Simulator.CodeFriendly.remove_unusedCode(code);
	code = Simulator.CodeFriendly.requests(code);
	code = Simulator.CodeFriendly.display(code);
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

Simulator.CodeFriendly.remove_unusedCode = function (code) {
	// removing library imports
	code = code.replace(IMPORT_ESP32_PCF85063TP, '');
	// removing object inits
	code = code.replace('multichannel_v2 = GAS_GMXXX(0x08, i2c=I2C(scl=Pin(22), sda=Pin(21)))', '');
	code = code.replace(/(.*)UART\((.*)/g, '#$1UART($2');
	code = code.replace(/(.*)uart_(.*)/gi, '#$1uart_$2');
	code = code.replace(/(.*)openlog_[0-9]{1,}(.*)/gi, '$1uart$2');
	return code;
};

Simulator.CodeFriendly.display = function (code) {
	code = code.replace(/display\.console\.show\(\)/g, 'display.console_show()');
	code = code.replace(/display\.plot\.show\(\)/g, 'display.plot_show()');
	code = code.replace(/display\.plot\.add_point\((.*)\)/g, 'display.plot_add_point($1)');
	code = code.replace(/display\.plot\.set_y_scale\((.*)\)/g, 'display.plot_set_y_scale($1)');
	code = code.replace(/display\.plot\.set_animate_function\((.*)\)/g, 'display.plot_set_animate_function($1)');
	
	code = code.replace(/raw\s*=\s*display\.raw/g, '');
	code = code.replace(/display\.raw\.show\(\)/g, 'display.raw_show()');
	code = code.replace(/display\.raw\.print\((.*)\)/g, 'display.raw_print($1)');
	code = code.replace(/display\.raw\.print_bmp\((.*)\)/g, 'display.raw_print_bmp($1)');

	// classes
	code = code.replace(/display\.raw\.Text\((.*)\)/g, 'display_rawText($1)');
	code = code.replace(/display\.raw\.Rect\((.*)\)/g, 'display_rawRect($1)');
	return code;
};

Simulator.CodeFriendly.requests = function (code) {
	code = code.replace(/((u|)requests\.|)request\((method=|)\'(POST|GET)\',( |)(url=|)(.*)(,( |)data=|)\).text/gi, "$1request($3'$4', $6$7$8).text()");
	code = code.replace(/request.text/gi, "request.text()");
	return code;
};