//name
const INTERFACE_NAME = "GalaxiaCircuitPython";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>',
    "texas-instruments": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>'
};
const DEFAULT_CODE_START = 'from thingz import *\n\nwhile True:\n  pass';
//modes
const MODE_CODE = "code";
const MODE_BLOCKS = "blocks";
const MODE_MIXED = "mixed";
const MODE_CODE_ONLY = "codeOnly";
const MODE_CONSOLE_ONLY = "consoleOnly";
const MODE_SIMU_ONLY = "simuOnly";
//toolbox
const TOOLBOX_STYLE_VITTA = "vittascience";
const TOOLBOX_STYLE_SCRATCH = "scratch";
const TOOLBOX_STYLE_DEFAULT = TOOLBOX_STYLE_VITTA;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn", "display_galaxia_animate_function", "network_galaxia_simpleHttp_generate_page", "io_onTouchSensitiveButtonEvent", "io_onButtonEvent"];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//adc
const READ_ANALOG_MAX_VALUE = 65535;
const WRITE_ANALOG_MAX_VALUE = 255;
//libraries
const LIBRARIES_PATH = {
    // 'galaxia_bme280': "/envirobit",
    // 'galaxia_tcs3472': "/envirobit",
    'galaxia_bmp280': "/grove",
    'galaxia_colorSensor': "/grove",
    // 'adafruit_dht': "/grove",
    'adafruit_hcsr04': "/grove",
    'galaxia_ds1307': "/grove",
    // 'galaxia_gas_gmxxx': "/grove",
    // 'galaxia_gesture': "/grove",
    'galaxia_hm330x': "/grove",
    'galaxia_lcd_i2c': "/grove",
    'galaxia_multichannel_gas': "/grove",
    'galaxia_ssd1306': "/grove",
    'galaxia_pcf85063tp': "/grove",
    'galaxia_scd30': "/grove",
    'galaxia_sgp30': "/grove",
    'galaxia_sht31': "/grove",
    // 'galaxia_si1145': "/grove",
    'galaxia_th02': "/grove",
    'galaxia_tm1637': "/grove",
    // 'buggyMove': "/galaxia",
    // 'ir_receiver': "/infrared",
    // 'nec_remote': "/infrared"
};
//simulator
const SIMULATOR_DEFAULT_BOARD = {
    "link": 'galaxia.svg',
    "name": "Thingz-Galaxia"
};
//serial
const SERIAL_PRODUCTS = {
    'galaxia': {
        'usbProductId': 0x80A8,
        'usbVendorId': 0x239A
    }
};
const SERIAL_PRODUCT_FILTER = true;

/*
P0 -- board.P0                   -- ADC ? 1
P1 -- board.P1                   -- ADC ? 1
P2 -- board.P2                   -- ADC ? 1
P3 -- board.P3 -- JACK_MICRO
P4 -- board.P4 -- JACK_RIGHT
P5 -- board.P5 -- button_a
P6 -- board.P6 -- GROVE_2_SEC    -- ADC ? 1
P7 -- board.P7 -- GROVE_2_PRIM   -- ADC ? 1
P8 -- board.P8                   -- ADC ? 0
P9 -- board.P9 -- JACK_MASS
P10 -- board.P10 -- JACK_LEFT
P11 -- board.P11 -- button_b
P12 -- UNDEF
P13 -- board.P13                 -- ADC ? 0
P14 -- board.P14                 -- ADC ? 0
P15 -- board.P15                 -- ADC ? 0
P16 -- board.P16                 -- ADC ? 1
P19 -- board.P19 -- GROVE_1_PRIM -- ADC ? 1
P20 -- board.P20 -- GROVE_1_SEC  -- ADC ? 1

BN -- board.BN
BS -- board.BS
BE -- board.BE
BW -- board.BW

LED_GND -- board.LED_GND

LEDG -- board.LEDG
LEDB -- board.LEDB
LEDR -- board.LEDR
*/