/**
 * @fileoverview English messages for Arduino UNO Q. (EN)
 */

'use strict';

// Start blocks cpp.

// Start blocks linux.

// Bridge blocks

// Brick Blocks

// UNO Q: the built-in LED is the red of the RGB LED 3 (no LED on D13)

Blockly.Msg["CPP_ON_START_TITLE"] = "[Arduino] All'avvio";
Blockly.Msg["CPP_ON_START_TOOLTIP"] = "Aggiungi istruzioni in questo blocco da eseguire quando il chip STM32 della scheda Arduino Q si avvia.";
Blockly.Msg["CPP_FOREVER_TITLE"] = "[Arduino] Ripeti all'infinito";
Blockly.Msg["CPP_FOREVER_TOOLTIP"] = "Aggiungi le istruzioni in questo blocco da eseguire in un ciclo.";
Blockly.Msg["PY_ON_START_TITLE"] = "[Python] All'avvio";
Blockly.Msg["PY_ON_START_TOOLTIP"] = "Aggiungi istruzioni in questo blocco da eseguire quando la scheda Arduino Q avvia Linux.";
Blockly.Msg["PY_FOREVER_TITLE"] = "[Python] Ripeti all'infinito";
Blockly.Msg["PY_FOREVER_TOOLTIP"] = "Aggiungi le istruzioni in questo blocco da eseguire in un ciclo.";
Blockly.Msg["Q_BRIDGES_PROVIDE_TITLE"] = "[Bridge] esponi la funzione %1 con ID %2";
Blockly.Msg["Q_BRIDGES_PROVIDE_TOOLTIP"] = "Crea un ponte di comunicazione tra lo script Python su Linux e il processore STM32 della scheda Arduino Q. Questo blocco espone una funzione identificata da un ID.";
Blockly.Msg["Q_BRIDGES_CALL_TITLE"] = "[Bridge] chiama la funzione con ID %1";
Blockly.Msg["Q_BRIDGES_CALL_TOOLTIP"] = "Invoca la funzione esposta sul canale tramite il suo ID. Clicca sul pulsante + per aggiungere argomenti alla funzione esposta.";
Blockly.Msg["Q_BRIDGES_CALL_WITH_ARGUMENTS"] = "con argomenti";
Blockly.Msg["Q_BRIDGES_CALL_RETURN_TITLE"] = "[Bridge] risultato della funzione con ID %1 di tipo %2";
Blockly.Msg["Q_BRIDGES_CALL_RETURN_TOOLTIP"] = "Invoca la funzione esposta sul canale tramite il suo ID e restituisce il risultato. Il tipo (String, int, float, bool) è usato solo in C++. Clicca sul pulsante + per aggiungere argomenti alla funzione esposta.";
Blockly.Msg["CONTROLS_FOREVER_TITLE"] = "ripeti all'infinito";
Blockly.Msg["CONTROLS_FOREVER_TOOLTIP"] = "Ripete le istruzioni in un ciclo, senza fine.";
Blockly.Msg["BRICKS_APP_RUN_TITLE"] = "avvia l'applicazione";
Blockly.Msg["BRICKS_APP_RUN_TOOLTIP"] = "Avvia l'applicazione web al termine del programma Python.";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TITLE"] = "[WebUI] invia il messaggio %2 con ID %1";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TOOLTIP"] = "Invia un messaggio a un'applicazione web. Tutti i client connessi al server Arduino Q visualizzano questo messaggio. Il messaggio può essere intercettato dalla pagina web.";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TITLE"] = "[WebUI] se viene ricevuto un messaggio con ID %1";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TOOLTIP"] = "Permette di eseguire istruzioni se da un client connesso arriva un messaggio con un certo ID.";
Blockly.Msg["BRICKS_WEBUI_APP_RUN_USER_LOOP"] = "in ciclo: ";
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TITLE'] = "[Arduino] imposta il LED integrato (LED 3 rosso) su %1";
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP'] = "Accende (HIGH) o spegne (LOW) il LED integrato della scheda Arduino UNO Q: il rosso del LED RGB #3.";
Blockly.Msg["UNOQ_RGB_LED_TITLE"] = "[Arduino] imposta il LED RGB #%1 su %2";
Blockly.Msg["UNOQ_RGB_LED_TOOLTIP"] = "Accende il LED RGB #3 o #4 della scheda Arduino UNO Q (pilotato dal microcontrollore) in uno dei 7 colori, o lo spegne.";
Blockly.Msg["UNOQ_RGB_LED_OFF"] = "spento";
Blockly.Msg["UNOQ_RGB_LED_RED"] = "rosso";
Blockly.Msg["UNOQ_RGB_LED_GREEN"] = "verde";
Blockly.Msg["UNOQ_RGB_LED_BLUE"] = "blu";
Blockly.Msg["UNOQ_RGB_LED_YELLOW"] = "giallo";
Blockly.Msg["UNOQ_RGB_LED_CYAN"] = "ciano";
Blockly.Msg["UNOQ_RGB_LED_MAGENTA"] = "magenta";
Blockly.Msg["UNOQ_RGB_LED_WHITE"] = "bianco";
Blockly.Msg["UNOQ_LINUX_RGB_LED_TITLE"] = "[Python] imposta il LED RGB #%1 su %2";
Blockly.Msg["UNOQ_LINUX_RGB_LED_TOOLTIP"] = "Accende il LED RGB #1 o #2 della scheda Arduino UNO Q (gestito da Linux) in uno dei 7 colori, o lo spegne.";
