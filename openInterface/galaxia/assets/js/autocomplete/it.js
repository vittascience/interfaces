// galaxia (Thingz) - thingz module

// galaxia - accel/compass

// galaxia - button / touch

// galaxia - led

// galaxia - log

// galaxia - radio

// galaxia - sound

// galaxia - display

ACMsg.GALAXIA_THINGZ_MODULE = "Modulo Thingz per la scheda Galaxia: accesso ai componenti integrati (pulsanti, pad tattili, LED, sensori, radio, display, registro).";
ACMsg.GALAXIA_THINGZ_BUTTON_A = "Pulsante fisico A di Galaxia (istanza di <b>Button</b>).";
ACMsg.GALAXIA_THINGZ_BUTTON_B = "Pulsante fisico B di Galaxia (istanza di <b>Button</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_N = "Pulsante touch Nord di Galaxia (istanza di <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_S = "Pulsante touch Sud di Galaxia (istanza di <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_E = "Pulsante touch Est di Galaxia (istanza di <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_W = "Pulsante touch Ovest di Galaxia (istanza di <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_LED = "LED RGB di Galaxia (istanza di <b>Led</b>).";
ACMsg.GALAXIA_THINGZ_ACCELEROMETER = "Accelerometro di Galaxia (istanza di <b>Accel</b>).";
ACMsg.GALAXIA_THINGZ_COMPASS = "Magnetometro/bussola di Galaxia (istanza di <b>Compass</b>).";
ACMsg.GALAXIA_THINGZ_SOUND = "Uscita audio jack di Galaxia (istanza di <b>Sound</b>).";
ACMsg.GALAXIA_THINGZ_RADIO = "Modulo radio di Galaxia (istanza di <b>Radio</b>).";
ACMsg.GALAXIA_THINGZ_DISPLAY = "Display LCD di Galaxia (istanza di <b>Display</b>).";
ACMsg.GALAXIA_THINGZ_LOG = "Logger CSV interno di Galaxia (istanza di <b>Log</b>).";
ACMsg.GALAXIA_THINGZ_TEMPERATURE = "Restituisce la temperatura corrente rilevata dal sensore interno.";
ACMsg.GALAXIA_THINGZ_SET_TEMPERATURE_OFFSET = "Applica un offset di calibrazione (in gradi) al sensore di temperatura interno.";
ACMsg.GALAXIA_THINGZ_ACCEL_MODULE = "Modulo Thingz per accelerometro e bussola.";
ACMsg.GALAXIA_ACCEL_CLASS = "Controlla l'accelerometro di Galaxia.";
ACMsg.GALAXIA_ACCEL_CONSTRUCTOR = "Crea un oggetto <b>Accel</b>.";
ACMsg.GALAXIA_COMPASS_CLASS = "Controlla il magnetometro di Galaxia.";
ACMsg.GALAXIA_COMPASS_CONSTRUCTOR = "Crea un oggetto <b>Compass</b>.";
ACMsg.GALAXIA_ACCEL_GET_X = "Restituisce il valore di accelerazione sull'asse X (mG).";
ACMsg.GALAXIA_ACCEL_GET_Y = "Restituisce il valore di accelerazione sull'asse Y (mG).";
ACMsg.GALAXIA_ACCEL_GET_Z = "Restituisce il valore di accelerazione sull'asse Z (mG).";
ACMsg.GALAXIA_ACCEL_GET_VALUES = "Restituisce i valori di accelerazione sui 3 assi come lista: [x, y, z].";
ACMsg.GALAXIA_ACCEL_CURRENT_GESTURE = "Restituisce il gesto attuale (es. su, giù, sinistra, destra, faccia in su, faccia in giù, caduta libera, 3g, 6g, 8g, scuotimento, nessuno).";
ACMsg.GALAXIA_ACCEL_IS_GESTURE = "Restituisce <b>True</b> se il gesto corrente corrisponde a <b>gesture</b>.";
ACMsg.GALAXIA_ACCEL_WAS_GESTURE = "Restituisce <b>True</b> se <b>gesture</b> si è verificato dal precedente richiamo.";
ACMsg.GALAXIA_ACCEL_GET_GESTURES = "Restituisce lo storico dei gesti (il più recente per ultimo).";
ACMsg.GALAXIA_ACCEL_ON_GESTURE = "Registra una callback per l'evento gesto; il gesto viene passato alla callback.";
ACMsg.GALAXIA_COMPASS_GET_X = "Restituisce il valore del campo magnetico sull'asse X (uT).";
ACMsg.GALAXIA_COMPASS_GET_Y = "Restituisce il valore del campo magnetico sull'asse Y (uT).";
ACMsg.GALAXIA_COMPASS_GET_VALUES = "Restituisce i valori del campo magnetico sui 3 assi come lista: [x, y, z].";
ACMsg.GALAXIA_COMPASS_HEADING = "Restituisce la direzione attuale (gradi).";
ACMsg.GALAXIA_COMPASS_CALIBRATE = "Calibra il magnetometro: ruotare la scheda attorno all'asse Z durante la calibrazione.";
ACMsg.GALAXIA_THINGZ_BUTTON_MODULE = "Modulo Thingz per i pulsanti.";
ACMsg.GALAXIA_BUTTON_CLASS = "Controlla i pulsanti fisici di Galaxia.";
ACMsg.GALAXIA_BUTTON_CONSTRUCTOR = "Crea un oggetto <b>Button</b>.";
ACMsg.GALAXIA_BUTTON_IS_PRESSED = "Restituisce <b>True</b> se il pulsante è premuto in questo momento.";
ACMsg.GALAXIA_BUTTON_WAS_PRESSED = "Restituisce <b>True</b> se il pulsante è stato premuto dal precedente richiamo.";
ACMsg.GALAXIA_BUTTON_GET_PRESSES = "Restituisce il numero di pressioni dall'ultima chiamata.";
ACMsg.GALAXIA_BUTTON_ON_PRESSED = "Registra una callback per l'evento di pressione; l'oggetto pulsante viene passato alla callback.";
ACMsg.GALAXIA_THINGZ_BUTTON_TOUCH_MODULE = "Modulo Thingz per pulsanti touch.";
ACMsg.GALAXIA_BUTTONTOUCH_CLASS = "Controlla i pulsanti touch capacitivi di Galaxia.";
ACMsg.GALAXIA_BUTTONTOUCH_CONSTRUCTOR = "Crea un oggetto <b>ButtonTouch</b>.";
ACMsg.GALAXIA_BUTTONTOUCH_IS_TOUCHED = "Restituisce <b>True</b> se il pulsante touch è attualmente toccato.";
ACMsg.GALAXIA_BUTTONTOUCH_WAS_TOUCHED = "Restituisce <b>True</b> se il pulsante touch è stato toccato dal precedente richiamo.";
ACMsg.GALAXIA_BUTTONTOUCH_GET_TOUCHES = "Restituisce il numero di tocchi dall'ultima chiamata.";
ACMsg.GALAXIA_BUTTONTOUCH_ON_TOUCHED = "Registra una callback per l'evento di tocco; l'oggetto pulsante viene passato alla callback.";
ACMsg.GALAXIA_THINGZ_LED_MODULE = "Modulo Thingz LED.";
ACMsg.GALAXIA_LED_CLASS = "Controlla il LED RGB di Galaxia.";
ACMsg.GALAXIA_LED_CONSTRUCTOR = "Crea un oggetto <b>Led</b>.";
ACMsg.GALAXIA_LED_SET_COLORS = "Imposta il colore del LED usando i valori <b>red</b>, <b>green</b>, <b>blue</b> (0-255).";
ACMsg.GALAXIA_LED_SET_RED = "Imposta il valore del canale rosso (0-255).";
ACMsg.GALAXIA_LED_SET_GREEN = "Imposta il valore del canale verde (0-255).";
ACMsg.GALAXIA_LED_SET_BLUE = "Imposta il valore del canale blu (0-255).";
ACMsg.GALAXIA_LED_GET_RED = "Restituisce il valore attuale del canale rosso (0-255).";
ACMsg.GALAXIA_LED_GET_GREEN = "Restituisce il valore attuale del canale verde (0-255).";
ACMsg.GALAXIA_LED_GET_BLUE = "Restituisce il valore attuale del canale blu (0-255).";
ACMsg.GALAXIA_LED_READ_LIGHT_LEVEL = "Restituisce il livello di luce ambientale (0 = buio, 100 = luminoso).";
ACMsg.GALAXIA_THINGZ_LOG_MODULE = "Modulo Thingz per il data logger interno.";
ACMsg.GALAXIA_LOG_CLASS = "Salva i dati nella memoria interna di Galaxia come CSV (esportato su USB come data.csv all'avvio).";
ACMsg.GALAXIA_LOG_CONSTRUCTOR = "Crea un oggetto <b>Log</b>.";
ACMsg.GALAXIA_LOG_ADD = "Aggiunge una riga al log. I dati sono una lista di tuple: (column_name, value).";
ACMsg.GALAXIA_LOG_DELETE = "Cancella tutti i dati salvati nel log.";
ACMsg.GALAXIA_LOG_SET_COLUMNS = "Definisce le colonne CSV (reimposta il log ogni volta che le colonne vengono ridefinite).";
ACMsg.GALAXIA_THINGZ_RADIO_MODULE = "Modulo Thingz radio.";
ACMsg.GALAXIA_RADIO_CLASS = "Invia e riceve messaggi tra schede.";
ACMsg.GALAXIA_RADIO_CONSTRUCTOR = "Crea un oggetto <b>Radio</b>.";
ACMsg.GALAXIA_RADIO_SEND = "Trasmette un messaggio stringa alle schede vicine sullo stesso canale.";
ACMsg.GALAXIA_RADIO_RECEIVE = "Attende e restituisce il messaggio ricevuto.";
ACMsg.GALAXIA_RADIO_SET_CHANEL = "Imposta il canale radio (da 1 a 10).";
ACMsg.GALAXIA_RADIO_GET_CHANNEL = "Restituisce il canale radio corrente.";
ACMsg.GALAXIA_RADIO_GET_MAC = "Restituisce l'indirizzo MAC radio come byte.";
ACMsg.GALAXIA_THINGZ_SOUND_MODULE = "Modulo Thingz audio.";
ACMsg.GALAXIA_SOUND_CLASS = "Riproduce l'audio tramite il connettore jack di Galaxia.";
ACMsg.GALAXIA_SOUND_CONSTRUCTOR = "Crea un oggetto <b>Sound</b>.";
ACMsg.GALAXIA_SOUND_PLAY = "Abilita/disabilita la generazione di frequenza sul jack e imposta la frequenza (Hz).";
ACMsg.GALAXIA_SOUND_SET_FREQUENCY = "Imposta la frequenza di uscita in Hz.";
ACMsg.GALAXIA_SOUND_SET_VOLUME = "Imposta il volume (0 a 100).";
ACMsg.GALAXIA_SOUND_PLAY_SAMPLE = "Riproduce un campione WAV dal percorso file indicato.";
ACMsg.GALAXIA_THINGZ_DISPLAY_MODULE = "Modulo display di Thingz.";
ACMsg.GALAXIA_DISPLAY_CLASS = "Controlla il display LCD di Galaxia.";
ACMsg.GALAXIA_DISPLAY_CONSTRUCTOR = "Crea un oggetto <b>Display</b>.";
ACMsg.GALAXIA_DISPLAY_PLOT = "Interfaccia plot (istanza di <b>Plot</b>).";
ACMsg.GALAXIA_DISPLAY_CONSOLE = "Interfaccia console che mostra l'output REPL (istanza di <b>Console</b>).";
ACMsg.GALAXIA_DISPLAY_RAW = "Interfaccia grafica raw (istanza di <b>Raw</b>).";
ACMsg.GALAXIA_THINGZ_DISPLAY_CONSOLE_MODULE = "Sottomodulo console del display di Thingz.";
ACMsg.GALAXIA_CONSOLE_CLASS = "Mostra l'output REPL sullo schermo.";
ACMsg.GALAXIA_CONSOLE_CONSTRUCTOR = "Crea un oggetto <b>Console</b>.";
ACMsg.GALAXIA_CONSOLE_SHOW = "Mostra il REPL sul display.";
ACMsg.GALAXIA_THINGZ_DISPLAY_PLOT_MODULE = "Sottomodulo plot del display di Thingz.";
ACMsg.GALAXIA_PLOT_CLASS = "Usa il display LCD come plot.";
ACMsg.GALAXIA_PLOT_CONSTRUCTOR = "Crea un oggetto <b>Plot</b>.";
ACMsg.GALAXIA_PLOT_SHOW = "Mostra il plot sul display.";
ACMsg.GALAXIA_PLOT_ADD_POINT = "Aggiunge un nuovo punto al plot (valore Y).";
ACMsg.GALAXIA_PLOT_SET_Y_SCALE = "Imposta la scala Y con i valori minimo e massimo.";
ACMsg.GALAXIA_PLOT_SET_ANIMATE_FUNCTION = "Configura una funzione chiamata ogni <b>interval</b> secondi per aggiungere un punto.";
ACMsg.GALAXIA_THINGZ_DISPLAY_RAW_MODULE = "Sottomodulo grafica raw del display di Thingz.";
ACMsg.GALAXIA_RAW_CLASS = "Usa il display LCD per mostrare elementi grafici.";
ACMsg.GALAXIA_RAW_CONSTRUCTOR = "Crea un oggetto <b>Raw</b>.";
ACMsg.GALAXIA_RAW_SHOW = "Mostra l'interfaccia grafica raw.";
ACMsg.GALAXIA_RAW_PRINT = "Stampa il testo <b>txt</b> alla posizione (<b>x</b>, <b>y</b>).";
ACMsg.GALAXIA_RAW_PRINT_BMP = "Visualizza un file BMP situato in <b>path</b> alla posizione (<b>x</b>, <b>y</b>).";
ACMsg.GALAXIA_IMG_CLASS = "Elemento immagine per l'interfaccia raw.";
ACMsg.GALAXIA_IMG_CONSTRUCTOR = "Crea un elemento immagine da un file BMP e lo visualizza.";
ACMsg.GALAXIA_IMG_SHOW = "Mostra/nasconde l'immagine.";
ACMsg.GALAXIA_IMG_X = "Imposta la posizione x.";
ACMsg.GALAXIA_IMG_Y = "Imposta la posizione y.";
ACMsg.GALAXIA_IMG_WHITE_REPLACEMENT_COLOR = "Sostituisce i pixel bianchi con un colore specificato.";
ACMsg.GALAXIA_IMG_GET_SHOW = "Restituisce <b>True</b> se l'immagine è visibile.";
ACMsg.GALAXIA_IMG_GET_X = "Restituisce la posizione x.";
ACMsg.GALAXIA_IMG_GET_Y = "Restituisce la posizione y.";
ACMsg.GALAXIA_IMG_GET_WIDTH = "Restituisce la larghezza dell'immagine.";
ACMsg.GALAXIA_IMG_GET_HEIGHT = "Restituisce l'altezza dell'immagine.";
ACMsg.GALAXIA_IMG_GET_WHITE_REPLACEMENT = "Restituisce il colore attuale usato per sostituire il bianco.";
ACMsg.GALAXIA_RECT_CLASS = "Elemento rettangolo per l'interfaccia raw.";
ACMsg.GALAXIA_RECT_CONSTRUCTOR = "Crea un elemento rettangolo e lo visualizza.";
ACMsg.GALAXIA_RECT_SHOW = "Mostra/nasconde il rettangolo.";
ACMsg.GALAXIA_RECT_X = "Imposta la posizione x.";
ACMsg.GALAXIA_RECT_Y = "Imposta la posizione y.";
ACMsg.GALAXIA_RECT_COLOR = "Imposta il colore del rettangolo.";
ACMsg.GALAXIA_RECT_GET_SHOW = "Restituisce <b>True</b> se il rettangolo è visibile.";
ACMsg.GALAXIA_RECT_GET_X = "Restituisce la posizione x.";
ACMsg.GALAXIA_RECT_GET_Y = "Restituisce la posizione y.";
ACMsg.GALAXIA_RECT_GET_WIDTH = "Restituisce la larghezza del rettangolo.";
ACMsg.GALAXIA_RECT_GET_HEIGHT = "Restituisce l'altezza del rettangolo.";
ACMsg.GALAXIA_RECT_GET_COLOR = "Restituisce il colore del rettangolo.";
ACMsg.GALAXIA_TEXT_CLASS = "Elemento testo per l'interfaccia raw.";
ACMsg.GALAXIA_TEXT_CONSTRUCTOR = "Crea un elemento testo e lo visualizza.";
ACMsg.GALAXIA_TEXT_SHOW = "Mostra/nasconde il testo.";
ACMsg.GALAXIA_TEXT_X = "Imposta la posizione x.";
ACMsg.GALAXIA_TEXT_Y = "Imposta la posizione y.";
ACMsg.GALAXIA_TEXT_SET_TEXT = "Imposta il testo mostrato.";
ACMsg.GALAXIA_TEXT_GET_SHOW = "Restituisce <b>True</b> se il testo è visibile.";
ACMsg.GALAXIA_TEXT_GET_X = "Restituisce la posizione x.";
ACMsg.GALAXIA_TEXT_GET_Y = "Restituisce la posizione y.";
ACMsg.GALAXIA_TEXT_GET_WIDTH = "Restituisce la larghezza del testo.";
ACMsg.GALAXIA_TEXT_GET_HEIGHT = "Restituisce l'altezza del testo.";
ACMsg.GALAXIA_TEXT_GET_COLOR = "Restituisce il colore del testo.";
ACMsg.GALAXIA_TEXT_GET_TEXT = "Restituisce il testo corrente (nota: la documentazione segnala int).";
