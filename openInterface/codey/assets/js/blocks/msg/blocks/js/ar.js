/**
 * @fileoverview Arabic messages for Codey. (AR)
 * Not translated yet.
 */

'use strict';

// Display
Blockly.Msg['DISPLAY_SHOWRGB_TITLE'] = '[الضوء المدمج] أحمر %1 أخضر %2 أزرق %3';
Blockly.Msg['DISPLAY_SHOWRGB_TOOLTIP'] = 'يعرض اللون المحدد على ضوء Codey المدمج بتنسيق RGB (من 0 إلى 255).';
Blockly.Msg['DISPLAY_SETRED_TITLE'] = '[الضوء المدمج] شدة اللون الأحمر %1';
Blockly.Msg['DISPLAY_SETRED_TOOLTIP'] = 'يضبط شدة اللون الأحمر للضوء المدمج في Codey (من 0 إلى 255).';
Blockly.Msg['DISPLAY_SETGREEN_TITLE'] = '[الضوء المدمج] شدة اللون الأخضر %1';
Blockly.Msg['DISPLAY_SETGREEN_TOOLTIP'] = 'يضبط شدة اللون الأخضر للضوء المدمج في Codey (من 0 إلى 255).';
Blockly.Msg['DISPLAY_SETBLUE_TITLE'] = '[الضوء المدمج] شدة اللون الأزرق %1';
Blockly.Msg['DISPLAY_SETBLUE_TOOLTIP'] = 'يضبط شدة اللون الأزرق للضوء المدمج في Codey (من 0 إلى 255).';
Blockly.Msg['DISPLAY_OFF_TITLE'] = '[الضوء المدمج] إيقاف التشغيل';
Blockly.Msg['DISPLAY_OFF_TOOLTIP'] = 'يطفئ الضوء المدمج في Codey.';
Blockly.Msg['DISPLAY_SHOW_TITLE'] = '[الشاشة] عرض %1';
Blockly.Msg['DISPLAY_SHOW_TOOLTIP'] = 'يعرض النص المحدد على شاشة LED الخاصة بـ Codey.';
Blockly.Msg['DISPLAY_SETPIXEL_TITLE'] = '[الشاشة] البكسل X %1 Y %2 الحالة %3';
Blockly.Msg['DISPLAY_SETPIXEL_TOOLTIP'] = 'يضبط حالة البكسل في الموضع X و Y في شاشة Codey.';
Blockly.Msg['DISPLAY_GETPIXEL_TITLE'] = '[الشاشة] حالة البكسل X %1 Y %2';
Blockly.Msg['DISPLAY_GETPIXEL_TOOLTIP'] = 'يعيد حالة البكسل في الموضع X و Y في شاشة Codey.';
Blockly.Msg['DISPLAY_TOGGLEPIXEL_TITLE'] = '[الشاشة] تبديل حالة البكسل X %1 Y %2';
Blockly.Msg['DISPLAY_TOGGLEPIXEL_TOOLTIP'] = 'يعكس حالة البكسل في الموضع X و Y في شاشة Codey.';
Blockly.Msg['DISPLAY_CLEAR_TITLE'] = '[الشاشة] مسح';
Blockly.Msg['DISPLAY_CLEAR_TOOLTIP'] = 'يمسح محتوى شاشة LED في Codey.';
// IO
Blockly.Msg['IO_DIGITAL_SIGNAL_TITLE'] = '%1';
Blockly.Msg['IO_DIGITAL_SIGNAL_HIGH'] = 'مرتفع (1)';
Blockly.Msg['IO_DIGITAL_SIGNAL_LOW'] = 'منخفض (0)';
Blockly.Msg['IO_DIGITAL_SIGNAL_TOOLTIP'] = 'يعيد قيمة منطقية (1 إذا كانت مرتفعة، أو 0 إذا كانت منخفضة).';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'انتظر %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'يوقف تنفيذ الكود مؤقتًا.';
Blockly.Msg['IO_WAIT_SECOND'] = 'ثانية/ثواني';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'مللي ثانية';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'ميكرو ثانية';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'انتظر حتى %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'يوقف تنفيذ الكود حتى يتم تحقق الشرط.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'ابدأ المؤقت';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'يبدأ مؤقتًا من الصفر (بالثواني).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'قيمة المؤقت بـ %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'يعيد قيمة المؤقت منذ بدايته (بالثواني أو المللي ثانية).';
Blockly.Msg['IO_ONBUTTONPRESSED_TITLE'] = 'إذا تم الضغط على الزر %1 فـ';
Blockly.Msg['IO_ONBUTTONPRESSED_TOOLTIP'] = 'ينفذ التعليمات إذا تم الضغط على الزر A أو B أو C.';
Blockly.Msg['IO_BUTTON_STATE_TITLE'] = 'حالة الزر %1';
Blockly.Msg['IO_BUTTON_STATE_TOOLTIP'] = 'يعيد حالة الزر A أو B أو C (صحيح/خطأ).';
Blockly.Msg['IO_POTENTIOMETER_GET_VALUE_TITLE'] = 'قيمة المقاومة المتغيرة';
Blockly.Msg['IO_POTENTIOMETER_GET_VALUE_TOOLTIP'] = 'يعيد قيمة المقاومة المتغيرة (من 0 إلى 100).';

