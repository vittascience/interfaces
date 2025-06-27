import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['math.pow'] = function (type, fields, values, mutations, statementsNode, statement) {

	if (statementsNode.length === 2 && statementsNode[0].text === '10') {
		if (statementsNode[0].type === 'integer' ) {

			return {
				type: 'math_single',
				fields: { OP: 'POW10' },
				values: { NUM: null },
				mutations: null,
				statementsNode: { NUM: statementsNode[1] },
				statement: null,
			}
		}

	} else {
		return {
			type: 'math_arithmetic',
			fields: { OP: 'POWER' },
			values: {
				A: null,
				B: null,
			},
			mutations: null,
			statementsNode: { A: statementsNode[0], B: statementsNode[1] },
			statement: null,
		};
	}
};

utils.prototypeBlocks['map'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_map',
		fields: {},
		values: {
			VALUE: null,
			MIN1: null,
			MAX1: null,
			MIN2: null,
			MAX2: null,
		},
		mutations: null,
		statementsNode: { VALUE: statementsNode[0], MIN1: statementsNode[1], MAX1: statementsNode[2], MIN2: statementsNode[3], MAX2: statementsNode[4] },
		statement: null,
	};
};

utils.prototypeBlocks['math.pi'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_constant',
		fields: { CONSTANT: 'PI' },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

utils.prototypeBlocks['math.e'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_constant',
		fields: { CONSTANT: 'E' },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

utils.prototypeBlocks['M_SQRT1_2'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_constant',
		fields: { CONSTANT: 'SQRT1_2' },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

utils.prototypeBlocks['math.sqrt'] = function (type, fields, values, mutations, statementsNode, statement) {
	for (const child of statementsNode) {
		if (child.type === 'integer' && child.text === '2') {
			return {
				type: 'math_constant',
				fields: { CONSTANT: 'SQRT2' },
				values: {},
				mutations: null,
				statementsNode: null,
				statement: null,
			};
		} else if (child.type === 'binary_operator' && (utils.rmSpaces(child.text) === "1.0/2" || utils.rmSpaces(child.text) === "1/2")) {
			return {
				type: 'math_constant',
				fields: { CONSTANT: 'SQRT1_2' },
				values: {},
				mutations: null,
				statementsNode: null,
				statement: null,
			};
		}
	}
	return {
		type: 'math_single',
		fields: { OP: 'ROOT' },
		values: { NUM: null },
		mutations: null,
		statementsNode: { NUM: statementsNode[0] },
		statement: null,
	};
};


utils.prototypeBlocks['math.fabs'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_single',
		fields: { OP: 'ABS' },
		values: { NUM: null },
		mutations: null,
		statementsNode: { NUM: statementsNode[0] },
		statement: null,
	};
};	

utils.prototypeBlocks['math.log'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_single',
		fields: { OP: 'LN' },
		values: { NUM: null },
		mutations: null,
		statementsNode: { NUM: statementsNode[0] },
		statement: null,
	};
};

utils.prototypeBlocks['math.log10'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_single',
		fields: { OP: 'LOG10' },
		values: { NUM: null },
		mutations: null,
		statementsNode: { NUM: statementsNode[0] },
		statement: null,
	};
};

utils.prototypeBlocks['math.exp'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_single',
		fields: { OP: 'EXP' },
		values: { NUM: null },
		mutations: null,
		statementsNode: { NUM: statementsNode[0] },
		statement: null,
	};
};

utils.prototypeBlocks['sqrt'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_single',
		fields: { OP: 'ROOT' },
		values: { NUM: null },
		mutations: null,
		statementsNode: { NUM: statementsNode[0] },
		statement: null,
	};
};

utils.prototypeBlocks['math.sin'] = function (type, fields, values, mutations, statementsNode, statement) {
	const checkType = ['integer', 'float', 'identifier', 'binary_operator', 'unary_operator', 'call', 'parenthesized_expression'];
	let angle = '45';
	
	return {
		type: 'math_trig_rad',
		fields: { OP: 'SIN' },
		values: { NUM: null },
		mutations: null,
		statementsNode: { NUM: statementsNode[0] || { type: 'integer', text: '45', children: [] } },
		statement: null,
	};

	
};

