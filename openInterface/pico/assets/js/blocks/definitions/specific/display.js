/**
 * @fileoverview Display blocks for Raspberry Pi Pico.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT


    // PICO BUILT-IN LED
    {
        "type": "display_controlPicoLed",
        "message0": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // PICO W BUILT-IN LED
    {
        "type": "display_controlPicoWLed",
        "message0": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_W_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_W_TOOLTIP}",
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
            "type": "field_grid_dropdown",
            "name": "ADDR",
            "options": [
                ["0x3e (Grove)", "0x3e"],
                ["0x3f", "0x3f"],
                ["0x27", "0x27"]
            ]
        }, {
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
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
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
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ADDR",
            "options": [
                ["0x3e (Grove)", "0x3e"],
                ["0x3f", "0x3f"],
                ["0x27", "0x27"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LCD_CLEAR_TOOLTIP}",
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
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
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
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
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

    // BLOCK OLED SHOW ICON
    {
        "type": "display_showOledIcon",
        "message0": "%{BKY_DISPLAY_OLED_DRAWICON_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ICON",
            "options": Blockly.Constants.Utils.BlockOptions.getOledIcons()
        }, {
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_OLED_DRAWICON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OLED CLEAR DISPLAY
    {
        "type": "display_clearOledScreen",
        "message0": "%{BKY_DISPLAY_OLED_CLEARSCREEN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_OLED_CLEARSCREEN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MONOCHROME LED MATRIX 8*8
    {
        "type": "display_led_matrix_DrawBitmap",
        "message0": "%{BKY_DISPLAY_LED_MATRIX_TITLE}",
        "args0": [{
            "type": "field_image",
            "name": "LEDS_MATRIX",
            "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJtYXRyaXgiIHdpZHRoPSIyNzIiIGhlaWdodD0iMjcyIiB2aWV3Qm94PSIwIDAgMjcyIDI3MiAiPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzIiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEwNSIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjIwNyIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMTA1IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNzEiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxNzMiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzIiB5PSIxMzkiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEwNSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjIwNyIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMiIHk9IjE3MyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNyIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTA1IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTM5IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjA3IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjQxIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMjA3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNzEiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxNzMiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzIiB5PSIyNDEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEwNSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjIwNyIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PC9zdmc+",
            "width": 40,
            "height": 40,
            "alt": '01111110,01000010,01111110,00000001,00000001,01111110,01000010,01111110',
        }, {
            "type": "field_input",
            "name": "HIDDEN_MONO_LEDS_MATRIX"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_MATRIX_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "show_leds_matrix",
            "display_mono_led_matrix_init_extension"
        ]
    },

    {
        "type": "display_led_matrix_clear",
        "message0": "%{BKY_DISPLAY_LED_MATRIX_CLEAR_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "PIN",
                "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_MATRIX_CLEAR_TOOLTIP}",
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

    // BLOCK NEOPIXEL _ DEFINE NEOPIXEL
    {
        "type": "display_defineNeopixel",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_DEFINE_TITLE}",
        "args0": [{
            "type": "field_slider",
            "name": "N",
            "value": 20,
            "min": 1,
            "max": 1000
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

    // BLOCK CONTROL NEOPIXEL LED WITH COLOR
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

    // GROVE LED BAR MODULE _  LEVEL JSON
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