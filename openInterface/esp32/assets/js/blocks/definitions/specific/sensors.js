/**
 * @fileoverview Sensors blocks for Esp32.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Begin board sensors blocks*/

    // BLOCK READ HALL SENSOR
    {
        "type": "sensors_readHallSensor",
        "message0": "%{BKY_SENSORS_READ_HALL_SENSOR_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_READ_HALL_SENSOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK READ MICROPROCESSOR TEMP
    {
        "type": "sensors_readProcessorTemperature",
        "message0": "%{BKY_SENSORS_READ_PROCESSOR_TEMP_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(°C)", "CELSIUS"],
                ["(°F)", "FAHRENHEIT"],
                ["(K)", "KELVIN"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_READ_PROCESSOR_TEMP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin climate sensors blocks*/

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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_DHT11_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    // BLOCK GROVE DHT 22 SENSOR _ READ DATA
    {
        "type": "sensors_DHT22ReadData",
        "message0": "%{BKY_SENSORS_DHT22_READDATA_TITLE}",
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_DHT22_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    // BLOCK DS18B20 - GET TEMPERATURE SENSOR
    {
        "type": "sensors_DS18B20_getTemperature",
        "message0": "%{BKY_SENSORS_DS18B20_GETTEMPERATURE_TITLE}",
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_DS18B20_GETTEMPERATURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    /* Begin distance & movement sensors blocks*/

    // I2C GY-521 SENSOR _ GET DATA JSON
    {
        "type": "sensors_gy521_getData",
        "message0": "%{BKY_SENSORS_GY521_GETDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_SENSORS_GY521_ACC}", "ACC"],
                ["%{BKY_SENSORS_GY521_GYR}", "GYR"],
                ["%{BKY_SENSORS_GY521_TEMP}", "TEMP"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GY521_GETDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_gy521_mutator"
    },

    // Other sensors

    // GROVE VOLTAGE DIVIDER SENSOR 
    {
        "type": "sensors_getVoltageDividerData",
        "message0": "%{BKY_SENSORS_VOLTAGE_DIVIDER_GETDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIVIDER",
            "options": [
                ["3", "3"],
                ["10", "10"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_VOLTAGE_DIVIDER_GETDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    // GROVE EMG DETECTOR
    {
        "type": "sensors_getEmgDetector",
        "message0": "%{BKY_SENSORS_EMG_DETECTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_EMG_DETECTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    //  GET ANALOG DISSOLVED OXYGEN PROBE 
    {
        "type": "sensors_getDissolvedOxygenProbe",
        "message0": "%{BKY_SENSORS_GET_DISSOLVED_OXYGEN_PROBE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_DISSOLVED_OXYGEN_PROBE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Sensors ??= Object.create(null);

/**
* Performs final setup of gy521 blocks.
* @this {Blockly.Block}
*/
Blockly.Constants.Sensors.SENSORS_GY521_INIT_EXTENSION = function () {
    this.TEMPERATURE_UNIT = [
        ["(°C)", 'CELSIUS'],
        ["(°F)", 'FAHRENHEIT'],
        ["(K)", 'KELVIN']
    ];
    this.AXIS_UNIT = [
        ["x", 'x'],
        ["y", 'y'],
        ["z", 'z']
    ];
    const dropdown = this.getField("DATA");
    dropdown.setValidator(function (value) {
        const newTemp = (value == "TEMP");
        if (newTemp != this.isTemp_) {
            this.getSourceBlock().updateField_(newTemp);
        }
    });
    this.updateField_(this.getFieldValue("DATA") == "TEMP");
};

/**
 * Mixin for mutator functions in the 'sensors_gy521_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Sensors.SENSORS_GY521_MUTATOR_MIXIN = {
    /**
     * Create XML to represent whether there is an 'temp' dropdown field.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        // container.setAttribute('temp', this.isTemp_);
        return container;
    },
    domToMutation: function (xmlElement) { },
    /**
     * Create or delete temperature unit field_dropdown.
     * @param {boolean} isTemp True if the dropdown should exist.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function (isTemp) {
        // Destroy old 'UNIT' field.
        if (this.getInput("UNIT")) {
            this.removeInput("UNIT");
        }
        if (this.getInput("AXIS")) {
            this.removeInput("AXIS");
        }
        // Create either a value 'TEMP' dropdown field.
        this.setInputsInline(true);
        if (isTemp) {
            this.appendDummyInput("UNIT")
                .appendField(Blockly.Msg["SENSORS_TEMPERATURE_IN"])
                .appendField(new Blockly.FieldDropdown(this.TEMPERATURE_UNIT), "UNIT");
        } else {
            this.appendDummyInput("AXIS")
                .appendField(Blockly.Msg["SENSORS_GY521_AXIS"])
                .appendField(new Blockly.FieldDropdown(this.AXIS_UNIT), "AXIS");
        }
        this.isTemp_ = isTemp;
    }
};

Blockly.Extensions.registerMutator('sensors_gy521_mutator',
    Blockly.Constants.Sensors.SENSORS_GY521_MUTATOR_MIXIN,
    Blockly.Constants.Sensors.SENSORS_GY521_INIT_EXTENSION);
