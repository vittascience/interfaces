/**
 * @fileoverview Italian messages for Sphero. (IT)
 */

'use strict';

// Display 
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_TITLE'] = '[LED principale] R %1 G %2 B %3';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_TOOLTIP'] = 'Cambia il colore del LED principale in formato RGB per il robot Sphero Mini.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_PALETTE_TITLE'] = '[LED principale] %1';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_PALETTE_TOOLTIP'] = 'Cambia il colore del LED principale del robot Sphero Mini utilizzando una tavolozza di colori.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_FADE_TITLE'] = '[LED principale] sfumare da %1 a %2 per %3 s';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_FADE_TOOLTIP'] = 'Cambia il colore del LED principale del robot Sphero Mini sfumando i colori.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_BLINK_TITLE'] = '[LED principale] lampeggiare in %1 per %2 s %3 volte';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_BLINK_TOOLTIP'] = 'Fa lampeggiare il LED principale del robot Sphero Mini.';
Blockly.Msg['DISPLAY_SET_BACK_LED_INTENSITY_TITLE'] = '[LED posteriore] intensità %1';
Blockly.Msg['DISPLAY_SET_BACK_LED_INTENSITY_TOOLTIP'] = 'Cambia l\'intensità del LED posteriore (tra 0 e 255) del robot Sphero Mini.';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'attendere %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Mette in pausa l\'esecuzione del codice.';
Blockly.Msg['IO_WAIT_SECOND'] = 'secondo(i)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisecondo(i)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsecondo(i)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'attendere fino a %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Mette in pausa l\'esecuzione del codice fino a quando la condizione è soddisfatta.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'avviare cronometro';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Inizializza un cronometro a 0 (in secondi).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valore del cronometro in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Restituisce il valore del cronometro dall\'inizializzazione (in secondi o millisecondi).';

// Communication
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'scrivere sulla console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Scrive dati sulla porta seriale.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'con';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'nuova(e) linea(e)';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'tracciare grafico';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Questo blocco scrive dati (numerici) che saranno visibili nel tracciatore. Può essere utilizzato con uno o più blocchi nel formato "Nome" e "Dati". Per visualizzare i grafici, fare clic sull\'icona \'Modalità Grafico\' nella console.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Dati';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Nome %1 Valore %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Questo blocco deve essere utilizzato con il blocco "Tracciare grafico". Deve contenere il nome del valore da visualizzare (testo) e il valore in questione (numero).';

// Sensors
Blockly.Msg['SENSORS_PITCH_TITLE'] = 'beccheggio (°)';
Blockly.Msg['SENSORS_PITCH_TOOLTIP'] = 'Restituisce il valore del beccheggio.';
Blockly.Msg['SENSORS_ROLL_TITLE'] = 'rollio (°)';
Blockly.Msg['SENSORS_ROLL_TOOLTIP'] = 'Restituisce il valore del rollio.';
Blockly.Msg['SENSORS_YAW_TITLE'] = 'imbardata (°)';
Blockly.Msg['SENSORS_YAW_TOOLTIP'] = 'Restituisce il valore dell\'imbardata.';
Blockly.Msg['SENSORS_ACCELEROMETER_TITLE'] = 'accelerometro (g) %1';
Blockly.Msg['SENSORS_ACCELEROMETER_TOOLTIP'] = 'Restituisce il valore dell\'accelerometro sugli assi x, y o z.';
Blockly.Msg['SENSORS_GYROSCOPE_TITLE'] = 'giroscopio %1';
Blockly.Msg['SENSORS_GYROSCOPE_TOOLTIP'] = 'Restituisce il valore del giroscopio sugli assi x, y o z.';
Blockly.Msg['SENSORS_IS_FALL_DETECTED_TITLE'] = 'collisione?';
Blockly.Msg['SENSORS_IS_FALL_DETECTED_TOOLTIP'] = 'Restituisce vero se viene rilevata una collisione.';
Blockly.Msg['X_AXIS'] = 'x';
Blockly.Msg['Y_AXIS'] = 'y';
Blockly.Msg['Z_AXIS'] = 'z';
Blockly.Msg['STRENGTH'] = 'forza';
// Actuators
Blockly.Msg['ACTUATORS_SET_MOTORS_TITLE'] = '%1 velocità %2';
Blockly.Msg['ACTUATORS_SET_MOTORS_TOOLTIP'] = 'Permette al robot Sphero Mini di avanzare o retrocedere a una velocità compresa tra 0 e 255.';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_TIMEOUT_TITLE'] = '%1 velocità %2 per %3 s';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_TIMEOUT_TOOLTIP'] = 'Permette al robot Sphero Mini di avanzare o retrocedere a una velocità compresa tra 0 e 255 per un determinato tempo.';
Blockly.Msg['ACTUATORS_SET_HEADING_TITLE'] = 'rotta %1 °';
Blockly.Msg['ACTUATORS_SET_HEADING_TOOLTIP'] = 'Cambia la rotta del robot Sphero Mini.';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_HEADING_TITLE'] = '%1 velocità %2 rotta %3 °';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_HEADING_TOOLTIP'] = 'Permette al robot Sphero Mini di avanzare o retrocedere a una velocità compresa tra 0 e 255 con una rotta data.';
Blockly.Msg['ACTUATORS_ROTATE_TITLE'] = 'ruotare %1 velocità %2';
Blockly.Msg['ACTUATORS_ROTATE_TOOLTIP'] = 'Permette al robot Sphero Mini di ruotare a una velocità compresa tra 0 e 255.';
Blockly.Msg['ACTUATORS_ROTATE_WITH_TIMEOUT_TITLE'] = 'ruotare %1 velocità %2 per %3 s';
Blockly.Msg['ACTUATORS_ROTATE_WITH_TIMEOUT_TOOLTIP'] = 'Permette al robot Sphero Mini di ruotare a una velocità compresa tra 0 e 255 per un determinato tempo.';
Blockly.Msg['ACTUATORS_SET_MOTOR_TITLE'] = 'motore a %1 direzione %2 velocità %3';
Blockly.Msg['ACTUATORS_SET_MOTOR_TOOLTIP'] = 'Controlla il motore destro o sinistro del robot Sphero Mini a una velocità compresa tra 0 e 255 in una direzione data.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'fermare motore';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Ferma i motori del robot Sphero Mini.';
Blockly.Msg['ACTUATORS_RESET_HEADING_TITLE'] = 'reimposta rotta predefinita';
Blockly.Msg['ACTUATORS_RESET_HEADING_TOOLTIP'] = 'Reimposta la rotta del robot Sphero Mini.';
Blockly.Msg['ACTUATORS_GO_FORWARD'] = "avanzare";
Blockly.Msg['ACTUATORS_GO_BACKWARD'] = "retrocedere";
Blockly.Msg['ACTUATORS_MOTOR_RIGHT'] = "destra";
Blockly.Msg['ACTUATORS_MOTOR_LEFT'] = "sinistra";
Blockly.Msg['ACTUATORS_MOTOR_RIGHT&LEFT'] = "destra&sinistra";