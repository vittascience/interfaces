/**
 * @fileoverview Italian messages for Python. (IT)
 */

'use strict';

// Display - console.
Blockly.Msg['DISPLAY_PRINT_TITLE'] = 'print %1';
Blockly.Msg['DISPLAY_PRINT_TOOLTIP'] = 'Print block content in python console.';
Blockly.Msg['DISPLAY_INPUT_TITLE'] = 'request user for a text with %1';
Blockly.Msg['DISPLAY_INPUT_TOOLTIP'] = 'Request user to input a value as text in python console.';
Blockly.Msg['DISPLAY_INPUT_NUMBER_TITLE'] = 'request user for a number with %1';
Blockly.Msg['DISPLAY_INPUT_NUMBER_TOOLTIP'] = 'Request user to input a value as float number in python console.';
// Display - time
Blockly.Msg['TIME_SLEEP_TITLE'] = '[time] wait %1 %2';
Blockly.Msg['TIME_SLEEP_TOOLTIP'] = 'Stop the code execution (duration in seconds or milliseconds).';
Blockly.Msg['TIME_SLEEP_SECOND'] = 'second(s)';
Blockly.Msg['TIME_SLEEP_MILLISECOND'] = 'millisecond(s)';
Blockly.Msg['TIME_SLEEP_MICROSECOND'] = 'microsecond(s)';
Blockly.Msg['TIME_TIME_TITLE'] = 'Avere l\'ora corrente in secondi';
Blockly.Msg['TIME_WAIT_UNTIL_TITLE'] = '[time] wait until %1';
Blockly.Msg['TIME_WAIT_UNTIL_TOOLTIP'] = 'Stop the code execution until the satisfied condition.';
Blockly.Msg['TIME_INITCHRONOMETER_TITLE'] = '[time] initialize the chronometer';
Blockly.Msg['TIME_INITCHRONOMETER_TOOLTIP'] = 'Allows you to initialize the chronometer (in seconds).';
Blockly.Msg['TIME_GETCHRONOMETER_TITLE'] = '[time] get chronometer in %1';
Blockly.Msg['TIME_GETCHRONOMETER_TOOLTIP'] = 'Returns the chronometer value from the initialization in seconds or milliseconds.';
Blockly.Msg['TIME_GET_DATE_TITLE'] = '[time] get date and clock';
Blockly.Msg['TIME_GET_DATE_TOOLTIP'] = 'Returns formatted date and clock in string.';

// Turtle blocks.
Blockly.Msg['TURTLE_DIRECTION_TITLE'] = 'move %1 by %2';
Blockly.Msg['TURTLE_DIRECTION_FORWARD'] = 'forward';
Blockly.Msg['TURTLE_DIRECTION_BACKWARD'] = 'backward';
Blockly.Msg['TURTLE_DIRECTION_TOOLTIP'] = 'Move by specifying the direction and the distance.';
Blockly.Msg['TURTLE_TURN_TITLE'] = 'turn %1 by %2°';
Blockly.Msg['TURTLE_TURN_RIGHT'] = 'right ↻';
Blockly.Msg['TURTLE_TURN_LEFT'] = 'left ↺';
Blockly.Msg['TURTLE_TURN_TOOLTIP'] = 'Turn by specifying the value of the angle.';
Blockly.Msg['TURTLE_GOTO_TITLE'] = 'go to position x %1 y %2';
Blockly.Msg['TURTLE_GOTO_TOOLTIP'] = 'Go to specified absciss and ordinate.';
Blockly.Msg['TURTLE_CIRCLE_TITLE'] = 'draw circle of radius %1';
Blockly.Msg['TURTLE_CIRCLE_TOOLTIP'] = 'Create a circle by specifying the radius.';
Blockly.Msg['TURTLE_ARC_TITLE'] = 'draw circle of radius %1 and angle %2°';
Blockly.Msg['TURTLE_ARC_TOOLTIP'] = 'Create an arc by specifying the radius and the angle.';
Blockly.Msg['TURTLE_WRITE_TITLE'] = 'write %1 fontsize %2';
Blockly.Msg['TURTLE_WRITE_TOOLTIP'] = 'Write text with specified fontsize.';
Blockly.Msg['TURTLE_FILL_TITLE'] = 'fill with color %1';
Blockly.Msg['TURTLE_FILL_TOOLTIP'] = 'Fill drawing with color';
Blockly.Msg['TURTLE_SHAPE_TITLE'] = 'set shape %1';
Blockly.Msg['TURTLE_SHAPE_TURTLE'] = 'turtle 🐢';
Blockly.Msg['TURTLE_SHAPE_CIRCLE'] = 'circle ⚫';
Blockly.Msg['TURTLE_SHAPE_CLASSIC'] = 'classic ➤';
Blockly.Msg['TURTLE_SHAPE_SQUARE'] = 'square ⬛';
Blockly.Msg['TURTLE_SHAPE_TRIANGLE'] = 'triangle ▶';
Blockly.Msg['TURTLE_SHAPE_TOOLTIP'] = 'Select the shape of the cursor';
Blockly.Msg['TURTLE_COLOR_TITLE'] = 'set color %1 width %2';
Blockly.Msg['TURTLE_COLOR_TOOLTIP'] = 'Color and width of the lines';
Blockly.Msg['TURTLE_PEN_TITLE'] = 'put pen %1';
Blockly.Msg['TURTLE_PEN_TOOLTIP'] = 'Put pen up or down to draw lines';
Blockly.Msg['TURTLE_PEN_UP'] = 'up';
Blockly.Msg['TURTLE_PEN_DOWN'] = 'down';
Blockly.Msg['TURTLE_VISIBILITY_TITLE'] = '%1 the turtle';
Blockly.Msg['TURTLE_VISIBILITY_TOOLTIP'] = 'Specify the visibility of the turtle';
Blockly.Msg['TURTLE_VISIBILITY_SHOW'] = 'show';
Blockly.Msg['TURTLE_VISIBILITY_HIDE'] = 'hide';
Blockly.Msg['TURTLE_STAMP_TITLE'] = 'stamp the turtle';
Blockly.Msg['TURTLE_STAMP_TOOLTIP'] = 'Stamp the cursor at the current position';
Blockly.Msg['TURTLE_SPEED_TITLE'] = 'set speed %1';
Blockly.Msg['TURTLE_SPEED_TOOLTIP'] = 'Specify the speed of the turtle';
Blockly.Msg['TURTLE_RESET_TITLE'] = 'reset the drawing';
Blockly.Msg['TURTLE_COLOR'] = 'imposta il colore %1';
Blockly.Msg['TURTLE_WIDTH'] = 'imposta larghezza %1';
Blockly.Msg['TURTLE_FILLCOLOR'] = 'riempire con il colore %1';
Blockly.Msg['TURTLE_FILLBEGIN'] = 'inizia il riempimento';
Blockly.Msg['TURTLE_FILLEND'] = 'termina il riempimento';
Blockly.Msg['TURTLE_SCREEN_SETUP_TITLE'] = 'dimensione della tela %1 x %2';
Blockly.Msg['TURTLE_SCREEN_SETUP_TOOLTIP'] = 'Imposta la dimensione della tela.';
Blockly.Msg['TURTLE_SCREEN_COLOR_TITLE'] = 'colore di sfondo della tela %1';
Blockly.Msg['TURTLE_SCREEN_COLOR_TOOLTIP'] = 'Imposta il colore di sfondo della tela.';

