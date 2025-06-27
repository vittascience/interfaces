const TOOLBOX_VITTASCIENCE_CATEGORIES = [
    {
        "kind": "category",
        "toolboxitemid": "display",
        "name": "%{BKY_CATEGORY_DISPLAY}",
        "style": "display_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "io",
        "name": "%{BKY_CATEGORY_IO}",
        "style": "io_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-exchange-alt"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "communication",
        "name": "%{BKY_CATEGORY_COMMUNICATION}",
        "style": "communication_category",
        "cssConfig": {
            "icon": "icon_blockly far fa-comment-dots"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "network",
        "name": "%{BKY_CATEGORY_NETWORK}",
        "style": "network_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-wifi"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "sensors",
        "name": "%{BKY_CATEGORY_SENSORS}",
        "style": "sensors_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-plug"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "actuators",
        "name": "%{BKY_CATEGORY_ACTUATORS}",
        "style": "actuators_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-fan"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "robots",
        "name": "%{BKY_CATEGORY_ROBOTS}",
        "style": "robots_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-robot"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "process",
        "name": "%{BKY_CATEGORY_PROCESS}",
        "style": "process_category",
        "cssConfig": {
            "icon": "icon_blockly fa-solid fa-microchip"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "cameras",
        "name": "%{BKY_CATEGORY_AI_CAMERAS}",
        "style": "cameras_category",
        "cssConfig": {
            "icon": "icon_blockly fa-solid fa-camera"
        },
        "contents": []
    },
    {
        "kind": "sep",
        "toolboxitemid": "sep1",
    },
    {
        "kind": "category",
        "toolboxitemid": "logic",
        "name": "%{BKY_CATEGORY_LOGIC}",
        "style": "logic_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-code-branch"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "loops",
        "name": "%{BKY_CATEGORY_LOOPS}",
        "style": "loops_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-redo-alt"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "math",
        "name": "%{BKY_CATEGORY_MATH}",
        "style": "math_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-calculator"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "text",
        "name": "%{BKY_CATEGORY_TEXT}",
        "style": "text_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-font"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "variables",
        "name": "%{BKY_CATEGORY_VARIABLES}",
        "custom": "VARIABLE",
        "style": "variable_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-cog"
        }
    },
    {
        "kind": "category",
        "toolboxitemid": "lists",
        "name": "%{BKY_CATEGORY_LISTS}",
        "style": "list_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-list"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "procedures",
        "name": "%{BKY_CATEGORY_PROCEDURES}",
        "custom": "PROCEDURE",
        "style": "procedure_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
        }
    },
    {
        "kind": "category",
        "toolboxitemid": "exception",
        "name": "%{BKY_CATEGORY_EXCEPTION}",
        "style": "exception_category",
        "cssConfig": {
            "icon": "icon_blockly fa fa-circle-exclamation"
        },
        "contents": []
    }
];

