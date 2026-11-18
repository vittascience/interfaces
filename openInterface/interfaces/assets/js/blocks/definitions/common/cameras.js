/**
 * @fileoverview Common Camera blocks.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

    /** Begin HUSKYLENS blocks */
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
        "type": "cameras_huskylens_getDataByID",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_GET_DATA_BY_ID_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_BLOCKS}", "BLOCKS"],
                ["%{BKY_CAMERAS_HUSKYLENS_REQUEST_ARROWS}", "ARROWS"]
            ]
        }, {
            "type": "input_value",
            "name": "ID",
            "check": "Number"
        }],
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "cameras_huskylens_getDataByID_init_extension",
            "cameras_huskylens_getDataByID_get_type"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_GET_DATA_BY_ID_TOOLTIP}",
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
    },

    /** Begin HUSKYLENS V2 blocks */
    {
        "type": "cameras_huskylens_v2_initMode",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_INIT_MODE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MODE",
            "options": [
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_UNIVERSAL}", "0"],
                ["%{BKY_CAMERAS_HUSKYLENS_SET_MODE_FACE_RECOGNITION}", "face"],
                ["%{BKY_CAMERAS_HUSKYLENS_SET_MODE_OBJECT_RECOGNITION}", "object"],
                ["%{BKY_CAMERAS_HUSKYLENS_SET_MODE_OBJECT_TRACKING}", "tracking"],
                ["%{BKY_CAMERAS_HUSKYLENS_SET_MODE_COLOR_RECOGNITION}", "color"],
                ["%{BKY_CAMERAS_HUSKYLENS_SET_MODE_OBJECT_CLASSIFICATION}", "classification"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_HAND_RECOGNITION}", "hand"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_POSE_RECOGNITION}", "pose"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_LINE_TRACKING}", "line"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_SELF_LEARNING_CLASSIFICATION}", "self_learning_classification"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_INSTANCE_SEGMENTATION}", "instance_segmentation"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_GESTURE_RECOGNITION}", "gesture"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_LICENSE_PLATE}", "license_plate"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_OCR}", "ocr"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_EMOTION}", "emotion"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_GAZE}", "gaze"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_FACE_ORIENTATION}", "face_orientation"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_TAG_RECOGNITION}", "tag"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_BARCODE}", "barcode"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_QR_CODE_RECOGNITION}", "qr"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_FALL_DETECTION}", "fall"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_DEPTH}", "depth"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_AUTO_DRIVE_1}", "auto_drive_1"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_MODE_AUTO_DRIVE_2}", "auto_drive_2"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_INIT_MODE_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_v2_readBox",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_READ_BOX_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_ID}", "id"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_X}", "x"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_Y}", "y"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_WIDTH}", "width"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_HEIGHT}", "height"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_NAME}", "name"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_CONTENT}", "content"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_CONFIDENCE}", "confidence"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_STEERING}", "steering"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_THROTTLE}", "throttle"]
            ]
        }],
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_READ_BOX_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_v2_readArrow",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_READ_ARROW_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_ID}", "id"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_X}", "x"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_Y}", "y"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_ANGLE}", "angle"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_LENGTH}", "length"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_NAME}", "name"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_CONTENT}", "content"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_CONFIDENCE}", "confidence"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_STEERING}", "steering"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_DATA_THROTTLE}", "throttle"]
            ]
        }],
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_READ_ARROW_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_v2_readId",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_READ_ID_TITLE}",
        "output": "Number",
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_READ_ID_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_v2_count",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_COUNT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_BOX}", "BOX"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_ARROW}", "ARROW"]
            ]
        }],
        "output": "Number",
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_COUNT_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_v2_isAppear",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_IS_APPEAR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_BOX}", "BOX"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_ARROW}", "ARROW"]
            ]
        }],
        "output": "Boolean",
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_IS_APPEAR_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_v2_writeLearn1",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_WRITE_LEARN1_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_WRITE_LEARN1_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_v2_learnedId",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_LEARNED_ID_TITLE}",
        "output": "Number",
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_LEARNED_ID_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_v2_forgetLearn",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_FORGET_LEARN_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_FORGET_LEARN_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_v2_writeName",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_WRITE_NAME_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "NAME"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_WRITE_NAME_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_v2_writeOSD",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_WRITE_OSD_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "NAME"
        }, {
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "FONT_SIZE",
            "options": [
                ["20", "20"], ["24", "24"], ["26", "26"], ["27", "27"],
                ["28", "28"], ["32", "32"], ["36", "36"], ["40", "40"], ["48", "48"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "COLOR",
            "options": [
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_WHITE}", "16777215"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_RED}", "16711680"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_ORANGE}", "16753920"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_YELLOW}", "16776960"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_GREEN}", "65280"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_CYAN}", "65535"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_BLUE}", "255"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_PURPLE}", "8388736"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_PINK}", "16761035"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_GRAY}", "8421504"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_BLACK}", "0"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_BROWN}", "10824234"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_OLIVE}", "8421376"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_TEAL}", "32896"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_INDIGO}", "4915330"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_MAGENTA}", "16711935"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_WRITE_OSD_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_v2_clearOSD",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_CLEAR_OSD_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_CLEAR_OSD_TOOLTIP}",
    },

    {
        "type": "cameras_huskylens_v2_saveModelToTFCard",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_SAVE_MODEL_TO_TF_CARD_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "COMMAND",
            "options": [
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COMMAND_SAVE}", "SAVE"],
                ["%{BKY_CAMERAS_HUSKYLENS_V2_COMMAND_LOAD}", "LOAD"]
            ]
        }, {
            "type": "input_value",
            "name": "DATA",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_SAVE_MODEL_TO_TF_CARD_TOOLTIP}",
    },


    /** Extended HuskyLens V2 protocol blocks */
    {
        "type": "cameras_huskylens_v2_initCustomMode",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_INITCUSTOMMODE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_INITCUSTOMMODE_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_drawRect",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_DRAWRECT_TITLE}",
        "args0": [
            {
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
                "type": "input_value",
                "name": "WIDTH",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "HEIGHT",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "COLOR",
                "options": [
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_WHITE}", "16777215"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_RED}", "16711680"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_ORANGE}", "16753920"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_YELLOW}", "16776960"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_GREEN}", "65280"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_CYAN}", "65535"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_BLUE}", "255"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_PURPLE}", "8388736"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_PINK}", "16761035"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_GRAY}", "8421504"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_BLACK}", "0"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_BROWN}", "10824234"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_OLIVE}", "8421376"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_TEAL}", "32896"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_INDIGO}", "4915330"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_MAGENTA}", "16711935"]
                ]
            },
            {
                "type": "input_value",
                "name": "LINE_WIDTH",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_DRAWRECT_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_clearRect",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_CLEARRECT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_CLEARRECT_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_drawUniqueRect",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_DRAWUNIQUERECT_TITLE}",
        "args0": [
            {
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
                "type": "input_value",
                "name": "WIDTH",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "HEIGHT",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "COLOR",
                "options": [
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_WHITE}", "16777215"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_RED}", "16711680"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_ORANGE}", "16753920"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_YELLOW}", "16776960"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_GREEN}", "65280"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_CYAN}", "65535"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_BLUE}", "255"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_PURPLE}", "8388736"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_PINK}", "16761035"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_GRAY}", "8421504"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_BLACK}", "0"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_BROWN}", "10824234"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_OLIVE}", "8421376"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_TEAL}", "32896"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_INDIGO}", "4915330"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_COLOR_MAGENTA}", "16711935"]
                ]
            },
            {
                "type": "input_value",
                "name": "LINE_WIDTH",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_DRAWUNIQUERECT_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_takePhoto",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_TAKEPHOTO_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "RESOLUTION",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_RES_DEFAULT}",
                        "0"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_RES_640}",
                        "1"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_RES_1280}",
                        "2"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_RES_1920}",
                        "3"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_TAKEPHOTO_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_takeScreenshot",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_TAKESCREENSHOT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_TAKESCREENSHOT_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_playMusic",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_PLAYMUSIC_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "VOLUME",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_PLAYMUSIC_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_startRecording",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_STARTRECORDING_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "RESOLUTION",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_RES_DEFAULT}",
                        "0"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_RES_640}",
                        "1"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_RES_1280}",
                        "2"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_RES_1920}",
                        "3"
                    ]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "MEDIA",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_MEDIA_AUDIO}",
                        "1"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_MEDIA_VIDEO}",
                        "2"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_MEDIA_BOTH}",
                        "3"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "FILENAME",
                "check": "String"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_STARTRECORDING_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_stopRecording",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_STOPRECORDING_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "MEDIA",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_MEDIA_AUDIO}",
                        "1"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_MEDIA_VIDEO}",
                        "2"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_MEDIA_BOTH}",
                        "3"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_STOPRECORDING_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_learnBlock",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_LEARNBLOCK_TITLE}",
        "args0": [
            {
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
                "type": "input_value",
                "name": "WIDTH",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "HEIGHT",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_LEARNBLOCK_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_saveKnowledge",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_SAVEKNOWLEDGE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "BANK",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_SAVEKNOWLEDGE_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_loadKnowledge",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_LOADKNOWLEDGE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "BANK",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_LOADKNOWLEDGE_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_setMultiAlgorithm",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_SETMULTIALGORITHM_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ALGO0",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "ALGO1",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "ALGO2",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_SETMULTIALGORITHM_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_setMultiAlgorithmRatio",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_SETMULTIALGORITHMRATIO_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "RATIO0",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "RATIO1",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "RATIO2",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_SETMULTIALGORITHMRATIO_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_getAlgoParam",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_GETALGOPARAM_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "KEY",
                "check": "String"
            },
            {
                "type": "field_grid_dropdown",
                "name": "VALUE_TYPE",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_VALUE_STRING}",
                        "string"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_VALUE_INTEGER}",
                        "int"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_VALUE_FLOAT}",
                        "float"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "ALGO",
                "check": "Number"
            }
        ],
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_GETALGOPARAM_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_setAlgoParam",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_SETALGOPARAM_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "KEY",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "VALUE_TYPE",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_VALUE_STRING}",
                        "string"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_VALUE_INTEGER}",
                        "int"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_VALUE_FLOAT}",
                        "float"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "ALGO",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_SETALGOPARAM_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_updateAlgoParams",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_UPDATEALGOPARAMS_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ALGO",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_UPDATEALGOPARAMS_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_exit",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_EXIT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_EXIT_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_getResultByIndex",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_GETRESULTBYINDEX_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "INDEX",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "TYPE",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_BOX}",
                        "BOX"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_ARROW}",
                        "ARROW"
                    ]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "DATA",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_ID}",
                        "id"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_X}",
                        "x"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_Y}",
                        "y"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_WIDTH}",
                        "width"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_HEIGHT}",
                        "height"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_NAME}",
                        "name"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_CONTENT}",
                        "content"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_CONFIDENCE}",
                        "confidence"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_ANGLE}",
                        "angle"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_LENGTH}",
                        "length"
                    ]
                ]
            }
        ],
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_GETRESULTBYINDEX_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_getResultById",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_GETRESULTBYID_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "TYPE",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_BOX}",
                        "BOX"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_ARROW}",
                        "ARROW"
                    ]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "DATA",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_ID}",
                        "id"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_X}",
                        "x"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_Y}",
                        "y"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_WIDTH}",
                        "width"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_HEIGHT}",
                        "height"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_NAME}",
                        "name"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_CONTENT}",
                        "content"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_CONFIDENCE}",
                        "confidence"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_STEERING}",
                        "steering"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_THROTTLE}",
                        "throttle"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_ANGLE}",
                        "angle"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_LENGTH}",
                        "length"
                    ]
                ]
            }
        ],
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_GETRESULTBYID_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_getCenterResult",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_GETCENTERRESULT_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "TYPE",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_BOX}",
                        "BOX"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_ARROW}",
                        "ARROW"
                    ]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "DATA",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_ID}",
                        "id"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_X}",
                        "x"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_Y}",
                        "y"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_WIDTH}",
                        "width"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_HEIGHT}",
                        "height"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_NAME}",
                        "name"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_CONTENT}",
                        "content"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_CONFIDENCE}",
                        "confidence"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_ANGLE}",
                        "angle"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_LENGTH}",
                        "length"
                    ]
                ]
            }
        ],
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_GETCENTERRESULT_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_getLargestResult",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_GETLARGESTRESULT_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "TYPE",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_BOX}",
                        "BOX"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_ARROW}",
                        "ARROW"
                    ]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "DATA",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_ID}",
                        "id"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_X}",
                        "x"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_Y}",
                        "y"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_WIDTH}",
                        "width"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_HEIGHT}",
                        "height"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_NAME}",
                        "name"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_CONTENT}",
                        "content"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_CONFIDENCE}",
                        "confidence"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_ANGLE}",
                        "angle"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_LENGTH}",
                        "length"
                    ]
                ]
            }
        ],
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_GETLARGESTRESULT_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_getNearestResult",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_GETNEARESTRESULT_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "TYPE",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_BOX}",
                        "BOX"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_ARROW}",
                        "ARROW"
                    ]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "DATA",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_ID}",
                        "id"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_X}",
                        "x"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_Y}",
                        "y"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_WIDTH}",
                        "width"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_HEIGHT}",
                        "height"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_NAME}",
                        "name"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_CONTENT}",
                        "content"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_CONFIDENCE}",
                        "confidence"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_ANGLE}",
                        "angle"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_LENGTH}",
                        "length"
                    ]
                ]
            }
        ],
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_GETNEARESTRESULT_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_getBranchCount",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_GETBRANCHCOUNT_TITLE}",
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_GETBRANCHCOUNT_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_getBranchByIndex",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_GETBRANCHBYINDEX_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "INDEX",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "DATA",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_ID}",
                        "id"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_X}",
                        "x"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_Y}",
                        "y"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_ANGLE}",
                        "angle"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_DATA_LENGTH}",
                        "length"
                    ]
                ]
            }
        ],
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_GETBRANCHBYINDEX_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_getKeypoint",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_GETKEYPOINT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "INDEX",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "AXIS",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_AXIS_X}",
                        "x"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_AXIS_Y}",
                        "y"
                    ]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "TYPE",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_MODE_HAND_RECOGNITION}",
                        "hand"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_MODE_POSE_RECOGNITION}",
                        "pose"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_MODE_FACE_RECOGNITION}",
                        "face"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            }
        ],
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_GETKEYPOINT_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_getFaceOrientation",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_GETFACEORIENTATION_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "AXIS",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_AXIS_PITCH}",
                        "pitch"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_AXIS_YAW}",
                        "yaw"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_AXIS_ROLL}",
                        "roll"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            }
        ],
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_GETFACEORIENTATION_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_getVisibleId",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_GETVISIBLEID_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "INDEX",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "TYPE",
                "options": [
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_BOX}",
                        "BOX"
                    ],
                    [
                        "%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_ARROW}",
                        "ARROW"
                    ]
                ]
            }
        ],
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_GETVISIBLEID_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_getVisibleIdCount",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_GETVISIBLEIDCOUNT_TITLE}",
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_GETVISIBLEIDCOUNT_TOOLTIP}"
    },
    {
        "type": "cameras_huskylens_v2_countById",
        "message0": "%{BKY_CAMERAS_HUSKYLENS_V2_COUNTBYID_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "TYPE",
                "options": [
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_BOX}", "BOX"],
                    ["%{BKY_CAMERAS_HUSKYLENS_V2_TYPE_ARROW}", "ARROW"]
                ]
            }
        ],
        "output": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_CAMERAS_HUSKYLENS_V2_COUNTBYID_TOOLTIP}"
    },
    /** Begin WIO Lite blocks */
    {
        "type": "wio_make_prediction",
        "message0": "%{BKY_WIO_MAKE_PREDICTION_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ia_blocks",
        "tooltip": "%{BKY_WIO_MAKE_PREDICTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "wio_get_class_data",
        "message0": "%{BKY_WIO_GET_DATA_TITLE}",
        "output": "Array",
        "inputsInline": true,
        "style": "ia_blocks",
        "tooltip": "%{BKY_WIO_GET_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "wio_get_class_data_by_id",
        "message0": "%{BKY_WIO_GET_CLASS_DATA_BY_ID_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "Number"
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "ia_blocks",
        "tooltip": "%{BKY_WIO_GET_CLASS_DATA_BY_ID_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "wio_get_class_max_id",
        "message0": "%{BKY_WIO_GET_CLASS_MAX_ID_TITLE}",
        "output": "Number",
        "inputsInline": true,
        "style": "ia_blocks",
        "tooltip": "%{BKY_WIO_GET_CLASS_MAX_ID_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "wio_get_status",
        "message0": "%{BKY_WIO_GET_STATUS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_WIO_GET_STATUS}", "status"],
                ["%{BKY_WIO_GET_VERSION}", "version"]
            ]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "ia_blocks",
        "tooltip": "%{BKY_WIO_GET_STATUS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

]);  // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Cameras = Object.create(null);

