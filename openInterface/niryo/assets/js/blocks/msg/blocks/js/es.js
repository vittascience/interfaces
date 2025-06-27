/**
 * @fileoverview Es messages for Raspberry pi. (EN)
 */
'use strict';


Blockly.Msg['NIRYO_MOVE_JOINTS_TITLE'] = '[Niryo] mover articulaciones %1';
Blockly.Msg['NIRYO_MOVE_JOINTS_TOOLTIP'] = 'Permite controlar el ángulo de las articulaciones del robot Niryo Ned2 (en radianes).';
Blockly.Msg['NIRYO_JOINTS_TITLE'] = 'articulaciones: j1%1 j2%2 j3%3 j4%4 j5%5 j6%6';
Blockly.Msg['NIRYO_JOINTS_TOOLTIP'] = 'Permite controlar el ángulo de las articulaciones del robot Niryo Ned2 (en radianes).';
Blockly.Msg['NIRYO_MOVE_JOINTS_VALUES_TITLE'] = '[Niryo] mover articulaciones %1';
Blockly.Msg['NIRYO_MOVE_JOINTS_VALUES_TOOLTIP'] = 'Permite controlar el ángulo de las articulaciones del robot Niryo Ned2 (en radianes).';

// NIRYO_POSE_TITLE

Blockly.Msg['NIRYO_SLEEP_POSE_TITLE'] = '[Niryo] Inicio';
Blockly.Msg['NIRYO_SLEEP_POSE_TOOLTIP'] = 'Permite mover el robot Niryo Ned2 a su posición de reposo.';
Blockly.Msg['NIRYO_POSE_TITLE'] = 'pose x%1 y%2 z%3 roll%4 pitch%5 yaw%6';
Blockly.Msg['NIRYO_POSE_TOOLTIP'] = 'Permite mover el robot Niryo Ned2 a una posición dada.';
Blockly.Msg['NIRYO_MOVE_POSE_TITLE'] = '[Niryo] %1 mover pose %2';
Blockly.Msg['NIRYO_MOVE_POSE_TOOLTIP'] = 'Permite mover el robot Niryo Ned2 a una posición dada.';

Blockly.Msg['NIRYO_SHIFT_POSE_TITLE'] = '[Niryo] %1 Desplazar la pose en el eje %2 por %3';
Blockly.Msg['NIRYO_SHIFT_POSE_TOOLTIP'] = 'Permite desplazar la pose del robot Niryo Ned2 en un eje dado.';
Blockly.Msg['NIRYO_SHIFT_POSE_AXIS_X'] = 'eje x';
Blockly.Msg['NIRYO_SHIFT_POSE_AXIS_Y'] = 'eje y';
Blockly.Msg['NIRYO_SHIFT_POSE_AXIS_Z'] = 'eje z';
Blockly.Msg['NIRYO_SHIFT_POSE_ROT_ROLL'] = 'rolido';
Blockly.Msg['NIRYO_SHIFT_POSE_ROT_PITCH'] = 'cabeceo';
Blockly.Msg['NIRYO_SHIFT_POSE_ROT_YAW'] = 'guiñada';

Blockly.Msg['NIRYO_MOVE_POSE_TYPE_STANDARD'] = 'estándar';
Blockly.Msg['NIRYO_MOVE_POSE_TYPE_LINEAR'] = 'lineal';

// HERRAMIENTAS
Blockly.Msg['TOOL_OPEN_GRIPPER_TITLE'] = '[Niryo] abrir la pinza a la velocidad %1';
Blockly.Msg['TOOL_OPEN_GRIPPER_TOOLTIP'] = 'Permite abrir la pinza del robot Niryo Ned2.';
Blockly.Msg['TOOL_CLOSE_GRIPPER_TITLE'] = '[Niryo] cerrar la pinza a la velocidad %1';
Blockly.Msg['TOOL_CLOSE_GRIPPER_TOOLTIP'] = 'Permite cerrar la pinza del robot Niryo Ned2.';
Blockly.Msg['TOOL_OPEN_GRIPPER_SPEED_1'] = '1/5';
Blockly.Msg['TOOL_OPEN_GRIPPER_SPEED_2'] = '2/5';
Blockly.Msg['TOOL_OPEN_GRIPPER_SPEED_3'] = '3/5';
Blockly.Msg['TOOL_OPEN_GRIPPER_SPEED_4'] = '4/5';
Blockly.Msg['TOOL_OPEN_GRIPPER_SPEED_5'] = '5/5';