// Communication 
Blockly.Msg['COMMUNICATION_IRRECEIVE_TITLE'] = '[IR] استلام بالأشعة تحت الحمراء';
Blockly.Msg['COMMUNICATION_IRRECEIVE_TOOLTIP'] = 'يعيد النص المستلم عبر المستقبل بالأشعة تحت الحمراء. يجب أن تنتهي البيانات بـ \\n.';
Blockly.Msg['COMMUNICATION_IRRECEIVEREMOTECODE_TITLE'] = '[IR] استلام (NEC)';
Blockly.Msg['COMMUNICATION_IRRECEIVEREMOTECODE_TOOLTIP'] = 'يعيد آخر كود تم استلامه بتنسيق NEC كمصفوفة (العنوان، المحتوى).';
Blockly.Msg['COMMUNICATION_IRSEND_TITLE'] = '[IR] إرسال %1';
Blockly.Msg['COMMUNICATION_IRSEND_TOOLTIP'] = 'يرسل سلسلة من الأحرف عبر الأشعة تحت الحمراء.';
Blockly.Msg['COMMUNICATION_IRSTARTLEARNING_TITLE'] = '[IR] بدء التعلم بالأشعة تحت الحمراء';
Blockly.Msg['COMMUNICATION_IRSTARTLEARNING_TOOLTIP'] = 'يبدأ تعلم إشارة بالأشعة تحت الحمراء (يدعم فقط NEC).';
Blockly.Msg['COMMUNICATION_IRSTOPLEARNING_TITLE'] = '[IR] إيقاف التعلم بالأشعة تحت الحمراء';
Blockly.Msg['COMMUNICATION_IRSTOPLEARNING_TOOLTIP'] = 'يوقف تعلم الإشارة بالأشعة تحت الحمراء.';
Blockly.Msg['COMMUNICATION_IRSAVELEARNEDRESULT_TITLE'] = '[IR] حفظ الإشارة في الفهرس %1';
Blockly.Msg['COMMUNICATION_IRSAVELEARNEDRESULT_TOOLTIP'] = 'يحفظ الإشارة المستلمة في ذاكرة Codey (من 0 إلى 15).';
Blockly.Msg['COMMUNICATION_IRSENDLEARNEDRESULT_TITLE'] = '[IR] إرسال الإشارة من الفهرس %1';
Blockly.Msg['COMMUNICATION_IRSENDLEARNEDRESULT_TOOLTIP'] = 'يرسل الإشارة المخزنة من ذاكرة Codey.';
Blockly.Msg['COMMUNICATION_IRLEARN_TITLE'] = '[IR] تعلم لمدة %1 ث';
Blockly.Msg['COMMUNICATION_IRLEARN_TOOLTIP'] = 'يتعلم إشارة بالأشعة تحت الحمراء لمدة محددة.';

