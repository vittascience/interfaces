/**
 * @fileoverview Network blocks for Esp32.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // BLOCK WIFI - CONFIGURE STATION 
    {
        "type": "network_connectStation",
        "message0": "%{BKY_NETWORK_CONNECT_STATION_TITLE}",
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
        "tooltip": "%{BKY_NETWORK_CONNECT_STATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "network_connect_station_init_extension"
        ],
        "mutator": "network_connect_station_mutator",
    },

    // BLOCK WIFI - CONFIGURE ACCESS POINT 
    {
        "type": "network_configureAccessPoint",
        "message0": "%{BKY_NETWORK_CONFIGURE_ACCESS_POINT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ESSID"
        }, {
            "type": "input_value",
            "name": "IP"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_CONFIGURE_ACCESS_POINT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK WIFI - DISCONNECT STATION 
    {
        "type": "network_disconnectStation",
        "message0": "%{BKY_NETWORK_DISCONNECT_STATION_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_DISCONNECT_STATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK WIFI - IS WIFI CONNECTED ?
    {
        "type": "network_isStationConnected",
        "message0": "%{BKY_NETWORK_IS_STATION_CONNECTED_TITLE}",
        "output": "Boolean",
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_IS_STATION_CONNECTED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK WIFI - SET WIFI
    {
        "type": "network_setWifi",
        "message0": "%{BKY_NETWORK_SET_NETWORK_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_NETWORK_ACTIVATE}", "True"],
                ["%{BKY_NETWORK_DISABLE}", "False"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_SET_NETWORK_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK WIFI - SCAN NETWORK PROFILES
    {
        "type": "network_scanNetworkProfiles",
        "message0": "%{BKY_NETWORK_SCAN_NETWORK_PROFILES_TITLE}",
        "output": "Array",
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_SCAN_NETWORK_PROFILES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK WIFI - GET STATION INFOS
    {
        "type": "network_getStationInfos",
        "message0": "%{BKY_NETWORK_GET_STATION_INFOS_TITLE}",
        "output": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GET_STATION_INFOS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK SERVER - SEND DATA TO CLIENT
    {
        "type": "network_server_sendData",
        "message0": "%{BKY_NETWORK_SERVER_SEND_DATA_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_SERVER_SEND_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK SERVER - GET CLIENT DATA
    {
        "type": "network_server_getClientData",
        "message0": "%{BKY_NETWORK_SERVER_GET_CLIENT_DATA_TITLE}",
        "output": "String",
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_SERVER_GET_CLIENT_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK SERVER - GET CLIENT DATA PARAMETER
    {
        "type": "network_server_getClientDataParam",
        "message0": "%{BKY_NETWORK_SERVER_GET_CLIENT_DATA_PARAM_TITLE}",
        "output": "String",
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_SERVER_GET_CLIENT_DATA_PARAM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK SERVER - GET CLIENT IP
    {
        "type": "network_server_getClientIp",
        "message0": "%{BKY_NETWORK_SERVER_GET_CLIENT_IP_TITLE}",
        "output": "String",
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_SERVER_GET_CLIENT_IP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK SERVER - SEND WEB PAGE
    {
        "type": "network_server_sendWebPage",
        "message0": "%{BKY_NETWORK_SERVER_SEND_WEB_PAGE_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "BODY"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_SERVER_SEND_WEB_PAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK SERVER - CHANGE SERVER PORT
    {
        "type": "network_changeServerPort",
        "message0": "%{BKY_NETWORK_CHANGE_SERVER_PORT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "PORT"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_CHANGE_SERVER_PORT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CLIENT - SEND DATA TO SERVER
    {
        "type": "network_client_sendData",
        "message0": "%{BKY_NETWORK_CLIENT_SEND_DATA_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA"
        }, {
            "type": "input_value",
            "name": "IP"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_CLIENT_SEND_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "network_client_sendData_extension"
        ],
        "mutator": "network_client_sendData_mutator"
    },

    // BLOCK CLIENT - GET SERVER DATA
    {
        "type": "network_client_getServerData",
        "message0": "%{BKY_NETWORK_CLIENT_GET_SERVER_DATA_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "IP"
        }],
        "output": "String",
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_CLIENT_GET_SERVER_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK WEB PAGE - ADD TITLE
    {
        "type": "network_html_addTitle",
        "message0": "%{BKY_NETWORK_ADD_TITLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TITLE"
        }, {
            "type": "field_grid_dropdown",
            "name": "LEVEL",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
            ]
        }, {
            "type": "input_value",
            "name": "COLOR"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_ADD_TITLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK WEB PAGE - ADD TEXT
    {
        "type": "network_html_addText",
        "message0": "%{BKY_NETWORK_ADD_TEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_ADD_TEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "network_add_text_init_extension"
        ],
        "mutator": "network_add_text_mutator"
    },

    // BLOCK WEB PAGE - ADD BUTTON
    {
        "type": "network_html_addButton",
        "message0": "%{BKY_NETWORK_HTML_ADD_BUTTON_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID"
        }, {
            "type": "input_value",
            "name": "TEXT"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_ADD_BUTTON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "network_add_button_init_extension"
        ],
        "mutator": "network_add_button_mutator"
    },

    // BLOCK WEB PAGE - ADD SLIDER
    {
        "type": "network_html_addSlider",
        "message0": "%{BKY_NETWORK_HTML_ADD_SLIDER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_ADD_SLIDER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "network_add_slider_init_extension"
        ],
        "mutator": "network_add_slider_mutator"
    },

    // BLOCK WEB PAGE - ADD SWITCH BUTTON
    {
        "type": "network_html_addSwitch",
        "message0": "%{BKY_NETWORK_HTML_ADD_SWITCH_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_ADD_SWITCH_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "network_add_switch_init_extension"
        ],
        "mutator": "network_add_switch_mutator"
    },

    // BLOCK WEB PAGE - ADD GAUGE
    {
        "type": "network_html_addGauge",
        "message0": "%{BKY_NETWORK_HTML_ADD_GAUGE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TITLE"
        }, {
            "type": "input_value",
            "name": "VALUE"
        }, {
            "type": "input_value",
            "name": "MIN"
        }, {
            "type": "input_value",
            "name": "MAX"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_ADD_GAUGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK WEB PAGE - ADD LINK
    {
        "type": "network_html_addLink",
        "message0": "%{BKY_NETWORK_ADD_LINK_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }, {
            "type": "field_input",
            "name": "URL"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_ADD_LINK_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "network_add_link_init_extension"
        ],
        "mutator": "network_add_link_mutator"
    },

    // BLOCK WEB PAGE - ADD IMAGE
    {
        "type": "network_html_addImage",
        "message0": "%{BKY_NETWORK_HTML_ADD_IMAGE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_ADD_IMAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "network_add_image_init_extension"
        ],
        "mutator": "network_add_image_mutator"
    },

    // BLOCK WEB PAGE - ADD STREAM
    {
        "type": "network_html_addStream",
        "message0": "%{BKY_NETWORK_HTML_ADD_STREAM_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_ADD_STREAM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "network_add_stream_init_extension"
        ],
        "mutator": "network_add_stream_mutator"
    },

    // BLOCK WEB PAGE - ADD HTML TAG
    {
        "type": "network_HTML_Tags",
        "message0": "%{BKY_NETWORK_HTML_TAG_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TAG",
            "options": [
                ["div", "div"],
                ["center", "center"]
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "IN"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_TAG_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK WEB PAGE - ADD HTML TEXT FORMATTING TAG
    {
        "type": "network_HTML_formatText",
        "message0": "%{BKY_NETWORK_HTML_FORMAT_TEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }, {
            "type": "field_grid_dropdown",
            "name": "TAG",
            "options": [
                ["%{BKY_NETWORK_HTML_TAG_BOLD}", "b"],
                ["%{BKY_NETWORK_HTML_TAG_ITALIC}", "i"],
                ["%{BKY_NETWORK_HTML_TAG_INSERTED}", "ins"],
                ["%{BKY_NETWORK_HTML_TAG_MARKED}", "mark"],
                ["%{BKY_NETWORK_HTML_TAG_DELETED}", "del"],
                ["%{BKY_NETWORK_HTML_TAG_SMALL}", "small"]
            ]
        }],
        "output": "String",
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_FORMAT_TEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK WEB PAGE - ADD HTML NEWLINE
    {
        "type": "network_HTML_newline",
        "message0": "%{BKY_NETWORK_HTML_NEWLINE_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_NEWLINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK WEB PAGE - ADD HTML CODE
    {
        "type": "network_HTML_add",
        "message0": "%{BKY_NETWORK_HTML_ADD_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "HTML",
            "check": "String"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_ADD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK WEB PAGE - ADD HTML SYMBOL
    {
        "type": "network_HTML_addSymbol",
        "message0": "%{BKY_NETWORK_HTML_ADD_SYMBOL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SYMBOL",
            "check": "String"
        },
        {
            "type": "input_value",
            "name": "SIZE",
            "check": "String"
        },
        {
            "type": "field_grid_dropdown",
            "name": "ENCODING",
            "options": [
                ["HEX", "&#x"],
                ["DEC", "&#"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_HTML_ADD_SYMBOL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK CLIENT/SERVER - GET BUTTON STATE
    {
        "type": "network_server_getButtonState",
        "message0": "%{BKY_NETWORK_SERVER_GET_BUTTON_STATE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID"
        }],
        "output": "Boolean",
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_SERVER_GET_BUTTON_STATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK CLIENT/SERVER - GET SLIDER VALUE
    {
        "type": "network_server_getSliderValue",
        "message0": "%{BKY_NETWORK_SERVER_GET_SLIDER_VALUE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID"
        }],
        "output": "Number",
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_SERVER_GET_SLIDER_VALUE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK CLIENT/SERVER - GET SWITCH VALUE
    {
        "type": "network_server_getSwitchValue",
        "message0": "%{BKY_NETWORK_SERVER_GET_SWITCH_VALUE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID"
        }],
        "output": "Boolean",
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_SERVER_GET_SWITCH_VALUE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    /* Simplified network blocks */

    // BLOCK WIFI - CONFIGURE STATION (Simple version)
    {
        "type": "network_connectStation_simple",
        "message0": "%{BKY_NETWORK_CONNECT_STATION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SSID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "PASSWORD",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_CONNECT_STATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK HTTP - GET HTTP REQUEST
    {
        "type": "network_getHTTPRequest",
        "message0": "%{BKY_NETWORK_GET_HTTP_REQUEST_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "METHOD",
            "options": [
                ["GET", "GET"],
                ["POST", "POST"]
            ]
        }, {
            "type": "input_value",
            "name": "URL",
            "check": "String"
        }],
        "output": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GET_HTTP_REQUEST_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK THINGSPEAK - SEND DATA
    {
        "type": "network_thingspeak_sendData",
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_THINGSPEAK_SEND_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "network_thingspeak_sendData_init_extension"
        ],
        "mutator": "network_thingspeak_sendData_mutator"
    },

    // THINGSPEAK - SEND DATA _ FIELD
    {
        "type": "network_thingspeak_sendData_field",
        "message0": "%{BKY_NETWORK_THINGSPEAK_SEND_DATA_FIELD_TITLE}",
        "args0": [{
            "type": "field_input",
            "name": "FIELD",
            "text": "1"
        }, {
            "type": "input_value",
            "name": "VALUE"
        }],
        "inputsInline": true,
        "output": "String",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_NETWORK_THINGSPEAK_SEND_DATA_FIELD_TOOLTIP}",
    },

    // BLOCK THINGSPEAK - READ FIELD
    {
        "type": "request_thingspeak_readFeeds",
        "message0": "%{BKY_NETWORK_THINGSPEAK_READ_FEEDS_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "CHANNEL_ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "API_KEY",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "FIELD"
        }],
        "inputsInline": true,
        "output": "String",
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_THINGSPEAK_READ_FEEDS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    //uMail
    {
        "type": "network_umail_smtp",
        "message0": "%{BKY_NETWORK_UMAIL_SMTP_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "SMTP",
                "options": [
                    ["gmail", "gmail"],
                    ["outlook", "outlook"],
                    ["hotmail-live", "hotmail-live"]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_UMAIL_SMTP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "network_umail_setup",
        "message0": "%{BKY_NETWORK_UMAIL_SETUP_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "MAIL"
            },
            {
                "type": "input_value",
                "name": "PASSWORD"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_UMAIL_SETUP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "network_umail_to",
        "message0": "%{BKY_NETWORK_UMAIL_TO_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "MAIL"
            },
            {
                "type": "input_value",
                "name": "SUBJECT"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_UMAIL_TO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "network_umail_write_sender",
        "message0": "%{BKY_NETWORK_UMAIL_WRITE_SENDER_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_UMAIL_WRITE_SENDER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "network_umail_write",
        "message0": "%{BKY_NETWORK_UMAIL_WRITE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "MSG"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_UMAIL_WRITE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "network_umail_send_image",
        "message0": "%{BKY_NETWORK_UMAIL_SEND_IMAGE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "IMG"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_UMAIL_SEND_IMAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "network_umail_quit",
        "message0": "%{BKY_NETWORK_UMAIL_QUIT_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_UMAIL_QUIT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // MQTT

    // BLOCK MQTT - CONNECT WITH AUTH
    {
        "type": "network_mqtt_connectWithAuth",
        "message0": "%{BKY_NETWORK_MQTT_CONNECT_WITH_AUTH_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "BROKER",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "USERNAME",
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
        "tooltip": "%{BKY_NETWORK_MQTT_CONNECT_WITH_AUTH_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "network_mqtt_connectWithAuth_init_extension"
        ],
        "mutator": "network_mqtt_connectWithAuth_mutator",
    },

    // BLOCK MQTT - SUBSCRIBE TOPIC
    {
        "type": "network_mqtt_subscribeTopic",
        "message0": "%{BKY_NETWORK_MQTT_SUBSCRIBE_TOPIC_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "TOPIC",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_MQTT_SUBSCRIBE_TOPIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK MQTT - SUBSCRIBE TOPIC
    {
        "type": "network_mqtt_publishValue",
        "message0": "%{BKY_NETWORK_MQTT_PUBLISH_VALUE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE"
            },
            {
                "type": "input_value",
                "name": "TOPIC",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_MQTT_PUBLISH_VALUE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK MQTT - DISCONNECT
    {
        "type": "network_mqtt_disconnect",
        "message0": "%{BKY_NETWORK_MQTT_DISCONNECT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_MQTT_DISCONNECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCLY MQTT - ON MESSAGE RECEIVED
    {
        "type": "network_mqtt_onMessageReceived",
        "message0": "%{BKY_NETWORK_MQTT_ON_MESSAGE_RECEIVED_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "message_MQTT"
            }
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO",
            },
        ],
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_MQTT_ON_MESSAGE_RECEIVED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "disable_duplicates"
        ],
    },

    // BLOCK MQTT - IF TOPIC IS ELSE IF
    {
        "type": "network_mqtt_ifTopicIs",
        "message0": "%{BKY_NETWORK_MQTT_IF_TOPIC_IS_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "TOPIC0",
                "check": "String"
            }
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO0"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_MQTT_IF_TOPIC_IS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "network_mqtt_ifTopicIs_init_extension"
        ],
        "mutator": "network_mqtt_ifTopicIs_mutator",
    },

    // BLOCLY MQTT - ON CONNECT
    {
        "type": "network_mqtt_onConnect",
        "message0": "%{BKY_NETWORK_MQTT_ON_CONNECT_TITLE}",
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO",
            },
        ],
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_MQTT_ON_CONNECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "disable_duplicates"
        ],
    },

    // BLOCLY MQTT - ON CONNECT
    {
        "type": "network_mqtt_onDisconnect",
        "message0": "%{BKY_NETWORK_MQTT_ON_DISCONNECT_TITLE}",
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO",
            },
        ],
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_MQTT_ON_DISCONNECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "disable_duplicates"
        ],
    },

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Network = Object.create(null);

