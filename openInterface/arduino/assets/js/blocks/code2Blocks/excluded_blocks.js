const EXCLUDED_BLOCKS_FOR_TRADUCTION = [];

// to modify each time we add a new block in reverse translation

const AUTHORIZED_BLOCKS_DISPLAY = [
    'display_lcdRGBSetText',
    'display_lcdRGBClear',
    'display_setDisplay',
    'display_lcdRGBSetColor',
    'display_lcdRGBSetText',
    'display_lcdRGBClear',
    'display_defineNeopixel',
    'display_controlNeopixelLed',
    'display_neopixel_controlAllLedRGB',

];

const AUTHORIZED_BLOCKS_SENSORS = [
    'sensors_getSgp30Gas',
];

const AUTHORIZED_BLOCKS_IO = [
    'io_wait',
    'io_control_arduino_led',
    'display_setGroveSocketLed',
    'io_writeDigitalPin',
    'io_writeDigitalPin_input',
    'io_writeAnalogPin',
    'io_writeAnalogPin_input',
    'io_getGroveButton',
    'io_readDigitalPin',
    'io_readDigitalPin_input',
    'io_readAnalogPin',
    'io_readAnalogPin_input',
    'io_digital_signal',
];

const AUTHORIZED_BLOCKS_ACTUATORS = [
    
];

const AUTHORIZED_BLOCKS_COMMUNICATION = [
    'communication_serialBegin',
    'communication_serialWrite',
    'communication_serialWrite_simple',
]

const AUTHORIZED_BLOCKS_INIT = [
    "on_start",
    "forever"
]

const AUTHORIZED_BLOCKS = [...AUTHORIZED_BLOCKS_DISPLAY, ...AUTHORIZED_BLOCKS_SENSORS, ...AUTHORIZED_BLOCKS_IO, ...AUTHORIZED_BLOCKS_ACTUATORS, ...AUTHORIZED_BLOCKS_COMMUNICATION, ...AUTHORIZED_BLOCKS_INIT];

const excludedCategories = ['loops', 'logic', 'math', 'text', 'lists', 'variables', 'procedures'];



