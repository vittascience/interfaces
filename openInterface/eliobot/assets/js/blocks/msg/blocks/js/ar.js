/**
 * @fileoverview English messages for Eliobot. (EN)
 */
'use strict';
// Display
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TITLE'] = 'change the colour of the integrated LED %1';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP'] = 'Allows you to light the integrated RGB LED on the Eliobot robot.';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_OFF_TITLE'] = 'turn off the integrated LED';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_OFF_TOOLTIP'] = 'Allows you to extinguish the integrated RGB LED on the Eliobot robot.';
// Input/Output
Blockly.Msg['IO_WAIT_TITLE'] = 'wait %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Stop the code execution (duration in seconds or milliseconds).';
Blockly.Msg['IO_WAIT_SECOND'] = 'second.s';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisecond.s';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsecond.s';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'wait until %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Stop the code execution until the satisfied condition.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'Initialize the chronometer';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Allows you to initialize the chronometer (in seconds).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'get chronometer in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Returns the chronometer value from the initialization in seconds or milliseconds.';
Blockly.Msg['IO_BUTTON_STATE_TITLE'] = 'button %1 pressed';
Blockly.Msg['IO_BUTTON_STATE_TOOLTIP'] = '';
Blockly.Msg['IO_BUTTON_STATE_PRESSED'] = 'is';
Blockly.Msg['IO_BUTTON_STATE_NOT_PRESSED'] = 'is not';
// Communication - Serial connection
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'write on serial port %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Write a string on serial port.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'with';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'newline(s)';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'write graph';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'This block makes it possible to write (digital) data that will be visible in the plotter. It can be used with one or more blocks in "Name" and "Data" format. Click on icon \'Graphic mode\' to display graphics.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Data';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Name %1 Data %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'This block is to be used in the "Write in graphic" block. It must contain the name of the (text) value to display and the value in question.';
// Sensors
Blockly.Msg['SENSORS_READ_OBSTACLE_TITLE'] = 'an obstacle is %1';
Blockly.Msg['SENSORS_READ_OBSTACLE_TOOLTIP'] = 'Allows you to detect if an obstacle is present.';
Blockly.Msg['SENSORS_READ_OBSTACLE_FORWARD'] = 'in front';
Blockly.Msg['SENSORS_READ_OBSTACLE_BACKWARD'] = 'behind';
Blockly.Msg['SENSORS_READ_OBSTACLE_RIGHT'] = 'on the right';
Blockly.Msg['SENSORS_READ_OBSTACLE_LEFT'] = 'on the left';
Blockly.Msg['SENSORS_LINE_FOLLOW_TITLE'] = 'تتبع الخط';
Blockly.Msg['SENSORS_LINE_FOLLOW_TOOLTIP'] = 'يسمح لإليوبوت بتتبع خط.';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TITLE'] = 'حساسية تتبع الخط %1';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TOOLTIP'] = 'يسمح بتغيير حساسية حساسات الإليوبوت.';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TITLE'] = 'حالة حساس الخط %1';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TOOLTIP'] = 'يعود بحالة أحد حساسات تتبع الخط.';
Blockly.Msg['SENSORS_LINE_LEFT'] = "يسار";
Blockly.Msg['SENSORS_LINE_MIDDLE_LEFT'] = "وسط اليسار";
Blockly.Msg['SENSORS_LINE_MIDDLE'] = "وسط";
Blockly.Msg['SENSORS_LINE_MIDDLE_RIGHT'] = "وسط اليمين";
Blockly.Msg['SENSORS_LINE_RIGHT'] = "يمين";
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TITLE'] = 'قيمة حساس الخط %1';
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TOOLTIP'] = 'يعود بقيمة أحد حساسات تتبع الخط للإليوبوت.';
Blockly.Msg['SENSORS_DHT11_TEMPERATURE_TITLE'] = '[DHT11] درجة الحرارة';
Blockly.Msg['SENSORS_DHT11_TEMPERATURE_TOOLTIP'] = 'يقيس درجة الحرارة (°C) باستخدام حساس DHT11.';
Blockly.Msg['SENSORS_DHT11_HUMIDITY_TITLE'] = '[DHT11] الرطوبة';
Blockly.Msg['SENSORS_DHT11_HUMIDITY_TOOLTIP'] = 'يقيس الرطوبة (%) باستخدام حساس DHT11.';
// Actuators
Blockly.Msg["ROBOT_MOVE_TITLE"] = "تحكم في الروبوت %1 بسرعة %2";
Blockly.Msg["ROBOT_MOVE_TOOLTIP"] = "يسمح لك بالتحكم في محركات روبوت إليوبوت للتقدم أو التراجع.";
Blockly.Msg["ROBOT_MOVE_FORWARD"] = "إلى الأمام";
Blockly.Msg["ROBOT_MOVE_BACKWARD"] = "إلى الخلف";
Blockly.Msg["ROBOT_ROTATE_TITLE"] = "دوران نحو %1 بسرعة %2";
Blockly.Msg["ROBOT_ROTATE_TOOLTIP"] = "يدور إليوبوت نحو اليسار أو اليمين.";
Blockly.Msg["ROBOT_ROTATE_RIGHT"] = "اليمين";
Blockly.Msg["ROBOT_ROTATE_LEFT"] = "اليسار";
Blockly.Msg["ROBOT_ROTATE_FOREVER_TITLE"] = "يدور نحو %1 لمدة %2 %3 بسرعة %4";
Blockly.Msg["ROBOT_ROTATE_FOREVER_TOOLTIP"] = "يدور إليوبوت نحو اليسار أو اليمين لفترة محددة.";
Blockly.Msg["ROBOT_STOP_TITLE"] = "إيقاف الروبوت";
Blockly.Msg["ROBOT_STOP_TOOLTIP"] = "إيقاف محركات إليوبوت.";
Blockly.Msg['ROBOT_SET_SPEED_TITLE'] = 'السرعة %1 %';
Blockly.Msg['ROBOT_SET_SPEED_TOOLTIP'] = 'يغير سرعة إليوبوت.';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TITLE'] = 'يدور نحو %1 بمقدار %2° بسرعة %3';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TOOLTIP'] = 'يدور إليوبوت نحو اليسار أو اليمين بالزاوية المطلوبة.';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TITLE'] = 'دوران العجلة %1 نحو %2 بسرعة %3';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TOOLTIP'] = 'يدير إحدى عجلات إليوبوت في الاتجاه المطلوب.';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TITLE'] = 'التقدم بمقدار %1 خطوة(خطوات) بسرعة %2';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TOOLTIP'] = 'يسمح لإليوبوت بالتقدم بمقدار خطوات.';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TITLE'] = 'تشغيل نوتة %1 لمدة %2 %3';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TOOLTIP'] = 'يسمح هذا الكتلة بتشغيل نوتة موسيقية. النوتة محددة بإسمها (دو، ري، مي، فا، صول، لا، سي) والمدة التي تعزف بها.';
Blockly.Msg['ACTUATORS_FREQUENCY_TITLE'] = 'تشغيل تردد %1 (هرتز) لمدة %2 %3';
Blockly.Msg['ACTUATORS_FREQUENCY_TOOLTIP'] = 'يسمح هذا الكتلة بتشغيل تردد. التردد محدد بالهرتز (Hz) والمدة التي يعزف بها.';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TITLE'] = 'تشغيل الموسيقى %1';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TOOLTIP'] = 'يسمح هذا الكتلة بتشغيل موسيقى محددة مسبقاً. هناك العديد من المقطوعات الموسيقية المحددة مسبقاً المتاحة.';
Blockly.Msg['ACTUATORS_SET_VOLUME_TITLE'] = 'ضبط الصوت إلى %1 %';
Blockly.Msg['ACTUATORS_SET_VOLUME_TOOLTIP'] = 'تضبط هذه الكتلة مستوى الصوت. مستوى الصوت يحدد كنسبة مئوية.';