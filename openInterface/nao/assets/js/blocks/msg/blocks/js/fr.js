/**
 * @fileoverview French messages for Nao. (FR)
 */
'use strict';

// Display
Blockly.Msg["DISPLAY_FADE_TITLE"] = "faire varier l'intensité %1 intensité %2 % pendant %3 s";
Blockly.Msg["DISPLAY_FADE_TOOLTIP"] = "Change graduellement l'intensité des LEDs spécifiées.";
Blockly.Msg["DISPLAY_ALL_LEDS_GROUP"] = "toutes les LEDs";
Blockly.Msg["DISPLAY_BRAIN_LEDS_GROUP"] = "LEDs de la tête";
Blockly.Msg["DISPLAY_EAR_LEDS_GROUP"] = "LEDs des oreilles";
Blockly.Msg["DISPLAY_FACE_LEDS_GROUP"] = "LEDs du visage";
Blockly.Msg["DISPLAY_CHEST_LEDS_GROUP"] = "LEDs du torse";
Blockly.Msg["DISPLAY_FEET_LEDS_GROUP"] = "LEDs des pieds";
Blockly.Msg["DISPLAY_FADE_RGB_TITLE"] = "faire varier la couleur %1 à R %2 % V %3 % B %4 % pendant %5 s";
Blockly.Msg["DISPLAY_FADE_RGB_TOOLTIP"] = "Change graduellement la couleur des LEDs spécifiées en utilisant des valeurs RGB.";
Blockly.Msg["DISPLAY_FADE_RGB_PALETTE_TITLE"] = "faire varier la couleur %1 à %2 pendant %3 s";
Blockly.Msg["DISPLAY_FADE_RGB_PALETTE_TOOLTIP"] = "Change graduellement la couleur des LEDs spécifiées en utilisant une couleur de la palette.";
Blockly.Msg["DISPLAY_FADE_FACE_RGB_TITLE"] = "faire varier la couleur de la LED n°%1 de l\'oeil %2 à R %3 % V %4 % B %5 % pendant %6 s";
Blockly.Msg["DISPLAY_FADE_FACE_RGB_TOOLTIP"] = "Change graduellement la couleur des LEDs spécifiées en utilisant des valeurs RGB.";
Blockly.Msg["DISPLAY_FADE_FACE_RGB_PALETTE_TITLE"] = "faire varier la couleur de la LED n°%1 de l\'oeil %2 à %3 pendant %4 s";
Blockly.Msg["DISPLAY_FADE_FACE_RGB_PALETTE_TOOLTIP"] = "Change graduellement la couleur des LEDs spécifiées en utilisant une couleur de la palette.";
Blockly.Msg["DISPLAY_FACE_LEFT"] = "gauche";
Blockly.Msg["DISPLAY_FACE_RIGHT"] = "droit";
Blockly.Msg["DISPLAY_FACE_LEFT&RIGHT"] = "gauche et droit";
Blockly.Msg["DISPLAY_FADE_RGB_COLOR_NAME_TITLE"] = "faire varier la couleur %1 à %2 pendant %3 s";
Blockly.Msg["DISPLAY_FADE_RGB_COLOR_NAME_TOOLTIP"] = "Change graduellement la couleur des LEDs spécifiées en utilisant une couleur nommée.";
Blockly.Msg["DISPLAY_WHITE_COLOR"] = "blanc";
Blockly.Msg["DISPLAY_RED_COLOR"] = "rouge";
Blockly.Msg["DISPLAY_GREEN_COLOR"] = "vert";
Blockly.Msg["DISPLAY_BLUE_COLOR"] = "bleu";
Blockly.Msg["DISPLAY_YELLOW_COLOR"] = "jaune";
Blockly.Msg["DISPLAY_MAGENTA_COLOR"] = "magenta";
Blockly.Msg["DISPLAY_CYAN_COLOR"] = "cyan";
Blockly.Msg["DISPLAY_ROTATE_EYES_TITLE"] = "animation rotation des yeux %1 temps d\'une rotation %2 s durée de l\'animation %3 s";
Blockly.Msg["DISPLAY_ROTATE_EYES_TOOLTIP"] = "Active un effet lumineux sur les yeux.";
Blockly.Msg["DISPLAY_SET_INTENSITY_TITLE"] = "régler l'intensité %1 à %2 %";
Blockly.Msg["DISPLAY_SET_INTENSITY_TOOLTIP"] = "Règle l'intensité des LEDs spécifiées.";
Blockly.Msg["DISPLAY_OFF_TITLE"] = "éteindre %1";
Blockly.Msg["DISPLAY_OFF_TOOLTIP"] = "Éteint les LEDs spécifiées.";
Blockly.Msg["DISPLAY_ON_TITLE"] = "allumer %1";
Blockly.Msg["DISPLAY_ON_TOOLTIP"] = "Allume les LEDs spécifiées.";
Blockly.Msg["DISPLAY_RANDOM_EYES_TITLE"] = "couleurs des yeux aléatoire pendant %1 s";
Blockly.Msg["DISPLAY_RANDOM_EYES_TOOLTIP"] = "Fait varier les couleurs des LEDs des yeux de manière aléatoire.";
Blockly.Msg["DISPLAY_RASTA_TITLE"] = "animation rasta pendant %1 s";
Blockly.Msg["DISPLAY_RASTA_TOOLTIP"] = "Active un effet lumineux de type rasta.";
Blockly.Msg["DISPLAY_RESET_TITLE"] = "réinitialiser %1";
Blockly.Msg["DISPLAY_RESET_TOOLTIP"] = "Réinitialise les LEDs spécifiées à leur état par défaut.";

