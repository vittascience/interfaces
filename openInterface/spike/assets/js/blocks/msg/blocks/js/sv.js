/**
 * @fileoverview English messages for Lego Spike. (EN)
 */

'use strict';

// Display

// Actuators

// Communication

// IO - Time

// Actuators

// Sensors

Blockly.Msg['DISPLAY_SHOW_LEDS_TOOLTIP'] = "Gör det möjligt att ändra färg på lysdioderna i 3x3-matrisen.";
Blockly.Msg['DISPLAY_SET_PIXEL_TITLE'] = "%1 styr LED x %2 y %3 %4";
Blockly.Msg['DISPLAY_SET_PIXEL_TOOLTIP'] = "Gör det möjligt att ändra färg på en lysdiod i 3x3-matrisen.";
Blockly.Msg['DISPLAY_SET_INTENSITY_TITLE'] = "%1 ställ in intensiteten %2 %";
Blockly.Msg['DISPLAY_SET_INTENSITY_TOOLTIP'] = "Gör det möjligt att ändra ljusstyrkan hos lysdioderna i 3x3-matrisen.";
Blockly.Msg['ACTUATORS_START_MOTOR_CONTINUOUS_TITLE'] = "%1 starta motor %2 med hastighet %3 % kontinuerligt";
Blockly.Msg['ACTUATORS_START_MOTOR_CONTINUOUS_TOOLTIP'] = "Startar motorn i angiven riktning med angiven hastighet kontinuerligt.";
Blockly.Msg['ACTUATORS_START_MOTOR_FOR_TIME_TITLE'] = "%1 starta motor %2 med hastighet %3 % i %4 sekunder";
Blockly.Msg['ACTUATORS_START_MOTOR_FOR_TIME_TOOLTIP'] = "Startar motorn i angiven riktning med angiven hastighet under den angivna tiden.";
Blockly.Msg['ACTUATORS_MOVE_MOTOR_TO_POSITION_TITLE'] = "%1 flytta motor till position %2 ° med hastighet %3 %";
Blockly.Msg['ACTUATORS_MOVE_MOTOR_TO_POSITION_TOOLTIP'] = "Flyttar motorn till angiven position med angiven hastighet.";
Blockly.Msg['ACTUATORS_STOP_MOTOR_TITLE'] = "%1 stoppa motor";
Blockly.Msg['ACTUATORS_STOP_MOTOR_TOOLTIP'] = "Stoppar motorn.";
Blockly.Msg['ACTUATORS_MOVE_MOTORS_BY_DEGREES_TITLE'] = "%1 flytta motor %2 med %3 ° vid hastighet %4 %";
Blockly.Msg['ACTUATORS_MOVE_MOTORS_BY_DEGREES_TOOLTIP'] = "Flyttar motorn det angivna antalet grader i given riktning med angiven hastighet.";
Blockly.Msg['COMMUNICATION_SPEECH_SYNTHESIS_SAY_TITLE'] = 'säg %1 på %2';
Blockly.Msg['COMMUNICATION_SPEECH_SYNTHESIS_SAY_TOOLTIP'] = 'Gör så att enheten talar på det angivna språket.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'skriv till konsolen %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Gör det möjligt att skriva data till den seriella porten.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'med';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'ny rad(er)';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'rita graf';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Detta block låter dig skriva (numeriska) data som syns i plottern. Det kan användas tillsammans med ett eller flera block i formatet "Namn" och "Data". För att se grafer, klicka på ikonen \'Graph Mode\' i konsolen.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Data';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Namn %1 Värde %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Detta block används tillsammans med blocket "rita graf". Det ska innehålla namnet på värdet som ska visas (text) och själva värdet (nummer).';
Blockly.Msg['IO_WAIT_TITLE'] = 'vänta %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausar körningen av koden.';
Blockly.Msg['IO_WAIT_SECOND'] = 'sekund(er)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisekund(er)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'mikrosekund(er)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'vänta tills %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Stoppar körningen av koden tills villkoret uppfylls.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'starta kronometern';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Startar en kronometer från 0 (i sekunder).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'kronometervärde i %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Returnerar kronometerns värde sedan start (i sekunder eller millisekunder).';
Blockly.Msg['ACTUATORS_MOVE_FORWARD_TITLE'] = 'kör framåt';
Blockly.Msg['ACTUATORS_MOVE_FORWARD_TOOLTIP'] = 'Gör att Lego Spike-roboten kan köra framåt.';
Blockly.Msg['ACTUATORS_MOVE_BACKWARD_TITLE'] = 'kör bakåt';
Blockly.Msg['ACTUATORS_MOVE_BACKWARD_TOOLTIP'] = 'Gör att Lego Spike-roboten kan köra bakåt.';
Blockly.Msg['ACTUATORS_TURN_LEFT_45_DEGREES_TITLE'] = 'sväng vänster 45°';
Blockly.Msg['ACTUATORS_TURN_LEFT_45_DEGREES_TOOLTIP'] = 'Gör att Lego Spike-roboten kan svänga 45° åt vänster.';
Blockly.Msg['ACTUATORS_TURN_LEFT_90_DEGREES_TITLE'] = 'sväng vänster 90°';
Blockly.Msg['ACTUATORS_TURN_LEFT_90_DEGREES_TOOLTIP'] = 'Gör att Lego Spike-roboten kan svänga 90° åt vänster.';
Blockly.Msg['ACTUATORS_TURN_RIGHT_45_DEGREES_TITLE'] = 'sväng höger 45°';
Blockly.Msg['ACTUATORS_TURN_RIGHT_45_DEGREES_TOOLTIP'] = 'Gör att Lego Spike-roboten kan svänga 45° åt höger.';
Blockly.Msg['ACTUATORS_TURN_RIGHT_90_DEGREES_TITLE'] = 'sväng höger 90°';
Blockly.Msg['ACTUATORS_TURN_RIGHT_90_DEGREES_TOOLTIP'] = 'Gör att Lego Spike-roboten kan svänga 90° åt höger.';
Blockly.Msg['SENSORS_COLOR_TITLE'] = '%1 upptäckt färg';
Blockly.Msg['SENSORS_COLOR_TOOLTIP'] = 'Returnerar den upptäckta färgen som en sträng (Svart, Viol, Lila, Blå, Azur, Turkos, Grön, Gul, Orange, Röd, Vit).';
Blockly.Msg['SENSORS_COLOR_DETECTION_TITLE'] = '%1 upptäckt färg är %2';
Blockly.Msg['SENSORS_COLOR_DETECTION_TOOLTIP'] = 'Returnerar true om den upptäckta färgen stämmer överens med den angivna.';
