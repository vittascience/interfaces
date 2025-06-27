import { registerModalAccessibility } from "../registry.js";

function bindEditProjectModal(modal) {
    const collapseButtons = modal.querySelectorAll('[data-bs-toggle="collapse"]');
    collapseButtons.forEach((button) => {
        const targetId = button.getAttribute('data-bs-target').replace('#', '');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const handleCollapseShown = () => {
                const firstFocusable = targetElement.querySelector('input, button, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }

            const handleCollapseHidden = () => {
                button.focus();
            }

            targetElement.addEventListener('shown.bs.collapse', handleCollapseShown);
            targetElement.addEventListener('hidden.bs.collapse', handleCollapseHidden);

            button._collapseHandlers = { handleCollapseShown, handleCollapseHidden };

            if (targetElement.querySelector('#importproject-fileinput')) {
                bindFileImportAccessibility(modal, targetElement);
            }
        }

        const handleKeydown = (event) => {
            if (event.key === 'Enter') {
                button.click();
            }
        }

        button.addEventListener('keydown', handleKeydown);
        button._keydownHandler = handleKeydown;
    });
}

function unbindEditProjectModal(modal) {
    const collapseButtons = modal.querySelectorAll('[data-bs-toggle="collapse"]');

    collapseButtons.forEach((button) => {
        const targetId = button.getAttribute('data-bs-target').replace('#', '');
        const targetElement = document.getElementById(targetId);

        if (targetElement && button._collapseHandlers) {
            targetElement.removeEventListener('shown.bs.collapse', button._collapseHandlers.handleCollapseShown);
            targetElement.removeEventListener('hidden.bs.collapse', button._collapseHandlers.handleCollapseHidden);
            delete button._collapseHandlers;
        }

        if (button._keydownHandler) {
            button.removeEventListener('keydown', button._keydownHandler);
            delete button._keydownHandler;
        }

        if (targetElement && targetElement.querySelector('#importproject-fileinput')) {
            unbindFileImportAccessibility(targetElement);
        }
    });
}

function bindFileImportAccessibility(modal, container) {
    const fileCaption = container.querySelector('.file-caption');
    const fileCaptionName = container.querySelector('.file-caption-name');
    const browseButton = container.querySelector('.browse-button');
    const importprojectFileinput = container.querySelector('#importproject-fileinput');

    if (fileCaption) fileCaption.setAttribute('tabindex', '-1');
    if (fileCaptionName) fileCaptionName.setAttribute('tabindex', '-1');
    if (browseButton) browseButton.setAttribute('tabindex', '-1');
    if (importprojectFileinput) importprojectFileinput.setAttribute('tabindex', '1');

    const fileInput = container.querySelector('#importproject-fileinput');
    const exitButton = modal.querySelector('.vitta-modal-exit-btn');

    if (fileInput) fileInput.setAttribute('tabindex', '1');

    if (fileInput && exitButton) {
        const handleFileInputTab = (event) => {
            if (event.key === 'Tab' && !event.shiftKey) { // Tab
                event.preventDefault();
                exitButton.focus();
            }
        };

        const handleExitButtonShiftTab = (event) => { // Maj+Tab
            if (event.key === 'Tab' && event.shiftKey) {
                event.preventDefault();
                fileInput.focus();
            }
        };

        fileInput.addEventListener('keydown', handleFileInputTab);
        exitButton.addEventListener('keydown', handleExitButtonShiftTab);

        fileInput._fileHandlers = { handleFileInputTab };
        exitButton._exitHandlers = { handleExitButtonShiftTab };
    }
}


function unbindFileImportAccessibility(container){
    const fileInput = container.querySelector('#importproject-fileinput');
    const exitButton = container.querySelector('.vitta-modal-exit-btn');

    if (fileInput && fileInput._fileHandlers) {
        fileInput.removeEventListener('keydown', fileInput._fileHandlers.handleFileInputTab);
        delete fileInput._fileHandlers;
    }

    if (exitButton && exitButton._exitHandlers) {
        exitButton.removeEventListener('keydown', exitButton._exitHandlers.handleExitButtonShiftTab);
        delete exitButton._exitHandlers;
    }
}


registerModalAccessibility('modal-openproject', bindEditProjectModal, unbindEditProjectModal);