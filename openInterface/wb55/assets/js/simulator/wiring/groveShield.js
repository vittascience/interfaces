// STM32 Nucleo with the Grove Base Shield (Arduino Uno format).
WiringSimulator.board = {
  shield: () => 'unoGrove',
  port: (pin) => pin.replace(/^D/, '')
};
