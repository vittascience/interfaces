import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


utils.prototypeBlocks['neopixel.NeoPixel'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	// perform all the checks: statementsNode need to correspond to this => neopixel.NeoPixel(NEOPIXEL, 1, brightness=0.2, auto_write=False, pixel_order=neopixel.GRB)
	const Python2Blocks = window.Python2Blocks;
	const checkImport = Python2Blocks._imports.has('neopixel');
	if (!checkImport) {
		return null;
	}


};

utils.prototypeBlocks['fill'] = function (type, classVariable, values, mutations, statementsNode, statement, parent) {
	/**	
	 * @params {string} type : fill 
	 * @params {object} classVariable : variable name that store the class instance
	 * @params {array} values : null
	 * @params {array} mutations : null
	 * @params {array} statementsNode : rbg values in tuple
	 * @params {object} statement : null
	 * @params {object} parent : parent node
	 */

	const rgb = utils.getArgumentList(statementsNode[0].children);
	let turnedOff = false;
	const convertRGB = utils.convertRBGtoHex(rgb);
	if (convertRGB !== null) {
		if (convertRGB === "#000000"){
			turnedOff = true;
		};
	};
	if (turnedOff){
		return {
			type : 'display_controlBuiltInLEDOff',
			fields : {},
			values : {},
			mutations : null,
			statementsNode : null,
			statement : null
		}
	} else {
		return {
			type: 'display_controlBuiltInLED',
			fields: {},
			values: {
				COLOR: null,
			},
			mutations: null,
			statementsNode: { COLOR: { type: "bypass", block: 'color_picker', text: convertRGB !== null ? convertRGB : "#ff0000" } },
			statement: null,
		}
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

utils.prototypeBlocks['show'] = function (type, classVariable, values, mutations, statementsNode, statement, parent) {
	return 'display_controlBuiltInLED';
};
