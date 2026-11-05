const TOOLBOX_VITTASCIENCE_CATEGORIES = [
    {
        "kind": "category",
        "toolboxitemid": "screen",
        "name": "%{BKY_CATEGORY_SCREEN}",
        "style": "screen_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-display"
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
        "kind": "sep",
        "id": "sep1",
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
        "style": "lists_category",
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

const TOOLBOX_VITTASCIENCE_SUBCATEGORIES = {
    "screen": [
        {
            "kind": "category",
            "toolboxitemid": "screen_settings",
            "name": "%{BKY_SUBCATEGORY_SETTINGS}",
            "style": "screen_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-sliders"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "screen_texts",
            "name": "%{BKY_SUBCATEGORY_TEXT}",
            "style": "screen_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-font"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "screen_shapes",
            "name": "%{BKY_SUBCATEGORY_SHORT_SHAPES}",
            "style": "screen_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-shapes"
            },
            "contents": []
        }
    ],
    "io": [
        {
            "kind": "category",
            "toolboxitemid": "io_m5stack",
            "name": "%{BKY_SUBCATEGORY_M5STACK}",
            "style": "io_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "io_time",
            "name": "%{BKY_SUBCATEGORY_TIME}",
            "style": "io_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-clock"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "io_external_inputs",
            "name": "%{BKY_SUBCATEGORY_EXTERNAL_INPUTS}",
            "style": "io_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-toggle-on"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "io_pins",
            "name": "%{BKY_SUBCATEGORY_PINS}",
            "style": "io_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        }
    ],
    "communication": [
        {
            "kind": "category",
            "toolboxitemid": "communication_serial_connection",
            "name": "%{BKY_SUBCATEGORY_SERIAL_CONNECTION}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-terminal"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "communication_bluetooth",
            "name": "%{BKY_SUBCATEGORY_SHORT_BLUETOOTH}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fab fa-bluetooth-b"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "communication_data_logging",
            "name": "%{BKY_SUBCATEGORY_SHORT_DATA_LOGGING}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-sd-card"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "communication_tracking_modules",
            "name": "%{BKY_SUBCATEGORY_SHORT_TRACKING}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-location-dot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "communication_uart",
            "name": "%{BKY_SUBCATEGORY_UART}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-right-left"
            },
            "contents": []
        }
    ],
    "network": [
        {
            "kind": "category",
            "toolboxitemid": "network_wifi",
            "name": "%{BKY_SUBCATEGORY_WIFI}",
            "style": "network_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-wifi"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "network_client_server",
            "name": "%{BKY_SUBCATEGORY_SHORT_CLIENT_SERVER}",
            "style": "network_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-server"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "network_web_page",
            "name": "%{BKY_SUBCATEGORY_WEB_PAGE}",
            "style": "network_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-globe"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "network_http",
            "name": "%{BKY_SUBCATEGORY_HTTP}",
            "style": "network_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "network_umail",
            "name": "%{BKY_SUBCATEGORY_UMAIL}",
            "style": "network_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-envelope"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "network_mqtt",
            "name": "%{BKY_SUBCATEGORY_MQTT}",
            "style": "network_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-circle-nodes"
            },
            "contents": []
        }
    ],
    "display": [
        {
            "kind": "category",
            "toolboxitemid": "display_screens",
            "name": "%{BKY_SUBCATEGORY_SCREENS}",
            "style": "display_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-display"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "display_leds",
            "name": "%{BKY_SUBCATEGORY_LED}",
            "style": "display_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        }
    ],
    "sensors": [
        {
            "kind": "category",
            "toolboxitemid": "sensors_m5stack",
            "name": "%{BKY_SUBCATEGORY_M5STACK}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_sensors_gas",
            "name": "%{BKY_SUBCATEGORY_SHORT_GAS}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-smog"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_sensors_climate",
            "name": "%{BKY_SUBCATEGORY_SHORT_WEATHER}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-temperature-half"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_sensors_soundlight",
            "name": "%{BKY_SUBCATEGORY_SHORT_SOUND_LIGHT}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_sensors_distancemovement",
            "name": "%{BKY_SUBCATEGORY_SHORT_DISTANCE_MOVEMENT}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-ruler"
            },
            "contents": []
        }
    ],
    "actuators": [
        {
            "kind": "category",
            "toolboxitemid": "actuators_motors",
            "name": "%{BKY_SUBCATEGORY_MOTORS}",
            "style": "actuators_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-gears"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "actuators_music",
            "name": "%{BKY_SUBCATEGORY_MUSIC}",
            "style": "actuators_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-music"
            },
            "contents": []
        }
    ],
    "math": [
        {
            "kind": "category",
            "toolboxitemid": "math_calculations",
            "name": "%{BKY_TOOLBOX_LABEL_CALCULATIONS}",
            "style": "math_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-calculator"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "math_rounding",
            "name": "%{BKY_SUBCATEGORY_SHORT_ROUNDING}",
            "style": "math_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-ruler-horizontal"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "math_random",
            "name": "%{BKY_TOOLBOX_LABEL_RANDOM}",
            "style": "math_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-dice"
            },
            "contents": []
        }
    ],
    "text": [
        {
            "kind": "category",
            "toolboxitemid": "text_create",
            "name": "%{BKY_TOOLBOX_LABEL_CREATE}",
            "style": "text_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-pen"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "text_search",
            "name": "%{BKY_TOOLBOX_LABEL_SEARCH}",
            "style": "text_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-magnifying-glass"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "text_transform",
            "name": "%{BKY_TOOLBOX_LABEL_TRANSFORM}",
            "style": "text_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-wand-magic-sparkles"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "text_encryption",
            "name": "%{BKY_SUBCATEGORY_ENCRYPTION}",
            "style": "text_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-lock"
            },
            "contents": []
        }
    ],
    "lists": [
        {
            "kind": "category",
            "toolboxitemid": "lists_create",
            "name": "%{BKY_TOOLBOX_LABEL_CREATE}",
            "style": "lists_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-plus"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "lists_read",
            "name": "%{BKY_TOOLBOX_LABEL_READ}",
            "style": "lists_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-eye"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "lists_modify",
            "name": "%{BKY_TOOLBOX_LABEL_MODIFY}",
            "style": "lists_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-pen-to-square"
            },
            "contents": []
        }
    ]
};

