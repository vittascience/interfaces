/**
 * @fileoverview Display blocks for Buddy.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "display_blinkLed",
        "message0": "%{BKY_DISPLAY_BLINK_LED_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "POSITION",
                "options": [
                    ["%{BKY_DISPLAY_LED_RIGHT}", "0"],
                    ["%{BKY_DISPLAY_LED_LEFT}", "1"],
                    ["%{BKY_DISPLAY_LED_HEART}", "2"],
                ]
            },
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            },
            {
                "type": "input_value",
                "name": "PERIOD",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "LOCK",
                "options": [
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "True"],
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "False"],
                ]
            }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_BLINK_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "lock_tooltip"
        ]
    },
    {
        "type": "display_blinkAllLed",
        "message0": "%{BKY_DISPLAY_BLINK_ALL_LED_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            },
            {
                "type": "input_value",
                "name": "PERIOD",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "LOCK",
                "options": [
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "True"],
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "False"],
                ]
            }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_BLINK_ALL_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "lock_tooltip"
        ]
    },
    {
        "type": "display_updateAllLed",
        "message0": "%{BKY_DISPLAY_UPDATE_ALL_LED_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            },
            {
                "type": "field_grid_dropdown",
                "name": "LOCK",
                "options": [
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "True"],
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "False"],
                ]
            }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_UPDATE_ALL_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "lock_tooltip"
        ]
    },
    {
        "type": "display_fadeAllLed",
        "message0": "%{BKY_DISPLAY_FADE_ALL_LED_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            },
            {
                "type": "input_value",
                "name": "PERIOD",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "LOCK",
                "options": [
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "True"],
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "False"],
                ]
            }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_FADE_ALL_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "lock_tooltip"
        ]
    },
    {
        "type": "display_updateLedColor",
        "message0": "%{BKY_DISPLAY_UPDATE_LED_COLOR_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "POSITION",
                "options": [
                    ["%{BKY_DISPLAY_LED_RIGHT}", "0"],
                    ["%{BKY_DISPLAY_LED_LEFT}", "1"],
                    ["%{BKY_DISPLAY_LED_HEART}", "2"],
                ]
            },
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            },
            {
                "type": "field_grid_dropdown",
                "name": "LOCK",
                "options": [
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "True"],
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "False"],
                ]
            }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_UPDATE_LED_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "lock_tooltip"
        ]
    },
    {
        "type": "display_updateAllLedWithPattern",
        "message0": "%{BKY_DISPLAY_UPDATE_ALL_LED_WITH_PATTERN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PATTERN",
            "options": [
                ["%{BKY_DISPLAY_PATTERN_1}", "1"],
                ["%{BKY_DISPLAY_PATTERN_2}", "2"],
                ["%{BKY_DISPLAY_PATTERN_3}", "3"],
                ["%{BKY_DISPLAY_PATTERN_4}", "4"],
            ]
        },
        {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        },
        {
            "type": "input_value",
            "name": "PERIOD",
            "check": "Number"
        },
        {
            "type": "input_value",
            "name": "STEP",
            "check": "Number"
        },
        {
            "type": "field_grid_dropdown",
            "name": "LOCK",
            "options": [
                [{
                    'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                    'width': 12,
                    'height': 12,
                    'alt': 'Lock'
                }, "True"],
                [{
                    'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                    'width': 12,
                    'height': 12,
                    'alt': 'Lock'
                }, "False"],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_UPDATE_ALL_LED_WITH_PATTERN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "lock_tooltip"
        ]
    },
    {
        "type": "display_stopAllLed",
        "message0": "%{BKY_DISPLAY_STOP_ALL_LED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LOCK",
            "options": [
                [{
                    'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                    'width': 12,
                    'height': 12,
                    'alt': 'Lock'
                }, "True"],
                [{
                    'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                    'width': 12,
                    'height': 12,
                    'alt': 'Lock'
                }, "False"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_STOP_ALL_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "lock_tooltip"
        ]
    },
    {
        "type": "display_stopLed",
        "message0": "%{BKY_DISPLAY_STOP_LED_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "POSITION",
                "options": [
                    ["%{BKY_DISPLAY_LED_RIGHT}", "RightShoulder"],
                    ["%{BKY_DISPLAY_LED_LEFT}", "LeftShoulder"],
                    ["%{BKY_DISPLAY_LED_HEART}", "Heart"],
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "LOCK",
                "options": [
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "True"],
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "False"],
                ]
            }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_STOP_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "lock_tooltip"
        ]
    },
    {
        "type": "display_setMood",
        "message0": "%{BKY_DISPLAY_SET_MOOD_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "EXPRESSION",
                "options": [
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_NEUTRAL}", "NEUTRAL"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_GRUMPY}", "GRUMPY"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_HAPPY}", "HAPPY"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_ANGRY}", "ANGRY"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_LISTENING}", "LISTENING"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_LOVE}", "LOVE"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_SAD}", "SAD"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_SCARED}", "SCARED"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_SICK}", "SICK"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_SURPRISED}", "SURPRISED"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_THINKING}", "THINKING"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_TIRED}", "TIRED"],
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "LOCK",
                "options": [
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "True"],
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "False"],
                ]
            }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_MOOD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "display_set_mood_init_extension",
            "lock_tooltip"
        ],
        "mutator": "display_set_mood_speed_mutator",
    },
    {
        "type": "display_setFacialExpression",
        "message0": "%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "EXPRESSION",
                "options": [
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_NEUTRAL}", "NEUTRAL"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_GRUMPY}", "GRUMPY"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_HAPPY}", "HAPPY"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_ANGRY}", "ANGRY"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_LISTENING}", "LISTENING"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_LOVE}", "LOVE"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_SAD}", "SAD"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_SCARED}", "SCARED"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_SICK}", "SICK"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_SURPRISED}", "SURPRISED"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_THINKING}", "THINKING"],
                    ["%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_TIRED}", "TIRED"],
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "LOCK",
                "options": [
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "True"],
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "False"],
                ]
            }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_FACIAL_EXPRESSION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "display_set_facial_expression_init_extension",
            "lock_tooltip"
        ],
        "mutator": "display_set_facial_expression_speed_mutator",
    },
    {
        "type": "display_playFacialEvent",
        "message0": "%{BKY_DISPLAY_PLAY_FACIAL_EVENT_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "EXPRESSION",
                "options": [
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_DOUBTFUL}", "DOUBTFUL"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_AWAKE}", "AWAKE"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_BLINK_EYES}", "BLINK_EYES"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_BLINK_LEFT_EYE}", "BLINK_EYES_LEFT"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_BLINK_RIGHT_EYE}", "BLINK_EYES_RIGHT"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_CLOSE_EYES}", "CLOSE_EYES"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_CLOSE_LEFT_EYE}", "CLOSE_LEFT_EYE"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_CLOSE_RIGHT_EYE}", "CLOSE_RIGHT_EYE"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_FALL_ASLEEP}", "FALL ASLEEP"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_GROWLING}", "GROWLING"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_OPEN_EYES}", "OPEN_EYES"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_OPEN_LEFT_EYE}", "LEFT_EYE"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_OPEN_RIGHT_EYE}", "OPEN_RIGHT_EYE"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_SMILE}", "SMILE"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_SURPRISED}", "SURPRISED"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_SUSPICIOUS}", "SUSPICIOUS"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_TEASE}", "TEASE"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_WHAT}", "WHAT"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_WHISTLE}", "WHISTLE"],
                    ["%{BKY_DISPLAY_PLAY_FACIAL_EVENT_YAWN}", "YAWN"],
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "LOCK",
                "options": [
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "True"],
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "False"],
                ]
            }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_PLAY_FACIAL_EVENT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "display_play_facial_event_init_extension",
            //"display_playFacialEvent_tooltip"
        ],
        "mutator": "display_play_facial_event_speed_mutator",
    },
    {
        "type": "display_setLabialExpression",
        "message0": "%{BKY_DISPLAY_SET_LABIAL_EXPRESSION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "EXPRESSION",
            "options": [
                ["%{BKY_DISPLAY_SET_LABIAL_EXPRESSION_SPEAK_ANGRY}", "SPEAK_ANGRY"],
                ["%{BKY_DISPLAY_SET_LABIAL_EXPRESSION_NO_FACE}", "NO FACE"],
                ["%{BKY_DISPLAY_SET_LABIAL_EXPRESSION_SPEAK_HAPPY}", "SPEAK HAPPY"],
                ["%{BKY_DISPLAY_SET_LABIAL_EXPRESSION_SPEAK_NEUTRAL}", "SPEAK NEUTRAL"],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_LABIAL_EXPRESSION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "display_setFacePositivity",
        "message0": "%{BKY_DISPLAY_SET_FACE_POSIVITY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "POSITIVITY",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_FACE_POSIVITY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "display_setFaceEnergy",
        "message0": "%{BKY_DISPLAY_SET_FACE_ENERGY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ENERGY",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_FACE_ENERGY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "display_playFacialRelativeEvent",
        "message0": "%{BKY_DISPLAY_PLAY_FACIAL_RELATIVE_EVENT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_PLAY_FACIAL_RELATIVE_EVENT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "display_lookAtXY",
        "message0": "%{BKY_DISPLAY_LOOK_AT_XY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "X",
            "check": "Number"
        },
        {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        },
        {
            "type": "field_grid_dropdown",
            "name": "ANIMATION",
            "options": [
                ["%{BKY_DISPLAY_LOOK_AT_SMOOTH}", "True"],
                ["%{BKY_DISPLAY_LOOK_AT_INSTANT}", "False"],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LOOK_AT_XY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "display_lookAt",
        "message0": "%{BKY_DISPLAY_LOOK_AT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_DISPLAY_LOOK_AT_CENTER}", "CENTER"],
                ["%{BKY_DISPLAY_LOOK_AT_TOP}", "TOP"],
                ["%{BKY_DISPLAY_LOOK_AT_LEFT}", "LEFT"],
                ["%{BKY_DISPLAY_LOOK_AT_RIGHT}", "RIGHT"],
                ["%{BKY_DISPLAY_LOOK_AT_BOTTOM}", "BOTTOM"],
                ["%{BKY_DISPLAY_LOOK_AT_TOP_LEFT}", "TOP_LEFT"],
                ["%{BKY_DISPLAY_LOOK_AT_TOP_RIGHT}", "TOP_RIGHT"],
                ["%{BKY_DISPLAY_LOOK_AT_BOTTOM_RIGHT}", "BOTTOM_RIGHT"],
                ["%{BKY_DISPLAY_LOOK_AT_BOTTOM_LEFT}", "BOTTOM_LEFT"],
            ]
        },
        {
            "type": "field_grid_dropdown",
            "name": "ANIMATION",
            "options": [
                ["%{BKY_DISPLAY_LOOK_AT_SMOOTH}", "True"],
                ["%{BKY_DISPLAY_LOOK_AT_INSTANT}", "False"],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LOOK_AT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    }
]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Display = Object.create(null);

/**
 * Performs final setup of 'display_setMood' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.DISPLAY_SET_MOOD_INIT_EXTENSION = function () {
    this.speed_ = false;
    this.update_();
    this.setInputsInline(true);
};

/**
 * Mixin for mutator functions in the 'DISPLAY_SET_MOOD_SPEED' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Display.DISPLAY_SET_MOOD_SPEED_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('speed', 'DISPLAY_SET_MOOD_SPEED', 'input', 0);

// Initialization extensions
Blockly.Extensions.register("display_set_mood_init_extension",
    Blockly.Constants.Display.DISPLAY_SET_MOOD_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator('display_set_mood_speed_mutator',
    Blockly.Constants.Display.DISPLAY_SET_MOOD_SPEED_MIXIN);

/**
 * Performs final setup of 'display_setFacialExpression' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.DISPLAY_SET_FACIAL_EXPRESSION_INIT_EXTENSION = function () {
    this.speed_ = false;
    this.update_();
    this.setInputsInline(true);
};

/**
 * Mixin for mutator functions in the 'DISPLAY_SET_FACIAL_EXPRESSION_SPEED' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Display.DISPLAY_SET_FACIAL_EXPRESSION_SPEED_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('speed', 'DISPLAY_SET_FACIAL_EXPRESSION_SPEED', 'input', 0);

// Initialization extensions
Blockly.Extensions.register("display_set_facial_expression_init_extension",
    Blockly.Constants.Display.DISPLAY_SET_FACIAL_EXPRESSION_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator('display_set_facial_expression_speed_mutator',
    Blockly.Constants.Display.DISPLAY_SET_FACIAL_EXPRESSION_SPEED_MIXIN);

/**
 * Performs final setup of 'display_playFacialEvent' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.DISPLAY_PLAY_FACIAL_EVENT_INIT_EXTENSION = function () {
    this.speed_ = false;
    this.update_();
    this.setInputsInline(true);
};

/**
 * Mixin for mutator functions in the 'DISPLAY_PLAY_FACIAL_EVENT_SPEED' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Display.DISPLAY_PLAY_FACIAL_EVENT_SPEED_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('speed', 'DISPLAY_PLAY_FACIAL_EVENT_SPEED', 'input', 0);

// Initialization extensions
Blockly.Extensions.register("display_play_facial_event_init_extension",
    Blockly.Constants.Display.DISPLAY_PLAY_FACIAL_EVENT_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator('display_play_facial_event_speed_mutator',
    Blockly.Constants.Display.DISPLAY_PLAY_FACIAL_EVENT_SPEED_MIXIN);