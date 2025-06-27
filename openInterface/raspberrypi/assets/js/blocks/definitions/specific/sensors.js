/**
 * @fileoverview Sensors blocks for Raspberry pi.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // Raspberry Pi blocs

    {
        "type": "sensors_getGroveUltrasonicRanger",
        "message0": "%{BKY_SENSORS_GETGROVEULTRASONIC_TITLE}",
        "args0": [
        {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital
        },
        ],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVEULTRASONIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        // "mutator": "sensors_ultrasonic_mutator"
    },

    // BLOCK GROVE TEMPERATURE SENSOR
    {
        "type": "sensors_getGroveTemperature",
        "message0": "%{BKY_SENSORS_GETGROVETEMPERATURE_TITLE}",
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
            "options": Blockly.Constants.Pins.analog_read
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVETEMPERATURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE MOISTURE SENSOR
    {
        "type": "sensors_getGroveMoisture",
        "message0": "%{BKY_SENSORS_GETGROVEMOISTURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVEMOISTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE DHT 11 SENSOR _ READ DATA
    {
        "type": "sensors_DHT11ReadData",
        "message0": "%{BKY_SENSORS_DHT11_READDATA_TITLE}",
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
            "options": Blockly.Constants.Pins.PWM
            
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_DHT11_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_temperature_mutator"
    },

     // BLOCK GROVE LIGHT SENSOR JSON
    {
        "type": "sensors_getGroveLight",
        "message0": "%{BKY_SENSORS_GETGROVELIGHT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVELIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sensors_rpi_camera_take_picture",
        "message0": "%{BKY_SENSORS_RPI_CAMERA_TAKE_PICTURE_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_RPI_CAMERA_TAKE_PICTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensors_rpi_camera_take_video",
        "message0": "%{BKY_SENSORS_RPI_CAMERA_TAKE_VIDEO_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DURATION",
            "check": "Number",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_RPI_CAMERA_TAKE_VIDEO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },


]); // END JSON EXTRACT (Do not delete this comment.)


Blockly.Constants.Sensors = Object.create(null);

/**
 * Performs final setup of ultrasonic block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Sensors.SENSORS_ULTRASONIC_INIT_EXTENSION = function () {
    var dropdown = this.getField("SENSOR");
    dropdown.setValidator(function (value) {
        var newSensor = (value == "GROVE");
        if (newSensor != this.isGrove_) {
            var block = this.getSourceBlock();
            block.updateField_(newSensor);
        }
    });
    var isGroveInital = (this.getFieldValue("SENSOR") == "GROVE");
    this.updateField_(isGroveInital);
};

/**
 * Mixin for mutator functions in the 'sensors_ultrasonic_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Sensors.SENSORS_ULTRASONIC_MUTATOR_MIXIN = {
    /**
     * Create XML to represent whether there is an 'pin' dropdown field.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('pin', !!this.isGrove_);
        return container;
    },
    /**
     * Parse XML to restore the 'temp' dropdown field.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        var isGrove = (xmlElement.getAttribute('pin') != 'false');
        this.updateField_(isGrove);
    },
    /**
     * Create or delete temperature unit field_dropdown.
     * @param {boolean} isGrove True if the dropdown should exist.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function (isGrove) {
        // Destroy 'TRIG' and 'ECHO' field.
        if (this.getInput("HC_PINS")) {
            this.removeInput("HC_PINS");
        }
        // Destroy 'PIN' field.
        if (this.getInput("GROVE_PIN")) {
            this.removeInput("GROVE_PIN");
        }
        if (isGrove) {
            this.setInputsInline(true);
            // Create either a value 'PIN' dropdown field.
            this.appendDummyInput("GROVE_PIN")
                .appendField(Blockly.Msg["SENSORS_ULTRASONIC_1PIN"])
                .appendField(new Blockly.FieldDropdown(Blockly.Constants.Pins.GALAXIA_PINS), "PIN");
        } else {
            this.setInputsInline(false);
            // Create either value 'TRIG' & 'ECHO' dropdown fields.
            this.appendDummyInput("HC_PINS")
                .appendField(Blockly.Msg["SENSORS_ULTRASONIC_2PINS"])
                .appendField("TRIG")
                .appendField(new Blockly.FieldDropdown(Blockly.Constants.Pins.GALAXIA_PINS), "TRIG")
                .appendField("ECHO")
                .appendField(new Blockly.FieldDropdown(Blockly.Constants.Pins.GALAXIA_PINS), "ECHO");
        }
        this.isGrove_ = isGrove;
    }
};

Blockly.Extensions.registerMutator('sensors_ultrasonic_mutator',
    Blockly.Constants.Sensors.SENSORS_ULTRASONIC_MUTATOR_MIXIN,
    Blockly.Constants.Sensors.SENSORS_ULTRASONIC_INIT_EXTENSION);