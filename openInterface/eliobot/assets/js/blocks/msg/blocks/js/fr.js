/**
 * @fileoverview English messages for Eliobot. (EN)
 */
'use strict';
// Display
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TITLE'] = 'contrôler la LED intégrée %1';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP'] = 'Permet d\'allumer la LED RGB intégrée sur le robot Eliobot.';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_OFF_TITLE'] = 'éteindre la LED intégrée';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_OFF_TOOLTIP'] = 'Permet d\'éteindre la LED RGB intégrée sur le robot Eliobot.';
// Input/Output
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
Blockly.Msg['IO_BUTTON_STATE_TITLE'] = 'bouton %1 appuyé';
Blockly.Msg['IO_BUTTON_STATE_TOOLTIP'] = '';
Blockly.Msg['IO_BUTTON_STATE_PRESSED'] = 'est';
Blockly.Msg['IO_BUTTON_STATE_NOT_PRESSED'] = 'n\'est pas';
// Communication - Serial connection
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'écrire dans la console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Permet d\'écrire des données dans la console.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'avec';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'saut.s de ligne';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'tracer le graphe';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Ce bloc permet d\'écrire des données (numériques) qui seront visibles dans le traceur. Il peut être utilisé avec un ou plusieurs blocs au format "Nom" et "Données". Pour visualiser les graphiques, cliquer sur l\'icone \'Mode Graphique\' dans la console.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Donnée';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Nom %1 Valeur %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Ce bloc est à utiliser avec le bloc "Tracer le graphique". Il doit lui-même contenir le nom de la valeur à afficher (texte), et la valeur en question (nombre).';
// Sensors
Blockly.Msg['SENSORS_READ_OBSTACLE_TITLE'] = 'un obstacle est %1';
Blockly.Msg['SENSORS_READ_OBSTACLE_TOOLTIP'] = 'Permet de detecter si un obstacle est présent.';
Blockly.Msg['SENSORS_READ_OBSTACLE_FORWARD'] = 'devant';
Blockly.Msg['SENSORS_READ_OBSTACLE_BACKWARD'] = 'derrière';
Blockly.Msg['SENSORS_READ_OBSTACLE_RIGHT'] = 'à droite';
Blockly.Msg['SENSORS_READ_OBSTACLE_LEFT'] = 'à gauche';
Blockly.Msg['SENSORS_DHT11_TEMPERATURE_TITLE'] = '[DHT11] température';
Blockly.Msg['SENSORS_DHT11_TEMPERATURE_TOOLTIP'] = 'Permet de la température (°C) grâce au capteur DHT11.';
Blockly.Msg['SENSORS_DHT11_HUMIDITY_TITLE'] = '[DHT11] humidité';
Blockly.Msg['SENSORS_DHT11_HUMIDITY_TOOLTIP'] = 'Permet de l\'humidité (%) grâce au capteur DHT11.';
Blockly.Msg['SENSORS_LINE_FOLLOW_TITLE'] = 'suivre la ligne';
Blockly.Msg['SENSORS_LINE_FOLLOW_TOOLTIP'] = 'Permet au robot Eliobot de suivre une ligne.';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TITLE'] = 'sensibilité du suivi de ligne %1';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TOOLTIP'] = 'Permet de modifier la sensibilité des capteurs du Eliobot.';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TITLE'] = 'état du capteur de ligne %1';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TOOLTIP'] = 'Retourne l\'état d\'un des capteurs de suivi de ligne.';
Blockly.Msg['SENSORS_LINE_LEFT'] = "gauche";
Blockly.Msg['SENSORS_LINE_MIDDLE_LEFT'] = "milieu gauche";
Blockly.Msg['SENSORS_LINE_MIDDLE'] = "milieu";
Blockly.Msg['SENSORS_LINE_MIDDLE_RIGHT'] = "milieu droit";
Blockly.Msg['SENSORS_LINE_RIGHT'] = "droit";
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TITLE'] = 'valeur du capteur de ligne %1';
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TOOLTIP'] = 'Retourne la valeur d\'un des capteurs de suivi de ligne du Eliobot.';
// Actuators
Blockly.Msg['ROBOT_MOVE_TITLE'] = 'se déplacer vers %1 à la vitesse %2';
Blockly.Msg['ROBOT_MOVE_TOOLTIP'] = 'Permet de contrôler les moteurs du robot Eliobot pour avancer ou reculer.';
Blockly.Msg['ROBOT_MOVE_FORWARD'] = 'l\'avant';
Blockly.Msg['ROBOT_MOVE_BACKWARD'] = 'l\'arrière';
Blockly.Msg['ROBOT_ROTATE_TITLE'] = 'contrôler le robot pivoter à %1 à la vitesse %2';
Blockly.Msg['ROBOT_ROTATE_TOOLTIP'] = 'Pivote le Eliobot sur la gauche ou la droite.';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'droite';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'gauche';
Blockly.Msg['ROBOT_ROTATE_FOREVER_TITLE'] = 'contrôler le robot pivoter à %1 pendant %2 %3 à la vitesse %4';
Blockly.Msg['ROBOT_ROTATE_FOREVER_TOOLTIP'] = 'Pivote le Eliobot sur la gauche ou la droite';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'arrêter le robot';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'Arrête les moteurs du Eliobot.';
Blockly.Msg['ROBOT_SET_SPEED_TITLE'] = 'vitesse %1 %';
Blockly.Msg['ROBOT_SET_SPEED_TOOLTIP'] = 'Change la vitesse du Eliobot.';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TITLE'] = 'pivoter à %1 de %2° à la vitesse %3';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TOOLTIP'] = 'Pivote le Eliobot à gauche ou à droite de l\'angle désiré.';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TITLE'] = 'tourner la roue %1 vers %2 à la vitesse %3';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TOOLTIP'] = 'Tourne une des roues du Eliobot dans la direction désirée.';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TITLE'] = 'avancer de %1 case(s) à la vitesse %2';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TOOLTIP'] = 'Permet au Eliobot de se déplacer par case.';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TITLE'] = 'jouer la note %1 pendant %2 %3';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TOOLTIP'] = 'Ce bloc permet de jouer une note de musique. La note est définie par son nom (Do, Ré, Mi, Fa, Sol, La, Si) et le temps pendant lequel elle est jouée.';
Blockly.Msg['ACTUATORS_FREQUENCY_TITLE'] = 'jouer une fréquence %1 (Hz) pendant %2 %3';
Blockly.Msg['ACTUATORS_FREQUENCY_TOOLTIP'] = 'Ce bloc permet de jouer une fréquence. La fréquence est définie en Hertz (Hz) et le temps pendant lequel elle est jouée.';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TITLE'] = 'jouer la musique %1';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TOOLTIP'] = 'Ce bloc permet de jouer une musique prédéfinie. Il y a plusieurs musiques prédéfinies disponibles.';
Blockly.Msg['ACTUATORS_SET_VOLUME_TITLE'] = 'modifier le volume à %1 %';
Blockly.Msg['ACTUATORS_SET_VOLUME_TOOLTIP'] = 'Ce bloc permet de jouer une fréquence. La fréquence est définie en Hertz (Hz) et le temps pendant lequel elle est jouée.';