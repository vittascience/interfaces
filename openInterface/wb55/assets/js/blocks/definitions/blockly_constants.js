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
  [BOARD_NUCLEO_WB55]: [
    ["D0", "'D0'"],
    ["D1", "'D1'"],
    ["D2", "'D2'"],
    ["D3", "'D3'"],
    ["D4", "'D4'"],
    ["D5", "'D5'"],
    ["D6", "'D6'"],
    ["D7", "'D7'"],
    ["D8", "'D8'"],
    ["D9", "'D9'"],
    ["D10", "'D10'"],
    ["D11", "'D11'"],
    ["D12", "'D12'"],
    ["D13", "'D13'"],
    ["D14", "'D14'"],
    ["D15", "'D15'"]
  ],
  // shield
  [BOARD_SHIELD_GROVE]: [
    ["RX", "'D0'"],
    ["TX", "'D1'"],
    ["D2", "'D2'"],
    ["D3", "'D3'"],
    ["D4", "'D4'"],
    ["D5", "'D5'"],
    ["D6", "'D6'"],
    ["D7", "'D7'"],
    ["D8", "'D8'"],
    ["D9", "'D9'"]
  ]
};

Blockly.Constants.Pins.PWM = {
  [BOARD_NUCLEO_WB55]: [
    ["D3", "'TIM1_CH3'"],
    ["D5", "'TIM2_CH1'"],
    ["D6", "'TIM1_CH1'"],
    ["D9", "'TIM1_CH2'"],
    ["D11", "'TIM17_CH1'"],
    ["D12", "'TIM16_CH1'"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["D3", "'TIM1_CH3'"],
    ["D5", "'TIM2_CH1'"],
    ["D6", "'TIM1_CH1'"],
    ["D9", "'TIM1_CH2'"]
  ]
};

Blockly.Constants.Pins.analog_read = {
  [BOARD_NUCLEO_WB55]: [
    ["A0", "'A0'"],
    ["A1", "'A1'"],
    ["A2", "'A2'"],
    ["A3", "'A3'"],
    ["A4", "'A4'"],
    ["A5", "'A5'"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["A0", "'A0'"],
    ["A1", "'A1'"],
    ["A2", "'A2'"],
    ["A3", "'A3'"],
    ["A4", "'A4'"]
  ]
};

Blockly.Constants.Pins.UART = {
  [BOARD_NUCLEO_WB55]: [
    ["1", "1"],
    ["2", "2"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["1", "1"],
    ["2", "2"]
  ]
};