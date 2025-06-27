//name
const INTERFACE_NAME = "arduino";
//code start
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" deletable="false" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8" deletable="false"></block></next></block></xml>'
};
const DEFAULT_CODE_START = "void setup() {\n}\n\nvoid loop() {\n}";
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
const BOARD_ARDUINO_UNO = "uno";
const BOARD_SHIELD_GROVE = "shield-grove";
const BOARD_ARDUINO_NANO = "nano";
const BOARD_DEFAULT = BOARD_ARDUINO_UNO;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn", "io_attachInterrupt", "preproc_include", "preproc_define", "preproc_define", "comment_block_standalone"];
//example projects
const EXAMPLE_PROJECT_LINKS = ['639987a2d76c3' , '6399a76286bfd' , '6399a8b8ee0d4' , '6399a9b491f07' , '6399bd8184b3f' , '6399c0b51e361'];
//adc
const READ_ANALOG_MAX_VALUE = 1023;
const WRITE_ANALOG_MAX_VALUE = 255;
const PWM_MAX_DUTY = 255;
//simulator
const SIMULATOR_BOARDS = {
    [BOARD_ARDUINO_UNO]: {
        "link": 'arduino_uno.svg',
        "name": "Arduino UNO"
    },
    [BOARD_SHIELD_GROVE]: {
        "link": 'shield_grove.svg',
        "name": "Shield Grove"
    },
    [BOARD_ARDUINO_NANO]: {
        "link": 'arduino_nano.svg',
        "name": "Arduino NANO"
    }
};
const SIMULATOR_DEFAULT_BOARD = SIMULATOR_BOARDS[BOARD_DEFAULT];
//serial
/*
const SERIAL_BAUDRATE = 9600;
const SERIAL_PRODUCTS = {
    'arduino_uno': {
        'usbProductId': 0x43,
        'usbVendorId': 0x2341
    }
};
*/
//autocorrector
const AUTOCORRECTOR_DISABLED = true;