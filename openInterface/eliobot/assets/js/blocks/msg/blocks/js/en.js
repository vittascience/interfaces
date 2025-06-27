/**
 * @fileoverview English messages for Eliobot. (EN)
 */

'use strict';

// Display
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_TITLE"] = "change the colour of the integrated LED %1";
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP"] = "Allows you to light the integrated RGB LED on the Eliobot robot.";
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_OFF_TITLE"] = "turn off the integrated LED";
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_OFF_TOOLTIP"] = "Allows you to extinguish the integrated RGB LED on the Eliobot robot.";

// Input/Output
Blockly.Msg["IO_WAIT_TITLE"] = "wait %1 %2";
Blockly.Msg["IO_WAIT_TOOLTIP"] = "Stop the code execution (duration in seconds or milliseconds).";
Blockly.Msg["IO_WAIT_SECOND"] = "second.s";
Blockly.Msg["IO_WAIT_MILLISECOND"] = "millisecond.s";
Blockly.Msg["IO_WAIT_MICROSECOND"] = "microsecond.s";
Blockly.Msg["IO_WAIT_UNTIL_TITLE"] = "wait until %1";
Blockly.Msg["IO_WAIT_UNTIL_TOOLTIP"] = "Stop the code execution until the satisfied condition.";
Blockly.Msg["IO_INITCHRONOMETER_TITLE"] = "Initialize the chronometer";
Blockly.Msg["IO_INITCHRONOMETER_TOOLTIP"] = "Allows you to initialize the chronometer (in seconds).";
Blockly.Msg["IO_GETCHRONOMETER_TITLE"] = "get chronometer in %1";
Blockly.Msg["IO_GETCHRONOMETER_TOOLTIP"] = "Returns the chronometer value from the initialization in seconds or milliseconds.";
Blockly.Msg["IO_BUTTON_STATE_TITLE"] = "button %1 pressed";
Blockly.Msg["IO_BUTTON_STATE_TOOLTIP"] = "";
Blockly.Msg["IO_BUTTON_STATE_PRESSED"] = "is";
Blockly.Msg["IO_BUTTON_STATE_NOT_PRESSED"] = "is not";

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
Blockly.Msg['SENSORS_DHT11_TEMPERATURE_TITLE'] = '[DHT11] temperature';
Blockly.Msg['SENSORS_DHT11_TEMPERATURE_TOOLTIP'] = 'Measures temperature (°C) using the DHT11 sensor.';
Blockly.Msg['SENSORS_DHT11_HUMIDITY_TITLE'] = '[DHT11] humidity';
Blockly.Msg['SENSORS_DHT11_HUMIDITY_TOOLTIP'] = 'Measures humidity (%) using the DHT11 sensor.';
// Actuators
Blockly.Msg["ROBOT_MOVE_TITLE"] = "control the robot %1 at speed %2";
Blockly.Msg["ROBOT_MOVE_TOOLTIP"] = "Allows you to control the Eliobot robot engines to advance or back down.";
Blockly.Msg["ROBOT_MOVE_FORWARD"] = "forward";
Blockly.Msg["ROBOT_MOVE_BACKWARD"] = "backward";
Blockly.Msg["ROBOT_ROTATE_TITLE"] = "rotate on the %1 at speed %2";
Blockly.Msg["ROBOT_ROTATE_TOOLTIP"] = "Rotate the Eliobot on the left or right.";
Blockly.Msg["ROBOT_ROTATE_RIGHT"] = "right";
Blockly.Msg["ROBOT_ROTATE_LEFT"] = "left";
Blockly.Msg["ROBOT_ROTATE_FOREVER_TITLE"] = "rotate on the %1 during %2 %3 at speed %4";
Blockly.Msg["ROBOT_ROTATE_FOREVER_TOOLTIP"] = "Pivot the Eliobot on the left or right for a certain period.";
Blockly.Msg["ROBOT_STOP_TITLE"] = "stop the robot";
Blockly.Msg["ROBOT_STOP_TOOLTIP"] = "Stop motors of the Eliobot.";
Blockly.Msg['ROBOT_SET_SPEED_TITLE'] = 'speed %1 %';
Blockly.Msg['ROBOT_SET_SPEED_TOOLTIP'] = 'Changes the speed of the Eliobot.';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TITLE'] = 'rotate by %1 of %2° at speed %3';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TOOLTIP'] = 'Rotates the Eliobot to the left or right by the desired angle.';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TITLE'] = 'turn wheel %1 towards %2 at speed %3';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TOOLTIP'] = 'Turns one of the Eliobot\'s wheels in the desired direction.';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TITLE'] = 'move forward by %1 step(s) at speed %2';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TOOLTIP'] = 'Allows the Eliobot to move forward by steps.';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TITLE'] = 'play note %1 for %2 %3';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TOOLTIP'] = 'This block allows you to play a musical note. The note is defined by its name (C, D, E, F, G, A, B) and the duration for which it is played.';
Blockly.Msg['ACTUATORS_FREQUENCY_TITLE'] = 'play frequency %1 (Hz) for %2 %3';
Blockly.Msg['ACTUATORS_FREQUENCY_TOOLTIP'] = 'This block allows you to play a frequency. The frequency is defined in Hertz (Hz) and the duration for which it is played.';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TITLE'] = 'play music %1';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TOOLTIP'] = 'This block allows you to play predefined music. There are several predefined pieces of music available.';
Blockly.Msg['ACTUATORS_SET_VOLUME_TITLE'] = 'set volume to %1 %';
Blockly.Msg['ACTUATORS_SET_VOLUME_TOOLTIP'] = 'This block adjusts the volume. The volume level is set as a percentage.'