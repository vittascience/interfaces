Blockly.Msg.Esp32BoardName = 'Galaxia';

//galaxia Pins
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

//galaxia digital/analog/touch pins => corresponding GPIO pins
Blockly.Constants.Pins.digital = {
  [BOARD_GALAXIA]: [
    ["P1", "p2"],
    ["P6", "p6"],
    ["P7", "p7"],
    ["P8", "p21"],
    ["P12", "p38"],
    ["P13", "p34"],
    ["P14", "p35"],
    ["P15", "p36"],
    ["P16", "p15"],
    ["P19", "p13"],
    ["P20", "p14"],
    ["P0 (RX0)", "p3"],
    ["P2 (TX0)", "p1"]
  ]
};

Blockly.Constants.Pins.PWM = {
  [BOARD_GALAXIA]: [
    ["P1", "p2"],
    ["P6", "p6"],
    ["P7", "p7"],
    ["P8", "p21"],
    ["P12", "p38"],
    ["P13", "p34"],
    ["P14", "p35"],
    ["P15", "p36"],
    ["P16", "p15"],
    ["P19", "p13"],
    ["P20", "p14"],
    ["P0 (RX0)", "p3"],
    ["P2 (TX0)", "p1"]
  ]
};

//galaxia analog => corresponding GPIO pins
Blockly.Constants.Pins.analog_read = {
  [BOARD_GALAXIA]: [
    ["P1", "p2"],
    ["P6", "p6"],
    ["P7", "p7"],
    ["P16", "p15"],
    ["P19", "p13"],
    ["P20", "p14"],
    ["P0 (RX0)", "p3"],
    ["P2 (TX0)", "p1"]
  ]
};

Blockly.Constants.Pins.UART = {
  [BOARD_GALAXIA]: [
    ["1", "1"],
    ["0", "0"]
  ]
};

//galaxia touch => corresponding GPIO pins
Blockly.Constants.Pins.touch = {
  [BOARD_GALAXIA]: [
    ["P0", "p3"],
    ["P1", "p2"],
    ["P2", "p1"],
    ["P6", "p6"],
    ["P7", "p7"]
  ]
};

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

Blockly.Constants.GALAXIA_DISPLAY_IMAGES = [
  ["%{BKY_DISPLAY_GALAXIA_IMAGE_VITTABOT_HEY}", "vittabot-hey.bmp"],
  ["%{BKY_DISPLAY_GALAXIA_IMAGE_VITTABOT_ANGRY}", "vittabot-angry.bmp"],
  ["%{BKY_DISPLAY_GALAXIA_IMAGE_VITTABOT_HAPPY}", "vittabot-happy.bmp"],
  ["%{BKY_DISPLAY_GALAXIA_IMAGE_VITTASCIENCE_LOGO}", "vittascience-logo.bmp"]
]
