/**
 * @fileoverview English messages for Winky. (EN)
 */
'use strict';

// Rete
Blockly.Msg['NETWORK_CONNECT_TITLE'] = '[Winky] connetti %1';
Blockly.Msg['NETWORK_CONNECT_TOOLTIP'] = 'Permette di connettersi al robot Winky specificando il suo ID.';

// Display
Blockly.Msg['DISPLAY_PATTERN_TITLE'] = '[Winky] visualizza su %1';
Blockly.Msg['DISPLAY_PATTERN_TOOLTIP'] = 'Permette di personalizzare la visualizzazione della matrice LED sull\'occhio sinistro del robot Winky.';
Blockly.Msg['DISPLAY_PRESET_EACH_EYE_TITLE'] = '[Winky] occhio sinistro %1 occhio destro %2';
Blockly.Msg['DISPLAY_PRESET_TITLE'] = '[Winky] sguardo %1 su %2';
Blockly.Msg['DISPLAY_PRESET_TOOLTIP'] = 'Permette di visualizzare un modello sulle matrici LED del robot Winky.';
Blockly.Msg['DISPLAY_PRESET_AMUSED'] = 'divertito';
Blockly.Msg['DISPLAY_PRESET_ANGRY'] = 'arrabbiato';
Blockly.Msg['DISPLAY_PRESET_BIG'] = 'grande';
Blockly.Msg['DISPLAY_PRESET_BORED'] = 'annoiato';
Blockly.Msg['DISPLAY_PRESET_SAD'] = 'triste';
Blockly.Msg['DISPLAY_PRESET_HAPPY'] = 'felice';
Blockly.Msg['DISPLAY_PRESET_TIRED'] = 'stanco';
Blockly.Msg['DISPLAY_PRESET_SLEEP'] = 'addormentato';
Blockly.Msg['DISPLAY_PRESET_INLOVE'] = 'innamorato';
Blockly.Msg['DISPLAY_PRESET_QUESTION'] = 'interrogativo';
Blockly.Msg['DISPLAY_PRESET_HOT'] = 'caldo';
Blockly.Msg['DISPLAY_PRESET_COLD'] = 'freddo';
Blockly.Msg['DISPLAY_PRESET_BOTH'] = 'entrambi gli occhi';
Blockly.Msg['DISPLAY_PRESET_LEFT'] = 'occhio sinistro';
Blockly.Msg['DISPLAY_PRESET_RIGHT'] = 'occhio destro';
Blockly.Msg['DISPLAY_PRESET_RANDOM'] = 'scelta casuale';
Blockly.Msg['DISPLAY_PRESET_HORIZONTAL'] = "entrambi gli occhi (trasformazione orizzontale)";
Blockly.Msg['DISPLAY_PRESET_VERTICAL'] = "entrambi gli occhi (trasformazione verticale)";
Blockly.Msg['DISPLAY_PRESET_ROTATION_90'] = "entrambi gli occhi (rotazione di 90°)";
Blockly.Msg['DISPLAY_PRESET_ROTATION_180'] = "entrambi gli occhi (rotazione di 180°)";
Blockly.Msg['DISPLAY_PRESET_ROTATION_270'] = "entrambi gli occhi (rotazione di 270°)";
Blockly.Msg['DISPLAY_NUMBER_TITLE'] = '[Winky] visualizza %1';
Blockly.Msg['DISPLAY_NUMBER_TOOLTIP'] = 'Permette di visualizzare un numero tra -999 e 9999 sulle matrici LED del robot Winky.';
Blockly.Msg['DISPLAY_TEXT_TITLE'] = '[Winky] visualizza %1 direzione %2 transizione %3';
Blockly.Msg['DISPLAY_TEXT_TOOLTIP'] = 'Permette di visualizzare un testo (fino a 16 caratteri) sulle matrici LED del robot Winky.';
Blockly.Msg['DISPLAY_TEXT_RIGHT'] = "destra";
Blockly.Msg['DISPLAY_TEXT_LEFT'] = "sinistra";
Blockly.Msg['DISPLAY_TEXT_REPLACEMENT_1S'] = "sostituzione (1s)";
Blockly.Msg['DISPLAY_TEXT_REPLACEMENT_800MS'] = "sostituzione (800ms)";
Blockly.Msg['DISPLAY_TEXT_REPLACEMENT_500MS'] = "sostituzione (500ms)";
Blockly.Msg['DISPLAY_TEXT_REPLACEMENT_200MS'] = "sostituzione (200ms)";
Blockly.Msg['DISPLAY_TEXT_SCROLL_500MS'] = "scorrimento (500ms)";
Blockly.Msg['DISPLAY_TEXT_SCROLL_400MS'] = "scorrimento (400ms)";
Blockly.Msg['DISPLAY_TEXT_SCROLL_300MS'] = "scorrimento (300ms)";
Blockly.Msg['DISPLAY_TEXT_SCROLL_200MS'] = "scorrimento (200ms)";