// VISUALIZACIÓN
Blockly.Msg['DISPLAY_LED_RING_COLORS_TITLE'] = 'R: %1 V: %2 B: %3';
Blockly.Msg['DISPLAY_LED_RING_COLORS_TOOLTIP'] = 'Permite definir los valores de los LED RGB del anillo de LED del robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_COLORS_PICKER_TITLE'] = 'Color %1';
Blockly.Msg['DISPLAY_LED_RING_COLORS_PICKER_TOOLTIP'] = 'Permite definir los valores de los LED RGB del anillo de LED del robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_SOLID_COLOR_TITLE'] = '[Anillo LED] Color sólido %1, esperar %2';
Blockly.Msg['DISPLAY_LED_RING_SOLID_COLOR_TOOLTIP'] = 'Permite definir el color de los LED RGB del anillo de LED del robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_WAIT_TRUE'] = "sí";
Blockly.Msg['DISPLAY_LED_RING_WAIT_FALSE'] = "no";
Blockly.Msg['DISPLAY_LED_RING_FLASHING_COLOR_TITLE'] = '[Anillo LED] Color pulsante %1, duración %2 repetición %3 esperar %4';
Blockly.Msg['DISPLAY_LED_RING_FLASHING_COLOR_TOOLTIP'] = 'Permite definir el color de los LED RGB del anillo de LED en forma de pulso del robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_CHASE_COLOR_TITLE'] = '[Anillo LED] Color deslizante %1, duración %2 repetición %3 esperar %4';
Blockly.Msg['DISPLAY_LED_RING_CHASE_COLOR_TOOLTIP'] = 'Permite definir el color de los LED RGB del anillo de LED en forma de deslizamiento del robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_SET_LED_TITLE'] = '[Anillo LED] Definir LED %1 al color %2';
Blockly.Msg['DISPLAY_LED_RING_SET_LED_TOOLTIP'] = 'Permite definir el color de un LED RGB del anillo de LED del robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_WIPE_COLOR_TITLE'] = '[Anillo LED] barrido de color %1, duración %2 esperar %3';
Blockly.Msg['DISPLAY_LED_RING_WIPE_COLOR_TOOLTIP'] = 'Permite definir el color de los LED RGB del anillo de LED en forma de barrido del robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_RAINBOW_PATTERN_TITLE'] = '[Anillo LED] arcoíris, duración %1 repetición %2 esperar %3';
Blockly.Msg['DISPLAY_LED_RING_RAINBOW_PATTERN_TOOLTIP'] = 'Permite definir el color de los LED RGB del anillo de LED en forma de arcoíris del robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_RAINBOW_CYCLE_TITLE'] = '[Anillo LED] ciclo arcoíris, duración %1 repetición %2 esperar %3';
Blockly.Msg['DISPLAY_LED_RING_RAINBOW_CYCLE_TOOLTIP'] = 'Permite definir el color de los LED RGB del anillo de LED en forma de ciclo arcoíris del robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_GO_UP_TITLE'] = '[Anillo LED] ascenso de color %1, duración %2 repetición %3 esperar %4';
Blockly.Msg['DISPLAY_LED_RING_GO_UP_TOOLTIP'] = 'Permite definir el color de los LED RGB del anillo de LED en forma ascendente del robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_GO_DOWN_TITLE'] = '[Anillo LED] ascenso y descenso de color %1, duración %2 repetición %3 esperar %4';
Blockly.Msg['DISPLAY_LED_RING_GO_DOWN_TOOLTIP'] = 'Permite definir el color de los LED RGB del anillo de LED en forma ascendente y descendente del robot Niryo Ned2.';

// Utilidad
Blockly.Msg['UTILITY_WAIT_TITLE'] = 'esperar %1 segundo(s)';
Blockly.Msg['UTILITY_WAIT_TOOLTIP'] = 'Permite esperar un cierto número de segundos.';
Blockly.Msg['UTILITY_BREAK_POINT_TITLE'] = 'punto de interrupción';
Blockly.Msg['UTILITY_BREAK_POINT_TOOLTIP'] = 'Permite colocar un punto de interrupción en el código.';
Blockly.Msg['UTILITY_COMMENT_TITLE'] = 'comentario %1';
Blockly.Msg['UTILITY_COMMENT_TOOLTIP'] = 'Permite añadir un comentario en el código.';

// Wifi - Raspberry Pi
Blockly.Msg['NETWORK_GET_PI_NAME_TITLE'] = "[Ned2] dirección IP %1";
Blockly.Msg['NETWORK_GET_PI_NAME_TOOLTIP'] = "Permite recuperar la dirección IP del Niryo Ned2.";

// Conveyor
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_TITLE'] = '[Niryo] cinta transportadora n.º %1';
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_TOOLTIP'] = "Permite activar la cinta transportadora del robot Niryo Ned2. Atención: es imprescindible conectar primero el cable de alimentación a la cinta transportadora antes de conectarlo al robot.";
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_1'] = '1';
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_2'] = '2';
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_TITLE'] = '[Niryo] Controlar la cinta transportadora %1 a velocidad (%) %2 en dirección %3';
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_TOOLTIP'] = "Permite controlar la velocidad de la cinta transportadora del robot Niryo Ned2. Atención: es imprescindible conectar primero el cable de alimentación a la cinta transportadora antes de conectarlo al robot.";
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_DIRECTION_FORWARD'] = 'adelante';
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_DIRECTION_BACKWARD'] = 'atrás';
Blockly.Msg['NIRYO_ACTUATOR_STOP_CONVEYOR_TITLE'] = '[Niryo] Detener la cinta transportadora %1';
Blockly.Msg['NIRYO_ACTUATOR_STOP_CONVEYOR_TOOLTIP'] = "Permite detener la cinta transportadora del robot Niryo Ned2.";
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_TITLE'] = '[Niryo] el sensor infrarrojo detecta %1';
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_LOW'] = 'algo';
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_HIGH'] = 'nada';
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_TOOLTIP'] = "Permite saber si el sensor infrarrojo de la cinta transportadora del robot Niryo Ned2 detecta algo o no.";
