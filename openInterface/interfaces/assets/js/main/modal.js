import * as focusTrap from '/public/js/lib/focus-trap-7.2.0/focus-trap.esm.js';
window.focusTrap = focusTrap;

const ModalsListModals = [];
const ModalsOpenedModals = [];
const ModalsBlockers = {};
const focusTraps = {};

/**
 * 
 * @param {HTMLElement | String} modalID Element to bind the modal onClick
 * @param {object} options
 * @param {string} options.selector Element selector (#|.) to bind event click
 * @param {object} options.optionalClass Custom class you want to add to the element of the modal
 * @param {object} options.header Header content
 * @param {string} options.header.icon Classname 
 * @param {string} options.header.title Title
 * @param {HTMLElement | String} options.content Main content
 * @param {HTMLElement | String} options.footer Footer content  
 */

window.Modal = function (modalID = "a", options = {}) {
    if (modalID === "a") return;

    if (typeof modalID !== 'string' || modalID === '') {
        throw new Error('Modal name must be defined and non-empty.');
    }

    if (this.contains(modalID)) {
        throw new Error(`This modal name [${modalID}] is already used.`);
    }

    const defaultOptions = {
        header: {
            icon: 'fas fa-folder-open',
            title: 'modals.standard.default.title'
        },
        content: '',
        footer: '',
        optionalClass: {},
        customAttributes: []
    };

    this.options = this._deepMerge(defaultOptions, options);

    this._setupModalTriggers(modalID, options.selector);

    const modal = this._createModalElement(modalID);
    const modalContainer = this._createModalContainer();
    const header = this._createHeader(modalID);
    const content = this._createContent();
    const footer = this._createFooter();

    modalContainer.append(header, content, footer);
    modal.appendChild(modalContainer);

    this.add(modalID);
    return modal;
};

