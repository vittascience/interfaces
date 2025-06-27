import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const rgbLEDs = ['nf_leds_top', 'nf_leds_bottom_left', 'nf_leds_bottom_right'];
for (const led of rgbLEDs) {
	utils.prototypeBlocks[led] = function (type, identifier, values, mutations, statementsNode, statement) {
		let rgbInit = [];
		let rgb = [];
		if (statementsNode.length === 3) {
			for (const child of statementsNode) {
				if (child.type === 'integer') {
					rgbInit.push(child);
					rgb.push({ type: 'integer', text: (Number(child.text) * 255) / 32 > 255 ? 255 : (Number(child.text) * 255) / 32 });
				}
			}
		}

		const convertRGB = utils.convertRBGtoHex(rgb);
		if (convertRGB === null) {
			return {
				type: 'display_RGBLed_setColor',
				fields: { LED: led.replace('nf_leds_', '') },
				values: {
					RED: null,
					GREEN: null,
					BLUE: null,
				},
				mutations: null,
				statementsNode: { RED: rgbInit[0], GREEN: rgbInit[1], BLUE: rgbInit[2] },
			};
		} else {
			return {
				type: 'display_RGBLed_setColorPalette',
				fields: { LED: led.replace('nf_leds_', '') },
				values: {
					COLOR: null,
				},
				mutations: null,
				statementsNode: { COLOR: { type: 'bypass', block: 'color_picker', text: convertRGB } },
				statements: null,
			};
		}
	};

	
}

utils.prototypeBlocks['color_picker'] = function (hexColor) {
	return {
		type: 'colour_picker',
		fields: { COLOUR: hexColor },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};