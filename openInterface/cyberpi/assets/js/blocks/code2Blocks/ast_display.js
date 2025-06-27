import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['cyberpi.led.on'] = function (type, identifier, values, mutations, statementsNode, statement) {
	let r = null;
	let g = null;
	let b = null;
	let idLED = null;

	if (statementsNode && statementsNode.length > 0) {
		for (const child of statementsNode) {
			if (r === null) {
				r = child;
			} else if (g === null) {
				g = child;
			} else if (b === null) {
				b = child;
			} else if (child.type === 'keyword_argument') {
				const { key, value } = utils.extractKeyWordArgument(child);
				if (key.text && key.text === 'id') {
					idLED = value;
				}
			}
		}
	}

	if (r === null) {
		r = { type: 'integer', text: '255', children: [] };
	}
	if (g === null) {
		g = { type: 'integer', text: '0', children: [] };
	}
	if (b === null) {
		b = { type: 'integer', text: '0', children: [] };
	}

	const rgb = [r, g, b];

	const convertRGB = utils.convertRBGtoHex(rgb);

	if (idLED !== null) {
		if (convertRGB === null) {
			return {
				type: 'cyberpi_led_on_RGB',
				fields: {},
				values: {
					R: null,
					G: null,
					B: null,
					ID: null,
				},
				mutations: null,
				statementsNode: { R: rgb[0], G: rgb[1], B: rgb[2], ID: idLED },
				statements: null,
			};
		}
		return {
			type: 'cyberpi_led_on_palette',
			fields: {},
			values: {
				COLOR: null,
				ID: null,
			},
			mutations: null,
			statementsNode: { COLOR: { type: 'bypass', block: 'color_picker', text: convertRGB }, ID: idLED },
			statements: null,
		};
	}

	if (convertRGB === null) {
		return {
			type: 'cyberpi_led_on_all_RGB',
			fields: {},
			values: {
				R: null,
				G: null,
				B: null,
			},
			mutations: null,
			statementsNode: { R: rgb[0], G: rgb[1], B: rgb[2] },
			statements: null,
		};
	} else {
		return {
			type: 'cyberpi_led_on_all_palette',
			fields: {},
			values: {
				COLOR: null,
			},
			mutations: null,
			statementsNode: { COLOR: { type: 'bypass', block: 'color_picker', text: convertRGB } },
			statements: null,
		};
	}
};

