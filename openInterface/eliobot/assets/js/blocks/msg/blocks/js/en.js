/**
 * @fileoverview English messages for Eliobot. (EN)
 */

'use strict';

// Display
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_TITLE"] = "change the colour of the integrated LED %1";
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP"] = "Allows you to light the integrated RGB LED on the Eliobot robot.";
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_OFF_TITLE"] = "turn off the integrated LED";
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_OFF_TOOLTIP"] = "Allows you to extinguish the integrated RGB LED on the Eliobot robot.";

// Display - Eyes
Blockly.Msg['DISPLAY_EYES_COLOR_TITLE'] = 'change the colour %1 to %2';
Blockly.Msg['DISPLAY_EYES_COLOR_TOOLTIP'] = 'Allows you to change the eyes colour of the Eliobot robot.';
Blockly.Msg['DISPLAY_EYES_COLOR_LEFT'] = 'of the left eye';
Blockly.Msg['DISPLAY_EYES_COLOR_RIGHT'] = 'of the right eye';
Blockly.Msg['DISPLAY_EYES_COLOR_BOTH'] = 'of both eyes';
Blockly.Msg['DISPLAY_EYES_EMOTION_TITLE'] = 'display emotion %1 in %2';
Blockly.Msg['DISPLAY_EYES_EMOTION_TOOLTIP'] = 'Allows you to display a predefined emotion on the Eliobot robot eyes.';
Blockly.Msg['DISPLAY_EYES_EMOTION_TIRED'] = 'tired';
Blockly.Msg['DISPLAY_EYES_EMOTION_HAPPY'] = 'happy';
Blockly.Msg['DISPLAY_EYES_EMOTION_SAD'] = 'sad';
Blockly.Msg['DISPLAY_EYES_EMOTION_ANGRY'] = 'angry';
Blockly.Msg['DISPLAY_EYES_EMOTION_CONFUSED'] = 'confused';
Blockly.Msg['DISPLAY_EYES_EMOTION_SURPRISED'] = 'surprised';
Blockly.Msg['DISPLAY_EYES_EMOTION_SLEEPY'] = 'sleepy';
Blockly.Msg['DISPLAY_EYES_EMOTION_NEUTRAL'] = 'neutral';
Blockly.Msg['DISPLAY_EYES_EMOTION_THRILLED'] = 'thrilled';
Blockly.Msg['DISPLAY_EYES_EMOTION_DIZZY'] = 'dizzy';
Blockly.Msg['DISPLAY_EYES_EMOTION_MUSIC'] = 'music';
Blockly.Msg['DISPLAY_EYES_EMOTION_LOVE'] = 'love';
Blockly.Msg['DISPLAY_EYES_EMOTION_KO'] = 'KO';
Blockly.Msg['DISPLAY_EYES_EMOTION_AMAZED'] = 'amazed';
Blockly.Msg['DISPLAY_EYES_EMOTION_LEFT_ARROW'] = 'left arrow';
Blockly.Msg['DISPLAY_EYES_EMOTION_RIGHT_ARROW'] = 'right arrow';
Blockly.Msg['DISPLAY_EYES_EMOTION_DOWN_ARROW'] = 'down arrow';
Blockly.Msg['DISPLAY_EYES_EMOTION_UP_ARROW'] = 'up arrow';
Blockly.Msg['DISPLAY_EYES_MATRIX_UNICOLOR_TITLE'] = 'display on the eyes matrix';
Blockly.Msg['DISPLAY_EYES_MATRIX_UNICOLOR_TOOLTIP'] = 'Allows you to display a custom image on the Eliobot robot eyes.';
Blockly.Msg['DISPLAY_RIGHT_EYE'] = 'right eye';
Blockly.Msg['DISPLAY_LEFT_EYE'] = 'left eye';