// Communications
Blockly.Msg["COMMUNICATION_ANIMATED_SPEECH_SAY_TITLE"] = "dire %1 avec une animation";
Blockly.Msg["COMMUNICATION_ANIMATED_SPEECH_SAY_TOOLTIP"] = "Prononce le texte annoté donné en paramètre et l'anime à l'aide d'animations insérées dans le texte. ";
Blockly.Msg["COMMUNICATION_TEXT_TO_SPEECH_SAY_TITLE"] = "dire %1";
Blockly.Msg["COMMUNICATION_TEXT_TO_SPEECH_SAY_TOOLTIP"] = "Prononce le texte donné en paramètre.";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_TITLE"] = "définir la langue de la reconnaissance vocale %1";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_OPTION_ENGLISH"] = "anglais";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_OPTION_FRENCH"] = "français";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_OPTION_SPANISH"] = "espagnol";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_OPTION_GERMAN"] = "allemand";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_OPTION_ITALIAN"] = "italien";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_TOOLTIP"] = "Définit la langue de la reconnaissance vocale.";
Blockly.Msg["COMMUNICATION_ASR_START_RECOGNITION_TITLE"] = "démarrer la reconnaissance vocale";
Blockly.Msg["COMMUNICATION_ASR_START_RECOGNITION_TOOLTIP"] = "Démarre la reconnaissance vocale.";
Blockly.Msg["COMMUNICATION_ASR_STOP_RECOGNITION_TITLE"] = "arrêter la reconnaissance vocale";
Blockly.Msg["COMMUNICATION_ASR_STOP_RECOGNITION_TOOLTIP"] = "Arrête la reconnaissance vocale.";
Blockly.Msg["COMMUNICATION_ASR_SET_VOCABULARY_TITLE"] = "définir la liste de vocabulaire %1";
Blockly.Msg["COMMUNICATION_ASR_SET_VOCABULARY_TOOLTIP"] = "Définit un ensemble spécifique de mots clés pour la reconnaissance vocale.";
Blockly.Msg["COMMUNICATION_ASR_GET_LAST_WORD_CALLBACK_TITLE"] = "quand un mot est reconnu dans %1";
Blockly.Msg["COMMUNICATION_ASR_GET_LAST_WORD_CALLBACK_TOOLTIP"] = "Stocke le dernier mot reconnu par la reconnaissance vocale dans la variable spécifiée.";


// Movements
Blockly.Msg["MOVEMENTS_POSE_MODE_TITLE"] = "adopter la posture %1";
Blockly.Msg["MOVEMENTS_POSE_MODE_TOOLTIP"] = "Change la posture de NAO  à la pose spécifiée.";
Blockly.Msg["MOVEMENTS_POSE_MODE_YEAH"] = "Yeah";
Blockly.Msg["MOVEMENTS_POSE_MODE_HANDSONHIPS"] = "Mains sur les hanches";
Blockly.Msg["MOVEMENTS_POSE_MODE_SCANNINGHORIZON"] = "Balayage de l'horizon";
Blockly.Msg["MOVEMENTS_POSE_MODE_RELAXED"] = "Détendu";
Blockly.Msg["MOVEMENTS_POSE_MODE_TPOSE"] = "T-Pose";

