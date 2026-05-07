/**
 * @fileoverview Russian translation file for interfaces Toolbox. (RU)
 */

Blockly.MESSAGES = {
    title: "Код",
    blocks: "Блоки",
    linkTooltip: "Сохранить и связать блоки.",
    runTooltip: "Запустить программу, определенную блоками в рабочей области.",
    badCode: "Ошибка программы:\n%1",
    timeout: "Превышено максимальное количество итераций выполнения.",
    trashTooltip: "Удалить все блоки.",
    httpRequestError: "Произошла проблема с запросом.",
    linkAlert: "Поделитесь своими блоками по этой ссылке:\n\n%1",
    hashError: "Извините, '%1' не соответствует ни одной сохраненной программе.",
    xmlError: "Не удалось загрузить ваш сохраненный файл. Возможно, он был создан с другой версией Blockly?",
    badXml: "Ошибка разбора XML:\n%1\n\nВыберите 'ОК', чтобы отказаться от ваших изменений, или 'Отмена', чтобы продолжить редактирование XML.",
    search: "Поиск блока",
    setLevel: "Сортировать по уровню",
    textVariable: "текст",
    listVariable: "список",
    hello: "Привет !",
    comment: "Эта часть кода служит для ...",
    data1: "Данные1",
    data2: "Данные2",
    setText: "Установить текст :",
    setNumber: "Установить число :",
    radioMessage: "Я радио сообщение !",
    // For Esp32/Pico/Galaxia/M5Stack
    webPage_title: "Сервер Esp32",
    buttonName: "button_id",
    sliderName: "slider_id",
    switchName: "switch_id",
    topicName: "topic_name",
    base64Image: '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',
    // For M5Stack
    m5title: 'Название',
    m5text: 'Текст',
    // For CyberPi
    hello_cyberpi: 'Добро пожаловать на CyberPi !',
    label: 'метка',
    // For Python
    modelPath : "https://vittascience.com/ia/model/644237cc1072c/",
    modelSoundPath : "https://vittascience.com/ia/model/64413850632bb/",
    modelPosturePath: 'https://vittascience.com/ia/model/66043c5502768/'
};

// Toolbox baic category names.
Blockly.Msg['CATEGORY_LOGIC'] = 'Логика';
Blockly.Msg['CATEGORY_LOOPS'] = 'Циклы';
Blockly.Msg['CATEGORY_MATH'] = 'Математика';
Blockly.Msg['CATEGORY_TEXT'] = 'Текст';
Blockly.Msg['CATEGORY_VARIABLES'] = 'Переменные';
Blockly.Msg['CATEGORY_LISTS'] = 'Списки';
Blockly.Msg['CATEGORY_PROCEDURES'] = 'Функции';
Blockly.Msg['CATEGORY_EXCEPTION'] = 'Исключения';
Blockly.Msg['CATEGORY_COLOUR'] = 'Цвет';
Blockly.Msg['CATEGORY_DICTIONARIES'] = 'Словари';
// Toolbox hardware category names.
Blockly.Msg['CATEGORY_DISPLAY'] = 'Отображение';
Blockly.Msg['CATEGORY_IO'] = 'Ввод/Вывод';
Blockly.Msg['CATEGORY_COMMUNICATION'] = 'Связь';
Blockly.Msg['CATEGORY_NETWORK'] = 'Сеть';
Blockly.Msg['CATEGORY_SENSORS'] = 'Датчики';
Blockly.Msg['CATEGORY_ACTUATORS'] = 'Исполнители';
Blockly.Msg['CATEGORY_ROBOTS'] = 'Роботы';
Blockly.Msg['CATEGORY_VITTAIA'] = 'ИИ';
Blockly.Msg['CATEGORY_TIME'] = 'Время';
// Toolbox scratch mode
Blockly.Msg['CATEGORY_APPEARANCE'] = 'Внешний вид';
Blockly.Msg['CATEGORY_SOUND'] = 'Звук';
Blockly.Msg['CATEGORY_CONTROL'] = 'Управление';
Blockly.Msg['CATEGORY_OPERATORS'] = 'Операторы';
Blockly.Msg['CATEGORY_EVENTS'] = 'События';
// Specific categories
Blockly.Msg['CATEGORY_MOVEMENT'] = 'Движение';
Blockly.Msg['CATEGORY_UTILITY'] = 'Утилиты';
Blockly.Msg['CATEGORY_GAME'] = 'Игра';
Blockly.Msg['CATEGORY_TOOL'] = 'Инструменты';
Blockly.Msg['CATEGORY_PROCESS'] = 'Процесс';
Blockly.Msg['CATEGORY_VISION'] = 'Зрение';
Blockly.Msg['CATEGORY_VOICE_INTERACTIONS'] = 'Голос';
Blockly.Msg['CATEGORY_CAMERA'] = 'Камера';
Blockly.Msg['CATEGORY_TURTLE'] = 'Turtle';
Blockly.Msg['CATEGORY_GRAPHICS'] = 'Графика';
Blockly.Msg['CATEGORY_NUMPY'] = 'Numpy';
Blockly.Msg['CATEGORY_ACTIONS'] = 'Действия';
Blockly.Msg['CATEGORY_SCREEN'] = 'Экран';
Blockly.Msg['CATEGORY_DRONE'] = 'Дрон';
Blockly.Msg['CATEGORY_MUSIC'] = 'Музыка';

