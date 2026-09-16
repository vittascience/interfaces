/**
 * @fileoverview English messages for Sphero. (EN)
 */

'use strict';

// Display 

// IO - Time

// Communication

// Sensors
// Actuators
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_TITLE'] = '[Huvud-LED] R %1 G %2 B %3';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_TOOLTIP'] = 'Ändrar huvud-LED:ens färg i RGB-format för Sphero Mini-roboten.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_PALETTE_TITLE'] = '[Huvud-LED] %1';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_PALETTE_TOOLTIP'] = 'Ändrar huvud-LED:ens färg för Sphero Mini med en färgpalett.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_FADE_TITLE'] = '[Huvud-LED] tona från %1 till %2 under %3 s';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_FADE_TOOLTIP'] = 'Ändrar huvud-LED:ens färg genom att tona mellan färger.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_BLINK_TITLE'] = '[Huvud-LED] blinka i %1 i %2 s %3 gånger';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_BLINK_TOOLTIP'] = 'Får Sphero Mini:s huvud-LED att blinka.';
Blockly.Msg['DISPLAY_SET_BACK_LED_INTENSITY_TITLE'] = '[Bakre LED] intensitet %1';
Blockly.Msg['DISPLAY_SET_BACK_LED_INTENSITY_TOOLTIP'] = 'Ändrar intensiteten för bak-LED:en (0–255) på Sphero Mini-roboten.';
Blockly.Msg['IO_WAIT_TITLE'] = 'vänta %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausar programkörningen.';
Blockly.Msg['IO_WAIT_SECOND'] = 'sekund(er)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisekund(er)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'mikrosekund(er)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'vänta tills %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Pausar programkörningen tills villkoret uppfylls.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'starta stoppur';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Sätter stoppuret till 0 (i sekunder).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'stoppurets värde i %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Returnerar stoppurets värde sedan det startades (i sekunder eller millisekunder).';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'skriv till konsolen %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Skriver data till den seriella porten.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'med';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'ny rad(er)';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'rita graf';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Detta block skriver numeriska data som visas i plottaren. Det kan användas tillsammans med ett eller flera block i formatet "Namn" och "Data". För att visa graferna, klicka på ikonen \'Graph Mode\' i konsolen.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Data';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Namn %1 Värde %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Detta block används med blocket "rita graf". Det ska innehålla namnet på värdet som ska visas (text) och själva värdet (nummer).';
Blockly.Msg['SENSORS_PITCH_TITLE'] = 'lutning (°)';
Blockly.Msg['SENSORS_PITCH_TOOLTIP'] = 'Returnerar lutningsvärdet.';
Blockly.Msg['SENSORS_ROLL_TITLE'] = 'rullning (°)';
Blockly.Msg['SENSORS_ROLL_TOOLTIP'] = 'Returnerar rullningsvärdet.';
Blockly.Msg['SENSORS_YAW_TITLE'] = 'yaw (°)';
Blockly.Msg['SENSORS_YAW_TOOLTIP'] = 'Returnerar yaw-värdet.';
Blockly.Msg['SENSORS_ACCELEROMETER_TITLE'] = 'accelerometer (g) %1';
Blockly.Msg['SENSORS_ACCELEROMETER_TOOLTIP'] = 'Returnerar accelerometerns värde på x-, y- eller z-axeln.';
Blockly.Msg['SENSORS_GYROSCOPE_TITLE'] = 'gyroskop %1';
Blockly.Msg['SENSORS_GYROSCOPE_TOOLTIP'] = 'Returnerar gyroskopets värde på x-, y- eller z-axeln.';
Blockly.Msg['SENSORS_IS_FALL_DETECTED_TITLE'] = 'kollision?';
Blockly.Msg['SENSORS_IS_FALL_DETECTED_TOOLTIP'] = 'Returnerar true om en kollision upptäcks.';
Blockly.Msg['X_AXIS'] = 'x';
Blockly.Msg['Y_AXIS'] = 'y';
Blockly.Msg['Z_AXIS'] = 'z';
Blockly.Msg['STRENGTH'] = 'styrka';
Blockly.Msg['ACTUATORS_SET_MOTORS_TITLE'] = '%1 hastighet %2';
Blockly.Msg['ACTUATORS_SET_MOTORS_TOOLTIP'] = 'Gör att Sphero Mini-roboten kan röra sig framåt eller bakåt med en hastighet mellan 0 och 255.';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_TIMEOUT_TITLE'] = '%1 hastighet %2 i %3 s';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_TIMEOUT_TOOLTIP'] = 'Gör att Sphero Mini-roboten kan röra sig framåt eller bakåt under en given tid med hastighet mellan 0 och 255.';
Blockly.Msg['ACTUATORS_SET_HEADING_TITLE'] = 'kurs %1 °';
Blockly.Msg['ACTUATORS_SET_HEADING_TOOLTIP'] = 'Ändrar kursen för Sphero Mini-roboten.';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_HEADING_TITLE'] = '%1 hastighet %2 kurs %3 °';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_HEADING_TOOLTIP'] = 'Gör att Sphero Mini-roboten kan röra sig framåt eller bakåt med hastighet mellan 0 och 255 och en angiven kurs.';
Blockly.Msg['ACTUATORS_ROTATE_TITLE'] = 'rotera %1 hastighet %2';
Blockly.Msg['ACTUATORS_ROTATE_TOOLTIP'] = 'Gör att Sphero Mini-roboten kan rotera med hastighet mellan 0 och 255.';
Blockly.Msg['ACTUATORS_ROTATE_WITH_TIMEOUT_TITLE'] = 'rotera %1 hastighet %2 i %3 s';
Blockly.Msg['ACTUATORS_ROTATE_WITH_TIMEOUT_TOOLTIP'] = 'Gör att Sphero Mini-roboten kan rotera under en given tid med hastighet mellan 0 och 255.';
Blockly.Msg['ACTUATORS_SET_MOTOR_TITLE'] = 'motor %1 riktning %2 hastighet %3';
Blockly.Msg['ACTUATORS_SET_MOTOR_TOOLTIP'] = 'Styr höger eller vänster motor på Sphero Mini-roboten med hastighet mellan 0 och 255 i angiven riktning.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'stoppa motorerna';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Stoppar motorerna på Sphero Mini-roboten.';
Blockly.Msg['ACTUATORS_RESET_HEADING_TITLE'] = 'återställ kurs till standard';
Blockly.Msg['ACTUATORS_RESET_HEADING_TOOLTIP'] = 'Återställer kursen för Sphero Mini-roboten.';
Blockly.Msg['ACTUATORS_GO_FORWARD'] = "framåt";
Blockly.Msg['ACTUATORS_GO_BACKWARD'] = "bakåt";
Blockly.Msg['ACTUATORS_MOTOR_RIGHT'] = "höger";
Blockly.Msg['ACTUATORS_MOTOR_LEFT'] = "vänster";
Blockly.Msg['ACTUATORS_MOTOR_RIGHT&LEFT'] = "höger&vänster";
