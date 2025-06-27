/**
 * @fileoverview Arabic messages for Sphero. (AR)
 */

'use strict';

// Display 
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_TITLE'] = '[المصباح الرئيسي] R %1 G %2 B %3';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_TOOLTIP'] = 'يغير لون المصباح الرئيسي بصيغة RGB لروبوت Sphero Mini.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_PALETTE_TITLE'] = '[المصباح الرئيسي] %1';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_PALETTE_TOOLTIP'] = 'يغير لون المصباح الرئيسي لروبوت Sphero Mini باستخدام لوحة الألوان.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_FADE_TITLE'] = '[المصباح الرئيسي] تلاشي من %1 إلى %2 خلال %3 ثانية';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_FADE_TOOLTIP'] = 'يغير لون المصباح الرئيسي لروبوت Sphero Mini عن طريق تلاشي الألوان.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_BLINK_TITLE'] = '[المصباح الرئيسي] يومض في %1 لمدة %2 ثانية %3 مرات';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_BLINK_TOOLTIP'] = 'يجعل المصباح الرئيسي لروبوت Sphero Mini يومض.';
Blockly.Msg['DISPLAY_SET_BACK_LED_INTENSITY_TITLE'] = '[المصباح الخلفي] شدة %1';
Blockly.Msg['DISPLAY_SET_BACK_LED_INTENSITY_TOOLTIP'] = 'يغير شدة المصباح الخلفي (بين 0 و 255) لروبوت Sphero Mini.';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'انتظار %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'يوقف تنفيذ الكود مؤقتًا.';
Blockly.Msg['IO_WAIT_SECOND'] = 'ثانية/ثواني';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'ميلي ثانية/ثواني';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'ميكرو ثانية/ثواني';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'انتظار حتى %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'يوقف تنفيذ الكود حتى يتم تحقيق الشرط.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'بدء المؤقت';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'يبدأ مؤقت من 0 (بالثواني).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'قيمة المؤقت في %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'يعيد قيمة المؤقت من البدء (بالثواني أو ميلي ثانية).';

// Communication
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'كتابة إلى وحدة التحكم %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'يكتب البيانات إلى المنفذ التسلسلي.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'مع';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'خط/خطوط جديدة';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'رسم الرسم البياني';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'يكتب هذا الكتلة بيانات (رقمية) ستكون مرئية في الرسم البياني. يمكن استخدامه مع كتلة أو أكثر بتنسيق "اسم" و "بيانات". لعرض الرسوم البيانية، انقر على رمز \'وضع الرسم البياني\' في وحدة التحكم.';
Blockly.Msg['COMMUNICATION_DATA'] = 'البيانات';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'الاسم %1 القيمة %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'يجب استخدام هذه الكتلة مع كتلة "رسم الرسم البياني". يجب أن تحتوي على اسم القيمة المراد عرضها (نص) والقيمة المعنية (رقم).';

