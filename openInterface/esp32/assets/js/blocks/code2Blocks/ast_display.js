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
	Blockly.Python.addHiddenConstant(`NEOPIXEL_LED_COUNT_${pin.substr(1)}`, statementsNode[1].text);
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

utils.prototypeBlocks['neopixel_showAllLed'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode.length === 0) return null;


	let classVariable = null;
	if (statementsNode[0].type === 'identifier') {
		classVariable = utils.python2Blocks._classes[statementsNode[0].text];
	}

	if (classVariable === null) {
		return null;
	}

	const pin = classVariable.pin;
	let ledCount = statementsNode[1].text || classVariable.ledCount;

	const rgb = statementsNode.slice(2);
	const convertRGB = utils.convertRBGtoHex(rgb);
	if (convertRGB === null) {
		return {
			type: 'display_neopixel_controlAllLedRGB',
			fields: { PIN: pin },
			values: {
				R: null,
				G: null,
				B: null,
			},
			mutations: null,
			statementsNode: { R: rgb[0], G: rgb[1], B: rgb[2] },
		};
	} else {
		return {
			type: 'display_neopixel_controlAllLedPalette',
			fields: { PIN: pin },
			values: {
				COLOR: null,
			},
			mutations: null,
			statementsNode: { COLOR: { type: "bypass", block: 'color_picker', text: convertRGB } },
			statements: null,
		};
	}

};

utils.prototypeBlocks['neopixel_rainbow'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode.length === 0) return null;

	let classVariable = null;
	if (statementsNode[0].type === 'identifier') {
		classVariable = utils.python2Blocks._classes[statementsNode[0].text];
	}

	if (classVariable === null) {
		return null;
	}

	const pin = classVariable.pin || statementsNode[0].text;

	return {
		type: 'display_rainbowNeopixel',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};

}

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