// Toolbox hardware subcategories
// DISPLAY
Blockly.Msg['SUBCATEGORY_DISPLAY'] = 'Отображение';
Blockly.Msg['SUBCATEGORY_DISPLAYS_LCD'] = 'Экран LCD';
Blockly.Msg['SUBCATEGORY_DISPLAYS_OLED'] = 'Экран OLED';
Blockly.Msg['SUBCATEGORY_LED'] = 'Светодиод';
Blockly.Msg['SUBCATEGORY_NEOPIXEL'] = 'Neopixel';
Blockly.Msg['SUBCATEGORY_DISPLAYS_LED_MATRIX'] = 'Светодиодная матрица';
Blockly.Msg['SUBCATEGORY_DISPLAYS_RGB_LED_MATRIX'] = 'RGB светодиодная матрица';
Blockly.Msg['SUBCATEGORY_CHAINABLE_LED_RGB'] = 'Последовательные RGB светодиоды';
// IO
Blockly.Msg['SUBCATEGORY_IO'] = 'Ввод/Вывод';
Blockly.Msg['SUBCATEGORY_TIME'] = 'Время';
Blockly.Msg['SUBCATEGORY_EXTERNAL_INPUTS'] = 'Внешние входы';
Blockly.Msg['SUBCATEGORY_PINS'] = 'Выводы';
Blockly.Msg['SUBCATEGORY_EVENTS'] = 'События';
// COMMUNICATION
Blockly.Msg['SUBCATEGORY_SERIAL_CONNECTION'] = 'Последовательное соединение';
Blockly.Msg['SUBCATEGORY_GPS'] = 'GPS';
Blockly.Msg['SUBCATEGORY_NFC'] = 'NFC';
Blockly.Msg['SUBCATEGORY_LORA'] = 'LoRa';
Blockly.Msg['SUBCATEGORY_DATA_LOGGING'] = 'Регистрация данных';
Blockly.Msg['SUBCATEGORY_INTEGRATED_BT'] = 'Встроенный Bluetooth';
Blockly.Msg['SUBCATEGORY_EXTERNAL_BLUETOOTH'] = 'Внешние модули Bluetooth';
Blockly.Msg['SUBCATEGORY_TRACKING_MODULES'] = 'Модули отслеживания';
Blockly.Msg['SUBCATEGORY_UART'] = 'UART';
Blockly.Msg['SUBCATEGORY_WIRELESS_COMMUNICATION'] = 'Беспроводная связь';
Blockly.Msg['SUBCATEGORY_IR_COMMUNICATION'] = 'Инфракрасная связь';
Blockly.Msg['SUBCATEGORY_INTEGRATED_RADIO'] = 'Встроенное радио';
// NETWORK
Blockly.Msg['SUBCATEGORY_WIFI'] = 'WiFi';
Blockly.Msg['SUBCATEGORY_SERVER'] = 'Сервер';
Blockly.Msg['SUBCATEGORY_CLIENT'] = 'Клиент';
Blockly.Msg['SUBCATEGORY_WEB_PAGE'] = 'Создать веб-страницу';
Blockly.Msg['SUBCATEGORY_DATA_WEB_PAGE'] = 'Данные веб-страницы';
Blockly.Msg['SUBCATEGORY_HTTP'] = 'HTTP';
Blockly.Msg['SUBCATEGORY_UMAIL'] = 'Почта';
Blockly.Msg['SUBCATEGORY_MQTT'] = 'MQTT';
// SENSORS
Blockly.Msg['SUBCATEGORY_SENSORS'] = 'Датчики';
Blockly.Msg['SUBCATEGORY_SENSORS_GAS'] = 'Датчики газа';
Blockly.Msg['SUBCATEGORY_SENSORS_CLIMATE'] = 'Метеодатчики';
Blockly.Msg['SUBCATEGORY_SENSORS_SOUNDLIGHT'] = 'Датчики звука и света';
Blockly.Msg['SUBCATEGORY_SENSORS_DISTANCEMOVEMENT'] = 'Датчики расстояния и движения';
Blockly.Msg['SUBCATEGORY_SENSORS_OTHER'] = 'Другие датчики';
// ACTUATORS
Blockly.Msg['SUBCATEGORY_MOTORS'] = 'Двигатели';
Blockly.Msg['SUBCATEGORY_MUSIC'] = 'Музыка';
Blockly.Msg['SUBCATEGORY_MOSFET'] = 'MOSFET';
Blockly.Msg['SUBCATEGORY_ACTUATORS_OTHER'] = 'Другие исполнительные устройства';
// ROBOTS
Blockly.Msg['SUBCATEGORY_SERVOMOTORS'] = 'Сервоприводы';
Blockly.Msg['SUBCATEGORY_DETECTION'] = 'Обнаружение';
Blockly.Msg['SUBCATEGORY_CAMERA'] = 'Камера';
// IA
Blockly.Msg['SUBCATEGORY_CAMERAS'] = 'Камеры';
Blockly.Msg['SUBCATEGORY_SENSOR_DATA'] = 'Данные с датчиков';
Blockly.Msg['SUBCATEGORY_VITTAIA_SENSOR_DATA'] = 'ИИ Данные с датчиков';
Blockly.Msg['SUBCATEGORY_VITTAIA_IMAGE'] = 'ИИ Изображение';
Blockly.Msg['SUBCATEGORY_VITTAIA_POSTURE'] = 'ИИ Поза';
Blockly.Msg['SUBCATEGORY_VITTAIA_SOUND'] = 'ИИ Звук';
Blockly.Msg['SUBCATEGORY_VITTAIA_TEXT'] = 'ИИ Текст';
// Others
Blockly.Msg['SUBCATEGORY_LOGIC'] = Blockly.Msg['CATEGORY_LOGIC'];
Blockly.Msg['SUBCATEGORY_LOOPS'] = Blockly.Msg['CATEGORY_LOOPS'];
Blockly.Msg['SUBCATEGORY_ENCRYPTION'] = 'Шифрование';
Blockly.Msg['SUBCATEGORY_CONSOLE'] = 'Консоль';
Blockly.Msg['SUBCATEGORY_BUTTON'] = 'Кнопка';
Blockly.Msg['SUBCATEGORY_INFRARED'] = 'Инфракрасный';
Blockly.Msg['SUBCATEGORY_MICROPHONE'] = 'Микрофон';
Blockly.Msg['SUBCATEGORY_COMPUTER'] = 'Компьютер';

