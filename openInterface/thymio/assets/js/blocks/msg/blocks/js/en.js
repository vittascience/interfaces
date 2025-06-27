/**
 * @fileoverview English messages for Thymio. (EN)
 */

'use strict';

// Display THYMIO
Blockly.Msg['DISPLAY_TURNOFF_ALL_LEDS_TITLE'] = 'turn off all LEDs';
Blockly.Msg['DISPLAY_TURNOFF_ALL_LEDS_TOOLTIP'] = 'Turn off all the LEDs of the Thymio robot.';
Blockly.Msg["DISPLAY_RGBLED_TURNOFF_TITLE"] = "turn off LED %1";
Blockly.Msg["DISPLAY_RGBLED_TURNOFF_TOOLTIP"] = "Turn off the different RGB LEDs of the Thymio robot.";
Blockly.Msg["DISPLAY_RGBLED_TURNOFF_TOP"] = "top";
Blockly.Msg["DISPLAY_RGBLED_TURNOFF_BOTTOM_RIGHT"] = "bottom right";
Blockly.Msg["DISPLAY_RGBLED_TURNOFF_BOTTOM_LEFT"] = "bottom left";
Blockly.Msg["DISPLAY_RGBLED_TURNOFF_CIRCLE"] = "front circle";
Blockly.Msg["DISPLAY_RGBLED_TURNOFF_HORIZONTAL_SENSORS"] = "horizontal sensors";
Blockly.Msg["DISPLAY_RGBLED_TURNOFF_VERTICAL_SENSORS"] = "ground sensors";
Blockly.Msg["DISPLAY_RGBLED_TURNOFF_LED_RC"] = "remote control";
Blockly.Msg["DISPLAY_RGBLED_TURNOFF_LED_BUTTONS"] = "buttons";
Blockly.Msg["DISPLAY_RGBLED_TURNOFF_LED_TEMPERATURE"] = "temperature";
Blockly.Msg["DISPLAY_RGBLED_TURNOFF_LED_MICROPHONE"] = "microphone";
Blockly.Msg["DISPLAY_RGBLED_SETCOLOR_TITLE"] = "turn on LED %1 with R%2 G%3 B%4";
Blockly.Msg["DISPLAY_RGBLED_SETCOLOR_TOOLTIP"] = "Turn on the different RGB LEDs of the Thymio robot.";
Blockly.Msg["DISPLAY_RGBLED_SETCOLOR_PALETTE_TITLE"] = "turn on LED %1 with %2";
Blockly.Msg["DISPLAY_RGBLED_SETCOLOR_PALETTE_TOOLTIP"] = "Turn on the different RGB LEDs of the Thymio robot using a color palette.";
Blockly.Msg["DISPLAY_RGBLED_SETCOLOR_TOP"] = "top";
Blockly.Msg["DISPLAY_RGBLED_SETCOLOR_BOTTOM_RIGHT"] = "bottom right";
Blockly.Msg["DISPLAY_RGBLED_SETCOLOR_BOTTOM_LEFT"] = "bottom left";
Blockly.Msg["DISPLAY_CIRCLELED_TURNON_TITLE"] = "Turn on the %1 circle LED with front %2 front right %3 right %4 back right %5 back %6 back left %7 left %8 front left %9";
Blockly.Msg["DISPLAY_CIRCLELED_TURNON_TOOLTIP"] = "Turn on the different LEDs of the front circle of the Thymio robot.";
Blockly.Msg["DISPLAY_PROXIMITYLED_TURNON_TITLE"] = "Turn on proximity sensor LED %1 front left %2 front left central %3 front central left %4 front central right %5 front right central %6 front right %7 back left %8 back right %9";
Blockly.Msg["DISPLAY_PROXIMITYLED_TURNON_TOOLTIP"] = "Turn on the different LEDs of the front circle of the Thymio robot.";
Blockly.Msg["DISPLAY_GROUNDSENSORLED_TURNON_TITLE"] = "Turn on the ground sensor LED left %1 and right %2";
Blockly.Msg["DISPLAY_GROUNDSENSORLED_TURNON_TOOLTIP"] = "Turn on the different LEDs of the ground sensors of the Thymio robot.";
Blockly.Msg["DISPLAY_LEDBUTTONS_TURNON_TITLE"] = "Turn on the LED buttons %1 front %2 back %3 %4 left %5 right %6";
Blockly.Msg["DISPLAY_LEDBUTTONS_TURNON_TOOLTIP"] = "Turn on the different LEDs of the buttons of the Thymio robot.";
Blockly.Msg["DISPLAY_TEMPERATURELED_TURNON_TITLE"] = "Turn on the temperature LED red %1 blue %2";
Blockly.Msg["DISPLAY_TEMPERATURELED_TURNON_TOOLTIP"] = "Turn on the different temperature LEDs of the Thymio robot.";
Blockly.Msg["DISPLAY_RC_SOUND_SENSORLED_TURNON_TITLE"] = "Turn on the LED %1 with %2";
Blockly.Msg["DISPLAY_RC_SOUND_SENSORLED_TURNON_TOOLTIP"] = "Turn on the LEDs of the Thymio robot's remote control and microphone.";
Blockly.Msg["DISPLAY_RC_SENSORLED_TURNON"] = "of the remote control";
Blockly.Msg["DISPLAY_MIC_SENSORLED_TURNON"] = "of the microphone";

