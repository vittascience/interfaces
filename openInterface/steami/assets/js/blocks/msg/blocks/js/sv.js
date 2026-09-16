/**
 * @fileoverview English messages for STeaMi. (EN)
 */
'use strict';

// Display - STeaMi OLED (128x128)
// Input/Output - STeaMi Buttons
// Sensors - STeaMi APDS9960 - Ambient Light / Proximity / Gesture
// Sensors - STeaMi HTS221 - Read Data
// Sensors - STeaMi VL53L1X - Read Distance
Blockly.Msg['DISPLAY_STEAMI_OLED_ADDTEXT_TITLE'] = '[Skärm] visa text %1 på position x %2 y %3';
Blockly.Msg['DISPLAY_STEAMI_OLED_ADDTEXT_TOOLTIP'] = 'Skriver text på STeaMi-kortets OLED-skärm (128x128).';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETPIXEL_TITLE'] = '[Skärm] sätt pixel x %1 y %2 till %3';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETPIXEL_TOOLTIP'] = 'Styr varje pixel på STeaMi-kortets OLED-skärm (128x128).';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWLINE_TITLE'] = '[Skärm] rita en linje från (%1, %2) till (%3, %4)';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWLINE_TOOLTIP'] = 'Ritar en linje mellan två punkter på STeaMi-kortets OLED-skärm (128x128).';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETBACKGROUND_TITLE'] = '[Skärm] sätt bakgrund till %1';
Blockly.Msg['DISPLAY_STEAMI_OLED_WHITE'] = 'vit';
Blockly.Msg['DISPLAY_STEAMI_OLED_BLACK'] = 'svart';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETBACKGROUND_TOOLTIP'] = 'Inverterar skärmens bakgrundsfärg.';
Blockly.Msg['DISPLAY_STEAMI_OLED_CLEARSCREEN_TITLE'] = '[Skärm] rensa skärmen';
Blockly.Msg['DISPLAY_STEAMI_OLED_CLEARSCREEN_TOOLTIP'] = 'Rensar innehållet på OLED-skärmen.';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWICON_TITLE'] = '[Skärm] visa ikon %1 vid position x %2 y %3';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWICON_TOOLTIP'] = 'Visar en ikon från STM32 Image-biblioteket vid positionen (x,y) på grove OLED-skärmen. Anslut skärmen till en I2C-port.';
Blockly.Msg['IO_STEAMI_ONSWITCHBUTTONPRESSED_TITLE'] = 'om knapp %1 är %2 då';
Blockly.Msg['IO_STEAMI_ONSWITCHBUTTONPRESSED_TOOLTIP'] = 'Kör instruktioner baserat på knapparnas tillstånd på STeaMi-kortet (A, B, Menu, Up, Down, Left, Right).';
Blockly.Msg["SENSORS_STEAMI_APDS9960_READ_DATA_TITLE"] = "[APDS9960] %1";
Blockly.Msg["SENSORS_STEAMI_APDS9960_READ_DATA_TOOLTIP"] = "Returnerar omgivande ljusnivå (lux), uppmätt avstånd (max 100 mm), eller den upptäckta gesten från APDS9960-sensorn (left, right, up, down, near, far eller 'unknown' om ingen gest upptäcks)";
Blockly.Msg["SENSORS_STEAMI_APDS9960_AMBIENTLIGHT"] = "omgivande ljus";
Blockly.Msg["SENSORS_STEAMI_APDS9960_PROXIMITY"] = "avstånd";
Blockly.Msg["SENSORS_STEAMI_APDS9960_GESTURE"] = "gest";
Blockly.Msg["SENSORS_STEAMI_HTS221_READDATA_TITLE"] = "[HTS221] %1";
Blockly.Msg["SENSORS_STEAMI_HTS221_TEMPERATURE"] = "temperatur";
Blockly.Msg["SENSORS_STEAMI_HTS221_HUMIDITY"] = "fuktighet";
Blockly.Msg["SENSORS_STEAMI_HTS221_READDATA_TOOLTIP"] = "Returnerar data från HTS221-sensorn (temperatur i °C eller fuktighet i %)";
Blockly.Msg["SENSORS_STEAMI_VL53L1X_READ_TITLE"] = "[VL53L1X] avstånd (%1)";
Blockly.Msg["SENSORS_STEAMI_VL53L1X_READ_TOOLTIP"] = "Returnerar avståndet som mäts av VL53L1X-sensorn i millimeter, centimeter eller meter";
