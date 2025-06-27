import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

// ==============================================
// CUTEBOT PRO ROBOT PROTOTYPES
// ==============================================

utils.prototypeBlocks['CBP'] = function (node, parent) {
	return 'null';
};

utils.prototypeBlocks['CutebotPro.readUltrasonic'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	// Check for unit parameter
	let unit = 'CM';
	if (statementsNode && statementsNode.length > 0) {
		for (const arg of statementsNode) {
			if (arg.type === 'keyword_argument' && arg.children) {
				const key = utils.extractKeyWordArgument(arg);
				if (key.key?.text === 'unit' && key.value?.text === "'inch'") {
					unit = 'INCH';
					break;
				}
			}
		}
	}

	return {
		type: 'robots_CutebotPro_getUltrasonicDistance',
		fields: { DATA: unit },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

// Cutebot Pro - Line State
utils.prototypeBlocks['CutebotPro.getLineTrackerStates'] = function (node, parent) {
	return {
		type: 'robots_CutebotPro_getLineState',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

// Cutebot Pro - Specific State Check
utils.prototypeBlocks['CutebotPro.isLineTrackerState'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode && statementsNode.length >= 1) {
		const state = statementsNode[0];
		return {
			type: 'robots_CutebotPro_isSpecificState',
			fields: { STATE: state?.text || '0x00' },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	}
	return null;
};

// Cutebot Pro - Line Offset
utils.prototypeBlocks['CutebotPro.getLineOffset'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	let unit = 'CM';
	if (statementsNode && statementsNode.length > 0) {
		for (const arg of statementsNode) {
			if (arg.type === 'keyword_argument' && arg.children) {
				const key = utils.extractKeyWordArgument(arg);
				if (key.key?.text === 'unit' && key.value?.text === "'inch'") {
					unit = 'INCH';
					break;
				}
			}
		}
	}

	return {
		type: 'robots_CutebotPro_getLineOffset',
		fields: { UNIT: unit },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

// Cutebot Pro - Sensor Above Line
utils.prototypeBlocks['CutebotPro.isSensorTrackingLine'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode && statementsNode.length >= 1) {
		const sensor = statementsNode[0];
		return {
			type: 'robots_CutebotPro_isSensorAboveLine',
			fields: { SENSOR: sensor?.text || '1' },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	}
	return null;
};

// Cutebot Pro - Grayscale Value
utils.prototypeBlocks['CutebotPro.getGrayscaleTrackingValue'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode && statementsNode.length >= 1) {
		const sensor = statementsNode[0];
		return {
			type: 'robots_getGrayscaleTrackingValue',
			fields: { SENSOR: sensor?.text || '1' },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	}
	return null;
};

// Cutebot Pro - Read Version
utils.prototypeBlocks['CutebotPro.readVersion'] = function (node, parent) {
	return {
		type: 'robots_CutebotPro_readVersion',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

// Cutebot Pro - Control Headlights (Palette)
utils.prototypeBlocks['CutebotPro.controlHeadlights'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode && statementsNode.length >= 2) {
		const led = statementsNode[0];
		const color = statementsNode[1];

		let ledField = 'BOTH';
		if (led?.text === 'CutebotPro.LED_LEFT') ledField = 'LEFT';
		else if (led?.text === 'CutebotPro.LED_RIGHT') ledField = 'RIGHT';

		if (color?.type === 'tuple' && color?.children) {
			const rgbValues = color.children.filter((child) => child.type !== ',' && child.type !== '(' && child.type !== ')');
			if (rgbValues.length >= 3) {
				const convertRGB = utils.convertRBGtoHex(rgbValues);
				if (convertRGB) {
					return {
						type: 'robots_CutebotPro_controlHeadlightsPalette',
						fields: { LED: ledField },
						values: { COLOR: null },
						mutations: null,
						statementsNode: { COLOR: { type: 'bypass', block: 'color_picker', text: convertRGB } },
						statement: null,
					};
				}

				return {
					type: 'robots_CutebotPro_controlHeadlights',
					fields: { LED: ledField },
					values: { R: null, G: null, B: null },
					mutations: null,
					statementsNode: { R: rgbValues[0], G: rgbValues[1], B: rgbValues[2] },
					statement: null,
				};
			}
		} 
	}
	return null;
};

// Cutebot Pro - Turn Off Headlights
utils.prototypeBlocks['CutebotPro.turnOffHeadlights'] = function (node, parent) {
	return {
		type: 'robots_CutebotPro_switchOffHeadlights',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

// Cutebot Pro - Neopixel Control
utils.prototypeBlocks['CutebotPro.setNeopixelColor'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode && statementsNode.length >= 2) {
		const led = statementsNode[0];
		const color = statementsNode[1];

		let ledField = 'BOTH';
		if (led?.text === 'CutebotPro.LED_LEFT') ledField = 'LEFT';
		else if (led?.text === 'CutebotPro.LED_RIGHT') ledField = 'RIGHT';

		if (color?.type === 'tuple' && color?.children) {
			const rgbValues = color.children.filter((child) => child.type !== ',' && child.type !== '(' && child.type !== ')');
			if (rgbValues.length >= 3) {
				return {
					type: 'robots_CutebotPro_setNeopixel',
					fields: { LED: ledField },
					values: { R: null, G: null, B: null },
					mutations: null,
					statementsNode: { R: rgbValues[0], G: rgbValues[1], B: rgbValues[2] },
					statement: null,
				};
			}
		} else {
			return {
				type: 'robots_CutebotPro_setNeopixelPalette',
				fields: { LED: ledField },
				values: { COLOR: null },
				mutations: null,
				statementsNode: { COLOR: color },
				statement: null,
			};
		}
	}
	return null;
};

// Cutebot Pro - Motor Control
utils.prototypeBlocks['CutebotPro.pwmCruiseControlMotor'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode && statementsNode.length >= 2) {
		const motor = statementsNode[0];
		const speed = statementsNode[1];

		let motorField = 'BOTH';
		if (motor?.text === 'CutebotPro.MOTOR_LEFT') motorField = 'LEFT';
		else if (motor?.text === 'CutebotPro.MOTOR_RIGHT') motorField = 'RIGHT';

		const isNegative = speed?.type === 'unary_operator' && speed?.children?.[0]?.text === '-';

		return {
			type: 'robots_CutebotPro_controlMotors',
			fields: {
				MOTOR: motorField,
				DIR: isNegative ? 'ANTICLOCKWISE' : 'CLOCKWISE',
			},
			values: { SPEED: null },
			mutations: null,
			statementsNode: { SPEED: isNegative ? speed.children[1] : speed },
			statement: null,
		};
	}
	return null;
};

// Cutebot Pro - Stop
utils.prototypeBlocks['CutebotPro.stopImmediately'] = function (node, parent) {
	return {
		type: 'robots_CutebotPro_stop',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

// Cutebot Pro - Cruise Control
utils.prototypeBlocks['CutebotPro.cruiseControl'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode && statementsNode.length >= 2) {
		const leftSpeed = statementsNode[0];
		const rightSpeed = statementsNode[1];

		// Check for unit parameter
		let unit = 'CM_S';
		if (statementsNode.length > 2) {
			for (const arg of statementsNode.slice(2)) {
				if (arg.type === 'keyword_argument' && arg.children) {
					const key = utils.extractKeyWordArgument(arg);
					if (key.key?.text === 'unit' && key.value?.text === 'CutebotPro.INCH_PER_S') {
						unit = 'INCH_S';
						break;
					}
				}
			}
		}

		if (leftSpeed?.text === rightSpeed?.text) {
			const speed = leftSpeed;
			const isNegative = speed?.type === 'unary_operator' && speed?.children?.[0]?.text === '-';

			return {
				type: 'robots_CutebotPro_runWithSpeed',
				fields: {
					DIR: isNegative ? 'BACKWARD' : 'FORWARD',
					UNIT: unit,
				},
				values: { SPEED: null },
				mutations: null,
				statementsNode: { SPEED: isNegative ? speed.children[1] : speed },
				statement: null,
			};
		} else {
			return {
				type: 'robots_CutebotPro_setMotorsSpeed',
				fields: { UNIT: unit },
				values: { SPEED_L: null, SPEED_R: null },
				mutations: null,
				statementsNode: { SPEED_L: leftSpeed, SPEED_R: rightSpeed },
				statement: null,
			};
		}
	}
	return null;
};

// Cutebot Pro - Get Angular Distance (Degrees)
utils.prototypeBlocks['CutebotPro.readAngularDistance'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode && statementsNode.length >= 1) {
		const motor = statementsNode[0];
		let motorField = 'LEFT';
		if (motor?.text === 'CutebotPro.MOTOR_RIGHT') motorField = 'RIGHT';

		return {
			type: 'robots_CutebotPro_getAngularDistance',
			fields: {
				DATA: 'DEGRESS', // Note: there's a typo in the original block definition
				MOTOR: motorField,
			},
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	}
	return null;
};

utils.prototypeBlocks['CutebotPro.readSpeed'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode && statementsNode.length >= 1) {
		const motor = statementsNode[0];
		let unit = 'CM_S';

		// Check for unit parameter
		if (statementsNode.length > 1) {
			for (const arg of statementsNode.slice(1)) {
				if (arg.type === 'keyword_argument' && arg.children) {
					const key = utils.extractKeyWordArgument(arg);
					if (key.key?.text === 'unit' && key.value?.text === 'CutebotPro.INCH_PER_SEC') {
						unit = 'INCH_S';
						break;
					}
				}
			}
		}

		let motorField = 'LEFT';
		if (motor?.text === 'CutebotPro.MOTOR_RIGHT') motorField = 'RIGHT';

		return {
			type: 'robots_CutebotPro_getMotorSpeed',
			fields: {
				MOTOR: motorField,
				UNIT: unit,
			},
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	}
	return null;
};

utils.prototypeBlocks['CutebotPro.clearWheelTurn'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode && statementsNode.length >= 1) {
		const motor = statementsNode[0];
		let motorField = 'BOTH';
		if (motor?.text === 'CutebotPro.MOTOR_LEFT') motorField = 'LEFT';
		else if (motor?.text === 'CutebotPro.MOTOR_RIGHT') motorField = 'RIGHT';

		return {
			type: 'robots_CutebotPro_initializeAngularDistance',
			fields: { MOTOR: motorField },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	}
	return null;
};

// Cutebot Pro - Servo Control
utils.prototypeBlocks['CutebotPro.controlServo'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode && statementsNode.length >= 2) {
		const servo = statementsNode[0];
		const angle = statementsNode[1];

		return {
			type: 'robots_CutebotPro_setServoAngle',
			fields: { SERVO: servo?.text || '1' },
			values: { ANGLE: null },
			mutations: null,
			statementsNode: { ANGLE: angle },
			statement: null,
		};
	}
	return null;
};

// Cutebot Pro - Continuous Servo Control
utils.prototypeBlocks['CutebotPro.controlContinuousServo'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode && statementsNode.length >= 2) {
		const servo = statementsNode[0];
		const speed = statementsNode[1];

		const isNegative = speed?.type === 'unary_operator' && speed?.children?.[0]?.text === '-';

		return {
			type: 'robots_CutebotPro_setServoSpeed',
			fields: {
				SERVO: servo?.text || '1',
				DIR: isNegative ? 'ANTICLOCKWISE' : 'CLOCKWISE',
			},
			values: { SPEED: null },
			mutations: null,
			statementsNode: { SPEED: isNegative ? speed.children[1] : speed },
			statement: null,
		};
	}
	return null;
};

// Cutebot Pro - Extended Motor Control
utils.prototypeBlocks['CutebotPro.controlExtendedMotor'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode && statementsNode.length >= 1) {
		const speed = statementsNode[0];
		const isNegative = speed?.type === 'unary_operator' && speed?.children?.[0]?.text === '-';

		return {
			type: 'robots_CutebotPro_setExtendedMotorSpeed',
			fields: { DIR: isNegative ? 'ANTICLOCKWISE' : 'CLOCKWISE' },
			values: { SPEED: null },
			mutations: null,
			statementsNode: { SPEED: isNegative ? speed.children[1] : speed },
			statement: null,
		};
	}
	return null;
};

// Cutebot Pro - Stop Extended Motor
utils.prototypeBlocks['CutebotPro.stopExtendedMotor'] = function (node, parent) {
	return {
		type: 'robots_CutebotPro_stopExtendedMotor',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};
