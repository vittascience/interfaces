/**
 * @fileoverview English messages for Winky. (EN)
 */

'use strict';

// Network
Blockly.Msg['NETWORK_CONNECT_TITLE'] = '[Winky] connect %1';
Blockly.Msg['NETWORK_CONNECT_TOOLTIP'] = 'Allows connecting to the Winky robot by specifying its ID.';

// Display
Blockly.Msg['DISPLAY_PATTERN_TITLE'] = '[Winky] display on %1';
Blockly.Msg['DISPLAY_PATTERN_TOOLTIP'] = 'Allows customization of the LED matrix display on the left eye of the Winky robot.';
Blockly.Msg['DISPLAY_PRESET_EACH_EYE_TITLE'] = '[Winky] left eye %1 right eye %2';
Blockly.Msg['DISPLAY_PRESET_TITLE'] = '[Winky] gaze %1 on %2';
Blockly.Msg['DISPLAY_PRESET_TOOLTIP'] = 'Allows displaying a pattern on the LED matrices of the Winky robot.';
Blockly.Msg['DISPLAY_PRESET_AMUSED'] = 'amused';
Blockly.Msg['DISPLAY_PRESET_ANGRY'] = 'angry';
Blockly.Msg['DISPLAY_PRESET_BIG'] = 'big';
Blockly.Msg['DISPLAY_PRESET_BORED'] = 'bored';
Blockly.Msg['DISPLAY_PRESET_SAD'] = 'sad';
Blockly.Msg['DISPLAY_PRESET_HAPPY'] = 'happy';
Blockly.Msg['DISPLAY_PRESET_TIRED'] = 'tired';
Blockly.Msg['DISPLAY_PRESET_SLEEP'] = 'asleep';
Blockly.Msg['DISPLAY_PRESET_INLOVE'] = 'in love';
Blockly.Msg['DISPLAY_PRESET_QUESTION'] = 'questioning';
Blockly.Msg['DISPLAY_PRESET_HOT'] = 'hot';
Blockly.Msg['DISPLAY_PRESET_COLD'] = 'cold';
Blockly.Msg['DISPLAY_PRESET_BOTH'] = 'both eyes';
Blockly.Msg['DISPLAY_PRESET_LEFT'] = 'left eye';
Blockly.Msg['DISPLAY_PRESET_RIGHT'] = 'right eye';
Blockly.Msg['DISPLAY_PRESET_RANDOM'] = 'random choice';
Blockly.Msg['DISPLAY_PRESET_HORIZONTAL'] = "both eyes (horizontal transformation)";
Blockly.Msg['DISPLAY_PRESET_VERTICAL'] = "both eyes (vertical transformation)";
Blockly.Msg['DISPLAY_PRESET_ROTATION_90'] = "both eyes (90° rotation)";
Blockly.Msg['DISPLAY_PRESET_ROTATION_180'] = "both eyes (180° rotation)";
Blockly.Msg['DISPLAY_PRESET_ROTATION_270'] = "both eyes (270° rotation)";
Blockly.Msg['DISPLAY_NUMBER_TITLE'] = '[Winky] display %1';
Blockly.Msg['DISPLAY_NUMBER_TOOLTIP'] = 'Allows displaying a number between -999 and 9999 on the LED matrices of the Winky robot.';
Blockly.Msg['DISPLAY_TEXT_TITLE'] = '[Winky] display %1 direction %2 transition %3';
Blockly.Msg['DISPLAY_TEXT_TOOLTIP'] = 'Allows displaying text (up to 16 characters) on the LED matrices of the Winky robot.';
Blockly.Msg['DISPLAY_TEXT_RIGHT'] = "right";
Blockly.Msg['DISPLAY_TEXT_LEFT'] = "left";
Blockly.Msg['DISPLAY_TEXT_REPLACEMENT_1S'] = "replacement (1s)";
Blockly.Msg['DISPLAY_TEXT_REPLACEMENT_800MS'] = "replacement (800ms)";
Blockly.Msg['DISPLAY_TEXT_REPLACEMENT_500MS'] = "replacement (500ms)";
Blockly.Msg['DISPLAY_TEXT_REPLACEMENT_200MS'] = "replacement (200ms)";
Blockly.Msg['DISPLAY_TEXT_SCROLL_500MS'] = "scrolling (500ms)";
Blockly.Msg['DISPLAY_TEXT_SCROLL_400MS'] = "scrolling (400ms)";
Blockly.Msg['DISPLAY_TEXT_SCROLL_300MS'] = "scrolling (300ms)";
Blockly.Msg['DISPLAY_TEXT_SCROLL_200MS'] = "scrolling (200ms)";
Blockly.Msg['DISPLAY_CLEAR_EYES_TITLE'] = "[Winky] turn off eye LEDs";
Blockly.Msg['DISPLAY_CLEAR_EYES_TOOLTIP'] = "Turns off the eye LEDs of the Winky robot.";

