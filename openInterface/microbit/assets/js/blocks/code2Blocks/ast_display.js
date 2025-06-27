import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const COLOURS_FOR_LED_MATRIX = {
	0: '#ff0000',
	1: '#ff0600',
	2: '#ff0c00',
	3: '#ff1200',
	4: '#ff1800',
	5: '#ff1e00',
	6: '#ff2400',
	7: '#ff2a00',
	8: '#ff3000',
	9: '#ff3600',
	10: '#ff3c00',
	11: '#ff4200',
	12: '#ff4800',
	13: '#ff4e00',
	14: '#ff5400',
	15: '#ff5a00',
	16: '#ff6000',
	17: '#ff6600',
	18: '#ff6c00',
	19: '#ff7200',
	20: '#ff7800',
	21: '#ff7e00',
	22: '#ff8400',
	23: '#ff8a00',
	24: '#ff9000',
	25: '#ff9600',
	26: '#ff9c00',
	27: '#ffa200',
	28: '#ffa800',
	29: '#ffae00',
	30: '#ffb400',
	31: '#ffba00',
	32: '#ffc000',
	33: '#ffc600',
	34: '#ffcc00',
	35: '#ffd200',
	36: '#ffd800',
	37: '#ffde00',
	38: '#ffe400',
	39: '#ffea00',
	40: '#fff000',
	41: '#fff600',
	42: '#ffff00',
	43: '#f9ff00',
	44: '#f3ff00',
	45: '#edff00',
	46: '#e7ff00',
	47: '#e1ff00',
	48: '#dbff00',
	49: '#d5ff00',
	50: '#cfff00',
	51: '#c9ff00',
	52: '#c3ff00',
	53: '#bdff00',
	54: '#b7ff00',
	55: '#b1ff00',
	56: '#abff00',
	57: '#a5ff00',
	58: '#9fff00',
	59: '#99ff00',
	60: '#93ff00',
	61: '#8dff00',
	62: '#87ff00',
	63: '#81ff00',
	64: '#7bff00',
	65: '#75ff00',
	66: '#6fff00',
	67: '#69ff00',
	68: '#63ff00',
	69: '#5dff00',
	70: '#57ff00',
	71: '#51ff00',
	72: '#4bff00',
	73: '#45ff00',
	74: '#3fff00',
	75: '#39ff00',
	76: '#33ff00',
	77: '#2dff00',
	78: '#27ff00',
	79: '#21ff00',
	80: '#1bff00',
	81: '#15ff00',
	82: '#0fff00',
	83: '#09ff00',
	84: '#03ff00',
	85: '#00ff00',
	86: '#00ff06',
	87: '#00ff0c',
	88: '#00ff12',
	89: '#00ff18',
	90: '#00ff1e',
	91: '#00ff24',
	92: '#00ff2a',
	93: '#00ff30',
	94: '#00ff36',
	95: '#00ff3c',
	96: '#00ff42',
	97: '#00ff48',
	98: '#00ff4e',
	99: '#00ff54',
	100: '#00ff5a',
	101: '#00ff60',
	102: '#00ff66',
	103: '#00ff6c',
	104: '#00ff72',
	105: '#00ff78',
	106: '#00ff7e',
	107: '#00ff84',
	108: '#00ff8a',
	109: '#00ff90',
	110: '#00ff96',
	111: '#00ff9c',
	112: '#00ffa2',
	113: '#00ffa8',
	114: '#00ffae',
	115: '#00ffb4',
	116: '#00ffba',
	117: '#00ffc0',
	118: '#00ffc6',
	119: '#00ffcc',
	120: '#00ffd2',
	121: '#00ffd8',
	122: '#00ffde',
	123: '#00ffe4',
	124: '#00ffea',
	125: '#00fff0',
	126: '#00fff6',
	127: '#00fffc',
	128: '#00ffff',
	129: '#00f9ff',
	130: '#00f3ff',
	131: '#00edff',
	132: '#00e7ff',
	133: '#00e1ff',
	134: '#00dbff',
	135: '#00d5ff',
	136: '#00cfff',
	137: '#00c9ff',
	138: '#00c3ff',
	139: '#00bdff',
	140: '#00b7ff',
	141: '#00b1ff',
	142: '#00abff',
	143: '#00a5ff',
	144: '#009fff',
	145: '#0099ff',
	146: '#0093ff',
	147: '#008dff',
	148: '#0087ff',
	149: '#0081ff',
	150: '#007bff',
	151: '#0075ff',
	152: '#006fff',
	153: '#0069ff',
	154: '#0063ff',
	155: '#005dff',
	156: '#0057ff',
	157: '#0051ff',
	158: '#004bff',
	159: '#0045ff',
	160: '#003fff',
	161: '#0039ff',
	162: '#0033ff',
	163: '#002dff',
	164: '#0027ff',
	165: '#0021ff',
	166: '#001bff',
	167: '#0015ff',
	168: '#000fff',
	169: '#0009ff',
	170: '#0000ff',
	171: '#0600ff',
	172: '#0c00ff',
	173: '#1200ff',
	174: '#1800ff',
	175: '#1e00ff',
	176: '#2400ff',
	177: '#2a00ff',
	178: '#3000ff',
	179: '#3600ff',
	180: '#3c00ff',
	181: '#4200ff',
	182: '#4800ff',
	183: '#4e00ff',
	184: '#5400ff',
	185: '#5a00ff',
	186: '#6000ff',
	187: '#6600ff',
	188: '#6c00ff',
	189: '#7200ff',
	190: '#7800ff',
	191: '#7e00ff',
	192: '#8400ff',
	193: '#8a00ff',
	194: '#9000ff',
	195: '#9600ff',
	196: '#9c00ff',
	197: '#a200ff',
	198: '#a800ff',
	199: '#ae00ff',
	200: '#b400ff',
	201: '#ba00ff',
	202: '#c000ff',
	203: '#c600ff',
	204: '#cc00ff',
	205: '#d200ff',
	206: '#d800ff',
	207: '#de00ff',
	208: '#e400ff',
	209: '#ea00ff',
	210: '#f000ff',
	211: '#f600ff',
	212: '#ff00ff',
	213: '#ff00f9',
	214: '#ff00f3',
	215: '#ff00ed',
	216: '#ff00e7',
	217: '#ff00e1',
	218: '#ff00db',
	219: '#ff00d5',
	220: '#ff00cf',
	221: '#ff00c9',
	222: '#ff00c3',
	223: '#ff00bd',
	224: '#ff00b7',
	225: '#ff00b1',
	226: '#ff00ab',
	227: '#ff00a5',
	228: '#ff009f',
	229: '#ff0099',
	230: '#ff0093',
	231: '#ff008d',
	232: '#ff0087',
	233: '#ff0081',
	234: '#ff007b',
	235: '#ff0075',
	236: '#ff006f',
	237: '#ff0069',
	238: '#ff0063',
	239: '#ff005d',
	240: '#ff0057',
	241: '#ff0051',
	242: '#ff004b',
	243: '#ff0045',
	244: '#ff003f',
	245: '#ff0039',
	246: '#ff0033',
	247: '#ff002d',
	248: '#ff0027',
	249: '#ff0021',
	250: '#ff001b',
	251: '#ff0015',
	252: '#ff000f',
	253: '#ff0009',
	254: '#ffffff',
	255: '#000000',
};

