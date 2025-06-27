/**
 * @fileoverview Vittaia blocks for Buddy.
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
    }
]); // END JSON EXTRACT (Do not delete this comment.)