// Sounds
Blockly.Msg['SOUNDS_SET_VOLUME_TITLE'] = "[Winky] volume %1 %";
Blockly.Msg['SOUNDS_SET_VOLUME_TOOLTIP'] = "Allows adjusting the volume of the Winky robot.";
Blockly.Msg['SOUNDS_PLAY_SOUND_TITLE'] = "[Winky] play a sound %1";
Blockly.Msg['SOUNDS_PLAY_SOUND_TOOLTIP'] = "Allows playing a pre-recorded sound in the Winky robot.";
Blockly.Msg['SOUNDS_PLAY_SOUND_AMUSED'] = 'amused';
Blockly.Msg['SOUNDS_PLAY_SOUND_ANGRY'] = 'angry';
Blockly.Msg['SOUNDS_PLAY_SOUND_BORED'] = 'bored';
Blockly.Msg['SOUNDS_PLAY_SOUND_SAD'] = 'sad';
Blockly.Msg['SOUNDS_PLAY_SOUND_HAPPY'] = 'happy';
Blockly.Msg['SOUNDS_PLAY_SOUND_TIRED'] = 'tired';
Blockly.Msg['SOUNDS_PLAY_SOUND_SLEEP'] = 'asleep';
Blockly.Msg['SOUNDS_PLAY_SOUND_INLOVE'] = 'in love';
Blockly.Msg['SOUNDS_PLAY_SOUND_QUESTION'] = 'questioning';

// Sensors
Blockly.Msg['SENSORS_GET_GYRO_DIRECTION_TITLE'] = "[Winky] direction on axis %1";
Blockly.Msg['SENSORS_GET_GYRO_DIRECTION_TOOLTIP'] = "Returns the direction according to the x, y, or z axis of the Winky robot.";
Blockly.Msg['SENSORS_GET_GYRO_ANGLE_TITLE'] = "[Winky] angle on axis %1";
Blockly.Msg['SENSORS_GET_GYRO_ANGLE_TOOLTIP'] = "Returns the angle according to the x or y axis of the Winky robot.";
Blockly.Msg['SENSORS_GET_GYRO_X'] = 'x';
Blockly.Msg['SENSORS_GET_GYRO_Y'] = 'y';
Blockly.Msg['SENSORS_GET_GYRO_Z'] = 'z';
Blockly.Msg['SENSORS_GET_PROXIMITY_DETECTION_TITLE'] = "[Winky] obstacle detection %1";
Blockly.Msg['SENSORS_GET_PROXIMITY_DETECTION_TOOLTIP'] = "Returns 2 or 3 if Winky detects something close or far away, and 0 if it detects nothing.";
Blockly.Msg['SENSORS_GET_PROXIMITY_DETECTION_NEAR'] = "close";
Blockly.Msg['SENSORS_GET_PROXIMITY_DETECTION_FAR'] = "far";
Blockly.Msg['SENSORS_GET_PROXIMITY_DETECTION_NOTHING'] = "nothing";
Blockly.Msg['SENSORS_GET_GESTURE_DETECTION_TITLE'] = "[Winky] motion detection %1";
Blockly.Msg['SENSORS_GET_GESTURE_DETECTION_TOOLTIP'] = "Returns 1 or 2 if a movement is detected on the left or right, and 0 if no movement is detected.";
Blockly.Msg['SENSORS_GET_GESTURE_DETECTION_RIGHT'] = "to the right";
Blockly.Msg['SENSORS_GET_GESTURE_DETECTION_LEFT'] = "to the left";
Blockly.Msg['SENSORS_GET_GESTURE_DETECTION_NONE'] = "none";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_TITLE'] = "[Winky] button %1 %2";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_TOOLTIP'] = "Returns the state of a button on the Winky robot.";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_BLUE'] = "blue";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_PURPLE'] = "purple";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_RED'] = "red";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_YELLOW'] = "yellow";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_STATE'] = "state";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_ONPRESS'] = "is pressed";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_ONRELEASE'] = "is released";

