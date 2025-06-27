/**
 * @fileoverview Display blocks for Nao.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    // {
    //     "type": "display_earLedsSetAngle",
    //     "message0": "%{BKY_DISPLAY_EAR_LEDS_SET_ANGLE_TITLE}",
    //     "args0": [
    //         {
    //             "type": "input_value",
    //             "name": "ANGLE",
    //             "check": "Number"
    //         },
    //         {
    //             "type": "input_value",
    //             "name": "DURATION",
    //             "check": "Number"
    //         },
    //         {
    //             "type": "input_value",
    //             "name": "LEAVE_ON_AT_END",
    //             "check": "Boolean"
    //         }
    //     ],
    //     "previousStatement": null,
    //     "nextStatement": null,
    //     "inputsInline": true,
    //     "style": "display_blocks",
    //     "tooltip": "%{BKY_DISPLAY_EAR_LEDS_SET_ANGLE_TOOLTIP}",
    //     "extensions": [
    //     "block_init_helpurl"
    // ]
    // },
    {
        "type": "display_fade",
        "message0": "%{BKY_DISPLAY_FADE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    ["%{BKY_DISPLAY_ALL_LEDS_GROUP}", "AllLeds"],
                    ["%{BKY_DISPLAY_BRAIN_LEDS_GROUP}", "BrainLeds"],
                    ["%{BKY_DISPLAY_FACE_LEDS_GROUP}", "FaceLeds"],
                    ["%{BKY_DISPLAY_CHEST_LEDS_GROUP}", "ChestLeds"],
                    ["%{BKY_DISPLAY_FEET_LEDS_GROUP}", "FeetLeds"]
                ]
            },
            {
                "type": "input_value",
                "name": "INTENSITY",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_FADE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_fadeRGB",
        "message0": "%{BKY_DISPLAY_FADE_RGB_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    ["%{BKY_DISPLAY_ALL_LEDS_GROUP}", "AllLeds"],
                    ["%{BKY_DISPLAY_BRAIN_LEDS_GROUP}", "BrainLeds"],
                    ["%{BKY_DISPLAY_FACE_LEDS_GROUP}", "FaceLeds"],
                    ["%{BKY_DISPLAY_CHEST_LEDS_GROUP}", "ChestLeds"],
                    ["%{BKY_DISPLAY_FEET_LEDS_GROUP}", "FeetLeds"]
                ]
            },
            {
                "type": "input_value",
                "name": "R",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "G",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "B",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_FADE_RGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_fadeRGB_palette",
        "message0": "%{BKY_DISPLAY_FADE_RGB_PALETTE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    ["%{BKY_DISPLAY_ALL_LEDS_GROUP}", "AllLeds"],
                    ["%{BKY_DISPLAY_BRAIN_LEDS_GROUP}", "BrainLeds"],
                    ["%{BKY_DISPLAY_FACE_LEDS_GROUP}", "FaceLeds"],
                    ["%{BKY_DISPLAY_CHEST_LEDS_GROUP}", "ChestLeds"],
                    ["%{BKY_DISPLAY_FEET_LEDS_GROUP}", "FeetLeds"]
                ]
            },
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            },
            {
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_FADE_RGB_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_fadeRGB_colorName",
        "message0": "%{BKY_DISPLAY_FADE_RGB_COLOR_NAME_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    ["%{BKY_DISPLAY_ALL_LEDS_GROUP}", "AllLeds"],
                    ["%{BKY_DISPLAY_BRAIN_LEDS_GROUP}", "BrainLeds"],
                    ["%{BKY_DISPLAY_FACE_LEDS_GROUP}", "FaceLeds"],
                    ["%{BKY_DISPLAY_CHEST_LEDS_GROUP}", "ChestLeds"],
                    ["%{BKY_DISPLAY_FEET_LEDS_GROUP}", "FeetLeds"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "COLOR",
                "options": [
                    ["%{BKY_DISPLAY_WHITE_COLOR}", "white"],
                    ["%{BKY_DISPLAY_RED_COLOR}", "red"],
                    ["%{BKY_DISPLAY_GREEN_COLOR}", "green"],
                    ["%{BKY_DISPLAY_BLUE_COLOR}", "blue"],
                    ["%{BKY_DISPLAY_YELLOW_COLOR}", "yellow"],
                    ["%{BKY_DISPLAY_MAGENTA_COLOR}", "magenta"],
                    ["%{BKY_DISPLAY_CYAN_COLOR}", "cyan"]
                ]
            },
            {
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_FADE_RGB_COLOR_NAME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_fadeFaceRGB",
        "message0": "%{BKY_DISPLAY_FADE_FACE_RGB_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "SIDE",
                "options": [
                    ["%{BKY_DISPLAY_FACE_LEFT}", "Left"],
                    ["%{BKY_DISPLAY_FACE_RIGHT}", "Right"],
                    ["%{BKY_DISPLAY_FACE_LEFT&RIGHT}", "Left&Right"]
                ]
            },
            {
                "type": "input_value",
                "name": "R",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "G",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "B",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_FADE_FACE_RGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_fadeFaceRGB_palette",
        "message0": "%{BKY_DISPLAY_FADE_FACE_RGB_PALETTE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "SIDE",
                "options": [
                    ["%{BKY_DISPLAY_FACE_LEFT}", "Left"],
                    ["%{BKY_DISPLAY_FACE_RIGHT}", "Right"],
                    ["%{BKY_DISPLAY_FACE_LEFT&RIGHT}", "Left&Right"]
                ]
            },
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            },
            {
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_FADE_FACE_RGB_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_rotateEyes",
        "message0": "%{BKY_DISPLAY_ROTATE_EYES_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            },
            {
                "type": "input_value",
                "name": "TIME_FOR_ROTATION",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_ROTATE_EYES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_setIntensity",
        "message0": "%{BKY_DISPLAY_SET_INTENSITY_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    ["%{BKY_DISPLAY_ALL_LEDS_GROUP}", "AllLeds"],
                    ["%{BKY_DISPLAY_BRAIN_LEDS_GROUP}", "BrainLeds"],
                    ["%{BKY_DISPLAY_EAR_LEDS_GROUP}", "EarLeds"],
                    ["%{BKY_DISPLAY_FACE_LEDS_GROUP}", "FaceLeds"],
                    ["%{BKY_DISPLAY_CHEST_LEDS_GROUP}", "ChestLeds"],
                    ["%{BKY_DISPLAY_FEET_LEDS_GROUP}", "FeetLeds"]
                ]
            },
            {
                "type": "input_value",
                "name": "INTENSITY",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_INTENSITY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_off",
        "message0": "%{BKY_DISPLAY_OFF_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    ["%{BKY_DISPLAY_ALL_LEDS_GROUP}", "AllLeds"],
                    ["%{BKY_DISPLAY_BRAIN_LEDS_GROUP}", "BrainLeds"],
                    ["%{BKY_DISPLAY_EAR_LEDS_GROUP}", "EarLeds"],
                    ["%{BKY_DISPLAY_FACE_LEDS_GROUP}", "FaceLeds"],
                    ["%{BKY_DISPLAY_CHEST_LEDS_GROUP}", "ChestLeds"],
                    ["%{BKY_DISPLAY_FEET_LEDS_GROUP}", "FeetLeds"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_OFF_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_on",
        "message0": "%{BKY_DISPLAY_ON_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    ["%{BKY_DISPLAY_ALL_LEDS_GROUP}", "AllLeds"],
                    ["%{BKY_DISPLAY_BRAIN_LEDS_GROUP}", "BrainLeds"],
                    ["%{BKY_DISPLAY_EAR_LEDS_GROUP}", "EarLeds"],
                    ["%{BKY_DISPLAY_FACE_LEDS_GROUP}", "FaceLeds"],
                    ["%{BKY_DISPLAY_CHEST_LEDS_GROUP}", "ChestLeds"],
                    ["%{BKY_DISPLAY_FEET_LEDS_GROUP}", "FeetLeds"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_ON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_randomEyes",
        "message0": "%{BKY_DISPLAY_RANDOM_EYES_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_RANDOM_EYES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_rasta",
        "message0": "%{BKY_DISPLAY_RASTA_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_RASTA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_reset",
        "message0": "%{BKY_DISPLAY_RESET_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    ["%{BKY_DISPLAY_ALL_LEDS_GROUP}", "AllLeds"],
                    ["%{BKY_DISPLAY_BRAIN_LEDS_GROUP}", "BrainLeds"],
                    ["%{BKY_DISPLAY_EAR_LEDS_GROUP}", "EarLeds"],
                    ["%{BKY_DISPLAY_FACE_LEDS_GROUP}", "FaceLeds"],
                    ["%{BKY_DISPLAY_CHEST_LEDS_GROUP}", "ChestLeds"],
                    ["%{BKY_DISPLAY_FEET_LEDS_GROUP}", "FeetLeds"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_RESET_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)

