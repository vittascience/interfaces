/**
 * @fileoverview Spanish messages for Codey. (ES)
 */

'use strict';

// Display
Blockly.Msg['DISPLAY_SHOWRGB_TITLE'] = '[LED incorporado] R %1 G %2 B %3';
Blockly.Msg['DISPLAY_SHOWRGB_TOOLTIP'] = 'Muestra el color especificado en el LED incorporado de Codey en formato RGB (0 ~ 255).';
Blockly.Msg['DISPLAY_SETRED_TITLE'] = '[LED incorporado] intensidad del rojo %1';
Blockly.Msg['DISPLAY_SETRED_TOOLTIP'] = 'Configura la intensidad del color rojo del LED incorporado de Codey (0 ~ 255).';
Blockly.Msg['DISPLAY_SETGREEN_TITLE'] = '[LED incorporado] intensidad del verde %1';
Blockly.Msg['DISPLAY_SETGREEN_TOOLTIP'] = 'Configura la intensidad del color verde del LED incorporado de Codey (0 ~ 255).';
Blockly.Msg['DISPLAY_SETBLUE_TITLE'] = '[LED incorporado] intensidad del azul %1';
Blockly.Msg['DISPLAY_SETBLUE_TOOLTIP'] = 'Configura la intensidad del color azul del LED incorporado de Codey (0 ~ 255).';
Blockly.Msg['DISPLAY_OFF_TITLE'] = '[LED incorporado] apagar';
Blockly.Msg['DISPLAY_OFF_TOOLTIP'] = 'Apaga el LED incorporado de Codey.';
Blockly.Msg['DISPLAY_SHOW_TITLE'] = '[Matriz] mostrar %1';
Blockly.Msg['DISPLAY_SHOW_TOOLTIP'] = 'Muestra el texto especificado en la matriz de LEDs de Codey.';
Blockly.Msg['DISPLAY_SETPIXEL_TITLE'] = '[Matriz] píxel X %1 Y %2 estado %3';
Blockly.Msg['DISPLAY_SETPIXEL_TOOLTIP'] = 'Establece el estado del píxel en la posición X e Y de la matriz de LEDs de Codey.';
Blockly.Msg['DISPLAY_GETPIXEL_TITLE'] = '[Matriz] estado del píxel X %1 Y %2';
Blockly.Msg['DISPLAY_GETPIXEL_TOOLTIP'] = 'Devuelve el estado del píxel en la posición X e Y de la matriz de LEDs de Codey.';
Blockly.Msg['DISPLAY_TOGGLEPIXEL_TITLE'] = '[Matriz] cambiar estado del píxel X %1 Y %2';
Blockly.Msg['DISPLAY_TOGGLEPIXEL_TOOLTIP'] = 'Invierte el estado del píxel en la posición X e Y de la matriz de LEDs de Codey.';
Blockly.Msg['DISPLAY_CLEAR_TITLE'] = '[Matriz] borrar';
Blockly.Msg['DISPLAY_CLEAR_TOOLTIP'] = 'Borra el contenido de la matriz de LEDs de Codey.';
// IO
Blockly.Msg['IO_DIGITAL_SIGNAL_TITLE'] = '%1';
Blockly.Msg['IO_DIGITAL_SIGNAL_HIGH'] = 'ALTO (1)';
Blockly.Msg['IO_DIGITAL_SIGNAL_LOW'] = 'BAJO (0)';
Blockly.Msg['IO_DIGITAL_SIGNAL_TOOLTIP'] = 'Devuelve un valor booleano (1 si es ALTO o 0 si es BAJO).';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'espera %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausa en la ejecución del código';
Blockly.Msg['IO_WAIT_SECOND'] = 'segundo(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milisegundo(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsegundo(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'espera hasta %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Detiene la ejecución del código hasta que se cumpla la condición';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'iniciar el temporizador';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Inicializar un temporizador a 0 (en segundos)';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valor del cronómetro en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Devuelve el valor del temporizador de la inicialización (en segundos o milisegundos)';
Blockly.Msg['IO_ONBUTTONPRESSED_TITLE'] = 'si se pulsa el botón %1 entonces';
Blockly.Msg['IO_ONBUTTONPRESSED_TOOLTIP'] = 'Ejecuta las instrucciones si se pulsa el botón A, B o C.';
Blockly.Msg['IO_BUTTON_STATE_TITLE'] = 'estado del botón %1';
Blockly.Msg['IO_BUTTON_STATE_TOOLTIP'] = 'Devuelve el estado del botón A, B o C (verdadero/falso).';
Blockly.Msg['IO_POTENTIOMETER_GET_VALUE_TITLE'] = 'valor del potenciómetro';
Blockly.Msg['IO_POTENTIOMETER_GET_VALUE_TOOLTIP'] = 'Devuelve el valor del potenciómetro (0 ~ 100).';

