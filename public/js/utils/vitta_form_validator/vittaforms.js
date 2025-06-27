/**
 * This file contains all the forms supported by the VittaFormValidator
 */
const forms = await getForms();

function getForms() {
    return new Promise((resolve, reject) => {
        // Delaying the object generation if i18next isn't already loaded
        if (typeof i18next === 'undefined' || !i18next.isInitialized) {
            setTimeout (() => {
                resolve(getForms());
            }, 100);
            return;
        }
        /**
         * Below add the input to be watched for validation
         * It must be structured as following
         * 
         * "data_form_validator_value": {
         *      name: 'validatorFormName', // [Mandatory] The form validator name that must be unique
         *      inputs: [ // [Mandatory] The list of the form inputs
         *          {
         *              querySelector: '#exampleInputId', // [Mandatory] The input element querySelector
         *              type: 'typeValue', // [Optional] The input type. See VittaInput.js to view the full list
         *              mandatory: true, // [Optional] Tells if the input is mandatory. false by default
         *              hint: 'Current input hint', [Optional] The hint message that will be displayed if the input value is invalid. Should be using i18next for translation purposes
         *              regex: /regex/, // [Optional] The regex to test the value with
         *              minLength: 8, // [Optional] The min length of the value
         *              maxLength: 100 // [Optional] The max length of the value
         *          }
         *      ], 
         *      button: { // [Optional but recommended]
         *          querySelector: '#exampleButtonId', // [Mandatory]
         *          disabledMessage: 'Message to be displayed within the button tooltip at startup', // [Optional] The message that will be displayed in the button tooltip at startup. Should be using i18next for translation purposes
         *          errorMessage: 'Message to be displayed within the button tooltip when an error occurs', // [Optional] The message that will be displayed in the button tooltip at startup. Should be using i18next for translation purposes
         *      },
         *      id: 'form_id' // [Optional, not yet used] Could be used to add some css classes to the form
         * }
         */
        const translatedForms = {
            "save_project_form": {
                name: 'saveProjectForm', 
                inputs: [
                    {
                        querySelector: '#save-name',
                        type: 'projectName',
                        mandatory: true,
                        hint: i18next.t('vittaForm.defaultTypeMessages.projectNameError')
                    },
                    {
                        querySelector: '#save-description',
                        type: 'projectDescription',
                        hint: i18next.t('vittaForm.defaultTypeMessages.projectDescriptionError')
                    }
                ],
                button: {
                    querySelector: '#modal-save-btn-confirm',
                    disabledMessage: i18next.t('vittaForm.defaultButtonMessages.disabledMessage'),
                    errorMessage: i18next.t('vittaForm.defaultButtonMessages.errorMessage')
                }
            },
            "save_web_project_form": {
                name: 'saveWebProjectForm', 
                inputs: [
                    {
                        querySelector: '#save-name-web',
                        type: 'projectName',
                        mandatory: true,
                        hint: i18next.t('vittaForm.defaultTypeMessages.projectNameError')
                    },
                    {
                        querySelector: '#save-description-web',
                        type: 'projectDescription',
                        hint: i18next.t('vittaForm.defaultTypeMessages.projectDescriptionError')
                    }
                ],
                button: {
                    querySelector: '#modal-save-web-btn-confirm',
                    disabledMessage: i18next.t('vittaForm.defaultButtonMessages.disabledMessage'),
                    errorMessage: i18next.t('vittaForm.defaultButtonMessages.errorMessage')
                }
            },
            "save_as_project_form": {
                name: 'saveAsProjectForm', 
                inputs: [
                    {
                        querySelector: '#save-as-name',
                        type: 'projectName',
                        mandatory: true,
                        hint: i18next.t('vittaForm.defaultTypeMessages.projectNameError')
                    },
                    {
                        querySelector: '#save-as-description',
                        type: 'projectDescription',
                        hint: i18next.t('vittaForm.defaultTypeMessages.projectDescriptionError')
                    }
                ],
                button: {
                    querySelector: '#modal-save-as-btn-confirm',
                    disabledMessage: i18next.t('vittaForm.defaultButtonMessages.disabledMessage'),
                    errorMessage: i18next.t('vittaForm.defaultButtonMessages.errorMessage')
                }
            },
            "edit_project_form": {
                name: 'editProjectForm',
                inputs: [
                    {
                        querySelector: '#edit_name',
                        type: 'projectName',
                        mandatory: true,
                        hint: i18next.t('vittaForm.defaultTypeMessages.projectNameError')
                    },
                    {
                        querySelector: '#edit_description',
                        type: 'projectDescription',
                        hint: i18next.t('vittaForm.defaultTypeMessages.projectDescriptionError')
                    }
                ],
                button: {
                    querySelector: '#modal-edit-project-btn-edit',
                    disabledMessage: i18next.t('vittaForm.defaultButtonMessages.disabledMessage'),
                    errorMessage: i18next.t('vittaForm.defaultButtonMessages.errorMessage')
                }
            },
            "new_project_form": {
                name: 'newProjectForm',
                inputs: [
                    {
                        querySelector: '#new_name',
                        type: 'projectName',
                        mandatory: true,
                        hint: i18next.t('vittaForm.defaultTypeMessages.projectNameError')
                    },
                    {
                        querySelector: '#new_description',
                        type: 'projectDescription',
                        hint: i18next.t('vittaForm.defaultTypeMessages.projectDescriptionError')
                    }
                ],
                button: {
                    querySelector: '#modal-new-btn-create',
                    disabledMessage: i18next.t('vittaForm.defaultButtonMessages.disabledMessage'),
                    errorMessage: i18next.t('vittaForm.defaultButtonMessages.errorMessage')
                }
            },
            "ai-text_error_form": {
                name: 'aiTextErrorForm', 
                inputs: [
                    {
                        querySelector: '#format-aitext-error',
                        mandatory: true,
                        minLength: 8
                    },
                    {
                        querySelector: '#format-aitext-error-mail',
                        type: 'email',
                        mandatory: true,
                        minLength: 6

                    },
                ],
                button: {
                    querySelector: '#modal-report-send-button',
                    disabledMessage: i18next.t('vittaForm.defaultButtonMessages.disabledMessage'),
                    errorMessage: i18next.t('vittaForm.defaultButtonMessages.errorMessage')
                }
            },
        };
        resolve(translatedForms);
    });
}

export default forms;