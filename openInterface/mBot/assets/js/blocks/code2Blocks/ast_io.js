import utils from '/openInterface/interfaces/assets/js/code2blocks/cpp/utils/utils.js';



utils.prototypeBlocks['delay'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_wait',
		fields: { UNIT: 'MILLI' },
		values: {
			TIME: null,
		},
		mutations: null,
		statementsNode: { TIME: statementsNode[0] },
		statement: null,
	};
};

utils.prototypeBlocks['delayMicroseconds'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_wait',
		fields: { UNIT: 'MICRO' },
		values: {
			TIME: null,
		},
		mutations: null,
		statementsNode: { TIME: statementsNode[0] },
		statement: null,
	};
};

utils.prototypeBlocks['pinMode'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	const pinUsed = Cpp2Blocks.pinModes;
	const isWithinSetup = Cpp2Blocks.isWithinSetup;

	let pin = null;
	let mode = null;
	for (const child of statementsNode) {
		if (child.type === 'number_literal' || child.type === 'identifier') {
			if (pin === null) {
				pin = child.text;
			} else {
				mode = child.text;
			}
		} else if (child.type === 'identifier') {
			mode = child.text;
		}
	}
	if (isWithinSetup) {
		pinUsed[pin] = mode;
	}
};

utils.prototypeBlocks['digitalWrite'] = function (type, fields, values, mutations, statementsNode, statement) {
	const checkMcore = Cpp2Blocks._includes.has('MeMCore.h');
	const pinUsed = Cpp2Blocks.pinModes;
	const checkPin = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
	let pin = null;
	let value;
	let needInput = false;
	for (const child of statementsNode) {
		if (child.type === 'number_literal' && checkPin.includes(child.text)) {
			pin = child.text;
		} else if (child.type === 'identifier' && pin === null) {
			if (child.text.match(/^PIN_LED_MODULE_(\d+|[A-Z]\d)$/)) {
				pin = child.text;
			} else if (checkPin.includes(child.text)) {
				pin = child.text;
			} else {
				pin = child;
				needInput = true;
			}
		} else if (child.type === 'identifier' && pin !== null) {
			value = child;
		}
	}

	if (pinUsed[pin] !== undefined || pinUsed[pin.text] !== undefined) {
		if (!needInput) {
			if (pin === '13') {
				if (checkMcore) {
					return {
						type: 'mCore_control_LED',
						fields: {},
						values: { STATE: null },
						mutations: null,
						statementsNode: { STATE: value },
						statement: null,
					}
				}
				return {
					type: 'io_control_arduino_led',
					fields: {},
					values: { STATE: null },
					mutations: null,
					statementsNode: { STATE: value },
					statement: null,
				};
			}
			if (pin.match(/^PIN_LED_MODULE_(\d+|[A-Z]\d)$/)) {
				pin = pin.match(/^PIN_LED_MODULE_(\d+|[A-Z]\d)$/)[1];
				return {
					type: 'display_setGroveSocketLed',
					fields: { PIN: pin },
					values: {STATE: null},
					mutations: null,
					statementsNode: { STATE: value },
					statement: null,
				};
			}

			return {
				type: 'io_writeDigitalPin',
				fields: { PIN: pin },
				values: { STATE: null },
				mutations: null,
				statementsNode: { STATE: value },
				statement: null,
			};
		} else {
			return {
				type: 'io_writeDigitalPin_input',
				fields: null,
				values: { PIN: null, STATE: null },
				mutations: null,
				statementsNode: { PIN: pin, STATE: value },
				statement: null,
			};
		}
	} else {
		return null;
	}

};

utils.prototypeBlocks['analogWrite'] = function (type, fields, values, mutations, statementsNode, statement) {
	const pinUsed = Cpp2Blocks.pinModes;
	let pin = null;
	let value;
	let needInput = false;
	for (const child of statementsNode) {
	if (child.type === 'identifier') {
		if (pin === null) {
			pin = child
			needInput = true;
		} else {
			value = child;
		}
	} else if (child.type === 'number_literal') {
			if (pin === null) {
				pin = child.text;
			} else {
				value = child;
			}
		} 
	}


	if (pinUsed[pin] !== undefined || pinUsed[pin.text] !== undefined) {
		if (!needInput) {

			return {
				type: 'io_writeAnalogPin',
				fields: { PIN: pin },
				values: { VALUE: null },
				mutations: null,
				statementsNode: { VALUE: value },
				statement: null,
			};
		} else {
			return {
				type: 'io_writeAnalogPin_input',
				fields: null,
				values: { PIN: null, VALUE: null },
				mutations: null,
				statementsNode: { PIN: pin, VALUE: value },
				statement: null,
			}
		}
	} else {
		return null;
	}
};

