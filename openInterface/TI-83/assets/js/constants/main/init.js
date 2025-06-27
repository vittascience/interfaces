//name
const INTERFACE_NAME = "TI-83";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>',
    "texas-instruments": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block></xml>',
    "texas-instruments-code": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block></xml>',
};
const DEFAULT_CODE_START = {
    "vittascience": 'from ti_system import *\n\nwhile True:\n  pass',
    "scratch": 'from ti_system import *\n\nwhile True:\n  pass',
    "texas-instruments": '',
    "texas-instruments-code": ''
};
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
const TOOLBOX_STYLE_TI = "texas-instruments";
const TOOLBOX_STYLE_TI_CODE = "texas-instruments-code";
const TOOLBOX_STYLE_DEFAULT = (typeof Blockly.Wiki !== 'undefined' ? TOOLBOX_STYLE_VITTA : TOOLBOX_STYLE_TI);
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn", "controls_repeat_code"];
//example projects
// please refer to https://www.notion.so/vittascience/21b779ec1c844b738562f2e9f36fb567?v=a39de29c96d14f85b99ae32e26dc0c0a&pvs=4 for more information
const EXAMPLE_PROJECT_LINKS = {
    "essentials" : ["65cfd0c693a9b", "65cfd101474bc", "65cfd172128ee", "65cfd1b9beb74", "65cfd1ea8f1ef","65e0fa217fec5", "65e0faa64075c", "65e0faeb2e58e", "65e0fb15276ec", "65e0fb3c0b0c6", "65e0fb657f140", "65f168fb24039", "65f16a5cae291", "65f16d03dafbe"],
    "hybrid_projects": ["65cfd3397c55d", "65cfd3b95b040", "65cfd3e5e710e", "65cfd41199090", "65cfd455c4d62"],
    "python_projects-maths": ["65cfd4e375229", "65cfd53713407", "65cfd59cf1182", "65cfd5bca1baa", "67596cb46467a", "65cfd5f0029c7", "65cfd60bac189", "65cfd6300227f", "65cfd725dd041", "65cfd74d788a2", "65cfd77a782c5", "65cfd7aebf541", "65cfd7cd44915"],
    "python_projects-hub": ["65cfd838e96ae", "65cfd84a55d60"],
    "python_projects-rover": ["65cfd8c7ee44c", "65cfd8e11446d"],
    "python_projects-turtle": ["65cfd905dac8e", "65cfd927a861e"],
    "python_projects-microbit": ["65cfd93c32bfc", "65cfd95b66add"]
};
//ti
const TI_SHELL_START = ">>> # Shell Reinitialized <br>>>> # L'exécution de PYTHON02 <br>>>> from PYTHON02 import *";
//adc
const READ_ANALOG_MAX_VALUE = 1023;
const WRITE_ANALOG_MAX_VALUE = 1023;
const PWM_MAX_DUTY = 1023;
//simulator
const SIMULATOR_DEFAULT_BOARD = {
    "link": "",
    "name": ""
};
const SIMULATOR_DEFAULT_ROBOT = 'Rover';