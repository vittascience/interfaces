/**
 * @fileoverview Actuators blocks for BBC micro:bit.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // SERVOMOTEUR _ SET POSITION
    {
        "type": "actuators_setServoAngle",
        "message0": "%{BKY_ACTUATORS_SERVO_SETANGLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PWM_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_SERVO_SETANGLE_TOOLTIP}",
    },

    // CONTINUOUS SERVOMOTEUR _ SET SPEED JSON
    {
        "type": "actuators_continuousServo_setSpeed",
        "message0": "%{BKY_ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↺", "1"],
                ["↻", "-1"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PWM_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TOOLTIP}",
    },

    // MOTOR _ SET UP POWER 
    {
        "type": "actuators_setMotorPower",
        "message0": "%{BKY_ACTUATORS_MOTOR_SETPOWER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "POWER",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PWM_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MOTOR_SETPOWER_TOOLTIP}",
    },

    // FAN _ SET UP POWER 
    {
        "type": "actuators_setFanPower",
        "message0": "%{BKY_ACTUATORS_FAN_SETPOWER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "POWER",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PWM_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_FAN_SETPOWER_TOOLTIP}",
    },

    // BLOCK KITRONIK CONTROL MOTOR
    {
        "type": "actuators_kitronik_controlMotor",
        "message0": "%{BKY_ACTUATORS_KITRONIK_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["%{BKY_ACTUATORS_KITRONIK_MOTOR_BOTH}", "BOTH"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "1"],
                ["↺", "-1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_KITRONIK_CONTROLMOTOR_TOOLTIP}",
    },

    // BLOCK KITRONIK STOP MOTOR
    {
        "type": "actuators_kitronik_stopMotor",
        "message0": "%{BKY_ACTUATORS_KITRONIK_STOPMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["%{BKY_ACTUATORS_KITRONIK_MOTOR_BOTH}", "BOTH"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_KITRONIK_STOPMOTOR_TOOLTIP}",
    },

    // GROVE RELAY _ WRITE DIGITAL
    {
        "type": "actuators_setGroveRelayState",
        "message0": "%{BKY_ACTUATORS_GROVERELAY_CONTROL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_GROVERELAY_CONTROL_TOOLTIP}",
    },

    //Grove MOSFET - ANALOG WRITE STATE
    {
        "type": "actuators_mosfet_setState",
        "message0": "%{BKY_ACTUATORS_MOSFET_SETSTATE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PWM_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MOSFET_SETSTATE_TOOLTIP}",
    },

    //Grove MOSFET - ANALOG WRITE VALUE
    {
        "type": "actuators_mosfet_setPercentValue",
        "message0": "%{BKY_ACTUATORS_MOSFET_SETPERCENTVALUE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PWM_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MOSFET_SETPERCENTVALUE_TOOLTIP}",
    },

    // GROVE VIBRATION MOTOR _ WRITE DIGITAL
    {
        "type": "actuators_setVibrationMotorState",
        "message0": "%{BKY_ACTUATORS_GROVEVIBRATIONMOTOR_CONTROL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_GROVEVIBRATIONMOTOR_CONTROL_TOOLTIP}",
    },

    /* Kitronic Traffic */

    // ACCESS:BIT CONTROL BARRIER
    {
        "type": "actuators_controlAccessBitBarrier",
        "message0": "%{BKY_ACTUATORS_ACCESSBIT_CONTROLBARRIER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ACTION",
            "options": [
                ["%{BKY_ACTUATORS_ACCESSBIT_CONTROLBARRIER_RAISE}", "RAISE"],
                ["%{BKY_ACTUATORS_ACCESSBIT_CONTROLBARRIER_LOWER}", "LOWER"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_ACCESSBIT_CONTROLBARRIER_TOOLTIP}",
    },

    // ACCESS:BIT CONTROL BUZZER
    {
        "type": "actuators_controlAccessBitBuzzer",
        "message0": "%{BKY_ACTUATORS_ACCESSBIT_CONTROLBUZZER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_ACCESSBIT_CONTROLBUZZER_TOOLTIP}",
    },


    /* Begin micropython Music blocks */

    // GROVE BUZZER OR SPEAKER _ PLAY MUSIC
    {
        "type": "actuators_playMusicGroveBuzzer",
        "message0": "%{BKY_ACTUATORS_MUSIC_PLAYMUSIC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MUSIC",
            "options": [
                ["Pirates des Caraïbes", "CARRIBEAN_PIRATES"],
                ["Gamme", "GAMME"],
                ["Star Wars", "SW"],
                ["R2D2", "R2D2"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MUSIC_PLAYMUSIC_TOOLTIP}",
    },

    // MUSIC LIBRARY _ PLAY SONG
    {
        "type": "actuators_music_playSong",
        "message0": "%{BKY_ACTUATORS_MUSIC_PLAYSONG_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SONG",
            "options": [
                ["Beethoven - Dadadadum", "DADADADUM"],
                ["Joplin - Entertainer", "ENTERTAINER"],
                ["Bach - Prelude", "PRELUDE"],
                ["Beethoven - Ode to Joy", "ODE"],
                ["Ringtone", "RINGTONE"],
                ["Funk", "FUNK"],
                ["Blues", "BLUES"],
                ["Happy Birthday", "BIRTHDAY"],
                ["Wagner - Wedding", "WEDDING"],
                ["Chopin - Funeral March", "FUNERAL"],
                ["Wawawawaa", "WAWAWAWAA"],
                ["Jump Up", "JUMP_UP"],
                ["Jump down", "JUMP_DOWN"],
                ["Power Up", "POWER_UP"],
                ["Power Down", "POWER_DOWN"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "LOOP",
            "options": [
                ["%{BKY_ACTUATORS_MUSIC_PLAYSONG_ONCE}", "ONCE"],
                ["%{BKY_ACTUATORS_MUSIC_PLAYSONG_LOOP}", "LOOP"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MUSIC_PLAYSONG_TOOLTIP}",
    },

    // MUSIC LIBRARY _ PLAY NOTES
    {
        "type": "actuators_music_playNotes",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_MUSIC_PLAY_NOTES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "block_buttons_plus_minus"
        ],
        "mutator": "actuators_play_notes_mutator"
    },

    // MUSIC LIBRARY _ NOTE DEFINITION
    {
        "type": "actuators_music_note",
        "message0": "%{BKY_ACTUATORS_MUSIC_NOTE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "NOTE",
            "options": [
                ["%{BKY_NOTE_C}", "c"],
                ["%{BKY_NOTE_C_SHARP}", "c#"],
                ["%{BKY_NOTE_D}", "d"],
                ["%{BKY_NOTE_D_SHARP}", "d#"],
                ["%{BKY_NOTE_E}", "e"],
                ["%{BKY_NOTE_F}", "f"],
                ["%{BKY_NOTE_F_SHARP}", "f#"],
                ["%{BKY_NOTE_G}", "g"],
                ["%{BKY_NOTE_G_SHARP}", "g#"],
                ["%{BKY_NOTE_A}", "a"],
                ["%{BKY_NOTE_A_SHARP}", "a#"],
                ["%{BKY_NOTE_B}", "b"],
                ["%{BKY_MUSIC_SILENCE}", "r"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "OCTAVE",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["8", "8"],
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DURATION",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["8", "8"],
            ]
        }],
        "output": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MUSIC_NOTE_TOOLTIP}",
    },

    // MUSIC LIBRARY _ PLAY FREQUENCY
    {
        "type": "actuators_music_playFrequency",
        "message0": "%{BKY_ACTUATORS_MUSIC_PLAY_FREQUENCY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MUSIC_PLAY_FREQUENCY_TOOLTIP}",
    },

    // MUSIC LIBRARY _ STOP MUSIC
    {
        "type": "actuators_music_stop",
        "message0": "%{BKY_ACTUATORS_MUSIC_STOP_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MUSIC_STOP_TOOLTIP}",
    },

    // MICROBIT _ SET VOLUME
    {
        "type": "actuators_music_setVolume",
        "message0": "%{BKY_ACTUATORS_MUSIC_SETVOLUME_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VOL",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MUSIC_SETVOLUME_TOOLTIP}",
    },

    // MUSIC LIBRARY _ SET TEMPO
    {
        "type": "actuators_music_setTempo",
        "message0": "%{BKY_ACTUATORS_MUSIC_SETTEMPO_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TICKS",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "BPM",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MUSIC_SETTEMPO_TOOLTIP}",
    },

    // MUSIC LIBRARY _ GET TEMPO
    {
        "type": "actuators_music_getTempo",
        "message0": "%{BKY_ACTUATORS_MUSIC_GETTEMPO_TITLE}",
        "output": "Array",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MUSIC_GETTEMPO_TOOLTIP}",
    },

    // KITRONIK ENVIRONMENTAL _ PLAY FREQUENCY
    {
        "type": "actuators_kitronik_playFrequency",
        "message0": "%{BKY_ACTUATORS_KITRONIK_PLAY_FREQUENCY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_KITRONIK_PLAY_FREQUENCY_TOOLTIP}",
    },

    // SPEECH LIBRARY _ SAY SOMETHING
    {
        "type": "actuators_speech_saySomething",
        "message0": "%{BKY_ACTUATORS_SPEECH_SAYSOMETHING_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "PITCH",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_SPEECH_SAYSOMETHING_TOOLTIP}",
    },
    // GROVE ELECTROMAGNET _ WRITE DIGITAL JSON
    {
        "type": "actuators_setElectromagnetState",
        "message0": "%{BKY_ACTUATORS_GROVEELECTROMAGNET_CONTROL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_GROVEELECTROMAGNET_CONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE WATER ATOMIZER _ WRITE DIGITAL JSON
    {
        "type": "actuators_setWaterAtomizerState",
        "message0": "%{BKY_ACTUATORS_GROVEWATERATOMIZATION_CONTROL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_GROVEWATERATOMIZATION_CONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Actuators = Object.create(null);

/**
 * Mixin for mutator functions in the 'actuators_play_notes_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Actuators.ACTUATORS_PLAY_NOTES_MUTATOR_MIXIN = {
    /**
     * Create XML to represent number of data inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the data inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this {Blockly.Block}
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    storeValueConnections_: function () {
        this.valueConnections_ = [];
        for (var i = 0; i < this.itemCount_; i++) {
            this.valueConnections_.push(this.getInput('ADD' + i).connection.targetConnection);
        }
    },
    restoreValueConnections_: function () {
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'ADD' + i);
        }
    },
    addItem_: function () {
        this.storeValueConnections_();
        var update = function () {
            this.itemCount_++;
        };
        this.update_(update);
        this.restoreValueConnections_();
        // Add shadow block
        if (this.itemCount_ > 1) {
            // Find shadow type
            var firstInput = this.getInput('ADD' + 0);
            if (firstInput && firstInput.connection.targetConnection) {
                // Create a new shadow DOM with the same type as the first input
                // but with an empty default value
                var newInput = this.getInput('ADD' + (this.itemCount_ - 1));
                var shadowInputDom = firstInput.connection.getShadowDom();
                if (shadowInputDom) {
                    var shadowDom = Blockly.utils.xml.createElement('shadow');
                    var shadowInputType = shadowInputDom.getAttribute('type');
                    shadowDom.setAttribute('type', shadowInputType);
                    if (shadowDom) {
                        shadowDom.setAttribute('id', Blockly.utils.genUid());
                        newInput.connection.setShadowDom(shadowDom);
                        newInput.connection.respawnShadow_();
                    }
                }
            }
        }
    },
    removeItem_: function () {
        this.storeValueConnections_();
        var update = function () {
            this.itemCount_--;
        };
        this.update_(update);
        this.restoreValueConnections_();
    },
    update_: function (update) {
        return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateShape_: function () {
        var that = this;
        var remove = function () {
            that.removeItem_();
        };
        var add = function () {
            that.addItem_();
        };
        // Remove all inputs
        if (this.getInput('TOP')) this.removeInput('TOP');
        var i = 0;
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
        // Update inputs
        var top = this.appendDummyInput('TOP');
        top.appendField(Blockly.Msg['ACTUATORS_MUSIC_PLAY_NOTES_TITLE']);
        top.appendField(new Blockly.FieldDropdown(Blockly.Constants.Pins.MICROBIT_PINS), "PIN");
        top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
        if (this.itemCount_ > 1) {
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
        }
        for (var i = 0; i < this.itemCount_; i++) {
            this.appendValueInput('ADD' + i);
        }
        this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);
    }
};

// Mutator
Blockly.Extensions.registerMutator('actuators_play_notes_mutator',
    Blockly.Constants.Actuators.ACTUATORS_PLAY_NOTES_MUTATOR_MIXIN);
