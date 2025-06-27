/**
 * @fileoverview actuators (conveyor) blocks for Niryo.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "niryo_actuator_set_conveyor",
        "message0": "%{BKY_NIRYO_ACTUATOR_SET_CONVEYOR_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "CONVEYOR",
                "options": [
                    ["%{BKY_NIRYO_ACTUATOR_CONVEYOR_1}", "1"],
                    ["%{BKY_NIRYO_ACTUATOR_CONVEYOR_2}", "2"]
                ]
            },
        ],
        "output": "Number",
        "style": "actuators_blocks",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_NIRYO_ACTUATOR_SET_CONVEYOR_TOOLTIP}",
    },
    {
        "type": "niryo_actuator_set_conveyor_speed",
        "message0": "%{BKY_NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "CONVEYORID",
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_DIRECTION_FORWARD}", "ConveyorDirection.FORWARD"],
                    ["%{BKY_NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_DIRECTION_BACKWARD}", "ConveyorDirection.BACKWARD"]
                ]
            }
        ],
        "inputsInline": false,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_TOOLTIP}",
    },
    {
        "type": "niryo_actuator_stop_conveyor",
        "message0": "%{BKY_NIRYO_ACTUATOR_STOP_CONVEYOR_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "CONVEYORID",
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_NIRYO_ACTUATOR_STOP_CONVEYOR_TOOLTIP}",
        
    },
    {
        "type": "niryo_actuator_convoyer_IR_sensor",
        "message0": "%{BKY_NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "IRSENSOR",
                "options": [
                    ["%{BKY_NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_HIGH}", "PinState.HIGH"],
                    ["%{BKY_NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_LOW}", "PinState.LOW"]
                ]
            },
        ],
        "output": "Boolean",
        "style": "actuators_blocks",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_TOOLTIP}",
    }


]); // END JSON EXTRACT