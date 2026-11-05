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
    // {
    //     "kind": "category",
    //     "toolboxitemid": "network",
    //     "name": "%{BKY_CATEGORY_NETWORK}",
    //     "style": "network_category",
    //     "cssConfig": {
    //         "icon": "icon_blockly fas fa-wifi"
    //     },
    //     "contents": []
    // },
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
    "robots": [
        {
            "kind": "category",
            "toolboxitemid": "robots_yahboom_g1tank",
            "name": "G1 Tank",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        }
    ],
    "display": [
        {
            "kind": "category",
            "toolboxitemid": "display_sensehat_matrix",
            "name": "Sense HAT",
            "style": "display_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "display_displays_lcd",
            "name": "%{BKY_SUBCATEGORY_DISPLAYS_LCD}",
            "style": "display_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-tv"
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
            "toolboxitemid": "io_sensehat_joystick",
            "name": "Sense HAT",
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
            "toolboxitemid": "io_external_inputs",
            "name": "%{BKY_SUBCATEGORY_EXTERNAL_INPUTS}",
            "style": "io_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-toggle-on"
            },
            "contents": []
        }
    ],
    "sensors": [
        {
            "kind": "category",
            "toolboxitemid": "sensors_cameras",
            "name": "%{BKY_SUBCATEGORY_CAMERAS}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-camera"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_sensehat_sensors",
            "name": "Sense HAT",
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
            "subCategoryId": "display_sensehat_matrix",
            "contents": [
                {
                    "blocks": [
                        "sensehat_display_set_pixel",
                        "sensehat_display_set_pixel_palette",
                        'sensehat_display_set_pixels_image',
                        'sensehat_display_get_pixel',
                        'sensehat_display_get_pixels',
                        'sensehat_show_leds_image',
                        'sensehat_display_clear',
                        'sensehat_display_clear_with_color',
                        'sensehat_display_show_message',
                        'sensehat_display_show_letter',
                        // "sensehat_display_set_pixel_palette",
                    ]
                }
            ]
        },
        {
            "subCategoryId": "display_displays_lcd",
            "contents": [
                {
                    "blocks": [
                        'display_lcdSetText',
                        'display_lcdClear'
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
                        'display_setClockGrove4Digit'
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
                        'io_getChronometer',
                        'io_datetime_ymd_hms'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "io_sensehat_joystick",
            "contents": [
                {
                    "blocks": [
                        'sensehat_wait_for_event',
                        'sensehat_get_event_action_direction',
                        'sensehat_get_event_joystick',
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
                        'io_writePwm',
                        'io_setPwm',
                        'io_stopPwm',
                        'io_setPinMode'
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
                        'io_getMagneticSwitch',
                        'io_getGroveTactile',
                        'io_getGroveColoredButton',
                        'io_setGroveColoredButton'
                    ]
                }
            ]
        }
    ],
    "communication": [
        {
            "label": "%{BKY_SUBCATEGORY_SERIAL_CONNECTION}",
            "blocks": [
                'communication_serialWrite',
                'communication_graphSerialWrite',
                'communication_graphSerialWrite_datasFormat'
            ]
        },
    ],
    "sensors": [
        {
            "subCategoryId": "sensors_cameras",
            "contents": [
                {
                    "blocks": [
                        'sensors_rpi_camera_takePicture',
                        'sensors_rpi_camera_takeVideo',
                        'sensors_rpi_camera_changeSize',
                        'sensors_usb_camera_takePicture',
                        'sensors_usb_camera_takeVideo',
                        'sensors_usb_camera_changeSize',
                        'sensors_cv2_camera_savePicture',
                        'sensors_camera_showPictureInVittascience-img',
                        'sensors_camera_showPictureInVittascience-filename',
                        'sensors_camera_showVideoInVittascience',
                        'sensors_camera_getPictureFiles',
                        'sensors_camera_getVideoFiles'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_sensehat_sensors",
            "contents": [
                {
                    "blocks": [
                        'sensehat_getSenseHatHumidity',
                        'sensehat_getSenseHatTemperature',
                        'sensehat_getTemperatureFrom',
                        'sensehat_getSenseHatPressure',
                        'sensehat_set_imu_config',
                        'sensehat_imu_get_orientation',
                        'sensehat_imu_get_compass',
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
                        'sensors_SCD30_readData',
                        //'sensors_getParticulateMatter'
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
                        'sensors_DHT11ReadData',
                        'sensors_DHT22ReadData',
                        'sensors_SHT31readData',
                        'sensors_DS18B20_getTemperature',
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
                        'sensors_getSunlightData',
                        'sensors_colorSensorV2_getData'
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
    "robots": [
        {
            "subCategoryId": "robots_yahboom_g1tank",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_CONTROL}",
                    "blocks": [
                        'robots_yahboom_g1tank_setLedColor',
                        'robots_yahboom_g1tank_setLedColor_RGB',
                        'robots_yahboom_g1tank_setLedColor_Palette',
                        'robots_yahboom_g1tank_setLEDServoAngle'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_DETECTION}",
                    "blocks": [
                        'robots_yahboom_g1tank_getUltrasonicRanger',
                        'robots_yahboom_g1tank_getLineFinderState',
                        'robots_yahboom_g1tank_waitKEY'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_MOVING}",
                    "blocks": [
                        'robots_yahboom_g1tank_setGo',
                        'robots_yahboom_g1tank_stop',
                        'robots_yahboom_g1tank_turn',
                        'robots_yahboom_g1tank_spin',
                        'robots_yahboom_g1tank_controlMotors'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_CAMERA}",
                    "blocks": [
                        'robots_yahboom_g1tank_setCameraPanAngle',
                        'robots_yahboom_g1tank_setCameraTiltAngle'
                    ]
                },
                {
                    'label': "%{BKY_MESSAGE_ROBOTS_USB_CAMERA}",
                    'message': true
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