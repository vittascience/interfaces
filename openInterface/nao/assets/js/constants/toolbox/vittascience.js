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
            "icon": "icon_blockly far fa-clock"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "movement",
        "name": "%{BKY_CATEGORY_MOVEMENT}",
        "style": "movement_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-arrows-alt"
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
        "toolboxitemid": "game",
        "name": "%{BKY_CATEGORY_GAME}",
        "style": "game_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-gamepad"
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
        "style": "list_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-list"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "dictionaries",
        "name": "%{BKY_CATEGORY_DICTIONARIES}",
        "style": "dictionaries_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
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


const TOOLBOX_VITTASCIENCE_CONTENT = {
    "display": [
        {
            "blocks": [
                'display_fade',
                'display_fadeRGB',
                'display_fadeRGB_palette',
                'display_fadeRGB_colorName',
                'display_fadeFaceRGB',
                'display_fadeFaceRGB_palette',
                'display_randomEyes',
                'display_rotateEyes',
                'display_rasta',
                'display_setIntensity',
                'display_off',
                'display_on',
                'display_reset'
            ]
        }
    ],
    "communication": [
        {   
            "label": "%{BKY_SUBCATEGORY_ANIMATED_SPEECH}",
            "blocks": [
                'communication_textToSpeech_say',
                // 'communication_animatedSpeech_say'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_ASR}",
            "blocks": [
                'communication_asr_setLanguage',
                'communication_asr_setVocabulary',
                'communication_asr_startRecognition',
                'communication_asr_getLastWord_callback_decorated',
                'communication_asr_stopRecognition',
            ]
        }
    ],
    "time": [
        {
            "blocks": [
                'time_pause',
                'time_waitUntil',
            ]
        }
    ],
                
    "movement": [
        {
            "blocks": [
                'movements_poseMode',
                'movements_moveTo',
                'movements_rotate',
                // 'movements_moveToXY',
                'movements_hand',
                'movements_goToPosture',
                // 'movements_angleInterpolationWithSpeed_1',
                // 'movements_angleInterpolationWithSpeed_2',
                // 'movements_angleInterpolationWithSpeed_3',
                // 'movements_angleInterpolationWithSpeed_4',
                // 'movements_angleInterpolationWithSpeed_5'
                'movements_setAnglesArmes_radians',
                'movements_setAnglesArmes_degres',
            ]
        }
    ],
    "sensors": [
        {
            "blocks": [
                'sensors_tactilTouched',
                'sensors_handTouched',
                'sensors_bumperPressed',
                'sensors_sonarDetection',
                'sensors_getBatteryCharge'
            ]
        }
    ],
    "game": [
        {
            "label": "%{BKY_SUBCATEGORY_MENTAL_CALCULATION}",
            "blocks": [
                'game_mental_math_init',
                'game_mental_math_play',
                'game_mental_math_get_number'
            ],
        },
        {
            "label": "%{BKY_SUBCATEGORY_STORY_TELLING}",
            "blocks": [
                'game_dynamic_story_init',
                'game_play_current_scene'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_CAPITAL_CITY}",
            "blocks": [
                'game_capital_init',
                'game_capital_get_random_country',
                'game_capital_play',
                'game_capital_get_element_from_country'
            ],
        },
        
    ],
    "network": [],
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
    "math": [{
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
            'math_random_int',
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
            'lists_shuffle',
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
    "dictionaries": [
        {
            "blocks": [
                'dictionaries_create_empty',
                'dictionaries_create_with',
                'dictionaries_length',
                'dictionaries_get_item',
                'dictionaries_update_item',
                'dictionaries_include',
                'dictionaries_delete_tuple',
                'dictionaries_clear',
                'dictionaries_add_tuple',
                'dictionaries_loop'
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

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;