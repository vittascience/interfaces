/**
 * @fileoverview Italian messages for Python. (IT)
 */

'use strict';

// Display - console.
Blockly.Msg["DISPLAY_PRINT_TITLE"] = "stampa %1";
Blockly.Msg["DISPLAY_PRINT_TOOLTIP"] = "Stampa il contenuto del blocco nella console di Python.";
Blockly.Msg["DISPLAY_INPUT_TITLE"] = "richiedi all'utente un testo con %1";
Blockly.Msg["DISPLAY_INPUT_TOOLTIP"] = "Richiedi all'utente di inserire un valore come testo nella console di Python.";
Blockly.Msg["DISPLAY_INPUT_NUMBER_TITLE"] = "richiedi all'utente un numero con %1";
Blockly.Msg["DISPLAY_INPUT_NUMBER_TOOLTIP"] = "Richiedi all'utente di inserire un valore come numero in virgola mobile nella console di Python.";
// Display - time
Blockly.Msg["TIME_SLEEP_TITLE"] = "[time] attendi %1 %2";
Blockly.Msg["TIME_SLEEP_TOOLTIP"] = "Sospende l'esecuzione del codice (durata in secondi o millisecondi).";
Blockly.Msg["TIME_SLEEP_SECOND"] = "secondo(i)";
Blockly.Msg["TIME_SLEEP_MILLISECOND"] = "millisecondo(i)";
Blockly.Msg["TIME_SLEEP_MICROSECOND"] = "microsecondo(i)";
Blockly.Msg['TIME_TIME_TITLE'] = 'Avere l\'ora corrente in secondi';
Blockly.Msg["TIME_WAIT_UNTIL_TITLE"] = "[time] attendi finché %1";
Blockly.Msg["TIME_WAIT_UNTIL_TOOLTIP"] = "Sospende l'esecuzione del codice fino a quando la condizione non è soddisfatta.";
Blockly.Msg["TIME_INITCHRONOMETER_TITLE"] = "[time] inizializza il cronometro";
Blockly.Msg["TIME_INITCHRONOMETER_TOOLTIP"] = "Consente di inizializzare il cronometro (in secondi).";
Blockly.Msg["TIME_GETCHRONOMETER_TITLE"] = "[time] ottieni il cronometro in %1";
Blockly.Msg["TIME_GETCHRONOMETER_TOOLTIP"] = "Restituisce il valore del cronometro dall'inizializzazione, in secondi o millisecondi.";
Blockly.Msg["TIME_GET_DATE_TITLE"] = "[time] ottieni data e ora";
Blockly.Msg["TIME_GET_DATE_TOOLTIP"] = "Restituisce data e ora formattate come stringa.";