utils.prototypeBlocks['math.cos'] = function (type, fields, values, mutations, statementsNode, statement) {
	
	return {
		type: 'math_trig_rad',
		fields: { OP: 'COS' },
		values: { NUM: null },
		mutations: null,
		statementsNode: { NUM: statementsNode[0] || { type: 'integer', text: '45', children: [] } },
		statement: null,
	};

	
};

utils.prototypeBlocks['math.tan'] = function (type, fields, values, mutations, statementsNode, statement) {
	
	return {
		type: 'math_trig_rad',
		fields: { OP: 'TAN' },
		values: { NUM: null },
		mutations: null,
		statementsNode: { NUM: statementsNode[0] || { type: 'integer', text: '45', children: [] } },
		statement: null,
	};
};

utils.prototypeBlocks['math.asin'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_trig_rad',
		fields: { OP: 'ASIN' },
		values: { NUM: null },
		mutations: null,
		statementsNode: { NUM: statementsNode[0] || { type: 'integer', text: '0.5', children: [] } },
		statement: null,
	};
}

utils.prototypeBlocks['math.acos'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_trig_rad',
		fields: { OP: 'ACOS' },
		values: { NUM: null },
		mutations: null,
		statementsNode: { NUM: statementsNode[0] || { type: 'integer', text: '0.5', children: [] } },
		statement: null,
	};
}

utils.prototypeBlocks['math.atan'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_trig_rad',
		fields: { OP: 'ATAN' },
		values: { NUM: null },
		mutations: null,
		statementsNode: { NUM: statementsNode[0] || { type: 'integer', text: '0.5', children: [] } },
		statement: null,
	};
}


utils.prototypeBlocks['round'] = function (type, fields, values, mutations, statementsNode, statement) {

	if (statementsNode){
		if (statementsNode.length === 1) {
			return {
				type: 'math_round',
				fields: { OP: 'ROUND' },
				values: { NUM: null },
				mutations: null,
				statementsNode: { NUM: statementsNode[0] },
				statement: null,
			};
		} else if (statementsNode.length === 2) {
			return {
				type: 'math_round_ndigits',
				fields: {},
				values: { NUM: null, DIGITS: null },
				mutations: null,
				statementsNode: { NUM: statementsNode[0], DIGITS: statementsNode[1].type === 'integer' ? statementsNode[1] : { type: 'integer', text: '2', children: [] } },
				statement: null,
			};
		};

	};

};

utils.prototypeBlocks['math.ceil'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_round',
		fields: { OP: 'ROUNDUP' },
		values: { NUM: null },
		mutations: null,
		statementsNode: { NUM: statementsNode[0] },
		statement: null,
	};
};

utils.prototypeBlocks['math.floor'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_round',
		fields: { OP: 'ROUNDDOWN' },
		values: { NUM: null },
		mutations: null,
		statementsNode: { NUM: statementsNode[0] },
		statement: null,
	};
};

utils.prototypeBlocks['random.randint'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_random_int',
		fields: {},
		values: { FROM: null, TO: null },
		mutations: null,
		statementsNode: { FROM: statementsNode[0], TO: statementsNode[1] },
		statement: null,
	};
};

utils.prototypeBlocks['random.random'] = function (type, fields, values, mutations, statementsNode, statement) {

	return {
		type: 'math_random_float',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

utils.prototypeBlocks['atan2'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_atan2_rad',
		fields: null,
		values: { X: null, Y: null },
		mutations: null,
		statementsNode: { X: statementsNode[0], Y: statementsNode[1] },
		statement: null,
	};
};


utils.prototypeBlocks['math_isPrime'] = function (type, fields, values, mutations, statementsNode, statement) {
	const number = statementsNode[0] || { type: 'integer', text: '9' };

	return {
		type: 'math_number_property',
		fields: { PROPERTY: 'PRIME' },
		values: { NUMBER_TO_CHECK: null },
		mutations: null,
		statementsNode: { NUMBER_TO_CHECK: number },
		statement: null,
	};

}