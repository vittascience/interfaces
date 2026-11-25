/**
 * @fileoverview MatataCon controller blocks for Matatalab.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "matatacon_isButton",
        "message0": "%{BKY_MATATACON_IS_BUTTON_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "BUTTON",
                "options": [
                    ["%{BKY_MATATALAB_BUTTON_PLAY}", "play"],
                    ["%{BKY_MATATALAB_BUTTON_DELETE}", "delete"],
                    ["%{BKY_MATATALAB_BUTTON_FORWARD}", "forward"],
                    ["%{BKY_MATATALAB_BUTTON_BACKWARD}", "backward"],
                    ["%{BKY_MATATALAB_BUTTON_LEFT}", "left"],
                    ["%{BKY_MATATALAB_BUTTON_RIGHT}", "right"],
                    ["%{BKY_MATATALAB_BUTTON_MUSIC}", "music"]
                ]
            }
        ],
        "output": "Boolean",
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_IS_BUTTON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_isGesture",
        "message0": "%{BKY_MATATACON_IS_GESTURE_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "GESTURE",
                "options": [
                    ["%{BKY_MATATALAB_GESTURE_SHAKE}", "shake"],
                    ["%{BKY_MATATALAB_GESTURE_TILT_LEFT}", "tilt_left"],
                    ["%{BKY_MATATALAB_GESTURE_TILT_RIGHT}", "tilt_right"],
                    ["%{BKY_MATATALAB_GESTURE_TILT_FORWARD}", "tilt_forward"],
                    ["%{BKY_MATATALAB_GESTURE_TILT_BACKWARD}", "tilt_backward"],
                    ["%{BKY_MATATALAB_GESTURE_FALL}", "fall"],
                    ["%{BKY_MATATALAB_GESTURE_FACE_UP}", "face_up"],
                    ["%{BKY_MATATALAB_GESTURE_FACE_DOWN}", "face_down"]
                ]
            }
        ],
        "output": "Boolean",
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_IS_GESTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_isColor",
        "message0": "%{BKY_MATATACON_IS_COLOR_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "COLOR",
                "options": [
                    ["%{BKY_MATATALAB_COLOR_WHITE}", "white"],
                    ["%{BKY_MATATALAB_COLOR_RED}", "red"],
                    ["%{BKY_MATATALAB_COLOR_YELLOW}", "yellow"],
                    ["%{BKY_MATATALAB_COLOR_GREEN}", "green"],
                    ["%{BKY_MATATALAB_COLOR_BLUE}", "blue"],
                    ["%{BKY_MATATALAB_COLOR_PURPLE}", "purple"],
                    ["%{BKY_MATATALAB_COLOR_BLACK}", "black"]
                ]
            }
        ],
        "output": "Boolean",
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_IS_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_isSound",
        "message0": "%{BKY_MATATACON_IS_SOUND_TITLE}",
        "output": "Boolean",
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_IS_SOUND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_isObstacle",
        "message0": "%{BKY_MATATACON_IS_OBSTACLE_TITLE}",
        "output": "Boolean",
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_IS_OBSTACLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_isLight",
        "message0": "%{BKY_MATATACON_IS_LIGHT_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "STATE",
                "options": [
                    ["%{BKY_MATATALAB_LIGHT_BRIGHT}", "bright"],
                    ["%{BKY_MATATALAB_LIGHT_DARK}", "dark"]
                ]
            }
        ],
        "output": "Boolean",
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_IS_LIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_getBrightness",
        "message0": "%{BKY_MATATACON_GET_BRIGHTNESS_TITLE}",
        "output": "Number",
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_GET_BRIGHTNESS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_getColor",
        "message0": "%{BKY_MATATACON_GET_COLOR_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "CHANNEL",
                "options": [
                    ["%{BKY_MATATALAB_COLOR_RED}", "red"],
                    ["%{BKY_MATATALAB_COLOR_GREEN}", "green"],
                    ["%{BKY_MATATALAB_COLOR_BLUE}", "blue"]
                ]
            }
        ],
        "output": "Number",
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_GET_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_getAngle",
        "message0": "%{BKY_MATATACON_GET_ANGLE_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "ANGLE",
                "options": [
                    ["%{BKY_MATATALAB_ANGLE_PITCH}", "pitch"],
                    ["%{BKY_MATATALAB_ANGLE_ROLL}", "roll"],
                    ["%{BKY_MATATALAB_ANGLE_YAW}", "yaw"]
                ]
            }
        ],
        "output": "Number",
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_GET_ANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_getAcceleration",
        "message0": "%{BKY_MATATACON_GET_ACCELERATION_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "AXIS",
                "options": [
                    ["x", "x"],
                    ["y", "y"],
                    ["z", "z"]
                ]
            }
        ],
        "output": "Number",
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_GET_ACCELERATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_getShaking",
        "message0": "%{BKY_MATATACON_GET_SHAKING_TITLE}",
        "output": "Number",
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_GET_SHAKING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_setRingColor",
        "message0": "%{BKY_MATATACON_SET_RING_COLOR_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "LED",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "COLOR",
                "options": [
                    ["%{BKY_MATATALAB_COLOR_WHITE}", "white"],
                    ["%{BKY_MATATALAB_COLOR_RED}", "red"],
                    ["%{BKY_MATATALAB_COLOR_YELLOW}", "yellow"],
                    ["%{BKY_MATATALAB_COLOR_GREEN}", "green"],
                    ["%{BKY_MATATALAB_COLOR_BLUE}", "blue"],
                    ["%{BKY_MATATALAB_COLOR_PURPLE}", "purple"],
                    ["%{BKY_MATATALAB_COLOR_BLACK}", "black"]
                ]
            },
            {
                "type": "input_value",
                "name": "LEVEL",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_SET_RING_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_setRing",
        "message0": "%{BKY_MATATACON_SET_RING_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "LED",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_SET_RING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_setRingLeds",
        "message0": "%{BKY_MATATACON_SET_RING_LEDS_TITLE}",
        "args0": [
            {
                "type": "field_colour",
                "name": "LED1",
                "colour": "#ffffff"
            },
            {
                "type": "field_colour",
                "name": "LED2",
                "colour": "#ffffff"
            },
            {
                "type": "field_colour",
                "name": "LED3",
                "colour": "#ffffff"
            },
            {
                "type": "field_colour",
                "name": "LED4",
                "colour": "#ffffff"
            },
            {
                "type": "field_colour",
                "name": "LED5",
                "colour": "#ffffff"
            },
            {
                "type": "field_colour",
                "name": "LED6",
                "colour": "#ffffff"
            },
            {
                "type": "field_colour",
                "name": "LED7",
                "colour": "#ffffff"
            },
            {
                "type": "field_colour",
                "name": "LED8",
                "colour": "#ffffff"
            },
            {
                "type": "field_colour",
                "name": "LED9",
                "colour": "#ffffff"
            },
            {
                "type": "field_colour",
                "name": "LED10",
                "colour": "#ffffff"
            },
            {
                "type": "field_colour",
                "name": "LED11",
                "colour": "#ffffff"
            },
            {
                "type": "field_colour",
                "name": "LED12",
                "colour": "#ffffff"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_SET_RING_LEDS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_ringAnimation",
        "message0": "%{BKY_MATATACON_RING_ANIMATION_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "ANIMATION",
                "options": [
                    ["%{BKY_MATATALAB_ANIMATION_SPOONDRIFT}", "spoondrift"],
                    ["%{BKY_MATATALAB_ANIMATION_METEOR}", "meteor"],
                    ["%{BKY_MATATALAB_ANIMATION_RAINBOW}", "rainbow"],
                    ["%{BKY_MATATALAB_ANIMATION_FIREFLY}", "firefly"],
                    ["%{BKY_MATATALAB_ANIMATION_COLORWIPE}", "colorwipe"],
                    ["%{BKY_MATATALAB_ANIMATION_BREATHE}", "breathe"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_RING_ANIMATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_clearRing",
        "message0": "%{BKY_MATATACON_CLEAR_RING_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_CLEAR_RING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_sendMessage",
        "message0": "%{BKY_MATATACON_SEND_MESSAGE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "MESSAGE",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_SEND_MESSAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_isMessage",
        "message0": "%{BKY_MATATACON_IS_MESSAGE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "MESSAGE",
                "check": "Number"
            }
        ],
        "output": "Boolean",
        "inputsInline": true,
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_IS_MESSAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "matatacon_getMessage",
        "message0": "%{BKY_MATATACON_GET_MESSAGE_TITLE}",
        "output": "Number",
        "style": "matatacon_blocks",
        "tooltip": "%{BKY_MATATACON_GET_MESSAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)
