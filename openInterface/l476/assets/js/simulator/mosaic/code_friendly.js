Simulator.CodeFriendly.getAdaptedCode = function (code) {
	code = Simulator.CodeFriendly.replace_pinModules(code);
	code = Simulator.CodeFriendly.LoRa(code);
	return code;
};

Simulator.CodeFriendly.replace_pinModules = function (code) {
	//ultrasonic
	code = code.replace(/def grove_getUltrasonicData( |)\(/, 'def grove_getUltrasonicData_UNUSED(');
	code = code.replace(/def hcsr04_getUltrasonicData( |)\(/, 'def hcsr04_getUltrasonicData_UNUSED(');
	//pitch
	code = code.replace(/def pitch( |)\(/g, 'def pitch_UNUSED(');
	//pin modules
	code = code.replace(/(.*)UART\((.*)/gi, '#$1UART($2');
	code = code.replace(/(.*)uart_(.*)/gi, '#$1uart_$2')
	code = code.replace(/.*tim_[0-9].channel.*/, '');
	return code;
};

Simulator.CodeFriendly.LoRa = function (code) {
	/* LoRa */
	code = code.replace(', DataReceiveCallback = DataReceived', '');
	code = code.replace('DevAddr = devAddr,AppEui  = appEui,AppKey  = appKey', 'devAddr,appEui,appKey');
	code = code.replace('PrintLoRaParameters()\nJoinNetwork()', '');
	code = code.replace(', Port=1, NeedAck= False', '');
	code = code.replace('singleData >> 8', 'int(singleData) >> 8');
	code = code.replace('singleData & 0xFF', 'int(singleData) & 0xFF');
	return code;
};