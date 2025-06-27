import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['motor_left_target'] = function (speedValue) {
	const checkMotorRight = utils._variables['motor_right_target'];
	const checkMotorLeft = utils._variables['motor_left_target'];
	let needBothMotors = false;
	let speed = null;
	if (checkMotorRight) {
		if (checkMotorRight.rowStart && checkMotorLeft.rowStart - 1 === checkMotorRight.rowStart && checkMotorLeft.colStart === checkMotorRight.colStart) {
			if (checkMotorRight.speedValue === speedValue.text) {
				needBothMotors = true;
			} else if (`-${speedValue.text}` === checkMotorRight.speedValue || speedValue.text === `-${checkMotorRight.speedValue}`) {
				needBothMotors = true;
			} else if (checkMotorRight.speedValue === '0' && speedValue.text !== '0' || speedValue.text === '0' && checkMotorRight.speedValue !== '0') {
                needBothMotors = true;
            }
		}
	}

	utils._variables['motor_left_target'].speedValue = speedValue.text;


	let dir = 'clockwise';
	if (speedValue.type === 'unary_operator') {
		dir = 'counter_clockwise';
		speed = speedValue.children[1];
	} else {
		speed = speedValue;
	}

	if (needBothMotors && !checkMotorRight.used) {
        checkMotorLeft.used = true;
		// retreive the last block id to store it in the blockToRemove array => it will be removed from the workspace during the reorganize prototype blocks function call
		const lastBlockId = utils.lastBlockId;
		utils.python2Blocks.blockToRemove.push(lastBlockId);

		const motorBlock = {
			type: 'robot_move',
			fields: null,
			values: null,
			mutation: null,
			statementsNode: null,
		};

		if (speedValue.text === '0' && checkMotorRight.speedValue === '0') {
			motorBlock.type = 'robot_stop';
		} else if (`-${speedValue.text}` === checkMotorRight.speedValue || speedValue.text === `-${checkMotorRight.speedValue}`) {
			motorBlock.type = 'robot_rotate_clock';
			motorBlock.fields = { DIRECTION: speedValue.type === 'unary_operator' ? 'COUNTER_CLOCKWISE' : 'CLOCKWISE' };
			motorBlock.values = { VALUE: null };
			motorBlock.statementsNode = { VALUE: speed };
			motorBlock.statements = null;
			motorBlock.mutation = null;
        } else if (checkMotorRight.speedValue === '0' && speedValue.text !== '0') {
            motorBlock.type = 'robot_rotate_forever';
            motorBlock.fields = { DIRECTION: dir === 'clockwise' ? 'FRONT_RIGHT' : 'BACK_RIGHT' };
            motorBlock.values = { VALUE: null };
            motorBlock.statementsNode = { VALUE: speed };
            motorBlock.statements = null;
            motorBlock.mutation = null;
        } else if (checkMotorRight.speedValue !== '0' && speedValue.text === '0') {
            motorBlock.type = 'robot_rotate_forever';
            motorBlock.fields = { DIRECTION: checkMotorRight.variable.type === "unary_operator" ? 'BACK_LEFT' :  'FRONT_LEFT'};
            motorBlock.values = { VALUE: null };
            motorBlock.statementsNode = { VALUE: checkMotorRight.variable.type === "unary_operator" ? checkMotorRight.variable.children[1] : checkMotorRight.variable };
            motorBlock.statements = null;
            motorBlock.mutation = null;
		} else {
			motorBlock.fields = { DIRECTION: dir === 'clockwise' ? 'FORWARD' : 'BACKWARD' };
			motorBlock.values = { VALUE: null };
			motorBlock.statementsNode = { VALUE: speed };
			motorBlock.statements = null;
			motorBlock.mutation = null;
		}

		return motorBlock;
	}

    if (speedValue.text === '0') {
        return {
            type: 'robot_stop_single_motor',
            fields: { MOTOR: 'LEFT' },
            values: null,
            mutation: null,
            statementsNode: null,
        }

    } else {
        return {
            type: 'robot_change_single_motor_speed',
            fields: { MOTOR: 'LEFT', DIR: dir },
            values: { VALUE: null },
            mutation: null,
            statementsNode: { VALUE: speed },
            statements: null,
        };
    }
};

