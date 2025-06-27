import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['sleep'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const checkImport = utils.checkImport(identifier);
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


utils.prototypeBlocks['button_a.is_pressed'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_isButtonPressed',
		fields: { BUTTON: 'a', STATE: 'is_' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
}

utils.prototypeBlocks['button_b.is_pressed'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_isButtonPressed',
		fields: { BUTTON: 'b', STATE: 'is_' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
}
utils.prototypeBlocks['button_a.was_pressed'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_isButtonPressed',
		fields: { BUTTON: 'a', STATE: 'was_' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
}
utils.prototypeBlocks['button_b.was_pressed'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_isButtonPressed',
		fields: { BUTTON: 'b', STATE: 'was_' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};


utils.prototypeBlocks['pin_logo.is_touched()_string'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_onPinPressed',
		fields: { PIN: 'pin_logo' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: { DO: statementsNode },
	};
};

utils.prototypeBlocks['pin0.is_touched()_string'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_onPinPressed',
		fields: { PIN: 'pin0' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: { DO: statementsNode },
	};
};

utils.prototypeBlocks['pin1.is_touched()_string'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_onPinPressed',
		fields: { PIN: 'pin1' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: { DO: statementsNode },
	};
};

utils.prototypeBlocks['pin2.is_touched()_string'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_onPinPressed',
		fields: { PIN: 'pin2' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: { DO: statementsNode },
	};
};

const gestureMap = ['up', 'down', 'left', 'right', 'face up', 'face down', 'freefall', '3g', '6g', '8g', 'shake', 'logo up', 'logo down'];

for (let i = 0; i < gestureMap.length; i++) {
	utils.prototypeBlocks[`accelerometer.current_gesture()=='${gestureMap[i]}'_string`] = function (type, fields, values, mutations, statementsNode, statement) {
		return {
			type: 'io_onMovement',
			fields: { MOV: gestureMap[i] },
			values: null,
			mutations: null,
			statementsNode: null,
			statements: { DO: statementsNode },
		};
	};
}

utils.prototypeBlocks['write_digital'] = function (type, pin, statementsNode, parent) {
	let value = null;
	if (statementsNode.length === 0) {
		value = { type: 'bypass', block: 'io_digital_signal', text: '0' };
	} else if (statementsNode[0].type === 'integer') {
		if (statementsNode[0].text === '0' || statementsNode[0].text === '1') {
			value = { type: 'bypass', block: 'io_digital_signal', text: statementsNode[0].text };
		}
	} else if (statementsNode[0].type === 'identifier' || statementsNode[0].type === 'true' || statementsNode[0].type === 'false') {
		value = statementsNode[0];
	}

	// check for modules
	const blockCodeFlag = utils.checkCodeFlag(pin);
	if (blockCodeFlag && utils.prototypeBlocks[blockCodeFlag]) {
		return utils.prototypeBlocks[blockCodeFlag](pin, statementsNode, parent);
	}

	return {
		type: 'io_writeDigitalPin',
		fields: { PIN: pin },
		values: { STATE: null },
		mutations: null,
		statementsNode: { STATE: value },
		statements: null,
	};
};

utils.prototypeBlocks['io_digital_signal'] = function (value, parent) {
	let state = null;
	if (value === '0') {
		state = 'LOW';
	} else if (value === '1') {
		state = 'HIGH';
	}
	return {
		type: 'io_digital_signal',
		fields: { BOOL: state },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['read_digital'] = function (type, pin, statementsNode, parent) {
	// check for modules
	const blockCodeFlag = utils.checkCodeFlag(pin);
	if (blockCodeFlag && utils.prototypeBlocks[blockCodeFlag]) {
		return utils.prototypeBlocks[blockCodeFlag](pin, statementsNode, parent);
	}

	return {
		type: 'io_readDigitalPin',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['read_analog'] = function (type, pin, statementsNode, parent) {
	// check for modules
	const blockCodeFlag = utils.checkCodeFlag(pin);
	if (blockCodeFlag && utils.prototypeBlocks[blockCodeFlag]) {
		return utils.prototypeBlocks[blockCodeFlag](pin, statementsNode, parent);
	}

	return {
		type: 'io_readAnalogPin',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['write_analog'] = function (type, pin, statementsNode, parent) {
	// check Comments
	const blockCodeFlag = utils.checkCodeFlag(pin);
	if (blockCodeFlag && utils.prototypeBlocks[blockCodeFlag]) {
		return utils.prototypeBlocks[blockCodeFlag](pin, statementsNode, parent);
	}

	let analogValue = { type: 'integer', text: '1023' };

	if (statementsNode.length > 0) {
		analogValue = statementsNode[0];
	}

	return {
		type: 'io_writeAnalogPin',
		fields: { PIN: pin },
		values: { VALUE: null },
		mutations: null,
		statementsNode: { VALUE: analogValue },
		statements: null,
	};
};

utils.prototypeBlocks['set_analog_period'] = function (type, pin, value, parent) {
	let time = { type: 'integer', text: '1000' };
	if (value.length > 0) {
		time = value[0];
	}

	return {
		type: 'io_setPwm',
		fields: { UNIT: 'MS', PIN: pin },
		values: { PERIOD: null },
		mutations: null,
		statementsNode: { PERIOD: time },
		statements: null,
	};
};

utils.prototypeBlocks['set_analog_period_microseconds'] = function (type, pin, value, parent) {
	let time = { type: 'integer', text: '1000' };
	if (value.length > 0) {
		time = value[0];
	}

	return {
		type: 'io_setPwm',
		fields: { UNIT: 'US', PIN: pin },
		values: { PERIOD: null },
		mutations: null,
		statementsNode: { PERIOD: time },
		statements: null,
	};
};
for (const button of ['a', 'b']) {
	utils.prototypeBlocks[`button_${button}.get_presses`] = function (type, fields, values, mutations, statementsNode, statement) {
		return {
			type: 'io_buttons_getPresses',
			fields: { BUTTON: button },
			mutations: null,
			values: null,
			statementsNode: null,
			statements: null,
		};
	};
}

utils.prototypeBlocks['@run_every_every_function_1'] = function (decorator, functionDef, functionBlock, parent, args) {
	let keywordArgsList = null;
	let hours = null;
	let minutes = null;
	let seconds = null;
	let milliseconds = null;

	for (const child of decorator.children) {
		if (child.type === 'call') {
			for (const callChild of child.children) {
				if (callChild.type === 'argument_list') {
					keywordArgsList = utils.getArgumentList(callChild.children);
				}
			}
		}
	}

	if (keywordArgsList) {
		for (const argsList of keywordArgsList) {
			if (argsList.type === 'keyword_argument' && argsList.children.length === 3) {
				for (const arg of argsList.children) {
					if (arg.type === 'identifier' && arg.text === 's') {
						seconds = argsList.children[2];
					} else if (arg.type === 'identifier' && arg.text === 'ms') {
						milliseconds = argsList.children[2];
					} else if (arg.type === 'identifier' && arg.text === 'min') {
						minutes = argsList.children[2];
					} else if (arg.type === 'identifier' && arg.text === 'h') {
						hours = argsList.children[2];
					}
				}
			}
		}
	}

	return {
		type: 'io_runEvery',
		fields: null,
		mutations: null,
		values: {
			H: null,
			MIN: null,
			S: null,
			MS: null,
		},
		statementsNode: {
			H: hours || { type: 'integer', text: '0' },
			MIN: minutes || { type: 'integer', text: '0' },
			S: seconds || { type: 'integer', text: '1' },
			MS: milliseconds || { type: 'integer', text: '0' },
		},
		statements: { DO: functionBlock },
	};
};

const micSoundType = ['LOUD', 'QUIET'];
for (const sound of micSoundType) {
	utils.prototypeBlocks[`microphone.was_sound(SoundEvent.${sound})_string`] = function (type, fields, values, mutations, statementsNode, statement) {
		return {
			type: 'io_micro_onSoundDetected',
			fields: {
				STATE: sound,
				TYPE: 'WAS',
			},
			values: null,
			mutations: null,
			statementsNode: null,
			statements: { DO: statementsNode },
		};
	};

	utils.prototypeBlocks[`microphone.current_event()==SoundEvent.${sound}_string`] = function (type, fields, values, mutations, statementsNode, statement) {
		return {
			type: 'io_micro_onSoundDetected',
			fields: {
				STATE: sound,
				TYPE: 'IS',
			},
			values: null,
			mutations: null,
			statementsNode: null,
			statements: { DO: statementsNode },
		};
	};

	utils.prototypeBlocks[`SoundEvent.${sound}`] = function (type, fields, values, mutations, statementsNode, statement) {
		return {
			type: 'io_micro_soundCondition',
			fields: {
				STATE: sound || 'LOUD',
			},
			values: null,
			mutations: null,
			statementsNode: null,
			statements: null,
		};
	};
}

utils.prototypeBlocks['microphone.current_event'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_micro_getCurrentSound',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['microphone.was_sound'] = function (type, fields, values, mutations, statementsNode, statement) {

	let soundType = null;

	if (statementsNode.length > 0) {
		if (statementsNode[0].type === 'attribute' && statementsNode[0].children.length === 3) {
			soundType = statementsNode[0].children[2].text;
		}
	}

	return {
		type: 'io_micro_wasSoundDetected',
		fields: {
			STATE: soundType || 'LOUD',
		},
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['microphone.sound_level'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_micro_getSoundLevel',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['microphone.get_sounds'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'io_micro_getHistorySounds',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['microphone.set_threshold'] = function (type, fields, values, mutations, statementsNode, statement) {
	let soundType = null;
	let threshold = null;

	if (statementsNode.length > 0) {
		for (const child of statementsNode) {
			if (child.type === 'attribute' && child.children.length === 3) {
				soundType = child.children[2].text;
			} else if (threshold === null) {
				threshold = child;
			}
		}
	}

	return {
		type: 'io_micro_setSoundThreshold',
		fields: {
			STATE: soundType || 'LOUD',
		},
		values: {
			THRESH: null,
		},
		mutations: null,
		statementsNode: { THRESH: threshold || { type: 'integer', text: '255', children: [] } },
		statements: null,
	};
};

utils.prototypeBlocks['#SimpleButtonon'] = function (pin, statementsNode, parent) {
	return {
		type: 'io_getGroveButton',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['#SwitchButtonon'] = function (pin, statementsNode, parent) {
	return {
		type: 'io_getGroveSwitch',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['#MagneticSwitchon'] = function (pin, statementsNode, parent) {
	return {
		type: 'io_getMagneticSwitch',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['#TouchButtonon'] = function (pin, statementsNode, parent) {
	return {
		type: 'io_getGroveTactile',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['#Potentiometeron'] = function (pin, statementsNode, parent) {
	return {
		type: 'io_getGroveRotaryAngle',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['#ColoredButton/readon'] = function (pin, statementsNode, parent) {
	return {
		type: 'io_getGroveColoredButton',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['#ColoredButton/writeon'] = function (pin, statementsNode, parent) {
	let state = null;

	if (statementsNode.length > 0) {
		if (statementsNode[0].type === 'integer') {
			state = { type: 'bypass', block: 'io_digital_signal', text: statementsNode[0].text };
		} else {
			state = statementsNode[0];
		}
	}

	return {
		type: 'io_setGroveColoredButton',
		fields: { PIN: pin },
		values: { STATE: null },
		mutations: null,
		statementsNode: { STATE: state || { type: 'bypass', block: 'io_digital_signal', text: '1' } },
		statements: null,
	};
};

utils.prototypeBlocks['pulseIn'] = function (type, fields, values, mutations, statementsNode, statement) {
	let pin = null;
	let state = null;

	if (statementsNode.length > 0) {
		for (const child of statementsNode) {
			if (child.type === 'identifier' && pin === null) {
				pin = child.text;
			} else if (state === null && child.type === 'integer') {
				state = { type: 'bypass', block: 'io_digital_signal', text: child.text };
			} else {
				state = child;
			}
		}
	}

	return {
		type: 'io_readPulseIn',
		fields: { PIN: pin || 'pin1' },
		values: {
			STATE: null,
		},
		mutations: null,
		statementsNode: { STATE: state || { type: 'bypass', block: 'io_digital_signal', text: '1' } },
		statements: null,
	};
};

const pinArray = ['pin0', 'pin1', 'pin2', 'pin8', 'pin9', 'pin12', 'pin13', 'pin14', 'pin15', 'pin16', 'pin19', 'pin20', 'pin_speaker'];
for (const pin of pinArray) {
	utils.prototypeBlocks[`${pin}.set_pull`] = function (type, identifier, values, mutations, statementsNode, statement) {
		// Some blocks use this function to set the pull of a pin
		if (typeof utils.python2Blocks._functions['pulseIn'] !== 'undefined' && typeof utils.python2Blocks._functions['anemometer_getWindSpeed'] !== 'undefined' && pin === 'pin8') {
			return '';
		}

		const pullOptions = ['PULL_UP', 'PULL_DOWN', 'NO_PULL'];
		let pull = null;
		if (statementsNode.length > 0) {
			if (statementsNode[0].type === 'attribute' && statementsNode[0].children.length === 3) {
				pull = pullOptions.includes(statementsNode[0].children[2].text) ? statementsNode[0].children[2].text : 'PULL_UP';
Ê			}
		}

		return {
			type: 'io_setPull',
			fields: { PIN: pin || 'pin0', STATE: pull || 'PULL_UP' },
			values: null,
			mutations: null,
			statementsNode: null,
			statements: null,
		};
	};
}
