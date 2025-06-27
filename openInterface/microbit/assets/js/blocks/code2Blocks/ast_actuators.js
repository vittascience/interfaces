import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['music.play'] = function (type, fields, values, mutations, statementsNode, statement) {
	if (statementsNode[0] && statementsNode[0].type === 'attribute' && statementsNode[0].text.startsWith('music.')) {
		const songName = statementsNode[0].text.replace('music.', '');
		let loop = 'ONCE'; // Dfault
		let pin = 'pin_speaker'; // Dfault

		for (let i = 1; i < statementsNode.length; i++) {
			const node = statementsNode[i];
			if (node.type === 'keyword_argument') {
				const { key, value } = utils.extractKeyWordArgument(node);
				if (key && key.text === 'loop') {
					loop = (value.type === 'true' || value.text === 'True') ? 'LOOP' : 'ONCE';
				} else if (key && key.text === 'pin') {
					pin = value.text || value;
				}
			}
		}

		return {
			type: 'actuators_music_playSong',
			fields: { SONG: songName, LOOP: loop, PIN: pin },
			values: {},
			mutations: null,
			statementsNode: {},
			statements: null,
		};
	}

	const noteLetters = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b', 'r'];

	const actuatorsPlayNotes = {
		type: 'actuators_music_playNotes',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: {},
		statements: null,
	};

	const notes = [];
	if (statementsNode[0].type === 'list') {
		const stringNotes = utils.getArgumentList(statementsNode[0].children);
		for (const note of stringNotes) {
			if (note.type === 'string') {
				const n = utils.extractString(note);
				notes.push(n.text);
			}
		}
	}
	let pin = null;
	if (statementsNode[1] === undefined) {
		pin = 'pin_speaker';
	} else if (statementsNode[1].type === 'keyword_argument') {
		let keyword = null;
		for (const child of statementsNode[1].children) {
			if (child.type === 'identifier' && keyword === null) {
				keyword = child.text;
			} else if (keyword === 'pin' && child.type === 'identifier') {
				pin = child.text;
			}
		}
	}

	actuatorsPlayNotes.fields = { PIN: pin };
	actuatorsPlayNotes.mutations = { items: notes.length };
	for (let i = 0; i < notes.length; i++) {
		actuatorsPlayNotes.values[`ADD${i}`] = null;
		actuatorsPlayNotes.statementsNode[`ADD${i}`] = { type: 'bypass', block: 'music_note_single', text: notes[i] };
	}

	return actuatorsPlayNotes;
};

