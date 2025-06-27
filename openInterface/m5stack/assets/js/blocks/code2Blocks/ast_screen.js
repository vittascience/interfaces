import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['M5Title'] = function (type, fields, values, mutations, statementsNode, statement) {
	const m5stackDict = window.Python2Blocks._dictionary;

	const title = statementsNode.filter((child) => child.text.match(/element_Title_/gi))[0].text;
	const id = title.split('_')[3];
	const dictName = title.split('_')[0];

	let titleText = null;
	let position = null;
	let id_value = null;
	for (const keywordArgs of statementsNode) {
		if (keywordArgs.type === 'keyword_argument' && keywordArgs.children.length > 0) {
			const keyword = keywordArgs.children[0].text;
			if (keyword === 'title') {
				titleText = keywordArgs.children[2];
			} else if (keyword === 'x') {
				position = keywordArgs.children[2];
			}
		}
	}

	if (titleText && position) {
		return {
			type: 'screen_M5Title_define',
			fields: null,
			values: {
				ID: null,
				TITLE: null,
				POSITION: null,
			},
			mutations: null,
			statementsNode: { ID: { type: 'string', text: id }, TITLE: titleText, POSITION: position },
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['setFgColor'] = function (method, subscriptDict, values, mutations, statementsNode, statement) {
	const dictionaries = window.Python2Blocks._dictionary;
	const obj = subscriptDict.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\[(?:"|')([^"'[\]]+)(?:"|')\]\[(?:"|')([^"'[\]]+)(?:"|')\]$/);

	let dictName = null;
	let element = null;
	let id = null;
	if (obj.length === 4) {
		dictName = obj[1];
		element = obj[2] + '_' + obj[3];
		id = obj[3];
	}

	let color = 'ff0000';

	for (const node of statementsNode) {
		if (node.type === 'integer') {
			const checkColor = utils.checkBlocklyColor(node.text.replace('0x', '#'));
			if (checkColor) {
				color = node.text.replace('0x', '#');
			} else {
				// color = utils.convertHexToRgb(node.text.replace('0x', '#'));
				color = node.text.replace('0x', '#');
			}
		}
	}
	color = color.replace('0x', '#');

	if (dictionaries[dictName] && dictionaries[dictName][element]) {
		if (typeof color === 'string') {
			return {
				type: 'screen_M5Title_setFgColor',
				fields: null,
				values: {
					ID: null,
					FGCOLOR: null,
				},
				mutations: null,
				statementsNode: { ID: { type: 'string', text: id }, FGCOLOR: { type: 'bypass', block: 'color_picker', text: color } },
			};
		} else {
			// handle the case of a color_rgb block 😡
			return null;
		}
	} else {
		return null;
	}
};

utils.prototypeBlocks['setBgColor'] = function (method, subscriptDict, values, mutations, statementsNode, statement) {
	const dictionaries = window.Python2Blocks._dictionary;
	const obj = subscriptDict.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\[(?:"|')([^"'[\]]+)(?:"|')\]\[(?:"|')([^"'[\]]+)(?:"|')\]$/);

	let dictName = null;
	let element = null;
	let id = null;
	if (obj.length === 4) {
		dictName = obj[1];
		element = obj[2] + '_' + obj[3];
		id = obj[3];
	}

	let color = 'ff0000';

	for (const node of statementsNode) {
		if (node.type === 'integer') {
			const checkColor = utils.checkBlocklyColor(node.text.replace('0x', '#'));
			if (checkColor) {
				color = node.text.replace('0x', '#');
			} else {
				// color = utils.convertHexToRgb(node.text.replace('0x', '#'));
				color = node.text.replace('0x', '#');
			}
		}
	}


	if (dictionaries[dictName] && dictionaries[dictName][element]) {
		if (typeof color === 'string') {
			return {
				type: 'screen_M5Title_setBgColor',
				fields: null,
				values: {
					ID: null,
					BGCOLOR: null,
				},
				mutations: null,
				statementsNode: { ID: { type: 'string', text: id }, BGCOLOR: { type: 'bypass', block: 'color_picker', text: color } },
			};
		} else {
			// handle the case of a color_rgb block 😡
			return null;
		}
	} else {
		return null;
	}
};

utils.prototypeBlocks['setTitle'] = function (method, subscriptDict, values, mutations, statementsNode, statement) {
	const dictionaries = window.Python2Blocks._dictionary;
	const obj = subscriptDict.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\[(?:"|')([^"'[\]]+)(?:"|')\]\[(?:"|')([^"'[\]]+)(?:"|')\]$/);

	let dictName = null;
	let element = null;
	let id = null;
	if (obj.length === 4) {
		dictName = obj[1];
		element = obj[2] + '_' + obj[3];
		id = obj[3];
	}

	let title = null;

	for (const node of statementsNode) {
		if (node.type === 'string') {
			title = node;
		}
	}

    return {
        type: 'screen_M5Title_setTitle',
        fields: null,
        values: {
            ID: null,
            TITLE: null,
        },
        mutations: null,
        statementsNode: { ID: { type: 'string', text: id }, TITLE: statementsNode[0] },
    };
    // Keep it just in case we need to check if the element is in the dictionary for the future (shloud not work in theorie, but otherwise it will make block disappear)
	// if (dictionaries[dictName] && dictionaries[dictName][element]) {
	// 	return {
	// 		type: 'screen_M5Title_setTitle',
	// 		fields: null,
	// 		values: {
	// 			ID: null,
	// 			TITLE: null,
	// 		},
	// 		mutations: null,
	// 		statementsNode: { ID: { type: 'string', text: id }, TITLE: statementsNode[0] },
	// 	};
	// } else {
	// 	return null;
	// }
};


