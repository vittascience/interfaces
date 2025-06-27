/**
 * @fileoverview Display blocks for Esp32.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT 
    // {
    //     "type": "display_controlBuiltInLED",
    //     "message0": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_TITLE}",
    //     "args0": [
    //         {
    //           "type": "input_value",
    //           "name": "COLOR",
    //         }
    //     ],
    //     "inputsInline": true,
    //     "previousStatement": null,
    //     "nextStatement": null,
    //     "style": "display_blocks",
    //     "tooltip": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP}",
    //     "extensions": [
    //        "block_init_helpurl"
    //    ]
    // },
    // {
    //     "type": "display_controlBuiltInLEDOff",
    //     "message0": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_OFF_TITLE}",
    //     "inputsInline": true,
    //     "previousStatement": null,
    //     "nextStatement": null,
    //     "style": "display_blocks",
    //     "tooltip": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_OFF_TOOLTIP}",
    //     "extensions": [
    //        "block_init_helpurl"
    //    ]
    // },
    // led RGB
    {
        "type": "display_turnAllLedsOff",
        "message0": "%{BKY_DISPLAY_TURNOFF_ALL_LEDS_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_TURNOFF_ALL_LEDS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // timer flash LED
    {
        "type": "display_timer_flash_led",
        "message0": "%{BKY_DISPLAY_TIMER_FLASH_LED_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": 'Colour',
            },
            {
                "type": "input_value",
                "name": "TIME",
                "check": 'Number',
            }
        ],
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_DISPLAY_TIMER_FLASH_LED_TOOLTIP}",
    },
    {
        "type": "display_RGBLed_turnOff",
        "message0": "%{BKY_DISPLAY_RGBLED_TURNOFF_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "LED",
                "options": [
                    ["%{BKY_DISPLAY_RGBLED_TURNOFF_TOP}", "top"],
                    ["%{BKY_DISPLAY_RGBLED_TURNOFF_BOTTOM_RIGHT}", "bottom_right"],
                    ["%{BKY_DISPLAY_RGBLED_TURNOFF_BOTTOM_LEFT}", "bottom_left"],
                    ["%{BKY_DISPLAY_RGBLED_TURNOFF_CIRCLE}", "circle"],
                    ["%{BKY_DISPLAY_RGBLED_TURNOFF_HORIZONTAL_SENSORS}", "prox_h"],
                    ["%{BKY_DISPLAY_RGBLED_TURNOFF_VERTICAL_SENSORS}", "prox_v"],
                    ["%{BKY_DISPLAY_RGBLED_TURNOFF_LED_RC}", "rc"],
                    ["%{BKY_DISPLAY_RGBLED_TURNOFF_LED_BUTTONS}", "buttons"],
                    ["%{BKY_DISPLAY_RGBLED_TURNOFF_LED_TEMPERATURE}", "temperature"],
                    ["%{BKY_DISPLAY_RGBLED_TURNOFF_LED_MICROPHONE}", "sound"],
                ]
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_RGBLED_TURNOFF_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_RGBLed_setColor",
        "message0": "%{BKY_DISPLAY_RGBLED_SETCOLOR_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "LED",
                "options": [
                    ["%{BKY_DISPLAY_RGBLED_SETCOLOR_TOP}", "top"],
                    ["%{BKY_DISPLAY_RGBLED_SETCOLOR_BOTTOM_RIGHT}", "bottom_right"],
                    ["%{BKY_DISPLAY_RGBLED_SETCOLOR_BOTTOM_LEFT}", "bottom_left"],
                ]
            },
            {
                "type": "input_value",
                "name": "RED",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "GREEN",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "BLUE",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_RGBLED_SETCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_RGBLed_setColorPalette",
        "message0": "%{BKY_DISPLAY_RGBLED_SETCOLOR_PALETTE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "LED",
                "options": [
                    ["%{BKY_DISPLAY_RGBLED_SETCOLOR_TOP}", "top"],
                    ["%{BKY_DISPLAY_RGBLED_SETCOLOR_BOTTOM_RIGHT}", "bottom_right"],
                    ["%{BKY_DISPLAY_RGBLED_SETCOLOR_BOTTOM_LEFT}", "bottom_left"],
                ]
            },
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_RGBLED_SETCOLOR_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // turn on circle led
    {
        "type": "display_circleLed_turnOn",
        "message0": "%{BKY_DISPLAY_CIRCLELED_TURNON_TITLE}",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "FRONT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "FRONT_RIGHT",
                "check": "Number",
            },
            {
                "type": "input_value",
                "name": "RIGHT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "BACK_RIGHT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "BACK",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "BACK_LEFT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "LEFT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "FRONT_LEFT",
                "check": "Number"
            }
        ],
        // "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CIRCLELED_TURNON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // turn on proximity led
    {
        "type": "display_proximityLed_turnOn",
        "message0": "%{BKY_DISPLAY_PROXIMITYLED_TURNON_TITLE}",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "FRONT_LEFT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "FRONT_LEFT_CENTRAL",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "FRONT_CENTRAL_LEFT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "FRONT_CENTRAL_RIGHT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "FRONT_RIGHT_CENTRAL",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "FRONT_RIGHT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "BACK_LEFT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "BACK_RIGHT",
                "check": "Number"
            },
        ],
        // "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_PROXIMITYLED_TURNON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // turn on ground sensor led
    {
        "type": "display_groundSensorLed_turnOn",
        "message0": "%{BKY_DISPLAY_GROUNDSENSORLED_TURNON_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "LEFT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "RIGHT",
                "check": "Number"
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GROUNDSENSORLED_TURNON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // turn on Led buttons RIGHT LEFT BACK FRONT
    {
        "type": "display_ledButtons_turnOn",
        "message0": "%{BKY_DISPLAY_LEDBUTTONS_TURNON_TITLE}",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "FRONT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "RIGHT",
                "check": "Number"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "LEFT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "BACK",
                "check": "Number"
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LEDBUTTONS_TURNON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // sensor temperature led RED and BLUE
    {
        "type": "display_temperatureLed_turnOn",
        "message0": "%{BKY_DISPLAY_TEMPERATURELED_TURNON_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "RED",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "BLUE",
                "check": "Number"
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_TEMPERATURELED_TURNON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    //RC sensor led
    {
        "type": "display_rc_sound_SensorLed_turnOn",
        "message0": "%{BKY_DISPLAY_RC_SOUND_SENSORLED_TURNON_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "LED",
                "options": [
                    ["%{BKY_DISPLAY_RC_SENSORLED_TURNON}", "rc"],
                    ["%{BKY_DISPLAY_MIC_SENSORLED_TURNON}", "sound"],
                ],
            },
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "Number"
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_RC_SOUND_SENSORLED_TURNON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)