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
    ["P7", "'P7'"],
    ["P10", "'P10'"],
    ["P11", "'P11'"]
  ]
};

// Timer and channel of the PWM pins (STM32WB55: P7 = PA9, P10 = PA6, P11 = PA8, see
// https://wiki.steami.cc/docs/hardware/pin-mapping/edge-connector and the STM32WB55 alternate functions)
Blockly.Constants.Pins.PWM_TIMERS = {
  "'P7'": 'TIM1_CH2',
  "'P10'": 'TIM16_CH1',
  "'P11'": 'TIM1_CH1'
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