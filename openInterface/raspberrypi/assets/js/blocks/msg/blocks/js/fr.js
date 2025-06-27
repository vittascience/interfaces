/**
 * @fileoverview French messages for Raspberry pi. (EN)
 */
'use strict';
// Communication - Serial connection
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'écrire dans la console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Permet d\'écrire des données dans la console.';
// Input/Output
Blockly.Msg['IO_WAIT_TITLE'] = 'attendre %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Effectue une pause dans l\'exécution du code.';
Blockly.Msg['IO_WAIT_SECOND'] = 'seconde.s';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milliseconde.s';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microseconde.s';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'attendre jusqu\'à %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Arrête l\'excution du code jusqu\'à ce que la condition soit satisfaite.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'démarrer le chronomètre';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Initialise un chronomètre à 0 (en secondes).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valeur du chronomètre en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Renvoie la valeur du chronomètre à partir de l\'initialisation (en secondes ou millisecondes).';
// Wifi
Blockly.Msg['NETWORK_GET_PI_NAME_TITLE'] = "[raspberry] nom d'hôte %1";
Blockly.Msg['NETWORK_GET_PI_NAME_TOOLTIP'] = 'Permet de récupérer le nom d\'hôte du Raspberry Pi.';
// Actuators
Blockly.Msg['ACTUATORS_MUSIC_PLAY_FREQUENCY_TITLE'] = '[Buzzer/Speaker] jouer la fréquence %1 pendant %2 (ms) sur %3';
Blockly.Msg['ACTUATORS_MUSIC_PLAY_FREQUENCY_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Permet de jouer une fréquence avec un module Grove buzzer (ou speaker) sur les broches pwm du GrovePi hat.';
// Display - LCD
Blockly.Msg['DISPLAY_LCD_SETTEXT_TITLE'] = '[LCD] afficher le texte %1 sur la ligne %2 position %3';
Blockly.Msg['DISPLAY_LCD_SETTEXT_TOOLTIP'] = IMG_MODULE_LCD_3V3 + Blockly.Tooltip.SEP + 'Affiche du texte sur l\'une des deux lignes de l\'écran LCD1602 grove. Brancher le module sur un port I2C du GrovePi hat.';
Blockly.Msg['DISPLAY_LCD_CLEAR_TITLE'] = '[LCD] nettoyer l\'écran';
Blockly.Msg['DISPLAY_LCD_CLEAR_TOOLTIP'] = IMG_MODULE_LCD_3V3 + Blockly.Tooltip.SEP + 'Permet d\'effacer tous les caractères de l\'écran LCD. Brancher le module sur un port I2C du GrovePi hat.';
//Display - Neopixel
Blockly.Msg['DISPLAY_NEOPIXEL_DEFINE_TITLE'] = '[Neopixel] définir %1 LED sur la broche %2';
Blockly.Msg['DISPLAY_NEOPIXEL_DEFINE_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Permet de définir le nombre de LED du neopixel. Ce bloc doit être utilisé dans le bloc \'Au démarrage\'.';
Blockly.Msg['DISPLAY_NEOPIXEL_LEDCONTROL_TITLE'] = '[Neopixel] contrôler la LED %1 à R %2 G %3 B %4 sur la broche %5';
Blockly.Msg['DISPLAY_NEOPIXEL_LEDCONTROL_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Permet de contrôler la couleur de chaque LED tel que (R,G,B) de 0 à 255 du module neopixel.';
Blockly.Msg['DISPLAY_NEOPIXEL_SETPALETTECOLOR_TITLE'] = '[Neopixel] contrôler la LED %1 à %2 sur la broche %3';
Blockly.Msg['DISPLAY_NEOPIXEL_SETPALETTECOLOR_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Permet de contrôler la couleur de chaque LED du module neopixel. Utiliser la palette pour changer la couleur.';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDRGB_TITLE'] = '[Neopixel] contrôler toutes les LED à R %1 G %2 B %3 sur la broche %4';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDRGB_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Permet de contrôler toutes les LED du module neopixel à la couleur choisie telle que (R,G,B) soit de 0 à 255.';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TITLE'] = '[Neopixel] contrôler toutes les LED à %1 sur la broche %2';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Permet de contrôler toutes les LED du module neopixel à la couleur choisie. Utiliser la palette pour changer la couleur.';
// Sensors
Blockly.Msg['SENSORS_GETGROVEULTRASONIC_TITLE'] = '[Capteur à ultrasons] distance sur la broche %1';
Blockly.Msg['SENSORS_GETGROVEULTRASONIC_TOOLTIP'] = IMG_MODULE_ULTRASONIC + Blockly.Tooltip.SEP + 'Renvoie la distance (in cm) mesurée grâce au capteur grove à ultrasons sur les broches digitales du GrovePi hat.';
Blockly.Msg['SENSORS_GETGROVEMOISTURE_TITLE'] = '[Capteur d\'humidité] humidité du sol sur la broche %1';
Blockly.Msg['SENSORS_GETGROVEMOISTURE_TOOLTIP'] = IMG_MODULE_MOISTURE + Blockly.Tooltip.SEP + 'Renvoie l\'humidité (de O à 65535) mesurée grâce au capteur d\'humidité grove sur les broches analogiques du GrovePi hat.';
Blockly.Msg['SENSORS_GETGROVETEMPERATURE_TITLE'] = '[Capteur de T°] température en %1 sur la broche %2';
Blockly.Msg['SENSORS_GETGROVETEMPERATURE_TOOLTIP'] = IMG_MODULE_TEMPERATURE + Blockly.Tooltip.SEP + 'Renvoie la température en degré Celsius (°C), Fahrenheit (°F) ou Kelvin (K) du capteur de température Grove sur les broches analogiques du GrovePi Hat.';
Blockly.Msg['SENSORS_DHT11_READDATA_TITLE'] = '[Capteur DHT11] %1 sur la broche %2';
Blockly.Msg['SENSORS_DHT11_READDATA_TOOLTIP'] = IMG_MODULE_DHT11 + Blockly.Tooltip.SEP + 'Renvoie la température en degré Celsius (°C), Fahrenheit (°F) ou Kelvin (K), ou l\'humidité (en %) grâce au capteur dht11 grove sur les broches pwm du GrovePi hat.';
Blockly.Msg['SENSORS_GETGROVELIGHT_TITLE'] = '[Capteur de lumière] luminosité sur la broche %1';
Blockly.Msg['SENSORS_GETGROVELIGHT_TOOLTIP'] = IMG_MODULE_LIGHT + Blockly.Tooltip.SEP + 'Renvoie la luminosité (de O à 65535) du capteur de lumière Grove sur les broches analogiques du GrovePi hat.';
Blockly.Msg['SENSORS_TEMPERATURE'] = 'température';
Blockly.Msg['SENSORS_HUMIDITY'] = 'humidité (%)';
// SenseHat
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_TITLE'] = '[Sense HAT] température en %1';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Renvoie la température en degré Celsius (°C), Fahrenheit (°F) ou Kelvin (K) du capteur de température du Sense HAT.';
// TEMPRATURE FROM HUMIDITY/ PRESSURE SENSOR
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TITLE'] = '[Sense HAT] humidité';
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Renvoie l\'humidité (en %) du capteur d\'humidité du Sense HAT.';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_FROM_TITLE'] = '[Sense HAT] température en %1 depuis le capteur %2';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_FROM_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Renvoie la température en degré Celsius (°C), Fahrenheit (°F) ou Kelvin (K) avec le capteur d'humidité ou de pression du Sense HAT.";
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_HUMIDITY'] = 'humidité';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_PRESSURE'] = 'pression';
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TITLE'] = '[Sense HAT] humidité';
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Renvoie l\'humidité (en %) du capteur d\'humidité du Sense HAT.';
// TEMPRATURE FROM HUMIDITY/ PRESSURE SENSOR
Blockly.Msg['SENSE_HAT_GET_PRESSURE_TITLE'] = '[Sense HAT] pression en %1';
Blockly.Msg['SENSE_HAT_GET_PRESSURE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Renvoie la pression (en Millibars) du capteur de pression du Sense HAT.';
// Display
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_TITLE'] = '[Sense HAT] définir le pixel en x %1 et y %2, R %3 V %4 B %5';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permet de définir la couleur d\'un pixel du Sense HAT avec une couleur RGB.';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_PALETTE_TITLE'] = '[Sense HAT] définir le pixel en x %1 y %2 avec la couleur %3';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_PALETTE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permet de définir la couleur d\'un pixel du Sense HAT avec une couleur de la palette.';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXELS_IMAGE_TITLE'] = "[Sense HAT] définir l'image %1 avec %2 sur fond %3";
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXELS_IMAGE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permet de définir une image sur la matrice LED du Sense HAT avec une couleur RGB.';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXEL_TITLE'] = '[Sense HAT] couleur du pixel en x %1 et y %2';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXEL_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permet de récupérer la couleur d\'un pixel du Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXELS_TITLE'] = '[Sense HAT] récupérer les couleurs des pixels';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXELS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permet de récupérer les couleurs des pixels du Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_TITLE'] = '[Sense HAT] effacer l\'affichage';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permet d\'effacer l\'affichage LED du Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_WITH_COLOR_TITLE'] = '[Sense HAT] effacer l\'affichage avec la couleur %1';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_WITH_COLOR_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permet d\'effacer l\'affichage LED du Sense HAT avec une couleur RGB.';
Blockly.Msg['SENSE_HAT_DISAPLY_SHOW_LEDS_TITLE'] = "[Sense HAT] afficher l'image avec la couleur %1";
Blockly.Msg['SENSE_HAT_DISAPLY_SHOW_LEDS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permet d\'afficher l\'image sur la matrice LED du Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_MESSAGE_TITLE'] = '[Sense HAT] afficher le message %1 avec la vitesse %2 la couleur %3 et le fond %4';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_MESSAGE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permet d\'afficher un message sur la matrice LED du Sense HAT avec une couleur RGB.';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_LETTER_TITLE'] = '[Sense HAT] afficher la lettre %1 avec la couleur %2 sur fond %3';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_LETTER_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permet d\'afficher une lettre sur la matrice LED du Sense HAT avec une couleur RGB.';
// IO
Blockly.Msg['SENSE_HAT_WAIT_FOR_EVENT_TITLE'] = '[Sense HAT] attendre l\'événement du joystick';
Blockly.Msg['SENSE_HAT_WAIT_FOR_EVENT_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permet d\'attendre un événement sur le Sense HAT.';
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TITLE'] = "[Sense HAT] obtenir %1 de l'événement du joystick";
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Permet d'obtenir la direction ou l'action de l'événement joystick.";
Blockly.Msg['SENSE_HAT_GET_EVENT_DIRECTION'] = "la direction";
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION'] = "l'action";
Blockly.Msg['SENSE_HAT_GET_EVENT_JOYSTICK_TITLE'] = "[Sense HAT] obtenir un tableau des événements du joystick.";
Blockly.Msg['SENSE_HAT_GET_EVENT_JOYSTICK_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Permet d'obtenir un tableau contenant la liste des événements joystick.";
// IMU 
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_TITLE'] = '[Sense HAT] %1 le gyroscope %2 %3 l\'accéléromètre %4 %5 la boussole';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permet de configurer les capteurs IMU (inertial measurement unit) du Sense HAT.';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_ON'] = 'activer';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_OFF'] = 'désactiver';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_TITLE'] = '[Sense HAT] orientation en %1 (x, y, z)';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permet d\'obtenir l\'orientation en radians (tangage, roulis, lacet) du Sense HAT.';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_RADIANS'] = 'radians';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_DEGREES'] = 'degrés';
// Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_DEGREES_TITLE'] = '[Sense HAT] obtenir l\'orientation en degrés (x, y, z)';
// Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_DEGREES_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permet d\'obtenir l\'orientation en degrés (tangage, roulis, lacet) du Sense HAT.';
Blockly.Msg['SENSE_HAT_IMU_GET_COMPASS_TITLE'] = "[Sense HAT] obtenir l'orientation de la boussole";
Blockly.Msg['SENSE_HAT_IMU_GET_COMPASS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Permet d'obtenir l'orientation de la boussole du Sense HAT.";

// raspberry pi camera
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_PICTURE_TITLE'] = '[Raspberry Pi Camera] prendre une photo';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_PICTURE_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Permet de prendre une photo avec la caméra du Raspberry Pi.';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_VIDEO_TITLE'] = '[Raspberry Pi Camera] prendre une vidéo pendant %1 secondes';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_VIDEO_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Permet de prendre une vidéo avec la caméra du Raspberry Pi.';