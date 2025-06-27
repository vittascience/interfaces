import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

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
		if (pinArg.type === 'integer') {
			pin = pinArg;
		} else if (pinArg.type === 'attribute') {
			mode = pinArg;
		}
	}
	checkClasses.pin = pin.text;
	checkClasses.mode = mode.text;

	return "";
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
		return '';
	}
	const pin = checkClasses.pin;
	const mode = checkClasses.mode;
	if (!mode === 'Pin.OUT') {
		return '';
	}
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

