/**
 * @fileoverview Arabic translation file for interfaces Toolbox. (AR)
 */

Blockly.MESSAGES = {
    title: 'كود',
    blocks: 'لبنات',
    linkTooltip: 'حفظ وربط اللبنات.',
    runTooltip: 'قم بتشغيل البرنامج بواسطة اللبنات في مساحة العمل',
    badCode: 'خطأ في البرنامج :\n %1',
    timeout: 'تم تجاوز الحد الأقصى لتكرارات التنفيذ.',
    trashTooltip: 'تجاهل كل اللبنات.',
    httpRequestError: 'كانت هناك مشكلة مع هذا الطلب.',
    linkAlert: 'شارك القطع الخاصة بك مع هذا الرابط:\n\n %1',
    hashError: 'عذراً, \'1%\' لا يتوافق مع أي برنامج محفوظ.',
    xmlError: 'تعذر تحميل الملف المحفوظ الخاص بك. ربما تم إنشاؤه باستخدام إصدار مختلف من Blockly؟',
    badXml: 'خطأ في تحليل XML:\n %1\n\nحدد \'OK\' للتخلي عن تغييراتك أو \'Cancel\' لمزيد من تحرير XML.',
    search: 'ابحث عن لبنة',
    setLevel: 'فرز حسب المستوى',
    textVariable: 'نص',
    listVariable: 'قائمة',
    hello: 'أهلا',
    comment: 'يعمل جزء الكود هذا على ',
    data1: 'بيانات1',
    data2: 'بيانات2',
    setText: "تعيين نص:",
    setNumber: "تعيين رقم:",
    radioMessage: 'أنا رسالة الراديو!',
    // For Esp32/Pico/Galaxia/M5Stack
    webPage_title: "Esp32 الخادم",
    buttonName: "اسم_الزر",
    sliderName: "اسم_المتغير",
    switchName: "اسم_التبديل",
    topicName: "اسم_القناة",
    base64Image: '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',
    // For M5Stack
    m5title: 'عنوان',
    m5text: 'نص',
    // For CyberPi
    hello_cyberpi: 'مرحبا بكم في CyberPi !',
    label: 'ملصق',
    // For Python
    modelPath: "https://vittascience.com/ia/model/644237cc1072c/",
    modelSoundPath: "https://vittascience.com/ia/model/64413850632bb/",
    modelPosturePath: 'https://vittascience.com/ia/model/66043c5502768/'
};

// Toolbox baic category names.
Blockly.Msg['CATEGORY_LOGIC'] = 'المنطق';
Blockly.Msg['CATEGORY_LOOPS'] = 'الحلقات';
Blockly.Msg['CATEGORY_MATH'] = 'الرياضيات';
Blockly.Msg['CATEGORY_TEXT'] = 'النص';
Blockly.Msg['CATEGORY_VARIABLES'] = 'المتغيرات';
Blockly.Msg['CATEGORY_LISTS'] = 'القوائم';
Blockly.Msg['CATEGORY_PROCEDURES'] = 'الدوال';
Blockly.Msg['CATEGORY_EXCEPTION'] = 'الاستثناءات';
Blockly.Msg['CATEGORY_COLOUR'] = 'اللون';
Blockly.Msg['CATEGORY_DICTIONARIES'] = 'القواميس';
// Toolbox hardware category names.
Blockly.Msg['CATEGORY_DISPLAY'] = 'العرض';
Blockly.Msg['CATEGORY_IO'] = 'الإدخال/الإخراج';
Blockly.Msg['CATEGORY_COMMUNICATION'] = 'الاتصال';
Blockly.Msg['CATEGORY_NETWORK'] = 'الشبكة';
Blockly.Msg['CATEGORY_SENSORS'] = 'المستشعرات';
Blockly.Msg['CATEGORY_ACTUATORS'] = 'المشغلات';
Blockly.Msg['CATEGORY_ROBOTS'] = 'الروبوتات';
Blockly.Msg['CATEGORY_VITTAIA'] = 'ذكاء اصطناعي';
Blockly.Msg['CATEGORY_TIME'] = 'الوقت';
// Toolbox scratch mode
Blockly.Msg['CATEGORY_APPEARANCE'] = 'المظهر';
Blockly.Msg['CATEGORY_SOUND'] = 'الصوت';
Blockly.Msg['CATEGORY_CONTROL'] = 'التحكم';
Blockly.Msg['CATEGORY_OPERATORS'] = 'العمليات';
Blockly.Msg['CATEGORY_EVENTS'] = 'الأحداث';
// Specific categories
Blockly.Msg['CATEGORY_MOVEMENT'] = 'الحركة';
Blockly.Msg['CATEGORY_UTILITY'] = 'الأدوات';
Blockly.Msg['CATEGORY_GAME'] = 'اللعبة';
Blockly.Msg['CATEGORY_TOOL'] = 'الأدوات';
Blockly.Msg['CATEGORY_PROCESS'] = 'العملية';
Blockly.Msg['CATEGORY_VISION'] = 'الرؤية';
Blockly.Msg['CATEGORY_VOICE_INTERACTIONS'] = 'الصوت';
Blockly.Msg['CATEGORY_CAMERA'] = 'الكاميرا';
Blockly.Msg['CATEGORY_TURTLE'] = 'السلحفاة';
Blockly.Msg['CATEGORY_GRAPHICS'] = 'الرسوم';
Blockly.Msg['CATEGORY_NUMPY'] = 'Numpy';
Blockly.Msg['CATEGORY_ACTIONS'] = 'الإجراءات';
Blockly.Msg['CATEGORY_SCREEN'] = 'الشاشة';
Blockly.Msg['CATEGORY_DRONE'] = 'الطائرة بدون طيار';
Blockly.Msg['CATEGORY_MUSIC'] = 'الموسيقى';

