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
    ["0", "0"],
    ["1", "1"],
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
    ["A3", "A3"],
    ["A4", "A4"],
    ["A5", "A5"]
  ]
};

//arduino read analog
Blockly.Constants.Pins.analog_read = {
  [BOARD_ARDUINO_UNO]: [
    ["A0", "A0"],
    ["A1", "A1"],
    ["A2", "A2"],
    ["A3", "A3"],
    ["A4", "A4"],
    ["A5", "A5"]
  ]
};

//arduino pwm pins
Blockly.Constants.Pins.PWM = {
  [BOARD_ARDUINO_UNO]: [
    ["3", "3"],
    ["5", "5"],
    ["6", "6"],
    ["9", "9"],
    ["10", "10"],
    ["11", "11"]
  ]
};