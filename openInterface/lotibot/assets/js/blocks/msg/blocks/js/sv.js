/**
 * @fileoverview English messages for Loti-bot. (EN)
 */

'use strict';

// Display

// IO - Time

// Communication

// Sensors

// Actuators
Blockly.Msg['DISPLAY_SET_LEDS_RGB_TITLE'] = '[LEDs] R %1 G %2 B %3';
Blockly.Msg['DISPLAY_SET_LEDS_RGB_TOOLTIP'] = 'Ändra färgen på Loti-botens LED-lampor i RGB-format.';
Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TITLE'] = '[LEDs] %1';
Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TOOLTIP'] = 'Ändra Loti-botens LED-lampors färg med en färgpalett.';
Blockly.Msg['DISPLAY_SET_LED_RGB_TITLE'] = '[LEDs] vänster R %1 G %2 B %3 höger R %4 G %5 B %6';
Blockly.Msg['DISPLAY_SET_LED_RGB_TOOLTIP'] = 'Ändra färgen på Loti-botens vänstra och högra LED-lampor i RGB-format.';
Blockly.Msg['DISPLAY_SET_LED_PALETTE_TITLE'] = '[LEDs] vänster %1 höger %2';
Blockly.Msg['DISPLAY_SET_LED_PALETTE_TOOLTIP'] = Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TOOLTIP'];
Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TITLE'] = '[Framljus] styrka %1';
Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TOOLTIP'] = 'Ställ in styrkan på Loti-botens framlyktor (mellan 0 och 255).';
Blockly.Msg['DISPLAY_SET_HEADLIGHT_TITLE'] = '[Framljus] vänster styrka %1 höger styrka %2';
Blockly.Msg['DISPLAY_SET_HEADLIGHT_TOOLTIP'] = Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TOOLTIP'];
Blockly.Msg['IO_WAIT_TITLE'] = 'vänta %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausa körningen av koden.';
Blockly.Msg['IO_WAIT_SECOND'] = 'sekund(er)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisekund(er)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'mikrosekund(er)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'vänta tills %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Stoppa kodkörningen tills villkoret uppfylls.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'starta tidtagare';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Initiera en tidtagare till 0 (i sekunder).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'tidtagarens värde i %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Returnerar tidtagarens värde sedan initiering (i sekunder eller millisekunder).';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'skriv till konsolen %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Gör det möjligt att skriva data till den seriella porten.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'med';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'ny rad(er)';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'rita graf';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Blockly.Msg[\'COMMUNICATION_WRITEGRAPH_TOOLTIP\'] = \'Detta block låter dig skriva numeriska data som syns i plottaren. Det kan användas med ett eller flera block i formatet "Name" och "Data". För att se graferna, klicka på "Graph Mode"-ikonen i konsolen.\';';
Blockly.Msg['COMMUNICATION_DATA'] = 'Data';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Namn %1 Värde %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Detta block används med "Plot Graph"-blocket. Det ska innehålla namnet på värdet som ska visas (text), och själva värdet (nummer).';
Blockly.Msg["SENSORS_IS_STOPPED_TITLE"] = "stannat?";
Blockly.Msg["SENSORS_IS_STOPPED_TOOLTIP"] = "Returnerar true om Lotibot är stillastående.";
Blockly.Msg["SENSORS_IS_MOVING_TITLE"] = "rör sig?";
Blockly.Msg["SENSORS_IS_MOVING_TOOLTIP"] = "Returnerar true om Lotibot rör sig.";
Blockly.Msg["SENSORS_IS_COLLISION_DETECTED_TITLE"] = "kollision upptäckt?";
Blockly.Msg["SENSORS_IS_COLLISION_DETECTED_TOOLTIP"] = "Returnerar true om Lotibot upptäcker en kollision.";
Blockly.Msg["SENSORS_IS_FALL_DETECTED_TITLE"] = "fall upptäckt?";
Blockly.Msg["SENSORS_IS_FALL_DETECTED_TOOLTIP"] = "Returnerar true om Lotibot upptäcker ett fall.";
Blockly.Msg["SENSORS_IS_SPEAKER_WORKING_TITLE"] = "högtalaren fungerar?";
Blockly.Msg["SENSORS_IS_SPEAKER_WORKING_TOOLTIP"] = "Returnerar true om Lotibots högtalare fungerar korrekt.";
Blockly.Msg["SENSORS_IS_HEADLIGHTS_WORKING_TITLE"] = "framljus på?";
Blockly.Msg["SENSORS_IS_HEADLIGHTS_WORKING_TOOLTIP"] = "Returnerar true om Lotibots framljus fungerar korrekt.";
Blockly.Msg["SENSORS_GET_HEADING_TITLE"] = "riktning";
Blockly.Msg["SENSORS_GET_HEADING_TOOLTIP"] = "Returnerar aktuell riktning för Lotibot från 1 till 8 (1: NORD, 3: ÖST, 5: SÖDER, 7: VÄST).";
Blockly.Msg["SENSORS_GET_DISTANCE_TITLE"] = "avstånd";
Blockly.Msg["SENSORS_GET_DISTANCE_TOOLTIP"] = "Returnerar avståndet som Lotibots avståndssensor mäter.";
Blockly.Msg["SENSORS_GET_LIGHT_LEVEL_TITLE"] = "omgivande ljusnivå";
Blockly.Msg["SENSORS_GET_LIGHT_LEVEL_TOOLTIP"] = "Returnerar ljusnivån som Lotibots ljussensor mäter.";
Blockly.Msg["SENSORS_GET_SOUND_LEVEL_TITLE"] = "omgivande ljudnivå";
Blockly.Msg["SENSORS_GET_SOUND_LEVEL_TOOLTIP"] = "Returnerar ljudnivån som Lotibots ljudsensor mäter.";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TITLE"] = "temperatur";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TOOLTIP"] = "Returnerar temperaturen som Lotibots temperatursensor mäter.";
Blockly.Msg["SENSORS_GET_BATTERY_LEVEL_TITLE"] = "batterinivå";
Blockly.Msg["SENSORS_GET_BATTERY_LEVEL_TOOLTIP"] = "Returnerar Lotibots aktuella batterinivå i procent.";
Blockly.Msg['ACTUATORS_SET_MOTORS_TITLE'] = '%1 med %2 cm hastighet %3';
Blockly.Msg['ACTUATORS_SET_MOTORS_TOOLTIP'] = 'Gör att Loti-bot kan köra framåt eller bakåt i vald hastighet (långsam, medel eller snabb).';
Blockly.Msg['ACTUATORS_ROTATE_WITH_ANGLE_TITLE'] = 'rotera %1 med %2 ° hastighet %3';
Blockly.Msg['ACTUATORS_ROTATE_WITH_ANGLE_TOOLTIP'] = 'Gör att Loti-bot kan rotera med X° i vald hastighet (långsam, medel eller snabb).';
Blockly.Msg['ACTUATORS_DRAW_SQUARE_TITLE'] = 'rita en kvadrat med sida %1 cm';
Blockly.Msg['ACTUATORS_DRAW_SQUARE_TOOLTIP'] = 'Gör att Loti-bot rör sig och bildar en kvadrat.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'stoppa motorerna';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Gör att Loti-botens motorer stoppas.';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TITLE'] = 'spela ljud nr.%1';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TOOLTIP'] = 'Gör det möjligt att spela ett ljud mellan 1 och 20.';
Blockly.Msg['ACTUATORS_GO_FORWARD'] = "framåt";
Blockly.Msg['ACTUATORS_GO_BACKWARD'] = "bakåt";
Blockly.Msg["ACTUATORS_SLOW"] = "långsam";
Blockly.Msg["ACTUATORS_MEDIUM"] = "medel";
Blockly.Msg["ACTUATORS_FAST"] = "snabb";