// Input Output THYMIO
Blockly.Msg["IO_WAIT_TITLE"] = "wait %1 %2";
Blockly.Msg["IO_WAIT_TOOLTIP"] = "Pause the execution of the code.";
Blockly.Msg["IO_WAIT_SECOND"] = "second(s)";
Blockly.Msg["IO_WAIT_MILLISECOND"] = "millisecond(s)";
Blockly.Msg["IO_WAIT_MICROSECOND"] = "microsecond(s)";
Blockly.Msg["IO_WAIT_UNTIL_TITLE"] = "wait until %1";
Blockly.Msg["IO_WAIT_UNTIL_TOOLTIP"] = "Stop the execution of the code until the condition is met.";
Blockly.Msg["IO_SOUND_MIC_THRESHOLD_TITLE"] = "Set microphone threshold to %1";
Blockly.Msg["IO_SOUND_MIC_THRESHOLD_TOOLTIP"] = "Allows setting the microphone threshold.";
Blockly.Msg["IO_INITCHRONOMETER_TITLE"] = "start the stopwatch";
Blockly.Msg["IO_INITCHRONOMETER_TOOLTIP"] = "Initialize a stopwatch to 0 (in seconds).";
Blockly.Msg["IO_GETCHRONOMETER_TITLE"] = "stopwatch value in %1";
Blockly.Msg["IO_GETCHRONOMETER_TOOLTIP"] = "Return the value of the stopwatch starting from the initialization (in seconds or milliseconds).";
Blockly.Msg['DISPLAY_TIMER_FLASH_LED_TITLE'] = 'turn on and then off the rgb LEDs with color %1 every %2 second(s)';
Blockly.Msg['DISPLAY_TIMER_FLASH_LED_TOOLTIP'] = 'Allows to turn on and then off the Thymio robot\'s LEDs with a given color and a specified duration.';

// THYMIO BUTTONS
Blockly.Msg["IO_BUTTON_STATE_TITLE"] = "button %1 is pressed";
Blockly.Msg["IO_BUTTON_STATE_TOOLTIP"] = "";
Blockly.Msg["IO_BUTTON_STATE_PRESSED"] = "is";
Blockly.Msg["IO_BUTTON_STATE_NOT_PRESSED"] = "is not";
Blockly.Msg["IO_IS_BUTTON_PRESSED_TITLE"] = "button %1 is pressed";
Blockly.Msg["IO_IS_BUTTON_PRESSED_TOOLTIP"] = "Returns 1 if the button is pressed, 0 otherwise.";
Blockly.Msg["IO_BUTTON_CENTER"] = "center";
Blockly.Msg["IO_BUTTON_FORWARD"] = "forward";
Blockly.Msg["IO_BUTTON_BACKWARD"] = "backward";
Blockly.Msg["IO_BUTTON_LEFT"] = "left";
Blockly.Msg["IO_BUTTON_RIGHT"] = "right";
Blockly.Msg["IO_IS_PRESSED"] = "is";
Blockly.Msg["IO_IS_RELEASED"] = "has been";
Blockly.Msg["IO_ON_BUTTON_PRESSED_TITLE"] = "when button %1 %2 pressed";
Blockly.Msg["IO_ON_BUTTON_PRESSED_TOOLTIP"] = "Execute the code when the button is pressed.";

