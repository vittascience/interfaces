/**
 * Database of defaut blocks in Esp32 toolbox.
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
            "display_galaxia_led_set_colors": this.Set.number("RED", 255) + this.Set.number("GREEN", 255) + this.Set.number("BLUE"),
            "display_galaxia_led_set_red": this.Set.number("RED", 255),
            "display_galaxia_led_set_green": this.Set.number("GREEN", 255),
            "display_galaxia_led_set_blue": this.Set.number("BLUE", 255),
            // display Galaxia/graphics
            "display_galaxia_plot_add_point": this.Set.number("POINT", 50),
            "display_galaxia_plot_set_y_scale": this.Set.number("MIN") + this.Set.number("MAX", 100),
            "display_galaxia_animate_function": this.Set.number("INTERVAL", 1) + this.Set.number("POINT", 50),
            "display_galaxia_raw_print": this.Set.text("TEXT", "Hello") + this.Set.number("X", 0) + this.Set.number("Y", 0),
            "display_galaxia_raw_text": this.Set.text("TEXT", "Hello") + this.Set.number("X", 0) + this.Set.number("Y", 0) + this.Set.colour_picker('#22b573'),
            "display_galaxia_raw_rect": this.Set.number("X", 20) + this.Set.number("Y", 40) + this.Set.number("W", 60) + this.Set.number("H", 30) + this.Set.colour_picker('#22b573'),
            "display_galaxia_raw_print_img": this.Set.text("IMAGE", "img.bmp") + this.Set.number("X", 20) + this.Set.number("Y", 20),
            /** esp32 default blocks */

            //display Galaxia Screen
            "display_galaxia_screen_set_text": this.Set.text('TEXT', 'Bonjour'),
            "display_galaxia_screen_set_text_value": this.Set.text('TEXT', 'text') + this.Set.number("VALUE"),
            // display - LCD
            "display_lcdSetText": this.Set.text('TEXT'),
            // display - OLED
            "display_addOledText": this.Set.number("X") + this.Set.number("Y") + this.Set.text("TEXT"),
            "display_setOledPixel": this.Set.number("X") + this.Set.number("Y") + this.Set.state(),
            "display_drawOledLine": this.Set.number("XA") + this.Set.number("YA", 32) + this.Set.number("XB", 128) + this.Set.number("YB", 32),
            "display_showOledIcon": this.Set.number("X") + this.Set.number("Y"),
            // display - LED
            "display_setGroveSocketLed": this.Set.state(),
            "display_setLEDintensity": this.Set.number("VALUE", 100),
            "display_setVariableColorLED": this.Set.number("VALUE", 100),
            "display_setNumberGrove4Digit": this.Set.field("DIO", "p3") + this.Set.number("N", READ_ANALOG_MAX_VALUE),
            "display_setClockGrove4Digit": this.Set.field("DIO", "p3"),
            "display_setLevelLedBar": this.Set.field("DCKI", "p3") + this.Set.number("VALUE", 3.14),
            "display_my9221_reverse": this.Set.field("DCKI", "p3") + this.Set.state(),
            // display - neopixel
            "display_defineNeopixel": this.Set.number("N", 20) + this.Set.field("PIN", "pin0"),
            "display_controlNeopixelLed": this.Set.number("LED") + this.Set.number("R", 255) + this.Set.number("G", 255) + this.Set.number("B", 255),
            "display_controlColorNeopixelLed": this.Set.number("LED") + this.Set.colour_picker(),
            "display_neopixel_controlAllLedRGB": this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_neopixel_controlAllLedPalette": this.Set.colour_picker(),
            // display - chainable LED RGB
            "display_defineChainableRGBLed": this.Set.field("DIN", "p3"),
            "display_setColorChainableRGBLed": this.Set.field("DIN", "p3") + this.Set.number("LED") + this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_setPaletteColorChainableRGBLed": this.Set.field("DIN", "p3") + this.Set.number("LED") + this.Set.colour_picker(),
            "display_setColorAllChainableRGBLed": this.Set.field("DIN", "p3") + this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_setPaletteAllChainableRGBLed": this.Set.field("DIN", "p3") + this.Set.colour_picker(),
            "display_resetAllChainableRGBLed": this.Set.field("DIN", "p3"),
            // ToDo add Touch A & B et touch sensors

            // io - galaxia
            "io_pause": this.Set.number("TIME", 1),
            "io_waitUntil": "<value name='UNTIL'><block type='logic_compare'>" + this.Set.field("OP", "EQ") + this.Set.number("B", 1) + "</block></value>",            // io - external modules
            "io_getGroveColoredButton": this.Set.field("PIN", "p3"),
            "io_setGroveColoredButton": this.Set.state(),
            "io_getGroveThumbJoystick": this.Set.field("PIN_Y", "p7"),
            // io - pins
            "io_writeDigitalPin": this.Set.state(),
            "io_writeAnalogPin": this.Set.number("VALUE", 255),
            "io_writePwm": this.Set.number("VALUE", READ_ANALOG_MAX_VALUE),
            "io_setPwm": this.Set.number("FREQUENCY", 10),
            "io_getVoltage": this.Set.number("VALUE", 255),
            "io_rotaryEncoder": this.Set.field("CLK", 'p7') + this.Set.field("DT", "p6"),
            // communication logs
            "communication_log_setLabel": "<mutation items='1'></mutation><value name='ADD0'><block type='text'><field name='TEXT'>Label1</field></block></value>",
            "communication_log_addData": "<mutation items='1'></mutation><value name='ADD0'><block type='communication_log_data'>" + this.Set.text('LABEL', "label") + this.Set.number("DATA") + "</block></value>",
            "communication_log_data": this.Set.text('LABEL', "label") + this.Set.number("DATA"),
            // communication - radio
            "communication_radioSendString": this.Set.text('STR', "{radioMessage}"),
            "communication_radioSendNumber": this.Set.number("N", 1),
            "communication_radioSendValue": this.Set.text('NAME', "pi") + this.Set.number("VALUE", 3.14),
            "communication_radioConfig": this.Set.number("CANAL", 7) + this.Set.number("POWER", 6) + this.Set.number("LEN", 32) + this.Set.number("GROUP"),
            //communication - internal
            "communication_StartBT": this.Set.text('NAME', "ESP32_Vittascience"),
            "communication_SendBT": this.Set.text('DATA'),
            "communication_FizziqBT": this.Set.number('VALUE', 25),
            // communication - console
            "communication_serialWrite": '<mutation newlines="false"></mutation>' + this.Set.text('TEXT', "{hello}"),
            "communication_graphSerialWrite": "<value name='ADD0'><block type='communication_graphSerialWrite_datasFormat'><field name='NAME'>{data1}</field></block></value>"
                + "<mutation items='1'></mutation>",
            "communication_playComputerFrequency": this.Set.number("FREQUENCY", 440),
            // communication - logging
            "communication_onInfraredDataReceived": this.Set.text("DATA", "0x00"),
            "communication_writeOpenLogSd": this.Set.field("RX", "p1") + "<value name='DATA'><block type='text_join'>"
                + this.Set.text("ADD0", '{data1}') + this.Set.text("ADD1", ';') + this.Set.text("ADD2", '{data2}')
                + "<mutation items='3'></mutation></block></value>",
            // communication - bluetooth
            "communication_sendBluetoothData": this.Set.field("RX", "p25") + this.Set.text("DATA"),
            "communication_onBluetoothDataReceived": this.Set.field("RX", "p1"),
            // communication - tracking modules
            "communication_gps_getNMEA": this.Set.field("RX", "p1"),
            "communication_gps_getGGAInformations": this.Set.field("RX", "p1"),
            "communication_clockRTC_setHour": this.Set.number("HOUR", 8) + this.Set.number("MIN", 40) + this.Set.number("SEC", 10),
            // communication - uart
            "communication_serialInit": this.Set.field("RX", "p1"),
            "communication_uart_writeData": this.Set.text("DATA"),
            "communication_uart_readData": "<mutation size='false'></mutation>",
            // sensors
            "sensors_getGroveHighTemperature": this.Set.field("A1", "p7"),
            "sensors_SCD30_forcedCalibration": this.Set.number("DEFAULT", 420),
            // actuators - motors
            "actuators_setServoAngle": this.Set.number("ANGLE", 90),
            "actuators_continuousServo_setSpeed": this.Set.number("SPEED", 100),
            "actuators_setMotorPower": this.Set.number("POWER", PWM_MAX_DUTY),
            "actuators_setVibrationMotorState": this.Set.state(),
            "actuators_setGroveRelayState": this.Set.state(),
            // actuators - buzzer/speaker
            "actuators_music_playNotes":
                `<mutation items='3'></mutation>
                <value name='ADD0'><block type='actuators_music_note'><field name='NOTE'>d</field><field name='OCTAVE'>4</field></block></value>
                <value name='ADD1'><block type='actuators_music_note'><field name='NOTE'>f#</field><field name='OCTAVE'>4</field></block></value>
                <value name='ADD2'><block type='actuators_music_note'><field name='NOTE'>g</field><field name='OCTAVE'>4</field></block></value>`,
            "actuators_music_playFrequency": this.Set.number("FREQUENCY", 440) + this.Set.number("DURATION", 500),
            // network - wifi
            "network_connectStation": this.Set.text("SSID") + this.Set.text("PASSWORD") + this.Set.text("IP", '192.168.1.10')
                + '<mutation ip="true" options="false"></mutation>',
            "network_configureAccessPoint": this.Set.text("ESSID", 'VittaAP') + this.Set.text("IP", '192.168.1.10'),
            // network - server
            "network_server_sendData": this.Set.text("DATA"),
            "network_changeServerPort": this.Set.number("PORT", 2000),
            // network - client
            "network_client_sendData": this.Set.text("DATA") + this.Set.text("IP", "192.168.1.10")
                + '<mutation port="false"></mutation>',
            "network_client_getServerData": this.Set.text("IP", "192.168.1.10"),
            // network - html
            "network_html_addTitle": this.Set.text("TITLE", '{webPage_title}') + this.Set.colour_picker('#22b573'),
            "network_html_addText": this.Set.text("TEXT", 'Ajouter du texte...')
                + '<mutation size="false" colour="false"></mutation>',
            "network_html_addButton": this.Set.text("ID", '{buttonName}') + this.Set.text('TEXT', 'ON')
                + '<mutation colour="false" shape="false"></mutation>',
            "network_html_addSlider": this.Set.text("ID", '{sliderName}')
                + '<mutation limits="false" orient="false" shape="false"></mutation>',
            "network_html_addGauge": this.Set.text("TITLE", 'Température (°C)') + this.Set.variable("VALUE", 'temperature') + this.Set.number("MIN") + this.Set.number("MAX", 100),
            "network_html_addSwitch": this.Set.text("ID", '{switchName}')
                + '<mutation colour="false" size="false"></mutation>',
            "network_html_addLink": this.Set.text("TEXT", 'Texte du lien...') + '<field name="URL">https://...</field>'
                + '<mutation size="false" colour="false"></mutation>',
            "network_html_addImage": this.Set.text("DATA", "{base64Image}")
                + '<mutation shape="false"></mutation>',
            "network_HTML_formatText": this.Set.text("TEXT", 'Texte formaté ...'),
            "network_HTML_add": this.Set.text("HTML"),
            "network_HTML_addSymbol": this.Set.text("SYMBOL", "2600") + this.Set.text("SIZE", "50px"),
            // network - page data
            "network_server_getButtonState": this.Set.text("ID", '{buttonName}'),
            "network_server_getSliderValue": this.Set.text("ID", '{sliderName}'),
            "network_server_getSwitchValue": this.Set.text("ID", '{switchName}'),
            // network - HTTP
            "network_connectStation_simple": this.Set.text("SSID") + this.Set.text("PASSWORD") + '<mutation ip="false" options="false"></mutation>',
            "network_getHTTPRequest": this.Set.text("URL", 'https://...'),
            "network_thingspeak_sendData": "<value name='ADD0'><block type='network_thingspeak_sendData_field'><field name='FIELD'>1</field></block></value>",
            "network_thingspeak_sendData_field": this.Set.number("VALUE", 3.14),
            "request_thingspeak_readFeeds": this.Set.text("CHANNEL_ID") + this.Set.text("API_KEY") + this.Set.number("FIELD", 1),
            //network - umail
            'network_umail_setup': this.Set.text("MAIL", 'galaxia@vittascience.com') + this.Set.text("PASSWORD", ''),
            'network_umail_to': this.Set.text("MAIL", 'xxx@mail.com') + this.Set.text("SUBJECT", 'Vittamail Galaxia'),
            'network_umail_write_sender': this.Set.text("NAME", 'Galaxia'),
            'network_umail_write': this.Set.text("MSG", "{hello}"),
            'network_umail_send_image': this.Set.text("IMG", "{base64Image}"),
            // network - mqtt
            'network_mqtt_connectWithAuth': this.Set.text("BROKER", "ip_du_broker") + this.Set.text("USERNAME") + this.Set.text("PASSWORD") + '<mutation port="false"></mutation>',
            'network_mqtt_subscribeTopic': this.Set.text("TOPIC", "nom_du_canal"),
            'network_mqtt_publishValue': this.Set.text("TOPIC", "nom_du_canal"),
            'network_mqtt_ifTopicIs': this.Set.text("TOPIC0", "nom_du_canal"),
            'variables_get-message_MQTT': this.Set.field("VAR", 'message_MQTT'),

            // camera - Wio Lite
            "wio_get_class_data_by_id": this.Set.number("ID", 1),
            
            // EDGE AI blocks
            "vittaia_detect_class": this.Set.text("MODEL_CLASS", 'Class') + this.Set.field("IS_DETECTED", '=='),
            "vittaia_load_cloud_model": this.Set.text("MODEL_ID", 'https://fr.vittascience.com/ia/model/67da8c5faec8e/'),
            /** Python default blocks */

            // logic
            "controls_if": "<value name='IF0'><block type='logic_compare'>" + this.Set.number("B", 1) + "</block></value>",
            "controls_if-else": "<value name='IF0'><block type='logic_compare'>" + this.Set.number("B", 1) + "</block></value>"
                + "<mutation else='1'></mutation>",
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
            "math_map": this.Set.number("VALUE", 512) + this.Set.number("MIN1") + this.Set.number("MAX1", READ_ANALOG_MAX_VALUE) + this.Set.number("MIN2") + this.Set.number("MAX2", 100),
            "math_round": this.Set.number("NUM", 3.1),
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
            "lists_split": this.Set.text('DELIM', ',')
        }
    }
};