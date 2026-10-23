/**
 * @fileoverview English messages for Eliobot. (EN)
 */
'use strict';

// Display - Buint-in LED
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_TITLE"] = "cambia il colore del LED integrato %1";
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP"] = "Permette di accendere il LED RGB integrato del robot Eliobot.";
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_OFF_TITLE"] = "spegnere il LED integrato";
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_OFF_TOOLTIP"] = "Permette di spegnere il LED RGB integrato del robot Eliobot.";
// Display - Eyes
Blockly.Msg['DISPLAY_EYES_COLOR_TITLE'] = 'cambia il colore %1 in %2';
Blockly.Msg['DISPLAY_EYES_COLOR_TOOLTIP'] = 'Permette di cambiare il colore degli occhi del robot Eliobot.';
Blockly.Msg['DISPLAY_EYES_COLOR_LEFT'] = 'dell\'occhio sinistro';
Blockly.Msg['DISPLAY_EYES_COLOR_RIGHT'] = 'dell\'occhio destro';
Blockly.Msg['DISPLAY_EYES_COLOR_BOTH'] = 'di entrambi gli occhi';
Blockly.Msg['DISPLAY_EYES_EMOTION_TITLE'] = 'mostra l\'emozione %1 in %2';
Blockly.Msg['DISPLAY_EYES_EMOTION_TOOLTIP'] = 'Permette di mostrare un\'emozione predefinita negli occhi del robot Eliobot.';
Blockly.Msg['DISPLAY_EYES_EMOTION_TIRED'] = 'fatigué';
Blockly.Msg['DISPLAY_EYES_EMOTION_HAPPY'] = 'heureux';
Blockly.Msg['DISPLAY_EYES_EMOTION_SAD'] = 'triste';
Blockly.Msg['DISPLAY_EYES_EMOTION_ANGRY'] = 'en colère';
Blockly.Msg['DISPLAY_EYES_EMOTION_CONFUSED'] = 'confus';
Blockly.Msg['DISPLAY_EYES_EMOTION_SURPRISED'] = 'surpris';
Blockly.Msg['DISPLAY_EYES_EMOTION_SLEEPY'] = 'fatigué';
Blockly.Msg['DISPLAY_EYES_EMOTION_NEUTRAL'] = 'neutre';
Blockly.Msg['DISPLAY_EYES_EMOTION_THRILLED'] = 'excité';
Blockly.Msg['DISPLAY_EYES_EMOTION_DIZZY'] = 'étourdi';
Blockly.Msg['DISPLAY_EYES_EMOTION_MUSIC'] = 'musique';
Blockly.Msg['DISPLAY_EYES_EMOTION_LOVE'] = 'amour';
Blockly.Msg['DISPLAY_EYES_EMOTION_KO'] = 'KO';
Blockly.Msg['DISPLAY_EYES_EMOTION_AMAZED'] = 'étonné';
Blockly.Msg['DISPLAY_EYES_EMOTION_LEFT_ARROW'] = 'freccia sinistra';
Blockly.Msg['DISPLAY_EYES_EMOTION_RIGHT_ARROW'] = 'freccia destra';
Blockly.Msg['DISPLAY_EYES_EMOTION_DOWN_ARROW'] = 'freccia in basso';
Blockly.Msg['DISPLAY_EYES_EMOTION_UP_ARROW'] = 'freccia in alto';
Blockly.Msg['DISPLAY_EYES_MATRIX_UNICOLOR_TITLE'] = 'visualizza sulla matrice degli occhi';
Blockly.Msg['DISPLAY_EYES_MATRIX_UNICOLOR_TOOLTIP'] = 'Permette di visualizzare un\'immagine personalizzata sugli occhi del robot Eliobot.';
Blockly.Msg['DISPLAY_RIGHT_EYE'] = 'occhio destro';
Blockly.Msg['DISPLAY_LEFT_EYE'] = 'occhio sinistro';
Blockly.Msg['DISPLAY_EYES_MATRIX_TITLE'] = "Visualizza sulla matrice degli occhi (tavolozza)";
Blockly.Msg['DISPLAY_EYES_MATRIX_TOOLTIP'] = 'Visualizza un\'immagine personalizzata sugli occhi di Eliobot. Ogni pixel della matrice può essere assegnato a un colore diverso.';

