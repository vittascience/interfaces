import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['len'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (parent.type === 'not_operator') {
		if (statementsNode[0].type === 'string') {
			return {
				type: 'text_isEmpty',
				fields: {},
				values: { VALUE: null },
				mutations: null,
				statementsNode: { VALUE: statementsNode[0] || {type: "string", text: ""} },
				statement: null,
			};
		} else {
			return {
				type: 'lists_isEmpty',
				fields: {},
				values: { VALUE: null },
				mutations: null,
				statementsNode: { VALUE: statementsNode[0] || null },
				statement: null,
			};
		}
	}

	if (statementsNode[0].type === 'string') {
		return {
			type: 'text_length',
			fields: {},
			values: { VALUE: null },
			mutations: null,
			statementsNode: { VALUE: statementsNode[0] || {type: "string", text: ""} },
			statement: null,
		};
	} else {

		
		return {
			type: 'lists_length',
			fields: {},
			values: { VALUE: null },
			mutations: null,
			statementsNode: { VALUE: statementsNode[0] || null },
			statement: null,
		};
	}
};

utils.prototypeBlocks['sum'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_on_list',
		fields: { OP: 'SUM' },
		values: { LIST: null },
		mutations: null,
		statementsNode: { LIST: statementsNode[0] || null },
		statement: null,
	};
};

utils.prototypeBlocks['max'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_on_list',
		fields: { OP: 'MAX' },
		values: { LIST: null },
		mutations: null,
		statementsNode: { LIST: statementsNode[0] || null },
		statement: null,
	};
};

utils.prototypeBlocks['min'] = function (type, fields, values, mutations, statementsNode, statement) {

	let checkConstrainBlock = null;
	let min= null;
	let max = null;
	let valueConstraint = null;
	if (statementsNode.length > 1){
		if (statementsNode[0].type === 'call' && statementsNode[0].children[0]?.text === 'max'){
			const getArgs = utils.getArgumentList(statementsNode[0].children.filter((child) => child.type === 'argument_list')[0].children);
			if (getArgs.length === 2) {
				valueConstraint = getArgs[0] || {type: 'integer', text: '0'};
				min = getArgs[1] || {type: 'integer', text: '1'};
			}
		}
		max = statementsNode[1] || {type: 'integer', text: '100'};

		if (valueConstraint !== null && min !== null && max !== null) {
			return checkConstrainBlock = {
				type: 'math_constrain',
				fields: {},
				values: { VALUE: null, LOW: null, HIGH: null },
				mutations: null,
				statementsNode: { VALUE: valueConstraint, LOW: min, HIGH: max },
				statement: null,
			};
		}
	} 


	return {
		type: 'math_on_list',
		fields: { OP: 'MIN' },
		values: { LIST: null },
		mutations: null,
		statementsNode: { LIST: statementsNode[0] || null },
		statement: null,
	};
};

utils.prototypeBlocks['random.choice'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_on_list',
		fields: { OP: 'RANDOM' },
		values: { LIST: null },
		mutations: null,
		statementsNode: { LIST: statementsNode[0] || null },
		statement: null,
	};
};

utils.prototypeBlocks['math_mean'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_on_list',
		fields: { OP: 'AVERAGE' },
		values: { LIST: null },
		mutations: null,
		statementsNode: { LIST: statementsNode[0] || null },
		statement: null,
	};
};

utils.prototypeBlocks['math_median'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_on_list',
		fields: { OP: 'MEDIAN' },
		values: { LIST: null },
		mutations: null,
		statementsNode: { LIST: statementsNode[0] || null },
		statement: null,
	};
};

utils.prototypeBlocks['math_modes'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_on_list',
		fields: { OP: 'MODE' },
		values: { LIST: null },
		mutations: null,
		statementsNode: { LIST: statementsNode[0] || null },
		statement: null,
	};
};

utils.prototypeBlocks['list'] = function (type, fields, values, mutations, statementsNode, statement) {
	let checkCall = null;
	const checkTypes = ['call', 'identifier', 'list'];
	let args;
	for (const child of statementsNode) {
		if (child.type === 'call') {
			for (const childNode of child.children) {
				if (checkTypes.includes(childNode.type) && childNode.text === 'reversed') {
					checkCall = 'reversed';
				} else if (childNode.type === 'argument_list') {
					args = utils.getArgumentList(childNode.children);
				}
			}
		}
	}

	switch (checkCall) {
		case 'reversed':
			return {
				type: 'lists_reverse',
				fields: {},
				values: { LIST: null },
				mutations: null,
				statementsNode: { LIST: args[0] },
				statement: null,
			};
	}
};