// Turtle blocks.
Blockly.Msg["TURTLE_DIRECTION_TITLE"] = "muovi %1 di %2";
Blockly.Msg["TURTLE_DIRECTION_FORWARD"] = "avanti";
Blockly.Msg["TURTLE_DIRECTION_BACKWARD"] = "indietro";
Blockly.Msg["TURTLE_DIRECTION_TOOLTIP"] = "Sposta specificando direzione e distanza.";
Blockly.Msg["TURTLE_TURN_TITLE"] = "ruota %1 di %2°";
Blockly.Msg["TURTLE_TURN_RIGHT"] = "destra ↻";
Blockly.Msg["TURTLE_TURN_LEFT"] = "sinistra ↺";
Blockly.Msg["TURTLE_TURN_TOOLTIP"] = "Ruota specificando il valore dell'angolo.";
Blockly.Msg["TURTLE_GOTO_TITLE"] = "vai alla posizione x %1 y %2";
Blockly.Msg["TURTLE_GOTO_TOOLTIP"] = "Vai alla posizione specificata (ascissa e ordinata).";
Blockly.Msg["TURTLE_CIRCLE_TITLE"] = "disegna un cerchio di raggio %1";
Blockly.Msg["TURTLE_CIRCLE_TOOLTIP"] = "Disegna un cerchio specificando il raggio.";
Blockly.Msg["TURTLE_ARC_TITLE"] = "disegna un arco di cerchio di raggio %1 e angolo %2°";
Blockly.Msg["TURTLE_ARC_TOOLTIP"] = "Disegna un arco specificando raggio e angolo.";
Blockly.Msg["TURTLE_WRITE_TITLE"] = "scrivi %1 dimensione carattere %2";
Blockly.Msg["TURTLE_WRITE_TOOLTIP"] = "Scrive il testo con la dimensione di carattere specificata.";
Blockly.Msg["TURTLE_FILL_TITLE"] = "riempi con il colore %1";
Blockly.Msg["TURTLE_FILL_TOOLTIP"] = "Riempi il disegno con il colore.";
Blockly.Msg["TURTLE_SHAPE_TITLE"] = "imposta la forma %1";
Blockly.Msg["TURTLE_SHAPE_TURTLE"] = "tartaruga 🐢";
Blockly.Msg["TURTLE_SHAPE_CIRCLE"] = "cerchio ⚫";
Blockly.Msg["TURTLE_SHAPE_CLASSIC"] = "classico ➤";
Blockly.Msg["TURTLE_SHAPE_SQUARE"] = "quadrato ⬛";
Blockly.Msg['TURTLE_SHAPE_TRIANGLE'] = 'triangle ▶';
Blockly.Msg["TURTLE_SHAPE_TOOLTIP"] = "Seleziona la forma del cursore";
Blockly.Msg["TURTLE_COLOR_TITLE"] = "imposta colore %1 e larghezza %2";
Blockly.Msg["TURTLE_COLOR_TOOLTIP"] = "Colore e spessore delle linee";
Blockly.Msg["TURTLE_PEN_TITLE"] = "posiziona penna %1";
Blockly.Msg["TURTLE_PEN_TOOLTIP"] = "Alza o abbassa la penna per disegnare linee";
Blockly.Msg['TURTLE_PEN_UP'] = 'up';
Blockly.Msg["TURTLE_PEN_DOWN"] = "giù";
Blockly.Msg["TURTLE_VISIBILITY_TITLE"] = "%1 la tartaruga";
Blockly.Msg["TURTLE_VISIBILITY_TOOLTIP"] = "Specifica la visibilità della tartaruga";
Blockly.Msg["TURTLE_VISIBILITY_SHOW"] = "mostra";
Blockly.Msg["TURTLE_VISIBILITY_HIDE"] = "nascondi";
Blockly.Msg["TURTLE_STAMP_TITLE"] = "stampa la tartaruga";
Blockly.Msg["TURTLE_STAMP_TOOLTIP"] = "Crea un'impronta del cursore nella posizione corrente.";
Blockly.Msg["TURTLE_SPEED_TITLE"] = "imposta velocità %1";
Blockly.Msg["TURTLE_SPEED_TOOLTIP"] = "Specifica la velocità della tartaruga";
Blockly.Msg["TURTLE_RESET_TITLE"] = "azzera il disegno";
Blockly.Msg['TURTLE_COLOR'] = 'imposta il colore %1';
Blockly.Msg['TURTLE_WIDTH'] = 'imposta larghezza %1';
Blockly.Msg['TURTLE_FILLCOLOR'] = 'riempire con il colore %1';
Blockly.Msg['TURTLE_FILLBEGIN'] = 'inizia il riempimento';
Blockly.Msg['TURTLE_FILLEND'] = 'termina il riempimento';
Blockly.Msg['TURTLE_SCREEN_SETUP_TITLE'] = 'dimensione della tela %1 x %2';
Blockly.Msg['TURTLE_SCREEN_SETUP_TOOLTIP'] = 'Imposta la dimensione della tela.';
Blockly.Msg['TURTLE_SCREEN_COLOR_TITLE'] = 'colore di sfondo della tela %1';
Blockly.Msg['TURTLE_SCREEN_COLOR_TOOLTIP'] = 'Imposta il colore di sfondo della tela.';
Blockly.Msg['TURTLE_SCREEN_PICTURE_TITLE'] = 'immagine di sfondo del canvas %1';
Blockly.Msg['TURTLE_SCREEN_PICTURE_TOOLTIP'] = 'Imposta un\'immagine di sfondo per il canvas.';
Blockly.Msg['TURTLE_SCREEN_PICTURE_MAZE'] = 'labirinto';
Blockly.Msg['TURTLE_SCREEN_PICTURE_GRID'] = 'griglia';
Blockly.Msg['TURTLE_SCREEN_PICTURE_VITTASCIENCE'] = 'vittascience';