// Input/Output - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'attendre %1 %2';
Blockly.Msg["IO_WAIT_TOOLTIP"] = "Sospende l'esecuzione del codice (durata in secondi o millisecondi).";
Blockly.Msg['IO_WAIT_SECOND'] = 'seconde(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milliseconde(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microseconde(s)';
Blockly.Msg["IO_WAIT_UNTIL_TITLE"] = "attendi fino a %1";
Blockly.Msg["IO_WAIT_UNTIL_TOOLTIP"] = "Sospende l'esecuzione del codice finché la condizione non è soddisfatta.";
Blockly.Msg["IO_INITCHRONOMETER_TITLE"] = "Inizializza il cronometro";
Blockly.Msg["IO_INITCHRONOMETER_TOOLTIP"] = "Permette di inizializzare il cronometro (in secondi).";
Blockly.Msg["IO_GETCHRONOMETER_TITLE"] = "ottieni il cronometro in %1";
Blockly.Msg["IO_GETCHRONOMETER_TOOLTIP"] = "Restituisce il valore del cronometro dall'inizializzazione in secondi o millisecondi.";

// Communication - Serial connection
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TITLE"] = "scrivi sulla porta seriale %1";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TOOLTIP"] = "Scrive una stringa sulla porta seriale.";
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'avec';
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_NEWLINES"] = "a capo";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TITLE"] = "scrivi nel grafico";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TOOLTIP"] = "Questo blocco permette di scrivere dati (digitali) che saranno visibili nel plotter. Può essere usato con uno o più blocchi nei formati \"Nome\" e \"Dati\". Clicca sull'icona 'Modalità grafica' per visualizzare i grafici.";
Blockly.Msg['COMMUNICATION_DATA'] = 'Donnée';
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TITLE"] = "Nome %1 Dati %2";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TOOLTIP"] = "Questo blocco deve essere usato nel blocco \"Scrivi nel grafico\". Deve contenere il nome del valore (testo) da visualizzare e il valore stesso.";
// Communication - IR remote
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_TITLE'] = 'leggi il segnale sul sensore %1';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_TOOLTIP'] = 'Legge il comando inviato dal telecomando a infrarossi di Eliobot. Questo blocco restituisce una stringa corrispondente al comando ricevuto (avanti, indietro, sinistra, destra, centro).';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_FORWARD'] = 'avant';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_BACKWARD'] = 'arrière';
Blockly.Msg['COMMUNICATION_IR_REMOTE_TITLE'] = 'se il comando %1 viene ricevuto dal telecomando a infrarossi allora';
Blockly.Msg['COMMUNICATION_IR_REMOTE_TOOLTIP'] = 'Legge il comando inviato dal telecomando a infrarossi di Eliobot. Questo blocco restituisce una stringa corrispondente al comando ricevuto (avanti, indietro, sinistra, destra, centro).';
Blockly.Msg['COMMUNICATION_IR_REMOTE_BOOLEAN_TITLE'] = 'il telecomando a infrarossi ha ricevuto il comando %1';
Blockly.Msg['COMMUNICATION_IR_REMOTE_BOOLEAN_TOOLTIP'] = 'Verifica se è stato ricevuto un comando specifico dal telecomando a infrarossi di Eliobot. Questo blocco restituisce un booleano: true se il comando specificato è stato ricevuto, false altrimenti.';
Blockly.Msg['COMMUNICATION_IR_REMOTE_UP'] = 'haut';
Blockly.Msg['COMMUNICATION_IR_REMOTE_DOWN'] = 'bas';
Blockly.Msg['COMMUNICATION_IR_REMOTE_LEFT'] = 'gauche';
Blockly.Msg['COMMUNICATION_IR_REMOTE_RIGHT'] = 'droite';
Blockly.Msg['COMMUNICATION_IR_REMOTE_OK'] = 'ok';
Blockly.Msg['COMMUNICATION_IR_REMOTE_1'] = '1';
Blockly.Msg['COMMUNICATION_IR_REMOTE_2'] = '2';
Blockly.Msg['COMMUNICATION_IR_REMOTE_3'] = '3';
Blockly.Msg['COMMUNICATION_IR_REMOTE_4'] = '4';
Blockly.Msg['COMMUNICATION_IR_REMOTE_5'] = '5';
Blockly.Msg['COMMUNICATION_IR_REMOTE_6'] = '6';
Blockly.Msg['COMMUNICATION_IR_REMOTE_7'] = '7';
Blockly.Msg['COMMUNICATION_IR_REMOTE_8'] = '8';
Blockly.Msg['COMMUNICATION_IR_REMOTE_9'] = '9';
Blockly.Msg['COMMUNICATION_IR_REMOTE_0'] = '0';
Blockly.Msg['COMMUNICATION_IR_REMOTE_HT'] = '#';
Blockly.Msg['COMMUNICATION_IR_REMOTE_ST'] = '*';

