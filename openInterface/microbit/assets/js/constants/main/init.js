//name
const INTERFACE_NAME = "microbit";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>'
};
const DEFAULT_CODE_START = 'from microbit import *\n\nwhile True:\n  pass';
const REPLACE_CODE_REQUESTS = {
    "robots_readMaqueenPlusPatrol": [/<\s*block type=\s*"robots_readMaqueenPlusv(1|2)Patrol"\s*id="([^"]{20})"\s*>/g, "<block type=\"robots_readMaqueenPlusPatrol\" id=\"$2\"><field name=\"VERSION\">$1</field>"],
    "robots_setMaqueenPlusServoAngle": [/<\s*block type=\s*"robots_setMaqueenPlusV(1|2)ServoAngle"\s*id="([^"]{20})"\s*>/g, "<block type=\"robots_setMaqueenPlusServoAngle\" id=\"$2\"><field name=\"VERSION\">$1</field>"],
    "actuators_setFanPower": [/<\s*block type=\s*"actuators_setMotorPower"\s*id="([^"]{20})"\s*>/g, "<block type=\"actuators_setFanPower\" id=\"$1\">"],
    "io_initChronometer": [/<\s*block type=\s*"io_resetChronometer"\s*id="([^"]{20})"\s*>/g, "<block type=\"io_initChronometer\" id=\"$1\">"],
    "sensors_getSi1145Light": [/<\s*block type=\s*"sensors_getSi1145Light"\s*id="([^"]{20})"\s*>/g, "<block type=\"sensors_getSunlightData\" id=\"$1\"><field name=\"VERSION\">SI1145</field>"],
    "communication_hc05_sendBluetoothData": [/<\s*block type=\s*"communication_sendBluetoothData"\s*id="([^"]{20})"\s*>/g, "<block type=\"communication_hc05_sendBluetoothData\" id=\"$1\">"],
    "communication_hc05_onBluetoothDataReceived": [/<\s*block type=\s*"communication_onBluetoothDataReceived"\s*id="([^"]{20})"\s*>/g, "<block type=\"communication_hc05_onBluetoothDataReceived\" id=\"$1\">"],
    "vittaia_load_cloud_model": [/<\s*block type=\s*"vittaia_load_cloud_model"\s*id="([^"]{20})"><value name=\s*"MODEL_ID"\s*>/g, "<block type=\"vittaia_load_cloud_model\" id=\"$1\"><value name=\"MODEL_URL\">"],
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
const TOOLBOX_STYLE_DEFAULT = TOOLBOX_STYLE_VITTA;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn", "io_runEvery"];
//example projects
const EXAMPLE_PROJECT_LINKS = ['639ad9ef9d9c2', '639b1b5370397', '639b2ddd92f68', '639b235d72ca5', '639b32a296779', '639b342082b37', '639b350bac99f', '639b36d820b84'];
//adc
const READ_ANALOG_MAX_VALUE = 1023;
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
    'si1151': "/grove",
    'th02': "/grove",
    'tm1637': "/grove",
    'veml6040': "/grove",
    'PiicoDev_Unified': "/grove",
    'ds18x20': "/grove",
    'rgb_led_matrix': "/grove",
    'ht16k33': "/grove",
    'ht16k33matrix': "/grove",
    'huskyLens': "/grove",
    'water_level': "/grove",
    'vl53l0x': "/grove",
    'buggyMove': "/microbit",
    'game': "/microbit",
    'lcd1in8': "/microbit",
    'lcd_i2c_8574': "/microbit",
    'bar_graph': "/microbit",
    'stepper': '/microbit',
    "kitronik_servo_driver": "/microbit",
    'ir_receiver': "/infrared",
    'nec_remote': "/infrared",
    'onewire': "/micropython",
    'cutebot': "/robot",
    'cutebotpro': "/robot",
    'maqueenplusv1': "/robot",
    'maqueenplusv2': "/robot",
    'maqueenplusv3': "/robot",
    'tello': "/robot",
    'uhandbit': "/robot",
    'wukong': "/robot",
    'matrixLidarDistanceSensor': "/robot",
    'edgeModel': "/ai",
    'edgeModelmicro': "/ai",
    'edgeModelP0-P1': "/ai",
    'edgeModelP0': "/ai",
    'edgeModelP1': "/ai",
};
const BOARD_DEFAULT = 'microbit';
//simulator
const SIMULATOR_DEFAULT_BOARD = {
    "link": 'microbit.svg',
    "name": 'BBC micro:bit'
};
const SIMULATOR_DEFAULT_ROBOT = 'Maqueen';