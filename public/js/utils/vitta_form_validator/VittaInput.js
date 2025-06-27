import Observable from "../Observable.js";

/**
 * Class managing an input for the validator
 * @extends Observable
 */
class VittaInput extends Observable{
    /**
     * 
     * @param {object} properties - All the input properties
     * @param {string} properties.querySelector - The input querySelector
     * @param {object} properties.form - The input form
     * @param {number} properties.minLength - [Optional] The input minimum length allowed
     * @param {number} properties.maxLength - [Optional] The input maximum length allowed
     * @param {object} properties.regex - [Optional] The input allowed regex
     * @param {string} properties.type - [Optional] The input type (to avoid to provide regex)
     * @param {boolean} properties.mandatory - [Optional] Is the input mandatory ?
     * @param {string} properties.hint - [Optional] The hint to be displayed if there is an error in the input value
     * @param {boolean} properties.escapedChar - [Optional] Is the data escaped in the backend ?
     */
    constructor({ querySelector, form, minLength = false, maxLength = false, regex = false, type = false, mandatory = false, hint = false, escapedChar = false }) {
        // Inherit properties/methods from Observable
        super();
        // The errors occuring within the constructor
        this._constructorErrors = [];
        // The DOM element reference
        this._inputElt = null;
        // The input form
        this._form = form;
        // The default input types restrictions
        this._defaultTypes = {
            email: {
                regex: /^\S+@\S+\.\S+$/
            },
            projectName: {
                maxLength: 100,
                escapedChar: true
            },
            projectDescription: {
                maxLength: 1000,
                escapedChar: true
            },
            userPassword: {
                minLength: 8
            }
        };
        // The default input hints if no one is provided
        this._defaultHints = {
            errorHint: i18next.t('vittaForm.errorHint'),
            mandatoryHint: i18next.t('vittaForm.mandatoryHint')
        };
        // The setters
        this.setQuerySelector(querySelector);
        this.setMinLength(minLength);
        this.setMaxLength(maxLength);
        this.setRegex(regex);
        this.setType(type);
        this.setMandatory(mandatory);
        this.setHint(hint);
        this.setEscapedChar(escapedChar);
        // We check the constructor errors for all the setters
        this._checkConstructorErrors();
        this._setupElement();
        this._setupHintElement();
        // We check the constructor errors after the various setup steps
        this._checkConstructorErrors();
    }

    /**
     * Input querySelector setter
     * @param {string} querySelector - The input html querySelector
     * @returns {undefined} If the provided argument is missing or with the bad type
     */
    setQuerySelector(querySelector) {
        const allowedParameter = this._checkVariableType(querySelector, 'string', Object.keys({querySelector})[0], true);
        if (!allowedParameter) return;
        this._querySelector = querySelector;
    }

    /**
     * Input minLength setter
     * @param {number} minLength - The input min length value
     * @returns {undefined} If the provided argument is missing or with the bad type
     */
    setMinLength(minLength) {
        const allowedParameter = this._checkVariableType(minLength, 'number', Object.keys({minLength})[0]);
        if (!allowedParameter) return;
        this._minLength = minLength;
    }

    /**
     * Input maxLength setter
     * @param {number} maxLength - The input max length value
     * @returns {undefined} If the provided argument is missing or with the bad type
     */
    setMaxLength(maxLength) {
        const allowedParameter = this._checkVariableType(maxLength, 'number', Object.keys({maxLength})[0]);
        if (!allowedParameter) return;
        this._maxLength = maxLength;
    }

    /**
     * Input regex setter
     * @param {object} regex - The input regex
     * @returns {undefined} If the provided argument is missing or with the bad type
     */
    setRegex(regex) {
        const allowedParameter = this._checkVariableType(regex, 'object', Object.keys({regex})[0]);
        if (!allowedParameter) return;
        this._regex = regex;
    }

    /**
     * Input type setter
     * @param {string} type - The input type
     * @returns {undefined} If the provided argument is missing or with the bad type
     */
    setType(type) {
        const allowedParameter = this._checkVariableType(type, 'string', Object.keys({type})[0]);
        if (!allowedParameter) return;
        if (type !== false && typeof this._defaultTypes[type] === 'undefined') {
            console.error(`The input type ${type} doesn't exsit!`);
            return;
        }
        this._type = type;
    }

    /**
     * Input mandatory setter
     * @param {string} mandatory - The input mandatory
     * @returns {undefined} If the provided argument is missing or with the bad type
     */
    setMandatory(mandatory) {
        const allowedParameter = this._checkVariableType(mandatory, 'boolean', Object.keys({mandatory})[0]);
        if (!allowedParameter) return;
        this._mandatory = mandatory;
    }

    /**
     * Input hint setter
     * @param {string} hint - The input hint
     * @returns {undefined} If the provided argument is missing or with the bad type
     */
    setHint(hint) {
        const allowedParameter = this._checkVariableType(hint, 'string', Object.keys({hint})[0]);
        if (!allowedParameter) return;
        this._hint = hint;
    }

    /**
     * Input escapedChar setter
     * @param {string} escapedChar - The input escapedChar
     * @returns {undefined} If the provided argument is missing or with the bad type
     */
    setEscapedChar(escapedChar) {
        const allowedParameter = this._checkVariableType(escapedChar, 'boolean', Object.keys({escapedChar})[0]);
        if (!allowedParameter) return;
        this._escapedChar = escapedChar;
    }

