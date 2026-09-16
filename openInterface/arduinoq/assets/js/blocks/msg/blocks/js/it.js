/**
 * @fileoverview Italian messages for Arduino UNO Q. (IT)
 */

'use strict';

// Inizio blocco C++.
Blockly.Msg["CPP_ON_START_TITLE"] = "[Arduino] All'avvio";
Blockly.Msg["CPP_ON_START_TOOLTIP"] = "Avanza le istruzioni in questo blocco da utilizzare sul chip STM32 nello schema Arduino Q.";
Blockly.Msg["CPP_FOREVER_TITLE"] = "[Arduino] Ripeti all'infinito";
Blockly.Msg["CPP_FOREVER_TOOLTIP"] = "Avanza le istruzioni in questo blocco in un ciclo.";

// Inizio blocco Linux.
Blockly.Msg["PY_ON_START_TITLE"] = "[Python] All'avvio";
Blockly.Msg["PY_ON_START_TOOLTIP"] = "Avanza le istruzioni in questo blocco da utilizzare in Linux sullo schema Arduino Q.";
Blockly.Msg["PY_FOREVER_TITLE"] = "[Python] Ripeti all'infinito";
Blockly.Msg["PY_FOREVER_TOOLTIP"] = "Aggiungi ungiungi ungiunzioni in questo blocco da eseguire in un ciclo.";

// Blocco collage
Blockly.Msg["Q_BRIDGES_PROVIDE_TITLE"] = "[Bridge] supporta la funzione %1 con ID %2";
Blockly.Msg["Q_BRIDGES_PROVIDE_TOOLTIP"] = "Crea un ponte di comunicazione tra lo script Python di Linux e il processore STM32 della scheda Arduino Q. Questo blocco espone una funzione con un ID.";
Blockly.Msg["Q_BRIDGES_CALL_TITLE"] = "[Bridge] ha attivato la funzione con ID %1";
Blockly.Msg["Q_BRIDGES_CALL_TOOLTIP"] = "Modifica la funzione pubblicata sul canale con ID. Fai clic sul pulsante per aggiungere la lingua alla funzione pubblicata.";
Blockly.Msg["Q_BRIDGES_CALL_WITH_ARGUMENTS"] = "con argomenti";

//Block
Blockly.Msg["BRICKS_APP_RUN_TITLE"] = "Avvia l'applicazione";
Blockly.Msg["BRICKS_APP_RUN_TOOLTIP"] = "Prima che l'applicazione web termini il programma Python.";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TITLE"] = "[WebUI] invia messaggio %2 con ID %1";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TOOLTIP"] = "Invia un messaggio a un'applicazione web. Tutte le connessioni client al server Arduino possono visualizzare questo messaggio. È possibile accedere a questo messaggio dalla pagina web.";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TITLE"] = "[WebUI] ha ricevuto un messaggio con ID %1";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TOOLTIP"] = "Consenti l'installazione delle istruzioni per ricevere un messaggio con determinazione dell'ID da un client conosciuto.";