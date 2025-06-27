export const modalAccessibilityRegistry = new Map();

/**
 * Registers a modal with its accessibility management functions.
 * @param {string} modalId - ID of the modal.
 * @param {function} bindFunction - Function called when the modal is opened.
 * @param {function} unbindFunction - Function called when the modal is closed.
 */
export function registerModalAccessibility(modalId, bindFunction, unbindFunction) {
    modalAccessibilityRegistry.set(modalId, { bind: bindFunction, unbind: unbindFunction });
}

/**
 * Unregisters a modal.
 * @param {string} modalId - ID of the modal.
 */
export function unregisterModalAccessibility(modalId) {
    modalAccessibilityRegistry.delete(modalId);
}
