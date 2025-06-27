Simulator.CodeFriendly.getAdaptedCode = function (code) {
	code = Simulator.CodeFriendly.replace_pinModules(code);
	code = Simulator.CodeFriendly.remove_unusedCode(code);
	code = Simulator.CodeFriendly.microbitLogData(code);
	code = Simulator.CodeFriendly.trafficLight(code);
	return code;
};

Simulator.CodeFriendly.microbitLogData = function (code) {

	const labelAdded = (code) => {
		const args = (/log\.add\((.*)\)/g).exec(code);
		if (args) {
			const keys = [];
			const values = [];
			args[1].split(',').forEach(label => {
				const [key, value] = label.split('=');
				keys.push(key.trim());
				values.push(value.trim());
			});
			return { keys, values };
		}
	}

	// parse the code correctly to get all arguments of log.add ex => log.add(getGroveTemperature(pin0), pin1.read_analog(), ["label1","label2"])
	const labelToLog = labelAdded(code);
	if (labelToLog) {
		const { keys, values } = labelToLog;
		code = code.replace(/log\.add\((.*)\)/g, `log.add_log(${values.join(', ')}, ${JSON.stringify(keys)})`);
	}

	code = code.replace(/log\.delete\((.*)\)/g, "log.delete_log()");

	const getLabels = function (code) {
		const args = code.match(/log\.set_labels\((.*)\)/);
		let labels
		let timestamp = null;
		if (args) {
			labels = args[1].split(',').slice(0, -1).map(label => label.replace(/['"*]/g, ''));
			timestamp = args[1].split(',').slice(-1)[0].replace(/timestamp\s*=\s*log\.(.*)/g, "'$1'");
		}
		return [labels, timestamp];
	};
	// parse the code correctly to get all labels of log.set_labels and timestamp => log.set_labels(['label1', 'label2'], timestamp='SECONDES')
	const [labels, timestamp] = getLabels(code);
	if (labels !== null && timestamp !== null) {
		const labelsString = '[' + labels.map(label => "'" + label + "'").join(',') + ']';
		code = code.replace(/log\.set_labels\((.*)\)/, `log.set_labels(${labelsString}, ${timestamp})`);
	}
	return code
};

Simulator.CodeFriendly.replace_pinModules = function (code) {
	//ultrasonic
	code = code.replace(/def getUltrasonicData( |)\(/, 'def getUltrasonicData_UNUSED(');
	//ear-clip heart rate
	code = code.replace(/def read_heart_rate( |)\(/, 'def read_heart_rate_UNUSED(');
	//pitch
	code = code.replace(/def pitch( |)\(/g, 'def pitch_UNUSED(');
	//maqueen
	code = Simulator.CodeFriendly.maqueen(code);
	//kitrobot
	code = Simulator.CodeFriendly.kitrobot(code);
	//oled
	code = Simulator.CodeFriendly.oled(code);
	//codo
	code = Simulator.CodeFriendly.codo(code);
	//oobybot
	code = Simulator.CodeFriendly.oobybot(code);
	//buggy
	code = Simulator.CodeFriendly.buggy(code);
	//bitbot
	code = Simulator.CodeFriendly.bitbot(code);
	//bitcar
	code = Simulator.CodeFriendly.bitcar(code);
	//gamepad v4
	code = Simulator.CodeFriendly.gamepad_v4(code);
	//gamepad
	code = Simulator.CodeFriendly.gamepad(code);
	//bitplayer
	code = Simulator.CodeFriendly.bitplayer(code);
	//serialInput
	const uartInit = code.match(/uart\.init/);
	if (!uartInit) {
		code = code.replace(/uart\.any\(\)/g, 'serialInput.dataAvailable()');
		code = code.replace(/uart\.read\(\)/g, 'serialInput.readData()');
	}
	return code;
};

Simulator.CodeFriendly.remove_unusedCode = function (code) {
	// removing library imports
	code = code.replace('from machine import time_pulse_us', '');
	code = code.replace('from oled_mp import OLEDM', '');
	code = code.replace('from oled import OLED', '');
	code = code.replace('from buggyMove import MOVEMotor', '');
	// removing object inits
	code = code.replace(/.*MOVEmotor\(\)/gi, '');
	return code;
};

Simulator.CodeFriendly.maqueen = function (code) {
	let regExp = /i2c.write\(0x10,( |)bytearray\(\[(0x00|0x02|0|2),( |)(.{1,30}),( |)(.{1,30})\]\)\)/g;
	code = code.replace(regExp, 'maqueen.setMotor($2, $4, $6)');
	regExp = /i2c.write\(0x10,( |)bytearray\(\[(.{1,30}),( |)(.{1,30})\]\)\)/g;
	code = code.replace(regExp, 'maqueen.setServomotor($2, $4)');
	if (code.match(/((m|M)aqueen|npMaq)/g)) {
		regExp = /pin1(3|4).read_digital\(\)/g;
		code = code.replace(regExp, 'maqueen.readLine(pin1$1)');
	}
	return code;
};

Simulator.CodeFriendly.kitrobot = function (code) {
	let regExp = /setKitrobotServoSpeed\(pin(0|1)/g;
	code = code.replace(regExp, 'kitrobot.setServoSpeed(pin$1');
	if (code.match(/""" Kitrobot robot """/g)) {
		regExp = /pin(2|15).read_digital\(\)/g;
		code = code.replace(regExp, 'kitrobot.readLine(pin$1)');
	}
	return code;
};

Simulator.CodeFriendly.bitcar = function (code) {
	let regExp = /setBitCarServoSpeed\(pin1(3|5), pin1(4|6)/g;
	code = code.replace(regExp, 'bitcar.setBitCarServoSpeed(pin1$1, pin1$2');
	if (code.match(/""" BitCar robot """/g)) {
		regExp = /pin(1|2).read_digital\(\)/g;
		code = code.replace(regExp, 'bitcar.readLine(pin$1)');
	}
	return code;
};

Simulator.CodeFriendly.oled = function (code) {
	//screen
	code = code.replace(/oled = OLED(|M)\(\)/gi, 'oled.init()');
	code = code.replace(/STAMP_[A-Z_]{1,15} = oled\.create_stamp\(Image\.[A-Z_]{1,15}\)\n/gi, '');
	code = code.replace(/STAMP_([A-Z_]{1,15}),( |)s=(1|0)/g, 'Image.$1');
	//morpion
	code = code.replace('from morpion import MORPION', LIBRARY_MORPION);
	code = code.replace('MORPION(oled._s)', 'MORPION()');
	return code;
};

Simulator.CodeFriendly.codo = function (code) {
	if (/codo_control/.test(code)) {
		code = code.replace(/codo_controlLeftMotor\((\[(0|1),( |)(0|1)\]),/g, 'codo.controlLeftMotor($1,');
		code = code.replace(/codo_controlRightMotor\((\[(0|1),( |)(0|1)\]),/g, 'codo.controlRightMotor($1,');
	}
	return code;
};

Simulator.CodeFriendly.oobybot = function (code) {
	code = code.replace(/oobybot_controlMotors\(pin([1-2]{0,1}),(-?1),([0-9]{0,3})\)/gi, 'oobybot.oobybot_controlMotors(pin$1,$2,$3)');
	return code;
};

Simulator.CodeFriendly.buggy = function (code) {
	if (/buggy.stopMotors/.test(code)) {
		code = code.replace('buggy.stopMotors()', 'buggy.setLeftMotorSpeed(0)\nbuggy.setRightMotorSpeed(0)');
	}
	return code;
};

Simulator.CodeFriendly.bitbot = function (code) {
	if (/Bitbot/.test(code)) {
		code = code.replace(/pin12.write_digital\(/g, 'bitbot.setMotorRightDir(');
		code = code.replace(/pin1.write_analog\(/g, 'bitbot.setMotorRightSpeed(');
		code = code.replace(/pin8.write_digital\(/g, 'bitbot.setMotorLeftDir(');
		code = code.replace(/pin0.write_analog\(/g, 'bitbot.setMotorLeftSpeed(');
	}
	return code;
};

Simulator.CodeFriendly.gamepad = function (code) {
	if (/Gamepad/.test(code)) {
		code = code.replace(/pin1.read_digital/g, 'gamepad_in.getButton_X');
		code = code.replace(/pin2.read_digital/g, 'gamepad_in.getButton_Y');
		code = code.replace(/pin8.read_digital/g, 'gamepad_in.getButton_UP');
		code = code.replace(/pin13.read_digital/g, 'gamepad_in.getButton_DOWN');
		code = code.replace(/pin14.read_digital/g, 'gamepad_in.getButton_LEFT');
		code = code.replace(/pin15.read_digital/g, 'gamepad_in.getButton_RIGHT');
		code = code.replace(/pin12.write_digital\(/g, 'gamepad_out.setVibration(');
		code = code.replace(/pin16.write_digital\(/g, 'gamepad_out.setLED(');
	}
	return code;
};

Simulator.CodeFriendly.gamepad_v4 = function (code) {
	if (/Gamepad v4/.test(code)) {
		code = code.replace(/pin8.read_digital/g, 'gamepad_v4_in.getButton_Z');
		code = code.replace(/pin13.read_digital/g, 'gamepad_v4_in.getButton_C');
		code = code.replace(/pin14.read_digital/g, 'gamepad_v4_in.getButton_D');
		code = code.replace(/pin15.read_digital/g, 'gamepad_v4_in.getButton_E');
		code = code.replace(/pin16.read_digital/g, 'gamepad_v4_in.getButton_F');
		code = code.replace(/pin12.write_digital\(/g, 'gamepad_v4_out.setLEDandVibration(');
	}
	return code;
};

Simulator.CodeFriendly.bitplayer = function (code) {
	if (/BitPlayer/.test(code)) {
		code = code.replace(/pin5.read_digital/g, 'bitplayer_in.getButton_A');
		code = code.replace(/pin11.read_digital/g, 'bitplayer_in.getButton_B');
		code = code.replace(/pin13.read_digital/g, 'bitplayer_in.getButton_C');
		code = code.replace(/pin14.read_digital/g, 'bitplayer_in.getButton_D');
		code = code.replace(/pin15.read_digital/g, 'bitplayer_in.getButton_L');
		code = code.replace(/pin16.read_digital/g, 'bitplayer_in.getButton_R');
	}
	return code;
};

Simulator.CodeFriendly.trafficLight = function (code) {
	if (/Traffic Light/.test(code)) {
		code = code.replace(/pin0\.write_digital\((\d)\)/g, (_, p1) => {
			return `traffic_light.writeDigital("red", ${p1})`;
		});
		code = code.replace(/pin1\.write_digital\((\d)\)/g, (_, p1) => {
			return `traffic_light.writeDigital("orange", ${p1})`;
		});
		code = code.replace(/pin2\.write_digital\((\d)\)/g, (_, p1) => {
			return `traffic_light.writeDigital("green", ${p1})`;
		});
	}
	return code;
};