// Toolbox hardware subcategories
// DISPLAY
Blockly.Msg['SUBCATEGORY_DISPLAY'] = 'العرض';
Blockly.Msg['SUBCATEGORY_DISPLAYS_LCD'] = 'شاشة LCD';
Blockly.Msg['SUBCATEGORY_DISPLAYS_OLED'] = 'شاشة OLED';
Blockly.Msg['SUBCATEGORY_LED'] = 'LED';
Blockly.Msg['SUBCATEGORY_NEOPIXEL'] = 'Neopixel';
Blockly.Msg['SUBCATEGORY_DISPLAYS_LED_MATRIX'] = 'مصفوفة LED';
Blockly.Msg['SUBCATEGORY_DISPLAYS_RGB_LED_MATRIX'] = 'مصفوفة LED RGB';
Blockly.Msg['SUBCATEGORY_CHAINABLE_LED_RGB'] = 'LED RGB متسلسلة';
// IO
Blockly.Msg['SUBCATEGORY_IO'] = 'الإدخال/الإخراج';
Blockly.Msg['SUBCATEGORY_TIME'] = 'الوقت';
Blockly.Msg['SUBCATEGORY_EXTERNAL_INPUTS'] = 'مدخلات خارجية';
Blockly.Msg['SUBCATEGORY_PINS'] = 'الدبابيس';
Blockly.Msg['SUBCATEGORY_EVENTS'] = 'الأحداث';
// COMMUNICATION
Blockly.Msg['SUBCATEGORY_SERIAL_CONNECTION'] = 'اتصال تسلسلي';
Blockly.Msg['SUBCATEGORY_GPS'] = 'GPS';
Blockly.Msg['SUBCATEGORY_NFC'] = 'NFC';
Blockly.Msg['SUBCATEGORY_LORA'] = 'LoRa';
Blockly.Msg['SUBCATEGORY_DATA_LOGGING'] = 'تسجيل البيانات';
Blockly.Msg['SUBCATEGORY_INTEGRATED_BT'] = 'بلوتوث مدمج';
Blockly.Msg['SUBCATEGORY_EXTERNAL_BLUETOOTH'] = 'وحدات بلوتوث خارجية';
Blockly.Msg['SUBCATEGORY_TRACKING_MODULES'] = 'وحدات التتبع';
Blockly.Msg['SUBCATEGORY_UART'] = 'UART';
Blockly.Msg['SUBCATEGORY_WIRELESS_COMMUNICATION'] = 'اتصال لاسلكي';
Blockly.Msg['SUBCATEGORY_IR_COMMUNICATION'] = 'الاتصالات بالأشعة تحت الحمراء';
Blockly.Msg['SUBCATEGORY_INTEGRATED_RADIO'] = 'راديو مدمج';
// NETWORK
Blockly.Msg['SUBCATEGORY_WIFI'] = 'واي فاي';
Blockly.Msg['SUBCATEGORY_SERVER'] = 'خادم';
Blockly.Msg['SUBCATEGORY_CLIENT'] = 'عميل';
Blockly.Msg['SUBCATEGORY_WEB_PAGE'] = 'إنشاء صفحة ويب';
Blockly.Msg['SUBCATEGORY_DATA_WEB_PAGE'] = 'بيانات صفحة الويب';
Blockly.Msg['SUBCATEGORY_HTTP'] = 'HTTP';
Blockly.Msg['SUBCATEGORY_UMAIL'] = 'بريد';
Blockly.Msg['SUBCATEGORY_MQTT'] = 'MQTT';
// SENSORS
Blockly.Msg['SUBCATEGORY_SENSORS'] = 'المستشعرات';
Blockly.Msg['SUBCATEGORY_SENSORS_GAS'] = 'مستشعرات الغاز';
Blockly.Msg['SUBCATEGORY_SENSORS_CLIMATE'] = 'مستشعرات الطقس';
Blockly.Msg['SUBCATEGORY_SENSORS_SOUNDLIGHT'] = 'مستشعرات الصوت والضوء';
Blockly.Msg['SUBCATEGORY_SENSORS_DISTANCEMOVEMENT'] = 'مستشعرات المسافة والحركة';
Blockly.Msg['SUBCATEGORY_SENSORS_OTHER'] = 'مستشعرات أخرى';
// ACTUATORS
Blockly.Msg['SUBCATEGORY_MOTORS'] = 'المحركات';
Blockly.Msg['SUBCATEGORY_MUSIC'] = 'الموسيقى';
Blockly.Msg['SUBCATEGORY_MOSFET'] = 'MOSFET';
Blockly.Msg['SUBCATEGORY_ACTUATORS_OTHER'] = 'مشغلات أخرى';
// ROBOTS
Blockly.Msg['SUBCATEGORY_SERVOMOTORS'] = 'سيرفو موتور';
Blockly.Msg['SUBCATEGORY_DETECTION'] = 'كشف';
Blockly.Msg['SUBCATEGORY_CAMERA'] = 'كاميرا';
// IA
Blockly.Msg['SUBCATEGORY_CAMERAS'] = 'الكاميرات';
Blockly.Msg['SUBCATEGORY_SENSOR_DATA'] = 'بيانات المستشعر';  
Blockly.Msg['SUBCATEGORY_VITTAIA_SENSOR_DATA'] = 'بيانات المستشعر ذكاء';
Blockly.Msg['SUBCATEGORY_VITTAIA_IMAGE'] = 'ذكاء اصطناعي - صورة';
Blockly.Msg['SUBCATEGORY_VITTAIA_POSTURE'] = 'ذكاء اصطناعي - وضعية';
Blockly.Msg['SUBCATEGORY_VITTAIA_SOUND'] = 'ذكاء اصطناعي - صوت';
Blockly.Msg['SUBCATEGORY_VITTAIA_TEXT'] = 'ذكاء اصطناعي - نص';
// Others
Blockly.Msg['SUBCATEGORY_LOGIC'] = Blockly.Msg['CATEGORY_LOGIC'];
Blockly.Msg['SUBCATEGORY_LOOPS'] = Blockly.Msg['CATEGORY_LOOPS'];
Blockly.Msg['SUBCATEGORY_ENCRYPTION'] = 'التشفير';
Blockly.Msg['SUBCATEGORY_CONSOLE'] = 'وحدة التحكم';
Blockly.Msg['SUBCATEGORY_BUTTON'] = 'زر';
Blockly.Msg['SUBCATEGORY_INFRARED'] = 'أشعة تحت حمراء';
Blockly.Msg['SUBCATEGORY_MICROPHONE'] = 'ميكروفون';
Blockly.Msg['SUBCATEGORY_COMPUTER'] = 'حاسوب';

