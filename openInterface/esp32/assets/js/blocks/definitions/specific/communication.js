/**
 * @fileoverview Communication blocks for Esp32.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /*Begin ESP32 internal Bluetooth blocks*/

    // BLOCK INTEGRATED BLE - CONFIGURE NAME 
    {
        "type": "communication_StartBT",
        "message0": "%{BKY_COMMUNICATION_START_BT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "NAME"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_START_BT_TOOLTIP}",
    },
    // BLOCK INTEGRATED BLE - SEND DATA 
    {
        "type": "communication_SendBT",
        "message0": "%{BKY_COMMUNICATION_SEND_BT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_SEND_BT_TOOLTIP}",
    },
    // BLOCK INTEGRATED BLE - Read DATA
    {
        "type": "communication_BLE_ReadData",
        "message0": "%{BKY_COMMUNICATION_BLE_READ_DATA_TITLE}",
        "args0": [{
            "type": "field_variable",
            "name": "VAR",
            "variable": "bluetoothData"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_BLE_READ_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // BLOCK INTEGRATED BLE - App Inventor Read Data
    {
        "type": "communication_BLE_AppInventorReadData",
        "message0": "%{BKY_COMMUNICATION_BLE_APP_INVENTOR_READ_DATA_TITLE}",
        "args0": [{
            "type": "field_variable",
            "name": "VAR",
            "variable": "bluetoothData"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_BLE_READ_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // BLOCK INTEGRATED BLE - Send to Fizziq App
    {
        "type": "communication_FizziqBT",
        "message0": "%{BKY_COMMUNICATION_FIZZIQ_BT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_FIZZ_TEMP}", "TEMP"],
                ["%{BKY_FIZZ_HUM}", "HUM"],
                ["%{BKY_FIZZ_VOLTAGE}", "VOLTAGE"],
                ["%{BKY_FIZZ_WEIGHT}", "WEIGHT"],
                ["%{BKY_FIZZ_PRESSURE}", "PRESSURE"],
                ["%{BKY_FIZZ_CONCENTRATION}", "CONCENTRATION"],
                ["%{BKY_FIZZ_MAGNETIC}", "MAGFIELD"],
                ["%{BKY_FIZZ_BRIGHTNESS}", "BRIGHTNESS"],
                ["%{BKY_FIZZ_ACCELERATION}", "ACCELERATION"],
                ["%{BKY_FIZZ_COMPASS}", "COMPASS"]
            ]
        }, {
            "type": "input_value",
            "name": "VALUE"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_FIZZIQ_BT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /*Begin data logging blocks*/

    // BLOCK FS - SAVE DATA 
    {
        "type": "communication_esp32_FS_saveData",
        "message0": "%{BKY_COMMUNICATION_FS_SAVE_DATA_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA"
        }, {
            "type": "input_value",
            "name": "FILENAME",
            "check": "String"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_FS_SAVE_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_FS_saveData_init_extension"
        ],
        "mutator": "communication_FS_saveData_mutator"
    },

    /*Begin wireless communication blocks*/

    // block infrared receiver _ on data received
    {
        "type": "communication_onInfraredDataReceived",
        "message0": "%{BKY_COMMUNICATION_INFRARED_ONDATARECEIVED_TITLE}",
        "args0": [{
                "type": 'input_value',
                "name": 'DATA',
                "check": ['String']
            }, {
                "type": "field_variable",
                "name": "VAR",
                "variable": "r_value"
            }, {
                "type": "input_dummy"
            }, {
                "type": "field_grid_dropdown",
                "name": "PIN",
                "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
            }, {
                "type": "field_grid_dropdown",
                "name": "PROTOCOL",
                "options": [
                    ["NEC_8", "NEC_8"],
                    ["NEC_16", "NEC_16"]
                ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_INFRARED_ONDATARECEIVED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    /* Tracking Modules */

    // RC522 SPI READER _ GET STRING CARD ID
    {
        "type": "communication_mfrc522_getCardID",
        "message0": "%{BKY_COMMUNICATION_MFRC522_GETSTRINGCARDID_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SPI",
            "options": Blockly.Constants.Pins.SPI[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "NSS",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "output": "String",
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_MFRC522_GETSTRINGCARDID_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    /*Begin basic uart blocks*/

    //BLOCK SERIAL INIT
    {
        "type": "communication_serialInit",
        "message0": "%{BKY_COMMUNICATION_UART_INIT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UART",
            "options": Blockly.Constants.Pins.UART[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "RX",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "BAUD",
            "options": [
                ["9600", "9600"],
                ["14400", "14400"],
                ["19200", "19200"],
                ["28800", "28800"],
                ["38400", "38400"],
                ["57600", "57600"],
                ["115200", "115200"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_UART_INIT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    //BLOCK UART WRITE
    {
        "type": "communication_uart_writeData",
        "message0": "%{BKY_COMMUNICATION_UART_WRITE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UART",
            "options": Blockly.Constants.Pins.UART[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "input_value",
            "name": "DATA"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_UART_WRITE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    // BLOCK DATA AVAILABLE UART
    {
        "type": "communication_uart_isDataAvailable",
        "message0": "%{BKY_COMMUNICATION_UART_DATA_AVAILABLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UART",
            "options": Blockly.Constants.Pins.UART[Blockly.Constants.getSelectedBoard()]
        }],
        "style": "communication_blocks",
        "output": "Boolean",
        "tooltip": "%{BKY_COMMUNICATION_UART_DATA_AVAILABLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    // BLOCK UART READ
    {
        "type": "communication_uart_readData",
        "message0": "%{BKY_COMMUNICATION_UART_READ_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UART",
            "options": Blockly.Constants.Pins.UART[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "String",
        "inputsInline": true,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_UART_READ_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_uart_read_init_extension",
            "pins_management_global"
        ],
        "mutator": "communication_uart_read_mutator"
    },

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Communication = Object.create(null);

/**
 * Performs final setup of a 'uart_read' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Communication.COMMUNICATION_UART_READ_INIT_EXTENSION = function () {
    this.size_ = false;
    this.updateField_();
};

/**
 * Mixin for mutator functions in the 'communication_uart_read_init' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Communication.COMMUNICATION_UART_READ_MUTATOR_MIXIN = {
    /**
     * Create XML to represent input.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('size', this.size_);
        return container;
    },
    /**
     * Parse XML to restore the input.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.size_ = (xmlElement.getAttribute('size') != 'false');
        this.updateField_();
    },
    addOptions_: function () {
        if (!this.getInput("SIZE_FIELD") && !this.getInput("SIZE")) {
            this.size_ = true;
            this.updateField_();
            this.addDefaultBlock({
                "name": "SIZE",
                "type": "math_number",
                "field_name": "NUM",
                "value": "64"
            });
        }
    },
    removeOptions_: function () {
        if (this.getInput("SIZE_FIELD") && this.getInput("SIZE")) {
            this.size_ = false;
            this.updateField_();
        }
    },
    /**
     * Modify this block to have the correct input.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function () {
        var that = this;
        var remove = function () {
            that.removeOptions_();
        };
        var add = function () {
            that.addOptions_();
        };
        if (this.getInput('TOP')) {
            this.removeInput('TOP');
        }
        var top = this.appendDummyInput('TOP');
        if (this.size_) {
            if (!this.getInput("SIZE_FIELD")) {
                this.appendDummyInput("SIZE_FIELD")
                    .appendField(Blockly.Msg['COMMUNICATION_UART_READ_SIZE']);
                this.appendValueInput("SIZE");

            }
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", remove, false));
        } else {
            if (this.getInput('SIZE_FIELD') && this.getInput("SIZE")) {
                this.removeInput("SIZE");
                this.removeInput("SIZE_FIELD");
            }
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", add, false));
        }
    },
    addDefaultBlock: function (input) {
        return Blockly.Constants.Utils.CONNECT_DEFAULT_BLOCK(this, {
            "input": input.name,
            "type": input.type,
            "name": input.field_name,
            "value": input.value
        });
    }
};

/**
 * Performs final setup of 'communication_esp32_FS_saveData' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Communication.COMMUNICATION_FS_SAVE_DATA_INIT_EXTENSION = function () {
    this.extension_ = true;
    this.update_(this.updateField_);
};

/**
 * Mixin for mutator functions in the 'communication_esp32_FS_saveData' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Communication.COMMUNICATION_FS_SAVE_DATA_MUTATOR_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('extension', 'extension', 'text', "txt");

// Initialization extensions
Blockly.Extensions.register("communication_uart_read_init_extension",
    Blockly.Constants.Communication.COMMUNICATION_UART_READ_INIT_EXTENSION);

Blockly.Extensions.register("communication_FS_saveData_init_extension",
    Blockly.Constants.Communication.COMMUNICATION_FS_SAVE_DATA_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator('communication_uart_read_mutator',
    Blockly.Constants.Communication.COMMUNICATION_UART_READ_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('communication_FS_saveData_mutator',
    Blockly.Constants.Communication.COMMUNICATION_FS_SAVE_DATA_MUTATOR_MIXIN);