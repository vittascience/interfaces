/**
 * @fileoverview Messaggi italiani per mBot. (IT)
 */

'use strict';
//COMMENT - Arduino
Blockly.Msg['CALL_EXPRESSION_COMMENT_TITLE'] = 'commento %1';
Blockly.Msg['CALL_EXPRESSION_COMMENT_TOOLTIP'] = 'Questo blocco consente di aggiungere un commento al codice.';
// Display - MeMCore
Blockly.Msg["MCORE_CONTROL_BUILTIN_LED_TITLE"] = "[MeMCore] imposta il LED blu integrato sullo stato %1";
Blockly.Msg["MCORE_CONTROL_BUILTIN_LED_TOOLTIP"] = "Accende o spegne il LED blu sulla scheda MeMCore.";
// Input/Output - MeMCore
Blockly.Msg["IO_WAIT_TITLE"] = "attendi %1 %2";
Blockly.Msg["IO_WAIT_TOOLTIP"] = "Interrompe l’esecuzione del codice per la durata indicata in secondi o millisecondi.";
Blockly.Msg["IO_WAIT_SECOND"] = "secondo/i";
Blockly.Msg['IO_WAIT_MILLISECOND'] = "millisecondo/i";
Blockly.Msg['IO_WAIT_MICROSECOND'] = "microsecondo/i";
Blockly.Msg["IO_WAIT_UNTIL_TITLE"] = "attendi finché %1";
Blockly.Msg["IO_WAIT_UNTIL_TOOLTIP"] = "Interrompe l’esecuzione del codice finché la condizione non è soddisfatta.";
Blockly.Msg["IO_INITCHRONOMETER_TITLE"] = "inizializza il cronometro";
Blockly.Msg["IO_INITCHRONOMETER_TOOLTIP"] = "Consente di inizializzare il cronometro (in secondi).";
Blockly.Msg["IO_GETCHRONOMETER_TITLE"] = "ottieni il valore del cronometro in %1";
Blockly.Msg["IO_GETCHRONOMETER_TOOLTIP"] = "Restituisce il valore del cronometro dall’inizializzazione, in secondi o millisecondi.";
// Input/Output - Pins
Blockly.Msg["IO_DIGITAL_SIGNAL_TITLE"] = "%1";
Blockly.Msg["IO_DIGITAL_SIGNAL_HIGH"] = "HIGH (1)";
Blockly.Msg["IO_DIGITAL_SIGNAL_LOW"] = "LOW (0)";
Blockly.Msg["IO_DIGITAL_SIGNAL_TOOLTIP"] = "Restituisce un valore booleano (HIGH o LOW).";
Blockly.Msg["IO_READDIGITALPIN_TITLE"] = "leggi il pin digitale %1";
Blockly.Msg["IO_READDIGITALPIN_TOOLTIP"] = "Questo blocco legge uno degli ingressi digitali e ne restituisce il valore.";
Blockly.Msg["IO_WRITEDIGITALPIN_TITLE"] = "scrivi sul pin digitale %1 lo stato %2";
Blockly.Msg["IO_WRITEDIGITALPIN_TOOLTIP"] = "Consente di scrivere uno stato su un pin digitale.";
Blockly.Msg["IO_WRITEANALOGPIN_TITLE"] = "scrivi sul pin analogico %1 il valore %2";
Blockly.Msg["IO_WRITEANALOGPIN_TOOLTIP"] = "Consente di scrivere sul pin analogico un valore compreso tra 0 e 255."
Blockly.Msg["IO_READANALOGPIN_TITLE"] = "leggi il pin analogico %1";
Blockly.Msg["IO_READANALOGPIN_TOOLTIP"] = "Consente di leggere il valore analogico dei pin (0-1023).";
Blockly.Msg["IO_SETPWM_TITLE"] = "applica un segnale PWM con duty cycle %1 (%) sul pin %2";
Blockly.Msg["IO_SETPWM_TOOLTIP"] = "Applica un segnale PWM a un pin PWM (~) impostando il duty cycle (in %). Per i pin D3, D9, D10 e D11, la frequenza del segnale è 490 Hz (periodo 2,04 ms). Per i pin D5 e D6 è 980 Hz (periodo 1,02 ms).";
Blockly.Msg["IO_READPULSEIN_TITLE"] = "leggi la durata dell’impulso nello stato %1 sul pin %2";
Blockly.Msg["IO_READPULSEIN_TOOLTIP"] = "Restituisce la durata dell’impulso (in μs). Scegliere lo stato da misurare (HIGH o LOW). Funziona con impulsi di durata compresa tra 10 μs e 3 minuti.";
Blockly.Msg["IO_ATTACH_INTERRUPT_TITLE"] = "quando viene rilevato %1 sul pin %2, allora";
Blockly.Msg["IO_ATTACH_INTERRUPT_TOOLTIP"] = "Consente di definire un evento sui pin 2 o 3. Il blocco esegue le istruzioni non appena viene rilevato un fronte di salita, di discesa o entrambi sui pin 2 o 3.";
Blockly.Msg["IO_RISING_EDGE"] = "fronte di salita";
Blockly.Msg["IO_FALLING_EDGE"] = "fronte di discesa";
Blockly.Msg["IO_BOTH_EDGE"] = "variazione";

