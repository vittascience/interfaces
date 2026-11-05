/**
 * @fileoverview English messages for Eliobot. (EN)
 */
'use strict';

// Display - Buint-in LED
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TITLE'] = 'controlar la LED integrada %1';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP'] = 'Permite encender la LED RGB integrada en el robot Eliobot.';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_OFF_TITLE'] = 'apagar la LED integrada';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_OFF_TOOLTIP'] = 'Permite apagar la LED RGB integrada en el robot Eliobot.';
// Display - Eyes
Blockly.Msg['DISPLAY_EYES_COLOR_TITLE'] = 'cambiar el color de %1 a %2';
Blockly.Msg['DISPLAY_EYES_COLOR_TOOLTIP'] = 'Permite cambiar el color de los ojos del robot Eliobot.';
Blockly.Msg['DISPLAY_EYES_COLOR_LEFT'] = 'del ojo izquierdo';
Blockly.Msg['DISPLAY_EYES_COLOR_RIGHT'] = 'del ojo derecho';
Blockly.Msg['DISPLAY_EYES_COLOR_BOTH'] = 'de ambos ojos';
Blockly.Msg['DISPLAY_EYES_EMOTION_TITLE'] = 'mostrar la emoción %1 en %2';
Blockly.Msg['DISPLAY_EYES_EMOTION_TOOLTIP'] = 'Permite mostrar una emoción predefinida en los ojos del robot Eliobot.';
Blockly.Msg['DISPLAY_EYES_EMOTION_TIRED'] = 'cansado';
Blockly.Msg['DISPLAY_EYES_EMOTION_HAPPY'] = 'feliz';
Blockly.Msg['DISPLAY_EYES_EMOTION_SAD'] = 'triste';
Blockly.Msg['DISPLAY_EYES_EMOTION_ANGRY'] = 'enfadado';
Blockly.Msg['DISPLAY_EYES_EMOTION_CONFUSED'] = 'confundido';
Blockly.Msg['DISPLAY_EYES_EMOTION_SURPRISED'] = 'sorprendido';
Blockly.Msg['DISPLAY_EYES_EMOTION_SLEEPY'] = 'somnoliento';
Blockly.Msg['DISPLAY_EYES_EMOTION_NEUTRAL'] = 'neutral';
Blockly.Msg['DISPLAY_EYES_EMOTION_THRILLED'] = 'emocionado';
Blockly.Msg['DISPLAY_EYES_EMOTION_DIZZY'] = 'mareado';
Blockly.Msg['DISPLAY_EYES_EMOTION_MUSIC'] = 'música';
Blockly.Msg['DISPLAY_EYES_EMOTION_LOVE'] = 'amor';
Blockly.Msg['DISPLAY_EYES_EMOTION_KO'] = 'KO';
Blockly.Msg['DISPLAY_EYES_EMOTION_AMAZED'] = 'asombrado';
Blockly.Msg['DISPLAY_EYES_EMOTION_LEFT_ARROW'] = 'flecha izquierda';
Blockly.Msg['DISPLAY_EYES_EMOTION_RIGHT_ARROW'] = 'flecha derecha';
Blockly.Msg['DISPLAY_EYES_EMOTION_DOWN_ARROW'] = 'flecha abajo';
Blockly.Msg['DISPLAY_EYES_EMOTION_UP_ARROW'] = 'flecha arriba';
Blockly.Msg['DISPLAY_EYES_MATRIX_UNICOLOR_TITLE'] = 'mostrar en la matriz de los ojos (monocroma)';
Blockly.Msg['DISPLAY_EYES_MATRIX_UNICOLOR_TOOLTIP'] = 'Permite mostrar una imagen personalizada en los ojos del robot Eliobot.';
Blockly.Msg['DISPLAY_RIGHT_EYE'] = 'ojo derecho';
Blockly.Msg['DISPLAY_LEFT_EYE'] = 'ojo izquierdo';
Blockly.Msg['DISPLAY_EYES_MATRIX_TITLE'] = "mostrar en la matriz de los ojos (paleta)";
Blockly.Msg['DISPLAY_EYES_MATRIX_TOOLTIP'] = 'Permite mostrar una imagen personalizada en los ojos del robot Eliobot. Cada píxel de la matriz puede configurarse con un color diferente.';

