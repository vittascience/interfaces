/**
 * Database of defaut blocks in BBC micro:bit toolbox.
 * There is only the blocks which require default inputs.
 */
const TOOLBOXES_BLOCKS_CONTENT = {
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {
            // display - screen
            'show_number': this.Set.number("VALUE"),
            'show_number-txt': this.Set.text('VALUE', "{hello}"),
            'show_string-num': this.Set.text('TEXT', "1024"),
            'show_string': this.Set.text('TEXT', "{hello}"),
            'display_show_gauge': this.Set.number("VALUE", 255) + this.Set.number("MAX", 1024),
            'display_plot_bar_graph': this.Set.number("VALUE", 0),
            "set_pixel": this.Set.number("X") + this.Set.number("Y") + this.Set.state(),
            "set_light_pixel": this.Set.number("X") + this.Set.number("Y") + this.Set.number("LIGHT", 4),
            "get_pixelState": this.Set.number("X") + this.Set.number("Y") + this.Set.state(),
            "toggle_pixelState": this.Set.number("X") + this.Set.number("Y"),
            "set_brightness": this.Set.number("VALUE", 4),
            "show_clock": this.Set.number("CLOCK", 1),
            // display - LCD
            "display_lcdSetText": this.Set.text('TEXT'),
            // display - OLED
            "display_addOledText": this.Set.number("X") + this.Set.number("Y") + this.Set.text("TEXT"),
            "display_setOledPixel": this.Set.number("X") + this.Set.number("Y") + this.Set.state(),
            "display_showOledIcon": this.Set.field("ICON", "BUTTERFLY") + this.Set.number("X") + this.Set.number("Y") + this.Set.state(),
            // display - LED
            "display_setGroveSocketLed": this.Set.state(),
            "display_setLEDintensity": this.Set.number("VALUE", 1023),
            "display_setVariableColorLED": this.Set.number("VALUE", 100),
            "display_setNumberGrove4Digit": this.Set.field("DIO", "pin14") + this.Set.number("N", 1024),
            "display_setClockGrove4Digit": this.Set.field("DIO", "pin14"),
            // display - LED Bar
            "display_setLevelLedBar": this.Set.field("DCKI", "pin14") + this.Set.number("VALUE", 3.14),
            "display_my9221_reverse": this.Set.field("DCKI", "pin14") + this.Set.state(),
            "display_setTrafficLight": this.Set.state(),
            "display_setLampBitLight": this.Set.state(),
            // display - neopixel
            "display_defineNeopixel": this.Set.number("N", 20) + this.Set.field("PIN", "pin0"),
            "display_controlNeopixelLed": this.Set.number("LED") + this.Set.number("R", 255) + this.Set.number("G", 255) + this.Set.number("B"),
            "display_controlColorNeopixelLed": this.Set.number("LED") + this.Set.colour_picker(),
            "display_neopixel_controlAllLedRGB": this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_neopixel_controlAllLedPalette": this.Set.colour_picker(),
            "display_controlZipHaloLed": this.Set.number("LED") + this.Set.number("R", 255) + this.Set.number("G", 255) + this.Set.number("B"),
            "display_controlColorZipHaloLed": this.Set.number("LED") + this.Set.colour_picker(),
            "display_ZipHaloLed_controlAllLedRGB": this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_ZipHaloLed_controlAllLedPalette": this.Set.colour_picker(),
            // display - LED matrix
            "display_rgb_led_matrix_DrawBitmap": '<mutation duration="false"></mutation>',
            // display - games
            "display_games_createSprite": this.Set.number("X") + this.Set.number("Y"),
            "display_games_deleteSprite": this.Set.variable("SPRITE", 'sprite'),
            "display_games_isSpriteDeleted": this.Set.variable("SPRITE", 'sprite'),
            "display_games_moveSprite": this.Set.variable("SPRITE", 'sprite') + this.Set.number("STEP", 1),
            "display_games_getSpritePosition": this.Set.variable("SPRITE", 'sprite'),
            "display_games_changeScore": this.Set.number("N", 1),
            // io - micro:bit
            "io_pause": this.Set.number("TIME", 1),
            "io_waitUntil": "<value name='UNTIL'><shadow type='logic_compare'>" + this.Set.field("OP", 'EQ') + this.Set.number("B", 1) + "</shadow></value>",
            "io_runEvery": this.Set.number("H") + this.Set.number("MIN") + this.Set.number("S", 1) + this.Set.number("MS"),
            // io - microphone
            "io_micro_setSoundThreshold": this.Set.number("THRESH", 255),
            // io - external modules
            "io_getGroveButton": this.Set.field('PIN', "pin1"),
            "io_getGroveSwitch": this.Set.field('PIN', "pin1"),
            "io_getMagneticSwitch": this.Set.field('PIN', "pin1"),
            "io_getGroveTactile": this.Set.field('PIN', "pin1"),
            "io_getGroveRotaryAngle": this.Set.field('PIN', "pin1"),
            "io_getGroveSlidePotentiometer": this.Set.field('PIN', "pin1"),
            "io_getGroveColoredButton": this.Set.field('PIN', "pin15"),
            "io_setGroveColoredButton": this.Set.field('PIN', "pin1") + this.Set.state(),
            "io_getKeypadNumber": this.Set.field("TX", "pin1") + this.Set.field("RX", "pin15"),
            "io_getGroveThumbJoystick": this.Set.field("PIN_Y", "pin1"),
            // io - pins
            "io_readDigitalPin": this.Set.field('PIN', "pin1"),
            "io_writeDigitalPin": this.Set.field('PIN', "pin2") + this.Set.state(),
            "io_readAnalogPin": this.Set.field('PIN', "pin1"),
            "io_writeAnalogPin": this.Set.field('PIN', "pin2") + this.Set.number("VALUE", 1023),
            "io_setPwm": this.Set.field('PIN', "pin1") + this.Set.number("PERIOD", 1000),
            "io_readPulseIn": this.Set.field('PIN', "pin1") + this.Set.state(),
            //communication - log
            "communication_log_setLabel": "<mutation items='1'></mutation><value name='ADD0'><block type='text'><field name='TEXT'>Label1</field></block></value>",
            "communication_log_addData": "<mutation items='1'></mutation><value name='ADD0'><block type='communication_log_data'>" + this.Set.text('LABEL', "label") + this.Set.number("DATA") + "</block></value>",
            "communication_log_data": this.Set.text('LABEL', "label") + this.Set.number("DATA"),
            // communication - radio
            "communication_radioSendString": this.Set.text('STR', "{radioMessage}"),
            "communication_radioSendNumber": this.Set.number("N", 1),
            "communication_radioSendValue": this.Set.text('NAME', "pi") + this.Set.number("VALUE", 3.14),
            "communication_radioConfig": this.Set.number("CANAL", 7) + this.Set.number("POWER", 6) + this.Set.number("LEN", 32) + this.Set.number("GROUP"),
            // communication - serial
            "communication_serialWrite": '<mutation newlines="false"></mutation>' + this.Set.text('TEXT', "{hello}"),
            "communication_graphSerialWrite": "<mutation items='1'></mutation>"
                + "<value name='ADD0'><block type='communication_graphSerialWrite_datasFormat'><field name='NAME'>{data1}</field></block></value>",
            "communication_playComputerFrequency": this.Set.number("FREQUENCY", 440),
            "communication_serialInit": this.Set.field("RX", "pin14"),
            "communication_writeOpenLogSd": this.Set.field("RX", "pin14")
                + "<value name='DATA'><block type='text_join'><mutation items='3'></mutation>"
                + this.Set.text('ADD0', "{data1}", true) + this.Set.text('ADD1', ";", true) + this.Set.text('ADD2', "{data2}", true)
                + "</block></value>",
            "communication_uart_writeData": this.Set.text('DATA'),
            // communication - bluetooth
            "communication_sendBluetoothData": this.Set.field("RX", "pin14") + this.Set.text("DATA"),
            "communication_onBluetoothDataReceived": this.Set.field("RX", "pin14"),
            "communication_HM10_sendBluetoothData": this.Set.field("RX", "pin14") + this.Set.text("DATA"),
            "communication_HM10_onBluetoothDataReceived": this.Set.field("RX", "pin14"),
            // communication - tracking modules
            "communication_gps_getNMEA": this.Set.field("RX", "pin14"),
            "communication_gps_getGGAInformations": this.Set.field("RX", "pin14"),
            "communication_clockRTC_setHour": this.Set.number("HOUR", 8) + this.Set.number("MIN", 40) + this.Set.number("SEC", 10),
            // sensors - enviro:bit
            "sensors_envirobit_tcs3472_setLED": this.Set.state(),
            "sensors_envirobit_waitForClaps": this.Set.number("DURATION", 1),
            // sensors - gas
            "sensors_getO2gas": this.Set.field('PIN', "pin1"),
            "sensors_SCD30_forcedCalibration": this.Set.number('DEFAULT', 420),
            // sensors - climate
            "sensors_getAirQualityValue": this.Set.field('PIN', "pin1"),
            "sensors_getGroveMoisture": this.Set.field('PIN', "pin1"),
            "sensors_getGroveCapacitiveMoisture": this.Set.field('PIN', "pin1"),
            "sensors_getGroveTemperature": this.Set.field('PIN', "pin1"),
            "sensors_getGroveHighTemperature": this.Set.field("A1", "pin1"),
            "sensors_dhtReadData": this.Set.field('PIN', "pin1"),
            "sensors_mpx5700ap_calibrate": this.Set.number("M", 1) + this.Set.number("B", 1),
            "sensors_getGroveWaterAmount": this.Set.field('PIN', "pin1"),
            "sensors_getRainGauge": this.Set.field('PIN', "pin1"),
            "sensors_getAnemometer": this.Set.field('PIN', "pin1"),
            // sensors - sound & light
            "sensors_getGroveLight": this.Set.field('PIN', "pin1"),
            "sensors_getUVindex": this.Set.field('PIN', "pin1"),
            "sensors_getGroveSound": this.Set.field('PIN', "pin1"),
            "sensors_getGroveUltrasonicRanger": this.Set.field('PIN', "pin1"),
            "sensors_getGroveLineFinder": this.Set.field('PIN', "pin1"),
            "sensors_getGroveTilt": this.Set.field('PIN', "pin1"),
            "sensors_getGroveMotion": this.Set.field('PIN', "pin1"),
            "sensors_getPiezoVibration": this.Set.field('PIN', "pin1"),
            // sensors - other
            "sensors_getGroveButton": this.Set.field('PIN', "pin1"),
            "sensors_getEarClipHeartRate": this.Set.field('PIN', "pin1"),
            "sensors_getFsr402Force": this.Set.field('PIN', "pin1"),
            "sensors_getEmgDetector": this.Set.field('PIN', "pin1"),
            // actuators - motors
            "actuators_setServoAngle": this.Set.field('PIN', "pin2") + this.Set.number("ANGLE", 90),
            "actuators_continuousServo_setSpeed": this.Set.field('PIN', "pin2") + this.Set.number("SPEED", 100),
            "actuators_setMotorPower": this.Set.field('PIN', "pin2") + this.Set.number("POWER", 1023),
            "actuators_setFanPower": this.Set.field('PIN', "pin2") + this.Set.number("POWER", 1023),
            "actuators_kitronik_controlMotor": this.Set.number("SPEED", 100),
            "actuators_setVibrationMotorState": this.Set.field('PIN', "pin2") + this.Set.state(),
            "actuators_setGroveRelayState": this.Set.field('PIN', "pin2") + this.Set.state(),
            // actuators - Kitronic Traffic
            "actuators_controlAccessBitBuzzer": this.Set.number('VALUE', 500),
            // actuators - MOSFET
            "actuators_mosfet_setState": this.Set.state(),
            "actuators_mosfet_setPercentValue": this.Set.number("VALUE", 100),
            // actuators - buzzer
            "actuators_playMusicGroveBuzzer": this.Set.field('PIN', "pin_speaker"),
            "actuators_music_playSong": this.Set.field('PIN', "pin_speaker"),
            "actuators_music_playNotes":
                `<mutation items='3'></mutation>
                <field name='PIN'>pin_speaker</field>
                <value name='ADD0'><block type='actuators_music_note'><field name='NOTE'>d</field><field name='OCTAVE'>4</field></block></value>
                <value name='ADD1'><block type='actuators_music_note'><field name='NOTE'>f#</field><field name='OCTAVE'>4</field></block></value>
                <value name='ADD2'><block type='actuators_music_note'><field name='NOTE'>g</field><field name='OCTAVE'>4</field></block></value>`,
            "actuators_music_playFrequency": this.Set.field('PIN', "pin_speaker") + this.Set.number("FREQUENCY", 440) + this.Set.number("DURATION", 500),
            "actuators_music_stop": this.Set.field('PIN', "pin_speaker"),
            "actuators_music_setVolume": this.Set.number("VOL", 255),
            "actuators_music_setTempo": this.Set.number("TICKS", 4) + this.Set.number("BPM", 120),
            "actuators_kitronik_playFrequency": this.Set.number("FREQUENCY", 440) + this.Set.number("DURATION", 500),
            // actuators - speech
            "actuators_speech_saySomething": this.Set.text('TEXT', "{hello}") + this.Set.number("SPEED", 100) + this.Set.number("PITCH", 100),
            // actuators - others
            "actuators_setElectromagnetState": this.Set.state(),
            "actuators_setWaterAtomizerState": this.Set.state(),
            // robots - maqueen
            "robots_controlMaqueenLed": this.Set.state(),
            "robots_setMaqueenGo": this.Set.number("SPEED", 125),
            "robots_rotateMaqueen": this.Set.number("SPEED", 125),
            "robots_controlMaqueenMotor": this.Set.number("SPEED", 125),
            "robots_setMaqueenServoAngle": this.Set.number("ANGLE", 90),
            "robots_setMaqueenNeopixel": this.Set.number("R", 255) + this.Set.number("G", 255) + this.Set.number("B"),
            "robots_setMaqueenNeopixelPalette": this.Set.colour_picker(),
            "robots_setMaqueenBuzzer": this.Set.number("FREQUENCY", 440) + this.Set.number("TIME", 500),
            // robots - maqueenPlus
            "robots_controlMaqueenPlusLed": this.Set.state(),
            "robots_setMaqueenPlusGo": this.Set.number("SPEED", 125),
            "robots_rotateMaqueenPlus": this.Set.number("SPEED", 125),
            "robots_controlMaqueenPlusMotor": this.Set.number("SPEED", 125),
            "robots_getMaqueenPlusUltrasonicRangerTrigEcho": this.Set.field('ECHO', "pin1"),
            "robots_setMaqueenPlusV1ServoAngle": this.Set.number("ANGLE", 90),
            "robots_setMaqueenPlusV2ServoAngle": this.Set.number("ANGLE", 90),
            "robots_setMaqueenPlusNeopixel": this.Set.number("R", 255) + this.Set.number("G", 255) + this.Set.number("B"),
            "robots_setMaqueenPlusNeopixelPalette": this.Set.colour_picker(),
            "robots_setMaqueenPlusBuzzer": this.Set.number("FREQUENCY", 440) + this.Set.number("TIME", 500),
            // robots - cutebot
            "robots_controlCutebotRGBLedPalette": this.Set.colour_picker(),
            "robots_controlCutebotRGBLed": this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "robots_setCutebotNeopixel": this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "robots_setCutebotNeopixelPalette": this.Set.colour_picker(),
            "robots_setCutebotGo": this.Set.number("SPEED", 30),
            "robots_setCutebotTurn": this.Set.number("SPEED", 30),
            "robots_controlCutebotMotors": this.Set.number("SPEED", 30),
            "robots_setCutebotServoAngle": this.Set.number("ANGLE", 90),
            "robots_setCutebotBuzzer": this.Set.number("FREQUENCY", 440) + this.Set.number("TIME", 500),
            // robots - cutebot Pro
            "robots_CutebotPro_setGo": this.Set.number("SPEED", 30),
            "robots_CutebotPro_turn": this.Set.number("SPEED", 30),
            "robots_CutebotPro_controlMotors": this.Set.number("SPEED", 30),
            "robots_CutebotPro_controlHeadlightsPalette": this.Set.colour_picker('#fa1432'),
            "robots_CutebotPro_controlHeadlights": this.Set.number("R", 250) + this.Set.number("G", 20) + this.Set.number("B", 50),
            "robots_CutebotPro_setNeopixel": this.Set.number("R", 50) + this.Set.number("G", 60) + this.Set.number("B", 220),
            "robots_CutebotPro_setNeopixelPalette": this.Set.colour_picker('#323cdc'),
            "robots_CutebotPro_runWithSpeed": this.Set.number("SPEED", 30),
            "robots_CutebotPro_runWithRadius": this.Set.number("RADIUS", 20) + this.Set.number("SPEED", 30),
            "robots_CutebotPro_setMotorsSpeed": this.Set.number("SPEED_L", 30) + this.Set.number("SPEED_R", 30),
            "robots_CutebotPro_runDistance": this.Set.number("DISTANCE", 50) + '<mutation wait="false"></mutation>',
            "robots_CutebotPro_defineSquare": this.Set.number("SIZE", 10),
            "robots_CutebotPro_runSquare": this.Set.number("N", 5) + '<mutation wait="false"></mutation>',
            "robots_CutebotPro_turnWithAngle": this.Set.number("ANGLE", 90) + '<mutation wait="false"></mutation>',
            "robots_CutebotPro_placeWithAngle": this.Set.number("ANGLE", 90) + '<mutation wait="false"></mutation>',
            "robots_CutebotPro_turnWheel": this.Set.number("ANGLE", 180) + '<mutation wait="false"></mutation>',
            "robots_CutebotPro_setServoAngle": this.Set.number("ANGLE", 90),
            "robots_CutebotPro_setServoSpeed": this.Set.number("SPEED", 50),
            "robots_CutebotPro_setExtendedMotorSpeed": this.Set.number("SPEED", 50),
            // robots - BitCar
            "robots_setBitCarGo": this.Set.number("SPEED", 50),
            "robots_rotateBitCar": this.Set.number("SPEED", 50),
            "robots_controlBitCarMotor": this.Set.number("SPEED", 50),
            "robots_setBitCarNeopixel": this.Set.number("R", 255) + this.Set.number("G", 255) + this.Set.number("B"),
            "robots_setBitCarNeopixelPalette": this.Set.colour_picker(),
            "robots_setBitCarBuzzer": this.Set.number("FREQUENCY", 440) + this.Set.number("TIME", 500),
            // robots - Kitro:bot
            "robots_controlKitrobotLed": this.Set.state(),
            "robots_setKitrobotGo": this.Set.number("SPEED", 30),
            "robots_rotateKitrobot": this.Set.number("SPEED", 30),
            "robots_controlKitrobotMotor": this.Set.number("SPEED", 30),
            "robots_setKitrobotNeopixel": this.Set.number("R", 255) + this.Set.number("G", 255) + this.Set.number("B"),
            "robots_setKitrobotNeopixelPalette": this.Set.colour_picker(),
            "robots_setKitrobotBuzzer": this.Set.number("FREQUENCY", 440) + this.Set.number("TIME", 500),
            // robots - codo
            "robots_setCodoGo": this.Set.number("SPEED", 1023),
            "robots_setCodoTurn": this.Set.number("SPEED", 1023),
            "robots_controlCodoMotors": this.Set.number("SPEED", 1023),
            // robots - oobybot
            "robots_controlOobybotLed": this.Set.state(),
            "robots_setOobybotGo": this.Set.number("SPEED", 50),
            "robots_setOobybotTurn": this.Set.number("SPEED", 50),
            "robots_controlOobybotMotors": this.Set.number("SPEED", 50),
            // robots - buggy
            "robots_setBuggyGo": this.Set.number("SPEED", 1023),
            "robots_setBuggyTurn": this.Set.number("SPEED", 1023),
            "robots_controlBuggyMotors": this.Set.number("SPEED", 1023),
            // robots - bit:bot
            "robots_setBitbotGo": this.Set.number("SPEED", 1023),
            "robots_controlBitBotMotor": this.Set.number("SPEED", 1023),
            "robots_setBitBotNeopixel": this.Set.number("LED") + this.Set.number("R", 255) + this.Set.number("G", 255) + this.Set.number("B"),
            "robots_setBitBotNeopixelPalette": this.Set.number("LED") + this.Set.colour_picker(),
            // robots - gamepad
            "robots_setGamepadV4LEDMotor": this.Set.state(),
            "robots_setGamepadLED": this.Set.state(),
            "robots_setGamepadMotorVibration": this.Set.state(),
            "robots_setGamepadBuzzerFreq": this.Set.number("FREQUENCY", 440) + this.Set.number("TIME", 500),
            // Tello - Drone
            "tello_move": this.Set.field("DIRECTION", "forward") + this.Set.number("DISTANCE", 20),
            "tello_move_up_down": this.Set.field("DIRECTION", "up") + this.Set.number("ALTITUDE", 100),
            "drone_init": this.Set.text('SSID', 'TELLO-XXXXXX') + this.Set.field("TX", 'pin14') + this.Set.field("RX", 'pin0'),
            "tello_rotate": this.Set.field("DIRECTION", 'cw') + this.Set.number("ANGLE", 90),
            "tello_go": this.Set.number("DISTANCE", 25) + this.Set.number("SPEED", 20),
            "tello_rectangle_form": this.Set.number("LENGTH", 50) + this.Set.number("WIDTH", 20),
            "tello_square_form": this.Set.number("LENGTH", 35),
            // Cameras - HuskyLens
            "cameras_huskylens_customName": this.Set.text("NAME", 'Nom') + this.Set.number("ID", 1),
            "cameras_huskylens_setText": this.Set.text("TEXT", 'Vittascience') + this.Set.number("X", 160) + this.Set.number("Y", 120),
            "cameras_huskylens_checkID": this.Set.number("ID", 1),
            "cameras_huskylens_getLineDirection": this.Set.number("ID", 1),
            "cameras_huskylens_saveModel": this.Set.number("INDEX", 0),
            "cameras_huskylens_loadModel": this.Set.number("INDEX", 0),
            "cameras_huskylens_learnID": this.Set.number("ID", 1),
            // Cameras - Wio Lite
            "wio_get_class_data_by_id": this.Set.number("ID", 1),


            // EDGE AI blocks
            "vittaia_detect_class": this.Set.text("MODEL_CLASS", 'Class') + this.Set.field("IS_DETECTED", '=='),
            "vittaia_load_cloud_model": this.Set.text("MODEL_ID", 'https://fr.vittascience.com/ia/model/67da8c5faec8e/'),
            /** Python default blocks */

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
            "math_number_property": this.Set.number("NUMBER_TO_CHECK", 9),
            "math_map": this.Set.number("VALUE", 512) + this.Set.number("MIN1") + this.Set.number("MAX1", 1023) + this.Set.number("MIN2") + this.Set.number("MAX2", 255),
            "math_round": this.Set.number("NUM", 3.1),
            "math_round_ndigits": this.Set.number("NUM", 3.1) + this.Set.number("DIGITS", 2),
            "math_modulo": this.Set.number("DIVIDEND", 64) + this.Set.number("DIVISOR", 10),
            "math_constrain": this.Set.number("LOW", 1) + this.Set.number("HIGH", 100),
            "math_random_int": this.Set.number("FROM", 1) + this.Set.number("TO", 100),
            "math_atan2": this.Set.number("X", 1) + this.Set.number("Y", 1),
            // text
            "text_comment": this.Set.field("TEXT", '{comment}'),
            "text_newline": this.Set.number('N', 1),
            "text_append": this.Set.text('TEXT'),
            "text_split": this.Set.text('VALUE') + this.Set.text('SEP', ';'),
            "text_length": this.Set.text('VALUE', 'abc'),
            "text_indexOf": this.Set.variable("VALUE", '{textVariable}') + this.Set.text('VALUE', 'abc'),
            "text_charAt": this.Set.variable("VALUE", '{textVariable}'),
            "text_getSubstring": this.Set.variable("STRING", '{textVariable}'),
            "text_changeCase": this.Set.text('TEXT', 'abc'),
            "text_trim": this.Set.text('TEXT', 'abc'),
            "text_count": this.Set.text('SUB', 'bon') + this.Set.text('TEXT', 'bonbon'),
            "text_replace": this.Set.text('FROM', 'a') + this.Set.text('TO', 'b') + this.Set.text('TEXT', 'abc'),
            "text_reverse": this.Set.text('TEXT', 'abc'),
            "text_count_characters": this.Set.text('TEXT', 'P@ssw0rd'),
            "text_random_string": this.Set.number('LENGTH', 6),
            // list
            "lists_create_with-0": '<mutation items="0"></mutation>',
            "lists_repeat": this.Set.number("NUM", 5),
            "lists_indexOf": this.Set.variable("LIST", '{listVariable}'),
            "lists_getIndex": this.Set.variable("VALUE", '{listVariable}'),
            "lists_append": this.Set.variable("LIST", '{listVariable}'),
            "lists_setIndex": this.Set.variable("LIST", '{listVariable}'),
            "lists_getSublist": this.Set.variable("LIST", '{listVariable}'),
            "lists_split": this.Set.text('DELIM', ','),
        }
    }
};