// Numpy blocks.
Blockly.Msg['NUMPY_ARANGE_TITLE'] = 'aranged table from %1 to %2 by step %3';
Blockly.Msg['NUMPY_ARANGE_TOOLTIP'] = 'Returns an array aranged from min to max by step.';
Blockly.Msg['NUMPY_LINSPACE_TITLE'] = 'aranged table from %1 to %2 with %3 values';
Blockly.Msg['NUMPY_LINSPACE_TOOLTIP'] = 'Returns an array aranged from min to max with number of items choosen.';
Blockly.Msg['NUMPY_TABLE_WITH_SHAPE_TITLE'] = 'table size %1 * %2 with item %3';
Blockly.Msg['NUMPY_TABLE_WITH_SHAPE_TOOLTIP'] = 'Initialize table with shape [i*j] with one item';
Blockly.Msg['NUMPY_CREATE_TABLE_WITH_TOOLTIP'] = 'Initialize table with any number of items';
Blockly.Msg['NUMPY_CREATE_TABLE_WITH_INPUT_TITLE'] = 'create table with';
Blockly.Msg['NUMPY_CREATE_TABLE_WITH_INPUT_TOOLTIP'] = 'Create a table with any number of items.';
Blockly.Msg['NUMPY_CREATE_TABLE_EMPTY_TITLE'] = 'create empty table';
Blockly.Msg['NUMPY_CREATE_TABLE_EMPTY_TOOLTIP'] = 'Returns a table, of length 0, containing no data records';
Blockly.Msg['NUMPY_SQUARE_MATRIX_TITLE'] = 'matrix with items';
Blockly.Msg['NUMPY_SQUARE_MATRIX_TOOLTIP'] = 'Initialize square matrix of any type, from size 2 to 10.';
Blockly.Msg['NUMPY_SIZESHAPE_TITLE'] = '%1 of %2';
Blockly.Msg['NUMPY_SIZESHAPE_TOOLTIP'] = 'Returns size or shape of numpy table.';
Blockly.Msg['NUMPY_SIZE'] = 'size';
Blockly.Msg['NUMPY_SHAPE'] = 'shape';
Blockly.Msg['NUMPY_GET_ELEMENT_MATRIX_TITLE'] = 'get item [%1, %2] of %3';
Blockly.Msg['NUMPY_GET_ELEMENT_MATRIX_TOOLTIP'] = 'Get item [i,j] from numpy array.';
Blockly.Msg['NUMPY_GET_ELEMENT_LIST_TITLE'] = 'get item [%1] of %2';
Blockly.Msg['NUMPY_GET_ELEMENT_LIST_TOOLTIP'] = 'Get item [i] from numpy array.';

