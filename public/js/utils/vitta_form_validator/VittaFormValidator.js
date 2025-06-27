/**
 * This is the main file responsible of the form validation
 * It defines the class VittaFormValidator, instanciates it in vittaFormValidator and inits it
 */

import VittaForm from './VittaForm.js';
import formList from './vittaforms.js';

class VittaFormValidator {
    /**
     * The class constructor, no argument needed
     * @returns {VittaFormValidator} VittaFormValidator instance, if it has already been instanciated (Singleton)
     */
    constructor() {
        if (typeof VittaFormValidator._instance !== 'undefined') {
            return VittaFormValidator._instance;
        }
        VittaFormValidator._instance = this;
        // The registered forms to be watched
        this._watchedForms = [];
        // All the forms that can be watched automatically
        this._formList = formList;
        // Tells if the mutation observer is running
        this._observing = false;
    }

    /**
     * 
     * @param {object} formSettings - The form settings. See the fully described structure in ./vittaforms.js file
     * @param {string} formSettings.name - The form name. Must be unique for each form
     * @param {string} formSettings.id - [Optional] The form ID. Not yet used.
     * @param {object} formSettings.inputs - The array containing all the form inputs. See VittaInput
     * @param {object} formSettings.button - [Optional] The button settings. See VittaButton.
     * @returns {undefined} If there is an issue with the provided name
     */
    addFormValidation(formSettings) {
        try {
            if (!this._checkValidatorNameAvailability(formSettings)) {
                console.error(`Form validator setup stopped!`);
                return;
            }
            const form = new VittaForm(formSettings);
            this.setWatchedForms(form);
        } catch (error) {
            console.error(error);
            return;
        }
    }

    /**
     * Add a form to the watchedForms array
     * @param {object} form - The form converted in VittaForm object
     */
    setWatchedForms(form) {
        this._watchedForms.push(form);
    }

    /**
     * Check if the provided form name is available
     * @param {object} formSettings - The form settings
     * @returns {boolean} false if there is no argument, no argument.name or if the name is already used
     */
    _checkValidatorNameAvailability(formSettings) {
        if (typeof formSettings === 'undefined') {
            console.error('The form validator settings are missing!');
            return false;
        }

        if (typeof formSettings['name'] === 'undefined') {
            console.error('The form validator name is missing!');
            return false;
        }

        if (this.getFormValidatorByName(formSettings['name'])) {
            console.error(`A form validator with the provided name already exists : ${formSettings['name']}!`);
            return false;
        }

        return true;
    }

    /**
     * Get a form validator using its name
     * @param {string} name - The form name
     * @returns {object|boolean} - The relevant form or false if there is no result
     */
    getFormValidatorByName(name) {
        const foundWatchedForm = this._watchedForms.filter((watchedForm) => {
            return watchedForm.getName() === name;
        });
        if (foundWatchedForm.length === 0) return false;
        return foundWatchedForm[0];
    }

    /**
     * Initialize the form validator
     */
    init() {
        this._observeNewForms();
    }

    /**
     * Browse all the DOM for element with the attribute data-form-validator to be watched
     */
    observeExistingForms() {
        const existingForms = document.querySelectorAll('[data-form-validator]');
        Array.from(existingForms).map((existingForm) => {
            this.setupFormValidator(existingForm.getAttribute('data-form-validator'));
        });
    }

    /**
     * Set a mutation observer to register and watch any future form that would be added to the DOM
     */
    _observeNewForms() {
        const mutationCallback = (mutationsList, observer) => {
            if (!this._observing) {
                this.observeExistingForms();
                this._observing = true;
            }
            for(let mutation of mutationsList) {
                if (mutation.type !== 'childList') continue;
                // One or several nodes have been added to the DOM
                const addedNodes = mutation.addedNodes;
                for (let node of addedNodes) {
                    if (!node.getAttribute) continue;
                    const dataAttribute = node.getAttribute('data-form-validator');
                    if (dataAttribute === null) continue;
                    this.setupFormValidator(dataAttribute);
                }
            }
        };
        
        this._observer = new MutationObserver(mutationCallback);

        const observerOptions = {
            childList: true,
            subtree: true
        };
        
        const targetNode = document.documentElement;
        this._observer.observe(targetNode, observerOptions);
    }

    /**
     * Add a form to be watched using it's name
     * @param {string} formName - The form name
     * @returns {undefined} If there is no form with the provided name in the ./vittaforms.js file
     */
    setupFormValidator(formName) {
        if (typeof formList[formName] === 'undefined') {
            console.error(`There is no form with the name ${formName} in the vittaforms.js file!`);
            return;
        }
        this.addFormValidation(formList[formName]);
    }
}

window.vittaFormValidator = new VittaFormValidator();
vittaFormValidator.init();