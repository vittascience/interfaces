import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

// "VITTA_API_HOSTNAME = 'raspberrypi'": constant of the undeletable block network_get_pi_name
utils.prototypeBlocks['VITTA_API_HOSTNAME'] = function (right) {
    return {
        type: 'network_get_pi_name',
        fields: {},
        values: { PINAME: null },
        mutations: null,
        statementsNode: { PINAME: right },
        statement: null
    };
};
