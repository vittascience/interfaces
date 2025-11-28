/**
 * @fileoverview Robots blocks for Codey.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // MOTION BLOCKS

    // BLOCK STOP
    {
        "type": "robots_stop",
        "message0": "%{BKY_ROBOTS_STOP_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MOVE
    {
        "type": "robots_move",
        "message0": "%{BKY_ROBOTS_MOVE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_ROBOTS_FORWARD}", "forward"],
                    ["%{BKY_ROBOTS_BACKWARD}", "backward"],
                    ["%{BKY_ROBOTS_LEFT}", "turn_left"],
                    ["%{BKY_ROBOTS_RIGHT}", "turn_right"]
                ]
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MOVE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK DRIVE
    {
        "type": "robots_drive",
        "message0": "%{BKY_ROBOTS_DRIVE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "LEFT_SPEED",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "RIGHT_SPEED",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_DRIVE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK TURN BY DEGREE
    {
        "type": "robots_turnByDegree",
        "message0": "%{BKY_ROBOTS_TURN_BY_DEGREE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_ROBOTS_LEFT}", "left"],
                    ["%{BKY_ROBOTS_RIGHT}", "right"]
                ]
            },
            {
                "type": "input_value",
                "name": "DEGREES",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_TURN_BY_DEGREE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // COLOR IR SENSOR

    // BLOCK GET RGB
    {
        "type": "robots_sensors_get_rgb",
        "message0": "%{BKY_ROBOTS_SENSORS_GET_RGB_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "COLOR",
                "options": [
                    ["%{BKY_ROBOTS_SENSORS_RED}", "red"],
                    ["%{BKY_ROBOTS_SENSORS_GREEN}", "green"],
                    ["%{BKY_ROBOTS_SENSORS_BLUE}", "blue"]
                ]
            }
        ],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_SENSORS_GET_RGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK IS COLOR
    {
        "type": "robots_sensors_is_color",
        "message0": "%{BKY_ROBOTS_SENSORS_IS_COLOR_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "COLOR",
                "options": [
                    ["%{BKY_ROBOTS_SENSORS_RED}", "red"],
                    ["%{BKY_ROBOTS_SENSORS_GREEN}", "green"],
                    ["%{BKY_ROBOTS_SENSORS_BLUE}", "blue"],
                    ["%{BKY_ROBOTS_SENSORS_YELLOW}", "yellow"],
                    ["%{BKY_ROBOTS_SENSORS_CYAN}", "cyan"],
                    ["%{BKY_ROBOTS_SENSORS_MAGENTA}", "magenta"],
                    ["%{BKY_ROBOTS_SENSORS_WHITE}", "white"],
                    ["%{BKY_ROBOTS_SENSORS_BLACK}", "black"]
                ]
            }
        ],
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_SENSORS_IS_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET LIGHT STRENGTH
    {
        "type": "robots_sensors_get_light",
        "message0": "%{BKY_ROBOTS_SENSORS_GET_LIGHT_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "LIGHT_TYPE",
                "options": [
                    ["%{BKY_ROBOTS_SENSORS_AMBIENT}", "ambient_light"],
                    ["%{BKY_ROBOTS_SENSORS_REFLECTED}", "reflected_light"],
                    ["%{BKY_ROBOTS_SENSORS_GREYNESS}", "greyness"]
                ]
            }
        ],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_SENSORS_GET_LIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK IS OBSTACLE AHEAD
    {
        "type": "robots_sensors_is_obstacle_ahead",
        "message0": "%{BKY_ROBOTS_SENSORS_IS_OBSTACLE_AHEAD_TITLE}",
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_SENSORS_IS_OBSTACLE_AHEAD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SET LED COLOR
    {
        "type": "robots_sensors_set_led_color",
        "message0": "%{BKY_ROBOTS_SENSORS_SET_LED_COLOR_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "COLOR",
                "options": [
                    ["%{BKY_ROBOTS_SENSORS_RED}", "red"],
                    ["%{BKY_ROBOTS_SENSORS_GREEN}", "green"],
                    ["%{BKY_ROBOTS_SENSORS_BLUE}", "blue"],
                    ["%{BKY_ROBOTS_SENSORS_YELLOW}", "yellow"],
                    ["%{BKY_ROBOTS_SENSORS_CYAN}", "cyan"],
                    ["%{BKY_ROBOTS_SENSORS_MAGENTA}", "magenta"],
                    ["%{BKY_ROBOTS_SENSORS_WHITE}", "white"],
                    ["%{BKY_ROBOTS_SENSORS_BLACK}", "black"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_SENSORS_SET_LED_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)