/**
 * @fileoverview Wifi blocks for CyberPi.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // BLOCK CYBERPI WIFI - CONNECT
    {
        "type": "cyberpi_wifi_connect",
        "message0": "%{BKY_CYBERPI_WIFI_CONNECT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SSID"
        }, {
            "type": "input_value",
            "name": "PASSWORD"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_CYBERPI_WIFI_CONNECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CYBERPI WIFI - IS CONNECTED ?
    {
        "type": "cyberpi_wifi_is_connect",
        "message0": "%{BKY_CYBERPI_WIFI_IS_CONNECT_TITLE}",
        "output": "Boolean",
        "style": "network_blocks",
        "tooltip": "%{BKY_CYBERPI_WIFI_IS_CONNECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CYBERPI WIFI - DISCONNECT
    {
        "type": "cyberpi_wifi_disconnect",
        "message0": "%{BKY_CYBERPI_WIFI_DISCONNECT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ACTION",
            "options": [
                ["%{BKY_CYBERPI_WIFI_DISCONNECT_ACTION}", "disconnect"],
                ["%{BKY_CYBERPI_WIFI_RECONNECT_ACTION}", "reconnect"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_CYBERPI_WIFI_DISCONNECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CYBERPI WIFI - LAN BROADCAST SET
    {
        "type": "cyberpi_wifi_broadcast_set",
        "message0": "%{BKY_CYBERPI_WIFI_BROADCAST_SET_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "MESSAGE_NAME"
        }, {
            "type": "input_value",
            "name": "VALUE"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_CYBERPI_WIFI_BROADCAST_SET_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CYBERPI WIFI - LAN BROADCAST GET
    {
        "type": "cyberpi_wifi_broadcast_get",
        "message0": "%{BKY_CYBERPI_WIFI_BROADCAST_GET_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "MESSAGE_NAME"
        }],
        "inputsInline": true,
        "output": "String",
        "style": "network_blocks",
        "tooltip": "%{BKY_CYBERPI_WIFI_BROADCAST_GET_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

]); // END JSON EXTRACT (Do not delete this comment.)