// Numpy blocks.
Blockly.Msg["NUMPY_ARANGE_TITLE"] = "array da %1 a %2 con passo %3";
Blockly.Msg["NUMPY_ARANGE_TOOLTIP"] = "Restituisce un array dal valore minimo al valore massimo con il passo specificato.";
Blockly.Msg["NUMPY_LINSPACE_TITLE"] = "array da %1 a %2 con %3 valori";
Blockly.Msg["NUMPY_LINSPACE_TOOLTIP"] = "Restituisce un array dal minimo al massimo con il numero di elementi scelto.";
Blockly.Msg["NUMPY_TABLE_WITH_SHAPE_TITLE"] = "tabella di dimensione %1 x %2 con elemento %3";
Blockly.Msg["NUMPY_TABLE_WITH_SHAPE_TOOLTIP"] = "Inizializza una tabella con forma [i*j] con un unico elemento";
Blockly.Msg['NUMPY_CREATE_TABLE_WITH_TOOLTIP'] = 'Crea una tabella con un numero qualsiasi di elementi.';
Blockly.Msg['NUMPY_CREATE_TABLE_WITH_INPUT_TITLE'] = 'create table with';
Blockly.Msg["NUMPY_CREATE_TABLE_WITH_INPUT_TOOLTIP"] = "Crea una tabella con un numero qualsiasi di elementi.";
Blockly.Msg["NUMPY_CREATE_TABLE_EMPTY_TITLE"] = "crea tabella vuota";
Blockly.Msg["NUMPY_CREATE_TABLE_EMPTY_TOOLTIP"] = "Restituisce una tabella di lunghezza 0, senza record di dati";
Blockly.Msg['NUMPY_SQUARE_MATRIX_TITLE'] = 'matrix with items';
Blockly.Msg["NUMPY_SQUARE_MATRIX_TOOLTIP"] = "Inizializza una matrice quadrata di qualsiasi tipo, di dimensione da 2 a 10.";
Blockly.Msg['NUMPY_SIZESHAPE_TITLE'] = '%1 of %2';
Blockly.Msg["NUMPY_SIZESHAPE_TOOLTIP"] = "Restituisce la dimensione o la forma di un array NumPy.";
Blockly.Msg["NUMPY_SIZE"] = "dimensione";
Blockly.Msg["NUMPY_SHAPE"] = "forma";
Blockly.Msg["NUMPY_GET_ELEMENT_MATRIX_TITLE"] = "ottieni elemento [%1, %2] da %3";
Blockly.Msg["NUMPY_GET_ELEMENT_MATRIX_TOOLTIP"] = "Ottiene l'elemento [i,j] da un array NumPy.";
Blockly.Msg["NUMPY_GET_ELEMENT_LIST_TITLE"] = "ottieni elemento [%1] da %2";
Blockly.Msg["NUMPY_GET_ELEMENT_LIST_TOOLTIP"] = "Ottiene l'elemento [i] da un array NumPy.";

