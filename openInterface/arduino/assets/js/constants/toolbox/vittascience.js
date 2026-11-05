const TOOLBOX_VITTASCIENCE_CATEGORIES = [
    {
        'kind': 'category',
        'toolboxitemid': 'display',
        'name': '%{BKY_CATEGORY_DISPLAY}',
        'style': 'display_category',
        'cssConfig': {
            'icon': 'icon_blockly svgIcon'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'io',
        'name': '%{BKY_CATEGORY_IO}',
        'style': 'io_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-exchange-alt'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'communication',
        'name': '%{BKY_CATEGORY_COMMUNICATION}',
        'style': 'communication_category',
        'cssConfig': {
            'icon': 'icon_blockly far fa-comment-dots'
        },
        'contents': []
    },
    {
        "kind": "category",
        "toolboxitemid": "network",
        "name": "%{BKY_CATEGORY_NETWORK}",
        "style": "network_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-wifi"
        },
        "contents": [],
        "onlyBoards": "unor4wifi"
    },
    {
        'kind': 'category',
        'toolboxitemid': 'sensors',
        'name': '%{BKY_CATEGORY_SENSORS}',
        'style': 'sensors_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-plug'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'actuators',
        'name': '%{BKY_CATEGORY_ACTUATORS}',
        'style': 'actuators_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-fan'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'modulino',
        'name': 'Modulino',
        'style': 'modulino_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-puzzle-piece'
        },
        'contents': [],
        // The Modulino are plugged on the Qwiic connector: UNO R4 WiFi only (the R4 Minima has none, an adapter is needed)
        "onlyBoards": [BOARD_ARDUINO_UNO_R4_WIFI]
    },
    {
        'kind': 'category',
        'toolboxitemid': 'robots',
        'name': '%{BKY_CATEGORY_ROBOTS}',
        'style': 'robots_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-robot'
        },
        'contents': [],
        "onlyBoards": "uno"
    },
    {
        "kind": "category",
        "toolboxitemid": "ia",
        "name": "%{BKY_CATEGORY_VITTAIA}",
        "style": "ia_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-brain"
        },
        "contents": []
    },
    {
        'kind': 'sep',
        'id': 'sep1',
    },
    {
        'kind': 'category',
        'toolboxitemid': 'logic',
        'name': '%{BKY_CATEGORY_LOGIC}',
        'style': 'logic_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-code-branch'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'loops',
        'name': '%{BKY_CATEGORY_LOOPS}',
        'style': 'loops_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-redo-alt'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'math',
        'name': '%{BKY_CATEGORY_MATH}',
        'style': 'math_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-calculator'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'text',
        'name': '%{BKY_CATEGORY_TEXT}',
        'style': 'text_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-font'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'variables',
        'name': '%{BKY_CATEGORY_VARIABLES}',
        'custom': 'VARIABLE',
        'style': 'variable_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-cog'
        }
    },
    {
        'kind': 'category',
        'toolboxitemid': 'lists',
        'name': '%{BKY_CATEGORY_LISTS}',
        'style': 'lists_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-list'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'procedures',
        'name': '%{BKY_CATEGORY_PROCEDURES}',
        'custom': 'PROCEDURE',
        'style': 'procedure_category',
        'cssConfig': {
            'icon': 'icon_blockly svgIcon'
        }
    }
];

