/**
 * @fileoverview Display blocks for Raspberry Pi.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /** Begin Sense HAT display blocks */

    // Display
    {
        "type": "sensehat_display_set_pixel",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_SET_PIXEL_TITLE}",
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
            "name": "RED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "GREEN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "BLUE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_SET_PIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    {
        "type": "sensehat_display_set_pixel_palette",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_SET_PIXEL_PALETTE_TITLE}",
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
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_SET_PIXEL_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    {
        "type": "sensehat_display_set_pixels_image",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_SET_PIXELS_IMAGE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "IMAGE",
            "options": [
                [{
                    'src': '/openInterface/raspberrypi/assets/media/blocks_icons/image_question_mark.png',
                    'width': 42,
                    'height': 42,
                    'alt': 'Red'
                }, "question_mark"],
                [{
                    'src': '/openInterface/raspberrypi/assets/media/blocks_icons/image_heart.png',
                    'width': 42,
                    'height': 42,
                    'alt': 'Red'
                }, "heart"],
                [{
                    'src': '/openInterface/raspberrypi/assets/media/blocks_icons/image_smile.png',
                    'width': 42,
                    'height': 42,
                    'alt': 'Red'
                }, 'smile'],
                [{
                    'src': '/openInterface/raspberrypi/assets/media/blocks_icons/image_house.png',
                    'width': 42,
                    'height': 42,
                    'alt': 'Red'
                }, 'house'],
                [{
                    'src': '/openInterface/raspberrypi/assets/media/blocks_icons/image_sad.png',
                    'width': 42,
                    'height': 42,
                    'alt': 'Red'
                }, 'sad'],
            ]
        }, {
            "type": "input_value",
            "name": "FOREGROUND_COLOR",
            "check": "Colour"
        }, {
            "type": "input_value",
            "name": "BACKGROUND_COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_SET_PIXELS_IMAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    {
        "type": "sensehat_show_leds_image",
        "message0": "%{BKY_SENSE_HAT_DISAPLY_SHOW_LEDS_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSE_HAT_DISAPLY_SHOW_LEDS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "sensehat_show_leds_image_init"
        ]
    },
    {
        "type": "sensehat_display_get_pixel",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_GET_PIXEL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }],
        "inputsInline": true,
        "output": "Array",
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_GET_PIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    {
        "type": "sensehat_display_get_pixels",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_GET_PIXELS_TITLE}",
        "output": "Array",
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_GET_PIXELS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    {
        "type": "sensehat_display_clear",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_CLEAR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_CLEAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    {
        "type": "sensehat_display_clear_with_color",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_CLEAR_WITH_COLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_CLEAR_WITH_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    {
        'type': 'sensehat_display_show_message',
        'message0': '%{BKY_SENSE_HAT_DISPLAY_SHOW_MESSAGE_TITLE}',
        'args0': [{
            'type': 'input_value',
            'name': 'MESSAGE',
            'check': 'String'
        }, {
            'type': 'input_value',
            'name': 'SPEED',
            'check': 'Number'
        }, {
            'type': 'input_value',
            'name': 'COLOR',
            'check': 'Colour'
        }, {
            'type': 'input_value',
            'name': 'BACKGROUND_COLOR',
            'check': 'Colour'
        }],
        'previousStatement': null,
        'nextStatement': null,
        'style': 'display_blocks',
        'tooltip': '%{BKY_SENSE_HAT_DISPLAY_SHOW_MESSAGE_TOOLTIP}',
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    {
        "type": "sensehat_display_show_letter",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_SHOW_LETTER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LETTER",
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "input_value",
            "name": "BACKGROUND_COLOR",
            "check": "Colour"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_SHOW_LETTER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Display ??= Object.create(null);

/**
 * Performs setup of 'sensehat_show_leds_image' block for screen checkboxes display.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.DISPLAY_SENSEHAT_SHOW_LEDS_INIT_EXTENSION = function () {
    for (var row = 0; row < 8; row++) {
        let rowBoxes = this.appendDummyInput("ROW" + row);
        for (var column = 0; column < 8; column++) {
            const box = new Blockly.FieldCheckboxColor(0, { 'height': 28, 'width': 24 });
            rowBoxes.appendField(box, "LED" + row + "" + column);
        }
    }
};

// Initialization extensions
Blockly.Extensions.register("sensehat_show_leds_image_init",
    Blockly.Constants.Display.DISPLAY_SENSEHAT_SHOW_LEDS_INIT_EXTENSION);