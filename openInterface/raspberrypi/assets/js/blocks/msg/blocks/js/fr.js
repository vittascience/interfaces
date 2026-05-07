/**
 * @fileoverview French messages for Raspberry Pi. (EN)
 */
'use strict';

// Notes
Blockly.Msg['NOTE_C'] = 'Do';
Blockly.Msg['NOTE_C_SHARP'] = 'Do#';
Blockly.Msg['NOTE_D'] = 'Ré';
Blockly.Msg['NOTE_D_SHARP'] = 'Ré#';
Blockly.Msg['NOTE_E'] = 'Mi';
Blockly.Msg['NOTE_F'] = 'Fa';
Blockly.Msg['NOTE_F_SHARP'] = 'Fa#';
Blockly.Msg['NOTE_G'] = 'Sol';
Blockly.Msg['NOTE_G_SHARP'] = 'Sol#';
Blockly.Msg['NOTE_A'] = 'La';
Blockly.Msg['NOTE_A_SHARP'] = 'La#';
Blockly.Msg['NOTE_B'] = 'Si';
Blockly.Msg['MUSIC_SILENCE'] = 'Silence';

// Display - Sense HAT - LED matrix
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
// Display - LCD
Blockly.Msg['DISPLAY_LCD_SETTEXT_TITLE'] = '[LCD adresse %1] afficher le texte %2 sur la ligne %3 position %4';
Blockly.Msg['DISPLAY_LCD_SETTEXT_TOOLTIP'] = IMG_MODULE_LCD_I2C + Blockly.Tooltip.SEP + 'Affiche du texte sur l\'une des deux lignes de l\'écran LCD1602 grove. Brancher le module sur un port I2C. Les caractères accentués ne sont pas supportés.';
Blockly.Msg['DISPLAY_LCD_CLEAR_TITLE'] = '[LCD adresse %1] nettoyer l\'écran';
Blockly.Msg['DISPLAY_LCD_CLEAR_TOOLTIP'] = IMG_MODULE_LCD_I2C + Blockly.Tooltip.SEP + 'Permet d\'effacer tous les caractères de l\'écran LCD. Brancher le module sur un port I2C.';
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
Blockly.Msg['DISPLAY_NEOPIXEL_RAINBOW_TITLE'] = '[Neopixel] Arc-en-ciel sur la broche %1';
Blockly.Msg['DISPLAY_NEOPIXEL_RAINBOW_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Afficher le spectre des couleurs sur les LED RGB. Il est possible de modifier la broche et le nombre de LED du module neopixel.';
// Display - LED modules
Blockly.Msg['DISPLAY_SETGROVELED_TITLE'] = '[LED] contrôler la LED à %1 sur la broche  %2';
Blockly.Msg['DISPLAY_SETGROVELED_TOOLTIP'] = IMG_MODULE_LED + Blockly.Tooltip.SEP + 'Permet d\'activer ou désactiver la LED Grove (0 ou 1) sur les broches digitales.';
Blockly.Msg['DISPLAY_SETLEDINTENSITY_TITLE'] = '[LED] régler la luminosité à %1 (%) sur la broche %2';
Blockly.Msg['DISPLAY_SETLEDINTENSITY_TOOLTIP'] = IMG_MODULE_LED_PWM + Blockly.Tooltip.SEP + 'Permet de régler la luminosité d\'une LED de 0 à 100% sur les broches PWM.';
Blockly.Msg['DISPLAY_SET_VARIABLE_COLOR_LED_TITLE'] = '[Variable Color LED] régler la luminosité à %1 (%) sur la broche %2';
Blockly.Msg['DISPLAY_SET_VARIABLE_COLOR_LED_TOOLTIP'] = IMG_MODULE_LED_VARIABLE_COLOR + Blockly.Tooltip.SEP + 'Permet de régler la luminosité d\'une LED de 0 à 100 % sur les broches PWM. A la premièe utilisation, les valeurs RGB sont fixées à 0. Utiliser un tournevis pour régler les couleurs R, G et B derrière le module.';
Blockly.Msg['DISPLAY_4DIGIT_SETNUMBER_TITLE'] = '[Afficheur 4-digit] afficher %1 %2 sur les broches CLK %3 DIO %4';
Blockly.Msg['DISPLAY_4DIGIT_SETNUMBER_TOOLTIP'] = IMG_MODULE_4DIGITDISPLAY + Blockly.Tooltip.SEP + 'Permet d\'afficher un nombre, une température ou l\'horloge sur l\'afficheur 4-digit grove (TM1637) avec les broches digitales.';
Blockly.Msg['DISPLAY_4DIGIT_SETCLOCK_TITLE'] = '[Afficheur 4-digit] l\'horloge sur les broches CLK %1 DIO %2';
Blockly.Msg['DISPLAY_4DIGIT_SETCLOCK_TOOLTIP'] = IMG_MODULE_4DIGITDISPLAY + Blockly.Tooltip.SEP + 'Permet d\'afficher l\'horloge sur l\'afficheur 4-digit grove (TM1637) avec les broches digitales. Attention, l\'heure réelle est récupérée seulement la carte microbit reste allumée.';
Blockly.Msg['DISPLAY_4DIGIT_NUMBER'] = 'le nombre entier';
Blockly.Msg['DISPLAY_4DIGIT_TEMPERATURE'] = 'la température';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'attendre %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Effectue une pause dans l\'exécution du code.';
Blockly.Msg['IO_WAIT_SECOND'] = 'seconde.s';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milliseconde.s';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microseconde.s';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'attendre jusqu\'à %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Arrête l\'excution du code jusqu\'à ce que la condition soit satisfaite.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'remettre le chronomètre à 0';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Initialise un chronomètre à 0 (en secondes).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valeur du chronomètre en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Renvoie la valeur du chronomètre à partir de l\'initialisation (en secondes ou millisecondes).';
Blockly.Msg['IO_DATETIME_YMD_HMS_TITLE'] = 'horodatage actuel (YMD_HMS)';
Blockly.Msg['IO_DATETIME_YMD_HMS_TOOLTIP'] = 'Renvoie l\'horodatage actuel dans une chaîne de caractères au format: YMD_HMS (année mois jour _ heure minutes secondes). Très utile pour nommer un fichier d\'une photo par exemple.';
// IO - Sense HAT - Joystick
Blockly.Msg['SENSE_HAT_WAIT_FOR_EVENT_TITLE'] = '[Sense HAT - Joystick] attendre l\'événement';
Blockly.Msg['SENSE_HAT_WAIT_FOR_EVENT_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permet d\'attendre un événement sur le Sense HAT.';
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TITLE'] = "[Sense HAT - Joystick] obtenir %1 de l'événement";
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Permet d'obtenir la direction ou l'action de l'événement joystick.";
Blockly.Msg['SENSE_HAT_GET_EVENT_DIRECTION'] = "la direction";
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION'] = "l'action";
Blockly.Msg['SENSE_HAT_GET_EVENT_JOYSTICK_TITLE'] = "[Sense HAT - Joystick] tableau des événements";
Blockly.Msg['SENSE_HAT_GET_EVENT_JOYSTICK_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Permet d'obtenir un tableau contenant la liste des événements joystick.";
// IO - pins
Blockly.Msg['IO_DIGITAL_SIGNAL_TITLE'] = '%1';
Blockly.Msg['IO_DIGITAL_SIGNAL_HIGH'] = 'HAUT (1)';
Blockly.Msg['IO_DIGITAL_SIGNAL_LOW'] = 'BAS (0)';
Blockly.Msg['IO_DIGITAL_SIGNAL_TOOLTIP'] = 'Retourne une valeur booléenne (1 si HAUT ou 0 si BAS).';
Blockly.Msg['IO_READDIGITALPIN_TITLE'] = 'état de la broche numérique %1';
Blockly.Msg['IO_READDIGITALPIN_TOOLTIP'] = 'Permet de lire la valeur d\'une entrée digitale (0 ou 1).';
Blockly.Msg['IO_WRITEDIGITALPIN_TITLE'] = 'écrire l\'état %1 sur la broche numérique %2';
Blockly.Msg['IO_WRITEDIGITALPIN_TOOLTIP'] = 'Permet d\'écrire une valeur sur une entrée digitale (0 ou 1).';
Blockly.Msg['IO_WRITEPWMPIN_TITLE'] = 'écrire la valeur %1 sur la broche PWM %2';
Blockly.Msg['IO_WRITEPWMPIN_TOOLTIP'] = 'Permet d\'appliquer un signal PWM  d\'une fréquence fixée à 5kHz et en changeant le cycle de 0 à 100. La valeur 50 correspondra à 50% du cycle, donc environ 1.66V.';
Blockly.Msg['IO_SETPWM_TITLE'] = 'appliquer un signal carré de fréquence %1 (Hz) sur la broche %2';
Blockly.Msg['IO_SETPWM_TOOLTIP'] = 'Permet d\'appliquer un signal carré (PWM) avec un cycle fixé à 50% sur une broche. Ce bloc permet de changer la fréquence du signal.';
Blockly.Msg['IO_STOPPWM_TITLE'] = 'arrêter le signal PWM de la broche %1';
Blockly.Msg['IO_STOPPWM_TOOLTIP'] = 'Permet d\'arrêter le signal PWM appliqué sur une broche.';
// Input/Output - External modules
Blockly.Msg['IO_GETGROVEBUTTON_TITLE'] = '[Module bouton] état sur la broche %1 ';
Blockly.Msg['IO_GETGROVEBUTTON_TOOLTIP'] = IMG_MODULE_BUTTON + Blockly.Tooltip.SEP + 'Renvoie la valeur du bouton Grove (0 ou 1) sur les broches digitales.';
Blockly.Msg['IO_GETGROVESWITCH_TITLE'] = '[Module interrupteur] état sur la broche %1 ';
Blockly.Msg['IO_GETGROVESWITCH_TOOLTIP'] = IMG_MODULE_SWITCH + Blockly.Tooltip.SEP + 'Renvoie la valeur de l\'interrupteur Grove (0 ou 1) sur les broches digitales.';
Blockly.Msg['IO_GETMAGNETICSWITCH_TITLE'] = '[Module interrupteur mag.] état sur la broche %1 ';
Blockly.Msg['IO_GETMAGNETICSWITCH_TOOLTIP'] = IMG_MODULE_MAGNETIC_SWITCH + Blockly.Tooltip.SEP + 'Renvoie la valeur de l\'interrupteur magnétique Grove (0 ou 1) sur les broches digitales.';
Blockly.Msg['IO_GETGROVETACTILE_TITLE'] = '[Capteur tactile] état sur la broche %1 ';
Blockly.Msg['IO_GETGROVETACTILE_TOOLTIP'] = IMG_MODULE_TOUCH + Blockly.Tooltip.SEP + 'Renvoie la valeur du capteur tactile Grove (0 ou 1) sur les broches digitales.';
Blockly.Msg['IO_GROVECOLOREDBUTTON_GET_TITLE'] = '[Module bouton coloré] état sur la broche SIG2 %1 ';
Blockly.Msg['IO_GROVECOLOREDBUTTON_GET_TOOLTIP'] = IMG_MODULE_LED_BUTTON + Blockly.Tooltip.SEP + 'Renvoie l\'état du bouton coloré grove (0 or 1) sur les broches digitales.';
Blockly.Msg['IO_GROVECOLOREDBUTTON_SETLED_TITLE'] = '[Module bouton coloré] contrôler la LED à l\'état %1 sur la broche SIG1 %2';
Blockly.Msg['IO_GROVECOLOREDBUTTON_SETLED_TOOLTIP'] = IMG_MODULE_LED_BUTTON + Blockly.Tooltip.SEP + 'Permet d\'allumer ou éteindre la LED (0 or 1) sur les broches digitales.';

// Communication - Serial connection
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'écrire dans la console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Permet d\'écrire des données dans la console.';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'tracer le graphe';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Ce bloc permet d\'écrire des données (numériques) qui seront visibles dans le traceur. Il peut être utilisé avec un ou plusieurs blocs au format "Nom" et "Données". Pour visualiser les graphiques, cliquer sur l\'icone \'Mode Graphique\' dans la console.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Donnée';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Nom %1 Valeur %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Ce bloc est à utiliser avec le bloc "Tracer le graphique". Il doit lui-même contenir le nom de la valeur à afficher (texte), et la valeur en question (nombre).';

Blockly.Msg['SENSORS_TEMPERATURE'] = 'température';
Blockly.Msg['SENSORS_HUMIDITY'] = 'humidité (%)';
Blockly.Msg['SENSORS_TEMPERATURE_IN'] = 'en';
// Sensors - Cameras
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_PICTURE_TITLE'] = '[Caméra RPi] prendre une photo';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_PICTURE_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Permet de prendre une photo avec la caméra du Raspberry Pi et retourne les données de la photo sous forme d\'un array Numpy de dimension (height, width, 3). Par défaut, la taille est de (640, 480).';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_VIDEO_TITLE'] = '[Caméra RPi] prendre une vidéo pendant %1 seconde.s dans %2';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_VIDEO_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Permet de prendre une vidéo avec la caméra du Raspberry Pi et l\'enregistrer dans un fichier .mp4 dans le dossier ~/vittascience-api/workspace/static/videos. Par défaut, la taille est de (640, 480)';
Blockly.Msg['SENSORS_RPI_CAMERA_CHANGE_SIZE_TITLE'] = '[Caméra RPi] configurer la taille de l\'image à %1';
Blockly.Msg['SENSORS_RPI_CAMERA_CHANGE_SIZE_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Permet de configurer la taille des images prises avec la caméra du Raspberry Pi.';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_PICTURE_TITLE'] = '[Caméra USB] prendre une photo';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_PICTURE_TOOLTIP'] = 'Permet de prendre une photo avec une caméra branchée sur un port USB du Raspberry Pi. Ce bloc retourne les données de la photo sous forme d\'un array Numpy de dimension (height, width, 3). Par défaut, la taille est de (640, 480)';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_VIDEO_TITLE'] = '[Caméra USB] prendre une vidéo pendant %1 seconde.s dans %2';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_VIDEO_TOOLTIP'] = 'Permet de prendre une vidéo avec une caméra branchée sur un port USB du Raspberry Pi et l\'enregistrer dans un fichier .mp4. Par défaut, la taille est de (640, 480)';
Blockly.Msg['SENSORS_USB_CAMERA_CHANGE_SIZE_TITLE'] = '[Caméra USB] configurer la taille de l\'image à %1';
Blockly.Msg['SENSORS_USB_CAMERA_CHANGE_SIZE_TOOLTIP'] = 'Permet de configurer la taille des images prises avec une caméra branché sur un port USB du Raspberry Pi.';
Blockly.Msg['SENSORS_CV2_CAMERA_SAVE_PICTURE_TITLE'] = '[Caméras] enregistrer la photo %1 dans le fichier %2';
Blockly.Msg['SENSORS_CV2_CAMERA_SAVE_PICTURE_TOOLTIP'] = 'Permet d\'enregistrer les données de la photo prise par une caméra dans un fichier .jpg au sein du dossier ~/vittascience-api/workspace/static/images du Raspberry Pi.';
Blockly.Msg['SENSORS_CAMERA_SHOW_PICTURE_IN_VITTASCIENCE_TITLE'] = '[Caméras] afficher la photo %1 dans Vittascience';
Blockly.Msg['SENSORS_CAMERA_SHOW_PICTURE_IN_VITTASCIENCE_TOOLTIP'] = 'Permet d\'afficher la photo prise par une caméra branchée au Raspberry Pi dans l\'interface Vittascience. Vous pouvez utiliser les données de la photo dans une variable ou bien directement le nom du fichier de l\'image à afficher.';
Blockly.Msg['SENSORS_CAMERA_SHOW_VIDEO_IN_VITTASCIENCE_TITLE'] = '[Caméras] afficher la vidéo %1 dans Vittascience';
Blockly.Msg['SENSORS_CAMERA_SHOW_VIDEO_IN_VITTASCIENCE_TOOLTIP'] = 'Permet d\'afficher la vidéo prise par une caméra branchée au Raspberry Pi dans l\'interface Vittascience. Utiliser directement le nom du fichier de la vidéo à afficher.';
Blockly.Msg['SENSORS_CAMERA_GET_PICTURE_FILES_TITLE'] = '[Caméras] liste des images enregistrées';
Blockly.Msg['SENSORS_CAMERA_GET_PICTURE_FILES_TOOLTIP'] = 'Permet d\'obtenir la liste des photos prises par une caméra et enregistrées sur le Raspberry Pi dans le dossier ~/vittascience-api/workspace/static/images.';
Blockly.Msg['SENSORS_CAMERA_GET_VIDEO_FILES_TITLE'] = '[Caméras] liste des vidéos enregistrées';
Blockly.Msg['SENSORS_CAMERA_GET_VIDEO_FILES_TOOLTIP'] = 'Permet d\'obtenir la liste des vidéos prises par une caméra et enregistrées sur le Raspberry Pi dans le dossier ~/vittascience-api/workspace/static/videos.';
// Sense HAT - sensors
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_TITLE'] = '[Sense HAT] température en %1';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Renvoie la température en degré Celsius (°C), Fahrenheit (°F) ou Kelvin (K) du capteur de température du Sense HAT.';
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TITLE'] = '[Sense HAT] ' + Blockly.Msg['SENSORS_HUMIDITY'];
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Renvoie l\'humidité (en %) du capteur d\'humidité du Sense HAT.';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_FROM_TITLE'] = '[Sense HAT] température en %1 depuis le capteur %2';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_FROM_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Renvoie la température en degré Celsius (°C), Fahrenheit (°F) ou Kelvin (K) avec le capteur d'humidité ou de pression du Sense HAT.";
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_PRESSURE'] = 'pression';
Blockly.Msg['SENSE_HAT_GET_PRESSURE_TITLE'] = '[Sense HAT] pression en %1';
Blockly.Msg['SENSE_HAT_GET_PRESSURE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Renvoie la pression (en Millibars) du capteur de pression du Sense HAT.';
// Sense AT - IMU 
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
// Sensors - Gas
Blockly.Msg['SENSORS_SGP30_READDATA_TITLE'] = '[Capteur SGP30] gaz %1';
Blockly.Msg['SENSORS_SGP30_READDATA_TOOLTIP'] = IMG_MODULE_SGP30 + Blockly.Tooltip.SEP + 'Renvoie la quantité de CO2 (en ppm) ou de TVOC (en ppb) contenu dans l\'air grâce au capteur SGP30. Brancher le capteur sur un port I2C.';
Blockly.Msg['SENSORS_SGP30_CO2'] = 'Dioxyde de carbone (CO2) (ppm)';
Blockly.Msg['SENSORS_SGP30_TVOC'] = 'Composés organiques volatiles (TVOC) (ppb)';
Blockly.Msg['SENSORS_SCD30_READDATA_TITLE'] = '[Capteur SCD30] %1';
Blockly.Msg['SENSORS_SCD30_READDATA_TOOLTIP'] = IMG_MODULE_SCD30 + Blockly.Tooltip.SEP + 'Renvoie la concentration de CO2 dans l\'air (en ppm), l\'humidité (en %) ou la température en Celsius (°C), Fahrenheit (°F) ou Kelvin (K) from the grove SCD30 sensor. Bancher le capteur sur un port I2C.';
Blockly.Msg['SENSORS_SCD30_CO2'] = 'dioxyde de carbone (CO2) (ppm)';
Blockly.Msg['SENSORS_SCD30_TEMP'] = Blockly.Msg['SENSORS_TEMPERATURE'];
Blockly.Msg['SENSORS_SCD30_HUM'] = Blockly.Msg['SENSORS_HUMIDITY'];
Blockly.Msg['SENSORS_HM330X_GETPARTICULE_TITLE'] = '[Capteur HM330X] concentration de particules fines %1 (µg/m3)';
Blockly.Msg['SENSORS_HM330X_GETPARTICULE_TOOLTIP'] = IMG_MODULE_HM330X + Blockly.Tooltip.SEP + 'Détecte la densité de particules dans l\'air avec le capteur HM330X. Bancher le capteur sur un port I2C.';
Blockly.Msg['SENSORS_HM330X_ATM_PM1'] = 'PM1.0';
Blockly.Msg['SENSORS_HM330X_ATM_PM2_5'] = 'PM2.5';
Blockly.Msg['SENSORS_HM330X_ATM_PM10'] = 'PM10.0';
// Sensors - Climate
Blockly.Msg['SENSORS_BMP280_READDATA_TITLE'] = '[Capteur BMP280 %1] %2';
Blockly.Msg['SENSORS_BMP280_READDATA_TOOLTIP'] = IMG_MODULE_BMP280 + Blockly.Tooltip.SEP + 'Renvoie la température ambiante en degré Celsius (°C), Fahrenheit (°F) ou Kelvin (K), la pression (en Pascal) ou l\'altitude (en m). L\'altitude est calculée avec la pression et est initialisée à 0 au début du programme. Le bloc a besoin du capteur Grove BMP280 (adresse I2C: 0x77, couleur: bleu) ou le capteur HW-611 280 (adresse I2C: 0x76, couleur: violet). Brancher le capteur sur un port I2C.';
Blockly.Msg['SENSORS_BMP280_TEMP'] = 'température';
Blockly.Msg['SENSORS_BMP280_PRESS'] = 'pression (Pa)';
Blockly.Msg['SENSORS_BMP280_ALT'] = 'l\'altitude (m)';
Blockly.Msg['SENSORS_DHT11_READDATA_TITLE'] = '[Capteur DHT11] %1 sur la broche %2';
Blockly.Msg['SENSORS_DHT11_READDATA_TOOLTIP'] = IMG_MODULE_DHT11 + Blockly.Tooltip.SEP + 'Renvoie la température en degré Celsius (°C), Fahrenheit (°F) ou Kelvin (K), ou l\'humidité (en %) grâce au capteur DHT11 grove sur les broches digitales.';
Blockly.Msg['SENSORS_DHT22_READDATA_TITLE'] = '[Capteur DHT22] %1 sur la broche %2';
Blockly.Msg['SENSORS_DHT22_READDATA_TOOLTIP'] = IMG_MODULE_DHT22 + Blockly.Tooltip.SEP + 'Renvoie la température en degré Celsius (°C), Fahrenheit (°F) ou Kelvin (K), ou l\'humidité (en %) avec une grande précision grâce au capteur DHT22 grove sur les broches digitales.';
Blockly.Msg['SENSORS_SHT31_READDATA_TITLE'] = '[Capteur SHT31] %1';
Blockly.Msg['SENSORS_SHT31_READDATA_TOOLTIP'] = IMG_MODULE_SHT31 + Blockly.Tooltip.SEP + 'Renvoie la température en degré Celsius (°C), Fahrenheit (°F) ou Kelvin (K), ou l\'humidité (en %) grâce au capteur SHT31. Brancher le capteur sur un port I2C.';
Blockly.Msg['SENSORS_DS18B20_GETTEMPERATURE_TITLE'] = '[Capteur DS18X20] température en %1 sur la broche %2';
Blockly.Msg['SENSORS_DS18B20_GETTEMPERATURE_TOOLTIP'] = IMG_MODULE_DS18B20 + Blockly.Tooltip.SEP + 'Renvoie la température en degré Celsius (°C), Fahrenheit (°F) ou Kelvin (K) du capteur étanche DS18X20.';
Blockly.Msg['SENSORS_GETRAINGAUGE_TITLE'] = '[Capteur de pluie] état sur la broche %1';
Blockly.Msg['SENSORS_GETRAINGAUGE_TOOLTIP'] = IMG_MODULE_RAIN_GAUGE + Blockly.Tooltip.SEP + 'Renvoie l\'état du capteur de pluie (1 s\'il pleut ou 0 sinon) sur les broches digitales.';
Blockly.Msg['SENSORS_GETANEMOMETER_TITLE'] = '[Anémomètre] état sur la broche %1';
Blockly.Msg['SENSORS_GETANEMOMETER_TOOLTIP'] = IMG_MODULE_ANEMOMETER + Blockly.Tooltip.SEP + 'Renvoie l\'état de l\'anémomètre (deux fois état HAUT à chaque rotation) sur les broches digitales.';
// Sensors - Sound & Light
Blockly.Msg['SENSORS_SUNLIGHT_GETDATA_TITLE'] = '[Capteur de lumière solaire %1] luminosité %2';
Blockly.Msg['SENSORS_SUNLIGHT_GETDATA_TOOLTIP'] = IMG_MODULE_SI1145 + Blockly.Tooltip.SEP + 'Renvoie l\'indice de lumière ultraviolette, la luminosité visible (en lumen) ou infrarouge (en lumen) grâce au capteur Grove Sunlight ou le capteur GY1145. Brancher le capteur sur un port I2C.';
Blockly.Msg['SENSORS_SUNLIGHT_UV'] = 'indice UV';
Blockly.Msg['SENSORS_SUNLIGHT_VISIBLE'] = 'visible (lumen)';
Blockly.Msg['SENSORS_SUNLIGHT_IR'] = 'infrarouge (lumen)';
Blockly.Msg['SENSORS_GROVECOLORV2_GETDATA_TITLE'] = '[Capteur de couleurs V2] %1';
Blockly.Msg['SENSORS_GROVECOLORV2_GETDATA_TOOLTIP'] = IMG_MODULE_I2C_COLOR + Blockly.Tooltip.SEP + 'Permet de lire le niveau d\'une des trois couleurs primaires avec le capteur de couleur grove V2, le niveau est compris entre 0 et 255. Brancher le capteur sur un port I2C.';
// Sensors - Distance & Movements
Blockly.Msg['SENSORS_GETGROVEULTRASONIC_TITLE'] = '[Capteur à ultrasons %1] %2';
Blockly.Msg['SENSORS_GETGROVEULTRASONIC_TOOLTIP'] = IMG_MODULE_ULTRASONIC + Blockly.Tooltip.SEP + 'Renvoie la distance (en cm) mesurée grâce au capteur grove à ultrasons sur les broches digitales. Attention, si le capteur est un modèle grove, TRIG et ECHO sont sur la même broche SIG.';
Blockly.Msg['SENSORS_ULTRASONIC_DISTANCE'] = 'distance (cm)';
Blockly.Msg['SENSORS_ULTRASONIC_DURATION'] = 'durée de l\'aller-retour (µs)';
Blockly.Msg['SENSORS_ULTRASONIC_1PIN'] = 'sur la broche ';
Blockly.Msg['SENSORS_ULTRASONIC_2PINS'] = 'sur les broches ';
Blockly.Msg['SENSORS_GETGESTURE_TITLE'] = '[Capteur de gestes] type de geste';
Blockly.Msg['SENSORS_GETGESTURE_TOOLTIP'] = IMG_MODULE_GESTURE + Blockly.Tooltip.SEP + 'Renvoie l\'entier du type de geste analysé (0:\'nothing\', 3:\'right\', 4:\'left\', 4:\'up\', 5:\'down\', 1:\'forward\', 2:\'backward\', 7:\'clockwise\', 8:\'anticlockwise\', 9:\'wave\') grâce au capteur de gestes grove. Brancher le capteur sur un port I2C.';
Blockly.Msg['SENSORS_ONGESTUREDETECTED_TITLE'] = '[Capteur de gestes] si le geste %1 est détecté';
Blockly.Msg['SENSORS_ONGESTUREDETECTED_TOOLTIP'] = IMG_MODULE_GESTURE + Blockly.Tooltip.SEP + 'Exécute des instructions si le geste selectionné est détecté par le capteur de gestes grove. Brancher le capteur sur un port I2C.';
Blockly.Msg['SENSORS_GESTURE_RIGHT'] = 'droit';
Blockly.Msg['SENSORS_GESTURE_LEFT'] = 'gauche';
Blockly.Msg['SENSORS_GESTURE_UP'] = 'haut';
Blockly.Msg['SENSORS_GESTURE_DOWN'] = 'bas';
Blockly.Msg['SENSORS_GESTURE_FORWARD'] = 'avant';
Blockly.Msg['SENSORS_GESTURE_BACKWARD'] = 'arrière';
Blockly.Msg['SENSORS_GESTURE_CLOCKWISE'] = 'horaire';
Blockly.Msg['SENSORS_GESTURE_ANTICLOCKWISE'] = 'antihoraire';
Blockly.Msg['SENSORS_GESTURE_WAVE'] = 'onde';
Blockly.Msg['SENSORS_GETGROVELINEFINDER_TITLE'] = '[Capteur de ligne noire] état sur la broche %1';
Blockly.Msg['SENSORS_GETGROVELINEFINDER_TOOLTIP'] = IMG_MODULE_LINE_FINDER + Blockly.Tooltip.SEP + 'Renvoie la valeur du capteur de ligne noire grove (0 ou 1) les broches digitales.';
Blockly.Msg['SENSORS_GETGROVEMOTION_TITLE'] = '[Capteur de mouvement] état sur la broche %1';
Blockly.Msg['SENSORS_GETGROVEMOTION_TOOLTIP'] = IMG_MODULE_MOTION + Blockly.Tooltip.SEP + 'Renvoie la valeur du capteur de mouvement Grove PIR Motion (0 ou 1) les broches digitales.';
Blockly.Msg['SENSORS_GETPIEZOVIBRATION_TITLE'] = '[Capteur de vibrations] état sur la broche %1';
Blockly.Msg['SENSORS_GETPIEZOVIBRATION_TOOLTIP'] = IMG_MODULE_VIBRATIONS + Blockly.Tooltip.SEP + 'Renvoie l\'état de la vibration (0 ou 1) grâce au capteur de vibration piezoélectrique les broches digitales.';
Blockly.Msg['SENSORS_GETGROVETILT_TITLE'] = '[Module inclinaison] état sur la broche %1';
Blockly.Msg['SENSORS_GETGROVETILT_TOOLTIP'] = IMG_MODULE_TILT + Blockly.Tooltip.SEP + 'Renvoie la valeur de l\'inclinaison du module Grove (0 ou 1) les broches digitales.';

// Actuators - Motors
Blockly.Msg['ACTUATORS_SERVO_SETANGLE_TITLE'] = '[Servomoteur] contrôler l\'angle à %1 (°) sur la broche %2';
Blockly.Msg['ACTUATORS_SERVO_SETANGLE_TOOLTIP'] = IMG_MODULE_SERVO + Blockly.Tooltip.SEP + 'Permet de contrôler l\'angle d\'un servomoteur (de 0 à 180) sur les broches PWM.';
Blockly.Msg['ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TITLE'] = '[Servomoteur continu] contrôler la vitesse à %1 (%) direction %2 sur la broche %3';
Blockly.Msg['ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TOOLTIP'] = IMG_MODULE_CONTINUOUS_SERVO + Blockly.Tooltip.SEP + 'Permet de contrôler la vitesse (de 0 à 100 %) d\'un servomoteur continu sur les broches PWM.';
Blockly.Msg['ACTUATORS_MOTOR_SETPOWER_TITLE'] = '[Moteur] contrôler la puissance à %1 (%) sur la broche %2';
Blockly.Msg['ACTUATORS_MOTOR_SETPOWER_TOOLTIP'] = IMG_MODULE_MOTOR + Blockly.Tooltip.SEP + 'Permet de contrôler la puissance d\'un moteur (de 0 à 100 %) sur une broche PWM. Attention, le montage doit être alimenté par une batterie pour fournir assez de courant au moteur.';
Blockly.Msg['ACTUATORS_GROVEVIBRATIONMOTOR_CONTROL_TITLE'] = '[Moteur à vibration] contrôler le moteur à l\'état %1 sur la broche  %2';
Blockly.Msg['ACTUATORS_GROVEVIBRATIONMOTOR_CONTROL_TOOLTIP'] = IMG_MODULE_VIBRATION_MOTOR + Blockly.Tooltip.SEP + 'Permet d\'activer ou de désactiver le moteur à vibration grove (0 ou 1) sur les broches digitales.';
Blockly.Msg['ACTUATORS_GROVERELAY_CONTROL_TITLE'] = '[Module relais] contrôler le relais à l\'état %1 sur la broche %2';
Blockly.Msg['ACTUATORS_GROVERELAY_CONTROL_TOOLTIP'] = IMG_MODULE_RELAY + Blockly.Tooltip.SEP + 'Permet de contrôler la valeur du relais (0 ou 1) sur les broches digitales.';
// Actuators - MOSFET
Blockly.Msg['ACTUATORS_MOSFET_SETSTATE_TITLE'] = '[MOSFET] contrôler à l\'état %1 sur la broche %2';
Blockly.Msg['ACTUATORS_MOSFET_SETSTATE_TOOLTIP'] = IMG_MODULE_MOSFET + Blockly.Tooltip.SEP + 'Permet de contrôler l\'état du transitor MOSFET (0 ou 1) sur une broche PWM.';
Blockly.Msg['ACTUATORS_MOSFET_SETPERCENTVALUE_TITLE'] = '[MOSFET] contrôler la puissance à %1 (%) sur la broche %2';
Blockly.Msg['ACTUATORS_MOSFET_SETPERCENTVALUE_TOOLTIP'] = IMG_MODULE_MOSFET + Blockly.Tooltip.SEP + 'Permet de contrôler la puissance de sortie du transitor MOSFET (de 0 à 100 %) sur une broche PWM.';
Blockly.Msg['ACTUATORS_MOSFET_SETFREQUENCY_TITLE'] = '[MOSFET] contrôler la fréquence du cycle à %1 (Hz) sur la broche %2';
Blockly.Msg['ACTUATORS_MOSFET_SETFREQUENCY_TOOLTIP'] = IMG_MODULE_MOSFET + Blockly.Tooltip.SEP + 'Permet de contrôler la fréquence cyclique (Hz) du transistor MOSFET sur une broche PWM.';
// Actuators - Music
Blockly.Msg['ACTUATORS_MUSIC_PLAYMUSIC_TITLE'] = '[Buzzer/Speaker] jouer la musique %1 sur %2';
Blockly.Msg['ACTUATORS_MUSIC_PLAYMUSIC_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Permet de jouer une musique avec un module Grove buzzer (ou speaker) sur les broches digitales.';
Blockly.Msg['ACTUATORS_MUSIC_PLAY_NOTES_TITLE'] = '[Buzzer/Speaker] jouer les notes sur';
Blockly.Msg['ACTUATORS_MUSIC_PLAY_NOTES_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Permet de jouer des notes avec un module Grove buzzer (ou speaker) sur les broches digitales.';
Blockly.Msg['ACTUATORS_MUSIC_NOTE_TITLE'] = 'note %1 à l\'octave %2 durée %3';
Blockly.Msg['ACTUATORS_MUSIC_NOTE_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Permet de définir une note à une certaine octave pendant une durée déterminée.';
Blockly.Msg['ACTUATORS_MUSIC_PLAY_FREQUENCY_TITLE'] = '[Buzzer/Speaker] jouer la fréquence %1 pendant %2 (ms) sur %3';
Blockly.Msg['ACTUATORS_MUSIC_PLAY_FREQUENCY_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Permet de jouer une fréquence avec un module Grove buzzer (ou speaker) sur les broches digitales.';
Blockly.Msg['ACTUATORS_MUSIC_STOP_TITLE'] = '[Buzzer/Speaker] arrêter la musique sur %1';
Blockly.Msg['ACTUATORS_MUSIC_STOP_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Permet d\'arrêter la musique en cours du module Grove buzzer (ou speaker) sur les broches digitales.';

// Wifi
Blockly.Msg['NETWORK_GET_PI_NAME_TITLE'] = "[Serveur Raspberry Pi] nom d'hôte %1";
Blockly.Msg['NETWORK_GET_PI_NAME_TOOLTIP'] = 'Permet à l\'interface de récupérer le nom d\'hôte de votre carte Raspberry Pi configuré lors de l\'installation de l\'OS Raspberry Pi. Il permet de faire le lien avec le serveur python qui tourne sur la carte pour communiquer avec l\'interface.';

// Robots - units
Blockly.Msg['ROBOTS_GO_FORWARD'] = 'avancer';
Blockly.Msg['ROBOTS_GO_BACKWARD'] = 'reculer';
// Robots - Yahboom GATank - Detection
Blockly.Msg['ROBOTS_YAHBOOM_GETULTRASONIC_TITLE'] = '[Yahboom G1 - Ultrasonic] %1';
Blockly.Msg['ROBOTS_YAHBOOM_GETULTRASONIC_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Mesure la distance (en cm) ou la durée de l\'aller-retour de l\'onde (en µs) devant le robot G1 Tank de Yahboom avec le capteur à ultrasons.';
Blockly.Msg['ROBOTS_YAHBOOM_GET_LINE_FINDER_STATE_TITLE'] = '[Yahboom G1 - ligne noire] état du capteur %1';
Blockly.Msg['ROBOTS_YAHBOOM_GET_LINE_FINDER_STATE_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Renvoie l\'état d\'un des 4 capteurs de ligne noire infrarouges (0 ou 1) situés sous le robot G1 Tank de Yahboom. Les noms P1, P2, P3 ou P3 sont inscrits sous le robot.';
// Robots - Yahboom GATank - Control
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_TITLE'] = '[Yahboom G1] contrôler les LED avant %1 à %2';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Permet de piloter les deux LED à l\'avant du robot G1 Tank de Yahboom en activant/désactivant le rouge, vert ou bleu.';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_RGB_TITLE'] = '[Yahboom G1] contrôler les LED RGB à R %1 G %2 B %3';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_RGB_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Permet de piloter les deux LED RGB à l\'avant du robot G1 Tank de Yahboom avec les valeurs R, G et B (de 0 à 255).';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_PALETTE_TITLE'] = '[Yahboom G1] contrôler les LED RGB à %1';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_PALETTE_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Permet de piloter les deux LED RGB à l\'avant du robot G1 Tank de Yahboom en choisissant une couleur dans la palette.';
Blockly.Msg['ROBOTS_YAHBOOM_LED_SERVO_SETANGLE_TITLE'] = '[Servomoteur avant] contrôler l\'angle PAN à %1 (°)';
Blockly.Msg['ROBOTS_YAHBOOM_LED_SERVO_SETANGLE_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Permet de contrôler l\'angle (PAN) du servomoteur avant (de 0 à 180) du robot G1 Tank de Yahboom.';
Blockly.Msg['ROBOTS_YAHBOOM_WAIT_KEY_TITLE'] = '[Yahboom G1 - Bouton KEY] attendre un appui';
Blockly.Msg['ROBOTS_YAHBOOM_WAIT_KEY_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Permet d\'attendre que le bouton KEY sur la carte du robot G1 Tank de Yahboom soit appuyé.';
// Robots - Yahboom G1Tank - Moving
Blockly.Msg['ROBOTS_YAHBOOM_SETGO_TITLE'] = '[Yahboom G1 Tank] %1 à la vitesse %2 %';
Blockly.Msg['ROBOTS_YAHBOOM_SETGO_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Permet de contrôler les moteurs du robot G1 Tank de Yahboom pour le faire avancer ou reculer à une vitesse comprise entre 0 et 100 %.';
Blockly.Msg['ROBOTS_YAHBOOM_STOP_TITLE'] = '[Yahboom G1 Tank] arrêter les moteurs du robot';
Blockly.Msg['ROBOTS_YAHBOOM_STOP_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Permet d\'arrêter les moteurs du robot G1 Tank de Yahboom.';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_TITLE'] = '[Yahboom G1 Tank] tourner à %1 vitesse %2 %';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Permet de contrôler les moteurs du robot G1 Tank de Yahboom pour le faire pivoter (à gauche ou à droite) à une vitesse comprise entre 0 et 100 %.';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_RIGHT'] = 'droite';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_LEFT'] = 'gauche';
Blockly.Msg['ROBOTS_YAHBOOM_SPIN_TITLE'] = '[Yahboom G1 Tank] pivoter à %1 vitesse %2 %';
Blockly.Msg['ROBOTS_YAHBOOM_SPIN_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Permet de contrôler les moteurs du robot G1 Tank de Yahboom pour le faire pivoter (à gauche ou à droite) à une vitesse comprise entre 0 et 100 %.';
Blockly.Msg['ROBOTS_YAHBOOM_CONTROLMOTOR_TITLE'] = '[Yahboom G1 Tank] contrôler le moteur %1 direction %2 vitesse %3 (%)';
Blockly.Msg['ROBOTS_YAHBOOM_CONTROLMOTOR_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Permet de contrôler les moteurs droit et gauche en changeant la direction (↻ : AVANT, ↺ : ARRIERE) et la vitesse (de 0 à 100 %) du robot Yahboom G1 Tank.';
Blockly.Msg['ROBOTS_YAHBOOM_MOTOR_LEFT'] = 'gauche';
Blockly.Msg['ROBOTS_YAHBOOM_MOTOR_RIGHT'] = 'droit';
Blockly.Msg['ROBOTS_YAHBOOM_MOTOR_BOTH'] = 'gauche & droit';
// Robots - Yahboom G1Tank - Camera
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_PAN_TITLE'] = '[Servomoteurs Caméra] contrôler l\'angle PAN à %1 (°)';
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_PAN_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Permet de contrôler l\'angle (PAN - horizontalement) du servomoteur du module caméra USB (de 0 à 180) du robot G1 Tank de Yahboom.';
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_TILT_TITLE'] = '[Servomoteurs Caméra] contrôler l\'angle TILT à %1 (°)';
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_TILT_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Permet de contrôler l\'angle (TILT - verticalement) du servomoteur du module caméra USB (de 0 à 180) du robot G1 Tank de Yahboom.';