const TOOLBOX_VITTASCIENCE_SUBCATEGORIES = {
    "display": [
        {
            "kind": "category",
            "toolboxitemid": "display_arduino_arduino",
            "name": "Arduino",
            "style": "display_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "display_builtin_led_matrix",
            "name": "%{BKY_SUBCATEGORY_SHORT_BUILTIN_MATRIX}",
            "style": "display_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-border-all"
            },
            "contents": []
        },
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
    "io": [
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
            "toolboxitemid": "io_mp3_mp3",
            "name": "MP3",
            "style": "io_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-music"
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
            "toolboxitemid": "communication_external_bluetooth",
            "name": "%{BKY_SUBCATEGORY_SHORT_BLUETOOTH}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fab fa-bluetooth-b"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "communication_wireless_communication",
            "name": "%{BKY_SUBCATEGORY_SHORT_WIRELESS}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-tower-broadcast"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "communication_ir_communication",
            "name": "%{BKY_SUBCATEGORY_SHORT_INFRARED}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
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
        }
    ],
    "sensors": [
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
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_sensors_health",
            "name": "%{BKY_SUBCATEGORY_SHORT_HEALTH}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-heart-pulse"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_sensors_other",
            "name": "%{BKY_SUBCATEGORY_SHORT_OTHER}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-ellipsis"
            },
            "contents": []
        }
    ],
    "actuators": [
        {
            "kind": "category",
            "toolboxitemid": "actuators_motors",
            "name": "%{BKY_SUBCATEGORY_SHORT_MOTORS}",
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
        },
        {
            "kind": "category",
            "toolboxitemid": "actuators_other",
            "name": "%{BKY_SUBCATEGORY_SHORT_OTHER}",
            "style": "actuators_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-ellipsis"
            },
            "contents": []
        }
    ],
    "modulino": [
        {
            "kind": "category",
            "toolboxitemid": "modulino_buttons",
            "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_BUTTONS}",
            "style": "modulino_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-circle-dot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "modulino_buzzer",
            "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_BUZZER}",
            "style": "modulino_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-bell"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "modulino_pixels",
            "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_PIXELS}",
            "style": "modulino_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "modulino_knob",
            "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_KNOB}",
            "style": "modulino_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-sliders"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "modulino_distance",
            "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_DISTANCE}",
            "style": "modulino_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-ruler"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "modulino_movement",
            "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_MOVEMENT}",
            "style": "modulino_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-arrows-up-down-left-right"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "modulino_thermo",
            "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_THERMO}",
            "style": "modulino_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-temperature-half"
            },
            "contents": []
        }
    ],
    "ia": [
        {
            "kind": "category",
            "toolboxitemid": "vittaia",
            "name": "%{BKY_SUBCATEGORY_SENSOR_DATA}",
            "style": "ia_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "cameras",
            "name": "%{BKY_SUBCATEGORY_CAMERAS}",
            "style": "ia_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-camera"
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
        }
    ]
};

