import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['print'] = function (type, fields, values, mutations, statementsNode, statement) {
	if (statementsNode.length > 1 && utils.prototypeBlocks['print_with_separator']) {
		return utils.prototypeBlocks['print_with_separator'](type, fields, values, mutations, statementsNode, statement);
	}
	//  no print on bluebot or buddy
	if (INTERFACE_NAME === 'bluebot' || INTERFACE_NAME === 'buddy') {
		return null;
	}

	const serialPrintBlock = {
		type: 'communication_serialWrite',
		fields: {},
		values: {
			TEXT: null,
		},
		mutations: {},
		statementsNode: {},
		statement: null,
	};
	let argumentList = null;
	let jumpLines = false;
	let linesNumber = 1;

	const checkType = ['integer', 'identifier', 'subscript', 'binary_operator', 'string', 'call'];
	if (statementsNode[0].type === 'binary_operator') {
		for (const node of statementsNode[0].children) {
			if (checkType.includes(node.type)) {
				if (node.type === 'string') {
					const stringContent = node.children[1];
					const checkSequence = stringContent.children.filter((child) => child.type === 'escape_sequence').length;
					if (checkSequence > 0) {
						jumpLines = true;
						linesNumber = stringContent.children.length;
					} else {
						serialPrintBlock.statementsNode.TEXT = { type: 'string', text: stringContent.text.replace(/["']/g, '') };
					}
				} else {
					serialPrintBlock.statementsNode.TEXT = node;
				}
			}
		}
	} else {
		if (checkType.includes(statementsNode[0].type)) {
			statementsNode[0].text = statementsNode[0].text.replace(/["']/g, '');
			serialPrintBlock.statementsNode = { TEXT: statementsNode[0] };
		}
	}

	if (jumpLines) {
		serialPrintBlock.mutations = { newlines: true };
		serialPrintBlock.fields = { NEWLINES: linesNumber };
	} else {
		serialPrintBlock.mutations = { newlines: false };
		serialPrintBlock.statementsNode.TEXT = statementsNode[0];
	}
	return serialPrintBlock;
};

utils.prototypeBlocks['serial_graph'] = function (type, fields, values, mutations, statementsNode, statement) {
	let needGraphSerial = false;

	const serialGraphBlock = {
		type: 'communication_graphSerialWrite',
		fields: {},
		values: {},
		mutations: {},
		statementsNode: {},
		statement: null,
	};

	let graphValues = [];

	if (statementsNode && statementsNode.length > 0 && statementsNode[0].text.match('@Graph:')) {
		needGraphSerial = true;
		let keyPair = null;
		for (let i = 0; i < statementsNode.length; i++) {
			if (statementsNode[i].type === 'string' && (statementsNode[i].text.match('@Graph:') || statementsNode[i].text.match('|'))) {
				if (keyPair === null) {
					keyPair = {};
					let name = utils.extractString(statementsNode[i]).text.replaceAll(/(@Graph:|\|)/g, '');
					keyPair.name = name;
				}
			} else if (keyPair !== null && keyPair.name !== undefined && statementsNode[i].type === 'call' && statementsNode[i].children[0].text === 'str') {
				const valueString = utils.getArgumentList(statementsNode[i].children.filter((node) => node.type === "argument_list")[0].children);
				keyPair.value = valueString[0] || { type: 'integer', text: '0' };
				graphValues.push(keyPair);
				keyPair = null;
			}
		}
	}

	if (needGraphSerial) {
		serialGraphBlock.mutations = { items: graphValues.length };
		for (let i = 0; i < graphValues.length; i++) {
			serialGraphBlock.values[`ADD${i}`] = null;
			serialGraphBlock.statementsNode[`ADD${i}`] = { type: 'bypass', block: 'communication_graphSerialWrite_datasFormat', text: graphValues[i] };
		}
		return serialGraphBlock;
	} else {
		return null;
	}
};

utils.prototypeBlocks['communication_graphSerialWrite_datasFormat'] = function (data) {
	const dataEl = { type: "integer", text: '0' };
	return {
		type: 'communication_graphSerialWrite_datasFormat',
		fields: { NAME: data.name.replaceAll(':', '') },
		values: { DATA: null },
		mutations: null,
		statementsNode: { DATA: data.value || dataEl },
		statement: null,
	};
};


utils.prototypeBlocks['print_with_separator'] = function (type, fields, values, mutations, statementsNode, statement) {
	if (INTERFACE_NAME === 'bluebot' || INTERFACE_NAME === 'buddy') {
		return null;
	}

	const serialPrintSeparatorBlock = {
		type: 'print_with_separator',
		fields: {},
		values: {},
		mutations: {},
		statementsNode: {},
		statement: null,
	};

	serialPrintSeparatorBlock.mutations = { items: statementsNode.length };
	for (let i = 0; i < statementsNode.length; i++) {
		serialPrintSeparatorBlock.values[`items${i}`] = null;
		serialPrintSeparatorBlock.statementsNode[`items${i}`] = statementsNode[i];
	}

	return serialPrintSeparatorBlock;
};