// Communication - Serial connection
Blockly.Msg['COMMUNICATION_SERIAL_BEGIN_TITLE'] = 'inizializza la comunicazione seriale a %1 baud';
Blockly.Msg['COMMUNICATION_SERIAL_BEGIN_TOOLTIP'] = 'Questo blocco inizializza la comunicazione seriale alla velocità di trasmissione indicata. Deve essere utilizzato nel blocco di configurazione.';
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TITLE"] = "scrivi sulla porta seriale %1";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TOOLTIP"] = "Questo blocco consente di scrivere qualsiasi tipo di dato sulla porta seriale. I dati verranno visualizzati nella console durante l’esecuzione del programma.";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_WITH"] = "con";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_NEWLINES"] = "a capo";
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NUMBER_TITLE'] = 'scrivi il numero %1 nella console in formato %2';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NUMBER_TOOLTIP'] = 'Consente di visualizzare un numero nella console nel formato scelto (HEX: esadecimale, DEC: decimale).';
Blockly.Msg["COMMUNICATION_SERIAL_ONDATARECEIVED_TITLE"] = "quando vengono ricevuti dati seriali in %1, allora";
Blockly.Msg["COMMUNICATION_SERIAL_ONDATARECEIVED_TOOLTIP"] = "Consente di eseguire istruzioni quando vengono ricevuti dati dalla porta seriale nella variabile 'serialData'.";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TITLE"] = "mostra sul grafico";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TOOLTIP"] = "Questo blocco consente di inviare dati digitali visibili nel plotter. Può essere utilizzato con uno o più blocchi nel formato \"Nome\" e \"Dati\".";
Blockly.Msg["COMMUNICATION_DATA"] = "Dati";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TITLE"] = "Nome %1 Dati %2";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TOOLTIP"] = "Questo blocco deve essere utilizzato nel blocco \"Scrivi nel grafico\". Deve contenere il nome del valore testuale da visualizzare e il relativo valore.";
Blockly.Msg["COMMUNICATION_COMPUTER_PLAYNOTE_TITLE"] = "riproduci la nota %1 tramite la porta seriale";
Blockly.Msg["COMMUNICATION_COMPUTER_PLAYNOTE_TOOLTIP"] = "Riproduce la nota selezionata fino all’esecuzione del blocco \"Interrompi musica\".";
Blockly.Msg["NOTE_C"] = "C";
Blockly.Msg["NOTE_C_SHARP"] = "C#";
Blockly.Msg["NOTE_D"] = "D";
Blockly.Msg["NOTE_D_SHARP"] = "D#";
Blockly.Msg["NOTE_E"] = "E";
Blockly.Msg["NOTE_F"] = "F";
Blockly.Msg["NOTE_F_SHARP"] = "F#";
Blockly.Msg["NOTE_G"] = "G";
Blockly.Msg["NOTE_G_SHARP"] = "G#";
Blockly.Msg["NOTE_A"] = "A";
Blockly.Msg["NOTE_A_SHARP"] = "A#";
Blockly.Msg["NOTE_B"] = "B";
Blockly.Msg["COMMUNICATION_COMPUTER_SETFREQUENCY_TITLE"] = "riproduci la frequenza %1 (Hz) sul computer";
Blockly.Msg["COMMUNICATION_COMPUTER_SETFREQUENCY_TOOLTIP"] = "Questo blocco consente di riprodurre una determinata frequenza sul computer";
Blockly.Msg["COMMUNICATION_COMPUTER_STOPMUSIC_TITLE"] = "interrompi la musica della porta seriale";
Blockly.Msg["COMMUNICATION_COMPUTER_STOPMUSIC_TOOLTIP"] = "Interrompe la nota corrente riprodotta tramite la porta seriale.";

