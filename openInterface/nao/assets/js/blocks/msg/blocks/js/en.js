/**
 * @fileoverview English messages for Nao. (EN)
 */
'use strict';

// Display
Blockly.Msg["DISPLAY_FADE_TITLE"] = "fade %1 intensity %2 % for %3 s";
Blockly.Msg["DISPLAY_FADE_TOOLTIP"] = "Gradually changes the intensity of the specified LEDs.";
Blockly.Msg["DISPLAY_ALL_LEDS_GROUP"] = "all LEDs";
Blockly.Msg["DISPLAY_BRAIN_LEDS_GROUP"] = "head LEDs";
Blockly.Msg["DISPLAY_EAR_LEDS_GROUP"] = "ear LEDs";
Blockly.Msg["DISPLAY_FACE_LEDS_GROUP"] = "face LEDs";
Blockly.Msg["DISPLAY_CHEST_LEDS_GROUP"] = "chest LEDs";
Blockly.Msg["DISPLAY_FEET_LEDS_GROUP"] = "feet LEDs";
Blockly.Msg["DISPLAY_FADE_RGB_TITLE"] = "fade color %1 to R %2 % G %3 % B %4 % for %5 s";
Blockly.Msg["DISPLAY_FADE_RGB_TOOLTIP"] = "Gradually changes the color of the specified LEDs using RGB values.";
Blockly.Msg["DISPLAY_FADE_RGB_PALETTE_TITLE"] = "fade color %1 to %2 for %3 s";
Blockly.Msg["DISPLAY_FADE_RGB_PALETTE_TOOLTIP"] = "Gradually changes the color of the specified LEDs using a palette color.";
Blockly.Msg["DISPLAY_FADE_FACE_RGB_TITLE"] = "fade color of LED no.%1 of the %2 eye to R %3 % G %4 % B %5 % for %6 s";
Blockly.Msg["DISPLAY_FADE_FACE_RGB_TOOLTIP"] = "Gradually changes the color of the specified LEDs using RGB values.";
Blockly.Msg["DISPLAY_FADE_FACE_RGB_PALETTE_TITLE"] = "fade color of LED no.%1 of the %2 eye to %3 for %4 s";
Blockly.Msg["DISPLAY_FADE_FACE_RGB_PALETTE_TOOLTIP"] = "Gradually changes the color of the specified LEDs using a palette color.";
Blockly.Msg["DISPLAY_FACE_LEFT"] = "left";
Blockly.Msg["DISPLAY_FACE_RIGHT"] = "right";
Blockly.Msg["DISPLAY_FACE_LEFT&RIGHT"] = "left and right";
Blockly.Msg["DISPLAY_FADE_RGB_COLOR_NAME_TITLE"] = "fade color %1 to %2 for %3 s";
Blockly.Msg["DISPLAY_FADE_RGB_COLOR_NAME_TOOLTIP"] = "Gradually changes the color of the specified LEDs using a named color.";
Blockly.Msg["DISPLAY_WHITE_COLOR"] = "white";
Blockly.Msg["DISPLAY_RED_COLOR"] = "red";
Blockly.Msg["DISPLAY_GREEN_COLOR"] = "green";
Blockly.Msg["DISPLAY_BLUE_COLOR"] = "blue";
Blockly.Msg["DISPLAY_YELLOW_COLOR"] = "yellow";
Blockly.Msg["DISPLAY_MAGENTA_COLOR"] = "magenta";
Blockly.Msg["DISPLAY_CYAN_COLOR"] = "cyan";
Blockly.Msg["DISPLAY_ROTATE_EYES_TITLE"] = "eye rotation animation %1 rotation time %2 s animation duration %3 s";
Blockly.Msg["DISPLAY_ROTATE_EYES_TOOLTIP"] = "Activates a light effect on the eyes.";
Blockly.Msg["DISPLAY_SET_INTENSITY_TITLE"] = "set intensity %1 to %2 %";
Blockly.Msg["DISPLAY_SET_INTENSITY_TOOLTIP"] = "Sets the intensity of the specified LEDs.";
Blockly.Msg["DISPLAY_OFF_TITLE"] = "turn off %1";
Blockly.Msg["DISPLAY_OFF_TOOLTIP"] = "Turns off the specified LEDs.";
Blockly.Msg["DISPLAY_ON_TITLE"] = "turn on %1";
Blockly.Msg["DISPLAY_ON_TOOLTIP"] = "Turns on the specified LEDs.";
Blockly.Msg["DISPLAY_RANDOM_EYES_TITLE"] = "random eye colors for %1 s";
Blockly.Msg["DISPLAY_RANDOM_EYES_TOOLTIP"] = "Randomly changes the colors of the eye LEDs.";
Blockly.Msg["DISPLAY_RASTA_TITLE"] = "rasta animation for %1 s";
Blockly.Msg["DISPLAY_RASTA_TOOLTIP"] = "Activates a rasta-type light effect.";
Blockly.Msg["DISPLAY_RESET_TITLE"] = "reset %1";
Blockly.Msg["DISPLAY_RESET_TOOLTIP"] = "Resets the specified LEDs to their default state.";

