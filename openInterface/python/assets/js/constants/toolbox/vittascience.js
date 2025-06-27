const TOOLBOX_VITTASCIENCE_CATEGORIES = [
    {
        "kind": "category",
        "toolboxitemid": "display",
        "name": "%{BKY_CATEGORY_DISPLAY}",
        "style": "display_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-desktop"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "turtle",
        "name": "%{BKY_CATEGORY_TURTLE}",
        "style": "turtle_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-pencil-alt"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "graph",
        "name": "%{BKY_CATEGORY_GRAPHICS}",
        "style": "graph_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-chart-line"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "numpy",
        "name": "%{BKY_CATEGORY_NUMPY}",
        "style": "numpy_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-table"
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
            "label": "%{BKY_SUBCATEGORY_CONSOLE}",
            "blocks": [
                'display_print',
                'display_input',
                'display_input_number'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_TIME}",
            "blocks": [
                'time_sleep',
                'time_time',
                'time_waitUntil',
                'time_initChronometer',
                'time_getChronometer',
                'time_getDate'
            ]
        }
    ],
    "turtle": [
        {
            "blocks": [
                'turtle_direction',
                'turtle_turn',
                'turtle_goto',
                'turtle_circle',
                'turtle_arc',
                'turtle_write',
                'turtle_shape',
                'turtle_colour',
                'turtle_fill',
                'turtle_pen',
                'turtle_visibility',
                'turtle_stamp',
                'turtle_speed',
                'turtle_reset',
                'turtle_screen_setup',
                'turtle_screen_color'
            ]
        }
    ],
    "graph": [
        {
            "label": "%{BKY_SUBCATEGORY_MATPLOTLIB}",
            "blocks": [
                'graph_matplotlib_setLabel',
                'graph_matplotlib_grid',
                'graph_matplotlib_text',
                'graph_matplotlib_plot',
                'graph_matplotlib_scatter',
                'graph_matplotlib_bar'
            ]
        }
    ],
    "numpy": [
        {
            "label": "%{BKY_SUBCATEGORY_ARRAYS_MATRIX}",
            "blocks": [
                'numpy_linspace',
                'numpy_arange',
                'numpy_table_with_shape',
                'numpy_create_table_with',
                'numpy_square_matrix'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_OPERATIONS}",
            "blocks": [
                'numpy_getSizeShape',
                'numpy_getElement_matrix',
                'numpy_getElement_list',
                'numpy_single',
                'numpy_trig'
            ]
        }
    ],
    "vittaia": [
        {
            "label": "%{BKY_SUBCATEGORY_VITTAIA_IMAGE}",
            "blocks": [
                'vittaia_load_model',
                'vittaia_load_local_model',
                'vittaia_load_model_default',
                'vittaia_make_predictions_webcam',
                'vittaia_make_predictions_file',
                'vittaia_get_highest_probability_class',
                'vittaia_get_confidence_rate',
                'vittaia_get_predictions',
                'vittaia_detect_class',
                'vittaia_list_webcams',
                'vittaia_init_webcam'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_VITTAIA_POSTURE}",
            "blocks": [
                'vittaia_load_posture_model',
                'vittaia_init_posture_webcam',
                'vittaia_make_posture_predictions',
                'vittaia_list_posture_webcams'
                
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_VITTAIA_SOUND}",
            "blocks": [
                'vittaia_load_sound_model',
                'vittaia_init_microphone',
                'vittaia_make_sound_predictions',
                'vittaia_list_microphones'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_VITTAIA_TEXT}",
            "blocks": [
                'vittaia_load_discussion',
                'vittaia_set_randomness',
                'vittaia_set_model_ia',
                'vittaia_model_text_predict', 
            ]
        }
    ],
    "logic": [
        {
            "blocks": [
                'controls_if',
                'controls_if-else',
                'logic_compare-eq',
                'logic_compare_2',
                'logic_operation-and',
                'logic_negate',
                'logic_boolean',
                'logic_null',
                'logic_ternary',
                'logic_assert'
            ]
        }
    ],
    "loops": [
        {
            "blocks": [
                'controls_repeat',
                'controls_whileUntil',
                'controls_for',
                'controls_forEach',
                'controls_flow_statements',
                'controls_pass_statements'
            ]
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
                'math_random_int',
                'math_random_float',
                'math_atan2',
                'math_min_max'
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
    "lists": [
        {
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
    "exception": [
        {
            "blocks": [
                'exception_raise',
                'exception_exception',
                'exception_type',
                'exception_try'
            ]
        }
    ]
};

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;