/**
 * @fileoverview Sensors blocks for Nao.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "sensors_tactilTouched",
        "message0": "%{BKY_SENSORS_TACTIL_TOUCHED_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SENSOR_SIDE",
                "options": [
                    ["%{BKY_SENSORS_FRONT_TACTIL}", "Front"],
                    ["%{BKY_SENSORS_MIDDLE_TACTIL}", "Middle"],
                    ["%{BKY_SENSORS_REAR_TACTIL}", "Rear"],
                    ["%{BKY_SENSORS_ALL_TACTIL}", ""]
                ]
            }
        ],
        "output": "Boolean",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_TACTIL_TOUCHED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_handTouched",
        "message0": "%{BKY_SENSORS_HAND_TOUCHED_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SENSOR_SIDE",
                "options": [
                    ["%{BKY_SENSORS_LEFT}", "Left"],
                    ["%{BKY_SENSORS_RIGHT}", "Right"],
                    ["%{BKY_SENSORS_Back}", "Back"],
                    ["%{BKY_SENSORS_All}", ""]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "HAND_SIDE",
                "options": [
                    ["%{BKY_SENSORS_LEFT_HAND}", "Left"],
                    ["%{BKY_SENSORS_RIGHT_HAND}", "Right"]
                ]
            }
        ],
        "output": "Boolean",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_HAND_TOUCHED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_bumperPressed",
        "message0": "%{BKY_SENSORS_BUMPER_PRESSED_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SENSOR_SIDE",
                "options": [
                    ["%{BKY_SENSORS_BUMPER_LEFT}", "Left"],
                    ["%{BKY_SENSORS_BUMPER_RIGHT}", "Right"],
                    ["%{BKY_SENSORS_BUMPER_ALL}", ""]
                ]
            }
        ],
        "output": "Boolean",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_BUMPER_PRESSED_TOOLTIP}",
       "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_sonarDetection",
        "message0": "%{BKY_SENSORS_SONAR_DETECTION_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "IS_DETECTED",
                "options": [
                    ["%{BKY_SENSORS_SONAR_DETECTED}", "Detected"],
                    ["%{BKY_SENSORS_SONAR_NOTHING}", "NothingDetected"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "SENSOR_SIDE",
                "options": [
                    ["%{BKY_SENSORS_LEFT}", "Left"],
                    ["%{BKY_SENSORS_RIGHT}", "Right"]
                ]
            }
        ],
        "output": "Boolean",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_SONAR_DETECTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_getBatteryCharge",
        "message0": "%{BKY_SENSORS_GET_BATTERY_CHARGE_TITLE}",
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_BATTERY_CHARGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)