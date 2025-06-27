/**
 * @fileoverview Arabic messages for Loti-bot. (AR)
 */

'use strict';

// Display
Blockly.Msg['DISPLAY_SET_LEDS_RGB_TITLE'] = '[LEDs] R %1 G %2 B %3';
Blockly.Msg['DISPLAY_SET_LEDS_RGB_TOOLTIP'] = 'تغيير لون الأضواء LED في الروبوت Loti-bot إلى النمط RGB.';
Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TITLE'] = '[LEDs] %1';
Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TOOLTIP'] = 'تغيير لون الأضواء LED في الروبوت Loti-bot باستخدام لوحة ألوان.';
Blockly.Msg['DISPLAY_SET_LED_RGB_TITLE'] = '[LEDs] اليسار R %1 V %2 B %3 اليمين R %4 V %5 B %6';
Blockly.Msg['DISPLAY_SET_LED_RGB_TOOLTIP'] = 'يغير لون الـLEDs الأيسر والأيمن بتنسيق RGB على روبوت Loti-bot.';
Blockly.Msg['DISPLAY_SET_LED_PALETTE_TITLE'] = '[LEDs] يسار %1 يمين %2';
Blockly.Msg['DISPLAY_SET_LED_PALETTE_TOOLTIP'] = Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TOOLTIP'];
Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TITLE'] = '[أضواء] قوة %1';
Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TOOLTIP'] = 'تعيين قوة أضواء الروبوت Loti-bot (من 0 إلى 255).';
Blockly.Msg['DISPLAY_SET_HEADLIGHT_TITLE'] = '[أضواء] قوة يسار %1 قوة يمين %2';
Blockly.Msg['DISPLAY_SET_HEADLIGHT_TOOLTIP'] = Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TOOLTIP'];

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'انتظر %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'توقف عن تنفيذ الكود.';
Blockly.Msg['IO_WAIT_SECOND'] = 'ثانية/ثواني';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'ميللي ثانية/ثواني';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'ميكرو ثانية/ثواني';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'انتظر حتى %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'توقف عن تنفيذ الكود حتى تتحقق الشرط.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'ابدأ الساعة الزمنية';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'تهيئة ساعة زمنية عند 0 (بالثواني).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'قيمة الساعة الزمنية بـ %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'يعود بقيمة الساعة الزمنية منذ بدايتها (بالثواني أو المللي ثواني).';

// Communication
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'اكتب في الوحدة الطرفية %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'يسمح بكتابة البيانات في المنفذ التسلسلي.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'مع';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'سطر/أسطر جديدة';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'رسم الرسم البياني';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'يتيح هذا الكتلة كتابة البيانات الرقمية التي ستظهر على الراسمة. يمكن استخدامه مع كتلة أو أكثر بتنسيق "الاسم" و"البيانات". لعرض الرسوم البيانية، انقر على أيقونة \'وضع الرسم البياني\' في الوحدة الطرفية.';
Blockly.Msg['COMMUNICATION_DATA'] = 'البيانات';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'الاسم %1 القيمة %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'يجب استخدام هذه الكتلة مع كتلة "رسم الرسم البياني". يجب أن تحتوي على اسم القيمة المراد عرضها (نص) والقيمة الفعلية (رقم).';

