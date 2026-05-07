/**
 * @fileoverview Input/Output blocks for STeaMi.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // BLOCK ON BUTTON PRESSED
    {
        "type": "io_steami_onSwitchButtonState",
        "message0": "%{BKY_IO_STEAMI_ONSWITCHBUTTONPRESSED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SWITCH",
            "options": [
                ["A", "A_BUTTON"],
                ["B", "B_BUTTON"],
                ["Menu", "MENU_BUTTON"],
                ["Up", "UP_BUTTON"],
                ["Down", "DOWN_BUTTON"],
                ["Left", "LEFT_BUTTON"],
                ["Right", "RIGHT_BUTTON"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_STM32_PRESSED}", "PRESSED"],
                ["%{BKY_IO_STM32_RELEASED}", "RELEASED"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_STEAMI_ONSWITCHBUTTONPRESSED_TOOLTIP}",
    }
]); // END JSON EXTRACT (Do not delete this comment.)