utils.prototypeBlocks['cyberpi.led.play'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const animationArray = ['rainbow', 'spoondrift', 'meteor_blue', 'meteor_green', 'flash_red', 'flash_orange', 'firefly'];

	let animation = 'spoondrift';

	if (statementsNode && statementsNode.length > 0) {
		if (statementsNode[0].type === 'string') {
			const stringText = utils.extractString(statementsNode[0]);
			if (animationArray.includes(stringText.text)) {
				animation = stringText.text;
			}
		}
	}
	return {
		type: 'cyberpi_led_play',
		fields: { ANIMATION: animation },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['cyberpi.led.move'] = function (type, identifier, values, mutations, statementsNode, statement) {
	return {
		type: 'cyberpi_led_move',
		fields: {},
		values: { STEP: null },
		mutations: null,
		statementsNode: { STEP: statementsNode[0] || { type: 'integer', text: '1', children: [] } },
		statements: null,
	};
};

utils.prototypeBlocks['cyberpi.led.set_bri'] = function (type, identifier, values, mutations, statementsNode, statement) {
	return {
		type: 'cyberpi_led_set_brightness',
		fields: {},
		values: { BRIGHTNESS: null },
		mutations: null,
		statementsNode: { BRIGHTNESS: statementsNode[0] || { type: 'integer', text: '100', children: [] } },
		statements: null,
	};
};

utils.prototypeBlocks['cyberpi.led.get_bri'] = function (type, identifier, values, mutations, statementsNode, statement) {
	return {
		type: 'cyberpi_led_get_brightness',
		fields: {},
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['cyberpi.console.print'] = function (type, identifier, values, mutations, statementsNode, statement) {
	let text = null;
	if (statementsNode && statementsNode.length > 0) {
		text = statementsNode[0];
	}
	if (text === null) {
		text = { type: 'string', text: '', children: [] };
	}
	return {
		type: 'cyberpi_console_print',
		fields: {},
		values: { TEXT: null },
		mutations: { newline: { type: 'boolean', value: false } },
		statementsNode: { TEXT: text },
		statements: null,
	};
};

utils.prototypeBlocks['cyberpi.console.println'] = function (type, identifier, values, mutations, statementsNode, statement) {
	let text = null;
	let newline = 0;
	let mutation = false;
	const extractNewline = (node) => {
		if (node && node.type === 'string') {
			const stringText = utils.extractString(node);
			const newLine = stringText.text.split('\\n').length;
			if (newLine > 0) {
				return newLine;
			}
		}
		return 0;
	};
	if (statementsNode && statementsNode.length > 0) {
		if (statementsNode[0].type === 'binary_operator') {
			const binaryOperator = statementsNode[0].children;
			text = binaryOperator[0];

			const newlineNode = extractNewline(binaryOperator[2]);
			if (newlineNode > 0) {
				newline = newlineNode;
				mutation = true;
			}
		}
	}

	return {
		type: 'cyberpi_console_print',
		fields: { NEWLINES: newline },
		values: { TEXT: null },
		mutations: { newlines: mutation },
		statementsNode: { TEXT: text || { type: 'string', text: '', children: [] } },
		statements: null,
	};
};

utils.prototypeBlocks['cyberpi.console.set_font'] = function (type, identifier, values, mutations, statementsNode, statement) {
	let font = '12';
	const possibleFonts = ['12', '16', '24', '32'];
	if (statementsNode && statementsNode.length > 0 && statementsNode[0].type === 'integer') {
		font = statementsNode[0].text;
		if (possibleFonts.indexOf(font) === -1) {
			font = '12';
		}
	}
	return {
		type: 'cyberpi_console_set_font',
		fields: { FONTSIZE: font },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['cyberpi.display.show_label'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const defaultText = { type: 'string', text: 'Hello' };
	const defaultFontSize = '16';
	const defaultPosition = 'center';
	const defaultX = { type: 'integer', text: '0' };
	const defaultY = { type: 'integer', text: '0' };

	let textArg = defaultText;
	let fontSizeArg = defaultFontSize;
	let thirdArg = null;
	let fourthArg = null;

	if (statementsNode && statementsNode.length > 0) {
		if (statementsNode[0]) {
			textArg = statementsNode[0];
		}

		if (statementsNode[1] && statementsNode[1].type === 'integer') {
			fontSizeArg = statementsNode[1].text;
		}

		if (statementsNode[2]) {
			thirdArg = statementsNode[2];
		}

		if (statementsNode[3]) {
			fourthArg = statementsNode[3];
		}
	}

	if (!['16', '24', '32'].includes(fontSizeArg)) {
		fontSizeArg = '16';
	}

	const useXYMode = (statementsNode && statementsNode.length === 4) || (thirdArg && (thirdArg.type === 'integer' || thirdArg.type === 'float' || thirdArg.type === 'identifier'));

	if (useXYMode) {
		const xArg = thirdArg || defaultX;
		const yArg = fourthArg || defaultY;

		return {
			type: 'cyberpi_display_show_label_xy',
			fields: {
				FONTSIZE: fontSizeArg,
			},
			values: {
				TEXT: null,
				X: null,
				Y: null,
			},
			mutations: null,
			statementsNode: {
				TEXT: textArg,
				X: xArg,
				Y: yArg,
			},
			statement: null,
		};
	} else {
		let positionArg = defaultPosition;

		if (thirdArg && thirdArg.type === 'string') {
			positionArg = thirdArg.text.replace(/["']/g, '');
		}

		const validPositions = ['top_mid', 'top_left', 'top_right', 'center', 'mid_left', 'mid_right', 'bottom_mid', 'bottom_left', 'bottom_right'];
		if (!validPositions.includes(positionArg)) {
			positionArg = 'center';
		}

		return {
			type: 'cyberpi_display_show_label',
			fields: {
				FONTSIZE: fontSizeArg,
				POSITION: positionArg,
			},
			values: {
				TEXT: null,
			},
			mutations: null,
			statementsNode: {
				TEXT: textArg,
			},
			statement: null,
		};
	}
};

utils.prototypeBlocks['cyberpi.linechart.add'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const defaultData = { type: 'integer', text: '0' };
	const dataArg = statementsNode && statementsNode[0] ? statementsNode[0] : defaultData;

	return {
		type: 'cyberpi_linechart_add',
		fields: {},
		values: {
			DATA: null,
		},
		mutations: null,
		statementsNode: {
			DATA: dataArg,
		},
		statement: null,
	};
};

utils.prototypeBlocks['cyberpi.linechart.set_step'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const defaultStep = { type: 'integer', text: '0' };
	const stepArg = statementsNode && statementsNode[0] ? statementsNode[0] : defaultStep;

	return {
		type: 'cyberpi_linechart_set_step',
		fields: {},
		values: {
			STEP: null,
		},
		mutations: null,
		statementsNode: {
			STEP: stepArg,
		},
		statement: null,
	};
};

utils.prototypeBlocks['cyberpi.barchart.add'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const defaultData = { type: 'integer', text: '0' };
	const dataArg = statementsNode && statementsNode[0] ? statementsNode[0] : defaultData;

	return {
		type: 'cyberpi_barchart_add',
		fields: {},
		values: {
			DATA: null,
		},
		mutations: null,
		statementsNode: {
			DATA: dataArg,
		},
		statement: null,
	};
};

utils.prototypeBlocks['cyberpi.table.add'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const defaultX = { type: 'integer', text: '0' };
	const defaultY = { type: 'integer', text: '0' };
	const defaultData = { type: 'integer', text: '0' };

	const dataArg = statementsNode && statementsNode[0] ? statementsNode[0] : defaultData;
	const xArg = statementsNode && statementsNode[1] ? statementsNode[1] : defaultX;
	const yArg = statementsNode && statementsNode[2] ? statementsNode[2] : defaultY;

	return {
		type: 'cyberpi_table_add',
		fields: {},
		values: {
			DATA: null,
			X: null,
			Y: null,
		},
		mutations: null,
		statementsNode: {
			DATA: dataArg,
			X: xArg,
			Y: yArg,
		},
		statement: null,
	};
};

utils.prototypeBlocks['map'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const defaultValue = { type: 'integer', text: '0' };
	const defaultMin = { type: 'integer', text: '0' };
	const defaultMax = { type: 'integer', text: '100' };

	const valueArg = statementsNode && statementsNode[0] ? statementsNode[0] : defaultValue;
	const minArg = statementsNode && statementsNode[1] ? statementsNode[1] : defaultMin;
	const maxArg = statementsNode && statementsNode[2] ? statementsNode[2] : defaultMax;

	return {
		type: 'cyberpi_chart_map',
		fields: {},
		values: {
			VALUE: null,
			MIN: null,
			MAX: null,
		},
		mutations: null,
		statementsNode: {
			VALUE: valueArg,
			MIN: minArg,
			MAX: maxArg,
		},
		statement: null,
	};
};

utils.prototypeBlocks['cyberpi.display.set_brush'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const defaultR = { type: 'integer', text: '255' };
	const defaultG = { type: 'integer', text: '0' };
	const defaultB = { type: 'integer', text: '0' };

	if (statementsNode && statementsNode.length === 3) {
		const rArg = statementsNode[0] || defaultR;
		const gArg = statementsNode[1] || defaultG;
		const bArg = statementsNode[2] || defaultB;
		const rgb = [rArg, gArg, bArg];
		const convertRGB = utils.convertRBGtoHex(rgb, true);

		if (convertRGB !== null && utils.checkBlocklyColor(convertRGB)) {
			return {
				type: 'cyberpi_chart_set_brush_palette',
				fields: {},
				values: {
					COLOR: null,
				},
				mutations: null,
				statementsNode: {
					COLOR: { type: 'bypass', block: 'color_picker', text: convertRGB },
				},
				statement: null,
			};
		} else {
			return {
				type: 'cyberpi_chart_set_brush',
				fields: {},
				values: {
					R: null,
					G: null,
					B: null,
				},
				mutations: null,
				statementsNode: {
					R: rArg,
					G: gArg,
					B: bArg,
				},
				statement: null,
			};
		}
	} else {
		const rArg = statementsNode && statementsNode[0] ? statementsNode[0] : defaultR;
		const gArg = statementsNode && statementsNode[1] ? statementsNode[1] : defaultG;
		const bArg = statementsNode && statementsNode[2] ? statementsNode[2] : defaultB;

		return {
			type: 'cyberpi_chart_set_brush',
			fields: {},
			values: {
				R: null,
				G: null,
				B: null,
			},
			mutations: null,
			statementsNode: {
				R: rArg,
				G: gArg,
				B: bArg,
			},
			statement: null,
		};
	}
};

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
