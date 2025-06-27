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

	// console.log('cursorPos', cursorPos, 'addr', addr);
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
        const ledIndex = {type:'number_literal', text: statementsNode[0].text}

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