// Graph blocks.
Blockly.Msg["GRAPH_PLOT_TITLE"] = "traccia %1 asse x %2 asse y %3";
Blockly.Msg["GRAPH_PLOT_TOOLTIP"] = "Traccia un grafico nella console Python.";
Blockly.Msg["GRAPH_SCATTER_TITLE"] = "diagramma a dispersione %1 asse x %2 asse y %3";
Blockly.Msg["GRAPH_SCATTER_TOOLTIP"] = "Traccia un diagramma a dispersione nella console Python.";
Blockly.Msg["GRAPH_BAR_TITLE"] = "grafico a barre %1 asse x %2 asse y %3";
Blockly.Msg["GRAPH_BAR_TOOLTIP"] = "Traccia un grafico a barre nella console Python.";
Blockly.Msg["GRAPH_HIST_TITLE"] = "istogramma %1 asse x %2 asse y %3";
Blockly.Msg["GRAPH_HIST_TOOLTIP"] = "Traccia un istogramma nella console Python.";
Blockly.Msg["GRAPH_SETLABEL_TITLE"] = "imposta titolo %1 etichetta x %2 etichetta y %3";
Blockly.Msg["GRAPH_SETLABEL_TOOLTIP"] = "Imposta il titolo del grafico e le etichette degli assi x e y.";
Blockly.Msg["GRAPH_LEGEND_TITLE"] = "imposta legenda %1 posizione %2";
Blockly.Msg["GRAPH_LEGEND_TOOLTIP"] = "Abilita la legenda per i grafici.";
Blockly.Msg["GRAPH_SHOW_TITLE"] = "mostra grafico";
Blockly.Msg["GRAPH_SHOW_TOOLTIP"] = "Mostra il grafico";
Blockly.Msg["GRAPH_SUBPLOT_TITLE"] = "sotto-grafico %1 riga %2 colonna %3 indice %4";
Blockly.Msg["GRAPH_SUBPLOT_TOOLTIP"] = "Crea un sotto-grafico nella console Python.";
Blockly.Msg["GRAPH_GRID_TITLE"] = "mostra griglia";
Blockly.Msg["GRAPH_GRID_TOOLTIP"] = "Mostra la griglia sul grafico";
Blockly.Msg["GRAPH_TEXT_TITLE"] = "visualizza testo %1 pos. x %2 pos. y %3 testo %4";
Blockly.Msg["GRAPH_TEXT_TOOLTIP"] = "Visualizza un testo sul grafico";
Blockly.Msg['GRAPH_SET_TITLE'] = 'definire titolo %1';
Blockly.Msg['GRAPH_SET_X_TITLE'] = 'xlabel %1';
Blockly.Msg['GRAPH_SET_Y_TITLE'] = 'ylabel %1';
Blockly.Msg['GRAPH_CREATE_PLOT_TITLE'] = 'creare un grafico con %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_CREATE_SCATTER_TITLE'] = 'creare un grafico a dispersione con %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_CREATE_BAR_TITLE'] = 'creare un grafico a barre con %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_PLOT'] = 'mostra grafico';

// Vittaia blocks. AST Python <-> Blocks
Blockly.Msg['VITTAIA_INIT_MODEL'] = '%1 inizializza il modello';
Blockly.Msg['VITTAIA_WEBCAM_REFRESH'] = 'Avvia la webcam';
Blockly.Msg['VITTAIA_SELECT_CAMERA'] = '%1 seleziona la fotocamera %2';
Blockly.Msg['VITTAIA_CAPTURE'] = 'immagine della fotocamera';
Blockly.Msg['VITTAIA_PREDICT'] = '%1 esegui rilevamento su %2';
Blockly.Msg['VITTAIA_INIT_SOUND'] = '%1 inizializza il modello audio';
Blockly.Msg['VITTAIA_INIT_MICRO'] = '%1 inizializza il microfono';

