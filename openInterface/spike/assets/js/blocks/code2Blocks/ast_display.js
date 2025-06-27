import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const ledColors = [
    "BLACK",
    "VIOLET",
    "PURPLE",
    "BLUE",
    "AZURE",
    "TURQUOISE",
    "GREEN",
    "YELLOW",
    "ORANGE",
    "RED",
    "WHITE"
];

const authorizedPorts = [
    "A",
    "B"
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

utils.prototypeBlocks['color_matrix.show'] = function(type, fields, values, mutations, statementsNode, statement, parent) {

    let port = "A";

    let color = "GREEN";

    let ColorMatrix = {
        LED00 : "FALSE",
        LED01 : "FALSE",
        LED02 : "FALSE",
        LED10 : "FALSE",
        LED11 : "FALSE",
        LED12 : "FALSE",
        LED20 : "FALSE",
        LED21 : "FALSE",
        LED22 : "FALSE",
    }

    const colorMapping = {
        "BLACK": "rgb(0, 0, 0)",
        "VIOLET": "rgb(238, 130, 238)",
        "PURPLE": "rgb(128, 0, 128)",
        "BLUE": "rgb(0, 0, 255)",
        "AZURE": "rgb(0, 127, 255)",
        "TURQUOISE": "rgb(64, 224, 208)",
        "GREEN": "rgb(0, 128, 0)",
        "YELLOW": "rgb(255, 255, 0)",
        "ORANGE": "rgb(255, 165, 0)",
        "RED": "rgb(255, 0, 0)",
        "WHITE": "rgb(255, 255, 255)"
    };

    const needColor = [];
    const retrievedColors = [];

    if (statementsNode && statementsNode.length > 1){
        if (statementsNode[0].type === 'attribute') {

            const {method, subMethod} = getAttributeIdentifier(statementsNode[0]);
            if (method === 'port' && authorizedPorts.includes(subMethod)) {
                port = subMethod;
            }
        }

        if (statementsNode[1].type === "list") {
            for (const child of statementsNode[1].children) {
                if (child.type === 'attribute') {
                    const {method, subMethod} = getAttributeIdentifier(child);
                    if (method === 'color' && ledColors.includes(subMethod)) {
                        needColor.push("TRUE");
                        retrievedColors.push(subMethod);
                    } else {
                        needColor.push("FALSE");
                        retrievedColors.push("WHITE");
                    }
                }
            }
        }
    }

    const leds = Object.keys(ColorMatrix);

    for (let i = 0; i < leds.length; i++) {
        if (needColor[i]) {
            ColorMatrix[leds[i]] = needColor[i];
        } else {
            ColorMatrix[leds[i]] = "FALSE";
        }
    }

    const ledBlock = {
        type: 'display_show_leds',
        fields: { COLOR: color, PORT: port },
        extra: {},
        values: {
        },
        mutations: null,
        statementsNode: {},
        statements: null,
    }

    for (const led of leds) {
        ledBlock.fields[led] = ColorMatrix[led];
    }

    let ledHiddenString = "";
    for (let i = 0; i < leds.length; i++) {
        ledBlock.extra[leds[i]] = colorMapping[retrievedColors[i]];
        if (i === 0) {
            ledHiddenString += colorMapping[retrievedColors[i]];
        } else {
            ledHiddenString += "/"+ colorMapping[retrievedColors[i]];
        }
    }

    ledBlock.fields['HIDDEN_LEDS_MATRIX'] = ledHiddenString;
    
    // add extra led infos to be able to update the SVG at the end of block injections (exected in the interface_specific_end)
    const specificLedMatrix = utils.python2Blocks.specificBlocsInfo
    specificLedMatrix.push(ledBlock.extra);

    // Methode called in interface_specific_end to update the SVG directly after the block is created => the only way to change the color 
    const updateSVG = () => {
        const allBlocks = utils.python2Blocks.workspace.getAllBlocks();
        for (const block of allBlocks) {
            if (block.type === 'display_show_leds') {
                try {
                    const extras = utils.python2Blocks.specificBlocsInfo;
                    for (let i = 0; i < leds.length; i++) {
                        const ledField = block.getField(leds[i]);
                        if (ledField) {
                            const selectedColor = extras[0][leds[i]];
                            if (typeof ledField.borderRect_ !== 'undefined' && ledField.borderRect_ !== null) {
                                ledField.borderRect_.classList.add('spike-led-matrix');
                                ledField.borderRect_.style = 'fill: ' + selectedColor;
                            }
                        }
                    }
                    // suppress the first element of the array in case of multiple blocks with the same type otherwise blocks will be updated with the same color
                    extras.shift();
                    
                } catch (error) {
                    console.error('Error in updateSVGMatrix', error);
                    
                }
            }
        }

    };

    utils.python2Blocks.interface_specific_end.updateSVGMatrix = updateSVG;
    return ledBlock;
}

utils.prototypeBlocks['color_matrix.set_pixel'] = function(type, fields, values, mutations, statementsNode, statement, parent) {

    let port = "A";

    let x = 0;
    let y = 0;
    let color = "GREEN";

    if (statementsNode && statementsNode.length === 4){
        if (statementsNode[0].type === 'attribute') {

            const {method, subMethod} = getAttributeIdentifier(statementsNode[0]);
            if (method === 'port' && authorizedPorts.includes(subMethod)) {
                port = subMethod;
            }
        }

        x = statementsNode[1]
        y = statementsNode[2]

        if (statementsNode[3].type === 'attribute') {
            const {method, subMethod} = getAttributeIdentifier(statementsNode[3]);
            if (method === 'color' && ledColors.includes(subMethod)) {
                color = subMethod;
            }
        }
    }

    return {
        type: 'display_set_pixel',
        fields: { COLOR: color, PORT: port },
        values: {
            X: null,
            Y: null,
        },
        mutations: null,
        statementsNode: {X: x, Y: y},
        statements: null,
    };
}

utils.prototypeBlocks['color_matrix.set_intensity'] = function(type, fields, values, mutations, statementsNode, statement, parent) {

    let port = "A";

    let intensity = { "type": "integer", "text": 0 };

    if (statementsNode && statementsNode.length === 2){
        if (statementsNode[0].type === 'attribute') {

            const {method, subMethod} = getAttributeIdentifier(statementsNode[0]);
            if (method === 'port' && authorizedPorts.includes(subMethod)) {
                port = subMethod;
            }
        }

        
        intensity = statementsNode[1];
        
    }

    return {
        type: 'display_set_intensity',
        fields: {  PORT: port },
        values: {
            INTENSITY: null,
        },
        mutations: null,
        statementsNode: {INTENSITY: intensity},
        statements: null,
    };
}

