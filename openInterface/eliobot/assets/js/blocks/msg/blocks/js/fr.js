/**
 * @fileoverview English messages for Eliobot. (EN)
 */
'use strict';

// Display - Buint-in LED
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TITLE'] = 'contrôler la LED intégrée %1';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP'] = 'Permet d\'allumer la LED RGB intégrée sur le robot Eliobot.';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_OFF_TITLE'] = 'éteindre la LED intégrée';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_OFF_TOOLTIP'] = 'Permet d\'éteindre la LED RGB intégrée sur le robot Eliobot.';
// Display - Eyes
Blockly.Msg['DISPLAY_EYES_COLOR_TITLE'] = 'changer la couleur %1 en %2';
Blockly.Msg['DISPLAY_EYES_COLOR_TOOLTIP'] = 'Permet de changer la couleur des yeux du robot Eliobot.';
Blockly.Msg['DISPLAY_EYES_COLOR_LEFT'] = 'de l\'œil gauche';
Blockly.Msg['DISPLAY_EYES_COLOR_RIGHT'] = 'de l\'œil droit';
Blockly.Msg['DISPLAY_EYES_COLOR_BOTH'] = 'des deux yeux';
Blockly.Msg['DISPLAY_EYES_EMOTION_TITLE'] = 'afficher l\'émotion %1 en %2';
Blockly.Msg['DISPLAY_EYES_EMOTION_TOOLTIP'] = 'Permet d\'afficher une émotion prédéfinie sur les yeux du robot Eliobot.';
Blockly.Msg['DISPLAY_EYES_EMOTION_TIRED'] = 'fatigué';
Blockly.Msg['DISPLAY_EYES_EMOTION_HAPPY'] = 'heureux';
Blockly.Msg['DISPLAY_EYES_EMOTION_SAD'] = 'triste';
Blockly.Msg['DISPLAY_EYES_EMOTION_ANGRY'] = 'en colère';
Blockly.Msg['DISPLAY_EYES_EMOTION_CONFUSED'] = 'confus';
Blockly.Msg['DISPLAY_EYES_EMOTION_SURPRISED'] = 'surpris';
Blockly.Msg['DISPLAY_EYES_EMOTION_SLEEPY'] = 'fatigué';
Blockly.Msg['DISPLAY_EYES_EMOTION_NEUTRAL'] = 'neutre';
Blockly.Msg['DISPLAY_EYES_EMOTION_THRILLED'] = 'excité';
Blockly.Msg['DISPLAY_EYES_EMOTION_DIZZY'] = 'étourdi';
Blockly.Msg['DISPLAY_EYES_EMOTION_MUSIC'] = 'musique';
Blockly.Msg['DISPLAY_EYES_EMOTION_LOVE'] = 'amour';
Blockly.Msg['DISPLAY_EYES_EMOTION_KO'] = 'KO';
Blockly.Msg['DISPLAY_EYES_EMOTION_AMAZED'] = 'étonné';
Blockly.Msg['DISPLAY_EYES_EMOTION_LEFT_ARROW'] = 'flèche de gauche';
Blockly.Msg['DISPLAY_EYES_EMOTION_RIGHT_ARROW'] = 'flèche de droite';
Blockly.Msg['DISPLAY_EYES_EMOTION_DOWN_ARROW'] = 'flèche du bas';
Blockly.Msg['DISPLAY_EYES_EMOTION_UP_ARROW'] = 'flèche du haut';
Blockly.Msg['DISPLAY_EYES_MATRIX_UNICOLOR_TITLE'] = 'afficher sur la matrice des yeux (monochrome)';
Blockly.Msg['DISPLAY_EYES_MATRIX_UNICOLOR_TOOLTIP'] = 'Permet d\'afficher une image personnalisée sur les yeux du robot Eliobot.';
Blockly.Msg['DISPLAY_RIGHT_EYE'] = 'œil droit';
Blockly.Msg['DISPLAY_LEFT_EYE'] = 'œil gauche';
Blockly.Msg['DISPLAY_EYES_MATRIX_TITLE'] = "afficher sur la matrice des yeux (palette)";
Blockly.Msg['DISPLAY_EYES_MATRIX_TOOLTIP'] = 'Permet d\'afficher une image personnalisée sur les yeux du robot Eliobot. Chaque pixel de la matrice peut être configuré avec une couleur différente.';