// AI IMAGE
Blockly.Msg['VITTAIA_LOAD_MODEL_TITLE'] = '%1 caricare il modello di IA di immagini %2';
Blockly.Msg['VITTAIA_LOAD_MODEL_TOOLTIP'] = 'Carica il modello di IA di immagini passato come parametro. Il modello predefinito è per riconoscere gatti e cani. Puoi generare un nuovo modello dall\'interfaccia di "Allenamento IA" di Vittascience disponibile nella sezione Programmazione.';
Blockly.Msg['VITTAIA_LOAD_LOCAL_MODEL_TITLE'] = '%1 caricare il modello di IA di immagini locale';
Blockly.Msg['VITTAIA_LOAD_LOCAL_MODEL_TOOLTIP'] = 'Carica il modello di immagini già addestrato situato nella memoria locale del browser';
Blockly.Msg['VITTAIA_LOAD_MODEL_DEFAULT_TITLE'] = '%1 caricare il modello di IA di immagini %2';
Blockly.Msg['VITTAIA_LOAD_MODEL_DEFAULT_TOOLTIP'] = 'Carica un modello di immagini già addestrato. Cambia il modello utilizzando l\'opzione.';
Blockly.Msg['VITTAIA_MODEL_DOGS_CATS'] = "Cani e Gatti";
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_WEBCAM_TITLE'] = '%1 avviare la rilevazione sull\'immagine della telecamera';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_WEBCAM_TOOLTIP'] = 'Effettua le previsioni del modello dall\'immagine della telecamera. Una previsione include 2 elementi: la classe e la probabilità.';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_FILE_TITLE'] = '%1 avviare la rilevazione sull\'immagine importata';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_FILE_TOOLTIP'] = 'Effettua le previsioni del modello dall\'immagine importata. Una previsione include 2 elementi: la classe e la probabilità.';
Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE'] = '%1 classe rilevata';
Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TOOLTIP'] = 'Restituisce la classe associata al modello con la più alta probabilità di rilevamento.';
Blockly.Msg['VITTAIA_GET_CONFIDENCE_RATE_TITLE'] = '%1 tasso di fiducia';
Blockly.Msg['VITTAIA_GET_CONFIDENCE_RATE_TOOLTIP'] = 'Restituisce il tasso di fiducia della classe con la più alta probabilità.';
Blockly.Msg['VITTAIA_GET_PREDICTIONS_TITLE'] = '%1 previsioni';
Blockly.Msg['VITTAIA_GET_PREDICTIONS_TOOLTIP'] = 'Restituisce un array contenente tutte le previsioni del modello.';
Blockly.Msg['VITTAIA_DETECT_CLASS_TITLE'] = '%1 se la classe %2 %3 rilevata allora';
Blockly.Msg['VITTAIA_IS'] = "è";
Blockly.Msg['VITTAIA_ISNOT'] = "non è";
Blockly.Msg['VITTAIA_DETECT_CLASS_TOOLTIP'] = 'Avvia il rilevamento utilizzando un\'immagine della telecamera o un\'immagine importata per fare una previsione verifica se la classe indicata nel blocco è rilevata.';
Blockly.Msg['VITTAIA_IMAGE_UPLOADED_TITLE'] = '%1 immagine caricata';
Blockly.Msg['VITTAIA_IMAGE_UPLOADED_TOOLTIP'] = 'Permette di caricare un\'immagine dal computer per essere poi testata dal modello avviando un rilevamento. Premere l\'icona di \'Caricamento\' del blocco per aggiungere l\'immagine.';
Blockly.Msg['VITTAIA_WEBCAM_CAPTURE_TITLE'] = '%1 [telecamera] cattura';
Blockly.Msg['VITTAIA_WEBCAM_CAPTURE_TOOLTIP'] = 'Permette di effettuare una cattura con la telecamera del computer.';
Blockly.Msg['VITTAIA_WEBCAM_LIST_AVAILABLES_TITLE'] = '%1 [telecamera] elenco delle telecamere disponibili';
Blockly.Msg['VITTAIA_WEBCAM_LIST_AVAILABLES_TOOLTIP'] = 'Permette di elencare tutte le telecamere disponibili sul computer.';
Blockly.Msg['VITTAIA_WEBCAM_INIT_TITLE'] = '%1 [telecamera] selezionare la telecamera %2';
Blockly.Msg['VITTAIA_WEBCAM_INIT_TOOLTIP'] = 'Permette di inizializzare la telecamera del computer (default 0).';
Blockly.Msg['VITTAIA_WEBCAM_REFRESH_TITLE'] = '%1 [telecamera] aggiornare la telecamera';
Blockly.Msg['VITTAIA_WEBCAM_REFRESH_TOOLTIP'] = 'Permette di aggiornare la finestra della telecamera.';

