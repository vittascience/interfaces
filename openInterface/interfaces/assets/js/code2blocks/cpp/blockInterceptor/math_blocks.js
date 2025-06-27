import utils from '/openInterface/interfaces/assets/js/code2blocks/cpp/utils/utils.js';


utils.interceptors['(1+sqrt(5))/2'] = function (node) {
    return {
        type: 'math_constant',
        fields: { CONSTANT: 'GOLDEN_RATIO' },
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };  
};