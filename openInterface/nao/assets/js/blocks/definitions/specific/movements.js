/**
 * @fileoverview Movements blocks for Nao.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "movements_hand",
        "message0": "%{BKY_MOVEMENTS_HAND_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_MOVEMENTS_OPEN_HAND}", "openHand"],
                    ["%{BKY_MOVEMENTS_CLOSE_HAND}", "closeHand"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "HAND",
                "options": [
                    ["%{BKY_MOVEMENTS_LEFT_HAND}", "LHand"],
                    ["%{BKY_MOVEMENTS_RIGHT_HAND}", "RHand"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_MOVEMENTS_HAND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "movements_moveTo",
        "message0": "%{BKY_MOVEMENTS_MOVE_TO_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_MOVEMENTS_MOVE_TO_FORWARD}", "forward"],
                    ["%{BKY_MOVEMENTS_MOVE_TO_BACKWARD}", "backward"]
                ]
            },
            {
                "type": "input_value",
                "name": "DISTANCE",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_MOVEMENTS_HAND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "movements_rotate",
        "message0": "%{BKY_MOVEMENTS_ROTATE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_MOVEMENTS_ROTATE_LEFT}", "left"],
                    ["%{BKY_MOVEMENTS_ROTATE_RIGHT}", "right"]
                ]
            },
            {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_MOVEMENTS_ROTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "movements_moveToXY",
        "message0": "%{BKY_MOVEMENTS_MOVE_TO_XY_TITLE}",
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
                "name": "THETA",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_MOVEMENTS_MOVE_TO_XY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "movements_goToPosture",
        "message0": "%{BKY_MOVEMENTS_GO_TO_POSTURE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "POSTURE",
                "options": [
                    ["%{BKY_MOVEMENTS_STAND_POSTURE}", "Stand"],
                    ["%{BKY_MOVEMENTS_SIT_POSTURE}", "Crouch"]
                ]
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_MOVEMENTS_GO_TO_POSTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "movements_poseMode",
        "message0": "%{BKY_MOVEMENTS_POSE_MODE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "POSE",
                "options": [
                    ["%{BKY_MOVEMENTS_POSE_MODE_YEAH}", "Yeah"],
                    ["%{BKY_MOVEMENTS_POSE_MODE_HANDSONHIPS}", "HandsOnhips"],
                    ["%{BKY_MOVEMENTS_POSE_MODE_SCANNINGHORIZON}", "ScanningHorizon"],
                    ["%{BKY_MOVEMENTS_POSE_MODE_RELAXED}", "Relaxed"],
                    ["%{BKY_MOVEMENTS_POSE_MODE_TPOSE}", "TPose"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_MOVEMENTS_POSE_MODE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "movements_angleInterpolationWithSpeed_1",
        "message0": "%{BKY_MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_1_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "JOINT",
                "options": [
                    ["%{BKY_MOVEMENTS_L_SHOULDER_JOINT}", "LShoulder"],
                    ["%{BKY_MOVEMENTS_R_SHOULDER_JOINT}", "RShoulder"],
                    ["%{BKY_MOVEMENTS_L_ANKLE_JOINT}", "LAnkle"],
                    ["%{BKY_MOVEMENTS_R_ANKLE_JOINT}", "RAnkle"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "ROTATION",
                "options": [
                    ["%{BKY_MOVEMENTS_PITCH}", "Pitch"],
                    ["%{BKY_MOVEMENTS_ROLL}", "Roll"]
                ]
            },
            {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "movements_angleInterpolationWithSpeed_2",
        "message0": "%{BKY_MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_1_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "JOINT",
                "options": [
                    ["%{BKY_MOVEMENTS_HEAD_JOINT}", "HeadYaw"],
                    ["%{BKY_MOVEMENTS_L_ELBOW_JOINT}", "LElbow"],
                    ["%{BKY_MOVEMENTS_R_ELBOW_JOINT}", "RElbow"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "ROTATION",
                "options": [
                    ["%{BKY_MOVEMENTS_YAW}", "Yaw"],
                    ["%{BKY_MOVEMENTS_ROLL}", "Roll"]
                ]
            },
            {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "movements_angleInterpolationWithSpeed_3",
        "message0": "%{BKY_MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_1_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "JOINT",
                "options": [
                    ["%{BKY_MOVEMENTS_L_HIP_JOINT}", "LHip"],
                    ["%{BKY_MOVEMENTS_R_HIP_JOINT}", "RHip"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "ROTATION",
                "options": [
                    ["%{BKY_MOVEMENTS_YAW}", "Yaw"],
                    ["%{BKY_MOVEMENTS_PITCH}", "Pitch"],
                    ["%{BKY_MOVEMENTS_YAW&PITCH}", "YawPitch"]
                ]
            },
            {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "movements_angleInterpolationWithSpeed_4",
        "message0": "%{BKY_MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_4_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "JOINT",
                "options": [
                    ["%{BKY_MOVEMENTS_L_KNEE_JOINT}", "LKneePitch"],
                    ["%{BKY_MOVEMENTS_R_KNEE_JOINT}", "RKneePitch"]
                ]
            },
            {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "movements_angleInterpolationWithSpeed_5",
        "message0": "%{BKY_MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_4_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "JOINT",
                "options": [
                    ["%{BKY_MOVEMENTS_L_WRIST_JOINT}", "LWristYaw"],
                    ["%{BKY_MOVEMENTS_R_WRIST_JOINT}", "RWristYaw"]
                ]
            },
            {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }, 
    {
        "type": "movements_setAnglesArmes_radians",
        "message0": "%{BKY_MOVEMENTS_SET_ANGLES_UPPER_BODY_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "HEAD_YAW",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "HEAD_PITCH",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "L_SHOULDER_PITCH",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "L_SHOULDER_ROLL",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "L_ELBOW_ROLL",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "L_ELBOW_YAW",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "L_WRIST_YAW",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "L_HAND",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "R_SHOULDER_PITCH",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "R_SHOULDER_ROLL",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "R_ELBOW_ROLL",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "R_ELBOW_YAW",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "R_WRIST_YAW",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "R_HAND",
                "check": "Number"
            }, 
            
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_MOVEMENTS_SET_ANGLES_UPPER_BODY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "movements_setAnglesArmes_degres",
        "message0": "%{BKY_MOVEMENTS_SET_ANGLES_UPPER_BODY_DEGRES_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "HEAD_YAW",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "HEAD_PITCH",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "L_SHOULDER_PITCH",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "L_SHOULDER_ROLL",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "L_ELBOW_ROLL",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "L_ELBOW_YAW",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "L_WRIST_YAW",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "L_HAND",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "R_SHOULDER_PITCH",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "R_SHOULDER_ROLL",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "R_ELBOW_ROLL",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "R_ELBOW_YAW",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "R_WRIST_YAW",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "R_HAND",
                "check": "Number"
            }, 
            
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_MOVEMENTS_SET_ANGLES_UPPER_BODY_DEGRES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
]);