/**
 *
 * @param {string} type
 * @param {string} varID
 * @param {string} list
 * @param {object} statementsNode
 * @param {object} parent
 * @returns
 */
// identifier, varID, child.text, statementsNode
utils.prototypeBlocks['list_built_in'] = function (type, list, statementsNode, parent) {
	let standAlone = false;
	if (parent.type === 'block' || parent.type === 'statement') {
		standAlone = true;
	}

	// need to find a way to include the list as the identifier directly
	switch (type) {
		case 'find':
			let findValue = null;
			if (typeof list === 'string') {
				findValue = { type: 'identifier', text: list };
			} else {
				findValue = list;
			}
			return {
				type: 'text_indexOf',
				fields: { END: 'FIRST' },
				values: { VALUE: null, FIND: null },
				mutations: null,
				statementsNode: { VALUE: findValue, FIND: statementsNode[0] },
				statement: null,
			};
		case 'rfind':
			let rfindValue = null;
			if (typeof list === 'string') {
				rfindValue = { type: 'identifier', text: list };
			} else {
				rfindValue = list;
			}
			return {
				type: 'text_indexOf',
				fields: { END: 'LAST' },
				values: { VALUE: null, FIND: null },
				mutations: null,
				statementsNode: { VALUE: rfindValue, FIND: statementsNode[0] },
				statement: null,
			};

		case 'append':
			return {
				type: 'lists_append',
				fields: {},
				values: { LIST: null, VALUE: null },
				mutations: null,
				statementsNode: { LIST: { type: 'identifier', text: list }, VALUE: statementsNode[0] },
				statement: null,
			};
		case 'index':
			return {
				type: 'lists_indexOf',
				fields: { END: 'FIRST' },
				values: { LIST: null, FIND: null },
				mutations: null,
		
				statementsNode: { LIST: { type: 'identifier', text: list }, FIND: statementsNode[0] },
				statement: null,
			};
		case 'split':
			let textValue = null;
			let textBloc = false;
			if (typeof list === 'string') {
				textValue = { type: 'identifier', text: list };
			} else if (list.type === 'call' && list.text.match(/str\(.*\)/)) {
				console.log('childrenList', list.children.filter((child) => child.type === 'argument_list'));
				textValue = utils.getArgumentList(list.children.filter((child) => child.type === 'argument_list')[0].children)[0];
				textBloc = true;
			} else if (list.type === 'string') {
				textValue = utils.extractString(list);
			}
			let delimiter = '';
			
			if (statementsNode[0].type === 'string') {
				delimiter = utils.extractString(statementsNode[0])
			} else if (statementsNode[0].type === 'identifier') {
				delimiter = statementsNode[0];
			}

			if (textBloc) {
				return {
					type: 'text_split',
					fields: {},
					values: { VALUE: null, SEP: null },
					mutations: null,
					statementsNode: { VALUE: textValue, SEP: delimiter },
					statement: null,
				}
			} else {
				return {
					type: 'lists_split',
					fields: { MODE: 'SPLIT' },
					values: { INPUT: null, DELIM: null },
					mutations: { mode: 'SPLIT' },
					statementsNode: { INPUT: textValue, DELIM: delimiter },
					statement: null,
				};
			}
		case 'join':
			let joinValue = null;
			if (typeof list === 'string') {
				joinValue = { type: 'identifier', text: list };
			} else {
				joinValue = { type: 'string', text: list.children[1].text };
			}
			let joinList = null;
			if (statementsNode[0].type === 'string') {
				joinList = { type: 'string', text: statementsNode[0].children[1].text };
			} else if (statementsNode[0].type === 'identifier') {
				joinList = statementsNode[0];
			
			}

			return {
				type: 'lists_split',
				fields: { MODE: 'JOIN' },
				values: { INPUT: null, DELIM: null },
				mutations: { mode: 'JOIN' },
				statementsNode: { INPUT: joinList, DELIM: joinValue },
				statement: null,
			};

		case 'pop':
			if (standAlone) {
				if (statementsNode.length === 0) {
					return {
						type: 'lists_getIndex',
						fields: { MODE: 'REMOVE', WHERE: 'LAST' },
						values: { VALUE: null },
						mutations: { statement: 'true', at: 'false' },
						statementsNode: { VALUE: { type: 'identifier', text: list } },
						statement: null,
					};
				} else if (statementsNode.length > 0 && statementsNode[0].text === '0') {
					return {
						type: 'lists_getIndex',
						fields: { MODE: 'REMOVE', WHERE: 'FIRST' },
						values: { VALUE: null },
						mutations: { statement: 'true', at: 'false' },
						statementsNode: { VALUE: { type: 'identifier', text: list } },
						statement: null,
					};
				} else if (statementsNode.length > 0 && statementsNode[0].type === 'unary_operator') {
					if (statementsNode[0].children[1].text === '0') {
						return {
							type: 'lists_getIndex',
							fields: { MODE: 'REMOVE', WHERE: 'FIRST' },
							values: { VALUE: null },
							mutations: { statement: 'true', at: 'false' },
							statementsNode: { VALUE: { type: 'identifier', text: list } },
							statement: null,
						};
					} else {
						const value = statementsNode[0].children[1];
						value.text = String(Number(value.text) - 1);
						return {
							type: 'lists_getIndex',
							fields: { MODE: 'REMOVE', WHERE: 'FROM_END' },
							values: { VALUE: null, AT: null },
							mutations: { statement: 'true', at: 'true' },
							statementsNode: { VALUE: { type: 'identifier', text: list }, AT: value },
							statement: null,
						};
					}
				} else if (statementsNode.length > 0 && statementsNode[0].type === 'integer' && statementsNode[0].text !== '0') {
					return {
						type: 'lists_getIndex',
						fields: { MODE: 'REMOVE', WHERE: 'FROM_START' },
						values: { VALUE: null, AT: null },
						mutations: { statement: 'true', at: 'true' },
						statementsNode: { VALUE: { type: 'identifier', text: list }, AT: statementsNode[0] },
						statement: null,
					};
				}
			}
			if (statementsNode.length > 0 && statementsNode[0].type === 'unary_operator') {
				if (statementsNode[0].children[1].text === '0') {
					return {
						type: 'lists_getIndex',
						fields: { MODE: 'GET_REMOVE', WHERE: 'FIRST' },
						values: { VALUE: nullll },
						mutations: { statement: 'false', at: 'true' },
						statementsNode: { VALUE: { type: 'identifier', text: list } },
						statement: null,
					};
				} else {
					const value = statementsNode[0].children[1];
					value.text = String(Number(value.text) - 1);
					return {
						type: 'lists_getIndex',
						fields: { MODE: 'GET_REMOVE', WHERE: 'FROM_END' },
						values: { VALUE: null, AT: null },
						mutations: { statement: 'false', at: 'true' },
						statementsNode: { VALUE: { type: 'identifier', text: list }, AT: value },
						statement: null,
					};
				}
			} else {
				if (statementsNode.length === 0 || statementsNode[0].text === '0') {
					return {
						type: 'lists_getIndex',
						fields: { MODE: 'GET_REMOVE', WHERE: 'FIRST' },
						values: { VALUE: null },
						mutations: { statement: 'false', at: 'true' },
						statementsNode: { VALUE: { type: 'identifier', text: list } },
						statement: null,
					};
				} else {
					return {
						type: 'lists_getIndex',
						fields: { MODE: 'GET_REMOVE', WHERE: 'FROM_START' },
						values: { VALUE: null, AT: null },
						mutations: { statement: 'false', at: 'true' },
						statementsNode: { VALUE: { type: 'identifier', text: list }, AT: statementsNode[0] },
						statement: null,
					};
				}
			}
		case 'format':

			const textJoinBlock = {
				type: 'text_join',
				fields: {},
				values: {},
				mutations: { items: 0 },
				statementsNode: [],
				statement: null,
			};

			// need to to rework this very bad implementation of format method to the proper way
			let count = 0;
			let format = null;
			if (list.type === 'parenthesized_expression') {
				for (const child of list.children) {
					if (child.type === 'binary_operator') {
						format = child
						for (const childNode of child.children) {
							if (childNode.type === 'integer') {
								count = Number(childNode.text);
							}
						}
					}
				}
			}
			const stringsToFormat = []
			for (const child of statementsNode) {
				if (child.type === 'string') {
					stringsToFormat.push(utils.extractString(child));
				} else if (child.type === 'identifier') {
					stringsToFormat.push(child);
				}
			}
			const items = stringsToFormat.length;

			for (let i = 0; i < items; i++) {
				textJoinBlock.values[`ADD${i}`] = null;
				textJoinBlock.mutations.items = i + 1;
				textJoinBlock.statementsNode[`ADD${i}`] = stringsToFormat[i];
			};	
			return textJoinBlock;
			
		case 'upper':
			if (typeof list === 'string') {
				list = { type: 'identifier', text: list };
			} 
			return {
				type: 'text_changeCase',
				fields: { CASE: 'UPPERCASE' },
				values: { TEXT: null },
				mutations: null,
				statementsNode: { TEXT: list },
				statement: null,
			};
		case 'lower':
			if (typeof list === 'string') {
				list = { type: 'identifier', text: list };
			} 
			return {
				type: 'text_changeCase',
				fields: { CASE: 'LOWERCASE' },
				values: { TEXT: null },
				mutations: null,
				statementsNode: { TEXT: list },
				statement: null,
			};
		case 'title':
			if (typeof list === 'string') {
				list = { type: 'identifier', text: list };
			} 
			return {
				type: 'text_changeCase',
				fields: { CASE: 'TITLECASE' },
				values: { TEXT: null },
				mutations: null,
				statementsNode: { TEXT: list },
				statement: null,
			};
		case 'strip':
			let stripValue = null;
			if (typeof list === 'string') {
				stripValue = { type: 'identifier', text: list };
			} else {
				stripValue = list;
			}
			return {
				type: 'text_trim',
				fields: { MODE: 'BOTH' },
				values: { TEXT: null },
				mutations: null,
				statementsNode: { TEXT: stripValue },
				statement: null,
			};
		case 'lstrip':
			let lstripValue = null;
			if (typeof list === 'string') {
				lstripValue = { type: 'identifier', text: list };
			} else {
				lstripValue = list;
			}
			return {
				type: 'text_trim',
				fields: { MODE: 'LEFT' },
				values: { TEXT: null },
				mutations: null,
				statementsNode: { TEXT: lstripValue },
				statement: null,
			};
		case 'rstrip':
			let rstripValue = null;
			if (typeof list === 'string') {
				rstripValue = { type: 'identifier', text: list };
			} else {
				rstripValue = list;
			}
			return {
				type: 'text_trim',
				fields: { MODE: 'RIGHT' },
				values: { TEXT: null },
				mutations: null,
				statementsNode: { TEXT: rstripValue },
				statement: null,
			};
		case "count":
			let countValue = null;
			if (typeof list === 'string') {
				countValue = { type: 'identifier', text: list };
			} else {
				countValue = list;
			}
			return {
				type: 'text_count',
				fields: {},
				values: { TEXT: null, SUB: null },
				mutations: null,
				statementsNode: { TEXT: countValue, SUB: statementsNode[0] },
				statement: null,
			};
		
		case 'replace':
			let replaceValue = null;
			if (typeof list === 'string') {
				replaceValue = { type: 'identifier', text: list };
			} else {
				replaceValue = list;
			}
			return {
				type: 'text_replace',
				fields: {},
				values: { TEXT: null, FROM: null, TO: null },
				mutations: null,
				statementsNode: { TEXT: replaceValue, FROM: statementsNode[0], TO: statementsNode[1] },
				statement: null,
			};

	}
};

