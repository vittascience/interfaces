const TOOLBOX_VITTASCIENCE_CATEGORIES = [
    {
        "kind": "category",
        "toolboxitemid": "display",
        "name": "%{BKY_CATEGORY_DISPLAY}",
        "style": "display_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "sensors",
        "name": "%{BKY_CATEGORY_SENSORS}",
        "style": "sensors_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-plug"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "actuators",
        "name": "%{BKY_CATEGORY_ACTUATORS}",
        "style": "actuators_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-fan"
        },
        "contents": []
    },
    // {
    //     "kind": "category",
    //     "toolboxitemid": "vision",
    //     "name": "%{BKY_CATEGORY_VISION}",
    //     "style": "vision_category",
    //     "cssConfig": {
    //         "icon": "icon_blockly fas fa-eye"
    //     },
    //     "contents": []
    // },
    {
        "kind": "category",
        "toolboxitemid": "voice_interactions",
        "name": "%{BKY_CATEGORY_VOICE_INTERACTIONS}",
        "style": "vi_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-volume-up"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "vittaia",
        "name": "%{BKY_CATEGORY_VITTAIA}",
        "style": "vittaia_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-brain"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "time",
        "name": "%{BKY_CATEGORY_TIME}",
        "style": "time_category",
        "cssConfig": {
            "icon": "icon_blockly far fa-clock"
        },
        "contents": []
    },
    {
        "kind": "sep",
        "id": "sep1",
    },

    {
        "kind": "category",
        "toolboxitemid": "logic",
        "name": "%{BKY_CATEGORY_LOGIC}",
        "style": "logic_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-code-branch"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "loops",
        "name": "%{BKY_CATEGORY_LOOPS}",
        "style": "loops_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-redo-alt"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "math",
        "name": "%{BKY_CATEGORY_MATH}",
        "style": "math_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-calculator"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "text",
        "name": "%{BKY_CATEGORY_TEXT}",
        "style": "text_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-font"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "variables",
        "name": "%{BKY_CATEGORY_VARIABLES}",
        "custom": "VARIABLE",
        "style": "variable_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-cog"
        }
    },
    {
        "kind": "category",
        "toolboxitemid": "lists",
        "name": "%{BKY_CATEGORY_LISTS}",
        "style": "lists_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-list"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "procedures",
        "name": "%{BKY_CATEGORY_PROCEDURES}",
        "custom": "PROCEDURE",
        "style": "procedure_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
        }
    },
    {
        "kind": "category",
        "toolboxitemid": "exception",
        "name": "%{BKY_CATEGORY_EXCEPTION}",
        "style": "exception_category",
        "cssConfig": {
            "icon": "icon_blockly fa fa-circle-exclamation"
        },
        "contents": []
    }
];

const TOOLBOX_VITTASCIENCE_SUBCATEGORIES = {
    "display": [
        {
            "kind": "category",
            "toolboxitemid": "display_led",
            "name": "%{BKY_SUBCATEGORY_LED}",
            "style": "display_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "display_face",
            "name": "%{BKY_SUBCATEGORY_FACE}",
            "style": "display_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-face-smile"
            },
            "contents": []
        }
    ],
    "sensors": [
        {
            "kind": "category",
            "toolboxitemid": "sensors_distance",
            "name": "%{BKY_SUBCATEGORY_DISTANCE}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-ruler"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_touch",
            "name": "%{BKY_SUBCATEGORY_TOUCH}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-hand-pointer"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_battery",
            "name": "%{BKY_SUBCATEGORY_BATTERY}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-battery-half"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_microphone",
            "name": "%{BKY_SUBCATEGORY_MICROPHONE}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-microphone"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_motion_sensor",
            "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_MOVEMENT}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-person-running"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "sensors_color",
            "name": "%{BKY_SUBCATEGORY_COLOR}",
            "style": "sensors_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-palette"
            },
            "contents": []
        }
    ],
    "math": [
        {
            "kind": "category",
            "toolboxitemid": "math_calculations",
            "name": "%{BKY_TOOLBOX_LABEL_CALCULATIONS}",
            "style": "math_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-calculator"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "math_rounding",
            "name": "%{BKY_SUBCATEGORY_SHORT_ROUNDING}",
            "style": "math_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-ruler-horizontal"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "math_random",
            "name": "%{BKY_TOOLBOX_LABEL_RANDOM}",
            "style": "math_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-dice"
            },
            "contents": []
        }
    ],
    "text": [
        {
            "kind": "category",
            "toolboxitemid": "text_create",
            "name": "%{BKY_TOOLBOX_LABEL_CREATE}",
            "style": "text_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-pen"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "text_search",
            "name": "%{BKY_TOOLBOX_LABEL_SEARCH}",
            "style": "text_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-magnifying-glass"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "text_transform",
            "name": "%{BKY_TOOLBOX_LABEL_TRANSFORM}",
            "style": "text_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-wand-magic-sparkles"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "text_encryption",
            "name": "%{BKY_SUBCATEGORY_ENCRYPTION}",
            "style": "text_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-lock"
            },
            "contents": []
        }
    ],
    "lists": [
        {
            "kind": "category",
            "toolboxitemid": "lists_create",
            "name": "%{BKY_TOOLBOX_LABEL_CREATE}",
            "style": "lists_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-plus"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "lists_read",
            "name": "%{BKY_TOOLBOX_LABEL_READ}",
            "style": "lists_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-eye"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "lists_modify",
            "name": "%{BKY_TOOLBOX_LABEL_MODIFY}",
            "style": "lists_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-pen-to-square"
            },
            "contents": []
        }
    ]
};

