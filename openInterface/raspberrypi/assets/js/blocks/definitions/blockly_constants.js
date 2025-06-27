//Raspberry pi Pins GrovePi Hat
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

//Raspberry digital/analog/pins => corresponding GPIO pins
Blockly.Constants.Pins.digital = [
  ["D5", "5"],
  ["D16", "16"],
  ["D18", "18"],
  ["D22", "22"],
  ["D24", "24"],
  ["D26", "26"],
];

//Raspberry analog => corresponding GPIO pins
Blockly.Constants.Pins.analog_read = [
  ["A0", "0"],
  ["A2", "2"],
  ["A4", "4"],
  ["A6", "6"],
];

Blockly.Constants.Pins.PWM = [
  ["PWM", "12"],
  ["D18", "18"],
];