// Arduino
Blockly.Msg['SUBCATEGORY_BUILTIN_LED_MATRIX'] = 'مصفوفة LED مدمجة';
Blockly.Msg['SUBCATEGORY_I2C_MOTOR_DRIVER'] = 'مشغل محرك I2C';
Blockly.Msg['SUBCATEGORY_MINI_I2C_MOTOR_DRIVER'] = 'مشغل محرك I2C صغير';
Blockly.Msg['SUBCATEGORY_ARDUINO_SHILED_MOTOR'] = 'درع محرك Arduino';

// BBC micro:bit
Blockly.Msg['SUBCATEGORY_MICROBIT'] = 'Micro:bit';
Blockly.Msg['SUBCATEGORY_KITRONIK'] = 'Kitronik';
Blockly.Msg['SUBCATEGORY_GAMES'] = 'ألعاب';
Blockly.Msg['SUBCATEGORY_EXEC'] = 'تشغيل كود بايثون';
Blockly.Msg['SUBCATEGORY_MICROBIT_LOG'] = 'سجل Micro:bit';
Blockly.Msg['SUBCATEGORY_ENVIRO_BIT'] = 'Enviro:bit';
Blockly.Msg['SUBCATEGORY_WEATHER_BIT'] = 'Weather:bit';
Blockly.Msg['SUBCATEGORY_KITRONIK_ENVIRONMENTAL'] = 'لوحة Kitronik البيئية';
Blockly.Msg['SUBCATEGORY_SPEECH'] = 'نطق';
Blockly.Msg['SUBCATEGORY_MAQUEEN'] = 'Maqueen Lite';
Blockly.Msg['SUBCATEGORY_MAQUEEN_PLUS'] = 'Maqueen Plus';
Blockly.Msg['SUBCATEGORY_LIDAR'] = 'LiDAR';
Blockly.Msg['SUBCATEGORY_LINE_FINDER'] = 'متتبع الخط';
Blockly.Msg['SUBCATEGORY_CONTROL'] = 'تحكم';
Blockly.Msg['SUBCATEGORY_CUTEBOT'] = 'Cutebot';
Blockly.Msg['SUBCATEGORY_CUTEBOT_PRO'] = 'Cutebot Pro';
Blockly.Msg['SUBCATEGORY_MOVING'] = 'حركة';
Blockly.Msg['SUBCATEGORY_RGB_LED'] = 'LED RGB';
Blockly.Msg['SUBCATEGORY_PID'] = 'PID';
Blockly.Msg['SUBCATEGORY_REMOTE_CONTROL'] = 'تحكم عن بعد بالأشعة تحت الحمراء';
Blockly.Msg['SUBCATEGORY_MOTOR_PORT'] = 'منفذ المحرك (M)';
Blockly.Msg['SUBCATEGORY_KITROBOT'] = 'Kitro:bot v2';
Blockly.Msg['SUBCATEGORY_CODO'] = 'Codo';
Blockly.Msg['SUBCATEGORY_OOBYBOT'] = 'Oobybot';
Blockly.Msg['SUBCATEGORY_BUGGY'] = 'Buggy';
Blockly.Msg['SUBCATEGORY_BITBOT'] = 'Bit:Bot';
Blockly.Msg['SUBCATEGORY_BITCAR'] = 'BitCar';
Blockly.Msg['SUBCATEGORY_GAMEPAD'] = 'Gamepad';
Blockly.Msg['SUBCATEGORY_TELLO'] = 'Tello - أمر أساسي';
Blockly.Msg['SUBCATEGORY_TELLO_SEND_COMMAND'] = 'Tello - إرسال أمر';
Blockly.Msg['SUBCATEGORY_TELLO_READ'] = 'Tello - استلام بيانات';
Blockly.Msg['SUBCATEGORY_HUSKYLENS'] = 'HuskyLens';
Blockly.Msg['SUBCATEGORY_ZIP_HALO'] = 'Kitronik ZIP Halo HD';

