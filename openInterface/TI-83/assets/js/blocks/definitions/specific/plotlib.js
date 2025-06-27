/**
 * @fileoverview Graph blocks for Texas Instruments mode.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Begin configuration blocks definition */

    // CONFIGURE - Clear screen
    {
        "type": "ti_plotlib_cls",
        "message0": "%{BKY_TI_PLOTLIB_CLS_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_CLS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CONFIGURE - Set grid scale
    {
        "type": "ti_plotlib_grid",
        "message0": "%{BKY_TI_PLOTLIB_GRID_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "XSCL",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "YSCL",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["dot", "dot"],
                ["dash", "dash"],
                ["solid", "solid"],
                ["point", "point"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_GRID_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CONFIGURE - Set window size
    {
        "type": "ti_plotlib_window",
        "message0": "%{BKY_TI_PLOTLIB_WINDOW_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "XMIN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "XMAX",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "YMIN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "YMAX",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_WINDOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CONFIGURE - Set window automatically
    {
        "type": "ti_plotlib_auto_window",
        "message0": "%{BKY_TI_PLOTLIB_AUTO_WINDOW_TITLE}",
        "args0": [{
            "type": "input_dummy"
        }, {
            "type": "input_value",
            "name": "XLIST",
            "check": "Array"
        }, {
            "type": "input_value",
            "name": "YLIST",
            "check": "Array"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_AUTO_WINDOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CONFIGURE - Set axes
    {
        "type": "ti_plotlib_axes",
        "message0": "%{BKY_TI_PLOTLIB_AXES_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["on", "on"],
                ["off", "off"],
                ["axes", "axes"],
                ["window", "window"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_AXES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CONFIGURE - Set X and Y labels 
    {
        "type": "ti_plotlib_labels",
        "message0": "%{BKY_TI_PLOTLIB_LABELS_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "XLABEL",
            "check": "String"
        }, {
            "type": "input_value",
            "name":"XPOS",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "YLABEL",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "YPOS",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_LABELS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CONFIGURE - Set title
    {
        "type": "ti_plotlib_title",
        "message0": "%{BKY_TI_PLOTLIB_TITLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TITLE",
            "check": "String"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_TITLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CONFIGURE - Show plot
    {
        "type": "ti_plotlib_show_plot",
        "message0": "%{BKY_TI_PLOTLIB_SHOWPLOT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_SHOWPLOT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin draw blocks definition */
    // DRAW - Set color
    {
        "type": "ti_plotlib_define_color",
        "message0": "%{BKY_TI_PLOTLIB_DEFINE_COLOR_TITLE}",
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
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_DEFINE_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // DRAW - Set color with palette
    {
        "type": "ti_plotlib_define_palette_color",
        "message0": "%{BKY_TI_PLOTLIB_DEFINE_PALETTE_COLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_DEFINE_PALETTE_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // DRAW - Scatter
    {
        "type": "ti_plotlib_scatter",
        "message0": "%{BKY_TI_PLOTLIB_SCATTER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MARKER",
            "options": [
                ["o", "o"],
                ["+", "+"],
                ["x", "x"],
                [".", "."]
            ]
        }, {
            "type": "input_dummy"
        }, {
            "type": "input_value",
            "name": "X",
            "check": ["Array", "Number"]
        }, {
            "type": "input_value",
            "name": "Y",
            "check": ["Array", "Number"]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_SCATTER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // DRAW - Plot
    {
        "type": "ti_plotlib_plot",
        "message0": "%{BKY_TI_PLOTLIB_PLOT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MARKER",
            "options": [
                ["o", "o"],
                ["+", "+"],
                ["x", "x"],
                [".", "."]
            ]
        }, {
            "type": "input_dummy"
        }, {
            "type": "input_value",
            "name": "X",
            "check": ["Array", "Number"]
        }, {
            "type": "input_value",
            "name": "Y",
            "check": ["Array", "Number"]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_PLOT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "ti_plotlib_lin_reg",
        "message0": "%{BKY_TI_PLOTLIB_LIN_REG_TITLE}",
        "args0": [
        {
            "type": "input_value",
            "name": "LISTX",
            "check": ["Array", "Number"]
        }, {
            "type": "input_value",
            "name": "LISTY",
            "check": ["Array", "Number"]
        },
        {
            "type": "field_grid_dropdown",
            "name": "POSITION",
            "options": [
                ["%{BKY_TI_PLOTLIB_TEXT_AT_LEFT}", "left"],
                ["%{BKY_TI_PLOTLIB_TEXT_AT_CENTER}", "center"],
                ["%{BKY_TI_PLOTLIB_TEXT_AT_RIGHT}", "right"]
            ]
        },
        {
            "type": "field_grid_dropdown",
            "name": "LINE",
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
            ]
        },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_LIN_REG_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // DRAW - Draw line/arrow
    {
        "type": "ti_plotlib_line",
        "message0": "%{BKY_TI_PLOTLIB_LINE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_TI_PLOTLIB_LINE}", "default"],
                ["%{BKY_TI_PLOTLIB_ARROW}", "arrow"]
            ]
        }, {
            "type": "input_value",
            "name": "XA",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "YA",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "XB",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "YB",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_PLOT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // DRAW - Set pen
    {
        "type": "ti_plotlib_pen",
        "message0": "%{BKY_TI_PLOTLIB_PEN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SIZE",
            "options": [
                ["%{BKY_TI_PLOTLIB_PEN_THIN}", "thin"],
                ["%{BKY_TI_PLOTLIB_PEN_MEDIUM}", "medium"],
                ["%{BKY_TI_PLOTLIB_PEN_THICK}", "thick"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_TI_PLOTLIB_PEN_SOLID}", "solid"],
                ["%{BKY_TI_PLOTLIB_PEN_DOT}", "dot"],
                ["%{BKY_TI_PLOTLIB_PEN_DASH}", "dash"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_PEN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // DRAW - Write text at
    {
        "type": "ti_plotlib_text_at",
        "message0": "%{BKY_TI_PLOTLIB_TEXT_AT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "LINE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "POSITION",
            "options": [
                ["%{BKY_TI_PLOTLIB_TEXT_AT_LEFT}", "left"],
                ["%{BKY_TI_PLOTLIB_TEXT_AT_CENTER}", "center"],
                ["%{BKY_TI_PLOTLIB_TEXT_AT_RIGHT}", "right"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_plotlib_blocks",
        "tooltip": "%{BKY_TI_PLOTLIB_TEXT_AT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)
