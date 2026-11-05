/**
 * @fileoverview English messages for Lego Spike. (EN)
 */

'use strict';

// Display
Blockly.Msg['DISPLAY_SHOW_LEDS_TOOLTIP'] = "Allows changing the color of the LEDs on the 3x3 matrix.";
Blockly.Msg['DISPLAY_SET_PIXEL_TITLE'] = "%1 control LED x %2 y %3 %4";
Blockly.Msg['DISPLAY_SET_PIXEL_TOOLTIP'] = "Allows changing the color of an LED on the 3x3 matrix.";
Blockly.Msg['DISPLAY_SET_INTENSITY_TITLE'] = "%1 set intensity %2 %";
Blockly.Msg['DISPLAY_SET_INTENSITY_TOOLTIP'] = "Allows changing the brightness of the LEDs on the 3x3 matrix.";

// Actuators
Blockly.Msg['ACTUATORS_START_MOTOR_CONTINUOUS_TITLE'] = "%1 start motor %2 speed %3 % continuously";
Blockly.Msg['ACTUATORS_START_MOTOR_CONTINUOUS_TOOLTIP'] = "Starts the motor in the specified direction at the given speed continuously.";
Blockly.Msg['ACTUATORS_START_MOTOR_FOR_TIME_TITLE'] = "%1 start motor %2 speed %3 % for %4 seconds";
Blockly.Msg['ACTUATORS_START_MOTOR_FOR_TIME_TOOLTIP'] = "Starts the motor in the specified direction at the given speed for the specified duration.";
Blockly.Msg['ACTUATORS_MOVE_MOTOR_TO_POSITION_TITLE'] = "%1 move motor to position %2 ° speed %3 %";
Blockly.Msg['ACTUATORS_MOVE_MOTOR_TO_POSITION_TOOLTIP'] = "Moves the motor to the specified position at the given speed.";
Blockly.Msg['ACTUATORS_STOP_MOTOR_TITLE'] = "%1 stop motor";
Blockly.Msg['ACTUATORS_STOP_MOTOR_TOOLTIP'] = "Stops the motor.";
Blockly.Msg['ACTUATORS_MOVE_MOTORS_BY_DEGREES_TITLE'] = "%1 move motor %2 by %3 ° speed %4 %";
Blockly.Msg['ACTUATORS_MOVE_MOTORS_BY_DEGREES_TOOLTIP'] = "Moves the motor by the specified number of degrees in the given direction at the provided speed.";

// Communication
Blockly.Msg['COMMUNICATION_SPEECH_SYNTHESIS_SAY_TITLE'] = 'say %1 in %2';
Blockly.Msg['COMMUNICATION_SPEECH_SYNTHESIS_SAY_TOOLTIP'] = 'Allows the device to speak in the specified language.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'write to console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Allows writing data to the serial port.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'with';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'newline(s)';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'plot graph';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'This block allows writing (numeric) data that will be visible in the plotter. It can be used with one or more blocks in the "Name" and "Data" format. To view graphs, click the \'Graph Mode\' icon in the console.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Data';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Name %1 Value %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'This block is used with the "Plot graph" block. It should contain the name of the value to be displayed (text) and the value itself (number).';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'wait %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pauses the execution of the code.';
Blockly.Msg['IO_WAIT_SECOND'] = 'second(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisecond(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsecond(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'wait until %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Stops the execution of the code until the condition is met.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'start the chronometer';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Starts a chronometer at 0 (in seconds).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'chronometer value in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Returns the value of the chronometer since initialization (in seconds or milliseconds).';

