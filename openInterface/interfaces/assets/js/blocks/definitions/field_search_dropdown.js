/**
 * @fileoverview Field "field_search_dropdown": grid dropdown with a search input, for long lists of options
 * (needs the field_grid_dropdown plugin of Blockly). Placeholder text: Blockly.Msg['FIELD_SEARCH_DROPDOWN_PLACEHOLDER'].
 */

// Grid dropdown with a search input on top, for long lists of options
if (window.FieldGridDropdown) {
  class FieldSearchDropdown extends FieldGridDropdown {
    showEditor_(e) {
      super.showEditor_(e);
      const content = Blockly.DropDownDiv.getContentDiv();
      const input = document.createElement('input');
      input.type = 'search';
      input.placeholder = Blockly.Msg['FIELD_SEARCH_DROPDOWN_PLACEHOLDER'];
      // Style of the Vittascience search inputs: .blocklySearchDropdownInput in interfaces/assets/css/main.css
      input.className = 'blocklySearchDropdownInput';
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