// Input/Output - Time
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
// Communication - IR remote
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_TITLE'] = 'lire le signal sur le capteur %1';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_TOOLTIP'] = 'Permet de lire la commande envoyée par la télécommande infrarouge du Eliobot. Ce bloc retourne une chaîne de caractères correspondant à la commande reçue (haut, bas, gauche, droite, centre).';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_FORWARD'] = 'avant';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_BACKWARD'] = 'arrière';
Blockly.Msg['COMMUNICATION_IR_REMOTE_TITLE'] = 'si la commande %1 est reçue par la télécommande infrarouge alors';
Blockly.Msg['COMMUNICATION_IR_REMOTE_TOOLTIP'] = 'Permet de lire la commande envoyée par la télécommande infrarouge du Eliobot. Ce bloc retourne une chaîne de caractères correspondant à la commande reçue (haut, bas, gauche, droite, centre).';
Blockly.Msg['COMMUNICATION_IR_REMOTE_BOOLEAN_TITLE'] = 'la commande %1 est reçue par la télécommande infrarouge';
Blockly.Msg['COMMUNICATION_IR_REMOTE_BOOLEAN_TOOLTIP'] = 'Permet de vérifier si une commande spécifique de la télécommande infrarouge du Eliobot a été reçue. Ce bloc retourne un booléen : vrai si la commande spécifiée a été reçue, faux sinon.';
Blockly.Msg['COMMUNICATION_IR_REMOTE_UP'] = 'haut';
Blockly.Msg['COMMUNICATION_IR_REMOTE_DOWN'] = 'bas';
Blockly.Msg['COMMUNICATION_IR_REMOTE_LEFT'] = 'gauche';
Blockly.Msg['COMMUNICATION_IR_REMOTE_RIGHT'] = 'droite';
Blockly.Msg['COMMUNICATION_IR_REMOTE_OK'] = 'ok';
Blockly.Msg['COMMUNICATION_IR_REMOTE_1'] = '1';
Blockly.Msg['COMMUNICATION_IR_REMOTE_2'] = '2';
Blockly.Msg['COMMUNICATION_IR_REMOTE_3'] = '3';
Blockly.Msg['COMMUNICATION_IR_REMOTE_4'] = '4';
Blockly.Msg['COMMUNICATION_IR_REMOTE_5'] = '5';
Blockly.Msg['COMMUNICATION_IR_REMOTE_6'] = '6';
Blockly.Msg['COMMUNICATION_IR_REMOTE_7'] = '7';
Blockly.Msg['COMMUNICATION_IR_REMOTE_8'] = '8';
Blockly.Msg['COMMUNICATION_IR_REMOTE_9'] = '9';
Blockly.Msg['COMMUNICATION_IR_REMOTE_0'] = '0';
Blockly.Msg['COMMUNICATION_IR_REMOTE_HT'] = '#';
Blockly.Msg['COMMUNICATION_IR_REMOTE_ST'] = '*';

// Sensors
Blockly.Msg['SENSORS_READ_OBSTACLE_TITLE'] = 'un obstacle est %1';
Blockly.Msg['SENSORS_READ_OBSTACLE_TOOLTIP'] = 'Permet de detecter si un obstacle est présent.';
Blockly.Msg['SENSORS_READ_OBSTACLE_FORWARD'] = 'devant';
Blockly.Msg['SENSORS_READ_OBSTACLE_BACKWARD'] = 'derrière';
Blockly.Msg['SENSORS_READ_OBSTACLE_RIGHT'] = 'à droite';
Blockly.Msg['SENSORS_READ_OBSTACLE_LEFT'] = 'à gauche';
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
Blockly.Msg['SENSORS_AUTO_LINE_CALIBRATION'] = 'calibrage automatique des capteurs de ligne';
Blockly.Msg['SENSORS_AUTO_LINE_CALIBRATION_TOOLTIP'] = 'Permet de calibrer automatiquement les capteurs de ligne du Eliobot. Le robot doit être placé sur une surface claire, puis sur une surface foncée pour que le calibrage soit effectué correctement.';

