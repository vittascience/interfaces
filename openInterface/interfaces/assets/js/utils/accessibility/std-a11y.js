import { initMicrobitDropdownAccessibility } from './dropdowns/microbit-dropdown-download.js';
import { initParametersDropdownAccessibility } from './dropdowns/interfaces-settings-dropdown.js';
import { initControlsDropdownAccessibility } from './dropdowns/interfaces-controls-dropdown.js'

import { initAceEditorAccessibility } from './ace-editor/ace-accessibility.js';
import { fixAceTextareaLabel } from './ace-editor/textarea-label-fix.js';
import { initBlocklyAccessibility } from './blockly/blockly-accessibility.js';
import { fixBlocklyToolboxFocus } from './blockly/toolbox-focus-fix.js';
import { fixBlocklyFieldMobileClose } from './blockly/blockly-field-mobile-fix.js';
import { initializeSearchBoxAccessibility } from './ace-editor/searchbox/searchbox-accessibility.js';
import { initCodeModeAccessibility } from './code-mode.js';
import { registerModalButtons } from './modal-buttons-refocus.js';

import { handleSetupAccessibilityDebug } from './utils/debug.js';
import { handleSetupModalsAccessibility } from './modals/modals-accessibility.js';
import { handleSetupConsoleAccessibility } from './console/console-accessibility.js';
import { handleSetupSpecialTagsAccessibility } from './special-tags/special-tags-accessibility.js';
import { handleSetupBootstrapAccessibility } from './bootstrap/bootstrap-accessibility.js';
import {observeAndInjectSVGFocusStyles} from "./svg/svg-accessibility.js";

/**
 * The editor page has no heading: the screen reader users can't jump from one zone to the other (blocks, code,
 * console, simulator). Hidden headings are added before the zones (not inside: Blockly and Ace own them).
 */
function addZoneHeadings() {
  const zones = [['#content_blocks', 'blocks'], ['#generator', 'code'], ['#monitor', 'console'], ['.ide-simulator', 'simulator']];
  for (const [selector, key] of zones) {
    const zone = document.querySelector(selector);
    if (!zone || zone.previousElementSibling?.classList.contains('a11y-zone-heading')) continue;
    const heading = document.createElement('h2');
    heading.className = 'visually-hidden a11y-zone-heading';
    heading.textContent = jsonPath(`code.a11yHeadings.${key}`);
    zone.before(heading);
  }
}

$(document).ready(function () {
  setTimeout(() => {
    addZoneHeadings();
    initMicrobitDropdownAccessibility();
    initParametersDropdownAccessibility();
    initControlsDropdownAccessibility();

    initBlocklyAccessibility();
    fixBlocklyToolboxFocus();
    fixBlocklyFieldMobileClose();
    initAceEditorAccessibility();
    fixAceTextareaLabel();
    initializeSearchBoxAccessibility();
    initCodeModeAccessibility();
    observeAndInjectSVGFocusStyles();
    registerModalButtons();

    handleSetupAccessibilityDebug();
    handleSetupModalsAccessibility();
    handleSetupConsoleAccessibility();
    handleSetupSpecialTagsAccessibility();
    handleSetupBootstrapAccessibility();
  }, 1_500);
});
