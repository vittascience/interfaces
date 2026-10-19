/**
 * @fileoverview Robots blocks for STM32.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // BLOCK DONUTBOT ULTRASONIC RANGER
    {
        "type": "robots_donutbot_getUltrasonicRange",
        "message0": "%{BKY_ROBOTS_DONUTBOT_ULTRASONICRANGER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(cm)", "cm"],
                ["(mm)", "mm"]
            ]
        }],
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
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(cm)", "cm"],
                ["(mm)", "mm"]
            ]
        }],
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
                ["%{BKY_ROBOTS_GO_FORWARD}", "FORWARD"],
                ["%{BKY_ROBOTS_GO_BACKWARD}", "REVERSE"]
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