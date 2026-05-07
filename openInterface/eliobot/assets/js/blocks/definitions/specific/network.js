/**
 * @fileoverview Network blocks for Eliobot.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "network_wifi_connect",
        "message0": "%{BKY_NETWORK_WIFI_CONNECT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "SSID",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "PASSWORD",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_WIFI_CONNECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "network_wifi_disconnect",
        "message0": "%{BKY_NETWORK_WIFI_DISCONNECT_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_WIFI_DISCONNECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "network_wifi_open_access_point",
        "message0": "%{BKY_NETWORK_WIFI_OPEN_ACCESS_POINT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "SSID",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "PASSWORD",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_WIFI_OPEN_ACCESS_POINT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "network_wifi_define_host_name",
        "message0": "%{BKY_NETWORK_WIFI_DEFINE_HOST_NAME_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_WIFI_DEFINE_HOST_NAME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "network_wifi_define_antenna_power",
        "message0": "%{BKY_NETWORK_WIFI_DEFINE_ANTENNA_POWER_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "POWER",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_WIFI_DEFINE_ANTENNA_POWER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "network_wifi_is_connected",
        "message0": "%{BKY_NETWORK_WIFI_IS_CONNECTED_TITLE}",
        "inputsInline": true,
        "output": "Boolean",
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_WIFI_IS_CONNECTED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "network_wifi_scan_networks",
        "message0": "%{BKY_NETWORK_WIFI_SCAN_NETWORKS_TITLE}",
        "inputsInline": true,
        "output": "Array",
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_WIFI_SCAN_NETWORKS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "network_wifi_get_ip",
        "message0": "%{BKY_NETWORK_WIFI_GET_IP_TITLE}",
        "inputsInline": true,
        "output": "String",
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_WIFI_GET_IP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // HTML blocks
    {
        "type": "network_html_create_page",
        "message0": "%{BKY_NETWORK_HTML_CREATE_PAGE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_CREATE_PAGE_TOOLTIP}",
    },
    {
        "type": "network_html_create_button",
        "message0": "%{BKY_NETWORK_HTML_CREATE_BUTTON_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
        }, {
            "type": "input_value",
            "name": "TEXT"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_CREATE_BUTTON_TOOLTIP}",
    },
    {
        "type": "network_html_display_value",
        "message0": "%{BKY_NETWORK_HTML_DISPLAY_VALUE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        },
        {
            "type": "input_value",
            "name": "NAME",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_DISPLAY_VALUE_TOOLTIP}",
    },
    {
        "type": "network_html_create_tag",
        "message0": "%{BKY_NETWORK_HTML_CREATE_TAG_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "TAG",
            "options": [
                ["div", "div"],
                ["center", "center"]
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_CREATE_TAG_TOOLTIP}",
    },
    {
        "type": "network_html_create_title_tag",
        "message0": "%{BKY_NETWORK_HTML_CREATE_TITLE_TAG_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "TAG",
            "options": [
                ["h1", "h1"],
                ["h2", "h2"],
                ["h3", "h3"],
                ["h4", "h4"],
                ["h5", "h5"],
                ["h6", "h6"]
            ]
        }, {
            "type": "input_value",
            "name": "TITLE",
            "check": "String"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_CREATE_TITLE_TAG_TOOLTIP}",
    },
    {
        "type": "network_html_create_paragraph",
        "message0": "%{BKY_NETWORK_HTML_CREATE_PARAGRAPH_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
            "check": "String"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_CREATE_PARAGRAPH_TOOLTIP}",
    },
]); // END JSON EXTRACT (Do not delete this comment.)