// Input/Output - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'esperar %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Hace una pausa en la ejecución del código.';
Blockly.Msg['IO_WAIT_SECOND'] = 'segundo(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milisegundo(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsegundo(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'esperar hasta %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Detiene la ejecución del código hasta que se cumpla la condición.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'reiniciar el cronómetro a 0';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Inicializa un cronómetro a 0 (en segundos).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valor del cronómetro en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Devuelve el valor del cronómetro desde la inicialización (en segundos o milisegundos).';

// Communication - Serial connection
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'escribir en la consola %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Permite escribir datos en la consola.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'con';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'saltos de línea';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'trazar el gráfico';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Este bloque permite escribir datos (numéricos) que serán visibles en el trazador. Puede usarse con uno o varios bloques en formato "Nombre" y "Datos". Para visualizar los gráficos, haga clic en el icono \'Modo Gráfico\' en la consola.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Dato';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Nombre %1 Valor %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Este bloque se usa con el bloque "Trazar el gráfico". Debe contener el nombre del valor a mostrar (texto) y su valor (número).';
// Communication - IR remote
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_TITLE'] = 'leer la señal del sensor %1';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_TOOLTIP'] = 'Permite leer la orden enviada por el mando infrarrojo del Eliobot. Este bloque devuelve una cadena de caracteres correspondiente a la orden recibida (arriba, abajo, izquierda, derecha, centro).';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_FORWARD'] = 'adelante';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_BACKWARD'] = 'atrás';
Blockly.Msg['COMMUNICATION_IR_REMOTE_TITLE'] = 'si se recibe la orden %1 del mando infrarrojo entonces';
Blockly.Msg['COMMUNICATION_IR_REMOTE_TOOLTIP'] = 'Permite leer la orden enviada por el mando infrarrojo del Eliobot. Este bloque devuelve una cadena de caracteres correspondiente a la orden recibida (arriba, abajo, izquierda, derecha, centro).';
Blockly.Msg['COMMUNICATION_IR_REMOTE_BOOLEAN_TITLE'] = 'se recibe la orden %1 del mando infrarrojo';
Blockly.Msg['COMMUNICATION_IR_REMOTE_BOOLEAN_TOOLTIP'] = 'Permite comprobar si se recibió una orden específica del mando infrarrojo del Eliobot. Este bloque devuelve un booleano: verdadero si la orden especificada fue recibida, falso en caso contrario.';
Blockly.Msg['COMMUNICATION_IR_REMOTE_UP'] = 'arriba';
Blockly.Msg['COMMUNICATION_IR_REMOTE_DOWN'] = 'abajo';
Blockly.Msg['COMMUNICATION_IR_REMOTE_LEFT'] = 'izquierda';
Blockly.Msg['COMMUNICATION_IR_REMOTE_RIGHT'] = 'derecha';
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
Blockly.Msg['SENSORS_READ_OBSTACLE_TITLE'] = 'un obstáculo está %1';
Blockly.Msg['SENSORS_READ_OBSTACLE_TOOLTIP'] = 'Permite detectar si hay un obstáculo.';
Blockly.Msg['SENSORS_READ_OBSTACLE_FORWARD'] = 'delante';
Blockly.Msg['SENSORS_READ_OBSTACLE_BACKWARD'] = 'detrás';
Blockly.Msg['SENSORS_READ_OBSTACLE_RIGHT'] = 'a la derecha';
Blockly.Msg['SENSORS_READ_OBSTACLE_LEFT'] = 'a la izquierda';
Blockly.Msg['SENSORS_LINE_FOLLOW_TITLE'] = 'seguir la línea';
Blockly.Msg['SENSORS_LINE_FOLLOW_TOOLTIP'] = 'Permite al robot Eliobot seguir una línea.';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TITLE'] = 'sensibilidad del seguimiento de línea %1';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TOOLTIP'] = 'Permite ajustar la sensibilidad de los sensores del Eliobot.';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TITLE'] = 'estado del sensor de línea %1';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TOOLTIP'] = 'Devuelve el estado de uno de los sensores de seguimiento de línea.';
Blockly.Msg['SENSORS_LINE_LEFT'] = "izquierda";
Blockly.Msg['SENSORS_LINE_MIDDLE_LEFT'] = "medio-izquierda";
Blockly.Msg['SENSORS_LINE_MIDDLE'] = "medio";
Blockly.Msg['SENSORS_LINE_MIDDLE_RIGHT'] = "medio-derecha";
Blockly.Msg['SENSORS_LINE_RIGHT'] = "derecha";
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TITLE'] = 'valor del sensor de línea %1';
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TOOLTIP'] = 'Devuelve el valor de uno de los sensores de seguimiento de línea del Eliobot.';
Blockly.Msg['SENSORS_AUTO_LINE_CALIBRATION'] = 'calibración automática de los sensores de línea';
Blockly.Msg['SENSORS_AUTO_LINE_CALIBRATION_TOOLTIP'] = 'Permite calibrar automáticamente los sensores de línea del Eliobot. El robot debe colocarse sobre una superficie clara y luego sobre una superficie oscura para que la calibración se realice correctamente.';

