import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const authorizedPorts = ['A', 'B'];

const getAttributeIdentifier = (node) => {
	let method = null;
	let subMethod = null;
	for (const child of node.children) {
		if (child.type === 'identifier' && method === null) {
			method = child.text;
		} else if (child.type === 'identifier' && method !== null) {
			subMethod = child.text;
		}
	}

	return { method, subMethod };
};

utils.prototypeBlocks['motor.run'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	let port = 'A';

	let speed = { type: 'integer', text: '50' };
	let direction = 'forward';

	if (statementsNode && statementsNode.length === 2) {
		if (statementsNode[0].type === 'attribute') {
			const { method, subMethod } = getAttributeIdentifier(statementsNode[0]);
			if (method === 'port' && authorizedPorts.includes(subMethod)) {
				port = subMethod;
			}
		}
		if (statementsNode[1].type === 'unary_operator') {
			speed = statementsNode[1].children[1];
			direction = 'backward';
		} else if (statementsNode[1].type === 'integer' || statementsNode[1].type === 'identifier') {
			speed = statementsNode[1];
		}
	}

	return {
		type: 'actuators_startMotorContinuous',
		fields: { PORT: port, DIR: direction },
		values: {
			SPEED: null,
		},
		mutations: null,
		statementsNode: { SPEED: speed },
		statements: null,
	};
};

utils.prototypeBlocks['motor.run_for_time'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	let port = 'A';

	let speed = { type: 'integer', text: '50' };
	let direction = 'forward';
	let time = { type: 'integer', text: '1' };

	if (statementsNode && statementsNode.length === 3) {
		if (statementsNode[0].type === 'attribute') {
			const { method, subMethod } = getAttributeIdentifier(statementsNode[0]);
			if (method === 'port' && authorizedPorts.includes(subMethod)) {
				port = subMethod;
			}
		}
		if (statementsNode[1].type === 'unary_operator') {
			speed = statementsNode[1].children[1];
			direction = 'backward';
		} else if (statementsNode[1].type === 'integer' || statementsNode[1].type === 'identifier') {
			speed = statementsNode[1];
		}
		if (statementsNode[2].type === 'integer') {
			time = statementsNode[2];
			time.text = Number(time.text) / 1000;
		} else {
			time = statementsNode[2];
		}
	}

	return {
		type: 'actuators_startMotorForTime',
		fields: { PORT: port, DIR: direction },
		values: {
			SPEED: null,
			TIME: null,
		},
		mutations: null,
		statementsNode: { SPEED: speed, TIME: time },
		statements: null,
	};
};

utils.prototypeBlocks['motor.run_to_relative_position'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	let port = 'A';

	let speed = { type: 'integer', text: '50' };
	let position = { type: 'integer', text: '0' };

	if (statementsNode && statementsNode.length === 3) {
		if (statementsNode[0].type === 'attribute') {
			const { method, subMethod } = getAttributeIdentifier(statementsNode[0]);
			if (method === 'port' && authorizedPorts.includes(subMethod)) {
				port = subMethod;
			}
		}

		if (statementsNode[1].type === 'integer') {
			position = statementsNode[1];
			if (Number(position.text) < 0) {
				position.text = 0;
			}
		} else if (statementsNode[1].type === 'identifier') {
			position = statementsNode[1];
		}

		if (statementsNode[2].type === 'integer') {
			speed = statementsNode[2];
			if (Number(speed.text) < 0) {
				speed.text = 0;
			}
		} else if (statementsNode[2].type === 'identifier') {
			speed = statementsNode[2];
		} 
	}

	return {
		type: 'actuators_moveMotorToPosition',
		fields: { PORT: port },
		values: {
			SPEED: null,
			ANGLE: null,
		},
		mutations: null,
		statementsNode: { SPEED: speed, ANGLE: position },
		statements: null,
	};
};

utils.prototypeBlocks['motor.run_to_absolute_position'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	let port = 'A';

	let speed = { type: 'integer', text: '50' };
	let position = { type: 'integer', text: '0' };
	let direction = 'forward';

	if (statementsNode && statementsNode.length === 3) {
		if (statementsNode[0].type === 'attribute') {
			const { method, subMethod } = getAttributeIdentifier(statementsNode[0]);
			if (method === 'port' && authorizedPorts.includes(subMethod)) {
				port = subMethod;
			}
		}

		if (statementsNode[1].type === 'integer') {
			position = statementsNode[1];
			if (Number(position.text) < 0) {
				position.text = 0;
			}
		} else if (statementsNode[1].type === 'identifier') {
			position = statementsNode[1];
		}

		if (statementsNode[2].type === 'integer') {
			speed = statementsNode[2];
			if (Number(speed.text) < 0) {
				speed.text = 0;
			}
		} else if (statementsNode[2].type === 'identifier') {
			speed = statementsNode[2];
		} else if (statementsNode[2].type === 'unary_operator') {
			speed = statementsNode[2].children[1];
			direction = 'backward';
			if (speed.type === 'integer') {
				speed.text = Number(speed.text);
			}
		}
	}


	return {
		type: 'actuators_moveMotorByDegrees',
		fields: { PORT: port, DIR: direction },
		values: {
			SPEED: null,
			ANGLE: null,
		},
		mutations: null,
		statementsNode: { SPEED: speed, ANGLE: position },
		statements: null,
	};
};

utils.prototypeBlocks['motor.stop'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    let port = 'A';

    if (statementsNode && statementsNode.length === 1) {
        if (statementsNode[0].type === 'attribute') {
            const { method, subMethod } = getAttributeIdentifier(statementsNode[0]);
            if (method === 'port' && authorizedPorts.includes(subMethod)) {
                port = subMethod;
            }
        }
    }

    return {
        type: 'actuators_stopMotor',
        fields: { PORT: port },
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
};