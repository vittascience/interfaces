Blockly.Msg.Esp32BoardName = 'Arduino UNO R4 WiFi';

Blockly.Constants.HTML_BLOCKS = [
  'network_html_addTitle',
  'network_html_addText',
  'network_html_addButton',
  'network_html_addSlider',
  'network_html_addSwitch',
  'network_html_addGauge',
  'network_html_addLink',
  'network_html_addImage',
  'network_html_addStream',
  'network_HTML_Tags',
  'network_HTML_formatText',
  'network_HTML_newline',
  'network_HTML_addSymbol',
  'network_HTML_add'
];

Blockly.Constants.PRINT_START_N = 1;

Blockly.Constants.LOOP_TYPES = [
  'forever',
  'controls_repeat',
  'controls_forEach',
  'controls_for',
  'controls_whileUntil'
];

Blockly.Constants.Utils.FIELD_VARIABLE_TYPE_GETTER = {
  BLOCKS_STRING_VAR: [
    'text_append',
    'communication_onSerialDataReceived',
    'communication_onSerialBluetoothDataReceived',
    'communication_hc05_onBluetoothDataReceived',
    'communication_hm10_onBluetoothDataReceived',
    'communication_onRadioNRF24_dataReceived',
    'communication_onRadio433mhzDataReceived',
    'communication_onGPSDataReceived'
  ],
  BLOCKS_INT_VAR: [
    'controls_for',
    'communication_onIRDataReceived',
    'communication_onRemoteCommandReceived'
  ],
  /**
   * @return {String} variable name
   * @this {Blockly.Block}
   */
  getVarName: function () {
    return this.workspace.getVariableById(this.getFieldValue('VAR')).name;
  },
  /**
   * @return {Blockly.Type} type
   * @this {Blockly.Block}
   */
  getVarType: function () {
    var index = Blockly.Constants.Utils.FIELD_VARIABLE_TYPE_GETTER.BLOCKS_STRING_VAR.indexOf(this.type);
    if (index != -1) {
      return Blockly.Types.TEXT;
    } else {
      index = Blockly.Constants.Utils.FIELD_VARIABLE_TYPE_GETTER.BLOCKS_INT_VAR.indexOf(this.type);
      if (index != -1) {
        return Blockly.Types.NUMBER;
      } else {
        console.error(`The '${this.getVarName()}' variable's type is not defined. As default, the block '${this.type}' returns the variable as a 'void'. Add block in BLOCKS_STRING_VAR or in BLOCKS_INT_VAR.`);
        return Blockly.Types.NULL;
      }
    }
  }
};

Blockly.Extensions.registerMixin("field_variable_type_getter",
  Blockly.Constants.Utils.FIELD_VARIABLE_TYPE_GETTER);

// Constants object for board pins
Blockly.Constants.Pins = Object.create(null);

//arduino digital/analog pins
Blockly.Constants.Pins.digital = {
  [BOARD_ARDUINO_UNO]: [
    ["D0 (RX)", "0"],
    ["D1 (TX)", "1"],
    ["D2", "2"],
    ["D3", "3"],
    ["D4", "4"],
    ["D5", "5"],
    ["D6", "6"],
    ["D7", "7"],
    ["D8", "8"],
    ["D9", "9"],
    ["D10", "10"],
    ["D11", "11"],
    ["D12", "12"],
    ["D13", "13"],
    ["A0", "A0"],
    ["A1", "A1"],
    ["A2", "A2"],
    ["A3", "A3"],
    ["A4", "A4"],
    ["A5", "A5"]
  ],
  [BOARD_ARDUINO_NANO]: [
    ["RX0", "0"],
    ["TX1", "1"],
    ["D2", "2"],
    ["D3", "3"],
    ["D4", "4"],
    ["D5", "5"],
    ["D6", "6"],
    ["D7", "7"],
    ["D8", "8"],
    ["D9", "9"],
    ["D10", "10"],
    ["D11", "11"],
    ["D12", "12"],
    ["D13", "13"],
    ["A0", "A0"],
    ["A1", "A1"],
    ["A2", "A2"],
    ["A3", "A3"],
    ["A4", "A4"],
    ["A5", "A5"],
    ["A6", "A6"],
    ["A7", "A7"]
  ],
  [BOARD_ARDUINO_MEGA]: [
    ["RX0", "0"],
    ["TX0", "1"],
    ["D2", "2"],
    ["D3", "3"],
    ["D4", "4"],
    ["D5", "5"],
    ["D6", "6"],
    ["D7", "7"],
    ["D8", "8"],
    ["D9", "9"],
    ["D10 (SS)", "10"],
    ["D11 (MOSI)", "11"],
    ["D12 (MISO)", "12"],
    ["D13 (SCK)", "13"],
    ["D14 (TX3)", "14"],
    ["D15 (RX3)", "15"],
    ["D16 (TX2)", "16"],
    ["D17 (RX2)", "17"],
    ["D18 (RX1)", "18"],
    ["D19 (TX1)", "19"],
    ["D20 (SDA)", "20"],
    ["D21 (SCL)", "21"],
    ["A0", "A0"],
    ["A1", "A1"],
    ["A2", "A2"],
    ["A3", "A3"],
    ["A4", "A4"],
    ["A5", "A5"],
    ["A6", "A6"],
    ["A7", "A7"],
    ["A8", "A8"],
    ["A9", "A9"],
    ["A10", "A10"],
    ["A11", "A11"],
    ["A12", "A12"],
    ["A13", "A13"],
    ["A14", "A14"],
    ["A15", "A15"]
  ],
  [BOARD_ARDUINO_PRO_MINI]: [
    ["RXI", "0"],
    ["TX0", "1"],
    ["2", "2"],
    ["3", "3"],
    ["4", "4"],
    ["5", "5"],
    ["6", "6"],
    ["7", "7"],
    ["8", "8"],
    ["9", "9"],
    ["10", "10"],
    ["11", "11"],
    ["12", "12"],
    ["13", "13"],
    ["A0", "A0"],
    ["A1", "A1"],
    ["A2", "A2"],
    ["A3", "A3"]
  ],
};

