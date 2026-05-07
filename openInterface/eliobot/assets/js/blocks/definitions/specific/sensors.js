/**
 * @fileoverview Sensors blocks for Eliobot.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    {
        "type": "sensors_read_obstacle",
        "message0": "%{BKY_SENSORS_READ_OBSTACLE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_SENSORS_READ_OBSTACLE_FORWARD}", "1"],
                    ["%{BKY_SENSORS_READ_OBSTACLE_BACKWARD}", "3"],
                    ["%{BKY_SENSORS_READ_OBSTACLE_RIGHT}", "2"],
                    ["%{BKY_SENSORS_READ_OBSTACLE_LEFT}", "0"]
                ]
            },
        ],
        "output": "Boolean",
        "tooltip": "%{BKY_SENSORS_READ_OBSTACLE_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "sensors_get_line",
        "message0": "%{BKY_SENSORS_GET_LINE_TITLE}",
        "output": "Boolean",
        "tooltip": "%{BKY_SENSORS_GET_LINE_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]

    },
    // this block make the robot follow a line
    {
        "type": "sensors_line_follow",
        "message0": "%{BKY_SENSORS_LINE_FOLLOW_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_LINE_FOLLOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // Set the line sensor sensitivity
    {
        "type": "sensors_line_set_sensitivity",
        "message0": "%{BKY_SENSORS_LINE_SET_SENSITIVITY_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "SENSITIVITY",
                "check": "Number",
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_LINE_SET_SENSITIVITY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // check if a line is present
    {
        "type": "sensors_line_is_present",
        "message0": "%{BKY_SENSORS_LINE_IS_PRESENT_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SENSORCHOICE",
                "options": [
                    ["%{BKY_SENSORS_LINE_LEFT}", "0"],
                    ["%{BKY_SENSORS_LINE_MIDDLE_LEFT}", "1"],
                    ["%{BKY_SENSORS_LINE_MIDDLE}", "2"],
                    ["%{BKY_SENSORS_LINE_MIDDLE_RIGHT}", "3"],
                    ["%{BKY_SENSORS_LINE_RIGHT}", "4"]
                ]
            }
        ],
        "output": 'Boolean',
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_LINE_IS_PRESENT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // get the value of the line sensor
    {
        "type": "sensors_line_sensor_value",
        "message0": "%{BKY_SENSORS_LINE_SENSOR_VALUE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SENSORCHOICE",
                "options": [
                    ["%{BKY_SENSORS_LINE_LEFT}", "0"],
                    ["%{BKY_SENSORS_LINE_MIDDLE_LEFT}", "1"],
                    ["%{BKY_SENSORS_LINE_MIDDLE}", "2"],
                    ["%{BKY_SENSORS_LINE_MIDDLE_RIGHT}", "3"],
                    ["%{BKY_SENSORS_LINE_RIGHT}", "4"]
                ]
            }
        ],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_LINE_SENSOR_VALUE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_auto_line_calibration",
        "message0": "%{BKY_SENSORS_AUTO_LINE_CALIBRATION}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_AUTO_LINE_CALIBRATION_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/eliobot/sensors-line"
    }
]);