/**
 * Performs final setup of 'network_connectStation' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Network.NETWORK_CONNECT_STATION_INIT_EXTENSION = function () {
    this.values_ = {
        'ip': "192.168.1.10",
        'mask': "255.255.255.0",
        'gw': "192.168.1.1",
        'host': "esp32-server"
    };
    this.updateField_();
};

/**
 * Mixin for mutator functions in the 'network_connectStation' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Network.NETWORK_CONNECT_STATION_MUTATOR_MIXIN = {
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('ip', this.ip_);
        container.setAttribute('options', this.options_);
        container.setAttribute('hostname', this.hostname_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.ip_ = ((xmlElement.getAttribute('ip') === null ? 'false' : xmlElement.getAttribute('ip')) != 'false');
        this.options_ = ((xmlElement.getAttribute('options') === null ? 'false' : xmlElement.getAttribute('options')) != 'false');
        this.hostname_ = ((xmlElement.getAttribute('hostname') === null ? 'false' : xmlElement.getAttribute('hostname')) != 'false');
        this.updateField_();
    },
    addOptions_: function () {
        if (this.getInput("MASK") && this.getInput("GATEWAY")) {
            this.hostname_ = true;
            this.updateField_();
            this.addDefaultBlock({
                "name": "DHCP_HOSTNAME",
                "value": this.values_.host
            });
        } else if (this.getInput("IP")) {
            this.options_ = true;
            this.updateField_();
            this.addDefaultBlock({
                "name": "MASK",
                "value": this.values_.mask
            });
            this.addDefaultBlock({
                "name": "GATEWAY",
                "value": this.values_.gw
            });
        } else {
            this.ip_ = true;
            this.updateField_();
            this.addDefaultBlock({
                "name": "IP",
                "value": this.values_.ip
            });
        }
    },
    removeOptions_: function () {
        const getValue = (input) => this.getInput(input).connection.targetBlock().getFieldValue('TEXT');
        if (this.getInput("DHCP_HOSTNAME")) {
            this.hostname_ = false;
            this.values_.host = getValue("DHCP_HOSTNAME");
        } else if (this.getInput("MASK") && this.getInput("GATEWAY")) {
            this.options_ = false;
            this.values_.mask = getValue("MASK");
            this.values_.gw = getValue("GATEWAY");
        } else {
            this.ip_ = false;
            this.values_.ip = getValue("IP");
        }
        this.updateField_();
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function () {
        var that = this;
        var remove = function () {
            that.removeOptions_();
        };
        var add = function () {
            that.addOptions_();
        };
        // Remove buttons
        if (this.getInput('TOP')) this.removeInput('TOP');
        // Update inputs
        if (this.ip_) {
            if (!this.getInput("IP")) {
                this.appendDummyInput("IP_FIELD")
                    .appendField(Blockly.Msg['NETWORK_CONNECT_STATION_IP']);
                this.appendValueInput("IP");
            }
            if (this.options_) {
                if (!this.getInput("MASK") && !this.getInput("GATEWAY")) {
                    this.appendDummyInput("MASK_FIELD")
                        .appendField(Blockly.Msg['NETWORK_CONNECT_STATION_MASK']);
                    this.appendValueInput("MASK");
                    this.appendDummyInput("GATEWAY_FIELD")
                        .appendField(Blockly.Msg['NETWORK_CONNECT_STATION_GATEWAY']);
                    this.appendValueInput("GATEWAY");
                }
                if (this.hostname_) {
                    this.appendDummyInput("HOST_FIELD")
                        .appendField(Blockly.Msg['NETWORK_CONNECT_STATION_HOSTNAME']);
                    this.appendValueInput("DHCP_HOSTNAME");
                } else {
                    if (this.getInput("HOST_FIELD") && this.getInput('DHCP_HOSTNAME')) {
                        this.removeInput("HOST_FIELD");
                        this.removeInput("DHCP_HOSTNAME");
                    }
                }
            } else {
                if (this.getInput('MASK_FIELD') && this.getInput('MASK')
                    && this.getInput('GATEWAY_FIELD') && this.getInput('GATEWAY')) {
                    this.removeInput("MASK_FIELD");
                    this.removeInput("MASK");
                    this.removeInput("GATEWAY_FIELD");
                    this.removeInput("GATEWAY");
                }
            }
            var top = this.appendDummyInput('TOP');
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", remove, false));
            if (!this.hostname_) {
                top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                    this.buttonSize, this.buttonSize, "*", add, false));
            }
        } else {
            if (this.getInput('IP_FIELD') && this.getInput('IP')) {
                this.removeInput("IP_FIELD");
                this.removeInput("IP");
            }
            var top = this.appendDummyInput('TOP');
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", add, false));
        }

    },
    addDefaultBlock: function (input) {
        return Blockly.Constants.Utils.CONNECT_DEFAULT_BLOCK(this, {
            "input": input.name,
            "type": "text",
            "name": "TEXT",
            "value": input.value
        });
    }
};

/**
 * Performs final setup of 'network_client_sendData' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Network.NETWORK_CLIENT_SEND_DATA_INIT_EXTENSION = function () {
    this.port_ = false;
    this.update_(this.updateField_);
};

/**
 * Mixin for mutator functions in the 'network_client_sendData' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Network.NETWORK_CLIENT_SEND_DATA_MUTATOR_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('port', 'NETWORK_CLIENT_SEND_DATA_PORT', 'input', 2000);

/**
 * Performs final setup of 'network_html_addText' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Network.NETWORK_HTML_ADD_TEXT_INIT_EXTENSION = function () {
    this.updateField_();
};

/**
 * Mixin for mutator functions in the 'network_html_addText' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Network.NETWORK_HTML_ADD_TEXT_MUTATOR_MIXIN = {
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('size', this.size_);
        container.setAttribute('colour', this.color_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.size_ = (xmlElement.getAttribute('size') != 'false');
        this.color_ = (xmlElement.getAttribute('colour') != 'false');
        this.updateField_();
    },
    addOptions_: function () {
        if (this.getInput("SIZE")) {
            this.color_ = true;
            this.updateField_();
            this.addDefaultBlock({
                "name": "COLOR",
                "type": "colour_picker",
                "field_name": "COLOUR",
                "value": "#666666"
            });
        } else {
            this.size_ = true;
            this.updateField_();
            this.addDefaultBlock({
                "name": "SIZE",
                "type": "math_number",
                "field_name": "NUM",
                "value": "18"
            });
        }
    },
    removeOptions_: function () {
        if (this.getInput("COLOR")) {
            this.color_ = false;
        } else {
            this.size_ = false;
        }
        this.updateField_();
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function () {
        var that = this;
        var remove = function () {
            that.removeOptions_();
        };
        var add = function () {
            that.addOptions_();
        };
        // Remove buttons
        if (this.getInput('TOP')) this.removeInput('TOP');
        // Update inputs
        if (this.size_) {
            if (!this.getInput("SIZE")) {
                this.appendDummyInput("SIZE_FIELD")
                    .appendField(Blockly.Msg['NETWORK_ADD_TEXT_SIZE']);
                this.appendValueInput("SIZE");
            }
            if (this.color_) {
                this.appendDummyInput("COLOR_FIELD")
                    .appendField(Blockly.Msg['NETWORK_ADD_TEXT_COLOR']);
                this.appendValueInput("COLOR");

            } else {
                if (this.getInput('COLOR_FIELD') && this.getInput('COLOR')) {
                    this.removeInput("COLOR_FIELD");
                    this.removeInput("COLOR");
                }
            }
            var top = this.appendDummyInput('TOP');
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", remove, false));
            if (!this.color_) {
                top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                    this.buttonSize, this.buttonSize, "*", add, false));
            }
        } else {
            if (this.getInput('SIZE_FIELD') && this.getInput('SIZE')) {
                this.removeInput("SIZE_FIELD");
                this.removeInput("SIZE");
            }
            var top = this.appendDummyInput('TOP');
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", add, false));
        }
    },
    addDefaultBlock: function (input) {
        return Blockly.Constants.Utils.CONNECT_DEFAULT_BLOCK(this, {
            "input": input.name,
            "type": input.type,
            "name": input.field_name,
            "value": input.value
        });
    }
};

/**
 * Performs final setup of 'network_html_addButton' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Network.NETWORK_HTML_ADD_BUTTON_INIT_EXTENSION = function () {
    this.updateField_();
};

/**
 * Mixin for mutator functions in the 'network_html_addButton' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Network.NETWORK_HTML_ADD_BUTTON_MUTATOR_MIXIN = {
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('colour', this.color_);
        container.setAttribute('shape', this.shape_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.color_ = (xmlElement.getAttribute('colour') != 'false');
        this.shape_ = (xmlElement.getAttribute('shape') != 'false');
        this.updateField_();
    },
    addOptions_: function () {
        if (this.getInput("COLOR")) {
            this.shape_ = true;
            this.updateField_();
            this.addDefaultBlock({
                "name": "HEIGHT",
                "type": "math_number",
                "field_name": "NUM",
                "value": "50"
            });
            this.addDefaultBlock({
                "name": "WIDTH",
                "type": "math_number",
                "field_name": "NUM",
                "value": "200"
            });
        } else {
            this.color_ = true;
            this.updateField_();
            this.addDefaultBlock({
                "name": "COLOR",
                "type": "colour_picker",
                "field_name": "COLOUR",
                "value": "#e3e3e3"
            });
        }
    },
    removeOptions_: function () {
        if (this.getInput("HEIGHT") && this.getInput("WIDTH")) {
            this.shape_ = false;
        } else {
            this.color_ = false;
        }
        this.updateField_();
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function () {
        var that = this;
        var remove = function () {
            that.removeOptions_();
        };
        var add = function () {
            that.addOptions_();
        };
        // Remove buttons
        if (this.getInput('TOP')) this.removeInput('TOP');
        // Update inputs
        if (this.color_) {
            if (!this.getInput("COLOR")) {
                this.appendDummyInput("COLOR_FIELD")
                    .appendField(Blockly.Msg['NETWORK_HTML_ADD_BUTTON_COLOUR']);
                this.appendValueInput("COLOR");
            }
            if (this.shape_) {
                this.appendDummyInput("HEIGHT_FIELD")
                    .appendField(Blockly.Msg['NETWORK_HTML_ADD_BUTTON_HEIGHT']);
                this.appendValueInput("HEIGHT");
                this.appendDummyInput("WIDTH_FIELD")
                    .appendField(Blockly.Msg['NETWORK_HTML_ADD_BUTTON_WIDTH']);
                this.appendValueInput("WIDTH");
            } else {
                if (this.getInput('HEIGHT_FIELD') && this.getInput('HEIGHT')
                    && this.getInput('WIDTH_FIELD') && this.getInput('WIDTH')) {
                    this.removeInput("HEIGHT_FIELD");
                    this.removeInput("HEIGHT");
                    this.removeInput("WIDTH_FIELD");
                    this.removeInput("WIDTH");
                }
            }
            var top = this.appendDummyInput('TOP');
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", remove, false));
            if (!this.shape_) {
                top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                    this.buttonSize, this.buttonSize, "*", add, false));
            }
        } else {
            if (this.getInput('COLOR_FIELD') && this.getInput('COLOR')) {
                this.removeInput("COLOR_FIELD");
                this.removeInput("COLOR");
            }
            var top = this.appendDummyInput('TOP');
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", add, false));
        }
    },
    addDefaultBlock: function (input) {
        return Blockly.Constants.Utils.CONNECT_DEFAULT_BLOCK(this, {
            "input": input.name,
            "type": input.type,
            "name": input.field_name,
            "value": input.value
        });
    }
};

/**
 * Performs final setup of 'network_html_addSwitch' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Network.NETWORK_HTML_ADD_SWITCH_INIT_EXTENSION = function () {
    this.updateField_();
    this.SWITCH_SIZES = [
        ["1", '1'],
        ["2", '2'],
        ["3", '3'],
        ["4", '4'],
        ["5", '5'],
        ["6", '6'],
        ["7", '7'],
        ["8", '8']
    ];
};

/**
 * Mixin for mutator functions in the 'network_html_addSwitch' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Network.NETWORK_HTML_ADD_SWITCH_MUTATOR_MIXIN = {
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('colour', this.color_);
        container.setAttribute('size', this.size_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.color_ = (xmlElement.getAttribute('colour') != 'false');
        this.size_ = (xmlElement.getAttribute('size') != 'false');
        this.updateField_();
    },
    addOptions_: function () {
        if (this.getInput("COLOR")) {
            this.size_ = true;
            this.updateField_();
        } else {
            this.color_ = true;
            this.updateField_();
            this.addDefaultBlock({
                "name": "COLOR",
                "type": "colour_picker",
                "field_name": "COLOUR",
                "value": "#22b573"
            });
        }
    },
    removeOptions_: function () {
        if (this.getInput("SIZE_FIELD")) {
            this.size_ = false;
        } else {
            this.color_ = false;
        }
        this.updateField_();
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function () {
        var that = this;
        var remove = function () {
            that.removeOptions_();
        };
        var add = function () {
            that.addOptions_();
        };
        if (this.getInput('TOP')) {
            this.removeInput('TOP');
        }
        if (this.color_) {
            if (!this.getInput("COLOR")) {
                this.appendDummyInput("COLOR_FIELD")
                    .appendField(Blockly.Msg['NETWORK_HTML_ADD_SWITCH_COLOUR']);
                this.appendValueInput("COLOR");
            }
            if (this.size_) {
                this.appendDummyInput("SIZE_FIELD")
                    .appendField(Blockly.Msg['NETWORK_HTML_ADD_SWITCH_SIZE'])
                    .appendField(new Blockly.FieldDropdown(this.SWITCH_SIZES), "SIZE");
            } else {
                if (this.getInput('SIZE_FIELD')) {
                    this.removeInput("SIZE_FIELD");
                }
            }
            var top = this.appendDummyInput('TOP');
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", remove, false));
            if (!this.size_) {
                top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                    this.buttonSize, this.buttonSize, "*", add, false));
            }
        } else {
            if (this.getInput('COLOR_FIELD') && this.getInput('COLOR')) {
                this.removeInput("COLOR_FIELD");
                this.removeInput("COLOR");
            }
            var top = this.appendDummyInput('TOP');
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", add, false));
        }
    },
    addDefaultBlock: function (input) {
        return Blockly.Constants.Utils.CONNECT_DEFAULT_BLOCK(this, {
            "input": input.name,
            "type": input.type,
            "name": input.field_name,
            "value": input.value
        });
    }
};

/**
 * Performs final setup of 'network_html_addSlider' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Network.NETWORK_HTML_ADD_SLIDER_INIT_EXTENSION = function () {
    this.ORIENTATIONS = [
        ["%{BKY_NETWORK_HTML_ADD_SLIDER_HORIZONTAL}", "HORIZONTAL"],
        ["%{BKY_NETWORK_HTML_ADD_SLIDER_VERTICAL}", "VERTICAL"]
    ]
    this.updateField_();
};

/**
 * Mixin for mutator functions in the 'network_html_addSlider' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Network.NETWORK_HTML_ADD_SLIDER_MUTATOR_MIXIN = {
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('limits', this.limits_);
        container.setAttribute('orient', this.orient_);
        container.setAttribute('shape', this.shape_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.limits_ = (xmlElement.getAttribute('limits') != 'false');
        this.orient_ = (xmlElement.getAttribute('orient') != 'false');
        this.shape_ = (xmlElement.getAttribute('shape') != 'false');
        this.updateField_();
    },
    addOptions_: function () {
        if (this.getInput('MIN_FIELD') && this.getInput('MIN')
            && this.getInput('MAX_FIELD') && this.getInput('MAX')) {
            if (this.getInput('ORIENT_FIELD')) {
                this.shape_ = true;
                this.updateField_();
                let h = "15";
                let w = "100";
                if (this.getFieldValue('ORIENT') == "VERTICAL") {
                    h = "100";
                    w = "15";
                }
                this.addDefaultBlock({
                    "name": "HEIGHT",
                    "type": "math_number",
                    "field_name": "NUM",
                    "value": h
                });
                this.addDefaultBlock({
                    "name": "WIDTH",
                    "type": "math_number",
                    "field_name": "NUM",
                    "value": w
                });
            } else {
                this.orient_ = true;
                this.updateField_();
            }
        } else {
            this.limits_ = true;
            this.updateField_();
            this.addDefaultBlock({
                "name": "MIN",
                "type": "math_number",
                "field_name": "NUM",
                "value": "0"
            });
            this.addDefaultBlock({
                "name": "MAX",
                "type": "math_number",
                "field_name": "NUM",
                "value": "100"
            });
        }
    },
    removeOptions_: function () {
        if (this.getInput('HEIGHT_FIELD') && this.getInput('HEIGHT')
            && this.getInput('WIDTH_FIELD') && this.getInput('WIDTH')) {
            this.shape_ = false;
        } else {
            if (this.getInput('ORIENT_FIELD')) {
                this.orient_ = false;
            } else {
                this.limits_ = false;
            }
        }
        this.updateField_();
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function () {
        var that = this;
        var remove = function () {
            that.removeOptions_();
        };
        var add = function () {
            that.addOptions_();
        };
        if (this.getInput('TOP')) {
            this.removeInput('TOP');
        }
        if (this.limits_) {
            if (!(this.getInput('MIN_FIELD') && this.getInput('MIN')
                && this.getInput('MAX_FIELD') && this.getInput('MAX'))) {
                this.appendDummyInput("MIN_FIELD")
                    .appendField(Blockly.Msg['NETWORK_HTML_ADD_SLIDER_MIN']);
                this.appendValueInput("MIN");
                this.appendDummyInput("MAX_FIELD")
                    .appendField(Blockly.Msg['NETWORK_HTML_ADD_SLIDER_MAX']);
                this.appendValueInput("MAX");
            }
            if (this.orient_) {
                if (!this.getInput("ORIENT_FIELD")) {
                    this.appendDummyInput("ORIENT_FIELD")
                        .appendField(new Blockly.FieldDropdown(this.ORIENTATIONS), "ORIENT");
                }
                if (this.shape_) {
                    if (!(this.getInput('HEIGHT_FIELD') && this.getInput('HEIGHT')
                        && this.getInput('WIDTH_FIELD') && this.getInput('WIDTH'))) {
                        this.appendDummyInput("HEIGHT_FIELD")
                            .appendField(Blockly.Msg['NETWORK_HTML_ADD_SLIDER_HEIGHT']);
                        this.appendValueInput("HEIGHT");
                        this.appendDummyInput("WIDTH_FIELD")
                            .appendField(Blockly.Msg['NETWORK_HTML_ADD_SLIDER_WIDTH']);
                        this.appendValueInput("WIDTH");
                    }
                } else {
                    if (this.getInput('HEIGHT_FIELD') && this.getInput('HEIGHT')
                        && this.getInput('WIDTH_FIELD') && this.getInput('WIDTH')) {
                        this.removeInput("HEIGHT_FIELD");
                        this.removeInput("HEIGHT");
                        this.removeInput("WIDTH_FIELD");
                        this.removeInput("WIDTH");
                    }
                }
                var top = this.appendDummyInput('TOP');
                top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI,
                    this.buttonSize, this.buttonSize, "*", remove, false));
                if (!this.shape_) {
                    top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                        this.buttonSize, this.buttonSize, "*", add, false));
                }
            } else {
                if (this.getInput('ORIENT_FIELD')) {
                    this.removeInput("ORIENT_FIELD");
                }
                var top = this.appendDummyInput('TOP');
                top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI,
                    this.buttonSize, this.buttonSize, "*", remove, false));
                top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                    this.buttonSize, this.buttonSize, "*", add, false));
            }
        } else {
            if (this.getInput('MIN_FIELD') && this.getInput('MIN')
                && this.getInput('MAX_FIELD') && this.getInput('MAX')) {
                this.removeInput("MIN_FIELD");
                this.removeInput("MIN");
                this.removeInput("MAX_FIELD");
                this.removeInput("MAX");
            }
            var top = this.appendDummyInput('TOP');
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", add, false));
        }

    },
    addDefaultBlock: function (input) {
        return Blockly.Constants.Utils.CONNECT_DEFAULT_BLOCK(this, {
            "input": input.name,
            "type": input.type,
            "name": input.field_name,
            "value": input.value
        });
    }
};

/**
 * Performs final setup of 'network_html_addImage' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Network.NETWORK_HTML_ADD_IMAGE_INIT_EXTENSION = function () {
    this.shape_ = false;
    this.update_(this.updateField_);
};

/**
 * Mixin for mutator functions in the 'network_html_addImage' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Network.NETWORK_HTML_ADD_IMAGE_MUTATOR_MIXIN = {
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('shape', this.shape_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.shape_ = (xmlElement.getAttribute('shape') != 'false');
        this.update_(this.updateField_);
    },
    addOptions_: function () {
        this.shape_ = true;
        this.update_(this.updateField_);
    },
    removeOptions_: function () {
        this.shape_ = false;
        this.update_(this.updateField_);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function () {
        try {
            var that = this;
            var remove = function () {
                that.removeOptions_();
            };
            var add = function () {
                that.addOptions_();
            };
            // Remove buttons
            if (this.getInput('TOP')) this.removeInput('TOP');
            // Update inputs
            const top = this.appendDummyInput('TOP');
            if (!(this.getInput("SHAPE_FIELD") && this.getInput("WIDTH") && this.getInput("HEIGHT")) && this.shape_) {
                this.appendDummyInput("SHAPE_FIELD");
                this.appendDummyInput("WIDTH_FIELD")
                    .appendField(Blockly.Msg["NETWORK_HTML_ADD_IMAGE_WIDTH"]);
                this.appendValueInput("WIDTH");
                this.appendDummyInput("HEIGHT_FIELD")
                    .appendField(Blockly.Msg["NETWORK_HTML_ADD_IMAGE_HEIGHT"]);
                this.appendValueInput("HEIGHT");
                this.addDefaultBlock({
                    "name": "WIDTH",
                    "type": "math_number",
                    "field_name": "NUM",
                    "value": "59"
                });
                this.addDefaultBlock({
                    "name": "HEIGHT",
                    "type": "math_number",
                    "field_name": "NUM",
                    "value": "66"
                });
                top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI,
                    this.buttonSize, this.buttonSize, "*", remove, false));
                this.setInputsInline(true);
            } else {
                if (this.getInput("SHAPE_FIELD") && this.getInput("WIDTH") && this.getInput("HEIGHT")) {
                    this.removeInput("WIDTH");
                    this.removeInput("HEIGHT");
                    this.removeInput("HEIGHT_FIELD");
                    this.removeInput("WIDTH_FIELD");
                    this.removeInput("SHAPE_FIELD");
                }
                top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                    this.buttonSize, this.buttonSize, "*", add, false));
            }
        } catch (e) { console.error(e); }
    },
    update_: function (update) {
        return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
    },
    addDefaultBlock: function (input) {
        return Blockly.Constants.Utils.CONNECT_DEFAULT_BLOCK(this, {
            "input": input.name,
            "type": input.type,
            "name": input.field_name,
            "value": input.value
        });
    }
};

/**
 * Performs final setup of 'network_html_addStream' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Network.NETWORK_HTML_ADD_STREAM_INIT_EXTENSION = function () {
    this.shape_ = false;
    this.update_(this.updateField_);
};

/**
 * Mixin for mutator functions in the 'network_html_addStream' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Network.NETWORK_HTML_ADD_STREAM_MUTATOR_MIXIN = {
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('shape', this.shape_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.shape_ = (xmlElement.getAttribute('shape') != 'false');
        this.update_(this.updateField_);
    },
    addOptions_: function () {
        this.shape_ = true;
        this.update_(this.updateField_);
    },
    removeOptions_: function () {
        this.shape_ = false;
        this.update_(this.updateField_);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function () {
        try {
            var that = this;
            var remove = function () {
                that.removeOptions_();
            };
            var add = function () {
                that.addOptions_();
            };
            // Remove buttons
            if (this.getInput('TOP')) this.removeInput('TOP');
            // Update inputs
            const top = this.appendDummyInput('TOP');
            if (!(this.getInput("SHAPE_FIELD") && this.getInput("WIDTH") && this.getInput("HEIGHT")) && this.shape_) {
                this.appendDummyInput("SHAPE_FIELD");
                this.appendDummyInput("WIDTH_FIELD")
                    .appendField(Blockly.Msg["NETWORK_HTML_ADD_STREAM_WIDTH"]);
                this.appendValueInput("WIDTH");
                this.appendDummyInput("HEIGHT_FIELD")
                    .appendField(Blockly.Msg["NETWORK_HTML_ADD_STREAM_HEIGHT"]);
                this.appendValueInput("HEIGHT");
                this.addDefaultBlock({
                    "name": "WIDTH",
                    "type": "math_number",
                    "field_name": "NUM",
                    "value": "640"
                });
                this.addDefaultBlock({
                    "name": "HEIGHT",
                    "type": "math_number",
                    "field_name": "NUM",
                    "value": "480"
                });
                top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI,
                    this.buttonSize, this.buttonSize, "*", remove, false));
                this.setInputsInline(true);
            } else {
                if (this.getInput("SHAPE_FIELD") && this.getInput("WIDTH") && this.getInput("HEIGHT")) {
                    this.removeInput("WIDTH");
                    this.removeInput("HEIGHT");
                    this.removeInput("HEIGHT_FIELD");
                    this.removeInput("WIDTH_FIELD");
                    this.removeInput("SHAPE_FIELD");
                }
                top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                    this.buttonSize, this.buttonSize, "*", add, false));
            }
        } catch (e) { console.error(e); }
    },
    update_: function (update) {
        return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
    },
    addDefaultBlock: function (input) {
        return Blockly.Constants.Utils.CONNECT_DEFAULT_BLOCK(this, {
            "input": input.name,
            "type": input.type,
            "name": input.field_name,
            "value": input.value
        });
    }
};

/**
 * Performs final setup of 'network_thingspeak_sendData' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Network.NETWORK_THINGSPEAK_SEND_DATA_INIT_EXTENSION = function () {
    this.itemCount_ = 1;
    this.updateShape_();
};

/**
 * Mixin for mutator functions in the 'network_thingspeak_sendData_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Network.NETWORK_THINGSPEAK_SEND_DATA_MUTATOR_MIXIN = {
    /**
     * Create XML to represent number of data inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the data inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this {Blockly.Block}
     */
    saveConnections: function (containerBlock) {
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    storeValueConnections_: function () {
        this.valueConnections_ = [];
        for (var i = 0; i < this.itemCount_; i++) {
            this.valueConnections_.push(this.getInput('ADD' + i).connection.targetConnection);
        }
    },
    restoreValueConnections_: function () {
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'ADD' + i);
        }
    },
    addItem_: function () {
        if (this.itemCount_ < 8) {
            this.storeValueConnections_();
            var update = function () {
                this.itemCount_++;
            };
            this.update_(update);
            // Add a data block
            if (this.itemCount_ > 1) {
                this.addDataFormatBlock();
            }
            this.restoreValueConnections_();
        }
    },
    removeItem_: function () {
        if (this.itemCount_ > 1) {
            this.storeValueConnections_();
            var update = function () {
                this.itemCount_--;
            };
            this.update_(update);
            this.restoreValueConnections_();
        }
    },
    update_: function (update) {
        return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateShape_: function () {
        var that = this;
        var remove = function () {
            that.removeItem_();
        };
        var add = function () {
            that.addItem_();
        };
        // Remove all inputs
        if (this.getInput('TOP')) this.removeInput('TOP');
        var i = 0;
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
        // Update inputs
        const top = this.appendDummyInput('TOP');
        top.appendField(Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_TITLE']);
        top.appendField(new Blockly.FieldTextInput("..."), "API_KEY");
        top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
        if (this.itemCount_ > 1) {
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
        }
        for (var i = 0; i < this.itemCount_; i++) {
            this.appendValueInput('ADD' + i);
        }
        this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);
    },
    addDataFormatBlock: function () {
        const dataBlockName = "network_thingspeak_sendData_field";
        if (Blockly.Blocks[dataBlockName]) {
            const newBlock = Blockly.utils.xml.createElement('block');
            newBlock.setAttribute('type', dataBlockName);
            if (newBlock) {
                const id = Blockly.utils.genUid()
                newBlock.setAttribute('id', id);
                const field = Blockly.utils.xml.createElement('field');
                field.setAttribute('name', 'FIELD');
                field.appendChild(Blockly.utils.xml.createTextNode(this.itemCount_));
                newBlock.appendChild(field);
                Blockly.Xml.domToBlock(newBlock, this.workspace);
                const block = this.workspace.getBlockById(id);
                this.valueConnections_.push(block.outputConnection);
            }
        }
    }
};

