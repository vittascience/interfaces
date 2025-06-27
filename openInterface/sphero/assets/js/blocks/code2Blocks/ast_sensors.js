import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['get_pitch'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    return {
        type: 'sensors_pitch',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };
};

utils.prototypeBlocks['get_roll'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    return {
        type: 'sensors_roll',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };
};

utils.prototypeBlocks['get_yaw'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    return {
        type: 'sensors_yaw',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };
};

utils.prototypeBlocks['get_accelerometer_x'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    return {
        type: 'sensors_accelerometer',
        fields: { AXIS: 'x' },
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };
};

utils.prototypeBlocks['get_accelerometer_y'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    return {
        type: 'sensors_accelerometer',
        fields: { AXIS: 'y' },
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };
};

utils.prototypeBlocks['get_accelerometer_z'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    return {
        type: 'sensors_accelerometer',
        fields: { AXIS: 'z' },
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };
}

utils.prototypeBlocks['get_gyroscope_x'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    return {
        type: 'sensors_gyroscope',
        fields: { AXIS: 'x' },
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };
};

utils.prototypeBlocks['get_gyroscope_y'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    return {
        type: 'sensors_gyroscope',
        fields: { AXIS: 'y' },
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };
};

utils.prototypeBlocks['get_gyroscope_z'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    return {
        type: 'sensors_gyroscope',
        fields: { AXIS: 'z' },
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };
};

utils.prototypeBlocks['get_fall_detection'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    return {
        type: 'sensors_isFallDetected',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };
};