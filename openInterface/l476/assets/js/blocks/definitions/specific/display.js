/**
 * @fileoverview Display blocks for L476.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Start L476 display blocks */

    // L476 COLOR LED _ CONTROL STATE
    {
        "type": "display_l476_controlColorLed",
        "message0": "%{BKY_DISPLAY_L476_CONTROL_COLOR_LED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_L476_CONTROL_COLOR_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // L476 COLOR LED _ TOGGLE STATE
    {
        "type": "display_l476_toggleColorLed",
        "message0": "%{BKY_DISPLAY_L476_TOGGLE_LED_STATE_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_L476_TOGGLE_LED_STATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Start external screens blocks */

    // GROVE I2C LCD1602 RGB MODULE _ SET TEXT JSON
    {
        "type": "display_lcdSetText",
        "message0": "%{BKY_DISPLAY_LCD_SETTEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }, {
            "type": "field_grid_dropdown",
            "name": "LINE",
            "options": [
                ["0", "0"],
                ["1", "1"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "POS",
            "options": [
                ["0", "0"],
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
                ["14", "14"],
                ["15", "15"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LCD_SETTEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE I2C LCD1602 RGB MODULE _ CLEAR SCREEN JSON
    {
        "type": "display_lcdClear",
        "message0": "%{BKY_DISPLAY_LCD_CLEAR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LCD_CLEAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE I2C LCD1602 RGB MODULE _ SET RGB JSON
    {
        "type": "display_lcdSetColor",
        "message0": "%{BKY_DISPLAY_LCD_SETRGBCOLOR_TITLE}",
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
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LCD_SETRGBCOLOR_TOOLTIP}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE I2C LCD1602 RGB MODULE _ SET RGB PALETTE JSON
    {
        "type": "display_lcdSetColorPalette",
        "message0": "%{BKY_DISPLAY_LCD_SETPALETTERGBCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LCD_SETPALETTERGBCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    /* Start led module blocks */

    // GROVE LED MODULE _ WRITE DIGITAL JSON
    {
        "type": "display_setGroveSocketLed",
        "message0": "%{BKY_DISPLAY_SETGROVELED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SETGROVELED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OLED ADD TEXT
    {
        "type": "display_addOledText",
        "message0": "%{BKY_DISPLAY_OLED_ADDTEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
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
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_OLED_ADDTEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OLED SET PIXEL
    {
        "type": "display_setOledPixel",
        "message0": "%{BKY_DISPLAY_OLED_SETPIXEL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_OLED_SETPIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OLED DRAW LINE
    {
        "type": "display_drawOledLine",
        "message0": "%{BKY_DISPLAY_OLED_DRAWLINE_TITLE}",
        "args0": [{
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
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_OLED_DRAWLINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OLED CLEAR DISPLAY
    {
        "type": "display_clearOledScreen",
        "message0": "%{BKY_DISPLAY_OLED_CLEARSCREEN_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_OLED_CLEARSCREEN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OLED SET BACKGROUND
    {
        "type": "display_setOledBackground",
        "message0": "%{BKY_DISPLAY_OLED_SETBACKGROUND_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BACKGROUND",
            "options": [
                ["%{BKY_DISPLAY_OLED_WHITE}", "1"],
                ["%{BKY_DISPLAY_OLED_BLACK}", "0"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_OLED_SETBACKGROUND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // LED MODULE _ WRITE ANALOG PWM
    {
        "type": "display_setLEDintensity",
        "message0": "%{BKY_DISPLAY_SETLEDINTENSITY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SETLEDINTENSITY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // LED MODULE _ SET VARIABLE COLOR
    {
        "type": "display_setVariableColorLED",
        "message0": "%{BKY_DISPLAY_SET_VARIABLE_COLOR_LED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_VARIABLE_COLOR_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },


    // BLOCK NEOPIXEL _ DEFINE NEOPIXEL
    {
        "type": "display_defineNeopixel",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_DEFINE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "N",
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_DEFINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CONTROL NEOPIXEL LED
    {
        "type": "display_controlNeopixelLed",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_LEDCONTROL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": "Number"
        }, {
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
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_LEDCONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CONTROL NEOPIXEL LED WITH COLOR
    {
        "type": "display_controlColorNeopixelLed",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_SETPALETTECOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_SETPALETTECOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CONTROL ALL NEOPIXEL LED WITH COLOR
    {
        "type": "display_neopixel_controlAllLedRGB",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_SETALLLEDRGB_TITLE}",
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
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_SETALLLEDRGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CONTROL NEOPIXEL LED WITH COLOR
    {
        "type": "display_neopixel_controlAllLedPalette",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK RAINBOW NEOPIXEL
    {
        "type": "display_rainbowNeopixel",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_RAINBOW_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_RAINBOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK RGB LED MATRIX 8*8
    {
        "type": "display_rgb_led_matrix_DrawBitmap",
        "message0": "%{BKY_DISPLAY_RGB_LED_MATRIX_TITLE}",
        "args0": [
            {
                "type": "field_image",
                "name": "RGB_LEDS_MATRIX",
                "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJtYXRyaXhfcmdiIiB3aWR0aD0iMjcyIiBoZWlnaHQ9IjI3MiIgdmlld0JveD0iMCAwIDI3MiAyNzIgIj48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNyIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTM5IiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjQxIiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMiIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTA1IiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjA3IiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMiIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTA1IiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjA3IiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNyIgeT0iMTA1IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTA1IiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTM5IiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjA3IiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjQxIiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIxMzkiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNzEiIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxNzMiIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjE3MyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEwNSIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjIwNyIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNyIgeT0iMjA3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTA1IiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTM5IiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjA3IiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjQxIiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIyNDEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNzEiIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxNzMiIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjwvc3ZnPg==",
                "width": 40,
                "height": 40,
                "alt": "#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#ffffff,#ffffff,#ffffff,#000000,#000000,#ffffff,#ffffff,#ffffff,#ffffff,#000000,#ffffff,#000000,#000000,#ffffff,#000000,#ffffff,#ffffff,#000000,#ffffff,#000000,#000000,#ffffff,#000000,#ffffff,#ffffff,#000000,#ffffff,#000000,#000000,#ffffff,#000000,#ffffff,#ffffff,#000000,#ffffff,#000000,#000000,#ffffff,#000000,#ffffff,#ffffff,#ffffff,#ffffff,#000000,#000000,#ffffff,#ffffff,#ffffff,#000000,#000000,#000000,#ffffff,#ffffff,#000000,#000000,#000000",
            },
            {
                "type": "field_input",
                "name": "HIDDEN_RGB_LEDS_MATRIX"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_RGB_LED_MATRIX_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "show_stm32_rgb_leds_matrix",
            "display_led_matrix_duration_init_extension"
        ],
        "mutator": "display_led_matrix_duration_mutator",
    },

    {
        "type": "display_rgb_led_matrix_stopDisplay",
        "message0": "%{BKY_DISPLAY_RGB_LED_MATRIX_STOPDISPLAY_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_RGB_LED_MATRIX_STOPDISPLAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK MONOCHROME LED MATRIX 8*8
    {
        "type": "display_led_matrix_DrawBitmap",
        "message0": "%{BKY_DISPLAY_LED_MATRIX_TITLE}",
        "args0": [
            {
                "type": "field_image",
                "name": "LEDS_MATRIX",
                "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJtYXRyaXgiIHdpZHRoPSIyNzIiIGhlaWdodD0iMjcyIiB2aWV3Qm94PSIwIDAgMjcyIDI3MiAiPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzIiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEwNSIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjIwNyIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMTA1IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNzEiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxNzMiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzIiB5PSIxMzkiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEwNSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjIwNyIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMiIHk9IjE3MyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNyIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTA1IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTM5IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjA3IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjQxIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMjA3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNzEiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxNzMiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzIiB5PSIyNDEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEwNSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjIwNyIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PC9zdmc+",
                "width": 40,
                "height": 40,
                "alt": '01111110,01000010,01111110,00000001,00000001,01111110,01000010,01111110',
            },
            {
                "type": "field_input",
                "name": "HIDDEN_MONO_LEDS_MATRIX"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_MATRIX_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "show_stm32_leds_matrix",
            "display_mono_led_matrix_init_extension"
        ]
    },

    {
        "type": "display_led_matrix_clear",
        "message0": "%{BKY_DISPLAY_LED_MATRIX_CLEAR_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_MATRIX_CLEAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK SET NUMBER GROVE 4DIGIT
    {
        "type": "display_setNumberGrove4Digit",
        "message0": "%{BKY_DISPLAY_4DIGIT_SETNUMBER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SHOW",
            "options": [
                ["%{BKY_DISPLAY_4DIGIT_NUMBER}", "NUM"],
                ["%{BKY_DISPLAY_4DIGIT_TEMPERATURE}", "TEMP"]
            ]
        }, {
            "type": "input_value",
            "name": "N",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "CLK",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIO",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_4DIGIT_SETNUMBER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE 4DIGIT SET CLOCK
    {
        "type": "display_setClockGrove4Digit",
        "message0": "%{BKY_DISPLAY_4DIGIT_SETCLOCK_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "CLK",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIO",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_4DIGIT_SETCLOCK_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE LED BAR MODULE _  DISPLAY JSON
    {
        "type": "display_setLevelLedBar",
        "message0": "%{BKY_DISPLAY_MY9221_SET_LEVEL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "DI",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DCKI",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_MY9221_SET_LEVEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE LED BAR MODULE _  REVERSE JSON
    {
        "type": "display_my9221_reverse",
        "message0": "%{BKY_DISPLAY_MY9221_REVERSE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "DI",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DCKI",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_MY9221_REVERSE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE CHAINABLE LED RGB MODULE _ DEFINE MODULE
    {
        "type": "display_defineChainableRGBLed",
        "message0": "%{BKY_DISPLAY_CHAINABLERGBLED_DEFINE_TITLE}",
        "args0": [{
            "type": "field_slider",
            "name": "N",
            "value": 1,
            "min": 1,
            "max": 100
        }, {
            "type": "field_grid_dropdown",
            "name": "CIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHAINABLERGBLED_DEFINE_TOOLTIP}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE CHAINABLE LED RGB MODULE _ SET COLOR
    {
        "type": "display_setColorChainableRGBLed",
        "message0": "%{BKY_DISPLAY_CHAINABLE_RGBLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": "Number"
        }, {
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
        }, {
            "type": "field_grid_dropdown",
            "name": "CIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHAINABLE_RGBLED_TOOLTIP}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE CHAINABLE LED RGB MODULE _ SET PALETTE COLOR
    {
        "type": "display_setPaletteColorChainableRGBLed",
        "message0": "%{BKY_DISPLAY_CHAINABLE_PALETTERGBLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "field_grid_dropdown",
            "name": "CIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHAINABLE_PALETTERGBLED_TOOLTIP}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE ALL CHAINABLE LED RGB MODULE _ SET COLOR
    {
        "type": "display_setColorAllChainableRGBLed",
        "message0": "%{BKY_DISPLAY_CHAINABLE_ALLRGBLED_TITLE}",
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
        }, {
            "type": "field_grid_dropdown",
            "name": "CIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHAINABLE_ALLRGBLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE ALL CHAINABLE LED RGB MODULE _ SET PALETTE COLOR
    {
        "type": "display_setPaletteAllChainableRGBLed",
        "message0": "%{BKY_DISPLAY_CHAINABLE_PALETTEALLRGBLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "field_grid_dropdown",
            "name": "CIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHAINABLE_PALETTEALLRGBLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE ALL CHAINABLE LED RGB MODULE _ RESET
    {
        "type": "display_resetAllChainableRGBLed",
        "message0": "%{BKY_DISPLAY_CHAINABLE_RESETALLRGBLED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "CIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHAINABLE_RESETALLRGBLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)


Blockly.Field.prototype.setVisible = function (visible) {
    if (this.visible_ == visible) {
        return;
    }
    this.visible_ = visible;
    var root = this.getSvgRoot();
    if (root) {
        root.style.display = visible ? 'block' : 'none';
    }
};

Blockly.Constants.Display = Object.create(null);

/**
 * Performs final setup of 'display_rgb_led_matrix_DrawBitmap' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.DISPLAY_LED_MATRIX_DURATION_INIT_EXTENSION = function () {
    this.getField('HIDDEN_RGB_LEDS_MATRIX').setVisible(false);
    if (typeof Blockly.Wiki === 'undefined') {
        Main.getWorkSpace().addChangeListener(async function (e) {
            await new Promise(r => setTimeout(r, 1000));
            if (e.type === Blockly.Events.FINISHED_LOADING) {
                LedMatrixModalManager.updateImageRGB();
            }
        });
    }
    this.duration_ = false;
    this.update_(this.updateField_);
};

/**
 * Performs final setup of 'display_led_matrix_DrawBitmap' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.DISPLAY_MONO_LED_MATRIX_INIT_EXTENSION = function () {
    this.getField('HIDDEN_MONO_LEDS_MATRIX').setVisible(false);
    if (typeof Blockly.Wiki === 'undefined') {
        Main.getWorkSpace().addChangeListener(async function (e) {
            await new Promise(r => setTimeout(r, 1000));
            if (e.type === Blockly.Events.FINISHED_LOADING) {
                LedMatrixModalManager.updateImageMono();
            }
        });
    }
};
/**
 * Mixin for mutator functions in the 'DISPLAY_LED_MATRIX_DURATION' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Display.DISPLAY_LED_MATRIX_DURATION_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('duration', 'DISPLAY_LED_MATRIX_DURATION', 'input', 1000, "DISPLAY_LED_MATRIX_DURATION_UNIT");

// Initialization extensions
Blockly.Extensions.register("display_led_matrix_duration_init_extension",
    Blockly.Constants.Display.DISPLAY_LED_MATRIX_DURATION_INIT_EXTENSION);

Blockly.Extensions.register("display_mono_led_matrix_init_extension",
    Blockly.Constants.Display.DISPLAY_MONO_LED_MATRIX_INIT_EXTENSION);

Blockly.Extensions.register("show_stm32_rgb_leds_matrix", function () {
    // init matrix 8*8 rgb
    if (!LedMatrixModalManager.isSet(true) && typeof Blockly.Wiki === 'undefined')
        LedMatrixModalManager.init(8, 8, true);

    this.getField('RGB_LEDS_MATRIX').clickHandler_ = (() => {
        Blockly.Constants.RGB_LEDS_MATRIX_BLOCK = this.inputList[0].fieldRow[1];
        Blockly.Constants.HIDDEN_RGB_LEDS_MATRIX = this.getField("HIDDEN_RGB_LEDS_MATRIX");

        if (Blockly.Constants.HIDDEN_RGB_LEDS_MATRIX.getValue() == '')
            Blockly.Constants.HIDDEN_RGB_LEDS_MATRIX.setValue(this.getField("RGB_LEDS_MATRIX").getText());

        LedMatrixModalManager.load_matrix_from_block(true);
        LedMatrixModalManager.disp_modal();
        // saving the image in case of cancellation
        Blockly.Constants.RGB_LEDS_MATRIX = LedMatrixModalManager.get_matrix_dataset();
    });
});

Blockly.Extensions.register("show_stm32_leds_matrix", function () {
    // init matrix 8*8 mono
    if (!LedMatrixModalManager.isSet() && typeof Blockly.Wiki === 'undefined')
        LedMatrixModalManager.init(8, 8, false, "#e63737");

    this.getField('LEDS_MATRIX').clickHandler_ = (() => {
        Blockly.Constants.LEDS_MATRIX_BLOCK = this.inputList[0].fieldRow[1];
        Blockly.Constants.HIDDEN_MONO_LEDS_MATRIX = this.getField("HIDDEN_MONO_LEDS_MATRIX");

        if (Blockly.Constants.HIDDEN_MONO_LEDS_MATRIX.getValue() == '')
            Blockly.Constants.HIDDEN_MONO_LEDS_MATRIX.setValue(this.getField("LEDS_MATRIX").getText());

        LedMatrixModalManager.load_matrix_from_block();
        LedMatrixModalManager.disp_modal();
        // saving the image in case of cancellation
        Blockly.Constants.LEDS_MATRIX = LedMatrixModalManager.get_matrix_dataset();
    });
});

// Mutator
Blockly.Extensions.registerMutator('display_led_matrix_duration_mutator',
    Blockly.Constants.Display.DISPLAY_LED_MATRIX_DURATION_MIXIN);