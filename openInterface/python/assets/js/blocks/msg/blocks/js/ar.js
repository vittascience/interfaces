/**
 * @fileoverview Arabic messages for Python. (AR)
 */

'use strict';

// Display - console.
Blockly.Msg["DISPLAY_PRINT_TITLE"] = "طباعة %1";
Blockly.Msg["DISPLAY_PRINT_TOOLTIP"] = "طباعة محتوى الكتلة في وحدة تحكم Python.";
Blockly.Msg["DISPLAY_INPUT_TITLE"] = "اطلب من المستخدم نصًا عبر %1";
Blockly.Msg["DISPLAY_INPUT_TOOLTIP"] = "اطلب من المستخدم إدخال قيمة كنص في وحدة تحكم Python.";
Blockly.Msg["DISPLAY_INPUT_NUMBER_TITLE"] = "اطلب من المستخدم رقمًا عبر %1";
Blockly.Msg["DISPLAY_INPUT_NUMBER_TOOLTIP"] = "اطلب من المستخدم إدخال قيمة عددية (عشرية) في وحدة تحكم Python.";
// Display - time
Blockly.Msg["TIME_SLEEP_TITLE"] = "[time] انتظر %1 %2";
Blockly.Msg["TIME_SLEEP_TOOLTIP"] = "إيقاف تنفيذ الكود (المدة بالثواني أو بالميلي ثانية).";
Blockly.Msg["TIME_SLEEP_SECOND"] = "ثانية/ثوانٍ";
Blockly.Msg["TIME_SLEEP_MILLISECOND"] = "ميلي ثانية/ميلي ثوانٍ";
Blockly.Msg["TIME_SLEEP_MICROSECOND"] = "ميكروثانية/ميكروثوانٍ";
Blockly.Msg['TIME_TIME_TITLE'] = 'الحصول على الوقت الحالي بالثواني';
Blockly.Msg["TIME_WAIT_UNTIL_TITLE"] = "[time] انتظر حتى %1";
Blockly.Msg["TIME_WAIT_UNTIL_TOOLTIP"] = "أوقف تنفيذ الكود حتى يتحقق الشرط.";
Blockly.Msg["TIME_INITCHRONOMETER_TITLE"] = "[time] تهيئة الكرونومتر";
Blockly.Msg["TIME_INITCHRONOMETER_TOOLTIP"] = "يتيح تهيئة الكرونومتر (بالثواني).";
Blockly.Msg["TIME_GETCHRONOMETER_TITLE"] = "[time] احصل على الكرونومتر بوحدة %1";
Blockly.Msg["TIME_GETCHRONOMETER_TOOLTIP"] = "يعيد قيمة الكرونومتر منذ التهيئة بوحدة ثوانٍ أو ميلي ثانية.";
Blockly.Msg["TIME_GET_DATE_TITLE"] = "[time] الحصول على التاريخ والوقت";
Blockly.Msg["TIME_GET_DATE_TOOLTIP"] = "يعيد التاريخ والوقت منسقًا كسلسلة نصية.";
// Turtle blocks.
Blockly.Msg["TURTLE_DIRECTION_TITLE"] = "حرك %1 بمقدار %2";
Blockly.Msg["TURTLE_DIRECTION_FORWARD"] = "إلى الأمام";
Blockly.Msg["TURTLE_DIRECTION_BACKWARD"] = "إلى الخلف";
Blockly.Msg["TURTLE_DIRECTION_TOOLTIP"] = "تحرك بتحديد الاتجاه والمسافة.";
Blockly.Msg["TURTLE_TURN_TITLE"] = "دوّر %1 بمقدار %2°";
Blockly.Msg["TURTLE_TURN_RIGHT"] = "يمين ↻";
Blockly.Msg["TURTLE_TURN_LEFT"] = "يسار ↺";
Blockly.Msg["TURTLE_TURN_TOOLTIP"] = "استدرّ بتحديد قيمة الزاوية.";
Blockly.Msg["TURTLE_GOTO_TITLE"] = "اذهب إلى الموضع x %1 y %2";
Blockly.Msg["TURTLE_GOTO_TOOLTIP"] = "اذهب إلى الإحداثيات المحددة (x و y).";
Blockly.Msg["TURTLE_CIRCLE_TITLE"] = "ارسم دائرة بنصف قطر %1";
Blockly.Msg["TURTLE_CIRCLE_TOOLTIP"] = "أنشئ دائرة بتحديد نصف القطر.";
Blockly.Msg["TURTLE_ARC_TITLE"] = "ارسم قوسًا بنصف قطر %1 وزاوية %2°";
Blockly.Msg["TURTLE_ARC_TOOLTIP"] = "أنشئ قوسًا بتحديد نصف القطر والزاوية.";
Blockly.Msg["TURTLE_WRITE_TITLE"] = "اكتب %1 بحجم خط %2";
Blockly.Msg["TURTLE_WRITE_TOOLTIP"] = "اكتب نصًا بحجم الخط المحدد.";
Blockly.Msg["TURTLE_FILL_TITLE"] = "املأ باللون %1";
Blockly.Msg["TURTLE_FILL_TOOLTIP"] = "املأ الرسم باللون";
Blockly.Msg["TURTLE_SHAPE_TITLE"] = "اضبط الشكل %1";
Blockly.Msg["TURTLE_SHAPE_TURTLE"] = "سلحفاة 🐢";
Blockly.Msg["TURTLE_SHAPE_CIRCLE"] = "دائرة ⚫";
Blockly.Msg["TURTLE_SHAPE_CLASSIC"] = "كلاسيكي ➤";
Blockly.Msg["TURTLE_SHAPE_SQUARE"] = "مربع ⬛";
Blockly.Msg["TURTLE_SHAPE_TRIANGLE"] = "مثلث ▶";
Blockly.Msg["TURTLE_SHAPE_TOOLTIP"] = "اختر شكل المؤشر";
Blockly.Msg["TURTLE_COLOR_TITLE"] = "اضبط اللون %1 والعرض %2";
Blockly.Msg["TURTLE_COLOR_TOOLTIP"] = "لون وعرض الخطوط";
Blockly.Msg["TURTLE_PEN_TITLE"] = "ضع القلم %1";
Blockly.Msg["TURTLE_PEN_TOOLTIP"] = "ارفع أو اخفض القلم لرسم الخطوط";
Blockly.Msg['TURTLE_PEN_UP'] = 'up';
Blockly.Msg["TURTLE_PEN_DOWN"] = "لأسفل";
Blockly.Msg["TURTLE_VISIBILITY_TITLE"] = "%1 السلحفاة";
Blockly.Msg["TURTLE_VISIBILITY_TOOLTIP"] = "حدد ظهور السلحفاة";
Blockly.Msg["TURTLE_VISIBILITY_SHOW"] = "أظهر";
Blockly.Msg["TURTLE_VISIBILITY_HIDE"] = "أخفِ";
Blockly.Msg["TURTLE_STAMP_TITLE"] = "اطبع شكل السلحفاة";
Blockly.Msg["TURTLE_STAMP_TOOLTIP"] = "اطبع المؤشر في الموضع الحالي";
Blockly.Msg["TURTLE_SPEED_TITLE"] = "اضبط السرعة %1";
Blockly.Msg["TURTLE_SPEED_TOOLTIP"] = "حدد سرعة السلحفاة";
Blockly.Msg["TURTLE_RESET_TITLE"] = "إعادة تعيين الرسم";
Blockly.Msg["TURTLE_COLOR"] = "اضبط اللون %1";
Blockly.Msg["TURTLE_WIDTH"] = "اضبط العرض %1";
Blockly.Msg["TURTLE_FILLCOLOR"] = "املأ باللون %1";
Blockly.Msg["TURTLE_FILLBEGIN"] = "ابدأ التعبئة";
Blockly.Msg["TURTLE_FILLEND"] = "أنهِ التعبئة";
Blockly.Msg['TURTLE_SCREEN_SETUP_TITLE'] = 'حجم اللوحة %1 × %2';
Blockly.Msg['TURTLE_SCREEN_SETUP_TOOLTIP'] = 'تحديد حجم اللوحة.';
Blockly.Msg['TURTLE_SCREEN_COLOR_TITLE'] = 'لون خلفية اللوحة %1';
Blockly.Msg['TURTLE_SCREEN_COLOR_TOOLTIP'] = 'تحديد لون خلفية اللوحة.';
Blockly.Msg['TURTLE_SCREEN_PICTURE_TITLE'] = 'صورة خلفية اللوحة %1';
Blockly.Msg['TURTLE_SCREEN_PICTURE_TOOLTIP'] = 'تعيين صورة خلفية للوحة (canvas).';
Blockly.Msg['TURTLE_SCREEN_PICTURE_MAZE'] = 'متاهة';
Blockly.Msg['TURTLE_SCREEN_PICTURE_GRID'] = 'شبكة';
Blockly.Msg['TURTLE_SCREEN_PICTURE_VITTASCIENCE'] = 'vittascience';

