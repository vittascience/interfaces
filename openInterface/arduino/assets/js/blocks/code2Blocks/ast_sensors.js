import utils from '/openInterface/interfaces/assets/js/code2blocks/cpp/utils/utils.js';


utils.prototypeBlocks['sgp30_readCO2'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_getSgp30Gas',
        fields: {GAS: 'CO2'},
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    }
};

utils.prototypeBlocks['sgp30_readTVOC'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_getSgp30Gas',
        fields: {GAS: 'TVOC'},
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    }
}

