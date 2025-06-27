//name
const INTERFACE_NAME = "buddy";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" deletable="false" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>'
};
const FOREVER_BLOCK_ID = "o[WN]+eeF.OUxGch67@8";
const DEFAULT_CODE_START = "";
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
const BLOCKS_OUTSIDE_SCOPE = [  "on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn",
                                "sensors_onFaceTouchSensorsTouched","sensors_onHeadTouchSensorsTouched", "sensors_onBodyTouchSensorsTouched","sensors_USdetectObstacle",
                                "sensors_ToFdetectObstacle","vision_ifPersonDetected","vision_ifPersonDetectedInArea"];
//example projects
const EXAMPLE_PROJECT_LINKS = ['637b513ed8e46', '637b557678b43', '637b5a764f11b', '637b5d54c5d48', '637b5d7e08092', '637b5e25a4a1c','65d76854ea459'];
//adc
const READ_ANALOG_MAX_VALUE = 4095;
//libraries
const LIBRARIES_PATH = {
    'buddysdk': ''
};
//simulator
const SIMULATOR_DEFAULT_BOARD = {
    "link": 'Buddy_front.svg',
    "name": 'Buddy'
};
const SIMULATOR_DEFAULT_ROBOT = 'Buddy';