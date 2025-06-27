/**
 * @fileoverview Robots blocks for ESP32.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Begin Ilo blocks */

    // BLOCK ILO SET LED COLOR
    {
        "type": "robots_setLedColor",
        "message0": "%{BKY_ROBOTS_ILO_SET_LED_COLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_SET_LED_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO SET LED COLOR RGB
    {
        "type": "robots_setLedColorRGB",
        "message0": "%{BKY_ROBOTS_ILO_SET_LED_COLOR_RGB_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_SET_LED_COLOR_RGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO SET LED SHAPE
    {
        "type": "robots_setLedShape",
        "message0": "%{BKY_ROBOTS_ILO_SET_LED_SHAPE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SHAPE",
            "options": [
                ["⬆️", "front"],
                ["⬇️", "back"],
                ["⬅️", "left"],
                ["➡️", "right"],
                ["↻", "rot_clock"],
                ["↺", "rot_trigo"],
                ["❌", "stop"],
                ["▶️", "play"],
                ["⏸️", "pause"],
                ["🙂", "smiley"],
                ["0️⃣", "10"],
                ["1️⃣", "11"],
                ["2️⃣", "12"],
                ["3️⃣", "13"],
                ["4️⃣", "14"],
                ["5️⃣", "15"],
                ["6️⃣", "16"],
                ["7️⃣", "17"],
                ["8️⃣", "18"],
                ["9️⃣", "19"],
                ["ring_1", "ring_1"],
                ["ring_2", "ring_2"],
                ["ring_3", "ring_3"],
                ["ring_4", "ring_4"],
                ["ring_5", "ring_5"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_SET_LED_SHAPE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO SET LED ANIM
    {
        "type": "robots_setLedAnim",
        "message0": "%{BKY_ROBOTS_ILO_SET_LED_ANIM_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ANIM",
            "options": [
                ["%{BKY_ROBOTS_ILO_WAVE}", "wave"],
                ["circle_stars", "circle_stars"],
                ["auto_distance", "auto_distance"],
                ["circle_rot", "circle_rot"],
                ["check_auto", "check_auto"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_SET_LED_ANIM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO SET LED SINGLE
    {
        "type": "robots_setLedSingle",
        "message0": "%{BKY_ROBOTS_ILO_SET_LED_SINGLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_ROBOTS_ILO_MATRIX}", "center"],
                ["%{BKY_ROBOTS_ILO_CIRCLE}", "circle"],
            ]
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_SET_LED_SINGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO MOVE
    {
        "type": "robots_moveIlo",
        "message0": "%{BKY_ROBOTS_ILO_MOVE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_ILO_MOVE_FRONT}", "front"],
                ["%{BKY_ROBOTS_ILO_MOVE_BACK}", "back"],
                ["%{BKY_ROBOTS_ILO_MOVE_RIGHT}", "right"],
                ["%{BKY_ROBOTS_ILO_MOVE_LEFT}", "left"],
                ["%{BKY_ROBOTS_ILO_MOVE_ROT_TRIGO}", "rot_trigo"],
                ["%{BKY_ROBOTS_ILO_MOVE_ROT_CLOCK}", "rot_clock"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_MOVE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO MOVE BY STEPS
    {
        "type": "robots_moveIloBySteps",
        "message0": "%{BKY_ROBOTS_ILO_MOVE_BY_STEPS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_ILO_MOVE_FRONT}", "front"],
                ["%{BKY_ROBOTS_ILO_MOVE_BACK}", "back"],
                ["%{BKY_ROBOTS_ILO_MOVE_RIGHT}", "right"],
                ["%{BKY_ROBOTS_ILO_MOVE_LEFT}", "left"],
                ["%{BKY_ROBOTS_ILO_MOVE_ROT_TRIGO}", "rot_trigo"],
                ["%{BKY_ROBOTS_ILO_MOVE_ROT_CLOCK}", "rot_clock"]
            ]
        }, {
            "type": "input_value",
            "name": "STEPS",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_MOVE_BY_STEPS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_finish_state_init_extension"
        ],
        "mutator": "robots_finish_state_mutator"
    },

    // BLOCK ILO ROTATE
    {
        "type": "robots_rotateIlo",
        "message0": "%{BKY_ROBOTS_ILO_ROTATE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "rot_clock"],
                ["↺", "rot_trig"]
            ]
        }, {
            "type": "input_value",
            "name": "DEG",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_ROTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_finish_state_init_extension"
        ],
        "mutator": "robots_finish_state_mutator"
    },

    // BLOCK ILO MOVE ILO MOTOR
    {
        "type": "robots_moveIloMotor",
        "message0": "%{BKY_ROBOTS_ILO_MOVE_MOTOR_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "MOTOR",
                "options": [
                    ["%{BKY_ROBOTS_ILO_FRONT_LEFT}", "front_left"],
                    ["%{BKY_ROBOTS_ILO_FRONT_RIGHT}", "front_right"],
                    ["%{BKY_ROBOTS_ILO_BACK_LEFT}", "back_left"],
                    ["%{BKY_ROBOTS_ILO_BACK_RIGHT}", "back_right"]
                ]
            }, {
                "type": "field_grid_dropdown",
                "name": "DIR",
                "options": [
                    ["↻", "rot_clock"],
                    ["↺", "rot_trig"]
                ]
            }, {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_MOVE_MOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO SET ACC
    {
        "type": "robots_setIloAcc",
        "message0": "%{BKY_ROBOTS_ILO_SET_ACC_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ACC",
                "check": "Number"
            }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_SET_ACC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO SET TEMPO
    {
        "type": "robots_setIloTempo",
        "message0": "%{BKY_ROBOTS_ILO_SET_TEMPO_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "TEMPO",
                "check": "Number"
            }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_SET_TEMPO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO MOVE ONE SQUARE FORWARD
    {
        "type": "robots_moveOneSquareForwardIlo",
        "message0": "%{BKY_ROBOTS_ILO_MOVE_ONE_SQUARE_FORWARD_TITLE}",
        "inputsInline": true,        "inputsInline": true,

        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_MOVE_ONE_SQUARE_FORWARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_finish_state_init_extension"
        ],
        "mutator": "robots_finish_state_mutator"
    },

    // BLOCK ILO MOVE ONE SQUARE BACKWARD
    {
        "type": "robots_moveOneSquareBackwardIlo",
        "message0": "%{BKY_ROBOTS_ILO_MOVE_ONE_SQUARE_BACKWARD_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_MOVE_ONE_SQUARE_BACKWARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_finish_state_init_extension"
        ],
        "mutator": "robots_finish_state_mutator"
    },

    // BLOCK ILO TURN LEFT
    {
        "type": "robots_turnLeftIlo",
        "message0": "%{BKY_ROBOTS_ILO_TURN_LEFT_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_TURN_LEFT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_finish_state_init_extension"
        ],
        "mutator": "robots_finish_state_mutator"
    },

    // BLOCK ILO TURN RIGHT
    {
        "type": "robots_turnRightIlo",
        "message0": "%{BKY_ROBOTS_ILO_TURN_RIGHT_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_TURN_RIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "robots_finish_state_init_extension"
        ],
        "mutator": "robots_finish_state_mutator"
    },

    // BLOCK ILO STOP ROBOT
    {
        "type": "robots_stopRobotIlo",
        "message0": "%{BKY_ROBOTS_ILO_STOP_ROBOT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_STOP_ROBOT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO GET DISTANCE
    {
        "type": "robots_getDistanceIlo",
        "message0": "%{BKY_ROBOTS_ILO_GET_DISTANCE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_ILO_FRONT}", "front"],
                ["%{BKY_ROBOTS_ILO_BACK}", "back"],
                ["%{BKY_ROBOTS_ILO_RIGHT}", "right"],
                ["%{BKY_ROBOTS_ILO_LEFT}", "left"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_GET_DISTANCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO LINE DETECTOR 
    {
        "type": "robots_lineDetectorIlo",
        "message0": "%{BKY_ROBOTS_ILO_LINE_DETECTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SIDE",
            "options": [
                ["%{BKY_ROBOTS_ILO_LINE_DETECTOR_RIGHT}", "right"],
                ["%{BKY_ROBOTS_ILO_LINE_DETECTOR_LEFT}", "left"],
                ["%{BKY_ROBOTS_ILO_LINE_DETECTOR_MIDDLE}", "center"]
            ]
        }],
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_LINE_DETECTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO LINE DETECTOR THRESHOLD
    {
        "type": "robots_setLineDetectorThresholdIlo",
        "message0": "%{BKY_ROBOTS_ILO_SET_LINE_DETECTOR_THRESHOLD_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "THRESHOLD",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_SET_LINE_DETECTOR_THRESHOLD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO COLOR DETECTOR 
    {
        "type": "robots_colorDetectorIlo",
        "message0": "%{BKY_ROBOTS_ILO_COLOR_DETECTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SIDE",
            "options": [
                ["%{BKY_ROBOTS_ILO_LINE_DETECTOR_RIGHT}", "right"],
                ["%{BKY_ROBOTS_ILO_LINE_DETECTOR_LEFT}", "left"],
                ["%{BKY_ROBOTS_ILO_LINE_DETECTOR_MIDDLE}", "center"]
            ]
        }],
        "output": "Array",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_COLOR_DETECTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO COLOR DETECTOR RGB
    {
        "type": "robots_colorDetectorRGBIlo",
        "message0": "%{BKY_ROBOTS_ILO_COLOR_DETECTOR_RGB_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "COLOR",
            "options": [
                ["%{BKY_ROBOTS_ILO_RED}", "0"],
                ["%{BKY_ROBOTS_ILO_GREEN}", "1"],
                ["%{BKY_ROBOTS_ILO_BLUE}", "2"]
            ]
        },
        {
            "type": "field_grid_dropdown",
            "name": "SIDE",
            "options": [
                ["%{BKY_ROBOTS_ILO_LINE_DETECTOR_RIGHT}", "right"],
                ["%{BKY_ROBOTS_ILO_LINE_DETECTOR_LEFT}", "left"],
                ["%{BKY_ROBOTS_ILO_LINE_DETECTOR_MIDDLE}", "center"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_COLOR_DETECTOR_RGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO GET LUMINOSITY
    {
        "type": "robots_getLuminosityIlo",
        "message0": "%{BKY_ROBOTS_ILO_GET_LUMINOSITY_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SIDE",
            "options": [
                ["%{BKY_ROBOTS_ILO_LINE_DETECTOR_RIGHT}", "right"],
                ["%{BKY_ROBOTS_ILO_LINE_DETECTOR_LEFT}", "left"],
                ["%{BKY_ROBOTS_ILO_LINE_DETECTOR_MIDDLE}", "center"],
                ["%{BKY_ROBOTS_ILO_LINE_DETECTOR_ALL}", "all"],
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_GET_LUMINOSITY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ILO GET INTERNAL SENSORS
    {
        "type": "robots_getInternalSensors",
        "message0": "%{BKY_ROBOTS_ILO_GET_INTERNAL_SENSORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SENSOR",
            "options": [
                ["%{BKY_ROBOTS_ILO_ROLL}", "roll"],
                ["%{BKY_ROBOTS_ILO_PITCH}", "pitch"],
                ["%{BKY_ROBOTS_ILO_YAW}", "yaw"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_ILO_GET_INTERNAL_SENSORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }

]);

Blockly.Constants.Robots = Object.create(null);

Blockly.Constants.Robots.ROBOTS_FINISH_STATE_INIT_EXTENSION = function () {
    this.finish_state_ = false;
    this.update_(this.updateField_);
};

/**
 * Mixin for mutator functions in the 'communication_serialWrite' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Robots.ROBOTS_FINISH_STATE_MUTATOR_MIXIN = {
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('finish_state', this.finish_state_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        const value = xmlElement.getAttribute('finish_state');
        this.finish_state_ = (value !== 'false');
        this.update_(this.updateField_);
    },
    addOptions_: function () {
        this.finish_state_ = true;
        this.update_(this.updateField_);
    },
    removeOptions_: function () {
        this.finish_state_ = false;
        this.update_(this.updateField_);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function () {
        const remove = () => {
            this.removeOptions_();
        };
        const add = () => {
            this.addOptions_();
        };
        // Remove buttons
        if (this.getInput('TOP')) this.removeInput('TOP');
        // Update inputs
        const top = this.appendDummyInput('TOP');
        if (!this.getInput("FINISH_STATE_FIELD") && this.finish_state_) {
            this.appendDummyInput("FINISH_STATE_FIELD")
                .appendField(Blockly.Msg['ROBOTS_ILO_FINISH_STATE'])
                .appendField(
                    new Blockly.FieldDropdown([
                        ["%{BKY_ROBOTS_ILO_FINISH_STATE_NO}", "FALSE"],
                        ["%{BKY_ROBOTS_ILO_FINISH_STATE_YES}", "TRUE"]
                    ]), "FINISH_STATE"
                )
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", remove, false));
        } else {
            if (this.getInput("FINISH_STATE_FIELD")) {
                this.removeInput("FINISH_STATE_FIELD");
            }
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", add, false));
        }
    },
    
    update_: function (update) {
        return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
    }
};

Blockly.Extensions.register("robots_finish_state_init_extension",
    Blockly.Constants.Robots.ROBOTS_FINISH_STATE_INIT_EXTENSION);

Blockly.Extensions.registerMutator("robots_finish_state_mutator",
    Blockly.Constants.Robots.ROBOTS_FINISH_STATE_MUTATOR_MIXIN);
