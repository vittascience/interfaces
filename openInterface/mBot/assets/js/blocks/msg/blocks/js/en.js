/**
 * @fileoverview English messages for mBot. (EN)
 */

'use strict';
//COMMENT - Arduino
Blockly.Msg['CALL_EXPRESSION_COMMENT_TITLE'] = 'comment %1';
Blockly.Msg['CALL_EXPRESSION_COMMENT_TOOLTIP'] = 'This block allows you to add a comment to your code.';
// Display - MeMCore
Blockly.Msg["MCORE_CONTROL_BUILTIN_LED_TITLE"] = "[MeMCore] set built-in blue LED to state %1";
Blockly.Msg["MCORE_CONTROL_BUILTIN_LED_TOOLTIP"] = "Turn on on turn off the blue LED on the MeMCore board.";

// Input/Output - MeMCore
Blockly.Msg["IO_WAIT_TITLE"] = "wait %1 %2";
Blockly.Msg["IO_WAIT_TOOLTIP"] = "Stop the code execution (duration in seconds or milliseconds).";
Blockly.Msg["IO_WAIT_SECOND"] = "second(s)";
Blockly.Msg["IO_WAIT_MILLISECOND"] = "millisecond(s)";
Blockly.Msg["IO_WAIT_MICROSECOND"] = "microsecond(s)";
Blockly.Msg["IO_WAIT_UNTIL_TITLE"] = "wait until %1";
Blockly.Msg["IO_WAIT_UNTIL_TOOLTIP"] = "Stop the code execution until the satisfied condition.";
Blockly.Msg["IO_INITCHRONOMETER_TITLE"] = "initialize the chronometer";
Blockly.Msg["IO_INITCHRONOMETER_TOOLTIP"] = "Allows you to initialize the chronometer (in seconds).";
Blockly.Msg["IO_GETCHRONOMETER_TITLE"] = "get chronometer in %1";
Blockly.Msg["IO_GETCHRONOMETER_TOOLTIP"] = "Returns the chronometer value from the initialization in seconds or milliseconds.";
// Input/Output - Pins
Blockly.Msg["IO_DIGITAL_SIGNAL_TITLE"] = "%1";
Blockly.Msg["IO_DIGITAL_SIGNAL_HIGH"] = "HIGH (1)";
Blockly.Msg["IO_DIGITAL_SIGNAL_LOW"] = "LOW (0)";
Blockly.Msg["IO_DIGITAL_SIGNAL_TOOLTIP"] = "Returns boolean value (HIGH ou LOW).";
Blockly.Msg["IO_READDIGITALPIN_TITLE"] = "read digital pin %1";
Blockly.Msg["IO_READDIGITALPIN_TOOLTIP"] = "This block reads one of the digital inputs and returns the value.";
Blockly.Msg["IO_WRITEDIGITALPIN_TITLE"] = "write on digital pin %1 state %2";
Blockly.Msg["IO_WRITEDIGITALPIN_TOOLTIP"] = "Enable to write state on digital pin.";
Blockly.Msg["IO_WRITEANALOGPIN_TITLE"] = "write on analog pin %1 value %2";
Blockly.Msg["IO_WRITEANALOGPIN_TOOLTIP"] = "Enable to write on analog pin the value (0-255)."
Blockly.Msg["IO_READANALOGPIN_TITLE"] = "read analog pin %1";
Blockly.Msg["IO_READANALOGPIN_TOOLTIP"] = "Enable to read the analog value of pins (0-1023).";
Blockly.Msg["IO_SETPWM_TITLE"] = "apply pwm signal with duty cycle %1 (%) on pin %2";
Blockly.Msg["IO_SETPWM_TOOLTIP"] = "Apply a PWM signal on pwm pin (~) with duty cycle setting (in %). For pins D3, D9, D10 et D11, signal frequency is 490 Hz (period 2.04 ms). For pins D5 et D6, it's 980 Hz (period 1.02 ms).";
Blockly.Msg["IO_READPULSEIN_TITLE"] = "read pulse in of state %1 on pin %2";
Blockly.Msg["IO_READPULSEIN_TOOLTIP"] = "Returns the duration of pulse in (in μs). Choice state to measure (HIGH or LOW). Works on pulses from 10 μs to 3 min in length.";
Blockly.Msg["IO_ATTACH_INTERRUPT_TITLE"] = "on %1 detected on pin %2 then";
Blockly.Msg["IO_ATTACH_INTERRUPT_TOOLTIP"] = "Enable to set event on pins 2 or 3. This bloc execute instructions at any time as soon as a rising/falling edge or both is detected on pins 2 or 3.";
Blockly.Msg["IO_RISING_EDGE"] = "rising edge";
Blockly.Msg["IO_FALLING_EDGE"] = "falling edge";
Blockly.Msg["IO_BOTH_EDGE"] = "change";

