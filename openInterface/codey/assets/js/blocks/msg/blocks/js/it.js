/**
 * @fileoverview Italian messages for Codey. (IT)
 */

'use strict';

// Display 
Blockly.Msg['DISPLAY_SHOWRGB_TITLE'] = '[LED integrato] R %1 G %2 B %3';
Blockly.Msg['DISPLAY_SHOWRGB_TOOLTIP'] = 'Mostra il colore specificato sul LED integrato di Codey in formato RGB (0 ~ 255).';
Blockly.Msg['DISPLAY_SETRED_TITLE'] = '[LED integrato] intensità del rosso %1';
Blockly.Msg['DISPLAY_SETRED_TOOLTIP'] = 'Imposta l\'intensità del rosso del LED integrato di Codey (0 ~ 255).';
Blockly.Msg['DISPLAY_SETGREEN_TITLE'] = '[LED integrato] intensità del verde %1';
Blockly.Msg['DISPLAY_SETGREEN_TOOLTIP'] = 'Imposta l\'intensità del verde del LED integrato di Codey (0 ~ 255).';
Blockly.Msg['DISPLAY_SETBLUE_TITLE'] = '[LED integrato] intensità del blu %1';
Blockly.Msg['DISPLAY_SETBLUE_TOOLTIP'] = 'Imposta l\'intensità del blu del LED integrato di Codey (0 ~ 255).';
Blockly.Msg['DISPLAY_OFF_TITLE'] = '[LED integrato] spegni';
Blockly.Msg['DISPLAY_OFF_TOOLTIP'] = 'Spegne il LED integrato di Codey.';
Blockly.Msg['DISPLAY_SHOW_TITLE'] = '[Matrice] mostra %1';
Blockly.Msg['DISPLAY_SHOW_TOOLTIP'] = 'Mostra il testo specificato sulla matrice LED di Codey.';
Blockly.Msg['DISPLAY_SETPIXEL_TITLE'] = '[Matrice] pixel X %1 Y %2 stato %3';
Blockly.Msg['DISPLAY_SETPIXEL_TOOLTIP'] = 'Imposta lo stato del pixel nella posizione X e Y della matrice LED di Codey.';
Blockly.Msg['DISPLAY_GETPIXEL_TITLE'] = '[Matrice] stato del pixel X %1 Y %2';
Blockly.Msg['DISPLAY_GETPIXEL_TOOLTIP'] = 'Restituisce lo stato del pixel nella posizione X e Y della matrice LED di Codey.';
Blockly.Msg['DISPLAY_TOGGLEPIXEL_TITLE'] = '[Matrice] cambia stato del pixel X %1 Y %2';
Blockly.Msg['DISPLAY_TOGGLEPIXEL_TOOLTIP'] = 'Inverte lo stato del pixel nella posizione X e Y della matrice LED di Codey.';
Blockly.Msg['DISPLAY_CLEAR_TITLE'] = '[Matrice] cancella';
Blockly.Msg['DISPLAY_CLEAR_TOOLTIP'] = 'Cancella il contenuto della matrice LED di Codey.';
// IO
Blockly.Msg['IO_DIGITAL_SIGNAL_TITLE'] = '%1';
Blockly.Msg['IO_DIGITAL_SIGNAL_HIGH'] = 'ALTO (1)';
Blockly.Msg['IO_DIGITAL_SIGNAL_LOW'] = 'BASSO (0)';
Blockly.Msg['IO_DIGITAL_SIGNAL_TOOLTIP'] = 'Restituisce un valore booleano (1 se ALTO o 0 se BASSO).';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'attendere %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Arresta l\'esecuzione del codice (durata in secondi o millisecondi).';
Blockly.Msg['IO_WAIT_SECOND'] = 'secondo(i)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisecondi';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsecond(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'attendere fino a %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Arresta l\'esecuzione del codice finché la condizione non è soddisfatta.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'inizializza il cronometro';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Consente di inizializzare il cronometro (in secondi).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'ottieni cronometro in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Restituisce il valore del cronometro dall\'inizializzazione in secondi o millisecondi.';
Blockly.Msg['IO_ONBUTTONPRESSED_TITLE'] = 'se il pulsante %1 è premuto allora';
Blockly.Msg['IO_ONBUTTONPRESSED_TOOLTIP'] = 'Esegue le istruzioni se viene premuto il pulsante A, B o C.';
Blockly.Msg['IO_BUTTON_STATE_TITLE'] = 'stato del pulsante %1';
Blockly.Msg['IO_BUTTON_STATE_TOOLTIP'] = 'Restituisce lo stato del pulsante A, B o C (vero/falso).';
Blockly.Msg['IO_POTENTIOMETER_GET_VALUE_TITLE'] = 'valore del potenziometro';
Blockly.Msg['IO_POTENTIOMETER_GET_VALUE_TOOLTIP'] = 'Restituisce il valore del potenziometro (0 ~ 100).';

// Communication
Blockly.Msg['COMMUNICATION_IRRECEIVE_TITLE'] = '[IR] ricevi infrarosso';
Blockly.Msg['COMMUNICATION_IRRECEIVE_TOOLTIP'] = 'Restituisce la stringa ricevuta dal ricevitore IR. I dati inviati devono terminare con \\n. Per telecomandi NEC, usa la funzione receive_remote_code().';
Blockly.Msg['COMMUNICATION_IRRECEIVEREMOTECODE_TITLE'] = '[IR] ricevi infrarosso (NEC)';
Blockly.Msg['COMMUNICATION_IRRECEIVEREMOTECODE_TOOLTIP'] = 'Restituisce il codice dell\'ultimo segnale IR ricevuto come array. Il primo parametro è l\'indirizzo, il secondo è il contenuto.';
Blockly.Msg['COMMUNICATION_IRSEND_TITLE'] = '[IR] invia %1';
Blockly.Msg['COMMUNICATION_IRSEND_TOOLTIP'] = 'Invia una stringa tramite infrarosso.';
Blockly.Msg['COMMUNICATION_IRSTARTLEARNING_TITLE'] = '[IR] avvia apprendimento IR';
Blockly.Msg['COMMUNICATION_IRSTARTLEARNING_TOOLTIP'] = 'Avvia l\'apprendimento di un segnale IR. Compatibile solo con telecomandi NEC.';
Blockly.Msg['COMMUNICATION_IRSTOPLEARNING_TITLE'] = '[IR] ferma apprendimento IR';
Blockly.Msg['COMMUNICATION_IRSTOPLEARNING_TOOLTIP'] = 'Interrompe l\'apprendimento di un segnale IR.';
Blockly.Msg['COMMUNICATION_IRSAVELEARNEDRESULT_TITLE'] = '[IR] salva segnale appreso in indice %1';
Blockly.Msg['COMMUNICATION_IRSAVELEARNEDRESULT_TOOLTIP'] = 'Salva il segnale IR appreso nella memoria di Codey (indice da 0 a 15).';
Blockly.Msg['COMMUNICATION_IRSENDLEARNEDRESULT_TITLE'] = '[IR] invia segnale in indice %1';
Blockly.Msg['COMMUNICATION_IRSENDLEARNEDRESULT_TOOLTIP'] = 'Invia il segnale IR appreso dalla memoria di Codey.';
Blockly.Msg['COMMUNICATION_IRLEARN_TITLE'] = '[IR] apprendi per %1 s';
Blockly.Msg['COMMUNICATION_IRLEARN_TOOLTIP'] = 'Apprende un segnale IR per il tempo specificato (in secondi).';

// Sensors 
Blockly.Msg['SENSORS_GETROTATION_EULER_ANGLES_TITLE'] = '%1';
Blockly.Msg['SENSORS_GETROTATION_EULER_ANGLES_TOOLTIP'] = 'Restituisce il valore di rotazione sull\'asse selezionato (x, y, z).';
Blockly.Msg['SENSORS_PITCH'] = 'beccheggio';
Blockly.Msg['SENSORS_ROLL'] = 'rollio';
Blockly.Msg['SENSORS_YAW'] = 'imbardata';
Blockly.Msg['SENSORS_GETROTATION_TITLE'] = 'angolo sull\'asse %1';
Blockly.Msg['SENSORS_GETROTATION_TOOLTIP'] = 'Restituisce l\'angolo di rotazione di Codey sugli assi. Il senso antiorario è positivo.';
Blockly.Msg['SENSORS_RESETROTATION_TITLE'] = 'azzera angolo di rotazione sull\'asse %1';
Blockly.Msg['SENSORS_RESETROTATION_TOOLTIP'] = 'Azzera l\'angolo di rotazione di Codey sull\'asse selezionato.';
Blockly.Msg['SENSORS_ALL_AXIS'] = 'tutti gli assi';
Blockly.Msg['SENSORS_IS_SHAKED_TITLE'] = 'scosso?';
Blockly.Msg['SENSORS_IS_SHAKED_TOOLTIP'] = 'Restituisce vero se viene rilevata una scossa.';
Blockly.Msg['SENSORS_GET_SHAKE_STRENGTH_TITLE'] = 'intensità della scossa';
Blockly.Msg['SENSORS_GET_SHAKE_STRENGTH_TOOLTIP'] = 'Restituisce l\'intensità dell\'ultima scossa rilevata.';
Blockly.Msg['SENSORS_GETPOSITION_TITLE'] = '%1?';
Blockly.Msg['SENSORS_IS_TILTED_LEFT'] = 'inclinato a sinistra';
Blockly.Msg['SENSORS_IS_TILTED_RIGHT'] = 'inclinato a destra';
Blockly.Msg['SENSORS_IS_EARS_UP'] = 'orecchie in alto';
Blockly.Msg['SENSORS_IS_EARS_DOWN'] = 'orecchie in basso';
Blockly.Msg['SENSORS_IS_DISPLAY_UP'] = 'schermo in alto';
Blockly.Msg['SENSORS_IS_DISPLAY_DOWN'] = 'schermo in basso';
Blockly.Msg['SENSORS_IS_UPRIGHT'] = 'in verticale';
Blockly.Msg['SENSORS_GETPOSITION_TOOLTIP'] = 'Restituisce vero se il dispositivo si trova nella posizione indicata.';
Blockly.Msg['SENSORS_GETACCELERATION_TITLE'] = 'accelerazione su %1';
Blockly.Msg['SENSORS_GETACCELERATION_TOOLTIP'] = 'Restituisce il valore dell\'accelerazione sull\'asse selezionato o la forza totale.';
Blockly.Msg['SENSORS_GETGYROSCOPE_TITLE'] = 'giroscopio sull\'asse %1';
Blockly.Msg['SENSORS_GETGYROSCOPE_TOOLTIP'] = 'Restituisce il valore del giroscopio sull\'asse selezionato.';
Blockly.Msg['SENSORS_GET_LOUDNESS_TITLE'] = 'livello del suono';
Blockly.Msg['SENSORS_GET_LOUDNESS_TOOLTIP'] = 'Restituisce il livello del suono (0 ~ 100).';
Blockly.Msg['SENSORS_GET_LIGHT_TITLE'] = 'valore del sensore di luce';
Blockly.Msg['SENSORS_GET_LIGHT_TOOLTIP'] = 'Restituisce il valore del sensore di luce (0 ~ 100).';

// Acutuators 
Blockly.Msg['SPEAKER_PLAY_MELODY_TITLE'] = 'riproduci suono %1';
Blockly.Msg['SPEAKER_PLAY_MELODY_TOOLTIP'] = 'Riproduce una melodia predefinita.';
Blockly.Msg['SPEAKER_PLAY_MELODY_UNTIL_DONE_TITLE'] = 'riproduci suono %1 fino alla fine';
Blockly.Msg['SPEAKER_PLAY_MELODY_UNTIL_DONE_TOOLTIP'] = 'Riproduce una melodia predefinita e attende la fine.';
Blockly.Msg['SPEAKER_PLAY_NOTE_TITLE'] = 'riproduci nota %1';
Blockly.Msg['SPEAKER_PLAY_NOTE_TOOLTIP'] = 'Riproduce una nota musicale.';
Blockly.Msg['SPEAKER_PLAY_TONE_TITLE'] = 'riproduci tono %1 Hz';
Blockly.Msg['SPEAKER_PLAY_TONE_TOOLTIP'] = 'Riproduce un suono a una certa frequenza.';
Blockly.Msg['SPEAKER_REST_TITLE'] = 'pausa per %1 tempo';
Blockly.Msg['SPEAKER_REST_TOOLTIP'] = 'Inserisce una pausa nella musica.';
Blockly.Msg['SPEAKER_STOP_SOUNDS_TITLE'] = 'ferma tutti i suoni';
Blockly.Msg['SPEAKER_STOP_SOUNDS_TOOLTIP'] = 'Ferma tutti i suoni in corso.';
Blockly.Msg['SPEAKER_SET_VOLUME_TITLE'] = 'imposta volume a %1';
Blockly.Msg['SPEAKER_SET_VOLUME_TOOLTIP'] = 'Imposta il volume audio.';
Blockly.Msg['SPEAKER_GET_VOLUME_TITLE'] = 'ottieni volume';
Blockly.Msg['SPEAKER_GET_VOLUME_TOOLTIP'] = 'Restituisce il volume attuale.';
Blockly.Msg['SPEAKER_SET_TEMPO_TITLE'] = 'imposta tempo a %1';
Blockly.Msg['SPEAKER_SET_TEMPO_TOOLTIP'] = 'Imposta il tempo per i suoni.';
Blockly.Msg['SPEAKER_GET_TEMPO_TITLE'] = 'ottieni tempo';
Blockly.Msg['SPEAKER_GET_TEMPO_TOOLTIP'] = 'Restituisce il tempo attuale.';
Blockly.Msg['SPEAKER_PLAY_TONE_DURATION'] = 'per';
Blockly.Msg['SPEAKER_PLAY_NOTE_DURATION'] = Blockly.Msg['SPEAKER_PLAY_TONE_DURATION'];

// Robots
Blockly.Msg['ROBOTS_STOP_TITLE'] = '[Rocky] ferma i motori';
Blockly.Msg['ROBOTS_STOP_TOOLTIP'] = 'Ferma tutti i motori del robot Rocky.';
Blockly.Msg['ROBOTS_MOVE_TITLE'] = '[Rocky] %1 a velocità %2';
Blockly.Msg['ROBOTS_MOVE_TOOLTIP'] = 'Muove il robot Rocky nella direzione indicata alla velocità specificata (+/- 100).';
Blockly.Msg['ROBOTS_FORWARD'] = 'avanti';
Blockly.Msg['ROBOTS_BACKWARD'] = 'indietro';
Blockly.Msg['ROBOTS_LEFT'] = 'gira a sinistra';
Blockly.Msg['ROBOTS_RIGHT'] = 'gira a destra';
Blockly.Msg['ROBOTS_DRIVE_TITLE'] = '[Rocky] velocità motore sinistro %1 destro %2';
Blockly.Msg['ROBOTS_DRIVE_TOOLTIP'] = 'Imposta la velocità dei motori sinistro e destro del robot Rocky (+/- 100).';
Blockly.Msg['ROBOTS_TURN_BY_DEGREE_TITLE'] = '[Rocky] %1 di %2 °';
Blockly.Msg['ROBOTS_TURN_BY_DEGREE_TOOLTIP'] = 'Ruota il robot Rocky di un certo numero di gradi (+/- 360).';
Blockly.Msg['ROBOTS_SENSORS_GET_RGB_TITLE'] = '[Rocky] sensore colore livello di %1';
Blockly.Msg['ROBOTS_SENSORS_RED'] = 'rosso';
Blockly.Msg['ROBOTS_SENSORS_GREEN'] = 'verde';
Blockly.Msg['ROBOTS_SENSORS_BLUE'] = 'blu';
Blockly.Msg['ROBOTS_SENSORS_GET_RGB_TOOLTIP'] = 'Restituisce il valore del sensore colore IR per il colore selezionato (rosso, verde, blu).';
Blockly.Msg['ROBOTS_SENSORS_IS_COLOR_TITLE'] = '[Rocky] colore %1?';
Blockly.Msg['ROBOTS_SENSORS_IS_COLOR_TOOLTIP'] = 'Restituisce vero se il sensore colore IR rileva il colore selezionato (rosso, verde, blu, giallo, ciano, magenta, bianco, nero).';
Blockly.Msg['ROBOTS_SENSORS_YELLOW'] = 'giallo';
Blockly.Msg['ROBOTS_SENSORS_CYAN'] = 'ciano';
Blockly.Msg['ROBOTS_SENSORS_MAGENTA'] = 'magenta';
Blockly.Msg['ROBOTS_SENSORS_WHITE'] = 'bianco';
Blockly.Msg['ROBOTS_SENSORS_BLACK'] = 'nero';
Blockly.Msg['ROBOTS_SENSORS_GET_LIGHT_TITLE'] = '[Rocky] sensore luce livello di %1';
Blockly.Msg['ROBOTS_SENSORS_AMBIENT'] = 'luce ambientale';
Blockly.Msg['ROBOTS_SENSORS_REFLECTED'] = 'luce riflessa';
Blockly.Msg['ROBOTS_SENSORS_GREYNESS'] = 'livello di grigio';
Blockly.Msg['ROBOTS_SENSORS_GET_LIGHT_TOOLTIP'] = 'Restituisce il valore del sensore IR di luce per il tipo selezionato (ambientale, riflessa, livello di grigio).';
Blockly.Msg['ROBOTS_SENSORS_IS_OBSTACLE_AHEAD_TITLE'] = '[Rocky] ostacolo davanti?';
Blockly.Msg['ROBOTS_SENSORS_IS_OBSTACLE_AHEAD_TOOLTIP'] = 'Restituisce vero se un ostacolo è rilevato davanti al robot Rocky.';
Blockly.Msg['ROBOTS_SENSORS_SET_LED_COLOR_TITLE'] = '[Rocky] LED colore %1';
Blockly.Msg['ROBOTS_SENSORS_SET_LED_COLOR_TOOLTIP'] = 'Imposta il colore del LED del robot Rocky (rosso, verde, blu, giallo, ciano, magenta, bianco, nero).';
