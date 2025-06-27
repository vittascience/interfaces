/**
 * @fileoverview Spanish messages for Lego Spike. (ES)
 */

'use strict';

// Display
Blockly.Msg['DISPLAY_SHOW_LEDS_TOOLTIP'] = "Permite cambiar el color de los LEDs en la matriz 3x3.";
Blockly.Msg['DISPLAY_SET_PIXEL_TITLE'] = "%1 controlar LED x %2 y %3 %4";
Blockly.Msg['DISPLAY_SET_PIXEL_TOOLTIP'] = "Permite cambiar el color de un LED en la matriz 3x3.";
Blockly.Msg['DISPLAY_SET_INTENSITY_TITLE'] = "%1 ajustar intensidad %2 %";
Blockly.Msg['DISPLAY_SET_INTENSITY_TOOLTIP'] = "Permite cambiar la intensidad luminosa de los LEDs en la matriz 3x3.";

// Actuators
Blockly.Msg['ACTUATORS_START_MOTOR_CONTINUOUS_TITLE'] = "%1 iniciar motor %2 velocidad %3 % de forma continua";
Blockly.Msg['ACTUATORS_START_MOTOR_CONTINUOUS_TOOLTIP'] = "Inicia el motor en la dirección especificada a la velocidad dada de forma continua.";
Blockly.Msg['ACTUATORS_START_MOTOR_FOR_TIME_TITLE'] = "%1 iniciar motor %2 velocidad %3 % durante %4 segundos";
Blockly.Msg['ACTUATORS_START_MOTOR_FOR_TIME_TOOLTIP'] = "Inicia el motor en la dirección especificada a la velocidad dada durante el tiempo especificado.";
Blockly.Msg['ACTUATORS_MOVE_MOTOR_TO_POSITION_TITLE'] = "%1 mover motor a la posición %2 ° velocidad %3 %";
Blockly.Msg['ACTUATORS_MOVE_MOTOR_TO_POSITION_TOOLTIP'] = "Mueve el motor a la posición especificada a la velocidad dada.";
Blockly.Msg['ACTUATORS_STOP_MOTOR_TITLE'] = "%1 detener motor";
Blockly.Msg['ACTUATORS_STOP_MOTOR_TOOLTIP'] = "Detiene el motor.";
Blockly.Msg['ACTUATORS_MOVE_MOTORS_BY_DEGREES_TITLE'] = "%1 mover motor %2 por %3 ° velocidad %4 %";
Blockly.Msg['ACTUATORS_MOVE_MOTORS_BY_DEGREES_TOOLTIP'] = "Mueve el motor por el número de grados especificado en la dirección dada a la velocidad proporcionada.";

// Communication
Blockly.Msg['COMMUNICATION_SPEECH_SYNTHESIS_SAY_TITLE'] = 'decir %1 en %2';
Blockly.Msg['COMMUNICATION_SPEECH_SYNTHESIS_SAY_TOOLTIP'] = 'Permite que el dispositivo hable en el idioma especificado.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'escribir en la consola %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Permite escribir datos en el puerto serie.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'con';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'nueva(s) línea(s)';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'trazar gráfico';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Este bloque permite escribir datos (numéricos) que serán visibles en el trazador. Puede ser usado con uno o más bloques en el formato "Nombre" y "Datos". Para ver los gráficos, haga clic en el icono "Modo Gráfico" en la consola.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Dato';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Nombre %1 Valor %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Este bloque se usa con el bloque "Trazar gráfico". Debe contener el nombre del valor a mostrar (texto) y el valor en sí (número).';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'esperar %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausa la ejecución del código.';
Blockly.Msg['IO_WAIT_SECOND'] = 'segundo(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milisegundo(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsegundo(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'esperar hasta %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Detiene la ejecución del código hasta que se cumpla la condición.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'iniciar cronómetro';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Inicia un cronómetro en 0 (en segundos).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valor del cronómetro en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Devuelve el valor del cronómetro desde la inicialización (en segundos o milisegundos).';

// Actuators
Blockly.Msg['ACTUATORS_MOVE_FORWARD_TITLE'] = 'avanzar';
Blockly.Msg['ACTUATORS_MOVE_FORWARD_TOOLTIP'] = 'Permite que el robot Lego Spike avance.';
Blockly.Msg['ACTUATORS_MOVE_BACKWARD_TITLE'] = 'retroceder';
Blockly.Msg['ACTUATORS_MOVE_BACKWARD_TOOLTIP'] = 'Permite que el robot Lego Spike retroceda.';
Blockly.Msg['ACTUATORS_TURN_LEFT_45_DEGREES_TITLE'] = 'girar a la izquierda 45°';
Blockly.Msg['ACTUATORS_TURN_LEFT_45_DEGREES_TOOLTIP'] = 'Permite que el robot Lego Spike gire a la izquierda 45°.';
Blockly.Msg['ACTUATORS_TURN_LEFT_90_DEGREES_TITLE'] = 'girar a la izquierda 90°';
Blockly.Msg['ACTUATORS_TURN_LEFT_90_DEGREES_TOOLTIP'] = 'Permite que el robot Lego Spike gire a la izquierda 90°.';
Blockly.Msg['ACTUATORS_TURN_RIGHT_45_DEGREES_TITLE'] = 'girar a la derecha 45°';
Blockly.Msg['ACTUATORS_TURN_RIGHT_45_DEGREES_TOOLTIP'] = 'Permite que el robot Lego Spike gire a la derecha 45°.';
Blockly.Msg['ACTUATORS_TURN_RIGHT_90_DEGREES_TITLE'] = 'girar a la derecha 90°';
Blockly.Msg['ACTUATORS_TURN_RIGHT_90_DEGREES_TOOLTIP'] = 'Permite que el robot Lego Spike gire a la derecha 90°.';

// Sensors
Blockly.Msg['SENSORS_COLOR_TITLE'] = '%1 color detectado';
Blockly.Msg['SENSORS_COLOR_TOOLTIP'] = 'Devuelve el color detectado como una cadena de caracteres (Negro, Violeta, Púrpura, Azul, Azul Celeste, Turquesa, Verde, Amarillo, Naranja, Rojo, Blanco).';
Blockly.Msg['SENSORS_COLOR_DETECTION_TITLE'] = 'el color detectado por %1 es %2';
Blockly.Msg['SENSORS_COLOR_DETECTION_TOOLTIP'] = 'Devuelve verdadero si el color detectado coincide con el especificado.';