// Actuators - robot
Blockly.Msg['ROBOT_MOVE_TITLE'] = ' %1';
Blockly.Msg['ROBOT_MOVE_TOOLTIP'] = 'Permite controlar los motores del robot Eliobot para avanzar o retroceder.';
Blockly.Msg['ROBOT_MOVE_FORWARD'] = 'avanzar';
Blockly.Msg['ROBOT_MOVE_BACKWARD'] = 'retroceder';
Blockly.Msg['ROBOT_ROTATE_TITLE'] = 'girar a %1';
Blockly.Msg['ROBOT_ROTATE_TOOLTIP'] = 'Gira el Eliobot hacia la izquierda o hacia la derecha.';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'derecha';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'izquierda';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'detener los motores';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'Detiene los motores del Eliobot.';
Blockly.Msg['ROBOT_SET_SPEED_TITLE'] = 'ajustar la velocidad a %1 %';
Blockly.Msg['ROBOT_SET_SPEED_TOOLTIP'] = 'Cambia la velocidad del Eliobot.';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TITLE'] = 'girar %1 %2°';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TOOLTIP'] = 'Gira el Eliobot a la izquierda o a la derecha el ángulo deseado.';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TITLE'] = 'girar la rueda %1 en sentido %2';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TOOLTIP'] = 'Gira una de las ruedas del Eliobot en la dirección deseada.';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TITLE'] = '%1 de %2 casilla(s)';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TOOLTIP'] = 'Permite al Eliobot moverse por casilla.';
Blockly.Msg['ROBOT_TURN_90_TITLE'] = 'girar a %1';
Blockly.Msg['ROBOT_TURN_90_TOOLTIP'] = 'Permite al Eliobot girar 90° a la izquierda o a la derecha.';
Blockly.Msg['ROBOT_SET_SQUARE_SIZE_TITLE'] = 'tamaño de una casilla %1 cm';
Blockly.Msg['ROBOT_SET_SQUARE_SIZE_TOOLTIP'] = 'Permite ajustar el tamaño de una casilla para los desplazamientos por casilla del Eliobot.';
Blockly.Msg['ROBOT_TURN_RIGHT'] = 'derecha';
Blockly.Msg['ROBOT_TURN_LEFT'] = 'izquierda';
Blockly.Msg['ROBOT_WAITING_TITLE'] = 'esperar %1 %2 antes de detener los motores';
Blockly.Msg['ROBOT_WAITING_TOOLTIP'] = 'Permite al Eliobot esperar un cierto tiempo antes de detenerse.';
Blockly.Msg['ROBOT_UNIT_SECONDS'] = 'segundo(s)';
Blockly.Msg['ROBOT_UNIT_MILLISECONDS'] = 'milisegundo(s)';
// Actuators - Buzzer
Blockly.Msg['ACTUATORS_PLAY_NOTE_TITLE'] = 'tocar la nota %1 durante %2 %3';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TOOLTIP'] = 'Este bloque permite tocar una nota de música. La nota se define por su nombre (Do, Re, Mi, Fa, Sol, La, Si) y por la duración.';
Blockly.Msg['ACTUATORS_FREQUENCY_TITLE'] = 'reproducir una frecuencia %1 (Hz) durante %2 %3';
Blockly.Msg['ACTUATORS_FREQUENCY_TOOLTIP'] = 'Este bloque permite reproducir una frecuencia. La frecuencia se define en Hertz (Hz) y el tiempo durante el cual se reproduce.';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TITLE'] = 'reproducir la música %1';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TOOLTIP'] = 'Este bloque permite reproducir una melodía predefinida. Hay varias melodías disponibles.';
Blockly.Msg['ACTUATORS_SET_VOLUME_TITLE'] = 'ajustar el volumen a %1 %';
Blockly.Msg['ACTUATORS_SET_VOLUME_TOOLTIP'] = 'Este bloque permite ajustar el volumen del sonido del Eliobot.';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TITLE'] = 'reproducir el sonido %1';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TOOLTIP'] = 'Este bloque reproduce un sonido predefinido. Hay varios sonidos disponibles.';
Blockly.Msg['ACTUATORS_SOUND_JUMP'] = 'salto';
Blockly.Msg['ACTUATORS_SOUND_LASER'] = 'láser';
Blockly.Msg['ACTUATORS_SOUND_QUESTION'] = 'pregunta';
Blockly.Msg['ACTUATORS_SOUND_ERROR'] = 'error';
Blockly.Msg['ACTUATORS_SOUND_EXPLOSION'] = 'explosión';
Blockly.Msg['ACTUATORS_SOUND_LAND'] = 'aterrizaje';
Blockly.Msg['ACTUATORS_SOUND_HAPPY'] = 'feliz';
Blockly.Msg['ACTUATORS_SOUND_WIN'] = 'victoria';
Blockly.Msg['ACTUATORS_SOUND_ALERT'] = 'alerta';
Blockly.Msg['ACTUATORS_SOUND_HELLO'] = 'hola';
Blockly.Msg['ACTUATORS_SOUND_STARTUP'] = 'inicio';
Blockly.Msg['ACTUATORS_SOUND_BUMP'] = 'colisión';
Blockly.Msg['ACTUATORS_SOUND_BLINK'] = 'parpadeo';

