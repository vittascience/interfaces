/**
 * @fileoverview English messages for Niryo. (EN)
 */
'use strict';
// NIRYO

Blockly.Msg['NIRYO_MOVE_JOINTS_TITLE'] = '[Niryo] move joints %1';
Blockly.Msg['NIRYO_MOVE_JOINTS_TOOLTIP'] = 'Allows controlling the angle of the joints of the Niryo Ned2 robot (in radians).';
Blockly.Msg['NIRYO_JOINTS_TITLE'] = 'joints: j1%1 j2%2 j3%3 j4%4 j5%5 j6%6';
Blockly.Msg['NIRYO_JOINTS_TOOLTIP'] = 'Allows controlling the angle of the joints of the Niryo Ned2 robot (in radians).';
Blockly.Msg['NIRYO_MOVE_JOINTS_VALUES_TITLE'] = '[Niryo] move joints %1';
Blockly.Msg['NIRYO_MOVE_JOINTS_VALUES_TOOLTIP'] = 'Allows controlling the angle of the joints of the Niryo Ned2 robot (in radians).';

// NIRYO_POSE_TITLE

Blockly.Msg['NIRYO_SLEEP_POSE_TITLE'] = '[Niryo] Home';
Blockly.Msg['NIRYO_SLEEP_POSE_TOOLTIP'] = 'Allows moving the Niryo Ned2 robot to its resting position.';
Blockly.Msg['NIRYO_POSE_TITLE'] = 'pose x%1 y%2 z%3 roll%4 pitch%5 yaw%6';
Blockly.Msg['NIRYO_POSE_TOOLTIP'] = 'Allows moving the Niryo Ned2 robot to a given position.';
Blockly.Msg['NIRYO_MOVE_POSE_TITLE'] = '[Niryo] %1 move pose %2';
Blockly.Msg['NIRYO_MOVE_POSE_TOOLTIP'] = 'Allows moving the Niryo Ned2 robot to a given position.';

Blockly.Msg['NIRYO_SHIFT_POSE_TITLE'] = '[Niryo] %1 Shift pose on axis %2 by %3';
Blockly.Msg['NIRYO_SHIFT_POSE_TOOLTIP'] = 'Allows shifting the pose of the Niryo Ned2 robot on a given axis.';
Blockly.Msg['NIRYO_SHIFT_POSE_AXIS_X'] = 'x axis';
Blockly.Msg['NIRYO_SHIFT_POSE_AXIS_Y'] = 'y axis';
Blockly.Msg['NIRYO_SHIFT_POSE_AXIS_Z'] = 'z axis';
Blockly.Msg['NIRYO_SHIFT_POSE_ROT_ROLL'] = 'roll';
Blockly.Msg['NIRYO_SHIFT_POSE_ROT_PITCH'] = 'pitch';
Blockly.Msg['NIRYO_SHIFT_POSE_ROT_YAW'] = 'yaw';

Blockly.Msg['NIRYO_MOVE_POSE_TYPE_STANDARD'] = 'standard';
Blockly.Msg['NIRYO_MOVE_POSE_TYPE_LINEAR'] = 'linear';

// TOOLS
Blockly.Msg['TOOL_OPEN_GRIPPER_TITLE'] = '[Niryo] open the gripper at speed %1';
Blockly.Msg['TOOL_OPEN_GRIPPER_TOOLTIP'] = 'Allows opening the gripper of the Niryo Ned2 robot.';
Blockly.Msg['TOOL_CLOSE_GRIPPER_TITLE'] = '[Niryo] close the gripper at speed %1';
Blockly.Msg['TOOL_CLOSE_GRIPPER_TOOLTIP'] = 'Allows closing the gripper of the Niryo Ned2 robot.';
Blockly.Msg['TOOL_OPEN_GRIPPER_SPEED_1'] = '1/5';
Blockly.Msg['TOOL_OPEN_GRIPPER_SPEED_2'] = '2/5';
Blockly.Msg['TOOL_OPEN_GRIPPER_SPEED_3'] = '3/5';
Blockly.Msg['TOOL_OPEN_GRIPPER_SPEED_4'] = '4/5';
Blockly.Msg['TOOL_OPEN_GRIPPER_SPEED_5'] = '5/5';

