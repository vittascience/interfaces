Blockly.Msg.boardName = 'Galaxia';

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
Blockly.Constants.Pins.GALAXIA_PINS = [
  ["P0", "p3"],
  ["P1", "p2"],
  ["P2", "p1"],
  ["P6", "p6"],
  ["P7", "p7"],
  ["P8", "p8"],
  ["P13", "p34"],
  ["P14", "p35"],
  ["P15", "p36"],
  ["P16", "p15"],
  ["P19", "p13"],
  ["P20", "p14"]
];

//galaxia analog => corresponding GPIO pins
Blockly.Constants.Pins.GALAXIA_ANALOG_READ_PINS = [
  ["P0", "p3"],
  ["P1", "p2"],
  ["P2", "p1"],
  ["P6", "p6"],
  ["P7", "p7"],
  ["P16", "p15"],
  ["P19", "p13"],
  ["P20", "p14"]
];

//galaxia touch => corresponding GPIO pins
Blockly.Constants.Pins.GALAXIA_TOUCH_PINS = [
  ["P0", "p3"],
  ["P1", "p2"],
  ["P2", "p1"]
];

// To remove progressively
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
  'network_HTML_addSymbol'
];
