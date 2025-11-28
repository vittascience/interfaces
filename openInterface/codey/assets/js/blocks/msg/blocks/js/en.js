/**
 * @fileoverview English messages for Codey. (EN)
 */

'use strict';

// Display
Blockly.Msg['DISPLAY_SHOWRGB_TITLE'] = '[Built-in LED] R %1 G %2 B %3';
Blockly.Msg['DISPLAY_SHOWRGB_TOOLTIP'] = 'Displays the specified color on Codey\'s built-in LED in RGB format (0 ~ 255).';
Blockly.Msg['DISPLAY_SETRED_TITLE'] = '[Built-in LED] red intensity %1';
Blockly.Msg['DISPLAY_SETRED_TOOLTIP'] = 'Sets the red intensity of Codey\'s built-in LED (0 ~ 255).';
Blockly.Msg['DISPLAY_SETGREEN_TITLE'] = '[Built-in LED] green intensity %1';
Blockly.Msg['DISPLAY_SETGREEN_TOOLTIP'] = 'Sets the green intensity of Codey\'s built-in LED (0 ~ 255).';
Blockly.Msg['DISPLAY_SETBLUE_TITLE'] = '[Built-in LED] blue intensity %1';
Blockly.Msg['DISPLAY_SETBLUE_TOOLTIP'] = 'Sets the blue intensity of Codey\'s built-in LED (0 ~ 255).';
Blockly.Msg['DISPLAY_OFF_TITLE'] = '[Built-in LED] turn off';
Blockly.Msg['DISPLAY_OFF_TOOLTIP'] = 'Turns off Codey\'s built-in LED.';
Blockly.Msg['DISPLAY_SHOW_TITLE'] = '[Matrix] display %1';
Blockly.Msg['DISPLAY_SHOW_TOOLTIP'] = 'Displays the specified text on Codey\'s LED matrix.';
Blockly.Msg['DISPLAY_SETPIXEL_TITLE'] = '[Matrix] pixel X %1 Y %2 state %3';
Blockly.Msg['DISPLAY_SETPIXEL_TOOLTIP'] = 'Sets the pixel state at position X and Y on Codey\'s LED matrix.';
Blockly.Msg['DISPLAY_GETPIXEL_TITLE'] = '[Matrix] pixel state X %1 Y %2';
Blockly.Msg['DISPLAY_GETPIXEL_TOOLTIP'] = 'Returns the pixel state at position X and Y on Codey\'s LED matrix.';
Blockly.Msg['DISPLAY_TOGGLEPIXEL_TITLE'] = '[Matrix] toggle pixel X %1 Y %2';
Blockly.Msg['DISPLAY_TOGGLEPIXEL_TOOLTIP'] = 'Toggles the pixel state at position X and Y on Codey\'s LED matrix.';
Blockly.Msg['DISPLAY_CLEAR_TITLE'] = '[Matrix] clear';
Blockly.Msg['DISPLAY_CLEAR_TOOLTIP'] = 'Clears the LED matrix on Codey.';
// IO
Blockly.Msg['IO_DIGITAL_SIGNAL_TITLE'] = '%1';
Blockly.Msg['IO_DIGITAL_SIGNAL_HIGH'] = 'HIGH (1)';
Blockly.Msg['IO_DIGITAL_SIGNAL_LOW'] = 'LOW (0)';
Blockly.Msg['IO_DIGITAL_SIGNAL_TOOLTIP'] = 'Returns a boolean value (1 if HIGH or 0 if LOW).';
// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'wait %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Stop the code execution (duration in seconds or milliseconds).';
Blockly.Msg['IO_WAIT_SECOND'] = 'second(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisecond(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsecond(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'wait until %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Stop the code execution until the satisfied condition.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'initialize the chronometer';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Allows you to initialize the chronometer (in seconds).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'get chronometer in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Returns the chronometer value from the initialization in seconds or milliseconds.';
Blockly.Msg['IO_ONBUTTONPRESSED_TITLE'] = 'if button %1 is pressed then';
Blockly.Msg['IO_ONBUTTONPRESSED_TOOLTIP'] = 'Executes instructions if button A, B, or C is pressed.';
Blockly.Msg['IO_BUTTON_STATE_TITLE'] = 'button %1 state';
Blockly.Msg['IO_BUTTON_STATE_TOOLTIP'] = 'Returns the state of button A, B, or C (true/false).';
Blockly.Msg['IO_POTENTIOMETER_GET_VALUE_TITLE'] = 'potentiometer value';
Blockly.Msg['IO_POTENTIOMETER_GET_VALUE_TOOLTIP'] = 'Returns the potentiometer value (0 ~ 100).';