// Actuators
Blockly.Msg['ACTUATORS_SET_NECK_POSITION_TITLE'] = '[Winky] rotate head to %1 °';
Blockly.Msg['ACTUATORS_SET_NECK_POSITION_TOOLTIP'] = 'Allows orienting the head of the Winky robot within a range of 0° to 360°.';
Blockly.Msg['ACTUATORS_SET_NECK_ROTATE_TITLE'] = '[Winky] rotate head by %1 ° speed %2';
Blockly.Msg['ACTUATORS_SET_NECK_ROTATE_TOOLTIP'] = 'Allows rotating the head of the Winky robot by 0° to 360° at a certain speed.';
Blockly.Msg['ACTUATORS_SET_NECK_ROTATE_SLOW'] = 'slow';
Blockly.Msg['ACTUATORS_SET_NECK_ROTATE_NORMAL'] = 'medium';
Blockly.Msg['ACTUATORS_SET_NECK_ROTATE_HIGHT'] = 'fast';
Blockly.Msg['ACTUATORS_SET_NECK_ROTATE_RANDOM'] = 'random';
Blockly.Msg['ACTUATORS_SET_EARS_POSITION_TITLE'] = '[Winky] rotate %1 to %2 °';
Blockly.Msg['ACTUATORS_SET_EARS_POSITION_TOOLTIP'] = 'Allows rotating the ears of the Winky robot (left, right, both at the same time, or randomly).';
Blockly.Msg['ACTUATORS_SET_EARS_POSITION_LEFT'] = 'left ear';
Blockly.Msg['ACTUATORS_SET_EARS_POSITION_RIGHT'] = 'right ear';
Blockly.Msg['ACTUATORS_SET_EARS_POSITION_BOTH'] = 'both ears';
Blockly.Msg['ACTUATORS_SET_EARS_POSITION_RANDOM'] = 'ears randomly';
Blockly.Msg['ACTUATORS_SET_EARS_REAR_TITLE'] = '[Winky] set %1 to rear position';
Blockly.Msg['ACTUATORS_SET_EARS_REAR_TOOLTIP'] = 'Sets Winky robot\'s ears to the rear position.';
Blockly.Msg['ACTUATORS_SET_EARS_DOWN_TITLE'] = '[Winky] set %1 to down position';
Blockly.Msg['ACTUATORS_SET_EARS_DOWN_TOOLTIP'] = 'Sets Winky robot\'s ears to the down position.';
Blockly.Msg['ACTUATORS_SET_EARS_STANDING_TITLE'] = '[Winky] set %1 to standing position';
Blockly.Msg['ACTUATORS_SET_EARS_STANDING_TOOLTIP'] = 'Sets Winky robot\'s ears to the standing position.';

// Communication
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'write to console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Allows writing data to the console.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'with';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'line breaks';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'plot the graph';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'This block allows writing numerical data to be displayed in the tracer. It can be used with one or more blocks in the "Name" and "Data" format. To view the graphs, click on the \'Graphical Mode\' icon in the console.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Data';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Name %1 Value %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'This block is to be used with the "Plot the graph" block. It must contain the name of the value to be displayed (text) and the value itself (number).';
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