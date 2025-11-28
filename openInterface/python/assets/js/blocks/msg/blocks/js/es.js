/**
 * @fileoverview Spanish messages for Python. (ES)
 */

'use strict';

// Display - console.
Blockly.Msg['DISPLAY_PRINT_TITLE'] = 'imprimir %1';
Blockly.Msg['DISPLAY_PRINT_TOOLTIP'] = 'Imprimir el contenido del bloque en la consola de python';
Blockly.Msg['DISPLAY_INPUT_TITLE'] = 'Solicitar al usuario un texto con %1';
Blockly.Msg['DISPLAY_INPUT_TOOLTIP'] = 'Solicita al usuario que introduzca un valor como texto en la consola de python';
Blockly.Msg['DISPLAY_INPUT_NUMBER_TITLE'] = 'Solicitar al usuario un número con %1';
Blockly.Msg['DISPLAY_INPUT_NUMBER_TOOLTIP'] = 'Solicitar al usuario que introduzca un valor como número flotante en la consola de python';
// Display - time
Blockly.Msg['TIME_SLEEP_TITLE'] = '[tiempo] espera %1 %2';
Blockly.Msg['TIME_SLEEP_TOOLTIP'] = 'Detener la ejecución del código (duración en segundos o milisegundos)';
Blockly.Msg['TIME_SLEEP_SECOND'] = 'segundo(s)';
Blockly.Msg['TIME_SLEEP_MILLISECOND'] = 'milisegundo(s)';
Blockly.Msg['TIME_SLEEP_MICROSECOND'] = 'microsegundo(s)';
Blockly.Msg['TIME_TIME_TITLE'] = 'Tenga la hora actual en segundos';
Blockly.Msg['TIME_WAIT_UNTIL_TITLE'] = '[tiempo] de espera hasta %1';
Blockly.Msg['TIME_WAIT_UNTIL_TOOLTIP'] = 'Detener la ejecución del código hasta que se cumpla la condición';
Blockly.Msg['TIME_INITCHRONOMETER_TITLE'] = '[tiempo] inicializar el cronómetro';
Blockly.Msg['TIME_INITCHRONOMETER_TOOLTIP'] = 'Permite inicializar el cronómetro (en segundos)';
Blockly.Msg['TIME_GETCHRONOMETER_TITLE'] = '[tiempo] obtener cronómetro en %1';
Blockly.Msg['TIME_GETCHRONOMETER_TOOLTIP'] = 'Devuelve el valor del cronómetro desde la inicialización en segundos o milisegundos';
Blockly.Msg['TIME_GET_DATE_TITLE'] = '[time] get date and clock';
Blockly.Msg['TIME_GET_DATE_TOOLTIP'] = 'Devuelve la fecha y el reloj formateados en cadena';

