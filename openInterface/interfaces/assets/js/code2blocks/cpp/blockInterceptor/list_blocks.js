import utils from '/openInterface/interfaces/assets/js/code2blocks/cpp/utils/utils.js';


utils.interceptors['array_length'] = function (varName) {

    return {
        type: 'lists_length',
        fields: {},
        values: { LIST: null },
        mutations: null,
        statementsNode: { LIST: { type: 'identifier', text: varName } },
        statement: null,
    };
};