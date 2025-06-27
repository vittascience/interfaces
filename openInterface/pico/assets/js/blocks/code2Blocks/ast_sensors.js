import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


utils.prototypeBlocks['grove_getUltrasonicData'] = function (type, fields, values, mutations, statementsNode, statement) {
	let pin = null;
	let data = null;

	for (const child of statementsNode) {
		if (child.type === 'integer') {
			pin = 'p' + child.text;
		} else if (child.type === 'keyword_argument') {
			let identifier = null;
			for (const children of child.children) {
				if (children.type === 'identifier' && identifier === null) {
					if (children.text === 'data') {
						identifier = 'data';
					}
				} else if (children.type === 'string' && identifier !== null) {
					const stringContent = utils.extractString(children);
					data = ['distance', 'duration'].includes(stringContent.text) ? (stringContent.text === 'distance' ? 'DIST' : 'TIME') : 'DIST';
				}
			}
		}
	}

	return {
		type: 'sensors_getGroveUltrasonicRanger',
		fields: { SENSOR: 'GROVE', DATA: data || 'DIST', PIN: pin || 'p16' },
		values: null,
		mutations: { pin: true },
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['getGroveTemperature'] = function (type, fields, values, mutations, statementsNode, statement) {
	let pin = null;
    let unit = "CELSIUS";

	for (const child of statementsNode) {
		if (child.type === 'identifier') {
            pin = child.text;
		} else if (child.type === 'keyword_argument') {
            let identifier = null;
            for (const children of child.children) {
                if (children.type === 'identifier' && identifier === null) {
                    if (children.text === 'unit') {
                        identifier = 'unit';
                    }
                } else if (children.type === 'string' && identifier !== null) {
                    const stringContent = utils.extractString(children);
                    unit = ['celcius', 'fahrenheit', 'kelvin'].includes(stringContent.text) ? stringContent.text.toUpperCase() : 'CELSIUS';
                }
            }
        }
	}

    const checkClass = window.Python2Blocks._classes[pin];
    if (!checkClass) {
        return null;
    }

    return {
        type: 'sensors_getGroveTemperature',
        fields: { PIN: pin, UNIT: unit },
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
};

// to rework => impossible to get addresse and i2c pin to work with the block initialisation
utils.prototypeBlocks['BMP280'] = function (node, identifier) {
    let classArgs = null;
	let className = null

	for (const arg of node.children) {
		if (arg.type === 'argument_list') {
			classArgs = utils.getArgumentList(arg.children);
		}else if (arg.type === "identifier") {
			className = arg.text;
		}
	}

	// add the init in blockly so that is not added again
	
	const classDeclaration = {
		type: 'define_class_declaration',
		fields: { VAR: { name: 'VAR', id: Blockly.utils.genUid(), value: identifier }, NAME: className},
		values: {
		},
		mutations: {
			items: 0
		},
		statementsNode: {items0: classArgs},
		statements: null,
	}


	for (let i = 0; i < classArgs.length; i++) {
		classDeclaration.values[`items${i}`] = null;
		classDeclaration.statementsNode[`items${i}`] = classArgs[i];
		classDeclaration.mutations.items++;
	}

	// Blockly.Python.addInit('lcd1602', `${identifier} = LCD1602(i2c=I2C(scl=Pin(22), sda=Pin(21)))`);
    // to rework
    Blockly.Python.addInit('bmp280', `${identifier} = BMP280(i2c=I2C(0, scl=Pin(" + JSON.parse(pin).scl + "), sda=Pin(" + JSON.parse(pin).sda + "), addr=" + addr + "))`);


	return classDeclaration;
}