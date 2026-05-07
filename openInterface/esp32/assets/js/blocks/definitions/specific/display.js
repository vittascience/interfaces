/**
 * @fileoverview Display blocks for Esp32.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

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
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LCD_CLEAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CONTROL ESP32 LED  
    {
        "type": "display_controlBuiltInLED",
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
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_MATRIX_CLEAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    }

]); // END JSON EXTRACT (Do not delete this comment.)