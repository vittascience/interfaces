//name
const INTERFACE_NAME = "esp32";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>'
};
const DEFAULT_CODE_START = 'from machine import *\n\nwhile True:\n  pass';
const REPLACE_CODE_REQUESTS = {
    "sensors_getSi1145Light": [/<\s*block type=\s*"sensors_getSi1145Light"\s*id="([^"]{20})"\s*>/g, "<block type=\"sensors_getSunlightData\" id=\"$1\"><field name=\"VERSION\">SI1145</field>"],
    "communication_hc05_sendBluetoothData": [/<\s*block type=\s*"communication_sendBluetoothData"\s*id="([^"]{20})"\s*>/g, "<block type=\"communication_hc05_sendBluetoothData\" id=\"$1\">"],
    "communication_hc05_onBluetoothDataReceived": [/<\s*block type=\s*"communication_onBluetoothDataReceived"\s*id="([^"]{20})"\s*>/g, "<block type=\"communication_hc05_onBluetoothDataReceived\" id=\"$1\">"],
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
const BLOCKS_OUTSIDE_SCOPE = [
    "on_start",
    "forever",
    "scratch_on_start",
    "procedures_defnoreturn",
    "procedures_defreturn",
    "network_mqtt_onMessageReceived",
    "network_mqtt_onConnect",
    "network_mqtt_onDisconnect"
];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//board
const BOARD_VITTA_ESP32 = "edu-esp32";
const BOARD_ESP32_CAM = "esp32-cam";
const BOARD_ILO = "ilo";
const BOARD_NANO_ESP32 = "nano-esp32";
const BOARD_WEMOS_D1R32 = "wemos-d1r32";
const BOARD_ESP_WROOM_32_30PINS = "esp-wroom-32-30pins";
const BOARD_ESP_WROOM_32_38PINS = "esp-wroom-32-38pins";
const BOARD_DEFAULT = BOARD_VITTA_ESP32;
//shield
const BOARD_SHIELD_GROVE_WEMOS_D1R32 = "shield-grove-wemos-d1r32";
const BOARD_SHIELD_GROVE_VITTA_ESP32 = "shield-grove-edu-esp32";
const BOARD_SHIELD_GROVE_NANO_ESP32 = "shield-grove-nano-esp32";
//adc
const READ_ANALOG_MAX_VALUE = 4095;
const WRITE_ANALOG_MAX_VALUE = 255;
const PWM_MAX_DUTY = 1023;
//libraries
const LIBRARIES_PATH = {
    'ilo_micro': "/ilo"
};
//excluded blocks
const EXCLUDED_BLOCKS_BY_BOARD = {
    [BOARD_ESP32_CAM]: ['io_writeAnalogPin', 'io_getGroveThumbJoystick', 'sensors_getGroveHighTemperature'],
    [BOARD_ILO]: ['io_writeAnalogPin'],
    [BOARD_NANO_ESP32]: ['io_writeAnalogPin']
};
//boards
const INTERFACE_BOARDS = {
    [BOARD_VITTA_ESP32]: {
        "id": BOARD_VITTA_ESP32,
        "link": 'esp32_vittascience.svg',
        "name": "Vittascience ESP32",
        "shieldId": BOARD_SHIELD_GROVE_VITTA_ESP32,
        "shieldLink": 'arduino_uno_grove_shield.svg',
        "shieldName": 'Shield Grove'
    },
    [BOARD_ESP32_CAM]: {
        "id": BOARD_ESP32_CAM,
        "link": 'esp32-cam.svg',
        "name": "ESP32-CAM"
    },
    [BOARD_ILO]: {
        "id": BOARD_ILO,
        "link": 'ilo-board.svg',
        "name": "Ilo Robot"
    },
    [BOARD_NANO_ESP32]: {
        "id": BOARD_NANO_ESP32,
        "link": 'arduino_nano_esp32.svg',
        "name": "Arduino Nano ESP32",
        "shieldId": BOARD_SHIELD_GROVE_NANO_ESP32,
        "shieldLink": 'arduino_nano_esp32_grove_shield.svg',
        "shieldName": 'Shield Grove Nano'
    },
    [BOARD_WEMOS_D1R32]: {
        "id": BOARD_WEMOS_D1R32,
        "link": 'Wemos_D1_R32.svg',
        "name": "Wemos D1R32",
        "shieldId": BOARD_SHIELD_GROVE_WEMOS_D1R32,
        "shieldLink": 'arduino_uno_grove_shield.svg',
        "shieldName": 'Shield Grove'
    },
    [BOARD_ESP_WROOM_32_30PINS]: {
        "id": BOARD_ESP_WROOM_32_30PINS,
        "link": 'ESP-WROOM-32D_30pins.png',
        "name": "ESP32 WROOM-32D (30 broches)"
    },
    [BOARD_ESP_WROOM_32_38PINS]: {
        "id": BOARD_ESP_WROOM_32_38PINS,
        "link": 'ESP32-WROOM-32D_38pins.svg',
        "name": "ESP32 WROOM-32D (38 broches)"
    }
};
//simulator
const SIMULATOR_DEFAULT_BOARD = INTERFACE_BOARDS[BOARD_DEFAULT];
const SIMULATOR_DEFAULT_ROBOT = 'Alvik';
//const SIMULATOR_3D_DEFAULT_ROBOT = 'Ilo';
//serial
const SERIAL_OPTIONS = {
    boardSelection: true,
    baud: 115200,
    chunkSizes: {
        'default': 1024,
        [BOARD_NANO_ESP32]: 128
    },
    boardsFilter: [
        { usbVendorId: 0x303a }, // Espressif Systems (ESP32-S2 / S3 / C3)      
        { usbVendorId: 0x2341 }, // Espressif CDC Device -> Arduino (Nano ESP32)
        { usbVendorId: 0x1a86 }, // USB-SERIAL CH340/CH341 | CH9102x -> Nanjing Qinheng Microelectronics Co., Ltd (Wemos D1R32, Ilo)
        { usbVendorId: 0x10c4 }, // Silicon Labs CP210x USB to UART Bridge -> ESP32 WROOM-S2
        { usbVendorId: 0x0403, usbProductId: 0x6001 }  // FT232R
    ]
};
