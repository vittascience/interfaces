import {initDropdownAccessibility} from "./accessibility-utils.js";

export function initControlsDropdownAccessibility() {
    initDropdownAccessibility({
        menuSelector: "#monitor-controls-dropdown",
        focusableSelector: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        closeButtonSelector: ".btn-close"
    });
}