// Actuators - robot
Blockly.Msg['ROBOT_MOVE_TITLE'] = ' %1';
Blockly.Msg['ROBOT_MOVE_TOOLTIP'] = 'Permet de contrôler les moteurs du robot Eliobot pour avancer ou reculer.';
Blockly.Msg['ROBOT_MOVE_FORWARD'] = 'avancer';
Blockly.Msg['ROBOT_MOVE_BACKWARD'] = 'reculer';
Blockly.Msg['ROBOT_ROTATE_TITLE'] = 'pivoter à %1';
Blockly.Msg['ROBOT_ROTATE_TOOLTIP'] = 'Pivote le Eliobot sur la gauche ou la droite.';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'droite';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'gauche';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'arrêter les moteurs';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'Arrête les moteurs du Eliobot.';
Blockly.Msg['ROBOT_SET_SPEED_TITLE'] = 'régler la vitesse à %1 %';
Blockly.Msg['ROBOT_SET_SPEED_TOOLTIP'] = 'Change la vitesse du Eliobot.';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TITLE'] = 'pivoter à %1 de %2°';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TOOLTIP'] = 'Pivote le Eliobot à gauche ou à droite de l\'angle désiré.';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TITLE'] = 'tourner la roue %1 sens %2';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TOOLTIP'] = 'Tourne une des roues du Eliobot dans la direction désirée.';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TITLE'] = '%1 de %2 case(s)';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TOOLTIP'] = 'Permet au Eliobot de se déplacer par case.';
Blockly.Msg['ROBOT_TURN_90_TITLE'] = 'pivoter à %1';
Blockly.Msg['ROBOT_TURN_90_TOOLTIP'] = 'Permet au Eliobot de tourner à gauche ou à droite de 90°.';
Blockly.Msg['ROBOT_SET_SQUARE_SIZE_TITLE'] = 'taille d\'une case %1 cm';
Blockly.Msg['ROBOT_SET_SQUARE_SIZE_TOOLTIP'] = 'Permet de régler la taille d\'une case pour les déplacements par case du Eliobot.';
Blockly.Msg['ROBOT_TURN_RIGHT'] = 'droite';
Blockly.Msg['ROBOT_TURN_LEFT'] = 'gauche';
Blockly.Msg['ROBOT_WAITING_TITLE'] = 'attendre %1 %2 avant d\'arrêter les moteurs';
Blockly.Msg['ROBOT_WAITING_TOOLTIP'] = 'Permet au Eliobot d\'attendre un certain temps avant de s\'arrêter.';
Blockly.Msg['ROBOT_UNIT_SECONDS'] = 'seconde(s)';
Blockly.Msg['ROBOT_UNIT_MILLISECONDS'] = 'milliseconde(s)';
// Actuators - Buzzer
Blockly.Msg['ACTUATORS_PLAY_NOTE_TITLE'] = 'jouer la note %1 pendant %2 %3';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TOOLTIP'] = 'Ce bloc permet de jouer une note de musique. La note est définie par son nom (Do, Ré, Mi, Fa, Sol, La, Si) et le temps pendant lequel elle est jouée.';
Blockly.Msg['ACTUATORS_FREQUENCY_TITLE'] = 'jouer une fréquence %1 (Hz) pendant %2 %3';
Blockly.Msg['ACTUATORS_FREQUENCY_TOOLTIP'] = 'Ce bloc permet de jouer une fréquence. La fréquence est définie en Hertz (Hz) et le temps pendant lequel elle est jouée.';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TITLE'] = 'jouer la musique %1';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TOOLTIP'] = 'Ce bloc permet de jouer une musique prédéfinie. Il y a plusieurs musiques prédéfinies disponibles.';
Blockly.Msg['ACTUATORS_SET_VOLUME_TITLE'] = 'modifier le volume à %1 %';
Blockly.Msg['ACTUATORS_SET_VOLUME_TOOLTIP'] = 'Ce bloc permet de modifier le volume du son du Eliobot.';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TITLE'] = 'jouer le son %1';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TOOLTIP'] = 'Ce bloc permet de jouer un son prédéfini. Il y a plusieurs sons prédéfinis disponibles.';
Blockly.Msg['ACTUATORS_SOUND_JUMP'] = 'saut';
Blockly.Msg['ACTUATORS_SOUND_LASER'] = 'laser';
Blockly.Msg['ACTUATORS_SOUND_QUESTION'] = 'question';
Blockly.Msg['ACTUATORS_SOUND_ERROR'] = 'erreur';
Blockly.Msg['ACTUATORS_SOUND_EXPLOSION'] = 'explosion';
Blockly.Msg['ACTUATORS_SOUND_LAND'] = 'atterrissage';
Blockly.Msg['ACTUATORS_SOUND_HAPPY'] = 'heureux';
Blockly.Msg['ACTUATORS_SOUND_WIN'] = 'victoire';
Blockly.Msg['ACTUATORS_SOUND_ALERT'] = 'alerte';
Blockly.Msg['ACTUATORS_SOUND_HELLO'] = 'bonjour';
Blockly.Msg['ACTUATORS_SOUND_STARTUP'] = 'démarrage';
Blockly.Msg['ACTUATORS_SOUND_BUMP'] = 'collision';
Blockly.Msg['ACTUATORS_SOUND_BLINK'] = 'clignotement';

