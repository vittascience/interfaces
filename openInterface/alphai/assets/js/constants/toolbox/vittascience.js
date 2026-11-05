const TOOLBOX_VITTASCIENCE_CATEGORIES = [
    {
        'kind': 'category',
        'toolboxitemid': 'robot',
        'name': '%{BKY_CATEGORY_ROBOT}',
        'style': 'robot_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-robot'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'time',
        'name': '%{BKY_CATEGORY_TIME}',
        'style': 'time_category',
        'cssConfig': {
            'icon': 'icon_blockly far fa-clock'
        },
        'contents': []
    },
    {
        'kind': 'sep',
        'id': 'sep1',
    },
    {
        'kind': 'category',
        'toolboxitemid': 'logic',
        'name': '%{BKY_CATEGORY_LOGIC}',
        'style': 'logic_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-code-branch'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'loops',
        'name': '%{BKY_CATEGORY_LOOPS}',
        'style': 'loops_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-redo-alt'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'math',
        'name': '%{BKY_CATEGORY_MATH}',
        'style': 'math_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-calculator'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'text',
        'name': '%{BKY_CATEGORY_TEXT}',
        'style': 'text_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-font'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'variables',
        'name': '%{BKY_CATEGORY_VARIABLES}',
        'custom': 'VARIABLE',
        'style': 'variable_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-cog'
        }
    },
    {
        'kind': 'category',
        'toolboxitemid': 'lists',
        'name': '%{BKY_CATEGORY_LISTS}',
        'style': 'lists_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-list'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'procedures',
        'name': '%{BKY_CATEGORY_PROCEDURES}',
        'custom': 'PROCEDURE',
        'style': 'procedure_category',
        'cssConfig': {
            'icon': 'icon_blockly svgIcon'
        }
    },
    {
        'kind': 'category',
        'toolboxitemid': 'exception',
        'name': '%{BKY_CATEGORY_EXCEPTION}',
        'style': 'exception_category',
        'cssConfig': {
            'icon': 'icon_blockly fa fa-circle-exclamation'
        },
        'contents': []
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
    'robot': [
        {
            'label': '%{BKY_SUBCATEGORY_COMMUNICATION}',
            'blocks': [
                'robot_printMessage'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_ACTUATORS}',
            'blocks': [
                'robot_setDirection',
                'robot_setMotor',
                'robot_stop',
                'robot_setBuzzer'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_SENSORS}',
            'blocks': [
                'robot_isBlocked',
                'robot_getDistance',
                'robot_getInfraRed'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_CAMERA}',
            'blocks': [
                'robot_setCamera',
                'robot_getCamera'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_DISPLAY}',
            'blocks': [
                'robot_setLedsRGB',
                'robot_setLedsPalette'
            ]
        }
    ],
    'time': [
        {
            'blocks': [
                'io_pause',
                'io_initChronometer',
                'io_getChronometer',
                'io_waitUntil'
            ]
        }
    ],
    'logic': [{
        'blocks': [
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
    'loops': [{
        'blocks': [
            'forever',
            'controls_repeat',
            'controls_whileUntil',
            'controls_for',
            'controls_forEach',
            'controls_flow_statements'
        ]
    }
    ],
    'math': [
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
    'text': [
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
                    'text_indexOf',
                    'text_charAt',
                    'text_count',
                    'text_count_characters'
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
        }
    ],
    'variables': 'customized',
    'lists': [
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
    'procedures': 'customized',
    'exception': [{
        'blocks': [
            'exception_raise',
            'exception_exception',
            'exception_type',
            'exception_try'
        ]
    }]
};

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;