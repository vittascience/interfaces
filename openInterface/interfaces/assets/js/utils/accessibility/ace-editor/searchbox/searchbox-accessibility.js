import { setupInputFieldListener } from "./searchbox-result-counter.js";
import { initializeResponsive } from "./searchbox-responsive.js"

let searchboxInteractiveElements = {};
let searchboxFocusedElementIndex = 0;

/**
 * Initializes a MutationObserver to monitor the addition of the Ace Editor search box to the DOM
 * and configures the accessibility of the search box once it is detected.
 */
export function initializeSearchBoxAccessibility() {
    initializeSearchBoxObserver();
}

function initializeSearchBoxObserver(){
    // console.log('Initializing search box observer...');
    let hasSearchBoxOpenedOnce = false;

    const observer = new MutationObserver(() => {
        const searchBox = document.querySelector('.ace_search');
        if (!hasSearchBoxOpenedOnce && searchBox) {
            // console.log('Search box detected in DOM.');
            observer.disconnect();
            hasSearchBoxOpenedOnce = true;
            initializeResponsive();
            handleSearchBoxVisibility(searchBox);
            setupInputFieldListener(searchBox);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}


/**
 * Handles visibility changes of the Ace Editor search box.
 * @param {HTMLElement} searchBox - The Ace Editor search box element.
 */
function handleSearchBoxVisibility(searchBox) {
    // console.log('Handling search box visibility...');
    configureSearchBoxAccessibility(searchBox);
}

/**
 * Configures the accessibility of the Ace Editor search box by adding tabindex attributes
 * and sets up keydown navigation for Tab and Enter.
 * @param {HTMLElement} searchBox - The Ace Editor search box element.
 */
function configureSearchBoxAccessibility(searchBox) {
    const querySelectors = ".ace_searchbtn, .ace_button, .ace_search_field";
    const interactiveElements = Array.from(searchBox.querySelectorAll(querySelectors));

    searchboxInteractiveElements = {};
    interactiveElements.forEach((element, index) => {
        searchboxInteractiveElements[index] = element;
        addAriaLabelsToElement(element);

        if (element.classList.contains("ace_button")) {
            element.setAttribute("role", "button");
        }
    });

    Object.values(searchboxInteractiveElements).forEach((element) => {
        element.setAttribute("tabindex", "0");
    });

    searchBox.addEventListener('keydown', handleKeydownEvent);
}

/**
 * Adds `aria-label` attributes and applies accessibility improvements to interactive elements.
 * @param {HTMLElement} element - The DOM element to which to add `aria-label` attributes.
 */
function addAriaLabelsToElement(element) {
    const actionsConfig = {
        findAll: {
            ariaLabel: "Rechercher tout (Alt-Enter)",
            textToHide: "All",
        },
        replaceAndFindNext: {
            ariaLabel: "Remplacer puis rechercher le suivant",
            textToHide: "Replace",
        },
        replaceAll: {
            ariaLabel: "Remplacer tout",
            textToHide: "All",
        },
        toggleReplace: {
            ariaLabel: "Basculer le mode Remplacer",
        },
        toggleRegexpMode: {
            ariaLabel: "Activer/désactiver la recherche par RegExp",
        },
        toggleCaseSensitive: {
            ariaLabel: "Activer/désactiver la recherche sensible à la casse",
        },
        toggleWholeWords: {
            ariaLabel: "Activer/désactiver la recherche de mots entiers",
        },
        searchInSelection: {
            ariaLabel: "Rechercher dans la sélection",
        },
    };

    const classConfig = {
        prev: "Rechercher précédent",
        next: "Rechercher suivant",
    };

    const action = element.getAttribute("action");
    if (action && actionsConfig[action]) {
        const { ariaLabel, textToHide } = actionsConfig[action];

        if (ariaLabel) {
            element.setAttribute("aria-label", ariaLabel);
        }
        if (textToHide && element.textContent.trim() === textToHide) {
            replaceWithHiddenSpan(element, textToHide);
        }
    }

    Object.keys(classConfig).forEach((cls) => {
        if (element.classList.contains(cls)) {
            element.setAttribute("aria-label", classConfig[cls]);
        }
    });
}

/**
 * Replaces the text content of an element with a hidden span containing the same text.
 * @param {HTMLElement} element - The element whose text content should be replaced.
 * @param {string} text - The text to hide in a span with `aria-hidden="true"`.
 */
function replaceWithHiddenSpan(element, text) {
    const hiddenSpan = document.createElement("span");
    hiddenSpan.textContent = text;
    hiddenSpan.setAttribute("aria-hidden", "true");
    element.textContent = "";
    element.appendChild(hiddenSpan);
}


/**
 * Handles the keydown event for Tab and Enter keys.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handleKeydownEvent(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        handleTabNavigation(event);
    } else if (event.key === 'Enter') {
        handleEnterKey(event);
    }
}

/**
 * Handles Tab navigation through the global list of interactive elements.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handleTabNavigation(event) {
    //console.log('Handling Tab navigation...');

    const keys = Object.keys(searchboxInteractiveElements).map(Number); 
    const maxIndex = keys.length - 1;

    if (event.shiftKey) {
        searchboxFocusedElementIndex = (searchboxFocusedElementIndex === 0) ? maxIndex : searchboxFocusedElementIndex - 1;
    } else {
        searchboxFocusedElementIndex = (searchboxFocusedElementIndex === maxIndex) ? 0 : searchboxFocusedElementIndex + 1;
    }

    let nextElement = searchboxInteractiveElements[searchboxFocusedElementIndex];

    while (nextElement && nextElement.offsetParent === null) {
        searchboxFocusedElementIndex = (searchboxFocusedElementIndex === maxIndex) ? 0 : searchboxFocusedElementIndex + 1;
        nextElement = searchboxInteractiveElements[searchboxFocusedElementIndex];
    }

    //console.log(`Focusing on element [${searchboxFocusedElementIndex}]: ${nextElement.className || nextElement.tagName}`);
    nextElement.focus();
}

/**
 * Handles the Enter key to trigger a click on interactive elements like buttons.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handleEnterKey(event) {
    const activeElement = document.activeElement;
    if (activeElement.tagName === 'SPAN' || activeElement.tagName === 'BUTTON') {
        activeElement.click();
    }
}