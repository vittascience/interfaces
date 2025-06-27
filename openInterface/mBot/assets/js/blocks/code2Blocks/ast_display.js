import utils from '/openInterface/interfaces/assets/js/code2blocks/cpp/utils/utils.js';

/**
 * LCD GROVE RGB
 **/
utils.prototypeBlocks['lcdRgb.begin'] = function (type, fields, values, mutations, statementsNode, statement) {
	const isWithinSetup = Cpp2Blocks.isWithinSetup;
	const lcdUsed = Cpp2Blocks._classes;
	const beginValues = [];

	for (const child of statementsNode) {
		if (child.type === 'number_literal') {
			beginValues.push(child.text);
		}
	}

	if (isWithinSetup && lcdUsed['lcdRgb']) {
		lcdUsed['lcdRgb'].begin = beginValues;
	} else {
		return null;
	}
};

utils.prototypeBlocks['lcdRgb.setCursor'] = function (type, fields, values, mutations, statementsNode, statement) {
	const isWithinSetup = Cpp2Blocks.isWithinSetup;
	const lcdUsed = Cpp2Blocks._classes;

	const cursorValues = [];

	for (const child of statementsNode) {
		if (child.type === 'number_literal') {
			cursorValues.push(child.text);
		}
	}

	if (isWithinSetup && lcdUsed['lcdRgb']) {
		lcdUsed['lcdRgb'].setCursor = cursorValues;
	} else {
		return null;
	}
};