// THYMIO EVENTS
Blockly.Msg["IO_ON_BUTTON_PRESSED_EVENT_TITLE"] = "when button %1 is pressed";
Blockly.Msg["IO_ON_BUTTON_PRESSED_EVENT_TOOLTIP"] = "Create an event and execute the code when the button is pressed.";
Blockly.Msg["IO_ON_TIMER_EVENT_TITLE"] = "on %1 timer expired";
Blockly.Msg["IO_ON_TIMER_EVENT_TOOLTIP"] = "React to an expired timer event";
Blockly.Msg["IO_ON_PROXIMITY_EVENT_TITLE"] = "when %1 sensor detects %2";
Blockly.Msg["IO_ON_PROXIMITY_EVENT_TOOLTIP"] = "Create an event and execute the code when the proximity sensor detects an object or not.";
Blockly.Msg["IO_TIMER_MS_TITLE"] = "Start %1 timer with step %2 ms";
Blockly.Msg["IO_TIMER_MS_TOOLTIP"] = "Start the timer with a step of 1 ms";
Blockly.Msg["IO_TIMER_MS_1"] = "first";
Blockly.Msg["IO_TIMER_MS_2"] = "second";
Blockly.Msg["IO_ON_PROXIMITY_LINE_EVENT_TITLE"] = "when the ground sensor %1 detects %2";
Blockly.Msg["IO_ON_PROXIMITY_LINE_EVENT_TOOLTIP"] = "Create an event and execute the code when the ground sensor detects a line or not."
Blockly.Msg["IO_ON_TAP_EVENT_TITLE"] = "when a tap is detected";
Blockly.Msg["IO_ON_TAP_EVENT_TOOLTIP"] = "Create an event and execute the code when a tap is detected.";
Blockly.Msg["IO_ON_COM_EVENT_TITLE"] = "when a message from the %1 is received";
Blockly.Msg["IO_ON_COM_EVENT_TOOLTIP"] = "Create an event and execute the code when the remote control detects a signal or not.";
Blockly.Msg["IO_ON_COM_RC5"] = "remote control";
Blockly.Msg["IO_ON_COM_IR"] = "infrared communication";

Blockly.Msg["IO_ON_EVENT_BASIC_TITLE"] = "when %1 is updated";
Blockly.Msg["IO_ON_EVENT_BASIC_TOOLTIP"] = "Create an event and execute the code when the value is updated.";
Blockly.Msg["IO_ON_EVENT_BASIC_BUTTONS"] = "the buttons are";
Blockly.Msg["IO_ON_EVENT_BASIC_PROXIMITY"] = "the proximity sensors are";
Blockly.Msg["IO_ON_EVENT_BASIC_TEMPERATURE"] = "the temperature is";
Blockly.Msg["IO_ON_EVENT_BASIC_ACC"] = "the accelerometer is";
Blockly.Msg["IO_ON_EVENT_BASIC_MOTORS"] = "the motors are";

Blockly.Msg["IO_ON_COM_EVENT_TITLE"] = "when a message from %1 is received";
Blockly.Msg["IO_ON_COM_EVENT_TOOLTIP"] = "Create an event and execute code when the remote control detects a signal or not.";
Blockly.Msg["IO_ON_COM_RC5"] = "remote control";
Blockly.Msg["IO_ON_COM_IR"] = "infrared communication";

Blockly.Msg["IO_ON_EVENT_BASIC_TITLE"] = "when %1 updated";
Blockly.Msg["IO_ON_EVENT_BASIC_TOOLTIP"] = "Create an event and execute code when the value is updated.";
Blockly.Msg["IO_ON_EVENT_BASIC_BUTTONS"] = "buttons are";
Blockly.Msg["IO_ON_EVENT_BASIC_PROXIMITY"] = "proximity sensors are";
Blockly.Msg["IO_ON_EVENT_BASIC_TEMPERATURE"] = "temperature is";
Blockly.Msg["IO_ON_EVENT_BASIC_ACC"] = "accelerometer is";
Blockly.Msg["IO_ON_EVENT_BASIC_MOTORS"] = "motors are";

