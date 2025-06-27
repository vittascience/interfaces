/**
 * @fileoverview Turtle blocks for TI-83.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /** Begin Move blocks */

    {
        "type": "turtle_move",
        "message0": "%{BKY_TURTLE_MOVE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_TURTLE_MOVE_FORWARD}", "FORWARD"],
                ["%{BKY_TURTLE_MOVE_BACKWARD}", "BACKWARD"]
            ]
        }, {
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_MOVE_TOOLTIP}",
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
            "name": "ANGLE",
            "check": "Number"
        }],
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
        "type": "turtle_done",
        "message0": "%{BKY_TURTLE_DONE_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_DONE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /** Begin Draw blocks */

    {
        "type": "turtle_fillcolor",
        "message0": "%{BKY_TURTLE_FILLCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_FILLCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_fillcolorPalette",
        "message0": "%{BKY_TURTLE_FILLCOLOR_PALETTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_FILLCOLOR_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_setFill",
        "message0": "%{BKY_TURTLE_SET_FILL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "FILL",
            "options": [
                ["%{BKY_TURTLE_SET_FILL_BEGIN}", "BEGIN"],
                ["%{BKY_TURTLE_SET_FILL_END}", "END"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_SET_FILL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_dot",
        "message0": "%{BKY_TURTLE_DOT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DIAMETER",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_DOT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_write",
        "message0": "%{BKY_TURTLE_WRITE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
            "check": "String"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_WRITE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /** Begin Pen blocks */

    {
        "type": "turtle_controlPen",
        "message0": "%{BKY_TURTLE_CONTROL_PEN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_TURTLE_CONTROL_PEN_UP}", "UP"],
                ["%{BKY_TURTLE_CONTROL_PEN_DOWN}", "DOWN"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_CONTROL_PEN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_pencolor",
        "message0": "%{BKY_TURTLE_PENCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_PENCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_pencolorPalette",
        "message0": "%{BKY_TURTLE_PENCOLOR_PALETTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_PENCOLOR_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_pensize",
        "message0": "%{BKY_TURTLE_PENSIZE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SIZE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_PENSIZE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /** Begin Settings blocks */

    {
        "type": "turtle_clear",
        "message0": "%{BKY_TURTLE_CLEAR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_CLEAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_controlTurtle",
        "message0": "%{BKY_TURTLE_CONTROL_TURTLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_TURTLE_CONTROL_TURTLE_HIDE}", "HIDE"],
                ["%{BKY_TURTLE_CONTROL_TURTLE_SHOW}", "SHOW"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_CONTROL_TURTLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_hidegrid",
        "message0": "%{BKY_TURTLE_HIDEGRID_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_HIDEGRID_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_speed",
        "message0": "%{BKY_TURTLE_SPEED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_SPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /** Begin State blocks */

    {
        "type": "turtle_home",
        "message0": "%{BKY_TURTLE_HOME_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_HOME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_setheading",
        "message0": "%{BKY_TURTLE_SET_HEADING_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_SET_HEADING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_getCoordinates",
        "message0": "%{BKY_TURTLE_GET_COORDINATES_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["%{BKY_TURTLE_GET_COORDINATES_XCOR}", "X"],
                ["%{BKY_TURTLE_GET_COORDINATES_YCOR}", "Y"]
            ]
        }],
        "output": "Number",
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_GET_COORDINATES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "turtle_heading",
        "message0": "%{BKY_TURTLE_HEADING_TITLE}",
        "output": "Number",
        "style": "turtle_blocks",
        "tooltip": "%{BKY_TURTLE_HEADING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

]);