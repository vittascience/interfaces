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
        "toolboxitemid": "backpack",
        "name": "%{BKY_CATEGORY_BACKPACK}",
        "style": "backpack_category",
        "cssConfig": {
            "icon": "icon_blockly fa-solid fa-suitcase"
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
            "toolboxitemid": "actuators_move_by_squares",
            "name": "%{BKY_SUBCATEGORY_MOVE_BY_SQUARES}",
            "style": "actuators_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-border-all"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "actuators_free_movements",
            "name": "%{BKY_SUBCATEGORY_FREE_MOVEMENTS}",
            "style": "actuators_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-arrows-up-down-left-right"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "actuators_buzzer",
            "name": "%{BKY_SUBCATEGORY_BUZZER}",
            "style": "actuators_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-bell"
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
            "toolboxitemid": "network_web_page",
            "name": "%{BKY_SUBCATEGORY_WEB_PAGE}",
            "style": "network_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-globe"
            },
            "contents": []
        }
    ],
    "backpack": [
        {
            "kind": "category",
            "toolboxitemid": "backpack_display",
            "name": "%{BKY_CATEGORY_DISPLAY}",
            "style": "backpack_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "backpack_io",
            "name": "%{BKY_CATEGORY_IO}",
            "style": "backpack_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-exchange-alt"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "backpack_sensors",
            "name": "%{BKY_CATEGORY_SENSORS}",
            "style": "backpack_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-plug"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "backpack_actuators",
            "name": "%{BKY_CATEGORY_ACTUATORS}",
            "style": "backpack_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-fan"
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
            "label": "%{BKY_SUBCATEGORY_BUILTIN_LED}",
            "blocks": [
                "display_controlBuiltInLED",
                "display_controlBuiltInLEDOff"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_EYES}",
            "blocks": [
                "display_eyes_color",
                "display_eyes_emotion",
                "display_eyes_matrix_unicolor",
                "display_eyes_matrix"
            ]
        }
    ],
    "io": [
        {
            "label": "%{BKY_SUBCATEGORY_TIME}",
            "blocks": [
                "io_pause",
                "io_waitUntil",
                "io_initChronometer",
                "io_getChronometer"
            ]
        }
    ],
    "communication": [
        {
            "label": "%{BKY_SUBCATEGORY_SERIAL_CONNECTION}",
            "blocks": [
                "communication_serialWrite",
                "communication_graphSerialWrite"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_IR_REMOTE}",
            "blocks": [
                "communication_ir_remote_read",
                "communication_ir_remote_boolean",
                "communication_ir_remote"
            ]
        }
    ],
    "sensors": [
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_DISTANCEMOVEMENT}",
            "blocks": [
                "sensors_read_obstacle"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_LINE_SENSORS}",
            "blocks": [
                "sensors_line_follow",
                "sensors_line_set_sensitivity",
                "sensors_line_is_present",
                "sensors_line_sensor_value",
                "sensors_auto_line_calibration"
            ]
        }
    ],
    "actuators": [
        {
            "subCategoryId": "actuators_move_by_squares",
            "contents": [
                {
                    "blocks": [
                        "robot_move_one_step",
                        "robot_turn90",
                        "robot_set_square_size"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "actuators_free_movements",
            "contents": [
                {
                    "blocks": [
                        "robot_move",
                        "robot_rotate",
                        "robot_rotate_degrees",
                        "robot_spin_one_wheel",
                        "robot_stop",
                        "robot_setSpeed",
                        "robot_waiting"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "actuators_buzzer",
            "contents": [
                {
                    "blocks": [
                        "actuators_playmusic",
                        "actuators_playnote",
                        "actuators_frequency",
                        "actuators_play_sound",
                        "actuators_setvolume"
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
                        "network_wifi_connect",
                        "network_wifi_disconnect",
                        "network_wifi_open_access_point",
                        "network_wifi_define_host_name",
                        "network_wifi_define_antenna_power",
                        "network_wifi_is_connected",
                        "network_wifi_scan_networks",
                        "network_wifi_get_ip"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "network_web_page",
            "contents": [
                {
                    "blocks": [
                        "network_html_create_page",
                        "network_html_create_button",
                        "network_html_create_tag",
                        "network_html_create_title_tag",
                        "network_html_display_value",
                        "network_html_create_paragraph"
                    ]
                }
            ]
        }
    ],
    "backpack": [
        {
            "subCategoryId": "backpack_display",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_DISPLAYS_OLED}",
                    "blocks": [
                        "backpack_display_oled_text",
                        "backpack_display_oled_clear"
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_DISPLAYS_RGB_LED_MATRIX}",
                    "blocks": [
                        "backpack_display_matrix_color_picker",
                        "backpack_display_clear_matrix",
                        "backpack_display_matrix_logo_picker",
                        "backpack_display_matrix_scroll_text"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "backpack_io",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_BUTTONS}",
                    "blocks": [
                        "backpack_io_button_state",
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_POTENTIOMETER}",
                    "blocks": [
                        "backpack_io_knob_value",
                    ]
                }
            ]
        },
        {
            "subCategoryId": "backpack_sensors",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_SENSORS_CLIMATE}",
                    "blocks": [
                        "backpack_sensor_dht11",
                        "backpack_sensor_bme280",
                        "backpack_sensor_bme280_set_sea_level_pressure",
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_SENSORS_SOUNDLIGHT}",
                    "blocks": [
                        "backpack_sensor_getLight"
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_SENSORS_DISTANCEMOVEMENT}",
                    "blocks": [
                        "backpack_sensor_hcsr04_getDistance"
                    ]
                }
            ]
        },
        {
            "subCategoryId": "backpack_actuators",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_MOTORS}",
                    "blocks": [
                        "backpack_actuators_servo_motor_angle",
                        "backpack_actuators_servo_motor_speed"
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_BUZZER}",
                    "blocks": [
                        "backpack_actuators_grove_buzzer"
                    ]
                }
            ]
        }
    ],
    "logic": [{
        "blocks": [
            "controls_if",
            "controls_if-else",
            "logic_compare-eq",
            "logic_operation-and",
            "logic_negate",
            "logic_boolean",
            "logic_null",
            "logic_ternary"
        ]
    }
    ],
    "loops": [{
        "blocks": [
            "forever",
            "controls_repeat",
            "controls_whileUntil",
            "controls_for",
            "controls_forEach",
            "controls_flow_statements"
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
            "exception_raise",
            "exception_exception",
            "exception_type",
            "exception_try"
        ]
    }],
};

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;