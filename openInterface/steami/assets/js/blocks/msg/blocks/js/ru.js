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
Blockly.Msg['DISPLAY_STEAMI_OLED_ADDTEXT_TITLE'] = '[Экран] вывести текст %1 по координатам x %2 y %3';
Blockly.Msg['DISPLAY_STEAMI_OLED_ADDTEXT_TOOLTIP'] = 'Позволяет вывести текст на OLED‑экран платы STeaMi размером 128x128.';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETPIXEL_TITLE'] = '[Экран] установить пиксель x %1 y %2 состояние %3';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETPIXEL_TOOLTIP'] = 'Позволяет управлять отдельными пикселями OLED‑экрана платы STeaMi размером 128x128.';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWLINE_TITLE'] = '[Экран] нарисовать линию от (%1, %2) до (%3, %4)';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWLINE_TOOLTIP'] = 'Позволяет нарисовать линию между двумя точками на OLED‑экране платы STeaMi размером 128x128.';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETBACKGROUND_TITLE'] = '[Экран] установить фон %1';
Blockly.Msg['DISPLAY_STEAMI_OLED_WHITE'] = 'белый';
Blockly.Msg['DISPLAY_STEAMI_OLED_BLACK'] = 'чёрный';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETBACKGROUND_TOOLTIP'] = 'Позволяет инвертировать отображение экрана (инверсия цветов).';
Blockly.Msg['DISPLAY_STEAMI_OLED_CLEARSCREEN_TITLE'] = '[Экран] очистить экран';
Blockly.Msg['DISPLAY_STEAMI_OLED_CLEARSCREEN_TOOLTIP'] = 'Очищает содержимое OLED‑экрана.';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWICON_TITLE'] = '[Экран] вывести значок %1 по координатам x %2 y %3';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWICON_TOOLTIP'] = 'Отображает значок из библиотеки Image для STM32 в позиции (x,y) на Grove OLED‑экране. Подключите дисплей к порту I2C.';
Blockly.Msg['IO_STEAMI_ONSWITCHBUTTONPRESSED_TITLE'] = 'если кнопка %1 %2, то';
Blockly.Msg['IO_STEAMI_ONSWITCHBUTTONPRESSED_TOOLTIP'] = 'Позволяет выполнять действия в зависимости от состояния встроенных кнопок платы STeaMi (A, B, Menu, Up, Down, Left, Right).';
Blockly.Msg["SENSORS_STEAMI_APDS9960_READ_DATA_TITLE"] = "[APDS9960] %1";
Blockly.Msg["SENSORS_STEAMI_APDS9960_READ_DATA_TOOLTIP"] = "Возвращает уровень освещённости (в люксах), расстояние (макс. 100 мм) или обнаруженный жест (left, right, up, down, near, far или 'unknown', если жест не обнаружен) датчика APDS9960";
Blockly.Msg["SENSORS_STEAMI_APDS9960_AMBIENTLIGHT"] = "освещённость";
Blockly.Msg["SENSORS_STEAMI_APDS9960_PROXIMITY"] = "расстояние";
Blockly.Msg["SENSORS_STEAMI_APDS9960_GESTURE"] = "жест";
Blockly.Msg["SENSORS_STEAMI_HTS221_READDATA_TITLE"] = "[HTS221] %1";
Blockly.Msg["SENSORS_STEAMI_HTS221_TEMPERATURE"] = "температура";
Blockly.Msg["SENSORS_STEAMI_HTS221_HUMIDITY"] = "влажность";
Blockly.Msg["SENSORS_STEAMI_HTS221_READDATA_TOOLTIP"] = "Возвращает данные датчика HTS221 (температура в °C или влажность в %)";
Blockly.Msg["SENSORS_STEAMI_VL53L1X_READ_TITLE"] = "[VL53L1X] расстояние (%1)";
Blockly.Msg["SENSORS_STEAMI_VL53L1X_READ_TOOLTIP"] = "Возвращает расстояние, измеренное датчиком VL53L1X, в миллиметрах, сантиметрах или метрах";
