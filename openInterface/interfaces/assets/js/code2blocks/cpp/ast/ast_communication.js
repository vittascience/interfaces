import utils from '/openInterface/interfaces/assets/js/code2blocks/cpp/utils/utils.js';

// Called if the function Serial.println is called and the Serial.begin is not called in the setup function but the serial_setupConnection is called
utils.prototypeBlocks['Serial.println_old'] = function (type, fields, values, mutations, statementsNode, statement) {
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

	const checkType = ['number_literal', 'identifier', 'subscript_expression', 'binary_expression', 'string_literal', 'cast_expression', 'call_expression'];
	if (statementsNode[0].type === 'binary_expression') {
		for (const node of statementsNode[0].children) {
			if (checkType.includes(node.type)) {
				if (node.type === 'string_literal') {
					for (const nodeChild of node.children) {
						if (nodeChild.type === 'escape_sequence') {
							jumpLines = true;
							linesNumber++;
						}
					}
				} else {
					serialPrintBlock.statementsNode.TEXT = node;
				}
			}
		}
	} else {
		if (checkType.includes(statementsNode[0].type)) {
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

// Called if the function Serial.begin is called in the setup function. It will override the serial_setupConnection block with the custom block communication_serialWrite_simple
utils.prototypeBlocks['Serial.begin'] = function (type, fields, values, mutations, statementsNode, statement) {
	const isWithinSetup = Cpp2Blocks.isWithinSetup;
	const setupMode = Cpp2Blocks.setupMode;
	if (!isWithinSetup) {
		return null;
	}
	setupMode.serialBegin = { declared: true, type: 'serial_begin' };
	const serialBeginBlock = {
		type: 'communication_serialBegin',
		fields: null,
		values: { SPEED: null },
		mutations: {},
		statementsNode: { SPEED: statementsNode[0] },
		statement: null,
	};
	return serialBeginBlock;
};

// simplified version of Serial.println (without mutator for newlines)
utils.prototypeBlocks['Serial.println'] = function (type, fields, values, mutations, statementsNode, statement) {
	const printValue = statementsNode[0];
	const setupMode = Cpp2Blocks.setupMode;
	let stringContent = null;
	for (const node of statementsNode) {
		if (node.type === 'string_literal') {
			const string = utils.extractStringLiterals(node.children);
			if (string) {
				stringContent = string;
			}
		}
	}
	if (stringContent) {
		if (stringContent.match(/@music:/g)) {
			try {
				const musicNoteFunc = utils.prototypeBlocks[`music_note_${INTERFACE_NAME}`];
				if (musicNoteFunc !== null) {
					const music = utils.prototypeBlocks[`music_note_${INTERFACE_NAME}`](stringContent);
					if (music !== null) {
						return music;
					}
				}
			} catch (error) {
				console.error('Error parsing music:', error);
			}
		}
	}

	if (typeof setupMode.serialBegin === 'undefined') {
		return null;
	}

	if (setupMode.serialBegin.type === 'serial_setupConnection') {
		return utils.prototypeBlocks['Serial.println_old'](type, fields, values, mutations, statementsNode, statement);
	} else if (setupMode.serialBegin.type === 'serial_begin') {
		return {
			type: 'communication_serialWrite_simple',
			fields: {},
			values: {
				TEXT: null,
			},
			mutations: {},
			statementsNode: { TEXT: printValue },
			statement: null,
		};
	} else {
		return null;
	}
};

// To fit with the new block structure "communication_serialWrite_simple" we need to check if the function serial_setupConnection is called in the setup function or not, if true serialBegin is set to true and do not create the Serial.begin block
utils.prototypeBlocks['serial_setupConnection'] = function (type, fields, values, mutations, statementsNode, statement) {
	const isWithinSetup = Cpp2Blocks.isWithinSetup;
	const setupMode = Cpp2Blocks.setupMode;
	if (!isWithinSetup) {
		return null;
	}
	setupMode.serialBegin = { declared: true, type: 'serial_setupConnection' };
	return '';
};


