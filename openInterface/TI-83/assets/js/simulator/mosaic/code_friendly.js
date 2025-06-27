Simulator.CodeFriendly.getAdaptedCode = function (code) {
	code = Simulator.CodeFriendly.TI_simulator(code);
	code = Simulator.CodeFriendly.replace_pinModules(code);
	code = Simulator.CodeFriendly.replace_digitalReaders(code);
	code = Simulator.CodeFriendly.replace_analogReaders(code);
	code = Simulator.CodeFriendly.TI_plotlib_simulator(code);
	if (/turtle/.test(code)) {
		code = code.replace(/.goto\(/gi, '.gotoPos(');
	}
	return code;
};

Simulator.CodeFriendly.TI_plotlib_simulator = function (code) {
	// code = code.replace(/\b(x|y)(min|max)\b(?!\()/g, '$&()');
	code = code.replace(/plt.(a|b|m)\s*(?=[\)+\-\/\s=]|$)/g, 'plt.$1()');
	return code;
}

Simulator.CodeFriendly.replace_pinModules = function (code) {
	//thermometer
	code = code.replace(/([^.])temperature\(\)/g, '$1thermometer.readTemp()');
	//light level
	code = code.replace(/display\.read_light_level\(\)/g, 'light.read_light_level()');
	//servomotor
	code = code.replace(/setServoAngle\((pin[0-9]{1,2}),/gi, '$1.servo.setServoAngle($1,');
	code = code.replace(/setServoSpeed\((pin[0-9]{1,2}),/gi, '$1.continuousServo.setServoSpeed($1,');
	//mpx5700
	code = code.replace(/mpx5700_readPressure\((pin[0-9]{1,2})\)/g, '$1.mpx5700.readPressure($1)');
	//temperature
	code = code.replace(/getGroveTemperature\((pin[0-9]{1,2})\)/gi, '$1.groveTemp.Tcelsius($1)');
	code = code.replace(/getGroveTemperature\((pin[0-9]{1,2}),( |)(unit=|)'(celsius|fahrenheit|kelvin)'\)/gi, '$1.groveTemp.T$4($1)');
	//serialInput
	let uartInit = code.match(/uart\.init/);
	if (!uartInit) {
		code = code.replace(/uart\.any\(\)/g, 'serialInput.dataAvailable()');
		code = code.replace(/uart\.read\(\)/g, 'serialInput.readData()');
	}
	code = code.replace(/Color\(("|')(.*)("|')\)/g, 'Color($2)');
	code = code.replace(/NeoPixel\(("|')([^"']*)\1,\s*([0-9]+)/g, 'NeoPixel($2, $3');



	return code;
};

Simulator.CodeFriendly.replace_analogReaders = function (code) {
	regex = /#( |)(Potentiometer|(Moisture|Water|Light|Sound|Air Quality) Sensor) on (pin[0-9]{1,2})/gi;
	var modules = code.match(regex);
	if (modules) {
		for (let i = 0; i < modules.length; i++) {
			var moduleName = modules[i].match(/(Potentiometer|(Moisture|Water|Light|Sound|Air Quality) Sensor)/gi)['0'];
			var mod = '';
			switch (moduleName) {
				// TODO: update this part to enable the CASE
				case "Potentiometer":
					mod = 'potentiometer';
					break;
				case "Moisture Sensor":
					mod = 'groveMoisture';
					break;
				case "Water Sensor":
					mod = 'groveWater';
					break;
				case "Light Sensor":
					mod = 'groveLight';
					break;
				case "Sound Sensor":
					mod = 'groveSound';
					break;
				case "Air Quality Sensor":
					mod = 'airQuality';
					break;
				default:
					mod = null;
					break;
			}
			if (mod) {
				var pin = modules[i].match(/pin[0-9]{1,2}/)['0'];
				code = code.replace("# " + moduleName + " on " + pin, "# " + pin + '.' + mod + ' added.');
				code = code.replace(RegExp(pin + '.read_analog\\(\\)', 'g'), pin + '.' + mod + '.readAnalog(' + pin + ')');
			}
		}
	}
	return code;
};

Simulator.CodeFriendly.replace_digitalReaders = function (code) {
	regex = /#( |)((Touch |Switch |)Button|Anemometer|Rain Gauge|Line Finder|(Tilt|Motion|Vibration) Sensor|Colored Button \/read) on (pin[0-9]{1,2})/gi;
	var modules = code.match(regex);
	if (modules) {
		for (let i = 0; i < modules.length; i++) {
			var moduleName = modules[i].match(/((Touch |Switch |)Button|Anemometer|Rain Gauge|Line Finder|(Tilt|Motion|Vibration) Sensor|Colored Button \/read)/gi);
			moduleName = moduleName['0'];
			var mod = '';
			switch (moduleName) {
				// TODO: update this part to enable the CASE
				case "Touch Button":
					mod = 'touchButton';
					break;
				case "Simple Button":
					mod = 'button';
					break;
				case "Switch Button":
					mod = 'switchButton';
					break;
				case "Rain Gauge":
					mod = 'rainGauge';
					break;
				case "Anemometer":
					mod = 'anemometer';
					break;
				case "Line Finder":
					mod = 'groveFinder';
					break;
				case "Tilt Sensor":
					mod = 'groveTilt';
					break;
				case "Motion Sensor":
					mod = 'groveMotion';
					break;
				case "Vibration Sensor":
					mod = 'groveVibration';
					break;
				case "Colored Button / read":
					mod = 'coloredButton';
					break;
				default:
					throw "No pin module named: " + moduleName;
			}
			if (mod) {
				const pin = modules[i].match(/pin[0-9]{1,2}/)['0'];
				code = code.replace("# " + moduleName + " on " + pin, "# " + pin + '.' + mod + ' added.');
				code = code.replace(RegExp(pin + '.read_digital\\(\\)', 'g'), pin + '.' + mod + '.readDigital(' + pin.replace('pin', '') + ')');
			}
		}
	}
	return code;
};

Simulator.CodeFriendly.TI_simulator = function (code) {
	code = code.replace(/from mb_disp import \*/, '');
	code = code.replace(/from mb_butns import \*/, '');
	code = code.replace(/\"Image\.([A-Z_]{2,20})\"/g, 'Image.$1');
	return code;
};