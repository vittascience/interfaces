import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


utils.prototypeBlocks['elio.getObstacle'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    const Python2Blocks = window.Python2Blocks;
    const checkImport = Python2Blocks._imports.has('elio');
    if (!checkImport) {
        return null;
    }

    let sensor = null;

    if (statementsNode[0] && statementsNode[0].type === 'integer'){
        sensor = Number(statementsNode[0].text) >= 0  && Number(statementsNode[0].text) < 4 ? statementsNode[0].text : '1';
    }

    return {
        type: 'sensors_read_obstacle',
        fields: {DIRECTION: sensor},
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null
    };
};