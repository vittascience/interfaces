/**
 * @fileoverview English messages for Matatalab. (EN)
 */

'use strict';

// IO - Time

// Actuators

// Sound

// Display

// Communication

// MatataCon

// Options

// Search keywords of the blocks: <X>_KEYWORDS completes the block whose tooltip is <X>_TOOLTIP (see ToolboxManager)

Blockly.Msg['IO_WAIT_TITLE'] = 'انتظر %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'قم بإيقاف تنفيذ الشيفرة.';
Blockly.Msg['IO_WAIT_SECOND'] = 'ثانية';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'مللي ثانية';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'ميكرو ثانية';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'انتظر حتى %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'توقف عن تنفيذ الشيفرة حتى يتم تحقيق الشرط.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'ابدأ المؤقت';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'قم بتهيئة المؤقت عند 0 (بالثواني).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'قيمة المؤقت في %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'ترجع قيمة المؤقت منذ التهيئة (بالثواني أو المللي ثانية).';
Blockly.Msg['ACTUATORS_MOVE_TITLE'] = '%1 %2 خطوات';
Blockly.Msg['ACTUATORS_MOVE_TOOLTIP'] = 'قم بتحريك روبوت ماتاتا بوت عدد معين من الخطوات (1 خطوة = 10 سم).';
Blockly.Msg['ACTUATORS_MOVE_CM_TITLE'] = 'تحرك %1 سم';
Blockly.Msg['ACTUATORS_MOVE_CM_TOOLTIP'] = 'قم بتحريك روبوت ماتاتا بوت لمسافة معينة بالسنتيمتر. القيمة السلبية تجعل الروبوت يتراجع.';
Blockly.Msg['ACTUATORS_TURN_TITLE'] = 'دوران %1 بمقدار %2 °';
Blockly.Msg['ACTUATORS_TURN_TOOLTIP'] = 'يدور روبوت ماتاتا بوت في مكانه.';
Blockly.Msg['ACTUATORS_SET_GEAR_TITLE'] = 'ضبط %1 على تروس %2';
Blockly.Msg['ACTUATORS_SET_GEAR_TOOLTIP'] = 'تشغيل واحدة أو كلا العجلتين، من ترس -6 (خلفي) إلى 6 (أمامي). 0 يوقف العجلة.';
Blockly.Msg['ACTUATORS_SET_SPEED_TITLE'] = 'ضبط سرعة العجلات: اليسار %1 اليمين %2 (سم/ث)';
Blockly.Msg['ACTUATORS_SET_SPEED_TOOLTIP'] = 'يضبط سرعة كلا العجلتين، بين -16 و 16 سم/ث. القيمة السلبية تجعل العجلة تدور للخلف.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'توقف %1';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'يوقف واحدة أو كلا العجلتين.';
Blockly.Msg['ACTUATORS_DANCE_TITLE'] = 'قم بالرقص رقم %1';
Blockly.Msg['ACTUATORS_DANCE_TOOLTIP'] = 'يقوم روبوت ماتاتا بوت بالرقص، من 1 إلى 6.';
Blockly.Msg['ACTUATORS_ACTION_TITLE'] = 'قم بفعل رقم %1';
Blockly.Msg['ACTUATORS_ACTION_TOOLTIP'] = 'يقوم روبوت ماتاتا بوت بفعل، من 1 إلى 6.';
Blockly.Msg['SOUND_PLAY_NOTE_TITLE'] = 'عزف نوتة %1 لمدة %2 مللي ثانية';
Blockly.Msg['SOUND_PLAY_NOTE_TOOLTIP'] = 'يعزف نوتة على روبوت ماتاتا بوت لمدة معينة بالمللي ثانية.';
Blockly.Msg['SOUND_PLAY_MELODY_TITLE'] = 'عزف لحن رقم %1';
Blockly.Msg['SOUND_PLAY_MELODY_TOOLTIP'] = 'يعزف لحن روبوت ماتاتا بوت، من 1 إلى 10.';
Blockly.Msg['SOUND_PLAY_MUSIC_TITLE'] = 'عزف أغنية رقم %1';
Blockly.Msg['SOUND_PLAY_MUSIC_TOOLTIP'] = 'يعزف أغنية روبوت ماتاتا بوت، من 1 إلى 6.';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TITLE'] = 'إضاءة %1 بـ %2 مع سطوع %3';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TOOLTIP'] = 'يضيء عينا روبوت ماتاتا بوت بسطوع بين 0 و 6.';
Blockly.Msg['DISPLAY_SET_EYES_TITLE'] = 'إضاءة %1 بلون %2';
Blockly.Msg['DISPLAY_SET_EYES_TOOLTIP'] = 'يضيء عينا روبوت ماتاتا بوت بلون مختار.';
Blockly.Msg['DISPLAY_CLEAR_EYES_TITLE'] = 'إيقاف تشغيل العيون';
Blockly.Msg['DISPLAY_CLEAR_EYES_TOOLTIP'] = 'يوقف تشغيل عيني روبوت ماتاتا بوت.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'اكتب إلى وحدة التحكم %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'يكتب البيانات إلى المنفذ التسلسلي.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'مع';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'سطر جديد(أسطر جديدة)';
Blockly.Msg['MATATACON_IS_BUTTON_TITLE'] = 'زر %1 مضغوط';
Blockly.Msg['MATATACON_IS_BUTTON_TOOLTIP'] = 'يُرجع True إذا كان زر التحكم في ماتاتا كون مضغوطًا.';
Blockly.Msg['MATATACON_IS_GESTURE_TITLE'] = 'التحكم %1';
Blockly.Msg['MATATACON_IS_GESTURE_TOOLTIP'] = 'يُرجع True إذا تم اكتشاف هذه الحركة من جهاز التحكم ماتاتا كون.';
Blockly.Msg['MATATACON_IS_COLOR_TITLE'] = 'اللون %1 تم اكتشافه';
Blockly.Msg['MATATACON_IS_COLOR_TOOLTIP'] = 'يُرجع True إذا اكتشف مستشعر اللون في جهاز التحكم ماتاتا كون هذا اللون.';
Blockly.Msg['MATATACON_IS_SOUND_TITLE'] = 'تم اكتشاف صوت';
Blockly.Msg['MATATACON_IS_SOUND_TOOLTIP'] = 'يُرجع True إذا تم الكشف عن صوت من جهاز التحكم ماتاتا كون.';
Blockly.Msg['MATATACON_IS_OBSTACLE_TITLE'] = 'تم اكتشاف عائق';
Blockly.Msg['MATATACON_IS_OBSTACLE_TOOLTIP'] = 'يُرجع True إذا تم الكشف عن عائق من جهاز التحكم ماتاتا كون.';
Blockly.Msg['MATATACON_IS_LIGHT_TITLE'] = '%1 تم الكشف عنه';
Blockly.Msg['MATATACON_IS_LIGHT_TOOLTIP'] = 'يُرجع True إذا اكتشف جهاز التحكم ماتاتا كون الضوء أو الظلام.';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TITLE'] = 'السطوع';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TOOLTIP'] = 'يُرجع مستوى السطوع الذي يقيسه جهاز التحكم ماتاتا كون، من 0 إلى 255.';
Blockly.Msg['MATATACON_GET_COLOR_TITLE'] = '%1 قيمة مستشعر اللون';
Blockly.Msg['MATATACON_GET_COLOR_TOOLTIP'] = 'يُرجع قيم الأحمر والأخضر والأزرق التي يقيسها جهاز التحكم ماتاتا كون، من 0 إلى 255.';
Blockly.Msg['MATATACON_GET_ANGLE_TITLE'] = '%1 زاوية (°)';
Blockly.Msg['MATATACON_GET_ANGLE_TOOLTIP'] = 'يُرجع زاوية جهاز التحكم ماتاتا كون، بالدرجات.';
Blockly.Msg['MATATACON_GET_ACCELERATION_TITLE'] = 'التسارع على المحور %1';
Blockly.Msg['MATATACON_GET_ACCELERATION_TOOLTIP'] = 'يُرجع التسارع لجهاز التحكم ماتاتا كون على محور معين.';
Blockly.Msg['MATATACON_GET_SHAKING_TITLE'] = 'شدة الاهتزاز';
Blockly.Msg['MATATACON_GET_SHAKING_TOOLTIP'] = 'يُرجع شدة الاهتزاز لجهاز التحكم ماتاتا كون.';
Blockly.Msg['MATATACON_SET_RING_COLOR_TITLE'] = '[الخاتم] إضاءة LED رقم %1 بـ %2 مع سطوع %3';
Blockly.Msg['MATATACON_SET_RING_COLOR_TOOLTIP'] = 'يضيء LED من حلقة جهاز التحكم ماتاتا كون، من 1 إلى 12، بسطوع من 0 إلى 6. الرقم 0 يضيء جميع LEDs.';
Blockly.Msg['MATATACON_SET_RING_TITLE'] = '[الخاتم] إضاءة LED رقم %1 بلون %2';
Blockly.Msg['MATATACON_SET_RING_TOOLTIP'] = 'يضيء LED من حلقة جهاز التحكم ماتاتا كون، من 1 إلى 12، بلون مختار. الرقم 0 يضيء جميع LEDs.';
Blockly.Msg['MATATACON_SET_RING_LEDS_TITLE'] = '[الخاتم] إضاءة LEDs %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12';
Blockly.Msg['MATATACON_SET_RING_LEDS_TOOLTIP'] = 'يختار لون الـ 12 LED من حلقة جهاز التحكم ماتاتا كون، من LED رقم 1 إلى LED رقم 12.';
Blockly.Msg['MATATACON_RING_ANIMATION_TITLE'] = '[الخاتم] بدء الرسوم المتحركة %1';
Blockly.Msg['MATATACON_RING_ANIMATION_TOOLTIP'] = 'يبدأ رسم متحرك ضوئي على حلقة جهاز التحكم ماتاتا كون.';
Blockly.Msg['MATATACON_CLEAR_RING_TITLE'] = '[الخاتم] إيقاف تشغيل جميع LEDs';
Blockly.Msg['MATATACON_SEND_MESSAGE_TITLE'] = 'أرسل الرسالة رقم %1';
Blockly.Msg['MATATACON_SEND_MESSAGE_TOOLTIP'] = 'يرسل رسالة، من 1 إلى 6، إلى وحدات التحكم الأخرى من ماتاتاكون.';
Blockly.Msg['MATATACON_IS_MESSAGE_TITLE'] = 'تم استلام الرسالة رقم %1';
Blockly.Msg['MATATACON_IS_MESSAGE_TOOLTIP'] = 'ترجع True إذا استقبلت وحدة التحكم لماتاتاكون هذه الرسالة، من 1 إلى 6.';
Blockly.Msg['MATATACON_GET_MESSAGE_TITLE'] = 'الرسالة المستلمة';
Blockly.Msg['MATATACON_GET_MESSAGE_TOOLTIP'] = 'ترجع رقم الرسالة التي استقبلتها وحدة التحكم لماتاتاكون، أو 0 إذا لم تكن هناك رسالة.';
Blockly.Msg['MATATALAB_DIR_FORWARD'] = 'تحرك للأمام';
Blockly.Msg['MATATALAB_DIR_BACKWARD'] = 'تحرك للخلف';
Blockly.Msg['MATATALAB_DIR_LEFT'] = 'يسار';
Blockly.Msg['MATATALAB_DIR_RIGHT'] = 'يمين';
Blockly.Msg['MATATALAB_WHEEL_BOTH'] = 'العجلتين';
Blockly.Msg['MATATALAB_WHEEL_LEFT'] = 'العجلة اليسرى';
Blockly.Msg['MATATALAB_WHEEL_RIGHT'] = 'العجلة اليمنى';
Blockly.Msg['MATATALAB_EYE_BOTH'] = 'كلتا العينين';
Blockly.Msg['MATATALAB_EYE_LEFT'] = 'العين اليسرى';
Blockly.Msg['MATATALAB_EYE_RIGHT'] = 'العين اليمنى';
Blockly.Msg['MATATALAB_COLOR_WHITE'] = 'أبيض';
Blockly.Msg['MATATALAB_COLOR_RED'] = 'أحمر';
Blockly.Msg['MATATALAB_COLOR_YELLOW'] = 'أصفر';
Blockly.Msg['MATATALAB_COLOR_GREEN'] = 'أخضر';
Blockly.Msg['MATATALAB_COLOR_BLUE'] = 'أزرق';
Blockly.Msg['MATATALAB_COLOR_PURPLE'] = 'أرجواني';
Blockly.Msg['MATATALAB_COLOR_BLACK'] = 'أسود';
Blockly.Msg['MATATALAB_ANIMATION_SPOONDRIFT'] = 'تلاوة';
Blockly.Msg['MATATALAB_ANIMATION_METEOR'] = 'شهاب';
Blockly.Msg['MATATALAB_ANIMATION_RAINBOW'] = 'قوس قزح';
Blockly.Msg['MATATALAB_ANIMATION_FIREFLY'] = 'خنفساء تتلألأ';
Blockly.Msg['MATATALAB_ANIMATION_COLORWIPE'] = 'مسح الألوان';
Blockly.Msg['MATATALAB_ANIMATION_BREATHE'] = 'تنفس';
Blockly.Msg['MATATALAB_BUTTON_PLAY'] = 'ابدأ';
Blockly.Msg['MATATALAB_BUTTON_DELETE'] = 'احذف';
Blockly.Msg['MATATALAB_BUTTON_FORWARD'] = 'إلى الأمام';
Blockly.Msg['MATATALAB_BUTTON_BACKWARD'] = 'إلى الوراء';
Blockly.Msg['MATATALAB_BUTTON_LEFT'] = 'يسار';
Blockly.Msg['MATATALAB_BUTTON_RIGHT'] = 'يمين';
Blockly.Msg['MATATALAB_BUTTON_MUSIC'] = 'موسيقى';
Blockly.Msg['MATATALAB_GESTURE_SHAKE'] = 'اهتزاز';
Blockly.Msg['MATATALAB_GESTURE_TILT_LEFT'] = 'مائل لليسار';
Blockly.Msg['MATATALAB_GESTURE_TILT_RIGHT'] = 'مائل لليمين';
Blockly.Msg['MATATALAB_GESTURE_TILT_FORWARD'] = 'مائل للأمام';
Blockly.Msg['MATATALAB_GESTURE_TILT_BACKWARD'] = 'مائل للخلف';
Blockly.Msg['MATATALAB_GESTURE_FALL'] = 'سقوط حر';
Blockly.Msg['MATATALAB_GESTURE_FACE_UP'] = 'مواجه للأعلى';
Blockly.Msg['MATATALAB_GESTURE_FACE_DOWN'] = 'مواجه للأسفل';
Blockly.Msg['MATATALAB_LIGHT_BRIGHT'] = 'مضيء';
Blockly.Msg['MATATALAB_LIGHT_DARK'] = 'ظلام';
Blockly.Msg['MATATALAB_ANGLE_PITCH'] = 'زاوية الميل';
Blockly.Msg['MATATALAB_ANGLE_ROLL'] = 'زاوية الدوران';
Blockly.Msg['MATATALAB_ANGLE_YAW'] = 'زاوية الانحراف';
Blockly.Msg['IO_WAIT_KEYWORDS'] = 'تأخير، انتظر';
Blockly.Msg['IO_WAIT_UNTIL_KEYWORDS'] = 'انتظر، توقف';
Blockly.Msg['IO_INITCHRONOMETER_KEYWORDS'] = 'ساعة توقيت، ابدأ، أعد تعيين';
Blockly.Msg['IO_GETCHRONOMETER_KEYWORDS'] = 'ساعة توقيت، الوقت المنقضي';
Blockly.Msg['ACTUATORS_MOVE_KEYWORDS'] = 'إلى الأمام، للخلف، حركة';
Blockly.Msg['ACTUATORS_MOVE_CM_KEYWORDS'] = 'إلى الأمام، للخلف، المسافة';
Blockly.Msg['ACTUATORS_TURN_KEYWORDS'] = 'دورة، دوران';
Blockly.Msg['ACTUATORS_SET_GEAR_KEYWORDS'] = 'محرك، عجلة، سرعة';
Blockly.Msg['ACTUATORS_SET_SPEED_KEYWORDS'] = 'محرك، عجلة، سرعة';
Blockly.Msg['ACTUATORS_STOP_KEYWORDS'] = 'محرك، عجلة';
Blockly.Msg['ACTUATORS_DANCE_KEYWORDS'] = 'رقص';
Blockly.Msg['ACTUATORS_ACTION_KEYWORDS'] = 'حركة، رسم متحرك';
Blockly.Msg['SOUND_PLAY_NOTE_KEYWORDS'] = 'موسيقى، صوت، نغمة';
Blockly.Msg['SOUND_PLAY_MELODY_KEYWORDS'] = 'موسيقى، صوت';
Blockly.Msg['SOUND_PLAY_MUSIC_KEYWORDS'] = 'موسيقى، صوت';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_KEYWORDS'] = 'LED، عين، لون';
Blockly.Msg['DISPLAY_SET_EYES_KEYWORDS'] = 'LED، عين، RGB';
Blockly.Msg['DISPLAY_CLEAR_EYES_KEYWORDS'] = 'LED، مسح';
Blockly.Msg['MATATACON_SET_RING_COLOR_KEYWORDS'] = 'LED، حلقة، لون';
Blockly.Msg['MATATACON_SET_RING_KEYWORDS'] = 'LED، حلقة، RGB';
Blockly.Msg['MATATACON_SET_RING_LEDS_KEYWORDS'] = 'LED، حلقة، ألوان';
Blockly.Msg['MATATACON_RING_ANIMATION_KEYWORDS'] = 'LED، حلقة، تأثير';
Blockly.Msg['MATATACON_CLEAR_RING_KEYWORDS'] = 'LED، حلقة، مسح';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_KEYWORDS'] = 'وحدة التحكم، نقل، إرسال';
Blockly.Msg['MATATACON_SEND_MESSAGE_KEYWORDS'] = 'إرسال، راديو';
Blockly.Msg['MATATACON_IS_MESSAGE_KEYWORDS'] = 'استقبال، راديو';
Blockly.Msg['MATATACON_GET_MESSAGE_KEYWORDS'] = 'استقبال، راديو';
Blockly.Msg['MATATACON_IS_BUTTON_KEYWORDS'] = 'زر، مفتاح';
Blockly.Msg['MATATACON_IS_GESTURE_KEYWORDS'] = 'حركة، إيماءة، جهاز قياس التسارع';
Blockly.Msg['MATATACON_IS_COLOR_KEYWORDS'] = 'مجس، لون';
Blockly.Msg['MATATACON_IS_SOUND_KEYWORDS'] = 'ميكروفون، ضوضاء';
Blockly.Msg['MATATACON_IS_OBSTACLE_KEYWORDS'] = 'أشعة تحت حمراء، مسافة';
Blockly.Msg['MATATACON_IS_LIGHT_KEYWORDS'] = 'سطوع، ضوء';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_KEYWORDS'] = 'ضوء، مجس';
Blockly.Msg['MATATACON_GET_COLOR_KEYWORDS'] = 'RGB، لون';
Blockly.Msg['MATATACON_GET_ANGLE_KEYWORDS'] = 'ميل، جيروسكوب';
Blockly.Msg['MATATACON_GET_ACCELERATION_KEYWORDS'] = 'جهاز قياس التسارع، جهاز قياس التسارع';
Blockly.Msg['MATATACON_GET_SHAKING_KEYWORDS'] = 'اهتزاز، جهاز قياس التسارع';
