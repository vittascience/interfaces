/**
 * @fileoverview Turtle blocks for Python.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    {
        "type": "turtle_direction",
        "message0": "%{BKY_TURTLE_DIRECTION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_TURTLE_DIRECTION_FORWARD}", "FORWARD"],
                ["%{BKY_TURTLE_DIRECTION_BACKWARD}", "BACKWARD"]
            ]
        }, {
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_DIRECTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_turn",
        "message0": "%{BKY_TURTLE_TURN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_TURTLE_TURN_RIGHT}", "RIGHT"],
                ["%{BKY_TURTLE_TURN_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_TURN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_goto",
        "message0": "%{BKY_TURTLE_GOTO_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_GOTO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_circle",
        "message0": "%{BKY_TURTLE_CIRCLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "RADIUS",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_CIRCLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "turtle_arc",
        "message0": "%{BKY_TURTLE_ARC_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "RADIUS",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_ARC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_write",
        "message0": "%{BKY_TURTLE_WRITE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TYPE",
        }, {
            "type": "input_value",
            "name": "VALUE"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_WRITE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_shape",
        "message0": "%{BKY_TURTLE_SHAPE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_TURTLE_SHAPE_TURTLE}", "turtle"],
                ["%{BKY_TURTLE_SHAPE_CIRCLE}", "circle"],
                ["%{BKY_TURTLE_SHAPE_CLASSIC}", "classic"],
                ["%{BKY_TURTLE_SHAPE_SQUARE}", "square"],
                ["%{BKY_TURTLE_SHAPE_TRIANGLE}", "triangle"]
            ]
        }],
        "nextStatement": null,
        "previousStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_SHAPE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_colour",
        "message0": "%{BKY_TURTLE_COLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "input_value",
            "name": "WIDTH"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_fill",
        "message0": "%{BKY_TURTLE_FILL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "inputsInline": true,
        "nextStatement": null,
        "previousStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_FILL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_pen",
        "message0": "%{BKY_TURTLE_PEN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PEN",
            "options": [
                ["%{BKY_TURTLE_PEN_UP}", "UP"],
                ["%{BKY_TURTLE_PEN_DOWN}", "DOWN"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_PEN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_visibility",
        "message0": "%{BKY_TURTLE_VISIBILITY_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "VISIBILITY",
            "options": [
                ["%{BKY_TURTLE_VISIBILITY_SHOW}", "SHOW"],
                ["%{BKY_TURTLE_VISIBILITY_HIDE}", "HIDE"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_VISIBILITY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_stamp",
        "message0": "%{BKY_TURTLE_STAMP_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_SHAPE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_speed",
        "message0": "%{BKY_TURTLE_SPEED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_SPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_reset",
        "message0": "%{BKY_TURTLE_RESET_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_SHAPE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_screen_setup",
        "message0": "%{BKY_TURTLE_SCREEN_SETUP_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "WIDTH"
        },
        {
            "type": "input_value",
            "name": "HEIGHT"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_SCREEN_SETUP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_screen_color",
        "message0": "%{BKY_TURTLE_SCREEN_COLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "nextStatement": null,
        "previousStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_SCREEN_SETUP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // not displayed block
    {
        "type": "turtle_color",
        "message0": "%{BKY_TURTLE_COLOR}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "nextStatement": null,
        "previousStatement": null,
        "style": "turtle_blocks",
    },
    {
        "type": "turtle_width",
        "message0": "%{BKY_TURTLE_WIDTH}",
        "args0": [{
            "type": "input_value",
            "name": "WIDTH"
        }],
        "nextStatement": null,
        "previousStatement": null,
        "style": "turtle_blocks",
    },
    {
        "type": "turtle_fillcolor",
        "message0": "%{BKY_TURTLE_FILLCOLOR}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "nextStatement": null,
        "previousStatement": null,
        "style": "turtle_blocks",
    },
    {
        "type": "turtle_fillbegin",
        "message0": "%{BKY_TURTLE_FILLBEGIN}",
        "inputsInline": true,
        "nextStatement": null,
        "previousStatement": null,
        "style": "turtle_blocks",
    },
    {
        "type": "turtle_fillend",
        "message0": "%{BKY_TURTLE_FILLEND}",
        "inputsInline": true,
        "nextStatement": null,
        "previousStatement": null,
        "style": "turtle_blocks",
    },
]); // END JSON EXTRACT (Do not delete this comment.)