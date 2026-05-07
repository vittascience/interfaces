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
Blockly.Msg['IO_WAIT_TITLE'] = 'esperar %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausa la ejecución del código.';
Blockly.Msg['IO_WAIT_SECOND'] = 'segundo(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milisegundo(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsegundo(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'esperar hasta %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Detiene la ejecución del código hasta que se cumpla la condición.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'iniciar el cronómetro';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Inicializa un cronómetro en 0 (segundos).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valor del cronómetro en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Devuelve el valor del cronómetro desde su inicio (en segundos o milisegundos).';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TITLE'] = 'mostrar en la consola %1';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TOOLTIP'] = 'Muestra un mensaje en la consola de salida.';
Blockly.Msg['ROBOT_SET_DIRECTION_TITLE'] = '%1 a la velocidad %2';
Blockly.Msg['ROBOT_SET_DIRECTION_TOOLTIP'] = 'Mueve el robot en la dirección elegida a la velocidad indicada (entre -100 y 100).';
Blockly.Msg['ROBOT_SET_MOTOR_TITLE'] = 'velocidad motor izquierdo %1 motor derecho %2';
Blockly.Msg['ROBOT_SET_MOTOR_TOOLTIP'] = 'Controla la velocidad de los motores izquierdo y derecho del robot (entre -100 y 100).';
Blockly.Msg['ROBOT_SET_DURATION'] = 'durante';
Blockly.Msg['ROBOT_FORWARD'] = 'avanzar';
Blockly.Msg['ROBOT_BACKWARD'] = 'retroceder';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'girar a la izquierda';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'girar a la derecha';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'detener el robot';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'Detiene el robot.';
Blockly.Msg['ROBOT_SET_BUZZER_TITLE'] = '%1 el zumbador';
Blockly.Msg['ROBOT_SET_BUZZER_TOOLTIP'] = 'Activa o desactiva el zumbador del robot.';
Blockly.Msg['ROBOT_BUZZER_ON'] = 'activar';
Blockly.Msg['ROBOT_BUZZER_OFF'] = 'desactivar';
Blockly.Msg['ROBOT_IS_BLOCKED_TITLE'] = 'Blockly.Msg[\'ROBOT_IS_BLOCKED_TITLE\'] = \'¿El robot está bloqueado?\';';
Blockly.Msg['ROBOT_IS_BLOCKED_TOOLTIP'] = 'Devuelve verdadero si el robot está bloqueado, en caso contrario devuelve falso.';
Blockly.Msg['ROBOT_GET_DISTANCE_TITLE'] = 'valor del sensor de distancia (en cm)';
Blockly.Msg['ROBOT_GET_DISTANCE_TOOLTIP'] = 'Devuelve el valor del sensor de distancia del robot (en cm).';
Blockly.Msg['ROBOT_GET_INFRA_RED_TITLE'] = 'valores de los sensores de línea negra %1';
Blockly.Msg['ROBOT_GET_INFRA_RED_TOOLTIP'] = 'Permite leer los valores de los sensores de seguimiento de línea, de aproximadamente 0-500 (negro) a 500-1000 (blanco). La opción \'todos\' del bloque devuelve la matriz con los valores de los 5 sensores.';
Blockly.Msg['ROBOT_ALL_SENSORS'] = 'todos';
Blockly.Msg['ROBOT_SET_CAMERA_TITLE'] = 'activar la cámara con la resolución %1';
Blockly.Msg['ROBOT_SET_CAMERA_TOOLTIP'] = 'Activa la cámara del robot con la resolución elegida.';
Blockly.Msg['ROBOT_GET_CAMERA_TITLE'] = 'imagen de la cámara';
Blockly.Msg['ROBOT_GET_CAMERA_TOOLTIP'] = 'Devuelve la imagen capturada por la cámara del robot. Si la resolución elegida es \'1x1\', devuelve una lista de 3 enteros (componentes R, G, B), entre 0 y 255. Si la resolución es \'1x2\', devuelve una lista de 2 listas de 3 enteros. En otros casos, devuelve una lista de n_filas listas de n_columnas listas de 3 enteros.';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TITLE'] = 'controlar los LEDs en R %1 G %2 B %3';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TOOLTIP'] = 'Controla los LEDs del robot especificando las componentes roja, verde y azul (entre 0 y 255).';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TITLE'] = 'controlar los LEDs a %1';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TOOLTIP'] = 'Controla los LEDs del robot eligiendo un color de la paleta.';
Blockly.Msg['ROBOT_ROBOT_ALL_SENSORS'] = 'todos';
