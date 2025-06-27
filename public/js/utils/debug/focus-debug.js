/**
 * Display in the console the element currently in focus
 */
document.addEventListener('focusin', (event) => {
    displayFocusedElement();
});

function displayFocusedElement() {
    const activeElement = document.activeElement;

    const elementId = activeElement.id ? `#${activeElement.id}` : '';
    const elementClasses = typeof activeElement.className === 'string'
                            ? activeElement.className.trim()
                            : '';

    const displayInfo = elementId + elementClasses;
    //console.log(`[Focus] (ID: ${elementId}) (CLASSNAME: ${elementClasses})`);
}

export function forceFocusOnClassName(classname) {
    const element = document.querySelector(classname);
    if (!element) {
        console.warn(`No elements found for selector: ${classname}`);
        return;
    }

    const isFocusable = element.tabIndex >= 0 || element.hasAttribute("contenteditable");
    if (!isFocusable) {
        element.setAttribute("tabindex", "-1");
    }
    element.focus();
}