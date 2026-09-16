//name
const INTERFACE_NAME = "eliobot";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>'
};
const DEFAULT_CODE_START = 'import board\n\nwhile True:\n  pass';
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
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn", "network_html_create_page"];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//board
const BOARD_ELIOBOT = "eliobot";
const BOARD_DEFAULT = BOARD_ELIOBOT;
//adc
const READ_ANALOG_MAX_VALUE = 65535;
const WRITE_ANALOG_MAX_VALUE = 255;
const PWM_MAX_DUTY = 65535;
//libraries
const LIBRARIES_PATH = {
    'elio': ''
};
// boards
const INTERFACE_BOARDS = {
    [BOARD_ELIOBOT]: {
        "id": BOARD_ELIOBOT,
        "link": 'eliobot.svg',
        "name": "Eliobot"
    }
};
//simulator
const SIMULATOR_DEFAULT_BOARD = INTERFACE_BOARDS[BOARD_DEFAULT];
const SIMULATOR_DEFAULT_ROBOT = 'Eliobot';
//serial
const SERIAL_OPTIONS = {
    chunkSizes: {
        write: {
            'default': 1 // KiB (reduced compared to default ESP32)
        },
        read: {
            'default': 0.5 // KiB (reduced compared to default ESP32)
        }
    },
    boardsFilter: [
        { usbVendorId: 0x303A, usbProductId: 0x8002 }  // Eliobot
    ]
};
