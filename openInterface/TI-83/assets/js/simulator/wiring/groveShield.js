// TI-Innovator Hub with its Grove ports, or micro:bit with the Grove shield for micro:bit.
WiringSimulator.board = {
  shield: () => Simulator.Mosaic.getCurrentBoard() === 'hub' ? 'innovatorHub' : 'microbitGrove',
  // micro:bit pins are 'P0'..., Innovator Hub pins are 'in1', 'out1', 'bb1'...
  port: (pin) => pin.replace(/^P/, '')
};
