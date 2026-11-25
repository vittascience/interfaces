// galaxia (Thingz) - thingz module

// galaxia - accel/compass

// galaxia - button / touch

// galaxia - led

// galaxia - log

// galaxia - radio

// galaxia - sound

// galaxia - display

ACMsg.GALAXIA_THINGZ_MODULE = "Модуль Thingz для платы Galaxia: доступ к встроенным компонентам (кнопки, сенсорные панели, RGB-светодиод, датчики, радио, дисплей, журнал).";
ACMsg.GALAXIA_THINGZ_BUTTON_A = "Физическая кнопка A платы Galaxia (экземпляр <b>Button</b>).";
ACMsg.GALAXIA_THINGZ_BUTTON_B = "Физическая кнопка B платы Galaxia (экземпляр <b>Button</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_N = "Сенсорная кнопка «север» платы Galaxia (экземпляр <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_S = "Сенсорная кнопка «юг» платы Galaxia (экземпляр <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_E = "Сенсорная кнопка «восток» платы Galaxia (экземпляр <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_W = "Сенсорная кнопка «запад» платы Galaxia (экземпляр <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_LED = "RGB-светодиод платы Galaxia (экземпляр <b>Led</b>).";
ACMsg.GALAXIA_THINGZ_ACCELEROMETER = "Акселерометр платы Galaxia (экземпляр <b>Accel</b>).";
ACMsg.GALAXIA_THINGZ_COMPASS = "Магнитометр/компас платы Galaxia (экземпляр <b>Compass</b>).";
ACMsg.GALAXIA_THINGZ_SOUND = "Аудиовыход (разъём) платы Galaxia (экземпляр <b>Sound</b>).";
ACMsg.GALAXIA_THINGZ_RADIO = "Радиосвязь платы Galaxia (экземпляр <b>Radio</b>).";
ACMsg.GALAXIA_THINGZ_DISPLAY = "ЖК-дисплей платы Galaxia (экземпляр <b>Display</b>).";
ACMsg.GALAXIA_THINGZ_LOG = "Встроенный CSV-регистратор платы Galaxia (экземпляр <b>Log</b>).";
ACMsg.GALAXIA_THINGZ_TEMPERATURE = "Возвращает текущую температуру, измеренную внутренним датчиком.";
ACMsg.GALAXIA_THINGZ_SET_TEMPERATURE_OFFSET = "Применяет к внутреннему датчику температуры калибровочный сдвиг (в градусах).";
ACMsg.GALAXIA_THINGZ_ACCEL_MODULE = "Модуль Thingz: акселерометр и компас.";
ACMsg.GALAXIA_ACCEL_CLASS = "Управление акселерометром платы Galaxia.";
ACMsg.GALAXIA_ACCEL_CONSTRUCTOR = "Создаёт объект <b>Accel</b>.";
ACMsg.GALAXIA_COMPASS_CLASS = "Управление магнитометром платы Galaxia.";
ACMsg.GALAXIA_COMPASS_CONSTRUCTOR = "Создаёт объект <b>Compass</b>.";
ACMsg.GALAXIA_ACCEL_GET_X = "Возвращает ускорение по оси X (mG).";
ACMsg.GALAXIA_ACCEL_GET_Y = "Возвращает ускорение по оси Y (mG).";
ACMsg.GALAXIA_ACCEL_GET_Z = "Возвращает ускорение по оси Z (mG).";
ACMsg.GALAXIA_ACCEL_GET_VALUES = "Возвращает значения ускорения по трём осям в виде списка: [x, y, z].";
ACMsg.GALAXIA_ACCEL_CURRENT_GESTURE = "Возвращает текущее жестовое состояние (например: вверх, вниз, влево, вправо, экран вверх, экран вниз, свободное падение, 3g, 6g, 8g, встряхивание, нет).";
ACMsg.GALAXIA_ACCEL_IS_GESTURE = "Возвращает <b>True</b>, если текущее жестовое состояние соответствует <b>gesture</b>.";
ACMsg.GALAXIA_ACCEL_WAS_GESTURE = "Возвращает <b>True</b>, если <b>gesture</b> произошёл с момента последнего вызова.";
ACMsg.GALAXIA_ACCEL_GET_GESTURES = "Возвращает историю жестов (самые новые — в конце).";
ACMsg.GALAXIA_ACCEL_ON_GESTURE = "Регистрирует функцию-обработчик события жеста; жест передаётся обработчику.";
ACMsg.GALAXIA_COMPASS_GET_X = "Возвращает значение магнитного поля по оси X (uT).";
ACMsg.GALAXIA_COMPASS_GET_Y = "Возвращает значение магнитного поля по оси Y (uT).";
ACMsg.GALAXIA_COMPASS_GET_VALUES = "Возвращает значения магнитного поля по трём осям в виде списка: [x, y, z].";
ACMsg.GALAXIA_COMPASS_HEADING = "Возвращает текущее направление (в градусах).";
ACMsg.GALAXIA_COMPASS_CALIBRATE = "Калибрует магнитометр: поворачивайте плату вокруг оси Z во время калибровки.";
ACMsg.GALAXIA_THINGZ_BUTTON_MODULE = "Модуль кнопок Thingz.";
ACMsg.GALAXIA_BUTTON_CLASS = "Управление физическими кнопками платы Galaxia.";
ACMsg.GALAXIA_BUTTON_CONSTRUCTOR = "Создаёт объект <b>Button</b>.";
ACMsg.GALAXIA_BUTTON_IS_PRESSED = "Возвращает <b>True</b>, если кнопка сейчас нажата.";
ACMsg.GALAXIA_BUTTON_WAS_PRESSED = "Возвращает <b>True</b>, если кнопка была нажата с момента последнего вызова.";
ACMsg.GALAXIA_BUTTON_GET_PRESSES = "Возвращает число нажатий с момента последнего вызова.";
ACMsg.GALAXIA_BUTTON_ON_PRESSED = "Регистрирует обработчик события нажатия; объект кнопки передаётся обработчику.";
ACMsg.GALAXIA_THINGZ_BUTTON_TOUCH_MODULE = "Модуль сенсорных кнопок Thingz.";
ACMsg.GALAXIA_BUTTONTOUCH_CLASS = "Управление ёмкостными сенсорными кнопками платы Galaxia.";
ACMsg.GALAXIA_BUTTONTOUCH_CONSTRUCTOR = "Создаёт объект <b>ButtonTouch</b>.";
ACMsg.GALAXIA_BUTTONTOUCH_IS_TOUCHED = "Возвращает <b>True</b>, если сенсорная кнопка сейчас коснута.";
ACMsg.GALAXIA_BUTTONTOUCH_WAS_TOUCHED = "Возвращает <b>True</b>, если сенсорная кнопка была коснута с момента последнего вызова.";
ACMsg.GALAXIA_BUTTONTOUCH_GET_TOUCHES = "Возвращает число прикосновений с момента последнего вызова.";
ACMsg.GALAXIA_BUTTONTOUCH_ON_TOUCHED = "Регистрирует обработчик события прикосновения; объект кнопки передаётся обработчику.";
ACMsg.GALAXIA_THINGZ_LED_MODULE = "Модуль RGB-светодиода Thingz.";
ACMsg.GALAXIA_LED_CLASS = "Управление RGB-светодиодом платы Galaxia.";
ACMsg.GALAXIA_LED_CONSTRUCTOR = "Создаёт объект <b>Led</b>.";
ACMsg.GALAXIA_LED_SET_COLORS = "Устанавливает цвет светодиода, задавая значения <b>red</b>, <b>green</b>, <b>blue</b> (0-255).";
ACMsg.GALAXIA_LED_SET_RED = "Устанавливает значение красного канала (0-255).";
ACMsg.GALAXIA_LED_SET_GREEN = "Устанавливает значение зелёного канала (0-255).";
ACMsg.GALAXIA_LED_SET_BLUE = "Устанавливает значение синего канала (0-255).";
ACMsg.GALAXIA_LED_GET_RED = "Возвращает текущее значение красного канала (0-255).";
ACMsg.GALAXIA_LED_GET_GREEN = "Возвращает текущее значение зелёного канала (0-255).";
ACMsg.GALAXIA_LED_GET_BLUE = "Возвращает текущее значение синего канала (0-255).";
ACMsg.GALAXIA_LED_READ_LIGHT_LEVEL = "Возвращает уровень освещённости (0 = темно, 100 = ярко).";
ACMsg.GALAXIA_THINGZ_LOG_MODULE = "Модуль внутреннего регистратора данных Thingz.";
ACMsg.GALAXIA_LOG_CLASS = "Сохраняет данные в внутреннюю память Galaxia в формате CSV (при загрузке экспортируется на USB как data.csv).";
ACMsg.GALAXIA_LOG_CONSTRUCTOR = "Создаёт объект <b>Log</b>.";
ACMsg.GALAXIA_LOG_ADD = "Добавляет строку в журнал. Данные — список кортежей: (column_name, value).";
ACMsg.GALAXIA_LOG_DELETE = "Удаляет все данные, сохранённые в журнале.";
ACMsg.GALAXIA_LOG_SET_COLUMNS = "Задаёт столбцы CSV (при каждом изменении столбцов журнал сбрасывается).";
ACMsg.GALAXIA_THINGZ_RADIO_MODULE = "Радиомодуль Thingz.";
ACMsg.GALAXIA_RADIO_CLASS = "Отправлять и принимать сообщения между платами.";
ACMsg.GALAXIA_RADIO_CONSTRUCTOR = "Создаёт объект <b>Radio</b>.";
ACMsg.GALAXIA_RADIO_SEND = "Отправляет строковое сообщение в эфир другим платам на том же канале.";
ACMsg.GALAXIA_RADIO_RECEIVE = "Ожидает и возвращает полученное сообщение.";
ACMsg.GALAXIA_RADIO_SET_CHANEL = "Устанавливает радиоканал (от 1 до 10).";
ACMsg.GALAXIA_RADIO_GET_CHANNEL = "Возвращает текущий радиоканал.";
ACMsg.GALAXIA_RADIO_GET_MAC = "Возвращает MAC-адрес радио в виде байтов.";
ACMsg.GALAXIA_THINGZ_SOUND_MODULE = "Аудиомодуль Thingz.";
ACMsg.GALAXIA_SOUND_CLASS = "Вывод звука через аудиоразъём Galaxia.";
ACMsg.GALAXIA_SOUND_CONSTRUCTOR = "Создаёт объект <b>Sound</b>.";
ACMsg.GALAXIA_SOUND_PLAY = "Включает/выключает генерацию частоты на аудиоразъёме и задаёт частоту (Hz).";
ACMsg.GALAXIA_SOUND_SET_FREQUENCY = "Задаёт выходную частоту в Гц.";
ACMsg.GALAXIA_SOUND_SET_VOLUME = "Задаёт громкость (0–100).";
ACMsg.GALAXIA_SOUND_PLAY_SAMPLE = "Воспроизводит WAV‑сэмпл по указанному пути к файлу.";
ACMsg.GALAXIA_THINGZ_DISPLAY_MODULE = "Модуль дисплея Thingz.";
ACMsg.GALAXIA_DISPLAY_CLASS = "Управление LCD‑дисплеем Galaxia.";
ACMsg.GALAXIA_DISPLAY_CONSTRUCTOR = "Создаёт объект <b>Display</b>.";
ACMsg.GALAXIA_DISPLAY_PLOT = "Интерфейс графика (экземпляр <b>Plot</b>).";
ACMsg.GALAXIA_DISPLAY_CONSOLE = "Интерфейс консоли для вывода REPL (экземпляр <b>Console</b>).";
ACMsg.GALAXIA_DISPLAY_RAW = "Интерфейс низкоуровневой графики (экземпляр <b>Raw</b>).";
ACMsg.GALAXIA_THINGZ_DISPLAY_CONSOLE_MODULE = "Подмодуль консоли дисплея Thingz.";
ACMsg.GALAXIA_CONSOLE_CLASS = "Показывает вывод REPL на экране.";
ACMsg.GALAXIA_CONSOLE_CONSTRUCTOR = "Создаёт объект <b>Console</b>.";
ACMsg.GALAXIA_CONSOLE_SHOW = "Отображает REPL на дисплее.";
ACMsg.GALAXIA_THINGZ_DISPLAY_PLOT_MODULE = "Подмодуль графиков дисплея Thingz.";
ACMsg.GALAXIA_PLOT_CLASS = "Использование LCD‑дисплея как области для графика.";
ACMsg.GALAXIA_PLOT_CONSTRUCTOR = "Создаёт объект <b>Plot</b>.";
ACMsg.GALAXIA_PLOT_SHOW = "Отображает график на дисплее.";
ACMsg.GALAXIA_PLOT_ADD_POINT = "Добавляет новую точку в график (значение Y).";
ACMsg.GALAXIA_PLOT_SET_Y_SCALE = "Задаёт шкалу Y с минимальным и максимальным значениями.";
ACMsg.GALAXIA_PLOT_SET_ANIMATE_FUNCTION = "Настраивает функцию, вызываемую каждые <b>interval</b> секунд для добавления точки.";
ACMsg.GALAXIA_THINGZ_DISPLAY_RAW_MODULE = "Подмодуль низкоуровневой графики дисплея Thingz.";
ACMsg.GALAXIA_RAW_CLASS = "Использовать LCD для отображения графических элементов.";
ACMsg.GALAXIA_RAW_CONSTRUCTOR = "Создаёт объект <b>Raw</b>.";
ACMsg.GALAXIA_RAW_SHOW = "Отображает интерфейс низкоуровневой графики.";
ACMsg.GALAXIA_RAW_PRINT = "Печатает текст <b>txt</b> в позиции (<b>x</b>, <b>y</b>).";
ACMsg.GALAXIA_RAW_PRINT_BMP = "Выводит BMP‑файл по пути <b>path</b> в позиции (<b>x</b>, <b>y</b>).";
ACMsg.GALAXIA_IMG_CLASS = "Элемент изображения для низкоуровневого интерфейса.";
ACMsg.GALAXIA_IMG_CONSTRUCTOR = "Создаёт элемент изображения из BMP‑файла и отображает его.";
ACMsg.GALAXIA_IMG_SHOW = "Показать/скрыть изображение.";
ACMsg.GALAXIA_IMG_X = "Задаёт координату X.";
ACMsg.GALAXIA_IMG_Y = "Задаёт координату Y.";
ACMsg.GALAXIA_IMG_WHITE_REPLACEMENT_COLOR = "Заменяет белые пиксели на указанный цвет.";
ACMsg.GALAXIA_IMG_GET_SHOW = "Возвращает <b>True</b>, если изображение отображается.";
ACMsg.GALAXIA_IMG_GET_X = "Возвращает координату X.";
ACMsg.GALAXIA_IMG_GET_Y = "Возвращает координату Y.";
ACMsg.GALAXIA_IMG_GET_WIDTH = "Возвращает ширину изображения.";
ACMsg.GALAXIA_IMG_GET_HEIGHT = "Возвращает высоту изображения.";
ACMsg.GALAXIA_IMG_GET_WHITE_REPLACEMENT = "Возвращает текущий цвет замены белого.";
ACMsg.GALAXIA_RECT_CLASS = "Элемент прямоугольника для низкоуровневого интерфейса.";
ACMsg.GALAXIA_RECT_CONSTRUCTOR = "Создаёт элемент прямоугольника и отображает его.";
ACMsg.GALAXIA_RECT_SHOW = "Показать/скрыть прямоугольник.";
ACMsg.GALAXIA_RECT_X = "Задаёт координату X.";
ACMsg.GALAXIA_RECT_Y = "Задаёт координату Y.";
ACMsg.GALAXIA_RECT_COLOR = "Задаёт цвет прямоугольника.";
ACMsg.GALAXIA_RECT_GET_SHOW = "Возвращает <b>True</b>, если прямоугольник отображается.";
ACMsg.GALAXIA_RECT_GET_X = "Возвращает координату X.";
ACMsg.GALAXIA_RECT_GET_Y = "Возвращает координату Y.";
ACMsg.GALAXIA_RECT_GET_WIDTH = "Возвращает ширину прямоугольника.";
ACMsg.GALAXIA_RECT_GET_HEIGHT = "Возвращает высоту прямоугольника.";
ACMsg.GALAXIA_RECT_GET_COLOR = "Возвращает цвет прямоугольника.";
ACMsg.GALAXIA_TEXT_CLASS = "Элемент текста для низкоуровневого интерфейса.";
ACMsg.GALAXIA_TEXT_CONSTRUCTOR = "Создаёт текстовый элемент и отображает его.";
ACMsg.GALAXIA_TEXT_SHOW = "Показать/скрыть текст.";
ACMsg.GALAXIA_TEXT_X = "Задаёт координату X.";
ACMsg.GALAXIA_TEXT_Y = "Задаёт координату Y.";
ACMsg.GALAXIA_TEXT_SET_TEXT = "Задаёт отображаемый текст.";
ACMsg.GALAXIA_TEXT_GET_SHOW = "Возвращает <b>True</b>, если текст отображается.";
ACMsg.GALAXIA_TEXT_GET_X = "Возвращает координату X.";
ACMsg.GALAXIA_TEXT_GET_Y = "Возвращает координату Y.";
ACMsg.GALAXIA_TEXT_GET_WIDTH = "Возвращает ширину текста.";
ACMsg.GALAXIA_TEXT_GET_HEIGHT = "Возвращает высоту текста.";
ACMsg.GALAXIA_TEXT_GET_COLOR = "Возвращает цвет текста.";
ACMsg.GALAXIA_TEXT_GET_TEXT = "Возвращает текущий текст (примечание: в документации указан тип int).";