// Python
Blockly.Msg['SUBCATEGORY_MATPLOTLIB'] = 'Matplotlib';
Blockly.Msg['SUBCATEGORY_ARRAYS_MATRIX'] = 'المصفوفات والصفائف';
Blockly.Msg['SUBCATEGORY_OPERATIONS'] = 'عمليات';

// WB55 - L476
Blockly.Msg['SUBCATEGORY_ALPHABOT_SENSORS'] = 'Alphabot - مستشعرات';
Blockly.Msg['SUBCATEGORY_ALPHABOT_MOTORS'] = 'Alphabot - محركات';
Blockly.Msg['SUBCATEGORY_ALPHABOT_OLED'] = 'Alphabot - شاشة OLED';
Blockly.Msg['SUBCATEGORY_ALPHABOT_COMMANDS'] = 'Alphabot - أوامر';
Blockly.Msg['SUBCATEGORY_ALPHABOT_LED_RGB'] = 'Alphabot - LED RGB';
Blockly.Msg['SUBCATEGORY_RTC'] = 'ساعة حقيقية (وحدة مدمجة)';
Blockly.Msg['SUBCATEGORY_EXPANSION_IKS01A3'] = 'لوحة توسعة IKS01A3';
// L476
Blockly.Msg['SUBCATEGORY_L476'] = 'L476';
Blockly.Msg['SUBCATEGORY_DONUTBOT_SENSORS'] = 'Donutbot - مستشعرات';
Blockly.Msg['SUBCATEGORY_DONUTBOT_MOTORS'] = 'Donutbot - محركات';
Blockly.Msg['SUBCATEGORY_DONUTBOT_LED_RGB'] = 'Donutbot - LED RGB';
Blockly.Msg['SUBCATEGORY_DONUTBOT_IO'] = 'Donutbot - إدخال/إخراج';
Blockly.Msg['SUBCATEGORY_DONUTBOT_COMMUNICATION'] = 'Donutbot - اتصال';
// WB55
Blockly.Msg['SUBCATEGORY_WB55'] = 'WB55';
Blockly.Msg['SUBCATEGORY_STEAMI'] = 'STeaMi';
Blockly.Msg['SUBCATEGORY_BLUETOOTH_BLE'] = 'Bluetooth (وحدة BLE مدمجة)';

