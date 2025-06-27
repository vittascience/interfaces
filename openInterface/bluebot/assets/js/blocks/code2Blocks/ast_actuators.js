import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['define_bluebot'] = function (node, parent) {
	return 'define_bluebot';
};

utils.prototypeBlocks['moveForward'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	return {
		type: 'actuators_move_forward',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

utils.prototypeBlocks['moveBackward'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	return {
		type: 'actuators_move_backward',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

utils.prototypeBlocks['turnLeft'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	let angle = '45';
	const authorizedAngles = ['45', '90', '135'];
    console.log(authorizedAngles.includes(utils.extractString(statementsNode[0]).text));
	if (statementsNode.lenght === 0 || statementsNode[0].type !== 'string' || !authorizedAngles.includes(utils.extractString(statementsNode[0]).text)) {
		return {
			type: 'actuators_turnLeft',
			fields: {ANGLE: '45'},
			values: null,
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	}

	angle = utils.extractString(statementsNode[0]).text;

	return {
		type: 'actuators_turnLeft',
		fields: {ANGLE: angle},
		values: null,
		mutations: null,
		statementsNode: null,
		statement: null,
	}
};

utils.prototypeBlocks['turnRight'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    let angle = '45';
    const authorizedAngles = ['45', '90', '135'];
    if (statementsNode.lenght === 0 || statementsNode[0].type !== 'string' || !authorizedAngles.includes(utils.extractString(statementsNode[0]).text)) {
        return {
			type: 'actuators_turnRight',
			fields: {ANGLE: '45'},
			values: null,
			mutations: null,
			statementsNode: null,
			statement: null,
		};
    }

    angle = utils.extractString(statementsNode[0]).text;

    return {
		type: 'actuators_turnRight',
		fields: {ANGLE: angle},
		values: null,
		mutations: null,
		statementsNode: null,
		statement: null,
	}
};