utils.prototypeBlocks['lcdRgb.print'] = function (type, fields, values, mutations, statementsNode, statement) {
	const lcdUsed = Cpp2Blocks._classes;
	let cursorPos = null;
	let beginValues = null;
	if (lcdUsed['lcdRgb']) {
		cursorPos = lcdUsed['lcdRgb'].setCursor;
		beginValues = lcdUsed['lcdRgb'].begin;
	}
	if (cursorPos !== null && beginValues !== null) {
		return {
			type: 'display_lcdRGBSetText',
			fields: { ADDR: '0x3e', LINE: cursorPos[1], POS: cursorPos[0] },
			values: { TEXT: null },
			mutations: null,
			statementsNode: { TEXT: statementsNode[0] },
			statement: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['lcdRgb.clear'] = function (type, fields, values, mutations, statementsNode, statement) {
	const lcdUsed = Cpp2Blocks._classes;

	if (lcdUsed['lcdRgb'] && lcdUsed['lcdRgb'].begin) {
		return {
			type: 'display_lcdRGBClear',
			fields: { ADDR: '0x3e' },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['lcdRgb.display'] = function (type, fields, values, mutations, statementsNode, statement) {
	const lcdUsed = Cpp2Blocks._classes;

	if (lcdUsed['lcdRgb'] && lcdUsed['lcdRgb'].begin) {
		return {
			type: 'display_setDisplay',
			fields: { ADDR: '0x3e', STATE: 'ON' },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['lcdRgb.noDisplay'] = function (type, fields, values, mutations, statementsNode, statement) {
	const lcdUsed = Cpp2Blocks._classes;

	if (lcdUsed['lcdRgb'] && lcdUsed['lcdRgb'].begin) {
		return {
			type: 'display_setDisplay',
			fields: { ADDR: '0x3e', STATE: 'OFF' },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['lcdRgb.setRGB'] = function (type, fields, values, mutations, statementsNode, statement) {
	const lcdUsed = Cpp2Blocks._classes;

	if (lcdUsed['lcdRgb']) {
		return {
			type: 'display_lcdRGBSetColor',
			fields: { ADDR: '0x3e' },
			values: { R: null, G: null, B: null },
			mutations: null,
			statementsNode: { R: statementsNode[0], G: statementsNode[1], B: statementsNode[2] },
			statement: null,
		};
	} else {
		return null;
	}
};

/**
 * LCD PCF8574
 **/

utils.prototypeBlocks['lcd.init'] = function (type, fields, values, mutations, statementsNode, statement) {
	const isWithinSetup = Cpp2Blocks.isWithinSetup;
	const lcdUsed = Cpp2Blocks._classes;

	if (isWithinSetup && lcdUsed['lcd']) {
		lcdUsed['lcd'].init = true;
	} else {
		return null;
	}
};

utils.prototypeBlocks['lcd.backlight'] = function (type, fields, values, mutations, statementsNode, statement) {
	const isWithinSetup = Cpp2Blocks.isWithinSetup;
	const lcdUsed = Cpp2Blocks._classes;

	if (isWithinSetup && lcdUsed['lcd']) {
		lcdUsed['lcd'].backlight = true;
	} else {
		return null;
	}
};

utils.prototypeBlocks['lcd.setCursor'] = function (type, fields, values, mutations, statementsNode, statement) {
	const isWithinSetup = Cpp2Blocks.isWithinSetup;
	const lcdUsed = Cpp2Blocks._classes;

	const cursorValues = [];

	for (const child of statementsNode) {
		if (child.type === 'number_literal') {
			cursorValues.push(child.text);
		}
	}

	if (isWithinSetup && lcdUsed['lcd']) {
		lcdUsed['lcd'].setCursor = cursorValues;
	} else {
		return null;
	}
};

utils.prototypeBlocks['lcd.print'] = function (type, fields, values, mutations, statementsNode, statement) {
	const lcdUsed = Cpp2Blocks._classes;
	let cursorPos = null;
	let addr = null;
	if (lcdUsed['lcd']) {
		cursorPos = lcdUsed['lcd'].setCursor;
		addr = lcdUsed['lcd'].argumentList[0].text;
	}

	if (cursorPos !== null) {
		return {
			type: 'display_lcdRGBSetText',
			fields: { ADDR: addr, LINE: cursorPos[1], POS: cursorPos[0] },
			values: { TEXT: null },
			mutations: null,
			statementsNode: { TEXT: statementsNode[0] },
			statement: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['lcd.clear'] = function (type, fields, values, mutations, statementsNode, statement) {
	const lcdUsed = Cpp2Blocks._classes;

	if (lcdUsed['lcd'] && lcdUsed['lcd'].init) {
		return {
			type: 'display_lcdRGBClear',
			fields: { ADDR: lcdUsed['lcd'].argumentList[0].text },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['lcd.display'] = function (type, fields, values, mutations, statementsNode, statement) {
	const lcdUsed = Cpp2Blocks._classes;

	if (lcdUsed['lcd'] && lcdUsed['lcd'].init && lcdUsed['lcd'].backlight) {
		return {
			type: 'display_setDisplay',
			fields: { ADDR: lcdUsed['lcd'].argumentList[0].text, STATE: 'ON' },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['lcd.noDisplay'] = function (type, fields, values, mutations, statementsNode, statement) {
	const lcdUsed = Cpp2Blocks._classes;

	if (lcdUsed['lcd'] && lcdUsed['lcd'].init && lcdUsed['lcd'].backlight) {
		return {
			type: 'display_setDisplay',
			fields: { ADDR: lcdUsed['lcd'].argumentList[0].text, STATE: 'OFF' },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['lcd.setBacklight'] = function (type, fields, values, mutations, statementsNode, statement) {
	const lcdUsed = Cpp2Blocks._classes;

	if (lcdUsed['lcd'] && lcdUsed['lcd'].backlight) {
		lcdUsed['lcd'].setBacklight = statementsNode[0].text;
	} else {
		return null;
	}
};

/**
 * NEOPIXEL
 * @description for neopixel, the pin is declared in the methode. Therefore it is mandatory to use the pin in the method name and iterate over all possible pins and generate as many functions as possible
 */

const pinDeclaration = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'];

for (const pin of pinDeclaration) {
	utils.prototypeBlocks[`Neopixel_${pin}.begin`] = function (type, fields, values, mutations, statementsNode, statement) {
		const isWithinSetup = Cpp2Blocks.isWithinSetup;
		const neopixelUsed = Cpp2Blocks._classes;

		const defineValue = Blockly.Arduino.definitions_[`def_led_count_${pin}`];
		const neopixelNumber = defineValue.split(' ')[2];
		const neopixel = neopixelUsed[`Neopixel_${pin}`];
		if (isWithinSetup && neopixel) {
			neopixel.begin = neopixelNumber;
			return {
				type: 'display_defineNeopixel',
				fields: { N: neopixelNumber, PIN: pin },
				values: {},
				mutations: null,
				statementsNode: null,
				statement: null,
			};
		} else {
			return null;
		}
	};

	utils.prototypeBlocks[`Neopixel_${pin}.setPixelColor`] = function (type, fields, values, mutations, statementsNode, statement) {
		const neopixelUsed = Cpp2Blocks._classes;
		const neopixel = neopixelUsed[`Neopixel_${pin}`];

		// number literal is the led
		const ledIndex = { type: 'number_literal', text: statementsNode[0].text };

		let rgbValues = [];
		for (const child of statementsNode[1].children) {
			if (child.type === 'argument_list') {
				rgbValues = utils.getArgumentList(child.children);
			}
		}

		if (neopixel) {
			return {
				type: 'display_controlNeopixelLed',
				fields: { PIN: pin },
				values: { LED: null, R: null, G: null, B: null },
				mutations: null,
				statementsNode: { LED: ledIndex, R: rgbValues[0], G: rgbValues[1], B: rgbValues[2] },
				statement: null,
			};
		} else {
			return null;
		}
	};

	utils.prototypeBlocks[`Neopixel_${pin}.show`] = function (type, fields, values, mutations, statementsNode, statement) {
		// because the block is defined after we can't perform any check
	};
}

utils.prototypeBlocks['neopixel_showAllLed'] = function (type, fields, values, mutations, statementsNode, statement) {
	const neopixelUsed = Cpp2Blocks._classes;
	let pin;
	const rbgValues = [];
	for (const child of statementsNode) {
		if (child.type === 'identifier') {
			pin = child.text.split('_');
			pin = pin[pin.length - 1];
		} else if (child.type === 'number_literal') {
			rbgValues.push(child);
		}
	}
	return {
		type: 'display_neopixel_controlAllLedRGB',
		fields: { PIN: pin },
		values: { R: null, G: null, B: null },
		mutations: null,
		statementsNode: { R: rbgValues[0], G: rbgValues[1], B: rbgValues[2] },
		statement: null,
	};
};

utils.prototypeBlocks['memcpy'] = function (type, fields, values, mutations, statementsNode, statement) {
	return 'null';
};

utils.prototypeBlocks['free'] = function (type, fields, values, mutations, statementsNode, statement) {
	return 'null';
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

// LED MATRIX
for (let i = 1; i <= 4; i++) {
	utils.prototypeBlocks[`ledMatrix_${i}.setBrightness`] = function (type, fields, values, mutations, statementsNode, statement) {
		return 'null';
	};
	utils.prototypeBlocks[`ledMatrix_${i}.setColorIndex`] = function (type, fields, values, mutations, statementsNode, statement) {
		return 'null';
	};
}

utils.prototypeBlocks['drawTemp'] = function (type, fields, values, mutations, statementsNode, statement) {
	return 'null';
};

for (let i = 1; i <= 4; i++) {
	utils.prototypeBlocks[`ledMatrix_${i}.drawBitmap`] = function (type, fields, values, mutations, statementsNode, statement) {
		const drawTemp = utils.cpp2Blocks._variables['drawTemp'].variable;

		const bitmap = [];

		for (const child of drawTemp.children) {
			if (child.type === 'initializer_list') {
				for (const bitmapChild of child.children) {
					if (bitmapChild.type === 'number_literal') {
						bitmap.push(bitmapChild.text);
					}
				}
			}
		}
	};
}

for (let i = 1; i <= 4; i++) {
	utils.prototypeBlocks[`ledMatrix_${i}.drawStr`] = function (type, fields, values, mutations, statementsNode, statement) {
		const posX = statementsNode[0] || { type: 'number_literal', text: '0', children: [] };
		const posY = statementsNode[1] || { type: 'number_literal', text: '0', children: [] };
		const drawString = statementsNode[2] || { type: 'string_literal', text: '', children: [] };
		return {
			type: 'robots_makeBlock_matrixDrawString',
			fields: { PORT: `PORT_${i}` },
			values: { X: null, Y: null, TEXT: null },
			mutations: null,
			statementsNode: { X: posX, Y: posY, TEXT: drawString },
			statement: null,
		};
	};
}

for (let i = 1; i <= 4; i++) {
	utils.prototypeBlocks[`ledMatrix_${i}.showNum`] = function (type, fields, values, mutations, statementsNode, statement) {
		const num = statementsNode[0] || { type: 'number_literal', text: '0', children: [] };
		return {
			type: 'robots_makeBlock_matrixShowNumber',
			fields: { PORT: `PORT_${i}` },
			values: { N: null },
			mutations: null,
			statementsNode: { N: num },
			statement: null,
		};
	};
}

for (let i = 1; i <= 4; i++) {
	utils.prototypeBlocks[`ledMatrix_${i}.showClock`] = function (type, fields, values, mutations, statementsNode, statement) {
		const hour = statementsNode[0] || { type: 'number_literal', text: '15', children: [] };
		const minute = statementsNode[1] || { type: 'number_literal', text: '20', children: [] };
		return {
			type: 'robots_makeBlock_matrixShowClock',
			fields: { PORT: `PORT_${i}` },
			values: { HOUR: null, MIN: null },
			mutations: null,
			statementsNode: { HOUR: hour, MIN: minute },
			statement: null,
		};
	};
}

for (let i = 1; i <= 4; i++) {
	utils.prototypeBlocks[`rgbled_${i}.setColor`] = function (type, fields, values, mutations, statementsNode, statement) {
		let rgbValues = [];
		const position = statementsNode[0].text || 1;
		if (statementsNode && statementsNode.length > 3) {
			rgbValues = statementsNode.slice(1);
		}

		const convertRGB = utils.convertRBGtoHex(rgbValues);

		if (convertRGB) {
			return {
				type: 'robots_makeBlock_setPaletteRgbLed',
				fields: { PORT: `PORT_${i}`, LED: position },
				values: { COLOR: null },
				mutations: null,
				statementsNode: { COLOR: { type: 'bypass', block: 'color_picker', text: convertRGB } },
				statement: null,
			};
		} else {
			return {
				type: 'robots_makeBlock_setRgbLed',
				fields: { PORT: `PORT_${i}`, LED: position },
				values: { R: null, G: null, B: null },
				mutations: null,
				statementsNode: { R: rgbValues[0], G: rgbValues[1], B: rgbValues[2] },
				statement: null,
			};
		}
	};

	utils.prototypeBlocks[`rgbled_${i}.show`] = function (type, fields, values, mutations, statementsNode, statement) {
		return 'null';
	};
}

for (let i = 1; i <= 4; i++) {
	for (let j = 1; j <= 2; j++) {
		utils.prototypeBlocks[`neopixel_${i}_${j}.setColor`] = function (type, fields, values, mutations, statementsNode, statement) {
			let rgbValues = [];
			const position = statementsNode[0] || { type: 'number_literal', text: '1', children: [] };
			if (statementsNode && statementsNode.length > 3) {
				rgbValues = statementsNode.slice(1);
			}

			const convertRGB = utils.convertRBGtoHex(rgbValues);

			if (convertRGB) {
				return {
					type: 'robots_makeBlock_controlNeopixelPaletteLed',
					fields: { PORT: `PORT_${i}`, SLOT: j },
					values: { COLOR: null, LED: null },
					mutations: null,
					statementsNode: { COLOR: { type: 'bypass', block: 'color_picker', text: convertRGB }, LED: position },
					statement: null,
				};
			} else {
				return {
					type: 'robots_makeBlock_controlNeopixelLed',
					fields: { PORT: `PORT_${i}`, SLOT: j },
					values: { R: null, G: null, B: null, LED: null },
					mutations: null,
					statementsNode: { R: rgbValues[0], G: rgbValues[1], B: rgbValues[2], LED: position },
					statement: null,
				};
			}
		};

		utils.prototypeBlocks[`neopixel_${i}_${j}.show`] = function (type, fields, values, mutations, statementsNode, statement) {
			// because the block is defined after we can't perform any check
			return 'null';
		};
	}
}

utils.prototypeBlocks['neopixel_showAllLed'] = function (type, fields, values, mutations, statementsNode, statement) {
	let port = null;
	let slot = null;
	let ledNumber = null;
	let r = null;
	let g = null;
	let b = null;
	let rgbValues = [];

	for (const child of statementsNode) {
		if (child.type === 'pointer_expression') {
			if (child.children[1].type === 'identifier') {
				if (child.children[1].text.match(/neopixel_\d+_\d+/)) {
					const neopixelParts = child.children[1].text.match(/neopixel_(\d+)_(\d+)/);
					port = neopixelParts[1];
					slot = neopixelParts[2];
				} else {
					port = 1;
					slot = 1;
				}
			}
		} else if (ledNumber === null) {
			ledNumber = child;
		} else if (r === null) {
			r = child;
		} else if (g === null) {
			g = child;
		} else if (b === null) {
			b = child;
		}
	}

	if (r && g && b) {
		rgbValues = [r, g, b];
	} else {
		rgbValues = [
			{ type: 'number_literal', text: '100', children: [] },
			{ type: 'number_literal', text: '195', children: [] },
			{ type: 'number_literal', text: '221', children: [] },
		];
	}

	const convertRGB = utils.convertRBGtoHex(rgbValues);
	if (convertRGB) {
		return {
			type: 'robots_makeBlock_neopixel_controlAllLedPalette',
			fields: { PORT: `PORT_${port}`, SLOT: slot },
			values: { COLOR: null },
			mutations: null,
			statementsNode: { COLOR: { type: 'bypass', block: 'color_picker', text: convertRGB } },
			statement: null,
		};
	} else {
		return {
			type: 'robots_makeBlock_neopixel_controlAllLedRGB',
			fields: { PORT: `PORT_${port}`, SLOT: slot },
			values: { R: null, G: null, B: null},
			mutations: null,
			statementsNode: { R: rgbValues[0], G: rgbValues[1], B: rgbValues[2] },
			statement: null,
		};
	}
};


utils.prototypeBlocks['neopixel_rainbow'] = function (type, fields, values, mutations, statementsNode, statement) {
    let port = null;
	let slot = null;
	let ledNumber = null;

	for (const child of statementsNode) {
		if (child.type === 'pointer_expression') {
			if (child.children[1].type === 'identifier') {
				if (child.children[1].text.match(/neopixel_\d+_\d+/)) {
					const neopixelParts = child.children[1].text.match(/neopixel_(\d+)_(\d+)/);
					port = neopixelParts[1];
					slot = neopixelParts[2];
				} else {
					port = 1;
					slot = 1;
				}
			}
		} else if (ledNumber === null) {
			ledNumber = child;
		}
	}

    return {
        type: 'robots_makeBlock_rainbowNeopixel',
        fields: { PORT: `PORT_${port}`, SLOT: slot },
        values: null,
        mutations: null,
        statementsNode: null,
        statement: null,
    }
}

for (let i = 1; i <= 4; i++) {
    utils.prototypeBlocks[`display4digit_${i}.display`] = function (type, fields, values, mutations, statementsNode, statement) {
        let displayValue = null;

        if (statementsNode && statementsNode.length > 0) {
            displayValue = statementsNode[0];
        }

        return {
            type: 'robots_makeBlock_set4DigitNumber',
            fields: { PORT: `PORT_${i}` },
            values: { N: null },
            mutations: null,
            statementsNode: { N: displayValue },
            statement: null,
        };
    }

    utils.prototypeBlocks[`display4digit_${i}.init`] = function (type, fields, values, mutations, statementsNode, statement) {
        return 'null';
    }

    utils.prototypeBlocks[`display4digit_${i}.set`] = function (type, fields, values, mutations, statementsNode, statement) {
        return 'null';
    }

}