// Robots - mBot basic modules
Blockly.Msg["ROBOTS_MBOT_GO_TITLE"] = "[Motori] %1 alla velocità %2 (%)";
Blockly.Msg["ROBOTS_MBOT_GO_FORWARD"] = "avanti";
Blockly.Msg["ROBOTS_MBOT_GO_REVERSE"] = "indietro";
Blockly.Msg["ROBOTS_MBOT_GO_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Consente di controllare il movimento (AVANTI/INDIETRO) e la velocità dei motori (da 0 a 100%) del robot mBot.";
Blockly.Msg["ROBOTS_MBOT_CONTROLMOTOR_TITLE"] = "[Motori] controlla il motore %1, direzione %2, velocità %3 (%)";
Blockly.Msg["ROBOTS_MBOT_RIGHT"] = "destra";
Blockly.Msg["ROBOTS_MBOT_LEFT"] = "sinistra";
Blockly.Msg["ROBOTS_MBOT_RIGHT&LEFT"] = "destra e sinistra";
Blockly.Msg["ROBOTS_MBOT_RIGHT_F"] = "destra";
Blockly.Msg["ROBOTS_MBOT_LEFT_F"] = "sinistra";
Blockly.Msg["ROBOTS_MBOT_RIGHT&LEFT_F"] = "destra e sinistra";
Blockly.Msg["ROBOTS_MBOT_CONTROLMOTOR_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Consente di controllare il motore destro (9) e quello sinistro (10), modificandone la direzione (↻: AVANTI, ↺: INDIETRO) o la velocità (da 0 a 100%) del robot mBot.";
Blockly.Msg["ROBOTS_MBOT_STOPMOTORS_TITLE"] = "[Motori] arresta il motore %1";
Blockly.Msg["ROBOTS_MBOT_STOPMOTORS_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Consente di arrestare il motore destro, sinistro o entrambi i motori del robot mBot.";
Blockly.Msg["ROBOTS_MBOT_SETRGBLED_TITLE"] = "[Scheda] imposta il colore R %1 G %2 B %3 sul LED %4";
Blockly.Msg["ROBOTS_MBOT_SETRGBLED_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Consente di controllare il colore del LED RGB sulla scheda del robot mBot mediante valori (R,G,B) compresi tra 0 e 255.";
Blockly.Msg["ROBOTS_MBOT_SETPALETTERGBLED_TITLE"] = "[Scheda] imposta il colore %1 sul LED %2";
Blockly.Msg["ROBOTS_MBOT_SETPALETTERGBLED_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Consente di controllare il colore del LED RGB sulla scheda del robot mBot scegliendo un colore dalla tavolozza.";
Blockly.Msg["ROBOTS_MBOT_SETBUZZER_TITLE"] = "[Scheda] imposta il buzzer alla frequenza %1 per %2 (ms)";
Blockly.Msg["ROBOTS_MBOT_SETBUZZER_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Consente di controllare il buzzer di mBot a qualsiasi frequenza e per una durata espressa in millisecondi";
Blockly.Msg["ROBOTS_MBOT_PLAYMUSIC_TITLE"] = "[Scheda] riproduci la nota %1";
Blockly.Msg["ROBOTS_MBOT_PLAYMUSIC_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Consente di riprodurre una nota con il buzzer di mBot.";
Blockly.Msg["ROBOTS_MBOT_GETLIGHT_TITLE"] = "[Scheda] livello di luminosità";
Blockly.Msg["ROBOTS_MBOT_GETLIGHT_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Restituisce il livello di luminosità rilevato dal sensore sulla scheda di mBot.";
Blockly.Msg["ROBOTS_MBOT_GETBUTTONSTATE_TITLE"] = "[Scheda] il pulsante è premuto?";
Blockly.Msg["ROBOTS_MBOT_GETBUTTONSTATE_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Restituisce lo stato del pulsante sulla scheda di mBot.";
Blockly.Msg["ROBOTS_MBOT_SENDIRMESSAGE_TITLE"] = "[Scheda] invia il messaggio %1 tramite IR";
Blockly.Msg["ROBOTS_MBOT_SENDIRMESSAGE_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Invia un messaggio tramite infrarossi con il robot.";
Blockly.Msg["ROBOTS_MBOT_GETREMOTECONTROLBUTTON_TITLE"] = "[Telecomando] il pulsante %1 è premuto";
Blockly.Msg["ROBOTS_MBOT_GETREMOTECONTROLBUTTON_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_REMOTE_CONTROL + Blockly.Tooltip.SEP + "Restituisce vero o falso a seconda che il pulsante indicato del telecomando di mBot sia premuto.";

// Display - LED matrix
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWSTRING_TITLE"] = "[Matrice LED] mostra il testo %1 alla posizione x %2 y %3 sulla porta %4";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWSTRING_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Consente di draw string sulla matrice LED 16×8 di Makeblock. La posizione specificata deve essere compresa tra x = 0-15 e y = 0-7. Collegare il display a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWNUMBER_TITLE"] = "[Matrice LED] mostra il numero %1 sulla porta %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWNUMBER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Consente di mostra il numero sulla matrice LED 16×8 di Makeblock. Collegare il display a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWCLOCK_TITLE"] = "[Matrice LED] mostra l’orologio %1 : %2 sulla porta %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWCLOCK_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Consente di mostra l’orologio sulla matrice LED 16×8 di Makeblock. Collegare il display a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWBITMAPICON_TITLE"] = "[Matrice LED] mostra il disegno %1 alla posizione x %2 y %3 sulla porta %4";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWBITMAPICON_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Consente di mostra il disegnoing sulla matrice LED 16×8 di Makeblock. La posizione specificata deve essere compresa tra x = 0-15 e y = 0-7. Collegare il display a una porta RJ45 da 1 a 4.";
// Display - Neopixel
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_DEFINE_TITLE"] = "[NeoPixel] definisci %1 LED sulla porta %2 slot %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_DEFINE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Consente di definisci LED number of neopixel di Makeblock. This block have to be used in setup. Scegliere lo slot 1 o 2 dell’adattatore RJ45. Collegare il modulo a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_CONTROLLED_TITLE"] = "[NeoPixel] imposta il LED %1 to R %2 G %3 B %4 sulla porta %5 slot %6";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_CONTROLLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Enable imposta il LED color as (R,G,B) da 0 a 255 on neopixel di Makeblock. Scegliere lo slot 1 o 2 dell’adattatore RJ45. Collegare il modulo a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_PALETTECONTROLLED_TITLE"] = "[NeoPixel] imposta il LED %1 to %2 sulla porta %3 slot %4";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_PALETTECONTROLLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Enable imposta il LED color scegliendo un colore dalla tavolozza on neopixel di Makeblock. Scegliere lo slot 1 o 2 dell’adattatore RJ45. Collegare il modulo a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDRGB_TITLE"] = "[NeoPixel] imposta tutti i LED sul colore R %1 G %2 B %3 sulla porta %4 slot %5";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDRGB_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Consente di control all LED of Makeblock neopixel module to the choosed colour value as (R,G,B) da 0 a 255. Scegliere lo slot 1 o 2 dell’adattatore RJ45. Collegare il modulo a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDCOLOR_TITLE"] = "[NeoPixel] imposta tutti i LED sul colore %1 sulla porta %2 slot %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDCOLOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Consente di control all LED of Makeblock neopixel module to the choosed colour value. Scegliere lo slot 1 o 2 dell’adattatore RJ45. Collegare il modulo a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_RAINBOW_TITLE"] = "[NeoPixel] mostra un arcobaleno sulla porta %1 slot %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_RAINBOW_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Consente di show a rainbow on Makeblock neopixel module, set pin and the number of LED. Scegliere lo slot 1 o 2 dell’adattatore RJ45. Collegare il modulo a una porta RJ45 da 1 a 4.";
// Display - RGB LED
Blockly.Msg["ROBOTS_MAKEBLOCK_SETRGBLED_TITLE"] = "[LED RGB] imposta il colore R %1 G %2 B %3 on LED %4 sulla porta %5";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETRGBLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_RGB_LED + Blockly.Tooltip.SEP + "Consente di show imposta il colore as (R,G,B) value da 0 a 255 on RGB LED di Makeblock. Collegare il display a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_ALL_LED"] = "tutti";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETPALETTERGBLED_TITLE"] = "[LED RGB] imposta il colore %1 on LED %2 sulla porta %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETPALETTERGBLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_RGB_LED + Blockly.Tooltip.SEP + "Consente di show imposta il colore as (R,G,B) scegliendo un colore dalla tavolozza on RGB LED di Makeblock. Collegare il display a una porta RJ45 da 1 a 4.";
// Display - 4 Digit
Blockly.Msg["ROBOTS_MAKEBLOCK_4DIGIT_SETNUMBER_TITLE"] = "[Display a 7 segmenti] mostra %1 sulla porta %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_4DIGIT_SETNUMBER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_7SEGMENT_DISPLAY + Blockly.Tooltip.SEP + "Consente di mostra il numero sul display a 7 segmenti di Makeblock. Collegare il display a una porta RJ45 da 1 a 4.";

// Robots - Makeblock sensors
Blockly.Msg["ROBOTS_MAKEBLOCK_ULTRASONICRANGER_TITLE"] = "[Sensore a ultrasuoni] distanza in %1 sulla porta %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_ULTRASONICRANGER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_ULTRASONIC + Blockly.Tooltip.SEP + "Restituisce distance measurement (in centimeters) from the ultrasonic sensor di Makeblock. Collegare il sensore a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_READLINEFINDER_TITLE"] = "[Sensore seguilinea] sensore %1 sulla linea nera sulla porta %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_READLINEFINDER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_LINEFINDER + Blockly.Tooltip.SEP + "Restituisce state of line follower module (0 ou 1) from sensor1 (left) or sensor2 (right). Collegare il sensore a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_LEFT_1"] = "sinistra";
Blockly.Msg["ROBOTS_MAKEBLOCK_RIGHT_2"] = "destra";
Blockly.Msg["ROBOTS_MAKEBLOCK_READPIRSENSOR_TITLE"] = "[Sensore di movimento PIR] state sulla porta %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_READPIRSENSOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_PIR_MOTION + Blockly.Tooltip.SEP + "Restituisce state (1 if detected, 0 else) from PIR motion sensor di Makeblock. Collegare il sensore a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_WATERPROOFTEMPERATURE_TITLE"] = "[Sensore DS18B20] temperatura sulla porta %1 slot %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_WATERPROOFTEMPERATURE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_WATERPROOF_TEMPERATURE + Blockly.Tooltip.SEP + "Consente di read the measure the temperatura con il sensore Makeblock waterproof ds18b20 sensor. Scegliere lo slot 1 o 2 dell’adattatore RJ45. Collegare il sensore a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETLIGHT_TITLE"] = "[Sensore di luminosità] livello di luminosità sulla porta %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETLIGHT_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_LIGHT + Blockly.Tooltip.SEP + "Consente di read the livello di luminosità con il sensore Makeblock light sensor. Collegare il sensore a una porta RJ45 1 o 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOLOR_TITLE"] = "[Sensore di colore] %1 sulla porta %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOLOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_COLOR + Blockly.Tooltip.SEP + "Consente di read the level of one of the three primary colors con il sensore Makeblock color sensor. It returns also il colore misurato come 0 (Bianco), 1 (Rosa), 2 (Rosso), 3 (Arancione), 4 (Giallo), 5 (Verde), 5 (Ciano), 6 (Blu), 7 (Viola), 8 (Nero), 9 (Oro). Collegare il sensore a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_COLOR"] = "colore";
Blockly.Msg["ROBOTS_MAKEBLOCK_RED"] = "livello di rosso";
Blockly.Msg["ROBOTS_MAKEBLOCK_GREEN"] = "livello di verde";
Blockly.Msg["ROBOTS_MAKEBLOCK_BLUE"] = "livello di blu";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSOUND_TITLE"] = "[Sensore sonoro] livello sonoro sulla porta %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSOUND_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_SOUND + Blockly.Tooltip.SEP + "Consente di read the livello sonoro con il sensore Makeblock sound sensor. Collegare il sensore a una porta RJ45 1 o 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETGAS_TITLE"] = "[Sensore di gas MQ2] %1 sulla porta %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETGAS_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_GAS + Blockly.Tooltip.SEP + "Consente di read the amount of gas con il sensore Makeblock gas sensor MQ2. It is possible to get a state value as 0 (nessun gas) or 1 (gas). Utilizzare il potenziometro del modulo per impostare la soglia di concentrazione appropriata. Collegare il sensore alla porta RJ45 1 o 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GAS_DIGITAL"] = "stato";
Blockly.Msg["ROBOTS_MAKEBLOCK_GAS_ANALOG"] = "valore";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETFLAME_TITLE"] = "[Sensore di fiamma] %1 sulla porta %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETFLAME_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_FLAME + Blockly.Tooltip.SEP + "Consente di read the detectable fiamma con il sensore Makeblock fiamma sensor. It is possible to get a state value as 0 (nessuna fiamma) or 1 (fiamma). Use the potentiometer on module in order to set the appropriate the fiamma limit threshold. Questo sensore rileva la luce infrarossa con lunghezza d’onda compresa tra 700 nm e 1200 nm. Collegare il sensore alla porta RJ45 1 o 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_FLAME_DIGITAL"] = "stato";
Blockly.Msg["ROBOTS_MAKEBLOCK_FLAME_ANALOG"] = "valore";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOMPASSDATA_TITLE"] = "[Bussola] %1 sulla porta %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOMPASSDATA_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_COMPASS + Blockly.Tooltip.SEP + "Let's you to read compass data di Makeblock. Brancher le capteur sur un port RJ45 de 1 ou 4 du robot mBot.";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_X"] = "asse X";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_Y"] = "asse Y";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_Z"] = "asse Z";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_ANGLE"] = "angolo (°)";
// Robots - Makeblock actuators
Blockly.Msg["ROBOTS_MAKEBLOCK_SETSERVOANGLE_TITLE"] = "[Servomotore] imposta l’angolo a %1 on pin %2 slot %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETSERVOANGLE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_SERVO + Blockly.Tooltip.SEP + "Consente di control servo angle (from 0 to 180) connected to a RJ45 adapter di Makeblock. Scegliere lo slot 1 o 2 dell’adattatore RJ45. Collegare il modulo a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_CONTROLMINIFAN_TITLE"] = "[Mini ventilatore] imposta la direzione su %1 sulla porta %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_CONTROLMINIFAN_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MINI_FAN + Blockly.Tooltip.SEP + "Consente di control mini fan di Makeblock.";
Blockly.Msg["ROBOTS_MAKEBLOCK_CLOCKWISE"] = "senso orario";
Blockly.Msg["ROBOTS_MAKEBLOCK_ANTICLOCKWISE"] = "senso antiorario";
Blockly.Msg["ROBOTS_MAKEBLOCK_STOP"] = "arresta";
// Robots - Makeblock input/output
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSWITCHSTATE_TITLE"] = "[Finecorsa] state sulla porta %1 slot %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSWITCHSTATE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_SWITCH + Blockly.Tooltip.SEP + "Consente di leggere lo stato of Makeblock switch module. Scegliere lo slot 1 o 2 dell’adattatore RJ45. Collegare il sensore a una porta RJ45 da 1 a 4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETJOYSTICKAXIS_TITLE"] = "[Joystick] valore dell’asse %1 sulla porta %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETJOYSTICKAXIS_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_JOYSTICK + Blockly.Tooltip.SEP + "Consente di leggere il valore dell’asse (X or Y) di Makeblock joystick module. Collegare il sensore a una porta RJ45 1 o 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPOTENTIOMETER_TITLE"] = "[Potentiometer] value sulla porta %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPOTENTIOMETER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_POTENTIOMETER + Blockly.Tooltip.SEP + "Consente di leggere il valore del potenziometro di Makeblock module. Collegare il sensore a una porta RJ45 1 o 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPRESSEDBUTTON_TITLE"] = "[Modulo a 4 pulsanti] pulsante premuto sulla porta %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPRESSEDBUTTON_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_4_BUTTONS + Blockly.Tooltip.SEP + "Restituisce the pulsante premuto from 4 buttons module di Makeblock. Connect module on RJ45 port da 1 a 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_READTOUCHSENSOR_TITLE"] = "[Sensore tattile] state sulla porta %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_READTOUCHSENSOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_TOUCH_SENSOR + Blockly.Tooltip.SEP + "Restituisce lo stato del sensore tattile di Makeblock. Collegare il modulo a una porta RJ45 da 1 a 4.";