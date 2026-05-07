/**
 * @fileoverview English messages for AlphAI. (EN)
 */

'use strict';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'wait %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pause the execution of the code.';
Blockly.Msg['IO_WAIT_SECOND'] = 'second(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisecond(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsecond(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'wait until %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Stop the execution of the code until the condition is met.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'start chronometer';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Initialize a chronometer at 0 (in seconds).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'chronometer value in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Returns the value of the chronometer from initialization (in seconds or milliseconds).';
// Robot - Communication
Blockly.Msg['ROBOT_PRINT_MESSAGE_TITLE'] = 'print %1 in console';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TOOLTIP'] = 'Prints a message in the output console.';
// Robot - Actuators
Blockly.Msg['ROBOT_SET_DIRECTION_TITLE'] = '%1 at speed %2';
Blockly.Msg['ROBOT_SET_DIRECTION_TOOLTIP'] = 'Moves the robot in the chosen direction at the specified speed (between -100 and 100).';
Blockly.Msg['ROBOT_SET_MOTOR_TITLE'] = 'left motor speed %1 right motor speed %2';
Blockly.Msg['ROBOT_SET_MOTOR_TOOLTIP'] = 'Controls the speed of the left and right motors of the robot (between -100 and 100).';
Blockly.Msg['ROBOT_SET_DURATION'] = 'during';
Blockly.Msg['ROBOT_FORWARD'] = 'forward';
Blockly.Msg['ROBOT_BACKWARD'] = 'backward';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'rotate left';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'rotate right';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'stop the robot';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'Stops the robot.';
Blockly.Msg['ROBOT_SET_BUZZER_TITLE'] = '%1 the buzzer';
Blockly.Msg['ROBOT_SET_BUZZER_TOOLTIP'] = 'Activates or deactivates the robot buzzer.';
Blockly.Msg['ROBOT_BUZZER_ON'] = 'activate';
Blockly.Msg['ROBOT_BUZZER_OFF'] = 'deactivate';
// Robot - Sensors
Blockly.Msg['ROBOT_IS_BLOCKED_TITLE'] = 'is the robot blocked?';
Blockly.Msg['ROBOT_IS_BLOCKED_TOOLTIP'] = 'Returns true if the robot is blocked, otherwise returns false.';
Blockly.Msg['ROBOT_GET_DISTANCE_TITLE'] = 'distance sensor value (in cm)';
Blockly.Msg['ROBOT_GET_DISTANCE_TOOLTIP'] = 'Returns the value of the distance sensor of the robot (in cm).';
Blockly.Msg['ROBOT_GET_INFRA_RED_TITLE'] = 'black line sensors values %1';
Blockly.Msg['ROBOT_GET_INFRA_RED_TOOLTIP'] = 'Return values of line finder sensors from around 0-500 (black) to 500-1000 (white). The option \'all\' of block allows you to get array of 5 sensor values.';
Blockly.Msg['ROBOT_ROBOT_ALL_SENSORS'] = 'all';
// Robot - Camera
Blockly.Msg['ROBOT_SET_CAMERA_TITLE'] = 'activate camera with resolution %1';
Blockly.Msg['ROBOT_SET_CAMERA_TOOLTIP'] = 'Activates the robot camera with the chosen resolution.';
Blockly.Msg['ROBOT_GET_CAMERA_TITLE'] = 'camera image';
Blockly.Msg['ROBOT_GET_CAMERA_TOOLTIP'] = 'Returns the image captured by the robot camera. If the chosen resolution is \'1x1\', returns a list of 3 integers (R, G, B components), between 0 and 255. If the resolution is \'1x2\', returns a list of 2 lists of 3 integers. In other cases, returns a list of n_rows lists of n_columns lists of 3 integers.';
// Robot - Display
Blockly.Msg['ROBOT_SET_LEDS_RGB_TITLE'] = 'control LEDs with R %1 G %2 B %3';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TOOLTIP'] = 'Controls the robot LEDs by specifying the red, green and blue components (between 0 and 255).';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TITLE'] = 'control LEDs with %1';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TOOLTIP'] = 'Controls the robot LEDs by choosing a color from the palette.';
Blockly.Msg['ROBOT_ALL_SENSORS'] = 'all';
