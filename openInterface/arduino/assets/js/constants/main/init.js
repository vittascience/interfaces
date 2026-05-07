//name
const INTERFACE_NAME = "arduino";
//code start
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" deletable="false" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8" deletable="false"></block></next></block></xml>'
};
const DEFAULT_CODE_START = "void setup() {\n}\n\nvoid loop() {\n}";
const REPLACE_CODE_REQUESTS = {
    "vittaia_load_cloud_model": [/<\s*block type=\s*"vittaia_load_cloud_model"\s*id="([^"]{20})"><value name=\s*"MODEL_ID"\s*>/g, "<block type=\"vittaia_load_cloud_model\" id=\"$1\"><value name=\"MODEL_URL\">"],
};
const REMOVE_INPUT_VALUE_CONNECTION = {
    "communication_onRemoteCommandReceived": "DATA"
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
//board
const BOARD_ARDUINO_UNO = "uno";
const BOARD_ARDUINO_NANO = "nano";
const BOARD_ARDUINO_MEGA = "mega";
const BOARD_ARDUINO_UNO_R4_WIFI = "unor4wifi";
const BOARD_ARDUINO_UNO_R4_MINIMA = "unor4minima";
const BOARD_ARDUINO_PRO_MINI = 'pro-mini';
const BOARD_DEFAULT = BOARD_ARDUINO_UNO;
//shield
const BOARD_SHIELD_GROVE = "shield-grove";
const BOARD_SHIELD_GROVE_MEGA = "shield-grove-mega";
const BOARD_SHIELD_GROVE_NANO = "shield-grove-nano";
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn", "io_attachInterrupt", "preproc_include", "preproc_define", "preproc_define", "comment_block_standalone"];
//example projects
const EXAMPLE_PROJECT_LINKS = ['639987a2d76c3', '6399a76286bfd', '6399a8b8ee0d4', '6399a9b491f07', '6399bd8184b3f', '6399c0b51e361'];
//adc
const READ_ANALOG_MAX_VALUE = 1023;
const PWM_MAX_DUTY = 255;
//boards
const INTERFACE_BOARDS = {
    [BOARD_ARDUINO_UNO]: {
        "id": BOARD_ARDUINO_UNO,
        "link": 'arduino_uno.svg',
        "name": "Arduino UNO",
        "resetId": "reset_button",
        "animId": "ellipse-top",
        "ledId": "ar-led13",
        "mcu": "avr_8bits",
        "shieldId": BOARD_SHIELD_GROVE,
        "shieldLink": 'arduino_uno_grove_shield.svg',
        "shieldName": 'Shield Grove UNO'
    },
    [BOARD_ARDUINO_NANO]: {
        "id": BOARD_ARDUINO_NANO,
        "link": 'arduino_nano.svg',
        "name": "Arduino Nano",
        "resetId": "reset",
        "animId": "reset_on",
        "ledId": "ar-led13",
        "mcu": "avr_8bits",
        "shieldId": BOARD_SHIELD_GROVE_NANO,
        "shieldLink": 'arduino_nano_grove_shield.svg',
        "shieldName": 'Shield Grove Nano'
    },
    [BOARD_ARDUINO_MEGA]: {
        "id": BOARD_ARDUINO_MEGA,
        "link": 'arduino-mega-2560.svg',
        "name": "Arduino Mega",
        "resetId": "reset",
        "animId": "reset_on",
        "ledId": "led_l_on",
        "mcu": "avr_8bits",
        "shieldId": BOARD_SHIELD_GROVE_MEGA,
        "shieldLink": 'arduino_mega_grove_shield.svg',
        "shieldName": 'Shield Grove Mega'
    },
    [BOARD_ARDUINO_UNO_R4_WIFI]: {
        "id": BOARD_ARDUINO_UNO_R4_WIFI,
        "link": 'arduino-uno-r4-wifi.svg',
        "name": "Arduino UNO R4 WIFI",
        "resetId": "button_off",
        "animId": "button_on",
        "ledId": "led_l_on",
        "mcu": "32bits",
        "shieldId": BOARD_SHIELD_GROVE,
        "shieldLink": 'arduino_uno_grove_shield.svg',
        "shieldName": 'Shield Grove UNO'
    },
    [BOARD_ARDUINO_UNO_R4_MINIMA]: {
        "id": BOARD_ARDUINO_UNO_R4_MINIMA,
        "link": 'arduino-uno-r4-minima.svg',
        "name": "Arduino UNO R4 Minima",
        "resetId": "button_off",
        "animId": "button_on",
        "ledId": "led_l_on",
        "mcu": "32bits",
        "shieldId": BOARD_SHIELD_GROVE,
        "shieldLink": 'arduino_uno_grove_shield.svg',
        "shieldName": 'Shield Grove UNO'
    },
    [BOARD_ARDUINO_PRO_MINI]: {
        "id": BOARD_ARDUINO_PRO_MINI,
        //"link": 'arduino-uno-r4-wifi.svg',
        "name": "Arduino Pro or Pro Mini",
        // "resetId": "button_off",
        // "animId": "button_on",
        // "ledId": "led_l_on",
        "mcu": "8bits"
    }
};
//simulator
const SIMULATOR_CPP_LIMITS = {
    'avr_8bits': {
        "char": { "max": 0x7f, "min": -0x80, "bytes": 1 },
        "signed char": { "max": 0x7f, "min": -0x80, "bytes": 1 },
        "unsigned char": { "max": 0xff, "min": 0x00, "bytes": 1 },
        "wchar_t": { "max": 0xffff, "min": 0x0000, "bytes": 2 },
        "char16_t": { "max": 0xffff, "min": 0x0000, "bytes": 2 },
        "char32_t": { "max": 0xffffffff, "min": 0x00000000, "bytes": 4 },
        "short": { "max": 0x7fff, "min": -0x8000, "bytes": 2 },
        "unsigned short": { "max": 0xffff, "min": 0x0000, "bytes": 2 },
        "int": { "max": 0x7fff, "min": -0x8000, "bytes": 2 },
        "unsigned int": { "max": 0xffff, "min": 0x0000, "bytes": 2 },
        "long": { "max": 0x7fffffff, "min": -0x80000000, "bytes": 4 },
        "unsigned long": { "max": 0xffffffff, "min": 0x00000000, "bytes": 4 },
        "long long": { "max": 0x7fffffffffffffff, "min": -0x8000000000000000, "bytes": 8 },
        "unsigned long long": { "max": 0xffffffffffffffff, "min": 0x0000000000000000, "bytes": 8 },
        "float": { "max": 3.40282346638529e+38, "min": -3.40282346638529e+38, "bytes": 4 },
        "double": { "max": 3.40282346638529e+38, "min": -3.40282346638529e+38, "bytes": 4 },
        "long double": { "max": 1.7976931348623157e+308, "min": -1.7976931348623157e+308, "bytes": 8 },
        "pointer": { "bytes": 2 },
        "bool": { "max": 1, "min": 0, "bytes": 1 },
        "boolean": { "max": 1, "min": 0, "bytes": 1 },
        "size_t": { "max": 0xffff, "min": 0x0000, "bytes": 2 },
        "ptrdiff_t": { "max": 0x7fff, "min": -0x8000, "bytes": 2 },
        "intptr_t": { "max": 0x7fff, "min": -0x8000, "bytes": 2 },
        "uintptr_t": { "max": 0xffff, "min": 0x0000, "bytes": 2 }
    },
    '32bits': {
        "char": { "max": 0x7f, "min": -0x80, "bytes": 1 },
        "signed char": { "max": 0x7f, "min": -0x80, "bytes": 1 },
        "unsigned char": { "max": 0xff, "min": 0x00, "bytes": 1 },
        "wchar_t": { "max": 0xffffffff, "min": 0x00000000, "bytes": 4 },
        "char16_t": { "max": 0xffff, "min": 0x0000, "bytes": 2 },
        "char32_t": { "max": 0xffffffff, "min": 0x00000000, "bytes": 4 },
        "short": { "max": 0x7fff, "min": -0x8000, "bytes": 2 },
        "unsigned short": { "max": 0xffff, "min": 0x0000, "bytes": 2 },
        "int": { "max": 0x7fffffff, "min": -0x80000000, "bytes": 4 },
        "unsigned int": { "max": 0xffffffff, "min": 0x00000000, "bytes": 4 },
        "long": { "max": 0x7fffffff, "min": -0x80000000, "bytes": 4 },
        "unsigned long": { "max": 0xffffffff, "min": 0x00000000, "bytes": 4 },
        "long long": { "max": 0x7fffffffffffffff, "min": -0x8000000000000000, "bytes": 8 },
        "unsigned long long": { "max": 0xffffffffffffffff, "min": 0x0000000000000000, "bytes": 8 },
        "float": { "max": 3.40282346638529e+38, "min": -3.40282346638529e+38, "bytes": 4 },
        "double": { "max": 1.7976931348623157e+308, "min": -1.7976931348623157e+308, "bytes": 8 },
        "long double": { "max": 1.7976931348623157e+308, "min": -1.7976931348623157e+308, "bytes": 8 },
        "pointer": { "bytes": 4 },
        "bool": { "max": 1, "min": 0, "bytes": 1 },
        "boolean": { "max": 1, "min": 0, "bytes": 1 },
        "size_t": { "max": 0xffffffff, "min": 0x00000000, "bytes": 4 },
        "ptrdiff_t": { "max": 0x7fffffff, "min": -0x80000000, "bytes": 4 },
        "intptr_t": { "max": 0x7fffffff, "min": -0x80000000, "bytes": 4 },
        "uintptr_t": { "max": 0xffffffff, "min": 0x00000000, "bytes": 4 }
    }
};
const SIMULATOR_TYPE_FORMATS = {
    'avr_8bits': {
        i: ["d", "i"],
        u: ["u", "o", "x", "X"],
        c: ["c"],
        s: ["s"],
        p: ["p"],
    },
    '32bits': {
        i: ["d", "i"],
        u: ["u", "o", "x", "X"],
        c: ["c"],
        s: ["s"],
        p: ["p"],
    }
};
const SIMULATOR_DEFAULT_BOARD = INTERFACE_BOARDS[BOARD_DEFAULT];
//serial
const SERIAL_OPTIONS = {
    boardSelection: true,
    bauds: {
        [BOARD_ARDUINO_UNO]: 9600,
        [BOARD_ARDUINO_NANO]: 115200,
        [BOARD_ARDUINO_MEGA]: 9600,
        [BOARD_ARDUINO_UNO_R4_WIFI]: 115200,
        [BOARD_ARDUINO_UNO_R4_MINIMA]: 115200,
        [BOARD_ARDUINO_PRO_MINI]: 19200
    },
    variant_ids: {
        [BOARD_ARDUINO_UNO]: ['uno'],
        [BOARD_ARDUINO_NANO]: ['nano', 'nano-aTmega328-old', 'nano-atmega168'],
        [BOARD_ARDUINO_MEGA]: ['mega-1280', 'mega-2560', 'mega-adk'],
        [BOARD_ARDUINO_UNO_R4_WIFI]: ['unor4wifi'],
        [BOARD_ARDUINO_UNO_R4_MINIMA]: ['unor4minima'],
        [BOARD_ARDUINO_PRO_MINI]: ['pro-mini-atmega328-16mhz', 'pro-mini-atmega328-8mhz', 'pro-mini-atmega168-16mhz', 'pro-mini-atmega168-8mhz']
    }
};
//autocorrector
const AUTOCORRECTOR_DISABLED = true;