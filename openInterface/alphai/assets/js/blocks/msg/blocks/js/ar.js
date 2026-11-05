/**
 * @fileoverview French messages for AlphAI. (FR)
 */

'use strict';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'انتظر %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'يُوقِف تنفيذ الكود مؤقتًا.';
Blockly.Msg['IO_WAIT_SECOND'] = 'ثانية(ثوانٍ)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'ميلي ثانية(ميلي ثوانٍ)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'ميكروثانية(ميكروثوانٍ)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'انتظر حتى %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'يُوقِف تنفيذ الكود حتى يتحقق الشرط.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'بدء المؤقت';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'يهيئ المؤقت إلى 0 (بالثواني).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'قيمة المؤقت بوحدة %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'يعيد قيمة المؤقت منذ تهيئته (بالثواني أو بالميلي ثانية).';
// Robot - Communication
Blockly.Msg['ROBOT_PRINT_MESSAGE_TITLE'] = 'عرض في وحدة التحكم %1';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TOOLTIP'] = 'يعرض رسالة في نافذة الإخراج.';
// Robot - Actuators
Blockly.Msg['ROBOT_SET_DIRECTION_TITLE'] = '%1 بسرعة %2';
Blockly.Msg['ROBOT_SET_DIRECTION_TOOLTIP'] = 'يحرك الروبوت في الاتجاه المختار بالسرعة المحددة (بين -100 و100).';
Blockly.Msg['ROBOT_SET_MOTOR_TITLE'] = 'سرعة المحرك الأيسر %1 المحرك الأيمن %2';
Blockly.Msg['ROBOT_SET_MOTOR_TOOLTIP'] = 'يتحكم بسرعة محركي الروبوت الأيسر والأيمن (بين -100 و100).';
Blockly.Msg['ROBOT_SET_DURATION'] = 'لمدة';
Blockly.Msg['ROBOT_FORWARD'] = 'السير للأمام';
Blockly.Msg['ROBOT_BACKWARD'] = 'السير للخلف';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'الدوران لليسار';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'الدوران لليمين';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'إيقاف الروبوت';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'يوقف الروبوت.';
Blockly.Msg['ROBOT_SET_BUZZER_TITLE'] = '%1 الصفارة';
Blockly.Msg['ROBOT_SET_BUZZER_TOOLTIP'] = 'يشغّل أو يوقف صفارة الروبوت.';
Blockly.Msg['ROBOT_BUZZER_ON'] = 'تشغيل';
Blockly.Msg['ROBOT_BUZZER_OFF'] = 'إيقاف';
// Robot - Sensors
Blockly.Msg['ROBOT_IS_BLOCKED_TITLE'] = 'هل الروبوت عالق؟';
Blockly.Msg['ROBOT_IS_BLOCKED_TOOLTIP'] = 'يعيد صحيحًا إذا كان الروبوت عالقًا، وإلا يعيد خطأ.';
Blockly.Msg['ROBOT_GET_DISTANCE_TITLE'] = 'قيمة مستشعر المسافة (بالسم)';
Blockly.Msg['ROBOT_GET_DISTANCE_TOOLTIP'] = 'يعيد قيمة مستشعر المسافة في الروبوت (بالسم).';
Blockly.Msg['ROBOT_GET_INFRA_RED_TITLE'] = 'قيم حساسات تتبع الخط الأسود %1';
Blockly.Msg['ROBOT_GET_INFRA_RED_TOOLTIP'] = 'تسمح بقراءة قيم حساسات تتبع الخط التي تتراوح من 0-500 (أسود) إلى 500-1000 (أبيض). خيار \'الكل\' في البلوك يسمح بإرجاع مصفوفة تحتوي على قيم الحساسات الخمسة.';
Blockly.Msg['ROBOT_ALL_SENSORS'] = 'الكل';
// Robot - Camera
Blockly.Msg['ROBOT_SET_CAMERA_TITLE'] = 'تشغيل الكاميرا بدقة %1';
Blockly.Msg['ROBOT_SET_CAMERA_TOOLTIP'] = 'يشغّل كاميرا الروبوت بالدقة المختارة.';
Blockly.Msg['ROBOT_GET_CAMERA_TITLE'] = 'صورة الكاميرا';
Blockly.Msg['ROBOT_GET_CAMERA_TOOLTIP'] = 'يعيد الصورة الملتقطة بواسطة كاميرا الروبوت. إذا كانت الدقة المختارة هي \'1x1\', يعيد قائمة من 3 أعداد صحيحة (مكونات R و G و B) بين 0 و 255. إذا كانت الدقة \'1x2\', يعيد قائمة مكوّنة من قائمتين كل منهما من 3 أعداد صحيحة. في الحالات الأخرى، يعيد قائمة من n_lignes قوائم من n_colonnes قوائم من 3 أعداد صحيحة.';
// Robot - Display
Blockly.Msg['ROBOT_SET_LEDS_RGB_TITLE'] = 'ضبط مصابيح LED إلى R %1 G %2 B %3';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TOOLTIP'] = 'يتحكم في مصابيح LED للروبوت بتحديد مركبات اللون الأحمر والأخضر والأزرق (بين 0 و255).';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TITLE'] = 'ضبط مصابيح LED إلى %1';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TOOLTIP'] = 'يتحكم في مصابيح LED للروبوت باختيار لون من اللوحة.';
Blockly.Msg['ROBOT_ROBOT_ALL_SENSORS'] = 'الكل';
