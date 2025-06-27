/**
 * @fileoverview Communication blocks for STM32.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /*Begin serial transmission blocks*/

    // BLOCK SERIAL WRITE 
    {
        "type": "communication_serialWrite",
        "message0": "%{BKY_COMMUNICATION_SERIAL_WRITE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_SERIAL_WRITE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_serialWrite_init_extension"
        ],
        "mutator": "communication_serialWrite_mutator"
    },

    // BLOCK GRAPH _ SERIAL WRITE
    {
        "type": "communication_graphSerialWrite",
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_WRITEGRAPH_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_graphSerialWrite_init_extension"
        ],
        "mutator": "communication_graphSerialWrite_mutator"
    },

    // BLOCK GRAPH _ DATA FORMAT
    {
        "type": "communication_graphSerialWrite_datasFormat",
        "message0": "%{BKY_COMMUNICATION_PRINT_DATAS_TITLE}",
        "args0": [{
            "type": "field_input",
            "name": "NAME"
        }, {
            "type": "input_value",
            "name": "DATA"
        }],
        "output": "Number",
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_COMMUNICATION_PRINT_DATAS_TOOLTIP}",
    },

    // BLOCK COMPUTER MUSIC _ PLAY NOTE
    {
        "type": "communication_playComputerMusic",
        "message0": "%{BKY_COMMUNICATION_COMPUTER_PLAYNOTE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "NOTE",
            "options": [
                ["%{BKY_NOTE_C}", "261.63"],
                ["%{BKY_NOTE_C_SHARP}", "277.18"],
                ["%{BKY_NOTE_D}", "293.66"],
                ["%{BKY_NOTE_D_SHARP}", "311.13"],
                ["%{BKY_NOTE_E}", "329.63"],
                ["%{BKY_NOTE_F}", "349.23"],
                ["%{BKY_NOTE_F_SHARP}", "369.99"],
                ["%{BKY_NOTE_G}", "392.0"],
                ["%{BKY_NOTE_G_SHARP}", "415.3"],
                ["%{BKY_NOTE_A}", "440.0"],
                ["%{BKY_NOTE_A_SHARP}", "466.16"],
                ["%{BKY_NOTE_B}", "493.88"]
            ]
        }],
        "nextStatement": null,
        "previousStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_COMMUNICATION_COMPUTER_PLAYNOTE_TOOLTIP}",
    },

    // BLOCK COMPUTER MUSIC _ SET FREQUENCY
    {
        "type": "communication_playComputerFrequency",
        "message0": "%{BKY_COMMUNICATION_COMPUTER_SETFREQUENCY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_COMMUNICATION_COMPUTER_SETFREQUENCY_TOOLTIP}",
    },

    // BLOCK COMPUTER MUSIC _ STOP MUSIC
    {
        "type": "communication_stopComputerMusic",
        "message0": "%{BKY_COMMUNICATION_COMPUTER_STOPMUSIC_TITLE}",
        "nextStatement": null,
        "previousStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_COMMUNICATION_COMPUTER_STOPMUSIC_TOOLTIP}",
    },

    // STM32 RTC _ SET TIME
    {
        "type": "communication_stm32_RTC_setTime",
        "message0": "%{BKY_COMMUNICATION_STM32_RTC_SETTIME_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "DAY",
            "options": [
                ["%{BKY_DAY_MONDAY}", "1"],
                ["%{BKY_DAY_TUESDAY}", "2"],
                ["%{BKY_DAY_WEDNESDAY}", "3"],
                ["%{BKY_DAY_THURSDAY}", "4"],
                ["%{BKY_DAY_FRIDAY}", "5"],
                ["%{BKY_DAY_SATURDAY}", "6"],
                ["%{BKY_DAY_SUNDAY}", "7"]
            ]
        }, {
            "type": "field_date",
            "name": "DATE",
            "date": "2021-07-06"
        }, {
            "type": "input_value",
            "name": "HOUR",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "MIN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "SEC",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_STM32_RTC_SETTIME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // STM32 RTC _ GET TIME
    {
        "type": "communication_stm32_RTC_readTime",
        "message0": "%{BKY_COMMUNICATION_STM32_RTC_READTIME_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_CLOCK_ALL_DATA}", "ALL"],
                ["%{BKY_CLOCK_YEAR}", "0"],
                ["%{BKY_CLOCK_MONTH}", "1"],
                ["%{BKY_CLOCK_MONTH_DAY}", "2"],
                ["%{BKY_CLOCK_WEEK_DAY}", "3"],
                ["%{BKY_CLOCK_HOUR}", "4"],
                ["%{BKY_CLOCK_MINUTE}", "5"],
                ["%{BKY_CLOCK_SECOND}", "6"]
            ]
        }],
        "output": "Array",
        "inputsInline": true,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_STM32_RTC_READTIME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE GPS _ GET NMEA FRAME
    {
        "type": "communication_gps_getNMEA",
        "message0": "%{BKY_COMMUNICATION_GPS_GET_NMEA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UART",
            "options": Blockly.Constants.Pins.UART[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Array",
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_GPS_GET_NMEA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE GPS _ GET GGA INFORMATIONS
    {
        "type": "communication_gps_getGGAInformations",
        "message0": "%{BKY_COMMUNICATION_GPS_GGA_GETINFORMATIONS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UART",
            "options": Blockly.Constants.Pins.UART[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "INFO",
            "options": [
                ["%{BKY_COMMUNICATION_GPS_INFO_TYPE}", "type"],
                ["%{BKY_COMMUNICATION_GPS_INFO_CLOCK}", "clock"],
                ["%{BKY_COMMUNICATION_GPS_INFO_LATITUDE}", "latitude"],
                ["%{BKY_COMMUNICATION_GPS_INFO_LONGITUDE}", "longitude"],
                ["%{BKY_COMMUNICATION_GPS_INFO_SATELLITE}", "satellite"],
                ["%{BKY_COMMUNICATION_GPS_INFO_ALTITUDE}", "altitude"]
            ]
        }],
        "output": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_GPS_GGA_GETINFORMATIONS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "communication_gps_getGGAInformations_get_type"
        ]
    },

    // BLOCK NFC ST M24SR64 - Read 
    {
        "type": "communication_M24SR64_nfc_readTag",
        "message0": "%{BKY_COMMUNICATION_M24SR64_NFC_READ_TITLE}",
        "output": "String",
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_M24SR64_NFC_READ_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK NFC ST M24SR64 - Write data
    {
        "type": "communication_M24SR64_nfc_writeTag",
        "message0": "%{BKY_COMMUNICATION_M24SR64_WRITE_NFC_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_M24SR64_WRITE_NFC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK NFC ST M24SR64 - Erase data
    {
        "type": "communication_M24SR64_nfc_eraseTag",
        "message0": "%{BKY_COMMUNICATION_M24SR64_NFC_ERASE_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_M24SR64_NFC_ERASE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /** Begin Bluetooth BLE blocks */

    // BLOCK BLE - ST SENSOR APP _ SEND
    {
        "type": "communication_ble_STSensorApp_send",
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_BLE_STSENSORAPP_SEND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_ble_STSensorApp_send_init_extension"
        ],
        "mutator": "communication_ble_STSensorApp_send_mutator"
    },

    // BLOCK BLE - ST SENSOR APP _ SERVICE
    {
        "type": "communication_ble_STSensorApp_service",
        "message0": "%{BKY_COMMUNICATION_BLE_STSENSORAPP_SERVICE_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "SERVICE",
            "options": [
                ["%{BKY_COMMUNICATION_BLE_STSENSORAPP_SERVICE_FIRST_TEMPERATURE}", "FIRST_TEMPERATURE"],
                ["%{BKY_COMMUNICATION_BLE_STSENSORAPP_SERVICE_SECOND_TEMPERATURE}", "SECOND_TEMPERATURE"],
                ["%{BKY_COMMUNICATION_BLE_STSENSORAPP_SERVICE_HUMIDITY}", "HUMIDITY"],
                ["%{BKY_COMMUNICATION_BLE_STSENSORAPP_SERVICE_PRESSURE}", "PRESSURE"],
                ["%{BKY_COMMUNICATION_BLE_STSENSORAPP_SERVICE_LUMINOSITY}", "LUMINOSITY"],
                ["%{BKY_COMMUNICATION_BLE_STSENSORAPP_SERVICE_CO_SENSOR}", "CO_SENSOR"],
                ["%{BKY_COMMUNICATION_BLE_STSENSORAPP_SERVICE_ACCELEROMETER}", "ACCELEROMETER"]
            ]
        }],
        "inputsInline": true,
        "output": "String",
        "tooltip": "%{BKY_COMMUNICATION_BLE_STSENSORAPP_SERVICE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "communication_ble_STSensorApp_service_init_extension"
        ],
        "mutator": "communication_ble_STSensorApp_service_mutator"
    },

    //BLOCK STM32 Bluetooth - Send Data
    {
        "type": "communication_BLE_SendData",
        "message0": "%{BKY_COMMUNICATION_BLE_SEND_DATA_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_BLE_SEND_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // BLOCK Bluetooth - SEND to fizziq 
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
    },

    // //BLOCK STM32 Bluetooth - Read DATA
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

    /*Begin UART transmission blocks*/

    // BLOCK UART INIT
    {
        "type": "communication_uartInit",
        "message0": "%{BKY_COMMUNICATION_UART_INIT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UART",
            "options": Blockly.Constants.Pins.UART[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "input_value",
            "name": "BAUD",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_UART_INIT_TOOLTIP}",
    },

    // BLOCK UART WRITE 
    {
        "type": "communication_uartWrite",
        "message0": "%{BKY_COMMUNICATION_UART_WRITE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }, {
            "type": "field_grid_dropdown",
            "name": "UART",
            "options": Blockly.Constants.Pins.UART[Blockly.Constants.getSelectedBoard()]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_UART_WRITE_TOOLTIP}",
    },
    /* Begin  L476 - LoRa module */

    // INIT 
    {
        "type": "communication_loraInit",
        "message0": "%{BKY_COMMUNICATION_LORA_INIT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "APPEUI"
        }, {
            "type": "input_value",
            "name": "APPKEY"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_LORA_INIT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_lora_init_extension"
        ],
        "mutator": "communication_lora_init_mutator",
    },
    // SEND
    {
        "type": "communication_loraSend",
        "message0": "%{BKY_COMMUNICATION_LORA_SEND_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_LORA_SEND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_loraSend_init_extension"
        ],
        "mutator": "communication_loraSend_mutator"
    },
]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Communication = Object.create(null);

