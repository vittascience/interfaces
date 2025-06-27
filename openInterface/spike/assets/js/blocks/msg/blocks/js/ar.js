/**
 * @fileoverview Arabic messages for Lego Spike. (AR)
 */

'use strict';

// Display
Blockly.Msg['DISPLAY_SHOW_LEDS_TOOLTIP'] = "يتيح تغيير لون مصابيح LED في المصفوفة 3x3.";
Blockly.Msg['DISPLAY_SET_PIXEL_TITLE'] = "%1 التحكم في LED x %2 y %3 %4";
Blockly.Msg['DISPLAY_SET_PIXEL_TOOLTIP'] = "يتيح تغيير لون مصباح LED في المصفوفة 3x3.";
Blockly.Msg['DISPLAY_SET_INTENSITY_TITLE'] = "%1 ضبط الكثافة %2 %";
Blockly.Msg['DISPLAY_SET_INTENSITY_TOOLTIP'] = "يتيح تغيير شدة الإضاءة لمصابيح LED في المصفوفة 3x3.";

// Actuators
Blockly.Msg['ACTUATORS_START_MOTOR_CONTINUOUS_TITLE'] = "%1 بدء المحرك %2 السرعة %3 % باستمرار";
Blockly.Msg['ACTUATORS_START_MOTOR_CONTINUOUS_TOOLTIP'] = "يبدأ المحرك في الاتجاه المحدد بالسرعة المعطاة باستمرار.";
Blockly.Msg['ACTUATORS_START_MOTOR_FOR_TIME_TITLE'] = "%1 بدء المحرك %2 السرعة %3 % لمدة %4 ثوانٍ";
Blockly.Msg['ACTUATORS_START_MOTOR_FOR_TIME_TOOLTIP'] = "يبدأ المحرك في الاتجاه المحدد بالسرعة المعطاة للمدة المحددة.";
Blockly.Msg['ACTUATORS_MOVE_MOTOR_TO_POSITION_TITLE'] = "%1 تحريك المحرك إلى الموضع %2 ° السرعة %3 %";
Blockly.Msg['ACTUATORS_MOVE_MOTOR_TO_POSITION_TOOLTIP'] = "يحرك المحرك إلى الموضع المحدد بالسرعة المعطاة.";
Blockly.Msg['ACTUATORS_STOP_MOTOR_TITLE'] = "%1 إيقاف المحرك";
Blockly.Msg['ACTUATORS_STOP_MOTOR_TOOLTIP'] = "يوقف المحرك.";
Blockly.Msg['ACTUATORS_MOVE_MOTORS_BY_DEGREES_TITLE'] = "%1 تحريك المحرك %2 بمقدار %3 ° السرعة %4 %";
Blockly.Msg['ACTUATORS_MOVE_MOTORS_BY_DEGREES_TOOLTIP'] = "يحرك المحرك بعدد الدرجات المحددة في الاتجاه المعطى بالسرعة المحددة.";

// Communication
Blockly.Msg['COMMUNICATION_SPEECH_SYNTHESIS_SAY_TITLE'] = 'قل %1 بـ %2';
Blockly.Msg['COMMUNICATION_SPEECH_SYNTHESIS_SAY_TOOLTIP'] = 'يتيح للجهاز التحدث باللغة المحددة.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'كتابة في وحدة التحكم %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'يتيح كتابة البيانات في المنفذ التسلسلي.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'مع';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'سطر جديد/أسطر جديدة';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'رسم الرسم البياني';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'يتيح هذا الكتلة كتابة بيانات (رقمية) ستكون مرئية في الرسام البياني. يمكن استخدامه مع كتلة أو أكثر بتنسيق "الاسم" و "البيانات". لمشاهدة الرسوم البيانية، انقر على أيقونة "وضع الرسوم البيانية" في وحدة التحكم.';
Blockly.Msg['COMMUNICATION_DATA'] = 'بيانات';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'الاسم %1 القيمة %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'يستخدم هذا الكتلة مع كتلة "رسم الرسم البياني". يجب أن تحتوي على اسم القيمة لعرضها (نص) والقيمة نفسها (رقم).';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'انتظار %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'يقوم بإيقاف تنفيذ الشفرة مؤقتاً.';
Blockly.Msg['IO_WAIT_SECOND'] = 'ثانية/ثوانٍ';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'مللي ثانية/ثوانٍ';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'ميكرو ثانية/ثوانٍ';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'انتظار حتى %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'يوقف تنفيذ الشفرة حتى يتم استيفاء الشرط.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'بدء الكرونومتر';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'يبدأ كرونومتر من 0 (بالثواني).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'قيمة الكرونومتر في %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'يعيد قيمة الكرونومتر منذ البدء (بالثواني أو المللي ثانية).';

// Actuators
Blockly.Msg['ACTUATORS_MOVE_FORWARD_TITLE'] = 'التقدم للأمام';
Blockly.Msg['ACTUATORS_MOVE_FORWARD_TOOLTIP'] = 'يتيح لروبوت Lego Spike التحرك للأمام.';
Blockly.Msg['ACTUATORS_MOVE_BACKWARD_TITLE'] = 'التراجع';
Blockly.Msg['ACTUATORS_MOVE_BACKWARD_TOOLTIP'] = 'يتيح لروبوت Lego Spike التحرك للخلف.';
Blockly.Msg['ACTUATORS_TURN_LEFT_45_DEGREES_TITLE'] = 'الانعطاف لليسار بمقدار 45°';
Blockly.Msg['ACTUATORS_TURN_LEFT_45_DEGREES_TOOLTIP'] = 'يتيح لروبوت Lego Spike الانعطاف لليسار بمقدار 45°.';
Blockly.Msg['ACTUATORS_TURN_LEFT_90_DEGREES_TITLE'] = 'الانعطاف لليسار بمقدار 90°';
Blockly.Msg['ACTUATORS_TURN_LEFT_90_DEGREES_TOOLTIP'] = 'يتيح لروبوت Lego Spike الانعطاف لليسار بمقدار 90°.';
Blockly.Msg['ACTUATORS_TURN_RIGHT_45_DEGREES_TITLE'] = 'الانعطاف لليمين بمقدار 45°';
Blockly.Msg['ACTUATORS_TURN_RIGHT_45_DEGREES_TOOLTIP'] = 'يتيح لروبوت Lego Spike الانعطاف لليمين بمقدار 45°.';
Blockly.Msg['ACTUATORS_TURN_RIGHT_90_DEGREES_TITLE'] = 'الانعطاف لليمين بمقدار 90°';
Blockly.Msg['ACTUATORS_TURN_RIGHT_90_DEGREES_TOOLTIP'] = 'يتيح لروبوت Lego Spike الانعطاف لليمين بمقدار 90°.';

// Sensors
Blockly.Msg['SENSORS_COLOR_TITLE'] = '%1 اللون المكتشف';
Blockly.Msg['SENSORS_COLOR_TOOLTIP'] = 'يعيد اللون المكتشف كـ سلسلة نصية (أسود، بنفسجي، أرجواني، أزرق، أزرق';
Blockly.Msg['SENSORS_COLOR_DETECTION_TITLE'] = '%1 اللون المكتشف هو %2';
Blockly.Msg['SENSORS_COLOR_DETECTION_TOOLTIP'] = 'يُرجع صحيحًا إذا كان اللون المكتشف يطابق اللون المحدد.';
