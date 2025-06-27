import Observable from "../Observable.js";

/**
 * Class managing a button for the validator
 * @extends Observable
 */
class VittaButton extends Observable{
    /**
     * 
     * @param {object} properties - All the button properties
     * @param {string} properties.querySelector - The button querySelector
     * @param {object} properties.form - The button form
     * @param {string} properties.disabledMessage - The message to be displayed when the button is disabled at startup
     * @param {string} properties.errorMessage - The message to be displayed when the button is disabled after an error
     */
    constructor({ querySelector, form, disabledMessage = false, errorMessage = false }) {
        // Inherit properties/methods from Observable
        super();
        // The errors occuring within the constructor
        this._constructorErrors = [];
        // The DOM element reference for the original button
        this._buttonElt = null;
        // The DOM element reference for the replacement button   
        this._replacementButtonElt = null;
        // The DOM element reference for the tooltip wrapper
        this._tooltipWrapperElt = null;
        // The button form
        this._form = form;
        // The bootstrap tooltip object
        this._tooltip = false;
        // Setters
        this.setQuerySelector(querySelector);
        this.setDisabledMessage(disabledMessage);
        this.setErrorMessage(errorMessage);
        // We check the constructor errors for all the setters
        this._checkConstructorErrors();
        this._setupElement();
        // We check the constructor errors after the various setup steps
        this._checkConstructorErrors();
        // Initialization
        this._init();
    }

    /**
     * Button querySelector setter
     * @param {string} querySelector - The button html querySelector
     * @returns {undefined} If the provided argument is missing or with the bad type
     */
    setQuerySelector(querySelector) {
        const allowedParameter = this._checkVariableType(querySelector, 'string', Object.keys({querySelector})[0], true);
        if (!allowedParameter) return;
        this._querySelector = querySelector;
    }

    /**
     * Button disabledMessage setter
     * @param {string} querySelector - The button html querySelector
     * @returns {undefined} If the provided argument is missing or with the bad type
     */
    setDisabledMessage(disabledMessage) {
        const allowedParameter = this._checkVariableType(disabledMessage, 'string', Object.keys({disabledMessage})[0]);
        if (!allowedParameter) return;
        this._disabledMessage = disabledMessage;
    }

    /**
     * Button disabledMessage setter
     * @param {string} querySelector - The button html querySelector
     * @returns {undefined} If the provided argument is missing or with the bad type
     */
    setErrorMessage(errorMessage) {
        const allowedParameter = this._checkVariableType(errorMessage, 'string', Object.keys({errorMessage})[0]);
        if (!allowedParameter) return;
        this._errorMessage = errorMessage;
    }

    /**
     * Get the dom element using the provided querySelector
     * @returns false if the element is missing
     */
    _setupElement() {
        const buttonElt = document.querySelector(this._querySelector);
        if (buttonElt === null) {
            this._constructorErrors.push(`The current button doesn't exist in the DOM using the provided querySelector!`);
            return false;
        }
        this._buttonElt = buttonElt;
    }

    /**
     * 
     * @returns {DOMElement}
     */
    getButtonElt() {
        return this._buttonElt;
    }

    /**
     * Check if the provided variable is defined and if it's type is correct
     * @param {any} variable -
     * @param {string} allowedType - The allowed type to be compared with that of the variable
     * @param {string} variableName - The variable name as a string
     * @param {boolean} mandatory  - Tells if the current variable is mandatory
     * @returns false if the variable is not correct, true otherwise
     */
    _checkVariableType(variable, allowedType, variableName, mandatory = false) {
        if (!mandatory && variable === false) return true;
        const variableType = typeof variable;
        if (variableType === 'undefined') {
            this._constructorErrors.push(`The input ${variableName} is missing!`);
            return false;
        }
        if (variableType !== allowedType) {
            this._constructorErrors.push(`The input ${variableName} must be of the ${allowedType} type: ${variableType} provided!`);
            return false;
        }
        return true;
    }

    /**
     * Check if some errors have occured within the contructor, throw an error to stop the object instanciation if any
     * @returns {undefined} - If there is no constructor error
     */
    _checkConstructorErrors() {
        if (this._constructorErrors.length === 0) return;
        for (let error of this._constructorErrors) {
            console.error(`VittaForm constructor error: ${error}`);
        }
        throw new Error('Form validator skipped...');
    }

    /**
	 * Apply the provided style properties to the provided HTMLElement
	 * @param {HTMLElement} element - The HTML Element to which to apply the styles
	 * @param {object} styles - An object with keys/values related to style properties/values
	 * @returns {undefined} if the provided element argument is not an HTMLElement
	 */
	_applyStylesToElement(element, styles) {
		if (!(element instanceof HTMLElement)) {
			console.error(`VittaButton->_applyStylesToElement: the provided element must be an instance of HTMLElement`);
			return;
		}
		for (let style in styles) {
			element.style[style] = styles[style];
		}
	}