// Sensors
Blockly.Msg["SENSORS_IS_STOPPED_TITLE"] = "هل توقف؟";
Blockly.Msg["SENSORS_IS_STOPPED_TOOLTIP"] = "يعود بصحيح إذا كان الروبوت Loti-bot متوقفًا.";
Blockly.Msg["SENSORS_IS_MOVING_TITLE"] = "هل يتحرك؟";
Blockly.Msg["SENSORS_IS_MOVING_TOOLTIP"] = "يعود بصحيح إذا كان الروبوت Loti-bot يتحرك.";
Blockly.Msg["SENSORS_IS_COLLISION_DETECTED_TITLE"] = "هل تم اكتشاف تصادم؟";
Blockly.Msg["SENSORS_IS_COLLISION_DETECTED_TOOLTIP"] = "يعود بصحيح إذا تم اكتشاف تصادم بواسطة الروبوت Loti-bot.";
Blockly.Msg["SENSORS_IS_FALL_DETECTED_TITLE"] = "هل تم اكتشاف سقوط؟";
Blockly.Msg["SENSORS_IS_FALL_DETECTED_TOOLTIP"] = "يعود بصحيح إذا تم اكتشاف سقوط بواسطة الروبوت Loti-bot.";
Blockly.Msg["SENSORS_IS_SPEAKER_WORKING_TITLE"] = "هل السماعة تعمل؟";
Blockly.Msg["SENSORS_IS_SPEAKER_WORKING_TOOLTIP"] = "يعود بصحيح إذا كانت سماعة الروبوت Loti-bot تعمل بشكل صحيح.";
Blockly.Msg["SENSORS_IS_HEADLIGHTS_WORKING_TITLE"] = "هل الأضواء مضاءة؟";
Blockly.Msg["SENSORS_IS_HEADLIGHTS_WORKING_TOOLTIP"] = "يعود بصحيح إذا كانت أضواء الروبوت Loti-bot تعمل بشكل صحيح.";
Blockly.Msg["SENSORS_GET_HEADING_TITLE"] = "الاتجاه";
Blockly.Msg["SENSORS_GET_HEADING_TOOLTIP"] = "يعود بالاتجاه الحالي للروبوت Loti-bot من 1 إلى 8 (1: الشمال، 3: الشرق، 5: الجنوب، 7: الغرب).";
Blockly.Msg["SENSORS_GET_DISTANCE_TITLE"] = "المسافة";
Blockly.Msg["SENSORS_GET_DISTANCE_TOOLTIP"] = "يعود بالمسافة التي يكتشفها جهاز استشعار المسافة في الروبوت Loti-bot.";
Blockly.Msg["SENSORS_GET_LIGHT_LEVEL_TITLE"] = "مستوى الضوء البيئي";
Blockly.Msg["SENSORS_GET_LIGHT_LEVEL_TOOLTIP"] = "يعود بمستوى الضوء الذي يكتشفه جهاز استشعار الضوء في الروبوت Loti-bot.";
Blockly.Msg["SENSORS_GET_SOUND_LEVEL_TITLE"] = "مستوى الصوت البيئي";
Blockly.Msg["SENSORS_GET_SOUND_LEVEL_TOOLTIP"] = "يعود بمستوى الصوت الذي يكتشفه جهاز استشعار الصوت في الروبوت Loti-bot.";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TITLE"] = "درجة الحرارة";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TOOLTIP"] = "يعود بدرجة الحرارة التي يكتشفها جهاز استشعار الحرارة في الروبوت Loti-bot.";
Blockly.Msg["SENSORS_GET_BATTERY_LEVEL_TITLE"] = "مستوى البطارية";
Blockly.Msg["SENSORS_GET_BATTERY_LEVEL_TOOLTIP"] = "يعود بمستوى البطارية الحالي للروبوت Loti-bot بالنسبة المئوية.";

// Actuators
Blockly.Msg['ACTUATORS_SET_MOTORS_TITLE'] = '%1 لمسافة %2 سم بسرعة %3';
Blockly.Msg['ACTUATORS_SET_MOTORS_TOOLTIP'] = 'يتيح لروبوت Loti-bot التحرك للأمام أو الخلف بسرعة معينة (بطيء، متوسط، أو سريع).';
Blockly.Msg['ACTUATORS_ROTATE_WITH_ANGLE_TITLE'] = 'يدور %1 بمقدار %2 ° بسرعة %3';
Blockly.Msg['ACTUATORS_ROTATE_WITH_ANGLE_TOOLTIP'] = 'يتيح لروبوت Loti-bot الدوران بزاوية X° بسرعة معينة (بطيء، متوسط، أو سريع).';
Blockly.Msg['ACTUATORS_DRAW_SQUARE_TITLE'] = 'رسم مربع بطول ضلع %1 ملم';
Blockly.Msg['ACTUATORS_DRAW_SQUARE_TOOLTIP'] = 'يتيح لروبوت لوتي-بوت التحرك بتشكيل مربع.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'إيقاف المحركات';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'يتيح إيقاف محركات الروبوت Loti-bot.';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TITLE'] = 'تشغيل الصوت رقم %1';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TOOLTIP'] = 'يتيح تشغيل صوت بين 1 و 20.';
Blockly.Msg['ACTUATORS_GO_FORWARD'] = "للأمام";
Blockly.Msg['ACTUATORS_GO_BACKWARD'] = "للخلف";
Blockly.Msg["ACTUATORS_SLOW"] = "بطيء";
Blockly.Msg["ACTUATORS_MEDIUM"] = "متوسط";
Blockly.Msg["ACTUATORS_FAST"] = "سريع";