// Communication 
Blockly.Msg['COMMUNICATION_IRRECEIVE_TITLE'] = '[IR] recibir infrarrojo';
Blockly.Msg['COMMUNICATION_IRRECEIVE_TOOLTIP'] = 'Devuelve la cadena recibida por el receptor infrarrojo. Los datos enviados deben terminar con \\n. Para mandos a distancia NEC, usa la función receive_remote_code().';
Blockly.Msg['COMMUNICATION_IRRECEIVEREMOTECODE_TITLE'] = '[IR] recibir infrarrojo (NEC)';
Blockly.Msg['COMMUNICATION_IRRECEIVEREMOTECODE_TOOLTIP'] = 'Devuelve el código del último señal infrarrojo recibido como un arreglo. El primer parámetro es la dirección, y el segundo el contenido.';
Blockly.Msg['COMMUNICATION_IRSEND_TITLE'] = '[IR] enviar %1';
Blockly.Msg['COMMUNICATION_IRSEND_TOOLTIP'] = 'Envía una cadena por infrarrojo.';
Blockly.Msg['COMMUNICATION_IRSTARTLEARNING_TITLE'] = '[IR] comenzar aprendizaje IR';
Blockly.Msg['COMMUNICATION_IRSTARTLEARNING_TOOLTIP'] = 'Inicia el aprendizaje de una señal infrarroja. Solo compatible con mandos a distancia NEC.';
Blockly.Msg['COMMUNICATION_IRSTOPLEARNING_TITLE'] = '[IR] detener aprendizaje IR';
Blockly.Msg['COMMUNICATION_IRSTOPLEARNING_TOOLTIP'] = 'Detiene el aprendizaje de una señal infrarroja.';
Blockly.Msg['COMMUNICATION_IRSAVELEARNEDRESULT_TITLE'] = '[IR] guardar señal aprendida en índice %1';
Blockly.Msg['COMMUNICATION_IRSAVELEARNEDRESULT_TOOLTIP'] = 'Guarda la señal aprendida en la memoria de Codey (índice de 0 a 15).';
Blockly.Msg['COMMUNICATION_IRSENDLEARNEDRESULT_TITLE'] = '[IR] enviar señal en índice %1';
Blockly.Msg['COMMUNICATION_IRSENDLEARNEDRESULT_TOOLTIP'] = 'Envía la señal aprendida desde la memoria de Codey.';
Blockly.Msg['COMMUNICATION_IRLEARN_TITLE'] = '[IR] aprender durante %1 s';
Blockly.Msg['COMMUNICATION_IRLEARN_TOOLTIP'] = 'Aprende una señal IR durante el tiempo indicado (en segundos).';