// Turtle blocks.
Blockly.Msg['TURTLE_DIRECTION_TITLE'] = 'mueve %1 por %2';
Blockly.Msg['TURTLE_DIRECTION_FORWARD'] = 'hacia adelante';
Blockly.Msg['TURTLE_DIRECTION_BACKWARD'] = 'hacia atrás';
Blockly.Msg['TURTLE_DIRECTION_TOOLTIP'] = 'Muévete especificando la dirección y la distancia';
Blockly.Msg['TURTLE_TURN_TITLE'] = 'gira %1 en %2°';
Blockly.Msg['TURTLE_TURN_RIGHT'] = 'derecha ↻';
Blockly.Msg['TURTLE_TURN_LEFT'] = 'izquierda ↺';
Blockly.Msg['TURTLE_TURN_TOOLTIP'] = 'Gira especificando el valor del ángulo';
Blockly.Msg['TURTLE_GOTO_TITLE'] = 'ir a la posición x %1 y %2';
Blockly.Msg['TURTLE_GOTO_TOOLTIP'] = 'Ir a la abscisa y ordenada especificadas';
Blockly.Msg['TURTLE_CIRCLE_TITLE'] = 'dibujar círculo de radio %1';
Blockly.Msg['TURTLE_CIRCLE_TOOLTIP'] = 'Crea un círculo especificando el radio';
Blockly.Msg['TURTLE_ARC_TITLE'] = 'dibujar círculo de radio %1 y ángulo %2°';
Blockly.Msg['TURTLE_ARC_TOOLTIP'] = 'Crea un arco especificando el radio y el ángulo';
Blockly.Msg['TURTLE_WRITE_TITLE'] = 'escribir %1 tamaño de fuente %2';
Blockly.Msg['TURTLE_WRITE_TOOLTIP'] = 'Escribir texto con el tamaño de fuente especificado';
Blockly.Msg['TURTLE_FILL_TITLE'] = 'Rellenar con el color %1';
Blockly.Msg['TURTLE_FILL_TOOLTIP'] = 'Rellenar dibujo con color';
Blockly.Msg['TURTLE_SHAPE_TITLE'] = 'establecer forma %1';
Blockly.Msg['TURTLE_SHAPE_TURTLE'] = 'tortuga 🐢';
Blockly.Msg['TURTLE_SHAPE_CIRCLE'] = 'círculo ⚫';
Blockly.Msg['TURTLE_SHAPE_CLASSIC'] = 'clásica ➤';
Blockly.Msg['TURTLE_SHAPE_SQUARE'] = 'cuadrado ⬛';
Blockly.Msg['TURTLE_SHAPE_TRIANGLE'] = 'triángulo ▶';
Blockly.Msg['TURTLE_SHAPE_TOOLTIP'] = 'Seleccione la forma del cursor';
Blockly.Msg['TURTLE_COLOR_TITLE'] = 'establecer color %1 ancho %2';
Blockly.Msg['TURTLE_COLOR_TOOLTIP'] = 'Color y ancho de las líneas';
Blockly.Msg['TURTLE_PEN_TITLE'] = 'poner pluma %1';
Blockly.Msg['TURTLE_PEN_TOOLTIP'] = 'Poner bolígrafo arriba o abajo para dibujar las líneas';
Blockly.Msg['TURTLE_PEN_UP'] = 'arriba';
Blockly.Msg['TURTLE_PEN_DOWN'] = 'abajo';
Blockly.Msg['TURTLE_VISIBILITY_TITLE'] = '%1 la tortuga';
Blockly.Msg['TURTLE_VISIBILITY_TOOLTIP'] = 'Especifica la visibilidad de la tortuga';
Blockly.Msg['TURTLE_VISIBILITY_SHOW'] = 'mostrar';
Blockly.Msg['TURTLE_VISIBILITY_HIDE'] = 'ocultar';
Blockly.Msg['TURTLE_STAMP_TITLE'] = 'estampar la tortuga';
Blockly.Msg['TURTLE_STAMP_TOOLTIP'] = 'estampar el cursor en la posición actual';
Blockly.Msg['TURTLE_SPEED_TITLE'] = 'fijar velocidad %1';
Blockly.Msg['TURTLE_SPEED_TOOLTIP'] = 'Especifica la velocidad de la tortuga';
Blockly.Msg['TURTLE_RESET_TITLE'] = 'restablecer el dibujo';
Blockly.Msg['TURTLE_COLOR'] = 'establecer color %1';
Blockly.Msg['TURTLE_WIDTH'] = 'establecer anchura %1';
Blockly.Msg['TURTLE_FILLCOLOR'] = 'rellenar con color %1';
Blockly.Msg['TURTLE_FILLBEGIN'] = 'comenzar el relleno';
Blockly.Msg['TURTLE_FILLEND'] = 'termina el relleno';
Blockly.Msg['TURTLE_SCREEN_SETUP_TITLE'] = 'tamaño del lienzo %1 x %2';
Blockly.Msg['TURTLE_SCREEN_SETUP_TOOLTIP'] = 'Definir el tamaño del lienzo.';
Blockly.Msg['TURTLE_SCREEN_COLOR_TITLE'] = 'color de fondo del lienzo %1';
Blockly.Msg['TURTLE_SCREEN_COLOR_TOOLTIP'] = 'Definir el color de fondo del lienzo.';
Blockly.Msg['TURTLE_SCREEN_PICTURE_TITLE'] = 'imagen de fondo del lienzo %1';
Blockly.Msg['TURTLE_SCREEN_PICTURE_TOOLTIP'] = 'Establecer una imagen de fondo para el lienzo.';
Blockly.Msg['TURTLE_SCREEN_PICTURE_MAZE'] = 'laberinto';
Blockly.Msg['TURTLE_SCREEN_PICTURE_GRID'] = 'cuadrícula';
Blockly.Msg['TURTLE_SCREEN_PICTURE_VITTASCIENCE'] = 'vittascience';