utils.prototypeBlocks['display.show'] = function (type, fields, values, mutations, statementsNode, statement) {
	const checkClasses = utils.python2Blocks._classes[statementsNode[0].text];
	if (checkClasses) {
		return '';
	}
	const defaultImages = [
		'HEART',
		'HEART_SMALL',
		'HAPPY',
		'SMILE',
		'SAD',
		'CONFUSED',
		'ANGRY',
		'ASLEEP',
		'SURPRISED',
		'SILLY',
		'FABULOUS',
		'MEH',
		'YES',
		'NO',
		'CLOCK12',
		'CLOCK11',
		'CLOCK10',
		'CLOCK9',
		'CLOCK8',
		'CLOCK7',
		'CLOCK6',
		'CLOCK5',
		'CLOCK4',
		'CLOCK3',
		'CLOCK2',
		'CLOCK1',
		'ARROW_N',
		'ARROW_NE',
		'ARROW_E',
		'ARROW_SE',
		'ARROW_S',
		'ARROW_SW',
		'ARROW_W',
		'ARROW_NW',
		'TRIANGLE',
		'TRIANGLE_LEFT',
		'CHESSBOARD',
		'DIAMOND',
		'DIAMOND_SMALL',
		'SQUARE',
		'SQUARE_SMALL',
		'RABBIT',
		'COW',
		'MUSIC_CROTCHET',
		'MUSIC_QUAVER',
		'MUSIC_QUAVERS',
		'PITCHFORK',
		'XMAS',
		'PACMAN',
		'TARGET',
		'TSHIRT',
		'ROLLERSKATE',
		'DUCK',
		'HOUSE',
		'TORTOISE',
		'BUTTERFLY',
		'STICKFIGURE',
		'GHOST',
		'SWORD',
		'GIRAFFE',
		'SKULL',
		'UMBRELLA',
		'SNAKE',
	];
	const defaultImageShort = ['HEART', 'SMILE', 'SAD', 'YES', 'NO', 'STICKFIGURE', 'PITCHFORK', 'UMBRELLA', 'SKULL', 'CHESSBOARD', 'BUTTERFLY'];
	const defaultArrows = ['ARROW_N', 'ARROW_NE', 'ARROW_E', 'ARROW_SE', 'ARROW_S', 'ARROW_SW', 'ARROW_W', 'ARROW_NW'];

	const imageToCheck = statementsNode[0].text.replace('Image.', '');
	if (defaultImages.includes(imageToCheck)) {
		if (defaultImageShort.includes(imageToCheck)) {
			return {
				type: 'show_icon',
				fields: { ICON: imageToCheck },
				values: null,
				mutations: null,
				statementsNode: null,
				statements: null,
			};
		} else if (defaultArrows.includes(imageToCheck)) {
			return {
				type: 'show_arrow',
				fields: { ARROW: imageToCheck.split('_')[1] || 'N' },
				values: null,
				mutations: null,
				statementsNode: null,
				statements: null,
			};
		} else {
			return {
				type: 'show_icon_simple',
				fields: { ICON: imageToCheck },
				values: null,
				mutations: null,
				statementsNode: null,
				statements: null,
			};
		}
	}

	return {
		type: 'show_number',
		fields: null,
		values: {
			VALUE: null,
		},
		mutations: null,
		statementsNode: { VALUE: statementsNode[0] },
		statements: null,
	};
};

