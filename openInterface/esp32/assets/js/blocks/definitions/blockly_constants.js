Blockly.Msg.Esp32BoardName = 'ESP32';

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
  [BOARD_VITTA_ESP32]: [
    ["2", "p26"],
    ["3", "p25"],
    ["4", "p17"],
    ["5", "p16"],
    ["6", "p27"],
    ["7", "p14"],
    ["8", "p12"],
    ["9", "p13"],
    ["10", "p5"],
    ["11", "p23"],
    ["12", "p19"],
    ["13", "p18"],
    ["A0", "p33"],
    ["A1", "p32"],
    ["A2", "p35"],
    ["A3", "p34"],
    ["A4", "p36"],
    ["A5", "p39"],
    ["RX←0", "p3"],
    ["TX→1", "p1"],
    ["SDA", "p21"],
    ["SCL", "p22"],
    ["BOOT", "p0"]
  ],
  [BOARD_ESP32_CAM]: [
    ["IO13", "p13"],
    ["IO16", "p16"],
    //["IO0", "p0"], => sensible au boot
    ["IO12", "p12"], //=> sensible au boot
    // ["U0T (TXD)", "p1"], => utilisé pour l'upload / repl
    // ["U0R (RXD)", "p3"], => utilisé pour l'upload / repl
    ["IO4 (FLASH)", "p4"],
    ["IO2 (SD)", "p2"],
    ["IO14 (SD)", "p14"],
    ["IO15 (SD)", "p15"],
  ],
  [BOARD_ILO]: [
    ["GPIO32", "p32"],
    ["GPIO33", "p33"],
    ["GPIO35", "p35"],
    ["GPIO4", "p4"],
    ["GPIO5", "p5"],
    ["GPIO21 (SDA)", "p21"],
    ["GPIO22 (SCL)", "p22"]
  ],
  [BOARD_NANO_ESP32]: [
    ["D2", "p5"],
    ["D3", "p6"],
    ["D4", "p7"],
    ["D5", "p8"],
    ["D6", "p9"],
    ["D7", "p10"],
    ["D8", "p17"],
    ["D9", "p18"],
    ["D10", "p21"],
    ["D11 (CIPO)", "p38"],
    ["D12 (COPI)", "p47"],
    ["D13 (SCK)", "p48"],
    ["A0", "p1"],
    ["A1", "p2"],
    ["A2", "p3"],
    ["A3", "p4"],
    ["A4 (SDA)", "p11"],
    ["A5 (SCL)", "p12"],
    ["A6", "p13"],
    ["A7", "p14"],
    ["D0 (RX0)", "p44"],
    ["D1 (TX1)", "p43"]
  ],
  [BOARD_WEMOS_D1R32]: [
    ["IO26", "p26"],
    ["IO25", "p25"],
    ["IO17", "p17"],
    ["IO16", "p16"],
    ["IO27", "p27"],
    ["IO14", "p14"],
    ["IO12", "p12"],
    ["IO13", "p13"],
    ["IO5", "p5"],
    ["IO23", "p23"],
    ["IO19", "p19"],
    ["IO18", "p18"],
    ["TX0", "p1"],
    ["RX0", "p3"],
    ["SDA", "p21"],
    ["SCL", "p22"],
    ["IO0", "p0"],
    // ["IO2", "p33"],
    // ["IO4", "p32"],
    // ["IO36", "p35"],
    // ["IO34", "p34"],
    // ["IO38", "p36"],
    // ["IO39", "p39"],
  ],
  [BOARD_ESP_WROOM_32_30PINS]: [
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
  ],
  [BOARD_ESP_WROOM_32_38PINS]: [
    ["IO0 (G0)", "p0"],
    ["IO2 (G2)", "p2"],
    ["IO4 (G4)", "p4"],
    ["IO5 (G5)", "p5"],
    ["IO12 (G12)", "p12"],
    ["IO13 (G13)", "p13"],
    ["IO14 (G14)", "p14"],
    ["IO15 (G15)", "p15"],
    ["IO16 (G16-RX2)", "p16"],
    ["IO17 (G17-TX2)", "p17"],
    ["IO18 (G18)", "p19"],
    ["IO19 (G19)", "p19"],
    ["IO21 (G21-SDA)", "p21"],
    ["IO22 (G22-SCL)", "p22"],
    ["IO23 (G23)", "p23"],
    ["IO25 (G25)", "p25"],
    ["IO26 (G26)", "p26"],
    ["IO27 (G27)", "p27"],
    ["IO32 (G32)", "p32"],
    ["IO33 (G33)", "p33"],
    ["IO34 (G34)", "p34"],
    ["IO35 (G35)", "p35"],
    ["IO6 (CLK)", "p6"],
    ["IO7 (SD0)", "p7"],
    ["IO8 (SD1)", "p8"],
    ["IO9 (SD2)", "p9"],
    ["IO10 (SD3)", "p10"],
    ["IO11 (CMD)", "p11"],
    ["IO1 (TXD)", "p1"],
    ["IO3 (RXD)", "p3"],
    ["IO36 (SP)", "p36"],
    ["IO39 (SN)", "p39"]
  ],
  // shield
  [BOARD_SHIELD_GROVE_VITTA_ESP32]: [
    ["D2", "p26"],
    ["D3", "p25"],
    ["D4", "p17"],
    ["D5", "p16"],
    ["D6", "p27"],
    ["D7", "p14"],
    ["D8", "p12"],
    ["D9", "p13"]
  ],
  [BOARD_SHIELD_GROVE_NANO_ESP32]: [
    ["D2", "p5"],
    ["D3", "p6"],
    ["D4", "p7"],
    ["D5", "p8"],
    ["D6", "p9"],
    ["D7", "p10"],
    ["RX", "p44"],
    ["TX", "p43"]
  ]
};
//shield
Blockly.Constants.Pins.digital[BOARD_SHIELD_GROVE_WEMOS_D1R32] = Blockly.Constants.Pins.digital[BOARD_SHIELD_GROVE_VITTA_ESP32];

