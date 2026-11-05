// Board with its Grove shield when the shield is selected, otherwise the bare board wired with Dupont wires.
WiringSimulator.board = {
  shield: () => {
    const grove = typeof VittaInterface !== 'undefined' && VittaInterface.shieldView;
    return ({
      [BOARD_VITTA_ESP32]: grove ? 'unoGrove' : 'esp32VittaDupont',
      [BOARD_WEMOS_D1R32]: grove ? 'unoGrove' : 'wemosDupont',
      [BOARD_NANO_ESP32]: grove ? 'nanoGrove' : 'nanoEsp32Dupont',
      [BOARD_ESP_WROOM_32_38PINS]: 'wroom38Dupont',
      [BOARD_ESP32_CAM]: 'esp32CamDupont'
    })[Blockly.Constants.getSelectedBoard()] || null;
  },
  // Mosaic pins are GPIO numbers: Uno and Nano format boards are wired by pin name (the Wemos D1 R32 has the pins of
  // the Vittascience ESP32), the other boards by GPIO number.
  port: (pin) => {
    const board = Blockly.Constants.getSelectedBoard();
    if (![BOARD_VITTA_ESP32, BOARD_WEMOS_D1R32, BOARD_NANO_ESP32].includes(board)) return pin;
    const name = WiringSimulator.getPinName(pin, board === BOARD_NANO_ESP32 ? board : BOARD_VITTA_ESP32);
    if (!name) return null;
    if (/^RX/.test(name)) return '0';
    if (/^TX/.test(name)) return '1';
    return name.split(' ')[0];
  }
};
