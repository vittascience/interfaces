import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['moveBuddy'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const checkClass = utils.python2Blocks._classes[identifier];
	if (!checkClass) return null;

	const getStatementValue = (index, defaultValue) => {
		return statementsNode && statementsNode[index] ? statementsNode[index] : { type: 'integer', value: defaultValue };
	};

	let distance = getStatementValue(3, '0.1');
	let speed = getStatementValue(0, '10');

	let waiting = 'True';
	if (statementsNode && statementsNode[2]) {
		if (statementsNode[2].type === 'true' || statementsNode[2].type === 'false') {
			waiting = statementsNode[2].type === 'true' ? 'True' : 'False';
		}
	}

	distance.text = Number(distance.text * 100);

	console.log('distance', distance, 'speed', speed);

	if (statementsNode.length === 4) {
		return {
			type: 'actuators_moveBuddyWithDistance',
			fields: { LOCK: waiting },
			values: {
				DISTANCE: null,
				SPEED: null,
			},
			mutations: null,
			statementsNode: { DISTANCE: distance, SPEED: speed },
			statements: null,
		};
	} else if (statementsNode.length === 3) {
        return {
            type: 'actuators_moveBuddy',
            fields: { LOCK: waiting },
            values: {
                SPEED: null,
            },
            mutations: null,
            statementsNode: { SPEED: speed },
            statements: null,
        };
    }
};

utils.prototypeBlocks['rotateBuddy'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const checkClass = utils.python2Blocks._classes[identifier];
    if (!checkClass) return null;

    const getStatementValue = (index, defaultValue) => {
        return statementsNode && statementsNode[index] ? statementsNode[index] : { type: 'integer', value: defaultValue };
    };

    let angle = getStatementValue(0, '30');
    let speed = getStatementValue(3, '90');

    let waiting = 'True';
    if (statementsNode && statementsNode[2]) {
        if (statementsNode[2].type === 'true' || statementsNode[2].type === 'false') {
            waiting = statementsNode[2].type === 'true' ? 'True' : 'False';
        }
    }

    if (statementsNode.length === 4) {
        return {
            type: 'actuators_rotateBuddyWithAngle',
            fields: { LOCK: waiting },
            values: {
                ANGLE: null,
                SPEED: null,
            },
            mutations: null,
            statementsNode: { ANGLE: angle, SPEED: speed },
            statements: null,
        };
    } else {
        return {
            type: 'actuators_rotateBuddy',
            fields: { LOCK: waiting },
            values: {
                SPEED: null,
            },
            mutations: null,
            statementsNode: { SPEED: speed },
            statements: null,
        };
    }

};

utils.prototypeBlocks['emergencyStopMotors'] = function (type, identifier, values, mutations, statementsNode, statement) {
    return {
        type: 'actuators_emergencyStopMotors',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: null,
        statements: null,
    };
}