utils.prototypeBlocks['display.clear'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'clear',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['define_image'] = function (node, identifier) {
	let pattern;
	for (const child of node.children) {
		if (child.type === 'argument_list') {
			pattern = utils.getArgumentList(child.children);
		}
	}

	pattern = utils.extractString(pattern[0]);
	const rows = pattern.text.split(':');

	const ledImageBlock = {
		type: 'show_leds',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: {},
		statements: null,
	};

	for (let i = 0; i < rows.length; i++) {
		for (let j = 0; j < rows[i].length; j++) {
			ledImageBlock.fields[`LED${i}${j}`] = rows[i][j] !== '0' ? 'TRUE' : 'FALSE';
		}
	}

	return ledImageBlock;
};

utils.prototypeBlocks['display.scroll'] = function (type, fields, values, mutations, statementsNode, statement) {
	const showStringBlock = {
		type: 'show_string',
		fields: {},
		values: { TEXT: null },
		mutations: null,
		statementsNode: {},
		statements: null,
	};
	let textString = null;
	if (statementsNode[0].type === 'string') {
		textString = utils.extractString(statementsNode[0]);
	} else if (statementsNode[0].type === 'call' && statementsNode[0].children[0].type === 'identifier') {
		for (const child of statementsNode[0].children) {
			if (child.type === 'argument_list') {
				textString = utils.getArgumentList(child.children)[0];
			}
		}
	} else {
		textString = statementsNode[0];
	}
	showStringBlock.statementsNode.TEXT = textString;

	return showStringBlock;
};

utils.prototypeBlocks['neopixel.NeoPixel'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	const Python2Blocks = window.Python2Blocks;
	const checkImport = Python2Blocks._imports.has('neopixel');
	if (!checkImport) {
		return null;
	}

	const pin = statementsNode[0].text;
	const classVariable = Python2Blocks._classes[parent.children[0].text];
	classVariable.pin = pin;
	classVariable.ledCount = statementsNode[1].text || 20;

	let value = null;

	if (statementsNode[1].type === 'identifier') {
		if (utils._variables[statementsNode[1].text] && utils._variables[statementsNode[1].text].variable && utils._variables[statementsNode[1].text].variable.type === 'integer') {
			value = utils._variables[statementsNode[1].text].variable.text;
		}
	} else if (statementsNode[1].type === 'integer') {
		value = statementsNode[1].text;
	}

	return {
		type: 'display_defineNeopixel',
		fields: { PIN: pin, N: value || 20 },
		values: {},
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['set_neopixel'] = function (index, statementsNode, identifier) {
	const rgb = utils.getArgumentList(statementsNode.children);
	const classVariable = utils.python2Blocks._classes[identifier];
	const pin = classVariable.pin;
	const convertRGB = utils.convertRBGtoHex(rgb);
	if (convertRGB === null) {
		return {
			type: 'display_controlNeopixelLed',
			fields: { PIN: pin },
			values: {
				LED: null,
				R: null,
				G: null,
				B: null,
			},
			mutations: null,
			statementsNode: { LED: index, R: rgb[0], G: rgb[1], B: rgb[2] },
		};
	} else {
		return {
			type: 'display_controlColorNeopixelLed',
			fields: { PIN: pin },
			values: {
				LED: null,
				COLOR: null,
			},
			mutations: null,
			statementsNode: { LED: index, COLOR: { type: 'bypass', block: 'color_picker', text: convertRGB } },
			statements: null,
		};
	}
};

utils.prototypeBlocks['neopixel_showAllLed'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode.length === 0) return null;

	let classVariable = null;
	if (statementsNode[0].type === 'identifier') {
		classVariable = utils.python2Blocks._classes[statementsNode[0].text];
	}

	if (classVariable === null) {
		return null;
	}

	const pin = classVariable.pin;
	let ledCount = statementsNode[1].text || classVariable.ledCount;

	const rgb = statementsNode.slice(2);
	const convertRGB = utils.convertRBGtoHex(rgb);
	if (convertRGB === null) {
		return {
			type: 'display_neopixel_controlAllLedRGB',
			fields: { PIN: pin },
			values: {
				R: null,
				G: null,
				B: null,
			},
			mutations: null,
			statementsNode: { R: rgb[0], G: rgb[1], B: rgb[2] },
		};
	} else {
		return {
			type: 'display_neopixel_controlAllLedPalette',
			fields: { PIN: pin },
			values: {
				COLOR: null,
			},
			mutations: null,
			statementsNode: { COLOR: { type: 'bypass', block: 'color_picker', text: convertRGB } },
			statements: null,
		};
	}
};

utils.prototypeBlocks['neopixel_rainbow'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	if (statementsNode.length === 0) return null;

	let classVariable = null;
	if (statementsNode[0].type === 'identifier') {
		classVariable = utils.python2Blocks._classes[statementsNode[0].text];
	}

	if (classVariable === null) {
		return null;
	}

	const pin = classVariable.pin || statementsNode[0].text;

	return {
		type: 'display_rainbowNeopixel',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['color_picker'] = function (hexColor) {
	return {
		type: 'colour_picker',
		fields: { COLOUR: hexColor },
		values: {},
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['show'] = function (type, classDeclaration) {
	const checkClasses = utils.python2Blocks._classes[classDeclaration];
	if (checkClasses) {
		return 'used';
	} else {
		return null;
	}
};

utils.prototypeBlocks['LCD1602'] = function (node, identifier) {
	Blockly.Python.addInit('lcd1602', `${identifier} = LCD1602()`);
	return 'LCD1602';
};

utils.prototypeBlocks['setCursor'] = function (method, identifier, values, mutations, statementsNode) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return null;
	}
	let line = null;
	let pos = null;
	// let pin = {"scl":Number(checkClasses.i2c.scl.text) || 9, "sda":Number(checkClasses.i2c.sda.text) || 8};
	for (const element of statementsNode) {
		if (element.type === 'integer' && pos === null) {
			pos = element.text;
		} else if (element.type === 'integer' && pos !== null) {
			line = element.text;
		}
	}

	checkClasses.line = line;
	checkClasses.pos = pos;

	return 'setCursor';
};

utils.prototypeBlocks['writeTxt'] = function (method, identifier, values, mutations, statementsNode) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return null;
	}
	let text = null;
	for (const element of statementsNode) {
		if (element.type === 'string') {
			text = element;
		}
	}
	checkClasses.text = text;

	return {
		type: 'display_lcdSetText',
		fields: { LINE: checkClasses.line || '0', POS: checkClasses.pos || '0' },
		values: {
			TEXT: null,
		},
		mutations: null,
		statementsNode: { TEXT: text },
		statements: null,
	};
};

utils.prototypeBlocks['clear'] = function (method, identifier, values, mutations, statementsNode) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return null;
	}
	return {
		type: 'display_lcdClear',
		fields: {},
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['plotBarGraph'] = function (method, identifier, values, mutations, statementsNode) {
	const value = { type: 'integer', text: '255', children: [] };
	const max = { type: 'integer', text: '1024', children: [] };

	return {
		type: 'display_show_gauge',
		fields: null,
		values: {
			VALUE: null,
			MAX: null,
		},
		mutations: null,
		statementsNode: { VALUE: statementsNode[0] || value, MAX: statementsNode[1] || max },
		statements: null,
	};
};

utils.prototypeBlocks['bar_graph.plot_bar_graph'] = function (type, fields, values, mutations, statementsNode, statement) {
	const barBlock = {
		type: 'display_plot_bar_graph',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: {},
		statements: null,
	};

	if (statementsNode.length > 1) {
		barBlock.values.VALUE = null;
		barBlock.values.TO = null;
		barBlock.mutations = { TO: true };
		barBlock.statementsNode.VALUE = statementsNode[0] || { type: 'integer', text: '0', children: [] };
		barBlock.statementsNode.TO = statementsNode[1] || { type: 'integer', text: '0', children: [] };
	} else {
		barBlock.values.VALUE = null;
		barBlock.statementsNode.VALUE = statementsNode[0] || { type: 'integer', text: '0', children: [] };
		barBlock.mutations = { TO: false };
	}

	return barBlock;
};

utils.prototypeBlocks['display.set_pixel'] = function (type, fields, values, mutations, statementsNode, statement) {
	let state = null;

	let x = null;
	let y = null;

	let setPixelWithLuminosity = null;

	for (const child of statementsNode) {
		if (x === null) {
			x = child;
		} else if (y === null) {
			y = child;
		} else if (state === null) {
			if (child.type === 'conditional_expression') {
				if (child.children[2].type === 'integer' && child.children[2].text === '1') {
					state = '1';
				} else {
					state = '0';
				}
			} else if (child.type === 'integer') {
				if (child.text === '9') {
					state = '1';
				} else if (child.text === '0') {
					state = '0';
				} else {
					setPixelWithLuminosity = child;
				}
			} else if (child.type === 'identifier') {
				setPixelWithLuminosity = child;
			}
		}
	}

	if (setPixelWithLuminosity !== null) {
		return {
			type: 'set_light_pixel',
			fields: null,
			values: {
				X: null,
				Y: null,
				LIGHT: null,
			},
			mutations: null,
			statementsNode: { X: x, Y: y, LIGHT: setPixelWithLuminosity },
		};
	} else {
		return {
			type: 'set_pixel',
			fields: null,
			values: {
				X: null,
				Y: null,
				STATE: null,
			},
			mutations: null,
			statementsNode: { X: x, Y: y, STATE: { type: 'bypass', block: 'io_digital_signal', text: state } },
		};
	}
};

utils.prototypeBlocks['set_brightness'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'set_brightness',
		fields: null,
		values: {
			VALUE: null,
		},
		mutations: null,
		statementsNode: { VALUE: statementsNode[0] || { type: 'integer', text: '4', children: [] } },
	};
};

utils.prototypeBlocks['showClock'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'show_clock',
		fields: null,
		values: { CLOCK: null },
		mutations: null,
		statementsNode: { CLOCK: statementsNode[0] || { type: 'integer', text: '1', children: [] } },
	};
};

