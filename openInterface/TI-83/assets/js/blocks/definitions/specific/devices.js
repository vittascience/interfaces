/**
 * @fileoverview Devices blocks for TI-83 Premium CE.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    //* Start Hub built-in devices blocks */

    // BUILT-IN LED RGB _ SET COLOR R,G,B
    {
        "type": "devices_builtin_setLEDRGB",
        "message0": "%{BKY_DEVICES_BUILTIN_SETRGBLED_TITLE}",
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
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_BUILTIN_SETRGBLED_TOOLTIP}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILT-IN LED RGB _ SET COLOR R,G,B
    {
        "type": "devices_builtin_setLEDRGBPalette",
        "message0": "%{BKY_DEVICES_BUILTIN_SETRGBLEDPALETTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_BUILTIN_SETRGBLEDPALETTE_TOOLTIP}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILT-IN LED RGB _ SET COLOR R,G,B
    {
        "type": "devices_builtin_blinkLEDRGB",
        "message0": "%{BKY_DEVICES_BUILTIN_BLINKRGBLED_TITLE}",
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_BUILTIN_BLINKRGBLED_TOOLTIP}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILTI-IN RED LED
    {
        "type": "devices_builtin_setRedLed",
        "message0": "%{BKY_DEVICES_BUILTIN_SETREDLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_BUILTIN_SETREDLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILT-IN BUZZER _ PLAY MUSIC
    {
        "type": "devices_builtin_playMusicBuzzer",
        "message0": "%{BKY_DEVICES_BUILTIN_PLAYMUSICBUZZER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MUSIC",
            "options": [
                ["Pirates des Caraïbes", "CARRIBEAN_PIRATES"],
                ["Gamme", "GAMME"],
                ["Star Wars", "SW"],
                ["R2D2", "R2D2"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_BUILTIN_PLAYMUSICBUZZER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILT-IN BUZZER _ PLAY NOTES
    {
        "type": "devices_builtin_speaker_playNotes",
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_BUILTIN_SPEAKER_PLAY_NOTES_TOOLTIP}",
        "extensions": [
            "block_buttons_plus_minus",
            "devices_builtin_playMusicBuzzer_init_extension"
        ],
        "mutator": "devices_builtin_playMusicBuzzer_mutator"
    },

    // BUILT-IN BUZZER _ NOTE DEFINITION
    {
        "type": "devices_builtin_speaker_note",
        "message0": "%{BKY_DEVICES_BUILTIN_SPEAKER_NOTE_TITLE}",
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
        "tooltip": "%{BKY_DEVICES_BUILTIN_SPEAKER_NOTE_TOOLTIP}",
    },

    // BUILT-IN SPEAKER _ PLAY FREQUENCY
    {
        "type": "devices_builtin_speaker_playFrequency",
        "message0": "%{BKY_DEVICES_BUILTIN_SPEAKER_PLAY_FREQUENCY_TITLE}",
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
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_BUILTIN_SPEAKER_PLAY_FREQUENCY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILTI-IN LIGHT SENSOR
    {
        "type": "devices_builtin_getLight",
        "message0": "%{BKY_DEVICES_BUILTIN_GETLIGHT_TITLE}",
        "output": "Number",
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_BUILTIN_GETLIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //* Begin grove external inputs blocks *//

    // BLOCK GROVE MOISTURE SENSOR
    {
        "type": "devices_grove_getPotentiometer",
        "message0": "%{BKY_DEVICES_GROVE_GETPOTENTIOMETER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_ANALOG_INPUTS
        }],
        "output": "Number",
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_GROVE_GETPOTENTIOMETER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE ULTRASONIC SENSOR _ GET DISTANCE
    {
        "type": "devices_grove_getUltrasonicRange",
        "message0": "%{BKY_DEVICES_GROVE_GETULTRASONIC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_DIGITAL_INPUTS
        }],
        "output": "Number",
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_GROVE_GETULTRASONIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE MOISTURE SENSOR
    {
        "type": "devices_grove_getMoisture",
        "message0": "%{BKY_DEVICES_GROVE_GETMOISTURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_ANALOG_INPUTS
        }],
        "output": "Number",
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_GROVE_GETMOISTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE TEMPERATURE SENSOR
    {
        "type": "devices_grove_getTemperature",
        "message0": "%{BKY_DEVICES_GROVE_GETTEMPERATURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(°C)", "CELSIUS"],
                ["(°F)", "FAHRENHEIT"],
                ["(K)", "KELVIN"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_DIGITAL_INPUTS
        }],
        "output": "Number",
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_GROVE_GETTEMPERATURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },


    // GROVE DHT 11 SENSOR _ READ DATA
    {
        "type": "devices_grove_dhtReadData",
        "message0": "%{BKY_DEVICES_GROVE_DHT_READDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_SENSORS_TEMPERATURE}", "TEMP"],
                ["%{BKY_SENSORS_HUMIDITY}", "HUM"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_DIGITAL_INPUTS
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_GROVE_DHT_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    // BLOCK GROVE LOUDNESS SENSOR
    {
        "type": "devices_grove_getLoudness",
        "message0": "%{BKY_DEVICES_GROVE_GETLOUDNESS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_ANALOG_INPUTS
        }],
        "output": "Number",
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_GROVE_GETLOUDNESS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE LOUDNESS SENSOR
    {
        "type": "devices_grove_getLight",
        "message0": "%{BKY_DEVICES_GROVE_GETLIGHT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_ANALOG_INPUTS
        }],
        "output": "Number",
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_GROVE_GETLIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //* Begin grove external outputs blocks *//

    // GROVE LED MODULE _ WRITE DIGITAL JSON
    {
        "type": "devices_grove_setSocketLed",
        "message0": "%{BKY_DEVICES_GROVE_SETLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_DIGITAL_OUTPUTS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_GROVE_SETLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // LED MODULE _ WRITE ANALOG PWM
    {
        "type": "devices_grove_setLEDintensity",
        "message0": "%{BKY_DEVICES_GROVE_SETLEDINTENSITY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_PWM_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_GROVE_SETLEDINTENSITY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // SERVOMOTEUR _ SET POSITION
    {
        "type": "devices_grove_setServoAngle",
        "message0": "%{BKY_DEVICES_GROVE_SERVO_SETANGLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_PWM_PINS_5V
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_GROVE_SERVO_SETANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE RELAY _ WRITE DIGITAL
    {
        "type": "devices_grove_setRelayState",
        "message0": "%{BKY_DEVICES_GROVE_RELAY_CONTROL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_DIGITAL_OUTPUTS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_GROVE_RELAY_CONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE VIBRATION MOTOR _ WRITE DIGITAL
    {
        "type": "devices_grove_setVibrationMotorState",
        "message0": "%{BKY_DEVICES_GROVE_VIBRATIONMOTOR_CONTROL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_DIGITAL_OUTPUTS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_GROVE_VIBRATIONMOTOR_CONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE VIBRATION MOTOR _ WRITE ANALOG
    {
        "type": "devices_grove_setVibrationMotorValue",
        "message0": "%{BKY_DEVICES_GROVE_VIBRATIONMOTOR_SET_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_PWM_PINS_5V
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_GROVE_VIBRATIONMOTOR_SET_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },


    // MOTOR _ SET POWER STATE
    {
        "type": "devices_grove_setPowerState",
        "message0": "%{BKY_DEVICES_GROVE_MOTOR_SETPOWERSTATE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_DIGITAL_OUTPUTS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_GROVE_MOTOR_SETPOWERSTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // MOTOR _ SET POWER VALUE
    {
        "type": "devices_grove_setPowerValue",
        "message0": "%{BKY_DEVICES_GROVE_MOTOR_SETPOWERVALUE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "POWER",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_PWM_PINS_5V
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_DEVICES_GROVE_MOTOR_SETPOWERVALUE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //* Begin control pins blocks *//

    // BLOCK ON/OFF BOOLEAN
    {
        "type": "io_hub_digital_signal",
        "message0": "%{BKY_IO_HUB_DIGITALSIGNAL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BOOL",
            "options": [
                ["%{BKY_IO_HUB_DIGITALSIGNAL_HIGH}", "HIGH"],
                ["%{BKY_IO_HUB_DIGITALSIGNAL_LOW}", "LOW"]
            ]
        }],
        "output": "Boolean",
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_IO_HUB_DIGITALSIGNAL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK READ DIGITAL PIN
    {
        "type": "io_hub_readDigitalPin",
        "message0": "%{BKY_IO_HUB_READDIGITALPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_DIGITAL_INPUTS
        }],
        "style": "ti_hub_blocks",
        "output": "Boolean",
        "tooltip": "%{BKY_IO_HUB_READDIGITALPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK WRITE DIGITAL PIN
    {
        "type": "io_hub_writeDigitalPin",
        "message0": "%{BKY_IO_HUB_WRITEDIGITALPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_DIGITAL_OUTPUTS
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_IO_HUB_WRITEDIGITALPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK READ ANALOG PIN
    {
        "type": "io_hub_readAnalogPin",
        "message0": "%{BKY_IO_HUB_READANALOGPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_ANALOG_INPUTS
        }],
        "output": "Number",
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_IO_HUB_READANALOGPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK WRITE ANALOG 
    {
        "type": "io_hub_writeAnalogPin",
        "message0": "%{BKY_IO_HUB_WRITEANALOGPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_PWM_PINS
        }, {
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_IO_HUB_WRITEANALOGPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SET PWM
    {
        "type": "io_hub_setPwm",
        "message0": "%{BKY_IO_HUB_SETPWM_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQ",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "PERCENT",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.HUB_PWM_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ti_hub_blocks",
        "tooltip": "%{BKY_IO_HUB_SETPWM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Devices = Object.create(null);

/**
 * Performs final setup of 'communication_serialWrite' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Devices.DEVICES_BUILTIN_SPEAKER_PLAY_NOTES_INIT_EXTENSION = function () {
    //this.update_(this.updateShape_);
    this.itemCount_ = 3;
};

/**
 * Mixin for mutator functions in the 'actuators_play_notes_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Devices.DEVICES_BUILTIN_SPEAKER_PLAY_NOTES_MUTATOR_MIXIN = {
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
        this.update_(this.updateShape_);
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
        top.appendField(Blockly.Msg['DEVICES_BUILTIN_SPEAKER_PLAY_NOTES_TITLE']);
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

// Initialization extensions
Blockly.Extensions.register("devices_builtin_playMusicBuzzer_init_extension",
    Blockly.Constants.Devices.DEVICES_BUILTIN_SPEAKER_PLAY_NOTES_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator('devices_builtin_playMusicBuzzer_mutator',
    Blockly.Constants.Devices.DEVICES_BUILTIN_SPEAKER_PLAY_NOTES_MUTATOR_MIXIN);
