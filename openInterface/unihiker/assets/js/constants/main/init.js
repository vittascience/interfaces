//name
const INTERFACE_NAME = "unihiker";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" x="250" y="0"></block></xml>'
};
const DEFAULT_CODE_START = '# -*- coding: utf-8 -*-\n\nimport time\n\nwhile True:\n  time.sleep(0.1)\n';
//modes
const MODE_CODE = "code";
const MODE_BLOCKS = "blocks";
const MODE_MIXED = "mixed";
const MODE_CODE_ONLY = "codeOnly";
const MODE_CONSOLE_ONLY = "consoleOnly";
const MODE_SIMU_ONLY = "simuOnly";
//toolbox
const TOOLBOX_STYLE_VITTA = "vittascience";
const TOOLBOX_STYLE_DEFAULT = TOOLBOX_STYLE_VITTA;
//board
const BOARD_UNIHIKER_M10 = "unihiker_m10";
const BOARD_UNIHIKER_K10 = "unihiker_k10";
const BOARD_DEFAULT = BOARD_UNIHIKER_M10;
// the page is loaded again when the board changes: the K10 (MicroPython, unihiker_k10 library) is known from the start
const IS_UNIHIKER_K10 = new URLSearchParams(location.search).get('board') === BOARD_UNIHIKER_K10;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn", "io_unihiker_on_button", "display_unihiker_on_touch_button", "display_unihiker_tictactoe_on_touch"];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//adc
const READ_ANALOG_MAX_VALUE = 4095;
// write_analog of the pins (micro:bit modules, compatibility library microbit.py): 0 to 1023
const PWM_MAX_DUTY = 1023;
const WRITE_ANALOG_MAX_VALUE = 1023;
// boards
const INTERFACE_BOARDS = {
    [BOARD_UNIHIKER_M10]: {
        "link": "unihiker-m10.svg",
        "name": "UNIHIKER M10"
    },
    [BOARD_UNIHIKER_K10]: {
        "link": "unihiker-k10.svg",
        "name": "UNIHIKER K10"
    }
};
//simulator
const SIMULATOR_DEFAULT_BOARD = INTERFACE_BOARDS[IS_UNIHIKER_K10 ? BOARD_UNIHIKER_K10 : BOARD_DEFAULT];
//serial (UNIHIKER K10: ESP32-S3 with MicroPython)
const SERIAL_OPTIONS = {
    boardsFilter: [
        { usbVendorId: 0x303a } // Espressif Systems (ESP32-S3)
    ]
};