// Input/Output
Blockly.Msg["IO_WAIT_TITLE"] = "wait %1 %2";
Blockly.Msg["IO_WAIT_TOOLTIP"] = "Stop the code execution (duration in seconds or milliseconds).";
Blockly.Msg["IO_WAIT_SECOND"] = "second.s";
Blockly.Msg['IO_WAIT_MILLISECOND'] = "millisecond.s";
Blockly.Msg['IO_WAIT_MICROSECOND'] = "microsecond.s";
Blockly.Msg["IO_WAIT_UNTIL_TITLE"] = "wait until %1";
Blockly.Msg["IO_WAIT_UNTIL_TOOLTIP"] = "Stop the code execution until the satisfied condition.";
Blockly.Msg["IO_INITCHRONOMETER_TITLE"] = "Initialize the chronometer";
Blockly.Msg["IO_INITCHRONOMETER_TOOLTIP"] = "Allows you to initialize the chronometer (in seconds).";
Blockly.Msg["IO_GETCHRONOMETER_TITLE"] = "get chronometer in %1";
Blockly.Msg["IO_GETCHRONOMETER_TOOLTIP"] = "Returns the chronometer value from the initialization in seconds or milliseconds.";

// Communication - Serial connection
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TITLE"] = "write on serial port %1";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TOOLTIP"] = "Write a string on serial port.";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_WITH"] = "with";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_NEWLINES"] = "newline(s)";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TITLE"] = "write graph";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TOOLTIP"] = "This block makes it possible to write (digital) data that will be visible in the plotter. It can be used with one or more blocks in \"Name\" and \"Data\" format. Click on icon 'Graphic mode' to display graphics.";
Blockly.Msg["COMMUNICATION_DATA"] = "Data";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TITLE"] = "Name %1 Data %2";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TOOLTIP"] = "This block is to be used in the \"Write in graphic\" block. It must contain the name of the (text) value to display and the value in question.";
// Communication - IR remote
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_TITLE'] = 'read signal on sensor %1';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_TOOLTIP'] = 'Reads the command sent by the Eliobot infrared remote control. This block returns a string corresponding to the received command (forward, backward, left, right, center).';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_FORWARD'] = 'forward';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_BACKWARD'] = 'backward';
Blockly.Msg['COMMUNICATION_IR_REMOTE_TITLE'] = 'if command %1 is received by the infrared remote then';
Blockly.Msg['COMMUNICATION_IR_REMOTE_TOOLTIP'] = 'Reads the command sent by the Eliobot infrared remote control. This block returns a string corresponding to the received command (forward, backward, left, right, center).';
Blockly.Msg['COMMUNICATION_IR_REMOTE_BOOLEAN_TITLE'] = 'command %1 is received by the infrared remote';
Blockly.Msg['COMMUNICATION_IR_REMOTE_BOOLEAN_TOOLTIP'] = 'Checks whether a specific command from the Eliobot infrared remote control has been received. This block returns a boolean: true if the specified command was received, false otherwise.';
Blockly.Msg['COMMUNICATION_IR_REMOTE_UP'] = 'up';
Blockly.Msg['COMMUNICATION_IR_REMOTE_DOWN'] = 'down';
Blockly.Msg['COMMUNICATION_IR_REMOTE_LEFT'] = 'left';
Blockly.Msg['COMMUNICATION_IR_REMOTE_RIGHT'] = 'right';
Blockly.Msg['COMMUNICATION_IR_REMOTE_OK'] = 'ok';
Blockly.Msg['COMMUNICATION_IR_REMOTE_1'] = '1';
Blockly.Msg['COMMUNICATION_IR_REMOTE_2'] = '2';
Blockly.Msg['COMMUNICATION_IR_REMOTE_3'] = '3';
Blockly.Msg['COMMUNICATION_IR_REMOTE_4'] = '4';
Blockly.Msg['COMMUNICATION_IR_REMOTE_5'] = '5';
Blockly.Msg['COMMUNICATION_IR_REMOTE_6'] = '6';
Blockly.Msg['COMMUNICATION_IR_REMOTE_7'] = '7';
Blockly.Msg['COMMUNICATION_IR_REMOTE_8'] = '8';
Blockly.Msg['COMMUNICATION_IR_REMOTE_9'] = '9';
Blockly.Msg['COMMUNICATION_IR_REMOTE_0'] = '0';
Blockly.Msg['COMMUNICATION_IR_REMOTE_HT'] = '#';
Blockly.Msg['COMMUNICATION_IR_REMOTE_ST'] = '*';

