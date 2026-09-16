/**
 * @fileoverview Russian messages for AlphAI. (RU)
 */

'use strict';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'подождать %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Приостанавливает выполнение кода.';
Blockly.Msg['IO_WAIT_SECOND'] = 'секунда(ы)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'миллисекунда(ы)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'микросекунда(ы)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'ждать, пока %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Останавливает выполнение кода, пока условие не выполнится.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'запустить хронометр';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Обнуляет хронометр (в секундах).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'значение хронометра в %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Возвращает значение хронометра с момента запуска (в секундах или миллисекундах).';
// Robot - Communication
Blockly.Msg['ROBOT_PRINT_MESSAGE_TITLE'] = 'вывести в консоль %1';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TOOLTIP'] = 'Выводит сообщение в консоль.';
// Robot - Actuators
Blockly.Msg['ROBOT_SET_DIRECTION_TITLE'] = '%1 с скоростью %2';
Blockly.Msg['ROBOT_SET_DIRECTION_TOOLTIP'] = 'Перемещает робота в выбранном направлении с указанной скоростью (от -100 до 100).';
Blockly.Msg['ROBOT_SET_MOTOR_TITLE'] = 'скорость левого мотора %1 правого мотора %2';
Blockly.Msg['ROBOT_SET_MOTOR_TOOLTIP'] = 'Управляет скоростью левого и правого моторов робота (от -100 до 100).';
Blockly.Msg['ROBOT_SET_DURATION'] = 'в течение';
Blockly.Msg['ROBOT_FORWARD'] = 'вперёд';
Blockly.Msg['ROBOT_BACKWARD'] = 'назад';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'повернуть влево';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'повернуть вправо';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'остановить робота';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'Останавливает робота.';
Blockly.Msg['ROBOT_SET_BUZZER_TITLE'] = '%1 зуммер';
Blockly.Msg['ROBOT_SET_BUZZER_TOOLTIP'] = 'Включает или выключает зуммер робота.';
Blockly.Msg['ROBOT_BUZZER_ON'] = 'включить';
Blockly.Msg['ROBOT_BUZZER_OFF'] = 'выключить';
// Robot - Sensors
Blockly.Msg['ROBOT_IS_BLOCKED_TITLE'] = 'робот застрял ?';
Blockly.Msg['ROBOT_IS_BLOCKED_TOOLTIP'] = 'Возвращает true, если робот застрял, иначе false.';
Blockly.Msg['ROBOT_GET_DISTANCE_TITLE'] = 'показание датчика расстояния (в см)';
Blockly.Msg['ROBOT_GET_DISTANCE_TOOLTIP'] = 'Возвращает значение датчика расстояния робота (в см).';
Blockly.Msg['ROBOT_GET_INFRA_RED_TITLE'] = 'значения датчиков черной линии %1';
Blockly.Msg['ROBOT_GET_INFRA_RED_TOOLTIP'] = 'Позволяет читать значения датчиков линии: от 0–500 (чёрный) до 500–1000 (белый). Опция \'все\' возвращает массив из значений всех 5 датчиков.';
Blockly.Msg['ROBOT_ALL_SENSORS'] = 'все';
// Robot - Camera
Blockly.Msg['ROBOT_SET_CAMERA_TITLE'] = 'включить камеру с разрешением %1';
Blockly.Msg['ROBOT_SET_CAMERA_TOOLTIP'] = 'Включает камеру робота с выбранным разрешением.';
Blockly.Msg['ROBOT_GET_CAMERA_TITLE'] = 'изображение с камеры';
Blockly.Msg['ROBOT_GET_CAMERA_TOOLTIP'] = 'Возвращает изображение, снятое камерой робота. Если выбрано разрешение \'1x1\', возвращается список из 3 целых чисел (компоненты R, G, B) в диапазоне 0–255. Если выбрано разрешение \'1x2\', возвращается список из 2 списков по 3 целых числа. В остальных случаях возвращается список из n_lignes списков, каждый из которых содержит n_colonnes списков по 3 целых числа.';
// Robot - Display
Blockly.Msg['ROBOT_SET_LEDS_RGB_TITLE'] = 'управлять светодиодами R %1 G %2 B %3';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TOOLTIP'] = 'Управляет светодиодами робота, задавая компоненты красного, зелёного и синего (от 0 до 255).';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TITLE'] = 'установить цвет светодиодов %1';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TOOLTIP'] = 'Устанавливает цвет светодиодов, выбранный из палитры.';
Blockly.Msg['ROBOT_ROBOT_ALL_SENSORS'] = 'все датчики';
