/**
 * @fileoverview Spanish messages for Loti-bot. (ES)
 */

'use strict';

// Display
Blockly.Msg['DISPLAY_SET_LEDS_RGB_TITLE'] = '[LEDs] R %1 G %2 B %3';
Blockly.Msg['DISPLAY_SET_LEDS_RGB_TOOLTIP'] = 'Cambia el color de los LEDs del Loti-bot en formato RGB.';
Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TITLE'] = '[LEDs] %1';
Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TOOLTIP'] = 'Cambia el color de los LEDs del Loti-bot usando una paleta de colores.';
Blockly.Msg['DISPLAY_SET_LED_RGB_TITLE'] = '[LEDs] izquierda R %1 V %2 A %3 derecha R %4 V %5 A %6';
Blockly.Msg['DISPLAY_SET_LED_RGB_TOOLTIP'] = 'Cambia el color de los LEDs izquierdo y derecho en formato RGB en el robot Loti-bot.';
Blockly.Msg['DISPLAY_SET_LED_PALETTE_TITLE'] = '[LEDs] izquierda %1 derecha %2';
Blockly.Msg['DISPLAY_SET_LED_PALETTE_TOOLTIP'] = Blockly.Msg['DISPLAY_SET_LEDS_PALETTE_TOOLTIP'];
Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TITLE'] = '[Faros] potencia %1';
Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TOOLTIP'] = 'Ajusta la potencia de los faros del Loti-bot (entre 0 y 255).';
Blockly.Msg['DISPLAY_SET_HEADLIGHT_TITLE'] = '[Faros] potencia izquierda %1 potencia derecha %2';
Blockly.Msg['DISPLAY_SET_HEADLIGHT_TOOLTIP'] = Blockly.Msg['DISPLAY_SET_HEADLIGHTS_TOOLTIP'];

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'esperar %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Hace una pausa en la ejecución del código.';
Blockly.Msg['IO_WAIT_SECOND'] = 'segundo(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milisegundo(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsegundo(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'esperar hasta %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Detiene la ejecución del código hasta que se cumpla la condición.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'iniciar cronómetro';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Inicializa un cronómetro en 0 (en segundos).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valor del cronómetro en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Devuelve el valor del cronómetro desde su inicialización (en segundos o milisegundos).';

// Communication
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'escribir en la consola %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Permite escribir datos en el puerto serie.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'con';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'salto(s) de línea';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'dibujar gráfico';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Este bloque permite escribir datos (numéricos) que serán visibles en el trazador. Se puede usar con uno o más bloques en el formato "Nombre" y "Datos". Para visualizar los gráficos, hacer clic en el icono \'Modo Gráfico\' en la consola.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Dato';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Nombre %1 Valor %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Este bloque se debe usar con el bloque "Dibujar gráfico". Debe contener el nombre del valor a mostrar (texto) y el valor real (número).';