// Sensors
Blockly.Msg['SENSORS_PITCH_TITLE'] = 'ميل (°)';
Blockly.Msg['SENSORS_PITCH_TOOLTIP'] = 'يعيد قيمة الميل.';
Blockly.Msg['SENSORS_ROLL_TITLE'] = 'تدحرج (°)';
Blockly.Msg['SENSORS_ROLL_TOOLTIP'] = 'يعيد قيمة التدحرج.';
Blockly.Msg['SENSORS_YAW_TITLE'] = 'انعطاف (°)';
Blockly.Msg['SENSORS_YAW_TOOLTIP'] = 'يعيد قيمة الانعطاف.';
Blockly.Msg['SENSORS_ACCELEROMETER_TITLE'] = 'مقياس التسارع (g) %1';
Blockly.Msg['SENSORS_ACCELEROMETER_TOOLTIP'] = 'يعيد قيمة مقياس التسارع على المحاور x، y، أو z.';
Blockly.Msg['SENSORS_GYROSCOPE_TITLE'] = 'جيروسكوب %1';
Blockly.Msg['SENSORS_GYROSCOPE_TOOLTIP'] = 'يعيد قيمة الجيروسكوب على المحاور x، y، أو z.';
Blockly.Msg['SENSORS_IS_FALL_DETECTED_TITLE'] = 'تصادم؟';
Blockly.Msg['SENSORS_IS_FALL_DETECTED_TOOLTIP'] = 'يعيد صحيح إذا تم اكتشاف تصادم.';
Blockly.Msg['X_AXIS'] = 'x';
Blockly.Msg['Y_AXIS'] = 'y';
Blockly.Msg['Z_AXIS'] = 'z';
Blockly.Msg['STRENGTH'] = 'قوة';
// Actuators
Blockly.Msg['ACTUATORS_SET_MOTORS_TITLE'] = '%1 سرعة %2';
Blockly.Msg['ACTUATORS_SET_MOTORS_TOOLTIP'] = 'يسمح لروبوت Sphero Mini بالتقدم أو التراجع بسرعة بين 0 و 255.';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_TIMEOUT_TITLE'] = '%1 سرعة %2 لمدة %3 ثانية';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_TIMEOUT_TOOLTIP'] = 'يسمح لروبوت Sphero Mini بالتقدم أو التراجع بسرعة بين 0 و 255 لمدة معينة.';
Blockly.Msg['ACTUATORS_SET_HEADING_TITLE'] = 'اتجاه %1 °';
Blockly.Msg['ACTUATORS_SET_HEADING_TOOLTIP'] = 'يغير اتجاه روبوت Sphero Mini.';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_HEADING_TITLE'] = '%1 سرعة %2 اتجاه %3 °';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_HEADING_TOOLTIP'] = 'يسمح لروبوت Sphero Mini بالتقدم أو التراجع بسرعة بين 0 و 255 باتجاه معين.';
Blockly.Msg['ACTUATORS_ROTATE_TITLE'] = 'تدوير %1 سرعة %2';
Blockly.Msg['ACTUATORS_ROTATE_TOOLTIP'] = 'يسمح لروبوت Sphero Mini بالتدوير بسرعة بين 0 و 255.';
Blockly.Msg['ACTUATORS_ROTATE_WITH_TIMEOUT_TITLE'] = 'تدوير %1 سرعة %2 لمدة %3 ثانية';
Blockly.Msg['ACTUATORS_ROTATE_WITH_TIMEOUT_TOOLTIP'] = 'يسمح لروبوت Sphero Mini بالتدوير بسرعة بين 0 و 255 لمدة معينة.';
Blockly.Msg['ACTUATORS_SET_MOTOR_TITLE'] = 'المحرك في %1 اتجاه %2 سرعة %3';
Blockly.Msg['ACTUATORS_SET_MOTOR_TOOLTIP'] = 'يتحكم في المحرك الأيمن أو الأيسر لروبوت Sphero Mini بسرعة بين 0 و 255 في اتجاه معين.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'إيقاف المحرك في';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'يوقف محركات روبوت Sphero Mini.';
Blockly.Msg['ACTUATORS_RESET_HEADING_TITLE'] = 'إعادة ضبط الاتجاه الافتراضي';
Blockly.Msg['ACTUATORS_RESET_HEADING_TOOLTIP'] = 'يعيد ضبط اتجاه روبوت Sphero Mini.';
Blockly.Msg['ACTUATORS_GO_FORWARD'] = "تقدم";
Blockly.Msg['ACTUATORS_GO_BACKWARD'] = "تراجع";
Blockly.Msg['ACTUATORS_MOTOR_RIGHT'] = "يمين";
Blockly.Msg['ACTUATORS_MOTOR_LEFT'] = "يسار";
Blockly.Msg['ACTUATORS_MOTOR_RIGHT&LEFT'] = "يمين&يسار";