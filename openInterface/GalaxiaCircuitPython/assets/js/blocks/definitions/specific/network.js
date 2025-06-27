/**
 * @format
 * @fileoverview Network blocks for Galaxia.
 */
Blockly.defineBlocksWithJsonArray([
    //BLOCK GALAXIA SIMPLE WIFI CONNECT BASIC
    {
        "type": "network_galaxia_simpleWifi_connect_basic",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_CONNECT_BASIC_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "SSID",
                "check": "String",
            },
            {
                "type": "input_value",
                "name": "PWD",
                "check": "String",
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_CONNECT_BASIC_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    // BLOCK GALAXIA SIMPLE WIFI CONNECT (3 params)
    {
        "type": "network_galaxia_simpleWifi_connect",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_CONNECT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "SSID",
                "check": "String",
            },
            {
                "type": "input_value",
                "name": "PWD",
                "check": "String",
            },
            {
                "type": "input_value",
                "name": "IP",
                "check": "String",
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_CONNECT_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    //BLOCK GALAXIA SIMPLE WIFI CONNECT COMPLETE
    {
        "type": "network_galaxia_simpleWifi_connect_complete",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_CONNECT_COMPLETE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "SSID",
                "check": "String",
            },
            {
                "type": "input_value",
                "name": "PWD",
                "check": "String",
            },
            {
                "type": "input_value",
                "name": "IP", // Static IP
                "check": "String",
            },
            {
                "type": "input_value",
                "name": "PORT", // Server port
                "check": "Number",
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_CONNECT_COMPLETE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    {
        "type": "network_galaxia_simpleWifi_create_ap",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_CREATE_AP_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "SSID",
                "check": "String",
            },
            {
                "type": "input_value",
                "name": "PWD",
                "check": "String",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_CREATE_AP_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    //BLOCK GALAXIA SIMPLE WIFI GET LAST CONNECTED IP
    {
        "type": "network_galaxia_simpleWifi_getLastConnectedIp",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_GETLASTCONNECTEDIP_TITLE}",
        "output": ["String"],
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_GETLASTCONNECTEDIP_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    //BLOCK GALAXIA SIMPLE WIFI GET MY IP
    {
        "type": "network_galaxia_simpleWifi_getMyIp",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_GETMYIP_TITLE}",
        "output": ["String"],
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_GETMYIP_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    //BLOCK GALAXIA SIMPLE WIFI RECEIVE BASIC
    {
        "type": "network_galaxia_simpleWifi_receive_basic",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_RECEIVE_BASIC_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VALUE",
                "variable": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_MESSAGE}",
            },
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_RECEIVE_BASIC_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    //BLOCK GALAXIA SIMPLE WIFI RECEIVE DELIMITER
    {
        "type": "network_galaxia_simpleWifi_receive_delimiter",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_RECEIVE_DELIMITER_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VALUE",
                "variable": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_MESSAGE}",
            },
            {
                "type": "field_dropdown",
                "name": "DELIMITER",
                "options": [
                    ["%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_RECEIVE_DELIMITER_R}", "\\r"],
                    ["%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_RECEIVE_DELIMITER_N}", "\\n"],
                    ["%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_RECEIVE_DELIMITER_RN}", "\\r\\n"],
                ],
            },
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_RECEIVE_DELIMITER_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    //BLOCK GALAXIA SIMPLE WIFI RECEIVE COMPLETE
    {
        "type": "network_galaxia_simpleWifi_receive",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_RECEIVE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "IP",
            },
            {
                "type": "field_variable",
                "name": "VALUE",
                "variable": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_MESSAGE}",
            },
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_RECEIVE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    //BLOCK GALAXIA SIMPLE WIFI RECEIVE COMPLETE
    {
        "type": "network_galaxia_simpleWifi_receive_complete",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_RECEIVE_COMPLETE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "IP",
            },
            {
                "type": "input_value",
                "name": "TIMEOUT",
            },
            {
                "type": "field_variable",
                "name": "VALUE",
                "variable": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_MESSAGE}",
            },
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_RECEIVE_COMPLETE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    //BLOCK GALAXIA SIMPLE WIFI SEND BASIC
    {
        "type": "network_galaxia_simpleWifi_send_basic",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_SEND_BASIC_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE",
                "check": ["String", "Number", "Boolean"],
            },
            {
                "type": "input_value",
                "name": "IP",
                "check": "String",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_SEND_BASIC_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    //BLOCK GALAXIA SIMPLE WIFI SEND COMPLETE
    {
        "type": "network_galaxia_simpleWifi_send_complete",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_SEND_COMPLETE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE",
                "check": ["String", "Number", "Boolean"],
            },
            {
                "type": "input_value",
                "name": "IP",
                "check": "String",
            },
            {
                "type": "input_value",
                "name": "PORT",
                "check": "Number",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLEWIFI_SEND_COMPLETE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    //BLOCK GALAXIA SIMPLE HTTP RESPOND BASIC
    {
        "type": "network_galaxia_simpleHttp_respond_basic",
        "message0": "%{BKY_NETWORK_GALAXIA_HTTP_RESPOND_BASIC_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_HTTP_RESPOND_BASIC_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    //BLOCK GALAXIA SIMPLE HTTP RESPOND COMPLETE
    {
        "type": "network_galaxia_simpleHttp_respond_complete",
        "message0": "%{BKY_NETWORK_GALAXIA_HTTP_RESPOND_COMPLETE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE",
            },
            {
                "type": "input_value",
                "name": "CODE",
                "check": "Number",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_HTTP_RESPOND_COMPLETE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    //BLOCK GALAXIA SIMPLE HTTP WAIT REQUEST
    {
        "type": "network_galaxia_simpleHttp_wait_request",
        "message0": "%{BKY_NETWORK_GALAXIA_HTTP_WAIT_REQUEST_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VALUE",
                "variable": "%{BKY_NETWORK_GALAXIA_HTTP_RESPONSE}",
            },
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_HTTP_WAIT_REQUEST_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    // BLOCK GALAXIA SIMPLE HTTP GENERATE PAGE
    {
        "type": "network_galaxia_simpleHttp_generate_page",
        "message0": "%{BKY_NETWORK_GALAXIA_HTTP_GENERATE_PAGE}",
        "args0": [
            {
                "type": "input_value",
                "name": "RELOAD",
                "check": "Number",
            },
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO",
            },
        ],
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_HTTP_GENERATE_PAGE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
        "extensions": ["disable_duplicates"],
    },

    //BLOCK GALAXIA SIMPLE HTTP ADD TO PAGE
    {
        "type": "network_galaxia_simpleHttp_add_to_page",
        "message0": "%{BKY_NETWORK_GALAXIA_HTTP_ADD_TO_PAGE}",
        "args0": [
            {
                "type": "input_value",
                "name": "DATA",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_HTTP_ADD_TO_PAGE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    //BLOCK GALAXIA SIMPLE HTTP BUTTON ADD TO PAGE
    {
        "type": "network_galaxia_simpleHttp_add_button_to_page",
        "message0": "%{BKY_NETWORK_GALAXIA_HTTP_ADD_BUTTON_TO_PAGE}",
        "args0": [
            {
                "type": "input_value",
                "name": "TITLE",
            },
            {
                "type": "input_value",
                "name": "CMD",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_HTTP_ADD_BUTTON_TO_PAGE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    /* Begin Simple MQTT blocks */

    //BLOCLY SIMPLE MQTT RECEIVE
    {
        "type": "network_galaxia_simple_mqtt_receive",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLE_MQTT_RECEIVE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "TOPIC",
                "variable": "%{BKY_NETWORK_GALAXIA_SIMPLE_MQTT_TOPIC}",
            },
            {
                "type": "field_variable",
                "name": "VALUE",
                "variable": "%{BKY_NETWORK_GALAXIA_SIMPLE_MQTT_MESSAGE}",
            },
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO",
            },
        ],
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLE_MQTT_RECEIVE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
        "extensions": ["disable_duplicates"],
    },

    //BLOCLY SIMPLE MQTT ON CONNECT
    {
        "type": "network_galaxia_simple_mqtt_on_connect",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLE_MQTT_ON_CONNECT}",
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO",
            },
        ],
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLE_MQTT_ON_CONNECT_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
        "extensions": ["disable_duplicates"],
    },

    //BLOCLY SIMPLE MQTT ON DISCONNECT
    {
        "type": "network_galaxia_simple_mqtt_on_disconnect",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLE_MQTT_ON_DISCONNECT}",
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO",
            },
        ],
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLE_MQTT_ON_DISCONNECT_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
        "extensions": ["disable_duplicates"],
    },
    //BLOCKLY SIMPLE MQTT CONNECT
    {
        "type": "network_galaxia_simple_mqtt_connect_complete",
        "message0": "%{BKY_NETWORK_GALAXIA_SIMPLE_MQTT_CONNECT_COMPLETE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "BROKER",
                "check": "String",
            },
            {
                "type": "input_value",
                "name": "USERNAME",
                "check": "String",
            },
            {
                "type": "input_value",
                "name": "PASSWORD",
                "check": "String",
            },
            {
                "type": "input_value",
                "name": "PORT",
                "check": "Number",
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLE_MQTT_CONNECT_COMPLETE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    //BLOCK GALAXIA SIMPLE MQTT SUBSCRIBE
    {
        "type": "network_galaxia_simple_mqtt_subscribe",
        "message0": "%{BKY_NETWORK_GALAXIA_MQTT_SUBSCRIBE}",
        "args0": [
            {
                "type": "input_value",
                "name": "TOPIC",
                "check": "String",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLE_MQTT_SUBSCRIBE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    //BLOCK GALAXIA SIMPLE MQTT PUBLISH
    {
        "type": "network_galaxia_simple_mqtt_publish",
        "message0": "%{BKY_NETWORK_GALAXIA_MQTT_PUBLISH}",
        "args0": [
            {
                "type": "input_value",
                "name": "TOPIC",
                "check": "String",
            },
            {
                "type": "input_value",
                "name": "VALUE",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GALAXIA_SIMPLE_MQTT_PUBLISH_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    }
]); // END JSON EXTRACT (Do not delete this comment.)