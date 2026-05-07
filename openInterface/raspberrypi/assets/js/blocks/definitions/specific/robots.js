/**
 * @fileoverview Robots blocks for Raspberry Pi.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Begin G1 Tank Control blocks */

    // BLOCK YAHBOOM - SET LED COLOR
    {
        "type": "robots_yahboom_g1tank_setLedColor",
        "message0": "%{BKY_ROBOTS_YAHBOOM_SET_LED_COLOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "COLOR",
            "options": [
                ["%{BKY_COLOUR_RED}", "RED"],
                ["%{BKY_COLOUR_GREEN}", "GREEN"],
                ["%{BKY_COLOUR_BLUE}", "BLUE"]
            ]
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ROBOTS_YAHBOOM_SET_LED_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK YAHBOOM - SET LED COLOR RGB
    {
        "type": "robots_yahboom_g1tank_setLedColor_RGB",
        "message0": "%{BKY_ROBOTS_YAHBOOM_SET_LED_COLOR_RGB_TITLE}",
        "args0": [{
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
        "tooltip": "%{BKY_ROBOTS_YAHBOOM_SET_LED_COLOR_RGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK YAHBOOM - SET LED COLOR PALETTE
    {
        "type": "robots_yahboom_g1tank_setLedColor_Palette",
        "message0": "%{BKY_ROBOTS_YAHBOOM_SET_LED_COLOR_PALETTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ROBOTS_YAHBOOM_SET_LED_COLOR_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK YAHBOOM _ LED SERVO SET POSITION
    {
        "type": "robots_yahboom_g1tank_setLEDServoAngle",
        "message0": "%{BKY_ROBOTS_YAHBOOM_LED_SERVO_SETANGLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ROBOTS_YAHBOOM_LED_SERVO_SETANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK YAHBOOM _ LED SERVO SET POSITION
    {
        "type": "robots_yahboom_g1tank_waitKEY",
        "message0": "%{BKY_ROBOTS_YAHBOOM_WAIT_KEY_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ROBOTS_YAHBOOM_WAIT_KEY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    /* Begin G1 Tank Detection blocks */

    // BLOCK ULTRASONIC SENSOR _ GET DISTANCE
    {
        "type": "robots_yahboom_g1tank_getUltrasonicRanger",
        "message0": "%{BKY_ROBOTS_YAHBOOM_GETULTRASONIC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_SENSORS_ULTRASONIC_DISTANCE}", "DIST"],
                ["%{BKY_SENSORS_ULTRASONIC_DURATION}", "TIME"]
            ],
        }],
        "output": "Number",
        "tooltip": "%{BKY_ROBOTS_YAHBOOM_GETULTRASONIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK YAHBOOM _ GET LINE FINDER STATE
    {
        "type": "robots_yahboom_g1tank_getLineFinderState",
        "message0": "%{BKY_ROBOTS_YAHBOOM_GET_LINE_FINDER_STATE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SENSOR",
            "options": [
                ["P1", "P1"],
                ["P2", "P2"],
                ["P3", "P3"],
                ["P4", "P4"]
            ],
        }],
        "output": "Boolean",
        "tooltip": "%{BKY_ROBOTS_YAHBOOM_GET_LINE_FINDER_STATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    /* Begin G1 Tank Moving blocks */

    // BLOCK YAHBOOM - SET GO
    {
        "type": "robots_yahboom_g1tank_setGo",
        "message0": "%{BKY_ROBOTS_YAHBOOM_SETGO_TITLE}",
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
        "tooltip": "%{BKY_ROBOTS_YAHBOOM_SETGO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK YAHBOOM - STOP MOTORS
    {
        "type": "robots_yahboom_g1tank_stop",
        "message0": "%{BKY_ROBOTS_YAHBOOM_STOP_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ROBOTS_YAHBOOM_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK YAHBOOM - TURN ROBOT
    {
        "type": "robots_yahboom_g1tank_turn",
        "message0": "%{BKY_ROBOTS_YAHBOOM_TURN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_YAHBOOM_TURN_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_YAHBOOM_TURN_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ROBOTS_YAHBOOM_TURN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK YAHBOOM - SPIN ROBOT
    {
        "type": "robots_yahboom_g1tank_spin",
        "message0": "%{BKY_ROBOTS_YAHBOOM_SPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_YAHBOOM_TURN_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_YAHBOOM_TURN_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ROBOTS_YAHBOOM_SPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK YAHBOOM - CONTROL MOTOR
    {
        "type": "robots_yahboom_g1tank_controlMotors",
        "message0": "%{BKY_ROBOTS_YAHBOOM_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_YAHBOOM_MOTOR_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_YAHBOOM_MOTOR_LEFT}", "LEFT"],
                ["%{BKY_ROBOTS_YAHBOOM_MOTOR_BOTH}", "BOTH"]
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
        "tooltip": "%{BKY_ROBOTS_YAHBOOM_CONTROLMOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    /* Begin G1 Tank Moving blocks */

    // BLOCK YAHBOOM _ CAMERA SERVO SET POSITION - PAN
    {
        "type": "robots_yahboom_g1tank_setCameraPanAngle",
        "message0": "%{BKY_ROBOTS_YAHBOOM_CAMERA_SETANGLE_PAN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ROBOTS_YAHBOOM_CAMERA_SETANGLE_PAN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK YAHBOOM _ CAMERA SERVO SET POSITION - TILT
    {
        "type": "robots_yahboom_g1tank_setCameraTiltAngle",
        "message0": "%{BKY_ROBOTS_YAHBOOM_CAMERA_SETANGLE_TILT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ROBOTS_YAHBOOM_CAMERA_SETANGLE_TILT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

]);

Blockly.Constants.Robots = Object.create(null);
