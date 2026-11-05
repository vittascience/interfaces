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
    //     "style": "network_category",
    //     "cssConfig": {
    //         "icon": "icon_blockly fas fa-wifi"
    //     },
    //     "contents": []
    // },
    {
        "kind": "category",
        "toolboxitemid": "communication",
        "name": "%{BKY_CATEGORY_COMMUNICATION}",
        "style": "communication_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-comment-dots"
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
        "toolboxitemid": "vittaia",
        "name": "%{BKY_CATEGORY_VITTAIA}",
        "style": "vittaia_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-brain"
        },
        "contents": []
    },
    {
        "kind": "sep",
        "id": "sep_ia",
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
            "toolboxitemid": "display_unihiker",
            "name": "%{BKY_SUBCATEGORY_UNIHIKER}",
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
            "toolboxitemid": "display_kitronik",
            "name": "%{BKY_SUBCATEGORY_KITRONIK}",
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
    "communication": [
        {
            "kind": "category",
            "toolboxitemid": "communication_k10_wifi",
            "name": "%{BKY_SUBCATEGORY_K10_WIFI}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-wifi"
            },
            "contents": []
        },
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
            "toolboxitemid": "communication_uart",
            "name": "%{BKY_SUBCATEGORY_UART}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-right-left"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "communication_i2c",
            "name": "I2C",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
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
        }
    ],
    "sensors": [
        {
            "kind": "category",
            "toolboxitemid": "sensors_unihiker",
            "name": "%{BKY_SUBCATEGORY_UNIHIKER}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
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
            "toolboxitemid": "sensors_envirobit",
            "name": "%{BKY_SUBCATEGORY_ENVIRO_BIT}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-leaf"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_weatherbit",
            "name": "%{BKY_SUBCATEGORY_WEATHER_BIT}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-cloud-sun"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_kitronik_env",
            "name": "%{BKY_SUBCATEGORY_SHORT_KITRONIK_ENV}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_other",
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
            "toolboxitemid": "actuators_unihiker",
            "name": "%{BKY_SUBCATEGORY_UNIHIKER}",
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
            "toolboxitemid": "actuators_kitronik",
            "name": "%{BKY_SUBCATEGORY_KITRONIK}",
            "style": "actuators_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "actuators_rekabit",
            "name": "Reka:Bit",
            "style": "actuators_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-cubes"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "actuators_microdriver",
            "name": "%{BKY_SUBCATEGORY_SHORT_MICRODRIVER}",
            "style": "actuators_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-gear"
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
    "vittaia": [
        {
            "kind": "category",
            "toolboxitemid": "vittaia_image",
            "name": "%{BKY_SUBCATEGORY_VITTAIA_IMAGE}",
            "style": "vittaia_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-image"
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
            "toolboxitemid": "io_unihiker_buttons",
            "name": "%{BKY_SUBCATEGORY_BUTTONS}",
            "style": "io_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
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
    "display": [
        {
            "subCategoryId": "display_unihiker",
            "contents": [
                {
                    "blocks": [
                        "display_k10_rgb",
                        "display_k10_rgb_off",
                        "display_unihiker_text",
                        "display_unihiker_clear",
                        "display_unihiker_rect",
                        "display_unihiker_circle",
                        "display_unihiker_line",
                        "display_unihiker_qrcode",
                        "display_unihiker_on_touch_button"
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
                        "display_lcdSetText",
                        "display_lcdClear"
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_DISPLAYS_OLED}",
                    "blocks": [
                        "display_addOledText",
                        "display_setOledPixel",
                        "display_showOledIcon",
                        "display_clearOledScreen"
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
                        "display_setGroveSocketLed",
                        "display_setLEDintensity",
                        "display_setVariableColorLED",
                        "display_setNumberGrove4Digit",
                        "display_setClockGrove4Digit",
                        "display_setLevelLedBar",
                        "display_my9221_reverse"
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_NEOPIXEL}",
                    "blocks": [
                        "display_defineNeopixel",
                        "display_controlColorNeopixelLed",
                        "display_controlNeopixelLed",
                        "display_neopixel_controlAllLedPalette",
                        "display_neopixel_controlAllLedRGB",
                        "display_rainbowNeopixel"
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_DISPLAYS_LED_MATRIX}",
                    "blocks": [
                        "display_led_matrix_DrawBitmap",
                        "display_led_matrix_clear"
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_DISPLAYS_RGB_LED_MATRIX}",
                    "blocks": [
                        "display_rgb_led_matrix_DrawBitmap",
                        "display_rgb_led_matrix_stopDisplay"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "display_kitronik",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_ZIP_HALO}",
                    "blocks": [
                        "display_controlColorZipHaloLed",
                        "display_controlZipHaloLed",
                        "display_ZipHaloLed_controlAllLedPalette",
                        "display_ZipHaloLed_controlAllLedRGB",
                        "display_ZipHaloLed_rainbow"
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_KITRONIK}",
                    "blocks": [
                        "display_setTrafficLight",
                        "display_setLampBitLight",
                        "sensors_getLampBitLuminosity"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "display_games",
            "contents": [
                {
                    "label": "%{BKY_DISPLAY_UNIHIKER_TICTACTOE_LABEL}",
                    "blocks": [
                        "display_unihiker_tictactoe_new",
                        "display_unihiker_tictactoe_on_touch",
                        "display_unihiker_tictactoe_touched",
                        "display_unihiker_tictactoe_place",
                        "display_unihiker_tictactoe_is_empty",
                        "display_unihiker_tictactoe_state"
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
                        'io_pause',
                        'io_waitUntil',
                        'io_initChronometer',
                        'io_getChronometer'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "io_unihiker_buttons",
            "contents": [
                {
                    "blocks": [
                        'io_unihiker_on_button',
                        'io_unihiker_is_button_pressed'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "io_pins",
            "contents": [
                {
                    "blocks": [
                        'io_unihiker_digital_write',
                        'io_digital_signal',
                        'io_unihiker_digital_read',
                        'io_unihiker_analog_read',
                        'io_unihiker_pwm_write'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "io_inputs",
            "contents": [
                {
                    "blocks": [
                        "io_getGroveButton",
                        "io_getGroveSwitch",
                        "io_getMagneticSwitch",
                        "io_getGroveTactile",
                        "io_getGroveRotaryAngle",
                        "io_getGroveSlidePotentiometer",
                        "io_getGroveColoredButton",
                        "io_setGroveColoredButton",
                        "io_getKeypadNumber",
                        "io_fingerprint_register",
                        "io_fingerprint_verify",
                        "io_getGroveThumbJoystick"
                    ]
                }
            ]
        }
    ],
    "communication": [
        {
            "subCategoryId": "communication_k10_wifi",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_K10_WIFI}",
                    "blocks": [
                        "communication_k10_wifi_connect",
                        "communication_k10_wifi_connected"
                    ]
                },
                {
                    "label": "MQTT",
                    "blocks": [
                        "communication_k10_mqtt_connect",
                        "communication_k10_mqtt_publish",
                        "communication_k10_mqtt_message"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_serial",
            "contents": [
                {
                    "blocks": [
                        "communication_serialWrite",
                        "communication_graphSerialWrite",
                        "communication_onSerialMessageReceived",
                        "communication_playComputerMusic",
                        "communication_playComputerFrequency",
                        "communication_stopComputerMusic"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_uart",
            "contents": [
                {
                    "blocks": [
                        "communication_serialInit",
                        "communication_serialRedirectUSB",
                        "communication_uart_writeData",
                        "communication_uart_isDataAvailable",
                        "communication_uart_readData",
                        "communication_uart_readLineData"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_i2c",
            "contents": [
                {
                    "blocks": [
                        "communication_i2c_init",
                        "communication_i2c_scan",
                        "communication_i2c_read",
                        "communication_i2c_write"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_rfid",
            "contents": [
                {
                    "blocks": [
                        "communication_mfrc522_getCardID",
                        "communication_rfid_getCardID"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_bluetooth",
            "contents": [
                {
                    "blocks": [
                        "communication_hc05_sendBluetoothData",
                        "communication_hc05_onBluetoothDataReceived",
                        "communication_hm10_setATCommand",
                        "communication_hm10_getATCommand",
                        "communication_hm10_sendBluetoothData",
                        "communication_hm10_onBluetoothDataReceived"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_tracking",
            "contents": [
                {
                    "blocks": [
                        "communication_gps_getNMEA",
                        "communication_gps_getGGAInformations",
                        "communication_clockRTC_setDate",
                        "communication_clockRTC_setHour",
                        "communication_clockRTC_readTime"
                    ]
                }
            ]
        }
    ],
    "sensors": [
        {
            "subCategoryId": "sensors_unihiker",
            "contents": [
                {
                    "blocks": [
                        "sensors_k10_temp_humi",
                        "sensors_unihiker_light",
                        "sensors_unihiker_acceleration",
                        "sensors_unihiker_gyroscope",
                        "sensors_unihiker_sound_level"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_gas",
            "contents": [
                {
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
                }
            ]
        },
        {
            "subCategoryId": "sensors_climate",
            "contents": [
                {
                    "blocks": [
                        "sensors_getBmp280Data",
                        "sensors_bme280_getData",
                        "sensors_getGroveMoisture",
                        "sensors_getGroveCapacitiveMoisture",
                        "sensors_getGroveTemperature",
                        "sensors_getGroveHighTemperature",
                        "sensors_barometerReadData",
                        "sensors_dhtReadData",
                        "sensors_TH02readData",
                        "sensors_SHT31readData",
                        "sensors_SHT35readData",
                        "sensors_mpx5700ap_getPressure",
                        "sensors_getGroveWaterAmount",
                        "sensors_getRainGauge",
                        "sensors_getAnemometer"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_soundlight",
            "contents": [
                {
                    "blocks": [
                        "sensors_getGroveLight",
                        "sensors_getSunlightData",
                        "sensors_getUVindex",
                        "sensors_colorSensor_getData",
                        "sensors_colorSensorV3_getData",
                        "sensors_getGroveSound"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_distance",
            "contents": [
                {
                    "blocks": [
                        "sensors_getGroveUltrasonicRanger",
                        "sensors_VL53L0X_getRangeMillimeters",
                        "sensors_getGesture",
                        "sensors_onGestureTypeDetected",
                        "sensors_getGroveLineFinder",
                        "sensors_getGroveMotion",
                        "sensors_getMiniPirGroveMotion",
                        "sensors_getGroveTilt",
                        "sensors_getPiezoVibration"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_envirobit",
            "contents": [
                {
                    "blocks": [
                        "sensors_envirobit_tcs3472_getRGB",
                        "sensors_envirobit_tcs3472_getBrightness",
                        "sensors_envirobit_tcs3472_setLED",
                        "sensors_envirobit_bme280_getData",
                        "sensors_envirobit_getSoundLevel",
                        "sensors_envirobit_waitForClaps"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_weatherbit",
            "contents": [
                {
                    "blocks": [
                        "sensors_weatherbit_bme280_getData",
                        "sensors_weatherbit_anemometer_getSpeed",
                        "sensors_weatherbit_weathercock_getDirection",
                        "sensors_weatherbit_rainGauge_getDumps",
                        "sensors_weatherbit_getSoilMoisture"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_kitronik_env",
            "contents": [
                {
                    "blocks": [
                        "sensors_kitronik_bme280_getData",
                        "sensors_kitronik_klimate_bme280_getData"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_other",
            "contents": [
                {
                    "blocks": [
                        "sensors_getGroveButton",
                        "sensors_getEarClipHeartRate",
                        "sensors_getEmgDetector",
                        "sensors_getFsr402Force",
                        "sensors_getWaterLevel"
                    ]
                }
            ]
        }
    ],
    "actuators": [
        {
            "subCategoryId": "actuators_unihiker",
            "contents": [
                {
                    "blocks": [
                        "actuators_unihiker_buzzer_music",
                        "actuators_unihiker_buzzer_pitch",
                        "actuators_unihiker_buzzer_stop",
                        "actuators_unihiker_led"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "actuators_motors",
            "contents": [
                {
                    "blocks": [
                        "actuators_setServoAngle",
                        "actuators_continuousServo_setSpeed",
                        "actuators_stepperMotor_uln2003driver_init",
                        "actuators_stepperMotor_uln2003driver_moveSteps",
                        "actuators_stepperMotor_uln2003driver_setDelay",
                        "actuators_setFanPower",
                        "actuators_setVibrationMotorState",
                        "actuators_setGroveRelayState",
                        "actuators_mosfet_setState",
                        "actuators_mosfet_setPercentValue"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "actuators_kitronik",
            "contents": [
                {
                    "blocks": [
                        "actuators_controlAccessBitBarrier",
                        "actuators_controlAccessBitBuzzer",
                        "actuators_kitronik_controlMotor",
                        "actuators_kitronik_stopMotor",
                        "actuators_kitronikShield_setServoAngle",
                        "actuators_kitronik_playFrequency"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "actuators_rekabit",
            "contents": [
                {
                    "blocks": [
                        "actuators_rekabit_runMotor",
                        "actuators_rekabit_setServoPosition"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "actuators_microdriver",
            "contents": [
                {
                    "blocks": [
                        "actuators_dfr0548_setServoAngle",
                        "actuators_dfr0548_runMotor",
                        "actuators_dfr0548_stopMotor",
                        "actuators_dfr0548_stepper",
                        "actuators_dfr0548_stepperDual"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "actuators_other",
            "contents": [
                {
                    "blocks": [
                        "actuators_setElectromagnetState",
                        "actuators_setWaterAtomizerState"
                    ]
                }
            ]
        }
    ],
    // "network": [
    //     {
    //         "label": "%{BKY_SUBCATEGORY_WIFI}",
    //         "blocks": [
    //             'network_get_pi_name'
    //         ]
    //     },
    // ],
    "vittaia": [
        {
            "subCategoryId": "vittaia_image",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_UNIHIKER}",
                    "blocks": [
                        "ai_k10_start",
                        "ai_k10_update",
                        "ai_k10_qrcode",
                        "ai_k10_detected",
                        "ai_k10_face",
                        "ai_k10_face_id"
                    ]
                },
                {
                    "blocks": [
                        'vittaia_load_local_model',
                        'vittaia_load_model',
                        'vittaia_load_model_default',
                        'vittaia_make_predictions_webcam',
                        'ai_unihiker_camera_stream',
                        'ai_unihiker_camera_rotate',
                        'vittaia_make_predictions_from_url',
                        'vittaia_get_highest_probability_class',
                        'vittaia_get_confidence_rate',
                        'vittaia_get_predictions',
                        'vittaia_detect_class',
                        'vittaia_list_webcams',
                        'vittaia_init_webcam'
                    ]
                }
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
                    'lists_shuffle',
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

// UNIHIKER K10 (MicroPython): the blocks of its library unihiker_k10, the subcategories left empty are removed
if (IS_UNIHIKER_K10) {
    // blocks of the M10 board (touch screen, gyroscope, microphone, LED, AI of the camera) and modules that the K10
    // can't drive (SPI, NeoPixel or PWM on the pins of its I/O expander)
    const K10_EXCLUDED_BLOCKS = [
        "display_unihiker_qrcode", "display_unihiker_on_touch_button", "display_unihiker_tictactoe_new", "display_unihiker_tictactoe_on_touch",
        "display_unihiker_tictactoe_touched", "display_unihiker_tictactoe_place", "display_unihiker_tictactoe_is_empty", "display_unihiker_tictactoe_state",
        "sensors_unihiker_gyroscope", "sensors_unihiker_sound_level", "actuators_unihiker_led",
        "communication_mfrc522_getCardID", "display_controlColorZipHaloLed", "display_controlZipHaloLed", "display_ZipHaloLed_controlAllLedPalette",
        "display_ZipHaloLed_controlAllLedRGB", "display_ZipHaloLed_rainbow", "actuators_kitronik_controlMotor", "actuators_kitronik_stopMotor",
        "actuators_kitronik_playFrequency", "sensors_envirobit_getSoundLevel", "sensors_envirobit_waitForClaps"
    ];
    const K10_HARDWARE_BLOCK = (type) => !K10_EXCLUDED_BLOCKS.includes(type) && !/^(vittaia_|ai_unihiker_)/.test(type);
    const HARDWARE_CATEGORIES = ["display", "io", "communication", "sensors", "actuators", "vittaia"];
    for (const category of HARDWARE_CATEGORIES) {
        TOOLBOX_VITTASCIENCE_CONTENT[category] = (TOOLBOX_VITTASCIENCE_CONTENT[category] || []).map(sub => ({
            ...sub,
            "contents": sub.contents.map(group => ({ ...group, "blocks": group.blocks.filter(K10_HARDWARE_BLOCK) }))
                .filter(group => group.blocks.length)
        })).filter(sub => sub.contents.length);
        const kept = TOOLBOX_VITTASCIENCE_CONTENT[category].map(sub => sub.subCategoryId);
        TOOLBOX_VITTASCIENCE_SUBCATEGORIES[category] = (TOOLBOX_VITTASCIENCE_SUBCATEGORIES[category] || []).filter(sub => kept.includes(sub.toolboxitemid));
    }
    for (let i = TOOLBOX_VITTASCIENCE_CATEGORIES.length - 1; i >= 0; i--) {
        if (HARDWARE_CATEGORIES.includes(TOOLBOX_VITTASCIENCE_CATEGORIES[i].toolboxitemid) && !TOOLBOX_VITTASCIENCE_CONTENT[TOOLBOX_VITTASCIENCE_CATEGORIES[i].toolboxitemid].length) {
            TOOLBOX_VITTASCIENCE_CATEGORIES.splice(i, 1);
        }
    }
} else {
    // buzzers of the micro:bit modules on P1 (Access:bit) and P12 (Kitronik): pins without PWM on the M10
    const M10_EXCLUDED_BLOCKS = ["actuators_controlAccessBitBuzzer", "actuators_kitronik_playFrequency"];
    // the K10 blocks (_k10_ in their name) aren't in the M10 toolbox, nor their subcategories left empty
    for (const category of Object.keys(TOOLBOX_VITTASCIENCE_CONTENT).filter(name => Array.isArray(TOOLBOX_VITTASCIENCE_CONTENT[name]))) {
        TOOLBOX_VITTASCIENCE_CONTENT[category] = TOOLBOX_VITTASCIENCE_CONTENT[category].map(sub => !sub.contents ? sub : ({
            ...sub,
            "contents": sub.contents.map(group => !group.blocks ? group : ({ ...group, "blocks": group.blocks.filter(type => !/_k10_/.test(type) && !M10_EXCLUDED_BLOCKS.includes(type)) }))
                .filter(group => !group.blocks || group.blocks.length)
        })).filter(sub => !sub.contents || sub.contents.length);
        const kept = TOOLBOX_VITTASCIENCE_CONTENT[category].map(sub => sub.subCategoryId);
        if (TOOLBOX_VITTASCIENCE_SUBCATEGORIES[category]) {
            TOOLBOX_VITTASCIENCE_SUBCATEGORIES[category] = TOOLBOX_VITTASCIENCE_SUBCATEGORIES[category].filter(sub => kept.includes(sub.toolboxitemid));
        }
    }
}
