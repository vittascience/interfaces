Simulator.CodeFriendly.getAdaptedCode = function (code) {
	code = Simulator.CodeFriendly.eliobot(code);
	return code;
};

Simulator.CodeFriendly.eliobot = function (code) {
	code = code.replace(/buttonIO([0-9]{1,2})\.value/g, 'buttonIO$1.value()');
	code = code.replace(/potIO([0-9]{1,2})\.value/g, 'potIO$1.value("potentiometer")');
	code = code.replace(/light_sensorIO([0-9]{1,2})\.value/g, 'light_sensorIO$1.value("light-sensor")');
	code = code.replace(/dht_sensor\.(humidity|temperature)/g, 'dht_sensor.$1()');
	code = code.replace(/pwm_([1-5])\.duty_cycle = (.*)/g, 'pwm_$1.duty_cycle("servo", $2)');
	code = code.replace('try:' + NEWLINE + TAB + 'with open("config.json", "r") as f:' + NEWLINE + TAB + 'calibration = json.load(f)' + NEWLINE + TAB + 'seuil = calibration["line_threshold"]' + NEWLINE + 'except:' + NEWLINE + TAB + 'seuil = 15000', 'seuil = 15000');
	code = code.replace('import json', '');
	return code;
};