// Nao
Blockly.Msg['SUBCATEGORY_ANIMATED_SPEECH'] = 'كلام متحرك';
Blockly.Msg['SUBCATEGORY_ASR'] = 'التعرّف على الكلام';
Blockly.Msg['SUBCATEGORY_CAPITAL_CITY'] = 'العواصم والبلدان';
Blockly.Msg['SUBCATEGORY_STORY_TELLING'] = 'سرد تفاعلي';
Blockly.Msg['SUBCATEGORY_MENTAL_CALCULATION'] = 'حساب ذهني';
// Nyrio
Blockly.Msg['SUBCATEGORY_MOVEMENT_JOINTS'] = 'المفاصل';
Blockly.Msg['SUBCATEGORY_MOVEMENT_POSE'] = 'الوضعية';
Blockly.Msg['SUBCATEGORY_TOOL'] = 'أدوات';
Blockly.Msg['SUBCATEGORY_DISPLAY_LED_RING'] = 'حلقة LED';
Blockly.Msg['SUBCATEGORY_ACTUATORS_CONVEYOR'] = 'ناقل حركة';
Blockly.Msg['SUBCATEGORY_SENSOR_IR_CONVEYOR'] = 'مستشعر IR (ناقل)';
Blockly.Msg['SUBCATEGORY_UTILITIES'] = 'أدوات مساعدة';

// Pico
Blockly.Msg['SUBCATEGORY_PICO_LED'] = 'Raspberry Pi Pico';
Blockly.Msg["SUBCATEGORY_KITRO"] = "Kitronik";

// Buddy
Blockly.Msg['SUBCATEGORY_OBJECT_DETECTION'] = 'كشف الأجسام';
Blockly.Msg['SUBCATEGORY_MOTION_DETECTION'] = 'كشف الحركة';
Blockly.Msg['SUBCATEGORY_PERSON_TRACKING'] = 'تتبع الأشخاص';
Blockly.Msg['SUBCATEGORY_VISION'] = 'الرؤية';
Blockly.Msg['SUBCATEGORY_FACE'] = 'وجه';
Blockly.Msg['SUBCATEGORY_DISTANCE'] = 'مسافة';
Blockly.Msg['SUBCATEGORY_TOUCH'] = 'مستشعر لمس';
Blockly.Msg['SUBCATEGORY_BATTERY'] = 'بطارية';
Blockly.Msg['SUBCATEGORY_MOTION_SENSOR'] = 'مستشعر حركة';
Blockly.Msg['SUBCATEGORY_COLOR'] = 'لون';
Blockly.Msg['SUBCATEGORY_HEAD_MOVEMENTS'] = 'حركات الرأس';
Blockly.Msg['SUBCATEGORY_WHEELS'] = 'عجلات';
Blockly.Msg['SUBCATEGORY_TALK'] = 'تكلّم';
Blockly.Msg['SUBCATEGORY_VOLUME'] = 'مستوى الصوت';
Blockly.Msg['SUBCATEGORY_SPEECH_RATE'] = 'سرعة الكلام';
Blockly.Msg['SUBCATEGORY_PITCH'] = 'حدة الصوت';

