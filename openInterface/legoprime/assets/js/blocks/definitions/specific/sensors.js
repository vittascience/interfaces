/**
 * @fileoverview Sensors blocks for Lego Spike Prime.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "sensors_color",
        "message0": "%{BKY_SENSORS_COLOR_TITLE}",
        "args0": [
            { "type": "field_grid_dropdown", "name": "PORT", "options": Blockly.Constants.LEGO_PORTS }
        ],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "sensors_colorDetection",
        "message0": "%{BKY_SENSORS_COLOR_DETECTION_TITLE}",
        "args0": [
            { "type": "field_grid_dropdown", "name": "PORT", "options": Blockly.Constants.LEGO_PORTS },
            { "type": "field_dropdown", "name": "COLOR", "options": Blockly.Constants.LEGO_COLORS }
        ],
        "output": "Boolean",
        "inputsInline": true,
        "style": "sensors_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "sensors_reflection",
        "message0": "%{BKY_SENSORS_REFLECTION_TITLE}",
        "args0": [
            { "type": "field_grid_dropdown", "name": "PORT", "options": Blockly.Constants.LEGO_PORTS }
        ],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "sensors_distance",
        "message0": "%{BKY_SENSORS_DISTANCE_TITLE}",
        "args0": [
            { "type": "field_grid_dropdown", "name": "PORT", "options": Blockly.Constants.LEGO_PORTS }
        ],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "sensors_force",
        "message0": "%{BKY_SENSORS_FORCE_TITLE}",
        "args0": [
            { "type": "field_grid_dropdown", "name": "PORT", "options": Blockly.Constants.LEGO_PORTS }
        ],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "sensors_forcePressed",
        "message0": "%{BKY_SENSORS_FORCE_PRESSED_TITLE}",
        "args0": [
            { "type": "field_grid_dropdown", "name": "PORT", "options": Blockly.Constants.LEGO_PORTS }
        ],
        "output": "Boolean",
        "inputsInline": true,
        "style": "sensors_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "sensors_motorPosition",
        "message0": "%{BKY_SENSORS_MOTOR_POSITION_TITLE}",
        "args0": [
            { "type": "field_grid_dropdown", "name": "PORT", "options": Blockly.Constants.LEGO_PORTS }
        ],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "sensors_tilt",
        "message0": "%{BKY_SENSORS_TILT_TITLE}",
        "args0": [
            {
                "type": "field_dropdown", "name": "AXIS", "options": [
                    ["%{BKY_SENSORS_TILT_YAW}", "0"],
                    ["%{BKY_SENSORS_TILT_PITCH}", "1"],
                    ["%{BKY_SENSORS_TILT_ROLL}", "2"]
                ]
            }
        ],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "sensors_hubButton",
        "message0": "%{BKY_SENSORS_HUB_BUTTON_TITLE}",
        "args0": [
            {
                "type": "field_dropdown", "name": "BUTTON", "options": [
                    ["%{BKY_SENSORS_HUB_BUTTON_LEFT}", "LEFT"],
                    ["%{BKY_SENSORS_HUB_BUTTON_RIGHT}", "RIGHT"]
                ]
            }
        ],
        "output": "Boolean",
        "inputsInline": true,
        "style": "sensors_blocks",
        "extensions": ["block_init_helpurl"]
    }
]);
