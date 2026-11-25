/**
 * @fileoverview English messages for Matatalab. (EN)
 */

'use strict';

// IO - Time

// Actuators

// Sound

// Display

// Communication

// MatataCon

// Options

// Search keywords of the blocks: <X>_KEYWORDS completes the block whose tooltip is <X>_TOOLTIP (see ToolboxManager)

Blockly.Msg['IO_WAIT_TITLE'] = 'esperar %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausa la ejecución del código.';
Blockly.Msg['IO_WAIT_SECOND'] = 'segundo(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milisegundo(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsegundo(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'esperar hasta %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Detiene la ejecución del código hasta que se cumpla la condición.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'iniciar cronómetro';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Inicializa un cronómetro en 0 (en segundos).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valor del cronómetro en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Devuelve el valor del cronómetro desde la inicialización (en segundos o milisegundos).';
Blockly.Msg['ACTUATORS_MOVE_TITLE'] = '%1 %2 pasos';
Blockly.Msg['ACTUATORS_MOVE_TOOLTIP'] = 'Mueve el robot MatataBot por un número de pasos (1 paso = 10 cm).';
Blockly.Msg['ACTUATORS_MOVE_CM_TITLE'] = 'mover %1 cm';
Blockly.Msg['ACTUATORS_MOVE_CM_TOOLTIP'] = 'Mueve el robot MatataBot por una distancia en cm. Un valor negativo lo hace ir hacia atrás.';
Blockly.Msg['ACTUATORS_TURN_TITLE'] = 'girar %1 en %2 °';
Blockly.Msg['ACTUATORS_TURN_TOOLTIP'] = 'Gira el robot MatataBot en el lugar.';
Blockly.Msg['ACTUATORS_SET_GEAR_TITLE'] = 'ajustar %1 a engranaje %2';
Blockly.Msg['ACTUATORS_SET_GEAR_TOOLTIP'] = 'Conduce una o ambas ruedas, desde engranaje -6 (hacia atrás) hasta 6 (hacia adelante). 0 detiene la rueda.';
Blockly.Msg['ACTUATORS_SET_SPEED_TITLE'] = 'ajustar velocidad de las ruedas: izquierda %1 derecha %2 (cm/s)';
Blockly.Msg['ACTUATORS_SET_SPEED_TOOLTIP'] = 'Establece la velocidad de ambas ruedas, entre -16 y 16 cm/s. Un valor negativo hace que la rueda gire hacia atrás.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'detener %1';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Detiene una o ambas ruedas.';
Blockly.Msg['ACTUATORS_DANCE_TITLE'] = 'hacer danza n°%1';
Blockly.Msg['ACTUATORS_DANCE_TOOLTIP'] = 'El robot MatataBot hace una danza, del 1 al 6.';
Blockly.Msg['ACTUATORS_ACTION_TITLE'] = 'hacer acción n°%1';
Blockly.Msg['ACTUATORS_ACTION_TOOLTIP'] = 'El robot MatataBot realiza una acción, del 1 al 6.';
Blockly.Msg['SOUND_PLAY_NOTE_TITLE'] = 'reproducir nota %1 durante %2 ms';
Blockly.Msg['SOUND_PLAY_NOTE_TOOLTIP'] = 'Reproduce una nota en el robot MatataBot durante una duración en milisegundos.';
Blockly.Msg['SOUND_PLAY_MELODY_TITLE'] = 'reproducir melodía n°%1';
Blockly.Msg['SOUND_PLAY_MELODY_TOOLTIP'] = 'Reproduce una melodía del robot MatataBot, del 1 al 10.';
Blockly.Msg['SOUND_PLAY_MUSIC_TITLE'] = 'reproducir canción n°%1';
Blockly.Msg['SOUND_PLAY_MUSIC_TOOLTIP'] = 'Reproduce una canción del robot MatataBot, del 1 al 6.';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TITLE'] = 'iluminar %1 en %2 con brillo %3';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TOOLTIP'] = 'Ilumina los ojos del robot MatataBot con un brillo de 0 a 6.';
Blockly.Msg['DISPLAY_SET_EYES_TITLE'] = 'iluminar %1 con color %2';
Blockly.Msg['DISPLAY_SET_EYES_TOOLTIP'] = 'Ilumina los ojos del robot MatataBot con un color elegido.';
Blockly.Msg['DISPLAY_CLEAR_EYES_TITLE'] = 'apagar los ojos';
Blockly.Msg['DISPLAY_CLEAR_EYES_TOOLTIP'] = 'Apaga los ojos del robot MatataBot.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'escribir en consola %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Escribe datos en el puerto serie.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'con';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'nueva(s) línea(s)';
Blockly.Msg['MATATACON_IS_BUTTON_TITLE'] = 'botón %1 presionado';
Blockly.Msg['MATATACON_IS_BUTTON_TOOLTIP'] = 'Devuelve Verdadero si el botón del controlador MatataCon está presionado.';
Blockly.Msg['MATATACON_IS_GESTURE_TITLE'] = 'controlador %1';
Blockly.Msg['MATATACON_IS_GESTURE_TOOLTIP'] = 'Devuelve Verdadero si este movimiento del controlador MatataCon es detectado.';
Blockly.Msg['MATATACON_IS_COLOR_TITLE'] = 'color %1 detectado';
Blockly.Msg['MATATACON_IS_COLOR_TOOLTIP'] = 'Devuelve Verdadero si el sensor de color del controlador MatataCon detecta este color.';
Blockly.Msg['MATATACON_IS_SOUND_TITLE'] = 'sonido detectado';
Blockly.Msg['MATATACON_IS_SOUND_TOOLTIP'] = 'Devuelve Verdadero si el controlador MatataCon detecta un sonido.';
Blockly.Msg['MATATACON_IS_OBSTACLE_TITLE'] = 'obstáculo detectado';
Blockly.Msg['MATATACON_IS_OBSTACLE_TOOLTIP'] = 'Devuelve Verdadero si el controlador MatataCon detecta un obstáculo.';
Blockly.Msg['MATATACON_IS_LIGHT_TITLE'] = '%1 detectado';
Blockly.Msg['MATATACON_IS_LIGHT_TOOLTIP'] = 'Devuelve Verdadero si el controlador MatataCon detecta la luz o la oscuridad.';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TITLE'] = 'brillo';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TOOLTIP'] = 'Devuelve el brillo medido por el controlador MatataCon, de 0 a 255.';
Blockly.Msg['MATATACON_GET_COLOR_TITLE'] = 'valor %1 del sensor de color';
Blockly.Msg['MATATACON_GET_COLOR_TOOLTIP'] = 'Devuelve el valor rojo, verde o azul medido por el controlador MatataCon, de 0 a 255.';
Blockly.Msg['MATATACON_GET_ANGLE_TITLE'] = 'ángulo %1 (°)';
Blockly.Msg['MATATACON_GET_ANGLE_TOOLTIP'] = 'Devuelve el ángulo del controlador MatataCon, en grados.';
Blockly.Msg['MATATACON_GET_ACCELERATION_TITLE'] = 'aceleración en el eje %1';
Blockly.Msg['MATATACON_GET_ACCELERATION_TOOLTIP'] = 'Devuelve la aceleración del controlador MatataCon en un eje.';
Blockly.Msg['MATATACON_GET_SHAKING_TITLE'] = 'intensidad de temblor';
Blockly.Msg['MATATACON_GET_SHAKING_TOOLTIP'] = 'Devuelve la intensidad de temblor del controlador MatataCon.';
Blockly.Msg['MATATACON_SET_RING_COLOR_TITLE'] = '[Anillo] iluminar LED n°%1 en %2 con brillo %3';
Blockly.Msg['MATATACON_SET_RING_COLOR_TOOLTIP'] = 'Ilumina un LED del anillo del controlador MatataCon, del 1 al 12, con un brillo de 0 a 6. El número 0 ilumina todos los LED.';
Blockly.Msg['MATATACON_SET_RING_TITLE'] = '[Anillo] iluminar LED n°%1 con color %2';
Blockly.Msg['MATATACON_SET_RING_TOOLTIP'] = 'Ilumina un LED del anillo del controlador MatataCon, del 1 al 12, con un color elegido. El número 0 ilumina todos los LED.';
Blockly.Msg['MATATACON_SET_RING_LEDS_TITLE'] = '[Anillo] iluminar los LEDs %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12';
Blockly.Msg['MATATACON_SET_RING_LEDS_TOOLTIP'] = 'Elige el color de los 12 LEDs del anillo del controlador MatataCon, desde el LED n°1 hasta el LED n°12.';
Blockly.Msg['MATATACON_RING_ANIMATION_TITLE'] = '[Anillo] iniciar animación %1';
Blockly.Msg['MATATACON_RING_ANIMATION_TOOLTIP'] = 'Inicia una animación de luz en el anillo del controlador MatataCon.';
Blockly.Msg['MATATACON_CLEAR_RING_TITLE'] = '[Anillo] apagar todos los LEDs';
Blockly.Msg['MATATACON_CLEAR_RING_TOOLTIP'] = 'Apaga el anillo del controlador MatataCon.';
Blockly.Msg['MATATACON_SEND_MESSAGE_TITLE'] = 'enviar mensaje n°%1';
Blockly.Msg['MATATACON_SEND_MESSAGE_TOOLTIP'] = 'Envía un mensaje, del 1 al 6, a los otros controladores de MatataCon.';
Blockly.Msg['MATATACON_IS_MESSAGE_TITLE'] = 'mensaje n°%1 recibido';
Blockly.Msg['MATATACON_IS_MESSAGE_TOOLTIP'] = 'Devuelve Verdadero si el controlador de MatataCon recibió este mensaje, del 1 al 6.';
Blockly.Msg['MATATACON_GET_MESSAGE_TITLE'] = 'mensaje recibido';
Blockly.Msg['MATATACON_GET_MESSAGE_TOOLTIP'] = 'Devuelve el número del mensaje recibido por el controlador de MatataCon, o 0 si no hay mensaje.';
Blockly.Msg['MATATALAB_DIR_FORWARD'] = 'moverse hacia adelante';
Blockly.Msg['MATATALAB_DIR_BACKWARD'] = 'moverse hacia atrás';
Blockly.Msg['MATATALAB_DIR_LEFT'] = 'izquierda';
Blockly.Msg['MATATALAB_DIR_RIGHT'] = 'derecha';
Blockly.Msg['MATATALAB_WHEEL_BOTH'] = 'ambas ruedas';
Blockly.Msg['MATATALAB_WHEEL_LEFT'] = 'la rueda izquierda';
Blockly.Msg['MATATALAB_WHEEL_RIGHT'] = 'la rueda derecha';
Blockly.Msg['MATATALAB_EYE_BOTH'] = 'ambos ojos';
Blockly.Msg['MATATALAB_EYE_LEFT'] = 'el ojo izquierdo';
Blockly.Msg['MATATALAB_EYE_RIGHT'] = 'el ojo derecho';
Blockly.Msg['MATATALAB_COLOR_WHITE'] = 'blanco';
Blockly.Msg['MATATALAB_COLOR_RED'] = 'rojo';
Blockly.Msg['MATATALAB_COLOR_YELLOW'] = 'amarillo';
Blockly.Msg['MATATALAB_COLOR_GREEN'] = 'verde';
Blockly.Msg['MATATALAB_COLOR_BLUE'] = 'azul';
Blockly.Msg['MATATALAB_COLOR_PURPLE'] = 'púrpura';
Blockly.Msg['MATATALAB_COLOR_BLACK'] = 'negro';
Blockly.Msg['MATATALAB_ANIMATION_SPOONDRIFT'] = 'ola';
Blockly.Msg['MATATALAB_ANIMATION_METEOR'] = 'meteoro';
Blockly.Msg['MATATALAB_ANIMATION_RAINBOW'] = 'arcoíris';
Blockly.Msg['MATATALAB_ANIMATION_FIREFLY'] = 'luciérnaga';
Blockly.Msg['MATATALAB_ANIMATION_COLORWIPE'] = 'borrado de color';
Blockly.Msg['MATATALAB_ANIMATION_BREATHE'] = 'respirar';
Blockly.Msg['MATATALAB_BUTTON_PLAY'] = 'reproducir';
Blockly.Msg['MATATALAB_BUTTON_DELETE'] = 'eliminar';
Blockly.Msg['MATATALAB_BUTTON_FORWARD'] = 'adelante';
Blockly.Msg['MATATALAB_BUTTON_BACKWARD'] = 'atrás';
Blockly.Msg['MATATALAB_BUTTON_LEFT'] = 'izquierda';
Blockly.Msg['MATATALAB_BUTTON_RIGHT'] = 'derecha';
Blockly.Msg['MATATALAB_BUTTON_MUSIC'] = 'música';
Blockly.Msg['MATATALAB_GESTURE_SHAKE'] = 'sacudido';
Blockly.Msg['MATATALAB_GESTURE_TILT_LEFT'] = 'inclinado a la izquierda';
Blockly.Msg['MATATALAB_GESTURE_TILT_RIGHT'] = 'inclinado a la derecha';
Blockly.Msg['MATATALAB_GESTURE_TILT_FORWARD'] = 'inclinado hacia adelante';
Blockly.Msg['MATATALAB_GESTURE_TILT_BACKWARD'] = 'inclinado hacia atrás';
Blockly.Msg['MATATALAB_GESTURE_FALL'] = 'en caída libre';
Blockly.Msg['MATATALAB_GESTURE_FACE_UP'] = 'mirando hacia arriba';
Blockly.Msg['MATATALAB_GESTURE_FACE_DOWN'] = 'mirando hacia abajo';
Blockly.Msg['MATATALAB_LIGHT_BRIGHT'] = 'brillante';
Blockly.Msg['MATATALAB_LIGHT_DARK'] = 'oscuridad';
Blockly.Msg['MATATALAB_ANGLE_PITCH'] = 'inclinación';
Blockly.Msg['MATATALAB_ANGLE_ROLL'] = 'rodar';
Blockly.Msg['MATATALAB_ANGLE_YAW'] = 'guiñada';
Blockly.Msg['IO_WAIT_KEYWORDS'] = 'retraso, esperar';
Blockly.Msg['IO_WAIT_UNTIL_KEYWORDS'] = 'esperar, pausar';
Blockly.Msg['IO_INITCHRONOMETER_KEYWORDS'] = 'cronómetro, iniciar, reiniciar';
Blockly.Msg['IO_GETCHRONOMETER_KEYWORDS'] = 'cronómetro, transcurrido';
Blockly.Msg['ACTUATORS_MOVE_KEYWORDS'] = 'adelante, atrás, mover';
Blockly.Msg['ACTUATORS_MOVE_CM_KEYWORDS'] = 'adelante, atrás, distancia';
Blockly.Msg['ACTUATORS_TURN_KEYWORDS'] = 'girar, rotación';
Blockly.Msg['ACTUATORS_SET_GEAR_KEYWORDS'] = 'motor, rueda, velocidad';
Blockly.Msg['ACTUATORS_SET_SPEED_KEYWORDS'] = 'motor, rueda, velocidad';
Blockly.Msg['ACTUATORS_STOP_KEYWORDS'] = 'motor, rueda';
Blockly.Msg['ACTUATORS_DANCE_KEYWORDS'] = 'bailando';
Blockly.Msg['ACTUATORS_ACTION_KEYWORDS'] = 'movimiento, animación';
Blockly.Msg['SOUND_PLAY_NOTE_KEYWORDS'] = 'música, sonido, tono';
Blockly.Msg['SOUND_PLAY_MELODY_KEYWORDS'] = 'música, sonido';
Blockly.Msg['SOUND_PLAY_MUSIC_KEYWORDS'] = 'música, sonido';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_KEYWORDS'] = 'LED, ojos, color';
Blockly.Msg['DISPLAY_SET_EYES_KEYWORDS'] = 'LED, ojos, RGB';
Blockly.Msg['DISPLAY_CLEAR_EYES_KEYWORDS'] = 'LED, limpiar';
Blockly.Msg['MATATACON_SET_RING_COLOR_KEYWORDS'] = 'LED, anillo, color';
Blockly.Msg['MATATACON_SET_RING_KEYWORDS'] = 'LED, anillo, RGB';
Blockly.Msg['MATATACON_SET_RING_LEDS_KEYWORDS'] = 'LED, anillo, colores';
Blockly.Msg['MATATACON_RING_ANIMATION_KEYWORDS'] = 'LED, anillo, efecto';
Blockly.Msg['MATATACON_CLEAR_RING_KEYWORDS'] = 'LED, anillo, limpiar';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_KEYWORDS'] = 'consola, transmitir, enviar';
Blockly.Msg['MATATACON_SEND_MESSAGE_KEYWORDS'] = 'enviar, radio';
Blockly.Msg['MATATACON_IS_MESSAGE_KEYWORDS'] = 'recibir, radio';
Blockly.Msg['MATATACON_GET_MESSAGE_KEYWORDS'] = 'recibir, radio';
Blockly.Msg['MATATACON_IS_BUTTON_KEYWORDS'] = 'botón, tecla';
Blockly.Msg['MATATACON_IS_GESTURE_KEYWORDS'] = 'movimiento, gesto, acelerómetro';
Blockly.Msg['MATATACON_IS_COLOR_KEYWORDS'] = 'sensor, color';
Blockly.Msg['MATATACON_IS_SOUND_KEYWORDS'] = 'micrófono, ruido';
Blockly.Msg['MATATACON_IS_OBSTACLE_KEYWORDS'] = 'infrarrojo, distancia';
Blockly.Msg['MATATACON_IS_LIGHT_KEYWORDS'] = 'brillo, luz';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_KEYWORDS'] = 'luz, sensor';
Blockly.Msg['MATATACON_GET_COLOR_KEYWORDS'] = 'RGB, color';
Blockly.Msg['MATATACON_GET_ANGLE_KEYWORDS'] = 'inclinación, giroscopio';
Blockly.Msg['MATATACON_GET_ACCELERATION_KEYWORDS'] = 'acelerómetro';
Blockly.Msg['MATATACON_GET_SHAKING_KEYWORDS'] = 'sacudida, acelerómetro';
