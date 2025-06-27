//name
const INTERFACE_NAME = "letsstartcoding";
//code start
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="forever" id="o[WN]+eeF.OUxGch67@8" deletable="false" movable="false"></block></next></block></xml>',
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
const BOARD_ARDUINO_UNO = "nano";
const BOARD_DEFAULT = BOARD_ARDUINO_UNO;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn", "io_attachInterrupt"];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//adc
const READ_ANALOG_MAX_VALUE = 1023;
const WRITE_ANALOG_MAX_VALUE = 255;
const PWM_MAX_DUTY = 255;
//simulator
const SIMULATOR_DEFAULT_BOARD = {
    "link": 'code_rocket-board.png',
    "name": "Code Rocket"
};
// serial options
const SERIAL_OPTIONS = {
    boardSelection: false,
    board: 'nano'
};