// Numpy blocks.
Blockly.Msg["NUMPY_ARANGE_TITLE"] = "مصفوفة مرتبة من %1 إلى %2 بخطوة %3";
Blockly.Msg["NUMPY_ARANGE_TOOLTIP"] = "يعيد مصفوفة مرتبة من الحد الأدنى إلى الحد الأقصى بالخطوة المحددة.";
Blockly.Msg["NUMPY_LINSPACE_TITLE"] = "مصفوفة مرتبة من %1 إلى %2 بعدد قيم %3";
Blockly.Msg["NUMPY_LINSPACE_TOOLTIP"] = "يعيد مصفوفة مرتبة من الحد الأدنى إلى الحد الأقصى بعدد العناصر المختارة.";
Blockly.Msg["NUMPY_TABLE_WITH_SHAPE_TITLE"] = "مصفوفة بحجم %1 * %2 تحتوي على العنصر %3";
Blockly.Msg["NUMPY_TABLE_WITH_SHAPE_TOOLTIP"] = "تهيئ مصفوفة بالشكل [i*j] بقيمة واحدة.";
Blockly.Msg['NUMPY_CREATE_TABLE_WITH_TOOLTIP'] = 'إنشاء مصفوفة بعدد عناصر اختياري.';
Blockly.Msg["NUMPY_CREATE_TABLE_WITH_INPUT_TITLE"] = "إنشاء مصفوفة بـ";
Blockly.Msg["NUMPY_CREATE_TABLE_WITH_INPUT_TOOLTIP"] = "إنشاء مصفوفة بعدد عناصر اختياري.";
Blockly.Msg["NUMPY_CREATE_TABLE_EMPTY_TITLE"] = "إنشاء مصفوفة فارغة";
Blockly.Msg["NUMPY_CREATE_TABLE_EMPTY_TOOLTIP"] = "يعيد جدولًا بطول صفر لا يحتوي على سجلات بيانات";
Blockly.Msg['NUMPY_SQUARE_MATRIX_TITLE'] = 'مصفوفة بالعناصر';
Blockly.Msg["NUMPY_SQUARE_MATRIX_TOOLTIP"] = "تهيئة مصفوفة مربعة من أي نوع، بأحجام من 2 إلى 10.";
Blockly.Msg['NUMPY_SIZESHAPE_TITLE'] = '%1 of %2';
Blockly.Msg["NUMPY_SIZESHAPE_TOOLTIP"] = "يعيد الحجم أو الشكل لجدول numpy.";
Blockly.Msg["NUMPY_SIZE"] = "الحجم";
Blockly.Msg["NUMPY_SHAPE"] = "الشكل";
Blockly.Msg["NUMPY_GET_ELEMENT_MATRIX_TITLE"] = "الحصول على العنصر [%1, %2] من %3";
Blockly.Msg["NUMPY_GET_ELEMENT_MATRIX_TOOLTIP"] = "احصل على العنصر [i,j] من مصفوفة numpy.";
Blockly.Msg["NUMPY_GET_ELEMENT_LIST_TITLE"] = "الحصول على العنصر [%1] من %2";
Blockly.Msg["NUMPY_GET_ELEMENT_LIST_TOOLTIP"] = "احصل على العنصر [i] من مصفوفة numpy.";
// Graph blocks.
Blockly.Msg["GRAPH_PLOT_TITLE"] = "رسم %1 المحور السيني %2 المحور الصادي %3";
Blockly.Msg["GRAPH_PLOT_TOOLTIP"] = "عرض رسم بياني في وحدة تحكم بايثون.";
Blockly.Msg["GRAPH_SCATTER_TITLE"] = "رسم مخطط انتشار %1 المحور السيني %2 المحور الصادي %3";
Blockly.Msg["GRAPH_SCATTER_TOOLTIP"] = "عرض مخطط انتشار في وحدة تحكم بايثون.";
Blockly.Msg["GRAPH_BAR_TITLE"] = "رسم مخطط أعمدة %1 المحور السيني %2 المحور الصادي %3";
Blockly.Msg["GRAPH_BAR_TOOLTIP"] = "عرض مخطط أعمدة في وحدة تحكم بايثون.";
Blockly.Msg["GRAPH_HIST_TITLE"] = "رسم هيستوغرام %1 المحور السيني %2 المحور الصادي %3";
Blockly.Msg["GRAPH_HIST_TOOLTIP"] = "عرض هيستوغرام في وحدة تحكم بايثون.";
Blockly.Msg["GRAPH_SETLABEL_TITLE"] = "تعيين عنوان %1 تسمية المحور السيني %2 تسمية المحور الصادي %3";
Blockly.Msg["GRAPH_SETLABEL_TOOLTIP"] = "حدد عنوان الرسم والوسوم للمحور السيني والمحور الصادي.";
Blockly.Msg["GRAPH_LEGEND_TITLE"] = "تعيين وسيلة إيضاح %1 الموقع %2";
Blockly.Msg["GRAPH_LEGEND_TOOLTIP"] = "تفعيل وسيلة إيضاح للمخطط.";
Blockly.Msg["GRAPH_SHOW_TITLE"] = "عرض المخطط";
Blockly.Msg["GRAPH_SHOW_TOOLTIP"] = "عرض المخطط";
Blockly.Msg["GRAPH_SUBPLOT_TITLE"] = "مخطط فرعي %1 صف %2 عمود %3 فهرس %4";
Blockly.Msg["GRAPH_SUBPLOT_TOOLTIP"] = "إنشاء مخطط فرعي في وحدة تحكم بايثون.";
Blockly.Msg["GRAPH_GRID_TITLE"] = "عرض الشبكة";
Blockly.Msg["GRAPH_GRID_TOOLTIP"] = "إظهار شبكة على المخطط";
Blockly.Msg["GRAPH_TEXT_TITLE"] = "عرض نص %1 موضع x %2 موضع y %3 نص %4";
Blockly.Msg["GRAPH_TEXT_TOOLTIP"] = "عرض نص على المخطط";
Blockly.Msg["GRAPH_SET_TITLE"] = "تعيين العنوان %1";
Blockly.Msg["GRAPH_SET_X_TITLE"] = "تسمية المحور السيني %1";
Blockly.Msg["GRAPH_SET_Y_TITLE"] = "تسمية المحور الصادي %1";
Blockly.Msg["GRAPH_CREATE_PLOT_TITLE"] = "إنشاء مخطط مع %1 المحور السيني %2 المحور الصادي %3";
Blockly.Msg["GRAPH_CREATE_SCATTER_TITLE"] = "إنشاء مخطط انتشار مع %1 المحور السيني %2 المحور الصادي %3";
Blockly.Msg["GRAPH_CREATE_BAR_TITLE"] = "إنشاء مخطط أعمدة مع %1 المحور السيني %2 المحور الصادي %3";
Blockly.Msg["GRAPH_PLOT"] = "عرض الرسم البياني";
// Vittaia blocks.
Blockly.Msg['VITTAIA_INIT_MODEL'] = '%1 تهيئة النموذج';
Blockly.Msg["VITTAIA_WEBCAM_REFRESH"] = "تهيئة كاميرا الويب";
Blockly.Msg['VITTAIA_SELECT_CAMERA'] = '%1 اختيار الكاميرا %2';
Blockly.Msg['VITTAIA_CAPTURE'] = 'صورة الكاميرا';
Blockly.Msg['VITTAIA_PREDICT'] = '%1 تنفيذ الكشف على %2';
Blockly.Msg['VITTAIA_INIT_SOUND'] = '%1 تهيئة نموذج الصوت';
Blockly.Msg['VITTAIA_INIT_MICRO'] = '%1 تهيئة الميكروفون';
// AI IMAGE
Blockly.Msg['VITTAIA_LOAD_MODEL_TITLE'] = '%1 تحميل نموذج صور الذكاء الاصطناعي %2';
Blockly.Msg['VITTAIA_LOAD_MODEL_TOOLTIP'] = 'يقوم بتحميل نموذج الصور للذكاء الاصطناعي الممرَّر كمعامل. النموذج الافتراضي مخصّص للتعرف على القطط والكلاب. يمكنك إنشاء نموذج جديد من واجهة "تدريب الذكاء الاصطناعي" في Vittascience المتاحة في قسم البرمجة.';
Blockly.Msg['VITTAIA_LOAD_LOCAL_MODEL_TITLE'] = '%1 تحميل نموذج الصور المحلي للذكاء الاصطناعي';
Blockly.Msg['VITTAIA_LOAD_LOCAL_MODEL_TOOLTIP'] = 'يقوم بتحميل نموذج الصور المُدرَّب مسبقًا الموجود في ذاكرة المتصفح المحلية';
Blockly.Msg['VITTAIA_LOAD_MODEL_DEFAULT_TITLE'] = '%1 تحميل نموذج صور الذكاء الاصطناعي %2';
Blockly.Msg['VITTAIA_LOAD_MODEL_DEFAULT_TOOLTIP'] = 'يقوم بتحميل نموذج صور مدرّب مسبقًا. غيّر النموذج باستخدام الخيار.';
Blockly.Msg['VITTAIA_MODEL_DOGS_CATS'] = "كلاب وقطط";
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_WEBCAM_TITLE'] = '%1 بدء الكشف على صورة الكاميرا';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_WEBCAM_TOOLTIP'] = 'يجري تنبؤات باستخدام نموذج صورة الكاميرا. يحتوي التنبؤ على عنصرين: الفئة واحتمالية التنبؤ.';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_FILE_TITLE'] = '%1 بدء الكشف على الصورة المستوردة';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_FILE_TOOLTIP'] = 'يجري تنبؤات باستخدام نموذج الصورة المستوردة. يحتوي التنبؤ على عنصرين: الفئة واحتمالية التنبؤ.';
Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE'] = '%1 الفئة المكتشفة';
Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TOOLTIP'] = 'يعيد الفئة التي حصلت على أعلى احتمالية في نتائج النموذج.';
Blockly.Msg['VITTAIA_GET_CONFIDENCE_RATE_TITLE'] = '%1 معدل الثقة';
Blockly.Msg['VITTAIA_GET_CONFIDENCE_RATE_TOOLTIP'] = 'يعيد مستوى الثقة للفئة ذات أعلى احتمالية.';
Blockly.Msg['VITTAIA_GET_PREDICTIONS_TITLE'] = '%1 التنبؤات';
Blockly.Msg['VITTAIA_GET_PREDICTIONS_TOOLTIP'] = 'يعيد مصفوفة تحتوي على جميع تنبؤات النموذج.';
Blockly.Msg['VITTAIA_DETECT_CLASS_TITLE'] = '%1 إذا كانت الفئة %2 %3 مكتشفة ف';
Blockly.Msg['VITTAIA_IS'] = "is";
Blockly.Msg['VITTAIA_ISNOT'] = "ليست";
Blockly.Msg['VITTAIA_DETECT_CLASS_TOOLTIP'] = 'يبدأ الكشف باستخدام صورة من الكاميرا أو صورة مستوردة لإجراء تنبؤ، ويتحقق مما إذا كانت الفئة المشار إليها في الكتلة قد تم اكتشافها.';
Blockly.Msg['VITTAIA_IMAGE_UPLOADED_TITLE'] = '%1 صورة محمّلة';
Blockly.Msg['VITTAIA_IMAGE_UPLOADED_TOOLTIP'] = 'يتيح تحميل صورة من الحاسوب ليجري اختبارها لاحقًا بواسطة النموذج عبر إطلاق عملية كشف. اضغط على أيقونة \'تحميل\' في الكتلة لإضافة الصورة.';
Blockly.Msg['VITTAIA_WEBCAM_CAPTURE_TITLE'] = '%1 [الكاميرا] التقاط';
Blockly.Msg['VITTAIA_WEBCAM_CAPTURE_TOOLTIP'] = 'يتيح إجراء التقاط باستخدام كاميرا الحاسوب.';
Blockly.Msg['VITTAIA_WEBCAM_LIST_AVAILABLES_TITLE'] = '%1 [الكاميرا] قائمة الكاميرات المتاحة';
Blockly.Msg['VITTAIA_WEBCAM_LIST_AVAILABLES_TOOLTIP'] = 'يتيح سرد جميع الكاميرات المتاحة على الحاسوب.';
Blockly.Msg['VITTAIA_WEBCAM_INIT_TITLE'] = '%1 [الكاميرا] اختر الكاميرا %2';
Blockly.Msg['VITTAIA_WEBCAM_INIT_TOOLTIP'] = 'يتيح تهيئة كاميرا الحاسوب (الافتراضي 0).';
Blockly.Msg['VITTAIA_WEBCAM_REFRESH_TITLE'] = '%1 [الكاميرا] تحديث الكاميرا';
Blockly.Msg['VITTAIA_WEBCAM_REFRESH_TOOLTIP'] = 'يتيح تحديث نافذة الكاميرا.';

