/**
 * @fileoverview Robots blocks for BBC micro:bit.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Begin Maqueen blocks */

    // BLOCK MAQUEEN ULTRASONIC RANGER
    {
        "type": "robots_getMaqueenUltrasonicRanger",
        "message0": "%{BKY_ROBOTS_MAQUEEN_ULTRASONICRANGER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_ULTRASONIC_DISTANCE}", "distance"],
                ["%{BKY_ROBOTS_MAQUEEN_ULTRASONIC_DURATION}", "duration"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_ULTRASONICRANGER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN READ LINE FINDER
    {
        "type": "robots_readMaqueenPatrol",
        "message0": "%{BKY_ROBOTS_MAQUEEN_READPATROL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT}", "pin14"],
                ["%{BKY_ROBOTS_MAQUEEN_LEFT}", "pin13"]
            ]
        }],
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_READPATROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN CONTROL LED
    {
        "type": "robots_controlMaqueenLed",
        "message0": "%{BKY_ROBOTS_MAQUEEN_CONTROLLED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT}", "1"],
                ["%{BKY_ROBOTS_MAQUEEN_LEFT}", "0"]
            ]
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_CONTROLLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN CONTROL GO
    {
        "type": "robots_setMaqueenGo",
        "message0": "%{BKY_ROBOTS_MAQUEEN_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_GO_FORWARD}", "0x0"],
                ["%{BKY_ROBOTS_MAQUEEN_GO_REVERSE}", "0x1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_GO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN ROTATE
    {
        "type": "robots_rotateMaqueen",
        "message0": "%{BKY_ROBOTS_MAQUEEN_ROTATE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "right"],
                ["↺", "left"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_ROTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN CONTROL MOTOR
    {
        "type": "robots_controlMaqueenMotor",
        "message0": "%{BKY_ROBOTS_MAQUEEN_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT}", "0x02"],
                ["%{BKY_ROBOTS_MAQUEEN_LEFT}", "0x00"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "0x0"],
                ["↺", "0x1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_CONTROLMOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN STOP MOTORS
    {
        "type": "robots_stopMaqueenMotors",
        "message0": "%{BKY_ROBOTS_MAQUEEN_STOPMOTORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT}", "0x02"],
                ["%{BKY_ROBOTS_MAQUEEN_LEFT}", "0x00"],
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT&LEFT}", "both"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_STOPMOTORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN SET SERVO ANGLE
    {
        "type": "robots_setMaqueenServoAngle",
        "message0": "%{BKY_ROBOTS_MAQUEEN_SETSERVOANGLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SERVO",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_S1}", "0x14"],
                ["%{BKY_ROBOTS_MAQUEEN_S2}", "0x15"],
                ["%{BKY_ROBOTS_MAQUEEN_SERVO_BOTH}", "both"]
            ]
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_SETSERVOANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN MOVE ONE SQUARE FORWARD
    {
        "type": "robots_moveOneSquareForward",
        "message0": "%{BKY_ROBOTS_MAQUEEN_MOVE_ONE_SQUARE_FORWARD_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_MOVE_ONE_SQUARE_FORWARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN MOVE ONE SQUARE BACKWARD
    {
        "type": "robots_moveOneSquareBackward",
        "message0": "%{BKY_ROBOTS_MAQUEEN_MOVE_ONE_SQUARE_BACKWARD_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_MOVE_ONE_SQUARE_BACKWARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN TURN LEFT
    {
        "type": "robots_turnLeft",
        "message0": "%{BKY_ROBOTS_MAQUEEN_TURN_LEFT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_TURN_LEFT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN TURN RIGHT
    {
        "type": "robots_turnRight",
        "message0": "%{BKY_ROBOTS_MAQUEEN_TURN_RIGHT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_TURN_RIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN STOP ROBOT
    {
        "type": "robots_stopRobot",
        "message0": "%{BKY_ROBOTS_MAQUEEN_STOP_ROBOT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_STOP_ROBOT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN BLINK ROBOT
    {
        "type": "robots_blinkRobot",
        "message0": "%{BKY_ROBOTS_MAQUEEN_BLINK_ROBOT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_BLINK_ROBOT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN SET NEOPIXEL
    {
        "type": "robots_setMaqueenNeopixel",
        "message0": "%{BKY_ROBOTS_MAQUEEN_SETNEOPIXEL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["les 4 LED", "all"]
            ]
        }, {
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_SETNEOPIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN SET NEOPIXEL PALETTE
    {
        "type": "robots_setMaqueenNeopixelPalette",
        "message0": "%{BKY_ROBOTS_MAQUEEN_SETPALETTECOLOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["les 4 LED", "all"]
            ]
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_SETPALETTECOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN RAINBOW
    {
        "type": "robots_setMaqueenRainbow",
        "message0": "%{BKY_ROBOTS_MAQUEEN_SETRAINBOW_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_SETRAINBOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN SET BUZZER
    {
        "type": "robots_setMaqueenBuzzer",
        "message0": "%{BKY_ROBOTS_MAQUEEN_SETBUZZER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_SETBUZZER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN PLAY MUSIC
    {
        "type": "robots_playMaqueenMusic",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLAYMUSIC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MUSIC",
            "options": [
                ["Gamme", "GAMME"],
                ["Star Wars", "SW"],
                ["R2D2", "R2D2"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLAYMUSIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN ON REMOTE CONTROL COMMAND RECEIVED
    {
        "type": "robots_maqueen_onRemoteCommandReceived",
        "message0": "[Maqueen] %{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
        "args0": [{
            "type": "input_dummy",
            "name": "IF0"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO0"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_BLACK_NEC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_onRemoteCommandReceived_init"
        ],
        "mutator": "robots_onRemoteCommandReceived_mutator",
    },

    // BLOCK MAQUEEN ON REMOTE CONTROL COMMAND RECEIVED - C AR MP3 GRAY REMOTE
    {
        "type": "robots_maqueen_onRemoteCommandReceived_car_mp3_gray",
        "message0": "[Maqueen] %{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
        "args0": [{
            "type": "input_dummy",
            "name": "IF0"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO0"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_CAR_MP3_GRAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_onRemoteCommandReceived_init"
        ],
        "mutator": "robots_onRemoteCommandReceived_mutator",
    },

    // BLOCK MAQUEEN DECODE IR RECEIVER
    {
        "type": "robots_decodeMaqueenIRreceiver",
        "message0": "%{BKY_ROBOTS_MAQUEEN_DECODEIRRECEIVER_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_DECODEIRRECEIVER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN GET IR CODE
    {
        "type": "robots_getMaqueenIRcode",
        "message0": "%{BKY_ROBOTS_MAQUEEN_GETIRCODE_TITLE}",
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_GETIRCODE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin MaqueenPlus blocks */

    // BLOCK MAQUEEN_PLUS ULTRASONIC RANGER
    {
        "type": "robots_getMaqueenPlusV2UltrasonicRanger",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_V2_ULTRASONICRANGER_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "DATA",
                "options": [
                    ["%{BKY_ROBOTS_MAQUEEN_ULTRASONIC_DISTANCE}", "distance"],
                    ["%{BKY_ROBOTS_MAQUEEN_ULTRASONIC_DURATION}", "duration"]
                ]
            }
        ],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_V2_ULTRASONICRANGER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS ULTRASONIC RANGER TRIG ECHO
    {
        "type": "robots_getMaqueenPlusUltrasonicRangerTrigEcho",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_ULTRASONICRANGER_TRIG_ECHO_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "VERSION",
                "options": [
                    ["v2", "2"],
                    ["v1", "1"]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "DATA",
                "options": [
                    ["%{BKY_ROBOTS_MAQUEEN_ULTRASONIC_DISTANCE}", "distance"],
                    ["%{BKY_ROBOTS_MAQUEEN_ULTRASONIC_DURATION}", "duration"]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "TRIG",
                "options": Blockly.Constants.Pins.MICROBIT_MAQUEEN_PLUS_PINS
            },
            {
                "type": "field_grid_dropdown",
                "name": "ECHO",
                "options": Blockly.Constants.Pins.MICROBIT_MAQUEEN_PLUS_PINS
            }
        ],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_ULTRASONICRANGER_TRIG_ECHO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS V1 READ LINE FINDER
    {
        "type": "robots_readMaqueenPlusv1Patrol",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_V1_READPATROL_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "SIDE",
                "options": [
                    ["%{BKY_ROBOTS_MAQUEEN_PLUS_LEFT_REAR}", "L3"],
                    ["%{BKY_ROBOTS_MAQUEEN_PLUS_LEFT}", "L2"],
                    ["%{BKY_ROBOTS_MAQUEEN_PLUS_MIDDLE_LEFT}", "L1"],
                    ["%{BKY_ROBOTS_MAQUEEN_PLUS_MIDDLE_RIGHT}", "R3"],
                    ["%{BKY_ROBOTS_MAQUEEN_PLUS_RIGHT}", "R2"],
                    ["%{BKY_ROBOTS_MAQUEEN_PLUS_RIGHT_REAR}", "R1"]
                ]
            }
        ],
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_V1_READPATROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS V2 READ LINE FINDER
    {
        "type": "robots_readMaqueenPlusv2Patrol",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_V2_READPATROL_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "SIDE",
                "options": [
                    ["%{BKY_ROBOTS_MAQUEEN_PLUS_LEFT_REAR}", "0"],
                    ["%{BKY_ROBOTS_MAQUEEN_PLUS_LEFT}", "1"],
                    ["%{BKY_ROBOTS_MAQUEEN_PLUS_MIDDLE}", "2"],
                    ["%{BKY_ROBOTS_MAQUEEN_PLUS_RIGHT}", "3"],
                    ["%{BKY_ROBOTS_MAQUEEN_PLUS_RIGHT_REAR}", "4"]
                ]
            }
        ],
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_V2_READPATROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS CONTROL LED
    {
        "type": "robots_controlMaqueenPlusLed",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_CONTROLLED_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "VERSION",
                "options": [
                    ["v2", "2"],
                    ["v1", "1"]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "LED",
                "options": [
                    ["%{BKY_ROBOTS_MAQUEEN_PLUS_LED_RIGHT}", "1"],
                    ["%{BKY_ROBOTS_MAQUEEN_PLUS_LED_LEFT}", "0"],
                    ["%{BKY_ROBOTS_MAQUEEN_PLUS_LED_LEFT&RIGHT}", "-1"]
                ]
            }, {
                "type": "input_value",
                "name": "STATE",
                "check": "Boolean"
            }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_CONTROLLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS CONTROL GO
    {
        "type": "robots_setMaqueenPlusGo",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_GO_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "VERSION",
                "options": [
                    ["v2", "2"],
                    ["v1", "1"]
                ]
            }, {
                "type": "field_grid_dropdown",
                "name": "DIR",
                "options": [
                    ["%{BKY_ROBOTS_MAQUEEN_GO_FORWARD}", "drive"],
                    ["%{BKY_ROBOTS_MAQUEEN_GO_REVERSE}", "backup"]
                ]
            }, {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_GO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS ROTATE
    {
        "type": "robots_rotateMaqueenPlus",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_ROTATE_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "VERSION",
                "options": [
                    ["v2", "2"],
                    ["v1", "1"]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "DIR",
                "options": [
                    ["↻", "right"],
                    ["↺", "left"]
                ]
            }, {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_ROTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS CONTROL MOTOR
    {
        "type": "robots_controlMaqueenPlusMotor",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_CONTROLMOTOR_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "VERSION",
                "options": [
                    ["v2", "2"],
                    ["v1", "1"]
                ]
            }, {
                "type": "field_grid_dropdown",
                "name": "MOTOR",
                "options": [
                    ["%{BKY_ROBOTS_MAQUEEN_RIGHT}", "Right"],
                    ["%{BKY_ROBOTS_MAQUEEN_LEFT}", "Left"]
                ]
            }, {
                "type": "field_grid_dropdown",
                "name": "DIR",
                "options": [
                    ["↻", "0"],
                    ["↺", "1"]
                ]
            }, {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_CONTROLMOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS STOP MOTORS
    {
        "type": "robots_stopMaqueenPlusMotors",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_STOPMOTORS_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "VERSION",
                "options": [
                    ["v2", "2"],
                    ["v1", "1"]
                ]
            }, {
                "type": "field_grid_dropdown",
                "name": "MOTOR",
                "options": [
                    ["%{BKY_ROBOTS_MAQUEEN_RIGHT}", "Right"],
                    ["%{BKY_ROBOTS_MAQUEEN_LEFT}", "Left"],
                    ["%{BKY_ROBOTS_MAQUEEN_RIGHT&LEFT}", "both"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_STOPMOTORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS_V1 SET SERVO ANGLE
    {
        "type": "robots_setMaqueenPlusV1ServoAngle",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_V1_SETSERVOANGLE_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "SERVO",
                "options": [
                    ["S1", "S1"],
                    ["S2", "S2"],
                    ["S3", "S3"]
                ]
            }, {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_V1_SETSERVOANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS_V2 SET SERVO ANGLE
    {
        "type": "robots_setMaqueenPlusV2ServoAngle",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_V2_SETSERVOANGLE_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "SERVO",
                "options": [
                    ["P0", "pin0"],
                    ["P1", "pin1"],
                    ["P2", "pin2"]
                ]
            }, {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_V2_SETSERVOANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS BLINK ROBOT
    {
        "type": "robots_maqueenPlusBlinkRobot",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_BLINK_ROBOT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_BLINK_ROBOT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS SET NEOPIXEL
    {
        "type": "robots_setMaqueenPlusNeopixel",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_SETNEOPIXEL_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "LED",
                "options": [
                    ["0", "0"],
                    ["1", "1"],
                    ["2", "2"],
                    ["3", "3"],
                    ["les 4 LEDs", "all"]
                ]
            }, {
                "type": "input_value",
                "name": "R",
                "check": "Number"
            }, {
                "type": "input_value",
                "name": "G",
                "check": "Number"
            }, {
                "type": "input_value",
                "name": "B",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_SETNEOPIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS SET NEOPIXEL PALETTE
    {
        "type": "robots_setMaqueenPlusNeopixelPalette",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_SETPALETTECOLOR_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "LED",
                "options": [
                    ["0", "0"],
                    ["1", "1"],
                    ["2", "2"],
                    ["3", "3"],
                    ["les 4 LED", "all"]
                ]
            }, {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_SETPALETTECOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS RAINBOW
    {
        "type": "robots_setMaqueenPlusRainbow",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_SETRAINBOW_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_SETRAINBOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS SET BUZZER
    {
        "type": "robots_setMaqueenPlusBuzzer",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_SETBUZZER_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "VERSION",
                "options": [
                    ["v2", "2"],
                    ["v1", "1"]
                ]
            },
            {
                "type": "input_value",
                "name": "FREQUENCY",
                "check": "Number"
            }, {
                "type": "input_value",
                "name": "TIME",
                "check": "Number"
            }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_SETBUZZER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS ON REMOTE CONTROL COMMAND RECEIVED
    {
        "type": "robots_maqueenPlus_onRemoteCommandReceived",
        "message0": "[MaqueenPlus] %{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
        "args0": [{
            "type": "input_dummy",
            "name": "IF0"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO0"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_BLACK_NEC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_onRemoteCommandReceived_init"
        ],
        "mutator": "robots_onRemoteCommandReceived_mutator",
    },

    // BLOCK MAQUEEN_PLUS ON REMOTE CONTROL COMMAND RECEIVED - C AR MP3 GRAY REMOTE
    {
        "type": "robots_maqueenPlus_onRemoteCommandReceived_car_mp3_gray",
        "message0": "[MaqueenPlus] %{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
        "args0": [{
            "type": "input_dummy",
            "name": "IF0"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO0"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_CAR_MP3_GRAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_onRemoteCommandReceived_init"
        ],
        "mutator": "robots_onRemoteCommandReceived_mutator",
    },

    // BLOCK MAQUEEN_PLUS DECODE IR RECEIVER
    {
        "type": "robots_decodeMaqueenPlusIRreceiver",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_DECODEIRRECEIVER_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_DECODEIRRECEIVER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MAQUEEN_PLUS GET IR CODE
    {
        "type": "robots_getMaqueenPlusIRcode",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLUS_GETIRCODE_TITLE}",
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLUS_GETIRCODE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin CUTEBOT blocks */

    // BLOCK CUTEBOT ULTRASONIC RANGER
    {
        "type": "robots_getCutebotUltrasonicRanger",
        "message0": "%{BKY_ROBOTS_CUTEBOT_ULTRASONICRANGER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOT_ULTRASONIC_DISTANCE}", "distance"],
                ["%{BKY_ROBOTS_CUTEBOT_ULTRASONIC_DURATION}", "duration"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_ULTRASONICRANGER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT READ LINE FINDER
    {
        "type": "robots_readCutebotPatrol",
        "message0": "%{BKY_ROBOTS_CUTEBOT_READPATROL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOT_RIGHT}", "right"],
                ["%{BKY_ROBOTS_CUTEBOT_LEFT}", "left"]
            ]
        }],
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_READPATROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT BLINK ROBOT
    {
        "type": "robots_blinkCutebotRobot",
        "message0": "%{BKY_ROBOTS_CUTEBOT_BLINK_ROBOT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_BLINK_ROBOT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT CONTROL RGB LED
    {
        "type": "robots_controlCutebotRGBLedPalette",
        "message0": "%{BKY_ROBOTS_CUTEBOT_CONTROLLED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOT_RIGHT}", "right"],
                ["%{BKY_ROBOTS_CUTEBOT_LEFT}", "left"]
            ]
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_CONTROLLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT CONTROL RGB LED
    {
        "type": "robots_controlCutebotRGBLed",
        "message0": "%{BKY_ROBOTS_CUTEBOT_CONTROL_RGB_LED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOT_RIGHT}", "right"],
                ["%{BKY_ROBOTS_CUTEBOT_LEFT}", "left"]
            ]
        }, {
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_CONTROL_RGB_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT SET NEOPIXEL
    {
        "type": "robots_setCutebotNeopixel",
        "message0": "%{BKY_ROBOTS_CUTEBOT_SETNEOPIXEL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOT_RIGHT}", "0"],
                ["%{BKY_ROBOTS_CUTEBOT_LEFT}", "1"]
            ]
        }, {
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_SETNEOPIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT SET NEOPIXEL PALETTE
    {
        "type": "robots_setCutebotNeopixelPalette",
        "message0": "%{BKY_ROBOTS_CUTEBOT_SETPALETTECOLOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOT_RIGHT}", "0"],
                ["%{BKY_ROBOTS_CUTEBOT_LEFT}", "1"]
            ]
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_SETPALETTECOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT CONTROL GO
    {
        "type": "robots_setCutebotGo",
        "message0": "%{BKY_ROBOTS_CUTEBOT_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOT_GO_FORWARD}", "FORWARD"],
                ["%{BKY_ROBOTS_CUTEBOT_GO_BACKWARD}", "BACKWARD"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_GO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT TURN ROBOT
    {
        "type": "robots_setCutebotTurn",
        "message0": "%{BKY_ROBOTS_CUTEBOT_TURN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOT_TURN_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CUTEBOT_TURN_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_TURN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT STOP ROBOT
    {
        "type": "robots_setCutebotStop",
        "message0": "%{BKY_ROBOTS_CUTEBOT_STOP_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT CONTROL MOTOR
    {
        "type": "robots_controlCutebotMotors",
        "message0": "%{BKY_ROBOTS_CUTEBOT_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOT_MOTOR_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CUTEBOT_MOTOR_LEFT}", "LEFT"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "CLOCKWISE"],
                ["↺", "ANTICLOCKWISE"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_CONTROLMOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT SET SERVO ANGLE
    {
        "type": "robots_setCutebotServoAngle",
        "message0": "%{BKY_ROBOTS_CUTEBOT_SETSERVOANGLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SERVO",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOT_S1}", "1"],
                ["%{BKY_ROBOTS_CUTEBOT_S2}", "2"],
                ["%{BKY_ROBOTS_CUTEBOT_SERVO_BOTH}", "both"]
            ]
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_SETSERVOANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT MOVE ONE SQUARE FORWARD
    {
        "type": "robots_moveCutebotOneSquareForward",
        "message0": "%{BKY_ROBOTS_CUTEBOT_MOVE_ONE_SQUARE_FORWARD_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_MOVE_ONE_SQUARE_FORWARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT MOVE ONE SQUARE BACKWARD
    {
        "type": "robots_moveCutebotOneSquareBackward",
        "message0": "%{BKY_ROBOTS_CUTEBOT_MOVE_ONE_SQUARE_BACKWARD_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_MOVE_ONE_SQUARE_BACKWARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT TURN LEFT
    {
        "type": "robots_turnCutebotLeft",
        "message0": "%{BKY_ROBOTS_CUTEBOT_TURN_LEFT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_TURN_LEFT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT TURN RIGHT
    {
        "type": "robots_turnCutebotRight",
        "message0": "%{BKY_ROBOTS_CUTEBOT_TURN_RIGHT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_TURN_RIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT SET BUZZER
    {
        "type": "robots_setCutebotBuzzer",
        "message0": "%{BKY_ROBOTS_CUTEBOT_SETBUZZER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_SETBUZZER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PLAY MUSIC
    {
        "type": "robots_playCutebotMusic",
        "message0": "%{BKY_ROBOTS_CUTEBOT_PLAYMUSIC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MUSIC",
            "options": [
                ["Gamme", "GAMME"],
                ["Star Wars", "SW"],
                ["R2D2", "R2D2"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_PLAYMUSIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT ON REMOTE CONTROL COMMAND RECEIVED
    {
        "type": "robots_cutebot_onRemoteCommandReceived",
        "message0": "[Cutebot] %{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
        "args0": [{
            "type": "input_dummy",
            "name": "IF0"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO0"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_BLACK_NEC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_onRemoteCommandReceived_init"
        ],
        "mutator": "robots_onRemoteCommandReceived_mutator",
    },

    // BLOCK CUTEBOT ON REMOTE CONTROL COMMAND RECEIVED - C AR MP3 GRAY REMOTE
    {
        "type": "robots_cutebot_onRemoteCommandReceived_car_mp3_gray",
        "message0": "[Cutebot] %{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
        "args0": [{
            "type": "input_dummy",
            "name": "IF0"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO0"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_CAR_MP3_GRAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_onRemoteCommandReceived_init"
        ],
        "mutator": "robots_onRemoteCommandReceived_mutator",
    },

    // BLOCK CUTEBOT DECODE IR RECEIVER
    {
        "type": "robots_decodeCutebotIRreceiver",
        "message0": "%{BKY_ROBOTS_CUTEBOT_DECODEIRRECEIVER_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_DECODEIRRECEIVER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT GET IR CODE
    {
        "type": "robots_getCutebotIRcode",
        "message0": "%{BKY_ROBOTS_CUTEBOT_GETIRCODE_TITLE}",
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOT_GETIRCODE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin CUTEBOT PRO blocks */

    // BLOCK CUTEBOT PRO ULTRASONIC RANGER
    {
        "type": "robots_CutebotPro_getUltrasonicDistance",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_ULTRASONICRANGER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_ULTRASONIC_CM}", "CM"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_ULTRASONIC_INCH}", "INCH"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_ULTRASONICRANGER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO GET LINE STATE
    {
        "type": "robots_CutebotPro_getLineState",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_GETLINESTATE_TITLE}",
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_GETLINESTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO IS SPECIFIC STATE
    {
        "type": "robots_CutebotPro_isSpecificState",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_ISSPECIFICSTATE_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "STATE",
            "options": [          // L CL CR R    // R CR CL L
                ["□ □ □ □", "0x00"], // 0000   0000 (0)
                ["□ ■ ■ □", "0x06"], // 6 0110   0110 (6)
                ["□ □ ■ □", "0x04"], // 4 0010   0100 (4)
                ["□ ■ □ □", "0x02"], // 2 0100   0010 (2)
                ["■ □ □ ■", "0x09"], // 9 1001   1001 (9)
                ["■ ■ ■ ■", "0x0F"], // 15 1111  1111 (15)
                ["■ □ ■ ■", "0x0D"], // 13 1011  1101 (13)
                ["■ ■ □ ■", "0x0B"], // 12 0011  1100 (12)
                ["■ □ □ □", "0x01"], // 1 1000   0001 (1)
                ["■ ■ ■ □", "0x07"], // 7 1110   0111 (7)
                ["■ □ ■ □", "0x05"], // 5 1010   0101 (5)
                ["■ ■ □ □", "0x03"], // 3 1100   0011 (3)
                ["□ □ □ ■", "0x08"], // 8 0001   1000 (8)
                ["□ ■ ■ ■", "0x0E"], // 14 0111  1110 (14)
                ["□ □ ■ ■", "0x0C"], // 12 0011  1100 (12)
                ["□ ■ □ ■", "0x0A"]  // 10 0101  1010 (10)
            ]
        }],
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_ISSPECIFICSTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO GET LINE OFFSET
    {
        "type": "robots_CutebotPro_getLineOffset",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_GETLINEOFFSET_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_CM}", "CM"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_INCH}", "INCH"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_GETLINEOFFSET_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO IS ABOVE LINE
    {
        "type": "robots_CutebotPro_isSensorAboveLine",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_ISABOVELINE_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "SENSOR",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"]
            ]
        }],
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_ISABOVELINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO GET GRAY SCALE VALUE
    {
        "type": "robots_getGrayscaleTrackingValue",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_GETGRAYSCALEVALUE_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "SENSOR",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_GETGRAYSCALEVALUE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOTPRO READ VERSION
    {
        "type": "robots_CutebotPro_readVersion",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_READVERSION_TITLE}",
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_READVERSION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO CONTROL RGB LED
    {
        "type": "robots_CutebotPro_controlHeadlightsPalette",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_CONTROLLED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_BOTH}", "BOTH"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_CONTROLLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO CONTROL RGB LED
    {
        "type": "robots_CutebotPro_controlHeadlights",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_CONTROL_RGB_LED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_BOTH}", "BOTH"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_CONTROL_RGB_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO SWITCH OFF ALL RGB LED
    {
        "type": "robots_CutebotPro_switchOffHeadlights",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_SWITCHOFFLED_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_SWITCHOFFLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO SET NEOPIXEL
    {
        "type": "robots_CutebotPro_setNeopixel",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_SETNEOPIXEL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_BOTH}", "BOTH"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_SETNEOPIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO SET NEOPIXEL PALETTE
    {
        "type": "robots_CutebotPro_setNeopixelPalette",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_SETNEOPIXELPALETTE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_BOTH}", "BOTH"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_SETNEOPIXELPALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO SWITCH OFF NEOPIXEL
    {
        "type": "robots_CutebotPro_switchOffNeopixel",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_SWITCHOFFNEOPIXEL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_BOTH}", "BOTH"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_LEFT}", "LEFT"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_SWITCHOFFNEOPIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO CONTROL GO
    {
        "type": "robots_CutebotPro_setGo",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_GO_FORWARD}", "FORWARD"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_GO_BACKWARD}", "BACKWARD"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_GO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO TURN ROBOT
    {
        "type": "robots_CutebotPro_turn",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_TURN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_TURN_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_TURN_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_TURN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO STOP ROBOT
    {
        "type": "robots_CutebotPro_stop",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_STOP_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO CONTROL MOTOR
    {
        "type": "robots_CutebotPro_controlMotors",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_MOTOR_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_MOTOR_LEFT}", "LEFT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_MOTOR_BOTH}", "BOTH"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "CLOCKWISE"],
                ["↺", "ANTICLOCKWISE"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_CONTROLMOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO GET MOTOR SPEED
    {
        "type": "robots_CutebotPro_getMotorSpeed",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_GETMOTORSPEED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_MOTOR_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_MOTOR_LEFT}", "LEFT"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_CM_S}", "CM_S"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_INCH_S}", "INCH_S"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_GETMOTORSPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO GET ANGULAR DISTANCE
    {
        "type": "robots_CutebotPro_getAngularDistance",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_GETANGULARDISTANCE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_GETANGULARDISTANCE_DEGREES}", "DEGRESS"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_GETANGULARDISTANCE_ROTATIONS}", "ROTATIONS"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_GETANGULARDISTANCE_PULSES}", "PULSES"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_LEFT}", "LEFT"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_GETANGULARDISTANCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO INITIALIZE ANGULAR DISTANCE
    {
        "type": "robots_CutebotPro_initializeAngularDistance",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_INITANGULARDISTANCE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_LEFT}", "LEFT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_BOTH}", "BOTH"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_INITANGULARDISTANCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO RUN WITH SPEED
    {
        "type": "robots_CutebotPro_runWithSpeed",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_RUNWITHSPEED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_GO_FORWARD}", "FORWARD"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_GO_BACKWARD}", "BACKWARD"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_CM_S}", "CM_S"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_INCH_S}", "INCH_S"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_RUNWITHSPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO SET MOTORS SPEED
    {
        "type": "robots_CutebotPro_setMotorsSpeed",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_SETMOTORSSPEED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SPEED_L",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "SPEED_R",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_CM_S}", "CM_S"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_INCH_S}", "INCH_S"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_SETMOTORSSPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO RUN WITH RADIUS
    {
        "type": "robots_CutebotPro_runWithRadius",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_RUNWITHRADIUS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_TURN_LEFT}", "TO_LEFT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_TURN_RIGHT}", "TO_RIGHT"]
            ]
        }, {
            "type": "input_value",
            "name": "RADIUS",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_CM}", "CM"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_INCH}", "INCH"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_RUNWITHRADIUS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO RUN DISTANCE
    {
        "type": "robots_CutebotPro_runDistance",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_RUNDISTANCE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_GO_FORWARD}", "ADVANCE"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_GO_BACKWARD}", "RETREAT"]
            ]
        }, {
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_CM}", "CM"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_INCH}", "INCH"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_RUNDISTANCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_CutebotPro_runWaiting_init"
        ],
        "mutator": "robots_CutebotPro_runWaiting_mutator",
    },

    // BLOCK CUTEBOT PRO TURN WITH ANGLE
    {
        "type": "robots_CutebotPro_turnWithAngle",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_TURNWITHANGLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_TURN_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_TURN_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_TURNWITHANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_CutebotPro_runWaiting_init"
        ],
        "mutator": "robots_CutebotPro_runWaiting_mutator",
    },

    // BLOCK CUTEBOT PRO TURN WHEEL
    {
        "type": "robots_CutebotPro_turnWheel",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_TURNWHEEL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_LEFT}", "LEFT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_BOTH}", "BOTH"]
            ]
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_DEG}", "DEG"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_TOUR}", "TR"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_TURNWHEEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_CutebotPro_runWaiting_init"
        ],
        "mutator": "robots_CutebotPro_runWaiting_mutator",
    },

    // BLOCK CUTEBOT PRO PLACE WITH ANGLE
    {
        "type": "robots_CutebotPro_placeWithAngle",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_PLACEWITHANGLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_RIGHT}", "RIGHT_AT"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_LEFT}", "LEFT_AT"]
            ]
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_PLACEWITHANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_CutebotPro_runWaiting_init"
        ],
        "mutator": "robots_CutebotPro_runWaiting_mutator",
    },

    // BLOCK CUTEBOT PRO DEFINE SQUARE
    {
        "type": "robots_CutebotPro_defineSquare",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_DEFINESQUARE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SIZE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_CM}", "CM"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_UNIT_INCH}", "INCH"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_DEFINESQUARE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO RUN SQUARE
    {
        "type": "robots_CutebotPro_runSquare",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_RUNSQUARE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_CUTEBOTPRO_GO_FORWARD}", "ADVANCE"],
                ["%{BKY_ROBOTS_CUTEBOTPRO_GO_BACKWARD}", "RETREAT"]
            ]
        }, {
            "type": "input_value",
            "name": "N",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_RUNSQUARE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_CutebotPro_runWaiting_init"
        ],
        "mutator": "robots_CutebotPro_runWaiting_mutator",
    },

    // BLOCK CUTEBOT PRO SET SERVO ANGLE
    {
        "type": "robots_CutebotPro_setServoAngle",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_SETSERVOANGLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SERVO",
            "options": [
                ["S1", "1"],
                ["S2", "2"],
                ["S3", "3"],
                ["S4", "4"],
                ["S1, S2, S3 & S4", "ALL"]
            ]
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_SETSERVOANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO SET SERVO SPEED
    {
        "type": "robots_CutebotPro_setServoSpeed",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_SETSERVOSPEED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SERVO",
            "options": [
                ["S1", "1"],
                ["S2", "2"],
                ["S3", "3"],
                ["S4", "4"],
                ["S1, S2, S3 & S4", "ALL"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "CLOCKWISE"],
                ["↺", "ANTICLOCKWISE"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_SETSERVOSPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO SET EXTENDED MOTOR SPEED
    {
        "type": "robots_CutebotPro_setExtendedMotorSpeed",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_SETEXTENDEDMOTORSPEED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "CLOCKWISE"],
                ["↺", "ANTICLOCKWISE"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_SETEXTENDEDMOTORSPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO STOP EXTENDED MOTOR
    {
        "type": "robots_CutebotPro_stopExtendedMotor",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_STOPEXTENDEDMOTOR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_STOPEXTENDEDMOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOT PRO ON REMOTE CONTROL COMMAND RECEIVED
    {
        "type": "robots_CutebotPro_onRemoteCommandReceived",
        "message0": "[Cutebot Pro] %{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
        "args0": [{
            "type": "input_dummy",
            "name": "IF0"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO0"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_BLACK_NEC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_onRemoteCommandReceived_init"
        ],
        "mutator": "robots_onRemoteCommandReceived_mutator",
    },

    // BLOCK CUTEBOTPRO ON REMOTE CONTROL COMMAND RECEIVED - C AR MP3 GRAY REMOTE
    {
        "type": "robots_CutebotPro_onRemoteCommandReceived_car_mp3_gray",
        "message0": "[Cutebot Pro] %{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
        "args0": [{
            "type": "input_dummy",
            "name": "IF0"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO0"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_CAR_MP3_GRAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_onRemoteCommandReceived_init"
        ],
        "mutator": "robots_onRemoteCommandReceived_mutator",
    },

    // BLOCK CUTEBOTPRO DECODE IR RECEIVER
    {
        "type": "robots_CutebotPro_decodeIRreceiver",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_DECODEIRRECEIVER_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_DECODEIRRECEIVER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CUTEBOTPRO GET IR CODE
    {
        "type": "robots_CutebotPro_getIRcode",
        "message0": "%{BKY_ROBOTS_CUTEBOTPRO_GETIRCODE_TITLE}",
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CUTEBOTPRO_GETIRCODE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin KITROBOT v2 blocks */

    // BLOCK KITROBOT ULTRASONIC RANGER
    {
        "type": "robots_getKitrobotUltrasonicRanger",
        "message0": "%{BKY_ROBOTS_KITROBOT_ULTRASONICRANGER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_ROBOTS_KITROBOT_ULTRASONIC_DISTANCE}", "distance"],
                ["%{BKY_ROBOTS_KITROBOT_ULTRASONIC_DURATION}", "duration"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_ULTRASONICRANGER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITROBOT READ LINE FINDER
    {
        "type": "robots_readKitrobotPatrol",
        "message0": "%{BKY_ROBOTS_KITROBOT_READPATROL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": [
                ["%{BKY_ROBOTS_KITROBOT_RIGHT}", "pin15"],
                ["%{BKY_ROBOTS_KITROBOT_LEFT}", "pin2"]
            ]
        }],
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_READPATROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITROBOT CONTROL GO
    {
        "type": "robots_setKitrobotGo",
        "message0": "%{BKY_ROBOTS_KITROBOT_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_KITROBOT_GO_FORWARD}", "1"],
                ["%{BKY_ROBOTS_KITROBOT_GO_REVERSE}", "-1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_GO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITROBOT ROTATE
    {
        "type": "robots_rotateKitrobot",
        "message0": "%{BKY_ROBOTS_KITROBOT_ROTATE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "right"],
                ["↺", "left"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_ROTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITROBOT CONTROL MOTOR
    {
        "type": "robots_controlKitrobotMotor",
        "message0": "%{BKY_ROBOTS_KITROBOT_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_KITROBOT_RIGHT}", "pin1"],
                ["%{BKY_ROBOTS_KITROBOT_LEFT}", "pin0"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "-1"],
                ["↺", "1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_CONTROLMOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITROBOT STOP MOTORS
    {
        "type": "robots_stopKitrobotMotors",
        "message0": "%{BKY_ROBOTS_KITROBOT_STOPMOTORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_KITROBOT_RIGHT}", "pin1"],
                ["%{BKY_ROBOTS_KITROBOT_LEFT}", "pin0"],
                ["%{BKY_ROBOTS_KITROBOT_RIGHT&LEFT}", "both"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_STOPMOTORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITROBOT MOVE ONE SQUARE FORWARD
    {
        "type": "robots_kitrobotMoveOneSquareForward",
        "message0": "%{BKY_ROBOTS_KITROBOT_MOVE_ONE_SQUARE_FORWARD_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_MOVE_ONE_SQUARE_FORWARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITROBOT MOVE ONE SQUARE BACKWARD
    {
        "type": "robots_kitrobotMoveOneSquareBackward",
        "message0": "%{BKY_ROBOTS_KITROBOT_MOVE_ONE_SQUARE_BACKWARD_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_MOVE_ONE_SQUARE_BACKWARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITROBOT TURN LEFT
    {
        "type": "robots_kitrobotTurnLeft",
        "message0": "%{BKY_ROBOTS_KITROBOT_TURN_LEFT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_TURN_LEFT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITROBOT TURN RIGHT
    {
        "type": "robots_kitrobotTurnRight",
        "message0": "%{BKY_ROBOTS_KITROBOT_TURN_RIGHT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_TURN_RIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITROBOT STOP ROBOT
    {
        "type": "robots_kitrobotStopRobot",
        "message0": "%{BKY_ROBOTS_KITROBOT_STOP_ROBOT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_STOP_ROBOT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITROBOT BLINK ROBOT
    {
        "type": "robots_kitrobotBlinkRobot",
        "message0": "%{BKY_ROBOTS_KITROBOT_BLINK_ROBOT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_BLINK_ROBOT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITROBOT SET NEOPIXEL
    {
        "type": "robots_setKitrobotNeopixel",
        "message0": "%{BKY_ROBOTS_KITROBOT_SETNEOPIXEL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["les 4 LED", "all"]
            ]
        }, {
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_SETNEOPIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITROBOT SET NEOPIXEL PALETTE
    {
        "type": "robots_setKitrobotNeopixelPalette",
        "message0": "%{BKY_ROBOTS_KITROBOT_SETPALETTECOLOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["les 4 LED", "all"]
            ]
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_SETPALETTECOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITROBOT RAINBOW
    {
        "type": "robots_setKitrobotRainbow",
        "message0": "%{BKY_ROBOTS_KITROBOT_SETRAINBOW_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_SETRAINBOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITROBOT SET BUZZER
    {
        "type": "robots_setKitrobotBuzzer",
        "message0": "%{BKY_ROBOTS_KITROBOT_SETBUZZER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITROBOT_SETBUZZER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin CODO blocks */

    // BLOCK CODO CONTROL GO
    {
        "type": "robots_setCodoGo",
        "message0": "%{BKY_ROBOTS_CODO_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_CODO_GO_FORWARD}", "FORWARD"],
                ["%{BKY_ROBOTS_CODO_GO_BACKWARD}", "BACKWARD"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CODO_GO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CODO TURN ROBOT
    {
        "type": "robots_setCodoTurn",
        "message0": "%{BKY_ROBOTS_CODO_TURN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_CODO_TURN_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CODO_TURN_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CODO_TURN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CODO STOP ROBOT
    {
        "type": "robots_setCodoStop",
        "message0": "%{BKY_ROBOTS_CODO_STOP_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CODO_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CODO CONTROL MOTOR
    {
        "type": "robots_controlCodoMotors",
        "message0": "%{BKY_ROBOTS_CODO_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_CODO_MOTOR_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CODO_MOTOR_LEFT}", "LEFT"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "CLOCKWISE"],
                ["↺", "ANTICLOCKWISE"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CODO_CONTROLMOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin OOBYBOT blocks */

    // BLOCK OOBYBOT CONTROL LED
    {
        "type": "robots_controlOobybotLed",
        "message0": "%{BKY_ROBOTS_OOBYBOT_CONTROLLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_OOBYBOT_CONTROLLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OOBYBOT CONTROL GO
    {
        "type": "robots_setOobybotGo",
        "message0": "%{BKY_ROBOTS_OOBYBOT_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_OOBYBOT_GO_FORWARD}", "forward"],
                ["%{BKY_ROBOTS_OOBYBOT_GO_BACKWARD}", "backward"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_OOBYBOT_GO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OOBYBOT TURN ROBOT
    {
        "type": "robots_setOobybotTurn",
        "message0": "%{BKY_ROBOTS_OOBYBOT_TURN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_OOBYBOT_TURN_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_OOBYBOT_TURN_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_OOBYBOT_TURN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OOBYBOT STOP ROBOT
    {
        "type": "robots_setOobybotStop",
        "message0": "%{BKY_ROBOTS_OOBYBOT_STOP_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_OOBYBOT_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OOBYBOT CONTROL MOTOR
    {
        "type": "robots_controlOobybotMotors",
        "message0": "%{BKY_ROBOTS_OOBYBOT_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_OOBYBOT_MOTOR_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_OOBYBOT_MOTOR_LEFT}", "LEFT"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "CLOCKWISE"],
                ["↺", "ANTICLOCKWISE"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_OOBYBOT_CONTROLMOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },


    /* Begin BUGGY blocks */

    // BLOCK BUGGY CONTROL GO
    {
        "type": "robots_setBuggyGo",
        "message0": "%{BKY_ROBOTS_BUGGY_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_BUGGY_GO_FORWARD}", "FORWARD"],
                ["%{BKY_ROBOTS_BUGGY_GO_BACKWARD}", "BACKWARD"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BUGGY_GO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BUGGY TURN ROBOT
    {
        "type": "robots_setBuggyTurn",
        "message0": "%{BKY_ROBOTS_BUGGY_TURN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_BUGGY_TURN_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_BUGGY_TURN_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BUGGY_TURN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BUGGY STOP ROBOT
    {
        "type": "robots_setBuggyStop",
        "message0": "%{BKY_ROBOTS_BUGGY_STOP_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BUGGY_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BUGGY CONTROL MOTOR
    {
        "type": "robots_controlBuggyMotors",
        "message0": "%{BKY_ROBOTS_BUGGY_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_BUGGY_MOTOR_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_BUGGY_MOTOR_LEFT}", "LEFT"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "CLOCKWISE"],
                ["↺", "ANTICLOCKWISE"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BUGGY_CONTROLMOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin Bit:Bot blocks definitions */

    // BLOCK BITBOT READ LIGHT SENSOR
    {
        "type": "robots_readBitBotLightSensor",
        "message0": "%{BKY_ROBOTS_BITBOT_READLIGHTSENSOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "RL",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT}", "1"],
                ["%{BKY_ROBOTS_MAQUEEN_LEFT}", "0"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_READLIGHTSENSOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITBOT CONTROL MOTOR GO
    {
        "type": "robots_setBitbotGo",
        "message0": "%{BKY_ROBOTS_BITBOT_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_BITBOT_GO_FORWARD}", "0"],
                ["%{BKY_ROBOTS_BITBOT_GO_REVERSE}", "1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_GO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITBOT CONTROL MOTOR
    {
        "type": "robots_controlBitBotMotor",
        "message0": "%{BKY_ROBOTS_BITBOT_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_BITBOT_RIGHT}", "pin1/pin12"],
                ["%{BKY_ROBOTS_BITBOT_LEFT}", "pin0/pin8"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "0"],
                ["↺", "1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_CONTROLMOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITBOT STOP MOTORS
    {
        "type": "robots_stopBitBotMotors",
        "message0": "%{BKY_ROBOTS_BITBOT_STOPMOTORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_BITBOT_RIGHT}", "pin1/pin12"],
                ["%{BKY_ROBOTS_BITBOT_LEFT}", "pin0/pin8"],
                ["%{BKY_ROBOTS_BITBOT_RIGHT&LEFT}", "all"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_STOPMOTORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITBOT SET NEOPIXEL PALETTE
    {
        "type": "robots_setBitBotNeopixelPalette",
        "message0": "%{BKY_ROBOTS_BITBOT_SETPALETTECOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_SETPALETTECOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITBOT SET NEOPIXEL
    {
        "type": "robots_setBitBotNeopixel",
        "message0": "%{BKY_ROBOTS_BITBOT_SETNEOPIXEL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_SETNEOPIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITBOT RAINBOW
    {
        "type": "robots_setBitBotRainbow",
        "message0": "%{BKY_ROBOTS_BITBOT_SETRAINBOW_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_SETRAINBOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITBOT READ LINE FINDER
    {
        "type": "robots_readBitBotPatrol",
        "message0": "%{BKY_ROBOTS_BITBOT_READPATROL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": [
                ["%{BKY_ROBOTS_BITBOT_RIGHT}", "pin5"],
                ["%{BKY_ROBOTS_BITBOT_LEFT}", "pin11"]
            ]
        }],
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_READPATROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin BitCar blocks */

    // BLOCK BITCAR ULTRASONIC RANGER
    {
        "type": "robots_getBitCarUltrasonicRanger",
        "message0": "%{BKY_ROBOTS_BITCAR_ULTRASONICRANGER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_ULTRASONIC_DISTANCE}", "distance"],
                ["%{BKY_ROBOTS_MAQUEEN_ULTRASONIC_DURATION}", "duration"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITCAR_ULTRASONICRANGER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITCAR READ LINE FINDER
    {
        "type": "robots_readBitCarPatrol",
        "message0": "%{BKY_ROBOTS_BITCAR_READPATROL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT}", "pin2"],
                ["%{BKY_ROBOTS_MAQUEEN_LEFT}", "pin1"]
            ]
        }],
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITCAR_READPATROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITCAR CONTROL GO
    {
        "type": "robots_setBitCarGo",
        "message0": "%{BKY_ROBOTS_BITCAR_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_GO_FORWARD}", "1"],
                ["%{BKY_ROBOTS_MAQUEEN_GO_REVERSE}", "-1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITCAR_GO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITCAR ROTATE
    {
        "type": "robots_rotateBitCar",
        "message0": "%{BKY_ROBOTS_BITCAR_ROTATE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "1"],
                ["↺", "-1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITCAR_ROTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITCAR CONTROL MOTOR
    {
        "type": "robots_controlBitCarMotor",
        "message0": "%{BKY_ROBOTS_BITCAR_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT}", "R"],
                ["%{BKY_ROBOTS_MAQUEEN_LEFT}", "L"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "1"],
                ["↺", "-1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITCAR_CONTROLMOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITCAR STOP MOTORS
    {
        "type": "robots_stopBitCarMotors",
        "message0": "%{BKY_ROBOTS_BITCAR_STOPMOTORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT}", "R"],
                ["%{BKY_ROBOTS_MAQUEEN_LEFT}", "L"],
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT&LEFT}", "both"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITCAR_STOPMOTORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITCAR SET NEOPIXEL
    {
        "type": "robots_setBitCarNeopixel",
        "message0": "%{BKY_ROBOTS_BITCAR_SETNEOPIXEL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["les 4 LEDs", "all"]
            ]
        }, {
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITCAR_SETNEOPIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITCAR SET NEOPIXEL PALETTE
    {
        "type": "robots_setBitCarNeopixelPalette",
        "message0": "%{BKY_ROBOTS_BITCAR_SETPALETTECOLOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["les 4 LEDs", "all"]
            ]
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITCAR_SETPALETTECOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITCAR RAINBOW
    {
        "type": "robots_setBitCarRainbow",
        "message0": "%{BKY_ROBOTS_BITCAR_SETRAINBOW_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITCAR_SETRAINBOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITCAR SET BUZZER
    {
        "type": "robots_setBitCarBuzzer",
        "message0": "%{BKY_ROBOTS_BITCAR_SETBUZZER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITCAR_SETBUZZER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITCAR ON REMOTE CONTROL COMMAND RECEIVED
    {
        "type": "robots_bitcar_onRemoteCommandReceived",
        "message0": "[BitCar] %{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
        "args0": [{
            "type": "input_dummy",
            "name": "IF0"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO0"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_BLACK_NEC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_onRemoteCommandReceived_init"
        ],
        "mutator": "robots_onRemoteCommandReceived_mutator",
    },

    // BLOCK BITCAR ON REMOTE CONTROL COMMAND RECEIVED - C AR MP3 GRAY REMOTE
    {
        "type": "robots_bitcar_onRemoteCommandReceived_car_mp3_gray",
        "message0": "[BitCar] %{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
        "args0": [{
            "type": "input_dummy",
            "name": "IF0"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO0"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_CAR_MP3_GRAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_onRemoteCommandReceived_init"
        ],
        "mutator": "robots_onRemoteCommandReceived_mutator",
    },

    // BLOCK BITCAR DECODE IR RECEIVER
    {
        "type": "robots_decodeBitCarIRreceiver",
        "message0": "%{BKY_ROBOTS_BITCAR_DECODEIRRECEIVER_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITCAR_DECODEIRRECEIVER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BITCAR GET IR CODE
    {
        "type": "robots_getBitCarIRcode",
        "message0": "%{BKY_ROBOTS_BITCAR_GETIRCODE_TITLE}",
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITCAR_GETIRCODE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin Gamepad blocks definitions */

    //BLOCK BITPLAYER ON BUTTON EVENT
    {
        "type": "robots_onBitPlayerButtonEvent",
        "message0": "%{BKY_ROBOTS_BITPLAYER_ONBUTTONEVENT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "pin5"],
                ["B", "pin11"],
                ["C", "pin13"],
                ["D", "pin14"],
                ["L", "pin15"],
                ["R", "pin16"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_ROBOTS_GAMEPAD_PRESSED}", "PRESSED"],
                ["%{BKY_ROBOTS_GAMEPAD_RELEASED}", "RELEASED"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITPLAYER_ONBUTTONEVENT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK GAMEPAD V4 JOYSTICK GET AXIS
    {
        "type": "robots_getBitPlayerJoystick",
        "message0": "%{BKY_ROBOTS_BITPLAYER_GETAXIS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["X", "pin1"],
                ["Y", "pin2"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITPLAYER_GETAXIS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    //BLOCK GAMEPAD V4 ON BUTTON EVENT
    {
        "type": "robots_onGamepadV4ButtonEvent",
        "message0": "%{BKY_ROBOTS_GAMEPAD_V4_ONBUTTONEVENT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "button_a"],
                ["B", "button_b"],
                ["C", "pin13"],
                ["D", "pin14"],
                ["E", "pin15"],
                ["F", "pin16"],
                ["Z", "pin8"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_ROBOTS_GAMEPAD_PRESSED}", "PRESSED"],
                ["%{BKY_ROBOTS_GAMEPAD_RELEASED}", "RELEASED"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_GAMEPAD_V4_ONBUTTONEVENT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK GAMEPAD V4 JOYSTICK GET AXIS
    {
        "type": "robots_getGamepadV4Joystick",
        "message0": "%{BKY_ROBOTS_GAMEPAD_V4_GETAXIS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["X", "pin1"],
                ["Y", "pin2"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_GAMEPAD_V4_GETAXIS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GAMEPAD CONTROL LED & MOTOR
    {
        "type": "robots_setGamepadV4LEDMotor",
        "message0": "%{BKY_ROBOTS_GAMEPAD_V4_LED_MOTOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_GAMEPAD_V4_LED_MOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GAMEPAD CONTROL LED
    {
        "type": "robots_setGamepadLED",
        "message0": "%{BKY_ROBOTS_GAMEPAD_CONTROLLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_GAMEPAD_CONTROLLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GAMEPAD CONTROL LED
    {
        "type": "robots_setGamepadMotorVibration",
        "message0": "%{BKY_ROBOTS_GAMEPAD_SETMOTORVIBRATION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_GAMEPAD_SETMOTORVIBRATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GAMEPAD SET BUZZER
    {
        "type": "robots_setGamepadBuzzerFreq",
        "message0": "%{BKY_ROBOTS_GAMEPAD_SETBUZZERFREQ_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_GAMEPAD_SETBUZZERFREQ_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GAMEPAD PLAY MUSIC
    {
        "type": "robots_playGamepadMusic",
        "message0": "%{BKY_ROBOTS_GAMEPAD_PLAYMUSIC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MUSIC",
            "options": [
                ["Gamme", "GAMME"],
                ["Star Wars", "SW"],
                ["R2D2", "R2D2"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_GAMEPAD_PLAYMUSIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK GAMEPAD ON BUTTON EVENT
    {
        "type": "robots_onGamepadButtonEvent",
        "message0": "%{BKY_ROBOTS_GAMEPAD_ONBUTTONEVENT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["X", "pin1"],
                ["Y", "pin2"],
                ["UP", "pin8"],
                ["DOWN", "pin13"],
                ["LEFT", "pin14"],
                ["RIGHT", "pin15"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_ROBOTS_GAMEPAD_PRESSED}", "PRESSED"],
                ["%{BKY_ROBOTS_GAMEPAD_RELEASED}", "RELEASED"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_GAMEPAD_ONBUTTONEVENT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Robots = Object.create(null);

/**
 * Remote control typed Basic black.
 * @this {Array<Array<string>>}
 */
Blockly.Constants.Robots.NEC_BASIC_BLACK_REMOTE_BUTTONS = [
    ["%{BKY_REMOTE_NEC_BUTTON}" + "1", "1"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "2", "2"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "3", "3"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "4", "4"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "5", "5"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "6", "6"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "7", "7"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "8", "8"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "9", "9"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "0", "0"],
    ["%{BKY_REMOTE_NEC_BUTTON_UP} (PREV)", "up"],
    ["%{BKY_REMOTE_NEC_BUTTON_DOWN} (NEXT)", "down"],
    ["%{BKY_REMOTE_NEC_BUTTON_LEFT} (CH-)", "left"],
    ["%{BKY_REMOTE_NEC_BUTTON_RIGHT} (CH+)", "right"],
    ["ENTER/SAVE", "ENTER/SAVE"],
    ["%{BKY_REMOTE_NEC_BUTTON_BACK}", "back"],
    ["VOL-", "VOL-"],
    ["VOL+", "VOL+"],
    ["PLAY/PAUSE", "PLAY/PAUSE"],
    ["SETUP", "SETUP"],
    ["STOP/MODE", "STOP/MODE"]
];

/**
 * Remote control typed C ar mp3 gray.
 * @this {Array<Array<string>>}
 */
Blockly.Constants.Robots.NEC_CAR_MP3_REMOTE_BUTTONS = [
    ["%{BKY_REMOTE_NEC_BUTTON}" + "1", "1"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "2", "2"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "3", "3"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "4", "4"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "5", "5"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "6", "6"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "7", "7"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "8", "8"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "9", "9"],
    ["%{BKY_REMOTE_NEC_BUTTON}" + "0", "0"],
    ["CH-", "CH-"],
    ["CH", "CH"],
    ["CH+", "CH+"],
    ["PREV", "PREV"],
    ["NEXT", "NEXT"],
    ["PLAY/PAUSE", "PLAY/PAUSE"],
    ["VOL-", "VOL-"],
    ["VOL+", "VOL+"],
    ["EQ", "EQ"],
    ["100+", "100+"],
    ["200+", "200+"]
];

/**
 * Performs final setup of 'robots_onRemoteCommandReceived' blocks 
 * for robots Maqueen, MaqueenPlus, Cutebot, Cutebot Pro & BitCar.
 * @this {Blockly.Block}
 */
Blockly.Constants.Robots.ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_INIT_EXTENSION = function () {
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    this.dropdownFieldsValue = new Array();
    if (this.type.includes("_onRemoteCommandReceived_car_mp3_gray")) {
        this.remoteButtonDropdown = Blockly.Constants.Robots.NEC_CAR_MP3_REMOTE_BUTTONS;
        this.thenHeadTitle = 'ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_CAR_MP3_GRAY_DETECTED_THEN';
    } else {
        this.remoteButtonDropdown = Blockly.Constants.Robots.NEC_BASIC_BLACK_REMOTE_BUTTONS;
        this.thenHeadTitle = 'ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_BLACK_NEC_DETECTED_THEN';
    }
    this.getInput('IF0')
        .appendField(new Blockly.FieldDropdown(this.remoteButtonDropdown), 'COMMAND0')
        .appendField(Blockly.Msg[this.thenHeadTitle]);
    this.update_(this.updateShape_);
};

/**
 * Mixin for mutator functions in the 'robots_onRemoteCommandReceived_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Robots.ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_MUTATOR_MIXIN = {
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;
        }
        var container = Blockly.utils.xml.createElement('mutation');
        if (this.elseifCount_) {
            container.setAttribute('elseif', this.elseifCount_);
        }
        if (this.elseCount_) {
            container.setAttribute('else', 1);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        if (!xmlElement) return;
        this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
        this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
        this.rebuildShape_();
    },
    // Store pointers to any connected child blocks.
    storeConnections_: function (arg) {
        if (!arg) arg = 0;
        this.statementConnections_ = [null];
        this.elseStatementConnection_ = null;
        for (var i = 1; i <= this.elseifCount_; i++) {
            if (arg != i) {
                this.statementConnections_.push(this.getInput('DO' + i)
                    .connection.targetConnection);
            }
        }
        if (this.getInput('ELSE')) {
            this.elseStatementConnection_ = this.getInput('ELSE')
                .connection.targetConnection;
        }
    },
    // Restore pointers to any connected child blocks.
    restoreConnections_: function () {
        for (var i = 1; i <= this.elseifCount_; i++) {
            Blockly.Mutator.reconnect(this.statementConnections_[i], this, 'DO' + i);
        }
        if (this.getInput('ELSE')) {
            Blockly.Mutator.reconnect(this.elseStatementConnection_, this, 'ELSE');
        }
    },
    addElse_: function () {
        this.storeConnections_();
        var update = function () {
            this.elseCount_++;
        };
        this.update_(update);
        this.restoreConnections_();
    },
    removeElse_: function () {
        this.storeConnections_();
        var update = function () {
            this.elseCount_--;
        };
        this.update_(update);
        this.restoreConnections_();
    },
    addElseIf_: function () {
        this.storeConnections_();
        var update = function () {
            this.elseifCount_++;
        };
        this.update_(update);
        this.restoreConnections_();
    },
    removeElseIf_: function (arg) {
        this.storeConnections_(arg);
        var update = function () {
            this.elseifCount_--;
        };
        this.update_(update);
        this.restoreConnections_();
    },
    update_: function (update) {
        return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @this Blockly.Block
     * @private
     */
    updateShape_: function () {
        this.saveDropdownFields_();
        // Delete everything.
        if (this.getInput('ELSE')) {
            this.removeInput('ELSE');
            this.removeInput('ELSETITLE');
            this.removeInput('ELSEBUTTONS');
        }
        var i = 1;
        while (this.getInput('ELSEIF' + i)) {
            this.removeInput('ELSEIF' + i);
            this.removeInput('IFTITLE' + i);
            this.removeInput('IFBUTTONS' + i);
            this.removeInput('DO' + i);
            i++;
        }
        var that = this;
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            var removeElseIf = function (arg) {
                return function () {
                    that.removeElseIf_(arg);
                };
            }(i);
            this.appendDummyInput('ELSEIF' + i)
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF)
                .appendField(new Blockly.FieldDropdown(this.remoteButtonDropdown), 'COMMAND' + i)
                .appendField(Blockly.Msg.ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_RECEIVED_THEN);
            this.appendDummyInput('IFTITLE' + i)
            this.appendDummyInput('IFBUTTONS' + i)
                .appendField(
                    new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize,
                        this.buttonSize, "*", removeElseIf, false))
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendStatementInput('DO' + i)
        }
        if (this.elseCount_) {
            this.appendDummyInput('ELSETITLE')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
            this.appendDummyInput('ELSEBUTTONS')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(
                    new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize,
                        this.buttonSize, "*", that.removeElse_.bind(that), false));
            this.appendStatementInput('ELSE')
        }
        if (this.getInput('ADDBUTTON')) this.removeInput('ADDBUTTON');
        var that = this;
        var addElseIf = function () {
            return function () {
                if (that.elseCount_ == 0) {
                    that.addElse_();
                } else {
                    if (!that.elseifCount_) that.elseifCount_ = 0;
                    that.addElseIf_();
                }
            };
        }();
        this.appendDummyInput('ADDBUTTON')
            .appendField(
                new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize,
                    this.buttonSize, "*", addElseIf, false));
        this.restoreDropdownFields_();
    },
    /**
     * Reconstructs the block with all child blocks attached.
     */
    rebuildShape_: function () {
        var statementConnections = [null];
        var elseStatementConnection = null;
        if (this.getInput('ELSE')) {
            elseStatementConnection = this.getInput('ELSE')
                .connection.targetConnection;
        }
        var i = 1;
        while (this.getInput('ELSEIF' + i)) {
            var inputDo = this.getInput('DO' + i);
            statementConnections.push(inputDo.connection.targetConnection);
            i++;
        }
        this.updateShape_();
        this.reconnectChildBlocks_(statementConnections,
            elseStatementConnection);
    },
    /**
     * Reconnects child blocks.
     * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
     * statement connections for do input.
     * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
     * connection for else input.
     */
    reconnectChildBlocks_: function (statementConnections,
        elseStatementConnection) {
        for (var i = 1; i <= this.elseifCount_; i++) {
            Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
        Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
    },
    saveDropdownFields_: function () {
        this.dropdownFieldsValue = new Array();
        for (var i = 1; i <= this.elseifCount_ - 1; i++) {
            this.dropdownFieldsValue.push(this.getFieldValue('COMMAND' + i))
        }
    },
    restoreDropdownFields_: function () {
        for (var i = 1; i <= this.elseifCount_ - 1; i++) {
            if (this.dropdownFieldsValue[i - 1] !== null) {
                this.getField('COMMAND' + i).setValue(this.dropdownFieldsValue[i - 1]);
            }
        }
    }
};

/**
 * Performs final setup of 'robots_CutebotPro_(runSquare, runWithAngle, placeWithAngle, runDistance, turnWheel)' blocks.
 * @this {Blockly.Block}
 */
Blockly.Constants.Robots.ROBOTS_CUTEBOTPRO_RUN_WAITING_INIT_EXTENSION = function () {
    this.wait_ = false;
    this.update_(this.updateField_);
};

/**
 * Mixin for mutator functions in 'robots_CutebotPro_(runSquare, runWithAngle, placeWithAngle, runDistance, turnWheel)' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Robots.ROBOTS_CUTEBOTPRO_RUN_WAITING_MUTATOR_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('wait', 'ROBOTS_CUTEBOTPRO_RUN_WAITING', 'dropdown', [
        ["%{BKY_ROBOTS_CUTEBOTPRO_RUN_WAITING_YES}", "YES"],
        ["%{BKY_ROBOTS_CUTEBOTPRO_RUN_WAITING_NO}", "NO"]
    ]);

// Initialization extensions
Blockly.Extensions.register('robots_onRemoteCommandReceived_init',
    Blockly.Constants.Robots.ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_INIT_EXTENSION);

Blockly.Extensions.register("robots_CutebotPro_runWaiting_init",
    Blockly.Constants.Robots.ROBOTS_CUTEBOTPRO_RUN_WAITING_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator("robots_onRemoteCommandReceived_mutator",
    Blockly.Constants.Robots.ROBOTS_REMOTECONTROL_ONCOMMANDRECEIVED_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('robots_CutebotPro_runWaiting_mutator',
    Blockly.Constants.Robots.ROBOTS_CUTEBOTPRO_RUN_WAITING_MUTATOR_MIXIN);