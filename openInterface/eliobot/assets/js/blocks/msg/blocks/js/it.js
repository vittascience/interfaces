/**
 * @fileoverview English messages for Eliobot. (EN)
 */
'use strict';
// Display
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TITLE'] = 'change the colour of the integrated LED %1';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP'] = 'Allows you to light the integrated RGB LED on the Eliobot robot.';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_OFF_TITLE'] = 'turn off the integrated LED';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_OFF_TOOLTIP'] = 'Allows you to extinguish the integrated RGB LED on the Eliobot robot.';
// Input/Output
Blockly.Msg['IO_WAIT_TITLE'] = 'wait %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Stop the code execution (duration in seconds or milliseconds).';
Blockly.Msg['IO_WAIT_SECOND'] = 'second.s';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisecond.s';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsecond.s';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'wait until %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Stop the code execution until the satisfied condition.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'Initialize the chronometer';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Allows you to initialize the chronometer (in seconds).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'get chronometer in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Returns the chronometer value from the initialization in seconds or milliseconds.';
Blockly.Msg['IO_BUTTON_STATE_TITLE'] = 'button %1 pressed';
Blockly.Msg['IO_BUTTON_STATE_TOOLTIP'] = '';
Blockly.Msg['IO_BUTTON_STATE_PRESSED'] = 'is';
Blockly.Msg['IO_BUTTON_STATE_NOT_PRESSED'] = 'is not';
// Communication - Serial connection
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'write on serial port %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Write a string on serial port.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'with';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'newline(s)';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'write graph';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'This block makes it possible to write (digital) data that will be visible in the plotter. It can be used with one or more blocks in "Name" and "Data" format. Click on icon \'Graphic mode\' to display graphics.';
Blockly.Msg['COMMUNICATION_DATA'] = 'Data';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Name %1 Data %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'This block is to be used in the "Write in graphic" block. It must contain the name of the (text) value to display and the value in question.';
// Sensors
Blockly.Msg['SENSORS_READ_OBSTACLE_TITLE'] = 'an obstacle is %1';
Blockly.Msg['SENSORS_READ_OBSTACLE_TOOLTIP'] = 'Allows you to detect if an obstacle is present.';
Blockly.Msg['SENSORS_READ_OBSTACLE_FORWARD'] = 'in front';
Blockly.Msg['SENSORS_READ_OBSTACLE_BACKWARD'] = 'behind';
Blockly.Msg['SENSORS_READ_OBSTACLE_RIGHT'] = 'on the right';
Blockly.Msg['SENSORS_READ_OBSTACLE_LEFT'] = 'on the left';
Blockly.Msg['SENSORS_LINE_FOLLOW_TITLE'] = 'segui la linea';
Blockly.Msg['SENSORS_LINE_FOLLOW_TOOLTIP'] = 'Permette al Eliobot di seguire una linea.';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TITLE'] = 'sensibilità del tracciamento di linea %1';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TOOLTIP'] = 'Permette di modificare la sensibilità dei sensori del Eliobot.';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TITLE'] = 'stato del sensore di linea %1';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TOOLTIP'] = 'Restituisce lo stato di uno dei sensori di tracciamento di linea.';
Blockly.Msg['SENSORS_LINE_LEFT'] = "sinistra";
Blockly.Msg['SENSORS_LINE_MIDDLE_LEFT'] = "medio sinistra";
Blockly.Msg['SENSORS_LINE_MIDDLE'] = "centro";
Blockly.Msg['SENSORS_LINE_MIDDLE_RIGHT'] = "medio destra";
Blockly.Msg['SENSORS_LINE_RIGHT'] = "destra";
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TITLE'] = 'valore del sensore di linea %1';
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TOOLTIP'] = 'Restituisce il valore di uno dei sensori di tracciamento di linea del Eliobot.';
Blockly.Msg['SENSORS_DHT11_TEMPERATURE_TITLE'] = '[DHT11] temperatura';
Blockly.Msg['SENSORS_DHT11_TEMPERATURE_TOOLTIP'] = 'Misura la temperatura (°C) tramite il sensore DHT11.';
Blockly.Msg['SENSORS_DHT11_HUMIDITY_TITLE'] = '[DHT11] umidità';
Blockly.Msg['SENSORS_DHT11_HUMIDITY_TOOLTIP'] = 'Misura l\'umidità (%) tramite il sensore DHT11.'
// Actuators
Blockly.Msg["ROBOT_MOVE_TITLE"] = "control the robot %1 at speed %2";
Blockly.Msg["ROBOT_MOVE_TOOLTIP"] = "Allows you to control the Eliobot robot engines to advance or back down.";
Blockly.Msg["ROBOT_MOVE_FORWARD"] = "forward";
Blockly.Msg["ROBOT_MOVE_BACKWARD"] = "backward";
Blockly.Msg["ROBOT_ROTATE_TITLE"] = "rotate on the %1 at speed %2";
Blockly.Msg["ROBOT_ROTATE_TOOLTIP"] = "Rotate the Eliobot on the left or right.";
Blockly.Msg["ROBOT_ROTATE_RIGHT"] = "right";
Blockly.Msg["ROBOT_ROTATE_LEFT"] = "left";
Blockly.Msg["ROBOT_ROTATE_FOREVER_TITLE"] = "rotate on the %1 during %2 %3 at speed %4";
Blockly.Msg["ROBOT_ROTATE_FOREVER_TOOLTIP"] = "Pivot the Eliobot on the left or right for a certain period.";
Blockly.Msg["ROBOT_STOP_TITLE"] = "stop the robot";
Blockly.Msg["ROBOT_STOP_TOOLTIP"] = "Stop motors of the Eliobot.";
Blockly.Msg['ROBOT_SET_SPEED_TITLE'] = 'speed %1 %';
Blockly.Msg['ROBOT_SET_SPEED_TOOLTIP'] = 'Changes the speed of the Eliobot.';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TITLE'] = 'rotate by %1 of %2° at speed %3';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TOOLTIP'] = 'Rotates the Eliobot to the left or right by the desired angle.';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TITLE'] = 'turn wheel %1 towards %2 at speed %3';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TOOLTIP'] = 'Turns one of the Eliobot\'s wheels in the desired direction.';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TITLE'] = 'move forward by %1 step(s) at speed %2';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TOOLTIP'] = 'Allows the Eliobot to move forward by steps.';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TITLE'] = 'suona la nota %1 per %2 %3';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TOOLTIP'] = 'Questo blocco consente di suonare una nota musicale. La nota è definita dal suo nome (Do, Re, Mi, Fa, Sol, La, Si) e dalla durata della riproduzione.';
Blockly.Msg['ACTUATORS_FREQUENCY_TITLE'] = 'suona una frequenza %1 (Hz) per %2 %3';
Blockly.Msg['ACTUATORS_FREQUENCY_TOOLTIP'] = 'Questo blocco consente di suonare una frequenza. La frequenza è definita in Hertz (Hz) e dalla durata della riproduzione.';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TITLE'] = 'suona la musica %1';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TOOLTIP'] = 'Questo blocco consente di riprodurre musica predefinita. Ci sono diverse musiche predefinite disponibili.';
Blockly.Msg['ACTUATORS_SET_VOLUME_TITLE'] = 'imposta il volume al %1 %';
Blockly.Msg['ACTUATORS_SET_VOLUME_TOOLTIP'] = 'Questo blocco regola il volume. Il livello di volume è impostato come percentuale.';