/**
 * @fileoverview Cameras blocks for BBC micro:bit.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    // HuskyLens
    {
        "type": "cameras_huskylens_setMode",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_SET_MODE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MODE",
            "options": [
                ["%{BKY_CAMERAS_HUSKYLENS_SET_MODE_FACE_RECOGNITION}", "FACE_RECOGNITION"],
                ["%{BKY_CAMERAS_HUSKYLENS_SET_MODE_OBJECT_TRACKING}", "OBJECT_TRACKING"],
                ["%{BKY_CAMERAS_HUSKYLENS_SET_MODE_OBJECT_RECOGNITION}", "OBJECT_RECOGNITION"],
                ["%{BKY_CAMERAS_HUSKYLENS_SET_MODE_LINE_TRACKING}", "LINE_TRACKING"],
                ["%{BKY_CAMERAS_HUSKYLENS_SET_MODE_COLOR_RECOGNITION}", "COLOR_RECOGNITION"],
                ["%{BKY_CAMERAS_HUSKYLENS_SET_MODE_TAG_RECOGNITION}", "TAG_RECOGNITION"],
                ["%{BKY_CAMERAS_HUSKYLENS_SET_MODE_OBJECT_CLASSIFICATION}", "OBJECT_CLASSIFICATION"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_SET_MODE_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_setText",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_SET_TEXT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "TEXT"
            }, {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            }, {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_SET_TEXT_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_clearScreen",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_CLEAR_SCREEN_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_CLEAR_SCREEN_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_learnID",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_LEARN_ID_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_LEARN_ID_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_customName",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_CUSTOM_NAME_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_CUSTOM_NAME_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_forgetIDs",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_FORGET_IDS_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_FORGET_IDS_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_getData",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_GET_DATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_BLOCKS}", "BLOCKS"],
                ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_ARROWS}", "ARROWS"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_GET_DATA_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_requestBlocksData",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_REQUEST_BLOCKS_DATA_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "DATA",
                "options": [
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_ID}", "ID"],
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_X}", "X"],
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_Y}", "Y"],
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_WIDTH}", "WIDTH"],
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_HEIGHT}", "HEIGHT"],
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_ALL}", "ALL"]
                ]
            }
        ],
        "output": "Array",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_REQUEST_BLOCKS_DATA_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_requestArrowsData",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_REQUEST_ARROWS_DATA_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "DATA",
                "options": [
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_ID}", "ID"],
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_X1}", "X1"],
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_Y1}", "Y1"],
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_X2}", "X2"],
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_Y2}", "Y2"],
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_ALL}", "ALL"]
                ]
            }
        ],
        "output": "Array",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_REQUEST_ARROWS_DATA_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_requestBlockXY",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_REQUEST_BLOCKS_XY_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "DATA",
                "options": [
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_SINGLE_X}", "X"],
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_SINGLE_Y}", "Y"],
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_SINGLE_WIDTH}", "WIDTH"],
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_SINGLE_HEIGHT}", "HEIGHT"]
                ]
            }
        ],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_REQUEST_BLOCKS_XY_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_getNumberOfDetectedElements",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_DETECTED_ELEMENTS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_BLOCKS}", "BLOCKS"],
                ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_ARROWS}", "ARROWS"]
            ]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_DETECTED_ELEMENTS_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_getIDs",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_GET_IDS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_BLOCKS}", "BLOCKS"],
                ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_ARROWS}", "ARROWS"]
            ]
        }],
        "output": "Array",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_GET_IDS_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_checkID",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_CHECK_ID_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            }, {
                "type": "field_grid_dropdown",
                "name": "TYPE",
                "options": [
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_BLOCKS}", "BLOCKS"],
                    ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_ARROWS}", "ARROWS"]
                ]
            }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_CHECK_ID_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_getLineDirection",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_GET_LINE_DIRECTION_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_CAMERAS_HUSKYLENS_LINE_STRAIGHT}", "STRAIGHT"],
                    ["%{BKY_CAMERAS_HUSKYLENS_LINE_LEFT}", "LEFT"],
                    ["%{BKY_CAMERAS_HUSKYLENS_LINE_RIGHT}", "RIGHT"]
                ]
            }
        ],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_GET_LINE_DIRECTION_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_saveModel",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_SAVE_MODEL_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "INDEX",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_SAVE_MODEL_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_loadModel",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_LOAD_MODEL_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "INDEX",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_LOAD_MODEL_TOOLTIP}",
    }

]);