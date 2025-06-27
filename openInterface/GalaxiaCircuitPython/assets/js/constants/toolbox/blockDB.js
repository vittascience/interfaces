/**
 * Database of defaut blocks in Galaxia CircuitPython toolbox.
 * There is only the blocks which require default inputs.
 */
 const TOOLBOXES_BLOCKS_CONTENT = {
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {
            // display - Galaxia/RGB
            "display_galaxia_led_set_colors": this.Set.number("RED", 100) + this.Set.number("GREEN", 100) + this.Set.number("BLUE"),
            "display_galaxia_led_set_red": this.Set.number("RED", 100),
            "display_galaxia_led_set_green": this.Set.number("GREEN", 100),
            "display_galaxia_led_set_blue": this.Set.number("BLUE", 100),
            // display Galaxia/graphics
            "display_galaxia_plot_add_point": this.Set.number("POINT", 50),
            "display_galaxia_plot_set_y_scale": this.Set.number("MIN") + this.Set.number("MAX", 100),
            "display_galaxia_animate_function": this.Set.number("INTERVAL", 1) + this.Set.number("POINT", 50),
            // display - LCD
            "display_lcdSetText": this.Set.text('TEXT'),
            // display - OLED
            "display_addOledText": this.Set.number("X") + this.Set.number("Y") + this.Set.text("TEXT"),
            "display_setOledPixel": this.Set.number("X") + this.Set.number("Y") + this.Set.state(),
            "display_showOledIcon": this.Set.field("ICON", "BUTTERFLY") + this.Set.number("X") + this.Set.number("Y") + this.Set.state(),
            // display - LED
            "display_setGroveSocketLed": this.Set.state(),
            "display_setLEDintensity": this.Set.number("VALUE", 1023),
            "display_setNumberGrove4Digit": this.Set.field("DIO", "P20") + this.Set.field("CLK", "P19") + this.Set.number("N", 1024),
            "display_setClockGrove4Digit": this.Set.field("DIO", "P20") + this.Set.field("CLK", "P19"),
            "display_setLevelLedBar": this.Set.field("DCKI", "P20") + this.Set.field("DI", "P19") + this.Set.number("VALUE", 3.14),
            "display_my9221_reverse": this.Set.field("DCKI", "p20") + this.Set.state(),
            "display_setTrafficLight": this.Set.state(),
            // display - neopixel
            "display_controlNeopixelLed": this.Set.number("LED") + this.Set.number("R", WRITE_ANALOG_MAX_VALUE) + this.Set.number("G", WRITE_ANALOG_MAX_VALUE) + this.Set.number("B"),
            "display_controlColorNeopixelLed": this.Set.number("LED") + this.Set.colour_picker(),
            "display_neopixel_controlAllLedRGB": this.Set.number("R", WRITE_ANALOG_MAX_VALUE) + this.Set.number("G") + this.Set.number("B"),
            "display_neopixel_controlAllLedPalette": this.Set.colour_picker(),
            // io - galaxia
            "io_pause": this.Set.number("TIME", 1),
            "io_waitUntil": "<value name='UNTIL'><shadow type='logic_compare'>" + this.Set.field("OP", 'EQ') + this.Set.number("B", 1) + "</shadow></value>",
            // io - external modules
            "io_getGroveButton": this.Set.field('PIN', "P19"),
            "io_getGroveSwitch": this.Set.field('PIN', "P19"),
            "io_getGroveTactile": this.Set.field('PIN', "P19"),
            "io_getGroveRotaryAngle": this.Set.field('PIN', "P19"),
            "io_getGroveSlidePotentiometer": this.Set.field('PIN', "P19"),
            "io_getGroveColoredButton": this.Set.field('PIN', "P20"),
            "io_setGroveColoredButton": this.Set.field('PIN', "P19") + this.Set.state(),
            "io_getKeypadNumber": this.Set.field("RX", "P6") + this.Set.field("TX", "P7"),
            "io_getGroveThumbJoystick": this.Set.field("PIN_Y", "P19") + this.Set.field("PIN_X", "P20"),
            // io - pins
            "io_readDigitalPin": this.Set.field('PIN', "P19"),
            "io_writeDigitalPin": this.Set.field('PIN', "P19") + this.Set.state(),
            "io_readAnalogPin": this.Set.field('PIN', "P19"),
            "io_writeAnalogPin": this.Set.field('PIN', "P19") + this.Set.number("VALUE", 1023),
            "io_writePwm": this.Set.field('PIN', "P7") + this.Set.number("VALUE", 65535),
            "io_setPwm": this.Set.field('PIN', "P7") + this.Set.number("FREQUENCY", 10),
            "io_stopPwm": this.Set.field('PIN', "P7"),
            "io_preparePulseIn": this.Set.field('PIN', "P7"),
            "io_readPulseIn": this.Set.field('PIN', "P7") + this.Set.state(),
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
            "communication_serialInit": this.Set.field("RX", "P6") + this.Set.field("TX", "P7"),
            "communication_writeOpenLogSd": this.Set.field("RX", "P6") + this.Set.field("TX", "P7") 
                + "<value name='DATA'><block type='text_join'><mutation items='3'></mutation>" 
                + this.Set.text('ADD0', "{data1}", true) + this.Set.text('ADD1', ";", true) + this.Set.text('ADD2', "{data2}", true)
                + "</block></value>",
            "communication_uart_writeData": this.Set.text('DATA'),
            // communication - bluetooth
            "communication_sendBluetoothData": this.Set.field("RX", "P6") + this.Set.field("TX", "P7") + this.Set.text("DATA"),
            "communication_onBluetoothDataReceived": this.Set.field("RX", "P6") + this.Set.field("TX", "P7"),
            "communication_HM10_sendBluetoothData": this.Set.field("RX", "P6") + this.Set.field("TX", "P7") + this.Set.text("DATA"),
            "communication_HM10_onBluetoothDataReceived": this.Set.field("RX", "P6") + this.Set.field("TX", "P7"),
            // communication - gps
            "communication_onGPSDataReceived": this.Set.field("RX", "P6") + this.Set.field("TX", "P7"),
            "communication_analyzeGPSInfo": this.Set.variable("DATA", 'gpsData'),
            "communication_clockRTC_setHour": this.Set.number("HOUR", 8) + this.Set.number("MIN", 40) + this.Set.number("SEC", 10),
            // sensors - enviro:bit
            //"sensors_envirobit_tcs3472_setLED": this.Set.state(),
            "sensors_envirobit_waitForClaps": this.Set.number("DURATION", 1),
            // sensors - gas
            "sensors_getO2gas": this.Set.field('PIN', "P19"),
            "sensors_SCD30_forcedCalibration": this.Set.number('DEFAULT', 420),
            // sensors - climate
            "sensors_getAirQualityValue": this.Set.field('PIN', "P19"),
            "sensors_getGroveMoisture": this.Set.field('PIN', "P19"),
            "sensors_getGroveTemperature": this.Set.field('PIN', "P19"),
            "sensors_getGroveHighTemperature": this.Set.field("A1", "P19") + this.Set.field("A0", "P20"),
            "sensors_dhtReadData": this.Set.field('PIN', "P19"),
            "sensors_mpx5700ap_calibrate": this.Set.number("M", 1) + this.Set.number("B", 1),
            "sensors_getGroveWaterAmount": this.Set.field('PIN', "P19"),
            "sensors_getRainGauge": this.Set.field('PIN', "P19"),
            "sensors_getAnemometer": this.Set.field('PIN', "P19"),
            // sensors - sound & light
            "sensors_getGroveLight": this.Set.field('PIN', "P19"),
            "sensors_getUVindex": this.Set.field('PIN', "P19"),
            "sensors_getGroveSound": this.Set.field('PIN', "P19"),
            "sensors_getGroveUltrasonicRanger": this.Set.field('TRIG', "P19") + this.Set.field('ECHO', "P20"),
            "sensors_getGroveLineFinder": this.Set.field('PIN', "P19"),
            "sensors_getGroveTilt": this.Set.field('PIN', "P19"),
            "sensors_getGroveMotion": this.Set.field('PIN', "P19"),
            "sensors_getPiezoVibration": this.Set.field('PIN', "P19"),
            "sensors_getGroveButton": this.Set.field('PIN', "P19"),
            // actuators - motors
            "actuators_setServoAngle": this.Set.field('PIN', "P7") + this.Set.number("ANGLE", 90),
            "actuators_continuousServo_setSpeed": this.Set.field('PIN', "P7") + this.Set.number("SPEED", 100),
            "actuators_setMotorPower": this.Set.field('PIN', "P7") + this.Set.number("POWER", 1023),
            "actuators_setVibrationMotorState": this.Set.field('PIN', "P7") + this.Set.state(),
            "actuators_setGroveRelayState": this.Set.field('PIN', "P7") + this.Set.state(),
            // actuators - buzzer
            "actuators_playMusicGroveBuzzer": this.Set.field('PIN', "P7"),
            // robots - maqueen
            "robots_controlMaqueenLed": this.Set.state(),
            "robots_setMaqueenGo": this.Set.number("SPEED", WRITE_ANALOG_MAX_VALUE),
            "robots_controlMaqueenMotor": this.Set.number("SPEED", WRITE_ANALOG_MAX_VALUE),
            "robots_setMaqueenServoAngle": this.Set.number("ANGLE", 90),
            "robots_setMaqueenNeopixel": this.Set.number("R", WRITE_ANALOG_MAX_VALUE) + this.Set.number("G", WRITE_ANALOG_MAX_VALUE) + this.Set.number("B"),
            "robots_setMaqueenNeopixelPalette": this.Set.colour_picker(),
            "robots_setMaqueenBuzzer": this.Set.number("FREQUENCY", 440) + this.Set.number("TIME", 500),
            // robots - codo
            "robots_setCodoGo": this.Set.number("SPEED", 1023),
            "robots_setCodoTurn": this.Set.number("SPEED", 1023),
            "robots_controlCodoMotors": this.Set.number("SPEED", 1023),
            // robots - buggy
            "robots_setBuggyGo": this.Set.number("SPEED", 1023),
            "robots_setBuggyTurn": this.Set.number("SPEED", 1023),
            "robots_controlBuggyMotors": this.Set.number("SPEED", 1023),
            // robots - bit:bot
            "robots_setBitbotGo": this.Set.number("SPEED", 1023),
            "robots_controlBitBotMotor": this.Set.number("SPEED", 1023),
            "robots_setBitBotNeopixel": this.Set.number("LED")+ this.Set.number("R", WRITE_ANALOG_MAX_VALUE) + this.Set.number("G", WRITE_ANALOG_MAX_VALUE) + this.Set.number("B"),
            "robots_setBitBotNeopixelPalette": this.Set.number("LED") + this.Set.colour_picker(),
            // robots - gamepad
            "robots_setGamepadLED": this.Set.state(),
            "robots_setGamepadMotorVibration": this.Set.state(),
            "robots_setGamepadBuzzerFreq": this.Set.number("FREQUENCY", 440) + this.Set.number("TIME", 500),
            // network - WiFi
            "network_galaxia_simpleWifi_connect_basic": this.Set.text('SSID') + this.Set.text('PWD'),
            "network_galaxia_simpleWifi_connect": this.Set.text('SSID') + this.Set.text('PWD') + this.Set.text('IP'),
            "network_galaxia_simpleWifi_connect_complete": this.Set.text('SSID') + this.Set.text('PWD') + this.Set.text('IP') + this.Set.number("PORT", 80),
            "network_galaxia_simpleWifi_create_ap": this.Set.text('SSID') + this.Set.text('PWD'),
            // network - Server
            "network_galaxia_simpleWifi_receive": this.Set.text('IP'),
            "network_galaxia_simpleWifi_receive_complete": this.Set.text('IP') + this.Set.number('TIMEOUT', 3),
            // network - Client
            "network_galaxia_simpleWifi_send_basic": this.Set.text('VALUE') + this.Set.text('IP'),
            "network_galaxia_simpleWifi_send_complete": this.Set.text('VALUE') + this.Set.text('IP') + this.Set.number("PORT", 80),
            // network - Web Server
            "network_galaxia_simpleHttp_respond_basic": this.Set.text('VALUE'),
            "network_galaxia_simpleHttp_respond_complete": this.Set.text('VALUE') + this.Set.number("CODE", 200),
            "network_galaxia_simpleHttp_generate_page": this.Set.number("RELOAD", 3),
            "network_galaxia_simpleHttp_add_to_page": this.Set.text('DATA'),
            "network_galaxia_simpleHttp_add_button_to_page": this.Set.text('TITLE') + this.Set.text('CMD'),
            // network - MQTT
            "network_galaxia_simple_mqtt_connect_complete": this.Set.text('BROKER') + this.Set.text('USERNAME') + this.Set.text('PASSWORD') + this.Set.number("PORT", 1883),
            "network_galaxia_simple_mqtt_subscribe": this.Set.text('TOPIC'),
            "network_galaxia_simple_mqtt_publish": this.Set.text('TOPIC') + this.Set.text('VALUE'),

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
            "math_single":  this.Set.number("NUM", 9),
            "math_trig":  this.Set.number("NUM", 45),
            "math_number_property":  this.Set.number("NUMBER_TO_CHECK", 9),
            "math_map":  this.Set.number("VALUE", 32767) + this.Set.number("MIN1") + this.Set.number("MAX1", 65535) + this.Set.number("MIN2") + this.Set.number("MAX2", 1023),
            "math_round": this.Set.number("NUM", 3.1) ,
            "math_modulo": this.Set.number("DIVIDEND", 64)  + this.Set.number("DIVISOR", 10) ,
            "math_constrain": this.Set.number("LOW", 1) + this.Set.number("HIGH", 100),
            "math_random_int": this.Set.number("FROM", 1) + this.Set.number("TO", 100),
            "math_atan2": this.Set.number("X", 1) + this.Set.number("Y", 1),
            // text
            "text_comment": this.Set.field("TEXT", '{comment}'),
            "text_newline": this.Set.number('N', 1),
            "text_append": this.Set.text('TEXT'),
            "text_split": this.Set.text('VALUE') + this.Set.text('SEP' ,';'),
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
            "lists_split": this.Set.text('DELIM' ,',')
        }
    }
};