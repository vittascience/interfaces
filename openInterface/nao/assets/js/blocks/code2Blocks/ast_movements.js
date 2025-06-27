import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const createPoseBlock = (statementsNode, availablePoses, defaultPose, blockType) => {
	const block = {
		type: blockType,
		fields: { POSE: defaultPose },
		values: {},
		mutations: null,
		statementsNode: {},
		statement: null,
	};

	for (const child of statementsNode) {
		if (child.type === 'string') {
			const pose = utils.extractString(child).text;
			block.fields['POSE'] = availablePoses.includes(pose) ? pose : defaultPose;
			return block;
		}
	}
	return block;
};

utils.prototypeBlocks['motion_service.pose'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const poseAvailable = ["Yeah", "HandsOnHips", "ScanningHorizon", "Relaxed", "TPose"];
	return createPoseBlock(statementsNode, poseAvailable, "Yeah", 'movements_poseMode');
};



utils.prototypeBlocks['motion_service.moveTo'] = function (type, identifier, values, mutations, statementsNode, statement) {

	let x = null, xValue = null;
	let y = null, yValue = null;
	let theta = null, thetaValue = null;
	let direction = "forward";
	let turn = "left";

	for (const child of statementsNode) {
		if (x === null){
			if (child.type === 'unary_operator') {
				x = child.children[1];
				direction = "backward";
			} else {
				x = child;
			}
			xValue = x.text;
		} else if (y === null){
			if (child.type === 'unary_operator') {
				y = child.children[1];
			} else {
				y = child;
			}
			yValue = y.text;
		} else if (theta === null){
			if (child.type === 'unary_operator') {
				if (child.children[1].type === "identifier") {
					theta = child.children[1];
				} else {
					theta = { type: "integer", text: Math.round(parseFloat(child.children[1].text) * 180 / Math.PI).toString(), children: [] };
				}
				turn = "right";
			} else if (child.type === "identifier") {
				theta = child;
			} else {
				theta = { type: "integer", text: Math.round(parseFloat(child.text) * 180 / Math.PI).toString(), children: [] };
			}
			thetaValue = theta.text;
		}
	}

	if (xValue === "0" && yValue === "0" && thetaValue !== "0") {
		return {
			type: 'movements_rotate',
			fields: { DIRECTION: turn || 'left' },
			values: {
				ANGLE: null,
			},
			mutations: null,
			statementsNode: {
				ANGLE: theta || { type: 'integer', text: '90', children: [] },
			},
			statement: null,
		}
	} else {
		return {
			type: 'movements_moveTo',
			fields: { DIRECTION: direction || 'forward' },
			values: {
				DISTANCE: null,
			},
			mutations: null,
			statementsNode: {
				DISTANCE: x || { type: 'integer', text: '50', children: [] },
			},
			statement: null,
		}
	}
};

const createHandMotionBlock = (statementsNode, motion) => {
	const handsAvailable = ["LHand", "RHand"];
	const block = {
		type: 'movements_hand',
		fields: { DIRECTION: `${motion}Hand`, HAND: handsAvailable[0] },
		values: {},
		mutations: null,
		statementsNode: {},
		statement: null,
	};

	for (const child of statementsNode) {
		if (child.type === 'string') {
			const hand = utils.extractString(child).text;
			block.fields['HAND'] = handsAvailable.includes(hand) ? hand : handsAvailable[0];
			return block;
		}
	}
	return block;
};

['open', 'close'].forEach(motion => {
	utils.prototypeBlocks[`motion_service.${motion}Hand`] = function (type, identifier, values, mutations, statementsNode, statement) {
		return createHandMotionBlock(statementsNode, motion);
	};
});

const createPostureBlock = (statementsNode, availablePostures, defaultPosture, blockType) => {
	const block = {
		type: blockType,
		fields: { POSTURE: defaultPosture },
		values: { SPEED: null },
		mutations: null,
		statementsNode: { SPEED: { type: 'integer', text: '50', children: [] } },
		statement: null,
	};

	for (const child of statementsNode) {
		if (child.type === 'string') {
			const posture = utils.extractString(child).text;
			block.fields['POSTURE'] = availablePostures.includes(posture) ? posture : defaultPosture;
		} else if (child.type === 'integer') {
			block.statementsNode['SPEED'] = child;
			return block;
		}
	}
	return block;
};

utils.prototypeBlocks['motion_service.goToPosture'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const postureAvailable = ["Stand", "Sit"];
	return createPostureBlock(statementsNode, postureAvailable, "Stand", 'movements_goToPosture');
};

utils.prototypeBlocks['motion_service.setAngles'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const BlockValues = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	
	const fieldNames = [
		"HEAD_YAW",
		"HEAD_PITCH",
		"L_SHOULDER_PITCH",
		"L_SHOULDER_ROLL",
		"L_ELBOW_ROLL",
		"L_ELBOW_YAW",
		"L_WRIST_YAW",
		"L_HAND",
		"R_SHOULDER_PITCH",
		"R_SHOULDER_ROLL",
		"R_ELBOW_ROLL",
		"R_ELBOW_YAW",
		"R_WRIST_YAW",
		"R_HAND"
	];


	const block = {
		type: 'movements_setAnglesArmes',
		fields: null,
		values: {
			"HEAD_YAW": null,
			"HEAD_PITCH": null,
			"L_SHOULDER_PITCH": null,
			"L_SHOULDER_ROLL": null,
			"L_ELBOW_ROLL": null,
			"L_ELBOW_YAW": null,
			"L_WRIST_YAW": null,
			"L_HAND": null,
			"R_SHOULDER_PITCH": null,
			"R_SHOULDER_ROLL": null,
			"R_ELBOW_ROLL": null,
			"R_ELBOW_YAW": null,
			"R_WRIST_YAW": null,
			"R_HAND": null
		},
		mutations: null,
		statementsNode: {},
		statement: null,
	};

	for (let i = 0; i < BlockValues.length; i++) {
		block.statementsNode[fieldNames[i]] = { type: 'integer', text: '0', children: [] };
	}

	let bodyPart;
	let angleLength = 0;
	for (const child of statementsNode) {
		if (child.type === 'string') {
			bodyPart = utils.extractString(child).text;
		} else if (child.type === 'list') {
			child.children.forEach((arg, index) => {
				if (arg.type === 'integer' || arg.type === 'float' || arg.type === 'unary_operator' || arg.type === "identifier") {
					if (angleLength < 14) {
						if (arg.type === 'unary_operator') {
							arg.children.forEach((childUnary) => {
								if (childUnary.type === 'integer' || childUnary.type === 'float') {
									block.values[fieldNames[angleLength]] = null;
									const negativeValue = parseFloat(childUnary.text) * -1;
									block.statementsNode[fieldNames[angleLength]] = { type: 'integer', text: negativeValue.toString(), children: [] }
								}
							});
						} else {
							block.values[fieldNames[angleLength]] = null;
							block.statementsNode[fieldNames[angleLength]] = arg;
						}
						angleLength++;
					}
				}
			});
		}
	}

	return block;
}