// Graph blocks.
Blockly.Msg['GRAPH_PLOT_TITLE'] = 'plot %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_PLOT_TOOLTIP'] = 'Plot graph in Python console.';
Blockly.Msg['GRAPH_SCATTER_TITLE'] = 'plot scatter %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_SCATTER_TOOLTIP'] = 'Plot scatter in Python console.';
Blockly.Msg['GRAPH_BAR_TITLE'] = 'plot bar %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_BAR_TOOLTIP'] = 'Plot bar in Python console.';
Blockly.Msg['GRAPH_HIST_TITLE'] = 'plot histogram %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_HIST_TOOLTIP'] = 'Plot histogram in Python console.';
Blockly.Msg['GRAPH_SETLABEL_TITLE'] = 'define title %1 xlabel %2 ylabel %3';
Blockly.Msg['GRAPH_SETLABEL_TOOLTIP'] = 'Define title of graph and labels of xaxis and yaxis.';
Blockly.Msg['GRAPH_LEGEND_TITLE'] = 'set legend %1 location %2';
Blockly.Msg['GRAPH_LEGEND_TOOLTIP'] = 'Enable legend for plot(s)';
Blockly.Msg['GRAPH_SHOW_TITLE'] = 'show graph';
Blockly.Msg['GRAPH_SHOW_TOOLTIP'] = 'Show graph';
Blockly.Msg['GRAPH_SUBPLOT_TITLE'] = 'subplot %1 row %2 col %3 index %4';
Blockly.Msg['GRAPH_SUBPLOT_TOOLTIP'] = 'Subplot a graph in Python console.';
Blockly.Msg['GRAPH_GRID_TITLE'] = 'show grid';
Blockly.Msg['GRAPH_GRID_TOOLTIP'] = 'Show a grid on plot';
Blockly.Msg['GRAPH_TEXT_TITLE'] = 'display text %1 pos. x %2 pos. y %3 text %4';
Blockly.Msg['GRAPH_TEXT_TOOLTIP'] = 'Display a text on plot';
Blockly.Msg['GRAPH_SET_TITLE'] = 'definire titolo %1';
Blockly.Msg['GRAPH_SET_X_TITLE'] = 'xlabel %1';
Blockly.Msg['GRAPH_SET_Y_TITLE'] = 'ylabel %1';
Blockly.Msg['GRAPH_CREATE_PLOT_TITLE'] = 'creare un grafico con %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_CREATE_SCATTER_TITLE'] = 'creare un grafico a dispersione con %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_CREATE_BAR_TITLE'] = 'creare un grafico a barre con %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_PLOT'] = 'mostra grafico';

// Vittaia blocks. AST Python <-> Blocks
Blockly.Msg['VITTAIA_INIT_MODEL'] = 'Avvia il modello';
Blockly.Msg['VITTAIA_WEBCAM_REFRESH'] = 'Avvia la webcam';
Blockly.Msg['VITTAIA_SELECT_CAMERA'] = 'Seleziona la telecamera';
Blockly.Msg['VITTAIA_CAPTURE'] = 'Cattura la webcam';
Blockly.Msg['VITTAIA_PREDICT'] = 'Predire il modello %1';
Blockly.Msg['VITTAIA_INIT_SOUND'] = 'Avvia il modello sonoro';
Blockly.Msg['VITTAIA_INIT_MICRO'] = 'Avvia il modello micro';

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
Blockly.Msg['VITTAIA_INIT_MODEL'] = '%1 inizializza il modello';
Blockly.Msg['VITTAIA_INIT_WEBCAM'] = '%1 inizializza la fotocamera';
Blockly.Msg['VITTAIA_INIT_SOUND'] = '%1 inizializza il modello audio';
Blockly.Msg['VITTAIA_INIT_MICRO_VAR'] = '%1 inizializza la variabile del microfono';
Blockly.Msg['VITTAIA_INIT_MICRO'] = '%1 inizializza il microfono';
Blockly.Msg['VITTAIA_SELECT_CAMERA'] = '%1 seleziona la fotocamera %2';
Blockly.Msg['VITTAIA_DISPLAY_CAMERA'] = '%1 aggiorna la fotocamera';
Blockly.Msg['VITTAIA_CAPTURE'] = 'immagine della fotocamera';
Blockly.Msg['VITTAIA_PREDICT'] = '%1 esegui rilevamento su %2';
Blockly.Msg['VITTAIA_GET_BEST_PROBALITY_CLASS'] = Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE'];

// Exception
Blockly.Msg['EXCEPTION_RAISE_TOOLTIP'] = 'solleva un\'eccezione';
Blockly.Msg['EXCEPTION_EXCEPTION_TOOLTIP'] = 'crea un\'eccezione';
Blockly.Msg['EXCEPTION_TYPE_TOOLTIP'] = 'Tutti i tipi di eccezioni possibili';
Blockly.Msg['EXCEPTION_TRY_TOOLTIP'] = 'Esegue un blocco di codice e consente di gestire le eccezioni';

// Other Block
Blockly.Msg['OTHER_AST_RAW'] = 'Codice non tradotto';