for (const i in Blockly.Constants.Pins.digital) {
  Blockly.Constants.Pins.digital[i].type = 'digital';
}

Blockly.Constants.Pins.PWM = {
  [BOARD_VITTA_ESP32]: [
    ["2", "p26"],
    ["3", "p25"],
    ["4", "p17"],
    ["5", "p16"],
    ["6", "p27"],
    ["7", "p14"],
    ["8", "p12"],
    ["9", "p13"],
    ["10", "p5"],
    ["11", "p23"],
    ["12", "p19"],
    ["13", "p18"],
    ["TX→1", "p1"],
    ["RX←0", "p3"],
    ["SDA", "p21"],
    ["SCL", "p22"],
    ["BOOT", "p0"]
  ],
  [BOARD_ILO]: [
    ["GPIO32", "p32"],
    ["GPIO33", "p33"],
    ["GPIO4", "p4"],
    ["GPIO5", "p5"]
  ],
  [BOARD_WEMOS_D1R32]: [
    ["IO26", "p26"],
    ["IO25", "p25"],
    ["IO17", "p17"],
    ["IO16", "p16"],
    ["IO27", "p27"],
    ["IO14", "p14"],
    ["IO12", "p12"],
    ["IO13", "p13"],
    ["IO5", "p5"],
    ["IO23", "p23"],
    ["IO19", "p19"],
    ["IO18", "p18"],
    ["TX0", "p1"],
    ["RX0", "p3"],
    ["SDA", "p21"],
    ["SCL", "p22"],
    ["IO0", "p0"]
  ],
  [BOARD_ESP_WROOM_32_30PINS]: [
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
  ],
  [BOARD_ESP_WROOM_32_38PINS]: [
    ["IO0 (G0)", "p0"],
    ["IO2 (G2)", "p2"],
    ["IO4 (G4)", "p4"],
    ["IO5 (G5)", "p5"],
    ["IO12 (G12)", "p12"],
    ["IO13 (G13)", "p13"],
    ["IO14 (G14)", "p14"],
    ["IO15 (G15)", "p15"],
    ["IO16 (G16-RX2)", "p16"],
    ["IO17 (G17-TX2)", "p17"],
    ["IO18 (G18)", "p19"],
    ["IO19 (G19)", "p19"],
    ["IO21 (G21-SDA)", "p21"],
    ["IO22 (G22-SCL)", "p22"],
    ["IO23 (G23)", "p23"],
    ["IO25 (G25)", "p25"],
    ["IO26 (G26)", "p26"],
    ["IO27 (G27)", "p27"],
    ["IO32 (G32)", "p32"],
    ["IO33 (G33)", "p33"],
    ["IO6 (CLK)", "p6"],
    ["IO7 (SD0)", "p7"],
    ["IO8 (SD1)", "p8"],
    ["IO9 (SD2)", "p9"],
    ["IO10 (SD3)", "p10"],
    ["IO11 (CMD)", "p11"],
    ["IO1 (TXD)", "p1"],
    ["IO3 (RXD)", "p3"]
  ],
  //shield
  [BOARD_SHIELD_GROVE_VITTA_ESP32]: [
    ["D2", "p26"],
    ["D3", "p25"],
    ["D4", "p17"],
    ["D5", "p16"],
    ["D6", "p27"],
    ["D7", "p14"],
    ["D8", "p12"],
    ["D9", "p13"]
  ]
};
Blockly.Constants.Pins.PWM[BOARD_ESP32_CAM] = Blockly.Constants.Pins.digital[BOARD_ESP32_CAM];
Blockly.Constants.Pins.PWM[BOARD_NANO_ESP32] = Blockly.Constants.Pins.digital[BOARD_NANO_ESP32];
//shield
Blockly.Constants.Pins.PWM[BOARD_SHIELD_GROVE_WEMOS_D1R32] = Blockly.Constants.Pins.PWM[BOARD_SHIELD_GROVE_VITTA_ESP32];
Blockly.Constants.Pins.PWM[BOARD_SHIELD_GROVE_NANO_ESP32] = Blockly.Constants.Pins.digital[BOARD_SHIELD_GROVE_NANO_ESP32];