// Numpy blocks.
Blockly.Msg['NUMPY_ARANGE_TITLE'] = 'tabla arreglada de %1 a %2 por el paso %3';
Blockly.Msg['NUMPY_ARANGE_TOOLTIP'] = 'Devuelve un array ordenado de mínimo a máximo por paso';
Blockly.Msg['NUMPY_LINSPACE_TITLE'] = 'tabla aranzada de %1 a %2 con valores %3';
Blockly.Msg['NUMPY_LINSPACE_TOOLTIP'] = 'Devuelve un array ordenado de mínimo a máximo con el número de elementos elegidos';
Blockly.Msg['NUMPY_TABLE_WITH_SHAPE_TITLE'] = 'tamaño de tabla %1 * %2 con elemento %3';
Blockly.Msg['NUMPY_TABLE_WITH_SHAPE_TOOLTIP'] = 'Inicializar tabla con forma [i*j] con un elemento';
Blockly.Msg['NUMPY_CREATE_TABLE_WITH_TOOLTIP'] = 'Inicializar una tabla con cualquier número de elementos';
Blockly.Msg['NUMPY_CREATE_TABLE_WITH_INPUT_TITLE'] = 'crear tabla con';
Blockly.Msg['NUMPY_CREATE_TABLE_WITH_INPUT_TOOLTIP'] = 'crear una tabla con cualquier número de elementos';
Blockly.Msg['NUMPY_CREATE_TABLE_EMPTY_TITLE'] = 'Crear una tabla vacía';
Blockly.Msg['NUMPY_CREATE_TABLE_EMPTY_TOOLTIP'] = 'Devuelve una tabla, de longitud 0, que no contiene registros de datos';
Blockly.Msg['NUMPY_SQUARE_MATRIX_TITLE'] = 'matriz con elementos';
Blockly.Msg['NUMPY_SQUARE_MATRIX_TOOLTIP'] = 'Inicializa una matriz cuadrada de cualquier tipo, de tamaño 2 a 10';
Blockly.Msg['NUMPY_SIZESHAPE_TITLE'] = '%1 de %2';
Blockly.Msg['NUMPY_SIZESHAPE_TOOLTIP'] = 'Devuelve el tamaño o la forma de la tabla numpy';
Blockly.Msg['NUMPY_SIZE'] = 'tamaño';
Blockly.Msg['NUMPY_SHAPE'] = 'shape';
Blockly.Msg['NUMPY_GET_ELEMENT_MATRIX_TITLE'] = 'obtener elemento [%1, %2] de %3';
Blockly.Msg['NUMPY_GET_ELEMENT_MATRIX_TOOLTIP'] = 'Obtener elemento [i,j] de la matriz numpy';
Blockly.Msg['NUMPY_GET_ELEMENT_LIST_TITLE'] = 'Obtener elemento [%1] de %2';
Blockly.Msg['NUMPY_GET_ELEMENT_LIST_TOOLTIP'] = 'Obtener el elemento [i] de la matriz numpy';