// Communication - Serial connection
Blockly.Msg['COMMUNICATION_SERIAL_BEGIN_TITLE'] = 'initialize serial communication at %1 bauds';
Blockly.Msg['COMMUNICATION_SERIAL_BEGIN_TOOLTIP'] = 'This block initializes the serial communication at a given baud rate. It must be used in the setup block.';
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TITLE"] = "write on the serial port %1";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TOOLTIP"] = "This block is used to write any type of data on the serial port. They will be displayed in the console when the program is running.";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_WITH"] = "with";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_NEWLINES"] = "newline(s)";
Blockly.Msg["COMMUNICATION_SERIAL_ONDATARECEIVED_TITLE"] = "on serial data received in %1 then";
Blockly.Msg["COMMUNICATION_SERIAL_ONDATARECEIVED_TOOLTIP"] = "Allows you to execute instructions if data is received by serial port in the 'serialData' variable.";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TITLE"] = "show on graph";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TOOLTIP"] = "This block makes it possible to write (digital) data that will be visible in the plotter. It can be used with one or more blocks in \"Name\" and \"Data\" format.";
Blockly.Msg["COMMUNICATION_DATA"] = "Data";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TITLE"] = "Name %1 Data %2";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TOOLTIP"] = "This block is to be used in the \"Write in graphic\" block. It must contain the name of the (text) value to display and the value in question.";
Blockly.Msg["COMMUNICATION_COMPUTER_PLAYNOTE_TITLE"] = "play music %1 in the serial port";
Blockly.Msg["COMMUNICATION_COMPUTER_PLAYNOTE_TOOLTIP"] = "Play selected note until execution of \"Stop music\" block.";
Blockly.Msg["NOTE_C"] = "C";
Blockly.Msg["NOTE_C_SHARP"] = "C#";
Blockly.Msg["NOTE_D"] = "D";
Blockly.Msg["NOTE_D_SHARP"] = "D#";
Blockly.Msg["NOTE_E"] = "E";
Blockly.Msg["NOTE_F"] = "F";
Blockly.Msg["NOTE_F_SHARP"] = "F#";
Blockly.Msg["NOTE_G"] = "G";
Blockly.Msg["NOTE_G_SHARP"] = "G#";
Blockly.Msg["NOTE_A"] = "A";
Blockly.Msg["NOTE_A_SHARP"] = "A#";
Blockly.Msg["NOTE_B"] = "B";
Blockly.Msg["COMMUNICATION_COMPUTER_SETFREQUENCY_TITLE"] = "play frequency %1 (Hz) on the computer";
Blockly.Msg["COMMUNICATION_COMPUTER_SETFREQUENCY_TOOLTIP"] = "This block allows to play a given frequency on the computer";
Blockly.Msg["COMMUNICATION_COMPUTER_STOPMUSIC_TITLE"] = "stop music of serial port";
Blockly.Msg["COMMUNICATION_COMPUTER_STOPMUSIC_TOOLTIP"] = "Stop the current note of serial port.";

