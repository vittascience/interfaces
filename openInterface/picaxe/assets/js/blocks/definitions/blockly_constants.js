Blockly.Constants.PRINT_START_N = 0;

Blockly.Constants.LOOP_TYPES = [
  'forever',
  'controls_repeat',
  'controls_for',
  'controls_whileUntil'
];

const PICAXE_BOARD = INTERFACE_BOARDS[Blockly.Constants.getSelectedBoard()];

// BKY message of the board silkscreen name, per pin group of INTERFACE_BOARDS (outputs, inputs, analogs)
const PICAXE_PIN_LABELS = { outputs: 'PICAXE_PIN_OUT', servos: 'PICAXE_PIN_OUT', inputs: 'PICAXE_PIN_IN', analogs: 'PICAXE_PIN_AN' };

// group: outputs, servos, inputs or analogs of the board, shown "Sortie 0 (B.0)" -> value "B.0"
const picaxePins = (group) => ({
  "type": "field_dropdown",
  "name": "PIN",
  "options": PICAXE_BOARD[group].map(pin => [`%{BKY_${PICAXE_PIN_LABELS[group]}} ${pin.slice(2)} (${pin})`, pin])
});