utils.prototypeBlocks['music_note_single'] = function (note) {
	const noteLetters = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b', 'r'];
	let duration = 1;
	let octave = 4;
	const values = note.match(/(c|d|e|f|g|a|b|r)(#?)(\d)?(?::(\d))?/);
	let noteLetter = null;
	if (values) {
		noteLetter = values[1];
		noteLetter = values[2] ? noteLetter + '#' : noteLetter;
		octave = values[3] ? parseInt(values[3], 10) : 4;
		duration = values[4] ? parseInt(values[4], 10) : 1;
	}

	return {
		type: 'actuators_music_note',
		fields: { NOTE: noteLetter, OCTAVE: octave, DURATION: duration },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['setServoAngle'] = function (type, fields, values, mutations, statementsNode, statement) {
	let pin = null;
	let angle = null;

	for (const child of statementsNode) {
		if (child.type === 'identifier' && pin === null) {
			pin = child.text;
		} else if (angle === null) {
			angle = child;
		}
	}

	return {
		type: 'actuators_setServoAngle',
		fields: { PIN: pin },
		values: { ANGLE: null },
		mutations: null,
		statementsNode: { ANGLE: angle },
		statements: null,
	};
};

utils.prototypeBlocks['setServoSpeed'] = function (type, fields, values, mutations, statementsNode, statement) {
	let direction = null;
	let pin = null;
	let speed = null;

	for (const child of statementsNode) {
		if (child.type === 'identifier' && pin === null) {
			pin = child.text;
		} else if (direction === null && child.type === 'integer') {
			direction = child.text;
		} else if (speed === null && (child.type === 'integer' || child.type === 'float' || child.type === 'identifier')) {
			speed = child;
		}
	}
	return {
		type: 'actuators_continuousServo_setSpeed',
		fields: { PIN: pin, DIR: direction || 1 },
		values: { SPEED: null },
		mutations: null,
		statementsNode: { SPEED: speed || { type: 'integer', text: '100', children: [] } },
		statements: null,
	};
};

utils.prototypeBlocks['#Motoron'] = function (pin, value, parent) {
	let pinValue = extractPinValue(pin, value);
	if (!pinValue) {
		pinValue = 'pin0'; // Default pin if not specified
	}
	return {
		type: 'actuators_setMotorPower',
		fields: { PIN: pin },
		values: { POWER: null },
		mutations: null,
		statementsNode: { POWER: value[0] || { type: 'integer', text: '1023' } },
		statements: null,
	};
};

// #FanOn
utils.prototypeBlocks['#Fanon'] = function (pin, value, parent) {
	let pinValue = extractPinValue(pin, value);
	if (!pinValue) {
		pinValue = 'pin0'; // Default pin if not specified
	}

	return {
		type: 'actuators_setFanPower',
		fields: { PIN: pin },
		values: { POWER: null },
		mutations: null,
		statementsNode: { POWER: value[0] || { type: 'integer', text: '1023' } },
		statements: null,
	};
};

// KITRONIK MOTOR CONTROL
utils.prototypeBlocks['kitronik_controlMotor'] = function (type, fields, values, mutations, statementsNode, statement) {
	let motor = null;
	let direction = null;
	let speed = null;

	for (let i = 0; i < statementsNode.length; i++) {
		if (statementsNode[i].type === 'integer' && motor === null) {
			motor = statementsNode[i].text;
		} else if ((statementsNode[i].type === 'integer' || statementsNode[i].type === 'unary_operator') && direction === null) {
			if (statementsNode[i].type === 'unary_operator') {
				direction = '-1';
			} else {
				direction = statementsNode[i].text;
			}
		} else if (speed === null) {
			speed = statementsNode[i];
		}
	}

	return {
		type: 'actuators_kitronik_controlMotor',
		fields: { MOTOR: motor || '1', DIR: direction || '1' },
		values: { SPEED: null },
		mutations: null,
		statementsNode: { SPEED: speed || { type: 'integer', text: '100' } },
		statements: null,
	};
};

utils.prototypeBlocks['kitronik_stopMotor'] = function (type, fields, values, mutations, statementsNode, statement) {
	let motor = '1';

	if (statementsNode.length > 0 && statementsNode[0].type === 'integer') {
		motor = statementsNode[0].text;
	}

	return {
		type: 'actuators_kitronik_stopMotor',
		fields: { MOTOR: motor },
		values: {},
		mutations: null,
		statementsNode: {},
		statements: null,
	};
};

utils.prototypeBlocks['#VibrationMotoron'] = function (pin, value, parent) {
	let state = { type: 'bypass', block: 'io_digital_signal', text: value[0]?.text || '1' };
	let pinValue = extractPinValue(pin, value);
	if (!pinValue) {
		pinValue = 'pin0'; // Default pin if not specified
	}

	return {
		type: 'actuators_setVibrationMotorState',
		fields: { PIN: pin },
		values: { STATE: null },
		mutations: null,
		statementsNode: { STATE: state },
		statements: null,
	};
};

utils.prototypeBlocks['#MOSFETon'] = function (pin, value, parent) {
	if (!value || value.length === 0) {

		return {
			type: 'actuators_mosfet_setState',
			fields: { PIN: pin },
			values: { STATE: null },
			mutations: null,
			statementsNode: { 
				STATE: { type: 'bypass', block: 'io_digital_signal', text: '1' }
			},
			statements: null,
		};
	}

	const valueNode = value[0];

	if (valueNode.type === 'conditional_expression') {
		let state = { type: 'bypass', block: 'io_digital_signal', text: '1', children: []};
		
		if (valueNode.children && valueNode.children.length >= 5) {
			const condition = valueNode.children[2];
			if (condition.type === 'integer') {
				state = {
					type: 'bypass',
					block: 'io_digital_signal',
					text: condition.text === '0' ? '0' : '1'
				};
			}
		}

		return {
			type: 'actuators_mosfet_setState',
			fields: { PIN: pin },
			values: { STATE: null },
			mutations: null,
			statementsNode: { STATE: state },
			statements: null,
		};
	}


	let percentValue = { type: 'integer', text: '100' }; // Défaut

	if (valueNode.type === 'binary_operator') {

		const firstChild = valueNode.children[0];
		if (firstChild && firstChild.type === 'binary_operator') {

			for (const child of firstChild.children) {
				if (child.type === 'integer' && child.text !== '1023') {
					percentValue = { type: 'integer', text: child.text, children: []};
					break;
				}
			}
		}
	} else if (valueNode.type === 'integer' || valueNode.type === 'float') {
		percentValue = { type: valueNode.type, text: valueNode.text, children: []};
	} else if (valueNode.type === 'identifier') {
		percentValue = { type: 'identifier', text: valueNode.text, children: []};
	}

	return {
		type: 'actuators_mosfet_setPercentValue',
		fields: { PIN: pin },
		values: { VALUE: null },
		mutations: null,
		statementsNode: { VALUE: percentValue },
		statements: null,
	};
};


utils.prototypeBlocks['speech.say'] = function (type, fields, values, mutations, statementsNode, statement) {
	let text = { type: 'string', text: 'Hello' };
	let speed = { type: 'integer', text: '72' };
	let pitch = { type: 'integer', text: '64' };

	for (const node of statementsNode) {
		if (node.type === 'keyword_argument') {
			const { key, value } = utils.extractKeyWordArgument(node);
			if (key && key.text === 'speed') {
				speed = value;
			} else if (key && key.text === 'pitch') {
				pitch = value;
			}
		} else if (text.text === 'Hello') {

			text = node;
		}
	}

	return {
		type: 'actuators_speech_saySomething',
		fields: {},
		values: { TEXT: null, SPEED: null, PITCH: null },
		mutations: null,
		statementsNode: { TEXT: text, SPEED: speed, PITCH: pitch },
		statements: null,
	};
};


utils.prototypeBlocks['music.pitch'] = function (type, fields, values, mutations, statementsNode, statement) {
	let frequency = { type: 'integer', text: '440' };
	let duration = { type: 'integer', text: '1000' };
	let pin = 'pin_speaker';


	for (let i = 0; i < statementsNode.length; i++) {
		const node = statementsNode[i];
		if (node.type === 'keyword_argument') {
			const { key, value } = utils.extractKeyWordArgument(node);
			if (key && key.text === 'duration') {
				duration = value;
			} else if (key && key.text === 'pin') {
				pin = value.text || value;
			}
		} else if (i === 0) {
			frequency = node;
		} else if (i === 1 && node.type !== 'keyword_argument') {
			duration = node;
		}
	}

	return {
		type: 'actuators_music_playFrequency',
		fields: { PIN: pin },
		values: { FREQUENCY: null, DURATION: null },
		mutations: null,
		statementsNode: { FREQUENCY: frequency, DURATION: duration },
		statements: null,
	};
};

utils.prototypeBlocks['music.stop'] = function (type, fields, values, mutations, statementsNode, statement) {
	let pin = 'pin_speaker';


	if (statementsNode.length > 0 && statementsNode[0].type === 'keyword_argument') {
		const { key, value } = utils.extractKeyWordArgument(statementsNode[0]);
		if (key && key.text === 'pin') {
			pin = value.text || value;
		}
	}

	return {
		type: 'actuators_music_stop',
		fields: { PIN: pin },
		values: {},
		mutations: null,
		statementsNode: {},
		statements: null,
	};
};

utils.prototypeBlocks['set_volume'] = function (type, fields, values, mutations, statementsNode, statement) {
	let volume = { type: 'integer', text: '4' };

	if (statementsNode.length > 0) {
		volume = statementsNode[0];
	}

	return {
		type: 'actuators_music_setVolume',
		fields: {},
		values: { VOL: null },
		mutations: null,
		statementsNode: { VOL: volume },
		statements: null,
	};
};

utils.prototypeBlocks['music.set_tempo'] = function (type, fields, values, mutations, statementsNode, statement) {
	let ticks = { type: 'integer', text: '4' };
	let bpm = { type: 'integer', text: '120' };

	for (const node of statementsNode) {
		if (node.type === 'keyword_argument') {
			const { key, value } = utils.extractKeyWordArgument(node);
			if (key && key.text === 'ticks') {
				ticks = value;
			} else if (key && key.text === 'bpm') {
				bpm = value;
			}
		}
	}

	return {
		type: 'actuators_music_setTempo',
		fields: {},
		values: { TICKS: null, BPM: null },
		mutations: null,
		statementsNode: { TICKS: ticks, BPM: bpm },
		statements: null,
	};
};

utils.prototypeBlocks['music.get_tempo'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'actuators_music_getTempo',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: {},
		statements: null,
	};
};


utils.prototypeBlocks['controlAccessBitBarrier'] = function (type, fields, values, mutations, statementsNode, statement) {
	let action = 'RAISE';

	if (statementsNode.length > 0 && statementsNode[0].type === 'string') {
		const actionText = utils.extractString(statementsNode[0]).text.toLowerCase();
		action = actionText === 'lower' ? 'LOWER' : 'RAISE';
	}

	return {
		type: 'actuators_controlAccessBitBarrier',
		fields: { ACTION: action },
		values: {},
		mutations: null,
		statementsNode: {},
		statements: null,
	};
};

utils.prototypeBlocks['controlAccessBitBuzzer'] = function (type, fields, values, mutations, statementsNode, statement) {
	let value = { type: 'integer', text: '1000' };

	if (statementsNode.length > 0) {
		value = statementsNode[0];
	}

	return {
		type: 'actuators_controlAccessBitBuzzer',
		fields: {},
		values: { VALUE: null },
		mutations: null,
		statementsNode: { VALUE: value },
		statements: null,
	};
};



// KITRONIK ENVIRONMENTAL
utils.prototypeBlocks['kitronikPlayFrequency'] = function (type, fields, values, mutations, statementsNode, statement) {
	let frequency = { type: 'integer', text: '440' };
	let duration = { type: 'integer', text: '1000' };

	if (statementsNode.length >= 1) {
		frequency = statementsNode[0];
	}
	if (statementsNode.length >= 2) {
		duration = statementsNode[1];
	}

	return {
		type: 'actuators_kitronik_playFrequency',
		fields: {},
		values: { FREQUENCY: null, DURATION: null },
		mutations: null,
		statementsNode: { FREQUENCY: frequency, DURATION: duration },
		statements: null,
	};
};

// BUZZER MUSIC FUNCTIONS
utils.prototypeBlocks['BuzzerCarribeanPirates'] = function (type, fields, values, mutations, statementsNode, statement) {
	let pin = 'pin0';
	if (statementsNode.length > 0 && statementsNode[0].type === 'identifier') {
		pin = statementsNode[0].text;
	}

	return {
		type: 'actuators_playMusicGroveBuzzer',
		fields: { MUSIC: 'CARRIBEAN_PIRATES', PIN: pin },
		values: {},
		mutations: null,
		statementsNode: {},
		statements: null,
	};
};

utils.prototypeBlocks['BuzzerGamme'] = function (type, fields, values, mutations, statementsNode, statement) {
	let pin = 'pin0';
	if (statementsNode.length > 0 && statementsNode[0].type === 'identifier') {
		pin = statementsNode[0].text;
	}

	return {
		type: 'actuators_playMusicGroveBuzzer',
		fields: { MUSIC: 'GAMME', PIN: pin },
		values: {},
		mutations: null,
		statementsNode: {},
		statements: null,
	};
};

utils.prototypeBlocks['BuzzerStarWars'] = function (type, fields, values, mutations, statementsNode, statement) {
	let pin = 'pin0';
	if (statementsNode.length > 0 && statementsNode[0].type === 'identifier') {
		pin = statementsNode[0].text;
	}

	return {
		type: 'actuators_playMusicGroveBuzzer',
		fields: { MUSIC: 'SW', PIN: pin },
		values: {},
		mutations: null,
		statementsNode: {},
		statements: null,
	};
};

utils.prototypeBlocks['BuzzerR2D2'] = function (type, fields, values, mutations, statementsNode, statement) {
	let pin = 'pin0';
	if (statementsNode.length > 0 && statementsNode[0].type === 'identifier') {
		pin = statementsNode[0].text;
	}

	return {
		type: 'actuators_playMusicGroveBuzzer',
		fields: { MUSIC: 'R2D2', PIN: pin },
		values: {},
		mutations: null,
		statementsNode: {},
		statements: null,
	};
};

// Fonction helper pour extraire et valider la valeur du pin
function extractPinValue(pin, statementsNode) {
	let pinValue = pin;

	if (statementsNode && statementsNode.length > 0) {
		pinValue = statementsNode[0].text;
	}


	const validPins = ['pin0', 'pin1', 'pin2', 'pin8', 'pin9', 'pin12', 'pin13', 'pin14', 'pin15', 'pin16', 'pin19', 'pin20', 'pin_speaker'];
	if (!validPins.includes(pinValue)) {
		pinValue = 'pin0';
	}

	return pinValue;
}


utils.prototypeBlocks['#Electromagneton'] = function (pin, value, parent) {
	let state = { type: 'bypass', block: 'io_digital_signal', text: value[0]?.text || '1' };
	let pinValue = extractPinValue(pin, value);
	if (!pinValue) {
		pinValue = 'pin0'; // Default pin if not specified
	}

	return {
		type: 'actuators_setElectromagnetState',
		fields: { PIN: pin },
		values: { STATE: null },
		mutations: null,
		statementsNode: { STATE: state },
		statements: null,
	};
}

utils.prototypeBlocks['#WaterAtomizeron'] = function (pin, value, parent) {
	let state = { type: 'bypass', block: 'io_digital_signal', text: value[0]?.text || '1' };
	let pinValue = extractPinValue(pin, value);
	if (!pinValue) {
		pinValue = 'pin0'; // Default pin if not specified
	}

	return {
		type: 'actuators_setWaterAtomizerState',
		fields: { PIN: pin },
		values: { STATE: null },
		mutations: null,
		statementsNode: { STATE: state },
		statements: null,
	};
}