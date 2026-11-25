/**
 * @fileoverview English messages for Matatalab. (EN)
 */

'use strict';

// IO - Time

// Actuators

// Sound

// Display

// Communication

// MatataCon

// Options

// Search keywords of the blocks: <X>_KEYWORDS completes the block whose tooltip is <X>_TOOLTIP (see ToolboxManager)

Blockly.Msg['IO_WAIT_TITLE'] = 'attendi %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Metti in pausa l\'esecuzione del codice.';
Blockly.Msg['IO_WAIT_SECOND'] = 'secondo(i)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisecondo(i)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsecondo(i)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'attendi fino a %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Interrompi l\'esecuzione del codice finché la condizione non è soddisfatta.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'avvia il cronometro';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Inizializza il cronometro a 0 (in secondi).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valore del cronometro in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Restituisce il valore del cronometro dall\'inizializzazione (in secondi o millisecondi).';
Blockly.Msg['ACTUATORS_MOVE_TITLE'] = '%1 %2 passi';
Blockly.Msg['ACTUATORS_MOVE_TOOLTIP'] = 'Sposta il robot MatataBot di un numero di passi (1 passo = 10 cm).';
Blockly.Msg['ACTUATORS_MOVE_CM_TITLE'] = 'sposta di %1 cm';
Blockly.Msg['ACTUATORS_MOVE_CM_TOOLTIP'] = 'Sposta il robot MatataBot di una distanza in cm. Un valore negativo lo fa andare indietro.';
Blockly.Msg['ACTUATORS_TURN_TITLE'] = 'gira %1 di %2 °';
Blockly.Msg['ACTUATORS_TURN_TOOLTIP'] = 'Fa ruotare il robot MatataBot sul posto.';
Blockly.Msg['ACTUATORS_SET_GEAR_TITLE'] = 'imposta %1 su marcia %2';
Blockly.Msg['ACTUATORS_SET_GEAR_TOOLTIP'] = 'Fa girare una o entrambe le ruote, dalla marcia -6 (indietro) a 6 (avanti). 0 ferma la ruota.';
Blockly.Msg['ACTUATORS_SET_SPEED_TITLE'] = 'imposta velocità ruote: sinistra %1 destra %2 (cm/s)';
Blockly.Msg['ACTUATORS_SET_SPEED_TOOLTIP'] = 'Imposta la velocità di entrambe le ruote, tra -16 e 16 cm/s. Un valore negativo fa girare la ruota all\'indietro.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'ferma %1';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Ferma una o entrambe le ruote.';
Blockly.Msg['ACTUATORS_DANCE_TITLE'] = 'esegui danza n°%1';
Blockly.Msg['ACTUATORS_DANCE_TOOLTIP'] = 'Il robot MatataBot esegue una danza, da 1 a 6.';
Blockly.Msg['ACTUATORS_ACTION_TITLE'] = 'esegui azione n°%1';
Blockly.Msg['ACTUATORS_ACTION_TOOLTIP'] = 'Il robot MatataBot esegue un\'azione, da 1 a 6.';
Blockly.Msg['SOUND_PLAY_NOTE_TITLE'] = 'suona nota %1 per %2 ms';
Blockly.Msg['SOUND_PLAY_NOTE_TOOLTIP'] = 'Suona una nota sul robot MatataBot per una durata in millisecondi.';
Blockly.Msg['SOUND_PLAY_MELODY_TITLE'] = 'suona melodia n°%1';
Blockly.Msg['SOUND_PLAY_MELODY_TOOLTIP'] = 'Suona una melodia del robot MatataBot, da 1 a 10.';
Blockly.Msg['SOUND_PLAY_MUSIC_TITLE'] = 'suona brano n°%1';
Blockly.Msg['SOUND_PLAY_MUSIC_TOOLTIP'] = 'Suona un brano del robot MatataBot, da 1 a 6.';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TITLE'] = 'illumina %1 in %2 con luminosità %3';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TOOLTIP'] = 'Illumina gli occhi del robot MatataBot con una luminosità da 0 a 6.';
Blockly.Msg['DISPLAY_SET_EYES_TITLE'] = 'illumina %1 con colore %2';
Blockly.Msg['DISPLAY_SET_EYES_TOOLTIP'] = 'Illumina gli occhi del robot MatataBot con un colore scelto.';
Blockly.Msg['DISPLAY_CLEAR_EYES_TITLE'] = 'spegni gli occhi';
Blockly.Msg['DISPLAY_CLEAR_EYES_TOOLTIP'] = 'Spegne gli occhi del robot MatataBot.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'scrivi sulla console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Scrive dati sulla porta seriale.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'con';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'nuova riga';
Blockly.Msg['MATATACON_IS_BUTTON_TITLE'] = 'pulsante %1 premuto';
Blockly.Msg['MATATACON_IS_BUTTON_TOOLTIP'] = 'Restituisce True se il pulsante del controller MatataCon è premuto.';
Blockly.Msg['MATATACON_IS_GESTURE_TITLE'] = 'movimento %1';
Blockly.Msg['MATATACON_IS_GESTURE_TOOLTIP'] = 'Restituisce True se questo movimento del controller MatataCon è rilevato.';
Blockly.Msg['MATATACON_IS_COLOR_TITLE'] = 'colore %1 rilevato';
Blockly.Msg['MATATACON_IS_COLOR_TOOLTIP'] = 'Restituisce True se il sensore di colore del controller MatataCon rileva questo colore.';
Blockly.Msg['MATATACON_IS_SOUND_TITLE'] = 'suono rilevato';
Blockly.Msg['MATATACON_IS_SOUND_TOOLTIP'] = 'Restituisce True se il controller MatataCon rileva un suono.';
Blockly.Msg['MATATACON_IS_OBSTACLE_TITLE'] = 'ostacolo rilevato';
Blockly.Msg['MATATACON_IS_OBSTACLE_TOOLTIP'] = 'Restituisce True se il controller MatataCon rileva un ostacolo.';
Blockly.Msg['MATATACON_IS_LIGHT_TITLE'] = '%1 rilevato';
Blockly.Msg['MATATACON_IS_LIGHT_TOOLTIP'] = 'Restituisce True se il controller MatataCon rileva la luce o il buio.';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TITLE'] = 'luminosità';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TOOLTIP'] = 'Restituisce la luminosità misurata dal controller MatataCon, da 0 a 255.';
Blockly.Msg['MATATACON_GET_COLOR_TITLE'] = 'valore %1 del sensore di colore';
Blockly.Msg['MATATACON_GET_COLOR_TOOLTIP'] = 'Restituisce il valore rosso, verde o blu misurato dal controller MatataCon, da 0 a 255.';
Blockly.Msg['MATATACON_GET_ANGLE_TITLE'] = '%1 angolo (°)';
Blockly.Msg['MATATACON_GET_ANGLE_TOOLTIP'] = 'Restituisce l\'angolo del controller MatataCon, in gradi.';
Blockly.Msg['MATATACON_GET_ACCELERATION_TITLE'] = 'accelerazione sull\'asse %1';
Blockly.Msg['MATATACON_GET_ACCELERATION_TOOLTIP'] = 'Restituisce l\'accelerazione del controller MatataCon su un asse.';
Blockly.Msg['MATATACON_GET_SHAKING_TITLE'] = 'intensità di scuotimento';
Blockly.Msg['MATATACON_GET_SHAKING_TOOLTIP'] = 'Restituisce l\'intensità di scuotimento del controller MatataCon.';
Blockly.Msg['MATATACON_SET_RING_COLOR_TITLE'] = '[Ring] illumina LED n°%1 in %2 con luminosità %3';
Blockly.Msg['MATATACON_SET_RING_COLOR_TOOLTIP'] = 'Illumina un LED dell\'anello del controller MatataCon, da 1 a 12, con luminosità da 0 a 6. Il numero 0 illumina tutti i LED.';
Blockly.Msg['MATATACON_SET_RING_TITLE'] = '[Ring] illumina LED n°%1 con colore %2';
Blockly.Msg['MATATACON_SET_RING_TOOLTIP'] = 'Illumina un LED dell\'anello del controller MatataCon, da 1 a 12, con un colore scelto. Il numero 0 illumina tutti i LED.';
Blockly.Msg['MATATACON_SET_RING_LEDS_TITLE'] = '[Ring] illumina i LED %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12';
Blockly.Msg['MATATACON_SET_RING_LEDS_TOOLTIP'] = 'Sceglie il colore dei 12 LED dell\'anello del controller MatataCon, dal LED n°1 al LED n°12.';
Blockly.Msg['MATATACON_RING_ANIMATION_TITLE'] = '[Ring] avvia animazione %1';
Blockly.Msg['MATATACON_RING_ANIMATION_TOOLTIP'] = 'Avvia un\'animazione luminosa sull\'anello del controller MatataCon.';
Blockly.Msg['MATATACON_CLEAR_RING_TITLE'] = '[Ring] spegni tutti i LED';
Blockly.Msg['MATATACON_CLEAR_RING_TOOLTIP'] = 'Spegne l\'anello del controller MatataCon.';
Blockly.Msg['MATATACON_SEND_MESSAGE_TITLE'] = 'invia messaggio n°%1';
Blockly.Msg['MATATACON_SEND_MESSAGE_TOOLTIP'] = 'Invia un messaggio, da 1 a 6, agli altri controller MatataCon.';
Blockly.Msg['MATATACON_IS_MESSAGE_TITLE'] = 'messaggio n°%1 ricevuto';
Blockly.Msg['MATATACON_IS_MESSAGE_TOOLTIP'] = 'Restituisce vero se il controller MatataCon ha ricevuto questo messaggio, da 1 a 6.';
Blockly.Msg['MATATACON_GET_MESSAGE_TITLE'] = 'messaggio ricevuto';
Blockly.Msg['MATATACON_GET_MESSAGE_TOOLTIP'] = 'Restituisce il numero del messaggio ricevuto dal controller MatataCon, o 0 se non ci sono messaggi.';
Blockly.Msg['MATATALAB_DIR_FORWARD'] = 'avanti';
Blockly.Msg['MATATALAB_DIR_BACKWARD'] = 'indietro';
Blockly.Msg['MATATALAB_DIR_LEFT'] = 'sinistra';
Blockly.Msg['MATATALAB_DIR_RIGHT'] = 'destra';
Blockly.Msg['MATATALAB_WHEEL_BOTH'] = 'entrambe le ruote';
Blockly.Msg['MATATALAB_WHEEL_LEFT'] = 'ruota sinistra';
Blockly.Msg['MATATALAB_WHEEL_RIGHT'] = 'ruota destra';
Blockly.Msg['MATATALAB_EYE_BOTH'] = 'entrambi gli occhi';
Blockly.Msg['MATATALAB_EYE_LEFT'] = 'occhio sinistro';
Blockly.Msg['MATATALAB_EYE_RIGHT'] = 'occhio destro';
Blockly.Msg['MATATALAB_COLOR_WHITE'] = 'bianco';
Blockly.Msg['MATATALAB_COLOR_RED'] = 'rosso';
Blockly.Msg['MATATALAB_COLOR_YELLOW'] = 'giallo';
Blockly.Msg['MATATALAB_COLOR_GREEN'] = 'verde';
Blockly.Msg['MATATALAB_COLOR_BLUE'] = 'blu';
Blockly.Msg['MATATALAB_COLOR_PURPLE'] = 'viola';
Blockly.Msg['MATATALAB_COLOR_BLACK'] = 'nero';
Blockly.Msg['MATATALAB_ANIMATION_SPOONDRIFT'] = 'onda';
Blockly.Msg['MATATALAB_ANIMATION_METEOR'] = 'meteora';
Blockly.Msg['MATATALAB_ANIMATION_RAINBOW'] = 'arcobaleno';
Blockly.Msg['MATATALAB_ANIMATION_FIREFLY'] = 'lucciola';
Blockly.Msg['MATATALAB_ANIMATION_COLORWIPE'] = 'spazzata di colore';
Blockly.Msg['MATATALAB_ANIMATION_BREATHE'] = 'respiro';
Blockly.Msg['MATATALAB_BUTTON_PLAY'] = 'riproduci';
Blockly.Msg['MATATALAB_BUTTON_DELETE'] = 'elimina';
Blockly.Msg['MATATALAB_BUTTON_FORWARD'] = 'avanti';
Blockly.Msg['MATATALAB_BUTTON_BACKWARD'] = 'indietro';
Blockly.Msg['MATATALAB_BUTTON_LEFT'] = 'sinistra';
Blockly.Msg['MATATALAB_BUTTON_RIGHT'] = 'destra';
Blockly.Msg['MATATALAB_BUTTON_MUSIC'] = 'musica';
Blockly.Msg['MATATALAB_GESTURE_SHAKE'] = 'scosso';
Blockly.Msg['MATATALAB_GESTURE_TILT_LEFT'] = 'inclinato a sinistra';
Blockly.Msg['MATATALAB_GESTURE_TILT_RIGHT'] = 'inclinato a destra';
Blockly.Msg['MATATALAB_GESTURE_TILT_FORWARD'] = 'inclinato in avanti';
Blockly.Msg['MATATALAB_GESTURE_TILT_BACKWARD'] = 'inclinato indietro';
Blockly.Msg['MATATALAB_GESTURE_FALL'] = 'in caduta libera';
Blockly.Msg['MATATALAB_GESTURE_FACE_UP'] = 'rivolto verso l\'alto';
Blockly.Msg['MATATALAB_GESTURE_FACE_DOWN'] = 'rivolto verso il basso';
Blockly.Msg['MATATALAB_LIGHT_BRIGHT'] = 'luce';
Blockly.Msg['MATATALAB_LIGHT_DARK'] = 'buio';
Blockly.Msg['MATATALAB_ANGLE_PITCH'] = 'beccheggio';
Blockly.Msg['MATATALAB_ANGLE_ROLL'] = 'rollio';
Blockly.Msg['MATATALAB_ANGLE_YAW'] = 'imbardata';
Blockly.Msg['IO_WAIT_KEYWORDS'] = 'ritardo, attesa';
Blockly.Msg['IO_WAIT_UNTIL_KEYWORDS'] = 'attendi, pausa';
Blockly.Msg['IO_INITCHRONOMETER_KEYWORDS'] = 'cronometro, avvia, azzera';
Blockly.Msg['IO_GETCHRONOMETER_KEYWORDS'] = 'cronometro, trascorso';
Blockly.Msg['ACTUATORS_MOVE_KEYWORDS'] = 'avanti, indietro, muovi';
Blockly.Msg['ACTUATORS_MOVE_CM_KEYWORDS'] = 'avanti, indietro, distanza';
Blockly.Msg['ACTUATORS_TURN_KEYWORDS'] = 'ruota, rotazione';
Blockly.Msg['ACTUATORS_SET_GEAR_KEYWORDS'] = 'motore, ruota, velocità';
Blockly.Msg['ACTUATORS_SET_SPEED_KEYWORDS'] = 'motore, ruota, velocità';
Blockly.Msg['ACTUATORS_STOP_KEYWORDS'] = 'motore, ruota';
Blockly.Msg['ACTUATORS_DANCE_KEYWORDS'] = 'danza';
Blockly.Msg['ACTUATORS_ACTION_KEYWORDS'] = 'movimento, animazione';
Blockly.Msg['SOUND_PLAY_NOTE_KEYWORDS'] = 'musica, suono, tono';
Blockly.Msg['SOUND_PLAY_MELODY_KEYWORDS'] = 'musica, suono';
Blockly.Msg['SOUND_PLAY_MUSIC_KEYWORDS'] = 'musica, suono';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_KEYWORDS'] = 'LED, occhi, colore';
Blockly.Msg['DISPLAY_SET_EYES_KEYWORDS'] = 'LED, occhi, RGB';
Blockly.Msg['DISPLAY_CLEAR_EYES_KEYWORDS'] = 'LED, spegni';
Blockly.Msg['MATATACON_SET_RING_COLOR_KEYWORDS'] = 'LED, anello, colore';
Blockly.Msg['MATATACON_SET_RING_KEYWORDS'] = 'LED, anello, RGB';
Blockly.Msg['MATATACON_SET_RING_LEDS_KEYWORDS'] = 'LED, anello, colori';
Blockly.Msg['MATATACON_RING_ANIMATION_KEYWORDS'] = 'LED, anello, effetto';
Blockly.Msg['MATATACON_CLEAR_RING_KEYWORDS'] = 'LED, anello, spegni';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_KEYWORDS'] = 'console, trasmetti, invia';
Blockly.Msg['MATATACON_SEND_MESSAGE_KEYWORDS'] = 'invia, radio';
Blockly.Msg['MATATACON_IS_MESSAGE_KEYWORDS'] = 'ricevi, radio';
Blockly.Msg['MATATACON_GET_MESSAGE_KEYWORDS'] = 'ricevere, radio';
Blockly.Msg['MATATACON_IS_BUTTON_KEYWORDS'] = 'pulsante, tasto';
Blockly.Msg['MATATACON_IS_GESTURE_KEYWORDS'] = 'movimento, gesto, accelerometro';
Blockly.Msg['MATATACON_IS_COLOR_KEYWORDS'] = 'sensore, colore';
Blockly.Msg['MATATACON_IS_SOUND_KEYWORDS'] = 'microfono, rumore';
Blockly.Msg['MATATACON_IS_OBSTACLE_KEYWORDS'] = 'infrarosso, distanza';
Blockly.Msg['MATATACON_IS_LIGHT_KEYWORDS'] = 'luminosità, luce';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_KEYWORDS'] = 'luce, sensore';
Blockly.Msg['MATATACON_GET_COLOR_KEYWORDS'] = 'RGB, colore';
Blockly.Msg['MATATACON_GET_ANGLE_KEYWORDS'] = 'inclinazione, giroscopio';
Blockly.Msg['MATATACON_GET_ACCELERATION_KEYWORDS'] = 'accelerometro';
Blockly.Msg['MATATACON_GET_SHAKING_KEYWORDS'] = 'scuotimento, accelerometro';
