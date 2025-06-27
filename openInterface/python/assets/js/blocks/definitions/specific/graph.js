/**
 * @fileoverview Graph blocks for Python.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // Block for setting title of graph and x/y labels
    {
        "type": "graph_matplotlib_setLabel",
        "message0": "%{BKY_GRAPH_SETLABEL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TITLE_LABEL",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "X_LABEL",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "Y_LABEL",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
        "tooltip": "%{BKY_GRAPH_SETLABEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for grid
    {
        "type": "graph_matplotlib_grid",
        "message0": "%{BKY_GRAPH_GRID_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
        "tooltip": "%{BKY_GRAPH_GRID_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for text
    {
        "type": "graph_matplotlib_text",
        "message0": "%{BKY_GRAPH_TEXT_TITLE}",
        "args0": [{
            "type": "input_dummy"
        },{
            "type": "input_value",
            "name": "X",
            "check": "Number"
        },{
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        },{
            "type": "input_value",
            "name":"TEXT",
            "check": "String"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
        "tooltip": "%{BKY_GRAPH_TEXT_TOOLTIP}",
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for plotting graph with matplotlib
    {
        "type": "graph_matplotlib_plot",
        "message0": "%{BKY_GRAPH_PLOT_TITLE}",
        "args0": [{
            "type": "input_dummy"
        }, {
            "type": "input_value",
            "name": "X",
            "check": "Array"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Array"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
        "tooltip": "%{BKY_GRAPH_PLOT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //block for scatter graph with MatPlotLib
    {
        "type": "graph_matplotlib_scatter",
        "message0": "%{BKY_GRAPH_SCATTER_TITLE}",
        "args0": [{
            "type": "input_dummy"
        }, {
            "type": "input_value",
            "name": "X",
            "check": "Array"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Array"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
        "tooltip": "%{BKY_GRAPH_SCATTER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for bar graph
    // Block for plotting graph with matplotlib
    {
        "type": "graph_matplotlib_bar",
        "message0": "%{BKY_GRAPH_BAR_TITLE}",
        "args0": [{
            "type": "input_dummy"
        }, {
            "type": "input_value",
            "name": "LEFT",
            "check": "Array"
        }, {
            "type": "input_value",
            "name": "HEIGHT",
            "check": "Array"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
        "tooltip": "%{BKY_GRAPH_BAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    /*
    TODO:
        Theses blocks aren't use right now. Need to think a bit about implementation for users.

    //block for hist graph with MatPlotLib
    {
        "type": "graph_matplotlib_hist",
        "message0": "%{BKY_GRAPH_HIST_TITLE}",
        "args0": [{
            "type": "input_dummy"
        }, {
            "type": "input_value",
            "name": "X",
            "check": "Array"
        }, {
            "type": "input_value",
            "name": "BINS",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
        "tooltip": "%{BKY_GRAPH_HIST_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for enable legend
    {
        "type": "graph_matplotlib_legend",
        "message0": "%{BKY_GRAPH_LEGEND_TITLE}",
        "args0": [{
            "type": "input_dummy"
        },{
            "type": "input_value",
            "name": "location",
            "check": "String"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
        "tooltip": "%{BKY_GRAPH_LEGEND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for display graph
    {
        "type": "graph_matplotlib_show",
        "message0": "%{BKY_GRAPH_SHOW_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
        "tooltip": "%{BKY_GRAPH_SHOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for subplot
    {
        "type": "graph_matplotlib_subplot",
        "message0": "%{BKY_GRAPH_SUBPLOT_TITLE}",
        "args0": [{
            "type": "input_dummy"
        },{
            "type": "input_value",
            "name": "row",
            "check": "Number"
        },{
            "type": "input_value",
            "name": "col",
            "check": "Number"
        },{
            "type": "input_value",
            "name": "index",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
        "tooltip": "%{BKY_GRAPH_SUBPLOT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }

     */

    // Not displayed block

    {
        "type": "graph_matplotlib_settitle",
        "message0": "%{BKY_GRAPH_SET_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TITLE_LABEL",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
    },
    {
        "type": "graph_matplotlib_xlabel",
        "message0": "%{BKY_GRAPH_SET_X_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "X_LABEL",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
    },
    {
        "type": "graph_matplotlib_ylabel",
        "message0": "%{BKY_GRAPH_SET_Y_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "Y_LABEL",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
    },
    {
        "type": "graph_matplotlib_plot_create",
        "message0": "%{BKY_GRAPH_CREATE_PLOT_TITLE}",
        "args0": [{
            "type": "input_dummy"
        }, {
            "type": "input_value",
            "name": "X",
            "check": "Array"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Array"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
        "tooltip": "%{BKY_GRAPH_PLOT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

       //block for scatter graph with MatPlotLib
    {
        "type": "graph_matplotlib_scatter_create",
        "message0": "%{BKY_GRAPH_CREATE_SCATTER_TITLE}",
        "args0": [{
            "type": "input_dummy"
        }, {
            "type": "input_value",
            "name": "X",
            "check": "Array"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Array"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
        "tooltip": "%{BKY_GRAPH_SCATTER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for bar graph
    // Block for plotting graph with matplotlib
    {
        "type": "graph_matplotlib_bar_create",
        "message0": "%{BKY_GRAPH_CREATE_BAR_TITLE}",
        "args0": [{
            "type": "input_dummy"
        }, {
            "type": "input_value",
            "name": "LEFT",
            "check": "Array"
        }, {
            "type": "input_value",
            "name": "HEIGHT",
            "check": "Array"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
        "tooltip": "%{BKY_GRAPH_BAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "graph_matplotlib_show",
        "message0": "%{BKY_GRAPH_PLOT}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "graph_blocks",
    },

]); // END JSON EXTRACT (Do not delete this comment.)