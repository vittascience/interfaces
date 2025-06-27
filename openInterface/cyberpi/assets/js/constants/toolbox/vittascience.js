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
        "toolboxitemid": "robots",
        "name": "%{BKY_CATEGORY_ROBOTS}",
        "style": "robots_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-robot"
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
            "label": "%{BKY_SUBCATEGORY_LED}",
            "blocks": [
                'cyberpi_led_on_all_RGB',
                'cyberpi_led_on_all_palette',
                'cyberpi_led_on_RGB',
                'cyberpi_led_on_palette',
                'cyberpi_led_play',
                'cyberpi_led_move',
                'cyberpi_led_set_brightness',
                'cyberpi_led_get_brightness'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_CONSOLE}",
            "blocks": [
                'cyberpi_console_print',
                'cyberpi_console_set_font'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_TEXT}",
            "blocks": [
                'cyberpi_display_show_label',
                'cyberpi_display_show_label_xy'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_CHART}",
            "blocks": [
                'cyberpi_chart_set_brush_palette',
                'cyberpi_chart_set_brush',
                'cyberpi_linechart_set_step',
                'cyberpi_linechart_add',
                'cyberpi_barchart_add',
                'cyberpi_table_add',
                'cyberpi_chart_map',
            ]
        }
    ],
    "io": [
        {
            "label": "%{BKY_SUBCATEGORY_TIME}",
            "blocks": [
                'io_pause',
                'io_waitUntil',
                'io_initChronometer',
                'io_getChronometer'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_BUTTONS}",
            "blocks": [
                'io_controller_onButtonPressed',
                'io_controller_isButtonPressed',
                'io_controller_get_count',
                'io_controller_reset_count'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_EVENTS}",
            "blocks": [
                'io_event_start',
                'io_event_is_press',
                'io_cyberpi_broadcast',
                'io_event_receive'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_PINS}",
            "blocks": [
                'io_digital_signal',
                'io_readDigitalPin',
                'io_writeDigitalPin',
                // 'io_readAnalogPin',
                'io_writePwm',
                // 'io_writeAnalogPin',
                'io_setPwm',
                'io_stopPwm',
                'io_getVoltage'
            ]
        }
    ],
    "communication": [
        {
            "label": "%{BKY_SUBCATEGORY_SERIAL_CONNECTION}",
            "blocks": [
                'communication_serialWrite',
                'communication_graphSerialWrite',
                'communication_playComputerMusic',
                'communication_playComputerFrequency',
                'communication_stopComputerMusic'
            ]
        }
    ],
    "sensors": [
        {
            "label": "%{BKY_SUBCATEGORY_CYBERPI}",
            "blocks": [
                'sensors_esp32_raw_temperature',
                'sensors_esp32_hall_sensor',
                'sensors_cyberpi_get_bri',
                'sensors_cyberpi_get_loudness'
            ]
        },
    ],
    "actuators": [
        {
            "label": "%{BKY_SUBCATEGORY_AUDIO}",
            "blocks": [
                'actuators_audio_play',
                'actuators_audio_play_tone',
                'actuators_audio_play_note',
                'actuators_audio_play_drum',
                'actuators_audio_start_recording',
                'actuators_audio_stop_recording',
                'actuators_audio_play_recording',
                'actuators_audio_add_tempo',
                'actuators_audio_set_tempo',
                'actuators_audio_get_tempo',
                'actuators_audio_add_volume',
                'actuators_audio_set_volume',
                'actuators_audio_get_volume',
                'actuators_audio_stop'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_MOTORS_M1_M2}",
            "blocks": [
                'mbot2_motors_set_power',
                'mbot2_motors_add_power',
                'mbot2_motors_get_power',
                'mbot2_motors_stop'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SERVOMOTORS}",
            "blocks": [
                'mbot2_servos_set_angle',
                'mbot2_servos_add_angle',
                'mbot2_servos_get_angle',
                'mbot2_servos_reset',
                // 'mbot2_servos_release'
            ]
        }
    ],
    "robots": [
        {
            "label": "%{BKY_SUBCATEGORY_ENCODER_MOTORS}",
            "blocks": [
                'robots_mbot2_move',
                'robots_mbot2_move_by',
                'robots_mbot2_turn',
                'robots_mbot2_control_motor',
                'robots_mbot2_turn_motor',
                'robots_mbot2_stop_motor',
                'robots_mbot2_get_motor_encoding',
                'robots_mbot2_reset_motor_angular_position',
                'robots_mbot2_control_motor_locking'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_ULTRASONIC_SENSORS}",
            "blocks": [
                'robots_mbot2_ultrasonic_getDistance',
                'robots_mbot2_ultrasonic_setBrightness',
                'robots_mbot2_ultrasonic_getBrightness',
                'robots_mbot2_ultrasonic_stopLED',
                'robots_mbot2_ultrasonic_playLED'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_QUAD_RGB_SENSORS}",
            "blocks": [
                'sensors_mbuild_quad_RGB_detection_L1_R1_is',
                'sensors_mbuild_quad_RGB_get_detection_L1_R1',
                'sensors_mbuild_quad_RGB_detection_is',
                'sensors_mbuild_quad_RGB_get_detection',
                'sensors_mbuild_quad_RGB_is_color_detected',
                'sensors_mbuild_quad_RGB_get_probe_data',
                'sensors_mbuild_quad_RGB_get_offset_track',
                'sensors_mbuild_quad_RGB_define_color',
                'sensors_mbuild_quad_RGB_set_color_list',
                // 'sensors_mbuild_quad_RGB_set_color_RGB',
                // 'sensors_mbuild_quad_RGB_set_color_palette',
                'sensors_mbuild_quad_RGB_close_led',
                'sensors_mbuild_quad_RGB_calibrate',
                'sensors_mbuild_quad_RGB_color_mode'
            ]
        }
    ],
    "network": [
        {
            "label": "%{BKY_SUBCATEGORY_WIFI}",
            "blocks": [
                'cyberpi_wifi_connect',
                'cyberpi_wifi_disconnect',
                'cyberpi_wifi_is_connect'
            ]
        },
        {
            "label": "LAN",
            "blocks": [
                'cyberpi_wifi_broadcast_set',
                'cyberpi_wifi_broadcast_get'
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

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;