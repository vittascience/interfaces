/**
 * @fileoverview Display blocks for Niryo.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "display_led_ring_colors",
        "message0": "%{BKY_DISPLAY_LED_RING_COLORS_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "RED",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "GREEN",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "BLUE",
                "check": "Number"
            },
        ],
        "output": 'Number',
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_RING_COLORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        'type': 'display_led_ring_colors_picker',
        'message0': '%{BKY_DISPLAY_LED_RING_COLORS_PICKER_TITLE}',
        'args0': [
            {
                'type': 'input_value',
                'name': 'COLOR',
                'check': 'Colour'
            }
        ],
        'output': 'Number',
        "inputsInline": true,
        'style': 'display_blocks',
        'tooltip': '%{BKY_DISPLAY_LED_RING_COLORS_PICKER_TOOLTIP}',
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "display_led_ring_solid_color",
        "message0": "%{BKY_DISPLAY_LED_RING_SOLID_COLOR_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "WAIT",
                "options": [
                    ["%{BKY_DISPLAY_LED_RING_WAIT_TRUE}", "True"],
                    ["%{BKY_DISPLAY_LED_RING_WAIT_FALSE}", "False"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_RING_SOLID_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_led_ring_flashing_color",
        "message0": "%{BKY_DISPLAY_LED_RING_FLASHING_COLOR_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "TIME",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "REPETITION",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "WAIT",
                "options": [
                    ["%{BKY_DISPLAY_LED_RING_WAIT_TRUE}", "True"],
                    ["%{BKY_DISPLAY_LED_RING_WAIT_FALSE}", "False"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_RING_FLASHING_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_led_ring_breathing_color",
        "message0": "%{BKY_DISPLAY_LED_RING_BREATHING_COLOR_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "TIME",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "WAIT",
                "options": [
                    ["%{BKY_DISPLAY_LED_RING_WAIT_TRUE}", "True"],
                    ["%{BKY_DISPLAY_LED_RING_WAIT_FALSE}", "False"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_RING_BREATHING_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "display_led_ring_chase_color",
        "message0": "%{BKY_DISPLAY_LED_RING_CHASE_COLOR_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "TIME",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "REPETITION",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "WAIT",
                "options": [
                    ["%{BKY_DISPLAY_LED_RING_WAIT_TRUE}", "True"],
                    ["%{BKY_DISPLAY_LED_RING_WAIT_FALSE}", "False"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_RING_CHASE_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "display_led_ring_wipe_color",
        "message0": "%{BKY_DISPLAY_LED_RING_WIPE_COLOR_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "TIME",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "WAIT",
                "options": [
                    ["%{BKY_DISPLAY_LED_RING_WAIT_TRUE}", "True"],
                    ["%{BKY_DISPLAY_LED_RING_WAIT_FALSE}", "False"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_RING_WIPE_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "display_led_ring_rainbow_pattern",
        "message0": "%{BKY_DISPLAY_LED_RING_RAINBOW_PATTERN_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "TIME",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "REPETITION",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "WAIT",
                "options": [
                    ["%{BKY_DISPLAY_LED_RING_WAIT_TRUE}", "True"],
                    ["%{BKY_DISPLAY_LED_RING_WAIT_FALSE}", "False"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_RING_RAINBOW_PATTERN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "display_led_ring_rainbow_cycle",
        "message0": "%{BKY_DISPLAY_LED_RING_RAINBOW_CYCLE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "TIME",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "REPETITION",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "WAIT",
                "options": [
                    ["%{BKY_DISPLAY_LED_RING_WAIT_TRUE}", "True"],
                    ["%{BKY_DISPLAY_LED_RING_WAIT_FALSE}", "False"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_RING_RAINBOW_CYCLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
        
    },
    {
        "type": "display_led_ring_go_up",
        "message0": "%{BKY_DISPLAY_LED_RING_GO_UP_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "TIME",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "REPETITION",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "WAIT",
                "options": [
                    ["%{BKY_DISPLAY_LED_RING_WAIT_TRUE}", "True"],
                    ["%{BKY_DISPLAY_LED_RING_WAIT_FALSE}", "False"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_RING_GO_UP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_led_ring_go_up_down",
        "message0": "%{BKY_DISPLAY_LED_RING_GO_DOWN_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "TIME",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "REPETITION",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "WAIT",
                "options": [
                    ["%{BKY_DISPLAY_LED_RING_WAIT_TRUE}", "True"],
                    ["%{BKY_DISPLAY_LED_RING_WAIT_FALSE}", "False"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_RING_GO_DOWN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "display_led_ring_set_led",
        "message0": "%{BKY_DISPLAY_LED_RING_SET_LED_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "LED",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_RING_SET_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    

]); // END JSON EXTRACT (Do not delete this comment.)

