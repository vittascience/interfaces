/**
 * @fileoverview Display blocks for mBot.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // BLOCK MAKEBLOCK _ MATRIX DRAW STRING
    {
        "type": "robots_makeBlock_matrixDrawString",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_MATRIX_DRAWSTRING_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
            "check": ["String", "Number", "Decimal", "Boolean"]
        }, {
            "type": "input_value",
            "name": "X",
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "Y",
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_MATRIX_DRAWSTRING_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK _ MATRIX SET NUMBER
    {
        "type": "robots_makeBlock_matrixShowNumber",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_MATRIX_SHOWNUMBER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "N",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_MATRIX_SHOWNUMBER_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK _ MATRIX SET CLOCK
    {
        "type": "robots_makeBlock_matrixShowClock",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_MATRIX_SHOWCLOCK_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "HOUR",
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "MIN",
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_MATRIX_SHOWCLOCK_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK _ MATRIX DRAW BITMAP
    {
        "type": "robots_makeBlock_matrixDrawBitmap",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_MATRIX_DRAWBITMAPICON_TITLE}",
        "args0": [{
            "type": "field_image",
            "name": "LEDS_MATRIX_BUTTON",
            "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJtYXRyaXgiIHdpZHRoPSI1NDYiIGhlaWdodD0iMjc0IiB2aWV3Qm94PSIwIDAgNTQ2IDI3NCI+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMiIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNzEiIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTA1IiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxNzMiIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjA3IiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNzUiIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzA5IiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM0MyIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNzciIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNDExIiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjQ0NSIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI0NzkiIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNTEzIiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMiIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDBiOWZmIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTA1IiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjA3IiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI3NSIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzA5IiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNDMiIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3NyIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDBiOWZmIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNDExIiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI0NDUiIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjQ3OSIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNTEzIiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzIiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNyIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDBiOWZmIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNzEiIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEwNSIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTM5IiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxNzMiIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjIwNyIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjQxIiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNzUiIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMwOSIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzQzIiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNzciIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjQxMSIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDBiOWZmIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNDQ1IiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI0NzkiIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjUxMyIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMTA1IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDBiOWZmIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNzEiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxNzMiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNzUiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzMDkiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNDMiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNzciIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI0MTEiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI0NDUiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI0NzkiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI1MTMiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzIiB5PSIxMzkiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEwNSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjIwNyIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI3NSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMwOSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM0MyIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3NyIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjQxMSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjQ0NSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjQ3OSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjUxMyIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMiIHk9IjE3MyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNyIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTA1IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDBiOWZmIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTM5IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDBiOWZmIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDBiOWZmIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjA3IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjQxIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjc1IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDBiOWZmIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzA5IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDBiOWZmIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzQzIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDBiOWZmIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzc3IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNDExIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDBiOWZmIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNDQ1IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNDc5IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNTEzIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMjA3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNzEiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxNzMiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNzUiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzMDkiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNDMiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNzciIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMGI5ZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI0MTEiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI0NDUiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI0NzkiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI1MTMiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzIiB5PSIyNDEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEwNSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjIwNyIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwYjlmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI3NSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMwOSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM0MyIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3NyIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjQxMSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjQ0NSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjQ3OSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNFMEU1RUIiIHg9IjUxMyIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PC9zdmc+",
            "width": 70,
            "height": 50,
            "alt": "00000000,00000000,00111100,01100010,01011110,01011110,00111100,00000001,00000001,00111100,01011110,01011110,01100010,00111100,00000000,00000000",
        }, {
            "type": "input_value",
            "name": "X",
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "Y",
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_MATRIX_DRAWBITMAPICON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "show_popup_leds_matrix"
        ]
    },

    // BLOCK MAKEBLOCK _ DEFINE NEOPIXEL
    {
        "type": "robots_makeBlock_defineNeopixel",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_NEOPIXEL_DEFINE_TITLE}",
        "args0": [{
            "type": "field_slider",
            "name": "N",
            "value": 20,
            "min": 1,
            "max": 1000
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "SLOT",
            "options": Blockly.Constants.Pins.MBOT_SLOT
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_NEOPIXEL_DEFINE_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK _ CONTROL NEOPIXEL LED
    {
        "type": "robots_makeBlock_controlNeopixelLed",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_NEOPIXEL_CONTROLLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "R",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "G",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "B",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "SLOT",
            "options": Blockly.Constants.Pins.MBOT_SLOT
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_NEOPIXEL_CONTROLLED_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK _ CONTROL NEOPIXEL LED BY PALETTE
    {
        "type": "robots_makeBlock_controlNeopixelPaletteLed",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_NEOPIXEL_PALETTECONTROLLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "SLOT",
            "options": Blockly.Constants.Pins.MBOT_SLOT
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_NEOPIXEL_PALETTECONTROLLED_TOOLTIP}",
    },

    // BLOCK CONTROL NEOPIXEL LED WITH COLOR
    {
        "type": "robots_makeBlock_neopixel_controlAllLedRGB",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDRGB_TITLE}",
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
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "SLOT",
            "options": Blockly.Constants.Pins.MBOT_SLOT
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDRGB_TOOLTIP}",
    },

    // BLOCK CONTROL NEOPIXEL LED WITH COLOR
    {
        "type": "robots_makeBlock_neopixel_controlAllLedPalette",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "SLOT",
            "options": Blockly.Constants.Pins.MBOT_SLOT
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDCOLOR_TOOLTIP}",
    },

    // BLOCK RAINBOW NEOPIXEL
    {
        "type": "robots_makeBlock_rainbowNeopixel",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_NEOPIXEL_RAINBOW_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "SLOT",
            "options": Blockly.Constants.Pins.MBOT_SLOT
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_NEOPIXEL_RAINBOW_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK _ SET RGB LED
    {
        "type": "robots_makeBlock_setRgbLed",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_SETRGBLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "R",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "G",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "B",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["%{BKY_ROBOTS_MAKEBLOCK_ALL_LED}", "0"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_SETRGBLED_TOOLTIP}",
    },

    //BLOCK MAKEBLOCK _ SET PALETTE COLOR RGB
    {
        "type": "robots_makeBlock_setPaletteRgbLed",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_SETPALETTERGBLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["%{BKY_ROBOTS_MAKEBLOCK_ALL_LED}", "0"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_SETPALETTERGBLED_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK _ 4 DIGIT DISPLAY
    {
        "type": "robots_makeBlock_set4DigitNumber",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_4DIGIT_SETNUMBER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "N",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_4DIGIT_SETNUMBER_TOOLTIP}",
    }

]); // END JSON EXTRACT (Do not delete this comment.)

// Initialization extensions
Blockly.Extensions.register("show_popup_leds_matrix", function () {
    Blockly.Constants.LOCK_INIT = 0;
    this.getField('LEDS_MATRIX_BUTTON').clickHandler_ = (() => {
        Blockly.Constants.LEDS_MATRIX_BLOCK = this.inputList[0].fieldRow[1];
        LedMatrixModalManager.disp_modal();
        // init matrix
        if (Blockly.Constants.LOCK_INIT == 0 && typeof Blockly.Wiki === 'undefined')
            LedMatrixModalManager.init();
        else
            LedMatrixModalManager.load_matrix_from_block();
        Blockly.Constants.LEDS_MATRIX = LedMatrixModalManager.get_matrix_dataset();
    });
}); 