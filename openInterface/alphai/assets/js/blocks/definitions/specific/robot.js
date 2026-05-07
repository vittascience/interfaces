/**
 * @fileoverview Robot blocks for AlphAI.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    // BLOCK PRINT_MESSAGE
    {
        "type": "robot_printMessage",
        "message0": "%{BKY_ROBOT_PRINT_MESSAGE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "MESSAGE",
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robot_blocks",
        "tooltip": "%{BKY_ROBOT_PRINT_MESSAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "robot_setDirection",
        "message0": "%{BKY_ROBOT_SET_DIRECTION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_ROBOT_FORWARD}", "forward"],
                ["%{BKY_ROBOT_BACKWARD}", "backward"],
                ["%{BKY_ROBOT_ROTATE_LEFT}", "left"],
                ["%{BKY_ROBOT_ROTATE_RIGHT}", "right"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robot_blocks",
        "tooltip": "%{BKY_ROBOT_SET_DIRECTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robot_set_duration_init_extension",
        ],
        "mutator": "robot_set_duration_mutator"
    },

    // BLOCK SET_MOTOR
    {
        "type": "robot_setMotor",
        "message0": "%{BKY_ROBOT_SET_MOTOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "MOTOR_LEFT",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "MOTOR_RIGHT",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robot_blocks",
        "tooltip": "%{BKY_ROBOT_SET_MOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robot_set_duration_init_extension",
        ],
        "mutator": "robot_set_duration_mutator"
    },

    // BLOCK STOP
    {
        "type": "robot_stop",
        "message0": "%{BKY_ROBOT_STOP_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robot_blocks",
        "tooltip": "%{BKY_ROBOT_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK IS_BLOCKED
    {
        "type": "robot_isBlocked",
        "message0": "%{BKY_ROBOT_IS_BLOCKED_TITLE}",
        "output": "Boolean",
        "style": "robot_blocks",
        "tooltip": "%{BKY_ROBOT_IS_BLOCKED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET_DISTANCE
    {
        "type": "robot_getDistance",
        "message0": "%{BKY_ROBOT_GET_DISTANCE_TITLE}",
        "output": "Number",
        "style": "robot_blocks",
        "tooltip": "%{BKY_ROBOT_GET_DISTANCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET_INFRA_RED
    {
        "type": "robot_getInfraRed",
        "message0": "%{BKY_ROBOT_GET_INFRA_RED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SENSOR",
            "options": [
                ["IR1", "0"],
                ["IR2", "1"],
                ["IR3", "2"],
                ["IR4", "3"],
                ["IR5", "4"],
                ["%{BKY_ROBOT_ALL_SENSORS}", "ALL"]
            ]
        }],
        "output": ["Number", "Array"],
        "style": "robot_blocks",
        "tooltip": "%{BKY_ROBOT_GET_INFRA_RED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SET_CAMERA
    {
        "type": "robot_setCamera",
        "message0": "%{BKY_ROBOT_SET_CAMERA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "RESOLUTION",
            "options": [
                ["1x1", "1x1"],
                ["2x1", "2x1"],
                ["4x3", "4x3"],
                ["8x6", "8x6"],
                ["12x9", "12x9"],
                ["16x12", "16x12"],
                ["21x16", "21x16"],
                ["32x24", "32x24"],
                ["64x48", "64x48"],
                ["160x120", "160x120"],
                ["320x240", "320x240"],
                ["640x480", "640x480"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robot_blocks",
        "tooltip": "%{BKY_ROBOT_SET_CAMERA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET_CAMERA
    {
        "type": "robot_getCamera",
        "message0": "%{BKY_ROBOT_GET_CAMERA_TITLE}",
        "output": "Array",
        "style": "robot_blocks",
        "tooltip": "%{BKY_ROBOT_GET_CAMERA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SET_LEDS (R,G,B)
    {
        "type": "robot_setLedsRGB",
        "message0": "%{BKY_ROBOT_SET_LEDS_RGB_TITLE}",
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
        "style": "robot_blocks",
        "tooltip": "%{BKY_ROBOT_SET_LEDS_RGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SET_LEDS (palette)
    {
        "type": "robot_setLedsPalette",
        "message0": "%{BKY_ROBOT_SET_LEDS_PALETTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robot_blocks",
        "tooltip": "%{BKY_ROBOT_SET_LEDS_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SET_BUZZER
    {
        "type": "robot_setBuzzer",
        "message0": "%{BKY_ROBOT_SET_BUZZER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_ROBOT_BUZZER_ON}", "True"],
                ["%{BKY_ROBOT_BUZZER_OFF}", "False"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robot_blocks",
        "tooltip": "%{BKY_ROBOT_SET_BUZZER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robot_set_duration_init_extension",
        ],
        "mutator": "robot_set_duration_mutator"
    }

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Robot = Object.create(null);

/**
 * Performs final setup of block with duration.
 * @this {Blockly.Block}
 */
Blockly.Constants.Robot.ROBOT_SET_DURATION_INIT_EXTENSION = function () {
    this.duration_ = false;
    this.update_(this.updateField_);
};

// Initialization extensions
Blockly.Extensions.register('robot_set_duration_init_extension',
    Blockly.Constants.Robot.ROBOT_SET_DURATION_INIT_EXTENSION);

/**
* Mixin for mutator functions in the duration extension.
* @mixin
* @augments Blockly.Block
* @package
*/
Blockly.Constants.Robot.ROBOT_SET_DURATION_MUTATOR_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('duration', 'ROBOT_SET_DURATION', 'input', 1, '(s)');

// Mutator
Blockly.Extensions.registerMutator("robot_set_duration_mutator",
    Blockly.Constants.Robot.ROBOT_SET_DURATION_MUTATOR_MIXIN);