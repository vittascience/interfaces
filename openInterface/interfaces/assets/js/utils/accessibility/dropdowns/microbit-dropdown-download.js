import { initDropdownAccessibility } from './accessibility-utils.js';

export function initMicrobitDropdownAccessibility() {
    initDropdownAccessibility({
        menuSelector: ".ide-btn-group-download",
        focusableSelector: ".ide-btn",
        closeButtonSelector: ".btn-close",
        filterFocusable: function (el) {
            return getComputedStyle(el).display !== 'none';
        },
        debugLogs: true
    });
}