// Communication 
Blockly.Msg['COMMUNICATION_IRRECEIVE_TITLE'] = '[IR] infrared receive';
Blockly.Msg['COMMUNICATION_IRRECEIVE_TOOLTIP'] = 'Returns the string received by the IR receiver. Data sent by the IR emitter must end with \\n. For NEC remote control protocol, use receive_remote_code().';
Blockly.Msg['COMMUNICATION_IRRECEIVEREMOTECODE_TITLE'] = '[IR] infrared receive (NEC)';
Blockly.Msg['COMMUNICATION_IRRECEIVEREMOTECODE_TOOLTIP'] = 'Returns the code of the last infrared signal received as an array. The first element is the address, the second is the content.';
Blockly.Msg['COMMUNICATION_IRSEND_TITLE'] = '[IR] send %1';
Blockly.Msg['COMMUNICATION_IRSEND_TOOLTIP'] = 'Sends a string via infrared.';
Blockly.Msg['COMMUNICATION_IRSTARTLEARNING_TITLE'] = '[IR] start learning';
Blockly.Msg['COMMUNICATION_IRSTARTLEARNING_TOOLTIP'] = 'Starts learning an infrared signal. Only compatible with NEC remote controls.';
Blockly.Msg['COMMUNICATION_IRSTOPLEARNING_TITLE'] = '[IR] stop learning';
Blockly.Msg['COMMUNICATION_IRSTOPLEARNING_TOOLTIP'] = 'Stops learning an infrared signal.';
Blockly.Msg['COMMUNICATION_IRSAVELEARNEDRESULT_TITLE'] = '[IR] save learned signal at index %1';
Blockly.Msg['COMMUNICATION_IRSAVELEARNEDRESULT_TOOLTIP'] = 'Saves the learned infrared signal in Codey\'s memory (index 0 to 15).';
Blockly.Msg['COMMUNICATION_IRSENDLEARNEDRESULT_TITLE'] = '[IR] send signal at index %1';
Blockly.Msg['COMMUNICATION_IRSENDLEARNEDRESULT_TOOLTIP'] = 'Sends the learned infrared signal from Codey\'s memory.';
Blockly.Msg['COMMUNICATION_IRLEARN_TITLE'] = '[IR] learn for %1 s';
Blockly.Msg['COMMUNICATION_IRLEARN_TOOLTIP'] = 'Learns an infrared signal for the specified duration (in seconds).';

