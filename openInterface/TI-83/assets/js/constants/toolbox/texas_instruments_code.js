// texas instruents js
const TOOLBOX_TI_CODE_CATEGORIES = [
    {
        "kind": "category",
        "toolboxitemid": "procedures",
        "name": "Fonc",
        "style": "procedure_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "control",
        "name": "Ctl",
        "style": "control_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-code-branch"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "ops",
        "name": "Ops",
        "style": "math_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-calculator"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "lists",
        "name": "List",
        "style": "list_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-list"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "Type",
        "name": "Type",
        "style": "type_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-shapes"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "io",
        "name": "E/S",
        "style": "io_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-exchange-alt"
        },
        "contents": []
    },
    {
        "kind": "sep",
        "toolboxitemid": "sep1",
    },
    {
        "kind": "category",
        "toolboxitemid": "math",
        "name": "Math",
        "style": "math_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-calculator"
        },
        // subcategory tree for math (blockly default nested tree)
        "contents": [
            {
                "kind": "category",
                "toolboxitemid": "math_math",
                "name": "math",
                "style": "math_category",
                "cssConfig": {
                    "icon": "icon_blockly fas fa-calculator"
                },
                // 'categoryStyle': 'math_category',
                "contents": []
            },
            {
                "kind": "category",
                "toolboxitemid": "math_const",
                "name": "const",
                "style": "math_category",
                "cssConfig": {
                    "icon": "icon_blockly fas fa-superscript"
                },
                // 'categoryStyle': 'math_category',
                "contents": []
            },
            {
                "kind": "category",
                "toolboxitemid": "math_trig",
                "name": "trig",
                "style": "math_category",
                "cssConfig": {
                    "icon": "icon_blockly fas fa-compass-drafting"
                },
                // 'categoryStyle': 'math_category',
                "contents": []
            }
        ]
    },
    {
        "kind": "category",
        "toolboxitemid": "random",
        "name": "random",
        "style": "random_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-random"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "time",
        "name": "time",
        "style": "time_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-redo-alt"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "Avanced",
        "name": "%{BKY_CATEGORY_ADVANCED}",
        "style": "advanced_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-cogs"
        },
        "contents": [
            {
                "kind": "category",
                "toolboxitemid": "ti_system",
                "name": "ti_system",
                "style": "ti_system_category",
                "cssConfig": {
                    "icon": "icon_blockly fas fa-atom"
                },
                "contents": []
            },
            {
                "kind": "category",
                "toolboxitemid": "ti_plotlib",
                "name": "ti_plotlib",
                "style": "ti_plotlib_category",
                "cssConfig": {
                    "icon": "icon_blockly fas fa-chart-line"
                },
                "contents": [
                    {
                        "kind": "category",
                        "toolboxitemid": "ti_plotlib_config",
                        "name": "%{BKY_SUBCATEGORY_CONFIG}",
                        "style": "ti_plotlib_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-sliders"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "ti_plotlib_draw",
                        "name": "%{BKY_SUBCATEGORY_DRAW}",
                        "style": "ti_plotlib_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-pencil"
                        },
                        "contents": []  
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "ti_plotlib_props",
                        "name": "%{BKY_SUBCATEGORY_PROPS}",
                        "style": "ti_plotlib_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-gear"
                        },
                        "contents": []
                    },
        
                ]
            },
            {
                "kind": "category",
                "toolboxitemid": "ti_draw",
                "name": "ti_draw",
                "style": "ti_draw_category",
                "cssConfig": {
                    "icon": "icon_blockly fa-solid fa-pen-ruler"
        
                },
                "contents": [
                    {
                        "kind": "category",
                        "toolboxitemid": "ti_draw_shape",
                        "name": "Shape",
                        "style": "ti_draw_category",
                        "cssConfig": {
                            "icon": "icon_blockly fa-solid fa-shapes"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "ti_draw_control",
                        "name": "Control",
                        "style": "ti_draw_category",
                        "cssConfig": {
                            "icon": "icon_blockly fa-solid fa-clipboard"
                        },
                        "contents": []
                    },
        
                ]
            },
            {
                "kind": "category",
                "toolboxitemid": "ti_hub",
                "name": "ti_hub",
                "style": "ti_hub_category",
                "cssConfig": {
                    "icon": "icon_blockly fas fa-plug"
                },
                "contents": [
                    {
                        "kind": "category",
                        'name': "%{BKY_SUBCATEGORY_IMPORTS}",
                        "toolboxitemid": "ti_hub_imports",
                        "style": "ti_hub_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-file-import"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        'name': "%{BKY_SUBCATEGORY_COMMANDS}",
                        "toolboxitemid": "ti_hub_commands",
                        "style": "ti_hub_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-terminal"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        'name': "%{BKY_SUBCATEGORY_PORTS}",
                        "toolboxitemid": "ti_hub_ports",
                        "style": "ti_hub_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-plug"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        'name': "%{BKY_SUBCATEGORY_ADVANCED}",
                        "toolboxitemid": "ti_hub_advanced",
                        "style": "ti_hub_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-gears"
                        },
                        "contents": []
                    },
                    
                ]
            },
            {
                "kind": "category",
                "toolboxitemid": "ti_rover",
                "name": "ti_rover",
                "style": "ti_rover_category",
                "cssConfig": {
                    "icon": "icon_blockly fas fa-robot"
                },
                "contents": [
                    {
                        "kind": "category",
                        "toolboxitemid": "ti_rover_drive",
                        "name": "%{BKY_SUBCATEGORY_DRIVE}",
                        "style": "ti_rover_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-car"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "ti_rover_io",
                        "name": "%{BKY_SUBCATEGORY_ROVER_IO}",
                        "style": "ti_rover_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-exchange-alt"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "ti_rover_settings",
                        "name": "%{BKY_SUBCATEGORY_ROVER_SETTINGS}",
                        "style": "ti_rover_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-sliders"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "ti_rover_commands",
                        "name": "%{BKY_SUBCATEGORY_COMMANDS}",
                        "style": "ti_rover_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-terminal"
                        },
                        "contents": []
                    }
        
                ]
            },
            {
                "kind": "category",
                "toolboxitemid": "mb",
                "name": "micro:bit",
                "style": "mb_category",
                "cssConfig": {
                    "icon": "icon_blockly fas fa-th"
                },
                "contents": [
                    {
                        "kind": "category",
                        "toolboxitemid": "mb_commands",
                        "name": "%{BKY_SUBCATEGORY_MICROBIT_COMMANDS_CODE}",
                        "style": "mb_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-terminal"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "mb_screen",
                        "name": "%{BKY_SUBCATEGORY_MICROBIT_SCREEN_CODE}",
                        "style": "mb_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-display"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "mb_music",
                        "name": "%{BKY_SUBCATEGORY_MICROBIT_MUSIC_CODE}",
                        "style": "mb_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-music"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "mb_audio",
                        "name": "%{BKY_SUBCATEGORY_MICROBIT_AUDIO_CODE}",
                        "style": "mb_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-headphones"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "mb_microphone",
                        "name": "%{BKY_SUBCATEGORY_MICROBIT_MICROPHONE_CODE}",
                        "style": "mb_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-microphone"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "mb_buttons",
                        "name": "%{BKY_SUBCATEGORY_MICROBIT_BUTTONS_CODE}",
                        "style": "mb_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-toggle-on"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "mb_sensors",
                        "name": "%{BKY_SUBCATEGORY_MICROBIT_SENSORS_CODE}",
                        "style": "mb_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-tint"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "mb_radio",
                        "name": "%{BKY_SUBCATEGORY_MICROBIT_RADIO_CODE}",
                        "style": "mb_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-tower-cell"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "mb_pins",
                        "name": "%{BKY_SUBCATEGORY_MICROBIT_PINS_CODE}",
                        "style": "mb_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-bolt"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        'name': "%{BKY_SUBCATEGORY_MICROBIT_GROVE_CODE}",
                        "toolboxitemid": "mb_grove",
                        "style": "mb_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-thermometer-half"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "name": "%{BKY_SUBCATEGORY_MICROBIT_NEOPIXEL_CODE}",
                        "toolboxitemid": "mb_neopixel",
                        "style": "mb_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-lightbulb"
                        },
                        "contents": []
                    }
        
                ]
            },
            {
                "kind": "category",
                "toolboxitemid": "ce",
                "name": "ce",
                "style": "ce_category",
                "cssConfig": {
                    "icon": "icon_blockly fas fa-chart-bar"
                },
                "contents": [
                    {
                        "kind": "category",
                        "toolboxitemid": "ce_box",
                        "name": "%{BKY_SUBCATEGORY_CE_BOX}",
                        "style": "ce_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-square"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "ce_chart",
                        "name": "%{BKY_SUBCATEGORY_CE_CHART}",
                        "style": "ce_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-chart-line"
                        },
                        "contents": []
                    },
                ]
            },
            {
                "kind": "category",
                "toolboxitemid": "turtle",
                "name": "turtle",
                "style": "turtle_category",
                "cssConfig": {
                    "icon": "icon_blockly fas fa-pencil-alt"
                },
                "contents": [
                    {
                        "kind": "category",
                        "toolboxitemid": "turtle_mouv",
                        "name": "%{BKY_SUBCATEGORY_MOUV}",
                        "style": "turtle_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-up-down-left-right"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "turtle_draw",
                        "name": "%{BKY_SUBCATEGORY_DRAW}",
                        "style": "turtle_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-sun"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "turtle_pen",
                        "name": "%{BKY_SUBCATEGORY_PEN}",
                        "style": "turtle_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-sliders"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "turtle_settings",
                        "name": "%{BKY_SUBCATEGORY_SETTINGS}",
                        "style": "turtle_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-gear"
                        },
                        "contents": []
                    },
                    {
                        "kind": "category",
                        "toolboxitemid": "turtle_state",
                        "name": "%{BKY_SUBCATEGORY_STATE}",
                        "style": "turtle_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-info-circle"
                        },
                        "contents": []
                    },
                    
        
                ]
            },
            {
                "kind": "category",
                "toolboxitemid": "tello",
                "name": "tello",
                "style": "tello_category",
                "cssConfig": {
                    "icon": "icon_blockly svgIcon"
                },
                "contents": []
            }
        ]
    },
];

