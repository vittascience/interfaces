import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const ledColors = [
    "LIGHTBLUE",
    "YELLOW",
    "RED",
    "LIGHTGREEN",
    "TURQUOISE",
    "DARKGREEN",
    "BLUE",
    "PURPLE",
    "ORANGE",
    "PINK",
    "WHITE",
    "BLACK"
];

const authorizedLED = [
    "eyes",
    "ears",
    "both"
];


const getAttributeIdentifier = (node) => {
    let method = null;
    let subMethod = null;
    for (const child of node.children) {
        if (child.type === 'identifier' && method === null) {
            method = child.text;
        } else if (child.type === 'identifier' && method !== null) {
            subMethod = child.text;
        }
    }

    return {method, subMethod};
}

utils.prototypeBlocks['photon.change_color'] = function(type, fields, values, mutations, statementsNode, statement, parent) {
    let color = "LIGHTBLUE";
    let mode = "eyes";


    if (statementsNode && statementsNode.length === 2){
        if (statementsNode[0].type === 'attribute') {
            const {method, subMethod} = getAttributeIdentifier(statementsNode[0]);
            if (method === 'Color' && ledColors.includes(subMethod.toUpperCase())) {
                color = subMethod.toUpperCase();
            }
        }

        if (statementsNode[1].type === 'attribute') {
            const {method, subMethod} = getAttributeIdentifier(statementsNode[1]);
            if (method === 'ColorMode' && authorizedLED.includes(subMethod)) {
                mode = subMethod;
            }
        }
    }

    return {
        type: 'display_change_color',
        fields: { COLOR: color, MODE: mode },
        values: {},
        mutations: null,
        statementsNode: null,
        statements: null,
    };

};


utils.prototypeBlocks['photon.change_color_rgb'] = function(type, fields, values, mutations, statementsNode, statement, parent) {
    let rgbDefault = [{type: 'integer', text: '255'}, {type: 'integer', text: '0'}, {type: 'integer', text: '0'}];

    let mode = "eyes";

    let rgb = null;
    if (statementsNode && statementsNode.length === 4){
        rgb = statementsNode.slice(0, 3);
        rgb = utils.convertRBGtoHex(rgb);

        if (statementsNode[3].type === 'attribute') {
            const {method, subMethod} = getAttributeIdentifier(statementsNode[3]);
            if (method === 'ColorMode' && authorizedLED.includes(subMethod)) {
                mode = subMethod;
            }
        }
    }

    if (rgb === null){
        return {
            type: 'display_change_color_rgb',
            fields: { MODE: mode },
            values: {
                R: null,
                G: null,
                B: null
            },
            mutations: null,
            statementsNode: {
                R: statementsNode[0] || rgbDefault[0],
                G: statementsNode[1] || rgbDefault[1],
                B: statementsNode[2] || rgbDefault[2]
            },
            statements: null,
        }
    } else {
        return {
            type: 'display_change_color_rgb_palette',
            fields: { MODE: mode },
            values: {
                COLOUR: null
            },
            mutations: null,
            statementsNode: {
                COLOUR: {
                    type: 'bypass',
                    block: 'color_picker',
                    text: rgb
                }
            },
            statements: null,
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

