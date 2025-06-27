export function initDropdownAccessibility(options) {
    const dropdownMenu = document.querySelector(options.menuSelector);
    if (!dropdownMenu) return;

    const closeButton = dropdownMenu.querySelector(options.closeButtonSelector);
    if (!closeButton) return;

    let focusableElements = Array.from(dropdownMenu.querySelectorAll(options.focusableSelector));
    if (typeof options.filterFocusable === 'function')
        focusableElements = focusableElements.filter(options.filterFocusable);

    if (focusableElements.length === 0) return;

    const firstElement = closeButton;
    const lastElement = focusableElements[focusableElements.length - 1];

    dropdownMenu.addEventListener("keydown", function (event) {
        if (event.key === "Tab") {
            if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        }
    });
}
