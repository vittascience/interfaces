const TOOLBOX_VITTASCIENCE_CATEGORIES = [
    {
        "kind": "category",
        "toolboxitemid": "network",
        "name": "%{BKY_CATEGORY_NETWORK}",
        "style": "network_category",
        "cssConfig": {
            "icon": "icon_blockly fa-brands fa-bluetooth"
        },
        "contents": []
    },
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
        "toolboxitemid": "sound",
        "name": "%{BKY_CATEGORY_SOUND}",
        "style": "sound_category",
        "cssConfig": {
            "icon": "icon_blockly fa-solid fa-music"
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
        "toolboxitemid": "time",
        "name": "%{BKY_CATEGORY_TIME}",
        "style": "time_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-clock"
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
    "network": [
        {
            "blocks": [
                'network_connectWinky'
            ]
        }
    ],
    "display": [
        {
            "blocks": [
                'display_preset',
                'display_pattern',
                'display_presetEachEye',
                'display_number',
                'display_text',
                'display_clearEyes'
            ]
        }
    ],
    "sound": [
        {
            "blocks": [
                'sounds_setVolume',
                'sounds_playSound'
            ]
        }
    ],
    "communication": [
        {
            "blocks": [
                "communication_serialWrite",
                "communication_graphSerialWrite",
                "communication_graphSerialWrite_datasFormat"
            ]
        }
    ],
    "time": [
        {
            "blocks": [
                'io_pause',
                'io_waitUntil',
                'io_initChronometer',
                'io_getChronometer'
            ]
        }
    ],
    "sensors": [
        {
            "blocks": [
                'sensors_getGyroDirection',
                'sensors_getGyroAngle',
                'sensors_getProximityDetection',
                'sensors_getGestureDetection',
                'sensors_getTouchBtn'
            ]
        }
    ],
    "actuators": [
        {
            "blocks": [
                'actuators_setNeckPosition',
                'actuators_setNeckRotate',
                'actuators_setEarsPosition',
                'actuators_setEarsRear',
                'actuators_setEarsDown',
                'actuators_setEarsStanding'
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
    }],
};

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;