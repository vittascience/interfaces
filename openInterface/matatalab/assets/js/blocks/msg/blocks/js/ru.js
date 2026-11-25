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

Blockly.Msg['IO_WAIT_TITLE'] = 'подождать %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Приостановить выполнение кода.';
Blockly.Msg['IO_WAIT_SECOND'] = 'секунда(ы)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'миллисекунда(ы)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'микросекунда(ы)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'подождать, пока не %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Остановить выполнение кода до выполнения условия.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'запустить секундомер';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Инициализировать секундомер на 0 (в секундах).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'значение секундомера в %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Возвращает значение секундомера с момента инициализации (в секундах или миллисекундах).';
Blockly.Msg['ACTUATORS_MOVE_TITLE'] = '%1 %2 шагов';
Blockly.Msg['ACTUATORS_MOVE_TOOLTIP'] = 'Перемещает робота MatataBot на заданное количество шагов (1 шаг = 10 см).';
Blockly.Msg['ACTUATORS_MOVE_CM_TITLE'] = 'переместить на %1 см';
Blockly.Msg['ACTUATORS_MOVE_CM_TOOLTIP'] = 'Перемещает робота MatataBot на заданное расстояние в см. Отрицательное значение заставляет его двигаться назад.';
Blockly.Msg['ACTUATORS_TURN_TITLE'] = 'повернуть %1 на %2 °';
Blockly.Msg['ACTUATORS_TURN_TOOLTIP'] = 'Поворачивает робота MatataBot на месте.';
Blockly.Msg['ACTUATORS_SET_GEAR_TITLE'] = 'установить %1 на передачу %2';
Blockly.Msg['ACTUATORS_SET_GEAR_TOOLTIP'] = 'Запускает одно или оба колеса, от передачи -6 (назад) до 6 (вперед). 0 останавливает колесо.';
Blockly.Msg['ACTUATORS_SET_SPEED_TITLE'] = 'установить скорость колес: левое %1 правое %2 (см/с)';
Blockly.Msg['ACTUATORS_SET_SPEED_TOOLTIP'] = 'Устанавливает скорость обоих колес, от -16 до 16 см/с. Отрицательное значение запускает колесо назад.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'остановить %1';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Останавливает одно или оба колеса.';
Blockly.Msg['ACTUATORS_DANCE_TITLE'] = 'выполнить танец №%1';
Blockly.Msg['ACTUATORS_DANCE_TOOLTIP'] = 'Робот MatataBot выполняет танец, от 1 до 6.';
Blockly.Msg['ACTUATORS_ACTION_TITLE'] = 'выполнить действие №%1';
Blockly.Msg['ACTUATORS_ACTION_TOOLTIP'] = 'Робот MatataBot выполняет действие, от 1 до 6.';
Blockly.Msg['SOUND_PLAY_NOTE_TITLE'] = 'играть ноту %1 в течение %2 мс';
Blockly.Msg['SOUND_PLAY_NOTE_TOOLTIP'] = 'Играет ноту на роботе MatataBot в течение заданного времени в миллисекундах.';
Blockly.Msg['SOUND_PLAY_MELODY_TITLE'] = 'играть мелодию №%1';
Blockly.Msg['SOUND_PLAY_MELODY_TOOLTIP'] = 'Играет мелодию робота MatataBot, от 1 до 10.';
Blockly.Msg['SOUND_PLAY_MUSIC_TITLE'] = 'играть песню №%1';
Blockly.Msg['SOUND_PLAY_MUSIC_TOOLTIP'] = 'Играет песню робота MatataBot, от 1 до 6.';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TITLE'] = 'подсветить %1 в %2 с яркостью %3';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TOOLTIP'] = 'Подсвечивает глаза робота MatataBot с яркостью от 0 до 6.';
Blockly.Msg['DISPLAY_SET_EYES_TITLE'] = 'подсветить %1 цветом %2';
Blockly.Msg['DISPLAY_SET_EYES_TOOLTIP'] = 'Подсвечивает глаза робота MatataBot выбранным цветом.';
Blockly.Msg['DISPLAY_CLEAR_EYES_TITLE'] = 'выключить глаза';
Blockly.Msg['DISPLAY_CLEAR_EYES_TOOLTIP'] = 'Выключает глаза робота MatataBot.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'написать в консоль %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Записывает данные в последовательный порт.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'с';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'новая строка(и)';
Blockly.Msg['MATATACON_IS_BUTTON_TITLE'] = 'кнопка %1 нажата';
Blockly.Msg['MATATACON_IS_BUTTON_TOOLTIP'] = 'Возвращает True, если кнопка контроллера MatataCon нажата.';
Blockly.Msg['MATATACON_IS_GESTURE_TITLE'] = 'контроллер %1';
Blockly.Msg['MATATACON_IS_GESTURE_TOOLTIP'] = 'Возвращает True, если это движение контроллера MatataCon обнаружено.';
Blockly.Msg['MATATACON_IS_COLOR_TITLE'] = 'цвет %1 обнаружен';
Blockly.Msg['MATATACON_IS_COLOR_TOOLTIP'] = 'Возвращает True, если датчик цвета контроллера MatataCon обнаруживает этот цвет.';
Blockly.Msg['MATATACON_IS_SOUND_TITLE'] = 'звук обнаружен';
Blockly.Msg['MATATACON_IS_SOUND_TOOLTIP'] = 'Возвращает True, если контроллер MatataCon обнаруживает звук.';
Blockly.Msg['MATATACON_IS_OBSTACLE_TITLE'] = 'препятствие обнаружено';
Blockly.Msg['MATATACON_IS_OBSTACLE_TOOLTIP'] = 'Возвращает True, если контроллер MatataCon обнаруживает препятствие.';
Blockly.Msg['MATATACON_IS_LIGHT_TITLE'] = '%1 обнаружено';
Blockly.Msg['MATATACON_IS_LIGHT_TOOLTIP'] = 'Возвращает True, если контроллер MatataCon обнаруживает свет или тьму.';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TITLE'] = 'яркость';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TOOLTIP'] = 'Возвращает измеренную яркость контроллера MatataCon, от 0 до 255.';
Blockly.Msg['MATATACON_GET_COLOR_TITLE'] = '%1 значение датчика цвета';
Blockly.Msg['MATATACON_GET_COLOR_TOOLTIP'] = 'Возвращает значение красного, зеленого или синего, измеренное контроллером MatataCon, от 0 до 255.';
Blockly.Msg['MATATACON_GET_ANGLE_TITLE'] = '%1 угол (°)';
Blockly.Msg['MATATACON_GET_ANGLE_TOOLTIP'] = 'Возвращает угол контроллера MatataCon в градусах.';
Blockly.Msg['MATATACON_GET_ACCELERATION_TITLE'] = 'ускорение по оси %1';
Blockly.Msg['MATATACON_GET_ACCELERATION_TOOLTIP'] = 'Возвращает ускорение контроллера MatataCon по оси.';
Blockly.Msg['MATATACON_GET_SHAKING_TITLE'] = 'интенсивность тряски';
Blockly.Msg['MATATACON_GET_SHAKING_TOOLTIP'] = 'Возвращает интенсивность тряски контроллера MatataCon.';
Blockly.Msg['MATATACON_SET_RING_COLOR_TITLE'] = '[Кольцо] подсветить LED №%1 в %2 с яркостью %3';
Blockly.Msg['MATATACON_SET_RING_COLOR_TOOLTIP'] = 'Подсвечивает LED кольца контроллера MatataCon, от 1 до 12, с яркостью от 0 до 6. Число 0 подсвечивает все LED.';
Blockly.Msg['MATATACON_SET_RING_TITLE'] = '[Кольцо] подсветить LED №%1 цветом %2';
Blockly.Msg['MATATACON_SET_RING_TOOLTIP'] = 'Подсвечивает LED кольца контроллера MatataCon, от 1 до 12, выбранным цветом. Число 0 подсвечивает все LED.';
Blockly.Msg['MATATACON_SET_RING_LEDS_TITLE'] = '[Кольцо] подсветить LED %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12';
Blockly.Msg['MATATACON_SET_RING_LEDS_TOOLTIP'] = 'Выбирает цвет 12 LED кольца контроллера MatataCon, от LED №1 до LED №12.';
Blockly.Msg['MATATACON_RING_ANIMATION_TITLE'] = '[Кольцо] запустить анимацию %1';
Blockly.Msg['MATATACON_RING_ANIMATION_TOOLTIP'] = 'Запускает световую анимацию на кольце контроллера MatataCon.';
Blockly.Msg['MATATACON_CLEAR_RING_TITLE'] = '[Кольцо] выключить все LED';
Blockly.Msg['MATATACON_CLEAR_RING_TOOLTIP'] = 'Выключает кольцо контроллера MatataCon.';
Blockly.Msg['MATATACON_SEND_MESSAGE_TITLE'] = 'отправить сообщение №%1';
Blockly.Msg['MATATACON_SEND_MESSAGE_TOOLTIP'] = 'Отправляет сообщение от 1 до 6 другим контроллерам MatataCon.';
Blockly.Msg['MATATACON_IS_MESSAGE_TITLE'] = 'сообщение №%1 получено';
Blockly.Msg['MATATACON_IS_MESSAGE_TOOLTIP'] = 'Возвращает True, если контроллер MatataCon получил это сообщение от 1 до 6.';
Blockly.Msg['MATATACON_GET_MESSAGE_TITLE'] = 'полученное сообщение';
Blockly.Msg['MATATACON_GET_MESSAGE_TOOLTIP'] = 'Возвращает номер сообщения, полученного контроллером MatataCon, или 0, если сообщение не получено.';
Blockly.Msg['MATATALAB_DIR_FORWARD'] = 'двигаться вперед';
Blockly.Msg['MATATALAB_DIR_BACKWARD'] = 'двигаться назад';
Blockly.Msg['MATATALAB_DIR_LEFT'] = 'влево';
Blockly.Msg['MATATALAB_DIR_RIGHT'] = 'вправо';
Blockly.Msg['MATATALAB_WHEEL_BOTH'] = 'оба колеса';
Blockly.Msg['MATATALAB_WHEEL_LEFT'] = 'левое колесо';
Blockly.Msg['MATATALAB_WHEEL_RIGHT'] = 'правое колесо';
Blockly.Msg['MATATALAB_EYE_BOTH'] = 'оба глаза';
Blockly.Msg['MATATALAB_EYE_LEFT'] = 'левый глаз';
Blockly.Msg['MATATALAB_EYE_RIGHT'] = 'правый глаз';
Blockly.Msg['MATATALAB_COLOR_WHITE'] = 'белый';
Blockly.Msg['MATATALAB_COLOR_RED'] = 'красный';
Blockly.Msg['MATATALAB_COLOR_YELLOW'] = 'желтый';
Blockly.Msg['MATATALAB_COLOR_GREEN'] = 'зеленый';
Blockly.Msg['MATATALAB_COLOR_BLUE'] = 'синий';
Blockly.Msg['MATATALAB_COLOR_PURPLE'] = 'фиолетовый';
Blockly.Msg['MATATALAB_COLOR_BLACK'] = 'черный';
Blockly.Msg['MATATALAB_ANIMATION_SPOONDRIFT'] = 'волна';
Blockly.Msg['MATATALAB_ANIMATION_METEOR'] = 'метеор';
Blockly.Msg['MATATALAB_ANIMATION_RAINBOW'] = 'радуга';
Blockly.Msg['MATATALAB_ANIMATION_FIREFLY'] = 'светлячок';
Blockly.Msg['MATATALAB_ANIMATION_COLORWIPE'] = 'цветное стирание';
Blockly.Msg['MATATALAB_ANIMATION_BREATHE'] = 'дыхание';
Blockly.Msg['MATATALAB_BUTTON_PLAY'] = 'играть';
Blockly.Msg['MATATALAB_BUTTON_DELETE'] = 'удалить';
Blockly.Msg['MATATALAB_BUTTON_FORWARD'] = 'вперед';
Blockly.Msg['MATATALAB_BUTTON_BACKWARD'] = 'назад';
Blockly.Msg['MATATALAB_BUTTON_LEFT'] = 'влево';
Blockly.Msg['MATATALAB_BUTTON_RIGHT'] = 'вправо';
Blockly.Msg['MATATALAB_BUTTON_MUSIC'] = 'музыка';
Blockly.Msg['MATATALAB_GESTURE_SHAKE'] = 'потрясение';
Blockly.Msg['MATATALAB_GESTURE_TILT_LEFT'] = 'наклонен влево';
Blockly.Msg['MATATALAB_GESTURE_TILT_RIGHT'] = 'наклонен вправо';
Blockly.Msg['MATATALAB_GESTURE_TILT_FORWARD'] = 'наклонен вперед';
Blockly.Msg['MATATALAB_GESTURE_TILT_BACKWARD'] = 'наклонен назад';
Blockly.Msg['MATATALAB_GESTURE_FALL'] = 'в свободном падении';
Blockly.Msg['MATATALAB_GESTURE_FACE_UP'] = 'лицом вверх';
Blockly.Msg['MATATALAB_GESTURE_FACE_DOWN'] = 'лицом вниз';
Blockly.Msg['MATATALAB_LIGHT_BRIGHT'] = 'свет';
Blockly.Msg['MATATALAB_LIGHT_DARK'] = 'темнота';
Blockly.Msg['MATATALAB_ANGLE_PITCH'] = 'угол тангажа';
Blockly.Msg['MATATALAB_ANGLE_ROLL'] = 'угол крена';
Blockly.Msg['MATATALAB_ANGLE_YAW'] = 'наклон';
Blockly.Msg['IO_WAIT_KEYWORDS'] = 'задержка, ожидание';
Blockly.Msg['IO_WAIT_UNTIL_KEYWORDS'] = 'ожидание, пауза';
Blockly.Msg['IO_INITCHRONOMETER_KEYWORDS'] = 'секундомер, старт, сброс';
Blockly.Msg['IO_GETCHRONOMETER_KEYWORDS'] = 'секундомер, прошедшее время';
Blockly.Msg['ACTUATORS_MOVE_KEYWORDS'] = 'вперед, назад, движение';
Blockly.Msg['ACTUATORS_MOVE_CM_KEYWORDS'] = 'вперед, назад, расстояние';
Blockly.Msg['ACTUATORS_TURN_KEYWORDS'] = 'поворот, вращение';
Blockly.Msg['ACTUATORS_SET_GEAR_KEYWORDS'] = 'мотор, колесо, скорость';
Blockly.Msg['ACTUATORS_SET_SPEED_KEYWORDS'] = 'мотор, колесо, скорость';
Blockly.Msg['ACTUATORS_STOP_KEYWORDS'] = 'мотор, колесо';
Blockly.Msg['ACTUATORS_DANCE_KEYWORDS'] = 'танец';
Blockly.Msg['ACTUATORS_ACTION_KEYWORDS'] = 'движение, анимация';
Blockly.Msg['SOUND_PLAY_NOTE_KEYWORDS'] = 'музыка, звук, нота';
Blockly.Msg['SOUND_PLAY_MELODY_KEYWORDS'] = 'музыка, звук';
Blockly.Msg['SOUND_PLAY_MUSIC_KEYWORDS'] = 'музыка, звук';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_KEYWORDS'] = 'светодиод, глаза, цвет';
Blockly.Msg['DISPLAY_SET_EYES_KEYWORDS'] = 'светодиод, глаза, RGB';
Blockly.Msg['DISPLAY_CLEAR_EYES_KEYWORDS'] = 'светодиод, очистить';
Blockly.Msg['MATATACON_SET_RING_COLOR_KEYWORDS'] = 'светодиод, кольцо, цвет';
Blockly.Msg['MATATACON_SET_RING_KEYWORDS'] = 'светодиод, кольцо, RGB';
Blockly.Msg['MATATACON_SET_RING_LEDS_KEYWORDS'] = 'светодиод, кольцо, цвета';
Blockly.Msg['MATATACON_RING_ANIMATION_KEYWORDS'] = 'светодиод, кольцо, эффект';
Blockly.Msg['MATATACON_CLEAR_RING_KEYWORDS'] = 'светодиод, кольцо, очистить';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_KEYWORDS'] = 'консоль, передать, отправить';
Blockly.Msg['MATATACON_SEND_MESSAGE_KEYWORDS'] = 'отправить, радио';
Blockly.Msg['MATATACON_IS_MESSAGE_KEYWORDS'] = 'получить, радио';
Blockly.Msg['MATATACON_GET_MESSAGE_KEYWORDS'] = 'прием, радио';
Blockly.Msg['MATATACON_IS_BUTTON_KEYWORDS'] = 'кнопка, клавиша';
Blockly.Msg['MATATACON_IS_GESTURE_KEYWORDS'] = 'движение, жест, акселерометр';
Blockly.Msg['MATATACON_IS_COLOR_KEYWORDS'] = 'датчик, цвет';
Blockly.Msg['MATATACON_IS_SOUND_KEYWORDS'] = 'микрофон, шум';
Blockly.Msg['MATATACON_IS_OBSTACLE_KEYWORDS'] = 'инфракрасный, расстояние';
Blockly.Msg['MATATACON_IS_LIGHT_KEYWORDS'] = 'яркость, свет';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_KEYWORDS'] = 'свет, датчик';
Blockly.Msg['MATATACON_GET_COLOR_KEYWORDS'] = 'RGB, цвет';
Blockly.Msg['MATATACON_GET_ANGLE_KEYWORDS'] = 'наклон, гироскоп';
Blockly.Msg['MATATACON_GET_ACCELERATION_KEYWORDS'] = 'акселерометр';
Blockly.Msg['MATATACON_GET_SHAKING_KEYWORDS'] = 'трясение, акселерометр';
