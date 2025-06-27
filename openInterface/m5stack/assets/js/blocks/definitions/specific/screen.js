/**
 * @fileoverview Screen blocks for M5Stack.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Start screen blocks */

    // CONTROL BACKGROUND COLOR PALETTE
    {
        "type": "screen_setBackgroundColorPalette",
        "message0": "%{BKY_SCREEN_SET_BACKGROUND_COLOR_PALETTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_SET_BACKGROUND_COLOR_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CONTROL BACKGROUND COLOR RGB
    {
        "type": "screen_setBackgroundColorRGB",
        "message0": "%{BKY_SCREEN_SET_BACKGROUND_COLOR_RGB_TITLE}",
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
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_SET_BACKGROUND_COLOR_RGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin drawing - title blocks */

    // DRAWING - DEFINE TITLE
    {
        "type": "screen_M5Title_define",
        "message0": "%{BKY_SCREEN_DRAW_M5TITLE_DEFINE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "TITLE",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "POSITION",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TITLE_DEFINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Title_setFgColor",
        "message0": "%{BKY_SCREEN_DRAW_M5TITLE_SETFGCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "FGCOLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TITLE_SETFGCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Title_setBgColor",
        "message0": "%{BKY_SCREEN_DRAW_M5TITLE_SETBGCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "BGCOLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TITLE_SETBGCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Title_setTitle",
        "message0": "%{BKY_SCREEN_DRAW_M5TITLE_SETTITLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "TITLE",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TITLE_SETTITLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Title_controlDisplay",
        "message0": "%{BKY_SCREEN_DRAW_M5TITLE_CONTROLDISPLAY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TITLE_CONTROLDISPLAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin drawing - label blocks */

    // DRAWING - DEFINE A TEXT
    {
        "type": "screen_M5TextBox_define",
        "message0": "%{BKY_SCREEN_DRAW_M5TEXTBOX_DEFINE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "TEXT",
            "check": "String"
        }, {
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
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TEXTBOX_DEFINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5TextBox_setColor",
        "message0": "%{BKY_SCREEN_DRAW_M5TEXTBOX_SETCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TEXTBOX_SETCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5TextBox_setPosition",
        "message0": "%{BKY_SCREEN_DRAW_M5TEXTBOX_SETPOSITION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
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
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TEXTBOX_SETPOSITION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5TextBox_setFont",
        "message0": "%{BKY_SCREEN_DRAW_M5TEXTBOX_SETFONT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "field_dropdown",
            "name": "FONT",
            "options": [
                ["Default", "FONT_Default"],
                ["Default Small", "FONT_DefaultSmall"],
                ["Ubuntu-C", "FONT_Ubuntu"],
                ["Comic", "FONT_Comic"],
                ["DejaVuSans 18", "FONT_DejaVu18"],
                ["DejaVuSans 24", "FONT_DejaVu24"],
                ["DejaVuSans 40", "FONT_DejaVu40"],
                ["DejaVuSans 56", "FONT_DejaVu56"],
                ["DejaVuSans 72", "FONT_DejaVu72"],
                ["Unicode 24", "FONT_UNICODE"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TEXTBOX_SETFONT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5TextBox_setText",
        "message0": "%{BKY_SCREEN_DRAW_M5TEXTBOX_SETTEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "TEXT",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TEXTBOX_SETTEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5TextBox_setRotate",
        "message0": "%{BKY_SCREEN_DRAW_M5TEXTBOX_SETROTATE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TEXTBOX_SETROTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5TextBox_controlDisplay",
        "message0": "%{BKY_SCREEN_DRAW_M5TEXTBOX_CONTROLDISPLAY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TEXTBOX_CONTROLDISPLAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin drawing - rect blocks */

    // DRAWING - DEFINE RECT
    {
        "type": "screen_M5Rect_define",
        "message0": "%{BKY_SCREEN_DRAW_M5RECT_DEFINE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
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
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5RECT_DEFINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Rect_setSize",
        "message0": "%{BKY_SCREEN_DRAW_M5RECT_SETSIZE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "WIDTH",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "HEIGHT",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5RECT_SETSIZE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Rect_setBgColor",
        "message0": "%{BKY_SCREEN_DRAW_M5RECT_SETBGCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "FILL_COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5RECT_SETBGCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Rect_setBorderColor",
        "message0": "%{BKY_SCREEN_DRAW_M5RECT_SETBORDERCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "BORDER_COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5RECT_SETBORDERCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Rect_setPosition",
        "message0": "%{BKY_SCREEN_DRAW_M5RECT_SETPOSITION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
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
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5RECT_SETPOSITION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Rect_controlDisplay",
        "message0": "%{BKY_SCREEN_DRAW_M5RECT_CONTROLDISPLAY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5RECT_CONTROLDISPLAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin drawing - circle blocks */

    // DRAWING - DEFINE CIRCLE
    {
        "type": "screen_M5Circle_define",
        "message0": "%{BKY_SCREEN_DRAW_M5CIRCLE_DEFINE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
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
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5CIRCLE_DEFINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Circle_setSize",
        "message0": "%{BKY_SCREEN_DRAW_M5CIRCLE_SETSIZE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "RADIUS",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5CIRCLE_SETSIZE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Circle_setBgColor",
        "message0": "%{BKY_SCREEN_DRAW_M5CIRCLE_SETBGCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "FILL_COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5CIRCLE_SETBGCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Circle_setBorderColor",
        "message0": "%{BKY_SCREEN_DRAW_M5CIRCLE_SETBORDERCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "BORDER_COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5CIRCLE_SETBORDERCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Circle_setPosition",
        "message0": "%{BKY_SCREEN_DRAW_M5CIRCLE_SETPOSITION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
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
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5CIRCLE_SETPOSITION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Circle_controlDisplay",
        "message0": "%{BKY_SCREEN_DRAW_M5CIRCLE_CONTROLDISPLAY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5CIRCLE_CONTROLDISPLAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin drawing - triangle blocks */

    // DRAWING - DEFINE TRIANGLE
    {
        "type": "screen_M5Triangle_define",
        "message0": "%{BKY_SCREEN_DRAW_M5TRIANGLE_DEFINE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "X1",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y1",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "X2",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y2",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "X3",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y3",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TRIANGLE_DEFINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Triangle_setSize",
        "message0": "%{BKY_SCREEN_DRAW_M5TRIANGLE_SETSIZE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "X1",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y1",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "X2",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y2",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "X3",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y3",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TRIANGLE_SETSIZE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Triangle_setBgColor",
        "message0": "%{BKY_SCREEN_DRAW_M5TRIANGLE_SETBGCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "FILL_COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TRIANGLE_SETBGCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Triangle_setBorderColor",
        "message0": "%{BKY_SCREEN_DRAW_M5TRIANGLE_SETBORDERCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "BORDER_COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TRIANGLE_SETBORDERCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Triangle_controlDisplay",
        "message0": "%{BKY_SCREEN_DRAW_M5TRIANGLE_CONTROLDISPLAY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5TRIANGLE_CONTROLDISPLAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin drawing - line blocks */

    // DRAWING - DEFINE LINE
    {
        "type": "screen_M5Line_define",
        "message0": "%{BKY_SCREEN_DRAW_M5LINE_DEFINE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "X1",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y1",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "X2",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y2",
            "check": "Number"
        }, {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
                ["Trait plein", "PLINE"],
                ["Trait pointillé", "HLINE"],
                ["Trait v?", "VLINE"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5LINE_DEFINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Line_setSize",
        "message0": "%{BKY_SCREEN_DRAW_M5LINE_SETSIZE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "X1",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y1",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "X2",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y2",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5LINE_SETSIZE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Line_setColor",
        "message0": "%{BKY_SCREEN_DRAW_M5LINE_SETCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5LINE_SETCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "screen_M5Line_controlDisplay",
        "message0": "%{BKY_SCREEN_DRAW_M5LINE_CONTROLDISPLAY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "screen_blocks",
        "tooltip": "%{BKY_SCREEN_DRAW_M5LINE_CONTROLDISPLAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)