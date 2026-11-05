// Raspberry Pi with the Grove Base Hat when it is selected, otherwise wired with Dupont wires (mosaic pins are GPIO
// numbers).
WiringSimulator.board = {
  shield: () => Blockly.Constants.getSelectedBoard() === GROUVE_PI_HAT ? 'grovePiHat' : 'raspberryDupont',
  port: (pin) => pin
};
