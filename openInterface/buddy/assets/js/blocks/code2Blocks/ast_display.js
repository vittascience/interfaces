import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';



utils.prototypeBlocks['updateAllLed'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const checkClass = utils.python2Blocks._classes[identifier];
    if (!checkClass) return null;

    const hexColor = statementsNode[0] ? utils.extractString(statementsNode[0]) : { type: 'string', value: '#ff0000' };

    let waiting = 'True';
    if (statementsNode && statementsNode[2]) {
        if (statementsNode[2].type === 'true' || statementsNode[2].type === 'false') {
            waiting = statementsNode[2].type === 'true' ? 'True' : 'False';
        }
    }

    return {
        type: 'display_updateAllLed',
        fields: { LOCK: waiting },
        values: {
            COLOR: null,
        },
        mutations: null,
        statementsNode: { COLOR: { type: 'bypass', block: 'color_picker', text: hexColor.text } },
        statements: null,
    };
}

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