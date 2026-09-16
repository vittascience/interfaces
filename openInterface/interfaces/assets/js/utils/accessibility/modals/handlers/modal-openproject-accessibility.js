import { registerModalAccessibility } from "../registry.js";

function bindEditProjectModal(modal) {
    const tabButtons = modal.querySelectorAll('.openproject-tab-btn[data-tab-target]');
    tabButtons.forEach((button) => {
        const targetId = button.getAttribute('data-tab-target');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const handleTabShown = () => {
                const firstFocusable = targetElement.querySelector('input, button, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }

            const handleClick = () => {
                requestAnimationFrame(handleTabShown);
            }

            button.addEventListener('click', handleClick);
            button._tabHandlers = { handleClick };

            if (targetElement.querySelector('#importproject-fileinput')) {
                bindFileImportAccessibility(modal, targetElement);
            }
        }
    });
}

function unbindEditProjectModal(modal) {
    const tabButtons = modal.querySelectorAll('.openproject-tab-btn[data-tab-target]');

    tabButtons.forEach((button) => {
        const targetId = button.getAttribute('data-tab-target');
        const targetElement = document.getElementById(targetId);

        if (button._tabHandlers) {
            button.removeEventListener('click', button._tabHandlers.handleClick);
            delete button._tabHandlers;
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