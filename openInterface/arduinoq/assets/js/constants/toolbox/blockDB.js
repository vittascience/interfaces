/**
 * Database of defaut blocks in Arduino toolbox.
 * There is only the blocks which require default inputs.
 */

const TOOLBOXES_BLOCKS_CONTENT = {
    specific: {
        textContent: () => '<value name="content"><block type="emptytext"></block></value>',
    },
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {
            // cpp

            // display - LED 13
            "io_control_arduino_led": this.Set.state(),
            // display - R4 LED matrix
            "display_builtinMatrix_drawBitmap": this.Set.number("X") + this.Set.number("Y"),
            "display_builtinMatrix_drawString": this.Set.text("TEXT") + this.Set.number("SPEED", 80),
            "display_builtinMatrix_showNumber": this.Set.number("N", 255),
            "display_builtinMatrix_setPixel": this.Set.number("X") + this.Set.number("Y") + this.Set.state(),
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
            "display_addOledText": this.Set.number("X") + this.Set.number("Y", 10) + this.Set.text("TEXT"),
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
            "io_waitUntil": '<value name="UNTIL"><block type="logic_compare"><field name="OP">EQ</field>' + this.Set.number("B", 1) + '</block></value>',
            // io - external inputs
            "io_getGroveButton": this.Set.field("PIN", '4'),
            "io_getReversedButton": this.Set.field("PIN", '4'),
            "io_getGroveSwitch": this.Set.field("PIN", '4'),
            "io_getGroveTactile": this.Set.field("PIN", '4'),
            "io_getGroveThumbJoystick": this.Set.field("PIN_Y", 'A1'),
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
            "io_groveMp3_setVolume": this.Set.number("VOLUME", 10),
            "io_groveMp3_playSDSong": this.Set.text("NAME", "music.mp3"),
            "io_groveMp3_playSDDirectorySong": this.Set.text("DIRECTORY", "./") + this.Set.number("INDEX", 0),
            "io_groveMp3_KT403A_playSongSpecify": this.Set.number("DIRECTORY", 0) + this.Set.number("INDEX", 0),
            // communication - serial connection
            "communication_serialWrite": '<mutation newlines="false"></mutation>' + this.Set.text("TEXT", '{hello}'),
            "communication_NumberSerialWrite": this.Set.number("NUMBER", 255),
            "communication_graphSerialWrite": '<mutation items="1"></mutation>'
                + '<value name="ADD0"><block type="communication_graphSerialWrite_datasFormat">' + this.Set.field("NAME", '{data1}') + '</block></value>',
            "communication_playComputerFrequency": this.Set.number("FREQUENCY", 440),
            // communication - data logging
            "communication_writeOpenLogSd": '<value name="DATA"><block type="text_join">' + this.Set.text("ADD0", '{data1}') + this.Set.text("ADD1", ';') + this.Set.text("ADD2", '{data2}') + '</block></value>',
            "communication_SDWriteDataSPI": this.Set.field("CS", '4') + '<value name="DATA"><block type="text_join">'
                + this.Set.text("ADD0", '{data1}') + this.Set.text("ADD1", ';') + this.Set.text("ADD2", '{data2}') + '</block></value>',
            // communication - bluetooth
            "communication_groveSerialBluetooth_setATCommand": this.Set.text("VALUE"),
            "communication_sendSerialBluetoothData": this.Set.text("TEXT"),
            "communication_hc05_setATCommand": this.Set.text("VALUE"),
            "communication_hc05_changeBaudrateTransmission": this.Set.number("BAUD", 9600),
            "communication_hc05_sendBluetoothData": this.Set.text("TEXT"),
            "communication_hm10_setATCommand": this.Set.text("VALUE"),
            "communication_hm10_sendBluetoothData": this.Set.text("TEXT"),
            // communication - radio
            "communication_sendRadioNRF24Data": this.Set.field("CE", '9') + this.Set.field("CSN", '10') + this.Set.text("DATA") + this.Set.number("CANAL", 100),
            "communication_onRadioNRF24_dataReceived": this.Set.field("CE", '9') + this.Set.field("CSN", '10') + this.Set.number("CANAL", 100),
            "communication_sendRadio433mhzData": this.Set.field("PIN", '6') + this.Set.text("DATA", '{radioMessage}'),
            "communication_onRadio433mhzDataReceived": this.Set.field("PIN", '6'),
            // communication - infrared
            "communication_ir_sendNECCommand": this.Set.number("ADDR", 0x00) + this.Set.number("CMD", 0x10) + this.Set.field("PIN", '7') + '<mutation repeat="false"></mutation>',
            "communication_ir_sendFrame": this.Set.variable("FRAME", '{listVariable}') + this.Set.field("PIN", '7'),
            "communication_onIRDataReceived": this.Set.field("PIN", '6'),
            "communication_onRemoteCommandReceived": this.Set.variable("DATA", 'IRdata'),
            // communication - tracking modules
            "communication_clockRTC_setHour": this.Set.number("HOUR", 3) + this.Set.number("MIN", 30) + this.Set.number("SEC"),
            // sensors - gas
            "sensors_SCD30_forcedCalibration": this.Set.number("DEFAULT", 420),
            "sensors_getDustConcentration": this.Set.field("PIN", '8'),
            // sensors - climate
            "sensors_getGroveHighTemperature": this.Set.field("A1", 'A1'),
            "sensors_ds18b20_getTemperature": this.Set.field("PIN", '8'),
            "sensors_getMax6675Temp": this.Set.field("SO", '8') + this.Set.field("CS", '9') + this.Set.field("CLK", '10'),
            "sensors_dhtReadData": this.Set.field("PIN", '8'),
            "sensors_getRainGauge": this.Set.field("PIN", '8'),
            "sensors_getAnemometer": this.Set.field("PIN", '8'),
            // sensors - sound & light
            "sensors_cameraTakePicture": this.Set.field("PIN_CS", '4'),
            // sensors - distance & movement
            "sensors_getGroveUltrasonicRanger": this.Set.field("PIN", '8'),
            "sensors_getGroveLineFinder": this.Set.field("PIN", '8'),
            "sensors_getGroveTilt": this.Set.field("PIN", '8'),
            "sensors_getGroveMotion": this.Set.field("PIN", '8'),
            "sensors_getPiezoVibration": this.Set.field("PIN", '8'),
            // actuators - servomotors
            "actuators_setServoAngle": this.Set.field("PIN", '3') + this.Set.number("ANGLE", 90),
            "actuators_continuousServo_setSpeed": this.Set.field("PIN", '3') + this.Set.number("SPEED", 100),
            "actuators_servo_detach": this.Set.field("PIN", '3'),
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
            "actuators_SPDTRelay_controlState": this.Set.state(),
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
            // Cameras - HuskyLens
            "cameras_huskylens_customName": this.Set.text("NAME", 'Nom') + this.Set.number("ID", 1),
            "cameras_huskylens_setText": this.Set.text("TEXT", 'Vittascience') + this.Set.number("X", 160) + this.Set.number("Y", 120),
            "cameras_huskylens_checkID": this.Set.number("ID", 1),
            "cameras_huskylens_getDataByID": this.Set.number("ID", 1),
            "cameras_huskylens_getLineDirection": this.Set.number("ID", 1),
            "cameras_huskylens_saveModel": this.Set.number("INDEX"),
            "cameras_huskylens_loadModel": this.Set.number("INDEX"),
            "cameras_huskylens_learnID": this.Set.number("ID", 1),
            // camera - Wio Lite
            "wio_get_class_data_by_id": this.Set.number("ID", 1),

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
            "math_round_ndigits": this.Set.number("NUM", 3.14159) + this.Set.number("DIGITS", 2),
            "math_modulo": this.Set.number("DIVIDEND", 64) + this.Set.number("DIVISOR", 10),
            "math_constrain": this.Set.number("LOW", 1) + this.Set.number("HIGH", 100),
            "math_random_int": this.Set.number("FROM", 1) + this.Set.number("TO", 100),
            "math_atan2": this.Set.number("X", 1) + this.Set.number("Y", 1),
            "math_min_max": '<mutation items="2"></mutation>',
            // text
            "text_comment": this.Set.field("TEXT", '{comment}'),
            "text_newline": this.Set.number('N', 1),
            "text_append": this.Set.text('TEXT'),
            "text_split": this.Set.text('VALUE') + this.Set.text('SEP', ';'),
            "text_length": this.Set.text('VALUE', 'abc'),
            "text_includesSubstr": this.Set.variable("VALUE", '{textVariable}') + this.Set.text('FIND', 'abc'),
            "text_indexOf": this.Set.variable("VALUE", '{textVariable}') + this.Set.text('VALUE', 'abc'),
            "text_charAt": this.Set.variable("VALUE", '{textVariable}'),
            "text_getSubstring": this.Set.variable("STRING", '{textVariable}'),
            "text_count_characters": this.Set.text('TEXT', 'P@ssw0rd'),
            "text_trim": this.Set.text('TEXT', 'abc'),
            "text_changeCase": this.Set.text("TEXT", 'abc'),
            "text_count": this.Set.text('SUB', 'bon') + this.Set.text('TEXT', 'bonbon'),
            "text_reverse": this.Set.text('TEXT', 'abc'),
            "text_replace": this.Set.text('FROM', 'a') + this.Set.text('TO', 'b') + this.Set.text('TEXT', 'abc'),
            "text_random_string": this.Set.number('LENGTH', 6),
            // list
            "lists_create_with-0": '<mutation items="0"></mutation>',
            "lists_repeat": this.Set.number("NUM", 5),
            "lists_indexOf": this.Set.variable("LIST", '{listVariable}'),
            "lists_getIndex": this.Set.variable("VALUE", '{listVariable}') + this.Set.number("AT"),
            "lists_append": this.Set.variable("LIST", '{listVariable}'),
            "lists_setIndex": this.Set.variable("LIST", '{listVariable}'),
            "lists_getSublist": this.Set.variable("LIST", '{listVariable}'),
            "lists_split": this.Set.text('DELIM', ','),

            // python

            // display
            "display_print": this.Set.text("TEXT", '{hello}'),
            "display_input": this.Set.text("TEXT", '{setText}'),
            "display_input_number": this.Set.text("TEXT", '{setNumber}'),
            // display - time
            "time_sleep": this.Set.number("TIME", 1),
            "time_waitUntil": this.Set.valueInput("UNTIL", '<block type="logic_compare"><field name="OP">EQ</field>' + this.Set.number("B", 1) + '</block>'),
            // bridges
            "bridges_provide": '<shadow type="procedures_functionReference"></shadow>' + this.Set.text("ID", "id_du_pont"),
            "bridges_call": this.Set.text("ID", "id_du_pont"),
            // bricks
            "bricks_app_run": '<mutation user_loop="false"></mutation>',
            "bricks_webui_send_message": this.Set.text("MESSAGE"),
            // matplotlib
            "graph_matplotlib_setLabel": this.Set.text("TITLE_LABEL") + this.Set.text("X_LABEL") + this.Set.text("Y_LABEL"),
            "graph_matplotlib_text": this.Set.number("X") + this.Set.number("Y") + this.Set.text("TEXT"),
            "graph_matplotlib_plot": this.Set.valueInput("X", '<shadow type="numpy_linspace">' + this.Set.number("MIN") + this.Set.number("MAX", 10) + this.Set.number("N", 100) + '</shadow>')
                + this.Set.valueInput("Y", '<shadow type="numpy_trig"><field name="OP">SIN</field>' + this.Set.valueInput("NUM", '<shadow type="numpy_linspace">' + this.Set.number("MIN") + this.Set.number("MAX", 10) + this.Set.number("N", 100) + '</shadow>') + '</shadow>'),
            "graph_matplotlib_scatter": this.Set.valueInput("X", '<shadow type="numpy_linspace">' + this.Set.number("MIN") + this.Set.number("MAX", 10) + this.Set.number("N", 100) + '</shadow>')
                + this.Set.valueInput("Y", '<shadow type="numpy_trig"><field name="OP">SIN</field>' + this.Set.valueInput("NUM", '<shadow type="numpy_linspace">' + this.Set.number("MIN") + this.Set.number("MAX", 10) + this.Set.number("N", 100) + '</shadow>') + '</shadow>'),
            "graph_matplotlib_bar": this.Set.valueInput("LEFT", '<shadow type="numpy_linspace">' + this.Set.number("MIN") + this.Set.number("MAX", 100) + this.Set.number("N", 50) + '</shadow>')
                + this.Set.valueInput("HEIGHT", '<shadow type="numpy_trig"><field name="OP">SIN</field>' + this.Set.valueInput("NUM", '<shadow type="numpy_linspace">' + this.Set.number("MIN") + this.Set.number("MAX", 50) + this.Set.number("N", 250) + '</shadow>') + '</shadow>'),
            // numpy
            "numpy_linspace": this.Set.number("MIN") + this.Set.number("MAX", 10) + this.Set.number("N", 100),
            "numpy_arange": this.Set.number("MIN") + this.Set.number("MAX", 10) + this.Set.number("STEP", 1),
            "numpy_table_with_shape": this.Set.number("COL", 2) + this.Set.number("ROW", 4) + this.Set.number("VALUE"),
            "numpy_create_table_with": '<mutation items="3"></mutation>' + this.Set.number("ADD0") + this.Set.number("ADD1", 1) + this.Set.number("ADD2", 2),
            "numpy_square_matrix": '<mutation dim="3"></mutation>',
            "numpy_getElement_matrix": this.Set.number("I") + this.Set.number("J"),
            "numpy_getElement_list": this.Set.number("I"),
            // ia
            "vittaia_load_model": this.Set.text("MODEL_URL", '{modelPath}'),
            "vittaia_make_predictions_file": '<mutation picture=""></mutation>',
            "vittaia_make_predictions_from_url": this.Set.text("PICTURE_URL", "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"),
            "vittaia_detect_class": '<field name="IS_DETECTED">==</field>' + this.Set.text("MODEL_CLASS"),
            "vittaia_init_webcam": this.Set.number("CAMERA"),
            "vittaia_load_sound_model": this.Set.text("MODEL_URL", '{modelSoundPath}'),
            "vittaia_load_discussion": this.Set.text("MODEL_URL", '{modelPath}'),
            "vittaia_set_randomness": this.Set.number("TEMPERATURE", 50),
            "vittaia_load_posture_model": this.Set.text("MODEL_URL", '{modelPosturePath}'),

            // html
            'span': this.specific.textContent(),
            'paragraph': this.specific.textContent(),
            'header': this.specific.textContent(),
            'link': this.specific.textContent(),
            'table': this.Set.valueInput("content", '<block type="tablerow"></block>') + this.Set.valueInput("content", '<block type="tablerow"></block>'),
            'tableheading': this.specific.textContent(),
            'tabledata': this.specific.textContent(),
            'unorderedlist': this.Set.valueInput("content", '<block type="listitem">' + this.specific.textContent() + '</block>'),
            'orderedlist': this.Set.valueInput("content", '<block type="listitem">' + this.specific.textContent() + '</block>'),
            'listitem': this.specific.textContent(),
            'label': this.specific.textContent(),
            'colornew': this.Set.colour_picker('#fff', "value"),
            'textshadownew': this.Set.colour_picker('#fff', "color"),
            'bgcolornew': this.Set.colour_picker('#fff', "value"),
            'bordernew': this.Set.colour_picker('#fff', "color"),
            'borderedge': this.Set.colour_picker('#fff', "color"),
            'boxshadownew': this.Set.colour_picker('#fff', "color"),
            'transition': this.Set.valueInput("timing-function", '<block type="transitiontimingdropdown"></block>'),
            'bi_math_arithmetic': this.Set.number("A", 1) + this.Set.number("B", 1),
            'socket_emit_message': this.Set.text("MESSAGE")

        }
    }
};