import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';
import '/openInterface/interfaces/assets/js/code2blocks/python/utils/rgbMatrix.js';


utils.prototypeBlocks['neopixel.NeoPixel'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	const Python2Blocks = window.Python2Blocks;
	const checkImport = Python2Blocks._imports.has('neopixel');
	if (!checkImport) {
		return null;
	}

	const pin = statementsNode[0].text;
	const classVariable = Python2Blocks._classes[parent.children[0].text];
	// pin of the variable declared with pyb.Pin (ex: d2 => 'D2')
	const pinValue = Python2Blocks._classes[pin]?.pin ? `'${Python2Blocks._classes[pin].pin}'` : pin;
	classVariable.pin = pinValue;
	classVariable.ledCount = statementsNode[1].text;
	// LED count: number field of the block, written or in a constant (ex: NP_LED_COUNT_D0 = 20)
	const ledCount = [statementsNode[1]?.text, utils._variables[statementsNode[1]?.text]?.variable?.text].find((count) => /^[0-9]+$/.test(count));
	return {
		type: 'display_defineNeopixel',
		fields: { PIN: pinValue, ...(ledCount && { N: ledCount }) },
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


utils.prototypeBlocks['HT16K33Matrix'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	// TODO add the correct check for class declaration
	return 'HT16K33Matrix';
};

function convertEscapedHexToBinary(escapedHexString) {
    // Remplacer les séquences "\\x" par "0x" pour faciliter la conversion
    let cleanedString = escapedHexString.replace(/\\x/g, '0x');
    
    // Trouver toutes les séquences hexadécimales sous la forme "0xNN"
    let hexArray = cleanedString.match(/0x[0-9A-Fa-f]{2}/g);
    
    if (!hexArray) return []; // Si aucune séquence hex n'est trouvée, retourner un tableau vide
    
    // Convertir chaque séquence hexadécimale en binaire
    let binaryArray = hexArray.map(hex => {
        let decimal = parseInt(hex, 16);
        return decimal.toString(2).padStart(8, '0');
    });

    return binaryArray;
}

utils.prototypeBlocks['set_icon'] = function (node, identifier, values, mutations, statementsNode, ) {
	
	const checkClasses = utils.python2Blocks._classes[identifier];
	
	if (!checkClasses) {
		return null
	}

	let hexString = '01111110,01000010,01111110,00000001,00000001,01111110,01000010,01111110';

	const string = utils.extractString(statementsNode[0]).text;
	let convertHex = convertEscapedHexToBinary(string);
	if (convertHex.length < 8) {
		const diff = 8 - convertHex.length;
		for (let i = 0; i < diff; i++) {
			convertHex.push('00000000');
		}
	}
	const finalHex = convertHex.join(',');

	
	checkClasses.icon = finalHex;

	return 'set_icon';
	
}

utils.prototypeBlocks['draw'] = function (node, identifier, values, mutations, statementsNode, ) {
	const checkClasses = utils.python2Blocks._classes[identifier];
	if (!checkClasses) {
		return null
	}
	
	const icon = checkClasses.icon ? checkClasses.icon : '01111110,01000010,01111110,00000001,00000001,01111110,01000010,01111110';


	// add the update function to the end of the process to update the image in the block
	utils.python2Blocks.interface_specific_end.HT16K33Matrix = LedMatrixModalManager.updateImageMono;

	return {
		type: 'display_led_matrix_DrawBitmap',
		fields: {HIDDEN_MONO_LEDS_MATRIX: icon},
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	}
}



utils.prototypeBlocks['LCD1602'] = function (node, identifier) {
	let classArgs = null;
	let className = null

	for (const arg of node.children) {
		if (arg.type === 'argument_list') {
			classArgs = utils.getArgumentList(arg.children);
		}else if (arg.type === "identifier") {
			className = arg.text;
		}
	}


	Blockly.Python.addInit('lcd1602', `${identifier} = LCD1602(i2c=machine.I2C(1))`);


	// return classDeclaration;
	return "LCD1602";
}

utils.prototypeBlocks['setCursor'] = function (method, identifier, values, mutations, statementsNode) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return null;
	}
	let line = null;
	let pos = null;
	// let pin = {"scl":Number(checkClasses.i2c.scl.text) || 9, "sda":Number(checkClasses.i2c.sda.text) || 8};
	for (const element of statementsNode){
		if (element.type === "integer" && line === null){
			line = element.text;
		} else if (element.type === "integer" && line !== null){
			pos = element.text;
		}
			
	}
	// checkClasses.pin = pin;
	checkClasses.line = line;
	checkClasses.pos = pos;

	return "setCursor"
	
};

utils.prototypeBlocks['writeTxt'] = function (method, identifier, values, mutations, statementsNode) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return null;
	}
	let text = null;
	for (const element of statementsNode){
		if (element.type === "string"){
			text = element;
		}
	}
	checkClasses.text = text;
	
	return {
		type: 'display_lcdSetText',
		fields: { LINE: checkClasses.line, POS: checkClasses.pos },
		values: {
			TEXT: null,
		},
		mutations: null,
		statementsNode: { TEXT: text },
		statements: null,
	}
}

utils.prototypeBlocks['clear'] = function (method, identifier, values, mutations, statementsNode) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return null;
	}
	return {
		type: 'display_lcdClear',
		fields: {},
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	}
}	