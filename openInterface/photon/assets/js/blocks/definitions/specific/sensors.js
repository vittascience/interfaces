/**
 * @fileoverview Sensors blocks for Photon.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "sensors_get_distance_from_obstacle",
        "message0": "%{BKY_SENSORS_GET_DISTANCE_FROM_OBSTACLE_TITLE}",
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_DISTANCE_FROM_OBSTACLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_get_light",
        "message0": "%{BKY_SENSORS_GET_LIGHT_TITLE}",
        "output": "Boolean",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_LIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_get_battery",
        "message0": "%{BKY_SENSORS_GET_BATTERY_TITLE}",
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_BATTERY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_get_line_sensors",
        "message0": "%{BKY_SENSORS_GET_LINE_SENSORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SENSOR",
            "options": [
                ["%{BKY_SENSORS_LINE_FR}", "0"],
                // ["%{BKY_SENSORS_LINE_FC}", "1"],
                ["%{BKY_SENSORS_LINE_FL}", "2"],
                // ["%{BKY_SENSORS_LINE_R}", "3"]
            ]
        }],
        "output": "Boolean",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_LINE_SENSORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
]); // END JSON EXTRACT (Do not delete this comment.)