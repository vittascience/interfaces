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
Blockly.Msg['ROBOT_ROBOT_ALL_SENSORS'] = 'tous';