/**
 * Performs final setup of 'network_mqtt_connectWithAuth' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Network.NETWORK_MQTT_CONNECT_WITH_AUTH_INIT_EXTENSION = function () {
    this.port_ = false;
    this.update_(this.updateField_);
};

/**
 * Mixin for mutator functions in the 'network_mqtt_connectWithAuth' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Network.NETWORK_MQTT_CONNECT_WITH_AUTH_MUTATOR_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('port', 'NETWORK_MQTT_CONNECT_WITH_AUTH_PORT', 'input', 1883);


/**
 * Performs final setup of 'network_mqtt_ifTopicIs' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Network.NETWORK_MQTT_IF_TOPIC_IS_INIT_EXTENSION = function () {
    this.elseifCount_ = 0;
    this.updateShape_();
};

/**
 * Mixin for mutator functions in the 'network_mqtt_ifTopicIs' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Network.NETWORK_MQTT_IF_TOPIC_IS_MUTATOR_MIXIN = {
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        if (!this.elseifCount_) {
            return null;
        }
        var container = Blockly.utils.xml.createElement('mutation');
        if (this.elseifCount_) {
            container.setAttribute('elseif', this.elseifCount_);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        if (!xmlElement) return;
        this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
        this.rebuildShape_();
    },
    // Store pointers to any connected child blocks.
    storeConnections_: function (arg) {
        if (!arg) arg = 0;
        this.valueConnections_ = [null];
        this.statementConnections_ = [null];
        this.elseStatementConnection_ = null;
        for (var i = 1; i <= this.elseifCount_; i++) {
            if (arg != i) {
                this.valueConnections_.push(this.getInput('TOPIC' + i)
                    .connection.targetConnection);
                this.statementConnections_.push(this.getInput('DO' + i)
                    .connection.targetConnection);
            }
        }
    },
    // Restore pointers to any connected child blocks.
    restoreConnections_: function () {
        for (var i = 1; i <= this.elseifCount_; i++) {
            Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'TOPIC' + i);
            Blockly.Mutator.reconnect(this.statementConnections_[i], this, 'DO' + i);
        }
    },
    addElseIf_: function () {
        this.storeConnections_();
        var update = function () {
            this.elseifCount_++;
        };
        this.update_(update);
        this.restoreConnections_();
    },
    removeElseIf_: function (arg) {
        this.storeConnections_(arg);
        var update = function () {
            this.elseifCount_--;
        };
        this.update_(update);
        this.restoreConnections_();
    },
    update_: function (update) {
        return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @this Blockly.Block
     * @private
     */
    updateShape_: function () {
        var that = this;
        var i = 1;
        while (this.getInput('TOPIC' + i)) {
            this.removeInput('TOPIC' + i);
            this.removeInput('TOPIC_TITLE' + i);
            this.removeInput('TOPIC_BUTTONS' + i);
            this.removeInput('DO' + i);
            i++;
        }
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            const removeElseIf = function (arg) {
                return function () {
                    that.removeElseIf_(arg);
                };
            }(i);
            this.appendValueInput('TOPIC' + i)
                .setCheck('String')
                .appendField(Blockly.Msg.NETWORK_MQTT_IF_TOPIC_IS_ELSEIF);
            this.appendDummyInput('TOPIC_TITLE' + i)
            this.appendDummyInput('TOPIC_BUTTONS' + i)
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN)
                .appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize,
                    this.buttonSize, "*", removeElseIf, false))
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendStatementInput('DO' + i);
            Blockly.Constants.Utils.CONNECT_DEFAULT_BLOCK(this, {
                "input": 'TOPIC' + i,
                "type": "text",
                "name": "TEXT",
                "value": Blockly.MESSAGES.topicName
            });
        }
        if (this.getInput('ADDBUTTON')) this.removeInput('ADDBUTTON');
        var that = this;
        const addElseIf = function () {
            return function () {
                if (!that.elseifCount_) that.elseifCount_ = 0;
                that.addElseIf_();
            };
        }();
        this.appendDummyInput('ADDBUTTON')
            .appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize,
                this.buttonSize, "*", addElseIf, false));
    },
    /**
     * Reconstructs the block with all child blocks attached.
     */
    rebuildShape_: function () {
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;
        var i = 1;
        while (this.getInput('TOPIC' + i)) {
            var inputIf = this.getInput('TOPIC' + i);
            var inputDo = this.getInput('DO' + i);
            valueConnections.push(inputIf.connection.targetConnection);
            statementConnections.push(inputDo.connection.targetConnection);
            i++;
        }
        this.updateShape_();
        this.reconnectChildBlocks_(valueConnections, statementConnections,
            elseStatementConnection);
    },
    /**
     * Reconnects child blocks.
     * @param {!Array<?Blockly.RenderedConnection>} valueConnections List of value
     * connectsions for if input.
     * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
     * statement connections for do input.
     * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
     * connection for else input.
     */
    reconnectChildBlocks_: function (valueConnections, statementConnections) {
        for (var i = 1; i <= this.elseifCount_; i++) {
            Blockly.Mutator.reconnect(valueConnections[i], this, 'TOPIC' + i);
            Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
    }
};