// Communications
Blockly.Msg["COMMUNICATION_ANIMATED_SPEECH_SAY_TITLE"] = "say %1 with animation";
Blockly.Msg["COMMUNICATION_ANIMATED_SPEECH_SAY_TOOLTIP"] = "Says the given annotated text with animations inserted in the text.";
Blockly.Msg["COMMUNICATION_TEXT_TO_SPEECH_SAY_TITLE"] = "say %1";
Blockly.Msg["COMMUNICATION_TEXT_TO_SPEECH_SAY_TOOLTIP"] = "Says the given text.";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_TITLE"] = "set the language for speech recognition %1";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_OPTION_ENGLISH"] = "English";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_OPTION_FRENCH"] = "French";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_OPTION_SPANISH"] = "Spanish";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_OPTION_GERMAN"] = "German";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_OPTION_ITALIAN"] = "Italian";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_TOOLTIP"] = "Sets the language for speech recognition.";
Blockly.Msg["COMMUNICATION_ASR_SET_VOCABULARY_TITLE"] = "define vocabulary list %1";
Blockly.Msg["COMMUNICATION_ASR_SET_VOCABULARY_TOOLTIP"] = "Defines a specific set of keywords for speech recognition.";
Blockly.Msg["COMMUNICATION_ASR_START_RECOGNITION_TITLE"] = "start speech recognition";
Blockly.Msg["COMMUNICATION_ASR_START_RECOGNITION_TOOLTIP"] = "Starts speech recognition.";
Blockly.Msg["COMMUNICATION_ASR_STOP_RECOGNITION_TITLE"] = "stop speech recognition";
Blockly.Msg["COMMUNICATION_ASR_STOP_RECOGNITION_TOOLTIP"] = "Stops speech recognition.";
Blockly.Msg["COMMUNICATION_ASR_GET_LAST_WORD_CALLBACK_TITLE"] = "when a word is recognized in %1";
Blockly.Msg["COMMUNICATION_ASR_GET_LAST_WORD_CALLBACK_TOOLTIP"] = "Stores the last word recognized by speech recognition in the specified variable.";



// Movements
Blockly.Msg["MOVEMENTS_POSE_MODE_TITLE"] = "adopt the pose %1";
Blockly.Msg["MOVEMENTS_POSE_MODE_TOOLTIP"] = "Changes NAO 's posture to the specified pose.";
Blockly.Msg["MOVEMENTS_POSE_MODE_YEAH"] = "Yeah";
Blockly.Msg["MOVEMENTS_POSE_MODE_HANDSONHIPS"] = "Hands on hips";
Blockly.Msg["MOVEMENTS_POSE_MODE_SCANNINGHORIZON"] = "Scanning the horizon";
Blockly.Msg["MOVEMENTS_POSE_MODE_RELAXED"] = "Relaxed";
Blockly.Msg["MOVEMENTS_POSE_MODE_TPOSE"] = "T-Pose";