for (const i in Blockly.Constants.Pins.PWM) {
  Blockly.Constants.Pins.PWM[i].type = 'PWM';
}

Blockly.Constants.Pins.analog_read = {
  [BOARD_VITTA_ESP32]: [
    ["A0", "p33"],
    ["A1", "p32"],
    ["A2", "p35"],
    ["A3", "p34"],
    ["A4", "p36"],
    ["A5", "p39"]
  ],
  [BOARD_ESP32_CAM]: [
    ["IO13", "p13"]
  ],
  [BOARD_ILO]: [
    ["GPIO32", "p32"],
    ["GPIO33", "p33"]
  ],
  [BOARD_NANO_ESP32]: [
    ["A0", "p1"],
    ["A1", "p2"],
    ["A2", "p3"],
    ["A3", "p4"],
    ["A4", "p11"],
    ["A5", "p12"],
    ["A6", "p13"],
    ["A7", "p14"]
  ],
  [BOARD_WEMOS_D1R32]: [
    ["IO02", "p2"],
    ["IO04", "p4"],
    ["IO35", "p35"],
    ["IO34", "p34"],
    ["IO36", "p36"],
    ["IO39", "p39"]
    // ["IO2", "p33"],
    // ["IO4", "p32"],
    // ["IO36", "p35"],
    // ["IO34", "p34"],
    // ["IO38", "p36"],
    // ["IO39", "p39"],
  ],
  [BOARD_ESP_WROOM_32_30PINS]: [
    ["D32", "p32"],
    ["D33", "p33"],
    ["D34", "p34"],
    ["D35", "p35"],
    ["VN", "p39"],
    ["VP", "p36"]
  ],
  [BOARD_ESP_WROOM_32_38PINS]: [
    ["IO32 (G32)", "p32"],
    ["IO33 (G33)", "p33"],
    ["IO34 (G34)", "p34"],
    ["IO35 (G35)", "p35"],
    ["IO36 (SP)", "p36"],
    ["IO39 (SN)", "p39"]
  ],
  // shield
  [BOARD_SHIELD_GROVE_VITTA_ESP32]: [
    ["A0", "p33"],
    ["A1", "p32"],
    ["A2", "p35"],
    ["A3", "p34"],
    ["A4", "p36"]
  ],
  [BOARD_SHIELD_GROVE_WEMOS_D1R32]: [
    ["A0", "p2"],
    ["A1", "p4"],
    ["A2", "p35"],
    ["A3", "p34"],
    ["A4", "p36"]
  ],
  [BOARD_SHIELD_GROVE_NANO_ESP32]: [
    ["A0", "p1"],
    ["A1", "p2"],
    ["A2", "p3"],
    ["A3", "p4"],
    ["A6", "p13"],
    ["A7", "p14"]
  ]
};

