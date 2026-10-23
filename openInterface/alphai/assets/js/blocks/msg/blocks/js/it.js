/**
 * @fileoverview Italian messages for AlphAI. (IT)
 */

'use strict';

// IO - Time
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
// Robot - Communication
Blockly.Msg['ROBOT_PRINT_MESSAGE_TITLE'] = 'visualizza nella console %1';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TOOLTIP'] = 'Visualizza un messaggio nella console di output.';
// Robot - Actuators
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
// Robot - Sensors
Blockly.Msg['ROBOT_IS_BLOCKED_TITLE'] = 'il robot è bloccato?';
Blockly.Msg['ROBOT_IS_BLOCKED_TOOLTIP'] = 'Restituisce vero se il robot è bloccato, altrimenti falso.';
Blockly.Msg['ROBOT_GET_DISTANCE_TITLE'] = 'valore del sensore di distanza (in cm)';
Blockly.Msg['ROBOT_GET_DISTANCE_TOOLTIP'] = 'Restituisce il valore del sensore di distanza del robot (in cm).';
Blockly.Msg['ROBOT_GET_INFRA_RED_TITLE'] = 'valori dei sensori per la linea nera %1';
Blockly.Msg['ROBOT_GET_INFRA_RED_TOOLTIP'] = 'Consente di leggere i valori dei sensori per il tracciamento della linea, da 0-500 (nero) a 500-1000 (bianco). L\'opzione \'tutti\' del blocco restituisce un array con i valori dei 5 sensori.';
Blockly.Msg['ROBOT_ALL_SENSORS'] = 'tutti';
// Robot - Camera
Blockly.Msg['ROBOT_SET_CAMERA_TITLE'] = 'attivare la fotocamera con risoluzione %1';
Blockly.Msg['ROBOT_SET_CAMERA_TOOLTIP'] = 'Attiva la fotocamera del robot con la risoluzione scelta.';
Blockly.Msg['ROBOT_GET_CAMERA_TITLE'] = 'immagine della fotocamera';
Blockly.Msg['ROBOT_GET_CAMERA_TOOLTIP'] = 'Restituisce l\'immagine catturata dalla fotocamera del robot. Se la risoluzione scelta è \'1x1\', restituisce una lista di 3 interi (componenti R, G, B), ciascuno tra 0 e 255. Se la risoluzione è \'1x2\', restituisce una lista di 2 liste di 3 interi. Negli altri casi, restituisce una lista di n_righe liste di n_colonne liste di 3 interi.';
// Robot - Display
Blockly.Msg['ROBOT_SET_LEDS_RGB_TITLE'] = 'controllare i LED con R %1 G %2 B %3';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TOOLTIP'] = 'Controlla i LED del robot specificando le componenti rosso, verde e blu (tra 0 e 255).';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TITLE'] = 'controllare i LED con %1';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TOOLTIP'] = 'Controlla i LED del robot scegliendo un colore dalla palette.';
Blockly.Msg['ROBOT_ROBOT_ALL_SENSORS'] = 'tutti';
