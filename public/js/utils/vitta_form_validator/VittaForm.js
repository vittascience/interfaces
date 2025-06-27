import VittaInput from './VittaInput.js';
import VittaButton from './VittaButton.js';
import Observable from '../Observable.js';

/**
 * Class managing a form for the validator
 * @extends Observable
 */
class VittaForm extends Observable{
    /**
     * @param {object} properties - All the form properties
     * @param {string} properties.name - The form name. Must be unique for each form
     * @param {string} properties.id - [Optional] The form ID. Not yet used.
     * @param {object} properties.inputs - The array containing all the form inputs. See VittaInput
     * @param {object} properties.button - [Optional] The button settings. See VittaButton.
     */
    constructor({ name, id = false, inputs, button = false }) {
        // Inherit properties/methods from Observable
        super();
        // The errors occuring within the constructor
        this._constructorErrors = [];
        // All the form inputs converted to VittaInput
        this._inputs = [];
        // Setters
        this.setName(name);
        this.setId(id);
        this.setInputs(inputs);
        this.setSubmitButton(button);
        // Constructor errors check
        this._checkConstructorErrors();
        // Initialization
        this.init();
    }

    /**
     * Name setter
     * @param {string} name - The form name
     * @returns {undefined} If the provided argument is wrong
     */
    setName(name) {
        const allowedParameter = this._checkVariableType(name, 'string', Object.keys({name})[0], true);
        if (!allowedParameter) return;
        this._name = name;
    }

    /**
     * Name getter
     * @returns {string} - The form name
     */
    getName() {
        return this._name;
    }

    /**
     * Id setter
     * @param {string} id - The form ID
     * @returns {undefined} If the provided argument is wrong
     */
    setId(id) {
        const allowedParameter = this._checkVariableType(id, 'string', Object.keys({id})[0]);
        if (!allowedParameter) return;
        this._id = id;
    }

    /**
     * Inputs setter
     * @param {object} inputs - The array containing the form inputs
     * @returns {undefined} If the provided argument is wrong
     */
    setInputs(inputs) {
        const allowedParameter = this._checkVariableType(inputs, 'object', Object.keys({inputs})[0], true);
        if (!allowedParameter) return;
        inputs.map((input) => {
            input['form'] = this;
            const currentInput = new VittaInput(input);
            currentInput.on('inputChecked', 'validateWholeForm', () => {
                this._validateWholeForm();
            });
            this._inputs.push(currentInput);
        });
    }

    /**
     * Button setter
     * @param {object} button - The button settings
     * @returns {undefined} If the provided argument is wrong
     */
    setSubmitButton(button) {
        const allowedParameter = this._checkVariableType(button, 'object', Object.keys({button})[0]);
        if (!allowedParameter) return;
        if (!button) return this._button = button;
        button['form'] = this;
        this._button = new VittaButton(button);
    }

    /**
     * Initialize the form validator
     */
    init() {
        this._disableSubmitButton(true);
        this._setInputsListeners();
        this._setButtonListeners();
        this.checkInitialState();
    }

    /**
     * Disable the submit button
     * @param {boolean} startup 
     * @returns {undefined} If there is no button in the form
     */
    _disableSubmitButton(startup) {
        if (!this._button) return;
        this._button.disable(startup);
    }

    /**
     * Set the listeners for all the inputs
     */
    _setInputsListeners() {
        this._inputs.map((input) => {
            input.setListeners();
        });
    }

    /**
     * Set the listeners for the submit button
     */
    _setButtonListeners() {
        this._button.setListeners();
        this._button.on('click', 'submitForm', () => {
            this._submitForm();
        });
    }

    /**
     * Submit the form using it's default behavior (click)
     * @returns {undefined} If there is no button in the form
     */
    _submitForm() {
        if (!this._button) return;
        this._button.getButtonElt().click();
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
            this._constructorErrors.push(`The form ${variableName} is missing!`);
            return false;
        }
        if (variableType !== allowedType) {
            this._constructorErrors.push(`The form ${variableName} must be of the ${allowedType} type: ${variableType} provided!`);
            return false;
        }
        return true;
    }

    /**
     * Throw an error if there is any error in this._constructorErrors to stop the instanciation
     * @returns {undefined} If there is no error in this._constructorErrors 
     */
    _checkConstructorErrors() {
        if (this._constructorErrors.length === 0) return;
        for (let error of this._constructorErrors) {
            console.error(`VittaForm constructor error: ${error}`);
        }
        throw new Error('Form validator skipped...');
    }

    /**
     * Validate all the inputs and lock/unlock the form accordingly
     */
    _validateWholeForm() {
        let isValidated = true;
        this._inputs.map((input) => {
            const currentInputValidated = input.validateInput();
            isValidated = isValidated && currentInputValidated;
        });
        if (isValidated) {
            this.trigger('unlockForm')
        } else {
            this.trigger('lockForm');
        }
    }

    checkInitialState() {
        let isValidated = true;
        this._inputs.map((input) => {
            const currentInputValidated = input.validateInputValue(input.getElement().value);
            isValidated = isValidated && currentInputValidated;
        });
        if (isValidated) this._validateWholeForm();
    }
}

export default VittaForm;