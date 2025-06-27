/**
 * @fileoverview English messages for Sphero. (EN)
 */

'use strict';

// Display 
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_TITLE'] = '[Main LED] R %1 G %2 B %3';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_TOOLTIP'] = 'Changes the main LED color in RGB format for the Sphero Mini robot.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_PALETTE_TITLE'] = '[Main LED] %1';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_PALETTE_TOOLTIP'] = 'Changes the main LED color for the Sphero Mini robot using a color palette.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_FADE_TITLE'] = '[Main LED] fade from %1 to %2 over %3 s';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_FADE_TOOLTIP'] = 'Changes the main LED color of the Sphero Mini robot by fading colors.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_BLINK_TITLE'] = '[Main LED] blink in %1 for %2 s %3 times';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_BLINK_TOOLTIP'] = 'Makes the main LED of the Sphero Mini robot blink.';
Blockly.Msg['DISPLAY_SET_BACK_LED_INTENSITY_TITLE'] = '[Back LED] intensity %1';
Blockly.Msg['DISPLAY_SET_BACK_LED_INTENSITY_TOOLTIP'] = 'Changes the intensity of the back LED (between 0 and 255) of the Sphero Mini robot.';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'wait %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pauses the code execution.';
Blockly.Msg['IO_WAIT_SECOND'] = 'second(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisecond(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsecond(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'wait until %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Pauses the code execution until the condition is met.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'start stopwatch';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Initializes a stopwatch at 0 (in seconds).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'stopwatch value in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Returns the value of the stopwatch from initialization (in seconds or milliseconds).';

// Communication
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'write to console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Writes data to the serial port.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'with';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'newline(s)';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'plot graph';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'This block writes data (numeric) which will be visible in the plotter. It can be used with one or more blocks in the "Name" and "Data" format. To view the graphs, click on the \'Graph Mode\' icon in the console.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Data';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Name %1 Value %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'This block is to be used with the "Plot graph" block. It should contain the name of the value to display (text), and the value in question (number).';

// Sensors
Blockly.Msg['SENSORS_PITCH_TITLE'] = 'pitch (°)';
Blockly.Msg['SENSORS_PITCH_TOOLTIP'] = 'Returns the pitch value.';
Blockly.Msg['SENSORS_ROLL_TITLE'] = 'roll (°)';
Blockly.Msg['SENSORS_ROLL_TOOLTIP'] = 'Returns the roll value.';
Blockly.Msg['SENSORS_YAW_TITLE'] = 'yaw (°)';
Blockly.Msg['SENSORS_YAW_TOOLTIP'] = 'Returns the yaw value.';
Blockly.Msg['SENSORS_ACCELEROMETER_TITLE'] = 'accelerometer (g) %1';
Blockly.Msg['SENSORS_ACCELEROMETER_TOOLTIP'] = 'Returns the accelerometer value on the x, y, or z axis.';
Blockly.Msg['SENSORS_GYROSCOPE_TITLE'] = 'gyroscope %1';
Blockly.Msg['SENSORS_GYROSCOPE_TOOLTIP'] = 'Returns the gyroscope value on the x, y, or z axis.';
Blockly.Msg['SENSORS_IS_FALL_DETECTED_TITLE'] = 'collision?';
Blockly.Msg['SENSORS_IS_FALL_DETECTED_TOOLTIP'] = 'Returns true if a collision is detected.';
Blockly.Msg['X_AXIS'] = 'x';
Blockly.Msg['Y_AXIS'] = 'y';
Blockly.Msg['Z_AXIS'] = 'z';
Blockly.Msg['STRENGTH'] = 'strength';
// Actuators
Blockly.Msg['ACTUATORS_SET_MOTORS_TITLE'] = '%1 speed %2';
Blockly.Msg['ACTUATORS_SET_MOTORS_TOOLTIP'] = 'Allows the Sphero Mini robot to move forward or backward at a speed between 0 and 255.';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_TIMEOUT_TITLE'] = '%1 speed %2 for %3 s';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_TIMEOUT_TOOLTIP'] = 'Allows the Sphero Mini robot to move forward or backward at a speed between 0 and 255 for a given time.';
Blockly.Msg['ACTUATORS_SET_HEADING_TITLE'] = 'heading %1 °';
Blockly.Msg['ACTUATORS_SET_HEADING_TOOLTIP'] = 'Changes the heading of the Sphero Mini robot.';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_HEADING_TITLE'] = '%1 speed %2 heading %3 °';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_HEADING_TOOLTIP'] = 'Allows the Sphero Mini robot to move forward or backward at a speed between 0 and 255 with a given heading.';
Blockly.Msg['ACTUATORS_ROTATE_TITLE'] = 'rotate %1 speed %2';
Blockly.Msg['ACTUATORS_ROTATE_TOOLTIP'] = 'Allows the Sphero Mini robot to rotate at a speed between 0 and 255.';
Blockly.Msg['ACTUATORS_ROTATE_WITH_TIMEOUT_TITLE'] = 'rotate %1 speed %2 for %3 s';
Blockly.Msg['ACTUATORS_ROTATE_WITH_TIMEOUT_TOOLTIP'] = 'Allows the Sphero Mini robot to rotate at a speed between 0 and 255 for a given time.';
Blockly.Msg['ACTUATORS_SET_MOTOR_TITLE'] = 'motor at %1 direction %2 speed %3';
Blockly.Msg['ACTUATORS_SET_MOTOR_TOOLTIP'] = 'Controls the right or left motor of the Sphero Mini robot at a speed between 0 and 255 in a given direction.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'stop motors';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Stops the motors of the Sphero Mini robot.';
Blockly.Msg['ACTUATORS_RESET_HEADING_TITLE'] = 'reset heading to default';
Blockly.Msg['ACTUATORS_RESET_HEADING_TOOLTIP'] = 'Resets the heading of the Sphero Mini robot.';
Blockly.Msg['ACTUATORS_GO_FORWARD'] = "forward";
Blockly.Msg['ACTUATORS_GO_BACKWARD'] = "backward";
Blockly.Msg['ACTUATORS_MOTOR_RIGHT'] = "right";
Blockly.Msg['ACTUATORS_MOTOR_LEFT'] = "left";
Blockly.Msg['ACTUATORS_MOTOR_RIGHT&LEFT'] = "right&left";