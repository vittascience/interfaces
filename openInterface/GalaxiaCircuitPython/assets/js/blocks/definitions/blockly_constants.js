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

//galaxia digital/analog/touch pins
Blockly.Constants.Pins.GALAXIA_PINS = [
  ["P0", "P0"],
  ["P1", "P1"],
  ["P2", "P2"],
  ["P6", "P6"],
  ["P7", "P7"],
  ["P8", "P8"],
  ["P13", "P13"],
  ["P14", "P14"],
  ["P15", "P15"],
  ["P16", "P16"],
  ["P19", "P19"],
  ["P20", "P20"]
];

Blockly.Constants.Pins.GALAXIA_ANALOG_READ_PINS = [
  ["P0", "P0"],
  ["P1", "P1"],
  ["P2", "P2"],
  ["P6", "P6"],
  ["P7", "P7"],
  ["P16", "P16"],
  ["P19", "P19"],
  ["P20", "P20"]
];

//galaxia touch
Blockly.Constants.Pins.GALAXIA_TOUCH_PINS = [
  ["P0", "P0"],
  ["P1", "P1"],
  ["P2", "P2"]
];