// Sensors
Blockly.Msg["SENSORS_IS_STOPPED_TITLE"] = "¿está detenido?";
Blockly.Msg["SENSORS_IS_STOPPED_TOOLTIP"] = "Devuelve verdadero si el Lotibot está detenido.";
Blockly.Msg["SENSORS_IS_MOVING_TITLE"] = "¿está en movimiento?";
Blockly.Msg["SENSORS_IS_MOVING_TOOLTIP"] = "Devuelve verdadero si el Lotibot está en movimiento.";
Blockly.Msg["SENSORS_IS_COLLISION_DETECTED_TITLE"] = "¿colisión detectada?";
Blockly.Msg["SENSORS_IS_COLLISION_DETECTED_TOOLTIP"] = "Devuelve verdadero si se detecta una colisión por el Lotibot.";
Blockly.Msg["SENSORS_IS_FALL_DETECTED_TITLE"] = "¿caída detectada?";
Blockly.Msg["SENSORS_IS_FALL_DETECTED_TOOLTIP"] = "Devuelve verdadero si se detecta una caída por el Lotibot.";
Blockly.Msg["SENSORS_IS_SPEAKER_WORKING_TITLE"] = "¿altavoz funcionando?";
Blockly.Msg["SENSORS_IS_SPEAKER_WORKING_TOOLTIP"] = "Devuelve verdadero si el altavoz del Lotibot funciona correctamente.";
Blockly.Msg["SENSORS_IS_HEADLIGHTS_WORKING_TITLE"] = "¿faros encendidos?";
Blockly.Msg["SENSORS_IS_HEADLIGHTS_WORKING_TOOLTIP"] = "Devuelve verdadero si los faros del Lotibot funcionan correctamente.";
Blockly.Msg["SENSORS_GET_HEADING_TITLE"] = "orientación";
Blockly.Msg["SENSORS_GET_HEADING_TOOLTIP"] = "Devuelve la orientación actual del Lotibot de 1 a 8 (1: NORTE, 3: ESTE, 5: SUR, 7: OESTE).";
Blockly.Msg["SENSORS_GET_DISTANCE_TITLE"] = "distancia";
Blockly.Msg["SENSORS_GET_DISTANCE_TOOLTIP"] = "Devuelve la distancia detectada por el sensor de distancia del Lotibot.";
Blockly.Msg["SENSORS_GET_LIGHT_LEVEL_TITLE"] = "nivel de luz ambiental";
Blockly.Msg["SENSORS_GET_LIGHT_LEVEL_TOOLTIP"] = "Devuelve el nivel de luz detectado por el sensor de luz del Lotibot.";
Blockly.Msg["SENSORS_GET_SOUND_LEVEL_TITLE"] = "nivel de sonido ambiental";
Blockly.Msg["SENSORS_GET_SOUND_LEVEL_TOOLTIP"] = "Devuelve el nivel de sonido detectado por el sensor de sonido del Lotibot.";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TITLE"] = "temperatura";
Blockly.Msg["SENSORS_GET_TEMPERATURE_TOOLTIP"] = "Devuelve la temperatura detectada por el sensor de temperatura del Lotibot.";
Blockly.Msg["SENSORS_GET_BATTERY_LEVEL_TITLE"] = "nivel de batería";
Blockly.Msg["SENSORS_GET_BATTERY_LEVEL_TOOLTIP"] = "Devuelve el nivel actual de batería del Lotibot en porcentaje.";

// Actuators
Blockly.Msg['ACTUATORS_SET_MOTORS_TITLE'] = '%1 por %2 cm velocidad %3';
Blockly.Msg['ACTUATORS_SET_MOTORS_TOOLTIP'] = 'Permite al Loti-bot avanzar o retroceder a cierta velocidad (lenta, media o rápida).';
Blockly.Msg['ACTUATORS_ROTATE_WITH_ANGLE_TITLE'] = 'girar %1 por %2 ° velocidad %3';
Blockly.Msg['ACTUATORS_ROTATE_WITH_ANGLE_TOOLTIP'] = 'Permite al Loti-bot girar X° a cierta velocidad (lenta, media o rápida).';
Blockly.Msg['ACTUATORS_DRAW_SQUARE_TITLE'] = 'dibujar un cuadrado de %1 cm de lado';
Blockly.Msg['ACTUATORS_DRAW_SQUARE_TOOLTIP'] = 'Permite al robot Loti-bot moverse formando un cuadrado.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'detener motores';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Permite detener los motores del Loti-bot.';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TITLE'] = 'reproducir sonido n.º%1';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TOOLTIP'] = 'Permite reproducir un sonido entre 1 y 20.';
Blockly.Msg['ACTUATORS_GO_FORWARD'] = "adelante";
Blockly.Msg['ACTUATORS_GO_BACKWARD'] = "atrás";
Blockly.Msg["ACTUATORS_SLOW"] = "lento";
Blockly.Msg["ACTUATORS_MEDIUM"] = "medio";
Blockly.Msg["ACTUATORS_FAST"] = "rápido";