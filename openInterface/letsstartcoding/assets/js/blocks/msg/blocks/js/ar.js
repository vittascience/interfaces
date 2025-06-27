/**
 * @fileoverview English messages for Arduino. (EN)
 */
'use strict';
// START BLOCKS
Blockly.Msg['LSC_ON_START_TITLE'] = 'void setup( ) {';
Blockly.Msg['LSC_FOREVER_TITLE'] = 'void loop( ) {';
// I-O BLOCKS
Blockly.Msg['IO_WRITEDIGITALPIN_TITLE'] = 'digitalWrite(%1,%2)';
Blockly.Msg['IO_WRITEDIGITALPIN_TOOLTIP'] = 'Enable to write state on digital pin.';
Blockly.Msg['IO_WRITEANALOGPIN_TITLE'] = 'analogWrite(%1,%2)';
Blockly.Msg['IO_WRITEANALOGPIN_TOOLTIP'] = 'Enable to write on analog pin the value (0-255).';
Blockly.Msg['IO_READDIGITALPIN_TITLE'] = 'digitalRead(%1)';
Blockly.Msg['IO_READDIGITALPIN_TOOLTIP'] = 'This block reads one of the digital inputs and returns the value.';
Blockly.Msg['IO_READANALOGPIN_TITLE'] = 'analogRead(%1)';
Blockly.Msg['IO_READANALOGPIN_TOOLTIP'] = 'Enable to read the analog value of pins (0-1023).';
Blockly.Msg['IO_PINMODE_TITLE'] = 'pinMode(%1,%2)';
Blockly.Msg['IO_PINMODE_TOOLTIP'] = '';
Blockly.Msg['IO_READANALOGPIN_TOOLTIP'] = 'Enable to read the analog value of pins (0-1023).';
Blockly.Msg['IO_WAIT_TITLE'] = 'delay(%1)';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Stop the code execution (duration in milliseconds).';
Blockly.Msg['IO_DIGITAL_SIGNAL_TITLE'] = '%1';
Blockly.Msg['IO_DIGITAL_SIGNAL_HIGH'] = 'HIGH (1)';
Blockly.Msg['IO_DIGITAL_SIGNAL_LOW'] = 'LOW (0)';
Blockly.Msg['IO_DIGITAL_SIGNAL_TOOLTIP'] = 'Returns boolean value (HIGH ou LOW).';
// ACTUATORS
Blockly.Msg['ACTUATORS_TONE_TITLE'] = 'tone(%1,%2)';
Blockly.Msg['ACTUATORS_TONE_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'This block allows to play a given frequency with a loudspeaker module or a buzzer on digitals pins D0 up through D13.';
Blockly.Msg['ACTUATORS_NOTONE_TITLE'] = 'noTone(%1)';
Blockly.Msg['ACTUATORS_NOTONE_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Enable to stop the music in playing.';
// MATH
Blockly.Msg['LSC_MATH_RANDOM_INT_TITLE'] = 'random(%1,%2)';
// CONTROLS
Blockly.Msg['LSC_CONTROLS_IF_MSG_IF'] = 'if (%1) {';
// LOOPS
Blockly.Msg['LSC_CONTROLS_FOR_TITLE'] = 'count with %1 from %2 to %3 by %4';