    /**
     * Get the dom element using the provided querySelector
     * @returns false if the element is missing
     */
    _setupElement() {
        const inputElt = document.querySelector(this._querySelector);
        if (inputElt === null) {
            this._constructorErrors.push(`The current input doesn't exist in the DOM using the provided querySelector!`);
            return false;
        }
        this._inputElt = inputElt;
    }

    /**
     * _inputElt getter
     * @returns {DOMElement} The input DOM element
     */
    getElement() {
        return this._inputElt;
    }

    /**
     * Create and append the hint element for the input
     */
    _setupHintElement() {
        this._hintElt = document.createElement('div');
        this._hintElt.classList.add('invalid-feedback');
        this._inputElt.parentElement.appendChild(this._hintElt);
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
     * Set the event listeners
     */
    setListeners() {
        this._inputElt.addEventListener('input', (event) => {
            this.trigger('inputChecked');
        });
    }

    /**
     * Validate the input value and add the relevant css classes
     * @returns {boolean} true if the input value is valid, false otherwise
     */
    validateInput() {
        const isValid = this.validateInputValue(this._inputElt.value);
        if (isValid) {
            this._inputElt.classList.remove('is-invalid');
            this._inputElt.classList.add('is-valid');
            return true;
        }
        this._inputElt.classList.remove('is-valid');
        this._inputElt.classList.add('is-invalid');
        return false;
    }

    /**
     * Validate the input value
     * @param {string} value - The input value
     * @returns {boolean} true if the input is valid, false otherwise
     */
    validateInputValue(value) {
        if (typeof value !== 'string') {
            console.warn('VittaInput->validateInputValue: the provided argument is not a string!');
            return true;
        }
        let validInput = true;
        if (value === '' && this._mandatory) {
            this._setHintMessage(this._defaultHints.mandatoryHint);
            return false;
        }
        if (value === '') return validInput;
        validInput = validInput && this._validateLength(value, this._minLength, this._maxLength, this._escapedChar);
        validInput = validInput && this._validateRegex(value, this._regex);
        validInput = validInput && this._validateType(value);
        if (!validInput) {
            const errorHint = this._hint ? this._hint : this._defaultHints.errorHint;
            this._setHintMessage(errorHint);
        }
        return validInput;
    }

    /**
     * Add the hint message to the hint element
     * @param {string} message - The message to be displayed if the value is invalid
     * @returns {undefined} If the provided message is not a string
     */
    _setHintMessage(message) {
        const messageType = typeof message;
        if (messageType !== 'string') {
            console.error(`VittaInput->_setHintMessage(): the provided hint message must be a string, ${messageType} provided!`);
            return;
        }
        this._hintElt.textContent = message;
    }

    /**
     * Check if a value length is valid using min length and/or max length
     * @param {string} value - The value to be validated
     * @param {number} minLength - [Optional] The min length
     * @param {number} maxLength - [Optional] The max length
     * @param {boolean} escapedChar - [Optional] Is the value escaped in the backend ?
     * @returns {boolean} true if the value is valid, false otherwise
     */
    _validateLength(value, minLength = false, maxLength = false, escapedChar = false) {
        const checkedValue = escapedChar ? this._escapeChar(value) : value;
        if (minLength && checkedValue.length < minLength) return false;
        if (maxLength && checkedValue.length > maxLength) return false;
        return true;
    }

    /**
     * Check if a value length is valid using a regex
     * @param {string} value - The value to be validated
     * @param {regex} regex - The regex to test the value
     * @returns {boolean} true if the value is valid, false otherwise
     */
    _validateRegex(value, regex) {
        if (!regex) return true;
        if (!regex.test(value)) return false;
        return true;
    }

    /**
     * Check if a value length is valid using the input type restrictions
     * @param {string} value - The value to be validated
     * @returns {boolean} true if the value is valid, false otherwise
     */
    _validateType(value) {
        if (!this._type) return true;
        const currentTypeParams = this._defaultTypes[this._type];
        if (typeof currentTypeParams === 'undefined') {
            console.error(`The provided input type doesn't exist among the default types!`);
            return false;
        }
        const typeMinLength = typeof currentTypeParams['minLength'] !== 'undefined' ? currentTypeParams['minLength'] : false,
            typeMaxLength = typeof currentTypeParams['maxLength'] !== 'undefined' ? currentTypeParams['maxLength'] : false,
            typeRegex = typeof currentTypeParams['regex'] !== 'undefined' ? currentTypeParams['regex'] : false,
            typeEscapedChar = typeof currentTypeParams['escapedChar'] !== 'undefined' ? currentTypeParams['escapedChar'] : false;
        if (!this._validateRegex(value, typeRegex)) return false;
        if (!this._validateLength(value, typeMinLength, typeMaxLength, typeEscapedChar)) return false;
        return true;
    }

    /**
     * Escape a string using a php htmlSpecialChars equivalent
     * @private
     * @param {string} value - The string to be escaped
     * @returns {string} The escaped string
     */
    _escapeChar(value) {
        const escapedValue = this._htmlSpecialChars(value);
        return escapedValue;
    }

    /**
     * Replace html special chars in a string by their character reference (like php htmlSpecialChars)
     * @private
     * @param {string} value - The string to be replaced
     * @returns {string} The replaced string
     */
    _htmlSpecialChars(value) {
        const specialChars = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return value.replace(/[&<>"']/g, (char) => { return specialChars[char]; });
    }
}

export default VittaInput;