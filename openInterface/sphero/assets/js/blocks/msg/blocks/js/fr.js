/**
 * @fileoverview French messages for Sphero. (FR)
 */

'use strict';

// Display 
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_TITLE'] = '[LED principale] R %1 V  %2 B %3';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_TOOLTIP'] = 'Change la couleur de la LED principale au format RVB du robot Sphero Mini.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_PALETTE_TITLE'] = '[LED principale] %1';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_PALETTE_TOOLTIP'] = 'Change la couleur de la LED principale du robot Sphero Mini en utilisant une palette de couleurs.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_FADE_TITLE'] = '[LED principale] fondu de %1 à %2 pendant %3 s';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_FADE_TOOLTIP'] = 'Change la couleur de la LED principale du robot Sphero Mini en faisant un fondu de couleurs.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_BLINK_TITLE'] = '[LED principale] clignoter en %1 pendant %2 s %3 fois';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_BLINK_TOOLTIP'] = 'Fait clignoter la LED principale du robot Sphero Mini.';
Blockly.Msg['DISPLAY_SET_BACK_LED_INTENSITY_TITLE'] = '[LED arrière] intensité %1';
Blockly.Msg['DISPLAY_SET_BACK_LED_INTENSITY_TOOLTIP'] = 'Change l\'intensité de la LED arrière (entre 0 et 255) du robot Sphero Mini.';

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

// Communication
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'écrire dans la console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Permet d\'écrire des données dans le port série.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'avec';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'saut(s) de ligne';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'tracer le graphe';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Ce bloc permet d\'écrire des données (numériques) qui seront visibles dans le traceur. Il peut être utilisé avec un ou plusieurs blocs au format "Nom" et "Données". Pour visualiser les graphiques, cliquer sur l\'icone \'Mode Graphique\' dans la console.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Donnée';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Nom %1 Valeur %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Ce bloc est à utiliser avec le bloc "Tracer le graphique". Il doit lui-même contenir le nom de la valeur à afficher (texte), et la valeur en question (nombre).';

// Sensors
Blockly.Msg['SENSORS_PITCH_TITLE'] = 'tangage (°)';
Blockly.Msg['SENSORS_PITCH_TOOLTIP'] = 'Retourne la valeur du tangage.';
Blockly.Msg['SENSORS_ROLL_TITLE'] = 'roulis (°)';
Blockly.Msg['SENSORS_ROLL_TOOLTIP'] = 'Retourne la valeur du roulis.';
Blockly.Msg['SENSORS_YAW_TITLE'] = 'lacet (°)';
Blockly.Msg['SENSORS_YAW_TOOLTIP'] = 'Retourne la valeur du  lacet.';
Blockly.Msg['SENSORS_ACCELEROMETER_TITLE'] = 'accéléromètre (g) %1';
Blockly.Msg['SENSORS_ACCELEROMETER_TOOLTIP'] = 'Retourne la valeur de l\'accéléromètre sur les axes x, y ou z.';
Blockly.Msg['SENSORS_GYROSCOPE_TITLE'] = 'gyroscope %1';
Blockly.Msg['SENSORS_GYROSCOPE_TOOLTIP'] = 'Retourne la valeur du gyroscope sur l\'axe x, y ou z.';
Blockly.Msg['SENSORS_IS_FALL_DETECTED_TITLE'] = 'collision ?';
Blockly.Msg['SENSORS_IS_FALL_DETECTED_TOOLTIP'] = 'Retourne vrai si une collision est détectée.';
Blockly.Msg['X_AXIS'] = 'x';
Blockly.Msg['Y_AXIS'] = 'y';
Blockly.Msg['Z_AXIS'] = 'z';
Blockly.Msg['STRENGTH'] = 'force';
// Actuators
Blockly.Msg['ACTUATORS_SET_MOTORS_TITLE'] = '%1 vitesse %2';
Blockly.Msg['ACTUATORS_SET_MOTORS_TOOLTIP'] = 'Permet d\'avancer ou reculer avec robot Sphero Mini à une certaine vitesse comprise entre 0 et 255.';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_TIMEOUT_TITLE'] = '%1 vitesse %2 pendant %3 s';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_TIMEOUT_TOOLTIP'] = 'Permet d\'avancer ou reculer avec robot Sphero Mini à une vitesse comprise entre 0 et 255 pendant un temps donné.';
Blockly.Msg['ACTUATORS_SET_HEADING_TITLE'] = 'cap %1 °';
Blockly.Msg['ACTUATORS_SET_HEADING_TOOLTIP'] = 'Permet de modifier le cap du robot Sphero Mini.';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_HEADING_TITLE'] = '%1 vitesse %2 cap %3 °';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_HEADING_TOOLTIP'] = 'Permet d\'avancer ou reculer avec robot Sphero Mini à une vitesse comprise entre 0 et 255 avec un cap donné.';
Blockly.Msg['ACTUATORS_ROTATE_TITLE'] = 'pivoter %1 vitesse %2';
Blockly.Msg['ACTUATORS_ROTATE_TOOLTIP'] = 'Permet de pivoter robot Sphero Mini à une vitesse comprise entre 0 et 255.';
Blockly.Msg['ACTUATORS_ROTATE_WITH_TIMEOUT_TITLE'] = 'pivoter %1 vitesse %2 pendant %3 s';
Blockly.Msg['ACTUATORS_ROTATE_WITH_TIMEOUT_TOOLTIP'] = 'Permet de pivoter robot Sphero Mini à une vitesse comprise entre 0 et 255 pendant un temps donnée.';
Blockly.Msg['ACTUATORS_SET_MOTOR_TITLE'] = 'moteur à %1 direction %2 vitesse %3';
Blockly.Msg['ACTUATORS_SET_MOTOR_TOOLTIP'] = 'Permet contrôler le moteur droit ou gauche du robot Sphero Mini à une vitesse comprise entre 0 et 255 dans une direction donnée.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'arrêter les moteur';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Permet d\'arrêter les moteurs du robot Sphero Mini.';
Blockly.Msg['ACTUATORS_RESET_HEADING_TITLE'] = 'remettre le cap par défaut';
Blockly.Msg['ACTUATORS_RESET_HEADING_TOOLTIP'] = 'Permet de faire une reset du cap du robot Sphero Mini.';
Blockly.Msg['ACTUATORS_GO_FORWARD'] = "avancer";
Blockly.Msg['ACTUATORS_GO_BACKWARD'] = "reculer";
Blockly.Msg['ACTUATORS_MOTOR_RIGHT'] = "droite";
Blockly.Msg['ACTUATORS_MOTOR_LEFT'] = "gauche";
Blockly.Msg['ACTUATORS_MOTOR_RIGHT&LEFT'] = "droite&gauche";