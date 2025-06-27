import { initDropdownAccessibility } from './accessibility-utils.js';

export function initParametersDropdownAccessibility() {
    initDropdownAccessibility({
        menuSelector: ".ide-btn-group-settings",
        focusableSelector: ".ide-btn",
        closeButtonSelector: ".btn-close"
    });
}