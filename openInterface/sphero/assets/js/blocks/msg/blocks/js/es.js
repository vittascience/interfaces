/**
 * @fileoverview Spanish messages for Sphero. (ES)
 */

'use strict';

// Display 
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_TITLE'] = '[LED principal] R %1 V %2 A %3';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_TOOLTIP'] = 'Cambia el color del LED principal en formato RGB para el robot Sphero Mini.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_PALETTE_TITLE'] = '[LED principal] %1';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_PALETTE_TOOLTIP'] = 'Cambia el color del LED principal del robot Sphero Mini usando una paleta de colores.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_FADE_TITLE'] = '[LED principal] desvanecer de %1 a %2 durante %3 s';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_FADE_TOOLTIP'] = 'Cambia el color del LED principal del robot Sphero Mini desvaneciendo los colores.';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_BLINK_TITLE'] = '[LED principal] parpadear en %1 durante %2 s %3 veces';
Blockly.Msg['DISPLAY_SET_MAIN_LED_RGB_BLINK_TOOLTIP'] = 'Hace que el LED principal del robot Sphero Mini parpadee.';
Blockly.Msg['DISPLAY_SET_BACK_LED_INTENSITY_TITLE'] = '[LED trasero] intensidad %1';
Blockly.Msg['DISPLAY_SET_BACK_LED_INTENSITY_TOOLTIP'] = 'Cambia la intensidad del LED trasero (entre 0 y 255) del robot Sphero Mini.';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'esperar %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausa la ejecución del código.';
Blockly.Msg['IO_WAIT_SECOND'] = 'segundo(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milisegundo(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsegundo(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'esperar hasta %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Pausa la ejecución del código hasta que se cumpla la condición.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'iniciar cronómetro';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Inicializa un cronómetro a 0 (en segundos).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valor del cronómetro en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Devuelve el valor del cronómetro desde la inicialización (en segundos o milisegundos).';

// Communication
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'escribir en la consola %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Escribe datos en el puerto serie.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'con';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'línea(s) nueva(s)';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'trazar gráfico';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Este bloque escribe datos (numéricos) que serán visibles en el trazador. Puede usarse con uno o más bloques en el formato "Nombre" y "Datos". Para ver los gráficos, haga clic en el icono \'Modo Gráfico\' en la consola.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Datos';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Nombre %1 Valor %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Este bloque se debe usar con el bloque "Trazar gráfico". Debe contener el nombre del valor a mostrar (texto) y el valor en cuestión (número).';

// Sensors
Blockly.Msg['SENSORS_PITCH_TITLE'] = 'inclinación (°)';
Blockly.Msg['SENSORS_PITCH_TOOLTIP'] = 'Devuelve el valor de la inclinación.';
Blockly.Msg['SENSORS_ROLL_TITLE'] = 'alabeo (°)';
Blockly.Msg['SENSORS_ROLL_TOOLTIP'] = 'Devuelve el valor del alabeo.';
Blockly.Msg['SENSORS_YAW_TITLE'] = 'guiñada (°)';
Blockly.Msg['SENSORS_YAW_TOOLTIP'] = 'Devuelve el valor de la guiñada.';
Blockly.Msg['SENSORS_ACCELEROMETER_TITLE'] = 'acelerómetro (g) %1';
Blockly.Msg['SENSORS_ACCELEROMETER_TOOLTIP'] = 'Devuelve el valor del acelerómetro en los ejes x, y o z.';
Blockly.Msg['SENSORS_GYROSCOPE_TITLE'] = 'giroscopio %1';
Blockly.Msg['SENSORS_GYROSCOPE_TOOLTIP'] = 'Devuelve el valor del giroscopio en los ejes x, y o z.';
Blockly.Msg['SENSORS_IS_FALL_DETECTED_TITLE'] = '¿colisión?';
Blockly.Msg['SENSORS_IS_FALL_DETECTED_TOOLTIP'] = 'Devuelve verdadero si se detecta una colisión.';
Blockly.Msg['X_AXIS'] = 'x';
Blockly.Msg['Y_AXIS'] = 'y';
Blockly.Msg['Z_AXIS'] = 'z';
Blockly.Msg['STRENGTH'] = 'fuerza';
// Actuators
Blockly.Msg['ACTUATORS_SET_MOTORS_TITLE'] = '%1 velocidad %2';
Blockly.Msg['ACTUATORS_SET_MOTORS_TOOLTIP'] = 'Permite que el robot Sphero Mini avance o retroceda a una velocidad entre 0 y 255.';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_TIMEOUT_TITLE'] = '%1 velocidad %2 durante %3 s';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_TIMEOUT_TOOLTIP'] = 'Permite que el robot Sphero Mini avance o retroceda a una velocidad entre 0 y 255 durante un tiempo determinado.';
Blockly.Msg['ACTUATORS_SET_HEADING_TITLE'] = 'rumbo %1 °';
Blockly.Msg['ACTUATORS_SET_HEADING_TOOLTIP'] = 'Cambia el rumbo del robot Sphero Mini.';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_HEADING_TITLE'] = '%1 velocidad %2 rumbo %3 °';
Blockly.Msg['ACTUATORS_SET_MOTORS_WITH_HEADING_TOOLTIP'] = 'Permite que el robot Sphero Mini avance o retroceda a una velocidad entre 0 y 255 con un rumbo determinado.';
Blockly.Msg['ACTUATORS_ROTATE_TITLE'] = 'girar %1 velocidad %2';
Blockly.Msg['ACTUATORS_ROTATE_TOOLTIP'] = 'Permite que el robot Sphero Mini gire a una velocidad entre 0 y 255.';
Blockly.Msg['ACTUATORS_ROTATE_WITH_TIMEOUT_TITLE'] = 'girar %1 velocidad %2 durante %3 s';
Blockly.Msg['ACTUATORS_ROTATE_WITH_TIMEOUT_TOOLTIP'] = 'Permite que el robot Sphero Mini gire a una velocidad entre 0 y 255 durante un tiempo determinado.';
Blockly.Msg['ACTUATORS_SET_MOTOR_TITLE'] = 'motor en %1 dirección %2 velocidad %3';
Blockly.Msg['ACTUATORS_SET_MOTOR_TOOLTIP'] = 'Controla el motor derecho o izquierdo del robot Sphero Mini a una velocidad entre 0 y 255 en una dirección determinada.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'detener motores';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Detiene los motores del robot Sphero Mini.';
Blockly.Msg['ACTUATORS_RESET_HEADING_TITLE'] = 'restablecer rumbo predeterminado';
Blockly.Msg['ACTUATORS_RESET_HEADING_TOOLTIP'] = 'Restablece el rumbo del robot Sphero Mini.';
Blockly.Msg['ACTUATORS_GO_FORWARD'] = "avanzar";
Blockly.Msg['ACTUATORS_GO_BACKWARD'] = "retroceder";
Blockly.Msg['ACTUATORS_MOTOR_RIGHT'] = "derecha";
Blockly.Msg['ACTUATORS_MOTOR_LEFT'] = "izquierda";
Blockly.Msg['ACTUATORS_MOTOR_RIGHT&LEFT'] = "derecha&izquierda";