/**
 * Performs final setup of 'communication_ble_STSensorApp_send' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Communication.COMMUNICATION_BLE_STSENSORAPP_SEND_INIT_EXTENSION = function () {
    this.itemCount_ = 1;
    this.updateShape_();
};

/**
 * Mixin for mutator functions in the 'communication_ble_STSensorApp_send_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Communication.COMMUNICATION_BLE_STSENSORAPP_SEND_MUTATOR_MIXIN = {
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
        // Add a data block
        if (this.itemCount_ > 1) {
            this.addDataFormatBlock();
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
        top.appendField(Blockly.Msg['COMMUNICATION_BLE_STSENSORAPP_SEND_TITLE']);
        top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
        if (this.itemCount_ > 1) {
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
        }
        for (var i = 0; i < this.itemCount_; i++) {
            this.appendValueInput('ADD' + i);
        }
        this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);
    },
    addDataFormatBlock: function () {
        var dataBlockName = "communication_ble_STSensorApp_service";
        if (Blockly.Blocks[dataBlockName]) {
            var newBlock = Blockly.utils.xml.createElement('block');
            newBlock.setAttribute('type', dataBlockName);
            if (newBlock) {
                var id = Blockly.utils.genUid()
                newBlock.setAttribute('id', id);

                var field = Blockly.utils.xml.createElement('field');
                field.setAttribute('name', 'SERVICE');
                field.appendChild(Blockly.utils.xml.createTextNode(Blockly.Msg['COMMUNICATION_VALUE'] + this.itemCount_));
                newBlock.appendChild(field);

                Blockly.Xml.domToBlock(newBlock, this.workspace);
                var block = this.workspace.getBlockById(id);
                this.valueConnections_.push(block.outputConnection);
                block.updateService_(false);
            }
        }
    }
};

/**
 * Mixin for mutator functions in the 'communication_ble_STSensorApp_service_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Communication.COMMUNICATION_BLE_STSENSORAPP_SERVICE_MUTATOR_MIXIN = {
    /**
     * Create XML to represent whether there is an 'acc' input.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('isAcce', !!this.isAcce_);
        return container;
    },
    /**
     * Parse XML to restore the 'AT' input.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        const isAcce = (xmlElement.getAttribute('isAcce') != 'false');
        this.updateService_(isAcce);
    },
    /**
     * Create or delete an input for the numeric index.
     * @param {boolean} isAcce True if the input should exist.
     * @private
     * @this {Blockly.Block}
     */
    updateService_: function (isAcce) {
        if (isAcce) {
            if (this.getInput('DATA0') && this.getInput('DATA0_FIELD')) {
                this.removeInput('DATA0', true);
                this.removeInput('DATA0_FIELD', true);
            }
            const datas = ['x', 'y', 'z'];
            for (var i = 0; i < 3; i++) {
                if (!this.getInput('DATA' + i) && !this.getInput('DATA' + i + '_FIELD')) {
                    this.appendDummyInput('DATA' + i + '_FIELD')
                        .appendField(datas[i]);
                    this.appendValueInput('DATA' + i).setCheck('Number');
                }
            }
        } else {
            for (var i = 2; i > -1; i--) {
                if (this.getInput('DATA' + i) && this.getInput('DATA' + i + '_FIELD')) {
                    this.removeInput('DATA' + i, true);
                    this.removeInput('DATA' + i + '_FIELD', true);
                }
            }
            if (!this.getInput('DATA0') && !this.getInput('DATA0_FIELD')) {
                this.appendDummyInput('DATA0_FIELD')
                    .appendField(Blockly.Msg["COMMUNICATION_BLE_STSENSORAPP_SERVICE_VALUE"]);
                this.appendValueInput('DATA0').setCheck('Number');
            }
        }
        this.isAcce_ = isAcce;
    }
};