// AI POSTURE
Blockly.Msg['VITTAIA_INIT_MODEL_POSTURE_TITLE'] = '%1 تهيئة نموذج الوضعية';
Blockly.Msg['VITTAIA_INIT_MODEL_POSTURE_TOOLTIP'] = 'يقوم بتهيئة نموذج الوضعية. النموذج الافتراضي مخصص للتعرف على وضعيات الإنسان. يمكنك إنشاء نموذج جديد من خلال واجهة "تدريب الذكاء الاصطناعي" المتوفرة في قسم البرمجة.';
Blockly.Msg['VITTAIA_LOAD_POSTURE_MODEL_TITLE'] = '%1 تحميل نموذج الوضعية %2';
Blockly.Msg['VITTAIA_LOAD_POSTURE_MODEL_TOOLTIP'] = 'يحمّل النموذج المُمرر كوسيط.';
Blockly.Msg['VITTAIA_INIT_WEBCAM_TITLE'] = '%1 تهيئة الكاميرا';
Blockly.Msg['VITTAIA_INIT_WEBCAM_TOOLTIP'] = 'يهيئ الكاميرا المحددة.';
Blockly.Msg['VITTAIA_POSTURE_MAKE_PREDICTIONS_TITLE'] = '%1 تنفيذ التنبؤ على صورة الكاميرا';
Blockly.Msg['VITTAIA_POSTURE_MAKE_PREDICTIONS_TOOLTIP'] = 'يجري تنبؤات باستخدام نموذج الوضعية من الكاميرا. التنبؤ يتضمن عنصرين: الفئة والاحتمالية.';
Blockly.Msg['VITTAIA_INIT_POSTURE_WEBCAM_TITLE'] = '%1 [كاميرا] تهيئة الكاميرا';
Blockly.Msg['VITTAIA_INIT_POSTURE_WEBCAM_TOOLTIP'] = 'يهيئ الكاميرا (افتراضيًا على المنفذ 0).';
// AI SOUND
Blockly.Msg['VITTAIA_LOAD_SOUND_MODEL_TITLE'] = '%1 اختيار وتهيئة النموذج %2';
Blockly.Msg['VITTAIA_LOAD_SOUND_MODEL_TOOLTIP'] = 'يحمّل النموذج المُمرر كوسيط.';
Blockly.Msg['VITTAIA_INIT_MICROPHONE_TITLE'] = '%1 تهيئة الميكروفون';
Blockly.Msg['VITTAIA_INIT_MICROPHONE_TOOLTIP'] = 'يهيئ ميكروفون الحاسوب.';
Blockly.Msg['VITTAIA_MAKE_SOUND_PREDICTIONS_TITLE'] = '%1 بدء الكشف من صوت الميكروفون';
Blockly.Msg['VITTAIA_MAKE_SOUND_PREDICTIONS_TOOLTIP'] = 'يبدأ الكشف باستخدام صوت الميكروفون لتنفيذ تنبؤ.';
Blockly.Msg['VITTAIA_LIST_MICROPHONES_TITLE'] = '%1 عرض قائمة الميكروفونات';
Blockly.Msg['VITTAIA_LIST_MICROPHONES_TOOLTIP'] = 'يعرض جميع الميكروفونات المتوفرة.';
Blockly.Msg['VITTAIA_LIST_MICRTEXT_OPHONES_TOOLTIP'] = 'يعرض جميع الميكروفونات المتوفرة.';
// AI TEXT
Blockly.Msg['VITTAIA_INIT_TEXT_AI_TITLE'] = '%1 تهيئة نموذج النص';
Blockly.Msg['VITTAIA_INIT_TEXT_AI_TOOLTIP'] = 'يهيئ نموذج النص. النموذج الافتراضي مخصص للتعرف على النصوص. يمكنك إنشاء نموذج جديد من خلال واجهة "تدريب الذكاء الاصطناعي" في قسم البرمجة.';
Blockly.Msg['VITTAIA_INIT_DISCUSSION_TITLE'] = '%1 تهيئة المحادثة';
Blockly.Msg['VITTAIA_INIT_DISCUSSION_TOOLTIP'] = 'يهيئ المحادثة مع الذكاء الاصطناعي. النموذج الافتراضي مخصص للتعرف على النصوص. يمكنك إنشاء نموذج جديد من خلال واجهة "تدريب الذكاء الاصطناعي" في قسم البرمجة.';
Blockly.Msg['VITTAIA_LOAD_DISCUSSION_TITLE'] = '%1 اختيار المحادثة %2';
Blockly.Msg['VITTAIA_LOAD_DISCUSSION_TOOLTIP'] = 'يحمّل المحادثة المُمررة كوسيط.';
Blockly.Msg['VITTAIA_MODEL_TEXT_PREDICT_TITLE'] = '%1 تنفيذ التنبؤ للنص %2';
Blockly.Msg['VITTAIA_MODEL_TEXT_PREDICT_TOOLTIP'] = 'يقوم بتنفيذ التنبؤ للنص.';
Blockly.Msg['VITTAIA_GET_AI_MESSAGE_TITLE'] = 'عرض رد الذكاء الاصطناعي';
Blockly.Msg['VITTAIA_GET_AI_MESSAGE_TOOLTIP'] = 'يعرض رد الذكاء الاصطناعي.';
Blockly.Msg['VITTAIA_SET_RANDOMNESS_TITLE'] = '%1 تعيين نسبة العشوائية %2 %';
Blockly.Msg['VITTAIA_SET_RANDOMNESS_TOOLTIP'] = 'يحدد نسبة العشوائية في التنبؤ.';
Blockly.Msg['VITTAIA_SET_MODEL_IA_TITLE'] = '%1 تعيين نموذج الذكاء الاصطناعي %2';
Blockly.Msg['VITTAIA_SET_MODEL_IA_TOOLTIP'] = 'يحدد نموذج الذكاء الاصطناعي.';

