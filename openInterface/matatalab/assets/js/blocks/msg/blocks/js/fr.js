/**
 * @fileoverview French messages for Matatalab. (FR)
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
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'remettre le chronomètre à 0';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Initialise un chronomètre à 0 (en secondes).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valeur du chronomètre en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Renvoie la valeur du chronomètre à partir de l\'initialisation (en secondes ou millisecondes).';

// Actuators
Blockly.Msg['ACTUATORS_MOVE_TITLE'] = '%1 de %2 pas';
Blockly.Msg['ACTUATORS_MOVE_TOOLTIP'] = 'Déplace le robot MatataBot d\'un nombre de pas (1 pas = 10 cm).';
Blockly.Msg['ACTUATORS_MOVE_CM_TITLE'] = 'se déplacer de %1 cm';
Blockly.Msg['ACTUATORS_MOVE_CM_TOOLTIP'] = 'Déplace le robot MatataBot d\'une distance en cm. Une valeur négative le fait reculer.';
Blockly.Msg['ACTUATORS_TURN_TITLE'] = 'pivoter à %1 de %2 °';
Blockly.Msg['ACTUATORS_TURN_TOOLTIP'] = 'Fait pivoter le robot MatataBot sur place.';
Blockly.Msg['ACTUATORS_SET_GEAR_TITLE'] = 'régler %1 à la vitesse %2';
Blockly.Msg['ACTUATORS_SET_GEAR_TOOLTIP'] = 'Fait tourner une roue ou les deux, de la vitesse -6 (arrière) à 6 (avant). 0 arrête la roue.';
Blockly.Msg['ACTUATORS_SET_SPEED_TITLE'] = 'régler la vitesse des roues : gauche %1 droite %2 (cm/s)';
Blockly.Msg['ACTUATORS_SET_SPEED_TOOLTIP'] = 'Règle la vitesse des deux roues, entre -16 et 16 cm/s. Une valeur négative fait tourner la roue en arrière.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'arrêter %1';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Arrête une roue ou les deux.';
Blockly.Msg['ACTUATORS_DANCE_TITLE'] = 'faire la danse n°%1';
Blockly.Msg['ACTUATORS_DANCE_TOOLTIP'] = 'Le robot MatataBot fait une danse, de 1 à 6.';
Blockly.Msg['ACTUATORS_ACTION_TITLE'] = 'faire l\'action n°%1';
Blockly.Msg['ACTUATORS_ACTION_TOOLTIP'] = 'Le robot MatataBot fait une action, de 1 à 6.';

// Sound
Blockly.Msg['SOUND_PLAY_NOTE_TITLE'] = 'jouer la note %1 pendant %2 ms';
Blockly.Msg['SOUND_PLAY_NOTE_TOOLTIP'] = 'Joue une note sur le robot MatataBot pendant une durée en millisecondes.';
Blockly.Msg['SOUND_PLAY_MELODY_TITLE'] = 'jouer la mélodie n°%1';
Blockly.Msg['SOUND_PLAY_MELODY_TOOLTIP'] = 'Joue une mélodie du robot MatataBot, de 1 à 10.';
Blockly.Msg['SOUND_PLAY_MUSIC_TITLE'] = 'jouer la chanson n°%1';
Blockly.Msg['SOUND_PLAY_MUSIC_TOOLTIP'] = 'Joue une chanson du robot MatataBot, de 1 à 6.';

// Display
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TITLE'] = 'allumer %1 en %2 avec la luminosité %3';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TOOLTIP'] = 'Allume les yeux du robot MatataBot avec une luminosité de 0 à 6.';
Blockly.Msg['DISPLAY_SET_EYES_TITLE'] = 'allumer %1 de la couleur %2';
Blockly.Msg['DISPLAY_SET_EYES_TOOLTIP'] = 'Allume les yeux du robot MatataBot d\'une couleur choisie.';
Blockly.Msg['DISPLAY_CLEAR_EYES_TITLE'] = 'éteindre les yeux';
Blockly.Msg['DISPLAY_CLEAR_EYES_TOOLTIP'] = 'Éteint les yeux du robot MatataBot.';

// Communication
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'écrire dans la console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Permet d\'écrire des données dans le port série.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'avec';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'saut(s) de ligne';

// MatataCon
Blockly.Msg['MATATACON_IS_BUTTON_TITLE'] = 'bouton %1 appuyé';
Blockly.Msg['MATATACON_IS_BUTTON_TOOLTIP'] = 'Renvoie Vrai si le bouton du contrôleur MatataCon est appuyé.';
Blockly.Msg['MATATACON_IS_GESTURE_TITLE'] = 'contrôleur %1';
Blockly.Msg['MATATACON_IS_GESTURE_TOOLTIP'] = 'Renvoie Vrai si ce mouvement du contrôleur MatataCon est détecté.';
Blockly.Msg['MATATACON_IS_COLOR_TITLE'] = 'couleur %1 détectée';
Blockly.Msg['MATATACON_IS_COLOR_TOOLTIP'] = 'Renvoie Vrai si le capteur de couleur du contrôleur MatataCon détecte cette couleur.';
Blockly.Msg['MATATACON_IS_SOUND_TITLE'] = 'son détecté';
Blockly.Msg['MATATACON_IS_SOUND_TOOLTIP'] = 'Renvoie Vrai si le contrôleur MatataCon détecte un son.';
Blockly.Msg['MATATACON_IS_OBSTACLE_TITLE'] = 'obstacle détecté';
Blockly.Msg['MATATACON_IS_OBSTACLE_TOOLTIP'] = 'Renvoie Vrai si le contrôleur MatataCon détecte un obstacle.';
Blockly.Msg['MATATACON_IS_LIGHT_TITLE'] = '%1 détectée';
Blockly.Msg['MATATACON_IS_LIGHT_TOOLTIP'] = 'Renvoie Vrai si le contrôleur MatataCon détecte la lumière ou l\'obscurité.';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TITLE'] = 'luminosité';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TOOLTIP'] = 'Renvoie la luminosité mesurée par le contrôleur MatataCon, de 0 à 255.';
Blockly.Msg['MATATACON_GET_COLOR_TITLE'] = 'valeur de %1 du capteur de couleur';
Blockly.Msg['MATATACON_GET_COLOR_TOOLTIP'] = 'Renvoie la composante rouge, verte ou bleue mesurée par le contrôleur MatataCon, de 0 à 255.';
Blockly.Msg['MATATACON_GET_ANGLE_TITLE'] = 'angle de %1 (°)';
Blockly.Msg['MATATACON_GET_ANGLE_TOOLTIP'] = 'Renvoie l\'angle du contrôleur MatataCon, en degrés.';
Blockly.Msg['MATATACON_GET_ACCELERATION_TITLE'] = 'accélération sur l\'axe %1';
Blockly.Msg['MATATACON_GET_ACCELERATION_TOOLTIP'] = 'Renvoie l\'accélération du contrôleur MatataCon sur un axe.';
Blockly.Msg['MATATACON_GET_SHAKING_TITLE'] = 'intensité des secousses';
Blockly.Msg['MATATACON_GET_SHAKING_TOOLTIP'] = 'Renvoie l\'intensité des secousses du contrôleur MatataCon.';
Blockly.Msg['MATATACON_SET_RING_COLOR_TITLE'] = '[Anneau] allumer la LED n°%1 en %2 avec la luminosité %3';
Blockly.Msg['MATATACON_SET_RING_COLOR_TOOLTIP'] = 'Allume une LED de l\'anneau du contrôleur MatataCon, de 1 à 12, avec une luminosité de 0 à 6. Le numéro 0 allume toutes les LED.';
Blockly.Msg['MATATACON_SET_RING_TITLE'] = '[Anneau] allumer la LED n°%1 de la couleur %2';
Blockly.Msg['MATATACON_SET_RING_TOOLTIP'] = 'Allume une LED de l\'anneau du contrôleur MatataCon, de 1 à 12, d\'une couleur choisie. Le numéro 0 allume toutes les LED.';
Blockly.Msg['MATATACON_SET_RING_LEDS_TITLE'] = '[Anneau] allumer les LED %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12';
Blockly.Msg['MATATACON_SET_RING_LEDS_TOOLTIP'] = 'Choisit la couleur des 12 LED de l\'anneau du contrôleur MatataCon, de la LED n°1 à la LED n°12.';
Blockly.Msg['MATATACON_RING_ANIMATION_TITLE'] = '[Anneau] lancer l\'animation %1';
Blockly.Msg['MATATACON_RING_ANIMATION_TOOLTIP'] = 'Lance une animation lumineuse sur l\'anneau du contrôleur MatataCon.';
Blockly.Msg['MATATACON_CLEAR_RING_TITLE'] = '[Anneau] éteindre toutes les LED';
Blockly.Msg['MATATACON_CLEAR_RING_TOOLTIP'] = 'Éteint l\'anneau du contrôleur MatataCon.';
Blockly.Msg['MATATACON_SEND_MESSAGE_TITLE'] = 'envoyer le message n°%1';
Blockly.Msg['MATATACON_SEND_MESSAGE_TOOLTIP'] = 'Envoie un message, de 1 à 6, aux autres contrôleurs MatataCon.';
Blockly.Msg['MATATACON_IS_MESSAGE_TITLE'] = 'message n°%1 reçu';
Blockly.Msg['MATATACON_IS_MESSAGE_TOOLTIP'] = 'Renvoie Vrai si le contrôleur MatataCon a reçu ce message, de 1 à 6.';
Blockly.Msg['MATATACON_GET_MESSAGE_TITLE'] = 'message reçu';
Blockly.Msg['MATATACON_GET_MESSAGE_TOOLTIP'] = 'Renvoie le numéro du message reçu par le contrôleur MatataCon, ou 0 sans message.';

// Options
Blockly.Msg['MATATALAB_DIR_FORWARD'] = 'avancer';
Blockly.Msg['MATATALAB_DIR_BACKWARD'] = 'reculer';
Blockly.Msg['MATATALAB_DIR_LEFT'] = 'gauche';
Blockly.Msg['MATATALAB_DIR_RIGHT'] = 'droite';
Blockly.Msg['MATATALAB_WHEEL_BOTH'] = 'les deux roues';
Blockly.Msg['MATATALAB_WHEEL_LEFT'] = 'la roue gauche';
Blockly.Msg['MATATALAB_WHEEL_RIGHT'] = 'la roue droite';
Blockly.Msg['MATATALAB_EYE_BOTH'] = 'les deux yeux';
Blockly.Msg['MATATALAB_EYE_LEFT'] = 'l\'œil gauche';
Blockly.Msg['MATATALAB_EYE_RIGHT'] = 'l\'œil droit';
Blockly.Msg['MATATALAB_COLOR_WHITE'] = 'blanc';
Blockly.Msg['MATATALAB_COLOR_RED'] = 'rouge';
Blockly.Msg['MATATALAB_COLOR_YELLOW'] = 'jaune';
Blockly.Msg['MATATALAB_COLOR_GREEN'] = 'vert';
Blockly.Msg['MATATALAB_COLOR_BLUE'] = 'bleu';
Blockly.Msg['MATATALAB_COLOR_PURPLE'] = 'violet';
Blockly.Msg['MATATALAB_COLOR_BLACK'] = 'noir';
Blockly.Msg['MATATALAB_ANIMATION_SPOONDRIFT'] = 'vague';
Blockly.Msg['MATATALAB_ANIMATION_METEOR'] = 'météore';
Blockly.Msg['MATATALAB_ANIMATION_RAINBOW'] = 'arc-en-ciel';
Blockly.Msg['MATATALAB_ANIMATION_FIREFLY'] = 'luciole';
Blockly.Msg['MATATALAB_ANIMATION_COLORWIPE'] = 'balayage';
Blockly.Msg['MATATALAB_ANIMATION_BREATHE'] = 'respiration';
Blockly.Msg['MATATALAB_BUTTON_PLAY'] = 'lecture';
Blockly.Msg['MATATALAB_BUTTON_DELETE'] = 'supprimer';
Blockly.Msg['MATATALAB_BUTTON_FORWARD'] = 'avant';
Blockly.Msg['MATATALAB_BUTTON_BACKWARD'] = 'arrière';
Blockly.Msg['MATATALAB_BUTTON_LEFT'] = 'gauche';
Blockly.Msg['MATATALAB_BUTTON_RIGHT'] = 'droite';
Blockly.Msg['MATATALAB_BUTTON_MUSIC'] = 'musique';
Blockly.Msg['MATATALAB_GESTURE_SHAKE'] = 'secoué';
Blockly.Msg['MATATALAB_GESTURE_TILT_LEFT'] = 'penché à gauche';
Blockly.Msg['MATATALAB_GESTURE_TILT_RIGHT'] = 'penché à droite';
Blockly.Msg['MATATALAB_GESTURE_TILT_FORWARD'] = 'penché en avant';
Blockly.Msg['MATATALAB_GESTURE_TILT_BACKWARD'] = 'penché en arrière';
Blockly.Msg['MATATALAB_GESTURE_FALL'] = 'en chute libre';
Blockly.Msg['MATATALAB_GESTURE_FACE_UP'] = 'tourné vers le haut';
Blockly.Msg['MATATALAB_GESTURE_FACE_DOWN'] = 'tourné vers le bas';
Blockly.Msg['MATATALAB_LIGHT_BRIGHT'] = 'lumière';
Blockly.Msg['MATATALAB_LIGHT_DARK'] = 'obscurité';
Blockly.Msg['MATATALAB_ANGLE_PITCH'] = 'tangage';
Blockly.Msg['MATATALAB_ANGLE_ROLL'] = 'roulis';
Blockly.Msg['MATATALAB_ANGLE_YAW'] = 'lacet';

// Search keywords of the blocks: <X>_KEYWORDS completes the block whose tooltip is <X>_TOOLTIP (see ToolboxManager)
Blockly.Msg['IO_WAIT_KEYWORDS'] = 'temporiser, délai';
Blockly.Msg['IO_WAIT_UNTIL_KEYWORDS'] = 'attendre, pause';
Blockly.Msg['IO_INITCHRONOMETER_KEYWORDS'] = 'chronomètre, démarrer, réinitialiser';
Blockly.Msg['IO_GETCHRONOMETER_KEYWORDS'] = 'chronomètre, écoulé';
Blockly.Msg['ACTUATORS_MOVE_KEYWORDS'] = 'avancer, reculer, déplacer';
Blockly.Msg['ACTUATORS_MOVE_CM_KEYWORDS'] = 'avancer, reculer, distance';
Blockly.Msg['ACTUATORS_TURN_KEYWORDS'] = 'tourner, rotation';
Blockly.Msg['ACTUATORS_SET_GEAR_KEYWORDS'] = 'moteur, roue, vitesse';
Blockly.Msg['ACTUATORS_SET_SPEED_KEYWORDS'] = 'moteur, roue, vitesse';
Blockly.Msg['ACTUATORS_STOP_KEYWORDS'] = 'stop, moteur';
Blockly.Msg['ACTUATORS_DANCE_KEYWORDS'] = 'danser';
Blockly.Msg['ACTUATORS_ACTION_KEYWORDS'] = 'mouvement, animation';
Blockly.Msg['SOUND_PLAY_NOTE_KEYWORDS'] = 'musique, son, note';
Blockly.Msg['SOUND_PLAY_MELODY_KEYWORDS'] = 'musique, son';
Blockly.Msg['SOUND_PLAY_MUSIC_KEYWORDS'] = 'musique, son, chanson';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_KEYWORDS'] = 'LED, yeux, allumer, couleur';
Blockly.Msg['DISPLAY_SET_EYES_KEYWORDS'] = 'LED, yeux, allumer, RGB';
Blockly.Msg['DISPLAY_CLEAR_EYES_KEYWORDS'] = 'LED, éteindre';
Blockly.Msg['MATATACON_SET_RING_COLOR_KEYWORDS'] = 'LED, anneau, allumer, couleur';
Blockly.Msg['MATATACON_SET_RING_KEYWORDS'] = 'LED, anneau, allumer, RGB';
Blockly.Msg['MATATACON_SET_RING_LEDS_KEYWORDS'] = 'LED, anneau, couleurs';
Blockly.Msg['MATATACON_RING_ANIMATION_KEYWORDS'] = 'LED, anneau, effet';
Blockly.Msg['MATATACON_CLEAR_RING_KEYWORDS'] = 'LED, anneau, éteindre';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_KEYWORDS'] = 'console, transmettre, envoyer';
Blockly.Msg['MATATACON_SEND_MESSAGE_KEYWORDS'] = 'envoyer, radio';
Blockly.Msg['MATATACON_IS_MESSAGE_KEYWORDS'] = 'recevoir, radio';
Blockly.Msg['MATATACON_GET_MESSAGE_KEYWORDS'] = 'recevoir, radio';
Blockly.Msg['MATATACON_IS_BUTTON_KEYWORDS'] = 'bouton, touche';
Blockly.Msg['MATATACON_IS_GESTURE_KEYWORDS'] = 'mouvement, geste, accéléromètre';
Blockly.Msg['MATATACON_IS_COLOR_KEYWORDS'] = 'capteur, couleur';
Blockly.Msg['MATATACON_IS_SOUND_KEYWORDS'] = 'micro, bruit';
Blockly.Msg['MATATACON_IS_OBSTACLE_KEYWORDS'] = 'infrarouge, distance';
Blockly.Msg['MATATACON_IS_LIGHT_KEYWORDS'] = 'luminosité, lumière';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_KEYWORDS'] = 'lumière, capteur';
Blockly.Msg['MATATACON_GET_COLOR_KEYWORDS'] = 'RGB, couleur';
Blockly.Msg['MATATACON_GET_ANGLE_KEYWORDS'] = 'inclinaison, gyroscope';
Blockly.Msg['MATATACON_GET_ACCELERATION_KEYWORDS'] = 'accéléromètre';
Blockly.Msg['MATATACON_GET_SHAKING_KEYWORDS'] = 'secouer, accéléromètre';