utils.prototypeBlocks['show'] = function (method, subscriptDict, values, mutations, statementsNode, statement) {
    const dictionaries = window.Python2Blocks._dictionary;
    const obj = subscriptDict.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\[(?:"|')([^"'[\]]+)(?:"|')\]\[(?:"|')([^"'[\]]+)(?:"|')\]$/);

    let dictName = null;
    let element = null;
    let id = null;
    if (obj.length === 4) {
        dictName = obj[1];
        element = obj[2] + '_' + obj[3];
        id = obj[3];
    }

    if (dictionaries[dictName] && dictionaries[dictName][element]) {
        return {
            type: 'screen_M5Title_controlDisplay',
            fields: null,
            values: {
                ID: null,
                STATE: null,
            },
            mutations: null,
            statementsNode: { ID: { type: 'string', text: id }, STATE: {type:"bypass", block: "HIGH_STATE_BOOL", text:"HIGH", children:[]} },
        };
    } else {
        return null;
    }
};

utils.prototypeBlocks['hide'] = function (method, subscriptDict, values, mutations, statementsNode, statement) {
    const dictionaries = window.Python2Blocks._dictionary;
    const obj = subscriptDict.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\[(?:"|')([^"'[\]]+)(?:"|')\]\[(?:"|')([^"'[\]]+)(?:"|')\]$/);

    let dictName = null;
    let element = null;
    let id = null;
    if (obj.length === 4) {
        dictName = obj[1];
        element = obj[2] + '_' + obj[3];
        id = obj[3];
    }

    if (dictionaries[dictName] && dictionaries[dictName][element]) {
        return {
            type: 'screen_M5Title_controlDisplay',
            fields: null,
            values: {
                ID: null,
                STATE: null,
            },
            mutations: null,
            statementsNode: { ID: { type: 'string', text: id }, STATE: {type:"bypass", block: "LOW_STATE_BOOL", text:"HIGH", children:[]} },
        };
    } else {
        return null;
    }
}

utils.prototypeBlocks['M5TextBox'] = function (type, fields, values, mutations, statementsNode, statement) {
    const m5stackDict = window.Python2Blocks._dictionary;
    const title = statementsNode.filter((child) => child.text.match(/element_TextBox_/gi))[0].text;
    const id = title.split('_')[3];
    const dictName = title.split('_')[0];

    let x = statementsNode[0] || { type: 'integer', text: '225' };
    let y = statementsNode[1] || { type: 'integer', text: '98' };
    let titleElement = statementsNode[2] || { type: 'string', text: 'Text'};


    return {
        type: 'screen_M5TextBox_define',
        fields: null,
        values: {
            ID: null,
            X: null,
            Y: null,
            TEXT: null,
        },
        mutations: null,
        statementsNode: { ID: { type: 'string', text: id }, X: x, Y: y, TEXT: titleElement },
    };
    
};

utils.prototypeBlocks['setText'] = function (method, subscriptDict, values, mutations, statementsNode, statement) {
    const dictionaries = window.Python2Blocks._dictionary;
	const obj = subscriptDict.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\[(?:"|')([^"'[\]]+)(?:"|')\]\[(?:"|')([^"'[\]]+)(?:"|')\]$/);

	let dictName = null;
	let element = null;
	let id = null;
	if (obj.length === 4) {
		dictName = obj[1];
		element = obj[2] + '_' + obj[3];
		id = obj[3];
	}

	let TEXT = null;

	for (const node of statementsNode) {
		if (node.type === 'string') {
			TEXT = node;
		}
	}
    return {
        type: 'screen_M5TextBox_setText',
        fields: null,
        values: {
            ID: null,
            TEXT: null,
        },
        mutations: null,
        statementsNode: { ID: { type: 'string', text: id }, TEXT: statementsNode[0] },
    };

    
};