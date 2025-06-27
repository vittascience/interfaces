//name
const INTERFACE_NAME = "galaxia";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>'
};
const DEFAULT_CODE_START = 'from machine import *\nfrom galaxiaUi import *\nfrom thingz import *\nwhile True:\n  pass';
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
//Galaxia screen simulator
const GALAXIA_SHELL_START = "MPY: soft reboot"
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = [
    "on_start", 
    "forever", 
    "scratch_on_start", 
    "procedures_defnoreturn", 
    "procedures_defreturn", 
    "network_mqtt_onMessageReceived",
    "network_mqtt_onConnect",
    "network_mqtt_onDisconnect",
    "io_onButtonEvent",
    "io_onTouchSensitiveButtonEvent",
];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//adc
const READ_ANALOG_MAX_VALUE = 8191; // Bit capture width for ADC2. ESP32-S2 only supports ADC_WIDTH_BIT_13.
const WRITE_ANALOG_MAX_VALUE = 255;
const PWM_MAX_DUTY = 1023; // Max PWM duty for ESP32-S2 is equal to ADC width (?) => 8191
//libraries
const LIBRARIES_PATH = {
    "esp32_rotary": "/grove",
    "esp32_linky": "/grove",
    "umqttsimple": "/wifi",
    'edgeModel': "/ai",
    'edgeModelP19-P7': "/ai",
    'edgeModelP19': "/ai",
    'edgeModelP7': "/ai",
};
//simulator
const SIMULATOR_DEFAULT_BOARD = {
    "link": 'galaxia.svg',
    "name": "Thingz-Galaxia"
};
//serial
const SERIAL_PRODUCTS = {
    'galaxia': {
        'usbProductId': 0x4003,
        'usbVendorId': 0x303A
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


// board.BE
// board.BN
// board.BS
// board.BW
// board.GROVE_1_PRIM board.P19
// board.GROVE_1_SEC board.P20
// board.GROVE_2_PRIM board.P7
// board.GROVE_2_SEC board.P6
// board.JACK_LEFT board.P10
// board.JACK_MASS board.P9
// board.JACK_MICRO board.P3
// board.JACK_RIGHT board.P4
// board.LEDB
// board.LEDG
// board.LEDR
// board.LED_GND
// board.P0
// board.P1
// board.P11 board.button_b
// board.P12
// board.P13
// board.P14
// board.P15
// board.P16
// board.P2
// board.P5 board.button_a
// board.P8