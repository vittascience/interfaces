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
Blockly.Msg['DISPLAY_STEAMI_OLED_ADDTEXT_TITLE'] = '[الشاشة] عرض النص %1 عند الموضع x %2 y %3';
Blockly.Msg['DISPLAY_STEAMI_OLED_ADDTEXT_TOOLTIP'] = 'يتيح كتابة نص على شاشة OLED لبطاقة STeaMi بحجم 128x128.';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETPIXEL_TITLE'] = '[الشاشة] التحكم في البكسل x %1 y %2 الحالة %3';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETPIXEL_TOOLTIP'] = 'يتيح التحكم بكل بكسل في شاشة OLED لبطاقة STeaMi بحجم 128x128.';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWLINE_TITLE'] = '[الشاشة] رسم خط من (%1, %2) إلى (%3, %4)';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWLINE_TOOLTIP'] = 'يتيح رسم خط بين نقطتين على شاشة OLED لبطاقة STeaMi بحجم 128x128.';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETBACKGROUND_TITLE'] = '[الشاشة] تعيين الخلفية إلى %1';
Blockly.Msg['DISPLAY_STEAMI_OLED_WHITE'] = 'أبيض';
Blockly.Msg['DISPLAY_STEAMI_OLED_BLACK'] = 'أسود';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETBACKGROUND_TOOLTIP'] = 'يتيح عكس إضاءة خلفية الشاشة.';
Blockly.Msg['DISPLAY_STEAMI_OLED_CLEARSCREEN_TITLE'] = '[الشاشة] مسح الشاشة';
Blockly.Msg['DISPLAY_STEAMI_OLED_CLEARSCREEN_TOOLTIP'] = 'يتيح مسح محتوى شاشة OLED.';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWICON_TITLE'] = '[الشاشة] عرض أيقونة %1 عند الموضع x %2 y %3';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWICON_TOOLTIP'] = 'يتيح عرض أيقونة من مكتبة الصور لـ STM32 عند الموضع (x,y) على شاشة grove OLED. وصل الشاشة إلى منفذ I2C.';
Blockly.Msg['IO_STEAMI_ONSWITCHBUTTONPRESSED_TITLE'] = 'إذا كان الزر %1 %2 ف';
Blockly.Msg['IO_STEAMI_ONSWITCHBUTTONPRESSED_TOOLTIP'] = 'يتيح تنفيذ تعليمات حسب حالة أزرار بطاقة STeaMi المدمجة (A, B, Menu, Up, Down, Left, Right).';
Blockly.Msg["SENSORS_STEAMI_APDS9960_READ_DATA_TITLE"] = "[APDS9960] %1";
Blockly.Msg["SENSORS_STEAMI_APDS9960_READ_DATA_TOOLTIP"] = "يعيد مستوى الإضاءة المحيطة (باللوكس)، المسافة المقاسة (بحد أقصى 100 مم) أو الإيماءة المكتشفة (left, right, up, down, near, far أو 'unknown' إذا لم يتم اكتشاف أي إيماءة) بواسطة المستشعر APDS9960";
Blockly.Msg["SENSORS_STEAMI_APDS9960_AMBIENTLIGHT"] = "الإضاءة المحيطة";
Blockly.Msg["SENSORS_STEAMI_APDS9960_PROXIMITY"] = "المسافة";
Blockly.Msg["SENSORS_STEAMI_APDS9960_GESTURE"] = "إيماءة";
Blockly.Msg["SENSORS_STEAMI_HTS221_READDATA_TITLE"] = "[HTS221] %1";
Blockly.Msg["SENSORS_STEAMI_HTS221_TEMPERATURE"] = "درجة الحرارة";
Blockly.Msg["SENSORS_STEAMI_HTS221_HUMIDITY"] = "الرطوبة";
Blockly.Msg["SENSORS_STEAMI_HTS221_READDATA_TOOLTIP"] = "يعيد بيانات المستشعر HTS221 (درجة الحرارة بالـ°C أو الرطوبة بالنسبة المئوية %)";
Blockly.Msg["SENSORS_STEAMI_VL53L1X_READ_TITLE"] = "[VL53L1X] المسافة (%1)";
Blockly.Msg["SENSORS_STEAMI_VL53L1X_READ_TOOLTIP"] = "يعيد المسافة المقاسة بواسطة المستشعر VL53L1X بالملليمترات أو السنتيمترات أو الأمتار";
