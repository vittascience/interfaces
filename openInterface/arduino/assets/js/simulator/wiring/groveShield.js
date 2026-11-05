// Board with its Grove shield when the shield is selected, otherwise the bare board wired with Dupont wires.
// The Arduino UNO Q interface (same file) has no bare board choice: always the Grove shield.
WiringSimulator.board = {
  shield: () => {
    if (INTERFACE_NAME === 'arduinoq') return 'unoGrove';
    const grove = typeof VittaInterface !== 'undefined' && VittaInterface.shieldView;
    return ({
      uno: grove ? 'unoGrove' : 'unoDupont',
      unor4wifi: grove ? 'unoGrove' : 'unoR4WifiDupont',
      unor4minima: grove ? 'unoGrove' : 'unoR4MinimaDupont',
      nano: grove ? 'nanoGroveArduino' : 'nanoDupont',
      mega: grove ? 'megaGrove' : 'megaDupont'
    })[Blockly.Constants.getSelectedBoard()] || null;
  },
  // Nano pins are named 'D2', 'A0'... in the Nano shield and board.
  port: (pin) => {
    const name = pin.replace(/^D/, '');
    return Blockly.Constants.getSelectedBoard() === 'nano' && INTERFACE_NAME !== 'arduinoq' && /^\d+$/.test(name) ? 'D' + name : name;
  }
};