Blockly.Constants.Cameras.CAMERAS_HUSKYLENS_GET_DATA_BY_ID_INIT_EXTENSION = function () {
    if (typeof Blockly.Arduino !== "undefined") {
        this.setOutput(true, "Boolean");
    } else {
        this.setOutput(true, "Array");
    }
};

Blockly.Constants.Cameras.CAMERAS_HUSKYLENS_GET_DATA_BY_ID_GET_TYPE = {
    /**
     * @return {Blockly.Type} type
     * @this {Blockly.Block} logic_ternary
     */
    getBlockType: function () {
        if (typeof Blockly.Arduino !== "undefined") {
            this.setOutput(true, "Boolean");
            return Blockly.Types.BOOLEAN;
        } else {
            this.setOutput(true, "Array");
            return Blockly.Types.ARRAY;
        }
    }
};

Blockly.Extensions.register("cameras_huskylens_getDataByID_init_extension",
    Blockly.Constants.Cameras.CAMERAS_HUSKYLENS_GET_DATA_BY_ID_INIT_EXTENSION);

Blockly.Extensions.registerMixin("cameras_huskylens_getDataByID_get_type",
    Blockly.Constants.Cameras.CAMERAS_HUSKYLENS_GET_DATA_BY_ID_GET_TYPE);
