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
    "display": [
        {
            "kind": "category",
            "toolboxitemid": "display_galaxia",
            "name": "%{BKY_SUBCATEGORY_GALAXIA}",
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
            "toolboxitemid": "io_buttons",
            "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_BUTTONS}",
            "style": "io_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-circle-dot"
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
            "toolboxitemid": "communication_integrated_radio",
            "name": "%{BKY_SUBCATEGORY_INTEGRATED_RADIO}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-tower-broadcast"
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
            "toolboxitemid": "communication_infrared_communication",
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
    "sensors": [
        {
            "kind": "category",
            "toolboxitemid": "sensors_galaxia",
            "name": "%{BKY_SUBCATEGORY_GALAXIA}",
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
            "name": "%{BKY_SUBCATEGORY_MOTORS}",
            "style": "actuators_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-gears"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "actuators_mosfet",
            "name": "%{BKY_SUBCATEGORY_MOSFET}",
            "style": "actuators_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-bolt"
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
            "toolboxitemid": "actuators_music",
            "name": "%{BKY_SUBCATEGORY_MUSIC}",
            "style": "actuators_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-music"
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
            "subCategoryId": "display_galaxia",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_GALAXIA_DISPLAY}",
                    "blocks": [
                        'display_galaxia_screen_set_text',
                        'display_galaxia_screen_set_text_value',
                        'display_galaxia_screen_clear'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_GALAXIA_RGB_LED}",
                    "blocks": [
                        'display_galaxia_led_set_colors_rgb',
                        'display_galaxia_led_set_colors_palette',
                        'display_galaxia_led_set_color',
                        'display_galaxia_led_get_color'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_GALAXIA_GRAPHICS}",
                    "blocks": [
                        'display_galaxia_set_mode',
                        'display_galaxia_plot_add_point',
                        'display_galaxia_plot_set_y_scale',
                        // 'display_galaxia_animate_function' // not properly working on Galaxia Board
                        'display_galaxia_raw_print',
                        'display_galaxia_raw_text',
                        'display_galaxia_raw_rect',
                        'display_galaxia_raw_print_img',
                        'display_galaxia_raw_print_custom_img'
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
            "subCategoryId": "io_buttons",
            "contents": [
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
                        "io_getGroveThumbJoystick",
                        "io_rotaryEncoder",
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
            "subCategoryId": "communication_data_logging",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_GALAXIA_LOG}",
                    "blocks": [
                        'communication_log_delete',
                        'communication_log_setLabel',
                        'communication_log_addData',
                        'communication_log_data',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_DATA_LOGGING}",
                    "blocks": [
                        'communication_writeOpenLogSd',
                        'communication_esp32_FS_saveData'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_integrated_radio",
            "contents": [
                {
                    "blocks": [
                        'communication_radioSendString',
                        'communication_radioSendNumber',
                        'communication_radioSendValue',
                        'communication_onRadioDataReceived',
                        'communication_onRadioNumberReceived',
                        'communication_onRadioValueReceived',
                        'communication_radioConfig'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_external_bluetooth",
            "contents": [
                {
                    "blocks": [
                        'communication_groveSerialBluetooth_setATCommand',
                        'communication_groveSerialBluetooth_getATCommand',
                        'communication_sendSerialBluetoothData',
                        'communication_onSerialBluetoothDataReceived',
                        'communication_hc05_sendBluetoothData',
                        'communication_hc05_onBluetoothDataReceived'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_infrared_communication",
            "contents": [
                {
                    "blocks": [
                        'communication_irEmit'
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
                        'communication_mfrc522_getCardID',
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
    "sensors": [
        {
            "subCategoryId": "sensors_galaxia",
            "contents": [
                {
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
                        'sensors_linky',
                        'sensors_getBmp280Data',
                        'sensors_getGroveMoisture',
                        'sensors_getGroveTemperature',
                        'sensors_getGroveHighTemperature',
                        'sensors_barometerReadData',
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
        },
        {
            "subCategoryId": "sensors_sensors_other",
            "contents": [
                {
                    "blocks": [
                        'sensors_getMlx90621Temperature',
                        'sensors_getMlx90621TempData',
                        'sensors_displayMlx90621Values',
                        'sensors_displayMlx90621CustomValues',
                        'sensors_getWaterLevel'
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
            "subCategoryId": "actuators_mosfet",
            "contents": [
                {
                    "blocks": [
                        'actuators_mosfet_setState',
                        'actuators_mosfet_setPercentValue',
                        'actuators_mosfet_setFrequency'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "actuators_kitronik",
            "contents": [
                {
                    "blocks": [
                        'actuators_kitronik_controlMotor',
                        'actuators_kitronik_stopMotor',
                        'actuators_kitronikShield_setServoAngle'
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
                        'network_server_getClientDataParam',
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