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
            "toolboxitemid": "actuators_music",
            "name": "%{BKY_SUBCATEGORY_MUSIC}",
            "style": "actuators_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-music"
            },
            "contents": []
        }
    ],
    "display": [
        {
            "kind": "category",
            "toolboxitemid": "display_steami",
            "name": "%{BKY_SUBCATEGORY_STEAMI}",
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
            "toolboxitemid": "io_steami",
            "name": "%{BKY_SUBCATEGORY_STEAMI}",
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
            "toolboxitemid": "communication_bluetooth_ble",
            "name": "%{BKY_SUBCATEGORY_SHORT_BLUETOOTH}",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fab fa-bluetooth-b"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "communication_log_log",
            "name": "Log",
            "style": "communication_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-file-lines"
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
            "toolboxitemid": "sensors_steami",
            "name": "%{BKY_SUBCATEGORY_STEAMI}",
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
    "robots": [
        {
            "kind": "category",
            "toolboxitemid": "donutbot",
            "name": "Donutbot",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        }
    ],
    "ia": [
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
            "subCategoryId": "display_steami",
            "contents": [
                {
                    "blocks": [
                        'display_stm32_controlColorLed',
                        'display_stm32_toggleColorLed',
                        'display_steami_addOledText',
                        'display_steami_setOledPixel',
                        'display_steami_drawOledLine',
                        'display_steami_setOledBackground',
                        'display_steami_clearOledScreen'
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
                        'display_lcdClear',
                        'display_lcdSetColor',
                        'display_lcdSetColorPalette'
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
            "subCategoryId": "io_steami",
            "contents": [
                {
                    "blocks": [
                        'io_steami_onSwitchButtonState'
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
                        "io_getGroveThumbJoystick",
                        "io_getKeypadNumber"
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
            "subCategoryId": "communication_bluetooth_ble",
            "contents": [
                {
                    "blocks": [
                        'communication_ble_STSensorApp_send',
                        'communication_ble_STSensorApp_service',
                        'communication_BLE_SendData',
                        'communication_BLE_ReadData',
                        'communication_FizziqBT'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "communication_log_log",
            "contents": [
                {
                    "blocks": [
                        'communication_log_setLabel',
                        'communication_log_addData',
                        'communication_log_deleteLogs'
                    ]
                }
            ]
        },
        // {
        //     "label": "%{BKY_SUBCATEGORY_LORA}",
        //     "blocks": [
        //         'communication_loraInit',
        //         'communication_loraSend',
        //     ]
        // },
        {
            "subCategoryId": "communication_tracking",
            "contents": [
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
                }
            ]
        },
        {
            "subCategoryId": "communication_uart",
            "contents": [
                {
                    "blocks": [
                        'communication_uartInit',
                        'communication_uartWrite'
                    ]
                }
            ]
        }
    ],
    "sensors": [
        {
            "subCategoryId": "sensors_steami",
            "contents": [
                {
                    "blocks": [
                        'sensors_steami_apds9960_readData',
                        'sensors_steami_hts221_readData',
                        'sensors_steami_vl53l1x_read',
                        'sensors_steami_wsen_hids_readData',
                        'sensors_steami_wsen_pads_readData',
                        'sensors_steami_lis2mdl_readData',
                        'sensors_steami_ism330dl_readData',
                        'sensors_steami_bq27441_readData'
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
                        "sensors_SCD30_forcedCalibration",
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
                        'sensors_VL53L0X_getRangeMillimeters',
                        'sensors_getGroveUltrasonicRanger',
                        'sensors_getGroveLineFinder',
                        'sensors_getGroveMotion',
                        'sensors_getGroveTilt',
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
            "subCategoryId": "actuators_music",
            "contents": [
                {
                    "blocks": [
                        'actuators_playMusicGroveBuzzer',
                        'actuators_music_playNotes',
                        'actuators_music_note',
                        'actuators_music_playFrequency',
                        'actuators_music_stop',
                    ]
                }
            ]
        }
    ],
    // "robots": [
    //     {
    //         "subCategoryId": 'donutbot',
    //         "contents": [{
    //             "label": "%{BKY_SUBCATEGORY_DONUTBOT_MOTORS}",
    //             "blocks": [
    //                 'robots_donutbot_setGo',
    //                 'robots_donutbot_controlMotor',
    //                 'robots_donutbot_turnTo',
    //                 'robots_donutbot_turnToAngle',
    //                 'robots_donutbot_stopMotors',
    //                 'robots_donutbot_releaseMotors',
    //                 'robots_donutbot_moveOneSquareForward',
    //                 'robots_donutbot_moveOneSquareBackward',
    //                 'robots_donutbot_turnLeft',
    //                 'robots_donutbot_turnRight'
    //             ]
    //         },
    //         {
    //             "label": "%{BKY_SUBCATEGORY_DONUTBOT_SENSORS}",
    //             "blocks": [
    //                 'robots_donutbot_readDistance',
    //                 'robots_donutbot_getUltrasonicRange',
    //                 'robots_donutbot_lineDetectorFunction',
    //                 'robots_donutbot_lineDetector',
    //                 'robots_donutbot_lineDetectorThreshold',
    //                 'robots_donutbot_colorDetector',
    //                 'robots_donutbot_colorDetector_average',
    //                 'robots_donutbot_colorDetector_name'
    //             ]
    //         },
    //         {
    //             "label": "%{BKY_SUBCATEGORY_DONUTBOT_LED_RGB}",
    //             "blocks": [
    //                 'robots_donutbot_neopixel_setPaletteColor',
    //                 'robots_donutbot_neopixel_setColor',
    //                 'robots_donutbot_blinkRobot',
    //                 'robots_donutbot_neopixel_setRainbow'
    //             ]
    //         },
    //         {
    //             "label": "%{BKY_SUBCATEGORY_DONUTBOT_IO}",
    //             "blocks": [
    //                 'robots_donutbot_buttons_onPressed'
    //             ]
    //         },
    //         {
    //             "label": "%{BKY_SUBCATEGORY_DONUTBOT_COMMUNICATION}",
    //             "blocks": [
    //                 'robots_donutbot_BLE_SendData',
    //                 'robots_donutbot_BLE_ReadData'
    //             ]
    //         }],
    //     }
    // ],
    "ia": [
        {
            "subCategoryId": 'cameras',
            "contents": [
                {
                    "label": "Wio Lite AI",
                    "blocks": [
                        'wio_make_prediction',
                        'wio_get_class_data',
                        'wio_get_class_data_by_id',
                        'wio_get_class_max_id',
                        'wio_get_status'
                    ]
                },
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