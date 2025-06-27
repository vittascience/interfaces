//name
const INTERFACE_NAME = "raspberrypi";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"on_start\" id=\"G[=T#8yqB70`NFgYq}GP\" deletable=\"false\" x=\"0\" y=\"0\"><statement name=\"DO\"><block type=\"network_get_pi_name\" id=\"[+e8=6]f{zLnb]|v)GTx\"><value name=\"PINAME\"><shadow type=\"text\" id=\"FCTB!_Bc=!DYe#*#@eoA\"><field name=\"TEXT\">pi</field></shadow></value></block></statement></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>'
};

const DEFAULT_CODE_START = '';
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
const BOARD_SENSE_HAT = "sensehat";
const BOARD_RASPBERRY_PI = "raspberrypi";
const GROUVE_PI_HAT = "grovepihat";
const BOARD_DEFAULT = BOARD_RASPBERRY_PI;
//Galaxia screen simulator
const GALAXIA_SHELL_START = "MPY: soft reboot"
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn"];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//adc
const READ_ANALOG_MAX_VALUE = 1024; // Bit capture width for ADC2. ESP32-S2 only supports ADC_WIDTH_BIT_13.
const WRITE_ANALOG_MAX_VALUE = 255;
const PWM_MAX_DUTY = 1023; // Max PWM duty for ESP32-S2 is equal to ADC width (?) => 8191
//simulator

const SIMULATOR_BOARDS = {
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
const SIMULATOR_DEFAULT_BOARD = SIMULATOR_BOARDS[BOARD_DEFAULT];