// Sensors 
Blockly.Msg['SENSORS_GETROTATION_EULER_ANGLES_TITLE'] = '%1';
Blockly.Msg['SENSORS_GETROTATION_EULER_ANGLES_TOOLTIP'] = 'Returns the rotation value along the selected axis (x, y, z).';
Blockly.Msg['SENSORS_PITCH'] = "pitch";
Blockly.Msg['SENSORS_ROLL'] = "roll";
Blockly.Msg['SENSORS_YAW'] = "yaw";
Blockly.Msg['SENSORS_GETROTATION_TITLE'] = "angle on axis %1";
Blockly.Msg['SENSORS_GETROTATION_TOOLTIP'] = "Returns Codey’s rotation angle on the three axes. Counterclockwise is positive.";
Blockly.Msg['SENSORS_RESETROTATION_TITLE'] = "reset rotation angle on axis %1";
Blockly.Msg['SENSORS_RESETROTATION_TOOLTIP'] = "Resets Codey’s rotation angle to 0 on the selected axis.";
Blockly.Msg['SENSORS_ALL_AXIS'] = "all axes";
Blockly.Msg['SENSORS_IS_SHAKED_TITLE'] = "shaken?";
Blockly.Msg['SENSORS_IS_SHAKED_TOOLTIP'] = "Returns true if a shake is detected.";
Blockly.Msg['SENSORS_GET_SHAKE_STRENGTH_TITLE'] = "shake intensity";
Blockly.Msg['SENSORS_GET_SHAKE_STRENGTH_TOOLTIP'] = "Returns the intensity of the last detected shake.";
Blockly.Msg['SENSORS_GETPOSITION_TITLE'] = "%1?";
Blockly.Msg['SENSORS_IS_TILTED_LEFT'] = "tilted left";
Blockly.Msg['SENSORS_IS_TILTED_RIGHT'] = "tilted right";
Blockly.Msg['SENSORS_IS_EARS_UP'] = "ears up";
Blockly.Msg['SENSORS_IS_EARS_DOWN'] = "ears down";
Blockly.Msg['SENSORS_IS_DISPLAY_UP'] = "display up";
Blockly.Msg['SENSORS_IS_DISPLAY_DOWN'] = "display down";
Blockly.Msg['SENSORS_IS_UPRIGHT'] = "upright";
Blockly.Msg['SENSORS_GETPOSITION_TOOLTIP'] = "Returns true if the device is in the specified position.";
Blockly.Msg['SENSORS_GETACCELERATION_TITLE'] = "acceleration on %1";
Blockly.Msg['SENSORS_GETACCELERATION_TOOLTIP'] = "Returns acceleration value on the selected axis or total force.";
Blockly.Msg['SENSORS_GETGYROSCOPE_TITLE'] = "gyroscope on axis %1";
Blockly.Msg['SENSORS_GETGYROSCOPE_TOOLTIP'] = "Returns gyroscope value on the selected axis.";
Blockly.Msg['SENSORS_GET_LOUDNESS_TITLE'] = 'sound level';
Blockly.Msg['SENSORS_GET_LOUDNESS_TOOLTIP'] = 'Returns the sound level (0 ~ 100).';
Blockly.Msg['SENSORS_GET_LIGHT_TITLE'] = 'light sensor value';
Blockly.Msg['SENSORS_GET_LIGHT_TOOLTIP'] = 'Returns the light sensor value (0 ~ 100).';

// Actuators
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_TITLE'] = "play sound %1";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_TOOLTIP'] = "Plays a predefined melody.";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_UNTIL_DONE_TITLE'] = "play sound %1 until done";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_UNTIL_DONE_TOOLTIP'] = "Plays a predefined melody and waits until it finishes.";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_NOTE_TITLE'] = "play note %1";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_NOTE_TOOLTIP'] = "Plays a musical note.";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_TITLE'] = "play tone %1 Hz";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_TOOLTIP'] = "Plays a tone of a specific frequency.";
Blockly.Msg['ACTUATORS_AUDIO_REST_TITLE'] = "pause for %1 beat(s)";
Blockly.Msg['ACTUATORS_AUDIO_REST_TOOLTIP'] = "Inserts a pause in the music.";
Blockly.Msg['ACTUATORS_AUDIO_STOP_SOUNDS_TITLE'] = "stop all sounds";
Blockly.Msg['ACTUATORS_AUDIO_STOP_SOUNDS_TOOLTIP'] = "Stops all currently playing sounds.";
Blockly.Msg['ACTUATORS_AUDIO_SET_VOLUME_TITLE'] = "set volume to %1";
Blockly.Msg['ACTUATORS_AUDIO_SET_VOLUME_TOOLTIP'] = "Sets the audio volume.";
Blockly.Msg['ACTUATORS_AUDIO_GET_VOLUME_TITLE'] = "get volume";
Blockly.Msg['ACTUATORS_AUDIO_GET_VOLUME_TOOLTIP'] = "Returns the current volume.";
Blockly.Msg['ACTUATORS_AUDIO_SET_TEMPO_TITLE'] = "set tempo to %1";
Blockly.Msg['ACTUATORS_AUDIO_SET_TEMPO_TOOLTIP'] = "Sets the tempo for the sounds.";
Blockly.Msg['ACTUATORS_AUDIO_GET_TEMPO_TITLE'] = "get tempo";
Blockly.Msg['ACTUATORS_AUDIO_GET_TEMPO_TOOLTIP'] = "Returns the current tempo.";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_DURATION'] = "for";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_NOTE_DURATION'] = Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_DURATION'];