// Arduino
Blockly.Msg['SUBCATEGORY_BUILTIN_LED_MATRIX'] = 'Встроенная светодиодная матрица';
Blockly.Msg['SUBCATEGORY_I2C_MOTOR_DRIVER'] = 'Драйвер двигателя I2C';
Blockly.Msg['SUBCATEGORY_MINI_I2C_MOTOR_DRIVER'] = 'Мини-драйвер двигателя I2C';
Blockly.Msg['SUBCATEGORY_ARDUINO_SHILED_MOTOR'] = 'Моторный шилд Arduino';

// BBC micro:bit
Blockly.Msg['SUBCATEGORY_MICROBIT'] = 'Micro:bit';
Blockly.Msg['SUBCATEGORY_KITRONIK'] = 'Kitronik';
Blockly.Msg['SUBCATEGORY_GAMES'] = 'Игры';
Blockly.Msg['SUBCATEGORY_EXEC'] = 'Выполнить код Python';
Blockly.Msg['SUBCATEGORY_MICROBIT_LOG'] = 'Журнал Micro:bit';
Blockly.Msg['SUBCATEGORY_ENVIRO_BIT'] = 'Enviro:bit';
Blockly.Msg['SUBCATEGORY_WEATHER_BIT'] = 'Weather:bit';
Blockly.Msg['SUBCATEGORY_KITRONIK_ENVIRONMENTAL'] = 'Экологический шилд Kitronik';
Blockly.Msg['SUBCATEGORY_SPEECH'] = 'Речь';
Blockly.Msg['SUBCATEGORY_MAQUEEN'] = 'Maqueen Lite';
Blockly.Msg['SUBCATEGORY_MAQUEEN_PLUS'] = 'Maqueen Plus';
Blockly.Msg['SUBCATEGORY_LIDAR'] = 'LiDAR';
Blockly.Msg['SUBCATEGORY_LINE_FINDER'] = 'Линейный датчик';
Blockly.Msg['SUBCATEGORY_CONTROL'] = 'Управление';
Blockly.Msg['SUBCATEGORY_CUTEBOT'] = 'Cutebot';
Blockly.Msg['SUBCATEGORY_CUTEBOT_PRO'] = 'Cutebot Pro';
Blockly.Msg['SUBCATEGORY_MOVING'] = 'Движение';
Blockly.Msg['SUBCATEGORY_RGB_LED'] = 'RGB светодиод';
Blockly.Msg['SUBCATEGORY_PID'] = 'PID';
Blockly.Msg['SUBCATEGORY_REMOTE_CONTROL'] = 'ИК-пульт';
Blockly.Msg['SUBCATEGORY_MOTOR_PORT'] = 'Порт двигателя (M)';
Blockly.Msg['SUBCATEGORY_KITROBOT'] = 'Kitro:bot v2';
Blockly.Msg['SUBCATEGORY_CODO'] = 'Codo';
Blockly.Msg['SUBCATEGORY_OOBYBOT'] = 'Oobybot';
Blockly.Msg['SUBCATEGORY_BUGGY'] = 'Buggy';
Blockly.Msg['SUBCATEGORY_BITBOT'] = 'Bit:Bot';
Blockly.Msg['SUBCATEGORY_BITCAR'] = 'BitCar';
Blockly.Msg['SUBCATEGORY_GAMEPAD'] = 'Геймпад';
Blockly.Msg['SUBCATEGORY_TELLO'] = 'Tello - Базовая команда';
Blockly.Msg['SUBCATEGORY_TELLO_SEND_COMMAND'] = 'Tello - Отправить команду';
Blockly.Msg['SUBCATEGORY_TELLO_READ'] = 'Tello - Получить данные';
Blockly.Msg['SUBCATEGORY_HUSKYLENS'] = 'HuskyLens';
Blockly.Msg['SUBCATEGORY_ZIP_HALO'] = 'Kitronik ZIP Halo HD';

