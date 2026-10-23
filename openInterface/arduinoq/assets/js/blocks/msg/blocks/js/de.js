/**
 * @fileoverview English messages for Arduino UNO Q. (EN)
 */

'use strict';

// Start blocks cpp.

// Start blocks linux.

// Bridge blocks

// Brick Blocks

// UNO Q: the built-in LED is the red of the RGB LED 3 (no LED on D13)

Blockly.Msg["CPP_ON_START_TITLE"] = "[Arduino] Beim Start";
Blockly.Msg["CPP_ON_START_TOOLTIP"] = "Füge Anweisungen in diesen Block ein, die ausgeführt werden, wenn der STM32-Chip auf dem Arduino Q board hochfährt.";
Blockly.Msg["CPP_FOREVER_TITLE"] = "[Arduino] Endlos wiederholen";
Blockly.Msg["CPP_FOREVER_TOOLTIP"] = "Füge Anweisungen in diesen Block ein, die fortlaufend in einer Schleife ausgeführt werden.";
Blockly.Msg["PY_ON_START_TITLE"] = "[Python] Beim Start";
Blockly.Msg["PY_ON_START_TOOLTIP"] = "Füge Anweisungen in diesen Block ein, die ausgeführt werden, wenn das Arduino Q board in Linux hochfährt.";
Blockly.Msg["PY_FOREVER_TITLE"] = "[Python] Endlos wiederholen";
Blockly.Msg["PY_FOREVER_TOOLTIP"] = "Füge Anweisungen in diesen Block ein, die fortlaufend in einer Schleife ausgeführt werden.";
Blockly.Msg["Q_BRIDGES_PROVIDE_TITLE"] = "[Bridge] Funktion %1 unter der ID %2 bereitstellen";
Blockly.Msg["Q_BRIDGES_PROVIDE_TOOLTIP"] = "Erstellt eine Kommunikationsbrücke zwischen einem Python-Skript unter Linux und dem STM32-Prozessor des Arduino Q board. Mit diesem Block wird eine Funktion unter einer ID bereitgestellt.";
Blockly.Msg["Q_BRIDGES_CALL_TITLE"] = "[Bridge] Funktion mit ID %1 aufrufen";
Blockly.Msg["Q_BRIDGES_CALL_TOOLTIP"] = "Ruft die über die ID freigegebene Funktion über den Kanal auf. Klicke auf die Plus-Schaltfläche, um Argumente hinzuzufügen.";
Blockly.Msg["Q_BRIDGES_CALL_WITH_ARGUMENTS"] = "mit Argumenten";
Blockly.Msg["Q_BRIDGES_CALL_RETURN_TITLE"] = "[Bridge] Ergebnis der Funktion mit ID %1 vom Typ %2";
Blockly.Msg["Q_BRIDGES_CALL_RETURN_TOOLTIP"] = "Ruft die über die ID freigegebene Funktion über den Kanal auf und gibt ihr Ergebnis zurück. Der Typ (String, int, float, bool) wird nur in C++ verwendet. Klicke auf die Plus-Schaltfläche, um Argumente hinzuzufügen.";
Blockly.Msg["CONTROLS_FOREVER_TITLE"] = "endlos wiederholen";
Blockly.Msg["CONTROLS_FOREVER_TOOLTIP"] = "Wiederholt die Anweisungen fortlaufend in einer Schleife.";
Blockly.Msg["BRICKS_APP_RUN_TITLE"] = "Anwendung starten";
Blockly.Msg["BRICKS_APP_RUN_TOOLTIP"] = "Startet die Webanwendung am Ende des Python-Programms.";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TITLE"] = "[WebUI] sendet Nachricht %2 mit der ID %1";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TOOLTIP"] = "Sendet eine Nachricht an eine Webanwendung. Alle Clients, die mit dem Arduino Q-Server verbunden sind, sehen diese Nachricht. Diese Nachricht kann auf der Webseite abgefangen werden.";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TITLE"] = "[WebUI] wenn eine Nachricht mit der ID %1 empfangen wird";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TOOLTIP"] = "Ermöglicht das Ausführen von Anweisungen, wenn von einem verbundenen Client eine Nachricht mit einer bestimmten ID empfangen wird.";
Blockly.Msg["BRICKS_WEBUI_APP_RUN_USER_LOOP"] = "in Schleife: ";
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TITLE'] = "[Arduino] eingebaute LED (LED 3 rot) auf %1 setzen";
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP'] = "Schaltet die eingebaute LED des Arduino UNO Q board ein (HIGH) oder aus (LOW): das Rot der RGB-LED #3.";
Blockly.Msg["UNOQ_RGB_LED_TITLE"] = "[Arduino] RGB-LED #%1 auf %2 setzen";
Blockly.Msg["UNOQ_RGB_LED_TOOLTIP"] = "Schaltet die RGB-LED #3 oder #4 des Arduino UNO Q board (vom Mikrocontroller gesteuert) in eine von 7 Farben oder schaltet sie aus.";
Blockly.Msg["UNOQ_RGB_LED_OFF"] = "aus";
Blockly.Msg["UNOQ_RGB_LED_RED"] = "rot";
Blockly.Msg["UNOQ_RGB_LED_GREEN"] = "grün";
Blockly.Msg["UNOQ_RGB_LED_BLUE"] = "blau";
Blockly.Msg["UNOQ_RGB_LED_YELLOW"] = "gelb";
Blockly.Msg["UNOQ_RGB_LED_CYAN"] = "cyan";
Blockly.Msg["UNOQ_RGB_LED_MAGENTA"] = "magenta";
Blockly.Msg["UNOQ_RGB_LED_WHITE"] = "weiß";
Blockly.Msg["UNOQ_LINUX_RGB_LED_TITLE"] = "[Python] RGB-LED #%1 auf %2 setzen";
Blockly.Msg["UNOQ_LINUX_RGB_LED_TOOLTIP"] = "Schaltet die RGB-LED #1 oder #2 des Arduino UNO Q board (von Linux gesteuert) in eine von 7 Farben oder schaltet sie aus.";
