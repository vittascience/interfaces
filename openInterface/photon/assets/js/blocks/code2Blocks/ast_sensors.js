import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['get_distance_from_obstacle'] = function (type, identifier, values, mutations, statementsNode, statement) {
    return {
        type: 'sensors_get_distance_from_obstacle',
        fields: null,
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    }
};

utils.prototypeBlocks['photon.get_line_sensors()'] = function (identifier, index) {
    let sensor = "0"
    if (index.type === 'integer'){
        sensor = index.text !== "0" && index.text !== "2" ? "0" : index.text
    }

    return {
        type: 'sensors_get_line_sensors',
        fields: {SENSOR: sensor},
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    }
}

utils.prototypeBlocks['photon.get_light'] = function () {
    return {
        type: 'sensors_get_light',
        fields: null,
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    }
};

utils.prototypeBlocks['photon.get_battery'] = function () {
    return {
        type: 'sensors_get_battery',
        fields: null,
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    }
}