Blockly.Constants.PRINT_START_N = 0;

Blockly.Constants.LOOP_TYPES = [
  'forever',
  'scratch_forever',
  'controls_repeat',
  'controls_forEach',
  'controls_for',
  'controls_whileUntil'
];

// Constants object for board pins
Blockly.Constants.Pins = Object.create(null);

//micro:bit digital/analog/touch pins
Blockly.Constants.Pins.digital = {
  'microbit': [
    ["P0", "pin0"],
    ["P1", "pin1"],
    ["P2", "pin2"],
    ["P8", "pin8"],
    ["P12", "pin12"],
    ["P13", "pin13"],
    ["P14", "pin14"],
    ["P15", "pin15"],
    ["P16", "pin16"],
    ["pin_speaker (V2)", "pin_speaker"],
    ["P19 (SCL)", "pin19"],
    ["P20 (SDA)", "pin20"],
    ["P5 (A)", "pin5"],
    ["P11 (B)", "pin11"],
    ["P3 (display)", "pin3"],
    ["P4 (display)", "pin4"],
    ["P6 (display)", "pin6"],
    ["P7 (display)", "pin7"],
    ["P9 (display)", "pin9"],
    ["P10 (display)", "pin10"]
  ]
};

//micro:bit pwm
Blockly.Constants.Pins.PWM = {
  'microbit': [
    ["P0", "pin0"],
    ["P1", "pin1"],
    ["P2", "pin2"],
    ["P8", "pin8"],
    ["P12", "pin12"],
    ["P13", "pin13"],
    ["P14", "pin14"],
    ["P15", "pin15"],
    ["P16", "pin16"]
  ]
};

//micro:bit read analog
Blockly.Constants.Pins.analog_read = {
  'microbit': [
    ["P0", "pin0"],
    ["P1", "pin1"],
    ["P2", "pin2"],
    ["P3 (display)", "pin3"],
    ["P4 (display)", "pin4"],
    ["P10 (display)", "pin10"]
  ]
};

//micro:bit touch
Blockly.Constants.Pins.MICROBIT_TOUCH_PINS = [
  ["LOGO", "pin_logo"],
  ["P0", "pin0"],
  ["P1", "pin1"],
  ["P2", "pin2"]
];

//maqueen plus pins
Blockly.Constants.Pins.MICROBIT_MAQUEEN_PLUS_PINS = [
  ["P0", "pin0"],
  ["P1", "pin1"],
  ["P2", "pin2"],
  ["P8", "pin8"],
  ["P12", "pin12"],
  ["P13", "pin13"],
  ["P14", "pin14"],
  ["P15", "pin15"],
];

// Grid dropdown with a search input on top, for long lists of options
if (window.FieldGridDropdown) {
  class FieldSearchDropdown extends FieldGridDropdown {
    showEditor_(e) {
      super.showEditor_(e);
      const content = Blockly.DropDownDiv.getContentDiv();
      const input = document.createElement('input');
      input.type = 'search';
      input.placeholder = Blockly.Msg['FIELD_SEARCH_DROPDOWN_PLACEHOLDER'];
      input.style.cssText = 'position: sticky; top: 0; z-index: 1; width: 100%; margin-bottom: 7px; box-sizing: border-box;';
      content.prepend(input);
      const cells = [...content.querySelectorAll('.blocklyFieldGridItem')];
      input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        cells.forEach(cell => cell.parentElement.style.display = cell.textContent.toLowerCase().includes(query) ? '' : 'none');
      });
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') return;
        // keeps workspace shortcuts (delete, copy...) away from the typed text
        event.stopPropagation();
        if (event.key === 'Enter') {
          const first = cells.find(cell => cell.parentElement.style.display !== 'none');
          if (first) first.click();
        }
      });
      Blockly.DropDownDiv.repositionForWindowResize();
      input.focus();
    }
  }
  Blockly.fieldRegistry.register('field_search_dropdown', FieldSearchDropdown);
}