// Sensors
Blockly.Msg['SENSORS_GETROTATION_EULER_ANGLES_TITLE'] = '%1';
Blockly.Msg['SENSORS_GETROTATION_EULER_ANGLES_TOOLTIP'] = 'Devuelve el valor de rotación en el eje seleccionado (x, y, z).';
Blockly.Msg['SENSORS_PITCH'] = 'inclinación';
Blockly.Msg['SENSORS_ROLL'] = 'balanceo';
Blockly.Msg['SENSORS_YAW'] = 'guiñada';
Blockly.Msg['SENSORS_GETROTATION_TITLE'] = 'ángulo en el eje %1';
Blockly.Msg['SENSORS_GETROTATION_TOOLTIP'] = 'Devuelve el ángulo de rotación de Codey en los tres ejes. Sentido antihorario es positivo.';
Blockly.Msg['SENSORS_RESETROTATION_TITLE'] = 'reiniciar ángulo en el eje %1';
Blockly.Msg['SENSORS_RESETROTATION_TOOLTIP'] = 'Reinicia el ángulo de rotación de Codey en el eje seleccionado a 0.';
Blockly.Msg['SENSORS_ALL_AXIS'] = 'todos los ejes';
Blockly.Msg['SENSORS_IS_SHAKED_TITLE'] = '¿sacudido?';
Blockly.Msg['SENSORS_IS_SHAKED_TOOLTIP'] = 'Devuelve verdadero si se detecta una sacudida.';
Blockly.Msg['SENSORS_GET_SHAKE_STRENGTH_TITLE'] = 'intensidad de sacudida';
Blockly.Msg['SENSORS_GET_SHAKE_STRENGTH_TOOLTIP'] = 'Devuelve la intensidad de la última sacudida detectada.';
Blockly.Msg['SENSORS_GETPOSITION_TITLE'] = '¿%1?';
Blockly.Msg['SENSORS_IS_TILTED_LEFT'] = 'inclinado a la izquierda';
Blockly.Msg['SENSORS_IS_TILTED_RIGHT'] = 'inclinado a la derecha';
Blockly.Msg['SENSORS_IS_EARS_UP'] = 'orejas hacia arriba';
Blockly.Msg['SENSORS_IS_EARS_DOWN'] = 'orejas hacia abajo';
Blockly.Msg['SENSORS_IS_DISPLAY_UP'] = 'pantalla hacia arriba';
Blockly.Msg['SENSORS_IS_DISPLAY_DOWN'] = 'pantalla hacia abajo';
Blockly.Msg['SENSORS_IS_UPRIGHT'] = 'vertical';
Blockly.Msg['SENSORS_GETPOSITION_TOOLTIP'] = 'Devuelve verdadero si el dispositivo está en la posición indicada.';
Blockly.Msg['SENSORS_GETACCELERATION_TITLE'] = 'aceleración en %1';
Blockly.Msg['SENSORS_GETACCELERATION_TOOLTIP'] = 'Devuelve la aceleración en el eje seleccionado o la fuerza total.';
Blockly.Msg['SENSORS_GETGYROSCOPE_TITLE'] = 'giroscopio en el eje %1';
Blockly.Msg['SENSORS_GETGYROSCOPE_TOOLTIP'] = 'Devuelve el valor del giroscopio en el eje seleccionado.';
Blockly.Msg['SENSORS_GET_LOUDNESS_TITLE'] = 'nivel de sonido';
Blockly.Msg['SENSORS_GET_LOUDNESS_TOOLTIP'] = 'Devuelve el nivel de sonido (0 ~ 100).';
Blockly.Msg['SENSORS_GET_LIGHT_TITLE'] = 'valor del sensor de luz';
Blockly.Msg['SENSORS_GET_LIGHT_TOOLTIP'] = 'Devuelve el valor del sensor de luz (0 ~ 100).';

// Actuators 
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_TITLE'] = 'reproducir sonido %1';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_TOOLTIP'] = 'Reproduce una melodía predefinida.';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_UNTIL_DONE_TITLE'] = 'reproducir sonido %1 hasta el final';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_MELODY_UNTIL_DONE_TOOLTIP'] = 'Reproduce una melodía predefinida y espera hasta que termine.';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_NOTE_TITLE'] = 'reproducir nota %1';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_NOTE_TOOLTIP'] = 'Reproduce una nota musical.';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_TITLE'] = 'reproducir tono %1 Hz';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_TOOLTIP'] = 'Reproduce un sonido con una frecuencia específica.';
Blockly.Msg['ACTUATORS_AUDIO_REST_TITLE'] = 'pausa durante %1 tiempo';
Blockly.Msg['ACTUATORS_AUDIO_REST_TOOLTIP'] = 'Hace una pausa en la música.';
Blockly.Msg['ACTUATORS_AUDIO_STOP_SOUNDS_TITLE'] = 'detener todos los sonidos';
Blockly.Msg['ACTUATORS_AUDIO_STOP_SOUNDS_TOOLTIP'] = 'Detiene todos los sonidos en curso.';
Blockly.Msg['ACTUATORS_AUDIO_SET_VOLUME_TITLE'] = 'ajustar volumen a %1';
Blockly.Msg['ACTUATORS_AUDIO_SET_VOLUME_TOOLTIP'] = 'Establece el volumen de sonido.';
Blockly.Msg['ACTUATORS_AUDIO_GET_VOLUME_TITLE'] = 'obtener volumen';
Blockly.Msg['ACTUATORS_AUDIO_GET_VOLUME_TOOLTIP'] = 'Devuelve el volumen actual.';
Blockly.Msg['ACTUATORS_AUDIO_SET_TEMPO_TITLE'] = 'ajustar tempo a %1';
Blockly.Msg['ACTUATORS_AUDIO_SET_TEMPO_TOOLTIP'] = 'Establece el tempo para los sonidos.';
Blockly.Msg['ACTUATORS_AUDIO_GET_TEMPO_TITLE'] = 'obtener tempo';
Blockly.Msg['ACTUATORS_AUDIO_GET_TEMPO_TOOLTIP'] = 'Devuelve el tempo actual.';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_DURATION'] = 'durante';
Blockly.Msg['ACTUATORS_AUDIO_PLAY_NOTE_DURATION'] = Blockly.Msg['ACTUATORS_AUDIO_PLAY_TONE_DURATION'];