// Sensors
Blockly.Msg['SENSORS_READ_OBSTACLE_TITLE'] = 'c\'è un ostacolo %1';
Blockly.Msg['SENSORS_READ_OBSTACLE_TOOLTIP'] = 'Permette di rilevare se è presente un ostacolo.';
Blockly.Msg['SENSORS_READ_OBSTACLE_FORWARD'] = 'davanti';
Blockly.Msg['SENSORS_READ_OBSTACLE_BACKWARD'] = 'dietro';
Blockly.Msg['SENSORS_READ_OBSTACLE_RIGHT'] = 'a destra';
Blockly.Msg['SENSORS_READ_OBSTACLE_LEFT'] = 'a sinistra';
Blockly.Msg['SENSORS_LINE_FOLLOW_TITLE'] = 'seguire la linea';
Blockly.Msg['SENSORS_LINE_FOLLOW_TOOLTIP'] = 'Permette al robot Eliobot di seguire una linea.';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TITLE'] = 'sensibilità del seguimento della linea %1';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TOOLTIP'] = 'Permette di modificare la sensibilità dei sensori dell\'Eliobot.';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TITLE'] = 'stato del sensore di linea %1';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TOOLTIP'] = 'Restituisce lo stato di uno dei sensori di tracciamento della linea.';
Blockly.Msg['SENSORS_LINE_LEFT'] = "sinistra";
Blockly.Msg['SENSORS_LINE_MIDDLE_LEFT'] = "centro sinistro";
Blockly.Msg['SENSORS_LINE_MIDDLE'] = "centro";
Blockly.Msg['SENSORS_LINE_MIDDLE_RIGHT'] = "centro destro";
Blockly.Msg['SENSORS_LINE_RIGHT'] = "destra";
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TITLE'] = 'valore del sensore di linea %1';
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TOOLTIP'] = 'Restituisce il valore di uno dei sensori di tracciamento della linea dell\'Eliobot.';
Blockly.Msg['SENSORS_AUTO_LINE_CALIBRATION'] = 'calibrazione automatica dei sensori di linea';
Blockly.Msg['SENSORS_AUTO_LINE_CALIBRATION_TOOLTIP'] = 'Permette di calibrare automaticamente i sensori di linea dell\'Eliobot. Il robot deve essere posizionato prima su una superficie chiara, poi su una superficie scura affinché la calibrazione sia corretta.';

