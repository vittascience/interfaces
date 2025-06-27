/**
 * @fileoverview French messages for Lego Spike. (FR)
 */

'use strict';

// Display
Blockly.Msg['DISPLAY_SHOW_LEDS_TOOLTIP'] = "Permet de changer la couleur des LEDs de la matrice 3x3.";
Blockly.Msg['DISPLAY_SET_PIXEL_TITLE'] = "%1 contrôler la led x %2 y %3 %4";
Blockly.Msg['DISPLAY_SET_PIXEL_TOOLTIP'] = "Permet de changer la couleur d'une LED de la matrice 3x3.";
Blockly.Msg['DISPLAY_SET_INTENSITY_TITLE'] = "%1 régler l'intensité %2 %";
Blockly.Msg['DISPLAY_SET_INTENSITY_TOOLTIP'] = "Permet de changer l'intensité lumineuse des LEDqsde la matrice 3x3.";

// Actuators
Blockly.Msg['ACTUATORS_START_MOTOR_CONTINUOUS_TITLE'] = "%1 démarrer le moteur %2 vitesse %3 % en continu";
Blockly.Msg['ACTUATORS_START_MOTOR_CONTINUOUS_TOOLTIP'] = "Démarre le moteur dans la direction spécifiée à la vitesse donnée en continu.";
Blockly.Msg['ACTUATORS_START_MOTOR_FOR_TIME_TITLE'] = "%1 démarrer le moteur %2 vitesse %3 % pendant %4 secondes";
Blockly.Msg['ACTUATORS_START_MOTOR_FOR_TIME_TOOLTIP'] = "Démarre le moteur dans la direction spécifiée à la vitesse donnée pendant la durée spécifiée.";
Blockly.Msg['ACTUATORS_MOVE_MOTOR_TO_POSITION_TITLE'] = "%1 déplacer le moteur à la position %2 ° vitesse %3 %";
Blockly.Msg['ACTUATORS_MOVE_MOTOR_TO_POSITION_TOOLTIP'] = "Déplace le moteur à la position spécifiée à la vitesse donnés.";
Blockly.Msg['ACTUATORS_STOP_MOTOR_TITLE'] = "%1 arrêter le moteur";
Blockly.Msg['ACTUATORS_STOP_MOTOR_TOOLTIP'] = "Arrête le moteur.";
Blockly.Msg['ACTUATORS_MOVE_MOTORS_BY_DEGREES_TITLE'] = "%1 déplacer le moteur %2 de %3 ° vitesse %4 %";
Blockly.Msg['ACTUATORS_MOVE_MOTORS_BY_DEGREES_TOOLTIP'] = "Déplace le moteur du nombre de degrés spécifié dans la direction donnée à la vitesse fournie.";

// Communication
Blockly.Msg['COMMUNICATION_SPEECH_SYNTHESIS_SAY_TITLE'] = 'dire %1 en %2';
Blockly.Msg['COMMUNICATION_SPEECH_SYNTHESIS_SAY_TOOLTIP'] = 'Permet de faire parler le prériphérique utilisé dans la langue spécifiée.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'écrire dans la console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Permet d\'écrire des données dans le port série.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'avec';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'saut(s) de ligne';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'tracer le graphe';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Ce bloc permet d\'écrire des données (numériques) qui seront visibles dans le traceur. Il peut être utilisé avec un ou plusieurs blocs au format "Nom" et "Données". Pour visualiser les graphiques, cliquer sur l\'icone \'Mode Graphique\' dans la console.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Donnée';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Nom %1 Valeur %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Ce bloc est à utiliser avec le bloc "Tracer le graphique". Il doit lui-même contenir le nom de la valeur à afficher (texte), et la valeur en question (nombre).';

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

// Actuators
Blockly.Msg['ACTUATORS_MOVE_FORWARD_TITLE'] = 'avancer';
Blockly.Msg['ACTUATORS_MOVE_FORWARD_TOOLTIP'] = 'Permet de faire avancer le robot Lego Spike.';
Blockly.Msg['ACTUATORS_MOVE_BACKWARD_TITLE'] = 'reculer';
Blockly.Msg['ACTUATORS_MOVE_BACKWARD_TOOLTIP'] = 'Permet de faire reculer le robot Lego Spike.';
Blockly.Msg['ACTUATORS_TURN_LEFT_45_DEGREES_TITLE'] = 'tourner à gauche de 45°';
Blockly.Msg['ACTUATORS_TURN_LEFT_45_DEGREES_TOOLTIP'] = 'Permet de faire tourner le robot Lego Spike à gauche de 45°.';
Blockly.Msg['ACTUATORS_TURN_LEFT_90_DEGREES_TITLE'] = 'tourner à gauche de 90°';
Blockly.Msg['ACTUATORS_TURN_LEFT_90_DEGREES_TOOLTIP'] = 'Permet de faire tourner le robot Lego Spike à gauche de 90°.';
Blockly.Msg['ACTUATORS_TURN_RIGHT_45_DEGREES_TITLE'] = 'tourner à droite de 45°';
Blockly.Msg['ACTUATORS_TURN_RIGHT_45_DEGREES_TOOLTIP'] = 'Permet de faire tourner le robot Lego Spike à droite de 45°.';
Blockly.Msg['ACTUATORS_TURN_RIGHT_90_DEGREES_TITLE'] = 'tourner à droite de 90°';
Blockly.Msg['ACTUATORS_TURN_RIGHT_90_DEGREES_TOOLTIP'] = 'Permet de faire tourner le robot Lego Spike à droite de 90°.';

//Sensors
Blockly.Msg['SENSORS_COLOR_TITLE'] = '%1 couleur détectée';
Blockly.Msg['SENSORS_COLOR_TOOLTIP'] = 'Retourne la couleur détectée sous forme d\'une chaine de caractère (Black, Purple, Blue, Green, Yellow, Orange, Red, White).';
Blockly.Msg['SENSORS_COLOR_DETECTION_TITLE'] = '%1 couleur détectée est %2';
Blockly.Msg['SENSORS_COLOR_DETECTION_TOOLTIP'] = 'Retourne vrai si la couleur détectée correspond à celle spécifiée.';