const TOOLBOX_VITTASCIENCE_CONTENT = {
    "screen": [
        {
            "subCategoryId": "screen_settings",
            "contents": [
                {
                    "blocks": [
                        'screen_setBackgroundColorPalette',
                        'screen_setBackgroundColorRGB'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "screen_texts",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_DRAW_TITLE}",
                    "blocks": [
                        'screen_M5Title_define',
                        'screen_M5Title_setFgColor',
                        'screen_M5Title_setFgColor-rgb',
                        'screen_M5Title_setBgColor',
                        'screen_M5Title_setBgColor-rgb',
                        'screen_M5Title_setTitle',
                        'screen_M5Title_controlDisplay'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_DRAW_LABEL}",
                    "blocks": [
                        'screen_M5TextBox_define',
                        'screen_M5TextBox_setColor',
                        'screen_M5TextBox_setColor-rgb',
                        'screen_M5TextBox_setPosition',
                        'screen_M5TextBox_setFont',
                        'screen_M5TextBox_setText',
                        'screen_M5TextBox_setRotate',
                        'screen_M5TextBox_controlDisplay',
                    ]
                }
            ]
        },
        {
            "subCategoryId": "screen_shapes",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_DRAW_RECT}",
                    "blocks": [
                        'screen_M5Rect_define',
                        'screen_M5Rect_setSize',
                        'screen_M5Rect_setBgColor',
                        'screen_M5Rect_setBgColor-rgb',
                        'screen_M5Rect_setBorderColor',
                        'screen_M5Rect_setBorderColor-rgb',
                        'screen_M5Rect_setPosition',
                        'screen_M5Rect_controlDisplay',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_DRAW_CIRCLE}",
                    "blocks": [
                        'screen_M5Circle_define',
                        'screen_M5Circle_setSize',
                        'screen_M5Circle_setBgColor',
                        'screen_M5Circle_setBgColor-rgb',
                        'screen_M5Circle_setBorderColor',
                        'screen_M5Circle_setBorderColor-rgb',
                        'screen_M5Circle_setPosition',
                        'screen_M5Circle_controlDisplay',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_DRAW_TRIANGLE}",
                    "blocks": [
                        'screen_M5Triangle_define',
                        'screen_M5Triangle_setSize',
                        'screen_M5Triangle_setBgColor',
                        'screen_M5Triangle_setBgColor-rgb',
                        'screen_M5Triangle_setBorderColor',
                        'screen_M5Triangle_setBorderColor-rgb',
                        'screen_M5Triangle_controlDisplay',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_DRAW_LINE}",
                    "blocks": [
                        'screen_M5Line_define',
                        'screen_M5Line_setSize',
                        'screen_M5Line_setColor',
                        'screen_M5Line_setColor-rgb',
                        'screen_M5Line_controlDisplay',
                    ]
                }
            ]
        }
    ],
    "io": [
        {
            "subCategoryId": "io_m5stack",
            "contents": [
                {
                    "blocks": [
                        'io_m5stack_onButtonPressedEvent',
                        'io_m5stack_getButtonState',
                        'io_m5stack_isCharging',
                        'io_m5stack_isChargeFull',
                        'io_m5stack_setCharge',
                        'io_m5stack_getBatteryLevel'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "io_time",
            "contents": [
                {
                    "blocks": [
                        'io_pause',
                        'io_waitUntil',
                        'io_initChronometer',
                        'io_getChronometer'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "io_external_inputs",
            "contents": [
                {
                    "blocks": [
                        'io_getGroveButton',
                        'io_getGroveSwitch',
                        'io_getGroveTactile',
                        'io_getGroveRotaryAngle',
                        'io_getGroveSlidePotentiometer',
                        'io_getGroveColoredButton',
                        'io_setGroveColoredButton',
                        "io_getGroveThumbJoystick"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "io_pins",
            "contents": [
                {
                    "blocks": [
                        'io_digital_signal',
                        'io_readDigitalPin',
                        'io_writeDigitalPin',
                        'io_readAnalogPin',
                        'io_writePwm',
                        'io_setPwm',
                        'io_stopPwm',
                        'io_readPulseIn',
                        'io_writeAnalogPin',
                        'io_getVoltage'
                    ]
                }
            ]
        }
    ],
    "communication": [
        {
            "subCategoryId": "communication_serial_connection",
            "contents": [
                {
                    "blocks": [
                        'communication_serialWrite',
                        'communication_graphSerialWrite',
                        'communication_playComputerMusic',
                        'communication_playComputerFrequency',
                        'communication_stopComputerMusic'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_bluetooth",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_INTEGRATED_BT}",
                    "blocks": [
                        'communication_StartBT',
                        'communication_SendBT',
                        'communication_BLE_ReadData',
                        'communication_FizziqBT'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_EXTERNAL_BLUETOOTH}",
                    "blocks": [
                        'communication_hc05_sendBluetoothData',
                        'communication_hc05_onBluetoothDataReceived'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_data_logging",
            "contents": [
                {
                    "blocks": [
                        'communication_writeSd',
                        'communication_writeOpenLogSd'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_tracking_modules",
            "contents": [
                {
                    "blocks": [
                        'communication_gps_m5_getInformations',
                        'communication_gps_getNMEA',
                        'communication_gps_getGGAInformations',
                        'communication_clockRTC_setDate',
                        'communication_clockRTC_setHour',
                        'communication_clockRTC_readTime'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_uart",
            "contents": [
                {
                    "blocks": [
                        'communication_serialInit',
                        'communication_uart_writeData',
                        'communication_uart_isDataAvailable',
                        'communication_uart_readData'
                    ]
                }
            ]
        }
    ],
    "network": [
        {
            "subCategoryId": "network_wifi",
            "contents": [
                {
                    "blocks": [
                        'network_connectStation',
                        'network_configureAccessPoint',
                        'network_disconnectStation',
                        'network_isStationConnected',
                        'network_setWifi',
                        'network_scanNetworkProfiles',
                        'network_getStationInfos',
                        'network_changeServerPort'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "network_client_server",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_SERVER}",
                    "blocks": [
                        'network_server_sendData',
                        'network_server_getClientData',
                        'network_server_getClientIp',
                        'network_server_closeClientConnection'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_CLIENT}",
                    "blocks": [
                        'network_client_sendData',
                        'network_client_getServerData'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "network_web_page",
            "contents": [
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
                }
            ]
        },
        {
            "subCategoryId": "network_http",
            "contents": [
                {
                    "blocks": [
                        'network_connectStation_simple',
                        'network_getHTTPRequest',
                        'network_thingspeak_sendData',
                        'network_thingspeak_sendData_field',
                        'request_thingspeak_readFeeds'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "network_umail",
            "contents": [
                {
                    "blocks": [
                        'network_umail_smtp',
                        'network_umail_setup',
                        'network_umail_to',
                        'network_umail_write_sender',
                        'network_umail_write',
                        'network_umail_send_image',
                        'network_umail_quit'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "network_mqtt",
            "contents": [
                {
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
            ]
        }
    ],
    "display": [
        {
            "subCategoryId": "display_screens",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_DISPLAYS_LCD}",
                    "blocks": [
                        'display_lcdSetText',
                        'display_lcdClear'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_DISPLAYS_OLED}",
                    "blocks": [
                        'display_addOledText',
                        'display_setOledPixel',
                        'display_drawOledLine',
                        'display_showOledIcon',
                        'display_setOledBackground',
                        'display_clearOledScreen'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "display_leds",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_NEOPIXEL}",
                    "blocks": [
                        'display_defineNeopixel',
                        'display_controlNeopixelLed',
                        'display_controlColorNeopixelLed',
                        'display_neopixel_controlAllLedRGB',
                        'display_neopixel_controlAllLedPalette',
                        'display_rainbowNeopixel'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_LED}",
                    "blocks": [
                        'display_setGroveSocketLed',
                        'display_setLEDintensity',
                        'display_setVariableColorLED',
                        'display_setNumberGrove4Digit',
                        'display_setClockGrove4Digit',
                        'display_setLevelLedBar',
                        'display_my9221_reverse'
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
            ]
        }
    ],
    "sensors": [
        {
            "subCategoryId": "sensors_m5stack",
            "contents": [
                {
                    "blocks": [
                        'sensors_readProcessorTemperature',
                        'sensors_readHallSensor'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_sensors_gas",
            "contents": [
                {
                    "blocks": [
                        'sensors_getSgp30Gas',
                        'sensors_getMultichannelGas',
                        'sensors_getMultichannelGasV2',
                        'sensors_getO2gas',
                        'sensors_SCD30_readData',
                        'sensors_SCD30_forcedCalibration',
                        'sensors_getAirQualityValue',
                        'sensors_getParticulateMatter'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_sensors_climate",
            "contents": [
                {
                    "blocks": [
                        'sensors_getBmp280Data',
                        'sensors_getBme280Data',
                        'sensors_getGroveMoisture',
                        'sensors_getGroveTemperature',
                        'sensors_getGroveHighTemperature',
                        'sensors_DHT11ReadData',
                        'sensors_DHT22ReadData',
                        'sensors_TH02readData',
                        'sensors_SHT31readData',
                        'sensors_SHT35readData',
                        'sensors_DS18B20_getTemperature',
                        'sensors_getGroveWaterAmount',
                        'sensors_getRainGauge',
                        'sensors_getAnemometer'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_sensors_soundlight",
            "contents": [
                {
                    "blocks": [
                        'sensors_getGroveLight',
                        'sensors_getSunlightData',
                        'sensors_colorSensor_getData',
                        'sensors_getUVindex',
                        'sensors_getGroveSound'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_sensors_distancemovement",
            "contents": [
                {
                    "blocks": [
                        'sensors_getGroveUltrasonicRanger',
                        'sensors_getGroveLineFinder',
                        'sensors_getGroveTilt',
                        'sensors_getGroveMotion',
                        'sensors_getPiezoVibration'
                    ]
                }
            ]
        }
    ],
    "actuators": [
        {
            "subCategoryId": "actuators_motors",
            "contents": [
                {
                    "blocks": [
                        'actuators_setServoAngle',
                        'actuators_continuousServo_setSpeed',
                        'actuators_setMotorPower',
                        'actuators_setVibrationMotorState',
                        'actuators_setGroveRelayState'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "actuators_music",
            "contents": [
                {
                    "blocks": [
                        'actuators_playMusicGroveBuzzer',
                        'actuators_music_playNotes',
                        'actuators_music_note',
                        'actuators_music_playFrequency',
                        'actuators_music_stop'
                    ]
                }
            ]
        }
    ],
    "logic": [
        {
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
    "loops": [
        {
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
    "math": [
        {
            "subCategoryId": "math_calculations",
            "contents": [{
                "blocks": [
                    'math_number',
                    'math_arithmetic-add',
                    'math_single',
                    'math_trig',
                    'math_constant',
                    'math_number_property',
                    'math_modulo',
                    'math_atan2'
                ]
            }]
        },
        {
            "subCategoryId": "math_rounding",
            "contents": [{
                "blocks": [
                    'math_map',
                    'math_round',
                    'math_round_ndigits',
                    'math_constrain'
                ]
            }]
        },
        {
            "subCategoryId": "math_random",
            "contents": [{
                "blocks": [
                    'math_random_int',
                    'math_random_float'
                ]
            }]
        }
    ],
    "text": [
        {
            "subCategoryId": "text_create",
            "contents": [{
                "blocks": [
                    'text_comment',
                    'text',
                    'text_join',
                    'text_newline',
                    'text_append'
                ]
            }]
        },
        {
            "subCategoryId": "text_search",
            "contents": [{
                "blocks": [
                    'text_length',
                    'text_isEmpty',
                    'text_includesSubstr',
                    'text_indexOf',
                    'text_charAt',
                    'text_count_characters',
                    'text_count'
                ]
            }]
        },
        {
            "subCategoryId": "text_transform",
            "contents": [{
                "blocks": [
                    'text_split',
                    'text_getSubstring',
                    'text_changeCase',
                    'text_trim',
                    'text_replace',
                    'text_reverse',
                    'text_random_string'
                ]
            }]
        },
        {
            "subCategoryId": "text_encryption",
            "contents": [{
                "blocks": [
                    'text_caesar_cipher',
                    'text_caesar_cipher_brute_force'
                ]
            }]
        }
    ],
    "variables": "customized",
    "lists": [
        {
            "subCategoryId": "lists_create",
            "contents": [{
                "blocks": [
                    'lists_create_with-0',
                    'lists_create_with',
                    'lists_repeat',
                    'lists_split'
                ]
            }]
        },
        {
            "subCategoryId": "lists_read",
            "contents": [{
                "blocks": [
                    'lists_length',
                    'lists_isEmpty',
                    'math_on_list',
                    'lists_indexOf',
                    'lists_getIndex',
                    'lists_getSublist'
                ]
            }]
        },
        {
            "subCategoryId": "lists_modify",
            "contents": [{
                "blocks": [
                    'lists_reverse',
                    'lists_append',
                    'lists_setIndex',
                    'lists_sort'
                ]
            }]
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