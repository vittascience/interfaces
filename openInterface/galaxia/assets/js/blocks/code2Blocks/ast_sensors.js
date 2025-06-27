import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


// luminosity
utils.prototypeBlocks['led.read_light_level'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_getLight',
        fields: null,
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
};

// temperature
utils.prototypeBlocks['temperature'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_getTemperature',
        fields: { UNIT: 'CELSIUS' },
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
};

// accelerometer
utils.prototypeBlocks['accelerometer.get_x'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_getAcceleration',
        fields: { AXIS: 'x' },
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
};

utils.prototypeBlocks['accelerometer.get_y'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_getAcceleration',
        fields: { AXIS: 'x' },
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
};

utils.prototypeBlocks['accelerometer.get_z'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_getAcceleration',
        fields: { AXIS: 'z' },
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
};

// compass
utils.prototypeBlocks['compass.heading'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_getCompass',
        fields: null,
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
};

utils.prototypeBlocks['compass.get_x'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_getMagneticForce',
        fields: { AXIS: 'x' },
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
};

utils.prototypeBlocks['compass.get_y'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_getMagneticForce',
        fields: { AXIS: 'y' },
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
};

utils.prototypeBlocks['compass.get_z'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_getMagneticForce',
        fields: { AXIS: 'z' },
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
};

utils.prototypeBlocks['compass.is_calibrated'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_isCompassCalibrated',
        fields: null,
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
};

utils.prototypeBlocks['compass.calibrate'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_calibrateCompass',
        fields: null,
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
};
