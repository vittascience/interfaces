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
        "toolboxitemid": "ia",
        "name": "%{BKY_CATEGORY_VITTAIA}",
        "style": "ia_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-brain"
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
    "display": [
        {
            "kind": "category",
            "toolboxitemid": "display_microbit",
            "name": "%{BKY_SUBCATEGORY_MICROBIT}",
            "style": "display_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
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
            "toolboxitemid": "display_led",
            "name": "%{BKY_SUBCATEGORY_LED}",
            "style": "display_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "display_games",
            "name": "%{BKY_SUBCATEGORY_GAMES}",
            "style": "display_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-gamepad"
            },
            "contents": []
        }
    ],
    "io": [
        {
            "kind": "category",
            "toolboxitemid": "io_microbit",
            "name": "%{BKY_SUBCATEGORY_MICROBIT}",
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
            "toolboxitemid": "io_inputs",
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
            "toolboxitemid": "communication_serial",
            "name": "%{BKY_SUBCATEGORY_SERIAL_CONNECTION}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-terminal"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "communication_radio",
            "name": "%{BKY_SUBCATEGORY_INTEGRATED_RADIO}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-tower-broadcast"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "communication_datalog",
            "name": "%{BKY_SUBCATEGORY_SHORT_DATA_LOGGING}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-sd-card"
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
            "toolboxitemid": "communication_tracking",
            "name": "%{BKY_SUBCATEGORY_SHORT_TRACKING}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-location-dot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "communication_rfid",
            "name": "%{BKY_SUBCATEGORY_RFID}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-id-card"
            },
            "contents": []
        }
    ],
    "sensors": [
        {
            "kind": "category",
            "toolboxitemid": "sensors_microbit",
            "name": "%{BKY_SUBCATEGORY_MICROBIT}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_distance",
            "name": "%{BKY_SUBCATEGORY_SHORT_DISTANCE_MOVEMENT}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-ruler"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_climate",
            "name": "%{BKY_SUBCATEGORY_SHORT_WEATHER}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-temperature-half"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_gas",
            "name": "%{BKY_SUBCATEGORY_SHORT_GAS}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-smog"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_soundlight",
            "name": "%{BKY_SUBCATEGORY_SHORT_SOUND_LIGHT}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_health",
            "name": "%{BKY_SUBCATEGORY_SHORT_HEALTH}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-heart-pulse"
            },
            "contents": []
        }
    ],
    "actuators": [
        {
            "kind": "category",
            "toolboxitemid": "actuators_microbit",
            "name": "%{BKY_SUBCATEGORY_MICROBIT}",
            "style": "actuators_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
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
            "toolboxitemid": "actuators_other",
            "name": "%{BKY_SUBCATEGORY_SHORT_OTHER}",
            "style": "actuators_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-ellipsis"
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
            "toolboxitemid": "voiceRecognition",
            "name": "%{BKY_SUBCATEGORY_VOICE_RECOGNITION}",
            "style": "ia_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-microphone"
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
        },
        {
            "kind": "category",
            "toolboxitemid": "math_encryption",
            "name": "%{BKY_SUBCATEGORY_ENCRYPTION}",
            "style": "math_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-lock"
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
    "display": [
        {
            "subCategoryId": "display_microbit",
            "contents": [
            {
                "blocks": [
                    'show_icon',
                    'show_number',
                    'show_number-txt',
                    'show_string-num',
                    'show_string',
                    'clear',
                    'show_leds',
                    'display_show_gauge',
                    'display_plot_bar_graph',
                    'set_pixel',
                    'set_light_pixel',
                    'get_pixelState',
                    'toggle_pixelState',
                    'set_brightness',
                    'show_clock',
                    'show_arrow'
                ]
            }
            ]
        },
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
                    'display_showOledIcon',
                    'display_clearOledScreen',
                    'display_morpionNewGame',
                    'display_morpionMoveCursor',
                    'display_morpionSetPlayerFigure',
                    'display_morpionIsEndGame'
                ]
            },
            {
                "label": "%{BKY_SUBCATEGORY_4DIGITS_DISPLAY}",
                "blocks": [
                    'display_setNumberGrove4Digit',
                    'display_setClockGrove4Digit'
                ]
            }
            ]
        },
        {
            "subCategoryId": "display_led",
            "contents": [
            {
                "label": "%{BKY_SUBCATEGORY_LED}",
                "blocks": [
                    'display_setGroveSocketLed',
                    'display_setLEDintensity',
                    'display_setVariableColorLED',
                    'display_setLevelLedBar',
                    'display_my9221_reverse'
                ]
            },
            {
                "label": "%{BKY_SUBCATEGORY_NEOPIXEL}",
                "blocks": [
                    'display_defineNeopixel',
                    'display_controlColorNeopixelLed',
                    'display_controlNeopixelLed',
                    'display_neopixel_controlAllLedPalette',
                    'display_neopixel_controlAllLedRGB',
                    'display_rainbowNeopixel'
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
                "label": "%{BKY_SUBCATEGORY_KITRONIK}",
                "blocks": [
                    'display_setTrafficLight',
                    'display_setLampBitLight',
                    'sensors_getLampBitLuminosity'
                ]
            }
            ]
        },
        {
            "subCategoryId": "display_games",
            "contents": [
            {
                "blocks": [
                    'display_games_createSprite',
                    'display_games_deleteSprite',
                    'display_games_isSpriteDeleted',
                    'display_games_moveSprite',
                    'display_games_getSpritePosition',
                    'display_games_changeScore',
                    'display_games_getScore',
                    'display_games_stopGame',
                    'display_games_isEndGame',
                    'display_games_restartGame'
                ]
            }
            ]
        }
    ],
    "io": [
        {
            "subCategoryId": "io_microbit",
            "contents": [{
                "blocks": [
                    'io_onButtonPressed',
                    'io_onPinPressed',
                    'io_onMovement',
                    'io_isButtonPressed',
                    'io_isPinPressed',
                    'io_buttons_getPresses',
                    'io_microbit_reset',
                    'io_exec'
                ]
            }]
        },
        {
            "subCategoryId": "io_time",
            "contents": [{
                "blocks": [
                    'io_pause',
                    'io_waitUntil',
                    'io_runEvery',
                    'io_initChronometer',
                    'io_getChronometer'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_SHORT_RTC}",
                "blocks": [
                    'communication_clockRTC_setDate',
                    'communication_clockRTC_setHour',
                    'communication_clockRTC_readTime'
                ]
            }]
        },
        {
            "subCategoryId": "io_inputs",
            "contents": [{
                "blocks": [
                    'io_getGroveButton',
                    'sensors_getGroveButton',
                    'io_getGroveSwitch',
                    'io_getMagneticSwitch',
                    'io_getGroveTactile',
                    'io_getGroveRotaryAngle',
                    'io_getGroveSlidePotentiometer',
                    'io_getGroveColoredButton',
                    'io_setGroveColoredButton',
                    'io_getKeypadNumber',
                    'io_fingerprint_register',
                    'io_fingerprint_verify',
                    'io_getGroveThumbJoystick'
                ]
            }]
        },
        {
            "subCategoryId": "io_pins",
            "contents": [{
                "blocks": [
                    'io_digital_signal',
                    'io_readDigitalPin',
                    'io_writeDigitalPin',
                    'io_readAnalogPin',
                    'io_writeAnalogPin',
                    'io_setPwm',
                    'io_readPulseIn',
                    'io_setPull'
                ]
            }]
        }
    ],
    "communication": [
        {
            "subCategoryId": "communication_serial",
            "contents": [{
                "blocks": [
                    'communication_serialWrite',
                    'communication_graphSerialWrite',
                    'communication_onSerialMessageReceived',
                    'communication_onSerialDataReceived',
                    'communication_playComputerMusic',
                    'communication_playComputerFrequency',
                    'communication_stopComputerMusic'
                ]
            }]
        },
        {
            "subCategoryId": "communication_radio",
            "contents": [{
                "blocks": [
                    'communication_radioSendString',
                    'communication_radioSendNumber',
                    'communication_radioSendValue',
                    'communication_onRadioDataReceived',
                    'communication_onRadioNumberReceived',
                    'communication_onRadioValueReceived',
                    'communication_radioConfig',
                    'communication_radioReceiveFull'
                ]
            }]
        },
        {
            "subCategoryId": "communication_datalog",
            "contents": [{
                "label": "%{BKY_SUBCATEGORY_MICROBIT_LOG}",
                "blocks": [
                    'communication_log_deleteLogs',
                    'communication_log_serial',
                    'communication_log_setLabel',
                    'communication_log_addData',
                    'communication_log_data'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_DATA_LOGGING}",
                "blocks": [
                    'communication_writeOpenLogSd'
                ]
            }]
        },
        {
            "subCategoryId": "communication_bluetooth",
            "contents": [{
                "label": "HC-05",
                "blocks": [
                    'communication_hc05_sendBluetoothData',
                    'communication_hc05_onBluetoothDataReceived'
                ]
            }, {
                "label": "HM-10",
                "blocks": [
                    'communication_hm10_setATCommand',
                    'communication_hm10_getATCommand',
                    'communication_hm10_sendBluetoothData',
                    'communication_hm10_onBluetoothDataReceived'
                ]
            }]
        },
        {
            "subCategoryId": "communication_tracking",
            "contents": [{
                "blocks": [
                    'communication_gps_getNMEA',
                    'communication_gps_getGGAInformations'
                ]
            }]
        },
        {
            "subCategoryId": "communication_rfid",
            "contents": [{
                "label": "RC522",
                "blocks": [
                    'communication_mfrc522_getCardID'
                ]
            }, {
                "label": "RFID 125 kHz",
                "blocks": [
                    'communication_rfid_getCardID'
                ]
            }]
        }
    ],
    "sensors": [
        {
            "subCategoryId": "sensors_microbit",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_MICROBIT}",
                    "blocks": [
                        'sensors_getLight',
                        'sensors_getTemperature',
                        'sensors_getAcceleration',
                        'sensors_getRotation',
                        'sensors_getCompass',
                        'sensors_calibrateCompass',
                        'sensors_isCompassCalibrated',
                        'sensors_getMagneticForce'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_MICROPHONE} (V2)",
                    "blocks": [
                        'io_micro_onSoundDetected',
                        'io_micro_getCurrentSound',
                        'io_micro_wasSoundDetected',
                        'io_micro_getSoundLevel',
                        'io_micro_getHistorySounds',
                        'io_micro_setSoundThreshold',
                        'io_micro_soundCondition'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_distance",
            "contents": [{
                "blocks": [
                    'sensors_getGroveUltrasonicRanger',
                    'sensors_VL53L0X_getRangeMillimeters',
                    'sensors_getGesture',
                    'sensors_onGestureTypeDetected',
                    'sensors_getGroveLineFinder',
                    'sensors_getGroveMotion',
                    'sensors_getMiniPirGroveMotion',
                    'sensors_getGroveTilt',
                    'sensors_getPiezoVibration',
                    'sensors_getFsr402Force'
                ]
            }]
        },
        {
            "subCategoryId": "sensors_climate",
            "contents": [{
                "blocks": [
                    'sensors_getBmp280Data',
                    'sensors_bme280_getData',
                    'sensors_getGroveMoisture',
                    'sensors_getGroveCapacitiveMoisture',
                    'sensors_getGroveTemperature',
                    'sensors_getGroveHighTemperature',
                    'sensors_barometerReadData',
                    'sensors_dhtReadData',
                    'sensors_TH02readData',
                    'sensors_SHT31readData',
                    'sensors_SHT35readData',
                    'sensors_mpx5700ap_getPressure',
                    'sensors_getGroveWaterAmount',
                    'sensors_getWaterLevel',
                    'sensors_getRainGauge',
                    'sensors_getAnemometer'
                ]
            }]
        },
        {
            "subCategoryId": "sensors_gas",
            "contents": [{
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
            }]
        },
        {
            "subCategoryId": "sensors_soundlight",
            "contents": [{
                "blocks": [
                    'sensors_getGroveLight',
                    'sensors_getSunlightData',
                    'sensors_getUVindex',
                    'sensors_colorSensor_getData',
                    'sensors_colorSensorV3_getData',
                    'sensors_getGroveSound'
                ]
            }]
        },
        {
            "subCategoryId": "sensors_health",
            "contents": [{
                "blocks": [
                    'sensors_getEarClipHeartRate',
                    'sensors_getEmgDetector'
                ]
            }]
        }
    ],
    "actuators": [
        {
            "subCategoryId": "actuators_microbit",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_AUDIO} (V2)",
                    "blocks": [
                        'microbit_audio_play',
                        'microbit_audio_stop'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_MUSIC} (V2)",
                    "blocks": [
                        'actuators_playMusicGroveBuzzer',
                        'actuators_music_playSong',
                        'actuators_music_playNotes',
                        'actuators_music_playFrequency',
                        'actuators_music_stop',
                        'actuators_music_setVolume',
                        'actuators_music_setTempo'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_SPEECH} (V2)",
                    "blocks": [
                        'actuators_speech_saySomething'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "actuators_motors",
            "contents": [{
                "label": "%{BKY_SUBCATEGORY_SERVOMOTORS}",
                "blocks": [
                    'actuators_setServoAngle',
                    'actuators_continuousServo_setSpeed',
                    'actuators_kitronikShield_setServoAngle'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_SHORT_STEPPER}",
                "blocks": [
                    'actuators_stepperMotor_uln2003driver_init',
                    'actuators_stepperMotor_uln2003driver_moveSteps',
                    'actuators_stepperMotor_uln2003driver_setDelay'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_MOTORS}",
                "blocks": [
                    'actuators_motor_driver_control',
                    'actuators_setFanPower',
                    'actuators_setVibrationMotorState'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_RELAY_MOSFET}",
                "blocks": [
                    'actuators_setGroveRelayState',
                    'actuators_mosfet_setState',
                    'actuators_mosfet_setPercentValue'
                ]
            }]
        },
        {
            "subCategoryId": "actuators_other",
            "contents": [{
                "blocks": [
                    'actuators_setElectromagnetState',
                    'actuators_setWaterAtomizerState'
                ]
            }]
        }
    ],
    // The robots are block extensions (BlockExtensions._pushRobots), added to this category.
    "robots": [],
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
            "subCategoryId": "voiceRecognition",
            "contents": [
                {
                    "label": "Module DF2301Q",
                    "blocks": [
                        "ia_voiceRecognition_setVolume",
                        "ia_voiceRecognition_getCMDID",
                        "ia_voiceRecognition_onCommand",
                        "ia_voiceRecognition_playByCMDID"
                    ]
                }
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
                    "label": "HuskyLens V2",
                    "blocks": [
                        'cameras_huskylens_v2_initMode',
                        'cameras_huskylens_v2_count',
                        'cameras_huskylens_v2_isAppear',
                        'cameras_huskylens_v2_writeLearn1',
                        'cameras_huskylens_v2_learnedId',
                        'cameras_huskylens_v2_forgetLearn',
                        'cameras_huskylens_v2_writeName',
                        'cameras_huskylens_v2_writeOSD',
                        'cameras_huskylens_v2_clearOSD',
                        'cameras_huskylens_v2_saveModelToTFCard',
                        'cameras_huskylens_v2_initCustomMode',
                        'cameras_huskylens_v2_drawRect',
                        'cameras_huskylens_v2_clearRect',
                        'cameras_huskylens_v2_drawUniqueRect',
                        'cameras_huskylens_v2_takePhoto',
                        'cameras_huskylens_v2_takeScreenshot',
                        'cameras_huskylens_v2_playMusic',
                        'cameras_huskylens_v2_startRecording',
                        'cameras_huskylens_v2_stopRecording',
                        'cameras_huskylens_v2_learnBlock',
                        'cameras_huskylens_v2_setMultiAlgorithm',
                        'cameras_huskylens_v2_setMultiAlgorithmRatio',
                        'cameras_huskylens_v2_getAlgoParam',
                        'cameras_huskylens_v2_setAlgoParam',
                        'cameras_huskylens_v2_updateAlgoParams',
                        'cameras_huskylens_v2_exit',
                        'cameras_huskylens_v2_getResultByIndex',
                        'cameras_huskylens_v2_getResultById',
                        'cameras_huskylens_v2_getCenterResult',
                        'cameras_huskylens_v2_getLargestResult',
                        'cameras_huskylens_v2_getBranchCount',
                        'cameras_huskylens_v2_getBranchByIndex',
                        'cameras_huskylens_v2_getKeypoint',
                        'cameras_huskylens_v2_getFaceOrientation',
                        'cameras_huskylens_v2_getVisibleId',
                        'cameras_huskylens_v2_getVisibleIdCount',
                        'cameras_huskylens_v2_countById',
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
        },
        {
            "subCategoryId": "math_encryption",
            "contents": [{
                "blocks": [
                    'math_RSA_generate_keys',
                    'math_RSA_cipher_message',
                    'math_RSA_decipher_message'
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
    "exception": [
        {
            "blocks": [
                'exception_raise',
                'exception_exception',
                'exception_type',
                'exception_try'
            ]
        }]
};

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;