// Sensors 
Blockly.Msg['SENSORS_GETROTATION_EULER_ANGLES_TITLE'] = '%1';
Blockly.Msg['SENSORS_GETROTATION_EULER_ANGLES_TOOLTIP'] = 'يعيد زاوية الدوران حول المحور المحدد (س، ص، ع).';
Blockly.Msg['SENSORS_PITCH'] = 'ميل';
Blockly.Msg['SENSORS_ROLL'] = 'تدحرج';
Blockly.Msg['SENSORS_YAW'] = 'انعطاف';
Blockly.Msg['SENSORS_GETROTATION_TITLE'] = 'الزاوية حول المحور %1';
Blockly.Msg['SENSORS_GETROTATION_TOOLTIP'] = 'يعيد زاوية دوران Codey حول المحاور. الاتجاه المعاكس لعقارب الساعة يعتبر موجبًا.';
Blockly.Msg['SENSORS_RESETROTATION_TITLE'] = 'إعادة تعيين الزاوية على المحور %1';
Blockly.Msg['SENSORS_RESETROTATION_TOOLTIP'] = 'يعيد الزاوية إلى 0 على المحور المحدد.';
Blockly.Msg['SENSORS_ALL_AXIS'] = 'جميع المحاور';
Blockly.Msg['SENSORS_IS_SHAKED_TITLE'] = 'هل تم الاهتزاز؟';
Blockly.Msg['SENSORS_IS_SHAKED_TOOLTIP'] = 'يعيد صحيح إذا تم اكتشاف اهتزاز.';
Blockly.Msg['SENSORS_GET_SHAKE_STRENGTH_TITLE'] = 'شدة الاهتزاز';
Blockly.Msg['SENSORS_GET_SHAKE_STRENGTH_TOOLTIP'] = 'يعيد شدة آخر اهتزاز تم اكتشافه.';
Blockly.Msg['SENSORS_GETPOSITION_TITLE'] = '%1؟';
Blockly.Msg['SENSORS_IS_TILTED_LEFT'] = 'مائل إلى اليسار';
Blockly.Msg['SENSORS_IS_TILTED_RIGHT'] = 'مائل إلى اليمين';
Blockly.Msg['SENSORS_IS_EARS_UP'] = 'الأذنين لأعلى';
Blockly.Msg['SENSORS_IS_EARS_DOWN'] = 'الأذنين لأسفل';
Blockly.Msg['SENSORS_IS_DISPLAY_UP'] = 'الشاشة لأعلى';
Blockly.Msg['SENSORS_IS_DISPLAY_DOWN'] = 'الشاشة لأسفل';
Blockly.Msg['SENSORS_IS_UPRIGHT'] = 'في وضع قائم';
Blockly.Msg['SENSORS_GETPOSITION_TOOLTIP'] = 'يعيد صحيح إذا كان الجهاز في الوضع المحدد.';
Blockly.Msg['SENSORS_GETACCELERATION_TITLE'] = 'تسارع على %1';
Blockly.Msg['SENSORS_GETACCELERATION_TOOLTIP'] = 'يعيد قيمة التسارع على المحور المحدد أو القوة الكلية.';
Blockly.Msg['SENSORS_GETGYROSCOPE_TITLE'] = 'جيروسكوب على المحور %1';
Blockly.Msg['SENSORS_GETGYROSCOPE_TOOLTIP'] = 'يعيد قيمة الجيروسكوب على المحور المحدد.';
Blockly.Msg['SENSORS_GET_LOUDNESS_TITLE'] = 'مستوى الصوت';
Blockly.Msg['SENSORS_GET_LOUDNESS_TOOLTIP'] = 'يعيد مستوى الصوت (من 0 إلى 100).';
Blockly.Msg['SENSORS_GET_LIGHT_TITLE'] = 'قيمة مستشعر الضوء';
Blockly.Msg['SENSORS_GET_LIGHT_TOOLTIP'] = 'يعيد قيمة مستشعر الضوء (من 0 إلى 100).';