// AI POSTURE
Blockly.Msg['VITTAIA_INIT_MODEL_POSTURE_TITLE'] = '%1 inizializza il modello di postura';
Blockly.Msg['VITTAIA_INIT_MODEL_POSTURE_TOOLTIP'] = 'Inizializza il modello di postura. Il modello predefinito è per il riconoscimento delle posture umane. Puoi generare un nuovo modello dall\'interfaccia "Addestramento IA" di Vittascience disponibile nella sezione Programmare.';
Blockly.Msg['VITTAIA_LOAD_POSTURE_MODEL_TITLE'] = '%1 carica il modello di postura %2';
Blockly.Msg['VITTAIA_LOAD_POSTURE_MODEL_TOOLTIP'] = 'Carica il modello passato come parametro';
Blockly.Msg['VITTAIA_INIT_WEBCAM_TITLE'] = '%1 inizializza la fotocamera';
Blockly.Msg['VITTAIA_INIT_WEBCAM_TOOLTIP'] = 'Inizializza la fotocamera selezionata.';
Blockly.Msg['VITTAIA_POSTURE_MAKE_PREDICTIONS_TITLE'] = '%1 esegui la previsione sull\'immagine della fotocamera';
Blockly.Msg['VITTAIA_POSTURE_MAKE_PREDICTIONS_TOOLTIP'] = 'Esegue le previsioni del modello di postura dalla webcam. Una previsione include 2 elementi: la classe e la probabilità.';
Blockly.Msg['VITTAIA_INIT_POSTURE_WEBCAM_TITLE'] = '%1 [fotocamera] inizializza la fotocamera';
Blockly.Msg['VITTAIA_INIT_POSTURE_WEBCAM_TOOLTIP'] = 'Inizializza la fotocamera (predefinita sulla porta 0)';
// AI SOUND
Blockly.Msg['VITTAIA_LOAD_SOUND_MODEL_TITLE'] = '%1 seleziona e inizializza il modello %2';
Blockly.Msg['VITTAIA_LOAD_SOUND_MODEL_TOOLTIP'] = 'Carica il modello passato come parametro';
Blockly.Msg['VITTAIA_INIT_MICROPHONE_TITLE'] = '%1 inizializza il microfono';
Blockly.Msg['VITTAIA_INIT_MICROPHONE_TOOLTIP'] = 'Inizializza il microfono del computer';
Blockly.Msg['VITTAIA_MAKE_SOUND_PREDICTIONS_TITLE'] = '%1 esegui il rilevamento dal suono del microfono';
Blockly.Msg['VITTAIA_MAKE_SOUND_PREDICTIONS_TOOLTIP'] = 'Avvia il rilevamento utilizzando il suono del microfono per effettuare una previsione';
Blockly.Msg['VITTAIA_LIST_MICROPHONES_TITLE'] = '%1 elenca i microfoni';
Blockly.Msg['VITTAIA_LIST_MICROPHONES_TOOLTIP'] = 'Elenca tutti i microfoni disponibili';
Blockly.Msg['VITTAIA_LIST_MICRTEXT_OPHONES_TOOLTIP'] = 'Elenca tutti i microfoni disponibili';
// AI TEXT
Blockly.Msg['VITTAIA_INIT_TEXT_AI_TITLE'] = '%1 inizializza il modello di testo';
Blockly.Msg['VITTAIA_INIT_TEXT_AI_TOOLTIP'] = 'Inizializza il modello di testo. Il modello predefinito è per il riconoscimento del testo. Puoi generare un nuovo modello dall\'interfaccia "Addestramento IA" di Vittascience disponibile nella sezione Programmare.';
Blockly.Msg['VITTAIA_INIT_DISCUSSION_TITLE'] = '%1 inizializza la conversazione';
Blockly.Msg['VITTAIA_INIT_DISCUSSION_TOOLTIP'] = 'Inizializza la conversazione con l\'IA. Il modello predefinito è per il riconoscimento del testo. Puoi generare un nuovo modello dall\'interfaccia "Addestramento IA" di Vittascience disponibile nella sezione Programmare.';
Blockly.Msg['VITTAIA_LOAD_DISCUSSION_TITLE'] = '%1 seleziona la conversazione %2';
Blockly.Msg['VITTAIA_LOAD_DISCUSSION_TOOLTIP'] = 'Carica la conversazione passata come parametro';
Blockly.Msg['VITTAIA_MODEL_TEXT_PREDICT_TITLE'] = '%1 esegui la previsione del testo %2';
Blockly.Msg['VITTAIA_MODEL_TEXT_PREDICT_TOOLTIP'] = 'Esegue la previsione del testo';
Blockly.Msg['VITTAIA_GET_AI_MESSAGE_TITLE'] = 'mostra la risposta dell\'IA';
Blockly.Msg['VITTAIA_GET_AI_MESSAGE_TOOLTIP'] = 'Mostra la risposta dell\'IA';
Blockly.Msg['VITTAIA_SET_RANDOMNESS_TITLE'] = '%1 imposta il livello di casualità %2 %';
Blockly.Msg['VITTAIA_SET_RANDOMNESS_TOOLTIP'] = 'Permette di impostare il livello di casualità della previsione';
Blockly.Msg['VITTAIA_SET_MODEL_IA_TITLE'] = '%1 imposta il modello IA %2';
Blockly.Msg['VITTAIA_SET_MODEL_IA_TOOLTIP'] = 'Permette di impostare il modello di intelligenza artificiale';