// Robots
Blockly.Msg['ROBOTS_STOP_TITLE'] = '[Rocky] stop motors';
Blockly.Msg['ROBOTS_STOP_TOOLTIP'] = 'Stops all Rocky robot motors.';
Blockly.Msg['ROBOTS_MOVE_TITLE'] = '[Rocky] %1 at speed %2';
Blockly.Msg['ROBOTS_MOVE_TOOLTIP'] = 'Moves the Rocky robot in the specified direction at the given speed (+/- 100).';
Blockly.Msg['ROBOTS_FORWARD'] = 'forward';
Blockly.Msg['ROBOTS_BACKWARD'] = 'backward';
Blockly.Msg['ROBOTS_LEFT'] = 'turn left';
Blockly.Msg['ROBOTS_RIGHT'] = 'turn right';
Blockly.Msg['ROBOTS_DRIVE_TITLE'] = '[Rocky] left motor speed %1 right motor speed %2';
Blockly.Msg['ROBOTS_DRIVE_TOOLTIP'] = 'Sets the speed of the left and right motors of the Rocky robot (+/- 100).';
Blockly.Msg['ROBOTS_TURN_BY_DEGREE_TITLE'] = '[Rocky] %1 by %2 °';
Blockly.Msg['ROBOTS_TURN_BY_DEGREE_TOOLTIP'] = 'Turns the Rocky robot by a certain number of degrees (+/- 360).';
Blockly.Msg['ROBOTS_SENSORS_GET_RGB_TITLE'] = '[Rocky] color sensor level of %1';
Blockly.Msg['ROBOTS_SENSORS_RED'] = 'red';
Blockly.Msg['ROBOTS_SENSORS_GREEN'] = 'green';
Blockly.Msg['ROBOTS_SENSORS_BLUE'] = 'blue';
Blockly.Msg['ROBOTS_SENSORS_GET_RGB_TOOLTIP'] = 'Returns the IR color sensor value for the selected color (red, green, blue).';
Blockly.Msg['ROBOTS_SENSORS_IS_COLOR_TITLE'] = '[Rocky] color %1?';
Blockly.Msg['ROBOTS_SENSORS_IS_COLOR_TOOLTIP'] = 'Returns true if the IR color sensor detects the specified color (red, green, blue, yellow, cyan, magenta, white, black).';
Blockly.Msg['ROBOTS_SENSORS_YELLOW'] = 'yellow';
Blockly.Msg['ROBOTS_SENSORS_CYAN'] = 'cyan';
Blockly.Msg['ROBOTS_SENSORS_MAGENTA'] = 'magenta';
Blockly.Msg['ROBOTS_SENSORS_WHITE'] = 'white';
Blockly.Msg['ROBOTS_SENSORS_BLACK'] = 'black';
Blockly.Msg['ROBOTS_SENSORS_GET_LIGHT_TITLE'] = '[Rocky] light sensor level of %1';
Blockly.Msg['ROBOTS_SENSORS_AMBIENT'] = 'ambient light';
Blockly.Msg['ROBOTS_SENSORS_REFLECTED'] = 'reflected light';
Blockly.Msg['ROBOTS_SENSORS_GREYNESS'] = 'greyness';
Blockly.Msg['ROBOTS_SENSORS_GET_LIGHT_TOOLTIP'] = 'Returns the IR light sensor value for the selected type (ambient, reflected, greyness).';
Blockly.Msg['ROBOTS_SENSORS_IS_OBSTACLE_AHEAD_TITLE'] = '[Rocky] obstacle ahead?';
Blockly.Msg['ROBOTS_SENSORS_IS_OBSTACLE_AHEAD_TOOLTIP'] = 'Returns true if an obstacle is detected in front of the Rocky robot.';
Blockly.Msg['ROBOTS_SENSORS_SET_LED_COLOR_TITLE'] = '[Rocky] LED color %1';
Blockly.Msg['ROBOTS_SENSORS_SET_LED_COLOR_TOOLTIP'] = 'Sets the LED color of the Rocky robot (red, green, blue, yellow, cyan, magenta, white, black).';
