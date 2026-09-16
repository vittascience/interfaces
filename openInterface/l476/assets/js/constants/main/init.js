//name
const INTERFACE_NAME = "l476";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>'
};
const DEFAULT_CODE_START = 'from machine import *\nfrom pyb import *\n\nwhile True:\n  pass';
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
const BOARD_NUCLEO_L476 = "l476";
const BOARD_SHIELD_GROVE = "shield-grove";
const BOARD_DEFAULT = BOARD_NUCLEO_L476;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn"];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//adc
const READ_ANALOG_MAX_VALUE = 4095;
const PWM_MAX_DUTY = 255;
//libraries
const LIBRARIES_PATH = {
    'stm32_donutbot': "/donutbot",
    'stm32_sts3032': "/donutbot",
    'stm32_veml6040': "/donutbot",
    'stm32_alphabot_v2': "/alphabot",
    'stm32_TRsensors': "/alphabot"
};
//boards
const INTERFACE_BOARDS = {
    [BOARD_NUCLEO_L476]: {
        "id": BOARD_NUCLEO_L476,
        "link": 'nucleo_l476rg_v2.svg',
        "name": 'STM32 NUCLEO-L476RG'
    }
};
//simulator
const SIMULATOR_DEFAULT_BOARD = INTERFACE_BOARDS[BOARD_DEFAULT];
const SIMULATOR_DEFAULT_ROBOT = 'Alphabot';
//serial
const SERIAL_OPTIONS = {
    chunkSizes: {
        readingDelayPerKiB: {
            'default': 50 // ms (reduced compared to default STM32)
        }
    },
    boardsFilter: [
        { usbVendorId: 0x483, usbProductId: 0x374B }, // stm32_nucleo_l476
        { usbVendorId: 0x483, usbProductId: 0x3752 }, // stm32_nucleo_l476_without_mass_storage
    ],
    variablesGetterTimeout: {
        'default': 500 // ms
    }
};