Blockly.Msg["MOVEMENTS_HAND_TITLE"] = "%1 the %2 hand";
Blockly.Msg["MOVEMENTS_OPEN_HAND"] = "open";
Blockly.Msg["MOVEMENTS_CLOSE_HAND"] = "close";
Blockly.Msg["MOVEMENTS_LEFT_HAND"] = "left";
Blockly.Msg["MOVEMENTS_RIGHT_HAND"] = "right";
Blockly.Msg["MOVEMENTS_HAND_TOOLTIP"] = "Opens or closes the specified hand.";
Blockly.Msg["MOVEMENTS_MOVE_TO_TITLE"] = "move %1 by %2 cm";
Blockly.Msg["MOVEMENTS_MOVE_TO_FORWARD"] = "forward";
Blockly.Msg["MOVEMENTS_MOVE_TO_BACKWARD"] = "backward";
Blockly.Msg["MOVEMENTS_ROTATE_TITLE"] = "rotate to the %1 by %2 °";
Blockly.Msg["MOVEMENTS_ROTATE_LEFT"] = "left";
Blockly.Msg["MOVEMENTS_ROTATE_RIGHT"] = "right";
Blockly.Msg["MOVEMENTS_ROTATE_TOOLTIP"] = "Rotates NAO in the specified direction by the given angle.";
Blockly.Msg["MOVEMENTS_MOVE_TO_TOOLTIP"] = "Moves NAO in the specified direction by a given distance.";
Blockly.Msg["MOVEMENTS_MOVE_TO_XY_TITLE"] = "move to X %1 Y %2 angle %3 °";
Blockly.Msg["MOVEMENTS_MOVE_TO_XY_TOOLTIP"] = "Moves NAO to a specific position in centimeters with a given angle (in degrees).";
Blockly.Msg["MOVEMENTS_GO_TO_POSTURE_TITLE"] = "animation %1 speed %2 %";
Blockly.Msg["MOVEMENTS_STAND_POSTURE"] = "standing";
Blockly.Msg["MOVEMENTS_SIT_POSTURE"] = "sitting";
Blockly.Msg["MOVEMENTS_GO_TO_POSTURE_TOOLTIP"] = "Play an animation with NAO at the specified speed.";


Blockly.Msg["MOVEMENTS_YAW"] = "yaw";
Blockly.Msg["MOVEMENTS_PITCH"] = "pitch";
Blockly.Msg["MOVEMENTS_ROLL"] = "roll";
Blockly.Msg["MOVEMENTS_YAW&PITCH"] = "yaw&pitch";

Blockly.Msg["MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_1_TITLE"] = "move joint %1 %2 by %3 ° speed %4 %";
Blockly.Msg["MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_4_TITLE"] = "move joint %1 by %2 ° speed %3 %";
Blockly.Msg["MOVEMENTS_SET_ANGLES_UPPER_BODY_TITLE"] = "Create a pose in radians: Head %1 %2 Left arm %3 %4 %5 %6 %7 %8 Right arm %9 %10 %11 %12 %13 %14";
Blockly.Msg["MOVEMENTS_SET_ANGLES_UPPER_BODY_TOOLTIP"] = "Creates a pose for NAO's head and arms with the specified angles (in radians).";
Blockly.Msg["MOVEMENTS_SET_ANGLES_UPPER_BODY_DEGRES_TITLE"] = "Create a pose in degrees: Head %1 %2 Left arm %3 %4 %5 %6 %7 %8 Right arm %9 %10 %11 %12 %13 %14";
Blockly.Msg["MOVEMENTS_SET_ANGLES_UPPER_BODY_DEGRES_TOOLTIP"] = "Creates a pose for NAO's head and arms with the specified angles (in degrees).";

