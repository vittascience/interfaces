//name
const INTERFACE_NAME = "cyberpi";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>'
};
const DEFAULT_CODE_START = 'import cyberpi\nimport utime\n\nutime.sleep(1)\n\nwhile True:\n  pass';
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
const BOARD_CYBERPI = "cyberpi";
const BOARD_DEFAULT = BOARD_CYBERPI;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn", "io_event_start", "io_event_is_press", "io_event_receive"];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//adc
const READ_ANALOG_MAX_VALUE = 65535;
const WRITE_ANALOG_MAX_VALUE = 255;
const PWM_MAX_DUTY = 1023;
//simulator
const SIMULATOR_DEFAULT_BOARD = {
    "link": 'cyberpi.svg',
    "name": "CyberPi"
};
const SIMULATOR_DEFAULT_ROBOT = 'mBot2';
//serial
/*
const SERIAL_PRODUCTS = {
    'cyberpi': {
        'usbProductId': 0x7523,
        'usbVendorId': 0x1a86
    }
};
*/
const SERIAL_PRODUCT_FILTER = false;
