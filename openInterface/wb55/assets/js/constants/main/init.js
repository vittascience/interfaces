//name
const INTERFACE_NAME = "wb55";
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
const BOARD_NUCLEO_WB55 = "nucleo";
const BOARD_SHIELD_GROVE = "shield-grove";
const BOARD_DEFAULT = BOARD_NUCLEO_WB55;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn"];
//example projects
const EXAMPLE_PROJECT_LINKS = ['6179123b047c9', '617913b27de64', '61791c04546a9', '61792d540443b', '62015c8dddb93'];
//adc
const READ_ANALOG_MAX_VALUE = 4095;
const PWM_MAX_DUTY = 255;
//libraries
const LIBRARIES_PATH = {
    'stm32_alphabot_v2': "/alphabot",
    'stm32_TRsensors': "/alphabot",
};
//boards
const INTERFACE_BOARDS = {
    [BOARD_NUCLEO_WB55]: {
        "id": BOARD_NUCLEO_WB55,
        "link": 'Nucleo_STM32_WB55.svg',
        "name": "STM32 NUCLEO-WB55",
        "shieldId": BOARD_SHIELD_GROVE,
        "shieldLink": 'arduino_uno_grove_shield.svg',
        "shieldName": 'Shield Grove WB55'
    }
};
//simulator
const SIMULATOR_DEFAULT_BOARD = INTERFACE_BOARDS[BOARD_DEFAULT];
const SIMULATOR_DEFAULT_ROBOT = 'Alphabot';
//serial
const SERIAL_OPTIONS = {
    baud: 115200,
    chunkSizes: {
        'default': 255
    },
    boardsFilter: [
        { usbVendorId: 0xf055, usbProductId: 0x9800 }, // STM32 NUCLEO-WB55RG
        { usbVendorId: 0x483, usbProductId: 0x374E }, // STM32 NUCLEO-WB55JC
        { usbVendorId: 0xd28, usbProductId: 0x204 }, // STM32 NUCLEO-WB55RG
    ]
};