utils.prototypeBlocks['digitalRead'] = function (type, fields, values, mutations, statementsNode, statement) {
	const pinUsed = Cpp2Blocks.pinModes;
	const checkPin = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
	let pin = null;
	for (const child of statementsNode) {
		if (child.type === 'number_literal') {
			pin = child.text;
		} else if (child.type === 'identifier' && child.text.match(/^PIN_SIMPLE_BUTTON_(\d+|[A-Z]\d)$/)) {
			pin = child.text;
		} else if (child.type === 'identifier' && checkPin.includes(child.text)) {
			pin = child.text;
		}
	}

	if (pin !== null) {
		if (pin.match(/^PIN_SIMPLE_BUTTON_(\d+|[A-Z]\d)$/)) {
			pin = pin.match(/^PIN_SIMPLE_BUTTON_(\d+|[A-Z]\d)$/)[1];
			return {
				type: 'io_getGroveButton',
				fields: { PIN: pin },
				values: {},
				mutations: null,
				statementsNode: null,
				statement: null,
			};
		}
		return {
			type: 'io_readDigitalPin',
			fields: { PIN: pin },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	} else {
		return {
			type: 'io_readDigitalPin_input',
			fields: null,
			values: {VALUE : null},
			mutations: null,
			statementsNode: {VALUE: statementsNode[0]},
			statement: null,
		};
	}	
	
};

utils.prototypeBlocks['analogRead'] = function (type, fields, values, mutations, statementsNode, statement) {
	const pinUsed = Cpp2Blocks.pinModes;
	const checkPin = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
	let pin = null;
	for (const child of statementsNode) {
		if (child.type === 'identifier' && checkPin.includes(child.text)) {
			pin = child.text;
		}
	}

	if (pin !== null) {

		return {
			type: 'io_readAnalogPin',
			fields: { PIN: pin },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	} else {
		return {
			type: 'io_readAnalogPin_input',
			fields: null,
			values: {VALUE : null},
			mutations: null,
			statementsNode: {VALUE: statementsNode[0]},
			statement: null,
		};
	}	
	
};

utils.prototypeBlocks['HIGH'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_digital_signal',
		fields: { STATE: 'HIGH' },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

utils.prototypeBlocks['LOW'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_digital_signal',
		fields: { STATE: 'LOW' },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

utils.prototypeBlocks['LED_BUILTIN'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_led_builtin',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};


utils.prototypeBlocks['millis'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_getChronometer_simple',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

utils.prototypeBlocks['switch_1.touched'] = function (type, fields, values, mutations, statementsNode, statement) {
	const variables = Cpp2Blocks._variables;
	const port = variables["switch_1"]?.argument[0]?.text || "PORT_1";

	return {
		type: "robots_makeBlock_getSwitchState",
		fields: { PORT: port, SLOT: "1" },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	}
	
}

utils.prototypeBlocks['switch_2.touched'] = function (type, fields, values, mutations, statementsNode, statement) {
	const variables = Cpp2Blocks._variables;
	const port = variables["switch_2"]?.argument[0]?.text || "PORT_2";

	return {
		type: "robots_makeBlock_getSwitchState",
		fields: { PORT: port, SLOT: "2" },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	}	
}

utils.prototypeBlocks['joystick.readX'] = function (type, fields, values, mutations, statementsNode, statement) {
	const variables = Cpp2Blocks._variables;
	const port = variables["joystick"]?.argument?.children[1]?.text || "PORT_1";
	return {
		type: "robots_makeBlock_getJoystickAxis",
		fields: { PORT: port, AXIS: "X" },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	}
}

utils.prototypeBlocks['joystick.readY'] = function (type, fields, values, mutations, statementsNode, statement) {
	const variables = Cpp2Blocks._variables;
	const port = variables["joystick"]?.argument?.children[1]?.text || "PORT_1";
	return {
		type: "robots_makeBlock_getJoystickAxis",
		fields: { PORT: port, AXIS: "Y" },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	}
}

utils.prototypeBlocks['potentiometer.read'] = function (type, fields, values, mutations, statementsNode, statement) {
	const variables = Cpp2Blocks._variables;
	const port = variables["potentiometer"]?.argument?.children[1]?.text || "PORT_1";
	return {
		type: "robots_makeBlock_getPotentiometer",
		fields: { PORT: port },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	}
}

utils.prototypeBlocks['buttons.pressed'] = function (type, fields, values, mutations, statementsNode, statement) {
	const variables = Cpp2Blocks._variables;
	const port = variables["buttons"]?.argument?.children[1]?.text || "PORT_1";
	return {
		type: "robots_makeBlock_getPressedButton",
		fields: { PORT: port },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	}
}

utils.prototypeBlocks['touchButton.touched'] = function (type, fields, values, mutations, statementsNode, statement) {
	const variables = Cpp2Blocks._variables;
	const port = variables["touchButton"]?.argument?.children[1]?.text || "PORT_1";
	return {
		type: "robots_makeBlock_getTouchSensorState",
		fields: { PORT: port },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	}
}


utils.prototypeBlocks['pulseIn'] = function (type, fields, values, mutations, statementsNode, statement) {
	let state = {type: "identifier", text: "HIGH", children: []};
	let pin = null;

	for (const child of statementsNode) {
		if (child.type === 'number_literal'){
			pin = child.text;
		} else if (child.type === 'identifier') {
			state = child;
		}
	}

	return {
		type: 'io_readPulseIn',
		fields: { PIN: pin },
		values: { STATE: null },
		mutations: null,
		statementsNode: { STATE: state },
		statement: null,
	};
}