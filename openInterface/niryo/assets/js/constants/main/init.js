//name
const INTERFACE_NAME = "niryo";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"on_start\" id=\"G[=T#8yqB70`NFgYq}GP\" deletable=\"false\" x=\"0\" y=\"0\"><statement name=\"DO\"></statement></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>'
};
const DEFAULT_CODE_START = 'from niryo_robot_python_ros_wrapper import *\nimport rospy\n';
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
const BOARD_NIRYO = "niryo";
const BOARD_DEFAULT = BOARD_NIRYO;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn"];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
const LIBRARIES_PATH = {};
//simulator default board
const SIMULATOR_DEFAULT_BOARD = BOARD_DEFAULT;