/**
 * @fileoverview Robots blocks for Raspberry Pi Pico.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Begin Kitronik blocks */

    // BLOCK KITRONIK MOVE
    {
        "type": "robots_moveKitro",
        "message0": "%{BKY_ROBOTS_KITRO_MOVE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_KITRO_MOVE_FORWARD}", "f"],
                ["%{BKY_ROBOTS_KITRO_MOVE_BACKWARD}", "r"]
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
        "tooltip": "%{BKY_ROBOTS_KITRO_MOVE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITRONIK ROTATE
    {
        "type": "robots_rotateKitro",
        "message0": "%{BKY_ROBOTS_KITRO_ROTATE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_KITRO_ROTATE_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_KITRO_ROTATE_LEFT}", "LEFT"]
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
        "tooltip": "%{BKY_ROBOTS_KITRO_ROTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITRONIK STOP
    {
        "type": "robots_stopKitro",
        "message0": "%{BKY_ROBOTS_KITRO_STOP_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITRO_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITRONIK CONTROL MOTOR
    {
        "type": "robots_controlKitroMotors",
        "message0": "%{BKY_ROBOTS_KITRO_CONTROL_MOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_KITRO_MOTOR_RIGHT}", "r"],
                ["%{BKY_ROBOTS_KITRO_MOTOR_LEFT}", "l"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "f"],
                ["↺", "r"]
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
        "tooltip": "%{BKY_ROBOTS_KITRO_CONTROL_MOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITRONIK SET ROTATION ANGLE
    {
        "type": "robots_setKitroRotationAngle",
        "message0": "%{BKY_ROBOTS_KITRO_SETANGLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITRO_SETANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITRONIK MOVE ONE SQUARE FORWARD
    {
        "type": "robots_moveKitroOneSquareForward",
        "message0": "%{BKY_ROBOTS_KITRO_MOVE_ONE_SQUARE_FORWARD_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITRO_MOVE_ONE_SQUARE_FORWARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITRONIK MOVE ONE SQUARE BACKWARD
    {
        "type": "robots_moveKitroOneSquareBackward",
        "message0": "%{BKY_ROBOTS_KITRO_MOVE_ONE_SQUARE_BACKWARD_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITRO_MOVE_ONE_SQUARE_BACKWARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITRONIK ROTATE LEFT
    {
        "type": "robots_rotateKitroLeft",
        "message0": "%{BKY_ROBOTS_KITRO_ROTATE_LEFT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITRO_ROTATE_LEFT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITRONIK ROTATE RIGHT
    {
        "type": "robots_rotateKitroRight",
        "message0": "%{BKY_ROBOTS_KITRO_ROTATE_RIGHT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITRO_ROTATE_RIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITRONIK ULTRASONIC RANGER
    {
        "type": "robots_KitroUltrasonicRanger",
        "message0": "%{BKY_ROBOTS_KITRO_ULTRASONICRANGER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_ROBOTS_KITRO_ULTRASONIC_DISTANCE}", "DIST"],
                ["%{BKY_ROBOTS_KITRO_ULTRASONIC_DURATION}", "TIME"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "SENSOR",
            "options": [
                ["%{BKY_ROBOTS_KITRO_ULTRASONIC_SENSOR_FRONT}", "f"],
                ["%{BKY_ROBOTS_KITRO_ULTRASONIC_SENSOR_BACK}", "r"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITRO_ULTRASONICRANGER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITRONIK READ LINE FINDER
    {
        "type": "robots_readKitroLineFinder",
        "message0": "%{BKY_ROBOTS_KITRO_READ_LINE_FINDER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SENSOR",
            "options": [
                ["%{BKY_ROBOTS_KITRO_LINE_RIGHT}", "r"],
                ["%{BKY_ROBOTS_KITRO_LINE_LEFT}", "l"],
                ["%{BKY_ROBOTS_KITRO_LINE_CENTER}", "c"]
            ]
        }],
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_KITRO_READ_LINE_FINDER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITRONIK CONTROL LED COLOR
    {
        "type": "robots_controlKitroColorLed",
        "message0": "%{BKY_ROBOTS_KITRO_CONTROL_LED_COLOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_ROBOTS_KITRO_TOP_LEFT}", "0"],
                ["%{BKY_ROBOTS_KITRO_TOP_RIGHT}", "1"],
                ["%{BKY_ROBOTS_KITRO_BOT_RIGHT}", "2"],
                ["%{BKY_ROBOTS_KITRO_BOT_LEFT}", "3"]
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
        "tooltip": "%{BKY_ROBOTS_KITRO_CONTROL_LED_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK KITRONIK CONTROL RGB LED
    {
        "type": "robots_controlKitroRGBLed",
        "message0": "%{BKY_ROBOTS_KITRO_CONTROL_RGB_LED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_ROBOTS_KITRO_TOP_LEFT}", "0"],
                ["%{BKY_ROBOTS_KITRO_TOP_RIGHT}", "1"],
                ["%{BKY_ROBOTS_KITRO_BOT_RIGHT}", "2"],
                ["%{BKY_ROBOTS_KITRO_BOT_LEFT}", "3"]
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
        "tooltip": "%{BKY_ROBOTS_KITRO_CONTROL_RGB_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
]);