const TOOLBOX_TI_CODE_CONTENT = {
    "procedures": [
        {
            "blocks": [
                'procedures_defnoreturn_ti',
                'procedures_return_ti',
            ]
        }
    ],
    "control": [
        {
            "blocks": [
                'controls_if_code',
                'controls_if_else_code',
                'controls_if_elif_else_code',
            ]
        },
        {
            "blocks": [

                'controls_repeat_code',
                'controls_repeat_start_end_code',
                'controls_repeat_start_end_step_code',
                'controls_repeat_list_code',
                'controls_whileUntil_code',
                'controls_elif_code',
                'controls_else_code',

            ]
        }
    ],
    "ops": [
        {
            "blocks": [
                'ops_equal_code',
                'ops_strictly_equal_code',
                'ops_different_code',
                'ops_greater_code',
                'ops_greater_equal_code',
                'ops_lower_code',
                'ops_lower_equal_code',
                'ops_and_code',
                'ops_or_code',
                'ops_not_code',
                'ops_true_code',
                'ops_false_code',

            ]
        }
    ],
    "lists": [
        {
            "blocks": [
                'list_create_code',
                'list_sequence_code',
                'list_length_code',
                'list_max_code',
                'list_min_code',
                'list_append_code',
                'list_remove_code',
                'list_insert_code',
                'list_sum_code',
                'list_sorted_code',
                'list_sort_code',
                'list_count_code',

            ]
        }
    ],
    "Type": [
        {
            "blocks": [
                'type_int_code',
                'type_float_code',
                'type_round_code',
                'type_str_code',
                'type_complex_code',
                'type_type_code',
            ]
        }
    ],

    "io": [
        {
            "label": "%{BKY_SUBCATEGORY_CONSOLE}",
            "blocks": [
                'ti_io_print_code',
                'ti_io_input_code',
                'io_eval_code',
                'io_str_format_code',

            ]
        }
    ],

    "math": {
        "math_math": [
            {
                "blocks": [
                    "math_import_code",
                    "math_fabs_code",
                    "math_sqrt_code",
                    "math_exp_code",
                    "math_pow_code",
                    "math_log_code",
                    "math_fmod_code",
                    "math_ceil_code",
                    "math_floor_code",
                    "math_trunc_code",
                    "math_frexp_code"
                ]
            }
        ],
        "math_const": [
            {
                "blocks": [
                    "math_const_e_code",
                    "math_const_pi_code"
                ]
            }
        ],
        "math_trig": [
            {
                "blocks": [
                    "math_trig_radians_code",
                    "math_trig_degrees_code",
                    "math_trig_sin_code",
                    "math_trig_cos_code",
                    "math_trig_tan_code",
                    "math_trig_asin_code",
                    "math_trig_acos_code",
                    "math_trig_atan_code",
                    "math_trig_atan2_code"
                ]
            }
        ]
    },
    "random": [
        {
            "blocks": [
                "math_random_import_code",
                "math_random_random_code",
                "math_random_uniform_code",
                "math_random_randint_code",
                "math_random_choice_code",
                "math_random_randrange_code",
                "math_random_seed_code",

            ]
        }
    ],
    "time": [
        {
            "blocks": [
                'time_import_code',
                'time_sleep_code',
                'time_monotonic_code',
            ]
        }
    ],
    "Avanced": {

        "ti_system": [
            {
                "blocks": [
                    'ti_system_import_code',
                    'ti_system_recall_list_code',
                    'ti_system_store_list_code',
                    'ti_system_recall_RegEQ_code',
                    'ti_system_while_condition_code',
                    'ti_system_if_condition_code',
                    'ti_system_disp_at_code',
                    'ti_system_disp_clr_code',
                    'ti_system_disp_wait_code',
                    'ti_system_disp_cursor_code',
                    'ti_system_sleep_code',
                    'ti_system_wait_key_code',
                ]
            }
        ],
        "ti_plotlib": {
            
            'ti_plotlib_config':[
                {
                    "blocks": [
                        "ti_plotlib_import_code",
                        "ti_plotlib_cls_code",
                        "ti_plotlib_grid_code",
                        "ti_plotlib_window_code",
                        "ti_plotlib_auto_window_code",
                        "ti_plotlib_grid_code",
                        "ti_plotlib_axes_code",
                        "ti_plotlib_labels_code",
                        "ti_plotlib_title_code",
                        "ti_plotlib_show_plot_code",
                    ]
                }
            ],
            'ti_plotlib_draw':[
                {
                    "blocks": [
                        'ti_plotlib_define_color_code',
                        'ti_plotlib_draw_cls_code',
                        'ti_plotlib_draw_show_plot_code',
                        'ti_plotlib_scatter_code',
                        'ti_plotlib_plot_code',
                        'ti_plotlib_line_code',
                        'ti_plotlib_lin_reg_code',
                        'ti_plotlib_pen_code',
                        'ti_plotlib_text_at_code',
                    ],
                },
            ],
            'ti_plotlib_props':[
                {
                    "blocks": [
                        'ti_plotlib_xmin_code',
                        'ti_plotlib_xmax_code',
                        'ti_plotlib_ymin_code',
                        'ti_plotlib_ymax_code',
                        'ti_plotlib_a_code',
                        'ti_plotlib_b_code',
                    ],
                },
            ]
        },
      
        "ti_draw": {
            'ti_draw_shape':[
                {
                    "blocks": [
                        'ti_draw_draw_line_code',
                        'ti_draw_draw_rect_code',
                        'ti_draw_fill_rect_code',
                        'ti_draw_draw_circle_code',
                        'ti_draw_fill_circle_code',
                        'ti_draw_draw_text_code',
                        'ti_draw_draw_poly_code',
                        'ti_draw_fill_poly_code',
                        'ti_draw_plot_xy_code',
    
                    ]
                }
            ],
            'ti_draw_control':[
                {
                    "blocks": [
                        "ti_draw_clear_code",
                        'ti_draw_set_color_code',
                        'ti_draw_set_pen_code',
                        'ti_draw_show_code',
                    ]
                }
    
            ],
            
        },
        "ti_hub": {
            "ti_hub_imports":[
                {
                    "label": "%{BKY_SUBCATEGORY_2_BUILTIN_DEVICES}",
                    "blocks": [
                        "io_hub_imports_builtins_color_code",
                        "io_hub_imports_builtins_light_code",
                        "io_hub_imports_builtins_sound_code",
                        "io_hub_imports_builtins_brightness_code",
                    ],
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_INPUTS}",
                    "blocks": [
                        "io_hub_imports_inputs_dht_code",
                        "io_hub_imports_inputs_ranger_code",
                        "io_hub_imports_inputs_lightLevel_code",
                        "io_hub_imports_inputs_temperature_code",
                        "io_hub_imports_inputs_moisture_code",
                        "io_hub_imports_inputs_magnetic_code",
                        "io_hub_imports_inputs_vernier_code",
                        "io_hub_imports_inputs_analogin_code",
                        "io_hub_imports_inputs_digitalin_code",
                        "io_hub_imports_inputs_potentiometer_code",
                        "io_hub_imports_inputs_thermistors_code",
                        "io_hub_imports_inputs_loundness_code",
                        "io_hub_imports_inputs_color_code",
                        "io_hub_imports_inputs_bbports_code",
                        "io_hub_imports_inputs_hubtime_code",
                        "io_hub_imports_inputs_tiRGBarray_code",
                        "io_hub_imports_inputs_varrelease_code",
                    ],
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_OUTPUTS}",
                    "blocks": [
                        "io_hub_imports_outputs_led_code",
                        "io_hub_imports_outputs_rgb_code",
                        "io_hub_imports_outputs_tiRGBarray_code",
                        "io_hub_imports_outputs_speaker_code",
                        "io_hub_imports_outputs_power_code",
                        "io_hub_imports_outputs_continuousServo_code",
                        "io_hub_imports_outputs_analogout_code",
                        "io_hub_imports_outputs_vibrationMotor_code",
                        "io_hub_imports_outputs_relay_code",
                        "io_hub_imports_outputs_servo_code",
                        "io_hub_imports_outputs_squarewave_code",
                        "io_hub_imports_outputs_digitalout_code",
                        "io_hub_imports_outputs_bbport_code",
                        "io_hub_imports_outputs_varrelease_code",
                    ],
                }
            ],
    
            "ti_hub_commands":[
                {
                    "blocks": [
                        "io_hub_commands_ti_system_code",
                        "io_hub_commands_sleep_code",
                        "io_hub_commands_disp_at_code",
                        "io_hub_commands_disp_clear_code",
                        "io_hub_commands_disp_wait_code",
                        "io_hub_commands_disp_cursor_code",
                        "io_hub_commands_whileNotEscape_code",
                    ],
                }
            ],
            "ti_hub_ports":[
                {
                    "blocks": [
                        "io_hub_ports_out1_code",
                        "io_hub_ports_out2_code",
                        "io_hub_ports_out3_code",
                        "io_hub_ports_in1_code",
                        "io_hub_ports_in2_code",
                        "io_hub_ports_in3_code",
                        "io_hub_ports_bb1_code",
                        "io_hub_ports_bb2_code",
                        "io_hub_ports_bb3_code",
                        "io_hub_ports_bb4_code",
                        "io_hub_ports_bb5_code",
                        "io_hub_ports_bb6_code",
                        "io_hub_ports_bb7_code",
                        "io_hub_ports_bb8_code",
                        "io_hub_ports_bb9_code",
                        "io_hub_ports_bb10_code",
                        "io_hub_ports_I2C_code",
                    ],
                }
    
            ],
            "ti_hub_advanced":[
                {
                    "blocks": [
                        'io_hub_advanced_imports_code',
                        'io_hub_advanced_connect_code',
                        'io_hub_advanced_disconnect_code',
                        'io_hub_advanced_set_code',
                        'io_hub_advanced_read_code',
                        'io_hub_advanced_calibrate_code',
                        'io_hub_advanced_range_code',
                        'io_hub_advanced_version_code',
                        'io_hub_advanced_begin_code',
                        'io_hub_advanced_start_code',
                        'io_hub_advanced_about_code',
                        'io_hub_advanced_isti_code',
                        'io_hub_advanced_what_code',
                        'io_hub_advanced_who_code',
                        'io_hub_advanced_last_error_code',
                        'io_hub_advanced_sleep_code',
                    ],
                }
            ],
    
        },
        
        "ti_rover":{
            "ti_rover_drive":[
                {
                    "blocks": [
                        'ti_rover_drive_import_code',
                        'ti_rover_drive_forward_code',
                        'ti_rover_drive_backward_code',
                        'ti_rover_drive_turn_left_code',
                        'ti_rover_drive_turn_right_code',
                        'ti_rover_drive_stop_code',
                        'ti_rover_drive_resume_code',
                        'ti_rover_drive_stay_code',
                        'ti_rover_drive_to_xy_code',
                        'ti_rover_drive_to_polar_code',
                        'ti_rover_drive_to_angle_code',
                        'ti_rover_drive_forward_time_code',
                        'ti_rover_drive_backward_time_code',
                        'ti_rover_drive_forward_unit_code',
                        'ti_rover_drive_backward_unit_code',
                        'ti_rover_drive_left_unit_code',
                        'ti_rover_drive_right_unit_code',
                        'ti_rover_drive_disconnect_code',
                    ]
                },
            ],
            "ti_rover_io":[
                {
                    "label":"%{BKY_SUBCATEGORY_2_ROVER_INPUTS}",
                    "blocks": [
                        'ti_rover_io_ranger_measurement_code',
                        'ti_rover_io_color_measurement_code',
                        'ti_rover_io_red_measurement_code',
                        'ti_rover_io_green_measurement_code',
                        'ti_rover_io_blue_measurement_code',
                        'ti_rover_io_gray_measurement_code',
                        'ti_rover_io_encodeurs_gyroscope_measurement_code',
                        'ti_rover_io_gyroscope_measurement_code',
                        'ti_rover_io_ranger_time_code',
                    ]
                },
                {
                    "label":"%{BKY_SUBCATEGORY_2_ROVER_OUTPUTS}",
                    "blocks": [
                        'ti_rover_io_color_rgb_code',
                        'ti_rover_io_rgb_blink_code',
                        'ti_rover_io_color_off_code',
                        'ti_rover_io_motor_left_code',
                        'ti_rover_io_motor_right_code',
                        'ti_rover_io_motors_code',
                    ]
                },
                {
                    "label":"%{BKY_SUBCATEGORY_2_ROVER_PATHS}",
                    "blocks": [
                        "ti_rover_io_waypoint_xythdrn_code",
                        "ti_rover_io_waypoint_prev_code",
                        "ti_rover_io_waypoint_etat_code",
                        "ti_rover_io_path_done_code",
                        "ti_rover_io_pathlist_x_code",
                        "ti_rover_io_pathlist_y_code",
                        "ti_rover_io_pathlist_time_code",
                        "ti_rover_io_pathlist_heading_code",
                        "ti_rover_io_pathlist_distance_code",
                        "ti_rover_io_pathlist_revs_code",
                        "ti_rover_io_pathlist_cmdnum_code",
                        "ti_rover_io_waypoint_x_code",
                        "ti_rover_io_waypoint_y_code",
                        "ti_rover_io_waypoint_time_code",
                        "ti_rover_io_waypoint_heading_code",
                        "ti_rover_io_waypoint_distance_code",
                        "ti_rover_io_waypoint_revs_code",
                    ]
                },
    
            ],
            "ti_rover_settings":[
                {
                    "blocks": [
                        'ti_rover_settings_unitss_code',
                        'ti_rover_settings_ms_code',
                        'ti_rover_settings_revss_code',
                        'ti_rover_settings_units_code',
                        'ti_rover_settings_m_code',
                        'ti_rover_settings_revs_code',
                        'ti_rover_settings_degrees_code',
                        'ti_rover_settings_radians_code',
                        'ti_rover_settings_grads_code',
                        'ti_rover_settings_clockwise_code',
                        'ti_rover_settings_counterclockwise_code',
                    ]
                },
            ],
            "ti_rover_commands":[
                {
                    "blocks": [
                        'ti_rover_commands_import_code',
                        'ti_rover_commands_sleep_code',
                        'ti_rover_commands_disp_at_code',
                        'ti_rover_commands_disp_clr_code',
                        'ti_rover_commands_disp_wait_code',
                        'ti_rover_commands_disp_cursor_code',
                        'ti_rover_commands_whileNOTescape_code',
                        'ti_rover_commands_wait_until_done_code',
                        'ti_rover_commands_while_not_path_done_code',
                        'ti_rover_commands_position_code',
                        'ti_rover_commands_position_angle_code',
                        'ti_rover_commands_grid_origin_code',
                        'ti_rover_commands_grid_m_code',
                        'ti_rover_commands_path_clear_code',
                        'ti_rover_commands_zero_gyro_code'
                    ]
                },
            ],
        },
        
        "mb":{
            "mb_commands":[
                {
                    "blocks": [
                        'microbit_sleep_code',
                        'microbit_forever_code',
                        'microbit_disp_clr_code',
                        'microbit_store_list_code',
                        'microbit_temperature_code',
                    ]
                },
            ],
            "mb_screen":[
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_SCREEN}",
                    "blocks": [
                        'microbit_disp_show_code',
                        'microbit_disp_scroll_code',
                        'microbit_disp_clear_code',
                        'microbit_disp_set_pixel_code',
                        'microbit_disp_image_code',
                        'microbit_read_light_level_code',
    
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_SCREEN_IMAGES}",
                    "blocks": [
                        'microbit_image_heart_code',
                        'microbit_image_heart_small_code',
                        'microbit_image_happy_code',
                        'microbit_image_smile_code',
                        'microbit_image_sad_code',
                        'microbit_image_confused_code',
                        'microbit_image_angry_code',
                        'microbit_image_asleep_code',
                        'microbit_image_surprised_code',
                        'microbit_image_silly_code',
                        'microbit_image_fabulous_code',
                        'microbit_image_meh_code',
                        'microbit_image_yes_code',
                        'microbit_image_no_code',
                        'microbit_image_triangle_code',
                        'microbit_image_triangle_left_code',
                        'microbit_image_chessboard_code',
                        'microbit_image_diamond_code',
                        'microbit_image_diamond_small_code',
                        'microbit_image_square_code',
                        'microbit_image_square_small_code',
                        'microbit_image_rabbit_code',
                        'microbit_image_cow_code',
                        'microbit_image_music_crotchet_code',
                        'microbit_image_music_quaver_code',
                        'microbit_image_music_quavers_code',
                        'microbit_image_pitchfork_code',
                        'microbit_image_xmas_code',
                        'microbit_image_pacman_code',
                        'microbit_image_target_code',
                        'microbit_image_tshirt_code',
                        'microbit_image_rollerskate_code',
                        'microbit_image_duck_code',
                        'microbit_image_house_code',
                        'microbit_image_tortoise_code',
                        'microbit_image_butterfly_code',
                        'microbit_image_stickfigure_code',
                        'microbit_image_ghost_code',
                        'microbit_image_sword_code',
                        'microbit_image_giraffe_code',
                        'microbit_image_skull_code',
                    ],
                }
            ],
            "mb_music":[
                {   
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_MUSIC}",
                    "blocks": [
                        'microbit_music_play_code',
                        'microbit_music_pitch_code',
                        'microbit_music_set_tempo_code',
                        'microbit_music_set_volume_code',
                        'microbit_music_note_code',
    
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_MUSIC_NOTES}",
                    "blocks": [
                        "microbit_music_melody_dadadadum_code",
                        "microbit_music_melody_entertainer_code",
                        "microbit_music_melody_prelude_code",
                        "microbit_music_melody_ode_code",
                        "microbit_music_melody_nyan_code",
                        "microbit_music_melody_ringtone_code",
                        "microbit_music_melody_funk_code",
                        "microbit_music_melody_blues_code",
                        "microbit_music_melody_birthday_code",
                        "microbit_music_melody_wedding_code",
                        "microbit_music_melody_funeral_code",
                        "microbit_music_melody_ba_ding_code",
                        "microbit_music_melody_wawawawaa_code",
                        "microbit_music_melody_jump_up_code",
                        "microbit_music_melody_jump_down_code",
                        "microbit_music_melody_power_up_code",
                        "microbit_music_melody_power_down_code",
                        "microbit_music_melody_python_code",
                        "microbit_music_melody_baddy_code",
                        "microbit_music_melody_chase_code",
                        "microbit_music_melody_punchline_code"
                    ]
                }
            ],
            "mb_audio":[
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_AUDIO}",
                    "blocks": [
                        'microbit_audio_play_code',
                        'microbit_audio_stop_code',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_AUDIO_SOUNDS}",
                    "blocks": [
                        'microbit_audio_sound_giggle_code',
                        'microbit_audio_sound_happy_code',
                        'microbit_audio_sound_hello_code',
                        'microbit_audio_sound_mysterious_code',
                        'microbit_audio_sound_sad_code',
                        'microbit_audio_sound_slide_code',
                        'microbit_audio_sound_soaring_code',
                        'microbit_audio_sound_spring_code',
                        'microbit_audio_sound_twinkle_code',
                        'microbit_audio_sound_yawn_code',
                    ]
                }
                
            ],
            "mb_microphone":[
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_MICROPHONE}",
                    "blocks": [
                        'microbit_microphone_sound_level_code',
                        'microbit_microphone_current_level_code',
                        'microbit_microphone_is_event_code',
                        'microbit_microphone_was_event_code',
                        'microbit_microphone_set_threshold_code',
    
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_MICROPHONE_EVENTS}",
                    "blocks": [
                        'microbit_microphone_event_loud_code',
                        'microbit_microphone_event_quiet_code',
                    ]
                },
                
            ],
            "mb_buttons":[
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_BUTTONS_A}",
                    "blocks": [
                        'microbit_button_a_is_pressed_code',
                        'microbit_button_a_was_pressed_code',
                        'microbit_button_a_get_presses_code',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_BUTTONS_B}",
                    "blocks": [
                        'microbit_button_b_is_pressed_code',
                        'microbit_button_b_was_pressed_code',
                        'microbit_button_b_get_presses_code',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_BUTTONS_LOGO}",
                    "blocks": [
                        'microbit_button_logo_code'
                    ]
                },
            ],
            "mb_sensors":[
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_SENSORS_ACCELEROMETER}",
                    "blocks": [
                        'microbit_accelerometer_get_x_code',
                        'microbit_accelerometer_get_y_code',
                        'microbit_accelerometer_get_z_code',
                        'microbit_accelerometer_get_values_code',
                        'microbit_accelerometer_magnitude_code',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_SENSORS_COMPASS}",
                    "blocks": [
                        'microbit_compass_heading_code',
                        'microbit_compass_get_x_code',
                        'microbit_compass_get_y_code',
                        'microbit_compass_get_z_code',
                        'microbit_compass_is_calibrated_code',
                        'microbit_compass_get_field_strngth_code',
                        'microbit_compass_calibrate_code',
                        'microbit_compass_clear_calibration_code',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_SENSORS_GESTURES}",
                    "blocks": [
                        'microbit_gestures_current_gesture_code',
                        'microbit_gestures_is_gesture_code',
                        'microbit_gestures_was_gesture_code',
                        'microbit_gestures_up_code',
                        'microbit_gestures_down_code',
                        'microbit_gestures_left_code',
                        'microbit_gestures_right_code',
                        'microbit_gestures_face_up_code',
                        'microbit_gestures_face_down_code',
                        'microbit_gestures_shake_code',
                    ]
                },
            ],
            "mb_radio":[
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_RADIO}",
                    "blocks": [
                        'microbit_radio_on_code',
                        'microbit_radio_off_code',
                        'microbit_radio_config_code',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_RADIO_SEND_RECEIVE}",
                    "blocks": [
                        'microbit_radio_send_code',
                        'microbit_radio_receive_code',
                        'microbit_radio_receive_number_code',
                    ]
                }
            ],
            'mb_pins':[
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_PINS_DIGITAL}",
                    "blocks": [
                        'microbit_pins_digital_read_code',
                        'microbit_pins_digital_write_code',
    
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_PINS_ANALOG}",
                    "blocks": [
                        'microbit_pins_analog_read_code',
                        'microbit_pins_analog_write_code',
                        'microbit_pins_analog_set_period_code',
    
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_PINS_PINS}",
                    "blocks": [
                        'microbit_pins_pin0_code',
                        'microbit_pins_pin1_code',
                        'microbit_pins_pin2_code',
                        'microbit_pins_pin8_code',
                        'microbit_pins_pin13_code',
                        'microbit_pins_pin14_code',
                        'microbit_pins_pin15_code',
                        'microbit_pins_pin16_code',
                        'microbit_pins_pin_speaker_code',
                    ]
                },
    
            ],
            "mb_grove":[
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_GROVE_INPUTS}",
                    "blocks": [
                        'microbit_grove_input_dht20_code',
                        'microbit_grove_input_dht20_temperature_code',
                        'microbit_grove_input_dht20_lightlevel_code',
                        'microbit_grove_input_dht20_moisture_code',
                        'microbit_grove_input_dht20_pressure_code',
                        'microbit_grove_input_dht20_calibrate_pressure_code',
                        'microbit_grove_input_ranger_time_code',
                        'microbit_grove_input_ranger_distance_code',
                        'microbit_grove_input_bme280_code',
                        'microbit_grove_input_sgp30_code',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_GROVE_OUTPUTS}",
                    "blocks": [
                        'microbit_grove_output_power_code',
                        'microbit_grove_output_relay_code',
                        'microbit_grove_output_servo_code',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_PINS_PINS}",
                    "blocks": [
                        'microbit_pins_pin0_code',
                        'microbit_pins_pin1_code',
                        'microbit_pins_pin2_code',
                        'microbit_pins_pin8_code',
                        'microbit_pins_pin13_code',
                        'microbit_pins_pin14_code',
                        'microbit_pins_pin15_code',
                        'microbit_pins_pin16_code',
                    ]
                }
            ],
            "mb_neopixel":[
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_NEOPIXEL_COLOR}",
                    "blocks": [
                        'microbit_neopixel_set_color_code',
                        'microbit_neopixel_set_pin_color_code',
                        'microbit_neopixel_set_rgb_code',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_NEOPIXEL_CONFIG}",
                    "blocks": [
                        'microbit_set_neopixel_code',
                        'microbit_neopixel_pin0_code',
                        'microbit_neopixel_pin1_code',
                        'microbit_neopixel_pin2_code',
                        'microbit_neopixel_pin13_code',
                        'microbit_neopixel_pin14_code',
                        'microbit_neopixel_pin15_code',
                        'microbit_neopixel_pin16_code',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_MICROBIT_NEOPIXEL_CONTROL}",
                    "blocks": [
                        'microbit_neopixel_set_at_index_code',
                        'microbit_neopixel_show_code',
                        'microbit_neopixel_clear_code',
                    ]
                },
    
            ]
        },
        
        "ce":{
            "ce_box":[
                {
                    "blocks": [
                        'ce_box_define_data_code',
                        'ce_box_box_code',
                        'ce_box_title_code',
                        'ce_box_show_code'
                    ]
                }
            
            ],
            "ce_chart":[
                {   
                    "label": "ce_chart",
                    "blocks": [
                        'ce_chart_define_data_code',
                        'ce_chart_chart_code',
                        'ce_chart_data_code',
                        'ce_chart_title_code',
                        'ce_chart_frequencies_code',
                        'ce_chart_show_code'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_2_CHARTS_RECTANGLE}",
                    "blocks": [
                        'ce_chart_rectangle_code',
                        'ce_chart_area_code',
                        'ce_chart_draw_code',
                        'ce_chart_lambda_code',
                        'ce_chart_draw_fx_code',
    
                    ]
                }
            ],
        },
        "turtle": {
            "turtle_mouv": [
                {
                    "blocks": [
                        'turtle_forward_code',
                        'turtle_backward_code',
                        'turtle_right_code',
                        'turtle_left_code',
                        'turtle_goto_code',
                        'turtle_done_code',
                    ]
                }
            ],
            "turtle_draw": [
                {
                    "blocks": [
                        'turtle_fillcolor_code',
                        'turtle_begin_fill_code',
                        'turtle_end_fill_code',
                        'turtle_circle_code',
                        'turtle_dot_code',
                        'turtle_write_code',
                    ]
                }
            ],
            "turtle_pen": [
                {
                    "blocks": [
                        'turtle_up_code',
                        'turtle_down_code',
                        'turtle_pencolor_code',
                        'turtle_pensize_code',
                    ]
                }
            ],
            "turtle_settings": [
                {
                    "blocks": [
                        'turtle_clear_code',
                        'turtle_hide_turtle_code',
                        'turtle_show_turtle_code',
                        'turtle_hidegrid_code',
                        'turtle_speed_code',
                    ]
                }
            ],
            "turtle_state": [
                {
                    "blocks": [
                        'turtle_home_code',
                        'turtle_setheading_code',
                        'turtle_getx_code',
                        'turtle_gety_code',
                        'turtle_getpos_code',
                        'turtle_heading_code',
                    ]
                }
            ]
    
        },
        
        "tello": [
            {
                "blocks": [
                    'tello_takeoff_code',
                    'tello_land_code',
                    'tello_forward_code',
                    'tello_backward_code',
                    'tello_turn_right_code',
                    'tello_turn_left_code',
                    'tello_fly_right_code',
                    'tello_fly_left_code',
                    'tello_up_code',
                    'tello_down_code',
                    'tello_getAltitude_code',
                ]
            },
        ]
    },
};

const TOOLBOX_TI_CODE_CONTENT_SIMPLE = TOOLBOX_TI_CODE_CONTENT;