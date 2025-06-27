/**
 * @fileoverview Graph blocks for Texas Instruments mode.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Begin configuration blocks definition */
    {
        "type": "ti_draw_set_window",
        "message0": "%{BKY_TI_DRAW_SET_WINDOW_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "WIDTH",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "HEIGHT",
                "check": "Number"
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_draw_blocks",
        "tooltip": "%{BKY_TI_DRAW_SET_WINDOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]

    },
    {
        "type": "ti_draw_get_window",
        "message0": "%{BKY_TI_DRAW_GET_WINDOW_TITLE}",
        "output": "String",
        "style": "ti_draw_blocks",
        "tooltip": "%{BKY_TI_DRAW_GET_WINDOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "ti_draw_draw_line",
        "message0": "%{BKY_TI_DRAW_DRAW_LINE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "X1",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y1",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "X2",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y2",
                "check": "Number"
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_draw_blocks",
        "tooltip": "%{BKY_TI_DRAW_DRAW_LINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "ti_draw_draw_circle",
        "message0": "%{BKY_TI_DRAW_DRAW_CIRCLE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "RADIUS",
                "check": "Number"
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_draw_blocks",
        "tooltip": "%{BKY_TI_DRAW_DRAW_CIRCLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "ti_draw_fill_circle",
        "message0": "%{BKY_TI_DRAW_FILL_CIRCLE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "RADIUS",
                "check": "Number"
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_draw_blocks",
        "tooltip": "%{BKY_TI_DRAW_FILL_CIRCLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "ti_draw_draw_rect",
        "message0": "%{BKY_TI_DRAW_DRAW_RECT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "WIDTH",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "HEIGHT",
                "check": "Number"
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_draw_blocks",
        "tooltip": "%{BKY_TI_DRAW_DRAW_RECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "ti_draw_fill_rect",
        "message0": "%{BKY_TI_DRAW_FILL_RECT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number",
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number",
            },
            {
                "type": "input_value",
                "name": "WIDTH",
                "check": "Number",
            },
            {
                "type": "input_value",
                "name": "HEIGHT",
                "check": "Number",
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_draw_blocks",
        "tooltip": "%{BKY_TI_DRAW_FILL_RECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "ti_draw_draw_text",
        "message0": "%{BKY_TI_DRAW_DRAW_TEXT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "TEXT",
                "check": "String"
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_draw_blocks",
        "tooltip": "%{BKY_TI_DRAW_DRAW_TEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "ti_draw_draw_poly",
        "message0": "%{BKY_TI_DRAW_DRAW_POLY_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "LISTX",
                "check": "Array"
            },
            {
                "type": "input_value",
                "name": "LISTY",
                "check": "Array"
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_draw_blocks",
        "tooltip": "%{BKY_TI_DRAW_DRAW_POLY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "ti_draw_fill_poly",
        "message0": "%{BKY_TI_DRAW_FILL_POLY_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "LISTX",
                "check": "Array"
            },
            {
                "type": "input_value",
                "name": "LISTY",
                "check": "Array"
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_draw_blocks",
        "tooltip": "%{BKY_TI_DRAW_FILL_POLY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "ti_draw_set_color",
        "message0": "%{BKY_TI_DRAW_SET_COLOR_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR_RED",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "COLOR_GREEN",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "COLOR_BLUE",
                "check": "Number"
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_draw_blocks",
        "tooltip": "%{BKY_TI_DRAW_SET_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "ti_draw_set_pen",
        "message0": "%{BKY_TI_DRAW_SET_PEN_TITLE}",
        "args0": [
            {
                'type': 'field_grid_dropdown',
                'name': 'THICKNESS',
                'options': [
                    ["%{BKY_TI_DRAW_SET_PEN_THICKNESS_SMALL}", "small"],
                    ["%{BKY_TI_DRAW_SET_PEN_THICKNESS_MEDIUM}", "medium"],
                    ["%{BKY_TI_DRAW_SET_PEN_THICKNESS_THICK}", "thick"],
                ]
            },
            {
                'type': 'field_grid_dropdown',
                'name': 'STYLE',
                'options': [
                    ["%{BKY_TI_DRAW_SET_PEN_STYLE_SOLID}", "solid"],
                    ["%{BKY_TI_DRAW_SET_PEN_STYLE_DASH}", "dashed"],
                    ["%{BKY_TI_DRAW_SET_PEN_STYLE_DOT}", "dotted"],

                ]
            },            
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_draw_blocks",
        "tooltip": "%{BKY_TI_DRAW_SET_PEN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "ti_draw_plot_xy",
        "message0": "%{BKY_TI_DRAW_PLOT_XY_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "SHAPE",
                "options": [
                    ["1", "1"],
                    ["2", "2"],
                    ["3", "3"],
                    ["4", "4"],
                    ["5", "5"],
                    ["6", "6"],
                    ["7", "7"],
                    ["8", "8"],
                    ["9", "9"],
                    ["10", "10"],
                    ["11", "11"],
                    ["12", "12"],
                    ["13", "13"],
                ]
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_draw_blocks",
        "tooltip": "%{BKY_TI_DRAW_PLOT_XY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // DRAW show (same as disp_wait() => press annul to resume)
    {
        "type": "ti_draw_show",
        "message0": "%{BKY_TI_DRAW_SHOW_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_draw_blocks",
        "tooltip": "%{BKY_TI_DRAW_SHOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

]); // END JSON EXTRACT (Do not delete this comment.)