// DISPLAY
Blockly.Msg['DISPLAY_LED_RING_COLORS_TITLE'] = 'R: %1 G: %2 B: %3';
Blockly.Msg['DISPLAY_LED_RING_COLORS_TOOLTIP'] = 'Allows setting the values of the RGB LEDs of the LED ring of the Niryo Ned2 robot.';
Blockly.Msg['DISPLAY_LED_RING_COLORS_PICKER_TITLE'] = 'Color %1';
Blockly.Msg['DISPLAY_LED_RING_COLORS_PICKER_TOOLTIP'] = 'Allows setting the values of the RGB LEDs of the LED ring of the Niryo Ned2 robot.';
Blockly.Msg['DISPLAY_LED_RING_SOLID_COLOR_TITLE'] = '[LED Ring] Solid color %1, wait %2';
Blockly.Msg['DISPLAY_LED_RING_SOLID_COLOR_TOOLTIP'] = 'Allows setting the color of the RGB LEDs of the LED ring of the Niryo Ned2 robot.';
Blockly.Msg['DISPLAY_LED_RING_WAIT_TRUE'] = "yes";
Blockly.Msg['DISPLAY_LED_RING_WAIT_FALSE'] = "no";
Blockly.Msg['DISPLAY_LED_RING_FLASHING_COLOR_TITLE'] = '[LED Ring] Pulsing color %1, duration %2 repetition %3 wait %4';
Blockly.Msg['DISPLAY_LED_RING_FLASHING_COLOR_TOOLTIP'] = 'Allows setting the color of the RGB LEDs of the LED ring as a pulse on the Niryo Ned2 robot.';
Blockly.Msg['DISPLAY_LED_RING_WIPE_COLOR_TITLE'] = '[LED Ring] color wipe %1, duration %2 wait %3';
Blockly.Msg['DISPLAY_LED_RING_WIPE_COLOR_TOOLTIP'] = 'Allows setting the color of the LED ring\'s RGB LEDs as a scrolling effect for the Niryo Ned2 robot.';
Blockly.Msg['DISPLAY_LED_RING_RAINBOW_PATTERN_TITLE'] = '[LED Ring] rainbow, duration %1 repetition %2 wait %3';
Blockly.Msg['DISPLAY_LED_RING_RAINBOW_PATTERN_TOOLTIP'] = 'Allows setting the color of the LED ring\'s RGB LEDs in a rainbow pattern for the Niryo Ned2 robot.';
Blockly.Msg['DISPLAY_LED_RING_RAINBOW_CYCLE_TITLE'] = '[LED Ring] cyclic rainbow, duration %1 repetition %2 wait %3';
Blockly.Msg['DISPLAY_LED_RING_RAINBOW_CYCLE_TOOLTIP'] = 'Allows setting the color of the LED ring\'s RGB LEDs in a cyclic rainbow pattern for the Niryo Ned2 robot.';
Blockly.Msg['DISPLAY_LED_RING_SET_LED_TITLE'] = '[LED Ring] Set LED %1 to color %2';
Blockly.Msg['DISPLAY_LED_RING_SET_LED_TOOLTIP'] = 'Allows setting the color of an RGB LED of the LED ring of the Niryo Ned2 robot.';
Blockly.Msg['DISPLAY_LED_RING_CHASE_COLOR_TITLE'] = '[LED Ring] Chase color %1, duration %2 repetition %3 wait %4';
Blockly.Msg['DISPLAY_LED_RING_CHASE_COLOR_TOOLTIP'] = 'Allows setting the color of the LED ring\'s RGB LEDs as a scrolling effect for the Niryo Ned2 robot.';
Blockly.Msg['DISPLAY_LED_RING_GO_UP_TITLE'] = '[LED Ring] go up color %1, duration %2 repetition %3 wait %4';
Blockly.Msg['DISPLAY_LED_RING_GO_UP_TOOLTIP'] = 'Allows setting the color of the LED ring\'s RGB LEDs as a scrolling effect for the Niryo Ned2 robot.';
Blockly.Msg['DISPLAY_LED_RING_GO_DOWN_TITLE'] = '[LED Ring] go up & down color %1, duration %2 repetition %3 wait %4';
Blockly.Msg['DISPLAY_LED_RING_GO_DOWN_TOOLTIP'] = 'Allows setting the color of the LED ring\'s RGB LEDs as a scrolling effect for the Niryo Ned2 robot.';
// Utility
Blockly.Msg['UTILITY_WAIT_TITLE'] = 'wait %1 second(s)';
Blockly.Msg['UTILITY_WAIT_TOOLTIP'] = 'Allows waiting for a certain number of seconds.';
Blockly.Msg['UTILITY_BREAK_POINT_TITLE'] = 'break point';
Blockly.Msg['UTILITY_BREAK_POINT_TOOLTIP'] = 'Allows placing a break point in the code.';
Blockly.Msg['UTILITY_COMMENT_TITLE'] = 'comment %1';
Blockly.Msg['UTILITY_COMMENT_TOOLTIP'] = 'Allows adding a comment in the code.';

// Wifi - Raspberry Pi
Blockly.Msg['NETWORK_GET_PI_NAME_TITLE'] = "[Ned2] IP address %1";
Blockly.Msg['NETWORK_GET_PI_NAME_TOOLTIP'] = "Allows retrieving the IP address of the Niryo Ned2.";

// Conveyor
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_TITLE'] = '[Niryo] الناقل رقم %1';
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_TOOLTIP'] = "يتيح لك تفعيل الناقل في روبوت Niryo Ned2. تنبيه: من الضروري توصيل كابل الطاقة بالناقل أولاً قبل توصيله بالروبوت.";
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_1'] = '1';
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_2'] = '2';
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_TITLE'] = '[Niryo] التحكم في الناقل %1 بسرعة (%) %2 وفي الاتجاه %3';
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_TOOLTIP'] = "يتيح لك التحكم في سرعة الناقل في روبوت Niryo Ned2. تنبيه: من الضروري توصيل كابل الطاقة بالناقل أولاً قبل توصيله بالروبوت.";
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_DIRECTION_FORWARD'] = 'إلى الأمام';
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_DIRECTION_BACKWARD'] = 'إلى الخلف';
Blockly.Msg['NIRYO_ACTUATOR_STOP_CONVEYOR_TITLE'] = '[Niryo] إيقاف الناقل %1';
Blockly.Msg['NIRYO_ACTUATOR_STOP_CONVEYOR_TOOLTIP'] = "يتيح لك إيقاف الناقل في روبوت Niryo Ned2.";
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_TITLE'] = '[Niryo] مستشعر الأشعة تحت الحمراء يكتشف %1';
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_LOW'] = 'شيئًا';
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_HIGH'] = 'لا شيء';
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_TOOLTIP'] = "يتيح لك معرفة ما إذا كان مستشعر الأشعة تحت الحمراء في ناقل روبوت Niryo Ned2 يكتشف شيئًا أم لا.";
