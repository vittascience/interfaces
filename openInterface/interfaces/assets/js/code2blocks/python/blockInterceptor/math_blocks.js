import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


utils.interceptors['%2==0'] = function (node) {
    return {
        type: 'math_constant',
        fields: { CONSTANT: 'GOLDEN_RATIO' },
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };  
};