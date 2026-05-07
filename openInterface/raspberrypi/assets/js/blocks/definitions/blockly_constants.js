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
Blockly.Constants.Pins.digital = {
  'raspberrypi': [
    ["GPIO16", "16"], // board:36
    ["GPI017", "17"], // board: 11
    ["GPIO22", "22"], // board: 15
    ["GPIO23", "23"], // board: 16
    ["GPIO24", "24"], // board: 18
    ["GPIO25", "25"], // board: 22
    ["GPIO26", "26"], // board: 37
    ["GPIO27", "27"], // board: 13
    ["GPIO0 (ID_SD)", "0"], // board: 27
    ["GPIO1 (ID_SC)", "1"], // board: 28
    ["GPIO2 (SDA)", "2"], // board: 3
    ["GPIO3 (SCL)", "3"], // board: 5
    ["GPIO4 (GPCLK0)", "4"], // board: 7
    ["GPIO5 (GPCLK1)", "5"], // board: 29
    ["GPIO6 (GPCLK2)", "6"], // board: 31
    ["GPIO7 (CEI)", "7"], // board: 26
    ["GPIO8 (CEO)", "8"], // board: 24
    ["GPIO9 (MISO)", "9"], // board: 21
    ["GPIO10 (MOSI)", "10"], // board: 19
    ["GPIO11 (SCLK)", "11"], // board: 23
    ["GPIO12 (PWM0)", "12"], // board: 32
    ["GPIO13 (PWM1)", "13"], // board: 33
    ["GPIO14 (TXD)", "14"], // board: 8
    ["GPIO15 (RXD)", "15"], // board: 10
    ["GPIO18 (PWM0 - PCM CLK)", "18"], // board: 12
    ["GPIO19 (PWM1 - PCM FS)", "19"], // board: 35
    ["GPIO20 (PCM DIN)", "20"], // board: 28
    ["GPIO21 (PCM DOUT)", "21"] // board: 40
  ]
};

Blockly.Constants.Pins.PWM = Blockly.Constants.Pins.digital;

Blockly.Constants.Pins.HARDWARE_PWM = {
  'raspberrypi': [
    ["GPIO12 (PWM0)", "12"], // board: 32
    ["GPIO13 (PWM1)", "13"], // board: 33
    ["GPIO18 (PWM0)", "18"], // board: 12
    ["GPIO21 (PCM DOUT)", "21"], // board: 40
    ["GPIO10 (MOSI)", "10"], // board: 19
  ]
};
