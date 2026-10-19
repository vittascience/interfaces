/**
 * @fileoverview French messages for STeaMi. (FR)
 */
'use strict';

// Display - STeaMi OLED (128x128)
Blockly.Msg['DISPLAY_STEAMI_OLED_ADDTEXT_TITLE'] = '[Ecran] afficher le texte %1 à la position x %2 y %3';
Blockly.Msg['DISPLAY_STEAMI_OLED_ADDTEXT_TOOLTIP'] = 'Permet d\'écrire du texte sur un l\'écran OLED de la carte STeaMi de taille 128x128.';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETPIXEL_TITLE'] = '[Ecran] contrôler le pixel x %1 y %2 état %3';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETPIXEL_TOOLTIP'] = 'Permet de contrôler chaque pixel de l\'écran OLED de la carte STeaMi de taille 128x128.';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWLINE_TITLE'] = '[Ecran] dessiner une ligne de (%1, %2) à (%3, %4)';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWLINE_TOOLTIP'] = 'Permet de dessiner une ligne entre deux points de l\'écran OLED de la carte STeaMi de taille 128x128.';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETBACKGROUND_TITLE'] = '[Ecran] définir le fond en %1';
Blockly.Msg['DISPLAY_STEAMI_OLED_WHITE'] = 'blanc';
Blockly.Msg['DISPLAY_STEAMI_OLED_BLACK'] = 'noir';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETBACKGROUND_TOOLTIP'] = 'Permet d\'inverser le rétroélcairage de l\'écran.';
Blockly.Msg['DISPLAY_STEAMI_OLED_CLEARSCREEN_TITLE'] = '[Ecran] effacer l\'écran';
Blockly.Msg['DISPLAY_STEAMI_OLED_CLEARSCREEN_TOOLTIP'] = 'Permet d\'effacer le contenu de l\'écran OLED.';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWICON_TITLE'] = '[Ecran] afficher l\'icône %1 position x %2 y %3';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWICON_TOOLTIP'] = 'Permet d\'afficher une icône de la librairie Image de STM32, à la position (x,y) sur l\'écran grove OLED. Brancher l\'afficheur sur un port I2C.';
// Input/Output - STeaMi Buttons
Blockly.Msg['IO_STEAMI_ONSWITCHBUTTONPRESSED_TITLE'] = 'si le bouton %1 %2 alors';
Blockly.Msg['IO_STEAMI_ONSWITCHBUTTONPRESSED_TOOLTIP'] = 'Permet d\'exécuter des instructions selon l\'état des boutons intégrés à la carte STeaMi (A, B, Menu, Up, Down, Left, Right).';
// Communication - Log
Blockly.Msg['COMMUNICATION_LOG_SETLABEL_TITLE'] = '[Log] définir le ou les label(s)';
Blockly.Msg['COMMUNICATION_LOG_SETLABEL_TOOLTIP'] = 'Permet d\'ajouter un label à la colonne des données du log. Le label peut être un texte ou un nombre.';
Blockly.Msg['COMMUNICATION_LOG_ADDDATA_TITLE'] = '[Log] ajouter des données';
Blockly.Msg['COMMUNICATION_LOG_ADDDATA_TOOLTIP'] = 'Permet d\'ajouter des données à la colonne des données du log. Les données peuvent être un texte ou un nombre.';
Blockly.Msg['COMMUNICATION_LOG_DELETE_TITLE'] = '[Log] supprimer les logs';
Blockly.Msg['COMMUNICATION_LOG_DELETE_TOOLTIP'] = 'Permet de supprimer tous les logs enregistrés.';
// Sensors - STeaMi APDS9960 - Ambient Light / Proximity / Gesture
Blockly.Msg["SENSORS_STEAMI_APDS9960_READ_DATA_TITLE"] = "[APDS9960] %1";
Blockly.Msg["SENSORS_STEAMI_APDS9960_READ_DATA_TOOLTIP"] = "Retourne le niveau de lumière ambiante (en lux), la distance mesurée (maximum 100 mm) ou le geste détecté (left, right, up, down, near, far ou 'unknown' si aucun geste n'est détecté) par le capteur APDS9960";
Blockly.Msg["SENSORS_STEAMI_APDS9960_AMBIENTLIGHT"] = "lumière ambiante";
Blockly.Msg["SENSORS_STEAMI_APDS9960_PROXIMITY"] = "distance";
Blockly.Msg["SENSORS_STEAMI_APDS9960_GESTURE"] = "geste";
// Sensors - STeaMi HTS221 - Read Data
Blockly.Msg["SENSORS_STEAMI_HTS221_READDATA_TITLE"] = "[HTS221] %1";
Blockly.Msg["SENSORS_STEAMI_HTS221_TEMPERATURE"] = "température";
Blockly.Msg["SENSORS_STEAMI_HTS221_HUMIDITY"] = "humidité";
Blockly.Msg["SENSORS_STEAMI_HTS221_READDATA_TOOLTIP"] = "Retourne les données du capteur HTS221 (température en °C ou humidité en %)";
// Sensors - STeaMi VL53L1X - Read Distance
Blockly.Msg["SENSORS_STEAMI_VL53L1X_READ_TITLE"] = "[VL53L1X] distance (%1)";
Blockly.Msg["SENSORS_STEAMI_VL53L1X_READ_TOOLTIP"] = "Retourne la distance mesurée par le capteur VL53L1X en millimètres, centimètres ou mètres";
// Sensors - STeaMi BQ27441 - Read Data
Blockly.Msg["SENSORS_STEAMI_BQ27441_READDATA_TITLE"] = "[BQ27441] %1";
Blockly.Msg["SENSORS_STEAMI_BQ27441_READDATA_TOOLTIP"] = "Retourne les données de batterie mesurées par le capteur BQ27441";
Blockly.Msg["SENSORS_STEAMI_BQ27441_SOC"] = "état de charge (%)";
Blockly.Msg["SENSORS_STEAMI_BQ27441_VOLTAGE"] = "tension (mV)";
Blockly.Msg["SENSORS_STEAMI_BQ27441_CURRENT"] = "courant moyen (mA)";
Blockly.Msg["SENSORS_STEAMI_BQ27441_FULL_CAPACITY"] = "capacité totale (mAh)";
Blockly.Msg["SENSORS_STEAMI_BQ27441_REMAINING_CAPACITY"] = "capacité restante (mAh)";
// Sensors - STeaMi WSEN_HIDS - Read Data
Blockly.Msg["SENSORS_STEAMI_WSEN_HIDS_READDATA_TITLE"] = "[WSEN_HIDS] %1";
Blockly.Msg["SENSORS_STEAMI_WSEN_HIDS_READDATA_TOOLTIP"] = "Retourne l'humidité ou la température mesurée par le capteur WSEN_HIDS.";
Blockly.Msg["SENSORS_STEAMI_WSEN_HIDS_HUMIDITY"] = "humidité";
Blockly.Msg["SENSORS_STEAMI_WSEN_HIDS_TEMPERATURE"] = "température";
// Sensors - STeaMi WSEN_PADS - Read Data
Blockly.Msg["SENSORS_STEAMI_WSEN_PADS_READDATA_TITLE"] = "[WSEN_PADS] %1";
Blockly.Msg["SENSORS_STEAMI_WSEN_PADS_READDATA_TOOLTIP"] = "Retourne la pression ou la température mesurée par le capteur WSEN_PADS.";
Blockly.Msg["SENSORS_STEAMI_WSEN_PADS_PRESSURE"] = "pression";
Blockly.Msg["SENSORS_STEAMI_WSEN_PADS_TEMPERATURE"] = "température";
// Sensors - STeaMi LIS2MDL - Read Data
Blockly.Msg["SENSORS_STEAMI_LIS2MDL_READDATA_TITLE"] = "[LIS2MDL] %1";
Blockly.Msg["SENSORS_STEAMI_LIS2MDL_READDATA_TOOLTIP"] = "Retourne le champ magnétique sur les axes X/Y/Z ou la température mesurée par le capteur LIS2MDL.";
Blockly.Msg["SENSORS_STEAMI_LIS2MDL_MAG_X"] = "champ magnétique axe X";
Blockly.Msg["SENSORS_STEAMI_LIS2MDL_MAG_Y"] = "champ magnétique axe Y";
Blockly.Msg["SENSORS_STEAMI_LIS2MDL_MAG_Z"] = "champ magnétique axe Z";
Blockly.Msg["SENSORS_STEAMI_LIS2MDL_TEMP"] = "température";
// Sensors - STeaMi ISM330DL - Read Data
Blockly.Msg["SENSORS_STEAMI_ISM330DL_READDATA_TITLE"] = "[ISM330DL] %1";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_READDATA_TOOLTIP"] = "Retourne l'accélération sur les axes X/Y/Z, la vitesse de rotation sur les axes X/Y/Z ou la température mesurée par le capteur ISM330DL.";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_ACCELERATION_X"] = "accélération X";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_ACCELERATION_Y"] = "accélération Y";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_ACCELERATION_Z"] = "accélération Z";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_GYROSCOPE_X"] = "gyroscope X";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_GYROSCOPE_Y"] = "gyroscope Y";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_GYROSCOPE_Z"] = "gyroscope Z";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_TEMPERATURE"] = "température";
//Robots - Donutbot
Blockly.Msg['ROBOTS_DONUTBOT_TURN_RIGHT'] = 'droite';
Blockly.Msg['ROBOTS_DONUTBOT_RIGHT'] = 'droit';
Blockly.Msg['ROBOTS_DONUTBOT_LEFT'] = 'gauche';
Blockly.Msg['ROBOTS_DONUTBOT_ULTRASONICRANGER_TITLE'] = '[Donutbot - Capteur à ultrasons] distance %1';
Blockly.Msg['ROBOTS_DONUTBOT_ULTRASONICRANGER_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Renvoie la distance (en cm) entre un object et le robot Donutbot grâce au capteur de distance à ultrasons.';
Blockly.Msg['ROBOTS_DONUTBOT_LINE_DETECTOR_TITLE'] = '[Donutbot] état du capteur de ligne %1';
Blockly.Msg['ROBOTS_DONUTBOT_LINE_DETECTOR_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Renvoie l\'état du capteur de ligne (droit/gauche/central) du robot Donutbot.';
Blockly.Msg['ROBOTS_DONUTBOT_LINE_DETECTOR_THRESHOLD_TITLE'] = '[Donutbot] seuil du capteur de ligne %1';
Blockly.Msg['ROBOTS_DONUTBOT_LINE_DETECTOR_THRESHOLD_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Permet de définir le seuil du capteur de ligne (droit/gauche/central) du robot Donutbot.';
Blockly.Msg['ROBOTS_DONUTBOT_LINE_DETECTOR_FUNCTION_TITLE'] = '[Donutbot] suivre la ligne';
Blockly.Msg['ROBOTS_DONUTBOT_LINE_DETECTOR_FUNCTION_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Permet au robot Donutbot de suivre une ligne noire.';
Blockly.Msg['ROBOTS_DONUTBOT_COLOR_DETECTOR_TITLE'] = '[Donutbot] état du capteur de couleur %1';
Blockly.Msg['ROBOTS_DONUTBOT_COLOR_DETECTOR_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Renvoie l\'état (couleur au format (r,g,b)) du capteur de ligne (droit/gauche/central) du robot Donutbot.';
Blockly.Msg['ROBOTS_DONUTBOT_DETECTOR_RIGHT'] = 'droit';
Blockly.Msg['ROBOTS_DONUTBOT_DETECTOR_MIDDLE'] = 'central';
Blockly.Msg['ROBOTS_DONUTBOT_DETECTOR_LEFT'] = 'gauche';
Blockly.Msg['ROBOTS_DONUTBOT_COLOR_DETECTOR_AVERAGE_TITLE'] = '[Donutbot] couleur moyenne des capteurs de couleur';
Blockly.Msg['ROBOTS_DONUTBOT_COLOR_DETECTOR_AVERAGE_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Renvoie la couleur moyenne (r,g,b) des capteurs de couleur du robot Donutbot.';
Blockly.Msg['ROBOTS_DONUTBOT_COLOR_DETECTOR_NAME_TITLE'] = '[Donutbot] nom de la couleur sous le capteur %1';
Blockly.Msg['ROBOTS_DONUTBOT_COLOR_DETECTOR_NAME_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Renvoie le nom de couleur ("white", "orange", "purple", "pink", "brown", "yellow", "green", "blue", "red") détectée par le robot Donutbot.';
Blockly.Msg['ROBOTS_DONUTBOT_DISTANCE_TITLE'] = '[Donutbot - ToF] distance %1';
Blockly.Msg['ROBOTS_DONUTBOT_DISTANCE_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Retourne les mesures de distance à partir du capteur Time Of Flight VL53L0X sur le port I2C.';
Blockly.Msg['ROBOTS_DONUTBOT_GO_TITLE'] = '[Donutbot] %1 à la vitesse %2 (%)';
Blockly.Msg['ROBOTS_DONUTBOT_GO_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Permet de contrôler la marche (AVANT/ARRIERE) ainsi que la vitesse (de 0 à 100 %) du robot Donutbot.';
Blockly.Msg['ROBOTS_DONUTBOT_TURNTO_TITLE'] = '[Donutbot] pivoter vers la %1 vitesse %2 (%)';
Blockly.Msg['ROBOTS_DONUTBOT_TURNTO_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Permet de pivoter à droite ou à gauche à une certaine vitesse (de 0 à 100 %) avec le robot Donutbot.';
Blockly.Msg['ROBOTS_DONUTBOT_CONTROLMOTOR_TITLE'] = '[Donutbot] contrôler le moteur %1 direction %2 vitesse %3 (%)';
Blockly.Msg['ROBOTS_DONUTBOT_CONTROLMOTOR_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Permet de contrôler les moteurs droit et gauche en changeant la direction (↻ : AVANT, ↺ : ARRIERE) et la vitesse (de 0 à 100 %) du robot Donutbot.';
Blockly.Msg['ROBOTS_DONUTBOT_MOVE_ONE_SQUARE_FORWARD_TITLE'] = '[Donutbot] avancer d\'une case';
Blockly.Msg['ROBOTS_DONUTBOT_MOVE_ONE_SQUARE_FORWARD_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Avance le robot Donutbot d\'une case.';
Blockly.Msg['ROBOTS_DONUTBOT_MOVE_ONE_SQUARE_BACKWARD_TITLE'] = '[Donutbot] reculer d\'une case';
Blockly.Msg['ROBOTS_DONUTBOT_MOVE_ONE_SQUARE_BACKWARD_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Recule le robot Donutbot d\'une case.';
Blockly.Msg['ROBOTS_DONUTBOT_TURN_LEFT_TITLE'] = '[Donutbot] pivoter à gauche';
Blockly.Msg['ROBOTS_DONUTBOT_TURN_LEFT_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Pivote le robot Donutbot de 90° vers la gauche.';
Blockly.Msg['ROBOTS_DONUTBOT_TURN_RIGHT_TITLE'] = '[Donutbot] pivoter à droite';
Blockly.Msg['ROBOTS_DONUTBOT_TURN_RIGHT_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Pivote le robot Donutbot de 90° vers la droite.';
Blockly.Msg['ROBOTS_DONUTBOT_STOPMOTORS_TITLE'] = '[Donutbot] arrêter le moteur %1';
Blockly.Msg['ROBOTS_DONUTBOT_STOPMOTORS_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Permet d\'arrêter le moteur droit ou gauche du robot Donutbot.';
Blockly.Msg['ROBOTS_DONUTBOT_RELEASEMOTORS_TITLE'] = '[Donutbot] relâcher le moteur %1';
Blockly.Msg['ROBOTS_DONUTBOT_RELEASEMOTORS_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Permet d\'arrêter le moteur droit ou gauche du robot Donutbot et de le libérer de tout asservissement. Une fois désactivé, le moteur devient totalement libre et peut se mouvoir sans contrainte.';
Blockly.Msg['ROBOTS_DONUTBOT_RIGHT&LEFT'] = 'droit & gauche';
Blockly.Msg['ROBOTS_DONUTBOT_NEOPIXEL_SETCOLOR_TITLE'] = '[Donutbot] contrôler la LED %1 à R %2 G %3 B %4';
Blockly.Msg['ROBOTS_DONUTBOT_NEOPIXEL_SETCOLOR_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Permet de contrôler la couleur de chaque LED du neopixel du robot Donutbot (pin15) tel que les valeurs R,G,B soient comprises entre 0 et 255. Le neopixel est connecté à la broche P15 sur le robot.';
Blockly.Msg['ROBOTS_DONUTBOT_NEOPIXEL_SETPALETTECOLOR_TITLE'] = '[Donutbot] contrôler la LED %1 à %2';
Blockly.Msg['ROBOTS_DONUTBOT_NEOPIXEL_SETPALETTECOLOR_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Permet de contrôler la couleur de chaque LED du module neopixel. Utiliser la palette pour changer la couleur.';
Blockly.Msg['ROBOTS_DONUTBOT_BLINK_ROBOT_TITLE'] = '[Donutbot] clignoter le robot en %1';
Blockly.Msg['ROBOTS_DONUTBOT_BLINK_ROBOT_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Fait clignoter le robot Donutbot.';
Blockly.Msg['ROBOTS_DONUTBOT_NEOPIXEL_SETRAINBOW_TITLE'] = '[Donutbot] Arc-en-ciel';
Blockly.Msg['ROBOTS_DONUTBOT_NEOPIXEL_SETRAINBOW_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Afficher le spectre des couleurs sur les LED RGB (pin15).';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTONS_ONPRESSED_TITLE'] = '[Donutbot] le bouton %1 est %2';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTONS_ONPRESSED_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Permet d\'exécuter des instructions si un bouton du robot Donutbot est appuyé.';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTONS_PRESSED'] = 'appuyé';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTONS_RELEASED'] = 'relâché';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTON_FRONT'] = 'haut';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTON_LEFT'] = 'gauche';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTON_RIGHT'] = 'droit';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTON_BACK'] = 'bas';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTON_CENTER'] = 'central';
Blockly.Msg['ROBOTS_DONUTBOT_BLE_SEND_DATA_TITLE'] = '[Donutbot] envoyer des données %1 ';
Blockly.Msg['ROBOTS_DONUTBOT_BLE_SEND_DATA_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Envoyer des données via Bluetooth (BLE).';
Blockly.Msg['ROBOTS_DONUTBOT_BLE_READ_DATA_TITLE'] = '[Donutbot] si message reçu dans %1 alors';
Blockly.Msg['ROBOTS_DONUTBOT_BLE_READ_DATA_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Permet d\'exécuter des instructions si une donnée est reçue par Bluetooth (BLE).';
Blockly.Msg['ROBOTS_DONUTBOT_TURNTO_ANGLE_TITLE'] = '[Donutbot] pivoter vers la %1 de %2 ° vitesse %3 (%)';
Blockly.Msg['ROBOTS_DONUTBOT_TURNTO_ANGLE_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Permet de contrôler les moteurs droit et gauche en changeant la direction (↻ : AVANT, ↺ : ARRIERE) et la vitesse (de 0 à 100 %) du robot Donutbot pour le faire pivoter d\'un certain angle.';