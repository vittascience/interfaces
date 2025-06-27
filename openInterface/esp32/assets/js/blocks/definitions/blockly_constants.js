Blockly.Msg.boardName = 'ESP32';

Blockly.Constants.HTML_BLOCKS = [
  'network_html_addTitle',
  'network_html_addText',
  'network_html_addButton',
  'network_html_addSlider',
  'network_html_addSwitch',
  'network_html_addGauge',
  'network_html_addLink',
  'network_html_addImage',
  'network_html_addStream',
  'network_HTML_Tags',
  'network_HTML_formatText',
  'network_HTML_newline',
  'network_HTML_addSymbol'
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
  [BOARD_WEMOS_D1R32]: [
    ["IO02", "p2"],
    ["IO04", "p4"],
    ["IO05", "p5"],
    ["IO12", "p12"],
    ["IO13", "p13"],
    ["IO14", "p14"],
    ["IO16", "p16"],
    ["IO17", "p17"],
    ["IO18", "p18"],
    ["IO19", "p19"],
    ["IO23", "p23"],
    ["IO25", "p25"],
    ["IO26", "p26"],
    ["IO27", "p27"],
    ["RX0", "p3"],
    ["TX0", "p1"],
    ["SDA", "p21"],
    ["SCL", "p22"],
    ["OD", "p0"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["D2", "p26"],
    ["D3", "p25"],
    ["D4", "p17"],
    ["D5", "p16"],
    ["D6", "p27"],
    ["D7", "p14"],
    ["D8", "p12"],
    ["D9", "p13"],
    ["D10", "p5"],
    ["D11", "p23"],
    ["D12", "p19"],
    ["D13", "p18"]
  ],
  [BOARD_ESP32_WROOM_32D]: [
    ["D2", "p2"],
    ["D4", "p4"],
    ["D5", "p5"],
    ["D12", "p12"],
    ["D13", "p13"],
    ["D14", "p14"],
    ["D15", "p15"],
    ["D18", "p18"],
    ["D19", "p19"],
    ["D21", "p21"],
    ["D22", "p22"],
    ["D23", "p23"],
    ["D25", "p25"],
    ["D26", "p26"],
    ["D27", "p27"],
    ["D32", "p32"],
    ["D33", "p33"],
    ["RX2", "p16"],
    ["TX2", "p17"]
  ]
};
Blockly.Constants.Pins.digital[[BOARD_EDU_ESP32]] = Blockly.Constants.Pins.digital[BOARD_WEMOS_D1R32];
Blockly.Constants.Pins.digital[[BOARD_SHIELD_GROVE_EDU_ESP32]] = Blockly.Constants.Pins.digital[BOARD_SHIELD_GROVE];

Blockly.Constants.Pins.analog_read = {
  [BOARD_WEMOS_D1R32]: [
    ["IO02", "p2"],
    ["IO04", "p4"],
    ["IO35", "p35"],
    ["IO34", "p34"],
    ["IO36", "p36"],
    ["IO39", "p39"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["A0", "p2"],
    ["A1", "p4"],
    ["A2", "p35"],
    ["A3", "p34"]
  ],
  [BOARD_ESP32_WROOM_32D]: [
    ["D32", "p32"],
    ["D33", "p33"],
    ["D34", "p34"],
    ["D35", "p35"],
    ["VN", "p39"],
    ["VP", "p36"]
  ],
  [BOARD_EDU_ESP32]: [
    ["IO33", "p33"],
    ["IO32", "p32"],
    ["IO35", "p35"],
    ["IO34", "p34"],
    ["IO36", "p36"],
    ["IO39", "p39"]
  ],
  [BOARD_SHIELD_GROVE_EDU_ESP32]: [
    ["A0", "p33"],
    ["A1", "p32"],
    ["A2", "p35"],
    ["A3", "p34"]
  ],
};

Blockly.Constants.Pins.DAC = {
  [BOARD_WEMOS_D1R32]: [
    ["IO25", "p25"],
    ["IO26", "p26"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["D2", "p26"],
    ["D3", "p25"]
  ],
  [BOARD_ESP32_WROOM_32D]: [
    ["D25", "p25"],
    ["D26", "p26"]
  ]
};
Blockly.Constants.Pins.DAC[[BOARD_EDU_ESP32]] = Blockly.Constants.Pins.DAC[BOARD_WEMOS_D1R32];
Blockly.Constants.Pins.DAC[[BOARD_SHIELD_GROVE_EDU_ESP32]] = Blockly.Constants.Pins.DAC[BOARD_SHIELD_GROVE];

Blockly.Constants.Pins.PWM = {
  [BOARD_WEMOS_D1R32]: [
    ["IO02", "p2"],
    ["IO04", "p4"],
    ["IO05", "p5"],
    ["IO12", "p12"],
    ["IO13", "p13"],
    ["IO14", "p14"],
    ["IO15", "p15"],
    ["IO16", "p16"],
    ["IO17", "p17"],
    ["IO18", "p18"],
    ["IO19", "p19"],
    ["IO23", "p23"],
    ["IO25", "p25"],
    ["IO26", "p26"],
    ["IO27", "p27"],
    ["IO32", "p33"],
    ["TX0", "p1"],
    ["RX0", "p3"],
    ["SDA", "p21"],
    ["SCL", "p22"],
    ["OD", "p0"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["D2", "p26"],
    ["D3", "p25"],
    ["D4", "p17"],
    ["D5", "p16"],
    ["D6", "p27"],
    ["D7", "p14"],
    ["D8", "p12"],
    ["D9", "p13"],
    ["D10", "p5"],
    ["D11", "p23"],
    ["D12", "p19"],
    ["D13", "p18"]
  ],
  [BOARD_ESP32_WROOM_32D]: [
    ["D2", "p2"],
    ["D4", "p4"],
    ["D5", "p5"],
    ["D12", "p12"],
    ["D13", "p13"],
    ["D14", "p14"],
    ["D15", "p15"],
    ["D18", "p18"],
    ["D19", "p19"],
    ["D21", "p21"],
    ["D22", "p22"],
    ["D23", "p23"],
    ["D25", "p25"],
    ["D26", "p26"],
    ["D27", "p27"],
    ["D32", "p32"],
    ["D33", "p33"],
    ["D34", "p34"],
    ["D35", "p35"],
    ["RX0", "p3"],
    ["TX0", "p1"],
    ["RX2", "p16"],
    ["TX2", "p17"],
    ["VN", "p39"],
    ["VP", "p36"]
  ]
};
Blockly.Constants.Pins.PWM[[BOARD_EDU_ESP32]] = Blockly.Constants.Pins.PWM[BOARD_WEMOS_D1R32];
Blockly.Constants.Pins.PWM[[BOARD_SHIELD_GROVE_EDU_ESP32]] = Blockly.Constants.Pins.PWM[BOARD_SHIELD_GROVE];

Blockly.Constants.Pins.UART = {
  [BOARD_WEMOS_D1R32]: [
    ["1", "1"],
    ["2", "2"]
  ]
};
Blockly.Constants.Pins.UART[[BOARD_SHIELD_GROVE]] = Blockly.Constants.Pins.UART[BOARD_WEMOS_D1R32];
Blockly.Constants.Pins.UART[[BOARD_ESP32_WROOM_32D]] = Blockly.Constants.Pins.UART[BOARD_WEMOS_D1R32];
Blockly.Constants.Pins.UART[[BOARD_EDU_ESP32]] = Blockly.Constants.Pins.UART[BOARD_WEMOS_D1R32];
Blockly.Constants.Pins.UART[[BOARD_SHIELD_GROVE_EDU_ESP32]] = Blockly.Constants.Pins.UART[BOARD_WEMOS_D1R32];