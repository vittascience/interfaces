/**
 * @fileoverview Tello blocks for Micro:bit.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    //drone_init
    {
        "type": "drone_init",
        "message0": "%{BKY_TELLO_DRONE_INIT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "SSID",
            },
            {
                "type": "field_grid_dropdown",
                "name": "TX",
                "options": Blockly.Constants.Pins.MICROBIT_PINS,
            },

            {
                "type": "field_grid_dropdown",
                "name": "RX",
                "options": Blockly.Constants.Pins.MICROBIT_PINS,
            },
        ],
        "inputsInline": false,
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_DRONE_INIT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "tello_takeoff",
        "message0": "%{BKY_TELLO_TAKEOFF_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_TAKEOFF_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    //tello land
    {
        "type": "tello_land",
        "message0": "%{BKY_TELLO_LAND_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_LAND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    //tello flip
    {
        "type": "tello_flip",
        "message0": "%{BKY_TELLO_FLIP_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "FLIP",
                "options": [
                    ["%{BKY_TELLO_FLIP_FORWARD}", "f"],
                    ["%{BKY_TELLO_FLIP_BACKWARD}", "b"],
                    ["%{BKY_TELLO_FLIP_LEFT}", "l"],
                    ["%{BKY_TELLO_FLIP_RIGHT}", "r"],
                ],
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_FLIP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    //Tello Move
    {
        "type": "tello_move",
        "message0": "%{BKY_TELLO_MOVE_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_TELLO_MOVE_LEFT}", "right"],
                    ["%{BKY_TELLO_MOVE_RIGHT}", "left"],
                    ["%{BKY_TELLO_MOVE_FORWARD}", "forward"],
                    ["%{BKY_TELLO_MOVE_BACK}", "back"],
                ],
            },
            {
                "type": "input_value",
                "name": "DISTANCE",
                "check": "Number",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_MOVE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    //Tello Move up down
    {
        "type": "tello_move_up_down",
        "message0": "%{BKY_TELLO_MOVE_UP_DOWN_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_TELLO_MOVE_UP}", "up"],
                    ["%{BKY_TELLO_MOVE_DOWN}", "down"],
                ],
            },
            {
                "type": "input_value",
                "name": "ALTITUDE",
                "check": "Number",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_MOVE_UP_DOWN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    //tello go
    {
        "type": "tello_go",
        "message0": "%{BKY_TELLO_GO_TITLE}",
        "args0": [
            {
                "type": "input_dummy",
                "name": "TOP"
            },

            {
                "type": "input_value",
                "name": "DISTANCE",
                "check": "Number",
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number",
            },

        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_GO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    //Tello Rotate
    {
        "type": "tello_rotate",
        "message0": "%{BKY_TELLO_ROTATE_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_TELLO_ROTATE_CW}", "cw"],
                    ["%{BKY_TELLO_ROTATE_CCW}", "ccw"],
                ],
            },
            {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number",
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_ROTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    // Tello emrgency
    {
        "type": "tello_emergency",
        "message0": "%{BKY_TELLO_EMERGENCY_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_EMERGENCY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    //STOP
    {
        "type": "tello_stop",
        "message0": "%{BKY_TELLO_STOP_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    //Tello Speed
    {
        "type": "tello_speed",
        "message0": "%{BKY_TELLO_SPEED_TITLE}",
        "output": "Number",
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_SPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    //get Tello flight time
    {
        "type": "tello_flight_time",
        "message0": "%{BKY_TELLO_FLIGHT_TIME_TITLE}",
        "output": "Number",
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_FLIGHT_TIME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    // get Tello battery
    {
        "type": "tello_battery",
        "message0": "%{BKY_TELLO_BATTERY_TITLE}",
        "output": "Number",
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_BATTERY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    // streaming on
    {
        "type": "tello_stream_on",
        "message0": "%{BKY_TELLO_STREAMING_VIDEO_ON_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_STREAMING_VIDEO_ON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    //streaming off
    {
        "type": "tello_stream_off",
        "message0": "%{BKY_TELLO_STREAMING_VIDEO_OFF_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_STREAMING_VIDEO_OFF_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    // parallelogram
    {
        "type": "tello_rectangle_form",
        "message0": "%{BKY_TELLO_RECTANGLE_FORM_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "LENGTH",
                "check": "Number",
            },
            {
                "type": "input_value",
                "name": "WIDTH",
                "check": "Number",
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_RECTANGLE_FORM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    // square
    {
        "type": "tello_square_form",
        "message0": "%{BKY_TELLO_SQUARE_FORM_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "LENGTH",
                "check": "Number",
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_SQUARE_FORM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    // triangle
]);