// Graph blocks.
Blockly.Msg['GRAPH_PLOT_TITLE'] = 'plot %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_PLOT_TOOLTIP'] = 'Graficar en la consola de Python';
Blockly.Msg['GRAPH_SCATTER_TITLE'] = 'trazar dispersión %1 eje x %2 eje y %3';
Blockly.Msg['GRAPH_SCATTER_TOOLTIP'] = 'Trazar dispersión en la consola de Python';
Blockly.Msg['GRAPH_BAR_TITLE'] = 'trazar barra %1 eje x %2 eje y %3';
Blockly.Msg['GRAPH_BAR_TOOLTIP'] = 'Trazar barra en la consola de Python';
Blockly.Msg['GRAPH_HIST_TITLE'] = 'trazar histograma %1 eje x %2 eje y %3';
Blockly.Msg['GRAPH_HIST_TOOLTIP'] = 'Trazar histograma en la consola de Python';
Blockly.Msg['GRAPH_SETLABEL_TITLE'] = 'definir título %1 xlabel %2 ylabel %3';
Blockly.Msg['GRAPH_SETLABEL_TOOLTIP'] = 'Definir título del gráfico y etiquetas del eje x y del eje y';
Blockly.Msg['GRAPH_LEGEND_TITLE'] = 'Establecer leyenda %1 ubicación %2';
Blockly.Msg['GRAPH_LEGEND_TOOLTIP'] = 'Habilitar la leyenda para el/los gráfico/s';
Blockly.Msg['GRAPH_SHOW_TITLE'] = 'mostrar gráfico';
Blockly.Msg['GRAPH_SHOW_TOOLTIP'] = 'Mostrar gráfico';
Blockly.Msg['GRAPH_SUBPLOT_TITLE'] = 'subplot %1 row %2 col %3 index %4';
Blockly.Msg['GRAPH_SUBPLOT_TOOLTIP'] = 'Subplot a graph in Python console';
Blockly.Msg['GRAPH_GRID_TITLE'] = 'mostrar cuadrícula';
Blockly.Msg['GRAPH_GRID_TOOLTIP'] = 'Mostrar una rejilla en el gráfico';
Blockly.Msg['GRAPH_TEXT_TITLE'] = 'mostrar texto %1 pos. x %2 pos. y %3 texto %4';
Blockly.Msg['GRAPH_TEXT_TOOLTIP'] = 'Mostrar un texto en la parcela';
Blockly.Msg['GRAPH_SET_TITLE'] = 'definir título %1';
Blockly.Msg['GRAPH_SET_X_TITLE'] = 'xlabel %1';
Blockly.Msg['GRAPH_SET_Y_TITLE'] = 'ylabel %1';
Blockly.Msg['GRAPH_CREATE_PLOT_TITLE'] = 'crear gráfico con %1 eje x %2 eje y %3';
Blockly.Msg['GRAPH_CREATE_SCATTER_TITLE'] = 'crear gráfico de dispersión con %1 eje x %2 eje y %3';
Blockly.Msg['GRAPH_CREATE_BAR_TITLE'] = 'crear gráfico de barras con %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_PLOT'] = 'mostrar gráfico';

// Vittaia blocks. AST Python <-> Blocks
Blockly.Msg['VITTAIA_INIT_MODEL'] = 'Inicializar el modelo';
Blockly.Msg['VITTAIA_WEBCAM_REFRESH'] = 'Activar la cámara web';
Blockly.Msg['VITTAIA_SELECT_CAMERA'] = 'Seleccionar la cámara';
Blockly.Msg['VITTAIA_CAPTURE'] = 'Capturar la cámara web';
Blockly.Msg['VITTAIA_PREDICT'] = 'Predecir el modelo %1';
Blockly.Msg['VITTAIA_INIT_SOUND'] = 'Iniciar el modelo de sonido';
Blockly.Msg['VITTAIA_INIT_MICRO'] = 'Iniciar el modelo micro';

