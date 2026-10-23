/**
 * @fileoverview English messages for Arduino UNO Q. (EN)
 */

'use strict';

// Start blocks cpp.

// Start blocks linux.

// Bridge blocks

// Brick Blocks

// UNO Q: the built-in LED is the red of the RGB LED 3 (no LED on D13)

Blockly.Msg["CPP_ON_START_TITLE"] = "[Arduino] Vid uppstart";
Blockly.Msg["CPP_ON_START_TOOLTIP"] = "Lägg till instruktioner i detta block som körs när STM32-chipet på Arduino Q-kortet startar.";
Blockly.Msg["CPP_FOREVER_TITLE"] = "[Arduino] Upprepa kontinuerligt";
Blockly.Msg["CPP_FOREVER_TOOLTIP"] = "Lägg till instruktioner i detta block som körs i en slinga.";
Blockly.Msg["PY_ON_START_TITLE"] = "[Python] Vid uppstart";
Blockly.Msg["PY_ON_START_TOOLTIP"] = "Lägg till instruktioner i detta block som körs när Arduino Q-kortet startar upp i Linux.";
Blockly.Msg["PY_FOREVER_TITLE"] = "[Python] Upprepa kontinuerligt";
Blockly.Msg["PY_FOREVER_TOOLTIP"] = "Lägg till instruktioner i detta block som körs i en slinga.";
Blockly.Msg["Q_BRIDGES_PROVIDE_TITLE"] = "[Brygga] exponera funktion %1 med ID %2";
Blockly.Msg["Q_BRIDGES_PROVIDE_TOOLTIP"] = "Skapar en kommunikationsbrygga mellan Python-skriptet i Linux och STM32-processorn på Arduino Q-kortet. Detta block exponerar en funktion med ett ID.";
Blockly.Msg["Q_BRIDGES_CALL_TITLE"] = "[Brygga] anropa funktionen med ID %1";
Blockly.Msg["Q_BRIDGES_CALL_TOOLTIP"] = "Anropar den exponerade funktionen via kanalen med dess ID. Klicka på plusknappen för att lägga till argument till den exponerade funktionen.";
Blockly.Msg["Q_BRIDGES_CALL_WITH_ARGUMENTS"] = "med argument";
Blockly.Msg["Q_BRIDGES_CALL_RETURN_TITLE"] = "[Brygga] resultat av funktionen med ID %1 av typen %2";
Blockly.Msg["Q_BRIDGES_CALL_RETURN_TOOLTIP"] = "Anropar den exponerade funktionen via kanalen med dess ID och returnerar dess resultat. Typen (String, int, float, bool) används endast i C++. Klicka på plusknappen för att lägga till argument till den exponerade funktionen.";
Blockly.Msg["CONTROLS_FOREVER_TITLE"] = "upprepa för alltid";
Blockly.Msg["CONTROLS_FOREVER_TOOLTIP"] = "Upprepar instruktionerna i en slinga, utan slut.";
Blockly.Msg["BRICKS_APP_RUN_TITLE"] = "starta applikationen";
Blockly.Msg["BRICKS_APP_RUN_TOOLTIP"] = "Startar webbapplikationen efter att Python-programmet slutförts.";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TITLE"] = "[Webbgränssnitt] skickar meddelande %2 med ID %1";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TOOLTIP"] = "Skickar ett meddelande till en webbapplikation. Alla klienter som är anslutna till Arduino Q-servern ser meddelandet. Meddelandet kan fångas upp från webbsidan.";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TITLE"] = "[Webbgränssnitt] om ett meddelande med ID %1 tas emot";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TOOLTIP"] = "Gör det möjligt att köra instruktioner om ett meddelande med ett visst ID tas emot från en ansluten klient.";
Blockly.Msg["BRICKS_WEBUI_APP_RUN_USER_LOOP"] = "i en slinga: ";
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TITLE'] = "[Arduino] sätt den inbyggda lysdioden (LED 3 röd) till %1";
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP'] = "Tänder (HIGH) eller släcker (LOW) den inbyggda lysdioden på Arduino UNO Q-kortet: den röda delen av RGB-LED #3.";
Blockly.Msg["UNOQ_RGB_LED_TITLE"] = "[Arduino] sätt RGB-LED #%1 till %2";
Blockly.Msg["UNOQ_RGB_LED_TOOLTIP"] = "Tänder RGB-LED #3 eller #4 på Arduino UNO Q-kortet (styrd av mikrokontrollern) i en av sju färger, eller släcker den.";
Blockly.Msg["UNOQ_RGB_LED_OFF"] = "av";
Blockly.Msg["UNOQ_RGB_LED_RED"] = "röd";
Blockly.Msg["UNOQ_RGB_LED_GREEN"] = "grön";
Blockly.Msg["UNOQ_RGB_LED_BLUE"] = "blå";
Blockly.Msg["UNOQ_RGB_LED_YELLOW"] = "gul";
Blockly.Msg["UNOQ_RGB_LED_CYAN"] = "cyan";
Blockly.Msg["UNOQ_RGB_LED_MAGENTA"] = "magenta";
Blockly.Msg["UNOQ_RGB_LED_WHITE"] = "vit";
Blockly.Msg["UNOQ_LINUX_RGB_LED_TITLE"] = "[Python] sätt RGB-LED #%1 till %2";
Blockly.Msg["UNOQ_LINUX_RGB_LED_TOOLTIP"] = "Tänder RGB-LED #1 eller #2 på Arduino UNO Q-kortet (styrd av Linux) i en av sju färger, eller släcker den.";
