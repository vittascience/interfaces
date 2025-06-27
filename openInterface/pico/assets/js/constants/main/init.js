//name
const INTERFACE_NAME = "pico";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>',
};

const DEFAULT_CODE_START = '\nwhile True:\n  pass';
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
const BOARD_PI_PICO = "basic-pico";
const BOARD_SHIELD_GROVE = "shield-grove";
const BOARD_DEFAULT = BOARD_SHIELD_GROVE;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = [
    "on_start", "forever", 
    "process_on_start_core1", 
    "scratch_on_start", 
    "procedures_defnoreturn", 
    "procedures_defreturn", 
    "network_mqtt_onMessageReceived",
    "network_mqtt_onConnect",
    "network_mqtt_onDisconnect"
];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//adc
const READ_ANALOG_MAX_VALUE = 65535;
const WRITE_ANALOG_MAX_VALUE = 255;
const PWM_MAX_DUTY = 65535;
//libraries
const LIBRARIES_PATH = {
    'PicoAutonomousRobotics' : "/kitronik"
};
//simulator
const SIMULATOR_BOARDS = {
    [BOARD_PI_PICO]: {
        "link": 'raspberry_pi_pico.svg',
        "name": 'Raspberry Pi Pico'
    },
    [BOARD_SHIELD_GROVE]: {
        "link": 'pico_grove_shield.svg',
        "name": "Shield Grove"
    }
};
const SIMULATOR_DEFAULT_BOARD = SIMULATOR_BOARDS[BOARD_DEFAULT];
const SIMULATOR_DEFAULT_ROBOT = 'Kitronik';
//serial
const SERIAL_PRODUCTS = {
    'pico': {
        usbProductId: 0x05,
        usbVendorId: 0x2E8A
    }
};
const SERIAL_PRODUCT_FILTER = true;
const SERIAL_CHUNK_SIZE = 4095;