/**
 * Does the initial mutator update of 'communication_ble_STSensorApp_service' and adds the tooltip
 * @this {Blockly.Block}
 */
Blockly.Constants.Communication.COMMUNICATION_BLE_STSENSORAPP_SERVICE_INIT_EXTENSION = function () {
    var dropdown = this.getField('SERVICE');
    dropdown.setValidator(function (value) {
        const isAcce = value == 'ACCELEROMETER';
        if (isAcce != this.isAcce_) {
            var block = this.getSourceBlock();
            block.updateService_(isAcce);
        }
    });
};
/**
 * Performs final setup of 'communication_loraInit' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Communication.COMMUNICATION_LORA_INIT_EXTENSION = function () {
    this.devaddr_ = false;
    this.setInputsInline(false);
    this.update_();
};

/**
 * Performs final setup of a 'communication_lora_send' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Communication.COMMUNICATION_LORA_SEND_INIT_EXTENSION = function () {
    this.itemCount_ = 1;
    this.setInputsInline(false);
    this.updateShape_();
};

/**
 * Mixin for mutator functions in the 'COMMUNICATION_LORA_INIT_MIXIN' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Communication.COMMUNICATION_LORA_INIT_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('devaddr', 'COMMUNICATION_LORA_INIT', 'text', '24 40 00 7C');

/**
 * Mixin for mutator functions in the 'communication_loraSend_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Communication.COMMUNICATION_LORASEND_MUTATOR_MIXIN = {
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
                    console.log(shadowDom);
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
        var showHorizontalList = this.itemCount_ <= 1;
        this.setInputsInline(showHorizontalList);
        this.setOutputShape(showHorizontalList ? Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE);
    }
};

// Initialization extensions
Blockly.Extensions.register("communication_lora_init_extension",
    Blockly.Constants.Communication.COMMUNICATION_LORA_INIT_EXTENSION);

Blockly.Extensions.register('communication_loraSend_init_extension',
    Blockly.Constants.Communication.COMMUNICATION_LORA_SEND_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator('communication_lora_init_mutator',
    Blockly.Constants.Communication.COMMUNICATION_LORA_INIT_MIXIN);

Blockly.Extensions.registerMutator('communication_loraSend_mutator',
    Blockly.Constants.Communication.COMMUNICATION_LORASEND_MUTATOR_MIXIN);

// Initialization extensions
Blockly.Extensions.register("communication_ble_STSensorApp_send_init_extension",
    Blockly.Constants.Communication.COMMUNICATION_BLE_STSENSORAPP_SEND_INIT_EXTENSION);

Blockly.Extensions.register("communication_ble_STSensorApp_service_init_extension",
    Blockly.Constants.Communication.COMMUNICATION_BLE_STSENSORAPP_SERVICE_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator('communication_ble_STSensorApp_send_mutator',
    Blockly.Constants.Communication.COMMUNICATION_BLE_STSENSORAPP_SEND_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('communication_ble_STSensorApp_service_mutator',
    Blockly.Constants.Communication.COMMUNICATION_BLE_STSENSORAPP_SERVICE_MUTATOR_MIXIN);