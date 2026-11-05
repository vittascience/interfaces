// Raspberry Pi Pico with the Grove shield for Pi Pico when the shield is selected, otherwise wired with Dupont wires
// (mosaic pins are GPIO numbers).
WiringSimulator.board = {
  shield: () => typeof VittaInterface !== 'undefined' && VittaInterface.shieldView ? 'picoGrove' : 'picoDupont',
  port: (pin) => pin
};
