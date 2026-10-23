/**
 * @fileoverview English messages for Arduino UNO Q. (EN)
 */

'use strict';

// Start blocks cpp.

// Start blocks linux.

// Bridge blocks

// Brick Blocks

// UNO Q: the built-in LED is the red of the RGB LED 3 (no LED on D13)

Blockly.Msg["CPP_ON_START_TITLE"] = "[Arduino] при запуске";
Blockly.Msg["CPP_ON_START_TOOLTIP"] = "Добавьте инструкции в этот блок для выполнения при запуске микроконтроллера STM32 на плате Arduino Q.";
Blockly.Msg["CPP_FOREVER_TITLE"] = "[Arduino] повторять бесконечно";
Blockly.Msg["CPP_FOREVER_TOOLTIP"] = "Добавьте инструкции в этот блок для выполнения в цикле.";
Blockly.Msg["PY_ON_START_TITLE"] = "[Python] при запуске";
Blockly.Msg["PY_ON_START_TOOLTIP"] = "Добавьте инструкции в этот блок для выполнения при загрузке платы Arduino Q под управлением Linux.";
Blockly.Msg["PY_FOREVER_TITLE"] = "[Python] повторять бесконечно";
Blockly.Msg["PY_FOREVER_TOOLTIP"] = "Добавьте инструкции в этот блок для выполнения в цикле.";
Blockly.Msg["Q_BRIDGES_PROVIDE_TITLE"] = "[Bridge] опубликовать функцию %1 с идентификатором %2";
Blockly.Msg["Q_BRIDGES_PROVIDE_TOOLTIP"] = "Создаёт мост связи между Python-скриптом под Linux и процессором STM32 платы Arduino Q. Этот блок делает доступной функцию с идентификатором.";
Blockly.Msg["Q_BRIDGES_CALL_TITLE"] = "[Bridge] вызвать функцию с идентификатором %1";
Blockly.Msg["Q_BRIDGES_CALL_TOOLTIP"] = "Вызывает опубликованную функцию по её идентификатору через канал. Нажмите кнопку «+», чтобы добавить аргументы для вызываемой функции.";
Blockly.Msg["Q_BRIDGES_CALL_WITH_ARGUMENTS"] = "с аргументами";
Blockly.Msg["Q_BRIDGES_CALL_RETURN_TITLE"] = "[Bridge] результат функции с идентификатором %1 типа %2";
Blockly.Msg["Q_BRIDGES_CALL_RETURN_TOOLTIP"] = "Вызывает опубликованную функцию по идентификатору через канал и возвращает её результат. Тип (String, int, float, bool) используется только в C++. Нажмите кнопку «+», чтобы добавить аргументы для вызываемой функции.";
Blockly.Msg["CONTROLS_FOREVER_TITLE"] = "повторять бесконечно";
Blockly.Msg["CONTROLS_FOREVER_TOOLTIP"] = "Выполняет инструкции в бесконечном цикле.";
Blockly.Msg["BRICKS_APP_RUN_TITLE"] = "запустить приложение";
Blockly.Msg["BRICKS_APP_RUN_TOOLTIP"] = "Запускает веб-приложение по завершении программы на Python.";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TITLE"] = "[WebUI] отправляет сообщение %2 с идентификатором %1";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TOOLTIP"] = "Отправляет сообщение веб-приложению. Все клиенты, подключённые к серверу Arduino Q, увидят это сообщение. Его можно перехватить на веб-странице.";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TITLE"] = "[WebUI] при получении сообщения с идентификатором %1";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TOOLTIP"] = "Позволяет выполнять инструкции, если от подключённого клиента пришло сообщение с указанным идентификатором.";
Blockly.Msg["BRICKS_WEBUI_APP_RUN_USER_LOOP"] = "в цикле: ";
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TITLE'] = "[Arduino] установить встроенный светодиод (LED 3 — красный) в состояние %1";
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP'] = "Включает (HIGH) или выключает (LOW) встроенный светодиод платы Arduino UNO Q — красную составляющую RGB-светодиода №3.";
Blockly.Msg["UNOQ_RGB_LED_TITLE"] = "[Arduino] установить RGB-светодиод №%1 в цвет %2";
Blockly.Msg["UNOQ_RGB_LED_TOOLTIP"] = "Зажигает RGB-светодиод №3 или №4 платы Arduino UNO Q (управляется микроконтроллером) одним из семи цветов или выключает его.";
Blockly.Msg["UNOQ_RGB_LED_OFF"] = "выключено";
Blockly.Msg["UNOQ_RGB_LED_RED"] = "красный";
Blockly.Msg["UNOQ_RGB_LED_GREEN"] = "зелёный";
Blockly.Msg["UNOQ_RGB_LED_BLUE"] = "синий";
Blockly.Msg["UNOQ_RGB_LED_YELLOW"] = "жёлтый";
Blockly.Msg["UNOQ_RGB_LED_CYAN"] = "циан";
Blockly.Msg["UNOQ_RGB_LED_MAGENTA"] = "пурпурный";
Blockly.Msg["UNOQ_RGB_LED_WHITE"] = "белый";
Blockly.Msg["UNOQ_LINUX_RGB_LED_TITLE"] = "[Python] установить RGB-светодиод №%1 в цвет %2";
Blockly.Msg["UNOQ_LINUX_RGB_LED_TOOLTIP"] = "Зажигает RGB-светодиод №1 или №2 платы Arduino UNO Q (управляется Linux) одним из семи цветов или выключает его.";