Blockly.Constants.Pins.digital[BOARD_ARDUINO_UNO_R4_WIFI] = Blockly.Constants.Pins.digital[BOARD_ARDUINO_UNO];

for (const i in Blockly.Constants.Pins.digital) {
  Blockly.Constants.Pins.digital[i].type = 'digital';
}

//arduino read analog
Blockly.Constants.Pins.analog_read = {
  [BOARD_ARDUINO_UNO]: [
    ["A0", "A0"],
    ["A1", "A1"],
    ["A2", "A2"],
    ["A3", "A3"],
    ["A4", "A4"],
    ["A5", "A5"]
  ],
  [BOARD_ARDUINO_NANO]: [
    ["A0", "A0"],
    ["A1", "A1"],
    ["A2", "A2"],
    ["A3", "A3"],
    ["A4", "A4"],
    ["A5", "A5"],
    ["A6", "A6"],
    ["A7", "A7"]
  ],
  [BOARD_ARDUINO_MEGA]: [
    ["A0", "A0"],
    ["A1", "A1"],
    ["A2", "A2"],
    ["A3", "A3"],
    ["A4", "A4"],
    ["A5", "A5"],
    ["A6", "A6"],
    ["A7", "A7"],
    ["A8", "A8"],
    ["A9", "A9"],
    ["A10", "A10"],
    ["A11", "A11"],
    ["A12", "A12"],
    ["A13", "A13"],
    ["A14", "A14"],
    ["A15", "A15"]
  ],
  [BOARD_ARDUINO_PRO_MINI]: [
    ["A0", "A0"],
    ["A1", "A1"],
    ["A2", "A2"],
    ["A3", "A3"]
  ],
};

Blockly.Constants.Pins.analog_read[BOARD_ARDUINO_UNO_R4_WIFI] = Blockly.Constants.Pins.analog_read[BOARD_ARDUINO_UNO];

for (const i in Blockly.Constants.Pins.analog_read) {
  Blockly.Constants.Pins.analog_read[i].type = 'analog_read';
}

//arduino pwm pins
Blockly.Constants.Pins.PWM = {
  [BOARD_ARDUINO_UNO]: [
    ["D3", "3"],
    ["D5", "5"],
    ["D6", "6"],
    ["D9", "9"],
    ["D10", "10"],
    ["D11", "11"]
  ],
  [BOARD_ARDUINO_NANO]: [
    ["D3", "3"],
    ["D5", "5"],
    ["D6", "6"],
    ["D9", "9"],
    ["D10", "10"],
    ["D11", "11"]
  ],
  [BOARD_ARDUINO_MEGA]: [
    ["D3", "3"],
    ["D4", "4"],
    ["D5", "5"],
    ["D6", "6"],
    ["D7", "7"],
    ["D8", "8"],
    ["D9", "9"],
    ["D10 (SS)", "10"],
    ["D11 (MOSI)", "11"],
    ["D12 (MISO)", "12"],
    ["D13 (SCK)", "13"],
    ["D44", "44"],
    ["D45", "45"],
    ["D46", "46"]
  ],
  [BOARD_ARDUINO_PRO_MINI]: [
    ["3", "3"],
    ["5", "5"],
    ["6", "6"],
    ["9", "9"],
    ["10", "10"],
    ["11", "11"]
  ],
};

Blockly.Constants.Pins.PWM[BOARD_ARDUINO_UNO_R4_WIFI] = Blockly.Constants.Pins.PWM[BOARD_ARDUINO_UNO];

for (const i in Blockly.Constants.Pins.PWM) {
  Blockly.Constants.Pins.PWM[i].type = 'PWM';
}

/**
 * Performs final setup of temperature blocks.
 * @this {Blockly.Block}
 */
Blockly.Constants.Utils.PINS_RX_TX_INIT_EXTENSION = function () {
  const board = Blockly.Constants.getSelectedBoard();
  const checkInput = function (block) {
    if (block.inputList) {
      for (var input of block.inputList) {
        if (input && input.fieldRow && input.fieldRow.length === 4) {
          const fields = input.fieldRow;
          let title = Blockly.Msg['COMMUNICATION_RX_TX_PINS'];
          if (block.type === 'communication_writeOpenLogSd') {
            title = Blockly.Msg['COMMUNICATION_OPENLOG_WRITE_TITLE_PINS'];
          }
          let pins = ['RX', 'TX'];
          if (block.type === 'communication_writeOpenLogSd') {
            pins = ['RXI', 'TXO'];
          }
          if (title.includes(fields[0].value_)
            && fields[1] instanceof Blockly.FieldDropdown
            && pins.includes(fields[2].value_)
            && fields[3] instanceof Blockly.FieldDropdown) {
            if (input.name.length == 0) {
              input.name = "PINS_INPUTS_TO_REMOVE";
              return true;
            }
          }
        }
      }
    }
  };
  if (board == BOARD_ARDUINO_UNO_R4_WIFI) {
    checkInput(this);
    if (this.getInput('PINS_INPUTS_TO_REMOVE')) {
      this.removeInput("PINS_INPUTS_TO_REMOVE")
    }
  }
};

Blockly.Extensions.register('pins_management_rxtx',
  Blockly.Constants.Utils.PINS_RX_TX_INIT_EXTENSION);