// Actuators
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_TITLE'] = 'تشغيل الصوت %1';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_TOOLTIP'] = 'يشغل لحنًا محددًا مسبقًا.';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_UNTIL_DONE_TITLE'] = 'تشغيل الصوت %1 حتى النهاية';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_UNTIL_DONE_TOOLTIP'] = 'يشغل اللحن وينتظر حتى ينتهي.';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_NOTE_TITLE'] = 'تشغيل النغمة %1';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_NOTE_TOOLTIP'] = 'يشغل نغمة موسيقية.';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_TITLE'] = 'تشغيل التردد %1 هرتز';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_TOOLTIP'] = 'يشغل صوتًا بتردد معين.';
Blockly.Msg['ACTUATORS_AUDIO_REST_TITLE'] = 'توقف لمدة %1 زمن';
Blockly.Msg['ACTUATORS_AUDIO_REST_TOOLTIP'] = 'يُدخل توقفًا مؤقتًا في الموسيقى.';
Blockly.Msg['ACTUATORS_AUDIO_STOP_SOUNDS_TITLE'] = 'إيقاف جميع الأصوات';
Blockly.Msg['ACTUATORS_AUDIO_STOP_SOUNDS_TOOLTIP'] = 'يوقف جميع الأصوات الحالية.';
Blockly.Msg['ACTUATORS_AUDIO_SET_VOLUME_TITLE'] = 'ضبط مستوى الصوت إلى %1';
Blockly.Msg['ACTUATORS_AUDIO_SET_VOLUME_TOOLTIP'] = 'يضبط مستوى الصوت.';
Blockly.Msg['ACTUATORS_AUDIO_GET_VOLUME_TITLE'] = 'الحصول على مستوى الصوت';
Blockly.Msg['ACTUATORS_AUDIO_GET_VOLUME_TOOLTIP'] = 'يعيد مستوى الصوت الحالي.';
Blockly.Msg['ACTUATORS_AUDIO_SET_TEMPO_TITLE'] = 'ضبط الإيقاع إلى %1';
Blockly.Msg['ACTUATORS_AUDIO_SET_TEMPO_TOOLTIP'] = 'يضبط الإيقاع للأصوات.';
Blockly.Msg['ACTUATORS_AUDIO_GET_TEMPO_TITLE'] = 'الحصول على الإيقاع';
Blockly.Msg['ACTUATORS_AUDIO_GET_TEMPO_TOOLTIP'] = 'يعيد الإيقاع الحالي.';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_DURATION'] = 'لمدة';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_NOTE_DURATION'] = Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_DURATION'];