for (const i in Blockly.Constants.Pins.analog_read) {
  Blockly.Constants.Pins.analog_read[i].type = 'analog_read';
}

Blockly.Constants.Pins.DAC = {
  [BOARD_VITTA_ESP32]: [
    ["3", "p25"],
    ["2", "p26"]
  ],
  [BOARD_WEMOS_D1R32]: [
    ["IO25", "p25"],
    ["IO26", "p26"]
  ],
  [BOARD_ESP_WROOM_32_30PINS]: [
    ["D25", "p25"],
    ["D26", "p26"]
  ],
  [BOARD_ESP_WROOM_32_38PINS]: [
    ["IO25 (G25)", "p25"],
    ["IO26 (G26)", "p26"]
  ],
  [BOARD_SHIELD_GROVE_WEMOS_D1R32]: [
    ["D2", "p26"],
    ["D3", "p25"]
  ],
};
Blockly.Constants.Pins.DAC[BOARD_ESP32_CAM] = [["NONE", ""]];
Blockly.Constants.Pins.DAC[BOARD_ILO] = [["NONE", ""]];
Blockly.Constants.Pins.DAC[BOARD_NANO_ESP32] = [["NONE", ""]];
//shield
Blockly.Constants.Pins.DAC[BOARD_SHIELD_GROVE_VITTA_ESP32] = Blockly.Constants.Pins.DAC[BOARD_SHIELD_GROVE_WEMOS_D1R32];
Blockly.Constants.Pins.DAC[BOARD_SHIELD_GROVE_NANO_ESP32] = [["NONE", ""]];

for (const i in Blockly.Constants.Pins.DAC) {
  Blockly.Constants.Pins.DAC[i].type = 'DAC';
}

Blockly.Constants.Pins.UART = {
  [BOARD_VITTA_ESP32]: [
    ["1", "1"],
    ["2", "2"]
  ]
};
Blockly.Constants.Pins.UART[BOARD_ESP32_CAM] = Blockly.Constants.Pins.UART[BOARD_VITTA_ESP32];
Blockly.Constants.Pins.UART[BOARD_ILO] = Blockly.Constants.Pins.UART[BOARD_VITTA_ESP32];
Blockly.Constants.Pins.UART[BOARD_NANO_ESP32] = Blockly.Constants.Pins.UART[BOARD_VITTA_ESP32];
Blockly.Constants.Pins.UART[BOARD_WEMOS_D1R32] = Blockly.Constants.Pins.UART[BOARD_VITTA_ESP32];
Blockly.Constants.Pins.UART[BOARD_ESP_WROOM_32_30PINS] = Blockly.Constants.Pins.UART[BOARD_VITTA_ESP32];
Blockly.Constants.Pins.UART[BOARD_ESP_WROOM_32_38PINS] = Blockly.Constants.Pins.UART[BOARD_VITTA_ESP32];
//shield
Blockly.Constants.Pins.UART[BOARD_SHIELD_GROVE_WEMOS_D1R32] = Blockly.Constants.Pins.UART[BOARD_VITTA_ESP32];
Blockly.Constants.Pins.UART[BOARD_SHIELD_GROVE_VITTA_ESP32] = Blockly.Constants.Pins.UART[BOARD_VITTA_ESP32];
Blockly.Constants.Pins.UART[BOARD_SHIELD_GROVE_NANO_ESP32] = Blockly.Constants.Pins.UART[BOARD_VITTA_ESP32];

