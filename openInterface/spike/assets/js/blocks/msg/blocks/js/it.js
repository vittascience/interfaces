/**
 * @fileoverview Italian messages for Lego Spike. (IT)
 */

'use strict';

// Display
Blockly.Msg['DISPLAY_SHOW_LEDS_TOOLTIP'] = "Consente di cambiare il colore dei LED sulla matrice 3x3.";
Blockly.Msg['DISPLAY_SET_PIXEL_TITLE'] = "%1 controllare LED x %2 y %3 %4";
Blockly.Msg['DISPLAY_SET_PIXEL_TOOLTIP'] = "Consente di cambiare il colore di un LED sulla matrice 3x3.";
Blockly.Msg['DISPLAY_SET_INTENSITY_TITLE'] = "%1 regolare l'intensità %2 %";
Blockly.Msg['DISPLAY_SET_INTENSITY_TOOLTIP'] = "Consente di cambiare l'intensità luminosa dei LED sulla matrice 3x3.";

// Actuators
Blockly.Msg['ACTUATORS_START_MOTOR_CONTINUOUS_TITLE'] = "%1 avviare motore %2 velocità %3 % in continuo";
Blockly.Msg['ACTUATORS_START_MOTOR_CONTINUOUS_TOOLTIP'] = "Avvia il motore nella direzione specificata alla velocità indicata in modo continuo.";
Blockly.Msg['ACTUATORS_START_MOTOR_FOR_TIME_TITLE'] = "%1 avviare motore %2 velocità %3 % per %4 secondi";
Blockly.Msg['ACTUATORS_START_MOTOR_FOR_TIME_TOOLTIP'] = "Avvia il motore nella direzione specificata alla velocità indicata per la durata specificata.";
Blockly.Msg['ACTUATORS_MOVE_MOTOR_TO_POSITION_TITLE'] = "%1 spostare motore in posizione %2 ° velocità %3 %";
Blockly.Msg['ACTUATORS_MOVE_MOTOR_TO_POSITION_TOOLTIP'] = "Sposta il motore nella posizione specificata alla velocità indicata.";
Blockly.Msg['ACTUATORS_STOP_MOTOR_TITLE'] = "%1 fermare motore";
Blockly.Msg['ACTUATORS_STOP_MOTOR_TOOLTIP'] = "Ferma il motore.";
Blockly.Msg['ACTUATORS_MOVE_MOTORS_BY_DEGREES_TITLE'] = "%1 spostare motore %2 di %3 ° velocità %4 %";
Blockly.Msg['ACTUATORS_MOVE_MOTORS_BY_DEGREES_TOOLTIP'] = "Sposta il motore del numero specificato di gradi nella direzione indicata alla velocità fornita.";

// Communication
Blockly.Msg['COMMUNICATION_SPEECH_SYNTHESIS_SAY_TITLE'] = 'dire %1 in %2';
Blockly.Msg['COMMUNICATION_SPEECH_SYNTHESIS_SAY_TOOLTIP'] = 'Permette al dispositivo di parlare nella lingua specificata.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'scrivere sulla console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Consente di scrivere dati sulla porta seriale.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'con';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'nuova/e linea/e';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'tracciare grafico';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Questo blocco consente di scrivere dati (numerici) che saranno visibili nel grafico. Può essere utilizzato con uno o più blocchi nel formato "Nome" e "Dati". Per visualizzare i grafici, fare clic sull\'icona "Modalità Grafico" nella console.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Dato';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Nome %1 Valore %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Questo blocco viene utilizzato con il blocco "Tracciare grafico". Deve contenere il nome del valore da visualizzare (testo) e il valore stesso (numero).';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'attendere %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausa l\'esecuzione del codice.';
Blockly.Msg['IO_WAIT_SECOND'] = 'secondo/i';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisecondo/i';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsecondo/i';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'attendere fino a %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = "Ferma l'esecuzione del codice fino a quando la condizione non viene soddisfatta.";
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'avviare il cronometro';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = "Inizializza un cronometro a 0 (in secondi).";
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valore del cronometro in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Restituisce il valore del cronometro dall\'inizializzazione (in secondi o millisecondi).';

// Actuators
Blockly.Msg['ACTUATORS_MOVE_FORWARD_TITLE'] = 'avanzare';
Blockly.Msg['ACTUATORS_MOVE_FORWARD_TOOLTIP'] = 'Consente al robot Lego Spike di avanzare.';
Blockly.Msg['ACTUATORS_MOVE_BACKWARD_TITLE'] = 'indietreggiare';
Blockly.Msg['ACTUATORS_MOVE_BACKWARD_TOOLTIP'] = 'Consente al robot Lego Spike di indietreggiare.';
Blockly.Msg['ACTUATORS_TURN_LEFT_45_DEGREES_TITLE'] = 'girare a sinistra di 45°';
Blockly.Msg['ACTUATORS_TURN_LEFT_45_DEGREES_TOOLTIP'] = 'Consente al robot Lego Spike di girare a sinistra di 45°.';
Blockly.Msg['ACTUATORS_TURN_LEFT_90_DEGREES_TITLE'] = 'girare a sinistra di 90°';
Blockly.Msg['ACTUATORS_TURN_LEFT_90_DEGREES_TOOLTIP'] = 'Consente al robot Lego Spike di girare a sinistra di 90°.';
Blockly.Msg['ACTUATORS_TURN_RIGHT_45_DEGREES_TITLE'] = 'girare a destra di 45°';
Blockly.Msg['ACTUATORS_TURN_RIGHT_45_DEGREES_TOOLTIP'] = 'Consente al robot Lego Spike di girare a destra di 45°.';
Blockly.Msg['ACTUATORS_TURN_RIGHT_90_DEGREES_TITLE'] = 'girare a destra di 90°';
Blockly.Msg['ACTUATORS_TURN_RIGHT_90_DEGREES_TOOLTIP'] = 'Consente al robot Lego Spike di girare a destra di 90°.';

// Sensors
Blockly.Msg['SENSORS_COLOR_TITLE'] = '%1 colore rilevato';
Blockly.Msg['SENSORS_COLOR_TOOLTIP'] = 'Restituisce il colore rilevato come una stringa (Nero, Viola, Porpora, Blu, Azzurro, Turchese, Verde, Giallo, Arancione, Rosso, Bianco).';
Blockly.Msg['SENSORS_COLOR_DETECTION_TITLE'] = 'il colore rilevato da %1 è %2';
Blockly.Msg['SENSORS_COLOR_DETECTION_TOOLTIP'] = 'Restituisce vero se il colore rilevato corrisponde a quello specificato.';
