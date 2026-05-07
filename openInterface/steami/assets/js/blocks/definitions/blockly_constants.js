Blockly.Constants.PRINT_START_N = 0;

Blockly.Constants.LOOP_TYPES = [
  'forever',
  'scratch_forever',
  'controls_repeat',
  'controls_forEach',
  'controls_for',
  'controls_whileUntil'
];

// Constants object for board pins
Blockly.Constants.Pins = Object.create(null);

Blockly.Constants.Pins.digital = {
  [BOARD_STEAMI]: [
    ["P0", "'P0'"],
    ["P1", "'P1'"],
    ["P2", "'P2'"],
    ["P3", "'P3'"],
    ["P4", "'P4'"],
    ["P5", "'P5'"],
    ["P6", "'P6'"],
    ["P7", "'P7'"],
    ["P8", "'P8'"],
    ["P9", "'P9'"],
    ["P10", "'P10'"],
    ["P11", "'P11'"],
    ["P12", "'P12'"],
    ["P13", "'P13'"],
    ["P14", "'P14'"],
    ["P15", "'P15'"],
    ["P16", "'P16'"]
  ]
};

Blockly.Constants.Pins.PWM = {
  [BOARD_STEAMI]: [
    ["D3", "'TIM1_CH3'"],
    ["D5", "'TIM2_CH1'"],
    ["D6", "'TIM1_CH1'"],
    ["D9", "'TIM1_CH2'"],
    ["D11", "'TIM17_CH1'"],
    ["D12", "'TIM16_CH1'"]
  ]
};

Blockly.Constants.Pins.analog_read = {
  [BOARD_STEAMI]: [
    ["P0", "'P0'"],
    ["P1", "'P1'"],
    ["P2", "'P2'"],
    ["P3", "'P3'"],
    ["P4", "'P4'"],
    ["P10", "'P10'"]
  ]
};

Blockly.Constants.Pins.UART = {
  [BOARD_STEAMI]: [
    ["2", "2"],
    ["1", "1"]
  ]
};