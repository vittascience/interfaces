/**
 * @fileoverview Actuators blocks for Eliobot.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    {
        "type": "robot_move",
        "message0": "%{BKY_ROBOT_MOVE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_ROBOT_MOVE_FORWARD}", "forward"],
                    ["%{BKY_ROBOT_MOVE_BACKWARD}", "backward"]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ROBOT_MOVE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "robot_rotate",
        "message0": "%{BKY_ROBOT_ROTATE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_ROBOT_ROTATE_RIGHT}", "right"],
                    ["%{BKY_ROBOT_ROTATE_LEFT}", "left"]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ROBOT_ROTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // Bloc permettant l'arrêt du robot
    {
        "type": "robot_stop",
        "message0": "%{BKY_ROBOT_STOP_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ROBOT_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // set the speed of the motors
    {
        "type": "robot_setSpeed",
        "message0": "%{BKY_ROBOT_SET_SPEED_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ROBOT_SET_SPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // choose the degree of rotation of the robot
    {
        "type": "robot_rotate_degrees",
        "message0": "%{BKY_ROBOT_ROTATE_DEGREES_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_ROBOT_ROTATE_RIGHT}", "right"],
                    ["%{BKY_ROBOT_ROTATE_LEFT}", "left"]
                ]
            },
            {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number",
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ROBOT_ROTATE_DEGREES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // spin one wheel of the robot
    {
        "type": "robot_spin_one_wheel",
        "message0": "%{BKY_ROBOT_SPIN_ONE_WHEEL_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "WHEEL",
                "options": [
                    ["%{BKY_ROBOT_ROTATE_LEFT}", "left"],
                    ["%{BKY_ROBOT_ROTATE_RIGHT}", "right"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["↻", "forward"],
                    ["↺", "backward"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ROBOT_SPIN_ONE_WHEEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // move the robot x step
    {
        "type": "robot_move_one_step",
        "message0": "%{BKY_ROBOT_MOVE_ONE_STEP_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_ROBOT_MOVE_FORWARD}", "forward"],
                    ["%{BKY_ROBOT_MOVE_BACKWARD}", "backward"]
                ]
            },
            {
                "type": "input_value",
                "name": "STEP",
                "check": "Number",
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ROBOT_MOVE_ONE_STEP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "robot_turn90",
        "message0": "%{BKY_ROBOT_TURN_90_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_ROBOT_TURN_RIGHT}", "right"],
                    ["%{BKY_ROBOT_TURN_LEFT}", "left"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ROBOT_TURN_90_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/movements#tourner-a-droite-ou-a-gauche"
    },
    {
        "type": "robot_set_square_size",
        "message0": "%{BKY_ROBOT_SET_SQUARE_SIZE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "SIZE",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ROBOT_SET_SQUARE_SIZE_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/movements"
    },
    {
        "type": "robot_waiting",
        "message0": "%{BKY_ROBOT_WAITING_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "TIME",
                "check": "Number"
            },
            {
                "type":
                    "field_dropdown",
                "name": "UNIT",
                "options": [
                    ["%{BKY_ROBOT_UNIT_SECONDS}", "s"],
                    ["%{BKY_ROBOT_UNIT_MILLISECONDS}", "ms"]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ROBOT_WAITING_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/movements#arr%C3%AAter-les-moteurs"
    },
    // Block that let you choose a frequency
    {
        "type": "actuators_frequency",
        "message0": "%{BKY_ACTUATORS_FREQUENCY_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "FREQUENCY",
                "check": "Number",
            },
            {
                "type": "input_value",
                "name": "TIME",
                "check": "Number",
            },
            {
                "type": "field_dropdown",
                "name": "UNIT",
                "options": [
                    ["%{BKY_IO_WAIT_SECOND}", "s"],
                    ["%{BKY_IO_WAIT_MILLISECOND}", "ms"]
                ]
            }
        ],
        "style": "actuators_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_FREQUENCY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // Block that let you choose a music
    {
        "type": "actuators_playmusic",
        "message0": "%{BKY_ACTUATORS_PLAY_MUSIC_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "MUSIC",
                "options": [
                    ["Totally Spies", "totallyspies"],
                    ["StarWars", "starwars"],
                    ["Pirates Des Caraïbes", "piratesdescaraibes"],
                    ["Panthère Rose", "pinkpanthere"],
                    ["Les Simpsons", "simpsons"],
                    ["Police", "police"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_PLAY_MUSIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]

    },
    // Block that let you choose a note
    {
        "type": "actuators_playnote",
        "message0": "%{BKY_ACTUATORS_PLAY_NOTE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NOTE",
                "options": [
                    ["Do", "261.63"],
                    ["Re", "293.66"],
                    ["Mi", "329.63"],
                    ["Fa", "349.23"],
                    ["Sol", "392.00"],
                    ["La", "440.00"],
                    ["Si", "493.88"],
                    ["Do", "523.25"]
                ]
            },
            {
                "type": "input_value",
                "name": "TIME",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "UNIT",
                "options": [
                    ["%{BKY_IO_WAIT_SECOND}", "s"],
                    ["%{BKY_IO_WAIT_MILLISECOND}", "ms"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_PLAY_NOTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_play_sound",
        "message0": "%{BKY_ACTUATORS_PLAY_SOUND_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SOUND",
                "options": [
                    ["%{BKY_ACTUATORS_SOUND_JUMP}", "sound_jump"],
                    ["%{BKY_ACTUATORS_SOUND_LASER}", "sound_laser"],
                    ["%{BKY_ACTUATORS_SOUND_QUESTION}", "sound_question"],
                    ["%{BKY_ACTUATORS_SOUND_ERROR}", "sound_error"],
                    ["%{BKY_ACTUATORS_SOUND_EXPLOSION}", "sound_explosion"],
                    ["%{BKY_ACTUATORS_SOUND_LAND}", "sound_land"],
                    ["%{BKY_ACTUATORS_SOUND_HAPPY}", "sound_happy"],
                    ["%{BKY_ACTUATORS_SOUND_WIN}", "sound_win"],
                    ["%{BKY_ACTUATORS_SOUND_ALERT}", "sound_alert"],
                    ["%{BKY_ACTUATORS_SOUND_HELLO}", "sound_hello"],
                    ["%{BKY_ACTUATORS_SOUND_STARTUP}", "sound_startup"],
                    ["%{BKY_ACTUATORS_SOUND_BUMP}", "sound_bump"],
                    ["%{BKY_ACTUATORS_SOUND_BLINK}", "sound_blink"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_PLAY_SOUND_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/sounds"
    },
    // Block that let you adjust the volume
    {
        "type": "actuators_setvolume",
        "message0": "%{BKY_ACTUATORS_SET_VOLUME_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "VOLUME",
                "check": "Number",
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_SET_VOLUME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)