// Backpack - Display
Blockly.Msg['BACKPACK_DISPLAY_OLED_TEXT_TITLE'] = '[Pantalla OLED] mostrar el texto %1 en la línea %2';
Blockly.Msg['BACKPACK_DISPLAY_OLED_TEXT_TOOLTIP'] = 'Muestra texto en la pantalla OLED SSD1306.';
Blockly.Msg['BACKPACK_DISPLAY_OLED_CLEAR_TITLE'] = '[Pantalla OLED] limpiar la pantalla';
Blockly.Msg['BACKPACK_DISPLAY_OLED_CLEAR_TOOLTIP'] = 'Borra el texto de la pantalla OLED SSD1306.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TITLE'] = '[Matriz RGB 5x5] mostrar la imagen';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TOOLTIP'] = 'Permite mostrar un dibujo en la matriz de LEDs RGB 5x5.';
Blockly.Msg['BACKPACK_DISPLAY_CLEAR_MATRIX_TITLE'] = '[Matriz RGB 5x5] borrar la matriz';
Blockly.Msg['BACKPACK_DISPLAY_CLEAR_MATRIX_TOOLTIP'] = 'Borra la matriz de LEDs RGB 5x5.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TITLE'] = '[Matriz RGB 5x5] mostrar %1 en %2';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TOOLTIP'] = 'Muestra un icono en el color deseado.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TITLE'] = '[Matriz RGB 5x5] desplazar el texto %1 en %2';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TOOLTIP'] = 'Desplaza una cadena de texto del color deseado en la matriz de LEDs 5x5.';
// Backpack - Sensors
Blockly.Msg['BACKPACK_DHT11_SENSOR_TITLE'] = '[DHT11] %1';
Blockly.Msg['BACKPACK_DHT11_SENSOR_TOOLTIP'] = 'Obtiene la temperatura en grados Celsius (°C) o la humedad (en %) con el sensor DHT11.';
Blockly.Msg['SENSOR_TEMPERATURE'] = 'temperatura';
Blockly.Msg['SENSOR_HUMIDITY'] = 'humedad';
Blockly.Msg['SENSOR_PRESSURE'] = 'presión';
Blockly.Msg['SENSOR_ALTITUDE'] = 'altitud';
Blockly.Msg['BACKPACK_BME280_SENSOR_TITLE'] = '[BME280] %1';
Blockly.Msg['BACKPACK_BME280_SENSOR_TOOLTIP'] = 'Devuelve la temperatura ambiente en grados Celsius (°C) de -40 a 85 °C, Fahrenheit (°F) o Kelvin (K), la humedad (en %), la presión (en Pa) o la altitud (en m) gracias al sensor BME280.';
Blockly.Msg['BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TITLE'] = '[BME280] ajustar la presión al nivel del mar a %1';
Blockly.Msg['BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TOOLTIP'] = 'Permite definir la presión a nivel del mar para el sensor BME280, usada en el cálculo de la altitud.';
Blockly.Msg['BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TITLE'] = '[HC-SR04] distancia';
Blockly.Msg['BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TOOLTIP'] = 'Devuelve la distancia en cm gracias al sensor ultrasónico HC-SR04.';
Blockly.Msg['BACKPACK_SENSORS_GETLIGHT_TITLE'] = '[Sensor de luz] luminosidad en el pin %1';
Blockly.Msg['BACKPACK_SENSORS_GETLIGHT_TOOLTIP'] = 'Devuelve el nivel de luminosidad del sensor en el pin seleccionado.';
// Backpack - IO - Buttons
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_TITLE'] = '[Botón] %1 pulsado en el pin %2';
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_TOOLTIP'] = 'Devuelve el estado del botón conectado al pin IO2 o IO15.';
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_PRESSED'] = 'está';
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_NOT_PRESSED'] = 'no está';
// Backpack - IO - Potentiometer
Blockly.Msg['BACKPACK_IO_KNOB_VALUE_TITLE'] = '[Potenciómetro] valor en el pin %1';
Blockly.Msg['BACKPACK_IO_KNOB_VALUE_TOOLTIP'] = 'Devuelve el valor del potenciómetro conectado al pin IO2 o IO15';
// Backpack - Actuators - Motors
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TITLE'] = '[Servomotor] controlar el ángulo a %1° en el pin %2';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TOOLTIP'] = 'Permite controlar el ángulo (de 0 a 180°) de un servomotor en los pines PWM.';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TITLE'] = '[Servomotor continuo] controlar la velocidad %1 (%) dirección %2 en el pin %3';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TOOLTIP'] = 'Permite controlar la velocidad (de 0 a 100 %) de un servomotor continuo en los pines PWM.';
// Backpack - Actuators - Buzzer
Blockly.Msg['BACKPACK_ACTUATORS_GROVE_BUZZER_TITLE'] = '[Buzzer] reproducir la frecuencia %1 con el volumen %2 en el pin %3';
Blockly.Msg['BACKPACK_ACTUATORS_GROVE_BUZZER_TOOLTIP'] = 'Permite reproducir una frecuencia con un módulo Grove buzzer.';

