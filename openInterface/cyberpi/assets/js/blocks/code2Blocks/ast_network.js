import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


// ========== WIFI CONNECTION BLOCKS ==========


utils.prototypeBlocks['cyberpi.wifi.connect'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultSSID = { type: 'string', text: 'MyWiFi' };
    const defaultPassword = { type: 'string', text: 'password' };
    
    const ssidArg = (statementsNode && statementsNode[0]) ? statementsNode[0] : defaultSSID;
    const passwordArg = (statementsNode && statementsNode[1]) ? statementsNode[1] : defaultPassword;
    
    return {
        type: 'cyberpi_wifi_connect',
        fields: {},
        values: {
            SSID: null,
            PASSWORD: null
        },
        mutations: null,
        statementsNode: {
            SSID: ssidArg,
            PASSWORD: passwordArg
        },
        statement: null
    };
};

utils.prototypeBlocks['cyberpi.wifi.is_connect'] = function (type, identifier, values, mutations, statementsNode, statement) {
    return {
        type: 'cyberpi_wifi_is_connect',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};


utils.prototypeBlocks['cyberpi.wifi.disconnect'] = function (type, identifier, values, mutations, statementsNode, statement) {
    return {
        type: 'cyberpi_wifi_disconnect',
        fields: {
            ACTION: 'disconnect'
        },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};

utils.prototypeBlocks['cyberpi.wifi.reconnect'] = function (type, identifier, values, mutations, statementsNode, statement) {
    return {
        type: 'cyberpi_wifi_disconnect',
        fields: {
            ACTION: 'reconnect'
        },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};

// ========== LAN BROADCAST BLOCKS ==========

utils.prototypeBlocks['cyberpi.wifi_broadcast.set'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultMessageName = { type: 'string', text: 'message1' };
    const defaultValue = { type: 'string', text: 'value' };
    
    const messageNameArg = (statementsNode && statementsNode[0]) ? statementsNode[0] : defaultMessageName;
    const valueArg = (statementsNode && statementsNode[1]) ? statementsNode[1] : defaultValue;
    
    return {
        type: 'cyberpi_wifi_broadcast_set',
        fields: {},
        values: {
            MESSAGE_NAME: null,
            VALUE: null
        },
        mutations: null,
        statementsNode: {
            MESSAGE_NAME: messageNameArg,
            VALUE: valueArg
        },
        statement: null
    };
};

utils.prototypeBlocks['cyberpi.wifi_broadcast.get'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultMessageName = { type: 'string', text: 'message1' };
    
    const messageNameArg = (statementsNode && statementsNode[0]) ? statementsNode[0] : defaultMessageName;
    
    return {
        type: 'cyberpi_wifi_broadcast_get',
        fields: {},
        values: {
            MESSAGE_NAME: null
        },
        mutations: null,
        statementsNode: {
            MESSAGE_NAME: messageNameArg
        },
        statement: null
    };
};