// texas instruents js
const TOOLBOX_TI_CATEGORIES = [
    {
        "kind": "category",
        "toolboxitemid": "procedures",
        "name": "Fonc",
        "custom": "PROCEDURE",
        "style": "procedure_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
        }
    },
    {
        "kind": "category",
        "toolboxitemid": "control",
        "name": "Ctl",
        "style": "control_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-code-branch"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "ops",
        "name": "Ops",
        "style": "math_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-calculator"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "list",
        "name": "List",
        "style": "list_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-list"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "io",
        "name": "E/S",
        "style": "io_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-exchange-alt"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "variables",
        "name": "Var",
        "custom": "VARIABLE",
        "style": "variable_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-cog"
        }
    },
    {
        "kind": "category",
        "toolboxitemid": "text",
        "name": "Text",
        "style": "text_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-font"
        },
        "contents": []
    },
    {
        "kind": "sep",
        "toolboxitemid": "sep1",
    },
    {
        "kind": "category",
        "toolboxitemid": "math",
        "name": "math",
        "style": "math_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-calculator"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "random",
        "name": "random",
        "style": "random_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-random"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "time",
        "name": "time",
        "style": "time_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-redo-alt"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "advanced",
        "name": "%{BKY_CATEGORY_ADVANCED}",
        "style": "advanced_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-cogs"
        },
        "contents": []
    },
];

