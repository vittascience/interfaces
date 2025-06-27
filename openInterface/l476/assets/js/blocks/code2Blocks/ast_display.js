import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const COLOURS_FOR_LED_MATRIX = {
	'0' : '#ff0000',
	'1' : '#ff0600',
	'2' : '#ff0c00',
	'3' : '#ff1200',
	'4' : '#ff1800',
	'5' : '#ff1e00',
	'6' : '#ff2400',
	'7' : '#ff2a00',
	'8' : '#ff3000',
	'9' : '#ff3600',
	'10' : '#ff3c00',
	'11' : '#ff4200',
	'12' : '#ff4800',
	'13' : '#ff4e00',
	'14' : '#ff5400',
	'15' : '#ff5a00',
	'16' : '#ff6000',
	'17' : '#ff6600',
	'18' : '#ff6c00',
	'19' : '#ff7200',
	'20' : '#ff7800',
	'21' : '#ff7e00',
	'22' : '#ff8400',
	'23' : '#ff8a00',
	'24' : '#ff9000',
	'25' : '#ff9600',
	'26' : '#ff9c00',
	'27' : '#ffa200',
	'28' : '#ffa800',
	'29' : '#ffae00',
	'30' : '#ffb400',
	'31' : '#ffba00',
	'32' : '#ffc000',
	'33' : '#ffc600',
	'34' : '#ffcc00',
	'35' : '#ffd200',
	'36' : '#ffd800',
	'37' : '#ffde00',
	'38' : '#ffe400',
	'39' : '#ffea00',
	'40' : '#fff000',
	'41' : '#fff600',
	'42' : '#ffff00',
	'43' : '#f9ff00',
	'44' : '#f3ff00',
	'45' : '#edff00',
	'46' : '#e7ff00',
	'47' : '#e1ff00',
	'48' : '#dbff00',
	'49' : '#d5ff00',
	'50' : '#cfff00',
	'51' : '#c9ff00',
	'52' : '#c3ff00',
	'53' : '#bdff00',
	'54' : '#b7ff00',
	'55' : '#b1ff00',
	'56' : '#abff00',
	'57' : '#a5ff00',
	'58' : '#9fff00',
	'59' : '#99ff00',
	'60' : '#93ff00',
	'61' : '#8dff00',
	'62' : '#87ff00',
	'63' : '#81ff00',
	'64' : '#7bff00',
	'65' : '#75ff00',
	'66' : '#6fff00',
	'67' : '#69ff00',
	'68' : '#63ff00',
	'69' : '#5dff00',
	'70' : '#57ff00',
	'71' : '#51ff00',
	'72' : '#4bff00',
	'73' : '#45ff00',
	'74' : '#3fff00',
	'75' : '#39ff00',
	'76' : '#33ff00',
	'77' : '#2dff00',
	'78' : '#27ff00',
	'79' : '#21ff00',
	'80' : '#1bff00',
	'81' : '#15ff00',
	'82' : '#0fff00',
	'83' : '#09ff00',
	'84' : '#03ff00',
	'85' : '#00ff00',
	'86' : '#00ff06',
	'87' : '#00ff0c',
	'88' : '#00ff12',
	'89' : '#00ff18',
	'90' : '#00ff1e',
	'91' : '#00ff24',
	'92' : '#00ff2a',
	'93' : '#00ff30',
	'94' : '#00ff36',
	'95' : '#00ff3c',
	'96' : '#00ff42',
	'97' : '#00ff48',
	'98' : '#00ff4e',
	'99' : '#00ff54',
	'100' : '#00ff5a',
	'101' : '#00ff60',
	'102' : '#00ff66',
	'103' : '#00ff6c',
	'104' : '#00ff72',
	'105' : '#00ff78',
	'106' : '#00ff7e',
	'107' : '#00ff84',
	'108' : '#00ff8a',
	'109' : '#00ff90',
	'110' : '#00ff96',
	'111' : '#00ff9c',
	'112' : '#00ffa2',
	'113' : '#00ffa8',
	'114' : '#00ffae',
	'115' : '#00ffb4',
	'116' : '#00ffba',
	'117' : '#00ffc0',
	'118' : '#00ffc6',
	'119' : '#00ffcc',
	'120' : '#00ffd2',
	'121' : '#00ffd8',
	'122' : '#00ffde',
	'123' : '#00ffe4',
	'124' : '#00ffea',
	'125' : '#00fff0',
	'126' : '#00fff6',
	'127' : '#00fffc',
	'128' : '#00ffff',
	'129' : '#00f9ff',
	'130' : '#00f3ff',
	'131' : '#00edff',
	'132' : '#00e7ff',
	'133' : '#00e1ff',
	'134' : '#00dbff',
	'135' : '#00d5ff',
	'136' : '#00cfff',
	'137' : '#00c9ff',
	'138' : '#00c3ff',
	'139' : '#00bdff',
	'140' : '#00b7ff',
	'141' : '#00b1ff',
	'142' : '#00abff',
	'143' : '#00a5ff',
	'144' : '#009fff',
	'145' : '#0099ff',
	'146' : '#0093ff',
	'147' : '#008dff',
	'148' : '#0087ff',
	'149' : '#0081ff',
	'150' : '#007bff',
	'151' : '#0075ff',
	'152' : '#006fff',
	'153' : '#0069ff',
	'154' : '#0063ff',
	'155' : '#005dff',
	'156' : '#0057ff',
	'157' : '#0051ff',
	'158' : '#004bff',
	'159' : '#0045ff',
	'160' : '#003fff',
	'161' : '#0039ff',
	'162' : '#0033ff',
	'163' : '#002dff',
	'164' : '#0027ff',
	'165' : '#0021ff',
	'166' : '#001bff',
	'167' : '#0015ff',
	'168' : '#000fff',
	'169' : '#0009ff',
	'170' : '#0000ff',
	'171' : '#0600ff',
	'172' : '#0c00ff',
	'173' : '#1200ff',
	'174' : '#1800ff',
	'175' : '#1e00ff',
	'176' : '#2400ff',
	'177' : '#2a00ff',
	'178' : '#3000ff',
	'179' : '#3600ff',
	'180' : '#3c00ff',
	'181' : '#4200ff',
	'182' : '#4800ff',
	'183' : '#4e00ff',
	'184' : '#5400ff',
	'185' : '#5a00ff',
	'186' : '#6000ff',
	'187' : '#6600ff',
	'188' : '#6c00ff',
	'189' : '#7200ff',
	'190' : '#7800ff',
	'191' : '#7e00ff',
	'192' : '#8400ff',
	'193' : '#8a00ff',
	'194' : '#9000ff',
	'195' : '#9600ff',
	'196' : '#9c00ff',
	'197' : '#a200ff',
	'198' : '#a800ff',
	'199' : '#ae00ff',
	'200' : '#b400ff',
	'201' : '#ba00ff',
	'202' : '#c000ff',
	'203' : '#c600ff',
	'204' : '#cc00ff',
	'205' : '#d200ff',
	'206' : '#d800ff',
	'207' : '#de00ff',
	'208' : '#e400ff',
	'209' : '#ea00ff',
	'210' : '#f000ff',
	'211' : '#f600ff',
	'212' : '#ff00ff',
	'213' : '#ff00f9',
	'214' : '#ff00f3',
	'215' : '#ff00ed',
	'216' : '#ff00e7',
	'217' : '#ff00e1',
	'218' : '#ff00db',
	'219' : '#ff00d5',
	'220' : '#ff00cf',
	'221' : '#ff00c9',
	'222' : '#ff00c3',
	'223' : '#ff00bd',
	'224' : '#ff00b7',
	'225' : '#ff00b1',
	'226' : '#ff00ab',
	'227' : '#ff00a5',
	'228' : '#ff009f',
	'229' : '#ff0099',
	'230' : '#ff0093',
	'231' : '#ff008d',
	'232' : '#ff0087',
	'233' : '#ff0081',
	'234' : '#ff007b',
	'235' : '#ff0075',
	'236' : '#ff006f',
	'237' : '#ff0069',
	'238' : '#ff0063',
	'239' : '#ff005d',
	'240' : '#ff0057',
	'241' : '#ff0051',
	'242' : '#ff004b',
	'243' : '#ff0045',
	'244' : '#ff003f',
	'245' : '#ff0039',
	'246' : '#ff0033',
	'247' : '#ff002d',
	'248' : '#ff0027',
	'249' : '#ff0021',
	'250' : '#ff001b',
	'251' : '#ff0015',
	'252' : '#ff000f',
	'253' : '#ff0009',
	'254' : '#ffffff',
	'255' : '#000000'
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
	classVariable.ledCount = statementsNode[1].text;
	return {
		type: 'display_defineNeopixel',
		fields: { PIN: `'${Python2Blocks._classes[pin].pin}'` },
		values: {
			N: null,
		},
		mutations: null,
		statementsNode: { N: statementsNode[1] },
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
			statementsNode: { LED: index, COLOR: { type: "bypass", block: 'color_picker', text: convertRGB } },
			statements: null,
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


utils.prototypeBlocks['write'] = function (type, classDeclaration) {
	const checkClasses = utils.python2Blocks._classes[classDeclaration]
	if (checkClasses) {
		return "used";
	} else {
		return null;
	}
};

utils.prototypeBlocks['pyb.LED'] = function (type, identifier, values, mutations, statementsNode, statement, parent) {
	const Python2Blocks = window.Python2Blocks;
	const checkImport = Python2Blocks._imports.has('pyb');
	if (!checkImport) {
		return null;
	}

	const classVariable = Python2Blocks._classes[parent.children[0].text];
	classVariable.ledValue = statementsNode[0].text;
	classVariable.builtin_led = true;
	return "";
};


utils.prototypeBlocks['HT16K33Matrix'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
	// TODO add the correct check for class declaration
	return 'HT16K33Matrix';
};

function convertEscapedHexToBinary(escapedHexString) {
    // Remplacer les séquences "\\x" par "0x" pour faciliter la conversion
    let cleanedString = escapedHexString.replace(/\\x/g, '0x');
    
    // Trouver toutes les séquences hexadécimales sous la forme "0xNN"
    let hexArray = cleanedString.match(/0x[0-9A-Fa-f]{2}/g);
    
    if (!hexArray) return []; // Si aucune séquence hex n'est trouvée, retourner un tableau vide
    
    // Convertir chaque séquence hexadécimale en binaire
    let binaryArray = hexArray.map(hex => {
        let decimal = parseInt(hex, 16);
        return decimal.toString(2).padStart(8, '0');
    });

    return binaryArray;
}

utils.prototypeBlocks['set_icon'] = function (node, identifier, values, mutations, statementsNode, ) {
	
	const checkClasses = utils.python2Blocks._classes[identifier];
	
	if (!checkClasses) {
		return null
	}

	let hexString = '01111110,01000010,01111110,00000001,00000001,01111110,01000010,01111110';

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
	
}

utils.prototypeBlocks['draw'] = function (node, identifier, values, mutations, statementsNode, ) {
	const checkClasses = utils.python2Blocks._classes[identifier];
	if (!checkClasses) {
		return null
	}
	
	const icon = checkClasses.icon ? checkClasses.icon : '01111110,01000010,01111110,00000001,00000001,01111110,01000010,01111110';


	// add the update function to the end of the process to update the image in the block
	utils.python2Blocks.interface_specific_end.HT16K33Matrix = LedMatrixModalManager.updateImageMono;

	return {
		type: 'display_led_matrix_DrawBitmap',
		fields: {HIDDEN_MONO_LEDS_MATRIX: icon},
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	}
}

utils.prototypeBlocks['GroveTwoRGBLedMatrix'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
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
				let colorHex = "#" + decimalValue.toString(16).padStart(2, '0') + "0000";
				frames.push(COLOURS_FOR_LED_MATRIX[decimalValue] || COLOURS_FOR_LED_MATRIX[254]);
			});
		} 
	}

	let temp_matrix = [], row = [];
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
		type : "display_rgb_led_matrix_DrawBitmap",
		fields: {HIDDEN_RGB_LEDS_MATRIX: reverse_matrix.join(",")},
		mutations: {DURATION: duration},
		values: null,
		statementsNode: null,
		statement: null,
	}

}


