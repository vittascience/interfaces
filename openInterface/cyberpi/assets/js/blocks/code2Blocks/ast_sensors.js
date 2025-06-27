import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

// ESP32 Hall Sensor
utils.prototypeBlocks['esp32.hall_sensor'] = function (type, identifier, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_esp32_hall_sensor',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};


utils.prototypeBlocks['esp32.raw_temperature'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let unit = 'FAHRENHEIT';
    
    // TODO update this to allow unit conversion code
    
    return {
        type: 'sensors_esp32_raw_temperature',
        fields: {
            UNIT: unit
        },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};


utils.prototypeBlocks['cyberpi.get_bri'] = function (type, identifier, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_cyberpi_get_bri',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};


utils.prototypeBlocks['cyberpi.get_loudness'] = function (type, identifier, values, mutations, statementsNode, statement) {

    return {
        type: 'sensors_cyberpi_get_loudness',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};