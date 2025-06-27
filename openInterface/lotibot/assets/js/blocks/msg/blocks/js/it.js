/**
 * @fileoverview Italian messages for Loti-bot. (IT)
 */

'use strict';

// Display
Blockly.Msg['DISPLAY_SET_LEDS_RGB_TITLE'] = '[LED] R %1 G %2 B %3';
Blockly.Msg['DISPLAY_SET_LEDS_RGB_TOOLTIP'] = 'Cambia il colore dei LED del Loti-bot in formato RGB.';
Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TITLE'] = '[LED] %1';
Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TOOLTIP'] = 'Cambia il colore dei LED del Loti-bot utilizzando una tavolozza di colori.';
Blockly.Msg['DISPLAY_SET_LED_RGB_TITLE'] = '[LEDs] sinistra R %1 V %2 B %3 destra R %4 V %5 B %6';
Blockly.Msg['DISPLAY_SET_LED_RGB_TOOLTIP'] = 'Cambia il colore dei LED sinistro e destro nel formato RGB sul robot Loti-bot.';
Blockly.Msg['DISPLAY_SET_LED_PALETTE_TITLE'] = '[LED] sinistra %1 destra %2';
Blockly.Msg['DISPLAY_SET_LED_PALETTE_TOOLTIP'] = Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TOOLTIP'];
Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TITLE'] = '[Fari] potenza %1';
Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TOOLTIP'] = 'Imposta la potenza dei fari del Loti-bot (tra 0 e 255).';
Blockly.Msg['DISPLAY_SET_HEADLIGHT_TITLE'] = '[Fari] potenza sinistra %1 potenza destra %2';
Blockly.Msg['DISPLAY_SET_HEADLIGHT_TOOLTIP'] = Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TOOLTIP'];

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'attendi %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Mette in pausa l\'esecuzione del codice.';
Blockly.Msg['IO_WAIT_SECOND'] = 'secondo(i)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisecondo(i)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsecondo(i)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'attendi fino a %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Interrompe l\'esecuzione del codice fino a quando la condizione non è soddisfatta.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'avvia cronometro';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Inizializza un cronometro a 0 (in secondi).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valore del cronometro in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Restituisce il valore del cronometro dall\'inizializzazione (in secondi o millisecondi).';

// Communication
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'scrivi nella console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Permette di scrivere dati nella porta seriale.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'con';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'nuova(e) linea(e)';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'traccia grafico';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Questo blocco permette di scrivere dati (numerici) che saranno visibili nel plotter. Può essere utilizzato con uno o più blocchi nel formato "Nome" e "Dati". Per visualizzare i grafici, cliccare sull\'icona \'Modalità Grafica\' nella console.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Dato';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Nome %1 Valore %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Questo blocco deve essere utilizzato con il blocco "Traccia grafico". Deve contenere il nome del valore da visualizzare (testo) e il valore effettivo (numero).';

