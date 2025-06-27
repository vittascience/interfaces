import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['SHT31'] = function (node, identifier) {
    let classArgs = null;
	let className = null

	for (const arg of node.children) {
		if (arg.type === 'argument_list') {
			classArgs = utils.getArgumentList(arg.children)[0];
		}else if (arg.type === "identifier") {
			className = arg.text;
		}
	}

	// add the init in blockly so that is not added again
	Blockly.Python.addInit('sht31', `${identifier} = SHT31(i2c=I2C(scl=Pin(22), sda=Pin(21)))`);

	return {
		type: 'define_class_declaration',
		fields: { VAR: { name: 'VAR', id: Blockly.utils.genUid(), value: identifier }, NAME: className},
		values: {
			ARGS: null,
		},
		mutation: null,
		statementsNode: {ARGS: classArgs},
		statements: null,
	}

};

utils.prototypeBlocks['get_temp_humi'] = function (method, identifier, values, mutations, statementsNode) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return null;
	}
	const sensorBlock = {
		type: 'sensors_SHT31readData',
		fields: {},
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};

	const value = statementsNode[0].text === '0' ? 'TEMP' : 'HUM'; 
	if (value === 'TEMP') {
		sensorBlock.fields = { DATA: 'TEMP', UNIT: 'CELSIUS' };
	} else {
		sensorBlock.fields = { DATA: 'HUM'}
	}
	return sensorBlock;
}

// // gas
utils.prototypeBlocks['GAS'] = function (node, identifier) {
	
	let classArgs = null;
	let className = null

	for (const arg of node.children) {
		if (arg.type === 'argument_list') {
			classArgs = utils.getArgumentList(arg.children);
		}else if (arg.type === "identifier") {
			className = arg.text;
		}
	}

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

	Blockly.Python.addInit('gas', `${identifier} = GAS(i2c=I2C(scl=Pin(22), sda=Pin(21)))`);

	return classDeclaration;
};

utils.prototypeBlocks['calc_gas'] = function (method, identifier, values, mutations, statementsNode) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return null;
	}

	let multichannelType = "CO";
	if (statementsNode[0].type === 'attribute') {
		multichannelType = statementsNode[0].children[2].text;
	}

	console.log('multichannelType', multichannelType);

	return {
		type: 'sensors_getMultichannelGas',
		fields: { GAS: multichannelType },
		values: null,
		statementsNode: null,
		statements: null,
	}
};


utils.prototypeBlocks['SGP30'] = function (node, identifier) {

	let classArgs = null;
	let className = null

	for (const arg of node.children) {
		if (arg.type === 'argument_list') {
			classArgs = utils.getArgumentList(arg.children);
		}else if (arg.type === "identifier") {
			className = arg.text;
		}
	}

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

	Blockly.Python.addInit('sgp30', `${identifier} = SGP30(i2c=I2C(scl=Pin(22), sda=Pin(21)))`);

	return classDeclaration;
};

utils.prototypeBlocks['co2_equivalent'] = function (method, identifier, values, mutations, statementsNode) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return null;
	}

	return {
		type: 'sensors_getSgp30Gas',
		fields: {GAS: 'CO2'},
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	}
}

utils.prototypeBlocks['total_organic_compound'] = function (method, identifier, values, mutations, statementsNode) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return null;
	}

	return {
		type: 'sensors_getSgp30Gas',
		fields: {GAS: 'TVOC'},
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	}
};

