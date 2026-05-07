/**
 * @fileoverview French messages for AlphAI. (FR)
 */

'use strict';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'attendre %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Effectue une pause dans l\'exécution du code.';
Blockly.Msg['IO_WAIT_SECOND'] = 'seconde(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milliseconde(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microseconde(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'attendre jusqu\'à %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Arrête l\'excution du code jusqu\'à ce que la condition soit satisfaite.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'démarrer le chronomètre';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Initialise un chronomètre à 0 (en secondes).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valeur du chronomètre en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Renvoie la valeur du chronomètre à partir de l\'initialisation (en secondes ou millisecondes).';
// Robot - Communication
Blockly.Msg['ROBOT_PRINT_MESSAGE_TITLE'] = 'afficher dans la console %1';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TOOLTIP'] = 'Affiche un message dans la console de sortie.';
// Robot - Actuators
Blockly.Msg['ROBOT_SET_DIRECTION_TITLE'] = '%1 à la vitesse %2';
Blockly.Msg['ROBOT_SET_DIRECTION_TOOLTIP'] = 'Déplace le robot dans la direction choisie à la vitesse spécifiée (entre -100 et 100).';
Blockly.Msg['ROBOT_SET_MOTOR_TITLE'] = 'vitesse moteur gauche %1 moteur droit %2';
Blockly.Msg['ROBOT_SET_MOTOR_TOOLTIP'] = 'Contrôle la vitesse des moteurs gauche et droit du robot (entre -100 et 100).';
Blockly.Msg['ROBOT_SET_DURATION'] = 'pendant';
Blockly.Msg['ROBOT_FORWARD'] = 'avancer';
Blockly.Msg['ROBOT_BACKWARD'] = 'reculer';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'pivoter à gauche';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'pivoter à droite';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'arrêter le robot';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'Arrête le robot.';
Blockly.Msg['ROBOT_SET_BUZZER_TITLE'] = '%1 le buzzer';
Blockly.Msg['ROBOT_SET_BUZZER_TOOLTIP'] = 'Active ou désactive le buzzer du robot.';
Blockly.Msg['ROBOT_BUZZER_ON'] = 'activer';
Blockly.Msg['ROBOT_BUZZER_OFF'] = 'désactiver';
// Robot - Sensors
Blockly.Msg['ROBOT_IS_BLOCKED_TITLE'] = 'le robot est bloqué ?';
Blockly.Msg['ROBOT_IS_BLOCKED_TOOLTIP'] = 'Renvoie vrai si le robot est bloqué, sinon renvoie faux.';
Blockly.Msg['ROBOT_GET_DISTANCE_TITLE'] = 'valeur du capteur de distance (en cm)';
Blockly.Msg['ROBOT_GET_DISTANCE_TOOLTIP'] = 'Renvoie la valeur du capteur de distance du robot (en cm).';
Blockly.Msg['ROBOT_GET_INFRA_RED_TITLE'] = 'valeurs des capteurs de ligne noire %1';
Blockly.Msg['ROBOT_GET_INFRA_RED_TOOLTIP'] = 'Permet de lire les valeurs des capteurs de suiveur de ligne de l\'ordre de 0-500 (noir) à 500-1000 (blanc). L\'option \'tous\' du bloc permet de retourner le tableau avec les valeurs des 5 capteurs.';
Blockly.Msg['ROBOT_ALL_SENSORS'] = 'tous';
// Robot - Camera
Blockly.Msg['ROBOT_SET_CAMERA_TITLE'] = 'activer la caméra avec la résolution %1';
Blockly.Msg['ROBOT_SET_CAMERA_TOOLTIP'] = 'Active la caméra du robot avec la résolution choisie.';
Blockly.Msg['ROBOT_GET_CAMERA_TITLE'] = 'image de la caméra';
Blockly.Msg['ROBOT_GET_CAMERA_TOOLTIP'] = 'Renvoie l\'image capturée par la caméra du robot.Si la résolution choisie est \'1x1\', renvoie une liste de 3 entiers (composantes R, G, B), entre 0 et 255. Si la résolution est \'1x2\', renvoie une liste de 2 listes de 3 entiers. Dans les autres cas, renvoie une liste de n_lignes listes de n_colonnes listes de 3 entiers.';
// Robot - Display
Blockly.Msg['ROBOT_SET_LEDS_RGB_TITLE'] = 'contrôler les LEDs à R %1 G %2 B %3';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TOOLTIP'] = 'Contrôle les LEDs du robot en spécifiant les composantes rouge, verte et bleue (entre 0 et 255).';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TITLE'] = 'contrôler les LEDs à %1';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TOOLTIP'] = 'Contrôle les LEDs du robot en choisissant une couleur dans la palette.';
Blockly.Msg['IO_WAIT_TITLE'] = 'attendere %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Mette in pausa l\'esecuzione del codice.';
Blockly.Msg['IO_WAIT_SECOND'] = 'secondo(i)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisecondo(i)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsecondo(i)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'attendere fino a quando %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Sospende l\'esecuzione del codice finché la condizione non è soddisfatta.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'avvia il cronometro';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Inizializza il cronometro a 0 (in secondi).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valore del cronometro in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Restituisce il valore del cronometro dall\'inizializzazione (in secondi o millisecondi).';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TITLE'] = 'visualizza nella console %1';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TOOLTIP'] = 'Visualizza un messaggio nella console di output.';
Blockly.Msg['ROBOT_SET_DIRECTION_TITLE'] = '%1 alla velocità %2';
Blockly.Msg['ROBOT_SET_DIRECTION_TOOLTIP'] = 'Muove il robot nella direzione scelta alla velocità specificata (tra -100 e 100).';
Blockly.Msg['ROBOT_SET_MOTOR_TITLE'] = 'velocità motore sinistro %1 motore destro %2';
Blockly.Msg['ROBOT_SET_MOTOR_TOOLTIP'] = 'Controlla la velocità dei motori sinistro e destro del robot (tra -100 e 100).';
Blockly.Msg['ROBOT_SET_DURATION'] = 'per';
Blockly.Msg['ROBOT_FORWARD'] = 'avanzare';
Blockly.Msg['ROBOT_BACKWARD'] = 'retrocedere';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'ruotare a sinistra';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'ruotare a destra';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'fermare il robot';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'Ferma il robot.';
Blockly.Msg['ROBOT_SET_BUZZER_TITLE'] = '%1 il buzzer';
Blockly.Msg['ROBOT_SET_BUZZER_TOOLTIP'] = 'Attiva o disattiva il buzzer del robot.';
Blockly.Msg['ROBOT_BUZZER_ON'] = 'attivare';
Blockly.Msg['ROBOT_BUZZER_OFF'] = 'disattivare';
Blockly.Msg['ROBOT_IS_BLOCKED_TITLE'] = 'il robot è bloccato?';
Blockly.Msg['ROBOT_IS_BLOCKED_TOOLTIP'] = 'Restituisce vero se il robot è bloccato, altrimenti falso.';
Blockly.Msg['ROBOT_GET_DISTANCE_TITLE'] = 'valore del sensore di distanza (in cm)';
Blockly.Msg['ROBOT_GET_DISTANCE_TOOLTIP'] = 'Restituisce il valore del sensore di distanza del robot (in cm).';
Blockly.Msg['ROBOT_GET_INFRA_RED_TITLE'] = 'valori dei sensori per la linea nera %1';
Blockly.Msg['ROBOT_GET_INFRA_RED_TOOLTIP'] = 'Consente di leggere i valori dei sensori per il tracciamento della linea, da 0-500 (nero) a 500-1000 (bianco). L\'opzione \'tutti\' del blocco restituisce un array con i valori dei 5 sensori.';
Blockly.Msg['ROBOT_ALL_SENSORS'] = 'tutti';
Blockly.Msg['ROBOT_SET_CAMERA_TITLE'] = 'attivare la fotocamera con risoluzione %1';
Blockly.Msg['ROBOT_SET_CAMERA_TOOLTIP'] = 'Attiva la fotocamera del robot con la risoluzione scelta.';
Blockly.Msg['ROBOT_GET_CAMERA_TITLE'] = 'immagine della fotocamera';
Blockly.Msg['ROBOT_GET_CAMERA_TOOLTIP'] = 'Restituisce l\'immagine catturata dalla fotocamera del robot. Se la risoluzione scelta è \'1x1\', restituisce una lista di 3 interi (componenti R, G, B), ciascuno tra 0 e 255. Se la risoluzione è \'1x2\', restituisce una lista di 2 liste di 3 interi. Negli altri casi, restituisce una lista di n_righe liste di n_colonne liste di 3 interi.';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TITLE'] = 'controllare i LED con R %1 G %2 B %3';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TOOLTIP'] = 'Controlla i LED del robot specificando le componenti rosso, verde e blu (tra 0 e 255).';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TITLE'] = 'controllare i LED con %1';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TOOLTIP'] = 'Controlla i LED del robot scegliendo un colore dalla palette.';
Blockly.Msg['ROBOT_ROBOT_ALL_SENSORS'] = 'Blockly.Msg[\'ROBOT_ROBOT_ALL_SENSORS\'] = \'tutti\';';