// Backpack - Display
Blockly.Msg['BACKPACK_DISPLAY_OLED_TEXT_TITLE'] = '[Ecran OLED] afficher le texte %1 sur la ligne %2';
Blockly.Msg['BACKPACK_DISPLAY_OLED_TEXT_TOOLTIP'] = 'Affiche du texte sur l\'écran oled SSD1306.';
Blockly.Msg['BACKPACK_DISPLAY_OLED_CLEAR_TITLE'] = '[Ecran OLED] effacer l\'écran';
Blockly.Msg['BACKPACK_DISPLAY_OLED_CLEAR_TOOLTIP'] = 'Efface le texte de l\'écran oled SSD1306.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TITLE'] = '[Matrice RGB 5x5] afficher l\'image';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TOOLTIP'] = 'Permet d\'afficher un dessin sur la matrice de LED RGB 5x5.';
Blockly.Msg['BACKPACK_DISPLAY_CLEAR_MATRIX_TITLE'] = '[Matrice RGB 5x5] effacer la matrice';
Blockly.Msg['BACKPACK_DISPLAY_CLEAR_MATRIX_TOOLTIP'] = 'Efface la matrice de leds rgb 5x5.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TITLE'] = '[Matrice RGB 5x5] afficher %1 en %2';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TOOLTIP'] = 'Affiche une icône de la couleur souhaité.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TITLE'] = '[Matrice RGB 5x5] faire défiler le texte %1 en %2';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TOOLTIP'] = 'Fait défilier une chaine de caractères de la couleur souhaité sur la matrice de leds 5x5.';
// Backpack - Sensors
Blockly.Msg['BACKPACK_DHT11_SENSOR_TITLE'] = '[DHT11] %1';
Blockly.Msg['BACKPACK_DHT11_SENSOR_TOOLTIP'] = 'Renvoie la température en degré Celsius (°C) ou l\'humidité (en %) grâce au capteur dht11.'
Blockly.Msg['SENSOR_TEMPERATURE'] = 'température';
Blockly.Msg['SENSOR_HUMIDITY'] = 'humidité';
Blockly.Msg['SENSOR_PRESSURE'] = 'pression';
Blockly.Msg['SENSOR_ALTITUDE'] = 'altitude';
Blockly.Msg['BACKPACK_BME280_SENSOR_TITLE'] = '[BME280] %1';
Blockly.Msg['BACKPACK_BME280_SENSOR_TOOLTIP'] = 'Renvoie la température ambiante en degré Celsius (°C) de -40 à 85 °C, Fahrenheit (°F) ou Kelvin (K), l\'humidité (en %), la pression (en Pascal) ou l\'altitude (en m) grâce au capteur BME280.';
Blockly.Msg['BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TITLE'] = '[BME280] définir la pression au niveau de la mer à %1'
Blockly.Msg['BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TOOLTIP'] = 'Permet de définir la pression au niveau de la mer pour le capteur BME280, utilisée dans le calcul de l\'altitude.';
Blockly.Msg['BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TITLE'] = '[HC-SR04] distance';
Blockly.Msg['BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TOOLTIP'] = 'Renvoie la distance en cm grâce au capteur à ultrasons HC-SR04.';
Blockly.Msg['BACKPACK_SENSORS_GETLIGHT_TITLE'] = '[Capteur de lumière] luminosité sur la broche %1';
Blockly.Msg['BACKPACK_SENSORS_GETLIGHT_TOOLTIP'] = 'Renvoie le niveau de luminosité du capteur sur la broche sélectionnée.';
// Backpack - IO - Buttons
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_TITLE'] = '[Bouton] %1 appuyé sur la broche %2';
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_TOOLTIP'] = 'Renvoie l\'état du bouton connecté à la broche IO2 ou IO15.';
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_PRESSED'] = 'est';
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_NOT_PRESSED'] = 'n\'est pas';
// Backpack - IO - Potentiometer
Blockly.Msg['BACKPACK_IO_KNOB_VALUE_TITLE'] = '[Potentiomètre] valeur sur la broche %1';
Blockly.Msg['BACKPACK_IO_KNOB_VALUE_TOOLTIP'] = 'Renvoie valeur du potentiomètre connecté à la broche IO2 ou IO15';
// Backpack - Actuators - Motors
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TITLE'] = '[Servomoteur] contrôler l\'angle à %1° sur la broche %2';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TOOLTIP'] = 'Permet de contrôler l\'angle (de 0 à 180 °) d\'un servomoteur sur les broches PWM.';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TITLE'] = '[Servomoteur continu] contrôler la vitesse %1 (%) direction %2 sur la broche %3';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TOOLTIP'] = 'Permet de contrôler la vitesse (de 0 à 100 %) d\'un servomoteur continu sur les broches PWM.';
// Backpack - Actuators - Buzzer
Blockly.Msg['BACKPACK_ACTUATORS_GROVE_BUZZER_TITLE'] = '[Buzzer] jouer la fréquence %1 avec le volume %2 sur la broche %3';
Blockly.Msg['BACKPACK_ACTUATORS_GROVE_BUZZER_TOOLTIP'] = 'Permet de jouer une fréquence avec un module Grove buzzer.';

