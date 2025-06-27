import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const createTextToSpeechBlock = (statementsNode) => {
	for (const child of statementsNode) {
		if (child.type === 'string') {
			return {
				type: 'communication_textToSpeech_say',
				fields: {},
				values: { TEXT: null },
				mutations: null,
				statementsNode: { TEXT: child },
				statement: null,
			};
		}
	}
	return {
		type: 'communication_textToSpeech_say',
		fields: {},
		values: { TEXT: null },
		mutations: null,
		statementsNode: {
			TEXT: { type: 'string', text: "'Hello !'", children: [] },
		},
		statement: null,
	};
};

utils.prototypeBlocks['tts.say'] = function (type, identifier, values, mutations, statementsNode, statement) {
	return createTextToSpeechBlock(statementsNode);
};

utils.prototypeBlocks['asr.setLanguage'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const languageTypes = ['French', 'English', 'Spanish', 'German', 'Italian'];
	let language = 'French';
	for (const child of statementsNode) {
		if (child.type === 'string') {
			language = utils.extractString(child).text;
		}
	}

	return {
		type: 'communication_asr_setLanguage',
		fields: { LANGUAGE: languageTypes.includes(language) ? language : 'French' },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

utils.prototypeBlocks['asr.setVocabulary'] = function (type, identifier, values, mutations, statementsNode, statement) {
	let vocabulary = null;
	for (const child of statementsNode) {
		if (child.type === 'list' || child.type === 'identifier') {
			vocabulary = child;
		}
	}

	if (vocabulary === null) {
		return {
			type: 'communication_asr_setVocabulary',
			fields: {},
			values: { VOCABULARY: null },
			mutations: null,
			statementsNode: { VOCABULARY: { type: 'list', text: '[]', children: [] } },
			statement: null,
		};
	}

	return {
		type: 'communication_asr_setVocabulary',
		fields: {},
		values: { VOCABULARY: null },
		mutations: null,
		statementsNode: { VOCABULARY: vocabulary },
		statement: null,
	};
};

utils.prototypeBlocks['asr.startRecognition'] = function (type, identifier, values, mutations, statementsNode, statement) {
	// to do : add callback function or trigger an error
	// if (statementsNode.length > 0) {
	// 	if (statementsNode[0].type === 'identifier' && statementsNode[0].text === 'on_speech_recognized') {
	// 	} else {
	//  }
	// }
	return {
		type: 'communication_asr_startRecognition',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

utils.prototypeBlocks['asr.stopRecognition'] = function (type, identifier, values, mutations, statementsNode, statement) {
	return {
		type: 'communication_asr_stopRecognition',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};


utils.prototypeBlocks['specific_function_on_speech_recognized'] = function (functionDef, functionBlock, args) {
	if (args.length === 0) {
		return {
			type: 'communication_asr_getLastWord_callback_decorated',
			fields: { VAR: { name: 'VAR', id: 'VAR', value: 'WORD' } },
			values: {},
			mutations: null,
			statementsNode: null,
			statements: { DO: functionBlock },
		};
	}
	return {
		type: 'communication_asr_getLastWord_callback_decorated',
		fields: { VAR: { name: 'VAR', id: args[0].id, value: args[0].name } },
		values: {},
		mutations: null,
		statementsNode: null,
		statements: { DO: functionBlock },
	};
};
