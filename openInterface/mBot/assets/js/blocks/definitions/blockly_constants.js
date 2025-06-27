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
    'communication_onSerialDataReceived'
  ],
  BLOCKS_INT_VAR: [
    'controls_for'
  ],
  /**
   * @return {String} variable name
   * @this {Blockly.Block}
   */
  getVarName: function() {
    return this.workspace.getVariableById(this.getFieldValue('VAR')).name;
  },
  /**
   * @return {Blockly.Type} type
   * @this {Blockly.Block}
   */
  getVarType: function() {
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
  [BOARD_CORE_1]: [
    ["D0", "0"],
    ["D1", "1"],
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
  ]
};

//arduino read analog
Blockly.Constants.Pins.analog_read = {
  [BOARD_CORE_1]: [
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
  [BOARD_CORE_1]: [
    ["D3", "3"],
    ["D5", "5"],
    ["D6", "6"],
    ["D9", "9"],
    ["D10", "10"],
    ["D11", "11"]
  ]
};

//mBot ports
Blockly.Constants.Pins.MBOT_DIGITAL_PINS = [
    ["1", "PORT_1"],
    ["2", "PORT_2"],
    ["3", "PORT_3"],
    ["4", "PORT_4"]
];

//mBot ports
Blockly.Constants.Pins.MBOT_ANALOG_PINS = [
    ["1", "PORT_1"],
    ["2", "PORT_2"]
];

//mBot slots of RJ45 adapter
Blockly.Constants.Pins.MBOT_SLOT = [
    ["1", "1"],
    ["2", "2"]
];