// Initialization extensions
Blockly.Extensions.register("network_connect_station_init_extension",
    Blockly.Constants.Network.NETWORK_CONNECT_STATION_INIT_EXTENSION);

Blockly.Extensions.register("network_client_sendData_extension",
    Blockly.Constants.Network.NETWORK_CLIENT_SEND_DATA_INIT_EXTENSION);

Blockly.Extensions.register("network_add_text_init_extension",
    Blockly.Constants.Network.NETWORK_HTML_ADD_TEXT_INIT_EXTENSION);

Blockly.Extensions.register("network_add_button_init_extension",
    Blockly.Constants.Network.NETWORK_HTML_ADD_BUTTON_INIT_EXTENSION);

Blockly.Extensions.register("network_add_slider_init_extension",
    Blockly.Constants.Network.NETWORK_HTML_ADD_SLIDER_INIT_EXTENSION);

Blockly.Extensions.register("network_add_switch_init_extension",
    Blockly.Constants.Network.NETWORK_HTML_ADD_SWITCH_INIT_EXTENSION);

Blockly.Extensions.register("network_add_link_init_extension",
    Blockly.Constants.Network.NETWORK_HTML_ADD_TEXT_INIT_EXTENSION);

Blockly.Extensions.register("network_add_image_init_extension",
    Blockly.Constants.Network.NETWORK_HTML_ADD_IMAGE_INIT_EXTENSION);

