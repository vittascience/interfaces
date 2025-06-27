/**
 * @fileoverview Sensors blocks for Sphero.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "sensors_pitch",
        "message0": "%{BKY_SENSORS_PITCH_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_PITCH_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_roll",
        "message0": "%{BKY_SENSORS_ROLL_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_ROLL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }, {
        "type": "sensors_yaw",
        "message0": "%{BKY_SENSORS_YAW_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_YAW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_accelerometer",
        "message0": "%{BKY_SENSORS_ACCELEROMETER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["%{BKY_X_AXIS}", "x"],
                ["%{BKY_Y_AXIS}", "y"],
                ["%{BKY_Z_AXIS}", "z"],
                ["%{BKY_STRENGTH}", "strength"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_ACCELEROMETER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_gyroscope",
        "message0": "%{BKY_SENSORS_GYROSCOPE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["%{BKY_X_AXIS}", "x"],
                ["%{BKY_Y_AXIS}", "y"],
                ["%{BKY_Z_AXIS}", "z"],
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GYROSCOPE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_isFallDetected",
        "message0": "%{BKY_SENSORS_IS_FALL_DETECTED_TITLE}",
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_IS_FALL_DETECTED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)