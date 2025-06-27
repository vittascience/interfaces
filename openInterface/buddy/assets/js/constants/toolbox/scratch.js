const TOOLBOX_SCRATCH_CATEGORIES = [
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
        "toolboxitemid": "control",
        "name": "%{BKY_CATEGORY_CONTROL}",
        "style": "control_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-code-branch"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "math",
        "name": "%{BKY_CATEGORY_OPERATORS}",
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
        "style": "list_category",
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

const TOOLBOX_SCRATCH_CONTENT = {
    "display": [
        {
            "label": "%{BKY_SUBCATEGORY_LED}",
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
        },
        {
            "label": "%{BKY_SUBCATEGORY_FACE}",
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
        },
    ],
    "sensors": [
        {
            "label": "%{BKY_SUBCATEGORY_DISTANCE}",
            "blocks": [
                'sensors_USdetectObstacle',
                'sensors_ToFdetectObstacle',
                'sensors_getDistance',
                'sensors_getLight',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_TOUCH}",
            "blocks": [
                'sensors_onHeadTouchSensorsTouched',
                'sensors_onBodyTouchSensorsTouched',
                'sensors_onFaceTouchSensorsTouched',
                'sensors_headTouchSensors',
                'sensors_bodyTouchSensors',
                'sensors_faceTouchSensors'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_BATTERY}",
            "blocks": [
                'sensors_getBatteryLevel',
                'sensors_isCharging',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_MICROPHONE}",
            "blocks": [
                'sensors_getAmbiantSound',
                'sensors_getSoundLocalisation',
                'sensors_getTriggerScore',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_MOVEMENTS}",
            "blocks": [
                'sensors_getBodyAcc',
                'sensors_getBodyGyr',
                'sensors_getHeadAcc',
                'sensors_getHeadGyr',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_COLOR}",
            "blocks": [
                'sensors_colorDetect'
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
    "control": [
        {
            "blocks": [
                'io_pause',
                'io_waitUntil',
                'io_initChronometer',
                'io_getChronometer'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_LOOPS}",
            "blocks": [
                'scratch_forever',
                'controls_repeat',
                'controls_whileUntil',
                'controls_for',
                'controls_forEach',
                'controls_flow_statements'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_LOGIC}",
            "blocks": [
                'controls_if',
                'controls_if-else',
                'logic_ternary'
            ]
        }
    ],
    "math": [{
        "blocks": [
            'math_number',
            'math_arithmetic-add',
            'math_arithmetic-minus',
            'math_arithmetic-multiply',
            'math_arithmetic-divide',
            'logic_compare-gte',
            'logic_compare-lte',
            'logic_compare-eq',
            'logic_operation-and',
            'logic_operation-or',
            'logic_negate',
            'logic_boolean',
            'logic_null',
            'math_random_int',
            'math_single',
            'math_trig',
            'math_constant',
            'math_number_property',
            'math_map',
            'math_round',
            'math_round_ndigits',
            'math_modulo',
            'math_constrain',
            'math_random_float',
            'math_atan2'
        ]
    }
    ],
    "text": [
        {
            "blocks": [
                'text_comment',
                'text',
                'text_join',
                'text_newline',
                'text_append',
                'text_split',
                'text_length',
                'text_isEmpty',
                'text_indexOf',
                'text_charAt',
                'text_getSubstring',
                'text_changeCase',
                'text_trim',
                'text_count',
                'text_replace',
                'text_reverse',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_TEXT_ANALYSIS}",
            "blocks": [
                'text_count_characters',
                'text_random_string'
            ],
        }
    ],
    "variables": "customized",
    "lists": [{
        "blocks": [
            'lists_create_with-0',
            'lists_create_with',
            'lists_repeat',
            'lists_length',
            'lists_isEmpty',
            'math_on_list',
            'lists_reverse',
            'lists_indexOf',
            'lists_getIndex',
            'lists_append',
            'lists_setIndex',
            'lists_getSublist',
            'lists_split',
            'lists_sort'
        ]
    }
    ],
    "procedures": "customized",
    "exception": [{
        "blocks": [
            'exception_raise',
            'exception_exception',
            'exception_type',
            'exception_try'
        ]
    }]
};

const TOOLBOX_SCRATCH_CONTENT_SIMPLE = TOOLBOX_SCRATCH_CONTENT;
