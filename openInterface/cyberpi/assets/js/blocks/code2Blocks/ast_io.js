import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['sleep'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const checkImport = utils.checkImport(identifier);
	let sleep_count = window.Python2Blocks.interface_specific.time_sleep_count;

	if (sleep_count === 0) {
		window.Python2Blocks.interface_specific.time_sleep_count++;
		return 'first sleep';
	}

	if (checkImport && identifier === 'utime') {
		return {
			type: 'io_pause',
			fields: { UNIT: 'SECOND' },
			values: {
				TIME: null,
			},
			mutations: null,
			statementsNode: { TIME: statementsNode[0] },
			statements: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['sleep_ms'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const checkImport = utils.checkImport(identifier);
	if (checkImport && identifier === 'utime') {
		return {
			type: 'io_pause',
			fields: { UNIT: 'MILLI' },
			values: {
				TIME: null,
			},
			mutations: null,
			statementsNode: { TIME: statementsNode[0] },
			statements: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['sleep_us'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const checkImport = utils.checkImport(identifier);
	if (checkImport && identifier === 'utime') {
		return {
			type: 'io_pause',
			fields: { UNIT: 'MICRO' },
			values: {
				TIME: null,
			},
			mutations: null,
			statementsNode: { TIME: statementsNode[0] },
			statements: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['ticks_ms'] = function (type, identifier, values, mutations, statementsNode, statement) {
	Blockly.Python.addConstant('chronometer', 't0 = utime.ticks_ms()');
	return {
		type: 'io_initChronometer_simple',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

utils.prototypeBlocks['utime.ticks_diff'] = function (type, identifier, values, mutations, statementsNode, statement) {
	Blockly.Python.addConstant('chronometer', 't0 = utime.ticks_ms()');
	return {
		type: 'io_getChronometer',
		fields: { UNIT: 'MILLI' },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

// Buttons

// ========== CONTROLLER BUTTON BLOCKS ==========

// CyberPi Controller Is Button Pressed
utils.prototypeBlocks['cyberpi.controller.is_press'] = function (type, identifier, values, mutations, statementsNode, statement) {
	let button = 'a';
	const validButtons = ['a', 'b', 'up', 'down', 'left', 'right', 'middle', 'any_direction', 'any_button', 'any'];

	if (statementsNode && statementsNode[0] && statementsNode[0].type === 'string') {
		const buttonValue = utils.extractString(statementsNode[0]).text;
		if (validButtons.includes(buttonValue)) {
			button = buttonValue;
		}
	}

	return {
		type: 'io_controller_isButtonPressed',
		fields: {
			BUTTON: button,
		},
		values: {},
		mutations: null,
		statementsNode: {},
		statement: null,
	};
};

// CyberPi Controller Get Count
utils.prototypeBlocks['cyberpi.controller.get_count'] = function (type, identifier, values, mutations, statementsNode, statement) {
	let button = 'a';
	const validButtons = ['a', 'b', 'up', 'down', 'left', 'right', 'middle', 'any_direction', 'any_button', 'any'];

	if (statementsNode && statementsNode[0] && statementsNode[0].type === 'string') {
		const buttonValue = utils.extractString(statementsNode[0]).text;
		if (validButtons.includes(buttonValue)) {
			button = buttonValue;
		}
	}

	return {
		type: 'io_controller_get_count',
		fields: {
			BUTTON: button,
		},
		values: {},
		mutations: null,
		statementsNode: {},
		statement: null,
	};
};

// CyberPi Controller Reset Count
utils.prototypeBlocks['cyberpi.controller.reset_count'] = function (type, identifier, values, mutations, statementsNode, statement) {
	let button = 'a';
	const validButtons = ['a', 'b', 'up', 'down', 'left', 'right', 'middle', 'any_direction', 'any_button', 'any'];

	if (statementsNode && statementsNode[0] && statementsNode[0].type === 'string') {
		const buttonValue = utils.extractString(statementsNode[0]).text;
		if (validButtons.includes(buttonValue)) {
			button = buttonValue;
		}
	}

	return {
		type: 'io_controller_reset_count',
		fields: {
			BUTTON: button,
		},
		values: {},
		mutations: null,
		statementsNode: {},
		statement: null,
	};
};


utils.prototypeBlocks['cyberpi.controller.is_press_string'] = function (conditionNode, fields, values, mutations, statementBlock, statement, parent) {

	if (!conditionNode || conditionNode.type !== 'call') return null;

	let button = 'a';
	const validButtons = ['a', 'b', 'up', 'down', 'left', 'right', 'middle', 'any_direction', 'any_button', 'any'];

	for (const child of conditionNode.children) {
		if (child.type === 'argument_list') {
			const args = utils.getArgumentList(child.children);
			if (args.length > 0 && args[0].type === 'string') {
				const buttonValue = utils.extractString(args[0]).text;
				if (validButtons.includes(buttonValue)) {
					button = buttonValue;
				}
			}
		}
	}

	return {
		type: 'io_controller_onButtonPressed',
		fields: {
			BUTTON: button,
		},
		values: {},
		mutations: null,
		statementsNode: {},
		statements: {
			DO: statementBlock,
		},
	};
};

// event functions
// ========== EVENT DECORATOR BLOCKS ==========

// Event Start - @event.start + def on_start():
utils.prototypeBlocks['@event.start_on_start'] = function (decorator, functionDef, functionBlock, parent, args) {
	return {
		type: 'io_event_start',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: {},
		statements: {
			DO: functionBlock,
		},
	};
};

// Event Button Press - @event.is_press('button') + def on_button_pressed():
utils.prototypeBlocks['@event.is_press_on_button_pressed'] = function (decorator, functionDef, functionBlock, parent, args) {
	let button = 'a';
	const validButtons = ['a', 'b', 'up', 'down', 'left', 'right', 'middle', 'any_direction', 'any_button', 'any'];

	const decoratorText = decorator.text;
	const buttonMatch = decoratorText.match(/@event\.is_press\(['"]([^'"]+)['"]\)/);
	if (buttonMatch && validButtons.includes(buttonMatch[1])) {
		button = buttonMatch[1];
	}

	return {
		type: 'io_event_is_press',
		fields: {
			BUTTON: button,
		},
		values: {},
		mutations: null,
		statementsNode: {},
		statements: {
			DO: functionBlock,
		},
	};
};

// Event Receive - @event.receive('message') + def on_receive():
utils.prototypeBlocks['@event.receive_on_receive'] = function (decorator, functionDef, functionBlock, parent, args) {
	let message = 'message1';

	const decoratorText = decorator.text;
	const messageMatch = decoratorText.match(/@event\.receive\(['"]([^'"]+)['"]\)/);
	if (messageMatch) {
		message = messageMatch[1];
	}

	return {
		type: 'io_event_receive',
		fields: {
			MESSAGE: message,
		},
		values: {},
		mutations: null,
		statementsNode: {},
		statements: {
			DO: functionBlock,
		},
	};
};

// ========== BROADCAST BLOCK (simple function call) ==========

utils.prototypeBlocks['cyberpi.broadcast'] = function (type, identifier, values, mutations, statementsNode, statement) {
	let message = 'message1';

	if (statementsNode && statementsNode[0] && statementsNode[0].type === 'string') {
		message = utils.extractString(statementsNode[0]).text;
	}

	return {
		type: 'io_cyberpi_broadcast',
		fields: {
			MESSAGE: message,
		},
		values: {},
		mutations: null,
		statementsNode: {},
		statement: null,
	};
};


// IO

utils.prototypeBlocks['machine.Pin'] = function (type, identifier, values, mutations, statementsNode, statement, parent) {
	const className = parent.children[0].text;
	const checkClasses = utils.python2Blocks._classes[className];
	if (!checkClasses) {
		return '';
	}

	for (const child of statementsNode) {
		if (child.type === 'integer' || child.type === 'indentifier') {
			checkClasses.pin = child.text;
		} else if (child.type === 'attribute') {
			checkClasses.mode = child.text;
		}
	}
};

// pin declarations
utils.prototypeBlocks['define_pin'] = function (node, identifier) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return '';
	}

	let pinArgs = [];
	for (const arg of node.children) {
		if (arg.type === 'argument_list') {
			pinArgs = utils.getArgumentList(arg.children);
		}
	}

	// get the pin number and the mode (ex: Pin.IN or Pin.OUT)
	let pin = null;
	let mode = null;
	for (const pinArg of pinArgs) {
		if (pinArg.type === 'string') {
			pin = utils.extractString(pinArg);
		} else if (pinArg.type === 'attribute') {
			mode = pinArg;
		}
	}
	checkClasses.pin = pin.text;
	checkClasses.mode = mode.text;

	return '';
};

utils.prototypeBlocks['value'] = function (node, identifier) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return '';
	}
	const pin = checkClasses.pin;
	const mode = checkClasses.mode;
	if (!mode === 'machine.Pin.IN') {
		return '';
	}

	return {
		type: 'io_readDigitalPin',
		fields: { PIN: 'p' + pin },
		values: {},
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['on'] = function (node, identifier) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return '';
	}

	const pin = checkClasses.pin;
	const mode = checkClasses.mode;
	if (!mode === 'Pin.OUT') {
		return '';
	}
	return {
		type: 'io_writeDigitalPin',
		fields: { PIN: 'p' + pin },
		values: { STATE: null },
		mutations: null,
		statementsNode: { STATE: { type: 'bypass', block: 'HIGH_STATE_BOOL', text: 'HIGH', children: [] } },
		statements: null,
	};
};

utils.prototypeBlocks['off'] = function (node, identifier) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return '';
	}

	const pin = checkClasses.pin;
	const mode = checkClasses.mode;
	if (!mode === 'Pin.OUT') {
		return '';
	}

	return {
		type: 'io_writeDigitalPin',
		fields: { PIN: 'p' + pin },
		values: { STATE: null },
		mutations: null,
		statementsNode: { STATE: { type: 'bypass', block: 'LOW_STATE_BOOL', text: 'HIGH', children: [] } },
		statements: null,
	};
};

// Maybe tranforme this into a bypass function to avoid user to use HIGH and LOW as identifiers
utils.prototypeBlocks['HIGH_STATE_BOOL'] = function (type, identifier, values, mutations, statementsNode, statement) {
	return {
		type: 'io_digital_signal',
		fields: { BOOL: 'HIGH' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// Maybe tranforme this into a bypass function to avoid user to use HIGH and LOW as identifiers
utils.prototypeBlocks['LOW_STATE_BOOL'] = function (type, identifier, values, mutations, statementsNode, statement) {
	return {
		type: 'io_digital_signal',
		fields: { BOOL: 'LOW' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['machine.PWM'] = function (type, identifier, values, mutations, statementsNode, statement, parent) {
	const className = parent.children[0].text;
	const checkClasses = utils.python2Blocks._classes[className];

	if (!checkClasses) {
		return '';
	}

	const pwmData = {
		class: 'PWM',
		pin: '0',
		freq: '50',
		duty: '0',
	};

	if (statementsNode && statementsNode.length > 0) {
		let argIndex = 0;

		for (const child of statementsNode) {
			if (child.type === 'call' && child.text && child.text.includes('machine.Pin')) {
				for (const pinChild of child.children) {
					if (pinChild.type === 'argument_list') {
						const pinArgs = utils.getArgumentList(pinChild.children);
						if (pinArgs.length > 0 && (pinArgs[0].type === 'integer' || pinArgs[0].type === 'identifier')) {
							pwmData.pin = pinArgs[0].text;
						}
					}
				}
			} else if (child.type === 'integer' && argIndex === 0) {
				pwmData.pin = child.text;
			} else if (child.type === 'keyword_argument') {
				const keywordData = utils.extractKeyWordArgument(child);
				if (keywordData.key && keywordData.value) {
					const keyName = keywordData.key.text;
					const keyValue = keywordData.value;

					if (keyName === 'freq' && (keyValue.type === 'integer' || keyValue.type === 'identifier')) {
						pwmData.freq = keyValue.text;
					} else if (keyName === 'duty' && (keyValue.type === 'integer' || keyValue.type === 'identifier')) {
						pwmData.duty = keyValue.text;
					}
				}
			}
			argIndex++;
		}
	}

	Object.assign(checkClasses, pwmData);

	return '';
};

utils.prototypeBlocks['duty'] = function (node, identifier, value, mutation, statementsNode, statement, parent) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return '';
	}

	const pin = checkClasses.pin;

	let getDuty = statementsNode && statementsNode[0] ? statementsNode[0] : { type: 'integer', text: '1023', children: [] };
	if (getDuty.type === 'call' && getDuty.children[0].text === 'int') {
		if (getDuty.children && getDuty.children.length > 0) {
			for (const child of getDuty.children) {
				if (child.type === 'argument_list') {
					const argList = utils.getArgumentList(child.children);
					if (argList.length > 0) {
						getDuty = argList[0];
					}
				}
			}
		}
	}
	if (!pin) {
		return '';
	}

	return {
		type: 'io_writePwm',
		fields: { PIN: 'p' + pin },
		values: { VALUE: null },
		mutations: null,
		statementsNode: {
			VALUE: getDuty,
		},
		statements: null,
	};
};

utils.prototypeBlocks['freq'] = function (node, identifier, value, mutation, statementsNode, statement, parent) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return '';
	}

	const pin = checkClasses.pin;

	let getFreq = statementsNode && statementsNode[0] ? statementsNode[0] : { type: 'integer', text: '50', children: [] };
	if (getFreq.type === 'call' && getFreq.children[0].text === 'int') {
		if (getFreq.children && getFreq.children.length > 0) {
			for (const child of getFreq.children) {
				if (child.type === 'argument_list') {
					const argList = utils.getArgumentList(child.children);
					if (argList.length > 0) {
						getFreq = argList[0];
					}
				}
			}
		}
	}
	if (!pin) {
		return '';
	}

	return {
		type: 'io_setPwm',
		fields: { PIN: 'p' + pin },
		values: { FREQUENCY: null },
		mutations: null,
		statementsNode: {
			FREQUENCY: getFreq,
		},
		statements: null,
	};
}

const validPins = ['io2', 'io4', 'io5', 'io15', 'io21', 'io22', 'io23'];
for (const pin of validPins) {
	utils.prototypeBlocks[`${pin}isnotNone_string`] = function (type, identifier, values, mutations, statementsNode, statement) {
		const classes = utils.python2Blocks._classes;
		const checkClasses = classes[pin];
		if (!checkClasses) {
			return '';
		}

		return {
			type: 'io_stopPwm',
			fields: { PIN: 'p' + pin.replace('io', '') },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	};
}