Blockly.Msg["MOVEMENTS_HAND_TITLE"] = "%1 la main %2";
Blockly.Msg["MOVEMENTS_OPEN_HAND"] = "ouvrir";
Blockly.Msg["MOVEMENTS_CLOSE_HAND"] = "fermer";
Blockly.Msg["MOVEMENTS_LEFT_HAND"] = "gauche";
Blockly.Msg["MOVEMENTS_RIGHT_HAND"] = "droite";
Blockly.Msg["MOVEMENTS_HAND_TOOLTIP"] = "Ouvre ou ferme la main spécifiée.";
Blockly.Msg["MOVEMENTS_MOVE_TO_TITLE"] = "se déplacer %1 de %2 cm";
Blockly.Msg["MOVEMENTS_MOVE_TO_FORWARD"] = "en avant";
Blockly.Msg["MOVEMENTS_MOVE_TO_BACKWARD"] = "en arrière";
Blockly.Msg["MOVEMENTS_ROTATE_TITLE"] = "pivoter vers %1 de %2 °";
Blockly.Msg["MOVEMENTS_ROTATE_LEFT"] = "la gauche";
Blockly.Msg["MOVEMENTS_ROTATE_RIGHT"] = "la droite";
Blockly.Msg["MOVEMENTS_ROTATE_TOOLTIP"] = "Fait tourner NAO  dans la direction spécifiée selon l'angle donné.";
Blockly.Msg["MOVEMENTS_MOVE_TO_TOOLTIP"] = "Déplace NAO dans la direction spécifiée sur une distance donnée.";
Blockly.Msg["MOVEMENTS_MOVE_TO_XY_TITLE"] = "se déplacer vers X %1 Y %2 angle %3 °";
Blockly.Msg["MOVEMENTS_MOVE_TO_XY_TOOLTIP"] = "Déplace NAO vers une position spécifique en centimètre avec un angle donné (en degré).";
Blockly.Msg["MOVEMENTS_GO_TO_POSTURE_TITLE"] = "animation %1 vitesse %2 %";
Blockly.Msg["MOVEMENTS_STAND_POSTURE"] = "debout";
Blockly.Msg["MOVEMENTS_SIT_POSTURE"] = "assis";
Blockly.Msg["MOVEMENTS_GO_TO_POSTURE_TOOLTIP"] = "Jouer une animation avec NAO à la vitesse spécifiée.";

Blockly.Msg["MOVEMENTS_YAW"] = "lacet";
Blockly.Msg["MOVEMENTS_PITCH"] = "tangage";
Blockly.Msg["MOVEMENTS_ROLL"] = "roulis";
Blockly.Msg["MOVEMENTS_YAW&PITCH"] = "lacet&tangage";

Blockly.Msg["MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_1_TITLE"] = "bouger le joint %1 %2 de %3 ° vitesse %4 %";
Blockly.Msg["MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_4_TITLE"] = "bouger le joint %1 de %2 ° vitesse %3 %";

Blockly.Msg["MOVEMENTS_SET_ANGLES_UPPER_BODY_TITLE"] = "Créer une posture en radians: Tête %1 %2 Le bras gauche %3 %4 %5 %6 %7 %8 Le bras droit %9 %10 %11 %12 %13 %14";
Blockly.Msg["MOVEMENTS_SET_ANGLES_UPPER_BODY_TOOLTIP"] = "Crée une posture pour la tête et les bras de NAO avec les angles spécifiés (en radians).";
Blockly.Msg["MOVEMENTS_SET_ANGLES_UPPER_BODY_DEGRES_TITLE"] = "Créer une posture en degrés: Tête %1 %2 Le bras gauche %3 %4 %5 %6 %7 %8 Le bras droit %9 %10 %11 %12 %13 %14";
Blockly.Msg["MOVEMENTS_SET_ANGLES_UPPER_BODY_DEGRES_TOOLTIP"] = "Crée une posture pour la tête et les bras de NAO avec les angles spécifiés (en degrés).";