const TOOLBOX_VITTASCIENCE_CONTENT = {
    "display": [
        {
            "subCategoryId": "display_led",
            "contents": [
                {
                    "blocks": [
                        'display_updateAllLed',
                        'display_updateLedColor',
                        'display_blinkLed',
                        'display_blinkAllLed',
                        'display_updateAllLedWithPattern',
                        'display_fadeAllLed',
                        'display_stopAllLed',
                        'display_stopLed',
                    ]
                }
            ]
        },
        {
            "subCategoryId": "display_face",
            "contents": [
                {
                    "blocks": [
                        'display_setMood',
                        'display_setFacialExpression',
                        'display_playFacialEvent',
                        'display_setLabialExpression',
                        'display_setFacePositivity',
                        'display_setFaceEnergy',
                        'display_playFacialRelativeEvent',
                        'display_lookAtXY',
                        'display_lookAt'
                    ]
                }
            ]
        }
    ],
    "sensors": [
        {
            "subCategoryId": "sensors_distance",
            "contents": [
                {
                    "blocks": [
                        'sensors_USdetectObstacle',
                        'sensors_ToFdetectObstacle',
                        'sensors_getDistance',
                        'sensors_getLight',
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_touch",
            "contents": [
                {
                    "blocks": [
                        'sensors_onHeadTouchSensorsTouched',
                        'sensors_onBodyTouchSensorsTouched',
                        'sensors_onFaceTouchSensorsTouched',
                        'sensors_headTouchSensors',
                        'sensors_bodyTouchSensors',
                        'sensors_faceTouchSensors'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_battery",
            "contents": [
                {
                    "blocks": [
                        'sensors_getBatteryLevel',
                        'sensors_isCharging',
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_microphone",
            "contents": [
                {
                    "blocks": [
                        'sensors_getAmbiantSound',
                        'sensors_getSoundLocalisation',
                        'sensors_getTriggerScore',
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_motion_sensor",
            "contents": [
                {
                    "blocks": [
                        'sensors_getBodyAcc',
                        'sensors_getBodyGyr',
                        'sensors_getHeadAcc',
                        'sensors_getHeadGyr',
                    ]
                }
            ]
        },
        {
            "subCategoryId": "sensors_color",
            "contents": [
                {
                    "blocks": [
                        'sensors_colorDetect'
                    ]
                }
            ]
        }
    ],
    "actuators": [
        {
            "label": "%{BKY_SUBCATEGORY_HEAD_MOVEMENTS}",
            "blocks": [
                'actuators_buddySay',
                'actuators_buddySayStraight',
                'actuators_stopMove',
                'actuators_getPosition',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_WHEELS}",
            "blocks": [
                'actuators_moveBuddyWithDistance',
                'actuators_moveBuddy',
                'actuators_rotateBuddyWithAngle',
                'actuators_rotateBuddy',
                'actuators_emergencyStopMotors'
            ]
        }
    ],
    // "vision": [
    //     {
    //         "label": "%{BKY_SUBCATEGORY_CAMERA}",
    //         "blocks": [
    //             'vision_startCamera',
    //             'vision_stopCamera',
    //             'vision_getGrandAngleFrame',
    //             'vision_getCVResultFrame'
    //         ]
    //     },
    //     {
    //         "label": "%{BKY_SUBCATEGORY_OBJECT_DETECTION}",
    //         "blocks": [
    //             'vision_detectArucoMarkers',
    //             'vision_detectFaces',
    //             'vision_ifPersonDetected',
    //             'vision_ifPersonDetectedInArea',
    //             'vision_detectPerson'
    //         ]
    //     },
    //     {
    //         "label": "%{BKY_SUBCATEGORY_MOTION_DETECTION}",
    //         "blocks": [
    //             'vision_startMotionDetection',
    //             'vision_stopMotionDetection',
    //             'vision_motionDetect',
    //             'vision_setMotionThres',
    //             'vision_motionDetectWithThres',
    //             'vision_getMotionDetection'
    //         ]
    //     },
    //     {
    //         "label": "%{BKY_SUBCATEGORY_PERSON_TRACKING}",
    //         "blocks": [
    //             'vision_startVisualTracking',
    //             'vision_stopVisualTracking',
    //             'vision_getTracking',
    //         ]
    //     },
    // ],
    "voice_interactions": [
        {
            "label": "%{BKY_SUBCATEGORY_TALK}",
            "blocks": [
                'vi_startSpeaking',
                'vi_stopSpeaking',
                'vi_isSpeaking',
                'vi_setSpeakerVoice',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_VOLUME}",
            "blocks": [
                'vi_setSpeakerVolume',
                'vi_getSpeakerVolume',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SPEECH_RATE}",
            "blocks": [
                'vi_setSpeakerSpeed',
                'vi_getSpeakerSpeed',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_PITCH}",
            "blocks": [
                'vi_setSpeakerPitch',
                'vi_getSpeakerPitch'
            ]
        }
    ],
    "vittaia": [
        {
            "label": "%{BKY_SUBCATEGORY_VITTAIA_IMAGE}",
            "blocks": [
                'vittaia_load_local_model',
                'vittaia_load_model',
                'vittaia_load_model_default',
                'vittaia_make_predictions_webcam',
                'vittaia_get_highest_probability_class',
                'vittaia_get_confidence_rate',
                'vittaia_get_predictions',
                'vittaia_detect_class',
                'vittaia_list_webcams',
                'vittaia_init_webcam'
            ]
        }
    ],
    "time": [
        {
            "blocks": [
                'io_pause',
                'io_waitUntil',
                'io_initChronometer',
                'io_getChronometer'
            ]
        }
    ],
    "logic": [
        {
            "blocks": [
                'controls_if',
                'controls_if-else',
                'logic_compare-eq',
                'logic_operation-and',
                'logic_negate',
                'logic_boolean',
                'logic_null',
                'logic_ternary'
            ]
        }
    ],
    "loops": [
        {
            "blocks": [
                'forever',
                'controls_repeat',
                'controls_whileUntil',
                'controls_for',
                'controls_forEach',
                'controls_flow_statements'
            ]
        }
    ],
    "math": [
        {
            "subCategoryId": "math_calculations",
            "contents": [{
                "blocks": [
                    'math_number',
                    'math_arithmetic-add',
                    'math_single',
                    'math_trig',
                    'math_constant',
                    'math_number_property',
                    'math_modulo',
                    'math_atan2'
                ]
            }]
        },
        {
            "subCategoryId": "math_rounding",
            "contents": [{
                "blocks": [
                    'math_map',
                    'math_round',
                    'math_round_ndigits',
                    'math_constrain'
                ]
            }]
        },
        {
            "subCategoryId": "math_random",
            "contents": [{
                "blocks": [
                    'math_random_int',
                    'math_random_float'
                ]
            }]
        }
    ],
    "text": [
        {
            "subCategoryId": "text_create",
            "contents": [{
                "blocks": [
                    'text_comment',
                    'text',
                    'text_join',
                    'text_newline',
                    'text_append'
                ]
            }]
        },
        {
            "subCategoryId": "text_search",
            "contents": [{
                "blocks": [
                    'text_length',
                    'text_isEmpty',
                    'text_includesSubstr',
                    'text_indexOf',
                    'text_charAt',
                    'text_count_characters',
                    'text_count'
                ]
            }]
        },
        {
            "subCategoryId": "text_transform",
            "contents": [{
                "blocks": [
                    'text_split',
                    'text_getSubstring',
                    'text_changeCase',
                    'text_trim',
                    'text_replace',
                    'text_reverse',
                    'text_random_string'
                ]
            }]
        },
        {
            "subCategoryId": "text_encryption",
            "contents": [{
                "blocks": [
                    'text_caesar_cipher',
                    'text_caesar_cipher_brute_force'
                ]
            }]
        }
    ],
    "variables": "customized",
    "lists": [
        {
            "subCategoryId": "lists_create",
            "contents": [{
                "blocks": [
                    'lists_create_with-0',
                    'lists_create_with',
                    'lists_repeat',
                    'lists_split'
                ]
            }]
        },
        {
            "subCategoryId": "lists_read",
            "contents": [{
                "blocks": [
                    'lists_length',
                    'lists_isEmpty',
                    'math_on_list',
                    'lists_indexOf',
                    'lists_getIndex',
                    'lists_getSublist'
                ]
            }]
        },
        {
            "subCategoryId": "lists_modify",
            "contents": [{
                "blocks": [
                    'lists_reverse',
                    'lists_append',
                    'lists_setIndex',
                    'lists_sort'
                ]
            }]
        }
    ],
    "procedures": "customized",
    "exception": [
        {
            "blocks": [
                'exception_raise',
                'exception_exception',
                'exception_type',
                'exception_try'
            ]
        }
    ]
};

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;