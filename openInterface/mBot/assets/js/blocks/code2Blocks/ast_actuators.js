import utils from '/openInterface/interfaces/assets/js/code2blocks/cpp/utils/utils.js';

utils.prototypeBlocks['mBot_setMotorRight'] = function (type, fields, values, mutations, statementsNode, statement) {
	const variablesCPP = utils.cpp2Blocks._variables;
	let direction = null;
	let speed = null;
	let needBothMotors = false;

	if (statementsNode[0] && statementsNode[0].type === 'number_literal') {
		direction = statementsNode[0].text;
	} else {
		direction = 1;
	}

	if (statementsNode[1]) {
		speed = statementsNode[1];
	} else {
		speed = { type: 'number_literal', text: '50' };
	}

	const checkMotorLeft = variablesCPP['mbotMotorLeft'];
	if (checkMotorLeft) {
		if (checkMotorLeft.rowStart && type.start.row - 1 === checkMotorLeft.rowStart && type.start.column === checkMotorLeft.colStart) {
			if (checkMotorLeft.speed === speed.text && checkMotorLeft.dir === direction) {
				needBothMotors = true;
			}
		}
	}

	variablesCPP['mbotMotorRight'] = { dir: direction, speed: speed.text, colStart: type.start.column, rowStart: type.start.row };

	if (needBothMotors) {
		const lastBlockId = utils.lastBlockId;
		utils.cpp2Blocks.blockToRemove.push(lastBlockId);

		const motorBlock = {
			type: 'robots_setmBotGo',
			fields: null,
			values: null,
			mutation: null,
			statementsNode: null,
			statements: null,
		};

		if (direction === 1 && checkMotorLeft.dir === 1) {
			motorBlock.fields = { DIR: 1 };
			motorBlock.values = { SPEED: null };
			motorBlock.statementsNode = { SPEED: speed };
		} else if (direction === -1 && checkMotorLeft.dir === -1) {
			motorBlock.fields = { DIR: -1 };
			motorBlock.values = { SPEED: null };
			motorBlock.statementsNode = { SPEED: speed };
		} else {
			motorBlock.fields = { DIR: 1 };
			motorBlock.values = { SPEED: null };
			motorBlock.statementsNode = { SPEED: speed };
		}
		return motorBlock;
	}

	if (speed.text === '0') {
		return {
			type: 'robots_stopmBotMotors',
			fields: { MOTOR: 'right' },
			values: null,
			mutation: null,
			statementsNode: null,
		};
	} else {
		return {
			type: 'robots_controlmBotMotor',
			fields: { MOTOR: 'right', DIR: direction },
			values: { SPEED: null },
			mutation: null,
			statementsNode: { SPEED: speed },
		};
	}
};

utils.prototypeBlocks['mBot_setMotorLeft'] = function (type, fields, values, mutations, statementsNode, statement) {
	const variablesCPP = utils.cpp2Blocks._variables;
	let direction = null;
	let speed = null;
	let needBothMotors = false;

	if (statementsNode[0] && statementsNode[0].type === 'number_literal') {
		direction = statementsNode[0].text;
	} else {
		direction = 1;
	}

	if (statementsNode[1]) {
		speed = statementsNode[1];
	} else {
		speed = { type: 'number_literal', text: '50' };
	}

	const checkMotorRight = variablesCPP['mbotMotorRight'];
	if (checkMotorRight) {
		if (checkMotorRight.rowStart && type.start.row - 1 === checkMotorRight.rowStart && type.start.column === checkMotorRight.colStart) {
			if (checkMotorRight.speed === speed.text && checkMotorRight.dir === direction) {
				needBothMotors = true;
			}
		}
	}

	variablesCPP['mbotMotorLeft'] = { dir: direction, speed: speed.text, colStart: type.start.column, rowStart: type.start.row };

	if (needBothMotors) {
		const lastBlockId = utils.lastBlockId;
		utils.cpp2Blocks.blockToRemove.push(lastBlockId);

		const motorBlock = {
			type: 'robots_setmBotGo',
			fields: null,
			values: null,
			mutation: null,
			statementsNode: null,
			statements: null,
		};

		if (direction === 1 && checkMotorRight.dir === 1) {
			motorBlock.fields = { DIR: 1 };
			motorBlock.values = { SPEED: null };
			motorBlock.statementsNode = { SPEED: speed };
		} else if (direction === -1 && checkMotorRight.dir === -1) {
			motorBlock.fields = { DIR: -1 };
			motorBlock.values = { SPEED: null };
			motorBlock.statementsNode = { SPEED: speed };
		} else {
			motorBlock.fields = { DIR: 1 };
			motorBlock.values = { SPEED: null };
			motorBlock.statementsNode = { SPEED: speed };
		}
		return motorBlock;
	}

	if (speed.text === '0') {
		return {
			type: 'robots_stopmBotMotors',
			fields: { MOTOR: 'left' },
			values: null,
			mutation: null,
			statementsNode: null,
		};
	} else {
		return {
			type: 'robots_controlmBotMotor',
			fields: { MOTOR: 'left', DIR: direction },
			values: { SPEED: null },
			mutation: null,
			statementsNode: { SPEED: speed },
		};
	}
};


const ports_servo = 4;
const slots_servo = 2;

for (let i = 1; i <= ports_servo; i++) {
	for (let j = 1; j <= slots_servo; j++) {
		utils.prototypeBlocks[`servo_${i}_${j}.attach`] = function (type, fields, values, mutations, statementsNode, statement) {
			return 'null';
		}

		utils.prototypeBlocks[`servo_${i}_${j}.write`] = function (type, fields, values, mutations, statementsNode, statement) {
			let angle = null;
			if (statementsNode[0]){
				angle = statementsNode[0];
			}

			return {
				type: 'robots_makeBlock_setServoAngle',
				fields: { PORT: `PORT_${i}`, SLOT: j },
				values: { ANGLE: null },
				mutation: null,
				statementsNode: { ANGLE: angle || { type: 'number_literal', text: '90' } },
				statement: null,
			}
		}
	}
}

utils.prototypeBlocks['miniFan_run'] = function (type, fields, values, mutations, statementsNode, statement) {
	let port = null;
	let dir = null;

	if (statementsNode.length > 0) {
		for (const node of statementsNode) {
			if (node.type === 'identifier' && port === null) {
				port = node.text;
			}
			if (node.type === 'number_literal' && dir === null) {
				dir = node.text;
			} 
		}
	}
	return {
		type: 'robots_makeBlock_controlMiniFan',
		fields: { PORT: port || 'PORT_1', DIR: dir || 1 },
		values: null,
		mutation: null,
		statementsNode: null,
		statement: null,
	}
}