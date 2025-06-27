/**
 * @fileoverview English messages for Arduino. (EN)
 */
'use strict';
// START BLOCKS
Blockly.Msg['LSC_ON_START_TITLE'] = 'void setup( ) {';
Blockly.Msg['LSC_FOREVER_TITLE'] = 'void loop( ) {';
// I-O BLOCKS
Blockly.Msg['IO_WRITEDIGITALPIN_TITLE'] = 'digitalWrite(%1,%2)';
Blockly.Msg['IO_WRITEDIGITALPIN_TOOLTIP'] = 'Permet d\'écrire une valeur sur une entrée digitale (0 ou 1).';
Blockly.Msg['IO_WRITEANALOGPIN_TITLE'] = 'analogWrite(%1,%2)';
Blockly.Msg['IO_WRITEANALOGPIN_TOOLTIP'] = 'Permet d\'écrire une valeur sur une entrée analogique (0-255).';
Blockly.Msg['IO_READDIGITALPIN_TITLE'] = 'digitalRead(%1)';
Blockly.Msg['IO_READDIGITALPIN_TOOLTIP'] = 'Permet de lire la valeur d\'une entrée digitale (0 ou 1).';
Blockly.Msg['IO_READANALOGPIN_TITLE'] = 'analogRead(%1)';
Blockly.Msg['IO_READANALOGPIN_TOOLTIP'] = 'Permet de lire la valeur d\'une entrée analogique (0-1023).';
Blockly.Msg['IO_PINMODE_TITLE'] = 'pinMode(%1,%2)';
Blockly.Msg['IO_PINMODE_TOOLTIP'] = '';
Blockly.Msg['IO_READANALOGPIN_TOOLTIP'] = 'Permet de lire la valeur d\'une entrée analogique (0-1023).';
Blockly.Msg['IO_WAIT_TITLE'] = 'delay(%1)';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Ce bloc permet de stopper l\'exécution du programme pendant un temps défini (en millisecondes).';
Blockly.Msg['IO_DIGITAL_SIGNAL_TITLE'] = '%1';
Blockly.Msg['IO_DIGITAL_SIGNAL_HIGH'] = 'HAUT (1)';
Blockly.Msg['IO_DIGITAL_SIGNAL_LOW'] = 'BAS (0)';
Blockly.Msg['IO_DIGITAL_SIGNAL_TOOLTIP'] = 'Retourne une valeur booléene (HAUT ou BAS).';
// ACTUATORS
Blockly.Msg['ACTUATORS_TONE_TITLE'] = 'tone(%1,%2)';
Blockly.Msg['ACTUATORS_TONE_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Ce bloc permet de jouer une fréquence donnée avec un module haut-parleur ou un buzzer sur les broches digitales 0 à 13.';
Blockly.Msg['ACTUATORS_NOTONE_TITLE'] = 'noTone(%1)';
Blockly.Msg['ACTUATORS_NOTONE_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Permet de couper le son joué sur le module grove Buzzer.';
// MATH
Blockly.Msg['LSC_MATH_RANDOM_INT_TITLE'] = 'random(%1,%2)';
// CONTROLS
Blockly.Msg['LSC_CONTROLS_IF_MSG_IF'] = 'if (%1) {';
// LOOPS
Blockly.Msg['LSC_CONTROLS_FOR_TITLE'] = 'compter avec %1 de %2 à %3 pas %4';