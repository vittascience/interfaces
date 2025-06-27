/**
 * @fileoverview Sensors blocks for Winky.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "sensors_getGyroAngle",
        "message0": "%{BKY_SENSORS_GET_GYRO_ANGLE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "AXIS",
                "options": [
                    ["%{BKY_SENSORS_GET_GYRO_X}", "x"],
                    ["%{BKY_SENSORS_GET_GYRO_Y}", "y"]
                ]
            }
        ],
        "output": "Number",
        "inputsInline": true,
        "tooltip": "%{BKY_SENSORS_GET_GYRO_ANGLE_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_getGyroDirection",
        "message0": "%{BKY_SENSORS_GET_GYRO_DIRECTION_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "AXIS",
                "options": [
                    ["%{BKY_SENSORS_GET_GYRO_X}", "x"],
                    ["%{BKY_SENSORS_GET_GYRO_Y}", "y"],
                    ["%{BKY_SENSORS_GET_GYRO_Z}", "z"]
                ]
            }
        ],
        "output": "Number",
        "inputsInline": true,
        "tooltip": "%{BKY_SENSORS_GET_GYRO_DIRECTION_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_getProximityDetection",
        "message0": "%{BKY_SENSORS_GET_PROXIMITY_DETECTION_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DISTANCE",
                "options": [
                    ["%{BKY_SENSORS_GET_PROXIMITY_DETECTION_NOTHING}", "0"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_DETECTION_NEAR}", "3"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_DETECTION_FAR}", "2"]
                ]
            }
        ],
        "output": "Boolean",
        "inputsInline": true,
        "tooltip": "%{BKY_SENSORS_GET_PROXIMITY_DETECTION_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_getGestureDetection",
        "message0": "%{BKY_SENSORS_GET_GESTURE_DETECTION_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "MOVEMENT",
                "options": [
                    ["%{BKY_SENSORS_GET_GESTURE_DETECTION_RIGHT}", "1"],
                    ["%{BKY_SENSORS_GET_GESTURE_DETECTION_LEFT}", "2"],
                    ["%{BKY_SENSORS_GET_GESTURE_DETECTION_NONE}", "0"]
                ]
            }
        ],
        "output": "Boolean",
        "inputsInline": true,
        "tooltip": "%{BKY_SENSORS_GET_GESTURE_DETECTION_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_getTouchBtn",
        "message0": "%{BKY_SENSORS_GET_TOUCH_BTN_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "BUTTON",
                "options": [
                    ["%{BKY_SENSORS_GET_TOUCH_BTN_BLUE}", "blue"],
                    ["%{BKY_SENSORS_GET_TOUCH_BTN_PURPLE}", "purple"],
                    ["%{BKY_SENSORS_GET_TOUCH_BTN_RED}", "red"],
                    ["%{BKY_SENSORS_GET_TOUCH_BTN_YELLOW}", "yellow"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "STATE",
                "options": [
                    ["%{BKY_SENSORS_GET_TOUCH_BTN_ONPRESS}", "_onpress"],
                    ["%{BKY_SENSORS_GET_TOUCH_BTN_ONRELEASE}", "_onrelease"],
                    ["%{BKY_SENSORS_GET_TOUCH_BTN_STATE}", ""]
                ]
            }
        ],
        "output": "Boolean",
        "inputsInline": true,
        "tooltip": "%{BKY_SENSORS_GET_TOUCH_BTN_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },
]);