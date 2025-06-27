# VittaFormValidator
## _A tool that watch user inputs in "forms" and check their validity. Disable the form submit button when necessary_

## Involved files
- /public/js/utils/vitta_form_validator/VittaFormValidator.js -> The main module file that is imported in the /public/header.php file
- /public/js/utils/vitta_form_validator/VittaForm.js -> Class managing a form for the validator
- /public/js/utils/vitta_form_validator/VittaButton.js -> Class managing a button for the validator
- /public/js/utils/vitta_form_validator/VittaInput.js -> Class managing an input for the validator
- /public/js/utils/vitta_form_validator/vittaforms.js -> File containing all the forms supported by the VittaFormValidator

## How to use?
### Steps
- Firstly, you need to add the attribute `data-form-validator` to the submit button of the form to be watched. Set the value of this attribute to whatever you want but it must not be already used
- Then you need to add a new property to the `translatedForms` constant in the ./vittaforms.js file. The Structure of the property is detailed below.

### Form settings structure
```
"data_form_validator_value": { // The data-form-validator attribute value
    name: 'validatorFormName', // [Mandatory] The form validator name that must be unique -> It must be the value of the data-form-validator attribute
    inputs: [ // [Mandatory] The list of the form inputs
        {
            querySelector: '#exampleInputId', // [Mandatory] The input element querySelector
            type: 'typeValue', // [Optional] The input type. See VittaInput.js to view the full list
            mandatory: true, // [Optional] Tells if the input is mandatory. false by default
            hint: 'Current input hint', [Optional] The hint message that will be displayed if the input value is invalid. Should be using i18next for translation purposes
            regex: /regex/, // [Optional] The regex to test the value with
            minLength: 8, // [Optional] The min length of the value
            maxLength: 100 // [Optional] The max length of the value
        }
    ], 
    button: { // [Optional but recommended]
        querySelector: '#exampleButtonId', // [Mandatory]
        disabledMessage: 'Message to be displayed within the button tooltip at startup', // [Optional] The message that will be displayed in the button tooltip at startup. Should be using i18next for translation purposes
        errorMessage: 'Message to be displayed within the button tooltip when an error occurs', // [Optional] The message that will be displayed in the button tooltip at startup. Should be using i18next for translation purposes
    },
    id: 'form_id' // [Optional, not yet used] Could be used to add some css classes to the form
}
```

## The validator doesn't trigger, what to do?

If you have followed all the previously described steps and the form validator isn't working you need to do the follingw steps:
- Check in the browser devtool console for errors. They could point to the issue source.
- If there is not error, go inside of the `vittaFormValidator` object in the console and check if the current form is listed inside the `vittaFormValidator._watchedForms` array. If it is not there, type the following instruction in the console `vittaFormValidator.observeExistingForms()`. It should add the validator. If this is the case, it is due to the way that the form button is added to the DOM that doesn't trigger the observer. So you need to add the `vittaFormValidator.observeExistingForms()` instruction in the code after the form addition.

## My form doesn't have any submit button: what can I do?
A form without any button is a weird one, but you still can handle it!
As previously explained, you need to add the attribute `data-form-validator` to the submit button of the form to be watched. But in other hand, the button isn't mandatory in the form settings.
Actually, you need to register manually the form into the form validator. To do so, you need to add the form to the ./vittaforms.js file. In this case, the data-form-validator attribute key doesn't really matter and can have any value. Then call the instruction `vittaFormValidator.setupFormValidator(validatorFormName)`.
