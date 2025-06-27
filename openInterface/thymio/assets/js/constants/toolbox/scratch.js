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
    // {
    //     "kind": "category",
    //     "toolboxitemid": "communication",
    //     "name": "%{BKY_CATEGORY_COMMUNICATION}",
    //     "style": "communication_category",
    //     "cssConfig": {
    //         "icon": "icon_blockly far fa-comment-dots"
    //     },
    //     "contents": []
    // },
    {
        "kind": "category",
        "toolboxitemid": "display",
        "name": "%{BKY_CATEGORY_APPEARANCE}",
        "style": "display_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
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
        "style": "list_category",
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
    // {
    //     "kind": "category",
    //     "toolboxitemid": "exception",
    //     "name": "%{BKY_CATEGORY_EXCEPTION}",
    //     "style": "exception_category",
    //     "cssConfig": {
    //         "icon": "icon_blockly fa fa-circle-exclamation"
    //     },
    //     "contents": []
    // }
];

const TOOLBOX_SCRATCH_CONTENT = {
    "display": [
        {
            "label": "%{BKY_SUBCATEGORY_THYMIO}",
            'blocks': [
                'display_turnAllLedsOff',
                'display_RGBLed_turnOff',
                'display_RGBLed_setColor',
                'display_RGBLed_setColorPalette',
                'display_circleLed_turnOn',
                'display_proximityLed_turnOn',
                'display_groundSensorLed_turnOn',
                'display_ledButtons_turnOn',
                'display_temperatureLed_turnOn',
                'display_rc_sound_SensorLed_turnOn',
            ]
        }
    ],
    "control": [
        {
            "label": "%{BKY_SUBCATEGORY_TIME}",
            "blocks": [
                'display_timer_flash_led',
            ]
        },
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
    // "communication": [
    //     {
    //         "label": "%{BKY_SUBCATEGORY_SERIAL_CONNECTION}",
    //         "blocks": [
    //             'communication_serialWrite',
    //             // 'communication_graphSerialWrite'
    //         ]
    //     }
    // ],
    "sensors": [
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_DISTANCEMOVEMENT}",
            "blocks": [
                'sensors_read_obstacle',
                'sensors_get_line',
                'sensors_get_proximity',
                'sensors_motor_speed',
                'sensors_get_accelerometer',
                'sensors_get_temperature',
                'sensors_get_microphone',
                'sensors_get_ir_communication',
                'sensors_get_ir_remote',
            ]
        }
    ],
    "actuators": [
        {
            "label": "%{BKY_SUBCATEGORY_MOTORS}",
            "blocks": [
                'robot_stop',
                'robot_move',
                // 'robot_rotate',
                'robot_rotate_clock',
                'robot_rotate_forever',
                'robot_change_single_motor_speed',
                'robot_stop_single_motor',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SOUNDS}",
            "blocks": [
                'sound_stop_sound_system',
                'sound_play_sound',
                'sound_play_sound_freq',
            ]
        },
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
            // 'forever',
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
            'math_thymio_copy',
            'math_thymio_add',
            'math_thymio_subtract',
            'math_thymio_multiply',
            'math_thymio_divide',
            'math_thymio_min',
            'math_thymio_max',
            'math_thymio_random',
            'math_thymio_sin',
            'math_thymio_cos',
            'math_thymio_sqrt'
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
};

const TOOLBOX_SCRATCH_CONTENT_SIMPLE = TOOLBOX_SCRATCH_CONTENT;