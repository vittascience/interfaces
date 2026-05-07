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

//micro:bit digital/analog/touch pins
Blockly.Constants.Pins.digital = {
  'microbit': [
    ["P0", "pin0"],
    ["P1", "pin1"],
    ["P2", "pin2"],
    ["P8", "pin8"],
    ["P12", "pin12"],
    ["P13", "pin13"],
    ["P14", "pin14"],
    ["P15", "pin15"],
    ["P16", "pin16"],
    ["pin_speaker (V2)", "pin_speaker"],
    ["P19 (SDA)", "pin19"],
    ["P20 (SCL)", "pin20"],
    ["P5 (A)", "pin5"],
    ["P11 (B)", "pin11"],
    ["P3 (display)", "pin3"],
    ["P4 (display)", "pin4"],
    ["P6 (display)", "pin6"],
    ["P7 (display)", "pin7"],
    ["P9 (display)", "pin9"],
    ["P10 (display)", "pin10"]
  ]
};

//micro:bit pwm
Blockly.Constants.Pins.PWM = {
  'microbit': [
    ["P0", "pin0"],
    ["P1", "pin1"],
    ["P2", "pin2"],
    ["P8", "pin8"],
    ["P12", "pin12"],
    ["P13", "pin13"],
    ["P14", "pin14"],
    ["P15", "pin15"],
    ["P16", "pin16"]
  ]
};

//micro:bit read analog
Blockly.Constants.Pins.analog_read = {
  'microbit': [
    ["P0", "pin0"],
    ["P1", "pin1"],
    ["P2", "pin2"],
    ["P3 (display)", "pin3"],
    ["P4 (display)", "pin4"],
    ["P10 (display)", "pin10"]
  ]
};

//micro:bit touch
Blockly.Constants.Pins.MICROBIT_TOUCH_PINS = [
  ["LOGO", "pin_logo"],
  ["P0", "pin0"],
  ["P1", "pin1"],
  ["P2", "pin2"]
];

//maqueen plus pins
Blockly.Constants.Pins.MICROBIT_MAQUEEN_PLUS_PINS = [
  ["P0", "pin0"],
  ["P1", "pin1"],
  ["P2", "pin2"],
  ["P8", "pin8"],
  ["P12", "pin12"],
  ["P13", "pin13"],
  ["P14", "pin14"],
  ["P15", "pin15"],
];
