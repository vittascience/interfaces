import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';



utils.prototypeBlocks['photon.go_forward'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	let speed =  {type: 'integer', text: '50'};
	let distance = {type: 'integer', text: '10'};


	if (statementsNode && statementsNode.length === 2){
		if (statementsNode[1].type === 'integer') {
			speed = statementsNode[1];
			if (Number(statementsNode[1].text) > 100) {
				statementsNode[1].text = '100';
			} 
		} else {
			speed = statementsNode[1];
		}
		distance = statementsNode[0];
	}

	return {
		type: 'actuators_go',
		fields: {DIRECTION: 'forward'},
        values: {
			DISTANCE: null,
			SPEED: null,
		},
        mutations: null,
        statementsNode: {DISTANCE: distance, SPEED: speed},
        statements: null,
	};

};

utils.prototypeBlocks['photon.go_forward_infinity'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	let speed =  {type: 'integer', text: '50'};

	if (statementsNode && statementsNode.length === 1){
		if (statementsNode[0].type === 'integer') {
			speed = statementsNode[0];
			if (Number(statementsNode[0].text) > 100) {
				statementsNode[0].text = '100';
			} 
		} else {
			speed = statementsNode[0];
		}
	}

	return {
		type: 'actuators_go_infinity',
		fields: {DIRECTION: 'forward'},
		values: {
			SPEED: null,
		},
		mutations: null,
		statementsNode: {SPEED: speed},
		statements: null,
	};
}

utils.prototypeBlocks['photon.go_backward'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	let speed =  {type: 'integer', text: '50'};
	let distance = {type: 'integer', text: '10'};

	if (statementsNode && statementsNode.length === 2){
		if (statementsNode[1].type === 'integer') {
			speed = statementsNode[1];
			if (Number(statementsNode[1].text) > 100) {
				statementsNode[1].text = '100';
			} 
		} else {
			speed = statementsNode[1];
		}
		distance = statementsNode[0];
	}

	return {
		type: 'actuators_go',
		fields: {DIRECTION: 'backward'},
		values: {
			DISTANCE: null,
			SPEED: null,
		},
		mutations: null,
		statementsNode: {DISTANCE: distance, SPEED: speed},
		statements: null,
	};
};

utils.prototypeBlocks['photon.go_backward_infinity'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	let speed =  {type: 'integer', text: '50'};

	if (statementsNode && statementsNode.length === 1){
		if (statementsNode[0].type === 'integer') {
			speed = statementsNode[0];
			if (Number(statementsNode[0].text) > 100) {
				statementsNode[0].text = '100';
			} 
		} else {
			speed = statementsNode[0];
		}
	}

	return {
		type: 'actuators_go_infinity',
		fields: {DIRECTION: 'backward'},
		values: {
			SPEED: null,
		},
		mutations: null,
		statementsNode: {SPEED: speed},
		statements: null,
	};
};

utils.prototypeBlocks['photon.rotate_left'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	let speed =  {type: 'integer', text: '50'};
	let angle = {type: 'integer', text: '90'};

	if (statementsNode && statementsNode.length === 2){
		if (statementsNode[1].type === 'integer') {
			speed = statementsNode[1];
			if (Number(statementsNode[1].text) > 100) {
				statementsNode[1].text = '100';
			} 
		} else {
			speed = statementsNode[1];
		}
		angle = statementsNode[0];
	}

	return {
		type: 'actuators_rotate',
		fields: {DIRECTION: 'left'},
		values: {
			ANGLE: null,
			SPEED: null,
		},
		mutations: null,
		statementsNode: {ANGLE: angle, SPEED: speed},
		statements: null,
	};
};

utils.prototypeBlocks['photon.rotate_left_infinity'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	let speed =  {type: 'integer', text: '50'};

	if (statementsNode && statementsNode.length === 1){
		if (statementsNode[0].type === 'integer') {
			speed = statementsNode[0];
			if (Number(statementsNode[0].text) > 100) {
				statementsNode[0].text = '100';
			} 
		} else {
			speed = statementsNode[0];
		}
	}

	return {
		type: 'actuators_rotate_infinity',
		fields: {DIRECTION: 'left'},
		values: {
			SPEED: null,
		},
		mutations: null,
		statementsNode: {SPEED: speed},
		statements: null,
	};
};

utils.prototypeBlocks['photon.rotate_right'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	let speed =  {type: 'integer', text: '50'};
	let angle = {type: 'integer', text: '90'};

	if (statementsNode && statementsNode.length === 2){
		if (statementsNode[1].type === 'integer') {
			speed = statementsNode[1];
			if (Number(statementsNode[1].text) > 100) {
				statementsNode[1].text = '100';
			} 
		} else {
			speed = statementsNode[1];
		}
		angle = statementsNode[0];
	}

	return {
		type: 'actuators_rotate',
		fields: {DIRECTION: 'right'},
		values: {
			ANGLE: null,
			SPEED: null,
		},
		mutations: null,
		statementsNode: {ANGLE: angle, SPEED: speed},
		statements: null,
	};
};

utils.prototypeBlocks['photon.rotate_right_infinity'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	let speed =  {type: 'integer', text: '50'};

	if (statementsNode && statementsNode.length === 1){
		if (statementsNode[0].type === 'integer') {
			speed = statementsNode[0];
			if (Number(statementsNode[0].text) > 100) {
				statementsNode[0].text = '100';
			} 
		} else {
			speed = statementsNode[0];
		}
	}

	return {
		type: 'actuators_rotate_infinity',
		fields: {DIRECTION: 'right'},
		values: {
			SPEED: null,
		},
		mutations: null,
		statementsNode: {SPEED: speed},
		statements: null,
	};
};

utils.prototypeBlocks['photon.stop'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	return {
		type: 'actuators_stop',
		fields: null,
		values: {},
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['photon.follow_line'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	return {
		type: 'actuators_follow_line',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};