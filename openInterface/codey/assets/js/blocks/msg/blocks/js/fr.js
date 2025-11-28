/**
 * @fileoverview French messages for Codey. (FR)
 */

'use strict';

// Display 
Blockly.Msg['DISPLAY_SHOWRGB_TITLE'] = '[LED intégrée] R %1 G %2 B %3';
Blockly.Msg['DISPLAY_SHOWRGB_TOOLTIP'] = 'Affiche la couleur spécifiée sur la LED intégrée de Codey au format RGB (0 ~ 255).';
Blockly.Msg['DISPLAY_SETRED_TITLE'] = '[LED intégrée] inensité du rouge %1';
Blockly.Msg['DISPLAY_SETRED_TOOLTIP'] = 'Règle l\'intensité du rouge de la LED intégrée de Codey (0 ~ 255).';
Blockly.Msg['DISPLAY_SETGREEN_TITLE'] = '[LED intégrée] inensité du vert %1';
Blockly.Msg['DISPLAY_SETGREEN_TOOLTIP'] = 'Règle l\'intensité du vert de la LED intégrée de Codey (0 ~ 255).';
Blockly.Msg['DISPLAY_SETBLUE_TITLE'] = '[LED intégrée] inensité du bleu %1';
Blockly.Msg['DISPLAY_SETBLUE_TOOLTIP'] = 'Règle l\'intensité du bleu de la LED intégrée de Codey (0 ~ 255).';
Blockly.Msg['DISPLAY_OFF_TITLE'] = '[LED intégrée] éteindre';
Blockly.Msg['DISPLAY_OFF_TOOLTIP'] = 'Éteint la LED intégrée de Codey.';
Blockly.Msg['DISPLAY_SHOW_TITLE'] = '[Matrice] afficher %1';
Blockly.Msg['DISPLAY_SHOW_TOOLTIP'] = 'Affiche le texte spécifié sur la matrice LED de Codey.';
Blockly.Msg['DISPLAY_SETPIXEL_TITLE'] = '[Matrice] pixel X %1 Y %2 état %3';
Blockly.Msg['DISPLAY_SETPIXEL_TOOLTIP'] = 'Règle l\'état du pixel à la position X et Y de la matrice LED de Codey.';
Blockly.Msg['DISPLAY_GETPIXEL_TITLE'] = '[Matrice] état du pixel X %1 Y %2';
Blockly.Msg['DISPLAY_GETPIXEL_TOOLTIP'] = 'Renvoie l\'état du pixel à la position X et Y de la matrice LED de Codey.';
Blockly.Msg['DISPLAY_TOGGLEPIXEL_TITLE'] = '[Matrice] inverser l\'état du pixel X %1 Y %2';
Blockly.Msg['DISPLAY_TOGGLEPIXEL_TOOLTIP'] = 'Inverse l\'état du pixel à la position X et Y de la matrice LED de Codey.';
Blockly.Msg['DISPLAY_CLEAR_TITLE'] = '[Matrice] effacer';
Blockly.Msg['DISPLAY_CLEAR_TOOLTIP'] = 'Efface le contenu de la matrice LED de Codey.';
// IO - Bool
Blockly.Msg['IO_DIGITAL_SIGNAL_TITLE'] = '%1';
Blockly.Msg['IO_DIGITAL_SIGNAL_HIGH'] = 'HAUT (1)';
Blockly.Msg['IO_DIGITAL_SIGNAL_LOW'] = 'BAS (0)';
Blockly.Msg['IO_DIGITAL_SIGNAL_TOOLTIP'] = 'Retourne une valeur booléene (1 si HAUT ou 0 si BAS).';
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
// IO - Buttons
Blockly.Msg['IO_ONBUTTONPRESSED_TITLE'] = 'si le bouton %1 est appuyé alors';
Blockly.Msg['IO_ONBUTTONPRESSED_TOOLTIP'] = 'Exécute des instructions si les boutons A, B ou C sont préssés.';
Blockly.Msg['IO_BUTTON_STATE_TITLE'] = 'état du bouton %1';
Blockly.Msg['IO_BUTTON_STATE_TOOLTIP'] = 'Renvoie l\'état du bouton A, B ou C (true/false).';
// IO - Potentiometer
Blockly.Msg['IO_POTENTIOMETER_GET_VALUE_TITLE'] = 'valeur du potentiomètre';
Blockly.Msg['IO_POTENTIOMETER_GET_VALUE_TOOLTIP'] = 'Renvoie la valeur du potentiomètre (0 ~ 100).';
// Communication
Blockly.Msg['COMMUNICATION_IRRECEIVE_TITLE'] = '[IR] réception infrarouge';
Blockly.Msg['COMMUNICATION_IRRECEIVE_TOOLTIP'] = 'Renvoie la chaîne d\'informations reçue par le récepteur infrarouge. Les données envoyées par l\'émetteur infrarouge doivent donc se terminer par \\n. S\'il s\'agit d\'une commande à distance qui reçoit le protocole d\'encodage NEC, utilisez une autre fonction receive_remote_code().';
Blockly.Msg['COMMUNICATION_IRRECEIVEREMOTECODE_TITLE'] = '[IR] réception infrarouge (NEC)';
Blockly.Msg['COMMUNICATION_IRRECEIVEREMOTECODE_TOOLTIP'] = 'Renvoie le code du dernier signal infrarouge reçu sous forme de tableau. Le premier paramètre est l\'adresse, et le second paramètre est le contenu';
Blockly.Msg['COMMUNICATION_IRSEND_TITLE'] = '[IR] envoyer %1';
Blockly.Msg['COMMUNICATION_IRSEND_TOOLTIP'] = 'Envoie une cahine de caractères par infrarouge.';
Blockly.Msg['COMMUNICATION_IRSTARTLEARNING_TITLE'] = '[IR] commencer l\'apprentissage infrarouge';
Blockly.Msg['COMMUNICATION_IRSTARTLEARNING_TOOLTIP'] = 'Commence l\'apprentissage d\'un signal infrarouge. Compatible uniquement avec une télécommande NEC.';
Blockly.Msg['COMMUNICATION_IRSTOPLEARNING_TITLE'] = '[IR] arrêter l\'apprentissage infrarouge';
Blockly.Msg['COMMUNICATION_IRSTOPLEARNING_TOOLTIP'] = 'Arrête l\'apprentissage d\'un signal infrarouge.';
Blockly.Msg['COMMUNICATION_IRSAVELEARNEDRESULT_TITLE'] = '[IR] sauvegarder le signal à l\'index %1';
Blockly.Msg['COMMUNICATION_IRSAVELEARNEDRESULT_TOOLTIP'] = 'Sauvegarde le signal infrarouge appris dans la mémoire de Codey (index de 0 à 15).';
Blockly.Msg['COMMUNICATION_IRSENDLEARNEDRESULT_TITLE'] = '[IR] envoyer le signal d\'index %1';
Blockly.Msg['COMMUNICATION_IRSENDLEARNEDRESULT_TOOLTIP'] = 'Envoie le signal infrarouge appris depuis la mémoire de Codey.';
Blockly.Msg['COMMUNICATION_IRLEARN_TITLE'] = '[IR] temps d\'apprentissage %1 s';
Blockly.Msg['COMMUNICATION_IRLEARN_TOOLTIP'] = 'Apprend un signal infrarouge pendant le temps spécifié (en secondes).';
// Sensors - Motion
Blockly.Msg['SENSORS_GETROTATION_EULER_ANGLES_TITLE'] = '%1';
Blockly.Msg['SENSORS_GETROTATION_EULER_ANGLES_TOOLTIP'] = 'Renvoie la valeur de rotation selon l\'axe sélectionné (x, y, z).';
Blockly.Msg['SENSORS_PITCH'] = "inclinaison";
Blockly.Msg['SENSORS_ROLL'] = "roulis";
Blockly.Msg['SENSORS_YAW'] = "tangage";
Blockly.Msg['SENSORS_GETROTATION_TITLE'] = "angle sur l'axe %1";
Blockly.Msg['SENSORS_GETROTATION_TOOLTIP'] = "Renvoie l'angle de rotation du Codey sur les trois axes, le sens inverse des aiguilles d'une montre étant le sens positif";
Blockly.Msg['SENSORS_RESETROTATION_TITLE'] = "réinitialiser l'angle de rotation sur l'axe %1";
Blockly.Msg['SENSORS_RESETROTATION_TOOLTIP'] = "Réinitialise l'angle de rotation du Codey selon l'axe sélectionné à 0.";
Blockly.Msg['SENSORS_ALL_AXIS'] = "tous les axes";
Blockly.Msg['SENSORS_IS_SHAKED_TITLE'] = "secoué ?";
Blockly.Msg['SENSORS_IS_SHAKED_TOOLTIP'] = "Renvoie vrai si une secousse est détectée.";
Blockly.Msg['SENSORS_GET_SHAKE_STRENGTH_TITLE'] = "intensité de la secousse";
Blockly.Msg['SENSORS_GET_SHAKE_STRENGTH_TOOLTIP'] = "Renvoie l'intensité de la dernière secousse détectée.";
Blockly.Msg['SENSORS_GETPOSITION_TITLE'] = "%1 ?";
Blockly.Msg['SENSORS_IS_TILTED_LEFT'] = "penché à gauche";
Blockly.Msg['SENSORS_IS_TILTED_RIGHT'] = "penché à droite";
Blockly.Msg['SENSORS_IS_EARS_UP'] = "oreilles vers le haut";
Blockly.Msg['SENSORS_IS_EARS_DOWN'] = "oreilles vers le bas";
Blockly.Msg['SENSORS_IS_DISPLAY_UP'] = "écran vers le haut";
Blockly.Msg['SENSORS_IS_DISPLAY_DOWN'] = "écran vers le bas";
Blockly.Msg['SENSORS_IS_UPRIGHT'] = "à la verticale";
Blockly.Msg['SENSORS_GETPOSITION_TOOLTIP'] = "Renvoie vrai si l'appareil est dans la position indiquée.";
Blockly.Msg['SENSORS_GETACCELERATION_TITLE'] = "accélération selon %1";
Blockly.Msg['SENSORS_GETACCELERATION_TOOLTIP'] = "Renvoie la valeur de l'accélération sur l'axe ou la force totale.";
Blockly.Msg['SENSORS_GETGYROSCOPE_TITLE'] = "gyroscope selon l'axe %1";
Blockly.Msg['SENSORS_GETGYROSCOPE_TOOLTIP'] = "Renvoie la valeur du gyroscope sur l'axe sélectionné.";
// Sensors - Sound
Blockly.Msg['SENSORS_GET_LOUDNESS_TITLE'] = 'niveau sonore';
Blockly.Msg['SENSORS_GET_LOUDNESS_TOOLTIP'] = 'Renvoie le niveau sonore (0 ~ 100).';
// Sensors - Light
Blockly.Msg['SENSORS_GET_LIGHT_TITLE'] = 'valeur du capteur de lumière';
Blockly.Msg['SENSORS_GET_LIGHT_TOOLTIP'] = 'Renvoie la valeur du capteur de lumière (0 ~ 100).';
// Actuators - Audio
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_TITLE'] = "jouer le son %1";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_TOOLTIP'] = "Joue une mélodie prédéfinie.";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_UNTIL_DONE_TITLE'] = "jouer le son %1 jusqu'à la fin";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_UNTIL_DONE_TOOLTIP'] = "Joue une mélodie prédéfinie et attend la fin de la lecture.";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_NOTE_TITLE'] = "jouer la note %1";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_NOTE_TOOLTIP'] = "Joue une note de musique.";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_TITLE'] = "jouer la fréquence %1 Hz";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_TOOLTIP'] = "Joue un son d'une certaine fréquence.";
Blockly.Msg['ACTUATORS_AUDIO_REST_TITLE'] = "pause pendant %1 temps";
Blockly.Msg['ACTUATORS_AUDIO_REST_TOOLTIP'] = "Fait une pause dans la musique.";
Blockly.Msg['ACTUATORS_AUDIO_STOP_SOUNDS_TITLE'] = "arrêter tous les sons";
Blockly.Msg['ACTUATORS_AUDIO_STOP_SOUNDS_TOOLTIP'] = "Arrête tous les sons en cours.";
Blockly.Msg['ACTUATORS_AUDIO_SET_VOLUME_TITLE'] = "régler le volume sur %1";
Blockly.Msg['ACTUATORS_AUDIO_SET_VOLUME_TOOLTIP'] = "Définit le volume sonore.";
Blockly.Msg['ACTUATORS_AUDIO_GET_VOLUME_TITLE'] = "obtenir le volume";
Blockly.Msg['ACTUATORS_AUDIO_GET_VOLUME_TOOLTIP'] = "Renvoie le volume actuel.";
Blockly.Msg['ACTUATORS_AUDIO_SET_TEMPO_TITLE'] = "régler le tempo sur %1";
Blockly.Msg['ACTUATORS_AUDIO_SET_TEMPO_TOOLTIP'] = "Définit le tempo pour les sons.";
Blockly.Msg['ACTUATORS_AUDIO_GET_TEMPO_TITLE'] = "obtenir le tempo";
Blockly.Msg['ACTUATORS_AUDIO_GET_TEMPO_TOOLTIP'] = "Renvoie le tempo actuel.";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_DURATION'] = "pendant";
Blockly.Msg['ACTUATORS_AUDIO_PLAY_NOTE_DURATION'] = Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_DURATION'];
// Robots - Rocky
Blockly.Msg['ROBOTS_STOP_TITLE'] = '[Rocky] arrêter les moteurs';
Blockly.Msg['ROBOTS_STOP_TOOLTIP'] = 'Arrête tous les moteurs du robot Rocky.';
Blockly.Msg['ROBOTS_MOVE_TITLE'] = '[Rocky] %1 à la vitesse %2';
Blockly.Msg['ROBOTS_MOVE_TOOLTIP'] = 'Déplace le robot Rocky dans la direction spécifiée à la vitesse donnée (+/- 100).';
Blockly.Msg['ROBOTS_FORWARD'] = ' avancer';
Blockly.Msg['ROBOTS_BACKWARD'] = 'reculer';
Blockly.Msg['ROBOTS_LEFT'] = 'pivoter à gauche';
Blockly.Msg['ROBOTS_RIGHT'] = 'pivoter à droite';
Blockly.Msg['ROBOTS_DRIVE_TITLE'] = '[Rocky] vitesse des moteurs gauche %1 droite %2';
Blockly.Msg['ROBOTS_DRIVE_TOOLTIP'] = 'Définit la vitesse des moteurs gauche et droit du robot Rocky (+/- 100).';
Blockly.Msg['ROBOTS_TURN_BY_DEGREE_TITLE'] = '[Rocky] %1 de %2 °';
Blockly.Msg['ROBOTS_TURN_BY_DEGREE_TOOLTIP'] = 'Fait tourner le robot Rocky d\'un certain nombre de degrés (+/- 360).';
// Robots - Sensors
Blockly.Msg['ROBOTS_SENSORS_GET_RGB_TITLE'] = '[Rocky] capteur de couleur niveau de %1';
Blockly.Msg['ROBOTS_SENSORS_RED'] = 'rouge';
Blockly.Msg['ROBOTS_SENSORS_GREEN'] = 'vert';
Blockly.Msg['ROBOTS_SENSORS_BLUE'] = 'bleu';
Blockly.Msg['ROBOTS_SENSORS_GET_RGB_TOOLTIP'] = 'Renvoie la valeur du capteur de couleur IR pour la couleur spécifiée (rouge, vert, bleu).';
Blockly.Msg['ROBOTS_SENSORS_IS_COLOR_TITLE'] = '[Rocky] couleur %1 ?';
Blockly.Msg['ROBOTS_SENSORS_IS_COLOR_TOOLTIP'] = 'Renvoie vrai si le capteur de couleur IR détecte la couleur spécifiée (rouge, vert, bleu, jaune, cyan, magenta, blanc, noir).';
Blockly.Msg['ROBOTS_SENSORS_YELLOW'] = 'jaune';
Blockly.Msg['ROBOTS_SENSORS_CYAN'] = 'cyan';
Blockly.Msg['ROBOTS_SENSORS_MAGENTA'] = 'magenta';
Blockly.Msg['ROBOTS_SENSORS_WHITE'] = 'blanc';
Blockly.Msg['ROBOTS_SENSORS_BLACK'] = 'noir';
Blockly.Msg['ROBOTS_SENSORS_GET_LIGHT_TITLE'] = '[Rocky] capteur de lumière niveau de %1';
Blockly.Msg['ROBOTS_SENSORS_AMBIENT'] = 'lumière ambiante';
Blockly.Msg['ROBOTS_SENSORS_REFLECTED'] = 'lumière réfléchie';
Blockly.Msg['ROBOTS_SENSORS_GREYNESS'] = 'niveau de gris';
Blockly.Msg['ROBOTS_SENSORS_GET_LIGHT_TOOLTIP'] = 'Renvoie la valeur du capteur de lumière IR pour le type spécifié (lumière ambiante, lumière réfléchie, niveau de gris).';
Blockly.Msg['ROBOTS_SENSORS_IS_OBSTACLE_AHEAD_TITLE'] = '[Rocky] obstacle devant ?';
Blockly.Msg['ROBOTS_SENSORS_IS_OBSTACLE_AHEAD_TOOLTIP'] = 'Renvoie vrai si un obstacle est détecté devant le robot Rocky.';
Blockly.Msg['ROBOTS_SENSORS_SET_LED_COLOR_TITLE'] = '[Rocky] LED couleur %1';
Blockly.Msg['ROBOTS_SENSORS_SET_LED_COLOR_TOOLTIP'] = 'Définit la couleur de la LED du robot Rocky (rouge, vert, bleu, jaune, cyan, magenta, blanc, noir).';