// Sensors
Blockly.Msg["SENSORS_IS_STOPPED_TITLE"] = "è fermo?";
Blockly.Msg["SENSORS_IS_STOPPED_TOOLTIP"] = "Restituisce vero se il Lotibot è fermo.";
Blockly.Msg["SENSORS_IS_MOVING_TITLE"] = "è in movimento?";
Blockly.Msg["SENSORS_IS_MOVING_TOOLTIP"] = "Restituisce vero se il Lotibot è in movimento.";
Blockly.Msg["SENSORS_IS_COLLISION_DETECTED_TITLE"] = "collisione rilevata?";
Blockly.Msg["SENSORS_IS_COLLISION_DETECTED_TOOLTIP"] = "Restituisce vero se una collisione è rilevata dal Lotibot.";
Blockly.Msg["SENSORS_IS_FALL_DETECTED_TITLE"] = "caduta rilevata?";
Blockly.Msg["SENSORS_IS_FALL_DETECTED_TOOLTIP"] = "Restituisce vero se una caduta è rilevata dal Lotibot.";
Blockly.Msg["SENSORS_IS_SPEAKER_WORKING_TITLE"] = "altoparlante funzionante?";
Blockly.Msg["SENSORS_IS_SPEAKER_WORKING_TOOLTIP"] = "Restituisce vero se l'altoparlante del Lotibot funziona correttamente.";
Blockly.Msg["SENSORS_IS_HEADLIGHTS_WORKING_TITLE"] = "fari accesi?";
Blockly.Msg["SENSORS_IS_HEADLIGHTS_WORKING_TOOLTIP"] = "Restituisce vero se i fari del Lotibot sono funzionanti.";
Blockly.Msg["SENSORS_GET_HEADING_TITLE"] = "orientamento";
Blockly.Msg["SENSORS_GET_HEADING_TOOLTIP"] = "Restituisce l'orientamento attuale del Lotibot da 1 a 8 (1: NORD, 3: EST, 5: SUD, 7: OVEST).";
Blockly.Msg["SENSORS_GET_DISTANCE_TITLE"] = "distanza";
Blockly.Msg["SENSORS_GET_DISTANCE_TOOLTIP"] = "Restituisce la distanza rilevata dal sensore di distanza del Lotibot.";
Blockly.Msg["SENSORS_GET_LIGHT_LEVEL_TITLE"] = "livello di luce ambientale";
Blockly.Msg["SENSORS_GET_LIGHT_LEVEL_TOOLTIP"] = "Restituisce il livello di luce rilevato dal sensore di luce del Lotibot.";
Blockly.Msg["SENSORS_GET_SOUND_LEVEL_TITLE"] = "livello di suono ambientale";
Blockly.Msg["SENSORS_GET_SOUND_LEVEL_TOOLTIP"] = "Restituisce il livello di suono rilevato dal sensore di suono del Lotibot.";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TITLE"] = "temperatura";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TOOLTIP"] = "Restituisce la temperatura rilevata dal sensore di temperatura del Lotibot.";
Blockly.Msg["SENSORS_GET_BATTERY_LEVEL_TITLE"] = "livello di batteria";
Blockly.Msg["SENSORS_GET_BATTERY_LEVEL_TOOLTIP"] = "Restituisce il livello attuale di batteria del Lotibot in percentuale.";

// Actuators
Blockly.Msg['ACTUATORS_SET_MOTORS_TITLE'] = '%1 per %2 cm velocità %3';
Blockly.Msg['ACTUATORS_SET_MOTORS_TOOLTIP'] = 'Permette al Loti-bot di muoversi avanti o indietro a una certa velocità (lenta, media o veloce).';
Blockly.Msg['ACTUATORS_ROTATE_WITH_ANGLE_TITLE'] = 'ruota %1 di %2 ° velocità %3';
Blockly.Msg['ACTUATORS_ROTATE_WITH_ANGLE_TOOLTIP'] = 'Permette al Loti-bot di ruotare di X° a una certa velocità (lenta, media o veloce).';
Blockly.Msg['ACTUATORS_DRAW_SQUARE_TITLE'] = 'disegnare un quadrato di %1 cm di lato';
Blockly.Msg['ACTUATORS_DRAW_SQUARE_TOOLTIP'] = 'Consente al robot Loti-bot di muoversi formando un quadrato.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'ferma i motori';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Permette di fermare i motori del Loti-bot.';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TITLE'] = 'suona il suono n°%1';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TOOLTIP'] = 'Permette di riprodurre un suono tra 1 e 20.';
Blockly.Msg['ACTUATORS_GO_FORWARD'] = "avanti";
Blockly.Msg['ACTUATORS_GO_BACKWARD'] = "indietro";
Blockly.Msg["ACTUATORS_SLOW"] = "lento";
Blockly.Msg["ACTUATORS_MEDIUM"] = "medio";
Blockly.Msg["ACTUATORS_FAST"] = "veloce";