// AI IMAGE
Blockly.Msg['VITTAIA_LOAD_MODEL_TITLE'] = '%1 cargar el modelo de IA de imágenes %2';
Blockly.Msg['VITTAIA_LOAD_MODEL_TOOLTIP'] = 'Carga el modelo de IA de imágenes pasado como parámetro. El modelo por defecto es para reconocer gatos y perros. Puedes generar un nuevo modelo desde la interfaz de "Entrenamiento de IA" de Vittascience disponible en la sección de Programación.';
Blockly.Msg['VITTAIA_LOAD_LOCAL_MODEL_TITLE'] = '%1 cargar el modelo de IA de imágenes local';
Blockly.Msg['VITTAIA_LOAD_LOCAL_MODEL_TOOLTIP'] = 'Carga el modelo de imágenes ya entrenado ubicado en la memoria local del navegador';
Blockly.Msg['VITTAIA_LOAD_MODEL_DEFAULT_TITLE'] = '%1 cargar el modelo de IA de imágenes %2';
Blockly.Msg['VITTAIA_LOAD_MODEL_DEFAULT_TOOLTIP'] = 'Carga un modelo de imágenes ya entrenado. Cambia el modelo utilizando la opción.';
Blockly.Msg['VITTAIA_MODEL_DOGS_CATS'] = "Perros y Gatos";
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_WEBCAM_TITLE'] = '%1 iniciar la detección en la imagen de la cámara';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_WEBCAM_TOOLTIP'] = 'Realiza las predicciones del modelo de la imagen de la cámara. Una predicción incluye 2 elementos: la clase y la probabilidad.';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_FILE_TITLE'] = '%1 iniciar la detección en la imagen importada';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_FILE_TOOLTIP'] = 'Realiza las predicciones del modelo de la imagen importada. Una predicción incluye 2 elementos: la clase y la probabilidad.';
Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE'] = '%1 clase detectada';
Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TOOLTIP'] = 'Devuelve la clase asociada con el modelo que tiene la mayor probabilidad de detección.';
Blockly.Msg['VITTAIA_GET_CONFIDENCE_RATE_TITLE'] = '%1 tasa de confianza';
Blockly.Msg['VITTAIA_GET_CONFIDENCE_RATE_TOOLTIP'] = 'Devuelve la tasa de confianza de la clase con la mayor probabilidad.';
Blockly.Msg['VITTAIA_GET_PREDICTIONS_TITLE'] = '%1 predicciones';
Blockly.Msg['VITTAIA_GET_PREDICTIONS_TOOLTIP'] = 'Devuelve un arreglo que contiene todas las predicciones del modelo.';
Blockly.Msg['VITTAIA_DETECT_CLASS_TITLE'] = '%1 si la clase %2 %3 detectada entonces';
Blockly.Msg['VITTAIA_IS'] = "es";
Blockly.Msg['VITTAIA_ISNOT'] = "no es";
Blockly.Msg['VITTAIA_DETECT_CLASS_TOOLTIP'] = 'Inicia la detección usando una imagen de la cámara o una imagen importada para hacer una predicción verifica si la clase indicada en el bloque es detectada.';
Blockly.Msg['VITTAIA_IMAGE_UPLOADED_TITLE'] = '%1 imagen subida';
Blockly.Msg['VITTAIA_IMAGE_UPLOADED_TOOLTIP'] = 'Permite subir una imagen desde el ordenador para ser luego probada por el modelo lanzando una detección. Presiona el icono de \'Subir\' del bloque para añadir la imagen.';
Blockly.Msg['VITTAIA_WEBCAM_CAPTURE_TITLE'] = '%1 [cámara] captura';
Blockly.Msg['VITTAIA_WEBCAM_CAPTURE_TOOLTIP'] = 'Permite realizar una captura con la cámara del ordenador.';
Blockly.Msg['VITTAIA_WEBCAM_LIST_AVAILABLES_TITLE'] = '%1 [cámara] lista de cámaras disponibles';
Blockly.Msg['VITTAIA_WEBCAM_LIST_AVAILABLES_TOOLTIP'] = 'Permite listar todas las cámaras disponibles en el ordenador.';
Blockly.Msg['VITTAIA_WEBCAM_INIT_TITLE'] = '%1 [cámara] seleccionar la cámara %2';
Blockly.Msg['VITTAIA_WEBCAM_INIT_TOOLTIP'] = 'Permite inicializar la cámara del ordenador (por defecto 0).';
Blockly.Msg['VITTAIA_WEBCAM_REFRESH_TITLE'] = '%1 [cámara] refrescar la cámara';
Blockly.Msg['VITTAIA_WEBCAM_REFRESH_TOOLTIP'] = 'Permite refrescar la ventana de la cámara.';

