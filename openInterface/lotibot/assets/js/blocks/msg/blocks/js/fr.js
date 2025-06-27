/**
 * @fileoverview French messages for Loti-bot. (FR)
 */

'use strict';

// Display 
Blockly.Msg['DISPLAY_SET_LEDS_RGB_TITLE'] = '[LEDs] R %1 V  %2 B %3';
Blockly.Msg['DISPLAY_SET_LEDS_RGB_TOOLTIP'] = 'Change la couleur des LEDs au format RVB du robot Loti-bot.';
Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TITLE'] = '[LEDs] %1';
Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TOOLTIP'] = 'Change la couleur des LEDs du robot Loti-bot en utilisant une palette de couleurs.';
Blockly.Msg['DISPLAY_SET_LED_RGB_TITLE'] = '[LEDs] gauche R %1 V %2 B %3 droite R %4 V %5 B %6';
Blockly.Msg['DISPLAY_SET_LED_RGB_TOOLTIP'] = 'Change la couleur des LEDs gauche et droite au format RVB du robot Loti-bot.';
Blockly.Msg['DISPLAY_SET_LED_PALETTE_TITLE'] = '[LEDs] gauche %1 droite %2';
Blockly.Msg['DISPLAY_SET_LED_PALETTE_TOOLTIP'] = Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TOOLTIP'];
Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TITLE'] = '[Phares] puissance %1';
Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TOOLTIP'] = 'Règle la puissance des phares du robot Loti-bot (entre 0 et 255).';
Blockly.Msg['DISPLAY_SET_HEADLIGHT_TITLE'] = '[Phares] puissance gauche %1 puissance droite %2';
Blockly.Msg['DISPLAY_SET_HEADLIGHT_TOOLTIP'] = Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TOOLTIP'];

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
Blockly.Msg["SENSORS_IS_STOPPED_TITLE"] = "est arrêté ?";
Blockly.Msg["SENSORS_IS_STOPPED_TOOLTIP"] = "Retourne vrai si le Lotibot est arrêté.";
Blockly.Msg["SENSORS_IS_MOVING_TITLE"] = "est en mouvement ?";
Blockly.Msg["SENSORS_IS_MOVING_TOOLTIP"] = "Retourne vrai si le Lotibot est en mouvement.";
Blockly.Msg["SENSORS_IS_COLLISION_DETECTED_TITLE"] = "collision détectée ?";
Blockly.Msg["SENSORS_IS_COLLISION_DETECTED_TOOLTIP"] = "Retourne vrai si une collision est détectée par le Lotibot.";
Blockly.Msg["SENSORS_IS_FALL_DETECTED_TITLE"] = "chute détectée ?";
Blockly.Msg["SENSORS_IS_FALL_DETECTED_TOOLTIP"] = "Retourne vrai si une chute est détectée par le Lotibot.";
Blockly.Msg["SENSORS_IS_SPEAKER_WORKING_TITLE"] = "haut-parleur fonctionne ?";
Blockly.Msg["SENSORS_IS_SPEAKER_WORKING_TOOLTIP"] = "Retourne vrai si le haut-parleur du Lotibot fonctionne correctement.";
Blockly.Msg["SENSORS_IS_HEADLIGHTS_WORKING_TITLE"] = "phares allumés ?";
Blockly.Msg["SENSORS_IS_HEADLIGHTS_WORKING_TOOLTIP"] = "Retourne vrai si les phares du Lotibot fonctionnent correctement.";
Blockly.Msg["SENSORS_GET_HEADING_TITLE"] = "orientation";
Blockly.Msg["SENSORS_GET_HEADING_TOOLTIP"] = "Retourne l'orientation actuelle du Lotibot entre 1 et 8 (1: NORD, 3: EST, 5: SUD, 7: OUEST).";
Blockly.Msg["SENSORS_GET_DISTANCE_TITLE"] = "distance";
Blockly.Msg["SENSORS_GET_DISTANCE_TOOLTIP"] = "Retourne la distance détectée par le capteur de distance du Lotibot.";
Blockly.Msg["SENSORS_GET_LIGHT_LEVEL_TITLE"] = "niveau de lumière ambiant";
Blockly.Msg["SENSORS_GET_LIGHT_LEVEL_TOOLTIP"] = "Retourne le niveau de lumière détecté par le capteur de lumière du Lotibot.";
Blockly.Msg["SENSORS_GET_SOUND_LEVEL_TITLE"] = "niveau de son ambiant";
Blockly.Msg["SENSORS_GET_SOUND_LEVEL_TOOLTIP"] = "Retourne le niveau de son détecté par le capteur de son du Lotibot.";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TITLE"] = "température";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TOOLTIP"] = "Retourne la température détectée par le capteur de température du Lotibot.";
Blockly.Msg["SENSORS_GET_BATTERY_LEVEL_TITLE"] = "niveau de batterie";
Blockly.Msg["SENSORS_GET_BATTERY_LEVEL_TOOLTIP"] = "Retourne le niveau de batterie actuel du Lotibot en pourcentage.";

// Actuators
Blockly.Msg['ACTUATORS_SET_MOTORS_TITLE'] = '%1 de %2 cm vitesse %3';
Blockly.Msg['ACTUATORS_SET_MOTORS_TOOLTIP'] = 'Permet d\'avancer ou reculer avec le robot Loti-bot à une certaine vitesse (lente, moyenne ou rapide).';
Blockly.Msg['ACTUATORS_ROTATE_WITH_ANGLE_TITLE'] = 'pivoter %1 de %2 ° vitesse %3';
Blockly.Msg['ACTUATORS_ROTATE_WITH_ANGLE_TOOLTIP'] = 'Permet de pivoter le robot Loti-bot de X° à une certaine vitesse (lente, moyenne ou rapide).';
Blockly.Msg['ACTUATORS_DRAW_SQUARE_TITLE'] = 'dessiner un carré de %1 cm de côté';
Blockly.Msg['ACTUATORS_DRAW_SQUARE_TOOLTIP'] = 'Permet au robot Loti-bot de se déplacer en formant un carré.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'arrêter les moteurs';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Permet d\'arrêter les moteurs du robot Loti-bot.';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TITLE'] = 'jouer le son n°%1';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TOOLTIP'] = 'Permet de jouer un son entre 1 et 20.';
Blockly.Msg['ACTUATORS_GO_FORWARD'] = "avancer";
Blockly.Msg['ACTUATORS_GO_BACKWARD'] = "reculer";
Blockly.Msg["ACTUATORS_SLOW"] = "lente";
Blockly.Msg["ACTUATORS_MEDIUM"] = "moyenne";
Blockly.Msg["ACTUATORS_FAST"] = "rapide";