// Actuators - robot
Blockly.Msg['ROBOT_MOVE_TITLE'] = ' %1';
Blockly.Msg['ROBOT_MOVE_TOOLTIP'] = 'Permette di controllare i motori del robot Eliobot per muoversi avanti o indietro.';
Blockly.Msg['ROBOT_MOVE_FORWARD'] = 'avanzare';
Blockly.Msg['ROBOT_MOVE_BACKWARD'] = 'retrocedere';
Blockly.Msg['ROBOT_ROTATE_TITLE'] = 'ruotare a %1';
Blockly.Msg['ROBOT_ROTATE_TOOLTIP'] = 'Ruota l\'Eliobot a sinistra o a destra.';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'destra';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'sinistra';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'fermare i motori';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'Ferma i motori dell\'Eliobot.';
Blockly.Msg['ROBOT_SET_SPEED_TITLE'] = 'impostare la velocità a %1 %';
Blockly.Msg['ROBOT_SET_SPEED_TOOLTIP'] = 'Cambia la velocità dell\'Eliobot.';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TITLE'] = 'ruota %1 di %2°';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TOOLTIP'] = 'Ruota l\'Eliobot a sinistra o a destra dell\'angolo desiderato.';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TITLE'] = 'far girare la ruota %1 in direzione %2';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TOOLTIP'] = 'Fa girare una delle ruote dell\'Eliobot nella direzione desiderata.';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TITLE'] = '%1 per %2 passo(i)';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TOOLTIP'] = 'Permette all\'Eliobot di spostarsi di una casella.';
Blockly.Msg['ROBOT_TURN_90_TITLE'] = 'ruotare a %1';
Blockly.Msg['ROBOT_TURN_90_TOOLTIP'] = 'Permette all\'Eliobot di ruotare a sinistra o a destra di 90°.';
Blockly.Msg['ROBOT_SET_SQUARE_SIZE_TITLE'] = 'dimensione di una casella %1 cm';
Blockly.Msg['ROBOT_SET_SQUARE_SIZE_TOOLTIP'] = 'Permette di impostare la dimensione di una casella per gli spostamenti a caselle dell\'Eliobot.';
Blockly.Msg['ROBOT_TURN_RIGHT'] = 'destra';
Blockly.Msg['ROBOT_TURN_LEFT'] = 'sinistra';
Blockly.Msg['ROBOT_WAITING_TITLE'] = 'attendere %1 %2 prima di fermare i motori';
Blockly.Msg['ROBOT_WAITING_TOOLTIP'] = 'Permette all\'Eliobot di attendere un certo tempo prima di fermarsi.';
Blockly.Msg['ROBOT_UNIT_SECONDS'] = 'secondo(i)';
Blockly.Msg['ROBOT_UNIT_MILLISECONDS'] = 'millisecondo(i)';
// Actuators - Buzzer
Blockly.Msg['ACTUATORS_PLAY_NOTE_TITLE'] = 'suonare la nota %1 per %2 %3';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TOOLTIP'] = 'Questo blocco permette di suonare una nota musicale. La nota è definita dal suo nome (Do, Re, Mi, Fa, Sol, La, Si) e dalla durata.';
Blockly.Msg['ACTUATORS_FREQUENCY_TITLE'] = 'suonare una frequenza %1 (Hz) per %2 %3';
Blockly.Msg['ACTUATORS_FREQUENCY_TOOLTIP'] = 'Questo blocco permette di riprodurre una frequenza. La frequenza è espressa in Hertz (Hz) e il tempo durante il quale viene riprodotta.';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TITLE'] = 'suonare la musica %1';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TOOLTIP'] = 'Questo blocco permette di suonare una melodia predefinita. Sono disponibili diverse melodie predefinite.';
Blockly.Msg['ACTUATORS_SET_VOLUME_TITLE'] = 'impostare il volume a %1 %';
Blockly.Msg['ACTUATORS_SET_VOLUME_TOOLTIP'] = 'Questo blocco permette di modificare il volume sonoro dell\'Eliobot.';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TITLE'] = 'riprodurre il suono %1';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TOOLTIP'] = 'Questo blocco permette di riprodurre un suono predefinito. Sono disponibili diversi suoni predefiniti.';
Blockly.Msg['ACTUATORS_SOUND_JUMP'] = 'salto';
Blockly.Msg['ACTUATORS_SOUND_LASER'] = 'laser';
Blockly.Msg['ACTUATORS_SOUND_QUESTION'] = 'domanda';
Blockly.Msg['ACTUATORS_SOUND_ERROR'] = 'errore';
Blockly.Msg['ACTUATORS_SOUND_EXPLOSION'] = 'esplosione';
Blockly.Msg['ACTUATORS_SOUND_LAND'] = 'atterraggio';
Blockly.Msg['ACTUATORS_SOUND_HAPPY'] = 'felice';
Blockly.Msg['ACTUATORS_SOUND_WIN'] = 'vittoria';
Blockly.Msg['ACTUATORS_SOUND_ALERT'] = 'allarme';
Blockly.Msg['ACTUATORS_SOUND_HELLO'] = 'ciao';
Blockly.Msg['ACTUATORS_SOUND_STARTUP'] = 'avvio';
Blockly.Msg['ACTUATORS_SOUND_BUMP'] = 'urto';
Blockly.Msg['ACTUATORS_SOUND_BLINK'] = 'lampeggio';

