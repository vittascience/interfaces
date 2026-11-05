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
        "style": "lists_category",
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

const TOOLBOX_VITTASCIENCE_SUBCATEGORIES = {
    "display": [
        {
            "kind": "category",
            "toolboxitemid": "display_console",
            "name": "%{BKY_SUBCATEGORY_CONSOLE}",
            "style": "display_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-terminal"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "display_time",
            "name": "%{BKY_SUBCATEGORY_TIME}",
            "style": "display_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-clock"
            },
            "contents": []
        }
    ],
    "vittaia": [
        {
            "kind": "category",
            "toolboxitemid": "vittaia_vittaia_image",
            "name": "%{BKY_SUBCATEGORY_VITTAIA_IMAGE}",
            "style": "vittaia_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-image"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "vittaia_vittaia_posture",
            "name": "%{BKY_SUBCATEGORY_VITTAIA_POSTURE}",
            "style": "vittaia_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-person"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "vittaia_vittaia_sound",
            "name": "%{BKY_SUBCATEGORY_VITTAIA_SOUND}",
            "style": "vittaia_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-microphone"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "vittaia_vittaia_text",
            "name": "%{BKY_SUBCATEGORY_VITTAIA_TEXT}",
            "style": "vittaia_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-font"
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
    ],
    "dictionaries": [
        {
            "kind": "category",
            "toolboxitemid": "dictionaries_create",
            "name": "%{BKY_TOOLBOX_LABEL_CREATE}",
            "style": "dictionaries_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-plus"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "dictionaries_read",
            "name": "%{BKY_TOOLBOX_LABEL_READ}",
            "style": "dictionaries_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-eye"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "dictionaries_modify",
            "name": "%{BKY_TOOLBOX_LABEL_MODIFY}",
            "style": "dictionaries_category",
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
            "subCategoryId": "display_console",
            "contents": [
                {
                    "blocks": [
                        'display_print',
                        'display_input',
                        'display_input_number'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "display_time",
            "contents": [
                {
                    "blocks": [
                        'time_sleep',
                        'time_time',
                        'time_waitUntil',
                        'time_initChronometer',
                        'time_getChronometer',
                        'time_getDate'
                    ]
                }
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
                'turtle_screen_color',
                'turtle_screen_picture'
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
            "subCategoryId": "vittaia_vittaia_image",
            "contents": [
                {
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
                }
            ]
        },
        {
            "subCategoryId": "vittaia_vittaia_posture",
            "contents": [
                {
                    "blocks": [
                        'vittaia_load_posture_model',
                        'vittaia_init_posture_webcam',
                        'vittaia_make_posture_predictions',
                        'vittaia_list_posture_webcams'
                        
                    ]
                }
            ]
        },
        {
            "subCategoryId": "vittaia_vittaia_sound",
            "contents": [
                {
                    "blocks": [
                        'vittaia_load_sound_model',
                        'vittaia_init_microphone',
                        'vittaia_make_sound_predictions',
                        'vittaia_list_microphones'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "vittaia_vittaia_text",
            "contents": [
                {
                    "blocks": [
                        'vittaia_load_discussion',
                        'vittaia_set_randomness',
                        'vittaia_set_model_ia',
                        'vittaia_model_text_predict', 
                    ]
                }
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
                    'math_atan2',
                    'math_min_max'
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
    "dictionaries": [
        {
            "subCategoryId": "dictionaries_create",
            "contents": [{
                "blocks": [
                    'dictionaries_create_empty',
                    'dictionaries_create_with'
                ]
            }]
        },
        {
            "subCategoryId": "dictionaries_read",
            "contents": [{
                "blocks": [
                    'dictionaries_length',
                    'dictionaries_get_item',
                    'dictionaries_include',
                    'dictionaries_loop'
                ]
            }]
        },
        {
            "subCategoryId": "dictionaries_modify",
            "contents": [{
                "blocks": [
                    'dictionaries_update_item',
                    'dictionaries_delete_tuple',
                    'dictionaries_clear',
                    'dictionaries_add_tuple'
                ]
            }]
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