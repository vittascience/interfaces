/**
 * @fileoverview English messages for Eliobot. (EN)
 */
'use strict';
// Display
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TITLE'] = 'cambiar el color del LED integrado %1';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP'] = 'Permite iluminar el LED RGB integrado en el robot Eliobot.';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_OFF_TITLE'] = 'apagar el LED integrado';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_OFF_TOOLTIP'] = 'Permite apagar el LED RGB integrado en el robot Eliobot.';
// Input/Output
Blockly.Msg['IO_WAIT_TITLE'] = 'wait %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausa en la ejecución del código';
Blockly.Msg['IO_WAIT_SECOND'] = 'segundo(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milisegundo(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsegundo(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'espera hasta %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Detiene la ejecución del código hasta que se cumpla la condición';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'iniciar el temporizador';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Inicializar un temporizador a 0 (en segundos)';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'Valor del cronómetro en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Devuelve el valor del temporizador de la inicialización (en segundos o milisegundos)';
Blockly.Msg['IO_BUTTON_STATE_TITLE'] = 'button %1 pressed';
Blockly.Msg['IO_BUTTON_STATE_TOOLTIP'] = '';
Blockly.Msg['IO_BUTTON_STATE_PRESSED'] = 'is';
Blockly.Msg['IO_BUTTON_STATE_NOT_PRESSED'] = 'is not';
// Communication - Serial connection
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'escribir en la consola %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Permite escribir datos en el puerto serie';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'con';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'avance de línea(s)';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'trazar gráfico';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Este bloque permite escribir datos (numéricos) que serán visibles en el trazador. Puede utilizarse con uno o varios bloques con formato "Nom" y "Datos". Para ver los gráficos, haga clic en el icono "Modo gráfico" de la consola';
Blockly.Msg['COMMUNICATION_DATA'] = 'Datos';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Nombre %1 Valor %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Este bloque debe utilizarse junto con el bloque "Plot Graph". Debe contener a su vez el nombre del valor a mostrar (texto), y el valor en cuestión (número)';
// Sensors
Blockly.Msg['SENSORS_READ_OBSTACLE_TITLE'] = 'un obstáculo %1';
Blockly.Msg['SENSORS_READ_OBSTACLE_TOOLTIP'] = 'Permite detectar la presencia de un obstáculo.';
Blockly.Msg['SENSORS_READ_OBSTACLE_FORWARD'] = 'delante';
Blockly.Msg['SENSORS_READ_OBSTACLE_BACKWARD'] = 'detrás ';
Blockly.Msg['SENSORS_READ_OBSTACLE_RIGHT'] = 'a la derecha';
Blockly.Msg['SENSORS_READ_OBSTACLE_LEFT'] = 'a la izquierda';
Blockly.Msg['SENSORS_LINE_FOLLOW_TITLE'] = 'seguir la línea';
Blockly.Msg['SENSORS_LINE_FOLLOW_TOOLTIP'] = 'Permite al Eliobot seguir una línea.';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TITLE'] = 'sensibilidad de seguimiento de línea %1';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TOOLTIP'] = 'Permite cambiar la sensibilidad de los sensores del Eliobot.';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TITLE'] = 'estado del sensor de línea %1';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TOOLTIP'] = 'Devuelve el estado de uno de los sensores de seguimiento de línea.';
Blockly.Msg['SENSORS_LINE_LEFT'] = "izquierda";
Blockly.Msg['SENSORS_LINE_MIDDLE_LEFT'] = "medio izquierda";
Blockly.Msg['SENSORS_LINE_MIDDLE'] = "medio";
Blockly.Msg['SENSORS_LINE_MIDDLE_RIGHT'] = "medio derecha";
Blockly.Msg['SENSORS_LINE_RIGHT'] = "derecha";
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TITLE'] = 'valor del sensor de línea %1';
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TOOLTIP'] = 'Devuelve el valor de uno de los sensores de seguimiento de línea del Eliobot.';
Blockly.Msg['SENSORS_DHT11_TEMPERATURE_TITLE'] = '[DHT11] temperatura';
Blockly.Msg['SENSORS_DHT11_TEMPERATURE_TOOLTIP'] = 'Mide la temperatura (°C) con el sensor DHT11.';
Blockly.Msg['SENSORS_DHT11_HUMIDITY_TITLE'] = '[DHT11] humedad';
Blockly.Msg['SENSORS_DHT11_HUMIDITY_TOOLTIP'] = 'Mide la humedad (%) con el sensor DHT11.';
// Actuators
Blockly.Msg['ROBOT_MOVE_TITLE'] = 'controlar el robot %1 a la velocidad %2';
Blockly.Msg['ROBOT_MOVE_TOOLTIP'] = 'Permite controlar los motores del robot Eliobot para que avance o retroceda.';
Blockly.Msg['ROBOT_MOVE_FORWARD'] = 'adelante';
Blockly.Msg['ROBOT_MOVE_BACKWARD'] = 'atrás';
Blockly.Msg['ROBOT_ROTATE_TITLE'] = 'girar a la %1 a la velocidad %2';
Blockly.Msg['ROBOT_ROTATE_TOOLTIP'] = 'Gire el Eliobot a la izquierda o a la derecha.';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'derecha';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'izquierda';
Blockly.Msg['ROBOT_ROTATE_FOREVER_TITLE'] = 'girar a la %1 durante %2 %3 a la velocidad %4';
Blockly.Msg['ROBOT_ROTATE_FOREVER_TOOLTIP'] = 'Gira la Eliobot a la izquierda o a la derecha durante un periodo determinado.';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'detener el robot';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'Parar motores del Eliobot.';
Blockly.Msg['ROBOT_SET_SPEED_TITLE'] = 'velocidad %1 %';
Blockly.Msg['ROBOT_SET_SPEED_TOOLTIP'] = 'Cambia la velocidad del Eliobot.';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TITLE'] = 'rotar %1 de %2° a la velocidad %3';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TOOLTIP'] = 'Rota el Eliobot a la izquierda o derecha del ángulo deseado.';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TITLE'] = 'girar rueda %1 hacia %2 a la velocidad %3';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TOOLTIP'] = 'Gira una de las ruedas del Eliobot en la dirección deseada.';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TITLE'] = 'avanzar %1 paso(s) a la velocidad %2';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TOOLTIP'] = 'Permite al Eliobot avanzar por pasos.';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TITLE'] = 'tocar nota %1 durante %2 %3';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TOOLTIP'] = 'Este bloque permite tocar una nota musical. La nota está definida por su nombre (Do, Re, Mi, Fa, Sol, La, Si) y el tiempo durante el cual se toca.';
Blockly.Msg['ACTUATORS_FREQUENCY_TITLE'] = 'tocar frecuencia %1 (Hz) durante %2 %3';
Blockly.Msg['ACTUATORS_FREQUENCY_TOOLTIP'] = 'Este bloque permite tocar una frecuencia. La frecuencia está definida en Hertz (Hz) y el tiempo durante el cual se toca.';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TITLE'] = 'tocar música %1';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TOOLTIP'] = 'Este bloque permite tocar música predefinida. Hay varias piezas de música predefinidas disponibles.';
Blockly.Msg['ACTUATORS_SET_VOLUME_TITLE'] = 'ajustar volumen a %1 %';
Blockly.Msg['ACTUATORS_SET_VOLUME_TOOLTIP'] = 'Este bloque ajusta el volumen. El nivel de volumen se establece en porcentaje.';