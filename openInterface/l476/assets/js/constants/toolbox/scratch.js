const TOOLBOX_SCRATCH_CATEGORIES = [
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
    "display": [
        {
            "label": "%{BKY_SUBCATEGORY_L476}",
            "blocks": [
                'display_stm32_controlColorLed',
                'display_stm32_toggleColorLed'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_DISPLAYS_LED_MATRIX}",
            "blocks": [
                'display_led_matrix_DrawBitmap',
                'display_led_matrix_clear'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_DISPLAYS_RGB_LED_MATRIX}",
            "blocks": [
                'display_rgb_led_matrix_DrawBitmap',
                'display_rgb_led_matrix_stopDisplay'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_DISPLAYS_LCD}",
            "blocks": [
                'display_lcdSetText',
                'display_lcdClear',
                'display_lcdSetColor',
                'display_lcdSetColorPalette'
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
                'display_setOledBackground',
                'display_clearOledScreen'
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
    ],
    "sound": [
        {
            "label": "%{BKY_SUBCATEGORY_COMPUTER}",
            "blocks": [
                'communication_playComputerMusic',
                'communication_playComputerFrequency',
                'communication_stopComputerMusic'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_EXTERNAL_INPUTS}",
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
                'communication_graphSerialWrite'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_GPS}",
            "blocks": [
                'communication_gps_getNMEA',
                'communication_gps_getGGAInformations'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_RTC}",
            "blocks": [
                'communication_stm32_RTC_setTime',
                'communication_stm32_RTC_readTime'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_NFC}",
            "blocks": [
                'communication_M24SR64_nfc_readTag',
                'communication_M24SR64_nfc_writeTag',
                'communication_M24SR64_nfc_eraseTag'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_UART}",
            "blocks": [
                'communication_uartInit',
                'communication_uartWrite'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_LORA}",
            "blocks": [
                'communication_loraInit',
                'communication_loraSend',
            ]
        }
    ],
    "sensors": [
        {
            "label": "%{BKY_SUBCATEGORY_L476}",
            "blocks": [
                'io_smt32_onSwitchButtonState',
                'io_smt32_getSwitchState'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_EXPANSION_IKS01A3}",
            "blocks": [
                'sensors_accelerometerIntegrated_LIS2DW12',
                'sensors_inclinometerIntegrated_LIS2DW12',
                'sensors_accelerometerIntegrated_LSM6DSO',
                'sensors_gyroscopeIntegrated_LSM6DSO',
                'sensors_magnetoscopeIntegrated_LIS2MDL',
                'sensors_thermometerIntegrated_STTS751',
                'sensors_hygrometerIntegrated_HTS221',
                'sensors_barometerIntegrated_LPS22'
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
                "io_getGroveThumbJoystick",
                "io_getKeypadNumber"
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
                "sensors_SCD30_forcedCalibration",
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
                'sensors_getUVindex',
                'sensors_colorSensor_getData',
                'sensors_getGroveSound'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_DISTANCEMOVEMENT}",
            "blocks": [
                'sensors_VL53L0X_getRangeMillimeters',
                'sensors_getGroveUltrasonicRanger',
                'sensors_getGroveLineFinder',
                'sensors_getGroveMotion',
                'sensors_getGroveTilt',
                'sensors_getPiezoVibration'
            ]
        }
    ],
    "robots": [
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
            "label": "%{BKY_SUBCATEGORY_ALPHABOT_MOTORS}",
            "blocks": [
                'robots_alphabot_setGo',
                'robots_alphabot_turnTo',
                'robots_alphabot_controlMotor',
                'robots_alphabot_stopMotors'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_ALPHABOT_SENSORS}",
            "blocks": [
                'robots_alphabot_getUltrasonicRange',
                'robots_alphabot_lineFinder_calibrate',
                'robots_alphabot_lineFinder_readSensors',
                'robots_alphabot_lineFinder_getSensorAboveLine',
                'robots_alphabot_lineFinder_isSensorAboveLine',
                'robots_alphabot_lineFinder_onAboveAnySensor',
                'robots_alphabot_readObstacleDetector',
                'robots_alphabot_onObstacleDetected'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_ALPHABOT_OLED}",
            "blocks": [
                'robots_alphabot_oled_addText',
                'robots_alphabot_oled_setBackground',
                'robots_alphabot_oled_clearScreen'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_ALPHABOT_COMMANDS}",
            "blocks": [
                'robots_alphabot_onRemoteCommandReceived',
                'robots_alphabot_onRemoteCommandReceived_car_mp3_gray',
                'robots_alphabot_joystick_onCommandReceived',
                'robots_alphabot_buzzer_controlState'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_ALPHABOT_LED_RGB}",
            "blocks": [
                'robots_alphabot_neopixel_setColor',
                'robots_alphabot_neopixel_setPaletteColor',
                'robots_alphabot_neopixel_setRainbow'
            ]
        }
    ],
    "math": [
        {
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

const TOOLBOX_SCRATCH_CONTENT_SIMPLE = TOOLBOX_SCRATCH_CONTENT;
