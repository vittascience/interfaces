/**
 * @fileoverview Display blocks for Lego Spike Prime.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "display_show_leds",
        "message0": "%{BKY_DISPLAY_SHOW_LEDS_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "extensions": [
            "block_init_helpurl",
            "display_show_leds_init"
        ]
    },
    {
        "type": "display_show_image",
        "message0": "%{BKY_DISPLAY_SHOW_IMAGE_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "IMAGE",
            "options": [
                ["heart", "HEART"],
                ["heart small", "HEART_SMALL"],
                ["happy", "HAPPY"],
                ["smile", "SMILE"],
                ["sad", "SAD"],
                ["confused", "CONFUSED"],
                ["angry", "ANGRY"],
                ["asleep", "ASLEEP"],
                ["surprised", "SURPRISED"],
                ["silly", "SILLY"],
                ["fabulous", "FABULOUS"],
                ["meh", "MEH"],
                ["yes", "YES"],
                ["no", "NO"],
                ["arrow n", "ARROW_N"],
                ["arrow ne", "ARROW_NE"],
                ["arrow e", "ARROW_E"],
                ["arrow se", "ARROW_SE"],
                ["arrow s", "ARROW_S"],
                ["arrow sw", "ARROW_SW"],
                ["arrow w", "ARROW_W"],
                ["arrow nw", "ARROW_NW"],
                ["diamond", "DIAMOND"],
                ["square", "SQUARE"],
                ["triangle", "TRIANGLE"],
                ["target", "TARGET"],
                ["ghost", "GHOST"],
                ["skull", "SKULL"],
                ["duck", "DUCK"],
                ["butterfly", "BUTTERFLY"],
                ["music crotchet", "MUSIC_CROTCHET"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "display_write",
        "message0": "%{BKY_DISPLAY_WRITE_TITLE}",
        "args0": [
            { "type": "input_value", "name": "TEXT" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "display_set_pixel",
        "message0": "%{BKY_DISPLAY_SET_PIXEL_TITLE}",
        "args0": [
            { "type": "input_value", "name": "X", "check": "Number" },
            { "type": "input_value", "name": "Y", "check": "Number" },
            { "type": "input_value", "name": "INTENSITY", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "display_clear",
        "message0": "%{BKY_DISPLAY_CLEAR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "display_set_light",
        "message0": "%{BKY_DISPLAY_SET_LIGHT_TITLE}",
        "args0": [
            { "type": "field_dropdown", "name": "COLOR", "options": Blockly.Constants.LEGO_COLORS }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "extensions": ["block_init_helpurl"]
    }
]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Display = Object.create(null);

/**
 * Performs setup of 'display_show_leds' block: 5x5 checkboxes, as for the micro:bit screen.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.DISPLAY_SHOW_LEDS_INIT_EXTENSION = function () {
    for (let row = 0; row < 5; row++) {
        const rowBoxes = this.appendDummyInput("ROW" + row);
        for (let column = 0; column < 5; column++) {
            rowBoxes.appendField(new Blockly.FieldCheckboxColor(0, { 'height': 28, 'width': 24 }), "LED" + row + "" + column);
        }
    }
};

Blockly.Extensions.register("display_show_leds_init",
    Blockly.Constants.Display.DISPLAY_SHOW_LEDS_INIT_EXTENSION);