    /**
     * Disable the button and set its tooltip
     * @param {boolean} startup - true if the disable is called at the validator startup
     */
    disable(startup = false, overwriteMessage = false) {
        let disabledMessage = startup ? this._disabledMessage : this._errorMessage;
        if (overwriteMessage) disabledMessage = overwriteMessage;
        this._setTooltip(disabledMessage);
        this._applyStylesToElement(this._tooltipWrapperElt, {
            cursor: 'not-allowed'
        });
        this._replacementButtonElt.setAttribute('disabled', true);
    }

    /**
     * Enable the button and disable the tooltip
     */
    enable() {
        this._replacementButtonElt.removeAttribute('disabled');
        this._applyStylesToElement(this._tooltipWrapperElt, {
            cursor: 'pointer'
        });
        this._disableTooltip();
    }

    /**
     * Create the tooltip wrapper if not yet done and set the tooltip with it's message
     * @param {string} tooltipMessage - The message to be displayed within the tooltip
     * @returns {undefined} If there is no tooltipMessage argument or if bootstrap is unavailable
     */
    _setTooltip(tooltipMessage) {
        if (!tooltipMessage || typeof bootstrap === 'undefined') return;
        this._createTooltipWrapperElt();
        this._tooltipWrapperElt.setAttribute('title', tooltipMessage);
        this._tooltipWrapperElt.setAttribute('data-bs-original-title', tooltipMessage);
        this._tooltip = new bootstrap.Tooltip(this._tooltipWrapperElt);
    }

    /**
     * Disable the tooltip
     * @returns {undefined} If there is no tooltip to be disabled
     */
    _disableTooltip() {
        if (!this._tooltipWrapperElt) return;
        this._tooltip.disable();
        this._tooltipWrapperElt.removeAttribute('data-bs-original-title');
    }

    /**
     * Create and setup the tooltip wrapper and replace the original button
     * @returns {undefined} If the tooltip wrapper has already been created
     */
    _createTooltipWrapperElt() {
        if (this._tooltipWrapperElt) return;
        this._tooltipWrapperElt = document.createElement('div');
        this._createReplacementButtonElt();
        this._buttonElt.parentElement.insertBefore(this._tooltipWrapperElt, this._buttonElt);
        this._tooltipWrapperElt.appendChild(this._buttonElt);
        this._tooltipWrapperElt.setAttribute('data-toggle', 'tooltip');
        this._tooltipWrapperElt.setAttribute('tabindex', '0');
        this._transferButtonPropertiesToWrapper();
        this._tooltipWrapperElt.appendChild(this._replacementButtonElt);
    }

    /**
     * Transfer the button dimensions/positioning properties to the tooltip wrapper and hide the original button
     */
    _transferButtonPropertiesToWrapper() {
        const propertiesToTransfer = {
            'margin': false,
            'display': false, 
            'flex': '0 1 auto',
            'width': '100%'
        },
        buttonComputedStyles = window.getComputedStyle(this._buttonElt);
        let newButtonStyles = {}, tooltipWrapperStyles = {};
        for (let property in propertiesToTransfer) {
            tooltipWrapperStyles[property] = buttonComputedStyles[property];
            if (propertiesToTransfer[property] === false) continue;
            newButtonStyles[property] = propertiesToTransfer[property];
        }
        this._applyStylesToElement(this._replacementButtonElt, newButtonStyles);
        this._applyStylesToElement(this._tooltipWrapperElt, tooltipWrapperStyles);
        this._buttonElt.style.display = 'none';
    }

    /**
     * Create the replacement button
     */
    _createReplacementButtonElt() {
        this._buttonElt.removeAttribute('data-form-validator');
        this._replacementButtonElt = this._buttonElt.cloneNode(true);
        this._replacementButtonElt.removeAttribute('id');
        this._replacementButtonElt.removeAttribute('name');
        this._replacementButtonElt.removeAttribute('onclick');
        this._replacementButtonElt.style.setProperty('margin', '0px', 'important');
    }

    /**
     * Set the event listeners for the button
     */
    setListeners() {
        this._replacementButtonElt.addEventListener('click', (event) => {
            this.trigger('click');
        });
    }

    /**
     * Initialize the button by adding the observable listeners
     */
    _init() {
        this._form.on('lockForm', 'disableButton', (message = false) => {
            this.disable(false, message);
        });
        this._form.on('unlockForm', 'disableButton', () => {
            this.enable();
        });
    }
}

export default VittaButton;