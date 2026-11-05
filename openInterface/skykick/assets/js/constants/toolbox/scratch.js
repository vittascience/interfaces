const TOOLBOX_SCRATCH_CATEGORIES = [
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
        "toolboxitemid": "drone",
        "name": "%{BKY_CATEGORY_DRONE}",
        "style": "drone_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-plane"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "display",
        "name": "%{BKY_SUBCATEGORY_LED}",
        "style": "display_category",
        "cssConfig": {
            "icon": "icon_blockly far fa-lightbulb"
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

const TOOLBOX_SCRATCH_CONTENT = {
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
        },
        {
            "label": "%{BKY_SUBCATEGORY_LOGIC}",
            "blocks": [
                'controls_if',
                'controls_if-else',
                'logic_ternary'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_TIME}",
            "blocks": [
                'io_pause',
                'io_initChronometer',
                'io_getChronometer',
                'io_waitUntil'
            ]
        }
    ],
    "drone": [
        {
            "label": "%{BKY_SKYKICK_LABEL_FLIGHT}",
            "blocks": [
                'skykick_takeoff',
                'skykick_land',
                'skykick_stop'
            ]
        },
        {
            "label": "%{BKY_SKYKICK_LABEL_MOVES}",
            "blocks": [
                'skykick_go',
                'skykick_turn',
                'skykick_go_xyz',
                'skykick_go_xyz_turn'
            ]
        },
        {
            "label": "%{BKY_SKYKICK_LABEL_CONTROL}",
            "blocks": [
                'skykick_set_axis',
                'skykick_move_axis',
                'skykick_set_quad',
                'skykick_move_quad'
            ]
        },
        {
            "label": "%{BKY_SKYKICK_LABEL_SETTINGS}",
            "blocks": [
                'skykick_set_headless',
                'skykick_set_trim',
                'skykick_trim_step',
                'skykick_clear_trim',
                'skykick_clear_bias'
            ]
        }
    ],
    "display": [
        {
            "blocks": [
                'skykick_led_off',
                'skykick_led_rgb',
                'skykick_led_color',
                'skykick_led_preset'
            ]
        }
    ],
    "sound": [
        {
            "blocks": [
                'skykick_buzzer_stop',
                'skykick_play_note',
                'skykick_play_hz'
            ]
        }
    ],
    "sensors": [
        {
            "blocks": [
                'skykick_attitude',
                'skykick_sensor',
                'skykick_height',
                'skykick_position',
                'skykick_state'
            ]
        }
    ],
    "communication": [
        {
            "blocks": [
                'communication_serialWrite',
                'communication_graphSerialWrite'
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
                'text_includesSubstr',
                'text_indexOf',
                'text_charAt',
                'text_getSubstring',
                'text_count_characters',
                'text_changeCase',
                'text_trim',
                'text_count',
                'text_replace',
                'text_reverse',
                'text_random_string'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_ENCRYPTION}",
            "blocks": [
                'text_caesar_cipher',
                'text_caesar_cipher_brute_force'
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