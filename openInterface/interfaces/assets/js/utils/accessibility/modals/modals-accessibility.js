import { modalAccessibilityRegistry } from "./registry.js"
import "./handlers/modal-openproject-accessibility.js"
import "./handlers/modal-edit-project-name.js"

export function handleSetupModalsAccessibility() {
    window.addEventListener('modalOpened', (event) => {
        const modalId = event.detail.modalId;
        //   console.log(`Modal opened: ${modalId}`);

        const handler = modalAccessibilityRegistry.get(modalId);
        if (handler && handler.bind) {
            console.log(`Accessibility bindings applied to ${modalId}`);
            const modalElement = document.getElementById(modalId);
            handler.bind(modalElement);
        }
    });

    window.addEventListener('modalClosed', (event) => {
        const modalId = event.detail.modalId;
        //   console.log(`Modal closed: ${modalId}`);

        const handler = modalAccessibilityRegistry.get(modalId);
        if (handler && handler.unbind) {
            console.log(`Accessibility bindings removed from ${modalId}`);
            const modalElement = document.getElementById(modalId);
            handler.unbind(modalElement);
        }

        refocusLastFocusedElement();
    });
}


function refocusLastFocusedElement(){
    if(window.lastFocusedElement){
        window.lastFocusedElement.focus();
        window.lastFocusedElement = null;
    }
}