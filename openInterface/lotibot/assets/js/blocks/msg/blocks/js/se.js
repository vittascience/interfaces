/**
 * @fileoverview English messages for Loti-bot. (EN)
 */

'use strict';

// Display

// IO - Time

// Communication

// Sensors

// Actuators
Blockly.Msg['DISPLAY_SET_LEDS_RGB_TITLE'] = '[LED-lampor] R %1 G %2 B %3';
Blockly.Msg['DISPLAY_SET_LEDS_RGB_TOOLTIP'] = 'Ändra färgen på Loti-botens LED-lampor i RGB-format.';
Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TITLE'] = '[LED-lampor] %1';
Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TOOLTIP'] = 'Ändra färgen på Loti-botens LED-lampor med en färgpalett.';
Blockly.Msg['DISPLAY_SET_LED_RGB_TITLE'] = '[LED-lampor] vänster R %1 G %2 B %3 höger R %4 G %5 B %6';
Blockly.Msg['DISPLAY_SET_LED_RGB_TOOLTIP'] = 'Ändra färgen på den vänstra och högra LED-lampan på Loti-bot i RGB-format.';
Blockly.Msg['DISPLAY_SET_LED_PALETTE_TITLE'] = '[LED-lampor] vänster %1 höger %2';
Blockly.Msg['DISPLAY_SET_LED_PALETTE_TOOLTIP'] = Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TOOLTIP'];
Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TITLE'] = '[Strålkastare] styrka %1';
Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TOOLTIP'] = 'Ställ in styrkan för Loti-botens strålkastare (mellan 0 och 255).';
Blockly.Msg['DISPLAY_SET_HEADLIGHT_TITLE'] = '[Strålkastare] vänster styrka %1 höger styrka %2';
Blockly.Msg['DISPLAY_SET_HEADLIGHT_TOOLTIP'] = Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TOOLTIP'];
Blockly.Msg['IO_WAIT_TITLE'] = 'vänta %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausa körningen av koden.';
Blockly.Msg['IO_WAIT_SECOND'] = 'sekund(er)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisekund(er)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'mikrosekund(er)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'vänta tills %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Stoppa körningen tills villkoret är uppfyllt.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'starta stoppur';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Initiera stoppuret till 0 (i sekunder).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'stoppurets värde i %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Returnerar stoppurets värde sedan start (i sekunder eller millisekunder).';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'skriv till konsolen %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Gör det möjligt att skriva data till den seriella porten.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'med';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'ny rad(er)';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'rita graf';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Detta block låter dig skriva numerisk data som blir synlig i diagramvisaren. Det kan användas med en eller flera block i "Namn" och "Data"-format. För att visa graferna, klicka på `\'Graph Mode\' ikonen i konsolen.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Data';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Namn %1 Värde %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Detta block används tillsammans med "Rita graf"-blocket. Det måste innehålla namnet på värdet som ska visas (text) och själva värdet (nummer).';
Blockly.Msg["SENSORS_IS_STOPPED_TITLE"] = "stoppad?";
Blockly.Msg["SENSORS_IS_STOPPED_TOOLTIP"] = "Returnerar true om Lotibot är stoppad.";
Blockly.Msg["SENSORS_IS_MOVING_TITLE"] = "rör sig?";
Blockly.Msg["SENSORS_IS_MOVING_TOOLTIP"] = "Returnerar true om Lotibot rör sig.";
Blockly.Msg["SENSORS_IS_COLLISION_DETECTED_TITLE"] = "kollision upptäckt?";
Blockly.Msg["SENSORS_IS_COLLISION_DETECTED_TOOLTIP"] = "Returnerar true om Lotibot upptäcker en kollision.";
Blockly.Msg["SENSORS_IS_FALL_DETECTED_TITLE"] = "fall upptäckt?";
Blockly.Msg["SENSORS_IS_FALL_DETECTED_TOOLTIP"] = "Returnerar true om Lotibot upptäcker ett fall.";
Blockly.Msg["SENSORS_IS_SPEAKER_WORKING_TITLE"] = "högtalare fungerar?";
Blockly.Msg["SENSORS_IS_SPEAKER_WORKING_TOOLTIP"] = "Returnerar true om Lotibots högtalare fungerar korrekt.";
Blockly.Msg["SENSORS_IS_HEADLIGHTS_WORKING_TITLE"] = "strålkastare på?";
Blockly.Msg["SENSORS_IS_HEADLIGHTS_WORKING_TOOLTIP"] = "Returnerar true om Lotibots strålkastare fungerar korrekt.";
Blockly.Msg["SENSORS_GET_HEADING_TITLE"] = "riktning";
Blockly.Msg["SENSORS_GET_HEADING_TOOLTIP"] = "Returnerar Lotibots nuvarande riktning från 1 till 8 (1: NORD, 3: ÖST, 5: SYD, 7: VÄST).";
Blockly.Msg["SENSORS_GET_DISTANCE_TITLE"] = "avstånd";
Blockly.Msg["SENSORS_GET_DISTANCE_TOOLTIP"] = "Returnerar avståndet som Lotibots avståndssensor mäter.";
Blockly.Msg["SENSORS_GET_LIGHT_LEVEL_TITLE"] = "omgivande ljusnivå";
Blockly.Msg["SENSORS_GET_LIGHT_LEVEL_TOOLTIP"] = "Returnerar ljusnivån som Lotibots ljussensor detekterar.";
Blockly.Msg["SENSORS_GET_SOUND_LEVEL_TITLE"] = "omgivande ljudnivå";
Blockly.Msg["SENSORS_GET_SOUND_LEVEL_TOOLTIP"] = "Returnerar ljudnivån som Lotibots ljudsensor detekterar.";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TITLE"] = "temperatur";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TOOLTIP"] = "Returnerar temperaturen som Lotibots temperatursensor mäter.";
Blockly.Msg["SENSORS_GET_BATTERY_LEVEL_TITLE"] = "batterinivå";
Blockly.Msg["SENSORS_GET_BATTERY_LEVEL_TOOLTIP"] = "Returnerar Lotibots aktuella batterinivå i procent.";
Blockly.Msg['ACTUATORS_SET_MOTORS_TITLE'] = '%1 med %2 cm hastighet %3';
Blockly.Msg['ACTUATORS_SET_MOTORS_TOOLTIP'] = 'Låter Loti-bot köra framåt eller bakåt i vald hastighet (långsam, medel eller snabb).';
Blockly.Msg['ACTUATORS_ROTATE_WITH_ANGLE_TITLE'] = 'rotera %1 med %2 ° hastighet %3';
Blockly.Msg['ACTUATORS_ROTATE_WITH_ANGLE_TOOLTIP'] = 'Låter Loti-bot rotera X° i vald hastighet (långsam, medel eller snabb).';
Blockly.Msg['ACTUATORS_DRAW_SQUARE_TITLE'] = 'rita en kvadrat med sidlängd %1 cm';
Blockly.Msg['ACTUATORS_DRAW_SQUARE_TOOLTIP'] = 'Låter Loti-bot köra i en kvadrat.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'stoppa motorerna';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Stoppar Loti-bots motorer.';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TITLE'] = 'spela upp ljud nr.%1';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TOOLTIP'] = 'Spelar upp ett ljud mellan 1 och 20.';
Blockly.Msg['ACTUATORS_GO_FORWARD'] = "framåt";
Blockly.Msg['ACTUATORS_GO_BACKWARD'] = "bakåt";
Blockly.Msg["ACTUATORS_SLOW"] = "långsam";
Blockly.Msg["ACTUATORS_MEDIUM"] = "medel";
Blockly.Msg["ACTUATORS_FAST"] = "snabb";