// Network - Wifi
Blockly.Msg['NETWORK_WIFI_CONNECT_TITLE'] = 'Se connecter au réseau Wi-Fi SSID %1 mot de passe %2';
Blockly.Msg['NETWORK_WIFI_CONNECT_TOOLTIP'] = 'Connecte Eliobot à un réseau Wi-Fi avec le nom (SSID) et le mot de passe fournis.';
Blockly.Msg['NETWORK_WIFI_DISCONNECT_TITLE'] = 'Se déconnecter du Wi-Fi';
Blockly.Msg['NETWORK_WIFI_DISCONNECT_TOOLTIP'] = 'Déconnecte Eliobot du réseau Wi-Fi auquel il est connecté.';
Blockly.Msg['NETWORK_WIFI_OPEN_ACCESS_POINT_TITLE'] = 'Ouvrir un point d\'accès Wi-Fi SSID %1 mot de passe %2';
Blockly.Msg['NETWORK_WIFI_OPEN_ACCESS_POINT_TOOLTIP'] = 'Crée un point d\'accès Wi-Fi depuis Eliobot avec le nom et le mot de passe fournis.';
Blockly.Msg['NETWORK_WIFI_DEFINE_HOST_NAME_TITLE'] = 'Définir le nom d\'hôte %1';
Blockly.Msg['NETWORK_WIFI_DEFINE_HOST_NAME_TOOLTIP'] = 'Définit le nom d\'hôte (hostname) d\'Eliobot sur le réseau. Ce nom permet d\'accéder à Eliobot via un navigateur.';
Blockly.Msg['NETWORK_WIFI_DEFINE_ANTENNA_POWER_TITLE'] = 'Définir la puissance de l\'antenne Wi-Fi %1';
Blockly.Msg['NETWORK_WIFI_DEFINE_ANTENNA_POWER_TOOLTIP'] = 'Règle la puissance d\'émission de l\'antenne Wi-Fi d\'Eliobot (en dBm).';
Blockly.Msg['NETWORK_WIFI_IS_CONNECTED_TITLE'] = 'connecté au Wi-Fi ?';
Blockly.Msg['NETWORK_WIFI_IS_CONNECTED_TOOLTIP'] = 'Retourne vrai si Eliobot est connecté à un réseau Wi-Fi, faux sinon.';
Blockly.Msg['NETWORK_WIFI_SCAN_NETWORKS_TITLE'] = 'scanner les réseaux Wi-Fi disponibles';
Blockly.Msg['NETWORK_WIFI_SCAN_NETWORKS_TOOLTIP'] = 'Retourne la liste des réseaux Wi-Fi disponibles autour d\'Eliobot.';
Blockly.Msg['NETWORK_WIFI_GET_IP_TITLE'] = 'adresse IP d\'Eliobot';
Blockly.Msg['NETWORK_WIFI_GET_IP_TOOLTIP'] = 'Retourne l\'adresse IP d\'Eliobot sur le réseau Wi-Fi.';
// Network - HTML
Blockly.Msg['NETWORK_HTML_CREATE_PAGE_TITLE'] = 'Créer une page web avec le titre %1 contenu';
Blockly.Msg['NETWORK_HTML_CREATE_PAGE_TOOLTIP'] = 'Crée une page web accessible depuis un navigateur. Ajoute des éléments HTML dans le contenu de la page.';
Blockly.Msg['NETWORK_HTML_CREATE_BUTTON_TITLE'] = 'Ajouter un bouton %1 %2 action';
Blockly.Msg['NETWORK_HTML_CREATE_BUTTON_TOOLTIP'] = 'Ajoute un bouton à la page web. Les blocs dans "action" sont exécutés par Eliobot lorsque le bouton est pressé.';
Blockly.Msg['NETWORK_HTML_DISPLAY_VALUE_TITLE'] = 'Afficher la valeur %1 avec le nom %2';
Blockly.Msg['NETWORK_HTML_DISPLAY_VALUE_TOOLTIP'] = 'Affiche une valeur sur la page web et la met à jour automatiquement toutes les secondes.';
Blockly.Msg['NETWORK_HTML_CREATE_TAG_TITLE'] = 'Balise %1';
Blockly.Msg['NETWORK_HTML_CREATE_TAG_TOOLTIP'] = 'Crée une balise HTML (div ou center) pour organiser le contenu de ta page web.';
Blockly.Msg['NETWORK_HTML_CREATE_TITLE_TAG_TITLE'] = 'Titre %1 %2';
Blockly.Msg['NETWORK_HTML_CREATE_TITLE_TAG_TOOLTIP'] = 'Ajoute un titre HTML (de h1 à h6) à ta page web. h1 est le plus grand, h6 le plus petit.';
Blockly.Msg['NETWORK_HTML_CREATE_PARAGRAPH_TITLE'] = 'Paragraphe %1';
Blockly.Msg['NETWORK_HTML_CREATE_PARAGRAPH_TOOLTIP'] = 'Ajoute un paragraphe de texte à ta page web.';
Blockly.Msg['BACKPACK_DHT11_SENSOR_TOOLTIP'] = 'Renvoie la température en degrés Celsius (°C) ou l\'humidité (en %) mesurées par le capteur DHT11.';
Blockly.Msg['BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TITLE'] = '[BME280] définir la pression au niveau de la mer à %1';
