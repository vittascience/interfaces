// UNIHIKER M10 and K10
Blockly.Constants.PRINT_START_N = 0;

Blockly.Constants.LOOP_TYPES = [
  'forever',
  'scratch_forever',
  'controls_repeat',
  'controls_forEach',
  'controls_for',
  'controls_whileUntil'
];

// Pins of the edge connector and Gravity ports (P21 to P24): digital, analog (ADC) and PWM ones
// UNIHIKER K10: P0 and P1 on the ESP32-S3 (analog, PWM), the others on the I/O expander (digital only)
const UNIHIKER_DIGITAL_PINS = IS_UNIHIKER_K10
    ? ['P0', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P8', 'P9', 'P10', 'P11', 'P12', 'P13', 'P14', 'P15', 'P19', 'P20']
    : ['P0', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12', 'P13', 'P14', 'P15', 'P16', 'P19', 'P20', 'P21', 'P22', 'P23', 'P24'];
const UNIHIKER_ANALOG_PINS = IS_UNIHIKER_K10 ? ['P0', 'P1'] : ['P0', 'P1', 'P2', 'P3', 'P4', 'P10', 'P21', 'P22'];
const UNIHIKER_PWM_PINS = IS_UNIHIKER_K10 ? ['P0', 'P1'] : ['P0', 'P2', 'P3', 'P8', 'P9', 'P10', 'P16', 'P21', 'P22', 'P23'];

const unihikerPinOptions = (list) => list.map(pin => [pin, pin]);

// Constants object for board pins (also read by the common and micro:bit block definitions)
Blockly.Constants.Pins = Object.create(null);
Blockly.Constants.Pins.digital = { [BOARD_UNIHIKER_M10]: unihikerPinOptions(UNIHIKER_DIGITAL_PINS), [BOARD_UNIHIKER_K10]: unihikerPinOptions(UNIHIKER_DIGITAL_PINS) };
Blockly.Constants.Pins.PWM = { [BOARD_UNIHIKER_M10]: unihikerPinOptions(UNIHIKER_PWM_PINS), [BOARD_UNIHIKER_K10]: unihikerPinOptions(UNIHIKER_PWM_PINS) };
Blockly.Constants.Pins.HARDWARE_PWM = Blockly.Constants.Pins.PWM;
Blockly.Constants.Pins.analog_read = { [BOARD_UNIHIKER_M10]: unihikerPinOptions(UNIHIKER_ANALOG_PINS), [BOARD_UNIHIKER_K10]: unihikerPinOptions(UNIHIKER_ANALOG_PINS) };
Blockly.Constants.Pins.MICROBIT_TOUCH_PINS = unihikerPinOptions(['P0', 'P1', 'P2']);
Blockly.Constants.Pins.MICROBIT_MAQUEEN_PLUS_PINS = unihikerPinOptions(['P0', 'P1', 'P2', 'P8', 'P12', 'P13', 'P14', 'P15']);