// Robots
Blockly.Msg['ROBOTS_STOP_TITLE'] = '[Rocky] detener motores';
Blockly.Msg['ROBOTS_STOP_TOOLTIP'] = 'Detiene todos los motores del robot Rocky.';
Blockly.Msg['ROBOTS_MOVE_TITLE'] = '[Rocky] %1 a velocidad %2';
Blockly.Msg['ROBOTS_MOVE_TOOLTIP'] = 'Mueve el robot Rocky en la dirección indicada a la velocidad dada (+/- 100).';
Blockly.Msg['ROBOTS_FORWARD'] = 'avanzar';
Blockly.Msg['ROBOTS_BACKWARD'] = 'retroceder';
Blockly.Msg['ROBOTS_LEFT'] = 'girar a la izquierda';
Blockly.Msg['ROBOTS_RIGHT'] = 'girar a la derecha';
Blockly.Msg['ROBOTS_DRIVE_TITLE'] = '[Rocky] velocidad motor izquierdo %1 derecho %2';
Blockly.Msg['ROBOTS_DRIVE_TOOLTIP'] = 'Configura la velocidad de los motores izquierdo y derecho del robot Rocky (+/- 100).';
Blockly.Msg['ROBOTS_TURN_BY_DEGREE_TITLE'] = '[Rocky] %1 por %2 °';
Blockly.Msg['ROBOTS_TURN_BY_DEGREE_TOOLTIP'] = 'Hace girar al robot Rocky un cierto número de grados (+/- 360).';
Blockly.Msg['ROBOTS_SENSORS_GET_RGB_TITLE'] = '[Rocky] sensor de color nivel de %1';
Blockly.Msg['ROBOTS_SENSORS_RED'] = 'rojo';
Blockly.Msg['ROBOTS_SENSORS_GREEN'] = 'verde';
Blockly.Msg['ROBOTS_SENSORS_BLUE'] = 'azul';
Blockly.Msg['ROBOTS_SENSORS_GET_RGB_TOOLTIP'] = 'Devuelve el valor del sensor de color IR para el color seleccionado (rojo, verde, azul).';
Blockly.Msg['ROBOTS_SENSORS_IS_COLOR_TITLE'] = '[Rocky] ¿color %1?';
Blockly.Msg['ROBOTS_SENSORS_IS_COLOR_TOOLTIP'] = 'Devuelve verdadero si el sensor detecta el color indicado (rojo, verde, azul, amarillo, cian, magenta, blanco, negro).';
Blockly.Msg['ROBOTS_SENSORS_YELLOW'] = 'amarillo';
Blockly.Msg['ROBOTS_SENSORS_CYAN'] = 'cian';
Blockly.Msg['ROBOTS_SENSORS_MAGENTA'] = 'magenta';
Blockly.Msg['ROBOTS_SENSORS_WHITE'] = 'blanco';
Blockly.Msg['ROBOTS_SENSORS_BLACK'] = 'negro';
Blockly.Msg['ROBOTS_SENSORS_GET_LIGHT_TITLE'] = '[Rocky] sensor de luz nivel de %1';
Blockly.Msg['ROBOTS_SENSORS_AMBIENT'] = 'luz ambiental';
Blockly.Msg['ROBOTS_SENSORS_REFLECTED'] = 'luz reflejada';
Blockly.Msg['ROBOTS_SENSORS_GREYNESS'] = 'nivel de gris';
Blockly.Msg['ROBOTS_SENSORS_GET_LIGHT_TOOLTIP'] = 'Devuelve el valor del sensor IR de luz para el tipo seleccionado (luz ambiental, luz reflejada, nivel de gris).';
Blockly.Msg['ROBOTS_SENSORS_IS_OBSTACLE_AHEAD_TITLE'] = '[Rocky] ¿obstáculo adelante?';
Blockly.Msg['ROBOTS_SENSORS_IS_OBSTACLE_AHEAD_TOOLTIP'] = 'Devuelve verdadero si se detecta un obstáculo frente al robot Rocky.';
Blockly.Msg['ROBOTS_SENSORS_SET_LED_COLOR_TITLE'] = '[Rocky] LED color %1';
Blockly.Msg['ROBOTS_SENSORS_SET_LED_COLOR_TOOLTIP'] = 'Establece el color del LED del robot Rocky (rojo, verde, azul, amarillo, cian, magenta, blanco, negro).';
