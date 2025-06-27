/**
 * @fileoverview Sensors blocks for Buddy.
 */

Blockly.defineBlocksWithJsonArray([
    {
        "type": "sensors_USdetectObstacle",
        "message0": "%{BKY_SENSORS_US_DETECT_OBSTACLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_SENSORS_ISDETECTED}", "is"],
                ["%{BKY_SENSORS_ISNTTOUCHED}", "isnt"],
            ]
        },
        {
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        },
        {
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_SENSORS_GET_DISTANCE_LEFT}", "Left"],
                ["%{BKY_SENSORS_GET_DISTANCE_RIGHT}", "Right"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "sensors_hat_blocks",
        "tooltip": "%{BKY_SENSORS_US_DETECT_OBSTACLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensors_USdetectObstacle_simple",
        "message0": "%{BKY_SENSORS_US_DETECT_OBSTACLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_SENSORS_ISDETECTED}", "is"],
                ["%{BKY_SENSORS_ISNTTOUCHED}", "isnt"],
            ]
        },
        {
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        },
        {
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_SENSORS_GET_DISTANCE_LEFT}", "Left"],
                ["%{BKY_SENSORS_GET_DISTANCE_RIGHT}", "Right"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_US_DETECT_OBSTACLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensors_getDistance",
        "message0": "%{BKY_SENSORS_GET_DISTANCE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_SENSORS_GET_DISTANCE_LEFT}", "Left"],
                ["%{BKY_SENSORS_GET_DISTANCE_RIGHT}", "Right"],
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_DISTANCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensors_ToFdetectObstacle",
        "message0": "%{BKY_SENSORS_TOF_DETECT_OBSTACLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_SENSORS_ISDETECTED}", "is"],
                ["%{BKY_SENSORS_ISNTTOUCHED}", "isnt"],
            ]
        },
        {
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        },
        {
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_SENSORS_GET_LIGHT_LEFT}", "FrontRight"],
                ["%{BKY_SENSORS_GET_LIGHT_RIGHT}", "FrontLeft"],
                ["%{BKY_SENSORS_GET_LIGHT_FRONT}", "FrontMiddle"],
                ["%{BKY_SENSORS_GET_LIGHT_BACK}", "Back"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "sensors_hat_blocks",
        "tooltip": "%{BKY_SENSORS_TOF_DETECT_OBSTACLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_ToFdetectObstacle_simple",
        "message0": "%{BKY_SENSORS_TOF_DETECT_OBSTACLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_SENSORS_ISDETECTED}", "is"],
                ["%{BKY_SENSORS_ISNTTOUCHED}", "isnt"],
            ]
        },
        {
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        },
        {
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_SENSORS_GET_LIGHT_LEFT}", "FrontRight"],
                ["%{BKY_SENSORS_GET_LIGHT_RIGHT}", "FrontLeft"],
                ["%{BKY_SENSORS_GET_LIGHT_FRONT}", "FrontMiddle"],
                ["%{BKY_SENSORS_GET_LIGHT_BACK}", "Back"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_TOF_DETECT_OBSTACLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_getLight",
        "message0": "%{BKY_SENSORS_GET_LIGHT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_SENSORS_GET_LIGHT_LEFT}", "FrontLeft"],
                ["%{BKY_SENSORS_GET_LIGHT_RIGHT}", "FrontRight"],
                ["%{BKY_SENSORS_GET_LIGHT_FRONT}", "FrontMiddle"],
                ["%{BKY_SENSORS_GET_LIGHT_BACK}", "Back"],
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_LIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_onHeadTouchSensorsTouched",
        "message0": "%{BKY_SENSORS_ONHEADTOUCHSENSORSTOUCHED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_SENSORS_HEAD_TOUCH_SENSORS_TOP}", "Top"],
                ["%{BKY_SENSORS_HEAD_TOUCH_SENSORS_LEFT}", "Left"],
                ["%{BKY_SENSORS_HEAD_TOUCH_SENSORS_RIGHT}", "Right"]
            ]
        }, 
        {
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_SENSORS_ISTOUCHED}", "is_touched"],
                ["%{BKY_SENSORS_ISNTTOUCHED}", "isnt_touched"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "sensors_hat_blocks",
        "tooltip": "%{BKY_SENSORS_ONHEADTOUCHSENSORSTOUCHED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_headTouchSensors",
        "message0": "%{BKY_SENSORS_HEAD_TOUCH_SENSORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_SENSORS_HEAD_TOUCH_SENSORS_TOP}", "Top"],
                ["%{BKY_SENSORS_HEAD_TOUCH_SENSORS_LEFT}", "Left"],
                ["%{BKY_SENSORS_HEAD_TOUCH_SENSORS_RIGHT}", "Right"]
            ]
        }],
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_HEAD_TOUCH_SENSORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_onBodyTouchSensorsTouched",
        "message0": "%{BKY_SENSORS_ONBODYTOUCHSENSORSTOUCHED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_SENSORS_BODY_TOUCH_SENSORS_TORSO}", "Torso"],
                ["%{BKY_SENSORS_BODY_TOUCH_SENSORS_LEFT}", "LeftShoulder"],
                ["%{BKY_SENSORS_BODY_TOUCH_SENSORS_RIGHT}", "RightShoulder"]
            ]
        }, 
        {
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_SENSORS_ISTOUCHED}", "is_touched"],
                ["%{BKY_SENSORS_ISNTTOUCHED}", "isnt_touched"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "sensors_hat_blocks",
        "tooltip": "%{BKY_SENSORS_ONBODYTOUCHSENSORSTOUCHED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_bodyTouchSensors",
        "message0": "%{BKY_SENSORS_BODY_TOUCH_SENSORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_SENSORS_BODY_TOUCH_SENSORS_TORSO}", "Torso"],
                ["%{BKY_SENSORS_BODY_TOUCH_SENSORS_LEFT}", "LeftShoulder"],
                ["%{BKY_SENSORS_BODY_TOUCH_SENSORS_RIGHT}", "RightShoulder"]
            ]
        }],
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_BODY_TOUCH_SENSORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_onFaceTouchSensorsTouched",
        "message0": "%{BKY_SENSORS_ONFACETOUCHSENSORSTOUCHED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_SENSORS_FACE_TOUCH_SENSORS_LEFT_EYE}", "LEFT_EYE"],
                ["%{BKY_SENSORS_FACE_TOUCH_SENSORS_RIGHT_EYE}", "RIGHT_EYE"],
                ["%{BKY_SENSORS_FACE_TOUCH_SENSORS_MOUTH}", "MOUTH"],
                ["%{BKY_SENSORS_FACE_TOUCH_SENSORS_FACE}", "FACE"]
            ]
        }, 
        {
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_SENSORS_ISTOUCHED}", "is_touched"],
                ["%{BKY_SENSORS_ISNTTOUCHED}", "isnt_touched"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "sensors_hat_blocks",
        "tooltip": "%{BKY_SENSORS_ONFACETOUCHSENSORSTOUCHED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_faceTouchSensors",
        "message0": "%{BKY_SENSORS_FACE_TOUCH_SENSORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_SENSORS_FACE_TOUCH_SENSORS_LEFT_EYE}", "LEFT_EYE"],
                ["%{BKY_SENSORS_FACE_TOUCH_SENSORS_RIGHT_EYE}", "RIGHT_EYE"],
                ["%{BKY_SENSORS_FACE_TOUCH_SENSORS_MOUTH}", "MOUTH"],
                ["%{BKY_SENSORS_FACE_TOUCH_SENSORS_FACE}", "FACE"]
            ]
        }],
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_FACE_TOUCH_SENSORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_getBatteryLevel",
        "message0": "%{BKY_SENSORS_GET_BATTERY_LEVEL_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_BATTERY_LEVEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensors_isCharging",
        "message0": "%{BKY_SENSORS_IS_CHARGING_TITLE}",
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_IS_CHARGING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensors_getAmbiantSound",
        "message0": "%{BKY_SENSORS_GET_AMBIANT_SOUND_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_AMBIANT_SOUND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensors_getSoundLocalisation",
        "message0": "%{BKY_SENSORS_GET_SOUND_LOCALISATION_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_SOUND_LOCALISATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensors_getTriggerScore",
        "message0": "%{BKY_SENSORS_GET_TRIGGER_SCORE_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_TRIGGER_SCORE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensors_getBodyAcc",
        "message0": "%{BKY_SENSORS_GET_BODY_ACC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["%{BKY_SENSORS_GET_BODY_ACC_X}", "X"],
                ["%{BKY_SENSORS_GET_BODY_ACC_Y}", "Y"],
                ["%{BKY_SENSORS_GET_BODY_ACC_Z}", "Z"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_BODY_ACC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensors_getBodyGyr",
        "message0": "%{BKY_SENSORS_GET_BODY_GYR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["%{BKY_SENSORS_GET_BODY_GYR_X}", "X"],
                ["%{BKY_SENSORS_GET_BODY_GYR_Y}", "Y"],
                ["%{BKY_SENSORS_GET_BODY_GYR_Z}", "Z"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_BODY_GYR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensors_getHeadAcc",
        "message0": "%{BKY_SENSORS_GET_HEAD_ACC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["%{BKY_SENSORS_GET_HEAD_ACC_X}", "X"],
                ["%{BKY_SENSORS_GET_HEAD_ACC_Y}", "Y"],
                ["%{BKY_SENSORS_GET_HEAD_ACC_Z}", "Z"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_HEAD_ACC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensors_getHeadGyr",
        "message0": "%{BKY_SENSORS_GET_HEAD_GYR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["%{BKY_SENSORS_GET_HEAD_GYR_X}", "X"],
                ["%{BKY_SENSORS_GET_HEAD_GYR_Y}", "Y"],
                ["%{BKY_SENSORS_GET_HEAD_GYR_Z}", "Z"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_HEAD_GYR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensors_colorDetect",
        "message0": "%{BKY_SENSORS_COLOR_DETECT_TITLE}",
        "output": "String",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_COLOR_DETECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
]); // END JSON EXTRACT (Do not delete this comment.)