const TOOLBOX_VITTASCIENCE_CONTENT = {
    "display": [
        {
            "subCategoryId": "display_arduino_arduino",
            "contents": [
                {
                    "blocks": [
                        'io_control_arduino_led',
                    ]
                }
            ]
        },
        {
            "subCategoryId": "display_builtin_led_matrix",
            "contents": [
                {
                    "blocks": [
                        'display_builtinMatrix_drawBitmap',
                        'display_builtinMatrix_drawString',
                        'display_builtinMatrix_showNumber',
                        'display_builtinMatrix_setPixel',
                        'display_builtinMatrix_clearScreen'
                    ],
                    "onlyBoards": "unor4wifi"
                }
            ]
        },
        {
            "subCategoryId": "display_screens",
            "contents": [
                {
                    'label': '%{BKY_SUBCATEGORY_DISPLAYS_LCD}',
                    "blocks": [
                        'display_lcdRGBSetText',
                        'display_lcdRGBClear',
                        'display_setDisplay',
                        'display_lcdRGBSetColor',
                        'display_lcdRGBSetPaletteColor'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_DISPLAYS_OLED}',
                    "blocks": [
                        'display_addOledText',
                        'display_oledScreen_drawIcon',
                        'display_oledScreen_drawBitmapLogo',
                        'display_clearOledScreen'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "display_leds",
            "contents": [
                {
                    'label': '%{BKY_SUBCATEGORY_NEOPIXEL}',
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
                    'label': '%{BKY_SUBCATEGORY_LED}',
                    "blocks": [
                        'display_setGroveSocketLed',
                        'display_setLEDintensity',
                        'display_setVariableColorLED',
                        'display_setNumberGrove4Digit',
                        'display_setClockGrove4Digit',
                        "display_setTemperatureGrove4Digit",
                        'display_setLevelLedBar',
                        "display_setGreenToRedLedBar",
                        "display_setLedLedBar"
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_CHAINABLE_LED_RGB}',
                    "blocks": [
                        'display_defineChainableRGBLed',
                        'display_setColorChainableRGBLed',
                        'display_setPaletteColorChainableRGBLed',
                        'display_setColorAllChainableRGBLed',
                        'display_setPaletteAllChainableRGBLed'
                    ]
                }
            ]
        }
    ],
    "io": [
        {
            "subCategoryId": "io_time",
            "contents": [
                {
                    "blocks": [
                        'io_wait',
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
                        'io_getReversedButton',
                        'io_getGroveSwitch',
                        'io_getGroveTactile',
                        'io_getGroveRotaryAngle',
                        'io_getGroveSlidePotentiometer',
                        'io_getGroveEncoderValue',
                        'io_getKeypadNumber',
                        'io_getGroveThumbJoystick'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "io_mp3_mp3",
            "contents": [
                {
                    'blocks': [
                        'io_groveMp3_init',
                        'io_groveMp3_play_pause',
                        'io_groveMp3_next',
                        'io_groveMp3_playSDSong',
                        'io_groveMp3_playSDDirectorySong',
                        'io_groveMp3_KT403A_playSongSpecify',
                        'io_groveMp3_getVolume',
                        'io_groveMp3_setVolume',
                        'io_groveMp3_changePlayingMode'
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
                        'io_readDigitalPin_input',
                        'io_writeDigitalPin',
                        'io_writeDigitalPin_input',
                        'io_readAnalogPin',
                        'io_readAnalogPin_input',
                        'io_writeAnalogPin',
                        'io_writeAnalogPin_input',
                        'io_setPwm',
                        'io_readPulseIn',
                        'io_attachInterrupt',
                        'io_detachInterrupt',
                        'io_setPinMode'
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
                        'communication_NumberSerialWrite',
                        'communication_onSerialDataReceived',
                        'communication_graphSerialWrite',
                        'communication_playComputerMusic',
                        'communication_playComputerFrequency',
                        'communication_stopComputerMusic'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_data_logging",
            "contents": [
                {
                    "blocks": [
                        'communication_writeOpenLogSd',
                        'communication_SDWriteDataSPI'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_external_bluetooth",
            "contents": [
                {
                    'blocks': [
                        'communication_groveSerialBluetooth_setATCommand',
                        'communication_groveSerialBluetooth_getATCommand',
                        'communication_sendSerialBluetoothData',
                        'communication_onSerialBluetoothDataReceived',
                        'communication_hc05_setATCommand',
                        'communication_hc05_getATCommand',
                        'communication_hc05_changeBaudrateTransmission',
                        'communication_hc05_sendBluetoothData',
                        'communication_hc05_onBluetoothDataReceived',
                        'communication_hm10_setATCommand',
                        'communication_hm10_getATCommand',
                        'communication_hm10_sendBluetoothData',
                        'communication_hm10_onBluetoothDataReceived'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_wireless_communication",
            "contents": [
                {
                    'blocks': [
                        'communication_sendRadioNRF24Data',
                        'communication_onRadioNRF24_dataReceived',
                        'communication_sendRadio433mhzData',
                        'communication_onRadio433mhzDataReceived'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_ir_communication",
            "contents": [
                {
                    'blocks': [
                        'communication_ir_sendNECCommand',
                        'communication_ir_sendFrame',
                        'communication_onIRDataReceived',
                        'communication_ir_getProtocoleParam',
                        'communication_onRemoteCommandReceived',
                        'communication_onRemoteCommandReceived_car_mp3_gray'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_tracking_modules",
            "contents": [
                {
                    "blocks": [
                        'communication_rfid_getCardID',
                        'communication_onGPSDataReceived',
                        'communication_clockRTC_setDate',
                        'communication_clockRTC_setHour',
                        'communication_clockRTC_readTime'
                    ]
                }
            ]
        }
    ],
    'network': [
        {
            "subCategoryId": "network_wifi",
            "contents": [
                {
                    "blocks": [
                        'network_connectStation',
                        'network_configureAccessPoint',
                        'network_disconnectStation',
                        'network_isStationConnected',
                        //'network_setWifi',
                        'network_scanNetworkProfiles',
                        // 'network_getStationInfos',
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
                        'network_server_getClientIp'
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
                        // 'network_html_addImage',
                        // 'network_html_addStream',
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
                        // 'network_thingspeak_sendData',
                        // 'network_thingspeak_sendData_field',
                        // 'request_thingspeak_readFeeds'
                    ]
                }
            ]
        }
        // {
        //     "label": "%{BKY_SUBCATEGORY_UMAIL}",
        //     "blocks": [
        //         'network_umail_smtp',
        //         'network_umail_setup',
        //         'network_umail_to',
        //         'network_umail_write_sender',
        //         'network_umail_write',
        //         'network_umail_send_image',
        //         'network_umail_quit'
        //     ]
        // },
        // {
        //     "label": "%{BKY_SUBCATEGORY_MQTT}",
        //     "blocks": [
        //         'network_mqtt_connectWithAuth',
        //         'network_mqtt_subscribeTopic',
        //         'network_mqtt_publishValue',
        //         'network_mqtt_disconnect',
        //         'network_mqtt_onMessageReceived',
        //         'network_mqtt_ifTopicIs',
        //         'variables_get-message_MQTT',
        //         'network_mqtt_onConnect',
        //         'network_mqtt_onDisconnect',
        //     ]
        // }
    ],
    "sensors": [
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
                        'sensors_getMq135gas',
                        'sensors_getAirQualityValue',
                        'sensors_onAirQualityIndexAs',
                        'sensors_getDustConcentration',
                        'sensors_getParticulateMatter',
                        'sensors_getMhz19Data'
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
                        'sensors_bme280_getData',
                        'sensors_getDps310Data',
                        'sensors_getGroveMoisture',
                        'sensors_getGroveTemperature',
                        'sensors_getGroveHighTemperature',
                        'sensors_ds18b20_getTemperature',
                        'sensors_getMax6675Temp',
                        'sensors_dhtReadData',
                        'sensors_TH02readData',
                        'sensors_SHT31readData',
                        'sensors_mpx5700ap_getPressure',
                        'sensors_getBme680Data',
                        'sensors_getGroveWaterAmount',
                        'sensors_getGroveWaterAmountI2C',
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
                        'sensors_getSi1145Light',
                        'sensors_getUVindex',
                        'sensors_colorSensor_getData',
                        'sensors_colorSensor_onColorDetected',
                        'sensors_cameraTakePicture',
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
                        'sensors_getGesture',
                        'sensors_onGestureTypeDetected',
                        'sensors_getGroveLineFinder',
                        'sensors_getGroveTilt',
                        'sensors_getGroveMotion',
                        'sensors_getPiezoVibration'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_sensors_health",
            "contents": [
                {
                    "blocks": [
                        'sensors_getPulse',
                        'sensors_getPulseBpm',
                        'sensors_mlx90614_readObjectTemperature',
                        'sensors_getEarClipHeartRate',
                        'sensors_dfrobot_max30102_takeMeasure',
                        'sensors_dfrobot_max30102_getData'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_sensors_other",
            "contents": [
                {
                    "blocks": [
                        'sensors_mlx90621_readObjectTemperature',
                        'sensors_getIna219Data',
                        'sensors_getVoltageDividerData',
                        'sensors_getFsr402Force'
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
                    'label': '%{BKY_SUBCATEGORY_SERVOMOTORS}',
                    "blocks": [
                        'actuators_setServoAngle',
                        'actuators_continuousServo_setSpeed',
                        'actuators_servo_detach'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_I2C_MOTOR_DRIVER}',
                    "blocks": [
                        'actuators_DCMotor_setSpeed',
                        'actuators_DCMotor_stop',
                        'actuators_stepperMotor_run',
                        'actuators_DCMotor_setSpeed',
                        'actuators_DCMotor_stop'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_ULN2004_STEPPER_DRIVER}',
                    "blocks": [
                        'actuators_28BYJ48_run'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_MINI_I2C_MOTOR_DRIVER}',
                    "blocks": [
                        'actuators_MiniDriver_DCMotor_drive',
                        'actuators_MiniDriver_DCMotor_stop'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_TB6612FNG_MOTOR_DRIVER}',
                    "blocks": [
                        'actuators_TB6612FNGMotorDriver_DCMotorRun',
                        'actuators_TB6612FNGMotorDriver_DCMotorBrake',
                        'actuators_TB6612FNGMotorDriver_StepperRun',
                        'actuators_TB6612FNGMotorDriver_StepperStop'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_ARDUINO_SHILED_MOTOR}',
                    "blocks": [
                        'actuators_MC33926MotorShield_setSpeed',
                        'actuators_MC33926MotorShield_getCurrent'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "actuators_music",
            "contents": [
                {
                    "blocks": [
                        'actuators_controlGroveBuzzerState',
                        'actuators_playNoteGroveBuzzer',
                        'actuators_playNoteDurationGroveBuzzer',
                        'actuators_tone',
                        'actuators_toneDuration',
                        'actuators_noTone',
                        'actuators_playMusicGroveBuzzer'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "actuators_other",
            "contents": [
                {
                    'label': '%{BKY_SUBCATEGORY_MOSFET}',
                    "blocks": [
                        'actuators_mosfet_setState',
                        'actuators_mosfet_setPercentValue'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_ACTUATORS_OTHER}',
                    "blocks": [
                        'actuators_setGroveRelayState',
                        'actuators_SPDTRelay_defineNCNO',
                        'actuators_SPDTRelay_controlState',
                        'actuators_setVibrationMotorState',
                        'actuators_setWaterAtomizerState',
                        'actuators_setElectromagnetState'
                    ]
                }
            ]
        }
    ],
    "modulino": [
        {
            "subCategoryId": "modulino_buttons",
            "contents": [
                { "blocks": ['modulino_buttons_isPressed', 'modulino_buttons_setLeds'] }
            ]
        },
        {
            "subCategoryId": "modulino_buzzer",
            "contents": [
                { "blocks": ['modulino_buzzer_tone', 'modulino_buzzer_noTone'] }
            ]
        },
        {
            "subCategoryId": "modulino_pixels",
            "contents": [
                { "blocks": ['modulino_pixels_setColor', 'modulino_pixels_setRGB', 'modulino_pixels_clear'] }
            ]
        },
        {
            "subCategoryId": "modulino_knob",
            "contents": [
                { "blocks": ['modulino_knob_get', 'modulino_knob_isPressed', 'modulino_knob_set'] }
            ]
        },
        {
            "subCategoryId": "modulino_distance",
            "contents": [
                { "blocks": ['modulino_distance_get'] }
            ]
        },
        {
            "subCategoryId": "modulino_movement",
            "contents": [
                { "blocks": ['modulino_movement_getAcceleration', 'modulino_movement_getRotation'] }
            ]
        },
        {
            "subCategoryId": "modulino_thermo",
            "contents": [
                { "blocks": ['modulino_thermo_getData'] }
            ]
        }
    ],
    "robots": [
        {
            'label': 'Pour programmer le robot mBot, veuillez passer sur la nouvelle interface pour mBot dans la rubrique \'Programmer\'',
            'message': true
        },
        {
            "button": "%{BKY_TOOLBOX_OPEN_MBOT_INTERFACE}",
            "link": "/mBot/",
            "hideInCapytale": true
        }
    ],
    "ia": [
        {
            "subCategoryId": 'vittaia',
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_VITTAIA_SENSOR_DATA}",
                    "blocks": [
                        'vittaia_load_local_model',
                        'vittaia_load_cloud_model',
                        'vittaia_make_prediction',
                        'vittaia_get_highest_probability_class',
                        'vittaia_detect_class',
                    ]
                },
            ]
        },
        {
            "subCategoryId": 'cameras',
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_HUSKYLENS}",
                    "blocks": [
                        'cameras_huskylens_setMode',
                        'cameras_huskylens_setText',
                        'cameras_huskylens_clearScreen',
                        'cameras_huskylens_learnID',
                        'cameras_huskylens_customName',
                        'cameras_huskylens_forgetIDs',
                        'cameras_huskylens_getData',
                        'cameras_huskylens_requestBlocksData',
                        'cameras_huskylens_requestArrowsData',
                        'cameras_huskylens_requestBlockXY',
                        'cameras_huskylens_getNumberOfDetectedElements',
                        'cameras_huskylens_getDataByID',
                        'cameras_huskylens_checkID',
                        'cameras_huskylens_getLineDirection',
                        'cameras_huskylens_saveModel',
                        'cameras_huskylens_loadModel'
                    ]
                },
                {
                    "label": "Wio Lite AI",
                    "blocks": [
                        'wio_get_class_data',
                        'wio_get_class_data_by_id',
                        'wio_get_class_max_id',
                        'wio_get_status'
                    ]
                }
            ]
        },
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
                'controls_repeat',
                'controls_whileUntil',
                'controls_for',
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
                    'text_getSubstring',
                    'text_trim',
                    'text_changeCase',
                    'text_reverse',
                    'text_replace',
                    'text_random_string'
                ]
            }]
        }
    ],
    "variables": 'customized',
    "lists": [
        {
            "blocks": [
                'lists_create_with',
                'lists_repeat',
                'lists_length',
                'lists_getIndex',
            ]
        }
    ],
    "procedures": 'customized'
};

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;