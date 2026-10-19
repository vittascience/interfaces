import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';
import '/openInterface/interfaces/assets/js/code2blocks/python/utils/rgbMatrix.js';


utils.prototypeBlocks['neopixel.NeoPixel'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	const Python2Blocks = window.Python2Blocks;
	const checkImport = Python2Blocks._imports.has('neopixel');
	if (!checkImport) {
		return null;
	}

	// pin of the variable declared with pyb.Pin (ex: d0 => 'D0')
	const pin = Python2Blocks._classes[statementsNode[0].text]?.pin || statementsNode[0].text;
	const classVariable = Python2Blocks._classes[parent.children[0].text];
	classVariable.pin = pin;
	classVariable.ledCount = statementsNode[1].text;
	// LED count: number field of the block, written or in a constant (ex: NP_LED_COUNT_D0 = 20)
	const ledCount = [statementsNode[1]?.text, utils._variables[statementsNode[1]?.text]?.variable?.text].find((count) => /^[0-9]+$/.test(count));
	return {
		type: 'display_defineNeopixel',
		fields: { PIN: pin, ...(ledCount && { N: ledCount }) },
		values: {},
		mutations: null,
		statementsNode: null,
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

utils.prototypeBlocks['pyb.LED'] = function (type, identifier, values, mutations, statementsNode, statement, parent) {
	const Python2Blocks = window.Python2Blocks;
	const checkImport = Python2Blocks._imports.has('pyb');
	if (!checkImport) {
		return null;
	}

	const classVariable = Python2Blocks._classes[parent.children[0].text];
	classVariable.ledValue = statementsNode[0].text;
	classVariable.builtin_led = true;
	return "";
};



