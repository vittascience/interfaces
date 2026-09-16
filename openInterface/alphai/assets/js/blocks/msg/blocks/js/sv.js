/**
 * @fileoverview English messages for AlphAI. (EN)
 */

'use strict';

// IO - Time
// Robot - Communication
// Robot - Actuators
// Robot - Sensors
// Robot - Camera
// Robot - Display

Blockly.Msg['IO_WAIT_TITLE'] = 'vänta %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausar körningen av koden.';
Blockly.Msg['IO_WAIT_SECOND'] = 'sekund(er)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisekund(er)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'mikrosekund(er)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'vänta tills %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Avvaktar tills villkoret är uppfyllt.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'starta tidtagare';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Startar tidtagaren från 0 (i sekunder).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'tidtagarens värde i %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Returnerar värdet från tidtagaren sedan den startades (i sekunder eller millisekunder).';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TITLE'] = 'skriv ut %1 i konsolen';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TOOLTIP'] = 'Skriver ett meddelande till utmatningskonsolen.';
Blockly.Msg['ROBOT_SET_DIRECTION_TITLE'] = '%1 med hastighet %2';
Blockly.Msg['ROBOT_SET_DIRECTION_TOOLTIP'] = 'Flyttar roboten i vald riktning med angiven hastighet (mellan -100 och 100).';
Blockly.Msg['ROBOT_SET_MOTOR_TITLE'] = 'vänstermotorns hastighet %1 högermotorns hastighet %2';
Blockly.Msg['ROBOT_SET_MOTOR_TOOLTIP'] = 'Styr hastigheten på robotens vänstra och högra motorer (mellan -100 och 100).';
Blockly.Msg['ROBOT_SET_DURATION'] = 'under';
Blockly.Msg['ROBOT_FORWARD'] = 'framåt';
Blockly.Msg['ROBOT_BACKWARD'] = 'bakåt';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'rotera åt vänster';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'rotera åt höger';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'stoppa roboten';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'Stoppar roboten.';
Blockly.Msg['ROBOT_SET_BUZZER_TITLE'] = '%1 summern';
Blockly.Msg['ROBOT_SET_BUZZER_TOOLTIP'] = 'Slår robotens summer på eller av.';
Blockly.Msg['ROBOT_BUZZER_ON'] = 'aktivera';
Blockly.Msg['ROBOT_BUZZER_OFF'] = 'inaktivera';
Blockly.Msg['ROBOT_IS_BLOCKED_TITLE'] = 'är roboten blockerad?';
Blockly.Msg['ROBOT_IS_BLOCKED_TOOLTIP'] = 'Returnerar true om roboten är blockerad, annars false.';
Blockly.Msg['ROBOT_GET_DISTANCE_TITLE'] = 'avståndssensorvärde (i cm)';
Blockly.Msg['ROBOT_GET_DISTANCE_TOOLTIP'] = 'Returnerar robotens avståndssensorvärde (i cm).';
Blockly.Msg['ROBOT_GET_INFRA_RED_TITLE'] = 'linjesensorernas värden %1';
Blockly.Msg['ROBOT_GET_INFRA_RED_TOOLTIP'] = 'Returnerar värden från linjeföljarsensorerna ungefär 0-500 (svart) till 500-1000 (vitt). Alternativet \'all\' i blocket ger en lista med 5 sensorvärden.';
Blockly.Msg['ROBOT_ROBOT_ALL_SENSORS'] = 'alla';
Blockly.Msg['ROBOT_SET_CAMERA_TITLE'] = 'aktivera kameran med upplösning %1';
Blockly.Msg['ROBOT_SET_CAMERA_TOOLTIP'] = 'Aktiverar robotens kamera med vald upplösning.';
Blockly.Msg['ROBOT_GET_CAMERA_TITLE'] = 'kamerabild';
Blockly.Msg['ROBOT_GET_CAMERA_TOOLTIP'] = 'Returnerar bilden fångad av robotens kamera. Om vald upplösning är \'1x1\' returneras en lista med 3 heltal (R, G, B), mellan 0 och 255. Om upplösningen är \'1x2\' returneras en lista med 2 listor med 3 heltal. I andra fall returneras en lista med n_rows listor med n_columns listor med 3 heltal.';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TITLE'] = 'styr LEDarna med R %1 G %2 B %3';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TOOLTIP'] = 'Styr LEDarna på roboten genom att ange de röda, gröna och blå komponenterna (mellan 0 och 255).';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TITLE'] = 'styr LEDarna med %1';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TOOLTIP'] = 'Styr LEDarna på roboten genom att välja en färg från paletten.';
Blockly.Msg['ROBOT_ALL_SENSORS'] = 'alla';
