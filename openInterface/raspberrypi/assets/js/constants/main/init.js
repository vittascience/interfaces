//name
const INTERFACE_NAME = "raspberrypi";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="network_get_pi_name" x="0" y="-25" deletable="false" id="[+e8=6]f{zLnb]|v)GTx"><value name="PINAME"><shadow type="text" id="FCTB!_Bc=!DYe#*#@eoA"><field name="TEXT">raspberrypi</field></shadow></value></block><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="50"><statement name="DO"></statement></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="network_get_pi_name" x="0" y="-25" deletable="false" id="[+e8=6]f{zLnb]|v)GTx"><value name="PINAME"><shadow type="text" id="FCTB!_Bc=!DYe#*#@eoA"><field name="TEXT">raspberrypi</field></shadow></value></block><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="50"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>',
    "hardware": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="network_get_pi_name" x="0" y="-25" deletable="false" id="[+e8=6]f{zLnb]|v)GTx"><value name="PINAME"><shadow type="text" id="FCTB!_Bc=!DYe#*#@eoA"><field name="TEXT">raspberrypi</field></shadow></value></block><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="50"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>'
};
const DEFAULT_CODE_START = '# -*- coding: utf-8 -*-\n\nVITTA_API_HOSTNAME = \'raspberrypi\'';
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
const TOOLBOX_STYLE_HARDWARE = "hardware";
const TOOLBOX_STYLE_DEFAULT = TOOLBOX_STYLE_VITTA;
//board
const BOARD_SENSE_HAT = "sensehat";
const BOARD_RASPBERRY_PI = "raspberrypi";
const GROUVE_PI_HAT = "grovepihat";
const BOARD_DEFAULT = BOARD_RASPBERRY_PI;
//Galaxia screen simulator
const GALAXIA_SHELL_START = "MPY: soft reboot"
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn", "network_get_pi_name"];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//adc
const WRITE_ANALOG_MAX_VALUE = 255;
const PWM_MAX_DUTY = 100; // 0 to 100%
//simulator

const INTERFACE_BOARDS = {
    [BOARD_SENSE_HAT]:{
        'link': 'Sensehat.svg',
        "name": "SenseHat"
    },
    [BOARD_RASPBERRY_PI]:{
        'link': 'raspberry-pi-board.svg',
        "name": "Raspberry Pi"
    },
    [GROUVE_PI_HAT]:{
        'link': 'grovepihat.svg',
        "name": "GrovePi Hat"
    }
}
const SIMULATOR_DEFAULT_BOARD = INTERFACE_BOARDS[BOARD_DEFAULT];
