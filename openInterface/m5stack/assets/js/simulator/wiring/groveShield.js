// M5Stack Core with its Grove ports A, B and C (mosaic pins are GPIO numbers).
WiringSimulator.board = {
  shield: () => 'm5stackCore',
  port: (pin) => pin
};