const TOOLBOX_TI_SUBCATEGORIES = {
    "advanced": [
        {
            "kind": "category",
            "toolboxitemid": "ti_system",
            "name": "ti_system",
            "style": "ti_system_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-atom"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "ti_plotlib",
            "name": "ti_plotlib",
            "style": "ti_plotlib_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-chart-line"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "ti_draw",
            "name": "ti_draw",
            "style": "ti_draw_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-pen-ruler"

            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "ti_hub",
            "name": "ti_hub",
            "style": "ti_hub_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-plug"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "ti_rover",
            "name": "ti_rover",
            "style": "ti_rover_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "ti_rover",
            "name": "ti_rover",
            "style": "ti_rover_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "mb",
            "name": "micro:bit",
            "style": "mb_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-th"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "ce",
            "name": "ce",
            "style": "ce_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-chart-bar"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "turtle",
            "name": "turtle",
            "style": "turtle_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-pencil-alt"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "tello",
            "name": "tello",
            "style": "tello_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        }
    ]
}

const TOOLBOX_TI_CONTENT = {
    "procedures": "customized",
    "control": [
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
        }, {
            "label": "%{BKY_SUBCATEGORY_LOGIC}",
            "blocks": [
                'controls_if',
                'controls_if-else',
                'logic_ternary'
            ]
        }
    ],
    "ops": [
        {
            "blocks": [
                'logic_compare-gte',
                'logic_compare-lte',
                'logic_compare-eq',
                'logic_operation-and',
                'logic_operation-or',
                'logic_negate',
                'logic_boolean',
                'logic_null',
            ]
        }
    ],
    "list": [
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
    "io": [
        {
            "label": "%{BKY_SUBCATEGORY_CONSOLE}",
            "blocks": [
                'ti_io_print',
                'ti_io_input_text',
                'ti_io_input_number'
            ]
        }
    ],
    "variables": "customized",
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
                'math_atan2'
            ]
        }
    ],
    "random": [
        {
            "blocks": [
                'random_random',
                'random_randint',
                'random_uniform',
                'random_randrange',
                'random_choice',
                'random_seed'
            ]
        }
    ],
    "time": [
        {
            "blocks": [
                'io_wait',
                'io_waitUntil',
                'io_initChronometer',
                'io_getChronometer'
            ]
        }
    ],
    "advanced": [
        {
            "subCategoryId": "ti_system",
            "contents": [{
                "label": "ti_system",
                "blocks": [
                    'ti_system_recall_list',
                    'ti_system_store_list',
                    'ti_system_recall_RegEQ',
                    'ti_system_while_condition',
                    'ti_system_if_condition',
                    'ti_io_escape',
                    'ti_system_disp_at',
                    'ti_system_disp_clr',
                    'ti_system_disp_wait',
                    'ti_system_disp_cursor',
                    'ti_system_sleep',
                    'ti_system_wait_key',
                    'ti_system_wait_key_value'
                ]
            }]
        },
        {
            "subCategoryId": "ti_plotlib",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_CONFIGURATION}",
                    "blocks": [
                        'ti_plotlib_cls',
                        'ti_plotlib_window',
                        'ti_plotlib_auto_window',
                        'ti_plotlib_grid',
                        'ti_plotlib_axes',
                        'ti_plotlib_labels',
                        'ti_plotlib_title',
                        'ti_plotlib_show_plot'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_DRAW}",
                    "blocks": [
                        'ti_plotlib_define_color',
                        'ti_plotlib_define_palette_color',
                        'ti_plotlib_scatter',
                        'ti_plotlib_lin_reg',
                        'ti_plotlib_plot',
                        'ti_plotlib_line',
                        'ti_plotlib_pen',
                        'ti_plotlib_text_at'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "ti_draw",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_CONFIGURATION}",
                    "blocks": [
                        // 'ti_draw_set_window',
                        // 'ti_draw_get_window',
                        'ti_draw_set_color',
                        'ti_draw_set_pen',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_DRAW}",
                    "blocks": [
                        'ti_draw_show',
                        'ti_draw_draw_line',
                        'ti_draw_draw_circle',
                        'ti_draw_fill_circle',
                        'ti_draw_draw_rect',
                        'ti_draw_fill_rect',
                        'ti_draw_draw_text',
                        'ti_draw_draw_poly',
                        'ti_draw_fill_poly',
                        'ti_draw_plot_xy',
                    ]
                }
            ]
        }, 
        {
            "subCategoryId": "ti_hub",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_BUILTIN_DEVICES}",
                    "blocks": [
                        "devices_builtin_setLEDRGB",
                        "devices_builtin_setLEDRGBPalette",
                        "devices_builtin_blinkLEDRGB",
                        "devices_builtin_setRedLed",
                        "devices_builtin_playMusicBuzzer",
                        "devices_builtin_speaker_playNotes",
                        "devices_builtin_speaker_note",
                        "devices_builtin_speaker_playFrequency",
                        "devices_builtin_getLight"
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_GROVE_INPUTS}",
                    "blocks": [
                        "devices_grove_dhtReadData",
                        "devices_grove_getUltrasonicRange",
                        "devices_grove_getLight",
                        "devices_grove_getTemperature",
                        "devices_grove_getMoisture",
                        "devices_grove_getPotentiometer",
                        "devices_grove_getLoudness"
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_GROVE_OUTPUTS}",
                    "blocks": [
                        "devices_grove_setSocketLed",
                        "devices_grove_setLEDintensity",
                        "devices_grove_setServoAngle",
                        "devices_grove_setRelayState",
                        "devices_grove_setVibrationMotorState",
                        "devices_grove_setVibrationMotorValue",
                        "devices_grove_setPowerState",
                        "devices_grove_setPowerValue"
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_PINS}",
                    "blocks": [
                        'io_hub_digital_signal',
                        'io_hub_readDigitalPin',
                        'io_hub_writeDigitalPin',
                        'io_hub_readAnalogPin',
                        'io_hub_writeAnalogPin',
                        'io_hub_setPwm',
                    ]
                }
            ]
        },
        {
            "subCategoryId": "ti_rover",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_ROVER_DRIVE}",
                    "blocks": [
                        'robots_rover_setGo',
                        'robots_rover_setGoTime',
                        'robots_rover_turnTo',
                        'robots_rover_moveToXY',
                        'robots_rover_moveToPolar',
                        'robots_rover_stop',
                        'robots_rover_resume',
                        'robots_rover_stay'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_ROVER_INPUTS}",
                    "blocks": [
                        'robots_rover_getUltrasonicRange',
                        'robots_rover_getColorLevel',
                        'robots_rover_getColor',
                        'robots_rover_getRobotAngle',
                        'robots_rover_getAngularSpeed'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_ROVER_OUTPUTS}",
                    "blocks": [
                        "robots_rover_setLEDRGB",
                        "robots_rover_setLEDRGBPalette",
                        "robots_rover_blinkLEDRGB",
                        "robots_rover_stopLEDRGB",
                        'robots_rover_controlMotor',
                    ]
                }
            ]
        },
        {
            "subCategoryId": "mb",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_MICROBIT_COMMANDS}",
                    "blocks": [
                        'microbit_sleep',
                        'microbit_while_condition',
                        'microbit_escape',
                        'microbit_disp_clr',
                        'microbit_store_list',
                        'sensors_getTemperature'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_MICROBIT_SCREEN}",
                    "blocks": [
                        'show_number',
                        'show_leds',
                        'show_string',
                        'show_icon',
                        'display_show_gauge',
                        'show_clock',
                        'show_arrow',
                        'clear',
                        "sensors_getLight",
                        'set_pixel',
                        'set_light_pixel'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_MICROBIT_MUSIC}",
                    "blocks": [
                        'actuators_music_playMusic',
                        'actuators_music_playSong',
                        'actuators_music_playNotes',
                        'actuators_music_note',
                        'actuators_music_playFrequency',
                        'actuators_music_setTempo',
                        'actuators_music_setVolume'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_MICROBIT_AUDIO}",
                    "blocks": [
                        'microbit_audio_play',
                        'microbit_audio_stop'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_MICROBIT_MICROPHONE}",
                    "blocks": [
                        "io_micro_onSoundDetected",
                        "io_micro_getCurrentSound",
                        "io_micro_soundDetected",
                        "io_micro_getSoundLevel",
                        "io_micro_setSoundThreshold",
                        "io_micro_soundCondition"
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_MICROBIT_BUTTONS}",
                    "blocks": [
                        'io_onButtonPressed',
                        'io_isButtonPressed',
                        'io_buttons_getPresses',
                        'io_isLogoTouched'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_MICROBIT_SENSORS}",
                    "blocks": [
                        "microbit_accelerometer_getByAxis",
                        'microbit_accelerometer_getValues',
                        'microbit_accelerometer_getMagnitude',
                        "microbit_accelerometer_getRotation",
                        "microbit_compass_heading",
                        "microbit_compass_getMagneticStrengthByAxis",
                        "microbit_compass_isCalibrated",
                        "microbit_compass_getFieldStrength",
                        "microbit_compass_calibrate",
                        "microbit_accelerometer_getCurrentGesture",
                        "microbit_accelerometer_onGestureType",
                        "microbit_accelerometer_isGesture"
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_MICROBIT_RADIO}",
                    "blocks": [
                        'communication_radioConfig',
                        'communication_radioSendString',
                        'communication_radioSendNumber',
                        'communication_radioSendValue',
                        'communication_onRadioDataReceived',
                        'communication_onRadioNumberReceived',
                        'communication_onRadioValueReceived'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_MICROBIT_NEOPIXEL}",
                    "blocks": [
                        "display_defineNeopixel",
                        "display_controlNeopixelLed",
                        "display_controlColorNeopixelLed",
                        "display_neopixel_controlAllLedRGB",
                        "display_neopixel_controlAllLedPalette",
                        'microbit_neopixel_switchOff',
                        'microbit_neopixel_color',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_MICROBIT_PINS}",
                    "blocks": [
                        "io_digital_signal",
                        'io_readDigitalPin',
                        'io_writeDigitalPin',
                        'io_readAnalogPin',
                        'io_writeAnalogPin',
                        'io_setPwm'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_GROVE_INPUTS}",
                    "blocks": [
                        'sensors_SHT31readData',
                        'sensors_getGroveTemperature',
                        'sensors_getGroveLight',
                        'sensors_getGroveMoisture',
                        'sensors_mpx5700ap_getPressure',
                        'sensors_mpx5700ap_calibrate',
                        'sensors_getGroveUltrasonicRanger',
                        'microbit_grove_read_bme280'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_GROVE_OUTPUTS}",
                    "blocks": [
                        'display_setGroveSocketLed',
                        'actuators_setMotorPower',
                        'actuators_setGroveRelayState',
                        'actuators_setServoAngle'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "ce",
            "contents": [
                {
                    "label": "ce_box",
                    "blocks": [
                        'ce_box_defineBox',
                        'ce_box_title',
                        'ce_box_show'
                    ]
                },
                {
                    "label": "ce_chart",
                    "blocks": [
                        'ce_chart_dataChart',
                        'ce_chart_defineChart',
                        'ce_chart_title',
                        'ce_chart_frequencies',
                        'ce_chart_show'
                    ]
                },
                {
                    "label": "ce_quivr",
                    "blocks": [
                        'ce_quivr_drawLinePortion',
                        'ce_quivr_drawVector'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "turtle",
            "contents": [
                {
                    "label": "Move",
                    "blocks": [
                        'turtle_move',
                        'turtle_turn',
                        'turtle_goto',
                        'turtle_done'
                    ]
                },
                {
                    "label": "Draw",
                    "blocks": [
                        'turtle_fillcolor',
                        'turtle_fillcolorPalette',
                        'turtle_setFill',
                        'turtle_dot',
                        'turtle_write'
                    ]
                },
                {
                    "label": "Pen",
                    "blocks": [
                        'turtle_controlPen',
                        'turtle_pencolor',
                        'turtle_pencolorPalette',
                        'turtle_pensize'
                    ]
                },
                {
                    "label": "Settings",
                    "blocks": [
                        'turtle_clear',
                        'turtle_controlTurtle',
                        'turtle_hidegrid',
                        'turtle_speed'
                    ]
                },
                {
                    "label": "State",
                    "blocks": [
                        'turtle_home',
                        'turtle_setheading',
                        'turtle_getCoordinates',
                        'turtle_heading'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "tello",
            "contents": [
                {
                    "blocks": [
                        'tello_takeoff',
                        'tello_land',
                        'tello_fly',
                        'tello_turn',
                        'tello_flyInHeight',
                        'tello_flyDirection',
                        'tello_getAltitude'
                    ]
                },
            ]
        }
    ],
};

const TOOLBOX_TI_CONTENT_SIMPLE = TOOLBOX_TI_CONTENT;