Blockly.Extensions.register("network_add_stream_init_extension",
    Blockly.Constants.Network.NETWORK_HTML_ADD_STREAM_INIT_EXTENSION);

Blockly.Extensions.register("network_thingspeak_sendData_init_extension",
    Blockly.Constants.Network.NETWORK_THINGSPEAK_SEND_DATA_INIT_EXTENSION);

Blockly.Extensions.register("network_mqtt_connectWithAuth_init_extension",
    Blockly.Constants.Network.NETWORK_MQTT_CONNECT_WITH_AUTH_INIT_EXTENSION);

Blockly.Extensions.register('network_mqtt_ifTopicIs_init_extension',
    Blockly.Constants.Network.NETWORK_MQTT_IF_TOPIC_IS_INIT_EXTENSION);

// Mutators
Blockly.Extensions.registerMutator('network_connect_station_mutator',
    Blockly.Constants.Network.NETWORK_CONNECT_STATION_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('network_client_sendData_mutator',
    Blockly.Constants.Network.NETWORK_CLIENT_SEND_DATA_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('network_add_text_mutator',
    Blockly.Constants.Network.NETWORK_HTML_ADD_TEXT_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('network_add_button_mutator',
    Blockly.Constants.Network.NETWORK_HTML_ADD_BUTTON_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('network_add_slider_mutator',
    Blockly.Constants.Network.NETWORK_HTML_ADD_SLIDER_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('network_add_switch_mutator',
    Blockly.Constants.Network.NETWORK_HTML_ADD_SWITCH_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('network_add_link_mutator',
    Blockly.Constants.Network.NETWORK_HTML_ADD_TEXT_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('network_add_image_mutator',
    Blockly.Constants.Network.NETWORK_HTML_ADD_IMAGE_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('network_add_stream_mutator',
    Blockly.Constants.Network.NETWORK_HTML_ADD_STREAM_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('network_thingspeak_sendData_mutator',
    Blockly.Constants.Network.NETWORK_THINGSPEAK_SEND_DATA_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('network_mqtt_connectWithAuth_mutator',
    Blockly.Constants.Network.NETWORK_MQTT_CONNECT_WITH_AUTH_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('network_mqtt_ifTopicIs_mutator',
    Blockly.Constants.Network.NETWORK_MQTT_IF_TOPIC_IS_MUTATOR_MIXIN);
