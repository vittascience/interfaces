// galaxia (Thingz) - thingz module

// galaxia - accel/compass

// galaxia - button / touch

// galaxia - led

// galaxia - log

// galaxia - radio

// galaxia - sound

// galaxia - display

ACMsg.GALAXIA_THINGZ_MODULE = "Módulo Thingz para la placa Galaxia: acceso a los componentes integrados (botones, pads táctiles, LED, sensores, radio, pantalla, registro).";
ACMsg.GALAXIA_THINGZ_BUTTON_A = "Botón físico A de Galaxia (instancia de <b>Button</b>).";
ACMsg.GALAXIA_THINGZ_BUTTON_B = "Botón físico B de Galaxia (instancia de <b>Button</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_N = "Botón táctil Norte de Galaxia (instancia de <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_S = "Botón táctil Sur de Galaxia (instancia de <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_E = "Botón táctil Este de Galaxia (instancia de <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_W = "Botón táctil Oeste de Galaxia (instancia de <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_LED = "LED RGB de Galaxia (instancia de <b>Led</b>).";
ACMsg.GALAXIA_THINGZ_ACCELEROMETER = "Acelerómetro de Galaxia (instancia de <b>Accel</b>).";
ACMsg.GALAXIA_THINGZ_COMPASS = "Magnetómetro/brújula de Galaxia (instancia de <b>Compass</b>).";
ACMsg.GALAXIA_THINGZ_SOUND = "Salida de audio por conector jack de Galaxia (instancia de <b>Sound</b>).";
ACMsg.GALAXIA_THINGZ_RADIO = "Comunicación por radio de Galaxia (instancia de <b>Radio</b>).";
ACMsg.GALAXIA_THINGZ_DISPLAY = "Pantalla LCD de Galaxia (instancia de <b>Display</b).";
ACMsg.GALAXIA_THINGZ_LOG = "Registrador CSV interno de Galaxia (instancia de <b>Log</b>).";
ACMsg.GALAXIA_THINGZ_TEMPERATURE = "Devuelve la temperatura actual usando el sensor interno.";
ACMsg.GALAXIA_THINGZ_SET_TEMPERATURE_OFFSET = "Aplica un offset de calibración (en grados) al sensor de temperatura interno.";
ACMsg.GALAXIA_THINGZ_ACCEL_MODULE = "Módulo Thingz de acelerómetro y brújula.";
ACMsg.GALAXIA_ACCEL_CLASS = "Controla el acelerómetro de Galaxia.";
ACMsg.GALAXIA_ACCEL_CONSTRUCTOR = "Crea un objeto <b>Accel</b>.";
ACMsg.GALAXIA_COMPASS_CLASS = "Controla el magnetómetro de Galaxia.";
ACMsg.GALAXIA_COMPASS_CONSTRUCTOR = "Crea un objeto <b>Compass</b>.";
ACMsg.GALAXIA_ACCEL_GET_X = "Devuelve el valor de aceleración en el eje X (mG).";
ACMsg.GALAXIA_ACCEL_GET_Y = "Devuelve el valor de aceleración en el eje Y (mG).";
ACMsg.GALAXIA_ACCEL_GET_Z = "Devuelve el valor de aceleración en el eje Z (mG).";
ACMsg.GALAXIA_ACCEL_GET_VALUES = "Devuelve los valores de aceleración en 3 ejes como una lista: [x, y, z].";
ACMsg.GALAXIA_ACCEL_CURRENT_GESTURE = "Devuelve el gesto actual (por ejemplo: arriba, abajo, izquierda, derecha, boca arriba, boca abajo, caída libre, 3g, 6g, 8g, sacudida, ninguno).";
ACMsg.GALAXIA_ACCEL_IS_GESTURE = "Devuelve <b>True</b> si el gesto actual coincide con <b>gesture</b>.";
ACMsg.GALAXIA_ACCEL_WAS_GESTURE = "Devuelve <b>True</b> si <b>gesture</b> ocurrió desde la última llamada.";
ACMsg.GALAXIA_ACCEL_GET_GESTURES = "Devuelve el historial de gestos (el más reciente al final).";
ACMsg.GALAXIA_ACCEL_ON_GESTURE = "Registra un callback para un evento de gesto; el gesto se pasa al callback.";
ACMsg.GALAXIA_COMPASS_GET_X = "Devuelve el valor del campo magnético en el eje X (uT).";
ACMsg.GALAXIA_COMPASS_GET_Y = "Devuelve el valor del campo magnético en el eje Y (uT).";
ACMsg.GALAXIA_COMPASS_GET_VALUES = "Devuelve los valores del campo magnético en 3 ejes como una lista: [x, y, z].";
ACMsg.GALAXIA_COMPASS_HEADING = "Devuelve el rumbo actual (grados).";
ACMsg.GALAXIA_COMPASS_CALIBRATE = "Calibra el magnetómetro: gire la placa alrededor del eje Z durante la calibración.";
ACMsg.GALAXIA_THINGZ_BUTTON_MODULE = "Módulo Thingz de botones.";
ACMsg.GALAXIA_BUTTON_CLASS = "Controla los botones físicos de Galaxia.";
ACMsg.GALAXIA_BUTTON_CONSTRUCTOR = "Crea un objeto <b>Button</b>.";
ACMsg.GALAXIA_BUTTON_IS_PRESSED = "Devuelve <b>True</b> si el botón está presionado actualmente.";
ACMsg.GALAXIA_BUTTON_WAS_PRESSED = "Devuelve <b>True</b> si el botón se presionó desde la última llamada.";
ACMsg.GALAXIA_BUTTON_GET_PRESSES = "Devuelve el número de pulsaciones desde la última llamada.";
ACMsg.GALAXIA_BUTTON_ON_PRESSED = "Registra un callback para el evento de pulsación; el objeto botón se pasa al callback.";
ACMsg.GALAXIA_THINGZ_BUTTON_TOUCH_MODULE = "Módulo Thingz de botones táctiles.";
ACMsg.GALAXIA_BUTTONTOUCH_CLASS = "Controla los botones táctiles capacitivos de Galaxia.";
ACMsg.GALAXIA_BUTTONTOUCH_CONSTRUCTOR = "Crea un objeto <b>ButtonTouch</b>.";
ACMsg.GALAXIA_BUTTONTOUCH_IS_TOUCHED = "Devuelve <b>True</b> si el botón táctil está siendo tocado.";
ACMsg.GALAXIA_BUTTONTOUCH_WAS_TOUCHED = "Devuelve <b>True</b> si el botón táctil fue tocado desde la última llamada.";
ACMsg.GALAXIA_BUTTONTOUCH_GET_TOUCHES = "Devuelve el número de toques desde la última llamada.";
ACMsg.GALAXIA_BUTTONTOUCH_ON_TOUCHED = "Registra un callback para el evento de toque; el objeto botón se pasa al callback.";
ACMsg.GALAXIA_THINGZ_LED_MODULE = "Módulo Thingz de LED.";
ACMsg.GALAXIA_LED_CLASS = "Controla el LED RGB de Galaxia.";
ACMsg.GALAXIA_LED_CONSTRUCTOR = "Crea un objeto <b>Led</b>.";
ACMsg.GALAXIA_LED_SET_COLORS = "Establece el color del LED usando <b>red</b>, <b>green</b>, <b>blue</b> (0-255).";
ACMsg.GALAXIA_LED_SET_RED = "Establece el valor del canal rojo (0-255).";
ACMsg.GALAXIA_LED_SET_GREEN = "Establece el valor del canal verde (0-255).";
ACMsg.GALAXIA_LED_SET_BLUE = "Establece el valor del canal azul (0-255).";
ACMsg.GALAXIA_LED_GET_RED = "Devuelve el valor actual del canal rojo (0-255).";
ACMsg.GALAXIA_LED_GET_GREEN = "Devuelve el valor actual del canal verde (0-255).";
ACMsg.GALAXIA_LED_GET_BLUE = "Devuelve el valor actual del canal azul (0-255).";
ACMsg.GALAXIA_LED_READ_LIGHT_LEVEL = "Devuelve el nivel de luz ambiental (0 = oscuro, 100 = brillante).";
ACMsg.GALAXIA_THINGZ_LOG_MODULE = "Módulo Thingz de registro de datos interno.";
ACMsg.GALAXIA_LOG_CLASS = "Guarda datos en la memoria interna de Galaxia como CSV (exportado por USB como data.csv al arrancar).";
ACMsg.GALAXIA_LOG_CONSTRUCTOR = "Crea un objeto <b>Log</b>.";
ACMsg.GALAXIA_LOG_ADD = "Añade una fila al registro. Los datos son una lista de tuplas: (column_name, value).";
ACMsg.GALAXIA_LOG_DELETE = "Borra todos los datos guardados en el registro.";
ACMsg.GALAXIA_LOG_SET_COLUMNS = "Define las columnas CSV (restablece el registro cada vez que se redefinen las columnas).";
ACMsg.GALAXIA_THINGZ_RADIO_MODULE = "Módulo Thingz de radio.";
ACMsg.GALAXIA_RADIO_CLASS = "Envía y recibe mensajes entre placas.";
ACMsg.GALAXIA_RADIO_CONSTRUCTOR = "Crea un objeto <b>Radio</b>.";
ACMsg.GALAXIA_RADIO_SEND = "Difunde un mensaje de texto a placas cercanas en el mismo canal.";
ACMsg.GALAXIA_RADIO_RECEIVE = "Espera y devuelve el mensaje recibido.";
ACMsg.GALAXIA_RADIO_SET_CHANEL = "Establece el canal de radio (1 a 10).";
ACMsg.GALAXIA_RADIO_GET_CHANNEL = "Devuelve el canal de radio actual.";
ACMsg.GALAXIA_RADIO_GET_MAC = "Devuelve la dirección MAC de radio como bytes.";
ACMsg.GALAXIA_THINGZ_SOUND_MODULE = "Módulo Thingz de sonido.";
ACMsg.GALAXIA_SOUND_CLASS = "Emite sonido usando el conector jack de Galaxia.";
ACMsg.GALAXIA_SOUND_CONSTRUCTOR = "Crea un objeto <b>Sound</b>.";
ACMsg.GALAXIA_SOUND_PLAY = "Activa/desactiva la generación de frecuencia en el jack y ajusta la frecuencia (Hz).";
ACMsg.GALAXIA_SOUND_SET_FREQUENCY = "Configura la frecuencia de salida en Hz.";
ACMsg.GALAXIA_SOUND_SET_VOLUME = "Establece el volumen (0 a 100).";
ACMsg.GALAXIA_SOUND_PLAY_SAMPLE = "Reproduce una muestra WAV desde la ruta de archivo indicada.";
ACMsg.GALAXIA_THINGZ_DISPLAY_MODULE = "Módulo de pantalla Thingz.";
ACMsg.GALAXIA_DISPLAY_CLASS = "Controla la pantalla LCD de Galaxia.";
ACMsg.GALAXIA_DISPLAY_CONSTRUCTOR = "Crea un objeto <b>Display</b>.";
ACMsg.GALAXIA_DISPLAY_PLOT = "Interfaz de gráficos (instancia de <b>Plot</b>).";
ACMsg.GALAXIA_DISPLAY_CONSOLE = "Interfaz de consola que muestra la salida REPL (instancia de <b>Console</b>).";
ACMsg.GALAXIA_DISPLAY_RAW = "Interfaz de gráficos en bruto (instancia de <b>Raw</b>).";
ACMsg.GALAXIA_THINGZ_DISPLAY_CONSOLE_MODULE = "Submódulo de consola de pantalla Thingz.";
ACMsg.GALAXIA_CONSOLE_CLASS = "Muestra la salida REPL en la pantalla.";
ACMsg.GALAXIA_CONSOLE_CONSTRUCTOR = "Crea un objeto <b>Console</b>.";
ACMsg.GALAXIA_CONSOLE_SHOW = "Muestra el REPL en la pantalla.";
ACMsg.GALAXIA_THINGZ_DISPLAY_PLOT_MODULE = "Submódulo de gráficos de la pantalla Thingz.";
ACMsg.GALAXIA_PLOT_CLASS = "Usa la LCD como gráfico.";
ACMsg.GALAXIA_PLOT_CONSTRUCTOR = "Crea un objeto <b>Plot</b>.";
ACMsg.GALAXIA_PLOT_SHOW = "Muestra el gráfico en la pantalla.";
ACMsg.GALAXIA_PLOT_ADD_POINT = "Añade un nuevo punto al gráfico (valor Y).";
ACMsg.GALAXIA_PLOT_SET_Y_SCALE = "Establece la escala Y con valores mínimo y máximo.";
ACMsg.GALAXIA_PLOT_SET_ANIMATE_FUNCTION = "Configura una función que se llama cada <b>interval</b> segundos para añadir un punto.";
ACMsg.GALAXIA_THINGZ_DISPLAY_RAW_MODULE = "Submódulo de gráficos en bruto de la pantalla Thingz.";
ACMsg.GALAXIA_RAW_CLASS = "Usa la LCD para mostrar elementos gráficos.";
ACMsg.GALAXIA_RAW_CONSTRUCTOR = "Crea un objeto <b>Raw</b>.";
ACMsg.GALAXIA_RAW_SHOW = "Muestra la interfaz de gráficos en bruto.";
ACMsg.GALAXIA_RAW_PRINT = "Imprime el texto <b>txt</b> en la posición (<b>x</b>, <b>y</b>).";
ACMsg.GALAXIA_RAW_PRINT_BMP = "Imprime un archivo BMP ubicado en <b>path</b> en la posición (<b>x</b>, <b>y</b>).";
ACMsg.GALAXIA_IMG_CLASS = "Elemento de imagen para la interfaz de gráficos en bruto.";
ACMsg.GALAXIA_IMG_CONSTRUCTOR = "Crea un elemento de imagen a partir de un archivo BMP y lo muestra.";
ACMsg.GALAXIA_IMG_SHOW = "Muestra/oculta la imagen.";
ACMsg.GALAXIA_IMG_X = "Define la posición x.";
ACMsg.GALAXIA_IMG_Y = "Define la posición y.";
ACMsg.GALAXIA_IMG_WHITE_REPLACEMENT_COLOR = "Sustituye los píxeles blancos por un color dado.";
ACMsg.GALAXIA_IMG_GET_SHOW = "Devuelve <b>True</b> si la imagen se muestra.";
ACMsg.GALAXIA_IMG_GET_X = "Devuelve la posición x.";
ACMsg.GALAXIA_IMG_GET_Y = "Devuelve la posición y.";
ACMsg.GALAXIA_IMG_GET_WIDTH = "Devuelve el ancho de la imagen.";
ACMsg.GALAXIA_IMG_GET_HEIGHT = "Devuelve la altura de la imagen.";
ACMsg.GALAXIA_IMG_GET_WHITE_REPLACEMENT = "Devuelve el color actual de reemplazo del blanco.";
ACMsg.GALAXIA_RECT_CLASS = "Elemento rectángulo para la interfaz de gráficos en bruto.";
ACMsg.GALAXIA_RECT_CONSTRUCTOR = "Crea un elemento rectángulo y lo muestra.";
ACMsg.GALAXIA_RECT_SHOW = "Muestra/oculta el rectángulo.";
ACMsg.GALAXIA_RECT_X = "Define la posición x.";
ACMsg.GALAXIA_RECT_Y = "Define la posición y.";
ACMsg.GALAXIA_RECT_COLOR = "Establece el color del rectángulo.";
ACMsg.GALAXIA_RECT_GET_SHOW = "Devuelve <b>True</b> si el rectángulo se muestra.";
ACMsg.GALAXIA_RECT_GET_X = "Devuelve la posición x.";
ACMsg.GALAXIA_RECT_GET_Y = "Devuelve la posición y.";
ACMsg.GALAXIA_RECT_GET_WIDTH = "Devuelve el ancho del rectángulo.";
ACMsg.GALAXIA_RECT_GET_HEIGHT = "Devuelve la altura del rectángulo.";
ACMsg.GALAXIA_RECT_GET_COLOR = "Devuelve el color del rectángulo.";
ACMsg.GALAXIA_TEXT_CLASS = "Elemento de texto para la interfaz de gráficos en bruto.";
ACMsg.GALAXIA_TEXT_CONSTRUCTOR = "Crea un elemento de texto y lo muestra.";
ACMsg.GALAXIA_TEXT_SHOW = "Muestra/oculta el texto.";
ACMsg.GALAXIA_TEXT_X = "Define la posición x.";
ACMsg.GALAXIA_TEXT_Y = "Define la posición y.";
ACMsg.GALAXIA_TEXT_SET_TEXT = "Establece el texto mostrado.";
ACMsg.GALAXIA_TEXT_GET_SHOW = "Devuelve <b>True</b> si el texto se muestra.";
ACMsg.GALAXIA_TEXT_GET_X = "Devuelve la posición x.";
ACMsg.GALAXIA_TEXT_GET_Y = "Devuelve la posición y.";
ACMsg.GALAXIA_TEXT_GET_WIDTH = "Devuelve el ancho del texto.";
ACMsg.GALAXIA_TEXT_GET_HEIGHT = "Devuelve la altura del texto.";
ACMsg.GALAXIA_TEXT_GET_COLOR = "Devuelve el color del texto.";
ACMsg.GALAXIA_TEXT_GET_TEXT = "Devuelve el texto actual (nota: la documentación indica int).";