// Python
Blockly.Msg['SUBCATEGORY_MATPLOTLIB'] = 'Matplotlib';
Blockly.Msg['SUBCATEGORY_ARRAYS_MATRIX'] = 'Массивы и матрицы';
Blockly.Msg['SUBCATEGORY_OPERATIONS'] = 'Операции';

// WB55 - L476
Blockly.Msg['SUBCATEGORY_ALPHABOT_SENSORS'] = 'Alphabot - Датчики';
Blockly.Msg['SUBCATEGORY_ALPHABOT_MOTORS'] = 'Alphabot - Двигатели';
Blockly.Msg['SUBCATEGORY_ALPHABOT_OLED'] = 'Alphabot - Экран OLED';
Blockly.Msg['SUBCATEGORY_ALPHABOT_COMMANDS'] = 'Alphabot - Команды';
Blockly.Msg['SUBCATEGORY_ALPHABOT_LED_RGB'] = 'Alphabot - LED RGB';
Blockly.Msg['SUBCATEGORY_RTC'] = 'Real Time Clock (встроенный модуль)';
Blockly.Msg['SUBCATEGORY_EXPANSION_IKS01A3'] = 'Плата расширения IKS01A3';
// L476
Blockly.Msg['SUBCATEGORY_L476'] = 'L476';
Blockly.Msg['SUBCATEGORY_DONUTBOT_SENSORS'] = 'Donutbot - Датчики';
Blockly.Msg['SUBCATEGORY_DONUTBOT_MOTORS'] = 'Donutbot - Двигатели';
Blockly.Msg['SUBCATEGORY_DONUTBOT_LED_RGB'] = 'Donutbot - LED RGB';
Blockly.Msg['SUBCATEGORY_DONUTBOT_IO'] = 'Donutbot - Ввод/Вывод';
Blockly.Msg['SUBCATEGORY_DONUTBOT_COMMUNICATION'] = 'Donutbot - Связь';
// WB55
Blockly.Msg['SUBCATEGORY_WB55'] = 'WB55';
Blockly.Msg['SUBCATEGORY_STEAMI'] = 'STeaMi';
Blockly.Msg['SUBCATEGORY_BLUETOOTH_BLE'] = 'Bluetooth (встроенный модуль BLE)';