Blockly.Msg['VITTAIA_TEXT_MODEL_GPT-3.5_TURBO'] = 'gpt-3.5';
Blockly.Msg['VITTAIA_TEXT_MODEL_LLAMA_3.1'] = 'llama-v3.1';
Blockly.Msg['VITTAIA_TEXT_MODEL_LLAMA_3.3'] = 'llama-v3.3';
Blockly.Msg['VITTAIA_TEXT_MODEL_GPT_4'] = 'gpt-4o';
Blockly.Msg['VITTAIA_TEXT_MODEL_MIXTRAL'] = 'mixtral';
Blockly.Msg['VITTAIA_TEXT_MODEL_GPT_MINI'] = 'gpt-4o-mini';

// Vittaia blocks. AST Python <-> Blocks
Blockly.Msg['VITTAIA_INIT_WEBCAM'] = '%1 inizializza la fotocamera';
Blockly.Msg['VITTAIA_INIT_MICRO_VAR'] = '%1 inizializza la variabile del microfono';
Blockly.Msg['VITTAIA_DISPLAY_CAMERA'] = '%1 aggiorna la fotocamera';
Blockly.Msg['VITTAIA_GET_BEST_PROBALITY_CLASS'] = Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE'];

// Exception
Blockly.Msg['EXCEPTION_RAISE_TOOLTIP'] = 'solleva un\'eccezione';
Blockly.Msg['EXCEPTION_EXCEPTION_TOOLTIP'] = 'crea un\'eccezione';
Blockly.Msg['EXCEPTION_TYPE_TOOLTIP'] = 'Tutti i tipi di eccezioni possibili';
Blockly.Msg['EXCEPTION_TRY_TOOLTIP'] = 'Esegue un blocco di codice e consente di gestire le eccezioni';

// Other Block
Blockly.Msg['OTHER_AST_RAW'] = 'Codice non tradotto';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_FROM_URL_TITLE'] = '%1 avvia il rilevamento sull\'URL dell\'immagine %2';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_FROM_URL_TOOLTIP'] = 'Esegue previsioni del modello per l\'immagine scaricata da un URL. Una previsione ha due elementi: la classe e il livello di fiducia.';