// Pitch or Roll

Blockly.Msg["MOVEMENTS_L_SHOULDER_JOINT"] = "épaule gauche";
Blockly.Msg["MOVEMENTS_R_SHOULDER_JOINT"] = "épaule droite";

Blockly.Msg["MOVEMENTS_L_ANKLE_JOINT"] = "cheville gauche";
Blockly.Msg["MOVEMENTS_R_ANKLE_JOINT"] = "cheville droite";

// Yaw or Roll
Blockly.Msg["MOVEMENTS_L_ELBOW_JOINT"] = "coude gauche";
Blockly.Msg["MOVEMENTS_R_ELBOW_JOINT"] = "coude droit";

Blockly.Msg["MOVEMENTS_HEAD_JOINT"] = "tête";

// Pitch or Roll / Only Pitch and Yaw
Blockly.Msg["MOVEMENTS_L_HIP_JOINT"] = "hanche gauche";
Blockly.Msg["MOVEMENTS_R_HIP_JOINT"] = "hanche droite";

// Only Pitch 
Blockly.Msg["MOVEMENTS_L_KNEE_JOINT"] = "genou gauche";
Blockly.Msg["MOVEMENTS_R_KNEE_JOINT"] = "genou droit";

// Only Yaw
Blockly.Msg["MOVEMENTS_L_WRIST_JOINT"] = "poignet gauche";
Blockly.Msg["MOVEMENTS_R_WRIST_JOINT"] = "poignet droit";

Blockly.Msg["MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_TOOLTIP"] = "Interpoler un angle pour le joint sélectionné à la vitesse donnée.";

// Games

Blockly.Msg["GAME_CAPITAL_INIT_TITLE"] = "initialiser le jeu des capitales";
Blockly.Msg["GAME_CAPITAL_INIT_TOOLTIP"] = "Initialise le jeu des capitales.";
Blockly.Msg["GAME_CAPITAL_PLAY_TITLE"] = "jouer au jeu des capitales avec %1";
Blockly.Msg["GAME_CAPITAL_PLAY_TOOLTIP"] = "Lance le jeu des capitales avec la capital du pays spécifié.";
Blockly.Msg["GAME_CAPITAL_GET_RANDOM_COUNTRY_TITLE"] = "obtenir un pays aléatoire";
Blockly.Msg["GAME_CAPITAL_GET_RANDOM_COUNTRY_TOOLTIP"] = "Renvoie un pays aléatoire.";
Blockly.Msg["GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_TITLE"] = "obtenir %1 de %2";
Blockly.Msg["GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_CAPITAL"] = "la capitale";
Blockly.Msg["GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_HINT"] = "un indice";
Blockly.Msg["GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_POPULATION"] = "la population";
Blockly.Msg["GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_TOOLTIP"] = "Renvoie la capital, un indice ou la population du pays spécifié.";
Blockly.Msg["GAME_DYNAMIC_STORY_INIT_TITLE"] = "initialiser %1";
Blockly.Msg["GAME_DYNAMIC_STORY_INIT_TOOLTIP"] = "Initialise l'histoire dynamique. Choisissez une histoire à raconter parmis la liste.";
Blockly.Msg["GAME_DYNAMIC_STORY_INIT_STORY1"] = "histoire_1";
Blockly.Msg["GAME_DYNAMIC_STORY_INIT_STORY2"] = "histoire_2";
Blockly.Msg["GAME_PLAY_CURRENT_SCENE_TITLE"] = "jouer la scène %1 et retourner les choix possibles";
Blockly.Msg["GAME_PLAY_CURRENT_SCENE_TOOLTIP"] = "Joue la scène actuelle et retourne les choix possibles pour la suite de l'histoire.";
Blockly.Msg["GAME_MENTAL_MATH_INIT_TITLE"] = "initialiser le jeu de calcul mental";
Blockly.Msg["GAME_MENTAL_MATH_INIT_TOOLTIP"] = "Initialise le jeu de calcul mental.";
Blockly.Msg["GAME_MENTAL_MATH_PLAY_TITLE"] = "dans %1 obtenir %2";
Blockly.Msg["GAME_MENTAL_MATH_PLAY_TOOLTIP"] = "Lance le jeu de calcul mental avec une opération d'addition, de soustraction, ou bien aléatoire.";
Blockly.Msg["GAME_MENTAL_MATH_PLAY_OPERATION_ADD"] = "une addition";
Blockly.Msg["GAME_MENTAL_MATH_PLAY_OPERATION_SUB"] = "une soustraction";
Blockly.Msg["GAME_MENTAL_MATH_PLAY_OPERATION_RANDOM"] = "une opération aléatoire";
Blockly.Msg["GAME_MENTAL_MATH_GET_NUMBER_TITLE"] = "obtenir le nombre %1 en lettres";
Blockly.Msg["GAME_MENTAL_MATH_GET_NUMBER_TOOLTIP"] = "Renvoie le nombre donné en paramètre en toutes lettres.";