// Backpack - Display
Blockly.Msg['BACKPACK_DISPLAY_OLED_TEXT_TITLE'] = '[Schermo OLED] mostra il testo %1 sulla riga %2';
Blockly.Msg['BACKPACK_DISPLAY_OLED_TEXT_TOOLTIP'] = 'Mostra testo sullo schermo OLED SSD1306.';
Blockly.Msg['BACKPACK_DISPLAY_OLED_CLEAR_TITLE'] = '[Schermo OLED] cancella lo schermo';
Blockly.Msg['BACKPACK_DISPLAY_OLED_CLEAR_TOOLTIP'] = 'Cancella il testo dallo schermo OLED SSD1306.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TITLE'] = '[Matrice RGB 5x5] mostra l\'immagine';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TOOLTIP'] = 'Permette di mostrare un disegno sulla matrice di LED RGB 5x5.';
Blockly.Msg['BACKPACK_DISPLAY_CLEAR_MATRIX_TITLE'] = '[Matrice RGB 5x5] cancella la matrice';
Blockly.Msg['BACKPACK_DISPLAY_CLEAR_MATRIX_TOOLTIP'] = 'Cancella la matrice di LED RGB 5x5.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TITLE'] = '[Matrice RGB 5x5] mostra %1 in %2';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TOOLTIP'] = 'Mostra un\'icona del colore desiderato.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TITLE'] = '[Matrice RGB 5x5] far scorrere il testo %1 in %2';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TOOLTIP'] = 'Fa scorrere una stringa di testo del colore desiderato sulla matrice di LED 5x5.';
// Backpack - Sensors
Blockly.Msg['BACKPACK_DHT11_SENSOR_TITLE'] = '[DHT11] %1';
Blockly.Msg['BACKPACK_DHT11_SENSOR_TOOLTIP'] = "Restituisce la temperatura in gradi Celsius (°C) o l'umidità (in %) misurate dal sensore DHT11.";
Blockly.Msg['SENSOR_TEMPERATURE'] = 'temperatura';
Blockly.Msg['SENSOR_HUMIDITY'] = 'umidità';
Blockly.Msg['SENSOR_PRESSURE'] = 'pressione';
Blockly.Msg['SENSOR_ALTITUDE'] = 'altitudine';
Blockly.Msg['BACKPACK_BME280_SENSOR_TITLE'] = '[BME280] %1';
Blockly.Msg['BACKPACK_BME280_SENSOR_TOOLTIP'] = 'Restituisce la temperatura ambiente in gradi Celsius (°C) da -40 a 85 °C, Fahrenheit (°F) o Kelvin (K), l\'umidità (in %), la pressione (in Pascal) o l\'altitudine (in m) grazie al sensore BME280.';
Blockly.Msg['BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TITLE'] = "[BME280] imposta la pressione al livello del mare su %1";
Blockly.Msg['BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TOOLTIP'] = 'Permette di impostare la pressione al livello del mare per il sensore BME280, usata nel calcolo dell\'altitudine.';
Blockly.Msg['BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TITLE'] = '[HC-SR04] distanza';
Blockly.Msg['BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TOOLTIP'] = 'Restituisce la distanza in cm misurata dal sensore ad ultrasuoni HC-SR04.';
Blockly.Msg['BACKPACK_SENSORS_GETLIGHT_TITLE'] = '[Sensore di luce] luminosità sul pin %1';
Blockly.Msg['BACKPACK_SENSORS_GETLIGHT_TOOLTIP'] = 'Restituisce il livello di luminosità del sensore sul pin selezionato.';
// Backpack - IO - Buttons
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_TITLE'] = '[Pulsante] %1 premuto sul pin %2';
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_TOOLTIP'] = 'Restituisce lo stato del pulsante collegato al pin IO2 o IO15.';
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_PRESSED'] = 'è';
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_NOT_PRESSED'] = 'non è';
// Backpack - IO - Potentiometer
Blockly.Msg['BACKPACK_IO_KNOB_VALUE_TITLE'] = '[Potenziometro] valore sul pin %1';
Blockly.Msg['BACKPACK_IO_KNOB_VALUE_TOOLTIP'] = 'Restituisce il valore del potenziometro collegato al pin IO2 o IO15';
// Backpack - Actuators - Motors
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TITLE'] = '[Servomotore] imposta l\'angolo a %1° sul pin %2';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TOOLTIP'] = 'Permette di controllare l\'angolo (da 0 a 180°) di un servomotore sui pin PWM.';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TITLE'] = '[Motore servo continuo] imposta velocità %1 (%) direzione %2 sul pin %3';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TOOLTIP'] = 'Permette di controllare la velocità (da 0 a 100%) di un servomotore continuo sui pin PWM.';
// Backpack - Actuators - Buzzer
Blockly.Msg['BACKPACK_ACTUATORS_GROVE_BUZZER_TITLE'] = '[Buzzer] riprodurre la frequenza %1 con il volume %2 sul pin %3';
Blockly.Msg['BACKPACK_ACTUATORS_GROVE_BUZZER_TOOLTIP'] = 'Permette di riprodurre una frequenza con un modulo Grove buzzer.';