// AI POSTURE
Blockly.Msg['VITTAIA_INIT_MODEL_POSTURE_TITLE'] = '%1 inicializar modelo de postura';
Blockly.Msg['VITTAIA_INIT_MODEL_POSTURE_TOOLTIP'] = 'Inicializa el modelo de postura. El modelo predeterminado es para el reconocimiento de posturas humanas. Puedes generar un nuevo modelo desde la interfaz "Entrenamiento IA" de Vittascience disponible en la sección Programar.';
Blockly.Msg['VITTAIA_LOAD_POSTURE_MODEL_TITLE'] = '%1 cargar modelo de postura %2';
Blockly.Msg['VITTAIA_LOAD_POSTURE_MODEL_TOOLTIP'] = 'Carga el modelo pasado como parámetro';
Blockly.Msg['VITTAIA_INIT_WEBCAM_TITLE'] = '%1 inicializar cámara';
Blockly.Msg['VITTAIA_INIT_WEBCAM_TOOLTIP'] = 'Inicializa la cámara seleccionada.';
Blockly.Msg['VITTAIA_POSTURE_MAKE_PREDICTIONS_TITLE'] = '%1 ejecutar predicción sobre imagen de la cámara';
Blockly.Msg['VITTAIA_POSTURE_MAKE_PREDICTIONS_TOOLTIP'] = 'Realiza predicciones del modelo de postura usando la cámara. Una predicción incluye 2 elementos: la clase y la probabilidad.';
Blockly.Msg['VITTAIA_INIT_POSTURE_WEBCAM_TITLE'] = '%1 [cámara] inicializar cámara';
Blockly.Msg['VITTAIA_INIT_POSTURE_WEBCAM_TOOLTIP'] = 'Inicializa la cámara (por defecto en el puerto 0)';
// AI SOUND
Blockly.Msg['VITTAIA_LOAD_SOUND_MODEL_TITLE'] = '%1 seleccionar e inicializar modelo %2';
Blockly.Msg['VITTAIA_LOAD_SOUND_MODEL_TOOLTIP'] = 'Carga el modelo pasado como parámetro';
Blockly.Msg['VITTAIA_INIT_MICROPHONE_TITLE'] = '%1 inicializar micrófono';
Blockly.Msg['VITTAIA_INIT_MICROPHONE_TOOLTIP'] = 'Inicializa el micrófono del ordenador';
Blockly.Msg['VITTAIA_MAKE_SOUND_PREDICTIONS_TITLE'] = '%1 ejecutar detección con el sonido del micrófono';
Blockly.Msg['VITTAIA_MAKE_SOUND_PREDICTIONS_TOOLTIP'] = 'Inicia la detección usando el sonido del micrófono para realizar una predicción';
Blockly.Msg['VITTAIA_LIST_MICROPHONES_TITLE'] = '%1 listar micrófonos';
Blockly.Msg['VITTAIA_LIST_MICROPHONES_TOOLTIP'] = 'Lista todos los micrófonos disponibles';
Blockly.Msg['VITTAIA_LIST_MICRTEXT_OPHONES_TOOLTIP'] = 'Lista todos los micrófonos disponibles';
// AI TEXT
Blockly.Msg['VITTAIA_INIT_TEXT_AI_TITLE'] = '%1 inicializar modelo de texto';
Blockly.Msg['VITTAIA_INIT_TEXT_AI_TOOLTIP'] = 'Inicializa el modelo de texto. El modelo predeterminado es para reconocimiento de texto. Puedes generar un nuevo modelo desde la interfaz "Entrenamiento IA" de Vittascience disponible en la sección Programar.';
Blockly.Msg['VITTAIA_INIT_DISCUSSION_TITLE'] = '%1 inicializar conversación';
Blockly.Msg['VITTAIA_INIT_DISCUSSION_TOOLTIP'] = 'Inicializa la conversación con la IA. El modelo predeterminado es para reconocimiento de texto. Puedes generar un nuevo modelo desde la interfaz "Entrenamiento IA" de Vittascience disponible en la sección Programar.';
Blockly.Msg['VITTAIA_LOAD_DISCUSSION_TITLE'] = '%1 seleccionar conversación %2';
Blockly.Msg['VITTAIA_LOAD_DISCUSSION_TOOLTIP'] = 'Carga la conversación pasada como parámetro';
Blockly.Msg['VITTAIA_MODEL_TEXT_PREDICT_TITLE'] = '%1 ejecutar predicción con el texto %2';
Blockly.Msg['VITTAIA_MODEL_TEXT_PREDICT_TOOLTIP'] = 'Realiza la predicción del texto';
Blockly.Msg['VITTAIA_GET_AI_MESSAGE_TITLE'] = 'mostrar respuesta de la IA';
Blockly.Msg['VITTAIA_GET_AI_MESSAGE_TOOLTIP'] = 'Muestra la respuesta de la IA';
Blockly.Msg['VITTAIA_SET_RANDOMNESS_TITLE'] = '%1 definir nivel de aleatoriedad %2 %';
Blockly.Msg['VITTAIA_SET_RANDOMNESS_TOOLTIP'] = 'Permite definir el nivel de aleatoriedad de la predicción';
Blockly.Msg['VITTAIA_SET_MODEL_IA_TITLE'] = '%1 definir modelo de IA %2';
Blockly.Msg['VITTAIA_SET_MODEL_IA_TOOLTIP'] = 'Permite definir el modelo de IA';