// SOUNDS
Blockly.Msg["IO_EVENT_MICROPHONE_TITLE"] = "when sound %1";
Blockly.Msg["IO_EVENT_MICROPHONE_TOOLTIP"] = "React to a sound event";
Blockly.Msg["IO_EVENT_MICROPHONE_THRESHOLD"] = "exceeds a threshold";
Blockly.Msg["IO_EVENT_MICROPHONE_SOUND_FINISHED"] = "has finished playing";

// Communication - Serial connection
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TITLE"] = "write to console %1";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TOOLTIP"] = "Write data to the console.";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_WITH"] = "with";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_NEWLINES"] = "new lines";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TITLE"] = "draw graph";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TOOLTIP"] = "This block allows you to write numerical data that will be visible in the plotter. It can be used with one or more blocks in the format 'Name' and 'Data'. To visualize the graphs, click on the 'Graphical Mode' icon in the console.";
Blockly.Msg["COMMUNICATION_DATA"] = "Data";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TITLE"] = "Name %1 Value %2";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TOOLTIP"] = "This block is used with the 'Draw graph' block. It must contain the name of the value to be displayed (text) and the value itself (number).";

// Sensors
Blockly.Msg["SENSORS_READ_OBSTACLE_TITLE"] = "proximity sensor %1 detects %2";
Blockly.Msg["SENSORS_READ_OBSTACLE_TOOLTIP"] = "Detect if an obstacle is present.";
Blockly.Msg["SENSORS_GET_PROXIMITY_DETECT_TRUE"] = "something";
Blockly.Msg["SENSORS_GET_PROXIMITY_DETECT_FALSE"] = "nothing";
Blockly.Msg["SENSORS_GET_LINE_TITLE"] = "ground sensor %1 detects %2";
Blockly.Msg["SENSORS_GET_LINE_TOOLTIP"] = "Detect if a line is present.";
Blockly.Msg["SENSORS_GET_LINE_LEFT"] = "left";
Blockly.Msg["SENSORS_GET_LINE_RIGHT"] = "right";
Blockly.Msg['SENSORS_GET_LINE_BOTH'] = 'left & right';
Blockly.Msg["SENSORS_GET_LINE_BLACK"] = "black";
Blockly.Msg["SENSORS_GET_LINE_WHITE"] = "white";
Blockly.Msg["SENSORS_GET_LINE_SOMETHING"] = "something";
Blockly.Msg["SENSORS_GET_LINE_NOTHING"] = "nothing";

// Sensors - Proximity
Blockly.Msg["SENSORS_GET_PROXIMITY_TITLE"] = "value from proximity sensor %1";
Blockly.Msg["SENSORS_GET_PROXIMITY_TOOLTIP"] = "Read the value from a proximity sensor.";
Blockly.Msg["SENSORS_GET_PROXIMITY_FRONT_LEFT"] = "front left";
Blockly.Msg["SENSORS_GET_PROXIMITY_FRONT_LEFT_CENTRAL"] = "front left/central";
Blockly.Msg["SENSORS_GET_PROXIMITY_FRONT_CENTRAL"] = "front central";
Blockly.Msg["SENSORS_GET_PROXIMITY_FRONT_RIGHT_CENTRAL"] = "front right/central";
Blockly.Msg["SENSORS_GET_PROXIMITY_BACK_LEFT"] = "back left";
Blockly.Msg["SENSORS_GET_PROXIMITY_BACK_RIGHT"] = "back right";
Blockly.Msg["SENSORS_GET_PROXIMITY_GROUND_LEFT"] = "left ground";
Blockly.Msg["SENSORS_GET_PROXIMITY_GROUND_RIGHT"] = "right ground";
Blockly.Msg["SENSORS_MOTOR_SPEED_TITLE"] = "motor speed %1";
Blockly.Msg["SENSORS_MOTOR_SPEED_TOOLTIP"] = "Read the speed of one of the two motors (left or right).";
Blockly.Msg["SENSORS_MOTOR_LEFT"] = "left";
Blockly.Msg["SENSORS_MOTOR_RIGHT"] = "right";
Blockly.Msg["SENSORS_GET_ACCELEROMETER_TITLE"] = "%1 value of accelerometer";
Blockly.Msg["SENSORS_GET_ACCELEROMETER_TOOLTIP"] = "Read the values of the accelerometer.";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TITLE"] = "temperature";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TOOLTIP"] = "Read the temperature value.";
Blockly.Msg["SENSORS_GET_MICROPHONE_TITLE"] = "microphone intensity value";
Blockly.Msg["SENSORS_GET_MICROPHONE_TOOLTIP"] = "Read the value of the microphone intensity.";
Blockly.Msg["SENSORS_GET_IR_COMMUNICATION_TITLE"] = "received value from IR communication";
Blockly.Msg["SENSORS_GET_IR_COMMUNICATION_TOOLTIP"] = "Read the value received from infrared communication.";
Blockly.Msg["SENSORS_GET_IR_REMOTE_TITLE"] = "%1 value received from remote control";
Blockly.Msg["SENSORS_GET_IR_REMOTE_TOOLTIP"] = "Read the value received from the infrared remote control.";
Blockly.Msg["SENSORS_GET_IR_ADRESS"] = "address";
Blockly.Msg["SENSORS_GET_IR_COMMAND"] = "command";

