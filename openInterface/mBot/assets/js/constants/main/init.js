//name
const INTERFACE_NAME = "mBot";
//code start
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" deletable="false" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8" deletable="false"></block></next></block></xml>'
};
const DEFAULT_CODE_START = "#include <MeMCore.h>\n#include <Arduino.h>\n#include <Wire.h>\n#include <SoftwareSerial.h>void setup() {\n}\n\nvoid loop() {\n}";
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
const BOARD_CORE_1 = "mCore1";
const BOARD_DEFAULT = BOARD_CORE_1;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn", "io_attachInterrupt", "preproc_include", "preproc_define", "preproc_define", "comment_block_standalone"];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//adc
const READ_ANALOG_MAX_VALUE = 1023;
const WRITE_ANALOG_MAX_VALUE = 255;
//simulator
const SIMULATOR_DEFAULT_BOARD = {
    "id": BOARD_CORE_1,
    "link": 'mCore1.svg',
    "name": "mCore 1",
    "mcu": "avr_8bits"
};
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
    }
};
const SIMULATOR_TYPE_FORMATS = {
    'avr_8bits': {
        i: ["d", "i"],
        u: ["u", "o", "x", "X"],
        c: ["c"],
        s: ["s"],
        p: ["p"],
    }
};
const SIMULATOR_DEFAULT_ROBOT = 'mBot';
//serial
const SERIAL_OPTIONS = {
    boardSelection: false,
    boardId: 'nano',
    boardName: "MeMCore w/ ATmega328",
    boardsFilter: [{
        'usbProductId': 0x7523,
        'usbVendorId': 0x1a86
    }]
};
//autocorrector
const AUTOCORRECTOR_DISABLED = true;