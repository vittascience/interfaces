//name
const INTERFACE_NAME = "microbit";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>'
};
const DEFAULT_CODE_START = 'from microbit import *\n\nwhile True:\n  pass';
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
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn", "io_runEvery"];
//example projects
const EXAMPLE_PROJECT_LINKS = ['639ad9ef9d9c2', '639b1b5370397', '639b2ddd92f68', '639b235d72ca5', '639b32a296779', '639b342082b37', '639b350bac99f', '639b36d820b84'];
//adc
const READ_ANALOG_MAX_VALUE = 1023;
const WRITE_ANALOG_MAX_VALUE = 1023;
const PWM_MAX_DUTY = 1023;
//libraries
const LIBRARIES_PATH = {
    'bme280': "/envirobit",
    'tcs3472': "/envirobit",
    'bmp280': "/grove",
    'color_sensor': "/grove",
    'dht11': "/grove",
    'dht11_v2': "/grove",
    'ds1307': "/grove",
    'gas_gmxxx': "/grove",
    'gesture': "/grove",
    'hm330x': "/grove",
    'lcd_i2c': "/grove",
    'morpion': "/grove",
    'multichannel_gas': "/grove",
    'my9221': "/grove",
    'oled_mp': "/grove",
    'oled': "/grove",
    'pcf85063tp': "/grove",
    'scd30': "/grove",
    'sgp30': "/grove",
    'sht31': "/grove",
    'hp206c': "/grove",
    'si1145': "/grove",
    'th02': "/grove",
    'tm1637': "/grove",
    'ds18x20': "/grove",
    'rgb_led_matrix': "/grove",
    'ht16k33': "/grove",
    'ht16k33matrix': "/grove",
    'HuskyLens': "/grove",
    'buggyMove': "/microbit",
    'game': "/microbit",
    'lcd1in8': "/microbit",
    'ir_receiver': "/infrared",
    'nec_remote': "/infrared",
    'onewire': "/micropython",
    'cutebot': "/robot",
    'cutebotpro': "/robot",
    'maqueenplusv1': "/robot",
    'maqueenplusv2': "/robot",
    'tello': "/micropython",
    'water_level': "/grove",
    'bar_graph': "/microbit",
    'vl53l0x': "/grove",
    'edgeModel': "/ai",
    'edgeModelP0-P1': "/ai",
    'edgeModelP0': "/ai",
    'edgeModelP1': "/ai",
};
//simulator
const SIMULATOR_DEFAULT_BOARD = {
    "link": 'microbit.svg',
    "name": 'BBC micro:bit'
};
const SIMULATOR_DEFAULT_ROBOT = 'Maqueen';