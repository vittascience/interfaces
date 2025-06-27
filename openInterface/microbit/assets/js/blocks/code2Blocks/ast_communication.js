import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const musicNotes = ['261.63', '277.18', '293.66', '311.13', '329.63', '349.23', '369.99', '392.0', '415.30', '440.0', '466.16', '493.88'];

utils.prototypeBlocks['music_note_microbit'] = function (type, fields, values, mutations, statementsNode, statement) {
	let note = null;
	let customNote = false;
	let stop = false;

	if (statementsNode.length > 0) {
		if (statementsNode[0].type === 'string') {
			const string = utils.extractString(statementsNode[0]);
			const matchNote = string.text.match(/@music:(\d+\.?\d*)\|/);
			const matchStop = string.text.match(/@music:stop/);
			if (matchNote) {
				const noteString = matchNote[1];
				if (musicNotes.includes(noteString)) {
					note = noteString;
				}
			} else if (matchStop) {
				stop = true;
			}
		} else if (statementsNode[0].type === 'binary_operator') {
			for (const node of statementsNode[0].children) {
				if (node.type === 'binary_operator') {
					for (const childBinary of node.children) {
						if (childBinary.type === 'call') {
							for (const child of childBinary.children) {
								if (child.type === 'argument_list') {
									const args = utils.getArgumentList(child.children);
									if (args.length > 0) {
										note = args[0];
									}
									customNote = true;
								}
							}
						}
					}
				}
			}
		}
	}
	if (!customNote) {
		if (stop) {
			return {
				type: 'communication_stopComputerMusic',
				fields: null,
				mutations: null,
				values: null,
				statementsNode: null,
				statements: null,
			};
		}
		return {
			type: 'communication_playComputerMusic',
			fields: {
				NOTE: note || '293.66',
			},
			mutations: null,
			values: null,
			statementsNode: null,
			statements: null,
		};
	} else {
		return {
			type: 'communication_playComputerFrequency',
			fields: null,
			mutations: null,
			values: {
				FREQUENCY: null,
			},
			statementsNode: { FREQUENCY: note },
			statements: null,
		};
	}
};

// radio

utils.prototypeBlocks['radio.on'] = function (type, fields, values, mutations, statementsNode, statement) {
	return 'radio.on';
};

utils.prototypeBlocks['radio.send'] = function (type, fields, values, mutations, statementsNode, statement) {
	let message = null;

	if (statementsNode.length > 0) {
		message = statementsNode[0];
	}

	return {
		type: 'communication_radioSendString',
		fields: null,
		values: {
			STR: null,
		},
		mutations: null,
		statementsNode: { STR: message || { type: 'string', text: 'Je suis le message radio !' } },
	};
};

utils.prototypeBlocks['radio_send'] = function (type, fields, values, mutations, statementsNode, statement) {
	let message = null;

	if (statementsNode.length > 0) {
		message = statementsNode[0];
	}

	return {
		type: 'communication_radioSendNumber',
		fields: null,
		values: {
			N: null,
		},
		mutations: null,
		statementsNode: { N: message || { type: 'integer', text: '1' } },
		statement: null,
	};
};

utils.prototypeBlocks['radio_sendValue'] = function (type, fields, values, mutations, statementsNode, statement) {
	let key = null;
	let value = null;

	if (statementsNode.length > 0) {
		for (const child of statementsNode) {
			if (key === null) {
				key = child;
			} else {
				value = child;
			}
		}
	}

	return {
		type: 'communication_radioSendValue',
		fields: null,
		values: {
			NAME: null,
			VALUE: null,
		},
		mutations: null,
		statementsNode: { NAME: key || { type: 'string', text: 'pi' }, VALUE: value || { type: 'float', text: '3.14' } },
	};
};

utils.prototypeBlocks['stringData_string'] = function (type, fields, values, mutations, statementsNode, statement) {
	const checkVar = utils._variables['stringData'];
	const varID = utils.python2Blocks.getVariableID('stringData');
	if (!checkVar) {
		return null;
	}
	return {
		type: 'communication_onRadioDataReceived',
		fields: { VAR: { name: 'VAR', id: varID, value: 'stringData' } },
		mutations: null,
		values: null,
		statementsNode: null,
		statements: { DO: statementsNode },
	};
};