/**
 *
 * @description custome prototype block for list slice
 */
utils.prototypeBlocks['list_slice'] = function (identifier, sliceNode) {
	const sliceBlock = {
		type: 'lists_getSublist',
		fields: {},
		values: {},
		mutations: {},
		statementsNode: {},
		statement: null,
	};

	if (sliceNode.children.length === 2) {
		if (sliceNode.children[0].type === 'integer' || sliceNode.children[0].type === 'identifier' || sliceNode.children[0].type === 'unary_operator') {
			sliceBlock.mutations = { at1: 'true', at2: 'false' };
			sliceBlock.values = { LIST: null, AT1: null };
			let value = null;
			if (sliceNode.children[0].type === 'unary_operator') {
				value = sliceNode.children[0].children[1];
				value.text = String(Number(value.text) - 1);
			} else {
				value = sliceNode.children[0];
			}
			sliceBlock.statementsNode = { LIST: identifier, AT1: value };
			sliceBlock.fields = { WHERE1: sliceNode.children[0].type === 'unary_operator' ? 'FROM_END' : 'FROM_START', WHERE2: 'LAST' };
		} else if (sliceNode.children[1].type === 'integer' || sliceNode.children[1].type === 'identifier' || sliceNode.children[1].type === 'unary_operator') {
			sliceBlock.mutations = { at1: 'false', at2: 'true' };
			sliceBlock.values = { LIST: null, AT2: null };
			let value = null;
			if (sliceNode.children[1].type === 'unary_operator') {
				value = sliceNode.children[1].children[1];
				value.text = String(Number(value.text) - 1);
			} else {
				value = sliceNode.children[1];
			}
			sliceBlock.statementsNode = { LIST: identifier, AT2: value };
			sliceBlock.fields = { WHERE1: 'FIRST', WHERE2: sliceNode.children[1].type === 'unary_operator' ? 'FROM_END' : 'FROM_START' };
		}
	} else if (sliceNode.children.length === 3) {
		sliceBlock.mutations = { at1: 'true', at2: 'true' };
		sliceBlock.values = { LIST: null, AT1: null, AT2: null };
		let value1 = null;
		let value2 = null;
		if (sliceNode.children[0].type === 'unary_operator') {
			value1 = sliceNode.children[0].children[1];
			value1.text = String(Number(value1.text) - 1);
		} else {
			value1 = sliceNode.children[0];
		}
		if (sliceNode.children[2].type === 'unary_operator') {
			value2 = sliceNode.children[2].children[1];
			value2.text = String(Number(value2.text) - 1);
		} else {
			value2 = sliceNode.children[2];
		}
		sliceBlock.statementsNode = { LIST: identifier, AT1: value1, AT2: value2 };
		sliceBlock.fields = { WHERE1: sliceNode.children[0].type === 'unary_operator' ? 'FROM_END' : 'FROM_START', WHERE2: sliceNode.children[2].type === 'unary_operator' ? 'FROM_END' : 'FROM_START' };
	}
	return sliceBlock;
};

