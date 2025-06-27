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
    // {
    //     "kind": "category",
    //     "toolboxitemid": "robots",
    //     "name": "%{BKY_CATEGORY_ROBOTS}",
    //     "style": "robots_category",
    //     "cssConfig": {
    //         "icon": "icon_blockly fas fa-robot"
    //     },
    //     "contents": []
    // },
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
            "label": "%{BKY_SUBCATEGORY_GALAXIA_RGB_LED}",
            "blocks": [
                'display_galaxia_led_set_colors',
                'display_galaxia_led_set_red',
                'display_galaxia_led_set_green',
                'display_galaxia_led_set_blue',
                'display_galaxia_led_get_red',
                'display_galaxia_led_get_green',
                'display_galaxia_led_get_blue'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_GALAXIA_GRAPHICS}",
            "blocks": [
                'display_galaxia_set_mode',
                'display_galaxia_plot_add_point',
                'display_galaxia_plot_set_y_scale',
                'display_galaxia_animate_function'
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
                "display_rainbowNeopixel",
            ]
        },
        // {
        //     "label": "%{BKY_SUBCATEGORY_DISPLAYS_OLED}",
        //     "blocks": [
        //         'display_addOledText',
        //         'display_setOledPixel',
        //         'display_showOledIcon',
        //         'display_clearOledScreen',
        //         'display_morpionNewGame',
        //         'display_morpionMoveCursor',
        //         'display_morpionSetPlayerFigure',
        //         'display_morpionIsEndGame'
        //     ]
        // },
        {
            "label": "%{BKY_SUBCATEGORY_LED}",
            "blocks": [
                "display_setGroveSocketLed",
                "display_setLEDintensity",
                // "display_setNumberGrove4Digit",
                // "display_setClockGrove4Digit",
                // "display_setLevelLedBar",
                // "display_my9221_reverse",
                // "display_setTrafficLight"
            ]
        }
    ],
    "io": [
        {
            "label": "%{BKY_SUBCATEGORY_GALAXIA_TIME}",
            "blocks": [
                'io_pause',
                'io_waitUntil',
                'io_initChronometer',
                'io_getChronometer'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_GALAXIA_A_B}",
            "blocks": [
                'io_onButtonPressed',
                'io_isButtonPressed',
                'io_onButtonEvent',
                'io_buttons_getPresses'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_GALAXIA_TOUCH_BUTTONS}",
            "blocks": [
                'io_ifTouchSensitiveButtonTouched',
                'io_isTouchSensitiveButtonTouched',
                'io_onTouchSensitiveButtonEvent',
                'io_TouchSensitiveButton_getTouches'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_PINS}",
            "blocks": [
                'io_onPinPressed',
                'io_isPinPressed'
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
                "io_getKeypadNumber",
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
                'io_writePwm',
                'io_setPwm',
                'io_stopPwm',
                'io_preparePulseIn',
                'io_readPulseIn'
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
                // 'communication_serialRedirectUSB',
                // 'communication_onSerialDataReceived'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_INTEGRATED_RADIO}",
            "blocks": [
                'communication_radioSendString',
                'communication_radioSendNumber',
                'communication_radioSendValue',
                'communication_onRadioDataReceived',
                'communication_onRadioNumberReceived',
                'communication_onRadioValueReceived',
                'communication_radioConfig'
            ]
        },
        // {
        //     "label": "%{BKY_SUBCATEGORY_DATA_LOGGING}",
        //     "blocks": [
        //         'communication_writeOpenLogSd'
        //     ]
        // },
        // {
        //     "label": "%{BKY_SUBCATEGORY_WIRELESS_COMMUNICATION}",
        //     "blocks": [
        //         'communication_sendBluetoothData',
        //         'communication_onBluetoothDataReceived',
        //         'communication_HM10_sendBluetoothData',
        //         'communication_HM10_onBluetoothDataReceived',
        //     ]
        // },
        {
            "label": "%{BKY_SUBCATEGORY_TRACKING_MODULES}",
            "blocks": [
                // 'communication_onGPSDataReceived',
                // 'communication_analyzeGPSInfo',
                'communication_clockRTC_setDate',
                'communication_clockRTC_setHour',
                'communication_clockRTC_readTime'
            ]
        },
        // {
        //     "label": "%{BKY_SUBCATEGORY_UART}",
        //     "blocks": [
        //         'communication_serialInit',
        //         'communication_uart_writeData',
        //         'communication_uart_isDataAvailable',
        //         'communication_uart_readData'
        //     ]
        // }
    ],
    "sensors": [
        {
            "label": "%{BKY_SUBCATEGORY_GALAXIA}",
            "blocks": [
                "sensors_getLight",
                "sensors_getTemperature",
                "sensors_getAcceleration",
                'io_onMovement',
                "sensors_getRotation",
                "sensors_getCompass",
                "sensors_calibrateCompass",
                "sensors_getMagneticForce"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_ENVIRO_BIT}",
            "blocks": [
                // "sensors_envirobit_tcs3472_getRGB",
                // "sensors_envirobit_tcs3472_getBrightness",
                // "sensors_envirobit_tcs3472_setLED",
                // "sensors_envirobit_bme280_getData",
                "sensors_envirobit_getSoundLevel",
                "sensors_envirobit_waitForClaps"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_GAS}",
            "blocks": [
                "sensors_getSgp30Gas",
                // "sensors_getMultichannelGas",
                // "sensors_getMultichannelGasV2",
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
                // "sensors_dhtReadData",
                "sensors_TH02readData",
                "sensors_SHT31readData",
                "sensors_mpx5700ap_getPressure",
                "sensors_mpx5700ap_calibrate",
                "sensors_getGroveWaterAmount",
                "sensors_getRainGauge",
                "sensors_getAnemometer"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_SOUNDLIGHT}",
            "blocks": [
                "sensors_getGroveLight",
                // "sensors_getSi1145Light",
                "sensors_getUVindex",
                "sensors_colorSensor_getData",
                "sensors_getGroveSound"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_DISTANCEMOVEMENT}",
            "blocks": [
                "sensors_getGroveUltrasonicRanger",
                // "sensors_getGesture",
                // "sensors_onGestureTypeDetected",
                "sensors_getGroveLineFinder",
                "sensors_getGroveMotion",
                "sensors_getGroveTilt",
                "sensors_getPiezoVibration"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_OTHER}",
            "blocks": [
                'sensors_getGroveButton'
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
                'actuators_setGroveRelayState',

            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_MUSIC}",
            "blocks": [
                'actuators_playMusicGroveBuzzer'
            ]
        }
    ],
    // "robots": [
    //     {
    //         "label": "%{BKY_SUBCATEGORY_MAQUEEN}",
    //         "blocks": [
    //             'robots_getMaqueenUltrasonicRanger',
    //             'robots_readMaqueenPatrol',
    //             'robots_controlMaqueenLed',
    //             'robots_setMaqueenGo',
    //             'robots_controlMaqueenMotor',
    //             'robots_stopMaqueenMotors',
    //             'robots_setMaqueenServoAngle',
    //             'robots_setMaqueenNeopixel',
    //             'robots_setMaqueenNeopixelPalette',
    //             'robots_setMaqueenRainbow',
    //             'robots_setMaqueenBuzzer',
    //             'robots_playMaqueenMusic',
    //             'robots_maqueen_onRemoteCommandReceived',
    //             'robots_maqueen_onRemoteCommandReceived_car_mp3_gray',
    //             'robots_decodeMaqueenIRreceiver',
    //             'robots_getMaqueenIRcode'
    //         ]
    //     },
    //     {
    //         "label": "%{BKY_SUBCATEGORY_CODO}",
    //         "blocks": [
    //             'robots_setCodoGo',
    //             'robots_setCodoTurn',
    //             'robots_setCodoStop',
    //             'robots_controlCodoMotors'
    //         ]
    //     },
    //     {
    //         "label": "%{BKY_SUBCATEGORY_BUGGY}",
    //         "blocks": [
    //             'robots_setBuggyGo',
    //             'robots_setBuggyTurn',
    //             'robots_setBuggyStop',
    //             'robots_controlBuggyMotors'
    //         ]
    //     },
    //     {
    //         "label": "%{BKY_SUBCATEGORY_BITBOT}",
    //         "blocks": [
    //             'robots_readBitBotLightSensor',
    //             'robots_readBitBotPatrol',
    //             'robots_setBitbotGo',
    //             'robots_controlBitBotMotor',
    //             'robots_stopBitBotMotors',
    //             'robots_setBitBotNeopixel',
    //             'robots_setBitBotNeopixelPalette',
    //             'robots_setBitBotRainbow'
    //         ]
    //     },
    //     {
    //         "label": "%{BKY_SUBCATEGORY_GAMEPAD}",
    //         "blocks": [
    //             'robots_onGamepadButtonEvent',
    //             'robots_setGamepadLED',
    //             'robots_setGamepadMotorVibration',
    //             'robots_setGamepadBuzzerFreq',
    //             'robots_playGamepadMusic'
    //         ]
    //     }
    // ],
    "network": [
        {
            "label": "%{BKY_SUBCATEGORY_WIFI}",
            "blocks": [
                'network_galaxia_simpleWifi_connect_basic',
                'network_galaxia_simpleWifi_connect',
                'network_galaxia_simpleWifi_connect_complete',
                'network_galaxia_simpleWifi_create_ap',
                'network_galaxia_simpleWifi_getMyIp'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SERVER}",
            "blocks": [
                'network_galaxia_simpleWifi_receive',
                'network_galaxia_simpleWifi_receive_basic',
                'network_galaxia_simpleWifi_receive_complete',
                'network_galaxia_simpleWifi_receive_delimiter',
                'network_galaxia_simpleWifi_getLastConnectedIp'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_CLIENT}",
            "blocks": [
                'network_galaxia_simpleWifi_send_basic',
                'network_galaxia_simpleWifi_send_complete'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_WEB_SERVER}",
            "blocks": [
                'network_galaxia_simpleHttp_wait_request',
                'network_galaxia_simpleHttp_respond_basic',
                'network_galaxia_simpleHttp_respond_complete',
                'network_galaxia_simpleHttp_generate_page',
                'network_galaxia_simpleHttp_add_to_page',
                'network_galaxia_simpleHttp_add_button_to_page'
            ]
        },
        {
            "label": "MQTT",
            "blocks": [
                'network_galaxia_simple_mqtt_connect_complete',
                'network_galaxia_simple_mqtt_subscribe',
                'network_galaxia_simple_mqtt_publish',
                'network_galaxia_simple_mqtt_receive',
                'network_galaxia_simple_mqtt_on_connect',
                'network_galaxia_simple_mqtt_on_disconnect'
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
    "lists": [
        {
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