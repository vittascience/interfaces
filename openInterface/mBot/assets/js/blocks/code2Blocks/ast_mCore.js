import utils from '/openInterface/interfaces/assets/js/code2blocks/cpp/utils/utils.js';

utils.prototypeBlocks['rgbled_board.setColor'] = function (type, fields, values, mutations, statementsNode, statement) {
    let rgb;
    let position = 1;
    if (statementsNode.length === 4){
        position = statementsNode[0].type === "number_literal" ? statementsNode[0].text : 1;
        rgb = [...statementsNode.slice(1)];
    }

    const convertRGB = utils.convertRBGtoHex(rgb);
    if (convertRGB === null) {
        return {
            type: 'robots_setmBotRgbLed',
            fields: { LED: position },
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
            type: 'robots_setmBotPaletteRgbLed',
            fields: { LED: position },
            values: {
                COLOR: null,
            },
            mutations: null,
            statementsNode: { COLOR: { type: 'bypass', block: 'color_picker', text: convertRGB } },
            statements: null,
        };
    }


};

utils.prototypeBlocks['rgbled_board.show'] = function (type, fields, values, mutations, statementsNode, statement) {
    return 'show';
};

utils.prototypeBlocks['ir.keyPressed'] = function (type, fields, values, mutations, statementsNode, statement) {
    const remoteValues = [
        "69", "70", "71", "68", "67", "13", 
        "64", "25", "7", "9", "21", "22", 
        "12", "24", "94", "8", "28", "90", 
        "66", "82", "74"
    ];

    const value = statementsNode[0].text;

    return {
        type: 'robots_getmBotRemoteControlButton',
        fields: { BUTTON: remoteValues.includes(value) ? value : "69" },
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    }

};

utils.prototypeBlocks['ir.begin'] = function (type, fields, values, mutations, statementsNode, statement) {
    return 'begin';
};

utils.prototypeBlocks['ir.sendString'] = function (type, fields, values, mutations, statementsNode, statement) {
    let string = null;
    for (const child of statementsNode) {

        if (string === null) {
            string = child;
        }
    }

    return {
        type: 'robots_sendmBotIrMessage',
        fields: {},
        values: { TEXT: null },
        mutations: null,
        statementsNode: { TEXT: string || {type: "string_literal", text:'""', children:[]} },
        statement: null,
    }
}


utils.prototypeBlocks['lightSensor_board.read'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'robots_getmBotSensorLight',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    }
}

utils.prototypeBlocks['buttonPressed'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'robots_getmBotButtonState',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    }
}

utils.prototypeBlocks['buzzer.tone'] = function (type, fields, values, mutations, statementsNode, statement) {
    let freq = null;
    let time = null;
    for (const child of statementsNode) {
        if (freq === null && (child.type === 'number_literal' || child.type === 'identifier')) {
            freq = child;
        } else if (time === null && (child.type === 'number_literal' || child.type === 'identifier')) {
            time = child;
        }
    }

    return {
        type: 'robots_setmBotBuzzer',
        fields: {},
        values: {
            FREQUENCY: null,
            TIME: null,
        },
        mutations: null,
        statementsNode: { FREQUENCY: freq || {type: "number_literal", text:'440', children:[]}, TIME: time || {type: "number_literal", text:'0', children:[]} },
        statement: null,
    }
}

const musicBuzzer = ["Gamme", "StarWars", "R2D2"];
for (let i = 0; i < musicBuzzer.length; i++) {
    utils.prototypeBlocks[`Buzzer${musicBuzzer[i]}`] = function (type, fields, values, mutations, statementsNode, statement) {
        return {
            type: 'robots_playmBotMusic',
            fields: { MUSIC: i },
            values: {},
            mutations: null,
            statementsNode: null,
            statement: null,
        }
    }
}