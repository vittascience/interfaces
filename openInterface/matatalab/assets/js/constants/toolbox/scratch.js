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
        "toolboxitemid": "actuators",
        "name": "%{BKY_CATEGORY_ACTIONS}",
        "style": "actuators_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-fan"
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
            "icon": "icon_blockly fas fa-music"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "matatacon",
        "name": "MatataCon",
        "style": "matatacon_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
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
        }
    ],
    "actuators": [
        {
            "blocks": [
                'actuators_move',
                'actuators_move_cm',
                'actuators_turn',
                'actuators_setGear',
                'actuators_setSpeed',
                'actuators_stop',
                'actuators_dance',
                'actuators_action',
                'io_pause',
                'io_waitUntil'
            ]
        }
    ],
    "display": [
        {
            "blocks": [
                'display_setEyesColor',
                'display_setEyes',
                'display_clearEyes',
                'colour_picker',
                'colour_random',
                'colour_rgb'
            ]
        }
    ],
    "sound": [
        {
            "blocks": [
                'sound_playNote',
                'sound_playMelody',
                'sound_playMusic'
            ]
        }
    ],
    "matatacon": [
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS}",
            "blocks": [
                'matatacon_isButton',
                'matatacon_isGesture',
                'matatacon_isColor',
                'matatacon_isSound',
                'matatacon_isObstacle',
                'matatacon_isLight',
                'matatacon_getBrightness',
                'matatacon_getColor',
                'matatacon_getAngle',
                'matatacon_getAcceleration',
                'matatacon_getShaking'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_DISPLAY_LED_RING}",
            "blocks": [
                'matatacon_setRingColor',
                'matatacon_setRing',
                'matatacon_setRingLeds',
                'matatacon_ringAnimation',
                'matatacon_clearRing'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_COMMUNICATION}",
            "blocks": [
                'matatacon_sendMessage',
                'matatacon_isMessage',
                'matatacon_getMessage'
            ]
        }
    ],
    "communication": [
        {
            "blocks": [
                'communication_serialWrite'
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