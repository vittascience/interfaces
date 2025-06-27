/**
 * @fileoverview Actuators blocks for Esp32.
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
                    ["%{BKY_ROBOT_MOVE_FORWARD}","FORWARD"],
                    ["%{BKY_ROBOT_MOVE_BACKWARD}","BACKWARD"]
                ]
            },
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "Number"
            },
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
        "type": "robot_rotate_clock",
        "message0": "%{BKY_ROBOT_ROTATE_CLOCK_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_ROBOT_MOVE_CLOCK_WISE}","CLOCKWISE"],
                    ["%{BKY_ROBOT_MOVE_COUNTER_CLOCK_WISE}","COUNTER_CLOCKWISE"]
                ]
            },
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "Number"
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ROBOT_ROTATE_CLOCK_TOOLTIP}",
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
                    ["%{BKY_ROBOT_ROTATE_FRONT_RIGHT}","FRONT_RIGHT"],
                    ["%{BKY_ROBOT_ROTATE_FRONT_LEFT}", "FRONT_LEFT"],
                    ["%{BKY_ROBOT_ROTATE_BACK_RIGHT}", "BACK_RIGHT"],
                    ["%{BKY_ROBOT_ROTATE_BACK_LEFT}", "BACK_LEFT"],
                ]
            },
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "Number"
            },
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
    // stop simgle motor
    {
        "type": "robot_stop_single_motor",
        "message0": "%{BKY_ROBOT_STOP_SINGLE_MOTOR_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "MOTOR",
                "options": [
                    ["%{BKY_ROBOT_STOP_SINGLE_MOTOR_LEFT}","LEFT"],
                    ["%{BKY_ROBOT_STOP_SINGLE_MOTOR_RIGHT}","RIGHT"]
                ]
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ROBOT_STOP_SINGLE_MOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Set the speed of a single motor
    {
        "type": "robot_change_single_motor_speed",
        "message0": "%{BKY_ROBOT_CHANGE_SINGLE_MOTOR_SPEED_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "MOTOR",
                "options": [
                    ["%{BKY_ROBOT_CHANGE_SINGLE_MOTOR_SPEED_LEFT}","LEFT"],
                    ["%{BKY_ROBOT_CHANGE_SINGLE_MOTOR_SPEED_RIGHT}","RIGHT"]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "DIR",
                "options": [
                    ["↻", "clockwise"],
                    ["↺", "counter_clockwise"]
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
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ROBOT_CHANGE_SINGLE_MOTOR_SPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

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

    // Actuators blocks
    {
        "type": "sound_stop_sound_system",
        "message0": "%{BKY_SOUND_STOP_SOUND_SYSTEM_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_SOUND_STOP_SOUND_SYSTEM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sound_play_sound",
        "message0": "%{BKY_SOUND_PLAY_SOUND_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SOUND",
                "options": [
                    ["%{BKY_SOUND_PLAY_SOUND_SOUND_1}","0"],
                    ["%{BKY_SOUND_PLAY_SOUND_SOUND_2}","1"],
                    ["%{BKY_SOUND_PLAY_SOUND_SOUND_3}","2"],
                    ["%{BKY_SOUND_PLAY_SOUND_SOUND_4}","3"],
                    ["%{BKY_SOUND_PLAY_SOUND_SOUND_5}","4"],
                    ["%{BKY_SOUND_PLAY_SOUND_SOUND_6}","5"],
                    ["%{BKY_SOUND_PLAY_SOUND_SOUND_7}","6"],
                    ["%{BKY_SOUND_PLAY_SOUND_SOUND_8}","7"]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_SOUND_PLAY_SOUND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sound_play_sound_freq",
        "message0": "%{BKY_SOUND_PLAY_SOUND_FREQ_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "FREQ",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_SOUND_PLAY_SOUND_FREQ_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    
]); // END JSON EXTRACT (Do not delete this comment.)