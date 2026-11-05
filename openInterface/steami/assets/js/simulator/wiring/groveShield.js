// STeaMi on the Grove shield for micro:bit.
WiringSimulator.board = {
  shield: () => 'steamiGrove',
  port: (pin) => pin.replace(/^P/, '')
};