// ESP32
Blockly.Msg['SUBCATEGORY_ESP32'] = 'ESP32';
Blockly.Msg['SUBCATEGORY_ESP32_CAM'] = 'كاميرا ESP32';
Blockly.Msg["SUBCATEGORY_ILO"] = "Ilo";
Blockly.Msg['SUBCATEGORY_ALVIK'] = 'Alvik';
Blockly.Msg['SUBCATEGORY_ALVIK_MOTORS'] = 'Alvik - محركات';
Blockly.Msg['SUBCATEGORY_ALVIK_LEDS'] = 'Alvik - LEDs';
Blockly.Msg['SUBCATEGORY_ALVIK_SENSORS'] = 'Alvik - مستشعرات';

// Thymio
Blockly.Msg['SUBCATEGORY_THYMIO'] = 'Thymio';
Blockly.Msg['SUBCATEGORY_SOUND'] = 'الصوت';
Blockly.Msg['SUBCATEGORY_SOUNDS'] = 'أصوات';

// Cyberpi
Blockly.Msg['SUBCATEGORY_CYBERPI'] = 'CyberPi';
Blockly.Msg['SUBCATEGORY_CHART'] = 'مخطط';
Blockly.Msg['SUBCATEGORY_BUTTONS'] = 'أزرار';
Blockly.Msg['SUBCATEGORY_AUDIO'] = 'صوت';
Blockly.Msg['SUBCATEGORY_ENCODER_MOTORS'] = 'محركات مشفرة';
Blockly.Msg['SUBCATEGORY_MOTORS_M1_M2'] = 'محركات M1 وM2';
Blockly.Msg['SUBCATEGORY_ULTRASONIC_SENSORS'] = 'مستشعرات فوق صوتية';
Blockly.Msg['SUBCATEGORY_QUAD_RGB_SENSORS'] = 'مستشعرات RGB رباعية';

// Eliobot
Blockly.Msg['SUBCATEGORY_ELIOBOT'] = 'Eliobot';
Blockly.Msg['SUBCATEGORY_LINE_SENSORS'] = 'مستشعرات خط';
Blockly.Msg['SUBCATEGORY_BUZZER'] = 'جرس';

// Galaxia
Blockly.Msg['SUBCATEGORY_GALAXIA'] = 'Galaxia';
Blockly.Msg['SUBCATEGORY_GALAXIA_DISPLAY'] = 'Galaxia - شاشة';
Blockly.Msg['SUBCATEGORY_GALAXIA_RGB_LED'] = 'Galaxia - LED RGB';
Blockly.Msg['SUBCATEGORY_GALAXIA_GRAPHICS'] = 'Galaxia - رسومات';
Blockly.Msg['SUBCATEGORY_GALAXIA_A_B'] = 'Galaxia - أزرار A وB';
Blockly.Msg['SUBCATEGORY_GALAXIA_TOUCH_BUTTONS'] = 'Galaxia - أزرار لمسية';
Blockly.Msg['SUBCATEGORY_INFRARED_COMMUNICATION'] = 'اتصال بالأشعة تحت الحمراء';
Blockly.Msg['SUBCATEGORY_GALAXIA_LOG'] = 'Galaxia - سجل';

// M5Stack
Blockly.Msg['SUBCATEGORY_M5STACK'] = 'M5Stack';
Blockly.Msg['SUBCATEGORY_SETTINGS'] = 'إعدادات';
Blockly.Msg['SUBCATEGORY_DRAW_TITLE'] = 'Draw - عنوان';
Blockly.Msg['SUBCATEGORY_DRAW_LABEL'] = 'Draw - نص';
Blockly.Msg['SUBCATEGORY_DRAW_RECT'] = 'Draw - مستطيل';
Blockly.Msg['SUBCATEGORY_DRAW_CIRCLE'] = 'Draw - دائرة';
Blockly.Msg['SUBCATEGORY_DRAW_TRIANGLE'] = 'Draw - مثلث';
Blockly.Msg['SUBCATEGORY_DRAW_LINE'] = 'Draw - خط';
Blockly.Msg['SUBCATEGORY_GRAPHICS'] = 'رسوم';

