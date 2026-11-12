/**
 * @fileoverview Bricks blocks for Arduino Q.
 */

// Objects of the pre-trained model of the Video Object Detection brick (YOLOX, 80 COCO objects), shared by the
// object blocks: the 20 most common first, then the others
const BRICKS_OBJECT_OPTIONS = [
    ["%{BKY_BRICKS_OBJECT_PERSON}", "person"],
    ["%{BKY_BRICKS_OBJECT_CAT}", "cat"],
    ["%{BKY_BRICKS_OBJECT_DOG}", "dog"],
    ["%{BKY_BRICKS_OBJECT_BIRD}", "bird"],
    ["%{BKY_BRICKS_OBJECT_BOTTLE}", "bottle"],
    ["%{BKY_BRICKS_OBJECT_CUP}", "cup"],
    ["%{BKY_BRICKS_OBJECT_CHAIR}", "chair"],
    ["%{BKY_BRICKS_OBJECT_PHONE}", "cell phone"],
    ["%{BKY_BRICKS_OBJECT_BOOK}", "book"],
    ["%{BKY_BRICKS_OBJECT_LAPTOP}", "laptop"],
    ["%{BKY_BRICKS_OBJECT_KEYBOARD}", "keyboard"],
    ["%{BKY_BRICKS_OBJECT_MOUSE}", "mouse"],
    ["%{BKY_BRICKS_OBJECT_CAR}", "car"],
    ["%{BKY_BRICKS_OBJECT_BICYCLE}", "bicycle"],
    ["%{BKY_BRICKS_OBJECT_BANANA}", "banana"],
    ["%{BKY_BRICKS_OBJECT_APPLE}", "apple"],
    ["%{BKY_BRICKS_OBJECT_ORANGE}", "orange"],
    ["%{BKY_BRICKS_OBJECT_BALL}", "sports ball"],
    ["%{BKY_BRICKS_OBJECT_PLANT}", "potted plant"],
    ["%{BKY_BRICKS_OBJECT_SCISSORS}", "scissors"],
    ["%{BKY_BRICKS_OBJECT_AIRPLANE}", "airplane"],
    ["%{BKY_BRICKS_OBJECT_BACKPACK}", "backpack"],
    ["%{BKY_BRICKS_OBJECT_BASEBALL_BAT}", "baseball bat"],
    ["%{BKY_BRICKS_OBJECT_BASEBALL_GLOVE}", "baseball glove"],
    ["%{BKY_BRICKS_OBJECT_BEAR}", "bear"],
    ["%{BKY_BRICKS_OBJECT_BED}", "bed"],
    ["%{BKY_BRICKS_OBJECT_BENCH}", "bench"],
    ["%{BKY_BRICKS_OBJECT_BOAT}", "boat"],
    ["%{BKY_BRICKS_OBJECT_BOWL}", "bowl"],
    ["%{BKY_BRICKS_OBJECT_BROCCOLI}", "broccoli"],
    ["%{BKY_BRICKS_OBJECT_BUS}", "bus"],
    ["%{BKY_BRICKS_OBJECT_CAKE}", "cake"],
    ["%{BKY_BRICKS_OBJECT_CARROT}", "carrot"],
    ["%{BKY_BRICKS_OBJECT_CLOCK}", "clock"],
    ["%{BKY_BRICKS_OBJECT_COUCH}", "couch"],
    ["%{BKY_BRICKS_OBJECT_COW}", "cow"],
    ["%{BKY_BRICKS_OBJECT_DINING_TABLE}", "dining table"],
    ["%{BKY_BRICKS_OBJECT_DONUT}", "donut"],
    ["%{BKY_BRICKS_OBJECT_ELEPHANT}", "elephant"],
    ["%{BKY_BRICKS_OBJECT_FIRE_HYDRANT}", "fire hydrant"],
    ["%{BKY_BRICKS_OBJECT_FORK}", "fork"],
    ["%{BKY_BRICKS_OBJECT_FRISBEE}", "frisbee"],
    ["%{BKY_BRICKS_OBJECT_GIRAFFE}", "giraffe"],
    ["%{BKY_BRICKS_OBJECT_HAIR_DRIER}", "hair drier"],
    ["%{BKY_BRICKS_OBJECT_HANDBAG}", "handbag"],
    ["%{BKY_BRICKS_OBJECT_HORSE}", "horse"],
    ["%{BKY_BRICKS_OBJECT_HOT_DOG}", "hot dog"],
    ["%{BKY_BRICKS_OBJECT_KITE}", "kite"],
    ["%{BKY_BRICKS_OBJECT_KNIFE}", "knife"],
    ["%{BKY_BRICKS_OBJECT_MICROWAVE}", "microwave"],
    ["%{BKY_BRICKS_OBJECT_MOTORCYCLE}", "motorcycle"],
    ["%{BKY_BRICKS_OBJECT_OVEN}", "oven"],
    ["%{BKY_BRICKS_OBJECT_PARKING_METER}", "parking meter"],
    ["%{BKY_BRICKS_OBJECT_PIZZA}", "pizza"],
    ["%{BKY_BRICKS_OBJECT_REFRIGERATOR}", "refrigerator"],
    ["%{BKY_BRICKS_OBJECT_REMOTE}", "remote"],
    ["%{BKY_BRICKS_OBJECT_SANDWICH}", "sandwich"],
    ["%{BKY_BRICKS_OBJECT_SHEEP}", "sheep"],
    ["%{BKY_BRICKS_OBJECT_SINK}", "sink"],
    ["%{BKY_BRICKS_OBJECT_SKATEBOARD}", "skateboard"],
    ["%{BKY_BRICKS_OBJECT_SKIS}", "skis"],
    ["%{BKY_BRICKS_OBJECT_SNOWBOARD}", "snowboard"],
    ["%{BKY_BRICKS_OBJECT_SPOON}", "spoon"],
    ["%{BKY_BRICKS_OBJECT_STOP_SIGN}", "stop sign"],
    ["%{BKY_BRICKS_OBJECT_SUITCASE}", "suitcase"],
    ["%{BKY_BRICKS_OBJECT_SURFBOARD}", "surfboard"],
    ["%{BKY_BRICKS_OBJECT_TEDDY_BEAR}", "teddy bear"],
    ["%{BKY_BRICKS_OBJECT_TENNIS_RACKET}", "tennis racket"],
    ["%{BKY_BRICKS_OBJECT_TIE}", "tie"],
    ["%{BKY_BRICKS_OBJECT_TOASTER}", "toaster"],
    ["%{BKY_BRICKS_OBJECT_TOILET}", "toilet"],
    ["%{BKY_BRICKS_OBJECT_TOOTHBRUSH}", "toothbrush"],
    ["%{BKY_BRICKS_OBJECT_TRAFFIC_LIGHT}", "traffic light"],
    ["%{BKY_BRICKS_OBJECT_TRAIN}", "train"],
    ["%{BKY_BRICKS_OBJECT_TRUCK}", "truck"],
    ["%{BKY_BRICKS_OBJECT_TV}", "tv"],
    ["%{BKY_BRICKS_OBJECT_UMBRELLA}", "umbrella"],
    ["%{BKY_BRICKS_OBJECT_VASE}", "vase"],
    ["%{BKY_BRICKS_OBJECT_WINE_GLASS}", "wine glass"],
    ["%{BKY_BRICKS_OBJECT_ZEBRA}", "zebra"]
];

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    {
        "type": "bricks_app_run",
        "message0": "%{BKY_BRICKS_APP_RUN_TITLE}",
        "previousStatement": null,
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_APP_RUN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "bricks_app_run_init"
        ],
        "mutator": "bricks_app_run_mutator"
    },
    {
        "type": "bricks_webui_send_message",
        "message0": "%{BKY_BRICKS_WEBUI_SEND_MESSAGE_TITLE}",
        "args0": [{
            "type": "field_input",
            "name": "ID",
            "text": "request_id"
        }, {
            "type": "input_value",
            "name": "MESSAGE",
            "check": "String"
        }],
        "nextStatement": null,
        "previousStatement": null,
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_WEBUI_SEND_MESSAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_webui_console",
        "message0": "%{BKY_BRICKS_WEBUI_CONSOLE_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_WEBUI_CONSOLE_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "bricks_webui_on_message",
        "message0": "%{BKY_BRICKS_WEBUI_ON_MESSAGE_TITLE}",
        "args0": [{
            "type": "field_input",
            "name": "ID",
            "text": "request_id"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_WEBUI_ON_MESSAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // Camera Code Detection brick (QR codes and barcodes)
    {
        "type": "bricks_code_on_read",
        "message0": "%{BKY_BRICKS_CODE_ON_READ_TITLE}",
        "args0": [],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_CODE_ON_READ_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "bricks_code_last",
        "message0": "%{BKY_BRICKS_CODE_LAST_TITLE}",
        "args0": [],
        "output": "String",
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_CODE_LAST_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    // Camera of the Camera Code Detection and Video Object Detection bricks
    {
        "type": "bricks_camera_rotation",
        "message0": "%{BKY_BRICKS_CAMERA_ROTATION_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "ANGLE",
            "options": [["90°", "90"], ["180°", "180"], ["270°", "270"], ["0°", "0"]]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_CAMERA_ROTATION_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    // Video Object Detection brick (pre-trained model)
    {
        "type": "bricks_object_on_detect",
        "message0": "%{BKY_BRICKS_OBJECT_ON_DETECT_TITLE}",
        "args0": [{
            "type": "field_search_dropdown",
            "name": "OBJECT",
            "columns": 2,
            "options": BRICKS_OBJECT_OPTIONS
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_OBJECT_ON_DETECT_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "bricks_object_count",
        "message0": "%{BKY_BRICKS_OBJECT_COUNT_TITLE}",
        "args0": [{
            "type": "field_search_dropdown",
            "name": "OBJECT",
            "columns": 2,
            "options": BRICKS_OBJECT_OPTIONS
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_OBJECT_COUNT_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "bricks_object_position",
        "message0": "%{BKY_BRICKS_OBJECT_POSITION_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "MEASURE",
            "options": [
                ["%{BKY_BRICKS_OBJECT_POSITION_X}", "x"],
                ["%{BKY_BRICKS_OBJECT_POSITION_Y}", "y"],
                ["%{BKY_BRICKS_OBJECT_POSITION_WIDTH}", "width"],
                ["%{BKY_BRICKS_OBJECT_POSITION_HEIGHT}", "height"]
            ]
        }, {
            "type": "field_search_dropdown",
            "name": "OBJECT",
            "columns": 2,
            "options": BRICKS_OBJECT_OPTIONS
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_OBJECT_POSITION_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    // Telegram Bot brick
    {
        "type": "bricks_telegram_start",
        "message0": "%{BKY_BRICKS_TELEGRAM_START_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TOKEN",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_TELEGRAM_START_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "bricks_telegram_on_message",
        "message0": "%{BKY_BRICKS_TELEGRAM_ON_MESSAGE_TITLE}",
        "args0": [],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_TELEGRAM_ON_MESSAGE_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "bricks_telegram_message_text",
        "message0": "%{BKY_BRICKS_TELEGRAM_MESSAGE_TEXT_TITLE}",
        "args0": [],
        "output": "String",
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_TELEGRAM_MESSAGE_TEXT_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "bricks_telegram_chat_id",
        "message0": "%{BKY_BRICKS_TELEGRAM_CHAT_ID_TITLE}",
        "args0": [],
        "output": "Number",
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_TELEGRAM_CHAT_ID_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "bricks_telegram_reply",
        "message0": "%{BKY_BRICKS_TELEGRAM_REPLY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_TELEGRAM_REPLY_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "bricks_telegram_send",
        "message0": "%{BKY_BRICKS_TELEGRAM_SEND_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }, {
            "type": "input_value",
            "name": "CHAT",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_TELEGRAM_SEND_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    // Keyword spotting, local LLM, MQTT, Arduino Cloud
    {
        "type": "bricks_keyword_on_heard",
        "message0": "%{BKY_BRICKS_KEYWORD_ON_HEARD_TITLE}",
        "args0": [],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_KEYWORD_ON_HEARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_llm_ask",
        "message0": "%{BKY_BRICKS_LLM_ASK_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "QUESTION"
            }
        ],
        "inputsInline": true,
        "output": "String",
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_LLM_ASK_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_llm_personality",
        "message0": "%{BKY_BRICKS_LLM_PERSONALITY_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "TEXT",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_LLM_PERSONALITY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_llm_model",
        "message0": "%{BKY_BRICKS_LLM_MODEL_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "MODEL",
                "options": [
                    [
                        "Qwen 3.5 0.8B",
                        "llamacpp:Qwen3.5-0.8B-Q4_0"
                    ],
                    [
                        "Gemma 3 1B",
                        "llamacpp:gemma-3-1b-it-Q4_0"
                    ]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_LLM_MODEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_llm_tool",
        "message0": "%{BKY_BRICKS_LLM_TOOL_TITLE}",
        "args0": [
            {
                "type": "field_input",
                "name": "NAME",
                "text": "allumer_salon"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "DESCRIPTION",
                "text": "allume la lumière du salon"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "PARAMS",
                "text": ""
            }
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "message2": "%{BKY_BRICKS_LLM_TOOL_RESULT}",
        "args2": [
            {
                "type": "input_value",
                "name": "RESULT"
            }
        ],
        "inputsInline": false,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_LLM_TOOL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_llm_tool_param",
        "message0": "%{BKY_BRICKS_LLM_TOOL_PARAM_TITLE}",
        "args0": [
            {
                "type": "field_input",
                "name": "NAME",
                "text": "piece"
            }
        ],
        "inputsInline": true,
        "output": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_LLM_TOOL_PARAM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_llm_choose",
        "message0": "%{BKY_BRICKS_LLM_CHOOSE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ACTIONS",
                "check": "Array"
            },
            {
                "type": "input_value",
                "name": "SENTENCE"
            }
        ],
        "inputsInline": true,
        "output": "String",
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_LLM_CHOOSE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_llm_options",
        "message0": "%{BKY_BRICKS_LLM_OPTIONS_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "CREATIVITY",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "LENGTH",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_LLM_OPTIONS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_llm_stream",
        "message0": "%{BKY_BRICKS_LLM_STREAM_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "STREAM",
                "options": [
                    [
                        "%{BKY_BRICKS_LLM_MEMORY_ON}",
                        "ON"
                    ],
                    [
                        "%{BKY_BRICKS_LLM_MEMORY_OFF}",
                        "OFF"
                    ]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_LLM_STREAM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_llm_memory",
        "message0": "%{BKY_BRICKS_LLM_MEMORY_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "MEMORY",
                "options": [
                    [
                        "%{BKY_BRICKS_LLM_MEMORY_ON}",
                        "ON"
                    ],
                    [
                        "%{BKY_BRICKS_LLM_MEMORY_OFF}",
                        "OFF"
                    ]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_LLM_MEMORY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_llm_clear",
        "message0": "%{BKY_BRICKS_LLM_CLEAR_TITLE}",
        "args0": [],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_LLM_CLEAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_mqtt_connect",
        "message0": "%{BKY_BRICKS_MQTT_CONNECT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "SERVER",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "PORT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "USER",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "PASSWORD",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_MQTT_CONNECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_mqtt_publish",
        "message0": "%{BKY_BRICKS_MQTT_PUBLISH_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "TEXT"
            },
            {
                "type": "input_value",
                "name": "TOPIC",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_MQTT_PUBLISH_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_mqtt_on_message",
        "message0": "%{BKY_BRICKS_MQTT_ON_MESSAGE_TITLE}",
        "args0": [
            {
                "type": "field_input",
                "name": "TOPIC",
                "text": "vittascience/test"
            }
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_MQTT_ON_MESSAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_mqtt_message",
        "message0": "%{BKY_BRICKS_MQTT_MESSAGE_TITLE}",
        "args0": [],
        "inputsInline": true,
        "output": "String",
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_MQTT_MESSAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_mqtt_topic",
        "message0": "%{BKY_BRICKS_MQTT_TOPIC_TITLE}",
        "args0": [],
        "inputsInline": true,
        "output": "String",
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_MQTT_TOPIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_ble_connect",
        "message0": "%{BKY_BRICKS_BLE_CONNECT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_BLE_CONNECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_ble_send",
        "message0": "%{BKY_BRICKS_BLE_SEND_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "TEXT"
            },
            {
                "type": "input_value",
                "name": "UUID",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_BLE_SEND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_ble_on_message",
        "message0": "%{BKY_BRICKS_BLE_ON_MESSAGE_TITLE}",
        "args0": [
            {
                "type": "field_input",
                "name": "UUID",
                "text": "6e400003-b5a3-f393-e0a9-e50e24dcca9e"
            }
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_BLE_ON_MESSAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_ble_message",
        "message0": "%{BKY_BRICKS_BLE_MESSAGE_TITLE}",
        "args0": [],
        "inputsInline": true,
        "output": "String",
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_BLE_MESSAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_ble_connected",
        "message0": "%{BKY_BRICKS_BLE_CONNECTED_TITLE}",
        "args0": [],
        "inputsInline": true,
        "output": "Boolean",
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_BLE_CONNECTED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_ble_disconnect",
        "message0": "%{BKY_BRICKS_BLE_DISCONNECT_TITLE}",
        "args0": [],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_BLE_DISCONNECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_ble_server_start",
        "message0": "%{BKY_BRICKS_BLE_SERVER_START_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_BLE_SERVER_START_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_ble_server_send",
        "message0": "%{BKY_BRICKS_BLE_SERVER_SEND_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "TEXT"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_BLE_SERVER_SEND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_ble_server_on_message",
        "message0": "%{BKY_BRICKS_BLE_SERVER_ON_MESSAGE_TITLE}",
        "args0": [],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_BLE_SERVER_ON_MESSAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_ble_server_connected",
        "message0": "%{BKY_BRICKS_BLE_SERVER_CONNECTED_TITLE}",
        "args0": [],
        "inputsInline": true,
        "output": "Boolean",
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_BLE_SERVER_CONNECTED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_cloud_set",
        "message0": "%{BKY_BRICKS_CLOUD_SET_TITLE}",
        "args0": [
            {
                "type": "field_input",
                "name": "NAME",
                "text": "temperature"
            },
            {
                "type": "input_value",
                "name": "VALUE"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_CLOUD_SET_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_cloud_get",
        "message0": "%{BKY_BRICKS_CLOUD_GET_TITLE}",
        "args0": [
            {
                "type": "field_input",
                "name": "NAME",
                "text": "led"
            }
        ],
        "inputsInline": true,
        "output": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_CLOUD_GET_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_cloud_on_change",
        "message0": "%{BKY_BRICKS_CLOUD_ON_CHANGE_TITLE}",
        "args0": [
            {
                "type": "field_input",
                "name": "NAME",
                "text": "led"
            }
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_CLOUD_ON_CHANGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // Options of the bricks (camera, codes, objects, Telegram) and video of the camera
    {
        "type": "bricks_camera_flip",
        "message0": "%{BKY_BRICKS_CAMERA_FLIP_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "FLIP",
                "options": [
                    [
                        "%{BKY_BRICKS_CAMERA_FLIP_H}",
                        "h"
                    ],
                    [
                        "%{BKY_BRICKS_CAMERA_FLIP_V}",
                        "v"
                    ],
                    [
                        "%{BKY_BRICKS_CAMERA_FLIP_NONE}",
                        "none"
                    ]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_CAMERA_FLIP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_camera_image",
        "message0": "%{BKY_BRICKS_CAMERA_IMAGE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "BRIGHTNESS",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "CONTRAST",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_CAMERA_IMAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_camera_colors",
        "message0": "%{BKY_BRICKS_CAMERA_COLORS_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "COLORS",
                "options": [
                    [
                        "%{BKY_BRICKS_CAMERA_COLORS_GREY}",
                        "GREY"
                    ],
                    [
                        "%{BKY_BRICKS_CAMERA_COLORS_COLOR}",
                        "COLOR"
                    ]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_CAMERA_COLORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_camera_save_photo",
        "message0": "%{BKY_BRICKS_CAMERA_SAVE_PHOTO_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "FILE",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_CAMERA_SAVE_PHOTO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_camera_save_photo_folder",
        "message0": "%{BKY_BRICKS_CAMERA_SAVE_PHOTO_FOLDER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FOLDER",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_CAMERA_SAVE_PHOTO_FOLDER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_camera_make_stopmotion",
        "message0": "%{BKY_BRICKS_CAMERA_MAKE_STOPMOTION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "NAME",
            "check": "String"
        }, {
            "type": "field_dropdown",
            "name": "FORMAT",
            "options": [
                ["GIF", "gif"],
                ["MP4", "mp4"]
            ]
        }, {
            "type": "input_value",
            "name": "FOLDER",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "FPS",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_CAMERA_MAKE_STOPMOTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_code_last_type",
        "message0": "%{BKY_BRICKS_CODE_LAST_TYPE_TITLE}",
        "args0": [],
        "inputsInline": true,
        "output": "String",
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_CODE_LAST_TYPE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_code_kinds",
        "message0": "%{BKY_BRICKS_CODE_KINDS_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "KINDS",
                "options": [
                    [
                        "%{BKY_BRICKS_CODE_KINDS_ALL}",
                        "all"
                    ],
                    [
                        "%{BKY_BRICKS_CODE_KINDS_QR}",
                        "qr"
                    ],
                    [
                        "%{BKY_BRICKS_CODE_KINDS_BARCODE}",
                        "barcode"
                    ]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_CODE_KINDS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_object_confidence",
        "message0": "%{BKY_BRICKS_OBJECT_CONFIDENCE_TITLE}",
        "args0": [
            {
                "type": "field_search_dropdown",
                "name": "OBJECT",
                "columns": 2,
                "options": BRICKS_OBJECT_OPTIONS
            }
        ],
        "inputsInline": true,
        "output": "Number",
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_OBJECT_CONFIDENCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_object_list",
        "message0": "%{BKY_BRICKS_OBJECT_LIST_TITLE}",
        "args0": [],
        "inputsInline": true,
        "output": "Array",
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_OBJECT_LIST_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_object_threshold",
        "message0": "%{BKY_BRICKS_OBJECT_THRESHOLD_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_OBJECT_THRESHOLD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_telegram_on_command",
        "message0": "%{BKY_BRICKS_TELEGRAM_ON_COMMAND_TITLE}",
        "args0": [
            {
                "type": "field_input",
                "name": "COMMAND",
                "text": "start"
            }
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_TELEGRAM_ON_COMMAND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_telegram_send_photo",
        "message0": "%{BKY_BRICKS_TELEGRAM_SEND_PHOTO_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "CAPTION",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "CHAT",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_TELEGRAM_SEND_PHOTO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "html_camera_video",
        "message0": "%{BKY_HTML_CAMERA_VIDEO_TITLE}",
        "args0": [
            {
                "type": "field_number",
                "name": "WIDTH",
                "value": 640,
                "min": 1
            },
            {
                "type": "field_number",
                "name": "HEIGHT",
                "value": 480,
                "min": 1
            },
            {
                "type": "input_value",
                "name": "modifier",
                "check": "attributes"
            }
        ],
        "previousStatement": "html",
        "nextStatement": "html",
        "colour": "#87599d",
        "tooltip": "%{BKY_HTML_CAMERA_VIDEO_TOOLTIP}"
    },
    // Web page: chat with the local AI of the board (Large Language Model brick, by the WebUI brick)
    {
        "type": "html_llm_chat",
        "message0": "%{BKY_HTML_LLM_CHAT_TITLE}",
        "args0": [{
            "type": "field_number",
            "name": "WIDTH",
            "value": 500,
            "min": 1
        }, {
            "type": "field_number",
            "name": "HEIGHT",
            "value": 400,
            "min": 1
        }, {
            "type": "input_value",
            "name": "modifier",
            "check": "attributes"
        }],
        "previousStatement": "html",
        "nextStatement": "html",
        "colour": "#87599d",
        "tooltip": "%{BKY_HTML_LLM_CHAT_TOOLTIP}"
    },
    // Web page: video of the camera of the board with the objects found (Video Object Detection brick)
    {
        "type": "html_object_detection_video",
        "message0": "%{BKY_HTML_OBJECT_DETECTION_VIDEO_TITLE}",
        "args0": [{
            "type": "field_number",
            "name": "WIDTH",
            "value": 640,
            "min": 1
        }, {
            "type": "field_number",
            "name": "HEIGHT",
            "value": 480,
            "min": 1
        }, {
            "type": "input_value",
            "name": "modifier",
            "check": "attributes"
        }],
        "previousStatement": "html",
        "nextStatement": "html",
        "colour": "#87599d",
        "tooltip": "%{BKY_HTML_OBJECT_DETECTION_VIDEO_TOOLTIP}"
    },
]);

Blockly.Constants.Bricks = Object.create(null);

/**
 * Performs final setup of 'bricks_app_run' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Bricks.BRICKS_WEBUI_APP_RUN_INIT_EXTENSION = function () {
    this.option_ = false;
    this.update_(this.updateField_);
};

Blockly.Extensions.register("bricks_app_run_init",
    Blockly.Constants.Bricks.BRICKS_WEBUI_APP_RUN_INIT_EXTENSION);

/**
 * Mixin for mutator functions in the 'bricks_app_run' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Bricks.BRICKS_WEBUI_APP_RUN_MUTATOR_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('user_loop', 'BRICKS_WEBUI_APP_RUN_USER_LOOP', 'input');

Blockly.Extensions.registerMutator('bricks_app_run_mutator',
    Blockly.Constants.Bricks.BRICKS_WEBUI_APP_RUN_MUTATOR_MIXIN);