// Actuators
Blockly.Msg["ROBOT_MOVE_TITLE"] = "start moving %1 with speed %2";
Blockly.Msg["ROBOT_MOVE_TOOLTIP"] = "Control the Thymio robot motors to move forward or backward.";
Blockly.Msg["ROBOT_MOVE_FORWARD"] = "forward";
Blockly.Msg["ROBOT_MOVE_BACKWARD"] = "backward";
Blockly.Msg["ROBOT_ROTATE_CLOCK_TITLE"] = "rotate %1 with speed %2";
Blockly.Msg["ROBOT_ROTATE_CLOCK_TOOLTIP"] = "Rotate the Thymio robot clockwise or counterclockwise.";
Blockly.Msg["ROBOT_MOVE_CLOCK_WISE"] = "in the clockwise direction";
Blockly.Msg["ROBOT_MOVE_COUNTER_CLOCK_WISE"] = "in the counterclockwise direction";
Blockly.Msg["ROBOT_ROTATE_FOREVER_TITLE"] = "turn %1 with speed %2";
Blockly.Msg["ROBOT_ROTATE_FOREVER_TOOLTIP"] = "Rotate the Thymio robot to the left or right";
Blockly.Msg["ROBOT_ROTATE_FRONT_RIGHT"] = "front right";
Blockly.Msg["ROBOT_ROTATE_FRONT_LEFT"] = "front left";
Blockly.Msg["ROBOT_ROTATE_BACK_RIGHT"] = "back right";
Blockly.Msg["ROBOT_ROTATE_BACK_LEFT"] = "back left";
Blockly.Msg["ROBOT_STOP_SINGLE_MOTOR_TITLE"] = "stop %1 motor";
Blockly.Msg["ROBOT_STOP_SINGLE_MOTOR_TOOLTIP"] = "Stop one of the two motors of the Thymio.";
Blockly.Msg["ROBOT_STOP_SINGLE_MOTOR_LEFT"] = "left";
Blockly.Msg["ROBOT_STOP_SINGLE_MOTOR_RIGHT"] = "right";
Blockly.Msg["ROBOT_STOP_TITLE"] = "stop motors";
Blockly.Msg["ROBOT_STOP_TOOLTIP"] = "Stop the motors of the Thymio.";
Blockly.Msg["ROBOT_CHANGE_SINGLE_MOTOR_SPEED_TITLE"] = "Control motor %1 direction %2 speed %3";
Blockly.Msg["ROBOT_CHANGE_SINGLE_MOTOR_SPEED_TOOLTIP"] = "Change the speed of one of the two Thymio motors.";
Blockly.Msg["ROBOT_CHANGE_SINGLE_MOTOR_SPEED_LEFT"] = "left";
Blockly.Msg["ROBOT_CHANGE_SINGLE_MOTOR_SPEED_RIGHT"] = "right";

// Actuators - Sound

