
var $builtinmodule = function () {
	const sensors_service = {};


	const sensorButtonsValues = {
		'front': 0,
		'middle': 0,
		'rear': 0,
	}

	const bumpersSensorsValues = {
		'left': 0,
		'right': 0,
	}

	const handLeftValues = {
		'left': 0,
		'right': 0,
		'back': 0,
	}

	const handRightValues = {
		'left': 0,
		'right': 0,
		'back': 0,
	}


	sensors_service.__name__ = new Sk.builtin.str('sensors_service');
	
	const initSensors = (sensors, module, sensorValues) => {
		const headModule = document.getElementById(module);
		
		sensors.forEach((sensor) => {
			const button = headModule.getElementById(`${sensor}`);
			button.style.cursor = "pointer";
			if (button) {
				button.addEventListener("mousedown", () => {
					button.style.fill = "#22B573";
					sensorValues[sensor] =  1;
				});
				button.addEventListener("mouseup", () => {
					button.style.fill = "#393939";
				});
			} else {
				console.warn(`Button with ID "${sensor}" not found in SVG.`);
			}
		});
	};

	
	if (Simulator.code.match(/(Front|Middle|Rear|)TactilTouched/)) {
		initSensors(["front", "middle", "rear"], "head-sensors-nao-module", sensorButtonsValues);
	}

	if (Simulator.code.match(/(Left|Right|)BumperPressed/)) {
		initSensors(["left", "right"], "bumpers-sensors-nao-module", bumpersSensorsValues);
	}

	if (Simulator.code.match(/HandLeft(Back|Left|Right|)Touched/)) {
		initSensors(["left", "right", "back"], "hand-left-sensors-nao-module", handLeftValues);
	}

	if (Simulator.code.match(/HandRight(Back|Left|Right|)Touched/)) {
		initSensors(["left", "right", "back"], "hand-right-sensors-nao-module", handRightValues);
	}



	const timeStart = new Date().getTime();
	const maxBatteryTime = 60 * 10 * 1000; // 10 minutes

	sensors_service.BumperPressed = new Sk.builtin.func(function () {
		const state = bumpersSensorsValues["left"] || bumpersSensorsValues["right"];
		if (state === 1) {
			bumpersSensorsValues["left"] = 0;
			bumpersSensorsValues["right"] = 0;
		}
		return new Sk.builtin.int_(state);
	});

	sensors_service.LeftBumperPressed = new Sk.builtin.func(function () {
		const state = bumpersSensorsValues["left"];
		if (state === 1) {
			bumpersSensorsValues["left"] = 0;
		}
		return new Sk.builtin.int_(state);
	});


	sensors_service.RightBumperPressed = new Sk.builtin.func(function () {
		const state = bumpersSensorsValues["right"];
		if (state === 1) {
			bumpersSensorsValues["right"] = 0;
		}
		return new Sk.builtin.int_(state);
	});

	sensors_service.TactilTouched = new Sk.builtin.func(function () {
		const state = sensorButtonsValues["front"] || sensorButtonsValues["middle"] || sensorButtonsValues["rear"];
		if (state === 1) {
			sensorButtonsValues["front"] = 0;
			sensorButtonsValues["middle"] = 0;
			sensorButtonsValues["rear"] = 0;
		}
		return new Sk.builtin.int_(state);
	});

	sensors_service.FrontTactilTouched = new Sk.builtin.func(function () {
		
		const state = sensorButtonsValues["front"];
		if (state === 1) {
			sensorButtonsValues["front"] = 0;
		}
		return new Sk.builtin.int_(state);
	});

	sensors_service.MiddleTactilTouched = new Sk.builtin.func(function () {
		const state = sensorButtonsValues["middle"];
		if (state === 1) {
			sensorButtonsValues["middle"] = 0;
		}
		return new Sk.builtin.int_(state);
	});

	sensors_service.RearTactilTouched = new Sk.builtin.func(function () {
		
		const state = sensorButtonsValues["rear"];
		if (state === 1) {
			sensorButtonsValues["rear"] = 0;
		}
		return new Sk.builtin.int_(state);
	});

	sensors_service.HandLeftTouched = new Sk.builtin.func(function () {
		const state = handLeftValues["left"] || handLeftValues["right"] || handLeftValues["back"];
		if (state === 1) {
			handLeftValues["left"] = 0;
			handLeftValues["right"] = 0;
			handLeftValues["back"] = 0;
		}
		return new Sk.builtin.int_(state);
	});

	sensors_service.HandRightTouched = new Sk.builtin.func(function () {
		const state = handRightValues["left"] || handRightValues["right"] || handRightValues["back"];
		if (state === 1) {
			handRightValues["left"] = 0;
			handRightValues["right"] = 0;
			handRightValues["back"] = 0;
		}
		return new Sk.builtin.int_(state);
	});

	sensors_service.HandLeftLeftTouched = new Sk.builtin.func(function () {
		const state = handLeftValues["left"];
		if (state === 1) {
			handLeftValues["left"] = 0;
		}
		return new Sk.builtin.int_(state);
	});

	sensors_service.HandLeftRightTouched = new Sk.builtin.func(function () {
		const state = handLeftValues["right"];
		if (state === 1) {
			handLeftValues["right"] = 0;
		}
		return new Sk.builtin.int_(state);
	});

	sensors_service.HandLeftBackTouched = new Sk.builtin.func(function () {
		const state = handLeftValues["back"];
		if (state === 1) {
			handLeftValues["back"] = 0;
		}
		return new Sk.builtin.int_(state);
	});

	sensors_service.HandRightLeftTouched = new Sk.builtin.func(function () {
		const state = handRightValues["left"];
		if (state === 1) {
			handRightValues["left"] = 0;
		}
		return new Sk.builtin.int_(state);
	});

	sensors_service.HandRightRightTouched = new Sk.builtin.func(function () {
		const state = handRightValues["right"];
		if (state === 1) {
			handRightValues["right"] = 0;
		}
		return new Sk.builtin.int_(state);
	});

	sensors_service.HandRightBackTouched = new Sk.builtin.func(function () {
		const state = handRightValues["back"];
		if (state === 1) {
			handRightValues["back"] = 0;
		}
		return new Sk.builtin.int_(state);
	});

	sensors_service.getBatteryCharge = new Sk.builtin.func(function () {
		const currentTime = new Date().getTime();
		const elapsedTime = currentTime - timeStart;
		const charge = Math.round(100 - (elapsedTime / maxBatteryTime) * 100);
		return new Sk.builtin.int_(charge);
	});

	return sensors_service;
};