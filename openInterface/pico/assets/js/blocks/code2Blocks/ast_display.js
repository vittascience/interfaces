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

	// add the init in blockly so that is not added again
	
	const classDeclaration = {
		type: 'define_class_declaration',
		fields: { VAR: { name: 'VAR', id: Blockly.utils.genUid(), value: identifier }, NAME: className},
		values: {
		},
		mutations: {
			items: 0
		},
		statementsNode: {items0: classArgs},
		statements: null,
	}

	for (let i = 0; i < classArgs.length; i++) {
		classDeclaration.values[`items${i}`] = null;
		classDeclaration.statementsNode[`items${i}`] = classArgs[i];
		classDeclaration.mutations.items++;
	}

	Blockly.Python.addInit('lcd1602', `${identifier} = LCD1602(i2c=I2C(scl=Pin(22), sda=Pin(21)))`);


	return classDeclaration;
}

utils.prototypeBlocks['setCursor'] = function (method, identifier, values, mutations, statementsNode) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return null;
	}
	let line = null;
	let pos = null;
	let pin = {"scl":Number(checkClasses.i2c.scl.text) || 9, "sda":Number(checkClasses.i2c.sda.text) || 8};
	for (const element of statementsNode){
		if (element.type === "integer" && line === null){
			line = element.text;
		} else if (element.type === "integer" && line !== null){
			pos = element.text;
		}
			
	}
	checkClasses.pin = pin;
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
		fields: { LINE: checkClasses.line, POS: checkClasses.pos, PIN: JSON.stringify(checkClasses.pin) },
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
		fields: { PIN: JSON.stringify(checkClasses.pin) },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	}
}	