utils.prototypeBlocks['numberDataisnotNone_string'] = function (type, fields, values, mutations, statementsNode, statement) {
	const checkVar = utils._variables['numberData'];
	const varID = utils.python2Blocks.getVariableID('numberData');
	if (!checkVar) {
		return null;
	}

	return {
		type: 'communication_onRadioNumberReceived',
		fields: { VAR: { name: 'VAR', id: varID, value: 'numberData' } },
		mutations: null,
		values: null,
		statementsNode: null,
		statements: { DO: statementsNode },
	};
};

utils.prototypeBlocks['radio.config'] = function (type, fields, values, mutations, statementsNode, statement) {
	let channel = null;
	let power = null;
	let length = null;
	let group = null;

	for (const child of statementsNode) {
		if (child.type === 'keyword_argument') {
			if (channel === null && child.children[0].text === 'channel') {
				channel = child.children[2];
			} else if (power === null && child.children[0].text === 'power') {
				power = child.children[2];
			} else if (length === null && child.children[0].text === 'length') {
				length = child.children[2];
			} else if (group === null && child.children[0].text === 'group') {
				group = child.children[2];
			}
		}
	}

	return {
		type: 'communication_radioConfig',
		fields: null,
		values: {
			CANAL: null,
			POWER: null,
			LEN: null,
			GROUP: null,
		},
		mutations: null,
		statementsNode: {
			CANAL: channel || { type: 'integer', text: '7' },
			POWER: power || { type: 'integer', text: '6' },
			LEN: length || { type: 'integer', text: '32' },
			GROUP: group || { type: 'integer', text: '0' },
		},
	};
};

// log

utils.prototypeBlocks['log.delete'] = function (type, fields, values, mutations, statementsNode, statement) {
	// noc checks for keyword argument => full = True
	return {
		type: 'communication_log_deleteLogs',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
	};
};

utils.prototypeBlocks['log.set_mirroring'] = function (type, fields, values, mutations, statementsNode, statement) {
	// no checks for boolean
	return {
		type: 'communication_log_serial',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
	};
};

utils.prototypeBlocks['log.set_labels'] = function (type, fields, values, mutations, statementsNode, statement) {
	let timeStamps = null;
	let items = statementsNode.length > 1 ? statementsNode.length - 1 : 1;
	const timeStampArray = ['MILLISECONDS', 'SECONDS', 'MINUTES', 'HOURS', 'DAYS', 'None'];

	const setLabelsBlock = {
		type: 'communication_log_setLabel',
		fields: { TIMESTAMP: timeStamps },
		mutations: { items },
		values: { ADD0: null },
		statementsNode: { ADD0: { type: 'string', text: 'label1', children: [] } },
		statements: {},
	};

	if (statementsNode.length > 0) {
		for (let i = 0; i < statementsNode.length; i++) {
			if (i === statementsNode.length - 1 && statementsNode[i].type === 'keyword_argument') {
				if (statementsNode[i].children[0].text === 'timestamp') {
					timeStamps = statementsNode[i].children[2]?.text?.split('.')[1];
					if (!timeStampArray.includes(timeStamps)) {
						timeStamps = 'MILLISECONDS';
					}
					setLabelsBlock.fields.TIMESTAMP = timeStamps;
				}
			} else if (statementsNode[i].type !== 'keyword_argument') {
				setLabelsBlock.statementsNode[`ADD${i}`] = statementsNode[i];
				setLabelsBlock.values[`ADD${i}`] = null;
				items = i + 1;
				setLabelsBlock.mutations.items = items;
			}
		}
	}

	if (setLabelsBlock.fields.TIMESTAMP === null) {
		setLabelsBlock.fields.TIMESTAMP = 'MILLISECONDS';
	}

	return setLabelsBlock;
};

utils.prototypeBlocks['log.add'] = function (type, fields, values, mutations, statementsNode, statement) {
	let items = statementsNode.length > 1 ? statementsNode.length - 1 : 1;

	const logAddBlock = {
		type: 'communication_log_addData',
		fields: null,
		values: {},
		mutations: { items: items },
		statementsNode: {},
	};

	if (statementsNode.length > 0) {
		for (let i = 0; i < statementsNode.length; i++) {
			if (statementsNode[i].type === 'keyword_argument') {
				const { key, value } = utils.extractKeyWordArgument(statementsNode[i]);
				if (key !== null && value !== null) {
					logAddBlock.values[`ADD${i}`] = null;
					logAddBlock.statementsNode[`ADD${i}`] = { type: 'bypass', block: 'communication_log_data_bypass', text: { key, value } };
					logAddBlock.mutations.items = i + 1;
				}
			}
		}
	}

	return logAddBlock;
};