// Suoni
Blockly.Msg['SOUNDS_SET_VOLUME_TITLE'] = "[Winky] volume %1 %";
Blockly.Msg['SOUNDS_SET_VOLUME_TOOLTIP'] = "Permette di regolare il volume del robot Winky.";
Blockly.Msg['SOUNDS_PLAY_SOUND_TITLE'] = "[Winky] riproduci un suono %1";
Blockly.Msg['SOUNDS_PLAY_SOUND_TOOLTIP'] = "Permette di riprodurre un suono pre-registrato nel robot Winky.";
Blockly.Msg['SOUNDS_PLAY_SOUND_AMUSED'] = 'divertito';
Blockly.Msg['SOUNDS_PLAY_SOUND_ANGRY'] = 'arrabbiato';
Blockly.Msg['SOUNDS_PLAY_SOUND_BORED'] = 'annoiato';
Blockly.Msg['SOUNDS_PLAY_SOUND_SAD'] = 'triste';
Blockly.Msg['SOUNDS_PLAY_SOUND_HAPPY'] = 'felice';
Blockly.Msg['SOUNDS_PLAY_SOUND_TIRED'] = 'stanco';
Blockly.Msg['SOUNDS_PLAY_SOUND_SLEEP'] = 'addormentato';
Blockly.Msg['SOUNDS_PLAY_SOUND_INLOVE'] = 'innamorato';
Blockly.Msg['SOUNDS_PLAY_SOUND_QUESTION'] = 'interrogativo';

// Sensori
Blockly.Msg['SENSORS_GET_GYRO_DIRECTION_TITLE'] = "[Winky] direzione sull'asse %1";
Blockly.Msg['SENSORS_GET_GYRO_DIRECTION_TOOLTIP'] = "Restituisce la direzione secondo l'asse x, y o z del robot Winky.";
Blockly.Msg['SENSORS_GET_GYRO_ANGLE_TITLE'] = "[Winky] angolo sull'asse %1";
Blockly.Msg['SENSORS_GET_GYRO_ANGLE_TOOLTIP'] = "Restituisce l'angolo secondo l'asse x o y del robot Winky.";
Blockly.Msg['SENSORS_GET_GYRO_X'] = 'x';
Blockly.Msg['SENSORS_GET_GYRO_Y'] = 'y';
Blockly.Msg['SENSORS_GET_GYRO_Z'] = 'z';
Blockly.Msg['SENSORS_GET_PROXIMITY_DETECTION_TITLE'] = "[Winky] rilevamento ostacoli %1";
Blockly.Msg['SENSORS_GET_PROXIMITY_DETECTION_TOOLTIP'] = "Restituisce 2 o 3 se Winky rileva qualcosa di vicino o lontano, e 0 se non rileva nulla.";
Blockly.Msg['SENSORS_GET_PROXIMITY_DETECTION_NEAR'] = "vicino";
Blockly.Msg['SENSORS_GET_PROXIMITY_DETECTION_FAR'] = "lontano";
Blockly.Msg['SENSORS_GET_PROXIMITY_DETECTION_NOTHING'] = "niente";
Blockly.Msg['SENSORS_GET_GESTURE_DETECTION_TITLE'] = "[Winky] rilevamento movimento %1";
Blockly.Msg['SENSORS_GET_GESTURE_DETECTION_TOOLTIP'] = "Restituisce 1 o 2 se viene rilevato un movimento a sinistra o a destra, e 0 se non viene rilevato alcun movimento.";
Blockly.Msg['SENSORS_GET_GESTURE_DETECTION_RIGHT'] = "a destra";
Blockly.Msg['SENSORS_GET_GESTURE_DETECTION_LEFT'] = "a sinistra";
Blockly.Msg['SENSORS_GET_GESTURE_DETECTION_NONE'] = "nessuno";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_TITLE'] = "[Winky] pulsante %1 %2";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_TOOLTIP'] = "Restituisce lo stato di un pulsante sul robot Winky.";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_BLUE'] = "blu";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_PURPLE'] = "viola";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_RED'] = "rosso";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_YELLOW'] = "giallo";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_STATE'] = "stato";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_ONPRESS'] = "è premuto";
Blockly.Msg['SENSORS_GET_TOUCH_BTN_ONRELEASE'] = "è rilasciato";
Blockly.Msg['DISPLAY_CLEAR_EYES_TITLE'] = "[Winky] spegnere i LED degli occhi";
Blockly.Msg['DISPLAY_CLEAR_EYES_TOOLTIP'] = "Spegni i LED degli occhi del robot Winky.";

