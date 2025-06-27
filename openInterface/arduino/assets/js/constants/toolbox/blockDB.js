/**
 * Database of defaut blocks in Arduino toolbox.
 * There is only the blocks which require default inputs.
 */

const TOOLBOXES_BLOCKS_CONTENT = {
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {
            // display - LED 13
            "io_control_arduino_led": this.Set.state(),
            // display - LCD
            "display_lcdRGBSetText": this.Set.text("TEXT"),
            "display_lcdRGBSetColor": this.Set.number("R", 255) + this.Set.number("G", 255) + this.Set.number("B", 255),
            "display_lcdRGBSetPaletteColor": this.Set.colour_picker(),
            // display - neopixel
            "display_defineNeopixel": this.Set.field("PIN", '2'),
            "display_controlNeopixelLed": this.Set.field("PIN", '2') + this.Set.number("LED") + this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_controlColorNeopixelLed": this.Set.field("PIN", '2') + this.Set.number("LED") + this.Set.colour_picker(),
            "display_neopixel_controlAllLedRGB": this.Set.field("PIN", '2') + this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_neopixel_controlAllLedPalette": this.Set.field("PIN", '2') + this.Set.colour_picker(),
            "display_rainbowNeopixel": this.Set.field("PIN", '2'),
            // display - OLED
            "display_addOledText": this.Set.number("X") + this.Set.number("Y") + this.Set.text("TEXT"),
            "display_oledScreen_drawIcon": this.Set.number("X") + this.Set.number("Y"),
            // display - LED
            "display_setGroveSocketLed": this.Set.field("PIN", '2') + this.Set.state(),
            "display_setLEDintensity": this.Set.number("VALUE", 255),
            "display_setVariableColorLED": this.Set.number("VALUE", 100),
            "display_setNumberGrove4Digit": this.Set.field("CLK", '2') + this.Set.field("DIO", '3') + this.Set.number("N", '1024'),
            "display_setClockGrove4Digit": this.Set.field("CLK", '2') + this.Set.field("DIO", '3'),
            "display_setTemperatureGrove4Digit": this.Set.field("CLK", '2') + this.Set.field("DIO", '3') + this.Set.number("TEMP", '20'),
            "display_setLevelLedBar": this.Set.field("DI", '3') + this.Set.field("DCKI", '2') + this.Set.number("VALUE", 3.1),
            "display_setGreenToRedLedBar": this.Set.field("DI", '3') + this.Set.field("DCKI", '2'),
            "display_setLedLedBar": this.Set.number("VALUE", 1) + this.Set.state() + this.Set.field("DI", '3') + this.Set.field("DCKI", '2'),
            // display - Chainable LED RGB
            "display_defineChainableRGBLed": this.Set.field("CIN", '2') + this.Set.field("DIN", '3'),
            "display_setColorChainableRGBLed": this.Set.field("CIN", '2') + this.Set.field("DIN", '3') + this.Set.number("LED") + this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_setPaletteColorChainableRGBLed": this.Set.field("CIN", '2') + this.Set.field("DIN", '3') + this.Set.number("LED") + this.Set.colour_picker(),
            "display_setColorAllChainableRGBLed": this.Set.field("CIN", '2') + this.Set.field("DIN", '3') + this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_setPaletteAllChainableRGBLed": this.Set.field("CIN", '2') + this.Set.field("DIN", '3') + this.Set.colour_picker(),
            // io - time
            "io_wait": this.Set.number("TIME", 1),
            "io_waitUntil": '<value name="UNTIL"><shadow type="logic_compare"><field name="OP">EQ</field>' + this.Set.number("B", 1) + '</shadow></value>',
            // io - external inputs
            "io_getGroveButton": this.Set.field("PIN", '4'),
            "io_getGroveSwitch": this.Set.field("PIN", '4'),
            "io_getGroveTactile": this.Set.field("PIN", '4'),
            "io_getKeypadNumber": this.Set.field("RX", '5') + this.Set.field("TX", '4'),
            // io - pins
            "io_readDigitalPin": this.Set.field("PIN", '4'),
            "io_readDigitalPin_input": this.Set.number("VALUE", 4),
            "io_readAnalogPin_input": this.Set.number("VALUE", 0),
            "io_writeDigitalPin": this.Set.field("PIN", '5') + this.Set.state(),
            "io_writeDigitalPin_input": this.Set.number("PIN", 5) + this.Set.state(),
            "io_writeAnalogPin": this.Set.field("PIN", '5') + this.Set.number("VALUE", 255),
            "io_writeAnalogPin_input": this.Set.number("PIN", 5) + this.Set.number("VALUE", 255),
            "io_setPwm": this.Set.field("PIN", '5') + this.Set.number("VALUE", 50),
            "io_readPulseIn": this.Set.field("PIN", '4') + this.Set.state(),
            // io - mp3
            "io_groveMp3_init": this.Set.field("RX", '5') + this.Set.field("TX", '4'),
            "io_groveMp3_setVolume": this.Set.number("VOLUME", 10),
            "io_groveMp3_playSDSong": this.Set.text("NAME", "vittascience.mp3"),
            "io_groveMp3_playSDDirectorySong": this.Set.text("DIRECTORY", "./") + this.Set.number("INDEX", 0),
            // communication - serial connection
            "communication_serialWrite": '<mutation newlines="false"></mutation>' + this.Set.text("TEXT", '{hello}'),
            "communication_graphSerialWrite": '<mutation items="1"></mutation>'
                + '<value name="ADD0"><block type="communication_graphSerialWrite_datasFormat">' + this.Set.field("NAME", '{data1}') + '</block></value>',
            "communication_playComputerFrequency": this.Set.number("FREQUENCY", 440),
            // communication - data logging
            "communication_writeOpenLogSd": this.Set.field("RX", '7') + this.Set.field("TX", '6') +
                '<value name="DATA"><block type="text_join">' + this.Set.text("ADD0", '{data1}') + this.Set.text("ADD1", ';') + this.Set.text("ADD2", '{data2}') + '</block></value>',
            "communication_SDWriteDataSPI": this.Set.field("CS", '4') + '<value name="DATA"><block type="text_join">'
                + this.Set.text("ADD0", '{data1}') + this.Set.text("ADD1", ';') + this.Set.text("ADD2", '{data2}') + '</block></value>',
            // communication - bluetooth
            "communication_setSerialBluetooth": this.Set.text("NAME", "VittaEmitter") + this.Set.text("MODE", "M") + this.Set.text("PIN", "0000"),
            "communication_sendSerialBluetoothData": this.Set.field("RX", '7') + this.Set.field("TX", '6') + this.Set.text("TEXT"),
            "communication_onSerialBluetoothDataReceived": this.Set.field("RX", '7') + this.Set.field("TX", '6'),
            "communication_hm10_sendBluetoothData": this.Set.field("RX", '7') + this.Set.field("TX", '6') + this.Set.text("TEXT"),
            "communication_hm10_onBluetoothDataReceived": this.Set.field("RX", '7') + this.Set.field("TX", '6'),
            // communication - radio
            "communication_sendRadioNRF24Data": this.Set.field("CE", '9') + this.Set.field("CSN", '10') + this.Set.text("DATA") + this.Set.number("CANAL", 100),
            "communication_onRadioNRF24_dataReceived": this.Set.field("CE", '9') + this.Set.field("CSN", '10') + this.Set.number("CANAL", 100),
            "communication_sendRadio433mhzData": this.Set.field("PIN", '6') + this.Set.text("DATA", '{radioMessage}'),
            "communication_onRadio433mhzDataReceived": this.Set.field("PIN", '6'),
            // communication - infrared
            "communication_onIRDataReceived": this.Set.field("PIN", '6'),
            "communication_onRemoteCommandReceived": this.Set.variable("DATA", 'IRdata'),
            // communication - tracking modules
            "communication_rfid_getCardID": this.Set.field("RX", '6') + this.Set.field("TX", '7'),
            "communication_onGPSDataReceived": this.Set.field("RX", '6') + this.Set.field("TX", '7'),
            "communication_clockRTC_setHour": this.Set.number("HOUR", 3) + this.Set.number("MIN", 30) + this.Set.number("SEC"),
            // sensors - gas
            "sensors_SCD30_forcedCalibration": this.Set.number("DEFAULT", 420),
            "sensors_getDustConcentration": this.Set.field("PIN", '8'),
            "sensors_getMhz19Data": this.Set.field("TX", '8') + this.Set.field("RX", '9'),
            // sensors - climate
            "sensors_getGroveHighTemperature": this.Set.field("A1", 'A1'),
            "sensors_ds18b20_getTemperature": this.Set.field("PIN", '8'),
            "sensors_getMax6675Temp": this.Set.field("SO", '8') + this.Set.field("CS", '9') + this.Set.field("CLK", '10'),
            "sensors_dhtReadData": this.Set.field("PIN", '8'),
            "sensors_getRainGauge": this.Set.field("PIN", '8'),
            "sensors_getAnemometer": this.Set.field("PIN", '8'),
            // sensors - sound & light
            "sensors_cameraTakePicture": this.Set.field("RX", '7') + this.Set.field("TX", '6') + this.Set.field("PIN_CS", '4'),
            // sensors - distance & movement
            "sensors_getGroveUltrasonicRanger": this.Set.field("PIN", '8'),
            "sensors_getGroveLineFinder": this.Set.field("PIN", '8'),
            "sensors_getGroveTilt": this.Set.field("PIN", '8'),
            "sensors_getGroveMotion": this.Set.field("PIN", '8'),
            "sensors_getPiezoVibration": this.Set.field("PIN", '8'),
            // actuators - servomotors
            "actuators_setServoAngle": this.Set.field("PIN", '5') + this.Set.number("ANGLE", 90),
            "actuators_continuousServo_setSpeed": this.Set.number("SPEED", 100),
            // actuators - I2C motor driver
            "actuators_DCMotor_setSpeed": this.Set.number("SPEED", 100),
            "actuators_stepperMotor_run": this.Set.number("STEP", 1024),
            // actuators - mini I2C motor driver
            "actuators_MiniDriver_DCMotor_drive": this.Set.number("SPEED", 100) + this.Set.number("DURATION", 1),
            // actuators - arduino motor shield 
            "actuators_MC33926MotorShield_setSpeed": this.Set.number("SPEED", 400),
            // actuators - MOSFET
            "actuators_mosfet_setState": this.Set.state(),
            "actuators_mosfet_setPercentValue": this.Set.number("VALUE", 100),
            // actuators - other
            "actuators_setGroveRelayState": this.Set.field("PIN", '2') + this.Set.state(),
            "actuators_setVibrationMotorState": this.Set.field("PIN", '2') + this.Set.state(),
            "actuators_setWaterAtomizerState": this.Set.field("PIN", '2') + this.Set.state(),
            "actuators_setElectromagnetState": this.Set.field("PIN", '2') + this.Set.state(),
            // acuatuators - buzzer/speaker
            "actuators_controlGroveBuzzerState": this.Set.field("PIN", '2') + this.Set.state(),
            "actuators_playNoteGroveBuzzer": this.Set.field("PIN", '2'),
            "actuators_playNoteDurationGroveBuzzer": this.Set.field("PIN", '2') + this.Set.number("DURATION", 1),
            "actuators_tone": this.Set.field("PIN", '2') + this.Set.number("FREQUENCY", 440),
            "actuators_toneDuration": this.Set.field("PIN", '2') + this.Set.number("FREQUENCY", 440) + this.Set.number("DURATION", 1),
            "actuators_noTone": this.Set.field("PIN", '2'),
            "actuators_playMusicGroveBuzzer": this.Set.field("PIN", '2'),
            // camera - Wio Lite
            "wio_get_class_data_by_id": this.Set.number("ID", 1),
            // VittaIA
            "vittaia_detect_class": this.Set.text("MODEL_CLASS", 'Class') + this.Set.field("IS_DETECTED", '=='),
            "vittaia_load_cloud_model": this.Set.text("MODEL_ID", 'https://fr.vittascience.com/ia/model/67da8c5faec8e/'),
            
            /** Arduino default blocks */
            // logic
            "controls_if": "<value name='IF0'><block type='logic_compare'>" + this.Set.number("B", 1) + "</block></value>",
            "controls_if-else": "<mutation else='1'></mutation><value name='IF0'><block type='logic_compare'>" + this.Set.number("B", 1) + "</block></value>",
            "logic_compare-eq": this.Set.field("OP", 'EQ') + this.Set.number("B", 1),
            "logic_compare-gte": this.Set.field("OP", 'GTE') + this.Set.number("B", 1),
            "logic_compare-lte": this.Set.field("OP", 'LTE') + this.Set.number("B", 1),
            "logic_operation-and": this.Set.field("OP", 'AND'),
            "logic_operation-or": this.Set.field("OP", 'OR'),
            // loop
            "controls_repeat": this.Set.number("TIMES", 10),
            "controls_for": this.Set.number("FROM", 1) + this.Set.number("TO", 10) + this.Set.number("BY", 1),
            // math
            "math_number": this.Set.field("NUM", 42),
            "math_arithmetic-add": this.Set.field("OP", 'ADD') + this.Set.number("B", 1),
            "math_arithmetic-minus": this.Set.field("OP", 'MINUS') + this.Set.number("B", 1),
            "math_arithmetic-multiply": this.Set.field("OP", 'MULTIPLY') + this.Set.number("B", 1),
            "math_arithmetic-divide": this.Set.field("OP", 'DIVIDE') + this.Set.number("B", 1),
            "math_single": this.Set.number("NUM", 9),
            "math_trig": this.Set.number("NUM", 45),
            "math_number_property": this.Set.number("NUMBER_TO_CHECK", 2),
            "math_map": this.Set.number("VALUE", 512) + this.Set.number("MIN1") + this.Set.number("MAX1", 1023) + this.Set.number("MIN2") + this.Set.number("MAX2", 255),
            "math_round": this.Set.number("NUM", 3.1),
            "math_modulo": this.Set.number("DIVIDEND", 64) + this.Set.number("DIVISOR", 10),
            "math_constrain": this.Set.number("LOW", 1) + this.Set.number("HIGH", 100),
            "math_random_int": this.Set.number("FROM", 1) + this.Set.number("TO", 100),
            "math_atan2": this.Set.number("X", 1) + this.Set.number("Y", 1),
            // text
            "text_comment": this.Set.field("TEXT", '{comment}'),
            "text_append": this.Set.text('TEXT'),
            "text_length": this.Set.text('VALUE', 'abc'),
            "text_changeCase": this.Set.variable("TEXT", 'abc'),
            // TODO: check if the blocks need to be add on Arduino
            /*
            "text_newline": this.Set.number('N', 1),
            "text_split": this.Set.text('VALUE') + this.Set.text('SEP' ,';'),
            "text_indexOf": this.Set.variable("VALUE", '{textVariable}') + this.Set.text('VALUE', 'abc'),
            "text_charAt": this.Set.variable("VALUE", '{textVariable}'),
            "text_getSubstring": this.Set.variable("STRING", '{textVariable}'),
            "text_trim": this.Set.text('TEXT', 'abc'),
            "text_count": this.Set.text('SUB', 'bon') + this.Set.text('TEXT', 'bonbon'),
            "text_replace": this.Set.text('FROM', 'a') + this.Set.text('TO', 'b') + this.Set.text('TEXT', 'abc'),
            "text_reverse": this.Set.text('TEXT', 'abc'),
            */
            // list
            "lists_repeat": this.Set.number("NUM", 5),
            "lists_length": this.Set.variable("LIST", '{listVariable}'),
            "lists_getIndex": this.Set.variable("LIST", '{listVariable}') + this.Set.number("AT"),
            // TODO: check if the blocks need to be add on Arduino
            /*
            "lists_indexOf": this.Set.variable("LIST", '{listVariable}'),
            "lists_append": this.Set.variable("LIST", '{listVariable}'),
            "lists_setIndex": this.Set.variable("LIST", '{listVariable}'),
            "lists_getSublist": this.Set.variable("LIST", '{listVariable}'),
            "lists_split": this.Set.text('DELIM' ,',')
            */
        }
    }
};