utils.prototypeBlocks['communication_log_data_bypass'] = function (values) {
	let label = { type: 'string', text: values.key.text, children: [] };

	return {
		type: 'communication_log_data',
		fields: null,
		values: {
			LABEL: null,
			DATA: null,
		},
		mutations: null,
		statementsNode: { LABEL: label, DATA: values.value },
		statements: null,
	};
};

utils.prototypeBlocks['uart.init'] = function (type, fields, values, mutations, statementsNode, statement) {
	let baudrate = 9600;
	let bits = 8;
	let parity = "None";
	let stopbits = 1;
	let tx = "pin0";
	let rx = "pin14";


	for (const child of statementsNode) {
		if (child.type === 'keyword_argument') {
			const { key, value } = utils.extractKeyWordArgument(child);
			if (key.text === 'baudrate') {
				baudrate = value.text;
			} else if (key.text === 'bits') {
				bits = value.text;
			} else if (key.text === 'parity') {
				parity = value.text;
			} else if (key.text === 'stop') {
				stopbits = value.text;
			} else if (key.text === 'tx') {
				tx = value.text;
			} else if (key.text === 'rx') {
				rx = value.text;
			}
		}
	}

	const classes = utils.python2Blocks._classes;
	classes['uart'] = {
		className: 'uart',
		baudrate: baudrate,
		bits: bits,
		parity: parity,
		stopbits: stopbits,
		tx: tx,
		rx: rx,
	}
	return 'null';
}

utils.prototypeBlocks['uart.write'] = function (type, fields, values, mutations, statementsNode, statement) {
	let message = null;
	if (statementsNode.length > 0) {
		message = statementsNode[0];
	}

	const uartClass = utils.python2Blocks._classes['uart'];

	return {
		type: 'communication_sendBluetoothData',
		fields: {
			TX: uartClass.tx || 'pin0',
			RX: uartClass.rx || 'pin14',
		},
		values: {
			DATA: null,
		},
		mutations: null,
		statementsNode: { DATA: message || { type: 'string', text: '' } },
		statements: null,
	}
}

utils.prototypeBlocks['uart.any()_string'] = function (type, fields, values, mutations, statementsNode, statement) {
	let stringVar = null;
	let basicSerial = null;
	const checkComment = utils.python2Blocks._storedExcludedComments.has('# Serial Receive used');
	if (checkComment) {
		basicSerial = true;
	}
	const assignementVar = utils.returnFirstExpression(statementsNode.children, "assignment")
	if (assignementVar !== null) {
		stringVar = assignementVar.children[0].text;
	}
	
	const varID = utils.python2Blocks.getVariableID(stringVar) || utils.python2Blocks.declareBlocklyVariable(stringVar, null);
	if (!varID) {
		return null;
	}

	const doStatements = statementsNode.children.length > 1 ? statementsNode.children.slice(1) : [];

	if (basicSerial) {

		return {
			type: 'communication_onSerialDataReceived',
			fields: { VAR: { name: 'VAR', id: varID, value: stringVar } },
			mutations: null,
			values: null,
			statementsNode: null,
			statements: { DO: {type: "block", children: doStatements} },
		};
	} else {
		const checkClass = utils.python2Blocks._classes['uart'];
		return {
			type: "communication_onBluetoothDataReceived",
			fields: {
				TX: checkClass.tx || 'pin0',
				RX: checkClass.rx || 'pin14',
				VAR: { name: 'VAR', id: varID, value: stringVar },
			},
			values: null,
			mutations: null,
			statementsNode: null,
			statements: { DO: {type: "block", children: doStatements} },
		}
	}
};


// very difficult to make this block scalable with the pattern list variable issue and basic if statement block
utils.prototypeBlocks['nameisnotNoneandvalueisnotNone_string'] = function (type, fields, values, mutations, statementsNode, statement) {
	const nameVarId = utils.python2Blocks.declareBlocklyVariable("name", null)
	const valueVarId = utils.python2Blocks.declareBlocklyVariable("value", null)

	return {
		type: 'communication_onRadioValueReceived',
		fields: { 
			VAR_NAME: { name: 'NAME', id: nameVarId, value: 'name' }, 
			VAR_VALUE: { name: 'VALUE', id: valueVarId, value: 'value' } 
		},
		mutations: null,
		values: null,
		statementsNode: null,
		statements: { DO: statementsNode },
	}
}