// Attuatori
Blockly.Msg['ACTUATORS_SET_NECK_POSITION_TITLE'] = '[Winky] ruota testa a %1 °';
Blockly.Msg['ACTUATORS_SET_NECK_POSITION_TOOLTIP'] = 'Permette di orientare la testa del robot Winky in un intervallo da 0° a 360°.';
Blockly.Msg['ACTUATORS_SET_NECK_ROTATE_TITLE'] = '[Winky] ruota testa di %1 ° velocità %2';
Blockly.Msg['ACTUATORS_SET_NECK_ROTATE_TOOLTIP'] = 'Permette di ruotare la testa del robot Winky di 0° a 360° a una certa velocità.';
Blockly.Msg['ACTUATORS_SET_NECK_ROTATE_SLOW'] = 'lento';
Blockly.Msg['ACTUATORS_SET_NECK_ROTATE_NORMAL'] = 'medio';
Blockly.Msg['ACTUATORS_SET_NECK_ROTATE_HIGHT'] = 'veloce';
Blockly.Msg['ACTUATORS_SET_NECK_ROTATE_RANDOM'] = 'casuale';
Blockly.Msg['ACTUATORS_SET_EARS_POSITION_TITLE'] = '[Winky] ruota %1 a %2 °';
Blockly.Msg['ACTUATORS_SET_EARS_POSITION_TOOLTIP'] = 'Permette di ruotare le orecchie del robot Winky (sinistra, destra, entrambe contemporaneamente o casualmente).';
Blockly.Msg['ACTUATORS_SET_EARS_POSITION_LEFT'] = 'orecchio sinistro';
Blockly.Msg['ACTUATORS_SET_EARS_POSITION_RIGHT'] = 'orecchio destro';
Blockly.Msg['ACTUATORS_SET_EARS_POSITION_BOTH'] = 'entrambe le orecchie';
Blockly.Msg['ACTUATORS_SET_EARS_POSITION_RANDOM'] = 'orecchie casualmente';
Blockly.Msg['ACTUATORS_SET_EARS_REAR_TITLE'] = '[Winky] impostare %1 in posizione posteriore';
Blockly.Msg['ACTUATORS_SET_EARS_REAR_TOOLTIP'] = 'Imposta le orecchie del robot Winky in posizione posteriore.';
Blockly.Msg['ACTUATORS_SET_EARS_DOWN_TITLE'] = '[Winky] impostare %1 in posizione bassa';
Blockly.Msg['ACTUATORS_SET_EARS_DOWN_TOOLTIP'] = 'Imposta le orecchie del robot Winky in posizione bassa.';
Blockly.Msg['ACTUATORS_SET_EARS_STANDING_TITLE'] = '[Winky] impostare %1 in posizione eretta';
Blockly.Msg['ACTUATORS_SET_EARS_STANDING_TOOLTIP'] = 'Imposta le orecchie del robot Winky in posizione eretta.';

// Comunicazione
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'scrivi in console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Permette di scrivere dati nella console.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'con';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'interruzioni di linea';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'traccia il grafico';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Questo blocco permette di scrivere dati numerici da visualizzare nel tracciato. Può essere utilizzato con uno o più blocchi nel formato "Nome" e "Dati". Per visualizzare i grafici, clicca sull\'icona "Modalità Grafica" nella console.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Dati';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Nome %1 Valore %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Questo blocco va utilizzato con il blocco "Traccia il grafico". Deve contenere il nome del valore da visualizzare (testo) e il valore stesso (numero).';

// Input/Output
Blockly.Msg['IO_WAIT_TITLE'] = 'espera %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Detener la ejecución del código (duración en segundos o milisegundos)';
Blockly.Msg['IO_WAIT_SECOND'] = 'segundo(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milisegundo(ms)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsegundo(µs)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'espera hasta %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Detener la ejecución del código hasta que se cumpla la condición';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'inicializar el cronómetro';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Permite inicializar el cronómetro (en segundos)';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'Obtener cronómetro en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Devuelve el valor del cronómetro desde la inicialización en segundos o milisegundos';