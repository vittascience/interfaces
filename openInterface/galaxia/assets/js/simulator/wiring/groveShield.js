// Galaxia on the Grove shield for micro:bit (mosaic pins are GPIO numbers, the shield ports are the P pins).
WiringSimulator.board = {
  shield: () => 'galaxiaGrove',
  port: (pin) => {
    const name = WiringSimulator.getPinName(pin, Blockly.Constants.getSelectedBoard());
    return name ? name.split(' ')[0].replace(/^P/, '') : null;
  }
};