// Actuators
Blockly.Msg['ACTUATORS_MOVE_FORWARD_TITLE'] = 'move forward';
Blockly.Msg['ACTUATORS_MOVE_FORWARD_TOOLTIP'] = 'Allows the Lego Spike robot to move forward.';
Blockly.Msg['ACTUATORS_MOVE_BACKWARD_TITLE'] = 'move backward';
Blockly.Msg['ACTUATORS_MOVE_BACKWARD_TOOLTIP'] = 'Allows the Lego Spike robot to move backward.';
Blockly.Msg['ACTUATORS_TURN_LEFT_45_DEGREES_TITLE'] = 'turn left 45°';
Blockly.Msg['ACTUATORS_TURN_LEFT_45_DEGREES_TOOLTIP'] = 'Allows the Lego Spike robot to turn left by 45°.';
Blockly.Msg['ACTUATORS_TURN_LEFT_90_DEGREES_TITLE'] = 'turn left 90°';
Blockly.Msg['ACTUATORS_TURN_LEFT_90_DEGREES_TOOLTIP'] = 'Allows the Lego Spike robot to turn left by 90°.';
Blockly.Msg['ACTUATORS_TURN_RIGHT_45_DEGREES_TITLE'] = 'turn right 45°';
Blockly.Msg['ACTUATORS_TURN_RIGHT_45_DEGREES_TOOLTIP'] = 'Allows the Lego Spike robot to turn right by 45°.';
Blockly.Msg['ACTUATORS_TURN_RIGHT_90_DEGREES_TITLE'] = 'turn right 90°';
Blockly.Msg['ACTUATORS_TURN_RIGHT_90_DEGREES_TOOLTIP'] = 'Allows the Lego Spike robot to turn right by 90°.';

// Sensors
Blockly.Msg['SENSORS_COLOR_TITLE'] = '%1 detected color';
Blockly.Msg['SENSORS_COLOR_TOOLTIP'] = 'Returns the detected color as a string (Black, Violet, Purple, Blue, Azure, Turquoise, Green, Yellow, Orange, Red, White).';
Blockly.Msg['SENSORS_COLOR_DETECTION_TITLE'] = '%1 detected color is %2';
Blockly.Msg['SENSORS_COLOR_DETECTION_TOOLTIP'] = 'Returns true if the detected color matches the specified one.';

// Search keywords of the blocks: <X>_KEYWORDS completes the block whose tooltip is <X>_TOOLTIP (see ToolboxManager)
Blockly.Msg["DISPLAY_SHOW_LEDS_KEYWORDS"] = "lighting, light, illuminate";
Blockly.Msg["DISPLAY_SET_PIXEL_KEYWORDS"] = "pixel";
Blockly.Msg["DISPLAY_SET_INTENSITY_KEYWORDS"] = "illuminate, intensity";
Blockly.Msg["ACTUATORS_START_MOTOR_CONTINUOUS_KEYWORDS"] = "motor, start, continuous";
Blockly.Msg["ACTUATORS_START_MOTOR_FOR_TIME_KEYWORDS"] = "motor, duration, start";
Blockly.Msg["ACTUATORS_MOVE_MOTOR_TO_POSITION_KEYWORDS"] = "motor, position, angle";
Blockly.Msg["ACTUATORS_STOP_MOTOR_KEYWORDS"] = "halt";
Blockly.Msg["ACTUATORS_MOVE_MOTORS_BY_DEGREES_KEYWORDS"] = "motors, degrees, rotate";
Blockly.Msg['COMMUNICATION_SPEECH_SYNTHESIS_SAY_KEYWORDS'] = 'voice, speech';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_KEYWORDS'] = 'console, transmit, send';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_KEYWORDS'] = 'chart, visualize';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_KEYWORDS'] = 'write, output, console';
Blockly.Msg['IO_WAIT_KEYWORDS'] = 'delay, wait';
Blockly.Msg['IO_WAIT_UNTIL_KEYWORDS'] = 'wait, pause';
Blockly.Msg['IO_INITCHRONOMETER_KEYWORDS'] = 'stopwatch, timer, elapsed';
Blockly.Msg['IO_GETCHRONOMETER_KEYWORDS'] = 'stopwatch, timer, elapsed';
Blockly.Msg['ACTUATORS_MOVE_FORWARD_KEYWORDS'] = 'forward, advance';
Blockly.Msg['ACTUATORS_MOVE_BACKWARD_KEYWORDS'] = 'backward, reverse';
Blockly.Msg['ACTUATORS_TURN_LEFT_45_DEGREES_KEYWORDS'] = 'pivot, rotation';
Blockly.Msg['ACTUATORS_TURN_LEFT_90_DEGREES_KEYWORDS'] = 'pivot, rotation';
Blockly.Msg['ACTUATORS_TURN_RIGHT_45_DEGREES_KEYWORDS'] = 'pivot, rotation';
Blockly.Msg['ACTUATORS_TURN_RIGHT_90_DEGREES_KEYWORDS'] = 'pivot, rotation';
Blockly.Msg['SENSORS_COLOR_KEYWORDS'] = 'color, sensor, read';
Blockly.Msg['SENSORS_COLOR_DETECTION_KEYWORDS'] = 'color, detect, compare';
