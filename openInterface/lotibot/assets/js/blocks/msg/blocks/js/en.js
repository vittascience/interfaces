/**
 * @fileoverview English messages for Loti-bot. (EN)
 */

'use strict';

// Display
Blockly.Msg['DISPLAY_SET_LEDS_RGB_TITLE'] = '[LEDs] R %1 G %2 B %3';
Blockly.Msg['DISPLAY_SET_LEDS_RGB_TOOLTIP'] = 'Change the color of the LEDs on the Loti-bot in RGB format.';
Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TITLE'] = '[LEDs] %1';
Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TOOLTIP'] = 'Change the color of the LEDs on the Loti-bot using a color palette.';
Blockly.Msg['DISPLAY_SET_LED_RGB_TITLE'] = '[LEDs] left R %1 G %2 B %3 right R %4 G %5 B %6';
Blockly.Msg['DISPLAY_SET_LED_RGB_TOOLTIP'] = 'Change the color of the left and right LEDs in RGB format on the Loti-bot robot.';
Blockly.Msg['DISPLAY_SET_LED_PALETTE_TITLE'] = '[LEDs] left %1 right %2';
Blockly.Msg['DISPLAY_SET_LED_PALETTE_TOOLTIP'] = Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TOOLTIP'];
Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TITLE'] = '[Headlights] power %1';
Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TOOLTIP'] = 'Set the power of the Loti-bot\'s headlights (between 0 and 255).';
Blockly.Msg['DISPLAY_SET_HEADLIGHT_TITLE'] = '[Headlights] left power %1 right power %2';
Blockly.Msg['DISPLAY_SET_HEADLIGHT_TOOLTIP'] = Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TOOLTIP'];

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

// Communication
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'write to console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Allows writing data to the serial port.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'with';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'new line(s)';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'plot graph';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'This block allows you to write data (numeric) that will be visible in the plotter. It can be used with one or more blocks in the "Name" and "Data" format. To view the graphs, click on the `\'Graph Mode\' icon in the console.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Data';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Name %1 Value %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'This block is to be used with the "Plot Graph" block. It must contain the name of the value to display (text), and the actual value (number).';

// Sensors
Blockly.Msg["SENSORS_IS_STOPPED_TITLE"] = "is stopped?";
Blockly.Msg["SENSORS_IS_STOPPED_TOOLTIP"] = "Returns true if the Lotibot is stopped.";
Blockly.Msg["SENSORS_IS_MOVING_TITLE"] = "is moving?";
Blockly.Msg["SENSORS_IS_MOVING_TOOLTIP"] = "Returns true if the Lotibot is moving.";
Blockly.Msg["SENSORS_IS_COLLISION_DETECTED_TITLE"] = "collision detected?";
Blockly.Msg["SENSORS_IS_COLLISION_DETECTED_TOOLTIP"] = "Returns true if a collision is detected by the Lotibot.";
Blockly.Msg["SENSORS_IS_FALL_DETECTED_TITLE"] = "fall detected?";
Blockly.Msg["SENSORS_IS_FALL_DETECTED_TOOLTIP"] = "Returns true if a fall is detected by the Lotibot.";
Blockly.Msg["SENSORS_IS_SPEAKER_WORKING_TITLE"] = "speaker working?";
Blockly.Msg["SENSORS_IS_SPEAKER_WORKING_TOOLTIP"] = "Returns true if the speaker of the Lotibot is functioning correctly.";
Blockly.Msg["SENSORS_IS_HEADLIGHTS_WORKING_TITLE"] = "headlights on?";
Blockly.Msg["SENSORS_IS_HEADLIGHTS_WORKING_TOOLTIP"] = "Returns true if the headlights of the Lotibot are functioning correctly.";
Blockly.Msg["SENSORS_GET_HEADING_TITLE"] = "heading";
Blockly.Msg["SENSORS_GET_HEADING_TOOLTIP"] = "Returns the current heading of the Lotibot from 1 to 8 (1: NORTH, 3: EAST, 5: SOUTH, 7: WEST).";
Blockly.Msg["SENSORS_GET_DISTANCE_TITLE"] = "distance";
Blockly.Msg["SENSORS_GET_DISTANCE_TOOLTIP"] = "Returns the distance detected by the distance sensor of the Lotibot.";
Blockly.Msg["SENSORS_GET_LIGHT_LEVEL_TITLE"] = "ambient light level";
Blockly.Msg["SENSORS_GET_LIGHT_LEVEL_TOOLTIP"] = "Returns the level of light detected by the light sensor of the Lotibot.";
Blockly.Msg["SENSORS_GET_SOUND_LEVEL_TITLE"] = "ambient sound level";
Blockly.Msg["SENSORS_GET_SOUND_LEVEL_TOOLTIP"] = "Returns the level of sound detected by the sound sensor of the Lotibot.";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TITLE"] = "temperature";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TOOLTIP"] = "Returns the temperature detected by the temperature sensor of the Lotibot.";
Blockly.Msg["SENSORS_GET_BATTERY_LEVEL_TITLE"] = "battery level";
Blockly.Msg["SENSORS_GET_BATTERY_LEVEL_TOOLTIP"] = "Returns the current battery level of the Lotibot in percentage.";

// Actuators
Blockly.Msg['ACTUATORS_SET_MOTORS_TITLE'] = '%1 by %2 cm speed %3';
Blockly.Msg['ACTUATORS_SET_MOTORS_TOOLTIP'] = 'Allows the Loti-bot to move forward or backward at a certain speed (slow, medium, or fast).';
Blockly.Msg['ACTUATORS_ROTATE_WITH_ANGLE_TITLE'] = 'rotate %1 by %2 ° speed %3';
Blockly.Msg['ACTUATORS_ROTATE_WITH_ANGLE_TOOLTIP'] = 'Allows the Loti-bot to rotate by X° at a certain speed (slow, medium, or fast).';
Blockly.Msg['ACTUATORS_DRAW_SQUARE_TITLE'] = 'draw a square with a side of %1 cm';
Blockly.Msg['ACTUATORS_DRAW_SQUARE_TOOLTIP'] = 'Allows the Loti-bot robot to move by forming a square.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'stop motors';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Allows the motors of the Loti-bot to be stopped.';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TITLE'] = 'play sound no.%1';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TOOLTIP'] = 'Allows playing a sound between 1 and 20.';
Blockly.Msg['ACTUATORS_GO_FORWARD'] = "forward";
Blockly.Msg['ACTUATORS_GO_BACKWARD'] = "backward";
Blockly.Msg["ACTUATORS_SLOW"] = "slow";
Blockly.Msg["ACTUATORS_MEDIUM"] = "medium";
Blockly.Msg["ACTUATORS_FAST"] = "fast";