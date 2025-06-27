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
		} else if (pinArg.type === 'string'){
			pin = utils.extractString(pinArg);
		}
	}
	checkClasses.pin = pin.text;
	checkClasses.mode = mode.text;

	return "";
};

utils.prototypeBlocks['define_pwm'] = function (node, identifier) {
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
	let freq = null;
	let duty = null;
	for (const pinArg of pinArgs) {
		if (pinArg.type === 'call') {

			const pinNumber = utils.getArgumentList(pinArg.children.filter((child) => child.type === 'argument_list')[0].children);
			pin = pinNumber[0];
		} else if (pinArg.type === 'keyword_argument') {
			const keyword = pinArg.children[0].text;
			if (keyword === 'freq') {
				freq = pinArg.children[2];
			} else if (keyword === 'duty') {
				duty = pinArg.children[2];
			}
		}
	}
	checkClasses.pin = pin.text;
	checkClasses.freq = freq.text;
	checkClasses.duty = duty !== null ? duty.text : '50';
	return "";
};

utils.prototypeBlocks['define_adc'] = function (node, identifier) {
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

	console.log(pinArgs);
	// get the pin number and the mode (ex: Pin.IN or Pin.OUT)
	let pin = null;
	for (const pinArg of pinArgs) {
		if (pinArg.type === 'call') {
			const pinNumber = utils.getArgumentList(pinArg.children.filter((child) => child.type === 'argument_list')[0].children);
			pin = pinNumber[0];
		}
	}
	checkClasses.pin = pin.text;
	return "";
};

utils.prototypeBlocks['read_u16'] = function (node, identifier) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return '';
	}
	const pin = checkClasses.pin;
	return {
		type: 'io_readAnalogPin',
		fields: { PIN: "p"+ pin },
		values: null,
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

utils.prototypeBlocks['value'] = function (type, identifier, values, mutations, statementsNode, statement) {
	console.log("type", type, "identifier", identifier, "values", values, "mutations", mutations, "statementsNode", statementsNode, "statement", statement);
	const checkClasses = utils.python2Blocks._classes[identifier];
	if (!checkClasses) {
		return null;
	}
	const pin = checkClasses.pin;

	if (statementsNode.length === 0) {
		return null
	}
	const checkValue = statementsNode[0];
	const state = {type:"bypass", block: "LOW_STATE_BOOL", text:"HIGH", children:[]}
	if (checkValue.type === 'integer') {
		if (checkValue.text === '0'){
			state.text = "LOW";
		} else if (checkValue.text === '1'){
			state.text = "HIGH";
		}
	}
	if (pin === "25"){
		return {
			type: 'display_controlPicoLed',
			fields: {},
			values: { STATE: null },
			mutations: null,
			statementsNode: { STATE: state },
			statements: null,
		}
	} else if (pin ==="LED"){
		return {
			type: 'display_controlPicoWLed',
			fields: {},
			values: { STATE: null },
			mutations: null,
			statementsNode: { STATE: state },
			statements: null,
		}
	}

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