utils.prototypeBlocks['LCD1602'] = function (node, identifier) {
	let classArgs = null;
	let className = null

	for (const arg of node.children) {
		if (arg.type === 'argument_list') {
			classArgs = utils.getArgumentList(arg.children);
		}else if (arg.type === "identifier") {
			className = arg.text;
		}
	}


	Blockly.Python.addInit('lcd1602', `${identifier} = LCD1602(i2c=machine.I2C(1))`);


	// return classDeclaration;
	return "LCD1602";
}

utils.prototypeBlocks['setCursor'] = function (method, identifier, values, mutations, statementsNode) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return null;
	}
	let line = null;
	let pos = null;
	// let pin = {"scl":Number(checkClasses.i2c.scl.text) || 9, "sda":Number(checkClasses.i2c.sda.text) || 8};
	for (const element of statementsNode){
		if (element.type === "integer" && line === null){
			line = element.text;
		} else if (element.type === "integer" && line !== null){
			pos = element.text;
		}
			
	}
	// checkClasses.pin = pin;
	checkClasses.line = line;
	checkClasses.pos = pos;

	return "setCursor"
	
};

utils.prototypeBlocks['writeTxt'] = function (method, identifier, values, mutations, statementsNode) {
	const classes = utils.python2Blocks._classes;
	const checkClasses = classes[identifier];
	if (!checkClasses) {
		return null;
	}
	let text = null;
	for (const element of statementsNode){
		if (element.type === "string"){
			text = element;
		}
	}
	checkClasses.text = text;
	
	return {
		type: 'display_lcdSetText',
		fields: { LINE: checkClasses.line, POS: checkClasses.pos },
		values: {
			TEXT: null,
		},
		mutations: null,
		statementsNode: { TEXT: text },
		statements: null,
	}
}

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
	}
}	