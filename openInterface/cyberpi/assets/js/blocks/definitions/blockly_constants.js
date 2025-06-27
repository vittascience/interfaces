Blockly.Msg.boardName = 'CyberPi';

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
  'network_HTML_newline'
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
  "cyberpi": [
    ["IO2 (MOSI)", "p2"],
    ["IO4 (SCLK)", "p4"],
    ["IO5 (CS)", "p5"],
    ["IO15 (TX)", "p15"],
    ["IO21 (RX)", "p21"],
    ["IO22 (U2TX)", "p22"],
    ["IO23 (U2RX)", "p23"]
  ]
};

Blockly.Constants.Pins.mbot2 = {
  "cyberpi": [
    ["S1", "S1"],
    ["S2", "S2"],
    ["S3", "S3"],
    ["S4", "S4"]
  ]
};

Blockly.Constants.Pins.PWM = Blockly.Constants.Pins.digital;
