/**
 * @fileoverview RGB LED blocks of the Arduino UNO Q: LEDs 3 and 4 are driven by the microcontroller (sketch),
 * LEDs 1 and 2 by Linux (Python).
 */

// Colour: on / off state of the red, green and blue channels (no PWM: 7 colours)
const UNOQ_RGB_LED_COLORS = [
    ["%{BKY_UNOQ_RGB_LED_RED}", "100"],
    ["%{BKY_UNOQ_RGB_LED_GREEN}", "010"],
    ["%{BKY_UNOQ_RGB_LED_BLUE}", "001"],
    ["%{BKY_UNOQ_RGB_LED_YELLOW}", "110"],
    ["%{BKY_UNOQ_RGB_LED_CYAN}", "011"],
    ["%{BKY_UNOQ_RGB_LED_MAGENTA}", "101"],
    ["%{BKY_UNOQ_RGB_LED_WHITE}", "111"],
    ["%{BKY_UNOQ_RGB_LED_OFF}", "000"]
];

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

    // RGB LED 3 / 4 _ SET COLOUR (on / off channels: 7 colours)
    {
        "type": "display_unoq_rgbLed",
        "message0": "%{BKY_UNOQ_RGB_LED_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "LED",
            "options": [
                ["3", "3"],
                ["4", "4"]
            ]
        }, {
            "type": "field_dropdown",
            "name": "COLOR",
            "options": UNOQ_RGB_LED_COLORS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_UNOQ_RGB_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // RGB LED 1 / 2 _ SET COLOUR (Linux, /sys/class/leds)
    {
        "type": "display_unoq_linuxRgbLed",
        "message0": "%{BKY_UNOQ_LINUX_RGB_LED_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "LED",
            "options": [
                ["1", "1"],
                ["2", "2"]
            ]
        }, {
            "type": "field_dropdown",
            "name": "COLOR",
            "options": UNOQ_RGB_LED_COLORS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_UNOQ_LINUX_RGB_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    }

]);  // END JSON EXTRACT (Do not delete this comment.)
