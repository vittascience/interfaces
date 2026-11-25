/**
 * @fileoverview English messages for Matatalab. (EN)
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

// Actuators
Blockly.Msg['ACTUATORS_MOVE_TITLE'] = '%1 %2 steps';
Blockly.Msg['ACTUATORS_MOVE_TOOLTIP'] = 'Moves the MatataBot robot by a number of steps (1 step = 10 cm).';
Blockly.Msg['ACTUATORS_MOVE_CM_TITLE'] = 'move %1 cm';
Blockly.Msg['ACTUATORS_MOVE_CM_TOOLTIP'] = 'Moves the MatataBot robot by a distance in cm. A negative value makes it go backward.';
Blockly.Msg['ACTUATORS_TURN_TITLE'] = 'turn %1 by %2 °';
Blockly.Msg['ACTUATORS_TURN_TOOLTIP'] = 'Turns the MatataBot robot on the spot.';
Blockly.Msg['ACTUATORS_SET_GEAR_TITLE'] = 'set %1 to gear %2';
Blockly.Msg['ACTUATORS_SET_GEAR_TOOLTIP'] = 'Runs one or both wheels, from gear -6 (backward) to 6 (forward). 0 stops the wheel.';
Blockly.Msg['ACTUATORS_SET_SPEED_TITLE'] = 'set wheels speed: left %1 right %2 (cm/s)';
Blockly.Msg['ACTUATORS_SET_SPEED_TOOLTIP'] = 'Sets the speed of both wheels, between -16 and 16 cm/s. A negative value runs the wheel backward.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'stop %1';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Stops one or both wheels.';
Blockly.Msg['ACTUATORS_DANCE_TITLE'] = 'do dance n°%1';
Blockly.Msg['ACTUATORS_DANCE_TOOLTIP'] = 'The MatataBot robot does a dance, from 1 to 6.';
Blockly.Msg['ACTUATORS_ACTION_TITLE'] = 'do action n°%1';
Blockly.Msg['ACTUATORS_ACTION_TOOLTIP'] = 'The MatataBot robot does an action, from 1 to 6.';

// Sound
Blockly.Msg['SOUND_PLAY_NOTE_TITLE'] = 'play note %1 for %2 ms';
Blockly.Msg['SOUND_PLAY_NOTE_TOOLTIP'] = 'Plays a note on the MatataBot robot for a duration in milliseconds.';
Blockly.Msg['SOUND_PLAY_MELODY_TITLE'] = 'play melody n°%1';
Blockly.Msg['SOUND_PLAY_MELODY_TOOLTIP'] = 'Plays a melody of the MatataBot robot, from 1 to 10.';
Blockly.Msg['SOUND_PLAY_MUSIC_TITLE'] = 'play song n°%1';
Blockly.Msg['SOUND_PLAY_MUSIC_TOOLTIP'] = 'Plays a song of the MatataBot robot, from 1 to 6.';

// Display
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TITLE'] = 'light %1 in %2 with brightness %3';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TOOLTIP'] = 'Lights the eyes of the MatataBot robot with a brightness from 0 to 6.';
Blockly.Msg['DISPLAY_SET_EYES_TITLE'] = 'light %1 with colour %2';
Blockly.Msg['DISPLAY_SET_EYES_TOOLTIP'] = 'Lights the eyes of the MatataBot robot with a chosen colour.';
Blockly.Msg['DISPLAY_CLEAR_EYES_TITLE'] = 'turn off the eyes';
Blockly.Msg['DISPLAY_CLEAR_EYES_TOOLTIP'] = 'Turns off the eyes of the MatataBot robot.';

// Communication
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'write to console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Writes data to the serial port.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'with';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'newline(s)';

// MatataCon
Blockly.Msg['MATATACON_IS_BUTTON_TITLE'] = 'button %1 pressed';
Blockly.Msg['MATATACON_IS_BUTTON_TOOLTIP'] = 'Returns True if the button of the MatataCon controller is pressed.';
Blockly.Msg['MATATACON_IS_GESTURE_TITLE'] = 'controller %1';
Blockly.Msg['MATATACON_IS_GESTURE_TOOLTIP'] = 'Returns True if this motion of the MatataCon controller is detected.';
Blockly.Msg['MATATACON_IS_COLOR_TITLE'] = 'colour %1 detected';
Blockly.Msg['MATATACON_IS_COLOR_TOOLTIP'] = 'Returns True if the colour sensor of the MatataCon controller detects this colour.';
Blockly.Msg['MATATACON_IS_SOUND_TITLE'] = 'sound detected';
Blockly.Msg['MATATACON_IS_SOUND_TOOLTIP'] = 'Returns True if the MatataCon controller detects a sound.';
Blockly.Msg['MATATACON_IS_OBSTACLE_TITLE'] = 'obstacle detected';
Blockly.Msg['MATATACON_IS_OBSTACLE_TOOLTIP'] = 'Returns True if the MatataCon controller detects an obstacle.';
Blockly.Msg['MATATACON_IS_LIGHT_TITLE'] = '%1 detected';
Blockly.Msg['MATATACON_IS_LIGHT_TOOLTIP'] = 'Returns True if the MatataCon controller detects the light or the darkness.';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TITLE'] = 'brightness';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TOOLTIP'] = 'Returns the brightness measured by the MatataCon controller, from 0 to 255.';
Blockly.Msg['MATATACON_GET_COLOR_TITLE'] = '%1 value of the colour sensor';
Blockly.Msg['MATATACON_GET_COLOR_TOOLTIP'] = 'Returns the red, green or blue value measured by the MatataCon controller, from 0 to 255.';
Blockly.Msg['MATATACON_GET_ANGLE_TITLE'] = '%1 angle (°)';
Blockly.Msg['MATATACON_GET_ANGLE_TOOLTIP'] = 'Returns the angle of the MatataCon controller, in degrees.';
Blockly.Msg['MATATACON_GET_ACCELERATION_TITLE'] = 'acceleration on axis %1';
Blockly.Msg['MATATACON_GET_ACCELERATION_TOOLTIP'] = 'Returns the acceleration of the MatataCon controller on an axis.';
Blockly.Msg['MATATACON_GET_SHAKING_TITLE'] = 'shaking intensity';
Blockly.Msg['MATATACON_GET_SHAKING_TOOLTIP'] = 'Returns the shaking intensity of the MatataCon controller.';
Blockly.Msg['MATATACON_SET_RING_COLOR_TITLE'] = '[Ring] light LED n°%1 in %2 with brightness %3';
Blockly.Msg['MATATACON_SET_RING_COLOR_TOOLTIP'] = 'Lights an LED of the ring of the MatataCon controller, from 1 to 12, with a brightness from 0 to 6. The number 0 lights all the LEDs.';
Blockly.Msg['MATATACON_SET_RING_TITLE'] = '[Ring] light LED n°%1 with colour %2';
Blockly.Msg['MATATACON_SET_RING_TOOLTIP'] = 'Lights an LED of the ring of the MatataCon controller, from 1 to 12, with a chosen colour. The number 0 lights all the LEDs.';
Blockly.Msg['MATATACON_SET_RING_LEDS_TITLE'] = '[Ring] light the LEDs %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12';
Blockly.Msg['MATATACON_SET_RING_LEDS_TOOLTIP'] = 'Chooses the colour of the 12 LEDs of the ring of the MatataCon controller, from LED n°1 to LED n°12.';
Blockly.Msg['MATATACON_RING_ANIMATION_TITLE'] = '[Ring] start animation %1';
Blockly.Msg['MATATACON_RING_ANIMATION_TOOLTIP'] = 'Starts a light animation on the ring of the MatataCon controller.';
Blockly.Msg['MATATACON_CLEAR_RING_TITLE'] = '[Ring] turn off all the LEDs';
Blockly.Msg['MATATACON_CLEAR_RING_TOOLTIP'] = 'Turns off the ring of the MatataCon controller.';
Blockly.Msg['MATATACON_SEND_MESSAGE_TITLE'] = 'send message n°%1';
Blockly.Msg['MATATACON_SEND_MESSAGE_TOOLTIP'] = 'Sends a message, from 1 to 6, to the other MatataCon controllers.';
Blockly.Msg['MATATACON_IS_MESSAGE_TITLE'] = 'message n°%1 received';
Blockly.Msg['MATATACON_IS_MESSAGE_TOOLTIP'] = 'Returns True if the MatataCon controller received this message, from 1 to 6.';
Blockly.Msg['MATATACON_GET_MESSAGE_TITLE'] = 'received message';
Blockly.Msg['MATATACON_GET_MESSAGE_TOOLTIP'] = 'Returns the number of the message received by the MatataCon controller, or 0 without message.';

// Options
Blockly.Msg['MATATALAB_DIR_FORWARD'] = 'move forward';
Blockly.Msg['MATATALAB_DIR_BACKWARD'] = 'move backward';
Blockly.Msg['MATATALAB_DIR_LEFT'] = 'left';
Blockly.Msg['MATATALAB_DIR_RIGHT'] = 'right';
Blockly.Msg['MATATALAB_WHEEL_BOTH'] = 'both wheels';
Blockly.Msg['MATATALAB_WHEEL_LEFT'] = 'the left wheel';
Blockly.Msg['MATATALAB_WHEEL_RIGHT'] = 'the right wheel';
Blockly.Msg['MATATALAB_EYE_BOTH'] = 'both eyes';
Blockly.Msg['MATATALAB_EYE_LEFT'] = 'the left eye';
Blockly.Msg['MATATALAB_EYE_RIGHT'] = 'the right eye';
Blockly.Msg['MATATALAB_COLOR_WHITE'] = 'white';
Blockly.Msg['MATATALAB_COLOR_RED'] = 'red';
Blockly.Msg['MATATALAB_COLOR_YELLOW'] = 'yellow';
Blockly.Msg['MATATALAB_COLOR_GREEN'] = 'green';
Blockly.Msg['MATATALAB_COLOR_BLUE'] = 'blue';
Blockly.Msg['MATATALAB_COLOR_PURPLE'] = 'purple';
Blockly.Msg['MATATALAB_COLOR_BLACK'] = 'black';
Blockly.Msg['MATATALAB_ANIMATION_SPOONDRIFT'] = 'wave';
Blockly.Msg['MATATALAB_ANIMATION_METEOR'] = 'meteor';
Blockly.Msg['MATATALAB_ANIMATION_RAINBOW'] = 'rainbow';
Blockly.Msg['MATATALAB_ANIMATION_FIREFLY'] = 'firefly';
Blockly.Msg['MATATALAB_ANIMATION_COLORWIPE'] = 'colour wipe';
Blockly.Msg['MATATALAB_ANIMATION_BREATHE'] = 'breathe';
Blockly.Msg['MATATALAB_BUTTON_PLAY'] = 'play';
Blockly.Msg['MATATALAB_BUTTON_DELETE'] = 'delete';
Blockly.Msg['MATATALAB_BUTTON_FORWARD'] = 'forward';
Blockly.Msg['MATATALAB_BUTTON_BACKWARD'] = 'backward';
Blockly.Msg['MATATALAB_BUTTON_LEFT'] = 'left';
Blockly.Msg['MATATALAB_BUTTON_RIGHT'] = 'right';
Blockly.Msg['MATATALAB_BUTTON_MUSIC'] = 'music';
Blockly.Msg['MATATALAB_GESTURE_SHAKE'] = 'shaken';
Blockly.Msg['MATATALAB_GESTURE_TILT_LEFT'] = 'tilted left';
Blockly.Msg['MATATALAB_GESTURE_TILT_RIGHT'] = 'tilted right';
Blockly.Msg['MATATALAB_GESTURE_TILT_FORWARD'] = 'tilted forward';
Blockly.Msg['MATATALAB_GESTURE_TILT_BACKWARD'] = 'tilted backward';
Blockly.Msg['MATATALAB_GESTURE_FALL'] = 'in free fall';
Blockly.Msg['MATATALAB_GESTURE_FACE_UP'] = 'facing up';
Blockly.Msg['MATATALAB_GESTURE_FACE_DOWN'] = 'facing down';
Blockly.Msg['MATATALAB_LIGHT_BRIGHT'] = 'light';
Blockly.Msg['MATATALAB_LIGHT_DARK'] = 'darkness';
Blockly.Msg['MATATALAB_ANGLE_PITCH'] = 'pitch';
Blockly.Msg['MATATALAB_ANGLE_ROLL'] = 'roll';
Blockly.Msg['MATATALAB_ANGLE_YAW'] = 'yaw';

// Search keywords of the blocks: <X>_KEYWORDS completes the block whose tooltip is <X>_TOOLTIP (see ToolboxManager)
Blockly.Msg['IO_WAIT_KEYWORDS'] = 'delay, wait';
Blockly.Msg['IO_WAIT_UNTIL_KEYWORDS'] = 'wait, pause';
Blockly.Msg['IO_INITCHRONOMETER_KEYWORDS'] = 'stopwatch, start, reset';
Blockly.Msg['IO_GETCHRONOMETER_KEYWORDS'] = 'stopwatch, elapsed';
Blockly.Msg['ACTUATORS_MOVE_KEYWORDS'] = 'forward, backward, move';
Blockly.Msg['ACTUATORS_MOVE_CM_KEYWORDS'] = 'forward, backward, distance';
Blockly.Msg['ACTUATORS_TURN_KEYWORDS'] = 'rotate, rotation';
Blockly.Msg['ACTUATORS_SET_GEAR_KEYWORDS'] = 'motor, wheel, speed';
Blockly.Msg['ACTUATORS_SET_SPEED_KEYWORDS'] = 'motor, wheel, speed';
Blockly.Msg['ACTUATORS_STOP_KEYWORDS'] = 'motor, wheel';
Blockly.Msg['ACTUATORS_DANCE_KEYWORDS'] = 'dancing';
Blockly.Msg['ACTUATORS_ACTION_KEYWORDS'] = 'movement, animation';
Blockly.Msg['SOUND_PLAY_NOTE_KEYWORDS'] = 'music, sound, tone';
Blockly.Msg['SOUND_PLAY_MELODY_KEYWORDS'] = 'music, sound';
Blockly.Msg['SOUND_PLAY_MUSIC_KEYWORDS'] = 'music, sound';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_KEYWORDS'] = 'LED, eyes, colour';
Blockly.Msg['DISPLAY_SET_EYES_KEYWORDS'] = 'LED, eyes, RGB';
Blockly.Msg['DISPLAY_CLEAR_EYES_KEYWORDS'] = 'LED, clear';
Blockly.Msg['MATATACON_SET_RING_COLOR_KEYWORDS'] = 'LED, ring, colour';
Blockly.Msg['MATATACON_SET_RING_KEYWORDS'] = 'LED, ring, RGB';
Blockly.Msg['MATATACON_SET_RING_LEDS_KEYWORDS'] = 'LED, ring, colours';
Blockly.Msg['MATATACON_RING_ANIMATION_KEYWORDS'] = 'LED, ring, effect';
Blockly.Msg['MATATACON_CLEAR_RING_KEYWORDS'] = 'LED, ring, clear';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_KEYWORDS'] = 'console, transmit, send';
Blockly.Msg['MATATACON_SEND_MESSAGE_KEYWORDS'] = 'send, radio';
Blockly.Msg['MATATACON_IS_MESSAGE_KEYWORDS'] = 'receive, radio';
Blockly.Msg['MATATACON_GET_MESSAGE_KEYWORDS'] = 'receive, radio';
Blockly.Msg['MATATACON_IS_BUTTON_KEYWORDS'] = 'button, key';
Blockly.Msg['MATATACON_IS_GESTURE_KEYWORDS'] = 'motion, gesture, accelerometer';
Blockly.Msg['MATATACON_IS_COLOR_KEYWORDS'] = 'sensor, colour';
Blockly.Msg['MATATACON_IS_SOUND_KEYWORDS'] = 'microphone, noise';
Blockly.Msg['MATATACON_IS_OBSTACLE_KEYWORDS'] = 'infrared, distance';
Blockly.Msg['MATATACON_IS_LIGHT_KEYWORDS'] = 'brightness, light';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_KEYWORDS'] = 'light, sensor';
Blockly.Msg['MATATACON_GET_COLOR_KEYWORDS'] = 'RGB, colour';
Blockly.Msg['MATATACON_GET_ANGLE_KEYWORDS'] = 'tilt, gyroscope';
Blockly.Msg['MATATACON_GET_ACCELERATION_KEYWORDS'] = 'accelerometer';
Blockly.Msg['MATATACON_GET_SHAKING_KEYWORDS'] = 'shake, accelerometer';
