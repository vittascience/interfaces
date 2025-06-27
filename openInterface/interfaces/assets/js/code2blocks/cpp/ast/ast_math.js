import utils from '/openInterface/interfaces/assets/js/code2blocks/cpp/utils/utils.js';

utils.prototypeBlocks['Math.pow'] = function (type, fields, values, mutations, statementsNode, statement) {
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

utils.prototypeBlocks['M_PI'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_constant',
		fields: { CONSTANT: 'PI' },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

utils.prototypeBlocks['M_E'] = function (type, fields, values, mutations, statementsNode, statement) {
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

utils.prototypeBlocks['M_SQRT2'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_constant',
		fields: { CONSTANT: 'SQRT2' },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

utils.prototypeBlocks['INFINITY'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'math_constant',
		fields: { CONSTANT: 'INFINITY' },
		values: {},
		mutations: null,
		statementsNode: null,
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

}

utils.prototypeBlocks['sin'] = function (type, fields, values, mutations, statementsNode, statement) {
	let angle = '45';
	for (const child of statementsNode[0].children) {
		if (child.type === 'binary_expression') {
			angle = {type: "number_literal", text: child.children[0].text.replace(".", '')};
		}
	}

	return {
		type: 'math_trig',
		fields: { OP: 'SIN' },
		values: { NUM: null },
		mutations: null,
		statementsNode: { NUM: angle },
		statement: null,
	};
};

utils.prototypeBlocks['cos'] = function (type, fields, values, mutations, statementsNode, statement) {
    console.log('cos', statementsNode[0].children);
    let angle = '45';
    for (const child of statementsNode[0].children) {
        if (child.type === 'binary_expression') {
            angle = {type: "number_literal", text: child.children[0].text.replace(".", '')};
        }
    }

    return {
        type: 'math_trig',
        fields: { OP: 'COS' },
        values: { NUM: null },
        mutations: null,
        statementsNode: { NUM: angle },
        statement: null,
    };
};

utils.prototypeBlocks['tan'] = function (type, fields, values, mutations, statementsNode, statement) {
    console.log('tan', statementsNode[0].children);
    let angle = '45';
    for (const child of statementsNode[0].children) {
        if (child.type === 'binary_expression') {
            angle = {type: "number_literal", text: child.children[0].text.replace(".", '')};
        }
    }

    return {
        type: 'math_trig',
        fields: { OP: 'TAN' },
        values: { NUM: null },
        mutations: null,
        statementsNode: { NUM: angle },
        statement: null,
    };
};

utils.prototypeBlocks['round'] = function (type, fields, values, mutations, statementsNode, statement) {
    console.log('round', statementsNode);
    return {
        type: 'math_round',
        fields: { OP: 'ROUND' },
        values: { NUM: null },
        mutations: null,
        statementsNode: { NUM: statementsNode[0] },
        statement: null,
    };
};

utils.prototypeBlocks['ceil'] = function (type, fields, values, mutations, statementsNode, statement) {
    console.log('ceil', statementsNode);
    return {
        type: 'math_round',
        fields: { OP: 'ROUNDUP' },
        values: { NUM: null },
        mutations: null,
        statementsNode: { NUM: statementsNode[0] },
        statement: null,
    };
};

utils.prototypeBlocks['floor'] = function (type, fields, values, mutations, statementsNode, statement) {
    console.log('floor', statementsNode);
    return {
        type: 'math_round',
        fields: { OP: 'ROUNDDOWN' },
        values: { NUM: null },
        mutations: null,
        statementsNode: { NUM: statementsNode[0] },
        statement: null,
    };
};

utils.prototypeBlocks['random'] = function (type, fields, values, mutations, statementsNode, statement) {
    console.log('random', statementsNode);
    return {
        type: 'math_random_int',
        fields: {},
        values: { FROM: null, TO: null },
        mutations: null,
        statementsNode: { FROM: statementsNode[0], TO: statementsNode[1] },
        statement: null,
    };
};

utils.prototypeBlocks['atan2'] = function (type, fields, values, mutations, statementsNode, statement) {
    console.log('atan2', statementsNode);
    return {
        type: 'math_atan2',
        fields: null,
        values: { X: null, Y: null },
        mutations: null,
        statementsNode: { X: statementsNode[0], Y: statementsNode[1] },
        statement: null,
    };
};