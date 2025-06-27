import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['define_sphero'] = function(node, parent) {
	return "define_sphero";
}

utils.prototypeBlocks['setLEDColor'] = function(type, fields, values, mutations, statementsNode, statement, parent) {
    let rgbValues = [{type: "integer", text: "255"}, {type: "integer", text: "0"}, {type: "integer", text: "0"}]

    if (statementsNode.length === 3){
        rgbValues = statementsNode
    }

    const convertRGB = utils.convertRBGtoHex(rgbValues);

    if (convertRGB === null) {
        return {
            type: 'display_set_main_LED_RGB',
            fields: {},
            values: {
                R: null,
                G: null,
                B: null
            },
            mutations: null,
            statementsNode: { R: rgbValues[0], G: rgbValues[1], B: rgbValues[2] },
            statement: null,
        };
    } else {
        return {
            type: 'display_set_main_LED_RGB_palette',
            fields: null,
            values: {
                COLOUR: null
            },
            mutations: null,
            statementsNode: {COLOUR: { type: "bypass", block: 'color_picker', text: convertRGB }},
            statement: null,
        };
    }
}


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


utils.prototypeBlocks['fade_in'] = function (type, fields, values, mutations, statementsNode, statement, parent){
    let firstColor = "#FFFFFF"
    let secondColor = "#22b573"
    let speed = {type: "integer", text: "2"}

    if (statementsNode.length === 3){
        if (statementsNode[0].type === 'list'){
            const firstColorArgs = utils.getArgumentList(statementsNode[0].children)
            if (firstColorArgs.length === 3){
                firstColor = utils.convertRBGtoHex(firstColorArgs, true);
            }
        };
        if (statementsNode[1].type === 'list'){
            const secondColorArgs = utils.getArgumentList(statementsNode[1].children)
            if (secondColorArgs.length === 3){
                secondColor = utils.convertRBGtoHex(secondColorArgs, true);
            }
        };
        speed = statementsNode[2] || speed
    }


    return {
        type: 'display_set_main_LED_RGB_fade',
        fields: {},
        values: {
            FROM: null,
            TO: null,
            TIME: null
        },
        mutations: null,
        statementsNode: { FROM: { type: "bypass", block: 'color_picker', text: firstColor }, TO: { type: "bypass", block: 'color_picker', text: secondColor }, TIME: speed },
        statement: null,
    };
}

utils.prototypeBlocks['blink_led'] = function (type, fields, values, mutations, statementsNode, statement, parent){
    let color = "#22b573"
    let speed = {type: "integer", text: "1"}
    let counter = {type: "integer", text: "5"}

    if (statementsNode.length === 3){
        if (statementsNode[0].type === 'list'){
            const colorArgs = utils.getArgumentList(statementsNode[0].children)
            if (colorArgs.length === 3){
                color = utils.convertRBGtoHex(colorArgs, true);
            }
        };
        speed = statementsNode[1] || speed
        counter = statementsNode[2] || counter
    }

    return {
        type: 'display_set_main_LED_RGB_blink',
        fields: {},
        values: {
            COLOUR: null,
            TIME: null,
            COUNTER: null
        },
        mutations: null,
        statementsNode: { COLOUR: { type: "bypass", block: 'color_picker', text: color }, TIME: speed, COUNTER: counter },
        statement: null,
    };
}

utils.prototypeBlocks['setBackLEDIntensity'] = function (type, fields, values, mutations, statementsNode, statement, parent){
    let intensity = {type: "integer", text: "255"}

    if (statementsNode.length === 1){
        intensity = statementsNode[0]
    }

    return {
        type: 'display_set_back_LED_intensity',
        fields: {},
        values: {
            INTENSITY: null
        },
        mutations: null,
        statementsNode: { INTENSITY: intensity },
        statement: null,
    };
}