for (const i in Blockly.Constants.Pins.UART) {
  Blockly.Constants.Pins.UART[i].type = 'UART';
}

Blockly.Constants.Pins.SPI = {
  [BOARD_VITTA_ESP32]: [
    ["2", "2"],
    ["1", "1"]
  ]
};
Blockly.Constants.Pins.SPI[BOARD_ESP32_CAM] = Blockly.Constants.Pins.SPI[BOARD_VITTA_ESP32];
Blockly.Constants.Pins.SPI[BOARD_ILO] = Blockly.Constants.Pins.SPI[BOARD_VITTA_ESP32];
Blockly.Constants.Pins.SPI[BOARD_NANO_ESP32] = Blockly.Constants.Pins.SPI[BOARD_VITTA_ESP32];
Blockly.Constants.Pins.SPI[BOARD_WEMOS_D1R32] = Blockly.Constants.Pins.SPI[BOARD_VITTA_ESP32];
Blockly.Constants.Pins.SPI[BOARD_ESP_WROOM_32_30PINS] = Blockly.Constants.Pins.SPI[BOARD_VITTA_ESP32];
Blockly.Constants.Pins.SPI[BOARD_ESP_WROOM_32_38PINS] = Blockly.Constants.Pins.SPI[BOARD_VITTA_ESP32];
//shield
Blockly.Constants.Pins.SPI[BOARD_SHIELD_GROVE_WEMOS_D1R32] = Blockly.Constants.Pins.SPI[BOARD_VITTA_ESP32];
Blockly.Constants.Pins.SPI[BOARD_SHIELD_GROVE_VITTA_ESP32] = Blockly.Constants.Pins.SPI[BOARD_VITTA_ESP32];
Blockly.Constants.Pins.SPI[BOARD_SHIELD_GROVE_NANO_ESP32] = Blockly.Constants.Pins.SPI[BOARD_VITTA_ESP32];

for (const i in Blockly.Constants.Pins.SPI) {
  Blockly.Constants.Pins.SPI[i].type = 'SPI';
}

Blockly.Constants.Units = {
  distance: [
    ["%{BKY_ROBOTS_CENTIMETERS}", "cm"],
    ["%{BKY_ROBOTS_MILLIMETERS}", "mm"],
    ["%{BKY_ROBOTS_METERS}", "m"],
    ["%{BKY_ROBOTS_INCHES}", "inch"]
  ],
  angle: [
    ["%{BKY_ROBOTS_DEGREES}", "deg"],
    ["%{BKY_ROBOTS_RADIANS}", "rad"],
    ["%{BKY_ROBOTS_REVOLUTIONS}", "rev"],
    ["%{BKY_ROBOTS_PERCENTAGE}", "perc"]
  ],
  linear_speed: [
    ["%{BKY_ROBOTS_CM_PER_S}", "cm/s"],
    ["%{BKY_ROBOTS_MM_PER_S}", "mm/s"],
    ["%{BKY_ROBOTS_M_PER_S}", "m/s"],
    ["%{BKY_ROBOTS_INCH_PER_S}", "inch/s"]
  ],
  rotational_speed: [
    ["%{BKY_ROBOTS_RPM}", "rpm"],
    ["%{BKY_ROBOTS_DEG_PER_S}", "deg/s"],
    ["%{BKY_ROBOTS_RAD_PER_S}", "rad/s"],
    ["%{BKY_ROBOTS_REV_PER_S}", "rev/s"]
  ]
};