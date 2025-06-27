Blockly.Msg.boardName = 'M5Stack';

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
  "m5stack-core1": [
    ["G2 (2)", "p2"],
    ["G5 (5)", "p5"],
    ["AD (35)", "p35"],
    ["AD (36)", "p36"],
    ["SDA (21)", "p21"],
    ["SCL (22)", "p22"],
    ["R0 (3)", "p3"],
    ["T0 (1)", "p1"],
    ["R2 (16)", "p16"],
    ["T2 (17)", "p17"],
    ["MOSI (23)", "p23"],
    ["MISO (19)", "p19"],
    ["SCK (18)", "p18"]
  ]
};

Blockly.Constants.Pins.analog_read = {
  "m5stack-core1": [
    ["AD (35)", "p35"],
    ["AD (36)", "p36"]
  ]
};

Blockly.Constants.Pins.DAC = {
  "m5stack-core1": [
    ["DA (25)", "p25"],
    ["DA (26)", "p26"]
  ],
};

Blockly.Constants.Pins.PWM = {
  "m5stack-core1": [
    ["G2 (2)", "p2"],
    ["G5 (5)", "p5"],
    ["AD (35)", "p35"],
    ["AD (36)", "p36"],
    ["SDA (21)", "p21"],
    ["SCL (22)", "p22"],
    ["R0 (3)", "p3"],
    ["T0 (1)", "p1"],
    ["R2 (16)", "p16"],
    ["T2 (17)", "p17"],
    ["MOSI (23)", "p23"],
    ["MISO (19)", "p19"],
    ["SCK (18)", "p18"]
  ]
};

Blockly.Constants.Pins.UART = {
  "m5stack-core1": [
    ["1", "1"],
    ["2", "2"]
  ]
};