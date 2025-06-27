//name
const INTERFACE_NAME = 'thymio';
//code
const DEFAULT_XML_START = {
	vittascience: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block></xml>',
	scratch: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>',
};
const DEFAULT_CODE_START = 'from thymio import *\n\nwhile True:\n  pass';
//modes
const MODE_CODE = 'code';
const MODE_BLOCKS = 'blocks';
const MODE_MIXED = 'mixed';
const MODE_CODE_ONLY = 'codeOnly';
const MODE_CONSOLE_ONLY = 'consoleOnly';
const MODE_SIMU_ONLY = 'simuOnly';
//toolbox
const TOOLBOX_STYLE_VITTA = 'vittascience';
const TOOLBOX_STYLE_SCRATCH = 'scratch';
const TOOLBOX_STYLE_DEFAULT = TOOLBOX_STYLE_VITTA;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ['on_start', 'forever', 'scratch_on_start', 'procedures_defnoreturn', 'procedures_defreturn', 'io_onButtonPressed_event', 'io_onProximity_event', 'io_onTimer_event', 'io_onProximityLine_event', 'io_onTap_event', 'io_communication_event', 'io_event_basic', 'io_event_microphone', 'display_timer_flash_led'];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//adc
const READ_ANALOG_MAX_VALUE = 65535;
const WRITE_ANALOG_MAX_VALUE = 255;
const PWM_MAX_DUTY = 1023;
//libraries
const LIBRARIES_PATH = {};
//simulator
const SIMULATOR_DEFAULT_BOARD = {
	link: 'thymio.svg',
	name: 'Thymio',
};
const SIMULATOR_DEFAULT_ROBOT = 'Thymio';
