/**
 * @fileoverview Actuators blocks for Lego Spike Prime.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "actuators_startMotorContinuous",
        "message0": "%{BKY_ACTUATORS_START_MOTOR_CONTINUOUS_TITLE}",
        "args0": [
            { "type": "field_grid_dropdown", "name": "PORT", "options": Blockly.Constants.LEGO_PORTS },
            { "type": "field_grid_dropdown", "name": "DIR", "options": Blockly.Constants.LEGO_DIRECTIONS },
            { "type": "input_value", "name": "SPEED", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "actuators_startMotorForTime",
        "message0": "%{BKY_ACTUATORS_START_MOTOR_FOR_TIME_TITLE}",
        "args0": [
            { "type": "field_grid_dropdown", "name": "PORT", "options": Blockly.Constants.LEGO_PORTS },
            { "type": "field_grid_dropdown", "name": "DIR", "options": Blockly.Constants.LEGO_DIRECTIONS },
            { "type": "input_value", "name": "SPEED", "check": "Number" },
            { "type": "input_value", "name": "TIME", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "actuators_moveMotorToPosition",
        "message0": "%{BKY_ACTUATORS_MOVE_MOTOR_TO_POSITION_TITLE}",
        "args0": [
            { "type": "field_grid_dropdown", "name": "PORT", "options": Blockly.Constants.LEGO_PORTS },
            { "type": "input_value", "name": "ANGLE", "check": "Number" },
            { "type": "input_value", "name": "SPEED", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "actuators_moveMotorByDegrees",
        "message0": "%{BKY_ACTUATORS_MOVE_MOTORS_BY_DEGREES_TITLE}",
        "args0": [
            { "type": "field_grid_dropdown", "name": "PORT", "options": Blockly.Constants.LEGO_PORTS },
            { "type": "field_grid_dropdown", "name": "DIR", "options": Blockly.Constants.LEGO_DIRECTIONS },
            { "type": "input_value", "name": "ANGLE", "check": "Number" },
            { "type": "input_value", "name": "SPEED", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "actuators_resetMotorPosition",
        "message0": "%{BKY_ACTUATORS_RESET_MOTOR_POSITION_TITLE}",
        "args0": [
            { "type": "field_grid_dropdown", "name": "PORT", "options": Blockly.Constants.LEGO_PORTS }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "actuators_stopMotor",
        "message0": "%{BKY_ACTUATORS_STOP_MOTOR_TITLE}",
        "args0": [
            { "type": "field_grid_dropdown", "name": "PORT", "options": Blockly.Constants.LEGO_PORTS }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "actuators_pair",
        "message0": "%{BKY_ACTUATORS_PAIR_TITLE}",
        "args0": [
            { "type": "field_grid_dropdown", "name": "LEFT", "options": Blockly.Constants.LEGO_PORTS },
            // B first: the default pair must use two different ports
            { "type": "field_grid_dropdown", "name": "RIGHT", "options": [...Blockly.Constants.LEGO_PORTS.slice(1), Blockly.Constants.LEGO_PORTS[0]] }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "actuators_pairMove",
        "message0": "%{BKY_ACTUATORS_PAIR_MOVE_TITLE}",
        "args0": [
            { "type": "input_value", "name": "STEERING", "check": "Number" },
            { "type": "input_value", "name": "SPEED", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "actuators_pairMoveDegrees",
        "message0": "%{BKY_ACTUATORS_PAIR_MOVE_DEGREES_TITLE}",
        "args0": [
            { "type": "input_value", "name": "ANGLE", "check": "Number" },
            { "type": "input_value", "name": "STEERING", "check": "Number" },
            { "type": "input_value", "name": "SPEED", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "actuators_pairStop",
        "message0": "%{BKY_ACTUATORS_PAIR_STOP_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "actuators_beep",
        "message0": "%{BKY_ACTUATORS_BEEP_TITLE}",
        "args0": [
            { "type": "input_value", "name": "FREQ", "check": "Number" },
            { "type": "input_value", "name": "TIME", "check": "Number" },
            { "type": "input_value", "name": "VOLUME", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "actuators_stopSound",
        "message0": "%{BKY_ACTUATORS_STOP_SOUND_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "actuators_setVolume",
        "message0": "%{BKY_ACTUATORS_SET_VOLUME_TITLE}",
        "args0": [
            { "type": "input_value", "name": "VOLUME", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "extensions": ["block_init_helpurl"]
    }
]); // END JSON EXTRACT (Do not delete this comment.)
