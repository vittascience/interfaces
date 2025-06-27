/**
 * @fileoverview excluded_blocks.js. The main function "retreive_all_blocks()" is called during the Python2Blocks initialization async initParser() after the interface is completely loaded.
 * @author: Nixoals (Nicolas G.)
 */
// array to be filled with all the blocks that are not in the authorized blocks
const EXCLUDED_BLOCKS_FOR_TRADUCTION = [];

// to modify each time we add a new block in reverse translation

const AUTHORIZED_BLOCKS_DISPLAY = [
    "show_icon",
    "show_icon_simple",
    "show_number",
    "show_leds",
    "show_string",
    "display_defineNeopixel",
    "display_controlNeopixelLed",
    "display_controlColorNeopixelLed",
    "display_neopixel_controlAllLedRGB",
    "display_neopixel_controlAllLedPalette",
    "display_rainbowNeopixel",
    "color_picker",
    "clear",
    "display_lcdSetText",
    "display_lcdClear",
    "display_show_gauge",
    "display_plot_bar_graph",
    "set_pixel",
    "set_light_pixel",
    "set_brightness",
    "show_clock",
    "show_arrow",
    // missing Kitronik zip halo HD
    "display_addOledText",
    "display_setOledPixel",
    "display_showOledIcon",
    "display_clearOledScreen",
    // Morpion missing
    "display_setGroveSocketLed",
    "display_setLEDintensity",
    "display_setNumberGrove4Digit",
    "display_setClockGrove4Digit",
    "display_setLevelLedBar",
    "display_my9221_reverse",
    "display_setTrafficLight", // generic block can no be distinguished from other read digital pin
    "display_led_matrix_DrawBitmap", // Pasted from L476
    "display_led_matrix_clear",
    "display_rgb_led_matrix_DrawBitmap",
    "display_rgb_led_matrix_stopDisplay",
    "display_games_createSprite",
    "display_games_deleteSprite",
    "display_games_isSpriteDeleted",
    "display_games_moveSprite",
    "display_games_getSpritePosition",
    "display_games_changeScore",
    "display_games_getScore",
    "display_games_stopGame",
    "display_games_isEndGame",
    "display_games_restartGame",
    "display_morpionNewGame",
    "display_morpionMoveCursor",
    "display_morpionSetPlayerFigure",
    "display_morpionIsEndGame",
];

const AUTHORIZED_BLOCKS_SENSORS = [
    "sensors_getLight",
    "sensors_getTemperature",
    "sensors_getAcceleration",
    "sensors_getCompass",
    "sensors_getMagneticForce",
    "sensors_isCompassCalibrated",
    "sensors_calibrateCompass",
    // envirobit
    "sensors_envirobit_tcs3472_getRGB",
    "sensors_envirobit_tcs3472_getBrightness",
    "sensors_envirobit_tcs3472_setLED",
    "sensors_envirobit_bme280_getData",
    "sensors_envirobit_getSoundLevel",
    "sensors_envirobit_waitForClaps",
    "sensors_weatherbit_bme280_getData",
    // weatherbit
    "sensors_weatherbit_anemometer_getSpeed",
    "sensors_weatherbit_weathercock_getDirection",
    // Gaz sensor
    "sensors_getSgp30Gas",
    "sensors_getMultichannelGas",
    "sensors_getMultichannelGasV2",
    "sensors_getO2gas",
    "sensors_SCD30_readData",
    "sensors_SCD30_forcedCalibration",
    "sensors_getAirQualityValue",
    "sensors_getParticulateMatter",
    // Climate sensor
    "sensors_getBmp280Data",
    "sensors_bme280_getData",
    "sensors_getGroveMoisture",
    "sensors_getGroveCapacitiveMoisture",
    "sensors_getGroveTemperature",
    "sensors_getGroveHighTemperature",
    "sensors_barometerReadData",
    "sensors_dhtReadData",
    "sensors_TH02readData",
    "sensors_SHT31readData",
    "sensors_SHT35readData",
    "sensors_mpx5700ap_getPressure",
    "sensors_getGroveWaterAmount",
    "sensors_getRainGauge",
    "sensors_getAnemometer",
    "sensors_getGroveLight",
    "sensors_getSi1145Light",
    "sensors_getUVindex",
    "sensors_colorSensor_getData",
    "sensors_getGroveSound",
    "sensors_getGroveUltrasonicRanger",
    "sensors_VL53L0X_getRangeMillimeters",
    "sensors_getGroveLineFinder",
    "sensors_getPiezoVibration",
    "sensors_getGroveTilt",
    "sensors_getGroveMotion",
    "sensors_getEarClipHeartRate",
    "sensors_getEmgDetector",
    "sensors_getFsr402Force",
    "sensors_getWaterLevel",
];

