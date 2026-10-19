import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';
import '/openInterface/interfaces/assets/js/code2blocks/python/utils/chronometer.js';
import '/openInterface/interfaces/assets/js/code2blocks/python/utils/music.js';

// pin declarations pyb.Pin

utils.prototypeBlocks['pyb.Pin'] = function (type, identifier, values, mutations, statementsNode, statement, parent) {
	const className = parent.children[0].text;
	const checkClasses = utils.python2Blocks._classes[className];
	if (!checkClasses) {
		return '';
	}

	for (const child of statementsNode) {
		if (child.type === 'string') {
			checkClasses.pin  = utils.extractString(child).text;
		} else if (child.type === 'attribute') {
			checkClasses.mode = child.text;
		}
	}
	// generated again by the blocks using the pin
	return '';
};
utils.prototypeBlocks['machine.Pin'] = utils.prototypeBlocks['pyb.Pin'];


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
	checkClasses.pin = pin?.text;
	checkClasses.mode = mode?.text;

	return "";
};

utils.prototypeBlocks['on'] = function (node, identifier) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		// not a pin of the program (ex: method of another object): generic call
		return null;
	}
	if (checkClasses.builtin_led) {
		return {
			type: 'display_l476_controlColorLed',
			fields: {},
			values: { STATE: null },
			mutations: null,
			statementsNode: { STATE: {type:"bypass", block: "HIGH_STATE_BOOL", text:"HIGH", children:[]} },
		};

	}
	const pin = checkClasses.pin;
	const mode = checkClasses.mode;
	if (!mode === 'Pin.OUT') {
		return '';
	}
	// pin name (ex: 'D0'): LED module block (with its comment in the program) or digital write block
	if (/^['"][A-Z]+[0-9]+['"]$/.test(String(pin))) {
		const ledModule = (utils.python2Blocks.code || '').includes('# LED Module on ' + String(pin).replace(/['"]/g, ''));
		return {
			type: ledModule ? 'display_setGroveSocketLed' : 'io_writeDigitalPin',
			fields: { PIN: String(pin).replace(/"/g, "'") },
			values: { STATE: null },
			mutations: null,
			statementsNode: { STATE: { type: 'bypass', block: 'HIGH_STATE_BOOL', text: 'HIGH', children: [] } },
			statements: null,
			// generates the call only, not the try/except of a pin declaration (see determineTryStatementBlockType)
			callOnly: true,
		};
	}
	// pin number of machine.Pin (ex: "p13"), not a pyb pin name (ex: 'D0'): generic call
	if (!/^\d+$/.test(String(pin))) return null;
	if (pin === "2"){
		return {
			type: 'display_controlBuiltInLED',
			state: null,
			values: { STATE: null },
			mutations: null,
			statementsNode: { STATE: {type:"bypass", block: "HIGH_STATE_BOOL", text:"HIGH", children:[]} },
			statements: null,
		};
	} else {
		return {
			type: 'io_writeDigitalPin',
			fields: { PIN: "p"+ pin },
			values: { STATE: null },
			mutations: null,
			statementsNode: { STATE: {type:"bypass", block: "HIGH_STATE_BOOL", text:"HIGH", children:[]} },
			statements: null,
		}
	}
};

utils.prototypeBlocks['off'] = function (node, identifier) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		// not a pin of the program (ex: method of another object): generic call
		return null;
	}
	if (checkClasses.builtin_led) {
		return {
			type: 'display_l476_controlColorLed',
			fields: {},
			values: { STATE: null },
			mutations: null,
			statementsNode: { STATE: {type:"bypass", block: "LOW_STATE_BOOL", text:"HIGH", children:[]} },
		};

	}
	const pin = checkClasses.pin;
	const mode = checkClasses.mode;
	if (!mode === 'Pin.OUT') {
		return '';
	}
	// pin name (ex: 'D0'): LED module block (with its comment in the program) or digital write block
	if (/^['"][A-Z]+[0-9]+['"]$/.test(String(pin))) {
		const ledModule = (utils.python2Blocks.code || '').includes('# LED Module on ' + String(pin).replace(/['"]/g, ''));
		return {
			type: ledModule ? 'display_setGroveSocketLed' : 'io_writeDigitalPin',
			fields: { PIN: String(pin).replace(/"/g, "'") },
			values: { STATE: null },
			mutations: null,
			statementsNode: { STATE: { type: 'bypass', block: 'LOW_STATE_BOOL', text: 'LOW', children: [] } },
			statements: null,
			// generates the call only, not the try/except of a pin declaration (see determineTryStatementBlockType)
			callOnly: true,
		};
	}
	// pin number of machine.Pin (ex: "p13"), not a pyb pin name (ex: 'D0'): generic call
	if (!/^\d+$/.test(String(pin))) return null;
	if (pin === "2"){
		return {
			type: 'display_controlBuiltInLED',
			state: null,
			values: { STATE: null },
			mutations: null,
			statementsNode: { STATE: {type:"bypass", block: "LOW_STATE_BOOL", text:"HIGH", children:[]} },
			statements: null,
		};
	} else {
		return {
			type: 'io_writeDigitalPin',
			fields: { PIN: "p"+ pin },
			values: { STATE: null },
			mutations: null,
			statementsNode: { STATE: {type:"bypass", block: "LOW_STATE_BOOL", text:"HIGH", children:[]} },
			statements: null,
		}
	}
};

utils.prototypeBlocks['toggle'] = function (node, identifier) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return '';
	}
	if (checkClasses.builtin_led) {
		return {
			type: 'display_l476_toggleColorLed',
			fields: {},
			values: null,
			mutations: null,
			statementsNode: null,
		};

	}
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



utils.prototypeBlocks['ticks_ms'] = function (type, identifier, values, mutations, statementsNode, statement) {
    Blockly.Python.addConstant('chronometer', "t0 = utime.ticks_ms()");
	return {
        type: 'io_initChronometer_simple',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null
    };
    
};

utils.prototypeBlocks['utime.ticks_diff'] = function (type, identifier, values, mutations, statementsNode, statement) {
    Blockly.Python.addConstant('chronometer', "t0 = utime.ticks_ms()");
    return {
        type: 'io_getChronometer',
        fields: { UNIT: 'MILLI' },
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null
    };
}