// Robots - mBot basic modules
Blockly.Msg["ROBOTS_MBOT_GO_TITLE"] = "[Motors] control robot %1 speed %2 (%)";
Blockly.Msg["ROBOTS_MBOT_GO_FORWARD"] = "forward";
Blockly.Msg["ROBOTS_MBOT_GO_REVERSE"] = "reverse";
Blockly.Msg["ROBOTS_MBOT_GO_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Enable to control car running (FORWARD/REVERSE) and motor speed (from 0 to 100 %) of mBot robot.";
Blockly.Msg["ROBOTS_MBOT_CONTROLMOTOR_TITLE"] = "[Motors] control motor %1 direction %2 speed %3 (%)";
Blockly.Msg["ROBOTS_MBOT_RIGHT"] = "right";
Blockly.Msg["ROBOTS_MBOT_LEFT"] = "left";
Blockly.Msg["ROBOTS_MBOT_RIGHT&LEFT"] = "right & left";
Blockly.Msg["ROBOTS_MBOT_RIGHT_F"] = "right";
Blockly.Msg["ROBOTS_MBOT_LEFT_F"] = "left";
Blockly.Msg["ROBOTS_MBOT_RIGHT&LEFT_F"] = "right & left";
Blockly.Msg["ROBOTS_MBOT_CONTROLMOTOR_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Enable to control right motor (9) and left motor (10) changing direction (↻ : FOWARD, ↺ : REVERSE) or speed (from 0 to 100 %) of mBot robot.";
Blockly.Msg["ROBOTS_MBOT_STOPMOTORS_TITLE"] = "[Motors] stop motor %1";
Blockly.Msg["ROBOTS_MBOT_STOPMOTORS_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Enable to stop right, left or both motors of mBot robot.";
Blockly.Msg["ROBOTS_MBOT_SETRGBLED_TITLE"] = "[Board] set color R %1 G %2 B %3 on LED %4";
Blockly.Msg["ROBOTS_MBOT_SETRGBLED_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Enable to control RGB LED color on board of mBot robot as (R,G,B) value is from 0 to 255.";
Blockly.Msg["ROBOTS_MBOT_SETPALETTERGBLED_TITLE"] = "[Board] set color %1 on LED %2";
Blockly.Msg["ROBOTS_MBOT_SETPALETTERGBLED_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Enable to control RGB LED color on board of mBot robot by choosing color in palette.";
Blockly.Msg["ROBOTS_MBOT_SETBUZZER_TITLE"] = "[Board] set buzzer at frequency %1 during %2 (ms)";
Blockly.Msg["ROBOTS_MBOT_SETBUZZER_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Enable to control mBot buzzer at any frequency during any time in milliseconds";
Blockly.Msg["ROBOTS_MBOT_PLAYMUSIC_TITLE"] = "[Board] play music %1";
Blockly.Msg["ROBOTS_MBOT_PLAYMUSIC_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Enable to play music on mBot buzzer.";
Blockly.Msg["ROBOTS_MBOT_GETLIGHT_TITLE"] = "[Board] light level";
Blockly.Msg["ROBOTS_MBOT_GETLIGHT_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Returns light level of board sensor of mBot.";
Blockly.Msg["ROBOTS_MBOT_GETBUTTONSTATE_TITLE"] = "[Board] button is pressed ?";
Blockly.Msg["ROBOTS_MBOT_GETBUTTONSTATE_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Returns button state of mBot board.";
Blockly.Msg["ROBOTS_MBOT_SENDIRMESSAGE_TITLE"] = "[Board] send message %1 by IR";
Blockly.Msg["ROBOTS_MBOT_SENDIRMESSAGE_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Send message by Infrared with the robot.";
Blockly.Msg["ROBOTS_MBOT_GETREMOTECONTROLBUTTON_TITLE"] = "[Remote control] button %1 is pressed";
Blockly.Msg["ROBOTS_MBOT_GETREMOTECONTROLBUTTON_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_REMOTE_CONTROL + Blockly.Tooltip.SEP + "Returns true or false if any button of mBot remote control mBot is pressed.";

// Display - LED matrix
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWSTRING_TITLE"] = "[LED Matrix] show text %1 at position x %2 y %3 on port %4";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWSTRING_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Lets you draw string on the 16x8 LED matrix of Makeblock. The specified position have range x (0-15) and y (0-7). Connect display on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWNUMBER_TITLE"] = "[LED Matrix] show number %1 on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWNUMBER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Lets you show number on the 16x8 LED matrix of Makeblock. Connect display on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWCLOCK_TITLE"] = "[LED Matrix] show clock %1 : %2 on port %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWCLOCK_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Lets you show clock on the 16x8 LED matrix of Makeblock. Connect display on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWBITMAPICON_TITLE"] = "[LED Matrix] show draw %1 at position x %2 y %3 on port %4";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWBITMAPICON_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Lets you show drawing on the 16x8 LED matrix of Makeblock. The specified position have range x (0-15) and y (0-7). Connect display on RJ45 port from 1 to 4.";
// Display - Neopixel
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_DEFINE_TITLE"] = "[Neopixel] define %1 LED on port %2 slot %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_DEFINE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Enable to define LED number of neopixel of Makeblock. This block have to be used in setup. Choice slot (1 or 2) of RJ45 adapter. Connect module on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_CONTROLLED_TITLE"] = "[Neopixel] set LED %1 to R %2 G %3 B %4 on port %5 slot %6";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_CONTROLLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Enable set LED color as (R,G,B) from 0 to 255 on neopixel of Makeblock. Choice slot (1 or 2) of RJ45 adapter. Connect module on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_PALETTECONTROLLED_TITLE"] = "[Neopixel] set LED %1 to %2 on port %3 slot %4";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_PALETTECONTROLLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Enable set LED color by choosing in palette on neopixel of Makeblock. Choice slot (1 or 2) of RJ45 adapter. Connect module on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDRGB_TITLE"] = "[Neopixel] set all LED to colour R %1 G %2 B %3 on port %4 slot %5";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDRGB_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Enable to control all LED of Makeblock neopixel module to the choosed colour value as (R,G,B) from 0 to 255. Choice slot (1 or 2) of RJ45 adapter. Connect module on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDCOLOR_TITLE"] = "[Neopixel] set all LED to colour %1 on port %2 slot %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDCOLOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Enable to control all LED of Makeblock neopixel module to the choosed colour value. Choice slot (1 or 2) of RJ45 adapter. Connect module on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_RAINBOW_TITLE"] = "[Neopixel] set a rainbow on port %1 slot %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_RAINBOW_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Enable to show a rainbow on Makeblock neopixel module, set pin and the number of LED. Choice slot (1 or 2) of RJ45 adapter. Connect module on RJ45 port from 1 to 4.";
// Display - RGB LED
Blockly.Msg["ROBOTS_MAKEBLOCK_SETRGBLED_TITLE"] = "[RGB LED] set color R %1 G %2 B %3 on LED %4 on port %5";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETRGBLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_RGB_LED + Blockly.Tooltip.SEP + "Lets you show set color as (R,G,B) value from 0 to 255 on RGB LED of Makeblock. Connect display on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_ALL_LED"] = "all";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETPALETTERGBLED_TITLE"] = "[RGB LED] set color %1 on LED %2 on port %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETPALETTERGBLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_RGB_LED + Blockly.Tooltip.SEP + "Lets you show set color as (R,G,B) by choosing in the palette on RGB LED of Makeblock. Connect display on RJ45 port from 1 to 4.";
// Display - 4 Digit
Blockly.Msg["ROBOTS_MAKEBLOCK_4DIGIT_SETNUMBER_TITLE"] = "[7-segment Display] show %1 on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_4DIGIT_SETNUMBER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_7SEGMENT_DISPLAY + Blockly.Tooltip.SEP + "Lets you show number on the 7-segment display of Makeblock. Connect display on RJ45 port from 1 to 4.";

// Robots - Makeblock sensors
Blockly.Msg["ROBOTS_MAKEBLOCK_ULTRASONICRANGER_TITLE"] = "[Ultrasonic Sensor] distance in %1 on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_ULTRASONICRANGER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_ULTRASONIC + Blockly.Tooltip.SEP + "Returns distance measurement (in centimeters) from the ultrasonic sensor of Makeblock. Connect sensor on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_READLINEFINDER_TITLE"] = "[Line Follower] sensor %1 inside of black line on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_READLINEFINDER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_LINEFINDER + Blockly.Tooltip.SEP + "Returns state of line follower module (0 ou 1) from sensor1 (left) or sensor2 (right). Connect sensor on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_LEFT_1"] = "left";
Blockly.Msg["ROBOTS_MAKEBLOCK_RIGHT_2"] = "right";
Blockly.Msg["ROBOTS_MAKEBLOCK_READPIRSENSOR_TITLE"] = "[PIR Motion Sensor] state on port %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_READPIRSENSOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_PIR_MOTION + Blockly.Tooltip.SEP + "Returns state (1 if detected, 0 else) from PIR motion sensor of Makeblock. Connect sensor on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_WATERPROOFTEMPERATURE_TITLE"] = "[DS18B20 Sensor] temperature on port %1 slot %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_WATERPROOFTEMPERATURE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_WATERPROOF_TEMPERATURE + Blockly.Tooltip.SEP + "Lets you read the measure the temperature with the Makeblock waterproof ds18b20 sensor. Choice slot (1 or 2) of RJ45 adapter. Connect sensor on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETLIGHT_TITLE"] = "[Light Sensor] light level on port %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETLIGHT_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_LIGHT + Blockly.Tooltip.SEP + "Lets you read the light level with the Makeblock light sensor. Connect sensor on RJ45 port from 1 to 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOLOR_TITLE"] = "[Color Sensor] %1 on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOLOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_COLOR + Blockly.Tooltip.SEP + "Lets you read the level of one of the three primary colors with the Makeblock color sensor. It returns also the measured color as 0 (White), 1 (Pinke), 2 (Red), 3 (Orange), 4 (Yellow), 5 (Green), 5 (Cyan), 6 (Blue), 7 (Purple), 8 (Black), 9 (Gold). Connect sensor on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_COLOR"] = "color";
Blockly.Msg["ROBOTS_MAKEBLOCK_RED"] = "level of red";
Blockly.Msg["ROBOTS_MAKEBLOCK_GREEN"] = "level of green";
Blockly.Msg["ROBOTS_MAKEBLOCK_BLUE"] = "level of blue";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSOUND_TITLE"] = "[Sound Sensor] sound level on port %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSOUND_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_SOUND + Blockly.Tooltip.SEP + "Lets you read the sound level with the Makeblock sound sensor. Connect sensor on RJ45 port from 1 to 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETGAS_TITLE"] = "[Gas MQ2 Sensor] %1 on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETGAS_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_GAS + Blockly.Tooltip.SEP + "Lets you read the amount of gas with the Makeblock gas sensor MQ2. It is possible to get a state value as 0 (no gas) or 1 (gas). Use the potentiometer on module in order to set the appropriate concentration threshold. Connect sensor on RJ45 port 1 or 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GAS_DIGITAL"] = "state";
Blockly.Msg["ROBOTS_MAKEBLOCK_GAS_ANALOG"] = "value";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETFLAME_TITLE"] = "[Flame Sensor] %1 on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETFLAME_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_FLAME + Blockly.Tooltip.SEP + "Lets you read the detectable flame with the Makeblock flame sensor. It is possible to get a state value as 0 (no flame) or 1 (flame). Use the potentiometer on module in order to set the appropriate the flame limit threshold. This sensor detect the infrared light with wavelength from 700 nm to 1200 nm. Connect sensor on RJ45 port 1 or 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_FLAME_DIGITAL"] = "state";
Blockly.Msg["ROBOTS_MAKEBLOCK_FLAME_ANALOG"] = "value";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOMPASSDATA_TITLE"] = "[Compas] %1 on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOMPASSDATA_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_COMPASS + Blockly.Tooltip.SEP + "Let's you to read compass data of Makeblock. Brancher le capteur sur un port RJ45 de 1 ou 4 du robot mBot.";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_X"] = "X axis";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_Y"] = "Y axis";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_Z"] = "Z axis";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_ANGLE"] = "angle (°)";
// Robots - Makeblock actuators
Blockly.Msg["ROBOTS_MAKEBLOCK_SETSERVOANGLE_TITLE"] = "[Servomotor] set angle to %1 on pin %2 slot %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETSERVOANGLE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_SERVO + Blockly.Tooltip.SEP + "Enable to control servo angle (from 0 to 180) connected to a RJ45 adapter of Makeblock. Choice slot (1 or 2) of RJ45 adapter. Connect module on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_CONTROLMINIFAN_TITLE"] = "[Mini fan] set direction at %1 on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_CONTROLMINIFAN_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MINI_FAN + Blockly.Tooltip.SEP + "Enable to control mini fan of Makeblock.";
Blockly.Msg["ROBOTS_MAKEBLOCK_CLOCKWISE"] = "clockwise";
Blockly.Msg["ROBOTS_MAKEBLOCK_ANTICLOCKWISE"] = "anticlockwise";
Blockly.Msg["ROBOTS_MAKEBLOCK_STOP"] = "stop";
// Robots - Makeblock input/output
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSWITCHSTATE_TITLE"] = "[End-running Switch] state on port %1 slot %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSWITCHSTATE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_SWITCH + Blockly.Tooltip.SEP + "Lets you read the state of Makeblock switch module. Choice slot (1 or 2) of RJ45 adapter. Connect sensor on RJ45 port from 1 to 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETJOYSTICKAXIS_TITLE"] = "[Joystick] value of axis %1 on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETJOYSTICKAXIS_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_JOYSTICK + Blockly.Tooltip.SEP + "Lets you read the axis value (X or Y) from Makeblock joystick module. Connect sensor on RJ45 port from 1 to 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPOTENTIOMETER_TITLE"] = "[Potentiometer] value on port %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPOTENTIOMETER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_POTENTIOMETER + Blockly.Tooltip.SEP + "Lets you read the potentiometer value from Makeblock module. Connect sensor on RJ45 port from 1 to 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPRESSEDBUTTON_TITLE"] = "[4 Buttons module] pressed button on port %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPRESSEDBUTTON_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_4_BUTTONS + Blockly.Tooltip.SEP + "Returns the pressed button from 4 buttons module of Makeblock. Connect module on RJ45 port from 1 to 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_READTOUCHSENSOR_TITLE"] = "[Touch Sensor] state on port %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_READTOUCHSENSOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_TOUCH_SENSOR + Blockly.Tooltip.SEP + "Returns state from touch sensor of Makeblock. Connect module on RJ45 port from 1 to 4.";
