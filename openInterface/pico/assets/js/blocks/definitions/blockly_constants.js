Blockly.Msg.Esp32BoardName = 'Raspberry Pi Pico';

Blockly.Constants.HTML_BLOCKS = [
  'network_html_addTitle',
  'network_html_addText',
  'network_html_addButton',
  'network_html_addSlider',
  'network_html_addSwitch',
  'network_html_addGauge',
  'network_html_addLink',
  'network_html_addImage',
  'network_HTML_Tags',
  'network_HTML_formatText',
  'network_HTML_newline',
  'network_HTML_addSymbol',
  'network_HTML_add'
];

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
  [BOARD_PI_PICO]: [
    ["GP0", "p0"],
    ["GP1", "p1"],
    ["GP2", "p2"],
    ["GP3", "p3"],
    ["GP4", "p4"],
    ["GP5", "p5"],
    ["GP6", "p6"],
    ["GP7", "p7"],
    ["GP8", "p8"],
    ["GP9", "p9"],
    ["GP10", "p10"],
    ["GP11", "p11"],
    ["GP12", "p12"],
    ["GP13", "p13"],
    ["GP14", "p14"],
    ["GP15", "p15"],
    ["GP16", "p16"],
    ["GP17", "p17"],
    ["GP18", "p18"],
    ["GP19", "p19"],
    ["GP20", "p20"],
    ["GP21", "p21"],
    ["GP22", "p22"],
    ["GP25", "p25"],
    ["GP26", "p26"],
    ["GP27", "p27"],
    ["GP28", "p28"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["D16", "p16"],
    ["D17", "p17"],
    ["D18", "p18"],
    ["D19", "p19"],
    ["D20", "p20"],
    ["D21", "p21"],
    ["TX (UART0)", "p0"],
    ["RX (UART0)", "p1"],
    ["TX (UART1)", "p4"],
    ["RX (UART1)", "p5"],
    ["SDA (I2C0)", "p8"],
    ["SCL (I2C0)", "p9"],
    ["SDA (I2C1)", "p6"],
    ["SCL (I2C1)", "p7"],
    ["A0", "p26"],
    ["A1", "p27"],
    ["A2", "p28"]
  ]
};

Blockly.Constants.Pins.PWM = {
  [BOARD_PI_PICO]: [
    ["GP0", "p0"],
    ["GP1", "p1"],
    ["GP2", "p2"],
    ["GP3", "p3"],
    ["GP4", "p4"],
    ["GP5", "p5"],
    ["GP6", "p6"],
    ["GP7", "p7"],
    ["GP8", "p8"],
    ["GP9", "p9"],
    ["GP10", "p10"],
    ["GP11", "p11"],
    ["GP12", "p12"],
    ["GP13", "p13"],
    ["GP14", "p14"],
    ["GP15", "p15"],
    ["GP16", "p16"],
    ["GP17", "p17"],
    ["GP18", "p18"],
    ["GP19", "p19"],
    ["GP20", "p20"],
    ["GP21", "p21"],
    ["GP22", "p22"],
    ["GP26", "p26"],
    ["GP27", "p27"],
    ["GP28", "p28"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["D16", "p16"],
    ["D17", "p17"],
    ["D18", "p18"],
    ["D19", "p19"],
    ["D20", "p20"],
    ["D21", "p21"],
    ["TX (UART0)", "p0"],
    ["RX (UART0)", "p1"],
    ["TX (UART1)", "p4"],
    ["RX (UART1)", "p5"],
    ["SDA (I2C0)", "p8"],
    ["SCL (I2C0)", "p9"],
    ["SDA (I2C1)", "p6"],
    ["SCL (I2C1)", "p7"],
    ["A0", "p26"],
    ["A1", "p27"],
    ["A2", "p28"]
  ]
};

Blockly.Constants.Pins.analog_read = {
  [BOARD_PI_PICO]: [
    ["GP26", "p26"],
    ["GP27", "p27"],
    ["GP28", "p28"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["A0", "p26"],
    ["A1", "p27"],
    ["A2", "p28"]
  ]
};

Blockly.Constants.Pins.UART = {
  [BOARD_PI_PICO]: [
    ["1", "1"],
    ["0", "0"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["1", "1"],
    ["0", "0"]
  ]
};

Blockly.Constants.Pins.SPI = {
  [BOARD_PI_PICO]: [
    ["0", "0"],
    ["1", "1"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["0", "0"],
    ["1", "1"]
  ],
};

// do not add spaces in the pin objects between sda and scl
Blockly.Constants.Pins.I2C = {
  [BOARD_PI_PICO]: [
    ["I2C0", '0'],
    ["I2C1", '1']
  ],
  [BOARD_SHIELD_GROVE]: [
    ["I2C0", '0'],
    ["I2C1", '1']
  ]
};