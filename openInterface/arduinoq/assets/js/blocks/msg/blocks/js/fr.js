/**
 * @fileoverview French messages for Arduino UNO Q (FR)
 */

'use strict';

// Start blocks cpp.
Blockly.Msg["CPP_ON_START_TITLE"] = "[Arduino] Au démarrage";
Blockly.Msg["CPP_ON_START_TOOLTIP"] = "Ajouter des instructions dans ce bloc pour les exécuter au démarrage de la puce STM32 de la carte Arduino Q.";
Blockly.Msg["CPP_FOREVER_TITLE"] = "[Arduino] Répéter indéfiniment";
Blockly.Msg["CPP_FOREVER_TOOLTIP"] = "Ajouter des instructions dans ce bloc pour les exécuter en boucle.";

// Start blocks linux.
Blockly.Msg["PY_ON_START_TITLE"] = "[Python] Au démarrage";
Blockly.Msg["PY_ON_START_TOOLTIP"] = "Ajouter des instructions dans ce bloc pour les exécuter au démarrage de Linux de la carte Arduino Q.";
Blockly.Msg["PY_FOREVER_TITLE"] = "[Python] Répéter indéfiniment";
Blockly.Msg["PY_FOREVER_TOOLTIP"] = "Ajouter des instructions dans ce bloc pour les exécuter en boucle.";

// bridge blocks
Blockly.Msg["Q_BRIDGES_PROVIDE_TITLE"] = "[Pont] exposer la fonction %1 avec l'ID %2";
Blockly.Msg["Q_BRIDGES_PROVIDE_TOOLTIP"] = "Permet de créer un pont de communication entre le script python de Linux et le processeur STM32 de la carte Arduino Q. Ce bloc expose une fonction avec un ID.";
Blockly.Msg["Q_BRIDGES_CALL_TITLE"] = "[Pont] appeler la fonction ID %1";
Blockly.Msg["Q_BRIDGES_CALL_TOOLTIP"] = "Permet d'appeler la fonction exposée sur le canal via l'ID. Cliquer sur le bouton plus pour ajouter les arguments de la fonction exposée.";
Blockly.Msg["Q_BRIDGES_CALL_WITH_ARGUMENTS"] = "avec les arguments";

// Bricks blocks
Blockly.Msg["BRICKS_APP_RUN_TITLE"] = "lancer l'application";
Blockly.Msg["BRICKS_APP_RUN_TOOLTIP"] = "Permet de démarrer l'application web à la fin du programme python.";
Blockly.Msg["BRICKS_WEBUI_APP_RUN_USER_LOOP"] = "en boucle: ";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TITLE"] = "[WebUI] envoyer le message %2 avec l'ID %1";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TOOLTIP"] = "Envoyer un message à une application web. Tous les clients connectés au serveur Arduino Q recevront ce message. Depuis la page web, il est possible d'intercepter ce message.";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TITLE"] = "[WebUI] si un message est reçu avec l'ID %1";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TOOLTIP"] = "Permet d'exécuter des instructions si un message d'un certain ID est reçu de la part d'un client connecté.";