// Nao
Blockly.Msg['SUBCATEGORY_ANIMATED_SPEECH'] = 'Анимированная речь';
Blockly.Msg['SUBCATEGORY_ASR'] = 'Распознавание речи';
Blockly.Msg['SUBCATEGORY_CAPITAL_CITY'] = 'Столицы и страны';
Blockly.Msg['SUBCATEGORY_STORY_TELLING'] = 'Интерактивная сказка';
Blockly.Msg['SUBCATEGORY_MENTAL_CALCULATION'] = 'Устный счёт';
// Nyrio
Blockly.Msg['SUBCATEGORY_MOVEMENT_JOINTS'] = 'Суставы';
Blockly.Msg['SUBCATEGORY_MOVEMENT_POSE'] = 'Положение';
Blockly.Msg['SUBCATEGORY_TOOL'] = 'Инструменты';
Blockly.Msg['SUBCATEGORY_DISPLAY_LED_RING'] = 'Светодиодное кольцо';
Blockly.Msg['SUBCATEGORY_ACTUATORS_CONVEYOR'] = 'Конвейер';
Blockly.Msg['SUBCATEGORY_SENSOR_IR_CONVEYOR'] = 'ИК-датчик (конвейер)';
Blockly.Msg['SUBCATEGORY_UTILITIES'] = 'Утилиты';

// Pico
Blockly.Msg['SUBCATEGORY_PICO_LED'] = 'Raspberry Pi Pico';
Blockly.Msg['SUBCATEGORY_KITRO'] = 'Kitronik';

// Buddy
Blockly.Msg['SUBCATEGORY_OBJECT_DETECTION'] = 'Обнаружение объектов';
Blockly.Msg['SUBCATEGORY_MOTION_DETECTION'] = 'Обнаружение движения';
Blockly.Msg['SUBCATEGORY_PERSON_TRACKING'] = 'Отслеживание людей';
Blockly.Msg['SUBCATEGORY_VISION'] = 'Зрение';
Blockly.Msg['SUBCATEGORY_FACE'] = 'Лицо';
Blockly.Msg['SUBCATEGORY_DISTANCE'] = 'Расстояние';
Blockly.Msg['SUBCATEGORY_TOUCH'] = 'Сенсор касания';
Blockly.Msg['SUBCATEGORY_BATTERY'] = 'Батарея';
Blockly.Msg['SUBCATEGORY_MOTION_SENSOR'] = 'Датчик движения';
Blockly.Msg['SUBCATEGORY_COLOR'] = 'Цвет';
Blockly.Msg['SUBCATEGORY_HEAD_MOVEMENTS'] = 'Движения головы';
Blockly.Msg['SUBCATEGORY_WHEELS'] = 'Колёса';
Blockly.Msg['SUBCATEGORY_TALK'] = 'Говорить';
Blockly.Msg['SUBCATEGORY_VOLUME'] = 'Громкость';
Blockly.Msg['SUBCATEGORY_SPEECH_RATE'] = 'Скорость речи';
Blockly.Msg['SUBCATEGORY_PITCH'] = 'Высота голоса';

