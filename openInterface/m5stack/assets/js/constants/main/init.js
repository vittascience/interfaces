//name
const INTERFACE_NAME = "m5stack";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>'
};
const DEFAULT_CODE_START = 'from m5stack import *\nfrom m5ui import *\nfrom uiflow import *\n\nlcd.setRotation(3)\n\nwhile True:\n  pass';
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
//board
const BOARD_M5STACK_CORE1 = "m5stack-core1";
const BOARD_DEFAULT = BOARD_M5STACK_CORE1;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = [
    "on_start", 
    "forever", 
    "scratch_on_start", 
    "procedures_defnoreturn", 
    "procedures_defreturn", 
    "io_m5stack_onButtonPressedEvent", 
    "network_mqtt_onMessageReceived",
    "network_mqtt_onConnect",
    "network_mqtt_onDisconnect"
];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//adc
const READ_ANALOG_MAX_VALUE = 65535;
const WRITE_ANALOG_MAX_VALUE = 255;
const PWM_MAX_DUTY = 1023;
//libraries
const LIBRARIES_PATH = {
    'bme280' : "/grove",
};
//simulator
const SIMULATOR_DEFAULT_BOARD = {
    "link": 'm5stack.svg',
    "name": "M5Stack (CORE1)"
};
//serial
const SERIAL_PRODUCTS = {
    'm5stack-core': {
        'usbProductId': 0x55D4,
        'usbVendorId': 0x1A86
    }
};
const SERIAL_PRODUCT_FILTER = true;
