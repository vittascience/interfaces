const TOOLBOX_SCRATCH_CATEGORIES = [
    {
        "kind": "category",
        "toolboxitemid": "screen",
        "name": "%{BKY_CATEGORY_SCREEN}",
        "style": "screen_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-th"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "display",
        "name": "%{BKY_CATEGORY_APPEARANCE}",
        "style": "display_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "sound",
        "name": "%{BKY_CATEGORY_SOUND}",
        "style": "sound_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-music"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "control",
        "name": "%{BKY_CATEGORY_CONTROL}",
        "style": "control_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-code-branch"
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
        "toolboxitemid": "math",
        "name": "%{BKY_CATEGORY_OPERATORS}",
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

const TOOLBOX_SCRATCH_CONTENT = {
    "screen": [
        {
            "label": "%{BKY_SUBCATEGORY_SETTINGS}",
            "blocks": [
                'screen_setBackgroundColorPalette',
                'screen_setBackgroundColorRGB'
            ]
        },
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
        },
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
    ],
    "sound": [
        {
            "label": "%{BKY_SUBCATEGORY_COMPUTER}",
            "blocks": [
                'communication_playComputerMusic',
                'communication_playComputerFrequency',
                'communication_stopComputerMusic',
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
    "control": [
        {
            "label": "%{BKY_SUBCATEGORY_TIME}",
            "blocks": [
                'io_pause',
                'io_waitUntil',
                'io_initChronometer',
                'io_getChronometer'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_LOOPS}",
            "blocks": [
                'scratch_forever',
                'controls_repeat',
                'controls_whileUntil',
                'controls_for',
                'controls_forEach',
                'controls_flow_statements'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_LOGIC}",
            "blocks": [
                'controls_if',
                'controls_if-else',
                'logic_ternary'
            ]
        }
    ],
    "communication": [
        {
            "label": "%{BKY_SUBCATEGORY_SERIAL_CONNECTION}",
            "blocks": [
                'communication_serialWrite',
                'communication_graphSerialWrite',
            ]
        },
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
            "label": "%{BKY_SUBCATEGORY_DATA_LOGGING}",
            "blocks": [
                'communication_writeOpenLogSd'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_WIRELESS_COMMUNICATION}",
            "blocks": [
                'communication_sendBluetoothData',
                'communication_onBluetoothDataReceived'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_TRACKING_MODULES}",
            "blocks": [
                'communication_gps_getNMEA',
                'communication_gps_getGGAInformations',
                'communication_clockRTC_setDate',
                'communication_clockRTC_setHour',
                'communication_clockRTC_readTime'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_UART}",
            "blocks": [
                'communication_serialInit',
                'communication_uart_writeData',
                'communication_uart_isDataAvailable',
                'communication_uart_readData'
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
                'network_setWifi',
                'network_scanNetworkProfiles',
                'network_getStationInfos',
                'network_changeServerPort'
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
    "display": [
        {
            "label": "%{BKY_SUBCATEGORY_DISPLAYS_LCD}",
            "blocks": [
                'display_lcdSetText',
                'display_lcdClear'
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
            "label": "%{BKY_SUBCATEGORY_DISPLAYS_OLED}",
            "blocks": [
                'display_addOledText',
                'display_setOledPixel',
                'display_drawOledLine',
                'display_showOledIcon',
                'display_setOledBackground',
                'display_clearOledScreen'
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
    "sensors": [
        {
            "label": "%{BKY_SUBCATEGORY_M5STACK}",
            "blocks": [
                'io_m5stack_onButtonPressedEvent',
                'io_m5stack_getButtonState',
                'io_m5stack_isCharging',
                'io_m5stack_isChargeFull',
                'io_m5stack_setCharge',
                'io_m5stack_getBatteryLevel'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_M5STACK}",
            "blocks": [
                'sensors_readProcessorTemperature',
                'sensors_readHallSensor'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_EXTERNAL_INPUTS}",
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
        },
        {
            "label": "%{BKY_SUBCATEGORY_PINS}",
            "blocks": [
                'io_digital_signal',
                'io_readDigitalPin',
                'io_writeDigitalPin',
                'io_readAnalogPin',
                'io_writePwm',
                'io_writeAnalogPin',
                'io_setPwm',
                'io_stopPwm',
                'io_getVoltage'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_GAS}",
            "blocks": [
                'sensors_getSgp30Gas',
                'sensors_getMultichannelGas',
                'sensors_getO2gas',
                'sensors_SCD30_readData',
                'sensors_SCD30_forcedCalibration',
                'sensors_getAirQualityValue',
                'sensors_getParticulateMatter'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_CLIMATE}",
            "blocks": [
                'sensors_getBmp280Data',
                'sensors_getGroveMoisture',
                'sensors_getGroveTemperature',
                'sensors_getGroveHighTemperature',
                'sensors_DHT11ReadData',
                'sensors_DHT22ReadData',
                'sensors_TH02readData',
                'sensors_SHT31readData',
                'sensors_DS18B20_getTemperature',
                'sensors_getGroveWaterAmount',
                'sensors_getRainGauge',
                'sensors_getAnemometer'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_SOUNDLIGHT}",
            "blocks": [
                'sensors_getGroveLight',
                'sensors_getSi1145Light',
                'sensors_colorSensor_getData',
                'sensors_getUVindex',
                'sensors_getGroveSound'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_DISTANCEMOVEMENT}",
            "blocks": [
                'sensors_getGroveUltrasonicRanger',
                'sensors_getGroveLineFinder',
                'sensors_getGroveTilt',
                'sensors_getGroveMotion',
                'sensors_getPiezoVibration'
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
        }
    ],
    "math": [{
        "blocks": [
            'math_number',
            'math_arithmetic-add',
            'math_arithmetic-minus',
            'math_arithmetic-multiply',
            'math_arithmetic-divide',
            'logic_compare-gte',
            'logic_compare-lte',
            'logic_compare-eq',
            'logic_operation-and',
            'logic_operation-or',
            'logic_negate',
            'logic_boolean',
            'logic_null',
            'math_random_int',
            'math_single',
            'math_trig',
            'math_constant',
            'math_number_property',
            'math_map',
            'math_round',
            'math_round_ndigits',
            'math_modulo',
            'math_constrain',
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
                'text_reverse'
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

const TOOLBOX_SCRATCH_CONTENT_SIMPLE = TOOLBOX_SCRATCH_CONTENT;