utils.prototypeBlocks['OLED'] = function (node, identifier) {
	Blockly.Python.addInit('oled', `${identifier} = OLED()`);
	return 'OLED';
};

utils.prototypeBlocks['oled.addTxt'] = function (method, identifier, values, mutations, statementsNode) {
	return {
		type: 'display_addOledText',
		fields: null,
		values: {
			TEXT: null,
			X: null,
			Y: null,
		},
		mutations: null,
		statementsNode: { TEXT: statementsNode[2] || { type: 'string', text: '', children: [] }, X: statementsNode[0] || { type: 'integer', text: '0', children: [] }, Y: statementsNode[1] || { type: 'integer', text: '0', children: [] } },
	};
};

utils.prototypeBlocks['oled.set_px'] = function (method, identifier, values, mutations, statementsNode) {
	let x = null;
	let y = null;
	let state = null;

	for (const child of statementsNode) {
		if (x === null) {
			x = child;
		} else if (y === null) {
			y = child;
		} else if (state === null) {
			if (child.type === 'integer') {
				if (child.text === '1') {
					state = { type: 'bypass', block: 'io_digital_signal', text: '1' };
				} else {
					state = { type: 'bypass', block: 'io_digital_signal', text: '0' };
				}
			} else if (child.type === 'identifier') {
				state = child;
			}
		}
	}

	return {
		type: 'display_setOledPixel',
		fields: null,
		values: {
			X: null,
			Y: null,
			STATE: null,
		},
		mutations: null,
		statementsNode: { X: x || { type: 'integer', text: '0', children: [] }, Y: y || { type: 'integer', text: '0', children: [] }, STATE: state || { type: 'bypass', block: 'io_digital_signal', text: '1' } },
	};
};