// Network - Wifi
Blockly.Msg['NETWORK_WIFI_CONNECT_TITLE'] = 'Conectarse a la red Wi‑Fi SSID %1 con la contraseña %2';
Blockly.Msg['NETWORK_WIFI_CONNECT_TOOLTIP'] = 'Conecta Eliobot a una red Wi‑Fi con el nombre (SSID) y la contraseña proporcionados.';
Blockly.Msg['NETWORK_WIFI_DISCONNECT_TITLE'] = 'Desconectarse del Wi‑Fi';
Blockly.Msg['NETWORK_WIFI_DISCONNECT_TOOLTIP'] = 'Desconecta Eliobot de la red Wi‑Fi a la que está conectado.';
Blockly.Msg['NETWORK_WIFI_OPEN_ACCESS_POINT_TITLE'] = 'Abrir un punto de acceso Wi‑Fi SSID %1 con la contraseña %2';
Blockly.Msg['NETWORK_WIFI_OPEN_ACCESS_POINT_TOOLTIP'] = 'Crea un punto de acceso Wi‑Fi desde Eliobot con el nombre y la contraseña proporcionados.';
Blockly.Msg['NETWORK_WIFI_DEFINE_HOST_NAME_TITLE'] = 'Definir el nombre de host %1';
Blockly.Msg['NETWORK_WIFI_DEFINE_HOST_NAME_TOOLTIP'] = 'Define el nombre de host (hostname) de Eliobot en la red. Ese nombre permite acceder a Eliobot desde un navegador.';
Blockly.Msg['NETWORK_WIFI_DEFINE_ANTENNA_POWER_TITLE'] = 'Definir la potencia de la antena Wi‑Fi %1';
Blockly.Msg['NETWORK_WIFI_DEFINE_ANTENNA_POWER_TOOLTIP'] = 'Ajusta la potencia de transmisión de la antena Wi‑Fi de Eliobot (en dBm).';
Blockly.Msg['NETWORK_WIFI_IS_CONNECTED_TITLE'] = '¿conectado al Wi‑Fi?';
Blockly.Msg['NETWORK_WIFI_IS_CONNECTED_TOOLTIP'] = 'Devuelve verdadero si Eliobot está conectado a una red Wi‑Fi, falso en caso contrario.';
Blockly.Msg['NETWORK_WIFI_SCAN_NETWORKS_TITLE'] = 'escanear las redes Wi‑Fi disponibles';
Blockly.Msg['NETWORK_WIFI_SCAN_NETWORKS_TOOLTIP'] = 'Devuelve la lista de redes Wi‑Fi disponibles alrededor de Eliobot.';
Blockly.Msg['NETWORK_WIFI_GET_IP_TITLE'] = 'dirección IP de Eliobot';
Blockly.Msg['NETWORK_WIFI_GET_IP_TOOLTIP'] = 'Devuelve la dirección IP de Eliobot en la red Wi‑Fi.';
// Network - HTML
Blockly.Msg['NETWORK_HTML_CREATE_PAGE_TITLE'] = 'Crear una página web con el título %1 y contenido';
Blockly.Msg['NETWORK_HTML_CREATE_PAGE_TOOLTIP'] = 'Crea una página web accesible desde un navegador. Añade elementos HTML al contenido de la página.';
Blockly.Msg['NETWORK_HTML_CREATE_BUTTON_TITLE'] = 'Agregar un botón %1 %2 acción';
Blockly.Msg['NETWORK_HTML_CREATE_BUTTON_TOOLTIP'] = 'Agrega un botón a la página web. Los bloques en "acción" son ejecutados por Eliobot cuando se pulsa el botón.';
Blockly.Msg['NETWORK_HTML_DISPLAY_VALUE_TITLE'] = 'Mostrar el valor %1 con el nombre %2';
Blockly.Msg['NETWORK_HTML_DISPLAY_VALUE_TOOLTIP'] = 'Muestra un valor en la página web y lo actualiza automáticamente cada segundo.';
Blockly.Msg['NETWORK_HTML_CREATE_TAG_TITLE'] = 'Etiqueta %1';
Blockly.Msg['NETWORK_HTML_CREATE_TAG_TOOLTIP'] = 'Crea una etiqueta HTML (div o center) para organizar el contenido de tu página web.';
Blockly.Msg['NETWORK_HTML_CREATE_TITLE_TAG_TITLE'] = 'Título %1 %2';
Blockly.Msg['NETWORK_HTML_CREATE_TITLE_TAG_TOOLTIP'] = 'Añade un título HTML (de h1 a h6) a tu página web. h1 es el más grande, h6 el más pequeño.';
Blockly.Msg['NETWORK_HTML_CREATE_PARAGRAPH_TITLE'] = 'Párrafo %1';
Blockly.Msg['NETWORK_HTML_CREATE_PARAGRAPH_TOOLTIP'] = 'Añade un párrafo de texto a tu página web.';