utils.prototypeBlocks['motor_right_target'] = function (speedValue) {
	const checkMotorLeft = utils._variables['motor_left_target'];
	const checkMotorRight = utils._variables['motor_right_target'];

	let needBothMotors = false;

	let speed = null;
	if (checkMotorLeft) {
		if (checkMotorLeft.rowStart && checkMotorRight.rowStart - 1 === checkMotorLeft.rowStart && checkMotorRight.colStart === checkMotorLeft.colStart) {
			if (checkMotorLeft.speedValue === speedValue.text) {
				needBothMotors = true;
			} else if (`-${speedValue.text}` === checkMotorLeft.speedValue || speedValue.text === `-${checkMotorLeft.speedValue}`) {
				needBothMotors = true;
			} else if (checkMotorLeft.speedValue === '0' && speedValue.text !== '0' || speedValue.text === '0' && checkMotorLeft.speedValue !== '0') {
                needBothMotors = true;
            }
		}
	}
	utils._variables['motor_right_target'].speedValue = speedValue.text;

	let dir = 'clockwise';
	if (speedValue.type === 'unary_operator') {
		dir = 'counter_clockwise';
		speed = speedValue.children[1];
	} else {
		speed = speedValue;
	}

	if (needBothMotors && !checkMotorLeft.used) {
        checkMotorRight.used = true;
		// retreive the last block id to store it in the blockToRemove array => it will be removed from the workspace during the reorganize prototype blocks function call
        const lastBlockId = utils.lastBlockId;
		utils.python2Blocks.blockToRemove.push(lastBlockId);

		const motorBlock = {
			type: 'robot_move',
			fields: null,
			values: null,
			mutation: null,
			statementsNode: null,
		};

		if (speedValue.text === '0' && checkMotorLeft.speedValue === '0') {
			motorBlock.type = 'robot_stop';
		} else if (`-${speedValue.text}` === checkMotorLeft.speedValue || speedValue.text === `-${checkMotorLeft.speedValue}`) {
			motorBlock.type = 'robot_rotate_clock';
			motorBlock.fields = { DIRECTION: speedValue.type === 'unary_operator' ? 'CLOCKWISE' : 'COUNTER_CLOCKWISE' };
			motorBlock.values = { VALUE: null };
			motorBlock.statementsNode = { VALUE: speed };
			motorBlock.statements = null;
			motorBlock.mutation = null;
        } else if (checkMotorLeft.speedValue !== '0' && speedValue.text === '0') {
            motorBlock.type = 'robot_rotate_forever';
            motorBlock.fields = { DIRECTION: checkMotorLeft.variable.type === "unary_operator" ? 'BACK_RIGHT' :  'FRONT_RIGHT'};
            motorBlock.values = { VALUE: null };
            motorBlock.statementsNode = { VALUE: checkMotorLeft.variable.type === "unary_operator" ? checkMotorLeft.variable.children[1] : checkMotorLeft.variable };
            motorBlock.statements = null;
            motorBlock.mutation = null;
        } else if (checkMotorLeft.speedValue === '0' && speedValue.text !== '0') {
            motorBlock.type = 'robot_rotate_forever';
            motorBlock.fields = { DIRECTION: dir === 'clockwise' ? 'FRONT_LEFT' : 'BACK_LEFT' };
            motorBlock.values = { VALUE: null };
            motorBlock.statementsNode = { VALUE: speed };
            motorBlock.statements = null;
            motorBlock.mutation = null;
		} else {
			motorBlock.fields = { DIRECTION: dir === 'clockwise' ? 'FORWARD' : 'BACKWARD' };
			motorBlock.values = { VALUE: null };
			motorBlock.statementsNode = { VALUE: speed };
			motorBlock.statements = null;
			motorBlock.mutation = null;
		}

		return motorBlock;
	}

    if (speedValue.text === '0') {
        return {
            type: 'robot_stop_single_motor',
            fields: { MOTOR: 'RIGHT' },
            values: null,
            mutation: null,
            statementsNode: null,
        }

    } else {
        return {
            type: 'robot_change_single_motor_speed',
            fields: { MOTOR: 'RIGHT', DIR: dir },
            values: { VALUE: null },
            mutation: null,
            statementsNode: { VALUE: speed },
            statements: null,
        };
    }
};


utils.prototypeBlocks['nf_sound_system'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let sound = 0;

    if (statementsNode.length === 1) {
        if (statementsNode[0].type === 'integer') {
            sound = Number(statementsNode[0].text);
        }
    }

    return {
        type: 'sound_play_sound',
        fields: { SOUND: sound },
        values: null,
        mutation: null,
        statementsNode: null,
    };
};


utils.prototypeBlocks['nf_sound_freq'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let freq = null;
    let time = null;

    if (statementsNode[0]) {
        freq = statementsNode[0];
    }
    if (statementsNode[1]) {
        time = statementsNode[1];
    }

    if (freq === null) {
        freq = { type: 'integer', text: "440" };
    }

    if (time === null) {
        time = { type: 'integer', text: "500" };
    }

    return {
        type: 'sound_play_sound_freq',
        fields: null,
        values: { FREQ: null, DURATION: null },
        mutation: null,
        statementsNode: { FREQ: freq, DURATION: time },
        statements: null,
    };
};