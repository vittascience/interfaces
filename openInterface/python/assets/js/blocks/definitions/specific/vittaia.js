/**
 * @fileoverview Vittaia blocks for Python.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // AI IMAGE
    {
        "type": "vittaia_load_model",
        "message0": "%{BKY_VITTAIA_LOAD_MODEL_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image'),
            {
                "type": "input_value",
                "name": "MODEL_URL",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LOAD_MODEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_load_local_model",
        "message0": "%{BKY_VITTAIA_LOAD_LOCAL_MODEL_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image')
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LOAD_LOCAL_MODEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_load_model_default",
        "message0": "%{BKY_VITTAIA_LOAD_MODEL_DEFAULT_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image'),
            {
                "type": "field_grid_dropdown",
                "name": "MODEL",
                "options": [
                    ["%{BKY_VITTAIA_MODEL_DOGS_CATS}", "https://fr.vittascience.com/ia/model/644237cc1072c/"],
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LOAD_MODEL_DEFAULT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_make_predictions_webcam",
        "message0": "%{BKY_VITTAIA_MAKE_PREDICTIONS_WEBCAM_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image')
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MAKE_PREDICTIONS_WEBCAM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_make_predictions_file",
        "message0": "%{BKY_VITTAIA_MAKE_PREDICTIONS_FILE_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image')
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MAKE_PREDICTIONS_FILE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_button_upload",
            "vittaia_image_uploaded_init_extension"
        ],
        "mutator": "vittaia_image_uploaded_mutator",
    },
    {
        "type": "vittaia_make_predictions_file_standalone",
        "message0": "%{BKY_VITTAIA_MAKE_PREDICTIONS_FILE_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image')
        ],
        "inputsInline": true,
        "output": "IA",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MAKE_PREDICTIONS_FILE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_button_upload",
            "vittaia_image_uploaded_init_extension"
        ],
        "mutator": "vittaia_image_uploaded_mutator",
    },
    {
        "type": "vittaia_get_highest_probability_class",
        "message0": "%{BKY_VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image')
        ],
        "output": "String",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_get_confidence_rate",
        "message0": "%{BKY_VITTAIA_GET_CONFIDENCE_RATE_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image')
        ],
        "output": "Number",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_GET_CONFIDENCE_RATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_get_predictions",
        "message0": "%{BKY_VITTAIA_GET_PREDICTIONS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image')
        ],
        "output": "Array",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_GET_PREDICTIONS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_detect_class",
        "message0": "%{BKY_VITTAIA_DETECT_CLASS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image'), {
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
        "type": "vittaia_image_uploaded",
        "message0": "%{BKY_VITTAIA_IMAGE_UPLOADED_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image'),
        ],
        "inputsInline": true,
        "output": "Array",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_IMAGE_UPLOADED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_button_upload",
            "vittaia_image_uploaded_init_extension"
        ],
        "mutator": "vittaia_image_uploaded_mutator",
    },
    // AI Images - webcam
    {
        "type": "vittaia_webcam_capture",
        "message0": "%{BKY_VITTAIA_WEBCAM_CAPTURE_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image'),
        ],
        "inputsInline": true,
        "output": "Array",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_WEBCAM_CAPTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_list_webcams",
        "message0": "%{BKY_VITTAIA_WEBCAM_LIST_AVAILABLES_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image')
        ],
        "output": "Array",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_WEBCAM_LIST_AVAILABLES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_init_webcam",
        "message0": "%{BKY_VITTAIA_WEBCAM_INIT_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image'),
            {
                "type": "input_value",
                "name": "CAMERA",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_WEBCAM_INIT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //AI POSTURE
    {
        "type": "vittaia_init_webcam_posture",
        "message0": "%{BKY_VITTAIA_INIT_WEBCAM}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('posture'),
        ],
        "output": "IA",
        "style": "vittaia_blocks",
        "inputsInline": true,
    },
    {
        "type": "vittaia_select_webcam_posture",
        "message0": "%{BKY_VITTAIA_SELECT_CAMERA}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('posture'),
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            }
        ],
        "style": "vittaia_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
    },
    {
        "type": "vittaia_refresh_webcam_posture",
        "message0": "%{BKY_VITTAIA_DISPLAY_CAMERA}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('posture'),
        ],
        "style": "vittaia_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
    },
    {
        "type": "vittaia_capture_webcam_posture",
        "message0": "%{BKY_VITTAIA_CAPTURE}",
        "output": "IA",
        "style": "vittaia_blocks",
        "inputsInline": true,
    },
    {
        "type": "vittaia_predict_webcam_posture",
        "message0": "%{BKY_VITTAIA_PREDICT}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('posture'),
            {
                "type": "input_value",
                "name": "MODEL_PRE",
                "check": "IA"
            }
        ],
        "output": "IA",
        "style": "vittaia_blocks",
        "inputsInline": true,
    },
    {
        "type": "vittaia_list_webcams_posture",
        "message0": "%{BKY_VITTAIA_WEBCAM_LIST_AVAILABLES_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('posture'),
        ],
        "output": "Array",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_WEBCAM_LIST_AVAILABLES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "vittaia_init_model_posture",
        "message0": "%{BKY_VITTAIA_INIT_MODEL_POSTURE_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('posture'),
        ],
        "output": "IA",
        "style": "vittaia_blocks",
        "inputsInline": true,
    },

    {
        "type": "vittaia_load_posture_model",
        "message0": "%{BKY_VITTAIA_LOAD_POSTURE_MODEL_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('posture'),
            {
                "type": "input_value",
                "name": "MODEL_URL"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LOAD_POSTURE_MODEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_init_posture_webcam",
        "message0": "%{BKY_VITTAIA_INIT_POSTURE_WEBCAM_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('posture')
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_INIT_POSTURE_WEBCAM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_make_posture_predictions",
        "message0": "%{BKY_VITTAIA_POSTURE_MAKE_PREDICTIONS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('posture')
        ],
        "inputsInline": true,
        "output": "Array",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_POSTURE_MAKE_PREDICTIONS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_list_posture_webcams",
        "message0": "%{BKY_VITTAIA_WEBCAM_LIST_AVAILABLES_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('posture')
        ],
        "output": "Array",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_WEBCAM_LIST_AVAILABLES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },


    // AI SOUND
    {
        "type": "vittaia_load_sound_model",
        "message0": "%{BKY_VITTAIA_LOAD_SOUND_MODEL_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('sound'),
            {
                "type": "input_value",
                "name": "MODEL_URL"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LOAD_SOUND_MODEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_init_microphone",
        "message0": "%{BKY_VITTAIA_INIT_MICROPHONE_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('sound')
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_INIT_MICROPHONE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_init_micro_play",
        "message0": "%{BKY_VITTAIA_INIT_MICROPHONE_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('sound')
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_INIT_MICROPHONE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_make_sound_predictions_standalone",
        "message0": "%{BKY_VITTAIA_MAKE_SOUND_PREDICTIONS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('sound')
        ],
        "inputsInline": true,
        "output": "Array",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MAKE_SOUND_PREDICTIONS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_make_sound_predictions",
        "message0": "%{BKY_VITTAIA_MAKE_SOUND_PREDICTIONS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('sound')
        ],
        "inputsInline": true,
        "output": "Array",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MAKE_SOUND_PREDICTIONS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_list_microphones",
        "message0": "%{BKY_VITTAIA_LIST_MICROPHONES_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('sound')
        ],
        "output": "String",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LIST_MICROPHONES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_list_microphones_standalone",
        "message0": "%{BKY_VITTAIA_LIST_MICROPHONES_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('sound')
        ],
        "output": "String",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LIST_MICROPHONES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },


    // AI TEXT
    {
        "type": "vittaia_init_discussion",
        "message0": "%{BKY_VITTAIA_INIT_DISCUSSION_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('text')
        ],
        "output": "IA",
        "style": "vittaia_blocks",
        "inputsInline": true,
        "tooltip": "%{BKY_VITTAIA_INIT_DISCUSSION_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_init_text_ai",
        "message0": "%{BKY_VITTAIA_INIT_TEXT_AI_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('text')
        ],
        "output": "IA",
        "style": "vittaia_blocks",
        "inputsInline": true,
        "tooltip": "%{BKY_VITTAIA_INIT_TEXT_AI_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_load_discussion",
        "message0": "%{BKY_VITTAIA_LOAD_DISCUSSION_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('text'),
            {
                "type": "input_value",
                "name": "MODEL_URL"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LOAD_DISCUSSION_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },
    {
        "type": "vittaia_set_randomness",
        "message0": "%{BKY_VITTAIA_SET_RANDOMNESS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('text'),
            {
                "type": "input_value",
                "name": "TEMPERATURE"
            }

        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_SET_RANDOMNESS_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },
    {
        "type": "vittaia_set_randomness_standalone",
        "message0": "%{BKY_VITTAIA_SET_RANDOMNESS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('text'),
            {
                "type": "input_value",
                "name": "TEMPERATURE"
            }

        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_SET_RANDOMNESS_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    {
        "type": "vittaia_set_model_ia",
        "message0": "%{BKY_VITTAIA_SET_MODEL_IA_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('text'),
            {
                "type": "field_grid_dropdown",
                "name": "MODEL",
                "options": [
                    ["%{BKY_VITTAIA_TEXT_MODEL_MIXTRAL}", "mistral-nemo-instruct-2407"],
                    ["%{BKY_VITTAIA_TEXT_MODEL_LLAMA_3.1}", "llama-3.1-8b-instruct"],
                    ["%{BKY_VITTAIA_TEXT_MODEL_LLAMA_3.3}", "llama-3.3-70b-instruct"],
                    ["%{BKY_VITTAIA_TEXT_MODEL_GPT_MINI}", "gpt-4o-mini"],
                    ["%{BKY_VITTAIA_TEXT_MODEL_GPT_4}", "gpt-4o"],

                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_SET_MODEL_IA_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },
    {
        "type": "vittaia_set_model_ia_standalone",
        "message0": "%{BKY_VITTAIA_SET_MODEL_IA_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('text'),
            {
                "type": "field_grid_dropdown",
                "name": "MODEL",
                "options": [
                    ["%{BKY_VITTAIA_TEXT_MODEL_MIXTRAL}", "mistral-nemo-instruct-2407"],
                    ["%{BKY_VITTAIA_TEXT_MODEL_LLAMA_3.1}", "llama-3.1-8b-instruct"],
                    ["%{BKY_VITTAIA_TEXT_MODEL_LLAMA_3.3}", "llama-3.3-70b-instruct"],
                    ["%{BKY_VITTAIA_TEXT_MODEL_GPT_MINI}", "gpt-4o-mini"],
                    ["%{BKY_VITTAIA_TEXT_MODEL_GPT_4}", "gpt-4o"],

                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_SET_MODEL_IA_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },
    {
        "type": "vittaia_model_text_predict",
        "message0": "%{BKY_VITTAIA_MODEL_TEXT_PREDICT_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('text'),
            {
                "type": "input_value",
                "name": "MESSAGE"
            }
        ],
        "inputsInline": true,
        "output": "Array",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MODEL_TEXT_PREDICT_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },
    {
        "type": "vittaia_model_text_predict_standalone",
        "message0": "%{BKY_VITTAIA_MODEL_TEXT_PREDICT_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('text'),
            {
                "type": "input_value",
                "name": "MESSAGE"
            }
        ],
        "inputsInline": true,
        "output": "Array",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MODEL_TEXT_PREDICT_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },


    // Not displayed blocks
    // init model
    {
        "type": "vittaia_init_model",
        "message0": "%{BKY_VITTAIA_INIT_MODEL}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image')
        ],
        "output": "IA",
        "style": "vittaia_blocks",
        "inputsInline": true,
    },
    // init webcam
    {
        "type": "vittaia_init_webcam_1",
        "message0": "%{BKY_VITTAIA_INIT_WEBCAM}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image')
        ],
        "output": "IA",
        "style": "vittaia_blocks",
        "inputsInline": true,
    },
    {
        "type": "vittaia_init_webcam_2",
        "message0": "%{BKY_VITTAIA_SELECT_CAMERA}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image'),
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            }
        ],
        "style": "vittaia_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
    },
    {
        "type": "vittaia_init_webcam_3",
        "message0": "%{BKY_VITTAIA_DISPLAY_CAMERA}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image')
        ],
        "style": "vittaia_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
    },
    {
        "type": "vittaia_init_capture",
        "message0": "%{BKY_VITTAIA_CAPTURE}",
        "output": "IA",
        "style": "vittaia_blocks",
        "inputsInline": true,
    },
    {
        "type": "vittaia_predict",
        "message0": "%{BKY_VITTAIA_PREDICT}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image'),
            {
                "type": "input_value",
                "name": "MODEL_PRE",
                "check": "IA"
            }
        ],
        "output": "IA",
        "style": "vittaia_blocks",
        "inputsInline": true,
    },

    {
        "type": "vittaia_get_best_probability_class",
        "message0": "%{BKY_VITTAIA_GET_BEST_PROBALITY_CLASS}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('image')
        ],
        "output": "String",
        "style": "vittaia_blocks",
        "inputsInline": true,
    },

    // Init Modelsound
    {
        "type": "vittaia_init_model_sound",
        "message0": "%{BKY_VITTAIA_INIT_SOUND}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('sound')
        ],
        "output": "IA",
        "style": "vittaia_blocks",
        "inputsInline": true,
    },

    {
        "type": "vittaia_init_micro_var",
        "message0": "%{BKY_VITTAIA_INIT_MICRO_VAR}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('sound')
        ],
        "output": "IA",
        "style": "vittaia_blocks",
        "inputsInline": true,
    },

    // Init Micro
    {
        "type": "vittaia_init_micro",
        "message0": "%{BKY_VITTAIA_INIT_MICRO}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('sound')
        ],
        "output": "IA",
        "style": "vittaia_blocks",
        "inputsInline": true,
    },
]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.IA = Object.create(null);

/**
 * Performs final setup of 'vittaia_image_uploaded' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.IA.VITTAIA_IMAGE_UPLOADED_INIT_EXTENSION = function () {
    this.picture_ = "";
    this.updateField_();
};

/**
 * Mixin for mutator functions in the 'vittaia_image_uploaded' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.IA.VITTAIA_IMAGE_UPLOADED_MUTATOR_MIXIN = {
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('picture', this.picture_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        const picName = xmlElement.getAttribute('picture');
        this.picture_ = picName ? picName : "";
        this.updateField_();
    },
    /**
     * Upload a picture and save it in localStorage.
     * @this {Blockly.Block}
     */
    uploadImage_: function () {
        const inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.accept = 'image/*';
        var that = this;
        inputFile.addEventListener('change', function (e) {
            e.preventDefault();
            const file = inputFile.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                that.picture_ = file.name;
                that.updateField_()
                const img = {
                    'name': file.name,
                    'data': reader.result
                };
                let images = [img];
                if (localStorage.pythonPictures) {
                    images = JSON.parse(localStorage.pythonPictures);
                    if (!images.filter((pic) => pic.name == img.name)[0]) {
                        images.push(img);
                    }
                }
                localStorage.setItem('pythonPictures', JSON.stringify(images));
            };
        });
        inputFile.click();
        inputFile.remove();
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function () {
        var that = this;
        const upload = function () {
            that.uploadImage_();
        }
        if (!this.getInput('TOP')) {
            this.top = this.appendDummyInput('TOP');
            this.top.appendField(new Blockly.FieldImage(this.UPLOAD_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", upload, false));
            this.top.appendField(this.picture_, "PICTURE");
        }
        if (this.picture_) {
            this.getField("PICTURE").setValue(this.picture_);
        }
    }
};

// Initialization extensions
Blockly.Extensions.register("vittaia_image_uploaded_init_extension",
    Blockly.Constants.IA.VITTAIA_IMAGE_UPLOADED_INIT_EXTENSION);

// Mutators
Blockly.Extensions.registerMutator('vittaia_image_uploaded_mutator',
    Blockly.Constants.IA.VITTAIA_IMAGE_UPLOADED_MUTATOR_MIXIN);