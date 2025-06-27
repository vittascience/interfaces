import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['elio.moveForward'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    const Python2Blocks = window.Python2Blocks;
    const checkImport = Python2Blocks._imports.has('elio');
    if (!checkImport) {
        return null;
    }

    let speed = null;

    if (statementsNode[0]){
        speed = statementsNode[0];
    } else {
        speed = { type: 'integer', text: '100' };
    }
    return {
        type: 'robot_move',
        fields: {DIRECTION: 'forward'},
        values: {SPEED: null},
        mutations: null,
        statementsNode: {SPEED: speed},
        statement: null
    };
};

utils.prototypeBlocks['elio.moveBackward'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    const Python2Blocks = window.Python2Blocks;
    const checkImport = Python2Blocks._imports.has('elio');
    if (!checkImport) {
        return null;
    }

    let speed = null;

    if (statementsNode[0]){
        speed = statementsNode[0];
    } else {
        speed = { type: 'integer', text: '100' };
    }
    return {
        type: 'robot_move',
        fields: {DIRECTION: 'backward'},
        values: {SPEED: null},
        mutations: null,
        statementsNode: {SPEED: speed},
        statement: null
    };
};   