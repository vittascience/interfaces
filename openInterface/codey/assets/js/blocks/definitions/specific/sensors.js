/**
 * @fileoverview Sensors blocks for Codey.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // CODEY MOTION SENSORS BLOCKS

    // BLOCK GET POSITION EULER ANGLES
    {
        "type": "sensors_getRotationEulerAngles",
        "message0": "%{BKY_SENSORS_GETROTATION_EULER_ANGLES_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["%{BKY_SENSORS_PITCH}", "pitch"],
                ["%{BKY_SENSORS_ROLL}", "roll"],
                ["%{BKY_SENSORS_YAW}", "yaw"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETROTATION_EULER_ANGLES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET ROTATION
    {
        "type": "sensors_getRotation",
        "message0": "%{BKY_SENSORS_GETROTATION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["x", "x"],
                ["y", "y"],
                ["z", "z"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETROTATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK RESET ROTATION
    {
        "type": "sensors_resetRotation",
        "message0": "%{BKY_SENSORS_RESETROTATION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["x", "x"],
                ["y", "y"],
                ["z", "z"],
                ["%{BKY_SENSORS_ALL_AXIS}", "all"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_RESETROTATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK IS SHAKED
    {
        "type": "sensors_isShaked",
        "message0": "%{BKY_SENSORS_IS_SHAKED_TITLE}",
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_IS_SHAKED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET SHAKE STRENGTH
    {
        "type": "sensors_getShakeStrength",
        "message0": "%{BKY_SENSORS_GET_SHAKE_STRENGTH_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_SHAKE_STRENGTH_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET POSITION
    {
        "type": "sensors_getPosition",
        "message0": "%{BKY_SENSORS_GETPOSITION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "POSITION",
            "options": [
                ["%{BKY_SENSORS_IS_TILTED_LEFT}", "tilted_left"],
                ["%{BKY_SENSORS_IS_TILTED_RIGHT}", "tilted_right"],
                ["%{BKY_SENSORS_IS_EARS_UP}", "ears_up"],
                ["%{BKY_SENSORS_IS_EARS_DOWN}", "ears_down"],
                ["%{BKY_SENSORS_IS_DISPLAY_UP}", "display_up"],
                ["%{BKY_SENSORS_IS_DISPLAY_DOWN}", "display_down"],
                ["%{BKY_SENSORS_IS_UPRIGHT}", "upright"]
            ]
        }],
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETPOSITION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET ACCELERATION
    {
        "type": "sensors_getAcceleration",
        "message0": "%{BKY_SENSORS_GETACCELERATION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["x", "x"],
                ["y", "y"],
                ["z", "z"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETACCELERATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET GYROSCOPE
    {
        "type": "sensors_getGyroscope",
        "message0": "%{BKY_SENSORS_GETGYROSCOPE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["x", "x"],
                ["y", "y"],
                ["z", "z"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGYROSCOPE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET LOUDNESS
    {
        "type": "sensors_get_loudness",
        "message0": "%{BKY_SENSORS_GET_LOUDNESS_TITLE}",
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_GET_LOUDNESS_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK LIGHT SENSOR GET VALUE
    {
        "type": "sensors_get_light",
        "message0": "%{BKY_SENSORS_GET_LIGHT_TITLE}",
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_GET_LIGHT_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET BATTERY PERCENTAGE
    {
        "type": "sensors_get_battery_percentage",
        "message0": "%{BKY_SENSORS_GET_BATTERY_PERCENTAGE_TITLE}",
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_GET_BATTERY_PERCENTAGE_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)