// Méthodes helper pour une meilleure organisation
window.Modal.prototype = {

    _deepMerge(target, source) {
        const result = { ...target };

        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this._deepMerge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        return result;
    },

    _setupModalTriggers(modalID, selector) {
        let elements = [];

        if (selector instanceof HTMLElement) {
            elements = [selector];
        } else if (typeof selector === 'string') {
            try {
                elements = document.querySelectorAll(selector);
            } catch (error) {
                console.warn(`Cannot find selector: ${selector}`);
            }
        }

        // Assignation des événements
        elements.forEach(element => {
            element.addEventListener('click', () => {
                this.openModal(modalID);
            });
        });

        // Stocker pour référence future si nécessaire
        this.triggerElements = elements;
    },

    _createModalElement(modalID) {
        const modal = document.createElement('div');
        modal.id = modalID;
        modal.className = `vitta-modal${this.options.optionalClass.modal ? ` ${this.options.optionalClass.modal}` : ''}`;
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', `${modalID}-title`);

        // Attributs personnalisés
        this.options.customAttributes.forEach(attr => {
            modal.setAttribute(attr.name, attr.value);
        });

        return modal;
    },

    _createModalContainer() {
        const container = document.createElement('div');
        container.className = 'vitta-modal-content-container';
        return container;
    },

    _createHeader(modalID) {
        const header = document.createElement('div');
        header.className = 'vitta-modal-header';

        const title = this._createTitle(modalID);
        const exitBtn = this._createExitButton(modalID);

        header.append(title, exitBtn);
        return header;
    },

    _createTitle(modalID) {
        const title = document.createElement('span');
        title.className = 'vitta-modal-title';
        title.id = `${modalID}-title`;

        const icon = this._createIcon();
        const titleContent = this._createTitleContent();

        title.append(icon, titleContent);
        return title;
    },

    _createIcon() {
        const { icon } = this.options.header;

        if (!icon || icon.trim() === '') {
            // Retourner un élément vide si pas d'icône
            return document.createElement('span');
        }

        // Liste des extensions d'images reconnues
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.bmp', '.tiff'];

        // Vérifier si l'icône est une URL/chemin d'image
        const isImage = imageExtensions.some(ext => {
            const lowerIcon = icon.toLowerCase();
            return lowerIcon.includes(ext) ||
                lowerIcon.startsWith('http') ||
                lowerIcon.startsWith('data:image') ||
                lowerIcon.startsWith('/') ||
                lowerIcon.startsWith('./') ||
                lowerIcon.startsWith('../');
        });

        if (isImage) {
            // Créer une balise img pour les images
            const img = document.createElement('img');
            img.src = icon;
            img.alt = ''; // Pour l'accessibilité
            img.className = 'vitta-modal-icon-image';

            // Styles pour une taille cohérente
            Object.assign(img.style, {
                height: '15px',
                width: '15px',
                objectFit: 'contain',
                display: 'inline-block'
            });

            return img;
        } else {
            // Créer une balise i pour les classes d'icônes (Font Awesome, etc.)
            const i = document.createElement('i');
            i.className = `vitta-modal-icon ${icon}`;
            return i;
        }
    },

    _createTitleContent() {
        const span = document.createElement('span');
        const titleText = this._getTranslatedText(this.options.header.title);
        span.textContent = titleText;
        return span;
    },

    _createExitButton(modalID) {
        const button = document.createElement('button');
        button.className = 'btn vitta-modal-exit-btn';
        button.type = 'button';
        button.setAttribute('data-i18n', '[title]modals.standard.default.exit');
        button.setAttribute('data-toggle', 'tooltip');
        button.setAttribute('data-placement', 'top');
        button.setAttribute('tabindex', '0');

        // CORRECTION : utilisation de modalID passé en paramètre
        button.addEventListener('click', () => {
            this.closeModal(modalID);
        });

        const icon = document.createElement('i');
        icon.className = 'fa fa-times';
        button.appendChild(icon);

        return button;
    },

    _createContent() {
        const content = document.createElement('div');
        content.className = 'vitta-modal-content stylized-scrollbar';

        const messageDiv = document.createElement('div');
        messageDiv.className = 'modal-message';

        const customContent = document.createElement('div');
        customContent.className = `modal-content-div${this.options.optionalClass.content ? ` ${this.options.optionalClass.content}` : ''}`;

        this._appendContent(customContent, this.options.content);

        content.append(messageDiv, customContent);
        return content;
    },

    _createFooter() {
        if (!this.options.footer) return document.createElement('div'); // Empty div as fallback

        const footer = document.createElement('div');
        footer.className = 'vitta-modal-footer';

        const footerDiv = document.createElement('div');
        footerDiv.className = `modal-footer-div${this.options.optionalClass.footer ? ` ${this.options.optionalClass.footer}` : ''}`;

        this._appendContent(footerDiv, this.options.footer);
        footer.appendChild(footerDiv);

        return footer;
    },

    _appendContent(container, content) {
        if (content instanceof HTMLElement) {
            container.appendChild(content);
        } else {
            container.innerHTML += content;
        }
    },

    _getTranslatedText(key) {
        // Gestion de la traduction
        if (typeof i18next !== 'undefined') {
            const translation = i18next.t(key);
            return translation !== key ? translation : jsonPath(key);
        }
        return jsonPath(key);
    },

     /**
     * Open a modal
     * @param {string} modal ID of the modal element 
     * @param {boolean} showOverlay Whether to show the overlay
     */
    openModal: function(modal, showOverlay = true) {
        try {
            $("#" + modal).localize();
        } catch (e) {
            console.error('Cannot find selector for element: ' + modal);
        }

        this.closeAllModal();

        if (typeof vittaFormValidator !== 'undefined') vittaFormValidator.observeExistingForms();

        const zIndex = ModalsOpenedModals.length + 1002;
        if (ModalsListModals.includes(modal)) {
            const modalElement = document.getElementById(modal);
            modalElement.setAttribute('style', `display: flex; z-index: ${zIndex}`);
            document.getElementById(modal).setAttribute("tab-index", -1);

            const event = new CustomEvent('modalOpened', { detail: { modalId: modal } });
            window.dispatchEvent(event);

            if (showOverlay) {
                $('.overlay').show();
            }

            ModalsOpenedModals.push(modal);
            $('[data-toggle="tooltip"]').tooltip('hide');

            focusTraps[modal] = focusTrap.createFocusTrap(modalElement, {
                escapeDeactivates: true,
                clickOutsideDeactivates: true,
                onDeactivate: () => {
                    this.closeModal(modal);
                },
            });
            focusTraps[modal].activate();

            if (typeof AndroidInterface === 'undefined' || AndroidInterface === null) {
                this.setFocusToFirstElement(modal);
            }
        } else {
            throw new Error('Cannot open this modal, modal not included');
        }
    },

    /**
     * Close the modal and reset its message
     * @param {string} modal ID of the modal element
     */
    closeModal: function(modal) {
        if (ModalsBlockers[modal]) {
            ModalsBlockers[modal].end();
        }

        if (ModalsOpenedModals.includes(modal)) {
            this.resetMessage(modal);
            document.getElementById(modal).removeAttribute('style');
            document.getElementById(modal).removeAttribute("tab-index");

            const index = ModalsOpenedModals.indexOf(modal);
            ModalsOpenedModals.splice(index, 1);

            const event = new CustomEvent('modalClosed', { detail: { modalId: modal } });
            window.dispatchEvent(event);

            if (focusTraps[modal]) {
                focusTraps[modal].deactivate();
                delete focusTraps[modal];
            }

            $('.overlay').hide();
        }
    },

    /**
     * Sets focus to the first interactive element in a modal, excluding close buttons.
     * @param {string} modal - ID of the modal element.
     */
    setFocusToFirstElement: function(modal) {
        const currentModalElt = document.getElementById(modal);
        if (!currentModalElt) {
            console.error(`Modal with ID ${modal} not found.`);
            return;
        }

        setTimeout(() => {
            const focusableSelectors = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
            const focusableElements = Array.from(currentModalElt.querySelectorAll(focusableSelectors))
                .filter(el => !el.classList.contains('vitta-modal-exit-btn'));

            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            } else {
                console.warn(`No focusable elements found in modal with ID ${modal}.`);
            }
        }, 10);
    },

    /**
     * Close all registered modals
     */
    closeAllModal: function() {
        ModalsOpenedModals.forEach((e) => {
            this.closeModal(e);
        });
    },

    /**
     * Check if any modal is open
     * @returns {boolean}
     */
    isOpen: function() {
        return ModalsOpenedModals.length > 0;
    },

    /**
     * Close latest modal opened
     */
    closeLatestModal: function() {
        if (ModalsOpenedModals.length > 0) {
            const lastModal = ModalsOpenedModals[ModalsOpenedModals.length - 1];
            this.closeModal(lastModal);
        } else {
            console.warn("No modal is currently open.");
        }
    },

    /**
     * Register modal - Add modal to the list
     * @param {string} modal ID of the modal element
     */
    add: function(modal) {
        ModalsListModals.push(modal);
    },

    /**
     * Check if modal is registered
     * @param {string} modal 
     * @returns {boolean}
     */
    contains: function(modal) {
        return ModalsListModals.includes(modal);
    },

    /**
     * Reset message in a specific modal
     * @param {string} modal ID of the modal element
     */
    resetMessage: function(modal) {
        if (this.contains(modal)) {
            const modalElem = document.getElementById(modal);
            const msg = modalElem.getElementsByClassName('modal-message')[0];
            msg.innerHTML = "";
            msg.setAttribute('class', 'modal-message');
            msg.removeAttribute('style');
        }
    },

    /**
     * Bind callback on exit button
     * @param {string} modal ID of the modal element
     * @param {function} cb Callback function to bind on exit button
     */
    clickOnExit: function(modal, cb) {
        if (this.contains(modal)) {
            const modalElem = document.getElementById(modal);
            const exitBtn = modalElem.querySelector('.vitta-modal-exit-btn');
            exitBtn.addEventListener('click', cb);
        }
    },

    /**
     * Set message in modal
     * @param {string} modal Id of the modal you want to apply the message
     * @param {string} msg Your message i18next code
     * @param {string} type Message type
     */
    setMessage: function(modal, msg, type = 'info') {
        this.resetMessage(modal);
        const modalElem = document.getElementById(modal);
        const msgElem = modalElem.getElementsByClassName('modal-message')[0];
        msgElem.innerHTML = msg;
        msgElem.setAttribute('style', 'margin-bottom: 0.25rem');
        
        const alertClasses = {
            'info': ['alert', 'alert-info'],
            'success': ['alert', 'alert-success'],
            'warning': ['alert', 'alert-warning'],
            'error': ['alert', 'alert-danger']
        };

        const classes = alertClasses[type] || alertClasses.info;
        msgElem.classList.add(...classes);
    },

    /**
     * Reset event on element
     * @param {string} elem Element ID
     * @param {string} event Event type
     */
    resetEventOnElement: function(elem, event = '') {
        const element = document.getElementById(elem);
        if (element && event) {
            element.removeEventListener(event);
        }
    },

    /**
     * Reset event on multiple elements
     * @param {array} listElem List of element IDs
     * @param {string} event Event type
     */
    resetEventOnElements: function(listElem = [], event = '') {
        listElem.forEach((e) => {
            this.resetEventOnElement(e, event);
        });
    },

    /**
     * Shortcut to remove click event
     * @param {string} elem Element ID
     */
    resetEventClick: function(elem) {
        this.resetEventOnElement(elem, 'click');
    },

    /**
     * Bind event to element
     * @param {string} elem Element ID
     * @param {string} event Event type
     * @param {function} cb Callback function
     */
    bindEvent: function(elem, event, cb) {
        this.resetEventClick(elem);
        const element = document.getElementById(elem);
        if (element) {
            element.addEventListener(event, cb);
        }
    },

    /**
     * Bind event to close modal on element click
     * @param {string} modal ID of the modal element
     * @param {string} element Element to bind the event
     */
    bindEventExitOnElement: function(modal, element) {
        const el = document.getElementById(element);
        if (el) {
            el.addEventListener('click', () => {
                this.closeModal(modal);
            });
        }
    },

    /**
     * Bind event to close modal on multiple elements
     * @param {string} modal ID of the modal element 
     * @param {array} listElem List of elements to apply event
     */
    bindEventExitOnElements: function(modal, listElem) {
        listElem.forEach((element) => {
            this.bindEventExitOnElement(modal, element);
        });
    },

    /**
     * Shortcut for info message
     * @param {string} modal ID of the modal elements 
     * @param {string} msg Code i18next referenced to the correct string
     */
    showInfo: function(modal, msg) {
        this.setMessage(modal, msg);
    },

    /**
     * Shortcut for success message
     * @param {string} modal ID of the modal elements 
     * @param {string} msg Code i18next referenced to the correct string
     */
    showSuccess: function(modal, msg) {
        this.setMessage(modal, msg, "success");
        this.openModal(modal);
    },

    /**
     * Shortcut for warning message
     * @param {string} modal ID of the modal elements 
     * @param {string} msg Code i18next referenced to the correct string
     */
    showWarning: function(modal, msg) {
        this.setMessage(modal, msg, "warning");
        this.openModal(modal);
    },

    /**
     * Shortcut for error message
     * @param {string} modal ID of the modal elements 
     * @param {string} msg Code i18next referenced to the correct string
     */
    showError: function(modal, msg) {
        this.setMessage(modal, msg, "error");
        this.openModal(modal);
    },

    /**
     * Set warning modal content
     * @param {string} content Content HTML
     * @param {string} footer Footer HTML
     */
    setWarningModal: function(content = '', footer = '') {
        const warningModal = document.getElementById('warning-modal');
        if (warningModal) {
            const contentModal = warningModal.getElementsByClassName('modal-content-div');
            const footerModal = warningModal.getElementsByClassName('modal-footer-div');
            
            // Implémentation à compléter selon votre besoin
            this.openModal('warning-modal');
        }
    },

    /**
     * Create a new blocker
     * @param {string} message Blocker message
     * @param {string} modal Modal ID
     * @param {number} fontSize Font size
     */
    newBlocker: function(message, modal, fontSize = null) {
        if (fontSize !== null) {
            ModalsBlockers[modal] = new VittaBlocker(message, '#' + modal, fontSize);
        } else {
            ModalsBlockers[modal] = new VittaBlocker(message, '#' + modal);
        }
    },

    /**
     * End blocker
     * @param {string} modal Modal ID
     */
    endBlocker: function(modal) {
        if (ModalsBlockers[modal]) {
            ModalsBlockers[modal].end();
        }
    }
};

/*    class ErrorModal extends Modal {


constructor(element, options = {}) {

    if (options.content === "") {
        throw "Cannot have an empty content";
    }

    let content = document.createElement('div');
    if (options.content instanceof HTMLElement)
        content.appendChild(options.content);
    else
        content.innerHTML = options.content;

    options = Object.assign({}, {
        header: {
            icon: 'fa fa-exclamation-triangle',
            title: 'modals.error.default.title',
        },
        content: content
    }, options);

    super(element, options, {
        modal: 'vitta-modal-error'
    });
}

}*/