// ESP32
Blockly.Msg['SUBCATEGORY_ESP32'] = 'ESP32';
Blockly.Msg['SUBCATEGORY_ESP32_CAM'] = 'Камера ESP32';
Blockly.Msg['SUBCATEGORY_ILO'] = 'Ilo';
Blockly.Msg['SUBCATEGORY_ALVIK'] = 'Alvik';
Blockly.Msg['SUBCATEGORY_ALVIK_MOTORS'] = 'Alvik - Двигатели';
Blockly.Msg['SUBCATEGORY_ALVIK_LEDS'] = 'Alvik - LED';
Blockly.Msg['SUBCATEGORY_ALVIK_SENSORS'] = 'Alvik - Датчики';

// Thymio
Blockly.Msg['SUBCATEGORY_THYMIO'] = 'Thymio';
Blockly.Msg['SUBCATEGORY_SOUND'] = 'Звук';
Blockly.Msg['SUBCATEGORY_SOUNDS'] = 'Звуки';

// Cyberpi
Blockly.Msg['SUBCATEGORY_CYBERPI'] = 'CyberPi';
Blockly.Msg['SUBCATEGORY_CHART'] = 'График';
Blockly.Msg['SUBCATEGORY_BUTTONS'] = 'Кнопки';
Blockly.Msg['SUBCATEGORY_AUDIO'] = 'Аудио';
Blockly.Msg['SUBCATEGORY_ENCODER_MOTORS'] = 'Двигатели с энкодером';
Blockly.Msg['SUBCATEGORY_MOTORS_M1_M2'] = 'Двигатели M1 и M2';
Blockly.Msg['SUBCATEGORY_ULTRASONIC_SENSORS'] = 'Ультразвуковые датчики';
Blockly.Msg['SUBCATEGORY_QUAD_RGB_SENSORS'] = 'Четырёхканальные RGB датчики';

// Eliobot
Blockly.Msg['SUBCATEGORY_ELIOBOT'] = 'Eliobot';
Blockly.Msg['SUBCATEGORY_LINE_SENSORS'] = 'Датчики линии';
Blockly.Msg['SUBCATEGORY_BUZZER'] = 'Зуммер';

// Galaxia
Blockly.Msg['SUBCATEGORY_GALAXIA'] = 'Galaxia';
Blockly.Msg['SUBCATEGORY_GALAXIA_DISPLAY'] = 'Galaxia - Экран';
Blockly.Msg['SUBCATEGORY_GALAXIA_RGB_LED'] = 'Galaxia - LED RGB';
Blockly.Msg['SUBCATEGORY_GALAXIA_GRAPHICS'] = 'Galaxia - Графика';
Blockly.Msg['SUBCATEGORY_GALAXIA_A_B'] = 'Galaxia - Кнопки A и B';
Blockly.Msg['SUBCATEGORY_GALAXIA_TOUCH_BUTTONS'] = 'Galaxia - Сенсорные кнопки';
Blockly.Msg['SUBCATEGORY_INFRARED_COMMUNICATION'] = 'Инфракрасная связь';
Blockly.Msg['SUBCATEGORY_GALAXIA_LOG'] = 'Galaxia - Журнал';

// M5Stack
Blockly.Msg['SUBCATEGORY_M5STACK'] = 'M5Stack';
Blockly.Msg['SUBCATEGORY_SETTINGS'] = 'Настройки';
Blockly.Msg['SUBCATEGORY_DRAW_TITLE'] = 'Draw - Заголовок';
Blockly.Msg['SUBCATEGORY_DRAW_LABEL'] = 'Draw - Текст';
Blockly.Msg['SUBCATEGORY_DRAW_RECT'] = 'Draw - Прямоугольник';
Blockly.Msg['SUBCATEGORY_DRAW_CIRCLE'] = 'Draw - Круг';
Blockly.Msg['SUBCATEGORY_DRAW_TRIANGLE'] = 'Draw - Треугольник';
Blockly.Msg['SUBCATEGORY_DRAW_LINE'] = 'Draw - Линия';
Blockly.Msg['SUBCATEGORY_GRAPHICS'] = 'Графика';