// Pitch or Roll

Blockly.Msg["MOVEMENTS_L_SHOULDER_JOINT"] = "left shoulder";
Blockly.Msg["MOVEMENTS_R_SHOULDER_JOINT"] = "right shoulder";

Blockly.Msg["MOVEMENTS_L_ANKLE_JOINT"] = "left ankle";
Blockly.Msg["MOVEMENTS_R_ANKLE_JOINT"] = "right ankle";

// Yaw or Roll
Blockly.Msg["MOVEMENTS_L_ELBOW_JOINT"] = "left elbow";
Blockly.Msg["MOVEMENTS_R_ELBOW_JOINT"] = "right elbow";

Blockly.Msg["MOVEMENTS_HEAD_JOINT"] = "head";

// Pitch or Roll / Only Pitch and Yaw
Blockly.Msg["MOVEMENTS_L_HIP_JOINT"] = "left hip";
Blockly.Msg["MOVEMENTS_R_HIP_JOINT"] = "right hip";

// Only Pitch 
Blockly.Msg["MOVEMENTS_L_KNEE_JOINT"] = "left knee";
Blockly.Msg["MOVEMENTS_R_KNEE_JOINT"] = "right knee";

// Only Yaw
Blockly.Msg["MOVEMENTS_L_WRIST_JOINT"] = "left wrist";
Blockly.Msg["MOVEMENTS_R_WRIST_JOINT"] = "right wrist";

Blockly.Msg["MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_TOOLTIP"] = "Interpolates an angle for the selected joint at the given speed.";

// Games

Blockly.Msg["GAME_CAPITAL_INIT_TITLE"] = "initialize the capital city game";
Blockly.Msg["GAME_CAPITAL_INIT_TOOLTIP"] = "Initializes the capital city game.";
Blockly.Msg["GAME_CAPITAL_PLAY_TITLE"] = "play the capital city game with %1";
Blockly.Msg["GAME_CAPITAL_PLAY_TOOLTIP"] = "Starts the capital city game with the specified country's capital.";
Blockly.Msg["GAME_CAPITAL_GET_RANDOM_COUNTRY_TITLE"] = "get a random country";
Blockly.Msg["GAME_CAPITAL_GET_RANDOM_COUNTRY_TOOLTIP"] = "Returns a random country.";
Blockly.Msg["GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_TITLE"] = "get %1 from %2";
Blockly.Msg["GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_CAPITAL"] = "the capital";
Blockly.Msg["GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_HINT"] = "a hint";
Blockly.Msg["GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_POPULATION"] = "the population";
Blockly.Msg["GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_TOOLTIP"] = "Returns the capital, a hint, or the population of the specified country.";
Blockly.Msg["GAME_DYNAMIC_STORY_INIT_TITLE"] = "initialize %1";
Blockly.Msg["GAME_DYNAMIC_STORY_INIT_TOOLTIP"] = "Initializes the dynamic story. Choose a story to tell from the list.";
Blockly.Msg["GAME_DYNAMIC_STORY_INIT_STORY1"] = "story_1";
Blockly.Msg["GAME_DYNAMIC_STORY_INIT_STORY2"] = "story_2";
Blockly.Msg["GAME_PLAY_CURRENT_SCENE_TITLE"] = "play the scene %1 and return possible choices";
Blockly.Msg["GAME_PLAY_CURRENT_SCENE_TOOLTIP"] = "Plays the current scene and returns the possible choices for the next part of the story.";
Blockly.Msg["GAME_MENTAL_MATH_INIT_TITLE"] = "initialize the mental math game";
Blockly.Msg["GAME_MENTAL_MATH_INIT_TOOLTIP"] = "Initializes the mental math game.";
Blockly.Msg["GAME_MENTAL_MATH_PLAY_TITLE"] = "in %1 get %2";
Blockly.Msg["GAME_MENTAL_MATH_PLAY_TOOLTIP"] = "Starts the mental math game with an addition, subtraction, or random operation.";
Blockly.Msg["GAME_MENTAL_MATH_PLAY_OPERATION_ADD"] = "an addition";
Blockly.Msg["GAME_MENTAL_MATH_PLAY_OPERATION_SUB"] = "a subtraction";
Blockly.Msg["GAME_MENTAL_MATH_PLAY_OPERATION_RANDOM"] = "a random operation";
Blockly.Msg["GAME_MENTAL_MATH_GET_NUMBER_TITLE"] = "convert the number %1 to letters";
Blockly.Msg["GAME_MENTAL_MATH_GET_NUMBER_TOOLTIP"] = "Returns the given number in words.";