Blockly.Msg["SOUND_STOP_SOUND_SYSTEM_TITLE"] = "stop playing the sound";
Blockly.Msg["SOUND_STOP_SOUND_SYSTEM_TOOLTIP"] = "Stops playing the sound.";
Blockly.Msg["SOUND_PLAY_SOUND_TITLE"] = "play sound %1";
Blockly.Msg["SOUND_PLAY_SOUND_TOOLTIP"] = "Plays a system sound.";
Blockly.Msg["SOUND_PLAY_SOUND_SOUND_1"] = "power-up";
Blockly.Msg["SOUND_PLAY_SOUND_SOUND_2"] = "power-down";
Blockly.Msg["SOUND_PLAY_SOUND_SOUND_3"] = "arrow buttons";
Blockly.Msg["SOUND_PLAY_SOUND_SOUND_4"] = "center button";
Blockly.Msg["SOUND_PLAY_SOUND_SOUND_5"] = "scared";
Blockly.Msg["SOUND_PLAY_SOUND_SOUND_6"] = "collision";
Blockly.Msg["SOUND_PLAY_SOUND_SOUND_7"] = "friendly target";
Blockly.Msg["SOUND_PLAY_SOUND_SOUND_8"] = "target detected";
Blockly.Msg["SOUND_PLAY_SOUND_FREQ_TITLE"] = "play a note %1 Hz for %2 /60 seconds";
Blockly.Msg["SOUND_PLAY_SOUND_FREQ_TOOLTIP"] = "Plays a note at a given frequency for a given duration.";

// Math module

Blockly.Msg['MATH_THYMIO_RESULT_DEFAULT_NAME'] = 'result';
Blockly.Msg['VARIABLES_DEFAULT_NAME1'] = 'A';
Blockly.Msg['VARIABLES_DEFAULT_NAME2'] = 'B';
Blockly.Msg['MATH_THYMIO_COPY_TITLE'] = 'copy %1 to %2';
Blockly.Msg['MATH_THYMIO_COPY_TOOLTIP'] = 'Copies the value of "A" to "B".';
Blockly.Msg['MATH_THYMIO_ADD_TITLE'] = 'add %1 to %2 in %3';
Blockly.Msg['MATH_THYMIO_ADD_TOOLTIP'] = 'Adds the value of "A" to "B" and stores the result in "C".';
Blockly.Msg['MATH_THYMIO_SUBTRACT_TITLE'] = 'subtract %1 from %2 in %3';
Blockly.Msg['MATH_THYMIO_SUBTRACT_TOOLTIP'] = 'Subtracts the value of "A" from "B" and stores the result in "C".';
Blockly.Msg['MATH_THYMIO_MULTIPLY_TITLE'] = 'multiply %1 by %2 in %3';
Blockly.Msg['MATH_THYMIO_MULTIPLY_TOOLTIP'] = 'Multiplies the value of "A" by "B" and stores the result in "C".';
Blockly.Msg['MATH_THYMIO_DIVIDE_TITLE'] = 'divide %1 by %2 in %3';
Blockly.Msg['MATH_THYMIO_DIVIDE_TOOLTIP'] = 'Performs integer division of the value of "A" by "B" and stores the result in "C".';
Blockly.Msg['MATH_THYMIO_MIN_TITLE'] = 'minimum of %1 and %2 in %3';
Blockly.Msg['MATH_THYMIO_MIN_TOOLTIP'] = 'Stores the minimum between "A" and "B" in "C".';
Blockly.Msg['MATH_THYMIO_MAX_TITLE'] = 'maximum of %1 and %2 in %3';
Blockly.Msg['MATH_THYMIO_MAX_TOOLTIP'] = 'Stores the maximum between "A" and "B" in "C".';
Blockly.Msg['MATH_THYMIO_RANDOM_TITLE'] = 'random number in %1';
Blockly.Msg['MATH_THYMIO_RANDOM_TOOLTIP'] = 'Stores a random number in "result".';
Blockly.Msg['MATH_THYMIO_SIN_TITLE'] = 'sine of %1 in %2';
Blockly.Msg['MATH_THYMIO_SIN_TOOLTIP'] = 'Stores the sine value of the angle "A" (in radians) in "result".';
Blockly.Msg['MATH_THYMIO_COS_TITLE'] = 'cosine of %1 in %2';
Blockly.Msg['MATH_THYMIO_COS_TOOLTIP'] = 'Stores the cosine value of the angle "A" (in radians) in "result".';
Blockly.Msg['MATH_THYMIO_SQRT_TITLE'] = 'square root of %1 in %2';
Blockly.Msg['MATH_THYMIO_SQRT_TOOLTIP'] = 'Stores the square root of "A" in "result".';