// Robots
Blockly.Msg['ROBOTS_STOP_TITLE'] = '[Rocky] إيقاف المحركات';
Blockly.Msg['ROBOTS_STOP_TOOLTIP'] = 'يوقف جميع محركات الروبوت Rocky.';
Blockly.Msg['ROBOTS_MOVE_TITLE'] = '[Rocky] %1 بسرعة %2';
Blockly.Msg['ROBOTS_MOVE_TOOLTIP'] = 'يحرك الروبوت Rocky في الاتجاه المحدد بالسرعة المحددة (+/- 100).';
Blockly.Msg['ROBOTS_FORWARD'] = 'تحرك للأمام';
Blockly.Msg['ROBOTS_BACKWARD'] = 'تحرك للخلف';
Blockly.Msg['ROBOTS_LEFT'] = 'انعطف يسارًا';
Blockly.Msg['ROBOTS_RIGHT'] = 'انعطف يمينًا';
Blockly.Msg['ROBOTS_DRIVE_TITLE'] = '[Rocky] سرعة المحرك الأيسر %1 الأيمن %2';
Blockly.Msg['ROBOTS_DRIVE_TOOLTIP'] = 'يضبط سرعة المحركين الأيسر والأيمن للروبوت Rocky (+/- 100).';
Blockly.Msg['ROBOTS_TURN_BY_DEGREE_TITLE'] = '[Rocky] %1 بمقدار %2 درجة';
Blockly.Msg['ROBOTS_TURN_BY_DEGREE_TOOLTIP'] = 'يدور الروبوت Rocky بعدد معين من الدرجات (+/- 360).';
Blockly.Msg['ROBOTS_SENSORS_GET_RGB_TITLE'] = '[Rocky] مستشعر اللون مستوى %1';
Blockly.Msg['ROBOTS_SENSORS_RED'] = 'أحمر';
Blockly.Msg['ROBOTS_SENSORS_GREEN'] = 'أخضر';
Blockly.Msg['ROBOTS_SENSORS_BLUE'] = 'أزرق';
Blockly.Msg['ROBOTS_SENSORS_GET_RGB_TOOLTIP'] = 'يعيد قيمة مستشعر اللون بالأشعة تحت الحمراء للون المحدد (أحمر، أخضر، أزرق).';
Blockly.Msg['ROBOTS_SENSORS_IS_COLOR_TITLE'] = '[Rocky] هل اللون %1؟';
Blockly.Msg['ROBOTS_SENSORS_IS_COLOR_TOOLTIP'] = 'يعيد صحيح إذا كشف المستشعر اللون المحدد (أحمر، أخضر، أزرق، أصفر، سماوي، أرجواني، أبيض، أسود).';
Blockly.Msg['ROBOTS_SENSORS_YELLOW'] = 'أصفر';
Blockly.Msg['ROBOTS_SENSORS_CYAN'] = 'سماوي';
Blockly.Msg['ROBOTS_SENSORS_MAGENTA'] = 'أرجواني';
Blockly.Msg['ROBOTS_SENSORS_WHITE'] = 'أبيض';
Blockly.Msg['ROBOTS_SENSORS_BLACK'] = 'أسود';
Blockly.Msg['ROBOTS_SENSORS_GET_LIGHT_TITLE'] = '[Rocky] مستشعر الضوء مستوى %1';
Blockly.Msg['ROBOTS_SENSORS_AMBIENT'] = 'الضوء المحيط';
Blockly.Msg['ROBOTS_SENSORS_REFLECTED'] = 'الضوء المنعكس';
Blockly.Msg['ROBOTS_SENSORS_GREYNESS'] = 'مستوى الرمادي';
Blockly.Msg['ROBOTS_SENSORS_GET_LIGHT_TOOLTIP'] = 'يعيد قيمة مستشعر الضوء بالأشعة تحت الحمراء حسب النوع المحدد (محبط، منعكس، رمادي).';
Blockly.Msg['ROBOTS_SENSORS_IS_OBSTACLE_AHEAD_TITLE'] = '[Rocky] هل يوجد عائق أمامه؟';
Blockly.Msg['ROBOTS_SENSORS_IS_OBSTACLE_AHEAD_TOOLTIP'] = 'يعيد صحيح إذا تم الكشف عن عائق أمام الروبوت Rocky.';
Blockly.Msg['ROBOTS_SENSORS_SET_LED_COLOR_TITLE'] = '[Rocky] لون LED %1';
Blockly.Msg['ROBOTS_SENSORS_SET_LED_COLOR_TOOLTIP'] = 'يضبط لون LED في الروبوت Rocky (أحمر، أخضر، أزرق، أصفر، سماوي، أرجواني، أبيض، أسود).';