// Sensors
Blockly.Msg["SENSORS_READ_OBSTACLE_TITLE"] = "an obstacle is %1";
Blockly.Msg["SENSORS_READ_OBSTACLE_TOOLTIP"] = "Allows you to detect if an obstacle is present.";
Blockly.Msg["SENSORS_READ_OBSTACLE_FORWARD"] = "in front";
Blockly.Msg["SENSORS_READ_OBSTACLE_BACKWARD"] = "behind";
Blockly.Msg["SENSORS_READ_OBSTACLE_RIGHT"] = "on the right";
Blockly.Msg["SENSORS_READ_OBSTACLE_LEFT"] = "on the left";
Blockly.Msg['SENSORS_LINE_FOLLOW_TITLE'] = 'follow the line';
Blockly.Msg['SENSORS_LINE_FOLLOW_TOOLTIP'] = 'Allows the Eliobot to follow a line.';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TITLE'] = 'line tracking sensitivity %1';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TOOLTIP'] = 'Allows changing the sensitivity of the Eliobot\'s sensors.';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TITLE'] = 'line sensor status %1';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TOOLTIP'] = 'Returns the status of one of the line tracking sensors.';
Blockly.Msg['SENSORS_LINE_LEFT'] = "left";
Blockly.Msg['SENSORS_LINE_MIDDLE_LEFT'] = "middle left";
Blockly.Msg['SENSORS_LINE_MIDDLE'] = "middle";
Blockly.Msg['SENSORS_LINE_MIDDLE_RIGHT'] = "middle right";
Blockly.Msg['SENSORS_LINE_RIGHT'] = "right";
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TITLE'] = 'line sensor value %1';
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TOOLTIP'] = 'Returns the value of one of the line tracking sensors of the Eliobot.';
Blockly.Msg['SENSORS_AUTO_LINE_CALIBRATION'] = 'automatic calibration of line sensors';
Blockly.Msg['SENSORS_AUTO_LINE_CALIBRATION_TOOLTIP'] = 'Allows to automatically calibrate the line sensors of the Eliobot. The robot must be placed on a light surface, then on a dark surface for the calibration to be performed correctly.';
// Actuators
Blockly.Msg["ROBOT_MOVE_TITLE"] = "move %1";
Blockly.Msg["ROBOT_MOVE_TOOLTIP"] = "Allows you to control the Eliobot robot engines to advance or back down.";
Blockly.Msg["ROBOT_MOVE_FORWARD"] = "forward";
Blockly.Msg["ROBOT_MOVE_BACKWARD"] = "backward";
Blockly.Msg["ROBOT_ROTATE_TITLE"] = "rotate on the %1";
Blockly.Msg["ROBOT_ROTATE_TOOLTIP"] = "Rotate the Eliobot on the left or right.";
Blockly.Msg["ROBOT_ROTATE_RIGHT"] = "right";
Blockly.Msg["ROBOT_ROTATE_LEFT"] = "left";
Blockly.Msg["ROBOT_STOP_TITLE"] = "stop the robot";
Blockly.Msg["ROBOT_STOP_TOOLTIP"] = "Stop motors of the Eliobot.";
Blockly.Msg['ROBOT_SET_SPEED_TITLE'] = 'speed %1 %';
Blockly.Msg['ROBOT_SET_SPEED_TOOLTIP'] = 'Changes the speed of the Eliobot.';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TITLE'] = 'rotate by %1 of %2°';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TOOLTIP'] = 'Rotates the Eliobot to the left or right by the desired angle.';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TITLE'] = 'turn wheel %1 direction %2';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TOOLTIP'] = 'Turns one of the Eliobot\'s wheels in the desired direction.';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TITLE'] = 'move %1 by %2 step(s)';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TOOLTIP'] = 'Allows the Eliobot to move forward by steps.';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TITLE'] = '%1 by %2 step(s)';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TOOLTIP'] = 'Allows the Eliobot to move forward by steps.';
Blockly.Msg['ROBOT_TURN_90_TITLE']= 'turn %1';
Blockly.Msg['ROBOT_TURN_90_TOOLTIP'] = 'Allows the Eliobot to turn left or right by 90°.';
Blockly.Msg['ROBOT_SET_SQUARE_SIZE_TITLE'] = 'square size %1 cm';
Blockly.Msg['ROBOT_SET_SQUARE_SIZE_TOOLTIP'] = 'Sets the size of a square for step-based movements of the Eliobot.';
Blockly.Msg['ROBOT_TURN_RIGHT'] = 'right';
Blockly.Msg['ROBOT_TURN_LEFT'] = 'left';
Blockly.Msg['ROBOT_WAITING_TITLE'] = 'wait %1 %2 before stopping motors';
Blockly.Msg['ROBOT_WAITING_TOOLTIP'] = 'Allows the Eliobot to wait for a certain time before stopping.';
Blockly.Msg['ROBOT_UNIT_SECONDS'] = 'second(s)';
Blockly.Msg['ROBOT_UNIT_MILLISECONDS'] = 'millisecond(s)';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TITLE'] = 'play note %1 for %2 %3';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TOOLTIP'] = 'This block allows you to play a musical note. The note is defined by its name (C, D, E, F, G, A, B) and the duration for which it is played.';
Blockly.Msg['ACTUATORS_FREQUENCY_TITLE'] = 'play frequency %1 (Hz) for %2 %3';
Blockly.Msg['ACTUATORS_FREQUENCY_TOOLTIP'] = 'This block allows you to play a frequency. The frequency is defined in Hertz (Hz) and the duration for which it is played.';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TITLE'] = 'play music %1';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TOOLTIP'] = 'This block allows you to play predefined music. There are several predefined pieces of music available.';
Blockly.Msg['ACTUATORS_SET_VOLUME_TITLE'] = 'set volume to %1 %';
Blockly.Msg['ACTUATORS_SET_VOLUME_TOOLTIP'] = 'This block adjusts the volume. The volume level is set as a percentage.'
Blockly.Msg['ACTUATORS_SET_VOLUME_TOOLTIP'] = 'This block allows you to set the volume level of the Eliobot. The volume is set as a percentage.';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TITLE'] = 'play sound %1';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TOOLTIP'] = 'This block allows you to play a predefined sound. There are several predefined sounds available.';
Blockly.Msg['ACTUATORS_SOUND_JUMP'] = 'jump';
Blockly.Msg['ACTUATORS_SOUND_LASER'] = 'laser';
Blockly.Msg['ACTUATORS_SOUND_QUESTION'] = 'question';
Blockly.Msg['ACTUATORS_SOUND_ERROR'] = 'error';
Blockly.Msg['ACTUATORS_SOUND_EXPLOSION'] = 'explosion';
Blockly.Msg['ACTUATORS_SOUND_LAND'] = 'land';
Blockly.Msg['ACTUATORS_SOUND_HAPPY'] = 'happy';
Blockly.Msg['ACTUATORS_SOUND_WIN'] = 'win';
Blockly.Msg['ACTUATORS_SOUND_ALERT'] = 'alert';
Blockly.Msg['ACTUATORS_SOUND_HELLO'] = 'hello';
Blockly.Msg['ACTUATORS_SOUND_STARTUP'] = 'startup';
Blockly.Msg['ACTUATORS_SOUND_BUMP'] = 'bump';
Blockly.Msg['ACTUATORS_SOUND_BLINK'] = 'blink';
// Backpack - Display
Blockly.Msg['BACKPACK_DISPLAY_OLED_TEXT_TITLE'] = '[OLED Screen] display text %1 on line %2';
Blockly.Msg['BACKPACK_DISPLAY_OLED_TEXT_TOOLTIP'] = 'Displays text on the SSD1306 OLED screen.';
Blockly.Msg['BACKPACK_DISPLAY_OLED_CLEAR_TITLE'] = '[OLED Screen] clear the screen';
Blockly.Msg['BACKPACK_DISPLAY_OLED_CLEAR_TOOLTIP'] = 'Clears the text on the SSD1306 OLED screen.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TITLE'] = '[5x5 RGB Matrix] display image';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TOOLTIP'] = 'Displays a drawing on the 5x5 RGB LED matrix.';
Blockly.Msg['BACKPACK_DISPLAY_CLEAR_MATRIX_TITLE'] = '[5x5 RGB Matrix] clear the matrix';
Blockly.Msg['BACKPACK_DISPLAY_CLEAR_MATRIX_TOOLTIP'] = 'Clears the 5x5 RGB LED matrix.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TITLE'] = '[5x5 RGB Matrix] display %1 in %2';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TOOLTIP'] = 'Displays an icon in the desired color.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TITLE'] = '[5x5 RGB Matrix] scroll text %1 in %2';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TOOLTIP'] = 'Scrolls a string of characters in the desired color across the 5x5 LED matrix.';
// Backpack - Sensors
Blockly.Msg['BACKPACK_DHT11_SENSOR_TITLE'] = '[DHT11] %1';
Blockly.Msg['BACKPACK_DHT11_SENSOR_TOOLTIP'] = 'Returns the temperature in degrees Celsius (°C) or the humidity (in %) using the DHT11 sensor.';
Blockly.Msg['SENSOR_TEMPERATURE'] = 'temperature';
Blockly.Msg['SENSOR_HUMIDITY'] = 'humidity';
Blockly.Msg['SENSOR_PRESSURE'] = 'pressure';
Blockly.Msg['SENSOR_ALTITUDE'] = 'altitude';
Blockly.Msg['BACKPACK_BME280_SENSOR_TITLE'] = '[BME280] %1';
Blockly.Msg['BACKPACK_BME280_SENSOR_TOOLTIP'] = 'Returns the ambient temperature in degrees Celsius (°C) from -40 to 85 °C, Fahrenheit (°F) or Kelvin (K), humidity (in %), pressure (in Pascal) or altitude (in m) using the BME280 sensor.';
Blockly.Msg['BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TITLE'] = '[BME280] set sea level pressure to %1';
Blockly.Msg['BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TOOLTIP'] = 'Sets the sea level pressure for the BME280 sensor, used in the altitude calculation.';
Blockly.Msg['BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TITLE'] = '[HC-SR04] distance';
Blockly.Msg['BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TOOLTIP'] = 'Returns the distance in cm using the HC-SR04 ultrasonic sensor.';
Blockly.Msg['BACKPACK_SENSORS_GETLIGHT_TITLE'] = '[Light sensor] brightness on pin %1';
Blockly.Msg['BACKPACK_SENSORS_GETLIGHT_TOOLTIP'] = 'Returns the brightness level from the sensor on the selected pin.';
// Backpack - IO - Buttons
Blockly.Msg["BACKPACK_IO_BUTTON_STATE_TITLE"] = "[Button] %1 pressed on %2";
Blockly.Msg["BACKPACK_IO_BUTTON_STATE_TOOLTIP"] = "Return True if the button is pressed, False otherwise.";
Blockly.Msg["BACKPACK_IO_BUTTON_STATE_PRESSED"] = "is";
Blockly.Msg["BACKPACK_IO_BUTTON_STATE_NOT_PRESSED"] = "is not";
// Backpack - IO - Potentiometer
Blockly.Msg['BACKPACK_IO_KNOB_VALUE_TITLE'] = '[Potentiometer] value %1';
Blockly.Msg['BACKPACK_IO_KNOB_VALUE_TOOLTIP'] = 'Return potentiometer value connected on IO2 or IO15';
// Backpack - Actuators - Motors
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TITLE'] = '[Servo Motor] set angle to %1° on pin %2';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TOOLTIP'] = 'Controls the angle (from 0 to 180°) of a servo motor on the PWM pins.';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TITLE'] = '[Continuous Servo Motor] set speed %1 (%) direction %2 on pin %3';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TOOLTIP'] = 'Controls the speed (from 0 to 100%) of a continuous servo motor on the PWM pins.';
// Backpack - Actuators - Buzzer
Blockly.Msg['BACKPACK_ACTUATORS_GROVE_BUZZER_TITLE'] = '[Buzzer] play frequency %1 with volume %2 on pin %3';
Blockly.Msg['BACKPACK_ACTUATORS_GROVE_BUZZER_TOOLTIP'] = 'Plays a frequency on the Grove buzzer at the specified volume on the selected pin.';

