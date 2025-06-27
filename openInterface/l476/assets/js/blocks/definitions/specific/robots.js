/**
 * @fileoverview Robots blocks for L476.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Begin Alphabot blocks */

    // BLOCK ALPHABOT ULTRASONIC RANGER
    {
        "type": "robots_alphabot_getUltrasonicRange",
        "message0": "%{BKY_ROBOTS_ALPHABOT_ULTRASONICRANGER_TITLE}",
        "output": "Number",
        "inputsInline": true,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_ULTRASONICRANGER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ALPHABOT LINE FINDER - CALIBRATE
    {
        "type": "robots_alphabot_lineFinder_calibrate",
        "message0": "%{BKY_ROBOTS_ALPHABOT_LINEFINDER_CALIBRATE_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_LINEFINDER_CALIBRATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ALPHABOT LINE FINDER - READ SENSORS
    {
        "type": "robots_alphabot_lineFinder_readSensors",
        "message0": "%{BKY_ROBOTS_ALPHABOT_LINEFINDER_READSENSORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SENSOR",
            "options": [
                ["IR1", "1"],
                ["IR2", "2"],
                ["IR3", "3"],
                ["IR4", "4"],
                ["IR5", "5"],
                ["%{BKY_ROBOTS_ALPHABOT_ALL_SENSORS}", "ALL"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_LINEFINDER_READSENSORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ALPHABOT LINE FINDER - GET SENSOR ABOVE LINE
    {
        "type": "robots_alphabot_lineFinder_getSensorAboveLine",
        "message0": "%{BKY_ROBOTS_ALPHABOT_LINEFINDER_GETSENSORABOVELINE_TITLE}",
        "inputsInline": true,
        "output": "String",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_LINEFINDER_GETSENSORABOVELINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_alphabot_lineFinder_sensorAboveLine_init"
        ],
        "mutator": "robots_alphabot_lineFinder_sensorAboveLine_mutator"
    },

    // BLOCK ALPHABOT LINE FINDER - GET SENSOR ABOVE LINE
    {
        "type": "robots_alphabot_lineFinder_isSensorAboveLine",
        "message0": "%{BKY_ROBOTS_ALPHABOT_LINEFINDER_ISSENSORABOVELINE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SENSOR",
            "options": [
                ["IR1", "'IR1'"],
                ["IR2", "'IR2'"],
                ["IR3", "'IR3'"],
                ["IR4", "'IR4'"],
                ["IR5", "'IR5'"]
            ]
        }],
        "inputsInline": true,
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_LINEFINDER_ISSENSORABOVELINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_alphabot_lineFinder_sensorAboveLine_init"
        ],
        "mutator": "robots_alphabot_lineFinder_sensorAboveLine_mutator"
    },

    // BLOCK ALPHABOT ON REMOTE CONTROL COMMAND RECEIVED
    {
        "type": "robots_alphabot_lineFinder_onAboveAnySensor",
        "message0": "%{BKY_ROBOTS_ALPHABOT_LINEFINDER_ONABOVEANYSENSOR_TITLE}",
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
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_LINEFINDER_ONABOVEANYSENSOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_alphabot_lineFinder_onAboveAnySensor_init"
        ],
        "mutator": "robots_alphabot_lineFinder_onAboveAnySensor_mutator",
    },

    // BLOCK ALPHABOT READ OBSTACLE DETECTOR (PCF8574T)
    {
        "type": "robots_alphabot_readObstacleDetector",
        "message0": "%{BKY_ROBOTS_ALPHABOT_READOBSTACLEDETECTOR_TITLE}",
        "output": "String",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_READOBSTACLEDETECTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ALPHABOT ON REMOTE CONTROL COMMAND RECEIVED
    {
        "type": "robots_alphabot_onObstacleDetected",
        "message0": "%{BKY_ROBOTS_ALPHABOT_ONOBSTACLEDETECTED_TITLE}",
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
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_ONOBSTACLEDETECTED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_alphabot_onObstacleDetected_init"
        ],
        "mutator": "robots_alphabot_onObstacleDetected_mutator",
    },

    // BLOCK ALPHABOT CONTROL GO
    {
        "type": "robots_alphabot_setGo",
        "message0": "%{BKY_ROBOTS_ALPHABOT_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_ALPHABOT_GO_FORWARD}", "FORWARD"],
                ["%{BKY_ROBOTS_ALPHABOT_GO_REVERSE}", "REVERSE"]
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
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_GO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ALPHABOT TURN TO (RIGHT or LEFT)
    {
        "type": "robots_alphabot_turnTo",
        "message0": "%{BKY_ROBOTS_ALPHABOT_TURNTO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_ALPHABOT_RIGHT_BIS}", "RIGHT"],
                ["%{BKY_ROBOTS_ALPHABOT_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_TURNTO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ALPHABOT CONTROL MOTOR
    {
        "type": "robots_alphabot_controlMotor",
        "message0": "%{BKY_ROBOTS_ALPHABOT_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_ALPHABOT_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_ALPHABOT_LEFT}", "LEFT"]
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
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_CONTROLMOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ALPHABOT STOP MOTORS
    {
        "type": "robots_alphabot_stopMotors",
        "message0": "%{BKY_ROBOTS_ALPHABOT_STOPMOTORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_ALPHABOT_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_ALPHABOT_LEFT}", "LEFT"],
                ["%{BKY_ROBOTS_ALPHABOT_RIGHT&LEFT}", "BOTH"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_STOPMOTORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ALPHABOT ON REMOTE CONTROL COMMAND RECEIVED - BASIC BLACK REMOTE
    {
        "type": "robots_alphabot_onRemoteCommandReceived",
        "message0": "%{BKY_ROBOTS_ALPHABOT_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
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
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_REMOTECONTROL_ONCOMMANDRECEIVED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_alphabot_onRemoteCommandReceived_init"
        ],
        "mutator": "robots_alphabot_onRemoteCommandReceived_mutator",
    },

    // BLOCK ALPHABOT ON REMOTE CONTROL COMMAND RECEIVED - C AR MP3 GRAY REMOTE
    {
        "type": "robots_alphabot_onRemoteCommandReceived_car_mp3_gray",
        "message0": "%{BKY_ROBOTS_ALPHABOT_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
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
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_REMOTECONTROL_ONCOMMANDRECEIVED_CAR_MP3_GRAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_alphabot_onRemoteCommandReceived_init"
        ],
        "mutator": "robots_alphabot_onRemoteCommandReceived_mutator",
    },

    // BLOCK ALPHABOT OLED ADD TEXT 
    {
        "type": "robots_alphabot_oled_addText",
        "message0": "%{BKY_ROBOTS_ALPHABOT_OLED_ADDTEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }, {
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_OLED_ADDTEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ALPHABOT OLED CLEAR DISPLAY
    {
        "type": "robots_alphabot_oled_clearScreen",
        "message0": "%{BKY_ROBOTS_ALPHABOT_OLED_CLEARSCREEN_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_OLED_CLEARSCREEN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ALPHABOT OLED SET BACKGROUND
    {
        "type": "robots_alphabot_oled_setBackground",
        "message0": "%{BKY_ROBOTS_ALPHABOT_OLED_SETBACKGROUND_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BACKGROUND",
            "options": [
                ["%{BKY_ROBOTS_ALPHABOT_OLED_YELLOW_BLUE}", "1"],
                ["%{BKY_ROBOTS_ALPHABOT_OLED_BLACK}", "0"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_OLED_SETBACKGROUND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ALPHABOT NEOPIXEL SET COLOR
    {
        "type": "robots_alphabot_neopixel_setColor",
        "message0": "%{BKY_ROBOTS_ALPHABOT_NEOPIXEL_SETCOLOR_TITLE}",
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
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_NEOPIXEL_SETCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ALPHABOT NEOPIXEL SET PALETTE COLOR
    {
        "type": "robots_alphabot_neopixel_setPaletteColor",
        "message0": "%{BKY_ROBOTS_ALPHABOT_NEOPIXEL_SETPALETTECOLOR_TITLE}",
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
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_NEOPIXEL_SETPALETTECOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ALPHABOT RAINBOW
    {
        "type": "robots_alphabot_neopixel_setRainbow",
        "message0": "%{BKY_ROBOTS_ALPHABOT_NEOPIXEL_SETRAINBOW_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_NEOPIXEL_SETRAINBOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ALPHABOT SET BUZZER STATE
    {
        "type": "robots_alphabot_buzzer_controlState",
        "message0": "%{BKY_ROBOTS_ALPHABOT_BUZZER_CONTROLSTATE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_BUZZER_CONTROLSTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ALPHABOT ON REMOTE CONTROL COMMAND RECEIVED
    {
        "type": "robots_alphabot_joystick_onCommandReceived",
        "message0": "%{BKY_ROBOTS_ALPHABOT_JOYSTICK_ONCOMMANDRECEIVED_TITLE}",
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
        "tooltip": "%{BKY_ROBOTS_ALPHABOT_JOYSTICK_ONCOMMANDRECEIVED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_alphabot_joystick_onCommandReceived_init"
        ],
        "mutator": "robots_alphabot_joystick_onCommandReceived_mutator",
    },

    /* Begin donutbot blocks */

    // BLOCK DONUTBOT ULTRASONIC RANGER
    {
        "type": "robots_donutbot_getUltrasonicRange",
        "message0": "%{BKY_ROBOTS_DONUTBOT_ULTRASONICRANGER_TITLE}",
        "output": "Number",
        "inputsInline": true,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_ULTRASONICRANGER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT LINE DETECTOR 
    {
        "type": "robots_donutbot_lineDetector",
        "message0": "%{BKY_ROBOTS_DONUTBOT_LINE_DETECTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SIDE",
            "options": [
                ["%{BKY_ROBOTS_DONUTBOT_DETECTOR_LEFT}", "left"],
                ["%{BKY_ROBOTS_DONUTBOT_DETECTOR_MIDDLE}", "center"],
                ["%{BKY_ROBOTS_DONUTBOT_DETECTOR_RIGHT}", "right"],
            ]
        }],
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_LINE_DETECTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT LINE DETECTOR 
    {
        "type": "robots_donutbot_lineDetectorFunction",
        "message0": "%{BKY_ROBOTS_DONUTBOT_LINE_DETECTOR_FUNCTION_TITLE}",
       "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_LINE_DETECTOR_FUNCTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

     // BLOCK DONUTBOT LINE DETECTOR  THRESHOLD
     {
        "type": "robots_donutbot_lineDetectorThreshold",
        "message0": "%{BKY_ROBOTS_DONUTBOT_LINE_DETECTOR_THRESHOLD_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "THRESHOLD",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_LINE_DETECTOR_THRESHOLD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT COLOR DETECTOR 
    {
        "type": "robots_donutbot_colorDetector",
        "message0": "%{BKY_ROBOTS_DONUTBOT_COLOR_DETECTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SIDE",
            "options": [
                ["%{BKY_ROBOTS_DONUTBOT_DETECTOR_MIDDLE}", "center"],
                ["%{BKY_ROBOTS_DONUTBOT_DETECTOR_RIGHT}", "right"],
                ["%{BKY_ROBOTS_DONUTBOT_DETECTOR_LEFT}", "left"]
            ]
        }],
        "output": "Array",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_COLOR_DETECTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT COLOR DETECTOR AVERAGE
    {
        "type": "robots_donutbot_colorDetector_average",
        "message0": "%{BKY_ROBOTS_DONUTBOT_COLOR_DETECTOR_AVERAGE_TITLE}",
        "output": "Array",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_COLOR_DETECTOR_AVERAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT COLOR DETECTOR NAME
    {
        "type": "robots_donutbot_colorDetector_name",
        "message0": "%{BKY_ROBOTS_DONUTBOT_COLOR_DETECTOR_NAME_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SIDE",
            "options": [
                ["%{BKY_ROBOTS_DONUTBOT_DETECTOR_MIDDLE}", "center"],
                ["%{BKY_ROBOTS_DONUTBOT_DETECTOR_RIGHT}", "right"],
                ["%{BKY_ROBOTS_DONUTBOT_DETECTOR_LEFT}", "left"]
            ]
        }],
        "output": "String",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_COLOR_DETECTOR_NAME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT READ OBSTACLE DETECTOR
    {
        "type": "robots_donutbot_readDistance",
        "message0": "%{BKY_ROBOTS_DONUTBOT_DISTANCE_TITLE}",
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_DISTANCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT CONTROL GO
    {
        "type": "robots_donutbot_setGo",
        "message0": "%{BKY_ROBOTS_DONUTBOT_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_DONUTBOT_GO_FORWARD}", "FORWARD"],
                ["%{BKY_ROBOTS_DONUTBOT_GO_REVERSE}", "REVERSE"]
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
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_GO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT TURN TO (RIGHT or LEFT)
    {
        "type": "robots_donutbot_turnTo",
        "message0": "%{BKY_ROBOTS_DONUTBOT_TURNTO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_DONUTBOT_TURN_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_DONUTBOT_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_TURNTO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT CONTROL MOTOR
    {
        "type": "robots_donutbot_controlMotor",
        "message0": "%{BKY_ROBOTS_DONUTBOT_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_DONUTBOT_RIGHT}", "2"],
                ["%{BKY_ROBOTS_DONUTBOT_LEFT}", "1"]
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
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_CONTROLMOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT - TURN
    {
        "type": "robots_donutbot_turnToAngle",
        "message0": "%{BKY_ROBOTS_DONUTBOT_TURNTO_ANGLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_DONUTBOT_LEFT}", "-1"],
                ["%{BKY_ROBOTS_DONUTBOT_TURN_RIGHT}", "1"]
            ]
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        },
        {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_TURNTO_ANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK DONUTBOT MOVE ONE SQUARE FORWARD
    {
        "type": "robots_donutbot_moveOneSquareForward",
        "message0": "%{BKY_ROBOTS_DONUTBOT_MOVE_ONE_SQUARE_FORWARD_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_MOVE_ONE_SQUARE_FORWARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT MOVE ONE SQUARE BACKWARD
    {
        "type": "robots_donutbot_moveOneSquareBackward",
        "message0": "%{BKY_ROBOTS_DONUTBOT_MOVE_ONE_SQUARE_BACKWARD_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_MOVE_ONE_SQUARE_BACKWARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT TURN LEFT
    {
        "type": "robots_donutbot_turnLeft",
        "message0": "%{BKY_ROBOTS_DONUTBOT_TURN_LEFT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_TURN_LEFT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT TURN RIGHT
    {
        "type": "robots_donutbot_turnRight",
        "message0": "%{BKY_ROBOTS_DONUTBOT_TURN_RIGHT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_TURN_RIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT STOP MOTORS
    {
        "type": "robots_donutbot_stopMotors",
        "message0": "%{BKY_ROBOTS_DONUTBOT_STOPMOTORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_DONUTBOT_RIGHT}", "2"],
                ["%{BKY_ROBOTS_DONUTBOT_LEFT}", "1"],
                ["%{BKY_ROBOTS_DONUTBOT_RIGHT&LEFT}", "'both'"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_STOPMOTORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT RELEASE MOTORS
    {
        "type": "robots_donutbot_releaseMotors",
        "message0": "%{BKY_ROBOTS_DONUTBOT_RELEASEMOTORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_DONUTBOT_RIGHT}", "2"],
                ["%{BKY_ROBOTS_DONUTBOT_LEFT}", "1"],
                ["%{BKY_ROBOTS_DONUTBOT_RIGHT&LEFT}", "'both'"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_RELEASEMOTORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT NEOPIXEL SET COLOR
    {
        "type": "robots_donutbot_neopixel_setColor",
        "message0": "%{BKY_ROBOTS_DONUTBOT_NEOPIXEL_SETCOLOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["les 8 LEDs", "all"]
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
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_NEOPIXEL_SETCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT NEOPIXEL SET PALETTE COLOR
    {
        "type": "robots_donutbot_neopixel_setPaletteColor",
        "message0": "%{BKY_ROBOTS_DONUTBOT_NEOPIXEL_SETPALETTECOLOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["les 8 LEDs", "all"]
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
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_NEOPIXEL_SETPALETTECOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT BLINK ROBOT
    {
        "type": "robots_donutbot_blinkRobot",
        "message0": "%{BKY_ROBOTS_DONUTBOT_BLINK_ROBOT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_BLINK_ROBOT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT RAINBOW
    {
        "type": "robots_donutbot_neopixel_setRainbow",
        "message0": "%{BKY_ROBOTS_DONUTBOT_NEOPIXEL_SETRAINBOW_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_NEOPIXEL_SETRAINBOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DONUTBOT BUTTONS ON PRESSED
    {
        "type": "robots_donutbot_buttons_onPressed",
        "message0": "%{BKY_ROBOTS_DONUTBOT_BUTTONS_ONPRESSED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": [
                ["%{BKY_ROBOTS_DONUTBOT_BUTTON_FRONT}", "'D6'"],
                ["%{BKY_ROBOTS_DONUTBOT_BUTTON_BACK}", "'D11'"],
                ["%{BKY_ROBOTS_DONUTBOT_BUTTON_LEFT}", "'D7'"],
                ["%{BKY_ROBOTS_DONUTBOT_BUTTON_RIGHT}", "'D10'"],
                ["%{BKY_ROBOTS_DONUTBOT_BUTTON_CENTER}", "'D9'"],
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_ROBOTS_DONUTBOT_BUTTONS_PRESSED}", "0"],
                ["%{BKY_ROBOTS_DONUTBOT_BUTTONS_RELEASED}", "1"]
            ]
        }],
        "inputsInline": true,
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_BUTTONS_ONPRESSED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK DONUTBOT Bluetooth - Send Data
    {
        "type": "robots_donutbot_BLE_SendData",
        "message0": "%{BKY_ROBOTS_DONUTBOT_BLE_SEND_DATA_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_BLE_SEND_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },


    // //BLOCK DONUTBOT Bluetooth - Read DATA
    {
        "type": "robots_donutbot_BLE_ReadData",
        "message0": "%{BKY_ROBOTS_DONUTBOT_BLE_READ_DATA_TITLE}",
        "args0": [{
            "type": "field_variable",
            "name": "VAR",
            "variable": "bluetoothData"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DONUTBOT_BLE_READ_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Robots = Object.create(null);

/**
* Performs final setup of 'robots_alphabot_lineFinder_[]SensorAboveLine' blocks.
* @this {Blockly.Block}
*/
Blockly.Constants.Robots.ROBOTS_ALPHABOT_LINEFINDER_SENSORABOVELINE_INIT_EXTENSION = function () {
    this.updateField_();
};

/**
* Mixin for mutator functions in the 'robots_alphabot_lineFinder_[]SensorAboveLine' extension.
* @mixin
* @augments Blockly.Block
* @package
*/
Blockly.Constants.Robots.ROBOTS_ALPHABOT_LINEFINDER_SENSORABOVLINE_MUTATOR_MIXIN = {
    /**
    * Create XML to represent list inputs.
    * @return {!Element} XML storage element.
    * @this {Blockly.Block}
    */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('limit', this.limit_);
        return container;
    },
    /**
    * Parse XML to restore the list inputs.
    * @param {!Element} xmlElement XML storage element.
    * @this {Blockly.Block}
    */
    domToMutation: function (xmlElement) {
        this.limit_ = (xmlElement.getAttribute('limit') != 'false');
        this.updateField_();
    },
    addOptions_: function () {
        this.limit_ = true;
        this.updateField_();
        this.addDefaultBlock({
            "name": "LIMIT",
            "type": "math_number",
            "field_name": "NUM",
            "value": "300"
        });
    },
    removeOptions_: function () {
        this.limit_ = false;
        this.updateField_();
    },
    /**
    * Modify this block to have the correct number of inputs.
    * @private
    * @this {Blockly.Block}
    */
    updateField_: function () {
        var that = this;
        var remove = function () {
            that.removeOptions_();
        };
        var add = function () {
            that.addOptions_();
        };
        // Remove buttons
        if (this.getInput('TOP')) this.removeInput('TOP');
        // Update inputs
        var top = this.appendDummyInput('TOP');
        if (this.limit_) {
            if (!this.getInput("LIMIT")) {
                this.appendDummyInput("LIMIT_FIELD")
                    .appendField(Blockly.Msg['ROBOTS_ALPHABOT_LINEFINDER_LIMIT_VALUE']);
                this.appendValueInput("LIMIT");
            }
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", remove, false));
        } else {
            if (this.getInput('LIMIT_FIELD') && this.getInput("LIMIT")) {
                this.removeInput("LIMIT_FIELD");
                this.removeInput("LIMIT");
            }
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", add, false));
        }
    },
    addDefaultBlock: function (input) {
        return Blockly.Constants.Utils.CONNECT_DEFAULT_BLOCK(this, {
            "input": input.name,
            "type": input.type,
            "name": input.field_name,
            "value": input.value
        });
    }
};

/**
* Performs final setup of 'robots_alphabot_onAboveAnySensor' block.
* @this {Blockly.Block}
*/
Blockly.Constants.Robots.ROBOTS_ALPHABOT_LINEFINDER_ONABOVEANYSENSOR_INIT_EXTENSION = function () {
    this.IR_SENSORS = [
        ["IR1", "IR1"],
        ["IR2", "IR2"],
        ["IR3", "IR3"],
        ["IR4", "IR4"],
        ["IR5", "IR5"]
    ];
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    this.getInput('IF0')
        .appendField(new Blockly.FieldDropdown(this.IR_SENSORS), 'SENSOR0')
        .appendField(Blockly.Msg.ROBOTS_ALPHABOT_LINEFINDER_ONABOVEANYSENSOR_SENSOR_THEN);
    this.updateShape_();
};

/**
* Mixin for mutator functions in the 'robots_alphabot_onAboveAnySensor_mutator' extension.
* @mixin
* @augments Blockly.Block
* @package
*/
Blockly.Constants.Robots.ROBOTS_ALPHABOT_LINEFINDER_ONABOVEANYSENSOR_MUTATOR_MIXIN = {
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
        var that = this;
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
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            var removeElseIf = function (arg) {
                return function () {
                    that.removeElseIf_(arg);
                };
            }(i);
            this.appendDummyInput('ELSEIF' + i)
                .appendField(Blockly.Msg.ROBOTS_ALPHABOT_LINEFINDER_ONABOVEANYSENSOR_ELSEIF)
                .appendField(new Blockly.FieldDropdown(this.IR_SENSORS), 'SENSOR' + i)
                .appendField(Blockly.Msg.ROBOTS_ALPHABOT_LINEFINDER_ONABOVEANYSENSOR_THEN);
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
        if (this.elseifCount_ < 4 || this.elseCount_ == 0) {
            this.appendDummyInput('ADDBUTTON')
                .appendField(
                    new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize,
                        this.buttonSize, "*", addElseIf, false));
        }
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
    }
};

/**
* Performs final setup of 'robots_alphabot_onObstacleDetected' block.
* @this {Blockly.Block}
*/
Blockly.Constants.Robots.ROBOTS_ALPHABOT_ONOBSTACLEDETECTED_INIT_EXTENSION = function () {
    this.OBSTACLES = [
        ["%{BKY_ROBOTS_ALPHABOT_BY_RIGHT}", "RIGHT"],
        ["%{BKY_ROBOTS_ALPHABOT_BY_LEFT}", "LEFT"],
        ["%{BKY_ROBOTS_ALPHABOT_BOTH_SIDES}", "BOTH"]
    ];
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    this.getInput('IF0')
        .appendField(new Blockly.FieldDropdown(this.OBSTACLES), 'DETECTION0')
        .appendField(Blockly.Msg.ROBOTS_ALPHABOT_ONOBSTACLEDETECTED_BY_IR_THEN);
    this.updateShape_();
};

/**
* Mixin for mutator functions in the 'robots_alphabot_onObstacleDetected_mutator' extension.
* @mixin
* @augments Blockly.Block
* @package
*/
Blockly.Constants.Robots.ROBOTS_ALPHABOT_ONOBSTACLEDETECTED_MUTATOR_MIXIN = {
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
        var that = this;
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
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            var removeElseIf = function (arg) {
                return function () {
                    that.removeElseIf_(arg);
                };
            }(i);
            this.appendDummyInput('ELSEIF' + i)
                .appendField(Blockly.Msg.ROBOTS_ALPHABOT_ONOBSTACLEDETECTED_ELSEIF)
                .appendField(new Blockly.FieldDropdown(this.OBSTACLES), 'DETECTION' + i)
                .appendField(Blockly.Msg.ROBOTS_ALPHABOT_ONOBSTACLEDETECTED_THEN);
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
        if (this.elseifCount_ < 2 || this.elseCount_ == 0) {
            this.appendDummyInput('ADDBUTTON')
                .appendField(
                    new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize,
                        this.buttonSize, "*", addElseIf, false));
        }
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
    }
};

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
* Performs final setup of 'robots_alphabot_onRemoteCommandReceived' block.
* @this {Blockly.Block}
*/
Blockly.Constants.Robots.ROBOTS_ALPHABOT_REMOTECONTROL_ONCOMMANDRECEIVED_INIT_EXTENSION = function () {
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    this.dropdownFieldsValue = new Array();
    if (this.type == "robots_alphabot_onRemoteCommandReceived_car_mp3_gray") {
        this.remoteButtonDropdown = Blockly.Constants.Robots.NEC_CAR_MP3_REMOTE_BUTTONS;
        this.thenHeadTitle = 'ROBOTS_ALPHABOT_REMOTECONTROL_ONCOMMANDRECEIVED_CAR_MP3_GRAY_DETECTED_THEN';
    } else {
        this.remoteButtonDropdown = Blockly.Constants.Robots.NEC_BASIC_BLACK_REMOTE_BUTTONS;
        this.thenHeadTitle = 'ROBOTS_ALPHABOT_REMOTECONTROL_ONCOMMANDRECEIVED_DETECTED_THEN';
    }
    this.getInput('IF0')
        .appendField(new Blockly.FieldDropdown(this.remoteButtonDropdown), 'COMMAND0')
        .appendField(Blockly.Msg[this.thenHeadTitle]);
    this.update_(this.updateShape_);
};

/**
* Mixin for mutator functions in the 'robots_alphabot_onRemoteCommandReceived_mutator' extension.
* @mixin
* @augments Blockly.Block
* @package
*/
Blockly.Constants.Robots.ROBOTS_ALPHABOT_REMOTECONTROL_ONCOMMANDRECEIVED_MUTATOR_MIXIN = {
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
                .appendField(Blockly.Msg.ROBOTS_ALPHABOT_REMOTECONTROL_ONCOMMANDRECEIVED_RECEIVED_THEN);
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
* Performs final setup of 'robots_alphabot_joystick_onCommandReceived' block.
* @this {Blockly.Block}
*/
Blockly.Constants.Robots.ROBOTS_ALPHABOT_JOYSTICK_ONCOMMANDRECEIVED_INIT_EXTENSION = function () {
    this.JOYSTICK_BUTTONS = [
        ["%{BKY_JOYSTICK_BUTTON_UP}", "up"],
        ["%{BKY_JOYSTICK_BUTTON_DOWN}", "down"],
        ["%{BKY_JOYSTICK_BUTTON_LEFT}", "left"],
        ["%{BKY_JOYSTICK_BUTTON_RIGHT}", "right"],
        ["%{BKY_JOYSTICK_BUTTON_CENTER}", "center"]
    ];
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    this.getInput('IF0')
        .appendField(new Blockly.FieldDropdown(this.JOYSTICK_BUTTONS), 'COMMAND0')
        .appendField(Blockly.Msg.ROBOTS_ALPHABOT_JOYSTICK_ONCOMMANDRECEIVED_DETECTED_THEN);
    this.updateShape_();
};

/**
* Mixin for mutator functions in the 'robots_alphabot_joystick_onCommandReceived_mutator' extension.
* @mixin
* @augments Blockly.Block
* @package
*/
Blockly.Constants.Robots.ROBOTS_ALPHABOT_JOYSTICK_ONCOMMANDRECEIVED_MUTATOR_MIXIN = {
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
        var that = this;
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
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            var removeElseIf = function (arg) {
                return function () {
                    that.removeElseIf_(arg);
                };
            }(i);
            this.appendDummyInput('ELSEIF' + i)
                .appendField(Blockly.Msg.ROBOTS_ALPHABOT_JOYSTICK_ONCOMMANDRECEIVED_ELSEIF)
                .appendField(new Blockly.FieldDropdown(this.JOYSTICK_BUTTONS), 'COMMAND' + i)
                .appendField(Blockly.Msg.ROBOTS_ALPHABOT_JOYSTICK_ONCOMMANDRECEIVED_RECEIVED_THEN);
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
    }
};

// Initialization extensions
Blockly.Extensions.register('robots_alphabot_lineFinder_sensorAboveLine_init',
    Blockly.Constants.Robots.ROBOTS_ALPHABOT_LINEFINDER_SENSORABOVELINE_INIT_EXTENSION);

Blockly.Extensions.register('robots_alphabot_lineFinder_onAboveAnySensor_init',
    Blockly.Constants.Robots.ROBOTS_ALPHABOT_LINEFINDER_ONABOVEANYSENSOR_INIT_EXTENSION);

Blockly.Extensions.register('robots_alphabot_onObstacleDetected_init',
    Blockly.Constants.Robots.ROBOTS_ALPHABOT_ONOBSTACLEDETECTED_INIT_EXTENSION);

Blockly.Extensions.register('robots_alphabot_onRemoteCommandReceived_init',
    Blockly.Constants.Robots.ROBOTS_ALPHABOT_REMOTECONTROL_ONCOMMANDRECEIVED_INIT_EXTENSION);

Blockly.Extensions.register('robots_alphabot_joystick_onCommandReceived_init',
    Blockly.Constants.Robots.ROBOTS_ALPHABOT_JOYSTICK_ONCOMMANDRECEIVED_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator('robots_alphabot_lineFinder_sensorAboveLine_mutator',
    Blockly.Constants.Robots.ROBOTS_ALPHABOT_LINEFINDER_SENSORABOVLINE_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('robots_alphabot_lineFinder_onAboveAnySensor_mutator',
    Blockly.Constants.Robots.ROBOTS_ALPHABOT_LINEFINDER_ONABOVEANYSENSOR_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator("robots_alphabot_onObstacleDetected_mutator",
    Blockly.Constants.Robots.ROBOTS_ALPHABOT_ONOBSTACLEDETECTED_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator("robots_alphabot_onRemoteCommandReceived_mutator",
    Blockly.Constants.Robots.ROBOTS_ALPHABOT_REMOTECONTROL_ONCOMMANDRECEIVED_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator("robots_alphabot_joystick_onCommandReceived_mutator",
    Blockly.Constants.Robots.ROBOTS_ALPHABOT_JOYSTICK_ONCOMMANDRECEIVED_MUTATOR_MIXIN);