Blockly.Msg['VITTAIA_TEXT_MODEL_GPT-3.5_TURBO'] = 'gpt-3.5';
Blockly.Msg['VITTAIA_TEXT_MODEL_LLAMA_3.1'] = 'llama-v3.1';
Blockly.Msg['VITTAIA_TEXT_MODEL_LLAMA_3.3'] = 'llama-v3.3';
Blockly.Msg['VITTAIA_TEXT_MODEL_GPT_4'] = 'gpt-4o';
Blockly.Msg['VITTAIA_TEXT_MODEL_MIXTRAL'] = 'mixtral';
Blockly.Msg['VITTAIA_TEXT_MODEL_GPT_MINI'] = 'gpt-4o-mini';

// Vittaia blocks. AST Python <-> Blocks
Blockly.Msg['VITTAIA_INIT_WEBCAM'] = '%1 تهيئة الكاميرا';
Blockly.Msg['VITTAIA_INIT_MICRO_VAR'] = '%1 تهيئة متغير الميكروفون';
Blockly.Msg['VITTAIA_DISPLAY_CAMERA'] = '%1 تحديث الكاميرا';
Blockly.Msg['VITTAIA_GET_BEST_PROBALITY_CLASS'] = Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE'];

// Exception
Blockly.Msg['EXCEPTION_RAISE_TOOLTIP'] = 'إثارة استثناء';
Blockly.Msg['EXCEPTION_EXCEPTION_TOOLTIP'] = 'إنشاء استثناء';
Blockly.Msg['EXCEPTION_TYPE_TOOLTIP'] = 'جميع أنواع الاستثناءات الممكنة';
Blockly.Msg['EXCEPTION_TRY_TOOLTIP'] = 'ينفذ كتلة من التعليمات البرمجية ويسمح بتنفيذ كتلة في حال وقوع استثناء.';

// Other Block
Blockly.Msg['OTHER_AST_RAW'] = 'كود غير مترجم';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_FROM_URL_TITLE'] = 'بدء الكشف عن صورة الرابط %2 في %1';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_FROM_URL_TOOLTIP'] = 'يجري التنبؤات للنموذج للصورة المحمّلة من رابط URL. يحتوي التنبؤ على عنصرين: الفئة ومستوى الثقة.';