// Sensors
Blockly.Msg["SENSORS_TACTIL_TOUCHED_TITLE"] = "%1 de la tête est touché";
Blockly.Msg["SENSORS_FRONT_TACTIL"] = "capteur avant";
Blockly.Msg["SENSORS_MIDDLE_TACTIL"] = "capteur milieu";
Blockly.Msg["SENSORS_REAR_TACTIL"] = "capteur arrière";
Blockly.Msg["SENSORS_ALL_TACTIL"] = "l'un des capteurs";
Blockly.Msg["SENSORS_TACTIL_TOUCHED_TOOLTIP"] = "Renvoie vrai si le capteur tactile spécifié est touché.";

Blockly.Msg["SENSORS_HAND_TOUCHED_TITLE"] = "%1 de la %2 est touché";
Blockly.Msg["SENSORS_LEFT"] = "capteur gauche";
Blockly.Msg["SENSORS_RIGHT"] = "capteur droite";
Blockly.Msg["SENSORS_BACK"] = "capteur arrière";
Blockly.Msg["SENSORS_ALL"] = "l'un des capteurs";
Blockly.Msg["SENSORS_LEFT_HAND"] = "main gauche";
Blockly.Msg["SENSORS_RIGHT_HAND"] = "main droite";
Blockly.Msg["SENSORS_HAND_TOUCHED_TOOLTIP"] = "Renvoie vrai si le capteur de la main spécifiée est touchée.";

Blockly.Msg["SENSORS_BUMPER_PRESSED_TITLE"] = "%1 est pressé";
Blockly.Msg["SENSORS_BUMPER_LEFT"] = "bumper gauche";
Blockly.Msg["SENSORS_BUMPER_RIGHT"] = "bumper droit";
Blockly.Msg["SENSORS_BUMPER_ALL"] = "l'un des bumpers";
Blockly.Msg["SENSORS_BUMPER_PRESSED_TOOLTIP"] = "Renvoie vrai si le bumper spécifié est pressé.";

Blockly.Msg["SENSORS_SONAR_DETECTION_TITLE"] = "%1 détecté avec le sonar à %2";
Blockly.Msg["SENSORS_SONAR_DETECTED"] = "quelque chose est";
Blockly.Msg["SENSORS_SONAR_NOTHING"] = "rien n'est";
Blockly.Msg["SENSORS_SONAR_DETECTION_TOOLTIP"] = "Renvoie vrai si le sonar détecte quelque chose.";

Blockly.Msg["SENSORS_GET_BATTERY_CHARGE_TITLE"] = "niveau de batterie";
Blockly.Msg["SENSORS_GET_BATTERY_CHARGE_TOOLTIP"] = "Renvoie le niveau actuel de la batterie sous forme de pourcentage.";

Blockly.Msg['TIME_WAIT_TITLE'] = 'attendre %1 %2';
Blockly.Msg['TIME_WAIT_TOOLTIP'] = 'Effectue une pause dans l\'exécution du code.';
Blockly.Msg['TIME_WAIT_SECOND'] = 'seconde.s';
Blockly.Msg['TIME_WAIT_MILLISECOND'] = 'milliseconde.s';
Blockly.Msg['TIME_WAIT_MICROSECOND'] = 'microseconde.s';
Blockly.Msg['TIME_WAIT_UNTIL_TITLE'] = 'attendre jusqu\'à %1';
Blockly.Msg['TIME_WAIT_UNTIL_TOOLTIP'] = 'Arrête l\'excution du code jusqu\'à ce que la condition soit satisfaite.';