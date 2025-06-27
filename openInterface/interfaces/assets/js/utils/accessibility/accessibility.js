import { initMicrobitDropdownAccessibility } from './dropdowns/microbit-dropdown-download.js';
import { initParametersDropdownAccessibility } from './dropdowns/interfaces-settings-dropdown.js';
import { initControlsDropdownAccessibility } from './dropdowns/interfaces-controls-dropdown.js'

import { initAceEditorAccessibility } from './ace-editor/ace-accessibility.js';
import { initBlocklyAccessibility } from './blockly/blockly-accessibility.js';
import { initializeSearchBoxAccessibility } from './ace-editor/searchbox/searchbox-accessibility.js';
import { initCodeModeAccessibility } from './code-mode.js';
import { registerModalButtons } from './modal-buttons-refocus.js';

import { handleSetupAccessibilityDebug } from './utils/debug.js';
import { handleSetupModalsAccessibility } from './modals/modals-accessibility.js';
import { handleSetupConsoleAccessibility } from './console/console-accessibility.js';
import { handleSetupSpecialTagsAccessibility } from './special-tags/special-tags-accessibility.js';
import { handleSetupBootstrapAccessibility } from './bootstrap/bootstrap-accessibility.js';
import {observeAndInjectSVGFocusStyles} from "./svg/svg-accessibility.js";

$(document).ready(function () {
  setTimeout(() => {
    initMicrobitDropdownAccessibility();
    initParametersDropdownAccessibility();
    initControlsDropdownAccessibility();

    initBlocklyAccessibility();
    initAceEditorAccessibility();
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
