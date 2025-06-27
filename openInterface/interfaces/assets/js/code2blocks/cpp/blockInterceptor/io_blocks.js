import utils from '/openInterface/interfaces/assets/js/code2blocks/cpp/utils/utils.js';


utils.interceptors['t0=millis()'] = function (node) {
    return {
        type: 'io_initChronometer',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };
};

utils.interceptors['(millis()-t0)/1000.0'] = function (node) {
    return {
        type: 'io_getChronometer',
        fields: {UNIT: '1000.0'},
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };
};

utils.interceptors['(millis()-t0)/1.0'] = function (node) {
    return {
        type: 'io_getChronometer',
        fields: {UNIT: '1.0'},
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };
};