Blockly.Msg['VITTAIA_TEXT_MODEL_GPT-3.5_TURBO'] = 'gpt-3.5';
Blockly.Msg['VITTAIA_TEXT_MODEL_LLAMA_3.1'] = 'llama-v3.1';
Blockly.Msg['VITTAIA_TEXT_MODEL_LLAMA_3.3'] = 'llama-v3.3';
Blockly.Msg['VITTAIA_TEXT_MODEL_GPT_4'] = 'gpt-4o';
Blockly.Msg['VITTAIA_TEXT_MODEL_MIXTRAL'] = 'mixtral';
Blockly.Msg['VITTAIA_TEXT_MODEL_GPT_MINI'] = 'gpt-4o-mini';

// Vittaia blocks. AST Python <-> Blocks
Blockly.Msg['VITTAIA_INIT_MODEL'] = '%1 inicializar modelo';
Blockly.Msg['VITTAIA_INIT_WEBCAM'] = '%1 inicializar cámara';
Blockly.Msg['VITTAIA_INIT_SOUND'] = '%1 inicializar modelo de sonido';
Blockly.Msg['VITTAIA_INIT_MICRO_VAR'] = '%1 inicializar variable del micrófono';
Blockly.Msg['VITTAIA_INIT_MICRO'] = '%1 inicializar micrófono';
Blockly.Msg['VITTAIA_SELECT_CAMERA'] = '%1 seleccionar cámara %2';
Blockly.Msg['VITTAIA_DISPLAY_CAMERA'] = '%1 actualizar cámara';
Blockly.Msg['VITTAIA_CAPTURE'] = 'imagen de la cámara';
Blockly.Msg['VITTAIA_PREDICT'] = '%1 ejecutar detección en %2';
Blockly.Msg['VITTAIA_GET_BEST_PROBALITY_CLASS'] = Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE'];

// Exception
Blockly.Msg['EXCEPTION_RAISE_TOOLTIP'] = 'lanzar una excepción';
Blockly.Msg['EXCEPTION_EXCEPTION_TOOLTIP'] = 'crear una excepción';
Blockly.Msg['EXCEPTION_TYPE_TOOLTIP'] = 'Todos los tipos de excepciones posibles';
Blockly.Msg['EXCEPTION_TRY_TOOLTIP'] = 'Ejecuta un bloque de código y permite ejecutar un bloque en caso de excepción';

// Other Block
Blockly.Msg['OTHER_AST_RAW'] = 'Código no traducido';
