/**
 * @fileoverview Communication blocks for Thingz-Galaxia.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /*Begin logging blocks*/
    {
        "type": "communication_log_delete",
        "message0": "%{BKY_COMMUNICATION_LOG_DELETE_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_LOG_DELETE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "communication_log_setLabel",
        "message0": "%{BKY_COMMUNICATION_LOG_SET_LABEL_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_LOG_SET_LABEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_log_init_extension"
        ],
        "mutator": "communication_log_setLabel_mutator"
    },
    {
        "type": "communication_log_addData",
        "message0": "%{BKY_COMMUNICATION_LOG_ADDDATA_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_COMMUNICATION_LOG_ADDDATA_TOOLTIP}",
        "style": "communication_blocks",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_log_init_extension"
        ],
        "mutator": "communication_log_addData_mutator"
    },
    {
        "type": "communication_log_data",
        "message0": "%{BKY_COMMUNICATION_LOG_DATA_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LABEL",
        },
        {
            "type": "input_value",
            "name": "DATA",
            "check": "Number"
        }],
        "inputsInline": true,
        "output": "Number",
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_LOG_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    /* Begin built-in radio blocks */

    // BLOCK RADIO SEND STRING
    {
        "type": "communication_radioSendString",
        "message0": "%{BKY_COMMUNICATION_RADIO_SENDSTRING_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STR",
            "check": "String"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_SENDSTRING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK RADIO SEND NUMBER
    {
        "type": "communication_radioSendNumber",
        "message0": "%{BKY_COMMUNICATION_RADIO_SEND_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "N",
            "check": ["Number", "Boolean"]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_SEND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK RADIO SEND VALUE
    {
        "type": "communication_radioSendValue",
        "message0": "%{BKY_COMMUNICATION_RADIO_SENDVALUE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "NAME",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "VALUE"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_SENDVALUE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK ON RADIO DATA RECEIVED
    {
        "type": "communication_onRadioDataReceived",
        "message0": "%{BKY_COMMUNICATION_RADIO_ONSTRINGRECEIVED_TITLE}",
        "args0": [{
            "type": "field_variable",
            "name": "VAR",
            "variable": "stringData"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_ONSTRINGRECEIVED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK ON RADIO DATA RECEIVED
    {
        "type": "communication_onRadioNumberReceived",
        "message0": "%{BKY_COMMUNICATION_RADIO_ONNUMBERRECEIVED_TITLE}",
        "args0": [{
            "type": "field_variable",
            "name": "VAR",
            "variable": "numberData"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_ONNUMBERRECEIVED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ON RADIO DATA RECEIVED
    {
        "type": "communication_onRadioValueReceived",
        "message0": "%{BKY_COMMUNICATION_RADIO_ONVALUERECEIVED_TITLE}",
        "args0": [{
            "type": "field_variable",
            "name": "NAME",
            "variable": "name"
        }, {
            "type": "field_variable",
            "name": "VALUE",
            "variable": "value"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_ONVALUERECEIVED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK RADIO CONFIGURATION
    {
        "type": "communication_radioConfig",
        "message0": "%{BKY_COMMUNICATION_RADIO_CONFIG_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "CANAL",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "POWER",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "LEN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "GROUP",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_CONFIG_TOOLTIP}",
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

    /* Begin external bluetooth blocks */

    // GROVE SERIAL BLUETOOTH _ SET AT COMMAND
    {
        "type": "communication_groveSerialBluetooth_setATCommand",
        "message0": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_SET_AT_COMMAND_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "COMMAND",
            "options": [
                ["AT+NAME", "AT+NAME"],
                ["AT+PIN", "AT+PIN"],
                ["AT+ROLE", "AT+ROLE"],
                ["AT+BAUD", "AT+BAUD"]
            ]
        }, {
            "type": "input_value",
            "name": "VALUE",
            "check": "String"
        }],
        "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
        "args1": [{
            "type": "field_grid_dropdown",
            "name": "RX",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_SET_AT_COMMAND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    // GROVE SERIAL BLUETOOTH _ GET AT COMMAND
    {
        "type": "communication_groveSerialBluetooth_getATCommand",
        "message0": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_GET_AT_COMMAND_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "COMMAND",
            "options": [
                ["AT+HELP", "AT+HELP?"],
                ["AT+NAME", "AT+NAME?"],
                ["AT+PIN", "AT+PIN?"],
                ["AT+BAUD", "AT+BAUD?"],
                ["AT+ROLE", "AT+ROLE?"],
                ["AT+VERSION", "AT+VERSION?"],
                ["AT+TEMP", "AT+TEMP?"],
                ["AT+ADDR", "AT+ADDR?"],
                ["AT+UART", "AT+UART?"],
                ["AT+CHK", "AT+CHK?"],
                ["AT+STOP", "AT+STOP?"],
                ["AT+RADD", "AT+RADD?"]
            ]
        }],
        "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
        "args1": [{
            "type": "field_grid_dropdown",
            "name": "RX",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "String",
        "inputsInline": true,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_GET_AT_COMMAND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    // GROVE SERIAL BLUETOOTH _ SEND DATA JSON
    {
        "type": "communication_sendSerialBluetoothData",
        "message0": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_SENDDATA_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
            "check": ["String", "Number", "Decimal", "Boolean"]
        }],
        "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
        "args1": [{
            "type": "field_grid_dropdown",
            "name": "RX",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_SENDDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    //BLOCK ON BLUETOOTH DATA RECEIVED
    {
        "type": "communication_onSerialBluetoothDataReceived",
        "message0": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_ONDATARECEIVED_TITLE}",
        "args0": [{
            "type": "field_variable",
            "name": "VAR",
            "variable": "bluetoothData"
        }],
        "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
        "args1": [{
            "type": "field_grid_dropdown",
            "name": "RX",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "message2": "%{BKY_COMMUNICATION_THEN}",
        "message3": "%1",
        "args3": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_ONDATARECEIVED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    /* Tracking modules */

    // RC522 SPI READER _ GET STRING CARD ID
    {
        "type": "communication_mfrc522_getCardID",
        "message0": "%{BKY_COMMUNICATION_MFRC522_GETSTRINGCARDID_TITLE}",
        "args0": [{
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

    /* Begin IR remote blocks */

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
                ["NEC_16", "NEC_16"],
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

    // Emit IR signal
    {
        'type': 'communication_irEmit',
        'message0': '%{BKY_COMMUNICATION_IR_EMIT_TITLE}',
        'args0': [{
            'type': 'field_grid_dropdown',
            'name': 'ACTIVATION',
            'options': [
                ['%{BKY_COMMUNICATION_IR_EMIT_ACTIVATE}', '32768'],
                ['%{BKY_COMMUNICATION_IR_EMIT_DEACTIVATE}', '0']
            ]
        }, {
            'type': 'field_grid_dropdown',
            'name': 'PIN',
            'options': Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]

        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        'tooltip': '%{BKY_COMMUNICATION_IR_EMIT_TOOLTIP}',
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
    }

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

// Initialization extensions
Blockly.Extensions.register("communication_uart_read_init_extension",
    Blockly.Constants.Communication.COMMUNICATION_UART_READ_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator('communication_uart_read_mutator',
    Blockly.Constants.Communication.COMMUNICATION_UART_READ_MUTATOR_MIXIN);

/**
 * Performs final setup of 'communication_log_setLabel' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Communication.COMMUNICATION_LOG_INIT_EXTENSION = function () {
    this.itemCount_ = 1;
    this.updateShape_();
};

Blockly.Extensions.register('communication_log_init_extension',
    Blockly.Constants.Communication.COMMUNICATION_LOG_INIT_EXTENSION);

/**
 * Mixin for mutator functions in the 'communication_log_setLabel_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Communication.COMMUNICATION_LOG_SETLABEL_MUTATOR_MIXIN = {
    /**
         * Create XML to represent number of text inputs.
         * @return {!Element} XML storage element.
         * @this {Blockly.Block}
         */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the text inputs.
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
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
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
        // Add text block
        if (this.itemCount_ > 1) {
            const dataBlockName = "text";
            if (Blockly.Blocks[dataBlockName]) {
                const newBlock = Blockly.utils.xml.createElement('block');
                newBlock.setAttribute('type', dataBlockName);
                if (newBlock) {
                    const id = Blockly.utils.genUid();
                    newBlock.setAttribute('id', id);
                    Blockly.Xml.domToBlock(newBlock, this.workspace);
                    const block = this.workspace.getBlockById(id);
                    block.setFieldValue("Label" + this.itemCount_, "TEXT");
                    this.valueConnections_.push(block.outputConnection);
                }
            }
        }
        this.restoreValueConnections_();
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
        if (this.itemCount_ > 0) {
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
            if (this.itemCount_ > 1) {
                top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
            }
            for (var i = 0; i < this.itemCount_; i++) {
                this.appendValueInput('ADD' + i);
            }
        }
        /* Switch to vertical list when the list is too long */
        var showHorizontalList = this.itemCount_ <= 2;
        this.setInputsInline(showHorizontalList);
        this.setOutputShape(showHorizontalList ? Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE);
    }
};

Blockly.Extensions.registerMutator('communication_log_setLabel_mutator',
    Blockly.Constants.Communication.COMMUNICATION_LOG_SETLABEL_MUTATOR_MIXIN);


/**
 * Mixin for mutator functions in the 'communication_log_addData_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Communication.COMMUNICATION_LOG_ADDDATA_MUTATOR_MIXIN = {
    /**
         * Create XML to represent number of text inputs.
         * @return {!Element} XML storage element.
         * @this {Blockly.Block}
         */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the text inputs.
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
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
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
        // Add text block
        if (this.itemCount_ > 1) {
            const dataBlockName = "communication_log_data";
            if (Blockly.Blocks[dataBlockName]) {
                const newBlock = Blockly.utils.xml.createElement('block');
                newBlock.setAttribute('type', dataBlockName);
                if (newBlock) {
                    const id = Blockly.utils.genUid();
                    newBlock.setAttribute('id', id);
                    newBlock.appendChild(this.addShadowBlock_('LABEL', 'text', 'TEXT', 'Label' + this.itemCount_));
                    newBlock.appendChild(this.addShadowBlock_('DATA', 'math_number', 'NUM', 0));
                    Blockly.Xml.domToBlock(newBlock, this.workspace);
                    const block = this.workspace.getBlockById(id);
                    this.valueConnections_.push(block.outputConnection);
                }
            }
        }
        this.restoreValueConnections_();
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
        if (this.itemCount_ > 0) {
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
            if (this.itemCount_ > 1) {
                top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
            }
            for (var i = 0; i < this.itemCount_; i++) {
                this.appendValueInput('ADD' + i);
            }
        }
        /* Switch to vertical list when the list is too long */
        var showHorizontalList = this.itemCount_ <= 2;
        this.setInputsInline(showHorizontalList);
        this.setOutputShape(showHorizontalList ? Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE);
    },
    addShadowBlock_(valueName, type, fieldName, content) {
        const value = Blockly.utils.xml.createElement('value');
        value.setAttribute('name', valueName);
        const shadowBlock = Blockly.utils.xml.createElement('shadow');
        shadowBlock.setAttribute('type', type);
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', fieldName);
        field.textContent = content;
        shadowBlock.appendChild(field);
        value.appendChild(shadowBlock);
        return value;
    }
};

Blockly.Extensions.registerMutator('communication_log_addData_mutator',
    Blockly.Constants.Communication.COMMUNICATION_LOG_ADDDATA_MUTATOR_MIXIN);

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

Blockly.Extensions.register("communication_FS_saveData_init_extension",
    Blockly.Constants.Communication.COMMUNICATION_FS_SAVE_DATA_INIT_EXTENSION);

Blockly.Extensions.registerMutator('communication_FS_saveData_mutator',
    Blockly.Constants.Communication.COMMUNICATION_FS_SAVE_DATA_MUTATOR_MIXIN);