// Raspberry Pi
Blockly.Msg['SUBCATEGORY_SENSEHAT_JOYSTICK'] = 'Sense HAT - Joystick';
Blockly.Msg['SUBCATEGORY_SENSEHAT_SENSORS'] = 'Sense HAT - Sensors';
Blockly.Msg['SUBCATEGORY_SENSEHAT_MATRIX'] = 'Sense HAT - LED matrix';
Blockly.Msg['MESSAGE_ROBOTS_USB_CAMERA'] = 'لبرمجة كاميرا USB، تتوفر الوحدات في فئة "المستشعرات"';

// Galaxia CP
Blockly.Msg['SUBCATEGORY_GALAXIA_TIME'] = 'Galaxia - وقت';
Blockly.Msg['SUBCATEGORY_GALAXIA_PINS'] = 'Galaxia - دبابيس P0 وP1 وP2';
Blockly.Msg['SUBCATEGORY_MORPION'] = 'لعبة إكس-أو';
Blockly.Msg['SUBCATEGORY_WEB_SERVER'] = 'خادم ويب';

// Codey & Rocky
Blockly.Msg['SUBCATEGORY_OTHER'] = 'أخرى';
Blockly.Msg['SUBCATEGORY_MOTION'] = 'حركة';
Blockly.Msg['CATEGORY_MCORE'] = 'mCore';
Blockly.Msg['SUBCATEGORY_TEXT'] = 'نص';
Blockly.Msg['SUBCATEGORY_MCORE_LED'] = 'mCore - LED زرقاء';
Blockly.Msg['SUBCATEGORY_MCORE_RGB_LED'] = 'mCore - LED RGB';
Blockly.Msg['SUBCATEGORY_MCORE_SENSORS'] = 'mCore - أجهزة استشعار';
Blockly.Msg['SUBCATEGORY_MCORE_BUZZER'] = 'mCore - منبّه';
Blockly.Msg['SUBCATEGORY_MCORE_INFRARED'] = 'mCore - الأشعة تحت الحمراء';
Blockly.Msg['CATEGORY_ROBOT'] = 'الروبوت';
Blockly.Msg['CATEGORY_BACKPACK'] = 'حقيبة ظهر';
Blockly.Msg['SUBCATEGORY_COMMUNICATION'] = 'الاتصال';
Blockly.Msg['SUBCATEGORY_SENSORS_HEALTH'] = 'مستشعرات الصحة';
Blockly.Msg['SUBCATEGORY_ACTUATORS'] = 'المشغلات';
Blockly.Msg['SUBCATEGORY_FREE_MOVEMENTS'] = 'حركات حرة';
Blockly.Msg['SUBCATEGORY_MOVE_BY_SQUARES'] = 'الحركة حسب الخانات';
Blockly.Msg['SUBCATEGORY_SUPERBIT_BASIC'] = 'Superbit - الأساسي';
Blockly.Msg['SUBCATEGORY_SUPERBIT_SENSORS'] = 'Yahboom - أجهزة الاستشعار';
Blockly.Msg['SUBCATEGORY_BUILTIN_LED'] = 'LED مدمجة';
Blockly.Msg['SUBCATEGORY_EYES'] = 'العيون';
Blockly.Msg['SUBCATEGORY_IR_REMOTE'] = 'جهاز تحكم بالأشعة تحت الحمراء';
Blockly.Msg['SUBCATEGORY_LED_MATRIX'] = 'مصفوفة LED';
Blockly.Msg['SUBCATEGORY_4DIGITS_DISPLAY'] = 'شاشة عرض 7 مقاطع';
Blockly.Msg['SUBCATEGORY_MBOT_MOTORS'] = 'محركات';
Blockly.Msg['SUBCATEGORY_SERVOMOTOR'] = 'سيرفو';
Blockly.Msg['SUBCATEGORY_MINI_FAN'] = 'مروحة صغيرة';
Blockly.Msg['SUBCATEGORY_POTENTIOMETER'] = 'مقاومة قابلة للتعديل';