// Raspberry Pi
Blockly.Msg['SUBCATEGORY_SENSEHAT_JOYSTICK'] = 'Sense HAT - Джойстик';
Blockly.Msg['SUBCATEGORY_SENSEHAT_SENSORS'] = 'Sense HAT - Датчики';
Blockly.Msg['SUBCATEGORY_SENSEHAT_MATRIX'] = 'Sense HAT - Светодиодная матрица';
Blockly.Msg['MESSAGE_ROBOTS_USB_CAMERA'] = 'Для программирования USB-камеры блоки доступны в категории «Датчики»';

// Galaxia CP
Blockly.Msg['SUBCATEGORY_GALAXIA_TIME'] = 'Galaxia - Время';
Blockly.Msg['SUBCATEGORY_GALAXIA_PINS'] = 'Galaxia - Выводы P0, P1 и P2';
Blockly.Msg['SUBCATEGORY_MORPION'] = 'Крестики-нолики';
Blockly.Msg['SUBCATEGORY_WEB_SERVER'] = 'Веб-сервер';

// Codey & Rocky
Blockly.Msg['SUBCATEGORY_OTHER'] = 'Прочее';
Blockly.Msg['SUBCATEGORY_MOTION'] = 'Движение';
Blockly.Msg['CATEGORY_MCORE'] = 'mCore';
Blockly.Msg['SUBCATEGORY_TEXT'] = 'Текст';
Blockly.Msg['SUBCATEGORY_MCORE_LED'] = 'mCore - синий светодиод';
Blockly.Msg['SUBCATEGORY_MCORE_RGB_LED'] = 'mCore - RGB-светодиод';
Blockly.Msg['SUBCATEGORY_MCORE_SENSORS'] = 'mCore - датчики';
Blockly.Msg['SUBCATEGORY_MCORE_BUZZER'] = 'mCore - зуммер';
Blockly.Msg['SUBCATEGORY_MCORE_INFRARED'] = 'mCore - инфракрасный датчик';
Blockly.Msg['CATEGORY_ROBOT'] = 'Робот';
Blockly.Msg['CATEGORY_BACKPACK'] = 'Рюкзак';
Blockly.Msg['SUBCATEGORY_COMMUNICATION'] = 'Связь';
Blockly.Msg['SUBCATEGORY_SENSORS_HEALTH'] = 'Датчики здоровья';
Blockly.Msg['SUBCATEGORY_ACTUATORS'] = 'Приводы';
Blockly.Msg['SUBCATEGORY_FREE_MOVEMENTS'] = 'Свободные движения';
Blockly.Msg['SUBCATEGORY_MOVE_BY_SQUARES'] = 'Перемещение по клеткам';
Blockly.Msg['SUBCATEGORY_SUPERBIT_BASIC'] = 'Superbit - базовый';
Blockly.Msg['SUBCATEGORY_SUPERBIT_SENSORS'] = 'Yahboom - датчики';
Blockly.Msg['SUBCATEGORY_BUILTIN_LED'] = 'Встроенный светодиод';
Blockly.Msg['SUBCATEGORY_EYES'] = 'Глаза';
Blockly.Msg['SUBCATEGORY_IR_REMOTE'] = 'ИК-пульт';
Blockly.Msg['SUBCATEGORY_LED_MATRIX'] = 'Матрица светодиодов';
Blockly.Msg['SUBCATEGORY_4DIGITS_DISPLAY'] = '4-цифровой 7-сегментный индикатор';
Blockly.Msg['SUBCATEGORY_MBOT_MOTORS'] = 'Двигатели';
Blockly.Msg['SUBCATEGORY_SERVOMOTOR'] = 'Сервопривод';
Blockly.Msg['SUBCATEGORY_MINI_FAN'] = 'Мини-вентилятор';
Blockly.Msg['SUBCATEGORY_POTENTIOMETER'] = 'Потенциометр';
