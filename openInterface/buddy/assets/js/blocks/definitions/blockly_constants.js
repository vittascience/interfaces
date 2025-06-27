Blockly.Constants.PRINT_START_N = 0;

Blockly.Constants.LOOP_TYPES = [
  'forever',
  'scratch_forever',
  'controls_repeat',
  'controls_forEach',
  'controls_for',
  'controls_whileUntil'
];

// Tooltip
Blockly.Extensions.register("lock_tooltip", function () {
  this.getField('LOCK').setTooltip(Blockly.Msg["LOCK"] );
});