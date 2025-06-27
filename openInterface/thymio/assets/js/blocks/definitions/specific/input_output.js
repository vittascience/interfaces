/**
 * @fileoverview Input/Output blocks for Thymio.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /*Begin ESP32 blocks*/

    // BLOCK PAUSE
    {
        "type": "io_pause",
        "message0": "%{BKY_IO_WAIT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_IO_WAIT_SECOND}", "SEC"],
                ["%{BKY_IO_WAIT_MILLISECOND}", "MILLI"],
                ["%{BKY_IO_WAIT_MICROSECOND}", "MICRO"],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_WAIT_TOOLTIP}",
    },

    // BLOCK WAIT UNTIL JSON
    {
        "type": "io_waitUntil",
        "message0": "%{BKY_IO_WAIT_UNTIL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "UNTIL",
            "check": "Boolean"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_WAIT_UNTIL_TOOLTIP}",
    },

    // BLOCK INIT CHRONOMETER
    {
        "type": "io_initChronometer",
        "message0": "%{BKY_IO_INITCHRONOMETER_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_INITCHRONOMETER_TOOLTIP}",
    },

    // BLOCK GET CHRONOMETER
    {
        "type": "io_getChronometer",
        "message0": "%{BKY_IO_GETCHRONOMETER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(s)", "SEC"],
                ["(ms)", "MILLI"],
                ["(µ)", "MICRO"]
            ]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETCHRONOMETER_TOOLTIP}",
    },

    // Bloc du bouton du robot
    // {
    //     "type": "io_button",
    //     "message0": "%{BKY_IO_BUTTON_STATE_TITLE}",
    //     "args0": [{
    //         "type": "field_dropdown",
    //         "name": "STATE",
    //         "options": [
    //             ["%{BKY_IO_BUTTON_STATE_PRESSED}","True"],
    //             ["%{BKY_IO_BUTTON_STATE_NOT_PRESSED}","False"]
    //         ]
    //     }],
    //     "output": "Boolean",
    //     "extensions": [
    //         "block_init_helpurl",
    //         "block_init_color"
    //     ],
    //     "tooltip": "%{BKY_IO_BUTTON_STATE_TOOLTIP}",
    // },

    // thymio blocks
    // io_isButtonPressed
    {
        "type": "io_isButtonPressed",
        "message0": "%{BKY_IO_IS_BUTTON_PRESSED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["%{BKY_IO_BUTTON_CENTER}", "button_center"],
                ["%{BKY_IO_BUTTON_FORWARD}", "button_forward"],
                ["%{BKY_IO_BUTTON_BACKWARD}", "button_backward"],
                ["%{BKY_IO_BUTTON_LEFT}", "button_left"],
                ["%{BKY_IO_BUTTON_RIGHT}", "button_right"]
            ]
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_IS_BUTTON_PRESSED_TOOLTIP}",
    },
    // io_onButtonPressed
    {
        "type": "io_onButtonPressed",
        "message0": "%{BKY_IO_ON_BUTTON_PRESSED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["%{BKY_IO_BUTTON_CENTER}", "button_center"],
                ["%{BKY_IO_BUTTON_FORWARD}", "button_forward"],
                ["%{BKY_IO_BUTTON_BACKWARD}", "button_backward"],
                ["%{BKY_IO_BUTTON_LEFT}", "button_left"],
                ["%{BKY_IO_BUTTON_RIGHT}", "button_right"]
            ]
        },
        {
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_IS_PRESSED}", "1"],
                ["%{BKY_IO_IS_RELEASED}", "0"]
            ]
        }
        ],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "io_blocks",
        "tooltip": "%{BKY_IO_ON_BUTTON_PRESSED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "io_onButtonPressed_event",
        "message0": "%{BKY_IO_ON_BUTTON_PRESSED_EVENT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["%{BKY_IO_BUTTON_CENTER}", "button_center"],
                ["%{BKY_IO_BUTTON_FORWARD}", "button_forward"],
                ["%{BKY_IO_BUTTON_BACKWARD}", "button_backward"],
                ["%{BKY_IO_BUTTON_LEFT}", "button_left"],
                ["%{BKY_IO_BUTTON_RIGHT}", "button_right"]
            ]
        },
        ],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "tooltip": "%{BKY_IO_ON_BUTTON_PRESSED_EVENT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    // timer event
    {
        "type": "io_onTimer_event",
        "message0": "%{BKY_IO_ON_TIMER_EVENT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TIMER",
            "options": [
                ["%{BKY_IO_TIMER_MS_1}", "0"],
                ["%{BKY_IO_TIMER_MS_2}", "1"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "tooltip": "%{BKY_IO_ON_TIMER_EVENT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    // proximity event
    {
        "type": "io_onProximity_event",
        "message0": "%{BKY_IO_ON_PROXIMITY_EVENT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PROXIMITY",
            "options": [
                ["%{BKY_SENSORS_GET_PROXIMITY_FRONT_LEFT}", "0"],
                ["%{BKY_SENSORS_GET_PROXIMITY_FRONT_LEFT_CENTRAL}", "1"],
                ["%{BKY_SENSORS_GET_PROXIMITY_FRONT_CENTRAL}", "2"],
                ["%{BKY_SENSORS_GET_PROXIMITY_FRONT_RIGHT_CENTRAL}", "3"],
                ["%{BKY_SENSORS_GET_PROXIMITY_FRONT_RIGHT}", "4"],
                ["%{BKY_SENSORS_GET_PROXIMITY_BACK_LEFT}", "5"],
                ["%{BKY_SENSORS_GET_PROXIMITY_BACK_RIGHT}", "6"],
            ]
        },
        {
            "type": "field_grid_dropdown",
            "name": "OPERATOR",
            "options": [
                ["%{BKY_SENSORS_GET_PROXIMITY_DETECT_TRUE}", "> 2000"],
                ["%{BKY_SENSORS_GET_PROXIMITY_DETECT_FALSE}", "< 1000"],
            ]
        }
        ],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "tooltip": "%{BKY_IO_ON_PROXIMITY_EVENT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    // prox line event
    {
        "type": "io_onProximityLine_event",
        "message0": "%{BKY_IO_ON_PROXIMITY_LINE_EVENT_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_SENSORS_GET_LINE_LEFT}", "0"],
                    ["%{BKY_SENSORS_GET_LINE_RIGHT}", "1"],
                    ["%{BKY_SENSORS_GET_LINE_BOTH}", "2"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "VALUE",
                "options": [
                    ["%{BKY_SENSORS_GET_LINE_BLACK}", "black"],
                    ["%{BKY_SENSORS_GET_LINE_WHITE}", "white"],
                    ["%{BKY_SENSORS_GET_LINE_SOMETHING}", "something"],
                    ["%{BKY_SENSORS_GET_LINE_NOTHING}", "nothing"],

                ]
            }
        ],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_ON_PROXIMITY_LINE_EVENT_TOOLTIP}",
    },


    //timer ms
    {
        "type": "io_timer_ms",
        "message0": "%{BKY_IO_TIMER_MS_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "TIMER",
                "options": [
                    ["%{BKY_IO_TIMER_MS_1}", "0"],
                    ["%{BKY_IO_TIMER_MS_2}", "1"]
                ]
            },
            {
                "type": "input_value",
                "name": "TIME",
                "value": 1000,
            }
        ],
        // "output": "Number",
        "previousStatement": null,
        "nextStatement": null,
        "style": "io_blocks",
        "tooltip": "%{BKY_IO_TIMER_MS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "io_onTap_event",
        "message0": "%{BKY_IO_ON_TAP_EVENT_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_ON_TAP_EVENT_TOOLTIP}",
    },
    {
        "type": "io_communication_event",
        "message0": "%{BKY_IO_ON_COM_EVENT_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "COM",
                "options": [
                    ["%{BKY_IO_ON_COM_RC5}", "rc5"],
                    ["%{BKY_IO_ON_COM_IR}", "prox_com"],
                ]
            },
        ],

        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_ON_COM_EVENT_TOOLTIP}",
    },
    {
        "type": "io_event_basic",
        "message0": "%{BKY_IO_ON_EVENT_BASIC_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "EVENT",
                "options": [
                    ["%{BKY_IO_ON_EVENT_BASIC_BUTTONS}", "buttons"],
                    ["%{BKY_IO_ON_EVENT_BASIC_PROXIMITY}", "prox"],
                    ["%{BKY_IO_ON_EVENT_BASIC_TEMPERATURE}", "temperature"],
                    ["%{BKY_IO_ON_EVENT_BASIC_ACC}", "acc"],
                    ["%{BKY_IO_ON_EVENT_BASIC_MOTORS}", "motor"],
                ]
            },
        ],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_ON_EVENT_BASIC_TOOLTIP}",
    },
    // sounds
    {
        "type": "io_sound_mic_threshold",
        "message0": "%{BKY_IO_SOUND_MIC_THRESHOLD_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "THRESHOLD",
                "check": 'Number',
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "io_blocks",
        "tooltip": "%{BKY_IO_SOUND_MIC_THRESHOLD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "io_event_microphone",
        "message0": "%{BKY_IO_EVENT_MICROPHONE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "EVENT",
                "options": [
                    ["%{BKY_IO_EVENT_MICROPHONE_THRESHOLD}", "mic"],
                    ["%{BKY_IO_EVENT_MICROPHONE_SOUND_FINISHED}", "sound_finished"],
                ]
            },
        ],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "io_blocks",
        "tooltip": "%{BKY_IO_EVENT_MICROPHONE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    }
]); // END JSON EXTRACT (Do not delete this comment.)