const EXCLUDED_BLOCKS_FOR_TRADUCTION = [];

// to modify each time we add a new block in reverse translation

const AUTHORIZED_BLOCKS_DISPLAY = [
    // display mCore
    // TODO LED MATRIX with IMAGE
    "robots_makeBlock_matrixDrawString",
    "robots_makeBlock_matrixShowNumber",
    "robots_makeBlock_matrixShowClock",
    "robots_makeBlock_setRgbLed",
    "robots_makeBlock_setPaletteRgbLed",
    "robots_makeBlock_controlNeopixelPaletteLed",
    "robots_makeBlock_controlNeopixelLed",
    "robots_makeBlock_neopixel_controlAllLedPalette",
    "robots_makeBlock_neopixel_controlAllLedRGB",
    "robots_makeBlock_rainbowNeopixel",
    "robots_makeBlock_set4DigitNumber"
];

const AUTHORIZED_BLOCKS_SENSORS = [
    "robots_makeBlock_getLineState",
    "robots_makeBlock_getUltrasonicRanger",
    "robots_makeBlock_getPIRMotionState",
    "robots_makeBlock_getCompassData",
    "robots_makeBlock_getLight",
    "robots_makeBlock_getColor",
    "robots_makeBlock_getSound",
    "robots_makeBlock_MQ2_getGas",
    "robots_makeBlock_getFlame",
    "robots_makeBlock_getWaterproofTemperature",
];

const AUTHORIZED_BLOCKS_MCORE = [
    "mCore_control_LED",
    "robots_setmBotRgbLed",
    "robots_setmBotPaletteRgbLed",
    "robots_getmBotRemoteControlButton",
    "robots_getmBotSensorLight",
    "robots_getmBotButtonState",
    // buzzer
    "robots_setmBotBuzzer",
    "robots_playmBotMusic",
    "robots_sendmBotIrMessage"
];

const AUTHORIZED_BLOCKS_IO = [
    'io_initChronometer',
    'io_getChronometer',
    'io_wait',
    'io_writeDigitalPin',
    'io_writeAnalogPin',
    'io_getGroveButton',
    'io_readDigitalPin',
    'io_readAnalogPin',
    'io_digital_signal',

    // External
    'robots_makeBlock_getSwitchState',
    'robots_makeBlock_getJoystickAxis',
    'robots_makeBlock_getPotentiometer',
    'robots_makeBlock_getPressedButton',
    'robots_makeBlock_getTouchSensorState',
    // set PWM is equal to set analogWrite
    'io_setPwm',
    'io_readPulseIn',
];

const AUTHORIZED_BLOCKS_ACTUATORS = [
    "robots_setmBotGo",
    "robots_stopmBotMotors",
    "robots_controlmBotMotor",
    "robots_makeBlock_setServoAngle",
    "robots_makeBlock_controlMiniFan",
];

const AUTHORIZED_BLOCKS_COMMUNICATION = [
    'communication_serialBegin',
    'communication_serialWrite',
    'communication_serialWrite_simple',
    'communication_onSerialDataReceived',
    'communication_playComputerMusic',
    'communication_playComputerFrequency',
]


const AUTHORIZED_BLOCKS_INIT = [
    "on_start",
    "forever"
]

const AUTHORIZED_BLOCKS = [...AUTHORIZED_BLOCKS_DISPLAY, ...AUTHORIZED_BLOCKS_SENSORS, ...AUTHORIZED_BLOCKS_IO, ...AUTHORIZED_BLOCKS_ACTUATORS, ...AUTHORIZED_BLOCKS_COMMUNICATION, ...AUTHORIZED_BLOCKS_INIT, ...AUTHORIZED_BLOCKS_MCORE];

const excludedCategories = ['loops', 'logic', 'math', 'text', 'lists', 'variables', 'procedures'];




