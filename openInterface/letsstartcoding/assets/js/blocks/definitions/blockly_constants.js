Blockly.Constants.PRINT_START_N = 1;

Blockly.Constants.LOOP_TYPES = [
  'forever',
  'controls_repeat',
  'controls_forEach',
  'controls_for',
  'controls_whileUntil'
];

Blockly.Types.UINT8_T = new Blockly.Type({ typeId: "Uint8_t", typeMsgName: "ARD_TYPE_UINT8_T", compatibleTypes: [] });
Blockly.Types.UINT16_T = new Blockly.Type({ typeId: "Uint16_t", typeMsgName: "ARD_TYPE_UINT16_T", compatibleTypes: [] });
Blockly.Types.UINT32_T = new Blockly.Type({ typeId: "Uint32_t", typeMsgName: "ARD_TYPE_UINT32_T", compatibleTypes: [] });

Blockly.Constants.Utils.FIELD_VARIABLE_TYPE_GETTER = {

  BLOCKS_VARIABLE_TYPES: {
    'text_append': Blockly.Types.TEXT,
    'controls_for': Blockly.Types.NUMBER
  },
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
    const varType = Blockly.Constants.Utils.FIELD_VARIABLE_TYPE_GETTER.BLOCKS_VARIABLE_TYPES[this.type];
    if (varType) {
      return varType;
    } else {
      console.error(`The '${this.getVarName()}' variable's type is not defined. As default, the block '${this.type}' returns the variable as a 'void'. Add variable type of block in BLOCKS_VARIABLE_TYPES.`);
      return Blockly.Types.NULL;
    }
  }
};

Blockly.Extensions.registerMixin("field_variable_type_getter",
  Blockly.Constants.Utils.FIELD_VARIABLE_TYPE_GETTER);

// Constants object for board pins
Blockly.Constants.Pins = Object.create(null);

//arduino digital/analog pins
Blockly.Constants.Pins.digital = {
  [BOARD_ARDUINO_NANO]: [
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
  [BOARD_ARDUINO_NANO]: [
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
  [BOARD_ARDUINO_NANO]: [
    ["3", "3"],
    ["5", "5"],
    ["6", "6"],
    ["9", "9"],
    ["10", "10"],
    ["11", "11"]
  ]
};