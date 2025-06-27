/**
 * @fileoverview Sensors blocks for Thymio.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    {
        "type": "sensors_read_obstacle",
        "message0": "%{BKY_SENSORS_READ_OBSTACLE_TITLE}",
        "args0" : [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_SENSORS_GET_PROXIMITY_FRONT_LEFT}","0"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_FRONT_LEFT_CENTRAL}","1"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_FRONT_CENTRAL}","2"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_FRONT_RIGHT_CENTRAL}","3"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_FRONT_RIGHT}","4"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_BACK_LEFT}","5"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_BACK_RIGHT}","6"],
                ]
            },
            {
                "type": "field_dropdown",
                "name": "OPERATOR",
                "options": [
                    ["%{BKY_SENSORS_GET_PROXIMITY_DETECT_TRUE}","> 2000"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_DETECT_FALSE}","< 1000"],
                ]
            }
        ],
        "output": "Boolean",
        "tooltip": "%{BKY_SENSORS_READ_OBSTACLE_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "sensors_get_line",
        "message0": "%{BKY_SENSORS_GET_LINE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_SENSORS_GET_LINE_LEFT}","0"],
                    ["%{BKY_SENSORS_GET_LINE_RIGHT}","1"],
                    ["%{BKY_SENSORS_GET_LINE_BOTH}","2"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "VALUE",
                "options": [
                    ["%{BKY_SENSORS_GET_LINE_BLACK}","black"],
                    ["%{BKY_SENSORS_GET_LINE_WHITE}","white"],
                    ["%{BKY_SENSORS_GET_LINE_SOMETHING}","something"],
                    ["%{BKY_SENSORS_GET_LINE_NOTHING}","nothing"],
                ]
            }
        ],
        "output": "Boolean",
        "tooltip": "%{BKY_SENSORS_GET_LINE_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]

    },
      // Bloc permettant le suivi de ligne
    {
        "type": "sensors_follow_line",
        "message0": "%{BKY_ROBOT_FOLLOW_LINE_TITLE}",
        "args0": [
            {
                "type": "field_number",
                "name": "TIME",
                "value": 0,
                "min": 1,
                "max": 10,
                "precision": 1
            },
            {
                "type": "field_dropdown",
                "name": "SPEED",
                "options": 
                [
                    ["%{BKY_ROBOT_SPEED_SLOW}","SLOW"],
                    ["%{BKY_ROBOT_SPEED_MEDIUM}","MEDIUM"],
                    ["%{BKY_ROBOT_SPEED_FAST}","FAST"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSORS_READ_OBSTACLE_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // sensor value
    {
        "type": "sensors_get_proximity",
        "message0": "%{BKY_SENSORS_GET_PROXIMITY_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_SENSORS_GET_PROXIMITY_FRONT_LEFT}","0"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_FRONT_LEFT_CENTRAL}","1"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_FRONT_CENTRAL}","2"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_FRONT_RIGHT_CENTRAL}","3"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_FRONT_RIGHT}","4"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_BACK_LEFT}","5"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_BACK_RIGHT}","6"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_GROUND_LEFT}","7"],
                    ["%{BKY_SENSORS_GET_PROXIMITY_GROUND_RIGHT}","8"],
                ]
            }
        ],
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_GET_PROXIMITY_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // motor SPEED
    {
        "type": "sensors_motor_speed",
        "message0": "%{BKY_SENSORS_MOTOR_SPEED_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "MOTOR",
                "options": [
                    ["%{BKY_SENSORS_MOTOR_LEFT}","left_speed"],
                    ["%{BKY_SENSORS_MOTOR_RIGHT}","right_speed"]
                ]
            }
        ],
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_MOTOR_SPEED_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_get_accelerometer",
        "message0": "%{BKY_SENSORS_GET_ACCELEROMETER_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "AXIS",
                "options": [
                    ["x","0"],
                    ["y","1"],
                    ["z","2"]
                ]
            }
        ],
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_GET_ACCELEROMETER_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    //temperature
    {
        "type": "sensors_get_temperature",
        "message0": "%{BKY_SENSORS_GET_TEMPERATURE_TITLE}",
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_GET_TEMPERATURE_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    //microphone level
    {
        "type": "sensors_get_microphone",
        "message0": "%{BKY_SENSORS_GET_MICROPHONE_TITLE}",
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_GET_MICROPHONE_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //ir communication value
    {
        "type": "sensors_get_ir_communication",
        "message0": "%{BKY_SENSORS_GET_IR_COMMUNICATION_TITLE}",
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_GET_IR_COMMUNICATION_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    //ir communication value
    {
        "type": "sensors_get_ir_remote",
        "message0": "%{BKY_SENSORS_GET_IR_REMOTE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "MODE",
                "options": [
                    ["%{BKY_SENSORS_GET_IR_ADRESS}","adress"],
                    ["%{BKY_SENSORS_GET_IR_COMMAND}","command"]
                ]
            }
        ],
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_GET_IR_REMOTE_TOOLTIP}",
        "style": "sensors_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // poximty sensor detection

]);