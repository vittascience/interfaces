import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['define_lotibot'] = function(node, parent) {
	return "define_lotibot";
}

utils.prototypeBlocks['setLedColor'] = function(type, fields, values, mutations, statementsNode, statement, parent) {
	const Python2Blocks = window.Python2Blocks;
	
	let leftEye = null
	let rightEye = null

	let leftEyeRBG = [{type: "integer", text: "255"}, {type: "integer", text: "0"}, {type: "integer", text: "0"}]
	let rightEyeRBG = [{type: "integer", text: "255"}, {type: "integer", text: "0"}, {type: "integer", text: "0"}]

	if (statementsNode.length === 6){
		leftEyeRBG = statementsNode.slice(0, 3)
		rightEyeRBG = statementsNode.slice(3, 6)
	} else if (statementsNode.length > 2){
		leftEyeRBG = statementsNode.slice(0, 3)
	}

	const convertRGBLeft = utils.convertRBGtoHex(leftEyeRBG);
	const convertRGBRight = utils.convertRBGtoHex(rightEyeRBG);
	if (convertRGBLeft === null || convertRGBRight === null) {
		const leftStringified = JSON.stringify(leftEyeRBG)
		const rightStringified = JSON.stringify(rightEyeRBG)
		if (leftStringified === rightStringified){
			return {
				type: 'display_set_LEDs_RGB',
				fields: {},
				values: {
					R: null,
					G: null,
					B: null
				},
				mutations: null,
				statementsNode: { R: statementsNode[0], G: statementsNode[1], B: statementsNode[2] },
				statement: null,
			};
		} else {
			return {
				type: 'display_set_LED_RGB',
				fields: {},
				values: {
					L_R: null,
					L_G: null,
					L_B: null,
					R_R: null,
					R_G: null,
					R_B: null,
				},
				mutations: null,
				statementsNode: { L_R: leftEyeRBG[0], L_G: leftEyeRBG[1], L_B: leftEyeRBG[2], R_R: rightEyeRBG[0], R_G: rightEyeRBG[1], R_B: rightEyeRBG[2] },
				statement: null,
			};
		}
	} else {
		return {
			type: 'display_set_LED_palette',
			fields: {},
			values: {
				COLOUR_LEFT: null,
				COLOUR_RIGHT: null,
			},
			mutations: null,
			statementsNode: {COLOUR_LEFT: { type: "bypass", block: 'color_picker', text: convertRGBLeft }, COLOUR_RIGHT: { type: "bypass", block: 'color_picker', text: convertRGBRight }},
			statement: null,
		};
	}

};

utils.prototypeBlocks['setHeadlightValue'] = function(type, fields, values, mutations, statementsNode, statement, parent) {
	const Python2Blocks = window.Python2Blocks;
	
	let leftEye = {type: "integer", text: "125"}
	let rightEye = {type: "integer", text: "125"}

	let singleValue = true

	if (statementsNode.length > 1){
		if (statementsNode[0].text !== statementsNode[1].text){
			singleValue = false
		}
		leftEye = statementsNode[0]
		rightEye = statementsNode[1]
	} else if (statementsNode.length > 0){
		leftEye = statementsNode[0]
			
	}
	
	if (singleValue){
		return {
			type: 'display_set_headlights',
			fields: {},
			values: {
				PWM: null
			},
			mutations: null,
			statementsNode: { PWM: statementsNode[0] },
			statement: null,
		};
	} else {
		return {
			type: 'display_set_headlight',
			fields: {},
			values: {
				PWM_LEFT: null,
				PWM_RIGHT: null
			},
			mutations: null,
			statementsNode: { PWM_LEFT: leftEye, PWM_RIGHT: rightEye },
			statement: null,
		};
	}
};

utils.prototypeBlocks['color_picker'] = function (hexColor){
	return {
		type: 'colour_picker',
		fields: { COLOUR: hexColor },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
}