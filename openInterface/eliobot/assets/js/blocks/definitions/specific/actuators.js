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
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ROBOT_ROTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // Bloc permettant une rotation du robot
    {
        "type": "robot_rotate_forever",
        "message0": "%{BKY_ROBOT_ROTATE_FOREVER_TITLE}",
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
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ROBOT_ROTATE_FOREVER_TOOLTIP}",
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
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
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
        "type": "robot_spinOneWheel",
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
                    ["%{BKY_ROBOT_MOVE_FORWARD}", "forward"],
                    ["%{BKY_ROBOT_MOVE_BACKWARD}", "backward"]
                ]
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
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
        "type": "robot_moveOneStep",
        "message0": "%{BKY_ROBOT_MOVE_ONE_STEP_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "STEP",
                "check": "Number",
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
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
                    ["Do", "do"],
                    ["Re", "re"],
                    ["Mi", "mi"],
                    ["Fa", "fa"],
                    ["Sol", "sol"],
                    ["La", "la"],
                    ["Si", "si"],
                    ["Do", "do2"]
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