utils.prototypeBlocks['list_subscript'] = function (subscript, statementsNode) {

	const listsBlock = {
		type: 'lists_setIndex',
		fields: { MODE: 'SET', WHERE: 'FROM_START' },
		values: { LIST: null, TO: null },
		mutations: { at: 'true' },
		statementsNode: {TO: statementsNode},
		statement: null,
	};

	let subscriptIdentifier = null;
	let subscriptIndex = null;
	for (const child of subscript.children) {
		if (child.type === 'identifier') {
			if (subscriptIdentifier == null) {
				subscriptIdentifier = child;
				listsBlock.statementsNode.LIST = child;
			} else {
				// subscriptIndex = child;
				listsBlock.statementsNode.AT = child;
			}
		} else if (child.type === 'unary_operator') {
			
			subscriptIndex = child.children[1];
			if (subscriptIndex.text === "1") {
				listsBlock.fields.WHERE = 'LAST';
			} else {
				subscriptIndex.text = String(Number(subscriptIndex.text) - 1);
				listsBlock.values.AT = null;
				listsBlock.statementsNode.AT = subscriptIndex;
				listsBlock.fields.WHERE = 'FROM_END';
			}
		} else if (child.type === 'integer') {
			// subscriptIndex = child;
			if (child.text === '0') {
				listsBlock.fields.WHERE = 'FIRST';
				listsBlock.mutations.at = 'false';
				// listsBlock.statementsNode.TO = null;
			} else {
				listsBlock.statementsNode.AT = child;
				listsBlock.values.AT = null;

			}

		}
	}

	return listsBlock;
	
};


