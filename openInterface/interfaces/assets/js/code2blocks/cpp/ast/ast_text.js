import utils from '/openInterface/interfaces/assets/js/code2blocks/cpp/utils/utils.js';



utils.prototypeBlocks['String'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	
	let insidePrintBlock = false;
	if (parent && parent.text.match(/Serial\.(print|println)/g)){
		insidePrintBlock = true;
	}


	if (insidePrintBlock ) {}
	let checkStringLiteral = false;
	let string = '';
	for (const node of statementsNode) {
		if (node.type === 'string_literal') {
			checkStringLiteral = true;
			string += node.text.replace(/"/g, '');
		}

		if (checkStringLiteral) {
			return {
				type: 'text',
				fields: {TEXT: string},
				values: {},
				mutations: null,
				statementsNode: null,
				statement: null,
			};
		} else {
			return {
				type: 'variables_force_type',
				fields: { TYPE: "TEXT" },
				values: { VALUE: null },
				mutations: null,
				statementsNode: { VALUE: statementsNode[0] },
				statement: null,
			};
		}
	}
};

utils.prototypeBlocks['text_join'] = function (type, fields, values, mutations, statementsNode, statement) {
	const textJoinBlock = {
		type: 'text_join',
		fields: {},
		values: {},
		mutations: {},
		statementsNode: {},
		statements: null,
	};

	textJoinBlock.mutations = { items: statementsNode.length };

	for (let i = 0; i < statementsNode.length; i++) {
		let argumentList = null;
		for (const nodeChild of statementsNode[i].children) {
			if (nodeChild.type === 'argument_list') {
				argumentList = utils.getArgumentList(nodeChild.children);
			}
		}
		textJoinBlock.values[`ADD${i}`] = null;
		textJoinBlock.statementsNode[`ADD${i}`] = argumentList !== null ? argumentList[0] : statementsNode[i];
	}
	return textJoinBlock;
};

utils.prototypeBlocks['.length'] = function (identifier){
	let stringValue = {}
	if (identifier.type === 'call_expression'){
		if (identifier.children[0].text === 'String'){
			stringValue = utils.getArgumentList(identifier.children[1].children)[0];
		}
	} else if (typeof identifier === 'string'){
		stringValue = {type:"identifier", text:identifier, children:[]};
	}

	console.log('stringValue', stringValue, "identifier", identifier);
	return {
		type: 'text_length',
		fields: {},
		values: { VALUE: null },
		mutations: null,
		statementsNode: { VALUE: stringValue || {type:"char_litteral", text:"Bonjour"} },
		statement: null,
	};

}


utils.prototypeBlocks['isStringEmpty'] = function (type, fields, values, mutations, statementsNode, statement){
	let stringValue = statementsNode[0] || {type:"char_litteral", text:"Bonjour"};
	if (statementsNode.length > 0 && statementsNode[0].type === 'call_expression'){
		if (statementsNode[0].children[0].text === 'String'){
			stringValue = utils.getArgumentList(statementsNode[0].children[1].children)[0];
		}
	}
	
	return {
		type: 'text_isEmpty',
		fields: {},
		values: { VALUE: null },
		mutations: null,
		statementsNode: { VALUE: stringValue },
		statement: null,
	};
	

}
