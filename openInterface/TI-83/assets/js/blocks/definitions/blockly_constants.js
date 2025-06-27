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

// Innovator Hub digital inputs
Blockly.Constants.Pins.HUB_DIGITAL_INPUTS = [
  ["IN 1", "IN 1"],
  ["IN 2", "IN 2"],
  ["IN 3", "IN 3"],
  ["BB 1", "BB 1"],
  ["BB 2", "BB 2"],
  ["BB 3", "BB 3"],
  ["BB 4", "BB 4"],
  ["BB 5", "BB 5"],
  ["BB 6", "BB 6"],
  ["BB 7", "BB 7"],
  ["BB 8", "BB 8"],
  ["BB 9", "BB 9"],
  ["BB 10", "BB 10"]
];

// Innovator Hub analog inputs
Blockly.Constants.Pins.HUB_ANALOG_INPUTS = [
  ["IN 1", "IN 1"],
  ["IN 2", "IN 2"],
  ["IN 3", "IN 3"],
  ["BB 5", "BB 5"],
  ["BB 6", "BB 6"],
  ["BB 7", "BB 7"]
];

// Innovator Hub digital outputs
Blockly.Constants.Pins.HUB_DIGITAL_OUTPUTS = [
  ["OUT 1", "OUT 1"],
  ["OUT 2", "OUT 2"],
  ["OUT 3", "OUT 3"],
  ["BB 1", "BB 1"],
  ["BB 2", "BB 2"],
  ["BB 3", "BB 3"],
  ["BB 4", "BB 4"],
  ["BB 5", "BB 5"],
  ["BB 6", "BB 6"],
  ["BB 7", "BB 7"],
  ["BB 8", "BB 8"],
  ["BB 9", "BB 9"],
  ["BB 10", "BB 10"]
];

// Innovator Hub pwm pins
Blockly.Constants.Pins.HUB_PWM_PINS = [
  ["OUT 1", "OUT 1"],
  ["OUT 2", "OUT 2"],
  ["OUT 3", "OUT 3"],
  ["BB 4", "BB 4"],
  ["BB 8", "BB 8"],
  ["BB 9", "BB 9"],
  ["BB 10", "BB 10"]
];

// Innovator Hub analog outputs
Blockly.Constants.Pins.HUB_ANALOG_OUTPUTS = Blockly.Constants.Pins.HUB_DIGITAL_OUTPUTS;

// Innovator Hub pwm & 5V pins
Blockly.Constants.Pins.HUB_PWM_PINS_5V = [
  ["OUT 3", "OUT 3"],
  ["BB 4", "BB 4"],
  ["BB 8", "BB 8"],
  ["BB 9", "BB 9"],
  ["BB 10", "BB 10"]
];

//micro:bit digital/analog/touch pins
Blockly.Constants.Pins.MICROBIT_PINS = [
  ["P0","pin0"],
  ["P1","pin1"],
  ["P2","pin2"],
  ["P8","pin8"],
  ["P13","pin13"],
  ["P14","pin14"],
  ["P15","pin15"],
  ["P16","pin16"],
  ["micro:bit v2", "pin_speaker"]
];

//micro:bit read analog
Blockly.Constants.Pins.MICROBIT_ANALOG_READ_PINS = [
  ["P0","pin0"],
  ["P1","pin1"],
  ["P2","pin2"]
];

//micro:bit touch
Blockly.Constants.Pins.MICROBIT_TOUCH_PINS = [
  ["P0","pin0"],
  ["P1","pin1"],
  ["P2","pin2"]
];
