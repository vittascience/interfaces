/**
 * @fileoverview Turtle blocks for TI-83 Premium CE.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /** Begin Move blocks */

    {
        "type": "tello_takeoff",
        "message0": "%{BKY_TELLO_TAKEOFF_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_TAKEOFF_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "tello_land",
        "message0": "%{BKY_TELLO_LAND_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_LAND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "tello_fly",
        "message0": "%{BKY_TELLO_FLY_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_TELLO_FLY_FORWARD}", "FORWARD"],
                ["%{BKY_TELLO_FLY_BACKWARD}", "BACKWARD"]
            ]
        }, {
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_FLY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "tello_turn",
        "message0": "%{BKY_TELLO_TURN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_TELLO_RIGHT}", "RIGHT"],
                ["%{BKY_TELLO_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_FLY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "tello_flyInHeight",
        "message0": "%{BKY_TELLO_FLY_IN_HEIGHT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_TELLO_FLY_UP}", "UP"],
                ["%{BKY_TELLO_FLY_DOWN}", "DOWN"]
            ]
        }, {
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_FLY_IN_HEIGHT_TITLE}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "tello_flyDirection",
        "message0": "%{BKY_TELLO_FLY_DIRECTION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_TELLO_RIGHT}", "RIGHT"],
                ["%{BKY_TELLO_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_FLY_DIRECTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "tello_getAltitude",
        "message0": "%{BKY_TELLO_GET_ALTITUDE_TITLE}",
        "output": "Number",
        "style": "tello_blocks",
        "tooltip": "%{BKY_TELLO_GET_ALTITUDE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

]);