utils.prototypeBlocks['oled.draw_stamp'] = function (method, identifier, values, mutations, statementsNode) {
	const icons = ['HAPPY', 'SAD', 'HEART', 'YES', 'NO', 'STICKFIGURE', 'PITCHFORK', 'UMBRELLA', 'SKULL', 'CHESSBOARD', 'BUTTERFLY'];
	let x = null;
	let y = null;
	let icon = 'BUTTERFLY';
	let state = null;

	const checkIcon = utils._variables[statementsNode[2].text];
	if (checkIcon) {
		if (checkIcon.variable && checkIcon.variable.text.match(/oled.create_stamp\(Image\./g)) {
			icon = checkIcon.variable.text.replace('oled.create_stamp(Image.', '').replace(')', '');
			if (icons.includes(icon)) {
				icon = icon;
			} else {
				icon = 'BUTTERFLY';
			}
		}
	}

	for (const child of statementsNode) {
		if (x === null) {
			x = child;
		} else if (y === null) {
			y = child;
		} else if (child.type === 'keyword_argument') {
			if (child.children[0].text === 's') {
				state = { type: 'bypass', block: 'io_digital_signal', text: child.children[2].text };
			}
		}
	}

	return {
		type: 'display_showOledIcon',
		fields: { ICON: icon },
		values: {
			X: null,
			Y: null,
			STATE: null,
		},
		mutations: null,
		statementsNode: { X: x || { type: 'integer', text: '0', children: [] }, Y: y || { type: 'integer', text: '0', children: [] }, STATE: state || { type: 'bypass', block: 'io_digital_signal', text: '1' } },
	};
};

utils.prototypeBlocks['oled.clear'] = function (method, identifier, values, mutations, statementsNode) {
	return {
		type: 'display_clearOledScreen',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// 4 Digit Display

utils.prototypeBlocks['TM1637'] = function (node, identifier) {
	const args = utils.getArgumentList(node.children[1].children);
	const classe = utils.python2Blocks._classes[identifier];
	for (const keywordArg of args) {
		if (keywordArg.type === 'keyword_argument') {
			if (keywordArg.children[0].text === 'clk') {
				classe.clk = keywordArg.children[2].text;
			} else if (keywordArg.children[0].text === 'dio') {
				classe.dio = keywordArg.children[2].text;
			}
		}
	}
	return 'TM1637';
};

// TODO : rearrange the classe declaration to avoid this loop (need to use the identifier)
const tm1637Pins = ['tm1637_0', 'tm1637_1', 'tm1637_2', 'tm1637_8', 'tm1637_9', 'tm1637_12', 'tm1637_13', 'tm1637_14', 'tm1637_15', 'tm1637_16', 'tm1637_19', 'tm1637_20', 'tm1637__speaker'];
for (const blockType of ['number', 'temperature', 'clock']) {
	for (const pin of tm1637Pins) {
		utils.prototypeBlocks[`${pin}.${blockType}`] = function (type, fields, values, mutations, statementsNode, statement) {
			const checkClasses = utils.python2Blocks._classes[pin];
			if (!checkClasses) {
				return '';
			}

			const clk = checkClasses.clk || null;
			const dio = checkClasses.dio || null;

			if (blockType === 'number' || blockType === 'temperature') {
				let num = { type: 'integer', text: '1024', children: [] };

				if (statementsNode[0].type === 'call' && statementsNode[0].children[0].type === 'identifier' && statementsNode[0].children[0].text === 'int') {
					num = utils.getArgumentList(statementsNode[0].children[1].children)[0];
				} else if (statementsNode[0].type === 'integer') {
					num = statementsNode[0];
				} else {
					num = statementsNode[0];
				}

				return {
					type: 'display_setNumberGrove4Digit',
					fields: { SHOW: blockType === 'number' ? 'NUM' : 'TEMP', CLK: clk, DIO: dio },
					values: {
						N: null,
					},
					mutations: null,
					statementsNode: { N: num },
					statements: null,
				};
			} else if (blockType === 'clock') {
				if (statementsNode[0].type === 'call' && statementsNode[0].children[0].type === 'identifier' && statementsNode[0].children[0].text === 'getCurrentTime') {
					return {
						type: 'display_setClockGrove4Digit',
						fields: { CLK: clk, DIO: dio },
						values: null,
						mutations: null,
						statementsNode: null,
						statements: null,
					};
				}
			}
		};
	}
}

utils.prototypeBlocks['MY9221'] = function (node, identifier) {
	const args = utils.getArgumentList(node.children[1].children);
	const classe = utils.python2Blocks._classes[identifier];
	for (const keywordArg of args) {
		if (keywordArg.type === 'keyword_argument') {
			if (keywordArg.children[0].text === 'di') {
				classe.di = keywordArg.children[2].text;
			} else if (keywordArg.children[0].text === 'dcki') {
				classe.dcki = keywordArg.children[2].text;
			}
		}
	}
	return 'MY9221';
};

const my9221Pins = ['my9221_P0', 'my9221_P1', 'my9221_P2', 'my9221_P8', 'my9221_P9', 'my9221_P12', 'my9221_P13', 'my9221_P14', 'my9221_P15', 'my9221_P16', 'my9221_P19', 'my9221_P20', 'my9221_P_speaker'];
for (const blockType of ['level', 'reverse']) {
	for (const pin of my9221Pins) {
		utils.prototypeBlocks[`${pin}.${blockType}`] = function (type, fields, values, mutations, statementsNode, statement) {
			const checkClasses = utils.python2Blocks._classes[pin];
			if (!checkClasses) {
				return '';
			}

			const di = checkClasses.di || null;
			const dcki = checkClasses.dcki || null;

			if (blockType === 'level') {
				let value = null;
				if (statementsNode.length > 0) {
					value = statementsNode[0];
				} else {
					value = { type: 'float', text: '3.14', children: [] };
				}

				return {
					type: 'display_setLevelLedBar',
					fields: { DI: di, DCKI: dcki },
					values: {
						VALUE: null,
					},
					mutations: null,
					statementsNode: { VALUE: value },
					statements: null,
				};
			} else if (blockType === 'reverse') {
				let state = { type: 'bypass', block: 'io_digital_signal', text: '1' };

				if (statementsNode.length > 0) {
					if (statementsNode[0].type === 'integer') {
						state = { type: 'bypass', block: 'io_digital_signal', text: statementsNode[0].text };
					}
				}

				return {
					type: 'display_my9221_reverse',
					fields: { DI: di, DCKI: dcki },
					values: { STATE: null },
					mutations: null,
					statementsNode: { STATE: state },
					statements: null,
				};
			}
		};
	}
}

utils.prototypeBlocks['HT16K33Matrix'] = function (node, identifier) {
	// TODO add the correct check for class declaration
	return 'HT16K33Matrix';
};

function convertEscapedHexToBinary(escapedHexString) {
	let cleanedString = escapedHexString.replace(/\\x/g, '0x');

	let hexArray = cleanedString.match(/0x[0-9A-Fa-f]{2}/g);

	if (!hexArray) return [];

	let binaryArray = hexArray.map((hex) => {
		let decimal = parseInt(hex, 16);
		return decimal.toString(2).padStart(8, '0');
	});

	return binaryArray;
}

utils.prototypeBlocks['set_icon'] = function (node, identifier, values, mutations, statementsNode) {
	const checkClasses = utils.python2Blocks._classes[identifier];

	if (!checkClasses) {
		return null;
	}


	const string = utils.extractString(statementsNode[0]).text;
	let convertHex = convertEscapedHexToBinary(string);
	if (convertHex.length < 8) {
		const diff = 8 - convertHex.length;
		for (let i = 0; i < diff; i++) {
			convertHex.push('00000000');
		}
	}
	const finalHex = convertHex.join(',');

	checkClasses.icon = finalHex;

	return 'set_icon';
};

utils.prototypeBlocks['draw'] = function (node, identifier, values, mutations, statementsNode) {
	const checkClasses = utils.python2Blocks._classes[identifier];
	if (!checkClasses) {
		return null;
	}

	const icon = checkClasses.icon ? checkClasses.icon : '01111110,01000010,01111110,00000001,00000001,01111110,01000010,01111110';

	utils.python2Blocks.interface_specific_end.HT16K33Matrix = LedMatrixModalManager.updateImageMono;

	return {
		type: 'display_led_matrix_DrawBitmap',
		fields: { HIDDEN_MONO_LEDS_MATRIX: icon },
		values: {},
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['ht16k33matrix.clear'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'display_led_matrix_clear',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['GroveTwoRGBLedMatrix'] = function (node, identifier) {
	return 'GroveTwoRGBLedMatrix';
};

utils.prototypeBlocks['displayFrames'] = function (method, identifier, values, mutations, statementsNode) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return null;
	}

	let frames = [];
	for (const element of statementsNode) {
		if (element.type === 'list') {
			const framesNode = utils.getArgumentList(element.children);
			framesNode.map((frame) => {
				let decimalValue = parseInt(frame.text, 16);
				let colorHex = '#' + decimalValue.toString(16).padStart(2, '0') + '0000';
				frames.push(COLOURS_FOR_LED_MATRIX[decimalValue] || COLOURS_FOR_LED_MATRIX[254]);
			});
		}
	}

	let temp_matrix = [],
		row = [];
	for (var i = 0; i < 8; i++) {
		for (var j = i; j < frames.length; j += 8) {
			row.push(frames[j]);
		}
		temp_matrix.push(row);
		row = [];
	}
	temp_matrix = temp_matrix.reverse();
	let reverse_matrix = [];
	for (var i = 0; i < temp_matrix.length; i++) {
		for (var j = 0; j < temp_matrix[i].length; j++) {
			row.push(temp_matrix[j][i]);
		}
		reverse_matrix.push(row);
		row = [];
	}

	let duration = statementsNode[1] || 1000;
	let mutator = !statementsNode[2].type || false;

	utils.python2Blocks.interface_specific_end.HT16K33Matrix = LedMatrixModalManager.updateImageRGB;

	return {
		type: 'display_rgb_led_matrix_DrawBitmap',
		fields: { HIDDEN_RGB_LEDS_MATRIX: reverse_matrix.join(',') },
		mutations: { DURATION: duration },
		values: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['RGBmatrix.stopDisplay'] = function (method, identifier, values, mutations, statementsNode) {
	return {
		type: 'display_rgb_led_matrix_stopDisplay',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['GAME'] = function (node, identifier) {
	return 'GAME';
};

utils.prototypeBlocks['createSprite'] = function (method, identifier, values, mutations, statementsNode) {
	const checkClasses = utils.python2Blocks._classes[identifier];
	if (!checkClasses) {
		return null;
	}

	let x = null;
	let y = null;

	for (const child of statementsNode) {
		if (child.type !== 'string') {
			if (x === null) {
				x = child;
			} else {
				y = child;
			}
		}
	}

	return {
		type: 'display_games_createSprite',
		fields: null,
		values: {
			X: null,
			Y: null,
		},
		mutations: null,
		statementsNode: {
			X: x || { type: 'integer', text: '0', children: [] },
			Y: y || { type: 'integer', text: '0', children: [] },
		},
		statements: null,
	};
};

// delet methode for sprite
utils.prototypeBlocks['delete'] = function (method, identifier, values, mutations, statementsNode) {
	const sprite = utils._variables[identifier];
	if (!sprite) {
		return null;
	}

	if (sprite.variable.text.match(/createSprite/g)) {
		return {
			type: 'display_games_deleteSprite',
			fields: null,
			values: { SPRITE: null },
			mutations: null,
			statementsNode: { SPRITE: { type: 'identifier', text: identifier, children: [] } },
			statements: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['deleted'] = function (method, identifier, parent) {
	const sprite = utils._variables[identifier];
	if (!sprite || !parent || parent.type !== 'attribute') {
		return null;
	}

	if (sprite.variable.text.match(/createSprite/g)) {
		return {
			type: 'display_games_isSpriteDeleted',
			fields: null,
			values: { SPRITE: null },
			mutations: null,
			statementsNode: { SPRITE: { type: 'identifier', text: identifier, children: [] } },
			statements: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['move'] = function (method, identifier, values, mutations, statementsNode) {
	const sprite = utils._variables[identifier];
	if (!sprite) {
		return null;
	}

	let directions = ['up', 'down', 'left', 'right'];

	if (sprite.variable.text.match(/createSprite/g)) {
		let value = null;
		let direction = null;

		for (const child of statementsNode) {
			if (direction === null && child.type === 'string') {
				const dir = utils.extractString(child).text;
				direction = directions.includes(dir) ? dir.toUpperCase() : 'LEFT';
			} else if (value === null) {
				value = child;
			}
		}
		return {
			type: 'display_games_moveSprite',
			fields: { DIR: direction || 'LEFT' },
			values: {
				STEP: null,
				SPRITE: null,
			},
			mutations: null,
			statementsNode: {
				STEP: value || { type: 'integer', text: '1', children: [] },
				SPRITE: { type: 'identifier', text: identifier, children: [] },
			},
			statements: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['x'] = function (method, identifier, parent) {
	const sprite = utils._variables[identifier];
	if (!sprite || !parent || parent.type !== 'attribute') {
		return null;
	}

	if (sprite.variable.text.match(/createSprite/g)) {
		return {
			type: 'display_games_getSpritePosition',
			fields: { POS: 'x' },
			values: { SPRITE: null },
			mutations: null,
			statementsNode: { SPRITE: { type: 'identifier', text: identifier, children: [] } },
			statements: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['y'] = function (method, identifier, parent) {
	const sprite = utils._variables[identifier];
	if (!sprite || !parent || parent.type !== 'attribute') {
		return null;
	}

	if (sprite.variable.text.match(/createSprite/g)) {
		return {
			type: 'display_games_getSpritePosition',
			fields: { POS: 'y' },
			values: { SPRITE: null },
			mutations: null,
			statementsNode: { SPRITE: { type: 'identifier', text: identifier, children: [] } },
			statements: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['changeScore'] = function (method, identifier, values, mutations, statementsNode) {
	const checkClasses = utils.python2Blocks._classes[identifier];
	if (!checkClasses) {
		return null;
	}

	const score = statementsNode[0] || { type: 'integer', text: '1', children: [] };

	return {
		type: 'display_games_changeScore',
		fields: null,
		values: {
			N: null,
		},
		mutations: null,
		statementsNode: {
			N: score,
		},
		statements: null,
	};
};

utils.prototypeBlocks['score'] = function (method, identifier, parent) {
	const checkClasses = utils.python2Blocks._classes[identifier];
	if (!checkClasses || !parent || parent.type !== 'attribute') {
		return null;
	}

	return {
		type: 'display_games_getScore',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['stopGame'] = function (method, identifier, values, mutations, statementsNode) {
	const checkClasses = utils.python2Blocks._classes[identifier];
	if (!checkClasses) {
		return null;
	}

	return {
		type: 'display_games_stopGame',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['endGame'] = function (method, identifier, parent) {
	const checkClasses = utils.python2Blocks._classes[identifier];
	if (!checkClasses || !parent || parent.type !== 'attribute') {
		return null;
	}

	return {
		type: 'display_games_isEndGame',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['startGame'] = function (method, identifier, values, mutations, statementsNode) {
	const checkClasses = utils.python2Blocks._classes[identifier];
	if (!checkClasses) {
		return null;
	}

	return {
		type: 'display_games_restartGame',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['#LEDModuleon'] = function (pin, statementsNode, parent) {
	let state = null;

	if (statementsNode.length > 0) {
		if (statementsNode[0].type === 'integer') {
			state = { type: 'bypass', block: 'io_digital_signal', text: statementsNode[0].text };
		}
	}

	return {
		type: 'display_setGroveSocketLed',
		fields: { PIN: pin },
		mutations: null,
		values: { STATE: null },
		statementsNode: { STATE: state || { type: 'bypass', block: 'io_digital_signal', text: '1' } },
	};
};

utils.prototypeBlocks['OLEDM'] = function (type, identifier, values, mutations, statementsNode, statement) {
	// not used for now
	return "";
}

utils.prototypeBlocks['MORPION'] = function (type, identifier, values, mutations, statementsNode, statement) {
	// not used for now
	return "";
}

utils.prototypeBlocks['newGame'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const morpion = utils._variables[identifier];
	if (!morpion) {
		return null;
	}

	return {
		type: 'display_morpionNewGame',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};

}

utils.prototypeBlocks['mvCursor'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const morpion = utils._variables[identifier];
	if (!morpion) {
		return null;
	}

	return {
		type: 'display_morpionMoveCursor',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	}
}

utils.prototypeBlocks['addCircle'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const morpion = utils._variables[identifier];
	if (!morpion) {
		return null;
	}

	return {
		type: 'display_morpionSetPlayerFigure',
		fields: { FIGURE: 'O' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	}
}

utils.prototypeBlocks['addCross'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const morpion = utils._variables[identifier];
	if (!morpion) {
		return null;
	}

	return {
		type: 'display_morpionSetPlayerFigure',
		fields: { FIGURE: 'X' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	}
}

utils.prototypeBlocks['endGame'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const morpion = utils._variables[identifier];
	if (!morpion) {
		return null;
	}

	return {
		type: 'display_morpionIsEndGame',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	}
}