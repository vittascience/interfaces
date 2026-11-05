/**
 * @fileoverview AI blocks specific to Arduino Q (the shared ones are in python/.../vittaia.js).
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    {
        "type": "vittaia_make_predictions_pc_webcam",
        "message0": "%{BKY_VITTAIA_MAKE_PREDICTIONS_PC_WEBCAM_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('image')
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MAKE_PREDICTIONS_PC_WEBCAM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_load_local_posture_model",
        "message0": "%{BKY_VITTAIA_LOAD_LOCAL_POSTURE_MODEL_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('posture')
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LOAD_LOCAL_POSTURE_MODEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_make_posture_predictions_webcam",
        "message0": "%{BKY_VITTAIA_MAKE_POSTURE_PREDICTIONS_WEBCAM_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('posture')
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MAKE_POSTURE_PREDICTIONS_WEBCAM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_make_posture_predictions_pc_webcam",
        "message0": "%{BKY_VITTAIA_MAKE_POSTURE_PREDICTIONS_PC_WEBCAM_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('posture')
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MAKE_POSTURE_PREDICTIONS_PC_WEBCAM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_load_hand_model",
        "message0": "%{BKY_VITTAIA_LOAD_HAND_MODEL_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('hand'),
            {
                "type": "input_value",
                "name": "MODEL_URL"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LOAD_HAND_MODEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_load_local_hand_model",
        "message0": "%{BKY_VITTAIA_LOAD_LOCAL_HAND_MODEL_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('hand')
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LOAD_LOCAL_HAND_MODEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_make_hand_predictions_webcam",
        "message0": "%{BKY_VITTAIA_MAKE_HAND_PREDICTIONS_WEBCAM_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('hand')
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MAKE_HAND_PREDICTIONS_WEBCAM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_make_hand_predictions_pc_webcam",
        "message0": "%{BKY_VITTAIA_MAKE_HAND_PREDICTIONS_PC_WEBCAM_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('hand')
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MAKE_HAND_PREDICTIONS_PC_WEBCAM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_load_local_sound_model",
        "message0": "%{BKY_VITTAIA_LOAD_LOCAL_SOUND_MODEL_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('sound')
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LOAD_LOCAL_SOUND_MODEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_make_sound_predictions_microphone",
        "message0": "%{BKY_VITTAIA_MAKE_SOUND_PREDICTIONS_MICROPHONE_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('sound')
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MAKE_SOUND_PREDICTIONS_MICROPHONE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_make_sound_predictions_pc_microphone",
        "message0": "%{BKY_VITTAIA_MAKE_SOUND_PREDICTIONS_PC_MICROPHONE_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('sound')
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MAKE_SOUND_PREDICTIONS_PC_MICROPHONE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_load_sensor_model",
        "message0": "%{BKY_VITTAIA_LOAD_SENSOR_MODEL_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('sensor'),
            {
                "type": "input_value",
                "name": "MODEL_URL"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LOAD_SENSOR_MODEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_load_local_sensor_model",
        "message0": "%{BKY_VITTAIA_LOAD_LOCAL_SENSOR_MODEL_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('sensor')
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LOAD_LOCAL_SENSOR_MODEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_make_sensor_predictions",
        "message0": "%{BKY_VITTAIA_MAKE_SENSOR_PREDICTIONS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('sensor')
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MAKE_SENSOR_PREDICTIONS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // Result blocks of the posture, hand, sound and sensor models: same as the image ones, with the icon of their sub-category
    {
        "type": "vittaia_get_highest_probability_class_posture",
        "message0": "%{BKY_VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('posture')
        ],
        "output": "String",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_get_confidence_rate_posture",
        "message0": "%{BKY_VITTAIA_GET_CONFIDENCE_RATE_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('posture')
        ],
        "output": "Number",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_GET_CONFIDENCE_RATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_detect_class_posture",
        "message0": "%{BKY_VITTAIA_DETECT_CLASS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('posture'), {
                "type": "input_value",
                "name": "MODEL_CLASS"
            },
            {
                "type": "field_grid_dropdown",
                "name": "IS_DETECTED",
                "options": [
                    ["%{BKY_VITTAIA_IS}", "=="],
                    ["%{BKY_VITTAIA_ISNOT}", "!="]
                ]
            }
        ],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_DETECT_CLASS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_get_highest_probability_class_hand",
        "message0": "%{BKY_VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('hand')
        ],
        "output": "String",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_get_confidence_rate_hand",
        "message0": "%{BKY_VITTAIA_GET_CONFIDENCE_RATE_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('hand')
        ],
        "output": "Number",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_GET_CONFIDENCE_RATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_detect_class_hand",
        "message0": "%{BKY_VITTAIA_DETECT_CLASS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('hand'), {
                "type": "input_value",
                "name": "MODEL_CLASS"
            },
            {
                "type": "field_grid_dropdown",
                "name": "IS_DETECTED",
                "options": [
                    ["%{BKY_VITTAIA_IS}", "=="],
                    ["%{BKY_VITTAIA_ISNOT}", "!="]
                ]
            }
        ],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_DETECT_CLASS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_get_highest_probability_class_sound",
        "message0": "%{BKY_VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('sound')
        ],
        "output": "String",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_get_confidence_rate_sound",
        "message0": "%{BKY_VITTAIA_GET_CONFIDENCE_RATE_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('sound')
        ],
        "output": "Number",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_GET_CONFIDENCE_RATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_detect_class_sound",
        "message0": "%{BKY_VITTAIA_DETECT_CLASS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('sound'), {
                "type": "input_value",
                "name": "MODEL_CLASS"
            },
            {
                "type": "field_grid_dropdown",
                "name": "IS_DETECTED",
                "options": [
                    ["%{BKY_VITTAIA_IS}", "=="],
                    ["%{BKY_VITTAIA_ISNOT}", "!="]
                ]
            }
        ],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_DETECT_CLASS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_get_highest_probability_class_sensor",
        "message0": "%{BKY_VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('sensor')
        ],
        "output": "String",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_get_confidence_rate_sensor",
        "message0": "%{BKY_VITTAIA_GET_CONFIDENCE_RATE_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('sensor')
        ],
        "output": "Number",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_GET_CONFIDENCE_RATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_detect_class_sensor",
        "message0": "%{BKY_VITTAIA_DETECT_CLASS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ADD_ICON('sensor'), {
                "type": "input_value",
                "name": "MODEL_CLASS"
            },
            {
                "type": "field_grid_dropdown",
                "name": "IS_DETECTED",
                "options": [
                    ["%{BKY_VITTAIA_IS}", "=="],
                    ["%{BKY_VITTAIA_ISNOT}", "!="]
                ]
            }
        ],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_DETECT_CLASS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)