// Sensors
// Sensors
Blockly.Msg["SENSORS_TACTIL_TOUCHED_TITLE"] = "%1 of the head is touched";
Blockly.Msg["SENSORS_FRONT_TACTIL"] = "front sensor";
Blockly.Msg["SENSORS_MIDDLE_TACTIL"] = "middle sensor";
Blockly.Msg["SENSORS_REAR_TACTIL"] = "rear sensor";
Blockly.Msg["SENSORS_ALL_TACTIL"] = "one of the sensors";
Blockly.Msg["SENSORS_TACTIL_TOUCHED_TOOLTIP"] = "Returns true if the specified touch sensor is touched.";

Blockly.Msg["SENSORS_HAND_TOUCHED_TITLE"] = "%1 of the %2 is touched";
Blockly.Msg["SENSORS_LEFT"] = "left sensor";
Blockly.Msg["SENSORS_RIGHT"] = "right sensor";
Blockly.Msg["SENSORS_BACK"] = "rear sensor";
Blockly.Msg["SENSORS_ALL"] = "one of the sensors";
Blockly.Msg["SENSORS_LEFT_HAND"] = "left hand";
Blockly.Msg["SENSORS_RIGHT_HAND"] = "right hand";
Blockly.Msg["SENSORS_HAND_TOUCHED_TOOLTIP"] = "Returns true if the specified hand sensor is touched.";

Blockly.Msg["SENSORS_BUMPER_PRESSED_TITLE"] = "%1 is pressed";
Blockly.Msg["SENSORS_BUMPER_LEFT"] = "left bumper";
Blockly.Msg["SENSORS_BUMPER_RIGHT"] = "right bumper";
Blockly.Msg["SENSORS_BUMPER_ALL"] = "one of the bumpers";
Blockly.Msg["SENSORS_BUMPER_PRESSED_TOOLTIP"] = "Returns true if the specified bumper is pressed.";


Blockly.Msg["SENSORS_SONAR_DETECTION_TITLE"] = "%1 detected with the sonar at %2";
Blockly.Msg["SENSORS_SONAR_DETECTED"] = "something is";
Blockly.Msg["SENSORS_SONAR_NOTHING"] = "nothing is";
Blockly.Msg["SENSORS_SONAR_DETECTION_TOOLTIP"] = "Returns true if the sonar detects something.";

Blockly.Msg["SENSORS_GET_BATTERY_CHARGE_TITLE"] = "battery level";
Blockly.Msg["SENSORS_GET_BATTERY_CHARGE_TOOLTIP"] = "Returns the current battery level as a percentage.";

Blockly.Msg['TIME_WAIT_TITLE'] = 'wait %1 %2';
Blockly.Msg['TIME_WAIT_TOOLTIP'] = 'Pauses code execution.';
Blockly.Msg['TIME_WAIT_SECOND'] = 'second.s';
Blockly.Msg['TIME_WAIT_MILLISECOND'] = 'millisecond.s';
Blockly.Msg['TIME_WAIT_MICROSECOND'] = 'microsecond.s';
Blockly.Msg['TIME_WAIT_UNTIL_TITLE'] = 'wait until %1';
Blockly.Msg['TIME_WAIT_UNTIL_TOOLTIP'] = 'Stops code execution until the condition is met.';