const TOOLBOX_VITTASCIENCE_CONTENT = {
    "display": [
        {
            "label": "%{BKY_SUBCATEGORY_PICO_LED}",
            "blocks": [
                "display_controlPicoLed",
                "display_controlPicoWLed"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_DISPLAYS_LCD}",
            "blocks": [
                'display_lcdSetText',
                'display_lcdClear'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_NEOPIXEL}",
            "blocks": [
                "display_defineNeopixel",
                "display_controlNeopixelLed",
                "display_controlColorNeopixelLed",
                "display_neopixel_controlAllLedRGB",
                "display_neopixel_controlAllLedPalette",
                "display_rainbowNeopixel"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_DISPLAYS_OLED}",
            "blocks": [
                'display_addOledText',
                'display_setOledPixel',
                'display_showOledIcon',
                'display_clearOledScreen',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_LED}",
            "blocks": [
                "display_setGroveSocketLed",
                "display_setLEDintensity",
                "display_setNumberGrove4Digit",
                "display_setClockGrove4Digit",
                "display_setLevelLedBar",
                "display_my9221_reverse"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_CHAINABLE_LED_RGB}",
            "blocks": [
                'display_defineChainableRGBLed',
                'display_setColorChainableRGBLed',
                'display_setPaletteColorChainableRGBLed',
                'display_setColorAllChainableRGBLed',
                'display_setPaletteAllChainableRGBLed',
                'display_resetAllChainableRGBLed'
            ]
        }
    ],
    "io": [
        {
            "label": "%{BKY_SUBCATEGORY_TIME}",
            "blocks": [
                'io_pause',
                'io_waitUntil',
                'io_initChronometer',
                'io_getChronometer',
            ]
        },

        {
            "label": "%{BKY_SUBCATEGORY_EXTERNAL_INPUTS}",
            "blocks": [
                "io_getGroveButton",
                "io_getGroveSwitch",
                "io_getGroveTactile",
                "io_getGroveRotaryAngle",
                "io_getGroveSlidePotentiometer",
                "io_getGroveColoredButton",
                "io_setGroveColoredButton",
                "io_getGroveThumbJoystick"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_PINS}",
            "blocks": [
                'io_digital_signal',
                'io_readDigitalPin',
                'io_writeDigitalPin',
                'io_readAnalogPin',
                'io_writeAnalogPin',
                'io_writePwm'
            ]
        }
    ],
    "communication": [
        {
            "label": "%{BKY_SUBCATEGORY_SERIAL_CONNECTION}",
            "blocks": [
                'communication_serialWrite',
                'communication_graphSerialWrite',
                'communication_playComputerMusic',
                'communication_playComputerFrequency',
                'communication_stopComputerMusic',
                'communication_onSerialDataReceived'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_INTEGRATED_BT}",
            "blocks": [
                'communication_StartBT',
                'communication_SendBT',
                'communication_BLE_ReadData'
            ]
        }
    ],
    "network": [
        {
            "label": "%{BKY_SUBCATEGORY_WIFI}",
            "blocks": [
                'network_connectStation',
                'network_configureAccessPoint',
                'network_disconnectStation',
                'network_isStationConnected',
                'network_scanNetworkProfiles',

            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SERVER}",
            "blocks": [
                'network_server_sendData',
                'network_server_getClientData',
                'network_server_getClientIp'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_CLIENT}",
            "blocks": [
                'network_client_sendData',
                'network_client_getServerData'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_WEB_PAGE}",
            "blocks": [
                'network_server_sendWebPage',
                'network_html_addTitle',
                'network_html_addText',
                'network_html_addButton',
                'network_html_addSlider',
                'network_html_addSwitch',
                'network_html_addGauge',
                'network_html_addLink',
                'network_html_addImage',
                'network_html_addStream',
                'network_HTML_Tags',
                'network_HTML_formatText',
                'network_HTML_newline',
                'network_HTML_add',
                'network_HTML_addSymbol'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_DATA_WEB_PAGE}",
            "blocks": [
                'network_server_getButtonState',
                'network_server_getSliderValue',
                'network_server_getSwitchValue'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_HTTP}",
            "blocks": [
                'network_connectStation_simple',
                'network_getHTTPRequest',
                'network_thingspeak_sendData',
                'network_thingspeak_sendData_field',
                'request_thingspeak_readFeeds'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_UMAIL}",
            "blocks": [
                'network_umail_smtp',
                'network_umail_setup',
                'network_umail_to',
                'network_umail_write_sender',
                'network_umail_write',
                'network_umail_send_image',
                'network_umail_quit'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_MQTT}",
            "blocks": [
                'network_mqtt_connectWithAuth',
                'network_mqtt_subscribeTopic',
                'network_mqtt_publishValue',
                'network_mqtt_disconnect',
                'network_mqtt_onMessageReceived',
                'network_mqtt_ifTopicIs',
                'variables_get-message_MQTT',
                'network_mqtt_onConnect',
                'network_mqtt_onDisconnect',
            ]
        }
    ],
    "sensors": [
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_GAS}",
            "blocks": [
                "sensors_getSgp30Gas",
                "sensors_getMultichannelGas",
                "sensors_getMultichannelGasV2",
                "sensors_getO2gas",
                "sensors_SCD30_readData",
                "sensors_SCD30_forcedCalibration",
                "sensors_getAirQualityValue",
                "sensors_getParticulateMatter"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_CLIMATE}",
            "blocks": [
                "sensors_getBmp280Data",
                "sensors_getGroveMoisture",
                "sensors_getGroveTemperature",
                "sensors_getGroveHighTemperature",
                'sensors_DHT11ReadData',
                'sensors_DHT22ReadData',
                "sensors_TH02readData",
                "sensors_SHT31readData",
                'sensors_DS18B20_getTemperature',
                "sensors_getGroveWaterAmount",
                "sensors_getRainGauge",
                "sensors_getAnemometer"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_SOUNDLIGHT}",
            "blocks": [
                "sensors_getGroveLight",
                "sensors_getSi1145Light",
                "sensors_getUVindex",
                "sensors_colorSensor_getData",
                "sensors_getGroveSound"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_DISTANCEMOVEMENT}",
            "blocks": [
                "sensors_getGroveUltrasonicRanger",
                "sensors_getGroveLineFinder",
                "sensors_getGroveMotion",
                "sensors_getGroveTilt",
                "sensors_getPiezoVibration"
            ]
        }
    ],
    "actuators": [
        {
            "label": "%{BKY_SUBCATEGORY_MOTORS}",
            "blocks": [
                'actuators_setServoAngle',
                'actuators_continuousServo_setSpeed',
                'actuators_setMotorPower',
                'actuators_setVibrationMotorState',
                'actuators_setGroveRelayState'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_MUSIC}",
            "blocks": [
                'actuators_playMusicGroveBuzzer',
                'actuators_music_playNotes',
                'actuators_music_note',
                'actuators_music_playFrequency',
                'actuators_music_stop'
            ]
        }
    ],
    "robots": [
        {
            "label": "%{BKY_SUBCATEGORY_KITRO}",
            "blocks": [
                "robots_moveKitro",
                "robots_rotateKitro",
                "robots_stopKitro",
                "robots_controlKitroMotors",
                "robots_setKitroRotationAngle",
                "robots_moveKitroOneSquareForward",
                "robots_moveKitroOneSquareBackward",
                "robots_rotateKitroLeft",
                "robots_rotateKitroRight",
                "robots_KitroUltrasonicRanger",
                "robots_readKitroLineFinder",
                "robots_controlKitroColorLed",
                "robots_controlKitroRGBLed"
            ]
        }
    ],
    "cameras": [
        {
            "label": "Wio Lite AI",
            "blocks": [
                'wio_get_class_data',
                'wio_get_class_data_by_id',
                'wio_get_class_max_id',
                'wio_get_status'
            ]
        }
    ],
    "process": [
        {
            "blocks": [
                'process_on_start_core1',
                'process_forever_core1',
                'process_exit_core1',
                'process_global_var'
            ]
        }
    ],
    "logic": [{
        "blocks": [
            'controls_if',
            'controls_if-else',
            'logic_compare-eq',
            'logic_operation-and',
            'logic_negate',
            'logic_boolean',
            'logic_null',
            'logic_ternary'
        ]
    }
    ],
    "loops": [{
        "blocks": [
            'forever',
            'controls_repeat',
            'controls_whileUntil',
            'controls_for',
            'controls_forEach',
            'controls_flow_statements'
        ]
    }
    ],
    "math": [{
        "blocks": [
            'math_number',
            'math_arithmetic-add',
            'math_single',
            'math_trig',
            'math_constant',
            'math_number_property',
            'math_map',
            'math_round',
            'math_round_ndigits',
            'math_modulo',
            'math_constrain',
            'math_random_int',
            'math_random_float',
            'math_atan2'
        ]
    }
    ],
    "text": [
        {
            "blocks": [
                'text_comment',
                'text',
                'text_join',
                'text_newline',
                'text_append',
                'text_split',
                'text_length',
                'text_isEmpty',
                'text_indexOf',
                'text_charAt',
                'text_getSubstring',
                'text_changeCase',
                'text_trim',
                'text_count',
                'text_replace',
                'text_reverse',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_TEXT_ANALYSIS}",
            "blocks": [
                'text_count_characters',
                'text_random_string'
            ],
        }
    ],
    "variables": "customized",
    "lists": [{
        "blocks": [
            'lists_create_with-0',
            'lists_create_with',
            'lists_repeat',
            'lists_length',
            'lists_isEmpty',
            'math_on_list',
            'lists_reverse',
            'lists_indexOf',
            'lists_getIndex',
            'lists_append',
            'lists_setIndex',
            'lists_getSublist',
            'lists_split',
            'lists_sort'
        ]
    }
    ],
    "procedures": "customized",
    "exception": [{
        "blocks": [
            'exception_raise',
            'exception_exception',
            'exception_type',
            'exception_try'
        ]
    }]
};

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;