utils.prototypeBlocks['lists_getIndex'] = function (identifier, index) {
	const listsBlock = {
		type: 'lists_getIndex',
		fields: { MODE: 'GET', WHERE: 'FROM_START' },
		values: { VALUE: null, AT: null },
		mutations: { at: 'true' },
		statementsNode: { VALUE: null, AT: null },
		statement: null,
	};

	if (index.type === 'integer') {
		if (index.text === '0') {
			listsBlock.fields.WHERE = 'FIRST';
			listsBlock.mutations.at = 'false';
		} else {
			listsBlock.fields.WHERE = 'FROM_START';
			listsBlock.values.AT = null;
			listsBlock.statementsNode.AT = index;
		}
	} else if (index.type === 'unary_operator') {
		if (index.children[1].type === 'integer') {
			if (index.children[1].text === '1') {
				listsBlock.fields.WHERE = 'LAST';
				listsBlock.mutations.at = 'false';
			} else {
				listsBlock.fields.WHERE = 'FROM_END';
				listsBlock.values.AT = null;
				const textIndex = index.children[1];
				textIndex.text = (parseInt(textIndex.text) - 1).toString();
				listsBlock.statementsNode.AT = textIndex;
			}
		} else {
			listsBlock.fields.WHERE = 'FROM_END';
			listsBlock.values.AT = null;
			listsBlock.statementsNode.AT = index.children[1];
		}
			
	} else if (index.type === "identifier") {
		listsBlock.fields.WHERE = 'FROM_START';
		listsBlock.values.AT = null;
		listsBlock.values.VALUE = null;
		listsBlock.statementsNode.AT = index;
		listsBlock.statementsNode.VALUE = identifier;
	}
	listsBlock.statementsNode.VALUE = identifier;
	return listsBlock;
};

utils.prototypeBlocks['random.shuffle'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'lists_shuffle',
		fields: {},
		values: { LIST: null },
		mutations: null,
		statementsNode: { LIST: statementsNode[0] || {type:"list", text:"[]", children:[]} },
		statement: null,
	};
}