const AUTHORIZED_BLOCKS_IO = [
    "io_pause",
    "io_onButtonPressed",
    "io_isButtonPressed",
    "io_onPinPressed",
    "io_onMovement",
    "io_writeDigitalPin",
    "io_digital_signal",
    "write_analog",
    "io_writeAnalogPin",
    "io_readDigitalPin",
    "io_readAnalogPin",
    "io_setPwm",
    "io_buttons_getPresses",
    "io_runEvery",
    "io_micro_onSoundDetected",
    "io_micro_getCurrentSound",
    "io_micro_wasSoundDetected",
    "io_micro_getSoundLevel",
    "io_micro_getHistorySounds",
    "io_micro_setSoundThreshold",
    "io_micro_soundCondition",
    "io_getGroveButton",
    "io_getGroveSwitch",
    "io_getMagneticSwitch",
    "io_getGroveTactile",
    "io_getGroveRotaryAngle",
    "io_getGroveSlidePotentiometer", // identical to GroveRotaryAngle can not be translated to blockly
    "io_getGroveColoredButton",
    "io_setGroveColoredButton",
    "io_getGroveThumbJoystick", // same as read_analog can not be translated to blockly
    "io_readPulseIn",
    "io_setPull",
];

const AUTHORIZED_BLOCKS_ACTUATORS = [
    'actuators_setServoAngle',
    'actuators_continuousServo_setSpeed',
    'actuators_setMotorPower',
    'actuators_setFanPower',
    'actuators_kitronik_controlMotor',
    'actuators_kitronik_stopMotor',
    'actuators_setVibrationMotorState',
    'actuators_setGroveRelayState',
    'actuators_mosfet_setState',
    'actuators_mosfet_setPercentValue',
    'actuators_controlAccessBitBarrier',
    'actuators_controlAccessBitBuzzer',
    'actuators_playMusicGroveBuzzer',
    'actuators_music_playSong',
    'actuators_music_playNotes',
    'actuators_music_playFrequency',
    'actuators_music_stop',
    'actuators_music_setVolume',
    'actuators_music_setTempo',
    'actuators_kitronik_playFrequency',
    'actuators_speech_saySomething',
    "actuators_setElectromagnetState",
    "actuators_setWaterAtomizerState"

];

const AUTHORIZED_BLOCKS_COMMUNICATION = [
    "communication_serialWrite",
    "communication_graphSerialWrite",
    "communication_graphSerialWrite_datasFormat",
    // ! to refine
    "communication_onSerialDataReceived",
    // music
    "communication_playComputerMusic",
    "communication_playComputerFrequency",
    "communication_stopComputerMusic",
    // radio
    "communication_radioSendString",
    "communication_radioSendNumber",
    "communication_radioSendValue",
    "communication_onRadioNumberReceived",
    "communication_radioConfig",
    "communication_onRadioDataReceived",
    "communication_onRadioValueReceived",
    // logs
    "communication_log_deleteLogs",
    "communication_log_serial",
    "communication_log_setLabel",
    "communication_log_addData",
    "communication_log_data",
    // Bluetooth
    "communication_onBluetoothDataReceived",
    "communication_HM10_onBluetoothDataReceived",
    "communication_sendBluetoothData",
    "communication_HM10_sendBluetoothData",
]

const AUTHORIZED_BLOCKS_ROBOTS = [
    "robots_CutebotPro_getUltrasonicDistance",
    "robots_CutebotPro_getLineState",
    "robots_CutebotPro_isSpecificState",
    "robots_CutebotPro_getLineOffset",
    "robots_CutebotPro_isSensorAboveLine",
    "robots_getGrayscaleTrackingValue",
    "robots_CutebotPro_readVersion",

    "robots_CutebotPro_getMotorSpeed",
    "robots_CutebotPro_getAngularDistance",
    "robots_CutebotPro_initializeAngularDistance",
    "robots_CutebotPro_controlHeadlights",
    "robots_CutebotPro_controlHeadlightsPalette",
    "robots_CutebotPro_switchOffHeadlights",
    "robots_CutebotPro_controlBuzzer",
    "robots_CutebotPro_setNeopixel",
    "robots_CutebotPro_setNeopixelPalette",
    "robots_CutebotPro_controlMotors",
    "robots_CutebotPro_stop",
    "robots_CutebotPro_runWithSpeed",
    "robots_CutebotPro_setMotorsSpeed",
    "robots_CutebotPro_setServoAngle",
    "robots_CutebotPro_setServoSpeed",
    "robots_CutebotPro_setExtendedMotorSpeed",
    "robots_CutebotPro_stopExtendedMotor"
]

/**
 * List of all authorized blocks (concatenation of all the authorized blocks by category)
*/
const AUTHORIZED_BLOCKS = [...AUTHORIZED_BLOCKS_DISPLAY, ...AUTHORIZED_BLOCKS_SENSORS, ...AUTHORIZED_BLOCKS_IO, ...AUTHORIZED_BLOCKS_ACTUATORS, ...AUTHORIZED_BLOCKS_COMMUNICATION, ...AUTHORIZED_BLOCKS_ROBOTS];

/**
 * List of all excluded categories that should be automatically added to reverse traduction
 */
const excludedCategories = ['loops', 'logic', 'math', 'text', 'lists', 'variables', 'procedures', 'exception'];


