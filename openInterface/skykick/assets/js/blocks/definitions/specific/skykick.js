/**
 * @fileoverview SkyKick Evo blocks (drone, LED, sound, sensors).
 */

Blockly.defineBlocksWithJsonArray([
    {
        "type": "skykick_takeoff",
        "message0": "%{BKY_SKYKICK_TAKEOFF_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_TAKEOFF_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_land",
        "message0": "%{BKY_SKYKICK_LAND_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_LAND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_stop",
        "message0": "%{BKY_SKYKICK_STOP_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_clear_bias",
        "message0": "%{BKY_SKYKICK_CLEAR_BIAS_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_CLEAR_BIAS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_clear_trim",
        "message0": "%{BKY_SKYKICK_CLEAR_TRIM_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_CLEAR_TRIM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_set_headless",
        "message0": "%{BKY_SKYKICK_SET_HEADLESS_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "TOGGLE",
                "options": [
                    ["%{BKY_SKYKICK_OPT_TOGGLE_ON}", "on"],
                    ["%{BKY_SKYKICK_OPT_TOGGLE_OFF}", "off"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_SET_HEADLESS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },


    {
        "type": "skykick_set_trim",
        "message0": "%{BKY_SKYKICK_SET_TRIM_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ROLL",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "PITCH",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_SET_TRIM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_trim_step",
        "message0": "%{BKY_SKYKICK_TRIM_STEP_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "VARIATION",
                "options": [
                    ["%{BKY_SKYKICK_OPT_VARIATION_PITCH_FORWARD}", "pitch_forward"],
                    ["%{BKY_SKYKICK_OPT_VARIATION_PITCH_BACKWARD}", "pitch_backward"],
                    ["%{BKY_SKYKICK_OPT_VARIATION_ROLL_RIGHT}", "roll_right"],
                    ["%{BKY_SKYKICK_OPT_VARIATION_ROLL_LEFT}", "roll_left"],
                    ["%{BKY_SKYKICK_OPT_VARIATION_RESET}", "reset"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_TRIM_STEP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_set_axis",
        "message0": "%{BKY_SKYKICK_SET_AXIS_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "QUAD",
                "options": [
                    ["%{BKY_SKYKICK_OPT_QUAD_0}", "0"],
                    ["%{BKY_SKYKICK_OPT_QUAD_1}", "1"],
                    ["%{BKY_SKYKICK_OPT_QUAD_2}", "2"],
                    ["%{BKY_SKYKICK_OPT_QUAD_3}", "3"]
                ]
            },
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_SET_AXIS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_move_axis",
        "message0": "%{BKY_SKYKICK_MOVE_AXIS_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "QUAD",
                "options": [
                    ["%{BKY_SKYKICK_OPT_QUAD_0}", "0"],
                    ["%{BKY_SKYKICK_OPT_QUAD_1}", "1"],
                    ["%{BKY_SKYKICK_OPT_QUAD_2}", "2"],
                    ["%{BKY_SKYKICK_OPT_QUAD_3}", "3"]
                ]
            },
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "DELAY",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_MOVE_AXIS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_set_quad",
        "message0": "%{BKY_SKYKICK_SET_QUAD_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ROLL",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "PITCH",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "YAW",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "THROTTLE",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_SET_QUAD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_move_quad",
        "message0": "%{BKY_SKYKICK_MOVE_QUAD_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ROLL",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "PITCH",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "YAW",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "THROTTLE",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "DELAY",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_MOVE_QUAD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_go",
        "message0": "%{BKY_SKYKICK_GO_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_SKYKICK_OPT_DIRECTION_FORWARD}", "forward"],
                    ["%{BKY_SKYKICK_OPT_DIRECTION_BACKWARD}", "backward"],
                    ["%{BKY_SKYKICK_OPT_DIRECTION_LEFT}", "left"],
                    ["%{BKY_SKYKICK_OPT_DIRECTION_RIGHT}", "right"],
                    ["%{BKY_SKYKICK_OPT_DIRECTION_UP}", "up"],
                    ["%{BKY_SKYKICK_OPT_DIRECTION_DOWN}", "down"]
                ]
            },
            {
                "type": "input_value",
                "name": "DISTANCE",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_GO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_turn",
        "message0": "%{BKY_SKYKICK_TURN_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTIONYAW",
                "options": [
                    ["%{BKY_SKYKICK_OPT_YAW_COUNTERCLOCKWISE}", "counterclockwise"],
                    ["%{BKY_SKYKICK_OPT_YAW_CLOCKWISE}", "clockwise"]
                ]
            },
            {
                "type": "input_value",
                "name": "DEGREEYAW",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "SPEEDYAW",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_TURN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_go_xyz",
        "message0": "%{BKY_SKYKICK_GO_XYZ_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTIONPITCH",
                "options": [
                    ["%{BKY_SKYKICK_OPT_PITCHDIR_PITCH_FORWARD}", "pitch_forward"],
                    ["%{BKY_SKYKICK_OPT_PITCHDIR_PITCH_BACKWARD}", "pitch_backward"]
                ]
            },
            {
                "type": "input_value",
                "name": "DISTANCEPITCH",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "DIRECTIONROLL",
                "options": [
                    ["%{BKY_SKYKICK_OPT_ROLLDIR_ROLL_LEFT}", "roll_left"],
                    ["%{BKY_SKYKICK_OPT_ROLLDIR_ROLL_RIGHT}", "roll_right"]
                ]
            },
            {
                "type": "input_value",
                "name": "DISTANCEROLL",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "DIRECTIONTHROTTLE",
                "options": [
                    ["%{BKY_SKYKICK_OPT_THROTTLEDIR_THROTTLE_UP}", "throttle_up"],
                    ["%{BKY_SKYKICK_OPT_THROTTLEDIR_THROTTLE_DOWN}", "throttle_down"]
                ]
            },
            {
                "type": "input_value",
                "name": "DISTANCETHROTTLE",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_GO_XYZ_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_go_xyz_turn",
        "message0": "%{BKY_SKYKICK_GO_XYZ_TURN_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTIONPITCH",
                "options": [
                    ["%{BKY_SKYKICK_OPT_PITCHDIR_PITCH_FORWARD}", "pitch_forward"],
                    ["%{BKY_SKYKICK_OPT_PITCHDIR_PITCH_BACKWARD}", "pitch_backward"]
                ]
            },
            {
                "type": "input_value",
                "name": "DISTANCEPITCH",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "DIRECTIONROLL",
                "options": [
                    ["%{BKY_SKYKICK_OPT_ROLLDIR_ROLL_LEFT}", "roll_left"],
                    ["%{BKY_SKYKICK_OPT_ROLLDIR_ROLL_RIGHT}", "roll_right"]
                ]
            },
            {
                "type": "input_value",
                "name": "DISTANCEROLL",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "DIRECTIONTHROTTLE",
                "options": [
                    ["%{BKY_SKYKICK_OPT_THROTTLEDIR_THROTTLE_UP}", "throttle_up"],
                    ["%{BKY_SKYKICK_OPT_THROTTLEDIR_THROTTLE_DOWN}", "throttle_down"]
                ]
            },
            {
                "type": "input_value",
                "name": "DISTANCETHROTTLE",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "DIRECTIONYAW",
                "options": [
                    ["%{BKY_SKYKICK_OPT_YAW_COUNTERCLOCKWISE}", "counterclockwise"],
                    ["%{BKY_SKYKICK_OPT_YAW_CLOCKWISE}", "clockwise"]
                ]
            },
            {
                "type": "input_value",
                "name": "DEGREEYAW",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "SPEEDYAW",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "drone_blocks",
        "tooltip": "%{BKY_SKYKICK_GO_XYZ_TURN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "skykick_led_off",
        "message0": "%{BKY_SKYKICK_LED_OFF_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_SKYKICK_LED_OFF_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "skykick_led_rgb",
        "message0": "%{BKY_SKYKICK_LED_RGB_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "R",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "G",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "B",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "MODE",
                "options": [
                    ["%{BKY_SKYKICK_OPT_MODE_34}", "34"],
                    ["%{BKY_SKYKICK_OPT_MODE_35}", "35"],
                    ["%{BKY_SKYKICK_OPT_MODE_36}", "36"],
                    ["%{BKY_SKYKICK_OPT_MODE_37}", "37"],
                    ["%{BKY_SKYKICK_OPT_MODE_41}", "41"]
                ]
            },
            {
                "type": "input_value",
                "name": "INTERVAL",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_SKYKICK_LED_RGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_led_color",
        "message0": "%{BKY_SKYKICK_LED_COLOR_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "COLOR",
                "options": [
                    ["%{BKY_SKYKICK_OPT_COLOR_FF0000}", "#ff0000"],
                    ["%{BKY_SKYKICK_OPT_COLOR_00FF00}", "#00ff00"],
                    ["%{BKY_SKYKICK_OPT_COLOR_0000FF}", "#0000ff"],
                    ["%{BKY_SKYKICK_OPT_COLOR_FFFF00}", "#ffff00"],
                    ["%{BKY_SKYKICK_OPT_COLOR_FF00FF}", "#ff00ff"],
                    ["%{BKY_SKYKICK_OPT_COLOR_00FFFF}", "#00ffff"],
                    ["%{BKY_SKYKICK_OPT_COLOR_FFFFFF}", "#ffffff"],
                    ["%{BKY_SKYKICK_OPT_COLOR_FF6400}", "#ff6400"],
                    ["%{BKY_SKYKICK_OPT_COLOR_14FA96}", "#14fa96"],
                    ["%{BKY_SKYKICK_OPT_COLOR_46FF00}", "#46ff00"],
                    ["%{BKY_SKYKICK_OPT_COLOR_963C14}", "#963c14"],
                    ["%{BKY_SKYKICK_OPT_COLOR_00FF1E}", "#00ff1e"],
                    ["%{BKY_SKYKICK_OPT_COLOR_5000C8}", "#5000c8"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "MODE",
                "options": [
                    ["%{BKY_SKYKICK_OPT_MODE_34}", "34"],
                    ["%{BKY_SKYKICK_OPT_MODE_35}", "35"],
                    ["%{BKY_SKYKICK_OPT_MODE_36}", "36"],
                    ["%{BKY_SKYKICK_OPT_MODE_37}", "37"],
                    ["%{BKY_SKYKICK_OPT_MODE_41}", "41"]
                ]
            },
            {
                "type": "input_value",
                "name": "INTERVAL",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_SKYKICK_LED_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_led_preset",
        "message0": "%{BKY_SKYKICK_LED_PRESET_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "COLOR",
                "options": [
                    ["%{BKY_SKYKICK_OPT_COLOR_FF0000}", "#ff0000"],
                    ["%{BKY_SKYKICK_OPT_COLOR_00FF00}", "#00ff00"],
                    ["%{BKY_SKYKICK_OPT_COLOR_0000FF}", "#0000ff"],
                    ["%{BKY_SKYKICK_OPT_COLOR_FFFF00}", "#ffff00"],
                    ["%{BKY_SKYKICK_OPT_COLOR_FF00FF}", "#ff00ff"],
                    ["%{BKY_SKYKICK_OPT_COLOR_00FFFF}", "#00ffff"],
                    ["%{BKY_SKYKICK_OPT_COLOR_FFFFFF}", "#ffffff"],
                    ["%{BKY_SKYKICK_OPT_COLOR_FF6400}", "#ff6400"],
                    ["%{BKY_SKYKICK_OPT_COLOR_14FA96}", "#14fa96"],
                    ["%{BKY_SKYKICK_OPT_COLOR_46FF00}", "#46ff00"],
                    ["%{BKY_SKYKICK_OPT_COLOR_963C14}", "#963c14"],
                    ["%{BKY_SKYKICK_OPT_COLOR_00FF1E}", "#00ff1e"],
                    ["%{BKY_SKYKICK_OPT_COLOR_5000C8}", "#5000c8"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "BRIGHTNESS",
                "options": [
                    ["%{BKY_SKYKICK_OPT_BRIGHTNESS_220}", "220"],
                    ["%{BKY_SKYKICK_OPT_BRIGHTNESS_0}", "0"],
                    ["%{BKY_SKYKICK_OPT_BRIGHTNESS_75}", "75"],
                    ["%{BKY_SKYKICK_OPT_BRIGHTNESS_125}", "125"],
                    ["%{BKY_SKYKICK_OPT_BRIGHTNESS_200}", "200"],
                    ["%{BKY_SKYKICK_OPT_BRIGHTNESS_255}", "255"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_SKYKICK_LED_PRESET_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_buzzer_stop",
        "message0": "%{BKY_SKYKICK_BUZZER_STOP_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "sound_blocks",
        "tooltip": "%{BKY_SKYKICK_BUZZER_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_play_note",
        "message0": "%{BKY_SKYKICK_PLAY_NOTE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "OCTAVE",
                "options": [
                    ["1", "1"],
                    ["2", "2"],
                    ["3", "3"],
                    ["4", "4"],
                    ["5", "5"],
                    ["6", "6"],
                    ["7", "7"],
                    ["8", "8"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "NOTE",
                "options": [
                    ["%{BKY_SKYKICK_OPT_NOTE_MUTE}", "mute"],
                    ["%{BKY_SKYKICK_OPT_NOTE_C}", "C"],
                    ["%{BKY_SKYKICK_OPT_NOTE_CS}", "CS"],
                    ["%{BKY_SKYKICK_OPT_NOTE_D}", "D"],
                    ["%{BKY_SKYKICK_OPT_NOTE_DS}", "DS"],
                    ["%{BKY_SKYKICK_OPT_NOTE_E}", "E"],
                    ["%{BKY_SKYKICK_OPT_NOTE_F}", "F"],
                    ["%{BKY_SKYKICK_OPT_NOTE_FS}", "FS"],
                    ["%{BKY_SKYKICK_OPT_NOTE_G}", "G"],
                    ["%{BKY_SKYKICK_OPT_NOTE_GS}", "GS"],
                    ["%{BKY_SKYKICK_OPT_NOTE_A}", "A"],
                    ["%{BKY_SKYKICK_OPT_NOTE_AS}", "AS"],
                    ["%{BKY_SKYKICK_OPT_NOTE_B}", "B"]
                ]
            },
            {
                "type": "input_value",
                "name": "DELAY",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "sound_blocks",
        "tooltip": "%{BKY_SKYKICK_PLAY_NOTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_play_hz",
        "message0": "%{BKY_SKYKICK_PLAY_HZ_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "HERTZ",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "DELAY",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "sound_blocks",
        "tooltip": "%{BKY_SKYKICK_PLAY_HZ_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_attitude",
        "message0": "%{BKY_SKYKICK_ATTITUDE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "ATTITUDE",
                "options": [
                    ["%{BKY_SKYKICK_OPT_ATTITUDE_ANGLEROLL}", "angleRoll"],
                    ["%{BKY_SKYKICK_OPT_ATTITUDE_ANGLEPITCH}", "anglePitch"],
                    ["%{BKY_SKYKICK_OPT_ATTITUDE_ANGLEYAW}", "angleYaw"]
                ]
            }
        ],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SKYKICK_ATTITUDE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_sensor",
        "message0": "%{BKY_SKYKICK_SENSOR_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SENSOR",
                "options": [
                    ["%{BKY_SKYKICK_OPT_SENSOR_ACCX}", "accX"],
                    ["%{BKY_SKYKICK_OPT_SENSOR_ACCY}", "accY"],
                    ["%{BKY_SKYKICK_OPT_SENSOR_ACCZ}", "accZ"],
                    ["%{BKY_SKYKICK_OPT_SENSOR_GYROROLL}", "gyroRoll"],
                    ["%{BKY_SKYKICK_OPT_SENSOR_GYROPITCH}", "gyroPitch"],
                    ["%{BKY_SKYKICK_OPT_SENSOR_GYROYAW}", "gyroYaw"],
                    ["%{BKY_SKYKICK_OPT_SENSOR_ANGLEROLL}", "angleRoll"],
                    ["%{BKY_SKYKICK_OPT_SENSOR_ANGLEPITCH}", "anglePitch"],
                    ["%{BKY_SKYKICK_OPT_SENSOR_ANGLEYAW}", "angleYaw"],
                    ["%{BKY_SKYKICK_OPT_SENSOR_TEMPERATURE}", "temperature"],
                    ["%{BKY_SKYKICK_OPT_SENSOR_PRESSURE}", "pressure"],
                    ["%{BKY_SKYKICK_OPT_SENSOR_ALTITUDE}", "altitude"]
                ]
            }
        ],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SKYKICK_SENSOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_height",
        "message0": "%{BKY_SKYKICK_HEIGHT_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SENSOR",
                "options": [
                    ["%{BKY_SKYKICK_OPT_HEIGHT_RANGEHEIGHT}", "rangeHeight"],
                    ["%{BKY_SKYKICK_OPT_HEIGHT_ALTITUDE}", "altitude"]
                ]
            }
        ],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SKYKICK_HEIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_position",
        "message0": "%{BKY_SKYKICK_POSITION_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "POSITION",
                "options": [
                    ["x", "x"],
                    ["y", "y"],
                    ["z", "z"]
                ]
            }
        ],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SKYKICK_POSITION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "skykick_state",
        "message0": "%{BKY_SKYKICK_STATE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "VALUE",
                "options": [
                    ["%{BKY_SKYKICK_OPT_STATE_MODEFLIGHT}", "modeFlight"],
                    ["%{BKY_SKYKICK_OPT_STATE_MODEMOVEMENT}", "modeMovement"],
                    ["%{BKY_SKYKICK_OPT_STATE_HEADLESS}", "headless"],
                    ["%{BKY_SKYKICK_OPT_STATE_PITCH}", "pitch"],
                    ["%{BKY_SKYKICK_OPT_STATE_ROLL}", "roll"],
                    ["%{BKY_SKYKICK_OPT_STATE_SENSORORIENTATION}", "sensorOrientation"],
                    ["%{BKY_SKYKICK_OPT_STATE_BATTERY}", "battery"]
                ]
            }
        ],
        "output": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SKYKICK_STATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]);
