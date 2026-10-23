/**
 * @fileoverview Spanish messages for AlphAI. (ES)
 */

'use strict';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'esperar %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausa la ejecución del código.';
Blockly.Msg['IO_WAIT_SECOND'] = 'segundo(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milisegundo(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsegundo(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'esperar hasta %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Detiene la ejecución del código hasta que se cumpla la condición.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'iniciar el cronómetro';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Inicializa un cronómetro en 0 (segundos).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valor del cronómetro en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Devuelve el valor del cronómetro desde su inicio (en segundos o milisegundos).';
// Robot - Communication
Blockly.Msg['ROBOT_PRINT_MESSAGE_TITLE'] = 'mostrar en la consola %1';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TOOLTIP'] = 'Muestra un mensaje en la consola de salida.';
// Robot - Actuators
Blockly.Msg['ROBOT_SET_DIRECTION_TITLE'] = '%1 a la velocidad %2';
Blockly.Msg['ROBOT_SET_DIRECTION_TOOLTIP'] = 'Mueve el robot en la dirección elegida a la velocidad indicada (entre -100 y 100).';
Blockly.Msg['ROBOT_SET_MOTOR_TITLE'] = 'velocidad motor izquierdo %1 motor derecho %2';
Blockly.Msg['ROBOT_SET_MOTOR_TOOLTIP'] = 'Controla la velocidad de los motores izquierdo y derecho del robot (entre -100 y 100).';
Blockly.Msg['ROBOT_SET_DURATION'] = 'durante';
Blockly.Msg['ROBOT_FORWARD'] = 'avanzar';
Blockly.Msg['ROBOT_BACKWARD'] = 'retroceder';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'girar a la izquierda';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'girar a la derecha';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'detener el robot';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'Detiene el robot.';
Blockly.Msg['ROBOT_SET_BUZZER_TITLE'] = '%1 el zumbador';
Blockly.Msg['ROBOT_SET_BUZZER_TOOLTIP'] = 'Activa o desactiva el zumbador del robot.';
Blockly.Msg['ROBOT_BUZZER_ON'] = 'activar';
Blockly.Msg['ROBOT_BUZZER_OFF'] = 'desactivar';
// Robot - Sensors
Blockly.Msg['ROBOT_IS_BLOCKED_TITLE'] = '¿está el robot bloqueado?';
Blockly.Msg['ROBOT_IS_BLOCKED_TOOLTIP'] = 'Devuelve verdadero si el robot está bloqueado, en caso contrario devuelve falso.';
Blockly.Msg['ROBOT_GET_DISTANCE_TITLE'] = 'valor del sensor de distancia (en cm)';
Blockly.Msg['ROBOT_GET_DISTANCE_TOOLTIP'] = 'Devuelve el valor del sensor de distancia del robot (en cm).';
Blockly.Msg['ROBOT_GET_INFRA_RED_TITLE'] = 'valores de los sensores de línea negra %1';
Blockly.Msg['ROBOT_GET_INFRA_RED_TOOLTIP'] = 'Permite leer los valores de los sensores de seguimiento de línea, de aproximadamente 0-500 (negro) a 500-1000 (blanco). La opción \'todos\' del bloque devuelve la matriz con los valores de los 5 sensores.';
Blockly.Msg['ROBOT_ALL_SENSORS'] = 'todos';
// Robot - Camera
Blockly.Msg['ROBOT_SET_CAMERA_TITLE'] = 'activar la cámara con la resolución %1';
Blockly.Msg['ROBOT_SET_CAMERA_TOOLTIP'] = 'Activa la cámara del robot con la resolución elegida.';
Blockly.Msg['ROBOT_GET_CAMERA_TITLE'] = 'imagen de la cámara';
Blockly.Msg['ROBOT_GET_CAMERA_TOOLTIP'] = 'Devuelve la imagen capturada por la cámara del robot. Si la resolución elegida es \'1x1\', devuelve una lista de 3 enteros (componentes R, G, B), entre 0 y 255. Si la resolución es \'1x2\', devuelve una lista de 2 listas de 3 enteros. En otros casos, devuelve una lista de n_filas listas de n_columnas listas de 3 enteros.';
// Robot - Display
Blockly.Msg['ROBOT_SET_LEDS_RGB_TITLE'] = 'controlar los LEDs en R %1 G %2 B %3';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TOOLTIP'] = 'Controla los LEDs del robot especificando las componentes roja, verde y azul (entre 0 y 255).';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TITLE'] = 'controlar los LEDs a %1';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TOOLTIP'] = 'Controla los LEDs del robot eligiendo un color de la paleta.';
Blockly.Msg['ROBOT_ROBOT_ALL_SENSORS'] = 'todos';
