import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['define_primastem'] = function (node, parent) {
	return 'define_primastem';
};

utils.prototypeBlocks['moveForward'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	// "primastem.moveForward(distance)": block with a distance
	if (statementsNode?.length === 1) {
		return {
			type: 'actuators_move_forward_distance',
			fields: null,
			values: { DISTANCE: null },
			mutations: null,
			statementsNode: { DISTANCE: statementsNode[0] },
			statement: null,
		};
	}
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
	// "primastem.moveBackward(distance)": block with a distance
	if (statementsNode?.length === 1) {
		return {
			type: 'actuators_move_backward_distance',
			fields: null,
			values: { DISTANCE: null },
			mutations: null,
			statementsNode: { DISTANCE: statementsNode[0] },
			statement: null,
		};
	}
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
	let angleNode = { type: "integer", text: angle };

	if (statementsNode.length > 0) {
		if (statementsNode[0].type === "string") {
			const txt = utils.extractString(statementsNode[0]).text;
			angleNode = { type: "integer", text: authorizedAngles.includes(txt) ? txt : angle };
		} else {
			angleNode = statementsNode[0];
		}
	}

	return {
		type: 'actuators_turnLeft',
		fields: null,
		values: { ANGLE: null },
		mutations: null,
		statementsNode: { ANGLE: angleNode },
		statement: null,
	};
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