// Network - Wifi
Blockly.Msg['NETWORK_WIFI_CONNECT_TITLE'] = 'Connetti alla rete Wi-Fi SSID %1 con password %2';
Blockly.Msg['NETWORK_WIFI_CONNECT_TOOLTIP'] = 'Connette Eliobot a una rete Wi-Fi usando SSID e password forniti.';
Blockly.Msg['NETWORK_WIFI_DISCONNECT_TITLE'] = 'Disconnetti dal Wi-Fi';
Blockly.Msg['NETWORK_WIFI_DISCONNECT_TOOLTIP'] = 'Disconnette Eliobot dalla rete Wi-Fi a cui è connesso.';
Blockly.Msg['NETWORK_WIFI_OPEN_ACCESS_POINT_TITLE'] = 'Apri un punto di accesso Wi-Fi SSID %1 con password %2';
Blockly.Msg['NETWORK_WIFI_OPEN_ACCESS_POINT_TOOLTIP'] = 'Crea un punto di accesso Wi-Fi su Eliobot con SSID e password forniti.';
Blockly.Msg['NETWORK_WIFI_DEFINE_HOST_NAME_TITLE'] = 'Imposta il nome host %1';
Blockly.Msg['NETWORK_WIFI_DEFINE_HOST_NAME_TOOLTIP'] = 'Imposta il nome host (hostname) di Eliobot sulla rete. Questo nome permette di accedere a Eliobot da un browser.';
Blockly.Msg['NETWORK_WIFI_DEFINE_ANTENNA_POWER_TITLE'] = 'Imposta la potenza dell\'antenna Wi-Fi %1';
Blockly.Msg['NETWORK_WIFI_DEFINE_ANTENNA_POWER_TOOLTIP'] = 'Regola la potenza di trasmissione dell\'antenna Wi-Fi di Eliobot (in dBm).';
Blockly.Msg['NETWORK_WIFI_IS_CONNECTED_TITLE'] = 'connesso al Wi-Fi?';
Blockly.Msg['NETWORK_WIFI_IS_CONNECTED_TOOLTIP'] = 'Restituisce true se Eliobot è connesso a una rete Wi-Fi, false altrimenti.';
Blockly.Msg['NETWORK_WIFI_SCAN_NETWORKS_TITLE'] = 'scansiona le reti Wi-Fi disponibili';
Blockly.Msg['NETWORK_WIFI_SCAN_NETWORKS_TOOLTIP'] = 'Restituisce la lista delle reti Wi-Fi disponibili intorno a Eliobot.';
Blockly.Msg['NETWORK_WIFI_GET_IP_TITLE'] = 'indirizzo IP di Eliobot';
Blockly.Msg['NETWORK_WIFI_GET_IP_TOOLTIP'] = 'Restituisce l\'indirizzo IP di Eliobot sulla rete Wi-Fi.';
// Network - HTML
Blockly.Msg['NETWORK_HTML_CREATE_PAGE_TITLE'] = 'Crea una pagina web con il titolo %1 e il contenuto';
Blockly.Msg['NETWORK_HTML_CREATE_PAGE_TOOLTIP'] = 'Crea una pagina web accessibile da un browser. Aggiunge elementi HTML nel contenuto della pagina.';
Blockly.Msg['NETWORK_HTML_CREATE_BUTTON_TITLE'] = 'Aggiungi un pulsante %1 con azione %2';
Blockly.Msg['NETWORK_HTML_CREATE_BUTTON_TOOLTIP'] = 'Aggiunge un pulsante alla pagina web. I blocchi in "azione" vengono eseguiti da Eliobot quando il pulsante viene premuto.';
Blockly.Msg['NETWORK_HTML_DISPLAY_VALUE_TITLE'] = 'Mostra il valore %1 con il nome %2';
Blockly.Msg['NETWORK_HTML_DISPLAY_VALUE_TOOLTIP'] = 'Mostra un valore nella pagina web e lo aggiorna automaticamente ogni secondo.';
Blockly.Msg['NETWORK_HTML_CREATE_TAG_TITLE'] = 'Tag %1';
Blockly.Msg['NETWORK_HTML_CREATE_TAG_TOOLTIP'] = 'Crea un tag HTML (div o center) per organizzare il contenuto della tua pagina web.';
Blockly.Msg['NETWORK_HTML_CREATE_TITLE_TAG_TITLE'] = 'Titolo %1 %2';
Blockly.Msg['NETWORK_HTML_CREATE_TITLE_TAG_TOOLTIP'] = 'Aggiunge un titolo HTML (da h1 a h6) alla tua pagina web. h1 è il più grande, h6 il più piccolo.';
Blockly.Msg['NETWORK_HTML_CREATE_PARAGRAPH_TITLE'] = 'Paragrafo %1';
Blockly.Msg['NETWORK_HTML_CREATE_PARAGRAPH_TOOLTIP'] = 'Aggiunge un paragrafo di testo alla tua pagina web.';
