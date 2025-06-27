Simulator.CodeFriendly.getAdaptedCode = function (code) {
	code = Simulator.CodeFriendly.replace_pinModules(code);
	code = Simulator.CodeFriendly.remove_unusedCode(code);
	code = Simulator.CodeFriendly.requests(code);
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
	//code = code.replace(IMPORT_ESP32_SHT31, '');
	code = code.replace(IMPORT_ESP32_TH02, '');
	code = code.replace(IMPORT_OS, '');
	// removing object inits
	//code = code.replace('multichannel_v2 = GAS_GMXXX(0x08)', '');
	code = code.replace(/(.*)UART\((.*)/g, '#$1UART($2');
	code = code.replace(/(.*)uart_(.*)/gi, '#$1uart_$2');
	code = code.replace(/(.*)openlog_[0-9]{1,}(.*)/gi, '$1uart$2');
	code = code.replace('uart.read()', 'uart.read()');
	code = code.replace(/(.+)open\((.+)\)/g, '#$1open($2)');
	code = code.replace(/(.+)write\((.+)\)/g, '#$1write($2)');
	code = code.replace(/(.+)\.close\(\)/g, '#$1.close()');
	code = code.replace(/(os\.remove)\((.+)\)/g, '#os.remove($1)');
	return code;
};

Simulator.CodeFriendly.requests = function (code) {
	code = code.replace(/((u|)requests\.|)request\((method=|)\'(POST|GET)\',( |)(url=|)(.*)(,( |)data=|)\).text/gi, "$1request($3'$4', $6$7$8).text()");
	code = code.replace(/request.text/gi, "request.text()");
	return code;
};