Blockly.Msg.boardName = 'Raspberry Pi Pico';

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
  'network_HTML_Tags'
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
    ["GP25", "p25"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["D16", "p16"],
    ["D18", "p18"],
    ["D20", "p20"]
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
    ["D18", "p18"],
    ["D20", "p20"]
  ]
};

// do not add spaces in the pin objects between sda and scl
Blockly.Constants.Pins.I2C = {
  [BOARD_PI_PICO]: [
    ["I2C0-0", '{"scl":1,"sda":0}'],
    ["I2C1-0", '{"scl":3,"sda":2}'],
    ["I2C0-1", '{"scl":5,"sda":4}'],
    ["I2C1-1", '{"scl":7,"sda":6}'],
    ["I2C0-2", '{"scl":9,"sda":8}'],
    ["I2C1-2", '{"scl":11,"sda":10}'],
    ["I2C0-3", '{"scl":13,"sda":12}'],
    ["I2C1-3", '{"scl":15,"sda":14}'],
    ["I2C0-4", '{"scl":17,"sda":16}'],
    ["I2C1-4", '{"scl":19,"sda":18}'],
    ["I2C0-5", '{"scl":21,"sda":20}'],
    ["I2C0-5", '{"scl":27,"sda":26}'],
  ],
  [BOARD_SHIELD_GROVE]: [
    ["I2C0", '{"scl":9,"sda":8}'],
    ["I2C1", '{"scl":7,"sda":6}']
  ]
};