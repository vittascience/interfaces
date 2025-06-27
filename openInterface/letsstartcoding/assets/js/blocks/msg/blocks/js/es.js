/**
 * @fileoverview English messages for Arduino. (EN)
 */
'use strict';
// START BLOCKS
Blockly.Msg['LSC_ON_START_TITLE'] = 'void setup( ) {';
Blockly.Msg['LSC_FOREVER_TITLE'] = 'void loop( ) {';
// I-O BLOCKS
Blockly.Msg['IO_WRITEDIGITALPIN_TITLE'] = 'digitalWrite(%1,%2)';
Blockly.Msg['IO_WRITEDIGITALPIN_TOOLTIP'] = 'Habilitar para escribir el estado en el pin digital';
Blockly.Msg['IO_WRITEANALOGPIN_TITLE'] = 'analogWrite(%1,%2)';
Blockly.Msg['IO_WRITEANALOGPIN_TOOLTIP'] = 'Enable to write on analog pin the value (0-255).';
Blockly.Msg['IO_READDIGITALPIN_TITLE'] = 'digitalRead(%1)';
Blockly.Msg['IO_READDIGITALPIN_TOOLTIP'] = 'Este bloque lee una de las entradas digitales y devuelve el valor';
Blockly.Msg['IO_READANALOGPIN_TITLE'] = 'analogRead(%1)';
Blockly.Msg['IO_READANALOGPIN_TOOLTIP'] = 'Habilita la lectura del valor analógico de los pines (0-1023)';
Blockly.Msg['IO_PINMODE_TITLE'] = 'pinMode(%1,%2)';
Blockly.Msg['IO_PINMODE_TOOLTIP'] = '';
Blockly.Msg['IO_READANALOGPIN_TOOLTIP'] = 'Habilita la lectura del valor analógico de los pines (0-1023)';
Blockly.Msg['IO_WAIT_TITLE'] = 'delay(%1)';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Detener la ejecución del código (duración en milisegundos)';
Blockly.Msg['IO_DIGITAL_SIGNAL_TITLE'] = '%1';
Blockly.Msg['IO_DIGITAL_SIGNAL_HIGH'] = 'ALTO (1)';
Blockly.Msg['IO_DIGITAL_SIGNAL_LOW'] = 'BAJO (0)';
Blockly.Msg['IO_DIGITAL_SIGNAL_TOOLTIP'] = 'Devuelve un valor booleano (HIGH o LOW)';
// ACTUATORS
Blockly.Msg['ACTUATORS_TONE_TITLE'] = 'tone(%1,%2)';
Blockly.Msg['ACTUATORS_TONE_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Este bloque permite reproducir una frecuencia determinada con un módulo de altavoz o un zumbador en los pines digitales D0 a D13';
Blockly.Msg['ACTUATORS_NOTONE_TITLE'] = 'noTone(%1)';
Blockly.Msg['ACTUATORS_NOTONE_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Habilitar para detener la música en reproducción';
// MATH
Blockly.Msg['LSC_MATH_RANDOM_INT_TITLE'] = 'random(%1,%2)';
// CONTROLS
Blockly.Msg['LSC_CONTROLS_IF_MSG_IF'] = 'if (%1) {';
// LOOPS
Blockly.Msg['LSC_CONTROLS_FOR_TITLE'] = 'cuenta con %1 desde %2 hasta %3 por %4';