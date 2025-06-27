import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


utils.prototypeBlocks['text_join_simple'] = function (type, fields, values, mutations, statementsNode, statement) {
	
	

	const textJoinBlock = {
		type: 'text_join_simple',
		fields: {},
		values: {},
		mutations: {items: 0},
		statementsNode: {},
		statements: null,
	};

	for (let i = 0; i < statementsNode.length; i++) {
		textJoinBlock.mutations.items++;
		textJoinBlock.values[`ADD${i}`] = null;
		textJoinBlock.statementsNode[`ADD${i}`] = statementsNode[i];
	}

	return textJoinBlock;

};

utils.prototypeBlocks['text_reverse'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'text_reverse',
		fields: {},
		values: {TEXT: null},
		mutations: null,
		statementsNode: {TEXT: statementsNode},
		statement: null,
	};
};

utils.prototypeBlocks['random_letter'] = function (type, fields, values, mutations, statementsNode, statement) {
	let listElement = { type: 'identifier', text: 'text' };
	if (statementsNode.length > 0) {
		listElement = statementsNode[0];
	}
	return {
		type: 'text_charAt',
		fields: {WHERE: 'RANDOM'},
		values: {VALUE: null},
		mutations: {at: 'false'},
		statementsNode: {VALUE: listElement},
		statement: null,
	};
};

// specific to text
utils.prototypeBlocks['text_charAt'] = function (identifier, index) {
	const textCharAtBlock = {
		type: 'text_charAt',
		fields: {},
		values: {},
		mutations: {at: 'true'},
		statementsNode: {},
		statement: null,
	};

	if (index.type === "integer"){
		if (index.text === "0"){
			textCharAtBlock.fields.WHERE = 'FIRST';
			textCharAtBlock.values.VALUE = null;
			textCharAtBlock.statementsNode.VALUE = identifier;
		} else {
			textCharAtBlock.fields.WHERE = 'FROM_START';
			textCharAtBlock.values.AT = null;
			textCharAtBlock.values.VALUE = null;
			textCharAtBlock.statementsNode.AT = index;
			textCharAtBlock.statementsNode.VALUE = identifier;
		}
	} else if (index.type === "unary_operator"){
		if (index.children[1].type === "integer"){
			if (index.children[1].text === "1"){
				textCharAtBlock.fields.WHERE = 'LAST';
				textCharAtBlock.values.VALUE = null;
				textCharAtBlock.statementsNode.VALUE = identifier;
			} else {
				textCharAtBlock.fields.WHERE = 'FROM_END';
				textCharAtBlock.values.AT = null;
				textCharAtBlock.values.VALUE = null;
				const textIndex = index.children[1];
				textIndex.text = (parseInt(textIndex.text) - 1).toString();
				textCharAtBlock.statementsNode.AT = textIndex;
				textCharAtBlock.statementsNode.VALUE = identifier;
			}
		} else {
			textCharAtBlock.fields.WHERE = 'FROM_END';
			textCharAtBlock.values.VALUE = null;
			textCharAtBlock.values.AT = null;
			textCharAtBlock.statementsNode.VALUE = identifier;
			textCharAtBlock.statementsNode.AT = index.children[1];
		}	
	} else if (index.type === "identifier") {
		textCharAtBlock.fields.WHERE = 'FROM_START';
		textCharAtBlock.values.AT = null;
		textCharAtBlock.values.VALUE = null;
		textCharAtBlock.statementsNode.AT = index;
		textCharAtBlock.statementsNode.VALUE = identifier;
	}

	return textCharAtBlock;


}