// Network - Wifi
Blockly.Msg['NETWORK_WIFI_CONNECT_TITLE'] = 'Connect to Wi-Fi network SSID %1 password %2';
Blockly.Msg['NETWORK_WIFI_CONNECT_TOOLTIP'] = 'Connects Eliobot to a Wi-Fi network using the provided name (SSID) and password.';
Blockly.Msg['NETWORK_WIFI_DISCONNECT_TITLE'] = 'Disconnect from Wi-Fi';
Blockly.Msg['NETWORK_WIFI_DISCONNECT_TOOLTIP'] = 'Disconnects Eliobot from the Wi-Fi network it is currently connected to.';
Blockly.Msg['NETWORK_WIFI_OPEN_ACCESS_POINT_TITLE'] = 'Open a Wi-Fi access point SSID %1 password %2';
Blockly.Msg['NETWORK_WIFI_OPEN_ACCESS_POINT_TOOLTIP'] = 'Creates a Wi-Fi access point from Eliobot using the provided name and password.';
Blockly.Msg['NETWORK_WIFI_DEFINE_HOST_NAME_TITLE'] = 'Set host name %1';
Blockly.Msg['NETWORK_WIFI_DEFINE_HOST_NAME_TOOLTIP'] = 'Sets Eliobot\'s hostname on the network. This name can be used to access Eliobot from a browser.';
Blockly.Msg['NETWORK_WIFI_DEFINE_ANTENNA_POWER_TITLE'] = 'Set Wi-Fi antenna power %1';
Blockly.Msg['NETWORK_WIFI_DEFINE_ANTENNA_POWER_TOOLTIP'] = 'Sets the transmission power of Eliobot\'s Wi-Fi antenna (in dBm).';
Blockly.Msg['NETWORK_WIFI_IS_CONNECTED_TITLE'] = 'connected to Wi-Fi?';
Blockly.Msg['NETWORK_WIFI_IS_CONNECTED_TOOLTIP'] = 'Returns true if Eliobot is connected to a Wi-Fi network, false otherwise.';
Blockly.Msg['NETWORK_WIFI_SCAN_NETWORKS_TITLE'] = 'scan available Wi-Fi networks';
Blockly.Msg['NETWORK_WIFI_SCAN_NETWORKS_TOOLTIP'] = 'Returns the list of Wi-Fi networks available around Eliobot.';
Blockly.Msg['NETWORK_WIFI_GET_IP_TITLE'] = 'Eliobot\'s IP address';
Blockly.Msg['NETWORK_WIFI_GET_IP_TOOLTIP'] = 'Returns Eliobot\'s IP address on the Wi-Fi network.';
// Network - HTML
Blockly.Msg['NETWORK_HTML_CREATE_PAGE_TITLE'] = 'Create a web page with title %1 content';
Blockly.Msg['NETWORK_HTML_CREATE_PAGE_TOOLTIP'] = 'Creates a web page accessible from a browser. Add HTML elements inside the content area.';
Blockly.Msg['NETWORK_HTML_CREATE_BUTTON_TITLE'] = 'Add a button %1 %2 action';
Blockly.Msg['NETWORK_HTML_CREATE_BUTTON_TOOLTIP'] = 'Adds a button to the web page. Blocks inside "action" are executed by Eliobot when the button is pressed.';
Blockly.Msg['NETWORK_HTML_DISPLAY_VALUE_TITLE'] = 'Display value %1 with name %2';
Blockly.Msg['NETWORK_HTML_DISPLAY_VALUE_TOOLTIP'] = 'Displays a value on the web page and automatically refreshes it every second.';
Blockly.Msg['NETWORK_HTML_CREATE_TAG_TITLE'] = 'Tag %1';
Blockly.Msg['NETWORK_HTML_CREATE_TAG_TOOLTIP'] = 'Creates an HTML tag (div or center) to organise the content of your web page.';
Blockly.Msg['NETWORK_HTML_CREATE_TITLE_TAG_TITLE'] = 'Heading %1 %2';
Blockly.Msg['NETWORK_HTML_CREATE_TITLE_TAG_TOOLTIP'] = 'Adds an HTML heading (h1 to h6) to your web page. h1 is the largest, h6 the smallest.';
Blockly.Msg['NETWORK_HTML_CREATE_PARAGRAPH_TITLE'] = 'Paragraph %1';
Blockly.Msg['NETWORK_HTML_CREATE_PARAGRAPH_TOOLTIP'] = 'Adds a paragraph of text to your web page.';
Blockly.Msg['DISPLAY_EYES_MATRIX_TITLE'] = "Display on the eye matrix (palette)";
Blockly.Msg['DISPLAY_EYES_MATRIX_TOOLTIP'] = 'Displays a custom image on Eliobot\'s eyes. Each pixel in the matrix can be assigned a different color.';
