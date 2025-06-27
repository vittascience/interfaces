import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


utils.prototypeBlocks['neopixel.NeoPixel'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	const Python2Blocks = window.Python2Blocks;
	const checkImport = Python2Blocks._imports.has('neopixel');
	if (!checkImport) {
		return null;
	}

	const pin = statementsNode[0].text;
	const classVariable = Python2Blocks._classes[parent.children[0].text];
	classVariable.pin = pin;
	classVariable.ledCount = statementsNode[1].text;
	return {
		type: 'display_defineNeopixel',
		fields: { PIN: pin },
		values: {
			N: null,
		},
		mutations: null,
		statementsNode: { N: statementsNode[1] },
		statements: null,
	};
};

utils.prototypeBlocks['set_neopixel'] = function (index, statementsNode, identifier) {
	const rgb = utils.getArgumentList(statementsNode.children);
	const classVariable = utils.python2Blocks._classes[identifier];
	const pin = classVariable.pin;
	const convertRGB = utils.convertRBGtoHex(rgb);
	if (convertRGB === null) {
		return {
			type: 'display_controlNeopixelLed',
			fields: { PIN: pin },
			values: {
				LED: null,
				R: null,
				G: null,
				B: null,
			},
			mutations: null,
			statementsNode: { LED: index, R: rgb[0], G: rgb[1], B: rgb[2] },
		};
	} else {
		return {
			type: 'display_controlColorNeopixelLed',
			fields: { PIN: pin },
			values: {
				LED: null,
				COLOR: null,
			},
			mutations: null,
			statementsNode: { LED: index, COLOR: { type: "bypass", block: 'color_picker', text: convertRGB } },
			statements: null,
		};
	}
};

utils.prototypeBlocks['color_picker'] = function (hexColor){
	return {
		type: 'colour_picker',
		fields: { COLOUR: hexColor },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
}


utils.prototypeBlocks['write'] = function (type, classDeclaration) {
	const checkClasses = utils.python2Blocks._classes[classDeclaration]
	if (checkClasses) {
		return "used";
	} else {
		return null;
	}
};


utils.prototypeBlocks['led.set_colors'] = function (type, fields, values, mutations, statementsNode, statement) {
	const integerNull = { type: "integer", text: "0", children: [] };
	return {
		type: 'display_galaxia_led_set_colors',
		fields: {},
		values: {RED: null, GREEN: null, BLUE: null},
		mutations: null,
		statementsNode: {RED: statementsNode[0]|| integerNull, GREEN: statementsNode[1] || integerNull, BLUE: statementsNode[2] || integerNull},
	};
};

utils.prototypeBlocks['led.set_red'] = function (type, fields, values, mutations, statementsNode, statement) {

	return {
		type: 'display_galaxia_led_set_red',
		fields: {},
		values: {RED: null},
		mutations: null,
		statementsNode: {RED: statementsNode[0]},
	};
};

utils.prototypeBlocks['led.set_green'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'display_galaxia_led_set_green',
		fields: {},
		values: {GREEN: null},
		mutations: null,
		statementsNode: {GREEN: statementsNode[0]},
	};
}

utils.prototypeBlocks['led.set_blue'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'display_galaxia_led_set_blue',
		fields: {},
		values: {BLUE: null},
		mutations: null,
		statementsNode: {BLUE: statementsNode[0]},
	};
}


utils.prototypeBlocks['display.plot.show'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'display_galaxia_set_mode',
		fields: {MODE: 'plot.show'},
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
}

utils.prototypeBlocks['display.console.show'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'display_galaxia_set_mode',
		fields: {MODE: 'console.show'},
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};


utils.prototypeBlocks['display.plot.add_point'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'display_galaxia_plot_add_point',
		fields: {},
		values: {POINT: null},
		mutations: null,
		statementsNode: {POINT: statementsNode[0]},
	};
};

utils.prototypeBlocks['display.plot.set_y_scale'] = function (type, fields, values, mutations, statementsNode, statement) {
	const nullScall = { type: "integer", text: "0", children: [] };
	return {
		type: 'display_galaxia_plot_set_y_scale',
		fields: {},
		values: {MIN: null, MAX: null},
		mutations: null,
		statementsNode: {MIN: statementsNode[0] || nullScall, MAX: statementsNode[1] || nullScall},
	};
};
